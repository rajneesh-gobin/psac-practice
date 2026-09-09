'use strict';
(function () {

// Grade 3 Maths — Ordinal Numbers  (g3mth-ord-001 … g3mth-ord-090)
// Source: MIE Maths Grade 3 Part 2 pp.19-32
// Three subsections: ordinals_1_10 · ordinals_11_20 · ordinal_context

// ── ordinals_1_10 (001–030) ───────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3mth-ord-001', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'What is the ordinal word for the number 1?',
    options:['first','second','third','fourth'], answer:'first',
    hint:'The word "first" comes from "one".',
    explanation:'1 → <b>first</b>. It is written as 1st.' }),

  makeMCQ({ id:'g3mth-ord-002', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'What is the ordinal word for the number 2?',
    options:['second','first','third','fourth'], answer:'second',
    hint:'Think of "second" place in a race.',
    explanation:'2 → <b>second</b>. Written as 2nd.' }),

  makeMCQ({ id:'g3mth-ord-003', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'Which ordinal number comes after third?',
    options:['fifth','fourth','sixth','second'], answer:'fourth',
    hint:'Count: first, second, third, …?',
    explanation:'After third comes <b>fourth</b>. 3rd → 4th.' }),

  makeMCQ({ id:'g3mth-ord-004', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="five children in a line">' +
      '<svg viewBox="0 0 300 80" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="20" y="40" font-size="28">🧒</text><text x="14" y="68" font-size="11" fill="#374151">1st</text>' +
      '<text x="75" y="40" font-size="28">🧒</text><text x="69" y="68" font-size="11" fill="#374151">2nd</text>' +
      '<text x="130" y="40" font-size="28">🧒</text><text x="124" y="68" font-size="11" fill="#374151">3rd</text>' +
      '<text x="185" y="40" font-size="28">🧒</text><text x="179" y="68" font-size="11" fill="#374151">4th</text>' +
      '<text x="240" y="40" font-size="28">🧒</text><text x="234" y="68" font-size="11" fill="#374151">5th</text>' +
      '</svg></div>' +
      'A child stands 3rd in a queue. Which position is that called?',
    options:['first','second','third','fourth'], answer:'third',
    hint:'3rd = ?',
    explanation:'3rd = <b>third</b>.' }),

  makeMCQ({ id:'g3mth-ord-005', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'How do you write "fifth" as an ordinal numeral?',
    options:['3rd','4th','5th','6th'], answer:'5th',
    hint:'Fifth is the 5th position.',
    explanation:'Fifth is written as <b>5th</b>.' }),

  makeMCQ({ id:'g3mth-ord-006', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'What ordinal number is 6th?',
    options:['fifth','sixth','seventh','eighth'], answer:'sixth',
    hint:'6 → sixth.',
    explanation:'6th is called <b>sixth</b>.' }),

  makeTF({ id:'g3mth-ord-007', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'The 7th position is called "seventh".',
    answer:true,
    explanation:'Yes — seventh is the ordinal word for 7. Written as 7th.' }),

  makeMCQ({ id:'g3mth-ord-008', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'Which ordinal numeral stands for "eighth"?',
    options:['6th','7th','8th','9th'], answer:'8th',
    hint:'Eighth = 8th.',
    explanation:'Eighth is written as <b>8th</b>.' }),

  makeMCQ({ id:'g3mth-ord-009', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="ten animals in a row">' +
      '<svg viewBox="0 0 320 80" style="width:100%;max-width:340px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="2" y="42" font-size="24">🐱</text><text x="32" y="42" font-size="24">🐶</text>' +
      '<text x="62" y="42" font-size="24">🐰</text><text x="92" y="42" font-size="24">🐸</text>' +
      '<text x="122" y="42" font-size="24">🐻</text><text x="152" y="42" font-size="24">🦊</text>' +
      '<text x="182" y="42" font-size="24">🐼</text><text x="212" y="42" font-size="24">🐨</text>' +
      '<text x="242" y="42" font-size="24">🦁</text><text x="272" y="42" font-size="24">🐯</text>' +
      '<text x="4" y="68" font-size="9" fill="#374151">1st</text><text x="34" y="68" font-size="9" fill="#374151">2nd</text>' +
      '<text x="64" y="68" font-size="9" fill="#374151">3rd</text><text x="94" y="68" font-size="9" fill="#374151">4th</text>' +
      '<text x="124" y="68" font-size="9" fill="#374151">5th</text><text x="154" y="68" font-size="9" fill="#374151">6th</text>' +
      '<text x="184" y="68" font-size="9" fill="#374151">7th</text><text x="214" y="68" font-size="9" fill="#374151">8th</text>' +
      '<text x="244" y="68" font-size="9" fill="#374151">9th</text><text x="274" y="68" font-size="9" fill="#374151">10th</text>' +
      '</svg></div>' +
      'Which animal is in the 5th position?',
    options:['fox','bear','panda','rabbit'], answer:'bear',
    hint:'Count from the left: 1st cat, 2nd dog, 3rd rabbit, 4th frog, 5th = ?',
    explanation:'The 5th animal in the row is the <b>bear</b> (🐻).' }),

  makeMCQ({ id:'g3mth-ord-010', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'What ordinal word do we use for position 9?',
    options:['eighth','ninth','tenth','seventh'], answer:'ninth',
    hint:'9 → ninth.',
    explanation:'Position 9 is called <b>ninth</b> (9th).' }),

  makeMCQ({ id:'g3mth-ord-011', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'What is the ordinal numeral for "tenth"?',
    options:['8th','9th','10th','11th'], answer:'10th',
    hint:'Tenth is the 10th position.',
    explanation:'Tenth is written as <b>10th</b>.' }),

  makeMCQ({ id:'g3mth-ord-012', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'How many ordinal positions are there between "first" and "fifth" (not counting first or fifth)?',
    options:['2','3','4','5'], answer:'3',
    hint:'List them: second, third, fourth.',
    explanation:'Between 1st and 5th are: 2nd, 3rd and 4th — that is <b>3</b> positions.' }),

  makeTF({ id:'g3mth-ord-013', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'The ordinal numeral for "fourth" is 4th.',
    answer:true,
    explanation:'Yes — fourth = 4th. Correct!' }),

  makeMCQ({ id:'g3mth-ord-014', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_1_10',
    question:'Priya finished 3rd in a race. How many runners finished BEFORE her?',
    options:['1','2','3','4'], answer:'2',
    hint:'If she is 3rd, two people are ahead.',
    explanation:'If Priya is 3rd, then 1st and 2nd both finished before her — <b>2</b> runners.' }),

  makeMCQ({ id:'g3mth-ord-015', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_1_10',
    question:'In a row of 8 children, what position is "second from the end"?',
    options:['6th','7th','8th','5th'], answer:'7th',
    hint:'"Second from the end" of 8 means position 8 − 1 = 7.',
    explanation:'Second from the end of 8 = position <b>7th</b>.' }),

  makeMCQ({ id:'g3mth-ord-016', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'Which of these is written correctly?',
    options:['3st','3nd','3rd','3th'], answer:'3rd',
    hint:'3rd is the standard abbreviation for "third".',
    explanation:'<b>3rd</b> is the correct abbreviation. "3rd" = third.' }),

  makeMCQ({ id:'g3mth-ord-017', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_1_10',
    question:'Meena is 4th in a line of 10 children. How many children are BEHIND her?',
    options:['4','5','6','7'], answer:'6',
    hint:'Total − position = 10 − 4.',
    explanation:'Meena is 4th in a line of 10. Children behind her = 10 − 4 = <b>6</b>.' }),

  makeMCQ({ id:'g3mth-ord-018', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'What comes after "ninth" in the ordinal sequence?',
    options:['eighth','tenth','eleventh','seventh'], answer:'tenth',
    hint:'9th → 10th.',
    explanation:'After ninth (9th) comes <b>tenth</b> (10th).' }),

  makeTF({ id:'g3mth-ord-019', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'The 8th position is called "eighth".',
    answer:true,
    explanation:'Yes — 8th = eighth. Correct!' }),

  makeMCQ({ id:'g3mth-ord-020', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_1_10',
    question:'In a stack of 5 books, the red book is at the 4th position from the top. How many books are BELOW the red book?',
    options:['0','1','2','3'], answer:'1',
    hint:'5 books total. 4 from top. How many left below?',
    explanation:'If the red book is 4th from the top in a stack of 5, only <b>1</b> book is below it.' }),

  makeMCQ({ id:'g3mth-ord-021', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'Which ordinal word corresponds to 7th?',
    options:['sixth','seventh','eighth','ninth'], answer:'seventh',
    hint:'7 → seventh.',
    explanation:'7th = <b>seventh</b>.' }),

  makeMCQ({ id:'g3mth-ord-022', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_1_10',
    question:'A train has 10 carriages. You are in the carriage that comes just before the 8th. Which carriage are you in?',
    options:['6th','7th','8th','9th'], answer:'7th',
    hint:'Just before 8th = ?',
    explanation:'The carriage just before the 8th is the <b>7th</b> carriage.' }),

  makeMCQ({ id:'g3mth-ord-023', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_1_10',
    question:'In a race with 10 runners, Dev finished 2nd. How many runners finished AFTER Dev?',
    options:['6','7','8','9'], answer:'8',
    hint:'Total runners − Dev\'s position = 10 − 2.',
    explanation:'10 runners − 2nd position = <b>8</b> runners finished after Dev.' }),

  makeMCQ({ id:'g3mth-ord-024', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'Write the ordinal word for 6th.',
    options:['fifth','sixth','seventh','eighth'], answer:'sixth',
    hint:'Count the ordinals: 1st first, 2nd second, …, 6th …?',
    explanation:'6th = <b>sixth</b>.' }),

  makeTF({ id:'g3mth-ord-025', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_1_10',
    question:'In a row, the 1st position is at the front.',
    answer:true,
    explanation:'Yes — ordinal positions start at 1st (the front/beginning). True!' }),

  makeMCQ({ id:'g3mth-ord-026', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_1_10',
    question:'There are 6 doors in a corridor. You want the 4th door. You have passed 2 doors already. How many MORE doors do you pass to reach the 4th?',
    options:['1','2','3','4'], answer:'1',
    hint:'You are at position 2. You need position 4. Difference = ?',
    explanation:'You have passed 2 doors (2nd). You need the 4th. 4 − 2 − 1 = <b>1</b> more door to pass (the 3rd), then you arrive at the 4th.' }),

  makeMCQ({ id:'g3mth-ord-027', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'Which abbreviation is used for "second"?',
    options:['1st','2nd','3rd','4th'], answer:'2nd',
    hint:'Second = 2nd.',
    explanation:'<b>2nd</b> is the abbreviation for second.' }),

  makeMCQ({ id:'g3mth-ord-028', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_1_10',
    question:'A shelf has 7 books. The dictionary is 5th from the left. How many books are to the RIGHT of the dictionary?',
    options:['1','2','3','4'], answer:'2',
    hint:'7 total − 5th position = 2 books to the right.',
    explanation:'7 − 5 = <b>2</b> books to the right of the dictionary.' }),

  makeTF({ id:'g3mth-ord-029', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_1_10',
    question:'"10th" is the ordinal for "tenth".',
    answer:true,
    explanation:'Yes — tenth = 10th. Correct!' }),

  makeMCQ({ id:'g3mth-ord-030', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_1_10',
    question:'Five children stand in a row: Ali, Bea, Cal, Dan, Eve. Who is in the 3rd position?',
    options:['Ali','Bea','Cal','Dan'], answer:'Cal',
    hint:'1st: Ali, 2nd: Bea, 3rd: ?',
    explanation:'Ali = 1st, Bea = 2nd, <b>Cal</b> = 3rd.' }),

// ── ordinals_11_20 (031–060) ──────────────────────────────────────────────────

  makeMCQ({ id:'g3mth-ord-031', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'What is the ordinal word for 11th?',
    options:['tenth','eleventh','twelfth','thirteenth'], answer:'eleventh',
    hint:'11 → eleven → eleventh.',
    explanation:'11th = <b>eleventh</b>.' }),

  makeMCQ({ id:'g3mth-ord-032', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'What ordinal numeral represents "twelfth"?',
    options:['10th','11th','12th','13th'], answer:'12th',
    hint:'Twelfth = 12th.',
    explanation:'Twelfth is written as <b>12th</b>.' }),

  makeMCQ({ id:'g3mth-ord-033', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'Which ordinal word goes with 13th?',
    options:['twelfth','thirteenth','fourteenth','fifteenth'], answer:'thirteenth',
    hint:'13 → thirteenth.',
    explanation:'13th = <b>thirteenth</b>.' }),

  makeTF({ id:'g3mth-ord-034', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'The 14th position is called "fourteenth".',
    answer:true,
    explanation:'Yes — 14th = fourteenth. Correct!' }),

  makeMCQ({ id:'g3mth-ord-035', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'What is the ordinal word for the 15th position?',
    options:['fourteenth','fifteenth','sixteenth','seventeenth'], answer:'fifteenth',
    hint:'15 → fifteen → fifteenth.',
    explanation:'15th = <b>fifteenth</b>.' }),

  makeMCQ({ id:'g3mth-ord-036', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'How do you write "sixteenth" as a numeral?',
    options:['14th','15th','16th','17th'], answer:'16th',
    hint:'Sixteenth = 16th.',
    explanation:'Sixteenth is written as <b>16th</b>.' }),

  makeMCQ({ id:'g3mth-ord-037', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'What ordinal word is used for 17th?',
    options:['sixteenth','seventeenth','eighteenth','nineteenth'], answer:'seventeenth',
    hint:'17 → seventeen → seventeenth.',
    explanation:'17th = <b>seventeenth</b>.' }),

  makeMCQ({ id:'g3mth-ord-038', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'What is the ordinal numeral for "eighteenth"?',
    options:['16th','17th','18th','19th'], answer:'18th',
    hint:'Eighteenth = 18th.',
    explanation:'Eighteenth is written as <b>18th</b>.' }),

  makeMCQ({ id:'g3mth-ord-039', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'Which ordinal word is "19th"?',
    options:['eighteenth','nineteenth','twentieth','seventeenth'], answer:'nineteenth',
    hint:'19 → nineteen → nineteenth.',
    explanation:'19th = <b>nineteenth</b>.' }),

  makeMCQ({ id:'g3mth-ord-040', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'What is the ordinal word for 20th?',
    options:['nineteenth','twentieth','twenty-first','eighteenth'], answer:'twentieth',
    hint:'20 → twenty → twentieth.',
    explanation:'20th = <b>twentieth</b>.' }),

  makeTF({ id:'g3mth-ord-041', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'"12th" is the correct way to write "twelfth".',
    answer:true,
    explanation:'Yes — 12th = twelfth. Correct!' }),

  makeMCQ({ id:'g3mth-ord-042', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'A competition has 20 children. Ravi finished 15th. How many children finished BEFORE Ravi?',
    options:['13','14','15','16'], answer:'14',
    hint:'15th means 14 children are ahead of Ravi.',
    explanation:'If Ravi is 15th, then 14 children finished before him.' }),

  makeMCQ({ id:'g3mth-ord-043', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'A calendar has 20 days listed in order. What day of the month is the 11th?',
    options:['10','11','12','13'], answer:'11',
    hint:'The 11th ordinal position = the 11th day.',
    explanation:'The 11th position in the list = day <b>11</b> of the month.' }),

  makeMCQ({ id:'g3mth-ord-044', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'In a row of 20 desks, Sana sits at the 13th desk. How many desks are after hers?',
    options:['5','6','7','8'], answer:'7',
    hint:'20 − 13 = ?',
    explanation:'20 − 13 = <b>7</b> desks after Sana\'s desk.' }),

  makeTF({ id:'g3mth-ord-045', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'The ordinal word for 20th is "twentieth".',
    answer:true,
    explanation:'Yes — 20th = twentieth.' }),

  makeMCQ({ id:'g3mth-ord-046', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'Books are numbered 1–20. Which ordinal position is the book "Fifteen"?',
    options:['13th','14th','15th','16th'], answer:'15th',
    hint:'The 15th book is in the 15th position.',
    explanation:'Book number 15 is in the <b>15th</b> position.' }),

  makeMCQ({ id:'g3mth-ord-047', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'Which ordinal numeral comes between 16th and 18th?',
    options:['15th','17th','19th','20th'], answer:'17th',
    hint:'16th, ___, 18th.',
    explanation:'<b>17th</b> comes between 16th and 18th.' }),

  makeMCQ({ id:'g3mth-ord-048', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'In a class of 20 children, Priya is 12th. Rohan is 5 places after Priya. What position is Rohan?',
    options:['15th','16th','17th','18th'], answer:'17th',
    hint:'12 + 5 = ?',
    explanation:'12 + 5 = <b>17</b>th. Rohan is 17th.' }),

  makeMCQ({ id:'g3mth-ord-049', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'In a line of 20 people, the 19th person is second from the end. Who is last?',
    options:['18th','19th','20th','17th'], answer:'20th',
    hint:'Last in a line of 20 = 20th position.',
    explanation:'The last person in a line of 20 is in the <b>20th</b> position.' }),

  makeTF({ id:'g3mth-ord-050', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'16th comes before 17th in the ordinal sequence.',
    answer:true,
    explanation:'Yes — 16th, 17th, 18th… 16th comes before 17th.' }),

  makeMCQ({ id:'g3mth-ord-051', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'There are 20 houses on a street. Tom lives in the 14th house. How many houses are between Tom\'s house and the last house?',
    options:['4','5','6','7'], answer:'6',
    hint:'Between 14th and 20th: 15th, 16th, 17th, 18th, 19th — that\'s 5 houses between. But if asking houses between his and the end: 20 − 14 − 1 = 5.',
    explanation:'Houses after Tom\'s: positions 15, 16, 17, 18, 19, 20 — so <b>6</b> houses are between his and the end (positions 15–19 = 5 between, plus 20th = 6 after his). The question asks between 14th and end: positions 15,16,17,18,19 = 5 houses between. Correcting: 20 − 14 = 6 houses AFTER Tom\'s house.' }),

  makeMCQ({ id:'g3mth-ord-052', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'In a race, Asha was 11th and Maya was 18th. How many places BEHIND Maya was Asha compared to Maya?',
    options:['5','6','7','8'], answer:'7',
    hint:'Asha is AHEAD. Maya is 18 − 11 = 7 places behind Asha.',
    explanation:'Maya is 18 − 11 = <b>7</b> places behind Asha.' }),

  makeNum({ id:'g3mth-ord-053', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'A row has positions 1st to 20th. If you count from 13th to 20th (including both), how many positions is that?',
    answer:8, tolerance:0,
    hint:'20 − 13 + 1 = ?',
    explanation:'20 − 13 + 1 = <b>8</b> positions from 13th to 20th inclusive.' }),

  makeMCQ({ id:'g3mth-ord-054', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'In a list of 20 items, the 12th item is underlined. The 15th item is circled. How many items are between the underlined and circled item (not counting either)?',
    options:['1','2','3','4'], answer:'2',
    hint:'Items between 12th and 15th: 13th and 14th.',
    explanation:'Between 12th and 15th are: 13th and 14th — that is <b>2</b> items.' }),

  makeTF({ id:'g3mth-ord-055', chapterId:'g3mth-ordinals', difficulty:1, subsection:'ordinals_11_20',
    question:'"Eleventh" is the ordinal word for 11.',
    answer:true,
    explanation:'Yes — 11th = eleventh.' }),

  makeMCQ({ id:'g3mth-ord-056', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'Choose the correct ordinal to complete: "Jaya crossed the finish line in the _____ position with 16 runners behind her."',
    options:['3rd','4th','5th','6th'], answer:'4th',
    hint:'16 runners behind means she was in position (total − 16). We need to know total.',
    explanation:'If 16 runners are behind her and she is 4th, total = 4 + 16 = 20 runners. She finished <b>4th</b>.' }),

  makeMCQ({ id:'g3mth-ord-057', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'A library shelf holds books in positions 1st to 20th. The art books start at 16th. How many books are before the art books?',
    options:['13','14','15','16'], answer:'15',
    hint:'Books before 16th: positions 1–15.',
    explanation:'Positions 1 through 15 come before 16th — that is <b>15</b> books.' }),

  makeNum({ id:'g3mth-ord-058', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinals_11_20',
    question:'A train stops at 20 stations. If you board at the 8th station and get off at the 17th station, how many stations does the train stop at in between (not counting yours)?',
    answer:8, tolerance:0,
    hint:'Stations between 8th and 17th: 9th, 10th, 11th, 12th, 13th, 14th, 15th, 16th.',
    explanation:'Between 8th and 17th: stations 9, 10, 11, 12, 13, 14, 15, 16 = <b>8</b> stations.' }),

  makeMCQ({ id:'g3mth-ord-059', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'Nadia stands 20th in a queue. She moves forward 8 places. What position is she now?',
    options:['10th','11th','12th','13th'], answer:'12th',
    hint:'20 − 8 = ?',
    explanation:'20 − 8 = <b>12th</b> position.' }),

  makeMCQ({ id:'g3mth-ord-060', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinals_11_20',
    question:'Which of these is the correct ordinal word for 11th?',
    options:['tenteenth','eleven','eleventeenth','eleventh'], answer:'eleventh',
    hint:'11 → eleven → eleventh (no "teenth").',
    explanation:'11th = <b>eleventh</b>. The others are not real ordinal words.' }),

// ── ordinal_context (061–090) ─────────────────────────────────────────────────

  makeMCQ({ id:'g3mth-ord-061', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'January is the first month. December is the _____ month.',
    options:['tenth','eleventh','twelfth','twentieth'], answer:'twelfth',
    hint:'Count the months: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec.',
    explanation:'December is the <b>twelfth</b> (12th) month of the year.' }),

  makeMCQ({ id:'g3mth-ord-062', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'If Monday is the 1st day of the school week, what ordinal position is Friday?',
    options:['3rd','4th','5th','6th'], answer:'5th',
    hint:'Mon=1st, Tue=2nd, Wed=3rd, Thu=4th, Fri=?',
    explanation:'Friday is the <b>5th</b> day of the school week.' }),

  makeMCQ({ id:'g3mth-ord-063', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'Rajan is reading a book. He has finished 12 chapters and is about to start the next. What chapter is he about to read?',
    options:['11th','12th','13th','14th'], answer:'13th',
    hint:'Finished 12, so the NEXT one is 13.',
    explanation:'He is about to start chapter <b>13th</b> (thirteenth).' }),

  makeMCQ({ id:'g3mth-ord-064', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'A building has 15 floors. Mr Shah lives on the floor just below the topmost floor. Which floor does he live on?',
    options:['13th','14th','15th','16th'], answer:'14th',
    hint:'Top floor = 15th. Just below = 14th.',
    explanation:'The floor just below 15th is the <b>14th</b> floor.' }),

  makeMCQ({ id:'g3mth-ord-065', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'In a competition, 20 children took part. Mary was 7th. Tanya was exactly halfway. What position was Tanya?',
    options:['9th','10th','11th','12th'], answer:'10th',
    hint:'Halfway through 20 = position 10.',
    explanation:'Half of 20 = 10. Tanya was <b>10th</b>.' }),

  makeMCQ({ id:'g3mth-ord-066', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'A classroom has 5 rows of desks. The teacher asks the child in the 3rd row to stand up. That child is in the _____ row.',
    options:['first','second','third','fourth'], answer:'third',
    hint:'Row 3 = third row.',
    explanation:'The 3rd row is called the <b>third</b> row.' }),

  makeMCQ({ id:'g3mth-ord-067', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'A necklace has 20 beads. The 8th bead is blue. How many beads are there between the 1st bead and the blue bead (not counting either)?',
    options:['5','6','7','8'], answer:'6',
    hint:'Beads between 1st and 8th: 2nd, 3rd, 4th, 5th, 6th, 7th.',
    explanation:'Between the 1st and the 8th bead: 2nd, 3rd, 4th, 5th, 6th, 7th = <b>6</b> beads.' }),

  makeMCQ({ id:'g3mth-ord-068', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'Avi lines up 20 cars in a row. Every 5th car is red. How many red cars are there in total?',
    options:['3','4','5','6'], answer:'4',
    hint:'Which positions are multiples of 5? 5th, 10th, 15th, 20th.',
    explanation:'Cars at positions 5, 10, 15, 20 are red — that is <b>4</b> red cars.' }),

  makeMCQ({ id:'g3mth-ord-069', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'The months of the year are ordered 1st to 12th. July is the 7th month. Which month comes BEFORE July?',
    options:['May','June','August','September'], answer:'June',
    hint:'The 6th month comes before the 7th month.',
    explanation:'June is the 6th month — it comes just before July (7th).' }),

  makeMCQ({ id:'g3mth-ord-070', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'In a quiz, there are 20 questions. Sam answered all of them but got the 9th, 13th and 17th questions wrong. How many did he get RIGHT?',
    options:['15','16','17','18'], answer:'17',
    hint:'20 total − 3 wrong = ?',
    explanation:'20 − 3 wrong = <b>17</b> correct answers.' }),

  makeTF({ id:'g3mth-ord-071', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'In a queue of 10 children, the 5th child is in the middle.',
    answer:true,
    explanation:'In a queue of 10, position 5 is the middle — 4 before and 5 after (yes, we consider 5th as "half way", with positions 1–4 before and 6–10 after). True!' }),

  makeMCQ({ id:'g3mth-ord-072', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'A shop has shelves from 1st to 10th (bottom to top). Toys are on the 6th and 7th shelves. How many shelves are ABOVE the toys?',
    options:['1','2','3','4'], answer:'3',
    hint:'Shelves 8th, 9th, 10th are above the 7th shelf.',
    explanation:'Shelves above 7th: 8th, 9th, 10th = <b>3</b> shelves.' }),

  makeMCQ({ id:'g3mth-ord-073', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'Sports day had 20 events. Tom competed in the 4th, 8th and 12th events. Which event was he in LAST?',
    options:['8th','12th','16th','20th'], answer:'12th',
    hint:'His events were 4th, 8th, 12th. The last one is the highest number.',
    explanation:'Tom\'s last event was the <b>12th</b>.' }),

  makeMCQ({ id:'g3mth-ord-074', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'A fruit bowl has 10 pieces of fruit. The 3rd, 6th and 9th pieces are mangoes. Which of these is NOT a mango?',
    options:['3rd','5th','6th','9th'], answer:'5th',
    hint:'Mangoes are at 3rd, 6th and 9th. Is 5th one of those?',
    explanation:'5th is NOT a mango position — only 3rd, 6th and 9th are mangoes.' }),

  makeNum({ id:'g3mth-ord-075', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'A relay team has 4 runners. Runner 1 = 1st, Runner 2 = 2nd, etc. They pass the baton at positions 1st, 4th, 8th, and 12th in the race. How many places does Runner 2 run (between 4th and 8th positions)?',
    answer:4, tolerance:0,
    hint:'From 4th to 8th: 4, 5, 6, 7, 8 — count the steps.',
    explanation:'Runner 2 runs from position 4 to position 8 = <b>4</b> places (5th, 6th, 7th, 8th).' }),

  makeMCQ({ id:'g3mth-ord-076', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'The alphabet has 26 letters. "A" is the 1st letter. "E" is the 5th letter. What ordinal position is the letter "J"?',
    options:['8th','9th','10th','11th'], answer:'10th',
    hint:'A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, J=10.',
    explanation:'J is the <b>10th</b> letter of the alphabet.' }),

  makeMCQ({ id:'g3mth-ord-077', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'In a story, events happened in order. The 6th event was "it rained", the 9th was "sun came out", and the 12th was "rainbow appeared". How many events were between the rain and the rainbow?',
    options:['4','5','6','7'], answer:'5',
    hint:'Between 6th and 12th: 7th, 8th, 9th, 10th, 11th.',
    explanation:'Events between 6th and 12th: 7th, 8th, 9th, 10th, 11th = <b>5</b> events.' }),

  makeTF({ id:'g3mth-ord-078', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'The word "twentieth" is the correct ordinal form of 20.',
    answer:true,
    explanation:'Yes — 20th = twentieth. Correct!' }),

  makeMCQ({ id:'g3mth-ord-079', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'A recipe has 15 steps. Jo has finished the 9th step and skips directly to the 14th. How many steps did she skip?',
    options:['3','4','5','6'], answer:'4',
    hint:'Steps skipped: 10th, 11th, 12th, 13th (from after 9th to before 14th).',
    explanation:'She skips steps 10, 11, 12, 13 = <b>4</b> steps.' }),

  makeMCQ({ id:'g3mth-ord-080', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'In a spelling test, the 5th word was "friend" and every 5th word after that was also a tricky word (10th, 15th, 20th…). How many tricky words were there if the test had 20 words?',
    options:['3','4','5','6'], answer:'4',
    hint:'Tricky words at: 5th, 10th, 15th, 20th.',
    explanation:'At positions 5, 10, 15, 20 — that is <b>4</b> tricky words.' }),

  makeMCQ({ id:'g3mth-ord-081', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'In a reading challenge, students must read a book by the 20th day. If today is the 14th day, how many days remain?',
    options:['4','5','6','7'], answer:'6',
    hint:'20 − 14 = ?',
    explanation:'20 − 14 = <b>6</b> days remaining.' }),

  makeMCQ({ id:'g3mth-ord-082', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'May is the 5th month. September is the _____ month.',
    options:['7th','8th','9th','10th'], answer:'9th',
    hint:'Jan=1, Feb=2, Mar=3, Apr=4, May=5, Jun=6, Jul=7, Aug=8, Sep=9.',
    explanation:'September is the <b>9th</b> month.' }),

  makeNum({ id:'g3mth-ord-083', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'20 children entered a spelling competition. 4 were eliminated in each round. After round 1, how many children were still competing? (Remaining competitors still have their ordinal positions from 1st to N.)',
    answer:16, tolerance:0,
    hint:'20 − 4 = ?',
    explanation:'20 − 4 = <b>16</b> children still competing.' }),

  makeMCQ({ id:'g3mth-ord-084', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'A class recites a poem. They say word 1st, 2nd, 3rd… The 7th word is "sunshine". The 14th word is "happiness". How many words are between these two?',
    options:['4','5','6','7'], answer:'6',
    hint:'Between 7th and 14th: 8th, 9th, 10th, 11th, 12th, 13th.',
    explanation:'Words between 7th and 14th: 8, 9, 10, 11, 12, 13 = <b>6</b> words.' }),

  makeMCQ({ id:'g3mth-ord-085', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'Children sit in rows numbered 1st to 8th. Every other row (2nd, 4th, 6th, 8th) has windows. How many rows have windows?',
    options:['2','3','4','5'], answer:'4',
    hint:'Even-numbered rows: 2nd, 4th, 6th, 8th.',
    explanation:'Rows with windows: 2nd, 4th, 6th, 8th = <b>4</b> rows.' }),

  makeMCQ({ id:'g3mth-ord-086', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'A game has 20 levels. Asha has completed up to the 13th level. She wants to reach the 18th level next. How many more levels does she need to complete?',
    options:['3','4','5','6'], answer:'5',
    hint:'18 − 13 = ?',
    explanation:'18 − 13 = <b>5</b> more levels to complete.' }),

  makeTF({ id:'g3mth-ord-087', chapterId:'g3mth-ordinals', difficulty:2, subsection:'ordinal_context',
    question:'In a race with 15 runners, a runner in 15th place is last.',
    answer:true,
    explanation:'Yes — in a race with 15 runners, 15th is the last position. True!' }),

  makeMCQ({ id:'g3mth-ord-088', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'20 chairs are arranged in a row. Every 4th chair is painted blue. What ordinal positions are the blue chairs?',
    options:['2nd, 4th, 6th, 8th','4th, 8th, 12th, 16th, 20th','4th, 8th, 12th, 16th','3rd, 6th, 9th, 12th'],
    answer:'4th, 8th, 12th, 16th, 20th',
    hint:'Every 4th means positions: 4, 8, 12, 16, 20.',
    explanation:'Every 4th chair out of 20: positions <b>4th, 8th, 12th, 16th, 20th</b>.' }),

  makeNum({ id:'g3mth-ord-089', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'A number line has positions 1st to 20th. The 12th position is marked X and the 16th position is marked Y. How many positions are between X and Y (not counting X or Y)?',
    answer:3, tolerance:0,
    hint:'Between 12th and 16th: 13th, 14th, 15th.',
    explanation:'Positions 13, 14, 15 are between 12th and 16th — that is <b>3</b> positions.' }),

  makeMCQ({ id:'g3mth-ord-090', chapterId:'g3mth-ordinals', difficulty:3, subsection:'ordinal_context',
    question:'A train journey has 20 stops. Ana gets on at the 3rd stop and off at the 17th stop. How many stops does she travel through (including the stops where she gets on and off)?',
    options:['13','14','15','16'], answer:'15',
    hint:'Count from 3rd to 17th inclusive: 17 − 3 + 1 = ?',
    explanation:'17 − 3 + 1 = <b>15</b> stops.' })

);

})();
