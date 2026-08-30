'use strict';
// Grade 2 English — PLACEHOLDER. Delete this file when real questions land.
// IDs format: g2eng-samp-NNN
//
// This exists so the questions/ directory is not empty and the file shape is
// copyable. The pack is comingSoon: true, so nothing here is ever served to a
// child: QuestionLoader skips comingSoon packs and assembleExamPaper never sees
// the chapter (examWeight: 0 as well, belt and braces).

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g2eng-samp-001', chapterId:'g2eng-sample', difficulty:1,
    question:'Placeholder — this pack has no real questions yet.',
    options:['A','B','C','D'],
    answer:'A',
    hint:'Replace this file with real Grade 2 English questions.',
    explanation:'Placeholder question for the Grade 2 English pack.' })

);
