'use strict';
(function () {

// ── subtracting_within_10 (001–025) ──────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-sub-001', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'9 − 4 = ?',
    options:['5','6','4','3'], answer:'5',
    hint:'Count back 4 from 9: 8, 7, 6, 5.',
    explanation:'9 − 4 = <b>5</b>.' }),

  makeMCQ({ id:'g1mth-sub-002', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'There are 7 fish in a bowl. 3 swim away. How many are left?',
    options:['4','3','5','6'], answer:'4',
    hint:'7 − 3 = ?',
    explanation:'7 − 3 = <b>4</b>. Four fish are left.' }),

  makeMCQ({ id:'g1mth-sub-003', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'10 − 6 = ?',
    options:['4','3','5','6'], answer:'4',
    hint:'Count back 6 from 10.',
    explanation:'10 − 6 = <b>4</b>.' }),

  makeMCQ({ id:'g1mth-sub-004', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'8 − 5 = ?',
    options:['3','2','4','5'], answer:'3',
    hint:'Count back 5 from 8.',
    explanation:'8 − 5 = <b>3</b>.' }),

  makeMCQ({ id:'g1mth-sub-005', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'Rani has 6 mangoes. She eats 2. How many are left?',
    options:['4','3','5','6'], answer:'4',
    hint:'6 − 2 = ?',
    explanation:'6 − 2 = <b>4</b>. Rani has 4 mangoes left.' }),

  makeMCQ({ id:'g1mth-sub-006', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'5 − 0 = ?',
    options:['5','0','4','6'], answer:'5',
    hint:'Taking away zero does not change the number.',
    explanation:'5 − 0 = <b>5</b>. Nothing is taken away.' }),

  makeMCQ({ id:'g1mth-sub-007', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'6 − 6 = ?',
    options:['0','1','6','12'], answer:'0',
    hint:'If you take all of them away, what is left?',
    explanation:'6 − 6 = <b>0</b>. Nothing is left.' }),

  makeMCQ({ id:'g1mth-sub-008', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'Tom has 10 lychees. He gives 4 to Dev. How many does Tom have left?',
    options:['6','5','7','4'], answer:'6',
    hint:'10 − 4 = ?',
    explanation:'10 − 4 = <b>6</b>. Tom has 6 lychees left.' }),

  makeMCQ({ id:'g1mth-sub-009', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'7 − 2 = ?',
    options:['5','4','6','3'], answer:'5',
    hint:'Count back 2 from 7.',
    explanation:'7 − 2 = <b>5</b>.' }),

  makeMCQ({ id:'g1mth-sub-010', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'9 − 9 = ?',
    options:['0','1','9','18'], answer:'0',
    hint:'Taking all of a number away leaves zero.',
    explanation:'9 − 9 = <b>0</b>.' }),

  makeMCQ({ id:'g1mth-sub-011', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'There are 5 balloons. 3 pop. How many are left?',
    options:['2','1','3','4'], answer:'2',
    hint:'5 − 3 = ?',
    explanation:'5 − 3 = <b>2</b>. Two balloons are left.' }),

  makeMCQ({ id:'g1mth-sub-012', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'8 − 8 = ?',
    options:['0','1','8','16'], answer:'0',
    hint:'Taking all away leaves zero.',
    explanation:'8 − 8 = <b>0</b>.' }),

  makeMCQ({ id:'g1mth-sub-013', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'4 − 1 = ?',
    options:['3','2','4','5'], answer:'3',
    hint:'Count back 1 from 4.',
    explanation:'4 − 1 = <b>3</b>.' }),

  makeMCQ({ id:'g1mth-sub-014', chapterId:'g1mth-subtraction', difficulty:2, subsection:'subtracting_within_10',
    question:'Mia has 8 rupees. She buys a pencil for 3 rupees. How much does she have left?',
    options:['5','4','6','3'], answer:'5',
    hint:'8 − 3 = ?',
    explanation:'8 − 3 = <b>5</b>. Mia has 5 rupees left.' }),

  makeMCQ({ id:'g1mth-sub-015', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'10 − 10 = ?',
    options:['0','1','10','20'], answer:'0',
    hint:'Taking all away leaves zero.',
    explanation:'10 − 10 = <b>0</b>.' }),

  makeMCQ({ id:'g1mth-sub-016', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'6 − 4 = ?',
    options:['2','1','3','4'], answer:'2',
    hint:'Count back 4 from 6.',
    explanation:'6 − 4 = <b>2</b>.' }),

  makeMCQ({ id:'g1mth-sub-017', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'9 − 3 = ?',
    options:['6','5','7','4'], answer:'6',
    hint:'Count back 3 from 9.',
    explanation:'9 − 3 = <b>6</b>.' }),

  makeMCQ({ id:'g1mth-sub-018', chapterId:'g1mth-subtraction', difficulty:2, subsection:'subtracting_within_10',
    question:'Dev has 7 stickers. He gives 5 to Rani. How many does Dev have?',
    options:['2','1','3','4'], answer:'2',
    hint:'7 − 5 = ?',
    explanation:'7 − 5 = <b>2</b>. Dev has 2 stickers left.' }),

  makeMCQ({ id:'g1mth-sub-019', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'10 − 1 = ?',
    options:['9','8','10','11'], answer:'9',
    hint:'Count back 1 from 10.',
    explanation:'10 − 1 = <b>9</b>.' }),

  makeMCQ({ id:'g1mth-sub-020', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'3 − 2 = ?',
    options:['1','0','2','3'], answer:'1',
    hint:'Count back 2 from 3.',
    explanation:'3 − 2 = <b>1</b>.' }),

  makeMCQ({ id:'g1mth-sub-021', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'8 − 3 = ?',
    options:['5','4','6','7'], answer:'5',
    hint:'Count back 3 from 8.',
    explanation:'8 − 3 = <b>5</b>.' }),

  makeMCQ({ id:'g1mth-sub-022', chapterId:'g1mth-subtraction', difficulty:2, subsection:'subtracting_within_10',
    question:'There are 9 birds on a branch. 4 fly away. How many stay?',
    options:['5','4','6','3'], answer:'5',
    hint:'9 − 4 = ?',
    explanation:'9 − 4 = <b>5</b>. Five birds stay.' }),

  makeMCQ({ id:'g1mth-sub-023', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'7 − 7 = ?',
    options:['0','1','7','14'], answer:'0',
    hint:'Taking all away leaves zero.',
    explanation:'7 − 7 = <b>0</b>.' }),

  makeMCQ({ id:'g1mth-sub-024', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_10',
    question:'5 − 3 = ?',
    options:['2','1','3','4'], answer:'2',
    hint:'Count back 3 from 5.',
    explanation:'5 − 3 = <b>2</b>.' }),

  makeMCQ({ id:'g1mth-sub-025', chapterId:'g1mth-subtraction', difficulty:2, subsection:'subtracting_within_10',
    question:'Tom has 10 rupees. He spends 7 rupees on a toy. How much does he have left?',
    options:['3','2','4','5'], answer:'3',
    hint:'10 − 7 = ?',
    explanation:'10 − 7 = <b>3</b>. Tom has 3 rupees left.' })
);

// ── subtracting_within_20 (026–050) ──────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-sub-026', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'14 − 6 = ?',
    options:['8','7','9','6'], answer:'8',
    hint:'Count back 6 from 14.',
    explanation:'14 − 6 = <b>8</b>.' }),

  makeMCQ({ id:'g1mth-sub-027', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'Mia has 15 flowers. She gives 8 away. How many does she have left?',
    options:['7','8','6','9'], answer:'7',
    hint:'15 − 8 = ?',
    explanation:'15 − 8 = <b>7</b>. Mia has 7 flowers left.' }),

  makeMCQ({ id:'g1mth-sub-028', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'20 − 10 = ?',
    options:['10','9','11','8'], answer:'10',
    hint:'Count back 10 from 20.',
    explanation:'20 − 10 = <b>10</b>.' }),

  makeMCQ({ id:'g1mth-sub-029', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'13 − 5 = ?',
    options:['8','7','9','6'], answer:'8',
    hint:'Count back 5 from 13.',
    explanation:'13 − 5 = <b>8</b>.' }),

  makeMCQ({ id:'g1mth-sub-030', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'16 − 7 = ?',
    options:['9','8','10','7'], answer:'9',
    hint:'Count back 7 from 16.',
    explanation:'16 − 7 = <b>9</b>.' }),

  makeMCQ({ id:'g1mth-sub-031', chapterId:'g1mth-subtraction', difficulty:2, subsection:'subtracting_within_20',
    question:'Rani has 18 rupees. She buys a book for 9 rupees. How much is left?',
    options:['9','8','10','7'], answer:'9',
    hint:'18 − 9 = ?',
    explanation:'18 − 9 = <b>9</b>. Rani has 9 rupees left.' }),

  makeMCQ({ id:'g1mth-sub-032', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'20 − 5 = ?',
    options:['15','14','16','13'], answer:'15',
    hint:'Count back 5 from 20.',
    explanation:'20 − 5 = <b>15</b>.' }),

  makeMCQ({ id:'g1mth-sub-033', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'12 − 4 = ?',
    options:['8','7','9','6'], answer:'8',
    hint:'Count back 4 from 12.',
    explanation:'12 − 4 = <b>8</b>.' }),

  makeMCQ({ id:'g1mth-sub-034', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'17 − 8 = ?',
    options:['9','8','10','7'], answer:'9',
    hint:'Count back 8 from 17.',
    explanation:'17 − 8 = <b>9</b>.' }),

  makeMCQ({ id:'g1mth-sub-035', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'20 − 9 = ?',
    options:['11','10','12','9'], answer:'11',
    hint:'Count back 9 from 20.',
    explanation:'20 − 9 = <b>11</b>.' }),

  makeMCQ({ id:'g1mth-sub-036', chapterId:'g1mth-subtraction', difficulty:2, subsection:'subtracting_within_20',
    question:'Tom scores 20 points. He loses 6. How many does he have?',
    options:['14','13','15','12'], answer:'14',
    hint:'20 − 6 = ?',
    explanation:'20 − 6 = <b>14</b>. Tom has 14 points.' }),

  makeMCQ({ id:'g1mth-sub-037', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'19 − 9 = ?',
    options:['10','9','11','8'], answer:'10',
    hint:'Count back 9 from 19.',
    explanation:'19 − 9 = <b>10</b>.' }),

  makeMCQ({ id:'g1mth-sub-038', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'11 − 3 = ?',
    options:['8','7','9','6'], answer:'8',
    hint:'Count back 3 from 11.',
    explanation:'11 − 3 = <b>8</b>.' }),

  makeMCQ({ id:'g1mth-sub-039', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'15 − 5 = ?',
    options:['10','9','11','8'], answer:'10',
    hint:'Count back 5 from 15.',
    explanation:'15 − 5 = <b>10</b>.' }),

  makeMCQ({ id:'g1mth-sub-040', chapterId:'g1mth-subtraction', difficulty:2, subsection:'subtracting_within_20',
    question:'Dev has 16 lychees. He eats 7. How many are left?',
    options:['9','8','10','7'], answer:'9',
    hint:'16 − 7 = ?',
    explanation:'16 − 7 = <b>9</b>. Dev has 9 lychees left.' }),

  makeMCQ({ id:'g1mth-sub-041', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'18 − 9 = ?',
    options:['9','8','10','7'], answer:'9',
    hint:'Count back 9 from 18.',
    explanation:'18 − 9 = <b>9</b>.' }),

  makeMCQ({ id:'g1mth-sub-042', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'14 − 7 = ?',
    options:['7','6','8','5'], answer:'7',
    hint:'Count back 7 from 14.',
    explanation:'14 − 7 = <b>7</b>.' }),

  makeMCQ({ id:'g1mth-sub-043', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'20 − 8 = ?',
    options:['12','11','13','10'], answer:'12',
    hint:'Count back 8 from 20.',
    explanation:'20 − 8 = <b>12</b>.' }),

  makeMCQ({ id:'g1mth-sub-044', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'13 − 6 = ?',
    options:['7','6','8','5'], answer:'7',
    hint:'Count back 6 from 13.',
    explanation:'13 − 6 = <b>7</b>.' }),

  makeMCQ({ id:'g1mth-sub-045', chapterId:'g1mth-subtraction', difficulty:2, subsection:'subtracting_within_20',
    question:'Mia has 20 rupees. She buys a snack for 11 rupees. How much is left?',
    options:['9','8','10','11'], answer:'9',
    hint:'20 − 11 = ?',
    explanation:'20 − 11 = <b>9</b>. Mia has 9 rupees left.' }),

  makeMCQ({ id:'g1mth-sub-046', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'12 − 8 = ?',
    options:['4','3','5','6'], answer:'4',
    hint:'Count back 8 from 12.',
    explanation:'12 − 8 = <b>4</b>.' }),

  makeMCQ({ id:'g1mth-sub-047', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'17 − 9 = ?',
    options:['8','7','9','6'], answer:'8',
    hint:'Count back 9 from 17.',
    explanation:'17 − 9 = <b>8</b>.' }),

  makeMCQ({ id:'g1mth-sub-048', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'20 − 13 = ?',
    options:['7','6','8','5'], answer:'7',
    hint:'Count back 13 from 20.',
    explanation:'20 − 13 = <b>7</b>.' }),

  makeMCQ({ id:'g1mth-sub-049', chapterId:'g1mth-subtraction', difficulty:1, subsection:'subtracting_within_20',
    question:'16 − 8 = ?',
    options:['8','7','9','6'], answer:'8',
    hint:'Count back 8 from 16.',
    explanation:'16 − 8 = <b>8</b>.' }),

  makeMCQ({ id:'g1mth-sub-050', chapterId:'g1mth-subtraction', difficulty:2, subsection:'subtracting_within_20',
    question:'There are 20 birds. 12 fly away. How many are left?',
    options:['8','7','9','10'], answer:'8',
    hint:'20 − 12 = ?',
    explanation:'20 − 12 = <b>8</b>. Eight birds are left.' })
);

// ── missing_numbers (051–075) ─────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-sub-051', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'10 − □ = 6',
    options:['4','3','5','6'], answer:'4',
    hint:'What do you take from 10 to get 6?',
    explanation:'10 − <b>4</b> = 6.' }),

  makeMCQ({ id:'g1mth-sub-052', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'□ − 5 = 7',
    options:['12','11','13','10'], answer:'12',
    hint:'What number minus 5 equals 7?',
    explanation:'<b>12</b> − 5 = 7.' }),

  makeMCQ({ id:'g1mth-sub-053', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'8 − □ = 3',
    options:['5','4','6','3'], answer:'5',
    hint:'What do you take from 8 to get 3?',
    explanation:'8 − <b>5</b> = 3.' }),

  makeMCQ({ id:'g1mth-sub-054', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'□ − 7 = 9',
    options:['16','15','17','14'], answer:'16',
    hint:'What number minus 7 equals 9?',
    explanation:'<b>16</b> − 7 = 9.' }),

  makeMCQ({ id:'g1mth-sub-055', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'15 − □ = 8',
    options:['7','6','8','5'], answer:'7',
    hint:'What do you take from 15 to get 8?',
    explanation:'15 − <b>7</b> = 8.' }),

  makeMCQ({ id:'g1mth-sub-056', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'□ − 9 = 10',
    options:['19','18','20','17'], answer:'19',
    hint:'9 + 10 = ?',
    explanation:'<b>19</b> − 9 = 10.' }),

  makeMCQ({ id:'g1mth-sub-057', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'20 − □ = 11',
    options:['9','8','10','7'], answer:'9',
    hint:'What do you take from 20 to get 11?',
    explanation:'20 − <b>9</b> = 11.' }),

  makeMCQ({ id:'g1mth-sub-058', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'□ − 6 = 8',
    options:['14','13','15','12'], answer:'14',
    hint:'8 + 6 = ?',
    explanation:'<b>14</b> − 6 = 8.' }),

  makeMCQ({ id:'g1mth-sub-059', chapterId:'g1mth-subtraction', difficulty:2, subsection:'missing_numbers',
    question:'Rani had □ mangoes. She ate 5 and has 9 left. How many did she start with?',
    options:['14','13','15','12'], answer:'14',
    hint:'□ − 5 = 9. Add to find □.',
    explanation:'<b>14</b> − 5 = 9. Rani started with 14 mangoes.' }),

  makeMCQ({ id:'g1mth-sub-060', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'13 − □ = 7',
    options:['6','5','7','4'], answer:'6',
    hint:'What do you take from 13 to get 7?',
    explanation:'13 − <b>6</b> = 7.' }),

  makeMCQ({ id:'g1mth-sub-061', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'□ − 8 = 7',
    options:['15','14','16','13'], answer:'15',
    hint:'7 + 8 = ?',
    explanation:'<b>15</b> − 8 = 7.' }),

  makeMCQ({ id:'g1mth-sub-062', chapterId:'g1mth-subtraction', difficulty:2, subsection:'missing_numbers',
    question:'Tom had □ lychees. After giving 6 to his sister he has 10 left. How many did he have?',
    options:['16','15','17','14'], answer:'16',
    hint:'□ − 6 = 10. Add to find □.',
    explanation:'<b>16</b> − 6 = 10. Tom started with 16 lychees.' }),

  makeMCQ({ id:'g1mth-sub-063', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'18 − □ = 9',
    options:['9','8','10','7'], answer:'9',
    hint:'What do you take from 18 to get 9?',
    explanation:'18 − <b>9</b> = 9.' }),

  makeMCQ({ id:'g1mth-sub-064', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'□ − 4 = 11',
    options:['15','14','16','13'], answer:'15',
    hint:'11 + 4 = ?',
    explanation:'<b>15</b> − 4 = 11.' }),

  makeMCQ({ id:'g1mth-sub-065', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'17 − □ = 8',
    options:['9','8','10','7'], answer:'9',
    hint:'What do you take from 17 to get 8?',
    explanation:'17 − <b>9</b> = 8.' }),

  makeMCQ({ id:'g1mth-sub-066', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'□ − 3 = 14',
    options:['17','16','18','15'], answer:'17',
    hint:'14 + 3 = ?',
    explanation:'<b>17</b> − 3 = 14.' }),

  makeMCQ({ id:'g1mth-sub-067', chapterId:'g1mth-subtraction', difficulty:2, subsection:'missing_numbers',
    question:'Mia baked □ cakes. She sold 8 and has 7 left. How many did she bake?',
    options:['15','14','16','13'], answer:'15',
    hint:'□ − 8 = 7. Add to find □.',
    explanation:'<b>15</b> − 8 = 7. Mia baked 15 cakes.' }),

  makeMCQ({ id:'g1mth-sub-068', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'11 − □ = 4',
    options:['7','6','8','5'], answer:'7',
    hint:'What do you take from 11 to get 4?',
    explanation:'11 − <b>7</b> = 4.' }),

  makeMCQ({ id:'g1mth-sub-069', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'□ − 10 = 8',
    options:['18','17','19','16'], answer:'18',
    hint:'8 + 10 = ?',
    explanation:'<b>18</b> − 10 = 8.' }),

  makeMCQ({ id:'g1mth-sub-070', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'16 − □ = 9',
    options:['7','6','8','5'], answer:'7',
    hint:'What do you take from 16 to get 9?',
    explanation:'16 − <b>7</b> = 9.' }),

  makeMCQ({ id:'g1mth-sub-071', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'□ − 2 = 16',
    options:['18','17','19','16'], answer:'18',
    hint:'16 + 2 = ?',
    explanation:'<b>18</b> − 2 = 16.' }),

  makeMCQ({ id:'g1mth-sub-072', chapterId:'g1mth-subtraction', difficulty:2, subsection:'missing_numbers',
    question:'Dev had □ rupees. He spent 9 and had 11 left. How much did he start with?',
    options:['20','19','21','18'], answer:'20',
    hint:'□ − 9 = 11. Add to find □.',
    explanation:'<b>20</b> − 9 = 11. Dev started with 20 rupees.' }),

  makeMCQ({ id:'g1mth-sub-073', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'14 − □ = 5',
    options:['9','8','10','7'], answer:'9',
    hint:'What do you take from 14 to get 5?',
    explanation:'14 − <b>9</b> = 5.' }),

  makeMCQ({ id:'g1mth-sub-074', chapterId:'g1mth-subtraction', difficulty:1, subsection:'missing_numbers',
    question:'□ − 7 = 6',
    options:['13','12','14','11'], answer:'13',
    hint:'6 + 7 = ?',
    explanation:'<b>13</b> − 7 = 6.' }),

  makeMCQ({ id:'g1mth-sub-075', chapterId:'g1mth-subtraction', difficulty:2, subsection:'missing_numbers',
    question:'Which number sentence is MISSING the correct □? 20 − □ = 14',
    options:['6','5','7','4'], answer:'6',
    hint:'What do you take from 20 to get 14?',
    explanation:'20 − <b>6</b> = 14.' })
);

})();
