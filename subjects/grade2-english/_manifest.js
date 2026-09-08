'use strict';
const G2ENG_SYLLABUS = {};
registerSubject({
  id:         'grade2-english',
  name:       'English',
  grade:      2,
  icon:       '📖',
  subject:    'English',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  syllabus:   G2ENG_SYLLABUS,
  chapters: [
    { id: 'g2eng-listening', name: 'Listening', icon: '👂', examWeight: 1,
      syllabus: 'Identify different types of aural texts such as weather forecasts, poems, songs and stories. Listen attentively and show understanding by responding with short answers. Enjoy listening to different aural texts and recognise rhyming words. Show understanding of key vocabulary and phrases with visual support. Listen for main ideas and some details.' },
    { id: 'g2eng-speaking', name: 'Speaking', icon: '🗣️', examWeight: 1,
      syllabus: 'Pronounce words accurately with support. Vary intonation according to purpose such as statement and interrogation. Give basic information about oneself and others including family and hobbies. Convey the gist of events or stories using single words or phrases with prompts. Express likes and dislikes using short responses. Use affirmative and negative forms with support.' },
    { id: 'g2eng-reading', name: 'Reading', icon: '📚', examWeight: 1,
      syllabus: 'Use phonemic awareness to decode words through segmenting, blending and consonant clusters. Engage in shared and individual reading activities. Read simple written instructions in class. Follow development of ideas in texts with support. Identify key ideas and some details. Read aloud with fluency under guidance.' },
    { id: 'g2eng-writing', name: 'Writing', icon: '✏️', examWeight: 1,
      syllabus: 'Show enthusiasm to engage in writing activities such as greetings cards, postcards and posters. Complete words with missing letters using given clues. Write common words from dictation. Use simple vocabulary related to familiar situations. Sequence words properly to form parts of sentences. Complete simple sentences given a word or picture bank.' },
    { id: 'g2eng-grammar', name: 'Grammar', icon: '📝', examWeight: 1,
      syllabus: 'Form plural nouns with s. Use frequently used gendered nouns such as mother/father and boy/girl. Use personal pronoun it. Use interrogative pronoun when. Extend range of frequently used adjectives and their opposites. Further expose to Present Continuous Tense and Present Simple Tense. Introduce Future Simple Tense for actions happening in the future.' },
    { id: 'g2eng-phonics', name: 'Phonics', icon: '🔤', examWeight: 1,
      syllabus: 'Recognise the different sounds of the English language including different consonants, vowels, consonant clusters and vowel combinations. Use phonemic awareness to decode words through segmenting and blending. Spell words phonetically as a strategy to write words. Recognise word and sentence boundaries.' },
  ],
});
