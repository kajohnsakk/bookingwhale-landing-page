const groups = [
  [{ language: 'en', path: '/en/' }, { language: 'th', path: '/' }, { language: 'zh-Hans', path: '/zh/' }, { language: 'x-default', path: '/' }],
  ...['contact', 'businesses/food-beverage', 'businesses/fitness-sports', 'businesses/services'].map(path => [
    { language: 'th', path: `/${path}/` },
    { language: 'en', path: `/en/${path}/` },
    { language: 'x-default', path: `/${path}/` },
  ]),
];
export const canonicalPath = path => path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
export const languageAlternates = path => groups.find(group => group.some(item => item.path === canonicalPath(path))) || [];
