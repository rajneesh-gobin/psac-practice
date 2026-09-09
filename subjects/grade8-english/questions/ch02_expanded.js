'use strict';
// Grade 8 English — Expanded questions, all 14 chapters
// IDs continue from ch01_core.js (which ended at -006 per chapter)

STATIC_QUESTIONS.push(

  // ── Listening & Comprehension ────────────────────────────────────────────

  makeMCQ({ id:'g8eng-listening-007', chapterId:'g8eng-listening', difficulty:1,
    subsection:'fact_opinion',
    question:'Which statement is a FACT?',
    options:['Cats make better pets than dogs.','Mauritius gained independence in 1968.','This is the most beautiful island in the world.','Learning is the most rewarding experience.'],
    answer:'Mauritius gained independence in 1968.',
    hint:'A fact can be verified — it is provable and does not depend on personal judgement.',
    explanation:'"<b>Mauritius gained independence in 1968</b>" is a fact — it is a verifiable historical event. The other statements express personal opinions or judgements that different people might disagree about. Facts are checkable; opinions are not.' }),

  makeMCQ({ id:'g8eng-listening-008', chapterId:'g8eng-listening', difficulty:2,
    subsection:'summarising',
    question:'You listen to a talk covering: (1) how coral reefs form, (2) why they are under threat, (3) how communities can protect them. Which is the BEST summary?',
    options:['Coral reefs are beautiful.','The talk explained reef formation, the threats they face and how to protect them.','Communities should do more.','The speaker likes coral reefs.'],
    answer:'The talk explained reef formation, the threats they face and how to protect them.',
    hint:'A summary captures all main points — not just one detail or a vague general comment.',
    explanation:'A good summary covers <b>all three areas</b>: formation, threats and protection. Vague or partial summaries miss key content. At Grade 8, summaries should be concise but complete.' }),

  makeMCQ({ id:'g8eng-listening-009', chapterId:'g8eng-listening', difficulty:3,
    subsection:'fact_opinion',
    question:'A speaker says: "Scientists estimate that the ocean will warm by 2°C by 2100, which many experts believe will cause catastrophic damage." Identify which part is OPINION.',
    options:['"Scientists estimate 2°C by 2100" is opinion.','"Many experts believe will cause catastrophic damage" is opinion.','Both parts are equally factual.','Both parts are equally opinion.'],
    answer:'"Many experts believe will cause catastrophic damage" is opinion.',
    hint:'What word signals that this is a judgement or prediction, not a proven fact?',
    explanation:'"<b>Many experts believe</b>" signals opinion — belief, not proven fact. "Scientists estimate 2°C" is a scientific projection based on data (closer to fact, though still a prediction). Phrases like "believe", "think", "argue", "suggest" signal opinions even when attributed to experts.' }),

  makeMCQ({ id:'g8eng-listening-010', chapterId:'g8eng-listening', difficulty:3,
    subsection:'summarising',
    question:'A four-part documentary covers: rainforest destruction, indigenous communities, government policy, and conservation charities. Which statement is the BEST overall summary?',
    options:['The documentary argues that governments are failing.','The documentary examined the destruction of rainforests and its impact on indigenous peoples, as well as government and charity responses.','The documentary was about charities and trees.','The documentary argued for more money for conservation.'],
    answer:'The documentary examined the destruction of rainforests and its impact on indigenous peoples, as well as government and charity responses.',
    hint:'A summary of a multi-part text must mention all the main parts.',
    explanation:'The best summary captures all four elements: destruction, indigenous communities, government and charities. Summaries that focus on only one part or add a personal opinion (e.g. "governments are failing") are incomplete or biased.' }),

  makeMCQ({ id:'g8eng-listening-011', chapterId:'g8eng-listening', difficulty:4,
    subsection:'fact_opinion',
    question:'A politician says: "Crime has fallen by 12% since we took office." A journalist replies: "Those figures only count reported crimes — unreported crime may have risen." Who presents the more COMPLETE picture?',
    options:['The politician — a 12% figure is a clear fact.','The journalist — they explain a limitation of the statistic.','Both present equally complete pictures.','Neither — statistics are never reliable.'],
    answer:'The journalist — they explain a limitation of the statistic.',
    hint:'A statistic can be a fact and still be misleading if it is incomplete.',
    explanation:'The politician quotes a fact (reported crime fell 12%), but the journalist points out its <b>limitation</b> — it excludes unreported crime. Critical listening means evaluating not just what is said but what is left out. A partial fact can mislead.' }),

  // ── Speaking & Oral Interaction ──────────────────────────────────────────

  makeMCQ({ id:'g8eng-speaking-007', chapterId:'g8eng-speaking', difficulty:1,
    subsection:'structured_discussion',
    question:'In a formal debate, what is the role of a REBUTTAL?',
    options:['To introduce the topic for the first time.','To respond to and challenge the opposing team\'s arguments.','To summarise your own team\'s points.','To thank the judges and audience.'],
    answer:'To respond to and challenge the opposing team\'s arguments.',
    hint:'A rebuttal comes after the opposing team has spoken.',
    explanation:'A <b>rebuttal</b> responds to the opposing team\'s arguments — it challenges their claims and weakens their case. A rebuttal is not a repetition of your own points; it directly addresses what the other side said.' }),

  makeMCQ({ id:'g8eng-speaking-008', chapterId:'g8eng-speaking', difficulty:2,
    subsection:'register_adaptation',
    question:'You are giving a speech at a parent-teacher evening. Which opening is MOST appropriate?',
    options:['"Hi everyone, so like, I want to talk about something."','"Good evening. It is a pleasure to address parents and teachers this evening."','"Yo! Thanks for coming, you guys."','"Well, I guess I\'ll say some stuff about school."'],
    answer:'"Good evening. It is a pleasure to address parents and teachers this evening."',
    hint:'A parent-teacher evening is a formal occasion — choose formal, polished language.',
    explanation:'"<b>Good evening. It is a pleasure to address…</b>" is formal, polished and appropriate. "Hi", "Yo", "so like" and "you guys" are informal expressions unsuitable for a formal public gathering. Register adaptation means matching your language to the audience and occasion.' }),

  makeMCQ({ id:'g8eng-speaking-009', chapterId:'g8eng-speaking', difficulty:3,
    subsection:'structured_discussion',
    question:'During a class debate on school uniforms, a student says: "Uniforms cost money, but they save families from buying many different outfits — so overall they reduce clothing costs." What technique is this?',
    options:['Emotional appeal','Counterargument followed by a rebuttal','Asking a rhetorical question','Simply repeating a personal opinion'],
    answer:'Counterargument followed by a rebuttal',
    hint:'The student acknowledges the other side (uniforms cost money) before turning it around.',
    explanation:'The student <b>acknowledges a counterargument</b> ("cost money") then <b>rebuts it</b> ("save families from buying many outfits"). This is a sophisticated debate technique that shows balanced thinking and strengthens the speaker\'s position.' }),

  makeMCQ({ id:'g8eng-speaking-010', chapterId:'g8eng-speaking', difficulty:4,
    subsection:'register_adaptation',
    question:'A student gives a presentation to younger pupils about staying safe online. They use the phrase: "Be careful about what you post — once it\'s online, it\'s very hard to remove." Is the register appropriate?',
    options:['No — they should use more technical language.','Yes — clear, simple language is appropriate for younger pupils.','No — they should not use contractions like "it\'s".','Yes, but only if they also use formal vocabulary.'],
    answer:'Yes — clear, simple language is appropriate for younger pupils.',
    hint:'Register depends on the audience. Who are the listeners here?',
    explanation:'For younger pupils, <b>simple, clear language</b> is the correct register — avoiding technical jargon and using contractions is fine. Adapting register means choosing language your audience will understand and engage with, not always the most formal language.' }),

  // ── Reading & Comprehension ──────────────────────────────────────────────

  makeMCQ({ id:'g8eng-reading-007', chapterId:'g8eng-reading', difficulty:1,
    subsection:'purpose_audience',
    question:'A text reads: "Ingredients: flour, eggs, butter, sugar. Method: Mix flour and butter until crumbly…" What type of text is this?',
    options:['A formal letter','A recipe','A news report','A persuasive essay'],
    answer:'A recipe',
    hint:'Think about the structure: ingredients followed by method.',
    explanation:'The format — <b>ingredients</b> followed by <b>method</b> — clearly identifies this as a <b>recipe</b>. Recognising text type by its structure, layout and language is a key reading skill. Different text types have different purposes and audiences.' }),

  makeMCQ({ id:'g8eng-reading-008', chapterId:'g8eng-reading', difficulty:2,
    subsection:'explicit_implicit',
    question:'Read: "The test results sat unopened on the desk for three days." What can you INFER about the character?',
    options:['They were too busy to open the envelope.','They were nervous or afraid of the results.','They had already passed the test.','They had forgotten about the test.'],
    answer:'They were nervous or afraid of the results.',
    hint:'Why would someone leave important news unopened for three days?',
    explanation:'Leaving results unopened for three days suggests <b>fear or anxiety</b> about the outcome. This is implicit — never stated directly. The reader infers the character\'s emotional state from the action described.' }),

  makeMCQ({ id:'g8eng-reading-009', chapterId:'g8eng-reading', difficulty:2,
    subsection:'purpose_audience',
    question:'A charity leaflet uses images of sad children and phrases like "You can make a difference TODAY." What technique is this?',
    options:['Using logic and statistics to persuade.','Using emotional appeal to encourage a response.','Informing readers of historical facts.','Entertaining readers with stories.'],
    answer:'Using emotional appeal to encourage a response.',
    hint:'The leaflet targets feelings rather than presenting data or logic.',
    explanation:'Using images of suffering and urgent phrases ("TODAY") is <b>emotional appeal (pathos)</b> — a persuasive technique that targets feelings rather than reason. Identifying persuasive techniques helps readers evaluate texts critically.' }),

  makeMCQ({ id:'g8eng-reading-010', chapterId:'g8eng-reading', difficulty:3,
    subsection:'explicit_implicit',
    question:'Read: "The village had not seen rain in four months. The river had become a dusty scar. Farmers stood in their fields, staring at the sky." What does this IMPLICITLY suggest?',
    options:['The farmers are watching aeroplanes.','The village is experiencing a severe drought and the farmers are desperate.','The river is being cleaned.','It is a beautiful summer day.'],
    answer:'The village is experiencing a severe drought and the farmers are desperate.',
    hint:'A "dusty scar" where a river was, and farmers staring at the sky — what emotion and situation does this convey?',
    explanation:'No rain for four months, a dried-up river and farmers staring skyward all implicitly convey <b>drought and desperation</b>. The writer never uses the words "drought" or "desperate" but the imagery makes the meaning clear. This is literary implicit meaning.' }),

  makeMCQ({ id:'g8eng-reading-011', chapterId:'g8eng-reading', difficulty:4,
    subsection:'purpose_audience',
    question:'Two texts describe the same event: Text A is a newspaper report; Text B is a personal diary entry. How will their TONE most likely differ?',
    options:['Text A will be emotional; Text B will be objective.','Text A will be objective and formal; Text B will be personal and subjective.','Both will have exactly the same tone.','Text A will be funnier than Text B.'],
    answer:'Text A will be objective and formal; Text B will be personal and subjective.',
    hint:'Newspaper reports aim for neutrality; diaries express personal feelings.',
    explanation:'A <b>newspaper report</b> uses formal, neutral language and third person to appear objective. A <b>diary</b> uses first person, personal feelings and informal language — it is subjective. Comparing tone helps readers identify perspective and bias.' }),

  // ── Writing ──────────────────────────────────────────────────────────────

  makeMCQ({ id:'g8eng-writing-007', chapterId:'g8eng-writing', difficulty:1,
    subsection:'extended_writing',
    question:'What is the PURPOSE of an introduction in an argumentative essay?',
    options:['To list all the evidence for your argument.','To introduce the topic and state your main argument (thesis).','To give a detailed conclusion.','To describe the background of every point you will make.'],
    answer:'To introduce the topic and state your main argument (thesis).',
    hint:'An introduction sets up the essay — it does not go into detailed evidence.',
    explanation:'An <b>introduction</b> in an argumentative essay: (1) introduces the topic with background context, (2) states the writer\'s main argument (the <b>thesis</b>). Detailed evidence and analysis belong in the body paragraphs; conclusions belong at the end.' }),

  makeMCQ({ id:'g8eng-writing-008', chapterId:'g8eng-writing', difficulty:2,
    subsection:'editing_accuracy',
    question:'Which sentence is CORRECTLY punctuated?',
    options:['Its too hot outside.','It\'s too hot outside.','Its\' too hot outside.','Its too hot, outside.'],
    answer:'It\'s too hot outside.',
    hint:'"It\'s" = "it is". The apostrophe replaces the missing letter.',
    explanation:'"<b>It\'s</b> too hot" — "it\'s" is a contraction of "it is". The apostrophe replaces the omitted letter "i". "Its" (no apostrophe) = possessive ("The cat licked its paw"). Confusing "it\'s" and "its" is a very common error.' }),

  makeMCQ({ id:'g8eng-writing-009', chapterId:'g8eng-writing', difficulty:3,
    subsection:'extended_writing',
    question:'A student writes the same argument three times in different paragraphs: "We should protect the environment." What is the MAIN weakness?',
    options:['The student uses "should" too often.','The student repeats the same point without developing or supporting it.','The student writes too many paragraphs.','The statement is an opinion and must be changed.'],
    answer:'The student repeats the same point without developing or supporting it.',
    hint:'In a well-structured essay, each paragraph makes a NEW point and supports it.',
    explanation:'<b>Repetition without development</b> is a major weakness. Each body paragraph should introduce a new argument with supporting evidence. Restating the same claim without new evidence or examples wastes words and weakens the essay.' }),

  makeMCQ({ id:'g8eng-writing-010', chapterId:'g8eng-writing', difficulty:3,
    subsection:'editing_accuracy',
    question:'Which sentence has a COMMA SPLICE error?',
    options:['She studied hard, so she passed.','The weather was hot, the children played outside.','Although it was hot, the children played outside.','She studied hard; she passed the exam.'],
    answer:'The weather was hot, the children played outside.',
    hint:'A comma splice joins two independent clauses with only a comma — no conjunction.',
    explanation:'"The weather was hot<b>,</b> the children played outside" is a comma splice — two independent clauses joined by only a comma. Fix it with: a conjunction ("hot, <b>so</b> the children…"), a semicolon ("hot<b>;</b> the children…") or two sentences ("hot. <b>The</b> children…").' }),

  makeMCQ({ id:'g8eng-writing-011', chapterId:'g8eng-writing', difficulty:4,
    subsection:'extended_writing',
    question:'A student argues: "Zoos should be banned because animals deserve freedom." Which addition would MOST strengthen this argument?',
    options:['Adding: "In my opinion, animals are important."','Adding a statistic: "Studies show that 80% of zoo animals display signs of stress."','Adding: "Everyone knows zoos are bad."','Repeating the point in different words.'],
    answer:'Adding a statistic: "Studies show that 80% of zoo animals display signs of stress."',
    hint:'A specific piece of evidence with a source is the most persuasive support.',
    explanation:'Adding a <b>specific statistic from a study</b> gives credible, verifiable evidence that directly supports the claim. "In my opinion" and "everyone knows" are unsupported. Repeating the point adds nothing. Evidence is the key to a strong argument.' }),

  // ── Grammar · Nouns ──────────────────────────────────────────────────────

  makeMCQ({ id:'g8eng-gr-nouns-007', chapterId:'g8eng-gr-nouns', difficulty:1,
    subsection:'gerunds',
    question:'Which sentence uses a GERUND as the object of a verb?',
    options:['Swimming is her favourite hobby.','She enjoys swimming.','She is a swimmer.','The pool is for swimming only.'],
    answer:'She enjoys swimming.',
    hint:'The gerund follows the verb "enjoys" and is the object of that verb.',
    explanation:'"She enjoys <b>swimming</b>" — "swimming" is a gerund used as the <b>direct object</b> of "enjoys". Certain verbs are followed by gerunds: enjoy, avoid, consider, finish, suggest, keep. Compare: "Swimming is her favourite hobby" (gerund as subject).' }),

  makeMCQ({ id:'g8eng-gr-nouns-008', chapterId:'g8eng-gr-nouns', difficulty:2,
    subsection:'noun_phrases',
    question:'Which is the HEAD NOUN in the noun phrase "a fascinating book about history"?',
    options:['fascinating','a','book','history'],
    answer:'book',
    hint:'The head noun is the central noun that the other words modify.',
    explanation:'"<b>Book</b>" is the head noun. "A" is the determiner; "fascinating" is an adjective; "about history" is a prepositional phrase — all modifying "book". Remove the modifiers and "book" remains.' }),

  makeMCQ({ id:'g8eng-gr-nouns-009', chapterId:'g8eng-gr-nouns', difficulty:3,
    subsection:'gerunds',
    question:'Which verb in this list is followed by a GERUND (not an infinitive)?',
    options:['want','hope','avoid','decide'],
    answer:'avoid',
    hint:'"Avoid" is always followed by -ing: "avoid doing", not "avoid to do".',
    explanation:'"<b>Avoid</b>" is followed by a gerund: "avoid making mistakes" (not "avoid to make"). Verbs followed by gerunds: avoid, enjoy, consider, suggest, keep, finish. Verbs followed by infinitives: want, hope, decide, agree, plan.' }),

  // ── Grammar · Pronouns ───────────────────────────────────────────────────

  makeMCQ({ id:'g8eng-gr-pronouns-007', chapterId:'g8eng-gr-pronouns', difficulty:1,
    subsection:'reference_tracking',
    question:'Read two sentences: "The manager signed the contract. <b>She</b> was very pleased." What does "she" refer to?',
    options:['the contract','the manager','someone not mentioned','it is ambiguous'],
    answer:'the manager',
    hint:'The pronoun refers to the closest preceding noun that matches in gender and number.',
    explanation:'"<b>She</b>" refers to "the manager" — the most recent human noun. "The contract" is a thing (it), so "she" cannot refer to it. Clear pronoun reference: the pronoun should have only one possible antecedent.' }),

  makeMCQ({ id:'g8eng-gr-pronouns-008', chapterId:'g8eng-gr-pronouns', difficulty:2,
    subsection:'ambiguous_reference',
    question:'Fix the ambiguous pronoun: "Priya helped her mother with her project." Which rewrite is CLEAREST?',
    options:['"Priya helped her mother with Priya\'s own project."','"She helped her with her project."','"They worked on the project."','"Priya and her mother had a project."'],
    answer:'"Priya helped her mother with Priya\'s own project."',
    hint:'Replace the ambiguous pronoun with the specific name it refers to.',
    explanation:'"Priya helped her mother with <b>Priya\'s own</b> project" makes clear it is Priya\'s project. Adding "own" emphasises whose it is. Using a name instead of a pronoun eliminates ambiguity — especially when two people of the same gender are mentioned.' }),

  makeMCQ({ id:'g8eng-gr-pronouns-009', chapterId:'g8eng-gr-pronouns', difficulty:3,
    subsection:'reference_tracking',
    question:'Read: "The report concluded that the programme was a success. The minister accepted it and presented it to the board." What does the SECOND "it" refer to?',
    options:['the minister','the programme\'s success','the report','the board'],
    answer:'the report',
    hint:'What did the minister present to the board?',
    explanation:'The second "it" refers to "<b>the report</b>" — the minister accepted and then presented the report to the board. Tracking pronoun reference across several sentences requires identifying which noun each pronoun replaces based on logic and context.' }),

  // ── Grammar · Adjectives ─────────────────────────────────────────────────

  makeMCQ({ id:'g8eng-gr-adjectives-007', chapterId:'g8eng-gr-adjectives', difficulty:1,
    subsection:'participial_adjectives',
    question:'Choose the correct adjective: "The lesson was _____. I fell asleep."',
    options:['bored','boring','bore','boredom'],
    answer:'boring',
    hint:'The lesson causes the feeling. Which -ing form describes the cause?',
    explanation:'"The lesson was <b>boring</b>" — the <b>-ing</b> adjective describes the thing that causes the feeling (the lesson). "Bored" (-ed) describes the person experiencing the feeling: "I was bored." Never use "bored" for the thing that causes boredom.' }),

  makeMCQ({ id:'g8eng-gr-adjectives-008', chapterId:'g8eng-gr-adjectives', difficulty:2,
    subsection:'adjective_order',
    question:'Choose the CORRECT adjective order: "a _____ Italian long silk scarf".',
    options:['a long Italian silk scarf','an Italian long silk scarf','a silk long Italian scarf','a long silk Italian scarf'],
    answer:'a long Italian silk scarf',
    hint:'Order: size → origin → material.',
    explanation:'"A <b>long</b> (size) <b>Italian</b> (origin) <b>silk</b> (material) scarf" — size precedes origin, which precedes material. "Italian silk" sounds natural; "silk Italian" does not. The standard order must be memorised.' }),

  makeMCQ({ id:'g8eng-gr-adjectives-009', chapterId:'g8eng-gr-adjectives', difficulty:3,
    subsection:'participial_adjectives',
    question:'Which pair uses BOTH participial adjectives correctly?',
    options:['a tiring journey / a tired traveller','a tired journey / a tiring traveller','a tiring journey / a tiring traveller','a tired journey / a tired traveller'],
    answer:'a tiring journey / a tired traveller',
    hint:'The journey CAUSES tiredness (-ing); the traveller FEELS tiredness (-ed).',
    explanation:'"A <b>tiring</b> journey / a <b>tired</b> traveller" — the journey causes tiredness (-ing = cause); the traveller feels tiredness (-ed = effect). This is the core rule for participial adjectives: -ing for cause, -ed/-en for the person experiencing the feeling.' }),

  // ── Grammar · Verbs & Tenses ─────────────────────────────────────────────

  makeMCQ({ id:'g8eng-gr-verbs-007', chapterId:'g8eng-gr-verbs', difficulty:1,
    subsection:'present_perfect',
    question:'Which signal word is typically used with the PRESENT PERFECT?',
    options:['yesterday','last week','in 2010','already'],
    answer:'already',
    hint:'"Already" refers to something done before now — with no specific time stated.',
    explanation:'"<b>Already</b>" signals the present perfect: "She has <b>already</b> left." Other present perfect signals: just, yet, ever, never, since, for. "Yesterday", "last week" and "in 2010" name specific past times and signal the simple past.' }),

  makeMCQ({ id:'g8eng-gr-verbs-008', chapterId:'g8eng-gr-verbs', difficulty:2,
    subsection:'future_continuous',
    question:'Which sentence correctly uses the FUTURE CONTINUOUS for a polite enquiry?',
    options:['Will you attend the meeting tomorrow?','Will you be attending the meeting tomorrow?','Are you attending the meeting tomorrow?','Do you attend the meeting tomorrow?'],
    answer:'Will you be attending the meeting tomorrow?',
    hint:'The future continuous is often used for polite questions about plans.',
    explanation:'"<b>Will you be attending</b> the meeting tomorrow?" — the future continuous is commonly used for polite enquiries about someone\'s plans. It feels less demanding than "Will you attend?" which can sound like a directive.' }),

  makeMCQ({ id:'g8eng-gr-verbs-009', chapterId:'g8eng-gr-verbs', difficulty:3,
    subsection:'present_perfect',
    question:'"She _____ in Mauritius for ten years." Which form is CORRECT if she still lives there now?',
    options:['lived','was living','has lived','had lived'],
    answer:'has lived',
    hint:'She started in the past and is STILL there now — which tense covers past-to-now?',
    explanation:'"She <b>has lived</b> in Mauritius for ten years" — the present perfect with "for" is used when an action started in the past and <b>continues to the present</b>. "Lived" (simple past) would imply she no longer lives there. "Had lived" = past perfect (before another past event).' }),

  // ── Grammar · Determiners ────────────────────────────────────────────────

  makeMCQ({ id:'g8eng-gr-determiners-007', chapterId:'g8eng-gr-determiners', difficulty:1,
    subsection:'article_use',
    question:'Which noun always takes "the"?',
    options:['breakfast (generally)','the moon','happiness','advice'],
    answer:'the moon',
    hint:'There is only one moon — unique things take "the".',
    explanation:'"<b>The</b> moon" — we use "the" for unique objects of which there is only one: the sun, the moon, the sky, the earth (as a planet). Abstract nouns in general (happiness, hope) and meals used generally (breakfast, lunch) take no article.' }),

  makeMCQ({ id:'g8eng-gr-determiners-008', chapterId:'g8eng-gr-determiners', difficulty:2,
    subsection:'no_article',
    question:'Which sentence uses NO ARTICLE correctly?',
    options:['She is the doctor.','She is a doctor.','The doctor is good job.','She is doctor.'],
    answer:'She is a doctor.',
    hint:'When stating someone\'s profession, use "a/an" — it is a general, countable role.',
    explanation:'"She is <b>a</b> doctor" — professions use "a/an" because there are many doctors. "She is the doctor" would refer to one specific doctor (e.g. the only doctor in the village). "She is doctor" (no article) is incorrect.' }),

  makeMCQ({ id:'g8eng-gr-determiners-009', chapterId:'g8eng-gr-determiners', difficulty:3,
    subsection:'article_use',
    question:'"I love _____ cinema" — when talking about the cinema as a general activity (going to films). Which article is correct?',
    options:['a','an','the','-'],
    answer:'the',
    hint:'"The cinema" as a leisure activity is treated as a specific institution.',
    explanation:'"I love <b>the</b> cinema" — "the cinema" (meaning the activity of going to films) is a fixed phrase using "the", like "the theatre", "the opera". Compare: "I love cinema" (no article, more abstract / artistic) — both can be correct, but "the cinema" is most natural in everyday British English.' }),

  // ── Grammar · Adverbs ────────────────────────────────────────────────────

  makeMCQ({ id:'g8eng-gr-adverbs-007', chapterId:'g8eng-gr-adverbs', difficulty:1,
    subsection:'adjective_to_adverb',
    question:'What is the adverb form of "happy"?',
    options:['happyer','more happy','happy','happily'],
    answer:'happily',
    hint:'Adjectives ending in -y change y to i before -ly.',
    explanation:'"<b>Happily</b>" — adjectives ending in -y change y to i before adding -ly: happy→happily, angry→angrily, easy→easily, heavy→heavily. Simply adding -ly to "happy" gives "happyly" — incorrect.' }),

  makeMCQ({ id:'g8eng-gr-adverbs-008', chapterId:'g8eng-gr-adverbs', difficulty:2,
    subsection:'reason_purpose',
    question:'Choose the correct connective to show PURPOSE: "She studies every day _____ improve her grades."',
    options:['so that she can','because she','although she','whenever she'],
    answer:'so that she can',
    hint:'"So that" + subject + verb introduces a purpose clause.',
    explanation:'"She studies every day <b>so that she can</b> improve her grades" — "so that" introduces a purpose clause (what she is trying to achieve). "Because she" introduces a reason (a past cause). Purpose answers "What for?"; reason answers "Why?"' }),

  makeMCQ({ id:'g8eng-gr-adverbs-009', chapterId:'g8eng-gr-adverbs', difficulty:3,
    subsection:'adjective_to_adverb',
    question:'"She is a good singer." Convert "good" to its adverb form in a new sentence about how she sings.',
    options:['She sings goodly.','She sings well.','She sings more good.','She sings gooder.'],
    answer:'She sings well.',
    hint:'"Good" has an irregular adverb form.',
    explanation:'"She sings <b>well</b>" — "well" is the irregular adverb of "good". "Goodly" does not exist in modern English; "more good" and "gooder" are wrong. Other irregular adverb pairs: fast/fast, hard/hard, late/late (same form for adj. and adv.).' }),

  // ── Grammar · Modals ─────────────────────────────────────────────────────

  makeMCQ({ id:'g8eng-gr-modals-007', chapterId:'g8eng-gr-modals', difficulty:1,
    subsection:'advice',
    question:'Which sentence gives the STRONGEST advice?',
    options:['You might see a doctor.','You could see a doctor.','You should definitely see a doctor.','You may see a doctor.'],
    answer:'You should definitely see a doctor.',
    hint:'"Should" already expresses advice; adding "definitely" makes it even stronger.',
    explanation:'"You <b>should definitely</b> see a doctor" — "should" expresses strong advice, and "definitely" reinforces the urgency. "Could" and "might" suggest possibilities rather than recommendations. "May" refers to permission, not advice.' }),

  makeMCQ({ id:'g8eng-gr-modals-008', chapterId:'g8eng-gr-modals', difficulty:2,
    subsection:'possibility_probability',
    question:'"She must have left — her coat is gone." What does "must have" express?',
    options:['Permission in the past','Strong deduction about a past event','Obligation in the past','Ability in the past'],
    answer:'Strong deduction about a past event',
    hint:'The speaker is drawing a conclusion from evidence about something in the past.',
    explanation:'"She <b>must have left</b>" — "must have + past participle" expresses a <b>strong logical deduction</b> about the past. The evidence (coat is gone) leads to the conclusion. Compare: "She might have left" (possible but uncertain) vs "She must have left" (almost certain).' }),

  makeMCQ({ id:'g8eng-gr-modals-009', chapterId:'g8eng-gr-modals', difficulty:3,
    subsection:'advice',
    question:'"You _____ have told me earlier — now it\'s too late." Which modal expresses mild criticism about the past?',
    options:['must','could','can','will'],
    answer:'could',
    hint:'"Could have + past participle" expresses that something was possible but didn\'t happen.',
    explanation:'"You <b>could have told</b> me earlier" — "could have + past participle" expresses mild criticism: the action was possible but did not happen, and the speaker is mildly reproachful. "Should have" would be stronger criticism (you had an obligation).' }),

  // ── Grammar · Prepositions ───────────────────────────────────────────────

  makeMCQ({ id:'g8eng-gr-prepositions-007', chapterId:'g8eng-gr-prepositions', difficulty:1,
    subsection:'verbs_prepositions',
    question:'Choose the correct preposition: "He is very good _____ playing chess."',
    options:['in','at','on','for'],
    answer:'at',
    hint:'"Good at" is the fixed collocation for skills and activities.',
    explanation:'"Good <b>at</b>" is the correct collocation for expressing skill: "good at maths", "good at cooking", "good at sport". Other adjective + preposition collocations: bad at, excellent at, hopeless at (all skills use "at").' }),

  makeMCQ({ id:'g8eng-gr-prepositions-008', chapterId:'g8eng-gr-prepositions', difficulty:2,
    subsection:'prepositional_phrases',
    question:'In "She arrived in a hurry", what function does "in a hurry" perform?',
    options:['Subject of the sentence','Direct object','Adverbial phrase (describing HOW she arrived)','Adjective phrase (describing "she")'],
    answer:'Adverbial phrase (describing HOW she arrived)',
    hint:'"In a hurry" tells us how she arrived.',
    explanation:'"In a hurry" is a <b>prepositional phrase acting as an adverb</b> — it modifies the verb "arrived" by telling us the manner (how she arrived). Adverbial prepositional phrases can describe how, when, where or why.' }),

  makeMCQ({ id:'g8eng-gr-prepositions-009', chapterId:'g8eng-gr-prepositions', difficulty:3,
    subsection:'verbs_prepositions',
    question:'Choose the correct preposition: "The result depends _____ how hard you work."',
    options:['of','at','on','with'],
    answer:'on',
    hint:'"Depend on" is a fixed collocation.',
    explanation:'"Depend <b>on</b>" is the correct collocation: "It depends on the weather", "Success depends on effort". Other "on" collocations: insist on, rely on, concentrate on, focus on. "Depend of" and "depend with" are incorrect.' }),

  // ── Grammar · Sentence Structure ─────────────────────────────────────────

  makeMCQ({ id:'g8eng-gr-sentence-007', chapterId:'g8eng-gr-sentence', difficulty:1,
    subsection:'direct_indirect_speech',
    question:'Change to indirect speech: He said, "I will help you."',
    options:['He said that he will help me.','He said that he would help me.','He said that I would help him.','He said that he helps me.'],
    answer:'He said that he would help me.',
    hint:'In indirect speech, "will" backshifts to "would"; "you" changes to "me".',
    explanation:'"He said that he <b>would</b> help me." — backshifting: will → would. Pronoun change: "I" → "he"; "you" → "me". In indirect speech, always backshift the tense and adjust pronouns to match the new speaker\'s perspective.' }),

  makeMCQ({ id:'g8eng-gr-sentence-008', chapterId:'g8eng-gr-sentence', difficulty:2,
    subsection:'complex_sentences',
    question:'Which sentence is a FIRST CONDITIONAL (real / possible future situation)?',
    options:['If I were rich, I would donate to charity.','If I had been rich, I would have donated more.','If it rains tomorrow, I will stay home.','Were I rich, I would donate to charity.'],
    answer:'If it rains tomorrow, I will stay home.',
    hint:'First conditional: if + present simple, will + base verb. The situation is real or likely.',
    explanation:'"If it rains tomorrow, I <b>will</b> stay home" — first conditional: <b>if + present simple, will + base verb</b>. The situation is real (it might actually rain). "If I were rich" = second conditional (imaginary present). "If I had been rich" = third conditional (imaginary past).' }),

  makeMCQ({ id:'g8eng-gr-sentence-009', chapterId:'g8eng-gr-sentence', difficulty:3,
    subsection:'direct_indirect_speech',
    question:'Change to indirect speech: She asked, "Where do you live?"',
    options:['She asked where did he live.','She asked where he lived.','She asked that where he lived.','She asked where he does live.'],
    answer:'She asked where he lived.',
    hint:'In indirect yes/no and wh-questions, use normal word order (no inversion). Backshift the tense.',
    explanation:'"She asked where <b>he lived</b>" — in indirect questions: (1) remove the question mark and inverted commas; (2) use normal word order (no inversion: not "where did he live"); (3) backshift: "do you live" → "he lived"; (4) adjust pronouns: "you" → "he".' }),

  // ── Grammar · Punctuation ────────────────────────────────────────────────

  makeMCQ({ id:'g8eng-gr-punctuation-007', chapterId:'g8eng-gr-punctuation', difficulty:1,
    subsection:'punctuation_review',
    question:'Which sentence uses the EXCLAMATION MARK correctly?',
    options:['She! walked to school.','How beautiful the sunset is!','Is it beautiful!','She walked! to school.'],
    answer:'How beautiful the sunset is!',
    hint:'An exclamation mark ends a sentence expressing strong emotion or an exclamatory statement.',
    explanation:'"<b>How beautiful the sunset is!</b>" — exclamation marks end sentences expressing strong emotion, surprise or emphasis. "How + adjective + subject + verb" is a classic exclamatory structure. Exclamation marks do not appear mid-sentence after random words.' }),

  makeMCQ({ id:'g8eng-gr-punctuation-008', chapterId:'g8eng-gr-punctuation', difficulty:2,
    subsection:'ellipsis',
    question:'A student quotes a long passage but omits some words. They write: "The scientist concluded… the results were unexpected." What does the ellipsis indicate here?',
    options:['The scientist paused while speaking.','Some words from the original quotation have been left out.','The sentence is grammatically incomplete.','The writer is uncertain about the quote.'],
    answer:'Some words from the original quotation have been left out.',
    hint:'In academic writing, ellipsis in a quotation shows omitted words.',
    explanation:'In academic and formal writing, <b>ellipsis (…) in a quotation</b> shows that words have been left out to shorten the quote. The remaining text must still make grammatical sense and must not misrepresent the original meaning.' }),

  makeMCQ({ id:'g8eng-gr-punctuation-009', chapterId:'g8eng-gr-punctuation', difficulty:3,
    subsection:'punctuation_review',
    question:'Which sentence correctly uses the DASH (—) for emphasis or an aside?',
    options:['She — is — going — to — school.','The answer — as everyone suspected — was wrong.','She is going to school — .','The — answer was wrong.'],
    answer:'The answer — as everyone suspected — was wrong.',
    hint:'A pair of dashes sets off an aside or additional comment — like parentheses, but more emphatic.',
    explanation:'"The answer — as everyone suspected — was wrong" — a pair of em dashes sets off an <b>aside or parenthetical remark</b>, adding drama or emphasis. It is more emphatic than commas or brackets. The main sentence must still make sense if the aside is removed.' })

);
