'use strict';
// Grade 6 Science — Chapter: Earth, Moon & Sun in the Solar System
// IDs format: g6sci-sol-NNN

const _SVG_SOLAR = `<svg viewBox="0 0 320 82" width="320" height="82" style="display:block;margin:6px auto;background:#0f172a;border-radius:8px">
  <circle cx="18" cy="41" r="15" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="18" y="64" font-size="5" fill="#fbbf24" text-anchor="middle">Sun</text>
  <circle cx="47" cy="41" r="3.5" fill="#9ca3af"/>
  <text x="47" y="18" font-size="4.5" fill="#9ca3af" text-anchor="middle">Mercury</text>
  <circle cx="68" cy="41" r="5" fill="#fcd34d"/>
  <text x="68" y="18" font-size="4.5" fill="#fcd34d" text-anchor="middle">Venus</text>
  <circle cx="92" cy="41" r="5.5" fill="#3b82f6"/>
  <text x="92" y="18" font-size="4.5" fill="#60a5fa" text-anchor="middle">Earth</text>
  <circle cx="116" cy="41" r="4" fill="#ef4444"/>
  <text x="116" y="18" font-size="4.5" fill="#f87171" text-anchor="middle">Mars</text>
  <text x="135" y="43" font-size="7" fill="#6b7280" text-anchor="middle">&#xB7;&#xB7;&#xB7;</text>
  <circle cx="162" cy="41" r="9" fill="#d97706"/>
  <text x="162" y="64" font-size="4.5" fill="#fbbf24" text-anchor="middle">Jupiter</text>
  <ellipse cx="196" cy="41" rx="13" ry="3" fill="none" stroke="#ca8a04" stroke-width="1.2"/>
  <circle cx="196" cy="41" r="7" fill="#fef08a"/>
  <text x="196" y="64" font-size="4.5" fill="#fef08a" text-anchor="middle">Saturn</text>
  <circle cx="226" cy="41" r="5.5" fill="#67e8f9"/>
  <text x="226" y="64" font-size="4.5" fill="#67e8f9" text-anchor="middle">Uranus</text>
  <circle cx="252" cy="41" r="5" fill="#818cf8"/>
  <text x="252" y="64" font-size="4.5" fill="#818cf8" text-anchor="middle">Neptune</text>
  <text x="160" y="10" font-size="5.5" fill="#94a3b8" text-anchor="middle">Our Solar System — 8 planets orbit the Sun (not to scale)</text>
</svg>`;

const _SVG_DAY_NIGHT = `<svg viewBox="0 0 220 90" width="220" height="90" style="display:block;margin:6px auto;background:#0f172a;border-radius:8px">
  <circle cx="30" cy="45" r="20" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="30" y="78" font-size="7" fill="#fbbf24" text-anchor="middle">Sun</text>
  <circle cx="155" cy="45" r="22" fill="#1e40af"/>
  <path d="M 155 23 A 22 22 0 0 1 155 67 Z" fill="#374151"/>
  <text x="145" y="42" font-size="6" fill="#bfdbfe" text-anchor="middle">DAY</text>
  <text x="168" y="42" font-size="6" fill="#94a3b8" text-anchor="middle">NIGHT</text>
  <text x="155" y="80" font-size="6.5" fill="#94a3b8" text-anchor="middle">Earth rotates every 24 hours</text>
  <line x1="52" y1="45" x2="130" y2="45" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="91" y="40" font-size="6" fill="#fbbf24" text-anchor="middle">light rays</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-sol-001', chapterId:'g6-solar-system', difficulty:1,
    question:`${_SVG_SOLAR}How many planets orbit the Sun in our Solar System?`,
    options:['6','7','8','9'],
    answer:'8',
    hint:'Count them in the diagram: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.',
    explanation:'There are <b>8 planets</b> in our Solar System: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. Pluto was reclassified as a dwarf planet in 2006.' }),

  makeMCQ({ id:'g6sci-sol-002', chapterId:'g6-solar-system', difficulty:1,
    question:'Which planet is CLOSEST to the Sun?',
    options:['Venus','Earth','Mars','Mercury'],
    answer:'Mercury',
    hint:'In the diagram, which planet is nearest to the Sun on the left?',
    explanation:'<b>Mercury</b> is the planet closest to the Sun. It is also the smallest planet. Because it is so close to the Sun, its surface temperature is extremely hot during the day and very cold at night (it has almost no atmosphere to retain heat).' }),

  makeMCQ({ id:'g6sci-sol-003', chapterId:'g6-solar-system', difficulty:1,
    question:'Which is the LARGEST planet in our Solar System?',
    options:['Saturn','Uranus','Earth','Jupiter'],
    answer:'Jupiter',
    hint:'It is so large that all other planets could fit inside it.',
    explanation:'<b>Jupiter</b> is the largest planet in the Solar System. It is a gas giant — so large that over 1,300 Earths could fit inside it. Jupiter is also famous for its Great Red Spot, a storm that has lasted hundreds of years.' }),

  makeMCQ({ id:'g6sci-sol-004', chapterId:'g6-solar-system', difficulty:1,
    question:`${_SVG_DAY_NIGHT}According to the diagram, what causes DAY and NIGHT on Earth?`,
    options:[
      'The Sun moving around the Earth',
      'The Earth rotating (spinning) on its own axis every 24 hours',
      'Clouds blocking the Sun at night',
      'The Moon blocking the Sun\'s light'
    ],
    answer:'The Earth rotating (spinning) on its own axis every 24 hours',
    hint:'One half of Earth faces the Sun (day), the other half faces away (night).',
    explanation:'The Earth <b>rotates</b> on its own axis once every 24 hours. The side facing the Sun experiences <b>day</b>, while the opposite side, in shadow, experiences <b>night</b>. The Sun does not move — Earth spins.' }),

  makeMCQ({ id:'g6sci-sol-005', chapterId:'g6-solar-system', difficulty:1,
    question:'How long does it take Earth to complete ONE orbit around the Sun?',
    options:['24 hours (1 day)','28 days (1 month)','365 days (1 year)','10 years'],
    answer:'365 days (1 year)',
    hint:'We call this period one year.',
    explanation:'The Earth takes approximately <b>365.25 days</b> to orbit the Sun — this defines our year. The extra 0.25 day accumulates into a "leap year" (366 days) every 4 years.' }),

  makeMCQ({ id:'g6sci-sol-006', chapterId:'g6-solar-system', difficulty:2,
    question:'What causes the SEASONS (summer and winter) on Earth?',
    options:[
      'Earth getting closer to and further from the Sun during its orbit',
      'The Earth\'s axis being tilted as it orbits the Sun, causing different parts to receive more direct sunlight at different times of year',
      'The Moon blocking sunlight during winter',
      'The Sun getting hotter in summer and cooler in winter'
    ],
    answer:'The Earth\'s axis being tilted as it orbits the Sun, causing different parts to receive more direct sunlight at different times of year',
    hint:'Earth\'s axis is tilted at 23.5°.',
    explanation:'Earth\'s axis is <b>tilted 23.5°</b>. As Earth orbits the Sun, different hemispheres receive more direct sunlight at different times. When the Southern Hemisphere tilts toward the Sun (November–March), Mauritius has summer; when it tilts away, it has winter.' }),

  makeTF({ id:'g6sci-sol-007', chapterId:'g6-solar-system', difficulty:1,
    question:'The Moon produces its own light, just like the Sun.',
    answer:false,
    hint:'Look at the Moon on a cloudy night — what is different about its light?',
    explanation:'The Moon does <b>not</b> produce its own light. It <b>reflects</b> sunlight. The Moon appears bright because its surface reflects light from the Sun. The phases of the Moon (new moon, crescent, full moon) occur as the angle between the Sun, Moon and Earth changes.' }),

  makeMCQ({ id:'g6sci-sol-008', chapterId:'g6-solar-system', difficulty:2,
    question:'Why does the Moon appear to change shape from night to night (phases of the Moon)?',
    options:[
      'The Moon actually shrinks and grows in size',
      'Clouds cover different parts of the Moon each night',
      'We see different amounts of the Moon\'s sunlit surface as it orbits Earth each month',
      'The Earth\'s shadow falls on different parts of the Moon each night'
    ],
    answer:'We see different amounts of the Moon\'s sunlit surface as it orbits Earth each month',
    hint:'The Moon is always half lit by the Sun — we just see different portions of the lit half.',
    explanation:'As the Moon orbits Earth (taking ~28 days), our angle of view of the sunlit half changes. When the lit half faces us directly, we see a <b>full moon</b>; when the lit half faces away, we see a <b>new moon</b>. These changing views are the <b>lunar phases</b>.' }),

  makeMCQ({ id:'g6sci-sol-009', chapterId:'g6-solar-system', difficulty:1,
    question:'What force keeps the planets in orbit around the Sun?',
    options:['Magnetism','Friction','Gravity','Wind'],
    answer:'Gravity',
    hint:'This is the same force that keeps you on the ground.',
    explanation:'<b>Gravity</b> is the force of attraction between objects with mass. The Sun\'s enormous mass creates a strong gravitational pull that keeps all the planets in their orbits. Without gravity, the planets would fly off into space in a straight line.' }),

  makeMCQ({ id:'g6sci-sol-010', chapterId:'g6-solar-system', difficulty:2,
    question:'A helpful mnemonic to remember the order of the 8 planets from the Sun is "My Very Excellent Mother Just Served Us Noodles." Which planet does "J" represent?',
    options:['Juno','Janus','Jupiter','Jove'],
    answer:'Jupiter',
    hint:'My=Mercury, Very=Venus, Excellent=Earth, Mother=Mars, Just=?, Served=Saturn, Us=Uranus, Noodles=Neptune.',
    explanation:'In the mnemonic "My Very Excellent Mother <b>J</b>ust Served Us Noodles", J stands for <b>Jupiter</b> — the 5th planet from the Sun. The full order is: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.' })

);
