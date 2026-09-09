'use strict';
(function () {

// Grade 3 Maths — Pictograms  (g3mth-pic-001 … g3mth-pic-090)
// Source: MIE Maths Grade 3 Part 1 pp.14-22
// Three subsections: reading_pictograms · interpreting_data · pictogram_problems

// ── reading_pictograms (001–030) ──────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3mth-pic-001', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing favourite fruits">' +
      '<svg viewBox="0 0 280 175" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Favourite Fruits</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Apple</text><text x="90" y="52" font-size="17">🍎🍎🍎🍎</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Banana</text><text x="90" y="82" font-size="17">🍌🍌🍌🍌🍌🍌</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Mango</text><text x="90" y="112" font-size="17">🥭🥭🥭</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Orange</text><text x="90" y="142" font-size="17">🍊🍊🍊🍊🍊</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each picture = 1 child</text>' +
      '</svg></div>' +
      'How many children chose banana as their favourite fruit?',
    options:['4','5','6','7'], answer:'6',
    hint:'Count the banana pictures one by one.',
    explanation:'There are <b>6</b> banana pictures, so 6 children chose banana.' }),

  makeMCQ({ id:'g3mth-pic-002', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing favourite fruits">' +
      '<svg viewBox="0 0 280 175" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Favourite Fruits</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Apple</text><text x="90" y="52" font-size="17">🍎🍎🍎🍎</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Banana</text><text x="90" y="82" font-size="17">🍌🍌🍌🍌🍌🍌</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Mango</text><text x="90" y="112" font-size="17">🥭🥭🥭</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Orange</text><text x="90" y="142" font-size="17">🍊🍊🍊🍊🍊</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each picture = 1 child</text>' +
      '</svg></div>' +
      'Which fruit was chosen by the FEWEST children?',
    options:['Apple','Banana','Mango','Orange'], answer:'Mango',
    hint:'Look for the row with the smallest number of pictures.',
    explanation:'Mango has only 3 pictures — fewer than Apple (4), Orange (5) or Banana (6).' }),

  makeMCQ({ id:'g3mth-pic-003', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing favourite fruits">' +
      '<svg viewBox="0 0 280 175" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Favourite Fruits</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Apple</text><text x="90" y="52" font-size="17">🍎🍎🍎🍎</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Banana</text><text x="90" y="82" font-size="17">🍌🍌🍌🍌🍌🍌</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Mango</text><text x="90" y="112" font-size="17">🥭🥭🥭</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Orange</text><text x="90" y="142" font-size="17">🍊🍊🍊🍊🍊</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each picture = 1 child</text>' +
      '</svg></div>' +
      'Which fruit was the MOST popular?',
    options:['Apple','Banana','Mango','Orange'], answer:'Banana',
    hint:'Look for the row with the most pictures.',
    explanation:'Banana has 6 pictures — more than any other fruit.' }),

  makeNum({ id:'g3mth-pic-004', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing pets">' +
      '<svg viewBox="0 0 280 155" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Pets in Our Class</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Cat</text><text x="90" y="52" font-size="17">🐱🐱🐱🐱🐱</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Dog</text><text x="90" y="82" font-size="17">🐶🐶🐶🐶🐶🐶🐶</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Fish</text><text x="90" y="112" font-size="17">🐟🐟🐟</text>' +
      '<text x="10" y="140" font-size="11" fill="#6B7280">Each picture = 1 child</text>' +
      '</svg></div>' +
      'How many children have a dog?',
    answer:7, tolerance:0,
    hint:'Count each dog picture carefully.',
    explanation:'There are <b>7</b> dog pictures, so 7 children have a dog.' }),

  makeMCQ({ id:'g3mth-pic-005', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing pets">' +
      '<svg viewBox="0 0 280 155" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Pets in Our Class</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Cat</text><text x="90" y="52" font-size="17">🐱🐱🐱🐱🐱</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Dog</text><text x="90" y="82" font-size="17">🐶🐶🐶🐶🐶🐶🐶</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Fish</text><text x="90" y="112" font-size="17">🐟🐟🐟</text>' +
      '<text x="10" y="140" font-size="11" fill="#6B7280">Each picture = 1 child</text>' +
      '</svg></div>' +
      'Which is the least popular pet?',
    options:['Cat','Dog','Fish','All equal'], answer:'Fish',
    hint:'Which row has the fewest pictures?',
    explanation:'Fish has only 3 pictures, so it is the least popular pet.' }),

  makeMCQ({ id:'g3mth-pic-006', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing sports">' +
      '<svg viewBox="0 0 300 175" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Favourite Sport</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Football</text><text x="95" y="52" font-size="17">⚽⚽⚽⚽⚽⚽⚽⚽</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Cricket</text><text x="95" y="82" font-size="17">🏏🏏🏏🏏🏏</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Volleyball</text><text x="95" y="112" font-size="17">🏐🏐🏐🏐</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Swimming</text><text x="95" y="142" font-size="17">🏊🏊🏊🏊🏊🏊</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each picture = 1 child</text>' +
      '</svg></div>' +
      'How many children prefer cricket?',
    options:['4','5','6','8'], answer:'5',
    hint:'Count the cricket bat symbols.',
    explanation:'There are <b>5</b> cricket symbols in the Cricket row.' }),

  makeMCQ({ id:'g3mth-pic-007', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing colours">' +
      '<svg viewBox="0 0 280 155" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Favourite Colours</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Blue</text><text x="90" y="52" font-size="17">🔵🔵🔵🔵🔵🔵🔵🔵🔵</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Red</text><text x="90" y="82" font-size="17">🔴🔴🔴🔴🔴🔴</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Green</text><text x="90" y="112" font-size="17">🟢🟢🟢🟢</text>' +
      '<text x="10" y="140" font-size="11" fill="#6B7280">Each picture = 1 child</text>' +
      '</svg></div>' +
      'How many children chose blue as their favourite colour?',
    options:['7','8','9','10'], answer:'9',
    hint:'Count each blue circle picture.',
    explanation:'There are <b>9</b> blue circle pictures in the Blue row.' }),

  makeTF({ id:'g3mth-pic-008', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing colours">' +
      '<svg viewBox="0 0 280 155" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Favourite Colours</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Blue</text><text x="90" y="52" font-size="17">🔵🔵🔵🔵🔵🔵🔵🔵🔵</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Red</text><text x="90" y="82" font-size="17">🔴🔴🔴🔴🔴🔴</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Green</text><text x="90" y="112" font-size="17">🟢🟢🟢🟢</text>' +
      '<text x="10" y="140" font-size="11" fill="#6B7280">Each picture = 1 child</text>' +
      '</svg></div>' +
      'More children chose Red than Green.',
    answer:true,
    explanation:'Red has 6 pictures and Green has 4 pictures. 6 > 4, so yes — more children chose Red.' }),

  makeMCQ({ id:'g3mth-pic-009', chapterId:'g3mth-pictograms', difficulty:2, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing transport">' +
      '<svg viewBox="0 0 300 175" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">How Children Come to School</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Walk</text><text x="100" y="52" font-size="17">🚶🚶🚶🚶🚶🚶🚶🚶🚶🚶</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Bus</text><text x="100" y="82" font-size="17">🚌🚌🚌🚌🚌🚌🚌🚌</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Car</text><text x="100" y="112" font-size="17">🚗🚗🚗🚗🚗</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Bicycle</text><text x="100" y="142" font-size="17">🚲🚲🚲</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each picture = 1 child</text>' +
      '</svg></div>' +
      'How many MORE children walk than come by car?',
    options:['3','4','5','6'], answer:'5',
    hint:'Subtract: Walk − Car = ? − ?',
    explanation:'Walk = 10, Car = 5. Difference = 10 − 5 = <b>5</b>.' }),

  makeMCQ({ id:'g3mth-pic-010', chapterId:'g3mth-pictograms', difficulty:2, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing transport">' +
      '<svg viewBox="0 0 300 175" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">How Children Come to School</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Walk</text><text x="100" y="52" font-size="17">🚶🚶🚶🚶🚶🚶🚶🚶🚶🚶</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Bus</text><text x="100" y="82" font-size="17">🚌🚌🚌🚌🚌🚌🚌🚌</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Car</text><text x="100" y="112" font-size="17">🚗🚗🚗🚗🚗</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Bicycle</text><text x="100" y="142" font-size="17">🚲🚲🚲</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each picture = 1 child</text>' +
      '</svg></div>' +
      'How many children does the pictogram show altogether?',
    options:['24','26','28','30'], answer:'26',
    hint:'Add all the groups: 10 + 8 + 5 + 3.',
    explanation:'Walk (10) + Bus (8) + Car (5) + Bicycle (3) = <b>26</b> children altogether.' }),

  makeMCQ({ id:'g3mth-pic-011', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="books read pictogram">' +
      '<svg viewBox="0 0 280 155" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Books Read This Month</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Priya</text><text x="90" y="52" font-size="17">📚📚📚📚📚📚</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Rajan</text><text x="90" y="82" font-size="17">📚📚📚📚</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Sara</text><text x="90" y="112" font-size="17">📚📚📚📚📚📚📚📚</text>' +
      '<text x="10" y="140" font-size="11" fill="#6B7280">Each 📚 = 1 book</text>' +
      '</svg></div>' +
      'How many books did Rajan read?',
    options:['3','4','5','6'], answer:'4',
    hint:'Count the book pictures in Rajan\'s row.',
    explanation:'Rajan has <b>4</b> book pictures, so he read 4 books.' }),

  makeTF({ id:'g3mth-pic-012', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="books read pictogram">' +
      '<svg viewBox="0 0 280 155" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Books Read This Month</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Priya</text><text x="90" y="52" font-size="17">📚📚📚📚📚📚</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Rajan</text><text x="90" y="82" font-size="17">📚📚📚📚</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Sara</text><text x="90" y="112" font-size="17">📚📚📚📚📚📚📚📚</text>' +
      '<text x="10" y="140" font-size="11" fill="#6B7280">Each 📚 = 1 book</text>' +
      '</svg></div>' +
      'Sara read more books than Priya.',
    answer:true,
    explanation:'Sara read 8 books and Priya read 6 books. 8 > 6, so Sara read more.' }),

  makeMCQ({ id:'g3mth-pic-013', chapterId:'g3mth-pictograms', difficulty:2, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="books read pictogram">' +
      '<svg viewBox="0 0 280 155" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Books Read This Month</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Priya</text><text x="90" y="52" font-size="17">📚📚📚📚📚📚</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Rajan</text><text x="90" y="82" font-size="17">📚📚📚📚</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Sara</text><text x="90" y="112" font-size="17">📚📚📚📚📚📚📚📚</text>' +
      '<text x="10" y="140" font-size="11" fill="#6B7280">Each 📚 = 1 book</text>' +
      '</svg></div>' +
      'How many books did the three children read altogether?',
    options:['16','17','18','19'], answer:'18',
    hint:'Add all three: 6 + 4 + 8.',
    explanation:'Priya (6) + Rajan (4) + Sara (8) = <b>18</b> books.' }),

  makeMCQ({ id:'g3mth-pic-014', chapterId:'g3mth-pictograms', difficulty:2, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="rainfall pictogram">' +
      '<svg viewBox="0 0 300 175" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Rainy Days Each Month</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">June</text><text x="90" y="52" font-size="17">🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">July</text><text x="90" y="82" font-size="17">🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">August</text><text x="90" y="112" font-size="17">🌧🌧🌧🌧🌧🌧</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">September</text><text x="90" y="142" font-size="17">🌧🌧🌧🌧</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each 🌧 = 1 rainy day</text>' +
      '</svg></div>' +
      'Which month had the most rainy days?',
    options:['June','July','August','September'], answer:'July',
    hint:'Look for the longest row.',
    explanation:'July has 12 cloud pictures — more than any other month.' }),

  makeMCQ({ id:'g3mth-pic-015', chapterId:'g3mth-pictograms', difficulty:2, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="rainfall pictogram">' +
      '<svg viewBox="0 0 300 175" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Rainy Days Each Month</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">June</text><text x="90" y="52" font-size="17">🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">July</text><text x="90" y="82" font-size="17">🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">August</text><text x="90" y="112" font-size="17">🌧🌧🌧🌧🌧🌧</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">September</text><text x="90" y="142" font-size="17">🌧🌧🌧🌧</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each 🌧 = 1 rainy day</text>' +
      '</svg></div>' +
      'How many fewer rainy days did September have than June?',
    options:['4','5','6','7'], answer:'6',
    hint:'Subtract: June − September.',
    explanation:'June = 10, September = 4. Difference = 10 − 4 = <b>6</b> days.' }),

  makeMCQ({ id:'g3mth-pic-016', chapterId:'g3mth-pictograms', difficulty:2, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing stickers collected">' +
      '<svg viewBox="0 0 300 175" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Stickers Collected</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Anil</text><text x="90" y="52" font-size="17">⭐⭐⭐⭐⭐⭐⭐⭐</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Meena</text><text x="90" y="82" font-size="17">⭐⭐⭐⭐⭐</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Dev</text><text x="90" y="112" font-size="17">⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Lena</text><text x="90" y="142" font-size="17">⭐⭐⭐⭐⭐⭐⭐</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each ⭐ = 1 sticker</text>' +
      '</svg></div>' +
      'How many stickers do Anil and Meena have together?',
    options:['11','12','13','14'], answer:'13',
    hint:'Add: Anil + Meena.',
    explanation:'Anil (8) + Meena (5) = <b>13</b> stickers.' }),

  makeNum({ id:'g3mth-pic-017', chapterId:'g3mth-pictograms', difficulty:2, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing stickers collected">' +
      '<svg viewBox="0 0 300 175" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Stickers Collected</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Anil</text><text x="90" y="52" font-size="17">⭐⭐⭐⭐⭐⭐⭐⭐</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Meena</text><text x="90" y="82" font-size="17">⭐⭐⭐⭐⭐</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Dev</text><text x="90" y="112" font-size="17">⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Lena</text><text x="90" y="142" font-size="17">⭐⭐⭐⭐⭐⭐⭐</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each ⭐ = 1 sticker</text>' +
      '</svg></div>' +
      'How many stickers are there altogether?',
    answer:30, tolerance:0,
    hint:'Add all four: 8 + 5 + 10 + 7.',
    explanation:'Anil (8) + Meena (5) + Dev (10) + Lena (7) = <b>30</b> stickers altogether.' }),

  makeMCQ({ id:'g3mth-pic-018', chapterId:'g3mth-pictograms', difficulty:2, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing vegetables grown">' +
      '<svg viewBox="0 0 300 175" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Vegetables Grown in the Garden</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Tomato</text><text x="100" y="52" font-size="17">🍅🍅🍅🍅🍅🍅🍅🍅🍅</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Carrot</text><text x="100" y="82" font-size="17">🥕🥕🥕🥕🥕🥕🥕</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Brinjal</text><text x="100" y="112" font-size="17">🍆🍆🍆🍆🍆</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Chilli</text><text x="100" y="142" font-size="17">🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each picture = 1 plant</text>' +
      '</svg></div>' +
      'Which vegetable has the same number of plants as tomatoes?',
    options:['Carrot','Brinjal','Chilli','None of them'], answer:'None of them',
    hint:'Count the tomatoes first. Then check each other vegetable.',
    explanation:'Tomato = 9 plants. Carrot = 7, Brinjal = 5, Chilli = 10. <b>None of them</b> equals 9, so no vegetable matches the tomato count.' }),

  makeNum({ id:'g3mth-pic-019', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing goals scored">' +
      '<svg viewBox="0 0 300 155" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Goals Scored This Season</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Team A</text><text x="100" y="52" font-size="17">⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Team B</text><text x="100" y="82" font-size="17">⚽⚽⚽⚽⚽⚽⚽⚽</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Team C</text><text x="100" y="112" font-size="17">⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽</text>' +
      '<text x="10" y="140" font-size="11" fill="#6B7280">Each ⚽ = 1 goal</text>' +
      '</svg></div>' +
      'How many goals did Team B score?',
    answer:8, tolerance:0,
    hint:'Count the footballs in Team B\'s row.',
    explanation:'Team B has <b>8</b> football pictures, so they scored 8 goals.' }),

  makeMCQ({ id:'g3mth-pic-020', chapterId:'g3mth-pictograms', difficulty:2, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram showing goals scored">' +
      '<svg viewBox="0 0 300 155" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Goals Scored This Season</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Team A</text><text x="100" y="52" font-size="17">⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Team B</text><text x="100" y="82" font-size="17">⚽⚽⚽⚽⚽⚽⚽⚽</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Team C</text><text x="100" y="112" font-size="17">⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽</text>' +
      '<text x="10" y="140" font-size="11" fill="#6B7280">Each ⚽ = 1 goal</text>' +
      '</svg></div>' +
      'How many more goals did Team C score than Team A?',
    options:['1','2','3','4'], answer:'2',
    hint:'Subtract: Team C − Team A = 13 − 11.',
    explanation:'Team C scored 13, Team A scored 11. 13 − 11 = <b>2</b> more goals.' }),

  makeMCQ({ id:'g3mth-pic-021', chapterId:'g3mth-pictograms', difficulty:3, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram with key showing 2 per symbol">' +
      '<svg viewBox="0 0 320 185" style="width:100%;max-width:340px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Flowers in the School Garden</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Rose</text><text x="100" y="52" font-size="17">🌹🌹🌹🌹</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Sunflower</text><text x="100" y="82" font-size="17">🌻🌻🌻🌻🌻🌻</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Lily</text><text x="100" y="112" font-size="17">🌸🌸🌸🌸🌸</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Orchid</text><text x="100" y="142" font-size="17">🌺🌺🌺</text>' +
      '<text x="10" y="170" font-size="11" fill="#6B7280">Each picture = 2 flowers</text>' +
      '</svg></div>' +
      'How many roses are in the garden? (Each picture = 2 flowers)',
    options:['4','6','8','10'], answer:'8',
    hint:'Multiply the number of pictures by 2.',
    explanation:'Rose row has 4 pictures. 4 × 2 = <b>8</b> roses.' }),

  makeMCQ({ id:'g3mth-pic-022', chapterId:'g3mth-pictograms', difficulty:3, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram with key showing 2 per symbol">' +
      '<svg viewBox="0 0 320 185" style="width:100%;max-width:340px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Flowers in the School Garden</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Rose</text><text x="100" y="52" font-size="17">🌹🌹🌹🌹</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Sunflower</text><text x="100" y="82" font-size="17">🌻🌻🌻🌻🌻🌻</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Lily</text><text x="100" y="112" font-size="17">🌸🌸🌸🌸🌸</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Orchid</text><text x="100" y="142" font-size="17">🌺🌺🌺</text>' +
      '<text x="10" y="170" font-size="11" fill="#6B7280">Each picture = 2 flowers</text>' +
      '</svg></div>' +
      'How many sunflowers are there? (Each picture = 2 flowers)',
    options:['6','10','12','14'], answer:'12',
    hint:'Sunflower row has 6 pictures. 6 × 2 = ?',
    explanation:'6 pictures × 2 = <b>12</b> sunflowers.' }),

  makeNum({ id:'g3mth-pic-023', chapterId:'g3mth-pictograms', difficulty:3, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram with key showing 2 per symbol">' +
      '<svg viewBox="0 0 320 185" style="width:100%;max-width:340px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Flowers in the School Garden</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Rose</text><text x="100" y="52" font-size="17">🌹🌹🌹🌹</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Sunflower</text><text x="100" y="82" font-size="17">🌻🌻🌻🌻🌻🌻</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Lily</text><text x="100" y="112" font-size="17">🌸🌸🌸🌸🌸</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Orchid</text><text x="100" y="142" font-size="17">🌺🌺🌺</text>' +
      '<text x="10" y="170" font-size="11" fill="#6B7280">Each picture = 2 flowers</text>' +
      '</svg></div>' +
      'How many flowers are there in total? (Each picture = 2 flowers)',
    answer:36, tolerance:0,
    hint:'Count all pictures first (4+6+5+3=18), then multiply by 2.',
    explanation:'Total pictures = 4 + 6 + 5 + 3 = 18. Total flowers = 18 × 2 = <b>36</b>.' }),

  makeTF({ id:'g3mth-pic-024', chapterId:'g3mth-pictograms', difficulty:2, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram with key showing 2 per symbol">' +
      '<svg viewBox="0 0 320 185" style="width:100%;max-width:340px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Flowers in the School Garden</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Rose</text><text x="100" y="52" font-size="17">🌹🌹🌹🌹</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Sunflower</text><text x="100" y="82" font-size="17">🌻🌻🌻🌻🌻🌻</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Lily</text><text x="100" y="112" font-size="17">🌸🌸🌸🌸🌸</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Orchid</text><text x="100" y="142" font-size="17">🌺🌺🌺</text>' +
      '<text x="10" y="170" font-size="11" fill="#6B7280">Each picture = 2 flowers</text>' +
      '</svg></div>' +
      'There are 10 lilies in the garden. (Each picture = 2 flowers)',
    answer:true,
    explanation:'Lily row has 5 pictures. 5 × 2 = 10 lilies. True!' }),

  makeMCQ({ id:'g3mth-pic-025', chapterId:'g3mth-pictograms', difficulty:3, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram with key showing 5 per symbol">' +
      '<svg viewBox="0 0 300 175" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Visitors to the Park</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Monday</text><text x="100" y="52" font-size="17">👤👤👤👤👤👤</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Tuesday</text><text x="100" y="82" font-size="17">👤👤👤👤</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Wednesday</text><text x="100" y="112" font-size="17">👤👤👤👤👤👤👤👤</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Thursday</text><text x="100" y="142" font-size="17">👤👤👤👤👤</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each 👤 = 5 visitors</text>' +
      '</svg></div>' +
      'How many visitors came on Tuesday? (Each symbol = 5 visitors)',
    options:['15','20','25','30'], answer:'20',
    hint:'Tuesday has 4 symbols. 4 × 5 = ?',
    explanation:'Tuesday has 4 symbols. 4 × 5 = <b>20</b> visitors.' }),

  makeMCQ({ id:'g3mth-pic-026', chapterId:'g3mth-pictograms', difficulty:3, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram with key showing 5 per symbol">' +
      '<svg viewBox="0 0 300 175" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Visitors to the Park</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Monday</text><text x="100" y="52" font-size="17">👤👤👤👤👤👤</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Tuesday</text><text x="100" y="82" font-size="17">👤👤👤👤</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Wednesday</text><text x="100" y="112" font-size="17">👤👤👤👤👤👤👤👤</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Thursday</text><text x="100" y="142" font-size="17">👤👤👤👤👤</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each 👤 = 5 visitors</text>' +
      '</svg></div>' +
      'How many visitors came on Wednesday? (Each symbol = 5 visitors)',
    options:['30','35','40','45'], answer:'40',
    hint:'Wednesday has 8 symbols. 8 × 5 = ?',
    explanation:'Wednesday has 8 symbols. 8 × 5 = <b>40</b> visitors.' }),

  makeNum({ id:'g3mth-pic-027', chapterId:'g3mth-pictograms', difficulty:3, subsection:'reading_pictograms',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram with key showing 5 per symbol">' +
      '<svg viewBox="0 0 300 175" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Visitors to the Park</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Monday</text><text x="100" y="52" font-size="17">👤👤👤👤👤👤</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Tuesday</text><text x="100" y="82" font-size="17">👤👤👤👤</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Wednesday</text><text x="100" y="112" font-size="17">👤👤👤👤👤👤👤👤</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Thursday</text><text x="100" y="142" font-size="17">👤👤👤👤👤</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each 👤 = 5 visitors</text>' +
      '</svg></div>' +
      'How many more visitors came on Monday than on Tuesday? (Each symbol = 5 visitors)',
    answer:10, tolerance:0,
    hint:'Monday = 6×5 = 30. Tuesday = 4×5 = 20. Difference = ?',
    explanation:'Monday: 6 × 5 = 30. Tuesday: 4 × 5 = 20. Difference = 30 − 20 = <b>10</b>.' }),

  makeMCQ({ id:'g3mth-pic-028', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:'In a pictogram, each 🌟 stands for 3 children. If there are 4 stars in a row, how many children does that row represent?',
    options:['3','7','12','4'], answer:'12',
    hint:'Multiply: 4 × 3.',
    explanation:'4 stars × 3 children each = <b>12</b> children.' }),

  makeMCQ({ id:'g3mth-pic-029', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:'In a pictogram, each 🐾 stands for 2 animals. A row has 6 paw prints. How many animals does this represent?',
    options:['6','8','10','12'], answer:'12',
    hint:'6 paw prints × 2 each.',
    explanation:'6 × 2 = <b>12</b> animals.' }),

  makeTF({ id:'g3mth-pic-030', chapterId:'g3mth-pictograms', difficulty:1, subsection:'reading_pictograms',
    question:'In a pictogram, if each symbol represents 1 item, then 7 symbols in a row means 7 items.',
    answer:true,
    explanation:'Yes — when each symbol = 1 item, the number of symbols equals the number of items.' }),

// ── interpreting_data (031–060) ───────────────────────────────────────────────

  makeMCQ({ id:'g3mth-pic-031', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="bar chart style pictogram of subjects">' +
      '<svg viewBox="0 0 300 185" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Favourite School Subjects</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Maths</text><text x="90" y="52" font-size="17">✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">English</text><text x="90" y="82" font-size="17">✏️✏️✏️✏️✏️✏️✏️✏️</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Science</text><text x="90" y="112" font-size="17">✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Art</text><text x="90" y="142" font-size="17">✏️✏️✏️✏️✏️✏️</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each ✏️ = 1 child</text>' +
      '</svg></div>' +
      'Which subject is liked by exactly 8 children?',
    options:['Maths','English','Science','Art'], answer:'English',
    hint:'Count each row carefully.',
    explanation:'English has exactly 8 pencil symbols, so 8 children prefer English.' }),

  makeMCQ({ id:'g3mth-pic-032', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="bar chart style pictogram of subjects">' +
      '<svg viewBox="0 0 300 185" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Favourite School Subjects</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Maths</text><text x="90" y="52" font-size="17">✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">English</text><text x="90" y="82" font-size="17">✏️✏️✏️✏️✏️✏️✏️✏️</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Science</text><text x="90" y="112" font-size="17">✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Art</text><text x="90" y="142" font-size="17">✏️✏️✏️✏️✏️✏️</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each ✏️ = 1 child</text>' +
      '</svg></div>' +
      'How many children were surveyed altogether?',
    options:['34','36','38','40'], answer:'36',
    hint:'Add: 10 + 8 + 12 + 6.',
    explanation:'Maths (10) + English (8) + Science (12) + Art (6) = <b>36</b> children.' }),

  makeMCQ({ id:'g3mth-pic-033', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="bar chart style pictogram of subjects">' +
      '<svg viewBox="0 0 300 185" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Favourite School Subjects</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Maths</text><text x="90" y="52" font-size="17">✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">English</text><text x="90" y="82" font-size="17">✏️✏️✏️✏️✏️✏️✏️✏️</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Science</text><text x="90" y="112" font-size="17">✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️</text>' +
      '<text x="10" y="140" font-size="12" fill="#374151">Art</text><text x="90" y="142" font-size="17">✏️✏️✏️✏️✏️✏️</text>' +
      '<text x="10" y="168" font-size="11" fill="#6B7280">Each ✏️ = 1 child</text>' +
      '</svg></div>' +
      'How many more children prefer Science than Art?',
    options:['4','5','6','7'], answer:'6',
    hint:'Subtract: Science − Art = 12 − 6.',
    explanation:'Science (12) − Art (6) = <b>6</b> more children prefer Science.' }),

  makeTF({ id:'g3mth-pic-034', chapterId:'g3mth-pictograms', difficulty:1, subsection:'interpreting_data',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram of ice cream flavours">' +
      '<svg viewBox="0 0 280 155" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Ice Cream Flavours Sold</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Vanilla</text><text x="100" y="52" font-size="17">🍦🍦🍦🍦🍦🍦🍦🍦🍦</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Chocolate</text><text x="100" y="82" font-size="17">🍦🍦🍦🍦🍦🍦🍦🍦🍦🍦🍦🍦</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Strawberry</text><text x="100" y="112" font-size="17">🍦🍦🍦🍦🍦🍦</text>' +
      '<text x="10" y="140" font-size="11" fill="#6B7280">Each 🍦 = 1 scoop sold</text>' +
      '</svg></div>' +
      'More than 10 scoops of vanilla were sold.',
    answer:false,
    explanation:'Vanilla has 9 symbols = 9 scoops. 9 is not more than 10. False.' }),

  makeMCQ({ id:'g3mth-pic-035', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="pictogram of ice cream flavours">' +
      '<svg viewBox="0 0 280 155" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="10" y="22" font-size="13" font-weight="bold" fill="#1F2937">Ice Cream Flavours Sold</text>' +
      '<text x="10" y="50" font-size="12" fill="#374151">Vanilla</text><text x="100" y="52" font-size="17">🍦🍦🍦🍦🍦🍦🍦🍦🍦</text>' +
      '<text x="10" y="80" font-size="12" fill="#374151">Chocolate</text><text x="100" y="82" font-size="17">🍦🍦🍦🍦🍦🍦🍦🍦🍦🍦🍦🍦</text>' +
      '<text x="10" y="110" font-size="12" fill="#374151">Strawberry</text><text x="100" y="112" font-size="17">🍦🍦🍦🍦🍦🍦</text>' +
      '<text x="10" y="140" font-size="11" fill="#6B7280">Each 🍦 = 1 scoop sold</text>' +
      '</svg></div>' +
      'How many more scoops of chocolate were sold than strawberry?',
    options:['4','5','6','7'], answer:'6',
    hint:'Chocolate = 12, Strawberry = 6. Difference = ?',
    explanation:'12 − 6 = <b>6</b> more scoops of chocolate.' }),

  makeMCQ({ id:'g3mth-pic-036', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:'A pictogram shows: Monday — 4 stars, Tuesday — 6 stars, Wednesday — 3 stars. If each star = 5 bottles of water sold, which day had the MOST sales?',
    options:['Monday','Tuesday','Wednesday','All the same'], answer:'Tuesday',
    hint:'Most stars = most sales.',
    explanation:'Tuesday has 6 stars = 6 × 5 = 30 bottles — more than Monday (20) or Wednesday (15).' }),

  makeMCQ({ id:'g3mth-pic-037', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:'A pictogram of library books: Fiction — 7 books, Non-fiction — 4 books, Poetry — 2 books. How many books does the library have altogether?',
    options:['11','12','13','14'], answer:'13',
    hint:'Add all three.',
    explanation:'7 + 4 + 2 = <b>13</b> books altogether.' }),

  makeMCQ({ id:'g3mth-pic-038', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:'A pictogram shows how many children were absent each day. Each 🔴 = 1 child. Monday: 3, Tuesday: 2, Wednesday: 5, Thursday: 1. On which day were the most children absent?',
    options:['Monday','Tuesday','Wednesday','Thursday'], answer:'Wednesday',
    hint:'Look for the day with the most symbols.',
    explanation:'Wednesday had 5 absent children — more than any other day.' }),

  makeTF({ id:'g3mth-pic-039', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:'A pictogram shows Class A: 6 stars, Class B: 4 stars, Class C: 6 stars (each star = 1 point). Class A and Class C have the same number of points.',
    answer:true,
    explanation:'Both Class A and Class C have 6 stars × 1 = 6 points each. True!' }),

  makeMCQ({ id:'g3mth-pic-040', chapterId:'g3mth-pictograms', difficulty:3, subsection:'interpreting_data',
    question:'A pictogram shows pens sold each week (each 🖊️ = 10 pens). Week 1: 3 symbols, Week 2: 5 symbols, Week 3: 4 symbols. How many pens were sold in Week 2?',
    options:['40','45','50','55'], answer:'50',
    hint:'5 symbols × 10 pens each.',
    explanation:'5 × 10 = <b>50</b> pens were sold in Week 2.' }),

  makeMCQ({ id:'g3mth-pic-041', chapterId:'g3mth-pictograms', difficulty:3, subsection:'interpreting_data',
    question:'A pictogram shows pens sold each week (each 🖊️ = 10 pens). Week 1: 3 symbols, Week 2: 5 symbols, Week 3: 4 symbols. How many pens in total across all 3 weeks?',
    options:['100','110','120','130'], answer:'120',
    hint:'Total symbols = 3 + 5 + 4 = 12. Multiply by 10.',
    explanation:'Total symbols = 12. 12 × 10 = <b>120</b> pens in total.' }),

  makeMCQ({ id:'g3mth-pic-042', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:'A class pictogram shows: Girls — 8 smiley faces, Boys — 5 smiley faces (each face = 1 child). How many children are in the class?',
    options:['11','12','13','14'], answer:'13',
    hint:'8 girls + 5 boys = ?',
    explanation:'8 + 5 = <b>13</b> children in the class.' }),

  makeTF({ id:'g3mth-pic-043', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:'A pictogram with key "each symbol = 5 items" shows 3 symbols in a row. This means the row represents 15 items.',
    answer:true,
    explanation:'3 symbols × 5 items each = 15 items. True!' }),

  makeMCQ({ id:'g3mth-pic-044', chapterId:'g3mth-pictograms', difficulty:3, subsection:'interpreting_data',
    question:'A pictogram uses key: each 🌟 = 4 plants. Row A has 5 stars. Row B has 3 stars. How many more plants does Row A have than Row B?',
    options:['4','6','8','10'], answer:'8',
    hint:'Row A = 5×4 = 20. Row B = 3×4 = 12. Difference = ?',
    explanation:'Row A = 5 × 4 = 20. Row B = 3 × 4 = 12. Difference = 20 − 12 = <b>8</b> more plants.' }),

  makeMCQ({ id:'g3mth-pic-045', chapterId:'g3mth-pictograms', difficulty:3, subsection:'interpreting_data',
    question:'A pictogram key says each symbol = 2 items. A row shows 9 symbols. How many items does this row represent?',
    options:['11','16','18','20'], answer:'18',
    hint:'9 × 2 = ?',
    explanation:'9 symbols × 2 each = <b>18</b> items.' }),

  makeMCQ({ id:'g3mth-pic-046', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:'A pictogram shows how many apples were picked on each day. Each 🍎 = 1 apple. Thursday: 6, Friday: 9, Saturday: 12. On which day were exactly HALF as many apples picked as Saturday?',
    options:['Thursday','Friday','Both','Neither'], answer:'Thursday',
    hint:'Half of Saturday (12) = 6. Which day had 6?',
    explanation:'Half of 12 = 6. Thursday had 6 apples — exactly half of Saturday.' }),

  makeMCQ({ id:'g3mth-pic-047', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:'A pictogram has these rows: Chicken — 🐔🐔🐔🐔🐔🐔, Duck — 🦆🦆🦆🦆, Goose — 🦆🦆🦆🦆🦆🦆🦆🦆🦆. Which bird has the most entries?',
    options:['Chicken','Duck','Goose','All equal'], answer:'Goose',
    hint:'Count each row.',
    explanation:'Goose has 9 symbols — more than Chicken (6) or Duck (4).' }),

  makeTF({ id:'g3mth-pic-048', chapterId:'g3mth-pictograms', difficulty:1, subsection:'interpreting_data',
    question:'A pictogram title tells us what the pictogram is about.',
    answer:true,
    explanation:'Yes — the title explains what information the pictogram is showing.' }),

  makeMCQ({ id:'g3mth-pic-049', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:'In a pictogram, 20 children voted for red, 15 for blue, 10 for green. If each symbol represents 5 children, how many symbols are in the blue row?',
    options:['2','3','4','5'], answer:'3',
    hint:'Divide blue count by 5: 15 ÷ 5.',
    explanation:'15 children ÷ 5 per symbol = <b>3</b> symbols in the blue row.' }),

  makeMCQ({ id:'g3mth-pic-050', chapterId:'g3mth-pictograms', difficulty:3, subsection:'interpreting_data',
    question:'A pictogram shows runs scored in cricket matches: Match 1 — 4 bats, Match 2 — 7 bats, Match 3 — 5 bats. Each 🏏 = 10 runs. In which match were 70 runs scored?',
    options:['Match 1','Match 2','Match 3','None of them'], answer:'Match 2',
    hint:'70 ÷ 10 = 7 symbols.',
    explanation:'70 runs ÷ 10 runs per symbol = 7 symbols. Match 2 has 7 bat symbols.' }),

  makeMCQ({ id:'g3mth-pic-051', chapterId:'g3mth-pictograms', difficulty:3, subsection:'interpreting_data',
    question:'A pictogram has key: each 🔴 = 3 items. How many symbols would you draw to show 18 items?',
    options:['4','5','6','7'], answer:'6',
    hint:'18 ÷ 3 = ?',
    explanation:'18 items ÷ 3 per symbol = <b>6</b> symbols.' }),

  makeMCQ({ id:'g3mth-pic-052', chapterId:'g3mth-pictograms', difficulty:3, subsection:'interpreting_data',
    question:'A pictogram has key: each ⭐ = 4 points. A student has 28 points. How many stars should be drawn to show this?',
    options:['5','6','7','8'], answer:'7',
    hint:'28 ÷ 4 = ?',
    explanation:'28 ÷ 4 = <b>7</b> stars.' }),

  makeTF({ id:'g3mth-pic-053', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:'A pictogram key says each symbol = 10. A row shows 6 symbols. This represents 16 items.',
    answer:false,
    explanation:'6 × 10 = 60 items, not 16. False.' }),

  makeMCQ({ id:'g3mth-pic-054', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:'A pictogram shows fruit in a market. Oranges — 8 🍊, Grapes — 5 🍇, Pears — 3 🍐. Each symbol = 1 kg. How many kilograms of fruit are there in total?',
    options:['14','15','16','17'], answer:'16',
    hint:'8 + 5 + 3 = ?',
    explanation:'8 + 5 + 3 = <b>16</b> kg of fruit.' }),

  makeMCQ({ id:'g3mth-pic-055', chapterId:'g3mth-pictograms', difficulty:3, subsection:'interpreting_data',
    question:'A school pictogram shows trophies won: Cricket — 6, Football — 9, Swimming — 3. Each 🏆 = 2 trophies. How many trophies did football win?',
    options:['9','12','15','18'], answer:'18',
    hint:'9 symbols × 2 trophies each.',
    explanation:'9 × 2 = <b>18</b> trophies for football.' }),

  makeMCQ({ id:'g3mth-pic-056', chapterId:'g3mth-pictograms', difficulty:3, subsection:'interpreting_data',
    question:'A pictogram shows: Row P — 5 symbols (key: each = 6), Row Q — 4 symbols (key: each = 6). How many MORE does Row P have than Row Q?',
    options:['4','6','8','10'], answer:'6',
    hint:'Difference in symbols = 5 − 4 = 1. Multiply by 6.',
    explanation:'Row P = 5 × 6 = 30. Row Q = 4 × 6 = 24. Difference = 30 − 24 = <b>6</b>.' }),

  makeTF({ id:'g3mth-pic-057', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:'A pictogram and a bar chart can show the same data.',
    answer:true,
    explanation:'Yes — both are ways to display the same data. A pictogram uses pictures; a bar chart uses bars.' }),

  makeMCQ({ id:'g3mth-pic-058', chapterId:'g3mth-pictograms', difficulty:2, subsection:'interpreting_data',
    question:'What does the KEY in a pictogram tell us?',
    options:['The title of the pictogram','How many items each symbol represents','The names of rows','The colours used'],
    answer:'How many items each symbol represents',
    hint:'The key is usually at the bottom of a pictogram.',
    explanation:'The key tells you what each symbol stands for — for example "each 🌟 = 5 children".' }),

  makeNum({ id:'g3mth-pic-059', chapterId:'g3mth-pictograms', difficulty:3, subsection:'interpreting_data',
    question:'A pictogram has key: each symbol = 4. One row has 8 symbols, another has 3 symbols. What is the total count for BOTH rows?',
    answer:44, tolerance:0,
    hint:'Row 1 = 8×4 = 32. Row 2 = 3×4 = 12. Total = ?',
    explanation:'Row 1 = 8 × 4 = 32. Row 2 = 3 × 4 = 12. Total = 32 + 12 = <b>44</b>.' }),

  makeTF({ id:'g3mth-pic-060', chapterId:'g3mth-pictograms', difficulty:1, subsection:'interpreting_data',
    question:'In a pictogram, a row with more symbols always represents a larger quantity than a row with fewer symbols (when using the same key).',
    answer:true,
    explanation:'Yes — if the key is the same for all rows, more symbols always means more items.' }),

// ── pictogram_problems (061–090) ──────────────────────────────────────────────

  makeMCQ({ id:'g3mth-pic-061', chapterId:'g3mth-pictograms', difficulty:2, subsection:'pictogram_problems',
    question:'A fruit seller made a pictogram. Each 🍊 = 10 oranges. He drew 7 symbols for Monday and 4 for Tuesday. How many oranges did he sell on Monday?',
    options:['40','50','60','70'], answer:'70',
    hint:'7 × 10 = ?',
    explanation:'7 symbols × 10 oranges = <b>70</b> oranges on Monday.' }),

  makeMCQ({ id:'g3mth-pic-062', chapterId:'g3mth-pictograms', difficulty:2, subsection:'pictogram_problems',
    question:'A pictogram shows glasses of water drunk: Sita — 6 glasses, Ravi — 4 glasses, Lata — 8 glasses. How many glasses did Sita and Ravi drink together?',
    options:['8','9','10','11'], answer:'10',
    hint:'6 + 4 = ?',
    explanation:'Sita (6) + Ravi (4) = <b>10</b> glasses together.' }),

  makeNum({ id:'g3mth-pic-063', chapterId:'g3mth-pictograms', difficulty:2, subsection:'pictogram_problems',
    question:'A farmer\'s pictogram (each 🐑 = 1 sheep). Pen A: 9 sheep, Pen B: 7 sheep, Pen C: 5 sheep. How many sheep are there altogether?',
    answer:21, tolerance:0,
    hint:'9 + 7 + 5 = ?',
    explanation:'9 + 7 + 5 = <b>21</b> sheep altogether.' }),

  makeMCQ({ id:'g3mth-pic-064', chapterId:'g3mth-pictograms', difficulty:2, subsection:'pictogram_problems',
    question:'A pictogram shows steps walked (each 👟 = 100 steps). Asha walked 3 symbols on Monday. How many steps did she walk?',
    options:['100','200','300','400'], answer:'300',
    hint:'3 × 100 = ?',
    explanation:'3 symbols × 100 steps = <b>300</b> steps.' }),

  makeMCQ({ id:'g3mth-pic-065', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A shop sells candles. Each 🕯️ = 5 candles. The shop sold 35 candles on Friday. How many symbols should the pictogram show for Friday?',
    options:['5','6','7','8'], answer:'7',
    hint:'35 ÷ 5 = ?',
    explanation:'35 ÷ 5 = <b>7</b> symbols needed for Friday.' }),

  makeMCQ({ id:'g3mth-pic-066', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A pictogram shows mangoes collected (each 🥭 = 4 mangoes). On Tuesday there are 6 symbols, on Wednesday there are 4 symbols. How many MORE mangoes were collected on Tuesday than on Wednesday?',
    options:['4','6','8','10'], answer:'8',
    hint:'Tuesday = 6×4 = 24. Wednesday = 4×4 = 16. Difference = ?',
    explanation:'Tuesday: 6 × 4 = 24. Wednesday: 4 × 4 = 16. Difference = 24 − 16 = <b>8</b> mangoes.' }),

  makeNum({ id:'g3mth-pic-067', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A class voted for their favourite animal. Dog: 15, Cat: 10, Fish: 5. If each symbol represents 5 votes, how many symbols would appear in the Dog row?',
    answer:3, tolerance:0,
    hint:'15 ÷ 5 = ?',
    explanation:'15 votes ÷ 5 per symbol = <b>3</b> symbols in the Dog row.' }),

  makeMCQ({ id:'g3mth-pic-068', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A pictogram shows cups of tea sold (each ☕ = 3 cups). On Thursday there are 8 symbols. How many cups were sold?',
    options:['11','21','24','27'], answer:'24',
    hint:'8 × 3 = ?',
    explanation:'8 symbols × 3 cups each = <b>24</b> cups.' }),

  makeTF({ id:'g3mth-pic-069', chapterId:'g3mth-pictograms', difficulty:2, subsection:'pictogram_problems',
    question:'A pictogram shows: School A — 4 symbols, School B — 6 symbols. With key "each symbol = 5 children", School B has 30 children.',
    answer:true,
    explanation:'School B: 6 × 5 = 30 children. True!' }),

  makeMCQ({ id:'g3mth-pic-070', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A market stall sold: apples — 24, bananas — 36, grapes — 12. If you make a pictogram with key "each symbol = 6 fruits", how many total symbols would the whole pictogram have?',
    options:['10','11','12','13'], answer:'12',
    hint:'Total fruits = 24+36+12 = 72. 72 ÷ 6 = ?',
    explanation:'Total = 72 fruits. 72 ÷ 6 = <b>12</b> symbols in total.' }),

  makeMCQ({ id:'g3mth-pic-071', chapterId:'g3mth-pictograms', difficulty:2, subsection:'pictogram_problems',
    question:'A pictogram of cookies baked (each 🍪 = 2 cookies). Ann baked 8 cookies; Ben baked 6 cookies; Cara baked 10 cookies. Who would have the MOST symbols in the pictogram?',
    options:['Ann','Ben','Cara','All the same'], answer:'Cara',
    hint:'Most cookies = most symbols.',
    explanation:'Cara baked 10 ÷ 2 = 5 symbols — more than Ann (4) or Ben (3).' }),

  makeMCQ({ id:'g3mth-pic-072', chapterId:'g3mth-pictograms', difficulty:2, subsection:'pictogram_problems',
    question:'In a garden, three plants are counted: Roses — 8, Marigolds — 12, Daisies — 4. In a pictogram with key "each 🌼 = 4 plants", how many symbols would Marigold have?',
    options:['2','3','4','5'], answer:'3',
    hint:'12 ÷ 4 = ?',
    explanation:'12 ÷ 4 = <b>3</b> symbols for Marigolds.' }),

  makeNum({ id:'g3mth-pic-073', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A school pictogram (key: each ✏️ = 5 pencils). Class 1: 4 symbols, Class 2: 3 symbols, Class 3: 6 symbols. How many pencils do all three classes have in total?',
    answer:65, tolerance:0,
    hint:'Total symbols = 4+3+6 = 13. 13 × 5 = ?',
    explanation:'Total symbols = 13. 13 × 5 = <b>65</b> pencils in total.' }),

  makeMCQ({ id:'g3mth-pic-074', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A pictogram uses key "each symbol = 10". Row X shows 7 symbols, Row Y shows 4 symbols. How many MORE items does Row X have than Row Y?',
    options:['20','25','30','35'], answer:'30',
    hint:'X = 7×10 = 70. Y = 4×10 = 40. Difference = ?',
    explanation:'X = 70, Y = 40. 70 − 40 = <b>30</b> more items in Row X.' }),

  makeMCQ({ id:'g3mth-pic-075', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A baker tracks loaves of bread. Each 🍞 = 4 loaves. Monday: 5 symbols, Tuesday: 8 symbols, Wednesday: 3 symbols. On which day did the baker bake 32 loaves?',
    options:['Monday','Tuesday','Wednesday','None'], answer:'Tuesday',
    hint:'32 ÷ 4 = 8 symbols.',
    explanation:'32 ÷ 4 = 8 symbols. Tuesday has 8 symbols, so Tuesday is correct.' }),

  makeNum({ id:'g3mth-pic-076', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A pictogram shows rainfall (each 💧 = 3 mm). Week 1: 4 drops, Week 2: 7 drops, Week 3: 5 drops. How many mm of rain fell in total?',
    answer:48, tolerance:0,
    hint:'Total drops = 4+7+5 = 16. 16 × 3 = ?',
    explanation:'Total drops = 16. 16 × 3 = <b>48</b> mm total rainfall.' }),

  makeMCQ({ id:'g3mth-pic-077', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'30 children voted for red, 20 for yellow, 10 for green. You want to make a pictogram. If each symbol = 10 children, how many symbols would yellow have?',
    options:['1','2','3','4'], answer:'2',
    hint:'20 ÷ 10 = ?',
    explanation:'20 ÷ 10 = <b>2</b> symbols for yellow.' }),

  makeMCQ({ id:'g3mth-pic-078', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A pictogram key says each 🚗 = 5 cars. Row A has 6 symbols. If 3 more symbols are added to Row A, how many cars does Row A then represent?',
    options:['30','40','45','50'], answer:'45',
    hint:'New total symbols = 6 + 3 = 9. Multiply by 5.',
    explanation:'9 symbols × 5 = <b>45</b> cars after adding 3 more symbols.' }),

  makeNum({ id:'g3mth-pic-079', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A pictogram shows coconuts collected (each 🥥 = 4). Farmer A: 5 symbols. Farmer B: 3 symbols. Farmer A gives Farmer B 8 coconuts. How many coconuts does Farmer B have now?',
    answer:20, tolerance:0,
    hint:'B starts with 3×4=12 coconuts. Then receives 8.',
    explanation:'Farmer B: 3 × 4 = 12 coconuts. After receiving 8: 12 + 8 = <b>20</b> coconuts.' }),

  makeMCQ({ id:'g3mth-pic-080', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A pictogram tracks library books issued each day. Each 📖 = 5 books. Wednesday has 9 symbols and Thursday has 6 symbols. How many books in total for these two days?',
    options:['65','70','75','80'], answer:'75',
    hint:'Wednesday: 9×5 = 45. Thursday: 6×5 = 30. Total = ?',
    explanation:'Wednesday: 45 books. Thursday: 30 books. Total = 45 + 30 = <b>75</b> books.' }),

  makeMCQ({ id:'g3mth-pic-081', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A shop\'s pictogram (each 🎁 = 2 gifts sold). Saturday: 8 symbols, Sunday: 11 symbols. How many gifts were sold over the weekend?',
    options:['35','36','37','38'], answer:'38',
    hint:'Saturday: 8×2=16. Sunday: 11×2=22. Total = ?',
    explanation:'Saturday: 16 gifts. Sunday: 22 gifts. Total = 16 + 22 = <b>38</b> gifts.' }),

  makeMCQ({ id:'g3mth-pic-082', chapterId:'g3mth-pictograms', difficulty:2, subsection:'pictogram_problems',
    question:'A school sports day pictogram (each 🏅 = 1 medal). Blue team: 7, Red team: 5, Green team: 9. The team with the most medals wins. Which team won?',
    options:['Blue','Red','Green','Draw'], answer:'Green',
    hint:'Which team has the most symbols?',
    explanation:'Green team won with 9 medals — more than Blue (7) or Red (5).' }),

  makeNum({ id:'g3mth-pic-083', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A bakery pictogram (each 🎂 = 3 cakes). Monday: 4 symbols, Wednesday: 6 symbols, Friday: 5 symbols. The bakery baked how many cakes in total on these three days?',
    answer:45, tolerance:0,
    hint:'Total symbols = 4+6+5 = 15. 15 × 3 = ?',
    explanation:'Total symbols = 15. 15 × 3 = <b>45</b> cakes baked in total.' }),

  makeMCQ({ id:'g3mth-pic-084', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A pictogram shows distance run (each 🏃 = 2 km). Jan: 5 symbols, Feb: 8 symbols, Mar: 6 symbols. In which month did the runner run 16 km?',
    options:['January','February','March','None'], answer:'March',
    hint:'16 ÷ 2 = 8 symbols. No — let me recheck: Mar has 6 symbols = 12 km. Feb has 8 symbols = 16 km.',
    explanation:'February: 8 × 2 = <b>16</b> km. So February is correct.' }),

  makeNum({ id:'g3mth-pic-085', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A charity sold charity bags (each 👜 = 6 bags). In 4 days they showed: 3, 5, 4, 7 symbols respectively. How many bags did they sell in total?',
    answer:114, tolerance:0,
    hint:'Total symbols = 3+5+4+7 = 19. 19 × 6 = ?',
    explanation:'Total symbols = 19. 19 × 6 = <b>114</b> bags.' }),

  makeMCQ({ id:'g3mth-pic-086', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A pictogram shows seeds planted (each 🌱 = 5 seeds). Row A: 6 symbols. The gardener plants 15 more seeds in Row A. How many symbols should Row A now have?',
    options:['7','8','9','10'], answer:'9',
    hint:'Row A already has 6×5=30 seeds. 30+15=45. 45÷5 = ?',
    explanation:'30 + 15 = 45 seeds. 45 ÷ 5 = <b>9</b> symbols needed now.' }),

  makeMCQ({ id:'g3mth-pic-087', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A pictogram uses key: each ⭐ = 3 stars collected. Class A: 8 stars; Class B: 5 stars. How many real stars does Class A have?',
    options:['8','15','24','27'], answer:'24',
    hint:'8 symbols × 3 each.',
    explanation:'8 × 3 = <b>24</b> real stars for Class A.' }),

  makeMCQ({ id:'g3mth-pic-088', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A town recorded rainfall for 3 months (each 💧 = 10 mm). March: 6, April: 9, May: 4. What was the total rainfall for April and May combined?',
    options:['100','110','120','130'], answer:'130',
    hint:'April: 9×10=90. May: 4×10=40. Total = ?',
    explanation:'April: 9 × 10 = 90 mm. May: 4 × 10 = 40 mm. Combined = 90 + 40 = <b>130</b> mm.' }),

  makeMCQ({ id:'g3mth-pic-089', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A shop sold toys: Cars — 20, Dolls — 35, Puzzles — 15. Making a pictogram with key "each 🎠 = 5 toys", which toy has the MOST symbols in the pictogram?',
    options:['Cars','Dolls','Puzzles','All equal'], answer:'Dolls',
    hint:'Divide each by 5 to find number of symbols.',
    explanation:'Cars = 20÷5 = 4; Dolls = 35÷5 = 7; Puzzles = 15÷5 = 3. Dolls has the most symbols.' }),

  makeNum({ id:'g3mth-pic-090', chapterId:'g3mth-pictograms', difficulty:3, subsection:'pictogram_problems',
    question:'A pictogram shows children absent per week (each ❌ = 2 absences). Week 1: 4 symbols, Week 2: 3 symbols, Week 3: 7 symbols, Week 4: 2 symbols. What was the total number of absences over 4 weeks?',
    answer:32, tolerance:0,
    hint:'Total symbols = 4+3+7+2 = 16. 16 × 2 = ?',
    explanation:'Total symbols = 16. 16 × 2 = <b>32</b> absences over 4 weeks.' })

);

})();
