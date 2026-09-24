'use strict';
// Hand-written copy for the per-subject landing pages. ONE ENTRY PER PAGE.
//
// ⚠ THIS FILE IS THE GATE, AND THAT IS THE WHOLE DESIGN.
//   scripts/build-subject-pages.js emits a page for a live pack **only if it has
//   an entry here**. A pack with no entry gets no page at all — never a page
//   built from a template with the chapter list poured in.
//   Google penalises "doorway pages": near-identical templated pages that exist
//   only to catch search traffic and funnel it somewhere. Forty-six pages
//   differing by a grade number and a list is exactly that shape, and the
//   downside is not "they don't rank", it can drag the whole domain. The only
//   thing separating a useful page from a doorway is genuinely useful text that
//   someone wrote, so the generator refuses to fake it.
//
// ⚠ EVERY CLAIM IN HERE MUST BE TRUE AND SOURCEABLE. These pages are the most
//   public thing this project owns — a stranger's first impression, cached by
//   Google far longer than anything can be corrected. So:
//     • chapter names, chapter counts and question counts are NOT written here.
//       The generator measures them from subjects/_index.js and the built
//       bundles, because a number typed into prose goes stale silently.
//     • no exam durations, mark totals or official weightings unless this repo
//       documents them. The two that are documented and may be used:
//       PSAC French Q6 "Textes à Trous" / Q7 "Formation des Mots" (10 marks on
//       every paper), and the NCE sciences as three independent 45-minute /
//       50-mark papers. Everything else about the real papers stays out.
//     • no pricing and no "free forever". The free-right-now promise carries no
//       end date on any surface and must not gain one here.
//
// Shape:
//   lede   one sentence. Becomes the meta description and the page standfirst.
//          Keep the whole thing under ~150 chars — Google truncates past ~160
//          and the generator appends nothing.
//   about  2 paragraphs. What this subject actually asks of a child at this
//          grade. Written per subject; if two of these could be swapped without
//          anyone noticing, they are not worth publishing.
//   focus  what the app does for THIS subject specifically. Must be true of the
//          app today — these are checked by eye against the feature, not copied
//          between packs.
module.exports = {

  // ── Grade 6 · the PSAC year ───────────────────────────────────────────────
  'grade6-maths': {
    lede: 'Practise every Grade 6 PSAC maths topic, from fractions and percentages to area, volume and speed.',
    about: [
      'Grade 6 is where primary maths stops being about doing one operation correctly and starts being about choosing which operation the situation needs. A child who can compute a percentage still has to recognise that a discount question is a percentage question, and the same number sense has to survive being asked backwards.',
      'The chapters below follow that arc: number and the four operations first, then the three ways of writing a part of a whole - fractions, decimals, ratio and percentage - and finally measurement, where the arithmetic has to carry a unit through a conversion without losing it.',
    ],
    focus: [
      'Word problems are treated as their own difficulty level, not as harder sums. They are the questions that ask a child to derive a quantity nobody handed them.',
      'Every division in a worked route comes out exact, so a child is never quietly told that 22.5 people went for a walk.',
      'Each chapter breaks into named sub-topics with their own question count, so a child who is fine with fractions but lost on ratio can practise only ratio.',
    ],
  },

  'grade6-english': {
    lede: 'Grade 6 PSAC English practice - grammar, comprehension, vocabulary and the writing the paper actually asks for.',
    about: [
      'By Grade 6 the grammar a child has been taught since Grade 1 stops being tested on its own and starts being tested inside a passage. A question about a pronoun arrives as a sentence that has to be rewritten; a question about tense arrives as a paragraph that has changed its mind halfway through.',
      'So the work splits in two. There is the machinery - nouns and determiners, verbs and voice, how clauses join - and there is reading, where that machinery is the tool rather than the subject, and where a child has to answer what a text implies rather than what it states.',
    ],
    focus: [
      'Passages and text types are practised as passages, not as isolated sentences, because that is the form the questions take.',
      'All four options in a multiple-choice question are kept to the same grammatical shape and length, so the answer cannot be spotted by looking at which one is longest.',
      'Read-aloud speaks the question and then each option, lettered, highlighting the one being read - for a child whose reading is the thing being built.',
    ],
  },

  'grade6-french': {
    lede: 'Grade 6 PSAC French practice: tenses, subordinate clauses, cloze texts and the word-formation question worth 10 marks.',
    about: [
      "Le français au niveau Grade 6 se joue sur les temps. L'imparfait contre le passé composé, le futur simple, le conditionnel, le plus-que-parfait et le subjonctif - chacun correct en isolation, et chacun à choisir dans une phrase qui ne le dit pas.",
      'Two of the PSAC French questions have their own shape and are practised in that shape here rather than as multiple choice. Textes à Trous is grammar inside a story, where the gap has to be filled with a word the passage has already implied. Formation des Mots is word-building, and it is worth 10 marks on every paper.',
    ],
    focus: [
      'Cloze and error-hunt exercises are typed, not tapped. They are deliberately kept out of every mixed-practice pool, because a number pad under a French passage is not the exercise.',
      'French questions are read aloud in French, by a French voice, with runs of blanks collapsed into a single hum - fr-FR otherwise reads "___" aloud as three separate words.',
      'The largest bank of the three PSAC languages, because French carries the most marks per paper that can be practised by repetition.',
    ],
  },

  'grade6-science': {
    lede: 'Grade 6 PSAC science practice - air, energy, plants, animals, and the ecosystems of Mauritius and its lagoons.',
    about: [
      'Grade 6 science is where a child is first asked to explain rather than name. Knowing that plants need light is Grade 4 work; accounting for what happens to a lagoon when one part of its food web is removed is Grade 6 work, and it cannot be answered by recall.',
      'Much of the syllabus is deliberately local. Forest and lagoon ecosystems, conservation, and the hazards that arrive with a Mauritian cyclone season are not generic science topics - they are the ones a child can walk outside and look at.',
    ],
    focus: [
      'Diagrams are drawn as inline SVG wherever possible, so they cannot 404, they work offline, and their contents are known exactly.',
      'Alt text never names the answer - a labelled diagram that says what it is proving would answer the question for the child.',
      'Bonus chapters go past the syllabus into food webs and the solar system, marked as extra so nobody mistakes them for examinable material.',
    ],
  },

  'grade6-history': {
    lede: 'Grade 6 PSAC history and geography: settlers and slavery, independence, cultural heritage, land use and map skills.',
    about: [
      'This is the subject where the syllabus is about the child\'s own country, and it asks for more than dates. The arrival of settlers, slavery and indenture, and the road to independence are taught as causes and consequences, so the questions ask why a thing happened and what followed from it.',
      'The geography half is practical. Land use across Mauritius and Rodrigues, the natural hazards of a cyclone season, and map skills - reading a scale, a direction, a symbol - are assessed as things a child does on a map rather than facts they recite about one.',
    ],
    focus: [
      'Map skills are practised on a real interactive map of Mauritius, not on a picture of one.',
      'Enrichment chapters cover the famous figures and national symbols that the syllabus implies without listing, marked as bonus so they are never mistaken for the examinable set.',
      'Questions ask for cause and consequence rather than dates wherever the syllabus does, because that is how the paper asks.',
    ],
  },

  // ── Grade 5 · the year the arithmetic gets long ────────────────────────────
  'grade5-maths': {
    lede: 'Grade 5 maths practice covering fractions, decimals, percentage, ratio, area, capacity and profit and loss.',
    about: [
      'Grade 5 is the widest maths year in primary school. It is where the four operations have to hold up against fractions, decimals, powers, average, ratio and percentage, and where measurement splits into length, area, capacity, mass and time - each with its own units to convert without dropping a factor of ten.',
      'It is also the year money arrives as a topic in its own right. Profit and loss questions ask a child to work out what was paid from what was charged, which is the first time the answer they want is not the last number in the chain.',
    ],
    focus: [
      'This is the only pack with a full sub-topic map - eighteen chapters broken into named sub-topics, each with its own question count and its own practice button.',
      'Word problems build real situations rather than the same sentence with the numbers walked upward. Seventeen families of twenty near-identical items were rewritten for exactly that reason.',
      'Every division in a worked route is checked to come out exact, so no child is told the answer is 568.888 seconds.',
    ],
  },

  'grade5-english': {
    lede: 'Grade 5 English practice - tenses, adjectives and adverbs, punctuation, comprehension, spelling and creative writing.',
    about: [
      'Grade 5 English widens from naming parts of speech to using them. Adjectives and adverbs are the year\'s new work, and they are the first grammar a child has to choose rather than identify: which word is doing the describing, and where in the sentence it belongs.',
      'Alongside that sit the two skills a paper cannot test by multiple choice alone - comprehension, where the answer is in the passage but not in its words, and creative writing, where a child has to produce the sentence rather than repair one.',
    ],
    focus: [
      'Spelling and dictation are practised as their own chapter, because they are the one part of the paper that repetition genuinely fixes.',
      'Comprehension questions are attached to full passages, so a child practises finding an answer in a text rather than in a single sentence.',
      'Read-aloud speaks the question and then each option, lettered and highlighted - this is the grade where reading fluency and the subject being tested are still the same thing.',
    ],
  },

  'grade5-french': {
    lede: 'Grade 5 French practice: passé composé, passé simple, subjonctif, pronouns, cloze texts and error hunting.',
    about: [
      "Le Grade 5 est l'année des temps du passé. Le passé composé arrive d'abord, puis le passé simple et le subjonctif présent - trois façons de parler de ce qui est déjà arrivé, chacune correcte dans un contexte et fausse dans un autre.",
      'The rest of the year consolidates what Grades 3 and 4 introduced: gender and number on nouns, agreement on adjectives, and pronouns - which in French carry a position in the sentence as well as a form, and are the most common place for an otherwise correct answer to go wrong.',
    ],
    focus: [
      'Textes à Trous and Chasse aux Erreurs are typed exercises, kept out of every mixed pool - a number pad under a French passage is not the exercise.',
      'The largest question bank of any pack here, because French grammar is the part of the paper that rewards volume.',
      'Spoken in French by a French voice, with runs of blanks collapsed to a single hum so fr-FR does not read "___" aloud as three separate words.',
    ],
  },

  'grade5-science': {
    lede: 'Grade 5 science practice - plants, habitats, energy, water and states of matter, and simple electric circuits.',
    about: [
      'Grade 5 science is where a child first has to explain a mechanism rather than describe a thing. Water is not just wet: it changes state, and the question is what makes it change and what happens to it when it does. A simple circuit is the same shift - it either works or it does not, and the child has to say why.',
      'Conservation is taught here as something local and specific. Mauritius has endemic species that exist nowhere else, and the syllabus treats their protection as a case a child can reason about rather than a slogan to repeat.',
    ],
    focus: [
      'Circuit and apparatus diagrams are drawn as inline SVG, so they cannot 404, they work offline, and their contents are known exactly.',
      'Alt text never names the answer - a diagram caption that explains what it proves would answer the question.',
      'The endemic-species chapter is marked as bonus so nobody mistakes enrichment for examinable material.',
    ],
  },

  'grade5-history': {
    lede: 'Grade 5 history and geography: discovery and settlement, Port Louis, volcanic relief, weather and map coordinates.',
    about: [
      'The Grade 5 syllabus is the story of how Mauritius came to be settled - the Dutch, then the French, then the British - and it asks what each period left behind rather than when it started. Port Louis gets a chapter of its own, because the capital is where most of that inheritance is still standing.',
      'The geography half is physical. Mauritius is a volcanic island, and its relief, its weather and its environmental problems all follow from that origin, so the questions connect a cause to a landscape a child already knows.',
    ],
    focus: [
      'Map skills and coordinates are practised on a real interactive map of Mauritius rather than on a picture of one.',
      'Questions ask what a period left behind, not what year it began, because that is what the syllabus assesses.',
      'Bonus chapters cover landmarks, heritage and the wider Indian Ocean, clearly marked so they are never taken for the examinable set.',
    ],
  },

  // ── Grade 4 · the first year of the upper-primary syllabus ────────────────
  'grade4-maths': {
    lede: 'Grade 4 maths practice - place value, the four operations, fractions, angles, measures and data handling.',
    about: [
      'Grade 4 is where place value stops being about reading a number and starts being about what happens to it. Once a child knows that the 4 in 3,470 is four hundreds, carrying, borrowing and comparing all follow from the same idea, and the four operations become one topic rather than four.',
      'Fractions arrive in the same year, and they are the first mathematics that contradicts what a child already trusts: a bigger number on the bottom makes a smaller amount. That single reversal is where most Grade 4 mistakes live.',
    ],
    focus: [
      'Six chapters, each broken into named sub-topics with their own question count, so a child can practise only the part that is not working.',
      'Questions are written as real situations rather than one sentence with the numbers changed - a template run of identical stems is one question to a child, not forty.',
      'Read-aloud speaks the question and then each option, lettered and highlighted, for a child who cannot yet read the choices unaided.',
    ],
  },

  'grade4-english': {
    lede: 'Grade 4 English practice - nouns and pronouns, tenses, adjectives, punctuation, comprehension and vocabulary.',
    about: [
      'Grade 4 English is the year the sentence becomes the unit of work. A child moves from recognising a noun to making a whole sentence agree with it - the verb, the article, the punctuation that ends it - and a mistake in any one of those makes the sentence wrong.',
      'Reading widens at the same time. Comprehension questions start asking what a passage means rather than what it says, and vocabulary is taught through word study rather than lists, so a child can work out an unfamiliar word instead of having to have met it before.',
    ],
    focus: [
      'Passages and text types are practised as whole passages, because a comprehension question cannot be shortened to one sentence without becoming a different question.',
      'All four multiple-choice options are kept to the same grammatical shape and length, so the answer cannot be spotted by looking for the longest one.',
      'Read-aloud speaks the question and each lettered option with the one being read highlighted - at this grade the reading is often the obstacle, not the grammar.',
    ],
  },

  'grade4-french': {
    lede: 'Grade 4 French practice: le présent, le passé composé, l\'imparfait, adjectives, cloze texts and error hunting.',
    about: [
      "Le Grade 4 introduit les deux temps du passé que tout le reste du programme suppose connus - le passé composé et l'imparfait. Le premier raconte ce qui est arrivé, le second ce qui durait, et la question du paper est presque toujours de choisir entre les deux.",
      'Before that comes the machinery it rests on: nouns with their articles, adjectives that have to agree in gender and number, and verbs in the present. French marks agreement in writing where English does not, so a child has to hear the sentence and then check it letter by letter.',
    ],
    focus: [
      'Textes à Trous and Chasse aux Erreurs are typed exercises - deliberately excluded from every mixed pool, because a number pad under a French passage is not the exercise.',
      'French questions are read aloud in French by a French voice; if no French voice is installed, the child is told once why it sounds English.',
      'Runs of blanks are collapsed into a single hum, because fr-FR reads "___" aloud as three separate words.',
    ],
  },

  'grade4-science': {
    lede: 'Grade 4 science practice - living and non-living things, plants, habitats, air, water, materials and energy.',
    about: [
      'Grade 4 science begins with the distinction everything else is built on: what is alive, what is not, and what test tells you. From there a child works outward to plants and animals, and to the habitats that decide which of them lives where.',
      'The second half is about substances rather than organisms - air, water, and the properties that make one material right for a job and another wrong. These are the chapters where a child is first asked to predict rather than remember, and where conservation arrives as a consequence of what they have just learned about habitats rather than as a separate lesson to memorise.',
    ],
    focus: [
      'Diagrams are inline SVG wherever possible: they cannot 404, they work offline, and their contents are known exactly.',
      'Alt text never names the answer, so a labelled picture cannot give away what the question is asking.',
      'Bonus chapters cover food chains and the instruments science uses, marked clearly so enrichment is never mistaken for examinable material.',
    ],
  },

  'grade4-history': {
    lede: 'Grade 4 history and geography: your locality past and present, voyages of discovery, weather and map skills.',
    about: [
      'Grade 4 starts with the child\'s own locality and works outward. What was here before, who lives here now, and what changed in between - the syllabus uses the familiar as the way into the idea that places have histories at all.',
      'Then it goes out to sea. The voyages of discovery are how Mauritius enters recorded history, and they are taught alongside weather and map skills, so the child reading about a voyage is also learning to read the map it crossed. Weather is taught the same practical way: not as a topic but as the thing that decides what a Mauritian season looks like and when a cyclone becomes a hazard.',
    ],
    focus: [
      'Map skills are practised on a real interactive map of Mauritius rather than on a picture of one.',
      'The locality chapters ask what changed and why, which is what the syllabus assesses, rather than asking for dates.',
      'Bonus chapters on explorers and the wider world are marked as extra so they are never mistaken for the examinable set.',
    ],
  },

  // ── Grade 9 · NCE ─────────────────────────────────────────────────────────
  // ⚠ Biology, Chemistry and Physics are THREE SEPARATE PACKS, not one science
  //   subject, because the NCE sets them as three independent 45-minute /
  //   50-mark papers. Copy here must never call them "science" — a parent
  //   reading that looks for one subject and finds three cards.
  'grade9-maths': {
    lede: 'NCE Grade 9 maths practice - indices, trigonometry, vectors, matrices, quadratics, simultaneous equations and statistics.',
    about: [
      'Grade 9 is the year school maths becomes algebraic. Up to Grade 8 a question gives you numbers and asks for a number; here it gives you a relationship and asks you to rearrange it. Changing the subject of a formula, solving simultaneously, and factorising a quadratic are all the same skill wearing different clothes.',
      'Geometry changes with it. Trigonometry replaces measuring with calculating, coordinates turn a line into an equation, and vectors and matrices introduce objects that have rules of their own - the first mathematics where you must know what you are allowed to do before you can do anything.',
    ],
    focus: [
      'The largest bank here by a wide margin, and much of it is structured as multi-part tasks rather than single questions, which is the form the NCE paper uses.',
      'Revision chapters for Grades 7 and 8 come first on purpose: Grade 9 algebra collapses if the number work underneath it is shaky.',
      'Personal and household finance is practised as arithmetic with consequences - interest, budgets and bills, where the wrong answer is a real amount of money.',
    ],
  },

  'grade9-biology': {
    lede: 'NCE Grade 9 Biology practice - circulation, reproduction, biodiversity and nutrition in plants.',
    about: [
      'Biology at Grade 9 is a subject about systems that have to keep working. Circulation is not a diagram to label but a circuit with a pump, a direction and a reason for every valve; reproduction is a sequence where the order is the content. Questions ask what happens when one part of the system changes.',
      'Biodiversity is where the syllabus turns local. Mauritius is a place where extinction is documented rather than theoretical, which makes it the natural case for teaching why variety within a population matters at all.',
    ],
    focus: [
      'It is its own paper - the NCE sets Biology, Chemistry and Physics as three independent 45-minute, 50-mark papers, so it is practised as its own subject and never bundled as "science".',
      'Scientific Inquiry is a chapter in its own right: designing a fair test, controlling a variable, and reading a result you did not expect.',
      'Diagrams are inline SVG with alt text that never names the answer, so a labelled illustration cannot give the question away.',
    ],
  },

  'grade9-chemistry': {
    lede: 'NCE Grade 9 Chemistry practice - the atmosphere, mixtures and separation, formulae and equations, metals and salts.',
    about: [
      'Chemistry at this level rests on one idea: a reaction is a rearrangement, and nothing is lost. Once a pupil can write what went in and what came out, the reactivity series stops being a list to memorise and becomes a prediction - this metal will displace that one, and you can say so before you try it.',
      'The Language of Chemistry chapter is the gate to the rest. Formulae and balanced equations are a notation, and a pupil who cannot read it cannot answer a question about salts no matter how well they understand the chemistry underneath.',
    ],
    focus: [
      'Its own paper, not a third of a science one - the NCE sets three independent 45-minute, 50-mark science papers.',
      'Separation techniques are practised against situations: given this mixture, which method, and why not the other one.',
      'Scientific Inquiry and Science, Technology & Society are practised as chapters, because the paper asks about method and consequence as well as content.',
    ],
  },

  'grade9-physics': {
    lede: 'NCE Grade 9 Physics practice - measurement, light, energy and heat, motion and electricity.',
    about: [
      'Physics begins with measurement for a reason: every later answer is a number with a unit, and a pupil who is careless about precision will lose marks in topics they actually understand. Light, motion and electricity then each introduce a model, and the questions test the model rather than the vocabulary.',
      'Energy is the thread through all of them. Heat, motion and current are three things energy does, and the most common Grade 9 question asks where it went - which is answerable only if a pupil has stopped thinking of energy as a substance.',
    ],
    focus: [
      'Its own 45-minute, 50-mark paper under the NCE, practised as its own subject.',
      'Circuit and ray diagrams are drawn as inline SVG, so they work offline and their contents are known exactly.',
      'Measurement questions are checked to resolve exactly, because a physics answer of 568.888 seconds teaches the wrong lesson about precision.',
    ],
  },

  'grade9-ict': {
    lede: 'NCE Grade 9 ICT practice - hardware, operating systems, spreadsheets, databases, networks, algorithms and data protection.',
    about: [
      'ICT at Grade 9 is split between knowing how a system works and being able to make one do something. Hardware, operating systems and networks are the first half; word processing, spreadsheets, databases and presentation are the second, and they are assessed on whether a pupil can choose the right tool for a described job.',
      'Algorithms are the part that transfers. Flowcharts and simple programming teach a pupil to break a task into ordered steps that a machine could follow, which is the same skill the rest of the syllabus keeps asking for in disguise.',
    ],
    focus: [
      'Ethics, data protection and security are practised as scenarios with a decision in them, not as definitions to recall.',
      'Spreadsheet and database questions describe a real task and ask which function or structure fits, rather than asking what a menu is called.',
      'One of the largest banks here, with every chapter broken into named sub-topics carrying their own question count.',
    ],
  },

  'grade9-english': {
    lede: 'NCE Grade 9 English practice - reading, writing, vocabulary, word formation, literary appreciation and full grammar coverage.',
    about: [
      'Grade 9 English separates the machinery from the use of it, and assesses both. Ten grammar chapters cover the system in detail - determiners, modals, prepositions, sentence structure, punctuation - because at this level a pupil is expected to name what is wrong with a sentence, not merely feel it.',
      'The other half is interpretation. Reading comprehension asks what a text implies, literary appreciation asks how it achieves that, and writing asks the pupil to produce the effect rather than describe it. Word formation sits between the two: a vocabulary question that is really a grammar question.',
    ],
    focus: [
      'Grammar is split into eleven separate chapters rather than one, so a pupil can practise modals without wading through nouns.',
      'Listening and speaking are declared but carry no examinable weight here, because a written practice app cannot honestly assess them - they are not padded out to look complete.',
      'All four multiple-choice options are kept to the same grammatical shape and length, so the answer cannot be found by scanning for the longest.',
    ],
  },

  'grade9-french': {
    lede: 'NCE Grade 9 French practice - le mot juste, transformation de phrases, formation des mots, texte à trous et rédaction.',
    about: [
      "Le français au Grade 9 ne teste plus la règle, il teste le choix. « Le mot juste » et la transformation de phrases demandent de reformuler sans changer le sens - une compétence qui suppose la grammaire acquise et ne s'exerce que sur des phrases entières.",
      'The paper also asks for documents a pupil will actually write: an email, a form, a letter of invitation. These are practised as guided writing, where the format carries marks alongside the language, and where a correct sentence in the wrong register still loses them.',
    ],
    focus: [
      'Texte à trous and Correction d\'erreurs are typed exercises, kept out of every mixed pool - a number pad under a French passage is not the exercise.',
      'Spoken in French by a French voice, with runs of blanks collapsed to a single hum so fr-FR does not read "___" aloud as three separate words.',
      'Œuvres au programme is practised as set-text work, which is comprehension of a specific text rather than general reading.',
    ],
  },

  'grade9-social-modern-studies': {
    lede: 'NCE Grade 9 Social & Modern Studies - independence, the Mauritian economic miracle, Chagos, population and citizenship.',
    about: [
      'This is modern Mauritian history taught as cause and effect. The road to independence, living conditions in the 1940s to 1960s, and the economy inherited in 1968 lead directly into industrialisation, the EPZ and what is usually called the Mauritian miracle - and the syllabus asks what made it possible and at what social cost.',
      'The second half is the country as it is now: population and migration, Rodrigues and the outer islands, Chagos and Tromelin, government and the welfare state, and the hazards a small island economy has to plan around. Questions are about consequence, not chronology.',
    ],
    focus: [
      'Map, table and graph skills are their own chapter, because the paper asks pupils to read a source and draw a conclusion from it.',
      'Territorial questions - Chagos, Tromelin, the outer islands - are taught as the documented historical and legal record, not as opinion.',
      'The smallest bank in the Grade 9 set, and honestly so: every chapter holds real questions rather than being padded to match the others.',
    ],
  },

  // ── Grades 1-3 · lower primary ────────────────────────────────────────────
  // ⚠ The hardest set to write and the easiest to get wrong: the three grades of
  //   each subject declare near-identical chapter names, so a page per grade is
  //   one copy-paste away from being three doorway pages. Written per grade on
  //   what actually differs — pre-reading vs fluency vs spelling, counting vs
  //   place value vs regrouping — and test-subject-pages.js compares every
  //   paragraph against every other.
  'grade1-maths': {
    lede: 'Grade 1 maths practice - counting to 20, addition and subtraction, shapes, patterns, measurement, time, money and ordinal numbers.',
    about: [
      "At Grade 1 a number is still a quantity a child can see. Counting to 20 is not recitation - it is knowing that seven counters are still seven when you spread them across the table, and that the numeral 7 is a name for that amount rather than a shape to copy. Addition and subtraction are then just putting the counters together and taking some away, written down.",
      "That is why the rest of the year looks so varied. Shapes and space, patterns, measurement, money, ordinal numbers and the daily routine of a school day are all the same skill in different clothes: matching something real to a number, a name or a position, and being able to say which one comes first.",
    ],
    focus: [
      'Read-aloud speaks the question and then each option, lettered, highlighting the one it is reading - at this grade a child cannot yet read four choices unaided, so the audio is what makes the question answerable.',
      'Counters, shapes and clock faces are drawn as inline SVG, so they look the same offline and cannot quietly fail to load on a slow connection.',
      'Alt text never names the answer: a picture of a handful of mangoes is described as a picture of mangoes, never as how many there are.',
    ],
  },

  'grade2-maths': {
    lede: 'Grade 2 maths practice - numbers to 100, addition and subtraction, first multiplication, halving, simple fractions, time and money.',
    about: [
      "The jump from twenty to a hundred is a jump in how a number is written, not only in how far a child can count. Tens and ones become two separate pieces of information held in one symbol, and a child who reads 42 as a four next to a two rather than as forty and two will get every column sum after it wrong.",
      "Two genuinely new ideas arrive on top of that place value. Multiplication is introduced as repeated groups - three plates with four mangoes on each - long before it is a table to recite, and halving is the same picture read the other way, which is why division starts with dividing by 2. Simple fractions grow out of those halves and quarters, and money gives all of it something worth counting.",
    ],
    focus: [
      'Each chapter opens into named sub-topics, each with its own question count and its own practice button, so a child who is fine with counting but lost on tens and ones can go straight to tens and ones.',
      'Questions are written as varied real situations rather than one stem with the numbers swapped. A run of near-identical sums is one question to a child, not a page of them.',
      'Read-aloud reads the question and then each lettered choice, highlighting the one being spoken, which keeps a shaky reader from losing marks on maths they can actually do.',
    ],
  },

  'grade3-maths': {
    lede: 'Grade 3 maths practice - numbers to 1000, carrying and borrowing, times tables, division, fractions, pictograms and Roman numerals.',
    about: [
      "Grade 3 is the regrouping year, and regrouping is the first thing in primary maths that must be done in a fixed order. Carrying in addition and borrowing in subtraction both rest on one fact - that ten ones and one ten are the same amount written two ways - and a child who has memorised the steps without that idea will produce confident nonsense the moment a zero turns up in the middle of a number.",
      "The times tables sit alongside it and matter more than they look, because every year after this one assumes them. Division then arrives as the question a table answers backwards, fractions extend halves and quarters into thirds and fifths, and Roman numerals, pictograms and the calendar each add another way of recording an amount that is not the ordinary digits.",
    ],
    focus: [
      'Division questions are checked so the answer comes out whole, because a child still learning to divide should never be told that 22.5 children shared the sweets.',
      'Word problems change what the child has to do, not just the numbers - a quantity withheld so they must derive it, an intermediate step asked for instead of the total, or the whole problem run backwards.',
      'Chapters break into named sub-topics with live question counts, so borrowing across a zero can be drilled on its own without sitting through the whole subtraction chapter again.',
    ],
  },
  'grade1-english': {
    lede: 'Grade 1 English practice for children still learning to read - letter sounds, listening, speaking, early writing and first grammar.',
    about: [
      'Grade 1 English happens almost entirely out loud. A child who cannot yet read a sentence can still follow a spoken instruction, answer a question about a story somebody has just read to them, and say what they did at the weekend in words another person understands. Listening and speaking are the subject at this stage, not a warm-up for it.',
      'Phonics is the bridge to everything that follows. Once a child knows which sound each letter makes, they can blend those sounds into a word nobody has read aloud to them first, and the writing work is that same knowledge running backwards - letters formed the right way round, words spaced apart, a name a child can sign.',
    ],
    focus: [
      'Read-aloud speaks the question and then each option in turn, lettered, highlighting the one being spoken - the single feature written for a child who cannot yet read the choices at all.',
      'Pictures are drawn as inline SVG wherever possible, so a phonics question that depends on its image still appears when the connection drops.',
      'Alt text never names what a picture shows, because at this grade naming it would simply hand over the answer.',
    ],
  },

  'grade2-english': {
    lede: 'Grade 2 English practice - blending longer words, reading whole sentences, first punctuation, plurals and writing others can read.',
    about: [
      'By Grade 2 reading turns from decoding a word into carrying a sentence. A child who sounds out every word correctly can still have lost the meaning by the time they reach the full stop, so the year is spent building enough fluency that the sentence survives being read - which is quietly what every comprehension question depends on.',
      'Writing arrives properly alongside it. A capital letter at the start, a full stop at the end, and a verb that matches whoever is doing the action are rules a Grade 2 child still applies deliberately, long before any of them become automatic. Grammar at this stage is the small machinery those sentences need: plurals, articles, simple tenses.',
    ],
    focus: [
      'Each chapter opens into named sub-topics, every one carrying its own question count and its own practice button, so a child stuck on plurals is not marched back through phonics to reach them.',
      'Multiple-choice options are kept to the same grammatical shape and length, so a child who reads slowly is never rewarded for picking whichever one looks longest.',
      'Questions are still read aloud option by option, for the days when the reading is the obstacle and the grammar is not.',
    ],
  },

  'grade3-english': {
    lede: 'Grade 3 English practice - spelling patterns, longer passages, paragraph writing, grammar and the phonics underpinning both.',
    about: [
      'Grade 3 is where spelling stops being a matter of hearing a word properly. Sound alone will not tell a child which of the plausible spellings is the accepted one, so phonics widens into patterns and word families - the endings, the silent letters, and the rules that are worth learning as rules even though they carry exceptions.',
      'Texts grow longer in the same year, and length changes what reading asks for. A passage of several paragraphs holds detail a child has to go back and locate rather than hold in their head, and the writing half asks for exactly that produced: sentences that stay on one idea and follow each other in an order a reader can track.',
    ],
    focus: [
      'Phonics and spelling are practised together as one chapter, because a Grade 3 misspelling is usually a pattern the child has not met yet rather than a word they have forgotten.',
      'Comprehension is attached to whole passages rather than trimmed to a single sentence, since a shortened text is testing something easier than reading.',
      'Options in a multiple-choice question are held to the same length and grammatical shape, so the answer cannot be spotted from its shape alone.',
    ],
  },

  'grade3-ssee': {
    lede: 'Grade 3 SSEE practice - Social Studies and Environmental Education: family, locality, living things, air, water and our weather.',
    about: [
      'Social Studies and Environmental Education asks a Grade 3 child to look properly at what is already around them. Their family, their street, the shops and buildings of their locality, and the plants and animals sharing that space are the syllabus itself, and the questions reward a child who has noticed things over one who has memorised a list of them.',
      'The environmental half turns that noticing into explanation. Air is invisible and still does things; water arrives, gets used and goes somewhere; the weather shifts with a season every Mauritian child already lives through. Telling living from non-living is the habit underneath all of it - deciding what something is by what it does.',
    ],
    focus: [
      'Diagrams and simple maps are drawn as inline SVG wherever possible, so they cannot go missing and they still render offline.',
      'Alt text describes an image without naming what it shows, so a picture of a habitat never answers the question asked about it.',
      'Chapters break into named sub-topics with live question counts, so the water topics can be revised separately from the weather ones.',
      'Anything beyond the syllabus is badged as bonus material, so enrichment is never mistaken for what a child is expected to know.',
    ],
  },
  // ── Grades 1–3 · French ───────────────────────────────────────────────────
  'grade1-french': {
    lede: 'Grade 1 French practice - listening, speaking, first reading and first written words, every question read aloud in French.',
    about: [
      "En Grade 1, le français s'entend avant de se lire. L'enfant écoute une consigne courte, la comprend, et répond à voix haute bien avant de savoir écrire le mot qu'il vient de dire.",
      'That order is deliberate, and it shapes what the written half asks for. Reading at this stage is recognising a word already known by ear, and writing is copying it letter by letter until the shape holds. Grammar is nothing more than gender on a handful of familiar nouns, learnt as part of the word rather than as a rule applied to it, and spoken often enough that the wrong article starts to sound wrong before the child can explain why.',
    ],
    focus: [
      'French questions are read aloud in French by a French voice, which matters most at the grade where a child cannot yet read the question for themselves.',
      'Read-aloud speaks the question and then each lettered option, highlighting the one being spoken, so a child can follow a choice they cannot yet decode on the page.',
      'If the device has no French voice installed, the child is told once why it sounds English, rather than being left to copy a wrong accent.',
    ],
  },

  'grade2-french': {
    lede: 'Grade 2 French practice - listening and speaking, reading simple sentences, writing them, and the first agreement rules.',
    about: [
      "Le Grade 2 est l'année où la phrase apparaît. L'enfant ne reconnaît plus seulement des mots isolés : il lit une phrase entière, en comprend le sens, puis en écrit une à son tour.",
      'Everything else in the year follows from that step up. Speaking becomes answering in a full sentence rather than a single word, and grammar starts to bite, because a sentence forces a determiner to match its noun and a verb to match who is doing it. Written expression stays short and guided here - a caption, a line about a picture, a sentence finished rather than invented from nothing.',
    ],
    focus: [
      'Runs of blanks are collapsed into a single hum when a question is read aloud, because fr-FR otherwise reads a row of underscores out as three separate words.',
      'Each chapter breaks into named sub-topics with their own question count, so a child stuck on agreement can practise only agreement.',
      'Multiple-choice options are kept to the same grammatical shape and length, so the answer cannot be picked out by noticing which one looks different.',
    ],
  },

  'grade3-french': {
    lede: 'Grade 3 French practice - verbs and agreement consolidated, longer reading passages, and written expression of several sentences.',
    about: [
      "Au Grade 3, la grammaire cesse d'être une suite de règles séparées. Le verbe s'accorde avec son sujet, l'adjectif avec son nom, et l'enfant doit tenir les deux accords dans la même phrase.",
      'Reading lengthens to match. A passage now carries more than one idea, so a comprehension question can ask about something stated in one sentence and confirmed in another, and the answer is no longer sitting in the line the question borrowed its words from. Written expression asks for several connected sentences, where the hard part is not spelling but keeping the tense the same from the first to the last.',
    ],
    focus: [
      'Comprehension is practised against whole passages rather than single lines, because a passage is where a question at this level hides its answer.',
      'French text is spoken by a French voice rather than an English one reading French words, and the child is told once if their device has no French voice installed.',
      'Grammar chapters break into named sub-topics carrying their own question count, so verb endings and adjective agreement can be drilled apart from each other.',
    ],
  },

  // ── Grades 1–3 · Health Education ─────────────────────────────────────────
  'grade1-health': {
    lede: 'Grade 1 Health Education practice - washing and brushing, everyday foods, and staying safe at home, at school and on the road.',
    about: [
      'Health Education in Grade 1 is about habits before it is about knowledge. Washing hands, brushing teeth, using a handkerchief and keeping nails short are taught as things done at a particular moment - before eating, after the toilet - because a young child remembers an occasion far better than a reason.',
      'Food is handled the same way. The work is sorting what is on the table into what the body needs plenty of and what it needs only a little of, and noticing that what a child drinks counts as a choice too. Safety covers the places a young child actually is: the road outside the school gate, the kitchen, the playground, and knowing which adult to go to when something goes wrong.',
    ],
    focus: [
      'Read-aloud speaks the question and then each lettered option, highlighting the one being spoken - at this grade the reading is the obstacle, not the health.',
      'Pictures are drawn as inline SVG wherever possible, so they work offline, cannot 404, and show exactly what they are meant to show.',
      'Alt text never names the answer, so a picture of the right thing to do cannot give the question away.',
    ],
  },

  'grade2-health': {
    lede: 'Grade 2 Health Education practice - grooming and personal care, food groups and food safety, and safe behaviour indoors and out.',
    about: [
      'Grooming is what Grade 2 adds. A child who has learnt to wash is now asked to look after hair, nails, clothes and shoes without being reminded each morning, and to see that caring for yourself is part of being well rather than a separate rule about appearance.',
      'Food gains a second half too. Alongside which foods the body needs comes whether the food is still fit to eat - covered, washed, stored, and not left standing in the heat - which in a warm climate is the difference between a meal and an illness. Safety widens beyond the house to the bus, the beach and the yard, and to the idea that some risks are avoided by planning ahead rather than by care at the moment.',
    ],
    focus: [
      'Each chapter breaks into named sub-topics with their own question count, so food safety can be practised separately from nutrition.',
      'Questions describe a situation and ask what a child should do in it, rather than asking for a definition to recite.',
      'All four multiple-choice options are kept to the same grammatical shape and length, so the safe answer is never simply the longest one.',
    ],
  },

  'grade3-health': {
    lede: 'Grade 3 Health Education practice - how illness spreads and is prevented, balanced eating, and what to do first when someone is hurt.',
    about: [
      'Grade 3 is where health stops being a list of good habits and starts having a reason behind each one. Hand-washing is explained by how germs travel, and once a child can say how an illness moves from one person to another, prevention becomes something they can work out rather than only remember.',
      'Eating is treated the same way: a balanced meal is judged against what the body is being asked to do, not against a picture of a correct plate. First aid is the genuinely new work of the year - a cut, a burn, a nosebleed, a sting - and it is the one topic where the order of the steps is the answer, and where knowing when to fetch an adult matters more than knowing the remedy.',
    ],
    focus: [
      'Illustrations of a dressing, a bandage or a safe kitchen are drawn as inline SVG, so they load offline in a classroom with no data and show precisely what is intended.',
      'First aid questions ask for the first step in a described emergency, because the order is what the topic is actually about.',
      'Alt text never reveals the answer, so a labelled picture of an injury cannot tell a child what to do about it.',
    ],
  },

  // ── Grades 7-8 · NCE lower secondary ──────────────────────────────────────
  // ⚠ HELD until 2026-09-16, then published on the owner's explicit instruction.
  //   The content is real, so these pages promise nothing the app cannot serve —
  //   but the site now RANKS for two grades its own homepage does not name. See
  //   GRADES_NAMED_PUBLICLY in scripts/build-subject-pages.js: widening the share
  //   copy needs assets/og-banner.jpg redrawn in the same change, or one Facebook
  //   card contradicts itself in two different fonts.
  // ⚠ Grade 7 and 8 English declare the SAME fourteen chapter names, and Grade 9
  //   English nearly repeats them again; the three French packs are identical too.
  //   Written on what the YEAR asks rather than on the chapter list, because a
  //   page per grade off one template is three doorway pages.
  // ── Grades 7-8 · the first two NCE years ──────────────────────────────────
  'grade7-maths': {
    lede: 'NCE Grade 7 maths practice - integers, indices, percentages, ratio, algebra, sets, transformations, area, speed and statistics.',
    about: [
      'Secondary maths opens at Grade 7, and it opens by moving the goalposts twice. Numbers extend below zero, so a subtraction can now finish somewhere a primary pupil never had to go, and indices give a short way of writing a multiplication done over and over. Prime factorisation completes the shift: a number is described by the parts it is built from rather than by the digits it happens to be written with.',
      'Then the letters arrive, and with them the habit the rest of school maths depends on. An expression stands for a quantity nobody has handed over yet, and an equation is a statement about that quantity which has to stay true while both sides are rearranged. Sets and transformations are new descriptive languages of the same kind - one names a collection by its members, the other names a shape by what has been done to it - while length, mass, area, time, speed and money keep the arithmetic tied to something a pupil can picture.',
    ],
    focus: [
      'Integer work treats the sign as part of the answer, because the commonest Grade 7 slip is a calculation done correctly and landed on the wrong side of zero.',
      'Algebra questions run in both directions: forming an expression from a described situation, and unpicking an equation someone else has already written.',
      'Every chapter opens into named sub-topics, each carrying a live question count and its own practice button, so ratio can be drilled without touching the geometry.',
      'Symmetry and transformation questions are drawn as inline SVG, so a reflected shape is genuinely reflected and the figure still renders with no data at all.',
    ],
  },

  'grade8-maths': {
    lede: 'NCE Grade 8 maths practice - real numbers, Pythagoras, circles, surface area and volume, inequalities, algebra, sets and statistics.',
    about: [
      "Where Grade 7 let letters into the arithmetic, Grade 8 is the year geometry stops being measured and starts being calculated. Pythagoras' theorem hands a pupil a length no ruler can reach, and circles introduce a constant that never resolves, so an answer has to be left in a stated form or rounded on purpose rather than by accident.",
      'Surface area and volume then ask for two things in the same breath: seeing a solid inside a flat drawing, and keeping track of whether the unit is squared or cubed. Inequalities make the quieter change - the answer stops being a number and becomes a range of them, the first time a pupil has to describe a whole set of solutions instead of naming one. Personal and household finance keeps the year honest, because a bill either balances or it does not.',
    ],
    focus: [
      'Construction and triangle questions carry inline SVG figures, so a drawing shows exactly the angle it claims to and still appears when the connection drops.',
      'Circle and Pythagoras questions resolve cleanly where they can, and where a value genuinely cannot be exact the question states how it should be rounded.',
      'Problems are written as separate situations rather than one stem with fresh numbers dropped into it, since two questions differing only in their figures are a single question to a pupil.',
      'Sub-topics are named and counted inside each chapter, so volume can be revised on its own without walking back through surface area first.',
    ],
  },

  'grade7-science': {
    lede: 'NCE Grade 7 science practice - inquiry and measurement, cells, matter, the solar system, electricity, ecosystems, air and energy.',
    about: [
      'At Grade 7 science is taught as one subject, and its opening two chapters are the reason the remainder holds together. Scientific inquiry is where a pupil works out what makes a test fair and what a control is for; measurement is where they learn that a reading without a unit is not a result at all. Every chapter after them is either answered with those two habits or guessed at in their absence.',
      'The content then reaches about as wide as one school year can. Cells are too small to see and the solar system is too large, yet both are approached the same way - through evidence somebody gathered indirectly. Matter sorts the world into elements, compounds and mixtures; electricity behaves identically whether or not anyone present understands it; and ecosystems, food chains and biodiversity draw on an island where the examples are outside the window rather than in a foreign textbook.',
    ],
    focus: [
      'Apparatus, circuit and cell diagrams are drawn as inline SVG, so their contents are known precisely instead of being trusted to an image file that might not load.',
      'Alt text describes a picture without saying what it demonstrates, so a labelled diagram cannot answer the question attached to it.',
      'Inquiry and measurement are practised as chapters in their own right, not as an introduction skipped on the way to the content.',
      'Named sub-topics inside each chapter carry their own question counts, so a pupil who is fine on circuits but lost on ecosystems can go straight to ecosystems.',
    ],
  },

  'grade8-science': {
    lede: 'NCE Grade 8 science practice - nutrition and digestion, respiration, acids and bases, forces, pressure, magnetism, work and energy.',
    about: [
      'Science is still a single subject at Grade 8, but read down the chapter list and next year is already showing through it. Digestion, respiration and disease are biology. The language of chemistry, and acids, bases and salts, are chemistry. Forces, pressure, magnetism, and work and energy are physics. A pupil who spots that has understood something about the shape of the course a year before anybody tells them.',
      'The division is a real one: at Grade 9 the NCE sets Biology, Chemistry and Physics as three independent 45-minute, 50-mark papers. That makes Grade 8 the last year in which one way of thinking covers the whole subject, and the best use of it is the parts that transfer - designing a fair test, reading a symbol correctly, and treating nutrition, disease and technology in society as consequences to reason about rather than lists to recite.',
    ],
    focus: [
      'Force, pressure and magnetism questions come with inline SVG figures, so an arrow points in exactly the direction intended and the diagram survives having no connection.',
      'Alt text on an organ or a circuit is written so that it cannot give away the thing the question is asking about.',
      'The four multiple-choice options are held to one grammatical shape and length, so the correct one is never simply the answer that looks most complete.',
      'Each chapter breaks into named sub-topics with live question counts, so respiration can be revised apart from digestion rather than alongside it.',
    ],
  },
  // ── Grades 7-8 · NCE · English and French ─────────────────────────────────
  // ⚠ Grade 7 and Grade 8 English declare the SAME fourteen chapter names, and
  //   Grade 9 English declares nearly the same set again. The French packs
  //   repeat the trick with five. Written on what the YEAR asks — the step up
  //   into secondary, then consolidation under longer form — never on the
  //   chapter list, which is identical and therefore says nothing.
  'grade7-english': {
    lede: 'NCE Grade 7 English practice - the first secondary year: longer texts, grammar named properly, and writing that has to hold a shape.',
    about: [
      'Grade 7 is the first year of the NCE, and the change a pupil notices first is size. Passages run longer than anything primary set, the line that answers a question sits further from the question itself, and a single tidy paragraph no longer counts as a piece of writing - it has to sit inside something with an opening and an ending.',
      'The grammar half changes in kind rather than in quantity. Until now a pupil could hear that a sentence was wrong; from here they are asked to say which part of it is, and that needs the words for it - determiner, modal, clause - as much as the ear. Naming a fault is what makes it fixable in their own writing rather than only in an exercise.',
    ],
    focus: [
      'Each grammar area is a chapter of its own, and each opens into named sub-topics with a live question count, so a pupil can work on pronouns without scrolling past nouns to reach them.',
      'Comprehension is set against full-length passages, because in the first NCE year the answer is usually several sentences away from where the question is asked.',
      'Listening and speaking appear as chapters but are not inflated with substitute questions - a written practice app cannot honestly mark a spoken answer, and pretending otherwise would flatter the pupil.',
    ],
  },

  'grade8-english': {
    lede: 'NCE Grade 8 English practice - sustained writing, register and audience, and the modal and preposition detail that separates fluent from accurate.',
    about: [
      'Nothing new is announced in Grade 8; what changes is how long a pupil has to keep it going. An argument now has to survive three or four paragraphs without circling back on itself, and a comprehension answer often has to draw on two places in a text at once instead of quoting whichever sentence sits nearest.',
      'Accuracy turns into the dividing line at the same time. A pupil who speaks English easily can still put the wrong preposition after a verb, or reach for a modal that claims more certainty than they mean, and this is the year that difference starts costing marks. Register is the other half of it: the same content written for a friend and for a head teacher is not the same piece of work.',
    ],
    focus: [
      'Modals, prepositions and sentence structure are separate chapters with their own sub-topics, because these are exactly the details a confident speaker is most often wrong about.',
      'The four options in a choice question are held to one grammatical shape and a similar length, so nothing can be ruled out on appearance before it has been read.',
      'Read-aloud speaks the stem and then each lettered option, marking the one it is on, which at this grade is most useful for hearing whether a long sentence actually holds together.',
    ],
  },

  'grade7-french': {
    lede: 'NCE Grade 7 French practice - compréhension et expression orales, lecture, rédaction, and a first prescribed literary text.',
    about: [
      "En Grade 7, le français entre au collège et la littérature arrive avec lui. Pour la première fois l'élève travaille sur une œuvre imposée : il doit suivre une histoire longue, retenir qui fait quoi, et retrouver le passage qui justifie sa réponse.",
      'The rest of the year leans on that. Oral work moves from answering a question to holding a short exchange, reading is set against texts carrying more than one idea, and written expression asks for a paragraph that keeps the same tense from its first line to its last. A prescribed book is also where vocabulary stops being a list to learn and becomes words the pupil has already met in use.',
    ],
    focus: [
      'Every French question can be spoken in French by a French voice; where the device has none installed, the pupil is told once why it sounds English rather than left copying a wrong accent.',
      'Littérature is treated as work on one prescribed book - who does what, where it happens, and which passage supports the answer - rather than as extra reading comprehension.',
      'Chapters open into named sub-topics carrying their own question count, so oral comprehension can be revised apart from written expression.',
    ],
  },

  'grade8-french': {
    lede: 'NCE Grade 8 French practice - sustained rédaction, oral justification, and a set text read for how it works rather than for what happens.',
    about: [
      "Au Grade 8, l'œuvre au programme ne se résume plus : elle s'interprète. L'élève ne raconte plus ce qui arrive, il explique comment le texte s'y prend - le personnage qui parle, le mot choisi, l'effet produit sur le lecteur.",
      "That shift pulls the rest of the year up with it. Expression écrite wants an opinion defended over several paragraphs instead of a description, oral work asks a pupil to justify rather than report, and comprehension expects an answer in the pupil's own words rather than the text's. The grammar is assumed by this point, which is precisely why a small agreement error is expensive here.",
    ],
    focus: [
      'A row of underscores is spoken as one short hum instead of word by word, since fr-FR reads "___" aloud as three separate words.',
      'Options in a choice question are matched for length and grammatical shape, so the answer cannot be reached by picking whichever one looks out of place.',
      'Set-text questions ask how a passage achieves its effect, so the Littérature work is interpretation of the prescribed book rather than recall of its plot.',
    ],
  },
  'grade7-social-modern-studies': {
    lede: 'NCE Grade 7 Social & Modern Studies - our islands and their landforms, heritage and identity, where people live, and people and environment.',
    about: [
      'Grade 7 opens the NCE with geography doing the explaining. Mauritius, Rodrigues, Agalega and the outer islands are not one place but several, and each has landforms that follow from how and when it rose out of the sea. The questions ask what those landforms decide: where the rain falls, where the soil is deep, and where anyone could reasonably build.',
      'Identity then arrives as a consequence of movement. Who came, from where, and what they carried with them accounts for the languages, faiths and festivals a pupil already lives among. The last chapters close the loop - settlement follows the land, and the land is then altered by the people settled on it.',
    ],
    focus: [
      'Landform and location work is done on a real interactive map of Mauritius and its islands, not on a printed picture of one.',
      'Each chapter opens into named sub-topics carrying their own question count, so relief can be revised apart from settlement.',
      'Environment questions ask what changes downstream when land use changes, rather than asking for a term to define.',
    ],
  },

  'grade8-social-modern-studies': {
    lede: 'NCE Grade 8 Social & Modern Studies - slavery and indenture, society from the 1920s to the 1960s, independence, democracy and a changing climate.',
    about: [
      'Grade 8 runs in order, and the order is the argument. Slavery and indentured labour are where the population of this country comes from, and what the syllabus covers afterwards - who owned land, who worked it, which communities settled where - follows from those two systems rather than sitting beside them as separate topics.',
      'From there a pupil tracks the island into adulthood: the society of the 1920s to the 1960s with its labour unrest and its widening franchise, the negotiated route to 1968, and the institutions a new democracy then had to build and defend. The year closes in the present, on the climate pressure that now constrains every plan a small island can make.',
    ],
    focus: [
      'Sources are set to be read rather than admired: a population table or a rainfall graph is given, and the question asks what it shows.',
      'Slavery, indenture and the road to independence are handled as the documented record, with questions asking for causes and their consequences instead of for a year to recall.',
      'Timelines and diagrams are drawn as inline SVG, so they still appear when a pupil is revising with no connection at all.',
    ],
  },
};
