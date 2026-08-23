'use strict';
// Grade 6 Science — Chapter: Air (pressure, fire triangle, pollution)
// IDs format: g6sci-air-NNN

const _SVG_FIRE_TRI = `<svg viewBox="0 0 200 138" width="200" height="138" style="display:block;margin:6px auto;background:#fef2f2;border-radius:8px;border:1px solid #fca5a5">
  <polygon points="100,14 14,128 186,128" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
  <text x="100" y="72" text-anchor="middle" font-size="13" fill="#dc2626" font-weight="bold">FIRE</text>
  <text x="100" y="86" text-anchor="middle" font-size="6.5" fill="#b91c1c">Remove any one side</text>
  <text x="100" y="95" text-anchor="middle" font-size="6.5" fill="#b91c1c">to extinguish the fire</text>
  <text x="100" y="10" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="bold">HEAT</text>
  <text x="8" y="137" font-size="9" fill="#16a34a" font-weight="bold">FUEL</text>
  <text x="155" y="137" font-size="9" fill="#2563eb" font-weight="bold">OXYGEN</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-air-001', chapterId:'g6-air', difficulty:1,
    question:`${_SVG_FIRE_TRI}The diagram shows the <b>Fire Triangle</b>. What are the three things a fire needs to burn?`,
    options:['Fuel, heat and oxygen','Fuel, water and smoke','Carbon dioxide, heat and fuel','Nitrogen, oxygen and heat'],
    answer:'Fuel, heat and oxygen',
    hint:'Look at the three corners of the triangle.',
    explanation:'A fire needs three things: <b>fuel</b> (something to burn), <b>heat</b> (to reach ignition temperature) and <b>oxygen</b> (from the air). Remove any one and the fire goes out.' }),

  makeMCQ({ id:'g6sci-air-002', chapterId:'g6-air', difficulty:2,
    question:'A fire extinguisher sprays foam over a fire to smother it. Which side of the Fire Triangle does this target?',
    options:['Heat','Oxygen','Fuel','Carbon dioxide'],
    answer:'Oxygen',
    hint:'Smothering means covering — what does the foam cut off from reaching the fire?',
    explanation:'Foam smothers the fire by cutting off the <b>oxygen supply</b>. Without oxygen, the fire cannot continue to burn and is extinguished.' }),

  makeMCQ({ id:'g6sci-air-003', chapterId:'g6-air', difficulty:2,
    question:'Which type of fire extinguisher is safe to use on an electrical fire?',
    options:['Water extinguisher','Foam extinguisher','CO&#8322; (carbon dioxide) extinguisher','Sand bucket'],
    answer:'CO&#8322; (carbon dioxide) extinguisher',
    hint:'Water conducts electricity, making it dangerous near live electrical equipment.',
    explanation:'A <b>CO&#8322; extinguisher</b> displaces oxygen around the fire without leaving a residue and does not conduct electricity, making it safe for electrical fires. Water and foam are dangerous near live electricity.' }),

  makeMCQ({ id:'g6sci-air-004', chapterId:'g6-air', difficulty:1,
    question:'What instrument is used to measure air pressure?',
    options:['Thermometer','Anemometer','Barometer','Hygrometer'],
    answer:'Barometer',
    hint:'The "baro-" prefix comes from the Greek word for weight/pressure.',
    explanation:'A <b>barometer</b> measures atmospheric (air) pressure. Changes in air pressure help meteorologists predict weather — falling pressure often signals rain or storms, rising pressure indicates fair weather.' }),

  makeTF({ id:'g6sci-air-005', chapterId:'g6-air', difficulty:2,
    question:'Air pressure is higher at the top of a mountain than at sea level.',
    answer:false,
    hint:'The higher you go, the less air is above you pressing down.',
    explanation:'Air pressure <b>decreases</b> with altitude. At higher elevations there is less air above, so the column of air pressing down is smaller. This is why it is harder to breathe at the top of a high mountain.' }),

  makeMCQ({ id:'g6sci-air-006', chapterId:'g6-air', difficulty:2,
    question:'Which gas is mainly responsible for the greenhouse effect and global warming?',
    options:['Nitrogen','Oxygen','Argon','Carbon dioxide'],
    answer:'Carbon dioxide',
    hint:'Cars and power stations burning fossil fuels produce large amounts of this gas.',
    explanation:'<b>Carbon dioxide (CO&#8322;)</b> is the main greenhouse gas. It traps heat from the sun in the atmosphere, causing the Earth to warm. Burning fossil fuels releases large amounts of CO&#8322; into the air.' }),

  makeMCQ({ id:'g6sci-air-007', chapterId:'g6-air', difficulty:2,
    question:'What is ACID RAIN caused by?',
    options:[
      'Too much oxygen in the air',
      'Sulphur dioxide and nitrogen oxides from burning fossil fuels dissolving in rainwater',
      'Water vapour cooling too quickly in the clouds',
      'Carbon dioxide mixing with seawater'
    ],
    answer:'Sulphur dioxide and nitrogen oxides from burning fossil fuels dissolving in rainwater',
    hint:'Factory smoke and vehicle exhaust contain gases that react with rain.',
    explanation:'When <b>sulphur dioxide (SO&#8322;)</b> and <b>nitrogen oxides (NO&#8339;)</b> from burning coal and petrol dissolve in rainwater, they form sulphuric and nitric acid — producing acid rain, which damages forests, lakes and buildings.' }),

  makeMCQ({ id:'g6sci-air-008', chapterId:'g6-air', difficulty:2,
    question:'The ozone layer in the atmosphere is important because it:',
    options:[
      'Produces oxygen for us to breathe',
      'Stops rain from falling',
      'Absorbs harmful ultraviolet (UV) radiation from the sun',
      'Keeps our atmosphere warm at night'
    ],
    answer:'Absorbs harmful ultraviolet (UV) radiation from the sun',
    hint:'UV radiation from the sun can cause skin cancer and other damage.',
    explanation:'The <b>ozone layer</b> in the stratosphere absorbs most of the sun\'s harmful <b>ultraviolet (UV) radiation</b> before it reaches Earth\'s surface. Chemicals such as CFCs (from old refrigerators and aerosols) have damaged the ozone layer.' }),

  makeMCQ({ id:'g6sci-air-009', chapterId:'g6-air', difficulty:1,
    question:'Pouring water on a wood fire puts it out. Which part of the fire triangle does water target?',
    options:['Oxygen','Fuel','Heat','All three at once'],
    answer:'Heat',
    hint:'Water cools the burning material.',
    explanation:'Water reduces the <b>heat</b> (temperature) of the fire. By cooling the burning fuel below its ignition point, the fire can no longer sustain itself and goes out.' }),

  makeTF({ id:'g6sci-air-010', chapterId:'g6-air', difficulty:1,
    question:'Carbon dioxide makes up the largest proportion of air.',
    answer:false,
    hint:'Think about what Grade 5 taught you about air composition.',
    explanation:'<b>Nitrogen (~78%)</b> is the most abundant gas in air, followed by oxygen (~21%). Carbon dioxide makes up only about 0.04% of air — a very small amount, but enough to have a significant greenhouse effect.' })

);
