'use strict';
// PSAC Grade 4 Science 2024 – Q1 has 5 MCQs; rest are written.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g4sci-pp24-001', chapterId:'g4sci-animals', subsection:'classification', difficulty:1,
    question:'Which one of the following animals moves by <strong>swimming</strong>?',
    options:['Butterfly','Camel','Bird','Shark'],
    answer:'Shark',
    hint:'Think about which of these animals lives in the sea and uses fins to move.',
    explanation:'A shark moves by swimming. Butterflies and birds fly, and camels walk on land. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4sci-pp24-002', chapterId:'g4sci-water', subsection:'states', difficulty:1,
    question:'Which one of the following substances <strong>dissolves</strong> in water?',
    options:['Pebble','Rice','Sand','Sugar'],
    answer:'Sugar',
    hint:'Only one of these substances disappears completely when stirred into water.',
    explanation:'Sugar dissolves in water to form a clear solution. Pebbles, rice and sand do not dissolve in water. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4sci-pp24-003', chapterId:'g4sci-plants', subsection:'parts', difficulty:1,
    question:'Which one of the following is an example of a <strong>cereal</strong>?',
    options:['Tea','Wheat','Cocoa seeds','Sunflower seeds'],
    answer:'Wheat',
    hint:'Cereals are grassy plants grown for their starchy grain.',
    explanation:'Wheat is a cereal crop. Tea, cocoa seeds and sunflower seeds come from different types of plants. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4sci-pp24-004', chapterId:'g4sci-animals', subsection:'classification', difficulty:2,
    question:'Which one of the following is a bird <strong>endemic</strong> to <strong>Rodrigues</strong>?',
    options:['Cardinal Jaune','Echo parakeet','Pigeon','Crow'],
    answer:'Cardinal Jaune',
    hint:'This colourful bird is found only on the island of Rodrigues.',
    explanation:'The Cardinal Jaune (Rodrigues Warbler) is endemic to Rodrigues. The Echo parakeet is endemic to the main island of Mauritius. Pigeons and crows are widespread. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4sci-pp24-005', chapterId:'g4sci-protect', subsection:'pollution', difficulty:2,
    question:'<img src="assets/past-papers/g4-science-2024/q1e.png" alt="A man drilling a hole in a wall" style="max-width:100%;margin-bottom:8px"><br>Diagram 1 shows a man drilling a hole in the wall. Drilling a hole in the wall causes ___.',
    options:['water and noise pollution','water and air pollution','air and noise pollution','air and water pollution'],
    answer:'air and noise pollution',
    hint:'Think about what a drill produces: dust and loud sound.',
    explanation:'Drilling creates dust (air pollution) and loud noise (noise pollution). It does not cause water pollution. 📄 PSAC 2024 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g4sci-pp24-pdf-001', chapterId:'g4sci-plants', marks:5, year:2024, grade:4, subject:'Science',
    question:'Q2: Plants. (i) Label the diagram of a plant: root, stem, leaf, flower, fruit, seed. (ii) Write ONE function of the stem. (iii) What does a plant need to make its own food (photosynthesis)?', type:'write', image:'assets/past-papers/g4-science-2024/q6.png' },
  { id:'g4sci-pp24-pdf-002', chapterId:'g4sci-animals', marks:5, year:2024, grade:4, subject:'Science',
    question:'Q3: Animals. (i) Classify each animal: butterfly (insect), whale (mammal), tortoise (reptile), frog (amphibian). (ii) Write a food chain with a plant, a herbivore and a carnivore. (iii) What does "endemic" mean? Name ONE endemic animal of Mauritius.', type:'write' },
  { id:'g4sci-pp24-pdf-003', chapterId:'g4sci-materials', marks:4, year:2024, grade:4, subject:'Science',
    question:'Q4: Materials. (i) Sort these materials into natural and man-made: wood, plastic, cotton, glass, rubber, metal. (ii) Write ONE property of metal that makes it good for making frying pans. (iii) Name ONE material that is magnetic.', type:'write' },
  { id:'g4sci-pp24-pdf-004', chapterId:'g4sci-energy', marks:4, year:2024, grade:4, subject:'Science',
    question:'Q5: Energy. (i) Name THREE forms of energy. (ii) Name TWO renewable sources of energy. (iii) Write ONE way to save energy at home.', type:'write' },
  { id:'g4sci-pp24-pdf-005', chapterId:'g4sci-protect', marks:4, year:2024, grade:4, subject:'Science',
    question:'Q6: Environment. (i) Name the THREE types of pollution. (ii) Write ONE effect of water pollution on animals. (iii) What does the 3Rs stand for? (Reduce, Reuse, Recycle)', type:'write' }
);
