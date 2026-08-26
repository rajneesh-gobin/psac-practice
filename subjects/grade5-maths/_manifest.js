'use strict';
// ══════════════════════════════════════════════
//  Subject Pack: Grade 5 Mathematics (MIE Mauritius)
//  Defines CHAPTERS, SYLLABUS, FORMULAS, BADGES, GENERATORS
//  Must load AFTER engine/helpers.js
// ══════════════════════════════════════════════

// ── CHAPTERS ───────────────────────────────────
const CHAPTERS = [
  { id:'numeration',  name:'Numeration & Notation',   icon:'🔢', color:'blue',   part:1, examWeight:3 },
  { id:'four_ops',    name:'Four Operations',          icon:'➕', color:'purple', part:1, examWeight:5 },
  { id:'square_nums', name:'Square Numbers & Patterns',icon:'⬜', color:'indigo', part:1, examWeight:2 },
  { id:'geometry',    name:'Geometry & Angles',        icon:'📐', color:'teal',   part:1, examWeight:4 },
  { id:'fractions',   name:'Fractions',                icon:'½',  color:'orange', part:1, examWeight:4 },
  { id:'decimals',    name:'Decimals',                 icon:'•',  color:'amber',  part:1, examWeight:3 },
  { id:'powers',      name:'Powers & Exponents',       icon:'²',  color:'red',    part:1, examWeight:2 },
  { id:'average',     name:'Average',                  icon:'📊', color:'green',  part:2, examWeight:2 },
  { id:'ratio',       name:'Ratio & Proportion',       icon:'⚖️', color:'cyan',   part:2, examWeight:3 },
  { id:'percentage',  name:'Percentage',               icon:'%',  color:'pink',   part:2, examWeight:3 },
  { id:'length',      name:'Length & Perimeter',       icon:'📏', color:'lime',   part:2, examWeight:3 },
  { id:'area',        name:'Area',                     icon:'▭',  color:'yellow', part:2, examWeight:3 },
  { id:'capacity',    name:'Capacity',                 icon:'🧪', color:'sky',    part:2, examWeight:2 },
  { id:'mass',        name:'Mass',                     icon:'⚖️', color:'violet', part:2, examWeight:2 },
  { id:'money',       name:'Money & Profit/Loss',      icon:'💰', color:'emerald',part:2, examWeight:3 },
  { id:'time',        name:'Time',                     icon:'⏰', color:'rose',   part:2, examWeight:3 },
  { id:'graphs',      name:'Graphs & Data',            icon:'📈', color:'fuchsia',part:2, examWeight:1 },
  { id:'conversions', name:'Unit Conversions',          icon:'🔄', color:'teal',   part:2, examWeight:2 },
];

// ── SYLLABUS ───────────────────────────────────
const G5M_SYLLABUS = {
  numeration:  { subsections: [
    { id:'place_value',  name:'Place Value (up to 100,000)' },
    { id:'words_digits', name:'Numbers in Words & Figures' },
    { id:'ordering',     name:'Ordering & Comparing Numbers' },
    { id:'expanded',     name:'Expanded Notation' },
    { id:'rounding',     name:'Rounding' },
    { id:'roman',        name:'Roman Numerals' },
    { id:'sequences',    name:'Number Sequences & Patterns' },
    { id:'word_probs',   name:'Word Problems' },
  ]},
  four_ops:    { subsections: [
    { id:'addition',     name:'Addition & Subtraction' },
    { id:'multiplication',name:'Multiplication' },
    { id:'division',     name:'Division with Remainders' },
    { id:'mixed_ops',    name:'Mixed Operations / BODMAS' },
    { id:'word_probs',   name:'Multi-step Word Problems' },
  ]},
  square_nums: { subsections: [
    { id:'square_nums',  name:'Square Numbers (1² to 15²)' },
    { id:'square_roots', name:'Square Roots' },
    { id:'patterns',     name:'Number Patterns & Sequences' },
    { id:'word_probs',   name:'Word Problems' },
  ]},
  geometry:    { subsections: [
    { id:'angles',       name:'Types & Measurement of Angles' },
    { id:'2d_shapes',    name:'Properties of 2D Shapes' },
    { id:'3d_shapes',    name:'Properties of 3D Shapes' },
    { id:'symmetry',     name:'Lines of Symmetry' },
    { id:'directions',   name:'Compass Directions & Turns' },
    { id:'perimeter',    name:'Perimeter & Compound Shapes' },
  ]},
  fractions:   { subsections: [
    { id:'proper_improper',name:'Proper, Improper & Mixed Numbers' },
    { id:'equivalent',   name:'Equivalent Fractions' },
    { id:'comparing',    name:'Comparing & Ordering Fractions' },
    { id:'add_sub',      name:'Adding & Subtracting Fractions' },
    { id:'fraction_of',  name:'Fraction of a Quantity' },
    { id:'word_probs',   name:'Word Problems' },
  ]},
  decimals:    { subsections: [
    { id:'place_value',  name:'Decimal Place Value' },
    { id:'ordering',     name:'Ordering Decimals' },
    { id:'operations',   name:'Adding & Subtracting Decimals' },
    { id:'conversion',   name:'Fractions ↔ Decimals' },
    { id:'word_probs',   name:'Word Problems' },
  ]},
  powers:      { subsections: [
    { id:'notation',     name:'Power / Exponent Notation' },
    { id:'calculate',    name:'Calculating Powers' },
    { id:'word_probs',   name:'Power Word Problems' },
  ]},
  average:     { subsections: [
    { id:'mean',         name:'Finding the Mean (Average)' },
    { id:'missing',      name:'Finding a Missing Value from Mean' },
    { id:'word_probs',   name:'Average Word Problems' },
  ]},
  ratio:       { subsections: [
    { id:'writing',      name:'Writing & Simplifying Ratios' },
    { id:'dividing',     name:'Dividing a Quantity in a Ratio' },
    { id:'equivalent',   name:'Equivalent Ratios' },
    { id:'word_probs',   name:'Ratio Word Problems' },
  ]},
  percentage:  { subsections: [
    { id:'meaning',      name:'What Percentage Means' },
    { id:'conversion',   name:'Converting Fractions/Decimals ↔ Percentages' },
    { id:'of_quantity',  name:'Finding a Percentage of a Quantity' },
    { id:'increase',     name:'Percentage Increase & Decrease' },
    { id:'word_probs',   name:'Word Problems' },
  ]},
  length:      { subsections: [
    { id:'conversion',   name:'Unit Conversions (km/m/cm/mm)' },
    { id:'perimeter',    name:'Perimeter of Shapes' },
    { id:'word_probs',   name:'Length Word Problems' },
  ]},
  area:        { subsections: [
    { id:'rectangle',    name:'Area of Rectangles & Squares' },
    { id:'compound',     name:'Area of Compound Shapes' },
    { id:'triangle',     name:'Area of Triangles' },
    { id:'word_probs',   name:'Word Problems' },
  ]},
  capacity:    { subsections: [
    { id:'conversion',   name:'Litres & Millilitres' },
    { id:'operations',   name:'Adding & Subtracting Capacity' },
    { id:'word_probs',   name:'Capacity Word Problems' },
  ]},
  mass:        { subsections: [
    { id:'conversion',   name:'Kilograms & Grams' },
    { id:'operations',   name:'Adding & Subtracting Mass' },
    { id:'word_probs',   name:'Mass Word Problems' },
  ]},
  money:       { subsections: [
    { id:'operations',   name:'Adding & Subtracting Money' },
    { id:'profit_loss',  name:'Profit & Loss' },
    { id:'discount',     name:'Discount & Best Buy' },
    { id:'word_probs',   name:'Money Word Problems' },
  ]},
  time:        { subsections: [
    { id:'reading',      name:'Reading 12h & 24h Clocks' },
    { id:'conversion',   name:'Converting Units of Time' },
    { id:'duration',     name:'Duration & Elapsed Time' },
    { id:'calendar',     name:'Calendar Problems' },
    { id:'word_probs',   name:'Word Problems' },
  ]},
  graphs:      { subsections: [
    { id:'pictogram',    name:'Pictograms' },
    { id:'bar_chart',    name:'Bar Charts' },
    { id:'frequency',    name:'Frequency Tables' },
    { id:'mean',         name:'Mean / Average from Data' },
  ]},
  conversions: { subsections: [
    { id:'mass',         name:'Mass (kg ↔ g, tonne ↔ kg)' },
    { id:'length',       name:'Length (km ↔ m ↔ cm ↔ mm)' },
    { id:'capacity',     name:'Capacity (L ↔ mL)' },
    { id:'time',         name:'Time (h ↔ min ↔ sec, days, weeks)' },
    { id:'money',        name:'Money (Rs ↔ cents)' },
    { id:'area',         name:'Area (m² ↔ cm²)' },
    { id:'mixed',        name:'Mixed & Multi-step Conversions' },
  ]},
};

// ── FORMULAS ───────────────────────────────────
const G5M_FORMULAS = {
  numeration: { title:'🔢 Numeration Facts', facts:[
    'Place values (L→R): Millions · Hundred-thousands · Ten-thousands · Thousands · Hundreds · Tens · Ones',
    'Rounding: Look at the next digit. ≥5 → round up. <5 → round down.',
    'Roman: I=1, V=5, X=10, L=50, C=100, D=500, M=1000',
    'XL=40, XC=90, CD=400, CM=900 (subtractive notation)',
  ]},
  four_ops: { title:'➕ Four Operations', facts:[
    'BODMAS: Brackets → Orders → Division → Multiplication → Addition → Subtraction',
    'Division check: quotient × divisor + remainder = dividend',
    'Multiplication shortcut: multiply × 10 then ÷2 to multiply by 5',
    'Working backwards: use inverse operations',
  ]},
  square_nums: { title:'⬜ Square Numbers', facts:[
    '1²=1  2²=4  3²=9  4²=16  5²=25',
    '6²=36  7²=49  8²=64  9²=81  10²=100',
    '11²=121  12²=144  13²=169  14²=196  15²=225',
    '√144=12 | √169=13 | √196=14 | √225=15',
  ]},
  geometry: { title:'📐 Geometry', facts:[
    'Angles in a triangle = 180°',
    'Angles in a quadrilateral = 360°',
    'Angles on a straight line = 180°',
    'Acute < 90° | Right = 90° | Obtuse: 90°–180° | Reflex > 180°',
  ]},
  fractions: { title:'½ Fractions', facts:[
    'Improper fraction: numerator > denominator (e.g. 7/4)',
    'Mixed number: whole + fraction (1¾). Convert: 1¾ = (4+3)/4 = 7/4',
    'Equivalent: multiply/divide top & bottom by the same number',
    'Adding unlike fractions: find LCD, convert, then add numerators',
    '¼ of X = X÷4 | ¾ of X = (X÷4)×3',
  ]},
  decimals: { title:'• Decimals', facts:[
    'Place values: ones . tenths hundredths thousandths',
    '0.1 = 1/10 | 0.01 = 1/100 | 0.001 = 1/1000',
    'Multiply by 10 → move decimal right one place',
    '÷ by 10 → move decimal left one place',
  ]},
  powers: { title:'² Powers & Exponents', facts:[
    '2³ = 2×2×2 = 8 (2 to the power of 3)',
    '10¹=10 | 10²=100 | 10³=1,000 | 10⁴=10,000',
    'Volume of cube = side³',
    'Area of square = side²',
  ]},
  average: { title:'📊 Average', facts:[
    'Mean = sum of values ÷ count',
    'Missing value: Total = mean × count. Missing = total − sum of known.',
    'If new average > old average → new value > old average',
    'Mode = most frequent | Median = middle value (sorted)',
  ]},
  ratio: { title:'⚖️ Ratio', facts:[
    'Simplify: divide both parts by their HCF',
    'Dividing ratio a:b → total parts = a+b. First share = (a/total)×whole',
    'Equivalent ratios: multiply/divide both sides by same number',
    'If a:b = c:d then a×d = b×c (cross multiply)',
  ]},
  percentage: { title:'% Percentage', facts:[
    '% means "per hundred" - 45% = 45/100',
    'Fraction/decimal → %: multiply by 100 (0.5 = 50% | ¼ = 25%)',
    '% of a quantity: (percentage ÷ 100) × quantity',
    'Percentage increase/decrease: find the change, then (change ÷ original) × 100',
  ]},
  length: { title:'📏 Length', facts:[
    '1 km = 1,000 m | 1 m = 100 cm | 1 cm = 10 mm',
    '1 km = 100,000 cm = 1,000,000 mm',
    'Perimeter = sum of all sides',
    'Rectangle perimeter = 2 × (length + width)',
  ]},
  area: { title:'▭ Area', facts:[
    'Rectangle: Area = length × width',
    'Square: Area = side²',
    'Triangle: Area = ½ × base × height',
    '1 m² = 10,000 cm² | 1 cm² = 100 mm²',
    'Compound shape: split into rectangles, find each area, add.',
  ]},
  capacity: { title:'🧪 Capacity', facts:[
    '1 L = 1,000 mL',
    '½ L = 500 mL | ¼ L = 250 mL | ¾ L = 750 mL',
    '1 mL = 1 cm³ (same volume)',
  ]},
  mass: { title:'⚖️ Mass', facts:[
    '1 kg = 1,000 g',
    '½ kg = 500 g | ¼ kg = 250 g | ¾ kg = 750 g',
    '1 tonne = 1,000 kg',
  ]},
  money: { title:'💰 Money', facts:[
    'Rs 1 = 100 cents (sen)',
    'Profit = Selling Price − Buying Price (when SP > BP)',
    'Loss = Buying Price − Selling Price (when BP > SP)',
    'Buying Price = Selling Price − Profit',
  ]},
  time: { title:'⏰ Time', facts:[
    '1 min = 60 s | 1 hour = 60 min | 1 day = 24 hours',
    '1 week = 7 days | 1 year = 365 days (366 leap year)',
    'pm to 24h: add 12. e.g. 3:30 pm = 15:30',
    'Months: Jan 31, Feb 28/29, Mar 31, Apr 30, May 31, Jun 30, Jul 31, Aug 31, Sep 30, Oct 31, Nov 30, Dec 31',
  ]},
  graphs: { title:'📈 Graphs & Data', facts:[
    'Mean (average) = total ÷ count',
    'Pictogram: count symbols × key value',
    'Bar chart: read the height from the y-axis',
    'Range = highest value − lowest value',
    'Mode = most common value | Median = middle when sorted',
  ]},
  conversions: { title:'🔄 Unit Conversions - All Facts', facts:[
    '── MASS ──   1 kg = 1,000 g  |  1 tonne = 1,000 kg',
    '── LENGTH ── 1 km = 1,000 m  |  1 m = 100 cm  |  1 cm = 10 mm',
    '   1 km = 100,000 cm  |  1 m = 1,000 mm',
    '── CAPACITY ── 1 L = 1,000 mL  |  ½ L = 500 mL  |  ¼ L = 250 mL',
    '── TIME ── 1 min = 60 s  |  1 h = 60 min  |  1 h = 3,600 s',
    '   1 day = 24 h  |  1 week = 7 days  |  1 year = 52 weeks = 365 days',
    '── MONEY ── Rs 1 = 100 cents  |  Rs 0.01 = 1 cent',
    '── AREA ── 1 m² = 10,000 cm²  |  1 cm² = 100 mm²',
  ]},
};

// ── BADGES (Maths-specific only) ────────────────
// The generic badges - First Step, Sharp Mind, Speed Demon, Exam Ace,
// Centurion, Daily Hero, All Rounder - now live in engine/registry.js as
// GENERIC_BADGES and are awarded in every subject. Only badges that are
// genuinely about Maths chapters belong here.
// pct() comes from engine/helpers.js.
const G5M_BADGES = [
  { id:'fraction_wiz',   name:'Fraction Wizard',  icon:'🧙', desc:'Score 100% in Fractions',         cond: (s,c) => pct(c.fractions) === 100 },
  { id:'angle_det',      name:'Angle Detective',  icon:'🔍', desc:'Master Geometry chapter',         cond: (s,c) => pct(c.geometry) >= 80 },
  { id:'money_master',   name:'Money Master',     icon:'💰', desc:'Master Money & Profit/Loss',      cond: (s,c) => pct(c.money) >= 80 },
  { id:'time_keeper',    name:'Time Keeper',      icon:'⏰', desc:'Master Time chapter',             cond: (s,c) => pct(c.time) >= 80 },
  { id:'data_scientist', name:'Data Scientist',   icon:'📈', desc:'Master Graphs & Data',            cond: (s,c) => pct(c.graphs) >= 80 },
  { id:'converter',      name:'Unit Converter',   icon:'🔄', desc:'Master Unit Conversions',         cond: (s,c) => pct(c.conversions) >= 80 },
];

// ── DYNAMIC GENERATORS ──────────────────────────
// Every generated question needs a unique id. `Date.now()` on its own repeats
// for every call inside the same millisecond, and getMixedQuestions() de-dupes
// by id — so a run of generated questions collapsed to one and the padding
// largely did not work.
let _g5mGenSeq = 0;
const genId = prefix => `${prefix}${Date.now()}_${++_g5mGenSeq}`;

const G5M_GENERATORS = {

  numeration: (level) => {
    const n = rnd(10001, 99999);
    const nStr = String(n);
    const places = ['ten-thousands','thousands','hundreds','tens','ones'];
    const values = [10000,1000,100,10,1];
    const pos = rnd(0, 4);
    const dig = parseInt(nStr[pos]);
    const val = dig * values[pos];
    return makeNum({
      id: genId('GN'), chapterId:'numeration', difficulty:level,
      question:`What is the value of the digit <b>${dig}</b> in the number <b>${fmt(n)}</b>?`,
      answer: String(val), acceptableAnswers:[String(val), fmt(val)],
      hint:`The positions from right to left are: ones, tens, hundreds, thousands, ten-thousands. Find where the digit ${dig} sits.`,
      explanation:`In ${fmt(n)}, the digit ${dig} is in the <b>${places[pos]}</b> place. Value = ${dig} × ${fmt(values[pos])} = <b>${fmt(val)}</b>.`
    });
  },

  four_ops: (level) => {
    if (level <= 2) {
      const a = rnd(10000, 60000), b = rnd(1000, 30000);
      const op = Math.random() > 0.5 ? '+' : '-';
      const [big, small] = a > b ? [a, b] : [b, a];
      const ans = op === '+' ? big + small : big - small;
      return makeNum({
        id:genId('GF'), chapterId:'four_ops', difficulty:level,
        question:`Calculate: <b>${fmt(big)} ${op} ${fmt(small)}</b>`,
        answer: String(ans), acceptableAnswers:[String(ans), fmt(ans)],
        hint:`Line up digits by place value. Work ${op === '+' ? 'right to left, carrying' : 'right to left, borrowing'} when needed.`,
        explanation:`${fmt(big)} ${op} ${fmt(small)} = <b>${fmt(ans)}</b>.`
      });
    }

    if (level === 3) {
      const price = rnd(15, 80);
      const qty = rnd(12, 50);
      const total = price * qty;
      const paid = Math.ceil(total / 100) * 100 + rnd(0,1)*100;
      const change = paid - total;
      return makeNum({
        id:genId('GF'), chapterId:'four_ops', difficulty:level,
        question:`A school buys <b>${qty} exercise books</b> at <b>Rs ${price} each</b>.<br>The cashier pays with <b>Rs ${fmt(paid)}</b>.<br>How much <b>change</b> is received?`,
        answer: String(change), acceptableAnswers:[String(change), 'Rs '+change],
        hint:`Step 1: Total cost = ${qty} × Rs ${price}. Step 2: Change = Rs ${fmt(paid)} − total cost.`,
        explanation:`Total = ${qty} × ${price} = Rs ${fmt(total)}. Change = ${fmt(paid)} − ${fmt(total)} = <b>Rs ${fmt(change)}</b>.`
      });
    }

    const priceA = rnd(10, 50), qtyA = rnd(5, 20);
    const priceB = rnd(10, 50), qtyB = rnd(5, 20);
    const totalCost = priceA * qtyA + priceB * qtyB;
    const paid = Math.ceil(totalCost / 500) * 500;
    const change = paid - totalCost;
    return makeNum({
      id:genId('GF'), chapterId:'four_ops', difficulty:level,
      question:`Priya buys <b>${qtyA} pens at Rs ${priceA} each</b> and <b>${qtyB} pencils at Rs ${priceB} each</b>.<br>She pays with <b>Rs ${fmt(paid)}</b>. How much <b>change</b> does she get?`,
      answer: String(change), acceptableAnswers:[String(change), 'Rs '+change],
      hint:`Step 1: Cost of pens = ${qtyA}×${priceA}. Step 2: Cost of pencils = ${qtyB}×${priceB}. Step 3: Total. Step 4: Change = ${fmt(paid)} − total.`,
      explanation:`Pens = ${qtyA}×${priceA} = Rs ${qtyA*priceA}. Pencils = ${qtyB}×${priceB} = Rs ${qtyB*priceB}. Total = Rs ${totalCost}. Change = ${fmt(paid)}−${totalCost} = <b>Rs ${change}</b>.`
    });
  },

  fractions: (level) => {
    const denoms = [2,3,4,5,6,8,10];
    const gcdf = (a, b) => b === 0 ? a : gcdf(b, a % b);

    if (level <= 2) {
      const d = denoms[rnd(0, denoms.length - 1)];
      const n2 = rnd(1, d - 1);
      const whole = rnd(2, 9);
      const product = whole * n2;
      return makeNum({
        id:genId('GFR'), chapterId:'fractions', difficulty:level,
        question:`Calculate: <b>${n2}/${d} of ${whole * d}</b>`,
        answer: String(product), acceptableAnswers:[String(product)],
        hint:`Divide by ${d} first, then multiply by ${n2}.`,
        explanation:`${whole*d} ÷ ${d} = ${whole}. ${whole} × ${n2} = <b>${product}</b>.`
      });
    }

    if (level === 3) {
      const d1 = denoms[rnd(0, 3)];
      let d2 = denoms[rnd(0, 3)];
      if (d2 === d1) d2 = denoms[(denoms.indexOf(d1) + 1) % 4];
      const n1 = rnd(1, d1 - 1);
      const n2 = rnd(1, d2 - 1);
      const lcd = d1 * d2 / gcdf(d1, d2);
      const op = Math.random() > 0.4 ? '+' : '-';
      const numA = n1 * (lcd / d1);
      const numB = n2 * (lcd / d2);
      const resNum = op === '+' ? numA + numB : Math.abs(numA - numB);
      const g = gcdf(resNum, lcd);
      const simpNum = resNum / g, simpDen = lcd / g;
      const ansStr = simpDen === 1 ? String(simpNum) : `${simpNum}/${simpDen}`;
      return makeNum({
        id:genId('GFR'), chapterId:'fractions', difficulty:level,
        question:`Calculate: <b>${n1}/${d1} ${op} ${n2}/${d2}</b><br><i>Give your answer as a fraction (e.g. 3/4) or a whole number.</i>`,
        answer: ansStr, acceptableAnswers:[ansStr],
        hint:`LCD of ${d1} and ${d2} = ${lcd}. Convert: ${n1}/${d1} = ${numA}/${lcd} and ${n2}/${d2} = ${numB}/${lcd}.`,
        explanation:`${numA}/${lcd} ${op} ${numB}/${lcd} = ${resNum}/${lcd} = <b>${ansStr}</b>.`
      });
    }

    const d = denoms[rnd(1, 4)];
    const nfrac = rnd(1, d - 1);
    const scenarios = [
      { thing:'rupees', unit:'Rs', total: d * rnd(20, 100) },
      { thing:'mangoes', unit:'', total: d * rnd(4, 12) },
      { thing:'kg of flour', unit:'kg', total: d * rnd(2, 10) },
      { thing:'cm of ribbon', unit:'cm', total: d * rnd(10, 30) },
    ];
    const sc = scenarios[rnd(0, 3)];
    const whole = sc.total / d;
    const part = whole * nfrac;
    const unitStr = sc.unit ? sc.unit + ' ' : '';
    return makeNum({
      id:genId('GFR'), chapterId:'fractions', difficulty:level,
      question:`Meera has <b>${unitStr}${sc.total} ${sc.thing}</b>. She gives <b>${nfrac}/${d}</b> of them to her friend.<br>How much does she give away?`,
      answer: String(part), acceptableAnswers:[String(part), unitStr+part],
      hint:`Divide ${sc.total} by ${d} to get 1/${d}, then multiply by ${nfrac}.`,
      explanation:`${sc.total} ÷ ${d} = ${whole}. ${whole} × ${nfrac} = <b>${unitStr}${part}</b>.`
    });
  },

  area: (level) => {
    if (level <= 2) {
      const l = rnd(3, 20), w = rnd(2, 15);
      return makeNum({
        id: genId('GAR'), chapterId:'area', difficulty:level,
        question:`Find the <b>area</b> of a rectangle with length <b>${l} cm</b> and width <b>${w} cm</b>.`,
        answer: String(l*w), acceptableAnswers:[String(l*w), l*w+'cm2', l*w+' cm²'],
        hint:'Area of a rectangle = length × width.',
        explanation:`Area = ${l} × ${w} = <b>${l*w} cm²</b>.`
      });
    } else {
      const s = rnd(4, 15);
      return makeNum({
        id: genId('GAR'), chapterId:'area', difficulty:level,
        question:`A square has a side of <b>${s} cm</b>. Find its <b>area</b>.`,
        answer: String(s*s), acceptableAnswers:[String(s*s), s*s+'cm2', s*s+' cm²'],
        hint:'Area of a square = side × side = side².',
        explanation:`Area = ${s} × ${s} = ${s}² = <b>${s*s} cm²</b>.`
      });
    }
  },

  average: (level) => {
    // n numbers whose mean is EXACTLY avg.
    //
    // The old version generated the numbers, clamped them to >= 5 (which threw
    // the total off), then dumped the whole rounding difference into nums[0] —
    // and if that pushed nums[0] below 1, RESET it to `avg`. That reset silently
    // destroyed the total it had just balanced, so the "average" came out as
    // 25.333333333333332: correct arithmetic for the numbers shown, but not an
    // answer any child can type, and the only way to get it right was to be
    // wrong. Clamp the RANGE instead, and retry rather than patching the result.
    function makeNums(n, avg) {
      const lo = Math.max(5, avg - 20), hi = Math.max(lo, avg + 20);
      for (let attempt = 0; attempt < 50; attempt++) {
        const nums = Array.from({length: n}, () => rnd(lo, hi));
        nums[0] += avg * n - nums.reduce((a,b)=>a+b,0);
        if (nums[0] >= 1) return nums;
      }
      return Array.from({length: n}, () => avg);   // exact by construction
    }

    if (level <= 2) {
      const count = level === 1 ? rnd(3, 4) : rnd(4, 6);
      const avg = rnd(10, 50) * count;
      const nums = makeNums(count, Math.floor(avg / count));
      const total = nums.reduce((a,b)=>a+b,0);
      const answer = total / count;
      return makeNum({
        id:genId('GA'), chapterId:'average', difficulty:level,
        question:`Find the <b>average</b> of: <b>${nums.join(', ')}</b>`,
        answer: String(answer), acceptableAnswers:[String(answer)],
        hint:`Add all ${count} numbers then divide by ${count}.`,
        explanation:`Sum = ${total}. Average = ${total} ÷ ${count} = <b>${answer}</b>.`
      });
    }

    if (level === 3) {
      const count = rnd(4, 6);
      const avg = rnd(20, 70);
      const total = avg * count;
      // Retry rather than give up. The old version drew the known numbers once
      // and returned null if that left an implausible missing value — which
      // happened 48% of the time, and a null makes getQuestionsForChapter stop
      // padding altogether rather than try again.
      let known = null, missing = 0;
      for (let attempt = 0; attempt < 40; attempt++) {
        const k = Array.from({length: count - 1}, () => rnd(15, 85));
        const m = total - k.reduce((a,b)=>a+b,0);
        if (m >= 5 && m <= 150) { known = k; missing = m; break; }
      }
      if (!known) {
        // Every known number = the average, so the missing one is the average
        // too: always in range, and still a fair question.
        known = Array.from({length: count - 1}, () => avg);
        missing = avg;
      }
      return makeNum({
        id:genId('GA'), chapterId:'average', difficulty:level,
        question:`The average of <b>${count} numbers</b> is <b>${avg}</b>.<br>The known numbers are: <b>${known.join(', ')}</b>.<br>Find the <b>missing number</b>.`,
        answer: String(missing), acceptableAnswers:[String(missing)],
        hint:`Total of all numbers = average × count = ${avg} × ${count} = ${total}. Missing = ${total} − sum of known.`,
        explanation:`Total needed = ${avg} × ${count} = ${total}. Sum of known = ${known.join('+')} = ${known.reduce((a,b)=>a+b,0)}. Missing = ${total} − ${known.reduce((a,b)=>a+b,0)} = <b>${missing}</b>.`
      });
    }

    const scenarios = [
      () => {
        const days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
        const sales = days.map(() => rnd(40, 120));
        const total = sales.reduce((a,b)=>a+b,0);
        const avg = total / 5;
        if (!Number.isInteger(avg)) { sales[0] += 5 - (total % 5); }
        const t2 = sales.reduce((a,b)=>a+b,0), a2 = t2 / 5;
        return { q:`A shop sold the following number of items each day:<br><b>${days.map((d,i)=>d+': '+sales[i]).join(', ')}</b>.<br>What was the <b>average daily sales</b>?`,
          ans: String(a2), hint:`Add all 5 days then divide by 5.`, exp:`Total = ${t2}. Average = ${t2} ÷ 5 = <b>${a2}</b>.` };
      },
      () => {
        const names = ['Priya','Ahmad','Leila','Rohan'];
        const count = rnd(3, 4);
        const chosen = names.slice(0, count);
        const avg = rnd(50, 85);
        const scores = makeNums(count, avg);
        const total = scores.reduce((a,b)=>a+b,0);
        const answer = total / count;
        return { q:`${chosen.join(', ')} scored <b>${scores.join(', ')}</b> respectively in a maths test.<br>What is their <b>average mark</b>?`,
          ans: String(answer), hint:`Add all ${count} scores then divide by ${count}.`, exp:`Total = ${total}. Average = ${total} ÷ ${count} = <b>${answer}</b>.` };
      },
      () => {
        const count = rnd(3, 5);
        const avg = rnd(20, 60);
        const dists = makeNums(count, avg);
        const total = dists.reduce((a,b)=>a+b,0);
        const answer = total / count;
        return { q:`A delivery driver travelled <b>${dists.join(' km, ')} km</b> over ${count} days.<br>What was the <b>average distance</b> per day?`,
          ans: String(answer), hint:`Total distance ÷ number of days.`, exp:`Total = ${total} km. Average = ${total} ÷ ${count} = <b>${answer} km</b>.` };
      },
    ];
    const sc = scenarios[rnd(0, scenarios.length - 1)]();
    return makeNum({
      id:genId('GA'), chapterId:'average', difficulty:level,
      question: sc.q, answer: sc.ans, acceptableAnswers:[sc.ans],
      hint: sc.hint, explanation: sc.exp
    });
  },

  money: (level) => {
    const bp = rnd(50, 500);
    const profit = rnd(10, 200);
    const sp = bp + profit;
    return makeNum({
      id: genId('GMO'), chapterId:'money', difficulty:level,
      question:`An item is bought for <b>Rs ${bp}</b> and sold for <b>Rs ${sp}</b>.<br>Calculate the <b>profit</b>.`,
      answer: String(profit), acceptableAnswers:[String(profit), 'Rs '+profit],
      hint:'Profit = Selling Price − Buying Price (when SP > BP).',
      explanation:`Profit = ${sp} − ${bp} = <b>Rs ${profit}</b>.`
    });
  },

  // ── Moved here from questions/questions_extra.js ─────────────────────────
  // They used to sit in that question file behind `Object.assign(GENERATORS, …)`
  // — a global no file has ever defined, so the line threw a ReferenceError and
  // none of these six generators had ever run. They belong in the MANIFEST
  // regardless: in production the browser fetches question files as JSON from
  // netlify/functions/questions, so nothing in a questions/*.js file is ever
  // executed as a script in the browser. Manifests always are.

  geometry: (level) => {
    if (level <= 2) {
      const a = rnd(30, 70), b = rnd(20, 50);
      const c = 180 - a - b;
      return makeNum({
        id:genId('GG'), chapterId:'geometry', difficulty:level,
        question:`A triangle has two angles of <b>${a}°</b> and <b>${b}°</b>.<br>Find the <b>third angle</b>.`,
        answer: String(c), acceptableAnswers:[String(c), c+'°'],
        hint:'All three angles in a triangle add up to 180°.',
        explanation:`180° − ${a}° − ${b}° = <b>${c}°</b>.`
      });
    }
    if (level === 3) {
      // Isosceles triangle - find the base angles given top angle.
      // The top angle must be EVEN, or (180 − top) ÷ 2 lands on a half-degree:
      // a top of 21° gives base angles of 79.5°, which is correct maths but not
      // an answer a Grade 5 paper would ever ask a child to type.
      const top = rnd(10, 40) * 2;
      const base = (180 - top) / 2;
      return makeNum({
        id:genId('GG'), chapterId:'geometry', difficulty:level,
        question:`An isosceles triangle has a top angle of <b>${top}°</b>.<br>The two base angles are equal.<br>Find each <b>base angle</b>.`,
        answer: String(base), acceptableAnswers:[String(base), base+'°'],
        hint:`Total angles = 180°. Base angles together = 180° − ${top}°. Divide by 2.`,
        explanation:`(180° − ${top}°) ÷ 2 = ${180-top}° ÷ 2 = <b>${base}°</b>.`
      });
    }
    // L4 - compass direction word problem
    const dirs = ['North','East','South','West'];
    const startIdx = rnd(0, 3);
    const cw = Math.random() > 0.5;
    const turns90 = rnd(1, 3);
    const endIdx = (startIdx + (cw ? turns90 : 4 - turns90)) % 4;
    const startDir = dirs[startIdx];
    const endDir = dirs[endIdx];
    const turnDesc = `${cw ? 'clockwise' : 'anticlockwise'} ${turns90 * 90}°`;
    const wrongOpts = dirs.filter(d => d !== endDir).slice(0, 3);
    return makeMCQ({
      id:genId('GG'), chapterId:'geometry', difficulty:level,
      question:`Ravi faces <b>${startDir}</b> and turns <b>${turnDesc}</b>.<br>Which direction does he now face?`,
      options:[endDir, ...wrongOpts],
      answer: endDir,
      hint:`Clockwise order: North → East → South → West → North. Each 90° = one step.`,
      explanation:`From ${startDir}, ${turnDesc} → <b>${endDir}</b>.`
    });
  },

  length: (level) => {
    if (level <= 2) {
      const l = rnd(4, 30), w = rnd(2, 20);
      const P = 2 * (l + w);
      return makeNum({
        id:genId('GL'), chapterId:'length', difficulty:level,
        question:`Find the <b>perimeter</b> of a rectangle with length <b>${l} cm</b> and width <b>${w} cm</b>.`,
        answer: String(P), acceptableAnswers:[String(P), P+'cm', P+' cm'],
        hint:'P = 2 × (length + width).',
        explanation:`P = 2 × (${l} + ${w}) = 2 × ${l+w} = <b>${P} cm</b>.`
      });
    }
    if (level === 3) {
      // Find missing side given perimeter
      const l = rnd(8, 30), w = rnd(4, 20);
      const P = 2 * (l + w);
      return makeNum({
        id:genId('GL'), chapterId:'length', difficulty:level,
        question:`A rectangle has a perimeter of <b>${P} cm</b> and a length of <b>${l} cm</b>.<br>Find its <b>width</b>.`,
        answer: String(w), acceptableAnswers:[String(w), w+'cm'],
        hint:`P = 2(l + w). So l + w = P ÷ 2. Width = (P ÷ 2) − length.`,
        explanation:`l + w = ${P} ÷ 2 = ${P/2}. Width = ${P/2} − ${l} = <b>${w} cm</b>.`
      });
    }
    // L4 - fencing cost word problem
    const l = rnd(10, 40), w = rnd(5, 25);
    const P = 2 * (l + w);
    const costPerM = rnd(50, 200);
    const total = P * costPerM;
    return makeNum({
      id:genId('GL'), chapterId:'length', difficulty:level,
      question:`A rectangular garden is <b>${l} m long</b> and <b>${w} m wide</b>.<br>Fencing costs <b>Rs ${costPerM} per metre</b>.<br>Find the <b>total cost</b> to fence the entire garden.`,
      answer: String(total), acceptableAnswers:[String(total), 'Rs '+total],
      hint:`Step 1: Perimeter = 2(${l} + ${w}). Step 2: Cost = perimeter × Rs ${costPerM}.`,
      explanation:`P = 2 × ${l+w} = ${P} m. Cost = ${P} × ${costPerM} = <b>Rs ${total}</b>.`
    });
  },

  time: (level) => {
    if (level <= 2) {
      const h = rnd(1, 5), m = rnd(5, 55);
      const totalMins = h * 60 + m;
      return makeNum({
        id:genId('GT'), chapterId:'time', difficulty:level,
        question:`Convert <b>${h} h ${m} min</b> to minutes.`,
        answer: String(totalMins), acceptableAnswers:[String(totalMins), totalMins+' min'],
        hint:`1 h = 60 min. Multiply ${h} × 60, then add ${m}.`,
        explanation:`${h} × 60 + ${m} = <b>${totalMins} min</b>.`
      });
    }
    if (level === 3) {
      // Journey: start time + duration → end time
      const startH = rnd(7, 20), startM = [0,15,30,45][rnd(0,3)];
      const durH = rnd(1, 4), durM = [0,15,30,45][rnd(0,3)];
      let endM = startM + durM, carry = 0;
      if (endM >= 60) { endM -= 60; carry = 1; }
      let endH = (startH + durH + carry) % 24;
      const fmt2 = (h, m) => `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
      const startStr = fmt2(startH, startM);
      const endStr = fmt2(endH, endM);
      const durStr = durM > 0 ? `${durH} h ${durM} min` : `${durH} h`;
      return makeNum({
        id:genId('GT'), chapterId:'time', difficulty:level,
        question:`A bus departs at <b>${startStr}</b> and the journey takes <b>${durStr}</b>.<br>At what time does it arrive? <i>(24-hour format, e.g. 14:30)</i>`,
        answer: endStr, acceptableAnswers:[endStr],
        hint:`Add ${durH} hours to ${startH}: get ${startH+durH}h. Then add ${durM} minutes to ${startM} min.`,
        explanation:`${startStr} + ${durStr} = <b>${endStr}</b>.`
      });
    }
    // L4 - find duration between two times (word problem)
    const startH = rnd(7, 12), startM = [0,15,30,45][rnd(0,3)];
    const durH = rnd(1, 5), durM = [0,15,30,45][rnd(0,3)];
    let endM = startM + durM, carry = 0;
    if (endM >= 60) { endM -= 60; carry = 1; }
    const endH = startH + durH + carry;
    const fmt2 = (h, m) => `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    const startStr = fmt2(startH, startM);
    const endStr = fmt2(endH, endM);
    const ansStr = durM > 0 ? `${durH}h${durM}min` : `${durH}h`;
    const altStr = durM > 0 ? `${durH} h ${durM} min` : `${durH} h`;
    return makeNum({
      id:genId('GT'), chapterId:'time', difficulty:level,
      question:`A school event starts at <b>${startStr}</b> and ends at <b>${endStr}</b>.<br>How long does the event last? <i>(e.g. 2h30min)</i>`,
      answer: ansStr, acceptableAnswers:[ansStr, altStr],
      hint:`Subtract start time from end time. End: ${endStr}, Start: ${startStr}.`,
      explanation:`${endStr} − ${startStr} = <b>${altStr}</b>.`
    });
  },

  ratio: (level) => {
    const a = rnd(2, 7), b = rnd(2, 7);
    const factor = rnd(3, 12);
    const actualTotal = factor * (a + b);
    const partA = factor * a;

    if (level <= 2) {
      // Direct proportion - price per unit
      const qty1 = rnd(2, 8), price1 = rnd(10, 60);
      const qty2 = rnd(3, 15);
      const price2 = (price1 / qty1) * qty2;
      if (!Number.isInteger(price2)) {
        // fallback to sharing
        return makeNum({
          id:genId('GR'), chapterId:'ratio', difficulty:level,
          question:`Share <b>Rs ${actualTotal}</b> in the ratio <b>${a}:${b}</b>.<br>How much is the <b>first share</b>?`,
          answer: String(partA), acceptableAnswers:[String(partA),'Rs '+partA],
          hint:`Total parts = ${a+b}. One part = ${actualTotal}÷${a+b} = ${factor}.`,
          explanation:`1 part = ${factor}. First share = ${a}×${factor} = <b>Rs ${partA}</b>.`
        });
      }
      return makeNum({
        id:genId('GR'), chapterId:'ratio', difficulty:level,
        question:`If <b>${qty1} pens cost Rs ${price1}</b>, how much do <b>${qty2} pens</b> cost?`,
        answer: String(price2), acceptableAnswers:[String(price2),'Rs '+price2],
        hint:`Cost of 1 pen = ${price1} ÷ ${qty1}. Then multiply by ${qty2}.`,
        explanation:`1 pen = Rs ${price1/qty1}. ${qty2} pens = ${price1/qty1} × ${qty2} = <b>Rs ${price2}</b>.`
      });
    }
    if (level === 3) {
      // Given one part, find the other
      return makeNum({
        id:genId('GR'), chapterId:'ratio', difficulty:level,
        question:`Flour and sugar are mixed in the ratio <b>${a}:${b}</b>.<br>If there is <b>${partA} g of flour</b>, how many grams of <b>sugar</b> are used?`,
        answer: String(factor * b), acceptableAnswers:[String(factor*b), (factor*b)+'g'],
        hint:`${a} parts = ${partA} g → 1 part = ${partA}÷${a} = ${factor} g. Sugar = ${b} parts.`,
        explanation:`1 part = ${partA} ÷ ${a} = ${factor} g. Sugar = ${b} × ${factor} = <b>${factor*b} g</b>.`
      });
    }
    // L4 - full sharing word problem
    const prize = actualTotal * rnd(2, 5);
    const fac2 = prize / (a + b);
    if (!Number.isInteger(fac2)) {
      return makeNum({
        id:genId('GR'), chapterId:'ratio', difficulty:level,
        question:`Ali and Bina share <b>Rs ${actualTotal}</b> in the ratio <b>${a}:${b}</b>.<br>How much more does <b>${a > b ? 'Ali' : 'Bina'}</b> receive than the other?`,
        answer: String(Math.abs(partA - factor*b)), acceptableAnswers:[String(Math.abs(partA-factor*b))],
        hint:`Calculate both shares first, then find the difference.`,
        explanation:`Ali = Rs ${partA}, Bina = Rs ${factor*b}. Difference = Rs ${Math.abs(partA-factor*b)}.`
      });
    }
    const shareA = fac2 * a, shareB = fac2 * b;
    return makeNum({
      id:genId('GR'), chapterId:'ratio', difficulty:level,
      question:`A prize of <b>Rs ${prize}</b> is shared between two students in the ratio <b>${a}:${b}</b>.<br>The student with the <b>larger share</b> buys a book for <b>Rs ${Math.floor(Math.max(shareA,shareB)/3)}</b>.<br>How much does she have <b>left</b>?`,
      answer: String(Math.max(shareA,shareB) - Math.floor(Math.max(shareA,shareB)/3)),
      acceptableAnswers:[String(Math.max(shareA,shareB) - Math.floor(Math.max(shareA,shareB)/3))],
      hint:`Step 1: Find the larger share (${a>b?a:b} parts × one part value). Step 2: Subtract the book cost.`,
      explanation:`Larger share = Rs ${Math.max(shareA,shareB)}. After book = ${Math.max(shareA,shareB)} − ${Math.floor(Math.max(shareA,shareB)/3)} = <b>Rs ${Math.max(shareA,shareB)-Math.floor(Math.max(shareA,shareB)/3)}</b>.`
    });
  },

  square_nums: (level) => {
    const n = level <= 2 ? rnd(2, 9) : rnd(5, 13);
    const sq = n * n;
    if (level <= 2) {
      return Math.random() > 0.5
        ? makeNum({ id:genId('GS'), chapterId:'square_nums', difficulty:level,
            question:`Calculate: <b>${n}²</b>`, answer: String(sq), acceptableAnswers:[String(sq)],
            hint:`${n}² = ${n} × ${n}.`, explanation:`${n} × ${n} = <b>${sq}</b>.` })
        : makeNum({ id:genId('GS'), chapterId:'square_nums', difficulty:level,
            question:`What is the <b>square root</b> of <b>${sq}</b>?`, answer: String(n), acceptableAnswers:[String(n)],
            hint:`Which number × itself = ${sq}?`, explanation:`${n} × ${n} = ${sq}, so √${sq} = <b>${n}</b>.` });
    }
    if (level === 3) {
      // Number pattern - find next term
      const start = rnd(2, 6), step = rnd(2, 4);
      const seq = [start, start*step, start*step*step, start*step*step*step];
      const next = seq[3] * step;
      return makeNum({
        id:genId('GS'), chapterId:'square_nums', difficulty:level,
        question:`What is the <b>next number</b> in the pattern?<br><b>${seq.join(', ')}, ___</b>`,
        answer: String(next), acceptableAnswers:[String(next)],
        hint:`Find the rule: each term is multiplied by ${step}.`,
        explanation:`Rule: ×${step} each time. ${seq[3]} × ${step} = <b>${next}</b>.`
      });
    }
    // L4 - square area word problem
    return makeNum({
      id:genId('GS'), chapterId:'square_nums', difficulty:level,
      question:`A square room has an area of <b>${sq} m²</b>.<br>A tile is <b>1 m × 1 m</b>. How many tiles are needed to cover the floor?<br><i>Hint: first find the side length.</i>`,
      answer: String(sq), acceptableAnswers:[String(sq)],
      hint:`Side = √${sq} = ${n} m. Area = ${n} × ${n} = ${sq} m². Each tile = 1 m², so tiles needed = area.`,
      explanation:`Side = ${n} m. Floor area = ${n}² = <b>${sq} tiles</b>.`
    });
  },

  decimals: (level) => {
    if (level <= 2) {
      const a = (rnd(100, 999) / 100).toFixed(2);
      const b = (rnd(10, 500) / 100).toFixed(2);
      const op = Math.random() > 0.5 ? '+' : '-';
      const fa = parseFloat(a), fb = parseFloat(b);
      const [big, small] = fa >= fb ? [fa, fb] : [fb, fa];
      const result = op === '+' ? (big + small).toFixed(2) : (big - small).toFixed(2);
      return makeNum({
        id:genId('GD'), chapterId:'decimals', difficulty:level,
        question:`Calculate: <b>${op === '+' ? a : big.toFixed(2)} ${op} ${op === '+' ? b : small.toFixed(2)}</b>`,
        answer: result, acceptableAnswers:[result, String(parseFloat(result))],
        hint:'Line up the decimal points and work column by column.',
        explanation:`= <b>${result}</b>.`
      });
    }
    if (level === 3) {
      // Multiply decimal by whole number
      const base = (rnd(10, 99) / 10).toFixed(1);
      const times = rnd(2, 9);
      const result = (parseFloat(base) * times).toFixed(1);
      return makeNum({
        id:genId('GD'), chapterId:'decimals', difficulty:level,
        question:`Calculate: <b>${base} × ${times}</b>`,
        answer: result, acceptableAnswers:[result, String(parseFloat(result))],
        hint:`Multiply ${base.replace('.','').replace(/^0/,'')} × ${times} then place the decimal.`,
        explanation:`${base} × ${times} = <b>${result}</b>.`
      });
    }
    // L4 - decimal word problem (money/measurement)
    const price = (rnd(50, 500) / 10).toFixed(1);
    const qty = rnd(2, 8);
    const total = (parseFloat(price) * qty).toFixed(1);
    const paid = (Math.ceil(parseFloat(total) / 50) * 50).toFixed(1);
    const change = (parseFloat(paid) - parseFloat(total)).toFixed(1);
    return makeNum({
      id:genId('GD'), chapterId:'decimals', difficulty:level,
      question:`A pen costs <b>Rs ${price}</b>. Rajan buys <b>${qty} pens</b> and pays <b>Rs ${paid}</b>.<br>How much <b>change</b> does he receive?`,
      answer: change, acceptableAnswers:[change, String(parseFloat(change)),'Rs '+change],
      hint:`Total = Rs ${price} × ${qty}. Change = Rs ${paid} − total.`,
      explanation:`Total = ${price} × ${qty} = Rs ${total}. Change = ${paid} − ${total} = <b>Rs ${change}</b>.`
    });
  },

};

// ── Self-register with subject registry (Phase 2) ──
registerSubject({
  id:          'grade5-maths',
  name:        'Mathematics',
  grade:       5,
  icon:        '🔢',
  subject:     'Maths',
  curriculum:  'MIE Mauritius',
  level4Label: 'Word Problems',
  chapters:    CHAPTERS,

  // Per-subject content. Previously these were bare globals (SYLLABUS,
  // FORMULAS, BADGES, GENERATORS) which meant every subject shared Maths'
  // syllabus, formula cards and badges. They now travel with the pack.
  // `help` is attached separately by help.js, which loads after this file.
  syllabus:    G5M_SYLLABUS,
  formulas:    G5M_FORMULAS,
  badges:      G5M_BADGES,
  generators:  G5M_GENERATORS,
});
