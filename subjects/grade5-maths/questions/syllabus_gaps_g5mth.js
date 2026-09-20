'use strict';
// Grade 5 Maths - the six Grade 5 outcomes the pack was not asking.
//
// ⚠ WHY THIS FILE EXISTS. scripts/fact-ledgers/grade5-maths.json is built from the
//   Grade 5 table of the MIE Mathematics TLS (printed pages 13-15). Against 1 431
//   questions it reported six:
//     num-05  multiply by multiples of 10, 100 and 1 000
//     num-06  divide numbers by 10, 100 and 1 000
//     num-13  multiply and divide fractions by WHOLE NUMBERS
//     num-20  express a ratio as a fraction and vice versa
//     gra-02  DRAW pictograms
//     gra-04  DRAW bar charts
//
// ⚠ num-05 and num-06 may well have been covered by wordless computations the
//   ledger cannot see - "4 800 ÷ 100 = ?" contains no word at all. The questions
//   below therefore name the operation as well as performing it, which is what
//   the outcome asks ("divide numbers BY 10, 100 and 1 000") and what makes the
//   skill visible to a reader as well as to the harness.
//
// ⚠ gra-02 and gra-04 are PRODUCTION outcomes: a child cannot draw a chart into
//   a multiple-choice box. What can be asked - and what the PSAC paper does ask -
//   is every decision the drawing requires: how many symbols to draw for a given
//   key, what the key should be, how tall to draw a bar on a given scale. Each
//   question below is about an act of drawing, not about reading a finished chart.
//
// ⚠ No new subsections: multiplication, division, fraction_of, writing, pictogram
//   and bar_chart are all already declared in _manifest.js.
//
// IDs: g5m-syl-001 onwards.

STATIC_QUESTIONS.push(

  // ── Multiplying by multiples of 10, 100 and 1 000 ──────────────────────
  makeNum({ id:'g5m-syl-001', chapterId:'four_ops', subsection:'multiplication', difficulty:1,
    question:'Multiply 47 by 100.',
    answer:4700,
    hint:'Multiplying by 100 shifts every digit two places to the left.',
    explanation:'47 &times; 100 = <b>4 700</b>. Multiplying by 100 adds two zeros to a whole number.' }),

  makeNum({ id:'g5m-syl-002', chapterId:'four_ops', subsection:'multiplication', difficulty:2,
    question:'Multiply 236 by 1 000.',
    answer:236000,
    hint:'Multiplying by 1 000 shifts every digit three places to the left.',
    explanation:'236 &times; 1 000 = <b>236 000</b>. Each zero in the multiplier moves the digits one more place.' }),

  makeNum({ id:'g5m-syl-003', chapterId:'four_ops', subsection:'multiplication', difficulty:2,
    question:'Multiply 34 by 20. (20 is a multiple of 10.)',
    answer:680,
    hint:'Multiply by 2 first, then by 10.',
    explanation:'34 &times; 2 = 68, then 68 &times; 10 = <b>680</b>. To multiply by a multiple of 10, use the single digit first and then the zero.' }),

  makeNum({ id:'g5m-syl-004', chapterId:'four_ops', subsection:'multiplication', difficulty:3,
    question:'Multiply 125 by 400. (400 is a multiple of 100.)',
    answer:50000,
    hint:'125 × 4 first, then attach the two zeros.',
    explanation:'125 &times; 4 = 500, then &times; 100 gives <b>50 000</b>.' }),

  makeMCQ({ id:'g5m-syl-005', chapterId:'four_ops', subsection:'multiplication', difficulty:3,
    question:'What happens to a whole number when you multiply it by 1 000?',
    options:['Each digit moves three places left','Each digit moves three places right','Three is added to the number','The number is divided by three'], answer:'Each digit moves three places left',
    hint:'Try it with 6: 6 × 1 000 = 6 000.',
    explanation:'Multiplying by 1 000 moves <b>each digit three places to the left</b>, which for a whole number looks like adding three zeros.' }),

  // ── Dividing by 10, 100 and 1 000 ──────────────────────────────────────
  makeNum({ id:'g5m-syl-006', chapterId:'four_ops', subsection:'division', difficulty:1,
    question:'Divide 4 800 by 100.',
    answer:48,
    hint:'Dividing by 100 shifts every digit two places to the right.',
    explanation:'4 800 &divide; 100 = <b>48</b>. Dividing by 100 removes two zeros from a whole number that ends in them.' }),

  makeNum({ id:'g5m-syl-007', chapterId:'four_ops', subsection:'division', difficulty:2,
    question:'Divide 57 000 by 1 000.',
    answer:57,
    hint:'Dividing by 1 000 shifts every digit three places to the right.',
    explanation:'57 000 &divide; 1 000 = <b>57</b>.' }),

  makeNum({ id:'g5m-syl-008', chapterId:'four_ops', subsection:'division', difficulty:2,
    question:'Divide 920 by 10.',
    answer:92,
    hint:'Dividing by 10 shifts every digit one place to the right.',
    explanation:'920 &divide; 10 = <b>92</b>.' }),

  makeMCQ({ id:'g5m-syl-009', chapterId:'four_ops', subsection:'division', difficulty:3,
    question:'A number is divided by 100 and the answer is 36. What was the number?',
    options:['3 600','360','36 000','3.6'], answer:'3 600',
    hint:'Work backwards: multiply the answer by 100.',
    explanation:'36 &times; 100 = <b>3 600</b>. Dividing and multiplying by 100 undo each other.' }),

  makeMCQ({ id:'g5m-syl-010', chapterId:'four_ops', subsection:'division', difficulty:4,
    question:'A shop divides 24 000 seeds equally into packets of 1 000, then divides one packet into 10 small bags. How many seeds are in each small bag?',
    options:['100','24','1 000','240'], answer:'100',
    hint:'Do the two divisions one after the other.',
    explanation:'24 000 &divide; 1 000 = 24 packets of 1 000 seeds. Then 1 000 &divide; 10 = <b>100</b> seeds in each small bag.' }),

  // ── Multiplying and dividing fractions by whole numbers ────────────────
  makeMCQ({ id:'g5m-syl-011', chapterId:'fractions', subsection:'fraction_of', difficulty:2,
    question:'Multiply the fraction 2/7 by the whole number 3. (give your answer as a fraction)',
    options:['6/7','2/21','5/7','6/21'], answer:'6/7',
    hint:'To multiply a fraction by a whole number, multiply only the top number.',
    explanation:'Multiply the numerator by the <b>whole number</b> and leave the denominator: 2 &times; 3 = 6, so the answer is <b>6/7</b>.' }),

  makeMCQ({ id:'g5m-syl-012', chapterId:'fractions', subsection:'fraction_of', difficulty:2,
    question:'Work out: 1/4 &times; 5 (give your answer as a fraction)',
    options:['5/4','1/20','6/4','5/20'], answer:'5/4',
    hint:'Only the top number is multiplied by the whole number.',
    explanation:'1 &times; 5 = 5, so 1/4 &times; 5 = <b>5/4</b>, which is the same as 1 1/4.' }),

  makeMCQ({ id:'g5m-syl-013', chapterId:'fractions', subsection:'fraction_of', difficulty:3,
    question:'Divide the fraction 3/4 by the whole number 3. (give your answer as a fraction)',
    options:['1/4','9/4','3/12','4/3'], answer:'1/4',
    hint:'Dividing a fraction by a whole number makes it smaller.',
    explanation:'Dividing by a <b>whole number</b> multiplies the denominator: 3/4 &divide; 3 = 3/12 = <b>1/4</b>.' }),

  makeMCQ({ id:'g5m-syl-014', chapterId:'fractions', subsection:'fraction_of', difficulty:3,
    question:'Work out: 2/5 &divide; 4 (give your answer as a fraction)',
    options:['1/10','8/5','2/20','5/8'], answer:'1/10',
    hint:'Multiply the bottom number by the whole number, then simplify.',
    explanation:'2/5 &divide; 4 = 2/20, and 2/20 simplifies to <b>1/10</b>.' }),

  makeMCQ({ id:'g5m-syl-015', chapterId:'fractions', subsection:'fraction_of', difficulty:4,
    question:'A bottle holds 3/4 of a litre. Three bottles are poured into one jug. How much is in the jug?',
    options:['9/4 litres','3/12 litres','1/4 litre','3/4 litre'], answer:'9/4 litres',
    hint:'Three lots of 3/4 means multiplying the fraction by a whole number.',
    explanation:'3/4 &times; 3 = <b>9/4 litres</b>, which is 2 1/4 litres. Multiplying a fraction by a <b>whole number</b> makes it larger.' }),

  // ── Expressing a ratio as a fraction and back ─────────────────────────
  makeMCQ({ id:'g5m-syl-016', chapterId:'ratio', subsection:'writing', difficulty:2,
    question:'A class has 2 boys for every 3 girls. Written as a <b>fraction</b>, what part of the class are boys?',
    options:['2/5','2/3','3/5','3/2'], answer:'2/5',
    hint:'The ratio 2 : 3 means 5 children in every group.',
    explanation:'The <b>ratio</b> 2 : 3 makes 5 parts altogether, so boys are <b>2/5</b> of the class. A ratio compares two parts; a fraction compares a part with the whole.' }),

  makeMCQ({ id:'g5m-syl-017', chapterId:'ratio', subsection:'writing', difficulty:2,
    question:'Write the <b>ratio</b> 1 : 4 as a <b>fraction</b> of the whole.',
    options:['1/5','1/4','4/5','4/1'], answer:'1/5',
    hint:'Add the two parts of the ratio to find the whole.',
    explanation:'1 + 4 = 5 parts, so the first share is <b>1/5</b> of the whole.' }),

  makeMCQ({ id:'g5m-syl-018', chapterId:'ratio', subsection:'writing', difficulty:3,
    question:'In a bag, 3/8 of the marbles are red and the rest are blue. What is the <b>ratio</b> of red to blue?',
    options:['3 : 5','3 : 8','5 : 3','8 : 3'], answer:'3 : 5',
    hint:'If 3 parts out of 8 are red, how many parts are blue?',
    explanation:'3 parts are red and 8 &minus; 3 = 5 are blue, so the <b>ratio</b> is <b>3 : 5</b>. Turning a fraction back into a ratio means comparing the parts, not the whole.' }),

  makeMCQ({ id:'g5m-syl-019', chapterId:'ratio', subsection:'writing', difficulty:4,
    question:'A pupil says the <b>ratio</b> 2 : 3 is the same as the <b>fraction</b> 2/3 of the whole. Why is that wrong?',
    options:['2 : 3 means 2 out of 5','2 : 3 means 3 out of 2','A ratio is never a fraction','2/3 should be 3/2'], answer:'2 : 3 means 2 out of 5',
    hint:'Count how many parts there are altogether in the ratio.',
    explanation:'The ratio compares the two parts with <b>each other</b>; the fraction compares one part with the <b>whole</b>. With 2 : 3 the whole is 5, so the fraction is 2/5, not 2/3.' }),

  // ── Drawing a pictogram ────────────────────────────────────────────────
  makeNum({ id:'g5m-syl-020', chapterId:'graphs', subsection:'pictogram', difficulty:2,
    question:'You are going to <b>draw</b> a <b>pictogram</b> where 1 symbol stands for 5 books. How many symbols will you draw for 35 books?',
    answer:7,
    hint:'Divide the number of books by the value of one symbol.',
    explanation:'35 &divide; 5 = <b>7 symbols</b>. When you draw a pictogram, the key tells you how many symbols each amount needs.' }),

  makeNum({ id:'g5m-syl-021', chapterId:'graphs', subsection:'pictogram', difficulty:2,
    question:'In a <b>pictogram</b> you are about to <b>draw</b>, 1 symbol stands for 10 pupils. How many symbols will you draw for 60 pupils?',
    answer:6,
    hint:'How many tens are there in 60?',
    explanation:'60 &divide; 10 = <b>6 symbols</b>.' }),

  makeMCQ({ id:'g5m-syl-022', chapterId:'graphs', subsection:'pictogram', difficulty:3,
    question:'You must <b>draw</b> a <b>pictogram</b> for 45 mangoes and 1 symbol stands for 10 mangoes. What will you draw?',
    options:['Four symbols and a half symbol','Four symbols only','Five symbols only','Forty-five symbols'], answer:'Four symbols and a half symbol',
    hint:'45 is not a whole number of tens.',
    explanation:'45 &divide; 10 = 4.5, so you draw <b>four whole symbols and a half one</b>. Half symbols are how a pictogram shows a part.' }),

  makeMCQ({ id:'g5m-syl-023', chapterId:'graphs', subsection:'pictogram', difficulty:4,
    question:'You must <b>draw</b> a <b>pictogram</b> for a class that read 200, 250 and 300 books. Which key would be best?',
    options:['1 symbol = 50 books','1 symbol = 1 book','1 symbol = 5 books','1 symbol = 500 books'], answer:'1 symbol = 50 books',
    hint:'Too small a key means hundreds of symbols; too large a key means less than one.',
    explanation:'With <b>1 symbol = 50 books</b> the three rows need 4, 5 and 6 symbols &mdash; easy to draw and easy to compare. A key of 1 would need 300 symbols, and a key of 500 fewer than one each.' }),

  // ── Drawing a bar chart ────────────────────────────────────────────────
  makeNum({ id:'g5m-syl-024', chapterId:'graphs', subsection:'bar_chart', difficulty:2,
    question:'You are going to <b>draw</b> a <b>bar chart</b> where each square on the axis stands for 2 pupils. How many squares tall will the bar for 14 pupils be?',
    answer:7,
    hint:'Divide the value by what one square is worth.',
    explanation:'14 &divide; 2 = <b>7 squares</b>. The scale on the axis decides the height of every bar you draw.' }),

  makeNum({ id:'g5m-syl-025', chapterId:'graphs', subsection:'bar_chart', difficulty:3,
    question:'On a <b>bar chart</b> you are about to <b>draw</b>, each square stands for 5 marks. How many squares tall is the bar for 45 marks?',
    answer:9,
    hint:'How many fives make 45?',
    explanation:'45 &divide; 5 = <b>9 squares</b>.' }),

  makeMCQ({ id:'g5m-syl-026', chapterId:'graphs', subsection:'bar_chart', difficulty:3,
    question:'When you <b>draw</b> a <b>bar chart</b>, why must all the bars be the same width?',
    options:['So only their height is compared','So they use less paper','So they can touch each other','So they are easier to colour'], answer:'So only their height is compared',
    hint:'Ask what a wider bar would seem to say.',
    explanation:'Equal widths mean the eye compares <b>only the heights</b>. A wider bar would look bigger even when its value is the same.' }),

  makeMCQ({ id:'g5m-syl-027', chapterId:'graphs', subsection:'bar_chart', difficulty:4,
    question:'You must <b>draw</b> a <b>bar chart</b> of values 12, 18, 24 and 30 on paper with 8 squares of height. What scale should one square stand for?',
    options:['5','1','2','10'], answer:'5',
    hint:'Divide the largest value by the number of squares you have.',
    explanation:'The largest value is 30, and 30 &divide; 8 is just under 4, so <b>1 square = 5</b> fits (30 needs 6 squares). A scale of 1 would need 30 squares and would not fit.' }),

  makeMCQ({ id:'g5m-syl-028', chapterId:'graphs', subsection:'bar_chart', difficulty:4,
    question:'A pupil <b>draws</b> a <b>bar chart</b> but forgets to label the vertical axis. Why does that spoil it?',
    options:['Nobody can tell what the heights mean','The bars become the wrong width','The bars cannot be coloured','The chart becomes a pictogram'], answer:'Nobody can tell what the heights mean',
    hint:'Imagine a bar six squares tall with nothing written beside it.',
    explanation:'Without a labelled axis a bar six squares tall could mean 6, 60 or 600: <b>nobody can tell what the heights mean</b>. The scale and its label are part of the drawing.' })

);
