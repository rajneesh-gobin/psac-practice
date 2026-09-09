(function () {
'use strict';

// ── length_m_cm ───────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g3mth-msr-001', chapterId:'g3mth-measurement', difficulty:1, subsection:'length_m_cm',
    question:'How many centimetres are in 1 metre?',
    options:['100','10','1000','50'], answer:'100',
    hint:'100 cm = 1 m.',
    explanation:'There are <b>100</b> centimetres in 1 metre.' }),

  makeMCQ({ id:'g3mth-msr-002', chapterId:'g3mth-measurement', difficulty:1, subsection:'length_m_cm',
    question:'Convert 2 m to centimetres.',
    options:['200 cm','20 cm','2000 cm','100 cm'], answer:'200 cm',
    hint:'1 m = 100 cm, so 2 m = 2 × 100.',
    explanation:'2 m = 2 × 100 cm = <b>200 cm</b>.' }),

  makeMCQ({ id:'g3mth-msr-003', chapterId:'g3mth-measurement', difficulty:1, subsection:'length_m_cm',
    question:'A classroom is 8 m long. How many centimetres is that?',
    options:['800 cm','80 cm','8000 cm','8 cm'], answer:'800 cm',
    hint:'8 × 100 = ?',
    explanation:'8 m = 8 × 100 = <b>800 cm</b>.' }),

  makeMCQ({ id:'g3mth-msr-004', chapterId:'g3mth-measurement', difficulty:2, subsection:'length_m_cm',
    question:'Which is longer: 150 cm or 1 m 40 cm?',
    options:['150 cm','1 m 40 cm','They are equal','Cannot tell'], answer:'150 cm',
    hint:'1 m 40 cm = 140 cm. Compare 150 and 140.',
    explanation:'1 m 40 cm = 140 cm. 150 cm > 140 cm, so <b>150 cm</b> is longer.' }),

  makeMCQ({ id:'g3mth-msr-005', chapterId:'g3mth-measurement', difficulty:2, subsection:'length_m_cm',
    question:'The perimeter of a rectangle that is 5 m long and 3 m wide is ___.',
    options:['16 m','15 m','8 m','10 m'], answer:'16 m',
    hint:'Perimeter = 2 × (length + width) = 2 × (5 + 3).',
    explanation:'Perimeter = 2 × (5 + 3) = 2 × 8 = <b>16 m</b>.' }),

  makeMCQ({ id:'g3mth-msr-006', chapterId:'g3mth-measurement', difficulty:1, subsection:'length_m_cm',
    question:'Convert 500 cm to metres.',
    options:['5 m','50 m','0.5 m','500 m'], answer:'5 m',
    hint:'100 cm = 1 m, so 500 cm = 500 ÷ 100.',
    explanation:'500 cm ÷ 100 = <b>5 m</b>.' }),

  makeMCQ({ id:'g3mth-msr-007', chapterId:'g3mth-measurement', difficulty:2, subsection:'length_m_cm',
    question:'Rani\'s ribbon is 3 m 25 cm long. How many centimetres is that?',
    options:['325 cm','325 m','32.5 cm','3025 cm'], answer:'325 cm',
    hint:'3 m = 300 cm, plus 25 cm.',
    explanation:'3 m = 300 cm. 300 + 25 = <b>325 cm</b>.' }),

  makeMCQ({ id:'g3mth-msr-008', chapterId:'g3mth-measurement', difficulty:2, subsection:'length_m_cm',
    question:'Dev\'s garden path is 450 cm long. How many metres and centimetres is that?',
    options:['4 m 50 cm','4 m 5 cm','45 m','400 m 50 cm'], answer:'4 m 50 cm',
    hint:'450 ÷ 100 = 4 remainder 50.',
    explanation:'450 cm = 4 m 50 cm.' }),

  makeMCQ({ id:'g3mth-msr-009', chapterId:'g3mth-measurement', difficulty:1, subsection:'length_m_cm',
    question:'How many cm are in 7 m?',
    options:['700 cm','70 cm','7000 cm','7 cm'], answer:'700 cm',
    hint:'7 × 100 = ?',
    explanation:'7 m = 7 × 100 = <b>700 cm</b>.' }),

  makeMCQ({ id:'g3mth-msr-010', chapterId:'g3mth-measurement', difficulty:2, subsection:'length_m_cm',
    question:'Priya jumped 2 m 80 cm. Dev jumped 250 cm. Who jumped further?',
    options:['Priya','Dev','They jumped the same','Cannot tell'], answer:'Priya',
    hint:'Priya: 2 m 80 cm = 280 cm. Dev: 250 cm.',
    explanation:'Priya jumped 280 cm; Dev jumped 250 cm. 280 > 250, so <b>Priya</b> jumped further.' }),

  makeMCQ({ id:'g3mth-msr-011', chapterId:'g3mth-measurement', difficulty:2, subsection:'length_m_cm',
    question:'What is the perimeter of a square with sides of 4 m?',
    options:['16 m','8 m','12 m','4 m'], answer:'16 m',
    hint:'Perimeter of square = 4 × side.',
    explanation:'4 × 4 = <b>16 m</b>.' }),

  makeMCQ({ id:'g3mth-msr-012', chapterId:'g3mth-measurement', difficulty:1, subsection:'length_m_cm',
    question:'300 cm = ___ m',
    options:['3 m','30 m','0.3 m','300 m'], answer:'3 m',
    hint:'300 ÷ 100 = ?',
    explanation:'300 cm = 300 ÷ 100 = <b>3 m</b>.' }),

  makeMCQ({ id:'g3mth-msr-013', chapterId:'g3mth-measurement', difficulty:2, subsection:'length_m_cm',
    question:'A rope is 1 m 60 cm long. Raj cuts off 80 cm. How much is left? (in cm)',
    options:['80 cm','100 cm','60 cm','90 cm'], answer:'80 cm',
    hint:'1 m 60 cm = 160 cm. 160 − 80 = ?',
    explanation:'160 cm − 80 cm = <b>80 cm</b>.' }),

  makeMCQ({ id:'g3mth-msr-014', chapterId:'g3mth-measurement', difficulty:2, subsection:'length_m_cm',
    question:'Nadia\'s bedroom is 4 m long and 3 m wide. What is the perimeter?',
    options:['14 m','12 m','7 m','16 m'], answer:'14 m',
    hint:'Perimeter = 2 × (4 + 3).',
    explanation:'2 × (4 + 3) = 2 × 7 = <b>14 m</b>.' }),

  makeMCQ({ id:'g3mth-msr-015', chapterId:'g3mth-measurement', difficulty:2, subsection:'length_m_cm',
    question:'Which is shorter: 2 m 15 cm or 230 cm?',
    options:['2 m 15 cm','230 cm','They are equal','Cannot tell'], answer:'2 m 15 cm',
    hint:'2 m 15 cm = 215 cm. 215 < 230.',
    explanation:'2 m 15 cm = 215 cm < 230 cm. So <b>2 m 15 cm</b> is shorter.' }),

  makeMCQ({ id:'g3mth-msr-016', chapterId:'g3mth-measurement', difficulty:1, subsection:'length_m_cm',
    question:'How many centimetres are in 10 m?',
    options:['1000 cm','100 cm','10 cm','10000 cm'], answer:'1000 cm',
    hint:'10 × 100 = ?',
    explanation:'10 m = 10 × 100 = <b>1000 cm</b>.' }),

  makeMCQ({ id:'g3mth-msr-017', chapterId:'g3mth-measurement', difficulty:3, subsection:'length_m_cm',
    question:'Mia needs 3 pieces of ribbon each 75 cm long. How many metres of ribbon does she need in total?',
    options:['2 m 25 cm','2 m 50 cm','3 m','2 m'], answer:'2 m 25 cm',
    hint:'3 × 75 cm = 225 cm = 2 m 25 cm.',
    explanation:'3 × 75 = 225 cm = 2 m 25 cm.' }),

  makeMCQ({ id:'g3mth-msr-018', chapterId:'g3mth-measurement', difficulty:2, subsection:'length_m_cm',
    question:'A garden path is 6 m 40 cm long. Write this in centimetres.',
    options:['640 cm','6040 cm','64 cm','6400 cm'], answer:'640 cm',
    hint:'6 m = 600 cm, plus 40 cm.',
    explanation:'6 m = 600 cm. 600 + 40 = <b>640 cm</b>.' }),

  makeMCQ({ id:'g3mth-msr-019', chapterId:'g3mth-measurement', difficulty:2, subsection:'length_m_cm',
    question:'The perimeter of a rectangle is 18 m. Its length is 6 m. What is its width?',
    options:['3 m','6 m','9 m','12 m'], answer:'3 m',
    hint:'Perimeter = 2×(l+w). 18 = 2×(6+w). 9 = 6+w.',
    explanation:'18 = 2×(6+w) → 9 = 6+w → w = <b>3 m</b>.' }),

  makeMCQ({ id:'g3mth-msr-020', chapterId:'g3mth-measurement', difficulty:2, subsection:'length_m_cm',
    question:'Raj has a piece of wood 2 m long. He cuts 55 cm off. How long is the wood now? (in cm)',
    options:['145 cm','155 cm','135 cm','150 cm'], answer:'145 cm',
    hint:'2 m = 200 cm. 200 − 55 = ?',
    explanation:'200 cm − 55 cm = <b>145 cm</b>.' }),

// ── mass_kg_g ─────────────────────────────────────────────────────────────────

  makeMCQ({ id:'g3mth-msr-021', chapterId:'g3mth-measurement', difficulty:1, subsection:'mass_kg_g',
    question:'How many grams are in 1 kilogram?',
    options:['1000','100','10','500'], answer:'1000',
    hint:'1 kg = 1000 g.',
    explanation:'There are <b>1000</b> grams in 1 kilogram.' }),

  makeMCQ({ id:'g3mth-msr-022', chapterId:'g3mth-measurement', difficulty:1, subsection:'mass_kg_g',
    question:'Convert 3 kg to grams.',
    options:['3000 g','300 g','30 g','3 g'], answer:'3000 g',
    hint:'3 × 1000 = ?',
    explanation:'3 kg = 3 × 1000 = <b>3000 g</b>.' }),

  makeMCQ({ id:'g3mth-msr-023', chapterId:'g3mth-measurement', difficulty:2, subsection:'mass_kg_g',
    question:'A bag weighs 2 kg 500 g. How many grams is that?',
    options:['2500 g','2050 g','2005 g','250 g'], answer:'2500 g',
    hint:'2 kg = 2000 g, plus 500 g.',
    explanation:'2 kg = 2000 g. 2000 + 500 = <b>2500 g</b>.' }),

  makeMCQ({ id:'g3mth-msr-024', chapterId:'g3mth-measurement', difficulty:2, subsection:'mass_kg_g',
    question:'Which is heavier: 1500 g or 1 kg?',
    options:['1500 g','1 kg','They are equal','Cannot tell'], answer:'1500 g',
    hint:'1 kg = 1000 g. 1500 > 1000.',
    explanation:'1 kg = 1000 g. 1500 g > 1000 g, so <b>1500 g</b> is heavier.' }),

  makeMCQ({ id:'g3mth-msr-025', chapterId:'g3mth-measurement', difficulty:1, subsection:'mass_kg_g',
    question:'Convert 5000 g to kilograms.',
    options:['5 kg','50 kg','500 kg','0.5 kg'], answer:'5 kg',
    hint:'5000 ÷ 1000 = ?',
    explanation:'5000 g ÷ 1000 = <b>5 kg</b>.' }),

  makeMCQ({ id:'g3mth-msr-026', chapterId:'g3mth-measurement', difficulty:2, subsection:'mass_kg_g',
    question:'Priya has 3 kg 250 g of flour. How many grams is that?',
    options:['3250 g','3025 g','325 g','3520 g'], answer:'3250 g',
    hint:'3 kg = 3000 g, plus 250 g.',
    explanation:'3 kg = 3000 g. 3000 + 250 = <b>3250 g</b>.' }),

  makeMCQ({ id:'g3mth-msr-027', chapterId:'g3mth-measurement', difficulty:2, subsection:'mass_kg_g',
    question:'Raj\'s school bag weighs 4 kg 750 g and Dev\'s weighs 5000 g. Whose bag is heavier?',
    options:['Dev','Raj','They are the same','Cannot tell'], answer:'Dev',
    hint:'Raj: 4 kg 750 g = 4750 g. Dev: 5000 g.',
    explanation:'Raj = 4750 g, Dev = 5000 g. 5000 > 4750, so <b>Dev\'s</b> bag is heavier.' }),

  makeMCQ({ id:'g3mth-msr-028', chapterId:'g3mth-measurement', difficulty:1, subsection:'mass_kg_g',
    question:'How many grams are in 7 kg?',
    options:['7000 g','700 g','70 g','7 g'], answer:'7000 g',
    hint:'7 × 1000 = ?',
    explanation:'7 kg = 7 × 1000 = <b>7000 g</b>.' }),

  makeMCQ({ id:'g3mth-msr-029', chapterId:'g3mth-measurement', difficulty:2, subsection:'mass_kg_g',
    question:'Nadia buys 2 bags of sugar. One weighs 1 kg 500 g and the other weighs 750 g. What is the total weight in grams?',
    options:['2250 g','2150 g','2500 g','2025 g'], answer:'2250 g',
    hint:'1 kg 500 g = 1500 g. 1500 + 750 = ?',
    explanation:'1500 g + 750 g = <b>2250 g</b>.' }),

  makeMCQ({ id:'g3mth-msr-030', chapterId:'g3mth-measurement', difficulty:2, subsection:'mass_kg_g',
    question:'Mia has 3 kg of flour and uses 800 g. How much is left? (in grams)',
    options:['2200 g','2800 g','2100 g','3800 g'], answer:'2200 g',
    hint:'3 kg = 3000 g. 3000 − 800 = ?',
    explanation:'3000 g − 800 g = <b>2200 g</b>.' }),

  makeMCQ({ id:'g3mth-msr-031', chapterId:'g3mth-measurement', difficulty:1, subsection:'mass_kg_g',
    question:'2500 g = ___ kg ___ g',
    options:['2 kg 500 g','25 kg','2050 g','25000 g'], answer:'2 kg 500 g',
    hint:'2500 ÷ 1000 = 2 remainder 500.',
    explanation:'2500 g = <b>2 kg 500 g</b>.' }),

  makeMCQ({ id:'g3mth-msr-032', chapterId:'g3mth-measurement', difficulty:2, subsection:'mass_kg_g',
    question:'Rani\'s baby sister weighs 6 kg 200 g. How many grams is that?',
    options:['6200 g','6020 g','620 g','6002 g'], answer:'6200 g',
    hint:'6 kg = 6000 g, plus 200 g.',
    explanation:'6000 + 200 = <b>6200 g</b>.' }),

  makeMCQ({ id:'g3mth-msr-033', chapterId:'g3mth-measurement', difficulty:2, subsection:'mass_kg_g',
    question:'Dev has 1 kg of rice and eats 350 g. How much rice is left?',
    options:['650 g','700 g','600 g','750 g'], answer:'650 g',
    hint:'1 kg = 1000 g. 1000 − 350 = ?',
    explanation:'1000 − 350 = <b>650 g</b>.' }),

  makeMCQ({ id:'g3mth-msr-034', chapterId:'g3mth-measurement', difficulty:3, subsection:'mass_kg_g',
    question:'A box of apples weighs 4 kg. Each apple weighs 200 g. How many apples are in the box?',
    options:['20','10','40','8'], answer:'20',
    hint:'4 kg = 4000 g. 4000 ÷ 200 = ?',
    explanation:'4000 g ÷ 200 g = <b>20</b> apples.' }),

  makeMCQ({ id:'g3mth-msr-035', chapterId:'g3mth-measurement', difficulty:2, subsection:'mass_kg_g',
    question:'A papaya weighs 1 kg 350 g. A mango weighs 750 g. What is their total weight?',
    options:['2100 g','2000 g','2050 g','1950 g'], answer:'2100 g',
    hint:'1 kg 350 g = 1350 g. 1350 + 750 = ?',
    explanation:'1350 g + 750 g = <b>2100 g</b>.' }),

// ── capacity_l_ml ─────────────────────────────────────────────────────────────

  makeMCQ({ id:'g3mth-msr-036', chapterId:'g3mth-measurement', difficulty:1, subsection:'capacity_l_ml',
    question:'How many millilitres are in 1 litre?',
    options:['1000','100','10','500'], answer:'1000',
    hint:'1 L = 1000 ml.',
    explanation:'There are <b>1000</b> millilitres in 1 litre.' }),

  makeMCQ({ id:'g3mth-msr-037', chapterId:'g3mth-measurement', difficulty:1, subsection:'capacity_l_ml',
    question:'A bottle holds 500 ml. How many bottles fill a 1 L container?',
    options:['2','5','10','4'], answer:'2',
    hint:'1000 ÷ 500 = ?',
    explanation:'1000 ml ÷ 500 ml = <b>2</b> bottles.' }),

  makeMCQ({ id:'g3mth-msr-038', chapterId:'g3mth-measurement', difficulty:1, subsection:'capacity_l_ml',
    question:'Convert 3 L to millilitres.',
    options:['3000 ml','300 ml','30 ml','3 ml'], answer:'3000 ml',
    hint:'3 × 1000 = ?',
    explanation:'3 L = 3 × 1000 = <b>3000 ml</b>.' }),

  makeMCQ({ id:'g3mth-msr-039', chapterId:'g3mth-measurement', difficulty:2, subsection:'capacity_l_ml',
    question:'A jug holds 1 L 250 ml. How many millilitres is that?',
    options:['1250 ml','1025 ml','1500 ml','125 ml'], answer:'1250 ml',
    hint:'1 L = 1000 ml, plus 250 ml.',
    explanation:'1000 + 250 = <b>1250 ml</b>.' }),

  makeMCQ({ id:'g3mth-msr-040', chapterId:'g3mth-measurement', difficulty:1, subsection:'capacity_l_ml',
    question:'5000 ml = ___ L',
    options:['5 L','50 L','500 L','0.5 L'], answer:'5 L',
    hint:'5000 ÷ 1000 = ?',
    explanation:'5000 ml ÷ 1000 = <b>5 L</b>.' }),

  makeMCQ({ id:'g3mth-msr-041', chapterId:'g3mth-measurement', difficulty:2, subsection:'capacity_l_ml',
    question:'Rani has 2 L 750 ml of juice. She pours out 1 L 500 ml. How much is left?',
    options:['1 L 250 ml','1 L 500 ml','750 ml','1250 ml'], answer:'1 L 250 ml',
    hint:'2750 ml − 1500 ml = ? ml',
    explanation:'2750 − 1500 = 1250 ml = <b>1 L 250 ml</b>.' }),

  makeMCQ({ id:'g3mth-msr-042', chapterId:'g3mth-measurement', difficulty:2, subsection:'capacity_l_ml',
    question:'A fish tank holds 8 L. How many millilitres is that?',
    options:['8000 ml','800 ml','80 ml','8 ml'], answer:'8000 ml',
    hint:'8 × 1000 = ?',
    explanation:'8 L = 8 × 1000 = <b>8000 ml</b>.' }),

  makeMCQ({ id:'g3mth-msr-043', chapterId:'g3mth-measurement', difficulty:2, subsection:'capacity_l_ml',
    question:'Dev drinks 350 ml of water in the morning and 450 ml at lunch. How much water does he drink in total?',
    options:['800 ml','700 ml','850 ml','750 ml'], answer:'800 ml',
    hint:'350 + 450 = ?',
    explanation:'350 + 450 = <b>800 ml</b>.' }),

  makeMCQ({ id:'g3mth-msr-044', chapterId:'g3mth-measurement', difficulty:2, subsection:'capacity_l_ml',
    question:'Priya\'s bucket holds 4 L 500 ml. She has already poured in 2750 ml. How much more can she pour in?',
    options:['1750 ml','1500 ml','2000 ml','1250 ml'], answer:'1750 ml',
    hint:'4 L 500 ml = 4500 ml. 4500 − 2750 = ?',
    explanation:'4500 − 2750 = <b>1750 ml</b>.' }),

  makeMCQ({ id:'g3mth-msr-045', chapterId:'g3mth-measurement', difficulty:1, subsection:'capacity_l_ml',
    question:'Which is more: 2500 ml or 2 L?',
    options:['2500 ml','2 L','They are equal','Cannot tell'], answer:'2500 ml',
    hint:'2 L = 2000 ml. 2500 > 2000.',
    explanation:'2500 ml > 2000 ml (= 2 L). So <b>2500 ml</b> is more.' }),

  makeMCQ({ id:'g3mth-msr-046', chapterId:'g3mth-measurement', difficulty:2, subsection:'capacity_l_ml',
    question:'A recipe needs 1 L 200 ml of milk. Raj only has 750 ml. How much more milk does he need?',
    options:['450 ml','250 ml','500 ml','400 ml'], answer:'450 ml',
    hint:'1 L 200 ml = 1200 ml. 1200 − 750 = ?',
    explanation:'1200 − 750 = <b>450 ml</b>.' }),

  makeMCQ({ id:'g3mth-msr-047', chapterId:'g3mth-measurement', difficulty:1, subsection:'capacity_l_ml',
    question:'How many 250 ml cups fill a 1 L jug?',
    options:['4','2','5','10'], answer:'4',
    hint:'1000 ÷ 250 = ?',
    explanation:'1000 ml ÷ 250 ml = <b>4</b> cups.' }),

  makeMCQ({ id:'g3mth-msr-048', chapterId:'g3mth-measurement', difficulty:2, subsection:'capacity_l_ml',
    question:'Nadia pours 600 ml of water into a 2 L bottle. How much more water is needed to fill it?',
    options:['1400 ml','1200 ml','1000 ml','1600 ml'], answer:'1400 ml',
    hint:'2 L = 2000 ml. 2000 − 600 = ?',
    explanation:'2000 − 600 = <b>1400 ml</b>.' }),

  makeMCQ({ id:'g3mth-msr-049', chapterId:'g3mth-measurement', difficulty:2, subsection:'capacity_l_ml',
    question:'Mia drinks 3 glasses of juice. Each glass holds 200 ml. How much juice does she drink in total?',
    options:['600 ml','500 ml','700 ml','400 ml'], answer:'600 ml',
    hint:'3 × 200 = ?',
    explanation:'3 × 200 = <b>600 ml</b>.' }),

  makeMCQ({ id:'g3mth-msr-050', chapterId:'g3mth-measurement', difficulty:2, subsection:'capacity_l_ml',
    question:'A pot holds 3 L. It currently contains 1 L 700 ml of soup. How much more soup can fit in?',
    options:['1300 ml','1200 ml','1100 ml','1700 ml'], answer:'1300 ml',
    hint:'3 L = 3000 ml. 3000 − 1700 = ?',
    explanation:'3000 − 1700 = <b>1300 ml</b>.' }),

  makeMCQ({ id:'g3mth-msr-051', chapterId:'g3mth-measurement', difficulty:3, subsection:'capacity_l_ml',
    question:'Rani fills 5 bottles each holding 400 ml. How many litres of water does she use in total?',
    options:['2 L','1 L 500 ml','2 L 500 ml','5 L'], answer:'2 L',
    hint:'5 × 400 = 2000 ml = 2 L.',
    explanation:'5 × 400 = 2000 ml = <b>2 L</b>.' }),

  makeMCQ({ id:'g3mth-msr-052', chapterId:'g3mth-measurement', difficulty:2, subsection:'capacity_l_ml',
    question:'A pool holds 1500 L of water. After a drought, there is only 750 L. How much water is missing?',
    options:['750 L','500 L','800 L','1000 L'], answer:'750 L',
    hint:'1500 − 750 = ?',
    explanation:'1500 − 750 = <b>750 L</b>.' }),

  makeMCQ({ id:'g3mth-msr-053', chapterId:'g3mth-measurement', difficulty:1, subsection:'capacity_l_ml',
    question:'Which is the better unit to measure the water in a swimming pool?',
    options:['litres (L)','millilitres (ml)','centimetres','grams'], answer:'litres (L)',
    hint:'A swimming pool holds a very large amount of water.',
    explanation:'<b>Litres (L)</b> is the better unit for large amounts of liquid.' }),

  makeMCQ({ id:'g3mth-msr-054', chapterId:'g3mth-measurement', difficulty:2, subsection:'capacity_l_ml',
    question:'Dev has 2 L 500 ml of juice and gives away 1 L 800 ml. How much juice is left?',
    options:['700 ml','800 ml','600 ml','1 L'], answer:'700 ml',
    hint:'2 L 500 ml = 2500 ml. 2500 − 1800 = ?',
    explanation:'2500 − 1800 = <b>700 ml</b>.' }),

  makeMCQ({ id:'g3mth-msr-055', chapterId:'g3mth-measurement', difficulty:2, subsection:'capacity_l_ml',
    question:'How many 500 ml bottles fill a 3 L container?',
    options:['6','3','5','10'], answer:'6',
    hint:'3 L = 3000 ml. 3000 ÷ 500 = ?',
    explanation:'3000 ml ÷ 500 ml = <b>6</b> bottles.' })
);

})();
