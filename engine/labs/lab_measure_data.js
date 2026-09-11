'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the physics behind the Measurement Lab (NCE Grade 9, P1).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE DRAWING. Every true value, every
//    instrument's precision and range, how each scale is read, every mistake
//    and what it reads as - all of it is decided in this file. lab_measure.js
//    only draws the scale where this file says it is and asks judge() whether
//    a typed reading is right. If a reading looks wrong on screen, fix it HERE.
//  ⚠ Grounded in the live chapter g9s-p1-measurements (subsections si_units,
//    measuring_instruments, accuracy_of_instruments, measurement_errors) and
//    the paper shapes in docs/nce-grade9/blueprint-science.md: Physics 2023
//    Q2(a) mark main scale M / vernier scale V; Physics 2022 Q3(c) read a
//    vernier; Physics 2022 Q3(a)(i) read a measuring cylinder; Physics 2021
//    Q3(b)(i) and 2023 Q2(d) name the type of error; Physics 2021 Q6(b)
//    improve the accuracy of a measurement.
//  ⚠ Every true value is chosen so that the nearest mark is never in doubt
//    (at least 0.2 of a division away from half-way). The drawing puts the
//    object at its TRUE size, so a pupil who reads to the nearest division
//    gets exactly one right answer. scripts/test-labs-measure-data.js fails if
//    a value drifts towards half a division.
//
//  Length values are stored in mm to 0.01 mm; each instrument turns them into
//  its own unit (cm for the rule and vernier, mm for the micrometer).
// ══════════════════════════════════════════════
const LabMeasureData = (() => {

  const QUANTITIES = {
    length: { name: 'length',      si: 'metre',        sym: 'm',  lab: 'cm and mm' },
    mass:   { name: 'mass',        si: 'kilogram',     sym: 'kg', lab: 'g' },
    volume: { name: 'volume',      si: 'cubic metre',  sym: 'm³', lab: 'cm³' },
    time:   { name: 'time',        si: 'second',       sym: 's',  lab: 's' },
    temp:   { name: 'temperature', si: 'kelvin',       sym: 'K',  lab: '°C' },
  };

  // kind      which drawing and which reading rule
  // unit/step what the pupil types, and the smallest step the scale can read
  // zero      zero error IN THE TYPED UNIT (cm for a caliper, g for the balance)
  const INSTRUMENTS = {
    rule:         { kind: 'rule',       name: 'Metre rule',              short: 'Metre rule',   icon: '📏', group: 'length', quantity: 'length', unit: 'cm', step: 0.1,  dp: 1, maxMm: 1000,
                    prec: '0.1 cm (1 mm)', meta: 'Reads to 1 mm · one end is worn',
                    how: 'Line the object up with a clear mark, read the mark nearest its far end, then subtract the starting mark.' },
    vernier:      { kind: 'vernier',    name: 'Vernier caliper',         short: 'Vernier',      icon: '🔧', group: 'length', quantity: 'length', unit: 'cm', step: 0.01, dp: 2, maxMm: 150, zero: 0,
                    prec: '0.01 cm (0.1 mm)', meta: 'Reads to 0.1 mm',
                    how: 'Main scale: the mark just BEFORE the vernier zero. Vernier: the division that lines up best with a main-scale mark, × 0.01 cm. Add them.' },
    vernier_old:  { kind: 'vernier',    name: 'Old vernier caliper A',   short: 'Old caliper A', icon: '🔧', group: 'length', quantity: 'length', unit: 'cm', step: 0.01, dp: 2, maxMm: 150, zero: 0.03, worn: true,
                    prec: '0.01 cm (0.1 mm)', meta: 'A worn jaw - check its zero first',
                    how: 'Close the jaws first and read the zero error. Then true reading = scale reading − zero error.' },
    vernier_bent: { kind: 'vernier',    name: 'Old vernier caliper B',   short: 'Old caliper B', icon: '🔧', group: 'length', quantity: 'length', unit: 'cm', step: 0.01, dp: 2, maxMm: 150, zero: -0.02, worn: true,
                    prec: '0.01 cm (0.1 mm)', meta: 'A bent jaw - check its zero first',
                    how: 'Close the jaws first. If the vernier zero sits LEFT of the main-scale zero, the zero error is negative.' },
    micrometer:   { kind: 'micrometer', name: 'Micrometer screw gauge',  short: 'Micrometer',   icon: '🗜️', group: 'length', quantity: 'length', unit: 'mm', step: 0.01, dp: 2, maxMm: 25, zero: 0,
                    prec: '0.01 mm', meta: 'Reads to 0.01 mm · opens to 25 mm',
                    how: 'Sleeve: the last mark showing (a mark below the line adds 0.5 mm). Thimble: the division on the line, × 0.01 mm. Add them.' },
    cylinder:     { kind: 'cylinder',   name: 'Measuring cylinder',      short: 'Cylinder',     icon: '🧪', group: 'other', quantity: 'volume', unit: 'cm³', step: 1, dp: 0, max: 100,
                    prec: '1 cm³', meta: '100 cm³ · 1 cm³ divisions',
                    how: 'Eye level with the liquid. Read the BOTTOM of the meniscus.' },
    stopwatch:    { kind: 'stopwatch',  name: 'Stopwatch',               short: 'Stopwatch',    icon: '⏱️', group: 'other', quantity: 'time', unit: 's', step: 1, dp: 0,
                    prec: '1 s on this dial', meta: 'Minute dial + second hand',
                    how: 'Minutes from the small dial, seconds from the big hand. Time in seconds = minutes × 60 + seconds.' },
    thermometer:  { kind: 'thermometer', name: 'Laboratory thermometer', short: 'Thermometer',  icon: '🌡️', group: 'other', quantity: 'temp', unit: '°C', step: 1, dp: 0, min: -10, max: 110,
                    prec: '1 °C · range −10 to 110 °C', meta: '−10 °C to 110 °C',
                    how: 'Read the mark level with the top of the red thread, with your eye level with it.' },
    clinical:     { kind: 'thermometer', name: 'Clinical thermometer',   short: 'Clinical',     icon: '🌡️', group: 'other', quantity: 'temp', unit: '°C', step: 0.1, dp: 1, min: 35, max: 42,
                    prec: '0.1 °C · range 35 to 42 °C', meta: 'Glass · 35 °C to 42 °C only',
                    how: 'Each small mark is 0.1 °C. Count the small marks past the last whole degree.' },
    balance:      { kind: 'balance',    name: 'Electronic balance',      short: 'Balance',      icon: '⚖️', group: 'other', quantity: 'mass', unit: 'g', step: 0.1, dp: 1, max: 200, zero: 0.4,
                    prec: '0.1 g', meta: 'Reads to 0.1 g · check the empty reading',
                    how: 'Check the empty reading first. Press Zero (tare) so it reads 0.0 g, then put the object on.' },
  };

  // What there is to measure. One value per quantity it can be measured for.
  // `for` limits a specimen to the instruments listed (the "nothing" setting).
  const SPECIMENS = {
    coin:     { icon: '🪙', name: 'Coin',          length: 23.72, mass: 7.9,  label: { length: 'the diameter of a coin', mass: 'the mass of a coin' }, color: '#C9A227' },
    marble:   { icon: '🔵', name: 'Glass marble',  length: 15.81, mass: 5.2,  label: { length: 'the diameter of a glass marble', mass: 'the mass of a glass marble' }, color: '#6FB7D8' },
    rod:      { icon: '🔩', name: 'Metal rod',     length: 12.18,             label: { length: 'the diameter of a metal rod' }, color: '#9AA5AE' },
    pencil:   { icon: '✏️', name: 'Pencil',        length: 163.2,             label: { length: 'the length of a pencil' }, color: '#F2C230' },
    wire:     { icon: '〰️', name: 'Copper wire',   length: 0.92,              label: { length: 'the diameter of a copper wire' }, color: '#C0693A' },
    paper:    { icon: '📄', name: 'Sheet of paper', length: 0.11,             label: { length: 'the thickness of a sheet of paper' }, color: '#F4F4EE' },
    closed:   { icon: '🤏', name: 'Nothing',       length: 0, mass: 0, for: ['vernier', 'vernier_old', 'vernier_bent', 'micrometer', 'balance'],
                label: { length: 'nothing - the jaws closed', mass: 'nothing - the empty pan' }, color: '#FFFFFF' },
    water:    { icon: '💧', name: 'Water',         volume: 64,                label: { volume: 'the volume of water in the cylinder' }, color: '#AFD5EA' },
    stone:    { icon: '🪨', name: 'Stone',         volume: 13, mass: 38.6, before: 50,
                label: { volume: 'the volume of a stone (by displacement)', mass: 'the mass of a stone' }, color: '#7D7A73' },
    pendulum: { icon: '🕰️', name: 'Pendulum',      time: 16, swings: 10, speed: 2, label: { time: 'the time for 10 swings of a pendulum' } },
    kettle:   { icon: '♨️', name: 'Water heating', time: 200, speed: 25,      label: { time: 'the time for water on a hot plate to boil' } },
    ice:      { icon: '🧊', name: 'Melting ice',   temp: 0,                   label: { temp: 'the temperature of melting ice' } },
    tap:      { icon: '🚰', name: 'Tap water',     temp: 27,                  label: { temp: 'the temperature of tap water' } },
    hot:      { icon: '🍵', name: 'Hot water',     temp: 64,                  label: { temp: 'the temperature of hot water' } },
    boiling:  { icon: '♨️', name: 'Boiling water', temp: 100,                 label: { temp: 'the temperature of boiling water' } },
    body:     { icon: '🙂', name: 'Your body',     temp: 36.8,                label: { temp: 'your body temperature (under the arm)' } },
  };

  // The metre rule's end is worn: the 0 and 1 mm marks have gone and the
  // physical end sits at the 2 mm mark. A pupil who butts an object against
  // that end and reads the far end straight off gets a length 0.2 cm too long.
  const RULE = { wornMm: 2, markMm: 10 };

  // Water curves UP at the glass: the edge of the meniscus sits this far above
  // the bottom of the curve on a 100 cm³ cylinder.
  const MENISCUS = 1;

  // Parallax on the measuring cylinder, from its geometry. The meniscus is at
  // the centre of the cylinder; the scale is on the front of the glass, one
  // internal radius (1.4 cm) nearer the eye. An eye 8 cm above the level and
  // 30 cm away sees the level against a mark 1.4 × 8/30 = 0.37 cm higher.
  // 100 cm³ over 17 cm of height is 0.17 cm per cm³, so the error is ≈ 2 cm³:
  // too HIGH from above, too LOW from below.
  const PARALLAX = { radiusCm: 1.4, eyeRiseCm: 8, eyeDistCm: 30, cmPerCm3: 0.17 };
  function parallaxShift(eye) {
    if (eye !== 'above' && eye !== 'below') return 0;
    const n = Math.round((PARALLAX.radiusCm * PARALLAX.eyeRiseCm / PARALLAX.eyeDistCm) / PARALLAX.cmPerCm3);
    return eye === 'above' ? n : -n;
  }

  // A reading is "too coarse" when one division is more than a tenth of it.
  const COARSE = 0.1;

  // ── Number helpers ─────────────────────────────
  const round = (x, step) => Math.round(x / step) * step;
  const clean = x => parseFloat(Number(x).toFixed(6));
  const fmt = (x, dp) => {
    const s = clean(x).toFixed(dp);
    return s.charAt(0) === '-' ? '−' + s.slice(1) : s;
  };
  // "2.36", "2,36", "−0.02", "2.36 cm" all read as numbers; anything else is null.
  function parseReading(s) {
    const t = String(s == null ? '' : s).trim().replace(/−/g, '-').replace(',', '.');
    const m = /^[-+]?(\d+\.?\d*|\.\d+)/.exec(t);
    return m ? parseFloat(m[0]) : null;
  }

  // ── Reading the scales ─────────────────────────
  // A vernier: 10 divisions span 9 mm, so vernier division k sits at R + 0.9k.
  // It meets a main-scale mark when R + 0.9k is a whole number of mm, which
  // happens for k = the tenths digit of R. `main` is the mark just BEFORE the
  // vernier zero - for a negative zero error that is the −1 mm mark.
  function vernierParts(mm) {
    const t = Math.round(mm * 10);            // tenths of a mm
    const main = Math.floor(t / 10);          // mm
    const div = t - main * 10;                // 0..9
    return { mainMm: main, mainCm: clean(main / 10), div, cm: clean(t / 100) };
  }
  // A micrometer: the sleeve has mm marks above the line and half-mm marks
  // below; one turn of the 50-division thimble moves the spindle 0.5 mm, so a
  // division is 0.01 mm.
  function micrometerParts(mm) {
    const h = Math.round(mm * 100);           // hundredths of a mm
    const sleeveH = Math.floor(h / 50) * 50;
    return { sleeve: clean(sleeveH / 100), thimble: h - sleeveH, mm: clean(h / 100), half: (sleeveH % 100) === 50 };
  }
  function stopwatchParts(s) {
    return { min: Math.floor(s / 60), sec: s % 60 };
  }

  // ── SI units and conversions ───────────────────
  function convert(q, v, unit) {
    const n = x => String(clean(x));
    if (q === 'length') {
      const mm = unit === 'cm' ? v * 10 : v;
      return unit === 'cm' ? `= ${n(mm)} mm = ${n(mm / 1000)} m` : `= ${n(mm / 10)} cm = ${n(mm / 1000)} m`;
    }
    if (q === 'volume') return `= ${n(v)} ml = ${n(v / 1000)} dm³`;
    if (q === 'mass') return `= ${n(v / 1000)} kg`;
    if (q === 'time') { const p = stopwatchParts(v); return p.min ? `= ${p.min} min ${p.sec} s` : `= ${n(v)} s`; }
    if (q === 'temp') return `= ${n(v + 273)} K`;
    return '';
  }
  // T/K = θ/°C + 273 (the school value; 273.15 exactly).
  const toKelvin = c => c + 273;

  // ── What an instrument shows for a specimen ────
  // opts: { align: 'end'|'mark', eye: 'level'|'above'|'below', tared, timed }
  // Returns the true value the pupil should type (`want`), the scale position
  // the bench draws (`scale`), and `mistakes`: for each named mistake, the
  // values a pupil who made it would type.
  function specimensFor(instId) {
    const I = INSTRUMENTS[instId];
    if (!I) return [];
    return Object.keys(SPECIMENS).filter(id => {
      const S = SPECIMENS[id];
      if (S[I.quantity] == null) return false;
      return !S.for || S.for.includes(instId);
    });
  }

  function measure(instId, specId, o) {
    o = o || {};
    const I = INSTRUMENTS[instId], S = SPECIMENS[specId];
    if (!I) return { ok: false, why: 'none', msg: 'Pick an instrument from the shelf first.' };
    if (!S) return { ok: false, why: 'nospec', msg: `Now pick something to measure with the ${I.name.toLowerCase()}.` };
    const q = I.quantity, val = S[q];
    if (val == null || (S.for && !S.for.includes(instId))) {
      return { ok: false, why: 'quantity', msg: `The ${I.name.toLowerCase()} measures ${QUANTITIES[q].name}. Pick something with a ${QUANTITIES[q].name} to measure.` };
    }
    const m = { ok: true, inst: instId, spec: specId, quantity: q, unit: I.unit, step: I.step, dp: I.dp, zero: 0,
                label: S.label[q], mistakes: {}, tooCoarse: false, work: '' };
    const f = x => fmt(x, I.dp);
    const U = ' ' + I.unit;

    if (I.kind === 'rule') {
      if (val > 300) return { ok: false, why: 'range', msg: 'That is too long to fit on this part of the bench.' };
      const start = o.align === 'end' ? RULE.wornMm : RULE.markMm;
      const far = start + val;
      const farMark = Math.round(far);
      m.scale = far; m.start = start;
      m.want = clean((farMark - start) / 10);
      m.read = clean(farMark / 10);
      if (o.align === 'end') {
        m.mistakes.end = [m.read];
        m.work = `The far end is nearest the ${f(m.read)} cm mark. But the worn end starts at 0.2 cm, not 0, so length = ${f(m.read)} − 0.2 = ${f(m.want)} cm. Better: start at the 1.0 cm mark.`;
      } else {
        m.mistakes.far = [m.read];
        m.work = `It starts at the 1.0 cm mark and its far end is nearest the ${f(m.read)} cm mark. Length = ${f(m.read)} − 1.0 = ${f(m.want)} cm.`;
      }
    } else if (I.kind === 'vernier' || I.kind === 'micrometer') {
      if (val > I.maxMm) {
        return { ok: false, why: 'range', msg: `The ${S.name.toLowerCase()} is too big: the ${I.name.toLowerCase()} opens only to ${I.maxMm >= 100 ? I.maxMm / 10 + ' cm' : I.maxMm + ' mm'}. Use the metre rule.` };
      }
      const zMm = (I.zero || 0) * 10;          // a caliper's zero error, in mm
      m.zero = I.zero || 0;
      m.scale = val + zMm;                     // where the vernier zero / thimble edge really is
      m.jaw = val;                             // where the moving jaw is
      if (I.kind === 'vernier') {
        const p = vernierParts(m.scale);
        m.parts = p;
        m.read = p.cm;
        const sum = `Main scale ${f(p.mainCm)} cm + vernier ${p.div} × 0.01 = ${f(p.cm)} cm`;
        if (specId === 'closed') {
          m.want = m.read;
          m.work = m.read === 0
            ? 'Jaws closed: the vernier zero lines up exactly with the main-scale zero. 0.00 cm - no zero error.'
            : m.read > 0
              ? `Jaws closed, but the vernier zero is just PAST the main-scale zero. ${sum}: a zero error of +${f(m.read)} cm.`
              : `Jaws closed, but the vernier zero is just LEFT of the main-scale zero, so the main scale reads −0.1 cm. Division ${p.div} lines up: −0.1 + ${f(p.div / 100)} = ${f(m.read)} cm - a negative zero error, −(10 − ${p.div}) × 0.01 cm.`;
        } else {
          m.want = clean(round(val, 0.1) / 10);
          if (m.zero) {
            m.mistakes.raw = [m.read];
            m.mistakes.sign = [clean(m.read + m.zero)];
            m.work = `${sum}. Zero error ${m.zero > 0 ? '+' : ''}${f(m.zero)} cm, so true = ${f(m.read)} − (${f(m.zero)}) = ${f(m.want)} cm.`;
          } else m.work = `${sum}. Reading = ${f(m.want)} cm.`;
        }
      } else {
        const p = micrometerParts(m.scale);
        m.parts = p;
        m.read = p.mm;
        m.want = specId === 'closed' ? p.mm : clean(round(val, 0.01));
        m.work = specId === 'closed'
          ? 'Jaws closed: the thimble zero is on the line and the sleeve shows 0. 0.00 mm - no zero error.'
          : `Sleeve: ${f(p.sleeve)} mm${p.half ? ' (a half-millimetre mark is showing below the line)' : ''}. Thimble: ${p.thimble} on the line → ${p.thimble} × 0.01 = ${f(p.thimble / 100)} mm. Reading = ${f(p.sleeve)} + ${f(p.thimble / 100)} = ${f(p.mm)} mm.`;
      }
    } else if (I.kind === 'cylinder') {
      const level = S.before != null ? S.before + val : val;
      const shift = parallaxShift(o.eye);
      const sub = v => (S.before != null ? [v, clean(v - S.before)] : [v]);
      m.scale = level; m.before = S.before != null ? S.before : null;
      m.top = level + MENISCUS; m.apparent = level + shift;
      m.want = val;
      m.mistakes.top = sub(level + MENISCUS);
      if (shift) m.mistakes.apparent = sub(level + shift);
      if (S.before != null) {
        m.mistakes.level = [level];
        m.work = `Before: ${S.before} cm³ of water. With the stone in, the bottom of the meniscus is on ${level}. Volume of the stone = ${level} − ${S.before} = ${val} cm³.`;
      } else m.work = `Eye level with the liquid: the bottom of the meniscus is on the ${val} mark, so the volume is ${val} cm³.`;
    } else if (I.kind === 'stopwatch') {
      if (!o.timed) return { ok: false, why: 'untimed', msg: 'Start the stopwatch first: tap ▶️ Start timing.' };
      const p = stopwatchParts(val);
      m.parts = p; m.scale = val; m.want = val;
      const wrongUnits = [clean(p.min + p.sec / 100), p.min * 100 + p.sec].filter(x => x !== val);
      if (p.min) m.mistakes.units = wrongUnits;
      m.work = `The minute hand has passed ${p.min}; the second hand is on ${p.sec}. Time = ${p.min} × 60 + ${p.sec} = ${val} s.`
        + (S.swings ? ` That is ${S.swings} swings, so one swing takes ${val} ÷ ${S.swings} = ${clean(val / S.swings)} s.` : '');
    } else if (I.kind === 'thermometer') {
      if (val < I.min) return { ok: false, why: 'below', msg: `${S.name} is colder than ${I.min} °C, the bottom of this thermometer's range - the thread stays below the scale. Use the laboratory thermometer.` };
      if (val > I.max) return { ok: false, why: 'burst', msg: `${S.name} is hotter than ${I.max} °C, the top of this thermometer's range.` };
      m.scale = val; m.want = clean(round(val, I.step));
      m.work = `The top of the thread is level with the ${f(m.want)} mark, so the temperature is ${f(m.want)} °C (= ${fmt(toKelvin(m.want), I.dp)} K).`;
    } else if (I.kind === 'balance') {
      const zero = o.tared ? 0 : I.zero;
      m.zero = zero;
      m.read = clean(val + zero);
      m.scale = m.read;
      m.want = specId === 'closed' ? m.read : val;
      if (specId === 'closed') {
        m.work = zero ? `With nothing on the pan it reads ${f(zero)} g: a zero error of +${f(zero)} g. Press Zero (tare) or subtract it from every reading.` : 'Empty pan, 0.0 g: the balance has been zeroed.';
      } else if (zero) {
        m.mistakes.raw = [m.read];
        m.mistakes.sign = [clean(m.read + zero)];
        m.work = `The display shows ${f(m.read)} g, but the empty balance read ${f(zero)} g. True mass = ${f(m.read)} − ${f(zero)} = ${f(val)} g.`;
      } else m.work = `The balance was zeroed first, so the display is the mass: ${f(val)} g.`;
    }
    if (q === 'length' && specId !== 'closed') m.tooCoarse = m.want === 0 || I.step / m.want > COARSE + 1e-9;
    m.wantS = f(m.want) + U;
    return m;
  }

  // Which mistake (if any) a typed value is. Checked in this order, so the
  // first match is the one explained.
  const MISTAKE_ORDER = ['apparent', 'top', 'raw', 'sign', 'end', 'far', 'level', 'units'];
  function judge(m, v) {
    if (!m || !m.ok || v == null || !isFinite(v)) return { verdict: 'none' };
    const tol = m.step / 1000;
    const eq = (a, b) => Math.abs(a - b) < tol;
    if (eq(v, m.want)) return { verdict: 'ok' };
    for (const k of MISTAKE_ORDER) {
      if ((m.mistakes[k] || []).some(x => eq(v, x))) return { verdict: k };
    }
    if (Math.abs(v - m.want) <= m.step * 1.5 + tol) return { verdict: 'near' };
    return { verdict: 'wrong' };
  }

  // ── Discoveries ────────────────────────────────
  // `how` uses the guide vocabulary: inst:<id>, spec:<id>, zoom, eye:<pos>,
  // align:<end|mark>, tare, start (the stopwatch has stopped), read (a correct
  // reading), misread:<mistake> (a reading showing that mistake).
  // scripts/test-labs-measure.js follows every `how` in a real browser.
  const DISCOVERIES = [
    { id: 'cyl_read', icon: '🧪', title: 'The bottom of the meniscus', hint: 'Read a measuring cylinder correctly',
      how: ['inst:cylinder', 'spec:water', 'zoom', 'read'],
      saw: 'The water curved up where it touched the glass. You read the bottom of the curve, with your eye level with it.',
      eq: 'volume = the mark at the bottom of the meniscus (cm³)',
      learn: 'Water is attracted to glass, so it creeps up the sides and makes a curved surface - the meniscus. The bottom of the curve is the true level.' },
    { id: 'meniscus_top', icon: '🌊', title: 'Top of the meniscus', hint: 'A cylinder mistake - read the edge of the water',
      how: ['inst:cylinder', 'spec:water', 'zoom', 'misread:top'],
      saw: 'Reading the edges of the curve gave a volume one division too big.',
      eq: 'top of the curve = true level + 1 cm³ (on this cylinder)',
      learn: 'For water the edges of the meniscus are higher than the true level, so reading them makes the volume too big. Mercury curves the other way, so for mercury the top is read.' },
    { id: 'parallax_high', icon: '👁️', title: 'Parallax: eye too high', hint: 'Read a cylinder with your eye above the level',
      how: ['inst:cylinder', 'spec:water', 'eye:above', 'misread:apparent'],
      saw: 'From above, your line of sight crossed the scale above the true level: the reading was too high.',
      eq: 'eye above → reading too high',
      learn: 'The scale is on the front of the glass and the meniscus is in the middle, so a slanted line of sight meets the scale at the wrong mark. That is parallax error.' },
    { id: 'parallax_low', icon: '🙈', title: 'Parallax: eye too low', hint: 'Read a cylinder with your eye below the level',
      how: ['inst:cylinder', 'spec:water', 'eye:below', 'misread:apparent'],
      saw: 'From below, your line of sight crossed the scale below the true level: the reading was too low.',
      eq: 'eye below → reading too low',
      learn: 'Parallax works both ways. The cure is the same: eye level with the mark, looking at the scale at right angles.' },
    { id: 'displacement', icon: '🪨', title: 'Volume by displacement', hint: 'Find the volume of a stone with a cylinder',
      how: ['inst:cylinder', 'spec:stone', 'read'],
      saw: 'The stone pushed the water level up. The rise was the stone’s volume.',
      eq: 'volume of stone = level with stone − level before',
      learn: 'A solid pushes aside (displaces) its own volume of water, so an odd-shaped solid can be measured with a measuring cylinder.' },
    { id: 'rule_read', icon: '📏', title: 'Reading a metre rule', hint: 'Measure a pencil from the 1 cm mark',
      how: ['inst:rule', 'spec:pencil', 'align:mark', 'zoom', 'read'],
      saw: 'You started at the 1.0 cm mark, read the far end and subtracted.',
      eq: 'length = far reading − start reading',
      learn: 'A metre rule reads to the nearest millimetre (0.1 cm). Starting at a clear mark and subtracting avoids the worn end.' },
    { id: 'end_error', icon: '🪵', title: 'The worn end', hint: 'A ruler mistake - start from its very end',
      how: ['inst:rule', 'spec:pencil', 'align:end', 'misread:end'],
      saw: 'The end of the ruler was worn, so the pencil really started at 0.2 cm and the length came out 0.2 cm too long.',
      eq: 'worn end: reading − true length = 0.2 cm',
      learn: 'A worn or damaged end is not at zero - that is zero (end) error. Measure from a clear mark such as 1.0 cm and subtract it.' },
    { id: 'vernier_read', icon: '🔧', title: 'Reading a vernier', hint: 'Measure a coin with the vernier caliper',
      how: ['inst:vernier', 'spec:coin', 'zoom', 'zoom', 'read'],
      saw: 'The main scale gave the millimetres; the vernier line that matched a main-scale mark gave the tenth of a millimetre.',
      eq: 'reading = main scale + (vernier division × 0.01 cm)',
      learn: 'Ten vernier divisions span 9 mm, so each is 0.1 mm shorter than a millimetre. Only one of them can line up with a main-scale mark - and which one tells you the next digit.' },
    { id: 'micrometer_read', icon: '🗜️', title: 'Reading a micrometer', hint: 'Measure a wire with the micrometer',
      how: ['inst:micrometer', 'spec:wire', 'zoom', 'read'],
      saw: 'The sleeve gave the whole and half millimetres; the thimble gave the hundredths.',
      eq: 'reading = sleeve + (thimble division × 0.01 mm)',
      learn: 'One full turn of the thimble moves the spindle 0.5 mm. The thimble has 50 divisions, so each is 0.5 ÷ 50 = 0.01 mm.' },
    { id: 'zero_pos', icon: '➕', title: 'A positive zero error', hint: 'Check the zero of old caliper A, then use it',
      how: ['inst:vernier_old', 'spec:closed', 'read', 'spec:rod', 'read'],
      saw: 'With the jaws closed, old caliper A read +0.03 cm. You took that off your reading.',
      eq: 'true reading = scale reading − zero error',
      learn: 'A worn jaw means the vernier zero sits past the main-scale zero even with nothing between the jaws. Every reading is 0.03 cm too big until you correct it.' },
    { id: 'zero_neg', icon: '➖', title: 'A negative zero error', hint: 'Check the zero of old caliper B, then use it',
      how: ['inst:vernier_bent', 'spec:closed', 'read', 'spec:rod', 'read'],
      saw: 'With the jaws closed, old caliper B read −0.02 cm: its vernier zero was to the LEFT of the main-scale zero.',
      eq: 'true reading = scale reading − (−0.02) = scale reading + 0.02',
      learn: 'A negative zero error makes every reading too small. Subtracting a negative number is the same as adding its size.' },
    { id: 'zero_raw', icon: '0️⃣', title: 'Zero error left in', hint: 'A caliper mistake - measure without checking its zero',
      how: ['inst:vernier_old', 'spec:rod', 'misread:raw'],
      saw: 'Straight off the scale of old caliper A, the rod read 0.03 cm too big.',
      eq: 'uncorrected reading = true value + zero error',
      learn: 'An instrument can be precise and still wrong: a zero error shifts every reading by the same amount. Check the zero before you measure.' },
    { id: 'too_coarse', icon: '🔬', title: 'Not precise enough', hint: 'Measure a thin wire with a metre rule',
      how: ['inst:rule', 'spec:wire', 'align:mark', 'read'],
      saw: 'The whole wire was about one millimetre division on the metre rule.',
      eq: 'choose an instrument whose smallest division is tiny compared with the object',
      learn: 'The smaller the smallest division, the more precise the instrument: metre rule 1 mm, vernier 0.1 mm, micrometer 0.01 mm.' },
    { id: 'balance_zero', icon: '⚖️', title: 'Zero the balance', hint: 'Weigh a stone the right way',
      how: ['inst:balance', 'tare', 'spec:stone', 'read'],
      saw: 'After you pressed Zero (tare), the empty balance read 0.0 g and then read the stone’s mass directly.',
      eq: 'mass = reading − empty reading',
      learn: 'A balance that does not read 0.0 g when empty has a zero error. Taring removes it; otherwise subtract the empty reading.' },
    { id: 'stopwatch_read', icon: '⏱️', title: 'Minutes into seconds', hint: 'Time water heating to the boil',
      how: ['inst:stopwatch', 'spec:kettle', 'start', 'read'],
      saw: 'The small dial counted the minutes and the big hand the seconds.',
      eq: 'time in s = minutes × 60 + seconds',
      learn: 'The second (s) is the SI unit of time. A stopwatch dial shows minutes and seconds; convert to seconds before you calculate.' },
    { id: 'pendulum', icon: '🕰️', title: 'Time many swings', hint: 'Time 10 swings of a pendulum',
      how: ['inst:stopwatch', 'spec:pendulum', 'start', 'read'],
      saw: '10 swings took 16 s, so one swing takes 1.6 s.',
      eq: 'time for one swing = total time ÷ number of swings',
      learn: 'Your reaction time (about 0.2 s) adds an error every time you press the button. Timing 10 swings and dividing by 10 makes that error ten times smaller for each swing.' },
    { id: 'ice_point', icon: '🧊', title: 'Melting ice: 0 °C', hint: 'Put the thermometer in melting ice',
      how: ['inst:thermometer', 'spec:ice', 'zoom', 'read'],
      saw: 'In melting ice the thread stopped at 0 °C.',
      eq: '0 °C = 273 K',
      learn: 'Pure ice melts at 0 °C. In kelvin, the SI unit of temperature, that is 273 K (K = °C + 273).' },
    { id: 'boil_point', icon: '♨️', title: 'Boiling water: 100 °C', hint: 'Put the laboratory thermometer in boiling water',
      how: ['inst:thermometer', 'spec:boiling', 'zoom', 'read'],
      saw: 'In boiling water the thread stopped at 100 °C.',
      eq: '100 °C = 373 K',
      learn: 'Pure water boils at 100 °C at sea level - inside this thermometer’s −10 °C to 110 °C range. On the central plateau of Mauritius it boils a little lower, because the air pressure is lower.' },
    { id: 'clinical', icon: '🩺', title: 'Precise but narrow', hint: 'Take a body temperature with the clinical thermometer',
      how: ['inst:clinical', 'spec:body', 'zoom', 'read'],
      saw: 'The clinical thermometer read to 0.1 °C, but only between 35 °C and 42 °C.',
      eq: 'precision 0.1 °C · range 35-42 °C',
      learn: 'A clinical thermometer has tiny divisions (0.1 °C) over a short range - just what a body temperature needs, and useless for anything hotter.' },
  ];

  // ── The one dangerous mistake: it stops the experiment ──
  const HAZARDS = {
    clinical_burst: {
      signs: ['toxic'], fx: 'burst',
      title: () => 'Stop - the clinical thermometer has burst',
      happened: c => `You put the clinical thermometer into ${c.what} at about ${c.temp} °C. Its scale stops at 42 °C, so the liquid inside expanded past the top of the tube with nowhere to go - and cracked the glass.`,
      why: 'Broken glass cuts, and hot water scalds. Older glass clinical thermometers hold mercury: the silver beads that spill out give off a toxic vapour, and mercury must never be touched or swept up by hand.',
      instead: 'Check an instrument’s RANGE before you use it. For hot water, use the laboratory thermometer (−10 °C to 110 °C). If a thermometer does break: step back, touch nothing and tell your teacher at once - they clear it up with the school’s spill kit.',
      exam: 'Choosing an instrument means checking its range as well as its precision. Physics 2021 (Fig 1.3) asks for the range of a laboratory thermometer: −10 °C to 110 °C.',
    },
  };
  const SIGN_LABELS = { toxic: 'Toxic' };

  // ── Wrong but safe: what went wrong and what to do instead ──
  const RESULTS = {
    parallax: {
      icon: '👁️',
      title: () => 'Parallax error - your eye was not level',
      happened: c => `With your eye ${c.pos} the liquid, your line of sight crossed the scale at ${c.typed} - but the bottom of the meniscus is really at ${c.want}. Looking from ${c.pos === 'above' ? 'above makes the reading too HIGH' : 'below makes the reading too LOW'}.`,
      instead: () => 'Bend down until your eye is level with the bottom of the meniscus, so you look at the scale at right angles (perpendicular). Then read.',
      exam: 'Naming the error is a paper question - “state the type of error”: parallax error (Physics 2021 Q3(b)(i), Physics 2023 Q2(d)). To avoid it: eye level with the mark, perpendicular to the scale.',
    },
    meniscus_top: {
      icon: '🌊',
      title: () => 'You read the top of the meniscus',
      happened: c => `Water curves UP where it touches the glass. You read ${c.typed} at the edges of the curve, but the bottom of the curve - the true level - is at ${c.want}.`,
      instead: () => 'For water, read the BOTTOM of the meniscus, with your eye level with it. (Mercury curves the other way - for mercury you read the top.)',
      exam: 'Reading a measuring cylinder is examined (Physics 2022 Q3(a)(i)): the mark at the bottom of the meniscus, read at eye level.',
    },
    zero_raw: {
      icon: '0️⃣',
      title: () => 'Zero error - not corrected',
      happened: c => `The ${c.inst} does not read zero when ${c.empty}: it reads ${c.zeroS}. You recorded ${c.typedS} straight off the scale, so your reading is out by ${c.zeroS}.`,
      instead: c => `Check the zero first. Then true reading = scale reading − zero error: ${c.readS} − (${c.zeroS}) = ${c.wantS}.`,
      exam: 'An instrument that reads a value when it should read zero has a zero error (Physics 2023 Q2(d): identify the type of error). Subtract a positive zero error; for a negative one, add its size.',
    },
    end_error: {
      icon: '🪵',
      title: () => 'End error - the worn end of the ruler',
      happened: c => `The end of this metre rule is worn: the 0 mark has gone and the end really sits at 0.2 cm. Lined up with that end, the far end of the ${c.spec} read ${c.typed}, which is 0.2 cm too long.`,
      instead: () => 'Line the object up with a clear mark away from the end - the 1.0 cm mark - and subtract it: length = far reading − 1.0 cm.',
      exam: 'Zero (end) error is one of the two named errors in length measurement in the NCE syllabus (P1), alongside parallax error.',
    },
    too_coarse: {
      icon: '🔬',
      title: () => 'Right reading - wrong instrument',
      happened: c => `Your reading of ${c.typedS} is right for the ${c.inst}, which reads only to ${c.stepS}. But ${c.spec} is so small that one division is ${c.ratio}.`,
      instead: c => `Choose an instrument whose smallest division is tiny compared with the object: for ${c.spec}, the ${c.better}.`,
      exam: 'Choosing the most suitable instrument - and saying why (“it reads to 0.01 mm, so it is more precise”) - earns the mark.',
    },
    wrong_tool: {
      icon: '🧰',
      title: c => `Not the ${c.inst.toLowerCase()}`,
      happened: c => c.reason,
      instead: c => `Use the ${c.best.toLowerCase()}: ${c.bestWhy}`,
      exam: 'Choose an instrument for the QUANTITY (length, volume, time, temperature, mass), its SIZE and the PRECISION you need.',
    },
  };

  // The better instrument to name on a "too coarse" card.
  function betterFor(specId) {
    const v = SPECIMENS[specId] && SPECIMENS[specId].length;
    return v != null && v < 5 ? 'micrometer screw gauge (reads to 0.01 mm)' : 'vernier caliper (reads to 0.01 cm)';
  }

  // Short, true facts for the 💡 button.
  const FACTS = [
    'A vernier scale has 10 divisions in 9 mm, so each is 0.1 mm shorter than a millimetre. That tiny difference lets you read to 0.1 mm.',
    'A micrometer spindle moves 0.5 mm for each full turn of the thimble. The thimble has 50 divisions, so each is 0.01 mm.',
    'Mercury’s meniscus bulges UP - the opposite of water - so for mercury you read the top of the curve.',
    'Your reaction time is about 0.2 s. Timing 10 swings and dividing by 10 makes that error ten times smaller for each swing.',
    'The kelvin is the SI unit of temperature: K = °C + 273. Water freezes at 273 K and boils at 373 K.',
    '1 cm³ is exactly 1 ml, and 1000 cm³ is 1 dm³ - one litre.',
    'The kilogram is the only SI base unit with a prefix built into its name.',
    'To measure one sheet of paper with a ruler, measure a stack of 100 and divide by 100 - the same trick as timing 10 swings.',
    'Precision is how finely a scale reads. Accuracy is how close you are to the true value. A zero error makes a precise instrument inaccurate.',
    'A clinical thermometer reads 35-42 °C to 0.1 °C: very precise, but over a narrow range - just what a body temperature needs.',
    'A measuring cylinder is far more accurate than a beaker: a beaker’s marks are rough guides, a cylinder’s are a real scale.',
  ];

  // ── Missions ───────────────────────────────────
  // A question's FIRST option is the answer; the quiz shuffles them.
  const MISSIONS = [
    {
      id: 'vernier', icon: '🔧', title: 'Read the vernier',
      blurb: 'Measure a coin, a marble and a rod to 0.01 cm, then answer paper-style questions.',
      intro: 'Read the vernier! Pick the vernier caliper, then measure the coin, the glass marble and the metal rod. Zoom in, read the main scale, find the vernier line that lines up - and type your reading.',
      tasks: [
        { id: 'coin',   text: 'Measure the diameter of the coin',         inst: 'vernier', spec: 'coin' },
        { id: 'marble', text: 'Measure the diameter of the glass marble', inst: 'vernier', spec: 'marble' },
        { id: 'rod',    text: 'Measure the diameter of the metal rod',    inst: 'vernier', spec: 'rod' },
      ],
      quiz: [
        { q: 'On a diagram of a vernier caliper you must mark the MAIN scale with M. Which scale is it?',
          options: ['The long fixed scale on the beam, marked in cm and mm', 'The short sliding scale with ten divisions', 'The rotating scale on the thimble', 'The pointer at the end of the depth gauge'],
          why: 'The main scale is the long fixed one on the beam (Physics 2023 Q2(a)). The short sliding one beside it is the vernier scale, V.' },
        { q: 'Which part is the VERNIER scale, V?',
          options: ['The short sliding scale of ten divisions beside the main scale', 'The long fixed scale marked in centimetres', 'The pair of jaws that grip the object', 'The screw that locks the slider in place'],
          why: 'The vernier scale slides along the main scale with the moving jaw. Its ten divisions give the extra 0.01 cm.' },
        { q: 'The main scale reads 2.3 cm and the 7th vernier division lines up with a main-scale mark. What is the reading?',
          options: ['2.37 cm', '2.30 cm', '3.0 cm', '2.07 cm'],
          why: 'Reading = main scale + vernier division × 0.01 cm = 2.3 + 0.07 = 2.37 cm (Physics 2022 Q3(c): read both scales, then combine).' },
        { q: 'What is the smallest length a vernier caliper can measure?',
          options: ['0.01 cm (0.1 mm)', '0.1 cm (1 mm)', '0.001 cm', '1 cm'],
          why: 'Ten vernier divisions span 9 mm, so the caliper reads to 1 − 0.9 = 0.1 mm = 0.01 cm.' },
        { q: 'Ten vernier divisions span 9 mm. How long is one vernier division?',
          options: ['0.9 mm', '1 mm', '0.1 mm', '9 mm'],
          why: '9 mm ÷ 10 = 0.9 mm - just 0.1 mm shorter than a main-scale millimetre.' },
        { q: 'The coin measured 2.37 cm. What is that in millimetres?',
          options: ['23.7 mm', '237 mm', '0.237 mm', '2.37 mm'],
          why: '1 cm = 10 mm, so 2.37 × 10 = 23.7 mm.' },
      ],
    },
    {
      id: 'errors', icon: '🎯', title: 'Beat the errors',
      blurb: 'Find a zero error and correct it, beat parallax and weigh a stone on a balance that does not start at zero.',
      intro: 'Beat the errors! Old caliper A has a worn jaw and the balance does not start at zero. Find each error, correct for it, and read the measuring cylinder with your eye in the right place.',
      tasks: [
        { id: 'zero', text: 'Close the jaws of old caliper A and read its zero error', inst: 'vernier_old', spec: 'closed' },
        { id: 'rod',  text: 'Measure the rod with old caliper A - correct for the zero error', inst: 'vernier_old', spec: 'rod' },
        { id: 'cyl',  text: 'Read the water in the measuring cylinder, eye level', inst: 'cylinder', spec: 'water', eye: 'level' },
        { id: 'bal',  text: 'Weigh the stone on the balance - it does not start at zero', inst: 'balance', spec: 'stone' },
      ],
      quiz: [
        { q: 'A pupil reads a measuring cylinder with her eye above the level of the liquid. Name this type of error.',
          options: ['Parallax error', 'Zero error', 'End error', 'Reaction-time error'],
          why: 'A line of sight that is not perpendicular to the scale gives a parallax error (Physics 2021 Q3(b)(i), Physics 2023 Q2(d)).' },
        { q: 'With its jaws closed a vernier caliper reads +0.03 cm. It then reads 1.28 cm on a rod. What is the true diameter?',
          options: ['1.25 cm', '1.31 cm', '1.28 cm', '0.03 cm'],
          why: 'True reading = scale reading − zero error = 1.28 − 0.03 = 1.25 cm.' },
        { q: 'A caliper has a zero error of −0.02 cm. It reads 3.45 cm on a block. What is the true length?',
          options: ['3.47 cm', '3.43 cm', '3.45 cm', '3.25 cm'],
          why: 'True reading = 3.45 − (−0.02) = 3.45 + 0.02 = 3.47 cm. A negative zero error makes every reading too small.' },
        { q: 'How do you avoid parallax error when you read a measuring cylinder?',
          options: ['Put your eye level with the bottom of the meniscus', 'Read the top of the meniscus instead', 'Tilt the cylinder towards you', 'Read the scale from above the liquid'],
          why: 'Eye level with the mark, looking at the scale at right angles, is the only way to see the true reading.' },
        { q: 'Why should you not measure from the very end of an old metre rule?',
          options: ['The end may be worn, so it is not exactly at zero', 'The first centimetre is always marked in inches', 'The end of the ruler is too thin to see', 'The scale is printed backwards at the end'],
          why: 'A worn end gives a zero (end) error. Start from a clear mark such as 1.0 cm and subtract it.' },
        { q: 'Suggest how to improve the accuracy of timing one swing of a pendulum.',
          options: ['Time 10 swings and divide by 10', 'Time one swing very carefully', 'Use a heavier pendulum bob', 'Start the stopwatch after the bob is let go'],
          why: 'Your reaction-time error is shared out over 10 swings, so it is ten times smaller for each (Physics 2021 Q6(b): improve the accuracy).' },
      ],
    },
    {
      id: 'choose', icon: '🧰', title: 'Right tool for the job',
      blurb: 'Six jobs, eight instruments. Pick the best one for each - quantity, size and precision.',
      intro: 'Right tool for the job! For each job, tap the instrument you would use. Think about the quantity, how big it is, and how precisely you need it.',
      quiz: [
        { q: 'Which list puts the instruments from MOST to LEAST precise?',
          options: ['Micrometer, vernier caliper, metre rule', 'Metre rule, vernier caliper, micrometer', 'Vernier caliper, micrometer, metre rule', 'Micrometer, metre rule, vernier caliper'],
          why: 'Micrometer 0.01 mm, vernier caliper 0.1 mm, metre rule 1 mm: the smaller the division, the more precise.' },
        { q: 'What is the SI unit of temperature?',
          options: ['Kelvin (K)', 'Degree Celsius (°C)', 'Joule (J)', 'Degree Fahrenheit (°F)'],
          why: 'The kelvin is the SI unit; degrees Celsius are what lab thermometers show. K = °C + 273.' },
        { q: 'Tap water is at 27 °C. What is this in kelvin?',
          options: ['300 K', '246 K', '27 K', '273 K'],
          why: 'K = °C + 273, so 27 + 273 = 300 K.' },
        { q: 'A laboratory thermometer reads from −10 °C to 110 °C. Which temperature can it NOT measure?',
          options: ['150 °C', '100 °C', '0 °C', '−5 °C'],
          why: '150 °C is above the top of its range (110 °C). The RANGE is the lowest to the highest reading.' },
        { q: 'A stopwatch shows 3 minutes 20 seconds. What is this in seconds?',
          options: ['200 s', '320 s', '380 s', '32 s'],
          why: '3 × 60 + 20 = 200 s. The second is the SI unit of time.' },
        { q: 'What is the SI unit of mass?',
          options: ['Kilogram (kg)', 'Gram (g)', 'Newton (N)', 'Tonne (t)'],
          why: 'The kilogram is the SI unit of mass. The newton is the unit of force (weight).' },
      ],
    },
  ];

  // The jobs in "Right tool for the job". `not` gives the reason for every
  // other instrument that measures the SAME quantity; an instrument for a
  // different quantity gets the general reason from wrongToolReason().
  const CHOICES = [
    { id: 'wire', job: 'The diameter of a thin copper wire (about 1 mm)', quantity: 'length', best: 'micrometer',
      why: 'it reads to 0.01 mm, so even a 1 mm wire is 100 divisions.',
      not: { rule: 'Its smallest division, 1 mm, is as big as the whole wire - the reading would tell you almost nothing.',
             vernier: 'It reads only to 0.1 mm, so one division is a tenth of the wire. The micrometer is ten times finer.' } },
    { id: 'desk', job: 'The width of a desk (about 60 cm)', quantity: 'length', best: 'rule',
      why: 'it covers long lengths, and to the nearest millimetre is plenty for 60 cm.',
      not: { vernier: 'A vernier caliper opens to only 15 cm.', micrometer: 'A micrometer opens to only 25 mm.' } },
    { id: 'tube', job: 'The inside diameter of a test tube (about 1.5 cm)', quantity: 'length', best: 'vernier',
      why: 'its inside jaws reach into the tube, and it reads to 0.01 cm.',
      not: { rule: 'You cannot hold a ruler across the inside of a tube, and it reads only to 1 mm.',
             micrometer: 'Its anvil and spindle close on the OUTSIDE of an object - it cannot measure an inside diameter.' } },
    { id: 'liquid', job: 'The volume of some water (about 60 cm³)', quantity: 'volume', best: 'cylinder',
      why: 'it is graduated in cm³ - read the bottom of the meniscus at eye level.', not: {} },
    { id: 'boil', job: 'The temperature of boiling water', quantity: 'temp', best: 'thermometer',
      why: 'its range (−10 °C to 110 °C) covers 100 °C.',
      not: { clinical: 'Its range stops at 42 °C. In boiling water it would burst.' } },
    { id: 'fever', job: 'A pupil’s body temperature, to 0.1 °C', quantity: 'temp', best: 'clinical',
      why: 'it reads to 0.1 °C over 35-42 °C - the body-temperature range.',
      not: { thermometer: 'It reads only to 1 °C: it cannot tell 37.2 °C from 37.4 °C.' } },
  ];
  const CHOICE_INSTRUMENTS = ['rule', 'vernier', 'micrometer', 'cylinder', 'stopwatch', 'thermometer', 'clinical', 'balance'];
  function wrongToolReason(choice, instId) {
    const I = INSTRUMENTS[instId];
    if (choice.not[instId]) return choice.not[instId];
    return `The ${I.name.toLowerCase()} measures ${QUANTITIES[I.quantity].name}, not ${QUANTITIES[choice.quantity].name}.`;
  }

  // ── Guided experiments ─────────────────────────
  // One action per step; `on` is what completes it (the discovery vocabulary
  // above). A step with `btn` gets a button in the yellow box that does it.
  const READ = { on: 'read', say: 'Now read the scale: type your reading in the box and tap Check - or let me show you how.', btn: '✏️ Show me the reading' };
  const GUIDES = [
    { id: 'cylinder', icon: '🧪', title: 'Read a measuring cylinder',
      blurb: 'Find the bottom of the meniscus and read it at eye level.',
      lesson: 'Water curves up at the glass, making a meniscus. Read the BOTTOM of the curve with your eye level with it. Volume is measured in cm³ (1 cm³ = 1 ml).',
      steps: [
        { on: 'inst:cylinder', say: 'Pick the measuring cylinder from the shelf.', btn: '🧪 Pick the measuring cylinder' },
        { on: 'spec:water',    say: 'Choose what to measure: the water in it.', btn: '💧 Measure the water' },
        { on: 'zoom',          say: 'Zoom in on the water level so you can see every 1 cm³ mark.', btn: '🔍 Zoom in' },
        { on: 'zoom',          say: 'Closer still - look at the curved surface.', btn: '🔍 Zoom in' },
        READ,
      ] },
    { id: 'vernier', icon: '🔧', title: 'Read a vernier caliper',
      blurb: 'Main scale + the vernier line that lines up. Measure a coin to 0.01 cm.',
      lesson: 'Main scale: the mark just before the vernier zero. Vernier: the division that lines up best with a main-scale mark, × 0.01 cm. Add them. That reads to 0.1 mm - ten times finer than a ruler.',
      steps: [
        { on: 'inst:vernier', say: 'Pick the vernier caliper.', btn: '🔧 Pick the vernier caliper' },
        { on: 'spec:coin',    say: 'Close its jaws on the coin.', btn: '🪙 Measure the coin' },
        { on: 'zoom',         say: 'Zoom in to the two scales.', btn: '🔍 Zoom in' },
        { on: 'zoom',         say: 'Closer: find the vernier line that lines up exactly with a main-scale line.', btn: '🔍 Zoom in' },
        READ,
      ] },
    { id: 'parallax', icon: '👁️', title: 'Beat parallax error',
      blurb: 'See how the reading changes when your eye is too high - then fix it.',
      lesson: 'With your eye above the level the reading is too high; below, too low. That is parallax error. Eye level, looking at the scale at right angles, gives the true reading.',
      steps: [
        { on: 'inst:cylinder',    say: 'Pick the measuring cylinder.', btn: '🧪 Pick the measuring cylinder' },
        { on: 'spec:water',       say: 'Measure the water.', btn: '💧 Measure the water' },
        { on: 'eye:above',        say: 'Stand up tall: move your eye ABOVE the water level.', btn: '👁️ Eye above' },
        { on: 'misread:apparent', say: 'Read the mark where your line of sight (the dashed line) crosses the scale.', btn: '✏️ Read it from up here' },
        { on: 'eye:level',        say: 'Now bend down: bring your eye level with the bottom of the meniscus.', btn: '👁️ Eye level' },
        READ,
      ] },
    { id: 'compare', icon: '🔬', title: 'Which is most precise?',
      blurb: 'Measure one thin wire with a metre rule, a vernier and a micrometer.',
      lesson: 'Metre rule to 1 mm, vernier caliper to 0.1 mm, micrometer to 0.01 mm. For something as thin as a wire only the micrometer gives a useful reading: the smaller the division, the more precise the instrument.',
      steps: [
        { on: 'inst:rule',       say: 'Start with the metre rule.', btn: '📏 Pick the metre rule' },
        { on: 'spec:wire',       say: 'Measure the copper wire.', btn: '〰️ Measure the wire' },
        { on: 'align:mark',      say: 'Line it up with the 1 cm mark, away from the worn end.', btn: '📍 Start at the 1 cm mark' },
        READ,
        { on: 'inst:vernier',    say: 'Now try the vernier caliper.', btn: '🔧 Pick the vernier caliper' },
        { on: 'spec:wire',       say: 'Measure the same wire.', btn: '〰️ Measure the wire' },
        READ,
        { on: 'inst:micrometer', say: 'Last, the micrometer screw gauge.', btn: '🗜️ Pick the micrometer' },
        { on: 'spec:wire',       say: 'Measure the same wire again.', btn: '〰️ Measure the wire' },
        READ,
      ] },
    { id: 'zero', icon: '0️⃣', title: 'Find and fix a zero error',
      blurb: 'Close the jaws of an old caliper, read its zero error, then correct a reading.',
      lesson: 'Close the jaws first. If the reading is not zero, that is the zero error. True reading = scale reading − zero error.',
      steps: [
        { on: 'inst:vernier_old', say: 'Pick old caliper A - its jaw is worn.', btn: '🔧 Pick old caliper A' },
        { on: 'spec:closed',      say: 'Close the jaws with nothing between them.', btn: '🤏 Close the jaws' },
        { on: 'zoom',             say: 'Zoom in to the zero of both scales.', btn: '🔍 Zoom in' },
        { on: 'zoom',             say: 'Closer. Does the vernier zero line up with the main-scale zero?', btn: '🔍 Zoom in' },
        { on: 'read',             say: 'It should read 0.00 cm. Type what it really reads - that is the zero error.', btn: '✏️ Show me the zero error' },
        { on: 'spec:rod',         say: 'Now measure the metal rod with the same caliper.', btn: '🔩 Measure the rod' },
        { on: 'read',             say: 'Read the scales, then take the zero error away. Type the TRUE diameter.', btn: '✏️ Show me the correction' },
      ] },
    { id: 'swing', icon: '🕰️', title: 'Time a pendulum',
      blurb: 'Time 10 swings with a stopwatch and work out one swing.',
      lesson: 'Minutes × 60 + seconds gives the time in seconds. Timing 10 swings and dividing by 10 shares out your reaction-time error, so one swing is timed far more accurately.',
      steps: [
        { on: 'inst:stopwatch', say: 'Pick the stopwatch.', btn: '⏱️ Pick the stopwatch' },
        { on: 'spec:pendulum',  say: 'You will time 10 swings of the pendulum.', btn: '🕰️ Time the pendulum' },
        { on: 'start',          say: 'Start the stopwatch as you let the bob go. It stops after 10 swings.', btn: '▶️ Start timing' },
        READ,
      ] },
  ];

  return { QUANTITIES, INSTRUMENTS, SPECIMENS, RULE, MENISCUS, PARALLAX, COARSE, parallaxShift,
           round, clean, fmt, parseReading, vernierParts, micrometerParts, stopwatchParts, convert, toKelvin,
           specimensFor, measure, judge, MISTAKE_ORDER, betterFor,
           DISCOVERIES, HAZARDS, SIGN_LABELS, RESULTS, FACTS, MISSIONS, CHOICES, CHOICE_INSTRUMENTS, wrongToolReason, GUIDES };
})();
if (typeof window !== 'undefined') window.LabMeasureData = LabMeasureData;
