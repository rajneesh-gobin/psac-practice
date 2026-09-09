'use strict';
(function () {

// ── comparing_length (001–025) ────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-msr-001', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'A ruler is longer than a pencil. Which is longer?',
    options:['ruler','pencil','they are the same','cannot tell'], answer:'ruler',
    hint:'The longer object takes up more space.',
    explanation:'The <b>ruler</b> is longer than the pencil.' }),

  makeMCQ({ id:'g1mth-msr-002', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'A cat is taller than a mouse. Which is shorter?',
    options:['mouse','cat','they are the same','cannot tell'], answer:'mouse',
    hint:'Shorter means smaller in height.',
    explanation:'The <b>mouse</b> is shorter than the cat.' }),

  makeMCQ({ id:'g1mth-msr-003', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'A tree is taller than a flower. Which is taller?',
    options:['tree','flower','they are the same','cannot tell'], answer:'tree',
    hint:'Taller means reaching higher up.',
    explanation:'The <b>tree</b> is taller than the flower.' }),

  makeMCQ({ id:'g1mth-msr-004', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'Three children stand in a row: Rani (short), Tom (tall), Mia (medium). Who is the tallest?',
    options:['Tom','Rani','Mia','cannot tell'], answer:'Tom',
    hint:'Tallest means the biggest in height.',
    explanation:'<b>Tom</b> is the tallest.' }),

  makeMCQ({ id:'g1mth-msr-005', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'Rani has a long ribbon and Mia has a short ribbon. Whose ribbon is shorter?',
    options:['Mia','Rani','they are the same','cannot tell'], answer:'Mia',
    hint:'Short means less length.',
    explanation:'<b>Mia\'s</b> ribbon is shorter.' }),

  makeMCQ({ id:'g1mth-msr-006', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'A giraffe is taller than an elephant. Which animal is shorter?',
    options:['elephant','giraffe','they are the same','cannot tell'], answer:'elephant',
    hint:'The shorter animal is not as tall.',
    explanation:'The <b>elephant</b> is shorter than the giraffe.' }),

  makeMCQ({ id:'g1mth-msr-007', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'A bed is longer than a chair. Which is longer?',
    options:['bed','chair','they are the same','cannot tell'], answer:'bed',
    hint:'The longer object is bigger from end to end.',
    explanation:'The <b>bed</b> is longer than the chair.' }),

  makeMCQ({ id:'g1mth-msr-008', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'Which word is the OPPOSITE of "tall"?',
    options:['short','long','wide','heavy'], answer:'short',
    hint:'Tall is big in height; the opposite is ___.',
    explanation:'The opposite of tall is <b>short</b>.' }),

  makeMCQ({ id:'g1mth-msr-009', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'Which word is the OPPOSITE of "long"?',
    options:['short','tall','heavy','wide'], answer:'short',
    hint:'A short object is not long.',
    explanation:'The opposite of long is <b>short</b>.' }),

  makeMCQ({ id:'g1mth-msr-010', chapterId:'g1mth-measurement', difficulty:2, subsection:'comparing_length',
    question:'Tom\'s pencil is shorter than Dev\'s pencil. Dev\'s pencil is shorter than Rani\'s pencil. Whose pencil is the longest?',
    options:['Rani','Dev','Tom','they are all the same'], answer:'Rani',
    hint:'Compare step by step: Tom < Dev < Rani.',
    explanation:'<b>Rani\'s</b> pencil is the longest.' }),

  makeMCQ({ id:'g1mth-msr-011', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'A snake is longer than a worm. Which is shorter?',
    options:['worm','snake','they are the same','cannot tell'], answer:'worm',
    hint:'The shorter one has less length.',
    explanation:'The <b>worm</b> is shorter than the snake.' }),

  makeMCQ({ id:'g1mth-msr-012', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'Mia has a short piece of string and Dev has a long piece. Who has the longer string?',
    options:['Dev','Mia','they are the same','cannot tell'], answer:'Dev',
    hint:'Long means more length.',
    explanation:'<b>Dev</b> has the longer string.' }),

  makeMCQ({ id:'g1mth-msr-013', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'An ant is much smaller than a dog. Which is taller?',
    options:['dog','ant','they are the same','cannot tell'], answer:'dog',
    hint:'The taller animal is bigger.',
    explanation:'The <b>dog</b> is much taller than the ant.' }),

  makeMCQ({ id:'g1mth-msr-014', chapterId:'g1mth-measurement', difficulty:2, subsection:'comparing_length',
    question:'Three ribbons: red (long), blue (short), green (medium). Which ribbon is the shortest?',
    options:['blue','red','green','cannot tell'], answer:'blue',
    hint:'Shortest = the least long.',
    explanation:'The <b>blue</b> ribbon is the shortest.' }),

  makeMCQ({ id:'g1mth-msr-015', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'A bus is longer than a car. Which is shorter?',
    options:['car','bus','they are the same','cannot tell'], answer:'car',
    hint:'The shorter vehicle is smaller.',
    explanation:'The <b>car</b> is shorter than the bus.' }),

  makeMCQ({ id:'g1mth-msr-016', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'Rani\'s hair is long. Tom\'s hair is short. Whose hair is longer?',
    options:['Rani','Tom','they are the same','cannot tell'], answer:'Rani',
    hint:'Long is more length.',
    explanation:'<b>Rani\'s</b> hair is longer.' }),

  makeMCQ({ id:'g1mth-msr-017', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'A mountain is taller than a hill. Which is taller?',
    options:['mountain','hill','they are the same','cannot tell'], answer:'mountain',
    hint:'A mountain reaches higher than a hill.',
    explanation:'A <b>mountain</b> is taller than a hill.' }),

  makeMCQ({ id:'g1mth-msr-018', chapterId:'g1mth-measurement', difficulty:2, subsection:'comparing_length',
    question:'Dev\'s book is thicker (taller when stacked) than Tom\'s book. Whose book is thinner?',
    options:['Tom','Dev','they are the same','cannot tell'], answer:'Tom',
    hint:'Thinner means less thick.',
    explanation:'<b>Tom\'s</b> book is thinner (less thick).' }),

  makeMCQ({ id:'g1mth-msr-019', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'A table is taller than a stool. Which is shorter?',
    options:['stool','table','they are the same','cannot tell'], answer:'stool',
    hint:'Shorter means not as tall.',
    explanation:'The <b>stool</b> is shorter than the table.' }),

  makeMCQ({ id:'g1mth-msr-020', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'Mia\'s ribbon is 3 handspans long. Rani\'s ribbon is 5 handspans long. Which is longer?',
    options:['Rani\'s','Mia\'s','they are the same','cannot tell'], answer:'Rani\'s',
    hint:'5 handspans is more than 3.',
    explanation:'<b>Rani\'s</b> ribbon is longer — 5 > 3.' }),

  makeMCQ({ id:'g1mth-msr-021', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'A pencil is shorter than a ruler. Which is longer?',
    options:['ruler','pencil','they are the same','cannot tell'], answer:'ruler',
    hint:'Longer means more length.',
    explanation:'The <b>ruler</b> is longer than the pencil.' }),

  makeMCQ({ id:'g1mth-msr-022', chapterId:'g1mth-measurement', difficulty:2, subsection:'comparing_length',
    question:'Tom measures a table with his handspan. It is 8 handspans wide. Mia\'s table is 6 handspans wide. Whose table is wider?',
    options:['Tom\'s','Mia\'s','they are the same','cannot tell'], answer:'Tom\'s',
    hint:'8 handspans is wider than 6.',
    explanation:'<b>Tom\'s</b> table is wider — 8 > 6.' }),

  makeMCQ({ id:'g1mth-msr-023', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'Which animal is taller: a mouse or an elephant?',
    options:['elephant','mouse','they are the same','cannot tell'], answer:'elephant',
    hint:'An elephant is much bigger than a mouse.',
    explanation:'An <b>elephant</b> is much taller than a mouse.' }),

  makeMCQ({ id:'g1mth-msr-024', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_length',
    question:'A crayon is shorter than a ruler but longer than an eraser. Which is shortest?',
    options:['eraser','crayon','ruler','they are the same'], answer:'eraser',
    hint:'Eraser < crayon < ruler.',
    explanation:'The <b>eraser</b> is the shortest of the three.' }),

  makeMCQ({ id:'g1mth-msr-025', chapterId:'g1mth-measurement', difficulty:2, subsection:'comparing_length',
    question:'Dev measures his foot. It is 4 blocks long. Rani\'s foot is 3 blocks long. Whose foot is shorter?',
    options:['Rani','Dev','they are the same','cannot tell'], answer:'Rani',
    hint:'3 blocks is fewer than 4.',
    explanation:'<b>Rani\'s</b> foot is shorter — 3 < 4.' })
);

// ── comparing_mass (026–050) ──────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-msr-026', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'A bag of rice is heavier than a feather. Which is lighter?',
    options:['feather','rice','same weight','cannot tell'], answer:'feather',
    hint:'Lighter means less heavy.',
    explanation:'A <b>feather</b> is much lighter than a bag of rice.' }),

  makeMCQ({ id:'g1mth-msr-027', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'Which is heavier: a watermelon or a grape?',
    options:['watermelon','grape','same','cannot tell'], answer:'watermelon',
    hint:'A watermelon is a large, heavy fruit.',
    explanation:'A <b>watermelon</b> is much heavier than a grape.' }),

  makeMCQ({ id:'g1mth-msr-028', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'A book is heavier than a pencil. Which is lighter?',
    options:['pencil','book','same','cannot tell'], answer:'pencil',
    hint:'The lighter object is less heavy.',
    explanation:'A <b>pencil</b> is lighter than a book.' }),

  makeMCQ({ id:'g1mth-msr-029', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'Which is lighter: a cat or a bicycle?',
    options:['cat','bicycle','same','cannot tell'], answer:'cat',
    hint:'A bicycle is made of heavy metal.',
    explanation:'A <b>cat</b> is lighter than a bicycle.' }),

  makeMCQ({ id:'g1mth-msr-030', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'An elephant is heavier than a dog. Which word describes the dog?',
    options:['lighter','heavier','same','taller'], answer:'lighter',
    hint:'The dog weighs less.',
    explanation:'The dog is <b>lighter</b> than the elephant.' }),

  makeMCQ({ id:'g1mth-msr-031', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'Which is heavier: a bag of sand or a balloon?',
    options:['bag of sand','balloon','same','cannot tell'], answer:'bag of sand',
    hint:'Sand is heavy; a balloon is very light.',
    explanation:'A <b>bag of sand</b> is much heavier than a balloon.' }),

  makeMCQ({ id:'g1mth-msr-032', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'Tom\'s school bag is heavier than his lunch box. Which is heavier?',
    options:['school bag','lunch box','same','cannot tell'], answer:'school bag',
    hint:'Heavier means weighing more.',
    explanation:'Tom\'s <b>school bag</b> is heavier.' }),

  makeMCQ({ id:'g1mth-msr-033', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'A pineapple is lighter than a pumpkin. Which is heavier?',
    options:['pumpkin','pineapple','same','cannot tell'], answer:'pumpkin',
    hint:'The heavier one weighs more.',
    explanation:'The <b>pumpkin</b> is heavier than the pineapple.' }),

  makeMCQ({ id:'g1mth-msr-034', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'Which is lighter: a pencil or a chair?',
    options:['pencil','chair','same','cannot tell'], answer:'pencil',
    hint:'A chair is made of wood or metal — very heavy.',
    explanation:'A <b>pencil</b> is much lighter than a chair.' }),

  makeMCQ({ id:'g1mth-msr-035', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'A ball of cotton is lighter than a ball of stone. Which is heavier?',
    options:['stone','cotton','same','cannot tell'], answer:'stone',
    hint:'Stone is much denser than cotton.',
    explanation:'The ball of <b>stone</b> is heavier.' }),

  makeMCQ({ id:'g1mth-msr-036', chapterId:'g1mth-measurement', difficulty:2, subsection:'comparing_mass',
    question:'Rani weighs 3 bags on a balance. Bag A is the heaviest and Bag C is the lightest. Which bag is in the middle?',
    options:['Bag B','Bag A','Bag C','cannot tell'], answer:'Bag B',
    hint:'If A is heaviest and C is lightest, what is in the middle?',
    explanation:'<b>Bag B</b> is in the middle — heavier than C but lighter than A.' }),

  makeMCQ({ id:'g1mth-msr-037', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'A mango is heavier than a lychee. Which is lighter?',
    options:['lychee','mango','same','cannot tell'], answer:'lychee',
    hint:'Lighter means weighs less.',
    explanation:'A <b>lychee</b> is lighter than a mango.' }),

  makeMCQ({ id:'g1mth-msr-038', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'Which word means "weighs more"?',
    options:['heavier','lighter','taller','shorter'], answer:'heavier',
    hint:'On a balance scale, the heavier side goes down.',
    explanation:'<b>Heavier</b> means weighing more.' }),

  makeMCQ({ id:'g1mth-msr-039', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'A chair is heavier than a cup. Which word describes the cup?',
    options:['lighter','heavier','taller','shorter'], answer:'lighter',
    hint:'The cup weighs less than the chair.',
    explanation:'The cup is <b>lighter</b> than the chair.' }),

  makeMCQ({ id:'g1mth-msr-040', chapterId:'g1mth-measurement', difficulty:2, subsection:'comparing_mass',
    question:'Dev holds a book in one hand and a pencil in the other. Which hand is heavier?',
    options:['the hand holding the book','the hand holding the pencil','both hands weigh the same','cannot tell'], answer:'the hand holding the book',
    hint:'Which is heavier — a book or a pencil?',
    explanation:'The hand holding the <b>book</b> is heavier.' }),

  makeMCQ({ id:'g1mth-msr-041', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'A rock is heavier than a leaf. Which is lighter?',
    options:['leaf','rock','same','cannot tell'], answer:'leaf',
    hint:'A leaf is very light.',
    explanation:'A <b>leaf</b> is much lighter than a rock.' }),

  makeMCQ({ id:'g1mth-msr-042', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'A dog is lighter than a horse. Which is heavier?',
    options:['horse','dog','same','cannot tell'], answer:'horse',
    hint:'A horse is a very large, heavy animal.',
    explanation:'A <b>horse</b> is heavier than a dog.' }),

  makeMCQ({ id:'g1mth-msr-043', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'A papaya is heavier than a lychee but lighter than a watermelon. Which is the lightest?',
    options:['lychee','papaya','watermelon','cannot tell'], answer:'lychee',
    hint:'Lychee < papaya < watermelon.',
    explanation:'A <b>lychee</b> is the lightest of the three.' }),

  makeMCQ({ id:'g1mth-msr-044', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'On a balance scale, Rani\'s side goes DOWN. What does this mean?',
    options:['Rani\'s side is heavier','Rani\'s side is lighter','both sides are equal','cannot tell'], answer:'Rani\'s side is heavier',
    hint:'The heavier side of a balance goes down.',
    explanation:'When a side goes down, it is <b>heavier</b>.' }),

  makeMCQ({ id:'g1mth-msr-045', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'Which is the heaviest: a feather, a book, or an elephant?',
    options:['elephant','book','feather','cannot tell'], answer:'elephant',
    hint:'Which of these is the largest and heaviest?',
    explanation:'An <b>elephant</b> is the heaviest of the three.' }),

  makeMCQ({ id:'g1mth-msr-046', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'Tom\'s bag is lighter than Dev\'s bag. Whose bag is heavier?',
    options:['Dev','Tom','same','cannot tell'], answer:'Dev',
    hint:'Heavier is the opposite of lighter.',
    explanation:'<b>Dev\'s</b> bag is heavier.' }),

  makeMCQ({ id:'g1mth-msr-047', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'Which is lighter: sand or air?',
    options:['air','sand','same','cannot tell'], answer:'air',
    hint:'Air is almost weightless.',
    explanation:'<b>Air</b> is lighter than sand.' }),

  makeMCQ({ id:'g1mth-msr-048', chapterId:'g1mth-measurement', difficulty:2, subsection:'comparing_mass',
    question:'A balance scale is level (both sides equal). Mia adds a mango to one side. What happens?',
    options:['the mango side goes down','the mango side goes up','both sides stay level','the scale breaks'], answer:'the mango side goes down',
    hint:'Adding weight makes that side heavier.',
    explanation:'Adding the mango makes that side heavier, so it <b>goes down</b>.' }),

  makeMCQ({ id:'g1mth-msr-049', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'A car is heavier than a bicycle. Which is lighter?',
    options:['bicycle','car','same','cannot tell'], answer:'bicycle',
    hint:'A bicycle weighs much less than a car.',
    explanation:'A <b>bicycle</b> is lighter than a car.' }),

  makeMCQ({ id:'g1mth-msr-050', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_mass',
    question:'Which word means "weighs less"?',
    options:['lighter','heavier','taller','longer'], answer:'lighter',
    hint:'Lighter is the opposite of heavier.',
    explanation:'<b>Lighter</b> means weighing less.' })
);

// ── comparing_capacity (051–075) ──────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-msr-051', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'A big bucket holds ___ water than a small cup.',
    options:['more','less','the same','no'], answer:'more',
    hint:'A bigger container holds more.',
    explanation:'A big bucket holds <b>more</b> water than a small cup.' }),

  makeMCQ({ id:'g1mth-msr-052', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'A swimming pool holds ___ water than a glass.',
    options:['more','less','the same','no'], answer:'more',
    hint:'A swimming pool is much bigger.',
    explanation:'A swimming pool holds <b>more</b> water — it is much bigger than a glass.' }),

  makeMCQ({ id:'g1mth-msr-053', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Which word describes a container that has water all the way to the top?',
    options:['full','empty','half-full','heavy'], answer:'full',
    hint:'Water up to the very top — no space left.',
    explanation:'When a container is filled to the top, it is <b>full</b>.' }),

  makeMCQ({ id:'g1mth-msr-054', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Which word describes a container with NO water in it?',
    options:['empty','full','half-full','heavy'], answer:'empty',
    hint:'Nothing is inside.',
    explanation:'A container with no water is <b>empty</b>.' }),

  makeMCQ({ id:'g1mth-msr-055', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'A teaspoon holds ___ water than a bucket.',
    options:['less','more','the same','no'], answer:'less',
    hint:'A teaspoon is tiny compared to a bucket.',
    explanation:'A teaspoon holds <b>less</b> water than a bucket.' }),

  makeMCQ({ id:'g1mth-msr-056', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Which container holds MORE water: a bowl or a bottle?',
    options:['bottle','bowl','same','cannot tell'], answer:'bottle',
    hint:'Think about which one can store more water.',
    explanation:'A <b>bottle</b> generally holds more water than a bowl.' }),

  makeMCQ({ id:'g1mth-msr-057', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Rani pours water until it reaches the middle of a jug. The jug is ___.',
    options:['half-full','full','empty','broken'], answer:'half-full',
    hint:'Water is at the middle — not full, not empty.',
    explanation:'The jug is <b>half-full</b> — water reaches the middle.' }),

  makeMCQ({ id:'g1mth-msr-058', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Which holds MORE: a bathtub or a cup?',
    options:['bathtub','cup','same','cannot tell'], answer:'bathtub',
    hint:'A bathtub is much bigger than a cup.',
    explanation:'A <b>bathtub</b> holds much more water than a cup.' }),

  makeMCQ({ id:'g1mth-msr-059', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Tom drinks all the juice from his glass. The glass is now ___.',
    options:['empty','full','half-full','heavy'], answer:'empty',
    hint:'Nothing is left in the glass.',
    explanation:'After Tom drinks it all, the glass is <b>empty</b>.' }),

  makeMCQ({ id:'g1mth-msr-060', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Mia fills her bottle to the top. The bottle is ___.',
    options:['full','empty','half-full','light'], answer:'full',
    hint:'Filled to the top = no space left.',
    explanation:'Mia\'s bottle is <b>full</b>.' }),

  makeMCQ({ id:'g1mth-msr-061', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Which holds LESS: a swimming pool or a glass of water?',
    options:['glass of water','swimming pool','same','cannot tell'], answer:'glass of water',
    hint:'A glass holds much less water.',
    explanation:'A <b>glass of water</b> holds much less than a swimming pool.' }),

  makeMCQ({ id:'g1mth-msr-062', chapterId:'g1mth-measurement', difficulty:2, subsection:'comparing_capacity',
    question:'Dev fills 3 cups of water and pours them into a jug. Rani fills 5 cups and pours them into her jug. Whose jug has more water?',
    options:['Rani\'s','Dev\'s','same','cannot tell'], answer:'Rani\'s',
    hint:'5 cups is more than 3 cups.',
    explanation:'<b>Rani\'s</b> jug has more water — 5 cups is more than 3 cups.' }),

  makeMCQ({ id:'g1mth-msr-063', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Which word is the OPPOSITE of "empty"?',
    options:['full','heavy','wide','short'], answer:'full',
    hint:'If empty means nothing inside, the opposite means…',
    explanation:'The opposite of empty is <b>full</b>.' }),

  makeMCQ({ id:'g1mth-msr-064', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'A pot holds more water than a spoon. Which holds less?',
    options:['spoon','pot','same','cannot tell'], answer:'spoon',
    hint:'Less means not as much.',
    explanation:'A <b>spoon</b> holds less water than a pot.' }),

  makeMCQ({ id:'g1mth-msr-065', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Mia\'s cup is half-full. Dev\'s cup is full. Who has MORE water?',
    options:['Dev','Mia','same','cannot tell'], answer:'Dev',
    hint:'Full is more than half-full.',
    explanation:'<b>Dev</b> has more water — his cup is full.' }),

  makeMCQ({ id:'g1mth-msr-066', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'A lake holds ___ water than a puddle.',
    options:['more','less','the same','no'], answer:'more',
    hint:'A lake is much bigger than a puddle.',
    explanation:'A lake holds <b>more</b> water than a puddle.' }),

  makeMCQ({ id:'g1mth-msr-067', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Which holds MORE water: a kettle or a swimming pool?',
    options:['swimming pool','kettle','same','cannot tell'], answer:'swimming pool',
    hint:'A swimming pool is enormous.',
    explanation:'A <b>swimming pool</b> holds far more water than a kettle.' }),

  makeMCQ({ id:'g1mth-msr-068', chapterId:'g1mth-measurement', difficulty:2, subsection:'comparing_capacity',
    question:'Rani has a full glass of juice. She drinks half of it. The glass is now ___.',
    options:['half-full','empty','full','broken'], answer:'half-full',
    hint:'She drank half and left half.',
    explanation:'After drinking half, the glass is <b>half-full</b>.' }),

  makeMCQ({ id:'g1mth-msr-069', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Which holds LESS: an ocean or a bottle?',
    options:['bottle','ocean','same','cannot tell'], answer:'bottle',
    hint:'An ocean is enormous.',
    explanation:'A <b>bottle</b> holds much less water than an ocean.' }),

  makeMCQ({ id:'g1mth-msr-070', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Tom fills his cup with juice. He does not drink any. The cup is ___.',
    options:['full','empty','half-full','broken'], answer:'full',
    hint:'He filled it and did not drink.',
    explanation:'The cup is <b>full</b>.' }),

  makeMCQ({ id:'g1mth-msr-071', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Which holds more water: a small bottle or a large bottle?',
    options:['large bottle','small bottle','same','cannot tell'], answer:'large bottle',
    hint:'Larger containers hold more.',
    explanation:'The <b>large bottle</b> holds more water.' }),

  makeMCQ({ id:'g1mth-msr-072', chapterId:'g1mth-measurement', difficulty:2, subsection:'comparing_capacity',
    question:'Dev pours a full bucket of water into a bathtub. Then Rani adds another full bucket. How many buckets of water are in the bathtub?',
    options:['2','1','3','0'], answer:'2',
    hint:'1 bucket + 1 bucket = ?',
    explanation:'1 + 1 = <b>2</b> buckets of water in the bathtub.' }),

  makeMCQ({ id:'g1mth-msr-073', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'Which word describes a jug with water above the halfway mark but not full?',
    options:['more than half-full','empty','full','half-full'], answer:'more than half-full',
    hint:'Above the middle but not at the top.',
    explanation:'When water is above halfway but not at the top, the jug is <b>more than half-full</b>.' }),

  makeMCQ({ id:'g1mth-msr-074', chapterId:'g1mth-measurement', difficulty:1, subsection:'comparing_capacity',
    question:'A fish tank is bigger than a fish bowl. Which holds more water?',
    options:['fish tank','fish bowl','same','cannot tell'], answer:'fish tank',
    hint:'The bigger container holds more.',
    explanation:'The <b>fish tank</b> holds more water.' }),

  makeMCQ({ id:'g1mth-msr-075', chapterId:'g1mth-measurement', difficulty:2, subsection:'comparing_capacity',
    question:'Mia fills 3 small cups from a large jug. She still has some water left. Can the jug hold at least 4 cups?',
    options:['Yes — there is still water left','No — it only holds 3 cups','No — it is now empty','Cannot tell'], answer:'Yes — there is still water left',
    hint:'She used 3 cups and there is still water remaining.',
    explanation:'<b>Yes</b> — since water is still left after 3 cups, the jug holds more than 3 cups.' })
);

})();
