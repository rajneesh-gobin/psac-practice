'use strict';
(function () {

// Grade 1 Maths — Ordinal Numbers
// IDs: g1mth-ord-001 onwards
// Source: MIE Maths Grade 1 book scope (1st–5th)

// SVG helper: row of N items, item at position pos (1-indexed) highlighted
function _ordinalRow(emojis, highlightPos, labelText) {
  // emojis: array of emoji strings, highlightPos: 1-indexed
  var n = emojis.length;
  var w = 60;
  var total = n * w + 20;
  var parts = [];
  for (var i = 0; i < n; i++) {
    var x = 10 + i * w + w / 2;
    if (i + 1 === highlightPos) {
      parts.push('<rect x="' + (x - 26) + '" y="4" width="52" height="62" fill="#FDE68A" rx="8" opacity="0.7"/>');
    }
    parts.push('<text x="' + x + '" y="55" text-anchor="middle" font-size="38">' + emojis[i] + '</text>');
  }
  return '<div style="text-align:center;margin:.5em 0" aria-label="' + (labelText || 'a row of objects') + '">' +
    '<svg viewBox="0 0 ' + total + ' 70" style="width:100%;max-width:' + (total + 20) + 'px;height:auto" ' +
    'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    parts.join('') +
    '</svg></div>';
}

// ── positions_1_3 (001–035) ────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-ord-001', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question:
      _ordinalRow(['🐱','🐶','🐰','🐸','🐭'], 1, 'five animals in a row') +
      'The highlighted animal is in which position?',
    options:['1st (first)','2nd (second)','3rd (third)','5th (fifth)'],
    answer:'1st (first)',
    hint:'Count from the left: the yellow one is number 1.',
    explanation:'The cat is in the <b>1st (first)</b> position.' }),

  makeMCQ({ id:'g1mth-ord-002', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question:
      _ordinalRow(['🐱','🐶','🐰','🐸','🐭'], 2, 'five animals in a row') +
      'The highlighted animal is in which position?',
    options:['2nd (second)','1st (first)','3rd (third)','4th (fourth)'],
    answer:'2nd (second)',
    hint:'Count from the left: 1, 2. The yellow one is number 2.',
    explanation:'The dog is in the <b>2nd (second)</b> position.' }),

  makeMCQ({ id:'g1mth-ord-003', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question:
      _ordinalRow(['🐱','🐶','🐰','🐸','🐭'], 3, 'five animals in a row') +
      'The highlighted animal is in which position?',
    options:['3rd (third)','1st (first)','2nd (second)','5th (fifth)'],
    answer:'3rd (third)',
    hint:'Count from the left: 1, 2, 3.',
    explanation:'The rabbit is in the <b>3rd (third)</b> position.' }),

  makeMCQ({ id:'g1mth-ord-004', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question: 'Five children stand in a line: Tom, Ria, Sam, Aisha, Dev. Who is FIRST?',
    options:['Tom','Ria','Sam','Dev'],
    answer:'Tom',
    hint:'First means the one at the very front.',
    explanation:'<b>Tom</b> is first — he is at the very front of the line.' }),

  makeMCQ({ id:'g1mth-ord-005', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question: 'Five children stand in a line: Tom, Ria, Sam, Aisha, Dev. Who is SECOND?',
    options:['Ria','Tom','Sam','Dev'],
    answer:'Ria',
    hint:'Second means position 2.',
    explanation:'<b>Ria</b> is second — she is in position 2.' }),

  makeMCQ({ id:'g1mth-ord-006', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question: 'Five children stand in a line: Tom, Ria, Sam, Aisha, Dev. Who is THIRD?',
    options:['Sam','Tom','Ria','Dev'],
    answer:'Sam',
    hint:'Third means position 3.',
    explanation:'<b>Sam</b> is third — he is in position 3.' }),

  makeMCQ({ id:'g1mth-ord-007', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question:
      _ordinalRow(['🌸','🌻','🌹','🌼','🌷'], 1, 'five flowers in a row') +
      'Which flower is FIRST?',
    options:['Cherry blossom (left)','Sunflower','Rose','Tulip (right)'],
    answer:'Cherry blossom (left)',
    hint:'First is on the far left.',
    explanation:'The <b>first</b> flower is on the far left.' }),

  makeMCQ({ id:'g1mth-ord-008', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question:
      _ordinalRow(['🍎','🍊','🍋','🍇','🍓'], 2, 'five fruits in a row') +
      'The highlighted fruit is in which position?',
    options:['2nd','1st','3rd','5th'],
    answer:'2nd',
    hint:'Count: 1, 2.',
    explanation:'The orange is in the <b>2nd</b> position.' }),

  makeMCQ({ id:'g1mth-ord-009', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question:
      _ordinalRow(['🚗','🚕','🚙','🏎️','🚓'], 3, 'five cars in a row') +
      'Which car is in the THIRD position?',
    options:['Blue car (3rd from left)','Red car (1st)','Yellow taxi (2nd)','Police car (5th)'],
    answer:'Blue car (3rd from left)',
    hint:'Count: 1, 2, 3.',
    explanation:'The <b>third</b> car (highlighted) is in position 3.' }),

  makeTF({ id:'g1mth-ord-010', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question: 'The word "first" means the same as "1st".',
    answer:true,
    explanation:'Yes! <b>First = 1st</b>. They mean the same thing.' }),

  makeTF({ id:'g1mth-ord-011', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question: 'The second person in a line is behind the first person.',
    answer:true,
    explanation:'Yes! The <b>second</b> person comes after the first — so they are behind the first.' }),

  makeMCQ({ id:'g1mth-ord-012', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question: 'In a race, Neha comes in position 1. What word describes her position?',
    options:['First','Second','Third','Fifth'],
    answer:'First',
    hint:'Position 1 = ?',
    explanation:'Position 1 is called <b>first</b>. Neha came first!' }),

  makeMCQ({ id:'g1mth-ord-013', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question: 'In a race, Ravi comes in position 2. What medal does he get?',
    options:['Silver (2nd place)','Gold (1st place)','Bronze (3rd place)','No medal'],
    answer:'Silver (2nd place)',
    hint:'2nd place gets a silver medal.',
    explanation:'2nd place gets a <b>silver medal</b>.' }),

  makeMCQ({ id:'g1mth-ord-014', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question: 'In a race, Aisha comes in position 3. What medal does she get?',
    options:['Bronze (3rd place)','Gold (1st place)','Silver (2nd place)','No medal'],
    answer:'Bronze (3rd place)',
    hint:'3rd place gets a bronze medal.',
    explanation:'3rd place gets a <b>bronze medal</b>.' }),

  makeMCQ({ id:'g1mth-ord-015', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question:
      _ordinalRow(['🐠','🐡','🦈','🐙','🦑'], 0, 'five sea animals in a row') +
      'Which animal is FIRST (leftmost)?',
    options:['Tropical fish','Pufferfish','Shark','Octopus'],
    answer:'Tropical fish',
    hint:'First is on the far left.',
    explanation:'The <b>tropical fish</b> is first — it is on the far left.' }),

  makeTF({ id:'g1mth-ord-016', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question: '2nd means the same as "second".',
    answer:true,
    explanation:'Yes! <b>2nd = second</b>.' }),

  makeTF({ id:'g1mth-ord-017', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question: 'The third person in a line comes before the first.',
    answer:false,
    explanation:'The first person comes <b>before</b> the third. First → Second → Third.' }),

  makeMCQ({ id:'g1mth-ord-018', chapterId:'g1mth-ordinals', difficulty:2, subsection:'positions_1_3',
    question: 'Books on a shelf: Red, Blue, Green, Yellow, Orange. Which colour is THIRD?',
    options:['Green','Red','Blue','Yellow'],
    answer:'Green',
    hint:'Count: 1=Red, 2=Blue, 3=?',
    explanation:'<b>Green</b> is third: Red(1st), Blue(2nd), Green(3rd).' }),

  makeMCQ({ id:'g1mth-ord-019', chapterId:'g1mth-ordinals', difficulty:2, subsection:'positions_1_3',
    question: 'Books on a shelf: Red, Blue, Green, Yellow, Orange. Which colour is SECOND?',
    options:['Blue','Red','Green','Orange'],
    answer:'Blue',
    hint:'Count: 1=Red, 2=?',
    explanation:'<b>Blue</b> is second.' }),

  makeMCQ({ id:'g1mth-ord-020', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question: 'Which ordinal number comes between 1st and 3rd?',
    options:['2nd','4th','5th','1st'],
    answer:'2nd',
    hint:'1st, ___, 3rd.',
    explanation:'<b>2nd</b> comes between 1st and 3rd.' }),

  makeMCQ({ id:'g1mth-ord-021', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question: 'Which ordinal number comes AFTER 2nd?',
    options:['3rd','1st','4th','5th'],
    answer:'3rd',
    hint:'1st, 2nd, ___.',
    explanation:'<b>3rd</b> comes after 2nd.' }),

  makeMCQ({ id:'g1mth-ord-022', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question: 'Which ordinal number comes BEFORE 2nd?',
    options:['1st','3rd','4th','5th'],
    answer:'1st',
    hint:'___, 2nd, 3rd.',
    explanation:'<b>1st</b> comes before 2nd.' }),

  makeMCQ({ id:'g1mth-ord-023', chapterId:'g1mth-ordinals', difficulty:2, subsection:'positions_1_3',
    question: 'Zara is SECOND in the lunch queue. How many people are in front of her?',
    options:['1','2','3','0'],
    answer:'1',
    hint:'Second means there is one person ahead.',
    explanation:'Zara is 2nd, so <b>1 person</b> is in front of her (the 1st person).' }),

  makeMCQ({ id:'g1mth-ord-024', chapterId:'g1mth-ordinals', difficulty:2, subsection:'positions_1_3',
    question: 'Tom is THIRD in the queue. How many people are ahead of him?',
    options:['2','1','3','0'],
    answer:'2',
    hint:'Third means two people are ahead.',
    explanation:'Tom is 3rd, so <b>2 people</b> are ahead of him (1st and 2nd).' }),

  makeMCQ({ id:'g1mth-ord-025', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_1_3',
    question:
      _ordinalRow(['🍕','🍔','🌮','🍩','🍦'], 1, 'five foods in a row') +
      'The highlighted food is in position:',
    options:['1st','2nd','3rd','4th'],
    answer:'1st',
    hint:'It is on the far left.',
    explanation:'The pizza is in the <b>1st</b> position.' }),

// ── positions_4_5 (026–055) ────────────────────────────────────────────────

  makeMCQ({ id:'g1mth-ord-026', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_4_5',
    question:
      _ordinalRow(['🐱','🐶','🐰','🐸','🐭'], 4, 'five animals in a row') +
      'The highlighted animal is in which position?',
    options:['4th (fourth)','3rd (third)','5th (fifth)','2nd (second)'],
    answer:'4th (fourth)',
    hint:'Count from the left: 1, 2, 3, 4.',
    explanation:'The frog is in the <b>4th (fourth)</b> position.' }),

  makeMCQ({ id:'g1mth-ord-027', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_4_5',
    question:
      _ordinalRow(['🐱','🐶','🐰','🐸','🐭'], 5, 'five animals in a row') +
      'The highlighted animal is in which position?',
    options:['5th (fifth)','4th (fourth)','3rd (third)','1st (first)'],
    answer:'5th (fifth)',
    hint:'Count from the left: 1, 2, 3, 4, 5.',
    explanation:'The mouse is in the <b>5th (fifth)</b> position.' }),

  makeMCQ({ id:'g1mth-ord-028', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_4_5',
    question: 'Five children stand in a line: Tom, Ria, Sam, Aisha, Dev. Who is FOURTH?',
    options:['Aisha','Tom','Sam','Dev'],
    answer:'Aisha',
    hint:'Count: Tom(1), Ria(2), Sam(3), Aisha(?)',
    explanation:'<b>Aisha</b> is fourth — she is in position 4.' }),

  makeMCQ({ id:'g1mth-ord-029', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_4_5',
    question: 'Five children stand in a line: Tom, Ria, Sam, Aisha, Dev. Who is FIFTH?',
    options:['Dev','Aisha','Sam','Tom'],
    answer:'Dev',
    hint:'Count to 5: Tom(1), Ria(2), Sam(3), Aisha(4), Dev(?).',
    explanation:'<b>Dev</b> is fifth — he is in position 5, at the end.' }),

  makeMCQ({ id:'g1mth-ord-030', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_4_5',
    question: 'What ordinal comes AFTER 3rd?',
    options:['4th','5th','2nd','1st'],
    answer:'4th',
    hint:'3rd, ___.',
    explanation:'<b>4th</b> comes after 3rd.' }),

  makeMCQ({ id:'g1mth-ord-031', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_4_5',
    question: 'What ordinal comes AFTER 4th?',
    options:['5th','3rd','2nd','1st'],
    answer:'5th',
    hint:'4th, ___.',
    explanation:'<b>5th</b> comes after 4th.' }),

  makeMCQ({ id:'g1mth-ord-032', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_4_5',
    question: 'What ordinal comes BEFORE 5th?',
    options:['4th','3rd','2nd','1st'],
    answer:'4th',
    hint:'___, 5th.',
    explanation:'<b>4th</b> comes before 5th.' }),

  makeMCQ({ id:'g1mth-ord-033', chapterId:'g1mth-ordinals', difficulty:2, subsection:'positions_4_5',
    question: 'Books on a shelf: Red, Blue, Green, Yellow, Orange. Which colour is FOURTH?',
    options:['Yellow','Green','Orange','Blue'],
    answer:'Yellow',
    hint:'Count: 1=Red, 2=Blue, 3=Green, 4=?',
    explanation:'<b>Yellow</b> is fourth.' }),

  makeMCQ({ id:'g1mth-ord-034', chapterId:'g1mth-ordinals', difficulty:2, subsection:'positions_4_5',
    question: 'Books on a shelf: Red, Blue, Green, Yellow, Orange. Which colour is FIFTH?',
    options:['Orange','Yellow','Green','Red'],
    answer:'Orange',
    hint:'Count to 5: 1=Red, 2=Blue, 3=Green, 4=Yellow, 5=?',
    explanation:'<b>Orange</b> is fifth.' }),

  makeMCQ({ id:'g1mth-ord-035', chapterId:'g1mth-ordinals', difficulty:2, subsection:'positions_4_5',
    question:
      _ordinalRow(['🍎','🍊','🍋','🍇','🍓'], 4, 'five fruits in a row') +
      'The highlighted fruit is in which position?',
    options:['4th','3rd','5th','2nd'],
    answer:'4th',
    hint:'Count: 1, 2, 3, 4.',
    explanation:'The grapes are in the <b>4th</b> position.' }),

  makeMCQ({ id:'g1mth-ord-036', chapterId:'g1mth-ordinals', difficulty:2, subsection:'positions_4_5',
    question:
      _ordinalRow(['🍎','🍊','🍋','🍇','🍓'], 5, 'five fruits in a row') +
      'The highlighted fruit is in which position?',
    options:['5th','4th','3rd','1st'],
    answer:'5th',
    hint:'Count: 1, 2, 3, 4, 5.',
    explanation:'The strawberry is in the <b>5th</b> position.' }),

  makeTF({ id:'g1mth-ord-037', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_4_5',
    question: '4th means "fourth".',
    answer:true,
    explanation:'Yes! <b>4th = fourth</b>. They mean the same thing.' }),

  makeTF({ id:'g1mth-ord-038', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_4_5',
    question: '5th means "third".',
    answer:false,
    explanation:'5th means <b>fifth</b>, not third. 3rd means third.' }),

  makeMCQ({ id:'g1mth-ord-039', chapterId:'g1mth-ordinals', difficulty:2, subsection:'positions_4_5',
    question: 'Sam is FOURTH in the lunch queue. How many people are in front of him?',
    options:['3','4','2','1'],
    answer:'3',
    hint:'Fourth means three people are ahead.',
    explanation:'Sam is 4th, so <b>3 people</b> are ahead of him.' }),

  makeMCQ({ id:'g1mth-ord-040', chapterId:'g1mth-ordinals', difficulty:2, subsection:'positions_4_5',
    question: 'Mia is FIFTH in the queue. How many people are in front of her?',
    options:['4','5','3','2'],
    answer:'4',
    hint:'Fifth means four people are ahead.',
    explanation:'Mia is 5th, so <b>4 people</b> are ahead of her.' }),

  makeMCQ({ id:'g1mth-ord-041', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_4_5',
    question: 'Which is the LAST position in a row of 5?',
    options:['5th','4th','3rd','1st'],
    answer:'5th',
    hint:'The last of five things is in position 5.',
    explanation:'The <b>5th</b> position is the last in a row of 5.' }),

  makeMCQ({ id:'g1mth-ord-042', chapterId:'g1mth-ordinals', difficulty:2, subsection:'positions_4_5',
    question:
      _ordinalRow(['🚗','🚕','🚙','🏎️','🚓'], 4, 'five cars in a row') +
      'The highlighted car is in which position?',
    options:['4th','5th','3rd','2nd'],
    answer:'4th',
    hint:'Count: 1, 2, 3, 4.',
    explanation:'The racing car is in the <b>4th</b> position.' }),

  makeMCQ({ id:'g1mth-ord-043', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_4_5',
    question: 'Priya finishes the race in 4th place. Which medal does she get?',
    options:['No medal (4th does not get a medal)','Gold','Silver','Bronze'],
    answer:'No medal (4th does not get a medal)',
    hint:'Only the top 3 get medals.',
    explanation:'Only 1st, 2nd and 3rd get medals. 4th place gets <b>no medal</b>.' }),

  makeTF({ id:'g1mth-ord-044', chapterId:'g1mth-ordinals', difficulty:1, subsection:'positions_4_5',
    question: 'In a row of five, the fifth is at the very end.',
    answer:true,
    explanation:'Yes! The <b>fifth</b> is the last one in a row of five.' }),

  makeMCQ({ id:'g1mth-ord-045', chapterId:'g1mth-ordinals', difficulty:2, subsection:'positions_4_5',
    question: 'Shapes in a row: Circle, Square, Triangle, Star, Diamond. What shape is FOURTH?',
    options:['Star','Circle','Triangle','Diamond'],
    answer:'Star',
    hint:'Count: Circle(1), Square(2), Triangle(3), Star(?).',
    explanation:'<b>Star</b> is fourth.' }),

// ── ordinal_words (046–080) ────────────────────────────────────────────────

  makeMCQ({ id:'g1mth-ord-046', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: 'What is the ordinal word for 1?',
    options:['First','Second','Third','Fourth'],
    answer:'First',
    hint:'1st = ?',
    explanation:'1st = <b>First</b>.' }),

  makeMCQ({ id:'g1mth-ord-047', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: 'What is the ordinal word for 2?',
    options:['Second','First','Third','Fourth'],
    answer:'Second',
    hint:'2nd = ?',
    explanation:'2nd = <b>Second</b>.' }),

  makeMCQ({ id:'g1mth-ord-048', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: 'What is the ordinal word for 3?',
    options:['Third','First','Second','Fifth'],
    answer:'Third',
    hint:'3rd = ?',
    explanation:'3rd = <b>Third</b>.' }),

  makeMCQ({ id:'g1mth-ord-049', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: 'What is the ordinal word for 4?',
    options:['Fourth','First','Third','Fifth'],
    answer:'Fourth',
    hint:'4th = ?',
    explanation:'4th = <b>Fourth</b>.' }),

  makeMCQ({ id:'g1mth-ord-050', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: 'What is the ordinal word for 5?',
    options:['Fifth','Fourth','Third','Second'],
    answer:'Fifth',
    hint:'5th = ?',
    explanation:'5th = <b>Fifth</b>.' }),

  makeMCQ({ id:'g1mth-ord-051', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: 'Which short form is the SAME as "first"?',
    options:['1st','2nd','3rd','4th'],
    answer:'1st',
    hint:'First is number 1.',
    explanation:'<b>1st</b> = first.' }),

  makeMCQ({ id:'g1mth-ord-052', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: 'Which short form is the SAME as "fifth"?',
    options:['5th','4th','3rd','2nd'],
    answer:'5th',
    hint:'Fifth is number 5.',
    explanation:'<b>5th</b> = fifth.' }),

  makeMCQ({ id:'g1mth-ord-053', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: 'Which short form is the SAME as "third"?',
    options:['3rd','1st','2nd','4th'],
    answer:'3rd',
    hint:'Third is number 3.',
    explanation:'<b>3rd</b> = third.' }),

  makeTF({ id:'g1mth-ord-054', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: '"Second" and "2nd" mean the same thing.',
    answer:true,
    explanation:'Yes! <b>Second = 2nd</b>.' }),

  makeTF({ id:'g1mth-ord-055', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: '"Fourth" and "5th" mean the same thing.',
    answer:false,
    explanation:'<b>Fourth = 4th</b>. 5th means fifth, not fourth.' }),

  makeMCQ({ id:'g1mth-ord-056', chapterId:'g1mth-ordinals', difficulty:2, subsection:'ordinal_words',
    question: 'Sam won the race and got a gold medal. Which ordinal word describes his position?',
    options:['First','Second','Third','Fifth'],
    answer:'First',
    hint:'Gold medal = 1st place.',
    explanation:'Sam came <b>first</b> — that is why he got the gold medal.' }),

  makeMCQ({ id:'g1mth-ord-057', chapterId:'g1mth-ordinals', difficulty:2, subsection:'ordinal_words',
    question: 'Ria got the silver medal. Which ordinal word describes her position?',
    options:['Second','First','Third','Fourth'],
    answer:'Second',
    hint:'Silver medal = 2nd place.',
    explanation:'Ria came <b>second</b> — the silver medal is for 2nd place.' }),

  makeMCQ({ id:'g1mth-ord-058', chapterId:'g1mth-ordinals', difficulty:2, subsection:'ordinal_words',
    question: 'Dev got the bronze medal. Which ordinal word describes his position?',
    options:['Third','First','Second','Fourth'],
    answer:'Third',
    hint:'Bronze medal = 3rd place.',
    explanation:'Dev came <b>third</b> — the bronze medal is for 3rd place.' }),

  makeMCQ({ id:'g1mth-ord-059', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: 'Write the ordinal for the number 4: __',
    options:['Fourth','First','Third','Fifth'],
    answer:'Fourth',
    hint:'4 → four → fourth.',
    explanation:'The ordinal for 4 is <b>fourth</b>.' }),

  makeMCQ({ id:'g1mth-ord-060', chapterId:'g1mth-ordinals', difficulty:2, subsection:'ordinal_words',
    question: 'Complete the sequence: first, second, ___, fourth, fifth.',
    options:['third','one','six','last'],
    answer:'third',
    hint:'What comes between second and fourth?',
    explanation:'The sequence is: first, second, <b>third</b>, fourth, fifth.' }),

  makeMCQ({ id:'g1mth-ord-061', chapterId:'g1mth-ordinals', difficulty:2, subsection:'ordinal_words',
    question: 'Complete the sequence: 1st, 2nd, 3rd, ___, 5th.',
    options:['4th','3rd','6th','2nd'],
    answer:'4th',
    hint:'What comes between 3rd and 5th?',
    explanation:'The sequence is: 1st, 2nd, 3rd, <b>4th</b>, 5th.' }),

  makeMCQ({ id:'g1mth-ord-062', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: 'Priya reads the THIRD book on the shelf. Which number is that?',
    options:['3','1','2','5'],
    answer:'3',
    hint:'Third = 3rd = number 3.',
    explanation:'Third = <b>number 3</b>. Priya reads the 3rd book.' }),

  makeMCQ({ id:'g1mth-ord-063', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: 'Ravi eats the FIFTH biscuit from the tin. Which number biscuit is that?',
    options:['5','4','3','2'],
    answer:'5',
    hint:'Fifth = 5th = number 5.',
    explanation:'Fifth = <b>number 5</b>. Ravi eats the 5th biscuit.' }),

  makeMCQ({ id:'g1mth-ord-064', chapterId:'g1mth-ordinals', difficulty:2, subsection:'ordinal_words',
    question: 'Which ordinal word is missing? 1st, 2nd, third, 4th, ___.',
    options:['fifth','fourth','third','sixth'],
    answer:'fifth',
    hint:'After 4th comes 5th = ?',
    explanation:'After 4th comes <b>fifth</b> (5th).' }),

  makeTF({ id:'g1mth-ord-065', chapterId:'g1mth-ordinals', difficulty:1, subsection:'ordinal_words',
    question: '"Fifth" comes after "fourth".',
    answer:true,
    explanation:'Yes! The order is: first, second, third, fourth, <b>fifth</b>.' }),

  makeMCQ({ id:'g1mth-ord-066', chapterId:'g1mth-ordinals', difficulty:2, subsection:'ordinal_words',
    question: 'Match: Second = ?',
    options:['2nd','1st','3rd','5th'],
    answer:'2nd',
    hint:'Second = number 2.',
    explanation:'<b>Second = 2nd</b>.' }),

  makeMCQ({ id:'g1mth-ord-067', chapterId:'g1mth-ordinals', difficulty:2, subsection:'ordinal_words',
    question: 'Match: 3rd = ?',
    options:['Third','First','Second','Fourth'],
    answer:'Third',
    hint:'3rd = number 3 = ?',
    explanation:'<b>3rd = Third</b>.' }),

  makeMCQ({ id:'g1mth-ord-068', chapterId:'g1mth-ordinals', difficulty:3, subsection:'ordinal_words',
    question: 'Neha is the FOURTH child to sit down. If 5 children sit down, what position is the LAST child?',
    options:['Fifth','Fourth','Third','Second'],
    answer:'Fifth',
    hint:'After the fourth child, which position is next?',
    explanation:'The last of 5 children is in the <b>fifth</b> position.' }),

  makeMCQ({ id:'g1mth-ord-069', chapterId:'g1mth-ordinals', difficulty:3, subsection:'ordinal_words',
    question: 'Ali is third in the queue. Mia is just BEHIND Ali. What position is Mia in?',
    options:['Fourth','Third','Second','Fifth'],
    answer:'Fourth',
    hint:'Just behind the third is the fourth.',
    explanation:'Just behind 3rd is <b>4th</b>. Mia is fourth.' }),

  makeMCQ({ id:'g1mth-ord-070', chapterId:'g1mth-ordinals', difficulty:3, subsection:'ordinal_words',
    question: 'Zara is second in the queue. Her friend is just IN FRONT of her. What position is her friend?',
    options:['First','Third','Fourth','Fifth'],
    answer:'First',
    hint:'In front of 2nd is 1st.',
    explanation:'In front of 2nd is <b>1st</b>. Her friend is first.' }),

  makeMCQ({ id:'g1mth-ord-071', chapterId:'g1mth-ordinals', difficulty:2, subsection:'ordinal_words',
    question: 'Days of the week: Monday, Tuesday, Wednesday, Thursday, Friday. Which day is SECOND?',
    options:['Tuesday','Monday','Wednesday','Friday'],
    answer:'Tuesday',
    hint:'Monday is 1st, so Tuesday is 2nd.',
    explanation:'<b>Tuesday</b> is the second school day of the week.' }),

  makeMCQ({ id:'g1mth-ord-072', chapterId:'g1mth-ordinals', difficulty:2, subsection:'ordinal_words',
    question: 'Days of the week: Monday, Tuesday, Wednesday, Thursday, Friday. Which day is FIFTH?',
    options:['Friday','Monday','Thursday','Wednesday'],
    answer:'Friday',
    hint:'Count: Mon(1), Tue(2), Wed(3), Thu(4), Fri(5).',
    explanation:'<b>Friday</b> is the fifth school day.' }),

  makeMCQ({ id:'g1mth-ord-073', chapterId:'g1mth-ordinals', difficulty:2, subsection:'ordinal_words',
    question: 'Which ordinal word describes the very LAST of five things?',
    options:['Fifth','Fourth','Third','First'],
    answer:'Fifth',
    hint:'The last of five is in position 5.',
    explanation:'The last of five is the <b>fifth</b>.' }),

  makeMCQ({ id:'g1mth-ord-074', chapterId:'g1mth-ordinals', difficulty:2, subsection:'ordinal_words',
    question: 'Which ordinal word describes the very FIRST thing?',
    options:['First','Second','Third','Fifth'],
    answer:'First',
    hint:'The very beginning is first.',
    explanation:'The very beginning is the <b>first</b>.' }),

  makeMCQ({ id:'g1mth-ord-075', chapterId:'g1mth-ordinals', difficulty:3, subsection:'ordinal_words',
    question: 'Five friends sit in a row. Ravi is between the second and the fourth. What position is Ravi?',
    options:['Third','Second','Fourth','Fifth'],
    answer:'Third',
    hint:'Between 2nd and 4th is 3rd.',
    explanation:'Between 2nd and 4th is <b>third</b>. Ravi is in 3rd position.' }),

);
})();
