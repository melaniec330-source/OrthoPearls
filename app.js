const tumors = [
  {name:'Osteosarcoma', category:'Primary malignant', location:'Often metaphyseal long bone', imaging:'Mixed lytic/sclerotic lesion, aggressive periosteal reaction; soft-tissue mass may mineralize.', pearl:'Stage with local MRI plus chest imaging and systemic staging per current sarcoma protocol. Biopsy should be coordinated with the tumor surgeon.'},
  {name:'Chondrosarcoma', category:'Primary malignant', location:'Pelvis, proximal femur, proximal humerus are common', imaging:'Chondroid matrix mineralization, endosteal scalloping, cortical breakthrough/soft-tissue extension when aggressive.', pearl:'Interpret imaging, growth, pain, and histology together; low-grade cartilaginous lesions can be diagnostically nuanced.'},
  {name:'Ewing sarcoma', category:'Primary malignant', location:'Long bones and pelvis', imaging:'Permeative/destructive lesion with aggressive periosteal reaction and often large soft-tissue component.', pearl:'Urgent multidisciplinary workup; avoid unplanned biopsy/excision.'},
  {name:'Giant cell tumor of bone', category:'Intermediate', location:'Typically epiphyseal/subarticular in skeletally mature patients', imaging:'Expansile lytic lesion extending to subchondral bone, usually without mineralized matrix.', pearl:'Locally aggressive; pulmonary metastases are uncommon but possible.'},
  {name:'Enchondroma', category:'Benign', location:'Common in small bones of hand; also long bones', imaging:'Central medullary chondroid lesion with rings-and-arcs calcification; usually no aggressive cortical destruction.', pearl:'Pain attributable to the lesion, growth, deep scalloping, or aggressive features warrant closer evaluation.'},
  {name:'Osteochondroma', category:'Benign', location:'Metaphyseal surface lesion', imaging:'Cortical and medullary continuity with parent bone.', pearl:'New pain or growth after skeletal maturity and concerning cartilage-cap features should prompt reassessment.'},
  {name:'Metastatic bone disease', category:'Metastatic', location:'Axial skeleton and proximal long bones commonly involved', imaging:'May be lytic, blastic, or mixed depending on primary.', pearl:'Assess mechanical stability, pain, systemic disease context, prognosis, and radiation/systemic therapy options.'},
  {name:'Multiple myeloma / plasmacytoma', category:'Hematologic', location:'Axial skeleton and proximal appendicular skeleton', imaging:'Lytic lesions; MRI may demonstrate marrow disease before radiographic change.', pearl:'Coordinate with hematology; orthopedic intervention is driven by mechanical instability, fracture, or neurologic compromise.'}
];

const templates = [
  {title:'Focused upper-extremity tumor exam', text:'Skin intact. No erythema or drainage. Palpable mass/tenderness: ____. Shoulder ROM: ____. Elbow ROM: ____. Motor: deltoid/biceps/triceps/WE/WF/EPL/FPL/IO __/5. SILT axillary/median/radial/ulnar distributions. Hand warm and well perfused; radial pulse __.'},
  {title:'Focused lower-extremity tumor exam', text:'Skin intact. No erythema or drainage. Palpable mass/tenderness: ____. Hip ROM: ____. Knee ROM: ____. Motor: HF/Q/TA/EHL/FHL/GS __/5. SILT femoral/saphenous/sural/SP/DP/tibial distributions. Foot warm and well perfused; DP/PT pulses __.'},
  {title:'Post-op wound check', text:'Incision is ____. Drainage: ____. Surrounding erythema/warmth: ____. Fluctuance: ____. Sutures/staples: ____. Distal motor/sensory exam: ____. Distal perfusion: ____. Fever/chills or systemic symptoms: ____. Plan: ____.'},
  {title:'Tumor board one-liner', text:'__-year-old with [diagnosis/working diagnosis] involving the [site], status post [biopsy/procedure], with imaging showing [key local findings] and staging demonstrating [metastatic findings/none identified]. Key question for conference: ____.'}
];

const tumorList = document.getElementById('tumorList');
const filters = document.getElementById('filters');
const searchInput = document.getElementById('searchInput');
let activeFilter = 'All';

const cats = ['All', ...new Set(tumors.map(t => t.category))];
cats.forEach(cat => {
  const b = document.createElement('button');
  b.className = 'filter' + (cat === 'All' ? ' active' : '');
  b.textContent = cat;
  b.onclick = () => { activeFilter = cat; document.querySelectorAll('.filter').forEach(x => x.classList.remove('active')); b.classList.add('active'); renderTumors(); };
  filters.appendChild(b);
});

function renderTumors(){
  const q = searchInput.value.trim().toLowerCase();
  const data = tumors.filter(t => (activeFilter === 'All' || t.category === activeFilter) && Object.values(t).join(' ').toLowerCase().includes(q));
  tumorList.innerHTML = data.map(t => `<article class="card"><div><span class="badge">${t.category}</span></div><h3>${t.name}</h3><p><strong>Typical location:</strong> ${t.location}</p><p><strong>Imaging:</strong> ${t.imaging}</p><p><strong>Pearl:</strong> ${t.pearl}</p></article>`).join('') || '<p class="muted">No matches.</p>';
}
searchInput.addEventListener('input', renderTumors);
renderTumors();

document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.tab,.panel').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(btn.dataset.tab).classList.add('active');
}));

document.getElementById('calcMirels').onclick = () => {
  const score = ['mSite','mPain','mLesion','mSize'].reduce((s,id) => s + Number(document.getElementById(id).value), 0);
  let text = `Score: ${score}/12. `;
  if (score <= 7) text += 'Traditionally associated with lower fracture risk; continue to integrate symptoms, imaging, lesion progression, and specialist judgment.';
  else if (score === 8) text += 'Intermediate zone; individualized orthopedic oncology assessment is important.';
  else text += 'Traditionally considered higher risk and often prompts consideration of prophylactic stabilization, depending on the full clinical picture.';
  document.getElementById('mirelsResult').textContent = text;
};

const templateList = document.getElementById('templateList');
templateList.innerHTML = templates.map((t,i) => `<article class="card"><h2>${t.title}</h2><p>${t.text}</p><button class="copy-btn" data-i="${i}">Copy</button></article>`).join('');
document.querySelectorAll('.copy-btn').forEach(b => b.onclick = async () => { await navigator.clipboard.writeText(templates[b.dataset.i].text); b.textContent='Copied'; setTimeout(()=>b.textContent='Copy',1200); });

const root = document.documentElement;
if (localStorage.getItem('theme') === 'dark') root.classList.add('dark');
document.getElementById('themeToggle').onclick = () => { root.classList.toggle('dark'); localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light'); };

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
