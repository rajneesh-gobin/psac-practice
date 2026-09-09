'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - P5 · Electricity  volume bank  (98 questions)
//  IDs: g9s-p5-v001 – g9s-p5-v098
//  chapterId: g9s-p5-electricity
//  Source: NCE Science (Physics) 2021-2025; NCF Grades 7-9 §P5.
//  ⚠ Circuit SVGs reuse the sym() and circuit() pattern from p5_electricity.js.
//    This file carries its own local copies so it is self-contained.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-p5-electricity';

// ── Single-symbol box. 120×70 viewBox. ──────────────────────────────────
const sym = (inner, label) =>
  '<svg viewBox="0 0 120 70" width="140" role="img" aria-label="a circuit symbol">' +
  '<rect x="1" y="1" width="118" height="68" fill="none" stroke="#cbd5e1"/>' +
  '<line x1="10" y1="35" x2="45" y2="35" stroke="#0f172a" stroke-width="2"/>' +
  '<line x1="75" y1="35" x2="110" y2="35" stroke="#0f172a" stroke-width="2"/>' +
  inner +
  (label ? '<text x="60" y="62" font-size="9" text-anchor="middle" fill="#475569">' + label + '</text>' : '') +
  '</svg>';

const SYM_CELL =
  sym('<line x1="52" y1="20" x2="52" y2="50" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="68" y1="27" x2="68" y2="43" stroke="#0f172a" stroke-width="4"/>');
const SYM_LAMP =
  sym('<circle cx="60" cy="35" r="14" fill="none" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="50" y1="25" x2="70" y2="45" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="70" y1="25" x2="50" y2="45" stroke="#0f172a" stroke-width="2"/>');
const SYM_SWITCH =
  sym('<circle cx="48" cy="35" r="3" fill="#0f172a"/>' +
      '<circle cx="72" cy="35" r="3" fill="#0f172a"/>' +
      '<line x1="48" y1="35" x2="70" y2="22" stroke="#0f172a" stroke-width="2"/>');
const SYM_RESISTOR =
  sym('<rect x="45" y="27" width="30" height="16" fill="none" stroke="#0f172a" stroke-width="2"/>');
const SYM_AMMETER =
  sym('<circle cx="60" cy="35" r="14" fill="none" stroke="#0f172a" stroke-width="2"/>' +
      '<text x="60" y="40" font-size="14" text-anchor="middle" fill="#0f172a">A</text>');
const SYM_VOLTMETER =
  sym('<circle cx="60" cy="35" r="14" fill="none" stroke="#0f172a" stroke-width="2"/>' +
      '<text x="60" y="40" font-size="14" text-anchor="middle" fill="#0f172a">V</text>');
const SYM_FUSE =
  sym('<rect x="42" y="30" width="36" height="10" fill="none" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="50" y1="35" x2="70" y2="35" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="3 2"/>');
const SYM_BATTERY =
  sym('<line x1="40" y1="20" x2="40" y2="50" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="52" y1="27" x2="52" y2="43" stroke="#0f172a" stroke-width="4"/>' +
      '<line x1="64" y1="20" x2="64" y2="50" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="76" y1="27" x2="76" y2="43" stroke="#0f172a" stroke-width="4"/>');

// ── Series circuit: rectangular loop with cell (top), switch (left),
//    lamp (bottom), and an optional meter (in series or in parallel).
const seriesCircuit = (opts) => {
  opts = opts || {};
  const box =
    '<rect x="20" y="20" width="200" height="100" fill="none" stroke="#0f172a" stroke-width="2"/>';
  const cell =
    '<rect x="95" y="12" width="50" height="16" fill="#fff" stroke="none"/>' +
    '<line x1="112" y1="8" x2="112" y2="32" stroke="#0f172a" stroke-width="2"/>' +
    '<line x1="128" y1="14" x2="128" y2="26" stroke="#0f172a" stroke-width="4"/>' +
    (opts.emf ? '<text x="120" y="6" font-size="9" text-anchor="middle" fill="#334155">' + opts.emf + '</text>' : '');
  const lamp =
    '<rect x="100" y="105" width="40" height="30" fill="#fff" stroke="none"/>' +
    '<circle cx="120" cy="120" r="13" fill="none" stroke="#0f172a" stroke-width="2"/>' +
    '<line x1="111" y1="111" x2="129" y2="129" stroke="#0f172a" stroke-width="2"/>' +
    '<line x1="129" y1="111" x2="111" y2="129" stroke="#0f172a" stroke-width="2"/>';
  const ammeter = opts.ammeter ?
    '<rect x="10" y="55" width="22" height="30" fill="#fff" stroke="none"/>' +
    '<circle cx="21" cy="70" r="13" fill="none" stroke="#0f172a" stroke-width="2"/>' +
    '<text x="21" y="75" font-size="11" text-anchor="middle" fill="#0f172a">A</text>' : '';
  const voltmeter = opts.voltmeter ?
    '<line x1="100" y1="120" x2="80" y2="155" stroke="#0f172a" stroke-width="1.5"/>' +
    '<line x1="140" y1="120" x2="160" y2="155" stroke="#0f172a" stroke-width="1.5"/>' +
    '<circle cx="120" cy="163" r="13" fill="none" stroke="#0f172a" stroke-width="2"/>' +
    '<text x="120" y="168" font-size="11" text-anchor="middle" fill="#0f172a">V</text>' : '';
  const resistor = opts.resistor ?
    '<rect x="168" y="60" width="34" height="20" fill="none" stroke="#0f172a" stroke-width="2"/>' +
    (opts.r ? '<text x="185" y="93" font-size="9" text-anchor="middle" fill="#334155">' + opts.r + '</text>' : '') : '';
  return '<svg viewBox="0 0 240 190" width="260" role="img" aria-label="a series circuit">' +
    box + cell + lamp + ammeter + voltmeter + resistor + '</svg>';
};

const CKT_BASIC    = seriesCircuit({});
const CKT_AMMETER  = seriesCircuit({ ammeter: true });
const CKT_VOLT     = seriesCircuit({ voltmeter: true });
const CKT_RESISTOR = seriesCircuit({ resistor: true, r: 'R' });
const CKT_6V       = seriesCircuit({ emf: '6 V', resistor: true, r: '3 &#937;', ammeter: true });
const CKT_12V      = seriesCircuit({ emf: '12 V', resistor: true, r: '4 &#937;', ammeter: true });

// [id, subsection, difficulty, question, options, answer, hint, explanation]
const MCQ = [

  // ── circuit_symbols (v001–v014) ──────────────────────────────────────
  ['g9s-p5-v001', 'circuit_symbols', 1,
   'What does this circuit symbol represent?<br>' + SYM_CELL,
   ['A cell (battery with one element)', 'A switch', 'A lamp', 'A resistor'],
   'A cell (battery with one element)',
   'A long thin line and a short thick line — that is the cell symbol.',
   'A cell is represented by a long thin line (positive terminal) and a shorter thick line (negative terminal).'],

  ['g9s-p5-v002', 'circuit_symbols', 1,
   'What does this circuit symbol represent?<br>' + SYM_LAMP,
   ['A lamp (bulb)', 'An ammeter', 'A battery', 'A fuse'],
   'A lamp (bulb)',
   'A circle with an X inside — the filament.',
   'A lamp is represented by a circle with two crossing lines (the filament symbol) inside it.'],

  ['g9s-p5-v003', 'circuit_symbols', 1,
   'What does this circuit symbol represent?<br>' + SYM_SWITCH,
   ['A switch (open)', 'A resistor', 'A cell', 'A voltmeter'],
   'A switch (open)',
   'Two dots connected by a line at an angle — one end is lifted off.',
   'An open switch is shown as a lever lifted away from one of the contacts; closing the lever completes the circuit.'],

  ['g9s-p5-v004', 'circuit_symbols', 1,
   'What does this circuit symbol represent?<br>' + SYM_RESISTOR,
   ['A resistor', 'A battery', 'A switch', 'A lamp'],
   'A resistor',
   'A rectangle is the international IEC symbol for a resistor.',
   'A resistor is represented by a rectangle in circuit diagrams.'],

  ['g9s-p5-v005', 'circuit_symbols', 2,
   'What does this circuit symbol represent?<br>' + SYM_AMMETER,
   ['An ammeter', 'A voltmeter', 'A galvanometer', 'A battery'],
   'An ammeter',
   'A circle with the letter A inside.',
   'An ammeter (symbol: circle with A) is used to measure current; it is connected in series.'],

  ['g9s-p5-v006', 'circuit_symbols', 2,
   'What does this circuit symbol represent?<br>' + SYM_VOLTMETER,
   ['A voltmeter', 'An ammeter', 'A fuse', 'A resistor'],
   'A voltmeter',
   'A circle with the letter V inside.',
   'A voltmeter (symbol: circle with V) is used to measure potential difference; it is connected in parallel.'],

  ['g9s-p5-v007', 'circuit_symbols', 2,
   'What does this symbol represent?<br>' + SYM_FUSE,
   ['A fuse', 'A resistor', 'A switch', 'An LED'],
   'A fuse',
   'A short dashed line inside a rectangle — a thin wire that melts.',
   'A fuse is represented by a rectangle with a wire inside; when the current is too high the fuse wire melts and breaks the circuit.'],

  ['g9s-p5-v008', 'circuit_symbols', 2,
   'What does this symbol represent?<br>' + SYM_BATTERY,
   ['A battery (two or more cells in series)',
    'A single cell',
    'A capacitor',
    'A parallel pair of resistors'],
   'A battery (two or more cells in series)',
   'More than two pairs of lines — more than one cell.',
   'Two or more cell symbols in series represent a battery; more pairs of lines = more cells = higher e.m.f.'],

  ['g9s-p5-v009', 'circuit_symbols', 2,
   'In a circuit diagram, which of the following is always drawn as a straight line between components?',
   ['A wire (conductor) with no resistance',
    'A resistor',
    'A switch',
    'A lamp'],
   'A wire (conductor) with no resistance',
   'Connecting wires are shown as straight lines with corners.',
   'Ideal connecting wires are drawn as straight lines in circuit diagrams; they are assumed to have zero resistance.'],

  ['g9s-p5-v010', 'circuit_symbols', 3,
   'A student draws a circuit with a cell, switch, lamp and ammeter. The ammeter symbol (circle A) is drawn in parallel with the lamp. What is wrong?',
   ['An ammeter must be connected in series, not in parallel, with the component',
    'An ammeter cannot be used in a circuit with a lamp',
    'The cell symbol is incorrect',
    'The switch should be inside the ammeter symbol'],
   'An ammeter must be connected in series, not in parallel, with the component',
   'An ammeter measures the current flowing through a branch.',
   'Ammeters have very low resistance and are connected in series so all the current flows through them; in parallel they would short-circuit the lamp.'],

  ['g9s-p5-v011', 'circuit_symbols', 2,
   'Why is a voltmeter connected in parallel with a component?',
   ['To measure the potential difference across the component without significantly changing the current',
    'To measure the current flowing through the component',
    'To reduce the resistance of the component',
    'To increase the voltage supplied to the component'],
   'To measure the potential difference across the component without significantly changing the current',
   'Parallel connection shares the same voltage.',
   'A voltmeter is connected in parallel so it shares the potential difference across the component; its very high resistance means it draws negligible current.'],

  ['g9s-p5-v012', 'circuit_symbols', 3,
   'A student is given a circuit diagram showing a cell, a closed switch, a lamp and an ammeter in series. She adds a voltmeter across the lamp. How many separate loops does the circuit now have?',
   ['Two (the main loop and the voltmeter branch)',
    'One (the main series loop)',
    'Three',
    'It depends on the cell voltage'],
   'Two (the main loop and the voltmeter branch)',
   'Adding a parallel branch creates a second loop.',
   'The original series loop is one loop. The voltmeter in parallel with the lamp creates a second, smaller loop.'],

  ['g9s-p5-v013', 'circuit_symbols', 1,
   'In a circuit diagram, what does a break (gap) in the line of a switch indicate?',
   ['The switch is open and the circuit is broken',
    'The switch is closed and current flows',
    'A resistor is present',
    'A cell is positioned there'],
   'The switch is open and the circuit is broken',
   'A break in the conducting path means no current.',
   'An open switch has the lever lifted from one contact, showing a gap; no current flows when the circuit is open.'],

  ['g9s-p5-v014', 'circuit_symbols', 2,
   'Which component is specifically designed to protect a circuit by melting when the current is too large?',
   ['A fuse', 'A switch', 'A resistor', 'A voltmeter'],
   'A fuse',
   'It is sacrificial — it breaks the circuit to save the rest.',
   'A fuse contains a fine wire that melts (blows) when the current exceeds a safe level, breaking the circuit and protecting other components.'],

  // ── series_circuits (v015–v028) ──────────────────────────────────────
  ['g9s-p5-v015', 'series_circuits', 1,
   'In a series circuit, what is true of the current?',
   ['The current is the same at every point in the circuit',
    'The current is shared equally between the components',
    'The current is greatest near the positive terminal',
    'Each component has a different current flowing through it'],
   'The current is the same at every point in the circuit',
   'There is only one path for the current in a series circuit.',
   'In a series circuit there is only one path; the same current flows through every component.'],

  ['g9s-p5-v016', 'series_circuits', 2,
   'In a series circuit containing a cell, switch and two lamps, what happens when one lamp is removed?',
   ['The circuit breaks and both lamps go out',
    'Only the removed lamp goes out; the other stays on',
    'The remaining lamp gets brighter',
    'The current doubles through the remaining lamp'],
   'The circuit breaks and both lamps go out',
   'In series, all components share the same path.',
   'In series, removing a lamp breaks the only conducting path; the circuit is incomplete and no current flows — both lamps go off.'],

  ['g9s-p5-v017', 'series_circuits', 2,
   'A series circuit has a 6 V cell and three resistors of 1 &Omega;, 2 &Omega; and 3 &Omega;. What is the total resistance?',
   ['6 &Omega;', '18 &Omega;', '0.5 &Omega;', '2 &Omega;'], '6 &Omega;',
   'Total resistance in series = sum of individual resistances.',
   'R&sub;total; = 1 + 2 + 3 = 6 &Omega;.'],

  ['g9s-p5-v018', 'series_circuits', 2,
   'A 12 V cell is connected in a series circuit with two identical lamps. Each lamp has a resistance of 4 &Omega;. What is the total current?',
   ['1.5 A', '3 A', '0.75 A', '12 A'], '1.5 A',
   'I = V &divide; R&sub;total;. R&sub;total; = 4 + 4 = 8 &Omega;.',
   'R&sub;total; = 8 &Omega;; I = 12 &divide; 8 = 1.5 A.'],

  ['g9s-p5-v019', 'series_circuits', 3,
   'In a series circuit, a 9 V battery drives a current of 0.3 A. What is the total resistance of the circuit?',
   ['30 &Omega;', '9 &Omega;', '3 &Omega;', '0.03 &Omega;'], '30 &Omega;',
   'R = V &divide; I.',
   'R = 9 &divide; 0.3 = 30 &Omega;.'],

  ['g9s-p5-v020', 'series_circuits', 3,
   'In a series circuit the voltage across a 5 &Omega; resistor is 10 V. A second resistor in series with it is 3 &Omega;. What is the voltage across the 3 &Omega; resistor?',
   ['6 V', '10 V', '3 V', '5 V'], '6 V',
   'Find the current first; I = V/R = 10/5 = 2 A. Then V&#8322; = I &times; R&#8322;.',
   'I = 10 &divide; 5 = 2 A. V&#8322; = 2 &times; 3 = 6 V.'],

  ['g9s-p5-v021', 'series_circuits', 2,
   'Two resistors of 6 &Omega; and 4 &Omega; are connected in series with a 20 V source. What is the current?',
   ['2 A', '10 A', '0.5 A', '20 A'], '2 A',
   'I = V &divide; R&sub;total;.',
   'R&sub;total; = 10 &Omega;. I = 20 &divide; 10 = 2 A.'],

  ['g9s-p5-v022', 'series_circuits', 3,
   'Three resistors of 4 &Omega;, 6 &Omega; and 10 &Omega; are in series with a 40 V supply. What is the voltage across the 6 &Omega; resistor?',
   ['12 V', '6 V', '24 V', '40 V'], '12 V',
   'Find total resistance, then I, then V = IR for the 6 &Omega; resistor.',
   'R&sub;total; = 20 &Omega;. I = 40/20 = 2 A. V = 2 &times; 6 = 12 V.'],

  ['g9s-p5-v023', 'series_circuits', 2,
   'What is the sum of the voltages across all components in a series circuit compared to the e.m.f. of the source?',
   ['The voltages add up to equal the e.m.f.',
    'Each voltage equals the e.m.f.',
    'The e.m.f. is always larger',
    'The voltages are all equal to each other'],
   'The voltages add up to equal the e.m.f.',
   'Kirchhoff&rsquo;s voltage law.',
   'In a series circuit, the sum of the potential differences across all components equals the e.m.f. of the source (Kirchhoff&rsquo;s voltage law).'],

  ['g9s-p5-v024', 'series_circuits', 3,
   'A series circuit has a 9 V battery and two resistors R&#8321; = 3 &Omega; and R&#8322; = 6 &Omega;. What is the voltage across R&#8321;?',
   ['3 V', '6 V', '9 V', '1.5 V'], '3 V',
   'I = V / R&sub;total; = 9 / 9 = 1 A. V&#8321; = I &times; R&#8321;.',
   'R&sub;total; = 9 &Omega;. I = 1 A. V&#8321; = 1 &times; 3 = 3 V.'],

  ['g9s-p5-v025', 'series_circuits', 2,
   'A switch is placed in series with a lamp. When the switch is opened, what happens?',
   ['The lamp goes out because the circuit is broken',
    'The lamp stays on because the switch is not the power source',
    'The lamp gets brighter',
    'The lamp flickers'],
   'The lamp goes out because the circuit is broken',
   'An open switch breaks the only path.',
   'An open switch creates a gap in the series loop; no current flows and the lamp goes out.'],

  ['g9s-p5-v026', 'series_circuits', 3,
   'In a series circuit, a 12 V supply drives current through a lamp (resistance 3 &Omega;) and a resistor (5 &Omega;). What is the voltage across the lamp?',
   ['4.5 V', '7.5 V', '6 V', '12 V'], '4.5 V',
   'I = 12 / (3 + 5) = 1.5 A. V&sub;lamp; = 1.5 &times; 3.',
   'I = 12 &divide; 8 = 1.5 A. V&sub;lamp; = 1.5 &times; 3 = 4.5 V.'],

  ['g9s-p5-v027', 'series_circuits', 2,
   'Which of the following is a disadvantage of connecting lamps in series in a household string of lights?',
   ['If one lamp fails, all lamps go out',
    'The total voltage across each lamp is too high',
    'Each lamp receives too much current',
    'The circuit cannot be switched off'],
   'If one lamp fails, all lamps go out',
   'Series circuits have a single path.',
   'In series, the path is broken when any lamp fails; all others go out, making fault-finding difficult.'],

  ['g9s-p5-v028', 'series_circuits', 3,
   'A student adds a third resistor (2 &Omega;) in series to a circuit that already has two resistors (4 &Omega; and 6 &Omega;) and a 12 V supply. How does the current change?',
   ['It decreases (from 1.2 A to 1 A)',
    'It increases (more resistors push more current)',
    'It stays the same because voltage is constant',
    'It doubles because three resistors are more powerful'],
   'It decreases (from 1.2 A to 1 A)',
   'More resistance in series means less current (I = V/R).',
   'Original R = 10 &Omega;; I = 1.2 A. New R = 12 &Omega;; I = 12 &divide; 12 = 1 A. Current decreases.'],

  // ── measuring_current_voltage (v029–v042) ─────────────────────────────
  ['g9s-p5-v029', 'measuring_current_voltage', 1,
   'Which instrument measures electric current?',
   ['An ammeter', 'A voltmeter', 'An ohmmeter', 'A wattmeter'],
   'An ammeter',
   'It measures amps.',
   'An ammeter measures electric current in amperes (A); it is connected in series with the component.'],

  ['g9s-p5-v030', 'measuring_current_voltage', 1,
   'Which instrument measures potential difference (voltage)?',
   ['A voltmeter', 'An ammeter', 'A thermometer', 'A galvanometer'],
   'A voltmeter',
   'It measures volts.',
   'A voltmeter measures potential difference in volts (V); it is connected in parallel with the component.'],

  ['g9s-p5-v031', 'measuring_current_voltage', 2,
   'How should an ammeter be connected to measure the current through a lamp?',
   ['In series with the lamp (in the same loop)',
    'In parallel with the lamp',
    'Across the battery terminals',
    'Between the switch and the battery only'],
   'In series with the lamp (in the same loop)',
   'Current through the lamp must flow through the ammeter.',
   'An ammeter must be in series so that the same current flowing through the lamp also flows through the ammeter.'],

  ['g9s-p5-v032', 'measuring_current_voltage', 2,
   'How should a voltmeter be connected to measure the voltage across a resistor?',
   ['In parallel with the resistor',
    'In series with the resistor',
    'Between the switch contacts',
    'Across the battery terminals only'],
   'In parallel with the resistor',
   'Both connections share the same potential difference.',
   'A voltmeter is connected in parallel; both its terminals connect to the two ends of the resistor, so it measures the potential difference across it.'],

  ['g9s-p5-v033', 'measuring_current_voltage', 3,
   'Look at the circuit.<br>' + CKT_AMMETER + 'Where would you connect the voltmeter to measure the voltage across the lamp?',
   ['In parallel with the lamp (across both ends of the lamp)',
    'In series with the ammeter',
    'Across the cell terminals',
    'In parallel with the switch'],
   'In parallel with the lamp (across both ends of the lamp)',
   'The voltmeter must be directly across the component to measure its voltage.',
   'To measure the voltage across the lamp, connect the voltmeter in parallel with the lamp — one terminal to each end of the lamp.'],

  ['g9s-p5-v034', 'measuring_current_voltage', 2,
   'An ideal ammeter has a resistance of zero ohms. Why?',
   ['So that inserting it in series does not reduce the current it is measuring',
    'So that it can be connected in parallel',
    'So that it measures voltage accurately',
    'So that it can handle very large currents'],
   'So that inserting it in series does not reduce the current it is measuring',
   'Any resistance in series changes the current.',
   'If the ammeter had resistance, it would increase the total resistance of the circuit and reduce the current; zero resistance means no effect.'],

  ['g9s-p5-v035', 'measuring_current_voltage', 2,
   'An ideal voltmeter has infinite resistance. Why?',
   ['So that it draws no current from the circuit and does not change the voltage it measures',
    'So that it can be placed in series',
    'So that it can measure very large currents',
    'So that it measures current accurately'],
   'So that it draws no current from the circuit and does not change the voltage it measures',
   'A voltmeter in parallel must not affect the circuit.',
   'Infinite resistance means no current flows through the voltmeter; it measures the voltage without disturbing the circuit.'],

  ['g9s-p5-v036', 'measuring_current_voltage', 1,
   'What is the unit of electric current?',
   ['Ampere (A)', 'Volt (V)', 'Ohm (&Omega;)', 'Watt (W)'],
   'Ampere (A)',
   'Current is measured in amps.',
   'The SI unit of electric current is the ampere (A).'],

  ['g9s-p5-v037', 'measuring_current_voltage', 1,
   'What is the unit of potential difference (voltage)?',
   ['Volt (V)', 'Ampere (A)', 'Ohm (&Omega;)', 'Coulomb (C)'],
   'Volt (V)',
   'Voltage is measured in volts.',
   'The SI unit of potential difference is the volt (V).'],

  ['g9s-p5-v038', 'measuring_current_voltage', 3,
   'In a circuit, an ammeter reads 2.5 A and a voltmeter across a resistor reads 10 V. What is the resistance of the resistor?',
   ['4 &Omega;', '25 &Omega;', '12.5 &Omega;', '7.5 &Omega;'], '4 &Omega;',
   'R = V &divide; I.',
   'R = 10 &divide; 2.5 = 4 &Omega;.'],

  ['g9s-p5-v039', 'measuring_current_voltage', 2,
   'A student connects an ammeter in parallel with a lamp by mistake. What is likely to happen?',
   ['The ammeter short-circuits the lamp; very large current may damage the ammeter',
    'The ammeter accurately measures the lamp&rsquo;s resistance',
    'The lamp shines more brightly',
    'The circuit works normally because ammeters can be in parallel'],
   'The ammeter short-circuits the lamp; very large current may damage the ammeter',
   'An ammeter has very low (near zero) resistance.',
   'An ammeter in parallel with the lamp provides a near-zero-resistance path; almost all the current bypasses the lamp and flows through the ammeter, which may be damaged.'],

  ['g9s-p5-v040', 'measuring_current_voltage', 3,
   'A voltmeter reads 6 V when placed across a 3 &Omega; resistor in a circuit. What current flows through the resistor?',
   ['2 A', '18 A', '0.5 A', '3 A'], '2 A',
   'I = V &divide; R.',
   'I = 6 &divide; 3 = 2 A.'],

  ['g9s-p5-v041', 'measuring_current_voltage', 2,
   'Two ammeters are placed in a series circuit: one before and one after a lamp. What will their readings be?',
   ['The same, because current is the same everywhere in a series circuit',
    'Different; the lamp uses some current',
    'The one before the lamp reads higher',
    'Both read zero'],
   'The same, because current is the same everywhere in a series circuit',
   'Series circuits have the same current throughout.',
   'Current is conserved in a series circuit; both ammeters read the same value.'],

  ['g9s-p5-v042', 'measuring_current_voltage', 3,
   'A voltmeter across a cell reads 9 V with no other components connected. When a lamp is connected, the voltmeter reads 8.4 V. What does this show?',
   ['The cell has internal resistance, so some voltage is &ldquo;lost&rdquo; inside the cell',
    'The voltmeter is faulty',
    'The lamp has increased the resistance to infinity',
    'The cell e.m.f. has permanently dropped'],
   'The cell has internal resistance, so some voltage is &ldquo;lost&rdquo; inside the cell',
   'The terminal voltage drops when current flows due to the internal resistance of the cell.',
   'When current flows, the internal resistance of the cell causes a voltage drop inside it; the terminal voltage (8.4 V) is less than the open-circuit e.m.f. (9 V).'],

  // ── current_voltage_resistance (v043–v056) ────────────────────────────
  ['g9s-p5-v043', 'current_voltage_resistance', 1,
   'State Ohm&rsquo;s Law.',
   ['The current through a conductor is directly proportional to the potential difference across it (at constant temperature)',
    'The resistance is directly proportional to the length of the conductor',
    'The voltage is inversely proportional to the current',
    'Current equals resistance multiplied by temperature'],
   'The current through a conductor is directly proportional to the potential difference across it (at constant temperature)',
   'Ohm&rsquo;s Law: V = IR.',
   'Ohm&rsquo;s Law: V = IR, or equivalently, I is proportional to V at constant temperature.'],

  ['g9s-p5-v044', 'current_voltage_resistance', 1,
   'What is the formula linking voltage, current and resistance?',
   ['V = IR', 'V = I + R', 'V = I &divide; R', 'V = R &divide; I'],
   'V = IR',
   'Ohm&rsquo;s Law: Voltage = Current &times; Resistance.',
   'Ohm&rsquo;s Law: V = IR. Current I = V/R; Resistance R = V/I.'],

  ['g9s-p5-v045', 'current_voltage_resistance', 1,
   'What is the SI unit of electrical resistance?',
   ['Ohm (&Omega;)', 'Volt (V)', 'Ampere (A)', 'Watt (W)'],
   'Ohm (&Omega;)',
   'Named after Georg Ohm.',
   'The SI unit of resistance is the ohm (&Omega;).'],

  ['g9s-p5-v046', 'current_voltage_resistance', 2,
   'A resistor has a potential difference of 12 V across it and a current of 3 A through it. What is its resistance?',
   ['4 &Omega;', '36 &Omega;', '9 &Omega;', '0.25 &Omega;'], '4 &Omega;',
   'R = V &divide; I.',
   'R = 12 &divide; 3 = 4 &Omega;.'],

  ['g9s-p5-v047', 'current_voltage_resistance', 2,
   'A 6 &Omega; resistor has a current of 2 A through it. What is the potential difference across it?',
   ['12 V', '3 V', '0.33 V', '8 V'], '12 V',
   'V = IR.',
   'V = 2 &times; 6 = 12 V.'],

  ['g9s-p5-v048', 'current_voltage_resistance', 2,
   'A lamp has a resistance of 10 &Omega; and is connected to a 5 V supply. What current flows through it?',
   ['0.5 A', '2 A', '50 A', '0.05 A'], '0.5 A',
   'I = V &divide; R.',
   'I = 5 &divide; 10 = 0.5 A.'],

  ['g9s-p5-v049', 'current_voltage_resistance', 3,
   'The circuit shows a 6 V cell, a 3 &Omega; resistor and an ammeter in series.<br>' + CKT_6V + 'What does the ammeter read?',
   ['2 A', '3 A', '0.5 A', '18 A'], '2 A',
   'I = V &divide; R = 6 &divide; 3.',
   'I = 6 &divide; 3 = 2 A.'],

  ['g9s-p5-v050', 'current_voltage_resistance', 3,
   'A 12 V source, a 4 &Omega; resistor and an ammeter are in series.<br>' + CKT_12V + 'What does the ammeter read?',
   ['3 A', '48 A', '0.33 A', '8 A'], '3 A',
   'I = V &divide; R = 12 &divide; 4.',
   'I = 12 &divide; 4 = 3 A.'],

  ['g9s-p5-v051', 'current_voltage_resistance', 2,
   'Doubling the resistance in a circuit while keeping the voltage constant does what to the current?',
   ['Halves the current',
    'Doubles the current',
    'Has no effect on the current',
    'Quadruples the current'],
   'Halves the current',
   'I = V/R; if R doubles and V is constant, I halves.',
   'I = V &divide; R. If R doubles, I = V &divide; (2R) = half the original current.'],

  ['g9s-p5-v052', 'current_voltage_resistance', 2,
   'Doubling the voltage while keeping the resistance constant does what to the current?',
   ['Doubles the current',
    'Halves the current',
    'Has no effect',
    'Quadruples the current'],
   'Doubles the current',
   'I = V/R; if V doubles and R is constant, I doubles.',
   'I = V &divide; R. If V doubles, I = (2V) &divide; R = twice the original current.'],

  ['g9s-p5-v053', 'current_voltage_resistance', 3,
   'A current of 0.4 A flows through a wire with a resistance of 15 &Omega;. What is the potential difference across the wire?',
   ['6 V', '37.5 V', '0.027 V', '3 V'], '6 V',
   'V = IR.',
   'V = 0.4 &times; 15 = 6 V.'],

  ['g9s-p5-v054', 'current_voltage_resistance', 3,
   'A nichrome wire carries 1.5 A at 9 V. Calculate its resistance.',
   ['6 &Omega;', '13.5 &Omega;', '10.5 &Omega;', '7.5 &Omega;'], '6 &Omega;',
   'R = V &divide; I.',
   'R = 9 &divide; 1.5 = 6 &Omega;.'],

  ['g9s-p5-v055', 'current_voltage_resistance', 2,
   'A conductor obeys Ohm&rsquo;s Law. A graph of V (y-axis) against I (x-axis) is plotted. What is the shape of the graph?',
   ['A straight line through the origin',
    'A curve that bends upward',
    'A curve that bends downward',
    'A horizontal straight line'],
   'A straight line through the origin',
   'V = IR means V is directly proportional to I.',
   'V = IR is a linear equation; a graph of V vs I is a straight line through the origin with gradient = R.'],

  ['g9s-p5-v056', 'current_voltage_resistance', 3,
   'A student measures the current through a lamp at different voltages. At low voltages, the lamp follows Ohm&rsquo;s Law but at high voltages the line curves. Why?',
   ['At high voltages the lamp gets hotter; its resistance increases with temperature, reducing the current below the Ohm&rsquo;s Law prediction',
    'The student made errors at high voltages',
    'Ohm&rsquo;s Law only applies above 100 V',
    'The resistance decreases at high temperature, increasing the current'],
   'At high voltages the lamp gets hotter; its resistance increases with temperature, reducing the current below the Ohm&rsquo;s Law prediction',
   'The resistance of a metal increases with temperature.',
   'A lamp filament heats up at high voltages; its resistance rises, so the current is less than Ohm&rsquo;s Law predicts for an ideal resistor at constant temperature.'],

  // ── charge_and_current (v057–v070) ────────────────────────────────────
  ['g9s-p5-v057', 'charge_and_current', 1,
   'What is the relationship between charge, current and time?',
   ['Q = It (charge = current &times; time)',
    'Q = I &divide; t',
    'Q = t &divide; I',
    'Q = I + t'],
   'Q = It (charge = current &times; time)',
   'Q in coulombs = I in amperes &times; t in seconds.',
   'Charge Q = current I &times; time t; Q is in coulombs (C), I in amperes (A), t in seconds (s).'],

  ['g9s-p5-v058', 'charge_and_current', 1,
   'What is the SI unit of electric charge?',
   ['Coulomb (C)', 'Ampere (A)', 'Volt (V)', 'Joule (J)'],
   'Coulomb (C)',
   'Named after Charles-Augustin de Coulomb.',
   'The SI unit of electric charge is the coulomb (C); 1 C = 1 A &times; 1 s.'],

  ['g9s-p5-v059', 'charge_and_current', 2,
   'A current of 2 A flows for 30 s. How much charge passes?',
   ['60 C', '15 C', '0.067 C', '2 C'], '60 C',
   'Q = It.',
   'Q = 2 &times; 30 = 60 C.'],

  ['g9s-p5-v060', 'charge_and_current', 2,
   'A charge of 90 C passes through a wire in 18 s. What is the current?',
   ['5 A', '1 620 A', '0.2 A', '72 A'], '5 A',
   'I = Q &divide; t.',
   'I = 90 &divide; 18 = 5 A.'],

  ['g9s-p5-v061', 'charge_and_current', 2,
   'A current of 0.5 A flows. How long does it take for 10 C of charge to pass?',
   ['20 s', '5 s', '0.05 s', '10 s'], '20 s',
   't = Q &divide; I.',
   't = 10 &divide; 0.5 = 20 s.'],

  ['g9s-p5-v062', 'charge_and_current', 3,
   'A torch draws 0.3 A from its battery. How much charge is supplied in 5 minutes?',
   ['90 C', '1.5 C', '0.001 C', '18 C'], '90 C',
   'Convert 5 min to seconds; then Q = It.',
   'Q = 0.3 &times; (5 &times; 60) = 0.3 &times; 300 = 90 C.'],

  ['g9s-p5-v063', 'charge_and_current', 2,
   'A current of 4 A flows through a lamp for 10 s. How many coulombs of charge pass through the lamp?',
   ['40 C', '0.4 C', '14 C', '4 C'], '40 C',
   'Q = It.',
   'Q = 4 &times; 10 = 40 C.'],

  ['g9s-p5-v064', 'charge_and_current', 3,
   'A battery delivers 360 C in 2 minutes. What is the average current?',
   ['3 A', '720 A', '6 A', '180 A'], '3 A',
   't = 2 min = 120 s; I = Q &divide; t.',
   'I = 360 &divide; 120 = 3 A.'],

  ['g9s-p5-v065', 'charge_and_current', 3,
   'Each electron carries a charge of 1.6 &times; 10&sup2;&sup1;C. How many electrons pass a point when 4.8 &times; 10&sup2;&sup1;C of charge passes?',
   ['3 electrons', '30 electrons', '7.68 electrons', '0.33 electrons'],
   '3 electrons',
   'Number = Q &divide; charge per electron.',
   '4.8 &times; 10&sup2;&sup1;C &divide; 1.6 &times; 10&sup2;&sup1;C = 3 electrons.'],

  ['g9s-p5-v066', 'charge_and_current', 2,
   'Current is defined as the rate of flow of which quantity?',
   ['Electric charge', 'Electric voltage', 'Electric energy', 'Electric resistance'],
   'Electric charge',
   'Current = charge &divide; time.',
   'Current I = Q &divide; t; current is the rate of flow of charge past a point.'],

  ['g9s-p5-v067', 'charge_and_current', 2,
   'A student charges a capacitor until it holds 0.005 C at 10 V. What current flowed during charging if it took 0.05 s?',
   ['0.1 A', '0.5 A', '2 A', '0.05 A'], '0.1 A',
   'I = Q &divide; t.',
   'I = 0.005 &divide; 0.05 = 0.1 A.'],

  ['g9s-p5-v068', 'charge_and_current', 3,
   'A current of 250 mA flows through a circuit. Express this in amperes and calculate the charge after 2 minutes.',
   ['0.25 A; 30 C', '250 A; 30 000 C', '0.025 A; 3 C', '25 A; 3 000 C'],
   '0.25 A; 30 C',
   '250 mA = 0.25 A; Q = 0.25 &times; 120.',
   '250 mA = 0.25 A. Q = 0.25 &times; 120 = 30 C.'],

  ['g9s-p5-v069', 'charge_and_current', 2,
   'What is the current if 120 C pass through a wire in 1 minute?',
   ['2 A', '120 A', '0.5 A', '7 200 A'], '2 A',
   '1 min = 60 s; I = Q &divide; t.',
   'I = 120 &divide; 60 = 2 A.'],

  ['g9s-p5-v070', 'charge_and_current', 3,
   'A car starter motor draws 200 A for 4 s. How much charge is transferred from the battery?',
   ['800 C', '50 C', '204 C', '196 C'], '800 C',
   'Q = It.',
   'Q = 200 &times; 4 = 800 C.'],

  // ── potential_difference (v071–v084) ─────────────────────────────────
  ['g9s-p5-v071', 'potential_difference', 1,
   'What is the formula linking work, charge and potential difference?',
   ['W = QV', 'W = Q + V', 'W = Q &divide; V', 'W = V &divide; Q'],
   'W = QV',
   'Work done (J) = charge (C) &times; potential difference (V).',
   'W = QV: the work done (in joules) when charge Q moves through a potential difference V.'],

  ['g9s-p5-v072', 'potential_difference', 1,
   'What is the potential difference if 10 J of work is done to move 2 C of charge?',
   ['5 V', '20 V', '12 V', '0.2 V'], '5 V',
   'V = W &divide; Q.',
   'V = 10 &divide; 2 = 5 V.'],

  ['g9s-p5-v073', 'potential_difference', 2,
   'A charge of 5 C moves through a potential difference of 12 V. How much work is done?',
   ['60 J', '2.4 J', '17 J', '7 J'], '60 J',
   'W = QV.',
   'W = 5 &times; 12 = 60 J.'],

  ['g9s-p5-v074', 'potential_difference', 2,
   'A 9 V battery transfers 18 J of energy. How many coulombs of charge move through it?',
   ['2 C', '162 C', '0.5 C', '9 C'], '2 C',
   'Q = W &divide; V.',
   'Q = 18 &divide; 9 = 2 C.'],

  ['g9s-p5-v075', 'potential_difference', 3,
   'A current of 3 A flows through a 4 &Omega; resistor for 10 s. How much work is done on the resistor?',
   ['360 J', '120 J', '36 J', '1 200 J'], '360 J',
   'Q = It = 30 C; W = QV; V = IR = 12 V.',
   'Q = 3 &times; 10 = 30 C. V = 3 &times; 4 = 12 V. W = 30 &times; 12 = 360 J.'],

  ['g9s-p5-v076', 'potential_difference', 2,
   'What does the e.m.f. of a cell represent?',
   ['The energy given to each coulomb of charge by the cell',
    'The current the cell can supply',
    'The resistance of the cell',
    'The total charge stored in the cell'],
   'The energy given to each coulomb of charge by the cell',
   'e.m.f. is measured in volts = joules per coulomb.',
   'The e.m.f. (electromotive force) of a cell is the energy supplied per coulomb of charge that flows through the cell.'],

  ['g9s-p5-v077', 'potential_difference', 3,
   'A cell has an e.m.f. of 1.5 V. How much energy does it give to 4 C of charge?',
   ['6 J', '1.5 J', '2.67 J', '0.375 J'], '6 J',
   'W = QV = 4 &times; 1.5.',
   'W = QV = 4 &times; 1.5 = 6 J.'],

  ['g9s-p5-v078', 'potential_difference', 2,
   'What is the meaning of a potential difference of 1 V?',
   ['1 joule of energy is transferred for every coulomb of charge that moves',
    '1 ampere of current flows for every ohm of resistance',
    '1 coulomb of charge is stored',
    '1 watt of power is consumed'],
   '1 joule of energy is transferred for every coulomb of charge that moves',
   '1 V = 1 J/C.',
   '1 volt = 1 joule per coulomb; it means 1 J of energy is transferred when 1 C of charge moves through the potential difference.'],

  ['g9s-p5-v079', 'potential_difference', 3,
   'A hair dryer operates at 240 V and draws 5 A for 2 minutes. How much energy is transferred?',
   ['144 000 J', '1 200 J', '2 400 J', '48 000 J'], '144 000 J',
   'W = QV; Q = It; or W = VIt.',
   'Q = 5 &times; 120 = 600 C. W = 600 &times; 240 = 144 000 J.'],

  ['g9s-p5-v080', 'potential_difference', 2,
   'A torch bulb converts 0.6 J of energy per second. It operates at 3 V. What current flows?',
   ['0.2 A', '1.8 A', '5 A', '0.6 A'], '0.2 A',
   'Power P = VI; I = P &divide; V. (0.6 J/s = 0.6 W.)',
   'Power P = 0.6 W. I = P &divide; V = 0.6 &divide; 3 = 0.2 A.'],

  ['g9s-p5-v081', 'potential_difference', 3,
   'A resistor has 8 V across it and 0.5 A through it. How much energy is transferred in 1 minute?',
   ['240 J', '4 J', '2 J', '24 J'], '240 J',
   'W = QV; Q = It = 0.5 &times; 60 = 30 C; W = 30 &times; 8.',
   'Q = 0.5 &times; 60 = 30 C. W = QV = 30 &times; 8 = 240 J.'],

  ['g9s-p5-v082', 'potential_difference', 2,
   'If the potential difference across a component doubles and the charge moved doubles, what happens to the work done?',
   ['It quadruples (W = QV; both Q and V doubled)',
    'It doubles',
    'It stays the same',
    'It halves'],
   'It quadruples (W = QV; both Q and V doubled)',
   'W = QV. If Q &rarr; 2Q and V &rarr; 2V, then W &rarr; 4W.',
   'W = QV. New W = 2Q &times; 2V = 4QV = 4 times the original work.'],

  ['g9s-p5-v083', 'potential_difference', 3,
   'A cell with e.m.f. 6 V transfers 300 J of energy. How many coulombs of charge have flowed?',
   ['50 C', '1 800 C', '0.02 C', '294 C'], '50 C',
   'Q = W &divide; V.',
   'Q = 300 &divide; 6 = 50 C.'],

  ['g9s-p5-v084', 'potential_difference', 2,
   'The potential difference across a lamp is 4 V and 2 C of charge moves through it. How much energy is transferred to the lamp?',
   ['8 J', '2 J', '0.5 J', '6 J'], '8 J',
   'W = QV.',
   'W = 2 &times; 4 = 8 J.'],

  // ── dc_circuit_problems (v085–v098) ───────────────────────────────────
  ['g9s-p5-v085', 'dc_circuit_problems', 2,
   'A 12 V battery is connected to a 6 &Omega; resistor. What is the current?',
   ['2 A', '72 A', '0.5 A', '18 A'], '2 A',
   'I = V &divide; R.',
   'I = 12 &divide; 6 = 2 A.'],

  ['g9s-p5-v086', 'dc_circuit_problems', 3,
   'Two resistors of 3 &Omega; and 6 &Omega; are in series with a 27 V supply. What is the voltage across the 6 &Omega; resistor?',
   ['18 V', '9 V', '27 V', '6 V'], '18 V',
   'I = 27/9 = 3 A; V = 3 &times; 6.',
   'R&sub;total; = 9 &Omega;. I = 3 A. V = 3 &times; 6 = 18 V.'],

  ['g9s-p5-v087', 'dc_circuit_problems', 3,
   'A circuit has a 24 V supply and three series resistors: 2 &Omega;, 4 &Omega; and 6 &Omega;. What is the voltage across the 4 &Omega; resistor?',
   ['8 V', '4 V', '12 V', '6 V'], '8 V',
   'I = 24/12 = 2 A. V = 2 &times; 4.',
   'R&sub;total; = 12 &Omega;. I = 2 A. V = 2 &times; 4 = 8 V.'],

  ['g9s-p5-v088', 'dc_circuit_problems', 2,
   'A 9 V supply drives current through a 15 &Omega; resistor in series with an unknown resistor R. The current is 0.3 A. What is R?',
   ['15 &Omega;', '30 &Omega;', '45 &Omega;', '60 &Omega;'], '15 &Omega;',
   'Total R = V/I = 30 &Omega;. Known R = 15 &Omega;. Unknown R = 30 &minus; 15.',
   'R&sub;total; = 9/0.3 = 30 &Omega;. Unknown R = 30 &minus; 15 = 15 &Omega;.'],

  ['g9s-p5-v089', 'dc_circuit_problems', 3,
   'A circuit has a 6 V source, a switch and a 3 &Omega; lamp in series. When the switch is closed, how much charge passes through the lamp in 10 s?',
   ['20 C', '2 C', '60 C', '30 C'], '20 C',
   'I = V/R = 2 A. Q = It = 2 &times; 10.',
   'I = 6 &divide; 3 = 2 A. Q = 2 &times; 10 = 20 C.'],

  ['g9s-p5-v090', 'dc_circuit_problems', 3,
   'A 12 V cell drives 4 A through a circuit. How much work is done in 30 s?',
   ['1 440 J', '48 J', '360 J', '120 J'], '1 440 J',
   'Q = It = 4 &times; 30 = 120 C. W = QV = 120 &times; 12.',
   'Q = 120 C. W = 120 &times; 12 = 1 440 J.'],

  ['g9s-p5-v091', 'dc_circuit_problems', 2,
   'Two 6 &Omega; lamps are connected in series to a 12 V supply. What is the current?',
   ['1 A', '2 A', '4 A', '0.5 A'], '1 A',
   'R&sub;total; = 12 &Omega;. I = V/R.',
   'R&sub;total; = 6 + 6 = 12 &Omega;. I = 12 &divide; 12 = 1 A.'],

  ['g9s-p5-v092', 'dc_circuit_problems', 3,
   'A series circuit has a 15 V supply. The voltage across resistor 1 is 6 V and across resistor 2 is 9 V. A total charge of 30 C passes in 1 minute. What is the current?',
   ['0.5 A', '30 A', '2 A', '1 A'], '0.5 A',
   'I = Q &divide; t = 30 &divide; 60.',
   'I = 30 &divide; 60 = 0.5 A. (Check: V&sub;total; = 6 + 9 = 15 V ✓)'],

  ['g9s-p5-v093', 'dc_circuit_problems', 3,
   'A series circuit has a 20 V source and two resistors. The current is 2 A. Resistor 1 is 4 &Omega;. What is the resistance of resistor 2?',
   ['6 &Omega;', '10 &Omega;', '4 &Omega;', '16 &Omega;'], '6 &Omega;',
   'R&sub;total; = V/I = 10 &Omega;. R&#8322; = R&sub;total; &minus; R&#8321;.',
   'R&sub;total; = 20/2 = 10 &Omega;. R&#8322; = 10 &minus; 4 = 6 &Omega;.'],

  ['g9s-p5-v094', 'dc_circuit_problems', 2,
   'A resistor of 8 &Omega; is connected to a 16 V battery. What is the charge that passes through in 5 s?',
   ['10 C', '2 C', '80 C', '5 C'], '10 C',
   'I = V/R = 2 A; Q = It = 2 &times; 5.',
   'I = 16/8 = 2 A. Q = 2 &times; 5 = 10 C.'],

  ['g9s-p5-v095', 'dc_circuit_problems', 3,
   'A series circuit has a 9 V source and two resistors (R&#8321; = 3 &Omega;, R&#8322; = 6 &Omega;). How much energy is transferred across R&#8322; in 20 s?',
   ['120 J', '240 J', '360 J', '60 J'], '120 J',
   'I = 9/9 = 1 A; V&#8322; = 6 V; Q = 1 &times; 20 = 20 C; W = QV&#8322;.',
   'R&sub;total; = 9 &Omega;. I = 1 A. V&#8322; = 1 &times; 6 = 6 V. Q = 1 &times; 20 = 20 C. W = 20 &times; 6 = 120 J.'],

  ['g9s-p5-v096', 'dc_circuit_problems', 2,
   'A 6 V battery is connected to a single 3 &Omega; resistor. The current flows for 1 minute. How much charge passes?',
   ['120 C', '180 C', '60 C', '2 C'], '120 C',
   'I = V/R = 2 A; Q = It = 2 &times; 60.',
   'I = 6/3 = 2 A. Q = 2 &times; 60 = 120 C.'],

  ['g9s-p5-v097', 'dc_circuit_problems', 3,
   'A series circuit has a 30 V supply and three equal resistors (each 5 &Omega;). What is the voltage across each resistor?',
   ['10 V', '30 V', '5 V', '15 V'], '10 V',
   'R&sub;total; = 15 &Omega;; I = 2 A; V&sub;each; = 2 &times; 5.',
   'R&sub;total; = 15 &Omega;. I = 30/15 = 2 A. V = 2 &times; 5 = 10 V each.'],

  ['g9s-p5-v098', 'dc_circuit_problems', 3,
   'A student measures the current in a series circuit as 0.4 A. The supply is 8 V. She then adds a 5 &Omega; resistor in series. What is the new current?',
   ['Approximately 0.32 A', '0.4 A', '0.8 A', '0.08 A'],
   'Approximately 0.32 A',
   'Original R = V/I = 20 &Omega;. New R = 25 &Omega;. New I = 8/25.',
   'Original R = 8/0.4 = 20 &Omega;. New R = 25 &Omega;. New I = 8/25 = 0.32 A.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

})();
