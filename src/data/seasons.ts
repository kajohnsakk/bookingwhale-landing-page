import type icons from '../components/icons.json';

export interface Season {
  id: string;
  start: string;
  end: string;
  greeting: string;
  icon: keyof typeof icons;
}

export const seasons: Season[] = [
  { id: 'christmas', start: '11-19', end: '01-06', greeting: 'สุขสันต์วันคริสต์มาส', icon: 'snowflake' },
];
