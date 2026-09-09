'use strict';
(function () {

STATIC_QUESTIONS.push(

  // ── Circuit symbol X = resistor (2021 NCE Phy Fig 1.1) ────────────────────
  // Simple series circuit: battery (long/short line symbol) at top,
  // rectangular box labelled X at bottom = resistor.

  makeMCQ({ id: 'g9s-pdm-001', chapterId: 'g9s-p5-electricity', subsection: 'circuit_symbols', difficulty: 1,
    question: 'A simple electric circuit diagram shows a battery at the top connected by wires to a rectangular box labelled <b>X</b> at the bottom.<br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 130" width="180" height="130" style="display:block;margin:8px auto">' +
      '<rect x="20" y="20" width="140" height="90" fill="none" stroke="#333" stroke-width="2.5"/>' +
      '<line x1="85" y1="20" x2="85" y2="8" stroke="#333" stroke-width="2.5"/>' +
      '<line x1="82" y1="8" x2="88" y2="8" stroke="#333" stroke-width="4"/>' +
      '<line x1="80" y1="11" x2="90" y2="11" stroke="#333" stroke-width="1.5"/>' +
      '<line x1="95" y1="20" x2="95" y2="8" stroke="#333" stroke-width="2.5"/>' +
      '<line x1="92" y1="8" x2="98" y2="8" stroke="#333" stroke-width="2"/>' +
      '<rect x="60" y="93" width="60" height="20" fill="none" stroke="#333" stroke-width="2"/>' +
      '<text x="90" y="107" font-size="11" font-weight="bold" text-anchor="middle" fill="#333">X</text>' +
      '<text x="90" y="125" font-size="9" text-anchor="middle" fill="#555">Fig 1.1</text>' +
      '</svg>What does symbol <b>X</b> represent?',
    options: ['A resistor', 'A battery', 'A bulb', 'A cell'],
    answer: 'A resistor',
    hint: 'A rectangle is the standard circuit symbol for this component.',
    explanation: 'The rectangular box (<b>X</b>) is the circuit symbol for a <b>resistor</b>. A resistor opposes the flow of electric current. The battery is shown by the long and short parallel lines at the top. A bulb is shown as a circle with a cross; a cell is a single long and short line.' }),

  // ── Speed-time graph (triangle) (2021 NCE Phy Fig 1.4) ─────────────────────
  // Straight line from high speed at t=0 to zero at some time = constant deceleration.

  makeMCQ({ id: 'g9s-pdm-002', chapterId: 'g9s-p4-motion', subsection: 'speed_time_graphs', difficulty: 2,
    question: 'A speed-time graph shows a straight line that starts at a high speed on the y-axis and slopes downward uniformly until it reaches zero on the time axis — forming a right-angled triangle shape. Which statement about the motion is <b>correct</b>?',
    options: [
      'It is moving with decreasing speed',
      'It is moving with increasing speed',
      'It is moving with constant speed',
      'It is stationary throughout'
    ],
    answer: 'It is moving with decreasing speed',
    hint: 'A downward slope on a speed-time graph means the speed is getting smaller.',
    explanation: 'A straight line <b>sloping downward</b> on a speed-time graph shows that the object is <b>decelerating</b> — moving with <b>decreasing speed</b> at a constant rate. If the line were horizontal, the speed would be constant. An upward slope means increasing speed. When the line reaches zero, the object has stopped.' }),

  // ── Pencil in water (refraction) (2021 NCE Phy Fig 1.5) ───────────────────
  // Pencil placed in a glass of water appears bent at the water surface.

  makeMCQ({ id: 'g9s-pdm-003', chapterId: 'g9s-p2-light', subsection: 'refraction', difficulty: 1,
    question: 'A diagram shows a pencil placed diagonally in a glass of water. The pencil appears <b>bent or broken</b> at the point where it enters the water surface, even though it is straight. Why does the pencil appear broken?',
    options: [
      'Because of the refraction of light',
      'Because of the reflection of light',
      'Because of the absorption of light',
      'Because of the diffraction of light'
    ],
    answer: 'Because of the refraction of light',
    hint: 'Light changes direction when it passes from one medium into another.',
    explanation: 'The pencil appears bent because of <b>refraction of light</b>. Light travels from the water (denser medium) to air (less dense medium) and bends away from the normal at the boundary. Our eyes trace the light rays in straight lines back to where they appear to come from, making the submerged part look displaced. This is why a swimming pool appears shallower than it is.' }),

  // ── Plane mirror: lateral inversion (2021 NCE Phy Fig 2.1) ────────────────
  // Man raises right hand; left hand appears raised in mirror image.

  makeMCQ({ id: 'g9s-pdm-004', chapterId: 'g9s-p2-light', subsection: 'plane_mirrors', difficulty: 1,
    question: 'A diagram shows a man raising his <b>right hand</b> in front of a plane mirror. In the mirror image, his <b>left hand</b> appears to be raised. This characteristic of a plane mirror image is known as _____ inversion.',
    options: ['Lateral', 'Vertical', 'Horizontal', 'Real'],
    answer: 'Lateral',
    hint: 'Left and right are swapped — side to side.',
    explanation: 'This is called <b>lateral inversion</b> (left-right reversal). In a plane mirror, left and right are swapped in the image but top and bottom are not. This is why text in a plane mirror appears reversed. A plane mirror image is also upright and virtual (cannot be projected on a screen).' }),

  makeMCQ({ id: 'g9s-pdm-005', chapterId: 'g9s-p2-light', subsection: 'plane_mirrors', difficulty: 1,
    question: 'In a plane mirror, the image of the man <b>cannot</b> be projected onto a screen. What type of image does a plane mirror produce?',
    options: ['Virtual', 'Real', 'Inverted', 'Magnified'],
    answer: 'Virtual',
    hint: 'A real image can be projected; this type cannot.',
    explanation: 'A plane mirror produces a <b>virtual image</b>. A virtual image is formed where reflected rays appear to diverge from — behind the mirror — and cannot be projected onto a screen. In contrast, a real image (formed by a converging lens or concave mirror) can be projected. The plane mirror image is also the same size as the object and the same distance behind the mirror as the object is in front.' }),

  makeMCQ({ id: 'g9s-pdm-006', chapterId: 'g9s-p2-light', subsection: 'plane_mirrors', difficulty: 2,
    question: 'A man who is <b>170 cm</b> tall stands in front of a plane mirror. How does the <b>height of his image</b> compare to his own height?',
    options: [
      'Equal to 170 cm',
      'Greater than 170 cm',
      'Less than 170 cm',
      'Depends on how far he stands from the mirror'
    ],
    answer: 'Equal to 170 cm',
    hint: 'A plane mirror always produces an image the same size as the object.',
    explanation: 'A plane mirror always produces an image that is the <b>same size</b> as the object. If the man is 170 cm tall, his image is also 170 cm tall. This is one of the key properties of plane mirror images: same size, same distance behind mirror as object in front, virtual, and laterally inverted.' }),

  makeMCQ({ id: 'g9s-pdm-007', chapterId: 'g9s-p2-light', subsection: 'plane_mirrors', difficulty: 2,
    question: 'A man stands <b>48 cm</b> in front of a plane mirror. What is the total distance between the <b>man</b> and his <b>image</b>?',
    options: ['96 cm', '48 cm', '24 cm', '192 cm'],
    answer: '96 cm',
    hint: 'The image is as far behind the mirror as the object is in front.',
    explanation: 'In a plane mirror, the image distance equals the object distance. The man is 48 cm in front of the mirror, so his image is 48 cm <b>behind</b> the mirror. The total distance between the man and his image = 48 + 48 = <b>96 cm</b>.' }),

  // ── Refraction ray diagram A/B/C labels (2021 NCE Phy Fig 2.2) ─────────────
  // Ray travelling from water into air. A = normal (dotted vertical line),
  // B = refracted ray (air side), C = angle of incidence (in water).

  makeMCQ({ id: 'g9s-pdm-008', chapterId: 'g9s-p2-light', subsection: 'refraction', difficulty: 2,
    question: 'A ray diagram shows light travelling from <b>water</b> into <b>air</b>. At the boundary, a dotted vertical line is drawn perpendicular to the surface — this is label <b>A</b>. The ray in air bends away from this line. Using the terms: <em>incident ray, angle of refraction, normal, angle of incidence, refracted ray</em> — what is label <b>A</b>?',
    options: ['Normal', 'Incident ray', 'Refracted ray', 'Angle of incidence'],
    answer: 'Normal',
    hint: 'It is a dotted line perpendicular (at 90°) to the boundary surface.',
    explanation: 'Label <b>A</b> is the <b>normal</b> — an imaginary dotted line drawn perpendicular (at right angles) to the boundary between two media at the point where the ray crosses it. Angles of incidence and refraction are both measured from the normal, not the surface. When light travels from water (denser) to air (less dense), it bends away from the normal.' }),

  // ── Thermometer range (2021 NCE Phy Fig 1.3) ──────────────────────────────
  // Lab thermometer: scale runs from -10 to 110 °C.

  makeMCQ({ id: 'g9s-pdm-009', chapterId: 'g9s-p1-measurements', subsection: 'measuring_instruments', difficulty: 1,
    question: 'A laboratory thermometer is shown with markings from <b>-10 °C</b> at the left end to <b>110 °C</b> at the right end. What is the <b>range</b> of temperatures that can be measured using this thermometer?',
    options: [
      'From -10 °C to 110 °C',
      'From -10 °C to 100 °C',
      'From 0 °C to 110 °C',
      'From 0 °C to 100 °C'
    ],
    answer: 'From -10 °C to 110 °C',
    hint: 'Read the lowest and highest markings on the thermometer scale.',
    explanation: 'The range is from the <b>lowest marking (-10 °C) to the highest marking (110 °C)</b>. The range of a measuring instrument is the interval between its minimum and maximum readings. This thermometer can measure temperatures slightly below the freezing point of water (0 °C) and slightly above the boiling point (100 °C), making it suitable for most laboratory experiments.' }),

  // ── Parallax error in coin measurement (2021 NCE Phy Fig 3.1) ─────────────
  // Coin between two set-squares on a ruler; student's eye is not level.

  makeMCQ({ id: 'g9s-pdm-010', chapterId: 'g9s-p1-measurements', subsection: 'measurement_errors', difficulty: 2,
    question: 'A student measures the diameter of a coin using two set-squares and a ruler. However, the student\'s eye is <b>not directly opposite</b> the scale marking being read — the eye is above or to the side. What type of error does this cause?',
    options: ['Parallax error', 'Zero error', 'Systematic error', 'Random error'],
    answer: 'Parallax error',
    hint: 'The error is caused by viewing a scale from the wrong angle.',
    explanation: '<b>Parallax error</b> occurs when the observer\'s line of sight is not perpendicular to the scale being read. This causes the measured value to appear higher or lower than the true value. To avoid it, the student should place their eye <b>directly opposite</b> (at the same level as) the mark being read. To measure a coin diameter more accurately, a vernier calliper or micrometer screw gauge should be used.' }),

  // ── Bimetallic strip (2021 NCE Phy Fig 4.1A/B) ────────────────────────────
  // Copper on top, aluminium below. When heated, strip curves upward → contacts open.

  makeMCQ({ id: 'g9s-pdm-011', chapterId: 'g9s-p3-energy', subsection: 'thermal_expansion', difficulty: 2,
    question: 'A bimetallic strip in an electric iron has <b>copper</b> bonded on top and <b>aluminium</b> bonded below. At room temperature, the strip is straight and contacts are closed. When the iron is switched on and the strip is heated, the strip <b>curves upward</b> and the contacts open, switching off the heating element. Why does the strip curve upward?',
    options: [
      'Aluminium expands more than copper when heated',
      'Copper expands more than aluminium when heated',
      'Both metals expand equally so the strip stays straight',
      'The contacts push the strip upward mechanically'
    ],
    answer: 'Aluminium expands more than copper when heated',
    hint: 'The metal that expands more is on the side that becomes convex (outside of the bend).',
    explanation: '<b>Aluminium expands more than copper</b> when heated (it has a higher coefficient of linear expansion). Since the two metals are bonded together, when heated the aluminium strip becomes longer than the copper strip, forcing the strip to curve — with aluminium on the convex (outer/lower) side. This curves the strip upward, opening the contacts and disconnecting the circuit. When it cools, the strip straightens and contacts close again. This is how thermostats work.' }),

  // ── Pendulum oscillation path (2021 NCE Phy Fig 6.1) ─────────────────────
  // Positions: A (left extreme), B (bottom/centre), C (right extreme).
  // One full oscillation starting at B.

  makeMCQ({ id: 'g9s-pdm-012', chapterId: 'g9s-p4-motion', subsection: 'oscillations', difficulty: 2,
    question: 'A pendulum experiment shows three positions: <b>A</b> (left extreme), <b>B</b> (lowest/centre point), <b>C</b> (right extreme). The stopwatch is started when the bob passes through position B. What is the complete path of the bob in completing <b>one full oscillation</b>?',
    options: [
      'B → C → B → A → B',
      'B → C → B',
      'A → B → C',
      'A → B → A'
    ],
    answer: 'B → C → B → A → B',
    hint: 'One complete oscillation returns the bob to the same position travelling in the same direction.',
    explanation: 'Starting at <b>B</b> (bottom), one complete oscillation is: B → C (right extreme) → B (bottom) → A (left extreme) → B (bottom). This is one full back-and-forth swing. The time for one complete oscillation is the <b>time period (T)</b> of the pendulum. The bob passes through B twice per oscillation — once going right, once going left.' })

);

})();
