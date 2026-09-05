'use strict';
// Grade 5 Science - Enrichment: Energy Sources in Pictures
// Photo identification of energy sources: renewable vs non-renewable.
// @enrichment — Derived from the Energy Sources chapter.
// IDs format: g5sci-enr-ene-NNN

STATIC_QUESTIONS.push(

  /* ── PHOTO IDENTIFICATION (questions 001–005) ─────────────────────────── */

  makeMCQ({ id:'g5sci-enr-ene-001', chapterId:'g5sci-enr-energy', subsection:'photos', difficulty:1,
    question:'<img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Solar_Panels.jpg" alt="Rows of blue solar panels in a sunny field" style="max-width:320px;border-radius:8px;display:block;margin:0 auto 10px"><br>What type of energy source is shown in this photograph?',
    options:['Solar (photovoltaic) panels','Wind turbines','Hydroelectric generators','Coal-fired boilers'],
    answer:'Solar (photovoltaic) panels',
    hint:'These devices capture energy directly from sunlight.',
    explanation:'The photograph shows <b>solar panels</b> (also called <b>photovoltaic panels</b>). They convert <b>light energy</b> from the sun directly into <b>electrical energy</b>. Solar energy is <b>renewable</b> — it will not run out as long as the sun shines — and it produces no air pollution during operation.' }),

  makeMCQ({ id:'g5sci-enr-ene-002', chapterId:'g5sci-enr-energy', subsection:'photos', difficulty:1,
    question:'<img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Wind_turbines_%288426360101%29.jpg" alt="Several tall white turbines with spinning blades in an open landscape" style="max-width:320px;border-radius:8px;display:block;margin:0 auto 10px"><br>Is the energy source shown in this photograph renewable or non-renewable?',
    options:['Renewable — wind will not run out','Non-renewable — wind is produced by burning fuel','Non-renewable — turbines use electricity to spin','Renewable — turbines run on solar power'],
    answer:'Renewable — wind will not run out',
    hint:'Think about where wind comes from and whether that source can be exhausted.',
    explanation:'The photograph shows <b>wind turbines</b>, which convert <b>kinetic (movement) energy</b> of the wind into <b>electrical energy</b>. Wind is <b>renewable</b> because it is caused by the uneven heating of the Earth\'s surface by the sun — and as long as the sun shines, there will be wind. No fuel is burned, so there is no air pollution from wind turbines.' }),

  makeMCQ({ id:'g5sci-enr-ene-003', chapterId:'g5sci-enr-energy', subsection:'photos', difficulty:2,
    question:'<img src="https://upload.wikimedia.org/wikipedia/commons/8/81/Hydroelectric_dam.png" alt="Diagram of a hydroelectric dam showing water flow and generators" style="max-width:320px;border-radius:8px;display:block;margin:0 auto 10px"><br>This diagram shows a hydroelectric dam. What energy transformation takes place in this system?',
    options:[
      'Potential energy (stored water) → Kinetic energy (flowing water) → Electrical energy',
      'Solar energy → Heat energy → Electrical energy',
      'Chemical energy (fuel) → Heat energy → Kinetic energy',
      'Wind energy → Kinetic energy → Electrical energy'
    ],
    answer:'Potential energy (stored water) → Kinetic energy (flowing water) → Electrical energy',
    hint:'The water is held high up (stored energy), then flows down and spins turbines.',
    explanation:'In a <b>hydroelectric dam</b>: (1) Water stored at height has <b>potential energy</b>; (2) When released, gravity pulls the water downhill — potential energy converts to <b>kinetic (movement) energy</b>; (3) The fast-moving water spins turbines connected to generators, producing <b>electrical energy</b>. Water power is <b>renewable</b> — it depends on the water cycle, which is powered by the sun.' }),

  makeMCQ({ id:'g5sci-enr-ene-004', chapterId:'g5sci-enr-energy', subsection:'photos', difficulty:1,
    question:'<img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Thermal_Power_Station.JPG" alt="A large industrial power station with cooling towers emitting steam" style="max-width:320px;border-radius:8px;display:block;margin:0 auto 10px"><br>This type of power station burns coal or oil to produce electricity. Is this a renewable or non-renewable energy source?',
    options:[
      'Non-renewable — coal and oil are fossil fuels that will eventually run out',
      'Renewable — the station can always burn more coal',
      'Renewable — the steam released is collected and reused',
      'Non-renewable — but only because of the large cooling towers'
    ],
    answer:'Non-renewable — coal and oil are fossil fuels that will eventually run out',
    hint:'Think about how long coal and oil take to form and whether they can be replaced quickly.',
    explanation:'This is a <b>thermal power station</b> that burns <b>fossil fuels</b> (coal, oil or gas). Fossil fuels are <b>non-renewable</b> — they were formed from the remains of ancient plants and animals over <b>millions of years</b> and cannot be replaced once used. Burning them also releases <b>carbon dioxide</b> and other pollutants into the atmosphere, contributing to climate change.' }),

  makeMCQ({ id:'g5sci-enr-ene-005', chapterId:'g5sci-enr-energy', subsection:'photos', difficulty:2,
    question:'<img src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Photovoltaic_Panels.JPG" alt="Close-up view of photovoltaic solar panels" style="max-width:320px;border-radius:8px;display:block;margin:0 auto 10px"><br>These solar panels convert sunlight into electricity. What is the CORRECT energy transformation?',
    options:[
      'Light energy → Electrical energy',
      'Heat energy → Chemical energy',
      'Kinetic energy → Light energy',
      'Electrical energy → Light energy'
    ],
    answer:'Light energy → Electrical energy',
    hint:'Solar panels use light — what do they produce?',
    explanation:'<b>Photovoltaic (PV) solar panels</b> convert <b>light energy</b> (from the sun) directly into <b>electrical energy</b> using special materials called semiconductors (usually silicon). This is why they only work in daylight. They produce no greenhouse gases during operation, making them an environmentally friendly source of electricity.' }),

  /* ── TEXT-BASED MCQs (questions 006–019) ─────────────────────────────── */

  makeMCQ({ id:'g5sci-enr-ene-006', chapterId:'g5sci-enr-energy', subsection:'renewable', difficulty:1,
    question:'Which of the following is a fossil fuel formed from ancient plant matter compressed over millions of years?',
    options:['Coal','Wind energy','Solar energy','Water (hydropower)'],
    answer:'Coal',
    hint:'Fossil fuels come from the remains of living things buried long ago.',
    explanation:'<b>Coal</b> is a <b>fossil fuel</b> formed from ancient plant remains compressed underground over millions of years. It is non-renewable — once burned, it cannot be replaced quickly. Wind, solar and water energy are all renewable because they are continuously replenished by nature.' }),

  makeMCQ({ id:'g5sci-enr-ene-007', chapterId:'g5sci-enr-energy', subsection:'renewable', difficulty:2,
    question:'Why are fossil fuels (coal, oil and gas) described as NON-RENEWABLE?',
    options:[
      'They formed from ancient living things over millions of years and cannot be replaced once used up',
      'They are found only underground and are difficult to mine',
      'They produce electricity only when there is sunshine',
      'They can only be used once before they need to be recharged'
    ],
    answer:'They formed from ancient living things over millions of years and cannot be replaced once used up',
    hint:'Think about how long it took for these fuels to form naturally.',
    explanation:'<b>Fossil fuels</b> formed from the remains of plants and animals that lived <b>hundreds of millions of years ago</b>. Heat and pressure underground slowly turned them into coal, oil and gas. This process takes far too long to happen on a human timescale — so once we burn them, they are gone. This makes them <b>non-renewable</b>.' }),

  makeMCQ({ id:'g5sci-enr-ene-008', chapterId:'g5sci-enr-energy', subsection:'renewable', difficulty:2,
    question:'Give TWO environmental advantages of using renewable energy sources (such as wind and solar) instead of fossil fuels.',
    options:[
      'They produce no air pollution AND they will never run out',
      'They are cheaper to build AND they work better at night',
      'They produce more electricity AND they require no maintenance',
      'They are stored underground AND they release harmless gas only'
    ],
    answer:'They produce no air pollution AND they will never run out',
    hint:'Think about emissions and sustainability.',
    explanation:'Two key environmental advantages of renewable energy: (1) <b>No air pollution</b> — solar and wind energy produce no smoke, carbon dioxide or other harmful gases during operation, unlike burning fossil fuels; (2) <b>Inexhaustible supply</b> — the sun and wind are naturally and continuously replenished, so they will never run out, ensuring a sustainable long-term energy supply.' }),

  makeMCQ({ id:'g5sci-enr-ene-009', chapterId:'g5sci-enr-energy', subsection:'sources', difficulty:1,
    question:'What happens to chemical energy stored in petrol when it is burned in a car engine?',
    options:[
      'It is converted into kinetic (movement) energy and heat energy',
      'It is converted into light energy and sound energy only',
      'It is converted back into solar energy',
      'It is stored in the car\'s battery for later use'
    ],
    answer:'It is converted into kinetic (movement) energy and heat energy',
    hint:'Burning fuel in an engine makes the car move — what type of energy is movement?',
    explanation:'When petrol burns in a car engine, <b>chemical energy</b> (stored in the petrol) is converted into: (1) <b>Kinetic energy</b> — the movement of the car; (2) <b>Heat energy</b> — engines get hot as a by-product. Some sound energy is also released. This is why fossil fuel vehicles both move and produce exhaust heat.' }),

  makeMCQ({ id:'g5sci-enr-ene-010', chapterId:'g5sci-enr-energy', subsection:'sources', difficulty:2,
    question:'A school installs solar panels on its roof. During the day, the panels produce more electricity than the school uses, so the extra is stored in batteries. At night, the batteries power the school\'s lights. What is the complete energy chain?',
    options:[
      'Light energy → Electrical energy → Chemical energy (in battery) → Electrical energy → Light energy',
      'Heat energy → Chemical energy → Electrical energy → Sound energy',
      'Kinetic energy → Light energy → Heat energy → Electrical energy',
      'Chemical energy → Kinetic energy → Light energy → Sound energy'
    ],
    answer:'Light energy → Electrical energy → Chemical energy (in battery) → Electrical energy → Light energy',
    hint:'Trace from the sun during the day to the school lights at night, step by step.',
    explanation:'The complete energy chain is: <b>Light energy</b> (sunlight) → solar panels convert it to <b>Electrical energy</b> → stored as <b>Chemical energy</b> in the battery → at night, the battery releases <b>Electrical energy</b> → the bulbs produce <b>Light energy</b> again. This shows how energy changes form (transforms) multiple times but is never created or destroyed.' }),

  makeMCQ({ id:'g5sci-enr-ene-011', chapterId:'g5sci-enr-energy', subsection:'sources', difficulty:2,
    question:'Which energy source uses the movement of water in rivers or from dams to produce electricity?',
    options:['Hydroelectric (water) power','Geothermal energy','Nuclear energy','Tidal energy from waves'],
    answer:'Hydroelectric (water) power',
    hint:'Hydro- means water.',
    explanation:'<b>Hydroelectric power</b> (hydro = water) uses the kinetic energy of flowing or falling water to spin turbines and generate electricity. It is a <b>renewable</b> energy source because water is continuously recycled through the water cycle (powered by the sun). Large hydroelectric dams are one of the world\'s biggest sources of renewable electricity.' }),

  makeMCQ({ id:'g5sci-enr-ene-012', chapterId:'g5sci-enr-energy', subsection:'renewable', difficulty:3,
    question:'Mauritius aims to generate 35% of its electricity from renewable sources by 2025. Which combination of renewable sources is MOST SUITABLE for a small tropical island?',
    options:[
      'Solar energy and wind energy, which are abundant on a sunny, breezy island',
      'Large coal mines and hydroelectric dams on major rivers',
      'Nuclear power stations and natural gas pipelines',
      'Tidal turbines using ocean temperature differences and coal'
    ],
    answer:'Solar energy and wind energy, which are abundant on a sunny, breezy island',
    hint:'Think about what Mauritius has plenty of — what natural conditions does a tropical island enjoy?',
    explanation:'Mauritius has <b>abundant sunshine</b> throughout the year and <b>consistent trade winds</b>, making <b>solar panels</b> and <b>wind turbines</b> the most practical renewable energy sources. The island is also too small for large hydroelectric dams. Mauritius already has wind farms (at Plaine Sophie and others) and is rapidly expanding its solar capacity as part of its national energy strategy.' }),

  makeMCQ({ id:'g5sci-enr-ene-013', chapterId:'g5sci-enr-energy', subsection:'sources', difficulty:2,
    question:'When wood is burned on a fire, what energy transformation takes place?',
    options:[
      'Chemical energy (in wood) → Heat energy and Light energy',
      'Kinetic energy → Chemical energy → Heat energy',
      'Electrical energy → Heat energy and Sound energy',
      'Solar energy → Chemical energy → Kinetic energy'
    ],
    answer:'Chemical energy (in wood) → Heat energy and Light energy',
    hint:'Wood stores energy — what type? A fire produces two visible forms of energy.',
    explanation:'Wood stores <b>chemical energy</b> (originally captured from sunlight by the tree during photosynthesis). When burned, this chemical energy is released as: (1) <b>Heat energy</b> — felt as warmth from the fire; (2) <b>Light energy</b> — visible as the flame. Wood is considered a <b>biomass</b> energy source; it is renewable as long as trees are replanted, but burning it does release carbon dioxide.' }),

  makeMCQ({ id:'g5sci-enr-ene-014', chapterId:'g5sci-enr-energy', subsection:'sources', difficulty:1,
    question:'Which of the following actions SAVES the most energy at home?',
    options:[
      'Switching off lights, fans and electrical devices when not in use',
      'Leaving the television on for background noise all day',
      'Running the air conditioner with windows open',
      'Charging a phone even when the battery is already full'
    ],
    answer:'Switching off lights, fans and electrical devices when not in use',
    hint:'Saving energy means not wasting it when it is not needed.',
    explanation:'<b>Switching off devices when not in use</b> is the simplest and most effective way to save energy at home. Every light left on unnecessarily or device left on standby wastes electrical energy that was generated (often by burning fossil fuels). Conserving energy reduces electricity bills and helps protect the environment.' }),

  makeMCQ({ id:'g5sci-enr-ene-015', chapterId:'g5sci-enr-energy', subsection:'sources', difficulty:3,
    question:'A country burns coal to produce electricity. Scientists say this causes "acid rain" that damages forests and lakes. What is the CAUSE of acid rain from coal burning?',
    options:[
      'Coal burning releases sulfur dioxide and nitrogen oxides that combine with rainwater to form acids',
      'Coal burning makes rainwater too warm, turning it acidic',
      'The smoke from coal settles on leaves and makes water more alkaline',
      'Coal ash blows into clouds and removes the oxygen from raindrops'
    ],
    answer:'Coal burning releases sulfur dioxide and nitrogen oxides that combine with rainwater to form acids',
    hint:'Think about the chemical gases released when coal is burned.',
    explanation:'When coal burns, it releases <b>sulfur dioxide (SO₂)</b> and <b>nitrogen oxides (NOₓ)</b> into the atmosphere. These gases dissolve in water vapour in clouds, forming <b>sulfuric acid</b> and <b>nitric acid</b>. When it rains, this acidic water falls as <b>acid rain</b>, which damages forests, lakes and buildings. This is one of the major environmental disadvantages of burning fossil fuels.' }),

  makeMCQ({ id:'g5sci-enr-ene-016', chapterId:'g5sci-enr-energy', subsection:'sources', difficulty:3,
    question:'A scientist compares two power stations: one burns coal, one uses solar panels. The solar station costs more to build but produces no fuel costs or pollution. After 15 years, which is the better choice for a country, and why?',
    options:[
      'Solar, because over 15 years it saves on fuel costs and avoids pollution costs, making it cheaper and cleaner overall',
      'Coal, because it is always cheaper than solar and produces more power',
      'Solar, because it requires more workers to operate, creating more jobs in every case',
      'Coal, because 15 years is not long enough to see any benefit from solar panels'
    ],
    answer:'Solar, because over 15 years it saves on fuel costs and avoids pollution costs, making it cheaper and cleaner overall',
    hint:'Consider the TOTAL cost over time: building cost + running costs + environmental costs.',
    explanation:'Although solar stations cost more to build, they have <b>zero fuel costs</b> (sunlight is free) and <b>no pollution costs</b> (no acid rain, no CO₂ damage). Over 15+ years, the <b>total cost of solar becomes lower</b> than coal when fuel and environmental damage costs are included. This is why many countries are switching from fossil fuels to renewables — the long-term economic and environmental case is strong.' }),

  makeMCQ({ id:'g5sci-enr-ene-017', chapterId:'g5sci-enr-energy', subsection:'sources', difficulty:4,
    question:'Trace the original source of energy for ALL of the following: a burning candle, a turning wind turbine, flowing river water, and a growing plant. What do they ALL have in common?',
    options:[
      'The Sun — all these energy forms can be traced back to solar energy',
      'The Earth\'s core — geothermal energy drives all natural processes',
      'Chemical energy stored in the atmosphere since Earth formed',
      'Gravity — all energy on Earth ultimately comes from gravitational pull'
    ],
    answer:'The Sun — all these energy forms can be traced back to solar energy',
    hint:'Work backwards through each energy chain to find the original source.',
    explanation:'All four trace back to the <b>Sun</b>: (1) A burning <b>candle</b> uses wax from petroleum (fossil fuel formed from ancient organisms that captured solar energy); (2) A <b>wind turbine</b> — wind is caused by the sun heating the atmosphere unevenly; (3) A <b>river</b> — water evaporated by the sun, fell as rain, and flows downhill; (4) A growing <b>plant</b> — photosynthesis converts sunlight into chemical energy. The sun is the <b>ultimate source of almost all energy on Earth</b>, with the exception of nuclear and geothermal energy.' })

);
