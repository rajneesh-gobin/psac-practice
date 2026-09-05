'use strict';
// Grade 6 Science — Enrichment: Our Solar System in Pictures
// Photo identification of planets, the Moon and the Sun, plus text-based MCQs
// IDs format: g6sci-enr-sol-NNN

STATIC_QUESTIONS.push(

  // ── PHOTO IDENTIFICATION: Planets, Moon and Sun ──────────────────────────

  makeMCQ({ id:'g6sci-enr-sol-001', chapterId:'g6sci-enr-solar', subsection:'photos', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/280px-Mercury_in_true_color.jpg" alt="A small, grey, heavily cratered rocky planet close to the Sun" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>Which planet in our Solar System is shown in this NASA photograph?</b>',
    options:['Mercury','Mars','Earth\'s Moon','Venus'],
    answer:'Mercury',
    hint:'This is the smallest planet and the one closest to the Sun. It has a heavily cratered grey surface.',
    explanation:'This is <b>Mercury</b>, the <b>first and smallest planet</b> in our Solar System, closest to the Sun. It has a heavily cratered surface similar to Earth\'s Moon. Mercury has almost no atmosphere, so it swings between extreme temperatures — scorching hot on the Sun-side and freezing cold on the dark side. A year on Mercury lasts only 88 Earth days.' }),

  makeMCQ({ id:'g6sci-enr-sol-002', chapterId:'g6sci-enr-solar', subsection:'photos', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Venus_from_Mariner_10.jpg/280px-Venus_from_Mariner_10.jpg" alt="A planet completely covered in thick yellowish-white clouds" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>Which planet is shown in this photograph taken by the Mariner 10 spacecraft?</b>',
    options:['Jupiter','Saturn','Venus','Uranus'],
    answer:'Venus',
    hint:'This planet is completely hidden by thick yellow-white clouds and is the hottest planet in the Solar System.',
    explanation:'This is <b>Venus</b>, the <b>second planet</b> from the Sun. Venus is completely covered by thick clouds of sulfuric acid, making its surface invisible from space. It is the <b>hottest planet</b> in the Solar System (about 465°C) due to a runaway greenhouse effect. Venus is also the brightest object in the night sky after the Moon, often called the "Evening Star" or "Morning Star".' }),

  makeMCQ({ id:'g6sci-enr-sol-003', chapterId:'g6sci-enr-solar', subsection:'photos', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Meteosat-12-fci-march-equinox-2025-noon.jpg/280px-Meteosat-12-fci-march-equinox-2025-noon.jpg" alt="A blue and white planet with visible continents, oceans and swirling white clouds" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>Which planet is shown in this satellite image?</b>',
    options:['Mars','Venus','Uranus','Earth'],
    answer:'Earth',
    hint:'This is the only planet known to have liquid water on its surface, visible as large blue oceans.',
    explanation:'This is <b>Earth</b>, the <b>third planet</b> from the Sun and our home. Earth is the only planet known to support life. It has liquid water oceans (which make it look blue from space), a protective atmosphere containing oxygen and nitrogen, a moderate temperature range and the right conditions for life to exist. Earth is often called the "Blue Planet" or the "Blue Marble".' }),

  makeMCQ({ id:'g6sci-enr-sol-004', chapterId:'g6sci-enr-solar', subsection:'photos', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png/280px-Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png" alt="A reddish-orange rocky planet with visible surface features and a thin atmosphere" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>Which planet is shown in this photograph?</b>',
    options:['Mercury','Venus','Mars','Jupiter'],
    answer:'Mars',
    hint:'This planet is famous for its distinctive red colour — iron oxide (rust) on its surface gives it this appearance.',
    explanation:'This is <b>Mars</b>, the <b>fourth planet</b> from the Sun, known as the <b>Red Planet</b>. Mars gets its reddish colour from iron oxide (rust) covering its surface. It has the largest volcano in the Solar System (Olympus Mons), a huge canyon (Valles Marineris) and two small moons (Phobos and Deimos). Mars is the most studied planet besides Earth and is being explored by rovers.' }),

  makeMCQ({ id:'g6sci-enr-sol-005', chapterId:'g6sci-enr-solar', subsection:'photos', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jupiter_OPAL_2024.png/280px-Jupiter_OPAL_2024.png" alt="A very large banded gas planet with brown and orange cloud stripes and a distinctive large oval storm" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>Which planet is shown in this Hubble Space Telescope image?</b>',
    options:['Saturn','Uranus','Neptune','Jupiter'],
    answer:'Jupiter',
    hint:'This is the largest planet in the Solar System, with a famous giant storm visible as a large oval spot.',
    explanation:'This is <b>Jupiter</b>, the <b>fifth planet</b> from the Sun and the <b>largest planet</b> in the Solar System — so large that 1,300 Earths could fit inside it! Jupiter is a gas giant with no solid surface. Its most famous feature is the <b>Great Red Spot</b>, a storm that has been raging for hundreds of years. Jupiter has at least 95 known moons, including the four large Galilean moons discovered in 1610.' }),

  makeMCQ({ id:'g6sci-enr-sol-006', chapterId:'g6sci-enr-solar', subsection:'photos', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Saturn_global_view_from_Cassini%2C_rings_open_Better_Colour.png/280px-Saturn_global_view_from_Cassini%2C_rings_open_Better_Colour.png" alt="A large pale golden gas planet surrounded by a spectacular system of flat rings" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>Which planet is shown in this NASA Cassini spacecraft photograph?</b>',
    options:['Jupiter','Uranus','Neptune','Saturn'],
    answer:'Saturn',
    hint:'This planet is instantly recognisable because of its spectacular ring system made of ice and rock.',
    explanation:'This is <b>Saturn</b>, the <b>sixth planet</b> from the Sun, famous for its stunning ring system. Saturn\'s rings are made of billions of chunks of ice and rock, ranging in size from tiny grains to large boulders. Saturn is also a gas giant — it is the least dense planet in the Solar System and would float on water! Saturn has at least 146 known moons, including Titan, which has a thick atmosphere.' }),

  makeMCQ({ id:'g6sci-enr-sol-007', chapterId:'g6sci-enr-solar', subsection:'photos', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Uranus_Voyager2_color_calibrated.png/280px-Uranus_Voyager2_color_calibrated.png" alt="A pale blue-green planet with a smooth, almost featureless surface" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>Which planet is shown in this Voyager 2 photograph?</b>',
    options:['Neptune','Earth','Venus','Uranus'],
    answer:'Uranus',
    hint:'This planet is blue-green in colour and rolls on its side — it has the most tilted axis of any planet.',
    explanation:'This is <b>Uranus</b>, the <b>seventh planet</b> from the Sun. Uranus is an ice giant with a blue-green colour caused by methane gas in its atmosphere. Its most unusual feature is its <b>extreme axial tilt</b> (about 98°) — it essentially rotates on its side! Uranus also has a faint ring system and 28 known moons. It was discovered by William Herschel in 1781, the first planet found with a telescope.' }),

  makeMCQ({ id:'g6sci-enr-sol-008', chapterId:'g6sci-enr-solar', subsection:'photos', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Neptune_Voyager2_color_calibrated.png/280px-Neptune_Voyager2_color_calibrated.png" alt="A deep blue planet with visible faint cloud features on its surface" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>Which planet is shown in this Voyager 2 photograph, the last and most distant planet in our Solar System?</b>',
    options:['Uranus','Jupiter','Mars','Neptune'],
    answer:'Neptune',
    hint:'This is the farthest planet from the Sun — it takes 165 Earth years to complete one orbit.',
    explanation:'This is <b>Neptune</b>, the <b>eighth and farthest planet</b> from the Sun. Neptune is a deep blue ice giant — the blue colour is caused by methane in its atmosphere absorbing red light. Neptune has the <b>strongest winds</b> in the Solar System (up to 2,100 km/h). It was the first planet found by mathematical prediction rather than direct observation (1846). Its largest moon, Triton, orbits in the opposite direction to Neptune\'s rotation.' }),

  makeMCQ({ id:'g6sci-enr-sol-009', chapterId:'g6sci-enr-solar', subsection:'photos', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/280px-FullMoon2010.jpg" alt="A grey, cratered spherical object in full phase against a black space background" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>Which object in our Solar System is shown in this photograph?</b>',
    options:['Mercury','Mars','Pluto','The Moon (Earth\'s natural satellite)'],
    answer:'The Moon (Earth\'s natural satellite)',
    hint:'This is Earth\'s only natural satellite — you can see it in the sky at night from Mauritius.',
    explanation:'This is <b>the Moon</b>, Earth\'s only natural satellite. The Moon orbits Earth approximately every 27.3 days and causes the phases of the Moon (new moon, crescent, half moon, full moon) we observe from Earth. The Moon\'s gravity is responsible for ocean tides. The Moon has no atmosphere, no liquid water and its surface is covered in craters from ancient asteroid impacts. Humans first landed on the Moon in 1969.' }),

  makeMCQ({ id:'g6sci-enr-sol-010', chapterId:'g6sci-enr-solar', subsection:'photos', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/The_Sun_in_white_light.jpg/250px-The_Sun_in_white_light.jpg" alt="A large glowing yellow-white sphere showing the star at the centre of our Solar System" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>Which object is shown in this photograph, viewed through a solar filter?</b>',
    options:['Jupiter','A distant nebula','Sirius (the brightest star in the night sky)','The Sun (our star)'],
    answer:'The Sun (our star)',
    hint:'This is the star at the centre of our Solar System — all planets orbit around it.',
    explanation:'This is <b>the Sun</b>, the star at the <b>centre of our Solar System</b>. The Sun is a massive ball of hot gases (mainly hydrogen and helium) that produces energy through nuclear fusion. The Sun provides the light and heat energy that makes life on Earth possible. All 8 planets, including Earth, orbit the Sun. The Sun is about 150 million kilometres from Earth — light from the Sun takes about 8 minutes to reach us.' }),

  // ── TEXT-BASED QUESTIONS ──────────────────────────────────────────────────

  makeMCQ({ id:'g6sci-enr-sol-011', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:1,
    question:'What is the correct order of the 8 planets from the Sun, starting with the closest?',
    options:[
      'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
      'Mercury, Earth, Venus, Mars, Saturn, Jupiter, Uranus, Neptune',
      'Venus, Mercury, Earth, Mars, Jupiter, Saturn, Neptune, Uranus',
      'Mercury, Venus, Mars, Earth, Jupiter, Saturn, Uranus, Neptune'
    ],
    answer:'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
    hint:'A helpful mnemonic: My Very Educated Mother Just Served Us Noodles.',
    explanation:'The correct order of the 8 planets from the Sun is: <b>Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune</b>. A useful mnemonic to remember the order is: <b>M</b>y <b>V</b>ery <b>E</b>ducated <b>M</b>other <b>J</b>ust <b>S</b>erved <b>U</b>s <b>N</b>oodles.' }),

  makeMCQ({ id:'g6sci-enr-sol-012', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:2,
    question:'Which of the following are the INNER planets (rocky planets closest to the Sun)?',
    options:[
      'Jupiter, Saturn, Uranus, Neptune',
      'Mercury, Venus, Earth, Mars',
      'Mercury, Venus, Mars, Jupiter',
      'Earth, Mars, Jupiter, Saturn'
    ],
    answer:'Mercury, Venus, Earth, Mars',
    hint:'The inner planets are all rocky and relatively small — they are the four closest to the Sun.',
    explanation:'The <b>inner planets</b> are <b>Mercury, Venus, Earth and Mars</b> — the four rocky planets closest to the Sun. They are relatively small, dense, and have solid surfaces. The <b>outer planets</b> are Jupiter, Saturn, Uranus and Neptune — these are gas giants or ice giants, much larger but less dense. The inner and outer planets are separated by the Asteroid Belt.' }),

  makeMCQ({ id:'g6sci-enr-sol-013', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:2,
    question:'What makes Earth the ONLY planet known to support life in our Solar System?',
    options:[
      'Earth is the largest planet, giving it enough space for living things to develop',
      'Earth is closest to the Sun, receiving the most heat and light',
      'Earth has liquid water on its surface, a breathable atmosphere with oxygen, and a temperature range that allows life to exist',
      'Earth has no atmosphere, allowing living things to evolve freely'
    ],
    answer:'Earth has liquid water on its surface, a breathable atmosphere with oxygen, and a temperature range that allows life to exist',
    hint:'Think about what all living things need to survive: water, air and the right temperature.',
    explanation:'Earth is unique because it has three key conditions for life: (1) <b>Liquid water</b> on its surface — most other planets are either too hot (water evaporates) or too cold (water freezes); (2) A <b>breathable atmosphere</b> containing oxygen and protecting against harmful radiation; (3) A <b>moderate temperature range</b> (roughly -89°C to +57°C) that allows liquid water to exist and organisms to function. No other planet in our Solar System has all three.' }),

  makeMCQ({ id:'g6sci-enr-sol-014', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:3,
    question:'Why was PLUTO reclassified as a "dwarf planet" by the International Astronomical Union (IAU) in 2006?',
    options:[
      'Pluto was found to be too hot to be a real planet',
      'Pluto does not orbit the Sun, so it cannot be a planet',
      'Pluto has not cleared its orbital neighbourhood of other objects, so it does not fully meet the definition of a planet',
      'Pluto is too small to be seen with a telescope, so scientists removed it from the planet list'
    ],
    answer:'Pluto has not cleared its orbital neighbourhood of other objects, so it does not fully meet the definition of a planet',
    hint:'In 2006, scientists agreed on three criteria a planet must meet — Pluto only meets two of the three.',
    explanation:'In 2006, the IAU defined a planet as an object that: (1) orbits the Sun; (2) has enough mass to be nearly round; and (3) has <b>cleared its orbital neighbourhood</b> of other objects. Pluto meets criteria 1 and 2, but <b>not 3</b> — it shares its region of space (the Kuiper Belt) with many other similar objects. So Pluto was reclassified as a <b>dwarf planet</b>. The Solar System now officially has <b>8 planets</b>.' }),

  makeMCQ({ id:'g6sci-enr-sol-015', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:1,
    question:'Earth completes one full rotation on its own axis in approximately ___.',
    options:['24 hours','365 days','28 days','12 hours'],
    answer:'24 hours',
    hint:'This is the length of one full day.',
    explanation:'Earth takes approximately <b>24 hours</b> to complete one full rotation on its own axis. This rotation causes the cycle of day and night. Earth also takes 365 days to orbit the Sun (one year), and the Moon takes about 28 days to orbit Earth.' })

);
