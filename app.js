const $=(s,el=document)=>el.querySelector(s), $$=(s,el=document)=>[...el.querySelectorAll(s)];
const view=$("#view"), topbar=$("#topbar"), topTitle=$("#topTitle"), backBtn=$("#backBtn"), favBtn=$("#favBtn");
const FKEY="orthopearl_favorites_v4", MISSED="orthopearl_missed_v4";
const refs={
 oku:"OKU: Musculoskeletal Tumors, 4th ed.",
 netter:"Netter’s Concise Radiologic Anatomy, 2nd ed.",
 imaging:"Plotkin & Davis, Musculoskeletal Imaging: A Survival Manual (2023)"
};
const items=[
{id:"anatomy",type:"route",title:"Orthopaedic Anatomy",cat:"Home",sub:"Pelvis, extremities, nerves"},
{id:"exam",type:"route",title:"Physical Exam",cat:"Home",sub:"How to test and document"},
{id:"tumors",type:"route",title:"Tumor Library",cat:"Home",sub:"Benign, malignant, tumor-like"},
{id:"imaging",type:"route",title:"Imaging Principles",cat:"Home",sub:"Systematic lesion analysis"},
{id:"metastatic",type:"route",title:"Metastatic Bone Disease",cat:"Home",sub:"Workup, fracture risk, management"},
{id:"quiz",type:"route",title:"Quiz & Learning",cat:"Home",sub:"Custom practice"},
...[
["osteochondroma","Osteochondroma","Benign tumor","Bone · cartilage-capped"],
["enchondroma","Enchondroma","Benign tumor","Bone · cartilage"],
["osteoid-osteoma","Osteoid Osteoma","Benign tumor","Bone · bone-forming"],
["chondroblastoma","Chondroblastoma","Benign tumor","Bone · cartilage"],
["nonossifying-fibroma","Non-ossifying Fibroma","Benign tumor","Bone · fibrous"],
["fibrous-dysplasia","Fibrous Dysplasia","Benign tumor","Bone · fibrous"],
["unicameral-bone-cyst","Unicameral Bone Cyst","Benign tumor","Bone · cystic"],
["aneurysmal-bone-cyst","Aneurysmal Bone Cyst","Benign/tumor-like","Bone · cystic"],
["giant-cell-tumor","Giant Cell Tumor","Intermediate tumor","Bone · giant-cell rich"],
["lipoma","Lipoma","Benign tumor","Soft tissue · adipocytic"],
["schwannoma","Schwannoma","Benign tumor","Soft tissue · neural"],
["osteosarcoma","Osteosarcoma","Malignant tumor","Bone · osteoid-producing"],
["chondrosarcoma","Chondrosarcoma","Malignant tumor","Bone · cartilage-producing"],
["ewing","Ewing Sarcoma","Malignant tumor","Bone/soft tissue · round-cell"],
["myeloma","Multiple Myeloma","Malignant tumor","Plasma-cell neoplasm"],
["lymphoma","Lymphoma of Bone","Malignant tumor","Hematolymphoid"],
["soft-tissue-sarcoma","Soft-Tissue Sarcoma","Malignant tumor","Soft tissue"],
["pseudotumors","Pseudotumors & Tumor-like Lesions","Tumor-like","Infection · inflammation · trauma · metabolic"],
["pelvis","Pelvis & Hip","Anatomy","Bones · joint · neurovascular"],
["femur","Femur & Thigh","Anatomy","Compartments · femoral vessels · sciatic nerve"],
["knee","Knee","Anatomy","Joint · extensor mechanism · popliteal anatomy"],
["tibia","Tibia & Fibula","Anatomy","Compartments · common fibular nerve"],
["shoulder","Shoulder & Shoulder Girdle","Anatomy","Scapula · clavicle · axilla"],
["humerus","Humerus & Arm","Anatomy","Radial nerve · brachial vessels"],
["upper-extremity","General Upper Extremity","Anatomy","Elbow · forearm · wrist · hand"],
["nerves","Peripheral Nerve Innervation","Anatomy","Motor · sensory · how to test"],
["general-tumor-exam","General Tumor Exam","Physical Exam","Mass · skin · tenderness · function"],
["upper-exam","Upper Extremity Exam","Physical Exam","ROM · motor · sensory · pulses"],
["lower-exam","Lower Extremity Exam","Physical Exam","Gait · ROM · motor · sensory · perfusion"],
["postop-exam","Post-operative Exam","Physical Exam","Incision · swelling · neurovascular · ROM"],
["bone-lesion-analysis","How to Read a Bone Lesion","Imaging","Age · location · margin · matrix · periosteum"],
["zone-transition","Zone of Transition","Imaging","Narrow vs wide"],
["periosteal-reaction","Periosteal Reaction","Imaging","Solid · lamellated · spiculated · interrupted"],
["matrix","Tumor Matrix","Imaging","Osteoid · chondroid · nonmineralized"],
["ct","CT","Imaging","Cortex · mineralization · fracture"],
["mri","MRI","Imaging","Marrow · soft tissue · neurovascular"],
["nuclear","Nuclear Medicine / PET","Imaging","Whole-body distribution · staging context"],
["tumor-mimics","Tumor Mimics","Imaging","Common pitfalls"],
["imaging-checklist","Imaging Checklist","Imaging","Repeatable search pattern"],
["metastatic-workup","Approach to Bone Metastasis","Metastatic","Workup · diagnosis · multidisciplinary plan"],
["mirels","Mirels Score","Metastatic","Impending fracture risk tool"],
["upper-metastasis","Upper Extremity Metastases","Metastatic","Surgical principles"],
["lower-metastasis","Lower Extremity Metastases","Metastatic","Mechanical stability · reconstruction"]
].map(x=>({id:x[0],type:"detail",title:x[1],cat:x[2],sub:x[3]}))
];

const D={};
function sec(title,body,tab="Overview",kind=""){return {title,body,tab,kind}}
function list(arr){return "<ul>"+arr.map(x=>`<li>${x}</li>`).join("")+"</ul>"}
function test(position,maneuver,normal,abnormal){return `<div class="test-grid"><div class="test-line"><b>Position</b><span>${position}</span></div><div class="test-line"><b>Maneuver</b><span>${maneuver}</span></div><div class="test-line"><b>Normal</b><span>${normal}</span></div><div class="test-line"><b>Abnormal / suggests</b><span>${abnormal}</span></div></div>`}

D["osteochondroma"]={meta:"Benign · Bone · Cartilage-capped",tabs:["Overview","Imaging","Treatment","Exam"],sections:[
sec("Overview","Common benign bone lesion arising near the physis. The cortex and medullary canal of the lesion are continuous with the parent bone. Lesions may be sessile or pedunculated and commonly point away from the joint."),
sec("Epidemiology & Location",list(["Often recognized in skeletally immature patients.","Frequent sites include the distal femur/proximal tibia-proximal fibula region and proximal humerus.","Most are asymptomatic and found incidentally."])),
sec("Clinical Presentation","Painless firm mass is typical. Symptoms may arise from bursal irritation, stalk fracture, mechanical impingement, or involvement of adjacent neurovascular structures."),
sec("Clinical Pearl","New pain or growth after skeletal maturity deserves reassessment in context; cartilage-cap thickness, clinical history, and overall imaging appearance matter more than histology alone.", "Overview","pearl"),
sec("Radiographs","Look for cortical and medullary continuity with the parent bone. That continuity is a key diagnostic feature.", "Imaging"),
sec("Concerning Features",list(["New or progressive pain","Growth after skeletal maturity","Large/thick cartilage cap on cross-sectional imaging","Destructive change or soft-tissue mass"]), "Imaging"),
sec("Management","Asymptomatic solitary lesions generally do not need excision. Symptomatic lesions may be excised with complete removal of the cartilage cap while protecting adjacent structures.", "Treatment"),
sec("How to Test",test("Expose the lesion and adjacent joint; compare with the opposite side.","Palpate the mass; assess adjacent-joint ROM, strength, distal motor/sensory function, pulses and mechanical impingement.","Painless full ROM and intact distal neurovascular exam.","Pain with motion, focal neurologic symptoms, vascular compromise, or progressive symptoms should prompt focused evaluation."),"Exam"),
sec("References",`${refs.oku}, Ch. 10 Benign Cartilage Lesions, osteochondroma pp. 111–114. ${refs.imaging}, Bone Tumors, osteochondroma p. 119.`, "Overview")
]};
D["enchondroma"]={meta:"Benign · Bone · Cartilage",tabs:["Overview","Imaging","Treatment"],sections:[
sec("Overview","Benign intramedullary hyaline-cartilage lesion, commonly incidental. It is frequent in the hands/feet and also occurs in the proximal humerus and femur."),
sec("Imaging",list(["Usually well marginated and medullary.","Chondroid mineralization may appear as stippled, ring-and-arc, or rounded calcification.","Evaluate endosteal scalloping, cortical change, lesion size, symptoms, and interval change when considering a more aggressive cartilage lesion."]), "Imaging"),
sec("Clinical Pearl","Cartilage lesions require clinicoradiologic correlation; size, endosteal scalloping, new pain, and change over time are more useful than a single isolated feature.", "Overview","pearl"),
sec("Management","Observation is common for asymptomatic, characteristic lesions. Symptomatic lesions, concerning imaging features, or fracture risk may justify further workup and selected surgery.","Treatment"),
sec("References",`${refs.oku}, Ch. 10; enchondroma pp. 114–116. ${refs.imaging}, Bone Tumors, enchondroma p. 118.`, "Overview")
]};
D["osteoid-osteoma"]={meta:"Benign · Bone-forming",tabs:["Overview","Imaging","Treatment","Exam"],sections:[
sec("Overview","Small benign osteoblastic tumor classically associated with focal pain. The nidus is central to diagnosis."),
sec("Clinical Pattern","Pain is often worse at night and may respond strongly to NSAIDs. Symptoms can be less classic near joints."),
sec("Imaging","CT is especially useful for identifying the nidus and surrounding reactive sclerosis.", "Imaging"),
sec("Treatment","Options include observation/medical symptom control in selected cases and definitive local ablation or excision when indicated.", "Treatment"),
sec("How to Test",test("Position to expose the symptomatic segment and adjacent joint.","Localize focal tenderness; compare joint ROM and look for guarding or synovitis if juxta-articular.","Minimal focal tenderness with preserved ROM if asymptomatic.","Focal reproducible pain or secondary joint stiffness can help localize the symptomatic site."),"Exam"),
sec("References",`${refs.oku}, Ch. 11; osteoid osteoma pp. 125–130. ${refs.imaging}, Bone Tumors, osteoid osteoma p. 126.`)
]};
D["chondroblastoma"]={meta:"Benign · Bone · Cartilage",tabs:["Overview","Imaging","Treatment"],sections:[
sec("Overview","Rare benign cartilage tumor with a strong predilection for the epiphysis/apophysis in adolescents and young adults."),
sec("Imaging","Typically geographic and epiphyseal, often with a narrow zone of transition. Patient age and exact subarticular location are key to the differential.","Imaging"),
sec("Treatment","Symptomatic lesions are commonly treated with intralesional surgery with local adjuvant strategy as appropriate.","Treatment"),
sec("References",`${refs.oku}, Ch. 10; chondroblastoma pp. 118–119. ${refs.imaging}, Bone Tumors, chondroblastoma p. 115.`)
]};
D["nonossifying-fibroma"]={meta:"Benign · Bone · Fibrous",tabs:["Overview","Imaging","Treatment"],sections:[
sec("Overview","Very common developmental/fibrous lesion of children and adolescents; often incidental."),
sec("Imaging","Classically eccentric, cortically based, metaphyseal and lucent with a well-defined sclerotic margin when mature.","Imaging"),
sec("Treatment","Most require no treatment. Larger lesions with substantial cortical involvement may be assessed for fracture risk.","Treatment"),
sec("References",`${refs.oku}, Ch. 12; nonossifying fibroma pp. 141–142.`)
]};
D["fibrous-dysplasia"]={meta:"Benign · Bone · Fibrous",tabs:["Overview","Imaging","Treatment"],sections:[
sec("Overview","Fibro-osseous lesion that may be monostotic or polyostotic."),
sec("Imaging","Appearance can include a ground-glass matrix, expansion, and variable cortical thinning without the aggressive pattern expected from a high-grade malignancy.","Imaging"),
sec("Treatment","Observation is common when asymptomatic. Management is individualized for pain, deformity, fracture, or functional compromise.","Treatment"),
sec("References",`${refs.oku}, Ch. 12; fibrous dysplasia section. ${refs.imaging}, Bone Tumors, fibrous dysplasia p. 123.`)
]};
D["unicameral-bone-cyst"]={meta:"Benign · Bone · Cystic",tabs:["Overview","Imaging","Treatment"],sections:[
sec("Overview","Simple fluid-filled bone cyst most often encountered in skeletally immature patients, commonly in the proximal humerus or femur."),
sec("Imaging","Central metaphyseal lucent lesion with a narrow zone of transition; fracture can be the presenting event.","Imaging"),
sec("Treatment","Observation is possible for many lesions; treatment is driven by symptoms, fracture, location, and structural risk.","Treatment"),
sec("References",`${refs.oku}, Ch. 9; unicameral bone cyst pp. 99–101.`)
]};
D["aneurysmal-bone-cyst"]={meta:"Benign/intermediate · Cystic bone lesion",tabs:["Overview","Imaging","Treatment"],sections:[
sec("Overview","Expansile blood-filled cystic lesion that may be primary or secondary to another process."),
sec("Imaging","Often expansile and lytic. MRI may show fluid-fluid levels, but that finding is not specific.","Imaging"),
sec("Red Flag","Telangiectatic osteosarcoma can mimic an ABC. Aggressive appearance, atypical features, or discordant clinical behavior should not be assumed benign.","Overview","red"),
sec("Treatment","Management depends on diagnosis, location, recurrence risk, and structural considerations; biopsy planning may be necessary before treatment.","Treatment"),
sec("References",`${refs.oku}, Ch. 9; ABC pp. 102–104. ${refs.imaging}, Bone Tumors, ABC p. 116.`)
]};
D["giant-cell-tumor"]={meta:"Intermediate locally aggressive · Bone",tabs:["Overview","Imaging","Treatment"],sections:[
sec("Overview","Giant cell tumor of bone typically occurs after physeal closure and favors the epiphysis extending to the subarticular bone."),
sec("Imaging","Usually eccentric, lytic, and epiphyseal in a skeletally mature patient. Evaluate cortical integrity, articular proximity, and soft-tissue extension.","Imaging"),
sec("Treatment","Treatment is usually surgical, often intralesional with local adjuvant strategy; systemic therapy may have selected roles.","Treatment"),
sec("References",`${refs.oku}, Ch. 13 Giant Cell Tumor of Bone, pp. 151–162.`)
]};
D["lipoma"]={meta:"Benign · Soft tissue · Adipocytic",tabs:["Overview","Imaging","Treatment","Exam"],sections:[
sec("Overview","Common benign adipocytic soft-tissue tumor. Clinical context and imaging should establish that the lesion behaves like fat."),
sec("Imaging","MRI is typically fat signal on all sequences with suppression on fat-suppressed imaging. Thick septa, nodularity, or nonfatty components change the differential.","Imaging"),
sec("Treatment","Observation is appropriate for many asymptomatic lipomas; excision may be considered for symptoms, growth, uncertainty, or functional issues.","Treatment"),
sec("How to Test",test("Expose the full mass and adjacent joint.","Document size, depth relative to fascia, mobility, consistency, tenderness, skin change, ROM and neurovascular findings.","Soft/mobile superficial mass without functional or neurovascular deficit.","Deep fixation, rapid growth, pain, neurologic findings, skin compromise, or atypical imaging warrant further evaluation."),"Exam"),
sec("References",`${refs.oku}, Ch. 23 Lipoma and Other Benign Lipomatous Tumors.`)
]};
D["schwannoma"]={meta:"Benign · Soft tissue · Neural",tabs:["Overview","Imaging","Treatment","Exam"],sections:[
sec("Overview","Benign peripheral nerve sheath tumor arising from Schwann cells; often eccentric to the parent nerve."),
sec("Clinical Presentation","May present as a slow-growing mass with pain, paresthesias, or a positive Tinel-like response over the lesion."),
sec("Imaging","MRI characterizes relationship to the nerve and surrounding structures and may show a fusiform mass along a nerve course.","Imaging"),
sec("How to Test",test("Position the involved limb to relax the suspected nerve.","Palpate the mass, gently percuss over it, and perform motor/sensory testing of the parent nerve.","No motor deficit and no pathologic paresthesia.","Reproduction of paresthesia or focal motor/sensory deficit helps identify nerve involvement."),"Exam"),
sec("Treatment","Observation vs excision depends on symptoms, growth, diagnostic confidence, and neurologic risk.","Treatment"),
sec("References",`${refs.oku}, Ch. 24; schwannomas pp. 279–283.`)
]};
D["osteosarcoma"]={meta:"Malignant · Bone · Osteoid-producing",tabs:["Overview","Imaging","Staging","Treatment"],sections:[
sec("Overview","High-grade primary malignant bone tumor that produces osteoid. Conventional intramedullary osteosarcoma most often affects adolescents/young adults and commonly occurs in the metaphysis around the knee."),
sec("Imaging",list(["Aggressive mixed lytic/sclerotic lesion may be present.","Osteoid matrix may appear dense/fluffy.","Aggressive periosteal reaction and cortical destruction may occur.","MRI defines local extent; chest staging is essential because lung metastases are clinically important."]),"Imaging"),
sec("Imaging Pearl","A destructive sclerotic or mixed lesion about the knee in a teenager is a classic high-yield pattern, but diagnosis still requires complete workup and tissue confirmation.","Imaging","imaging"),
sec("Staging & Workup","Complete local imaging, chest evaluation, and appropriately planned biopsy are core steps before definitive treatment. Biopsy should be planned with the treating tumor surgeon.","Staging"),
sec("Treatment","Treatment generally combines systemic chemotherapy and wide surgical resection when resectable; exact regimens depend on subtype and patient context.","Treatment"),
sec("References",`${refs.oku}, Chs. 14–15. ${refs.imaging}, Bone Tumors, osteosarcoma p. 120.`)
]};
D["chondrosarcoma"]={meta:"Malignant · Bone · Cartilage-producing",tabs:["Overview","Imaging","Staging","Treatment"],sections:[
sec("Overview","Malignant cartilage-producing bone tumor with behavior strongly related to subtype and grade."),
sec("Imaging","Assess chondroid matrix, endosteal scalloping/cortical destruction, periosteal response, soft-tissue extension, and interval change. CT helps mineralization/cortex; MRI defines marrow and soft-tissue extent.","Imaging"),
sec("Clinical Pearl","Pain attributable to the lesion, progressive change, deep endosteal scalloping/cortical compromise, or soft-tissue extension increase concern in a cartilage lesion.","Overview","pearl"),
sec("Staging & Workup","Local MRI, appropriate systemic staging, and carefully planned biopsy are used when imaging/clinical features are concerning.","Staging"),
sec("Treatment","Surgery is central for most conventional chondrosarcomas; margins and treatment strategy depend on grade, location, and subtype.","Treatment"),
sec("References",`${refs.oku}, Ch. 17, chondrosarcoma of bone pp. 201–210. ${refs.imaging}, Bone Tumors, chondrosarcoma p. 119.`)
]};
D["ewing"]={meta:"Malignant · Bone/soft tissue · Round-cell sarcoma",tabs:["Overview","Imaging","Staging","Treatment"],sections:[
sec("Overview","Aggressive small round-cell sarcoma affecting children, adolescents, and young adults; may arise in bone or soft tissue."),
sec("Imaging","Bone lesions often have a permeative destructive pattern, aggressive periosteal reaction, and a substantial soft-tissue component. MRI is important for local extent.","Imaging"),
sec("Staging & Workup","Staging evaluates local disease and distant sites, particularly lungs and other bone/bone marrow involvement. Biopsy should follow oncologic principles.","Staging"),
sec("Treatment","Multimodality therapy typically combines systemic chemotherapy with local control by surgery and/or radiation depending on site and resectability.","Treatment"),
sec("References",`${refs.oku}, Ch. 16 Ewing Sarcoma.`)
]};
D["myeloma"]={meta:"Malignant · Plasma-cell neoplasm",tabs:["Overview","Imaging","Workup"],sections:[
sec("Overview","Systemic plasma-cell neoplasm that can present to orthopaedic oncology with bone pain, lytic lesions, pathologic fracture, or impending fracture."),
sec("Imaging","Lesions may be multiple and lytic. A negative bone scan does not exclude myeloma because scintigraphic response can be limited in predominantly lytic disease.","Imaging"),
sec("Workup","Evaluation integrates systemic hematologic workup with skeletal imaging and structural assessment of symptomatic lesions.","Workup"),
sec("References",`${refs.oku}, Ch. 19 Multiple Myeloma.`)
]};
D["lymphoma"]={meta:"Malignant · Hematolymphoid",tabs:["Overview","Imaging","Workup"],sections:[
sec("Overview","Lymphoma may involve bone primarily or secondarily and can mimic other aggressive bone lesions."),
sec("Imaging","Radiographic appearance is variable; MRI is useful for marrow and soft-tissue extent. Diagnosis requires tissue and systemic staging.","Imaging"),
sec("Workup","Coordinate biopsy and staging with hematology/oncology; surgery is usually reserved for diagnosis, stabilization, or specific mechanical complications.","Workup"),
sec("References",`${refs.oku}, Ch. 20 Lymphoma.`)
]};
D["soft-tissue-sarcoma"]={meta:"Malignant · Soft tissue",tabs:["Overview","Imaging","Staging","Treatment","Exam"],sections:[
sec("Overview","Heterogeneous group of malignant mesenchymal tumors. The initial goal is to recognize a concerning soft-tissue mass and avoid an unplanned excision."),
sec("Red Flag",list(["Deep to fascia","Enlarging","Large size","Pain or neurologic symptoms","Heterogeneous/necrotic imaging appearance","Fixation or skin compromise"]), "Overview","red"),
sec("Imaging","MRI with appropriate planes/sequences is central to local characterization and relationships; chest imaging is commonly part of staging for many sarcomas.","Imaging"),
sec("Staging & Biopsy","Biopsy trajectory must be planned so the tract can be removed with definitive surgery. Coordinate with the tumor team before biopsy.","Staging"),
sec("Treatment","Management is multidisciplinary and may combine wide resection, radiation, and systemic therapy according to histology, grade, site, and stage.","Treatment"),
sec("How to Test",test("Expose the mass and adjacent joint.","Document size, depth, mobility/fixation, skin, tenderness, ROM, strength, distal motor/sensory function and perfusion.","No functional or neurovascular deficit.","Deficit may indicate compression/invasion or significant mass effect and should be documented before treatment."),"Exam"),
sec("References",`${refs.oku}, Chs. 28–29 Soft-Tissue Sarcomas.`)
]};
D["pseudotumors"]={meta:"Tumor-like · Bone & soft tissue",tabs:["Overview","Differential"],sections:[
sec("Overview","Nonneoplastic conditions—including infection, inflammatory disease, metabolic disease, post-traumatic change, and overuse syndromes—can mimic benign or malignant musculoskeletal tumors."),
sec("Clinical Pearl","A complete history, exam, and appropriate diagnostic testing are necessary before labeling an abnormality neoplastic.","Overview","pearl"),
sec("Examples",list(["Osteomyelitis / Brodie abscess","Myositis ossificans","Post-traumatic or degenerative cystic lesions","Metabolic abnormalities","Inflammatory processes"]), "Differential"),
sec("References",`${refs.oku}, Ch. 5 Pseudotumors and Tumorlike Lesions.`)
]};

const anatomySource={
pelvis:"Netter: Hip joint p. 420; femoral-head vasculature p. 422; deep hip muscles p. 430; sciatic nerve pp. 432–434.",
femur:"Netter: Quadriceps p. 426; deep anterior thigh p. 428; sciatic nerve p. 432; thigh axial sections p. 438.",
knee:"Netter: Knee pp. 440–446; common fibular nerve p. 450.",
tibia:"Netter: Common fibular nerve p. 450; lower-limb vasculature p. 418.",
shoulder:"Netter: Upper Limb section; shoulder girdle begins p. 342; brachial plexus p. 366.",
humerus:"Netter: Upper Limb section, shoulder/arm anatomy and brachial plexus.",
"upper-extremity":"Netter: Upper Limb section, including wrist/hand pp. 390–410.",
nerves:"Netter: brachial plexus p. 366; sciatic nerve pp. 432–434; common fibular nerve p. 450."
};
const anatomyBody={
pelvis:["Pelvic ring: ilium, ischium, pubis, sacrum; acetabulum forms the hip socket.","Hip stability comes from bony congruity, labrum, capsule/ligaments, and surrounding musculature.","High-yield structures for tumor surgery include femoral neurovascular bundle anteriorly, sciatic nerve posteriorly, superior/inferior gluteal structures, and pelvic viscera medially."],
femur:["Anterior thigh: femoral nerve–dominant extensor compartment.","Medial thigh: obturator nerve–dominant adductor compartment.","Posterior thigh: sciatic nerve–dominant hamstring compartment.","Femoral vessels course through the femoral triangle/adductor canal; sciatic nerve remains posterior."],
knee:["Distal femur, proximal tibia/fibula, patella, menisci, cruciate/collateral ligaments and extensor mechanism.","Popliteal artery/vein and tibial nerve are posterior; common fibular nerve wraps laterally around the fibular neck.","Tumor resections around the knee require attention to extensor mechanism, collateral stability and neurovascular structures."],
tibia:["Anterior, lateral and posterior leg compartments have distinct motor and nerve patterns.","Common fibular nerve is particularly vulnerable around the fibular neck/proximal fibula.","Anterior tibial, posterior tibial and fibular vascular territories matter during resection and reconstruction."],
shoulder:["Shoulder girdle includes scapula, clavicle and proximal humerus with the glenohumeral and scapulothoracic functional complex.","Axillary artery/vein and brachial plexus traverse the axilla.","Axillary nerve winds around the surgical neck of the humerus; suprascapular nerve is important around the scapular notches."],
humerus:["Radial nerve courses posteriorly along the humerus and is at risk with posterior/lateral exposures.","Brachial artery and median nerve are major medial/anterior arm structures.","Musculocutaneous nerve supplies anterior arm flexors; ulnar nerve becomes superficial behind the medial epicondyle."],
"upper-extremity":["Use regional anatomy to link motor testing, sensory territories and vascular examination.","At the elbow/forearm/wrist, median, ulnar and radial nerve branches become progressively more superficial and functionally specific.","Document preoperative deficits before tumor surgery and compare postoperatively."],
nerves:["Organize each nerve by roots → course → motor → sensory → bedside test → expected deficit.","Use the simplest isolated motor action possible, then pair it with a sensory territory.","For oncologic surgery, document baseline nerve function before resection and repeat immediately post-op."]
};
const anatomyTests={
pelvis:test("Supine or seated.","Hip flexion, abduction/adduction and rotation; distal femoral/sciatic motor and sensory screen; pulses.","Symmetric painless ROM with intact distal neurovascular exam.","Painful restriction, weakness, sensory loss or perfusion asymmetry localizes functional compromise."),
femur:test("Supine.","Resisted knee extension (femoral), hip adduction (obturator), knee flexion (sciatic); distal sensory/pulse exam.","5/5 major motor groups and intact sensation.","Weakness patterns help localize compartment/nerve involvement."),
knee:test("Supine with knee exposed.","Assess 0–flexion ROM, straight-leg raise/extensor mechanism, ligament stability as appropriate, ankle/toe motor, sensation, pulses.","Full extension, functional flexion, intact extensor mechanism and distal neurovascular exam.","Extensor lag, instability or distal deficit may change urgency and reconstruction planning."),
tibia:test("Supine.","TA/EHL for deep fibular; eversion for superficial fibular; plantar flexion/toe flexion for tibial nerve; sensory and pulses.","Symmetric 5/5 with intact sensation/perfusion.","Foot drop, weak eversion or sensory loss around dorsum/first web space can localize fibular nerve dysfunction."),
shoulder:test("Seated.","Deltoid abduction, rotator cuff screening, biceps/triceps, distal median/ulnar/radial motor and sensation, radial pulse.","Functional ROM and intact axillary/distal nerve testing.","Deltoid weakness/lateral shoulder numbness suggests axillary nerve dysfunction."),
humerus:test("Seated or supine.","Wrist/finger extension (radial), elbow flexion (musculocutaneous), intrinsic/median-ulnar hand testing, sensation and pulse.","Intact wrist extension and distal exam.","Wrist drop or dorsal first-web-space sensory loss suggests radial neuropathy."),
"upper-extremity":test("Seated with both arms visible.","Compare shoulder/elbow/wrist ROM; test deltoid, biceps, triceps, wrist/finger extensors, APB/FDI; map sensation; radial/ulnar pulses.","Symmetric strength and sensation.","Patterned weakness/sensory change suggests a specific nerve or plexus level."),
nerves:test("Choose a position that minimizes substitution.","Axillary: resisted abduction; radial: wrist/finger extension; median: thumb abduction/opposition; ulnar: finger abduction; femoral: knee extension; common fibular: dorsiflexion/eversion; tibial: plantar flexion.","Strong isolated action without substitution.","Weakness should be interpreted with sensory findings and the nerve’s anatomic course.")
};
for(const id of ["pelvis","femur","knee","tibia","shoulder","humerus","upper-extremity","nerves"]){
 D[id]={meta:"Orthopaedic Anatomy · Clinically focused",tabs:["Overview","Relationships","How to Test"],sections:[
 sec("Key Anatomy",list(anatomyBody[id])),
 sec("Tumor / Surgical Relationships","Focus on compartments, major nerves/vessels, resection planes, joint preservation, and structures that must be documented before and after surgery.","Relationships"),
 sec("How to Test",anatomyTests[id],"How to Test"),
 sec("References",anatomySource[id])
 ]};
}
const exams={
"general-tumor-exam":["General Tumor Exam","Inspect and palpate the mass before focusing on the extremity. Document size, location, depth to fascia, consistency, mobility/fixation, tenderness, skin change, warmth, scars, prior biopsy tracts, regional lymph nodes when relevant, joint ROM, and full distal neurovascular status."],
"upper-exam":["Upper Extremity Exam","Document shoulder/elbow/wrist/hand ROM; deltoid, biceps, triceps, wrist/finger extension, thumb abduction/opposition and finger abduction; axillary/median/radial/ulnar sensory territories; radial pulse/capillary refill."],
"lower-exam":["Lower Extremity Exam","Document gait when safe; hip/knee/ankle ROM; hip flexion, knee extension, ankle dorsiflexion, EHL, plantar flexion; femoral/saphenous, superficial/deep fibular, tibial sensory territories; DP/PT pulses."],
"postop-exam":["Post-operative Exam","Inspect dressing/incision/drain sites; document swelling/ecchymosis, compartment tension if relevant, active/passive ROM as allowed, motor/sensory function, perfusion, pain control, mobility/weight-bearing status, and any change from pre-op baseline."]
};
for(const [id,[title,body]] of Object.entries(exams)){
 D[id]={meta:"Physical Exam · Quick reference",tabs:["Exam","How to Document"],sections:[
 sec(title,body,"Exam"),
 sec("How to Test",test("Position for full visualization and comparison.","Perform the relevant regional ROM, strength, sensory and vascular examination in a consistent sequence.","Document objective ROM/strength and intact sensation/perfusion.","Compare with baseline and contralateral side; explicitly document any new deficit."),"Exam"),
 sec("Documentation Pearl","Use the same motor/sensory sequence every time. Consistency makes subtle postoperative change easier to detect.","How to Document","pearl")
 ]};
}

D["bone-lesion-analysis"]={meta:"Imaging · Systematic approach",tabs:["Checklist","Interpretation"],sections:[
sec("10-Step Bone Lesion Checklist",list(["1. Patient age","2. Bone and exact location","3. Epiphysis / metaphysis / diaphysis","4. Medullary / cortical / surface","5. Margin and zone of transition","6. Matrix","7. Periosteal reaction","8. Cortical remodeling or destruction","9. Soft-tissue component","10. Solitary vs multiple"]),"Checklist"),
sec("Clinical Pearl","Use the same search pattern every time; age and exact location dramatically narrow the differential.","Checklist","pearl"),
sec("Interpretation","The lesion’s border/zone of transition, matrix, periosteal response, cortical behavior, and soft-tissue extension help estimate biologic aggressiveness. No single feature should be interpreted in isolation.","Interpretation"),
sec("References",`${refs.imaging}, Bone Tumors chapter pp. 103–135. ${refs.oku}, Ch. 1 Evaluation of Bone Tumors.`)
]};
D["zone-transition"]={meta:"Imaging · Lesion behavior",tabs:["Overview","Examples"],sections:[
sec("Overview","For a geographic lesion, assess how abruptly normal bone transitions to abnormal bone. A narrow zone suggests slower growth; a wide/ill-defined zone raises concern for aggressive biology or infection."),
sec("Important Limitation","A narrow zone does not prove benignity. Age, location, matrix, cortical behavior, and clinical context still matter.","Examples","pearl"),
sec("References",`${refs.imaging}, Border and Zone of Transition, p. 106.`)
]};
D["periosteal-reaction"]={meta:"Imaging · Bone response",tabs:["Overview","Patterns"],sections:[
sec("Overview","Periosteal reaction reflects the rate/pattern of cortical irritation. Slower processes can allow organized new bone; faster processes may produce interrupted or complex patterns."),
sec("Patterns",list(["Solid: generally slower process","Lamellated/onion-skin: repeated periosteal elevation","Spiculated/sunburst: aggressive bone formation","Codman triangle/interrupted reaction: aggressive pattern"]),"Patterns"),
sec("References",`${refs.imaging}, Bone Tumors, periosteal reaction pp. 104–105.`)
]};
D["matrix"]={meta:"Imaging · Tumor matrix",tabs:["Overview","Patterns"],sections:[
sec("Overview","Matrix is material produced by the lesion and often reflects its underlying histology."),
sec("Patterns",list(["Osteoid: dense/cloudlike or fluffy mineralization","Chondroid: stippled, ring-and-arc or reticulated mineralization","Nonmineralized: fluid, fibrous tissue, or fat; MRI/CT help characterize"]),"Patterns"),
sec("Imaging Pearl","Correctly identifying matrix can sharply narrow the differential when combined with age and location.","Overview","imaging"),
sec("References",`${refs.imaging}, Matrix p. 128.`)
]};
D["ct"]={meta:"Imaging · CT",tabs:["Use","Strengths"],sections:[
sec("Best Uses",list(["Cortical detail","Mineralized matrix","Subtle fracture","Complex osseous anatomy","Procedure planning"]),"Use"),
sec("Strengths & Limits","CT provides high spatial resolution for bone but is less sensitive than MRI for marrow and many soft-tissue relationships.","Strengths"),
sec("References",`${refs.oku}, Ch. 1 discusses CT for matrix, cortex and fracture assessment.`)
]};
D["mri"]={meta:"Imaging · MRI",tabs:["Use","Oncology"],sections:[
sec("Best Uses",list(["Marrow extent","Soft-tissue component","Neurovascular relationships","Joint involvement","Edema and enhancement patterns"]),"Use"),
sec("Oncology Pearl","Obtain local MRI before biopsy when possible so the biopsy tract can be planned around the full tumor extent and future resection.","Oncology","pearl"),
sec("References",`${refs.oku}, Chs. 1–3.`)
]};
D["nuclear"]={meta:"Imaging · Nuclear Medicine / PET",tabs:["Overview","Limitations"],sections:[
sec("Overview","Nuclear imaging can help assess distribution of skeletal disease and systemic involvement depending on tumor type and tracer."),
sec("Limitations","Radiotracer uptake is not synonymous with malignancy; some benign lesions are avid, while some aggressive lesions such as myeloma or certain renal-cell metastases may be relatively occult on conventional bone scan.","Limitations"),
sec("References",`${refs.oku}, Ch. 1 Evaluation of Bone Tumors.`)
]};
D["tumor-mimics"]={meta:"Imaging · Pitfalls",tabs:["Overview","Examples"],sections:[
sec("Overview","Infection and nonneoplastic conditions can mimic bone tumors. Do not force an oncologic diagnosis when the clinical and imaging pattern is discordant."),
sec("Examples",list(["Brodie abscess / osteomyelitis","Bone infarct","Myositis ossificans","Stress injury","Metabolic lesions","Degenerative or subchondral cystic change"]),"Examples"),
sec("References",`${refs.oku}, Ch. 5; ${refs.imaging}, Bone Tumors chapter.`)
]};
D["imaging-checklist"]=D["bone-lesion-analysis"];

D["metastatic-workup"]={meta:"Metastatic Bone Disease · Evaluation",tabs:["Workup","Mechanical","Treatment"],sections:[
sec("Workup",list(["Clarify known cancer history and current systemic disease status.","Characterize pain: mechanical vs rest/night pain.","Obtain orthogonal radiographs of the entire involved bone when appropriate.","Use CT/MRI based on structural and local-staging needs.","If the primary diagnosis is unknown or atypical, coordinate staging and biopsy before definitive fixation when oncologically necessary."]),"Workup"),
sec("Mechanical Risk","Assess location, pain, lesion size/cortical involvement, existing fracture, and expected survival/treatment response. Mirels is a screening tool, not the only determinant.","Mechanical"),
sec("Treatment Principles","Coordinate systemic therapy, radiation, bone-modifying therapy, pain control, and surgery. Operative goals prioritize durable mechanical reconstruction matched to the patient’s expected course.","Treatment"),
sec("References",`${refs.oku}, Section 5 Metastatic Disease to Bone; Chs. 30–34.`)
]};
D["upper-metastasis"]={meta:"Metastatic Bone Disease · Upper extremity",tabs:["Principles","Exam"],sections:[
sec("Principles","Upper-extremity surgery is driven by pain, fracture/impending fracture, function, bone stock, disease extent, and anticipated durability. Reconstruction should permit early useful function whenever feasible."),
sec("How to Test",test("Expose the involved limb.","Document shoulder/elbow/wrist/hand ROM and motor; map distal sensation; check radial pulse/capillary refill.","Stable limb with intact neurovascular exam.","Pain with use, loss of function or new neurologic deficit may reflect structural compromise or local progression."),"Exam"),
sec("References",`${refs.oku}, Ch. 32 Surgical Management of Upper Extremity Bone Metastases.`)
]};
D["lower-metastasis"]={meta:"Metastatic Bone Disease · Lower extremity",tabs:["Principles","Exam"],sections:[
sec("Principles","Weight-bearing lesions demand careful assessment of mechanical stability. Reconstruction should be durable enough for expected lifespan and allow mobilization as early as practical."),
sec("How to Test",test("Assess gait only if safe; otherwise supine.","Local tenderness, hip/knee ROM, axial-load symptoms when clinically appropriate, motor/sensory exam and DP/PT pulses.","Pain-free stable weight bearing with intact distal exam.","Functional/mechanical pain or inability to bear weight increases concern for instability."),"Exam"),
sec("References",`${refs.oku}, Section 5 Metastatic Disease to Bone.`)
]};

const quizBank=[
{topic:"Tumors",q:"Which imaging feature is critical for diagnosing an osteochondroma?",a:["Cortical and medullary continuity with the parent bone","Fluid-fluid levels","Purely epiphyseal location","Absent mineralization"],correct:0,why:"Osteochondroma shows continuity of both cortex and medullary canal with the parent bone.",src:"OKU Ch. 10; Plotkin & Davis p. 119."},
{topic:"Imaging",q:"Which factor should be considered first when narrowing the differential for a bone tumor?",a:["Patient age","MRI enhancement","Pain score","Serum calcium"],correct:0,why:"Age is one of the highest-yield discriminators and must be combined with location and lesion behavior.",src:"OKU Ch. 1; Plotkin & Davis Bone Tumors."},
{topic:"Imaging",q:"A wide, ill-defined zone of transition generally suggests:",a:["More aggressive growth","A healed fracture","A normal variant","A fatty lesion"],correct:0,why:"A wide zone reflects faster or more aggressive bone destruction, although infection can also look aggressive.",src:"Plotkin & Davis p. 106."},
{topic:"Anatomy",q:"Which nerve is especially vulnerable around the fibular neck?",a:["Common fibular nerve","Femoral nerve","Obturator nerve","Tibial nerve"],correct:0,why:"The common fibular nerve becomes superficial as it courses around the fibular neck.",src:"Netter p. 450."},
{topic:"Tumors",q:"Which tumor most classically favors the epiphysis in a skeletally immature/young patient?",a:["Chondroblastoma","Osteochondroma","NOF","Osteoid osteoma"],correct:0,why:"Chondroblastoma is characteristically epiphyseal/apophyseal in adolescents and young adults.",src:"OKU pp. 118–119."},
{topic:"Tumors",q:"A destructive osteoid-producing tumor around the knee in an adolescent most strongly suggests:",a:["Osteosarcoma","Chondrosarcoma","Enchondroma","Lipoma"],correct:0,why:"Conventional osteosarcoma commonly occurs metaphyseally around the knee in adolescents/young adults.",src:"OKU Ch. 14; Plotkin & Davis p. 120."},
{topic:"Metastatic",q:"Mirels score is used primarily to estimate:",a:["Risk of pathologic fracture","Tumor grade","Chemotherapy response","Soft-tissue necrosis"],correct:0,why:"Mirels combines site, pain, lesion type, and size to estimate impending fracture risk.",src:"OKU metastatic disease section."}
];

function getFavs(){try{return JSON.parse(localStorage.getItem(FKEY)||"[]")}catch{return[]}}
function setFavs(v){localStorage.setItem(FKEY,JSON.stringify(v))}
function isFav(id){return getFavs().includes(id)}
function toggleFav(id){const f=getFavs();setFavs(isFav(id)?f.filter(x=>x!==id):[...f,id]);updateTop(id)}
function routeParts(){const h=location.hash.replace(/^#/,"")||"home";return h.split("/")}
function go(route){location.hash=route}
function item(id){return items.find(x=>x.id===id)}
function rowHTML(x){const icon=x.cat.includes("Anatomy")?"anat":x.cat.includes("Imaging")||x.cat.includes("tumor")||x.cat.includes("Tumor")?"xr":"";const glyph=x.cat.includes("Imaging")?"XR":x.cat.includes("Tumor")||x.cat.includes("tumor")?"Dx":x.cat.includes("Anatomy")?"◒":"•";return `<button class="row" data-open="${x.id}"><span class="thumb ${icon}">${glyph}</span><span><b>${x.title}</b><small>${x.sub||x.cat}</small></span><span class="chev">›</span></button>`}
function updateTop(id=null){
 const isHome=!id || id==="home";
 topbar.classList.toggle("is-hidden",isHome);
 if(isHome){favBtn.classList.add("is-hidden");return}
 const it=item(id), d=D[id]; topTitle.textContent=(d&&d.title)||(it&&it.title)||"OrthoPearls";
 const detail=!!D[id] || id==="mirels";
 favBtn.classList.toggle("is-hidden",!detail); favBtn.textContent=detail?(isFav(id)?"★":"☆"):"";
 favBtn.dataset.id=detail?id:"";
}
function navActive(id){$$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.route===id))}
function home(){
 updateTop("home");navActive("home");
 view.innerHTML=`<section class="hero"><div class="hero-content"><h1>OrthoPearls</h1><p class="sub">Orthopaedic Oncology</p><p class="tag">Learn. Apply. Excel.</p></div><button class="hero-search" data-route="search"><span>⌕</span><span>Search tumors, anatomy, imaging…</span></button></section>
 <section class="home-grid">
 ${[
 ["tumors","Dx","Tumor Library","Benign · Malignant · Tumor-like"],
 ["anatomy","◒","Orthopaedic Anatomy","Regional · Neurovascular"],
 ["exam","♧","Physical Exam","How to test · What it means"],
 ["imaging","XR","Imaging Principles","Systematic interpretation"],
 ["metastatic","✣","Metastatic Bone Disease","Risk · Workup · Management"],
 ["quiz","?","Quiz & Learning","Custom practice"]
 ].map((x,i)=>`<button class="home-card ${i===5?"wide":""}" data-route="${x[0]}"><span class="glyph">${x[1]}</span><b>${x[2]}</b><small>${x[3]}</small></button>`).join("")}</section><p class="home-foot">Clinician education reference · No PHI</p>`;
}
function listPage(id,title,lead,filterFn,eyebrow="Reference"){
 updateTop(id);navActive("");
 const listItems=items.filter(filterFn);
 view.innerHTML=`<section class="page"><p class="eyebrow">${eyebrow}</p><h1 class="page-title">${title}</h1><p class="lead">${lead}</p><div class="list">${listItems.map(rowHTML).join("")}</div></section>`;
}
function tumors(){
 updateTop("tumors");navActive("");
 const t=items.filter(x=>x.type==="detail" && ["Benign tumor","Benign/tumor-like","Intermediate tumor","Malignant tumor","Tumor-like"].includes(x.cat));
 view.innerHTML=`<section class="page"><p class="eyebrow">Bone & soft tissue</p><h1 class="page-title">Tumor Library</h1><p class="lead">Benign, malignant, and tumor-like conditions in one searchable library.</p><div class="chips"><button class="chip active" data-filter="all">All</button><button class="chip" data-filter="benign">Benign</button><button class="chip" data-filter="malignant">Malignant</button><button class="chip" data-filter="tumor-like">Tumor-like</button></div><div id="tumorList" class="list">${t.map(rowHTML).join("")}</div></section>`;
}
function applyTumorFilter(f){
 $$(".chip").forEach(c=>c.classList.toggle("active",c.dataset.filter===f));
 const t=items.filter(x=>x.type==="detail"&&["Benign tumor","Benign/tumor-like","Intermediate tumor","Malignant tumor","Tumor-like"].includes(x.cat)).filter(x=>f==="all"||(f==="benign"&&(x.cat.startsWith("Benign")||x.cat==="Intermediate tumor"))||(f==="malignant"&&x.cat==="Malignant tumor")||(f==="tumor-like"&&x.cat.includes("tumor-like")||f==="tumor-like"&&x.cat==="Tumor-like"));
 $("#tumorList").innerHTML=t.map(rowHTML).join("");
}
function detail(id,tab=null){
 const d=D[id], it=item(id); if(!d){return genericDetail(id)}
 const tabs=d.tabs||["Overview"]; const active=tab&&tabs.includes(tab)?tab:tabs[0];
 updateTop(id);navActive("");
 const secs=d.sections.filter(s=>s.tab===active || (!s.tab&&active===tabs[0]));
 const html=secs.map((s,i)=>{
   const cls=s.kind==="pearl"?"callout":s.kind==="red"?"red":s.kind==="imaging"?"imaging-pearl":"";
   const pearl=s.kind==="pearl"?'<span class="pearl"></span>':"";
   return `<section class="section-card ${cls}">${pearl}<h3>${s.title}</h3><p>${s.body}</p></section>`;
 }).join("");
 view.innerHTML=`<section class="page"><div class="detail-head"><h1 class="detail-title">${it?.title||id}</h1><div class="detail-meta">${d.meta||""}</div></div><div class="tabs">${tabs.map(x=>`<button class="tab ${x===active?"active":""}" data-tab="${x}" data-id="${id}">${x}</button>`).join("")}</div>${html}</section>`;
}
function genericDetail(id){
 const it=item(id);updateTop(id);navActive("");
 view.innerHTML=`<section class="page"><h1 class="page-title">${it?.title||"Reference"}</h1><p class="lead">This topic is linked correctly, but detailed source-grounded content has not yet been added to this card.</p></section>`;
}
function searchPage(q=""){
 updateTop("search");navActive("search");
 const term=q.toLowerCase().trim(), r=items.filter(x=>x.type!=="route" && (!term || `${x.title} ${x.cat} ${x.sub}`.toLowerCase().includes(term)));
 view.innerHTML=`<section class="page"><p class="eyebrow">Universal search</p><h1 class="page-title">Search</h1><p class="lead">Search tumors, anatomy, physical exam, imaging, and metastatic disease.</p><div class="searchbox"><span>⌕</span><input id="searchInput" value="${q.replaceAll('"','&quot;')}" placeholder="Search OrthoPearls…" autocomplete="off"></div><div id="results" class="list">${r.length?r.map(rowHTML).join(""):'<div class="empty">No matches.</div>'}</div></section>`;
 setTimeout(()=>$("#searchInput")?.focus(),40);
}
function refreshSearch(q){const term=q.toLowerCase().trim(),r=items.filter(x=>x.type!=="route"&&(!term||`${x.title} ${x.cat} ${x.sub}`.toLowerCase().includes(term)));$("#results").innerHTML=r.length?r.map(rowHTML).join(""):'<div class="empty">No matches.</div>'}
function favorites(){
 updateTop("favorites");navActive("favorites");const f=getFavs().map(item).filter(Boolean);
 view.innerHTML=`<section class="page"><p class="eyebrow">Saved reference</p><h1 class="page-title">Favorites</h1><p class="lead">Star any reference page to keep it here.</p><div class="list">${f.length?f.map(rowHTML).join(""):'<div class="empty">No favorites yet. Open a reference page and tap ☆.</div>'}</div></section>`;
}
function settings(){
 updateTop("settings");navActive("settings");
 const dark=document.documentElement.classList.contains("dark");
 view.innerHTML=`<section class="page"><p class="eyebrow">App</p><h1 class="page-title">Settings</h1><p class="lead">Local preferences only. OrthoPearls does not need patient-identifiable information.</p><div class="settings-card"><div class="switchrow"><span><b>Dark mode</b><small style="display:block;color:var(--muted);margin-top:3px">Reduce glare in low-light use.</small></span><input id="darkToggle" type="checkbox" ${dark?"checked":""}></div></div><div class="settings-card"><b>Offline use</b><p class="lead" style="margin-bottom:0">The app caches its core files after loading. Content is educational and should not replace local clinical protocols.</p></div></section>`;
}
function mirels(){
 const defaultVal=1;updateTop("mirels");navActive("");
 view.innerHTML=`<section class="page"><div class="detail-head"><h1 class="detail-title">Mirels Score</h1><div class="detail-meta">Metastatic bone disease · Fracture-risk screening</div></div><section class="section-card"><p>Choose one value in each category. Total range: 4–12.</p><div class="calc">
 ${[
 ["site","Site",[["Upper limb",1],["Lower limb",2],["Peritrochanteric",3]]],
 ["pain","Pain",[["Mild",1],["Moderate",2],["Functional",3]]],
 ["lesion","Lesion",[["Blastic",1],["Mixed",2],["Lytic",3]]],
 ["size","Size (fraction of cortex)",[["< 1/3",1],["1/3–2/3",2],["> 2/3",3]]]
 ].map(([id,l,o])=>`<label>${l}<select class="mirels" id="${id}">${o.map(([a,v])=>`<option value="${v}">${a} — ${v}</option>`).join("")}</select></label>`).join("")}
 <div class="scorebox"><div class="score" id="mScore">4</div><div id="mInterpret">Lower score; integrate with the full clinical/mechanical assessment.</div></div></div><p class="source">Mirels is a screening framework, not a substitute for judgment. OKU notes that CT-based structural methods may outperform clinical/radiographic criteria in selected femoral lesions.</p></section></section>`;
}
function calcMirels(){const s=$$(".mirels").reduce((a,x)=>a+Number(x.value),0);$("#mScore").textContent=s;$("#mInterpret").textContent=s>=9?"High fracture-risk range in the classic Mirels framework; consider prophylactic stabilization in the appropriate clinical context.":s===8?"Intermediate/borderline range; individualized assessment is important.":"Lower score; integrate with the full clinical/mechanical assessment."}
let quizState={questions:[],idx:0,score:0,answered:false};
function quizSetup(){
 updateTop("quiz");navActive("");
 view.innerHTML=`<section class="page"><p class="eyebrow">Learning</p><h1 class="page-title">Quiz & Learning</h1><p class="lead">Questions are drawn from the reference content and include explanations and sources.</p><div class="quiz-options"><label>Topic<select id="quizTopic"><option>All</option><option>Tumors</option><option>Imaging</option><option>Anatomy</option><option>Metastatic</option></select></label><label>Questions<select id="quizCount"><option>5</option><option>10</option></select></label><button class="primary" id="startQuiz">Start Quiz</button></div></section>`;
}
function startQuiz(){
 const topic=$("#quizTopic").value,count=Number($("#quizCount").value);
 let pool=quizBank.filter(q=>topic==="All"||q.topic===topic);
 if(!pool.length)pool=quizBank.slice();
 pool=[...pool].sort(()=>Math.random()-.5);
 quizState={questions:pool.slice(0,Math.min(count,pool.length)),idx:0,score:0,answered:false};renderQuestion();
}
function renderQuestion(){
 const q=quizState.questions[quizState.idx]; if(!q){return quizDone()}
 updateTop("quiz"); view.innerHTML=`<section class="page"><p class="eyebrow">Question ${quizState.idx+1} of ${quizState.questions.length}</p><h1 class="page-title">Quiz</h1><section class="section-card"><p class="quiz-q">${q.q}</p><div>${q.a.map((a,i)=>`<button class="answer" data-answer="${i}">${a}</button>`).join("")}</div><div id="quizFeedback"></div></section></section>`;
}
function answerQuiz(i){
 if(quizState.answered)return;quizState.answered=true;const q=quizState.questions[quizState.idx],ok=i===q.correct;if(ok)quizState.score++;
 $$(".answer").forEach((b,j)=>{if(j===q.correct)b.classList.add("correct");else if(j===i)b.classList.add("wrong")});
 if(!ok){const m=JSON.parse(localStorage.getItem(MISSED)||"[]");localStorage.setItem(MISSED,JSON.stringify([...new Set([...m,q.q])]))}
 $("#quizFeedback").innerHTML=`<div class="quiz-explain"><b>${ok?"Correct":"Not quite"}</b><p class="lead">${q.why}</p><p class="source">${q.src}</p><button class="primary answer" id="nextQ">${quizState.idx===quizState.questions.length-1?"Finish":"Next question"}</button></div>`;
}
function quizDone(){view.innerHTML=`<section class="page"><p class="eyebrow">Complete</p><h1 class="page-title">Quiz Results</h1><section class="scorebox"><div class="score">${quizState.score}/${quizState.questions.length}</div><div>${Math.round(100*quizState.score/quizState.questions.length)}%</div></section><button class="primary answer" data-route="quiz" style="margin-top:12px">Build another quiz</button></section>`}
function render(){
 const [r,arg]=routeParts();
 if(r==="home")return home();
 if(r==="tumors")return tumors();
 if(r==="anatomy")return listPage("anatomy","Orthopaedic Anatomy","Clinically relevant regional anatomy with tumor/surgical relationships and a How to Test section on every page.",x=>x.cat==="Anatomy","Regional anatomy");
 if(r==="exam")return listPage("exam","Orthopaedic Physical Exam","Consistent bedside testing and documentation focused on orthopaedic oncology.",x=>x.cat==="Physical Exam","Examination");
 if(r==="imaging")return listPage("imaging","Imaging Principles","A repeatable approach to musculoskeletal tumor imaging, built around age, location, margins, matrix, periosteum and cross-sectional imaging.",x=>x.cat==="Imaging","Systematic interpretation");
 if(r==="metastatic")return listPage("metastatic","Metastatic Bone Disease","Evaluation, mechanical risk, fracture prevention and durable reconstruction principles.",x=>x.cat==="Metastatic","Dedicated section");
 if(r==="search")return searchPage("");
 if(r==="favorites")return favorites();
 if(r==="settings")return settings();
 if(r==="quiz")return quizSetup();
 if(r==="detail"&&arg==="mirels")return mirels();
 if(r==="detail"&&arg)return detail(arg);
 home();
}
document.addEventListener("click",e=>{
 const r=e.target.closest("[data-route]"); if(r){go(r.dataset.route);return}
 const o=e.target.closest("[data-open]"); if(o){const it=item(o.dataset.open);go(it?.type==="route"?o.dataset.open:`detail/${o.dataset.open}`);return}
 const t=e.target.closest("[data-tab]"); if(t){detail(t.dataset.id,t.dataset.tab);return}
 const c=e.target.closest("[data-filter]"); if(c){applyTumorFilter(c.dataset.filter);return}
 const a=e.target.closest("[data-answer]"); if(a){answerQuiz(Number(a.dataset.answer));return}
 if(e.target.id==="startQuiz"){startQuiz();return}
 if(e.target.id==="nextQ"){quizState.idx++;quizState.answered=false;renderQuestion();return}
});
document.addEventListener("input",e=>{
 if(e.target.id==="searchInput")refreshSearch(e.target.value);
 if(e.target.classList.contains("mirels"))calcMirels();
 if(e.target.id==="darkToggle"){document.documentElement.classList.toggle("dark",e.target.checked);localStorage.setItem("orthopearl_theme",e.target.checked?"dark":"light")}
});
backBtn.addEventListener("click",()=>history.length>1?history.back():go("home"));
favBtn.addEventListener("click",()=>{if(favBtn.dataset.id)toggleFav(favBtn.dataset.id)});
window.addEventListener("hashchange",render);
if(localStorage.getItem("orthopearl_theme")==="dark")document.documentElement.classList.add("dark");
render();
if("serviceWorker"in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"))}
