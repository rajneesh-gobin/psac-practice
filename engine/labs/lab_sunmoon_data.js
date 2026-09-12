'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Sun, Earth & Moon — Data (Grades 6 & 7)
//
//  ⚠ ALL the science lives here. lab_sunmoon.js only animates and draws it.
//    If a number or fact is wrong on screen, fix it HERE.
//  ⚠ Primary lab (LAB_SPEC §8): every guide, mission and discovery carries
//    `grades: [...]`. Scripts/test-labs-sunmoon-data.js verifies them all.
//  ⚠ Sources:
//    Grade 6: subjects/grade6-science/questions/ch08_g6_solar.js,
//              depth_hard.js (g6sc-hd-059 shadow length), g6sci-sol-007 Moon reflects,
//              g6sci-sol-006 axial tilt 23.5°, g6sci-sol-017 eclipses.
//    Grade 7: grade7-science/_manifest.js g7s-solar-system syllabus,
//              g7s-sts ("astronomy as a science", "role of satellites").
//    All facts verified against the relevant question files before inclusion.
// ══════════════════════════════════════════════
const LabSunmoonData = (() => {
  const GRADES = [6, 7];

  // ── Phase definitions ────────────────────────
  // Index 0 = new moon (Moon between Earth and Sun, moonAngle ≈ π).
  // Index 4 = full moon (moonAngle ≈ 0/2π).
  // `lit`: fraction of lit side visible from Earth (0–1), used for phase strip drawing.
  const PHASES = [
    { id: 'new',            name: 'New Moon',         icon: '🌑', lit: 0 },
    { id: 'wax_crescent',   name: 'Waxing Crescent',  icon: '🌒', lit: 0.25 },
    { id: 'first_quarter',  name: 'First Quarter',    icon: '🌓', lit: 0.5  },
    { id: 'wax_gibbous',    name: 'Waxing Gibbous',   icon: '🌔', lit: 0.75 },
    { id: 'full',           name: 'Full Moon',        icon: '🌕', lit: 1 },
    { id: 'wan_gibbous',    name: 'Waning Gibbous',   icon: '🌖', lit: 0.75 },
    { id: 'last_quarter',   name: 'Last Quarter',     icon: '🌗', lit: 0.5  },
    { id: 'wan_crescent',   name: 'Waning Crescent',  icon: '🌘', lit: 0.25 },
  ];

  // Compute phase index (0–7) from Moon angle.
  // moonAngle = π  → new moon (between Earth and Sun).
  // moonAngle = 0  → full moon (far side of Earth from Sun).
  function phaseIdxFromAngle(moonAngle) {
    const pa = (((moonAngle - Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    return Math.round(pa / (Math.PI / 4)) % 8;
  }

  // ── Filter helpers ───────────────────────────
  // Returns only items tagged for the given grade.
  function forGrade(list, g) {
    return list.filter(x => x.grades && x.grades.includes(Number(g)));
  }

  // ── Science facts for the 💡 button ─────────
  const FACTS = [
    { grades: [6, 7], text: 'The Sun is a star — a huge ball of hot gas that makes its own light and heat.' },
    { grades: [6, 7], text: 'The Moon has no light of its own. It reflects sunlight.' },
    { grades: [6, 7], text: 'Earth rotates on its axis once every 24 hours. That gives us day and night.' },
    { grades: [6, 7], text: 'Earth takes 365.25 days to orbit the Sun. We call that one year.' },
    { grades: [6, 7], text: 'Gravity keeps the Moon going around Earth, and Earth going around the Sun.' },
    { grades: [6],    text: 'Shadows are longest in the morning and evening when the Sun is low.' },
    { grades: [6],    text: 'At noon the Sun is at its highest, so shadows are at their shortest.' },
    { grades: [6],    text: 'A solar eclipse happens when the Moon passes in front of the Sun.' },
    { grades: [6],    text: 'A lunar eclipse happens when Earth\'s shadow falls on the Moon.' },
    { grades: [6],    text: 'The Moon\'s gravity pulls on the oceans. That is what causes tides.' },
    { grades: [7],    text: 'There are eight phases of the Moon, from new moon to full moon and back.' },
    { grades: [7],    text: 'Waxing means growing bigger. Waning means getting smaller.' },
    { grades: [7],    text: 'The Moon always shows the same face to Earth — this is called tidal locking.' },
    { grades: [7],    text: 'Earth\'s axis is tilted 23.5°. That tilt causes our seasons.' },
    { grades: [7],    text: 'The Moon\'s orbit is tilted 5° from Earth\'s orbit. That is why eclipses are rare.' },
    { grades: [7],    text: 'A lunar cycle — new moon to new moon — takes about 29.5 days.' },
  ];

  // ── Hazards ──────────────────────────────────
  const HAZARDS = {
    sun_gaze: {
      signs: ['eye', 'goggles'],
      title: () => 'Never look directly at the Sun',
      happened: () => 'You looked straight at the Sun without eye protection. The Sun\'s light damaged your eyes.',
      why: 'The Sun emits intense ultraviolet and infrared radiation. Even a short look can burn the retina permanently. Blindness can happen in seconds.',
      instead: 'Never look directly at the Sun. Use special eclipse glasses when watching a solar eclipse.',
      exam: 'The PSAC exam may ask why we must not look at the Sun. Answer: intense radiation can permanently damage the retina.',
    },
    eclipse_bare: {
      signs: ['eye', 'goggles'],
      title: () => 'Watching a solar eclipse without eclipse glasses is dangerous',
      happened: () => 'You watched the solar eclipse without proper glasses. The Sun\'s rays focused on your retina.',
      why: 'During a solar eclipse, the Sun\'s rays are still as harmful as usual — but we tend to stare longer. Even a partial eclipse can cause permanent eye damage.',
      instead: 'Use certified eclipse glasses (ISO 12312-2) or a pinhole camera. Never use ordinary sunglasses.',
      exam: 'PSAC and science exams ask what safety steps are needed when observing a solar eclipse.',
    },
  };

  // ── Result cards (wrong but safe) ────────────
  const RESULTS = {
    rotation_year: {
      icon: '🔄',
      title: 'Rotation is not the same as revolution',
      happened: () => 'You said Earth\'s rotation (spinning) causes the seasons. That is not quite right.',
      instead: 'Rotation (one spin every 24 hours) gives us day and night. Revolution (one orbit around the Sun every 365.25 days) — combined with Earth\'s 23.5° tilt — gives us the seasons.',
      exam: 'PSAC 2025 Q2b tested this exact difference. Rotation → day/night. Revolution → year/seasons.',
    },
    shadow_night: {
      icon: '🌙',
      title: 'No shadow at night — the Sun is on the other side',
      happened: () => 'You placed the shadow stick when the observer was in darkness. There is no shadow at night.',
      instead: 'The shadow stick only works when the Sun is above the horizon. Move Earth\'s spin so the observer is on the lit (day) side.',
      exam: 'PSAC science asks why shadows only appear during the day. The Sun must be above the horizon to cast a shadow.',
    },
  };

  // ── Discoveries ──────────────────────────────
  // `how` = list of guide tokens that unlock this discovery (used for the "Show me how" guide).
  // `grades` filters which grade sees this card.
  const DISCOVERIES = [
    // ─ Grade 6 ─
    { id: 'day_night',        grades: [6], icon: '🌓',
      title: 'Day and night',
      hint: 'Spin Earth. Watch the lit and dark sides change.',
      how: ['spin:on'],
      saw: 'One side of Earth faced the Sun and was bright. The other side faced away and was dark.',
      learn: 'Earth rotates on its axis once every 24 hours. The side facing the Sun has day; the side facing away has night.',
      psac: 'PSAC 2025 Q2b: Earth\'s rotation causes day and night. PSAC 2024 Q1 showed a diagram of this.' },
    { id: 'noon_shadow',      grades: [6], icon: '🌞',
      title: 'Shortest shadow at noon',
      hint: 'Turn on the shadow stick. Set the time to noon. Watch the shadow.',
      how: ['stick:on', 'time:noon'],
      saw: 'At noon the shadow was very short. The Sun was directly above — high in the sky.',
      learn: 'When the Sun is high, light hits the ground at a steep angle. The shadow is short. This is noon.',
      psac: 'g6sc-hd-059: a low sun casts a long shadow, a high sun a short one.' },
    { id: 'long_shadow',      grades: [6], icon: '🌅',
      title: 'Long shadows at sunrise and sunset',
      hint: 'Shadow stick on. Set the time to sunrise or sunset.',
      how: ['stick:on', 'time:sunrise'],
      saw: 'At sunrise and sunset the shadow stretched out very long. The Sun was low on the horizon.',
      learn: 'When the Sun is low, light hits the ground at a shallow angle. Objects cast very long shadows.',
      psac: 'g6sc-hd-059: why do shadows change length through the day? The Sun\'s height in the sky changes.' },
    { id: 'moon_reflects',    grades: [6], icon: '🌙',
      title: 'The Moon has no light of its own',
      hint: 'Orbit the Moon. Watch which side stays lit.',
      how: ['orbit:on'],
      saw: 'The same side of the Moon always faced the Sun, lit up. The other side stayed dark.',
      learn: 'The Moon does not make its own light. It reflects sunlight, like a mirror in space.',
      psac: 'g6sci-sol-007: true or false — the Moon produces its own light. False. It reflects sunlight.' },
    { id: 'solar_eclipse',    grades: [6], icon: '🌑',
      title: 'Solar eclipse — the Moon blocks the Sun',
      hint: 'Orbit the Moon until it lines up between Earth and Sun.',
      how: ['orbit:on', 'eclipse:solar'],
      saw: 'The Moon passed in front of the Sun. Its shadow fell on Earth. The Sun was blocked from that spot.',
      learn: 'A solar eclipse happens when the Moon passes between Earth and the Sun. The Moon casts its shadow on Earth.',
      psac: 'g6sci-sol-017: a solar eclipse occurs when the Moon passes between Earth and Sun.' },
    { id: 'lunar_eclipse',    grades: [6], icon: '🌕',
      title: 'Lunar eclipse — Earth\'s shadow on the Moon',
      hint: 'Orbit the Moon to the far side of Earth, opposite the Sun.',
      how: ['orbit:on', 'eclipse:lunar'],
      saw: 'Earth came between the Sun and the Moon. Earth\'s shadow fell on the Moon. It went dark.',
      learn: 'A lunar eclipse happens when Earth passes between the Sun and the Moon. Earth\'s shadow covers the Moon.',
      psac: 'g6sci-sol-017: a lunar eclipse = Earth\'s shadow falls on the Moon.' },
    { id: 'moon_orbit',       grades: [6], icon: '🔄',
      title: 'The Moon goes around Earth',
      hint: 'Orbit the Moon. Watch it travel around Earth.',
      how: ['orbit:on'],
      saw: 'The Moon travelled in a circle around Earth, going round and round.',
      learn: 'The Moon orbits Earth in about 28 days. Gravity keeps it on its curved path.',
      psac: 'g6sci-sol-016: the Moon takes approximately 28 days to orbit the Earth.' },
    { id: 'gravity_orbit',    grades: [6], icon: '🪐',
      title: 'Gravity holds the Moon in orbit',
      hint: 'Orbit the Moon. The same force that keeps us on the ground keeps the Moon going in a circle.',
      how: ['orbit:on'],
      saw: 'The Moon kept going round Earth without flying off. Gravity was pulling it toward Earth.',
      learn: 'Gravity is the pull between objects with mass. The Moon is pulled toward Earth and Earth toward the Sun. Without gravity, they would fly off in straight lines.',
      psac: 'g6sci-sol-009: the force that keeps planets in orbit around the Sun is gravity.' },
    { id: 'eclipse_new_moon', grades: [6], icon: '🌑',
      title: 'Solar eclipses only happen at new moon',
      hint: 'Orbit the Moon. A solar eclipse can only happen when the Moon is between Earth and the Sun.',
      how: ['orbit:on', 'eclipse:solar'],
      saw: 'The Moon was in the "new moon" position — between Earth and Sun — when the solar eclipse happened.',
      learn: 'A solar eclipse needs the Moon to be in front of the Sun. That only happens at new moon, when the Moon is on the Sun\'s side of Earth.',
      psac: 'PSAC may ask: why does a solar eclipse happen only at certain times of the month?' },
    { id: 'tides',            grades: [6], icon: '🌊',
      title: 'The Moon\'s gravity causes tides',
      hint: 'Orbit the Moon. Its gravity pulls on Earth\'s oceans.',
      how: ['orbit:on'],
      saw: 'As the Moon orbited Earth, the side of Earth nearest the Moon experienced a gravitational tug.',
      learn: 'The Moon\'s gravity pulls on Earth\'s oceans. The sea on the Moon\'s side bulges outward — that is high tide. This pull is why we have tides twice a day.',
      psac: 'PSAC science may ask what causes tides. The Moon\'s gravitational pull on the oceans.' },
    { id: 'year_orbit',       grades: [6], icon: '📅',
      title: 'A year is one orbit of Earth around the Sun',
      hint: 'Earth takes 365.25 days to travel all the way around the Sun.',
      how: ['spin:on'],
      saw: 'Earth kept rotating on its axis as it moved around the Sun. One full orbit takes 365.25 days.',
      learn: 'One year is the time Earth takes to orbit the Sun completely. That is 365.25 days — about 365 days, with a leap year every 4 years.',
      psac: 'g6sci-sol-005: Earth completes one orbit around the Sun in 365 days (1 year).' },
    { id: 'eclipse_full_moon', grades: [6], icon: '🌕',
      title: 'Lunar eclipses only happen at full moon',
      hint: 'Orbit the Moon to the full moon position for a lunar eclipse.',
      how: ['orbit:on', 'eclipse:lunar'],
      saw: 'The Moon was at full moon — opposite the Sun — when the lunar eclipse happened.',
      learn: 'A lunar eclipse needs Earth between the Sun and the Moon. That only happens at full moon, when Moon is on the far side of Earth from the Sun.',
      psac: 'PSAC may ask: at which moon phase can a lunar eclipse happen? Full moon.' },

    // ─ Grade 7 ─
    { id: 'eight_phases',     grades: [7], icon: '🌙',
      title: 'Eight phases of the Moon',
      hint: 'Tap Next Phase eight times. Watch the Moon\'s shape change.',
      how: ['orbit:off', 'phase:1', 'phase:2', 'phase:3', 'phase:4', 'phase:5', 'phase:6', 'phase:7', 'phase:0'],
      saw: 'The Moon went through eight shapes: new, crescent, quarter, gibbous, full, gibbous, quarter, crescent, new again.',
      learn: 'There are eight lunar phases. Waxing means the lit part grows. Waning means it shrinks. A full cycle takes about 29.5 days.',
      psac: 'g6sci-sol-008: the Moon appears to change shape because we see different parts lit by the Sun.' },
    { id: 'waxing_waning',    grades: [7], icon: '📈',
      title: 'Waxing and waning',
      hint: 'Step through phases 1 to 4 (waxing), then 5 to 7 (waning).',
      how: ['orbit:off', 'phase:1', 'phase:2', 'phase:3', 'phase:4', 'phase:5', 'phase:6'],
      saw: 'After new moon the lit part grew (waxing) until full moon, then shrank (waning) until new moon again.',
      learn: 'Waxing means getting bigger. Waning means getting smaller. The lit fraction grows from new moon to full, then shrinks from full back to new.',
    },
    { id: 'tidal_locking',    grades: [7], icon: '🔒',
      title: 'Tidal locking — same face always',
      hint: 'Orbit the Moon. Notice the same side of the Moon always faces Earth.',
      how: ['orbit:on'],
      saw: 'As the Moon went around Earth, the same side always faced toward Earth. The far side was never visible.',
      learn: 'The Moon rotates on its own axis in exactly the same time it orbits Earth — about 28 days. This is tidal locking. It means we always see the same face of the Moon.',
    },
    { id: 'axial_tilt',       grades: [7], icon: '🌍',
      title: 'Earth\'s 23.5° tilt causes seasons',
      hint: 'Observe how Earth\'s axis tilts toward and away from the Sun at different points in its orbit.',
      how: ['spin:on'],
      saw: 'Earth\'s axis was not straight up and down — it leaned at 23.5°. As Earth moved around the Sun, different hemispheres tilted toward the Sun at different times.',
      learn: 'Earth\'s axis is tilted 23.5°. When a hemisphere tilts toward the Sun, it gets more direct sunlight and has summer. Six months later it tilts away — winter.',
      psac: 'g6sci-sol-006: Earth\'s axis is tilted 23.5°. This tilt, as Earth orbits, causes the seasons.' },
    { id: 'mauritius_summer', grades: [7], icon: '☀️',
      title: 'When does Mauritius have summer?',
      hint: 'Watch when the Southern Hemisphere tilts toward the Sun.',
      how: ['spin:on'],
      saw: 'When the Southern Hemisphere tilted toward the Sun (November–March), Mauritius received more direct sunlight.',
      learn: 'Mauritius is in the Southern Hemisphere. When it tilts toward the Sun (November–March), Mauritius has summer. When it tilts away (June–August), it has winter.',
      psac: 'g6sci-sol-018: in Mauritius, the hottest months are November to March — the Southern Hemisphere summer.' },
    { id: 'eclipse_tilt',     grades: [7], icon: '🔭',
      title: 'Why eclipses don\'t happen every month',
      hint: 'The Moon\'s orbit is tilted 5° from Earth\'s orbital plane.',
      how: ['orbit:on'],
      saw: 'The Moon usually passed above or below the Earth-Sun line rather than exactly through it. Only occasionally did it line up for an eclipse.',
      learn: 'The Moon\'s orbit is tilted about 5° from Earth\'s orbit around the Sun. Most months the Moon misses the exact line needed for an eclipse. Eclipses are rare for this reason.',
      psac: 'g6sc-hd-076: why is a solar eclipse visible from only a narrow strip? The Moon\'s shadow is small — but also eclipses need precise alignment.' },
    { id: 'eclipse_strip',    grades: [7], icon: '🗺️',
      title: 'The eclipse shadow covers a narrow strip',
      hint: 'Position the Moon for a solar eclipse. Watch how small the shadow on Earth is.',
      how: ['orbit:on', 'eclipse:solar'],
      saw: 'The Moon\'s shadow fell on only a small patch of Earth\'s surface. Only people in that patch saw a total eclipse.',
      learn: 'The Moon is much smaller than Earth. Its full shadow (umbra) covers only a narrow strip — a few hundred kilometres wide. Outside it, people see a partial eclipse.',
      psac: 'g6sc-hd-076: the Moon\'s full shadow covers only a small area on Earth.' },
    { id: 'synodic_month',    grades: [7], icon: '📆',
      title: 'A lunar cycle is 29.5 days',
      hint: 'Cycle through all 8 phases and back to new moon.',
      how: ['orbit:off', 'phase:1', 'phase:2', 'phase:3', 'phase:4', 'phase:5', 'phase:6', 'phase:7', 'phase:0'],
      saw: 'After going through all eight phases, the Moon returned to new moon. This full cycle takes about 29.5 days.',
      learn: 'The time from one new moon to the next is about 29.5 days — called the synodic month. This is slightly longer than the Moon\'s 27.3-day orbit because Earth also moves around the Sun during that time.',
    },
    { id: 'sidereal_month',   grades: [7], icon: '⏱️',
      title: 'The Moon\'s orbit takes 27.3 days',
      hint: 'The Moon\'s actual orbit of Earth is 27.3 days, but the cycle of phases takes 29.5 days.',
      how: ['orbit:on'],
      saw: 'The Moon completed a full orbit around Earth. Its orbital period is 27.3 days.',
      learn: 'The Moon orbits Earth in 27.3 days (sidereal month). But a full phase cycle takes 29.5 days because Earth also moves around the Sun, so the Moon needs extra time to catch up to the same Sun-Moon-Earth angle.',
      psac: 'g6sci-sol-016: the Moon takes approximately 27.3–28 days to orbit Earth.' },
    { id: 'full_moon_lunar',  grades: [7], icon: '🌕',
      title: 'Lunar eclipses — full moon only',
      hint: 'Orbit the Moon to the full moon position and trigger a lunar eclipse.',
      how: ['orbit:on', 'eclipse:lunar'],
      saw: 'Earth\'s shadow covered the Moon only when it was at full moon — directly behind Earth from the Sun.',
      learn: 'For a lunar eclipse, Earth must be between Sun and Moon in a straight line. That alignment is only possible at full moon.',
    },
    { id: 'eclipse_new_moon7', grades: [7], icon: '🌑',
      title: 'Solar eclipses — new moon only',
      hint: 'Orbit the Moon to the new moon position and trigger a solar eclipse.',
      how: ['orbit:on', 'eclipse:solar'],
      saw: 'The Moon could only block the Sun when it was at new moon — directly in front of Earth from the Sun.',
      learn: 'For a solar eclipse, the Moon must be between Earth and the Sun. That only happens at new moon.',
    },
    { id: 'phases_cause',     grades: [7], icon: '💡',
      title: 'Why the Moon has phases',
      hint: 'Step through phases. The Moon\'s lit half always faces the Sun — we just see different amounts of it.',
      how: ['orbit:off', 'phase:1', 'phase:2', 'phase:3', 'phase:4'],
      saw: 'As the Moon moved around Earth, we saw different portions of its sunlit half from Earth.',
      learn: 'The Moon is always half lit by the Sun. As it orbits Earth, we see different amounts of that lit half — those are the phases. At new moon we see none; at full moon we see all of it.',
      psac: 'g6sci-sol-008: phases occur because we see different parts of the Moon\'s lit half.' },
  ];

  // ── Guided experiments ────────────────────────
  // `on` tokens:
  //   spin:on / spin:off      — toggle Earth spinning
  //   orbit:on / orbit:off    — toggle Moon orbiting
  //   stick:on / stick:off    — toggle shadow stick
  //   time:sunrise / time:noon / time:sunset — set observer time
  //   eclipse:solar / eclipse:lunar — position Moon for eclipse
  //   phase:0…7              — advance Moon to that phase (manual button)
  //   observe                — tap "Observe" button
  //   reset                  — tap Reset
  const GUIDES = [
    // ─ Grade 6 ─────────────────────────────────
    { id: 'day_night_guide', icon: '🌓', grades: [6],
      title: 'Why do we have day and night?',
      blurb: 'Spin Earth and watch the lit and dark sides.',
      lesson: 'Earth rotates on its axis once every 24 hours. The side facing the Sun has day. The other side has night. As Earth turns, places move through day and night.',
      steps: [
        { on: 'spin:on',  say: 'Tap 🌍 Spin Earth — watch Earth turn.' },
        { on: 'observe',  say: 'Tap 👁 Observe to label the day and night sides.' },
        { on: 'spin:off', say: 'Tap ⏸ Spin Earth again to stop. Where is Mauritius?' },
      ] },
    { id: 'shadow_guide', icon: '📏', grades: [6],
      title: 'Shadows through the day',
      blurb: 'Place a shadow stick on Earth. Watch the shadow change.',
      lesson: 'Shadows are longest in the morning and evening when the Sun is low in the sky. At noon, when the Sun is highest, shadows are at their shortest.',
      steps: [
        { on: 'stick:on',     say: 'Tap 📏 Shadow Stick to place a stick on Earth.' },
        { on: 'time:sunrise', say: 'Tap 🌅 Set to Sunrise — see how long the shadow is.' },
        { on: 'time:noon',    say: 'Tap 🌞 Set to Noon — watch the shadow shorten.' },
        { on: 'time:sunset',  say: 'Tap 🌇 Set to Sunset — the shadow is long again.' },
      ] },
    { id: 'solar_eclipse_guide', icon: '🌑', grades: [6],
      title: 'Solar eclipse — the Moon blocks the Sun',
      blurb: 'Orbit the Moon between Earth and the Sun.',
      lesson: 'A solar eclipse happens when the Moon passes exactly between Earth and the Sun. The Moon\'s shadow falls on a small patch of Earth. People in that patch cannot see the Sun for a short time.',
      steps: [
        { on: 'orbit:on',      say: 'Tap 🌙 Orbit Moon to start the Moon moving.' },
        { on: 'eclipse:solar', say: 'Tap 🌑 Solar Eclipse Position — watch the shadow on Earth.' },
        { on: 'observe',       say: 'Tap 👁 Observe to record what you see.' },
      ] },

    // ─ Grade 7 ─────────────────────────────────
    { id: 'phases_guide', icon: '🌙', grades: [7],
      title: 'The eight phases of the Moon',
      blurb: 'Step through all eight shapes of the Moon.',
      lesson: 'There are eight lunar phases. Waxing means the lit part is growing (new → full). Waning means the lit part is shrinking (full → new). The cycle takes about 29.5 days.',
      steps: [
        { on: 'orbit:off', say: 'Tap ⏸ Orbit Moon to stop it — now you can step through phases.' },
        { on: 'phase:1',   say: 'Tap ▶ Next Phase — waxing crescent.' },
        { on: 'phase:2',   say: 'Tap ▶ Next Phase — First Quarter, half lit.' },
        { on: 'phase:3',   say: 'Tap ▶ Next Phase — waxing gibbous.' },
        { on: 'phase:4',   say: 'Tap ▶ Next Phase — Full Moon!' },
        { on: 'phase:5',   say: 'Tap ▶ Next Phase — waning gibbous.' },
        { on: 'phase:6',   say: 'Tap ▶ Next Phase — Last Quarter.' },
        { on: 'phase:7',   say: 'Tap ▶ Next Phase — waning crescent.' },
        { on: 'phase:0',   say: 'Tap ▶ Next Phase — back to New Moon. One cycle complete!' },
      ] },
    { id: 'lunar_eclipse_guide', icon: '🌕', grades: [7],
      title: 'Lunar eclipse — Earth\'s shadow on the Moon',
      blurb: 'Move the Moon to the far side of Earth.',
      lesson: 'A lunar eclipse happens when Earth comes between the Sun and the Moon. Earth\'s shadow falls on the Moon, making it go dark. Lunar eclipses only happen at full moon.',
      steps: [
        { on: 'orbit:on',       say: 'Tap 🌙 Orbit Moon to move it.' },
        { on: 'eclipse:lunar',  say: 'Tap 🌕 Lunar Eclipse Position — Earth\'s shadow covers the Moon.' },
        { on: 'observe',        say: 'Tap 👁 Observe to see the darkened Moon.' },
      ] },
    { id: 'tidal_locking_guide', icon: '🔒', grades: [7],
      title: 'Tidal locking — one face always shown',
      blurb: 'Orbit the Moon and see that the same face always points to Earth.',
      lesson: 'The Moon takes about 28 days to orbit Earth. It also rotates once in 28 days. These match perfectly, so the same face always points toward Earth. This is called tidal locking. We have never seen the Moon\'s far side from Earth.',
      steps: [
        { on: 'orbit:on',  say: 'Tap 🌙 Orbit Moon to start it moving.' },
        { on: 'observe',   say: 'Tap 👁 Observe — does the marked face always point to Earth?' },
        { on: 'orbit:off', say: 'Tap ⏸ Stop Orbit — the Moon orbited once and rotated once. They match!' },
      ] },
  ];

  // ── Missions ──────────────────────────────────
  // First option in each `options` array is the correct answer.
  // The quiz shuffles them.
  const MISSIONS = [
    {
      id: 'shadow_detective', icon: '🔦', grades: [6],
      title: 'Shadow detective', rig: 'shadow',
      blurb: 'Set up the shadow stick, observe at three times of day, and answer the questions.',
      intro: 'Turn on the shadow stick. Set the time to sunrise, noon and sunset. Record what the shadow looks like. Then answer the questions.',
      quiz: [
        { q: 'When is an outdoor shadow shortest?',
          options: ['At noon, when the Sun is highest', 'At sunrise, when the Sun is low', 'At sunset, when the Sun is low', 'At midnight, when there is no Sun'],
          why: 'g6sc-hd-059: a high Sun casts a short shadow. The Sun is highest at noon.' },
        { q: 'What makes shadows change length through the day?',
          options: ['The Sun\'s height in the sky changes', 'The stick grows taller in the heat', 'Clouds cover part of the Sun', 'The Earth moves closer to the Sun'],
          why: 'As Earth rotates, the Sun appears to move higher and lower in the sky. That changes the shadow length.' },
        { q: 'Why is there no shadow at night?',
          options: ['The Sun is not above the horizon, so no light reaches the stick', 'The stick disappears at night', 'The Moon blocks all the light', 'Shadows only appear on sunny days'],
          why: 'A shadow needs a light source. At night, the Sun is below the horizon and there is no direct sunlight.' },
        { q: 'At sunrise in Mauritius, where does the Sun appear on the horizon?',
          options: ['In the east', 'In the west', 'In the north', 'In the south'],
          why: 'The Sun always rises in the east. This is because Earth rotates from west to east.' },
        { q: 'Why do shadows at sunset and sunrise point in opposite directions?',
          options: ['The Sun is on opposite sides — east at sunrise, west at sunset', 'The stick moves as the temperature changes', 'The Moon reflects different light at each time', 'Earth has stopped rotating by sunset'],
          why: 'Shadows always point away from the Sun. At sunrise the Sun is in the east, so shadows point west. At sunset the Sun is in the west, so shadows point east.' },
      ],
    },
    {
      id: 'eclipse_spotter', icon: '🔭', grades: [6],
      title: 'Eclipse spotter', rig: 'eclipse',
      blurb: 'Trigger both types of eclipse and answer the exam questions.',
      intro: 'Orbit the Moon and move it to the solar eclipse position, then the lunar eclipse position. Watch carefully what happens.',
      quiz: [
        { q: 'A solar eclipse happens when:',
          options: ['The Moon passes between Earth and the Sun', 'Earth passes between the Sun and the Moon', 'The Sun passes between Earth and the Moon', 'The Moon goes behind Earth'],
          why: 'g6sci-sol-017: a solar eclipse = Moon between Earth and Sun. The Moon blocks the Sun from Earth.' },
        { q: 'A lunar eclipse happens when:',
          options: ['Earth passes between the Sun and the Moon', 'The Moon passes between Earth and the Sun', 'The Sun passes behind Earth', 'The Moon turns off its light'],
          why: 'g6sci-sol-017: a lunar eclipse = Earth between Sun and Moon. Earth\'s shadow falls on the Moon.' },
        { q: 'Why must you never look directly at a solar eclipse without eclipse glasses?',
          options: ['The Sun\'s radiation can permanently damage your eyes', 'It brings bad luck in many cultures', 'The Moon\'s light is too bright at that point', 'Your shadow might frighten you'],
          why: 'The Sun emits intense radiation. Even a short look can burn the retina permanently, causing blindness.' },
        { q: 'Why do solar eclipses not happen every month?',
          options: ['The Moon\'s orbit is tilted, so it usually misses the exact line', 'The Sun moves away from Earth each month', 'The Moon is too far away to block the Sun', 'Eclipses need special weather conditions'],
          why: 'The Moon\'s orbit is tilted about 5° from Earth\'s orbital plane. Most months the Moon passes above or below the Sun-Earth line.' },
        { q: 'Which phase of the Moon happens during a solar eclipse?',
          options: ['New moon', 'Full moon', 'First quarter', 'Last quarter'],
          why: 'A solar eclipse needs the Moon in front of the Sun. The Moon is between Earth and the Sun only at new moon.' },
      ],
    },

    {
      id: 'phase_tracker', icon: '🌙', grades: [7],
      title: 'Phase tracker', rig: 'phases',
      blurb: 'Step through all eight moon phases and answer the questions.',
      intro: 'Turn off the orbit. Use Next Phase to step through all eight phases. Name each one as it appears.',
      quiz: [
        { q: 'What phase of the Moon comes after First Quarter?',
          options: ['Waxing Gibbous', 'Full Moon', 'Waxing Crescent', 'Waning Gibbous'],
          why: 'The order is: new → waxing crescent → first quarter → waxing gibbous → full.' },
        { q: 'What does "waning" mean when we talk about the Moon?',
          options: ['The lit part is getting smaller', 'The lit part is getting bigger', 'The Moon is getting closer to Earth', 'The Moon is spinning faster'],
          why: 'Waxing = growing. Waning = shrinking. After full moon, the lit part we see shrinks — the Moon is waning.' },
        { q: 'How long does a complete lunar cycle take (new moon back to new moon)?',
          options: ['About 29.5 days', 'About 7 days', 'About 14 days', 'About 365 days'],
          why: 'The synodic month (new moon to new moon) is about 29.5 days. This is why we have roughly 12 lunar months in a year.' },
        { q: 'Why do we always see the same face of the Moon from Earth?',
          options: ['The Moon rotates once in the same time it orbits Earth (tidal locking)', 'The Moon does not rotate at all', 'Earth\'s atmosphere bends the light', 'The Moon is too far away to see the other face'],
          why: 'Tidal locking: the Moon\'s rotation period equals its orbital period (~28 days). Both motions match, keeping the same face toward Earth always.' },
        { q: 'At which phase could a lunar eclipse happen?',
          options: ['Full moon', 'New moon', 'First quarter', 'Waxing crescent'],
          why: 'A lunar eclipse needs Earth between Sun and Moon in a straight line. This only happens when the Moon is on the far side of Earth — full moon.' },
      ],
    },
    {
      id: 'seasons_explorer', icon: '🌍', grades: [7],
      title: 'Seasons explorer', rig: 'seasons',
      blurb: 'Observe Earth\'s tilt and explain the seasons.',
      intro: 'Watch how Earth\'s 23.5° tilt causes different hemispheres to receive more sunlight at different times of the year.',
      quiz: [
        { q: 'What is the main cause of Earth\'s seasons?',
          options: ['Earth\'s axis is tilted 23.5° as it orbits the Sun', 'Earth moves closer to the Sun in summer', 'The Sun produces more heat in summer', 'Earth spins faster in summer'],
          why: 'g6sci-sol-006: Earth\'s 23.5° axial tilt causes seasons. Distance to the Sun is NOT the main cause.' },
        { q: 'When is it summer in Mauritius?',
          options: ['November to March, when the Southern Hemisphere tilts toward the Sun', 'June to August, when the Northern Hemisphere has summer', 'December, because that is the hottest month everywhere', 'April to June, the middle of the year'],
          why: 'g6sci-sol-018: when the Southern Hemisphere tilts toward the Sun (November–March), Mauritius has summer.' },
        { q: 'What is the angle of Earth\'s axial tilt?',
          options: ['23.5°', '45°', '90°', '0° (not tilted)'],
          why: 'g6sci-sol-006: Earth\'s axis is tilted 23.5° from the vertical. This tilt is the reason for the seasons.' },
        { q: 'When Mauritius has summer, what season is it in France (Northern Hemisphere)?',
          options: ['Winter', 'Summer', 'Spring', 'Autumn'],
          why: 'When the Southern Hemisphere tilts toward the Sun (Mauritius summer), the Northern Hemisphere tilts away → winter in France.' },
        { q: 'How many days does Earth take to orbit the Sun once?',
          options: ['365.25 days', '28 days', '24 hours', '12 months exactly'],
          why: 'g6sci-sol-005: Earth takes 365.25 days to orbit the Sun. The extra 0.25 day gives us a leap year every 4 years.' },
      ],
    },
  ];

  // Helper: mission is ready when student has done the required setup.
  // Accepts a state object from the bench.
  function missionReady(id, state) {
    if (id === 'shadow_detective') return state.stickObserved >= 2;
    if (id === 'eclipse_spotter') return state.solarSeen && state.lunarSeen;
    if (id === 'phase_tracker')   return state.phasesVisited && state.phasesVisited.size >= 8;
    if (id === 'seasons_explorer') return state.spinning;
    return false;
  }

  // ── Discovery auto-unlock from state ─────────
  // Called by bench after each state change to check what new discoveries to award.
  function finds(state) {
    const g = Number(state.grade);
    const out = [];
    const { spinning, orbiting, stickOn, eclipseType, phasesVisited, stickObserved, moonAngle } = state;
    if (spinning) {
      out.push('day_night');
      out.push('year_orbit');
      if (g >= 7) { out.push('axial_tilt'); out.push('mauritius_summer'); }
    }
    if (stickOn && stickObserved >= 1 && state.observeTime === 'noon')    out.push('noon_shadow');
    if (stickOn && stickObserved >= 1 && state.observeTime !== 'noon')    out.push('long_shadow');
    if (stickOn && !state.dayTime) out.push('shadow_night');   // result card, not discovery
    if (orbiting) {
      out.push('moon_reflects');
      out.push('moon_orbit');
      out.push('gravity_orbit');
      out.push('tides');
      if (g >= 7) { out.push('tidal_locking'); out.push('sidereal_month'); }
    }
    if (eclipseType === 'solar') {
      out.push('solar_eclipse');
      out.push('eclipse_new_moon');
      if (g >= 7) { out.push('eclipse_strip'); out.push('eclipse_tilt'); out.push('eclipse_new_moon7'); }
    }
    if (eclipseType === 'lunar') {
      out.push('lunar_eclipse');
      out.push('eclipse_full_moon');
      if (g >= 7) { out.push('full_moon_lunar'); }
    }
    if (g >= 7 && phasesVisited) {
      if (phasesVisited.size >= 4) out.push('waxing_waning');
      if (phasesVisited.size >= 8) { out.push('eight_phases'); out.push('synodic_month'); out.push('phases_cause'); }
    }
    return out;
  }

  return {
    GRADES, PHASES, FACTS, HAZARDS, RESULTS, DISCOVERIES, GUIDES, MISSIONS,
    phaseIdxFromAngle, forGrade, finds, missionReady,
  };
})();
if (typeof window !== 'undefined') window.LabSunmoonData = LabSunmoonData;
