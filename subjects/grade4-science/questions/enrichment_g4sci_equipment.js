'use strict';
// Grade 4 Science — Enrichment: Science Tools & Instruments
// Identify weather and science instruments by photo.
// IDs format: g4sci-enr-equ-NNN

STATIC_QUESTIONS.push(

  // ── Photo-identification questions ───────────────────────────────────────────

  makeMCQ({ id:'g4sci-enr-equ-001', chapterId:'g4sci-enr-equipment', subsection:'photos', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Clinical_thermometer_38.7.JPG" alt="A science instrument" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What instrument is shown in this picture?</b>',
    options:['Thermometer','Measuring cylinder','Rain gauge','Newton meter'],
    answer:'Thermometer',
    hint:'This instrument tells us how hot or cold something is.',
    explanation:'A <b>thermometer</b> measures <b>temperature</b>. It shows how hot or cold something is in degrees Celsius (°C). We use thermometers to measure body temperature, air temperature, and the temperature of liquids in science experiments.' }),

  makeMCQ({ id:'g4sci-enr-equ-002', chapterId:'g4sci-enr-equipment', subsection:'photos', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Weather_station_rain_gauge.JPG" alt="A weather instrument" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What weather instrument is shown in this picture?</b>',
    options:['Rain gauge','Anemometer','Thermometer','Wind vane'],
    answer:'Rain gauge',
    hint:'This instrument collects rainwater and shows how much fell.',
    explanation:'A <b>rain gauge</b> measures the amount of <b>rainfall</b>. Rainwater is collected in the tube and the depth is read in millimetres (mm). Meteorologists use rain gauges every day to record how much rain an area receives.' }),

  makeMCQ({ id:'g4sci-enr-equ-003', chapterId:'g4sci-enr-equipment', subsection:'photos', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Anemometer.jpg" alt="A weather instrument" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What instrument is shown in this picture?</b>',
    options:['Anemometer','Rain gauge','Thermometer','Wind vane'],
    answer:'Anemometer',
    hint:'This instrument has spinning cups — the faster they spin, the stronger the wind.',
    explanation:'An <b>anemometer</b> measures <b>wind speed</b>. The spinning cups rotate faster as the wind blows harder. Wind speed is measured in kilometres per hour (km/h) or knots. It is a key instrument at every weather station.' }),

  makeMCQ({ id:'g4sci-enr-equ-004', chapterId:'g4sci-enr-equipment', subsection:'photos', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Magnifying_glass.jpg" alt="A science tool" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What science tool is shown in this picture?</b>',
    options:['Magnifying glass','Microscope','Telescope','Periscope'],
    answer:'Magnifying glass',
    hint:'This simple handheld tool makes small objects look bigger.',
    explanation:'A <b>magnifying glass</b> (hand lens) uses a convex lens to make objects appear larger. Scientists use it in the field to examine small objects like insects, leaves, and soil without a laboratory. It is the most portable and simple optical science tool.' }),

  makeMCQ({ id:'g4sci-enr-equ-005', chapterId:'g4sci-enr-equipment', subsection:'photos', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Optical_microscope_nikon_alphaphot.jpg" alt="A laboratory instrument" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What laboratory instrument is shown in this picture?</b>',
    options:['Microscope','Telescope','Magnifying glass','Camera'],
    answer:'Microscope',
    hint:'This instrument can magnify objects hundreds or thousands of times.',
    explanation:'A <b>microscope</b> uses a series of lenses to magnify very tiny objects — like cells, bacteria, and tiny organisms — so scientists can study them in detail. It is far more powerful than a hand lens and is essential in laboratory science.' }),

  makeMCQ({ id:'g4sci-enr-equ-006', chapterId:'g4sci-enr-equipment', subsection:'photos', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Measuring_cylinder_hg.jpg" alt="A laboratory instrument" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What laboratory instrument is shown in this picture?</b>',
    options:['Measuring cylinder','Test tube','Beaker','Conical flask'],
    answer:'Measuring cylinder',
    hint:'This cylinder has a scale on the side marked in mL for measuring liquids accurately.',
    explanation:'A <b>measuring cylinder</b> (graduated cylinder) is used to measure the <b>volume</b> of a liquid accurately. The scale is marked in millilitres (mL). You read the volume at the bottom of the curved liquid surface (called the meniscus) while looking at it at eye level.' }),

  makeMCQ({ id:'g4sci-enr-equ-007', chapterId:'g4sci-enr-equipment', subsection:'photos', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Spring_balance.PNG" alt="A measuring instrument" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What instrument is shown in this picture?</b>',
    options:['Newton meter (spring balance)','Thermometer','Rain gauge','Ruler'],
    answer:'Newton meter (spring balance)',
    hint:'An object hung on the hook stretches a spring inside — the stretch shows the weight.',
    explanation:'A <b>Newton meter</b> (spring balance) measures <b>force</b> and <b>weight</b>. When an object is hung on the hook, it stretches the internal spring. The reading is shown in Newtons (N), named after the scientist Sir Isaac Newton who discovered gravity.' }),

  // ── Text-based questions ─────────────────────────────────────────────────────

  makeMCQ({ id:'g4sci-enr-equ-008', chapterId:'g4sci-enr-equipment', subsection:'measuring', difficulty:1,
    question:'A scientist wants to measure the temperature of water being heated in a beaker. Which instrument should she use?',
    options:['Thermometer','Rain gauge','Newton meter','Measuring cylinder'],
    answer:'Thermometer',
    hint:'Temperature is measured in degrees Celsius (°C).',
    explanation:'A <b>thermometer</b> is used to measure <b>temperature</b>. It is placed into the water to show how hot or cold the water is. As water is heated, the thermometer reading rises and shows the increasing temperature in °C.' }),

  makeMCQ({ id:'g4sci-enr-equ-009', chapterId:'g4sci-enr-equipment', subsection:'measuring', difficulty:1,
    question:'Which instrument would a meteorologist use to measure the amount of rain that falls overnight?',
    options:['Rain gauge','Anemometer','Thermometer','Wind vane'],
    answer:'Rain gauge',
    hint:'It collects rainwater and you read the depth in millimetres.',
    explanation:'A <b>rain gauge</b> collects rainwater and measures the depth of rainfall in millimetres (mm). The meteorologist reads it after the rain to record the precipitation for that period.' }),

  makeMCQ({ id:'g4sci-enr-equ-010', chapterId:'g4sci-enr-equipment', subsection:'measuring', difficulty:1,
    question:'What does a <b>wind vane</b> tell us about the weather?',
    options:['The direction the wind is blowing from','The speed of the wind','The amount of rainfall','The temperature of the air'],
    answer:'The direction the wind is blowing from',
    hint:'A wind vane is shaped like an arrow that points into the wind.',
    explanation:'A <b>wind vane</b> shows the <b>direction</b> from which the wind is blowing. It is often shaped like an arrow or a cockerel (rooster) and rotates to point toward the direction the wind is coming from. A wind blowing from the north is called a "northerly wind."' }),

  makeMCQ({ id:'g4sci-enr-equ-011', chapterId:'g4sci-enr-equipment', subsection:'measuring', difficulty:1,
    question:'Which instrument would you use to find out accurately how much liquid is in a container?',
    options:['Measuring cylinder','Thermometer','Newton meter','Rain gauge'],
    answer:'Measuring cylinder',
    hint:'It is marked in millilitres (mL) on its side.',
    explanation:'A <b>measuring cylinder</b> is used to measure the <b>volume</b> of liquids accurately. Its scale is marked in millilitres (mL), and you read the measurement at the bottom of the curved liquid surface (the meniscus), at eye level.' }),

  makeMCQ({ id:'g4sci-enr-equ-012', chapterId:'g4sci-enr-equipment', subsection:'measuring', difficulty:2,
    question:'A scientist wants to look at the tiny cells inside a leaf in great detail. Which instrument is MOST suitable?',
    options:['Microscope','Rain gauge','Ruler','Newton meter'],
    answer:'Microscope',
    hint:'Cells are too tiny to see with the naked eye or even a hand lens.',
    explanation:'A <b>microscope</b> is most suitable because it can magnify objects hundreds or thousands of times their actual size, making it possible to see individual cells inside a leaf — far beyond what a magnifying glass can show.' }),

  makeMCQ({ id:'g4sci-enr-equ-013', chapterId:'g4sci-enr-equipment', subsection:'measuring', difficulty:2,
    question:'Which unit does a Newton meter (spring balance) show on its scale?',
    options:['Newtons (N)','Grams (g)','Millilitres (mL)','Degrees Celsius (°C)'],
    answer:'Newtons (N)',
    hint:'It is named after the scientist who discovered the laws of gravity.',
    explanation:'A Newton meter measures <b>force</b> (and weight) in <b>Newtons (N)</b>, named after Sir Isaac Newton. Weight is a force — the pull of gravity on an object. A 1 kg object has a weight of about 10 N on Earth.' }),

  makeMCQ({ id:'g4sci-enr-equ-014', chapterId:'g4sci-enr-equipment', subsection:'measuring', difficulty:2,
    question:'A pupil wants to examine a small beetle on a nature walk. She has no laboratory with her. Which simple tool would be most useful?',
    options:['Magnifying glass','Microscope','Anemometer','Newton meter'],
    answer:'Magnifying glass',
    hint:'This is a simple handheld lens that can be carried anywhere.',
    explanation:'A <b>magnifying glass</b> is a simple, portable tool that can be used outside a laboratory to make small objects appear larger. It is ideal for examining insects, leaves, and rock samples in the field. A microscope requires a laboratory and a power supply.' }),

  makeMCQ({ id:'g4sci-enr-equ-015', chapterId:'g4sci-enr-equipment', subsection:'measuring', difficulty:2,
    question:'What does an <b>anemometer</b> measure?',
    options:['Wind speed','Wind direction','Amount of rainfall','Air temperature'],
    answer:'Wind speed',
    hint:'Its spinning cups rotate faster when the wind is stronger.',
    explanation:'An <b>anemometer</b> measures <b>wind speed</b>. The cups spin faster in stronger winds, and the instrument converts the spin rate into a speed, usually displayed in kilometres per hour (km/h). It is used at weather stations and airports.' }),

  makeMCQ({ id:'g4sci-enr-equ-016', chapterId:'g4sci-enr-equipment', subsection:'measuring', difficulty:3,
    question:'A weather station needs to record temperature, wind speed, and rainfall each day. Which THREE instruments are needed?',
    options:[
      'Thermometer, anemometer, and rain gauge',
      'Thermometer, microscope, and Newton meter',
      'Rain gauge, magnifying glass, and wind vane',
      'Newton meter, measuring cylinder, and thermometer'
    ],
    answer:'Thermometer, anemometer, and rain gauge',
    hint:'Match each weather variable to the instrument that measures it.',
    explanation:'To record the three weather variables: a <b>thermometer</b> for temperature, an <b>anemometer</b> for wind speed, and a <b>rain gauge</b> for rainfall. Each instrument is specifically designed to measure one property of the weather.' }),

  makeMCQ({ id:'g4sci-enr-equ-017', chapterId:'g4sci-enr-equipment', subsection:'measuring', difficulty:3,
    question:'A student uses a measuring cylinder and reads the scale at 45 mL. What property of the liquid has she measured?',
    options:['Volume','Mass','Temperature','Weight'],
    answer:'Volume',
    hint:'Millilitres (mL) is the unit for how much space a liquid occupies.',
    explanation:'"45 mL" means the liquid occupies 45 millilitres of space. This is a measurement of <b>volume</b> — the amount of space a liquid fills. Volume is measured in millilitres (mL) or litres (L), not grams or degrees.' }),

  makeMCQ({ id:'g4sci-enr-equ-018', chapterId:'g4sci-enr-equipment', subsection:'measuring', difficulty:3,
    question:'Why must you read a measuring cylinder at <b>eye level</b> at the bottom of the meniscus?',
    options:[
      'Because looking from an angle creates a parallax error — the curved liquid surface gives a wrong reading',
      'Because the numbers printed on the cylinder are too small to see from above',
      'Because the liquid evaporates quickly if you look down into the open cylinder',
      'Because the cylinder must be perfectly vertical and held at eye level to stop it tipping over'
    ],
    answer:'Because looking from an angle creates a parallax error — the curved liquid surface gives a wrong reading',
    hint:'The curved surface of a liquid in a cylinder is called the meniscus.',
    explanation:'Liquids form a curved surface (the <b>meniscus</b>) inside a measuring cylinder — it curves downward in the middle. Looking from above or below causes a <b>parallax error</b> — the reading appears higher or lower than it actually is. Reading at eye level at the <b>bottom of the meniscus</b> gives the correct volume.' }),

  makeMCQ({ id:'g4sci-enr-equ-019', chapterId:'g4sci-enr-equipment', subsection:'measuring', difficulty:4,
    question:'Which pair of instruments would you use to find the <b>weight</b> of a stone AND the <b>volume of water it displaces</b>?',
    options:[
      'Newton meter and measuring cylinder',
      'Thermometer and rain gauge',
      'Anemometer and magnifying glass',
      'Microscope and Newton meter'
    ],
    answer:'Newton meter and measuring cylinder',
    hint:'One measures force; the other measures liquid volume.',
    explanation:'A <b>Newton meter</b> (spring balance) measures the <b>weight</b> of the stone in Newtons (N). A <b>measuring cylinder</b> filled with water measures the rise in water level when the stone is submerged — this rise (in mL) equals the stone\'s <b>volume</b> in cm³. Together, these two instruments can be used to calculate the density of the stone.' })

);
