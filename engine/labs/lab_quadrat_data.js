'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the biology and the arithmetic behind the Quadrat Field
//  (NCE Grade 9, Biology B3 · Biodiversity).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. Where every plant grows,
//    the true population of each species, the edge rule, the estimate formula,
//    what a cyclone or ten years of invasion does to the plot, every card,
//    fact, guide, discovery and quiz question comes from this file.
//    lab_quadrat.js only moves things over time and draws them.
//  ⚠ Grounded in the live chapter g9s-b3-biodiversity (subsections
//    what_is_biodiversity, importance_of_biodiversity, quadrat_sampling,
//    natural_threats, human_threats) and its question files: random
//    coordinates, several quadrats, the mean, "mean × (total area ÷ quadrat
//    area)", biased placement, endemic / native / invasive alien, cyclones and
//    droughts, deforestation, strawberry guava, the pink pigeon and the
//    Mauritius kestrel. The EDGE RULE is not asked on the NCE papers and is
//    labelled "beyond the NCE syllabus" wherever it is taught.
//  ⚠ The plot is a MODEL: a 20 m × 20 m study plot with plants placed by a
//    seeded random generator, so it is the same for every pupil and the tests.
//    The species are real Mauritian plants; the counts and what each event
//    removes are model numbers, and the cards say so.
//
//  The maths (scripts/test-labs-quadrat-data.js checks every line):
//    mean per quadrat   = total counted ÷ number of quadrats
//    estimate           = mean × (area of the plot ÷ area of one quadrat)
//    Plants never cross the plot's outer edge, and with the edge rule every
//    plant is counted in exactly ONE of the 400 grid squares - so counting all
//    400 squares gives the true population exactly.
// ══════════════════════════════════════════════
const LabQuadratData = (() => {

  // ── The plot and the quadrat ─────────────────────
  const FIELD = { w: 20, h: 20, area: 400, seed: 20260911,
                  place: 'A study plot in a forest clearing, Black River Gorges' };
  const QUAD = { side: 1, area: 1 };
  const R = 0.08;                 // m - the half-width of a plant's base, for the edge rule
  const MIN_Q = 5;                // fewer quadrats than this: "too few to trust"
  const MISSION_Q = 10;           // the missions ask for at least this many

  // A seeded generator (mulberry32) - the same plot for every pupil.
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function gauss(r) {
    let u = 0;
    while (u === 0) u = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
  }

  // ── The species (all real Mauritian plants) ───────
  // status: 'endemic' = found naturally in Mauritius and nowhere else;
  //         'invasive' = an invasive alien species, brought in by people.
  const SPECIES = {
    guava: { name: 'Strawberry guava', short: 'guava', plural: 'strawberry guava plants', local: 'goyave de Chine', latin: 'Psidium cattleianum', status: 'invasive',
             color: '#B3262E', leaf: '#2F6B34', icon: '🍒', n: 900, bg: 0.1,
             patches: [[4.5, 5, 2.0], [12, 3.5, 1.8], [16.5, 9.5, 2.0], [7.5, 12.5, 1.9], [13.5, 15.5, 1.8], [2.8, 10.5, 1.7]],
             meta: 'Invasive alien. Grows in dense thickets' },
    privet: { name: 'Privet', short: 'privet', plural: 'privet plants', local: 'troène', latin: 'Ligustrum robustum', status: 'invasive',
              color: '#1F4F2E', leaf: '#3D7A4A', icon: '🌳', n: 360, bg: 0.15,
              patches: [[10, 8.5, 2.2], [17.5, 16.5, 1.8], [8, 18, 1.6]],
              meta: 'Invasive alien shrub' },
    ebony: { name: 'Mauritian ebony seedling', short: 'ebony', plural: 'ebony seedlings', local: 'bois d'ébène', latin: 'Diospyros tessellaria', status: 'endemic',
             color: '#7DD35F', leaf: '#4FA83A', icon: '🌱', n: 120, bg: 1, patches: [],
             meta: 'Endemic. Found nowhere else on Earth' },
    lantana: { name: 'Lantana', short: 'lantana', plural: 'lantana plants', local: 'vieille fille', latin: 'Lantana camara', status: 'invasive',
               color: '#F08A24', leaf: '#5E8C3A', icon: '🌼', n: 70, bg: 0,
               patches: [[2.5, 17.5, 1.1]], prickly: true,
               meta: 'Invasive alien. Prickly stems' },
  };
  const SPECIES_ORDER = ['guava', 'privet', 'ebony', 'lantana'];
  const STATUS_WORDS = { endemic: 'Endemic', invasive: 'Invasive alien' };

  function _inside(x, y) { return x >= R && x <= FIELD.w - R && y >= R && y <= FIELD.h - R; }
  function _near(x, y, list, d) { return list.some(([px, py]) => (x - px) * (x - px) + (y - py) * (y - py) < d * d); }

  // The plot before anything happens to it.
  function _basePlants() {
    const r = rng(FIELD.seed);
    const out = [];
    let id = 0;
    const invPatches = SPECIES.guava.patches.concat(SPECIES.privet.patches);
    SPECIES_ORDER.forEach(sp => {
      const S = SPECIES[sp];
      for (let i = 0; i < S.n; i++) {
        let x, y, tries = 0;
        do {
          if (!S.patches.length || r() < S.bg) {
            x = R + r() * (FIELD.w - 2 * R); y = R + r() * (FIELD.h - 2 * R);
            // Ebony seedlings survive where the invasive thickets have not shaded them out.
            if (sp === 'ebony' && _near(x, y, invPatches, 2) && r() < 0.85) { x = -1; }
          } else {
            const p = S.patches[Math.floor(r() * S.patches.length)];
            x = p[0] + gauss(r) * p[2]; y = p[1] + gauss(r) * p[2];
          }
          tries++;
        } while (!_inside(x, y) && tries < 200);
        out.push({ id: id++, sp, x, y });
      }
    });
    return out;
  }

  // ── What can happen to the plot (model numbers) ──
  const _kill = (pl, r, sp, f) => pl.filter(p => p.sp !== sp || r() >= f);
  function _grow(pl, r, sp, g) {
    const own = pl.filter(p => p.sp === sp);
    if (!own.length) return pl;
    const add = Math.round(own.length * (g - 1));
    let id = pl.reduce((m, p) => Math.max(m, p.id), 0) + 1;
    const out = pl.slice();
    for (let i = 0; i < add; i++) {
      const par = own[Math.floor(r() * own.length)];
      let x, y, tries = 0;
      do { x = par.x + gauss(r) * 0.9; y = par.y + gauss(r) * 0.9; tries++; } while (!_inside(x, y) && tries < 200);
      if (_inside(x, y)) out.push({ id: id++, sp, x, y });
    }
    return out;
  }
  const EVENTS = {
    cyclone: { icon: '🌀', name: 'A cyclone', kind: 'natural', years: 1,
      blurb: 'Falling branches and uprooted trees',
      say: 'A cyclone crossed the island. Falling branches and uprooted trees crushed about a quarter of the plants in the plot; in the gaps, strawberry guava sprouts again fast.',
      apply: (pl, r) => { SPECIES_ORDER.forEach(sp => { pl = _kill(pl, r, sp, 0.25); }); return _grow(pl, r, 'guava', 1.25); } },
    drought: { icon: '☀️', name: 'A drought', kind: 'natural', years: 1,
      blurb: 'Months with almost no rain',
      say: 'A long drought: months with almost no rain. Many seedlings dried out and died - the young ebony seedlings worst of all.',
      apply: (pl, r) => { pl = _kill(pl, r, 'ebony', 0.4); pl = _kill(pl, r, 'guava', 0.2); pl = _kill(pl, r, 'privet', 0.2); return _kill(pl, r, 'lantana', 0.1); } },
    spread: { icon: '⏩', name: '10 years of invasion', kind: 'human', years: 10,
      blurb: 'The invasive aliens spread',
      say: 'Ten years pass with nobody controlling the invaders. Strawberry guava, privet and lantana spread; their thickets shade out the ebony seedlings.',
      apply: (pl, r) => { pl = _grow(pl, r, 'guava', 1.6); pl = _grow(pl, r, 'privet', 1.5); pl = _grow(pl, r, 'lantana', 1.4); return _kill(pl, r, 'ebony', 0.4); } },
    clear: { icon: '🪓', name: 'Clear a strip', kind: 'human', years: 0,
      blurb: 'Deforestation for farmland',
      say: 'A 6 m strip along one side of the plot was cleared for farmland - deforestation. Every plant in it is gone, and so is the habitat.',
      apply: pl => pl.filter(p => p.x < 14) },
    weed: { icon: '🧑‍🌾', name: 'Weed out the invaders', kind: 'conservation', years: 5,
      blurb: 'A fenced conservation area',
      say: 'Conservation: the plot was fenced and weeded, like a Conservation Management Area. The invasive plants were pulled out; five years later, light reaches the ground and new ebony seedlings have grown.',
      apply: (pl, r) => { pl = pl.filter(p => p.sp === 'ebony'); return _grow(pl, r, 'ebony', 1.8); } },
  };
  const EVENT_ORDER = ['cyclone', 'drought', 'spread', 'clear', 'weed'];

  // The plot after a list of events, in order. Always the same for the same list.
  function makeField(events) {
    let pl = _basePlants();
    (events || []).forEach((e, i) => {
      if (!EVENTS[e]) return;
      pl = EVENTS[e].apply(pl, rng(FIELD.seed + 7919 * (i + 1) + e.length * 104729));
    });
    return pl;
  }
  const yearOf = events => (events || []).reduce((y, e) => y + ((EVENTS[e] && EVENTS[e].years) || 0), 0);
  const truePop = (plants, sp) => plants.filter(p => p.sp === sp).length;

  // ── The edge rule ────────────────────────────────
  // A plant whose base crosses the frame is ON THE EDGE. The rule: count it if
  // it crosses the TOP or LEFT side, leave it out if it crosses the BOTTOM or
  // RIGHT side. (y grows downwards: the top side is y = qy.)
  //   'in'        wholly inside                     - counted
  //   'edge_in'   crosses the top or left side only - counted
  //   'edge_out'  crosses the bottom or right side  - not counted
  //   'out'       not in the quadrat at all
  function where(p, qx, qy) {
    const s = QUAD.side, L = p.x - R, Rt = p.x + R, T = p.y - R, B = p.y + R;
    if (Rt <= qx || L >= qx + s || B <= qy || T >= qy + s) return 'out';
    if (L >= qx && Rt <= qx + s && T >= qy && B <= qy + s) return 'in';
    if (Rt > qx + s || B > qy + s) return 'edge_out';
    return 'edge_in';
  }
  // Every plant of one species at one quadrat, sorted by where it is.
  function classify(plants, sp, qx, qy) {
    const c = { in: [], edge_in: [], edge_out: [] };
    plants.forEach(p => { if (p.sp !== sp) return; const w = where(p, qx, qy); if (w !== 'out') c[w].push(p.id); });
    return c;
  }
  // How many a pupil counts, by the rule they used.
  //   'rule' - the edge rule · 'all' - everything touching the frame · 'inside' - only the wholly-inside ones
  function countBy(c, rule) {
    if (rule === 'all') return c.in.length + c.edge_in.length + c.edge_out.length;
    if (rule === 'inside') return c.in.length;
    return c.in.length + c.edge_in.length;
  }
  const countQuad = (plants, sp, qx, qy, rule) => countBy(classify(plants, sp, qx, qy), rule || 'rule');
  // The species found in one quadrat (by the rule) - the "number of species" the syllabus asks for.
  function speciesIn(plants, qx, qy) {
    return SPECIES_ORDER.filter(sp => countQuad(plants, sp, qx, qy) > 0);
  }

  // ── The estimate ─────────────────────────────────
  // mean per quadrat × (area of the plot ÷ area of one quadrat)
  function estimate(counts, area, qArea) {
    const A = area || FIELD.area, q = qArea || QUAD.area;
    const n = counts.length;
    const total = counts.reduce((a, b) => a + b, 0);
    const mean = n ? total / n : 0;
    const factor = A / q;
    return { n, total, mean, factor, est: mean * factor, rounded: Math.round(mean * factor) };
  }
  const EST_FORMULA = 'estimated population = mean number per quadrat × (area of the plot ÷ area of one quadrat)';

  // ── The 400 grid squares ─────────────────────────
  // Random coordinates choose a square: x from 0 to 19 m, y from 0 to 19 m.
  function squares() {
    const out = [];
    for (let y = 0; y < FIELD.h; y++) for (let x = 0; x < FIELD.w; x++) out.push([x, y]);
    return out;
  }
  const key = (x, y) => x + ',' + y;
  // n different squares, never one already used.
  function randomSquares(r, n, taken) {
    const used = new Set(taken || []);
    const free = squares().filter(([x, y]) => !used.has(key(x, y)));
    const out = [];
    for (let i = 0; i < n && free.length; i++) out.push(free.splice(Math.floor(r() * free.length), 1)[0]);
    return out;
  }
  // The squares where one species is thickest - the BIASED way to place quadrats.
  function thickest(plants, sp, n, taken) {
    const used = new Set(taken || []);
    return squares().filter(([x, y]) => !used.has(key(x, y)))
      .map(([x, y], i) => ({ x, y, i, c: countQuad(plants, sp, x, y) }))
      .sort((a, b) => b.c - a.c || a.i - b.i).slice(0, n).map(s => [s.x, s.y]);
  }
  // Count every square (a census). With the edge rule this is exactly the true population.
  function census(plants, sp) {
    const t = { rule: 0, all: 0, inside: 0, min: Infinity, max: 0 };
    squares().forEach(([x, y]) => {
      const c = classify(plants, sp, x, y);
      const k = countBy(c, 'rule');
      t.rule += k; t.all += countBy(c, 'all'); t.inside += countBy(c, 'inside');
      t.min = Math.min(t.min, k); t.max = Math.max(t.max, k);
    });
    return t;
  }

  // ── What unlocks a discovery ─────────────────────
  // After a quadrat is counted.
  function countDiscoveries(s) {
    const out = [];
    if (s.quads.length >= 1) out.push('first_quadrat');
    if (s.quads.length >= MIN_Q) out.push('richness');
    return out;
  }
  // After an estimate. e = { sp, n, random, events: [...], history: [{ sp, n, random, key }] }
  function estimateDiscoveries(e) {
    const out = [];
    if (!e.random || e.n < MIN_Q) return out;
    out.push('estimate');
    if (e.n >= 20) out.push('more_quadrats');
    if (e.sp === 'ebony' && e.n >= MISSION_Q) out.push('endemic');
    if (e.sp === 'lantana') out.push('lantana');
    const ev = e.events || [];
    if (ev.includes('cyclone')) out.push('cyclone');
    if (ev.includes('drought')) out.push('drought');
    if (ev.includes('spread')) out.push('spread');
    if (ev.includes('clear')) out.push('clearing');
    if (ev.includes('weed')) out.push('conservation');
    const k = ev.join('>');
    const done = sp => (e.history || []).some(h => h.sp === sp && h.random && h.n >= MIN_Q && h.key === k);
    if (done('guava') && done('ebony')) out.push('compare');
    return out;
  }

  // ── Discoveries ─────────────────────────────────
  // how = guide tokens (see GUIDES below). scripts/test-labs-quadrat.js follows
  // every `how` from a fresh bench and fails if it does not unlock its own card.
  const G = 'gloves:on';
  const DISCOVERIES = [
    { id: 'first_quadrat', icon: '🟩', title: 'Your first quadrat', hint: 'Throw the quadrat at random and count what is inside',
      how: [G, 'species:guava', 'throw', 'count'],
      saw: 'The quadrat landed at two random coordinates. You counted the strawberry guava plants inside its 1 m × 1 m frame.',
      learn: 'A quadrat is a square frame of known area. Counting the organisms inside it gives a sample of the plot - one square metre out of four hundred.' },
    { id: 'richness', icon: '📋', title: 'How many species?', hint: 'Count five quadrats and look at the last column of your table',
      how: [G, 'species:guava', 'auto5'],
      saw: 'Your results table recorded, for each quadrat, which species were growing inside it - some had one species, some several, some none.',
      learn: 'The syllabus asks you to use quadrats to estimate and record the NUMBER OF SPECIES in an ecosystem. The more different species in an area, the greater its biodiversity.' },
    { id: 'estimate', icon: '🧮', title: 'From a sample to a population', hint: 'Five random quadrats, then work out the estimate',
      how: [G, 'species:guava', 'auto5', 'estimate'], formula: true,
      saw: 'From five random quadrats you worked out the mean number per quadrat and scaled it up to the whole 400 m² plot.',
      learn: 'Estimated population = mean number per quadrat × (area of the plot ÷ area of one quadrat). A 1 m² quadrat fits into a 400 m² plot 400 times, so the mean is multiplied by 400.' },
    { id: 'more_quadrats', icon: '📈', title: 'More quadrats, a steadier estimate', hint: 'Keep going to twenty random quadrats before you estimate',
      how: [G, 'species:guava', 'auto5', 'auto5', 'auto5', 'auto5', 'estimate'], formula: true,
      saw: 'Your notebook graph shows the running estimate after each quadrat. Early on, one thicket or one bare square can pull it a long way; as the quadrats add up it usually settles.',
      learn: 'The plants grow in patches, so any one quadrat may land in a thicket or on bare ground. The more random quadrats you average, the less one unusual square can pull the mean - the estimate becomes more reliable.' },
    { id: 'census', icon: '🔢', title: 'Every plant counted once', hint: 'Count every one of the 400 squares - a census',
      how: ['species:guava', 'census'],
      saw: 'Counting all 400 squares with the edge rule gave exactly the true population. Counting every plant touching a frame gave too many; counting only the ones wholly inside gave too few.',
      learn: 'With one edge rule - count a plant on the top or left side, not on the bottom or right - every plant is counted in exactly one square. (The edge rule is beyond the NCE syllabus, but it keeps your counts fair.) In real fieldwork a full census takes far too long; that is why we sample.' },
    { id: 'endemic', icon: '🌱', title: 'An endemic seedling', hint: 'Survey the Mauritian ebony seedlings with ten random quadrats',
      how: [G, 'species:ebony', 'auto5', 'auto5', 'estimate'],
      saw: 'Many of your quadrats held no ebony seedlings at all: they are rare and scattered through the plot.',
      learn: 'The Mauritian ebony is ENDEMIC: it grows naturally in Mauritius and nowhere else on Earth, so if it is lost here it is lost everywhere. A rare, scattered species gives many zeros, so it needs MORE quadrats for a reliable estimate.' },
    { id: 'lantana', icon: '🧤', title: 'Handle with care', hint: 'Gloves on, then survey the lantana',
      how: [G, 'species:lantana', 'auto5', 'estimate'],
      saw: 'You surveyed lantana, a prickly invasive shrub, wearing gloves. It grows in a single patch at the sunny edge of the clearing.',
      learn: 'Lantana is an invasive alien species in Mauritius. A species that grows in one small patch is easy for random quadrats to miss altogether - one more reason to use plenty of quadrats.' },
    { id: 'compare', icon: '⚖️', title: 'Invader against native', hint: 'Estimate the strawberry guava, then the ebony, in the same plot',
      how: [G, 'species:guava', 'auto5', 'estimate', 'species:ebony', 'auto5', 'estimate'],
      saw: 'In the same plot the invasive strawberry guava far outnumbered the endemic ebony seedlings.',
      learn: 'An invasive alien species is brought in from elsewhere and spreads at the expense of native species. In Mauritius, strawberry guava forms dense thickets in the native forest, and the native seedlings cannot grow in their shade.' },
    { id: 'cyclone', icon: '🌀', title: 'After the cyclone', hint: 'Let a cyclone cross the plot, then survey it',
      how: [G, 'species:guava', 'event:cyclone', 'auto5', 'estimate'],
      saw: 'After the cyclone the ranger's full count was lower for every species - and the strawberry guava was already sprouting in the gaps.',
      learn: 'Cyclones are a natural threat to biodiversity in Mauritius (the cyclone season runs from November to April). They uproot trees and destroy habitats, and the open gaps they leave are quickly taken over by fast-growing invasive plants.' },
    { id: 'drought', icon: '☀️', title: 'After the drought', hint: 'A drought, then survey the ebony seedlings',
      how: [G, 'species:ebony', 'event:drought', 'auto5', 'estimate'],
      saw: 'After the drought the ranger's full count showed that many seedlings had died - the young ebony seedlings most of all.',
      learn: 'A drought is a natural threat: without water, plants die, and the animals that depend on them lose food and shelter. Young seedlings with short roots are the first to go.' },
    { id: 'spread', icon: '⏩', title: 'Ten years of invasion', hint: 'Let ten years pass, then survey the strawberry guava',
      how: [G, 'species:guava', 'event:spread', 'auto5', 'estimate'],
      saw: 'Ten years later the strawberry guava had spread far beyond its first thickets.',
      learn: 'Invasive alien species are a human threat to biodiversity: people brought them to Mauritius, and with no natural enemies here they spread and crowd out native plants.' },
    { id: 'clearing', icon: '🪓', title: 'Habitat lost', hint: 'Clear a strip of the plot for farmland, then survey it',
      how: [G, 'species:guava', 'event:clear', 'auto5', 'estimate'],
      saw: 'The cleared strip is bare earth - no plants and no habitat - and the ranger's full count fell for the species that grew there.',
      learn: 'Deforestation - clearing forest for farms, roads or buildings - destroys habitats, so the species that lived there disappear from the area. Very little of Mauritius is still covered by good native forest.' },
    { id: 'conservation', icon: '🧑‍🌾', title: 'Conservation works', hint: 'Weed out the invaders, then survey the ebony seedlings',
      how: [G, 'species:ebony', 'event:weed', 'auto5', 'estimate'],
      saw: 'With the invasive plants weeded out, the ranger's count showed the ebony seedlings had increased.',
      learn: 'Protecting habitats and controlling invasive species are the two conservation measures that work together. In Mauritius, fenced and weeded Conservation Management Areas let native plants grow back.' },
  ];

  // ── Hazards: the mistakes that stop the fieldwork ───
  const HAZARDS = {
    lantana: {
      signs: ['irritant'],
      title: () => 'Prickles! Bare hands in the lantana',
      happened: () => 'You reached into the quadrat with bare hands to part the plants and count them. There was lantana (vieille fille) inside: its stems are covered in small hooked prickles, and its rough leaves can make skin itchy and sore.',
      why: 'Scratches from prickly plants can become infected, and the sap and leaves of some plants irritate the skin. Lantana berries are poisonous, especially the green unripe ones - never eat any fruit or berry you find during fieldwork.',
      instead: 'Wear gloves and long sleeves for fieldwork. Move plants aside with a pencil or a stick instead of your fingers, never taste anything you find, and wash your hands when you finish.',
      exam: '"State one safety precaution" earns a mark on the NCE science papers (for example Chemistry 2022 Q5(a)(ii)). For fieldwork: wear gloves, never eat any plant or berry, and wash your hands afterwards.',
    },
  };

  // ── Wrong but safe: what went wrong and what to do instead ───
  const RESULTS = {
    biased: { icon: '🎯', title: 'Biased sampling: an overestimate',
      happened: c => c.thick
        ? `You put the quadrats where the ${c.name} were thickest. They held a mean of ${c.mean} each, so your estimate was ${c.est} - but the true population is ${c.trueN}. Your estimate is ${c.times} times the true number, because those squares are nothing like an average square of the plot.`
        : `You chose where to put ${c.k} of your quadrats instead of throwing them at random. Your estimate was ${c.est}; the true population is ${c.trueN}. Whether a chosen square is thick or bare, your choice - not chance - decided what was sampled, so the estimate cannot be trusted.`,
      instead: 'Place the quadrats at RANDOM - for example, use random numbers as x and y coordinates on a grid laid over the plot. Then every square, thick or bare, has the same chance of being sampled.',
      exam: '"Why are quadrats placed at random?" - so that the sample represents the whole area and is not biased. Choosing the thickest patches gives an estimate that is far too high.' },
    too_few: { icon: '📉', title: 'Too few quadrats to trust',
      happened: c => `You estimated the population from only ${c.n} quadrat${c.n === 1 ? '' : 's'}: ${c.est}. But these plants grow in patches - in this plot one quadrat can hold anything from ${c.min} to ${c.max} plants, so one quadrat alone could give an estimate anywhere from ${c.lo} to ${c.hi}.`,
      instead: `Use more quadrats - at least ${MIN_Q}, and ${MISSION_Q} or more is better - placed at random, and take the MEAN. The more quadrats, the more reliable the estimate.`,
      exam: '"Suggest how the student could make the estimate more reliable" - use more quadrats, place them at random, and calculate the mean.' },
    edge: { icon: '📐', title: 'Plants on the frame: no rule',
      happened: c => c.mode === 'all'
        ? `You counted all the ${c.name} touching the frame: ${c.said}. But ${c.extra} of them cross the bottom or right side - the next quadrat along would count them as well. With the edge rule the count is ${c.right}. Counted your way in every square, the estimate for the plot would be about ${c.pct}% too HIGH.`
        : `You counted only the ${c.name} wholly inside the frame: ${c.said}. But ${c.extra} of them cross the top or left side and belong to this quadrat. With the edge rule the count is ${c.right}. Counted your way in every square, the estimate for the plot would be about ${c.pct}% too LOW.`,
      instead: 'Choose ONE rule for plants on the frame and use it in every quadrat. A common rule: count a plant if it crosses the TOP or LEFT side; leave it out if it crosses the BOTTOM or RIGHT side. Then no plant is counted twice and none is missed. (The edge rule is beyond the NCE syllabus, but it keeps your counts fair.)',
      exam: '"Suggest one way to improve the accuracy of the estimate" - count the plants in the same way in every quadrat, use more quadrats, and place them at random.' },
  };

  // Short, true facts for the 💡 button. Tied to the chapter.
  const FACTS = [
    'Biodiversity is the variety of living things in an area. It is measured by counting SPECIES, not individuals.',
    'An endemic species is found naturally in one place and nowhere else on Earth. The dodo was endemic to Mauritius.',
    'The pink pigeon is endemic to Mauritius. By about 1990 only around ten were left in the wild; captive breeding brought it back.',
    'In 1974 only four wild Mauritius kestrels were known. Captive breeding and release brought the population back to several hundred.',
    'Strawberry guava (goyave de Chine) is one of the most harmful invasive plants in the native forests of Mauritius.',
    'An invasive alien species is brought in from elsewhere by people and spreads at the expense of native species.',
    'Rats, monkeys and the mongoose were brought to Mauritius by people. They eat the eggs and chicks of native birds.',
    'Quadrats suit plants and slow-moving animals. A bird or a fish would leave the frame before you could count it.',
    'Random positions are chosen with random numbers used as x and y coordinates on a grid over the area.',
    'Plants such as grass are hard to count one by one, so ecologists estimate their percentage cover of the quadrat instead.',
    'Mauritius lies in the cyclone belt of the Indian Ocean; the cyclone season runs from November to April.',
    'Black River Gorges National Park protects much of what is left of the native forest of Mauritius.',
    'Very little of Mauritius is still covered by good native forest - most was cleared for sugar cane, towns and roads.',
    'Lantana berries are poisonous, especially green unripe ones. Never eat any fruit or berry you find during fieldwork.',
  ];

  // ── The model's own numbers, for the quiz ────────
  const _T0 = makeField([]), _T1 = makeField(['spread']), _T2 = makeField(['spread', 'weed']);
  const TRUE = {
    guava0: truePop(_T0, 'guava'), guava1: truePop(_T1, 'guava'), guava2: truePop(_T2, 'guava'),
    ebony0: truePop(_T0, 'ebony'), ebony1: truePop(_T1, 'ebony'), ebony2: truePop(_T2, 'ebony'),
  };

  // The calculation question, built from the pupil's OWN counts.
  function calcQuestion(counts, name) {
    const e = estimate(counts);
    const right = e.rounded;
    const forgot = e.total * e.factor;
    const meanTxt = Math.round(e.mean * 100) / 100;
    const cand = [forgot, meanTxt, e.total, Math.round(e.mean * Math.sqrt(e.factor)), right * 2];
    for (let k = 1; k <= 6; k++) cand.push(right + k * e.factor);
    const opts = [String(right)];
    cand.forEach(v => { const s = String(v); if (opts.length < 4 && !opts.includes(s)) opts.push(s); });
    const exact = Math.abs(e.est - right) < 1e-9;
    return {
      q: `Your ${e.n} quadrat${e.n === 1 ? '' : 's'} held ${e.total} ${name || 'plants'} in total. The plot is ${FIELD.area} m² and each quadrat is ${QUAD.area} m². Estimate the population in the plot.`,
      options: opts,
      why: `Mean = ${e.total} ÷ ${e.n} = ${meanTxt} per quadrat. Estimate = mean × (${FIELD.area} ÷ ${QUAD.area}) = ${meanTxt} × ${e.factor} ${exact ? '=' : '≈'} ${right}.`
        + (forgot !== right && opts.includes(String(forgot)) ? ` (${forgot} forgets to divide by the number of quadrats.)` : ''),
    };
  }

  // ── Missions ── A question's FIRST option is the answer; the quiz shuffles them.
  const MISSIONS = [
    {
      id: 'estimate', icon: '🧮', title: 'Estimate the population', sp: 'guava', need: MISSION_Q,
      blurb: 'At least 10 random quadrats of strawberry guava, then the estimate - and the questions.',
      intro: `Estimate how many strawberry guava plants grow in the 400 m² plot. Gloves on, then throw the quadrat at random at least ${MISSION_Q} times, count each one with the edge rule, and work out the estimate.`,
      calc: true,
      quiz: [
        { q: 'Five 1 m² quadrats gave 4, 6, 5, 7 and 3 plants. The field is 200 m². Estimate the number of plants in the field.',
          options: ['1000', '5000', '25', '200'],
          why: 'Mean = (4 + 6 + 5 + 7 + 3) ÷ 5 = 25 ÷ 5 = 5 per m². Estimate = 5 × 200 = 1000. (5000 forgets to divide by the number of quadrats.)' },
        { q: 'Why were the quadrats placed at random?',
          options: ['So the sample represents the whole plot, without bias', 'So the counting takes less time', 'So the quadrats land where the plants are thickest', 'So the same plants are counted in every quadrat'],
          why: 'Random placing gives every part of the plot the same chance of being sampled. Choosing the thick patches would give an estimate that is far too high.' },
        { q: 'Suggest how the estimate could be made more reliable.',
          options: ['Use more quadrats, placed at random, and take the mean', 'Use one very carefully placed quadrat', 'Put every quadrat in the thickest patch', 'Count the plants from a distance, without a quadrat'],
          why: 'One quadrat may not be typical of the whole area. Averaging many random quadrats gives a far more reliable estimate.' },
        { q: 'A plant lies across the frame of the quadrat. What should you do?',
          options: ['Use one rule every time, such as counting it only if it crosses the top or left side', 'Count it in every quadrat it touches', 'Always leave it out, in every quadrat', 'Pull it up so that it is no longer on the frame'],
          why: 'One consistent rule means no plant is counted twice or missed. The rule itself is beyond the NCE syllabus; using the same method in every quadrat is what makes the estimate fair.' },
        { q: 'Which of these can be estimated using a quadrat?',
          options: ['Algae', 'Birds', 'Dogs', 'Fish'],
          why: 'Biology 2024 paper. A quadrat counts organisms that stay put, such as plants and algae. Birds, dogs and fish move, so they would be missed or counted twice.' },
      ],
    },
    {
      id: 'random', icon: '🎲', title: 'Why random?', sp: 'guava', need: MISSION_Q,
      blurb: 'Survey the guava twice - once where it is thickest, once at random - and compare.',
      intro: `First put ${MIN_Q} quadrats where the strawberry guava is thickest, count them and estimate. Then start a new survey and throw at least ${MISSION_Q} quadrats at random. Which estimate is closer to the truth?`,
      quiz: [
        { q: 'Which survey gave the estimate closest to the true population?',
          options: ['The random survey', 'The survey in the thickest patches', 'Both gave exactly the true number', 'Neither: quadrats cannot estimate a population'],
          why: 'The quadrats in the thickest patches held far more plants than an average square metre, so that estimate was far too high. The random quadrats represented the whole plot.' },
        { q: 'What is wrong with choosing where to put the quadrats?',
          options: ['The sample is biased - it does not represent the whole area', 'It causes a parallax error', 'It causes a zero error', 'It changes the area of the quadrat'],
          why: 'Choosing the spots lets the person's choice decide what is sampled - that is bias.' },
        { q: 'How are random positions usually chosen for quadrats?',
          options: ['Random numbers are used as x and y coordinates on a grid over the area', 'The quadrat is placed wherever the most species are', 'The quadrat is placed beside the path, where it is easiest to walk', 'The quadrat is always placed in the centre of the area'],
          why: 'A pair of random numbers from a table or a calculator gives the x and y coordinates, so nobody chooses the spot.' },
        { q: 'Why does sampling only the thickest patches give an estimate that is far too high?',
          options: ['Those patches hold far more plants than an average square metre of the plot', 'The quadrat becomes larger in a thick patch', 'The edge rule counts plants twice in a thick patch', 'Thick patches contain fewer species'],
          why: 'The estimate multiplies the mean by 400, so a mean taken only from the thickets is multiplied up across bare ground as well.' },
        { q: 'A student put every quadrat in the shade under the trees because it was easier. What is wrong with the results?',
          options: ['They are biased: the shade may not represent the whole area', 'Nothing: shade does not affect plants', 'They are more accurate, because shade is cooler', 'Quadrats can never be used under trees'],
          why: 'Placing quadrats in chosen spots rather than at random is biased sampling - the shade has different conditions from the open ground.' },
      ],
    },
    {
      id: 'threat', icon: '🦋', title: 'Invasion and recovery', sp: 'guava', need: MIN_Q,
      blurb: 'Survey the plot, let the invaders spread for ten years, then save it - and survey each time.',
      intro: `Survey the strawberry guava (at least ${MIN_Q} random quadrats, then estimate). Let ten years of invasion pass and survey again. Then weed out the invaders and survey a third time.`,
      stages: [[], ['spread'], ['spread', 'weed']],
      quiz: [
        { q: `In ten years the ranger's full count of strawberry guava rose from ${TRUE.guava0} to ${TRUE.guava1}. What kind of threat to biodiversity is this?`,
          options: ['An invasive alien species spreading', 'A natural calamity, like a cyclone', 'Pollution of the soil', 'Over-fishing'],
          why: 'Strawberry guava was brought to Mauritius by people and spreads with nothing to control it - an invasive alien species (Biology 2022 Q1(5) asks about invasive aliens).' },
        { q: `Over the same ten years the ebony seedlings fell from ${TRUE.ebony0} to ${TRUE.ebony1}. Suggest why.`,
          options: ['The spreading thickets shaded them out and took their space', 'The ebony seedlings were eaten by the guava', 'Ebony only grows for ten years', 'The quadrats damaged the ebony seedlings'],
          why: 'Invasive plants compete with native ones for light and space. In the shade of a dense thicket, native seedlings cannot grow.' },
        { q: 'The plot was then weeded and fenced as a conservation area. Which result shows that this worked?',
          options: ['The number of ebony seedlings increased once the invaders were removed', 'The number of strawberry guava plants increased', 'The plot had no plants at all', 'The estimate needed fewer quadrats'],
          why: `Native seedlings regrow once light reaches the ground again - in the model, from ${TRUE.ebony1} to ${TRUE.ebony2}. Protecting habitat and controlling invasive species work together.` },
        { q: 'Only four wild Mauritius kestrels were known in 1974. Captive breeding and release brought the population back to several hundred. What does this show?',
          options: ['Conservation can bring a species back from near extinction', 'Extinction can always be reversed', 'The kestrel was never in danger', 'Captive breeding works for every species equally'],
          why: 'The Mauritius kestrel recovery is examined as a graph (Biology 2022 Q5): careful conservation, started in time, rebuilt the population.' },
        { q: 'Which of these is endemic to Mauritius?',
          options: ['The pink pigeon', 'The common myna', 'Strawberry guava', 'The giant African land snail'],
          why: 'Biology 2023 Q1(10). The pink pigeon is found naturally in Mauritius and nowhere else. The other three were all brought to Mauritius by people.' },
        { q: 'Name a natural event that is a serious threat to biodiversity in Mauritius.',
          options: ['A cyclone', 'A light shower of rain', 'A cool night in winter', 'A high tide'],
          why: 'Cyclones uproot trees and destroy habitats. Droughts are the other natural threat named in the syllabus.' },
      ],
    },
  ];

  // ── Guided experiments: "I landed here - what do I do?" ──
  // One action per step. `on` is what completes it:
  //   species:<id> · gloves:on|off · view:field|zoom · throw · thick · count
  //   count:all|inside · record · auto5 · estimate · new · census
  //   event:<id> · restore
  // A step whose setting is already in place is skipped.
  const GUIDES = [
    { id: 'first', icon: '🟩', title: 'Throw your first quadrats',
      blurb: 'Throw a quadrat at random, count the guava inside, and estimate the whole plot.',
      lesson: 'You sampled the plot with random quadrats, took the mean number per quadrat and multiplied it by 400 (the plot is 400 m², each quadrat 1 m²). That is how ecologists estimate a population they could never count one by one.',
      steps: [
        { on: 'gloves:on',     say: 'Tap 🧤 Gloves on — some plants here have prickles.' },
        { on: 'species:guava', say: 'Tap 🍒 Strawberry guava to choose what to count.' },
        { on: 'throw',         say: 'Tap 🎲 Throw at random to place your first quadrat.' },
        { on: 'count',         say: 'Tap ✅ Count — plants on the frame count only if they cross the top or left side.' },
        { on: 'throw',         say: 'Tap 🎲 Throw again — one square metre is not enough.' },
        { on: 'count',         say: 'Tap ✅ Count this one too.' },
        { on: 'auto5',         say: 'Tap ⏩ 5 more at random to throw and count five quadrats.' },
        { on: 'estimate',      say: 'Tap 🧮 Work out the estimate — mean per quadrat × (400 ÷ 1).' },
      ] },
    { id: 'census', icon: '🔢', title: 'Is the estimate right?',
      blurb: 'Estimate from ten quadrats, then count all 400 squares and compare.',
      lesson: 'The census counted every plant once and gave the true population. Your estimate from only ten of the 400 squares came close to it - close enough to be useful, from a fortieth of the work. That is why ecologists sample.',
      steps: [
        { on: 'gloves:on',     say: 'Tap 🧤 Gloves on first.' },
        { on: 'species:guava', say: 'Tap 🍒 Strawberry guava.' },
        { on: 'auto5',         say: 'Tap ⏩ 5 at random to throw five quadrats.' },
        { on: 'auto5',         say: 'Tap ⏩ 5 more — ten altogether.' },
        { on: 'estimate',      say: 'Tap 🧮 Work out the estimate for the whole plot.' },
        { on: 'census',        say: 'Tap 🔢 Count every square — a full census. How close were you?' },
      ] },
    { id: 'invasion', icon: '⏩', title: 'Ten years of invasion',
      blurb: 'Survey the guava, let ten years pass, and survey it again.',
      lesson: 'Ten years on, the invasive strawberry guava had spread and your second estimate was higher. Invasive alien species are one of the biggest human threats to biodiversity in Mauritius.',
      steps: [
        { on: 'gloves:on',     say: 'Tap 🧤 Gloves on.' },
        { on: 'species:guava', say: 'Tap 🍒 Strawberry guava.' },
        { on: 'auto5',         say: 'Tap ⏩ 5 at random for five quadrats.' },
        { on: 'auto5',         say: 'Tap ⏩ 5 more.' },
        { on: 'estimate',      say: 'Tap 🧮 Work out the estimate — that is the guava count today.' },
        { on: 'event:spread',  say: 'Tap ⏩ 10 years of invasion — let time pass.' },
        { on: 'auto5',         say: 'Tap ⏩ 5 at random to survey the plot again.' },
        { on: 'auto5',         say: 'Tap ⏩ 5 more.' },
        { on: 'estimate',      say: 'Tap 🧮 Work out the estimate — how much has it grown?' },
      ] },
    { id: 'ebony', icon: '🌱', title: 'Find the endemic ebony',
      blurb: 'Survey a rare, scattered species that grows nowhere else on Earth.',
      lesson: 'The ebony seedlings are rare and scattered, so most quadrats held none. A rare species needs many quadrats for a reliable estimate - and because it is endemic, every one of them matters.',
      steps: [
        { on: 'gloves:on',      say: 'Tap 🧤 Gloves on.' },
        { on: 'species:ebony',  say: 'Tap 🌱 Ebony seedlings — an endemic species found nowhere else on Earth.' },
        { on: 'auto5',          say: 'Tap ⏩ 5 at random to throw five quadrats.' },
        { on: 'auto5',          say: 'Tap ⏩ 5 more.' },
        { on: 'estimate',       say: 'Tap 🧮 Work out the estimate — how many zeros are in your table?' },
      ] },
  ];

  return { FIELD, QUAD, R, MIN_Q, MISSION_Q, SPECIES, SPECIES_ORDER, STATUS_WORDS, EVENTS, EVENT_ORDER, TRUE,
           rng, makeField, yearOf, truePop, where, classify, countBy, countQuad, speciesIn,
           estimate, EST_FORMULA, squares, key, randomSquares, thickest, census,
           countDiscoveries, estimateDiscoveries, calcQuestion,
           DISCOVERIES, HAZARDS, RESULTS, FACTS, MISSIONS, GUIDES };
})();
if (typeof window !== 'undefined') window.LabQuadratData = LabQuadratData;
