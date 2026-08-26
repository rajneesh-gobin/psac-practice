'use strict';
// PSAC Grade 6 English 2024 — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate (mauritiuspapers.co.mu).
// Q2: grammar fill-in MCQ (10 items) | Q3B: vocabulary MCQ (5) | Q4B: comprehension MCQ (5)

STATIC_QUESTIONS.push(

  // ── Q2: Grammar fill-in-the-blank MCQ (10 items) ────────────────────────

  makeMCQ({ id:'g6eng-pp24-001', chapterId:'g6eng-nouns', subsection:'common_proper', difficulty:1,
    question:'My mother is going to Port Louis. <b>___</b> will be back at 13 00.',
    options:['She','He','It','They'], answer:'She',
    hint:'"My mother" is a female singular noun — use the matching pronoun.',
    explanation:'"She" replaces "my mother" (female, singular).' }),

  makeMCQ({ id:'g6eng-pp24-002', chapterId:'g6eng-verbs', subsection:'past_tense', difficulty:1,
    question:'My uncle <b>___</b> his family to the cinema yesterday.',
    options:['took','takes','has taken','was taking'], answer:'took',
    hint:'"Yesterday" signals a completed action in the simple past.',
    explanation:'Simple past of "take" = took. "Yesterday" requires simple past tense.' }),

  makeMCQ({ id:'g6eng-pp24-003', chapterId:'g6eng-nouns', subsection:'common_proper', difficulty:1,
    question:'I need <b>___</b> time to finish my homework.',
    options:['many','few','some','any'], answer:'some',
    hint:'"Time" is an uncountable noun. Which determiner works with uncountable nouns in a positive sentence?',
    explanation:'"Some" is used with uncountable nouns in positive statements. "Many/few" need countable nouns.' }),

  makeMCQ({ id:'g6eng-pp24-004', chapterId:'g6eng-vocabulary', subsection:'meaning', difficulty:1,
    question:'Monty was the <b>___</b> clown in the circus.',
    options:['so funny','as funny','funnier','funniest'], answer:'funniest',
    hint:'"The ___" + superlative form. He is being compared with all clowns in the circus.',
    explanation:'"The funniest" is the superlative of "funny", used when comparing one item with all others in a group.' }),

  makeMCQ({ id:'g6eng-pp24-005', chapterId:'g6eng-clauses', subsection:'clause_types', difficulty:1,
    question:'We went to the new aquarium <b>___</b> the holidays.',
    options:['during','since','while','among'], answer:'during',
    hint:'"The holidays" is a noun phrase, not a clause. Which preposition shows something happened within a period of time?',
    explanation:'"During" is a preposition used with a noun phrase to show something happened within that time period. "While" needs a verb/clause.' }),

  makeMCQ({ id:'g6eng-pp24-006', chapterId:'g6eng-verbs', subsection:'present_tense', difficulty:2,
    question:'While Myra <b>___</b> the yard, she found her lost ring.',
    options:['will clean','has cleaned','is cleaning','was cleaning'], answer:'was cleaning',
    hint:'"While" + past continuous sets the background action; "found" is the interrupting event.',
    explanation:'Past continuous (was cleaning) describes the ongoing background action interrupted by "found" (simple past).',
    learnMore:'The <b>past continuous + simple past</b> pattern is very common in storytelling. The structure is:<br><br><i>"While / When [past continuous], [simple past]."</i><br><br>The past continuous sets the <b>scene or background</b> (a long, ongoing action), and the simple past shows a <b>sudden event</b> that interrupts it. Example: "She was walking home <b>when</b> it started to rain." You can also reverse the clauses: "It started to rain while she was walking home."' }),

  makeMCQ({ id:'g6eng-pp24-007', chapterId:'g6eng-nouns', subsection:'common_proper', difficulty:2,
    question:'The children covered <b>___</b> with a blanket as it was very cold.',
    options:['himself','herself','themselves','yourselves'], answer:'themselves',
    hint:'"The children" is plural. The reflexive pronoun must match in number.',
    explanation:'"Themselves" is the plural reflexive pronoun matching "the children".' }),

  makeMCQ({ id:'g6eng-pp24-008', chapterId:'g6eng-verbs', subsection:'present_tense', difficulty:2,
    question:'Have you already <b>___</b> your work?',
    options:['do','did','doing','done'], answer:'done',
    hint:'"Have you already ___?" uses the present perfect tense: have/has + past participle.',
    explanation:'Present perfect = have + past participle. The past participle of "do" is "done".' }),

  makeMCQ({ id:'g6eng-pp24-009', chapterId:'g6eng-clauses', subsection:'clause_types', difficulty:2,
    question:'The pupil <b>___</b> bag was lost was crying.',
    options:['which','whom','who','whose'], answer:'whose',
    hint:'We are talking about the pupil\'s bag — a possessive relationship. Which relative pronoun shows possession?',
    explanation:'"Whose" is the possessive relative pronoun. "The pupil whose bag was lost" = the bag belongs to the pupil.',
    learnMore:'The four key relative pronouns and when to use them:<br><br>• <b>who</b> — for people as the subject: "the boy <u>who</u> ran"<br>• <b>whom</b> — for people as the object: "the girl <u>whom</u> I met"<br>• <b>whose</b> — for possession (people or things): "the pupil <u>whose</u> bag was lost"<br>• <b>which</b> — for things/animals: "the car <u>which</u> broke down"<br><br>Quick test for <b>whose</b>: replace it with "his/her/its" — if the sentence still makes sense, "whose" is correct.' }),

  makeMCQ({ id:'g6eng-pp24-010', chapterId:'g6eng-clauses', subsection:'clause_types', difficulty:1,
    question:'Yohan is excited <b>___</b> he has received his favourite toy.',
    options:['because','although','yet','despite'], answer:'because',
    hint:'The second clause explains the reason for being excited.',
    explanation:'"Because" introduces a reason/cause. "Although/yet/despite" would create a contrast, which makes no sense here.' }),

  // ── Q3B: Vocabulary MCQ (5 items) ───────────────────────────────────────

  makeMCQ({ id:'g6eng-pp24-011', chapterId:'g6eng-vocabulary', subsection:'meaning', difficulty:2,
    question:'"Start running when I blow the whistle!" <b>___</b> the teacher.',
    options:['spoke','told','ordered','asked'], answer:'ordered',
    hint:'The teacher is giving a direct command — which reporting verb matches a command?',
    explanation:'"Ordered" is the correct reporting verb for a command or instruction.' }),

  makeMCQ({ id:'g6eng-pp24-012', chapterId:'g6eng-vocabulary', subsection:'meaning', difficulty:1,
    question:'I need a mechanic to fix the <b>___</b>.',
    options:['car','tap','door','shoes'], answer:'car',
    hint:'A mechanic repairs engines and vehicles.',
    explanation:'Mechanics repair cars (vehicles). Plumbers fix taps, carpenters fix doors.' }),

  makeMCQ({ id:'g6eng-pp24-013', chapterId:'g6eng-vocabulary', subsection:'meaning', difficulty:1,
    question:'The smell of fresh bread is coming from the nearby <b>___</b>.',
    options:['bookshop','hospital','bakery','pharmacy'], answer:'bakery',
    hint:'Where is bread made and sold?',
    explanation:'A bakery bakes and sells bread and pastries.' }),

  makeMCQ({ id:'g6eng-pp24-014', chapterId:'g6eng-vocabulary', subsection:'meaning', difficulty:1,
    question:'Ryan was very <b>___</b> because his brother had torn his book.',
    options:['generous','selfish','angry','honest'], answer:'angry',
    hint:'How would you feel if someone destroyed something of yours?',
    explanation:'"Angry" fits the context — someone destroyed his property. The other words describe character traits, not an emotional reaction.' }),

  makeMCQ({ id:'g6eng-pp24-015', chapterId:'g6eng-vocabulary', subsection:'meaning', difficulty:1,
    question:'He shouted as <b>___</b> as he could to call for help.',
    options:['loudly','obediently','shyly','happily'], answer:'loudly',
    hint:'Shouting relates to the volume of a voice.',
    explanation:'"Loudly" describes the manner of shouting. You shout loudly to be heard.' }),

  // ── Q4B: Comprehension MCQ — Story: Mia and the unicorn ─────────────────
  // Passage summary embedded in each question for standalone practice.

  makeMCQ({ id:'g6eng-pp24-016', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'<b>Read the passage:</b><br><i>One Saturday morning, Mia sat on the floor drawing while <b>Mummy and Daddy were sleeping</b>. She stopped when she heard a noise outside…</i><br><br>When Mia heard a noise outside, her parents were <b>___</b>.',
    options:['having a picnic','having lunch','sleeping','drawing'], answer:'sleeping',
    hint:'Re-read the opening sentence of the passage.',
    explanation:'The passage states "Mummy and Daddy were sleeping" when Mia heard the noise.' }),

  makeMCQ({ id:'g6eng-pp24-017', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:1,
    question:'<b>Passage (Mia and the unicorn):</b> Mia opened the door and went to the garden. <i>"The sound seemed to be coming from a <b>nearby plant</b>."</i><br><br>Mia found that the sound came from a <b>___</b>.',
    options:['park','farm','room','plant'], answer:'plant',
    hint:'Look for where the sound was coming from in the passage.',
    explanation:'The text says "The sound seemed to be coming from a nearby plant."' }),

  makeMCQ({ id:'g6eng-pp24-018', chapterId:'g6eng-comprehension', subsection:'vocabulary', difficulty:2,
    question:'<b>Passage (Mia and the unicorn):</b> <i>"The frightened creature <b>struggled</b> to come out of the branches."</i><br><br>The word "struggled" means the animal <b>___</b>.',
    options:['was talking to Mia','had difficulty getting out','was carrying Mia on her back','was cheerful'], answer:'had difficulty getting out',
    hint:'"Struggled" means to have great difficulty doing something.',
    explanation:'"Struggled to come out" means it had great difficulty getting out of the branches.' }),

  makeMCQ({ id:'g6eng-pp24-019', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'<b>Passage (Mia and the unicorn):</b> <i>"The unicorn jumped in the air with excitement because she was very happy to be free."</i><br><br>The unicorn jumped in the air because <b>___</b>.',
    options:['Mia whispered to her','Mia was playing with her','she had helped Mia','Mia had set her free'], answer:'Mia had set her free',
    hint:'The passage directly states the reason.',
    explanation:'The text says "she was very happy to be free" — Mia had freed her from the branches.' }),

  makeMCQ({ id:'g6eng-pp24-020', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'<b>Passage (Mia and the unicorn):</b> Mia frees a trapped baby unicorn named Unibel from a plant. Later, Mia gets stuck in a tree and calls Unibel, who flies her to safety.<br><br>An appropriate <b>title</b> for this passage would be <b>___</b>.',
    options:['A day out with family','A scary experience','An unexpected friend','A fragile tree'], answer:'An unexpected friend',
    hint:'Think about the central theme: Mia meets a magical creature who later helps her.',
    explanation:'"An unexpected friend" best captures the story — Mia makes an unlikely friend (a unicorn) who saves her.' })

);

// ── PDF-only pool ──────────────────────────────────────────────────────────
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6eng-pp24-pdf-q1', chapterId:'g6eng-clauses', marks:5, year:2024, grade:6, subject:'English',
    question:'Match each sentence on the left with the corresponding sentence on the right. (i) There is a lot of traffic today. (ii) The workers are very tired. (iii) Be careful when drinking your tea! (iv) Are you hungry? (v) Shina is scared in the dark. (vi) It is cold today. Right-hand sentences: Dad has prepared a delicious meal / We will be late for the show / They are resting under the tree / It is hot / Don\'t forget to wear your jacket / Mother is taking him to the hospital / There is a power cut.',
    type:'match' },
  { id:'g6eng-pp24-pdf-q3a', chapterId:'g6eng-vocabulary', marks:5, year:2024, grade:6, subject:'English',
    question:'Find a word to match each description. First letters given. (i) Parts of the body which allow us to see: E___ (ii) A large vehicle used to carry goods: L_____ (iii) A doctor who treats people\'s teeth: D_______ (iv) The meal eaten in the morning: B_________ (v) A tall animal with a very long neck: G______',
    type:'short' },
  { id:'g6eng-pp24-pdf-q4a', chapterId:'g6eng-comprehension', marks:10, year:2024, grade:6, subject:'English',
    question:'Passage about Lionel Messi. Answer: (1) Year of birth (2) Country of birth (3) Age when moved to Spain (4) Age when first played for FC Barcelona (5) Title won in 2006 (6) Height (7) Weight (8) Number of World Cups played (9) Goals in 2022 World Cup (10) Country beaten in 2022 final.',
    type:'short' },
  { id:'g6eng-pp24-pdf-q4b-tf', chapterId:'g6eng-comprehension', marks:3, year:2024, grade:6, subject:'English',
    question:'True or False: (i) Mia was six years old. (ii) Mia saw that a bird was in difficulty. (iii) Daddy brought Mia down from the tree.',
    type:'true-false' },
  { id:'g6eng-pp24-pdf-q4b-open', chapterId:'g6eng-comprehension', marks:4, year:2024, grade:6, subject:'English',
    question:'(7) Why did Mia think the noise could not be that of a baby horse? (8) Mia screamed at the top of her lungs — say why. (9i) How did Mia feel after she told her parents about Unibel? (9ii) How did she feel when her parents had to believe her? (10) Match each character to their actions.',
    type:'short' }
);
