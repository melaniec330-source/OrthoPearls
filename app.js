const pages=[...document.querySelectorAll('.page')];
const topBar=document.getElementById('topBar');
const topTitle=document.getElementById('topTitle');
const backButton=document.getElementById('backButton');
const topFavorite=document.getElementById('topFavorite');
const bottomNav=document.getElementById('bottomNav');
const detailContent=document.getElementById('detailContent');
const favoritesKey='orthopearlFavoritesV3';
let currentDetail=null;

const refs={
  oku:'OKU Musculoskeletal Tumors, 4th ed. (AAOS/Wolters Kluwer, 2021)',
  netter:"Netter’s Concise Radiologic Anatomy, 2nd ed. (Elsevier, 2014)",
  imaging:'Plotkin & Davis, Musculoskeletal Imaging: A Survival Manual (Springer, 2023)'
};

const details={
  osteochondroma:{title:'Osteochondroma',meta:'Benign · Bone · Cartilage-capped',favorite:true,sections:[
    ['Overview','A benign cartilage-capped bony exostosis. This page is the template we will use for every tumor entry.'],
    ['Clinical Pearl','Use the clinical course, skeletal maturity, symptoms, and imaging behavior together rather than relying on a single feature.','pearl'],
    ['Imaging','Review continuity with the parent bone, lesion morphology, cartilage cap, and any features that are atypical or concerning.'],
    ['How to Test','Examine the adjacent joint and document ROM, strength, distal motor/sensory function, perfusion, tenderness, and any mechanical symptoms.'],
    ['References',`${refs.oku}. Benign cartilage lesions chapter. Imaging principles cross-link to ${refs.imaging}.`]
  ]},
  chondrosarcoma:{title:'Chondrosarcoma',meta:'Malignant · Bone · Cartilage-producing',favorite:true,sections:[
    ['Overview','Malignant cartilage-producing bone tumor. The completed version will separate conventional chondrosarcoma from relevant variants and include grade-specific considerations.'],
    ['Staging & Workup','Dedicated staging/workup content will live here, with cross-links to imaging and biopsy principles.'],
    ['Imaging','The tumor page will link directly to the app’s chondroid matrix, cortical involvement, soft-tissue extension, CT, and MRI reference pages.'],
    ['Clinical Pearl','New or progressive symptoms and interval imaging change deserve attention in the appropriate clinical context.','pearl'],
    ['References',`${refs.oku}. Chondrosarcoma of Bone chapter.`]
  ]},
  nerves:{title:'Peripheral Nerve Innervation',meta:'Quick reference · Motor · Sensory · Examination',favorite:true,sections:[
    ['Standard Nerve Card','Roots → Course → Motor → Sensory → How to Test → Deficit if Injured → Common Sites of Injury → Ortho-Onc Relevance.'],
    ['How to Test','Every nerve page will provide patient position, maneuver, normal response, abnormal finding, and interpretation.'],
    ['References',`${refs.netter}. Upper-limb and lower-limb neurovascular anatomy.`]
  ]},
  knee:{title:'Knee Anatomy',meta:'Regional anatomy · Neurovascular · Examination',favorite:true,sections:[
    ['Key Anatomy','Distal femur, proximal tibia/fibula, patella, extensor mechanism, cruciate/collateral ligaments, menisci, and popliteal neurovascular structures.'],
    ['Ortho-Onc Relevance','Emphasis will be on anatomy needed for tumor localization, resection planning, reconstruction, and postoperative examination.'],
    ['How to Test','Document knee ROM, extensor mechanism, relevant motor groups, distal sensation, and vascular status.'],
    ['References',`${refs.netter}. Lower-limb section: knee joint and cruciate ligament material.`]
  ]},
  'bone-lesion-analysis':{title:'How to Read a Bone Lesion',meta:'Imaging · Systematic approach',favorite:true,sections:[
    ['Checklist','1. Age  2. Bone/site  3. Epiphysis/metaphysis/diaphysis  4. Medullary/cortical/surface  5. Margin & zone of transition  6. Matrix  7. Periosteal reaction  8. Cortex  9. Soft-tissue component  10. Solitary vs multiple.'],
    ['Clinical Pearl','Use the same search pattern every time. Repetition improves speed without sacrificing completeness.','pearl'],
    ['References',`${refs.imaging}, Bone Tumors chapter; ${refs.oku}, Evaluation of Bone Tumors chapter.`]
  ]},
  'imaging-checklist':{title:'Imaging Checklist',meta:'Bone lesion · Step-by-step',favorite:true,sections:[
    ['Search Pattern','Age → location → lesion number → margin/zone of transition → matrix → periosteal reaction → cortex → soft tissue → advanced imaging needs.'],
    ['Red Flag','Aggressive imaging features or uncertain diagnosis should prompt appropriate advanced evaluation and specialist involvement.','red'],
    ['References',`${refs.imaging}; ${refs.oku}.`]
  ]},
  'common-fibular-nerve':{title:'Common Fibular Nerve',meta:'Peripheral nerve · Lower extremity',favorite:true,sections:[
    ['Roots','L4–S2 contribution through the sciatic nerve.'],
    ['Course','The full page will trace the nerve through the popliteal region and around the fibular neck, with tumor-relevant relationships.'],
    ['How to Test','Assess ankle dorsiflexion and eversion against resistance, plus sensory examination in the appropriate distributions.'],
    ['Ortho-Onc Relevance','High-yield around proximal fibular lesions, resections, and postoperative neurologic assessment.'],
    ['References',`${refs.netter}. Lower-limb nerve anatomy.`]
  ]}
};

const genericDetail=(id)=>({title:id.split('-').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' '),meta:'OrthoPearls reference',favorite:true,sections:[
  ['Overview','This page is wired into the v3 navigation and ready for the source-grounded content build.'],
  ['How to Test','Where clinically applicable, this section will always be included.'],
  ['References','Source references and relevant textbook pages/chapters will be listed here as content is populated.']
]});

function favoriteIds(){try{return JSON.parse(localStorage.getItem(favoritesKey)||'[]')}catch{return[]}}
function isFavorite(id){return favoriteIds().includes(id)}
function toggleFavorite(id){let f=favoriteIds();f=f.includes(id)?f.filter(x=>x!==id):[...f,id];localStorage.setItem(favoritesKey,JSON.stringify(f));renderFavoriteStar();renderFavorites()}
function renderFavoriteStar(){if(!currentDetail){topFavorite.classList.add('hidden');return}topFavorite.classList.remove('hidden');topFavorite.textContent=isFavorite(currentDetail)?'★':'☆'}

function showPage(id,push=true){
  const target=document.getElementById(id)||document.getElementById('home');
  pages.forEach(p=>p.classList.toggle('active',p===target));
  const home=id==='home';
  topBar.classList.toggle('hidden',home);
  bottomNav.classList.remove('hidden');
  topTitle.textContent=target.dataset.title||'OrthoPearls';
  currentDetail=id==='detail'?currentDetail:null;
  renderFavoriteStar();
  document.querySelectorAll('.bottom-item[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===id));
  if(push){history.pushState({page:id},'',id==='home'?location.pathname:`#${id}`)}
  window.scrollTo({top:0,behavior:'instant'});
  if(id==='favorites')renderFavorites();
  if(id==='search')setTimeout(()=>document.getElementById('searchInput')?.focus(),80);
}

function openDetail(id){
  currentDetail=id;
  const d=details[id]||genericDetail(id);
  topTitle.textContent=d.title;
  detailContent.innerHTML=`<h2 class="detail-title">${d.title}</h2><div class="detail-meta">${d.meta}</div><div class="tabs"><button class="tab active">Overview</button><button class="tab">Imaging</button><button class="tab">Pathology</button><button class="tab">Treatment</button></div>`+
    d.sections.map(([h,t,type])=>`<section class="detail-section ${type==='pearl'?'pearl-callout':''} ${type==='red'?'red-flag':''}">${type==='pearl'?'<span class="pearl-dot" aria-hidden="true"></span>':''}<h3>${h}</h3><p>${t}</p></section>`).join('');
  pages.forEach(p=>p.classList.toggle('active',p.id==='detail'));
  topBar.classList.remove('hidden');topTitle.textContent=d.title;renderFavoriteStar();
  document.querySelectorAll('.bottom-item').forEach(b=>b.classList.remove('active'));
  history.pushState({page:'detail',detail:id},'',`#detail/${id}`);window.scrollTo({top:0,behavior:'instant'});
}

document.addEventListener('click',e=>{
  const pageBtn=e.target.closest('[data-page]'); if(pageBtn){showPage(pageBtn.dataset.page);return}
  const detailBtn=e.target.closest('[data-detail]'); if(detailBtn){openDetail(detailBtn.dataset.detail);return}
  if(e.target.closest('[data-open-search]'))showPage('search');
});
backButton.addEventListener('click',()=>history.length>1?history.back():showPage('home'));
topFavorite.addEventListener('click',()=>currentDetail&&toggleFavorite(currentDetail));

document.getElementById('themeToggle').addEventListener('click',()=>{document.documentElement.classList.toggle('dark');localStorage.setItem('orthopearlTheme',document.documentElement.classList.contains('dark')?'dark':'light')});
if(localStorage.getItem('orthopearlTheme')==='dark')document.documentElement.classList.add('dark');

const searchItems=[
  ['Osteochondroma','Benign tumor','osteochondroma'],['Chondrosarcoma','Malignant tumor','chondrosarcoma'],['Knee Anatomy','Anatomy','knee'],['Peripheral Nerve Innervation','Anatomy','nerves'],['How to Read a Bone Lesion','Imaging','bone-lesion-analysis'],['Imaging Checklist','Imaging','imaging-checklist'],['Common Fibular Nerve','Nerve exam','common-fibular-nerve'],['Mirels Score','Metastatic disease','mirels']
];
function renderSearch(q=''){
  const box=document.getElementById('searchResults');const term=q.trim().toLowerCase();
  const items=searchItems.filter(x=>!term||x.slice(0,2).join(' ').toLowerCase().includes(term));
  box.innerHTML=items.length?items.map(([n,s,id])=>`<button class="row-card" data-detail="${id}"><span class="thumb">⌕</span><span><b>${n}</b><small>${s}</small></span><i>›</i></button>`).join(''):`<div class="empty-state">No results yet. More content will appear as the library is populated.</div>`;
}
document.getElementById('searchInput').addEventListener('input',e=>renderSearch(e.target.value));renderSearch();

function renderFavorites(){
  const box=document.getElementById('favoritesList');if(!box)return;const ids=favoriteIds();
  box.innerHTML=ids.length?ids.map(id=>{const d=details[id]||genericDetail(id);return `<button class="row-card" data-detail="${id}"><span class="thumb">★</span><span><b>${d.title}</b><small>${d.meta}</small></span><i>›</i></button>`}).join(''):`<div class="empty-state">No favorites yet. Open a reference page and tap ☆ to save it.</div>`;
}

window.addEventListener('popstate',()=>{
  const hash=location.hash.slice(1);if(hash.startsWith('detail/')){openDetail(hash.split('/')[1]);return}
  showPage(hash||'home',false)
});

const initial=location.hash.slice(1);if(initial.startsWith('detail/'))openDetail(initial.split('/')[1]);else showPage(initial||'home',false);
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
