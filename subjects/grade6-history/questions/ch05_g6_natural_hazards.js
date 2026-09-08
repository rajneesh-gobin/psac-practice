'use strict';
// Grade 6 History & Geography - Chapter: Natural Hazards (Cyclones & Floods)
// IDs format: g6hg-nh-NNN

const _SVG_CYCLONE = `<svg viewBox="0 0 180 180" width="180" height="180" style="display:block;margin:6px auto;background:#0c4a6e;border-radius:50%;border:2px solid #0284c7">
  <circle cx="90" cy="90" r="80" fill="none" stroke="#93c5fd" stroke-width="14" opacity="0.3"/>
  <circle cx="90" cy="90" r="60" fill="none" stroke="#60a5fa" stroke-width="11" opacity="0.45"/>
  <circle cx="90" cy="90" r="42" fill="none" stroke="#3b82f6" stroke-width="9" opacity="0.6"/>
  <circle cx="90" cy="90" r="26" fill="none" stroke="#1d4ed8" stroke-width="6" opacity="0.75"/>
  <circle cx="90" cy="90" r="16" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
  <text x="90" y="87" text-anchor="middle" font-size="7.5" fill="#0c4a6e" font-weight="bold">EYE</text>
  <text x="90" y="97" text-anchor="middle" font-size="6" fill="#0369a1">calm</text>
  <text x="90" y="170" text-anchor="middle" font-size="7" fill="#93c5fd">Top view of a cyclone - winds rotate</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6hg-nh-001', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:1,
    question:'What is a TROPICAL CYCLONE?',
    options:['A rotating storm with very strong winds', 'A cold wind blowing from Antarctica', 'A tidal wave caused by an earthquake', 'A brief but very heavy thunderstorm'],
    answer:'A rotating storm with very strong winds',
    hint:'Cyclones are also called hurricanes (Atlantic) or typhoons (Pacific).',
    explanation:'A <b>tropical cyclone</b> is a powerful, rotating weather system with very strong winds (over 120 km/h), heavy rain and storm surge, which forms over warm tropical ocean water. In the southern Indian Ocean, these storms threaten Mauritius and Rodrigues.' }),

  makeMCQ({ id:'g6hg-nh-002', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:1,
    question:`${_SVG_CYCLONE}The diagram shows a top-down view of a cyclone. What is the calm centre called?`,
    options:['The core','The funnel','The eye','The hub'],
    answer:'The eye',
    hint:'It is the circular calm area at the very centre of the storm.',
    explanation:'The <b>eye</b> is the calm, relatively clear centre of a cyclone. The most violent winds and rain are found in the "eye wall" - the ring of thunderstorms surrounding the eye. Directly in the eye, conditions are surprisingly calm.' }),

  makeMCQ({ id:'g6hg-nh-003', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:1,
    question:'During which months is Mauritius most at risk from tropical cyclones?',
    options:['May to October','July to December','November to April','January only'],
    answer:'November to April',
    hint:'The cyclone season coincides with the southern hemisphere summer.',
    explanation:'The <b>cyclone season</b> in the southern Indian Ocean runs from <b>November to April</b>. During these months, the sea surface temperature is warm enough (above 26°C) to fuel tropical cyclones. Most severe cyclones affecting Mauritius have occurred between December and March.' }),

  makeMCQ({ id:'g6hg-nh-004', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:2,
    question:'What does cyclone warning Class 4 mean?',
    options:['A dangerous cyclone is imminent', 'Moderate winds - schools close', 'The cyclone has passed safely', 'A minor storm needing no action'],
    answer:'A dangerous cyclone is imminent',
    hint:'The higher the class number, the more dangerous the situation.',
    explanation:'In Mauritius\'s cyclone warning system: <b>Class 1</b> = cyclone within 150 km; <b>Class 2</b> = winds over 90 km/h expected; <b>Class 3</b> = violent winds soon, seek shelter; <b>Class 4</b> = extremely dangerous conditions, stay indoors, the cyclone is over or passing directly.' }),

  makeMCQ({ id:'g6hg-nh-005', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:2,
    question:'What is a STORM SURGE?',
    options:['A rise in sea level caused by cyclone winds', 'A sudden drop in temperature in a cyclone', 'A lightning storm that comes with cyclones', 'A heavy rainfall that only falls at sea'],
    answer:'A rise in sea level caused by cyclone winds',
    hint:'The cyclone\'s winds push seawater towards the coast.',
    explanation:'A <b>storm surge</b> is when a cyclone\'s strong winds push seawater towards the coast, raising the sea level by several metres. This can <b>flood low-lying coastal areas</b> - often causing more deaths and damage than the wind itself.' }),

  makeTF({ id:'g6hg-nh-006', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:1,
    question:'Climate change is expected to make tropical cyclones more intense and more destructive.',
    answer:true,
    hint:'Warmer seas provide more energy to fuel storms.',
    explanation:'True. As global temperatures rise, sea surface temperatures increase, providing <b>more energy for cyclones</b>. Scientific evidence suggests that although the total number of cyclones may not increase, the proportion reaching the most intense categories is likely to rise.' }),

  makeMCQ({ id:'g6hg-nh-007', chapterId:'g6-natural-hazards', subsection:'floods', difficulty:2,
    question:'What causes FLOODING in Mauritius after heavy rain?',
    options:['Blocked drains and deforested slopes', 'Earthquakes raising the sea floor', 'Too much sunshine over the ocean', 'Cold winds pushing the sea inland'],
    answer:'Blocked drains and deforested slopes',
    hint:'Think about what happens to rainwater when there are no trees and drains are blocked.',
    explanation:'Flooding occurs when <b>rivers overflow</b> during intense rainfall, <b>drainage systems are blocked</b> (by rubbish), and <b>deforested slopes</b> cannot absorb water (tree roots help soak up rainfall). Urbanisation on flood plains also increases flood risk.' }),

  makeMCQ({ id:'g6hg-nh-008', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:1,
    question:'Which service warns Mauritius about cyclones?',
    options:['The Meteorological Services', 'The National Coast Guard', 'The Ministry of Education', 'The Ministry of Tourism'],
    answer:'The Meteorological Services',
    hint:'This organisation monitors weather, issues warnings and manages weather forecasting.',
    explanation:'The <b>Mauritius Meteorological Services (MMS)</b> monitors tropical storms using satellite data and weather instruments. It issues cyclone warnings (Classes 1–4), rainfall warnings and weather forecasts to help the population prepare for natural hazards.' }),

  makeMCQ({ id:'g6hg-nh-009', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:2,
    question:'What should a family do BEFORE a cyclone arrives?',
    options:['Stock food, water and medicines', 'Open all the windows of the house', 'Go to the beach to watch the waves', 'Wait until Class 3 before acting'],
    answer:'Stock food, water and medicines',
    hint:'Preparation must happen before the storm arrives, not during it.',
    explanation:'Before a cyclone: <b>stock food, water and medicines</b> (in case of power cuts); <b>secure or bring in loose objects</b> (garden furniture, pots - they become dangerous projectiles in high winds); <b>close and reinforce shutters</b>; follow official MMS updates.' }),

  makeTF({ id:'g6hg-nh-010', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:1,
    question:'Rodrigues Island is also at risk from tropical cyclones.',
    answer:true,
    hint:'Rodrigues is part of the Republic of Mauritius and is in the southern Indian Ocean.',
    explanation:'True. <b>Rodrigues Island</b>, located about 560 km east of Mauritius, is also in the cyclone belt of the southern Indian Ocean and faces similar - sometimes more severe - cyclone risk due to its more exposed position.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6hg-nh-011', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:1,
    question:'How does a tropical cyclone form?',
    options:['Warm moist air rises over the sea', 'Cold Antarctic air meets warm air', 'Tectonic plates shake the sea bed', 'A volcano erupts under the ocean'],
    answer:'Warm moist air rises over the sea',
    hint:'PSAC 2025 confirmed that cyclones are NOT caused by the Earth shaking.',
    explanation:'Cyclones form when <b>warm ocean water</b> (above 26°C) heats the air above it. This warm, moist air rises rapidly, cools, and condenses - releasing enormous energy. As more warm air rushes in to replace the rising air, the Earth\'s rotation (Coriolis effect) causes the whole system to <b>spin</b>. Cyclones are NOT caused by earthquakes. (PSAC 2025 Part B: "Cyclones are caused by violent shaking of the earth" - FALSE.)' }),

  makeMCQ({ id:'g6hg-nh-012', chapterId:'g6-natural-hazards', subsection:'volcanoes', difficulty:2,
    question:'What is a VOLCANO?',
    options:['An opening that lets out lava and ash', 'A tall mountain covered in snow', 'A lake formed in a meteor crater', 'An underground river of hot water'],
    answer:'An opening that lets out lava and ash',
    hint:'The Grade 6 textbook includes a labelled diagram of a volcano.',
    explanation:'A <b>volcano</b> is an opening (vent) in the Earth\'s crust where <b>magma</b> (molten rock underground) forces its way to the surface. Once at the surface, it is called <b>lava</b>. Volcanic eruptions also release gases, dust and ash. The Grade 6 textbook labels volcano parts including: crater, volcanic cone, pipe, magma chamber, lava flow, volcanic bombs and dust/gas.' }),

  makeMCQ({ id:'g6hg-nh-013', chapterId:'g6-natural-hazards', subsection:'volcanoes', difficulty:2,
    question:'What is a DORMANT VOLCANO? (PSAC 2025 Q4d)',
    options:[
      'A volcano that is currently erupting violently',
      'A volcano that has become completely extinct with no possibility of future eruption',
      'A volcano that is not currently erupting but could erupt again in the future',
      'A small volcano found only underwater'
    ],
    answer:'A volcano that is not currently erupting but could erupt again in the future',
    hint:'"Dormant" means sleeping - it could wake up!',
    explanation:'A <b>dormant volcano</b> is one that is not currently active but has the potential to erupt again. In Mauritius, several features are <b>dormant volcanoes</b>: Trou aux Cerfs (Curepipe), Kanaka Crater, Bassin Blanc, and Grand Bassin. Piton de la Fournaise on neighbouring <b>Réunion Island</b> is one of the world\'s most <b>active</b> volcanoes.' }),

  makeMCQ({ id:'g6hg-nh-014', chapterId:'g6-natural-hazards', subsection:'volcanoes', difficulty:1,
    question:'PITON DE LA FOURNAISE is an active volcano. On which island is it located? (PSAC 2025 Q4b)',
    options:['Mauritius','Rodrigues','Réunion Island','Madagascar'],
    answer:'Réunion Island',
    hint:'This island is a French territory very close to Mauritius.',
    explanation:'<b>Piton de la Fournaise</b> ("Peak of the Furnace") is one of the world\'s most active volcanoes, located on <b>Réunion Island</b> - a French overseas territory about 200 km west of Mauritius. It erupts several times a year. Mauritius itself has no active volcanoes - it is geologically older and its volcanoes are all dormant or extinct.' }),

  makeMCQ({ id:'g6hg-nh-015', chapterId:'g6-natural-hazards', subsection:'tsunami', difficulty:2,
    question:'What causes a TSUNAMI?',
    options:['An undersea earthquake or landslide', 'Cyclone winds pushing water ashore', 'Rivers overflowing after heavy rain', 'Very heavy rainfall over the ocean'],
    answer:'An undersea earthquake or landslide',
    hint:'"Tsunami" is a Japanese word meaning harbour wave.',
    explanation:'A <b>tsunami</b> is a series of large ocean waves generated when a massive event (usually an <b>undersea earthquake</b>) suddenly displaces enormous amounts of seawater. The waves travel at up to 800 km/h across the ocean and can cause catastrophic flooding when they reach shore. The 2004 Indian Ocean tsunami killed over 230,000 people in 14 countries and reached the coasts of Mauritius.' }),

  makeTF({ id:'g6hg-nh-016', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:1,
    question:'December, January and February are SUMMER months in Mauritius.',
    answer:true,
    hint:'Mauritius is in the Southern Hemisphere - its seasons are opposite to Europe\'s.',
    explanation:'<b>True.</b> In Mauritius (Southern Hemisphere), <b>December, January and February</b> are <b>summer months</b> - hot, humid and coinciding with the cyclone season. This is the opposite of the Northern Hemisphere where December–February is winter. (PSAC 2025 Part B: "December, January and February are winter months in Mauritius" - FALSE.)' }),

  makeMCQ({ id:'g6hg-nh-017', chapterId:'g6-natural-hazards', subsection:'earthquakes', difficulty:2,
    question:'What causes an EARTHQUAKE?',
    options:['The movement of tectonic plates', 'A large underwater eruption', 'A storm with rotating winds', 'Heavy rain on bare slopes'],
    answer:'The movement of tectonic plates',
    hint:'The outer shell of our planet is not one solid piece. Think about what happens where two of its pieces meet and slip.',
    explanation:'An <b>earthquake</b> is the sudden violent shaking of the Earth\'s surface, caused by the <b>movement of tectonic plates</b>. The Earth\'s crust is divided into large sections (tectonic plates) that move slowly. When they collide, separate or slide against each other, the released energy causes earthquakes. Earthquakes are measured on the Richter scale. They can trigger tsunamis if they occur under the ocean.' }),

  makeMCQ({ id:'g6hg-nh-018', chapterId:'g6-natural-hazards', subsection:'volcanoes', difficulty:3,
    question:'What ADVANTAGE do volcanoes offer to humans? (PSAC 2025 Q4c)',
    options:[
      'Volcanic eruptions bring fresh water to dry regions',
      'Volcanic soil is extremely fertile - ideal for growing crops',
      'Volcanoes create natural harbours for ships',
      'Volcanic ash cools the climate, helping reduce global warming'
    ],
    answer:'Volcanic soil is extremely fertile - ideal for growing crops',
    hint:'The lava breaks down into mineral-rich soil that farmers love.',
    explanation:'Despite being dangerous, <b>volcanoes create extremely fertile soil</b>. Lava and volcanic ash contain rich minerals (phosphorus, potassium) that, when broken down over time, produce highly productive agricultural land. Many of the world\'s most productive farming areas are on the slopes of volcanoes (e.g., Mount Etna in Sicily, Java in Indonesia). Mauritius itself has fertile volcanic soil well-suited to sugar cane.' }),

  makeMCQ({ id:'g6hg-nh-019', chapterId:'g6-natural-hazards', subsection:'drought', difficulty:3,
    question:'Why is a DROUGHT especially serious for Mauritius?',
    options:['Our drinking water comes from rainfall', 'Our houses are built of light timber', 'Our soil is too salty for most crops', 'Our rivers flow only in the winter'],
    answer:'Our drinking water comes from rainfall',
    hint:'Mauritius is a small island - it cannot import fresh water easily.',
    explanation:'A <b>drought</b> is an extended period of <b>abnormally low rainfall</b>. It is serious for Mauritius because: (1) the island\'s <b>reservoirs</b> (like La Nicolière, Mare aux Vacoas) depend on rainfall for drinking water supply; (2) agriculture requires irrigation; (3) sugar cane and vegetable crops can fail. Climate change is increasing the frequency of droughts in Mauritius, making water conservation increasingly important.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6hg-nh-020', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="assets/questions/flood.jpg" alt="water covering a road or land area" style="max-height:200px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What natural hazard is shown in this picture?</b>',
    options:['A drought','A flood','A cyclone','A landslide'],
    answer:'A flood',
    hint:'Normally-dry land or roads are covered by excess water.',
    explanation:'A <b>flood</b> happens when water covers land that is normally dry, often after heavy or sudden rainfall. In Mauritius, flash floods are a serious hazard, especially in low-lying areas of Port Louis and near rivers during intense cyclone-season downpours.' })

);
