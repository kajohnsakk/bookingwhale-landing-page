import { parse, serialize, type DefaultTreeAdapterMap } from 'parse5';
import { translate, type Locale } from './index';
type Node = DefaultTreeAdapterMap['node'];
const translatedAttributes = new Set(['title', 'alt', 'aria-label', 'placeholder', 'content', 'data-open-label', 'data-close-label']);
export function localizeHtml(html: string, locale: Locale) {
  const document = parse(html);
  function visit(node: Node) {
    if ('tagName' in node && ['script', 'style'].includes(node.tagName)) return;
    if (node.nodeName === '#text' && 'value' in node) node.value = translate(node.value, locale);
    if ('attrs' in node) {
      for (const attr of node.attrs) {
        if (translatedAttributes.has(attr.name)) attr.value = translate(attr.value, locale);
        if (node.tagName === 'html' && attr.name === 'lang') attr.value = locale === 'zh' ? 'zh-Hans' : locale;
        if (node.tagName === 'iframe' && attr.name === 'src' && attr.value.startsWith('/hero-preview/')) attr.value = attr.value.replace('/hero-preview/', `/previews/${locale}/`);
        if (attr.name === 'href' && attr.value.startsWith('mailto:')) attr.value = 'mailto:info@bookingwhale.co?subject=' + encodeURIComponent(locale === 'th' ? 'เริ่มใช้งาน Booking Whale' : locale === 'zh' ? '开始使用 Booking Whale' : 'Get started with Booking Whale');
      }
    }
    if ('childNodes' in node) node.childNodes.forEach(visit);
  }
  visit(document);
  return serialize(document);
}
