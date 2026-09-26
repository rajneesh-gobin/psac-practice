'use strict';
// NCE 2022 Grade 9 Biology — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate.
// ⚠ Alt text never names the answer.

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp22b-001', chapterId:'g9s-b1-circulatory', subsection:'pulse', difficulty:1,
    question:'Where on the human body can a <b>pulse</b> be felt?',
    options:['Knee','Mouth','Nose','Wrist'], answer:'Wrist',
    hint:'The pulse is the stretching of an artery wall. Feel for it where an artery is close to the skin surface.',
    explanation:'A pulse can be felt wherever an artery runs close to the skin — for example at the <b>wrist</b>, the neck, behind the knee and at the elbow. The mouth and nose are not pulse points. 📄 NCE 2022 Biology exam.' }),

  makeMCQ({ id:'g9s-pp22b-002', chapterId:'g9s-b1-circulatory', subsection:'cardiovascular_disease', difficulty:1,
    question:'Which one of the following is a common cause of <b>cardiovascular diseases</b>?',
    options:['Being underweight','Smoking cigarettes regularly','Having a diet which is low in salt','Doing regular exercises'],
    answer:'Smoking cigarettes regularly',
    hint:'Which habit damages artery walls and promotes fatty deposits?',
    explanation:'<b>Smoking cigarettes regularly</b> damages the inner lining of arteries, promotes the build-up of fatty plaques and raises blood pressure, all of which increase the risk of cardiovascular disease. Being underweight, low-salt diets and regular exercise are not risk factors. 📄 NCE 2022 Biology exam.' }),

  makeMCQ({ id:'g9s-pp22b-003', chapterId:'g9s-b3-biodiversity', subsection:'quadrat_sampling', difficulty:2,
    question:'Which organism can be counted using a <b>quadrat of 1m × 1m</b>?',
    options:['Butterflies','Cows','Snails','Sparrows'], answer:'Snails',
    hint:'A quadrat counts organisms that stay still long enough — and are small enough to fit within the frame.',
    explanation:'<b>Snails</b> move very slowly and are small enough to count accurately within a 1m × 1m quadrat. Butterflies, sparrows and even cows can move out of (or are too large for) a 1m × 1m quadrat before the count is complete, making quadrats unsuitable for them. 📄 NCE 2022 Biology exam.' }),

  makeMCQ({ id:'g9s-pp22b-004', chapterId:'g9s-b3-biodiversity', subsection:'natural_threats', difficulty:2,
    question:'Which one of the following is a <b>natural calamity</b> which affects biodiversity?',
    options:['Cyclones','Deforestation','Water pollution caused by oil spills','Air pollution caused by burning fuels'],
    answer:'Cyclones',
    hint:'Which one happens without any human action?',
    explanation:'A <b>cyclone</b> is a natural event — it occurs with no human cause. Deforestation and pollution (oil spills, burning fuels) are all caused by human activities, so they are not natural calamities. 📄 NCE 2022 Biology exam.' }),

  makeMCQ({ id:'g9s-pp22b-005', chapterId:'g9s-b3-biodiversity', subsection:'human_threats', difficulty:2,
    question:'Which one of the following is an <b>invasive alien species</b> found in Mauritius?',
    options:['Bois de natte','Bottle palm tree','Goyave de Chine','Trochetia Boutoniana'],
    answer:'Goyave de Chine',
    hint:'An invasive alien species was introduced from outside and has spread widely, threatening native species.',
    explanation:'<b>Goyave de Chine</b> (Chinese guava, <i>Psidium cattleianum</i>) is a plant introduced to Mauritius that has spread aggressively and out-competes native vegetation. Bois de natte and Trochetia Boutoniana are native endemic species, and the bottle palm tree is a Mauritian endemic. 📄 NCE 2022 Biology exam.' }),

  makeMCQ({ id:'g9s-pp22b-006', chapterId:'g9s-b2-reproductive', subsection:'stds', difficulty:1,
    question:'Which one of the following is a <b>communicable</b> disease?',
    options:['Diabetes','Gonorrhoea','Heart attack','Stroke'],
    answer:'Gonorrhoea',
    hint:'A communicable disease can be passed from one person to another.',
    explanation:'<b>Gonorrhoea</b> is a bacterial infection transmitted through sexual contact — it is communicable. Diabetes is a metabolic condition, and heart attacks and strokes are cardiovascular events; none of these three are caused by a pathogen you can catch from another person. 📄 NCE 2022 Biology exam.' }),

  makeMCQ({ id:'g9s-pp22b-007', chapterId:'g9s-b2-reproductive', subsection:'male_reproductive_system', difficulty:1,
    question:'Which part of the <b>male reproductive system produces sperms</b>?',
    options:['Penis','Scrotum','Testis','Urethra'], answer:'Testis',
    hint:'It is the primary sex organ of the male.',
    explanation:'The <b>testis</b> (plural: testes) is the organ that produces sperm cells. The scrotum is the pouch that holds the testes at the correct temperature; the penis delivers sperm; and the urethra is the tube through which sperm (or urine) leaves the body. 📄 NCE 2022 Biology exam.' }),

  makeMCQ({ id:'g9s-pp22b-008', chapterId:'g9s-b2-reproductive', subsection:'sexual_asexual', difficulty:2,
    question:'Which one of the following describes how <b>yeast cells reproduce</b>?',
    options:['By laying eggs','By forming seeds','By splitting into two new cells','By forming small buds'],
    answer:'By forming small buds',
    hint:'Yeast is a fungus — it reproduces asexually by growing a small outgrowth that detaches.',
    explanation:'Yeast reproduces asexually by <b>budding</b> — a small bud grows on the parent cell, develops and eventually pinches off as a new yeast cell. Splitting into two equal cells is binary fission (used by bacteria, not yeast). Laying eggs and forming seeds are sexual or plant-specific processes. 📄 NCE 2022 Biology exam.' }),

  makeMCQ({ id:'g9s-pp22b-009', chapterId:'g9s-b4-plant-nutrition', subsection:'leaf_adaptation', difficulty:2,
    question:'Which leaf has the <b>maximum exposure to sunlight</b>?',
    options:['A leaf with surface area 5 cm²','A leaf with surface area 60 cm²','A leaf with surface area 750 cm²','A leaf with surface area 90 cm²'],
    answer:'A leaf with surface area 750 cm²',
    hint:'A larger surface area intercepts more light.',
    explanation:'Light interception depends on the area exposed to sunlight. The leaf with <b>surface area 750 cm²</b> is by far the largest and therefore receives the most light. The lotus-type broad leaf represents this option. Narrow or small leaves catch correspondingly less light. 📄 NCE 2022 Biology exam.' }),

  makeMCQ({ id:'g9s-pp22b-010', chapterId:'g9s-b4-plant-nutrition', subsection:'leaf_adaptation', difficulty:3,
    question:'Which diagram correctly shows the arrangement of <b>phloem and xylem</b> in a cross-section of a plant root?',
    options:['Xylem outside, phloem as a central star','Phloem outside the xylem, xylem on the outer ring','Xylem as a star shape in the centre, phloem in groups between the arms','Xylem and phloem side by side in an oval bundle'],
    answer:'Xylem as a star shape in the centre, phloem in groups between the arms',
    hint:'In a root the xylem forms a characteristic star (X) shape in the very centre.',
    explanation:'In a root cross-section, the <b>xylem</b> forms a central star-shaped mass and the <b>phloem</b> is arranged in groups between the arms of the star. This arrangement is different from a stem, where xylem and phloem are in vascular bundles around the edge. 📄 NCE 2022 Biology exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp22b-pdf-001', chapterId:'g9s-b1-circulatory', marks:9, year:2022, grade:9, subject:'Science (Biology)', type:'written',
    question:'Question 2. Fig. 2.1 shows three types of blood vessels (A = artery, B = vein, C = capillary). (a) Write the names of blood vessels A, B and C. [3] (b) Match each blood component to its corresponding function: Red blood cell / White blood cell / Blood platelet / Blood plasma — Functions: It is involved in blood clotting / It transports substances around the body / It pumps blood around the body / It carries oxygen throughout the body / It protects the body against diseases. [4] (c) What is the colour of blood plasma? [1] (d) What percentage of blood consists of blood cells and platelets? [1]',
    markScheme:'(a) A = Artery (thickest wall, smallest lumen); B = Vein (thinner wall, wider lumen); C = Capillary (very thin wall, tiny diameter). (b) Red blood cell → It carries oxygen throughout the body; White blood cell → It protects the body against diseases; Blood platelet → It is involved in blood clotting; Blood plasma → It transports substances around the body. (c) Pale yellow (straw-coloured). (d) Approximately 45% (blood cells and platelets make up about 45% of blood volume, plasma the remaining 55%).' },

  { id:'g9s-pp22b-pdf-002', chapterId:'g9s-b4-plant-nutrition', marks:9, year:2022, grade:9, subject:'Science (Biology)', type:'written',
    question:'Question 3. Fig. 3.1 shows a cross-section through the leaf of a plant. (a) Using the words given (Stoma, Cuticle, Upper epidermis, Air space, Palisade mesophyll cell), label parts A, B, C and D on Fig. 3.1. [4] (b) Before an experiment to investigate a factor necessary for photosynthesis, the plant is destarched. Why is it important to destarch the plant before the start of the experiment? [1] (c) Complete Table 3.1 by giving the reason for each step when testing a leaf for the presence of starch: (i) Put the leaf in boiling water. (ii) Place the leaf in hot alcohol. (iii) Wash the leaf in warm water. (iv) Cover the leaf with iodine solution on a white tile. [4]',
    markScheme:'(a) A = Cuticle (waxy outer layer); B = Upper epidermis (layer of cells below cuticle); C = Palisade mesophyll cell (tall tightly-packed cells with many chloroplasts); D = Stoma / Air space (opening at lower surface / space inside leaf). (b) To ensure any starch present at the end of the experiment was made during the experiment, not stored beforehand — so the result is valid. (c)(i) Boiling water kills the leaf cells / stops enzyme activity / makes the leaf soft. (ii) Hot alcohol removes the green chlorophyll so the iodine colour change can be seen clearly. (iii) Warm water softens the leaf and removes the alcohol (which would react with iodine). (iv) Iodine solution tests for starch — it turns blue-black in the presence of starch.' },

  { id:'g9s-pp22b-pdf-003', chapterId:'g9s-b2-reproductive', marks:12, year:2022, grade:9, subject:'Science (Biology)', type:'written',
    question:'Question 4. Fig. 4.1 is a front view of the female reproductive system. (a) Label parts W, X, Y and Z on Fig. 4.1. [4] (b) In which part of the female reproductive system does fertilisation take place? [1] (c) What is a fertilised egg called? [1] (d) Fig. 4.2 shows a photomicrograph of an egg (ovum) labelled Cell A. In the space provided, draw a large diagram of Cell A. [2] (e) Table 4.1 shows the number of new HIV cases in Mauritius from 2010 to 2020. (i) What is the number of new HIV cases in 2016? [1] (ii) How is HIV transmitted? [1] (iii) Suggest two reasons why the number of new cases of HIV has dropped from 580 in 2010 to 164 in 2020. [2]',
    markScheme:'(a) W = Ovary; X = Oviduct / Fallopian tube; Y = Uterus; Z = Vagina (accept any consistent labelling if all four different organs). (b) Fertilisation takes place in the oviduct (Fallopian tube). (c) A fertilised egg is called a zygote. (d) Drawing should show a large circular cell with a nucleus visible and a cell membrane. No shading; clear lines. (e)(i) 329 new cases in 2016. (ii) HIV is transmitted through unprotected sexual intercourse, sharing contaminated needles, blood transfusions with infected blood, or from mother to child during birth or breastfeeding. (iii) Any two: increased use of condoms / safe sex education; needle exchange programmes; antiretroviral treatment (reduces viral load); awareness campaigns; screening programmes.' }
);
