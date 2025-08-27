// ===== sparkles (canvas) =====
const s = document.getElementById('sparks'), ctx = s.getContext('2d');
let W, H, PS;
function size(){
  W = s.width = innerWidth; H = s.height = innerHeight;
  const n = Math.min(180, Math.floor(W * H / 11000));
  PS = Array.from({length:n}, () => ({
    x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.8+.4,
    a: Math.random()*6.28, s: Math.random()*.45+.12, o: Math.random()*.35+.15
  }));
}
function loop(){
  ctx.clearRect(0,0,W,H);
  for(const p of PS){
    p.a += .0028; p.x += Math.cos(p.a)*p.s; p.y += Math.sin(p.a)*p.s*.45;
    if(p.x<-10) p.x=W+10; if(p.x>W+10) p.x=-10; if(p.y<-10) p.y=H+10; if(p.y>H+10) p.y=-10;
    const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*3);
    g.addColorStop(0, `rgba(255,80,80,${p.o})`); g.addColorStop(1, 'rgba(255,80,80,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r*3,0,6.28); ctx.fill();
  }
  requestAnimationFrame(loop);
}
addEventListener('resize', size);
size(); loop();

// ===== floating hearts =====
(function(){
  const LAYER = document.getElementById('hearts'); if(!LAYER) return;
  const HEART = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="72" viewBox="0 0 40 36">
    <defs><radialGradient id="hg" cx="50%" cy="40%" r="70%"><stop offset="0%" stop-color="#ffd0d4"/><stop offset="45%" stop-color="#ff5252"/><stop offset="100%" stop-color="#7c1414"/></radialGradient></defs>
    <g filter="drop-shadow(0 4px 10px rgba(255,80,80,.55))">
      <path d="M20 34 C5 22,0 16,0 10 C0 5,4 2,8 2 C12 2,15 4,20 9 C25 4,28 2,32 2 C36 2,40 5,40 10 C40 16,35 22,20 34Z" fill="url(#hg)"/>
      <ellipse cx="14" cy="10" rx="8" ry="4.5" fill="white" opacity=".22"/>
    </g></svg>`);
  const isMobile = window.matchMedia('(max-width:768px)').matches;
  const COUNT = isMobile ? 12 : 18;
  const MIN_W=22, MAX_W=64, MIN_T=18, MAX_T=28;

  function spawn(svg){
    const el = document.createElement('img');
    el.src = `data:image/svg+xml;utf8,${svg}`; el.className = 'float-item';
    el.style.left = Math.random()*100 + 'vw';
    el.style.setProperty('--w', (MIN_W + Math.random()*(MAX_W-MIN_W)) + 'px');
    el.style.setProperty('--x', (Math.random()*80-40) + 'px');
    el.style.setProperty('--t', (MIN_T + Math.random()*(MAX_T-MIN_T)) + 's');
    el.style.setProperty('--r', (Math.random()*40-20) + 'deg');
    el.style.setProperty('--rEnd', (200 + Math.random()*260) + 'deg');
    el.style.setProperty('--spin', (14 + Math.random()*10) + 's');
    el.style.animationDelay = (Math.random()*12).toFixed(2) + 's';
    LAYER.appendChild(el);
  }
  for(let i=0;i<COUNT;i++) spawn(HEART);
})();

// ===== language menu =====
(function(){
  const lang = document.getElementById('lang');
  const btn  = document.getElementById('langBtn');
  const menu = document.getElementById('langMenu');
  if(!lang||!btn||!menu) return;

  function close(){ lang.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
  btn.addEventListener('click', (e)=>{
    e.stopPropagation();
    lang.classList.toggle('open');
    btn.setAttribute('aria-expanded', lang.classList.contains('open'));
  });
  document.addEventListener('click', close);
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
})();
