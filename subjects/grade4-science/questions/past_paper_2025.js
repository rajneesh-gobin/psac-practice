'use strict';
// PSAC Grade 4 Science 2025 – Q1 has 5 MCQs; rest are written.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g4sci-pp25-001', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:1,
    question:'Which one of the following is a <strong>living thing</strong>?',
    options:['Car','Dog','Mirror','Table'],
    answer:'Dog',
    hint:'Living things move, grow and reproduce on their own.',
    explanation:'A dog is a living thing because it can move, grow, breathe and reproduce. Cars, mirrors and tables are non-living objects. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4sci-pp25-002', chapterId:'g4sci-plants', subsection:'parts', difficulty:1,
    question:'Which part of a plant contains <strong>pollen</strong>?',
    options:['The flower','The leaf','The stem','The roots'],
    answer:'The flower',
    hint:'Pollen is involved in reproduction and is found in the reproductive part of a plant.',
    explanation:'Pollen is produced in the flower (specifically in the stamen). It is needed for reproduction. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4sci-pp25-003', chapterId:'g4sci-plants', subsection:'parts', difficulty:1,
    question:'Which one of the following is an example of <strong>pulses</strong>?',
    options:['Cloves','Rice','Lentils','Maize'],
    answer:'Lentils',
    hint:'Pulses are the edible seeds of legume plants — think of foods like beans and lentils.',
    explanation:'Lentils are pulses — the dried seeds of legume plants. Cloves are spices, rice is a cereal, and maize is also a cereal. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4sci-pp25-004', chapterId:'g4sci-animals', subsection:'classification', difficulty:2,
    question:'Which one of the following is an <strong>endemic</strong> bird of Rodrigues?',
    options:['Cardinal Jaune','Echo Parakeet','Peacock','Crow'],
    answer:'Cardinal Jaune',
    hint:'An endemic species is found only in one specific location — here, Rodrigues.',
    explanation:'The Cardinal Jaune is endemic to Rodrigues. The Echo Parakeet is endemic to the main island of Mauritius. Peacocks and crows are not endemic to Mauritius. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4sci-pp25-005', chapterId:'g4sci-animals', subsection:'classification', difficulty:1,
    question:'Which one of the following animals moves by <strong>flying</strong>?',
    options:['A cow','A kangaroo','A monkey','A sparrow'],
    answer:'A sparrow',
    hint:'Only one of these animals has wings and can fly.',
    explanation:'A sparrow is a bird that moves by flying. Cows walk, kangaroos hop and monkeys climb. 📄 PSAC 2025 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g4sci-pp25-pdf-001', chapterId:'g4sci-living', marks:5, year:2025, grade:4, subject:'Science',
    question:'Q2: Living things. (i) What does MRS GREN stand for? (ii) Write TWO differences between a living thing and a non-living thing. (iii) Name ONE thing that all living things need to survive.', type:'write' },
  { id:'g4sci-pp25-pdf-002', chapterId:'g4sci-plants', marks:5, year:2025, grade:4, subject:'Science',
    question:'Q3: Plants. (i) Label the diagram: root, stem, leaf, flower, fruit. (ii) Write ONE function of each: leaf, root. (iii) Name THREE things a plant needs to grow well.', type:'write', image:'assets/past-papers/g4-science-2025/q3.png' },
  { id:'g4sci-pp25-pdf-003', chapterId:'g4sci-animals', marks:5, year:2025, grade:4, subject:'Science',
    question:'Q4: Animals. (i) Name the animal group: dog (mammal), eagle (bird), snake (reptile). (ii) Write a food chain starting with grass. (iii) What does "endangered" mean? Name ONE endangered animal of Mauritius.', type:'write' },
  { id:'g4sci-pp25-pdf-004', chapterId:'g4sci-energy', marks:4, year:2025, grade:4, subject:'Science',
    question:'Q5: Energy. (i) Name the source of energy used by each: (a) a solar panel (b) a windmill (c) a fire. (ii) Write ONE advantage of using renewable energy. (iii) Name TWO ways to save electricity at home.', type:'write' },
  { id:'g4sci-pp25-pdf-005', chapterId:'g4sci-protect', marks:4, year:2025, grade:4, subject:'Science',
    question:'Q6: Protecting the environment. (i) Name TWO activities that pollute the sea. (ii) Write ONE effect of deforestation on the environment. (iii) How does recycling help to protect the environment?', type:'write' }
);
