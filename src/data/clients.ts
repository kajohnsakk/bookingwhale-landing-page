export const clientCategories = {
  food: 'ร้านอาหาร & เครื่องดื่ม',
  beauty: 'ความงาม & เวลเนส',
  fitness: 'ฟิตเนส & กีฬา',
  education: 'การศึกษา & การสอน',
  events: 'อีเวนต์ & บัตรเข้างาน',
  travel: 'การท่องเที่ยว & ที่พัก',
  rentals: 'ธุรกิจให้เช่า',
  services: 'บริการทั่วไป',
} as const;

export type ClientCategory = keyof typeof clientCategories;

export interface Client {
  name: string;
  slug: string;
  category: ClientCategory;
  logo?: string;
  avatar?: string;
  tags: string[];
  locations?: { x: number; y: number; label: string; area: string; side?: 'left' | 'right' }[];
}

export const clients: Client[] = [
  {
    name: 'Kaito Omakase',
    slug: 'kaito-omakase',
    category: 'food',
    logo: '/images/clients/kaito-omakase.svg',
    avatar: '/images/clients/kaito-omakase-avatar.jpg',
    tags: ['โอมากาเสะ', 'กรุงเทพฯ'],
    locations: [{ x: 528, y: 284, label: 'นิฮอนมาชิ', area: 'กรุงเทพฯ', side: 'left' }, { x: 702, y: 206, label: 'ทองหล่อ', area: 'กรุงเทพฯ' }],
  },
  {
    name: 'Kinji Omakase',
    slug: 'kinji-omakase',
    category: 'food',
    logo: '/images/clients/kinji-omakase.png',
    avatar: '/images/clients/kinji-omakase-avatar.jpg',
    tags: ['โอมากาเสะ', 'พัทยา'],
    locations: [{ x: 688, y: 548, label: 'พัทยา', area: 'ชลบุรี' }],
  },
];
