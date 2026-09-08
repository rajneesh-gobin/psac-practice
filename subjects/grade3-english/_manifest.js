'use strict';
const G3ENG_SYLLABUS = {};
registerSubject({
  id:         'grade3-english',
  name:       'English',
  grade:      3,
  icon:       '📖',
  subject:    'English',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  syllabus:   G3ENG_SYLLABUS,
  chapters: [
    { id: 'g3eng-listening', name: 'Listening', icon: '👂', examWeight: 1,
      syllabus: 'Show understanding of aural texts dealing with familiar topics with visual support. Make predictions based on what has been heard. Identify information related to characters, setting and plot in fairy tales and stories. Identify the purpose of aural texts such as to instruct, inform, persuade or entertain. Listen for main ideas and additional details.' },
    { id: 'g3eng-speaking', name: 'Speaking', icon: '🗣️', examWeight: 1,
      syllabus: 'Pronounce words accurately without support. Narrate events and incidents from everyday life with growing independence. Talk about familiar topics giving details such as holidays, food and environment. Participate in a range of oral activities including presentation and role play. Use affirmative and negative forms more independently. Ask for permission, request information and ask for clarification.' },
    { id: 'g3eng-reading', name: 'Reading', icon: '📚', examWeight: 1,
      syllabus: 'Apply decoding skills including segmenting, blending and consonant clusters to read unfamiliar words. Use text attack skills to derive meaning from title, layout and paragraphing. Identify key ideas and specific information in texts. Make predictions based on information in texts with growing independence. Read aloud fluently and with growing independence.' },
    { id: 'g3eng-writing', name: 'Writing', icon: '✏️', examWeight: 1,
      syllabus: 'Complete words with missing letters without given clues. Write sentences from dictation. Use simple vocabulary related to familiar situations. Use common punctuation marks appropriately including full stop, question marks and commas. Use appropriate tenses to situate action in time. Write simple sentences and produce short texts with the help of a writing frame.' },
    { id: 'g3eng-grammar', name: 'Grammar', icon: '📝', examWeight: 1,
      syllabus: 'Use words referring to persons, animals, places and things. Introduce basic uncountable nouns such as rice, water and sugar. Introduce gendered and neutral nouns. Form plurals with es and ies. Reinforce use of personal pronouns. Reinforce use of interrogative pronouns. Introduce Present Simple Tense with es and ies endings and irregular forms. Introduce Past Simple Tense.' },
    { id: 'g3eng-phonics', name: 'Phonics', icon: '🔤', examWeight: 1,
      syllabus: 'Use phonemic awareness to decode words through segmenting, blending and consonant clusters. Recognise syllables in words. Recognise word and sentence boundaries. Spell high-frequency words correctly. Write grammatically correct sentences. Start to use word attack skills to derive meaning using root word, prefix, suffix and plural.' },
  ],
});
