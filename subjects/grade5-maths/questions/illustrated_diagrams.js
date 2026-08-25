'use strict';
// Grade 5 Maths - Illustrated diagrams (geometry, graphs, time)
// IDs format: g5m-illus-NNN
// Fills the "Maths has no illustrated questions" gap - shapes, angle
// diagrams, bar charts, pictograms and analog clocks, all drawn as inline
// SVG (no external images, works offline, click-to-zoom automatically).
// All coordinates/loops below use only straight lines, circles, polygons and
// basic trig computed at load time - no elliptical-arc SVG commands, so
// there is nothing that can render subtly wrong.

// ── Reflex angle: two rays with the LARGER (reflex) side shaded, built as a
//    polygon fan sampled every 10° - the browser computes the trig, so this
//    is exact regardless of hand-arithmetic.
function _g5mReflexAngleSVG() {
  const cx = 100, cy = 100, r = 80, arcR = 50;
  const rayBDeg = 110; // ray B, 110° clockwise from ray A (0°, pointing right)
  const ax = cx + r, ay = cy;
  const bx = (cx + r * Math.cos(rayBDeg * Math.PI / 180)).toFixed(1);
  const by = (cy + r * Math.sin(rayBDeg * Math.PI / 180)).toFixed(1);
  // Shade the far side: sweep from ray B (110°) up through 360° back to ray A -
  // that 250° sweep is the reflex angle, distinct from the smaller 110° gap.
  let fan = `${cx},${cy} `;
  for (let d = rayBDeg; d <= 360; d += 10) {
    const rad = d * Math.PI / 180;
    fan += `${(cx + arcR * Math.cos(rad)).toFixed(1)},${(cy + arcR * Math.sin(rad)).toFixed(1)} `;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="max-width:220px;max-height:220px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15);background:white">
    <polygon points="${fan}" fill="#fde68a" fill-opacity="0.65" stroke="none"/>
    <line x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}" stroke="#1e293b" stroke-width="3"/>
    <line x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}" stroke="#1e293b" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#1e293b"/>
  </svg>`;
}

// ── Triangle with two labelled angles, third marked "?" - hand-fixed
//    coordinates (schematic, not to scale, like a real exam diagram).
const _G5M_SVG_TRI_ANGLES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="max-width:220px;max-height:230px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15);background:white"><polygon points="100,20 20,170 180,170" fill="#e0e7ff" stroke="#3730a3" stroke-width="2.5"/><text x="100" y="45" text-anchor="middle" font-size="16" font-weight="bold" font-family="sans-serif" fill="#dc2626">?</text><text x="45" y="158" font-size="13" font-weight="600" font-family="sans-serif" fill="#1e293b">40°</text><text x="140" y="158" text-anchor="end" font-size="13" font-weight="600" font-family="sans-serif" fill="#1e293b">95°</text><text x="100" y="192" text-anchor="middle" font-size="9" font-style="italic" font-family="sans-serif" fill="#64748b">(diagram not to scale)</text></svg>`;

// ── Quadrilateral with three labelled angles, fourth marked "?".
const _G5M_SVG_QUAD_ANGLES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 210" style="max-width:240px;max-height:220px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15);background:white"><polygon points="40,40 220,30 240,170 20,180" fill="#fce7f3" stroke="#9d174d" stroke-width="2.5"/><text x="58" y="62" font-size="13" font-weight="600" font-family="sans-serif" fill="#1e293b">100°</text><text x="185" y="52" font-size="13" font-weight="600" font-family="sans-serif" fill="#1e293b">95°</text><text x="200" y="155" text-anchor="end" font-size="13" font-weight="600" font-family="sans-serif" fill="#1e293b">85°</text><text x="45" y="165" font-size="16" font-weight="bold" font-family="sans-serif" fill="#dc2626">?</text><text x="130" y="200" text-anchor="middle" font-size="9" font-style="italic" font-family="sans-serif" fill="#64748b">(diagram not to scale)</text></svg>`;

// ── A non-square rectangle with ONLY its 2 real lines of symmetry drawn
//    (horizontal + vertical) - tests the common mix-up of assuming a
//    rectangle also has 4 lines of symmetry like a square does.
const _G5M_SVG_RECT_SYMMETRY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 160" style="max-width:220px;max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15);background:white"><rect x="20" y="20" width="180" height="100" fill="#ecfdf5" stroke="#065f46" stroke-width="2.5"/><line x1="110" y1="20" x2="110" y2="120" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5,4"/><line x1="20" y1="70" x2="200" y2="70" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5,4"/></svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5m-illus-001', chapterId:'geometry', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:10px">${_g5mReflexAngleSVG()}</div>Two rays meet at a point. The LARGER, SHADED angle between them is marked. What TYPE of angle is the shaded region?`,
    options:['Acute (less than 90°)','Right angle (exactly 90°)','Obtuse (between 90° and 180°)','Reflex (more than 180°)'],
    answer:'Reflex (more than 180°)',
    hint:'The shaded region sweeps more than halfway around the point - further than a straight line (180°).',
    explanation:'The shaded region goes more than halfway around the point where the two rays meet - well past 180° (a straight line). Any angle greater than 180° but less than 360° is a <b>reflex angle</b>.' }),

  makeNum({ id:'g5m-illus-002', chapterId:'geometry', difficulty:3,
    question:`<div style="text-align:center;margin-bottom:10px">${_G5M_SVG_TRI_ANGLES}</div>In the triangle shown, two angles are marked 40° and 95°. Angles in a triangle add up to 180°. What is the size of the MISSING angle (marked ?)?`,
    answer:'45', acceptableAnswers:['45','45°'],
    hint:'Add the two known angles, then subtract from 180°.',
    explanation:'40° + 95° = 135°. 180° − 135° = <b>45°</b>. Angles in any triangle always add up to 180°.' }),

  makeNum({ id:'g5m-illus-003', chapterId:'geometry', difficulty:3,
    question:`<div style="text-align:center;margin-bottom:10px">${_G5M_SVG_QUAD_ANGLES}</div>The quadrilateral shown has three angles marked: 100°, 95° and 85°. Angles in a quadrilateral add up to 360°. What is the size of the MISSING angle (marked ?)?`,
    answer:'80', acceptableAnswers:['80','80°'],
    hint:'Add the three known angles, then subtract from 360°.',
    explanation:'100° + 95° + 85° = 280°. 360° − 280° = <b>80°</b>. Angles in any quadrilateral always add up to 360°.' }),

  makeNum({ id:'g5m-illus-004', chapterId:'geometry', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:10px">${_G5M_SVG_RECT_SYMMETRY}</div>This is a RECTANGLE (not a square) - its two real lines of symmetry are drawn as dashed red lines. How many lines of symmetry does a rectangle like this have?`,
    answer:'2', acceptableAnswers:['2'],
    hint:'Only the horizontal and vertical mid-lines are drawn. Unlike a square, the diagonals of a plain rectangle do NOT fold the shape onto itself.',
    explanation:'A non-square rectangle has only <b>2 lines of symmetry</b>: the horizontal and vertical mid-lines. Its diagonals are NOT lines of symmetry - folding along a diagonal does not make the two halves match, because the sides are different lengths. (A square is a special rectangle with all sides equal, which is why a square gets 2 extra diagonal lines of symmetry that a general rectangle does not have.)' })

);

// ── Bar chart + pictogram helpers (same pattern as Grade 4's Data Handling
//    chapter, renamed for this file so there's no ambiguity about which
//    grade's chart is being built).
function _g5mBarChart(title, cats, vals, opts) {
  opts = opts || {};
  const max = opts.max || 20, step = opts.step || 5;
  const chartTop = 30, chartBottom = 175, chartLeft = 50, barW = 38, gap = 24;
  const W = chartLeft + cats.length * (barW + gap) + 20, H = 210;
  const pxPerUnit = (chartBottom - chartTop) / max;
  let grid = '', bars = '';
  for (let v = 0; v <= max; v += step) {
    const y = (chartBottom - v * pxPerUnit).toFixed(1);
    grid += `<line x1="${chartLeft}" y1="${y}" x2="${W - 15}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
    grid += `<text x="${chartLeft - 8}" y="${(+y + 4).toFixed(1)}" text-anchor="end" font-size="10" font-family="sans-serif" fill="#64748b">${v}</text>`;
  }
  const colors = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];
  cats.forEach((cat, i) => {
    const val = vals[i];
    const h = (val * pxPerUnit).toFixed(1);
    const x = chartLeft + 15 + i * (barW + gap);
    const y = (chartBottom - h).toFixed(1);
    bars += `<rect x="${x}" y="${y}" width="${barW}" height="${h}" fill="${colors[i % colors.length]}" rx="3"/>`;
    bars += `<text x="${x + barW / 2}" y="${chartBottom + 16}" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#334155">${cat}</text>`;
    bars += `<text x="${x + barW / 2}" y="${(+y - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="bold" font-family="sans-serif" fill="#1e293b">${val}</text>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="max-width:100%;max-height:260px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15);background:white">
    <text x="${W / 2}" y="16" text-anchor="middle" font-size="12" font-weight="bold" font-family="sans-serif" fill="#1e293b">${title}</text>
    <line x1="${chartLeft}" y1="${chartTop}" x2="${chartLeft}" y2="${chartBottom}" stroke="#334155" stroke-width="1.5"/>
    <line x1="${chartLeft}" y1="${chartBottom}" x2="${W - 15}" y2="${chartBottom}" stroke="#334155" stroke-width="1.5"/>
    ${grid}${bars}
  </svg>`;
}

function _g5mPictogram(title, icon, keyVal, rows) {
  const rowH = 30, top = 46, left = 110;
  let body = '';
  rows.forEach((rrow, i) => {
    const y = top + i * rowH;
    body += `<text x="10" y="${y}" font-size="12" font-family="sans-serif" fill="#334155">${rrow.label}</text>`;
    const full = Math.floor(rrow.count);
    const half = (rrow.count - full) >= 0.5;
    for (let s = 0; s < full; s++) {
      body += `<text x="${left + s * 22}" y="${y + 5}" font-size="18" font-family="sans-serif">${icon}</text>`;
    }
    if (half) body += `<text x="${left + full * 22}" y="${y + 5}" font-size="18" font-family="sans-serif" fill-opacity="0.4">${icon}</text>`;
  });
  const H = top + rows.length * rowH + 30;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 ${H}" style="max-width:100%;max-height:260px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15);background:white">
    <text x="160" y="18" text-anchor="middle" font-size="12" font-weight="bold" font-family="sans-serif" fill="#1e293b">${title}</text>
    ${body}
    <rect x="8" y="${H - 26}" width="304" height="18" rx="4" fill="#f1f5f9"/>
    <text x="16" y="${H - 13}" font-size="10" font-family="sans-serif" fill="#334155">Key: ${icon} = ${keyVal} cars (half ${icon} = ${keyVal / 2} cars)</text>
  </svg>`;
}

const _G5M_SCORES_CHART = _g5mBarChart('Weekly Maths Test Scores (out of 20)', ['Ali', 'Ben', 'Chen', 'Dev', 'Emy'], [14, 18, 10, 16, 12]);
const _G5M_CARS_PICTO = _g5mPictogram('Cars Sold Per Month', '🚗', 4, [
  { label: 'January',  count: 3   },
  { label: 'February', count: 2.5 },
  { label: 'March',    count: 4   },
]);

STATIC_QUESTIONS.push(

  makeNum({ id:'g5m-illus-005', chapterId:'graphs', difficulty:3,
    question:`<div style="text-align:center;margin-bottom:10px">${_G5M_SCORES_CHART}</div>What is the MEAN (average) score shown on the bar chart, across all 5 students?`,
    answer:'14', acceptableAnswers:['14'],
    hint:'Add all 5 scores together, then divide by 5.',
    explanation:'Total = 14 + 18 + 10 + 16 + 12 = 70. Mean = 70 ÷ 5 = <b>14</b>.' }),

  makeNum({ id:'g5m-illus-006', chapterId:'graphs', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:10px">${_G5M_SCORES_CHART}</div>What is the RANGE of the scores shown on the bar chart?`,
    answer:'8', acceptableAnswers:['8'],
    hint:'Range = highest value − lowest value. Find the tallest and shortest bars.',
    explanation:'Highest = 18 (Ben). Lowest = 10 (Chen). Range = 18 − 10 = <b>8</b>.' }),

  makeMCQ({ id:'g5m-illus-007', chapterId:'graphs', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:10px">${_G5M_SCORES_CHART}</div>Which student scored the LOWEST on the bar chart?`,
    options:['Ali','Ben','Chen','Dev'],
    answer:'Chen',
    hint:'The lowest score has the shortest bar.',
    explanation:'<b>Chen</b> has the shortest bar, reaching only 10 - the lowest score on the chart.' }),

  makeNum({ id:'g5m-illus-008', chapterId:'graphs', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:10px">${_G5M_CARS_PICTO}</div>Using the KEY at the bottom of the pictogram, how many cars were sold in MARCH?`,
    answer:'16', acceptableAnswers:['16'],
    hint:'Count the full 🚗 symbols on the March row, then multiply by the key value.',
    explanation:'March shows 4 full symbols. Key: each 🚗 = 4 cars. 4 × 4 = <b>16 cars</b>.' }),

  makeNum({ id:'g5m-illus-009', chapterId:'graphs', difficulty:3,
    question:`<div style="text-align:center;margin-bottom:10px">${_G5M_CARS_PICTO}</div>What is the TOTAL number of cars sold over January, February AND March?`,
    answer:'38', acceptableAnswers:['38'],
    hint:'January = 3 symbols. February = 2½ symbols (the faded one is half). March = 4 symbols. Convert each row using the key, then add.',
    explanation:'January: 3 × 4 = 12 cars. February: 2½ × 4 = 10 cars (the faded symbol is half a symbol = 2 cars). March: 4 × 4 = 16 cars. Total = 12 + 10 + 16 = <b>38 cars</b>.' })

);

// ── Analog clocks - hands drawn at the exact time (computed once at load
//    time), no digital readout on the dial itself.
function _g5mClockFace(hour, minute, label) {
  const size = 160, cx = size / 2, cy = size / 2, r = 68;
  const hourDeg = ((hour % 12) + minute / 60) * 30 - 90;
  const minDeg  = minute * 6 - 90;
  const hourLen = r * 0.5, minLen = r * 0.8;
  const hRad = hourDeg * Math.PI / 180, mRad = minDeg * Math.PI / 180;
  const hx = (cx + hourLen * Math.cos(hRad)).toFixed(1), hy = (cy + hourLen * Math.sin(hRad)).toFixed(1);
  const mx = (cx + minLen  * Math.cos(mRad)).toFixed(1), my = (cy + minLen  * Math.sin(mRad)).toFixed(1);
  let numbers = '', ticks = '';
  for (let n = 1; n <= 12; n++) {
    const a = (n * 30 - 90) * Math.PI / 180;
    const nx = (cx + (r - 14) * Math.cos(a)).toFixed(1), ny = (cy + (r - 14) * Math.sin(a) + 4).toFixed(1);
    numbers += `<text x="${nx}" y="${ny}" text-anchor="middle" font-size="11" font-weight="600" font-family="sans-serif" fill="#1e293b">${n}</text>`;
  }
  for (let n = 0; n < 60; n += 5) {
    const a = (n * 6 - 90) * Math.PI / 180;
    const x1 = (cx + (r - 4) * Math.cos(a)).toFixed(1), y1 = (cy + (r - 4) * Math.sin(a)).toFixed(1);
    const x2 = (cx + (r - 10) * Math.cos(a)).toFixed(1), y2 = (cy + (r - 10) * Math.sin(a)).toFixed(1);
    ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#64748b" stroke-width="1.5"/>`;
  }
  const lbl = label ? `<text x="${cx}" y="${size - 4}" text-anchor="middle" font-size="11" font-weight="bold" font-family="sans-serif" fill="#1e293b">${label}</text>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" style="max-width:180px;max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15);background:white">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="white" stroke="#334155" stroke-width="3"/>
    ${ticks}${numbers}
    <line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="3.5" fill="#dc2626"/>
    ${lbl}
  </svg>`;
}

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5m-illus-010', chapterId:'time', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:10px">${_g5mClockFace(6, 20)}</div>What time does this clock show?`,
    options:['6:20','6:40','4:30','7:20'],
    answer:'6:20',
    hint:'Each small tick on the dial is 1 minute; each number is 5 minutes. Count round to where the minute hand points.',
    explanation:'The hour hand is just past the 6. The minute hand points to the 4th number mark (20 minutes). The time is <b>6:20</b>.' }),

  makeNum({ id:'g5m-illus-011', chapterId:'time', difficulty:3,
    question:`<div style="display:flex;justify-content:center;gap:18px;margin-bottom:10px;flex-wrap:wrap">${_g5mClockFace(2, 15, 'Start')}${_g5mClockFace(4, 50, 'End')}</div>How many MINUTES passed between the Start time and the End time?`,
    answer:'155', acceptableAnswers:['155','155 minutes'],
    hint:'Find the difference in hours first, then in minutes, and convert everything to minutes.',
    explanation:'Start = 2:15. End = 4:50. From 2:15 to 4:15 is 2 hours (120 minutes). From 4:15 to 4:50 is a further 35 minutes. Total = 120 + 35 = <b>155 minutes</b>.' })

);

// ── More illustrated diagrams: angles around a point (reuses the reflex
//    angle's wedge-fan technique - sampled points via Math.cos/sin, already
//    verified above), fraction bars, a percentage grid, decimal number
//    lines, grid-square areas and a labelled perimeter shape. Straight
//    lines/rects/circles/sampled-polygon-fans only, computed by code.
function _g5mAnglesAroundPoint(sectors) {
  const cx = 100, cy = 100, rayR = 85, arcR = 55;
  const colors = ['#93c5fd', '#86efac', '#fca5a5', '#fde68a'];
  let bound = 0;
  const bounds = [0];
  sectors.forEach(s => { bound += s.deg; bounds.push(bound); });
  let rays = '';
  bounds.forEach(b => {
    const rad = (b - 90) * Math.PI / 180;
    const x = (cx + rayR * Math.cos(rad)).toFixed(1), y = (cy + rayR * Math.sin(rad)).toFixed(1);
    rays += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#1e293b" stroke-width="2.5"/>`;
  });
  let wedges = '', labels = '', start = 0;
  sectors.forEach((s, i) => {
    const end = start + s.deg;
    let fan = `${cx},${cy} `;
    for (let a = start; a <= end; a += 5) {
      const rad = (a - 90) * Math.PI / 180;
      fan += `${(cx + arcR * Math.cos(rad)).toFixed(1)},${(cy + arcR * Math.sin(rad)).toFixed(1)} `;
    }
    wedges += `<polygon points="${fan}" fill="${colors[i % colors.length]}" fill-opacity="0.55" stroke="none"/>`;
    const midRad = ((start + end) / 2 - 90) * Math.PI / 180;
    const lx = (cx + (arcR - 15) * Math.cos(midRad)).toFixed(1), ly = (cy + (arcR - 15) * Math.sin(midRad)).toFixed(1);
    labels += `<text x="${lx}" y="${ly}" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#1e293b">${s.label}</text>`;
    start = end;
  });
  return `<svg viewBox="0 0 200 200" width="200" height="200" style="display:block;margin:6px auto;background:white;border-radius:8px;border:1px solid #cbd5e1">${wedges}${rays}${labels}<circle cx="${cx}" cy="${cy}" r="3" fill="#1e293b"/></svg>`;
}

function _g5mFractionBar(total, shaded) {
  const w = 240, h = 50, x0 = 10, y0 = 20, segW = w / total;
  let segs = '';
  for (let i = 0; i < total; i++) {
    const x = (x0 + i * segW).toFixed(1);
    const fill = i < shaded ? '#60a5fa' : '#f1f5f9';
    segs += `<rect x="${x}" y="${y0}" width="${segW.toFixed(1)}" height="${h}" fill="${fill}" stroke="#1e293b" stroke-width="1.5"/>`;
  }
  return `<svg viewBox="0 0 260 90" width="260" height="90" style="display:block;margin:6px auto;background:white;border-radius:8px;border:1px solid #cbd5e1">${segs}</svg>`;
}

function _g5mPercentGrid(shadedCount) {
  const cell = 14, cols = 10, x0 = 10, y0 = 10;
  let cells = '';
  for (let i = 0; i < 100; i++) {
    const col = i % cols, row = Math.floor(i / cols);
    const x = x0 + col * cell, y = y0 + row * cell;
    const fill = i < shadedCount ? '#f97316' : '#f1f5f9';
    cells += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${fill}" stroke="#94a3b8" stroke-width="0.5"/>`;
  }
  return `<svg viewBox="0 0 160 160" width="160" height="160" style="display:block;margin:6px auto;background:white;border-radius:8px;border:1px solid #cbd5e1">${cells}</svg>`;
}

function _g5mDecimalLine(lo, hi, mark) {
  const x0 = 20, x1 = 260, y = 30, steps = 10;
  const px = v => x0 + (v - lo) / (hi - lo) * (x1 - x0);
  let ticks = '';
  for (let i = 0; i <= steps; i++) {
    const v = lo + (hi - lo) * i / steps;
    const x = px(v).toFixed(1);
    const big = (i === 0 || i === steps);
    ticks += `<line x1="${x}" y1="${y - (big ? 10 : 6)}" x2="${x}" y2="${y + (big ? 10 : 6)}" stroke="#334155" stroke-width="${big ? 2 : 1}"/>`;
    if (big) ticks += `<text x="${x}" y="${y + 24}" text-anchor="middle" font-size="12" font-weight="bold" font-family="sans-serif" fill="#1e293b">${v}</text>`;
  }
  const mx = px(mark).toFixed(1);
  return `<svg viewBox="0 0 280 60" width="280" height="60" style="display:block;margin:6px auto;background:white;border-radius:8px;border:1px solid #cbd5e1"><line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="#1e293b" stroke-width="2"/>${ticks}<circle cx="${mx}" cy="${y}" r="5" fill="#dc2626"/></svg>`;
}

function _g5mGridArea(cells, cellLabel) {
  const cell = 20, x0 = 10, y0 = 10;
  const body = cells.map(([c, r]) => `<rect x="${x0 + c * cell}" y="${y0 + r * cell}" width="${cell}" height="${cell}" fill="#a7f3d0" stroke="#047857" stroke-width="1"/>`).join('');
  const maxC = Math.max(...cells.map(s => s[0])) + 1, maxR = Math.max(...cells.map(s => s[1])) + 1;
  const W = x0 * 2 + maxC * cell, H = y0 * 2 + maxR * cell;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block;margin:6px auto;background:white;border-radius:8px;border:1px solid #cbd5e1">${body}</svg>`;
}

const _G5M_SVG_TRI_BASE_HEIGHT = `<svg viewBox="0 0 200 140" width="200" height="140" style="display:block;margin:6px auto;background:white;border-radius:8px;border:1px solid #cbd5e1"><polygon points="20,120 180,120 90,20" fill="#fef9c3" stroke="#a16207" stroke-width="2.5"/><line x1="90" y1="120" x2="90" y2="20" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,3"/><rect x="90" y="112" width="8" height="8" fill="none" stroke="#dc2626" stroke-width="1.5"/><text x="100" y="135" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#1e293b">base = 12 cm</text><text x="100" y="70" font-size="11" font-family="sans-serif" fill="#dc2626">height = 8 cm</text></svg>`;

const _G5M_SVG_RECT_PERIMETER = `<svg viewBox="0 0 200 130" width="200" height="130" style="display:block;margin:6px auto;background:white;border-radius:8px;border:1px solid #cbd5e1"><rect x="30" y="25" width="140" height="70" fill="#e0e7ff" stroke="#3730a3" stroke-width="2.5"/><text x="100" y="18" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#1e293b">14 cm</text><text x="10" y="63" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#1e293b" transform="rotate(-90 10 63)">9 cm</text></svg>`;

const _G5M_SVG_L_PERIMETER = `<svg viewBox="0 0 190 130" width="190" height="130" style="display:block;margin:6px auto;background:white;border-radius:8px;border:1px solid #cbd5e1"><polygon points="20,20 100,20 100,40 140,40 140,100 20,100" fill="#fed7aa" stroke="#9a3412" stroke-width="2.5"/><text x="60" y="14" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#1e293b">4 m</text><text x="8" y="62" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#1e293b" transform="rotate(-90 8 62)">4 m</text><text x="80" y="118" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#1e293b">6 m</text><text x="118" y="34" font-size="10" font-family="sans-serif" fill="#1e293b">1 m</text></svg>`;

const _G5M_ANGLES_1 = _g5mAnglesAroundPoint([{ deg: 150, label: '150°' }, { deg: 120, label: '120°' }, { deg: 90, label: '?' }]);
const _G5M_ANGLES_2 = _g5mAnglesAroundPoint([{ deg: 200, label: '200°' }, { deg: 100, label: '100°' }, { deg: 60, label: '?' }]);
const _G5M_FRACBAR_1 = _g5mFractionBar(8, 5);
const _G5M_FRACBAR_2 = _g5mFractionBar(6, 4);
const _G5M_PCTGRID_1 = _g5mPercentGrid(37);
const _G5M_PCTGRID_2 = _g5mPercentGrid(64);
const _G5M_DECLINE_1 = _g5mDecimalLine(3, 4, 3.6);
const _G5M_DECLINE_2 = _g5mDecimalLine(6, 7, 6.3);
const _G5M_GRID_L = _g5mGridArea([[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]]);
const _G5M_GRID_RECT = _g5mGridArea([[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]]);

STATIC_QUESTIONS.push(

  makeNum({ id:'g5m-illus-012', chapterId:'geometry', difficulty:3,
    question:`<div style="text-align:center;margin-bottom:8px">${_G5M_ANGLES_1}</div>The three angles shown go all the way around the point, so together they add up to 360°. Two are marked 150° and 120°. What is the size of the missing angle (marked ?)?`,
    answer:'90', acceptableAnswers:['90','90°'],
    hint:'Angles around a point always add up to 360°. Add the two known angles, then subtract from 360°.',
    explanation:'150° + 120° = 270°. 360° − 270° = <b>90°</b>. Angles that meet at a single point and go all the way around always add up to 360°.' }),

  makeNum({ id:'g5m-illus-013', chapterId:'geometry', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:8px">${_G5M_ANGLES_2}</div>The three angles shown go all the way around the point. Two are marked 200° and 100°. What is the size of the missing angle (marked ?)?`,
    answer:'60', acceptableAnswers:['60','60°'],
    hint:'Angles around a point always add up to 360°.',
    explanation:'200° + 100° = 300°. 360° − 300° = <b>60°</b>.' }),

  makeMCQ({ id:'g5m-illus-014', chapterId:'fractions', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:8px">${_G5M_FRACBAR_1}</div>The rectangle is divided into 8 equal parts. 5 parts are shaded blue. What FRACTION of the rectangle is shaded?`,
    options:['3/8','5/8','5/3','8/5'],
    answer:'5/8',
    hint:'Count the shaded parts, then count the total parts. Fraction = shaded ÷ total.',
    explanation:'5 out of 8 equal parts are shaded, so the fraction shaded is <b>5/8</b>.' }),

  makeNum({ id:'g5m-illus-015', chapterId:'fractions', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:8px">${_G5M_FRACBAR_2}</div>The rectangle is divided into 6 equal parts. 4 parts are shaded blue. Write the shaded fraction in its SIMPLEST FORM (e.g. 3/4).`,
    answer:'2/3', acceptableAnswers:['2/3'],
    hint:'The shaded fraction is 4/6. Divide the top and bottom by their highest common factor.',
    explanation:'Shaded = 4/6. The highest common factor of 4 and 6 is 2. Dividing both by 2: 4÷2=2, 6÷2=3, giving <b>2/3</b>.' }),

  makeNum({ id:'g5m-illus-016', chapterId:'percentage', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:8px">${_G5M_PCTGRID_1}</div>The grid has 100 equal small squares. What PERCENTAGE of the grid is shaded orange?`,
    answer:'37', acceptableAnswers:['37','37%'],
    hint:'Each small square is worth 1% (since there are 100 in total). Count the shaded squares.',
    explanation:'The grid has 100 squares in total, and 37 are shaded. Since each square is 1% of the grid, <b>37%</b> is shaded.' }),

  makeNum({ id:'g5m-illus-017', chapterId:'percentage', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:8px">${_G5M_PCTGRID_2}</div>The grid has 100 equal small squares, and 64 are shaded orange. What PERCENTAGE of the grid is NOT shaded?`,
    answer:'36', acceptableAnswers:['36','36%'],
    hint:'The shaded and unshaded percentages must add up to 100%.',
    explanation:'Shaded = 64%. Unshaded = 100% − 64% = <b>36%</b>.' }),

  makeNum({ id:'g5m-illus-018', chapterId:'decimals', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:8px">${_G5M_DECLINE_1}</div>The number line is divided into 10 equal parts between 3 and 4. What DECIMAL number is marked by the red dot?`,
    answer:'3.6', acceptableAnswers:['3.6'],
    hint:'Each small step between 3 and 4 is worth 0.1. Count the steps from 3 to the red dot.',
    explanation:'The dot is 6 steps past 3, and each step is worth 0.1 (since there are 10 equal steps between 3 and 4). 3 + 6 × 0.1 = <b>3.6</b>.' }),

  makeNum({ id:'g5m-illus-019', chapterId:'decimals', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:8px">${_G5M_DECLINE_2}</div>The number line is divided into 10 equal parts between 6 and 7. What DECIMAL number is marked by the red dot?`,
    answer:'6.3', acceptableAnswers:['6.3'],
    hint:'Each small step between 6 and 7 is worth 0.1.',
    explanation:'The dot is 3 steps past 6. 6 + 3 × 0.1 = <b>6.3</b>.' }),

  makeNum({ id:'g5m-illus-020', chapterId:'area', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:8px">${_G5M_GRID_L}</div>Each small square on the grid represents 1 cm². What is the TOTAL AREA of the green shape?`,
    answer:'7', acceptableAnswers:['7','7 cm2','7 cm²'],
    hint:'Count every complete green square.',
    explanation:'There are <b>7</b> complete 1 cm² squares shaded green, so the area is <b>7 cm²</b>.' }),

  makeNum({ id:'g5m-illus-021', chapterId:'area', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:8px">${_G5M_GRID_RECT}</div>Each small square on the grid represents 1 cm². What is the TOTAL AREA of the green rectangle?`,
    answer:'6', acceptableAnswers:['6','6 cm2','6 cm²'],
    hint:'Count every complete green square, or multiply the number of columns by the number of rows.',
    explanation:'The green rectangle is 3 squares wide and 2 squares tall: 3 × 2 = <b>6 cm²</b>.' }),

  makeNum({ id:'g5m-illus-022', chapterId:'area', difficulty:3,
    question:`<div style="text-align:center;margin-bottom:8px">${_G5M_SVG_TRI_BASE_HEIGHT}</div>This triangle has a base of 12 cm and a height of 8 cm (the dashed line, meeting the base at a right angle). What is the AREA of the triangle?`,
    answer:'48', acceptableAnswers:['48','48 cm2','48 cm²'],
    hint:'Area of a triangle = ½ × base × height.',
    explanation:'Area = ½ × 12 × 8 = ½ × 96 = <b>48 cm²</b>.' }),

  makeNum({ id:'g5m-illus-023', chapterId:'length', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:8px">${_G5M_SVG_RECT_PERIMETER}</div>This rectangle has the length and width marked on the diagram. What is its PERIMETER?`,
    answer:'46', acceptableAnswers:['46','46 cm'],
    hint:'Perimeter of a rectangle = 2 × (length + width).',
    explanation:'Perimeter = 2 × (14 + 9) = 2 × 23 = <b>46 cm</b>.' }),

  makeNum({ id:'g5m-illus-024', chapterId:'length', difficulty:3,
    question:`<div style="text-align:center;margin-bottom:8px">${_G5M_SVG_L_PERIMETER}</div>Using the measurements marked on the diagram, find the PERIMETER (total distance around the outside) of this L-shaped plot, in metres.`,
    answer:'20', acceptableAnswers:['20','20 m'],
    hint:'Add up every outer edge. Two edges are not labelled - work them out first: the short horizontal edge = 6−4 = 2 m, and the right-hand edge = 4−1 = 3 m.',
    explanation:'The 6 edges are: 4 m (top), 1 m (step down), 2 m (6−4, short horizontal), 3 m (4−1, right side), 6 m (bottom) and 4 m (left side). Total = 4+1+2+3+6+4 = <b>20 m</b>.' })

);
