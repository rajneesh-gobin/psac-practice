'use strict';
(function () {

// ── adding_within_10 (001–025) ───────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-add-001', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'3 + 4 = ?',
    options:['7','6','8','5'], answer:'7',
    hint:'Count on 4 from 3: 4, 5, 6, 7.',
    explanation:'3 + 4 = <b>7</b>.' }),

  makeMCQ({ id:'g1mth-add-002', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'5 + 2 = ?',
    options:['7','6','8','9'], answer:'7',
    hint:'Count on 2 from 5: 6, 7.',
    explanation:'5 + 2 = <b>7</b>.' }),

  makeMCQ({ id:'g1mth-add-003', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'Rani has 2 mangoes. Dev gives her 5 more. How many does she have now?',
    options:['7','3','8','6'], answer:'7',
    hint:'2 + 5 = ?',
    explanation:'2 + 5 = <b>7</b>. Rani now has 7 mangoes.' }),

  makeMCQ({ id:'g1mth-add-004', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'1 + 9 = ?',
    options:['10','8','11','9'], answer:'10',
    hint:'Count on 9 from 1.',
    explanation:'1 + 9 = <b>10</b>.' }),

  makeMCQ({ id:'g1mth-add-005', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'4 + 4 = ?',
    options:['8','7','9','6'], answer:'8',
    hint:'Double 4.',
    explanation:'4 + 4 = <b>8</b>.' }),

  makeMCQ({ id:'g1mth-add-006', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'There are 3 red flowers and 6 yellow flowers. How many flowers are there altogether?',
    options:['9','8','7','10'], answer:'9',
    hint:'3 + 6 = ?',
    explanation:'3 + 6 = <b>9</b> flowers altogether.' }),

  makeMCQ({ id:'g1mth-add-007', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'0 + 7 = ?',
    options:['7','0','8','6'], answer:'7',
    hint:'Adding zero does not change the number.',
    explanation:'0 + 7 = <b>7</b>. Zero added to any number gives the same number.' }),

  makeMCQ({ id:'g1mth-add-008', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'2 + 2 = ?',
    options:['4','3','5','6'], answer:'4',
    hint:'Double 2.',
    explanation:'2 + 2 = <b>4</b>.' }),

  makeMCQ({ id:'g1mth-add-009', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'Tom has 6 lychees. He picks 3 more. How many does he have?',
    options:['9','8','7','10'], answer:'9',
    hint:'6 + 3 = ?',
    explanation:'6 + 3 = <b>9</b>. Tom now has 9 lychees.' }),

  makeMCQ({ id:'g1mth-add-010', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'5 + 5 = ?',
    options:['10','9','11','8'], answer:'10',
    hint:'Double 5.',
    explanation:'5 + 5 = <b>10</b>.' }),

  makeMCQ({ id:'g1mth-add-011', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'1 + 6 = ?',
    options:['7','5','8','6'], answer:'7',
    hint:'Count on 6 from 1.',
    explanation:'1 + 6 = <b>7</b>.' }),

  makeMCQ({ id:'g1mth-add-012', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'4 + 3 = ?',
    options:['7','6','8','5'], answer:'7',
    hint:'Count on 3 from 4: 5, 6, 7.',
    explanation:'4 + 3 = <b>7</b>.' }),

  makeMCQ({ id:'g1mth-add-013', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'Mia has 4 papaya. She buys 2 more. How many does she have?',
    options:['6','5','7','8'], answer:'6',
    hint:'4 + 2 = ?',
    explanation:'4 + 2 = <b>6</b>. Mia has 6 papaya.' }),

  makeMCQ({ id:'g1mth-add-014', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'7 + 2 = ?',
    options:['9','8','10','7'], answer:'9',
    hint:'Count on 2 from 7: 8, 9.',
    explanation:'7 + 2 = <b>9</b>.' }),

  makeMCQ({ id:'g1mth-add-015', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'3 + 3 = ?',
    options:['6','5','7','4'], answer:'6',
    hint:'Double 3.',
    explanation:'3 + 3 = <b>6</b>.' }),

  makeMCQ({ id:'g1mth-add-016', chapterId:'g1mth-addition', difficulty:2, subsection:'adding_within_10',
    question:'A box has 4 red crayons and 5 blue crayons. How many crayons are in the box?',
    options:['9','8','10','7'], answer:'9',
    hint:'4 + 5 = ?',
    explanation:'4 + 5 = <b>9</b> crayons in the box.' }),

  makeMCQ({ id:'g1mth-add-017', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'8 + 2 = ?',
    options:['10','9','11','8'], answer:'10',
    hint:'Count on 2 from 8: 9, 10.',
    explanation:'8 + 2 = <b>10</b>.' }),

  makeMCQ({ id:'g1mth-add-018', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'6 + 0 = ?',
    options:['6','7','5','0'], answer:'6',
    hint:'Adding zero does not change the number.',
    explanation:'6 + 0 = <b>6</b>.' }),

  makeMCQ({ id:'g1mth-add-019', chapterId:'g1mth-addition', difficulty:2, subsection:'adding_within_10',
    question:'Dev collects 3 shells at the beach. Then he finds 4 more. How many shells does he have?',
    options:['7','6','8','9'], answer:'7',
    hint:'3 + 4 = ?',
    explanation:'3 + 4 = <b>7</b>. Dev has 7 shells.' }),

  makeMCQ({ id:'g1mth-add-020', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'2 + 8 = ?',
    options:['10','9','11','8'], answer:'10',
    hint:'Count on 8 from 2.',
    explanation:'2 + 8 = <b>10</b>.' }),

  makeMCQ({ id:'g1mth-add-021', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'1 + 8 = ?',
    options:['9','8','10','7'], answer:'9',
    hint:'Count on 8 from 1.',
    explanation:'1 + 8 = <b>9</b>.' }),

  makeMCQ({ id:'g1mth-add-022', chapterId:'g1mth-addition', difficulty:2, subsection:'adding_within_10',
    question:'There are 5 fish in a pond. 5 more jump in. How many fish are there now?',
    options:['10','9','11','8'], answer:'10',
    hint:'5 + 5 = ?',
    explanation:'5 + 5 = <b>10</b>. There are 10 fish now.' }),

  makeMCQ({ id:'g1mth-add-023', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'3 + 7 = ?',
    options:['10','9','11','8'], answer:'10',
    hint:'Count on 7 from 3.',
    explanation:'3 + 7 = <b>10</b>.' }),

  makeMCQ({ id:'g1mth-add-024', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_10',
    question:'9 + 1 = ?',
    options:['10','9','11','8'], answer:'10',
    hint:'Count on 1 from 9.',
    explanation:'9 + 1 = <b>10</b>.' }),

  makeMCQ({ id:'g1mth-add-025', chapterId:'g1mth-addition', difficulty:2, subsection:'adding_within_10',
    question:'Rani has 4 rupees and Tom gives her 3 more rupees. How many rupees does Rani have?',
    options:['7','6','8','5'], answer:'7',
    hint:'4 + 3 = ?',
    explanation:'4 + 3 = <b>7</b>. Rani has 7 rupees.' })
);

// ── adding_within_20 (026–050) ───────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-add-026', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'8 + 7 = ?',
    options:['15','14','16','13'], answer:'15',
    hint:'Start at 8 and count on 7.',
    explanation:'8 + 7 = <b>15</b>.' }),

  makeMCQ({ id:'g1mth-add-027', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'Tom has 9 lychees. He picks 6 more. How many does he have?',
    options:['15','13','16','14'], answer:'15',
    hint:'9 + 6 = ?',
    explanation:'9 + 6 = <b>15</b>. Tom has 15 lychees.' }),

  makeMCQ({ id:'g1mth-add-028', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'10 + 5 = ?',
    options:['15','14','16','10'], answer:'15',
    hint:'Add 5 to 10.',
    explanation:'10 + 5 = <b>15</b>.' }),

  makeMCQ({ id:'g1mth-add-029', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'7 + 8 = ?',
    options:['15','14','16','13'], answer:'15',
    hint:'Count on 8 from 7.',
    explanation:'7 + 8 = <b>15</b>.' }),

  makeMCQ({ id:'g1mth-add-030', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'9 + 9 = ?',
    options:['18','17','19','16'], answer:'18',
    hint:'Double 9.',
    explanation:'9 + 9 = <b>18</b>.' }),

  makeMCQ({ id:'g1mth-add-031', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'10 + 8 = ?',
    options:['18','17','19','16'], answer:'18',
    hint:'Add 8 to 10.',
    explanation:'10 + 8 = <b>18</b>.' }),

  makeMCQ({ id:'g1mth-add-032', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'Mia has 11 flowers. She picks 4 more. How many does she have?',
    options:['15','14','16','13'], answer:'15',
    hint:'11 + 4 = ?',
    explanation:'11 + 4 = <b>15</b>. Mia has 15 flowers.' }),

  makeMCQ({ id:'g1mth-add-033', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'6 + 7 = ?',
    options:['13','12','14','11'], answer:'13',
    hint:'Count on 7 from 6.',
    explanation:'6 + 7 = <b>13</b>.' }),

  makeMCQ({ id:'g1mth-add-034', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'10 + 9 = ?',
    options:['19','18','20','17'], answer:'19',
    hint:'Add 9 to 10.',
    explanation:'10 + 9 = <b>19</b>.' }),

  makeMCQ({ id:'g1mth-add-035', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'10 + 10 = ?',
    options:['20','19','21','18'], answer:'20',
    hint:'Double 10.',
    explanation:'10 + 10 = <b>20</b>.' }),

  makeMCQ({ id:'g1mth-add-036', chapterId:'g1mth-addition', difficulty:2, subsection:'adding_within_20',
    question:'Dev has 8 rupees. His mum gives him 9 more rupees. How much does he have?',
    options:['17','15','16','18'], answer:'17',
    hint:'8 + 9 = ?',
    explanation:'8 + 9 = <b>17</b>. Dev has 17 rupees.' }),

  makeMCQ({ id:'g1mth-add-037', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'5 + 9 = ?',
    options:['14','13','15','12'], answer:'14',
    hint:'Count on 9 from 5.',
    explanation:'5 + 9 = <b>14</b>.' }),

  makeMCQ({ id:'g1mth-add-038', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'10 + 7 = ?',
    options:['17','16','18','15'], answer:'17',
    hint:'Add 7 to 10.',
    explanation:'10 + 7 = <b>17</b>.' }),

  makeMCQ({ id:'g1mth-add-039', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'8 + 8 = ?',
    options:['16','15','17','14'], answer:'16',
    hint:'Double 8.',
    explanation:'8 + 8 = <b>16</b>.' }),

  makeMCQ({ id:'g1mth-add-040', chapterId:'g1mth-addition', difficulty:2, subsection:'adding_within_20',
    question:'Rani reads 7 pages on Monday and 6 pages on Tuesday. How many pages does she read in total?',
    options:['13','12','14','11'], answer:'13',
    hint:'7 + 6 = ?',
    explanation:'7 + 6 = <b>13</b>. Rani reads 13 pages in total.' }),

  makeMCQ({ id:'g1mth-add-041', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'11 + 3 = ?',
    options:['14','13','15','12'], answer:'14',
    hint:'Count on 3 from 11.',
    explanation:'11 + 3 = <b>14</b>.' }),

  makeMCQ({ id:'g1mth-add-042', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'12 + 5 = ?',
    options:['17','16','18','15'], answer:'17',
    hint:'Count on 5 from 12.',
    explanation:'12 + 5 = <b>17</b>.' }),

  makeMCQ({ id:'g1mth-add-043', chapterId:'g1mth-addition', difficulty:2, subsection:'adding_within_20',
    question:'There are 9 boys and 7 girls in a class. How many children are there?',
    options:['16','15','17','14'], answer:'16',
    hint:'9 + 7 = ?',
    explanation:'9 + 7 = <b>16</b>. There are 16 children.' }),

  makeMCQ({ id:'g1mth-add-044', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'13 + 4 = ?',
    options:['17','16','18','15'], answer:'17',
    hint:'Count on 4 from 13.',
    explanation:'13 + 4 = <b>17</b>.' }),

  makeMCQ({ id:'g1mth-add-045', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'6 + 8 = ?',
    options:['14','13','15','12'], answer:'14',
    hint:'Count on 8 from 6.',
    explanation:'6 + 8 = <b>14</b>.' }),

  makeMCQ({ id:'g1mth-add-046', chapterId:'g1mth-addition', difficulty:2, subsection:'adding_within_20',
    question:'Tom scores 10 points in a game. Then he scores 6 more. How many points does he have?',
    options:['16','15','17','14'], answer:'16',
    hint:'10 + 6 = ?',
    explanation:'10 + 6 = <b>16</b>. Tom has 16 points.' }),

  makeMCQ({ id:'g1mth-add-047', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'4 + 11 = ?',
    options:['15','14','16','13'], answer:'15',
    hint:'Count on 11 from 4.',
    explanation:'4 + 11 = <b>15</b>.' }),

  makeMCQ({ id:'g1mth-add-048', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'10 + 4 = ?',
    options:['14','13','15','12'], answer:'14',
    hint:'Add 4 to 10.',
    explanation:'10 + 4 = <b>14</b>.' }),

  makeMCQ({ id:'g1mth-add-049', chapterId:'g1mth-addition', difficulty:2, subsection:'adding_within_20',
    question:'Mia has 5 rupees. She earns 12 more. How much does she have in total?',
    options:['17','15','16','18'], answer:'17',
    hint:'5 + 12 = ?',
    explanation:'5 + 12 = <b>17</b>. Mia has 17 rupees.' }),

  makeMCQ({ id:'g1mth-add-050', chapterId:'g1mth-addition', difficulty:1, subsection:'adding_within_20',
    question:'7 + 7 = ?',
    options:['14','13','15','12'], answer:'14',
    hint:'Double 7.',
    explanation:'7 + 7 = <b>14</b>.' })
);

// ── number_sentences (051–075) ───────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-add-051', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'Which number completes: 4 + □ = 9?',
    options:['5','4','3','6'], answer:'5',
    hint:'What do you add to 4 to reach 9? Count on from 4 to 9.',
    explanation:'4 + <b>5</b> = 9.' }),

  makeMCQ({ id:'g1mth-add-052', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'Which sign goes in the box: 3 □ 5 = 8?',
    options:['+','−','×','÷'], answer:'+',
    hint:'3 and 5 are being joined together to make 8.',
    explanation:'3 <b>+</b> 5 = 8. We add to join numbers.' }),

  makeMCQ({ id:'g1mth-add-053', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'□ + 6 = 10. What is the missing number?',
    options:['4','5','3','6'], answer:'4',
    hint:'What goes with 6 to make 10?',
    explanation:'<b>4</b> + 6 = 10.' }),

  makeMCQ({ id:'g1mth-add-054', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'7 + □ = 12. What is the missing number?',
    options:['5','4','6','3'], answer:'5',
    hint:'Count on from 7 to reach 12.',
    explanation:'7 + <b>5</b> = 12.' }),

  makeMCQ({ id:'g1mth-add-055', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'Which number makes this true: □ + 8 = 15?',
    options:['7','6','8','5'], answer:'7',
    hint:'What goes with 8 to make 15?',
    explanation:'<b>7</b> + 8 = 15.' }),

  makeMCQ({ id:'g1mth-add-056', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'9 + □ = 18. What is □?',
    options:['9','8','10','7'], answer:'9',
    hint:'9 + 9 = ?',
    explanation:'9 + <b>9</b> = 18.' }),

  makeMCQ({ id:'g1mth-add-057', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'Which is TRUE: 6 + 4 = ___?',
    options:['10','9','11','8'], answer:'10',
    hint:'Count on 4 from 6.',
    explanation:'6 + 4 = <b>10</b>.' }),

  makeMCQ({ id:'g1mth-add-058', chapterId:'g1mth-addition', difficulty:2, subsection:'number_sentences',
    question:'Rani has □ mangoes. She picks 3 more and now has 11. What is □?',
    options:['8','7','9','6'], answer:'8',
    hint:'□ + 3 = 11. What goes with 3 to make 11?',
    explanation:'<b>8</b> + 3 = 11. Rani had 8 mangoes.' }),

  makeMCQ({ id:'g1mth-add-059', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'5 + □ = 14. What is □?',
    options:['9','8','10','7'], answer:'9',
    hint:'Count on from 5 to reach 14.',
    explanation:'5 + <b>9</b> = 14.' }),

  makeMCQ({ id:'g1mth-add-060', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'Which number sentence is correct?',
    options:['6 + 7 = 13','6 + 7 = 12','6 + 7 = 14','6 + 7 = 11'], answer:'6 + 7 = 13',
    hint:'Count on 7 from 6.',
    explanation:'<b>6 + 7 = 13</b>.' }),

  makeMCQ({ id:'g1mth-add-061', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'□ + 10 = 20. What is □?',
    options:['10','9','11','8'], answer:'10',
    hint:'What goes with 10 to make 20?',
    explanation:'<b>10</b> + 10 = 20.' }),

  makeMCQ({ id:'g1mth-add-062', chapterId:'g1mth-addition', difficulty:2, subsection:'number_sentences',
    question:'Tom gets □ stickers. Dev gives him 6 more. Now Tom has 14. What is □?',
    options:['8','7','9','6'], answer:'8',
    hint:'□ + 6 = 14. What goes with 6 to make 14?',
    explanation:'<b>8</b> + 6 = 14. Tom started with 8 stickers.' }),

  makeMCQ({ id:'g1mth-add-063', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'4 + □ = 13. What is □?',
    options:['9','8','10','7'], answer:'9',
    hint:'Count on from 4 to reach 13.',
    explanation:'4 + <b>9</b> = 13.' }),

  makeMCQ({ id:'g1mth-add-064', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'Which sign makes this true: 10 □ 6 = 16?',
    options:['+','−','=','?'], answer:'+',
    hint:'We are combining 10 and 6 to make 16.',
    explanation:'10 <b>+</b> 6 = 16.' }),

  makeMCQ({ id:'g1mth-add-065', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'□ + 5 = 15. What is □?',
    options:['10','9','11','8'], answer:'10',
    hint:'What goes with 5 to make 15?',
    explanation:'<b>10</b> + 5 = 15.' }),

  makeMCQ({ id:'g1mth-add-066', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'3 + □ = 12. What is □?',
    options:['9','8','10','7'], answer:'9',
    hint:'Count on from 3 to reach 12.',
    explanation:'3 + <b>9</b> = 12.' }),

  makeMCQ({ id:'g1mth-add-067', chapterId:'g1mth-addition', difficulty:2, subsection:'number_sentences',
    question:'Mia collects □ shells. After finding 7 more she has 16. How many did she start with?',
    options:['9','8','10','7'], answer:'9',
    hint:'□ + 7 = 16. Count back from 16.',
    explanation:'<b>9</b> + 7 = 16. Mia started with 9 shells.' }),

  makeMCQ({ id:'g1mth-add-068', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'Which number sentence equals 17?',
    options:['10 + 7','10 + 8','9 + 9','8 + 8'], answer:'10 + 7',
    hint:'10 + 7 = ? Try each option.',
    explanation:'<b>10 + 7 = 17</b>.' }),

  makeMCQ({ id:'g1mth-add-069', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'8 + □ = 16. What is □?',
    options:['8','7','9','6'], answer:'8',
    hint:'Double 8.',
    explanation:'8 + <b>8</b> = 16.' }),

  makeMCQ({ id:'g1mth-add-070', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'□ + 4 = 11. What is □?',
    options:['7','6','8','5'], answer:'7',
    hint:'What goes with 4 to make 11?',
    explanation:'<b>7</b> + 4 = 11.' }),

  makeMCQ({ id:'g1mth-add-071', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'Which number makes this true: 6 + □ = 15?',
    options:['9','8','10','7'], answer:'9',
    hint:'Count on from 6 to reach 15.',
    explanation:'6 + <b>9</b> = 15.' }),

  makeMCQ({ id:'g1mth-add-072', chapterId:'g1mth-addition', difficulty:2, subsection:'number_sentences',
    question:'Dev has some rupees. He earns 8 more and now has 20. How many did he start with?',
    options:['12','11','13','10'], answer:'12',
    hint:'□ + 8 = 20. Count back 8 from 20.',
    explanation:'<b>12</b> + 8 = 20. Dev started with 12 rupees.' }),

  makeMCQ({ id:'g1mth-add-073', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'2 + □ = 11. What is □?',
    options:['9','8','10','7'], answer:'9',
    hint:'Count on from 2 to reach 11.',
    explanation:'2 + <b>9</b> = 11.' }),

  makeMCQ({ id:'g1mth-add-074', chapterId:'g1mth-addition', difficulty:1, subsection:'number_sentences',
    question:'Which number sentence is WRONG?',
    options:['5 + 6 = 12','5 + 6 = 11','5 + 5 = 10','6 + 6 = 12'], answer:'5 + 6 = 12',
    hint:'5 + 6 — count on 6 from 5.',
    explanation:'<b>5 + 6 = 12 is WRONG</b>. The correct answer is 5 + 6 = 11.' }),

  makeMCQ({ id:'g1mth-add-075', chapterId:'g1mth-addition', difficulty:2, subsection:'number_sentences',
    question:'A number added to 7 gives 20. What is the number?',
    options:['13','12','14','11'], answer:'13',
    hint:'7 + □ = 20. Count on from 7 to 20.',
    explanation:'7 + <b>13</b> = 20.' })
);

})();
