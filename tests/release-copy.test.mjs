import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { parse } from 'parse5';
const flatten = node => [node, ...(node.childNodes || []).flatMap(flatten)];
const text = node => node.value || (node.childNodes || []).map(text).join('');
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;

test('primary CTA wording and contact imagery match each page language', () => {
  for (const [locale, cta] of [['en', 'Get started'], ['th', 'เริ่มใช้งาน'], ['zh', '开始使用']]) {
    const path = locale === 'th' ? 'index.html' : `${locale}/index.html`;
    const html = readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
    const nodes = flatten(parse(html));
    const buttons = nodes.filter(node => node.tagName === 'a' && attr(node, 'class')?.split(' ').includes('bw-start-button'));
    assert.ok(buttons.length >= 3);
    for (const button of buttons) assert.equal(text(button).trim(), cta);
    for (const image of ['customer-booking', 'merchant-bookings']) {
      const source = `/assets/product-captures/${locale}/${image}.webp`;
      assert.ok(html.includes(source));
      assert.ok(existsSync(new URL(`../dist${source}`, import.meta.url)));
    }
    for (const button of buttons) assert.doesNotMatch(text(button), /จองชมระบบ|ปรึกษาทีมงาน|นัดหมาย/);
    const tabs = nodes.find(node => node.tagName === 'div' && attr(node, 'class') === 'bw-ui-tabs');
    assert.ok(text(tabs).includes({ en: 'List', th: 'รายการจอง', zh: '列表' }[locale]));
  }
});
