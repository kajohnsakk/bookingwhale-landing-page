import { scrollToPosition } from './smooth-scroll';

export const preserveGettingStartedPosition=(root,gsap,ScrollTrigger)=>{
  const section=root.querySelector('#how');
  if(!section)return()=>{};
  const rows=Array.from(section.querySelectorAll('li'));
  let width=window.innerWidth;
  let height=window.innerHeight;
  let snapshot=null;
  let pending=null;
  let timer;
  let frame;
  const capture=()=>{
    if(pending||window.innerWidth!==width||window.innerHeight!==height)return;
    snapshot=null;
    if(width<744||!window.matchMedia('(any-pointer: coarse)').matches)return;
    const bounds=section.getBoundingClientRect();
    const readingLine=Math.min(160,height*.25);
    if(bounds.top>height*.5||bounds.bottom<=readingLine)return;
    const anchor=bounds.top>=0?section:rows.find(row=>row.getBoundingClientRect().bottom>readingLine)||rows.at(-1);
    if(anchor)snapshot={anchor,offset:anchor.getBoundingClientRect().top};
  };
  const apply=()=>{
    if(!pending||!pending.anchor.isConnected)return;
    const offset=Math.min(pending.offset,window.innerHeight-160);
    scrollToPosition({top:window.scrollY+pending.anchor.getBoundingClientRect().top-offset,behavior:'instant'});
    ScrollTrigger.update();
  };
  const settle=()=>{
    if(pending){ScrollTrigger.refresh();apply();}
    pending=null;
    width=window.innerWidth;
    height=window.innerHeight;
    capture();
  };
  const queue=()=>{
    apply();
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(apply);
    clearTimeout(timer);
    timer=setTimeout(settle,320);
  };
  const remember=()=>{
    if(window.innerWidth===width&&window.innerHeight===height)return;
    if(!pending&&snapshot&&Math.min(width,window.innerWidth)>=744&&(width>height)!==(window.innerWidth>window.innerHeight))pending={...snapshot};
    queue();
  };
  const refresh=()=>{if(pending){apply();cancelAnimationFrame(frame);frame=requestAnimationFrame(apply);}};
  const cancel=()=>{
    clearTimeout(timer);
    cancelAnimationFrame(frame);
    pending=null;
    width=window.innerWidth;
    height=window.innerHeight;
    capture();
  };
  window.addEventListener('scroll',capture,{passive:true});
  window.addEventListener('resize',remember);
  for(const type of ['touchstart','pointerdown','wheel','keydown'])window.addEventListener(type,cancel,{passive:true});
  gsap.addEventListener('matchMediaInit',remember);
  gsap.addEventListener('matchMedia',refresh);
  ScrollTrigger.addEventListener('refresh',refresh);
  capture();
  return()=>{
    clearTimeout(timer);
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll',capture);
    window.removeEventListener('resize',remember);
    for(const type of ['touchstart','pointerdown','wheel','keydown'])window.removeEventListener(type,cancel);
    gsap.removeEventListener('matchMediaInit',remember);
    gsap.removeEventListener('matchMedia',refresh);
    ScrollTrigger.removeEventListener('refresh',refresh);
  };
};
