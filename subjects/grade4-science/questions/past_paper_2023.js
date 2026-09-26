'use strict';
// PSAC Grade 4 Science 2023 – Q1 has 5 MCQs; rest are written.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g4sci-pp23-001', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:1,
    question:'Which one of the following is a <strong>living thing</strong>?',
    options:['A book','A cat','A door','A table'],
    answer:'A cat',
    hint:'Living things carry out life processes such as movement, growth and respiration.',
    explanation:'A cat is a living thing because it moves, grows, breathes and reproduces. Books, doors and tables are non-living objects. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4sci-pp23-002', chapterId:'g4sci-plants', subsection:'parts', difficulty:1,
    question:'Which one of the following is a <strong>cereal</strong>?',
    options:['Coffee','Mint','Tomato','Wheat'],
    answer:'Wheat',
    hint:'Cereals are grassy plants grown for their starchy seeds used as food.',
    explanation:'Wheat is a cereal — a grass crop whose grains are used to make bread and flour. Coffee, mint and tomato are not cereals. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4sci-pp23-003', chapterId:'g4sci-materials', subsection:'properties', difficulty:2,
    question:'<img src="assets/past-papers/g4-science-2023/q1c.png" alt="A pair of boots" style="max-width:100%;margin-bottom:8px"><br>Diagram 1 shows a pair of boots. Which material can be used to make the <strong>pair of boots</strong>?',
    options:['Glass','Metal','Plastic','Wood'],
    answer:'Plastic',
    hint:'Think about which material is waterproof, flexible and hard-wearing.',
    explanation:'Plastic is waterproof, flexible and hard-wearing, making it suitable for boots. Glass, metal and wood are not suitable for this purpose. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4sci-pp23-004', chapterId:'g4sci-plants', subsection:'parts', difficulty:2,
    question:'<img src="assets/past-papers/g4-science-2023/q1d.png" alt="A bean plant with a part labelled X" style="max-width:100%;margin-bottom:8px"><br>Diagram 2 shows a bean plant. Which part of the bean plant is shown by <strong>X</strong>?',
    options:['Fruit','Leaf','Root','Stem'],
    answer:'Fruit',
    hint:'X is at the top of the plant where seeds are enclosed.',
    explanation:'X shows the fruit (seed pod) of the bean plant. The fruit develops from the flower and contains seeds. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4sci-pp23-005', chapterId:'g4sci-energy', subsection:'sources', difficulty:1,
    question:'<img src="assets/past-papers/g4-science-2023/q1e.png" alt="A boy running" style="max-width:100%;margin-bottom:8px"><br>Diagram 3 shows a boy running. Which source of energy allows the boy to run?',
    options:['Food','Sun','Wind','Wood'],
    answer:'Food',
    hint:'Think about where the human body gets its energy from.',
    explanation:'The human body gets energy from food. When we eat food, it is converted into the energy needed for movement and other activities. 📄 PSAC 2023 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g4sci-pp23-pdf-001', chapterId:'g4sci-plants', marks:5, year:2023, grade:4, subject:'Science',
    question:'Q2A: Look at the diagram of a plant. (i) Label the four main parts of the plant: root, stem, leaf, flower. (ii) Write ONE function of the root. (iii) Name the part of the plant that makes food using sunlight.', type:'write', image:'assets/past-papers/g4-science-2023/q2a.png' },
  { id:'g4sci-pp23-pdf-002', chapterId:'g4sci-living', marks:4, year:2023, grade:4, subject:'Science',
    question:'Q2B: (i) List FOUR characteristics of living things (MRS GREN). (ii) Give ONE difference between a living thing and a non-living thing.', type:'write' },
  { id:'g4sci-pp23-pdf-003', chapterId:'g4sci-animals', marks:5, year:2023, grade:4, subject:'Science',
    question:'Q3: Animals. (i) Name the group each animal belongs to: dog (mammal), eagle (bird), frog (amphibian). (ii) Write a simple food chain with at least THREE organisms. (iii) Name ONE endemic animal of Mauritius.', type:'write' },
  { id:'g4sci-pp23-pdf-004', chapterId:'g4sci-water', marks:4, year:2023, grade:4, subject:'Science',
    question:'Q4: Water. (i) Name the THREE states of water. Give ONE example for each state. (ii) What process changes liquid water into water vapour? (iii) Write ONE way we can save water.', type:'write' },
  { id:'g4sci-pp23-pdf-005', chapterId:'g4sci-protect', marks:4, year:2023, grade:4, subject:'Science',
    question:'Q5: Environment. (i) Name TWO types of pollution. (ii) Write ONE cause and ONE effect of air pollution. (iii) Write ONE way we can protect the environment.', type:'write' }
);
