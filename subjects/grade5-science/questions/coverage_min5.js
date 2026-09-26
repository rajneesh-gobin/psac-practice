'use strict';
// ⚠ Every question here used to carry the explanation `<b>${a}</b> is correct.`
//   — a restatement of the answer, which teaches a child nothing. The data
//   rows are now [question, answer, explanation] and each says WHY.
// ⚠ Order within each group is load-bearing: ids are `g5s-min5-${p}-${i}`,
//   the importer keys on them and never deletes, so rows must not be
//   reordered or removed.
(function () {
  const G5SMIN_LEARN = {
    'g5s-min5-photo-0': '<b>Photosynthesis</b> is the process by which green plants make their own food. Ingredients: sunlight + water + carbon dioxide → food (glucose) + oxygen. It happens mainly in the <b>leaves</b>, which are broad and flat to catch as much sunlight as possible.',
    'g5s-min5-photo-1': 'During <b>photosynthesis</b> a plant takes in <i>carbon dioxide</i> and releases <i>oxygen</i>. This is the opposite of what animals do when they breathe. Green plants are the source of all the oxygen in the atmosphere that animals depend on.',
    'g5s-min5-cycle-0': 'The <b>water cycle</b> is driven by the <i>Sun</i>. Heat from the Sun causes <i>evaporation</i> (water turns to vapour). Vapour rises, cools and <i>condenses</i> into clouds. Clouds release water as <i>precipitation</i> (rain, snow). Water returns to the sea and the cycle repeats.',
    'g5s-min5-diagram-1': '<b>Condensation</b> happens when water vapour cools down and changes back into liquid water droplets. It is the opposite of evaporation. You see condensation every day: the mist on a cold glass, or steam turning to droplets on a window.',
  };
  const add = (id, c, s, q, o, a, h, e) => STATIC_QUESTIONS.push(makeMCQ({
    id, chapterId: c, subsection: s, difficulty: 2, question: q,
    options: o, answer: a, hint: h, explanation: e,
    learnMore: G5SMIN_LEARN[id] || ''
  }));
  const rows = (p, c, s, d, o, h) => d.forEach(([q, a, e], i) =>
    add(`g5s-min5-${p}-${i}`, c, s, q, o, a, h, e));

  // photosynthesis
  add('g5s-min5-photo-0', 'plants', 'photosynthesis',
    'Plants use sunlight, water and carbon dioxide to make…',
    ['food', 'seeds', 'water', 'minerals'], 'food',
    'Sunlight, water and carbon dioxide are the ingredients. What does the plant produce from them?',
    'Those three are the ingredients. From them a plant builds its own <b>food</b> inside its leaves — no other living thing has to feed it.');
  add('g5s-min5-photo-1', 'plants', 'photosynthesis',
    'What gas do plants release during photosynthesis?',
    ['oxygen', 'carbon dioxide', 'nitrogen', 'water vapour'], 'oxygen',
    'Sunlight, water and carbon dioxide are the ingredients. What does the plant produce from them?',
    'A plant takes in carbon dioxide and gives out <b>oxygen</b>. That is why green plants keep the air breathable for animals and people.');
  add('g5s-min5-photo-2', 'plants', 'photosynthesis',
    'Which plant part usually absorbs sunlight?',
    ['leaves', 'roots', 'stem', 'flowers'], 'leaves',
    'Sunlight, water and carbon dioxide are the ingredients. What does the plant produce from them?',
    '<b>Leaves</b> are broad and flat so they catch as much light as possible, and they hold the green colouring that traps it.');
  add('g5s-min5-photo-3', 'plants', 'photosynthesis',
    'Why is photosynthesis important?',
    ['to make food', 'to absorb water', 'to release carbon dioxide', 'to produce seeds'], 'to make food',
    'Sunlight, water and carbon dioxide are the ingredients. What does the plant produce from them?',
    'It is how a plant feeds itself. Every food chain starts with plants making that food, so animals depend on it too.');

  // water-cycle diagrams
  add('g5s-min5-diagram-0', 'water-matter', 'diagrams',
    'In a water-cycle diagram, arrows show…',
    ['how water moves', 'where fish live', 'the colour of water', 'how deep the ocean is'], 'how water moves',
    'Follow the water\'s journey.',
    'The arrows trace the journey: up as vapour, across as cloud, then back down as rain. They show <b>how water moves</b>, not where it stays.');
  add('g5s-min5-diagram-1', 'water-matter', 'diagrams',
    'What happens when water vapour cools?',
    ['it condenses', 'it evaporates', 'it melts', 'it freezes'], 'it condenses',
    'Follow the water\'s journey.',
    'Cooling slows the vapour down until it turns back into tiny drops of liquid. That change is called condensation.');
  add('g5s-min5-diagram-2', 'water-matter', 'diagrams',
    'Clouds form through…',
    ['condensation', 'evaporation', 'precipitation', 'transpiration'], 'condensation',
    'Follow the water\'s journey.',
    'Water vapour rises, meets colder air high up and <b>condenses</b> into the tiny droplets we see as cloud.');

  // water cycle
  add('g5s-min5-cycle-0', 'water-matter', 'water_cycle',
    'What heats water so that it evaporates?',
    ['the Sun', 'the Moon', 'the wind', 'rainfall'], 'the Sun',
    'The water cycle has a stage where water rises, one where it forms clouds, and one where it comes back down. Which is this?',
    '<b>The Sun</b> supplies the heat that drives the whole water cycle, lifting water from the sea, from rivers and even from puddles.');
  add('g5s-min5-cycle-1', 'water-matter', 'water_cycle',
    'Water vapour is water in the…',
    ['gas state', 'liquid state', 'solid state', 'frozen state'], 'gas state',
    'The water cycle has a stage where water rises, one where it forms clouds, and one where it comes back down. Which is this?',
    'Vapour is water in its <b>gas state</b> — the same substance as ice and liquid water, but with the particles spread far apart, so we cannot see it.');
  add('g5s-min5-cycle-2', 'water-matter', 'water_cycle',
    'What is rain falling from clouds called?',
    ['precipitation', 'evaporation', 'condensation', 'transpiration'], 'precipitation',
    'The water cycle has a stage where water rises, one where it forms clouds, and one where it comes back down. Which is this?',
    '<b>Precipitation</b> is the word for any water falling from cloud, whether it arrives as rain, hail or snow.');
  add('g5s-min5-cycle-3', 'water-matter', 'water_cycle',
    'Water collects in rivers and seas after…',
    ['precipitation', 'evaporation', 'condensation', 'transpiration'], 'precipitation',
    'The water cycle has a stage where water rises, one where it forms clouds, and one where it comes back down. Which is this?',
    'Once water has fallen as <b>precipitation</b> it runs downhill and gathers, ready for the Sun to evaporate it again. That is what makes it a cycle.');

  // properties of water
  add('g5s-min5-property-0', 'water-matter', 'properties',
    'Ice is water in the…',
    ['solid state', 'liquid state', 'gas state', 'melting state'], 'solid state',
    'Think about the three states of water.',
    'Frozen water holds its own shape instead of flowing, and that is what makes it a <b>solid</b>.');
  add('g5s-min5-property-1', 'water-matter', 'properties',
    'Water in a glass is a…',
    ['liquid', 'solid', 'gas', 'vapour'], 'liquid',
    'Think about the three states of water.',
    'A <b>liquid</b> takes the shape of whatever holds it but keeps the same amount. Pour it into a different glass and it looks different but there is no more of it.');
  add('g5s-min5-property-2', 'water-matter', 'properties',
    'Steam is water in the…',
    ['gas state', 'solid state', 'liquid state', 'frozen state'], 'gas state',
    'Think about the three states of water.',
    'In the <b>gas state</b> the particles spread out to fill whatever space they are in, so steam has neither its own shape nor its own size.');
  add('g5s-min5-property-3', 'water-matter', 'properties',
    'Which change turns ice into water?',
    ['melting', 'freezing', 'evaporation', 'condensation'], 'melting',
    'Think about the three states of water.',
    'Adding heat loosens a solid into a liquid. That change is <b>melting</b>.');
  add('g5s-min5-property-4', 'water-matter', 'properties',
    'Which change turns water into ice?',
    ['freezing', 'melting', 'evaporation', 'boiling'], 'freezing',
    'Think about the three states of water.',
    'Taking heat away sets a liquid into a solid. That change is <b>freezing</b> — the exact opposite of melting.');

  // electricity components
  add('g5s-min5-component-0', 'electricity', 'components',
    'Which component provides energy in a simple circuit?',
    ['a cell', 'a switch', 'a bulb', 'a wire'], 'a cell',
    'Think about the job each circuit part does.',
    '<b>The cell</b> (what we usually call a battery) pushes the current round the circuit. Without it nothing else in the circuit works.');
  add('g5s-min5-component-1', 'electricity', 'components',
    'Which component can open or close a circuit?',
    ['a switch', 'a cell', 'a bulb', 'a resistor'], 'a switch',
    'Think about the job each circuit part does.',
    '<b>A switch</b> makes or breaks the gap in the loop. Closed, the current flows; open, it stops — which is how one turns a lamp on and off.');

  // recycling
  add('g5s-min5-recycle-0', 'conservation', 'recycling',
    'Why do we recycle materials?',
    ['to reduce waste', 'to use more energy', 'to make products heavier', 'to save electricity only'], 'to reduce waste',
    'Choose actions that reduce rubbish.',
    'Recycling turns used material into something new, so less is thrown away and fewer raw materials have to be taken from the earth.');
  add('g5s-min5-recycle-1', 'conservation', 'recycling',
    'Which item can often be recycled?',
    ['a clean plastic bottle', 'a used tissue', 'a dirty nappy', 'a broken mirror'], 'a clean plastic bottle',
    'Choose actions that reduce rubbish.',
    '<b>A clean plastic bottle</b> can be melted down and reshaped. It must be clean, because food left inside can spoil a whole batch.');

  // why protect
  add('g5s-min5-protect-0', 'conservation', 'why_protect',
    'Why should we protect habitats?',
    ['plants and animals need them', 'they look beautiful', 'they produce electricity', 'they stop rainfall'], 'plants and animals need them',
    'Think about caring for living things and their homes.',
    'A habitat supplies food, water and shelter. Take it away and the living things in it have nowhere left to go.');
  add('g5s-min5-protect-1', 'conservation', 'why_protect',
    'Conservation helps future generations by…',
    ['keeping resources available', 'using resources faster', 'building more factories', 'clearing more land'], 'keeping resources available',
    'Think about caring for living things and their homes.',
    'Anything we use up now cannot be used later, so conserving <b>keeps resources available</b> for the people who come after us.');
  add('g5s-min5-protect-2', 'conservation', 'why_protect',
    'Why are endemic species special?',
    ['they live naturally in a limited place', 'they are the largest animals', 'they can survive anywhere', 'they eat every plant'], 'they live naturally in a limited place',
    'Think about caring for living things and their homes.',
    'An endemic species is found naturally nowhere else on Earth. If it disappears from that one place, it is gone everywhere.');
  add('g5s-min5-protect-3', 'conservation', 'why_protect',
    'What is one way to protect wildlife?',
    ['do not disturb its habitat', 'collect animals as pets', 'cut down trees nearby', 'drain the ponds and streams'], 'do not disturb its habitat',
    'Think about caring for living things and their homes.',
    'Leaving a habitat alone costs nothing and keeps the food, shelter and nesting places exactly as the animals need them.');

  // endemic habitats
  add('g5s-min5-habitat-0', 'g5sci-enr-endemic', 'habitats',
    'An endemic animal\'s habitat is the place where it…',
    ['lives and finds food', 'sleeps only', 'migrates from', 'lays eggs elsewhere'], 'lives and finds food',
    'Think about an animal\'s home and needs.',
    'A habitat is where an animal <b>lives and finds food</b>, together with the shelter and nesting places it needs.');
  add('g5s-min5-habitat-1', 'g5sci-enr-endemic', 'habitats',
    'Why does forest loss threaten endemic animals?',
    ['it removes their habitat', 'it makes more roads', 'it increases rainfall', 'it brings new plants'], 'it removes their habitat',
    'Think about an animal\'s home and needs.',
    'Clearing forest takes the food and the shelter away at the same time, and an endemic animal cannot simply move somewhere else — it lives nowhere else.');

  // adaptation
  add('g5s-min5-adapt-0', 'g5sci-enr-endemic', 'adaptation',
    'An adaptation helps a living thing…',
    ['survive in its habitat', 'grow very large', 'move to a new country', 'live without water'], 'survive in its habitat',
    'An adaptation is a useful body feature or behaviour.',
    'An adaptation is a feature or a habit that makes a plant or animal better suited to the place it lives.');
  add('g5s-min5-adapt-1', 'g5sci-enr-endemic', 'adaptation',
    'A bird\'s beak shape can be an adaptation for…',
    ['finding its own food', 'attracting a mate', 'building a stronger nest', 'flying faster'], 'finding its own food',
    'An adaptation is a useful body feature or behaviour.',
    'Beak shape matches diet: a long thin beak reaches inside flowers, while a short strong one cracks hard seeds.');
  add('g5s-min5-adapt-2', 'g5sci-enr-endemic', 'adaptation',
    'Why might an animal have camouflage?',
    ['to blend into its surroundings', 'to attract a partner', 'to store extra food', 'to grow more quickly'], 'to blend into its surroundings',
    'An adaptation is a useful body feature or behaviour.',
    'Blending in makes an animal hard to see, which helps it avoid being eaten — or helps a hunter get close without being noticed.');
  add('g5s-min5-adapt-3', 'g5sci-enr-endemic', 'adaptation',
    'Webbed feet help some animals…',
    ['move quickly in water', 'climb steep trees', 'dig deep burrows', 'store extra heat'], 'move quickly in water',
    'An adaptation is a useful body feature or behaviour.',
    'The web spreads out to push against more water with each kick, working like a paddle.');

  // renewable energy — one question with its own correct distractors
  rows('renew', 'g5sci-enr-energy', 'renewable', [
    ['Solar energy comes from…', 'the Sun',
     'Solar energy comes from <b>the Sun</b>, which keeps on shining, so it is renewable. Coal is not: once it is burnt it is gone.'],
  ], ['the Sun', 'the wind', 'moving water', 'burning coal'],
     'Think about energy sources that are naturally replaced.');
})();
