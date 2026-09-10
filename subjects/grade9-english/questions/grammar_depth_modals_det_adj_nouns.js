'use strict';
// ── Grade 9 English · grammar depth batch ────────────────────────────────────
// Four chapters were the thinnest in the whole app: modals 2 items, adjectives
// 7, nouns 12, determiners 12, against a floor of 20 (docs/nce-grade9/batch_plan.md §1).
// All four carry examWeight 1, so all four were being dealt into real papers.
//
// ⚠ NOTHING IS EXAMINED BY NAME. docs/nce-grade9/blueprint-english.md §7.1,
//   measured across five real N500 papers: "No question ever says 'adverb',
//   'determiner' or 'quantifier'. Q1 asks for a rewrite or a circled option; the
//   grammar is the MEANS, never the OBJECT. A chapter that teaches terminology
//   teaches the wrong thing for this paper." So these items ask a child to pick
//   the sentence that works, repair one that does not, or say which of two
//   readings a sentence carries — never to label a word class.
//
// ⚠ SUBSECTIONS. g9eng-gr-nouns declares exactly one (`apposition`) and
//   g9eng-gr-adjectives exactly one (`adjectives_as_nouns`); every item here is
//   tagged to it. g9eng-gr-determiners and g9eng-gr-modals declare NONE, on
//   purpose — the MIE Grade 9 column is empty for both (syllabus-english.md
//   §5, §7, verified visually against the rendered page). Items for those two
//   carry NO subsection field. Adding one breaks the declared-vs-tagged
//   invariant that scripts/test-subsection-invariant.js fails the build on.
//
// ⚠ DETERMINERS AND MODALS HAVE NO GRADE 9 SYLLABUS CONTENT. That is recorded,
//   not an oversight. The content below is therefore the Grade 7 and Grade 8
//   cells taken to a Grade 9 standard of difficulty, which is what the
//   manifest's own prose ("consolidate ... in extended writing") already assumes:
//     Determiners — G7: uses of `the` (unique objects, clusters of islands,
//       superlatives), words taking no article, quantifier-verb agreement for
//       no/each/every/fewer/another/other/both/either/neither.
//       G8: article vs no article ("I drink milk" / "The milk had turned sour").
//     Modals — G7: can, may, must, might. G8: could, would, should, and polite
//       requests. Nothing is introduced at G9.
//   Do NOT "correct" these chapters toward a Grade 9 syllabus row. There isn't one.
//
// ⚠ DELIBERATELY NO L1 ITEMS. Asked for depth, not breadth. The four chapters
//   now hold no Basic tier at all, so a child who stalls has nothing gentler to
//   drop to. Worth filling separately; it is a real gap, not an oversight.
//
// Sources consulted for the harder distinctions, so a disputed item can be
// re-checked rather than re-argued:
//   Past deduction (must/can't/might + have) — British Council LearnEnglish,
//     "Modals: deductions about the past".
//   Adjectives as nouns, plural vs singular agreement, and `the accused` /
//     `the deceased` — englishgrammar.org, "Adjectives used as nouns".
//   Nationality words as plural nouns (the French, the Dutch, the British) —
//     Cambridge Grammar, "Nationalities, languages, countries and regions".
//   Quantifier-verb agreement (each/every/either/neither singular; both plural;
//     none countable vs uncountable) — British Council LearnEnglish, "Quantifiers".
(function () {
STATIC_QUESTIONS.push(

  // ══════════════════════════════════════════════════════════════════════════
  //  MODALS · g9eng-gr-modals · 30 items · NO subsection (none declared)
  // ══════════════════════════════════════════════════════════════════════════

  makeMCQ({ id:'g9eng-gx-001', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'The kitchen light was burning when we got home at midnight.<br>Complete: <i>"Someone ___ forgotten to switch it off."</i>',
    options:['must have','can\'t have','needn\'t have','shouldn\'t have'],
    answer:'must have',
    hint:'The light being on is evidence. How sure is the speaker that it happened?',
    explanation:'The burning light is proof, so the speaker is <b>sure</b>. <b>must have</b> carries that certainty. "can\'t have" would mean the opposite — that it did not happen.' }),

  makeMCQ({ id:'g9eng-gx-002', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'Ravi left home at six and the meeting began at seven.<br>Complete: <i>"He ___ been late."</i>',
    options:['can\'t have','must have','should have','would have'],
    answer:'can\'t have',
    hint:'An hour was plenty. Is the speaker sure it happened, or sure it did not?',
    explanation:'The timing rules it out, so the speaker is sure it did <b>not</b> happen. <b>can\'t have</b> is the opposite of "must have" for this meaning.' }),

  makeMCQ({ id:'g9eng-gx-003', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'Travel is free for pupils on this route.<br>Complete: <i>"You ___ pay."</i>',
    options:['don\'t have to','mustn\'t','can\'t','ought not to'],
    answer:'don\'t have to',
    hint:'Is paying forbidden, or simply unnecessary?',
    explanation:'Nothing forbids paying — it is just not required. <b>don\'t have to</b> removes the obligation. "mustn\'t pay" would mean paying is against the rules.' }),

  makeMCQ({ id:'g9eng-gx-004', chapterId:'g9eng-gr-modals', difficulty:4,
    question:'In which sentence is the speaker <b>drawing a conclusion</b> rather than giving an instruction?',
    options:['You must be exhausted.','You must rest now.','You must sign here.','You must wear a badge.'],
    answer:'You must be exhausted.',
    hint:'Three of these tell somebody what to do. One tells them what the speaker believes.',
    explanation:'<b>You must be exhausted</b> reports what the speaker concludes from the evidence. The other three impose an obligation. The same word does two different jobs, and only the context separates them.' }),

  makeMCQ({ id:'g9eng-gx-005', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'One line of this note is wrong. Which one?<br><i>(1) I waited an hour. (2) You must of forgotten. (3) I have gone home. (4) Ring me tonight.</i>',
    options:['Line 2','Line 1','Line 3','Line 4'],
    answer:'Line 2',
    hint:'Say line 2 aloud, then write down what you actually hear.',
    explanation:'It should be <b>must have forgotten</b>. "must of" happens because <i>have</i> is spoken as a weak "ve" and sounds like <i>of</i>. It is never correct in writing.' }),

  makeMCQ({ id:'g9eng-gx-006', chapterId:'g9eng-gr-modals', difficulty:4,
    question:'The fire spread within minutes, yet nobody was hurt.<br>Complete: <i>"Everyone ___ in time."</i>',
    options:['was able to escape','could be escaping','might have escaped','would have escaped'],
    answer:'was able to escape',
    hint:'This is one particular escape that actually happened, not a general skill.',
    explanation:'For a <b>single achievement that really came off</b>, English uses <b>was able to</b>. "could" describes a general ability ("she could swim at five"), so it reads oddly for one completed event.' }),

  makeMCQ({ id:'g9eng-gx-007', chapterId:'g9eng-gr-modals', difficulty:2,
    question:'You are writing to the head of a school you have never visited.<br>Which opening is most suitable?',
    options:['Could you kindly confirm the date?','Can you quickly confirm the date?','Will you confirm that date for me?','Confirm the date for me this week.'],
    answer:'Could you kindly confirm the date?',
    hint:'The further you are from the reader, the less direct the request.',
    explanation:'<b>Could you</b> is the least direct and the most formal. "Can you" suits a friend, "Will you" sounds impatient, and the last is an order.' }),

  makeMCQ({ id:'g9eng-gx-008', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'Complete: <i>"Would you mind ___ the window? The wind is fierce."</i>',
    options:['closing','to close','close','closed'],
    answer:'closing',
    hint:'Whatever follows "mind" behaves like a noun.',
    explanation:'<b>mind</b> is followed by the <i>-ing</i> form: <i>Would you mind closing…</i>. Note the polite trap — answering "yes" to this means you <b>do</b> object.' }),

  makeMCQ({ id:'g9eng-gx-009', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'The teacher was annoyed about the late assignment.<br>Complete: <i>"You ___ this in on Monday."</i>',
    options:['should have handed','must have handed','can have handed','will have handed'],
    answer:'should have handed',
    hint:'The deadline has passed. The speaker is criticising what was not done.',
    explanation:'<b>should have</b> + past participle criticises a past failure. "must have handed" would mean the speaker believes it <i>was</i> handed in.' }),

  makeMCQ({ id:'g9eng-gx-010', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'<i>"Perhaps Anil forgot."</i><br>Which sentence keeps that meaning exactly?',
    options:['Anil might have forgotten.','Anil must have forgotten.','Anil should have forgotten.','Anil would have forgotten.'],
    answer:'Anil might have forgotten.',
    hint:'"Perhaps" leaves it open. Which one does not commit the speaker?',
    explanation:'<b>might have</b> matches "perhaps" — possible, not certain. "must have" would upgrade the speaker to certain, which changes the meaning.' }),

  makeMCQ({ id:'g9eng-gx-011', chapterId:'g9eng-gr-modals', difficulty:4,
    question:'We carried umbrellas all day and it never rained once.<br>Complete: <i>"We ___ taken them."</i>',
    options:['needn\'t have','didn\'t need to','mustn\'t have','couldn\'t have'],
    answer:'needn\'t have',
    hint:'We did take them, and it turned out to be pointless. Which form says both?',
    explanation:'<b>needn\'t have taken</b> means we did it and it proved unnecessary. "didn\'t need to take" suggests we knew in advance and may not have taken them at all.' }),

  makeMCQ({ id:'g9eng-gx-012', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'A notice in an examination hall.<br>Complete: <i>"Candidates ___ not use a dictionary."</i>',
    options:['may','can','would','need'],
    answer:'may',
    hint:'Official notices about permission keep to one word.',
    explanation:'<b>may not</b> is the formal way to withhold permission and is what public notices use. "cannot" describes inability rather than a rule.' }),

  makeMCQ({ id:'g9eng-gx-013', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'Complete: <i>"She ___ seen me at the market — I was in Rodrigues all week."</i>',
    options:['can\'t have','mustn\'t have','shouldn\'t have','wouldn\'t have'],
    answer:'can\'t have',
    hint:'The speaker is certain the sighting is impossible.',
    explanation:'<b>can\'t have</b> + past participle rejects a past event as impossible. "mustn\'t have" is not used for deduction in careful British English.' }),

  makeMCQ({ id:'g9eng-gx-014', chapterId:'g9eng-gr-modals', difficulty:4,
    question:'Two lines of this message need repair.<br><i>(1) I would of come. (2) You must be joking. (3) He can to drive. (4) We may leave early.</i>',
    options:['Lines 1 and 3','Lines 1 and 2','Lines 2 and 4','Lines 3 and 4'],
    answer:'Lines 1 and 3',
    hint:'One line writes a sound instead of a word. Another adds something after the verb.',
    explanation:'Line 1 needs <b>would have</b>, not "would of". Line 3 needs <b>can drive</b> — nothing goes between the two verbs. Lines 2 and 4 are correct.' }),

  makeMCQ({ id:'g9eng-gx-015', chapterId:'g9eng-gr-modals', difficulty:2,
    question:'You want to propose an idea to a friend, not order them.<br>Complete: <i>"___ we meet at four instead?"</i>',
    options:['Shall','Must','Would','Might'],
    answer:'Shall',
    hint:'Which word opens a suggestion that includes the speaker?',
    explanation:'<b>Shall we…?</b> puts forward a suggestion the speaker joins in. "Must we" would sound like a complaint.' }),

  makeMCQ({ id:'g9eng-gx-016', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'Which sentence carries almost the same force as <i>"You should apologise"</i>?',
    options:['You ought to apologise.','You must apologise now.','You could apologise later.','You will apologise to him.'],
    answer:'You ought to apologise.',
    hint:'One of these gives the same gentle advice. The others make it weaker or stronger.',
    explanation:'<b>ought to</b> and <i>should</i> are near neighbours — both advise. "must" commands, and "could" only raises it as one option.' }),

  makeMCQ({ id:'g9eng-gx-017', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'Complete: <i>"When we lived in Curepipe, we ___ walk to school in the rain every day."</i>',
    options:['would','will','should','must'],
    answer:'would',
    hint:'A habit that repeated over and over in the past.',
    explanation:'<b>would</b> + verb describes a repeated past habit, much like "used to". The other three point to the present or to obligation.' }),

  makeMCQ({ id:'g9eng-gx-018', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'Complete: <i>"All entry forms ___ before Friday."</i>',
    options:['must be submitted','must submit','must to submit','must submitting'],
    answer:'must be submitted',
    hint:'The forms do not do the submitting; something is done to them.',
    explanation:'The forms receive the action, so the passive is needed: <b>must be submitted</b>. A bare infinitive follows the modal, then <i>be</i> + past participle.' }),

  makeMCQ({ id:'g9eng-gx-019', chapterId:'g9eng-gr-modals', difficulty:4,
    question:'Which pair of sentences means the <b>same</b> thing?',
    options:['You needn\'t stay. / You don\'t have to stay.','You needn\'t stay. / You mustn\'t stay.','You mustn\'t stay. / You don\'t have to stay.','You can\'t stay. / You needn\'t stay.'],
    answer:'You needn\'t stay. / You don\'t have to stay.',
    hint:'Sort them into "no obligation" and "forbidden" first.',
    explanation:'<b>needn\'t</b> and <b>don\'t have to</b> both remove an obligation. "mustn\'t" and "can\'t" forbid. Treating those two groups as interchangeable reverses your meaning.' }),

  makeMCQ({ id:'g9eng-gx-020', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'Complete: <i>"You ___ hurry — the ferry leaves in four minutes."</i>',
    options:['had better','had rather','would better','should better'],
    answer:'had better',
    hint:'Three of these are not real phrases in English.',
    explanation:'<b>had better</b> gives urgent advice with a warning attached. It is fixed — no other word replaces "had", and it takes a bare infinitive ("better hurry", not "better to hurry").' }),

  makeMCQ({ id:'g9eng-gx-021', chapterId:'g9eng-gr-modals', difficulty:4,
    question:'Order these from <b>least</b> certain to <b>most</b> certain:<br><i>(P) She must be at home. (Q) She might be at home. (R) She is at home.</i>',
    options:['Q, P, R','P, Q, R','R, Q, P','Q, R, P'],
    answer:'Q, P, R',
    hint:'A plain statement claims more than any of the modal versions.',
    explanation:'<b>might</b> is a bare possibility, <b>must</b> is a confident conclusion from evidence, and a plain statement claims the fact outright. Adding "must" actually makes a claim <i>weaker</i> than saying nothing.' }),

  makeMCQ({ id:'g9eng-gx-022', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'A sign reads: <i>"Visitors must not feed the tortoises."</i><br>Which rewriting keeps the rule intact?',
    options:['Visitors are forbidden to feed them.','Visitors need not feed them.','Visitors do not have to feed them.','Visitors might not feed them.'],
    answer:'Visitors are forbidden to feed them.',
    hint:'Does the sign ban the act, or merely excuse you from it?',
    explanation:'<b>must not</b> forbids. The other three only say feeding is not required, which would let a visitor do it anyway — the opposite of what the sign intends.' }),

  makeMCQ({ id:'g9eng-gx-023', chapterId:'g9eng-gr-modals', difficulty:2,
    question:'You are asking a stranger for a small favour on the bus.<br>Which sounds least abrupt?',
    options:['Could you move up a little?','Can you move up a little?','Move up a little.','You must move up.'],
    answer:'Could you move up a little?',
    hint:'The past-tense form is the polite one here, even though nothing is in the past.',
    explanation:'<b>Could you</b> softens a request to a stranger. English regularly uses a past form for present politeness — the distance in tense stands in for social distance.' }),

  makeMCQ({ id:'g9eng-gx-024', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'The queue has not moved for an hour and the office shuts at four.<br>Complete: <i>"We ___ come back tomorrow."</i>',
    options:['might as well','might so well','may as good','could as well'],
    answer:'might as well',
    hint:'A fixed phrase for "there is no better option left".',
    explanation:'<b>might as well</b> proposes the only sensible course when nothing better remains. The wording is fixed; the alternatives are not English.' }),

  makeMCQ({ id:'g9eng-gx-025', chapterId:'g9eng-gr-modals', difficulty:4,
    question:'Complete: <i>"I\'d rather you ___ tell anyone about this yet."</i>',
    options:['didn\'t','don\'t','won\'t','wouldn\'t'],
    answer:'didn\'t',
    hint:'After "I\'d rather you", English uses a past form for a present wish.',
    explanation:'<b>I\'d rather you didn\'t</b> — the past form carries a present meaning, the same trick as "It\'s time we left". It is a preference about now, not about the past.' }),

  makeMCQ({ id:'g9eng-gx-026', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'<i>"I can swim,"</i> Amrita said.<br>Report her words.',
    options:['Amrita said she could swim.','Amrita said she can swim.','Amrita said she should swim.','Amrita said she may swim.'],
    answer:'Amrita said she could swim.',
    hint:'The reporting verb moved back in time. What happens to the word after it?',
    explanation:'When the reporting verb is past, <b>can</b> shifts to <b>could</b>. The meaning is unchanged — she still has the ability; only the viewpoint has moved.' }),

  makeMCQ({ id:'g9eng-gx-027', chapterId:'g9eng-gr-modals', difficulty:4,
    question:'Complete: <i>"If I had known the road was flooded, I ___ another route."</i>',
    options:['would have taken','will have taken','would take','had taken'],
    answer:'would have taken',
    hint:'This is about a past that never actually happened.',
    explanation:'An unreal past needs <b>would have</b> + past participle in the result clause, matching the "had known" in the if-clause. Both halves must sit in the past for the sentence to hold together.' }),

  makeMCQ({ id:'g9eng-gx-028', chapterId:'g9eng-gr-modals', difficulty:4,
    question:'Mud is on the doormat, the umbrella is wet, and Kavi\'s shoes are missing.<br>Which conclusion is best supported?',
    options:['He must have gone out in the rain.','He might have gone out in the rain.','He can\'t have gone out in the rain.','He should have gone out in the rain.'],
    answer:'He must have gone out in the rain.',
    hint:'Three separate clues all point the same way. How confident does that let you be?',
    explanation:'Three pieces of evidence agreeing make this a firm conclusion, so <b>must have</b> fits. "might have" would understate what the evidence supports, and "can\'t have" contradicts it.' }),

  makeMCQ({ id:'g9eng-gx-029', chapterId:'g9eng-gr-modals', difficulty:3,
    question:'Which sentence uses its verb correctly after the first word?',
    options:['She may leave at noon.','She may to leave at noon.','She may leaving at noon.','She may leaves at noon.'],
    answer:'She may leave at noon.',
    hint:'Look at what comes immediately after the first verb.',
    explanation:'These verbs take a <b>bare infinitive</b> — no <i>to</i>, no <i>-ing</i>, and no <i>-s</i> even for he/she/it. "She may leaves" is the commonest slip of the four.' }),

  makeMCQ({ id:'g9eng-gx-030', chapterId:'g9eng-gr-modals', difficulty:4,
    question:'Which rewriting of <i>"It is possible that the ferry was cancelled"</i> is closest in meaning?',
    options:['The ferry may have been cancelled.','The ferry must have been cancelled.','The ferry can\'t have been cancelled.','The ferry should have been cancelled.'],
    answer:'The ferry may have been cancelled.',
    hint:'Keep the uncertainty, keep the past, and keep the ferry as the thing acted upon.',
    explanation:'Three things must survive the rewrite: possibility (<b>may</b>), past time (<b>have been</b>) and the passive. Only the first option keeps all three.' }),

  // ══════════════════════════════════════════════════════════════════════════
  //  ADJECTIVES USED AS NOUNS · g9eng-gr-adjectives · 25 items
  //  subsection: adjectives_as_nouns  (the ONLY declared subsection)
  // ══════════════════════════════════════════════════════════════════════════

  makeMCQ({ id:'g9eng-gx-031', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:3,
    question:'Complete: <i>"The elderly ___ often the first to be affected by a cyclone."</i>',
    options:['are','is','was','has'],
    answer:'are',
    hint:'Is the phrase pointing at one person or at a whole group?',
    explanation:'<b>The elderly</b> means elderly people as a group, so it takes a plural verb: <i>the elderly are</i>. It has no <i>-s</i>, which is what makes the trap work.' }),

  makeMCQ({ id:'g9eng-gx-032', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:3,
    question:'Which sentence is written correctly?',
    options:['The poor need our help.','The poor needs our help.','The poors need our help.','A poor needs our help.'],
    answer:'The poor need our help.',
    hint:'You cannot add "-s" to it, and you cannot put "a" in front of it.',
    explanation:'<b>The poor</b> is already plural in sense — no <i>-s</i> is added and it never takes <i>a</i>. To speak of one person you would say "a poor man" or "a poor family".' }),

  makeMCQ({ id:'g9eng-gx-033', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
    question:'Complete: <i>"The accused ___ denied every charge against him."</i>',
    options:['has','have','were','are'],
    answer:'has',
    hint:'The words "against him" tell you how many people are involved.',
    explanation:'Most of these phrases are plural, but <b>the accused</b> can be one person, and "him" fixes it as singular here — so <i>has</i>. The same holds for <i>the deceased</i>.' }),

  makeMCQ({ id:'g9eng-gx-034', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
    question:'Complete: <i>"The Dutch ___ built dykes for centuries."</i>',
    options:['have','has','is','was'],
    answer:'have',
    hint:'The word names a whole people, not a country.',
    explanation:'Nationality words like <b>the Dutch, the French, the British</b> stand for the people as a group and take a plural verb. Compare "Dutch cheese", where the word is simply describing.' }),

  makeMCQ({ id:'g9eng-gx-035', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:3,
    question:'Complete: <i>"The unemployed ___ entitled to apply for the scheme."</i>',
    options:['are','is','has','was'],
    answer:'are',
    hint:'One person, or everybody in that situation?',
    explanation:'<b>The unemployed</b> covers all such people, so the verb is plural. For a single person you would need "an unemployed worker".' }),

  makeMCQ({ id:'g9eng-gx-036', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
    question:'Complete: <i>"The unknown ___ always been frightening to children."</i>',
    options:['has','have','were','are'],
    answer:'has',
    hint:'This one names an idea, not a group of people.',
    explanation:'<b>The unknown</b> is an abstract thing, so it is singular: <i>the unknown has</i>. The same applies to <i>the impossible</i> and <i>the supernatural</i> — an idea, not a crowd.' }),

  makeMCQ({ id:'g9eng-gx-037', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:3,
    question:'Repair this sentence: <i>"The injured was taken to hospital in three ambulances."</i>',
    options:['The injured were taken to hospital','The injureds were taken to hospital','An injured was taken to hospital','The injured person were taken'],
    answer:'The injured were taken to hospital',
    hint:'Three ambulances tells you how many people there were.',
    explanation:'Three ambulances means several people, so the verb must be plural: <b>the injured were</b>. The phrase itself never changes shape — only the verb tells you the number.' }),

  makeMCQ({ id:'g9eng-gx-038', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
    question:'Which sentence changes meaning if <i>"the"</i> is removed?',
    options:['The blind rely on sound.','The bus was late again.','The rain fell all night.','The teacher marked it.'],
    answer:'The blind rely on sound.',
    hint:'In one of these, "the" is doing more than pointing at something known.',
    explanation:'In <b>the blind</b>, the word <i>the</i> is what turns a describing word into a name for a group. Remove it and "blind rely on sound" collapses. In the others "the" only points to something already known.' }),

  makeMCQ({ id:'g9eng-gx-039', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:3,
    question:'Complete: <i>"The best ___ yet to come."</i>',
    options:['is','are','were','have'],
    answer:'is',
    hint:'Is this a group of people, or one single thing still ahead?',
    explanation:'Here <b>the best</b> means the best part or time — one thing — so the verb is singular. Compare "the best are chosen for the team", where it means people.' }),

  makeMCQ({ id:'g9eng-gx-040', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
    question:'Which sentence uses <i>"the young"</i> correctly?',
    options:['The young are leaving the village.','The young is leaving the village.','The youngs are leaving.','A young is leaving the village.'],
    answer:'The young are leaving the village.',
    hint:'Rule out any version that adds a letter or puts "a" in front.',
    explanation:'<b>The young</b> takes a plural verb, never an <i>-s</i>, and never <i>a</i>. Three of the four options break one of those rules.' }),

  makeMCQ({ id:'g9eng-gx-041', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
    question:'In which sentence does <i>"the French"</i> mean the <b>people</b>?',
    options:['The French eat late in the evening.','The French bread went stale quickly.','The French lesson was cancelled today.','The French coast is very rocky here.'],
    answer:'The French eat late in the evening.',
    hint:'In three of these the word is describing the thing that follows it.',
    explanation:'Only in the first does <b>the French</b> stand alone as the subject and mean the people, taking the plural <i>eat</i>. Elsewhere it describes bread, a lesson or a coast.' }),

  makeMCQ({ id:'g9eng-gx-042', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:3,
    question:'Complete: <i>"The deceased ___ survived by his wife and two daughters."</i>',
    options:['is','are','were','have'],
    answer:'is',
    hint:'"his wife" points to one person.',
    explanation:'<b>The deceased</b> is one person here, shown by "his", so the verb is singular. It joins <i>the accused</i> as an exception to the usual plural pattern.' }),

  makeMCQ({ id:'g9eng-gx-043', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
    question:'One line is wrong.<br><i>(1) The rich pay more tax. (2) The homeless needs shelter. (3) The brave are remembered. (4) The wounded were carried out.</i>',
    options:['Line 2','Line 1','Line 3','Line 4'],
    answer:'Line 2',
    hint:'Check each verb against the group it belongs to.',
    explanation:'It should be <b>The homeless need shelter</b>. Every phrase here names a group and takes a plural verb; only line 2 uses a singular one.' }),

  makeMCQ({ id:'g9eng-gx-044', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:3,
    question:'Rewrite <i>"People who cannot hear"</i> as two words.',
    options:['the deaf','deaf people','a deaf','the deafs'],
    answer:'the deaf',
    hint:'Two words only, and the first is a very short one.',
    explanation:'<b>The deaf</b> names the whole group in two words. "deaf people" is correct English but is not the construction asked for, and the other two are not English at all.' }),

  makeMCQ({ id:'g9eng-gx-045', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
    question:'Complete: <i>"He always sides with the underdog and defends ___ who cannot defend themselves."</i>',
    options:['those','that','the ones which','them'],
    answer:'those',
    hint:'The word must be plural and must be able to carry "who" after it.',
    explanation:'<b>those who</b> is the standard pairing for "the people who". "themselves" later in the sentence confirms a plural is needed.' }),

  makeMCQ({ id:'g9eng-gx-046', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:3,
    question:'Complete: <i>"Only the fittest ___ the long dry season."</i>',
    options:['survive','survives','has survived','is surviving'],
    answer:'survive',
    hint:'The phrase means all the creatures that are fittest, not one of them.',
    explanation:'<b>The fittest</b> names a group, so the verb is plural. A superlative used this way behaves exactly like "the rich" or "the young".' }),

  makeMCQ({ id:'g9eng-gx-047', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
    question:'Which sentence is <b>ambiguous</b> about how many people it means?',
    options:['The accused arrived at ten.','The poor need our help.','The elderly are at risk.','The wounded were carried out.'],
    answer:'The accused arrived at ten.',
    hint:'Three sentences settle the number through the verb. One does not.',
    explanation:'<b>arrived</b> looks the same for one person or many, and <i>the accused</i> can be either — so the sentence does not say. The other three are fixed as plural by <i>need, are, were</i>.' }),

  makeMCQ({ id:'g9eng-gx-048', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:3,
    question:'Complete: <i>"The government has promised new housing for the homeless and better care for ___."</i>',
    options:['the sick','the sicks','a sick','sick\'s'],
    answer:'the sick',
    hint:'Match the pattern already used earlier in the same sentence.',
    explanation:'<b>The sick</b> matches "the homeless" alongside it. Keeping both halves in the same shape is what makes the sentence balance.' }),

  makeMCQ({ id:'g9eng-gx-049', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
    question:'Complete: <i>"The impossible ___ longer than the difficult, but we finish it too."</i>',
    options:['takes','take','have taken','were taking'],
    answer:'takes',
    hint:'Not a group of people this time — a kind of task.',
    explanation:'<b>The impossible</b> names an abstract category, so it is singular: <i>takes</i>. Notice "the difficult" in the same sentence works the same way.' }),

  makeMCQ({ id:'g9eng-gx-050', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:3,
    question:'Which sentence would a newspaper headline use?',
    options:['Aid reaches the stranded','Aid reaches the strandeds','Aid reaches a stranded','Aid reaches stranded'],
    answer:'Aid reaches the stranded',
    hint:'Headlines keep the short form that names the group.',
    explanation:'<b>The stranded</b> names everyone in that position in two words, which is why headlines favour it. No <i>-s</i>, and <i>the</i> cannot be dropped.' }),

  makeMCQ({ id:'g9eng-gx-051', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
    question:'Which sentence pairs its verb correctly with <b>both</b> its subjects?',
    options:['The old and the young are treated alike.','The old and the young is treated alike.','The olds and the youngs are treated.','An old and a young are treated alike.'],
    answer:'The old and the young are treated alike.',
    hint:'Two groups joined by "and" make how many?',
    explanation:'Each phrase is already plural and "and" joins them, so the verb stays plural. Neither phrase can take an <i>-s</i> or an <i>a</i>.' }),

  makeMCQ({ id:'g9eng-gx-052', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:3,
    question:'Complete: <i>"The British ___ tea in enormous quantities."</i>',
    options:['drink','drinks','is drinking','has drunk'],
    answer:'drink',
    hint:'The word stands for the people of a country.',
    explanation:'<b>The British</b> means the British people, so the verb is plural: <i>drink</i>. The same pattern covers the Irish, the Welsh, the Spanish and the Japanese.' }),

  makeMCQ({ id:'g9eng-gx-053', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
    question:'Which sentence keeps the meaning of <i>"Wealthy people should help people who are poor"</i>?',
    options:['The rich should help the poor.','The riches should help the poors.','A rich should help a poor.','Rich should help poor.'],
    answer:'The rich should help the poor.',
    hint:'Both groups need the same small word in front, and neither takes an ending.',
    explanation:'<b>The rich</b> and <b>the poor</b> each name a whole group. Dropping <i>the</i> or adding <i>-s</i> breaks the construction, and <i>a</i> would point at one person.' }),

  makeMCQ({ id:'g9eng-gx-054', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:4,
    question:'In <i>"The wounded were carried to the church, where the dying lay in rows"</i>, how many groups are named?',
    options:['Two','One','Three','None'],
    answer:'Two',
    hint:'Look for the pattern "the" + describing word standing on its own.',
    explanation:'<b>The wounded</b> and <b>the dying</b> are both groups formed this way. "the church" is an ordinary noun, so it does not count.' }),

  makeMCQ({ id:'g9eng-gx-055', chapterId:'g9eng-gr-adjectives', subsection:'adjectives_as_nouns', difficulty:3,
    question:'Complete: <i>"The very rich rarely ___ the same schools as everyone else."</i>',
    options:['attend','attends','has attended','is attending'],
    answer:'attend',
    hint:'"very" describes the group but does not change how many there are.',
    explanation:'Adding <i>very</i> does not alter the number — <b>the very rich</b> is still a plural group and takes <i>attend</i>.' }),

  // ══════════════════════════════════════════════════════════════════════════
  //  NOUNS IN APPOSITION · g9eng-gr-nouns · 22 items
  //  subsection: apposition  (the ONLY declared subsection)
  // ══════════════════════════════════════════════════════════════════════════

  makeMCQ({ id:'g9eng-gx-056', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'What does <i>"My sister Anita lives in Vacoas"</i> tell you that <i>"My sister, Anita, lives in Vacoas"</i> does not?',
    options:['The writer has more than one sister','The writer has only one sister here','Anita is the eldest of the sisters','Anita does not live alone in Vacoas'],
    answer:'The writer has more than one sister',
    hint:'The commas are the only difference. What work are they doing?',
    explanation:'Without commas the name <b>identifies which</b> sister, so there must be others. With commas it is extra information, implying only one sister. The punctuation carries the fact.' }),

  makeMCQ({ id:'g9eng-gx-057', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'Complete correctly: <i>"Mauritius, one of the Mascarene Islands, ___ a volcanic origin."</i>',
    options:['has','have','are having','were having'],
    answer:'has',
    hint:'Cover the part between the commas and read what is left.',
    explanation:'The phrase between commas is extra and does not change the subject — <b>Mauritius has</b>. The nearby plural "Islands" is a decoy; the verb never agrees with it.' }),

  makeMCQ({ id:'g9eng-gx-058', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:3,
    question:'Which version makes clear that the school has exactly one deputy head?',
    options:['The deputy head, Mrs Ah Fat, signed it.','The deputy head Mrs Ah Fat signed it.','The deputy head Mrs Ah Fat, signed it.','The deputy head, Mrs Ah Fat signed it.'],
    answer:'The deputy head, Mrs Ah Fat, signed it.',
    hint:'Extra information needs a comma at both ends.',
    explanation:'Paired commas mark the name as extra, which implies there is only one deputy head. The two half-punctuated versions are simply wrong, and the unpunctuated one implies several deputies.' }),

  makeMCQ({ id:'g9eng-gx-059', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'Join into one sentence: <i>"Rodrigues is part of Mauritius. It lies 560 km to the east."</i>',
    options:['Rodrigues, part of Mauritius, lies 560 km east.','Rodrigues is part of Mauritius, lies 560 km east.','Rodrigues part of Mauritius lies 560 km east.','Rodrigues, part of Mauritius lies 560 km east.'],
    answer:'Rodrigues, part of Mauritius, lies 560 km east.',
    hint:'One fact becomes the main clause; the other slots in between commas.',
    explanation:'The first fact folds into a phrase between paired commas, leaving one main verb. The second option leaves two verbs with no conjunction, which is a run-on.' }),

  makeMCQ({ id:'g9eng-gx-060', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'Complete: <i>"___, the pupils of Form III, wish to thank you."</i>',
    options:['We','Us','Our','Ourselves'],
    answer:'We',
    hint:'Take out the phrase between commas and see which word can start the sentence.',
    explanation:'Strip the extra phrase and you get "<b>We</b> wish to thank you". The following phrase renames the subject but cannot change its form — "Us wish" is impossible.' }),

  makeMCQ({ id:'g9eng-gx-061', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'Complete: <i>"The prize was shared between the two winners, Devi and ___."</i>',
    options:['me','I','myself','mine'],
    answer:'me',
    hint:'The phrase renames "the two winners", which follows "between".',
    explanation:'"the two winners" is the object of <i>between</i>, so the words renaming it must be object forms: Devi and <b>me</b>. "I" is a common overcorrection here.' }),

  makeMCQ({ id:'g9eng-gx-062', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:3,
    question:'Which sentence puts the extra phrase at the <b>start</b> correctly?',
    options:['A keen fisherman, my uncle rises at four.','A keen fisherman my uncle rises at four.','A keen fisherman, my uncle, rises at four.','My uncle a keen fisherman rises at four.'],
    answer:'A keen fisherman, my uncle rises at four.',
    hint:'When the phrase opens the sentence, only one comma is needed.',
    explanation:'Opening with the phrase needs a single comma before the subject it describes. Two commas would wrongly cut the subject out of its own sentence.' }),

  makeMCQ({ id:'g9eng-gx-063', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'Which sentence could confuse a reader about how many people were present?',
    options:['My friend Jenny and I went.','My friend, Jenny, and I went.','Jenny, my friend, and I went.','My friend Jenny came with me.'],
    answer:'My friend, Jenny, and I went.',
    hint:'Commas can mark extra information — or separate items in a list.',
    explanation:'With commas on both sides, "Jenny" reads either as a renaming of "my friend" (two people) or as a third item in a list (three). Removing the commas settles it at two.' }),

  makeMCQ({ id:'g9eng-gx-064', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:3,
    question:'Which punctuation mark gives the phrase the most emphasis?',
    options:['One thing mattered — his honour.','One thing mattered, his honour.','One thing mattered; his honour.','One thing mattered his honour.'],
    answer:'One thing mattered — his honour.',
    hint:'Which mark makes a reader pause longest before the phrase?',
    explanation:'A <b>dash</b> creates the sharpest pause and throws weight onto what follows. A comma is neutral, a semicolon wrongly implies a full clause follows, and the last has no punctuation at all.' }),

  makeMCQ({ id:'g9eng-gx-065', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'Complete: <i>"Two subjects, mathematics and physics, ___ compulsory this year."</i>',
    options:['are','is','was','has been'],
    answer:'are',
    hint:'Read the sentence with the middle phrase removed.',
    explanation:'The subject is "<b>Two subjects</b>", which is plural, so the verb is <i>are</i>. The renaming phrase between the commas never controls the verb.' }),

  makeMCQ({ id:'g9eng-gx-066', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'Complete: <i>"One island, the smallest of the group, ___ still uninhabited."</i>',
    options:['is','are','were','have been'],
    answer:'is',
    hint:'Ignore everything between the commas.',
    explanation:'The subject is "<b>One island</b>" — singular, so <i>is</i>. "the group" sits inside the extra phrase and cannot reach the verb.' }),

  makeMCQ({ id:'g9eng-gx-067', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:3,
    question:'Repair: <i>"Port Louis the capital of Mauritius was founded in 1735."</i>',
    options:['Port Louis, the capital of Mauritius, was','Port Louis the capital of Mauritius, was','Port Louis, the capital of Mauritius was','Port Louis, the capital, of Mauritius was'],
    answer:'Port Louis, the capital of Mauritius, was',
    hint:'The extra phrase needs closing as well as opening.',
    explanation:'The renaming phrase must be fenced by a comma at each end. Opening without closing leaves the reader unsure where the phrase stops.' }),

  makeMCQ({ id:'g9eng-gx-068', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'Which sentence means the writer owns <b>several</b> dogs?',
    options:['My dog Bruno bit the postman.','My dog, Bruno, bit the postman.','Bruno, my dog, bit the postman.','My dog — Bruno — bit the postman.'],
    answer:'My dog Bruno bit the postman.',
    hint:'No commas means the name is needed to say which one.',
    explanation:'Without punctuation the name is doing identifying work, which only makes sense if there are others. Every punctuated version treats the name as extra, implying a single dog.' }),

  makeMCQ({ id:'g9eng-gx-069', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:3,
    question:'Which mark best introduces a phrase that <b>explains</b> what came before?',
    options:['She had one ambition: to fly.','She had one ambition, to fly.','She had one ambition; to fly.','She had one ambition. To fly.'],
    answer:'She had one ambition: to fly.',
    hint:'One mark says "here it comes".',
    explanation:'A <b>colon</b> announces the explanation that follows. A semicolon needs a complete clause after it, and the full stop leaves a fragment.' }),

  makeMCQ({ id:'g9eng-gx-070', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'Shorten <i>"Mr Sooriah, who is our neighbour, repaired it"</i> without losing meaning.',
    options:['Mr Sooriah, our neighbour, repaired it.','Mr Sooriah our neighbour repaired it.','Mr Sooriah, our neighbour repaired it.','Mr Sooriah is our neighbour repaired it.'],
    answer:'Mr Sooriah, our neighbour, repaired it.',
    hint:'Delete "who is" and keep both commas.',
    explanation:'Dropping <i>who is</i> from a non-defining clause leaves a renaming phrase, and it keeps the paired commas the clause already had.' }),

  makeMCQ({ id:'g9eng-gx-071', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'Complete: <i>"The committee, together with its chairman, ___ agreed to meet."</i>',
    options:['has','have','were','are'],
    answer:'has',
    hint:'"together with" is not the same as "and".',
    explanation:'<b>together with</b> adds extra information without adding to the subject, so "The committee" stays singular: <i>has</i>. Only <i>and</i> would make it plural.' }),

  makeMCQ({ id:'g9eng-gx-072', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:3,
    question:'Which sentence is punctuated correctly?',
    options:['His best friend, a doctor, lives here.','His best friend a doctor, lives here.','His best friend, a doctor lives here.','His best friend a doctor lives here.'],
    answer:'His best friend, a doctor, lives here.',
    hint:'Count the commas around the extra phrase.',
    explanation:'The phrase "a doctor" renames "his best friend" and needs a comma on each side. Any other arrangement leaves the boundary open.' }),

  makeMCQ({ id:'g9eng-gx-073', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'One line is punctuated wrongly.<br><i>(1) Anil, my cousin, called. (2) The poet Ramdin spoke. (3) Our teacher Mrs Li, retired. (4) Dodo, a lost bird, is famous.</i>',
    options:['Line 3','Line 1','Line 2','Line 4'],
    answer:'Line 3',
    hint:'Each line must use either two commas or none.',
    explanation:'Line 3 opens no comma but closes one. It needs either <b>Our teacher, Mrs Li, retired</b> or <b>Our teacher Mrs Li retired</b> — the two choices mean different things, but both are consistent.' }),

  makeMCQ({ id:'g9eng-gx-074', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'Complete: <i>"They gave the award to the three finalists, Amal, Beena and ___."</i>',
    options:['her','she','hers','herself'],
    answer:'her',
    hint:'The names rename "the three finalists", which follows "to".',
    explanation:'"the three finalists" is governed by <i>to</i>, so the renaming names take object form: Amal, Beena and <b>her</b>.' }),

  makeMCQ({ id:'g9eng-gx-075', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:3,
    question:'Which sentence keeps its meaning when the middle phrase is deleted?',
    options:['Ravi, our captain, scored twice.','Ravi our captain scored twice.','The captain who scored twice left.','Whoever scored twice left early.'],
    answer:'Ravi, our captain, scored twice.',
    hint:'Try removing the words between the commas and see if a sentence survives.',
    explanation:'Delete "our captain" and "<b>Ravi scored twice</b>" still stands — that is the test for a genuinely extra phrase. The others lose necessary information.' }),

  makeMCQ({ id:'g9eng-gx-076', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'Complete: <i>"Neither of the boys, both keen swimmers, ___ willing to enter."</i>',
    options:['was','were','have been','are'],
    answer:'was',
    hint:'The subject is the first word, not the phrase between commas.',
    explanation:'The subject is <b>Neither</b>, which is singular, so the verb is <i>was</i>. "both keen swimmers" is extra information and "the boys" sits inside a phrase, so neither can reach the verb.' }),

  makeMCQ({ id:'g9eng-gx-077', chapterId:'g9eng-gr-nouns', subsection:'apposition', difficulty:4,
    question:'Why is <i>"The novelist, Ramesh, won the prize"</i> risky if several novelists were entered?',
    options:['The commas imply only one novelist','The commas imply several novelists','The name should come first','The verb should be plural'],
    answer:'The commas imply only one novelist',
    hint:'Paired commas mark the name as information you could do without.',
    explanation:'Paired commas make the name droppable, which tells the reader "the novelist" already picks out one person. With several entered, write <b>The novelist Ramesh won the prize</b> instead.' }),

  // ══════════════════════════════════════════════════════════════════════════
  //  DETERMINERS, ARTICLES, QUANTIFIERS · g9eng-gr-determiners · 24 items
  //  NO subsection (none declared for this chapter)
  // ══════════════════════════════════════════════════════════════════════════

  makeMCQ({ id:'g9eng-gx-078', chapterId:'g9eng-gr-determiners', difficulty:3,
    question:'Complete: <i>"Neither of the two supermarkets ___ open on Sunday."</i>',
    options:['was','were','have been','are'],
    answer:'was',
    hint:'The subject is the first word, not the plural noun after "of".',
    explanation:'<b>Neither</b> is the subject and is singular, so the verb is <i>was</i>. "supermarkets" sits inside a phrase and cannot control the verb.' }),

  makeMCQ({ id:'g9eng-gx-079', chapterId:'g9eng-gr-determiners', difficulty:3,
    question:'Complete: <i>"Each of the candidates ___ given fifteen minutes."</i>',
    options:['was','were','have been','are'],
    answer:'was',
    hint:'"Each" looks at them one at a time.',
    explanation:'<b>Each</b> always takes a singular verb, however many people follow it. The plural noun after <i>of</i> is a decoy.' }),

  makeMCQ({ id:'g9eng-gx-080', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Which sentence uses the right word for a countable thing?',
    options:['There were fewer cars on the road.','There were less cars on the road.','There was fewer traffic today.','There was less cars today.'],
    answer:'There were fewer cars on the road.',
    hint:'Can you count them one by one, or only measure them?',
    explanation:'<b>fewer</b> goes with things you can count (cars); <i>less</i> goes with quantities you measure (traffic, water, time). The verb must match too.' }),

  makeMCQ({ id:'g9eng-gx-081', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Complete: <i>"A number of pupils ___ still waiting outside."</i>',
    options:['are','is','was','has been'],
    answer:'are',
    hint:'Does the sentence mean "several pupils" or "a total"?',
    explanation:'<b>A number of</b> means "several" and takes a plural verb. Compare "<i>The</i> number of pupils <b>is</b> rising", which names one total and is singular.' }),

  makeMCQ({ id:'g9eng-gx-082', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Complete: <i>"The number of tourists ___ sharply since January."</i>',
    options:['has risen','have risen','are rising','were rising'],
    answer:'has risen',
    hint:'The subject is a single figure, not the tourists themselves.',
    explanation:'<b>The number</b> is one quantity, so the verb is singular. Swapping <i>the</i> for <i>a</i> flips the whole sentence to plural — one word changes the agreement.' }),

  makeMCQ({ id:'g9eng-gx-083', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Which pair of sentences is <b>both</b> correct?',
    options:['I drink milk daily. / The milk had turned sour.','I drink the milk daily. / Milk had turned sour.','I drink milk daily. / Milk had turned sour.','I drink the milk daily. / The milk had turned sour.'],
    answer:'I drink milk daily. / The milk had turned sour.',
    hint:'One sentence talks about milk in general; the other about one particular lot.',
    explanation:'Speaking generally takes no article — <i>I drink milk</i>. Pointing at a specific quantity takes <b>the</b> — <i>The milk had turned sour</i>. The same noun switches on meaning alone.' }),

  makeMCQ({ id:'g9eng-gx-084', chapterId:'g9eng-gr-determiners', difficulty:3,
    question:'Complete: <i>"We sailed past ___ Seychelles on the way north."</i>',
    options:['the','a','an','no word'],
    answer:'the',
    hint:'The name covers a whole group of islands.',
    explanation:'Groups of islands take <b>the</b> — the Seychelles, the Mascarenes, the Maldives. A single island does not: we say simply <i>Mauritius</i>.' }),

  makeMCQ({ id:'g9eng-gx-085', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Three of these place names normally take <i>the</i> in front of them.<br>Which one does <b>not</b>?',
    options:['Mauritius','Seychelles','Netherlands','Mascarenes'],
    answer:'Mauritius',
    hint:'Look at which names stand for a group rather than a single place.',
    explanation:'A single island or country takes no article — we say simply <i>Mauritius</i>. But <b>the</b> is needed for island groups (the Seychelles, the Mascarenes) and for plural country names (the Netherlands, the Philippines).' }),

  makeMCQ({ id:'g9eng-gx-086', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Which sentence means the child is there as a <b>pupil</b>?',
    options:['She goes to school by bus.','She goes to the school by bus.','She goes to a school by bus.','She goes to that school by bus.'],
    answer:'She goes to school by bus.',
    hint:'Dropping the small word changes it from a building to an activity.',
    explanation:'<b>go to school</b> with no article means attend as a pupil. <i>Go to the school</i> means visit the building — a parent collecting a child does that too.' }),

  makeMCQ({ id:'g9eng-gx-087', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Complete: <i>"Every one of the entries ___ been checked twice."</i>',
    options:['has','have','were','are'],
    answer:'has',
    hint:'"Every one" separates them into individuals.',
    explanation:'<b>Every one</b> is singular, so the verb is <i>has</i>. Written as one word, "everyone" is also singular — either way the plural after <i>of</i> is a decoy.' }),

  makeMCQ({ id:'g9eng-gx-088', chapterId:'g9eng-gr-determiners', difficulty:3,
    question:'Complete: <i>"Both of the roads ___ blocked by the landslide."</i>',
    options:['were','was','has been','is'],
    answer:'were',
    hint:'This word covers the two of them together, not one at a time.',
    explanation:'<b>Both</b> takes a plural verb, unlike <i>each, every, either</i> and <i>neither</i>, which all take a singular one.' }),

  makeMCQ({ id:'g9eng-gx-089', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Complete: <i>"None of the water ___ fit to drink."</i>',
    options:['was','were','have been','are'],
    answer:'was',
    hint:'Can you count water?',
    explanation:'With a quantity you measure rather than count, <b>none</b> takes a singular verb. With countable things — "none of the bottles were full" — a plural is normal.' }),

  makeMCQ({ id:'g9eng-gx-090', chapterId:'g9eng-gr-determiners', difficulty:3,
    question:'Complete: <i>"I have two brothers. One is a teacher and ___ is a nurse."</i>',
    options:['the other','another','other','the another'],
    answer:'the other',
    hint:'There were exactly two, and one is already accounted for.',
    explanation:'With only one left, English uses <b>the other</b>. <i>Another</i> would mean one more from an open supply, which contradicts "two brothers".' }),

  makeMCQ({ id:'g9eng-gx-091', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Complete: <i>"I have finished this exercise. May I try ___?"</i>',
    options:['another','the other','other','the another'],
    answer:'another',
    hint:'Nothing tells you how many exercises exist altogether.',
    explanation:'<b>Another</b> asks for one more from an unlimited set. <i>The other</i> would only work if exactly two existed and one remained.' }),

  makeMCQ({ id:'g9eng-gx-092', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'One line is wrong.<br><i>(1) Each boy has a locker. (2) Every windows was shut. (3) Both doors are open. (4) Neither answer is right.</i>',
    options:['Line 2','Line 1','Line 3','Line 4'],
    answer:'Line 2',
    hint:'Check what kind of noun follows each opening word.',
    explanation:'It should be <b>Every window was shut</b>. <i>Every</i> and <i>each</i> are followed by a singular noun; only <i>both</i> takes a plural one.' }),

  makeMCQ({ id:'g9eng-gx-093', chapterId:'g9eng-gr-determiners', difficulty:3,
    question:'Complete: <i>"She was ___ best swimmer in the whole district."</i>',
    options:['the','a','an','no word'],
    answer:'the',
    hint:'Only one person can hold this position.',
    explanation:'A superlative names a unique position, so it takes <b>the</b>. The same rule covers "the first", "the only" and "the last".' }),

  makeMCQ({ id:'g9eng-gx-094', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Which sentence talks about bread <b>in general</b>?',
    options:['Bread is cheaper than rice.','The bread is cheaper than rice.','A bread is cheaper than rice.','Breads are cheaper than rice.'],
    answer:'Bread is cheaper than rice.',
    hint:'Generalisations about substances drop the small word entirely.',
    explanation:'Substances take no article when spoken of in general: <b>Bread is cheaper than rice</b>. Adding <i>the</i> would point at one particular loaf.' }),

  makeMCQ({ id:'g9eng-gx-095', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Complete: <i>"Either of the two routes ___ you to the coast."</i>',
    options:['takes','take','have taken','are taking'],
    answer:'takes',
    hint:'The word means "one or the other", not both at once.',
    explanation:'<b>Either</b> selects one of two and takes a singular verb: <i>takes</i>. Only <i>both</i> would make this plural.' }),

  makeMCQ({ id:'g9eng-gx-096', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Which sentence correctly describes a choice among <b>three or more</b>?',
    options:['Any of the six routes will do.','Either of the six routes will do.','Neither of the six routes will do.','Both of the six routes will do.'],
    answer:'Any of the six routes will do.',
    hint:'Three of these words are reserved for exactly two things.',
    explanation:'<b>Either, neither</b> and <b>both</b> all deal with exactly two. For three or more, English uses <i>any, none</i> and <i>all</i>.' }),

  makeMCQ({ id:'g9eng-gx-097', chapterId:'g9eng-gr-determiners', difficulty:3,
    question:'Complete: <i>"He plays ___ guitar but does not play ___ football."</i>',
    options:['the / no word','no word / the','the / the','a / a'],
    answer:'the / no word',
    hint:'Instruments and sports follow opposite rules.',
    explanation:'Musical instruments take <b>the</b> — <i>play the guitar</i> — while sports take no article — <i>play football</i>. There is no logic to it; it has to be learnt as a pair.' }),

  makeMCQ({ id:'g9eng-gx-098', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Which sentence means he is <b>serving a sentence</b>?',
    options:['His uncle is in prison.','His uncle is in the prison.','His uncle is in a prison.','His uncle is at the prison.'],
    answer:'His uncle is in prison.',
    hint:'Dropping the small word shifts it from a place to a situation.',
    explanation:'<b>in prison</b> with no article describes the situation of being a prisoner. <i>In the prison</i> merely places him inside the building — a visitor or a guard is there too.' }),

  makeMCQ({ id:'g9eng-gx-099', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Complete: <i>"Much of the harvest ___ ruined, though few of the trees ___ lost."</i>',
    options:['was / were','were / was','was / was','were / were'],
    answer:'was / were',
    hint:'One half measures a quantity; the other counts individual trees.',
    explanation:'<b>Much</b> goes with what you measure and takes a singular verb; <b>few</b> goes with what you count and takes a plural one. The sentence needs both rules at once.' }),

  makeMCQ({ id:'g9eng-gx-100', chapterId:'g9eng-gr-determiners', difficulty:3,
    question:'Complete: <i>"There is ___ milk left, so we can still make tea."</i>',
    options:['a little','a few','few','little'],
    answer:'a little',
    hint:'Milk is measured, not counted — and the news is good.',
    explanation:'<b>a little</b> means a small but sufficient amount of something measured. Dropping <i>a</i> reverses the tone: "little milk left" means almost none, which would contradict the second half.' }),

  makeMCQ({ id:'g9eng-gx-101', chapterId:'g9eng-gr-determiners', difficulty:4,
    question:'Which sentence suggests the writer is <b>disappointed</b> by the turnout?',
    options:['Few parents attended the meeting.','A few parents attended the meeting.','Some parents attended the meeting.','Several parents attended the meeting.'],
    answer:'Few parents attended the meeting.',
    hint:'One version stresses how small the number was; the others simply report it.',
    explanation:'<b>Few</b> without <i>a</i> carries a negative judgement — hardly any. <b>A few</b>, <i>some</i> and <i>several</i> report the same number neutrally. One missing word changes the tone entirely.' })

);
})();
