'use strict';
// Grade 6 French — Chapter: L'Imparfait
// IDs format: g6fr-imp-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-imp-001', chapterId:'g6fr-imparfait', difficulty:1,
    question:'When is the IMPARFAIT used?',
    options:[
      'For completed actions at a specific time in the past',
      'For ongoing/habitual past actions and descriptions in the past',
      'For actions that will happen in the future',
      'For actions happening right now'
    ],
    answer:'For ongoing/habitual past actions and descriptions in the past',
    hint:'Think of it as the "background" tense — setting the scene, habits, and ongoing states.',
    explanation:'The <b>imparfait</b> is used for: (1) <b>Habitual/repeated past actions</b>: "Quand j\'étais jeune, je jouais au foot." (2) <b>Ongoing past actions</b>: "Il pleuvait quand je suis sorti." (3) <b>Descriptions in the past</b>: "La maison était grande."' }),

  makeMCQ({ id:'g6fr-imp-002', chapterId:'g6fr-imparfait', difficulty:2,
    question:'How is the IMPARFAIT formed? (Starting point)',
    options:[
      'From the infinitive + endings',
      'From the "nous" present form, remove -ons, add imparfait endings',
      'From the "je" present form',
      'From the past participle'
    ],
    answer:'From the "nous" present form, remove -ons, add imparfait endings',
    hint:'Take "parler": nous parlons → remove -ons → parl- → add endings.',
    explanation:'Formation: take the <b>nous present</b> form, remove <b>-ons</b>, add endings: <b>-ais, -ais, -ait, -ions, -iez, -aient</b>. Example: parler → nous parlons → parl- → je parlais, tu parlais, il parlait, nous parlions, vous parliez, ils parlaient.' }),

  makeMCQ({ id:'g6fr-imp-003', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Complete: "Quand il était petit, il ___ (jouer) souvent au foot."',
    options:['a joué','jouait','jouera','joue'],
    answer:'jouait',
    hint:'"Quand il était petit" = habitual action in the past → imparfait.',
    explanation:'"il <b>jouait</b>" — habitual past action → imparfait. jouer → nous jouons → jou- + -ait = jouait. "Quand il était petit" and "souvent" (often) are both clues for habitual/repeated action in the past.' }),

  makeMCQ({ id:'g6fr-imp-004', chapterId:'g6fr-imparfait', difficulty:2,
    question:'What is the imparfait of "être" for "il"?',
    options:['il était','il a été','il sera','il est'],
    answer:'il était',
    hint:'Être is the only truly irregular verb in the imparfait — its stem is "ét-".',
    explanation:'"<b>Il était</b>" — être is the only irregular imparfait stem: <b>ét-</b>. Full conjugation: j\'étais, tu étais, il/elle <b>était</b>, nous étions, vous étiez, ils/elles étaient.' }),

  makeMCQ({ id:'g6fr-imp-005', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Choose the correct tense: "Je ___ (lire) quand le téléphone a sonné."',
    options:['lisais','ai lu','lirai','lis'],
    answer:'lisais',
    hint:'One action was ongoing (imparfait) when another interrupted it (passé composé).',
    explanation:'"Je <b>lisais</b> quand le téléphone a sonné." — Reading was the ongoing background action (imparfait). The phone ringing was the interruption (passé composé). Pattern: imparfait + quand + passé composé.' }),

  makeTF({ id:'g6fr-imp-006', chapterId:'g6fr-imparfait', difficulty:2,
    question:'The passé composé and the imparfait are often used together in the same narrative.',
    answer:true,
    hint:'One sets the scene (imparfait), the other moves the story forward (passé composé).',
    explanation:'<b>Vrai (True).</b> In a story: <b>imparfait</b> provides the background/description, <b>passé composé</b> narrates the main events. Example: "Il <b>faisait</b> (imp.) beau. Soudain, il <b>a commencé</b> (p.c.) à pleuvoir."' }),

  makeMCQ({ id:'g6fr-imp-007', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Complete: "Nous ___ (habiter) à Port-Louis quand nous étions enfants."',
    options:['avons habité','habitions','habiterons','habitons'],
    answer:'habitions',
    hint:'Living somewhere as a child = habitual state → imparfait. Nous form.',
    explanation:'"Nous <b>habitions</b>" — habitual/ongoing state in the past → imparfait. habiter → nous habitons → habit- + -ions = habitons... wait. Stem: nous habitons → habit → habit + -ions = <b>habitions</b>.' }),

  makeMCQ({ id:'g6fr-imp-008', chapterId:'g6fr-imparfait', difficulty:1,
    question:'Which word is a typical clue for the IMPARFAIT (habitual past)?',
    options:['soudain (suddenly)','hier (yesterday)','toujours (always)','puis (then)'],
    answer:'toujours (always)',
    hint:'Frequency words signal habitual action.',
    explanation:'"<b>Toujours</b>" (always) signals a habitual/repeated action → imparfait. Other imparfait clues: souvent (often), chaque jour (every day), d\'habitude (usually), autrefois (in the past). Passé composé clues: soudain, puis, un jour, hier.' }),

  makeTF({ id:'g6fr-imp-009', chapterId:'g6fr-imparfait', difficulty:1,
    question:'The imparfait endings are the same for ALL verbs (except être).',
    answer:true,
    hint:'The stem changes but the endings -ais, -ais, -ait, -ions, -iez, -aient are always the same.',
    explanation:'<b>Vrai (True).</b> Every French verb (except être) uses the same imparfait endings: <b>-ais, -ais, -ait, -ions, -iez, -aient</b>. Only the stem differs (taken from the nous present form).' }),

  makeMCQ({ id:'g6fr-imp-010', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Complete: "Hier, pendant que je ___ (dormir), mon frère a téléphoné."',
    options:['dormais','ai dormi','dormira','dors'],
    answer:'dormais',
    hint:'"Pendant que" (while) + ongoing action = imparfait.',
    explanation:'"<b>dormais</b>" — "pendant que" (while) introduces an ongoing action → imparfait. dormir → nous dormons → dorm- + -ais = dormais. The interrupting action (mon frère a téléphoné) uses passé composé.' })

);
