const fs=require('fs'),path=require('path');
const raw=require('./corpus-snapshot.json'), census=require('./practice-census.json');
const findings=[
['g9m-nrb-104-aii','inflated-level','Fraction subtraction alone inherits L4 from a six-mark task. Reclassify the part independently; three routine calculations do not establish challenge-level reasoning.'],
['g9m-vis-003-a','inflated-level','Reading the labelled 600 ml mark is a foundation skill, despite its L4 label. Keep as basic practice or as an introductory part of a larger task.'],
['g9ict-int-202-a','inflated-level','Selecting an Internet connection over a printer/scanner/projector for Internet banking is basic recognition, labelled L4.'],
['g9ict-sys-204-c','inflated-level','The answer 64-bit is explicitly printed in the supplied system panel; this is retrieval, not Hard reasoning.'],
['g9s-inq-350','inflated-level','Selecting Current / A is conventional notation recognition, not challenge-level investigation.'],
['g9s-inq-c100','inflated-level','Selecting the largest of three temperature rises is a simple comparison, not L4. Heat inference also needs comparable mass and thermal conditions.'],
['g9s-inq-c042','weak-distractors','The credible option is compared with choosing the fastest-loading or prettiest website. This allows common-sense elimination without chemistry reasoning.'],
['g9s-stsb-030','weak-distractors','Unsupported website claim: useful scientific literacy, but weak alternatives make L4 excessive. Ask pupils to evaluate competing evidence.'],
['g9s-b2-015','inflated-level','Asks for the function of the oviduct: direct biological knowledge, labelled Hard. The topic is legitimate; its cognitive demand is mislabelled.'],
['g9fr-sb-037','inflated-level','Choosing fermer after Il a voulu is routine infinitive recognition, labelled L4.'],
['g9fr-sb-069','format-gap','Selecting a structure for a literary response does not assess constructing and supporting that response.'],
['g9fr-egv-088','format-gap','Choosing advice about lengthening writing is not producing 50–75 words; distractors include copying and repetition.'],
['g9eng-litv-077','weak-distractors','Simple figurative meaning is contrasted with literal chairs making sounds. L4 overstates the reasoning elicited.'],
['g9eng-litv-097','format-gap','Recognising the only developed, evidence-bearing response does not demonstrate independent literary analysis.'],
['g9sms-sb-007','inflated-level','Selecting ability to pay school fees is a short causal recognition item, not a developed explanation at Hard level.'],
['g9sms-v126','weak-distractors','Distractors claiming Mauritius has no meteorological service or cyclones only form above small islands make elimination too easy.'],
['g9s-c5-v010','content-review','The stem rules out copper hydroxide because it is insoluble, but insoluble bases can be used with acid to prepare salts. Correct this misleading premise before judging difficulty.'],
['g9s-c5-v011','ambiguous-options','Two options both say excess reactant contaminates the salt. A single-answer MCQ should not offer two equivalent correct statements.'],
['g9ict-esv-042','content-review','The question says changes since the last FULL backup but keys incremental; this wording describes differential backup. Review and correct the distinction.'],
['g9m-exp-016-a','useful-core','Expanding two linear factors is legitimate algebra practice; retain an appropriate place in progression.'],
['g9m-multi-003-b','useful-application','Combines trapezium area and reverse rectangle area. This is more substantial application than direct recall.'],
['g9fr-trv-151','useful-core','Passive transformation in the pluperfect demands real grammatical discrimination, although producing it would test more than choosing it.'],
['g9s-b1-v083','useful-application','Distinguishing correlation from sole causation is relevant scientific reasoning. Improve distractor balance rather than remove the outcome.']
];
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?files(path.join(dir,x.name)):[path.join(dir,x.name)]);}
const sourceFiles=files('subjects').filter(f=>/grade9-/.test(f)&&f.endsWith('.js')).map(file=>({file:file.replace(/\\/g,'/'),text:fs.readFileSync(file,'utf8')}));
const reviewed=findings.map(([id,judgment,note])=>{let pack,q;for(const [p,qs]of Object.entries(raw)){const x=qs.find(q=>q.id===id);if(x){pack=p;q=x;break;}}if(!q)throw Error(id);const match=sourceFiles.find(f=>f.text.includes("'"+(q.taskId||q.id)+"'"));const line=match?match.text.slice(0,match.text.indexOf("'"+(q.taskId||q.id)+"'")).split('\n').length:null;return {pack,id,difficulty:q.difficulty,judgment,note,source:match?.file,line,taskId:q.taskId||null,question:q.question,options:q.options,answer:q.answer};});
fs.writeFileSync('docs/nce-difficulty-audit/reviewed-items.json',JSON.stringify(reviewed,null,2));
const table=census.map(c=>`| ${c.pack.replace('grade9-','')} | ${c.practiceItems} | ${((c.types.mcq||0)/c.practiceItems*100).toFixed(1)}% | ${[1,2,3,4].map(d=>c.difficulty[d]||0).join(' / ')} |`).join('\n');
const rows=reviewed.map(r=>`| [${r.id}](../../${r.source}${r.line?'#L'+r.line:''}) | ${r.difficulty} | ${r.judgment} | ${r.note} |`).join('\n');
fs.writeFileSync('docs/nce-difficulty-audit/evidence.md','# Item-level evidence\n\nThese are purposively selected examples and counterexamples, not a random prevalence estimate. Full prompts, options and stored answers are in reviewed-items.json. Proposed judgements are editorial, not empirical pupil difficulty scores.\n\n| Item | Current level | Finding | Reason / action |\n|---|---:|---|---|\n'+rows+'\n');
fs.writeFileSync('docs/nce-difficulty-audit/summary-table.md','| Subject | Practice items | MCQ share | L1 / L2 / L3 / L4 |\n|---|---:|---:|---|\n'+table+'\n');
console.log(table);console.log('Practice items',census.reduce((n,c)=>n+c.practiceItems,0),'reviewed evidence',reviewed.length);
