'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Physics — question FAMILIES (final expansion phase)
//
//  One context per family, 3–5 variants that demand different thinking. The
//  family id is the question id minus its "-<variant>" suffix, deliberately:
//  the engine can spot near-relatives without a new question field, and the
//  factories drop any field they do not name.
//
//  ⚠ WHY THIS FILE EXISTS. Measured 2026-09-09: all five core chapters
//    (P1–P5) held ZERO L4 items — every one of the pack's 32 sat in Inquiry
//    or STS, and the difficulty audit found one of those (g9s-inq-350,
//    "choose the heading Current / A") to be L1 recognition wearing an L4
//    label. Fifteen of the items below are L4 in the five weighted chapters.
//
//  ⚠ Every division here comes out exact and every answer was re-derived from
//    the stem, including the units. A wrong key in a physics bank is invisible
//    to every test in this repo.
//
//  ⚠ NO <i> ANYWHERE INSIDE AN <svg>: the HTML parser closes the svg there and
//    the rest of the figure is lost.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const P1 = 'g9s-p1-measurements';
const P2 = 'g9s-p2-light';
const P3 = 'g9s-p3-energy';
const P4 = 'g9s-p4-motion';
const P5 = 'g9s-p5-electricity';
const IQ = 'g9s-inquiry';

// ── A speed–time graph, axes 0–12 s and 0–12 m/s with printed ticks, so every
//    value on the line can be read off exactly rather than estimated.
const speedTimeGraph = (() => {
  const X0 = 42, Y0 = 128, X1 = 232, Y1 = 18;
  const sx = t => X0 + (t / 12) * (X1 - X0);
  const sy = v => Y0 - (v / 12) * (Y0 - Y1);
  let g = '<svg viewBox="0 0 250 168" width="272" role="img" aria-label="a speed-time graph">';
  for (let t = 0; t <= 12; t++) {
    g += '<line x1="' + sx(t).toFixed(1) + '" y1="' + Y1 + '" x2="' + sx(t).toFixed(1) +
         '" y2="' + Y0 + '" stroke="#e2e8f0" stroke-width="1"/>';
  }
  for (let v = 0; v <= 12; v += 2) {
    g += '<line x1="' + X0 + '" y1="' + sy(v).toFixed(1) + '" x2="' + X1 + '" y2="' +
         sy(v).toFixed(1) + '" stroke="#e2e8f0" stroke-width="1"/>';
  }
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" stroke="#0f172a" stroke-width="2"/>';
  for (let t = 0; t <= 12; t += 2) {
    g += '<text x="' + sx(t).toFixed(1) + '" y="' + (Y0 + 12) + '" font-size="9" text-anchor="middle" fill="#334155">' + t + '</text>';
  }
  for (let v = 0; v <= 12; v += 2) {
    g += '<text x="' + (X0 - 5) + '" y="' + (sy(v) + 3).toFixed(1) + '" font-size="9" text-anchor="end" fill="#334155">' + v + '</text>';
  }
  g += '<text x="137" y="153" font-size="9" text-anchor="middle" fill="#334155">time / s</text>';
  g += '<text x="12" y="73" font-size="9" text-anchor="middle" fill="#334155" transform="rotate(-90 12 73)">speed / m per s</text>';
  const pts = [[0, 0], [4, 12], [8, 12], [12, 0]];
  const d = pts.map((p, i) => (i ? 'L' : 'M') + sx(p[0]).toFixed(1) + ' ' + sy(p[1]).toFixed(1)).join(' ');
  g += '<path d="' + d + '" fill="none" stroke="#b91c1c" stroke-width="2.5"/>';
  return g + '</svg>';
})();

// ── A series circuit: supply, then two labelled resistors along the top wire.
const seriesCircuit = (r1, r2, volts) => {
  let g = '<svg viewBox="0 0 240 142" width="260" role="img" aria-label="a circuit diagram">';
  g += '<path d="M30 30 H70 M106 30 H140 M176 30 H210 M210 30 V110 M210 110 H130 M112 110 H30 M30 110 V30" ' +
       'fill="none" stroke="#0f172a" stroke-width="2"/>';
  g += '<rect x="70" y="22" width="36" height="16" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>';
  g += '<rect x="140" y="22" width="36" height="16" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="122" y1="98" x2="122" y2="122" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="112" y1="104" x2="112" y2="116" stroke="#0f172a" stroke-width="3"/>';
  g += '<line x1="130" y1="110" x2="122" y2="110" stroke="#0f172a" stroke-width="2"/>';
  g += '<text x="88" y="16" font-size="10" text-anchor="middle" fill="#334155">' + r1 + ' &Omega;</text>';
  g += '<text x="158" y="16" font-size="10" text-anchor="middle" fill="#334155">' + r2 + ' &Omega;</text>';
  g += '<text x="117" y="136" font-size="10" text-anchor="middle" fill="#334155">' + volts + ' V</text>';
  return g + '</svg>';
};

// ── A ray meeting a plane mirror. The angle printed is the one between the ray
//    and the mirror SURFACE, which is exactly what the family is about, so it
//    is drawn and labelled and the normal is shown dashed.
const mirrorRay = (() => {
  let g = '<svg viewBox="0 0 230 132" width="250" role="img" aria-label="a diagram of a light ray and a mirror">';
  g += '<line x1="25" y1="95" x2="205" y2="95" stroke="#0f172a" stroke-width="3"/>';
  for (let x = 33; x <= 205; x += 12) {
    g += '<line x1="' + x + '" y1="95" x2="' + (x - 7) + '" y2="102" stroke="#94a3b8" stroke-width="1.5"/>';
  }
  g += '<line x1="115" y1="95" x2="115" y2="20" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5 4"/>';
  g += '<text x="122" y="26" font-size="9" fill="#64748b">normal</text>';
  g += '<line x1="37.1" y1="50" x2="115" y2="95" stroke="#b91c1c" stroke-width="2.5"/>';
  g += '<polygon points="81.2,75.5 71.7,74.0 75.2,68.0" fill="#b91c1c"/>';
  g += '<path d="M89 95 A26 26 0 0 1 92.5 82" fill="none" stroke="#334155" stroke-width="1.5"/>';
  g += '<text x="95" y="91" font-size="9" text-anchor="middle" fill="#334155">30&deg;</text>';
  g += '<text x="115" y="120" font-size="9" text-anchor="middle" fill="#64748b">plane mirror</text>';
  return g + '</svg>';
})();

// ── A rectangular field, with the corner the walker starts from marked.
const field = (() => {
  let g = '<svg viewBox="0 0 220 138" width="240" role="img" aria-label="a plan of a rectangular field">';
  g += '<rect x="35" y="25" width="150" height="85" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>';
  g += '<text x="110" y="18" font-size="10" text-anchor="middle" fill="#334155">80 m</text>';
  g += '<text x="192" y="71" font-size="10" fill="#334155">60 m</text>';
  g += '<circle cx="35" cy="110" r="4" fill="#b91c1c"/>';
  g += '<text x="42" y="126" font-size="9" fill="#334155">start and finish</text>';
  return g + '</svg>';
})();

const SOURCE_TABLE =
  '<table class="q-table"><tr><th>Source</th><th>Output / kWh per day</th><th>Fuel cost / Rs per day</th><th>Pollution</th></tr>' +
  '<tr><td>Diesel generator</td><td>500</td><td>4000</td><td>High</td></tr>' +
  '<tr><td>Solar panels</td><td>450</td><td>0</td><td>None</td></tr>' +
  '<tr><td>Bagasse boiler</td><td>300</td><td>900</td><td>Moderate</td></tr></table>';

const SPRING_TABLE =
  '<table class="q-table"><tr><th>Load / N</th><th>0</th><th>1.0</th><th>2.0</th><th>3.0</th><th>4.0</th><th>5.0</th></tr>' +
  '<tr><td>Length of spring / cm</td><td>20.0</td><td>22.0</td><td>24.0</td><td>26.0</td><td>28.0</td><td>31.0</td></tr></table>';


STATIC_QUESTIONS.push(

// ── Family 001 · P4 · one speed–time graph, read then reasoned about ────────
makeNum({ id: 'g9s-pfam-001-a', chapterId: P4, subsection: 'speed_time_graphs', difficulty: 2,
  question: 'The graph shows how the speed of a bus changed over 12 s. Read from the graph the speed of the bus, in m/s, at a time of 10 s.<br>' + speedTimeGraph,
  answer: 6,
  hint: 'Go up from 10 on the time axis until you meet the graph line, then across.',
  explanation: 'At 10 s the line is on its way down and crosses the gridline at 6 m/s. The common mistake is to read the time axis and answer 10, or to give 12 because that is the highest point on the graph. Always go <b>up from the time, then across to the speed axis</b>.' }),

makeNum({ id: 'g9s-pfam-001-b', chapterId: P4, subsection: 'speed_time_graphs', difficulty: 2,
  question: 'The graph shows how the speed of a bus changed over 12 s. Calculate the acceleration of the bus during the first 4 s, in m/s&sup2;.<br>' + speedTimeGraph,
  answer: 3,
  hint: 'Acceleration is the change in speed divided by the time taken.',
  explanation: 'The speed rises from 0 to 12 m/s in 4 s, so acceleration = 12 &divide; 4 = <b>3 m/s&sup2;</b>. The usual error is to divide by the whole 12 s of the journey (giving 1) instead of by the 4 s over which the speed was actually changing.' }),

makeMCQ({ id: 'g9s-pfam-001-c', chapterId: P4, subsection: 'speed_time_graphs', difficulty: 3,
  question: 'The graph shows how the speed of a bus changed over 12 s. A pupil says: &ldquo;Between 4 s and 8 s the line is flat, so the bus was standing still.&rdquo; Is the pupil right?<br>' + speedTimeGraph,
  options: ['Wrong &mdash; a flat line here means the speed is not changing',
            'Wrong &mdash; a flat line means the bus is speeding up steadily',
            'Right &mdash; a flat line on any motion graph means no movement',
            'Right &mdash; the bus only moves while the line is sloping'],
  answer: 'Wrong &mdash; a flat line here means the speed is not changing',
  hint: 'Look at what the vertical axis of this graph measures.',
  explanation: 'The misconception is carrying over the rule from a <b>distance</b>&ndash;time graph, where a flat line does mean at rest. Here the vertical axis is <b>speed</b>, so a flat line means a steady speed &mdash; 12 m/s for those 4 s. Always read the axis label before deciding what a flat line means.' }),

makeNum({ id: 'g9s-pfam-001-d', chapterId: P4, subsection: 'speed_time_graphs', difficulty: 3,
  question: 'The graph shows how the speed of a bus changed over 12 s. Calculate the total distance travelled by the bus, in metres.<br>' + speedTimeGraph,
  answer: 96,
  hint: 'Distance is the area under a speed-time graph. Split the shape into three parts.',
  explanation: 'Area = triangle + rectangle + triangle = (&frac12; &times; 4 &times; 12) + (4 &times; 12) + (&frac12; &times; 4 &times; 12) = 24 + 48 + 24 = <b>96 m</b>. The common mistake is to multiply the highest speed by the total time (12 &times; 12 = 144 m), which counts the two sloping parts as though the bus were at full speed throughout.' }),

makeMCQ({ id: 'g9s-pfam-001-e', chapterId: P4, subsection: 'speed_time_graphs', difficulty: 4,
  question: 'The graph shows how the speed of a bus changed over 12 s. The driver claims: &ldquo;My average speed for those 12 s was 12 m/s, because that is the speed I held for most of the trip.&rdquo; Is the claim correct?<br>' + speedTimeGraph,
  options: ['No &mdash; the average is 8 m/s: total distance over total time',
            'No &mdash; the average is 6 m/s, halfway between 0 and 12 m/s',
            'Yes &mdash; 12 m/s is the highest speed the bus reached',
            'Yes &mdash; 12 m/s was held longer than any other speed'],
  answer: 'No &mdash; the average is 8 m/s: total distance over total time',
  hint: 'Average speed is always total distance divided by total time.',
  explanation: 'The area under the line gives 96 m in 12 s, so the average speed is 96 &divide; 12 = <b>8 m/s</b>. Two misconceptions are checked here: taking the speed the object held longest as the average, and averaging the first and last speeds. Neither works unless the speed changes at a steady rate for the whole journey.' }),

// ── Family 002 · P4 · speed with a unit conversion in the way ───────────────
makeMCQ({ id: 'g9s-pfam-002-a', chapterId: P4, subsection: 'speed_velocity', difficulty: 2,
  question: 'A cyclist rides 3.6 km along a straight road in 4 minutes. What is the cyclist\'s average speed in m/s?',
  options: ['15 m/s', '0.9 m/s', '54 m/s', '900 m/s'],
  answer: '15 m/s',
  hint: 'Convert BOTH quantities to SI units before dividing.',
  explanation: '3.6 km = 3600 m and 4 minutes = 240 s, so speed = 3600 &divide; 240 = <b>15 m/s</b>. The misconception is dividing before converting: 3.6 &divide; 4 gives 0.9, and converting the distance only gives 3600 &divide; 4 = 900. Convert every quantity to metres and seconds first, then divide.' }),

makeNum({ id: 'g9s-pfam-002-b', chapterId: P4, subsection: 'speed_velocity', difficulty: 2,
  question: 'A car travels along a straight road at a steady 20 m/s for 5 minutes. How far does it travel, in kilometres?',
  answer: 6,
  hint: 'Work in metres and seconds first, then change the answer to km.',
  explanation: '5 minutes = 300 s, so distance = 20 &times; 300 = 6000 m = <b>6 km</b>. The mistake here is multiplying 20 by 5 to get 100, which mixes a speed in metres per second with a time in minutes, and then forgetting that the question asked for kilometres.' }),

makeNum({ id: 'g9s-pfam-002-c', chapterId: P4, subsection: 'motion_problems', difficulty: 3,
  question: 'A bus covers 15 km at an average speed of 12.5 m/s. How long does the journey take, in minutes?',
  answer: 20,
  hint: 'Time = distance &divide; speed. Watch the units at both ends.',
  explanation: '15 km = 15 000 m, so time = 15 000 &divide; 12.5 = 1200 s, and 1200 &divide; 60 = <b>20 minutes</b>. This variant reverses the usual question: the speed is given and the time must be found. The common error is to divide 15 by 12.5 and answer 1.2, which mixes kilometres with metres per second.' }),

makeMCQ({ id: 'g9s-pfam-002-d', chapterId: P4, subsection: 'motion_problems', difficulty: 4,
  question: 'A driver must choose between two routes. Route A is 12 km long and can be driven at an average of 15 m/s. Route B is 9 km long but can be driven at an average of only 10 m/s. Which route is quicker, and by how much?',
  options: ['Route A, saving 100 s', 'Route A, saving 0.1 s', 'Route B, saving 100 s', 'Route B, saving 300 s'],
  answer: 'Route A, saving 100 s',
  hint: 'Find the time for each route separately, in seconds, before comparing.',
  explanation: 'Route A: 12 000 &divide; 15 = 800 s. Route B: 9000 &divide; 10 = 900 s. Route A is quicker by <b>100 s</b>. Two misconceptions are caught: assuming the shorter route must be quicker, and dividing kilometres by metres per second (12 &divide; 15 = 0.8 against 9 &divide; 10 = 0.9), which gives a difference of 0.1 in no meaningful unit at all.' }),

makeMCQ({ id: 'g9s-pfam-002-e', chapterId: P4, subsection: 'motion_problems', difficulty: 4,
  question: 'A runner covers a straight 100 m track in 12.5 s. A pupil works out 100 &divide; 12.5 = 8 and writes: &ldquo;The runner was moving at 8 m/s as she crossed the finish line.&rdquo; What is wrong with the pupil\'s statement?',
  options: ['8 m/s is her average for the run, not her speed at the line',
            '8 m/s should have been written as 0.08 km per second instead',
            'The time should be divided by the distance, not the other way',
            'The distance should be changed into kilometres before dividing'],
  answer: '8 m/s is her average for the run, not her speed at the line',
  hint: 'A runner starts from rest. Was she moving at the same speed the whole way?',
  explanation: 'Distance &divide; time gives the <b>average</b> speed for the journey. The runner starts from rest and speeds up, so her speed at the line is greater than 8 m/s. The misconception is treating an average as though it described every instant; nothing in the question tells us the speed at any single moment.' }),

// ── Family 003 · P1 · thickness of one sheet, and what a ruler can resolve ──
makeNum({ id: 'g9s-pfam-003-a', chapterId: P1, subsection: 'si_units', difficulty: 2,
  question: 'A pupil presses a stack of 50 identical sheets of paper together and measures its height as 5.0 mm with a ruler. Calculate the thickness of one sheet, in millimetres.',
  answer: 0.1,
  hint: 'Divide the height of the stack by the number of sheets in it.',
  explanation: '5.0 &divide; 50 = <b>0.1 mm</b>. The frequent slip is to divide the wrong way round (50 &divide; 5 = 10), which would make one sheet ten times thicker than the whole stack &mdash; always check that the answer for one item is smaller than the measurement for many.' }),

makeMCQ({ id: 'g9s-pfam-003-b', chapterId: P1, subsection: 'si_units', difficulty: 2,
  question: 'The same pupil measures a sheet of card and finds it is 0.4 mm thick. What is this thickness in metres?',
  options: ['0.0004 m', '0.004 m', '0.04 m', '0.4 m'],
  answer: '0.0004 m',
  hint: 'There are 1000 millimetres in one metre.',
  explanation: '0.4 &divide; 1000 = <b>0.0004 m</b>. The misconception is dividing by 100 (which converts centimetres, giving 0.004) or by 10, or simply rewriting the number with a new unit. Millimetres to metres is always a division by 1000, whatever the size of the number.' }),

makeMCQ({ id: 'g9s-pfam-003-c', chapterId: P1, subsection: 'accuracy_of_instruments', difficulty: 3,
  question: 'A ruler is marked in millimetres. Why does a pupil measure a stack of 50 sheets of paper and then divide, instead of measuring one sheet directly?',
  options: ['The ruler cannot resolve one sheet, but it can resolve fifty',
            'Fifty sheets are heavy enough for the ruler to read properly',
            'A single sheet is thicker when it is on its own in the air',
            'Fifty is an easier number to divide a measurement by'],
  answer: 'The ruler cannot resolve one sheet, but it can resolve fifty',
  hint: 'What is the smallest length this ruler can show?',
  explanation: 'The smallest division is 1 mm, and one sheet is far thinner than that, so the ruler would simply read 0 mm. Measuring fifty sheets gives a height the ruler can show, and dividing recovers the thickness of one. The misconception is thinking an instrument can measure anything if you look carefully enough &mdash; an instrument cannot show a length smaller than its smallest division.' }),

makeMCQ({ id: 'g9s-pfam-003-d', chapterId: P1, subsection: 'accuracy_of_instruments', difficulty: 4,
  question: 'Two pupils find the thickness of one sheet of the same paper. Pupil A measures a stack of 10 sheets; Pupil B measures a stack of 50 sheets. Both use the same millimetre ruler and both divide their measurement by the number of sheets. Whose value for one sheet is the more reliable, and why?',
  options: ['Pupil B, because the reading error is shared over more sheets',
            'Pupil A, because a shorter stack is easier to keep quite straight',
            'Pupil A, because there is less dividing to do at the end',
            'Neither, because the same ruler was used for both stacks'],
  answer: 'Pupil B, because the reading error is shared over more sheets',
  hint: 'Both readings are uncertain by about the same amount. What happens to that uncertainty when you divide?',
  explanation: 'Reading a millimetre ruler is uncertain by roughly the same small amount whichever stack is measured. Dividing by 50 shrinks that uncertainty five times more than dividing by 10 does, so Pupil B\'s value is the more reliable. The misconception is that using the same instrument must give the same reliability; what matters is how much of the measurement each single sheet contributes.' }),

makeText({ id: 'g9s-pfam-003-e', chapterId: P1, subsection: 'accuracy_of_instruments', difficulty: 2,
  question: 'A ruler is marked in millimetres. State the smallest length this ruler is able to measure.',
  answer: '1 mm',
  alsoAccept: ['1mm', '1 millimetre', 'one millimetre', '0.1 cm', '0.1cm', '1 millimeter'],
  hint: 'Give the size of one division on the scale, with its unit.',
  explanation: 'The smallest division on the scale is <b>1 mm</b>, so that is the smallest length the ruler can show. Pupils often answer &ldquo;30 cm&rdquo;, which is the longest length the ruler can measure, not the smallest &mdash; the two are easily confused.' }),

// ── Family 004 · P1 · a balance with a zero error, forwards and backwards ───
makeNum({ id: 'g9s-pfam-004-a', chapterId: P1, subsection: 'measurement_errors', difficulty: 2,
  question: 'With nothing on its pan, a top-pan balance reads &minus;0.4 g. A stone is placed on the pan and the balance reads 25.6 g. What is the true mass of the stone, in grams?',
  answer: 26,
  acceptableAnswers: ['26', '26.0'],
  hint: 'The balance reads 0.4 g too LOW for everything placed on it.',
  explanation: 'A zero error of &minus;0.4 g means every reading is 0.4 g too small, so the true mass is 25.6 + 0.4 = <b>26.0 g</b>. The misconception is always subtracting the zero error; the sign decides. Subtracting here would give 25.2 g and make the stone lighter still.' }),

makeNum({ id: 'g9s-pfam-004-b', chapterId: P1, subsection: 'measurement_errors', difficulty: 3,
  question: 'A standard mass, known to be exactly 50.0 g, is placed on a different balance. The balance reads 50.6 g. What is the zero error of this balance, in grams?',
  answer: 0.6,
  hint: 'Compare what the balance says with what the mass really is.',
  explanation: 'The balance reads 0.6 g more than the true mass, so its zero error is <b>+0.6 g</b>. This variant reverses the usual task: instead of correcting a reading, a known mass is used to find the fault. The mistake is to add the two numbers, or to report 50.6 as though it were the error rather than the reading.' }),

makeMCQ({ id: 'g9s-pfam-004-c', chapterId: P1, subsection: 'measurement_errors', difficulty: 4,
  question: 'A balance reads &minus;0.4 g with an empty pan. A pupil uses it to weigh an empty beaker (40.6 g), then pours water in and weighs it again (90.6 g). She writes: &ldquo;The water has a mass of 50.0 g, but I still have to correct for the zero error.&rdquo; Is a correction needed?',
  options: ['No &mdash; the offset is in both readings, so it cancels out',
            'Yes &mdash; add 0.4 g once, so the water has a mass of 50.4 g',
            'Yes &mdash; take 0.4 g off once, so the water is 49.6 g',
            'Yes &mdash; correct both readings, so the water is 50.8 g'],
  answer: 'No &mdash; the offset is in both readings, so it cancels out',
  hint: 'Correct both readings properly and see what the difference becomes.',
  explanation: 'Corrected, the readings are 41.0 g and 91.0 g, and 91.0 &minus; 41.0 = 50.0 g &mdash; the same answer as before. A fixed zero error shifts both readings by the same amount, so it disappears from any <b>difference</b>. The misconception is that a known error must always be applied; it must be applied to a single reading, but never to a difference of two readings from the same instrument.' }),

makeNum({ id: 'g9s-pfam-004-d', chapterId: P1, subsection: 'measurement_errors', difficulty: 3,
  question: 'A balance has a zero error of +0.3 g. Four identical marbles are placed on it together and it reads 25.5 g. What is the true mass of ONE marble, in grams?',
  answer: 6.3,
  hint: 'Correct the reading for the four marbles first, then share it out.',
  explanation: 'True total mass = 25.5 &minus; 0.3 = 25.2 g, and 25.2 &divide; 4 = <b>6.3 g</b>. The misconception is correcting after dividing, or correcting once for each marble: the balance was read once, so the 0.3 g is taken off once, before the sharing.' }),

// ── Family 005 · P5 · Q = It and W = QV, with minutes to convert ────────────
makeNum({ id: 'g9s-pfam-005-a', chapterId: P5, subsection: 'charge_and_current', difficulty: 2,
  question: 'A current of 0.4 A flows through a torch bulb for 5 minutes. Calculate the charge that passes through the bulb, in coulombs.',
  answer: 120,
  hint: 'Q = It, and t must be in seconds.',
  explanation: '5 minutes = 300 s, so Q = 0.4 &times; 300 = <b>120 C</b>. The misconception is using the time in minutes: 0.4 &times; 5 gives 2, which is 60 times too small. In Q = It the time is always in seconds.' }),

makeNum({ id: 'g9s-pfam-005-b', chapterId: P5, subsection: 'charge_and_current', difficulty: 2,
  question: 'A charge of 1500 C passes through a lamp in 5 minutes. Calculate the current in the lamp, in amperes.',
  answer: 5,
  hint: 'Rearrange Q = It to find I, and convert the time first.',
  explanation: '5 minutes = 300 s, so I = Q &divide; t = 1500 &divide; 300 = <b>5 A</b>. This reverses the previous task: the charge is given and the current must be found. Dividing by 5 instead of 300 gives 300 A, a current far larger than any household circuit carries &mdash; a good sign that the conversion was missed.' }),

makeNum({ id: 'g9s-pfam-005-c', chapterId: P5, subsection: 'potential_difference', difficulty: 3,
  question: 'A current of 0.5 A flows through a lamp for 4 minutes. The potential difference across the lamp is 12 V. Calculate the energy transferred by the lamp, in joules.',
  answer: 1440,
  hint: 'Find the charge with Q = It first, then use W = QV.',
  explanation: '4 minutes = 240 s, so Q = 0.5 &times; 240 = 120 C, and W = QV = 120 &times; 12 = <b>1440 J</b>. Two steps are needed, and the usual failure is to jump straight to a single multiplication of the three given numbers with the time left in minutes.' }),

makeMCQ({ id: 'g9s-pfam-005-d', chapterId: P5, subsection: 'potential_difference', difficulty: 4,
  question: 'Lamp X carries a current of 0.5 A with a potential difference of 12 V across it. Lamp Y carries a current of 1.5 A with a potential difference of 4 V across it. Each is switched on for 3 minutes. Which lamp transfers more energy?',
  options: ['Both transfer 1080 J, because current times voltage is equal',
            'Lamp Y, because the bigger current carries the most energy',
            'Lamp X, because the bigger voltage gives each coulomb more',
            'It cannot be decided without the resistance of each lamp'],
  answer: 'Both transfer 1080 J, because current times voltage is equal',
  hint: 'Work out the charge for each lamp, then the energy for each lamp.',
  explanation: 'X: Q = 0.5 &times; 180 = 90 C and W = 90 &times; 12 = 1080 J. Y: Q = 1.5 &times; 180 = 270 C and W = 270 &times; 4 = 1080 J. They are <b>equal</b>. The apparent contradiction &mdash; very different currents and voltages &mdash; is resolved because energy depends on the product, not on either quantity alone. Judging by current or by voltage on its own is the misconception.' }),

makeText({ id: 'g9s-pfam-005-e', chapterId: P5, subsection: 'potential_difference', difficulty: 2,
  question: 'Complete this sentence with one word: a potential difference of 1 volt transfers 1 joule of energy for every 1 ______ of charge that moves between the two points.',
  answer: 'coulomb',
  alsoAccept: ['C', 'coulombs', '1 coulomb', 'a coulomb'],
  hint: 'Give the unit that charge is measured in.',
  explanation: 'One volt means one joule per <b>coulomb</b>: W = QV rearranges to V = W &divide; Q. Pupils often answer &ldquo;ampere&rdquo;, but the ampere is the unit of current &mdash; the rate of flow of charge &mdash; not the unit of charge itself.' }),

// ── Family 006 · P5 · one series circuit, then one component changed ────────
makeNum({ id: 'g9s-pfam-006-a', chapterId: P5, subsection: 'dc_circuit_problems', difficulty: 2,
  question: 'The circuit diagram shows two resistors connected in series with a 12 V supply. Calculate the total resistance of the circuit, in ohms.<br>' + seriesCircuit(4, 8, 12),
  answer: 12,
  hint: 'In series, the resistances simply add.',
  explanation: '4 + 8 = <b>12 &Omega;</b>. In a series circuit the resistances add because the current has to pass through both components one after the other. The misconception is averaging them (giving 6 &Omega;), which is never how series resistances combine.' }),

makeNum({ id: 'g9s-pfam-006-b', chapterId: P5, subsection: 'dc_circuit_problems', difficulty: 2,
  question: 'The circuit diagram shows two resistors connected in series with a 12 V supply. Calculate the current in the circuit, in amperes.<br>' + seriesCircuit(4, 8, 12),
  answer: 1,
  acceptableAnswers: ['1', '1.0'],
  hint: 'Find the total resistance first, then use I = V &divide; R.',
  explanation: 'Total resistance = 4 + 8 = 12 &Omega;, so I = 12 &divide; 12 = <b>1 A</b>. The common error is to use only one of the resistors, giving 12 &divide; 4 = 3 A. The supply voltage drives current through the whole circuit, so the whole resistance must be used.' }),

makeNum({ id: 'g9s-pfam-006-c', chapterId: P5, subsection: 'dc_circuit_problems', difficulty: 3,
  question: 'The circuit diagram shows two resistors connected in series with a 12 V supply. Calculate the potential difference across the 8 &Omega; resistor, in volts.<br>' + seriesCircuit(4, 8, 12),
  answer: 8,
  acceptableAnswers: ['8', '8.0'],
  hint: 'Find the current in the circuit first, then use V = IR for that one resistor.',
  explanation: 'Total resistance = 12 &Omega;, so the current is 12 &divide; 12 = 1 A. Across the 8 &Omega; resistor, V = 1 &times; 8 = <b>8 V</b>. The misconception is sharing the supply equally between the two components and answering 6 V; the supply is shared in proportion to the resistances, not equally, unless the resistances happen to be equal.' }),

makeMCQ({ id: 'g9s-pfam-006-d', chapterId: P5, subsection: 'dc_circuit_problems', difficulty: 4,
  question: 'A 4 &Omega; and an 8 &Omega; resistor are connected in series with a 12 V supply. The 4 &Omega; resistor is then replaced by a second 8 &Omega; resistor, with the supply unchanged. What happens to the current in the circuit, and to the potential difference across the original 8 &Omega; resistor?',
  options: ['Both the current and that p.d. become smaller',
            'The current becomes smaller but that p.d. is unchanged',
            'The current is unchanged but that p.d. becomes smaller',
            'Both the current and that p.d. become larger'],
  answer: 'Both the current and that p.d. become smaller',
  hint: 'Work out the new total resistance, then the new current, then V = IR for the unchanged resistor.',
  explanation: 'The total resistance rises from 12 &Omega; to 16 &Omega;, so the current falls from 1 A to 0.75 A. The 8 &Omega; resistor is unchanged, but V = IR uses the <b>new smaller current</b>, so its p.d. falls from 8 V to 6 V. The misconception is that a component whose resistance has not changed must keep the same p.d.; in a series circuit every component is affected by a change anywhere in the loop.' }),

// ── Family 007 · P2 · one ray on a plane mirror ────────────────────────────
makeNum({ id: 'g9s-pfam-007-a', chapterId: P2, subsection: 'laws_of_reflection', difficulty: 2,
  question: 'A ray of light strikes a plane mirror. The angle between the ray and the mirror surface is 30&deg;, as marked. What is the angle of incidence, in degrees?<br>' + mirrorRay,
  answer: 60,
  hint: 'The angle of incidence is measured from the normal, not from the mirror.',
  explanation: 'The normal is at 90&deg; to the mirror, so the angle of incidence = 90 &minus; 30 = <b>60&deg;</b>. The misconception this checks is the commonest one in the whole topic: reading the angle from the mirror surface and answering 30&deg;. Angles of incidence and reflection are <b>always</b> measured from the normal.' }),

makeNum({ id: 'g9s-pfam-007-b', chapterId: P2, subsection: 'laws_of_reflection', difficulty: 3,
  question: 'A ray of light strikes a plane mirror. The angle between the ray and the mirror surface is 30&deg;, as marked. What is the angle between the incident ray and the reflected ray, in degrees?<br>' + mirrorRay,
  answer: 120,
  hint: 'Find the angle of incidence first. The normal sits between the two rays.',
  explanation: 'The angle of incidence is 90 &minus; 30 = 60&deg;, and the angle of reflection equals it. The normal lies between the two rays, so the angle between them is 60 + 60 = <b>120&deg;</b>. Answering 60&deg; treats the angle between the rays as the same as the angle of reflection, which forgets that the normal separates them.' }),

makeText({ id: 'g9s-pfam-007-c', chapterId: P2, subsection: 'laws_of_reflection', difficulty: 2,
  question: 'A ray of light strikes a plane mirror. Give the name of the line drawn at right angles to the mirror at the point where the ray meets it.',
  answer: 'normal',
  alsoAccept: ['the normal', 'normal line', 'the normal line'],
  hint: 'It is the line every angle in reflection is measured from.',
  explanation: 'It is called the <b>normal</b>. Pupils sometimes answer &ldquo;perpendicular&rdquo; or &ldquo;vertical&rdquo;; the normal is perpendicular to the mirror, but it is only vertical if the mirror happens to be horizontal, so the name of the line and its direction are not the same thing.' }),

makeMCQ({ id: 'g9s-pfam-007-e', chapterId: P2, subsection: 'reflection', difficulty: 4,
  question: 'A pupil argues: &ldquo;The laws of reflection cannot be true for a rough painted wall, because I can see my face in a mirror but never in a wall.&rdquo; Which statement resolves this?',
  options: ['They hold, but an uneven surface scatters the rays everywhere',
            'They hold only for smooth surfaces such as glass and mirrors',
            'They fail because a rough wall absorbs nearly all of the light',
            'They fail because the angle of reflection is bigger at a wall'],
  answer: 'They hold, but an uneven surface scatters the rays everywhere',
  hint: 'Think about the direction of the normal at each tiny part of a rough surface.',
  explanation: 'A rough wall is a mass of tiny tilted surfaces, so the normal points a different way at each one. Every single ray still obeys the laws exactly, but parallel rays leave in many directions and no image forms &mdash; this is diffuse reflection. The misconception is that a law which does not produce the familiar result must have stopped applying; here it applies at every point, and the surface shape explains the difference.' }),

// ── Family 008 · P3 · choosing an electricity supply from a table ───────────
makeMCQ({ id: 'g9s-pfam-008-a', chapterId: P3, subsection: 'comparing_energy_sources', difficulty: 2,
  question: 'A village needs 400 kWh of electrical energy each day. The table shows three possible supplies.' + SOURCE_TABLE + 'Which single source could meet the whole daily need on its own at the lowest fuel cost?',
  options: ['The solar panels', 'The diesel generator', 'The bagasse boiler', 'No single source can'],
  answer: 'The solar panels',
  hint: 'First rule out any source that cannot reach 400 kWh a day, then compare the cost of the rest.',
  explanation: 'The bagasse boiler makes only 300 kWh, so it is ruled out at once. Of the two that reach 400 kWh, the solar panels cost Rs 0 in fuel against Rs 4000, so the <b>solar panels</b> win. The misconception is comparing on cost alone and picking the cheapest row without first checking it meets the requirement.' }),

makeNum({ id: 'g9s-pfam-008-b', chapterId: P3, subsection: 'comparing_energy_sources', difficulty: 3,
  question: 'A village needs 400 kWh of electrical energy each day, of which 150 kWh is used between 18:00 and 06:00. The table shows three possible supplies.' + SOURCE_TABLE + 'The village installs the solar panels and no batteries. How many kWh each day must still come from another source?',
  answer: 150,
  hint: 'What can solar panels supply after dark?',
  explanation: 'Solar panels produce nothing at night, and there is no battery to store the daytime surplus, so the whole <b>150 kWh</b> of night-time demand must come from elsewhere. The misconception is comparing daily totals only: 450 kWh looks like plenty against 400 kWh, but a daily total hides <b>when</b> the energy arrives.' }),

makeMCQ({ id: 'g9s-pfam-008-c', chapterId: P3, subsection: 'comparing_energy_sources', difficulty: 4,
  question: 'A village needs 400 kWh of electrical energy each day, of which 150 kWh is used between 18:00 and 06:00. No batteries are to be installed.' + SOURCE_TABLE + 'A councillor claims: &ldquo;Solar is obviously the answer &mdash; it makes more than we need and the fuel costs nothing.&rdquo; What does the claim overlook?',
  options: ['It ignores that the panels give nothing during the night hours',
            'It ignores that solar panels release pollution while working',
            'It ignores that the daily output is below the daily demand',
            'It ignores that solar fuel has to be bought like any other'],
  answer: 'It ignores that the panels give nothing during the night hours',
  hint: 'Both facts in the claim are true. Is the conclusion still safe?',
  explanation: 'Every figure the councillor quotes is correct, yet the conclusion fails: with no batteries the 150 kWh used after dark cannot come from panels, so a second source is still needed. The misconception is treating a daily total as if it guaranteed supply at every hour &mdash; a true premise can still support a wrong decision.' }),

makeMCQ({ id: 'g9s-pfam-008-d', chapterId: P3, subsection: 'comparing_energy_sources', difficulty: 4,
  question: 'A village must choose between the diesel generator and the bagasse boiler to run overnight, and wants the cheapest choice over ten years.' + SOURCE_TABLE + 'Which piece of information is still missing from the table before that decision can be made?',
  options: ['What it costs to buy and install each of the two',
            'How many kWh each of the two produces in a day',
            'How much the fuel for each of the two costs a day',
            'How many hours of sunshine the village gets a day'],
  answer: 'What it costs to buy and install each of the two',
  hint: 'Read the table again and cross off anything it already tells you.',
  explanation: 'Daily output and daily fuel cost are both printed in the table, and hours of sunshine are irrelevant to a diesel generator and a bagasse boiler. Only the <b>purchase and installation cost</b> is missing, and over ten years it can outweigh fuel. The misconception is deciding from whatever data is in front of you without first asking what a ten-year cost actually needs.' }),

// ── Family 009 · P3 · a falling object, and one that refuses to cooperate ───
makeMCQ({ id: 'g9s-pfam-009-a', chapterId: P3, subsection: 'conservation_of_energy', difficulty: 2,
  question: 'A ball is dropped from the top of a wall and falls freely towards the ground. Which statement describes the main energy transfer while the ball is falling?',
  options: ['The gravitational store empties and the kinetic store fills',
            'The kinetic store empties and the gravitational store fills',
            'Both the gravitational and the kinetic stores empty together',
            'Both the gravitational and the kinetic stores fill together'],
  answer: 'The gravitational store empties and the kinetic store fills',
  hint: 'The ball is getting lower and getting faster at the same time.',
  explanation: 'As the ball falls it loses height and gains speed, so the gravitational store empties into the kinetic store. The misconception is reversing the two, which describes a ball thrown <b>upwards</b> instead. Ask which quantity is decreasing &mdash; height here &mdash; and that names the store being emptied.' }),

makeMCQ({ id: 'g9s-pfam-009-b', chapterId: P3, subsection: 'conservation_of_energy', difficulty: 3,
  question: 'A ball is dropped onto a hard floor. It bounces back, but only to about half the height it was dropped from. Why does it not return to its starting height?',
  options: ['Energy is transferred to thermal and sound stores at the bounce',
            'Some of the energy in the ball is destroyed as it hits the floor',
            'Gravity becomes weaker each time the ball leaves the ground',
            'The ball loses some of its mass to the floor as it bounces'],
  answer: 'Energy is transferred to thermal and sound stores at the bounce',
  hint: 'You can hear the bounce, and the ball warms slightly. Where has the energy gone?',
  explanation: 'Energy is never destroyed; at the bounce some is transferred to thermal and sound stores in the ball and the floor, so less is left in the gravitational store and the ball rises lower. The misconception is that energy &ldquo;disappears&rdquo; or is &ldquo;used up&rdquo; &mdash; conservation of energy means it has gone somewhere, and here you can hear and feel where.' }),

makeMCQ({ id: 'g9s-pfam-009-c', chapterId: P3, subsection: 'energy_problems', difficulty: 4,
  question: 'A marble and a flat sheet of paper are released together from the same height. The marble lands first. The sheet is then crumpled into a tight ball, with nothing added or taken away, and the two are released together again &mdash; this time they land together. What best explains what happened?',
  options: ['Air resistance is far larger on the flat sheet than on the tight ball',
            'Squeezing the paper into a ball makes it heavier than it was before',
            'Gravity pulls more strongly on a compact shape than on a flat one',
            'The flat sheet stores some of its energy as elastic energy as it falls'],
  answer: 'Air resistance is far larger on the flat sheet than on the tight ball',
  hint: 'Nothing about the paper changed except its shape. What else pushes on a falling object?',
  explanation: 'The paper\'s mass is identical before and after crumpling, so mass cannot be the cause; only the area facing the air changed. A wide flat sheet meets much more air resistance, which is why it drifts down slowly. The misconception is that heavier objects always fall faster &mdash; the difference here is caused by the air, not by weight.' }),

makeText({ id: 'g9s-pfam-009-d', chapterId: P3, subsection: 'conservation_of_energy', difficulty: 2,
  question: 'A stone falls freely from a cliff. As it falls, one energy store is filling up. Name that store.',
  answer: 'kinetic',
  alsoAccept: ['kinetic store', 'the kinetic store', 'kinetic energy', 'the kinetic energy', 'KE', 'kinetic energy store'],
  hint: 'It is the store an object has because it is moving.',
  explanation: 'The <b>kinetic</b> store fills as the stone speeds up. A frequent answer is &ldquo;gravitational&rdquo;, but that store is <b>emptying</b> as the stone loses height &mdash; the question asks which one is filling.' }),

// ── Family 010 · Inquiry · one set of results, read then judged ─────────────
makeNum({ id: 'g9s-pfam-010-a', chapterId: IQ, subsection: 'interpreting_results', difficulty: 2,
  question: 'A pupil hangs loads on a spring and measures its length each time.' + SPRING_TABLE + 'What is the extension of the spring, in cm, when the load is 3.0 N?',
  answer: 6,
  acceptableAnswers: ['6', '6.0'],
  hint: 'Extension is how much LONGER the spring has become.',
  explanation: 'Extension = length with the load &minus; length with no load = 26.0 &minus; 20.0 = <b>6.0 cm</b>. The misconception this checks is reading the table straight off and answering 26.0 cm, which is the spring\'s length, not its extension. Extension is always measured from the unloaded length.' }),

makeNum({ id: 'g9s-pfam-010-b', chapterId: IQ, subsection: 'interpreting_results', difficulty: 3,
  question: 'A pupil hangs loads on a spring and measures its length each time.' + SPRING_TABLE + 'Assuming the pattern of the first four loaded readings continues, predict the extension, in cm, for a load of 2.5 N.',
  answer: 5,
  acceptableAnswers: ['5', '5.0'],
  hint: 'Work out the extension for 1.0 N first, then scale it.',
  explanation: 'From 1.0 N to 4.0 N each newton adds 2.0 cm of extension, so 2.5 N gives 2.5 &times; 2.0 = <b>5.0 cm</b>. The mistake is to predict a length instead of an extension and answer 25.0 cm, or to read halfway between two table lengths without subtracting the unloaded length first.' }),

makeMCQ({ id: 'g9s-pfam-010-c', chapterId: IQ, subsection: 'interpreting_results', difficulty: 4,
  question: 'A pupil hangs loads on a spring and measures its length each time. She repeated the 5.0 N reading three times and got 31.0 cm every time.' + SPRING_TABLE + 'She claims the extension stays in proportion to the load right across her results. Does the evidence support that claim?',
  options: ['No &mdash; the extension per newton is larger for the last load',
            'Yes &mdash; each extension is larger than the one before it',
            'Yes &mdash; the extension divided by the load is the same all through',
            'No &mdash; the row with no load cannot be used in the comparison'],
  answer: 'No &mdash; the extension per newton is larger for the last load',
  hint: 'Work out extension &divide; load for every loaded row and compare the values.',
  explanation: 'Extension &divide; load is 2.0 cm/N for 1.0 N to 4.0 N, but at 5.0 N the extension is 11.0 cm and 11.0 &divide; 5.0 = 2.2 cm/N. The spring has stretched further than proportion allows, so the claim holds only up to 4.0 N. Two misconceptions are checked: that any rising set of readings shows proportionality, and that a single odd point must be a mistake &mdash; here it was repeated three times and is real.' }),

makeText({ id: 'g9s-pfam-010-d', chapterId: IQ, subsection: 'recording_data', difficulty: 2,
  question: 'A pupil draws a results table and heads one column with the single word <b>Extension</b>. State the one thing that must be added to that heading before the table is complete.',
  answer: 'the unit',
  alsoAccept: ['unit', 'a unit', 'units', 'the units', 'its unit', 'the unit cm', 'the unit (cm)', 'cm'],
  hint: 'Compare it with the way the load column is headed.',
  explanation: 'A heading must carry the quantity <b>and its unit</b>, written as Extension / cm. Without it a reader cannot tell whether 6.0 means centimetres, millimetres or metres. The misconception is writing the unit beside every number in the column instead: the unit belongs in the heading once, and the cells hold numbers only.' }),

// ── Family 011 · P4 · one lap of a field: distance against displacement ─────
makeNum({ id: 'g9s-pfam-011-a', chapterId: P4, subsection: 'distance_displacement', difficulty: 2,
  question: 'A pupil walks once all the way round the edge of the rectangular field shown, starting and finishing at the marked corner. What total distance does she walk, in metres?<br>' + field,
  answer: 280,
  hint: 'Add the lengths of all four sides.',
  explanation: '80 + 60 + 80 + 60 = <b>280 m</b>. The usual slip is to add only the two labelled sides and answer 140 m, forgetting that a rectangle has two more sides of the same lengths.' }),

makeNum({ id: 'g9s-pfam-011-b', chapterId: P4, subsection: 'distance_displacement', difficulty: 2,
  question: 'A pupil walks once all the way round the edge of the rectangular field shown, starting and finishing at the marked corner. What is the magnitude of her displacement, in metres?<br>' + field,
  answer: 0,
  hint: 'Displacement is the straight line from where she started to where she ended.',
  explanation: 'She finishes exactly where she began, so the straight-line distance from start to finish is <b>0 m</b>. The misconception is that displacement must equal the distance walked; displacement depends only on the start and end points, and a complete loop always gives zero.' }),

makeMCQ({ id: 'g9s-pfam-011-c', chapterId: P4, subsection: 'speed_velocity', difficulty: 3,
  question: 'A pupil walks once all the way round the edge of a rectangular field measuring 80 m by 60 m, starting and finishing at the same corner. The lap takes her 56 s. What are her average speed and the magnitude of her average velocity?',
  options: ['Average speed 5 m/s and average velocity 0 m/s',
            'Average speed 5 m/s and average velocity 5 m/s',
            'Average speed 0 m/s and average velocity 5 m/s',
            'Average speed 0 m/s and average velocity 0 m/s'],
  answer: 'Average speed 5 m/s and average velocity 0 m/s',
  hint: 'Speed uses the distance travelled; velocity uses the displacement.',
  explanation: 'Distance = 280 m, so average speed = 280 &divide; 56 = 5 m/s. Displacement = 0, so average velocity = 0 &divide; 56 = 0 m/s. The apparent contradiction &mdash; she clearly moved, yet her average velocity is zero &mdash; is resolved by remembering that speed is a scalar built from distance and velocity is a vector built from displacement.' }),

makeMCQ({ id: 'g9s-pfam-011-d', chapterId: P4, subsection: 'distance_displacement', difficulty: 4,
  question: 'Two pupils cross a rectangular field measuring 80 m by 60 m. P walks once round the whole edge, 280 m, in 56 s and stops where she started. Q walks in a straight line along one 80 m side in 20 s and stops at the far corner. Which comparison is correct?',
  options: ['P has the greater average speed and Q the greater average velocity',
            'Q has the greater average speed and P the greater average velocity',
            'P has both the greater average speed and the greater average velocity',
            'Both had the same average speed and the same average velocity'],
  answer: 'P has the greater average speed and Q the greater average velocity',
  hint: 'Work out four numbers: a speed and a velocity for each pupil.',
  explanation: 'P: speed = 280 &divide; 56 = 5 m/s, velocity = 0 &divide; 56 = 0 m/s. Q: speed = 80 &divide; 20 = 4 m/s, velocity = 80 &divide; 20 = 4 m/s. So P is faster but gets nowhere, and Q is slower but has the greater velocity. The misconception is that whoever has the greater speed must also have the greater velocity; that is only true when the path is a straight line.' }),

// ── Family 012 · P5 · meters on a circuit, and what they actually show ──────
makeMCQ({ id: 'g9s-pfam-012-a', chapterId: P5, subsection: 'measuring_current_voltage', difficulty: 2,
  question: 'A pupil wants to measure both the current in a lamp and the potential difference across it. How should the two meters be connected?',
  options: ['The ammeter in series with the lamp and the voltmeter across it',
            'The voltmeter in series with the lamp and the ammeter across it',
            'Both the ammeter and the voltmeter in series with the lamp',
            'Both the ammeter and the voltmeter connected across the lamp'],
  answer: 'The ammeter in series with the lamp and the voltmeter across it',
  hint: 'Current passes THROUGH a component; potential difference is measured BETWEEN two points.',
  explanation: 'An ammeter must carry the same current as the lamp, so it goes in series; a voltmeter compares two points, so it goes across the lamp. The misconception is swapping them: an ammeter placed across a lamp has almost no resistance and short-circuits it, and a voltmeter placed in series has a very high resistance and nearly stops the current.' }),

makeMCQ({ id: 'g9s-pfam-012-b', chapterId: P5, subsection: 'measuring_current_voltage', difficulty: 3,
  question: 'Two identical lamps are connected in series with a cell. A pupil predicts that an ammeter placed after the second lamp will read less than one placed before the first lamp, &ldquo;because the lamps use up the current&rdquo;. In fact both ammeters read 0.25 A. Which statement explains the readings?',
  options: ['Current is the same all the way round a series circuit',
            'The two ammeters must both be faulty in the same way',
            'The second lamp gives back the current the first one used',
            'Current is used up only when the lamps are very bright'],
  answer: 'Current is the same all the way round a series circuit',
  hint: 'Think about what is flowing round the circuit, and whether it can pile up or vanish.',
  explanation: 'Charge is not consumed; it flows round the loop, so the current is the same at every point in a series circuit. What the lamps use up is <b>energy</b>, which shows as a potential difference across each lamp. The misconception is confusing the two: current is shared out equally along a series loop, energy is not.' }),

makeMCQ({ id: 'g9s-pfam-012-c', chapterId: P5, subsection: 'series_circuits', difficulty: 4,
  question: 'Three lamps are connected in series with a 9.0 V supply. Two of them are identical, and a voltmeter reads 2.5 V across each of those two. What is the potential difference across the third lamp, and what does that tell you about it?',
  options: ['4.0 V, and it has the largest resistance of the three',
            '4.0 V, and it has the smallest resistance of the three',
            '2.5 V, because the supply p.d. is shared out equally',
            '9.0 V, because the supply p.d. acts across every lamp'],
  answer: '4.0 V, and it has the largest resistance of the three',
  hint: 'The three potential differences must add up to the supply. Then remember the current is the same in all three.',
  explanation: '9.0 &minus; 2.5 &minus; 2.5 = <b>4.0 V</b>. The same current passes through all three lamps, so by V = IR the lamp with the largest p.d. must have the largest resistance. Two misconceptions are caught: that a supply is always shared equally, and that the full supply p.d. appears across each component in turn.' }),

makeText({ id: 'g9s-pfam-012-d', chapterId: P5, subsection: 'measuring_current_voltage', difficulty: 2,
  question: 'Give the name of the meter that must be connected across a lamp in order to measure the potential difference between its two ends.',
  answer: 'voltmeter',
  alsoAccept: ['a voltmeter', 'the voltmeter'],
  hint: 'Its name comes from the unit it reads.',
  explanation: 'A <b>voltmeter</b> measures potential difference in volts and is always connected across the component. The common wrong answer is &ldquo;ammeter&rdquo;, which measures current in amperes and is connected in series &mdash; naming the quantity a meter reads is the quickest way to remember which is which.' }),

// ── Family 013 · P4 · acceleration, forwards, backwards and compared ────────
makeNum({ id: 'g9s-pfam-013-a', chapterId: P4, subsection: 'acceleration', difficulty: 2,
  question: 'A lorry speeds up steadily from 4 m/s to 20 m/s in 8 s along a straight road. Calculate its acceleration, in m/s&sup2;.',
  answer: 2,
  acceptableAnswers: ['2', '2.0'],
  hint: 'Acceleration is the CHANGE in speed divided by the time taken.',
  explanation: 'Change in speed = 20 &minus; 4 = 16 m/s, so acceleration = 16 &divide; 8 = <b>2 m/s&sup2;</b>. The misconception is dividing the final speed by the time (20 &divide; 8 = 2.5), which ignores the fact that the lorry was already moving at 4 m/s when the timing began.' }),

makeNum({ id: 'g9s-pfam-013-b', chapterId: P4, subsection: 'acceleration', difficulty: 3,
  question: 'A lorry travelling at 20 m/s brakes steadily and comes to rest. Its deceleration is 2.5 m/s&sup2;. How long does it take to stop, in seconds?',
  answer: 8,
  acceptableAnswers: ['8', '8.0'],
  hint: 'Rearrange acceleration = change in speed &divide; time to find the time.',
  explanation: 'The speed changes by 20 m/s, so time = 20 &divide; 2.5 = <b>8 s</b>. This reverses the usual task: the acceleration is given and the time must be found. Multiplying instead of dividing gives 50 s, which is far longer than any lorry needs to stop &mdash; always check the answer is sensible.' }),

makeMCQ({ id: 'g9s-pfam-013-c', chapterId: P4, subsection: 'acceleration', difficulty: 3,
  question: 'A data logger on a car records an acceleration of &minus;3 m/s&sup2; while the car is travelling forwards along a straight road. What does the minus sign tell you about the car?',
  options: ['It is slowing down while still moving forwards',
            'It is moving backwards along the same straight road',
            'It has stopped moving and cannot start again',
            'It is speeding up in the opposite direction'],
  answer: 'It is slowing down while still moving forwards',
  hint: 'The sign belongs to the acceleration, not to the direction of travel.',
  explanation: 'A negative acceleration means the speed is decreasing; the car is still going forwards, just more slowly each second. The misconception is reading the minus sign as the direction of motion &mdash; the direction of travel is stated in the question, and it has not changed.' }),

makeMCQ({ id: 'g9s-pfam-013-d', chapterId: P4, subsection: 'acceleration', difficulty: 4,
  question: 'Car A speeds up from rest to 24 m/s in 6 s. Car B speeds up from 5 m/s to 29 m/s in 8 s. Both travel in a straight line. Which car has the greater acceleration?',
  options: ['Car A, because its speed rises by 4 m/s each second',
            'Car B, because it reaches the higher final speed',
            'Car B, because it keeps accelerating for longer',
            'Neither, because both gain the same 24 m/s overall'],
  answer: 'Car A, because its speed rises by 4 m/s each second',
  hint: 'Both cars gain the same amount of speed. What else does acceleration depend on?',
  explanation: 'A: 24 &divide; 6 = 4 m/s&sup2;. B: (29 &minus; 5) &divide; 8 = 24 &divide; 8 = 3 m/s&sup2;, so <b>Car A</b> accelerates more. The deliberate trap is that both gain exactly 24 m/s, so a pupil who compares only the change in speed calls them equal; acceleration is that change <b>per second</b>, so the time matters just as much.' })

);

})();
