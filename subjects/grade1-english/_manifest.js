'use strict';
const G1ENG_SYLLABUS = {};
registerSubject({
  id:         'grade1-english',
  name:       'English',
  grade:      1,
  icon:       '📖',
  subject:    'English',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  syllabus:   G1ENG_SYLLABUS,
  chapters: [
    { id: 'g1eng-listening', name: 'Listening', icon: '👂', examWeight: 1,
      syllabus: 'Recognise everyday sounds and English language sounds. Demonstrate active listening by maintaining eye contact and taking turns. Listen to and identify different types of aural texts such as poems, songs and stories. Show understanding of statements and questions by responding verbally or non-verbally.' },
    { id: 'g1eng-speaking', name: 'Speaking', icon: '🗣️', examWeight: 1,
      syllabus: 'Join in to recite nursery rhymes and sing songs. Respond verbally and non-verbally to input in English. Introduce oneself using name, age and class. Use simple sentences with support (e.g. I am…, She is…). Greet others and use polite forms such as please and thank you.' },
    { id: 'g1eng-reading', name: 'Reading Readiness', icon: '📚', examWeight: 1,
      syllabus: 'Express understanding that print contains messages. Recognise letters of the alphabet and distinguish among words, symbols and numbers. Recognise letter case such as bold and italics. Engage in picture reading including description, story telling and prediction. Match pictures with words and vice versa.' },
    { id: 'g1eng-writing', name: 'Writing', icon: '✏️', examWeight: 1,
      syllabus: 'Adopt appropriate seating posture and hold writing materials properly. Trace letters properly and neatly. Write capital and small letters of the alphabet properly. Copy simple written information in a left-to-right, top-to-bottom format. Copy name and familiar words.' },
    { id: 'g1eng-grammar', name: 'Grammar', icon: '📝', examWeight: 1,
      syllabus: 'Introduce common nouns through vocabulary building. Introduce use of s for more than one item. Introduce personal pronouns: I, you, he, she, we, they. Introduce interrogative pronouns: who, what, where. Introduce familiar adjectives. Expose to simple verbs such as come and go. Expose to Present Continuous Tense and Present Simple Tense.' },
    { id: 'g1eng-phonics', name: 'Phonics', icon: '🔤', examWeight: 1,
      syllabus: 'Recognise syllables in words using syllabic segmentation. Recognise word and sentence boundaries. Use phonemic awareness to decode simple words. Engage in picture reading and story prediction. Spell words phonetically as a strategy to write words.' },
  ],
});
