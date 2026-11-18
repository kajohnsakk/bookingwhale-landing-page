import type icons from '../components/icons.json';

type Locale = 'th' | 'en' | 'zh';

export interface SeasonCountdown {
  to: string;
  title: Record<Locale, string>;
  units: Record<Locale, [string, string, string, string]>;
}

export interface Season {
  id: string;
  start: string;
  end: string;
  greeting: string;
  icon: keyof typeof icons;
  countdown?: SeasonCountdown;
}

export const seasons: Season[] = [
  {
    id: 'christmas',
    start: '11-19',
    end: '01-06',
    greeting: 'สุขสันต์วันคริสต์มาส',
    icon: 'snowflake',
    countdown: {
      to: '12-25',
      title: { th: 'นับถอยหลังสู่คริสต์มาส', en: 'Countdown to Christmas', zh: '圣诞节倒计时' },
      units: { th: ['วัน', 'ชั่วโมง', 'นาที', 'วินาที'], en: ['days', 'hours', 'minutes', 'seconds'], zh: ['天', '小时', '分钟', '秒'] },
    },
  },
];
