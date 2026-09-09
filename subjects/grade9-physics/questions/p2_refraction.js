'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Physics - P2 Light: refraction
//
//  ⚠ REFRACTION IS NOT ONE OF THE P2 SYLLABUS STATEMENTS, which stop at
//    reflection and ray diagrams - but the 2021 NCE Physics paper asks it
//    twice (Fig 1.5, the pencil in a glass of water; Fig 2.2, labelling the
//    normal at a water-air boundary). Those two items were tagged `refraction`
//    with nothing declared behind them, so a child could not reach them. This
//    file takes the subsection to 20.
//
//  ⚠ REFRACTION IS A CHANGE OF SPEED FIRST AND A BEND SECOND. A ray along the
//    normal still slows down and does not bend at all (g9s-p2rf-004), which is
//    the check that a child has the mechanism rather than the picture.
//
//  ⚠ NO REFRACTIVE INDEX. n = sin i / sin r is Form IV; at Grade 9 the
//    comparisons are qualitative (towards or away from the normal, larger or
//    smaller angle), which is what the paper asks for.
//
//  ⚠ IDS TAKE THEIR OWN `p2rf` BLOCK - g9s-p2-NNN is shared with
//    p2_light.js and p2_volume.js and the importer keys on ids.
//
//  Source: NCE Physics 2021 Fig 1.5 and Fig 2.2; NCF Grades 7-9 §Light.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-p2-light';
const SUB = 'refraction';

// ── Figures. ⚠ The aria-label names the SET-UP, never the answer, and every
//    label sits well inside the viewBox (scripts/test-svg-figures.js checks
//    both). ⚠ <i> is an HTML breakout tag and must never appear inside an svg.

// A ray crossing a boundary, with the normal drawn and labelled A.
const FIG_NORMAL =
  '<svg viewBox="0 0 240 152" width="250" role="img" aria-label="a ray of light crossing from air into water, with one line labelled A">' +
  '<rect x="20" y="80" width="200" height="58" fill="#dbeafe" stroke="none"/>' +
  '<line x1="20" y1="80" x2="220" y2="80" stroke="#0f172a" stroke-width="2"/>' +
  '<line x1="120" y1="18" x2="120" y2="144" stroke="#475569" stroke-width="1.2" stroke-dasharray="5 4"/>' +
  '<line x1="62" y1="26" x2="120" y2="80" stroke="#b91c1c" stroke-width="2"/>' +
  '<line x1="120" y1="80" x2="146" y2="140" stroke="#b91c1c" stroke-width="2"/>' +
  '<text x="128" y="30" font-size="10" fill="#0f172a">A</text>' +
  '<text x="28" y="60" font-size="9" fill="#334155">air</text>' +
  '<text x="28" y="100" font-size="9" fill="#334155">water</text>' +
  '</svg>';

// A ray entering a rectangular glass block; what leaves the far face is asked.
const FIG_BLOCK =
  '<svg viewBox="0 0 250 138" width="260" role="img" aria-label="a ray of light entering a rectangular glass block">' +
  '<rect x="70" y="40" width="120" height="62" fill="#e0f2fe" stroke="#0f172a" stroke-width="1.6"/>' +
  '<line x1="18" y1="24" x2="70" y2="56" stroke="#b91c1c" stroke-width="2"/>' +
  '<line x1="70" y1="56" x2="190" y2="88" stroke="#b91c1c" stroke-width="2"/>' +
  '<text x="200" y="96" font-size="12" fill="#0f172a">?</text>' +
  '<text x="104" y="122" font-size="9" fill="#334155">glass block</text>' +
  '</svg>';

// The same boundary with the angle of incidence marked and the other unknown.
const FIG_ANGLES =
  '<svg viewBox="0 0 240 152" width="250" role="img" aria-label="a ray crossing from air into glass with one angle marked 40 degrees">' +
  '<rect x="20" y="76" width="200" height="62" fill="#e0f2fe" stroke="none"/>' +
  '<line x1="20" y1="76" x2="220" y2="76" stroke="#0f172a" stroke-width="2"/>' +
  '<line x1="118" y1="16" x2="118" y2="144" stroke="#475569" stroke-width="1.2" stroke-dasharray="5 4"/>' +
  '<line x1="60" y1="24" x2="118" y2="76" stroke="#b91c1c" stroke-width="2"/>' +
  '<line x1="118" y1="76" x2="142" y2="140" stroke="#b91c1c" stroke-width="2"/>' +
  '<text x="86" y="46" font-size="9" fill="#0f172a">40</text>' +
  '<text x="126" y="112" font-size="9" fill="#0f172a">r</text>' +
  '<text x="28" y="58" font-size="9" fill="#334155">air</text>' +
  '<text x="28" y="98" font-size="9" fill="#334155">glass</text>' +
  '</svg>';

// White light through a prism, with the band of colours on a screen.
const FIG_PRISM =
  '<svg viewBox="0 0 260 140" width="265" role="img" aria-label="white light passing through a triangular glass prism onto a screen">' +
  '<polygon points="96,26 132,94 60,94" fill="#e0f2fe" stroke="#0f172a" stroke-width="1.6"/>' +
  '<line x1="12" y1="58" x2="78" y2="58" stroke="#334155" stroke-width="2"/>' +
  '<text x="12" y="50" font-size="9" fill="#334155">white light</text>' +
  '<line x1="126" y1="70" x2="220" y2="52" stroke="#dc2626" stroke-width="2"/>' +
  '<line x1="126" y1="70" x2="220" y2="66" stroke="#f59e0b" stroke-width="2"/>' +
  '<line x1="126" y1="70" x2="220" y2="80" stroke="#16a34a" stroke-width="2"/>' +
  '<line x1="126" y1="70" x2="220" y2="94" stroke="#2563eb" stroke-width="2"/>' +
  '<rect x="220" y="34" width="8" height="80" fill="#f1f5f9" stroke="#0f172a" stroke-width="1.4"/>' +
  '<text x="196" y="128" font-size="9" fill="#334155">screen</text>' +
  '</svg>';

const MCQ = [
  ['g9s-p2rf-001', 1,
   'A ray of light travels at an angle from air into a glass block. What happens as it crosses the surface?',
   ['It changes direction as it enters the glass',
    'It stops as soon as it touches the glass',
    'It carries on with nothing about it changed',
    'It is turned back into the air it came from'],
   'It changes direction as it enters the glass',
   'Its speed is not the same in the two materials.',
   'Light travels more slowly in glass than in air. Where the ray meets the surface at an angle, that change of speed swings it round to a new direction - this bending is refraction.'],

  ['g9s-p2rf-002', 1,
   'A ray of light passes at an angle from air into water. Which way does it bend?',
   ['Towards the normal',
    'Away from the normal',
    'Along the water surface',
    'Back into the air again'],
   'Towards the normal',
   'Light slows down when it goes into water.',
   'Light slows in water, so the ray bends towards the normal. Coming the other way, water into air, it speeds up and bends away from the normal.'],

  ['g9s-p2rf-003', 1,
   FIG_NORMAL + 'On this refraction ray diagram, what is the dotted line drawn at right angles to the surface where the ray strikes it?',
   ['The normal',
    'The incident ray',
    'The refracted ray',
    'The reflected ray'],
   'The normal',
   'Every angle in the diagram is measured from this line.',
   'The normal is a construction line at 90 degrees to the surface at the point the ray strikes. Both the angle of incidence and the angle of refraction are measured from it, never from the surface itself.'],

  ['g9s-p2rf-004', 2,
   'A ray of light hits a glass block along the normal, so the angle of incidence is 0 degrees. What does the ray do?',
   ['It goes straight on without bending',
    'It bends towards the normal a little',
    'It bends away from the normal a little',
    'It comes back along the path it came'],
   'It goes straight on without bending',
   'Ask whether one side of the ray meets the glass before the other.',
   'A ray along the normal meets the whole surface at the same moment, so there is nothing to swing it round: it slows down but travels straight on, with an angle of refraction of 0 degrees.'],

  ['g9s-p2rf-005', 2,
   FIG_BLOCK + 'A ray passes right through a rectangular glass block and comes out of the far side. How does the emerging ray compare with the ray that went in?',
   ['Parallel to it, but shifted sideways',
    'Parallel to it and along the same line',
    'Turned at right angles to it',
    'Turned back towards the source'],
   'Parallel to it, but shifted sideways',
   'The two faces of the block are parallel, and the light bends at each.',
   'The ray bends towards the normal on entering and away from it by the same amount on leaving, because the faces are parallel. So it emerges parallel to the original ray but displaced sideways.'],

  ['g9s-p2rf-006', 2,
   'Why does a swimming pool look shallower than it really is?',
   ['Light from the bottom bends as it leaves the water',
    'Light is absorbed by the water before it escapes',
    'Water reflects all the light back from the bottom',
    'Water magnifies the tiles lying at the bottom'],
   'Light from the bottom bends as it leaves the water',
   'Your eye assumes light has travelled in a straight line.',
   'Light from the bottom bends away from the normal as it leaves the water. The eye traces it back in a straight line, so the bottom seems raised and the pool looks shallower than it is.'],

  ['g9s-p2rf-007', 2,
   'A coin lies at the bottom of an empty cup, just hidden by the rim. When the cup is filled with water the coin comes into view. Why?',
   ['Light from the coin bends as it leaves the water',
    'The water lifts the coin nearer to the rim',
    'The water reflects the coin onto the cup side',
    'The water makes the coin give out its own light'],
   'Light from the coin bends as it leaves the water',
   'The coin has not moved - the path of the light has.',
   'Light from the coin refracts away from the normal as it leaves the water and reaches the eye, which traces it back in a straight line. The coin appears raised, so it clears the rim.'],

  ['g9s-p2rf-008', 3,
   'A fisherman looking down into clear water sees a fish. Where is the fish really?',
   ['Deeper than it appears to be',
    'Exactly where it appears to be',
    'Nearer the surface than it looks',
    'Further from the bank than it looks'],
   'Deeper than it appears to be',
   'Compare this with the reason a pool looks shallow.',
   'Light from the fish bends away from the normal as it leaves the water, so the image the eye traces back sits above the fish. A spear has to be aimed below the image to hit the fish.'],

  ['g9s-p2rf-009', 1,
   'In which of these materials does light travel fastest?',
   ['Air',
    'Ice',
    'Water',
    'Glass'],
   'Air',
   'The less the material slows light, the faster it goes.',
   'Light travels fastest in air, and fastest of all in a vacuum. It is slower in water, ice and glass, and it is that difference in speed that makes light refract between them.'],

  ['g9s-p2rf-010', 2,
   'Light passes from air into glass. Which of these does NOT change?',
   ['Its colour',
    'Its speed',
    'Its direction',
    'Its wavelength'],
   'Its colour',
   'Think about what you see when the light comes out the far side.',
   'Refraction changes the speed, the wavelength, and the direction of a ray that meets the surface at an angle. The colour, which is set by the frequency, stays the same throughout.'],

  ['g9s-p2rf-011', 2,
   FIG_PRISM + 'White light is passed through a triangular glass prism and a band of colours falls on a screen. What is this spreading out called?',
   ['Dispersion',
    'Reflection',
    'Absorption',
    'Conduction'],
   'Dispersion',
   'Each colour is refracted by a slightly different amount.',
   'The colours that make up white light are refracted by different amounts, violet most and red least, so they leave the prism separated into a spectrum. That separation is dispersion.'],

  ['g9s-p2rf-012', 2,
   'A rainbow appears after a shower of rain. Which pair of effects produces it?',
   ['Refraction and reflection in raindrops',
    'Conduction and convection in raindrops',
    'Absorption and evaporation in raindrops',
    'Vibration and compression in raindrops'],
   'Refraction and reflection in raindrops',
   'The light goes into each drop, turns inside it, and comes back out.',
   'Sunlight refracts entering each raindrop, reflects off the inside of the back of the drop, then refracts again on leaving. Because each colour bends by its own amount, they emerge separated.'],

  ['g9s-p2rf-013', 3,
   FIG_ANGLES + 'A ray in air strikes a glass block with an angle of incidence of 40 degrees. Which could be the angle of refraction, marked r, inside the glass?',
   ['25 degrees',
    '40 degrees',
    '55 degrees',
    '90 degrees'],
   '25 degrees',
   'Going into glass, the ray bends towards the normal.',
   'Bending towards the normal makes the angle of refraction smaller than the angle of incidence, so it must be under 40 degrees. Only 25 degrees fits.'],

  ['g9s-p2rf-014', 3,
   'A ray crosses the boundary from medium X into medium Y and bends away from the normal. What does that tell you?',
   ['Light travels faster in Y than in X',
    'Light travels slower in Y than in X',
    'Light travels at one speed in both',
    'Light does not enter medium Y at all'],
   'Light travels faster in Y than in X',
   'Bending away from the normal goes with speeding up.',
   'A ray bends away from the normal when it speeds up, so light is faster in Y. Y is the optically thinner medium of the two, as air is compared with water.'],

  ['g9s-p2rf-015', 2,
   'Why does a convex lens bring parallel rays of light together at a focus?',
   ['Each ray is refracted entering and leaving the glass',
    'Each ray is reflected off the curved front surface',
    'The glass absorbs the rays and gives out new ones',
    'The lens bends the rays by heating the air near it'],
   'Each ray is refracted entering and leaving the glass',
   'A lens is a piece of glass with curved surfaces.',
   'Every ray refracts twice, on entering and on leaving the glass. The curvature means rays further from the middle are turned more, so all of them cross at the same point, the focus.'],

  ['g9s-p2rf-016', 3,
   'Why does a star seen from the ground appear to twinkle?',
   ['Its light refracts through moving layers of air',
    'The star itself brightens and dims each second',
    'Its light is reflected off the face of the moon',
    'Dust in space blocks the light moment by moment'],
   'Its light refracts through moving layers of air',
   'The air above us is neither still nor all at one temperature.',
   'Layers of air at different temperatures refract the starlight by slightly different amounts, and those layers keep shifting, so the light arriving at the eye wavers and the star seems to twinkle.'],

  ['g9s-p2rf-017', 2,
   'A straw standing in a glass of water looks broken at the surface, although it is straight. What should a ray diagram of this show?',
   ['Light from the straw bending as it leaves the water',
    'The straw itself bending under the weight of water',
    'Light being absorbed by the sides of the glass',
    'The water surface reflecting the top of the straw'],
   'Light from the straw bending as it leaves the water',
   'The straw is straight, so something happens on the way to the eye.',
   'Light from the submerged part refracts as it leaves the water, so that part appears displaced. The eye joins the two parts into one object and the straw looks broken at the surface.'],

  ['g9s-p2rf-018', 4,
   'A child looks into a pool, judges the bottom to be about a metre down and decides it is safe to jump in. Why is that judgement risky?',
   ['The water is deeper than it looks, so it may be far too deep',
    'The water is shallower than it looks, so the floor is very near',
    'Refraction has no effect on depth, so the judgement is sound',
    'The water looks deeper than it is, so a pool is always safe'],
   'The water is deeper than it looks, so it may be far too deep',
   'Work out which way refraction shifts the image of the bottom.',
   'Light from the bottom bends away from the normal as it leaves the water, so the bottom looks raised and the pool appears shallower than it is. Judging depth by eye can put a child in water well over their head.'],
];

MCQ.forEach(([id, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection: SUB, difficulty,
    question, options, answer, hint, explanation }));
});

})();
