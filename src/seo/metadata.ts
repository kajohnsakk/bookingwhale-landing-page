import { localePath, locales, type Locale } from '../i18n';

export const seoCopy = {
  en: {
    title: 'LINE OA Booking System in Thailand | Booking Whale',
    description: 'Let customers book tables, classes and services through LINE OA. Manage availability, bookings and customer history in one place. Get started with Booking Whale.',
    imageAlt: 'Booking Whale: online booking through LINE OA and a dashboard for your business',
    language: 'en',
    ogLocale: 'en_US',
  },
  th: {
    title: 'ระบบจองคิวผ่าน LINE OA สำหรับธุรกิจ | Booking Whale',
    description: 'ระบบจองคิวผ่าน LINE OA สำหรับร้านอาหาร คลาส และธุรกิจบริการ ให้ลูกค้าเลือกวันเวลาเอง พร้อมจัดการรอบว่าง รายการจอง และประวัติลูกค้าในที่เดียว',
    imageAlt: 'Booking Whale ระบบจองผ่าน LINE OA และหน้าจัดการการจองสำหรับธุรกิจ',
    language: 'th',
    ogLocale: 'th_TH',
  },
  zh: {
    title: 'Booking Whale | LINE OA 在线预订系统',
    description: '通过 LINE OA 接受餐桌、课程及服务预订，让客户自主选择日期和时间。在同一平台管理可预约时段、预订记录及客户历史。开始使用 Booking Whale。',
    imageAlt: 'Booking Whale：通过 LINE OA 在线预订，在商家后台集中管理预订',
    language: 'zh-Hans',
    ogLocale: 'zh_CN',
  },
} satisfies Record<Locale, { title: string; description: string; imageAlt: string; language: string; ogLocale: string }>;

export function buildSeo(site: URL, locale: Locale, overrides: { title?: string; description?: string } = {}) {
  const copy = { ...seoCopy[locale], title: overrides.title ?? seoCopy[locale].title, description: overrides.description ?? seoCopy[locale].description };
  const home = new URL('/', site).href;
  const canonical = new URL(localePath(locale), site).href;
  const image = new URL(`/assets/social/bookingwhale-${locale}.png`, site).href;
  const organizationId = `${home}#organization`;
  const websiteId = `${home}#website`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'Booking Whale',
        alternateName: 'BookingWhale',
        url: home,
        logo: new URL('/assets/bookingwhale-logo.png', site).href,
        email: 'info@bookingwhale.co',
        telephone: '+66-97-016-6045',
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: 'Booking Whale',
        alternateName: 'BookingWhale',
        url: home,
        publisher: { '@id': organizationId },
        inLanguage: locales.map(item => seoCopy[item].language),
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: copy.title,
        description: copy.description,
        inLanguage: copy.language,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: image,
          width: 1200,
          height: 630,
          caption: copy.imageAlt,
        },
      },
    ],
  };
  return {
    ...copy,
    canonical,
    home,
    image,
    alternates: locales.map(item => ({ language: seoCopy[item].language, url: new URL(localePath(item), site).href })),
    otherOgLocales: locales.filter(item => item !== locale).map(item => seoCopy[item].ogLocale),
    schema: JSON.stringify(schema).replace(/</g, '\\u003c'),
  };
}
