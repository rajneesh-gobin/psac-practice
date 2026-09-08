'use strict';
// Grade 4 Science - depth for the four chapters whose pools ran out fastest.
//
// WHY THIS FILE EXISTS
// Measured 2026-09-08: g4sci-plants and g4sci-animals each held 31 poolable
// items and supply 4 questions of every 40-question exam, so seven mock exams
// used a chapter up; both enrichment chapters held 19 against 2 a paper. This
// takes all four past ten papers' worth with a margin.
//
// ⚠ **Grade 4 examWeight is NOT derived from a paper, because no Grade 4 paper
//   exists** - past-papers/ holds psac6, psac5, psac5-mes and nce only. The
//   weights here are the pack's original hand-set values. That does not affect
//   this file: pool depth is measured against whatever the weight happens to
//   be, so deepening a pool is safe either way. It does mean the SHAPE of a
//   Grade 4 exam is still unverified, unlike the ten packs weighted from their
//   own papers.
//
// ⚠ Every core chapter in this pack held exactly 31 items and every enrichment
//   chapter exactly 19 - a fixed quota, not a measure of need. Several declared
//   subsections were down to one or two questions (`photosynthesis` 2, `growth`
//   3, `adaptation` 1, `classification` 1), so those are filled first.
//
// ⚠ Options are written ANSWER FIRST in the table purely so the item is easy
//   to read and check: options[0] is always the answer. It does NOT set where
//   the answer appears on screen - makeMCQ() shuffles the options itself
//   (engine/helpers.js), so the A/B/C/D spread comes from that Fisher-Yates
//   shuffle, not from anything here. What DOES matter is keeping all four
//   options the same grammatical shape and length: the real papers average a
//   6.8-character spread, and scripts/test-option-parity.js measures it.

(function () {
  let n = 0;
  const q = (chapterId, subsection, difficulty, question, options, hint, explanation) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g4sc-dep-${String(n).padStart(3, '0')}`,
      chapterId, subsection, difficulty, question,
      options,
      answer: options[0], hint, explanation
    }));
  };

  // ══ g4sci-plants (20) ═══════════════════════════════════════════════════
  // photosynthesis (6)
  q('g4sci-plants', 'photosynthesis', 1, 'Which part of a plant makes its food?',
    ['The leaf', 'The root', 'The stem', 'The fruit'],
    'It is the flat green part.',
    'The <b>leaf</b> makes the plant\'s food using sunlight. This is called photosynthesis.');
  q('g4sci-plants', 'photosynthesis', 1, 'What does a plant need from the sky to make its food?',
    ['Sunlight', 'Moonlight', 'Wind', 'Dust'],
    'It comes from the sun.',
    'A plant needs <b>sunlight</b> to make food in its leaves.');
  q('g4sci-plants', 'photosynthesis', 2, 'Which gas does a plant take in to make its food?',
    ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Water vapour'],
    'It is the gas we breathe out.',
    'A plant takes in <b>carbon dioxide</b> through its leaves and uses it to make food.');
  q('g4sci-plants', 'photosynthesis', 2, 'Which gas does a plant give out when it makes food?',
    ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Smoke'],
    'It is the gas we need to breathe.',
    'A plant gives out <b>oxygen</b> when it makes food, which is why plants are important to us.');
  q('g4sci-plants', 'photosynthesis', 2, 'Why are leaves green?',
    ['They contain a green colouring', 'They are painted green', 'They are full of water', 'They grow in the shade'],
    'Something inside the leaf gives it the colour.',
    'Leaves <b>contain a green colouring</b> called chlorophyll, which traps sunlight so the plant can make food.');
  q('g4sci-plants', 'photosynthesis', 3, 'A plant is left in a dark cupboard for two weeks. What is most likely to happen?',
    ['It turns pale and weak', 'It grows much faster', 'It makes more flowers', 'It becomes darker green'],
    'It cannot make food without light.',
    'Without sunlight the plant cannot make food, so <b>it turns pale and weak</b> and may die.');

  // growth (7)
  q('g4sci-plants', 'growth', 1, 'Which one of these does a plant need to grow well?',
    ['Water', 'Salt', 'Smoke', 'Plastic'],
    'It is poured on the soil.',
    'A plant needs <b>water</b>, along with sunlight, air, warmth and minerals from the soil.');
  q('g4sci-plants', 'growth', 1, 'A plant gets its minerals from the ...',
    ['soil', 'sky', 'wind', 'sun'],
    'The roots take them in.',
    'Minerals are taken from the <b>soil</b> by the roots, together with water.');
  q('g4sci-plants', 'growth', 2, 'A seed begins to grow into a young plant. This is called ...',
    ['germination', 'pollination', 'evaporation', 'condensation'],
    'It is the very first stage of a plant\'s life.',
    '<b>Germination</b> is when a seed starts to grow, sending out a root and then a shoot.');
  q('g4sci-plants', 'growth', 2, 'Which part of a seed appears first during germination?',
    ['The root', 'The flower', 'The fruit', 'The petal'],
    'It grows downwards to find water.',
    '<b>The root</b> appears first and grows downwards, so the young plant can take in water.');
  q('g4sci-plants', 'growth', 2, 'A seed is placed on dry cotton wool. It does not grow. Which condition is missing?',
    ['Water', 'Air', 'Warmth', 'Soil'],
    'Compare it with damp cotton wool.',
    '<b>Water</b> is missing. A seed needs water, air and warmth to germinate, but not soil at first.');
  q('g4sci-plants', 'growth', 3, 'Two plants are watered the same. One is put on a sunny window sill and one in a cupboard. Why does the one on the sill grow better?',
    ['It receives sunlight', 'It receives more water', 'It receives less air', 'It receives colder air'],
    'What does the cupboard plant lack?',
    '<b>It receives sunlight</b>, so it can make food in its leaves. The plant in the cupboard cannot.');
  q('g4sci-plants', 'growth', 3, 'Why does a farmer add manure or compost to the soil?',
    ['To add minerals for the plants', 'To make the soil colder', 'To keep rain off the plants', 'To stop the roots growing'],
    'It feeds the soil.',
    'Manure and compost <b>add minerals</b> to the soil, so the plants grow stronger and healthier.');

  // reproduction (4)
  q('g4sci-plants', 'reproduction', 1, 'Which part of a plant makes seeds?',
    ['The flower', 'The root', 'The stem', 'The leaf'],
    'It is the brightly coloured part.',
    'The <b>flower</b> makes the seeds, which later grow inside the fruit.');
  q('g4sci-plants', 'reproduction', 2, 'Which part of a plant protects the seeds?',
    ['The fruit', 'The root', 'The leaf', 'The stem'],
    'Think about a mango.',
    'The <b>fruit</b> grows around the seeds and protects them until they are ready to grow.');
  q('g4sci-plants', 'reproduction', 2, 'Why are flowers brightly coloured and scented?',
    ['To attract insects', 'To frighten birds', 'To store water', 'To hold the plant up'],
    'Insects carry pollen from flower to flower.',
    'Bright colours and scent <b>attract insects</b>, which carry pollen between flowers.');
  q('g4sci-plants', 'reproduction', 3, 'Some seeds have tiny hairs and are carried away by the wind. Why is this useful?',
    ['They grow away from the parent', 'They grow faster in the air', 'They become much heavier', 'They stop other seeds growing'],
    'Think about crowding around one plant.',
    'Being carried away means <b>they grow away from the parent plant</b>, where there is more light, water and space.');

  // parts (3)
  q('g4sci-plants', 'parts', 1, 'Which part of a plant carries water up from the roots?',
    ['The stem', 'The flower', 'The fruit', 'The seed'],
    'It holds the plant upright too.',
    'The <b>stem</b> carries water and minerals from the roots up to the leaves.');
  q('g4sci-plants', 'parts', 2, 'Apart from taking in water, what else do roots do?',
    ['Hold the plant in the soil', 'Make the plant\'s food', 'Produce the seeds', 'Give out the scent'],
    'Think about a plant in a strong wind.',
    'Roots also <b>hold the plant firmly in the soil</b>, so it is not blown over.');
  q('g4sci-plants', 'parts', 3, 'A gardener cuts through the stem of a plant. Why do the leaves then dry up?',
    ['Water can no longer reach them', 'They receive too much light', 'They make too much food', 'The roots grow too fast'],
    'Follow the path the water takes.',
    'The stem is the path for water, so once it is cut <b>water can no longer reach the leaves</b> and they dry up.');

  // ══ g4sci-animals (20) ══════════════════════════════════════════════════
  // classification (6)
  q('g4sci-animals', 'classification', 1, 'An animal that eats only plants is called a ...',
    ['herbivore', 'carnivore', 'omnivore', 'predator'],
    'Think of a cow or a goat.',
    'A <b>herbivore</b> eats only plants. Cows, goats and deer are herbivores.');
  q('g4sci-animals', 'classification', 1, 'An animal that eats other animals is called a ...',
    ['carnivore', 'herbivore', 'omnivore', 'producer'],
    'Think of a cat or a shark.',
    'A <b>carnivore</b> eats the flesh of other animals.');
  q('g4sci-animals', 'classification', 1, 'An animal that eats both plants and animals is called an ...',
    ['omnivore', 'herbivore', 'carnivore', 'insect'],
    'Think of a pig, or of people.',
    'An <b>omnivore</b> eats both plants and animals.');
  q('g4sci-animals', 'classification', 2, 'A goat eats grass and leaves. A goat is a ...',
    ['herbivore', 'carnivore', 'omnivore', 'producer'],
    'It eats no meat at all.',
    'A goat eats only plants, so it is a <b>herbivore</b>.');
  q('g4sci-animals', 'classification', 2, 'Which body cover does a fish have?',
    ['Scales', 'Feathers', 'Fur', 'Hair'],
    'Think of a tuna at the market.',
    'A fish is covered in <b>scales</b>, which protect it and help it move through the water.');
  q('g4sci-animals', 'classification', 3, 'A bat has fur and feeds its young on milk. A bat is therefore a ...',
    ['mammal', 'bird', 'fish', 'reptile'],
    'Flying does not make an animal a bird.',
    'A bat is a <b>mammal</b>, because it has fur and feeds its young on milk, which birds never do.');

  // endangered (5)
  q('g4sci-animals', 'endangered', 1, 'Which bird of Mauritius is now extinct?',
    ['The dodo', 'The pink pigeon', 'The echo parakeet', 'The kestrel'],
    'It disappeared hundreds of years ago.',
    'The <b>dodo</b> is extinct: none are left alive anywhere in the world.');
  q('g4sci-animals', 'endangered', 1, 'Which of these birds is found only in Mauritius?',
    ['The pink pigeon', 'The house sparrow', 'The common myna', 'The domestic hen'],
    'Its name gives away its colour.',
    'The <b>pink pigeon</b> is endemic to Mauritius, which means it is found naturally nowhere else.');
  q('g4sci-animals', 'endangered', 2, 'What does "extinct" mean?',
    ['None are left alive', 'Only a few are left', 'They live only in trees', 'They are protected by law'],
    'It is stronger than endangered.',
    'Extinct means <b>none are left alive</b> anywhere in the world.');
  q('g4sci-animals', 'endangered', 2, 'The echo parakeet is a green bird found only in Mauritius. It is therefore ...',
    ['endemic', 'extinct', 'imported', 'common'],
    'It is found naturally nowhere else.',
    'An <b>endemic</b> animal is found naturally in one place only.');
  q('g4sci-animals', 'endangered', 3, 'Give one way to protect endangered animals in Mauritius.',
    ['Create a nature reserve', 'Cut down more forest', 'Keep them as pets', 'Bring in more rats'],
    'Protect the place where they live.',
    '<b>Creating a nature reserve</b> protects the animals and the habitat they need to survive.');

  // habitats (5)
  q('g4sci-animals', 'habitats', 1, 'What is a habitat?',
    ['The place where an animal lives', 'The food an animal eats', 'The sound an animal makes', 'The colour of an animal'],
    'It is about where, not what.',
    'A habitat is <b>the place where an animal lives</b> and finds food, water and shelter.');
  q('g4sci-animals', 'habitats', 1, 'Which animal lives in a pond?',
    ['A frog', 'A camel', 'An eagle', 'A monkey'],
    'It needs water to lay its eggs.',
    'A <b>frog</b> lives in and around a pond, where it lays its eggs in the water.');
  q('g4sci-animals', 'habitats', 2, 'Which habitat does a crab live in?',
    ['The seashore', 'The desert', 'The forest floor', 'A tall tree'],
    'Think of the beach.',
    'A crab lives on <b>the seashore</b>, among the rocks and sand near the sea.');
  q('g4sci-animals', 'habitats', 2, 'Give one thing an animal gets from its habitat.',
    ['Shelter', 'A name', 'A colour', 'A number'],
    'What does it need to stay alive?',
    'A habitat gives an animal <b>shelter</b>, as well as food and water.');
  q('g4sci-animals', 'habitats', 3, 'What happens to forest animals when the trees are cut down?',
    ['They lose their home', 'They grow much bigger', 'They learn to swim', 'They stop eating'],
    'Their habitat is destroyed.',
    'They <b>lose their home</b> and their food, so they must move away or they die.');

  // food chains (4)
  q('g4sci-animals', 'food_chains', 1, 'In a food chain, plants are called ...',
    ['producers', 'carnivores', 'predators', 'omnivores'],
    'They produce their own food.',
    'Plants are <b>producers</b> because they make their own food using sunlight.');
  q('g4sci-animals', 'food_chains', 2, 'In the food chain grass → grasshopper → bird, what does the grasshopper eat?',
    ['Grass', 'The bird', 'Another grasshopper', 'Soil'],
    'Follow the arrow backwards.',
    'The arrow means "is eaten by", so the grasshopper eats the <b>grass</b>.');
  q('g4sci-animals', 'food_chains', 2, 'Every food chain begins with a ...',
    ['plant', 'bird', 'fish', 'cat'],
    'Only one kind of living thing makes its own food.',
    'Every food chain begins with a <b>plant</b>, because only plants make their own food.');
  q('g4sci-animals', 'food_chains', 3, 'In the chain grass → grasshopper → bird, what happens to the birds if all the grass dies?',
    ['Their numbers fall', 'Their numbers rise', 'They begin eating grass', 'Nothing changes at all'],
    'Follow the chain upwards.',
    'Without grass the grasshoppers die, so the birds lose their food and <b>their numbers fall</b>.');

  // ══ g4sci-enr-animals (9) ═══════════════════════════════════════════════
  q('g4sci-enr-animals', 'adaptation', 2, 'How is a duck suited to living on water?',
    ['It has webbed feet', 'It has long claws', 'It has thick fur', 'It has large ears'],
    'Look at its feet.',
    'A duck has <b>webbed feet</b>, which work like paddles and push it through the water.');
  q('g4sci-enr-animals', 'adaptation', 2, 'How is a camel suited to living in a desert?',
    ['It can go long without water', 'It swims very quickly', 'It has thick green fur', 'It sleeps under water'],
    'Water is scarce in a desert.',
    'A camel <b>can go a long time without water</b>, which suits a place where there is very little.');
  q('g4sci-enr-animals', 'adaptation', 2, 'How does a fish take in oxygen under water?',
    ['Through its gills', 'Through its scales', 'Through its fins', 'Through its tail'],
    'They are behind the head.',
    'A fish takes in oxygen from the water <b>through its gills</b>.');
  q('g4sci-enr-animals', 'adaptation', 2, 'Why does a bird have hollow bones?',
    ['To make it light for flying', 'To make it heavier in the air', 'To store its food for winter', 'To keep it warm at night'],
    'Think about what flying needs.',
    'Hollow bones <b>make the bird light</b>, so it can fly more easily.');
  q('g4sci-enr-animals', 'adaptation', 3, 'A gecko can climb a smooth wall. Which part of its body helps it?',
    ['Its toes', 'Its tail', 'Its eyes', 'Its tongue'],
    'Look at where it touches the wall.',
    'A gecko\'s <b>toes</b> are covered in tiny hairs that grip even a smooth surface.');
  q('g4sci-enr-animals', 'classification', 1, 'To which group does a tortoise belong?',
    ['Reptiles', 'Mammals', 'Birds', 'Fish'],
    'It has dry scaly skin and lays eggs.',
    'A tortoise is a <b>reptile</b>: it has dry scaly skin and lays eggs with a shell.');
  q('g4sci-enr-animals', 'classification', 1, 'How many legs does an insect have?',
    ['Six', 'Four', 'Eight', 'Ten'],
    'Count the legs on a bee.',
    'An insect has <b>six</b> legs and three body parts.');
  q('g4sci-enr-animals', 'classification', 2, 'Which group of animals has feathers?',
    ['Birds', 'Mammals', 'Reptiles', 'Fish'],
    'Think of a hen.',
    '<b>Birds</b> are the only animals with feathers.');
  q('g4sci-enr-animals', 'food_chains', 2, 'A tenrec eats insects and worms. A tenrec is therefore a ...',
    ['carnivore', 'herbivore', 'producer', 'plant'],
    'It eats other animals.',
    'A tenrec eats small animals, so it is a <b>carnivore</b>.');

  // ══ g4sci-enr-equipment (9) ═════════════════════════════════════════════
  q('g4sci-enr-equipment', 'measuring', 1, 'Which instrument is used to measure the mass of an object?',
    ['A balance', 'A thermometer', 'A ruler', 'A stopwatch'],
    'It compares one side with the other.',
    'A <b>balance</b> measures mass, usually in grams or kilograms.');
  q('g4sci-enr-equipment', 'measuring', 1, 'Which instrument is used to measure length?',
    ['A ruler', 'A balance', 'A beaker', 'A thermometer'],
    'It is marked in centimetres.',
    'A <b>ruler</b> measures length in centimetres and millimetres.');
  q('g4sci-enr-equipment', 'measuring', 1, 'Which instrument is used to measure time?',
    ['A stopwatch', 'A rain gauge', 'A hand lens', 'A balance'],
    'It is started and stopped.',
    'A <b>stopwatch</b> measures how long something takes, in minutes and seconds.');
  q('g4sci-enr-equipment', 'measuring', 2, 'Which instrument is used to measure the volume of a liquid?',
    ['A measuring cylinder', 'A ruler', 'A thermometer', 'A wind vane'],
    'It is a tall tube marked with lines.',
    'A <b>measuring cylinder</b> measures the volume of a liquid, in millilitres.');
  q('g4sci-enr-equipment', 'measuring', 2, 'Which instrument is used to look closely at a small insect?',
    ['A hand lens', 'A rain gauge', 'A stopwatch', 'A balance'],
    'It makes small things look bigger.',
    'A <b>hand lens</b> magnifies, so small details can be seen clearly.');
  q('g4sci-enr-equipment', 'measuring', 2, 'Which instrument shows the direction of the wind?',
    ['A wind vane', 'A rain gauge', 'A thermometer', 'A balance'],
    'It turns to point into the wind.',
    'A <b>wind vane</b> shows which direction the wind is blowing from.');
  q('g4sci-enr-equipment', 'measuring', 2, 'In which unit is temperature measured?',
    ['Degrees Celsius', 'Millilitres', 'Grams', 'Centimetres'],
    'It is written with a small circle.',
    'Temperature is measured in <b>degrees Celsius</b>, written °C.');
  q('g4sci-enr-equipment', 'measuring', 3, 'A pupil wants to find out how much rain fell overnight. Which instrument is needed?',
    ['A rain gauge', 'A thermometer', 'A balance', 'A hand lens'],
    'It is left outside to collect the rain.',
    'A <b>rain gauge</b> collects rainwater and measures its depth in millimetres.');
  q('g4sci-enr-equipment', 'measuring', 3, 'Why must a measuring cylinder be placed on a flat table before reading it?',
    ['So the reading is accurate', 'So the liquid stays warm', 'So the glass does not shine', 'So the liquid changes colour'],
    'Think about a tilted cylinder.',
    'On a flat surface the liquid is level, <b>so the reading is accurate</b>. A tilted cylinder gives the wrong volume.');

})();
