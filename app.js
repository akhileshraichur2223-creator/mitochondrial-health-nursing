const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

const pdf=$('#pdfModal');
const info=$('#infoModal');

function openPDF(){
  if(!pdf) return;
  pdf.classList.add('open');
  pdf.setAttribute('aria-hidden','false');
}
function closePDF(){
  if(!pdf) return;
  pdf.classList.remove('open');
  pdf.setAttribute('aria-hidden','true');
}
function openInfo(title,text){
  if(!info) return;
  $('#infoTitle').textContent=title;
  $('#infoText').textContent=text;
  info.classList.add('open');
  info.setAttribute('aria-hidden','false');
}
function closeInfo(){
  if(!info) return;
  info.classList.remove('open');
  info.setAttribute('aria-hidden','true');
}

const openPdf=$('#openPdf'),openPdf2=$('#openPdf2'),navPdf=$('#navPdf'),qrPdf=$('#qrPdf');
[openPdf,openPdf2,navPdf,qrPdf].forEach(b=>{if(b)b.addEventListener('click',openPDF)});
$('#closePdf')?.addEventListener('click',closePDF);
$('#closeInfo')?.addEventListener('click',closeInfo);
pdf?.addEventListener('click',e=>{if(e.target===pdf)closePDF()});
info?.addEventListener('click',e=>{if(e.target===info)closeInfo()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closePDF();closeInfo()}});

const themeBtn=$('#themeBtn');
function setTheme(dark){
 document.body.classList.toggle('dark',dark);
 if(themeBtn){themeBtn.textContent=dark?'☀':'◐';themeBtn.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');}
 try{localStorage.setItem('mito-theme',dark?'dark':'light')}catch(e){}
}
themeBtn?.addEventListener('click',()=>setTheme(!document.body.classList.contains('dark')));
try{if(localStorage.getItem('mito-theme')==='dark')setTheme(true)}catch(e){}

const menuBtn=$('#menuBtn'),nav=$('#nav');
function closeMobileMenu(){if(nav){nav.classList.remove('mobile-open');nav.style.display='';}menuBtn?.setAttribute('aria-expanded','false');}
menuBtn?.addEventListener('click',()=>{
 if(!nav)return;
 const open=nav.classList.toggle('mobile-open');
 menuBtn.setAttribute('aria-expanded',String(open));
 if(open){nav.style.display='flex';}else{nav.style.display='';}
});
$('#nav a').forEach(link=>link.addEventListener('click',()=>{if(innerWidth<=900)closeMobileMenu()}));
addEventListener('resize',()=>{if(innerWidth>900)closeMobileMenu()});

$$('[data-scroll]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));

const counters=$$('[data-count']);let counted=false;
function countUp(){
 if(counted||!$('.stats'))return;
 if($('.stats').getBoundingClientRect().top<innerHeight-60){
  counted=true;
  counters.forEach(el=>{
   const end=+el.dataset.count;let n=0;const step=Math.max(1,Math.ceil(end/45));
   const tick=()=>{n=Math.min(end,n+step);el.textContent=n.toLocaleString();if(n<end)requestAnimationFrame(tick)};
   tick();
  });
 }
}
addEventListener('scroll',()=>{
 countUp();
 const h=document.documentElement.scrollHeight-innerHeight;
 if(h>0)$('#progress').style.width=(scrollY/h*100)+'%';
},{passive:true});
countUp();

$$('.outcome').forEach(btn=>btn.addEventListener('click',()=>{
 $$('.outcome').forEach(x=>x.classList.remove('active'));
 $$('.info-panel').forEach(x=>x.classList.remove('show'));
 btn.classList.add('active');
 $('#'+btn.dataset.panel)?.classList.add('show');
}));

const refs=[
["Filler, K., Lyon, D., Bennett, J., McCain, N., Elswick, R., Lukkahatai, N., & Saligan, L. N. (2014). Association of mitochondrial dysfunction and fatigue: A review of the literature. BBA Clinical, 1, 12–23.","mitochondrial dysfunction fatigue"],
["Harrington, J. S., Ryter, S. W., Plataki, M., Price, D. R., & Choi, A. M. K. (2023). Mitochondria in health, disease, and aging. Physiological Reviews, 103(4), 2349–2422.","health disease aging"],
["Murphy, E., Ardehali, H., Balaban, R. S., DiLisa, F., Dorn, G. W., Kitsis, R. N., Otsu, K., Ping, P., Rizzuto, R., Sack, M. N., Wallace, D., & Youle, R. J. (2016). Mitochondrial function, biology, and role in disease: A scientific statement from the American Heart Association. Circulation Research, 118(12), 1960–1991.","mitochondrial function disease"],
["Amorim, J. A., Coppotelli, G., Rolo, A. P., Palmeira, C. M., Ross, J. M., & Sinclair, D. A. (2022). Mitochondrial and metabolic dysfunction in ageing and age-related diseases. Nature Reviews Endocrinology, 18, 243–258.","ageing metabolic dysfunction"],
["Saligan, L. N., Olson, K., Filler, K., Larkin, D., Cramp, F., Yennurajalingam, S., Escalante, C. P., del Giglio, A., Kober, K. M., Kamath, J., Palesh, O., & Mustian, K. (2015). The biology of cancer-related fatigue: A review of the literature. Supportive Care in Cancer, 23(8), 2461–2478.","cancer fatigue"],
["Feng, L. R., Nguyen, Q., Ross, A., & Saligan, L. N. (2018). Evaluating the role of mitochondrial function in cancer-related fatigue. Journal of Visualized Experiments, 135, 57736.","mitochondrial cancer fatigue"],
["Coelho-Junior, H. J., Picca, A., Calvani, R., Uchida, M. C., & Marzetti, E. (2019). If my muscle could talk: Myokines as a biomarker of frailty. Experimental Gerontology, 127, 110715.","muscle frailty"],
["Picca, A., Coelho-Junior, H. J., Cesari, M., Marini, F., Miccheli, A., Gervasoni, J., Bossola, M., Landi, F., Bernabei, R., Marzetti, E., & Calvani, R. (2019). The metabolomics side of frailty: Toward personalized medicine for the aged. Experimental Gerontology, 126, 110692.","frailty metabolomics"],
["Larsson, L., Degens, H., Li, M., Salviati, L., Lee, Y. I., Thompson, W., Kirkland, J. L., & Sandri, M. (2019). Sarcopenia: Aging-related loss of muscle mass and function. Physiological Reviews, 99(1), 427–511.","sarcopenia muscle aging"],
["Cruz-Jentoft, A. J., Bahat, G., Bauer, J., Boirie, Y., Bruyère, O., Cederholm, T., Cooper, C., Landi, F., Rolland, Y., Sayer, A. A., Schneider, S. M., Sieber, C. C., Topinkova, E., Vandewoude, M., Visser, M., & Zamboni, M. (2019). Sarcopenia: Revised European consensus on definition and diagnosis. Age and Ageing, 48(1), 16–31.","sarcopenia consensus diagnosis"],
["Chen, L. K., Woo, J., Assantachai, P., Auyeung, T. W., Chou, M. Y., Iijima, K., Jang, H. C., Kang, L., Kim, M., Kim, S., Kojima, T., Kuzuya, M., Lee, J. S. W., Lee, S. Y., Lee, W. J., Lee, Y., Liang, C. K., Lim, J. Y., Lim, W. S., Peng, L. N., Sugimoto, K., Tanaka, T., Won, C. W., Yamada, M., Zhang, T., Akishita, M., & Arai, H. (2020). Asian Working Group for Sarcopenia: 2019 consensus update on sarcopenia diagnosis and treatment. Journal of the American Medical Directors Association, 21(3), 300–307.e2.","Asian sarcopenia consensus"],
["Marzetti, E., Calvani, R., Coelho-Júnior, H. J., Landi, F., & Picca, A. (2024). Mitochondrial quantity and quality in age-related sarcopenia. International Journal of Molecular Sciences, 25(4), 2052.","mitochondria sarcopenia"],
["Affourtit, C., & Carré, J. E. (2024). Mitochondrial involvement in sarcopenia. Acta Physiologica, 240(3), e14107.","mitochondria sarcopenia"],
["Swalsingh, G., Pani, P., & Bal, N. C. (2022). Structural functionality of skeletal muscle mitochondria and its correlation with metabolic diseases. Clinical Science, 136(24), 1851–1871.","skeletal muscle mitochondria"],
["Picca, A., Calvani, R., Coelho-Junior, H. J., Leeuwenburgh, C., Landi, F., & Marzetti, E. (2019). Targeting mitochondrial quality control for treating sarcopenia: Lessons from physical exercise. Expert Opinion on Therapeutic Targets, 23(2), 153–160.","mitochondrial quality control exercise"],
["Casuso, R. A., & Huertas, J. R. (2020). The emerging role of skeletal muscle mitochondrial dynamics in exercise and ageing. Ageing Research Reviews, 58, 101025.","mitochondrial dynamics exercise aging"],
["Halling, J. F., & Pilegaard, H. (2020). PGC-1α-mediated regulation of mitochondrial function and physiological implications. Applied Physiology, Nutrition, and Metabolism, 45(9), 927–936.","PGC-1alpha mitochondrial function"],
["Ji, Z., Liu, G. H., & Qu, J. (2022). Mitochondrial sirtuins, metabolism, and aging. Journal of Genetics and Genomics, 49(4), 287–298.","sirtuins metabolism aging"],
["Abu Shelbayeh, O., Arroum, T., Morris, S., & Busch, K. B. (2023). PGC-1α is a master regulator of mitochondrial lifecycle and ROS stress response. Antioxidants, 12(5), 1075.","PGC-1alpha ROS stress"],
["Alizadeh Pahlavani, H., Laher, I., Knechtle, B., & Zouhal, H. (2022). Exercise and mitochondrial mechanisms in patients with sarcopenia. Frontiers in Physiology, 13, 1040381.","exercise sarcopenia mitochondria"],
["Jia, D., Tian, Z., & Wang, R. (2023). Exercise mitigates age-related metabolic diseases by improving mitochondrial dysfunction. Ageing Research Reviews, 91, 102087.","exercise metabolic disease"],
["Broome, S. C., Whitfield, J., Karagounis, L. G., & Hawley, J. A. (2024). Mitochondria as nutritional targets to maintain muscle health and physical function during ageing. Sports Medicine, 54(9), 2291–2309.","nutrition mitochondria muscle"],
["Beaudart, C., Dawson, A., Shaw, S. C., Harvey, N. C., Kanis, J. A., Binkley, N., Reginster, J. Y., Chapurlat, R., Chan, D. C., Bruyère, O., Rizzoli, R., Cooper, C., & Dennison, E. M. (2017). Nutrition and physical activity in the prevention and treatment of sarcopenia: Systematic review. Osteoporosis International, 28(6), 1817–1833.","nutrition physical activity sarcopenia"],
["Cruz-Jentoft, A. J., Kiesswetter, E., Drey, M., & Sieber, C. C. (2017). Nutrition, frailty, and sarcopenia. Aging Clinical and Experimental Research, 29(1), 43–48.","nutrition frailty"],
["Cochet, C., Belloni, G., Buondonno, I., Chiara, F., & D'Amelio, P. (2023). The role of nutrition in the treatment of sarcopenia in old patients: From restoration of mitochondrial activity to improvement of muscle performance, a systematic review. Nutrients, 15(17), 3703.","nutrition mitochondrial activity"],
["Finger, D., Goltz, F. R., Umpierre, D., Meyer, E., Rosa, L. H. T., & Schneider, C. D. (2015). Effects of protein supplementation in older adults undergoing resistance training: A systematic review and meta-analysis. Sports Medicine, 45(2), 245–255.","protein resistance training"],
["Hidayat, K., Chen, G. C., Wang, Y., Zhang, Z., Dai, X., Szeto, I. M. Y., & Qin, L. Q. (2018). Effects of milk proteins supplementation in older adults undergoing resistance training: A meta-analysis of randomized control trials. The Journal of Nutrition, Health & Aging, 22(2), 237–245.","milk protein resistance training"],
["Morton, R. W., Murphy, K. T., McKellar, S. R., Schoenfeld, B. J., Henselmans, M., Helms, E., Aragon, A. A., Devries, M. C., Banfield, L., Krieger, J. W., & Phillips, S. M. (2018). A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. British Journal of Sports Medicine, 52(6), 376–384.","protein supplementation muscle strength"],
["Chen, N., He, X., Feng, Y., Ainsworth, B. E., & Liu, Y. (2021). Effects of resistance training in healthy older people with sarcopenia: A systematic review and meta-analysis of randomized controlled trials. European Review of Aging and Physical Activity, 18, 23.","resistance training older people"],
["Mende, E., Moeinnia, N., Schaller, N., Weiß, M., Haller, B., Halle, M., & Siegrist, M. (2022). Progressive machine-based resistance training for prevention and treatment of sarcopenia in the oldest old: A systematic review and meta-analysis. Experimental Gerontology, 163, 111767.","resistance training oldest old"],
["Campbell, E., Petermann-Rocha, F., Welsh, P., Celis-Morales, C., Pell, J. P., Ho, F. K., & Gray, S. R. (2021). The effect of exercise on quality of life and activities of daily life in frail older adults: A systematic review of randomised control trials. Experimental Gerontology, 147, 111287.","exercise quality of life frail"],
["Raafs, B. M., Karssemeijer, E. G. A., van der Horst, L., Aaronson, J. A., Olde Rikkert, M. G. M., & Kessels, R. P. C. (2020). Physical exercise training improves quality of life in healthy older adults: A meta-analysis. Journal of Aging and Physical Activity, 28(1), 81–93.","exercise quality of life older adults"],
["World Health Organization. (2020). WHO guidelines on physical activity and sedentary behaviour. World Health Organization.","WHO physical activity"],
["Vagetti, G. C., Barbosa Filho, V. C., Moreira, N. B., de Oliveira, V., Mazzardo, O., & de Campos, W. (2014). Association between physical activity and quality of life in the elderly: A systematic review, 2000–2012. Brazilian Journal of Psychiatry, 36(1), 76–88.","physical activity quality of life elderly"],
["Sezgin, M. G., & Bektas, H. (2022). The effect of nurse-led care on fatigue in patients with rheumatoid arthritis: A systematic review and meta-analysis of randomised controlled studies. Journal of Clinical Nursing, 31(7–8), 832–842.","nurse-led care fatigue"],
["Massimi, A., De Vito, C., Brufola, I., Corsaro, A., Marzuillo, C., Migliara, G., Rega, M. L., Ricciardi, W., Villari, P., & Damiani, G. (2017). Are community-based nurse-led self-management support interventions effective in chronic patients? Results of a systematic review and meta-analysis. PLoS ONE, 12(3), e0173617.","nurse-led self management chronic"],
["van Hooft, S. M., Been-Dahmen, J. M. J., Ista, E., van Staa, A., & Boeije, H. R. (2017). A realist review: What do nurse-led self-management interventions achieve for outpatients with a chronic condition? Journal of Advanced Nursing, 73(6), 1255–1271.","nurse-led self management"],
["Baker, E., & Fatoye, F. (2017). Clinical and cost effectiveness of nurse-led self-management interventions for patients with COPD in primary care: A systematic review. International Journal of Nursing Studies, 71, 125–138.","nurse-led COPD"],
["Bergsten, U., Almehed, K., Baigi, A., & Jacobsson, L. T. H. (2019). A randomized study comparing regular care with a nurse-led clinic based on tight disease activity control and person-centred care in patients with rheumatoid arthritis with moderate/high disease activity: A 6-month evaluation. Musculoskeletal Care, 17(3), 215–225.","nurse-led rheumatoid arthritis"],
["Herranz-Gómez, A., Cuenca-Martínez, F., Suso-Martí, L., Varangot-Reille, C., Prades-Monfort, M., Calatayud, J., & Casaña, J. (2023). Effectiveness of therapeutic exercise models on cancer-related fatigue in patients with cancer undergoing chemotherapy: A systematic review and network meta-analysis. Archives of Physical Medicine and Rehabilitation, 104(8), 1331–1342.","therapeutic exercise cancer fatigue"],
["Wu, T., Yan, F., Wei, Y., Yuan, C., Jiao, Y., Pan, Y., Zhang, Y., Zhang, H., Ma, Y., & Han, L. (2023). Effect of exercise therapy on cancer-related fatigue in patients with breast cancer: A systematic review and network meta-analysis. Physical Medicine and Rehabilitation, 102(12), 1055–1062.","exercise breast cancer fatigue"]
];

function renderRefs(q=''){
 const term=q.toLowerCase().trim(),box=$('#refList');
 if(!box)return;
 box.innerHTML='';
 refs.forEach((r,i)=>{
  const match=(r[0]+' '+r[1]).toLowerCase().includes(term);
  const el=document.createElement('article');
  el.className='ref'+(!match?' hidden':'');
  el.innerHTML='<span class="ref-num">'+String(i+1).padStart(2,'0')+'</span><p>'+r[0]+'</p>';
  box.appendChild(el);
 });
}
renderRefs();
$('#refSearch')?.addEventListener('input',e=>renderRefs(e.target.value));

$$('.theme-card').forEach(card=>card.addEventListener('click',()=>{
 const target={1:'energy',2:'physical',3:'cognition'}[card.dataset.theme]||'energy';
 $('#framework')?.scrollIntoView({behavior:'smooth'});
 setTimeout(()=>$('#'+target)?.classList.add('show'),450);
}));

$$('.flow-step,.practice-card,.method-item').forEach(el=>el.addEventListener('click',()=>{
 openInfo(el.dataset.infoTitle,el.dataset.infoText);
}));

const floatingPdf=$('#floatingPdf');
floatingPdf?.addEventListener('click',e=>{e.preventDefault();openPDF()});

/* Premium micro-interactions: touch ripple, scroll reveal, active navigation */
document.querySelectorAll('.btn,.nav-pdf,.icon-btn,.menu-btn,.flow-step,.outcome,.practice-card,.method-item,.theme-card,.text-btn').forEach(el=>{
  el.addEventListener('pointerdown',e=>{
    el.classList.add('touch-glow');
    if(el.tagName==='A' && el.getAttribute('href')?.startsWith('#')) return;
    const rect=el.getBoundingClientRect();
    const size=Math.max(rect.width,rect.height)*.7;
    const r=document.createElement('span');
    r.className='ripple';
    r.style.width=r.style.height=size+'px';
    r.style.left=(e.clientX-rect.left-size/2)+'px';
    r.style.top=(e.clientY-rect.top-size/2)+'px';
    el.style.position='relative';
    el.style.overflow='hidden';
    el.appendChild(r);
    setTimeout(()=>r.remove(),650);
  });
  ['pointerup','pointercancel','pointerleave'].forEach(type=>el.addEventListener(type,()=>el.classList.remove('touch-glow')));
});

const revealTargets=[
  '.section-head','.evidence-grid > *','.method-strip > *','.flow-step','.framework > *',
  '.panel-grid > *','.practice-grid > *','.split > *','.ref','.closing > *','.stats'
];
revealTargets.forEach(sel=>$$ (sel).forEach((el,i)=>{
  el.classList.add('reveal');
  el.style.transitionDelay=Math.min(i*35,280)+'ms';
}));
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}});
},{threshold:.08});
$$('.reveal').forEach(el=>revealObserver.observe(el));

const sections=$$('main section[id]');
const navLinks=$$('#nav a[href^="#"]');
const navObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(a=>a.classList.toggle('active-link',a.getAttribute('href')==='#'+entry.target.id));
    }
  });
},{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>navObserver.observe(s));



document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const target=document.querySelector(a.getAttribute('href'));
  if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
}));

window.addEventListener('pageshow',()=>document.body.classList.add('page-ready'));

/* 3D mitochondrion: auto-rotate + touch/mouse drag + pause */
const mito3d=$('#mito3d'),toggleMito=$('#toggleMito');
let mitoDragging=false,mitoPaused=false,lastX=0,lastY=0,rotY=0,rotX=3;
if(mito3d){
  mito3d.addEventListener('pointerdown',e=>{
    mitoDragging=true; lastX=e.clientX; lastY=e.clientY;
    mito3d.classList.add('dragging'); mito3d.setPointerCapture?.(e.pointerId);
  });
  mito3d.addEventListener('pointermove',e=>{
    if(!mitoDragging)return;
    rotY+= (e.clientX-lastX)*0.45; rotX-= (e.clientY-lastY)*0.22;
    rotX=Math.max(-25,Math.min(25,rotX)); lastX=e.clientX; lastY=e.clientY;
    mito3d.style.setProperty('--ry',rotY+'deg'); mito3d.style.setProperty('--rx',rotX+'deg');
    mito3d.style.transform='rotateY('+rotY+'deg) rotateX('+rotX+'deg)';
  });
  const endDrag=()=>{mitoDragging=false;mito3d.classList.remove('dragging')};
  mito3d.addEventListener('pointerup',endDrag);mito3d.addEventListener('pointercancel',endDrag);
  mito3d.addEventListener('click',e=>{
  if(mitoDragging)return;
  openInfo('Interactive mitochondrion','Mitochondria are membrane-bound organelles central to cellular energy metabolism. The inner mitochondrial membrane contains the respiratory chain and ATP synthase; its folded cristae increase membrane surface area. Tap the close button to return, or drag the model to explore its 3D-style view.');
});
mito3d.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openInfo('Interactive mitochondrion','Mitochondria are membrane-bound organelles central to cellular energy metabolism. The inner mitochondrial membrane contains the respiratory chain and ATP synthase; its folded cristae increase membrane surface area.')}});
}
toggleMito?.addEventListener('click',()=>{
  mitoPaused=!mitoPaused;
  mito3d?.style.setProperty('animation-play-state',mitoPaused?'paused':'running');
  toggleMito.textContent=mitoPaused?'▶ Resume rotation':'⏸ Pause rotation';
});

$$('.theme-card').forEach(card=>card.addEventListener('click',e=>{
 const target={1:'energy',2:'physical',3:'cognition'}[card.dataset.theme]||'energy';
 $('#framework')?.scrollIntoView({behavior:'smooth'});
 setTimeout(()=>{
   $$('.info-panel').forEach(x=>x.classList.remove('show'));
   $('#'+target)?.classList.add('show');
   if(card.dataset.infoTitle) openInfo(card.dataset.infoTitle,card.dataset.infoText);
 },500);
}));

$$('.outcome').forEach(btn=>btn.addEventListener('click',()=>{
 if(btn.dataset.infoTitle) openInfo(btn.dataset.infoTitle,btn.dataset.infoText);
}));

/* Guaranteed nursing pathway navigation */
const nursingPathway=$('#nursingPathway');
nursingPathway?.addEventListener('click',e=>{
  e.preventDefault();
  const target=$('#framework');
  if(target){
    target.scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>{
      const first=$('.outcome[data-panel="energy"]');
      first?.classList.add('active');
      $('#energy')?.classList.add('show');
    },500);
  }
});

/* Reliable delegated interactions for every information card */
document.addEventListener('click',e=>{
 const card=e.target.closest?.('.theme-card,.practice-card,.method-item,.flow-step,.outcome');
 if(card && card.dataset.infoTitle){
   e.preventDefault();
   openInfo(card.dataset.infoTitle,card.dataset.infoText||'More information is available for this topic.');
 }
});
