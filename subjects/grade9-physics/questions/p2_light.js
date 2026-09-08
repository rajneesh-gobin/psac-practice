'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - P2 · Light   (examWeight 3)
//
//  ⚠ THE RAY DIAGRAM IS THE QUESTION. "Use ray diagrams to demonstrate
//    reflection" is a syllabus outcome, and the papers supply the diagram to be
//    read: which line is the normal, which angle is the angle of incidence,
//    where the reflected ray goes. Every figure here is inline SVG with the
//    mirror, the normal and the angles drawn, so the answer can be read off.
//
//  ⚠ THE NORMAL IS DRAWN DASHED AND THE RAYS SOLID, which is the convention the
//    papers use. A figure that draws them alike makes "which line is the
//    normal?" unanswerable - the same class of defect as the grade9-maths
//    figure that showed a perimeter question with an angle arc.
//
//  ⚠ ANGLES ARE MEASURED FROM THE NORMAL, NOT FROM THE MIRROR. That is the
//    single commonest error in this topic and several items test it directly,
//    so the figures label the normal explicitly rather than leaving it implied.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>. Italic
//    inside an svg is <tspan font-style="italic">.
//
//  Source: NCE Science (Physics) 2021-2023, 2025; NCF Grades 7-9 §P2.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-p2-light';

// A solid arrowhead at fraction `t` along the segment, pointing from 1 to 2.
const arrow = (x1, y1, x2, y2, t) => {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / len, uy = dy / len;
  const cx = x1 + dx * t, cy = y1 + dy * t;
  const tipX = cx + ux * 6, tipY = cy + uy * 6;
  const bx = cx - ux * 3, by = cy - uy * 3;
  const p = (a, b) => a.toFixed(1) + ',' + b.toFixed(1);
  return '<polygon points="' + p(tipX, tipY) + ' ' + p(bx - uy * 4.5, by + ux * 4.5) +
         ' ' + p(bx + uy * 4.5, by - ux * 4.5) + '" fill="#b91c1c"/>';
};

// ── Reflection at a plane mirror. `i` is the angle of incidence in degrees,
//    measured from the normal. Both rays are drawn to scale from that angle.
//    `show` picks which labels are printed, so one figure can ask several
//    different questions without ever printing its own answer.
const mirror = (i, show) => {
  show = show || {};
  const CX = 125, CY = 108, L = 78;
  const rad = i * Math.PI / 180;
  const ix = CX - L * Math.sin(rad), iy = CY - L * Math.cos(rad);
  const rx = CX + L * Math.sin(rad), ry = CY - L * Math.cos(rad);
  let g = '<svg viewBox="0 0 250 150" width="270" role="img" aria-label="a ray of light meeting a mirror">';
  g += '<line x1="25" y1="108" x2="225" y2="108" stroke="#0f172a" stroke-width="3"/>';
  for (let x = 30; x < 225; x += 12) {
    g += '<line x1="' + x + '" y1="108" x2="' + (x - 7) + '" y2="118" stroke="#94a3b8" stroke-width="1.5"/>';
  }
  g += '<line x1="' + CX + '" y1="108" x2="' + CX + '" y2="18" stroke="#475569" stroke-width="1.5" stroke-dasharray="5 4"/>';
  g += '<line x1="' + ix.toFixed(1) + '" y1="' + iy.toFixed(1) + '" x2="' + CX + '" y2="' + CY + '" stroke="#b91c1c" stroke-width="2.5"/>';
  g += '<line x1="' + CX + '" y1="' + CY + '" x2="' + rx.toFixed(1) + '" y2="' + ry.toFixed(1) + '" stroke="#b91c1c" stroke-width="2.5"/>';
  // ⚠ THE ARROWHEADS ARE LOAD-BEARING, NOT DECORATION. Without them the figure
  //   is symmetrical and nothing in it says which ray arrives and which leaves,
  //   so "which letter marks the incident ray?" has two equally good answers.
  //   Found by rendering the contact sheet and looking at it - the same class of
  //   defect as the grade9-maths figure that offered three angle relationships
  //   of which at most one could be true.
  g += arrow(ix, iy, CX, CY, 0.55);
  g += arrow(CX, CY, rx, ry, 0.45);
  if (show.normal) g += '<text x="' + (CX + 5) + '" y="26" font-size="9" fill="#475569">normal</text>';
  if (show.rays) {
    g += '<text x="' + (ix - 6).toFixed(1) + '" y="' + (iy - 4).toFixed(1) + '" font-size="9" text-anchor="end" fill="#b91c1c">P</text>';
    g += '<text x="' + (rx + 6).toFixed(1) + '" y="' + (ry - 4).toFixed(1) + '" font-size="9" fill="#b91c1c">Q</text>';
  }
  if (show.angleI) {
    g += '<path d="M ' + (CX - 34 * Math.sin(rad)).toFixed(1) + ' ' + (CY - 34 * Math.cos(rad)).toFixed(1) +
         ' A 34 34 0 0 1 ' + CX + ' ' + (CY - 34) + '" fill="none" stroke="#1d4ed8" stroke-width="1.5"/>';
    g += '<text x="' + (CX - 24 * Math.sin(rad / 2)).toFixed(1) + '" y="' + (CY - 40 * Math.cos(rad / 2)).toFixed(1) +
         '" font-size="10" text-anchor="middle" fill="#1d4ed8">' + (show.angleI === true ? 'x' : show.angleI) + '</text>';
  }
  if (show.mirrorLabel) g += '<text x="222" y="102" font-size="9" text-anchor="end" fill="#334155">mirror</text>';
  return g + '</svg>';
};

// ── Light travelling in straight lines: a lamp, a card with a small hole, and
//    a screen. Used for the rectilinear-propagation items.
const pinhole = () =>
  '<svg viewBox="0 0 250 120" width="270" role="img" aria-label="a lamp, a card with a hole and a screen">' +
  '<circle cx="32" cy="60" r="12" fill="none" stroke="#0f172a" stroke-width="2"/>' +
  '<line x1="24" y1="52" x2="40" y2="68" stroke="#0f172a" stroke-width="2"/>' +
  '<line x1="40" y1="52" x2="24" y2="68" stroke="#0f172a" stroke-width="2"/>' +
  '<line x1="120" y1="14" x2="120" y2="52" stroke="#0f172a" stroke-width="3"/>' +
  '<line x1="120" y1="68" x2="120" y2="106" stroke="#0f172a" stroke-width="3"/>' +
  '<line x1="215" y1="12" x2="215" y2="108" stroke="#0f172a" stroke-width="3"/>' +
  '<line x1="44" y1="60" x2="120" y2="60" stroke="#b91c1c" stroke-width="2"/>' +
  '<line x1="120" y1="60" x2="215" y2="60" stroke="#b91c1c" stroke-width="2"/>' +
  '<text x="32" y="88" font-size="9" text-anchor="middle" fill="#334155">lamp</text>' +
  '<text x="120" y="118" font-size="9" text-anchor="middle" fill="#334155">card with a hole</text>' +
  // ⚠ Anchored middle at 215, not left-anchored at 228: left-anchored it ran to
  //   ~258 in a 250-wide viewBox and the word was cut. Caught by
  //   scripts/test-svg-figures.js the first run after that test learned to look
  //   at this pack at all.
  '<text x="215" y="118" font-size="9" text-anchor="middle" fill="#334155">screen</text>' +
  '</svg>';

const MCQ = [
  ['g9s-p2-001', 'luminous_objects', 1,
   'Which of these is a <b>luminous</b> object?',
   ['The Sun', 'The Moon', 'A mirror', 'A white wall'], 'The Sun',
   'A luminous object makes its own light.',
   'The Sun produces its own light, so it is luminous. The others are seen only by reflecting light.'],

  ['g9s-p2-002', 'luminous_objects', 1,
   'Which of these is a <b>non-luminous</b> object?',
   ['The Moon', 'A candle flame', 'A lit torch bulb', 'A burning fire'],
   'The Moon',
   'A non-luminous object only reflects light from elsewhere.',
   'The Moon makes no light of its own; we see it because it reflects sunlight.'],

  ['g9s-p2-003', 'luminous_objects', 2,
   'Why can a planet be seen from Earth even though it produces no light?',
   ['It reflects light from the Sun', 'It is heated by the Earth',
    'It glows because it is very cold', 'It produces its own light after all'],
   'It reflects light from the Sun',
   'Where does the light reaching us come from?',
   'Planets are non-luminous: they are visible because sunlight falls on them and is reflected to us.'],

  ['g9s-p2-004', 'light_and_vision', 1,
   'What has to happen before an object can be seen?',
   ['Light from the object must enter the eye',
    'The eye must send out light towards the object',
    'The object must be warmer than the air',
    'The object must be making a sound'],
   'Light from the object must enter the eye',
   'Which way does the light travel?',
   'We see an object when light from it - made by it or reflected off it - enters the eye.'],

  ['g9s-p2-005', 'light_and_vision', 2,
   'Why can nothing be seen in a completely dark room?',
   ['There is no light to enter the eye',
    'The eye stops working in the dark',
    'Objects disappear when it is dark',
    'The air becomes too cold to see through'],
   'There is no light to enter the eye',
   'Seeing needs light reaching the eye.',
   'With no light in the room there is none to reflect off the objects into the eye, so nothing can be seen.'],

  ['g9s-p2-006', 'light_and_vision', 2,
   'Which of these gives out its own light?',
   ['A star', 'A planet', 'A moon', 'A cloud'], 'A star',
   'Only one of these is luminous.',
   'A star produces its own light; planets, moons and clouds are seen by reflected light.'],

  ['g9s-p2-007', 'rectilinear_propagation', 2,
   'The light from the lamp reaches the screen through the small hole, as shown. What does this demonstrate?<br>' + pinhole(),
   ['Light travels in straight lines',
    'Light bends round the edges of the card',
    'Light is absorbed by the card',
    'Light travels faster through a hole'],
   'Light travels in straight lines',
   'Look at the path drawn from the lamp to the screen.',
   'The light only reaches the screen along a straight path through the hole, which shows that light travels in straight lines.'],

  ['g9s-p2-008', 'rectilinear_propagation', 2,
   'In the arrangement shown, the card is moved sideways so the hole is no longer in line with the lamp and the screen. What happens?<br>' + pinhole(),
   ['The screen goes dark, because the straight path is blocked',
    'The light bends round the card and still reaches the screen',
    'The screen becomes a great deal brighter than before',
    'The lamp goes out'],
   'The screen goes dark, because the straight path is blocked',
   'Light cannot turn a corner on its own.',
   'Because light travels in straight lines, moving the hole out of line blocks the only path to the screen.'],

  ['g9s-p2-009', 'rectilinear_propagation', 3,
   'A shadow forms behind an object placed in front of a lamp. What does the sharp edge of the shadow show?',
   ['Light travels in straight lines',
    'Light is reflected by the object',
    'Light passes straight through the object',
    'Light changes colour at the edge'],
   'Light travels in straight lines',
   'Think about why the edge is sharp rather than blurred.',
   'A sharp-edged shadow is formed because the light is blocked along straight paths from the source.'],

  ['g9s-p2-010', 'reflection', 1,
   'What happens to light when it is <b>reflected</b>?',
   ['It bounces off a surface', 'It is absorbed by the surface',
    'It passes through the surface', 'It is turned into sound'],
   'It bounces off a surface',
   'Think about what a mirror does.',
   'Reflection is light bouncing off a surface rather than being absorbed or passing through.'],

  ['g9s-p2-011', 'reflection', 2,
   'Why does a smooth mirror give a clear image while a sheet of white paper does not?',
   ['The mirror reflects the rays in one direction; the paper scatters them',
    'The mirror absorbs far more of the light than the paper does',
    'The paper reflects no light at all, so no image can form',
    'The mirror makes light of its own, while the paper does not'],
   'The mirror reflects the rays in one direction; the paper scatters them',
   'Think about what a rough surface does to parallel rays.',
   'A smooth surface reflects parallel rays together, forming an image; a rough surface scatters them in all directions.'],

  ['g9s-p2-012', 'reflection', 2,
   'In the figure, which letter marks the <b>incident</b> ray?<br>' + mirror(40, { rays: true, normal: true, mirrorLabel: true }),
   ['P', 'Q', 'The dashed line', 'The mirror surface'], 'P',
   'The incident ray is the one arriving at the mirror.',
   'P is the ray travelling towards the mirror, so it is the incident ray; Q leaves the mirror and is the reflected ray.'],

  ['g9s-p2-013', 'reflection', 2,
   'In the figure, which letter marks the <b>reflected</b> ray?<br>' + mirror(40, { rays: true, normal: true, mirrorLabel: true }),
   ['Q', 'P', 'The dashed line', 'The mirror surface'], 'Q',
   'The reflected ray is the one leaving the mirror.',
   'Q travels away from the point where the light met the mirror, so it is the reflected ray.'],

  ['g9s-p2-014', 'laws_of_reflection', 2,
   'In the figure, what is the dashed line called?<br>' + mirror(40, { rays: true, mirrorLabel: true }),
   ['The normal', 'The incident ray', 'The reflected ray', 'The mirror line'],
   'The normal',
   'It is drawn at right angles to the mirror.',
   'The dashed line drawn perpendicular to the mirror at the point where the ray strikes is called the normal.'],

  ['g9s-p2-015', 'laws_of_reflection', 1,
   'The first law of reflection states that the angle of incidence is:',
   ['Equal to the angle of reflection', 'Twice the angle of reflection',
    'Half the angle of reflection', 'Always ninety degrees'],
   'Equal to the angle of reflection',
   'The two angles either side of the normal match.',
   'The angle of incidence equals the angle of reflection, both measured from the normal.'],

  ['g9s-p2-016', 'laws_of_reflection', 2,
   'From which line is the angle of incidence measured?',
   ['The normal', 'The mirror surface', 'The reflected ray', 'The edge of the mirror'],
   'The normal',
   'Not from the mirror itself.',
   'Both the angle of incidence and the angle of reflection are measured from the normal, not from the mirror surface.'],

  ['g9s-p2-017', 'laws_of_reflection', 3,
   'A ray strikes a plane mirror so that the angle between the ray and the <b>mirror surface</b> is 30&deg;. What is the angle of incidence?',
   ['60&deg;', '30&deg;', '90&deg;', '15&deg;'], '60&deg;',
   'The normal is at 90&deg; to the mirror.',
   'The angle of incidence is measured from the normal: 90 - 30 = 60&deg;.'],

  ['g9s-p2-018', 'laws_of_reflection', 3,
   'The second law of reflection states that the incident ray, the reflected ray and the normal:',
   ['All lie in the same plane', 'Are always at right angles',
    'Are always parallel to each other', 'Always meet the mirror at 45&deg;'],
   'All lie in the same plane',
   'It is about them lying flat together, not about their sizes.',
   'The second law states that the incident ray, the normal and the reflected ray all lie in the same plane.'],

  ['g9s-p2-019', 'ray_diagrams', 3,
   'In the figure, the angle marked x is 40&deg;. What is the angle of reflection?<br>' + mirror(40, { normal: true, angleI: true }),
   ['40&deg;', '50&deg;', '80&deg;', '20&deg;'], '40&deg;',
   'Apply the first law of reflection.',
   'The angle of reflection equals the angle of incidence, so it is also 40&deg;.'],

  ['g9s-p2-020', 'ray_diagrams', 3,
   'A ray hits a plane mirror along the normal, so the angle of incidence is 0&deg;. What happens to it?',
   ['It is reflected straight back along the same path',
    'It travels along the mirror surface',
    'It passes through the mirror',
    'It is reflected at right angles to the normal'],
   'It is reflected straight back along the same path',
   'The angle of reflection must equal 0&deg; too.',
   'With an angle of incidence of 0&deg; the angle of reflection is also 0&deg;, so the ray returns along its own path.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const NUM = [
  ['g9s-p2-021', 'ray_diagrams', 2,
   'A ray strikes a plane mirror at an angle of incidence of 35&deg;. State the angle of reflection, in degrees.',
   35, 'The two angles are equal.', 'The angle of reflection equals the angle of incidence: 35&deg;.'],
  ['g9s-p2-022', 'ray_diagrams', 3,
   'The angle between an incident ray and the mirror surface is 25&deg;. Calculate the angle of incidence, in degrees.',
   65, 'The normal is at 90&deg; to the mirror.', '90 - 25 = 65&deg;.'],
  ['g9s-p2-023', 'ray_diagrams', 3,
   'The angle of incidence is 30&deg;. Calculate the total angle between the incident ray and the reflected ray, in degrees.',
   60, 'Each ray is 30&deg; from the normal, on opposite sides.',
   'The two rays sit 30&deg; either side of the normal, so the angle between them is 30 + 30 = 60&deg;.'],
  ['g9s-p2-024', 'laws_of_reflection', 2,
   'A ray travels along the normal to a plane mirror. State the angle of reflection, in degrees.',
   0, 'The angle of incidence is zero here.',
   'The angle of incidence is 0&deg;, so the angle of reflection is 0&deg; and the ray returns along its path.'],
];

NUM.forEach(([id, subsection, difficulty, question, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeNum({ id, chapterId: CH, subsection, difficulty,
    question, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-p2-025', 'luminous_objects', 1,
   'Give the term for an object that produces its own light.',
   'Luminous', ['a luminous object', 'luminous object'],
   'The Sun is one.', 'A luminous object makes its own light.'],
  ['g9s-p2-026', 'laws_of_reflection', 2,
   'Name the line drawn at right angles to a mirror at the point where a ray strikes it.',
   'Normal', ['the normal', 'normal line'],
   'It is drawn dashed in a ray diagram.',
   'The normal is perpendicular to the mirror at the point of incidence, and both angles are measured from it.'],
  ['g9s-p2-027', 'reflection', 1,
   'Give the term for light bouncing off a surface.',
   'Reflection', ['reflected', 'reflect'],
   'It is what a mirror does.', 'Reflection is light bouncing off a surface.'],
  ['g9s-p2-028', 'rectilinear_propagation', 2,
   'State how light travels through a uniform medium such as air.',
   'In straight lines', ['in a straight line', 'straight lines', 'straight'],
   'It is why shadows have sharp edges.',
   'Light travels in straight lines through a uniform medium, which is why shadows form.'],
  ['g9s-p2-029', 'light_and_vision', 2,
   'Give the term for an object that gives out no light of its own.',
   'Non-luminous', ['non luminous', 'nonluminous', 'a non-luminous object'],
   'The Moon is one.', 'A non-luminous object is seen only by the light it reflects.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
