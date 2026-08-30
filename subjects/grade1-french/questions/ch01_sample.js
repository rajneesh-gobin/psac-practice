'use strict';
// Grade 1 Français — PLACEHOLDER. Delete this file when real questions land.
// IDs format: g1fr-samp-NNN
//
// This exists so the questions/ directory is not empty and the file shape is
// copyable. The pack is comingSoon: true, so nothing here is ever served to a
// child: QuestionLoader skips comingSoon packs and assembleExamPaper never sees
// the chapter (examWeight: 0 as well, belt and braces).

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1fr-samp-001', chapterId:'g1fr-sample', difficulty:1,
    question:'Placeholder — this pack has no real questions yet.',
    options:['A','B','C','D'],
    answer:'A',
    hint:'Replace this file with real Grade 1 French questions.',
    explanation:'Placeholder question for the Grade 1 Français pack.' })

);
