'use strict';
// Grade 6 Maths - the four Grade 6 outcomes the pack was not asking.
//
// ⚠ WHY THIS FILE EXISTS. scripts/fact-ledgers/grade6-maths.json is built from the
//   two Grade 6 tables of the MIE Mathematics TLS (printed pages 16-17 and 23).
//   Against 717 questions it reported four:
//     num-19  ratio and PROPORTION - "proportion" appeared zero times, though
//             "ratio" appeared thirty times
//     num-22  perform and describe simple MENTAL computation - zero
//     geo-06  identify and name the PYRAMID - zero, and the rest of the 3-D
//             naming strand was one question each for cylinder and prism
//     geo-11  COMPLETE a figure given one or two lines of symmetry - the pack
//             asks a child to draw lines of symmetry and to count them, never
//             to complete a figure across one
//
// ⚠ geo-11 is built with makeSymmetry(), the grid the child clicks to mirror a
//   pattern. It already exists and grade5-maths uses it six times; grade6-maths
//   had NONE (its only non-MCQ types were numeric and symmetry-line). Completing
//   a figure is a doing task, and an MCQ about it would not be the same outcome.
//
// ⚠ No new subsections: `word_probs`, `3d_shapes` and `symmetry` are all declared.
//
// IDs: g6m-syl-001 onwards.

STATIC_QUESTIONS.push(

  // ── Direct proportion ───────────────────────────────────────────────────
  makeMCQ({ id:'g6m-syl-001', chapterId:'g6-ratio-pct', subsection:'word_probs', difficulty:2,
    question:'Two quantities are in <b>direct proportion</b>. What happens when one of them doubles?',
    options:['The other one doubles too','The other one is halved','The other one stays the same','The other one becomes zero'], answer:'The other one doubles too',
    hint:'Think of 1 pen costing Rs 12 and 2 pens costing Rs 24.',
    explanation:'In <b>direct proportion</b> the two quantities grow and shrink together: double one and the other doubles.' }),

  makeNum({ id:'g6m-syl-002', chapterId:'g6-ratio-pct', subsection:'word_probs', difficulty:2,
    question:'5 exercise books cost Rs 150. At the same rate, how much do 8 exercise books cost, in rupees?',
    answer:240,
    hint:'Find the cost of one book first, then multiply.',
    explanation:'One book costs 150 &divide; 5 = Rs 30, so 8 books cost 30 &times; 8 = <b>Rs 240</b>. Finding the value of one unit first is the usual way to solve a direct proportion problem.' }),

  makeNum({ id:'g6m-syl-003', chapterId:'g6-ratio-pct', subsection:'word_probs', difficulty:2,
    question:'A car uses 12 litres of petrol to travel 96 km. At the same rate, how many kilometres will it travel on 5 litres?',
    answer:40,
    hint:'How far does the car go on 1 litre?',
    explanation:'On 1 litre the car goes 96 &divide; 12 = 8 km, so on 5 litres it goes 8 &times; 5 = <b>40 km</b>.' }),

  makeNum({ id:'g6m-syl-004', chapterId:'g6-ratio-pct', subsection:'word_probs', difficulty:3,
    question:'4 workers build a wall in 9 days. Working at the same rate, how many days would 6 workers take?',
    answer:6,
    hint:'More workers means fewer days, so this is not direct proportion.',
    explanation:'The whole job is 4 &times; 9 = 36 worker-days. With 6 workers it takes 36 &divide; 6 = <b>6 days</b>. Here one quantity rises as the other falls, which is <b>inverse</b> proportion, not direct.' }),

  makeMCQ({ id:'g6m-syl-005', chapterId:'g6-ratio-pct', subsection:'word_probs', difficulty:3,
    question:'Which of these pairs of quantities are in <b>direct proportion</b>?',
    options:['The number of books and their total cost','The number of workers and the days taken','A child&rsquo;s age and their shoe size','The speed of a bus and its travel time'], answer:'The number of books and their total cost',
    hint:'Ask which pair grows together at a steady rate.',
    explanation:'Twice as many books cost twice as much, so they are in <b>direct proportion</b>. More workers means fewer days and a faster bus means less time &mdash; those go the opposite way.' }),

  makeNum({ id:'g6m-syl-006', chapterId:'g6-ratio-pct', subsection:'word_probs', difficulty:3,
    question:'A recipe for 6 people needs 450 g of rice. How many grams of rice are needed for 10 people?',
    answer:750,
    hint:'Work out the rice for one person first.',
    explanation:'One person needs 450 &divide; 6 = 75 g, so 10 people need 75 &times; 10 = <b>750 g</b>.' }),

  makeMCQ({ id:'g6m-syl-007', chapterId:'g6-ratio-pct', subsection:'word_probs', difficulty:4,
    question:'3 identical taps fill a tank in 20 minutes. A pupil says 6 taps would take 40 minutes. What has gone wrong?',
    options:['More taps must take less time','The taps are not identical','The tank changes size','Nothing, the answer is right'], answer:'More taps must take less time',
    hint:'Decide first whether the two quantities go the same way or opposite ways.',
    explanation:'Doubling the taps <b>halves</b> the time, so the answer is 10 minutes. The pupil has treated an inverse relation as if it were direct proportion.' }),

  // ── Mental computation ──────────────────────────────────────────────────
  makeNum({ id:'g6m-syl-008', chapterId:'g6-four-ops', subsection:'mixed_ops', difficulty:2,
    question:'Work this out <b>mentally</b>: 199 + 46',
    answer:245,
    hint:'Treat 199 as 200 and adjust at the end.',
    explanation:'200 + 46 = 246, then take back the 1 you added: <b>245</b>. Rounding to a friendly number and adjusting is a standard mental method.' }),

  makeNum({ id:'g6m-syl-009', chapterId:'g6-four-ops', subsection:'mixed_ops', difficulty:2,
    question:'Work this out <b>mentally</b>: 25 &times; 16',
    answer:400,
    hint:'Four 25s make 100.',
    explanation:'25 &times; 16 = 25 &times; 4 &times; 4 = 100 &times; 4 = <b>400</b>. Splitting a factor into easier parts is a mental strategy worth knowing.' }),

  makeNum({ id:'g6m-syl-010', chapterId:'g6-four-ops', subsection:'mixed_ops', difficulty:2,
    question:'Work this out <b>mentally</b>: 1 000 &minus; 376',
    answer:624,
    hint:'Count up from 376 to 400, then to 1 000.',
    explanation:'From 376 to 400 is 24, and from 400 to 1 000 is 600, so the answer is <b>624</b>. Counting up beats borrowing when the first number is round.' }),

  makeMCQ({ id:'g6m-syl-011', chapterId:'g6-four-ops', subsection:'mixed_ops', difficulty:3,
    question:'Which is the best <b>mental</b> method for 48 + 27?',
    options:['Add 50, then take away 2','Write it out in columns','Count on in ones from 48','Use a calculator'], answer:'Add 50, then take away 2',
    hint:'Look for the method that turns a hard number into an easy one.',
    explanation:'48 is close to 50, so add 50 to get 77 and take back the 2: <b>75</b>. Describing the method is part of the outcome, not only getting the answer.' }),

  makeNum({ id:'g6m-syl-012', chapterId:'g6-four-ops', subsection:'mixed_ops', difficulty:3,
    question:'Work this out <b>mentally</b>: 35 &times; 99',
    answer:3465,
    hint:'99 is one less than 100.',
    explanation:'35 &times; 100 = 3 500, then take away one 35: 3 500 &minus; 35 = <b>3 465</b>.' }),

  makeMCQ({ id:'g6m-syl-013', chapterId:'g6-four-ops', subsection:'mixed_ops', difficulty:3,
    question:'A shopkeeper works out 8 &times; 250 in his head as 4 &times; 500. Why does that work?',
    options:['Halving one factor and doubling the other keeps the product','He has changed the answer slightly','It only works with the number 8','He should have used 2 &times; 1000 instead'], answer:'Halving one factor and doubling the other keeps the product',
    hint:'Check both: 8 × 250 and 4 × 500.',
    explanation:'Halving one factor while doubling the other <b>leaves the product unchanged</b>, so 8 &times; 250 = 4 &times; 500 = 2 000. Explaining why a mental method works is the Grade 6 outcome.' }),

  makeNum({ id:'g6m-syl-014', chapterId:'g6-four-ops', subsection:'mixed_ops', difficulty:4,
    question:'A tin costs Rs 98. Work out <b>mentally</b> the cost of 7 tins, in rupees.',
    answer:686,
    hint:'Buy them at Rs 100 each, then give back the change.',
    explanation:'7 &times; 100 = 700, then take off 7 &times; 2 = 14, giving <b>Rs 686</b>. Shopkeepers use this method every day.' }),

  // ── 3-D shapes: the pyramid, and the rest of the strand ────────────────
  makeMCQ({ id:'g6m-syl-015', chapterId:'g6-geometry', subsection:'3d_shapes', difficulty:1,
    question:'Which 3-D shape has a flat base and triangular faces meeting at one point at the top?',
    options:['A pyramid','A cylinder','A cuboid','A sphere'], answer:'A pyramid',
    hint:'Think of the shape of the tombs built in Egypt.',
    explanation:'A <b>pyramid</b> has a flat base and triangular faces that meet at a single point called the apex.' }),

  makeNum({ id:'g6m-syl-016', chapterId:'g6-geometry', subsection:'3d_shapes', difficulty:2,
    question:'How many faces does a square-based pyramid have?',
    answer:5,
    hint:'Count the base as well as the sloping faces.',
    explanation:'Four triangular faces and one square base give <b>5</b> faces in all.' }),

  makeNum({ id:'g6m-syl-017', chapterId:'g6-geometry', subsection:'3d_shapes', difficulty:2,
    question:'How many edges does a square-based pyramid have?',
    answer:8,
    hint:'Four edges round the base, and one up each corner.',
    explanation:'The base has 4 edges and 4 more run up to the apex, making <b>8</b> edges.' }),

  makeNum({ id:'g6m-syl-018', chapterId:'g6-geometry', subsection:'3d_shapes', difficulty:2,
    question:'How many vertices does a square-based pyramid have?',
    answer:5,
    hint:'Count the corners of the base, then the point at the top.',
    explanation:'Four corners at the base plus the apex give <b>5</b> vertices.' }),

  makeMCQ({ id:'g6m-syl-019', chapterId:'g6-geometry', subsection:'3d_shapes', difficulty:2,
    question:'Which 3-D shape has two circular faces and one curved surface?',
    options:['A cylinder','A pyramid','A cube','A cone'], answer:'A cylinder',
    hint:'Think of a tin of tomatoes.',
    explanation:'A <b>cylinder</b> has a circle at each end joined by one curved surface. A cone has only one circular face.' }),

  makeMCQ({ id:'g6m-syl-020', chapterId:'g6-geometry', subsection:'3d_shapes', difficulty:3,
    question:'A prism has two identical triangular ends joined by rectangles. What is it called?',
    options:['A triangular prism','A triangular pyramid','A cuboid','A cylinder'], answer:'A triangular prism',
    hint:'The shape of the two matching ends gives the prism its name.',
    explanation:'A <b>triangular prism</b> takes its name from its two identical triangular ends. A pyramid would narrow to a point instead.' }),

  makeMCQ({ id:'g6m-syl-021', chapterId:'g6-geometry', subsection:'3d_shapes', difficulty:3,
    question:'What is the difference between a pyramid and a prism?',
    options:['A pyramid narrows to a point','A prism narrows to a point','A pyramid has no flat faces','A prism has no straight edges'], answer:'A pyramid narrows to a point',
    hint:'Picture each one from the side.',
    explanation:'A <b>pyramid narrows to a single point</b>, while a prism keeps the same cross-section from one end to the other.' }),

  makeNum({ id:'g6m-syl-022', chapterId:'g6-geometry', subsection:'3d_shapes', difficulty:4,
    question:'A triangular prism has 5 faces and 6 vertices. How many edges does it have?',
    answer:9,
    hint:'Three edges at each triangular end, and three joining them.',
    explanation:'Each triangle has 3 edges, and 3 more join the two ends: 3 + 3 + 3 = <b>9</b> edges.' }),

  // ── Completing a figure across a line of symmetry ──────────────────────
  // ⚠ makeSymmetry, not an MCQ: the outcome is to COMPLETE the figure, which is
  //   something the child has to do rather than choose.
  makeSymmetry({ id:'g6m-syl-023', chapterId:'g6-geometry', subsection:'symmetry', difficulty:2,
    rows:6, cols:7, axis:'vertical', axisPos:3,
    question:'<b>Complete the figure</b> so that the yellow line is its line of symmetry. Click the empty cells on the other side.',
    given:[[1,1],[2,1],[2,2],[3,1],[4,1]],
    hint:'Take each filled cell in turn and click its mirror on the far side of the line.' }),

  makeSymmetry({ id:'g6m-syl-024', chapterId:'g6-geometry', subsection:'symmetry', difficulty:2,
    rows:6, cols:7, axis:'vertical', axisPos:3,
    question:'<b>Complete the figure</b> across the line of symmetry by clicking the empty cells.',
    given:[[0,2],[1,1],[2,0],[3,1],[4,2]],
    hint:'Column 2 mirrors to column 4, column 1 to column 5, column 0 to column 6.' }),

  makeSymmetry({ id:'g6m-syl-025', chapterId:'g6-geometry', subsection:'symmetry', difficulty:3,
    rows:7, cols:7, axis:'horizontal', axisPos:3,
    question:'<b>Complete the figure</b> so that the yellow line is a <b>horizontal</b> line of symmetry.',
    given:[[0,1],[0,5],[1,2],[1,4],[2,3]],
    hint:'This time the mirror is across, not down: row 0 mirrors to row 6, row 1 to row 5, row 2 to row 4.' }),

  makeSymmetry({ id:'g6m-syl-026', chapterId:'g6-geometry', subsection:'symmetry', difficulty:3,
    rows:7, cols:7, axis:'horizontal', axisPos:3,
    question:'<b>Complete the figure</b> across the horizontal line of symmetry.',
    given:[[0,0],[0,1],[0,2],[1,0],[2,0]],
    hint:'Each filled cell in the top half has a partner the same distance below the line.' }),

  makeSymmetry({ id:'g6m-syl-027', chapterId:'g6-geometry', subsection:'symmetry', difficulty:4,
    rows:6, cols:7, axis:'vertical', axisPos:3,
    question:'<b>Complete the figure</b> across the line of symmetry. The shape is a diagonal, so no two cells share a row.',
    given:[[0,0],[1,1],[2,2],[3,2],[4,1],[5,0]],
    hint:'Work down one row at a time: each row has exactly one cell to mirror.' }),

  makeSymmetry({ id:'g6m-syl-028', chapterId:'g6-geometry', subsection:'symmetry', difficulty:4,
    rows:6, cols:7, axis:'vertical', axisPos:3,
    question:'<b>Complete the figure</b> so that the whole shape has the yellow line as its line of symmetry.',
    given:[[1,0],[1,2],[2,1],[3,0],[3,2],[4,1]],
    hint:'Two rows hold two cells each. Mirror both before moving on.' })

);
