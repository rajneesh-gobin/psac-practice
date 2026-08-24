'use strict';
// Grade 6 Science - Chapter: Energy (electricity generation, national grid)
// IDs format: g6sci-en-NNN

const _SVG_GRID = `<svg viewBox="0 0 300 70" width="300" height="70" style="display:block;margin:6px auto;background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd">
  <rect x="5" y="20" width="55" height="32" rx="4" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="32" y="34" text-anchor="middle" font-size="7.5" fill="#1e40af" font-weight="bold">Power</text>
  <text x="32" y="44" text-anchor="middle" font-size="7.5" fill="#1e40af" font-weight="bold">Station</text>
  <line x1="60" y1="36" x2="88" y2="36" stroke="#374151" stroke-width="2"/>
  <rect x="88" y="22" width="46" height="28" rx="4" fill="#c4b5fd" stroke="#7c3aed" stroke-width="1.5"/>
  <text x="111" y="34" text-anchor="middle" font-size="7" fill="#3b0764" font-weight="bold">Step-up</text>
  <text x="111" y="44" text-anchor="middle" font-size="7" fill="#3b0764">transformer</text>
  <line x1="134" y1="36" x2="158" y2="36" stroke="#374151" stroke-width="2"/>
  <text x="146" y="30" font-size="7" fill="#64748b" text-anchor="middle">pylons</text>
  <line x1="158" y1="36" x2="188" y2="36" stroke="#374151" stroke-width="2"/>
  <rect x="188" y="22" width="50" height="28" rx="4" fill="#c4b5fd" stroke="#7c3aed" stroke-width="1.5"/>
  <text x="213" y="34" text-anchor="middle" font-size="7" fill="#3b0764" font-weight="bold">Step-down</text>
  <text x="213" y="44" text-anchor="middle" font-size="7" fill="#3b0764">transformer</text>
  <line x1="238" y1="36" x2="264" y2="36" stroke="#374151" stroke-width="2"/>
  <rect x="264" y="20" width="30" height="32" rx="4" fill="#bbf7d0" stroke="#22c55e" stroke-width="1.5"/>
  <text x="279" y="33" text-anchor="middle" font-size="7" fill="#14532d">&#127968;</text>
  <text x="279" y="45" text-anchor="middle" font-size="6.5" fill="#14532d">Home</text>
  <text x="150" y="64" text-anchor="middle" font-size="6" fill="#64748b">How electricity travels from power station to your home</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-en-001', chapterId:'g6-energy', difficulty:2,
    question:'How does a THERMAL power station generate electricity?',
    options:[
      'It uses solar panels to convert sunlight directly into electricity',
      'It burns fuel to heat water, creating steam that spins turbines connected to generators',
      'It uses the force of falling water to spin turbines',
      'It uses wind to push turbine blades connected to generators'
    ],
    answer:'It burns fuel to heat water, creating steam that spins turbines connected to generators',
    hint:'The word "thermal" means heat - what does heat create?',
    explanation:'In a <b>thermal power station</b>: fossil fuel (coal/oil) is burned → heats water → produces steam → steam spins turbines → turbines drive generators → electricity is produced. This is how most of Mauritius\'s electricity is generated.' }),

  makeMCQ({ id:'g6sci-en-002', chapterId:'g6-energy', difficulty:2,
    question:'How does a HYDROELECTRIC power station generate electricity?',
    options:[
      'It uses hydrogen gas as fuel',
      'It uses flowing or falling water to spin turbines connected to generators',
      'It heats water with solar energy to make steam',
      'It burns wood to produce steam'
    ],
    answer:'It uses flowing or falling water to spin turbines connected to generators',
    hint:'"Hydro" = water. The water must be moving with force.',
    explanation:'In a <b>hydroelectric</b> station, the kinetic energy of flowing or falling water spins turbines that are connected to generators, producing electricity. This method is renewable and produces no greenhouse gases.' }),

  makeMCQ({ id:'g6sci-en-003', chapterId:'g6-energy', difficulty:1,
    question:'What device converts the mechanical energy of spinning turbines into ELECTRICAL energy?',
    options:['Battery','Motor','Transformer','Generator'],
    answer:'Generator',
    hint:'This device is the final step in most power stations before electricity enters the grid.',
    explanation:'A <b>generator</b> converts mechanical (kinetic) energy - from a spinning turbine - into <b>electrical energy</b>. It works using the principle of electromagnetic induction (a coil spinning in a magnetic field).' }),

  makeMCQ({ id:'g6sci-en-004', chapterId:'g6-energy', difficulty:2,
    question:`${_SVG_GRID}Looking at the diagram of the national grid, what does a TRANSFORMER do?`,
    options:[
      'It generates the electricity',
      'It stores electricity for later use',
      'It changes (steps up or steps down) the voltage of electricity',
      'It converts electrical energy into heat'
    ],
    answer:'It changes (steps up or steps down) the voltage of electricity',
    hint:'The diagram shows two types: step-UP and step-DOWN.',
    explanation:'A <b>transformer</b> changes the voltage of electricity. A <b>step-up transformer</b> increases voltage for efficient long-distance transmission through pylons; a <b>step-down transformer</b> reduces it to a safe level for homes and businesses.' }),

  makeTF({ id:'g6sci-en-005', chapterId:'g6-energy', difficulty:1,
    question:'Solar panels convert light energy directly into electrical energy.',
    answer:true,
    hint:'This is called the photovoltaic effect.',
    explanation:'True. <b>Solar panels</b> (photovoltaic cells) convert light energy directly into electrical energy using the photovoltaic effect. No moving parts, no fuel, no emissions - making solar energy clean and renewable.' }),

  makeMCQ({ id:'g6sci-en-006', chapterId:'g6-energy', difficulty:2,
    question:'Which type of power station produces electricity WITHOUT burning fuel or creating air pollution?',
    options:['Coal power station','Oil-fired power station','Wind turbine farm','Natural gas power station'],
    answer:'Wind turbine farm',
    hint:'Wind is a renewable source that costs nothing and produces no emissions.',
    explanation:'<b>Wind turbines</b> convert the kinetic energy of wind into electricity. No fuel is burned, so there are no greenhouse gas emissions or air pollution. Wind, solar and hydroelectric are all clean, renewable energy sources.' }),

  makeMCQ({ id:'g6sci-en-007', chapterId:'g6-energy', difficulty:1,
    question:'Why is it important to SAVE electricity at home?',
    options:[
      'Because electricity is free and there is no reason to save it',
      'Because saving electricity reduces fuel burned at power stations, cutting costs and pollution',
      'Because electricity becomes less bright when you use too much',
      'Because electricity companies ask you to save it as a favour'
    ],
    answer:'Because saving electricity reduces fuel burned at power stations, cutting costs and pollution',
    hint:'Think about how electricity is generated in Mauritius.',
    explanation:'Saving electricity <b>reduces demand</b> at power stations. Since Mauritius generates most electricity by burning fossil fuels, using less electricity means less fuel burned, which reduces CO&#8322; emissions, saves money and preserves fossil fuel resources.' }),

  makeMCQ({ id:'g6sci-en-008', chapterId:'g6-energy', difficulty:1,
    question:'Which of the following is a way to CONSERVE energy at home?',
    options:[
      'Leaving the TV on when nobody is watching',
      'Using energy-saving LED light bulbs instead of old filament bulbs',
      'Running the air conditioner with all windows open',
      'Charging all devices overnight even when fully charged'
    ],
    answer:'Using energy-saving LED light bulbs instead of old filament bulbs',
    hint:'Some bulbs convert most electricity to light; others waste most as heat.',
    explanation:'<b>LED bulbs</b> use up to 80% less electricity than old incandescent (filament) bulbs to produce the same amount of light. They also last much longer, saving money and reducing energy consumption.' }),

  makeTF({ id:'g6sci-en-009', chapterId:'g6-energy', difficulty:1,
    question:'Wind turbines generate electricity by burning wind as a fuel.',
    answer:false,
    hint:'Nothing is burned in a wind turbine.',
    explanation:'Wind turbines generate electricity using the <b>kinetic energy</b> of moving air - the wind spins the blades, which drive a generator. Nothing is burned. Wind is a free, renewable resource with no fuel cost and no emissions.' }),

  makeMCQ({ id:'g6sci-en-010', chapterId:'g6-energy', difficulty:2,
    question:'What is the main DISADVANTAGE of solar panels compared to thermal power stations?',
    options:[
      'Solar panels produce too much electricity',
      'Solar panels only generate electricity when the sun is shining',
      'Solar panels are made of harmful toxic materials',
      'Solar panels are heavier than coal power stations'
    ],
    answer:'Solar panels only generate electricity when the sun is shining',
    hint:'What happens to solar power at night or on cloudy days?',
    explanation:'Solar panels cannot generate electricity at night or during heavy cloud cover. This <b>intermittency</b> (unreliable supply) is a key limitation. Solutions include battery storage systems to store excess power generated during sunny periods.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-en-011', chapterId:'g6-energy', difficulty:1,
    question:'An electric fan converts electrical energy into: (PSAC 2025 Q1c)',
    options:[
      'Chemical energy to electrical energy',
      'Electrical energy to movement (kinetic) energy',
      'Movement energy to electrical energy',
      'Electrical energy to chemical energy'
    ],
    answer:'Electrical energy to movement (kinetic) energy',
    hint:'When you plug in a fan, electricity goes IN - what comes out?',
    explanation:'An electric fan converts <b>electrical energy → movement (kinetic) energy</b>. The electric motor inside uses electricity to spin the fan blades. This is an example of an energy transformation. Other examples: electric kettle (electrical → heat), light bulb (electrical → light + heat), microphone (sound → electrical).' }),

  makeMCQ({ id:'g6sci-en-012', chapterId:'g6-energy', difficulty:2,
    question:'Classify BAGASSE as a source of energy. (PSAC 2025 Q6a)',
    options:[
      'Non-renewable, because it comes from a living plant',
      'Renewable, because it is the fibrous sugarcane waste left after juice extraction',
      'Fossil fuel, because it is found underground',
      'Nuclear energy source'
    ],
    answer:'Renewable, because it is the fibrous sugarcane waste left after juice extraction',
    hint:'Bagasse is produced every year as long as sugarcane is grown.',
    explanation:'<b>Bagasse</b> is the fibrous residue left after sugarcane juice is extracted. It is a <b>renewable</b> energy source because sugarcane regrows each year. In Mauritius, bagasse is burned in sugar mills to generate electricity - a key local energy source. <b>Renewable sources</b>: bagasse, sun, wind, water. <b>Non-renewable</b>: coal, natural gas, petrol (fossil fuels that took millions of years to form and will run out).' }),

  makeMCQ({ id:'g6sci-en-013', chapterId:'g6-energy', difficulty:1,
    question:'What is an INSULATOR in the context of electricity? (PSAC 2025 Q6c)',
    options:[
      'A material that allows electricity to flow through it easily',
      'A material that does not allow electricity to flow through it',
      'A device that stores electrical energy',
      'A wire that carries electricity from a power station'
    ],
    answer:'A material that does not allow electricity to flow through it',
    hint:'The plastic coating on an electric wire is an example.',
    explanation:'An <b>insulator</b> is a material that does <b>not</b> allow electricity to flow through it. The plastic/rubber coating on electric wires is an insulator - it prevents electrocution. Examples of insulators: plastic, rubber, wood, glass, ceramics. <b>Conductors</b> (like copper and aluminium) allow electricity to flow freely and are used for the inner wire.' }),

  makeMCQ({ id:'g6sci-en-014', chapterId:'g6-energy', difficulty:1,
    question:'In an electric wire, the inner part (conductor) is made of which material? (PSAC 2025 Q6c)',
    options:['Plastic','Rubber','Copper (a metal)','Glass'],
    answer:'Copper (a metal)',
    hint:'This metal is reddish-orange and an excellent conductor of electricity.',
    explanation:'The inner conductor of an electric wire is made of <b>copper</b> (or sometimes aluminium). Copper is used because: (1) it is an excellent <b>conductor of electricity</b>; (2) it is <b>flexible</b> (can be bent); (3) it does not corrode easily. The outer plastic or rubber coating is the <b>insulator</b> that prevents electric shocks.' }),

  makeMCQ({ id:'g6sci-en-015', chapterId:'g6-energy', difficulty:2,
    question:'What is the role of the WIRE in a simple electric circuit? (PSAC 2025 Q6d)',
    options:[
      'To store electrical energy for later use',
      'To conduct (carry) electrical current from one component to another',
      'To transform electrical energy into chemical energy',
      'To control the amount of electricity in the circuit'
    ],
    answer:'To conduct (carry) electrical current from one component to another',
    hint:'Think of the wire as the road that electricity travels along.',
    explanation:'The <b>wire</b> in an electric circuit acts as a <b>conductor</b> - it carries the electrical current from the cell (battery) through the components (bulb, switch, etc.) and back. Without a wire completing the circuit, current cannot flow and the circuit is broken. Metal wires (usually copper) are used because metals are good conductors.' }),

  makeMCQ({ id:'g6sci-en-016', chapterId:'g6-energy', difficulty:1,
    question:'What form of energy is stored in a CELL (battery)? (PSAC 2025 Q6d)',
    options:['Electrical energy','Heat energy','Chemical energy','Light energy'],
    answer:'Chemical energy',
    hint:'The cell must undergo a chemical reaction to release the electricity you use.',
    explanation:'A <b>cell (battery)</b> stores <b>chemical energy</b>. When connected in a circuit, chemical reactions inside the cell convert chemical energy → <b>electrical energy</b> that flows through the circuit. When the chemicals are used up, the battery is "dead." Rechargeable batteries reverse this process, converting electrical energy back to chemical energy for storage.' }),

  makeTF({ id:'g6sci-en-017', chapterId:'g6-energy', difficulty:1,
    question:'Coal is a renewable source of energy because it comes from the Earth.',
    answer:false,
    hint:'How long does it take for coal to form - days, or millions of years?',
    explanation:'<b>False.</b> Coal is a <b>non-renewable</b> fossil fuel. It formed from the remains of ancient plants over <b>millions of years</b> under heat and pressure. Once burned, it is gone - it cannot be replenished on a human timescale. Renewable sources (sun, wind, water, bagasse) can be used over and over without running out.' }),

  makeMCQ({ id:'g6sci-en-018', chapterId:'g6-energy', difficulty:2,
    question:'Give ONE safety precaution when using electricity at home. (PSAC 2025 Q6e)',
    options:[
      'Touch electrical sockets with wet hands to test if they work',
      'Pull on the wire (not the plug) when disconnecting appliances',
      'Never insert metal objects into electrical sockets',
      'Leave charger cables plugged in and tangled at all times'
    ],
    answer:'Never insert metal objects into electrical sockets',
    hint:'Electricity + metal conducts straight to your body - very dangerous!',
    explanation:'<b>Never insert metal objects into electrical sockets</b> - this is a critical safety rule. Metal conducts electricity and would cause a severe electric shock. Other important electrical safety rules: (1) never use electrical appliances near water; (2) hold the plug - not the wire - when disconnecting; (3) switch off appliances when not in use; (4) do not overload sockets.' }),

  makeMCQ({ id:'g6sci-en-019', chapterId:'g6-energy', difficulty:3,
    question:'Mauritius generates electricity using TWO main methods. Which pair is correct? (PSAC 2025 Q6b)',
    options:[
      'Nuclear power and hydroelectric',
      'Wind turbines and solar panels only',
      'Burning fossil fuels (thermal) and burning bagasse',
      'Tidal energy and geothermal energy'
    ],
    answer:'Burning fossil fuels (thermal) and burning bagasse',
    hint:'Think about what Mauritius imports (coal/oil) and what it produces locally (sugarcane).',
    explanation:'Mauritius produces electricity mainly by: (1) <b>burning fossil fuels</b> (coal, oil, natural gas) in thermal power stations; (2) burning <b>bagasse</b> (sugarcane waste) in sugar mill power stations. Hydroelectric and solar contribute smaller amounts. Because most electricity comes from burning fuels, saving energy in Mauritius directly reduces fuel imports and CO₂ emissions.' })

);
