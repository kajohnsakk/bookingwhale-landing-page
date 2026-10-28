import { fileURLToPath } from 'node:url';
import purgecss from '@fullhuman/postcss-purgecss';

export const pruneStyles=()=>({
  name:'prune-unused-styles',
  apply:'build',
  config:()=>({
    css:{
      postcss:{
        plugins:[purgecss({
          content:[fileURLToPath(new URL('../src/**/*.{astro,js,ts,json,md,html}',import.meta.url))],
          safelist:{standard:[/^is-/,/^has-/,/^astro-/,/^bw-film-\d+$/],greedy:[/data-astro-cid-/,/editorial-prose/]},
          dynamicAttributes:['aria-expanded','aria-selected','data-phase','data-active'],
          keyframes:false,
          fontFace:false,
          variables:false,
        })],
      },
    },
  }),
});
