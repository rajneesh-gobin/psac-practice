'use strict';
(function () {

  // Level 4 — "Extended Analysis" — for four grammar chapters that had little or
  // none of it. Nothing here can be answered by recognising a rule: every item
  // puts TWO rules in the same sentence and makes the pupil decide which one the
  // sentence has already settled. A reflexive is weighed against an emphatic use
  // of the same word; a relative pronoun is decided by the verb that follows it,
  // not by the noun in front of it; a modal of deduction is graded by the
  // evidence printed beside it.

  STATIC_QUESTIONS.push(

    // ══ g9eng-gr-pronouns · reflexive (001–006) ═══════════════════════════

    makeMCQ({ id:'g9eng-d5-001', chapterId:'g9eng-gr-pronouns', subsection:'reflexive', difficulty:4,
      question:'Both gaps take a pronoun, but not the same kind. &ldquo;Ravi bought ___ a new notebook, and then he bought his sister ___ one too.&rdquo;',
      options:['himself / her','him / her','himself / herself','him / herself'],
      answer:'himself / her',
      hint:'Decide for each gap separately whether the person receiving the notebook is the same person as the subject.',
      explanation:'The subject of both clauses is <b>Ravi</b>. In the first gap the buyer and the receiver are the same person, so English requires the reflexive <b>himself</b>. In the second the receiver is his sister, a different person, so the ordinary object pronoun <b>her</b> is right. &ldquo;Herself&rdquo; would say that the sister bought it for herself, which contradicts &ldquo;he bought&rdquo;. One sentence, two gaps, two different rules.' }),

    makeTF({ id:'g9eng-d5-002', chapterId:'g9eng-gr-pronouns', subsection:'reflexive', difficulty:4,
      question:'True or False: in &ldquo;The manager saw himself in the mirror&rdquo; and &ldquo;The manager saw him in the mirror&rdquo;, the words <i>himself</i> and <i>him</i> point at the same person.',
      answer:false,
      hint:'Work out who each pronoun can legally refer to before you decide whether the two sentences describe the same event.',
      explanation:'False, and this is the whole point of the reflexive. <b>Himself</b> must refer back to the subject of its own clause, so the manager sees the manager. <b>Him</b> is barred from referring to that same subject, so it must be some other man &mdash; the sentences describe two different events. Both sentences are perfectly grammatical, which is why only the reference test separates them.' }),

    makeText({ id:'g9eng-d5-003', chapterId:'g9eng-gr-pronouns', subsection:'reflexive', difficulty:4,
      question:'One pronoun in this sentence is the wrong one. Write the ONE word that should replace <b>him</b>: &ldquo;Although the goalkeeper blamed the defenders at first, he knew that he had let the goal in and could only be angry with him.&rdquo;',
      answer:'himself', alsoAccept:['himself.'],
      hint:'Find the subject of the clause the wrong pronoun sits in, then ask whether the anger lands on that same person.',
      explanation:'The clause is &ldquo;he could only be angry with ___&rdquo;. Its subject is <b>he</b>, the goalkeeper, and the anger lands on that same goalkeeper, so the pronoun must be the reflexive <b>himself</b>. Written as &ldquo;him&rdquo; the sentence says he is angry with some other man &mdash; most readers would take it to mean a defender, which is the opposite of what the sentence has just admitted.' }),

    makeMCQ({ id:'g9eng-d5-004', chapterId:'g9eng-gr-pronouns', subsection:'reflexive', difficulty:4,
      question:'Only one of these sentences is correct English. Which one?',
      options:['The runners rested quietly for an hour after the race.','The runners rested themselves for an hour after the race.','The runners rested them quietly for an hour after the race.','The runners were rested quietly for an hour after the race.'],
      answer:'The runners rested quietly for an hour after the race.',
      hint:'Ask whether the verb here needs any object at all before you decide which pronoun could follow it.',
      explanation:'<b>Rest</b> in this sense takes no object in English, so no pronoun belongs after it at all. &ldquo;Rested themselves&rdquo; is the tempting one, because it is a word-for-word translation of the reflexive used in French and in Kreol; &ldquo;rested them&rdquo; would mean they rested somebody else; and the passive &ldquo;were rested&rdquo; says somebody else did the resting to them. A reflexive is only correct where the verb actually needs an object.' }),

    makeMCQ({ id:'g9eng-d5-005', chapterId:'g9eng-gr-pronouns', subsection:'reflexive', difficulty:4,
      question:'Read carefully: &ldquo;Kavi asked Ryan to photograph himself beside the trophy.&rdquo; Who appears in the photograph?',
      options:['Ryan, the one who takes the photograph','Kavi, the one who makes the request','Both boys, standing side by side','The trophy on its own, and nobody'],
      answer:'Ryan, the one who takes the photograph',
      hint:'Find the clause the reflexive belongs to, then ask who is doing the action in that clause &mdash; not who is doing the asking.',
      explanation:'A reflexive refers to the subject of <b>its own clause</b>. The clause here is &ldquo;to photograph himself&rdquo;, and the understood subject of <i>to photograph</i> is Ryan, because Ryan is the one being asked to do it. So Ryan photographs Ryan. Choosing Kavi means reading back to the subject of the main verb <i>asked</i>, one clause too far; to put Kavi in the picture the sentence would have to say &ldquo;to photograph him&rdquo;.' }),

    makeMCQ({ id:'g9eng-d5-006', chapterId:'g9eng-gr-pronouns', subsection:'reflexive', difficulty:4,
      question:'Which pronoun does standard English use here? &ldquo;Nisha pulled the blanket over ___ and fell asleep.&rdquo;',
      options:['her','herself','hers','she'],
      answer:'her',
      hint:'Notice that the pronoun follows a preposition of place. Ask whether the action is aimed back at the doer or simply described in space.',
      explanation:'After a preposition that describes <b>position</b> &mdash; over, behind, beside, around &mdash; English keeps the ordinary object pronoun even when it refers to the subject: <i>she pulled the blanket over her</i>, <i>he shut the door behind him</i>. The reflexive appears when the action is deliberately turned back on the doer (<i>she looked at herself</i>). &ldquo;Hers&rdquo; is possessive and &ldquo;she&rdquo; is a subject form, so neither can follow a preposition at all.' }),

    // ══ g9eng-gr-pronouns · emphasising (007–013) ═════════════════════════

    makeMCQ({ id:'g9eng-d5-007', chapterId:'g9eng-gr-pronouns', subsection:'emphasising', difficulty:4,
      question:'Two sentences use the same word. (A) &ldquo;The headmaster introduced himself to the parents.&rdquo; (B) &ldquo;The headmaster himself introduced the parents.&rdquo; Which statement is true?',
      options:['In A he gave his own name; in B he did the introducing in person.','In A he did the introducing in person; in B he gave his own name.','In both sentences the headmaster gave the parents his own name.','In both sentences somebody other than the headmaster introduced.'],
      answer:'In A he gave his own name; in B he did the introducing in person.',
      hint:'Look at where the word sits. In one sentence it is what the verb acts on; in the other it is only leaning on a noun.',
      explanation:'In A the word stands in the object slot after <i>introduced</i>, so it is a <b>reflexive</b>: the headmaster is the person introduced. In B the object slot is already filled by &ldquo;the parents&rdquo;, so the word cannot be the object; it sits beside the subject and merely <b>emphasises</b> it, meaning he did it in person rather than sending a deputy. Position, not the word, decides which job it is doing.' }),

    makeText({ id:'g9eng-d5-008', chapterId:'g9eng-gr-pronouns', subsection:'emphasising', difficulty:4,
      question:'Write the ONE word that belongs in the gap so that the sentence stresses that no assistant was involved: &ldquo;Madame Appadoo ___ carried the injured child into the clinic.&rdquo;',
      answer:'herself', alsoAccept:['herself.'],
      hint:'The gap sits directly after the subject, so the word you add must agree with that subject and add nothing to the meaning of the verb.',
      explanation:'An emphasising pronoun stands next to the noun it stresses and must agree with it, so a single woman takes <b>herself</b>. The object of <i>carried</i> is already &ldquo;the injured child&rdquo;, which proves the word cannot be a reflexive object here. Note the test that always works: an emphasising pronoun can be deleted and the sentence still stands, only less forcefully.' }),

    makeTF({ id:'g9eng-d5-009', chapterId:'g9eng-gr-pronouns', subsection:'emphasising', difficulty:4,
      question:'True or False: in &ldquo;You will have to speak to the manager herself&rdquo;, the word <i>herself</i> could be deleted and the sentence would still be complete and correct.',
      answer:true,
      hint:'Try taking the word out and read what is left. Ask whether any slot the verb needs has been emptied.',
      explanation:'True. &ldquo;You will have to speak to the manager&rdquo; is complete, because the preposition <i>to</i> already has its noun and nothing has been left dangling. That deletion test is what tells an emphasising pronoun from a reflexive one: delete the reflexive in &ldquo;She blamed herself&rdquo; and the verb is left with no object at all. Emphasis can always be removed; an object cannot.' }),

    makeMCQ({ id:'g9eng-d5-010', chapterId:'g9eng-gr-pronouns', subsection:'emphasising', difficulty:4,
      question:'In which sentence could <i>himself</i> be removed, leaving a complete and correct sentence behind?',
      options:['The Minister himself replied to every letter.','The Minister blamed himself for every delay.','The Minister helped himself to another samosa.','The Minister found himself without any support.'],
      answer:'The Minister himself replied to every letter.',
      hint:'Delete the word from each sentence in turn and check whether the verb has been left without something it needs.',
      explanation:'Only in the first sentence is the word pure emphasis &mdash; &ldquo;The Minister replied to every letter&rdquo; stands on its own. In the other three the word is the <b>object</b> the verb requires: &ldquo;blamed&rdquo; and &ldquo;found&rdquo; are left dangling without it, and &ldquo;helped to another samosa&rdquo; is not English at all. The same word does two different jobs, and only the deletion test tells them apart.' }),

    makeText({ id:'g9eng-d5-011', chapterId:'g9eng-gr-pronouns', subsection:'emphasising', difficulty:4,
      question:'Write the ONE pronoun that must be added after <b>village</b> so that the sentence stresses that the village, and not the council, paid: &ldquo;The village ___ paid for the new streetlights.&rdquo;',
      answer:'itself', alsoAccept:['itself.'],
      hint:'Decide first whether the noun being stressed is a person or a thing, then choose the matching form.',
      explanation:'An emphasising pronoun agrees with the noun it leans on. &ldquo;Village&rdquo; is a singular thing, so the form is <b>itself</b>. &ldquo;Themselves&rdquo; is the common slip, because a village is full of people &mdash; but the grammar follows the singular noun that is actually written, not the crowd it suggests. Compare &ldquo;the committee itself&rdquo; against &ldquo;the committee members themselves&rdquo;.' }),

    makeMCQ({ id:'g9eng-d5-012', chapterId:'g9eng-gr-pronouns', subsection:'emphasising', difficulty:4,
      question:'Which pronoun is correct? &ldquo;The Minister, together with his two advisers, opened the exhibition ___.&rdquo;',
      options:['himself','themselves','theirselves','ourselves'],
      answer:'himself',
      hint:'Work out what the true subject of the verb is before you count how many people the sentence mentions.',
      explanation:'A phrase introduced by <i>together with</i>, <i>as well as</i> or <i>along with</i> does not change the number of the subject: the subject is still <b>The Minister</b>, singular, so the emphasising pronoun is <b>himself</b>. &ldquo;Themselves&rdquo; is tempting because three people are named, but they are not all subjects. &ldquo;Theirselves&rdquo; is not a word in standard English at all.' }),

    makeTF({ id:'g9eng-d5-013', chapterId:'g9eng-gr-pronouns', subsection:'emphasising', difficulty:4,
      question:'True or False: in &ldquo;The road itself is in good condition; it is the bridge that is dangerous&rdquo;, the word <i>itself</i> is the object of the verb <i>is</i>.',
      answer:false,
      hint:'Ask what kind of verb <i>is</i> happens to be, and whether a verb of that kind can take an object at all.',
      explanation:'False. <b>Is</b> is a linking verb: it joins the subject to a description and never takes an object, so nothing after it can be a reflexive object. <i>Itself</i> here sits beside the subject &ldquo;The road&rdquo; and emphasises it, setting the road against the bridge in the second half of the sentence. Delete it and the sentence still stands, which confirms it is emphasis.' }),

    // ══ g9eng-gr-pronouns · relative (014–020) ════════════════════════════

    makeMCQ({ id:'g9eng-d5-014', chapterId:'g9eng-gr-pronouns', subsection:'relative', difficulty:4,
      question:'Which word fills the gap in formal written English? &ldquo;The nurse ___ the doctor praised at the ceremony has been promoted.&rdquo;',
      options:['whom','who','whose','which'],
      answer:'whom',
      hint:'Look at the verb inside the relative clause and ask whether it already has a subject of its own.',
      explanation:'Inside the clause the verb is <i>praised</i>, and it already has a subject: <b>the doctor</b>. The nurse is therefore what the praising fell on &mdash; the object &mdash; so formal English uses <b>whom</b>. Pupils choose &ldquo;who&rdquo; by looking at the noun in front of the gap, but the noun tells you only that a person is involved; the verb that follows decides subject or object. &ldquo;Whose&rdquo; marks possession and &ldquo;which&rdquo; is for things.' }),

    makeMCQ({ id:'g9eng-d5-015', chapterId:'g9eng-gr-pronouns', subsection:'relative', difficulty:4,
      question:'Both gaps refer to a person, but the two clauses are built differently. (i) &ldquo;The pupil ___ won the prize is in my class.&rdquo; (ii) &ldquo;The pupil ___ the judges chose is in my class.&rdquo;',
      options:['who / whom','whom / who','who / which','whose / whom'],
      answer:'who / whom',
      hint:'For each clause in turn, check whether the verb inside it is still waiting for a subject.',
      explanation:'In (i) the verb <i>won</i> has no other subject, so the pupil is the one doing the winning and the word is <b>who</b>. In (ii) the verb <i>chose</i> already has its subject, <b>the judges</b>, so the pupil is the one chosen and the word is <b>whom</b>. The noun in front of the gap is identical in both sentences, which is exactly why it cannot be what decides the answer.' }),

    makeText({ id:'g9eng-d5-016', chapterId:'g9eng-gr-pronouns', subsection:'relative', difficulty:4,
      question:'Write the ONE relative pronoun that fills the gap: &ldquo;The scientist ___ notes were stolen refused to repeat the experiment.&rdquo;',
      answer:'whose', alsoAccept:['whose.'],
      hint:'Look at what stands immediately after the gap. It is a noun, not a verb, so ask what relationship the gap has to that noun.',
      explanation:'The gap is followed by the noun <b>notes</b>, not by a verb, so the relative word is not doing the work of a subject or an object &mdash; it shows who the notes belonged to. That is <b>whose</b>. &ldquo;Who&rdquo; would need a verb straight after it, and &ldquo;which&rdquo; refers to things; note that <i>whose</i> is also the normal choice for a thing (&ldquo;the house whose roof blew off&rdquo;).' }),

    makeMCQ({ id:'g9eng-d5-017', chapterId:'g9eng-gr-pronouns', subsection:'relative', difficulty:4,
      question:'Which word fills the gap? &ldquo;My uncle, ___ lives in Curepipe, has offered to lend us his car.&rdquo;',
      options:['who','that','whom','which'],
      answer:'who',
      hint:'Two things narrow the choice here: the commas around the clause, and whether the verb inside it already has a subject.',
      explanation:'Two rules meet. The commas mark a <b>non-defining</b> clause, and such a clause can never be introduced by <i>that</i>, however natural it sounds when spoken. Then, inside the clause, <i>lives</i> has no other subject, so the uncle is the one living there &mdash; a subject, which rules out <b>whom</b>. &ldquo;Which&rdquo; cannot refer to a person. Only <b>who</b> survives both tests.' }),

    makeTF({ id:'g9eng-d5-018', chapterId:'g9eng-gr-pronouns', subsection:'relative', difficulty:4,
      question:'True or False: in &ldquo;The report which the committee rejected was written in one night&rdquo;, the word <i>which</i> can be left out without making the sentence wrong.',
      answer:true,
      hint:'Decide first what job the relative word is doing inside its clause, because only one of the two jobs can be left unsaid.',
      explanation:'True. The verb <i>rejected</i> already has its subject, <b>the committee</b>, so <i>which</i> is the object of that clause &mdash; and an object relative may simply be dropped: &ldquo;The report the committee rejected was written in one night&rdquo;. A <b>subject</b> relative can never be dropped: &ldquo;The report which upset the committee&rdquo; cannot lose its <i>which</i>. Note too that there are no commas here, so the clause is defining.' }),

    makeMCQ({ id:'g9eng-d5-019', chapterId:'g9eng-gr-pronouns', subsection:'relative', difficulty:4,
      question:'Which verb form fits? &ldquo;She is one of the few pupils who ___ attempted the bonus question.&rdquo;',
      options:['have','has','is','was'],
      answer:'have',
      hint:'Find the noun that <i>who</i> stands for. It is not always the noun nearest the gap.',
      explanation:'<i>Who</i> stands for <b>the few pupils</b>, which is plural, so the verb inside the relative clause is <b>have</b>. The pull towards &ldquo;has&rdquo; comes from &ldquo;one&rdquo; at the start, but <i>one</i> is the subject of <i>is</i> in the main clause and has nothing to do with the relative clause. &ldquo;Is&rdquo; and &ldquo;was&rdquo; cannot join <i>attempted</i> at all in the active voice.' }),

    makeMCQ({ id:'g9eng-d5-020', chapterId:'g9eng-gr-pronouns', subsection:'relative', difficulty:4,
      question:'What does <i>which</i> refer to? &ldquo;Priya told Anjali about the letter, which surprised her.&rdquo;',
      options:['The fact that Priya told her about the letter','The letter that Priya had written to Anjali','Anjali, the person who received the news','Priya, the person who passed the news on'],
      answer:'The fact that Priya told her about the letter',
      hint:'Notice the comma. Ask whether the word is picking out one noun or standing for something larger.',
      explanation:'A <i>which</i> clause set off by a comma may take the <b>whole preceding statement</b> as what it refers to, and that is the natural reading here: the surprising thing is that Priya said anything. Taking it as the letter is possible but weaker, because a comma clause rarely reaches back past the verb to pick out one noun. The two people can be ruled out at once: <i>which</i> never refers to a person.' }),

    // ══ g9eng-gr-verbs · future_perfect (021–026) ═════════════════════════

    makeMCQ({ id:'g9eng-d5-021', chapterId:'g9eng-gr-verbs', subsection:'future_perfect', difficulty:4,
      question:'The agent has disappeared from this sentence, but the tense must not change. &ldquo;By the time the inspectors arrive, all the files ___ into the new system.&rdquo;',
      options:['will have been entered','will have been entering','will have entered them','are going to be entered'],
      answer:'will have been entered',
      hint:'Ask two things in order: which tense the deadline demands, and whether the files act or are acted on.',
      explanation:'&ldquo;By the time the inspectors arrive&rdquo; fixes a future deadline, so the tense is the <b>future perfect</b>; and files cannot enter themselves, so the voice is <b>passive</b>. Putting the two together gives <i>will have been entered</i>, and the clerk who does the work never has to be named. &ldquo;Will have entered them&rdquo; keeps the tense but makes the files the doer, and &ldquo;are going to be entered&rdquo; is passive but loses the completed-before-then meaning.' }),

    makeText({ id:'g9eng-d5-022', chapterId:'g9eng-gr-verbs', subsection:'future_perfect', difficulty:4,
      question:'Write the correct form of the verb in brackets: &ldquo;By the end of this month the club (collect) ___ enough money for the new roof, so the builders can start in July.&rdquo;',
      answer:'will have collected', alsoAccept:['shall have collected','will have collected.'],
      hint:'Two time markers pull in different directions here. Decide which one the verb in brackets belongs to.',
      explanation:'&ldquo;By the end of this month&rdquo; sets a future point, and the collecting must be finished before it &mdash; that is the <b>future perfect</b>: <i>will have collected</i>. The second clause is a trap: &ldquo;can start in July&rdquo; is a later future, but it governs <i>start</i>, not the verb in brackets. &ldquo;Will collect&rdquo; would leave it unclear whether the money arrives before the month ends or as it ends.' }),

    makeMCQ({ id:'g9eng-d5-023', chapterId:'g9eng-gr-verbs', subsection:'future_perfect', difficulty:4,
      question:'He said, &ldquo;I will have finished the report by Friday.&rdquo; Complete the report of it: &ldquo;He said that he ___ the report by the following Friday.&rdquo;',
      options:['would have finished','will have finished','had finished','would finish'],
      answer:'would have finished',
      hint:'The reporting verb is in the past. Work out what each part of the original tense becomes once it is shifted back.',
      explanation:'A past reporting verb shifts <i>will</i> back to <b>would</b> while the perfect part stays, giving <b>would have finished</b>. &ldquo;Will have finished&rdquo; is the commonest error: the tense has been left unshifted even though the time expression was shifted from <i>Friday</i> to <i>the following Friday</i>, and a sentence that shifts one and not the other is inconsistent. &ldquo;Had finished&rdquo; loses the future altogether.' }),

    makeMCQ({ id:'g9eng-d5-024', chapterId:'g9eng-gr-verbs', subsection:'future_perfect', difficulty:4,
      question:'Both gaps describe future events, yet only one of them may carry <i>will</i>. &ldquo;When the bell ___, the candidates ___ their papers.&rdquo;',
      options:['rings / will have finished','will ring / will have finished','rings / will have been finishing','rang / will have finished'],
      answer:'rings / will have finished',
      hint:'Notice what kind of clause each gap sits in. One of the two kinds refuses a future form on principle.',
      explanation:'A time clause opening with <i>when</i>, <i>as soon as</i> or <i>before</i> takes the <b>present</b> even though it speaks of the future, so the first gap is <i>rings</i>. The main clause then uses the <b>future perfect</b>, because the writing is over before the bell. &ldquo;Will ring&rdquo; breaks the first rule; &ldquo;will have been finishing&rdquo; makes the finishing a stretch of activity rather than a completed act.' }),

    makeTF({ id:'g9eng-d5-025', chapterId:'g9eng-gr-verbs', subsection:'future_perfect', difficulty:4,
      question:'True or False: &ldquo;By next Tuesday I will finish the project&rdquo; and &ldquo;By next Tuesday I will have finished the project&rdquo; both state that the project is complete before Tuesday.',
      answer:false,
      hint:'Test each sentence against a single question: does it place the finishing inside the deadline or on it?',
      explanation:'False. Only the <b>future perfect</b> guarantees completion before the deadline. &ldquo;Will finish&rdquo; is a plain future and can be read as the finishing happening on Tuesday itself, or even that Tuesday is simply when the work is done at last. Both sentences are grammatical and both sound natural, which is why the difference must be reasoned about rather than heard.' }),

    makeMCQ({ id:'g9eng-d5-026', chapterId:'g9eng-gr-verbs', subsection:'future_perfect', difficulty:4,
      question:'Report this question: &ldquo;Will the builders have laid the foundations by Friday?&rdquo;',
      options:['She asked whether the builders would have laid the foundations by the Friday.','She asked whether the builders would be laying the foundations by the Friday.','She asked whether the builders will have laid the foundations by Friday.','She asked whether the builders had laid the foundations by the Friday.'],
      answer:'She asked whether the builders would have laid the foundations by the Friday.',
      hint:'Three things move when a question is reported: the word order, the tense and the time expression. Check all three.',
      explanation:'Reporting a question turns it into a statement introduced by <i>whether</i>, shifts <i>will</i> to <b>would</b> while keeping the perfect, and moves <i>Friday</i> to <b>the Friday</b> because the speaker is no longer standing in that week. The tempting answer keeps <i>will</i> and the bare <i>Friday</i>, shifting nothing; &ldquo;would be laying&rdquo; changes a completed act into an activity in progress.' }),

    // ══ g9eng-gr-verbs · future_perfect_continuous (027–032) ══════════════

    makeMCQ({ id:'g9eng-d5-027', chapterId:'g9eng-gr-verbs', subsection:'future_perfect_continuous', difficulty:4,
      question:'Which form fits? &ldquo;By December, Mrs Hurloll ___ at the same school for thirty years.&rdquo;',
      options:['will have been teaching','will have been taught','will be teaching there','has been teaching there'],
      answer:'will have been teaching',
      hint:'Two features of the sentence decide it: the deadline, and the phrase that measures a stretch of time.',
      explanation:'&ldquo;By December&rdquo; demands a future perfect, and &ldquo;for thirty years&rdquo; measures a <b>duration running up to</b> that point, which is exactly what the future perfect continuous expresses. &ldquo;Will have been taught&rdquo; is passive and would make her the pupil; &ldquo;will be teaching there&rdquo; describes December itself and cannot carry the thirty years; &ldquo;has been teaching&rdquo; measures up to today, not to December.' }),

    makeText({ id:'g9eng-d5-028', chapterId:'g9eng-gr-verbs', subsection:'future_perfect_continuous', difficulty:4,
      question:'Write the correct form of the verb in brackets: &ldquo;When the marathon ends at noon, Kevin (run) ___ for more than five hours.&rdquo;',
      answer:'will have been running', alsoAccept:['will have been running.','shall have been running'],
      hint:'The first clause tells you the tense may not be a future form. The phrase after the gap tells you whether to stress duration.',
      explanation:'&ldquo;For more than five hours&rdquo; measures a stretch of activity reaching up to the finish, so the answer is the future perfect continuous: <b>will have been running</b>. &ldquo;Will have run&rdquo; would report the race as a completed act and sits oddly with a duration; and note that <i>ends</i> stays in the present because it is inside a <i>when</i> clause, which is where many pupils wrongly write &ldquo;will end&rdquo;.' }),

    makeMCQ({ id:'g9eng-d5-029', chapterId:'g9eng-gr-verbs', subsection:'future_perfect_continuous', difficulty:4,
      question:'One sentence, two verbs, and they do not take the same form. &ldquo;By the time the results come out, the pupils ___ for six weeks and ___ every past paper in the library.&rdquo;',
      options:['will have been revising / will have finished','will have revised / will have been finishing','will have been revising / will be finishing','will be revising / will have been finished'],
      answer:'will have been revising / will have finished',
      hint:'One gap has a length of time beside it and the other has a countable quantity. Let each phrase choose its own form.',
      explanation:'&ldquo;For six weeks&rdquo; measures duration, so the first verb is the <b>future perfect continuous</b>. &ldquo;Every past paper&rdquo; is a finished quantity with nothing continuous about it, so the second is the plain <b>future perfect</b>. Putting both in the same form is the usual mistake: a shared deadline does not mean a shared aspect, and the words beside each verb are what decide.' }),

    makeTF({ id:'g9eng-d5-030', chapterId:'g9eng-gr-verbs', subsection:'future_perfect_continuous', difficulty:4,
      question:'True or False: &ldquo;By June she will have been working here for two years&rdquo; tells you that she stops working in June.',
      answer:false,
      hint:'Ask what the deadline is measuring &mdash; the end of the activity, or the point at which you count it up.',
      explanation:'False. The future perfect continuous measures a stretch of activity <b>up to</b> a future point; June is where the counting stops, not where the working stops, and she may well carry on for years. The sentence that would end her employment is &ldquo;she will have stopped working by June&rdquo;. Reading a deadline as an ending is the commonest misreading of this tense.' }),

    makeMCQ({ id:'g9eng-d5-031', chapterId:'g9eng-gr-verbs', subsection:'future_perfect_continuous', difficulty:4,
      question:'&ldquo;Next month I will have been living in Rodrigues for a year,&rdquo; said Anil. Which report of it is correct?',
      options:['Anil said that the following month he would have been living in Rodrigues for a year.','Anil said that the following month he would be living in Rodrigues for a whole year.','Anil said that the following month he had been living in Rodrigues for a year.','Anil said that next month he will have been living in Rodrigues for a year.'],
      answer:'Anil said that the following month he would have been living in Rodrigues for a year.',
      hint:'Shift the tense and the time expression together, and keep whatever the original said about duration.',
      explanation:'<i>Will</i> shifts to <b>would</b>, the perfect continuous part is kept, and <i>next month</i> becomes <b>the following month</b> because the speaker has moved away from Anil&rsquo;s present. Dropping to &ldquo;would be living&rdquo; throws away the year already spent there; &ldquo;had been living&rdquo; puts the whole thing in the past; and the last option shifts the time expression not at all.' }),

    makeText({ id:'g9eng-d5-032', chapterId:'g9eng-gr-verbs', subsection:'future_perfect_continuous', difficulty:4,
      question:'The words in bold are in the wrong form. Write the corrected form of <b>will be standing</b>: &ldquo;By the time the shop closes, the cashier will be standing at the till for nine hours.&rdquo;',
      answer:'will have been standing', alsoAccept:['will have been standing.'],
      hint:'A plain future continuous describes the deadline moment itself. Ask what the phrase after the verb is actually measuring.',
      explanation:'&ldquo;For nine hours&rdquo; measures time already accumulated when the shop closes, and only the future perfect continuous can carry that: <b>will have been standing</b>. &ldquo;Will be standing&rdquo; describes what she is doing at closing time and cannot hold a nine-hour total. Notice again that <i>closes</i> is correct as it stands, because a <i>by the time</i> clause takes the present.' }),

    // ══ g9eng-gr-verbs · tense_consistency (033–038) ══════════════════════

    makeMCQ({ id:'g9eng-d5-033', chapterId:'g9eng-gr-verbs', subsection:'tense_consistency', difficulty:4,
      question:'One verb breaks the tense of this sentence. Which one? &ldquo;Ravi walked to the bus stop, checked his watch and realises that the last bus had already gone.&rdquo;',
      options:['realises','walked','checked','had gone'],
      answer:'realises',
      hint:'Three of the verbs belong to one time frame. Find the one that has stepped out of it.',
      explanation:'<i>Walked</i> and <i>checked</i> set the narrative in the past, and <b>realises</b> is a present form sitting in the same list of actions &mdash; it should be <i>realised</i>. <i>Had gone</i> is not the error: a past perfect is the correct way to show that the bus left before he looked at his watch, so a shift of tense that is doing a job is not an inconsistency.' }),

    makeText({ id:'g9eng-d5-034', chapterId:'g9eng-gr-verbs', subsection:'tense_consistency', difficulty:4,
      question:'Write the ONE word that should replace <b>is</b>: &ldquo;The guide explained that the dodo was a flightless bird and that the last one is seen alive in 1681.&rdquo;',
      answer:'was', alsoAccept:['was.'],
      hint:'The sentence contains a date. Ask whether the clause with the wrong verb is describing a fact that still holds or an event that is over.',
      explanation:'The reporting verb <i>explained</i> is past, and the second clause describes a single event fixed in 1681, so it must be <b>was</b> seen. The first clause shows the pattern already: <i>was a flightless bird</i>. A present tense would only be defensible for a fact still true today, which a sighting in 1681 plainly is not.' }),

    makeMCQ({ id:'g9eng-d5-035', chapterId:'g9eng-gr-verbs', subsection:'tense_consistency', difficulty:4,
      question:'&ldquo;The council repaired the seawall last winter.&rdquo; Which passive version keeps exactly the same tense?',
      options:['The seawall was repaired last winter.','The seawall has been repaired last winter.','The seawall is repaired every winter.','The seawall had been repaired last winter.'],
      answer:'The seawall was repaired last winter.',
      hint:'Turning a sentence passive changes who is named, not when it happened. Check the time phrase against each form.',
      explanation:'A simple past active becomes a simple past passive: <b>was repaired</b>, and the council may vanish altogether because a passive does not need its agent. &ldquo;Has been repaired&rdquo; cannot sit with <i>last winter</i>, since the present perfect refuses a finished time phrase; &ldquo;had been repaired&rdquo; pushes the work behind some other past event that the sentence never mentions.' }),

    makeTF({ id:'g9eng-d5-036', chapterId:'g9eng-gr-verbs', subsection:'tense_consistency', difficulty:4,
      question:'True or False: &ldquo;The teacher said that water boils at 100 degrees Celsius&rdquo; is correct, even though the reporting verb is in the past.',
      answer:true,
      hint:'Ask whether the reported clause describes something tied to the moment of speaking or something that holds at all times.',
      explanation:'True. A past reporting verb normally shifts the reported clause back, but a <b>general truth</b> may keep the present, because it was true then and is true now: <i>boils</i> is right. &ldquo;Said that water boiled at 100 degrees&rdquo; is also possible, though it faintly suggests the fact no longer holds. Consistency of tense is about matching meaning, not about copying one form everywhere.' }),

    makeMCQ({ id:'g9eng-d5-037', chapterId:'g9eng-gr-verbs', subsection:'tense_consistency', difficulty:4,
      question:'Which form fits? &ldquo;If the ferry ___ on time, we would not have missed the wedding.&rdquo;',
      options:['had left','left','leaves','would leave'],
      answer:'had left',
      hint:'Read the main clause first. Its form tells you whether the condition is open or already settled.',
      explanation:'&ldquo;Would not have missed&rdquo; is the mark of a third conditional: the wedding was missed, so the condition is about an unchangeable past and the <i>if</i> clause takes the <b>past perfect</b>, <b>had left</b>. &ldquo;Left&rdquo; belongs with <i>would not miss</i> and &ldquo;leaves&rdquo; with <i>will not miss</i>; a conditional whose two halves come from different patterns is the error to watch for.' }),

    makeText({ id:'g9eng-d5-038', chapterId:'g9eng-gr-verbs', subsection:'tense_consistency', difficulty:4,
      question:'Write the correct form of the verb in brackets: &ldquo;If she had caught the earlier flight, she (be) ___ in Mauritius now.&rdquo;',
      answer:'would be', alsoAccept:['would be.'],
      hint:'The two halves of this sentence sit in different times. Let the last word of the sentence decide the second half.',
      explanation:'The <i>if</i> clause is a past perfect, which normally pairs with <i>would have been</i> &mdash; but the word <b>now</b> places the result in the present, so the main clause takes <b>would be</b>. This mixed conditional is the pattern for a past cause with a present consequence. Writing &ldquo;would have been&rdquo; would leave her arriving in the past and contradict <i>now</i>.' }),

    // ══ g9eng-gr-determiners (039–042) ════════════════════════════════════
    // ⚠ NO subsection field: this chapter declares none, and every item already
    //   in it carries none. Tagging one here would hide these from the syllabus
    //   screen entirely.

    makeMCQ({ id:'g9eng-d5-039', chapterId:'g9eng-gr-determiners', difficulty:4,
      question:'Both gaps take an article, but not the same one. &ldquo;We saw ___ snake near the water tank. ___ snake was over two metres long.&rdquo;',
      options:['a / The','the / A','a / A','the / The'],
      answer:'a / The',
      hint:'Ask, for each gap in turn, whether the reader has already been told about this snake.',
      explanation:'The first mention introduces something new to the reader, so it takes the indefinite <b>a</b>. The second sentence talks about the same snake, now known, so it takes the definite <b>The</b>. Starting with &ldquo;the&rdquo; would suggest the reader already knew which snake was meant, and keeping &ldquo;a&rdquo; in the second gap would make it a different snake altogether. What has already been introduced is what decides the article.' }),

    makeMCQ({ id:'g9eng-d5-040', chapterId:'g9eng-gr-determiners', difficulty:4,
      question:'Which sentence tells the reader that the writer found the turnout disappointing?',
      options:['Few parents came to the meeting.','A few parents came to the meeting.','Quite a few parents came to the meeting.','Most of the parents came to the meeting.'],
      answer:'Few parents came to the meeting.',
      hint:'Three of these count the parents in much the same range. Look for the one that also carries the writer&rsquo;s attitude.',
      explanation:'<b>Few</b> without <i>a</i> is negative: it means not many, and hardly enough. <b>A few</b> is positive and means some, which is why &ldquo;a few parents came&rdquo; sounds like modest good news. &ldquo;Quite a few&rdquo; means a fair number, more than you might expect, and &ldquo;most&rdquo; is a clear majority. The number involved may be similar; the one small word changes how the writer feels about it.' }),

    makeText({ id:'g9eng-d5-041', chapterId:'g9eng-gr-determiners', difficulty:4,
      question:'Write the ONE word that fills the gap: &ldquo;There was not ___ information in the report, and very few figures to support what little there was.&rdquo;',
      answer:'much', alsoAccept:['much.'],
      hint:'The sentence quantifies two different nouns. Work out which kind of noun sits after the gap before you choose.',
      explanation:'<b>Information</b> is uncountable, so it takes <b>much</b> (and <i>little</i>), never <i>many</i>. The same sentence then uses <b>few</b> with <i>figures</i>, which is countable &mdash; the two quantifiers are different because the two nouns are. Writing &ldquo;many information&rdquo; is the commonest slip in the whole chapter, and this sentence hands you the countable pattern right beside it as a check.' }),

    makeTF({ id:'g9eng-d5-042', chapterId:'g9eng-gr-determiners', difficulty:4,
      question:'True or False: &ldquo;The life is difficult for the fishermen of Rodrigues&rdquo; is correct English.',
      answer:false,
      hint:'Ask of each noun separately whether the sentence is speaking about a particular one or about the thing in general.',
      explanation:'False. <i>Life</i> here is meant in general, and a general uncountable noun takes <b>no article at all</b>: &ldquo;Life is difficult&rdquo;. The second noun is different: <i>the fishermen of Rodrigues</i> are a particular, identified group, so <b>the</b> is correct there. One sentence can therefore need a zero article and a definite article at once, which is why the rule has to be applied noun by noun.' }),

    // ══ g9eng-gr-modals (043–052) ═════════════════════════════════════════
    // ⚠ NO subsection field, for the same reason as the four items above.

    makeMCQ({ id:'g9eng-d5-043', chapterId:'g9eng-gr-modals', difficulty:4,
      question:'Which form fits? &ldquo;The gate was locked and every light was off, so the caretaker ___ home early.&rdquo;',
      options:['must have gone','had to go','must go','should have gone'],
      answer:'must have gone',
      hint:'The first half of the sentence gives you evidence. Ask whether the speaker is reporting a fact or working one out.',
      explanation:'The locked gate is <b>evidence</b>, so the speaker is drawing a conclusion about the past: <b>must have gone</b>. &ldquo;Had to go&rdquo; is the trap, because it also uses <i>must</i>-type meaning &mdash; but it states as a fact that something obliged him to leave, which the speaker cannot know from a locked gate. &ldquo;Must go&rdquo; is present obligation, and &ldquo;should have gone&rdquo; would be a complaint that he did not.' }),

    makeMCQ({ id:'g9eng-d5-044', chapterId:'g9eng-gr-modals', difficulty:4,
      question:'Which form fits? &ldquo;There was no bus at all after six, so we ___ walk the last five kilometres.&rdquo;',
      options:['had to','must have','must','should have'],
      answer:'had to',
      hint:'Decide whether the walking actually happened, and whether the speaker is guessing or reporting.',
      explanation:'The speaker was there and the walk really happened, so this is a past <b>obligation reported as fact</b>: English has no past form of <i>must</i> for this and uses <b>had to</b>. &ldquo;Must have walked&rdquo; would turn a first-hand report into a guess about somebody else. &ldquo;Must&rdquo; is present, and &ldquo;should have&rdquo; would say the walk was advisable but never taken.' }),

    makeMCQ({ id:'g9eng-d5-045', chapterId:'g9eng-gr-modals', difficulty:4,
      question:'Which modal says only that it was possible, without suggesting anybody had a duty? &ldquo;The gate was left open all night. Anyone ___ walked in.&rdquo;',
      options:['could have','should have','must have','ought to have'],
      answer:'could have',
      hint:'Sort the four into what was possible, what was advisable and what the speaker deduces. Only one belongs to the first group.',
      explanation:'<b>Could have</b> is unrealised possibility: it was open to anyone, and we are not told whether anyone did. <b>Should have</b> and <b>ought to have</b> both say a duty was left undone, which would strangely make walking in the right thing to do. <b>Must have</b> is a deduction and would claim somebody definitely did walk in &mdash; more than the evidence of an open gate supports.' }),

    makeMCQ({ id:'g9eng-d5-046', chapterId:'g9eng-gr-modals', difficulty:4,
      question:'The evidence is strong but not conclusive. &ldquo;His car is in the yard, but every curtain is closed. He ___ be asleep.&rdquo;',
      options:['must','might','cannot','will'],
      answer:'must',
      hint:'Weigh how much the two facts in the sentence actually prove, then pick the modal of matching strength.',
      explanation:'Two pieces of evidence point the same way &mdash; he is at home, and the house is shut up &mdash; so the deduction is confident: <b>must</b> be asleep. <b>Might</b> is too weak for evidence that agrees with itself; <b>cannot</b> is the opposite deduction and is contradicted by the car; <b>will</b> predicts the future rather than reading the present. The strength of the modal has to match the strength of the evidence beside it.' }),

    makeMCQ({ id:'g9eng-d5-047', chapterId:'g9eng-gr-modals', difficulty:4,
      question:'Which form fits? &ldquo;She posted the parcel on Monday, so it ___ have arrived yet &mdash; the post takes a full week.&rdquo;',
      options:['cannot','must not','should not','need not'],
      answer:'cannot',
      hint:'This is a deduction turned negative. Ask which of the four is the true opposite of <i>must have arrived</i>.',
      explanation:'The negative of a confident deduction is <b>cannot have</b>: the timing makes arrival impossible. <b>Must not have</b> is heard in speech but is not the standard written form for this meaning, and <i>must not</i> on its own is a prohibition. <b>Should not have</b> would be a reproach and <b>need not have</b> would say the arrival was unnecessary &mdash; both of them comments on conduct, not on what is possible.' }),

    makeText({ id:'g9eng-d5-048', chapterId:'g9eng-gr-modals', difficulty:4,
      question:'Nobody answered the bell and the shutters were down. Write the THREE words that fill the gap, using the verb in brackets: &ldquo;The family ___ (be) away for the weekend.&rdquo;',
      answer:'must have been', alsoAccept:['must have been.'],
      hint:'The two facts before the sentence are evidence about a time already past. Build the modal that carries both of those things.',
      explanation:'Evidence plus a past time gives a past deduction, and the pattern is <b>modal + have + past participle</b>: <b>must have been</b>. &ldquo;Must be&rdquo; would be a deduction about right now, which no longer matches a weekend that is over; &ldquo;had to be&rdquo; would claim something forced them to go away, which the shutters cannot tell you. The three words together are what make the deduction a past one.' }),

    makeTF({ id:'g9eng-d5-049', chapterId:'g9eng-gr-modals', difficulty:4,
      question:'True or False: &ldquo;You must have waited an hour&rdquo; and &ldquo;You had to wait an hour&rdquo; say the same thing.',
      answer:false,
      hint:'Ask of each sentence whether the speaker knows what happened or is working it out from something else.',
      explanation:'False. <b>Must have waited</b> is a deduction: the speaker was not there and is concluding it from something, perhaps how tired you look. <b>Had to wait</b> is a plain report of an obligation that really happened. Both are past and both use a <i>must</i>-family meaning, which is exactly why they are confused &mdash; but one is a guess and the other is a fact.' }),

    makeTF({ id:'g9eng-d5-050', chapterId:'g9eng-gr-modals', difficulty:4,
      question:'True or False: &ldquo;She needn&rsquo;t have taken a taxi&rdquo; tells you that she did in fact take a taxi.',
      answer:true,
      hint:'Compare it in your head with &ldquo;she did not need to take a taxi&rdquo; and ask whether both leave the same thing open.',
      explanation:'True. <b>Needn&rsquo;t have</b> plus a past participle says the action was done and was unnecessary &mdash; the taxi was taken and the money wasted. &ldquo;She did not need to take a taxi&rdquo; is different: it only says there was no necessity, and leaves it open whether she took one anyway. The form of the verb, not the meaning of <i>need</i>, is what tells you the taxi was taken.' }),

    makeMCQ({ id:'g9eng-d5-051', chapterId:'g9eng-gr-modals', difficulty:4,
      question:'The hurrying really happened. Which form fits? &ldquo;We ___ hurried &mdash; the ceremony started an hour late.&rdquo;',
      options:['needn\'t have','did not need to','could not have','must not have'],
      answer:'needn\'t have',
      hint:'Two things must both fit: the meaning, and the form of the word that follows the gap.',
      explanation:'<b>Needn&rsquo;t have hurried</b> says the hurrying was done and turned out to be unnecessary, which is what the late start tells us. &ldquo;Did not need to&rdquo; fails twice: it leaves open whether we hurried, and it cannot be followed by <i>hurried</i> at all &mdash; it needs <i>hurry</i>. &ldquo;Could not have&rdquo; would deny that hurrying was possible, and &ldquo;must not have&rdquo; would be a guess that we did not.' }),

    makeMCQ({ id:'g9eng-d5-052', chapterId:'g9eng-gr-modals', difficulty:4,
      question:'Which form fits? &ldquo;If the driver had braked a second earlier, the accident ___.&rdquo;',
      options:['might have been avoided','might have been avoiding','could be avoided later','may have avoided it'],
      answer:'might have been avoided',
      hint:'The <i>if</i> clause settles the time frame. Then ask whether the accident is doing the avoiding or having it done to it.',
      explanation:'&ldquo;Had braked&rdquo; sets a third conditional, so the main clause needs <b>modal + have + past participle</b>; and an accident cannot avoid anything, so the voice is <b>passive</b>: <i>might have been avoided</i>. <b>Might</b> rather than <b>would</b> keeps it honest &mdash; earlier braking made escape possible, not certain. &ldquo;Might have been avoiding&rdquo; turns it into an activity in progress, and &ldquo;could be avoided later&rdquo; moves the whole thing into an open future.' })

  );

})();
