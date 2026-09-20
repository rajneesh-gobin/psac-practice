'use strict';
(function(){
const num=(id,s,q,a,h,e)=>STATIC_QUESTIONS.push(makeNum({id,chapterId:'g4-measures',subsection:s,difficulty:2,question:q,answer:String(a),acceptableAnswers:[String(a),`${a} cm`,`${a} g`,`${a} mL`,`${a} L`,`${a} Rs`,`${a} cm²`,`${a} m`],hint:h,explanation:e||`The answer is <b>${a}</b>.`}));
const gb=v=>Number(v).toLocaleString('en-US');
const mcq=(id,s,q,o,a,h,e)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:'g4-measures',subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:e||`<b>${a}</b> is correct.`}));
for(let i=0;i<14;i++){const m=2+i;num(`g4m-cov-len-${i}`,'length',`Convert ${m} m to centimetres.`,m*100,'1 metre = 100 centimetres.',`1 m = 100 cm, so ${m} m = ${m} \u00d7 100 = <b>${gb(m*100)}</b> cm.`);}
for(let i=0;i<16;i++){const kg=1+i;num(`g4m-cov-mass-${i}`,'mass',`Convert ${kg} kg to grams.`,kg*1000,'1 kilogram = 1,000 grams.',`1 kg = 1,000 g, so ${kg} kg = ${kg} \u00d7 1,000 = <b>${gb(kg*1000)}</b> g.`);}
for(let i=0;i<16;i++){const l=2+i;num(`g4m-cov-cap-${i}`,'capacity',`Convert ${l} L to millilitres.`,l*1000,'1 litre = 1,000 millilitres.',`1 L = 1,000 mL, so ${l} L = ${l} \u00d7 1,000 = <b>${gb(l*1000)}</b> mL.`);}
for(let i=0;i<10;i++){const h=1+i,min=5+i*5;num(`g4m-cov-time-${i}`,'time',`${h} hour${h===1?'':'s'} ${min} minutes = how many minutes?`,h*60+min,'Change hours into minutes, then add the remaining minutes.',`1 hour = 60 minutes, so ${h} hour${h===1?'':'s'} = ${h} \u00d7 60 = ${h*60} minutes. Add the extra ${min}: ${h*60} + ${min} = <b>${h*60+min}</b> minutes.`);}
for(let i=0;i<16;i++){const price=12+i*3,qty=2+i%5;num(`g4m-cov-money-${i}`,'money',`A pupil buys ${qty} notebooks at Rs ${price} each. How much does the pupil pay?`,price*qty,'Multiply the price of one item by the number of items.',`${qty} notebooks at Rs ${price} each: ${qty} \u00d7 ${price} = <b>Rs ${gb(price*qty)}</b>.`);}
// ⚠ These 18 were ONE question with the numbers walked upward — "Find the
//   area of a rectangle N cm long and M cm wide", N = 3..20. Eighteen turns of
//   the same sentence is one question to a child. Each now changes what the
//   child has to DO: read it forward, run it backwards, add or subtract two
//   areas, compare two rectangles, or reach the area through the perimeter.
// ⚠ The ids are KEPT. The importer keys on them and never deletes, so
//   renaming would orphan 18 rows in the questions table.
// ⚠ Every division comes out exact.
const area=(i,q,a,h,e,d)=>STATIC_QUESTIONS.push(makeNum({id:`g4m-cov-area-${i}`,chapterId:'g4-measures',subsection:'area',difficulty:d,question:q,answer:String(a),acceptableAnswers:[String(a),`${a} cm`,`${a} m`,`${a} cm²`,`${a} m²`],hint:h,explanation:e}));
area(0,'A vegetable bed is 7 m long and 4 m wide. What is its area, in square metres?',28,'Area of a rectangle = length × width.','Area = 7 × 4 = <b>28</b> square metres.',2);
area(1,'A classroom floor is 9 m long and 6 m wide. What is its area, in square metres?',54,'Area of a rectangle = length × width.','Area = 9 × 6 = <b>54</b> square metres.',2);
area(2,'A photograph measures 12 cm by 8 cm. What is its area, in cm²?',96,'Multiply the two sides together.','Area = 12 × 8 = <b>96</b> cm².',2);
area(3,'A floor tile measures 20 cm by 15 cm. What is the area of one tile, in cm²?',300,'Multiply the two sides together.','Area = 20 × 15 = <b>300</b> cm².',2);
area(4,'A rectangular garden has an area of 48 m². It is 8 m long. How wide is it, in metres?',6,'Area = length × width, so width = area ÷ length.','Width = 48 ÷ 8 = <b>6</b> m.',2);
area(5,'A carpet has an area of 24 m² and is 6 m long. How wide is it, in metres?',4,'Divide the area by the length.','Width = 24 ÷ 6 = <b>4</b> m.',2);
area(6,'A poster has an area of 96 cm² and is 12 cm wide. How tall is it, in cm?',8,'Divide the area by the width.','Height = 96 ÷ 12 = <b>8</b> cm.',2);
area(7,'A floor is made of two rectangles: one 6 m by 4 m, the other 3 m by 2 m. What is the total area, in square metres?',30,'Find each area, then add them.','Larger part = 6 × 4 = 24 m². Smaller part = 3 × 2 = 6 m². Total = <b>30</b> square metres.',3);
area(8,'A garden is 10 m by 6 m. A shed 3 m by 2 m stands on it. What area of garden is left, in square metres?',54,'Find the whole garden first, then take the shed away.','Garden = 10 × 6 = 60 m². Shed = 3 × 2 = 6 m². Left = 60 − 6 = <b>54</b> square metres.',3);
area(9,'A sheet of card 12 cm by 10 cm has a piece 5 cm by 4 cm cut out of it. What area of card is left, in cm²?',100,'Find the whole sheet first, then take away the piece cut out.','Sheet = 12 × 10 = 120 cm². Piece cut out = 5 × 4 = 20 cm². Left = 120 − 20 = <b>100</b> cm².',3);
area(10,'Rectangle A is 8 cm by 3 cm. Rectangle B is 6 cm by 5 cm. How many cm² larger is B?',6,'Work out both areas, then find the difference.','A = 8 × 3 = 24 cm². B = 6 × 5 = 30 cm². B is 30 − 24 = <b>6</b> cm² larger.',3);
area(11,'Two rectangles each have an area of 36 cm². The first is 9 cm long and the second is 12 cm long. How many cm wider is the first one?',1,'Find each width first: area ÷ length.','First width = 36 ÷ 9 = 4 cm. Second width = 36 ÷ 12 = 3 cm. The first is <b>1</b> cm wider.',3);
area(12,'A rectangle is drawn on 1 cm squared paper. It covers 7 rows with 6 squares in each row. What is its area, in cm²?',42,'Each square is 1 cm². Count 7 rows of 6.','7 rows of 6 squares = 42 squares, and each one is 1 cm², so the area is <b>42</b> cm².',2);
area(13,'How many square tiles measuring 1 m by 1 m are needed to cover a floor 9 m long and 4 m wide?',36,'Each tile covers 1 m², so count the square metres.','The floor is 9 × 4 = 36 m², and each tile covers 1 m², so <b>36</b> tiles are needed.',2);
area(14,'A square has a perimeter of 20 cm. What is its area, in cm²?',25,'Find one side first — a square has four equal sides.','Side = 20 ÷ 4 = 5 cm. Area = 5 × 5 = <b>25</b> cm².',3);
area(15,'A rectangle has an area of 40 cm² and is 8 cm long. What is its perimeter, in cm?',26,'Find the width first, then measure all the way round.','Width = 40 ÷ 8 = 5 cm. Perimeter = 2 × (8 + 5) = <b>26</b> cm.',3);
area(16,'A rectangle is 6 cm by 4 cm. Both of its sides are doubled. What is the new area, in cm²?',96,'Double each side first, then multiply.','Doubled, the sides are 12 cm and 8 cm. New area = 12 × 8 = <b>96</b> cm². That is four times the old area of 24 cm².',3);
area(17,'A rectangular pen is 5 m long and 4 m wide. The farmer makes it 3 m longer, keeping the same width. By how many square metres does the area grow?',12,'The extra piece is 3 m long and as wide as the pen.','The extra strip is 3 × 4 = <b>12</b> square metres. The pen grows from 20 m² to 32 m².',3);
// ⚠ These 19 were ONE question with the numbers walked upward — "Find the
//   perimeter of a rectangle N cm long and M cm wide", N = 4..22, same as the
//   area run above. Each now changes what the child has to DO: read it
//   forward, run it backwards, build a shape from tiles, compare two, match a
//   square to a rectangle, or carry the perimeter into a cost or a distance.
// ⚠ The ids are KEPT — the importer keys on them and never deletes.
// ⚠ Every division comes out exact.
const perim=(i,q,a,h,e,d)=>STATIC_QUESTIONS.push(makeNum({id:`g4m-cov-perim-${i}`,chapterId:'g4-measures',subsection:'perimeter',difficulty:d,question:q,answer:String(a),acceptableAnswers:[String(a),`${a} cm`,`${a} m`,`Rs ${a}`,`${a} Rs`],hint:h,explanation:e}));
perim(0,'A photo frame is 15 cm long and 10 cm wide. What is its perimeter, in cm?',50,'Perimeter is the distance all the way round: 2 × (length + width).','Perimeter = 2 × (15 + 10) = <b>50</b> cm.',2);
perim(1,'A netball court is 30 m long and 15 m wide. How many metres of rope are needed to go all the way round it?',90,'Perimeter = 2 × (length + width).','Perimeter = 2 × (30 + 15) = <b>90</b> m of rope.',2);
perim(2,'A square tile has sides of 9 cm. What is its perimeter, in cm?',36,'A square has four equal sides.','Perimeter = 4 × 9 = <b>36</b> cm.',2);
perim(3,'A vegetable plot is 12 m long and 7 m wide. How many metres of fencing go all the way round it?',38,'Perimeter = 2 × (length + width).','Perimeter = 2 × (12 + 7) = <b>38</b> m of fencing.',2);
perim(4,'A rectangle has a perimeter of 30 cm and is 9 cm long. How wide is it, in cm?',6,'Half the perimeter is one length plus one width.','Half of 30 is 15, which is one length plus one width. Width = 15 − 9 = <b>6</b> cm.',2);
perim(5,'A rectangle has a perimeter of 44 m and is 13 m wide. How long is it, in metres?',9,'Halve the perimeter first, then take away the width.','Half of 44 is 22, which is one length plus one width. Length = 22 − 13 = <b>9</b> m.',2);
perim(6,'A square has a perimeter of 36 cm. How long is one side, in cm?',9,'A square has four equal sides.','Side = 36 ÷ 4 = <b>9</b> cm.',2);
perim(7,'Two square tiles, each with sides of 6 cm, are placed side by side to make a rectangle. What is the perimeter of that rectangle, in cm?',36,'Work out the new rectangle’s length and width first.','The rectangle is 12 cm by 6 cm. Perimeter = 2 × (12 + 6) = <b>36</b> cm. It is not 2 × 24, because the two joined edges are now inside the shape.',3);
perim(8,'Three square tiles, each with sides of 5 cm, are placed in a row to make a long rectangle. What is its perimeter, in cm?',40,'Find the length of the row first, then go all the way round.','The row is 15 cm long and 5 cm wide. Perimeter = 2 × (15 + 5) = <b>40</b> cm.',3);
perim(9,'A rectangle 12 cm long and 5 cm wide is cut into two equal rectangles by one straight cut across the middle. What is the perimeter of ONE smaller rectangle, in cm?',22,'Each smaller rectangle is half as long, and just as wide.','Each piece is 6 cm by 5 cm. Perimeter = 2 × (6 + 5) = <b>22</b> cm.',3);
perim(10,'Rectangle A is 10 cm by 4 cm. Rectangle B is 7 cm by 5 cm. How many cm greater is the perimeter of A?',4,'Work out both perimeters, then find the difference.','A = 2 × (10 + 4) = 28 cm. B = 2 × (7 + 5) = 24 cm. A is 28 − 24 = <b>4</b> cm greater.',3);
perim(11,'A square and a rectangle both have a perimeter of 24 cm. The rectangle is 8 cm long. How many cm longer is the rectangle than one side of the square?',2,'Find the square’s side and the rectangle’s length, then compare.','Square side = 24 ÷ 4 = 6 cm. The rectangle is 8 cm long. 8 − 6 = <b>2</b> cm longer.',3);
perim(12,'A rectangle is 11 cm long and 5 cm wide. A square has the same perimeter. How long is one side of the square, in cm?',8,'Find the rectangle’s perimeter first, then share it between four equal sides.','Perimeter = 2 × (11 + 5) = 32 cm. Square side = 32 ÷ 4 = <b>8</b> cm.',3);
perim(13,'A square has a perimeter of 48 cm. A rectangle with the same perimeter is 16 cm long. How wide is the rectangle, in cm?',8,'Half of 48 is one length plus one width.','Half of 48 is 24, which is one length plus one width. Width = 24 − 16 = <b>8</b> cm.',3);
perim(14,'A rectangular garden is 14 m long and 9 m wide. Fencing costs Rs 25 for each metre. What is the total cost of fencing all the way round, in rupees?',1150,'Find the perimeter first, then multiply by the price of one metre.','Perimeter = 2 × (14 + 9) = 46 m. Cost = 46 × Rs 25 = <b>Rs 1,150</b>.',3);
perim(15,'A picture 20 cm by 12 cm is given a framing strip all the way round. The strip is sold in 8 cm pieces. How many pieces are needed?',8,'Find the distance all the way round, then see how many 8 cm pieces make it.','Perimeter = 2 × (20 + 12) = 64 cm. 64 ÷ 8 = <b>8</b> pieces.',3);
perim(16,'A square field has sides of 60 m. A runner runs all the way round it 3 times. How far does the runner go, in metres?',720,'Find the distance once round, then multiply by 3.','Once round = 4 × 60 = 240 m. Three times = 240 × 3 = <b>720</b> m.',3);
perim(17,'A rectangle is 8 cm long and 5 cm wide. Its length is made 4 cm longer. By how many cm does the perimeter grow?',8,'Work out the old perimeter and the new one, then compare.','Old perimeter = 2 × (8 + 5) = 26 cm. New = 2 × (12 + 5) = 34 cm. It grows by <b>8</b> cm. That is twice the 4 cm added, because the length is counted twice.',3);
perim(18,'A square has sides of 7 cm. Every side is made 3 cm longer. By how many cm does the perimeter grow?',12,'Work out the old perimeter and the new one, then compare.','Old perimeter = 4 × 7 = 28 cm. New = 4 × 10 = 40 cm. It grows by <b>12</b> cm, which is 3 cm on each of the four sides.',3);
})();
