'use strict';
const LabPeriodicData = (() => {
  const TYPES = {
    alkali:      { name: 'Alkali metal',        cls: 'pt-alkali',    color: '#f4845f' },
    alkaline:    { name: 'Alkaline earth metal', cls: 'pt-alkaline',  color: '#f4c430' },
    transition:  { name: 'Transition metal',     cls: 'pt-transition',color: '#e88fa3' },
    post:        { name: 'Post-transition metal',cls: 'pt-post',      color: '#8ecae6' },
    metalloid:   { name: 'Metalloid',            cls: 'pt-metalloid', color: '#52b788' },
    nonmetal:    { name: 'Non-metal',            cls: 'pt-nonmetal',  color: '#74b3ce' },
    halogen:     { name: 'Halogen',              cls: 'pt-halogen',   color: '#c77dff' },
    noble:       { name: 'Noble gas',            cls: 'pt-noble',     color: '#adb5bd' },
    lanthanide:  { name: 'Lanthanide',           cls: 'pt-lanthanide',color: '#f9c74f' },
    actinide:    { name: 'Actinide',             cls: 'pt-actinide',  color: '#90be6d' },
  };

  const ELEMENTS = [
    [1,  'H',  'Hydrogen',     'nonmetal',  1,  1, [1],    true,  ['HCl (hydrochloric acid)', 'H₂O (water)', 'H₂SO₄ (sulfuric acid)'], 'Lightest element. Burns in air to form water. Used in acids.'],
    [2,  'He', 'Helium',       'noble',     18, 1, [0],    false, [], 'Noble gas — does not react. Used in balloons and airships.'],
    [3,  'Li', 'Lithium',      'alkali',    1,  2, [1],    false, ['LiOH'], 'Very reactive alkali metal. Reacts vigorously with water.'],
    [4,  'Be', 'Beryllium',    'alkaline',  2,  2, [2],    false, ['BeO'], 'Toxic alkaline earth metal.'],
    [5,  'B',  'Boron',        'metalloid', 13, 2, [3],    false, ['B₂O₃'], 'Used in glass and ceramics.'],
    [6,  'C',  'Carbon',       'nonmetal',  14, 2, [4],    true,  ['CO₂ (carbon dioxide)', 'CO (carbon monoxide)', 'CaCO₃ (limestone)'], 'Forms CO₂ in combustion. Exists as diamond and graphite. Key element in all living things.'],
    [7,  'N',  'Nitrogen',     'nonmetal',  15, 2, [3],    true,  ['N₂ (78% of air)', 'NO₂', 'NH₃ (ammonia)', 'HNO₃ (nitric acid)'], 'Makes up 78% of air. Used in fertilisers as ammonia.'],
    [8,  'O',  'Oxygen',       'nonmetal',  16, 2, [2],    true,  ['O₂ (21% of air)', 'H₂O (water)', 'CO₂', 'Fe₂O₃ (rust)'], 'Makes up 21% of air. Needed for combustion and respiration.'],
    [9,  'F',  'Fluorine',     'halogen',   17, 2, [1],    false, ['HF (hydrofluoric acid)', 'CaF₂'], 'Most reactive non-metal.'],
    [10, 'Ne', 'Neon',         'noble',     18, 2, [0],    false, [], 'Noble gas used in neon lights.'],
    [11, 'Na', 'Sodium',       'alkali',    1,  3, [1],    true,  ['NaCl (salt)', 'NaOH (sodium hydroxide)', 'Na₂CO₃ (washing soda)', 'NaHCO₃ (baking soda)'], 'Reacts violently with water, releasing hydrogen. Very high in the reactivity series.'],
    [12, 'Mg', 'Magnesium',    'alkaline',  2,  3, [2],    true,  ['MgO', 'MgCl₂', 'MgSO₄'], 'Burns with a brilliant white flame. Used in fireworks and flares.'],
    [13, 'Al', 'Aluminium',    'post',      13, 3, [3],    true,  ['Al₂O₃ (alumina)', 'AlCl₃', 'Al(OH)₃'], 'Most abundant metal in the Earth\'s crust. Resistant to corrosion due to oxide layer.'],
    [14, 'Si', 'Silicon',      'metalloid', 14, 3, [4],    false, ['SiO₂ (sand, glass)'], 'Semiconductor — used in computer chips.'],
    [15, 'P',  'Phosphorus',   'nonmetal',  15, 3, [3,5],  false, ['P₂O₅', 'H₃PO₄ (phosphoric acid)'], 'Used in fertilisers (phosphates) and matches.'],
    [16, 'S',  'Sulfur',       'nonmetal',  16, 3, [2,4,6],true,  ['SO₂ (sulfur dioxide)', 'SO₃', 'H₂SO₄ (sulfuric acid)', 'CuSO₄ (copper sulfate)'], 'Burns with a blue flame to form SO₂. Used to make sulfuric acid (H₂SO₄).'],
    [17, 'Cl', 'Chlorine',     'halogen',   17, 3, [1],    true,  ['HCl (hydrochloric acid)', 'NaCl (salt)', 'CaCl₂', 'MgCl₂'], 'Yellow-green toxic gas. Kills bacteria — used in water purification.'],
    [18, 'Ar', 'Argon',        'noble',     18, 3, [0],    true,  [], 'Noble gas — makes up about 1% of air. Used in light bulbs.'],
    [19, 'K',  'Potassium',    'alkali',    1,  4, [1],    true,  ['KOH', 'KCl', 'KNO₃', 'K₂CO₃'], 'More reactive than sodium. Burns with a lilac/violet flame.'],
    [20, 'Ca', 'Calcium',      'alkaline',  2,  4, [2],    true,  ['CaO (quicklime)', 'Ca(OH)₂ (limewater)', 'CaCO₃ (limestone)', 'CaSO₄ (plaster)'], 'Limewater (Ca(OH)₂) goes milky with CO₂. Limestone (CaCO₃) is used in construction.'],
    [21, 'Sc', 'Scandium',     'transition',3,  4, [3],    false, [], 'Rare transition metal.'],
    [22, 'Ti', 'Titanium',     'transition',4,  4, [4],    false, [], 'Lightweight, strong, corrosion-resistant.'],
    [23, 'V',  'Vanadium',     'transition',5,  4, [2,3,4,5],false,[], 'Used as a catalyst in making sulfuric acid.'],
    [24, 'Cr', 'Chromium',     'transition',6,  4, [2,3,6],false, ['Cr₂O₃', 'CrO₄²⁻'], 'Used in chrome plating to prevent rust.'],
    [25, 'Mn', 'Manganese',    'transition',7,  4, [2,4,7],false, ['MnO₂'], 'Used in batteries (MnO₂).'],
    [26, 'Fe', 'Iron',         'transition',8,  4, [2,3],  true,  ['Fe₂O₃ (rust)', 'FeCl₂', 'FeCl₃', 'FeSO₄'], 'Rusts in air and water (iron + oxygen + water → iron oxide). Most widely used metal. Forms Fe²⁺ and Fe³⁺ ions.'],
    [27, 'Co', 'Cobalt',       'transition',9,  4, [2,3],  false, [], 'Used in alloys and magnets.'],
    [28, 'Ni', 'Nickel',       'transition',10, 4, [2],    true,  ['NiSO₄'], 'Below iron in reactivity series. Used in coins and electroplating.'],
    [29, 'Cu', 'Copper',       'transition',11, 4, [1,2],  true,  ['CuSO₄ (copper sulfate)', 'CuO', 'Cu(OH)₂ (blue)'], 'Blue copper sulfate solution is used in tests. Below hydrogen in reactivity — does not react with dilute acids. Excellent conductor.'],
    [30, 'Zn', 'Zinc',         'transition',12, 4, [2],    true,  ['ZnO', 'ZnCl₂', 'ZnSO₄'], 'Used to galvanise iron (prevent rust). Reacts with acids. Above iron in reactivity series.'],
    [31, 'Ga', 'Gallium',      'post',      13, 4, [3],    false, [], 'Melts just above room temperature.'],
    [32, 'Ge', 'Germanium',    'metalloid', 14, 4, [4],    false, [], 'Semiconductor.'],
    [33, 'As', 'Arsenic',      'metalloid', 15, 4, [3,5],  false, [], 'Toxic metalloid.'],
    [34, 'Se', 'Selenium',     'nonmetal',  16, 4, [2,4,6],false, [], 'Used in photoelectric cells.'],
    [35, 'Br', 'Bromine',      'halogen',   17, 4, [1],    false, ['HBr', 'NaBr'], 'Brown liquid halogen. Toxic vapour.'],
    [36, 'Kr', 'Krypton',      'noble',     18, 4, [0],    false, [], 'Noble gas used in some lighting.'],
    [37, 'Rb', 'Rubidium',     'alkali',    1,  5, [1],    false, [], 'Very reactive alkali metal.'],
    [38, 'Sr', 'Strontium',    'alkaline',  2,  5, [2],    false, [], 'Burns with a crimson red flame — used in flares.'],
    [39, 'Y',  'Yttrium',      'transition',3,  5, [3],    false, [], ''],
    [40, 'Zr', 'Zirconium',    'transition',4,  5, [4],    false, [], ''],
    [41, 'Nb', 'Niobium',      'transition',5,  5, [3,5],  false, [], ''],
    [42, 'Mo', 'Molybdenum',   'transition',6,  5, [4,6],  false, [], ''],
    [43, 'Tc', 'Technetium',   'transition',7,  5, [7],    false, [], 'Radioactive.'],
    [44, 'Ru', 'Ruthenium',    'transition',8,  5, [3,4],  false, [], ''],
    [45, 'Rh', 'Rhodium',      'transition',9,  5, [3],    false, [], ''],
    [46, 'Pd', 'Palladium',    'transition',10, 5, [2,4],  false, [], ''],
    [47, 'Ag', 'Silver',       'transition',11, 5, [1],    true,  ['AgNO₃ (silver nitrate)', 'AgCl'], 'Unreactive — below copper in reactivity series. AgNO₃ is used to test for chloride ions (white precipitate of AgCl).'],
    [48, 'Cd', 'Cadmium',      'transition',12, 5, [2],    false, [], 'Toxic transition metal.'],
    [49, 'In', 'Indium',       'post',      13, 5, [3],    false, [], ''],
    [50, 'Sn', 'Tin',          'post',      14, 5, [2,4],  true,  ['SnO₂', 'SnCl₂'], 'Used in solder and tin cans (steel coated with tin). In reactivity series between iron and lead.'],
    [51, 'Sb', 'Antimony',     'metalloid', 15, 5, [3,5],  false, [], ''],
    [52, 'Te', 'Tellurium',    'metalloid', 16, 5, [2,4,6],false, [], ''],
    [53, 'I',  'Iodine',       'halogen',   17, 5, [1],    true,  ['KI', 'NaI', 'I₂ (iodine solution)'], 'Dark grey/purple solid. Iodine solution turns blue-black with starch — used as a food test.'],
    [54, 'Xe', 'Xenon',        'noble',     18, 5, [0],    false, [], 'Noble gas.'],
    [55, 'Cs', 'Caesium',      'alkali',    1,  6, [1],    false, [], 'Most reactive alkali metal (safe conditions).'],
    [56, 'Ba', 'Barium',       'alkaline',  2,  6, [2],    false, ['BaSO₄', 'BaCl₂'], 'BaSO₄ is insoluble — used in barium meal X-rays.'],
    [57, 'La', 'Lanthanum',    'lanthanide',null,6,[3],    false, [], ''],
    [72, 'Hf', 'Hafnium',      'transition',4,  6, [4],    false, [], ''],
    [73, 'Ta', 'Tantalum',     'transition',5,  6, [5],    false, [], ''],
    [74, 'W',  'Tungsten',     'transition',6,  6, [4,6],  false, [], 'Highest melting point of all metals.'],
    [75, 'Re', 'Rhenium',      'transition',7,  6, [4,7],  false, [], ''],
    [76, 'Os', 'Osmium',       'transition',8,  6, [4],    false, [], ''],
    [77, 'Ir', 'Iridium',      'transition',9,  6, [3,4],  false, [], ''],
    [78, 'Pt', 'Platinum',     'transition',10, 6, [2,4],  false, [], 'Very unreactive noble metal. Used in catalytic converters.'],
    [79, 'Au', 'Gold',         'transition',11, 6, [1,3],  true,  [], 'Most unreactive metal — lowest in reactivity series. Does not tarnish or rust.'],
    [80, 'Hg', 'Mercury',      'transition',12, 6, [1,2],  true,  ['HgO', 'HgCl₂'], 'Only metal that is liquid at room temperature. Very low in reactivity series. Highly toxic.'],
    [81, 'Tl', 'Thallium',     'post',      13, 6, [1,3],  false, [], ''],
    [82, 'Pb', 'Lead',         'post',      14, 6, [2,4],  true,  ['PbO', 'PbSO₄', 'PbCl₂'], 'Dense, soft metal. Near the bottom of the reactivity series. Used in lead-acid batteries.'],
    [83, 'Bi', 'Bismuth',      'post',      15, 6, [3],    false, [], ''],
    [84, 'Po', 'Polonium',     'metalloid', 16, 6, [2,4],  false, [], 'Radioactive.'],
    [85, 'At', 'Astatine',     'halogen',   17, 6, [1],    false, [], 'Radioactive halogen.'],
    [86, 'Rn', 'Radon',        'noble',     18, 6, [0],    false, [], 'Radioactive noble gas.'],
    [87, 'Fr', 'Francium',     'alkali',    1,  7, [1],    false, [], 'Extremely rare and radioactive.'],
    [88, 'Ra', 'Radium',       'alkaline',  2,  7, [2],    false, [], 'Radioactive alkaline earth metal.'],
    [89, 'Ac', 'Actinium',     'actinide',  null,7,[3],    false, [], ''],
    [104,'Rf', 'Rutherfordium','transition',4,  7, [4],    false, [], 'Synthetic.'],
    [105,'Db', 'Dubnium',      'transition',5,  7, [5],    false, [], 'Synthetic.'],
    [106,'Sg', 'Seaborgium',   'transition',6,  7, [6],    false, [], 'Synthetic.'],
    [107,'Bh', 'Bohrium',      'transition',7,  7, [7],    false, [], 'Synthetic.'],
    [108,'Hs', 'Hassium',      'transition',8,  7, [8],    false, [], 'Synthetic.'],
    [109,'Mt', 'Meitnerium',   'transition',9,  7, [],     false, [], 'Synthetic.'],
    [110,'Ds', 'Darmstadtium', 'transition',10, 7, [],     false, [], 'Synthetic.'],
    [111,'Rg', 'Roentgenium',  'transition',11, 7, [],     false, [], 'Synthetic.'],
    [112,'Cn', 'Copernicium',  'transition',12, 7, [],     false, [], 'Synthetic.'],
    [113,'Nh', 'Nihonium',     'post',      13, 7, [],     false, [], 'Synthetic.'],
    [114,'Fl', 'Flerovium',    'post',      14, 7, [],     false, [], 'Synthetic.'],
    [115,'Mc', 'Moscovium',    'post',      15, 7, [],     false, [], 'Synthetic.'],
    [116,'Lv', 'Livermorium',  'post',      16, 7, [],     false, [], 'Synthetic.'],
    [117,'Ts', 'Tennessine',   'halogen',   17, 7, [],     false, [], 'Synthetic.'],
    [118,'Og', 'Oganesson',    'noble',     18, 7, [],     false, [], 'Synthetic.'],
  ];

  const LANTHANIDES_RAW = [58,'Ce','Cerium',59,'Pr','Praseodymium',60,'Nd','Neodymium',61,'Pm','Promethium',
    62,'Sm','Samarium',63,'Eu','Europium',64,'Gd','Gadolinium',65,'Tb','Terbium',
    66,'Dy','Dysprosium',67,'Ho','Holmium',68,'Er','Erbium',69,'Tm','Thulium',
    70,'Yb','Ytterbium',71,'Lu','Lutetium'];

  const ACTINIDES_RAW = [90,'Th','Thorium',91,'Pa','Protactinium',92,'U','Uranium',93,'Np','Neptunium',
    94,'Pu','Plutonium',95,'Am','Americium',96,'Cm','Curium',97,'Bk','Berkelium',
    98,'Cf','Californium',99,'Es','Einsteinium',100,'Fm','Fermium',101,'Md','Mendelevium',
    102,'No','Nobelium',103,'Lr','Lawrencium'];

  function _buildFBlock(raw, type) {
    const result = [];
    const period = type === 'lanthanide' ? 6 : 7;
    for (let i = 0; i < raw.length; i += 3) {
      result.push({ n: raw[i], sym: raw[i+1], name: raw[i+2], type, group: null, period, valency: [3], g9: false, compounds: [], note: '' });
    }
    return result;
  }

  function build() {
    const els = ELEMENTS.map(([n, sym, name, type, group, period, valency, g9, compounds, note]) =>
      ({ n, sym, name, type, group, period, valency, g9, compounds, note }));
    const lans = _buildFBlock(LANTHANIDES_RAW, 'lanthanide');
    const acts = _buildFBlock(ACTINIDES_RAW, 'actinide');
    return [...els, ...lans, ...acts].sort((a, b) => a.n - b.n);
  }

  return { TYPES, build };
})();
if (typeof window !== 'undefined') window.LabPeriodicData = LabPeriodicData;
