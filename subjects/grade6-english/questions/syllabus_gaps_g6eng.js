'use strict';
// Grade 6 English - the ten grammar items the NCF syllabus names for Grade 6 and
// the pack was not asking.
//
// ⚠ WHY THIS FILE EXISTS. scripts/fact-ledgers/grade6-english.json is built from
//   the NCF GRAMMAR SYLLABUS table in the MIE syllabus (printed pages 19-22),
//   Grade 6 column. Against 988 questions it reported ten items with nothing
//   behind them - and one of them is a whole word class:
//     ⚠ THE WORD "ADVERB" DID NOT APPEAR ONCE IN 988 QUESTIONS, although the
//       Grade 6 column names adverbs of degree AND adverbs used to modify an
//       adjective. Neither did "phrasal", "shiny" or "wooden".
//   The others: forming a noun from an adjective, forming adjectives from nouns
//   and verbs, words that take no article, the prepositions for/with/without,
//   and conjunctions of reason, place and duration.
//
// ⚠ Three new subsections - `adverbs`, `prepositions`, `phrasal_verbs` - reuse
//   ids that already exist in sibling packs (grade4/5-english carry `adverbs`,
//   grade9-english carries `prepositions` and `phrasal_verbs`) rather than
//   inventing new names. All three are declared in _manifest.js; declared and
//   tagged ids must match exactly or test-subsection-invariant.js fails.
//
// ⚠ Adverbs and prepositions sit in g6eng-clauses, beside conjunctions and
//   punctuation: that chapter is where this pack keeps the words that join and
//   modify. Phrasal verbs sit in g6eng-verbs, where they belong.
//
// IDs: g6eng-syl-001 onwards (a prefix of its own; the chapter prefixes are full).

STATIC_QUESTIONS.push(

  // ── Adverbs: what they are ──────────────────────────────────────────────
  makeMCQ({ id:'g6eng-syl-001', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:1,
    question:'What does an <b>adverb</b> do in a sentence?',
    options:['It tells us more about a verb','It names a person or a place','It joins two sentences together','It takes the place of a noun'], answer:'It tells us more about a verb',
    hint:'The name of the word class contains the word it usually works on.',
    explanation:'An <b>adverb</b> tells us more about a verb &mdash; how, when or where something is done. It can also tell us more about an adjective or another adverb.' }),

  makeMCQ({ id:'g6eng-syl-002', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:1,
    question:'Which word is the adverb in this sentence? <i>The children sang loudly.</i>',
    options:['loudly','children','sang','the'], answer:'loudly',
    hint:'Which word tells you HOW they sang?',
    explanation:'<b>Loudly</b> tells us how they sang, so it is the adverb. Many adverbs of manner end in -ly.' }),

  makeMCQ({ id:'g6eng-syl-003', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:2,
    question:'Which word is the adverb in this sentence? <i>She finished her work quickly.</i>',
    options:['quickly','finished','work','her'], answer:'quickly',
    hint:'Find the word that describes the way the work was finished.',
    explanation:'<b>Quickly</b> describes the way she finished, so it is the adverb. The verb here is "finished".' }),

  makeMCQ({ id:'g6eng-syl-004', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:2,
    question:'Make an adverb from the adjective <b>careful</b>.',
    options:['carefully','carefulness','carefuler','careful'], answer:'carefully',
    hint:'Most adverbs of manner are made by adding two letters.',
    explanation:'Adding <b>-ly</b> to the adjective "careful" gives the adverb <b>carefully</b>. "Carefulness" is a noun, not an adverb.' }),

  // ── Adverbs of degree ───────────────────────────────────────────────────
  makeMCQ({ id:'g6eng-syl-005', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:2,
    question:'An <b>adverb of degree</b> tells us what?',
    options:['How much or how strongly','Where something happened','When something happened','Who did the action'], answer:'How much or how strongly',
    hint:'Degree is about strength, not about time or place.',
    explanation:'An <b>adverb of degree</b> tells us how much or how strongly &mdash; very, really, so, quite, too, extremely.' }),

  makeMCQ({ id:'g6eng-syl-006', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:2,
    question:'Which of these is an <b>adverb of degree</b>?',
    options:['very','slowly','yesterday','outside'], answer:'very',
    hint:'Three of them tell you how, when or where instead.',
    explanation:'<b>Very</b> tells us how much, so it is an adverb of degree. "Slowly" is manner, "yesterday" time and "outside" place.' }),

  makeMCQ({ id:'g6eng-syl-007', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:2,
    question:'In <i>The soup was <b>too</b> hot</i>, which word does "too" tell us more about?',
    options:['the adjective "hot"','the noun "soup"','the verb "was"','the article "the"'], answer:'the adjective "hot"',
    hint:'Ask what is being made stronger: the soup, or how hot it is?',
    explanation:'"Too" works on the adjective <b>hot</b>, telling us how hot. An adverb of degree very often sits in front of an adjective.' }),

  makeMCQ({ id:'g6eng-syl-008', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:2,
    question:'In <i>She was <b>really</b> happy</i>, what is "really" doing?',
    options:['Making the adjective stronger','Naming the person','Showing when it happened','Joining two sentences'], answer:'Making the adjective stronger',
    hint:'Compare "happy" with "really happy".',
    explanation:'"Really" <b>makes the adjective "happy" stronger</b>. That is exactly what an adverb of degree is for.' }),

  makeMCQ({ id:'g6eng-syl-009', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:3,
    question:'Which sentence uses an adverb to tell us more about an <b>adjective</b>?',
    options:['The test was very difficult.','She writes very neatly.','He arrived very late.','They walked very far.'], answer:'The test was very difficult.',
    hint:'In three of them "very" works on another adverb instead.',
    explanation:'In the first, "very" works on the adjective <b>difficult</b>. In the others it works on the adverbs neatly, late and far.' }),

  makeMCQ({ id:'g6eng-syl-010', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:2,
    question:'Choose the correct sentence.',
    options:['The bag was extremely heavy.','The bag was extreme heavy.','The bag was heavily extreme.','The bag was heavy extremely.'], answer:'The bag was extremely heavy.',
    hint:'The word in front of the adjective must be an adverb, not an adjective.',
    explanation:'<b>Extremely</b> is the adverb and goes in front of the adjective "heavy". "Extreme" is an adjective and cannot modify another adjective.' }),

  makeMCQ({ id:'g6eng-syl-011', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:2,
    question:'Which word completes the sentence correctly? <i>The film was ___ interesting that nobody moved.</i>',
    options:['so','very','too','quite'], answer:'so',
    hint:'Look at the words that follow: "that nobody moved".',
    explanation:'<b>So</b> is the adverb of degree that pairs with "that" to show a result: <i>so interesting that nobody moved</i>.' }),

  makeMCQ({ id:'g6eng-syl-012', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:3,
    question:'What is the difference between <i>The tea is hot</i> and <i>The tea is too hot</i>?',
    options:['"Too" says it is more hot than we want','"Too" says it is pleasantly hot','"Too" says it has cooled down','There is no difference at all'], answer:'"Too" says it is more hot than we want',
    hint:'Think about whether you could drink each one.',
    explanation:'"Too" means <b>more than is wanted or allowed</b>, so the second tea cannot be drunk yet. "Very hot" would not say that.' }),

  makeMCQ({ id:'g6eng-syl-013', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:2,
    question:'Where does an adverb of degree usually go?',
    options:['Just before the word it changes','At the very end of a sentence','Always after the main verb','At the start of a sentence'], answer:'Just before the word it changes',
    hint:'Think of "very tired", "too small", "really good".',
    explanation:'An adverb of degree normally stands <b>just before the word it changes</b>: very tired, too small, really good.' }),

  makeMCQ({ id:'g6eng-syl-014', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:3,
    question:'In <i>He drove quite carefully</i>, what does "quite" tell us more about?',
    options:['the adverb "carefully"','the noun "he"','the verb "drove"','nothing at all'], answer:'the adverb "carefully"',
    hint:'"Carefully" is itself an adverb. What is "quite" doing to it?',
    explanation:'"Quite" works on the adverb <b>carefully</b>, softening it. An adverb of degree can modify a verb, an adjective or another adverb.' }),

  makeMCQ({ id:'g6eng-syl-015', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:1,
    question:'Which word in this sentence is an adverb of degree? <i>The room was very quiet.</i>',
    options:['very','room','quiet','was'], answer:'very',
    hint:'Which word tells you how quiet?',
    explanation:'<b>Very</b> tells us how quiet the room was, so it is the adverb of degree. "Quiet" is the adjective it changes.' }),

  makeMCQ({ id:'g6eng-syl-016', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:3,
    question:'Which sentence is correct?',
    options:['She sings really well.','She sings real well.','She sings really good.','She sings real good.'], answer:'She sings really well.',
    hint:'You need an adverb of degree and then an adverb of manner.',
    explanation:'<b>Really</b> is the adverb of degree and <b>well</b> is the adverb of manner. "Real" and "good" are adjectives and cannot do that work.' }),

  makeMCQ({ id:'g6eng-syl-017', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:2,
    question:'Which sentence contains an adverb of <b>time</b> rather than of degree?',
    options:['We will leave tomorrow.','The bag is very light.','The water is too cold.','He was really tired.'], answer:'We will leave tomorrow.',
    hint:'Degree tells how much; time tells when.',
    explanation:'<b>Tomorrow</b> tells us when, so it is an adverb of time. The other three all tell us how much.' }),

  makeMCQ({ id:'g6eng-syl-018', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:3,
    question:'Rewrite the idea in one sentence: <i>The path was narrow. It was narrow to a degree that worried us.</i>',
    options:['The path was very narrow.','The path was narrowly.','The path was narrow very.','The path very was narrow.'], answer:'The path was very narrow.',
    hint:'The adverb of degree goes in front of the adjective.',
    explanation:'<b>Very</b> goes before the adjective "narrow" to show the degree, giving <i>The path was very narrow.</i>' }),

  makeMCQ({ id:'g6eng-syl-019', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:4,
    question:'A pupil writes: <i>The parcel was too light to carry.</i> Why does the sentence not make sense?',
    options:['"Too" suggests a problem, and light is easy','"Too" cannot be used with adjectives','"Light" is not an adjective at all','A parcel cannot be described as light'], answer:'"Too" suggests a problem, and light is easy',
    hint:'Think about what "too" always signals about the quality it modifies.',
    explanation:'"Too" means more than is wanted, so it must go with a quality that <b>causes a problem</b> &mdash; too heavy to carry. Being light makes carrying easier, so "too light to carry" contradicts itself.' }),

  makeMCQ({ id:'g6eng-syl-020', chapterId:'g6eng-clauses', subsection:'adverbs', difficulty:4,
    question:'Which pair of sentences shows the clearest difference in meaning?',
    options:['He is quite tall. / He is very tall.','He is very tall. / He is really tall.','He is so tall. / He is very tall.','He is really tall. / He is so tall.'], answer:'He is quite tall. / He is very tall.',
    hint:'One of these adverbs of degree is weaker than the rest.',
    explanation:'<b>Quite</b> is weaker than very, really and so, which are close in strength. Adverbs of degree are not all equally strong.' }),

  // ── Prepositions: for, with, without ───────────────────────────────────
  makeMCQ({ id:'g6eng-syl-021', chapterId:'g6eng-clauses', subsection:'prepositions', difficulty:1,
    question:'Which word completes the sentence? <i>He cut the bread ___ a sharp knife.</i>',
    options:['with','without','for','from'], answer:'with',
    hint:'The knife is the thing he used.',
    explanation:'<b>With</b> shows the thing used to do something: he cut the bread <i>with</i> a knife.' }),

  makeMCQ({ id:'g6eng-syl-022', chapterId:'g6eng-clauses', subsection:'prepositions', difficulty:1,
    question:'Which word completes the sentence? <i>She went out ___ her umbrella and got wet.</i>',
    options:['without','with','for','about'], answer:'without',
    hint:'The ending of the sentence tells you she did not have it.',
    explanation:'<b>Without</b> means "not having", which is why she got wet. It is the opposite of "with".' }),

  makeMCQ({ id:'g6eng-syl-023', chapterId:'g6eng-clauses', subsection:'prepositions', difficulty:1,
    question:'Which word completes the sentence? <i>This present is ___ my grandmother.</i>',
    options:['for','with','without','by'], answer:'for',
    hint:'Who is going to receive it?',
    explanation:'<b>For</b> shows who something is meant for: the present is <i>for</i> my grandmother.' }),

  makeMCQ({ id:'g6eng-syl-024', chapterId:'g6eng-clauses', subsection:'prepositions', difficulty:2,
    question:'What does a <b>preposition</b> do?',
    options:['It shows how words are related','It describes an action being done','It joins two whole sentences','It takes the place of a noun'], answer:'It shows how words are related',
    hint:'Think of in, on, under, with, for.',
    explanation:'A <b>preposition</b> shows how one word is related to another &mdash; in place, in time, or in the way something is done.' }),

  makeMCQ({ id:'g6eng-syl-025', chapterId:'g6eng-clauses', subsection:'prepositions', difficulty:2,
    question:'Which sentence uses <b>with</b> correctly?',
    options:['She opened the tin with a tin opener.','She opened the tin for a tin opener.','She opened the tin without a tin opener quickly easily.','She opened the tin with.'], answer:'She opened the tin with a tin opener.',
    hint:'"With" must be followed by the thing that was used.',
    explanation:'<b>With</b> is followed by the tool used, so "with a tin opener" is right. A preposition always needs a word after it.' }),

  makeMCQ({ id:'g6eng-syl-026', chapterId:'g6eng-clauses', subsection:'prepositions', difficulty:2,
    question:'Choose the best word: <i>We waited ___ an hour for the bus.</i>',
    options:['for','with','without','into'], answer:'for',
    hint:'Here the preposition is showing a length of time.',
    explanation:'<b>For</b> also shows how long something lasts: we waited <i>for</i> an hour.' }),

  makeMCQ({ id:'g6eng-syl-027', chapterId:'g6eng-clauses', subsection:'prepositions', difficulty:3,
    question:'Which sentence means that the boy had no shoes on?',
    options:['He walked home without his shoes.','He walked home with his shoes.','He walked home for his shoes.','He walked home in his shoes.'], answer:'He walked home without his shoes.',
    hint:'One preposition means "not having".',
    explanation:'<b>Without</b> means not having, so only the first sentence says his shoes were off.' }),

  makeMCQ({ id:'g6eng-syl-028', chapterId:'g6eng-clauses', subsection:'prepositions', difficulty:3,
    question:'Which word completes the sentence? <i>Tea ___ sugar is too bitter for him.</i>',
    options:['without','with','for','among'], answer:'without',
    hint:'Decide whether the sugar is there or missing, then choose.',
    explanation:'If the tea is bitter the sugar is missing, so <b>without</b> is the word. Choosing a preposition often depends on the rest of the sentence.' }),

  makeMCQ({ id:'g6eng-syl-029', chapterId:'g6eng-clauses', subsection:'prepositions', difficulty:3,
    question:'In <i>She bought a card for her friend with her own money</i>, what do the two prepositions show?',
    options:['Who it was for, and what she used','What she used, and who it was for','Where she was, and when she went','Why she went, and how she felt'], answer:'Who it was for, and what she used',
    hint:'Take them in the order they appear in the sentence.',
    explanation:'"For her friend" shows <b>who it was for</b>; "with her own money" shows <b>what she used</b>. One sentence can carry several prepositions, each doing its own job.' }),

  makeMCQ({ id:'g6eng-syl-030', chapterId:'g6eng-clauses', subsection:'prepositions', difficulty:4,
    question:'A pupil writes: <i>I cannot finish my homework without help, so please help me with it.</i> Why are two different prepositions needed?',
    options:['One shows what is missing, the other what is used','Both mean the same thing anyway','The first is wrong and should be "with"','The second is wrong and should be "for"'], answer:'One shows what is missing, the other what is used',
    hint:'Say what each preposition is pointing at.',
    explanation:'"Without help" says <b>what is missing</b>; "with it" says <b>what the help is for</b>. The sentence needs both because they do different jobs.' }),

  // ── Phrasal verbs ───────────────────────────────────────────────────────
  makeMCQ({ id:'g6eng-syl-031', chapterId:'g6eng-verbs', subsection:'phrasal_verbs', difficulty:2,
    question:'What is a <b>phrasal verb</b>?',
    options:['A verb joined to a small word','A verb with no subject at all','A verb written in the past tense','A verb that names a person'], answer:'A verb joined to a small word',
    hint:'Think of "look after", "give up", "turn on".',
    explanation:'A <b>phrasal verb</b> is a verb joined to a small word such as up, off, after or on, and the pair together has its own meaning.' }),

  makeMCQ({ id:'g6eng-syl-032', chapterId:'g6eng-verbs', subsection:'phrasal_verbs', difficulty:1,
    question:'What does the phrasal verb <b>look after</b> mean?',
    options:['To take care of','To search for','To stare at','To come later'], answer:'To take care of',
    hint:'It is what an older sister does for a baby.',
    explanation:'<b>Look after</b> means to take care of someone or something &mdash; nothing to do with looking behind you.' }),

  makeMCQ({ id:'g6eng-syl-033', chapterId:'g6eng-verbs', subsection:'phrasal_verbs', difficulty:1,
    question:'What does the phrasal verb <b>give up</b> mean?',
    options:['To stop trying','To hand something over','To lift it higher','To share it out'], answer:'To stop trying',
    hint:'It is what you must not do before an exam.',
    explanation:'<b>Give up</b> means to stop trying. The two words together mean something the word "give" alone does not.' }),

  makeMCQ({ id:'g6eng-syl-034', chapterId:'g6eng-verbs', subsection:'phrasal_verbs', difficulty:2,
    question:'Which phrasal verb completes the sentence? <i>Please ___ the light, the room is dark.</i>',
    options:['turn on','turn off','turn up','turn into'], answer:'turn on',
    hint:'The room is dark, so the light must be started.',
    explanation:'<b>Turn on</b> means to start a machine or a light. "Turn off" would do the opposite.' }),

  makeMCQ({ id:'g6eng-syl-035', chapterId:'g6eng-verbs', subsection:'phrasal_verbs', difficulty:2,
    question:'What does the phrasal verb <b>look for</b> mean?',
    options:['To search for','To take care of','To look forward','To glance quickly'], answer:'To search for',
    hint:'It is what you do when your pencil is missing.',
    explanation:'<b>Look for</b> means to search. Note how "look after" and "look for" mean quite different things.' }),

  makeMCQ({ id:'g6eng-syl-036', chapterId:'g6eng-verbs', subsection:'phrasal_verbs', difficulty:2,
    question:'Which phrasal verb completes the sentence? <i>The match was ___ because of the rain.</i>',
    options:['called off','called up','called in','called out'], answer:'called off',
    hint:'The rain meant the match did not happen.',
    explanation:'<b>Called off</b> means cancelled. The small word decides the meaning, so the four choices are not interchangeable.' }),

  makeMCQ({ id:'g6eng-syl-037', chapterId:'g6eng-verbs', subsection:'phrasal_verbs', difficulty:2,
    question:'What does <b>put off</b> mean in <i>They put off the meeting until Monday</i>?',
    options:['Delayed it','Cancelled it','Shortened it','Enjoyed it'], answer:'Delayed it',
    hint:'The meeting will still happen, but later.',
    explanation:'<b>Put off</b> means to delay to a later time. The meeting is postponed, not cancelled.' }),

  makeMCQ({ id:'g6eng-syl-038', chapterId:'g6eng-verbs', subsection:'phrasal_verbs', difficulty:3,
    question:'What does <b>run out of</b> mean in <i>We have run out of sugar</i>?',
    options:['We have none left','We have spilt it','We are running with it','We have bought more'], answer:'We have none left',
    hint:'Nothing here is actually running.',
    explanation:'<b>Run out of</b> means to have none left. A phrasal verb often has a meaning you could never guess from its separate words.' }),

  makeMCQ({ id:'g6eng-syl-039', chapterId:'g6eng-verbs', subsection:'phrasal_verbs', difficulty:3,
    question:'Which sentence uses the phrasal verb <b>take off</b> in the sense of leaving the ground?',
    options:['The plane took off on time.','He took off his shoes.','She took off the price label.','They took off the lid.'], answer:'The plane took off on time.',
    hint:'One phrasal verb can carry more than one meaning.',
    explanation:'Only the plane <b>leaves the ground</b>; in the other three "take off" means to remove something. The rest of the sentence tells you which meaning is meant.' }),

  makeMCQ({ id:'g6eng-syl-040', chapterId:'g6eng-verbs', subsection:'phrasal_verbs', difficulty:3,
    question:'Which phrasal verb completes the sentence? <i>My grandmother ___ five children on her own.</i>',
    options:['brought up','brought in','brought back','brought down'], answer:'brought up',
    hint:'It means she raised them from childhood.',
    explanation:'<b>Bring up</b> means to raise a child. Again the small word carries the meaning.' }),

  makeMCQ({ id:'g6eng-syl-041', chapterId:'g6eng-verbs', subsection:'phrasal_verbs', difficulty:4,
    question:'Why can a phrasal verb be hard to understand from its separate words?',
    options:['The pair together has a new meaning','The verb is always irregular','The small word is always wrong','The pair is never used in writing'], answer:'The pair together has a new meaning',
    hint:'Compare "give" and "up" with what "give up" actually means.',
    explanation:'The two words together take on a <b>new meaning of their own</b>: "give up" has nothing to do with giving, and "run out of" has nothing to do with running.' }),

  makeMCQ({ id:'g6eng-syl-042', chapterId:'g6eng-verbs', subsection:'phrasal_verbs', difficulty:4,
    question:'A pupil reads <i>The bus broke down on the way to school</i> and thinks something was smashed. What has gone wrong?',
    options:['"Broke down" means it stopped working','"Broke down" means it crashed','"Broke down" means it was late','"Broke down" means it was full'], answer:'"Broke down" means it stopped working',
    hint:'Take the two words together, not separately.',
    explanation:'<b>Break down</b> means to stop working. Reading the two words separately is exactly the mistake a phrasal verb invites.' }),

  // ── Forming nouns and adjectives ───────────────────────────────────────
  makeMCQ({ id:'g6eng-syl-043', chapterId:'g6eng-vocabulary', subsection:'prefix_suffix', difficulty:2,
    question:'Form a <b>noun</b> from the adjective <b>happy</b>.',
    options:['happiness','happily','happier','happiest'], answer:'happiness',
    hint:'The ending -ness turns an adjective into a noun.',
    explanation:'Happy + -ness gives the noun <b>happiness</b>. "Happily" is an adverb and "happier" an adjective.' }),

  makeMCQ({ id:'g6eng-syl-044', chapterId:'g6eng-vocabulary', subsection:'prefix_suffix', difficulty:2,
    question:'Form a <b>noun</b> from the adjective <b>kind</b>.',
    options:['kindness','kindly','kinder','kindest'], answer:'kindness',
    hint:'Use the same ending that turns "dark" into "darkness".',
    explanation:'Kind + -ness gives the noun <b>kindness</b>, an abstract noun naming a quality.' }),

  makeMCQ({ id:'g6eng-syl-045', chapterId:'g6eng-vocabulary', subsection:'prefix_suffix', difficulty:2,
    question:'Form a <b>noun</b> from the verb <b>pollute</b>.',
    options:['pollution','polluted','polluting','pollutant'], answer:'pollution',
    hint:'The ending -tion turns many verbs into nouns.',
    explanation:'Pollute + -tion gives the noun <b>pollution</b>. Many Grade 6 abstract nouns are built this way.' }),

  makeMCQ({ id:'g6eng-syl-046', chapterId:'g6eng-vocabulary', subsection:'prefix_suffix', difficulty:3,
    question:'Form a <b>noun</b> from the verb <b>decide</b>.',
    options:['decision','decided','deciding','decisive'], answer:'decision',
    hint:'The word changes its ending, not only its last letters.',
    explanation:'Decide becomes the noun <b>decision</b>. "Decisive" is an adjective made from the same root.' }),

  makeMCQ({ id:'g6eng-syl-047', chapterId:'g6eng-vocabulary', subsection:'prefix_suffix', difficulty:2,
    question:'Form an <b>adjective</b> from the noun <b>wood</b>.',
    options:['wooden','woodenly','woodland','woodcutter'], answer:'wooden',
    hint:'The ending -en makes an adjective meaning "made of".',
    explanation:'Wood + -en gives the adjective <b>wooden</b>, meaning made of wood.' }),

  makeMCQ({ id:'g6eng-syl-048', chapterId:'g6eng-vocabulary', subsection:'prefix_suffix', difficulty:2,
    question:'Form an <b>adjective</b> from the noun <b>metal</b>.',
    options:['metallic','metally','metalled','metalness'], answer:'metallic',
    hint:'The ending -ic makes an adjective from several nouns.',
    explanation:'Metal + -lic gives the adjective <b>metallic</b>, used of a metal sound, taste or shine.' }),

  makeMCQ({ id:'g6eng-syl-049', chapterId:'g6eng-vocabulary', subsection:'prefix_suffix', difficulty:2,
    question:'Form an <b>adjective</b> from the verb <b>shine</b>.',
    options:['shiny','shining','shone','shineful'], answer:'shiny',
    hint:'Drop the final e and add a single letter.',
    explanation:'Shine becomes the adjective <b>shiny</b>, as in a shiny coin.' }),

  makeMCQ({ id:'g6eng-syl-050', chapterId:'g6eng-vocabulary', subsection:'prefix_suffix', difficulty:3,
    question:'Which word in this list is a <b>noun</b> formed from an adjective?',
    options:['friendship','friendly','friendlier','befriend'], answer:'friendship',
    hint:'Ask which one names a thing rather than describing one.',
    explanation:'<b>Friendship</b> names a thing, so it is the noun. "Friendly" and "friendlier" describe, and "befriend" is a verb.' }),

  // ── Words that take no article ─────────────────────────────────────────
  makeMCQ({ id:'g6eng-syl-051', chapterId:'g6eng-nouns', subsection:'determiners', difficulty:2,
    question:'Which sentence is correct?',
    options:['I go to school every morning.','I go to the school every morning.','I go to a school every morning.','I go to school the every morning.'], answer:'I go to school every morning.',
    hint:'Some everyday places take no article at all when we mean the activity.',
    explanation:'"Go to <b>school</b>" takes <b>no article</b> when it means going there to learn. "The school" would mean the building itself.' }),

  makeMCQ({ id:'g6eng-syl-052', chapterId:'g6eng-nouns', subsection:'determiners', difficulty:2,
    question:'Which sentence needs <b>no article</b>?',
    options:['We have ___ breakfast at seven.','She opened ___ window.','He read ___ book I lent him.','They saw ___ elephant.'], answer:'We have ___ breakfast at seven.',
    hint:'Meals are one of the groups that take no article.',
    explanation:'Meals take no article: <i>we have breakfast</i>. The other three all need "the" or "an".' }),

  makeMCQ({ id:'g6eng-syl-053', chapterId:'g6eng-nouns', subsection:'determiners', difficulty:3,
    question:'Which sentence is written correctly?',
    options:['He went home after work.','He went to home after work.','He went the home after work.','He went a home after work.'], answer:'He went home after work.',
    hint:'"Home" behaves differently from most place words.',
    explanation:'"Go <b>home</b>" takes neither an article nor "to". Words like home, school and bed follow their own rule.' }),

  makeMCQ({ id:'g6eng-syl-054', chapterId:'g6eng-nouns', subsection:'determiners', difficulty:3,
    question:'Why does <i>I visited Mauritius last year</i> need no article before "Mauritius"?',
    options:['It is the name of one place','It begins with a capital letter','It is a long word','It comes after a verb'], answer:'It is the name of one place',
    hint:'Compare it with "I visited the island".',
    explanation:'A proper noun <b>names one particular place</b>, so no article is needed. "The island" is a common noun and does need one.' }),

  // ── Conjunctions of reason, place and duration ────────────────────────
  makeMCQ({ id:'g6eng-syl-055', chapterId:'g6eng-clauses', subsection:'conjunctions', difficulty:1,
    question:'Which conjunction gives the <b>reason</b>? <i>We stayed indoors ___ it was raining.</i>',
    options:['because','although','unless','whereas'], answer:'because',
    hint:'The rain is why they stayed indoors.',
    explanation:'<b>Because</b> gives the reason. It is the commonest conjunction of reason in English.' }),

  makeMCQ({ id:'g6eng-syl-056', chapterId:'g6eng-clauses', subsection:'conjunctions', difficulty:2,
    question:'Which conjunction of <b>reason</b> completes the sentence? <i>___ it was late, we walked home quickly.</i>',
    options:['As','But','Or','While'], answer:'As',
    hint:'It can replace "because" at the start of a sentence.',
    explanation:'<b>As</b> gives the reason, just as "because" does, and is often used at the start of a sentence.' }),

  makeMCQ({ id:'g6eng-syl-057', chapterId:'g6eng-clauses', subsection:'conjunctions', difficulty:3,
    question:'Which sentence gives a reason using a conjunction?',
    options:['She was tired because she had walked far.','She was tired but she kept walking.','She was tired and she sat down.','She was tired or she was hungry.'], answer:'She was tired because she had walked far.',
    hint:'Only one of the four explains WHY she was tired.',
    explanation:'Only <b>because</b> explains why. "But", "and" and "or" join the two parts without giving a reason.' }),

  makeMCQ({ id:'g6eng-syl-058', chapterId:'g6eng-clauses', subsection:'conjunctions', difficulty:2,
    question:'Which conjunction of <b>place</b> completes the sentence? <i>Put the box ___ you found it.</i>',
    options:['where','when','while','why'], answer:'where',
    hint:'The missing word points to a position, not a time.',
    explanation:'<b>Where</b> is the conjunction of place. It tells us the position at which something should happen.' }),

  makeMCQ({ id:'g6eng-syl-059', chapterId:'g6eng-clauses', subsection:'conjunctions', difficulty:3,
    question:'Which sentence uses <b>where</b> as a conjunction of place?',
    options:['We camped where the river bends.','Where are you going now?','Where is my school bag?','Where did she put it?'], answer:'We camped where the river bends.',
    hint:'In three of them the word is asking a question instead.',
    explanation:'In the first, <b>where</b> joins two parts and tells us the place. In the other three it is a question word.' }),

  makeMCQ({ id:'g6eng-syl-060', chapterId:'g6eng-clauses', subsection:'conjunctions', difficulty:2,
    question:'Which conjunction of <b>duration</b> completes the sentence? <i>She read a book ___ she waited for the bus.</i>',
    options:['while','where','because','although'], answer:'while',
    hint:'The two things were happening at the same time.',
    explanation:'<b>While</b> shows that two actions went on at the same time. It is the conjunction of duration.' }),

  makeMCQ({ id:'g6eng-syl-061', chapterId:'g6eng-clauses', subsection:'conjunctions', difficulty:3,
    question:'What does the conjunction <b>while</b> tell us in <i>He cooked while she cleaned</i>?',
    options:['Both things happened together','One thing caused the other','One thing happened before','The two things are opposites'], answer:'Both things happened together',
    hint:'Ask whether the two actions overlap in time.',
    explanation:'<b>While</b> shows that the two actions were going on <b>at the same time</b>, one alongside the other.' }),

  makeMCQ({ id:'g6eng-syl-062', chapterId:'g6eng-clauses', subsection:'conjunctions', difficulty:4,
    question:'Which conjunction best joins these? <i>The lights went out. The generator had not been fixed.</i>',
    options:['because','while','where','so that'], answer:'because',
    hint:'Decide first whether the link is reason, place, time or purpose.',
    explanation:'The second sentence explains <b>why</b> the lights went out, so a conjunction of reason is needed: <i>The lights went out because the generator had not been fixed.</i>' })

);
