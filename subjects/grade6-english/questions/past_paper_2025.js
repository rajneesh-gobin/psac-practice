'use strict';
// PSAC 2025 Grade 6 English — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate.
// ⚠ Alt text never names the answer.

STATIC_QUESTIONS.push(

  // ── Q2: Grammar fill-in-the-blank MCQ (10 items, 10 marks) ──────────────

  makeMCQ({ id:'g6eng-pp25-001', chapterId:'g6eng-clauses', subsection:'prepositions', difficulty:1,
    question:'We like to play football <b>___</b> recess.',
    options:['while','during','for','on'],
    answer:'during',
    hint:'"Recess" is a noun phrase, not a clause. Which preposition means "within the time of"?',
    explanation:'"During" is used before a noun phrase to show something happens within that time period. "While" needs a verb clause.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6eng-pp25-002', chapterId:'g6eng-nouns', subsection:'pronouns', difficulty:1,
    question:'I saw <b>___</b> uncle near the shop.',
    options:['my','me','myself','mine'],
    answer:'my',
    hint:'Which word is a possessive adjective (used before a noun)?',
    explanation:'"My" is a possessive adjective used before "uncle". "Me/myself/mine" are object or reflexive/possessive pronouns, not adjectives.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6eng-pp25-003', chapterId:'g6eng-nouns', subsection:'determiners', difficulty:1,
    question:'The bird was hungry. I gave it <b>___</b> food.',
    options:['all','many','any','some'],
    answer:'some',
    hint:'"Food" is uncountable. Which determiner is used in a positive giving sentence?',
    explanation:'"Some" is used with uncountable nouns in positive statements. "Many/any" need countable nouns or negatives; "all" would need "the food".',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6eng-pp25-004', chapterId:'g6eng-vocabulary', subsection:'meaning', difficulty:1,
    question:'The <b>___</b> runner of the school won the race.',
    options:['as fast','so fast','fastest','faster'],
    answer:'fastest',
    hint:'"The ___" before a superlative is the signal. Comparing one runner to ALL others.',
    explanation:'"The fastest" is the superlative of "fast", used when comparing one person against a whole group. "Faster" = comparative (two things).',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6eng-pp25-005', chapterId:'g6eng-verbs', subsection:'future_tense', difficulty:1,
    question:'Next week, the Grade 6 pupils <b>___</b> a party at school.',
    options:['had','has','were having','will have'],
    answer:'will have',
    hint:'"Next week" signals a future event.',
    explanation:'"Will have" is the simple future tense. "Next week" tells us the action has not happened yet.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6eng-pp25-006', chapterId:'g6eng-clauses', subsection:'prepositions', difficulty:1,
    question:'The cyclists put their bicycles <b>___</b> the fence.',
    options:['under','against','over','into'],
    answer:'against',
    hint:'Bicycles are leaned on a surface next to them. Which preposition means "touching and leaning on"?',
    explanation:'"Against" means in contact with and leaning on a surface. Bicycles are typically leaned against a fence, not placed under or into it.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6eng-pp25-007', chapterId:'g6eng-nouns', subsection:'pronouns', difficulty:1,
    question:'The children cleaned their room by <b>___</b>.',
    options:['ourselves','himself','yourself','themselves'],
    answer:'themselves',
    hint:'"The children" is plural third person. The reflexive pronoun must match.',
    explanation:'"Themselves" is the plural third-person reflexive pronoun, matching "the children".',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6eng-pp25-008', chapterId:'g6eng-verbs', subsection:'perfect', difficulty:2,
    question:'Mary has <b>___</b> the dogs for a walk.',
    options:['took','taking','taken','take'],
    answer:'taken',
    hint:'"Has ___" = present perfect: have/has + past participle.',
    explanation:'Present perfect = have/has + past participle. The past participle of "take" is "taken".',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6eng-pp25-009', chapterId:'g6eng-clauses', subsection:'clause_types', difficulty:2,
    question:'The boy to <b>___</b> the teacher gave the toy is absent today.',
    options:['whom','which','whose','who'],
    answer:'whom',
    hint:'After a preposition ("to ___"), use "whom" for people.',
    explanation:'"To whom" — the relative pronoun follows a preposition, so "whom" (object form) is required, not "who" (subject form).',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6eng-pp25-010', chapterId:'g6eng-clauses', subsection:'clause_types', difficulty:2,
    question:'<b>___</b> you hurry up, we will miss the bus.',
    options:['But','Unless','If','Despite'],
    answer:'Unless',
    hint:'"We will miss the bus" unless a condition is met. Which conjunction means "if not"?',
    explanation:'"Unless" = "if not". "Unless you hurry up" = "If you do not hurry up". The result (missing the bus) follows.',
    learnMore:'📄 PSAC 2025 exam.' })

);

// ── PDF-only pool ──────────────────────────────────────────────────────────
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(

  { id:'g6eng-pp25-pdf-q1', chapterId:'g6eng-clauses', marks:5, year:2025, grade:6, subject:'English',
    question:'Match each sentence in Column A to the most suitable sentence in Column B. (There is one extra sentence in Column B.) Column A: Le petit animal est tout mouillé / Le ciel est gris / J\'aime manger des gâteaux / Nicolas fouille sa chambre / Paul part en voyage / La fille joue dans la boue. Column B: La pluie s\'annonce / Il prendra l\'avion demain / Il ne retrouve pas son joli camion rouge / Il tremble de froid / Les tartes à la banane sont mes préférées / Le lait est trop chaud / Sa belle robe va se salir.',
    type:'match' },

  { id:'g6eng-pp25-pdf-q3a', chapterId:'g6eng-vocabulary', marks:5, year:2025, grade:6, subject:'English',
    question:'Find a word that belongs to the same theme as the words given. (1) Plate, cup, fork, ___ (2) Soap, shampoo, toothpaste, ___ (3) River, lake, sea, ___ (4) Lock, handle, hinge, ___ (5) Port, runway, terminal, ___',
    type:'short' },

  { id:'g6eng-pp25-pdf-q3b', chapterId:'g6eng-vocabulary', marks:5, year:2025, grade:6, subject:'English',
    question:'Choose the correct word for each sentence. (MCQ vocabulary items — see paper for full options.) Answers: (1) tailor (2) harbour (3) tell (4) apron (5) siren.',
    type:'short' },

  { id:'g6eng-pp25-pdf-q4a', chapterId:'g6eng-comprehension', marks:10, year:2025, grade:6, subject:'English',
    question:'Passage about elephants (Africa and Asia). Answer the questions: where elephants live, what they eat (herbivores), why they are endangered, the role of ivory poaching, conservation efforts.',
    type:'short' },

  { id:'g6eng-pp25-pdf-q4b', chapterId:'g6eng-comprehension', marks:15, year:2025, grade:6, subject:'English',
    question:'Passage about Ted and a talking fish. MCQ answers: (2) D — parents were worried (3) B — to earn money (4) C — happy. Also includes True/False and open-response questions.',
    type:'short' },

  { id:'g6eng-pp25-pdf-q5-q9', chapterId:'g6eng-writing', marks:35, year:2025, grade:6, subject:'English',
    question:'Q5: Sentence manipulation tasks. Q6A/6B: Gap-fill passage. Q7A: Re-order words into a sentence. Q7B: Punctuation and correction tasks. Q8A: Picture story (write one sentence per image). Q8B: Join sentences using given words. Q9: Guided essay (~150 words).',
    type:'short' }

);
