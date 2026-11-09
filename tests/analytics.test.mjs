import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const source = readFileSync(new URL('../src/scripts/analytics.js', import.meta.url), 'utf8');
const bootstrap = (url, language = 'en', granted = true) => {
  const listeners = new Map();
  const scripts = [];
  class Element {
    constructor(href, zone = 'modal') { this.href = href; this.zone = zone; }
    closest(selector) {
      if (selector === 'a[href]') return this.href ? this : null;
      if (selector === '#contact-dialog' && this.zone === 'modal') return this;
      if (selector === 'footer' && this.zone === 'footer') return this;
      return null;
    }
  }
  let consent = granted;
  let reloads = 0;
  const window = { bwCookieConsent: { allowsAnalytics: () => consent } };
  const location = new URL(url);
  location.reload = () => reloads++;
  const context = { window, location, URL, Element, document: {
    cookie: '',
    documentElement: { lang: language },
    getElementById: id => scripts.find(script => script.id === id),
    createElement: () => ({}),
    head: { appendChild: script => scripts.push(script) },
    addEventListener: (name, handler) => listeners.set(name, handler),
  } };
  const run = () => runInNewContext(source, context);
  run();
  return { window, scripts, listeners, Element, run, setConsent(value) { consent = value; listeners.get('bw:cookie-consent')?.(); }, get reloads() { return reloads; } };
};

test('analytics never loads on localhost, preview hosts or preview paths', () => {
  for (const url of ['http://localhost:4322/', 'http://127.0.0.1:4322/th/', 'https://preview.bookingwhale.co/', 'https://bookingwhale.pages.dev/', 'https://bookingwhale.co.evil.test/', 'https://bookingwhale.co/previews/en/booking.html', 'https://bookingwhale.co/hero-preview/booking.html', 'https://bookingwhale.co/hero-live/customer/']) {
    const result = bootstrap(url);
    assert.equal(result.scripts.length, 0, url);
    assert.equal(result.window.gtag, undefined, url);
    assert.equal(result.listeners.size, 0, url);
  }
});

test('one async Google tag and one config call, including repeated initialization', () => {
  for (const host of ['bookingwhale.co', 'www.bookingwhale.co']) {
    const result = bootstrap(`https://${host}/`);
    result.run();
    assert.equal(result.scripts.length, 1);
    assert.equal(result.scripts[0].async, true);
    assert.equal(result.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-N2554HPN72');
    assert.deepEqual(Array.from(result.window.dataLayer, args => args[0]), ['consent', 'js', 'config']);
    assert.equal(result.window.dataLayer[2][1], 'G-N2554HPN72');
  }
});

test('contact events queue without Google loaded and do not interfere with links', () => {
  const r = bootstrap('https://bookingwhale.co/th/', 'th');
  const click = (href, zone, prevented = false) => r.listeners.get('click')({ target: new r.Element(href, zone), defaultPrevented: prevented });
  r.listeners.get('bw:contact-open')({ detail: { trigger: new r.Element() } });
  click('https://line.me/R/ti/p/%40337esngk', 'modal');
  click('tel:0970166045', 'modal');
  click('tel:0805956458', 'footer');
  click('mailto:info@bookingwhale.co', 'footer');
  click('https://line.me/unrelated', 'modal');
  click('mailto:someone@example.com', 'footer');
  click('tel:0970166045', 'footer', true);
  const events = JSON.parse(JSON.stringify(r.window.dataLayer.slice(3).map(args => Array.from(args))));
  assert.deepEqual(events.map(args => args[1]), ['contact_modal_open', 'contact_line_click', 'contact_phone_click', 'contact_phone_click', 'contact_email_click']);
  assert.ok(events.every(args => args[2].page_language === 'th' && args[2].send_to === 'G-N2554HPN72'));
  assert.equal(events[2][2].contact_target, 'primary');
  assert.equal(events[3][2].contact_target, 'secondary');
  assert.equal(events[4][2].placement, 'footer');
});

test('production output includes analytics once per locale and verification is exact', () => {
  for (const path of ['index.html', 'en/index.html', 'zh/index.html']) {
    const html = readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
    assert.equal((html.match(/const measurementId = 'G-N2554HPN72'/g) || []).length, 1);
  }
  const file = 'googlee32eeeae4c95b322.html';
  assert.equal(readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8'), `google-site-verification: ${file}`);
});

test('no Google tag or queued events before acceptance or after decline', () => {
  const r = bootstrap('https://bookingwhale.co/', 'th', false);
  r.listeners.get('bw:contact-open')({ detail: { trigger: new r.Element() } });
  r.listeners.get('click')({ target: new r.Element('tel:0970166045') });
  assert.equal(r.scripts.length, 0);
  assert.equal(r.window.dataLayer, undefined);
  r.setConsent(false);
  assert.equal(r.scripts.length, 0);
  r.setConsent(true);
  r.setConsent(true);
  assert.equal(r.scripts.length, 1);
  assert.equal(r.window.dataLayer.length, 3);
  r.listeners.get('click')({ target: new r.Element('tel:0970166045') });
  assert.equal(r.window.dataLayer.length, 4);
});

test('withdrawal disables Analytics, clears pending events and reloads', () => {
  const r = bootstrap('https://bookingwhale.co/');
  r.scripts[0].remove = () => {};
  r.setConsent(false);
  assert.equal(r.window['ga-disable-G-N2554HPN72'], true);
  assert.equal(r.window.dataLayer.length, 0);
  assert.equal(r.reloads, 1);
  r.listeners.get('click')({ target: new r.Element('tel:0970166045') });
  assert.equal(r.window.dataLayer.length, 0);
});
