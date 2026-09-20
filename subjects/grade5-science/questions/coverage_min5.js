'use strict';
// ⚠ Every question here used to carry the explanation `<b>${a}</b> is correct.`
//   — a restatement of the answer, which teaches a child nothing. The data
//   rows are now [question, answer, explanation] and each says WHY.
// ⚠ Order within each group is load-bearing: ids are `g5s-min5-${p}-${i}`,
//   the importer keys on them and never deletes, so rows must not be
//   reordered or removed.
(function () {
  const add = (id, c, s, q, o, a, h, e) => STATIC_QUESTIONS.push(makeMCQ({
    id, chapterId: c, subsection: s, difficulty: 2, question: q,
    options: o, answer: a, hint: h, explanation: e
  }));
  const rows = (p, c, s, d, o, h) => d.forEach(([q, a, e], i) =>
    add(`g5s-min5-${p}-${i}`, c, s, q, o, a, h, e));

  rows('photo', 'plants', 'photosynthesis', [
    ['Plants use sunlight, water and carbon dioxide to make…', 'food',
     'Those three are the ingredients. From them a plant builds its own <b>food</b> inside its leaves — no other living thing has to feed it.'],
    ['What gas do plants release during photosynthesis?', 'oxygen',
     'A plant takes in carbon dioxide and gives out <b>oxygen</b>. That is why green plants keep the air breathable for animals and people.'],
    ['Which plant part usually absorbs sunlight?', 'leaves',
     '<b>Leaves</b> are broad and flat so they catch as much light as possible, and they hold the green colouring that traps it.'],
    ['Why is photosynthesis important?', 'to make food',
     'It is how a plant feeds itself. Every food chain starts with plants making that food, so animals depend on it too.'],
  ], ['food', 'oxygen', 'leaves', 'to make food'],
     'Sunlight, water and carbon dioxide are the ingredients. What does the plant produce from them?');

  rows('diagram', 'water-matter', 'diagrams', [
    ['In a water-cycle diagram, arrows show…', 'how water moves',
     'The arrows trace the journey: up as vapour, across as cloud, then back down as rain. They show <b>how water moves</b>, not where it stays.'],
    ['What happens when water vapour cools?', 'it condenses',
     'Cooling slows the vapour down until it turns back into tiny drops of liquid. That change is called condensation.'],
    ['Clouds form through…', 'condensation',
     'Water vapour rises, meets colder air high up and <b>condenses</b> into the tiny droplets we see as cloud.'],
  ], ['how water moves', 'it condenses', 'condensation'], 'Follow the water\'s journey.');

  rows('cycle', 'water-matter', 'water_cycle', [
    ['What heats water so that it evaporates?', 'the Sun',
     '<b>The Sun</b> supplies the heat that drives the whole water cycle, lifting water from the sea, from rivers and even from puddles.'],
    ['Water vapour is water in the…', 'gas state',
     'Vapour is water in its <b>gas state</b> — the same substance as ice and liquid water, but with the particles spread far apart, so we cannot see it.'],
    ['What is rain falling from clouds called?', 'precipitation',
     '<b>Precipitation</b> is the word for any water falling from cloud, whether it arrives as rain, hail or snow.'],
    ['Water collects in rivers and seas after…', 'precipitation',
     'Once water has fallen as <b>precipitation</b> it runs downhill and gathers, ready for the Sun to evaporate it again. That is what makes it a cycle.'],
  ], ['the Sun', 'gas state', 'precipitation'],
     'The water cycle has a stage where water rises, one where it forms clouds, and one where it comes back down. Which is this?');

  rows('property', 'water-matter', 'properties', [
    ['Ice is water in the…', 'solid state',
     'Frozen water holds its own shape instead of flowing, and that is what makes it a <b>solid</b>.'],
    ['Water in a glass is a…', 'liquid',
     'A <b>liquid</b> takes the shape of whatever holds it but keeps the same amount. Pour it into a different glass and it looks different but there is no more of it.'],
    ['Steam is water in the…', 'gas state',
     'In the <b>gas state</b> the particles spread out to fill whatever space they are in, so steam has neither its own shape nor its own size.'],
    ['Which change turns ice into water?', 'melting',
     'Adding heat loosens a solid into a liquid. That change is <b>melting</b>.'],
    ['Which change turns water into ice?', 'freezing',
     'Taking heat away sets a liquid into a solid. That change is <b>freezing</b> — the exact opposite of melting.'],
  ], ['solid state', 'liquid', 'gas state', 'melting', 'freezing'], 'Think about the three states of water.');

  rows('component', 'electricity', 'components', [
    ['Which component provides energy in a simple circuit?', 'a cell',
     '<b>The cell</b> (what we usually call a battery) pushes the current round the circuit. Without it nothing else in the circuit works.'],
    ['Which component can open or close a circuit?', 'a switch',
     '<b>A switch</b> makes or breaks the gap in the loop. Closed, the current flows; open, it stops — which is how one turns a lamp on and off.'],
  ], ['a cell', 'a switch'], 'Think about the job each circuit part does.');

  rows('recycle', 'conservation', 'recycling', [
    ['Why do we recycle materials?', 'to reduce waste',
     'Recycling turns used material into something new, so less is thrown away and fewer raw materials have to be taken from the earth.'],
    ['Which item can often be recycled?', 'a clean plastic bottle',
     '<b>A clean plastic bottle</b> can be melted down and reshaped. It must be clean, because food left inside can spoil a whole batch.'],
  ], ['to reduce waste', 'a clean plastic bottle'], 'Choose actions that reduce rubbish.');

  rows('protect', 'conservation', 'why_protect', [
    ['Why should we protect habitats?', 'plants and animals need them',
     'A habitat supplies food, water and shelter. Take it away and the living things in it have nowhere left to go.'],
    ['Conservation helps future generations by…', 'keeping resources available',
     'Anything we use up now cannot be used later, so conserving <b>keeps resources available</b> for the people who come after us.'],
    ['Why are endemic species special?', 'they live naturally in a limited place',
     'An endemic species is found naturally nowhere else on Earth. If it disappears from that one place, it is gone everywhere.'],
    ['What is one way to protect wildlife?', 'do not disturb its habitat',
     'Leaving a habitat alone costs nothing and keeps the food, shelter and nesting places exactly as the animals need them.'],
  ], ['plants and animals need them', 'keeping resources available', 'they live naturally in a limited place', 'do not disturb its habitat'],
     'Think about caring for living things and their homes.');

  rows('habitat', 'g5sci-enr-endemic', 'habitats', [
    ['An endemic animal\'s habitat is the place where it…', 'lives and finds food',
     'A habitat is where an animal <b>lives and finds food</b>, together with the shelter and nesting places it needs.'],
    ['Why does forest loss threaten endemic animals?', 'it removes their habitat',
     'Clearing forest takes the food and the shelter away at the same time, and an endemic animal cannot simply move somewhere else — it lives nowhere else.'],
  ], ['lives and finds food', 'it removes their habitat'], 'Think about an animal\'s home and needs.');

  rows('adapt', 'g5sci-enr-endemic', 'adaptation', [
    ['An adaptation helps a living thing…', 'survive in its habitat',
     'An adaptation is a feature or a habit that makes a plant or animal better suited to the place it lives.'],
    ['A bird\'s beak shape can be an adaptation for…', 'finding its own food',
     'Beak shape matches diet: a long thin beak reaches inside flowers, while a short strong one cracks hard seeds.'],
    ['Why might an animal have camouflage?', 'to blend into its surroundings',
     'Blending in makes an animal hard to see, which helps it avoid being eaten — or helps a hunter get close without being noticed.'],
    ['Webbed feet help some animals…', 'move quickly in water',
     'The web spreads out to push against more water with each kick, working like a paddle.'],
  ], ['survive in its habitat', 'finding its own food', 'to blend into its surroundings', 'move quickly in water'],
     'An adaptation is a useful body feature or behaviour.');

  rows('renew', 'g5sci-enr-energy', 'renewable', [
    ['Solar energy comes from…', 'the Sun',
     'Solar energy comes from <b>the Sun</b>, which keeps on shining, so it is renewable. Coal is not: once it is burnt it is gone.'],
  ], ['the Sun', 'the wind', 'moving water', 'burning coal'],
     'Think about energy sources that are naturally replaced.');
})();
