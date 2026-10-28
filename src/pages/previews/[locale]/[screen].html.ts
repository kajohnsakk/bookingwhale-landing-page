import booking from '../../../../public/hero-preview/booking.html?raw';
import merchant from '../../../../public/hero-preview/merchant.html?raw';
import success from '../../../../public/hero-preview/success.html?raw';
import { locales, type Locale } from '../../../i18n';
import { localizeHtml } from '../../../i18n/html';
export function getStaticPaths() {
  return locales.flatMap(locale => ['booking', 'merchant', 'success'].map(screen => ({ params: { locale, screen } })));
}
export async function GET({ params }: { params: { locale: Locale; screen: string } }) {
  const html = ({booking, merchant, success} as Record<string,string>)[params.screen];
  return new Response(localizeHtml(html, params.locale), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
