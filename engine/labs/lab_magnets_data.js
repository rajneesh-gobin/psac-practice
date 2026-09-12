'use strict';
// ══════════════════════════════════════════════
//  Science Labs — Magnets (Science, Grades 4 & 8)
//
//  All science content lives here. lab_magnets.js only draws it.
//  ⚠ Grounded in:
//    Grade 4 — subjects/grade4-science (ch06_g4_materials.js): magnets attract
//    only iron and steel; copper, aluminium and glass are NOT magnetic.
//    Grade 8 — subjects/grade8-science (batch2_magnetism.js): poles, field
//    lines (N→S outside), plotting compass, soft iron for electromagnets,
//    credit-card hazard, induced magnetism.
//  ⚠ Colours are always named in words (colour-blind pupils).
// ══════════════════════════════════════════════
const LabMagnetsData = (() => {
  'use strict';

  const GRADES = [4, 8];
  const D4  = [4];
  const D8  = [8];
  const D48 = [4, 8];
  const forGrade = (list, g) => list.filter(x => (x.grades || D48).includes(g));

  // ── Grade 4: objects on the shelf ──────────────
  // magnetic:true → attracted to the horseshoe magnet
  const OBJECTS = [
    { id: 'nail',   label: 'Iron nail',       icon: '📌', magnetic: true,  grades: D4 },
    { id: 'clip',   label: 'Steel paper clip', icon: '📎', magnetic: true,  grades: D4 },
    { id: 'foil',   label: 'Aluminium foil',   icon: '⬜', magnetic: false, grades: D4 },
    { id: 'block',  label: 'Wooden block',     icon: '🟫', magnetic: false, grades: D4 },
    { id: 'ruler',  label: 'Plastic ruler',    icon: '📏', magnetic: false, grades: D4 },
    { id: 'marble', label: 'Glass marble',     icon: '🔵', magnetic: false, grades: D4 },
    { id: 'rubber', label: 'Rubber band',      icon: '⭕', magnetic: false, grades: D4 },
    { id: 'coin',   label: 'Copper coin',      icon: '🪙', magnetic: false, grades: D4 },
  ];

  // ── Hazards ────────────────────────────────────
  const HAZARDS = [
    {
      id: 'compass_g4', grades: D4,
      signs: ['warning'],
      title: () => 'Magnet near a compass',
      happened: () => 'You brought the magnet near the compass. It pointed the wrong way!',
      why: 'A magnet\'s field is stronger than the Earth\'s field. The compass needle follows the magnet, not north.',
      instead: 'Keep magnets away from compasses, phones and computers.',
      exam: 'A compass needle is a small magnet. A nearby magnet overrides the Earth\'s field.',
      fx: 'compass_spin',
    },
    {
      id: 'tv_g4', grades: D4,
      signs: ['warning'],
      title: () => 'Magnet near a screen',
      happened: () => 'You put the magnet next to the screen. The colours went wrong!',
      why: 'Strong magnets can disrupt the tiny magnets inside a TV or phone screen.',
      instead: 'Never put a magnet near a TV, phone or computer screen.',
      exam: 'Strong magnets can damage electronic devices by disrupting their internal magnetic parts.',
      fx: 'screen_distort',
    },
    {
      id: 'credit_card', grades: D8,
      signs: ['warning'],
      title: () => 'Magnet near a credit card',
      happened: () => 'The magnet erased the data on the card\'s magnetic strip!',
      why: 'The magnetic strip stores data as tiny magnetic regions. A strong magnet scrambles them and erases the data.',
      instead: 'Keep magnets away from credit cards, bank cards and room key cards.',
      exam: 'The magnetic strip on a card stores binary data. A strong external magnet randomises the magnetic domains and erases the data.',
      fx: 'card_erase',
    },
    {
      id: 'compass_g8', grades: D8,
      signs: ['warning'],
      title: () => 'Magnet near a compass',
      happened: () => 'The strong magnet deflected the compass needle from north!',
      why: 'The compass needle is a pivoted magnet. A nearby external magnet exerts a stronger force than the Earth\'s field.',
      instead: 'In navigation, keep magnets well away from compasses.',
      exam: 'A plotting compass contains a pivoted magnet. Strong nearby fields override Earth\'s weaker field.',
      fx: 'compass_spin',
    },
  ];

  // ── Results (mistake cards) ────────────────────
  const RESULTS = [
    {
      id: 'all_metals', grades: D4,
      icon: '⚠️',
      title: () => 'Not all metals are magnetic!',
      happened: () => 'You thought the copper coin would stick — but it did not.',
      instead: 'Only iron and steel are attracted to magnets. Copper, aluminium and gold are NOT magnetic.',
      exam: 'A copper coin disproves that every metal is magnetic. Only iron, steel (and a few others) are magnetic.',
    },
  ];

  // ── Discoveries ────────────────────────────────
  // unlock: array of event tokens — ALL must fire before the discovery unlocks.
  const DISCOVERIES = [
    // Grade 4
    { id: 'iron_magnetic',  grades: D4, icon: '📌',
      title: 'Iron is magnetic',
      hint: 'Try the iron nail near the magnet.',
      unlock: ['drag:nail'],
      saw: 'The iron nail jumped toward the magnet and stuck to it.',
      learn: 'Iron is attracted to magnets. Objects made of iron or steel are called magnetic materials.' },
    { id: 'steel_magnetic', grades: D4, icon: '📎',
      title: 'Steel is magnetic',
      hint: 'Try the steel paper clip near the magnet.',
      unlock: ['drag:clip'],
      saw: 'The steel paper clip was pulled toward the magnet.',
      learn: 'Steel is an alloy of iron, so it is also magnetic. Both iron and steel are attracted to magnets.' },
    { id: 'copper_not',     grades: D4, icon: '🪙',
      title: 'Copper is NOT magnetic',
      hint: 'Try the copper coin near the magnet.',
      unlock: ['drag:coin'],
      saw: 'The copper coin did not move toward the magnet at all.',
      learn: 'Copper is a metal, but it is NOT magnetic. Not all metals are attracted to magnets.' },
    { id: 'aluminium_not',  grades: D4, icon: '⬜',
      title: 'Aluminium is NOT magnetic',
      hint: 'Try the aluminium foil near the magnet.',
      unlock: ['drag:foil'],
      saw: 'The aluminium foil was not attracted. It fell straight down.',
      learn: 'Aluminium is a metal, but it is not magnetic. Only iron and steel are attracted to magnets.' },
    { id: 'wood_not',       grades: D4, icon: '🟫',
      title: 'Wood is NOT magnetic',
      hint: 'Try the wooden block near the magnet.',
      unlock: ['drag:block'],
      saw: 'The wooden block fell straight down. The magnet had no effect on it.',
      learn: 'Wood is not a metal and not magnetic. Magnets only attract iron and steel.' },
    { id: 'plastic_not',    grades: D4, icon: '📏',
      title: 'Plastic is NOT magnetic',
      hint: 'Try the plastic ruler near the magnet.',
      unlock: ['drag:ruler'],
      saw: 'The plastic ruler was not attracted. It fell straight down.',
      learn: 'Plastic is not magnetic. Only iron and steel materials respond to a magnet.' },
    { id: 'glass_not',      grades: D4, icon: '🔵',
      title: 'Glass is NOT magnetic',
      hint: 'Try the glass marble near the magnet.',
      unlock: ['drag:marble'],
      saw: 'The glass marble was not attracted to the magnet at all.',
      learn: 'Glass is not magnetic. Materials not attracted to magnets are called non-magnetic materials.' },
    { id: 'rubber_not',     grades: D4, icon: '⭕',
      title: 'Rubber is NOT magnetic',
      hint: 'Try the rubber band near the magnet.',
      unlock: ['drag:rubber'],
      saw: 'The rubber band was not attracted. It dropped straight down.',
      learn: 'Rubber is not magnetic. Magnets only attract iron and steel.' },
    { id: 'only_iron_steel', grades: D4, icon: '🧲',
      title: 'Only iron and steel are magnetic',
      hint: 'Test all the objects and compare.',
      unlock: ['drag:nail', 'drag:clip', 'drag:coin'],
      saw: 'Only the iron nail and the steel paper clip were attracted. Everything else fell.',
      learn: 'Magnets attract only iron and steel. Copper, aluminium, wood, glass, plastic and rubber are non-magnetic.' },
    { id: 'sort_board',     grades: D4, icon: '📋',
      title: 'Sorting magnetic and non-magnetic',
      hint: 'Sort all the objects onto the board.',
      unlock: ['sort:nail', 'sort:clip', 'sort:coin'],
      saw: 'You sorted the objects into two groups: magnetic and non-magnetic.',
      learn: 'Scientists sort materials by properties. Magnetic and non-magnetic are two useful categories.' },
    // Grade 8
    { id: 'like_repel',     grades: D8, icon: '↔️',
      title: 'Like poles repel',
      hint: 'Point two north poles (or two south poles) at each other.',
      unlock: ['poles:NN'],
      saw: 'The two north poles pushed each other apart.',
      learn: 'Like poles (N–N or S–S) repel each other. The force pushes them apart.' },
    { id: 'unlike_attract', grades: D8, icon: '🤝',
      title: 'Unlike poles attract',
      hint: 'Point a north pole at a south pole.',
      unlock: ['poles:NS'],
      saw: 'The north and south poles snapped toward each other.',
      learn: 'Unlike poles (N–S) attract. The force pulls them together.' },
    { id: 'field_lines',    grades: D8, icon: '〰️',
      title: 'Field lines run from N to S',
      hint: 'Turn on the iron filings view.',
      unlock: ['filings:on'],
      saw: 'The iron filings lined up in curves running from the north pole to the south pole.',
      learn: 'Magnetic field lines leave the north pole and enter the south pole outside the magnet. A plotting compass needle points in this direction.' },
    { id: 'field_dense',    grades: D8, icon: '🌊',
      title: 'Dense lines mean strong force',
      hint: 'Look at where the field lines are closest together in filings mode.',
      unlock: ['filings:on', 'poles:NS'],
      saw: 'The field lines were densest near the poles. They spread out further away.',
      learn: 'Where field lines are close together, the magnetic force is strongest. Near the poles is where the force is greatest.' },
    { id: 'soft_iron_induced', grades: D8, icon: '🪛',
      title: 'Soft iron becomes magnetic',
      hint: 'Touch a soft iron nail to the magnet in induced mode.',
      unlock: ['induced:touch:nail'],
      saw: 'The soft iron nail picked up paper clips while touching the magnet. When removed, it lost its magnetism.',
      learn: 'Soft iron is magnetised by induction temporarily. It is used in electromagnet cores because it loses magnetism quickly when current stops.' },
    { id: 'hard_steel_induced', grades: D8, icon: '🔩',
      title: 'Hard steel keeps its magnetism',
      hint: 'Touch a steel nail to the magnet, then remove it.',
      unlock: ['induced:touch:steel'],
      saw: 'The hard steel nail kept attracting paper clips even after being removed from the magnet.',
      learn: 'Hard steel retains magnetism. It is used to make permanent magnets.' },
    { id: 'two_poles',      grades: D8, icon: '🔵',
      title: 'Every magnet has two poles',
      hint: 'Observe both ends of a bar magnet.',
      unlock: ['poles:NS', 'poles:NN'],
      saw: 'Every magnet has a north pole and a south pole. You cannot separate them.',
      learn: 'A magnet always has two poles — north and south. Cutting a magnet in half gives two magnets each with two poles.' },
    { id: 'compass_field',  grades: D8, icon: '🧭',
      title: 'A compass follows field lines',
      hint: 'Place the plotting compass near the bar magnet.',
      unlock: ['compass:place'],
      saw: 'The compass needle pointed along the magnetic field line wherever it was placed.',
      learn: 'A plotting compass is a small pivoted magnet. Its north pole points in the direction of the field line — from N to S outside the magnet.' },
    { id: 'earth_magnet',   grades: D8, icon: '🌍',
      title: 'Earth is a giant magnet',
      hint: 'Observe the compass with no bar magnet nearby.',
      unlock: ['compass:place'],
      saw: 'Without any bar magnet nearby, the compass still pointed north.',
      learn: 'Earth has a magnetic field. The geographic north is near the magnetic south pole of Earth\'s field, which is why the compass north pole points that way.' },
    { id: 'demagnetise',    grades: D8, icon: '💥',
      title: 'Hitting a magnet weakens it',
      hint: 'See what happens when the magnet is dropped.',
      unlock: ['drop:magnet'],
      saw: 'After being dropped, the magnet was weaker and attracted fewer iron filings.',
      learn: 'Dropping, hitting or heating a magnet disrupts the alignment of its magnetic domains and weakens or destroys its magnetism.' },
  ];

  // ── Guides ─────────────────────────────────────
  // ⚠ btn on every step is ALWAYS 'Skip this step →'. _guideDo() never executes
  //   the action — it only advances the step (LAB_SPEC §8, "actual interaction").
  const GUIDES = [
    // Grade 4
    {
      id: 'what_sticks', grades: D4, icon: '🧲',
      title: 'What sticks to the magnet?',
      blurb: 'Test each object. Find out which ones are attracted to the magnet.',
      lesson: 'Only iron and steel are attracted to magnets. Everything else is non-magnetic.',
      steps: [
        { on: 'drag:nail',   say: 'Drag the 🔩 iron nail onto the magnet!' },
        { on: 'drag:clip',   say: 'Drag the 📎 steel paper clip — does it stick?' },
        { on: 'drag:coin',   say: 'Drag the 🪙 copper coin — will it stick too?' },
        { on: 'drag:foil',   say: 'Drag the aluminium foil. Aluminium is a metal — is it magnetic?' },
        { on: 'drag:ruler',  say: 'Drag the 📏 plastic ruler to the magnet.' },
        { on: 'drag:marble', say: 'Drag the glass marble. What do you predict?' },
      ],
    },
    {
      id: 'sort', grades: D4, icon: '📋',
      title: 'Sort the objects',
      blurb: 'Place each object in the right group: magnetic or non-magnetic.',
      lesson: 'Sorting objects by whether they are attracted to a magnet is a useful test of properties.',
      steps: [
        { on: 'sort:nail',   say: 'Drag the 🔩 iron nail into the MAGNETIC group.' },
        { on: 'sort:clip',   say: 'Drag the 📎 steel paper clip into the MAGNETIC group.' },
        { on: 'sort:coin',   say: 'Is the copper coin magnetic? Drag it to the right group.' },
        { on: 'sort:foil',   say: 'Drag the aluminium foil into its group.' },
        { on: 'sort:block',  say: 'Drag the wooden block — which group does it belong to?' },
        { on: 'sort:ruler',  say: 'Drag the 📏 plastic ruler into the right group.' },
      ],
    },
    {
      id: 'rule', grades: D4, icon: '📜',
      title: 'The magnet rule',
      blurb: 'Find the rule: which materials are always attracted to magnets?',
      lesson: 'Magnets attract only iron and steel. All other materials — copper, aluminium, wood, glass, plastic — are non-magnetic.',
      steps: [
        { on: 'drag:nail',  say: 'Drag the 🔩 iron nail to the magnet — iron is attracted!' },
        { on: 'drag:clip',  say: 'Drag the 📎 steel clip. Steel contains iron — is it attracted?' },
        { on: 'drag:coin',  say: 'Drag the 🪙 copper coin. Copper is a metal — is it magnetic?' },
        { on: 'drag:foil',  say: 'Drag the aluminium foil. Aluminium is also a metal — is it magnetic?' },
      ],
    },
    // Grade 8
    {
      id: 'poles', grades: D8, icon: '🔵',
      title: 'Poles: attract and repel',
      blurb: 'Explore what happens when you bring magnets together with different poles facing.',
      lesson: 'Unlike poles attract (N–S). Like poles repel (N–N or S–S). Force is strongest when poles are closest.',
      steps: [
        { on: 'poles:NS',      say: 'Bring magnet A\'s N-pole toward magnet B\'s S-pole — what happens?' },
        { on: 'poles:NN',      say: 'Flip magnet B so both N-poles face each other — what do you feel?' },
        { on: 'poles:SS',      say: 'Now try two S-poles facing each other.' },
        { on: 'distance:close', say: 'Move the magnets very close — how does the force change?' },
      ],
    },
    {
      id: 'filings', grades: D8, icon: '〰️',
      title: 'Iron filings: seeing the field',
      blurb: 'Use iron filings to see the invisible magnetic field around the bar magnet.',
      lesson: 'Field lines show the direction and strength of a magnetic field. They run from north to south outside the magnet.',
      steps: [
        { on: 'filings:on',    say: 'Tap "Iron filings" to reveal the invisible magnetic field!' },
        { on: 'compass:place', say: 'Place a plotting compass in the field — which way does it point?' },
        { on: 'poles:NS',      say: 'Bring a second magnet close with unlike poles — watch the field change.' },
        { on: 'poles:NN',      say: 'Now try like poles — find where the field cancels out.' },
      ],
    },
    {
      id: 'induced', grades: D8, icon: '🪛',
      title: 'Induced magnetism',
      blurb: 'Discover how iron and steel become magnets when they touch one.',
      lesson: 'Soft iron gains magnetism by induction — it is magnetic while in contact with a magnet, then loses it. Hard steel retains magnetism longer.',
      steps: [
        { on: 'induced:on',         say: 'Tap "Induced mode" to set up the experiment.' },
        { on: 'induced:touch:nail', say: 'Tap the soft iron nail to touch the magnet — what happens to the paper clips?' },
        { on: 'induced:remove:nail', say: 'Tap the nail to remove it from the magnet — does it keep attracting the clips?' },
        { on: 'induced:touch:steel', say: 'Touch the steel nail to the magnet, then remove it — what is different?' },
      ],
    },
  ];

  // ── Missions ───────────────────────────────────
  const MISSIONS = [
    // Grade 4
    {
      id: 'g4_sort_mission', grades: D4, icon: '🎯',
      title: 'Magnetic Sort',
      blurb: 'Use your knowledge of magnets to answer these questions.',
      intro: 'You have tested the objects. Now show what you know!',
      quiz: [
        {
          q: 'An iron nail is brought near a magnet. What happens?',
          options: ['It is attracted to the magnet', 'It repels the magnet', 'Nothing happens', 'It melts'],
          answer: 'It is attracted to the magnet',
          why: 'Iron is a magnetic material. It is always attracted to a magnet.',
        },
        {
          q: 'Which material is attracted to a magnet?',
          options: ['Steel', 'Copper', 'Wood', 'Glass'],
          answer: 'Steel',
          why: 'Steel contains iron, so it is magnetic. Copper, wood and glass are not attracted to magnets.',
        },
        {
          q: 'Which of these is NOT attracted to a magnet?',
          options: ['Copper coin', 'Iron nail', 'Steel spoon', 'Steel paper clip'],
          answer: 'Copper coin',
          why: 'Copper is a metal but it is NOT magnetic. Only iron and steel are attracted to magnets.',
        },
        {
          q: 'What do we call materials that are attracted to magnets?',
          options: ['Magnetic materials', 'Electric materials', 'Heavy materials', 'Shiny materials'],
          answer: 'Magnetic materials',
          why: 'Materials attracted to magnets are called magnetic materials. Iron and steel are the most common.',
        },
        {
          q: 'Which rule about magnets is TRUE?',
          options: [
            'Magnets attract only iron and steel',
            'Magnets attract all metals',
            'Magnets attract everything shiny',
            'Magnets attract only gold and silver',
          ],
          answer: 'Magnets attract only iron and steel',
          why: 'Magnets attract only iron and steel. Copper, aluminium and other metals are not magnetic.',
        },
      ],
    },
    {
      id: 'g4_rules_mission', grades: D4, icon: '📜',
      title: 'Magnet Rules',
      blurb: 'Test your understanding of the science behind magnets.',
      intro: 'Can you answer these questions about magnets?',
      quiz: [
        {
          q: 'A copper coin is brought near a magnet. What happens?',
          options: ['Nothing — copper is not magnetic', 'The coin is attracted', 'The coin repels', 'The coin melts'],
          answer: 'Nothing — copper is not magnetic',
          why: 'Copper is not a magnetic material. Magnets only attract iron and steel.',
        },
        {
          q: 'Which of these objects will a magnet attract?',
          options: ['A steel spoon', 'A glass cup', 'An aluminium can', 'A wooden chair'],
          answer: 'A steel spoon',
          why: 'Steel contains iron, so it is magnetic. Glass, aluminium and wood are not magnetic.',
        },
        {
          q: 'Maria says every metal is attracted to a magnet. Is she right?',
          options: ['No — only iron and steel are attracted', 'Yes — all metals are magnetic', 'Yes — but only shiny metals', 'No — no metals are magnetic'],
          answer: 'No — only iron and steel are attracted',
          why: 'Copper, aluminium and gold are metals that are NOT attracted to magnets. Only iron and steel are magnetic.',
        },
        {
          q: 'A magnet is brought near a plastic ruler. What happens?',
          options: ['Nothing — plastic is not magnetic', 'The ruler is attracted', 'The ruler is repelled', 'The ruler breaks'],
          answer: 'Nothing — plastic is not magnetic',
          why: 'Plastic is not a magnetic material. Magnets have no effect on plastic, glass, wood or rubber.',
        },
        {
          q: 'Why should you keep a magnet away from a compass?',
          options: [
            'The magnet makes the compass point the wrong way',
            'The magnet will melt the compass',
            'The compass will stick to the magnet forever',
            'The compass will become heavier',
          ],
          answer: 'The magnet makes the compass point the wrong way',
          why: 'A nearby magnet has a stronger field than Earth. It overrides the compass needle and gives wrong directions.',
        },
      ],
    },
    // Grade 8
    {
      id: 'g8_poles_mission', grades: D8, icon: '🎯',
      title: 'Poles and Forces',
      blurb: 'Test your understanding of magnetic poles and forces.',
      intro: 'You have explored the poles. Can you answer these questions?',
      quiz: [
        {
          q: 'Two north poles are brought close together. What happens?',
          options: ['They repel each other', 'They attract each other', 'Nothing happens', 'One pole disappears'],
          answer: 'They repel each other',
          why: 'Like poles repel. North–North and South–South always push each other apart.',
        },
        {
          q: 'A north pole and a south pole are brought together. What happens?',
          options: ['They attract each other', 'They repel each other', 'They spin around', 'Nothing happens'],
          answer: 'They attract each other',
          why: 'Unlike poles attract. North and south poles always pull toward each other.',
        },
        {
          q: 'Magnetic field lines outside a magnet run from __ to __.',
          options: ['North to South', 'South to North', 'Inside to outside', 'Top to bottom'],
          answer: 'North to South',
          why: 'By convention, field lines leave the north pole and enter the south pole on the outside of the magnet. A plotting compass needle points in this direction.',
        },
        {
          q: 'Why is soft iron used for the core of an electromagnet?',
          options: [
            'It loses its magnetism quickly when the current stops',
            'It keeps its magnetism forever',
            'It is the cheapest metal',
            'It does not conduct electricity',
          ],
          answer: 'It loses its magnetism quickly when the current stops',
          why: 'Soft iron is a temporary magnet — it is magnetised easily and loses magnetism easily. This is ideal for an electromagnet that must be switched on and off.',
        },
        {
          q: 'A plotting compass is placed near the north pole of a bar magnet. Which way does its north pole point?',
          options: [
            'Away from the bar magnet\'s north pole (toward its south pole)',
            'Toward the bar magnet\'s north pole',
            'It spins and stops randomly',
            'It points straight up',
          ],
          answer: 'Away from the bar magnet\'s north pole (toward its south pole)',
          why: 'The compass needle\'s north pole points in the direction of the field line: away from the bar magnet\'s north pole, toward its south pole.',
        },
      ],
    },
    {
      id: 'g8_fields_mission', grades: D8, icon: '〰️',
      title: 'Fields and Applications',
      blurb: 'Apply your knowledge of magnetic fields and induced magnetism.',
      intro: 'Show what you have discovered about fields and applications!',
      quiz: [
        {
          q: 'A credit card is placed near a strong magnet. What is likely to happen?',
          options: [
            'The data on the magnetic strip is erased',
            'The card is attracted to the magnet',
            'The card repels the magnet',
            'The card becomes a magnet',
          ],
          answer: 'The data on the magnetic strip is erased',
          why: 'The magnetic strip on a card stores data as tiny magnetic regions. A strong magnet randomises them, erasing the data.',
        },
        {
          q: 'What do iron filings show when sprinkled around a bar magnet?',
          options: [
            'The shape and direction of the magnetic field',
            'The mass of the magnet',
            'The temperature around the magnet',
            'Whether the magnet is made of iron or steel',
          ],
          answer: 'The shape and direction of the magnetic field',
          why: 'Iron filings align with field lines, making the invisible magnetic field visible.',
        },
        {
          q: 'Where is the magnetic field of a bar magnet strongest?',
          options: ['Near the poles', 'In the middle', 'On the surface', 'Far away from the magnet'],
          answer: 'Near the poles',
          why: 'Field lines are densest near the poles. Denser lines represent a stronger field.',
        },
        {
          q: 'A soft iron nail is held against a bar magnet and picks up paper clips. The nail is then removed. What happens?',
          options: [
            'The nail loses its magnetism and drops the clips',
            'The nail keeps attracting the clips permanently',
            'The nail repels the clips',
            'Nothing changes',
          ],
          answer: 'The nail loses its magnetism and drops the clips',
          why: 'Soft iron is magnetised by induction — it becomes magnetic while in contact with a magnet. When removed, it quickly loses its magnetism.',
        },
        {
          q: 'A steel needle is stroked many times in the same direction with a bar magnet. What happens?',
          options: [
            'It becomes a permanent magnet',
            'It becomes non-magnetic',
            'It becomes an electromagnet',
            'It melts',
          ],
          answer: 'It becomes a permanent magnet',
          why: 'Stroking steel in one direction aligns its magnetic domains, making it a permanent magnet. Hard steel retains this magnetism.',
        },
      ],
    },
  ];

  // ── Facts (tip button) ─────────────────────────
  const FACTS = [
    { text: 'Magnets attract only iron and steel. Copper, aluminium and glass are not magnetic.', grades: D4 },
    { text: 'A horseshoe magnet is strongest at its two ends, called poles.', grades: D4 },
    { text: 'Magnets can attract objects through paper, water and thin plastic.', grades: D4 },
    { text: 'A compass needle is a tiny magnet that always points north.', grades: D4 },
    { text: 'Steel paper clips are magnetic because steel is an alloy of iron.', grades: D4 },
    { text: 'A magnet can lose its power if it is dropped or heated.', grades: D4 },
    { text: 'Every magnet has two poles — north and south. You cannot have just one pole.', grades: D8 },
    { text: 'Like poles repel. Unlike poles attract. This rule never changes.', grades: D8 },
    { text: 'Magnetic field lines run from north to south outside the magnet.', grades: D8 },
    { text: 'The Earth itself is a giant magnet. Its geographic north is near its magnetic south pole.', grades: D8 },
    { text: 'Soft iron is used in electromagnet cores because it loses magnetism quickly.', grades: D8 },
    { text: 'A plotting compass is a pivoted magnet. It lines up with any magnetic field.', grades: D8 },
    { text: 'Iron filings line up along field lines, making an invisible field visible.', grades: D8 },
    { text: 'Hard steel retains its magnetism and is used for permanent magnets.', grades: D8 },
    { text: 'A magnet can be demagnetised by heating it, dropping it or hammering it.', grades: D8 },
    { text: 'Induced magnetism: a piece of iron near a magnet becomes a temporary magnet.', grades: D8 },
  ];

  return {
    GRADES, D4, D8, D48,
    forGrade,
    OBJECTS,
    HAZARDS,
    RESULTS,
    DISCOVERIES,
    GUIDES,
    MISSIONS,
    FACTS,
  };
})();
if (typeof window !== 'undefined') window.LabMagnetsData = LabMagnetsData;
