'use strict';
// Grade 6 History & Geography — Chapter: Natural Hazards (Cyclones & Floods)
// IDs format: g6hg-nh-NNN

const _SVG_CYCLONE = `<svg viewBox="0 0 180 180" width="180" height="180" style="display:block;margin:6px auto;background:#0c4a6e;border-radius:50%;border:2px solid #0284c7">
  <circle cx="90" cy="90" r="80" fill="none" stroke="#93c5fd" stroke-width="14" opacity="0.3"/>
  <circle cx="90" cy="90" r="60" fill="none" stroke="#60a5fa" stroke-width="11" opacity="0.45"/>
  <circle cx="90" cy="90" r="42" fill="none" stroke="#3b82f6" stroke-width="9" opacity="0.6"/>
  <circle cx="90" cy="90" r="26" fill="none" stroke="#1d4ed8" stroke-width="6" opacity="0.75"/>
  <circle cx="90" cy="90" r="16" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
  <text x="90" y="87" text-anchor="middle" font-size="7.5" fill="#0c4a6e" font-weight="bold">EYE</text>
  <text x="90" y="97" text-anchor="middle" font-size="6" fill="#0369a1">calm</text>
  <text x="90" y="170" text-anchor="middle" font-size="7" fill="#93c5fd">Top view of a cyclone — winds rotate</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6hg-nh-001', chapterId:'g6-natural-hazards', difficulty:1,
    question:'What is a TROPICAL CYCLONE?',
    options:[
      'A very heavy thunderstorm that lasts only a few minutes',
      'A large, rotating storm system with very strong winds and heavy rainfall, forming over warm tropical seas',
      'A strong cold wind that blows from Antarctica towards Mauritius',
      'A tidal wave caused by an earthquake'
    ],
    answer:'A large, rotating storm system with very strong winds and heavy rainfall, forming over warm tropical seas',
    hint:'Cyclones are also called hurricanes (Atlantic) or typhoons (Pacific).',
    explanation:'A <b>tropical cyclone</b> is a powerful, rotating weather system with very strong winds (over 120 km/h), heavy rain and storm surge, which forms over warm tropical ocean water. In the southern Indian Ocean, these storms threaten Mauritius and Rodrigues.' }),

  makeMCQ({ id:'g6hg-nh-002', chapterId:'g6-natural-hazards', difficulty:1,
    question:`${_SVG_CYCLONE}The diagram shows a top-down view of a cyclone. What is the calm centre called?`,
    options:['The core','The funnel','The eye','The hub'],
    answer:'The eye',
    hint:'It is the circular calm area at the very centre of the storm.',
    explanation:'The <b>eye</b> is the calm, relatively clear centre of a cyclone. The most violent winds and rain are found in the "eye wall" — the ring of thunderstorms surrounding the eye. Directly in the eye, conditions are surprisingly calm.' }),

  makeMCQ({ id:'g6hg-nh-003', chapterId:'g6-natural-hazards', difficulty:1,
    question:'During which months is Mauritius most at risk from tropical cyclones?',
    options:['May to October','July to December','November to April','January only'],
    answer:'November to April',
    hint:'The cyclone season coincides with the southern hemisphere summer.',
    explanation:'The <b>cyclone season</b> in the southern Indian Ocean runs from <b>November to April</b>. During these months, the sea surface temperature is warm enough (above 26°C) to fuel tropical cyclones. Most severe cyclones affecting Mauritius have occurred between December and March.' }),

  makeMCQ({ id:'g6hg-nh-004', chapterId:'g6-natural-hazards', difficulty:2,
    question:'Mauritius uses a CYCLONE WARNING SYSTEM with Classes 1 to 4. What does Class 4 mean?',
    options:[
      'A minor storm that requires no special action',
      'Moderate winds — schools close',
      'A very dangerous cyclone is imminent; everyone must stay indoors immediately',
      'The cyclone has passed and it is safe to go outside'
    ],
    answer:'A very dangerous cyclone is imminent; everyone must stay indoors immediately',
    hint:'The higher the class number, the more dangerous the situation.',
    explanation:'In Mauritius\'s cyclone warning system: <b>Class 1</b> = cyclone within 150 km; <b>Class 2</b> = winds over 90 km/h expected; <b>Class 3</b> = violent winds soon, seek shelter; <b>Class 4</b> = extremely dangerous conditions, stay indoors, the cyclone is over or passing directly.' }),

  makeMCQ({ id:'g6hg-nh-005', chapterId:'g6-natural-hazards', difficulty:2,
    question:'What is a STORM SURGE and why is it dangerous?',
    options:[
      'A sudden drop in temperature during a cyclone',
      'An abnormal rise in sea level caused by a cyclone\'s strong winds, which can flood low-lying coastal areas',
      'A type of rainfall that only occurs during cyclones',
      'A lightning storm that accompanies cyclones'
    ],
    answer:'An abnormal rise in sea level caused by a cyclone\'s strong winds, which can flood low-lying coastal areas',
    hint:'The cyclone\'s winds push seawater towards the coast.',
    explanation:'A <b>storm surge</b> is when a cyclone\'s strong winds push seawater towards the coast, raising the sea level by several metres. This can <b>flood low-lying coastal areas</b> — often causing more deaths and damage than the wind itself.' }),

  makeTF({ id:'g6hg-nh-006', chapterId:'g6-natural-hazards', difficulty:1,
    question:'Climate change is expected to make tropical cyclones more intense and more destructive.',
    answer:true,
    hint:'Warmer seas provide more energy to fuel storms.',
    explanation:'True. As global temperatures rise, sea surface temperatures increase, providing <b>more energy for cyclones</b>. Scientific evidence suggests that although the total number of cyclones may not increase, the proportion reaching the most intense categories is likely to rise.' }),

  makeMCQ({ id:'g6hg-nh-007', chapterId:'g6-natural-hazards', difficulty:2,
    question:'What CAUSES FLOODING in Mauritius during and after heavy rainfall?',
    options:[
      'Too much sunshine evaporating the sea',
      'Rivers overflowing their banks, blocked drains and deforested slopes that cannot absorb water',
      'Cold winds from Antarctica pushing the sea inland',
      'Earthquakes raising the sea floor'
    ],
    answer:'Rivers overflowing their banks, blocked drains and deforested slopes that cannot absorb water',
    hint:'Think about what happens to rainwater when there are no trees and drains are blocked.',
    explanation:'Flooding occurs when <b>rivers overflow</b> during intense rainfall, <b>drainage systems are blocked</b> (by rubbish), and <b>deforested slopes</b> cannot absorb water (tree roots help soak up rainfall). Urbanisation on flood plains also increases flood risk.' }),

  makeMCQ({ id:'g6hg-nh-008', chapterId:'g6-natural-hazards', difficulty:1,
    question:'Which organisation in Mauritius is responsible for tracking and warning about cyclones?',
    options:[
      'The Ministry of Tourism',
      'The Mauritius Meteorological Services (MMS)',
      'The Police Force',
      'The Ministry of Education'
    ],
    answer:'The Mauritius Meteorological Services (MMS)',
    hint:'This organisation monitors weather, issues warnings and manages weather forecasting.',
    explanation:'The <b>Mauritius Meteorological Services (MMS)</b> monitors tropical storms using satellite data and weather instruments. It issues cyclone warnings (Classes 1–4), rainfall warnings and weather forecasts to help the population prepare for natural hazards.' }),

  makeMCQ({ id:'g6hg-nh-009', chapterId:'g6-natural-hazards', difficulty:2,
    question:'Which preparation measure should a family take BEFORE a cyclone arrives?',
    options:[
      'Go to the beach to watch the waves',
      'Open all windows to let air flow through',
      'Stock food, water and medicines; secure loose objects; and stay updated on warning classes',
      'Wait until Class 3 before doing anything'
    ],
    answer:'Stock food, water and medicines; secure loose objects; and stay updated on warning classes',
    hint:'Preparation must happen before the storm arrives, not during it.',
    explanation:'Before a cyclone: <b>stock food, water and medicines</b> (in case of power cuts); <b>secure or bring in loose objects</b> (garden furniture, pots — they become dangerous projectiles in high winds); <b>close and reinforce shutters</b>; follow official MMS updates.' }),

  makeTF({ id:'g6hg-nh-010', chapterId:'g6-natural-hazards', difficulty:1,
    question:'Rodrigues Island is also at risk from tropical cyclones.',
    answer:true,
    hint:'Rodrigues is part of the Republic of Mauritius and is in the southern Indian Ocean.',
    explanation:'True. <b>Rodrigues Island</b>, located about 560 km east of Mauritius, is also in the cyclone belt of the southern Indian Ocean and faces similar — sometimes more severe — cyclone risk due to its more exposed position.' })

);
