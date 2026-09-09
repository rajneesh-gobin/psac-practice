'use strict';
(function () {

// Grade 2 Ordinal Numbers — g2mth-ordinals
// Subsections: positions_1_6 · positions_7_12 · ordinal_problems
// IDs: g2mth-ord-001 … g2mth-ord-090

STATIC_QUESTIONS.push(

// ── positions_1_6 (001–035) ──────────────────────────────────────────────────

  makeMCQ({ id:'g2mth-ord-001', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'Priya is the 3rd person in a queue. Which ordinal word matches?',
    options:['third','second','fourth','first'], answer:'third',
    hint:'Count: 1st first, 2nd second, 3rd third.',
    explanation:'<b>Third</b> (3rd) is the position name for number 3 in a sequence.' }),

  makeMCQ({ id:'g2mth-ord-002', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'Which position is the SECOND place?',
    options:['2nd','1st','3rd','4th'], answer:'2nd',
    hint:'Second is written as 2nd.',
    explanation:'Second = <b>2nd</b>. We add "nd" after the number 2.' }),

  makeMCQ({ id:'g2mth-ord-003', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'Ahmed came FIRST in the race. Write this as a numeral.',
    options:['1st','2nd','3rd','4th'], answer:'1st',
    hint:'First is written with "st" after 1.',
    explanation:'<b>1st</b> means first — the winner of the race.' }),

  makeMCQ({ id:'g2mth-ord-004', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'Look at this row of birds: 🐦🐦🐦🐦🐦🐦. Which bird is FOURTH from the left?',
    options:['the 4th bird','the 3rd bird','the 5th bird','the 2nd bird'], answer:'the 4th bird',
    hint:'Count from the left: 1st, 2nd, 3rd, 4th.',
    explanation:'Counting from the left, the <b>4th bird</b> is in fourth position.' }),

  makeTF({ id:'g2mth-ord-005', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'"Fifth" and "5th" mean the same thing.',
    answer:true,
    explanation:'True — fifth and 5th are two ways to write the same ordinal position.' }),

  makeMCQ({ id:'g2mth-ord-006', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'What is the ordinal word for 6?',
    options:['sixth','seventh','fifth','four'], answer:'sixth',
    hint:'6th is written as "sixth".',
    explanation:'6th = <b>sixth</b>.' }),

  makeMCQ({ id:'g2mth-ord-007', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'Mia finished the puzzle in 5th place. Write this as a word.',
    options:['fifth','fourth','sixth','third'], answer:'fifth',
    hint:'5th = fifth.',
    explanation:'5th is written as <b>fifth</b>.' }),

  makeMCQ({ id:'g2mth-ord-008', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'In a queue: Anna 1st, Bob 2nd, Cara 3rd, Dev 4th, Ela 5th, Finn 6th. Who is THIRD?',
    options:['Cara','Bob','Dev','Ela'], answer:'Cara',
    hint:'Count the names: Anna 1st, Bob 2nd, Cara 3rd.',
    explanation:'<b>Cara</b> is in 3rd (third) position.' }),

  makeMCQ({ id:'g2mth-ord-009', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'What ordinal number comes just AFTER fourth?',
    options:['fifth','third','sixth','second'], answer:'fifth',
    hint:'fourth → fifth.',
    explanation:'After 4th (fourth) comes 5th (<b>fifth</b>).' }),

  makeMCQ({ id:'g2mth-ord-010', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'Which numeral matches "second"?',
    options:['2nd','1st','3rd','5th'], answer:'2nd',
    hint:'Second = 2nd.',
    explanation:'Second is the same as <b>2nd</b>.' }),

  makeMCQ({ id:'g2mth-ord-011', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'The flower is in the 1st pot. Which pot is it in?',
    options:['the first pot','the second pot','the third pot','the fourth pot'], answer:'the first pot',
    hint:'1st = first.',
    explanation:'1st means <b>first</b> — the very first pot.' }),

  makeMCQ({ id:'g2mth-ord-012', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'How do you write "fourth" as a numeral?',
    options:['4th','3rd','5th','6th'], answer:'4th',
    hint:'Fourth = 4th.',
    explanation:'Fourth = <b>4th</b>.' }),

  makeTF({ id:'g2mth-ord-013', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'3rd means "third".',
    answer:true,
    explanation:'True — 3rd and "third" both describe the same ordinal position.' }),

  makeMCQ({ id:'g2mth-ord-014', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'Stars in a row: ⭐⭐⭐⭐⭐⭐. What position is the 6th star?',
    options:['sixth','fifth','fourth','seventh'], answer:'sixth',
    hint:'Count to the last star: 6th = sixth.',
    explanation:'The 6th star is in <b>sixth</b> position.' }),

  makeMCQ({ id:'g2mth-ord-015', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'Sam is 2nd and Lena is one place ahead. What position is Lena?',
    options:['1st','3rd','4th','2nd'], answer:'1st',
    hint:'One place ahead of 2nd is 1st.',
    explanation:'One place ahead of 2nd (second) is <b>1st</b> (first).' }),

  makeMCQ({ id:'g2mth-ord-016', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'Which ordinal word matches 2nd?',
    options:['second','first','third','fourth'], answer:'second',
    hint:'2nd = second.',
    explanation:'2nd = <b>second</b>.' }),

  makeMCQ({ id:'g2mth-ord-017', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'A book is on the 5th shelf. Which shelf is it on?',
    options:['fifth','fourth','sixth','third'], answer:'fifth',
    hint:'5th = fifth.',
    explanation:'The book is on the <b>fifth</b> shelf.' }),

  makeMCQ({ id:'g2mth-ord-018', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'Children in a line: Tom, Ana, Ben, Sue, Jo, Max. What ordinal position is Ben?',
    options:['third','second','fourth','first'], answer:'third',
    hint:'Tom 1st, Ana 2nd, Ben 3rd.',
    explanation:'<b>Third</b> — Ben is the 3rd child in the line.' }),

  makeMCQ({ id:'g2mth-ord-019', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'The 4th letter in A B C D E F is …',
    options:['D','C','E','F'], answer:'D',
    hint:'A is 1st, B is 2nd, C is 3rd, D is 4th.',
    explanation:'Counting from the left: A=1st, B=2nd, C=3rd, <b>D=4th</b>.' }),

  makeMCQ({ id:'g2mth-ord-020', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'What is the ordinal word for 1?',
    options:['first','second','third','fourth'], answer:'first',
    hint:'1st = first.',
    explanation:'1st = <b>first</b>.' }),

  makeMCQ({ id:'g2mth-ord-021', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'Which ordinal comes just BEFORE third?',
    options:['second','fourth','first','fifth'], answer:'second',
    hint:'second → third.',
    explanation:'Just before 3rd (third) is 2nd (<b>second</b>).' }),

  makeMCQ({ id:'g2mth-ord-022', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'Jo finished the race in 6th place. What word describes that?',
    options:['sixth','fifth','seventh','fourth'], answer:'sixth',
    hint:'6th = sixth.',
    explanation:'6th = <b>sixth</b>. Jo finished sixth.' }),

  makeMCQ({ id:'g2mth-ord-023', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'How do you write "first" as a numeral?',
    options:['1st','2nd','3rd','4th'], answer:'1st',
    hint:'First = 1st.',
    explanation:'First = <b>1st</b>.' }),

  makeTF({ id:'g2mth-ord-024', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'4th and "fourth" mean the same thing.',
    answer:true,
    explanation:'True — 4th and fourth are both ways to write the same ordinal.' }),

  makeMCQ({ id:'g2mth-ord-025', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'Five children are in a line. Raj is last. What ordinal position is Raj?',
    options:['fifth','fourth','sixth','third'], answer:'fifth',
    hint:'Last out of 5 = 5th = fifth.',
    explanation:'There are 5 children so last = 5th = <b>fifth</b>.' }),

  makeMCQ({ id:'g2mth-ord-026', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'Which numeral matches "third"?',
    options:['3rd','2nd','4th','5th'], answer:'3rd',
    hint:'Third = 3rd.',
    explanation:'Third = <b>3rd</b>.' }),

  makeMCQ({ id:'g2mth-ord-027', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'The 6th letter in M N O P Q R is …',
    options:['R','Q','P','S'], answer:'R',
    hint:'M=1st, N=2nd, O=3rd, P=4th, Q=5th, R=6th.',
    explanation:'Counting: M=1st, N=2nd, O=3rd, P=4th, Q=5th, <b>R=6th</b>.' }),

  makeMCQ({ id:'g2mth-ord-028', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'What does "2nd" mean?',
    options:['second','first','third','fourth'], answer:'second',
    hint:'2nd = second.',
    explanation:'2nd means <b>second</b>.' }),

  makeMCQ({ id:'g2mth-ord-029', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'Eva is 4th in a queue. How many children are IN FRONT of her?',
    options:['3','4','2','1'], answer:'3',
    hint:'If you are 4th, there are 3 people before you.',
    explanation:'Being <b>4th</b> means 3 children are in front of Eva.' }),

  makeMCQ({ id:'g2mth-ord-030', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'What ordinal comes between second and fourth?',
    options:['third','first','fifth','sixth'], answer:'third',
    hint:'second → __ → fourth.',
    explanation:'Between 2nd and 4th is <b>3rd (third)</b>.' }),

  makeMCQ({ id:'g2mth-ord-031', chapterId:'g2mth-ordinals', difficulty:3, subsection:'positions_1_6',
    question:'Books on a shelf: Maths 1st, English 2nd, French 3rd, Science 4th, Art 5th, Music 6th. Which book is SIXTH?',
    options:['Music','Art','Science','English'], answer:'Music',
    hint:'Count to position 6.',
    explanation:'Music is the <b>sixth</b> book on the shelf.' }),

  makeMCQ({ id:'g2mth-ord-032', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'A child moves from 3rd place to 1st place. How many places did they move forward?',
    options:['2','1','3','4'], answer:'2',
    hint:'From 3rd to 1st = 3 − 1 = 2 places.',
    explanation:'From 3rd to 1st is <b>2</b> places forward.' }),

  makeMCQ({ id:'g2mth-ord-033', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'How do you write "sixth" as a numeral?',
    options:['6th','5th','7th','4th'], answer:'6th',
    hint:'Sixth = 6th.',
    explanation:'Sixth = <b>6th</b>.' }),

  makeMCQ({ id:'g2mth-ord-034', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_1_6',
    question:'Lara is 1st. Nina is 3 places BEHIND Lara. What position is Nina?',
    options:['4th','3rd','2nd','5th'], answer:'4th',
    hint:'1 + 3 = 4, so Nina is 4th.',
    explanation:'1 + 3 = <b>4th</b>. Nina is in fourth position.' }),

  makeTF({ id:'g2mth-ord-035', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_1_6',
    question:'6th means "seventh".',
    answer:false,
    explanation:'False — 6th means <b>sixth</b>, not seventh. 7th = seventh.' }),

// ── positions_7_12 (036–065) ─────────────────────────────────────────────────

  makeMCQ({ id:'g2mth-ord-036', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_7_12',
    question:'What is the ordinal word for 7th?',
    options:['seventh','sixth','eighth','ninth'], answer:'seventh',
    hint:'7th = seventh.',
    explanation:'7th = <b>seventh</b>.' }),

  makeMCQ({ id:'g2mth-ord-037', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_7_12',
    question:'How do you write "eighth" as a numeral?',
    options:['8th','7th','9th','6th'], answer:'8th',
    hint:'Eighth = 8th.',
    explanation:'Eighth = <b>8th</b>.' }),

  makeMCQ({ id:'g2mth-ord-038', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_7_12',
    question:'What does 9th mean?',
    options:['ninth','eighth','tenth','seventh'], answer:'ninth',
    hint:'9th = ninth.',
    explanation:'9th = <b>ninth</b>.' }),

  makeMCQ({ id:'g2mth-ord-039', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_7_12',
    question:'How do you write "tenth" as a numeral?',
    options:['10th','9th','11th','12th'], answer:'10th',
    hint:'Tenth = 10th.',
    explanation:'Tenth = <b>10th</b>.' }),

  makeMCQ({ id:'g2mth-ord-040', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_7_12',
    question:'What is the ordinal word for 11th?',
    options:['eleventh','tenth','twelfth','ninth'], answer:'eleventh',
    hint:'11th = eleventh.',
    explanation:'11th = <b>eleventh</b>.' }),

  makeMCQ({ id:'g2mth-ord-041', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_7_12',
    question:'How do you write "twelfth" as a numeral?',
    options:['12th','11th','10th','13th'], answer:'12th',
    hint:'Twelfth = 12th.',
    explanation:'Twelfth = <b>12th</b>.' }),

  makeMCQ({ id:'g2mth-ord-042', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'Children in a line (positions 7–12): Dan, Fay, Gil, Han, Ika, Jan. Who is 9th?',
    options:['Gil','Fay','Han','Ika'], answer:'Gil',
    hint:'Dan=7th, Fay=8th, Gil=9th.',
    explanation:'<b>Gil</b> is 9th (ninth) in the line.' }),

  makeMCQ({ id:'g2mth-ord-043', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'What ordinal comes just AFTER ninth?',
    options:['tenth','eighth','eleventh','twelfth'], answer:'tenth',
    hint:'ninth → tenth.',
    explanation:'After 9th (ninth) comes 10th (<b>tenth</b>).' }),

  makeMCQ({ id:'g2mth-ord-044', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'What ordinal comes just BEFORE eighth?',
    options:['seventh','ninth','sixth','tenth'], answer:'seventh',
    hint:'seventh → eighth.',
    explanation:'Before 8th (eighth) is 7th (<b>seventh</b>).' }),

  makeTF({ id:'g2mth-ord-045', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_7_12',
    question:'11th means "eleventh".',
    answer:true,
    explanation:'True — 11th and eleventh describe the same position.' }),

  makeMCQ({ id:'g2mth-ord-046', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_7_12',
    question:'Which numeral matches "ninth"?',
    options:['9th','8th','10th','7th'], answer:'9th',
    hint:'Ninth = 9th.',
    explanation:'Ninth = <b>9th</b>.' }),

  makeMCQ({ id:'g2mth-ord-047', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'The 10th letter in A B C D E F G H I J K L is …',
    options:['J','I','K','H'], answer:'J',
    hint:'A=1, B=2 … count to 10.',
    explanation:'Counting: A=1st, B=2nd, C=3rd, D=4th, E=5th, F=6th, G=7th, H=8th, I=9th, <b>J=10th</b>.' }),

  makeMCQ({ id:'g2mth-ord-048', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'Uma is 12th in a queue. How many people are in front of her?',
    options:['11','12','10','13'], answer:'11',
    hint:'If you are 12th, there are 11 people before you.',
    explanation:'Being 12th means <b>11</b> people are in front of Uma.' }),

  makeMCQ({ id:'g2mth-ord-049', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'A child moves from 10th to 7th. How many places did they move forward?',
    options:['3','2','4','1'], answer:'3',
    hint:'10 − 7 = 3 places.',
    explanation:'10 − 7 = <b>3</b> places forward.' }),

  makeMCQ({ id:'g2mth-ord-050', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_7_12',
    question:'What is the ordinal word for 8th?',
    options:['eighth','seventh','ninth','tenth'], answer:'eighth',
    hint:'8th = eighth.',
    explanation:'8th = <b>eighth</b>.' }),

  makeMCQ({ id:'g2mth-ord-051', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'What ordinal is between ninth and eleventh?',
    options:['tenth','eighth','twelfth','seventh'], answer:'tenth',
    hint:'ninth → ? → eleventh.',
    explanation:'Between 9th and 11th is <b>10th (tenth)</b>.' }),

  makeTF({ id:'g2mth-ord-052', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_7_12',
    question:'10th means "ninth".',
    answer:false,
    explanation:'False — 10th means <b>tenth</b>, not ninth.' }),

  makeMCQ({ id:'g2mth-ord-053', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'12 children ran a race. Mia finished last. What position is Mia?',
    options:['twelfth','eleventh','tenth','ninth'], answer:'twelfth',
    hint:'Last out of 12 = 12th = twelfth.',
    explanation:'Last out of 12 is <b>twelfth (12th)</b>.' }),

  makeMCQ({ id:'g2mth-ord-054', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_7_12',
    question:'How do you write "seventh" as a numeral?',
    options:['7th','6th','8th','5th'], answer:'7th',
    hint:'Seventh = 7th.',
    explanation:'Seventh = <b>7th</b>.' }),

  makeMCQ({ id:'g2mth-ord-055', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'Months in a year: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec. Which month is 8th?',
    options:['August','July','September','October'], answer:'August',
    hint:'Count the months: Jan=1st … Aug=8th.',
    explanation:'January is 1st, February 2nd … <b>August is the 8th month</b>.' }),

  makeMCQ({ id:'g2mth-ord-056', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'Which month of the year is December?',
    options:['12th','11th','10th','9th'], answer:'12th',
    hint:'Count all 12 months.',
    explanation:'December is the <b>12th (twelfth)</b> month of the year.' }),

  makeMCQ({ id:'g2mth-ord-057', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'Which month of the year is November?',
    options:['11th','10th','12th','9th'], answer:'11th',
    hint:'Count: Jan=1 … Nov=11.',
    explanation:'November is the <b>11th (eleventh)</b> month.' }),

  makeMCQ({ id:'g2mth-ord-058', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'Which month of the year is October?',
    options:['10th','9th','11th','8th'], answer:'10th',
    hint:'Count: Jan=1 … Oct=10.',
    explanation:'October is the <b>10th (tenth)</b> month.' }),

  makeMCQ({ id:'g2mth-ord-059', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_7_12',
    question:'Which numeral matches "eleventh"?',
    options:['11th','10th','12th','9th'], answer:'11th',
    hint:'Eleventh = 11th.',
    explanation:'Eleventh = <b>11th</b>.' }),

  makeMCQ({ id:'g2mth-ord-060', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'Max is 9th in a race. He falls back 2 places. What position is he now?',
    options:['11th','8th','10th','7th'], answer:'11th',
    hint:'9 + 2 = 11.',
    explanation:'9th + 2 places back = <b>11th</b>.' }),

  makeMCQ({ id:'g2mth-ord-061', chapterId:'g2mth-ordinals', difficulty:3, subsection:'positions_7_12',
    question:'A bus has 12 seats in a row. Seat 7 is for whom?',
    options:['the 7th passenger','the 6th passenger','the 8th passenger','the 5th passenger'], answer:'the 7th passenger',
    hint:'Seat 7 = 7th position = seventh.',
    explanation:'Seat 7 belongs to the <b>7th (seventh)</b> passenger.' }),

  makeMCQ({ id:'g2mth-ord-062', chapterId:'g2mth-ordinals', difficulty:3, subsection:'positions_7_12',
    question:'There are 12 steps on a staircase. Riya stands on step 10. What ordinal position is that?',
    options:['tenth','ninth','eleventh','eighth'], answer:'tenth',
    hint:'Step 10 = 10th = tenth.',
    explanation:'Step 10 is the <b>tenth</b> step.' }),

  makeMCQ({ id:'g2mth-ord-063', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'What ordinal comes just AFTER eleventh?',
    options:['twelfth','tenth','ninth','eighth'], answer:'twelfth',
    hint:'eleventh → twelfth.',
    explanation:'After 11th (eleventh) comes 12th (<b>twelfth</b>).' }),

  makeMCQ({ id:'g2mth-ord-064', chapterId:'g2mth-ordinals', difficulty:1, subsection:'positions_7_12',
    question:'How do you write "twelfth" as a numeral?',
    options:['12th','11th','10th','13th'], answer:'12th',
    hint:'Twelfth = 12th.',
    explanation:'Twelfth = <b>12th</b>.' }),

  makeTF({ id:'g2mth-ord-065', chapterId:'g2mth-ordinals', difficulty:2, subsection:'positions_7_12',
    question:'The 7th month of the year is August.',
    answer:false,
    explanation:'False — the 7th month is <b>July</b>. August is the 8th month.' }),

// ── ordinal_problems (066–090) ───────────────────────────────────────────────

  makeMCQ({ id:'g2mth-ord-066', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'6 children stand in a line. Priya is 4th. How many children are AFTER her?',
    options:['2','3','1','4'], answer:'2',
    hint:'6 − 4 = 2 children after Priya.',
    explanation:'6 − 4 = <b>2</b> children are after Priya.' }),

  makeMCQ({ id:'g2mth-ord-067', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'Ravi is 3rd and his friend is 5th. How many children are between them?',
    options:['1','2','3','0'], answer:'1',
    hint:'Positions 3, 4, 5 — only position 4 is between.',
    explanation:'Only one child (4th) is between 3rd and 5th. Answer = <b>1</b>.' }),

  makeMCQ({ id:'g2mth-ord-068', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'Sam is 7th in a race of 12. He speeds up and passes 3 people. What position is he now?',
    options:['4th','5th','6th','3rd'], answer:'4th',
    hint:'7 − 3 = 4.',
    explanation:'7th − 3 places = <b>4th</b>.' }),

  makeMCQ({ id:'g2mth-ord-069', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'A shop has shelves numbered 1 to 12. The biscuits are on the 9th shelf. What word describes this shelf?',
    options:['ninth','eighth','tenth','seventh'], answer:'ninth',
    hint:'9th = ninth.',
    explanation:'The <b>ninth</b> shelf holds the biscuits.' }),

  makeMCQ({ id:'g2mth-ord-070', chapterId:'g2mth-ordinals', difficulty:3, subsection:'ordinal_problems',
    question:'There are 10 runners. Ana is 6th. How many runners are AHEAD of Ana?',
    options:['5','6','4','7'], answer:'5',
    hint:'If you are 6th, 5 runners are ahead.',
    explanation:'Being 6th means <b>5</b> runners are ahead of Ana.' }),

  makeMCQ({ id:'g2mth-ord-071', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'Lia is 2nd. Tom is 8 places behind her. What position is Tom?',
    options:['10th','9th','8th','11th'], answer:'10th',
    hint:'2 + 8 = 10.',
    explanation:'2 + 8 = <b>10th</b>. Tom is in tenth place.' }),

  makeMCQ({ id:'g2mth-ord-072', chapterId:'g2mth-ordinals', difficulty:3, subsection:'ordinal_problems',
    question:'12 children stand in a row. Mia is in the middle of the second half. Which position is she?',
    options:['9th','7th','8th','10th'], answer:'9th',
    hint:'Second half is positions 7–12. Middle is between 9th and 10th — closest is 9th.',
    explanation:'The second half is positions 7–12. The middle is 9th–10th. <b>9th</b> is the first middle position.' }),

  makeMCQ({ id:'g2mth-ord-073', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'Jay is 11th in a queue. If 3 people leave the front of the queue, what position is Jay?',
    options:['8th','9th','10th','7th'], answer:'8th',
    hint:'11 − 3 = 8.',
    explanation:'11 − 3 = <b>8th</b>. Jay moves to eighth position.' }),

  makeMCQ({ id:'g2mth-ord-074', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'Books on a shelf: the 4th book is red. Which ordinal describes it?',
    options:['fourth','fifth','third','sixth'], answer:'fourth',
    hint:'4th = fourth.',
    explanation:'The 4th book is in <b>fourth</b> position.' }),

  makeMCQ({ id:'g2mth-ord-075', chapterId:'g2mth-ordinals', difficulty:3, subsection:'ordinal_problems',
    question:'There are 12 months. How many months are AFTER the seventh month (July)?',
    options:['5','6','4','7'], answer:'5',
    hint:'12 − 7 = 5 months remain.',
    explanation:'12 − 7 = <b>5</b> months come after July.' }),

  makeMCQ({ id:'g2mth-ord-076', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'Lin is 5th in a race. She overtakes 2 children. What position is she now?',
    options:['3rd','4th','2nd','6th'], answer:'3rd',
    hint:'5 − 2 = 3.',
    explanation:'5 − 2 = <b>3rd</b>. Lin is now in third place.' }),

  makeMCQ({ id:'g2mth-ord-077', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'In a queue of 12, Ben is 8th. How many people are BEHIND Ben?',
    options:['4','5','3','6'], answer:'4',
    hint:'12 − 8 = 4 behind.',
    explanation:'12 − 8 = <b>4</b> people are behind Ben.' }),

  makeMCQ({ id:'g2mth-ord-078', chapterId:'g2mth-ordinals', difficulty:3, subsection:'ordinal_problems',
    question:'Prizes go to the 1st, 2nd and 3rd children. If Kai is 4th, does he win a prize?',
    options:['No','Yes','Maybe','Cannot tell'], answer:'No',
    hint:'Prizes are only for 1st, 2nd, 3rd.',
    explanation:'<b>No</b> — Kai is 4th and prizes only go to the first three.' }),

  makeMCQ({ id:'g2mth-ord-079', chapterId:'g2mth-ordinals', difficulty:3, subsection:'ordinal_problems',
    question:'A library has 12 numbered aisles. Books about animals are in aisles 7, 8 and 9. What ordinal words describe those aisles?',
    options:['seventh, eighth and ninth','sixth, seventh and eighth','eighth, ninth and tenth','fifth, sixth and seventh'], answer:'seventh, eighth and ninth',
    hint:'7th = seventh, 8th = eighth, 9th = ninth.',
    explanation:'Aisles 7, 8 and 9 are the <b>seventh, eighth and ninth</b> aisles.' }),

  makeMCQ({ id:'g2mth-ord-080', chapterId:'g2mth-ordinals', difficulty:4, subsection:'ordinal_problems',
    question:'An egg-and-spoon race has 12 children. Tia drops her egg when she is 5th and falls back to last. How many places did she fall?',
    options:['7','8','6','9'], answer:'7',
    hint:'12 − 5 = 7 places back.',
    explanation:'12th − 5th = <b>7</b> places back to last.' }),

  makeTF({ id:'g2mth-ord-081', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'If Leila is 12th in a race, she finished last when there are 12 runners.',
    answer:true,
    explanation:'True — if there are 12 runners and Leila is 12th, she finished last.' }),

  makeMCQ({ id:'g2mth-ord-082', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'A caterpillar has 12 legs. The 7th leg is …',
    options:['the seventh leg','the eighth leg','the sixth leg','the ninth leg'], answer:'the seventh leg',
    hint:'7th = seventh.',
    explanation:'The 7th leg is the <b>seventh</b> leg.' }),

  makeMCQ({ id:'g2mth-ord-083', chapterId:'g2mth-ordinals', difficulty:3, subsection:'ordinal_problems',
    question:'Amy is 6th. She and the 5 children behind her all leave. How many children remain in the queue?',
    options:['5','6','4','7'], answer:'5',
    hint:'Amy is 6th, so 5 are ahead of her. They stay.',
    explanation:'Amy is 6th. The 5 children ahead of her remain. Answer: <b>5</b>.' }),

  makeMCQ({ id:'g2mth-ord-084', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'Kai is 3rd and Mia is 10th. How many places separate them?',
    options:['7','6','8','5'], answer:'7',
    hint:'10 − 3 = 7.',
    explanation:'10 − 3 = <b>7</b> places between 3rd and 10th.' }),

  makeMCQ({ id:'g2mth-ord-085', chapterId:'g2mth-ordinals', difficulty:4, subsection:'ordinal_problems',
    question:'A teacher gives stickers to every EVEN ordinal position (2nd, 4th, 6th …). Does the child in 9th position get a sticker?',
    options:['No','Yes','Maybe','Cannot tell'], answer:'No',
    hint:'9th is an odd position.',
    explanation:'9th is an odd position; only even positions (2nd, 4th, 6th, 8th, 10th, 12th) get stickers. <b>No</b>.' }),

  makeMCQ({ id:'g2mth-ord-086', chapterId:'g2mth-ordinals', difficulty:3, subsection:'ordinal_problems',
    question:'There are 12 children in a race. 4 children finish before Leo. What ordinal position is Leo?',
    options:['5th','4th','6th','3rd'], answer:'5th',
    hint:'If 4 finish before you, you are 5th.',
    explanation:'If 4 children finish before Leo, Leo is <b>5th</b>.' }),

  makeMCQ({ id:'g2mth-ord-087', chapterId:'g2mth-ordinals', difficulty:3, subsection:'ordinal_problems',
    question:'Nadia is 12th and wins a prize for last place. If 2 more children join and finish after her, is she still last?',
    options:['No','Yes','Cannot tell','Maybe'], answer:'No',
    hint:'If more children finish after her, she is no longer last.',
    explanation:'<b>No</b> — 2 more children finish after her, so Nadia is now 12th out of 14, not last.' }),

  makeTF({ id:'g2mth-ord-088', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'The 7th position is called "eighth".',
    answer:false,
    explanation:'False — the 7th position is called <b>seventh</b>. Eighth is 8th.' }),

  makeMCQ({ id:'g2mth-ord-089', chapterId:'g2mth-ordinals', difficulty:4, subsection:'ordinal_problems',
    question:'A relay race has 4 runners per team. If the first three runners each take 2 minutes, and you are the 4th runner, when do you start running?',
    options:['after 6 minutes','after 4 minutes','after 8 minutes','after 2 minutes'], answer:'after 6 minutes',
    hint:'3 runners × 2 minutes each = 6 minutes.',
    explanation:'3 × 2 = 6 minutes. The <b>4th runner</b> starts after 6 minutes.' }),

  makeMCQ({ id:'g2mth-ord-090', chapterId:'g2mth-ordinals', difficulty:2, subsection:'ordinal_problems',
    question:'Seats in a cinema row: 12 seats. The 11th seat is the SECOND TO LAST seat. Is this true?',
    options:['Yes','No','Cannot tell','Maybe'], answer:'Yes',
    hint:'If there are 12 seats, the 2nd to last is 11th.',
    explanation:'<b>Yes</b> — with 12 seats, the second to last is seat 11 (11th).' })

);

})();
