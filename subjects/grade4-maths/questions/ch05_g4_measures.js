'use strict';
// Grade 4 Maths - Chapter: Measures & Units (length/mass/capacity/time/money)
// IDs format: g4m-meas-NNN

STATIC_QUESTIONS.push(

  makeNum({ id:'g4m-meas-001', chapterId:'g4-measures', subsection:'length', difficulty:1,
    question:'Convert 5 m to CENTIMETRES.',
    answer:'500', acceptableAnswers:['500','500 cm'],
    hint:'1 m = 100 cm. Multiply by 100.',
    explanation:'5 m x 100 = <b>500 cm</b>. MIE Grade 4 length conversion: 1 m = 100 cm. To convert metres to centimetres, multiply by 100. To convert cm to m, divide by 100.' }),

  makeNum({ id:'g4m-meas-002', chapterId:'g4-measures', subsection:'mass', difficulty:1,
    question:'Convert 3 kg to GRAMS.',
    answer:'3000', acceptableAnswers:['3000','3000 g','3,000 g'],
    hint:'1 kg = 1000 g. Multiply by 1000.',
    explanation:'3 kg x 1000 = <b>3,000 g</b>. MIE Grade 4 mass conversion: 1 kg = 1000 g. Multiply by 1000 to go from kg to g; divide by 1000 to go from g to kg.' }),

  makeNum({ id:'g4m-meas-003', chapterId:'g4-measures', subsection:'capacity', difficulty:1,
    question:'Convert 4 L to CENTILITRES. (1 L = 100 cL)',
    answer:'400', acceptableAnswers:['400','400 cL'],
    hint:'Multiply by 100 to convert litres to centilitres.',
    explanation:'4 L x 100 = <b>400 cL</b>. MIE Grade 4 capacity conversion: 1 L = 100 cL. Other unit: 1 L = 1000 mL, so 1 cL = 10 mL.' }),

  makeNum({ id:'g4m-meas-004', chapterId:'g4-measures', subsection:'length', difficulty:2,
    question:'Convert 350 cm to METRES. (Write as a decimal, e.g. 3.5)',
    answer:'3.5', acceptableAnswers:['3.5','3.5 m','3 m 50 cm'],
    hint:'Divide by 100 to convert centimetres to metres.',
    explanation:'350 cm / 100 = <b>3.5 m</b> = 3 m 50 cm. When converting from a smaller unit to a larger unit, divide.' }),

  makeNum({ id:'g4m-meas-005', chapterId:'g4-measures', subsection:'time', difficulty:2,
    question:'1 hour 45 minutes = how many MINUTES?',
    answer:'105', acceptableAnswers:['105','105 minutes'],
    hint:'1 hour = 60 minutes. Add 60 + 45.',
    explanation:'1 hour = 60 minutes. 60 + 45 = <b>105 minutes</b>. Time conversions: 1 hour = 60 minutes, 1 minute = 60 seconds, 1 day = 24 hours.' }),

  makeMCQ({ id:'g4m-meas-006', chapterId:'g4-measures', subsection:'time', difficulty:1,
    question:'On a clock, where does the MINUTE HAND point when the time is EXACTLY 3 o\'clock?',
    options:['To the 3','To the 6','To the 9','To the 12'],
    answer:"To the 12",
    hint:'When the time is exactly on the hour, where is the minute hand?',
    explanation:'When the time is exactly on the hour (e.g. 3 o\'clock), the minute hand always points to the <b>12</b>. The hour hand then points to the hour number (3 for 3 o\'clock).' }),

  makeNum({ id:'g4m-meas-007', chapterId:'g4-measures', subsection:'mass', difficulty:2,
    question:'A bag of sugar weighs 2 kg 500 g. What is this in GRAMS?',
    answer:'2500', acceptableAnswers:['2500','2500 g','2,500 g'],
    hint:'Convert 2 kg to grams, then add 500 g.',
    explanation:'2 kg = 2,000 g. 2,000 g + 500 g = <b>2,500 g</b>. Always convert the whole number of kg first, then add the remaining grams.' }),

  makeNum({ id:'g4m-meas-008', chapterId:'g4-measures', subsection:'capacity', difficulty:2,
    question:'Meera buys 3 bottles of juice, each containing 500 mL. What is the TOTAL amount in LITRES?',
    answer:'1.5', acceptableAnswers:['1.5','1.5 L','1500 mL'],
    hint:'Find total mL first: 3 x 500. Then convert to litres (divide by 1000).',
    explanation:'3 x 500 mL = 1,500 mL. 1,500 mL / 1,000 = <b>1.5 L</b>. MIE Grade 4: 1 L = 1,000 mL = 100 cL.' }),

  makeNum({ id:'g4m-meas-009', chapterId:'g4-measures', subsection:'money', difficulty:2,
    question:'Ram buys 4 pens at Rs 15 each and 2 rulers at Rs 8 each. How much does he pay in TOTAL?',
    answer:'76', acceptableAnswers:['76','Rs 76'],
    hint:'Find the cost of pens (4 x 15) and rulers (2 x 8) separately. Then add.',
    explanation:'Pens: 4 x Rs 15 = Rs 60. Rulers: 2 x Rs 8 = Rs 16. Total = 60 + 16 = <b>Rs 76</b>. Two-step money word problem.' }),

  makeNum({ id:'g4m-meas-010', chapterId:'g4-measures', subsection:'mass', difficulty:4,
    question:'Each of 4 bags weighs 1 kg 250 g. All 4 bags are packed into a carton that weighs 500 g. What is the TOTAL MASS of the packed carton in GRAMS?',
    answer:'5500', acceptableAnswers:['5500','5500 g','5,500 g'],
    hint:'Step 1: convert 1 kg 250 g to grams. Step 2: multiply by 4. Step 3: add the carton weight.',
    explanation:'Each bag = 1,000 + 250 = 1,250 g. 4 bags = 4 x 1,250 = 5,000 g. Add carton: 5,000 + 500 = <b>5,500 g</b>.' })

);

STATIC_QUESTIONS.push(

  makeNum({ id:'g4m-meas-011', chapterId:'g4-measures', subsection:'area', difficulty:1,
    question:'A shape drawn on a square grid covers 12 complete squares. Each square has area 1 cm². What is the AREA of the shape?',
    answer:'12', acceptableAnswers:['12','12 cm²'],
    hint:'Area = number of squares × area of one square.',
    explanation:'<b>12 cm²</b>. Area is the space inside a shape. When counting squares on a grid, each 1 cm square = 1 cm². Count all complete squares to find the area.' }),

  makeNum({ id:'g4m-meas-012', chapterId:'g4-measures', subsection:'area', difficulty:2,
    question:'What is the AREA of a rectangle 6 cm long and 4 cm wide?',
    answer:'24', acceptableAnswers:['24','24 cm²'],
    hint:'Area of rectangle = length × width.',
    explanation:'Area = 6 × 4 = <b>24 cm²</b>. For a rectangle: Area = length × width. This works because you are counting a grid of rows and columns: 6 columns × 4 rows = 24 squares.' }),

  makeMCQ({ id:'g4m-meas-013', chapterId:'g4-measures', subsection:'time', difficulty:1,
    question:'What time is 14:30 in 12-hour clock format?',
    options:['2:30 a.m.','2:30 p.m.','4:30 p.m.','14:30 a.m.'],
    answer:'2:30 p.m.',
    hint:'Subtract 12 from the hours: 14 − 12 = 2. It is afternoon so it is p.m.',
    explanation:'14:30 − 12 hours = 2 hours, 30 minutes after noon = <b>2:30 p.m.</b>. For 24-hour to 12-hour: if hours > 12, subtract 12 and add p.m. Hours 0–11 are a.m.; 12–23 are p.m.' }),

  makeNum({ id:'g4m-meas-014', chapterId:'g4-measures', subsection:'time', difficulty:2,
    question:'A film starts at 2:45 p.m. and lasts 1 hour 35 minutes. What time does the film END?',
    answer:'4:20 pm', acceptableAnswers:['4:20 pm','4:20 p.m.','16:20'],
    hint:'Add 1 hour to 2:45 to get 3:45. Then add 35 minutes to 3:45.',
    explanation:'2:45 + 1 hour = 3:45. 3:45 + 35 minutes: 45 + 35 = 80 minutes = 1 hour 20 minutes. 3:45 + 35 min = <b>4:20 p.m.</b>' }),

  makeNum({ id:'g4m-meas-015', chapterId:'g4-measures', subsection:'mass', difficulty:2,
    question:'Convert 2,750 g to kilograms and grams. (Write as XkgYg, e.g. 3kg500g)',
    answer:'2kg750g', acceptableAnswers:['2kg750g','2 kg 750 g','2.75 kg'],
    hint:'Divide 2,750 by 1,000 to find whole kg. The remainder is the grams.',
    explanation:'2,750 ÷ 1,000 = 2 whole kg with 750 g remaining → <b>2 kg 750 g</b>. Check: 2 × 1,000 + 750 = 2,750 g ✓.' }),

  makeNum({ id:'g4m-meas-016', chapterId:'g4-measures', subsection:'length', difficulty:2,
    question:'Convert 1 km 400 m to METRES.',
    answer:'1400', acceptableAnswers:['1400','1,400','1400 m','1,400 m'],
    hint:'1 km = 1,000 m. Add the remaining metres.',
    explanation:'1 km = 1,000 m. 1,000 m + 400 m = <b>1,400 m</b>. MIE Grade 4: 1 km = 1,000 m.' }),

  makeMCQ({ id:'g4m-meas-017', chapterId:'g4-measures', subsection:'capacity', difficulty:2,
    question:'A jug holds 2 L 500 mL of water. How many millilitres is this?',
    options:['2,005 mL','2,050 mL','2,500 mL','25,000 mL'],
    answer:'2,500 mL',
    hint:'Convert 2 L to mL (× 1,000), then add 500 mL.',
    explanation:'2 L = 2,000 mL. 2,000 + 500 = <b>2,500 mL</b>. Conversion: 1 L = 1,000 mL.' }),

  makeNum({ id:'g4m-meas-018', chapterId:'g4-measures', subsection:'time', difficulty:3,
    question:'A school bus leaves at 7:15 a.m. and arrives at school at 7:50 a.m. How many MINUTES does the journey take?',
    answer:'35', acceptableAnswers:['35','35 minutes'],
    hint:'Count from 7:15 to 7:50 on the same hour.',
    explanation:'From 7:15 to 7:50: 50 − 15 = <b>35 minutes</b>. When both times share the same hour, simply subtract the minutes.' }),

  makeNum({ id:'g4m-meas-019', chapterId:'g4-measures', subsection:'money', difficulty:4,
    question:'Meera buys 3 m of ribbon at Rs 25 per metre and 2 m of lace at Rs 18 per metre. She pays with a Rs 200 note. How much CHANGE does she receive?',
    answer:'89', acceptableAnswers:['89','Rs 89'],
    hint:'Step 1: cost of ribbon = 3×25. Step 2: cost of lace = 2×18. Step 3: total cost. Step 4: change = 200 − total.',
    explanation:'Ribbon: 3 × Rs 25 = Rs 75. Lace: 2 × Rs 18 = Rs 36. Total: Rs 75 + Rs 36 = Rs 111. Change: Rs 200 − Rs 111 = <b>Rs 89</b>. Three-step money word problem.' })

);

// ── Illustrated questions: a real analog clock face, hands drawn at the
//    exact time requested (computed once at load time - no digital readout
//    on the dial itself, so the question genuinely requires reading it).
function _g4mClockFace(hour, minute) {
  const size = 180, cx = size / 2, cy = size / 2, r = 78;
  const hourDeg = ((hour % 12) + minute / 60) * 30 - 90;
  const minDeg  = minute * 6 - 90;
  const hourLen = r * 0.5, minLen = r * 0.8;
  const hRad = hourDeg * Math.PI / 180, mRad = minDeg * Math.PI / 180;
  const hx = (cx + hourLen * Math.cos(hRad)).toFixed(1), hy = (cy + hourLen * Math.sin(hRad)).toFixed(1);
  const mx = (cx + minLen  * Math.cos(mRad)).toFixed(1), my = (cy + minLen  * Math.sin(mRad)).toFixed(1);
  let numbers = '', ticks = '';
  for (let n = 1; n <= 12; n++) {
    const a = (n * 30 - 90) * Math.PI / 180;
    const nx = (cx + (r - 16) * Math.cos(a)).toFixed(1), ny = (cy + (r - 16) * Math.sin(a) + 4).toFixed(1);
    numbers += `<text x="${nx}" y="${ny}" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#1e293b">${n}</text>`;
  }
  for (let n = 0; n < 60; n += 5) {
    const a = (n * 6 - 90) * Math.PI / 180;
    const x1 = (cx + (r - 4)  * Math.cos(a)).toFixed(1), y1 = (cy + (r - 4)  * Math.sin(a)).toFixed(1);
    const x2 = (cx + (r - 11) * Math.cos(a)).toFixed(1), y2 = (cy + (r - 11) * Math.sin(a)).toFixed(1);
    ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#64748b" stroke-width="2"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" style="max-width:200px;max-height:200px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15);background:white">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="white" stroke="#334155" stroke-width="3"/>
    ${ticks}${numbers}
    <line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="#1e293b" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#dc2626"/>
  </svg>`;
}

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4m-meas-020', chapterId:'g4-measures', subsection:'time', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:10px">${_g4mClockFace(3, 0)}</div>What time does this clock show?`,
    options:['2 o\'clock','3 o\'clock','4 o\'clock','9 o\'clock'],
    answer:"3 o'clock",
    hint:'The minute hand points to the 12, so it is exactly on the hour. Read the hour hand.',
    explanation:'The minute hand points to <b>12</b> (exactly on the hour) and the hour hand points to <b>3</b>. The time is <b>3 o\'clock</b>.' }),

  makeMCQ({ id:'g4m-meas-021', chapterId:'g4-measures', subsection:'time', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:10px">${_g4mClockFace(6, 30)}</div>What time does this clock show?`,
    options:['6 o\'clock','Half past 5','Half past 6','Half past 7'],
    answer:'Half past 6',
    hint:'The minute hand points to the 6 (30 minutes = half past). The hour hand is between two numbers - which two?',
    explanation:'The minute hand points to <b>6</b>, meaning 30 minutes past the hour. The hour hand sits halfway between 6 and 7, showing the hour has not been fully reached yet. This is <b>half past 6</b>.' }),

  makeMCQ({ id:'g4m-meas-022', chapterId:'g4-measures', subsection:'time', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:10px">${_g4mClockFace(9, 15)}</div>What time does this clock show?`,
    options:['Quarter past 9','Quarter to 9','Half past 9','Quarter past 3'],
    answer:'Quarter past 9',
    hint:'The minute hand points to the 3 (15 minutes = quarter past). Read the hour hand, not the number the minute hand points to.',
    explanation:'The minute hand points to <b>3</b>, meaning 15 minutes past the hour (a quarter of an hour). The hour hand is just past the 9. This is <b>quarter past 9</b> - a common mix-up is reading "3" from the minute hand as the hour.' })

);
