export function heroImageSources(locale: string, screen: 'merchant' | 'booking' | 'success') {
  const merchant=screen==='merchant';
  const path=`/assets/hero-screens/${locale}/${screen}`;
  return {
    src:`${path}.webp`,
    srcset:[...(merchant?[400,600,640,800,1200]:[200,300,390,600]).map(width=>`${path}-${width}.webp ${width}w`),`${path}.webp ${merchant?1600:780}w`].join(', '),
    sizes:merchant?'(max-width: 520px) 86vw, (max-width: 900px) 448px, min(900px, 55vw)':'(max-width: 520px) 26vw, (max-width: 900px) 136px, min(240px, 15vw)',
  };
}
