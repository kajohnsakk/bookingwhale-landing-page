import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preserveGettingStartedPosition } from './preserve-how-position';

(() => {
  const root=document.getElementById('bookingwhale');
  if(!root)return;
  let galleryRestore=null;
  let gallerySnapshot=null;
  let galleryRestoreTimer;
  let galleryViewportWidth=window.innerWidth;
  let galleryViewportHeight=window.innerHeight;
  const rememberGalleryPosition=()=>{
    if(galleryRestore)return;
    galleryRestore=gallerySnapshot?{...gallerySnapshot}:null;
  };
  gsap.addEventListener('matchMediaInit',rememberGalleryPosition);
  gsap.registerPlugin(ScrollTrigger);
  const settleFastScroll=self=>{
    const position=self.scroll();
    const margin=Math.min(240,window.innerHeight*.3);
    if(position<self.start-margin||position>self.end+margin){
      self.getTween()?.progress(1);
    }
  };
  const q=selector=>root.querySelector(selector);
  const qa=selector=>Array.from(root.querySelectorAll(selector));
  const page=q('.bw-page');
  const header=q('.bw-nav');
  const toggle=q('#bw-menu-toggle');
  const menu=q('#bw-main-menu');
  const menuReduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let menuAnimation=null;
  const permanentCleanups=[];
  permanentCleanups.push(()=>gsap.removeEventListener('matchMediaInit',rememberGalleryPosition));
  const on=(target,type,handler,options)=>{
    target?.addEventListener(type,handler,options);
    permanentCleanups.push(()=>target?.removeEventListener(type,handler,options));
  };
  const setMenu=(open,immediate=false)=>{
    if(!header||!toggle||!menu)return;
    const visible={opacity:1,transform:'translateY(0) scale(1)'};
    const hidden={opacity:0,transform:'translateY(-10px) scale(.985)'};
    const running=menuAnimation?.playState==='running';
    const current=running?{opacity:getComputedStyle(menu).opacity,transform:getComputedStyle(menu).transform}:open?hidden:visible;
    menuAnimation?.cancel();
    menuAnimation=null;
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?toggle.dataset.closeLabel:toggle.dataset.openLabel);
    if(open)header.classList.add('bw-menu-open');
    menu.inert=!open&&window.innerWidth<=900;
    if(immediate||menuReduced.matches||window.innerWidth>900||!header.classList.contains('bw-menu-open')){
      header.classList.toggle('bw-menu-open',open);
      if(window.innerWidth>900)menu.inert=false;
      return;
    }
    const animation=menu.animate([current,open?visible:hidden],{duration:open?260:180,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
    menuAnimation=animation;
    animation.finished.then(()=>{
      if(menuAnimation!==animation)return;
      if(!open)header.classList.remove('bw-menu-open');
      animation.cancel();
      menuAnimation=null;
    }).catch(()=>{});
  };
  const closeMenu=(immediate=false)=>setMenu(false,immediate);
  on(toggle,'click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
  on(document,'pointerdown',event=>{if(header&&!header.contains(event.target))closeMenu();});
  on(document,'keydown',event=>{if(event.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
  on(window,'resize',()=>{if(window.innerWidth>900)closeMenu(true);});
  on(menuReduced,'change',()=>setMenu(toggle?.getAttribute('aria-expanded')==='true',true));
  permanentCleanups.push(()=>menuAnimation?.cancel());
  const language=q('.bw-language');
  on(document,'pointerdown',event=>{if(language&&!language.contains(event.target))language.open=false;});
  on(document,'keydown',event=>{if(event.key==='Escape'&&language?.open){language.open=false;language.querySelector('summary').focus();}});
  qa('[data-language]').forEach(link=>on(link,'click',()=>{link.href=new URL(link.getAttribute('href'),location.origin).pathname+location.hash;}));
  const flowButtons=qa('.bw-flow-steps button');
  let selectScene=()=>{};
  const navSections=qa('main section[id].bw-section, main #contact');
  const navLinks=qa('[data-nav-section]');
  let navCurrent=null;
  let navFrame=0;
  let navScrollAnchor=window.scrollY;
  const syncNavigation=()=>{
    navFrame=0;
    const threshold=(header?.offsetHeight||72)+48;
    let current='';
    navSections.forEach(section=>{if(section.getBoundingClientRect().top<=threshold)current=section.id;});
    if(current!==navCurrent){
    navCurrent=current;
    navLinks.forEach(link=>{
      if(link.dataset.navSection===current)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    }
    header?.classList.toggle('bw-nav-scrolled',window.scrollY>24);
    const scrollY=Math.max(0,window.scrollY);
    const delta=scrollY-navScrollAnchor;
    if(scrollY<96||header?.classList.contains('bw-menu-open')||q('.bw-language')?.open){
      header?.classList.remove('bw-nav-hidden');navScrollAnchor=scrollY;
    }else if(Math.abs(delta)>12){
      header?.classList.toggle('bw-nav-hidden',delta>0);navScrollAnchor=scrollY;
    }
    header?.classList.remove('bw-nav-compact');
  };
  on(window,'scroll',()=>{if(!navFrame)navFrame=requestAnimationFrame(syncNavigation);},{passive:true});
  const jump=(target,behavior='instant')=>{
    closeMenu();
    const sceneIndex={'features':0,'customer':0,'owner':3,'profile':4}[target.id];
    if(sceneIndex!==undefined){
      selectScene(sceneIndex,behavior);
      const story=ScrollTrigger.getById('product-story');
      if(story){syncNavigation();return;}
      target=q(window.innerWidth<=900&&sceneIndex>=3?'[data-mobile-story="manage"]':'#features');
    }
    const trigger=ScrollTrigger.getAll().find(item=>item.pin&&(item.trigger===target||target.contains(item.pin)));
    const anchor=target.closest('.bw-hero-scroll-track,.bw-business-scroll-track')||target;
    const offset=window.innerWidth<=900&&target.closest('#features')?(header?.offsetHeight||64)+16:0;
    window.scrollTo({top:Math.max(0,(trigger?trigger.start:window.scrollY+anchor.getBoundingClientRect().top)-offset),behavior});
    if(behavior!=='smooth'){ScrollTrigger.update();trigger?.getTween()?.progress(1);}
    syncNavigation();
  };
  qa('a[href^="#"]').forEach(link=>on(link,'click',event=>{
    const id=link.getAttribute('href').slice(1);
    const target=document.getElementById(id);
    if(!target||!root.contains(target))return;
    const behavior=!window.matchMedia('(prefers-reduced-motion: reduce)').matches?'smooth':'instant';
    event.preventDefault();history.replaceState(null,'','#'+id);jump(target,behavior);
  }));
  let activeScene=0;
  let heroAnnotationShown=false;
  let heroAnnotationReady=false;
  let revealHeroAnnotation=()=>{};
  permanentCleanups.push(preserveGettingStartedPosition(root,gsap,ScrollTrigger));
  const media=gsap.matchMedia();
  media.add({all:'all',mobile:'(max-width: 900px)',desktop:'(min-width: 901px) and (min-height: 720px)',wide:'(min-width: 1024px) and (min-height: 800px)',gallery:'(min-width: 744px) and (min-height: 640px)',touch:'(any-pointer: coarse)',reduce:'(prefers-reduced-motion: reduce)',pointer:'(hover: hover) and (pointer: fine)'},context=>{
    const cinematic=context.conditions.wide&&!context.conditions.reduce;
    const reduced=context.conditions.reduce;
    const cleanups=[];
    const listen=(target,type,handler)=>{
      target?.addEventListener(type,handler);
      cleanups.push(()=>target?.removeEventListener(type,handler));
    };
    page.classList.add('has-motion');
    page.classList.remove('bw-ui-static');
    page.classList.toggle('bw-cinematic',cinematic);
    page.classList.toggle('bw-reduced-motion',reduced);
    const onApproach=(target,build)=>{
      const observer=new IntersectionObserver(entries=>{
        if(!entries.some(entry=>entry.isIntersecting))return;
        observer.disconnect();
        context.add(build);
      },{rootMargin:'200px 0px'});
      observer.observe(target);
      cleanups.push(()=>observer.disconnect());
    };
    const observeLoop=(target,tl)=>{
      if(!target){tl.kill();return;}
      let visible=false;
      const sync=()=>visible&&!document.hidden?tl.play():tl.pause();
      const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.2});
      observer.observe(target);cleanups.push(()=>observer.disconnect());
      listen(document,'visibilitychange',sync);
    };
    selectScene=()=>{};
    if(!context.conditions.mobile){
      const flow=q('.bw-flow');
      const pin=flow.querySelector('.bw-flow-pin');
      const canvas=flow.querySelector('.bw-flow-canvas');
      const visual=flow.querySelector('.bw-flow-visual');
      const client=flow.querySelector('.bw-flow-client');
      const merchant=flow.querySelector('.bw-flow-merchant');
      const ticket=flow.querySelector('.bw-flow-ticket');
      const pointer=flow.querySelector('.bw-flow-pointer');
      const pulse=flow.querySelector('.bw-flow-pulse');
      const day=client.querySelector('.bw-ui-day-pick');
      const slot=client.querySelector('.bw-ui-slot-selected');
      const row=merchant.querySelector('.bw-ui-arriving-group .bw-ui-arriving-row');
      const chapters=Array.from(flow.querySelectorAll('.bw-flow-chapter'));
      const steps=flowButtons;
      const local=(element)=>{
        let x=0,y=0,node=element;
        while(node && node!==canvas){x+=node.offsetLeft;y+=node.offsetTop;node=node.offsetParent;}
        return {x,y,width:element.offsetWidth,height:element.offsetHeight};
      };
      gsap.set(chapters,{autoAlpha:0,y:0});
      gsap.set(chapters[0],{autoAlpha:1});
      const chapter=(timeline,index,at)=>{
        timeline.to(chapters[index-1],{autoAlpha:0,y:-10,duration:.3},at)
          .fromTo(chapters[index],{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.42},at+.18)
          .to(steps[index],{color:'var(--bw-blue)',duration:.2},at);
      };
      gsap.set(day,{'--day-selected':0,color:'var(--ui-ink)'});
      gsap.set(client.querySelector('.bw-ui-times'),{autoAlpha:0,y:25});
      gsap.set(slot,{'--slot-selected':0});
      gsap.set(client.querySelector('.bw-ui-check'),{autoAlpha:0,scale:.5});
      gsap.set(client.querySelector('.bw-ui-selection-label'),{autoAlpha:1});
      gsap.set(client.querySelector('.bw-ui-selection-summary'),{autoAlpha:0});
      gsap.set(row,{autoAlpha:0});
      gsap.set(merchant.querySelectorAll(".bw-flow-count"),{textContent:"0"});
      gsap.set(merchant,{autoAlpha:0,x:()=>canvas.clientWidth*.72});
      gsap.set(ticket,{autoAlpha:0,x:()=>local(slot).x,y:()=>local(slot).y,width:()=>local(slot).width});
      gsap.set(pointer,{x:()=>local(day).x+60,y:()=>local(day).y+55});
      gsap.set(steps[0],{color:'var(--bw-blue)'});
      gsap.set(flow.querySelector('.bw-flow-client-label'),{color:'var(--bw-blue)'});
      const profile=flow.querySelector('.bw-flow-profile');
      const sceneTimes=[0,3.4,cinematic?4.5:5.05,8.1,13.4];
      const sceneStarts=[0,1.55,3.7,5.1,9.35];
      const availability=client.querySelector('.bw-ui-availability');
      const prompt=client.querySelector('.bw-ui-date-prompt');
      const times=client.querySelector('.bw-ui-times');
      const availabilityHeight=element=>element.offsetHeight+17;
      const fitActiveScene=()=>{
        if(cinematic)return;
        const scene=activeScene<3?client:activeScene===3?merchant:profile;
        gsap.set(canvas,{height:scene.offsetHeight+8});
        if(activeScene===2)gsap.set(ticket,{x:(canvas.clientWidth-ticket.offsetWidth)/2,y:Math.max(16,(scene.offsetHeight-ticket.offsetHeight)/2)});
      };
      const measureFlow=()=>{
        gsap.set(availability,{height:availabilityHeight(activeScene>0?times:prompt)});
        const bookingHeight=client.offsetHeight+Math.max(0,availabilityHeight(times)-availability.offsetHeight);
        gsap.set(canvas,{height:Math.max(bookingHeight,merchant.offsetHeight,profile.offsetHeight)+8});
        fitActiveScene();
      };
      measureFlow();
      ScrollTrigger.addEventListener('refreshInit',measureFlow);
      cleanups.push(()=>ScrollTrigger.removeEventListener('refreshInit',measureFlow));
      gsap.set([client,merchant,ticket,pointer],{force3D:true});
      const blue='#0747ff';
      const muted='#697586';
      let displayedScene=-1;
      const syncScene=()=>{
        const time=journey.time();
        activeScene=sceneStarts.reduce((value,start,index)=>time>=start?index:value,0);
        if(displayedScene===activeScene)return;
        displayedScene=activeScene;
        steps.forEach((button,index)=>{
          button.setAttribute('aria-pressed',String(index===activeScene));
          chapters[index].setAttribute('aria-hidden',String(index!==activeScene));
        });
      };
      const journey=gsap.timeline({paused:!cinematic,onUpdate:syncScene,scrollTrigger:cinematic?{id:'product-story',trigger:flow,pin,start:'top top',end:()=>'+='+Math.max(2200,window.innerHeight*3.2),scrub:.55,invalidateOnRefresh:true,onUpdate:settleFastScroll}:undefined,defaults:{ease:'power1.inOut'}});
      if(!reduced){
        const zoom=cinematic?1.12:1;
        const focus=element=>()=>-(zoom-1)*(local(element).y+element.offsetHeight/2);
        gsap.set(canvas,{transformOrigin:'0 0',scale:1,x:0,y:0,force3D:true});
        journey.to(canvas,{scale:zoom,x:()=>-(zoom-1)*canvas.clientWidth/2,y:focus(day),duration:.8,ease:'power2.inOut'},.15)
          .to(canvas,{y:focus(slot),duration:1,ease:'power2.inOut'},1.55)
          .to(canvas,{scale:1,x:0,y:0,duration:.65,ease:'power2.inOut'},3.6);
      }
      journey.to(pointer,{autoAlpha:1,x:()=>local(day).x+local(day).width/2,y:()=>local(day).y+12,duration:.45},.4)
        .fromTo(pulse,{scale:.25,autoAlpha:.8},{scale:1.7,autoAlpha:0,duration:.35},.95)
        .to(day,{'--day-selected':1,color:'#fff',duration:.2},1)
        .to(pointer,{autoAlpha:0,duration:.16},1.35)
        .to(client.querySelector('.bw-ui-date-prompt'),{autoAlpha:0,y:-8,duration:.3},1.3)
        .fromTo(availability,{height:()=>availabilityHeight(prompt)},{height:()=>availabilityHeight(times),duration:.5,immediateRender:false},1.3)
        .to(client.querySelector('.bw-ui-times'),{autoAlpha:1,y:0,duration:.5},1.65)
        .to(pointer,{autoAlpha:1,x:()=>local(slot).x+local(slot).width-32,y:()=>local(slot).y+25,duration:.55},2.3)
        .fromTo(pulse,{scale:.25,autoAlpha:.8},{scale:1.7,autoAlpha:0,duration:.35,immediateRender:false},2.95)
        .to(slot,{'--slot-selected':1,duration:.2},3)
        .to(client.querySelector('.bw-ui-slot-secondary'),{opacity:.35,duration:.25},3.1)
        .to(client.querySelector('.bw-ui-selection-label'),{autoAlpha:0,duration:.12},3)
        .to(client.querySelector('.bw-ui-check'),{autoAlpha:1,scale:1,duration:.25,ease:'back.out(1.7)'},3.05)
        .to(client.querySelector('.bw-ui-selection-summary'),{autoAlpha:1,duration:.2},3.15)
        .to(pointer,{autoAlpha:0,duration:.15},3.4)
        .to(ticket,{autoAlpha:1,duration:.42},3.7)
        .to(ticket,{y:()=>Math.max(24,(canvas.clientHeight-ticket.offsetHeight)/2),duration:1.1,ease:'power2.inOut'},3.95)
        .to(client,{opacity:.18,duration:.8},4.05)
        .to(client,{x:()=>-canvas.clientWidth*.55,autoAlpha:0,duration:1.55},5.1)
        .to(merchant,{x:0,autoAlpha:1,duration:1.55},5.1)
        .to(ticket,{x:()=>local(row).x+(local(row).width-local(slot).width)/2,y:()=>local(row).y+(local(row).height-120)/2,duration:2,ease:'power2.inOut'},5.1)
        .to(flow.querySelector('.bw-flow-client-label'),{color:muted,duration:.65},5.35)
        .to(flow.querySelector('.bw-flow-shop-label'),{color:blue,duration:.65},5.35)
        .to(ticket,{autoAlpha:0,y:()=>local(row).y+(local(row).height-120)/2+6,duration:.55,ease:'power1.out'},7.1)
        .fromTo(row,{autoAlpha:0,y:6},{autoAlpha:1,y:0,duration:.55,ease:'power1.out'},7.15)
        .set(merchant.querySelectorAll('.bw-flow-count'),{textContent:'1'},7.35)
        .fromTo(row,{'--arrival-glow':1},{'--arrival-glow':0,duration:.85},7.35)
        .to(flow.querySelector('.bw-flow-complete'),{autoAlpha:1,duration:.3},7.5)
        .to({}, {duration:.8},8);
      chapter(journey,1,1.55);
      chapter(journey,2,3.7);
      chapter(journey,3,5.1);
      const customerTarget=profile.querySelector('.bw-ui-customer');
      const identity=flow.querySelector('.bw-flow-identity');
      const profileHead=profile.querySelector('.bw-ui-profile');
      const rowIdentity=[row.querySelector('.bw-ui-avatar'),row.querySelector('strong')];
      const profileIdentity=[profileHead.querySelector('.bw-ui-avatar'),profileHead.querySelector('strong')];
      const info=customerTarget.querySelector('.bw-ui-info-pane');
      const history=customerTarget.querySelector('.bw-ui-history-pane');
      const infoTab=customerTarget.querySelector('.bw-ui-info-tab');
      const historyTab=customerTarget.querySelector('.bw-ui-history-tab');
      if(!reduced){
        const profileZoom=cinematic?1.03:1;
        journey.to(canvas,{scale:profileZoom,x:()=>-(profileZoom-1)*canvas.clientWidth/2,y:0,duration:.85,ease:'power2.inOut'},10.6)
          .to(canvas,{y:-6,duration:.65,ease:'power2.inOut'},11.8)
          .fromTo(profile.querySelector('.bw-ui-latest-booking'),{y:12,autoAlpha:0},{y:0,autoAlpha:1,duration:.5,immediateRender:false},10.55)
          .fromTo(profile.querySelector('.bw-ui-history-row'),{y:12,autoAlpha:0},{y:0,autoAlpha:1,duration:.45,immediateRender:false},12.1);
      }
      const rowPoint=()=>({x:local(rowIdentity[0]).x,y:local(row).y+(row.offsetHeight-48)/2});
      const profilePoint=()=>({x:local(profileIdentity[0]).x,y:local(profileIdentity[0]).y-10});
      gsap.set(profile,{autoAlpha:0,x:60,force3D:true});
      gsap.set(identity,{autoAlpha:0,x:()=>rowPoint().x,y:()=>rowPoint().y,force3D:true});
      gsap.set(profileIdentity,{autoAlpha:0});
      gsap.set(info,{autoAlpha:1});
      gsap.set(history,{autoAlpha:0});
      gsap.set(infoTab,{backgroundColor:'var(--ui-bg)',color:'var(--ui-ink)',boxShadow:'0 1px 3px #0001'});
      gsap.set(historyTab,{backgroundColor:'transparent',color:'var(--ui-muted)',boxShadow:'none'});
      journey.to(pointer,{autoAlpha:1,x:()=>local(rowIdentity[1]).x+40,y:()=>local(rowIdentity[1]).y+8,duration:.5},8.65)
        .fromTo(pulse,{scale:.25,autoAlpha:.8},{scale:1.7,autoAlpha:0,duration:.35,immediateRender:false},9.15)
        .to(pointer,{autoAlpha:0,duration:.2},9.3)
        .set(identity,{autoAlpha:1},9.35)
        .set(rowIdentity,{autoAlpha:0},9.35)
        .to(merchant,{x:-32,autoAlpha:0,duration:.45},9.4)
        .to(profile,{x:0,autoAlpha:1,duration:.65},9.85)
        .to(identity,{x:()=>profilePoint().x,y:()=>profilePoint().y,duration:1.2,ease:'power2.inOut'},9.4)
        .to(identity,{autoAlpha:0,duration:.22},10.55)
        .to(profileIdentity,{autoAlpha:1,duration:.22},10.55)
        .to(flow.querySelector('.bw-flow-complete'),{autoAlpha:0,duration:.25},9.3)
        .to(pointer,{autoAlpha:1,x:()=>local(historyTab).x+historyTab.offsetWidth*.6,y:()=>local(historyTab).y+18,duration:.55},11.15)
        .fromTo(pulse,{scale:.25,autoAlpha:.8},{scale:1.7,autoAlpha:0,duration:.35,immediateRender:false},11.7)
        .to(info,{autoAlpha:0,y:-8,duration:.3},11.8)
        .fromTo(history,{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.45},12)
        .set(infoTab,{backgroundColor:'transparent',color:'var(--ui-muted)',boxShadow:'none'},11.95)
        .set(historyTab,{backgroundColor:'var(--ui-bg)',color:'var(--ui-ink)',boxShadow:'0 1px 3px #0001'},11.95)
        .to(pointer,{autoAlpha:0,duration:.2},12.15)
        .to({}, {duration:.9},12.5);
      chapter(journey,4,9.35);
      journey.to(flow.querySelector('.bw-flow-progress>span'),{scaleX:1,ease:'none',duration:13.4},0);
      selectScene=(index,behavior='instant')=>{
        if(!sceneTimes[index]&&index!==0)return;
        const story=journey.scrollTrigger;
        if(story){
          window.scrollTo({top:story.start+(story.end-story.start)*sceneTimes[index]/journey.duration(),behavior});
          if(behavior==='smooth')return;
          ScrollTrigger.update();
          story.getTween()?.progress(1);
        }
        journey.time(sceneTimes[index],false);
        syncScene();
        fitActiveScene();
        if(context.conditions.mobile&&!reduced){
          gsap.fromTo(visual,{opacity:.6,y:8},{opacity:1,y:0,duration:.28,ease:'power2.out',overwrite:true});
        }
      };
      steps.forEach((button,index)=>listen(button,'click',()=>selectScene(index)));
      listen(flow.querySelector('.bw-flow-steps'),'keydown',event=>{
        const index=steps.indexOf(document.activeElement);
        if(index<0)return;
        const next=event.key==='ArrowRight'?(index+1)%steps.length:event.key==='ArrowLeft'?(index+steps.length-1)%steps.length:event.key==='Home'?0:event.key==='End'?steps.length-1:-1;
        if(next<0)return;
        event.preventDefault();steps[next].focus();selectScene(next);
      });
      if(!cinematic)journey.time(sceneTimes[activeScene],false);
      syncScene();
      fitActiveScene();
      if(!cinematic){
        let sceneResizeFrame;
        const sceneObserver=new ResizeObserver(()=>{
          cancelAnimationFrame(sceneResizeFrame);
          sceneResizeFrame=requestAnimationFrame(fitActiveScene);
        });
        [client,merchant,profile].forEach(scene=>sceneObserver.observe(scene));
        cleanups.push(()=>{sceneObserver.disconnect();cancelAnimationFrame(sceneResizeFrame);});
      }
      if(context.conditions.mobile)cleanups.push(()=>{
        gsap.killTweensOf(visual);
        gsap.set(visual,{clearProps:'opacity,transform'});
      });
    }
    if(context.conditions.mobile&&!reduced){
      qa('.bw-mobile-story-visual').forEach(card=>onApproach(card,()=>gsap.fromTo(card,{y:12},{y:0,duration:.45,ease:'power2.out'})));
    }
    const heroSection=q('.bw-hero-live');
    const scrollCue=q('.bw-hero-watch .bw-action-icon');
    if(scrollCue&&!reduced){
      const cue=gsap.timeline({paused:true,repeat:-1,repeatDelay:.5})
        .to(scrollCue,{y:5,duration:.55,ease:'sine.inOut'})
        .to(scrollCue,{y:0,duration:.55,ease:'sine.inOut'});
      observeLoop(scrollCue,cue);
    }
    const spread=q('.bw-hero-spread');
    const bookingNotes=qa('.bw-hero-booking-note');
    const bookingNote=bookingNotes[0];
    revealHeroAnnotation=()=>{};
    if(bookingNote&&!heroAnnotationShown&&!reduced&&context.conditions.desktop){
      let visible=false;
      const caption=bookingNotes.map(note=>note.querySelector('p'));
      const curve=bookingNotes.map(note=>note.querySelector('.bw-hero-note-curve'));
      const tip=bookingNotes.map(note=>note.querySelector('.bw-hero-note-tip'));
      const annotation=gsap.timeline({paused:true})
        .fromTo(caption,{autoAlpha:0,y:8},{autoAlpha:1,y:0,duration:.6,ease:'power2.out'},0)
        .fromTo(curve,{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,autoRound:false,duration:.65,ease:'power2.inOut'},.3)
        .fromTo(tip,{autoAlpha:0},{autoAlpha:1,duration:.15},.85);
      revealHeroAnnotation=()=>{
        const inHero=(ScrollTrigger.getById('hero-spread')?.progress||0)<.38;
        if(heroAnnotationReady&&visible&&inHero&&!heroAnnotationShown){heroAnnotationShown=true;annotation.play();}
      };
      const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;revealHeroAnnotation();},{threshold:.5});
      observer.observe(caption[0]);
      cleanups.push(()=>observer.disconnect());
    }
    if(heroSection&&context.conditions.pointer&&!context.conditions.mobile&&!reduced){
      const frames=[
        [heroSection.querySelector('.bw-hero-live-spm'),7,1.3],
        [heroSection.querySelector('.bw-hero-live-customer'),16,2.5],
        [heroSection.querySelector('.bw-hero-live-result'),22,3]
      ].filter(([frame])=>frame);
      const pointer={x:0,y:0};
      const paint=()=>{
        frames.forEach(([frame,distance,tilt])=>{
          frame.style.translate=`${pointer.x*distance}px ${pointer.y*distance}px`;
          const magnitude=Math.hypot(pointer.x,pointer.y);
          frame.style.rotate=magnitude>.001?`${-pointer.y} ${pointer.x} 0 ${magnitude*tilt}deg`:'none';
        });
      };
      const moveX=gsap.quickTo(pointer,'x',{duration:.7,ease:'power3.out',onUpdate:paint});
      const moveY=gsap.quickTo(pointer,'y',{duration:.7,ease:'power3.out',onUpdate:paint});
      const reset=()=>{moveX(0);moveY(0);};
      listen(heroSection,'pointermove',event=>{
        if(event.pointerType==='touch')return;
        const bounds=heroSection.getBoundingClientRect();
        moveX(gsap.utils.clamp(-1,1,(event.clientX-bounds.left)/bounds.width*2-1));
        moveY(gsap.utils.clamp(-1,1,(event.clientY-bounds.top)/bounds.height*2-1));
      });
      listen(heroSection,'pointerleave',reset);
      listen(window,'blur',reset);
      cleanups.push(()=>{
        moveX.tween.kill();
        moveY.tween.kill();
        frames.forEach(([frame])=>{
          frame.style.removeProperty('translate');
          frame.style.removeProperty('rotate');
        });
      });
    }

    if(heroSection&&spread&&context.conditions.desktop&&!reduced){
      heroSection.classList.add('is-spread-ready');
      const track=heroSection.closest('.bw-hero-scroll-track');
      track.classList.add('is-spread-track');
      cleanups.push(()=>{heroSection.classList.remove('is-spread-ready');track.classList.remove('is-spread-track');});
      const cards=qa('.bw-spread-card');
      const positions=[[-5,-14,-9],[6,18,6],[-6,51,-5],[5,83,7],[81,-10,8],[78,23,-6],[84,55,5],[77,87,-7]];
      const split=gsap.timeline({scrollTrigger:{id:'hero-spread',trigger:track,start:'top top',end:'bottom bottom',scrub:.55,invalidateOnRefresh:true,onUpdate:self=>{settleFastScroll(self);revealHeroAnnotation();}}});
      gsap.set(spread.querySelector('.bw-spread-heading'),{autoAlpha:0,xPercent:-50,yPercent:-50,y:24});
      cards.forEach(card=>gsap.set(card,{left:'50%',top:'50%',x:0,y:0,xPercent:-50,yPercent:-50,scale:.65,autoAlpha:0}));
      const bookingFrame=heroSection.querySelector('.bw-hero-live-customer');
      const successFrame=heroSection.querySelector('.bw-hero-live-result');
      if(successFrame){
        gsap.set(successFrame,{y:0,scale:1,transformOrigin:'50% 50%'});
        split.to(bookingFrame,{y:-70,x:-12,rotation:-2,scale:.97,duration:.45,ease:'power2.inOut'},.12)
          .to(successFrame,{y:70,x:12,rotation:2,scale:.97,duration:.45,ease:'power2.inOut'},.12)
          .to(heroSection.querySelector('.bw-hero-live-spm'),{x:65,y:0,scale:1.02,duration:.45,ease:'power2.inOut'},.12)
          .to({},{duration:.18},.57);
      }
      split.to(bookingNotes,{autoAlpha:0,y:12,duration:.25},.45);
      split.to(heroSection.querySelector('.bw-hero-copy'),{autoAlpha:0,y:-35,duration:.3},.78)
        .to(bookingFrame,{y:()=>-heroSection.clientHeight*.85,autoAlpha:0,duration:.65,ease:'power2.in'},.72)
        .to(successFrame,{y:()=>heroSection.clientHeight*.85,autoAlpha:0,duration:.65,ease:'power2.in'},.78)
        .to(heroSection.querySelector('.bw-hero-live-spm'),{x:()=>heroSection.clientWidth*.65,autoAlpha:0,duration:.65,ease:'power2.in'},.84);
      cards.forEach((card,i)=>{
        const [x,y,rotation]=positions[i];
        split.to(card,{x:()=>spread.clientWidth*(x-50)/100,y:()=>spread.clientHeight*(y-50)/100,xPercent:0,yPercent:0,scale:1,rotation,autoAlpha:1,duration:.65,ease:'power2.inOut'},.95+i*.025);
      });
      split.to(spread.querySelector('.bw-spread-heading'),{autoAlpha:1,y:0,duration:.35},1.35).to({},{duration:.3});
    }
    if(window.innerWidth<=900&&!reduced){
      const stage=q('.bw-hero-live-stage[data-static]');
      if(stage)gsap.fromTo(stage,{y:16},{y:0,duration:.65,ease:'power2.out',scrollTrigger:{trigger:stage,start:'top 95%',once:true}});
    }
    const accent=q('.bw-hero-accent');
    if(accent&&!reduced){
      const letters=accent.querySelectorAll('.bw-hero-letter');
      const underline=accent.querySelector('.bw-hero-underline path');
      const writing=gsap.timeline({paused:true,repeat:-1,repeatDelay:4.5});
      writing.fromTo(letters,{opacity:0,y:5},{opacity:1,y:0,duration:.35,stagger:.09,ease:'power2.out'},0)
        .fromTo(underline,{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,autoRound:false,duration:.65,ease:'power2.out'},.4);
      observeLoop(accent,writing);
    }
    if(!reduced){
      const howRows=qa('.bw-how li');

      howRows.forEach((row,index)=>onApproach(row,()=>{
        const art=row.querySelector('.bw-step-scene');
        const cursor=art.querySelector('.bw-film-cursor');
        const notice=art.querySelector('.bw-film-notice');
        const tl=gsap.timeline({paused:true,defaults:{ease:'power2.inOut'}});
        gsap.set([cursor,notice],{autoAlpha:0});
        tl.set(notice,{autoAlpha:0},0)
          .fromTo(cursor,{autoAlpha:0,x:12,y:14},{autoAlpha:1,x:0,y:0,duration:.5},.4)
          .to(cursor,{scale:.88,duration:.12,yoyo:true,repeat:1},1.05)
          .to(cursor,{autoAlpha:0,duration:.2},1.5)
          .to(notice,{autoAlpha:1,duration:.35},2.1)
          .to({},{duration:3},2.5);
        if(index===0){
          tl.fromTo(art.querySelector('.bw-film-switch'),{backgroundColor:'#d5dce0'},{backgroundColor:'#4f8966',duration:.3},1.15)
            .fromTo(art.querySelector('.bw-film-switch i'),{x:0},{x:11,duration:.3},1.15)
            .fromTo(art.querySelector('.bw-film-linkrow'),{borderColor:'#e3e8e5'},{borderColor:'#8ab39a',duration:.3},1.65);
        }else if(index===1){
          tl.fromTo(art.querySelector('.is-day'),{backgroundColor:'#fff'},{backgroundColor:'#e9edf5',duration:.3},.6)
            .fromTo(art.querySelector('.is-slot'),{backgroundColor:'#fff',color:'#243142'},{backgroundColor:'#536b83',color:'#fff',duration:.3},1.2);
        }else{
          tl.fromTo(art.querySelectorAll('.bw-film-channels>span'),{backgroundColor:'#fff'},{backgroundColor:'#e9edf5',stagger:.25,duration:.3},.65)
            .fromTo(art.querySelector('.bw-film-live'),{color:'#61706a'},{color:'#39694c',duration:.3},1.65);
        }
        observeLoop(art,tl);
      }));

    }
    if(!reduced){
      qa('.bw-industry-scene').forEach(art=>onApproach(art,()=>{
        const index=Number(art.dataset.industryIndex);
        const tl=gsap.timeline({paused:true,repeat:context.conditions.mobile?0:-1,repeatDelay:1.4,defaults:{ease:'power2.inOut'}});
        const symbols=gsap.timeline({paused:true,repeat:-1,repeatDelay:2.4});
        const animateSymbol=(selector,from,to,at=0)=>{
          const nodes=art.querySelectorAll(selector);
          if(nodes.length)symbols.fromTo(nodes,from,{...to,duration:.9,repeat:1,yoyo:true,ease:'sine.inOut'},at);
        };
        if(index===0){
          animateSymbol('.bw-symbol-fork',{rotation:0,y:0,svgOrigin:'22 45'},{rotation:-12,y:-2});
          animateSymbol('.bw-symbol-spoon',{rotation:0,y:0,svgOrigin:'44 45'},{rotation:12,y:-2},.16);
        }
        if(index===1){
          animateSymbol('.bw-symbol-petal-left',{rotation:0,svgOrigin:'32 46'},{rotation:24});
          animateSymbol('.bw-symbol-petal-right',{rotation:0,svgOrigin:'32 46'},{rotation:-24});
        }
        if(index===2)animateSymbol('.bw-symbol-weight',{y:0},{y:-6});
        if(index===3)animateSymbol('.bw-symbol-cap',{y:0,rotation:0,svgOrigin:'32 32'},{y:-4,rotation:-7});
        if(index===4)animateSymbol('.bw-symbol-ticket',{y:0,rotation:0,svgOrigin:'32 32'},{y:-3,rotation:10});
        if(index===5){
          animateSymbol('.bw-symbol-route',{opacity:1},{opacity:.45});
          animateSymbol('.bw-symbol-pin',{y:0},{y:-5});
        }
        if(index===6)animateSymbol('.bw-symbol-key',{rotation:0,svgOrigin:'32 32'},{rotation:-12});
        if(index===7)animateSymbol('.bw-symbol-gear',{rotation:0,svgOrigin:'32 32'},{rotation:35});
        symbols.to({},{duration:.2},1.8);
        observeLoop(art,symbols);
        const highlight=(selector,from,to,at=1)=>{const nodes=art.querySelectorAll(selector);if(nodes.length)tl.fromTo(nodes,from,{...to,duration:.4,stagger:.12},at+2.2);};
        if(index===0){highlight('.bw-dinner-rounds .is-selected',{backgroundColor:'#ffffff',color:'#23324b'},{backgroundColor:'#263449',color:'#fff'},.8);highlight('.bw-guest-count b',{color:'#748094'},{color:'#263449'},1.4);}
        if(index===1)highlight('.bw-industry-selected',{backgroundColor:'#ffffff',color:'#23324b'},{backgroundColor:'#263449',color:'#fff'});
        if(index===2){highlight('.bw-class-time>b',{color:'#23324b'},{color:'#263449'});highlight('.bw-capacity .filled',{backgroundColor:'#fff'},{backgroundColor:'#758398'},.8);}
        if(index===3)highlight('.bw-lesson-days .chosen',{backgroundColor:'#fff'},{backgroundColor:'#e1e6ee'});
        if(index===4)highlight('.bw-participant-count',{backgroundColor:'#fff'},{backgroundColor:'#e9edf2'});
        if(index===5)highlight('.bw-tour-route>span',{color:'#8999a2'},{color:'#263449'});
        if(index===6)highlight('.bw-rental-reservation',{backgroundColor:'#e1e6ee',color:'#334155'},{backgroundColor:'#263449',color:'#fff'});
        if(index===7)highlight('.bw-preview-status',{backgroundColor:'#fff'},{backgroundColor:'#e9edf2'});
        tl.to({},{duration:1.2},4.4);observeLoop(art,tl);
      }));
    }
    if(!reduced){
      const enter=(trigger,build)=>{
        if(!trigger)return;
        if(context.conditions.mobile){
          onApproach(trigger,()=>build(gsap.timeline({defaults:{duration:.5}})));
          return;
        }
        const timeline=gsap.timeline({defaults:{duration:.5},scrollTrigger:{trigger,start:'top 88%',end:'top 48%',scrub:.2,invalidateOnRefresh:true,onUpdate:settleFastScroll}});
        build(timeline);
      };
      enter(q('.bw-journey-head'),timeline=>{
        timeline.fromTo(q('.bw-journey-head'),{y:24,opacity:1},{y:0,opacity:1,ease:'power2.out'});
      });
      qa('.bw-how li').forEach((row,index)=>{
        enter(row,timeline=>{
          timeline.fromTo(row.querySelector('.bw-step-number'),{scale:.75,opacity:1},{scale:1,opacity:1,ease:'power2.out'},0);
          timeline.fromTo(row.querySelector('.bw-step-copy'),{y:24,opacity:1},{y:0,opacity:1,ease:'power2.out'},index*.06);
          timeline.fromTo(row.querySelector('.bw-step-scene'),{y:context.conditions.mobile?16:52,scale:context.conditions.mobile?1:.96,opacity:1},{y:0,scale:1,opacity:1,ease:'power2.out'},.12+index*.06);
        });
      });
      const faq=q('.bw-faq');
      if(faq){
        enter(faq,timeline=>{
          timeline.fromTo(faq.querySelector('.bw-heading'),{x:-24,opacity:1},{x:0,opacity:1,ease:'power2.out'});
        });
        qa('.bw-faq details').forEach(row=>{
          onApproach(row,()=>gsap.fromTo(row,{y:18,opacity:1},{y:0,opacity:1,duration:.45,ease:'power2.out'}));
        });
      }
      const contact=q('.bw-contact');
      enter(contact,timeline=>{
        timeline.fromTo(q('.bw-contact-copy'),{x:-24,y:16,opacity:1},{x:0,y:0,opacity:1,ease:'power2.out'},0);
        timeline.fromTo(q('.bw-contact-products'),{y:56,scale:.92,opacity:1},{y:0,scale:1,opacity:1,ease:'power2.out'},.08);
      });
      const footer=q('.bw-footer-top');
      if(footer)onApproach(footer,()=>gsap.fromTo(Array.from(footer.children),{y:16,opacity:1},{y:0,opacity:1,duration:.45,stagger:.07,ease:'power2.out'}));
    }
    if(reduced){
      gsap.set(qa('.bw-film-notice,.bw-onboard-result'),{autoAlpha:1});
      gsap.set(qa('.bw-film-cursor'),{autoAlpha:0});
      gsap.set(qa('.bw-film-switch'),{backgroundColor:'#4f8966'});
      gsap.set(qa('.bw-film-switch i'),{x:11});
      gsap.set(qa('.bw-film-slots .is-slot'),{backgroundColor:'#536b83',color:'#fff'});
    }
    const business=q('.bw-business');
    const rail=q('.bw-business-directory');
    const viewport=q('.bw-industry-viewport');
    const galleryControls=q('.bw-industry-controls');
    const previousBusiness=q('[data-business-direction="previous"]');
    const nextBusiness=q('[data-business-direction="next"]');
    const businessRange=q('.bw-industry-range');
    let gallery=null;
    const touchGallery=context.conditions.touch;
    const galleryHold=touchGallery?.03:.08;
    let galleryWidth=0;
    let galleryTravel=0;
    let galleryStride=0;
    const measureGallery=()=>{
      galleryWidth=viewport.clientWidth;
      galleryTravel=Math.max(0,rail.scrollWidth-galleryWidth);
      galleryStride=rail.firstElementChild.offsetWidth+parseFloat(getComputedStyle(rail).columnGap||0);
    };
    measureGallery();
    ScrollTrigger.addEventListener('refreshInit',measureGallery);
    cleanups.push(()=>ScrollTrigger.removeEventListener('refreshInit',measureGallery));
    const galleryDistance=()=>galleryTravel;
    const galleryOffset=()=>gallery?Math.max(0,-Number(gsap.getProperty(rail,'x'))):viewport.scrollLeft;
    const galleryStep=()=>galleryStride;
    const syncGallery=()=>{
      const distance=galleryDistance();
      const offset=galleryOffset();
      galleryControls.hidden=distance<2;
      previousBusiness.disabled=offset<2;
      nextBusiness.disabled=offset>=distance-2;
      const step=galleryStep();
      const first=Math.min(rail.children.length,Math.floor((offset+1)/step)+1);
      const last=Math.min(rail.children.length,Math.ceil((offset+galleryWidth-1)/step));
      const label=`${first===last?first:first+'–'+last} / ${rail.children.length}`;
      if(businessRange.textContent!==label)businessRange.textContent=label;
    };
    const moveGallery=direction=>{
      const offset=galleryOffset();
      const next=direction==='start'?0:direction==='end'?galleryDistance():gsap.utils.clamp(0,galleryDistance(),offset+direction*galleryStep());
      const behavior=reduced?'instant':'smooth';
      if(gallery){
        const trigger=gallery.scrollTrigger;
        const fraction=galleryDistance()?next/galleryDistance():0;
        const progress=touchGallery?fraction:Math.acos(1-2*fraction)/Math.PI;
        window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*(galleryHold+progress)/gallery.duration(),behavior});
      }else viewport.scrollTo({left:next,behavior});
    };
    listen(previousBusiness,'click',()=>moveGallery(-1));
    listen(nextBusiness,'click',()=>moveGallery(1));
    listen(viewport,'scroll',syncGallery);
    listen(viewport,'keydown',event=>{
      const direction={ArrowLeft:-1,ArrowRight:1,Home:'start',End:'end'}[event.key];
      if(direction===undefined)return;
      event.preventDefault();moveGallery(direction);
    });
    if(business&&!reduced){
      const revealTargets=Array.from(business.children);
      gsap.fromTo(revealTargets,{autoAlpha:0,y:16},{autoAlpha:1,y:0,duration:.7,stagger:.07,ease:'power2.out',scrollTrigger:{trigger:business,start:'top 85%',once:true,fastScrollEnd:1800}});
    }
    if(!reduced&&context.conditions.gallery&&business&&rail&&viewport){
      const distance=galleryDistance;
      const track=business.closest('.bw-business-scroll-track');
      if(track){
        track.classList.add('is-business-track');
        track.classList.toggle('is-touch-business-track',touchGallery);
        viewport.scrollTo({left:0,behavior:'instant'});
        const pinTop=()=>touchGallery?Math.min((header?.offsetHeight||64)+16,window.innerHeight-business.offsetHeight-24):Math.min(0,window.innerHeight-business.offsetHeight);
        const sizeTrack=()=>{
          measureGallery();
          track.style.setProperty('--business-pin-top',`${pinTop()}px`);
          const travel=touchGallery?Math.max(window.innerHeight*.8,distance()*1.1):Math.max(1000,distance()*1.45);
          track.style.height=`${business.offsetHeight+travel}px`;
        };
        sizeTrack();
        ScrollTrigger.addEventListener('refreshInit',sizeTrack);
        gallery=gsap.timeline({onUpdate:syncGallery,scrollTrigger:{id:'business-gallery',trigger:track,start:()=>`top ${pinTop()}px`,end:()=>touchGallery?`bottom ${pinTop()+business.offsetHeight}px`:'bottom bottom',scrub:touchGallery?.4:.55,invalidateOnRefresh:true,onUpdate:self=>{
          if(touchGallery&&!galleryRestore&&!self.isReverted&&window.innerWidth===galleryViewportWidth&&window.innerHeight===galleryViewportHeight){
            gallerySnapshot=self.scroll()>=self.start&&self.scroll()<=self.end?{progress:self.progress,fraction:gsap.utils.clamp(0,1,self.progress*(1+galleryHold*2)-galleryHold)}:null;
          }
          settleFastScroll(self);syncGallery();
        },onScrubComplete:syncGallery}});
        gallery.to({},{duration:galleryHold});
        gallery.fromTo(rail,{x:0},{x:()=>-distance(),duration:1,ease:touchGallery?'none':'sine.inOut',force3D:true});
        gallery.to({},{duration:galleryHold});
        cleanups.push(()=>{gallerySnapshot=null;ScrollTrigger.removeEventListener('refreshInit',sizeTrack);track.classList.remove('is-business-track','is-touch-business-track');track.style.removeProperty('height');track.style.removeProperty('--business-pin-top');});
      }
    }
    let galleryResizeFrame;
    const galleryObserver=new ResizeObserver(()=>{
      cancelAnimationFrame(galleryResizeFrame);
      galleryResizeFrame=requestAnimationFrame(()=>{measureGallery();syncGallery();});
    });
    galleryObserver.observe(viewport);
    cleanups.push(()=>{galleryObserver.disconnect();cancelAnimationFrame(galleryResizeFrame);});
    syncGallery();
    syncNavigation();
    return()=>{cleanups.forEach(cleanup=>cleanup());};
  });
  const applyGalleryPosition=()=>{
    if(galleryRestore===null)return;
    const {progress,fraction}=galleryRestore;
    const trigger=ScrollTrigger.getById('business-gallery');
    if(trigger){
      window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*progress,behavior:'instant'});
      ScrollTrigger.update();
      trigger.getTween()?.progress(1);
    }else{
      const viewport=q('.bw-industry-viewport');
      const track=q('.bw-business-scroll-track');
      viewport.scrollTo({left:(viewport.scrollWidth-viewport.clientWidth)*fraction,behavior:'instant'});
      window.scrollTo({top:window.scrollY+track.getBoundingClientRect().top-(header?.offsetHeight||64)-16,behavior:'instant'});
    }
    syncNavigation();
  };
  const restoreGalleryPosition=()=>{
    if(galleryRestore===null)return;
    applyGalleryPosition();
    clearTimeout(galleryRestoreTimer);
    galleryRestoreTimer=setTimeout(()=>{
      ScrollTrigger.refresh();
      applyGalleryPosition();
      gallerySnapshot=ScrollTrigger.getById('business-gallery')?galleryRestore:null;
      galleryViewportWidth=window.innerWidth;
      galleryViewportHeight=window.innerHeight;
      galleryRestore=null;
    },220);
  };
  gsap.addEventListener('matchMedia',restoreGalleryPosition);
  const cancelGalleryRestore=()=>{clearTimeout(galleryRestoreTimer);galleryRestore=null;galleryViewportWidth=window.innerWidth;galleryViewportHeight=window.innerHeight;};
  on(window,'resize',()=>{
    if(window.innerWidth!==galleryViewportWidth)rememberGalleryPosition();
    if(galleryRestore)restoreGalleryPosition();
    else cancelGalleryRestore();
  });
  on(window,'touchstart',cancelGalleryRestore,{passive:true});
  on(window,'wheel',cancelGalleryRestore,{passive:true});
  on(window,'pointerdown',cancelGalleryRestore,{passive:true});
  on(window,'keydown',cancelGalleryRestore);
  permanentCleanups.push(()=>{cancelGalleryRestore();gsap.removeEventListener('matchMedia',restoreGalleryPosition);});
  let resizeTimer;
  let measuredWidth=page.getBoundingClientRect().width;
  const resizeObserver=new ResizeObserver(()=>{
    const width=page.getBoundingClientRect().width;
    if(Math.abs(width-measuredWidth)<2)return;
    measuredWidth=width;
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>{
      if(!root.isConnected)return;
      ScrollTrigger.refresh(true);
    },160);
  });
  resizeObserver.observe(page);
  permanentCleanups.push(()=>resizeObserver.disconnect());
  let refreshTimer;
  const refresh=()=>{
    clearTimeout(refreshTimer);
    refreshTimer=setTimeout(()=>{if(root.isConnected)ScrollTrigger.refresh(true);},150);
  };
  qa('details').forEach(item=>on(item,'toggle',refresh));
  qa('img').filter(image=>!image.complete).forEach(image=>on(image,'load',refresh,{once:true}));
  let initialPositioned=false;
  const positionInitialHash=()=>{
    if(initialPositioned||!root.isConnected)return;
    initialPositioned=true;
    ScrollTrigger.refresh();
    const target=location.hash?document.getElementById(location.hash.slice(1).replace(/^bw-/,'')):null;
    if(target){
      if(location.hash!=='#'+target.id)history.replaceState(null,'','#'+target.id);
    }
    requestAnimationFrame(()=>{
      if(target)jump(target);
      heroAnnotationReady=true;
      revealHeroAnnotation();
    });
  };
  Promise.resolve(document.fonts?.ready).then(()=>requestAnimationFrame(positionInitialHash));
  on(window,'pageshow',refresh);
  on(window,'pagehide',event=>{if(event.persisted)return;media.revert();permanentCleanups.forEach(cleanup=>cleanup());clearTimeout(refreshTimer);clearTimeout(resizeTimer);cancelAnimationFrame(navFrame);});
})();
