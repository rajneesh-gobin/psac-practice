'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the science behind the Materials Tester (PSAC Grade 4).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. Every object's behaviour at
//    every test station, every "right material for the job" answer, every
//    hazard and every quiz question comes from this file. lab_materials.js only
//    draws it. If a result looks wrong on screen, fix it HERE.
//  ⚠ Grounded in grade4-science "Materials & Properties" (g4sci-materials:
//    natural_manmade, properties, waste) and the Grade 4 Energy questions:
//      - magnets attract iron and steel ONLY - copper, aluminium, plastic,
//        wood, glass are not attracted (g4s-mat-002, g4s-mat-007); steel cans
//        stick and aluminium cans do not (g4sci-hd-036);
//      - transparent: glass, clear plastic; translucent: frosted glass, tracing
//        paper; opaque: wood, stone, metal, cardboard (g4s-mat-001/004/011,
//        g4sc-mat-052/053);
//      - conductors: copper and most metals; insulators: rubber, plastic, wood,
//        glass (g4s-mat-014, g4sc-mat-050/054); PSAC 2025 Q6c (insulator) is
//        quoted in grade6-science ch05;
//      - waterproof: rubber, plastic, glass, steel sheets; absorbent: cotton,
//        sponge, paper (g4s-mat-006, g4sc-mat-056/058);
//      - flexible = bends easily without breaking; rigid = does not bend
//        (g4s-mat-008, g4sc-mat-059);
//      - natural: wood, stone, cotton, rubber, cork; man-made: plastic, glass,
//        metal, nylon (g4s-mat-003/012, g4sc-mat-051/057, g4sci-hd-037);
//      - metal conducts heat, wood does not (g4s-mat-009, g4sci-hd-034).
//  ⚠ Floating and pencil lead are NOT in the Grade 4 questions. They are here
//    because the brief asks for them and they are true; every claim is one a
//    child can check with a bowl of water or a battery tester at school.
//  ⚠ Objects were chosen so that every result is clear-cut. Things that really
//    vary were left out on purpose: coins (many "copper" coins are
//    copper-plated STEEL and do stick), stainless-steel spoons (some stick,
//    some do not), clear plastic rulers (most sink), rubber bands (some sink).
//    The one honest "can't say": a cork is too short and thick to bend-test.
//
//  Open for Grade 7 ("metals vs non-metals"): every object carries `grades`,
//  `material` points into MATERIALS (which knows `metal`), and a later level
//  can add objects, props and stations without touching these.
// ══════════════════════════════════════════════
const LabMaterialsData = (() => {
  const GRADES = [4];

  // ── Materials ─────────────────────────────────
  const MATERIALS = {
    iron:      { name: 'Iron',          metal: true },
    steel:     { name: 'Steel',         metal: true },
    aluminium: { name: 'Aluminium',     metal: true },
    copper:    { name: 'Copper',        metal: true },
    graphite:  { name: 'Pencil lead',   metal: false },
    plastic:   { name: 'Plastic',       metal: false },
    glass:     { name: 'Glass',         metal: false },
    frosted:   { name: 'Frosted glass', metal: false },
    wood:      { name: 'Wood',          metal: false },
    cork:      { name: 'Cork',          metal: false },
    stone:     { name: 'Stone',         metal: false },
    rubber:    { name: 'Rubber',        metal: false },
    cotton:    { name: 'Cotton',        metal: false },
    foam:      { name: 'Sponge',        metal: false },
    paper:     { name: 'Paper',         metal: false },
  };

  // ── The tray: every object and how it REALLY behaves ─────────
  //   magnetic  true | false                       (🧲 magnet)
  //   light     transparent | translucent | opaque (🔦 torch and screen)
  //   conductor true | false  (electricity)        (💡 battery tester)
  //   floats    floats | sinks | soaks             (💧 bowl of water)
  //   water     waterproof | absorbent             (🌧️ water drop)
  //   bend      flexible | rigid | null            (🤏 bend test)
  //   origin    natural | man-made                 (🌳 where it comes from)
  //   heat      conductor | insulator              (no station: used in jobs)
  const O = (id, name, material, p, from) => Object.assign({ id, name, material, grades: [4], from }, p);
  const OBJECTS = [
    O('nail',   'Iron nail',        'iron',      { magnetic: true,  light: 'opaque',      conductor: true,  floats: 'sinks',  water: 'waterproof', bend: 'rigid',    origin: 'man-made', heat: 'conductor' },
      'Iron comes from rock dug out of the ground. A factory melts it and makes nails.'),
    O('pin',    'Steel pin',        'steel',     { magnetic: true,  light: 'opaque',      conductor: true,  floats: 'sinks',  water: 'waterproof', bend: 'rigid',    origin: 'man-made', heat: 'conductor' },
      'Steel is made in a factory, mostly from iron.'),
    O('foil',   'Aluminium foil',   'aluminium', { magnetic: false, light: 'opaque',      conductor: true,  floats: 'floats', water: 'waterproof', bend: 'flexible', origin: 'man-made', heat: 'conductor' },
      'Aluminium is made in a factory from a rock called bauxite. Then it is rolled very thin.'),
    O('copper', 'Copper wire',      'copper',    { magnetic: false, light: 'opaque',      conductor: true,  floats: 'sinks',  water: 'waterproof', bend: 'flexible', origin: 'man-made', heat: 'conductor' },
      'Copper comes from rock. A factory melts it and pulls it into wire.'),
    O('lead',   'Pencil lead',      'graphite',  { magnetic: false, light: 'opaque',      conductor: true,  floats: 'sinks',  water: 'waterproof', bend: 'rigid',    origin: 'man-made', heat: 'conductor' },
      'Pencil lead is made in a factory from graphite mixed with clay. It is not really lead.'),
    O('bottle', 'Plastic bottle',   'plastic',   { magnetic: false, light: 'transparent', conductor: false, floats: 'floats', water: 'waterproof', bend: 'flexible', origin: 'man-made', heat: 'insulator' },
      'Plastic is made in a factory, mostly from oil.'),
    O('glass',  'Glass tile',       'glass',     { magnetic: false, light: 'transparent', conductor: false, floats: 'sinks',  water: 'waterproof', bend: 'rigid',    origin: 'man-made', heat: 'insulator' },
      'Glass is made from sand. A factory heats the sand until it melts into a new material.'),
    O('frosted','Frosted glass',    'frosted',   { magnetic: false, light: 'translucent', conductor: false, floats: 'sinks',  water: 'waterproof', bend: 'rigid',    origin: 'man-made', heat: 'insulator' },
      'Frosted glass is ordinary glass made rough on one side, in a factory.'),
    O('paper',  'Tracing paper',    'paper',     { magnetic: false, light: 'translucent', conductor: false, floats: 'soaks',  water: 'absorbent',  bend: 'flexible', origin: 'man-made', heat: 'insulator' },
      'Paper is made in a factory from wood that is mashed up with water.'),
    O('wood',   'Wooden block',     'wood',      { magnetic: false, light: 'opaque',      conductor: false, floats: 'floats', water: 'absorbent',  bend: 'rigid',    origin: 'natural',  heat: 'insulator' },
      'Wood comes from trees.'),
    O('cork',   'Cork',             'cork',      { magnetic: false, light: 'opaque',      conductor: false, floats: 'floats', water: 'waterproof', bend: null,       origin: 'natural',  heat: 'insulator' },
      'Cork is the bark of the cork oak tree.'),
    O('stone',  'Stone',            'stone',     { magnetic: false, light: 'opaque',      conductor: false, floats: 'sinks',  water: 'waterproof', bend: 'rigid',    origin: 'natural',  heat: 'insulator' },
      'Stone comes from the ground.'),
    O('ball',   'Rubber ball',      'rubber',    { magnetic: false, light: 'opaque',      conductor: false, floats: 'floats', water: 'waterproof', bend: 'flexible', origin: 'natural',  heat: 'insulator' },
      'Rubber comes from the sap of the rubber tree.'),
    O('towel',  'Cotton towel',     'cotton',    { magnetic: false, light: 'opaque',      conductor: false, floats: 'soaks',  water: 'absorbent',  bend: 'flexible', origin: 'natural',  heat: 'insulator' },
      'Cotton comes from the fluffy seed pods of the cotton plant.'),
    O('sponge', 'Kitchen sponge',   'foam',      { magnetic: false, light: 'opaque',      conductor: false, floats: 'floats', water: 'absorbent',  bend: 'flexible', origin: 'man-made', heat: 'insulator' },
      'A kitchen sponge is a foam made in a factory.'),
  ];
  const obj = id => OBJECTS.find(o => o.id === id) || null;
  const isMetal = id => { const o = obj(id); return !!(o && MATERIALS[o.material].metal); };
  const materialName = id => { const o = obj(id); return o ? MATERIALS[o.material].name : ''; };

  // ── What each property means, in Grade 4 words ──────────────
  // `is` completes "<Material> …." and `word` is the one science word.
  const PROPS = {
    magnetic: { name: 'Magnet', values: [
      { v: true,  word: 'attracted',     is: 'is attracted by a magnet',     explain: 'Attracted means the magnet pulls it.' },
      { v: false, word: 'not attracted', is: 'is not attracted by a magnet', explain: 'Not attracted means the magnet does not pull it.' }] },
    light: { name: 'Light', values: [
      { v: 'transparent', word: 'transparent', is: 'is transparent', explain: 'Transparent means light goes through. You can see through it clearly.' },
      { v: 'translucent', word: 'translucent', is: 'is translucent', explain: 'Translucent means some light goes through, but everything looks blurry.' },
      { v: 'opaque',      word: 'opaque',      is: 'is opaque',      explain: 'Opaque means no light goes through. It makes a dark shadow.' }] },
    conductor: { name: 'Electricity', values: [
      { v: true,  word: 'conductor', is: 'is a conductor of electricity', explain: 'A conductor lets electricity pass through it.' },
      { v: false, word: 'insulator', is: 'is an insulator',               explain: 'An insulator does not let electricity pass through it.' }] },
    floats: { name: 'Float or sink', values: [
      { v: 'floats', word: 'floats', is: 'floats', explain: 'It stays on top of the water.' },
      { v: 'sinks',  word: 'sinks',  is: 'sinks',  explain: 'It goes down to the bottom.' },
      { v: 'soaks',  word: 'soaks up water, then sinks', is: 'soaks up water and then sinks', explain: 'It floats at first. Then it soaks up water, gets heavy and sinks.' }] },
    water: { name: 'Water drop', values: [
      { v: 'waterproof', word: 'waterproof', is: 'is waterproof', explain: 'Waterproof means water cannot get through it.' },
      { v: 'absorbent',  word: 'absorbent',  is: 'is absorbent',  explain: 'Absorbent means it soaks up water.' }] },
    bend: { name: 'Bend', values: [
      { v: 'flexible', word: 'flexible', is: 'is flexible', explain: 'Flexible means it bends easily without breaking.' },
      { v: 'rigid',    word: 'rigid',    is: 'is rigid',    explain: 'Rigid means it is stiff. It does not bend.' }] },
    origin: { name: 'Where from?', values: [
      { v: 'natural',  word: 'natural',  is: 'is a natural material',  explain: 'Natural materials come from plants, animals or the ground.' },
      { v: 'man-made', word: 'man-made', is: 'is a man-made material', explain: 'Man-made materials are made by people, in a factory.' }] },
    heat: { name: 'Heat', values: [
      { v: 'conductor', word: 'good conductor of heat', is: 'is a good conductor of heat', explain: 'Heat passes through it quickly.' },
      { v: 'insulator', word: 'poor conductor of heat', is: 'is a poor conductor of heat', explain: 'Heat passes through it very slowly.' }] },
  };
  const valueOf = (prop, v) => (PROPS[prop] ? PROPS[prop].values.find(x => x.v === v) : null) || null;

  // ── The seven test stations ───────────────────
  const STATIONS = [
    { id: 'magnet',  icon: '🧲', name: 'Magnet',        prop: 'magnetic',  ask: 'Will the magnet pull it?',
      how: 'Hold the magnet close to the object.' },
    { id: 'torch',   icon: '🔦', name: 'Torch',         prop: 'light',     ask: 'Does light go through it?',
      how: 'Shine the torch at the object. Look at the screen behind it.' },
    { id: 'circuit', icon: '💡', name: 'Bulb tester',   prop: 'conductor', ask: 'Does the bulb light up?',
      how: 'Put the object across the gap between the two clips.' },
    { id: 'bowl',    icon: '💧', name: 'Bowl of water', prop: 'floats',    ask: 'Does it float or sink?',
      how: 'Put the object gently on the water.' },
    { id: 'drop',    icon: '🌧️', name: 'Water drop',    prop: 'water',     ask: 'Does it soak up the water?',
      how: 'Put one drop of water on the object.' },
    { id: 'bend',    icon: '🤏', name: 'Bend test',     prop: 'bend',      ask: 'Does it bend?',
      how: 'Hold both ends and try to bend it gently.' },
    { id: 'origin',  icon: '🌳', name: 'Where from?',   prop: 'origin',    ask: 'Natural or man-made?',
      how: 'Find out where the material comes from.' },
  ];
  const station = id => STATIONS.find(s => s.id === id) || null;
  // The result a fair test gives: exactly the object's property.
  function result(stationId, objId) {
    const s = station(stationId), o = obj(objId);
    if (!s || !o) return undefined;
    return o[s.prop];
  }
  // One sentence for the lab assistant after a test.
  function say(stationId, objId) {
    const o = obj(objId), v = result(stationId, objId);
    const n = o.name.toLowerCase();
    switch (stationId) {
      case 'magnet':  return v ? `The magnet pulled the ${n}! It is attracted.` : `The magnet did not pull the ${n}. It is not attracted.`;
      case 'torch':   return v === 'transparent' ? `Bright light on the screen. The ${n} is transparent.`
                           : v === 'translucent' ? `A dim, blurry glow. The ${n} is translucent.`
                           : `A dark shadow. No light got through. The ${n} is opaque.`;
      case 'circuit': return v ? `The bulb lit up! The ${n} is a conductor.` : `The bulb stayed dark. The ${n} is an insulator.`;
      case 'bowl':    return v === 'floats' ? `The ${n} floats.` : v === 'sinks' ? `The ${n} sinks to the bottom.` : `The ${n} floated, soaked up water, then sank.`;
      case 'drop':    return v === 'waterproof' ? `The drop stayed on top. The ${n} is waterproof.` : `The drop soaked in. The ${n} is absorbent.`;
      case 'bend':    return v === 'flexible' ? `It bends easily and does not break. The ${n} is flexible.`
                           : v === 'rigid' ? `It will not bend. The ${n} is rigid.`
                           : 'A cork is too short and thick to bend. It squashes a little, then springs back.';
      case 'origin':  return `${o.from} So ${MATERIALS[o.material].name.toLowerCase()} is ${v === 'natural' ? 'natural' : 'man-made'}.`;
    }
    return '';
  }

  // The battery tester: one 1.5 V cell, a small bulb and a gap between two
  // clips. Safe to touch. The wall socket is NEVER a test (see HAZARDS.mains).
  const TESTER = { volts: 1.5, cell: 'one 1.5 V cell (a battery)', mainsVolts: 230 };

  // ── Right material for the job ────────────────
  // The FIRST choice is the answer. `needs` are the properties the job needs;
  // scripts/test-labs-materials-data.js checks that the answer has every one
  // and every other choice fails at least one.
  const J = (id, icon, title, ask, needs, choices, why) => ({ id, icon, title, ask, needs, choices, why, grades: [4] });
  const JOBS = [
    J('window', '🪟', 'A window', 'Which material is best for a window?',
      [{ prop: 'light', is: 'transparent', must: 'must be transparent' }],
      ['glass', 'wood', 'stone', 'sponge'],
      'Glass is transparent. Light comes in, and you can see out.'),
    J('bathroom', '🚿', 'A bathroom window', 'This window must let light in, but nobody must see in. Which material?',
      [{ prop: 'light', is: 'translucent', must: 'must be translucent' }],
      ['frosted', 'glass', 'wood', 'nail'],
      'Frosted glass is translucent. Light comes in, but you cannot see clearly through it.'),
    J('umbrella', '☂️', 'An umbrella', 'Which material keeps the rain off?',
      [{ prop: 'water', is: 'waterproof', must: 'must be waterproof' }],
      ['bottle', 'towel', 'paper', 'sponge'],
      'Plastic is waterproof. Rain cannot get through it.'),
    J('cable', '🔌', 'The covering of a cable', 'Which material should cover an electric cable?',
      [{ prop: 'conductor', is: false, must: 'must be an insulator' }, { prop: 'bend', is: 'flexible', must: 'must be flexible' }],
      ['ball', 'copper', 'wood', 'glass'],
      'Rubber is an insulator, so it stops electric shocks. It is flexible, so the cable can bend.'),
    J('wire', '〰️', 'The inside of a wire', 'Which material should be inside an electric wire?',
      [{ prop: 'conductor', is: true, must: 'must be a conductor' }, { prop: 'bend', is: 'flexible', must: 'must be flexible' }],
      ['copper', 'lead', 'bottle', 'towel'],
      'Copper is a conductor, so electricity flows through it. It is flexible, so the wire can bend.'),
    J('pot', '🍲', 'A cooking pot', 'Which material is best for a cooking pot?',
      [{ prop: 'heat', is: 'conductor', must: 'must be a good conductor of heat' }],
      ['foil', 'bottle', 'wood', 'sponge'],
      'Aluminium is a metal. It is a good conductor of heat, so the heat reaches the food.'),
    J('spoon', '🥄', 'A spoon for hot soup', 'Which spoon will not get hot to hold?',
      [{ prop: 'heat', is: 'insulator', must: 'must be a poor conductor of heat' }],
      ['wood', 'nail', 'pin', 'copper'],
      'Wood is a poor conductor of heat. The handle stays cool.'),
    J('dry', '🛁', 'A bath towel', 'Which material dries you after a bath?',
      [{ prop: 'water', is: 'absorbent', must: 'must be absorbent' }],
      ['towel', 'bottle', 'glass', 'ball'],
      'Cotton is absorbent. It soaks up the water from your skin.'),
    J('net', '🎣', 'Floats for a fishing net', 'What keeps the top of a fishing net up?',
      [{ prop: 'floats', is: 'floats', must: 'must float' }],
      ['cork', 'stone', 'nail', 'glass'],
      'Cork floats, so it holds the top of the net up.'),
    J('roof', '🏠', 'A roof', 'A roof must keep rain out and keep its shape. Which material?',
      [{ prop: 'water', is: 'waterproof', must: 'must be waterproof' }, { prop: 'bend', is: 'rigid', must: 'must be rigid' }],
      ['pin', 'towel', 'sponge', 'paper'],
      'Steel sheets are waterproof and rigid. Rain runs off, and the roof keeps its shape.'),
    J('recycle', '♻️', 'Sorting cans', 'A big magnet sorts cans for recycling. Which cans does it pick up?',
      [{ prop: 'magnetic', is: true, must: 'must be attracted by a magnet' }],
      ['pin', 'foil', 'bottle', 'glass'],
      'Steel cans are attracted by the magnet. Aluminium cans are not. That is how they are sorted.'),
  ];
  // Why a choice is right, or which need it fails - in one short sentence.
  function judge(jobId, objId) {
    const job = JOBS.find(j => j.id === jobId), o = obj(objId);
    if (!job || !o) return null;
    const fail = job.needs.find(n => o[n.prop] !== n.is);
    const M = MATERIALS[o.material].name;
    if (!fail) return { ok: true, text: job.why };
    const got = valueOf(fail.prop, o[fail.prop]);
    return { ok: false, need: fail, text: `${M} ${got ? got.is : 'does not work'}. ${job.title} ${fail.must}.` };
  }

  // ── Discoveries ──────────────────────────────
  // A FOUND card shows `saw`, the `rule` and `learn`; a LOCKED card shows
  // `how` as steps and "Show me how" runs them as a guide.
  // `unlock` is what the bench checks after each FAIR test:
  //   { station, value?, obj?, metal? }  - a test with that result
  //   { sort: prop }                     - the sorting board for prop has two groups
  //   { job: true }                      - a job answered right
  // Tokens: station:<id> lights:off|on test:<obj> sort:<prop> job:<id>
  const Dsc = (id, icon, title, hint, how, unlock, saw, rule, learn) => ({ id, icon, title, hint, how, unlock, saw, rule, learn, grades: [4] });
  const DISCOVERIES = [
    Dsc('magnet_pull', '🧲', 'Magnets pull iron', 'Hold the magnet near the nail',
      ['station:magnet', 'test:nail'], { station: 'magnet', value: true },
      'The iron nail jumped up and stuck to the magnet.',
      'iron and steel → attracted by a magnet',
      'A magnet attracts (pulls) things made of iron or steel.'),
    Dsc('not_all_metals', '🥈', 'Not every metal sticks', 'Try the magnet on a shiny metal that is not iron',
      ['station:magnet', 'test:foil'], { station: 'magnet', metal: true, value: false },
      'The aluminium foil did not move. It is a metal, but the magnet did not pull it.',
      'aluminium and copper → NOT attracted',
      'Only iron and steel are attracted. Aluminium and copper are metals too, but a magnet does not pull them.'),
    Dsc('clear', '🪟', 'See-through', 'Shine the torch through the glass tile',
      ['station:torch', 'lights:off', 'test:glass'], { station: 'torch', value: 'transparent' },
      'Bright light went through the glass. The screen was bright.',
      'transparent: light goes through - you see clearly',
      'Glass is transparent. That is why windows and spectacles are made of glass.'),
    Dsc('blurry', '🌫️', 'Blurry light', 'Shine the torch through the frosted glass',
      ['station:torch', 'lights:off', 'test:frosted'], { station: 'torch', value: 'translucent' },
      'Only some light went through. The screen had a dim, blurry glow.',
      'translucent: some light goes through - it looks blurry',
      'Frosted glass and tracing paper are translucent. You cannot see clearly through them.'),
    Dsc('shadow', '🌑', 'A dark shadow', 'Shine the torch at the wooden block',
      ['station:torch', 'lights:off', 'test:wood'], { station: 'torch', value: 'opaque' },
      'No light went through the wood. There was a dark shadow on the screen.',
      'opaque: no light goes through - a shadow',
      'Wood, stone and metal are opaque. Light cannot get through, so they make shadows.'),
    Dsc('conduct', '💡', 'The bulb lights up', 'Put the copper wire across the gap',
      ['station:circuit', 'test:copper'], { station: 'circuit', metal: true, value: true },
      'The bulb lit up when the copper wire closed the gap.',
      'metals → conductors of electricity',
      'Metals are conductors: electricity passes through them. Wires are made of copper.'),
    Dsc('pencil', '✏️', 'The pencil surprise', 'Test the pencil lead with the bulb',
      ['station:circuit', 'test:lead'], { station: 'circuit', obj: 'lead', value: true },
      'The bulb lit up with the pencil lead - and pencil lead is not a metal!',
      'pencil lead (graphite) → a conductor',
      'Pencil lead is made of graphite. It is not a metal, but it still lets electricity through.'),
    Dsc('insulate', '🧤', 'The bulb stays dark', 'Test the plastic bottle with the bulb',
      ['station:circuit', 'test:bottle'], { station: 'circuit', value: false },
      'The bulb stayed dark. Electricity could not pass through the plastic.',
      'plastic, rubber, wood, glass → insulators',
      'Insulators stop electricity. Wires are covered in plastic or rubber so they are safe to touch.'),
    Dsc('float', '🛟', 'It floats!', 'Put the cork on the water',
      ['station:bowl', 'test:cork'], { station: 'bowl', value: 'floats' },
      'The cork stayed on top of the water.',
      'cork, wood, a rubber ball → float',
      'Cork floats. Fishermen use cork floats to hold the top of their nets up.'),
    Dsc('sink', '⚓', 'It sinks!', 'Put the stone on the water',
      ['station:bowl', 'test:stone'], { station: 'bowl', value: 'sinks' },
      'The stone went straight down to the bottom of the bowl.',
      'stone, glass, an iron nail → sink',
      'A stone is heavy for its size, so it sinks.'),
    Dsc('soak', '🧺', 'Floats, then sinks', 'Put the cotton towel on the water',
      ['station:bowl', 'test:towel'], { station: 'bowl', value: 'soaks' },
      'The towel floated at first. Then it soaked up water and slowly sank.',
      'absorbent things fill with water',
      'Cotton is absorbent. As it soaks up water it gets heavier and sinks.'),
    Dsc('waterproof', '☂️', 'Water stays on top', 'Put a drop of water on the rubber ball',
      ['station:drop', 'test:ball'], { station: 'drop', value: 'waterproof' },
      'The drop stayed on top of the rubber and did not soak in.',
      'rubber, plastic, glass → waterproof',
      'Rubber is waterproof. That is why boots and raincoats can be made of rubber.'),
    Dsc('absorbent', '🧽', 'It drinks it up', 'Put a drop of water on the sponge',
      ['station:drop', 'test:sponge'], { station: 'drop', value: 'absorbent' },
      'The drop disappeared into the sponge.',
      'sponge, cotton, paper → absorbent',
      'A sponge is absorbent. It soaks up water, so we use it for cleaning.'),
    Dsc('flexible', '🤸', 'A metal that bends', 'Try to bend the copper wire',
      ['station:bend', 'test:copper'], { station: 'bend', value: 'flexible' },
      'The copper wire bent easily and did not break.',
      'flexible: bends easily without breaking',
      'Copper wire is flexible. Electric wires can bend round corners.'),
    Dsc('rigid', '🧱', 'It will not bend', 'Try to bend the wooden block',
      ['station:bend', 'test:wood'], { station: 'bend', value: 'rigid' },
      'The wooden block did not bend at all.',
      'rigid: stiff - it does not bend',
      'Wood, stone and glass are rigid. Rigid materials keep their shape.'),
    Dsc('natural', '🌳', 'From nature', 'Find out where cork comes from',
      ['station:origin', 'test:cork'], { station: 'origin', value: 'natural' },
      'Cork is the bark of a tree.',
      'natural: from plants, animals or the ground',
      'Wood, cotton, rubber, cork and stone are natural materials.'),
    Dsc('manmade', '🏭', 'Made by people', 'Find out where glass comes from',
      ['station:origin', 'test:glass'], { station: 'origin', value: 'man-made' },
      'Glass is made in a factory by heating sand until it melts.',
      'man-made: made by people, in a factory',
      'Sand is natural, but people change it into glass. So glass is man-made. Plastic is man-made too.'),
    Dsc('sorted', '📋', 'Sort it out', 'Test two things, then open the sorting board',
      ['station:magnet', 'test:nail', 'test:stone', 'sort:magnetic'], { sort: 'magnetic' },
      'Your sorting board put the nail with "attracted" and the stone with "not attracted".',
      'test first, then sort into groups',
      'Scientists sort things into groups using what their tests showed - not what they guessed.'),
    Dsc('right_job', '🧰', 'The right material', 'Choose a material for a window',
      ['job:window'], { job: true },
      'You chose glass for the window, because it is transparent.',
      'choose a material by its properties',
      'We choose a material for a job by what it can do: transparent for windows, waterproof for umbrellas.'),
  ];

  // ── Hazards: the mistakes that stop the experiment ───
  const HAZARDS = {
    mains: {
      signs: ['electric'], fx: 'zap',
      title: () => 'Stop! Never use a wall socket',
      happened: c => `You tried to test the ${c.name ? c.name.toLowerCase() : 'object'} with the wall socket instead of the battery.`,
      why: 'Mains electricity from a wall socket is very strong. It can give a shock that kills. It can also start a fire.',
      instead: 'Only use a small battery tester, like this one. Never push anything into a wall socket or a plug. If something needs plugging in, ask an adult.',
      exam: 'Exam tip: wires are covered in plastic or rubber because they are insulators - they stop electric shocks (PSAC 2025 Q6c asks what an insulator is).',
    },
    glass: {
      signs: ['irritant'], fx: 'crack',
      title: () => 'Careful! Glass breaks',
      happened: c => `You tried to bend the ${c.name ? c.name.toLowerCase() : 'glass'}. Glass is rigid. It cannot bend, so it cracked into sharp pieces.`,
      why: 'Broken glass has very sharp edges. Even tiny pieces can cut your skin badly.',
      instead: 'Never try to bend glass. If glass breaks, keep away from it and tell an adult. Do not pick it up with your fingers.',
      exam: 'Exam tip: glass is transparent, rigid and brittle - it breaks easily.',
    },
  };

  // ── Wrong but safe: mistakes that give a wrong or unfair answer ───
  const RESULTS = {
    all_metals: {
      icon: '🧲',
      title: () => 'All metals stick to a magnet? No!',
      happened: c => `You held the magnet to the ${c.name.toLowerCase()}. Nothing happened. ${c.material} is a metal, but the magnet did not pull it.`,
      instead: 'Only iron and steel are attracted by a magnet. Test each metal. Do not guess just because it is shiny.',
      exam: 'Exam tip: "Which would NOT be attracted to a magnet?" - copper and aluminium are metals that are not attracted.',
    },
    lights_on: {
      icon: '💡',
      title: () => 'The room lights were on',
      happened: c => `You shone the torch at the ${c.name.toLowerCase()} with the room lights on. The whole screen was bright, so you could not tell how much torch light got through.`,
      instead: 'Switch the room lights off first. Then test every object the same way: same torch, same screen, same dark room. That is a fair test.',
      exam: 'Exam tip: in a fair test you change only one thing - here, the object. Everything else stays the same.',
    },
    guess: {
      icon: '🤔',
      title: () => 'You guessed without testing',
      happened: c => `You put the ${c.name.toLowerCase()} in a group, but you never tested it. A guess can be wrong - lots of people think every metal sticks to a magnet!`,
      instead: 'Test it first, then sort it. Tap “Test it” and the result goes on the board by itself.',
      exam: 'Exam tip: scientists answer a question by testing, not by guessing.',
    },
  };

  // Short, true facts for the 💡 button.
  const FACTS = [
    'Magnets attract iron and steel. They do not pull copper, aluminium, plastic, wood or glass.',
    'Recycling centres use big magnets to pull steel cans out of the rubbish. Aluminium cans are left behind.',
    'Glass is made from sand. Sand is heated until it melts and becomes glass.',
    'Electric wires have copper inside and plastic or rubber outside. The copper carries electricity. The plastic keeps you safe.',
    'Pencil lead is not really lead. It is graphite mixed with clay.',
    'Cork comes from the bark of the cork oak tree. The tree grows new bark again.',
    'Rubber comes from a white sap that drips out of the rubber tree.',
    'Frosted glass is used in bathroom windows. Light gets in, but nobody can see in.',
    'Plastic can take hundreds of years to break down. That is why we recycle it.',
    'A metal spoon in hot soup gets hot. A wooden spoon stays cool. Metal is a good conductor of heat.',
    'Cotton comes from the fluffy seed pods of the cotton plant.',
    'Never play near a wall socket. Mains electricity can kill.',
  ];

  // ── Missions ──
  // `reqs`: tests the pupil must do at `station` during the mission, as
  //   { ids: [...] } - these objects, { filter: 'metal'|'nonmetal'|'any' },
  //   or { jobs: n } - n different jobs answered right.
  // A question's FIRST option is the answer; the quiz shuffles them.
  const MISSIONS = [
    {
      id: 'magnet_hunt', icon: '🧲', title: 'Magnet hunt', station: 'magnet', grades: [4],
      blurb: 'Test every metal with the magnet. Which ones stick?',
      intro: 'Magnet hunt! Test all 4 metals with the magnet - and 2 things that are not metal.',
      reqs: [{ label: 'Test all 4 metals', ids: ['nail', 'pin', 'foil', 'copper'], count: 4 },
             { label: 'Test 2 things that are not metal', filter: 'nonmetal', count: 2 }],
      quiz: [
        { q: 'Which object is attracted by a magnet?',
          options: ['An iron nail', 'A copper wire', 'A plastic bottle', 'A wooden block'],
          why: 'Magnets attract iron and steel. Copper, plastic and wood are not attracted.' },
        { q: 'You hold a magnet near aluminium foil. What happens?',
          options: ['Nothing - it is not attracted', 'It jumps up to the magnet', 'It sticks only if it is shiny', 'It turns into iron'],
          why: 'Aluminium is a metal, but it is not attracted by a magnet.' },
        { q: 'Which sentence is TRUE?',
          options: ['Only some metals are attracted by a magnet', 'All metals are attracted by a magnet', 'Plastic is attracted by a magnet', 'Wood is attracted by a magnet'],
          why: 'Only iron and steel are attracted. Copper and aluminium are metals that are not.' },
        { q: 'A big magnet sorts cans for recycling. Which cans does it pick up?',
          options: ['Steel cans', 'Aluminium cans', 'Plastic bottles', 'Glass jars'],
          why: 'Steel is attracted by a magnet. Aluminium, plastic and glass are not.' },
        { q: 'Which pair are BOTH attracted by a magnet?',
          options: ['Iron nail and steel pin', 'Iron nail and copper wire', 'Steel pin and aluminium foil', 'Copper wire and aluminium foil'],
          why: 'Iron and steel are both attracted. Copper and aluminium are not.' },
      ],
    },
    {
      id: 'bulb', icon: '💡', title: 'Bulb on, bulb off', station: 'circuit', grades: [4],
      blurb: 'Test 6 things with the bulb tester. Which are conductors?',
      intro: 'Bulb on, bulb off! Test 6 different things with the bulb tester. One must be the pencil lead.',
      reqs: [{ label: 'Test the pencil lead', ids: ['lead'], count: 1 },
             { label: 'Test 6 different things', filter: 'any', count: 6 }],
      quiz: [
        { q: 'A material that lets electricity pass through it is called a…',
          options: ['Conductor', 'Insulator', 'Transparent material', 'Waterproof material'],
          why: 'A conductor lets electricity through. An insulator stops it.' },
        { q: 'Which object makes the bulb light up?',
          options: ['Copper wire', 'Plastic bottle', 'Rubber ball', 'Wooden block'],
          why: 'Copper is a metal, and metals are conductors.' },
        { q: 'Why are electric wires covered in plastic or rubber?',
          options: ['It is an insulator, so it stops electric shocks', 'It is a conductor, so it carries electricity', 'It is transparent, so you can see the wire', 'It is absorbent, so it soaks up water'],
          why: 'Plastic and rubber are insulators. They keep the electricity inside the wire.' },
        { q: 'The pencil lead made the bulb light up. What does this show?',
          options: ['Pencil lead is a conductor', 'Pencil lead is a metal', 'Pencil lead is attracted by a magnet', 'Pencil lead is an insulator'],
          why: 'Pencil lead (graphite) is a conductor, even though it is not a metal.' },
        { q: 'Which is the only SAFE way to test if something conducts electricity?',
          options: ['With a small battery and bulb', 'By pushing it into a wall socket', 'By touching it to a plug', 'By holding it on a power cable'],
          why: 'A small battery is safe. Mains electricity from a socket can kill.' },
      ],
    },
    {
      id: 'right_job', icon: '🧰', title: 'Pick the right material', station: null, grades: [4],
      blurb: 'Choose the best material for 5 jobs, then answer the questions.',
      intro: 'Pick the right material! Open “Right material for the job” below and get 5 jobs right.',
      reqs: [{ label: 'Get 5 jobs right', jobs: 5 }],
      quiz: [
        { q: 'Which material is best for a window?',
          options: ['Glass - it is transparent', 'Wood - it is strong', 'Stone - it is hard', 'Cotton - it is soft'],
          why: 'Glass is transparent. Light comes in and you can see out.' },
        { q: 'Which material is best for a raincoat?',
          options: ['Plastic - it is waterproof', 'Cotton - it is absorbent', 'Paper - it is light', 'Sponge - it is soft'],
          why: 'A raincoat must be waterproof, so rain cannot get through.' },
        { q: 'Which material is best for a cooking pot?',
          options: ['Metal - it conducts heat', 'Plastic - it is light', 'Wood - it is natural', 'Glass - it is transparent'],
          why: 'Metal is a good conductor of heat, so the heat reaches the food.' },
        { q: 'Which material is best for a towel?',
          options: ['Cotton - it is absorbent', 'Plastic - it is waterproof', 'Glass - it is rigid', 'Rubber - it is flexible'],
          why: 'Cotton is absorbent. It soaks up water.' },
        { q: 'Which material is best to hold a fishing net up in the sea?',
          options: ['Cork - it floats', 'Stone - it sinks', 'Iron - it is attracted by a magnet', 'Glass - it is transparent'],
          why: 'Cork floats, so it keeps the top of the net up.' },
      ],
    },
  ];

  // ── Guided experiments: "I landed here - what do I do?" ──
  // One action per step, in the discovery tokens above. Every step has a button.
  const G = (id, icon, title, blurb, lesson, steps) => ({ id, icon, title, blurb, lesson, steps, grades: [4] });
  const GUIDES = [
    G('magnet', '🧲', 'Magnet test', 'Which things does a magnet pull?',
      'The magnet pulled the iron nail and the steel pin. It did not pull the foil or the wood. Only iron and steel are attracted by a magnet.',
      [{ on: 'station:magnet', say: 'Choose the magnet.',                 btn: '🧲 Choose the magnet' },
       { on: 'test:nail',      say: 'Test the iron nail.',                btn: '🔩 Test the iron nail' },
       { on: 'test:pin',       say: 'Now test the steel pin.',            btn: '📍 Test the steel pin' },
       { on: 'test:foil',      say: 'Foil is a metal too. Will it stick?', btn: '🥈 Test the foil' },
       { on: 'test:wood',      say: 'Last one: the wooden block.',        btn: '🪵 Test the wooden block' }]),
    G('torch', '🔦', 'Torch test', 'Does light go through it?',
      'Glass is transparent: light goes through. Frosted glass is translucent: some light, but blurry. Wood is opaque: no light, just a shadow.',
      [{ on: 'station:torch', say: 'Choose the torch and screen.',        btn: '🔦 Choose the torch' },
       { on: 'lights:off',    say: 'Switch the room lights off first.',   btn: '🌙 Lights off' },
       { on: 'test:glass',    say: 'Shine the torch through the glass tile.', btn: '🪟 Test the glass tile' },
       { on: 'test:frosted',  say: 'Now try the frosted glass.',          btn: '🌫️ Test the frosted glass' },
       { on: 'test:wood',     say: 'Now try the wooden block.',           btn: '🪵 Test the wooden block' }]),
    G('bulb', '💡', 'Bulb test', 'Which things let electricity through?',
      'The copper wire and the pencil lead lit the bulb: they are conductors. The plastic bottle did not: it is an insulator.',
      [{ on: 'station:circuit', say: 'Choose the bulb tester. It uses one small battery.', btn: '💡 Choose the bulb tester' },
       { on: 'test:copper',     say: 'Put the copper wire across the gap.', btn: '〰️ Test the copper wire' },
       { on: 'test:bottle',     say: 'Now try the plastic bottle.',         btn: '🧴 Test the plastic bottle' },
       { on: 'test:lead',       say: 'Pencil lead is not a metal. Will the bulb light?', btn: '✏️ Test the pencil lead' }]),
    G('water', '💧', 'Water tests', 'Does it float? Does it soak up water?',
      'Cork floats and stone sinks. A sponge is absorbent: it soaks up water. Rubber is waterproof: the water stays on top.',
      [{ on: 'station:bowl', say: 'Choose the bowl of water.',           btn: '💧 Choose the bowl' },
       { on: 'test:cork',    say: 'Put the cork on the water.',          btn: '🍾 Test the cork' },
       { on: 'test:stone',   say: 'Now put the stone on the water.',     btn: '🪨 Test the stone' },
       { on: 'station:drop', say: 'Now choose the water drop.',          btn: '🌧️ Choose the water drop' },
       { on: 'test:sponge',  say: 'Put a drop of water on the sponge.',  btn: '🧽 Test the sponge' },
       { on: 'test:ball',    say: 'Now put a drop on the rubber ball.',  btn: '⚽ Test the rubber ball' }]),
    G('bend', '🤏', 'Bend test', 'Which things bend?',
      'The cotton towel and the copper wire bend easily: they are flexible. The stone does not bend at all: it is rigid.',
      [{ on: 'station:bend', say: 'Choose the bend test.',               btn: '🤏 Choose the bend test' },
       { on: 'test:towel',   say: 'Try to bend the cotton towel.',       btn: '🧺 Test the towel' },
       { on: 'test:copper',  say: 'Now try the copper wire.',            btn: '〰️ Test the copper wire' },
       { on: 'test:stone',   say: 'Now try the stone.',                  btn: '🪨 Test the stone' }]),
    G('origin', '🌳', 'Nature or factory?', 'Natural or man-made?',
      'Wood and cotton come from plants: they are natural. Plastic and glass are made in factories: they are man-made.',
      [{ on: 'station:origin', say: 'Choose “Where from?”.',               btn: '🌳 Choose “Where from?”' },
       { on: 'test:wood',      say: 'Where does wood come from?',         btn: '🪵 Test the wooden block' },
       { on: 'test:towel',     say: 'Where does cotton come from?',       btn: '🧺 Test the towel' },
       { on: 'test:bottle',    say: 'Where does plastic come from?',      btn: '🧴 Test the plastic bottle' }]),
  ];

  return { GRADES, MATERIALS, OBJECTS, PROPS, STATIONS, TESTER, JOBS, DISCOVERIES, HAZARDS, RESULTS, FACTS, MISSIONS, GUIDES,
           obj, isMetal, materialName, valueOf, station, result, say, judge };
})();
if (typeof window !== 'undefined') window.LabMaterialsData = LabMaterialsData;
