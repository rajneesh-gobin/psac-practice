'use strict';

(function () {

const CH = 'g8s-magnetism';

// The ends are lettered, not named: printing N and S would answer the item.
// The arrows on the lines are the whole point, so they are drawn as solid
// triangles rather than as markers, which some renderers drop.
const field =
  '<svg viewBox="0 0 240 150" width="240" role="img" aria-label="a diagram of a magnet and the lines around it">' +
  '<path d="M84 62 C 84 20 156 20 156 62" fill="none" stroke="#475569" stroke-width="1.8"/>' +
  '<path d="M76 62 C 66 0 174 0 164 62" fill="none" stroke="#475569" stroke-width="1.8"/>' +
  '<path d="M84 88 C 84 130 156 130 156 88" fill="none" stroke="#475569" stroke-width="1.8"/>' +
  '<path d="M76 88 C 66 150 174 150 164 88" fill="none" stroke="#475569" stroke-width="1.8"/>' +
  '<polygon points="116,26 126,30.5 116,35" fill="#475569"/>' +
  '<polygon points="116,11 126,15.5 116,20" fill="#475569"/>' +
  '<polygon points="116,115 126,119.5 116,124" fill="#475569"/>' +
  '<polygon points="116,130 126,134.5 116,139" fill="#475569"/>' +
  '<rect x="80" y="62" width="80" height="26" fill="#94a3b8" stroke="#1e293b" stroke-width="2"/>' +
  '<line x1="120" y1="62" x2="120" y2="88" stroke="#1e293b" stroke-width="2"/>' +
  '<text x="100" y="82" font-size="15" font-weight="bold" text-anchor="middle" fill="#0f172a">X</text>' +
  '<text x="140" y="82" font-size="15" font-weight="bold" text-anchor="middle" fill="#0f172a">Y</text>' +
  '</svg>';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8s-magnetism-016', chapterId: CH, difficulty: 2, subsection: 'poles_fields',
    question: 'Outside a magnet, field lines are always drawn pointing away from the north pole and towards the south pole.' + field + 'Which end of this magnet is the north pole?',
    options: ['X', 'Y', 'Both ends', 'Neither end'],
    answer: 'X',
    hint: 'Follow the arrowheads on the curved lines: which end do they start from?',
    explanation: 'Every arrow outside the magnet travels from the left-hand end round to the right-hand end, so the lines leave at X, making X the north pole and Y the south pole. A magnet cannot have two north poles or none at all — the poles always come as a pair.'
  }),

  makeMCQ({
    id: 'g8s-magnetism-017', chapterId: CH, difficulty: 2, subsection: 'magnetic_materials',
    question: 'A recycling worker must sort a bin holding steel cans and aluminium cans. Which tool separates them fastest?',
    options: ['A magnet', 'A sieve', 'A balance', 'A funnel'],
    answer: 'A magnet',
    hint: 'Only one of the two metals is attracted to anything.',
    explanation: 'Steel contains iron and is magnetic, while aluminium is not, so a magnet lifts out the steel cans and leaves the aluminium. A sieve separates by size and the cans are the same size, a balance only weighs them, and a funnel pours liquids.'
  }),

  makeText({
    id: 'g8s-magnetism-018', chapterId: CH, difficulty: 2, subsection: 'poles_fields',
    question: 'Name the small instrument, containing a tiny pivoted magnet, that is moved around a bar magnet to plot the direction of its field.',
    answer: 'plotting compass',
    alsoAccept: ['compass', 'a compass', 'a plotting compass', 'plotting-compass'],
    hint: 'The same device is used to find north when you are walking.',
    explanation: 'A plotting compass has a light pivoted magnet that lines up with the field, so moving it round the magnet traces the field lines. Iron filings also show the shape of the field but give no direction, and a magnetometer measures strength rather than plotting the pattern.'
  }),

  makeMCQ({
    id: 'g8s-magnetism-019', chapterId: CH, difficulty: 3, subsection: 'uses_magnets',
    question: 'The core of an electromagnet in a scrapyard crane is made of soft iron rather than steel. Why?',
    options: ['It loses its magnetism quickly', 'It keeps its magnetism longer', 'It conducts electricity better', 'It is much lighter than steel'],
    answer: 'It loses its magnetism quickly',
    hint: 'The crane must be able to DROP the scrap when the current is switched off.',
    explanation: 'Soft iron is magnetised strongly while the current flows and loses it at once when the current stops, so the load falls where the driver wants it. Steel keeps its magnetism, so the scrap would stay stuck to the crane; the core’s job is magnetic, not electrical, and soft iron is not lighter than steel.'
  }),

  makeMCQ({
    id: 'g8s-magnetism-020', chapterId: CH, difficulty: 2, subsection: 'magnetic_materials',
    question: 'A pupil claims that a magnet attracts every metal. Which single observation shows that she is wrong?',
    options: ['A copper coin is not attracted', 'A steel pin is attracted to it', 'Iron filings stick to the ends', 'The magnet has two different poles'],
    answer: 'A copper coin is not attracted',
    hint: 'To disprove "every metal", you need one metal that does NOT behave that way.',
    explanation: 'Copper is a metal and it is not attracted, so a single copper coin disproves the claim. The steel pin and the iron filings are both examples that fit her claim rather than testing it, and having two poles says nothing about which materials are attracted.'
  })

);

})();
