'use strict';
// ══════════════════════════════════════════════
//  Time Traveller bank — real, dated history facts for the 🕰️ minigame.
//
//  ⚠ EVERY fact must be real and verifiable (same rule as Island Explorer's
//  geography). Years follow what the history packs and standard references
//  teach; where history itself is approximate (the dodo), the commonly taught
//  year is used. Change a year only with a source in hand.
//
//  {label, year, era, band}
//    era  : 'mu' (Mauritius) | 'world'
//    band : 1 easy (the big story) · 2 medium · 3 finer events
//
//  ⚠ A label must NEVER contain its year or any 4-digit number — the game
//  hides the years until the round is resolved, and a leaked digit would give
//  the order away. scripts/test-time-traveller.js enforces this.
// ══════════════════════════════════════════════
window.MINIGAME_TIME = [
  // ── Mauritius ──
  { label: 'Portuguese sailors reach the Mascarene islands', year: 1507, era: 'mu', band: 2 },
  { label: 'The Dutch land at Grand Port and name the island “Mauritius”', year: 1598, era: 'mu', band: 1 },
  { label: 'The Dutch build their first settlement on the island', year: 1638, era: 'mu', band: 2 },
  { label: 'The dodo becomes extinct', year: 1681, era: 'mu', band: 1 },
  { label: 'The Dutch leave Mauritius for good', year: 1710, era: 'mu', band: 2 },
  { label: 'The French claim the island and call it “Isle de France”', year: 1715, era: 'mu', band: 1 },
  { label: 'Mahé de Labourdonnais becomes governor and builds up Port Louis', year: 1735, era: 'mu', band: 1 },
  { label: 'Pierre Poivre brings precious spice plants to the island', year: 1767, era: 'mu', band: 2 },
  { label: 'The French navy wins the Battle of Grand Port', year: 1810, era: 'mu', band: 3 },
  { label: 'The Treaty of Paris confirms Mauritius as a British colony', year: 1814, era: 'mu', band: 3 },
  { label: 'The first indentured workers from India arrive at Aapravasi Ghat', year: 1834, era: 'mu', band: 1 },
  { label: 'Slavery is abolished in Mauritius', year: 1835, era: 'mu', band: 1 },
  { label: 'Mauritius prints its famous first “Post Office” stamps', year: 1847, era: 'mu', band: 2 },
  { label: 'The first railway line opens in Mauritius', year: 1864, era: 'mu', band: 2 },
  { label: 'The rupee becomes the money of Mauritius', year: 1876, era: 'mu', band: 3 },
  { label: 'A terrible cyclone strikes Port Louis', year: 1892, era: 'mu', band: 3 },
  { label: 'Mahatma Gandhi visits Mauritius on his way home from South Africa', year: 1901, era: 'mu', band: 2 },
  { label: 'The airport at Plaisance opens', year: 1943, era: 'mu', band: 3 },
  { label: 'Cyclone Carol, one of the strongest storms ever, hits Mauritius', year: 1960, era: 'mu', band: 3 },
  { label: 'The University of Mauritius opens its doors', year: 1965, era: 'mu', band: 3 },
  { label: 'Mauritius becomes independent — the four-band flag rises for the first time', year: 1968, era: 'mu', band: 1 },
  { label: 'Mauritius becomes a Republic', year: 1992, era: 'mu', band: 1 },
  { label: 'Aapravasi Ghat becomes a UNESCO World Heritage Site', year: 2006, era: 'mu', band: 3 },
  { label: 'Le Morne mountain becomes a UNESCO World Heritage Site', year: 2008, era: 'mu', band: 3 },
  // ── The wider world ──
  { label: 'Gutenberg builds the first printing press in Europe', year: 1450, era: 'world', band: 2 },
  { label: 'Christopher Columbus sails across the Atlantic to the Americas', year: 1492, era: 'world', band: 1 },
  { label: 'Vasco da Gama sails around Africa and reaches India', year: 1498, era: 'world', band: 2 },
  { label: 'Magellan’s expedition finishes the first voyage around the world', year: 1522, era: 'world', band: 2 },
  { label: 'The first hot-air balloon carries people into the sky', year: 1783, era: 'world', band: 3 },
  { label: 'The Suez Canal opens, shortening the sea route between Europe and Asia', year: 1869, era: 'world', band: 3 },
  { label: 'Alexander Graham Bell patents the telephone', year: 1876, era: 'world', band: 3 },
  { label: 'Louis Pasteur uses his rabies vaccine for the first time', year: 1885, era: 'world', band: 3 },
  { label: 'The first modern Olympic Games are held in Athens', year: 1896, era: 'world', band: 2 },
  { label: 'The Wright brothers make the first aeroplane flight', year: 1903, era: 'world', band: 1 },
  { label: 'The United Nations is founded after World War II', year: 1945, era: 'world', band: 2 },
  { label: 'Yuri Gagarin becomes the first human in space', year: 1961, era: 'world', band: 2 },
  { label: 'Neil Armstrong walks on the Moon', year: 1969, era: 'world', band: 1 },
  { label: 'The World Wide Web is invented', year: 1989, era: 'world', band: 2 },
];
