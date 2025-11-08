// year
document.addEventListener('DOMContentLoaded',()=>{
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  // theme
  const body=document.body;
  const stored=localStorage.getItem('theme');
  if(stored==='light') body.classList.add('light');
  const tgl=document.getElementById('themeToggle');
  if(tgl){
    tgl.addEventListener('click', ()=>{
      body.classList.toggle('light');
      localStorage.setItem('theme', body.classList.contains('light')?'light':'dark');
    });
  }

  // language
  const langStored=localStorage.getItem('lang');
  if(langStored==='en') body.classList.add('show-en');
  const btnDE=document.getElementById('btnDE');
  const btnEN=document.getElementById('btnEN');
  function setLang(isEN){
    body.classList.toggle('show-en', isEN);
    if(btnDE&&btnEN){
      btnDE.classList.toggle('active', !isEN);
      btnEN.classList.toggle('active', isEN);
    }
    localStorage.setItem('lang', isEN?'en':'de');
  }
  if(btnDE) btnDE.addEventListener('click', ()=>setLang(false));
  if(btnEN) btnEN.addEventListener('click', ()=>setLang(true));

  // reveal on scroll
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('revealed'); });
  },{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // animate ROI bars
  document.querySelectorAll('[data-w]').forEach(track=>{
    const w=track.getAttribute('data-w');
    const bar=track.querySelector('.bar');
    if(!bar) {
      const d=document.createElement('div'); d.className='bar'; track.appendChild(d);
    }
    const run=()=>{ track.querySelector('.bar').style.width=w; };
    io.observe(track); // animate on reveal
    track.addEventListener('transitionend',()=>{});
    setTimeout(run,400);
  });
});
