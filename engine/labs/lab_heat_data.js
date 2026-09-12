'use strict';
// ══════════════════════════════════════════════
//  Science Labs — the science behind the Heat Transfer Lab (PSAC Grade 6).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. Every rate, temperature,
//    formula, guide step, quiz question, discovery and hazard text comes from
//    this file. lab_heat.js only animates what the data says.
//  ⚠ Grounded in grade6-science chapters g6-materials ("properties: conductor,
//    insulator; relating properties to uses") and g6-energy. Questions in
//    subjects/grade6-science/questions/depth_hard.js, exam_depth.js and
//    ch02_g6_materials.js provide the PSAC question anchors used here.
//  ⚠ Primary lab (docs/labs/LAB_SPEC.md §8): every guide, mission and
//    discovery carries `grades: [6]` so the per-grade layer works correctly.
//    Reading level: sentences for a 9–11-year-old.
//
//  The three models:
//    CONDUCTION — heat front travels along each rod from the flame end.
//      heatFrontAt(material, expTime) → fraction 0–1 of rod reached.
//      Wax drop at position p melts when front >= p.
//      Rates (illustrative; ORDER and zeros are the science):
//        metal  0.25 /s  — wax at 0.25 melts at 1 s, full rod at 4 s
//        glass  0.12 /s  — fair conductor
//        wood   0.003 /s — poor conductor, wax at 0.25 melts at 83 s
//        plastic 0.001 /s — insulator, wax at 0.25 melts at 250 s
//    CONVECTION — particles loop around a beaker/room at speed CONV_SPEED.
//      Nothing quantitative; the finding is "loop exists and direction".
//    RADIATION — black can warms at 0.40 °C/exp-s, silver at 0.15.
//      Room temp 25 °C, max 65 °C.
// ══════════════════════════════════════════════
const LabHeatData = (() => {
  const GRADES = [6];

  // ── Conduction ─────────────────────────────────────────────────────────
  const COND_RATES = { metal: 0.25, glass: 0.12, wood: 0.003, plastic: 0.001 };
  const WAX_POSITIONS = [0.25, 0.5, 0.75, 1.0];

  const MATERIALS = {
    metal:   { name: 'Metal rod',     icon: '⚙️', short: 'Metal',   color: '#9BAAB3', rate: COND_RATES.metal,   conductor: true  },
    glass:   { name: 'Glass rod',     icon: '🔮', short: 'Glass',   color: '#8DCFDF', rate: COND_RATES.glass,   conductor: false },
    wood:    { name: 'Wooden stick',  icon: '🪵', short: 'Wood',    color: '#8B5E3C', rate: COND_RATES.wood,    conductor: false },
    plastic: { name: 'Plastic ruler', icon: '📏', short: 'Plastic', color: '#4A8FD5', rate: COND_RATES.plastic, conductor: false },
  };
  const MATERIAL_KEYS = ['metal', 'glass', 'wood', 'plastic'];

  function heatFrontAt(mat, t) {
    const M = MATERIALS[mat];
    return M ? Math.min(1, M.rate * t) : 0;
  }
  function waxMelted(mat, pos, t) { return heatFrontAt(mat, t) >= pos; }
  function anyWaxMelted(mat, t) { return WAX_POSITIONS.some(p => waxMelted(mat, p, t)); }
  function allWaxMelted(mat, t) { return WAX_POSITIONS.every(p => waxMelted(mat, p, t)); }
  // Time when wax drop at pos melts (Infinity if never)
  function meltTime(mat, pos) {
    const r = COND_RATES[mat];
    return r ? pos / r : Infinity;
  }

  // ── Radiation ───────────────────────────────────────────────────────────
  const ROOM_TEMP = 25;
  const TEMP_RATES = { black: 0.40, silver: 0.15 };
  const MAX_TEMP = 65;
  function tempAt(can, t) { return Math.min(MAX_TEMP, ROOM_TEMP + (TEMP_RATES[can] || 0) * t); }

  // ── Convection particles ─────────────────────────────────────────────────
  const CONV_SPEED = 0.06;  // phase-units per real second (0–1 = full loop)
  const CONV_N = 16;        // number of animated particles

  // ── State ────────────────────────────────────────────────────────────────
  function newState() {
    return {
      station: 'conduction',
      // Conduction
      burner: false,
      materials: [],         // array of material ids currently on the rack
      selMat: 'metal',       // selected material for setup
      condTime: 0,           // experiment seconds elapsed with burner on
      condCards: {},
      // Convection
      heater: false,
      dye: false,
      convMode: 'water',     // 'water' | 'air'
      convTime: 0,           // experiment seconds elapsed with heater on
      convCards: {},
      // Radiation
      lamp: false,
      radTime: 0,            // experiment seconds elapsed with lamp on
      readings: [],          // [{ t, black, silver }]
      radCards: {},
      // Cross-station tracking
      stationsDone: {},      // station id → true once experiment run there
    };
  }
  // Exported alias used by the data test
  const blankState = newState;

  // ── Discoveries triggered by state ──────────────────────────────────────
  function finds(st) {
    const found = [];
    const ct = st.condTime, ht = st.convTime, rt = st.radTime;

    // Conduction discoveries
    if (st.burner && st.materials.includes('metal') && anyWaxMelted('metal', ct))
      found.push('disc_metal_fast');
    if (st.burner && st.materials.includes('metal') && allWaxMelted('metal', ct))
      found.push('disc_metal_cold_feel');
    if (st.burner && st.materials.includes('wood') && ct > 6 && heatFrontAt('wood', ct) < 0.25)
      found.push('disc_wood_insulates');
    if (st.burner && st.materials.includes('metal') && st.materials.includes('wood') && ct > 6)
      found.push('disc_handles');

    // Convection discoveries
    if (st.heater && ht > 4) found.push('disc_convection_loop');
    if (st.heater && ht > 4 && st.dye) found.push('disc_dye_loop');
    if (st.convMode === 'air' && st.heater && ht > 2) found.push('disc_sea_breeze');
    if (st.heater && ht > 8) found.push('disc_room_heater');

    // Radiation discoveries
    if (st.lamp && rt > 3) found.push('disc_black_absorbs');
    if (st.lamp && rt > 3) found.push('disc_silver_reflects');
    if (st.lamp && rt > 15) found.push('disc_sun_earth');

    // Cross-station
    const done = Object.keys(st.stationsDone || {}).length;
    if (done >= 3) found.push('disc_thermos');
    // disc_jumper_warm: exploring wood\'s insulating behaviour links to trapped-air insulators
    if (st.burner && st.materials.includes('wood') && ct > 120)
      found.push('disc_jumper_warm');

    return found;
  }

  // ── Mission readiness ────────────────────────────────────────────────────
  function missionReady(id, st) {
    if (id === 'mission_conductor')
      return st.station === 'conduction' && st.burner &&
             st.condTime >= 120 && st.materials.length >= 3;
    if (id === 'mission_thermos')
      return Object.keys(st.stationsDone || {}).length >= 3 &&
             st.radTime > 10 && st.convTime > 5 && st.condTime > 10;
    return false;
  }

  // ── Facts (💡 button) ────────────────────────────────────────────────────
  const FACTS = [
    'Metal conducts heat about 400 times better than wood.',
    'The Sun heats the Earth by radiation across 150 million km of empty space.',
    'Mauritius sea breezes blow from sea to land each day. The land heats faster than the sea.',
    'A vacuum flask keeps your drink hot by blocking all three types of heat transfer.',
    'Dark surfaces absorb more heat radiation than light or shiny surfaces.',
    'Air trapped in wool fibres is an excellent heat insulator.',
    'Convection only works in fluids — it cannot happen in a solid or in outer space.',
    'A saucepan has a metal body to heat the food. The handle is wood or plastic to protect your hand.',
  ];

  // ── Hazards ──────────────────────────────────────────────────────────────
  const HAZARDS = {
    hot_rod: {
      signs: ['hot', 'warning'],
      title: () => 'Ouch! The metal rod is very hot!',
      happened: () => 'You touched the metal rod with your bare hand. Metal conducts heat quickly — even the far end gets dangerously hot.',
      why: 'Metal is an excellent conductor. Heat travels along the rod so fast that it looks safe but is not.',
      instead: 'Always use tongs or heat-proof gloves to handle a heated rod. Let it cool down fully before touching it. Ask an adult for help.',
      exam: 'Metal is a good conductor of heat. Handle heated metals with tongs, not bare hands.',
    },
    boil_dry: {
      signs: ['hot'],
      title: () => 'The beaker is nearly boiled dry!',
      happened: () => 'You left the beaker on the heater for too long. The water has nearly all turned to steam and the glass is dangerously hot.',
      why: 'When water boils, it escapes as steam. An empty beaker on a hot coil gets much hotter and can crack. Broken glass is sharp.',
      instead: 'Always watch a heated beaker. Turn off the heat if the water level gets low. Never leave a heated beaker unattended.',
      exam: 'Never heat a beaker until it boils dry. Watch the water level.',
    },
    unattended_flame: {
      signs: ['hot', 'warning'],
      title: () => 'A flame left alone is dangerous!',
      happened: () => 'The Bunsen burner was left on with nobody watching it. An unattended flame can set nearby things on fire.',
      why: 'A flame can spread quickly to nearby materials. A lab must always have a responsible adult present when any flame is burning.',
      instead: 'Always turn off the Bunsen burner when you step away, even for a moment. Ask an adult to stay with you.',
      exam: 'Always turn off a Bunsen burner when it is not being used.',
    },
  };

  // ── Result cards (wrong but safe) ────────────────────────────────────────
  const RESULTS = {
    dark_clothing: {
      icon: '👕',
      title: 'Dark colours absorb more radiation',
      happened: () => 'You wore dark clothing on a hot Mauritian day. You felt much hotter than your friend in a white shirt.',
      instead: 'Wear light-coloured clothes on a hot Mauritian day. Light colours reflect the sun\'s radiation, keeping you cooler. Dark colours absorb it and warm up faster.',
      exam: 'Dark surfaces absorb more heat radiation. Light and shiny surfaces reflect it.',
    },
    unfair_test: {
      icon: '⚖️',
      title: 'That was not a fair test',
      happened: () => 'You compared rods of different lengths. The shorter rod seems like a faster conductor. But there is simply less of it to heat.',
      instead: 'Use rods of the same length to compare them fairly. Change only ONE thing at a time.',
      exam: 'A fair test changes only one variable at a time and keeps everything else the same.',
    },
  };

  // ── Auto-step text for "Show me how" guides ──────────────────────────────
  function autoStep(on) {
    const i = on.indexOf(':');
    const k = i > 0 ? on.slice(0, i) : on;
    const v = i > 0 ? on.slice(i + 1) : '';
    switch (k) {
      case 'station':
        return { on, btn: v === 'conduction' ? '🔥 Conduction' : v === 'convection' ? '🌊 Convection' : '☀️ Radiation',
                     say: 'Go to the ' + { conduction: 'Conduction', convection: 'Convection', radiation: 'Radiation' }[v] + ' station.' };
      case 'material': {
        const M = MATERIALS[v];
        return { on, btn: (M ? M.icon + ' ' + M.name : v), say: 'Put the ' + (M ? M.name.toLowerCase() : v) + ' on the rack.' };
      }
      case 'burner':
        return { on, btn: '🔥 Turn on burner', say: 'Turn on the Bunsen burner. Watch the wax drops!' };
      case 'heater':
        return { on, btn: '🔌 Turn on heater', say: 'Turn on the heater coil at the bottom.' };
      case 'lamp':
        return { on, btn: '💡 Turn on lamp', say: 'Turn on the lamp. Both cans get the same light.' };
      case 'dye':
        return { on, btn: '🔵 Add dye drop', say: 'Add a dye drop near the bottom. Watch it move!' };
      case 'convmode':
        return { on, btn: v === 'air' ? '🌬️ Air convection' : '💧 Water convection',
                     say: v === 'air' ? 'Switch to the Air view.' : 'Switch back to Water.' };
      case 'tick30':
        return { on, btn: '⏩ Wait 30 s', say: 'Wait 30 seconds and watch what happens.' };
      case 'tick60':
        return { on, btn: '⏩ Wait 1 min', say: 'Wait one minute and watch.' };
      case 'tick120':
        return { on, btn: '⏩ Wait 2 min', say: 'Wait two minutes. Which rods still have wax?' };
      case 'read_temp':
        return { on, btn: '🌡️ Read temperature', say: 'Read the temperature of both cans and write it down.' };
    }
    return { on, btn: on, say: on };
  }

  // ── Guided experiments ───────────────────────────────────────────────────
  const GUIDES = [
    {
      id: 'guide_conduction',
      grades: [6],
      icon: '🔥',
      title: 'Which material conducts heat?',
      blurb: 'Place rods over the burner and watch the wax drops melt.',
      lesson: 'Metal conducted heat quickly — all four wax drops melted. Wood and plastic are poor conductors, so their wax drops near the top did not melt. Materials that do not let heat pass easily are called insulators.',
      steps: [
        { on: 'station:conduction', say: 'Tap 🔥 Conduction in the station bar!' },
        { on: 'material:metal',     say: 'Tap the ⚙️ metal rod to put it on the rack.' },
        { on: 'material:wood',      say: 'Tap the 🪵 wooden stick to add it.' },
        { on: 'material:plastic',   say: 'Tap the 📏 plastic ruler to add it too.' },
        { on: 'burner:on',          say: 'Tap the 🔥 burner to turn it on — watch the wax drops!' },
        { on: 'tick30',             say: 'Tap ⏩ to wait 30 s — which wax drops are melting?' },
        { on: 'tick120',            say: 'Tap ⏩ to wait 2 min — which rods still have wax?' },
      ],
    },
    {
      id: 'guide_convection',
      grades: [6],
      icon: '🌊',
      title: 'Watch convection move',
      blurb: 'Heat the water, add a dye drop, and see the convection current.',
      lesson: 'Hot water rose from the bottom where the coil was. Cool water sank from the sides and top. The dye showed the whole loop. This circular movement of a heated fluid is called a convection current.',
      steps: [
        { on: 'station:convection', say: 'Tap 🌊 Convection in the station bar!' },
        { on: 'heater:on',          say: 'Tap 🔌 the heater coil to turn it on.' },
        { on: 'tick30',             say: 'Tap ⏩ to wait 30 s while the water heats.' },
        { on: 'dye:add',            say: 'Tap 🔵 to drop dye near the bottom — watch it move!' },
        { on: 'convmode:air',       say: 'Tap 🌬️ Air to see convection in a room.' },
      ],
    },
    {
      id: 'guide_radiation',
      grades: [6],
      icon: '☀️',
      title: 'Black or silver — which heats faster?',
      blurb: 'Shine the lamp on two cans and compare the thermometers.',
      lesson: 'The black can heated faster than the silver. Both got the same light. Dark surfaces absorb more heat radiation. Shiny surfaces reflect it.',
      steps: [
        { on: 'station:radiation', say: 'Tap ☀️ Radiation in the station bar!' },
        { on: 'lamp:on',           say: 'Tap 💡 to turn on the lamp — both cans get the same light.' },
        { on: 'tick30',            say: 'Tap ⏩ to wait 30 s — look at both thermometers.' },
        { on: 'read_temp',         say: 'Tap 🌡️ to read the temperature of both cans.' },
        { on: 'tick60',            say: 'Tap ⏩ to wait 1 min — which can is warmer now?' },
        { on: 'read_temp',         say: 'Tap 🌡️ again — which can is hotter?' },
      ],
    },
  ];

  // ── Missions ─────────────────────────────────────────────────────────────
  const MISSIONS = [
    {
      id: 'mission_conductor',
      grades: [6],
      icon: '🏆',
      title: 'Thermal Relay Race',
      blurb: 'Test all four materials. Which one conducts heat the fastest?',
      intro: 'Place all four materials on the rack and turn on the burner. Wait until you can see which ones are heating quickly and which are staying cool. Then answer the questions.',
      rig: 'conduction',
      quiz: [
        { q: 'Which material is the best conductor of heat?', opts: ['Metal', 'Wood', 'Plastic', 'Glass'], ans: 0,
          reason: 'Metal conducts heat much faster than wood, plastic or glass.' },
        { q: 'Why do saucepan handles have wooden or plastic grips?', opts: ['To look attractive', 'To keep your hand cool', 'To make the pan heavier', 'To make the pan cheaper'], ans: 1,
          reason: 'Wood and plastic conduct heat poorly. The handle stays cool enough to hold safely.' },
        { q: 'Which of these is a good thermal insulator?', opts: ['Copper wire', 'Iron nail', 'Wooden stick', 'Steel spoon'], ans: 2,
          reason: 'Wood is a poor conductor of heat, which makes it a good insulator.' },
        { q: 'What do we call materials that do NOT let heat pass through them easily?', opts: ['Conductors', 'Insulators', 'Radiators', 'Absorbers'], ans: 1,
          reason: 'Insulators are poor conductors of heat. They slow down the transfer of heat.' },
        { q: 'A metal spoon in hot soup burns your hand. A wooden spoon at the same temperature does not. Why?', opts: ['Metal is heavier', 'Metal conducts heat to your hand much faster', 'Metal is always at a higher temperature', 'Wood stays cooler on its own'], ans: 1,
          reason: 'Metal conducts heat away from the soup into your hand very quickly. The temperature is the same — only the speed of heat transfer differs.' },
      ],
    },
    {
      id: 'mission_thermos',
      grades: [6],
      icon: '🧊',
      title: 'The Thermos Flask Mystery',
      blurb: 'Visit all three stations, then explain how a thermos keeps drinks hot for hours.',
      intro: 'Use all three stations. Run conduction, watch the convection loop, observe the radiation race. Then answer questions about the thermos flask.',
      rig: 'thermos',
      quiz: [
        { q: 'A thermos flask has a vacuum (empty space) between its walls. Which type(s) of heat transfer does this block?', opts: ['Radiation only', 'Conduction and convection', 'Convection only', 'All three equally'], ans: 1,
          reason: 'A vacuum has no particles. Heat cannot travel by conduction or convection — both need particles. Both are blocked.' },
        { q: 'The inner walls of a thermos flask are shiny silver. What type of heat transfer does this reduce?', opts: ['Conduction', 'Convection', 'Radiation', 'Evaporation'], ans: 2,
          reason: 'Shiny surfaces reflect heat radiation. A silvered wall reflects radiation back into the flask, keeping the drink hot.' },
        { q: 'Wool keeps you warm because it traps air. Why is trapped air a good insulator?', opts: ['Air reflects heat radiation', 'Air is a poor conductor of heat', 'Air is heavy and blocks the wind', 'Air stores a lot of heat'], ans: 1,
          reason: 'Air is a very poor conductor of heat. Trapped air in wool, fur or feathers slows the loss of body heat by conduction.' },
        { q: 'Which of these would make it HARDER to keep a drink hot in a container?', opts: ['A vacuum layer', 'A shiny inner surface', 'A metal outer surface with no insulation', 'A tight-fitting lid'], ans: 2,
          reason: 'Metal conducts heat well, so a bare metal outer surface would let heat escape quickly.' },
        { q: 'In Mauritius, a sea breeze blows from the sea toward the land during the day. Why?', opts: ['The sea is saltier and pushes air away', 'The land heats faster, warm air rises, and cooler sea air moves in', 'The Moon pulls the air toward the land', 'The sea is higher than the land'], ans: 1,
          reason: 'Land heats faster than the sea. Warm air over land rises. Cool sea air moves in to fill the gap. You feel it as a sea breeze.' },
      ],
    },
  ];

  // ── Discoveries ──────────────────────────────────────────────────────────
  const DISCOVERIES = [
    {
      id: 'disc_metal_fast',
      grades: [6],
      icon: '⚡',
      title: 'Metal conducts heat fast',
      hint: 'Put a metal rod over the flame and watch the wax drops.',
      saw: 'The wax drops on the metal rod melted quickly, from the bottom up. Metal carries heat from particle to particle very quickly.',
      learn: 'Metal is an excellent conductor of heat. Metal pots heat food fast. Metal also feels very hot when near a flame. Iron, copper and steel all conduct heat well.',
      how: ['station:conduction', 'material:metal', 'burner:on', 'tick30'],
      psac: 'Good conductors of heat include metals such as copper, iron and steel.',
    },
    {
      id: 'disc_metal_cold_feel',
      grades: [6],
      icon: '🥶',
      title: 'Metal feels colder than wood — but it is the same temperature',
      hint: 'Place a metal rod and a wooden stick side by side at room temperature.',
      saw: 'The metal rod felt colder than the wood. Both were at the same room temperature.',
      learn: 'Metal conducts heat from your hand quickly. Your skin cools fast, which feels cold. Wood conducts heat slowly, so it feels warmer. The temperature is the same. Only the speed of transfer differs.',
      how: ['station:conduction', 'material:metal', 'material:wood', 'burner:on', 'tick30'],
      psac: 'What feels cold or hot is the RATE of transfer, not the temperature itself.',
    },
    {
      id: 'disc_wood_insulates',
      grades: [6],
      icon: '🪵',
      title: 'Wood is a poor conductor',
      hint: 'Leave a wooden stick over the flame for a long time.',
      saw: 'After 30 seconds, no wax had melted on the wood. Heat moves through wood very slowly.',
      learn: 'Wood is a poor conductor of heat — we call it an insulator. Wooden handles on hot pots stay cool enough to hold. That is why we use them.',
      how: ['station:conduction', 'material:wood', 'burner:on', 'tick30', 'tick120'],
      psac: 'Wood is used for handles on pots and pans because it is an insulator. It does not conduct heat to your hand.',
    },
    {
      id: 'disc_handles',
      grades: [6],
      icon: '🍳',
      title: 'One pot, two materials — two opposite jobs',
      hint: 'Test metal and wood side by side, then think about a saucepan.',
      saw: 'Metal heated up very fast. Wood stayed cool near the top. A saucepan uses a metal body to heat food. The handle is wood or plastic to protect your hand.',
      learn: 'Metal conducts heat to the food. Wood or plastic in the handle keeps your hand safe. Two materials, two opposite jobs. Choosing the right material for each job is good design.',
      how: ['station:conduction', 'material:metal', 'material:wood', 'burner:on', 'tick60'],
      psac: 'Materials are chosen for their properties. Metal conducts heat well. Wood and plastic are insulators.',
    },
    {
      id: 'disc_convection_loop',
      grades: [6],
      icon: '🌀',
      title: 'Hot liquid rises and makes a loop',
      hint: 'Heat the water in the beaker and watch the particles.',
      saw: 'Red particles rose from the hot bottom. Blue particles sank from the cooler top and sides. The whole water circulated in a loop — a convection current.',
      learn: 'Warm liquid near the heat source becomes less dense and rises. Cooler, denser liquid sinks to replace it. This loop is called a convection current. It carries heat through the whole liquid.',
      how: ['station:convection', 'heater:on', 'tick30'],
      psac: 'Convection is the transfer of heat by the movement of a fluid. Hot fluid rises; cool fluid sinks.',
    },
    {
      id: 'disc_dye_loop',
      grades: [6],
      icon: '💧',
      title: 'Dye makes the invisible current visible',
      hint: 'Add a dye drop after turning on the heater.',
      saw: 'The dye rose near the heater. It flowed across the top. Then it sank on the cool side and looped back. It traced the convection current.',
      learn: 'Scientists use coloured dye to make invisible convection currents visible. The dye moves with the water. It shows the path of the rising warm current and the sinking cool part.',
      how: ['station:convection', 'heater:on', 'tick30', 'dye:add'],
    },
    {
      id: 'disc_sea_breeze',
      grades: [6],
      icon: '🌊',
      title: 'The sea breeze of Mauritius',
      hint: 'Switch to "Air convection" and think about the land and the sea.',
      saw: 'In the air view, warm air rose above the hot side. Cooler air moved in from the other side to replace it. This is exactly what happens between the land and the sea in Mauritius.',
      learn: 'In Mauritius, the land heats faster than the sea during the day. Warm air over the land rises. Cool sea air moves in to fill the gap. You feel it as a sea breeze. At night, the land cools faster and the breeze reverses.',
      how: ['station:convection', 'heater:on', 'tick30', 'dye:add', 'convmode:air'],
      psac: 'Sea breezes are caused by convection. Warm air rises over the hot land; cool air flows in from the sea.',
    },
    {
      id: 'disc_room_heater',
      grades: [6],
      icon: '🏠',
      title: 'A low heater warms a room better',
      hint: 'Watch the air convection and notice where the heater is placed.',
      saw: 'When the heater is near the floor, warm air rises and circulates all around the room. A heater near the ceiling only warms the air already at the top.',
      learn: 'Convection works best when the heat source is at the bottom. Warm air rises, cools, and sinks, stirring the whole room. A heater near the ceiling keeps the top warm. The floor stays cold.',
      how: ['station:convection', 'heater:on', 'tick30', 'convmode:air'],
    },
    {
      id: 'disc_black_absorbs',
      grades: [6],
      icon: '🖤',
      title: 'Black surfaces absorb more radiation',
      hint: 'Shine the lamp on both cans and check the thermometers.',
      saw: 'The black can heated up much faster than the silver. Both received the same light from the lamp.',
      learn: 'Dark surfaces are good absorbers of heat radiation. Black tarmac roads get very hot in the Mauritian sun. Dark clothing outdoors makes you feel hotter too.',
      how: ['station:radiation', 'lamp:on', 'tick30'],
      psac: 'Dark surfaces are good absorbers of heat radiation. Light and shiny surfaces are good reflectors.',
    },
    {
      id: 'disc_silver_reflects',
      grades: [6],
      icon: '🪞',
      title: 'Shiny surfaces reflect radiation',
      hint: 'Compare the silver can with the black can under the lamp.',
      saw: 'The silver (shiny) can stayed much cooler than the black can. The shiny surface reflected most of the lamp\'s radiation away.',
      learn: 'Shiny and light-coloured surfaces are good reflectors of heat radiation. They bounce radiation away instead of absorbing it. Emergency blankets are silver so they reflect your body heat back to you. Light-coloured roofs in hot countries stay cooler than dark ones.',
      how: ['station:radiation', 'lamp:on', 'tick30', 'read_temp'],
    },
    {
      id: 'disc_sun_earth',
      grades: [6],
      icon: '☀️',
      title: 'How the Sun heats the Earth',
      hint: 'Watch how the lamp warms the cans without touching them.',
      saw: 'The lamp warmed the cans without touching them. Heat travelled as radiation through the air. The Sun does the same thing — but across 150 million km of empty space.',
      learn: 'The Sun heats the Earth by radiation. Heat travels as infrared waves across the vacuum of space. This is the only transfer that needs no material in between. Conduction and convection need particles. Radiation does not.',
      how: ['station:radiation', 'lamp:on', 'tick30', 'tick120'],
      psac: 'The Sun heats the Earth by radiation. Radiation can travel through a vacuum. Conduction and convection cannot.',
    },
    {
      id: 'disc_thermos',
      grades: [6],
      icon: '🧊',
      title: 'How a thermos flask stops all three',
      hint: 'Use all three stations, then think about the thermos flask.',
      saw: 'A thermos has a silvered inner wall, a vacuum gap, and a tight lid. Together they block all three types of heat transfer.',
      learn: '(1) The vacuum gap has no particles, so heat cannot pass by conduction or convection. (2) The silvered wall reflects radiation back in. (3) The tight lid stops heat escaping by convection at the top. All three paths are blocked, so the drink stays hot for hours.',
      how: ['station:conduction', 'burner:on', 'tick30', 'station:convection', 'heater:on', 'station:radiation', 'lamp:on'],
      psac: 'A vacuum flask reduces heat transfer by conduction, convection and radiation.',
    },
    {
      id: 'disc_jumper_warm',
      grades: [6],
      icon: '🧥',
      title: 'Why a woolly jumper keeps you warm',
      hint: 'Think about what wool does to the air inside it.',
      saw: 'You felt warm in a woolly jumper even though wool itself is not warm. The warmth comes from the air trapped between the wool fibres.',
      learn: 'Wool is full of tiny air pockets. Air is a very poor conductor of heat. The trapped air slows the loss of body heat by conduction. It also stops convection because the air cannot flow. That is why fluffy materials (wool, fur, feathers, polystyrene foam) are good insulators.',
      how: ['station:conduction', 'material:wood', 'burner:on', 'tick30', 'tick120'],
    },
  ];

  return {
    GRADES, MATERIALS, MATERIAL_KEYS, WAX_POSITIONS, COND_RATES,
    ROOM_TEMP, TEMP_RATES, MAX_TEMP, CONV_SPEED, CONV_N,
    FACTS, HAZARDS, RESULTS, GUIDES, MISSIONS, DISCOVERIES,
    heatFrontAt, waxMelted, anyWaxMelted, allWaxMelted, meltTime,
    tempAt, finds, missionReady, newState, blankState, autoStep,
  };
})();
if (typeof window !== 'undefined') window.LabHeatData = LabHeatData;
