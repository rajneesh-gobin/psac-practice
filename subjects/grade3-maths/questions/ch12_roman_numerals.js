'use strict';
(function () {

// Grade 3 Maths — Roman Numerals  (g3mth-rom-001 … g3mth-rom-090)
// Source: MIE Maths Grade 3 Part 2 pp.33-40
// Three subsections: roman_1_10 · roman_11_20 · roman_convert

// Helper reference (not in code, for authoring):
// I=1  V=5  X=10
// IV=4  IX=9  XI=11  XII=12  XIII=13  XIV=14  XV=15  XVI=16  XVII=17  XVIII=18  XIX=19  XX=20

// ── roman_1_10 (001–030) ──────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3mth-rom-001', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'What is the Roman numeral for 1?',
    options:['I','V','X','II'], answer:'I',
    hint:'The simplest Roman numeral is a single stroke.',
    explanation:'<b>I</b> = 1 in Roman numerals.' }),

  makeMCQ({ id:'g3mth-rom-002', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'What is the Roman numeral for 5?',
    options:['I','V','X','VI'], answer:'V',
    hint:'V looks like a hand held up with 5 fingers.',
    explanation:'<b>V</b> = 5 in Roman numerals.' }),

  makeMCQ({ id:'g3mth-rom-003', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'What is the Roman numeral for 10?',
    options:['V','X','I','XI'], answer:'X',
    hint:'X is two crossed strokes, representing ten.',
    explanation:'<b>X</b> = 10 in Roman numerals.' }),

  makeMCQ({ id:'g3mth-rom-004', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'What number does <b>III</b> represent?',
    options:['1','2','3','4'], answer:'3',
    hint:'Three I symbols = three 1s added together.',
    explanation:'III = 1 + 1 + 1 = <b>3</b>.' }),

  makeMCQ({ id:'g3mth-rom-005', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'What is the Roman numeral for 4?',
    options:['IIII','IV','VI','IX'], answer:'IV',
    hint:'4 = 5 minus 1. Write I before V.',
    explanation:'<b>IV</b> = 4 in Roman numerals. I (1) placed before V (5) means 5 − 1 = 4.' }),

  makeMCQ({ id:'g3mth-rom-006', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'What number does <b>VI</b> represent?',
    options:['4','5','6','7'], answer:'6',
    hint:'V = 5. VI = 5 + 1.',
    explanation:'VI = V + I = 5 + 1 = <b>6</b>.' }),

  makeMCQ({ id:'g3mth-rom-007', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'What is the Roman numeral for 7?',
    options:['VI','VII','VIII','IX'], answer:'VII',
    hint:'V = 5. VII = 5 + 2.',
    explanation:'<b>VII</b> = V + II = 5 + 2 = 7.' }),

  makeMCQ({ id:'g3mth-rom-008', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'What number does <b>VIII</b> represent?',
    options:['6','7','8','9'], answer:'8',
    hint:'V = 5, III = 3. VIII = 5 + 3.',
    explanation:'VIII = V + III = 5 + 3 = <b>8</b>.' }),

  makeMCQ({ id:'g3mth-rom-009', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'What is the Roman numeral for 9?',
    options:['VIIII','VIII','IX','XI'], answer:'IX',
    hint:'9 = 10 minus 1. Write I before X.',
    explanation:'<b>IX</b> = 9. I (1) placed before X (10) means 10 − 1 = 9.' }),

  makeMCQ({ id:'g3mth-rom-010', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'What number does <b>II</b> represent?',
    options:['1','2','3','11'], answer:'2',
    hint:'Two I symbols = 1 + 1.',
    explanation:'II = 1 + 1 = <b>2</b>.' }),

  makeTF({ id:'g3mth-rom-011', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'IV is the correct Roman numeral for 4.',
    answer:true,
    explanation:'Yes — IV = 4 (5 − 1). It is the correct and standard form.' }),

  makeMCQ({ id:'g3mth-rom-012', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'Which Roman numeral represents the number 6?',
    options:['IV','V','VI','VII'], answer:'VI',
    hint:'6 = 5 + 1 = V + I.',
    explanation:'6 = V + I = <b>VI</b>.' }),

  makeTF({ id:'g3mth-rom-013', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'The Roman numeral X equals 10.',
    answer:true,
    explanation:'Yes — X = 10. Correct!' }),

  makeMCQ({ id:'g3mth-rom-014', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'A clock face shows Roman numerals. What time is shown if the hour hand points to VIII?',
    options:['6 o\'clock','7 o\'clock','8 o\'clock','9 o\'clock'], answer:'8 o\'clock',
    hint:'VIII = 8.',
    explanation:'VIII = 8, so the clock shows <b>8 o\'clock</b>.' }),

  makeMCQ({ id:'g3mth-rom-015', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'A clock shows IV on its face. What is this in standard numbers?',
    options:['3','4','5','6'], answer:'4',
    hint:'IV = 5 − 1 = 4.',
    explanation:'IV = <b>4</b> in standard numerals.' }),

  makeMCQ({ id:'g3mth-rom-016', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'Put these Roman numerals in order from smallest to largest: IX, II, VI, IV',
    options:['II, IV, VI, IX','IV, II, VI, IX','IX, VI, IV, II','II, VI, IV, IX'],
    answer:'II, IV, VI, IX',
    hint:'Convert each: IX=9, II=2, VI=6, IV=4. Order: 2, 4, 6, 9.',
    explanation:'II=2, IV=4, VI=6, IX=9. Smallest to largest: <b>II, IV, VI, IX</b>.' }),

  makeMCQ({ id:'g3mth-rom-017', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'Which letter is used to write Roman numerals for 1?',
    options:['I','V','X','L'], answer:'I',
    hint:'The letter "I" represents 1 in Roman numerals.',
    explanation:'<b>I</b> is the Roman numeral for 1.' }),

  makeMCQ({ id:'g3mth-rom-018', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'What is VII + II in Roman numerals?',
    options:['VIII','IX','X','XI'], answer:'IX',
    hint:'VII = 7. II = 2. 7 + 2 = 9 = ?',
    explanation:'VII + II = 7 + 2 = 9 = <b>IX</b>.' }),

  makeTF({ id:'g3mth-rom-019', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'III represents the number 3.',
    answer:true,
    explanation:'Yes — III = 1 + 1 + 1 = 3. Correct!' }),

  makeMCQ({ id:'g3mth-rom-020', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'A bookshelf has chapters marked in Roman numerals: I, II, III, IV, V. What chapter number is V?',
    options:['3','4','5','6'], answer:'5',
    hint:'V = 5.',
    explanation:'V = <b>5</b>. Chapter V is Chapter 5.' }),

  makeMCQ({ id:'g3mth-rom-021', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'Roman numeral VIII is greater than Roman numeral VI. True or False?',
    options:['True','False'], answer:'True',
    hint:'VIII = 8, VI = 6. Is 8 > 6?',
    explanation:'VIII = 8 and VI = 6. Yes, 8 > 6, so VIII is greater than VI. <b>True</b>.' }),

  makeMCQ({ id:'g3mth-rom-022', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'A game awards points using Roman numerals. You scored V in round 1 and III in round 2. What is your total score in standard numerals?',
    options:['5','6','7','8'], answer:'8',
    hint:'V = 5, III = 3. 5 + 3 = ?',
    explanation:'V + III = 5 + 3 = <b>8</b> points.' }),

  makeMCQ({ id:'g3mth-rom-023', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_1_10',
    question:'What is the Roman numeral for 8?',
    options:['VII','VIII','IX','VI'], answer:'VIII',
    hint:'8 = 5 + 3 = V + III.',
    explanation:'<b>VIII</b> = 5 + 3 = 8.' }),

  makeNum({ id:'g3mth-rom-024', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'What is the standard number for Roman numeral VII?',
    answer:7, tolerance:0,
    hint:'V = 5, II = 2. V + II = ?',
    explanation:'VII = 5 + 2 = <b>7</b>.' }),

  makeMCQ({ id:'g3mth-rom-025', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'On a clock, the hour hand is pointing at IX. What time is it?',
    options:['7 o\'clock','8 o\'clock','9 o\'clock','10 o\'clock'], answer:'9 o\'clock',
    hint:'IX = 9.',
    explanation:'IX = 9, so it is <b>9 o\'clock</b>.' }),

  makeTF({ id:'g3mth-rom-026', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'The Roman numeral for 9 is VIIII.',
    answer:false,
    explanation:'No — VIIII is not standard. The correct Roman numeral for 9 is IX (10 − 1). False!' }),

  makeMCQ({ id:'g3mth-rom-027', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'Which Roman numeral means "5 minus 1"?',
    options:['IV','VI','IX','XI'], answer:'IV',
    hint:'When a smaller numeral comes BEFORE a larger one, subtract.',
    explanation:'IV means I (1) before V (5) = 5 − 1 = 4. <b>IV</b> represents "5 minus 1".' }),

  makeMCQ({ id:'g3mth-rom-028', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'Which Roman numeral means "10 minus 1"?',
    options:['XI','IX','IV','VIII'], answer:'IX',
    hint:'I before X = 10 − 1 = 9.',
    explanation:'IX = I before X = 10 − 1 = 9. <b>IX</b> means "10 minus 1".' }),

  makeNum({ id:'g3mth-rom-029', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'What standard number equals Roman numeral VI?',
    answer:6, tolerance:0,
    hint:'V = 5, I = 1. V + I = ?',
    explanation:'VI = 5 + 1 = <b>6</b>.' }),

  makeMCQ({ id:'g3mth-rom-030', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_1_10',
    question:'A film is labelled "Chapter IV". Which chapter number is this?',
    options:['3','4','5','6'], answer:'4',
    hint:'IV = 5 − 1 = 4.',
    explanation:'Chapter IV = Chapter <b>4</b>.' }),

// ── roman_11_20 (031–060) ─────────────────────────────────────────────────────

  makeMCQ({ id:'g3mth-rom-031', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_11_20',
    question:'What is the Roman numeral for 11?',
    options:['IX','X','XI','XII'], answer:'XI',
    hint:'11 = 10 + 1 = X + I.',
    explanation:'<b>XI</b> = X + I = 10 + 1 = 11.' }),

  makeMCQ({ id:'g3mth-rom-032', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_11_20',
    question:'What number does <b>XII</b> represent?',
    options:['11','12','13','14'], answer:'12',
    hint:'XII = X + II = 10 + 2.',
    explanation:'XII = 10 + 2 = <b>12</b>.' }),

  makeMCQ({ id:'g3mth-rom-033', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_11_20',
    question:'What is the Roman numeral for 13?',
    options:['XII','XIII','XIV','IIX'], answer:'XIII',
    hint:'13 = 10 + 3 = X + III.',
    explanation:'<b>XIII</b> = X + III = 10 + 3 = 13.' }),

  makeMCQ({ id:'g3mth-rom-034', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_11_20',
    question:'What number does <b>XIV</b> represent?',
    options:['13','14','15','16'], answer:'14',
    hint:'XIV = X + IV = 10 + 4.',
    explanation:'XIV = 10 + 4 = <b>14</b>.' }),

  makeMCQ({ id:'g3mth-rom-035', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_11_20',
    question:'What is the Roman numeral for 15?',
    options:['XIV','XV','XVI','XVII'], answer:'XV',
    hint:'15 = 10 + 5 = X + V.',
    explanation:'<b>XV</b> = X + V = 10 + 5 = 15.' }),

  makeMCQ({ id:'g3mth-rom-036', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_11_20',
    question:'What number does <b>XVI</b> represent?',
    options:['15','16','17','18'], answer:'16',
    hint:'XVI = X + VI = 10 + 6.',
    explanation:'XVI = 10 + 6 = <b>16</b>.' }),

  makeMCQ({ id:'g3mth-rom-037', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_11_20',
    question:'What is the Roman numeral for 17?',
    options:['XVI','XVII','XVIII','XIX'], answer:'XVII',
    hint:'17 = 10 + 7 = X + VII.',
    explanation:'<b>XVII</b> = X + VII = 10 + 7 = 17.' }),

  makeMCQ({ id:'g3mth-rom-038', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_11_20',
    question:'What number does <b>XVIII</b> represent?',
    options:['16','17','18','19'], answer:'18',
    hint:'XVIII = X + VIII = 10 + 8.',
    explanation:'XVIII = 10 + 8 = <b>18</b>.' }),

  makeMCQ({ id:'g3mth-rom-039', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_11_20',
    question:'What is the Roman numeral for 19?',
    options:['XVIII','XIX','XX','XVIIII'], answer:'XIX',
    hint:'19 = 10 + 9 = X + IX.',
    explanation:'<b>XIX</b> = X + IX = 10 + 9 = 19.' }),

  makeMCQ({ id:'g3mth-rom-040', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_11_20',
    question:'What is the Roman numeral for 20?',
    options:['XIX','XX','XXI','XVIII'], answer:'XX',
    hint:'20 = 10 + 10 = X + X.',
    explanation:'<b>XX</b> = X + X = 10 + 10 = 20.' }),

  makeTF({ id:'g3mth-rom-041', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_11_20',
    question:'XX represents 20 in Roman numerals.',
    answer:true,
    explanation:'Yes — XX = X + X = 10 + 10 = 20. Correct!' }),

  makeTF({ id:'g3mth-rom-042', chapterId:'g3mth-roman', difficulty:1, subsection:'roman_11_20',
    question:'XV represents the number 16.',
    answer:false,
    explanation:'XV = X + V = 10 + 5 = 15, not 16. False!' }),

  makeMCQ({ id:'g3mth-rom-043', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'A clock face has Roman numerals. What number is XII on a clock?',
    options:['10','11','12','13'], answer:'12',
    hint:'XII = X + II = 10 + 2 = 12.',
    explanation:'XII on a clock face = <b>12</b>.' }),

  makeMCQ({ id:'g3mth-rom-044', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'Put these Roman numerals in order from smallest to largest: XIX, XI, XVI, XIV',
    options:['XI, XIV, XVI, XIX','XIX, XVI, XIV, XI','XI, XVI, XIV, XIX','XIV, XI, XVI, XIX'],
    answer:'XI, XIV, XVI, XIX',
    hint:'XI=11, XIV=14, XVI=16, XIX=19.',
    explanation:'XI=11, XIV=14, XVI=16, XIX=19. Correct order: <b>XI, XIV, XVI, XIX</b>.' }),

  makeMCQ({ id:'g3mth-rom-045', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'Which Roman numeral is greater: XVIII or XV?',
    options:['XVIII','XV','They are equal','Cannot tell'], answer:'XVIII',
    hint:'XVIII = 18, XV = 15. Which is larger?',
    explanation:'XVIII = 18 and XV = 15. 18 > 15, so <b>XVIII</b> is greater.' }),

  makeNum({ id:'g3mth-rom-046', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'What standard number equals Roman numeral XIV?',
    answer:14, tolerance:0,
    hint:'X = 10, IV = 4. X + IV = ?',
    explanation:'XIV = 10 + 4 = <b>14</b>.' }),

  makeNum({ id:'g3mth-rom-047', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'What standard number equals Roman numeral XIX?',
    answer:19, tolerance:0,
    hint:'X = 10, IX = 9. X + IX = ?',
    explanation:'XIX = 10 + 9 = <b>19</b>.' }),

  makeMCQ({ id:'g3mth-rom-048', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'A filmbook has chapters I through XX. Which chapter number is XIII?',
    options:['12','13','14','15'], answer:'13',
    hint:'XIII = X + III = 10 + 3.',
    explanation:'XIII = 13. This is chapter <b>13</b>.' }),

  makeTF({ id:'g3mth-rom-049', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'XVI is greater than XIII.',
    answer:true,
    explanation:'XVI = 16 and XIII = 13. 16 > 13. True!' }),

  makeMCQ({ id:'g3mth-rom-050', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'A building has floors labelled I to XX. What floor is XVII?',
    options:['15th','16th','17th','18th'], answer:'17th',
    hint:'XVII = 10 + 7 = 17.',
    explanation:'XVII = 17. This is the <b>17th</b> floor.' }),

  makeMCQ({ id:'g3mth-rom-051', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'Which of these equals 20 in Roman numerals?',
    options:['XIX','XX','XXI','XVIII'], answer:'XX',
    hint:'20 = 10 + 10 = X + X.',
    explanation:'<b>XX</b> = 20.' }),

  makeMCQ({ id:'g3mth-rom-052', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'What is XVIII − XII in standard numbers?',
    options:['4','5','6','7'], answer:'6',
    hint:'XVIII = 18, XII = 12. 18 − 12 = ?',
    explanation:'XVIII = 18 and XII = 12. 18 − 12 = <b>6</b>.' }),

  makeMCQ({ id:'g3mth-rom-053', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'What is XI + IV in Roman numerals?',
    options:['XIV','XV','XVI','XVII'], answer:'XV',
    hint:'XI = 11, IV = 4. 11 + 4 = 15 = ?',
    explanation:'XI + IV = 11 + 4 = 15 = <b>XV</b>.' }),

  makeNum({ id:'g3mth-rom-054', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'What standard number equals Roman numeral XVII?',
    answer:17, tolerance:0,
    hint:'X = 10, VII = 7. X + VII = ?',
    explanation:'XVII = 10 + 7 = <b>17</b>.' }),

  makeTF({ id:'g3mth-rom-055', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'XIII is the Roman numeral for 14.',
    answer:false,
    explanation:'XIII = X + III = 10 + 3 = 13, not 14. For 14 we write XIV. False!' }),

  makeMCQ({ id:'g3mth-rom-056', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'A history textbook has XX chapters. The last chapter is labelled with which Roman numeral?',
    options:['XIX','XX','XXX','XY'], answer:'XX',
    hint:'XX = 20.',
    explanation:'The 20th chapter is labelled <b>XX</b>.' }),

  makeMCQ({ id:'g3mth-rom-057', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'The Roman numeral for 16 is:',
    options:['XIV','XV','XVI','XVII'], answer:'XVI',
    hint:'16 = 10 + 6 = X + VI.',
    explanation:'<b>XVI</b> = 10 + 6 = 16.' }),

  makeNum({ id:'g3mth-rom-058', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'What standard number equals Roman numeral XX?',
    answer:20, tolerance:0,
    hint:'XX = X + X = 10 + 10.',
    explanation:'XX = 10 + 10 = <b>20</b>.' }),

  makeMCQ({ id:'g3mth-rom-059', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'Which of these is NOT a valid Roman numeral between XI and XX?',
    options:['XII','XV','IIIX','XIX'], answer:'IIIX',
    hint:'Roman numerals follow set rules — you can only place I before V or X (subtraction).',
    explanation:'<b>IIIX</b> is not a valid Roman numeral. The correct form for 8 is VIII, and you cannot write three I symbols before X.' }),

  makeMCQ({ id:'g3mth-rom-060', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_11_20',
    question:'List the Roman numerals in order: XII, XI, XIV, XIII',
    options:['XI, XII, XIII, XIV','XIV, XIII, XII, XI','XII, XI, XIV, XIII','XI, XIII, XII, XIV'],
    answer:'XI, XII, XIII, XIV',
    hint:'Convert: XI=11, XII=12, XIII=13, XIV=14.',
    explanation:'XI=11, XII=12, XIII=13, XIV=14. Order: <b>XI, XII, XIII, XIV</b>.' }),

// ── roman_convert (061–090) ───────────────────────────────────────────────────

  makeMCQ({ id:'g3mth-rom-061', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_convert',
    question:'Convert IX to a standard number.',
    options:['8','9','10','11'], answer:'9',
    hint:'IX = 10 − 1.',
    explanation:'IX = I before X = 10 − 1 = <b>9</b>.' }),

  makeMCQ({ id:'g3mth-rom-062', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_convert',
    question:'Convert 14 to a Roman numeral.',
    options:['XIIII','XIV','IVX','IXV'], answer:'XIV',
    hint:'14 = 10 + 4 = X + IV.',
    explanation:'14 = X + IV = <b>XIV</b>.' }),

  makeMCQ({ id:'g3mth-rom-063', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_convert',
    question:'Convert XVI to a standard number.',
    options:['14','15','16','17'], answer:'16',
    hint:'XVI = X + VI = 10 + 6.',
    explanation:'XVI = 10 + 6 = <b>16</b>.' }),

  makeMCQ({ id:'g3mth-rom-064', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_convert',
    question:'Convert 19 to a Roman numeral.',
    options:['XVIIII','XVII','XIX','XXI'], answer:'XIX',
    hint:'19 = 10 + 9 = X + IX.',
    explanation:'19 = X + IX = <b>XIX</b>.' }),

  makeMCQ({ id:'g3mth-rom-065', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_convert',
    question:'Which standard number is represented by XIV?',
    options:['12','13','14','15'], answer:'14',
    hint:'XIV = X + IV = 10 + 4.',
    explanation:'XIV = 10 + 4 = <b>14</b>.' }),

  makeNum({ id:'g3mth-rom-066', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_convert',
    question:'Convert XVIII to a standard number.',
    answer:18, tolerance:0,
    hint:'XVIII = X + VIII = 10 + 8.',
    explanation:'XVIII = 10 + 8 = <b>18</b>.' }),

  makeMCQ({ id:'g3mth-rom-067', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_convert',
    question:'Convert 11 to a Roman numeral.',
    options:['IX','X','XI','XII'], answer:'XI',
    hint:'11 = 10 + 1 = X + I.',
    explanation:'11 = X + I = <b>XI</b>.' }),

  makeNum({ id:'g3mth-rom-068', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_convert',
    question:'Convert XV to a standard number.',
    answer:15, tolerance:0,
    hint:'XV = X + V = 10 + 5.',
    explanation:'XV = 10 + 5 = <b>15</b>.' }),

  makeMCQ({ id:'g3mth-rom-069', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'Add XIII + IV. Write your answer as a Roman numeral.',
    options:['XVI','XVII','XVIII','XIX'], answer:'XVII',
    hint:'XIII = 13, IV = 4. 13 + 4 = 17 = ?',
    explanation:'13 + 4 = 17 = <b>XVII</b>.' }),

  makeMCQ({ id:'g3mth-rom-070', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'Subtract XV − VI. Write your answer as a Roman numeral.',
    options:['VIII','IX','X','XI'], answer:'IX',
    hint:'XV = 15, VI = 6. 15 − 6 = 9 = ?',
    explanation:'15 − 6 = 9 = <b>IX</b>.' }),

  makeMCQ({ id:'g3mth-rom-071', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'A book has XX chapters. You have read XII. How many chapters do you have left? Write as a Roman numeral.',
    options:['VII','VIII','IX','X'], answer:'VIII',
    hint:'XX − XII = 20 − 12 = 8 = ?',
    explanation:'20 − 12 = 8 = <b>VIII</b> chapters left.' }),

  makeMCQ({ id:'g3mth-rom-072', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'Which is the correct Roman numeral for 20?',
    options:['IXX','XIX','XX','XXX'], answer:'XX',
    hint:'20 = 10 + 10. What Roman symbols do we use for 10?',
    explanation:'20 = X + X = <b>XX</b>. IXX is not valid — subtraction of X from X is not used.' }),

  makeMCQ({ id:'g3mth-rom-073', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'Add XVII + III. Write your answer as a Roman numeral.',
    options:['XIX','XX','XXI','XXII'], answer:'XX',
    hint:'XVII = 17, III = 3. 17 + 3 = 20 = ?',
    explanation:'17 + 3 = 20 = <b>XX</b>.' }),

  makeMCQ({ id:'g3mth-rom-074', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'Which Roman numeral comes exactly between XIV and XVI?',
    options:['XIII','XIV','XV','XVII'], answer:'XV',
    hint:'XIV = 14, XVI = 16. What is between 14 and 16?',
    explanation:'15 is between 14 and 16. 15 = <b>XV</b>.' }),

  makeMCQ({ id:'g3mth-rom-075', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'What is XI + XI in Roman numerals?',
    options:['XXII','XX','XXIII','XIX'], answer:'XXII',
    hint:'XI = 11. 11 + 11 = 22 = XX + II.',
    explanation:'XI + XI = 11 + 11 = 22 = <b>XXII</b>.' }),

  makeMCQ({ id:'g3mth-rom-076', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_convert',
    question:'A clock shows III. What time is it?',
    options:['1 o\'clock','2 o\'clock','3 o\'clock','4 o\'clock'], answer:'3 o\'clock',
    hint:'III = 3.',
    explanation:'III = 3, so the clock shows <b>3 o\'clock</b>.' }),

  makeTF({ id:'g3mth-rom-077', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_convert',
    question:'XX is the Roman numeral for 20.',
    answer:true,
    explanation:'Yes — XX = X + X = 10 + 10 = 20. True!' }),

  makeMCQ({ id:'g3mth-rom-078', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'A game score shows XIV for Player A and XVII for Player B. Who scored MORE?',
    options:['Player A','Player B','Both the same','Cannot tell'], answer:'Player B',
    hint:'XIV = 14, XVII = 17. Which is greater?',
    explanation:'XIV = 14 and XVII = 17. 17 > 14, so <b>Player B</b> scored more.' }),

  makeMCQ({ id:'g3mth-rom-079', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'Convert XV + V to a Roman numeral.',
    options:['XIX','XX','XXI','XXII'], answer:'XX',
    hint:'XV = 15, V = 5. 15 + 5 = 20.',
    explanation:'XV + V = 15 + 5 = 20 = <b>XX</b>.' }),

  makeMCQ({ id:'g3mth-rom-080', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'What is XIX − XIV in standard numbers?',
    options:['3','4','5','6'], answer:'5',
    hint:'XIX = 19, XIV = 14. 19 − 14 = ?',
    explanation:'XIX = 19, XIV = 14. 19 − 14 = <b>5</b>.' }),

  makeNum({ id:'g3mth-rom-081', chapterId:'g3mth-roman', difficulty:2, subsection:'roman_convert',
    question:'Convert XIII to a standard number.',
    answer:13, tolerance:0,
    hint:'X = 10, III = 3. X + III = ?',
    explanation:'XIII = 10 + 3 = <b>13</b>.' }),

  makeMCQ({ id:'g3mth-rom-082', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'A shelf has books labelled I to XX. Meena picks the book labelled XVI. The next book she picks is the 3rd one after XVI. What is its label?',
    options:['XVIII','XIX','XX','XXI'], answer:'XIX',
    hint:'XVI = 16. Three after: 17, 18, 19.',
    explanation:'The 3rd book after XVI (16): 17=XVII, 18=XVIII, 19=XIX. The label is <b>XIX</b>.' }),

  makeMCQ({ id:'g3mth-rom-083', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'Which of these pairs is NOT a correct match?',
    options:['VIII = 8','XII = 12','XIV = 15','XX = 20'], answer:'XIV = 15',
    hint:'Check each: VIII=8 ✓, XII=12 ✓, XX=20 ✓. What is XIV really?',
    explanation:'XIV = 10 + 4 = 14, not 15. The incorrect pair is <b>XIV = 15</b>.' }),

  makeNum({ id:'g3mth-rom-084', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'Calculate: XI + VIII (write the answer as a standard number)',
    answer:19, tolerance:0,
    hint:'XI = 11, VIII = 8. 11 + 8 = ?',
    explanation:'XI + VIII = 11 + 8 = <b>19</b>.' }),

  makeMCQ({ id:'g3mth-rom-085', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'A team scored XVII points in Game 1 and IX points in Game 2. What is their total score in Roman numerals?',
    options:['XXIV','XXVI','XXVII','XXVIII'], answer:'XXVI',
    hint:'XVII = 17, IX = 9. 17 + 9 = 26.',
    explanation:'17 + 9 = 26 = <b>XXVI</b>.' }),

  makeMCQ({ id:'g3mth-rom-086', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'What is XX − IX in Roman numerals?',
    options:['IX','X','XI','XII'], answer:'XI',
    hint:'XX = 20, IX = 9. 20 − 9 = 11.',
    explanation:'20 − 9 = 11 = <b>XI</b>.' }),

  makeMCQ({ id:'g3mth-rom-087', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'Which Roman numeral is 5 MORE than XIII?',
    options:['XVII','XVIII','XVIIII','XVI'], answer:'XVIII',
    hint:'XIII = 13. 13 + 5 = 18 = ?',
    explanation:'XIII + V = 13 + 5 = 18 = <b>XVIII</b>.' }),

  makeMCQ({ id:'g3mth-rom-088', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'Order these from largest to smallest: IX, XV, XII, XX',
    options:['XX, XV, XII, IX','IX, XII, XV, XX','XX, XII, XV, IX','XV, XX, IX, XII'],
    answer:'XX, XV, XII, IX',
    hint:'Convert: IX=9, XV=15, XII=12, XX=20. Largest first.',
    explanation:'XX=20, XV=15, XII=12, IX=9. Largest to smallest: <b>XX, XV, XII, IX</b>.' }),

  makeNum({ id:'g3mth-rom-089', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'What standard number is 4 more than XVI?',
    answer:20, tolerance:0,
    hint:'XVI = 16. 16 + 4 = ?',
    explanation:'XVI = 16. 16 + 4 = <b>20</b>.' }),

  makeMCQ({ id:'g3mth-rom-090', chapterId:'g3mth-roman', difficulty:3, subsection:'roman_convert',
    question:'A Roman numeral clock has XII at the top. A child says the number at the "3 o\'clock" position is III. Is this correct?',
    options:['Yes, III = 3','No, it should be IV','No, it should be VI','No, it should be IX'],
    answer:'Yes, III = 3',
    hint:'On a clock, 3 o\'clock is at the right side, and the Roman numeral for 3 is III.',
    explanation:'III = 3, and on a standard clock, the "3 o\'clock" position does show III. The answer is <b>Yes, III = 3</b>.' })

);

})();
