import messages from './messages.json';
import businessChinese from './business-zh.json';
export type Locale = 'en' | 'th' | 'zh';
export const locales: Locale[] = ['en', 'th', 'zh'];
export const localeFromPath = (path: string): Locale => path === '/' || /^\/(?:th|blog|businesses|contact|404(?:\.html)?)(?:\/|$)/.test(path) ? 'th' : /^\/zh(?:\/|$)/.test(path) ? 'zh' : 'en';
export const localePath = (locale: Locale) => locale === 'th' ? '/' : `/${locale}/`;
export function translate(value: string, locale: Locale) {
  if (locale === 'th') return value;
  const key = value.trim();
  const chinese = (businessChinese as Record<string, string>)[key];
  if (locale === 'zh' && chinese) return value.replace(key, chinese);
  const entry = (messages as Record<string, { en: string; zh: string }>)[key];
  return entry ? value.replace(key, entry[locale]) : value;
}
