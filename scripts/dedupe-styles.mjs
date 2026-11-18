import postcss from 'postcss';

const modern = /svh|dvh|lvh|svw|dvw|clamp\(|min\(|max\(|color-mix|oklch|light-dark|:has\(|-webkit-|-moz-/;

const contextOf = node => {
  const parts = [];
  for (let parent = node.parent; parent && parent.type !== 'root'; parent = parent.parent) {
    if (parent.type === 'atrule') parts.unshift(`@${parent.name} ${parent.params}`);
  }
  return parts.join('|');
};

export const dedupeCss = css => {
  const root = postcss.parse(css);
  const rules = [];
  root.walkRules(rule => {
    if (rule.parent?.type === 'atrule' && /keyframes/i.test(rule.parent.name)) return;
    rules.push(rule);
  });
  const later = new Map();
  for (let index = rules.length - 1; index >= 0; index -= 1) {
    const rule = rules[index];
    const key = `${contextOf(rule)}§${rule.selector.replace(/\s+/g, ' ')}`;
    if (!later.has(key)) later.set(key, new Map());
    const declared = later.get(key);
    const decls = rule.nodes.filter(node => node.type === 'decl');
    for (let position = decls.length - 1; position >= 0; position -= 1) {
      const decl = decls[position];
      const winner = declared.get(decl.prop);
      if (winner) {
        if ((winner.important || !decl.important) && !decl.prop.startsWith('--') && !modern.test(winner.value) && !modern.test(decl.value)) decl.remove();
        continue;
      }
      declared.set(decl.prop, { important: decl.important, value: decl.value });
    }
  }
  root.walkRules(rule => { if (!rule.nodes.length) rule.remove(); });
  root.walkAtRules(atRule => { if (atRule.nodes && !atRule.nodes.length) atRule.remove(); });
  return root.toString();
};

export const dedupeHtmlStyles = () => ({
  name: 'dedupe-inline-styles',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const { readdir, readFile, writeFile } = await import('node:fs/promises');
      const { join } = await import('node:path');
      const { fileURLToPath } = await import('node:url');
      const walk = async folder => {
        const entries = await readdir(folder, { withFileTypes: true });
        const nested = await Promise.all(entries.filter(entry => entry.isDirectory()).map(entry => walk(join(folder, entry.name))));
        return entries.filter(entry => entry.isFile()).map(entry => join(folder, entry.name)).concat(...nested);
      };
      for (const file of await walk(fileURLToPath(dir))) {
        if (!file.endsWith('.html') && !file.endsWith('.css')) continue;
        const source = await readFile(file, 'utf8');
        const output = file.endsWith('.css') ? dedupeCss(source) : source.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/g, (match, open, css, close) => css.length > 2000 ? open + dedupeCss(css) + close : match);
        if (output !== source) await writeFile(file, output);
      }
    },
  },
});
