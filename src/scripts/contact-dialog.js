const contactDialog=document.getElementById('contact-dialog');
if(contactDialog instanceof HTMLDialogElement){
  const closeButton=contactDialog.querySelector('.bw-contact-dialog-close');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let returnTarget=null;
  let animation=null;
  let closing=false;
  let overflow='';
  let gutter='';
  const animate=async opening=>{
    animation?.cancel();
    if(reduced.matches)return;
    const offset=window.matchMedia('(max-width:600px)').matches?'32px':'10px';
    const hidden={opacity:0,transform:`translateY(${offset})`};
    const visible={opacity:1,transform:'translateY(0)'};
    animation=contactDialog.animate(opening?[hidden,visible]:[visible,hidden],{duration:opening?220:160,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
    await animation.finished.catch(()=>{});
  };
  const close=async()=>{
    if(!contactDialog.open||closing)return;
    closing=true;
    await animate(false);
    contactDialog.close();
  };
  document.querySelectorAll('[data-contact-open]').forEach(trigger=>{
    trigger.addEventListener('click',event=>{
      if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      event.preventDefault();
      if(contactDialog.open)return;
      const menuToggle=document.getElementById('bw-menu-toggle');
      returnTarget=trigger.closest('.bw-main-menu')?menuToggle:trigger;
      if(menuToggle?.getAttribute('aria-expanded')==='true')menuToggle.click();
      overflow=document.documentElement.style.overflow;
      gutter=document.documentElement.style.scrollbarGutter;
      document.documentElement.style.scrollbarGutter='stable';
      document.documentElement.style.overflow='hidden';
      closing=false;
      contactDialog.showModal();
      contactDialog.dispatchEvent(new CustomEvent('bw:contact-open',{bubbles:true,detail:{trigger}}));
      closeButton.focus({preventScroll:true});
      animate(true);
    });
  });
  closeButton.addEventListener('click',close);
  contactDialog.addEventListener('keydown',event=>{
    if(event.key!=='Tab')return;
    const controls=Array.from(contactDialog.querySelectorAll('button:not(:disabled),a[href]')).filter(control=>control.getClientRects().length>0);
    const index=controls.indexOf(document.activeElement);
    const next=index<0?0:(index+(event.shiftKey?-1:1)+controls.length)%controls.length;
    event.preventDefault();
    controls[next]?.focus();
  });
  contactDialog.addEventListener('cancel',event=>{event.preventDefault();close();});
  let backdropPointer=false;
  const outside=event=>{
    const rect=contactDialog.getBoundingClientRect();
    return event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom;
  };
  contactDialog.addEventListener('pointerdown',event=>{backdropPointer=event.target===contactDialog&&outside(event);});
  contactDialog.addEventListener('click',event=>{if(backdropPointer&&event.target===contactDialog&&outside(event))close();backdropPointer=false;});
  contactDialog.addEventListener('close',()=>{
    animation?.cancel();
    document.documentElement.style.overflow=overflow;
    document.documentElement.style.scrollbarGutter=gutter;
    closing=false;
    if(returnTarget?.isConnected)returnTarget.focus({preventScroll:true});
  });
}
