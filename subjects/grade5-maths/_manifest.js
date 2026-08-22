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
  { id:'percentage',  name:'Percentage',               icon:'%',  color:'pink',   part:1, examWeight:3 },
  { id:'powers',      name:'Powers & Exponents',       icon:'²',  color:'red',    part:1, examWeight:2 },
  { id:'average',     name:'Average',                  icon:'📊', color:'green',  part:2, examWeight:2 },
  { id:'ratio',       name:'Ratio & Proportion',       icon:'⚖️', color:'cyan',   part:2, examWeight:3 },
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
const SYLLABUS = {
  numeration:  { subsections: [
    { id:'place_value',  name:'Place Value (up to millions)' },
    { id:'ordering',     name:'Ordering & Comparing Numbers' },
    { id:'rounding',     name:'Rounding Numbers' },
    { id:'roman',        name:'Roman Numerals' },
    { id:'sequences',    name:'Number Sequences & Patterns' },
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
  ]},
  geometry:    { subsections: [
    { id:'angles',       name:'Types & Measurement of Angles' },
    { id:'2d_shapes',    name:'Properties of 2D Shapes' },
    { id:'3d_shapes',    name:'Properties of 3D Shapes' },
    { id:'symmetry',     name:'Lines of Symmetry' },
    { id:'coordinates',  name:'Coordinates & Grid' },
    { id:'transformation',name:'Reflection & Rotation' },
  ]},
  fractions:   { subsections: [
    { id:'proper_improper',name:'Proper, Improper & Mixed Numbers' },
    { id:'equivalent',   name:'Equivalent Fractions' },
    { id:'comparing',    name:'Comparing & Ordering Fractions' },
    { id:'add_sub',      name:'Adding & Subtracting Fractions' },
    { id:'fraction_of',  name:'Fraction of a Quantity' },
  ]},
  decimals:    { subsections: [
    { id:'place_value',  name:'Decimal Place Value' },
    { id:'ordering',     name:'Ordering Decimals' },
    { id:'operations',   name:'Adding & Subtracting Decimals' },
    { id:'conversion',   name:'Fractions ↔ Decimals' },
  ]},
  percentage:  { subsections: [
    { id:'meaning',      name:'What is Percentage?' },
    { id:'conversion',   name:'Fractions / Decimals ↔ Percentage' },
    { id:'of_quantity',  name:'Percentage of a Quantity' },
    { id:'increase',     name:'Percentage Increase & Decrease' },
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
  length:      { subsections: [
    { id:'conversion',   name:'Unit Conversions (km/m/cm/mm)' },
    { id:'perimeter',    name:'Perimeter of Shapes' },
    { id:'word_probs',   name:'Length Word Problems' },
  ]},
  area:        { subsections: [
    { id:'rectangle',    name:'Area of Rectangles & Squares' },
    { id:'compound',     name:'Area of Compound Shapes' },
    { id:'triangle',     name:'Area of Triangles' },
    { id:'conversion',   name:'Unit Conversions (m²/cm²)' },
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
  ]},
  graphs:      { subsections: [
    { id:'pictogram',    name:'Pictograms' },
    { id:'bar_chart',    name:'Bar Charts' },
    { id:'line_graph',   name:'Line Graphs' },
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
const FORMULAS = {
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
    'Coordinates: (x, y) — x goes across, y goes up',
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
  percentage: { title:'% Percentage', facts:[
    '% means "per hundred". 45% = 45/100',
    '50%=½ | 25%=¼ | 75%=¾ | 10%=1/10 | 20%=1/5',
    'X% of Y = (X ÷ 100) × Y',
    '% of a number: find 10% first then scale',
    '% increase = (increase ÷ original) × 100',
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
  conversions: { title:'🔄 Unit Conversions — All Facts', facts:[
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

// ── BADGES ─────────────────────────────────────
const BADGES = [
  { id:'first_blood',    name:'First Step',       icon:'👣', desc:'Answer your first question',        cond: s => s.totalAttempted >= 1 },
  { id:'sharp_mind',     name:'Sharp Mind',       icon:'🧠', desc:'Get 10 correct in a row',           cond: s => s.maxStreak >= 10 },
  { id:'fraction_wiz',   name:'Fraction Wizard',  icon:'🧙', desc:'Score 100% in Fractions',           cond: (s,c) => c.fractions && pct(c.fractions) === 100 },
  { id:'angle_det',      name:'Angle Detective',  icon:'🔍', desc:'Master Geometry chapter',           cond: (s,c) => c.geometry && pct(c.geometry) >= 80 },
  { id:'speed_demon',    name:'Speed Demon',      icon:'⚡', desc:'Complete a Quick Drill',            cond: s => s.examCount >= 1 },
  { id:'exam_ace',       name:'Exam Ace',         icon:'🏆', desc:'Score 90%+ on a Full Mock',        cond: s => s.bestScore >= 90 },
  { id:'century',        name:'Centurion',        icon:'💯', desc:'Attempt 100 questions',             cond: s => s.totalAttempted >= 100 },
  { id:'daily_hero',     name:'Daily Hero',       icon:'🔥', desc:'Maintain a 7-day streak',           cond: s => s.streak >= 7 },
  { id:'all_rounder',    name:'All Rounder',      icon:'🌟', desc:'Practise every chapter',            cond: (s,c) => CHAPTERS.every(ch => c[ch.id] && c[ch.id].attempted > 0) },
  { id:'money_master',   name:'Money Master',     icon:'💰', desc:'Master Money & Profit/Loss',        cond: (s,c) => c.money && pct(c.money) >= 80 },
  { id:'time_keeper',    name:'Time Keeper',      icon:'⏰', desc:'Master Time chapter',               cond: (s,c) => c.time && pct(c.time) >= 80 },
  { id:'data_scientist', name:'Data Scientist',   icon:'📈', desc:'Master Graphs & Data',              cond: (s,c) => c.graphs && pct(c.graphs) >= 80 },
  { id:'converter',      name:'Unit Converter',   icon:'🔄', desc:'Master Unit Conversions chapter',     cond: (s,c) => c.conversions && pct(c.conversions) >= 80 },
  { id:'pct_pro',        name:'Percentage Pro',   icon:'%',  desc:'Master Percentage chapter',           cond: (s,c) => c.percentage && pct(c.percentage) >= 80 },
];
function pct(c) { return c.attempted ? Math.round(c.correct / c.attempted * 100) : 0; }

// ── DYNAMIC GENERATORS ──────────────────────────
const GENERATORS = {

  numeration: (level) => {
    const n = rnd(10001, 99999);
    const nStr = String(n);
    const places = ['ten-thousands','thousands','hundreds','tens','ones'];
    const values = [10000,1000,100,10,1];
    const pos = rnd(0, 4);
    const dig = parseInt(nStr[pos]);
    const val = dig * values[pos];
    return makeNum({
      id: `GN${Date.now()}`, chapterId:'numeration', difficulty:level,
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
        id:`GF${Date.now()}`, chapterId:'four_ops', difficulty:level,
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
        id:`GF${Date.now()}`, chapterId:'four_ops', difficulty:level,
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
      id:`GF${Date.now()}`, chapterId:'four_ops', difficulty:level,
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
        id:`GFR${Date.now()}`, chapterId:'fractions', difficulty:level,
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
        id:`GFR${Date.now()}`, chapterId:'fractions', difficulty:level,
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
      id:`GFR${Date.now()}`, chapterId:'fractions', difficulty:level,
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
        id: `GAR${Date.now()}`, chapterId:'area', difficulty:level,
        question:`Find the <b>area</b> of a rectangle with length <b>${l} cm</b> and width <b>${w} cm</b>.`,
        answer: String(l*w), acceptableAnswers:[String(l*w), l*w+'cm2', l*w+' cm²'],
        hint:'Area of a rectangle = length × width.',
        explanation:`Area = ${l} × ${w} = <b>${l*w} cm²</b>.`
      });
    } else {
      const s = rnd(4, 15);
      return makeNum({
        id: `GAR${Date.now()}`, chapterId:'area', difficulty:level,
        question:`A square has a side of <b>${s} cm</b>. Find its <b>area</b>.`,
        answer: String(s*s), acceptableAnswers:[String(s*s), s*s+'cm2', s*s+' cm²'],
        hint:'Area of a square = side × side = side².',
        explanation:`Area = ${s} × ${s} = ${s}² = <b>${s*s} cm²</b>.`
      });
    }
  },

  average: (level) => {
    function makeNums(n, avg) {
      const nums = Array.from({length: n}, () => rnd(avg - 20, avg + 20)).map(v => Math.max(5, v));
      const diff = avg * n - nums.reduce((a,b)=>a+b,0);
      nums[0] += diff;
      if (nums[0] < 1) nums[0] = avg;
      return nums;
    }

    if (level <= 2) {
      const count = level === 1 ? rnd(3, 4) : rnd(4, 6);
      const avg = rnd(10, 50) * count;
      const nums = makeNums(count, Math.floor(avg / count));
      const total = nums.reduce((a,b)=>a+b,0);
      const answer = total / count;
      return makeNum({
        id:`GA${Date.now()}`, chapterId:'average', difficulty:level,
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
      const known = Array.from({length: count - 1}, () => rnd(15, 85));
      const missing = total - known.reduce((a,b)=>a+b,0);
      if (missing < 5 || missing > 150) return null;
      return makeNum({
        id:`GA${Date.now()}`, chapterId:'average', difficulty:level,
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
      id:`GA${Date.now()}`, chapterId:'average', difficulty:level,
      question: sc.q, answer: sc.ans, acceptableAnswers:[sc.ans],
      hint: sc.hint, explanation: sc.exp
    });
  },

  money: (level) => {
    const bp = rnd(50, 500);
    const profit = rnd(10, 200);
    const sp = bp + profit;
    return makeNum({
      id: `GMO${Date.now()}`, chapterId:'money', difficulty:level,
      question:`An item is bought for <b>Rs ${bp}</b> and sold for <b>Rs ${sp}</b>.<br>Calculate the <b>profit</b>.`,
      answer: String(profit), acceptableAnswers:[String(profit), 'Rs '+profit],
      hint:'Profit = Selling Price − Buying Price (when SP > BP).',
      explanation:`Profit = ${sp} − ${bp} = <b>Rs ${profit}</b>.`
    });
  },

};

// ── Self-register with subject registry (Phase 2) ──
registerSubject({
  id:         'grade5-maths',
  name:       'Mathematics',
  grade:      5,
  icon:       '🔢',
  subject:    'Maths',
  curriculum: 'MIE Mauritius',
  chapters:   CHAPTERS,
});
