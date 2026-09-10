'use strict';

(function () {

const CH = 'g8s-digestive';

// Four parts of the gut, lettered rather than named — naming them on the
// figure would hand over both items that read it.
const gut =
  '<svg viewBox="0 0 200 210" width="210" role="img" aria-label="a diagram of a body system with four labelled parts">' +
  '<ellipse cx="100" cy="14" rx="16" ry="9" fill="#fde68a" stroke="#92400e" stroke-width="2"/>' +
  '<rect x="94" y="22" width="12" height="40" rx="5" fill="#fecaca" stroke="#b91c1c" stroke-width="2"/>' +
  '<path d="M106 60 Q142 66 140 84 Q138 102 110 100 Q90 98 94 82" fill="#fca5a5" stroke="#b91c1c" stroke-width="2"/>' +
  '<path d="M104 100 L100 118" stroke="#b91c1c" stroke-width="4" fill="none"/>' +
  '<path d="M50 196 L50 120 Q50 112 60 112 L86 112" fill="none" stroke="#a16207" stroke-width="9" stroke-linecap="round"/>' +
  '<path d="M114 112 L140 112 Q150 112 150 120 L150 196" fill="none" stroke="#a16207" stroke-width="9" stroke-linecap="round"/>' +
  '<path d="M100 118 C 70 124 70 140 100 140 C 130 140 130 158 100 158 C 70 158 70 176 100 176 C 130 176 130 190 100 190" fill="none" stroke="#f472b6" stroke-width="7" stroke-linecap="round"/>' +
  '<circle cx="100" cy="42" r="9" fill="#1d4ed8"/><text x="100" y="46" font-size="11" font-weight="bold" text-anchor="middle" fill="#ffffff">A</text>' +
  '<circle cx="124" cy="80" r="9" fill="#1d4ed8"/><text x="124" y="84" font-size="11" font-weight="bold" text-anchor="middle" fill="#ffffff">B</text>' +
  '<circle cx="100" cy="158" r="9" fill="#1d4ed8"/><text x="100" y="162" font-size="11" font-weight="bold" text-anchor="middle" fill="#ffffff">C</text>' +
  '<circle cx="50" cy="165" r="9" fill="#1d4ed8"/><text x="50" y="169" font-size="11" font-weight="bold" text-anchor="middle" fill="#ffffff">D</text>' +
  '</svg>';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8s-digestive-016', chapterId: CH, difficulty: 2, subsection: 'digestive_organs',
    question: 'The diagram shows part of a body system.' + gut + 'At which labelled part are most digested nutrients absorbed into the blood?',
    options: ['C', 'A', 'B', 'D'],
    answer: 'C',
    hint: 'Absorption happens in the long, folded, coiled tube — not in the short one at the top.',
    explanation: 'C is the small intestine, whose villi absorb almost all the digested nutrients. A only carries food down to the stomach, B (the stomach) churns food and digests protein, and D absorbs water rather than nutrients.'
  }),

  makeMCQ({
    id: 'g8s-digestive-017', chapterId: CH, difficulty: 2, subsection: 'structure_function',
    question: 'Look again at the same diagram.' + gut + 'At which labelled part is water taken back from the undigested food?',
    options: ['D', 'A', 'B', 'C'],
    answer: 'D',
    hint: 'It is the last part of the tube, after everything useful has been absorbed.',
    explanation: 'D is the large intestine, which reabsorbs water and leaves semi-solid faeces. A is the oesophagus, B the stomach and C the small intestine — the nutrients, not the water, are taken up at C.'
  }),

  makeText({
    id: 'g8s-digestive-018', chapterId: CH, difficulty: 2, subsection: 'digestion_process',
    question: 'Name the enzyme in saliva that starts breaking starch down while food is still in the mouth.',
    answer: 'amylase',
    alsoAccept: ['salivary amylase', 'ptyalin'],
    hint: 'Enzyme names usually end in -ase, and this one is named after the starch it attacks.',
    explanation: 'Salivary amylase breaks starch into maltose in the mouth. Pepsin works on protein and only in the acid of the stomach, and lipase works on fats, mostly in the small intestine.'
  }),

  makeMCQ({
    id: 'g8s-digestive-019', chapterId: CH, difficulty: 3, subsection: 'digestion_process',
    question: 'A patient has had their gall bladder removed, so bile can no longer be stored and released in a rush. Which kind of meal will now be hardest to digest?',
    options: ['Fatty food', 'Salty food', 'Sugary food', 'Watery food'],
    answer: 'Fatty food',
    hint: 'Ask what bile actually does to food before enzymes get to work on it.',
    explanation: 'Bile emulsifies fat into small droplets so lipase can act, so without a store of bile a fatty meal is digested poorly. Salt and water are absorbed without any digestion at all, and sugar is broken down by enzymes that do not need bile.'
  }),

  makeMCQ({
    id: 'g8s-digestive-020', chapterId: CH, difficulty: 3, subsection: 'structure_function',
    question: 'The lining of the small intestine is folded into millions of villi. What does this achieve?',
    options: ['To increase surface area', 'To make more stomach acid', 'To store bile from the liver', 'To push food along faster'],
    answer: 'To increase surface area',
    hint: 'Absorption happens across a surface, so more surface means more of it.',
    explanation: 'Villi give a huge surface for absorbing nutrients quickly. Acid is made in the stomach, not here; bile is stored in the gall bladder; and food is moved along by peristalsis of the muscle wall, not by the villi.'
  })

);

})();
