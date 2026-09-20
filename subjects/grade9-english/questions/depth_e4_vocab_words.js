'use strict';
(function () {

  // Level 4 — "Extended Analysis" — for four chapters that had none, or almost
  // none, of it. Every item below asks the pupil to REASON in a context, not to
  // recognise a definition: the sentence decides which of several real words
  // fits, or the syntactic slot decides which form of a root belongs in it.

  STATIC_QUESTIONS.push(

    // ══ g9eng-vocabulary · collocation (001–007) ══════════════════════════

    makeMCQ({ id:'g9eng-d4-001', chapterId:'g9eng-vocabulary', subsection:'collocation', difficulty:4,
      question:'All four verbs below are used about punishments. Which one is correct here? &ldquo;The headmaster ___ a heavy fine on any pupil caught littering.&rdquo;',
      options:['imposed','inflicted','enforced','charged'], answer:'imposed',
      hint:'Ask which verb takes a fine as its object and a person as the thing it lands <i>on</i>.',
      explanation:'A fine is <b>imposed on</b> somebody. &ldquo;Inflicted&rdquo; takes an injury or a defeat, not a fine; you <b>enforce</b> a rule rather than a fine; and you <b>charge</b> a fee, which is a price, not a penalty. All four are real words about penalties &mdash; only the collocation separates them.' }),

    makeMCQ({ id:'g9eng-d4-002', chapterId:'g9eng-vocabulary', subsection:'collocation', difficulty:4,
      question:'Complete in standard English: &ldquo;After eleven hours of talks the two sides finally ___ a compromise.&rdquo;',
      options:['reached','arrived','obtained','gathered'], answer:'reached',
      hint:'One of these verbs cannot take an object at all without a small word in front of it.',
      explanation:'You <b>reach</b> a compromise, an agreement or a decision. &ldquo;Arrived&rdquo; is the tempting one, because <i>arrive at a compromise</i> is also good English &mdash; but it needs the preposition <b>at</b>, and this sentence has none. &ldquo;Obtained&rdquo; and &ldquo;gathered&rdquo; do not pair with compromise at all.' }),

    makeMCQ({ id:'g9eng-d4-003', chapterId:'g9eng-vocabulary', subsection:'collocation', difficulty:4,
      question:'A formal report to a Minister reads: &ldquo;The committee ___ its findings on Tuesday.&rdquo; Which verb suits the register of a formal report?',
      options:['submitted','handed in','gave over','passed on'], answer:'submitted',
      hint:'Three of these are everyday phrasal verbs. Weigh the tone, not the meaning.',
      explanation:'All four could describe the same act, so meaning alone cannot decide it &mdash; <b>register</b> does. <b>Submitted</b> is the formal verb used of reports, applications and evidence. The other three are ordinary spoken phrasal verbs and would sound out of place in an official document.' }),

    makeMCQ({ id:'g9eng-d4-004', chapterId:'g9eng-vocabulary', subsection:'collocation', difficulty:4,
      question:'Which verb makes the sentence mean that the rule was never actually applied? &ldquo;For three years the council ___ the parking rule.&rdquo;',
      options:['overlooked','enforced','tightened','published'], answer:'overlooked',
      hint:'Every option is a real thing a council does to a rule. Match the meaning the question asks for.',
      explanation:'To <b>overlook</b> a rule is to let it pass without acting on it, which is exactly &ldquo;never applied&rdquo;. <b>Enforced</b> is its opposite; <b>tightened</b> means made stricter; <b>published</b> only means made known. Here the stem tells you the meaning and you must find the verb that carries it.' }),

    makeMCQ({ id:'g9eng-d4-005', chapterId:'g9eng-vocabulary', subsection:'collocation', difficulty:4,
      question:'Sanjay disagreed with the plan but said nothing at the meeting. Which phrasal verb describes what he did with his objection? He ___ his objection.',
      options:['held back','held up','held on','held out'],
      answer:'held back',
      hint:'The verb is the same in all four; only the particle changes the meaning.',
      explanation:'To <b>hold back</b> something is to keep it in, unsaid or unused &mdash; which is what Sanjay did. <b>Held up</b> means delayed or robbed, <b>held on</b> means waited or gripped, and <b>held out</b> means offered or resisted. In a phrasal verb the particle carries the meaning, so read it as carefully as the verb.' }),

    makeText({ id:'g9eng-d4-006', chapterId:'g9eng-vocabulary', subsection:'collocation', difficulty:4,
      question:'Write ONE word in the gap so that the sentence means the doctor made the injury sound less alarming than it was: &ldquo;The doctor ___ down the seriousness of the injury when she spoke to the parents.&rdquo;',
      answer:'played', alsoAccept:['play','plays','playing'],
      hint:'The particle <b>down</b> is already given; you need the verb that goes in front of it.',
      explanation:'To <b>play down</b> something is to make it seem less serious or less important than it is. &ldquo;Talked down&rdquo; and &ldquo;turned down&rdquo; are real phrasal verbs, but they mean speaking condescendingly and refusing &mdash; neither matches the meaning the question states. The particle alone does not fix the meaning; the verb in front of it does.' }),

    makeTF({ id:'g9eng-d4-007', chapterId:'g9eng-vocabulary', subsection:'collocation', difficulty:4,
      question:'True or False: &ldquo;The government took strong measures&rdquo; and &ldquo;The government made strong measures&rdquo; are both acceptable English.',
      answer:false,
      hint:'Test each phrase against how you have heard measures spoken about, not against whether the sentence makes sense.',
      explanation:'False. English fixes this pairing as <b>take measures</b> (or <i>take steps</i>, <i>take action</i>). &ldquo;Make measures&rdquo; is perfectly logical and completely wrong, which is what makes collocation hard: the rule is usage, not reasoning. Both sentences are grammatical; only one is English.' }),

    // ══ g9eng-vocabulary · word_choice (008–014) ══════════════════════════

    makeMCQ({ id:'g9eng-d4-008', chapterId:'g9eng-vocabulary', subsection:'word_choice', difficulty:4,
      question:'Which word tells the reader that the witness was <b>unwilling</b> to answer, and not merely slow or uncertain? &ldquo;The witness gave a ___ reply to every question.&rdquo;',
      options:['grudging','delayed','hesitant','guarded'], answer:'grudging',
      hint:'Three of these describe how the answer came out; only one describes how the witness felt about giving it.',
      explanation:'A <b>grudging</b> reply is one given unwillingly, as though it were being taken from the speaker. <b>Hesitant</b> is the tempting choice, but it says the witness was uncertain, not unwilling; <b>delayed</b> only says the answer was late; <b>guarded</b> says it was cautious. The shade of meaning is the whole question.' }),

    makeMCQ({ id:'g9eng-d4-009', chapterId:'g9eng-vocabulary', subsection:'word_choice', difficulty:4,
      question:'All four words below are about smell. Which one fits? &ldquo;The ___ of hot bread filled the whole lane at five in the morning.&rdquo;',
      options:['aroma','stench','fumes','whiff'], answer:'aroma',
      hint:'Two things decide it: whether the smell is pleasant, and whether it is big enough to fill a lane.',
      explanation:'An <b>aroma</b> is a pleasant, carrying smell, usually of food or coffee. A <b>stench</b> is foul, so it contradicts hot bread; <b>fumes</b> are gases from burning or chemicals; and a <b>whiff</b> is faint and brief, so it cannot &ldquo;fill the whole lane&rdquo;. The verb in the sentence rules out the last one on its own.' }),

    makeMCQ({ id:'g9eng-d4-010', chapterId:'g9eng-vocabulary', subsection:'word_choice', difficulty:4,
      question:'A letter to a newspaper editor. Which word keeps the tone formal <b>and</b> says the writer is troubled rather than furious? &ldquo;I am writing to express my ___ at the closure of the village dispensary.&rdquo;',
      options:['dismay','fury','annoyance','bitterness'], answer:'dismay',
      hint:'Two conditions must both be satisfied. Test each word against each one.',
      explanation:'<b>Dismay</b> is formal, and it means distress and disappointment rather than rage. <b>Fury</b> fails the second condition; <b>annoyance</b> is too mild and too everyday for the phrase &ldquo;I am writing to express&rdquo;; <b>bitterness</b> suggests a lasting resentment, which is more than the writer claims. When a question sets two conditions, a word must pass both.' }),

    makeText({ id:'g9eng-d4-011', chapterId:'g9eng-vocabulary', subsection:'word_choice', difficulty:4,
      question:'One word in this sentence is the wrong one for the meaning. Write the ONE word that should replace <b>uninterested</b>: &ldquo;Any judge must be uninterested in the outcome of a case, caring only that the law is applied.&rdquo;',
      answer:'disinterested', alsoAccept:['disinterested.'],
      hint:'The needed word is built from the same root but a different prefix, and it means having nothing to gain.',
      explanation:'<b>Disinterested</b> means impartial &mdash; having no personal stake in the result. <b>Uninterested</b> means bored, which would make the sentence say that a judge should not care about the case at all, the opposite of what follows the comma. The two words are constantly confused, and only the rest of the sentence tells you which is meant.' }),

    makeMCQ({ id:'g9eng-d4-012', chapterId:'g9eng-vocabulary', subsection:'word_choice', difficulty:4,
      question:'Which word says the pamphlet was written to <b>persuade</b>, and not merely to inform? &ldquo;The pamphlet gave a ___ account of the flooding.&rdquo;',
      options:['one-sided','detailed','factual','thorough'], answer:'one-sided',
      hint:'A long account and a fair account are not the same thing. Which word comments on fairness?',
      explanation:'A <b>one-sided</b> account gives only the evidence that suits its case, which is how writing persuades. <b>Detailed</b> and <b>thorough</b> describe how much is said, not how fairly; <b>factual</b> claims the opposite of bias. A more formal word for the same idea is <i>partisan</i>.' }),

    makeMCQ({ id:'g9eng-d4-013', chapterId:'g9eng-vocabulary', subsection:'word_choice', difficulty:4,
      question:'<b>Continual</b> and <b>continuous</b> are both real words with different meanings. Which fits here? &ldquo;The ___ hum of the freezer kept her awake all night.&rdquo;',
      options:['continuous','continual','periodic','repeated'], answer:'continuous',
      hint:'Decide first whether the hum stopped and started, then choose.',
      explanation:'<b>Continuous</b> means unbroken, with no gaps &mdash; and a hum that kept her awake <i>all night</i> did not stop. <b>Continual</b> means happening again and again with breaks between, which is also what <b>periodic</b> and <b>repeated</b> describe. This is the item where two near-twins are the point: the words are not interchangeable, and the phrase &ldquo;all night&rdquo; is what separates them.' }),

    makeTF({ id:'g9eng-d4-014', chapterId:'g9eng-vocabulary', subsection:'word_choice', difficulty:4,
      question:'True or False: in &ldquo;The new rules had an <b>adverse</b> effect on small planters&rdquo;, the word <b>adverse</b> could be replaced by <b>averse</b> with no change of meaning.',
      answer:false,
      hint:'One of the two words describes a thing that harms; the other describes a person who dislikes something.',
      explanation:'False. <b>Adverse</b> means harmful or unfavourable, and it describes conditions, effects and weather. <b>Averse</b> means strongly disliking, and it describes people, almost always followed by <b>to</b>: <i>she was averse to change</i>. The sentence is about an effect, so only <b>adverse</b> works.' }),

    // ══ g9eng-vocabulary · vocabulary_in_context (015–020) ════════════════

    makeMCQ({ id:'g9eng-d4-015', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:4,
      question:'Read: &ldquo;The last part of the path was <b>precipitous</b>; we went up on hands and knees and none of us looked back down.&rdquo; What does <b>precipitous</b> mean here?',
      options:['very steep','very narrow','very long','very slippery'], answer:'very steep',
      hint:'Two details point the same way: how they climbed, and what they avoided doing.',
      explanation:'Hands and knees suggest a slope too steep to walk up, and refusing to look <i>down</i> means there is a drop below them &mdash; so <b>precipitous</b> means very steep. <b>Very slippery</b> is the tempting answer, because crawling would also suit it, but nothing in the passage mentions wet or loose ground, and a slippery path gives no reason not to look down.' }),

    makeMCQ({ id:'g9eng-d4-016', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:4,
      question:'Read: &ldquo;Rain had been falling for a week, and by Friday the river was in <b>spate</b>.&rdquo; What does <b>in spate</b> mean here?',
      options:['in full flood','running very low','freezing slowly','turning brown'],
      answer:'in full flood',
      hint:'Work from the cause the sentence gives you, and ask what a week of rain does to a river.',
      explanation:'A river <b>in spate</b> is swollen and running fast after heavy rain. The sentence gives the cause before it gives the word, which is the standard way a text lets you work out an unfamiliar term. <b>Turning brown</b> is a real effect of a flood, but it describes the colour, not the state the word names.' }),

    makeText({ id:'g9eng-d4-017', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:4,
      question:'Read: &ldquo;He was a <b>taciturn</b> man; in nineteen years at the bakery he had said perhaps a hundred words to anyone.&rdquo; Choose the word from this list that means the same as <b>taciturn</b> here, and write it: talkative, silent, cheerful, restless.',
      answer:'silent', alsoAccept:['silent.'],
      hint:'The second half of the sentence measures the man in words. Let that measurement decide.',
      explanation:'&ldquo;Perhaps a hundred words in nineteen years&rdquo; is the clue: a <b>taciturn</b> person says very little. <b>Talkative</b> is its opposite and is the word a pupil reaches for who has not read past the semicolon. Nothing in the sentence tells you whether the man was cheerful or restless, so neither can be supported from the text.' }),

    makeMCQ({ id:'g9eng-d4-018', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:4,
      question:'Read: &ldquo;The minister&rsquo;s reply was <b>evasive</b>: he answered a question that nobody had asked.&rdquo; Which meaning does the sentence support?',
      options:['avoiding the point','refusing to speak','losing his temper','changing his mind'],
      answer:'avoiding the point',
      hint:'The colon tells you that what follows is an example of the word. Read the example first.',
      explanation:'He did reply, so he was not refusing to speak &mdash; but he replied to something else, which is <b>avoiding the point</b>. The colon is the writer offering you a definition by example, and a pupil who reads it gets the word without needing to know it beforehand.' }),

    makeMCQ({ id:'g9eng-d4-019', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:4,
      question:'Read: &ldquo;Fishing on this stretch is now <b>proscribed</b>, and the fines are heavy.&rdquo; A reader who confuses this word with <b>prescribed</b> gets the meaning exactly backwards. What does <b>proscribed</b> mean?',
      options:['forbidden','recommended','regulated','encouraged'], answer:'forbidden',
      hint:'The second half of the sentence says what happens to people who do it anyway.',
      explanation:'<b>Proscribed</b> means forbidden or banned; the heavy fines confirm it. <b>Prescribed</b>, which differs by two letters, means laid down or ordered to be done, so a reader who mistakes one for the other reverses the sentence. When two words look alike, let the rest of the sentence decide, as the fines do here.' }),

    makeTF({ id:'g9eng-d4-020', chapterId:'g9eng-vocabulary', subsection:'vocabulary_in_context', difficulty:4,
      question:'Read: &ldquo;The housing scheme was a <b>fiasco</b>: three years of work, and not one family was ever housed.&rdquo; True or False: here <b>fiasco</b> means a complete failure.',
      answer:true,
      hint:'Weigh what comes after the colon before you decide.',
      explanation:'True. The colon introduces the evidence &mdash; three years spent and nothing achieved &mdash; so <b>fiasco</b> means a complete and rather humiliating failure. Note that the word also carries a hint of embarrassment, which is why it is used of schemes and ceremonies rather than of, say, a failed harvest.' }),

    // ══ g9eng-word-formation · noun_formation (021–024) ═══════════════════

    makeText({ id:'g9eng-d4-021', chapterId:'g9eng-word-formation', subsection:'noun_formation', difficulty:4,
      question:'Write ONE word, formed from <b>maintain</b>, to fill the gap: &ldquo;Regular ___ of the pump costs far less than one major repair.&rdquo;',
      answer:'maintenance',
      hint:'The adjective <i>regular</i> in front of the gap tells you the part of speech; the spelling of the root changes.',
      explanation:'The noun is <b>maintenance</b>. The slot comes after an adjective and before <i>of</i>, so only a noun can stand there. The spelling is the trap: the <i>ai</i> of <i>maintain</i> becomes <i>e</i>, giving <b>mainten-</b>, and the ending is <b>-ance</b>, not <i>-ence</i>. &ldquo;Maintainance&rdquo; is the commonest misspelling in English.' }),

    makeText({ id:'g9eng-d4-022', chapterId:'g9eng-word-formation', subsection:'noun_formation', difficulty:4,
      question:'Write ONE word, formed from <b>pronounce</b>, to fill the gap: &ldquo;Her ___ of Creole place names was perfect from the first day.&rdquo;',
      answer:'pronunciation',
      hint:'A possessive (<i>Her</i>) in front of the gap demands a noun. Say the noun aloud before you spell it.',
      explanation:'The noun is <b>pronunciation</b>. <i>Her</i> and the singular verb <i>was</i> both mark the slot as a singular noun. The root loses its <b>o</b>: the verb is <i>pro-nounce</i> but the noun is <i>pro-nun-ciation</i>. &ldquo;Pronounciation&rdquo; is not a word, however often it is written.' }),

    makeMCQ({ id:'g9eng-d4-023', chapterId:'g9eng-word-formation', subsection:'noun_formation', difficulty:4,
      question:'Which form of <b>analyse</b> fills the gap? &ldquo;The ___ of the water samples <b>was</b> not complete until March.&rdquo;',
      options:['analysis','analyses','analyst','analytical'], answer:'analysis',
      hint:'The singular verb in bold rules one option out; the meaning of the sentence rules out another.',
      explanation:'<b>Analysis</b> is the singular noun naming the process, and the singular verb <i>was</i> demands it. <b>Analyses</b> is the plural and would need <i>were</i>; <b>analyst</b> is a person, and a person is not &ldquo;of the water samples&rdquo;; <b>analytical</b> is an adjective and cannot follow <i>The</i>. Two separate rules are needed to reach one answer.' }),

    makeText({ id:'g9eng-d4-024', chapterId:'g9eng-word-formation', subsection:'noun_formation', difficulty:4,
      question:'Write ONE word, formed from <b>argue</b>, to fill the gap: &ldquo;Their ___ lasted all the way from Rose Hill to Curepipe.&rdquo;',
      answer:'argument',
      hint:'The suffix is the usual one for turning a verb into the name of an action &mdash; but watch the last letter of the root.',
      explanation:'The noun is <b>argument</b>. The suffix <b>-ment</b> is added, and the silent <b>e</b> of <i>argue</i> is dropped, which is unusual: <i>manage</i> keeps its <b>e</b> in <i>management</i>. <i>Argue</i>, <i>true</i> and <i>due</i> all lose it, so the rule has to be learned word by word.' }),

    // ══ g9eng-word-formation · adjective_formation (025–028) ══════════════

    makeMCQ({ id:'g9eng-d4-025', chapterId:'g9eng-word-formation', subsection:'adjective_formation', difficulty:4,
      question:'Which form of <b>response</b> fills the gap? &ldquo;A ___ government listens before it decides, not afterwards.&rdquo;',
      options:['responsive','responsible','responsibly','responsiveness'], answer:'responsive',
      hint:'The slot sits between <i>A</i> and a noun, so the part of speech is fixed. Then choose by meaning.',
      explanation:'<b>Responsive</b> means quick to react to what people say, which is what the rest of the sentence describes. <b>Responsible</b> is the more familiar adjective and fits the slot grammatically, but it means answerable or trustworthy, not attentive. <b>Responsibly</b> is an adverb and <b>responsiveness</b> a noun, so neither can sit before <i>government</i>.' }),

    makeText({ id:'g9eng-d4-026', chapterId:'g9eng-word-formation', subsection:'adjective_formation', difficulty:4,
      question:'Write ONE word, formed from <b>mischief</b>, to fill the gap: &ldquo;The puppy was ___ but never destructive.&rdquo;',
      answer:'mischievous',
      hint:'The verb <i>was</i> in front of the gap demands an adjective. Count the syllables carefully before writing it.',
      explanation:'The adjective is <b>mischievous</b>, three syllables, stressed on the first: MIS-chiev-ous. The <b>f</b> of <i>mischief</i> becomes <b>v</b> before the ending. The usual mistake is to insert an extra <i>i</i> and write &ldquo;mischievious&rdquo;, which follows the sound of the way many people say it rather than the spelling.' }),

    makeMCQ({ id:'g9eng-d4-027', chapterId:'g9eng-word-formation', subsection:'adjective_formation', difficulty:4,
      question:'Which form of <b>economy</b> fits? &ldquo;Rising fuel prices are an ___ problem, not a political one.&rdquo;',
      options:['economic','economical','economically','economics'], answer:'economic',
      hint:'Two of these are adjectives with different meanings. The contrast at the end of the sentence decides between them.',
      explanation:'<b>Economic</b> means to do with the economy, and the sentence contrasts it with <i>political</i> &mdash; two kinds of problem. <b>Economical</b> is also an adjective but means thrifty or cheap to run, which would make the phrase mean a problem that saves money. <b>Economically</b> is an adverb and <b>economics</b> a noun.' }),

    makeText({ id:'g9eng-d4-028', chapterId:'g9eng-word-formation', subsection:'adjective_formation', difficulty:4,
      question:'Write ONE word, formed from <b>comprehend</b>, so that the sentence means the report covered every aspect of the subject: &ldquo;The committee produced a ___ report on coastal erosion.&rdquo;',
      answer:'comprehensive',
      hint:'Two adjectives can be built from this root. The meaning given in the question chooses between them.',
      explanation:'<b>Comprehensive</b> means complete, covering everything. The other adjective from the same root, <i>comprehensible</i>, means able to be understood &mdash; a real word, a real adjective, and the wrong meaning here. Both fit the slot, so only the meaning stated in the question separates them.' }),

    // ══ g9eng-word-formation · adverb_formation (029–032) ═════════════════

    makeMCQ({ id:'g9eng-d4-029', chapterId:'g9eng-word-formation', subsection:'adverb_formation', difficulty:4,
      question:'Which form of <b>whole</b> fills the gap? &ldquo;The council ___ rejected the developer&rsquo;s revised plan.&rdquo;',
      options:['wholly','wholely','whole','wholesome'], answer:'wholly',
      hint:'The gap sits between the subject and the verb, which fixes the part of speech; then it is a matter of spelling.',
      explanation:'<b>Wholly</b> is the adverb, and it modifies <i>rejected</i>. The silent <b>e</b> of <i>whole</i> is dropped before <b>-ly</b>, which is why &ldquo;wholely&rdquo; is not a word. <b>Whole</b> is the adjective and cannot modify a verb; <b>wholesome</b> means healthy and has nothing to do with the sentence.' }),

    makeText({ id:'g9eng-d4-030', chapterId:'g9eng-word-formation', subsection:'adverb_formation', difficulty:4,
      question:'Write ONE word, formed from <b>truth</b>, to fill the gap so that the sentence says the witness told no lies: &ldquo;The witness answered ___, and the court believed her.&rdquo;',
      answer:'truthfully',
      hint:'Build it in two steps: first the adjective from the root, then the adverb ending.',
      explanation:'The adverb is <b>truthfully</b>, built as <i>truth</i> + <b>-ful</b> + <b>-ly</b>. The near-twin <i>truly</i> is built from <i>true</i> and means genuinely or really, not honestly: &ldquo;she answered truly&rdquo; says that her answer was sincere rather than that it was not a lie. The root given in brackets is what decides it.' }),

    makeMCQ({ id:'g9eng-d4-031', chapterId:'g9eng-word-formation', subsection:'adverb_formation', difficulty:4,
      question:'Which form of <b>hard</b> fits? &ldquo;She had ___ begun to speak when the lights went out.&rdquo;',
      options:['hardly','hard','harder','hardily'], answer:'hardly',
      hint:'This is a form whose meaning is not the meaning of its root. Read what the sentence needs to say.',
      explanation:'<b>Hardly</b> means barely or scarcely &mdash; she had only just started. Adding <b>-ly</b> usually keeps the meaning of the root, but not here: <i>hard</i> as an adverb already means with effort (<i>she worked hard</i>), and <i>hardly</i> has drifted away from it entirely. <b>Hardily</b> is a rare adverb from <i>hardy</i>, meaning robustly.' }),

    makeText({ id:'g9eng-d4-032', chapterId:'g9eng-word-formation', subsection:'adverb_formation', difficulty:4,
      question:'Write ONE word, formed from <b>basic</b>, to fill the gap: &ldquo;The two plans are ___ the same; only the colours on the map differ.&rdquo;',
      answer:'basically',
      hint:'Adjectives ending in <b>-ic</b> take a longer ending than the plain one you might expect.',
      explanation:'The adverb is <b>basically</b>. Adjectives that end in <b>-ic</b> take <b>-ally</b>, not <b>-ly</b>: <i>dramatic</i> becomes <i>dramatically</i>, <i>automatic</i> becomes <i>automatically</i>. &ldquo;Basicly&rdquo; is therefore wrong. The single common exception is <i>public</i>, which gives <i>publicly</i>.' }),

    // ══ g9eng-word-formation · verb_formation (033–036) ═══════════════════

    makeMCQ({ id:'g9eng-d4-033', chapterId:'g9eng-word-formation', subsection:'verb_formation', difficulty:4,
      question:'Which form of <b>deep</b> fills the gap? &ldquo;The harbour authority will ___ the channel before the new ferries arrive.&rdquo;',
      options:['deepen','deeply','depth','deeper'], answer:'deepen',
      hint:'The word <i>will</i> in front of the gap settles the part of speech on its own.',
      explanation:'<b>Will</b> must be followed by a bare verb, so the slot needs a verb: <b>deepen</b>, meaning to make deeper. The suffix <b>-en</b> builds verbs from adjectives of this kind &mdash; <i>widen</i>, <i>soften</i>, <i>flatten</i>. <b>Deeply</b> is an adverb, <b>depth</b> a noun and <b>deeper</b> a comparative adjective, and none of them can follow <i>will</i>.' }),

    makeText({ id:'g9eng-d4-034', chapterId:'g9eng-word-formation', subsection:'verb_formation', difficulty:4,
      question:'Write ONE word, formed from <b>pure</b>, to fill the gap: &ldquo;These tablets ___ river water in about thirty minutes.&rdquo;',
      answer:'purify',
      hint:'The subject is plural and the tense is the present simple, so the verb takes no extra ending.',
      explanation:'The verb is <b>purify</b>, built with the suffix <b>-ify</b>, which turns adjectives and nouns into verbs meaning &ldquo;make into&rdquo; &mdash; <i>simplify</i>, <i>classify</i>, <i>beautify</i>. The plural subject <i>tablets</i> means no <b>-s</b> is added, so &ldquo;purifies&rdquo; would not agree. The noun from the same root is <i>purity</i>.' }),

    makeMCQ({ id:'g9eng-d4-035', chapterId:'g9eng-word-formation', subsection:'verb_formation', difficulty:4,
      question:'Which form of <b>able</b> fills the gap? &ldquo;A small grant ___ the club to repair its roof last year.&rdquo;',
      options:['enabled','disabled','ability','able'], answer:'enabled',
      hint:'Two of these are verbs in the past tense. The meaning of the sentence chooses between them.',
      explanation:'<b>Enabled</b> means made it possible for, and it is followed by an object plus <i>to</i>, exactly as here. <b>Disabled</b> is also a past-tense verb that fits the slot, but it means prevented or put out of action, which reverses the sentence. <b>Ability</b> is a noun and <b>able</b> an adjective; neither can be the main verb.' }),

    makeText({ id:'g9eng-d4-036', chapterId:'g9eng-word-formation', subsection:'verb_formation', difficulty:4,
      question:'Write ONE word, formed from <b>note</b>, to fill the gap: &ldquo;The school will ___ parents as soon as the results arrive.&rdquo;',
      answer:'notify',
      hint:'After <i>will</i> the verb takes no ending, and the root loses its final letter before the suffix.',
      explanation:'The verb is <b>notify</b>, meaning to inform officially. The silent <b>e</b> of <i>note</i> is dropped before <b>-ify</b>. Pupils often write &ldquo;noticify&rdquo; or simply reuse <i>note</i>, but <i>note</i> alone would mean to write something down, not to tell somebody.' }),

    // ══ g9eng-word-formation · root_and_affix (037–040) ═══════════════════

    makeMCQ({ id:'g9eng-d4-037', chapterId:'g9eng-word-formation', subsection:'root_and_affix', difficulty:4,
      question:'Which pair of words BOTH take the prefix <b>in-</b> to make them negative?',
      options:['accurate and convenient','legal and responsible','mature and comfortable','honest and appropriate'],
      answer:'accurate and convenient',
      hint:'A pair only works if both of its words take the same prefix. Test them one at a time.',
      explanation:'<b>Inaccurate</b> and <b>inconvenient</b> both take <b>in-</b>. Each other pair contains at least one word that does not: <i>legal</i> takes <b>il-</b> and <i>responsible</i> takes <b>ir-</b>; <i>mature</i> takes <b>im-</b> and <i>comfortable</i> takes <b>un-</b>; <i>honest</i> takes <b>dis-</b>, though <i>appropriate</i> really does take <b>in-</b>. The prefix is chosen by the sound the root begins with, not by its meaning.' }),

    makeText({ id:'g9eng-d4-038', chapterId:'g9eng-word-formation', subsection:'root_and_affix', difficulty:4,
      question:'Write ONE word: the opposite of <b>obedient</b>, made by adding a prefix to it.',
      answer:'disobedient',
      hint:'Four prefixes mean &ldquo;not&rdquo;. Say each one in front of the root and keep the one you have heard before.',
      explanation:'The word is <b>disobedient</b>. The root begins with a vowel, which often invites <b>in-</b>, but <i>obedient</i> is one of the group that takes <b>dis-</b> &mdash; like <i>dishonest</i> and <i>disloyal</i>. There is no single rule that covers every stem, so these have to be met and remembered one at a time.' }),

    makeText({ id:'g9eng-d4-039', chapterId:'g9eng-word-formation', subsection:'root_and_affix', difficulty:4,
      question:'Write ONE word: the opposite of <b>relevant</b>, made by adding a prefix to it.',
      answer:'irrelevant',
      hint:'Look at the first letter of the root; it decides which form of the prefix is used and how many letters are doubled.',
      explanation:'The word is <b>irrelevant</b>, with a double <b>r</b>. Before a root beginning with <b>r</b>, the prefix <b>in-</b> becomes <b>ir-</b>: <i>irregular</i>, <i>irresponsible</i>, <i>irreversible</i>. The same shift gives <b>il-</b> before <b>l</b> and <b>im-</b> before <b>b</b>, <b>m</b> and <b>p</b>.' }),

    makeMCQ({ id:'g9eng-d4-040', chapterId:'g9eng-word-formation', subsection:'root_and_affix', difficulty:4,
      question:'The word <b>unmistakably</b> is built from four parts. Which list gives them in the right order?',
      options:['un- + mistake + -able + -ly','un- + mis- + take + -ably','unmis- + take + -able + -y','un- + mistaken + -ably + -y'],
      answer:'un- + mistake + -able + -ly',
      hint:'Strip one piece off each end at a time, and check that what is left is a real word on its own.',
      explanation:'Take <b>-ly</b> off and <i>unmistakable</i> remains; take <b>-able</b> off and <i>unmistak(e)</i> remains; take <b>un-</b> off and the root <i>mistake</i> is left. That is <b>un- + mistake + -able + -ly</b>, with the silent <b>e</b> dropped before <b>-able</b>. Splitting <i>mistake</i> into <i>mis-</i> and <i>take</i> is historically true but is not how this word is built today.' }),

    // ══ g9eng-gr-nouns · apposition (041–045) ═════════════════════════════

    makeMCQ({ id:'g9eng-d4-041', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
      question:'Complete: &ldquo;My uncle Dev, one of the best fishermen in Mah&eacute;bourg, ___ his own boat.&rdquo;',
      options:['owns','own','owning','has owned it'], answer:'owns',
      hint:'Find the real subject of the verb first. The phrase between the commas is not it.',
      explanation:'The subject is <i>My uncle Dev</i>, which is singular, so the verb is <b>owns</b>. The phrase between the commas renames him and ends in the plural noun <i>fishermen</i>, which pulls the ear towards <i>own</i> &mdash; but an appositive never changes the number of the subject. Cover the commas and the phrase inside them, and the agreement becomes obvious.' }),

    makeMCQ({ id:'g9eng-d4-042', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
      question:'The writer has exactly one daughter, and her name is Leela. Which version is punctuated correctly?',
      options:['My daughter, Leela, won the prize.','My daughter Leela won the prize today.','My daughter Leela, won the prize.','My, daughter Leela won the prize.'],
      answer:'My daughter, Leela, won the prize.',
      hint:'Ask whether the name is needed to say WHICH daughter, then punctuate to match.',
      explanation:'With only one daughter, the name adds information rather than identifying her, so it is non-defining and takes a comma on <b>both</b> sides. Without commas the sentence would imply there are other daughters and that Leela is the one meant. A single comma, before the name or after it, is never right: an appositive is enclosed or it is not marked at all.' }),

    makeMCQ({ id:'g9eng-d4-043', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
      question:'Complete: &ldquo;Neither of the two witnesses, both pupils at the same school, ___ willing to speak in court.&rdquo;',
      options:['was','were','are','have been'], answer:'was',
      hint:'Two plural nouns stand between the subject and the verb. Neither of them is the subject.',
      explanation:'<i>Neither</i> is the subject and is singular, so the verb is <b>was</b>. Two plurals lie between it and the verb &mdash; <i>witnesses</i>, and <i>pupils</i> inside the appositive &mdash; and both pull towards <i>were</i>. Strip the sentence to <i>Neither was willing</i> and the agreement is clear.' }),

    makeTF({ id:'g9eng-d4-044', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
      question:'True or False: in &ldquo;The novelist Amal Sewtohul lives in Mauritius&rdquo;, the absence of commas shows that the name is needed to identify WHICH novelist is meant.',
      answer:true,
      hint:'Decide what the commas would have done if they were there, then read what their absence does.',
      explanation:'True. An appositive without commas is <b>defining</b>: it narrows the noun in front of it, so the sentence assumes there are other novelists and names the one meant. Add commas &mdash; <i>The novelist, Amal Sewtohul, lives in Mauritius</i> &mdash; and the name becomes extra information about a novelist already known to the reader. The punctuation carries the whole difference in meaning.' }),

    makeText({ id:'g9eng-d4-045', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
      question:'Write ONE word in the gap so that the sentence is correct: &ldquo;The committee&rsquo;s report, a document of ninety pages, ___ not been published yet.&rdquo;',
      answer:'has', alsoAccept:['has.'],
      hint:'Decide what the subject of the sentence actually is before you choose between the two possible auxiliaries.',
      explanation:'The subject is <i>The committee&rsquo;s report</i>, singular, so the auxiliary is <b>has</b>. The appositive between the commas contains <i>ninety pages</i>, and that plural is the trap: many pupils write <i>have</i> because the last noun before the gap is plural. An appositive renames the subject; it never replaces it.' }),

    // ══ g9eng-gr-adjectives · adjectives_as_nouns (046–052) ═══════════════

    makeMCQ({ id:'g9eng-d4-046', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
      question:'Complete: &ldquo;The injured ___ still being carried down from the ridge when night fell.&rdquo;',
      options:['were','was','has been','is'], answer:'were',
      hint:'Decide whether the phrase names one person or a group before choosing the verb.',
      explanation:'<b>The injured</b> is an adjective used as a noun, and in this construction it always names a group of people, so it is plural and takes <b>were</b>. The absence of an <b>-s</b> makes it look singular, which is why <i>was</i> tempts. For one person English adds a noun: <i>the injured man</i>.' }),

    makeMCQ({ id:'g9eng-d4-047', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
      question:'Complete: &ldquo;Government policy must protect ___ from rising food prices.&rdquo;',
      options:['the vulnerable','vulnerables','a vulnerable','vulnerable'], answer:'the vulnerable',
      hint:'Two separate things have to be right: the small word in front, and whether an ending is added.',
      explanation:'An adjective used as a noun for a group takes <b>the</b> and never takes a plural <b>-s</b>: <b>the vulnerable</b>, like <i>the poor</i> and <i>the elderly</i>. &ldquo;Vulnerables&rdquo; breaks the second rule, <i>a vulnerable</i> would need a noun after it, and bare <i>vulnerable</i> has no article at all. Both rules must be applied to one phrase.' }),

    makeText({ id:'g9eng-d4-048', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
      question:'Write TWO words meaning &ldquo;people who cannot hear&rdquo; to complete the sentence: &ldquo;Subtitles were added to the evening news bulletin for ___.&rdquo;',
      answer:'the deaf', alsoAccept:['the deaf.'],
      hint:'English makes this group from an adjective, with one short word in front and no ending on the end.',
      explanation:'The phrase is <b>the deaf</b> &mdash; the article plus the bare adjective, standing for the whole group. &ldquo;Deaf people&rdquo; means the same but is three words and uses a noun, and &ldquo;the deafs&rdquo; is never correct, because an adjective used in this way takes no plural ending.' }),

    makeMCQ({ id:'g9eng-d4-049', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
      question:'In which sentence does <b>elderly</b> stand for a group of people rather than describe one person?',
      options:['The elderly need better transport at night.','The elderly gentleman missed his last bus.','An elderly man waited at the bus stop again.','Her elderly aunt now travels everywhere by taxi.'],
      answer:'The elderly need better transport at night.',
      hint:'Look at what comes immediately after the adjective in each sentence.',
      explanation:'Only in the first sentence is there no noun after <b>elderly</b>, so the adjective is doing the noun&rsquo;s work and means elderly people in general &mdash; and the plural verb <i>need</i> confirms it. In the other three a noun follows (<i>gentleman</i>, <i>man</i>, <i>aunt</i>) and the adjective is simply describing that one person.' }),

    makeTF({ id:'g9eng-d4-050', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
      question:'True or False: in &ldquo;The wounded was taken to hospital&rdquo;, the verb is correct, because <b>the wounded</b> can refer to a single person.',
      answer:false,
      hint:'Ask what English does when it needs to speak about one member of such a group.',
      explanation:'False. An adjective used as a noun in this way is always plural and always means the whole group, so the sentence needs <b>were</b>. To speak of one person English puts a noun back in: <i>the wounded man was taken to hospital</i>. The construction has no singular of its own, which is exactly why the agreement is so often written wrongly.' }),

    makeMCQ({ id:'g9eng-d4-051', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
      question:'An adjective used as a noun can stand for a group of people or for an abstract quality. Which sentence uses one for a <b>quality</b>?',
      options:['The supernatural has always frightened him.','The homeless sleep under the flyover tonight.','The elderly deserve a seat on the bus too.','The unemployed queue outside the office daily.'],
      answer:'The supernatural has always frightened him.',
      hint:'The verb in each sentence tells you whether the phrase is singular or plural, and that tells you which kind it is.',
      explanation:'<b>The supernatural</b> names an idea, not people, so it is singular and takes <i>has</i>. The other three name groups of people and all take plural verbs &mdash; <i>sleep</i>, <i>deserve</i>, <i>queue</i>. The verb is the visible test: singular means a quality, plural means people.' }),

    makeText({ id:'g9eng-d4-052', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
      question:'Write ONE word in the gap so that the sentence is correct: &ldquo;The rich ___ rarely aware of how the other half lives.&rdquo;',
      answer:'are', alsoAccept:['are.'],
      hint:'Work out whether the subject names one thing or many before choosing the form of the verb.',
      explanation:'<b>The rich</b> means rich people, a group, so the verb is <b>are</b>. Because there is no <b>-s</b> on the end, the phrase looks singular and <i>is</i> feels right to the ear &mdash; but this construction is plural without exception. Compare <i>the poor are</i>, <i>the young are</i>, <i>the unemployed are</i>.' })

  );

})();
