'use strict';
(function () {

STATIC_QUESTIONS.push(

  // ── Network topology diagrams ────────────────────────────────────────────
  // NCE ICT paper pattern: Q1(f) shows 4 topology diagrams and asks which
  // one is a bus topology. Existing questions cover topology by name only;
  // these use inline SVG to replicate the diagram-recognition task.

  makeMCQ({ id: 'g9ict-diag-001', chapterId: 'g9ict-networks', subsection: 'topologies', difficulty: 2,
    question: 'Four network topology diagrams are shown below. Which diagram represents a <b>bus topology</b>?<br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 200" width="280" height="200" style="display:block;margin:8px auto">' +
      '<text x="5" y="14" font-size="10" font-weight="bold" fill="#333">A</text>' +
      '<line x1="20" y1="30" x2="120" y2="30" stroke="#333" stroke-width="2"/>' +
      '<circle cx="40" cy="30" r="6" fill="#4488cc"/><circle cx="70" cy="30" r="6" fill="#4488cc"/><circle cx="100" cy="30" r="6" fill="#4488cc"/>' +
      '<line x1="40" y1="30" x2="40" y2="20" stroke="#333" stroke-width="1.5"/><rect x="35" y="12" width="10" height="7" fill="#88bbee" stroke="#336"/>' +
      '<line x1="70" y1="30" x2="70" y2="20" stroke="#333" stroke-width="1.5"/><rect x="65" y="12" width="10" height="7" fill="#88bbee" stroke="#336"/>' +
      '<line x1="100" y1="30" x2="100" y2="20" stroke="#333" stroke-width="1.5"/><rect x="95" y="12" width="10" height="7" fill="#88bbee" stroke="#336"/>' +
      '<text x="145" y="14" font-size="10" font-weight="bold" fill="#333">B</text>' +
      '<circle cx="210" cy="35" r="8" fill="#cc6633" stroke="#993300" stroke-width="1.5"/>' +
      '<line x1="210" y1="35" x2="178" y2="55" stroke="#333" stroke-width="1.5"/><circle cx="172" cy="58" r="6" fill="#4488cc"/>' +
      '<line x1="210" y1="35" x2="210" y2="60" stroke="#333" stroke-width="1.5"/><circle cx="210" cy="63" r="6" fill="#4488cc"/>' +
      '<line x1="210" y1="35" x2="242" y2="55" stroke="#333" stroke-width="1.5"/><circle cx="248" cy="58" r="6" fill="#4488cc"/>' +
      '<text x="5" y="104" font-size="10" font-weight="bold" fill="#333">C</text>' +
      '<circle cx="70" cy="155" r="35" fill="none" stroke="#333" stroke-width="2"/>' +
      '<circle cx="70" cy="120" r="6" fill="#4488cc"/><circle cx="100" cy="141" r="6" fill="#4488cc"/><circle cx="95" cy="175" r="6" fill="#4488cc"/>' +
      '<circle cx="45" cy="175" r="6" fill="#4488cc"/><circle cx="40" cy="141" r="6" fill="#4488cc"/>' +
      '<text x="145" y="104" font-size="10" font-weight="bold" fill="#333">D</text>' +
      '<circle cx="180" cy="130" r="6" fill="#4488cc"/><circle cx="210" cy="115" r="6" fill="#4488cc"/>' +
      '<circle cx="240" cy="130" r="6" fill="#4488cc"/><circle cx="240" cy="160" r="6" fill="#4488cc"/>' +
      '<circle cx="180" cy="160" r="6" fill="#4488cc"/>' +
      '<line x1="180" y1="130" x2="210" y2="115" stroke="#333" stroke-width="1.5"/>' +
      '<line x1="210" y1="115" x2="240" y2="130" stroke="#333" stroke-width="1.5"/>' +
      '<line x1="240" y1="130" x2="240" y2="160" stroke="#333" stroke-width="1.5"/>' +
      '<line x1="240" y1="160" x2="180" y2="160" stroke="#333" stroke-width="1.5"/>' +
      '<line x1="180" y1="160" x2="180" y2="130" stroke="#333" stroke-width="1.5"/>' +
      '<line x1="180" y1="130" x2="240" y2="160" stroke="#333" stroke-width="1.5"/>' +
      '<line x1="210" y1="115" x2="180" y2="160" stroke="#333" stroke-width="1.5"/>' +
      '</svg>',
    options: ['A', 'B', 'C', 'D'],
    answer: 'A',
    hint: 'In a bus topology, all devices share a single backbone cable — they connect off the same straight line.',
    explanation: '<b>Diagram A</b> is a bus topology: all devices connect to a single shared backbone cable (the horizontal line). B = star (central hub), C = ring (circular loop), D = mesh (every device connects to every other).' }),

  makeMCQ({ id: 'g9ict-diag-002', chapterId: 'g9ict-networks', subsection: 'topologies', difficulty: 2,
    question: 'In a <b>star topology</b>, if the central device (hub or switch) fails, what happens to the other computers on the network?',
    options: [
      'All computers lose their network connection',
      'Only computers next to the failed hub are affected',
      'The network continues to operate normally',
      'Computers reconnect automatically through a different path'
    ],
    answer: 'All computers lose their network connection',
    hint: 'Every device on a star network depends on the central device to communicate.',
    explanation: 'In a <b>star topology</b>, every device communicates only through the central hub or switch. If the central device fails, <b>all connections are lost</b> — this is the main disadvantage of star topology. Bus topology continues with the backbone; ring topology can reroute.' }),

  // ── Speech balloon shape (text MCQ — identifies balloon type by description) ─
  // NCE ICT 2025 Q1(b): jagged star-burst balloon shape identifies "expression/
  // thought" text in presentation or word-processing software.

  makeMCQ({ id: 'g9ict-diag-003', chapterId: 'g9ict-word-processing', subsection: 'word_icons', difficulty: 1,
    question: 'In a word-processing or presentation document, a <b>jagged, star-burst-shaped</b> balloon (with spiky edges pointing outward) is used to represent which type of text?',
    options: [
      'An exclamation or emphasis callout',
      'A spoken dialogue bubble',
      'A thought cloud',
      'A rectangular caption box'
    ],
    answer: 'An exclamation or emphasis callout',
    hint: 'The spiky, burst shape is designed to grab attention and signal something dramatic or important.',
    explanation: 'A <b>jagged star-burst (explosion) shape</b> is an <em>emphasis or exclamation callout</em> — used in presentations and documents to highlight a dramatic statement or draw the reader\'s eye. A smooth oval is a thought bubble; a rounded rectangle with a pointer is a speech balloon.' })

);

})();
