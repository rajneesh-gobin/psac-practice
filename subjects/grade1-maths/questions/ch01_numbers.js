'use strict';
(function () {

// ── counting_ordering (001–025) ──────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-num-001', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'What number comes after 7?',
    options:['8','6','9','10'], answer:'8',
    hint:'Count on one from 7.',
    explanation:'<b>8</b> comes right after 7 when we count forward.' }),

  makeMCQ({ id:'g1mth-num-002', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'Which number is between 11 and 13?',
    options:['12','10','14','11'], answer:'12',
    hint:'Count: 11, ___, 13.',
    explanation:'<b>12</b> sits between 11 and 13.' }),

  makeMCQ({ id:'g1mth-num-003', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'Count the stars: ★★★★★★. How many are there?',
    options:['6','5','7','4'], answer:'6',
    hint:'Point to each star and count one by one.',
    explanation:'There are <b>6</b> stars. Count them: 1, 2, 3, 4, 5, 6.' }),

  makeMCQ({ id:'g1mth-num-004', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'What number is one less than 14?',
    options:['13','15','12','14'], answer:'13',
    hint:'Take one step back from 14.',
    explanation:'<b>13</b> is one less than 14.' }),

  makeMCQ({ id:'g1mth-num-005', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'Which is the biggest number: 8, 12, 5, 17?',
    options:['17','12','8','5'], answer:'17',
    hint:'The biggest number has the most value.',
    explanation:'<b>17</b> is the biggest. 17 is greater than 12, 8 and 5.' }),

  makeMCQ({ id:'g1mth-num-006', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'What number comes before 9?',
    options:['8','10','7','9'], answer:'8',
    hint:'Count backwards one step from 9.',
    explanation:'<b>8</b> comes before 9.' }),

  makeMCQ({ id:'g1mth-num-007', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'Which is the smallest number: 3, 15, 9, 7?',
    options:['3','9','7','15'], answer:'3',
    hint:'The smallest number has the least value.',
    explanation:'<b>3</b> is the smallest number.' }),

  makeMCQ({ id:'g1mth-num-008', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'Count the balloons: 🎈🎈🎈🎈🎈🎈🎈🎈. How many?',
    options:['8','7','9','6'], answer:'8',
    hint:'Count each balloon one by one.',
    explanation:'There are <b>8</b> balloons.' }),

  makeMCQ({ id:'g1mth-num-009', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'What number is between 4 and 6?',
    options:['5','3','7','4'], answer:'5',
    hint:'Count: 4, ___, 6.',
    explanation:'<b>5</b> is between 4 and 6.' }),

  makeMCQ({ id:'g1mth-num-010', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'What number comes after 19?',
    options:['20','18','21','17'], answer:'20',
    hint:'19 is just before the last number we learn in Grade 1.',
    explanation:'<b>20</b> comes right after 19.' }),

  makeMCQ({ id:'g1mth-num-011', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'Put in order from smallest: 6, 2, 9, 4. Which comes first?',
    options:['2','4','6','9'], answer:'2',
    hint:'The smallest number goes first.',
    explanation:'<b>2</b> is the smallest, so it comes first: 2, 4, 6, 9.' }),

  makeMCQ({ id:'g1mth-num-012', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'Rani has 10 mangoes. Dev has 15 mangoes. Who has more?',
    options:['Dev','Rani','they have the same','cannot tell'], answer:'Dev',
    hint:'15 is bigger than 10.',
    explanation:'<b>Dev</b> has more because 15 is greater than 10.' }),

  makeMCQ({ id:'g1mth-num-013', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'Which number is greater: 11 or 16?',
    options:['16','11','they are equal','cannot tell'], answer:'16',
    hint:'16 has more tens.',
    explanation:'<b>16</b> is greater than 11.' }),

  makeMCQ({ id:'g1mth-num-014', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'What number is one more than 17?',
    options:['18','16','19','17'], answer:'18',
    hint:'Add one more to 17.',
    explanation:'<b>18</b> is one more than 17.' }),

  makeMCQ({ id:'g1mth-num-015', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'Count backwards: 10, 9, 8, ___. What comes next?',
    options:['7','6','11','8'], answer:'7',
    hint:'We are counting down, so each number gets smaller.',
    explanation:'<b>7</b> comes next when counting backwards: 10, 9, 8, 7.' }),

  makeMCQ({ id:'g1mth-num-016', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'How many fingers are on two hands?',
    options:['10','8','12','5'], answer:'10',
    hint:'Each hand has 5 fingers.',
    explanation:'Two hands have <b>10</b> fingers altogether — 5 + 5 = 10.' }),

  makeMCQ({ id:'g1mth-num-017', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'Which number is between 17 and 19?',
    options:['18','16','20','17'], answer:'18',
    hint:'Count: 17, ___, 19.',
    explanation:'<b>18</b> is between 17 and 19.' }),

  makeMCQ({ id:'g1mth-num-018', chapterId:'g1mth-numbers', difficulty:2, subsection:'counting_ordering',
    question:'Tom has 12 lychees. Mia has 9. How many more does Tom have?',
    options:['3','2','4','1'], answer:'3',
    hint:'Count from 9 up to 12.',
    explanation:'Tom has <b>3</b> more lychees. 12 − 9 = 3.' }),

  makeMCQ({ id:'g1mth-num-019', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'What number is the same as 1 ten and 3 ones?',
    options:['13','31','10','3'], answer:'13',
    hint:'1 ten = 10, plus 3 ones.',
    explanation:'1 ten and 3 ones = <b>13</b>.' }),

  makeMCQ({ id:'g1mth-num-020', chapterId:'g1mth-numbers', difficulty:2, subsection:'counting_ordering',
    question:'The numbers on a number line go: 14, 15, ___, 17. What is missing?',
    options:['16','13','18','15'], answer:'16',
    hint:'Count on from 15.',
    explanation:'<b>16</b> is missing. The sequence is 14, 15, 16, 17.' }),

  makeMCQ({ id:'g1mth-num-021', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'Count the apples: 🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎. How many?',
    options:['11','10','12','9'], answer:'11',
    hint:'Count each apple carefully.',
    explanation:'There are <b>11</b> apples.' }),

  makeMCQ({ id:'g1mth-num-022', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'Which number is less: 7 or 14?',
    options:['7','14','they are equal','cannot tell'], answer:'7',
    hint:'7 is smaller than 14.',
    explanation:'<b>7</b> is less than 14.' }),

  makeMCQ({ id:'g1mth-num-023', chapterId:'g1mth-numbers', difficulty:2, subsection:'counting_ordering',
    question:'A caterpillar has 20 legs. If 3 legs are hidden, how many can you see?',
    options:['17','16','18','13'], answer:'17',
    hint:'Start at 20 and count back 3.',
    explanation:'<b>17</b> legs can be seen. 20 − 3 = 17.' }),

  makeMCQ({ id:'g1mth-num-024', chapterId:'g1mth-numbers', difficulty:1, subsection:'counting_ordering',
    question:'What is the number that comes just before 20?',
    options:['19','18','21','20'], answer:'19',
    hint:'Count backwards one step from 20.',
    explanation:'<b>19</b> comes just before 20.' }),

  makeMCQ({ id:'g1mth-num-025', chapterId:'g1mth-numbers', difficulty:2, subsection:'counting_ordering',
    question:'Arrange from biggest to smallest: 5, 18, 11, 3. What comes first?',
    options:['18','11','5','3'], answer:'18',
    hint:'The biggest number comes first when ordering from biggest to smallest.',
    explanation:'<b>18</b> comes first — it is the biggest number.' })
);

// ── number_words (026–050) ───────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-num-026', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'How do we write the number 7 in words?',
    options:['seven','eight','six','nine'], answer:'seven',
    hint:'Count to 7: one, two, three, four, five, six, ___.',
    explanation:'The number 7 is written as <b>seven</b>.' }),

  makeMCQ({ id:'g1mth-num-027', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'What number does "twelve" stand for?',
    options:['12','20','11','13'], answer:'12',
    hint:'"Twelve" has "twelve" letters and equals 12.',
    explanation:'"Twelve" stands for the number <b>12</b>.' }),

  makeMCQ({ id:'g1mth-num-028', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'Which word matches the number 15?',
    options:['fifteen','fifty','five','fourteen'], answer:'fifteen',
    hint:'15 = "fif" + "teen".',
    explanation:'15 is written as <b>fifteen</b>.' }),

  makeMCQ({ id:'g1mth-num-029', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'How do we write 3 in words?',
    options:['three','thirteen','thirty','two'], answer:'three',
    hint:'1 = one, 2 = two, 3 = ___.',
    explanation:'3 is written as <b>three</b>.' }),

  makeMCQ({ id:'g1mth-num-030', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'What number is "eleven"?',
    options:['11','10','12','1'], answer:'11',
    hint:'"Eleven" comes right after ten.',
    explanation:'"Eleven" stands for <b>11</b>.' }),

  makeMCQ({ id:'g1mth-num-031', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'How do we write 20 in words?',
    options:['twenty','twelve','two','two hundred'], answer:'twenty',
    hint:'10 = ten, 20 = ___.',
    explanation:'20 is written as <b>twenty</b>.' }),

  makeMCQ({ id:'g1mth-num-032', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'Which number word means 14?',
    options:['fourteen','four','forty','thirteen'], answer:'fourteen',
    hint:'14 = "four" + "teen".',
    explanation:'14 is written as <b>fourteen</b>.' }),

  makeMCQ({ id:'g1mth-num-033', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'How do we write 1 in words?',
    options:['one','won','on','two'], answer:'one',
    hint:'The very first number: 1 = ___.',
    explanation:'1 is written as <b>one</b>.' }),

  makeMCQ({ id:'g1mth-num-034', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'What does the word "nine" stand for?',
    options:['9','6','19','90'], answer:'9',
    hint:'"Nine" rhymes with "fine".',
    explanation:'"Nine" stands for <b>9</b>.' }),

  makeMCQ({ id:'g1mth-num-035', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'How do we write 16 in words?',
    options:['sixteen','sixty','six','seventeen'], answer:'sixteen',
    hint:'16 = "six" + "teen".',
    explanation:'16 is written as <b>sixteen</b>.' }),

  makeMCQ({ id:'g1mth-num-036', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'Which word matches the number 18?',
    options:['eighteen','eighty','eight','seventeen'], answer:'eighteen',
    hint:'18 = "eigh" + "teen".',
    explanation:'18 is written as <b>eighteen</b>.' }),

  makeMCQ({ id:'g1mth-num-037', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'How do we write 5 in words?',
    options:['five','fine','fire','four'], answer:'five',
    hint:'Count: one, two, three, four, ___.',
    explanation:'5 is written as <b>five</b>.' }),

  makeMCQ({ id:'g1mth-num-038', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'What number is "seventeen"?',
    options:['17','7','70','71'], answer:'17',
    hint:'"Seven" + "teen" = seventeen.',
    explanation:'"Seventeen" stands for <b>17</b>.' }),

  makeMCQ({ id:'g1mth-num-039', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'How do we write 10 in words?',
    options:['ten','one','twenty','two'], answer:'ten',
    hint:'10 is a special number — it starts the "teens".',
    explanation:'10 is written as <b>ten</b>.' }),

  makeMCQ({ id:'g1mth-num-040', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'Which word matches the number 13?',
    options:['thirteen','thirty','three','fourteen'], answer:'thirteen',
    hint:'13 = "thir" + "teen".',
    explanation:'13 is written as <b>thirteen</b>.' }),

  makeMCQ({ id:'g1mth-num-041', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'How do we write 2 in words?',
    options:['two','too','to','twelve'], answer:'two',
    hint:'1 = one, 2 = ___.',
    explanation:'2 is written as <b>two</b>.' }),

  makeMCQ({ id:'g1mth-num-042', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'What does "nineteen" stand for?',
    options:['19','9','90','91'], answer:'19',
    hint:'"Nine" + "teen" = nineteen.',
    explanation:'"Nineteen" stands for <b>19</b>.' }),

  makeMCQ({ id:'g1mth-num-043', chapterId:'g1mth-numbers', difficulty:2, subsection:'number_words',
    question:'Rani wrote "forteen" on her paper. Is she right?',
    options:['No — it should be "fourteen"','Yes — that is correct','No — it should be "forty"','No — it should be "four"'], answer:'No — it should be "fourteen"',
    hint:'14 = "four" + "teen".',
    explanation:'"Fourteen" is the correct spelling — <b>fourteen</b>.' }),

  makeMCQ({ id:'g1mth-num-044', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'How do we write 8 in words?',
    options:['eight','ate','eighty','eighteen'], answer:'eight',
    hint:'7 = seven, 8 = ___.',
    explanation:'8 is written as <b>eight</b>.' }),

  makeMCQ({ id:'g1mth-num-045', chapterId:'g1mth-numbers', difficulty:2, subsection:'number_words',
    question:'Which number word comes between "fourteen" and "sixteen"?',
    options:['fifteen','thirteen','twelve','seventeen'], answer:'fifteen',
    hint:'14, 15, 16 — what is the word for 15?',
    explanation:'<b>Fifteen</b> (15) is between fourteen (14) and sixteen (16).' }),

  makeMCQ({ id:'g1mth-num-046', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'How do we write 4 in words?',
    options:['four','for','fore','five'], answer:'four',
    hint:'3 = three, 4 = ___.',
    explanation:'4 is written as <b>four</b>.' }),

  makeMCQ({ id:'g1mth-num-047', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'What does "six" stand for?',
    options:['6','16','60','7'], answer:'6',
    hint:'"Six" comes after "five".',
    explanation:'"Six" stands for <b>6</b>.' }),

  makeMCQ({ id:'g1mth-num-048', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'How do we write 11 in words?',
    options:['eleven','one one','twelve','ten one'], answer:'eleven',
    hint:'11 is a special number — "eleven" does not have "teen".',
    explanation:'11 is written as <b>eleven</b>.' }),

  makeMCQ({ id:'g1mth-num-049', chapterId:'g1mth-numbers', difficulty:1, subsection:'number_words',
    question:'Which number word matches 19?',
    options:['nineteen','nine','ninety','nine hundred'], answer:'nineteen',
    hint:'19 = "nine" + "teen".',
    explanation:'19 is written as <b>nineteen</b>.' }),

  makeMCQ({ id:'g1mth-num-050', chapterId:'g1mth-numbers', difficulty:2, subsection:'number_words',
    question:'Dev says "twelf" for the number 12. What is the correct word?',
    options:['twelve','twenty','two','eleven'], answer:'twelve',
    hint:'11 = eleven, 12 = ___.',
    explanation:'12 is correctly written as <b>twelve</b>.' })
);

// ── odd_even (051–075) ───────────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-num-051', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Is the number 6 odd or even?',
    options:['even','odd'], answer:'even',
    hint:'Even numbers can be shared into two equal groups.',
    explanation:'<b>6</b> is <b>even</b>. Even numbers end in 0, 2, 4, 6 or 8.' }),

  makeMCQ({ id:'g1mth-num-052', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Which number is odd: 4, 7, 10, 12?',
    options:['7','4','10','12'], answer:'7',
    hint:'Odd numbers end in 1, 3, 5, 7 or 9.',
    explanation:'<b>7</b> is odd. It ends in 7, which is an odd digit.' }),

  makeMCQ({ id:'g1mth-num-053', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'What is the next even number after 8?',
    options:['10','9','11','7'], answer:'10',
    hint:'Even numbers count: 2, 4, 6, 8, ___.',
    explanation:'<b>10</b> is the next even number after 8.' }),

  makeMCQ({ id:'g1mth-num-054', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Is 13 odd or even?',
    options:['odd','even'], answer:'odd',
    hint:'13 ends in 3. Numbers ending in 3 are odd.',
    explanation:'<b>13</b> is <b>odd</b>. It ends in 3.' }),

  makeMCQ({ id:'g1mth-num-055', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Which of these is an even number: 1, 3, 5, 4?',
    options:['4','1','3','5'], answer:'4',
    hint:'Even numbers end in 0, 2, 4, 6 or 8.',
    explanation:'<b>4</b> is even. It ends in 4.' }),

  makeMCQ({ id:'g1mth-num-056', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'The odd numbers between 1 and 10 are: 1, 3, ___, 7, 9. What is missing?',
    options:['5','4','6','8'], answer:'5',
    hint:'Odd numbers: 1, 3, 5, 7, 9.',
    explanation:'<b>5</b> is missing. The odd numbers are 1, 3, 5, 7, 9.' }),

  makeMCQ({ id:'g1mth-num-057', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Is the number 20 odd or even?',
    options:['even','odd'], answer:'even',
    hint:'20 ends in 0. Numbers ending in 0 are even.',
    explanation:'<b>20</b> is <b>even</b>. It ends in 0.' }),

  makeMCQ({ id:'g1mth-num-058', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'What is the next odd number after 11?',
    options:['13','12','14','10'], answer:'13',
    hint:'Odd numbers: …11, ___, 15.',
    explanation:'<b>13</b> is the next odd number after 11.' }),

  makeMCQ({ id:'g1mth-num-059', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Which number below is odd?',
    options:['15','10','16','18'], answer:'15',
    hint:'Odd numbers end in 1, 3, 5, 7 or 9.',
    explanation:'<b>15</b> is odd. It ends in 5.' }),

  makeMCQ({ id:'g1mth-num-060', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Rani has 8 mangoes. Can she share them equally between 2 friends with none left over?',
    options:['Yes — 8 is even','No — 8 is odd','Yes — 8 is odd','No — 8 is even'], answer:'Yes — 8 is even',
    hint:'Even numbers can be split into two equal groups.',
    explanation:'Yes! <b>8 is even</b>, so she can give 4 mangoes to each friend.' }),

  makeMCQ({ id:'g1mth-num-061', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Is 17 odd or even?',
    options:['odd','even'], answer:'odd',
    hint:'17 ends in 7. Numbers ending in 7 are odd.',
    explanation:'<b>17</b> is <b>odd</b>. It ends in 7.' }),

  makeMCQ({ id:'g1mth-num-062', chapterId:'g1mth-numbers', difficulty:2, subsection:'odd_even',
    question:'The even numbers between 10 and 20 are: 10, 12, 14, ___, 18, 20. What is missing?',
    options:['16','15','17','11'], answer:'16',
    hint:'Even numbers go up in 2s: 10, 12, 14, ___.',
    explanation:'<b>16</b> is missing. Even numbers: 10, 12, 14, 16, 18, 20.' }),

  makeMCQ({ id:'g1mth-num-063', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Which is an even number: 9, 11, 14, 3?',
    options:['14','9','11','3'], answer:'14',
    hint:'Even numbers end in 0, 2, 4, 6 or 8.',
    explanation:'<b>14</b> is even. It ends in 4.' }),

  makeMCQ({ id:'g1mth-num-064', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Is the number 2 odd or even?',
    options:['even','odd'], answer:'even',
    hint:'2 is the smallest even number.',
    explanation:'<b>2</b> is <b>even</b>. Even numbers start at 2.' }),

  makeMCQ({ id:'g1mth-num-065', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Is the number 1 odd or even?',
    options:['odd','even'], answer:'odd',
    hint:'1 is the smallest odd number.',
    explanation:'<b>1</b> is <b>odd</b>. Odd numbers start at 1.' }),

  makeMCQ({ id:'g1mth-num-066', chapterId:'g1mth-numbers', difficulty:2, subsection:'odd_even',
    question:'Dev has 7 stickers. Can he share them equally between 2 children?',
    options:['No — 7 is odd, so one is left over','Yes — 7 is even','Yes — he gives 3 to each','No — 7 cannot be shared at all'], answer:'No — 7 is odd, so one is left over',
    hint:'Odd numbers cannot be shared into two equal groups without a remainder.',
    explanation:'<b>7 is odd</b>, so when divided by 2, one sticker is left over.' }),

  makeMCQ({ id:'g1mth-num-067', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'What is the next even number after 14?',
    options:['16','15','17','13'], answer:'16',
    hint:'Even numbers: 10, 12, 14, ___.',
    explanation:'<b>16</b> is the next even number after 14.' }),

  makeMCQ({ id:'g1mth-num-068', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Which number below is even?',
    options:['12','13','15','19'], answer:'12',
    hint:'Even numbers end in 0, 2, 4, 6 or 8.',
    explanation:'<b>12</b> is even. It ends in 2.' }),

  makeMCQ({ id:'g1mth-num-069', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Is 5 odd or even?',
    options:['odd','even'], answer:'odd',
    hint:'5 ends in 5. Numbers ending in 5 are odd.',
    explanation:'<b>5</b> is <b>odd</b>. It ends in 5.' }),

  makeMCQ({ id:'g1mth-num-070', chapterId:'g1mth-numbers', difficulty:2, subsection:'odd_even',
    question:'Mia picks 6 flowers. She wants to put them in 2 vases with the same number in each. How many go in each vase?',
    options:['3','2','4','6'], answer:'3',
    hint:'6 is even. Split 6 into two equal groups.',
    explanation:'6 ÷ 2 = <b>3</b>. Three flowers go in each vase.' }),

  makeMCQ({ id:'g1mth-num-071', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'What is the next odd number after 7?',
    options:['9','8','10','6'], answer:'9',
    hint:'Odd numbers: 1, 3, 5, 7, ___.',
    explanation:'<b>9</b> is the next odd number after 7.' }),

  makeMCQ({ id:'g1mth-num-072', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'How many even numbers are there from 1 to 10?',
    options:['5','4','6','10'], answer:'5',
    hint:'Even numbers from 1–10: 2, 4, 6, 8, 10 — count them.',
    explanation:'There are <b>5</b> even numbers from 1 to 10: 2, 4, 6, 8, 10.' }),

  makeMCQ({ id:'g1mth-num-073', chapterId:'g1mth-numbers', difficulty:1, subsection:'odd_even',
    question:'Is 19 odd or even?',
    options:['odd','even'], answer:'odd',
    hint:'19 ends in 9. Numbers ending in 9 are odd.',
    explanation:'<b>19</b> is <b>odd</b>. It ends in 9.' }),

  makeMCQ({ id:'g1mth-num-074', chapterId:'g1mth-numbers', difficulty:2, subsection:'odd_even',
    question:'Tom collects 4 papaya and 6 mango. Is the total odd or even?',
    options:['even — 10 is even','odd — 10 is odd','even — 10 ends in 0','cannot tell'], answer:'even — 10 is even',
    hint:'4 + 6 = 10. Is 10 odd or even?',
    explanation:'4 + 6 = 10. <b>10 is even</b> because it ends in 0.' }),

  makeMCQ({ id:'g1mth-num-075', chapterId:'g1mth-numbers', difficulty:2, subsection:'odd_even',
    question:'Circle the odd numbers: 2, 5, 8, 11, 14. How many odd numbers are there?',
    options:['2','1','3','4'], answer:'2',
    hint:'Odd numbers end in 1, 3, 5, 7 or 9. Find them: 5 and 11.',
    explanation:'There are <b>2</b> odd numbers: 5 and 11.' })
);

})();
