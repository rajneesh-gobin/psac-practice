'use strict';
// Grade 6 Science - depth for the chapters the real papers lean on hardest.
//
// WHY THIS FILE EXISTS
// examWeight is now set from the 2022/2023/2024 papers (see the block above
// `chapters:` in _manifest.js), and that concentrated the draw: g6-animals
// supplies 10 questions of every 40-question exam and g6-materials 9, from
// pools of 39 and 35. A child sitting three mock exams had seen the whole
// chapter. Measured 2026-09-08; these take both pools past ten papers' worth.
//
// ⚠ Options are written ANSWER FIRST in the table purely so the item is easy
//   to read and check: options[0] is always the answer. It does NOT set where
//   the answer appears on screen - makeMCQ() shuffles the options itself
//   (engine/helpers.js), so the A/B/C/D spread comes from that Fisher-Yates
//   shuffle, not from anything here. What DOES matter is keeping all four
//   options the same grammatical shape and length: the real papers average a
//   6.8-character spread, and scripts/test-option-parity.js measures it.
//
// ⚠ `teeth` and `diet` are NEW subsections. The syllabus prose for g6-animals
//   names food groups and human teeth, and the 2023 and 2024 papers spend 9 and
//   6 marks on them, but the subsection map declared neither - so those items
//   had nowhere to live. Both are declared in _manifest.js with 20 questions
//   each, the minimum audit-content-coverage.js accepts.

(function () {
  let n = 0;
  const q = (chapterId, subsection, difficulty, question, options, hint, explanation) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g6sc-dep-${String(n).padStart(3, '0')}`,
      chapterId, subsection, difficulty, question,
      options,
      answer: options[0], hint, explanation
    }));
  };

  // ══ g6-materials ════════════════════════════════════════════════════════
  // natural vs man-made (15)
  q('g6-materials', 'natural_manmade', 1, 'Which material is obtained from an animal?',
    ['Wool', 'Nylon', 'Glass', 'Rubber'],
    'Think about what a sheep gives us.',
    '<b>Wool</b> is sheared from sheep. Nylon and glass are man-made, and rubber comes from a tree.');
  q('g6-materials', 'natural_manmade', 1, 'Which material is obtained from a plant?',
    ['Cotton', 'Silk', 'Steel', 'Plastic'],
    'One of these is picked from a field.',
    '<b>Cotton</b> grows on the cotton plant. Silk comes from the silkworm, and steel and plastic are man-made.');
  q('g6-materials', 'natural_manmade', 1, 'Which one of these is a man-made material?',
    ['Plastic', 'Leather', 'Wood', 'Clay'],
    'Three of these come straight from nature.',
    '<b>Plastic</b> is made in a factory from oil. Leather, wood and clay are all natural materials.');
  q('g6-materials', 'natural_manmade', 2, 'Silk is obtained from the ...',
    ['silkworm', 'cotton plant', 'sheep', 'rubber tree'],
    'It comes from an insect, not a plant.',
    'Silk thread is unwound from the cocoon of the <b>silkworm</b>. It is a natural material of animal origin.');
  q('g6-materials', 'natural_manmade', 2, 'Glass is made from which natural material?',
    ['Sand', 'Clay', 'Wood', 'Lime'],
    'Think of what a beach is covered in.',
    'Glass is made by heating <b>sand</b> (silica) to a very high temperature. It is therefore man-made, from a natural raw material.');
  q('g6-materials', 'natural_manmade', 2, 'Which material comes from the earth?',
    ['Iron', 'Nylon', 'Paper', 'Rubber'],
    'One of these is dug out as an ore.',
    '<b>Iron</b> is mined from the ground as iron ore. Rubber comes from a tree, paper from wood, and nylon is man-made.');
  q('g6-materials', 'natural_manmade', 2, 'Rubber is obtained from the ...',
    ['rubber tree', 'oil well', 'sheep', 'silkworm'],
    'It is collected as a white liquid called latex.',
    'Latex is tapped from the trunk of the <b>rubber tree</b> and then treated to make rubber.');
  q('g6-materials', 'natural_manmade', 2, 'Which of these is NOT a natural material?',
    ['Polythene', 'Cotton', 'Wool', 'Wood'],
    'Look for the one made in a factory.',
    '<b>Polythene</b> is a plastic made from oil. The other three are taken from plants or animals.');
  q('g6-materials', 'natural_manmade', 2, 'Paper is made mainly from ...',
    ['wood', 'sand', 'cotton', 'oil'],
    'Think about what a tree trunk is used for.',
    'Paper is made from <b>wood</b> pulp. That is why recycling paper helps to save trees.');
  q('g6-materials', 'natural_manmade', 3, 'Why is steel described as a man-made material?',
    ['It is produced from iron in a factory', 'It is dug straight from the ground', 'It is taken from a plant', 'It is collected from an animal'],
    'Ask what has to happen before steel exists.',
    'Iron ore is natural, but <b>steel is produced from it in a factory</b> by mixing iron with carbon. A material people have to make is man-made.');
  q('g6-materials', 'natural_manmade', 2, 'Leather is used to make shoes. Where does leather come from?',
    ['The skin of animals', 'The bark of trees', 'Melted plastic', 'Heated sand'],
    'It is a natural material of animal origin.',
    'Leather is made from the treated <b>skin of animals</b> such as cattle and goats.');
  q('g6-materials', 'natural_manmade', 2, 'Which pair contains only man-made materials?',
    ['Plastic and nylon', 'Cotton and silk', 'Wood and clay', 'Wool and leather'],
    'Both members of the pair must be made by people.',
    '<b>Plastic and nylon</b> are both manufactured. Every other pair listed is natural.');
  q('g6-materials', 'natural_manmade', 3, 'Give one reason why plastic has replaced glass for many bottles.',
    ['It does not break easily', 'It is a natural material', 'It rusts in the rain', 'It melts in the sun'],
    'Think about dropping a bottle on the floor.',
    'Plastic is light and <b>does not break easily</b>, so it is safer and cheaper to carry than glass.');
  q('g6-materials', 'natural_manmade', 2, 'Clay is used to make pots and bricks. Clay is ...',
    ['a natural material', 'a man-made material', 'a type of plastic', 'a type of metal'],
    'It is dug out of the ground.',
    'Clay is dug from the earth, so it is <b>a natural material</b>, even though a pot made from it is shaped by people.');
  q('g6-materials', 'natural_manmade', 3, 'A jersey keeps a child warm on a cold morning. The best material for it is ...',
    ['wool', 'nylon', 'glass', 'rubber'],
    'Which material traps air and comes from a sheep?',
    '<b>Wool</b> traps air between its fibres, and trapped air is a poor conductor of heat, so body heat is kept in.');

  // properties and uses (20)
  q('g6-materials', 'properties', 1, 'Which property makes glass suitable for window panes?',
    ['It is transparent', 'It is flexible', 'It is soft', 'It rusts easily'],
    'Think about what you need to do through a window.',
    'Glass is <b>transparent</b>, so light passes through it and we can see outside.');
  q('g6-materials', 'properties', 1, 'Which property makes rubber suitable for a raincoat?',
    ['It is waterproof', 'It is transparent', 'It is hard', 'It conducts heat'],
    'A raincoat must keep one thing out.',
    'Rubber is <b>waterproof</b>, so rain cannot pass through it.');
  q('g6-materials', 'properties', 1, 'Copper is used for electric wires because it is a good ...',
    ['conductor', 'insulator', 'absorber', 'reflector'],
    'Electricity must be able to flow through it.',
    'Copper is a good <b>conductor</b> of electricity, so current flows through it easily.');
  q('g6-materials', 'properties', 1, 'The plastic covering around an electric wire is used because plastic is ...',
    ['an insulator', 'a conductor', 'transparent', 'magnetic'],
    'It is there to keep us safe.',
    'Plastic is <b>an insulator</b>: electricity cannot pass through it, so the wire is safe to touch.');
  q('g6-materials', 'properties', 2, 'Why is a cooking pot usually made of metal?',
    ['Metal conducts heat well', 'Metal is transparent', 'Metal is waterproof', 'Metal is very light'],
    'Heat must travel from the flame to the food.',
    '<b>Metal conducts heat well</b>, so the heat of the flame passes quickly through the pot to the food.');
  q('g6-materials', 'properties', 2, 'Why is the handle of a cooking pot often made of wood or plastic?',
    ['They are poor conductors of heat', 'They are good conductors of heat', 'They are transparent', 'They are waterproof'],
    'You have to hold the handle while the pot is hot.',
    'Wood and plastic are <b>poor conductors of heat</b>, so the handle stays cool enough to hold.');
  q('g6-materials', 'properties', 2, 'Why are cotton clothes comfortable in hot weather?',
    ['Cotton absorbs sweat', 'Cotton is waterproof', 'Cotton is transparent', 'Cotton conducts electricity'],
    'Think about what happens to sweat.',
    '<b>Cotton absorbs sweat</b> and lets air pass through, so the body is kept cool and dry.');
  q('g6-materials', 'properties', 2, 'Which property of aluminium makes it suitable for aeroplanes?',
    ['It is light and strong', 'It is heavy and soft', 'It is transparent', 'It rusts quickly'],
    'An aeroplane must not be too heavy to fly.',
    'Aluminium is <b>light and strong</b>, so the aeroplane is strong enough without being too heavy.');
  q('g6-materials', 'properties', 2, 'Why is gold used to make jewellery?',
    ['It does not lose its shine', 'It is very cheap', 'It is very soft to touch', 'It melts in the sun'],
    'Think about how a ring looks after many years.',
    'Gold <b>does not lose its shine</b> because it does not rust or tarnish, so jewellery stays attractive for years.');
  q('g6-materials', 'properties', 2, 'Which property makes a sponge useful for cleaning?',
    ['It absorbs water', 'It is waterproof', 'It is transparent', 'It is very hard'],
    'What happens when you dip a sponge in water?',
    'A sponge <b>absorbs water</b> into the many small holes in it, so it can soak up spills.');
  q('g6-materials', 'properties', 2, 'Give one disadvantage of using glass for window panes.',
    ['It breaks easily', 'It is not transparent', 'It absorbs water', 'It cannot be cleaned'],
    'Think about what happens if a ball hits it.',
    'Glass is brittle and <b>breaks easily</b>, and the broken pieces are sharp and dangerous.');
  q('g6-materials', 'properties', 2, 'Which material is the best choice for a car tyre?',
    ['Rubber', 'Glass', 'Paper', 'Cotton'],
    'It must grip the road and bend.',
    '<b>Rubber</b> is flexible and grips the road well, and it does not wear away quickly.');
  q('g6-materials', 'properties', 3, 'A cook uses a metal spoon to stir hot soup and burns her hand. Why?',
    ['Metal carries heat to her hand', 'Metal soaks up the hot soup', 'Metal keeps water out well', 'Metal lets light pass through'],
    'Where did the heat travel?',
    '<b>Metal carries heat</b> from the soup along the spoon to her hand. A wooden spoon would have stayed cool.');
  q('g6-materials', 'properties', 3, 'Why is the roof of a house often made of corrugated iron sheets?',
    ['They are strong and keep rain out', 'They are transparent', 'They absorb rainwater', 'They conduct electricity'],
    'A roof has two main jobs.',
    'Iron sheets are <b>strong and keep rain out</b>. They are usually painted, because bare iron would rust.');
  q('g6-materials', 'properties', 3, 'Which gas is needed for burning to take place?',
    ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Water vapour'],
    'It is the same gas we need to breathe.',
    'Burning needs <b>oxygen</b>. When the oxygen around a flame is used up, the flame goes out.');
  q('g6-materials', 'properties', 3, 'A burning candle is covered with a glass jar. Why does the flame go out?',
    ['The oxygen is used up', 'The candle becomes wet', 'The jar absorbs the wax', 'The air becomes colder'],
    'What does a flame need that the jar shuts out?',
    'The jar traps a small amount of air. Once <b>the oxygen is used up</b>, burning stops and the flame goes out.');
  q('g6-materials', 'properties', 3, 'Two candles are covered, one with a large jar and one with a small jar. Which goes out first?',
    ['The one under the small jar', 'The one under the large jar', 'Both at the same moment', 'Neither of them'],
    'Which jar holds less air?',
    '<b>The one under the small jar</b>, because it holds less air and therefore less oxygen, which is used up sooner.');
  q('g6-materials', 'properties', 3, 'Why should water never be poured on an oil fire in a pan?',
    ['The burning oil is splashed around', 'Water adds oxygen to the fire', 'Water makes the oil colder', 'Water turns the oil to gas'],
    'Oil floats on water, and water turns to steam at once.',
    'The water sinks, turns instantly to steam and <b>splashes the burning oil</b> out of the pan, spreading the fire.');
  q('g6-materials', 'properties', 3, 'The best way to put out an oil fire in a pan is to ...',
    ['cover the pan with a lid', 'pour water on it', 'blow hard on it', 'move the pan outside'],
    'Cut off the gas that burning needs.',
    '<b>Covering the pan with a lid</b> stops air reaching the flame, so the oxygen is cut off and the fire goes out.');
  q('g6-materials', 'properties', 2, 'Which one of these materials is flexible?',
    ['Rubber', 'Glass', 'Concrete', 'Brick'],
    'A flexible material can bend without breaking.',
    '<b>Rubber</b> bends easily and returns to its shape. The other three are rigid and snap instead of bending.');

  // rusting (10)
  q('g6-materials', 'rusting', 1, 'Rust forms on which of these metals?',
    ['Iron', 'Gold', 'Aluminium', 'Copper'],
    'It is the metal used for nails and gates.',
    'Rust is formed on <b>iron</b> and on steel, which is made from iron. Gold does not rust at all.');
  q('g6-materials', 'rusting', 1, 'What colour is rust?',
    ['Reddish brown', 'Bright green', 'Shiny silver', 'Deep black'],
    'Think of an old nail left in the rain.',
    'Rust is a <b>reddish brown</b> flaky layer that forms on the surface of iron.');
  q('g6-materials', 'rusting', 2, 'Which two things are needed for iron to rust?',
    ['Air and water', 'Air and light', 'Water and salt', 'Light and heat'],
    'A nail in dry air stays clean; so does one in boiled, sealed water.',
    'Rusting needs both <b>air (oxygen) and water</b>. Remove either one and the iron does not rust.');
  q('g6-materials', 'rusting', 2, 'A pin is placed in dry air inside a sealed tube. After a week it will ...',
    ['stay unchanged', 'be covered in rust', 'melt away', 'turn green'],
    'One of the two things rusting needs is missing.',
    'There is no water, so the pin <b>stays unchanged</b>. Both air and water must be present for rust to form.');
  q('g6-materials', 'rusting', 2, 'A pin standing in water under a layer of oil does not rust. Why not?',
    ['The oil keeps air away', 'The oil dries the water', 'The oil makes the pin hot', 'The oil is a metal'],
    'What does the layer of oil block?',
    '<b>The oil keeps air away</b> from the water, so no oxygen reaches the pin and it cannot rust.');
  q('g6-materials', 'rusting', 2, 'Which one of these is a way of preventing rust?',
    ['Painting the metal', 'Leaving it in the rain', 'Scratching the surface', 'Washing it with water'],
    'Keep air and water off the metal.',
    '<b>Painting</b> puts a layer between the iron and the air and water, so rust cannot form.');
  q('g6-materials', 'rusting', 2, 'Greasing the chain of a bicycle prevents rust because grease ...',
    ['keeps out air and water', 'makes the chain heavier', 'cools the metal down', 'adds oxygen to the metal'],
    'A layer of grease acts as a barrier.',
    'Grease <b>keeps out air and water</b>, the two things rust needs, and it also helps the chain move smoothly.');
  q('g6-materials', 'rusting', 3, 'Galvanising protects iron by covering it with a layer of ...',
    ['zinc', 'gold', 'wood', 'paper'],
    'It is the shiny coating on a new corrugated sheet.',
    'Galvanising coats iron with <b>zinc</b>, which keeps air and water off the iron underneath.');
  q('g6-materials', 'rusting', 3, 'Why do iron gates near the sea rust faster than those inland?',
    ['Salt in the air speeds up rusting', 'The sea air has no oxygen', 'Sea air is much drier', 'The gates are painted more often'],
    'Think about what the wind carries from the sea.',
    'Sea spray puts <b>salt in the air</b>, and salty water makes iron rust much more quickly.');
  q('g6-materials', 'rusting', 3, 'Give one reason why rusting is a problem for a farmer.',
    ['Rusted tools become weak', 'Rusted tools become heavier', 'Rusted tools shine more', 'Rusted tools bend less'],
    'What happens to metal as rust eats into it?',
    'Rust eats into the metal, so <b>rusted tools become weak</b> and break, and they have to be replaced.');

  // waste and caring for the Earth (10)
  q('g6-materials', 'waste', 1, 'Which one of these materials is biodegradable?',
    ['Food waste', 'Plastic bottle', 'Glass jar', 'Metal can'],
    'Which one rots away by itself?',
    '<b>Food waste</b> is broken down by tiny living things in the soil. The other three last for many years.');
  q('g6-materials', 'waste', 1, 'Which type of waste can be turned into compost?',
    ['Garden cuttings', 'Used batteries', 'Plastic bags', 'Broken glass'],
    'Compost is made from things that once lived.',
    '<b>Garden cuttings</b> rot down into compost, which feeds the soil. The others must not go in a compost heap.');
  q('g6-materials', 'waste', 2, 'What does the word "recycle" mean?',
    ['To make waste into new things', 'To burn waste in the open', 'To bury waste in the ground', 'To throw waste into rivers'],
    'Nothing is thrown away; it is used again.',
    'To recycle is <b>to make waste into new things</b>, such as turning old paper into new paper bags.');
  q('g6-materials', 'waste', 2, 'Old newspapers are best dealt with by ...',
    ['recycling them', 'burning them', 'burying them', 'dumping them in a river'],
    'Paper can be made into paper again.',
    '<b>Recycling</b> old newspapers saves trees and reduces the rubbish sent to the landfill.');
  q('g6-materials', 'waste', 2, 'Why have some plastic bags been banned in Mauritius?',
    ['They do not rot away', 'They are too expensive', 'They tear too easily', 'They are made of paper'],
    'Think about how long they last in the soil or the sea.',
    'Plastic bags <b>do not rot away</b>. They block drains, pollute the sea and are swallowed by animals.');
  q('g6-materials', 'waste', 2, 'Used cells and batteries should NOT be thrown in an ordinary bin because they ...',
    ['contain harmful chemicals', 'are made of paper', 'rot away too quickly', 'can be eaten by animals'],
    'Something inside them can poison the soil.',
    'Batteries <b>contain harmful chemicals</b> that leak into the soil and water, so they must be collected separately.');
  q('g6-materials', 'waste', 3, 'Give one way in which dumping household waste is harmful.',
    ['It pollutes soil and water', 'It cools the air down', 'It helps plants to grow', 'It makes the soil richer'],
    'Think about what rain carries out of a rubbish heap.',
    'Rain washes harmful liquids out of the heap, so dumping <b>pollutes soil and water</b> and attracts rats and flies.');
  q('g6-materials', 'waste', 3, 'Sorting waste before collection is useful mainly because ...',
    ['each type can be recycled', 'it makes the bins lighter', 'it stops rain falling', 'it keeps the waste dry'],
    'Different materials go to different places.',
    'Sorting means <b>each type can be recycled</b> in the right way, instead of everything going to the landfill together.');
  q('g6-materials', 'waste', 3, 'Which of these best follows the idea of "reduce"?',
    ['Taking a cloth bag to the shop', 'Burning plastic in the yard', 'Burying tins in the garden', 'Washing bottles in a river'],
    'Reduce means creating less waste in the first place.',
    '<b>Taking a cloth bag</b> means no new plastic bag is used at all, so no waste is created.');
  q('g6-materials', 'waste', 3, 'Why should waste not be burned in the open?',
    ['It releases harmful gases', 'It makes the soil richer', 'It uses up rainwater', 'It cools the air down'],
    'Think about the smoke.',
    'Burning waste <b>releases harmful gases</b> and smoke that pollute the air and can make people ill.');

  // ══ g6-animals ══════════════════════════════════════════════════════════
  // teeth (20)
  q('g6-animals', 'teeth', 1, 'How many milk teeth does a young child have?',
    ['20', '22', '32', '40'],
    'A child has fewer teeth than an adult.',
    'A child has <b>20</b> milk teeth. These fall out and are replaced by 32 permanent teeth.');
  q('g6-animals', 'teeth', 1, 'How many permanent teeth does an adult have?',
    ['32', '20', '24', '28'],
    'An adult has more teeth than a child.',
    'An adult has <b>32</b> permanent teeth, including the four wisdom teeth at the back.');
  q('g6-animals', 'teeth', 1, 'Which teeth are used for biting and cutting food?',
    ['Incisors', 'Canines', 'Premolars', 'Molars'],
    'They are the flat, sharp teeth at the front.',
    '<b>Incisors</b> are the chisel-shaped front teeth. They cut into food, such as biting an apple.');
  q('g6-animals', 'teeth', 1, 'Which teeth are used for tearing food?',
    ['Canines', 'Incisors', 'Premolars', 'Molars'],
    'They are the pointed teeth beside the front ones.',
    '<b>Canines</b> are long and pointed, and are used for tearing food such as meat.');
  q('g6-animals', 'teeth', 1, 'Which teeth are used for crushing and grinding food?',
    ['Molars', 'Incisors', 'Canines', 'Wisdom teeth'],
    'They are the broad teeth at the back.',
    '<b>Molars</b> have wide, bumpy surfaces that crush and grind food into a paste before it is swallowed.');
  q('g6-animals', 'teeth', 2, 'Describe the shape of a molar.',
    ['Broad with a bumpy surface', 'Long and pointed', 'Thin and chisel-shaped', 'Round and completely smooth'],
    'Its shape suits crushing, not cutting.',
    'A molar is <b>broad with a bumpy surface</b>, which gives it a large area for grinding food.');
  q('g6-animals', 'teeth', 2, 'Describe the shape of an incisor.',
    ['Thin and chisel-shaped', 'Long and pointed', 'Broad and bumpy', 'Round and hollow'],
    'It works like a small blade.',
    'An incisor is <b>thin and chisel-shaped</b>, with a straight sharp edge for cutting into food.');
  q('g6-animals', 'teeth', 2, 'A cow crushes grass before swallowing it. Which teeth does it use?',
    ['Molars', 'Canines', 'Incisors', 'Wisdom teeth'],
    'Crushing is the clue.',
    'The cow uses its <b>molars</b>, which are broad and ridged and grind the tough grass down.');
  q('g6-animals', 'teeth', 2, 'A dog has long, pointed canines. This tells us that the dog ...',
    ['tears flesh', 'grinds grass', 'sucks nectar', 'filters water'],
    'Match the tooth to the food.',
    'Long canines are for gripping and <b>tearing flesh</b>, which is what a meat-eating animal needs.');
  q('g6-animals', 'teeth', 2, 'Which layer covers and protects the outside of a tooth?',
    ['Enamel', 'Gum', 'Root', 'Nerve'],
    'It is the hardest part of the body.',
    '<b>Enamel</b> is the hard white layer covering the crown of the tooth. It protects the softer parts inside.');
  q('g6-animals', 'teeth', 2, 'Which part of a tooth holds it firmly in the jaw?',
    ['The root', 'The crown', 'The enamel', 'The gum'],
    'It is the part below the gum.',
    '<b>The root</b> is fixed into the jawbone and holds the tooth in place.');
  q('g6-animals', 'teeth', 2, 'What causes tooth decay?',
    ['Sugar left on the teeth', 'Drinking plain water', 'Eating raw carrots', 'Brushing after meals'],
    'Think about what sweets leave behind.',
    'Germs feed on <b>sugar left on the teeth</b> and produce an acid that eats through the enamel.');
  q('g6-animals', 'teeth', 2, 'How often should teeth be brushed?',
    ['Twice a day', 'Once a week', 'Once a month', 'Only when they hurt'],
    'Morning and night.',
    'Teeth should be brushed <b>twice a day</b>, so that food and sugar are not left on them overnight.');
  q('g6-animals', 'teeth', 2, 'Give one way of keeping teeth healthy.',
    ['Eating fewer sweets', 'Chewing on hard stones', 'Opening bottles with them', 'Brushing once a month'],
    'Cut down what feeds the germs.',
    '<b>Eating fewer sweets</b> means less sugar on the teeth, so fewer germs and less decay.');
  q('g6-animals', 'teeth', 3, 'A herbivore such as a goat has no canines in its upper jaw. Why not?',
    ['It does not tear flesh', 'It does not chew at all', 'It swallows food whole', 'It has no lower teeth'],
    'Canines have one job. Does a goat need it?',
    'A goat eats plants, so <b>it does not tear flesh</b> and has no use for canines. It has sharp incisors and broad molars instead.');
  q('g6-animals', 'teeth', 3, 'Why does a carnivore need strong, pointed canines?',
    ['To grip and tear its prey', 'To grind tough grass', 'To dig up roots', 'To filter water'],
    'Think of the food a carnivore eats.',
    'A carnivore must hold a struggling animal and pull the flesh apart, so it needs canines <b>to grip and tear its prey</b>.');
  q('g6-animals', 'teeth', 3, 'Milk teeth are replaced by permanent teeth. Why does this happen?',
    ['The jaw grows bigger', 'The milk teeth are too hard', 'Permanent teeth are softer', 'Milk teeth never decay'],
    'Think about the size of a child and an adult.',
    'As <b>the jaw grows bigger</b>, larger and more numerous permanent teeth are needed to fill it.');
  q('g6-animals', 'teeth', 3, 'A dentist finds a hole in a child\'s molar. The most likely cause is ...',
    ['decay from sugary food', 'brushing after every meal', 'drinking plenty of water', 'eating fresh vegetables'],
    'Which habit feeds the germs in the mouth?',
    'A hole, or cavity, is caused by <b>decay from sugary food</b> left on the tooth, which produces acid that dissolves the enamel.');
  q('g6-animals', 'teeth', 3, 'Which set of teeth does a child of four years old have?',
    ['Milk teeth only', 'Permanent teeth only', 'No teeth at all', 'Wisdom teeth only'],
    'Permanent teeth start to appear at about six.',
    'A four-year-old still has <b>milk teeth only</b>. The first permanent teeth usually appear at about six years of age.');
  q('g6-animals', 'teeth', 3, 'Premolars and molars do a similar job. What is that job?',
    ['Crushing and grinding', 'Cutting and biting', 'Tearing and gripping', 'Sucking and filtering'],
    'Both sit at the back of the mouth.',
    'Both premolars and molars are broad-topped teeth used for <b>crushing and grinding</b> food before swallowing.');

  // diet and food groups (20)
  q('g6-animals', 'diet', 1, 'An animal that eats only plants is called ...',
    ['herbivorous', 'carnivorous', 'omnivorous', 'granivorous'],
    'Think of a cow or a goat.',
    'A <b>herbivorous</b> animal eats only plants. A cow, a goat and a deer are all herbivores.');
  q('g6-animals', 'diet', 1, 'An animal that eats the flesh of other animals is called ...',
    ['carnivorous', 'herbivorous', 'omnivorous', 'granivorous'],
    'Think of a tiger or a lion.',
    'A <b>carnivorous</b> animal eats flesh. Tigers, lions and sharks are carnivores.');
  q('g6-animals', 'diet', 1, 'An animal that eats both plants and flesh is called ...',
    ['omnivorous', 'herbivorous', 'carnivorous', 'granivorous'],
    'Think of a pig, or of people.',
    'An <b>omnivorous</b> animal eats both plants and flesh. Pigs, rats and human beings are omnivores.');
  q('g6-animals', 'diet', 1, 'Which food group gives us energy?',
    ['Carbohydrates', 'Proteins', 'Vitamins', 'Minerals'],
    'Think of rice, bread and pasta.',
    '<b>Carbohydrates</b> such as rice, bread and potatoes are the body\'s main source of energy.');
  q('g6-animals', 'diet', 1, 'Which food group helps the body to grow?',
    ['Proteins', 'Carbohydrates', 'Fats', 'Water'],
    'Think of fish, eggs and lentils.',
    '<b>Proteins</b> build and repair the body. Fish, meat, eggs, lentils and beans are rich in protein.');
  q('g6-animals', 'diet', 2, 'Which of these foods is richest in protein?',
    ['Fish', 'Rice', 'Butter', 'Sugar'],
    'Which one helps the body grow?',
    '<b>Fish</b> is a protein food. Rice and sugar are carbohydrates, and butter is a fat.');
  q('g6-animals', 'diet', 2, 'Which of these foods is a carbohydrate?',
    ['Bread', 'Cheese', 'Chicken', 'Oil'],
    'Which one is a starchy food?',
    '<b>Bread</b> is a carbohydrate and gives the body energy. Cheese and chicken give protein, and oil is a fat.');
  q('g6-animals', 'diet', 2, 'Which food group protects us from disease?',
    ['Vitamins and minerals', 'Carbohydrates', 'Fats', 'Starches'],
    'Think of fruit and vegetables.',
    '<b>Vitamins and minerals</b>, found in fruit and vegetables, keep the body healthy and help it fight disease.');
  q('g6-animals', 'diet', 2, 'Lentils and red beans belong to which food group?',
    ['Proteins', 'Fats', 'Vitamins', 'Water'],
    'They help the body to grow.',
    'Lentils and beans are rich in <b>protein</b>, which is why they are important in a meal with little meat.');
  q('g6-animals', 'diet', 2, 'What is a balanced diet?',
    ['A meal from all the food groups', 'A meal of only vegetables', 'A meal eaten at the same time daily', 'A meal with no water at all'],
    'It must contain a little of everything.',
    'A balanced diet is <b>a meal from all the food groups</b> in the right amounts, so the body gets everything it needs.');
  q('g6-animals', 'diet', 2, 'Which meal is a balanced meal?',
    ['Rice, fish and lettuce', 'Rice, bread and pasta', 'Cake, sweets and biscuits', 'Bread, butter and oil'],
    'Look for energy, growth and protection in one meal.',
    '<b>Rice, fish and lettuce</b> gives carbohydrate, protein and vitamins together. The others come from one group only.');
  q('g6-animals', 'diet', 2, 'A meal of cereals and milk needs one more item to be balanced. Which is best?',
    ['An apple', 'A slice of bread', 'A bowl of rice', 'A spoon of sugar'],
    'What is still missing from the meal?',
    'Cereals give carbohydrate and milk gives protein, so <b>an apple</b> adds the vitamins that are missing.');
  q('g6-animals', 'diet', 2, 'Why is water important in our diet?',
    ['It carries food around the body', 'It gives us most of our energy', 'It builds strong muscles', 'It protects us from the cold'],
    'Think of what blood is mostly made of.',
    'Water <b>carries food and waste around the body</b> and keeps every part of it working. We must drink it every day.');
  q('g6-animals', 'diet', 3, 'A child eats only rice and bread every day. Which problem is most likely?',
    ['Poor growth', 'Very fast growth', 'Better eyesight', 'Stronger bones'],
    'Which food group is missing?',
    'Rice and bread give energy but almost no protein, so the child would suffer <b>poor growth</b>.');
  q('g6-animals', 'diet', 3, 'Why do fruits and vegetables need to be eaten every day?',
    ['They supply vitamins and fibre', 'They supply most of our energy', 'They build muscle quickly', 'They keep the body warm'],
    'Think about protection rather than energy.',
    'Fruits and vegetables <b>supply vitamins and fibre</b>, which protect the body from disease and help digestion.');
  q('g6-animals', 'diet', 3, 'Which food group should be eaten in the smallest amount?',
    ['Fats', 'Carbohydrates', 'Proteins', 'Vitamins'],
    'Too much of it makes a person overweight.',
    '<b>Fats</b> give a lot of energy in a small amount, so eating too much of them causes weight gain and illness.');
  q('g6-animals', 'diet', 3, 'A tiger eats the flesh of other animals. What type of animal is a tiger?',
    ['Carnivorous', 'Herbivorous', 'Omnivorous', 'Granivorous'],
    'It eats no plants at all.',
    'A tiger is <b>carnivorous</b>: it feeds only on the flesh of other animals.');
  q('g6-animals', 'diet', 3, 'A bird that feeds mainly on seeds is described as ...',
    ['granivorous', 'carnivorous', 'herbivorous', 'omnivorous'],
    'The word comes from "grain".',
    'A <b>granivorous</b> animal eats grains and seeds. Many small birds feed this way.');
  q('g6-animals', 'diet', 3, 'Give one reason why a growing child needs more protein than an old person.',
    ['The child is still building its body', 'The child needs less energy', 'The child cannot digest fat', 'The child drinks less water'],
    'What is protein used for?',
    'Protein builds new body tissue, and <b>a child is still building its body</b>, so it needs a larger share.');
  q('g6-animals', 'diet', 3, 'Which pair gives energy to the body?',
    ['Carbohydrates and fats', 'Proteins and vitamins', 'Vitamins and minerals', 'Water and minerals'],
    'Two groups are energy foods.',
    '<b>Carbohydrates and fats</b> are the energy foods. Proteins build the body, and vitamins and minerals protect it.');

  // classification (8)
  q('g6-animals', 'classification', 1, 'Which one of these animals is a reptile?',
    ['Crocodile', 'Butterfly', 'Dolphin', 'Sparrow'],
    'Reptiles have dry scaly skin.',
    'A <b>crocodile</b> is a reptile. A dolphin is a mammal, a sparrow a bird and a butterfly an insect.');
  q('g6-animals', 'classification', 1, 'What is the body cover of a bird?',
    ['Feathers', 'Scales', 'Fur', 'Moist skin'],
    'Think of a pigeon or a hen.',
    'Birds are covered in <b>feathers</b>, which keep them warm and help them to fly.');
  q('g6-animals', 'classification', 1, 'What is the body cover of a fish?',
    ['Scales', 'Feathers', 'Fur', 'Dry skin'],
    'Think of a shark or a tuna.',
    'Fish are covered in <b>scales</b>, which protect the body and help it slip through water.');
  q('g6-animals', 'classification', 2, 'Apart from its body cover, give one characteristic of a mammal.',
    ['It feeds its young on milk', 'It lays eggs in a nest', 'It breathes through gills', 'It has dry scaly skin'],
    'Think about how a baby mammal is fed.',
    'A mammal <b>feeds its young on milk</b>. Mammals also have hair or fur and give birth to live young.');
  q('g6-animals', 'classification', 2, 'A bat has fur and feeds its young on milk. A bat is therefore a ...',
    ['mammal', 'bird', 'reptile', 'insect'],
    'Flying does not make an animal a bird.',
    'A bat is a <b>mammal</b>. It flies, but it has fur and feeds its young on milk, which birds never do.');
  q('g6-animals', 'classification', 2, 'A dolphin lives in the sea but is not a fish. To which group does it belong?',
    ['Mammals', 'Birds', 'Reptiles', 'Amphibians'],
    'It comes to the surface to breathe air.',
    'A dolphin is a <b>mammal</b>: it breathes air through lungs and feeds its young on milk.');
  q('g6-animals', 'classification', 2, 'To which group of animals does a bee belong?',
    ['Insects', 'Birds', 'Reptiles', 'Mammals'],
    'Count its legs and body parts.',
    'A bee is an <b>insect</b>. Insects have six legs, three body parts and a pair of feelers.');
  q('g6-animals', 'classification', 3, 'Give one similarity between a hen and a bat.',
    ['Both can fly', 'Both lay eggs', 'Both have feathers', 'Both feed young on milk'],
    'Look for what they really share, not what looks alike.',
    '<b>Both can fly.</b> The hen lays eggs and has feathers; the bat has fur and feeds its young on milk.');

  // habitats (5)
  q('g6-animals', 'habitats', 1, 'What is a habitat?',
    ['The place where an animal lives', 'The food an animal eats', 'The sound an animal makes', 'The group an animal belongs to'],
    'It is about where, not what.',
    'A habitat is <b>the place where an animal lives</b> and finds its food, water and shelter.');
  q('g6-animals', 'habitats', 2, 'What is an aquatic animal?',
    ['An animal that lives in water', 'An animal that lives in trees', 'An animal that eats only plants', 'An animal that flies at night'],
    'The word is related to "aqua".',
    'An <b>aquatic animal lives in water</b>. Fish, octopuses and dolphins are all aquatic.');
  q('g6-animals', 'habitats', 2, 'Which animal is best suited to living in a desert?',
    ['Camel', 'Frog', 'Octopus', 'Dolphin'],
    'It must survive with very little water.',
    'The <b>camel</b> can go for long periods without drinking, which suits the dry desert habitat.');
  q('g6-animals', 'habitats', 2, 'Give one way in which a habitat is important to an animal.',
    ['It provides food and shelter', 'It gives the animal a name', 'It changes the animal group', 'It stops the animal growing'],
    'What does an animal get from where it lives?',
    'A habitat <b>provides food and shelter</b>, and a safe place to raise young.');
  q('g6-animals', 'habitats', 3, 'Trees are cut down in a forest. What happens to the animals living there?',
    ['They lose their shelter and food', 'They grow larger and stronger', 'They change into another group', 'They stop needing water'],
    'Their habitat has been destroyed.',
    'They <b>lose their shelter and food</b>, so they must move away or they die. This is why deforestation threatens wildlife.');

  // endangered (5)
  q('g6-animals', 'endangered', 1, 'Which bird is endemic to Mauritius?',
    ['Pink pigeon', 'House sparrow', 'Common myna', 'Domestic hen'],
    'Endemic means found naturally nowhere else.',
    'The <b>pink pigeon</b> is found naturally only in Mauritius. It was saved from extinction by a breeding programme.');
  q('g6-animals', 'endangered', 2, 'What does "endangered" mean?',
    ['Very few are left alive', 'None are left alive', 'They live only in zoos', 'They are found everywhere'],
    'It is not the same as extinct.',
    'An endangered animal is one of which <b>very few are left alive</b>, so it is at risk of dying out completely.');
  q('g6-animals', 'endangered', 2, 'The dodo of Mauritius is described as extinct. This means that ...',
    ['none are left alive', 'only a few are left', 'they live in Rodrigues', 'they are protected by law'],
    'Extinct is stronger than endangered.',
    'Extinct means <b>none are left alive</b> anywhere in the world. The last dodo died over three hundred years ago.');
  q('g6-animals', 'endangered', 3, 'Give one reason why many endemic animals of Mauritius became rare.',
    ['Their forest habitat was cleared', 'They stopped eating plants', 'They grew too large to fly', 'They moved to Rodrigues'],
    'Think about what people did to the land.',
    'Most of the island\'s forest was cleared for sugar cane, so <b>their habitat was destroyed</b> and animals brought by ships ate their eggs.');
  q('g6-animals', 'endangered', 3, 'Which measure best protects an endangered bird?',
    ['Creating a nature reserve', 'Selling it as a pet', 'Clearing its forest', 'Introducing more rats'],
    'Protect the place where it lives.',
    '<b>Creating a nature reserve</b> protects the habitat and keeps out the animals and people that threaten the bird.');

  // life cycle (3)
  q('g6-animals', 'life_cycle', 1, 'Which animal group lays eggs with a hard shell?',
    ['Birds', 'Mammals', 'Fish', 'Insects'],
    'Think of a hen in a nest.',
    '<b>Birds</b> lay eggs with a hard shell, which the parent sits on until the young hatch.');
  q('g6-animals', 'life_cycle', 2, 'Most mammals differ from birds because mammals ...',
    ['give birth to live young', 'lay eggs in a nest', 'breathe through gills', 'have feathers on the body'],
    'Think about how a kitten is born.',
    'Most mammals <b>give birth to live young</b> and then feed them on milk, instead of laying eggs.');
  q('g6-animals', 'life_cycle', 3, 'A butterfly changes completely in shape as it grows. This change is called ...',
    ['metamorphosis', 'germination', 'pollination', 'evaporation'],
    'Egg, caterpillar, pupa, butterfly.',
    'The change from egg to caterpillar to pupa to adult is called <b>metamorphosis</b>.');

  // ══ g6-air (12) ═════════════════════════════════════════════════════════
  q('g6-air', 'composition', 1, 'Which gas makes up most of the air?',
    ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Water vapour'],
    'It is about four fifths of dry air.',
    '<b>Nitrogen</b> makes up about 78% of dry air. Oxygen is about 21%.');
  q('g6-air', 'composition', 1, 'What percentage of dry air is oxygen?',
    ['21%', '78%', '0.03%', '0.87%'],
    'It is roughly one fifth.',
    'Oxygen makes up about <b>21%</b> of dry air, and it is the gas we need for breathing and burning.');
  q('g6-air', 'composition', 2, 'What percentage of dry air is carbon dioxide?',
    ['0.03%', '0.87%', '21.0%', '78.1%'],
    'It is a very small share indeed.',
    'Carbon dioxide is only about <b>0.03%</b> of dry air, yet plants depend on it to make their food.');
  q('g6-air', 'composition', 2, 'Which gas is present in air but NOT in dry air?',
    ['Water vapour', 'Nitrogen', 'Oxygen', 'Carbon dioxide'],
    'The word "dry" is the clue.',
    'Dry air has had its <b>water vapour</b> removed. Ordinary air always contains some water vapour.');
  q('g6-air', 'properties', 2, 'Which gas is used to put out fires in an extinguisher?',
    ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Water vapour'],
    'It smothers the flame instead of feeding it.',
    '<b>Carbon dioxide</b> is heavier than air and settles over the fire, cutting off the oxygen so the flame dies.');
  q('g6-air', 'properties', 2, 'Air takes up space and has weight. This shows that air is ...',
    ['matter', 'a liquid', 'a solid', 'a vacuum'],
    'Anything with mass and volume is this.',
    'Anything that takes up space and has weight is <b>matter</b>, so air is matter even though we cannot see it.');
  q('g6-air', 'properties', 3, 'A candle is lit and covered by a jar. Which gas is used up?',
    ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Water vapour'],
    'Burning uses one gas from the trapped air.',
    'Burning uses up the <b>oxygen</b> in the trapped air. When it runs out, the flame goes out.');
  q('g6-air', 'wind_pressure', 2, 'A suction cup sticks to a window pane because the air pressure inside it is ...',
    ['less than outside', 'the same as outside', 'greater than outside', 'zero everywhere'],
    'Pressing it out squeezes the air out.',
    'Pressing the cup pushes air out, so the pressure inside is <b>less than outside</b> and the outside air holds it on.');
  q('g6-air', 'wind_pressure', 2, 'Give one everyday use of air pressure.',
    ['Pumping up a bicycle tyre', 'Boiling water in a pan', 'Melting ice in a glass', 'Growing plants in soil'],
    'Where do we deliberately squeeze air in?',
    '<b>Pumping up a bicycle tyre</b> uses air pressure: the compressed air inside pushes out and supports the weight of the rider.');
  q('g6-air', 'pollution', 2, 'Which is a source of air pollution in a town?',
    ['Vehicle exhaust fumes', 'Rainwater in a drain', 'Leaves on a tree', 'Sand on a beach'],
    'Think about traffic.',
    '<b>Vehicle exhaust fumes</b> release smoke and harmful gases into the air, especially where traffic is heavy.');
  q('g6-air', 'pollution', 3, 'Give one way to reduce air pollution from traffic.',
    ['Use buses instead of cars', 'Drive with the windows shut', 'Wash cars more often', 'Park cars in the shade'],
    'Fewer engines running means less smoke.',
    '<b>Using buses instead of cars</b> means fewer engines are running, so less smoke and gas is released.');
  q('g6-air', 'breathing', 3, 'Which gas do all living things take in during respiration?',
    ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Water vapour'],
    'It is the opposite of what plants take in for photosynthesis.',
    'In respiration all living things take in <b>oxygen</b> and release carbon dioxide, day and night.');

  // ══ g6-energy (5) ═══════════════════════════════════════════════════════
  q('g6-energy', 'renewable', 1, 'Which one of these is a renewable source of energy?',
    ['Wind', 'Coal', 'Heavy oil', 'Natural gas'],
    'Which one never runs out?',
    '<b>Wind</b> is renewable: it will keep blowing however much we use. Coal, oil and gas are fossil fuels and will run out.');
  q('g6-energy', 'renewable', 2, 'Which one of these is a non-renewable source of energy?',
    ['Heavy oil', 'Bagasse', 'Falling water', 'Sunlight'],
    'Which one cannot be replaced once burnt?',
    '<b>Heavy oil</b> is a fossil fuel. Once burnt it is gone, while the others are replaced naturally.');
  q('g6-energy', 'sources', 2, 'What fuel is burnt in a thermal power station in Mauritius?',
    ['Heavy oil', 'Falling water', 'Sunlight', 'Wind'],
    'A thermal station makes heat by burning something.',
    'A thermal power station burns <b>heavy oil</b> or coal to boil water, and the steam turns the turbine.');
  q('g6-energy', 'sources', 3, 'Give one advantage of a hydro power station over a thermal one.',
    ['It does not pollute the air', 'It burns less coal each day', 'It needs no water at all', 'It works only at night'],
    'Think about what comes out of the chimney.',
    'A hydro station uses falling water and burns nothing, so <b>it does not pollute the air</b>.');
  q('g6-energy', 'saving', 2, 'Which action saves the most electricity at home?',
    ['Switching off unused lights', 'Opening the windows wide', 'Painting the walls white', 'Closing the curtains at noon'],
    'Stop using what you do not need.',
    '<b>Switching off unused lights</b> stops electricity being wasted in rooms where nobody is present.');

})();
