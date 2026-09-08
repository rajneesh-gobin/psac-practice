'use strict';
// Grade 6 Science - Chapter: Air (pressure, fire triangle, pollution)
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

  makeMCQ({ id:'g6sci-air-001', chapterId:'g6-air', subsection:'diagrams', difficulty:1,
    question:`${_SVG_FIRE_TRI}The diagram shows the <b>Fire Triangle</b>. What are the three things a fire needs to burn?`,
    options:['Fuel, heat and oxygen','Fuel, water and smoke','Carbon dioxide, heat and fuel','Nitrogen, oxygen and heat'],
    answer:'Fuel, heat and oxygen',
    hint:'Look at the three corners of the triangle.',
    explanation:'A fire needs three things: <b>fuel</b> (something to burn), <b>heat</b> (to reach ignition temperature) and <b>oxygen</b> (from the air). Remove any one and the fire goes out.' }),

  makeMCQ({ id:'g6sci-air-002', chapterId:'g6-air', subsection:'breathing', difficulty:2,
    question:'A fire extinguisher sprays foam over a fire to smother it. Which side of the Fire Triangle does this target?',
    options:['Heat','Oxygen','Fuel','Carbon dioxide'],
    answer:'Oxygen',
    hint:'Smothering means covering - what does the foam cut off from reaching the fire?',
    explanation:'Foam smothers the fire by cutting off the <b>oxygen supply</b>. Without oxygen, the fire cannot continue to burn and is extinguished.' }),

  makeMCQ({ id:'g6sci-air-003', chapterId:'g6-air', subsection:'breathing', difficulty:2,
    question:'Which type of fire extinguisher is safe to use on an electrical fire?',
    options:['Carbon dioxide extinguisher', 'Water extinguisher and hose', 'Foam extinguisher', 'Bucket of sand'],
    answer:'Carbon dioxide extinguisher',
    hint:'Water conducts electricity, making it dangerous near live electrical equipment.',
    explanation:'A <b>CO&#8322; extinguisher</b> displaces oxygen around the fire without leaving a residue and does not conduct electricity, making it safe for electrical fires. Water and foam are dangerous near live electricity.' }),

  makeMCQ({ id:'g6sci-air-004', chapterId:'g6-air', subsection:'wind_pressure', difficulty:1,
    question:'What instrument is used to measure air pressure?',
    options:['Thermometer','Anemometer','Barometer','Hygrometer'],
    answer:'Barometer',
    hint:'The "baro-" prefix comes from the Greek word for weight/pressure.',
    explanation:'A <b>barometer</b> measures atmospheric (air) pressure. Changes in air pressure help meteorologists predict weather - falling pressure often signals rain or storms, rising pressure indicates fair weather.' }),

  makeTF({ id:'g6sci-air-005', chapterId:'g6-air', subsection:'wind_pressure', difficulty:2,
    question:'Air pressure is higher at the top of a mountain than at sea level.',
    answer:false,
    hint:'The higher you go, the less air is above you pressing down.',
    explanation:'Air pressure <b>decreases</b> with altitude. At higher elevations there is less air above, so the column of air pressing down is smaller. This is why it is harder to breathe at the top of a high mountain.' }),

  makeMCQ({ id:'g6sci-air-006', chapterId:'g6-air', subsection:'properties', difficulty:2,
    question:'Which gas is mainly responsible for the greenhouse effect and global warming?',
    options:['Nitrogen','Oxygen','Argon','Carbon dioxide'],
    answer:'Carbon dioxide',
    hint:'Cars and power stations burning fossil fuels produce large amounts of this gas.',
    explanation:'<b>Carbon dioxide (CO&#8322;)</b> is the main greenhouse gas. It traps heat from the sun in the atmosphere, causing the Earth to warm. Burning fossil fuels releases large amounts of CO&#8322; into the air.' }),

  makeMCQ({ id:'g6sci-air-007', chapterId:'g6-air', subsection:'properties', difficulty:2,
    question:'What causes ACID RAIN?',
    options:['Gases from burning fossil fuels', 'Water vapour cooling too fast', 'Carbon dioxide in seawater', 'Too much oxygen in the air'],
    answer:'Gases from burning fossil fuels',
    hint:'Factory smoke and vehicle exhaust contain gases that react with rain.',
    explanation:'When <b>sulphur dioxide (SO&#8322;)</b> and <b>nitrogen oxides (NO&#8339;)</b> from burning coal and petrol dissolve in rainwater, they form sulphuric and nitric acid - producing acid rain, which damages forests, lakes and buildings.' }),

  makeMCQ({ id:'g6sci-air-008', chapterId:'g6-air', subsection:'properties', difficulty:2,
    question:'Why is the ozone layer important?',
    options:['It absorbs harmful UV rays', 'It produces the oxygen we breathe', 'It keeps the air warm at night', 'It stops the rain from falling'],
    answer:'It absorbs harmful UV rays',
    hint:'Think about which part of sunlight causes sunburn, and what would reach us without something to block it.',
    explanation:'The <b>ozone layer</b> in the stratosphere absorbs most of the sun\'s harmful <b>ultraviolet (UV) radiation</b> before it reaches Earth\'s surface. Chemicals such as CFCs (from old refrigerators and aerosols) have damaged the ozone layer.' }),

  makeMCQ({ id:'g6sci-air-009', chapterId:'g6-air', subsection:'breathing', difficulty:1,
    question:'Pouring water on a wood fire puts it out. Which part of the fire triangle does water target?',
    options:['Oxygen','Fuel','Heat','All three at once'],
    answer:'Heat',
    hint:'Water cools the burning material.',
    explanation:'Water reduces the <b>heat</b> (temperature) of the fire. By cooling the burning fuel below its ignition point, the fire can no longer sustain itself and goes out.' }),

  makeTF({ id:'g6sci-air-010', chapterId:'g6-air', subsection:'composition', difficulty:1,
    question:'Carbon dioxide makes up the largest proportion of air.',
    answer:false,
    hint:'Think about what Grade 5 taught you about air composition.',
    explanation:'<b>Nitrogen (~78%)</b> is the most abundant gas in air, followed by oxygen (~21%). Carbon dioxide makes up only about 0.04% of air - a very small amount, but enough to have a significant greenhouse effect.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-air-011', chapterId:'g6-air', subsection:'breathing', difficulty:1,
    question:'Which gas in air is necessary for burning? (PSAC 2025 Q1a)',
    options:['Nitrogen','Oxygen','Carbon dioxide','Water vapour'],
    answer:'Oxygen',
    hint:'Remove this gas and any fire immediately goes out.',
    explanation:'<b>Oxygen</b> is essential for burning. The Grade 6 Science Pupil\'s Book states that burning requires both <b>fuel AND oxygen</b>. When a candle jar is covered, the flame dies because the oxygen inside is used up. Carbon dioxide from fire extinguishers smothers flames by displacing this vital gas.' }),

  makeMCQ({ id:'g6sci-air-012', chapterId:'g6-air', subsection:'composition', difficulty:1,
    question:'What percentage of dry air is nitrogen?',
    options:['21.0%','0.03%','78.1%','0.87%'],
    answer:'78.1%',
    hint:'Nitrogen is by far the most abundant gas in our atmosphere.',
    explanation:'The MIE Grade 6 Science Pupil\'s Book (Table 2) gives the composition of dry air as: <b>Nitrogen 78.1%</b>, Oxygen 21.0%, Carbon dioxide 0.03%, Other gases (argon etc.) 0.87%. Nitrogen makes up nearly four-fifths of the air we breathe, though our bodies cannot use it directly.' }),

  makeMCQ({ id:'g6sci-air-013', chapterId:'g6-air', subsection:'composition', difficulty:2,
    question:'Your body uses oxygen together with food to produce energy. Which THREE things does this energy allow you to do?',
    options:[
      'Keep warm, move your body, and keep organs working',
      'Digest food, grow taller, and see in the dark',
      'Breathe in nitrogen, produce CO₂, and sweat',
      'Sleep, stop breathing, and store fat'
    ],
    answer:'Keep warm, move your body, and keep organs working',
    hint:'Think about what you need energy for every day.',
    explanation:'The Grade 6 Science Pupil\'s Book explains that the body uses <b>oxygen + food → energy</b>. This energy: (1) keeps you <b>warm</b>; (2) allows <b>movement</b>; (3) keeps <b>organs working</b>. Without enough oxygen, body functions slow down - this is why we cannot survive more than a few minutes without breathing.' }),

  makeTF({ id:'g6sci-air-014', chapterId:'g6-air', subsection:'wind_pressure', difficulty:2,
    question:'Drinking juice through a straw works because of a difference in air pressure (PSAC 2025 Q7a).',
    answer:true,
    hint:'When you suck, what happens to the air pressure inside the straw?',
    explanation:'<b>True.</b> When you suck on a straw, you reduce the air pressure inside the straw and your mouth. The higher air pressure outside pushes down on the liquid in the glass, forcing it up the straw and into your mouth. This principle (outside pressure > inside pressure) also explains how a suction cup sticks to a wall.' }),

  makeMCQ({ id:'g6sci-air-015', chapterId:'g6-air', subsection:'properties', difficulty:3,
    question:'A weather forecast says "high pressure is building over the island." What weather does this predict?',
    options:['Fair, dry and clear weather', 'Heavy rain and thunderstorms', 'Cold, damp and foggy weather', 'Very strong and gusty winds'],
    answer:'Fair, dry and clear weather',
    hint:'The Grade 6 textbook states the link between barometer readings and weather type.',
    explanation:'The Grade 6 Science Pupil\'s Book states: <b>high pressure = good weather</b> (clear, dry, calm); <b>low pressure = bad weather</b> (rain, storms, strong winds). Meteorologists use barometers to measure air pressure and predict weather. A rising barometer reading signals improving conditions.' }),

  makeMCQ({ id:'g6sci-air-016', chapterId:'g6-air', subsection:'pollution', difficulty:2,
    question:'How does air pollution harm plants?',
    options:['Soot blocks the pores on their leaves', 'It makes them grow faster than usual', 'It makes them produce more oxygen', 'It harms only animals, not plants'],
    answer:'Soot blocks the pores on their leaves',
    hint:'Leaves breathe through tiny openings - what happens if these get blocked?',
    explanation:'The Grade 6 Science Pupil\'s Book explains that air pollution harms plants because <b>soot blocks the tiny pores (stomata) on leaves</b>. Without open pores, leaves cannot exchange gases (take in CO₂, release O₂) and cannot photosynthesize properly. Heavy pollution can kill plants entirely. Air pollution also puts humans at risk of lung cancer.' }),

  makeMCQ({ id:'g6sci-air-017', chapterId:'g6-air', subsection:'composition', difficulty:3,
    question:'A cockroach is placed in a sealed jar with air. After 30 minutes the oxygen level falls from 21% to about 15%. What PROCESS caused this?',
    options:['Respiration', 'Photosynthesis', 'Condensation', 'Evaporation'],
    answer:'Respiration',
    hint:'The Grade 6 textbook describes this exact experiment to show how animals use up oxygen.',
    explanation:'The Grade 6 Science Pupil\'s Book describes this experiment: a cockroach in a sealed jar uses <b>oxygen for respiration</b> (breaking down food to release energy). O₂ drops from 21% → ~15% in 30 minutes → ~8% after 1 hour. This shows that ALL living things consume oxygen during respiration and release carbon dioxide as a waste product.' }),

  makeMCQ({ id:'g6sci-air-018', chapterId:'g6-air', subsection:'pollution', difficulty:3,
    question:'A factory chimney releases thick smoke beside a school. Which effect is MOST likely?',
    options:['More breathing illness among pupils', 'Rainfall will increase over the town', 'The school garden will grow faster', 'The playground will become cooler'],
    answer:'More breathing illness among pupils',
    hint:'Think about what breathing in smoke and soot does to a person.',
    explanation:'Smoke from a chimney carries <b>soot</b> and gases such as sulphur dioxide. Breathing polluted air irritates the lungs and airways, so people who live or study nearby suffer more coughs, asthma attacks and other <b>respiratory illnesses</b>. Polluted air does not cool a playground, does not make rain fall, and the soot settling on leaves slows plant growth rather than speeding it up.'}),

  makeMCQ({ id:'g6sci-air-019', chapterId:'g6-air', subsection:'wind_pressure', difficulty:4,
    question:'A suction cup is pressed onto a smooth wall and stays there. Why does it hold?',
    options:['Air pressure outside is greater than inside', 'Static electricity holds it in place', 'The rubber produces its own glue', 'There is a perfect vacuum inside'],
    answer:'Air pressure outside is greater than inside',
    hint:'When you press the cup, you squeeze out most of the air. Outside pressure then has nothing equal to push against.',
    explanation:'The Grade 6 Science Pupil\'s Book states air pressure is about <b>10 tonnes (10,000 kg) per m²</b> - an enormous force we don\'t normally notice because it acts equally from all directions. A suction cup works by <b>reducing the pressure inside</b> (squeezing out air). The full atmospheric pressure then acts on the outside of the cup, pressing it firmly against the wall. The cup "holds" because outside pressure > inside pressure.' })

);
