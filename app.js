document.addEventListener('DOMContentLoaded',()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(i=>io.observe(i));
const toast=$('#toast');
$$('.service-list em').forEach(b=>b.addEventListener('click',()=>{$('span',toast).textContent='این سرویس به‌زودی در تزگور فعال می‌شود.';toast.classList.add('show');clearTimeout(window.tezgorToast);window.tezgorToast=setTimeout(()=>toast.classList.remove('show'),3200)}));

/* panels */
const panels=$$('.info-panel'),area=$('#info-area');
function openPanel(id,scroll=true){
  panels.forEach(p=>p.classList.toggle('open',p.id===id));
  area.classList.toggle('has-open',!!id);
  $$('[data-panel]').forEach(a=>a.classList.toggle('active',a.dataset.panel===id));
  if(id&&scroll)setTimeout(()=>document.getElementById(id).scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}),60);
}
const nav=$('#mainNav'),tg=$('#menuToggle');
const closeMenu=()=>{nav.classList.remove('open');tg.setAttribute('aria-expanded','false')};
tg.addEventListener('click',()=>{const o=nav.classList.toggle('open');tg.setAttribute('aria-expanded',o)});
$$('#mainNav a').forEach(a=>a.addEventListener('click',e=>{
  closeMenu();
  if(a.dataset.panel){e.preventDefault();openPanel(a.dataset.panel);history.replaceState(null,'','#'+a.dataset.panel)}
  else if('home' in a.dataset){e.preventDefault();openPanel(null);scrollTo({top:0,behavior:reduce?'auto':'smooth'});history.replaceState(null,'',location.pathname)}
  else openPanel(null,false);
}));
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>{openPanel(null);history.replaceState(null,'',location.pathname)}));
$$('[data-more]').forEach(b=>b.addEventListener('click',()=>{
  const m=$('.more',b.parentElement),o=m.classList.toggle('open');
  b.classList.toggle('on',o);$('span',b).textContent=o?'بستن ادامه مطلب':'ادامه مطلب';
}));
if(panels.some(p=>'#'+p.id===location.hash))openPanel(location.hash.slice(1));

/* bot address banner */
const ban=$('#botBanner'),URL_BOT='https://t.me/TezGorBot';let bt;
$('#botCard').addEventListener('click',()=>{ban.classList.add('show');clearTimeout(bt);bt=setTimeout(()=>ban.classList.remove('show'),9000)});
$('#closeBanner').addEventListener('click',()=>ban.classList.remove('show'));
$('#copyBot').addEventListener('click',e=>{const b=e.currentTarget;(navigator.clipboard?navigator.clipboard.writeText(URL_BOT):Promise.reject()).then(()=>b.textContent='کپی شد',()=>b.textContent='دستی کپی کنید');setTimeout(()=>b.textContent='کپی آدرس',2200)});

/* proximity zoom: elements grow as the mouse gets near */
if(!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches){
  const fx=$$('.feature-card,.service-item,.faq-list details,.stats>div,.button,.visual-frame,.service-image,.floating-note,.sample-shot,.desktop-nav a,.brand');
  fx.forEach(el=>el.classList.add('fx'));
  let mx=-999,my=-999,raf=0;
  const tick=()=>{raf=0;for(const el of fx){const r=el.getBoundingClientRect();
    if(r.bottom<-300||r.top>innerHeight+300){continue}
    const d=Math.hypot(Math.max(r.left-mx,0,mx-r.right),Math.max(r.top-my,0,my-r.bottom));
    const k=Math.max(0,1-d/150),mx_=r.width>380?.03:.07;
    el.style.setProperty('--s',(1+mx_*k*k).toFixed(3));el.style.scale='var(--s)'}};
  addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;mx=e.clientX;my=e.clientY;if(!raf)raf=requestAnimationFrame(tick)});
  document.addEventListener('mouseleave',()=>{mx=my=-999;if(!raf)raf=requestAnimationFrame(tick)});
}
});
