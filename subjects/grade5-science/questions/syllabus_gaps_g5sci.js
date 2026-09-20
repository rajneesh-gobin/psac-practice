'use strict';
// Grade 5 Science - the six Grade 5 outcomes the pack was not asking.
//
// ⚠ WHY THIS FILE EXISTS. scripts/fact-ledgers/grade5-science.json is built from
//   the Grade 5 table of the MIE Science TLS (printed pages 13-14). Against 514
//   questions it reported six:
//     pla-01  flowering and non-flowering plants - a NAMED subtopic, and neither
//             "flowering" nor "non-flowering" appeared anywhere in the pack
//     pla-08  the conditions a plant needs to GROW WELL (the pack asked only
//             what a seed needs to germinate, which is a different outcome)
//     pla-14  the effects of soil erosion on living things and the environment
//     pla-15  classifying plants by looking at their different parts
//     wat-06  that the three states of water are INTERCHANGEABLE
//     wat-09  that the water cycle keeps the amount of water on Earth the same
//
// ⚠ No new subsections: parts, growth, states, water_cycle and deforestation are
//   all already declared in _manifest.js.
//
// IDs: g5sci-syl-001 onwards.

STATIC_QUESTIONS.push(

  // ── Flowering and non-flowering plants ─────────────────────────────────
  makeMCQ({ id:'g5sci-syl-001', chapterId:'plants', subsection:'parts', difficulty:1,
    question:'Plants are put into two big groups. What are they?',
    options:['Flowering and non-flowering plants','Tall plants and short plants','Green plants and brown plants','Wild plants and garden plants'], answer:'Flowering and non-flowering plants',
    hint:'The grouping depends on whether the plant produces flowers.',
    explanation:'Plants are grouped into <b>flowering</b> and <b>non-flowering</b> plants, according to whether they produce flowers and seeds.' }),

  makeMCQ({ id:'g5sci-syl-002', chapterId:'plants', subsection:'parts', difficulty:2,
    question:'Which of these is a <b>non-flowering</b> plant?',
    options:['A fern','A hibiscus','A rose','A mango tree'], answer:'A fern',
    hint:'Three of these produce flowers you can see.',
    explanation:'A <b>fern</b> never produces flowers; it reproduces by spores. Hibiscus, rose and mango are all flowering plants.' }),

  makeMCQ({ id:'g5sci-syl-003', chapterId:'plants', subsection:'parts', difficulty:2,
    question:'How can you tell that a hibiscus is a <b>flowering</b> plant?',
    options:['It produces flowers and seeds','It has green leaves','It grows in a garden','It needs water to live'], answer:'It produces flowers and seeds',
    hint:'Green leaves and water are true of nearly every plant.',
    explanation:'A <b>flowering plant produces flowers</b>, and the flowers make the seeds. Leaves and water are common to almost all plants, so they cannot tell the groups apart.' }),

  makeMCQ({ id:'g5sci-syl-004', chapterId:'plants', subsection:'parts', difficulty:3,
    question:'Mosses and ferns are grouped together. Why?',
    options:['Neither of them produces flowers','Both of them grow very tall','Both of them live in water','Neither of them has leaves'], answer:'Neither of them produces flowers',
    hint:'Think about what is missing from both of them.',
    explanation:'Mosses and ferns are both <b>non-flowering</b> plants: they never produce flowers, and they spread by spores instead of seeds.' }),

  // ── Classifying plants by their parts ──────────────────────────────────
  makeMCQ({ id:'g5sci-syl-005', chapterId:'plants', subsection:'parts', difficulty:2,
    question:'When scientists classify plants, what do they look at?',
    options:['The different parts of the plant','The name of the gardener','The price of the plant','The day it was planted'], answer:'The different parts of the plant',
    hint:'Leaves, stems, roots and flowers are the clues.',
    explanation:'Plants are <b>classified by looking at their different parts</b> &mdash; the leaves, the stem, the roots and whether there are flowers.' }),

  makeMCQ({ id:'g5sci-syl-006', chapterId:'plants', subsection:'parts', difficulty:3,
    question:'Two plants are put in the same group because both have long thin leaves with parallel veins. What is this sorting called?',
    options:['Classifying','Germinating','Pollinating','Evaporating'], answer:'Classifying',
    hint:'It means putting things into groups by their features.',
    explanation:'Putting living things into groups by the features they share is called <b>classifying</b>. Here the shared feature is the shape and veining of the leaf.' }),

  makeMCQ({ id:'g5sci-syl-007', chapterId:'plants', subsection:'parts', difficulty:4,
    question:'A pupil classifies plants by the colour of their pots. Why is that a poor way to group them?',
    options:['The pot is not part of the plant','Colours are hard to see','Pots are all the same size','Plants do not grow in pots'], answer:'The pot is not part of the plant',
    hint:'A useful grouping uses something that belongs to the living thing itself.',
    explanation:'A pot can be changed tomorrow; it tells you nothing about the plant. Classification must use the <b>parts of the plant itself</b> &mdash; leaves, stem, roots, flowers.' }),

  // ── Conditions a plant needs to grow well ──────────────────────────────
  makeMCQ({ id:'g5sci-syl-008', chapterId:'plants', subsection:'growth', difficulty:2,
    question:'Which conditions does a plant <b>need</b> in order to <b>grow</b> well?',
    options:['Light, water, air and warmth','Only water and soil','Only light and soil','Only warmth and darkness'], answer:'Light, water, air and warmth',
    hint:'A plant that is growing has to make its own food as well as drink.',
    explanation:'To <b>grow well</b> a plant <b>needs</b> light, water, air and warmth &mdash; and minerals from the soil. A seed needs less than this to germinate.' }),

  makeMCQ({ id:'g5sci-syl-009', chapterId:'plants', subsection:'growth', difficulty:3,
    question:'A seed can germinate in the dark, but a young plant <b>needs</b> light to <b>grow</b> well. Why?',
    options:['It must make its own food','Light keeps insects away','Light waters the plant','It must keep warm at night'], answer:'It must make its own food',
    hint:'The seed carries its own food store; the seedling does not.',
    explanation:'A seed lives on the food stored inside it, but once that runs out the plant must <b>make its own food</b>, and for that it needs light.' }),

  makeMCQ({ id:'g5sci-syl-010', chapterId:'plants', subsection:'growth', difficulty:3,
    question:'Two identical plants are watered the same, but one is kept in a dark cupboard. What will happen to it?',
    options:['It will turn pale and weak','It will grow twice as fast','It will grow more flowers','Nothing will change at all'], answer:'It will turn pale and weak',
    hint:'Think about what the plant cannot do without light.',
    explanation:'Without light the plant cannot make food, so it turns <b>pale and weak</b> and finally dies. Light is one of the conditions a plant needs to grow well.' }),

  makeMCQ({ id:'g5sci-syl-011', chapterId:'plants', subsection:'growth', difficulty:4,
    question:'A gardener waters her plants well but they still grow poorly in a shady, cold corner. What is missing?',
    options:['Light and warmth','Water and air','Seeds and roots','Leaves and stems'], answer:'Light and warmth',
    hint:'List the conditions a plant needs, then tick off the ones it already has.',
    explanation:'The plants have water, but a shady cold corner leaves them short of <b>light and warmth</b>. A plant needs every condition, not just one.' }),

  // ── The effects of soil erosion ────────────────────────────────────────
  makeMCQ({ id:'g5sci-syl-012', chapterId:'conservation', subsection:'deforestation', difficulty:2,
    question:'What <b>effect</b> does <b>soil erosion</b> have on farmland?',
    options:['The rich top layer is washed away','The soil becomes deeper','More crops can be planted','The land becomes flatter'], answer:'The rich top layer is washed away',
    hint:'Think about which part of the soil the rain carries off first.',
    explanation:'Erosion carries off the <b>rich top layer</b>, the part that holds the goodness plants need, so less will grow there afterwards.' }),

  makeMCQ({ id:'g5sci-syl-013', chapterId:'conservation', subsection:'deforestation', difficulty:3,
    question:'What <b>effect</b> does <b>soil erosion</b> have on living things in a river or lagoon?',
    options:['Mud in the water harms them','The water becomes cleaner','They grow much faster','Nothing happens to them'], answer:'Mud in the water harms them',
    hint:'Follow the washed-away soil downhill to where it ends up.',
    explanation:'The soil ends up in the water, where the <b>mud blocks the light and smothers</b> plants, fish and coral.' }),

  makeMCQ({ id:'g5sci-syl-014', chapterId:'conservation', subsection:'deforestation', difficulty:4,
    question:'A hillside is left bare after the trees are cut. Give the full chain of <b>effects</b> of the <b>soil erosion</b> that follows.',
    options:['Soil is washed off, crops fail, and the lagoon fills with mud','Soil gets deeper, crops grow better, the lagoon clears','Nothing changes until the trees grow back','Only the trees are affected, nothing else'], answer:'Soil is washed off, crops fail, and the lagoon fills with mud',
    hint:'Follow the soil from the top of the hill to the sea.',
    explanation:'With no roots to hold it, the soil is <b>washed off the hillside</b>, so less grows there, and the mud ends up <b>smothering the lagoon</b>. One cause, several effects.' }),

  // ── The states of water are interchangeable ───────────────────────────
  makeMCQ({ id:'g5sci-syl-015', chapterId:'water-matter', subsection:'states', difficulty:2,
    question:'The three states of water are said to be <b>interchangeable</b>. What does that mean?',
    options:['Each state can change into the others','Water can only melt, never freeze','Once water is a gas it stays a gas','The three states never mix'], answer:'Each state can change into the others',
    hint:'Think of ice melting, water boiling and steam cooling again.',
    explanation:'<b>Interchangeable</b> means each state can turn into the others and back: ice melts to water, water evaporates to vapour, vapour condenses to water, water freezes to ice.' }),

  makeMCQ({ id:'g5sci-syl-016', chapterId:'water-matter', subsection:'states', difficulty:3,
    question:'Ice is left in a warm room, then the water is boiled, then the steam cools on a cold lid. What does this show?',
    options:['The states of water are interchangeable','Water can only exist as a liquid','Steam is a completely new substance','Ice cannot become water again'], answer:'The states of water are interchangeable',
    hint:'Count how many changes of state happen in the sentence.',
    explanation:'Solid to liquid to gas and back to liquid, all with the same water: the states are <b>interchangeable</b>.' }),

  makeMCQ({ id:'g5sci-syl-017', chapterId:'water-matter', subsection:'states', difficulty:3,
    question:'When water changes from one state to another, is it still water?',
    options:['Yes, only its state has changed','No, it becomes a new substance','Only if it stays a liquid','Only when it is frozen'], answer:'Yes, only its state has changed',
    hint:'Ask whether anything new has been made.',
    explanation:'A change of state makes no new substance: ice, water and steam are <b>all water</b>, and each can change back into the others.' }),

  // ── The water cycle keeps the amount of water the same ────────────────
  makeMCQ({ id:'g5sci-syl-018', chapterId:'water-matter', subsection:'water_cycle', difficulty:3,
    question:'Why does the amount of water on <b>Earth</b> stay about the same, thanks to the <b>water cycle</b>?',
    options:['The water is used again and again','New water is made each year','Water leaves Earth and returns','Rain adds water from space'], answer:'The water is used again and again',
    hint:'Follow one drop from the sea to a cloud, to the rain, to the river and back.',
    explanation:'The <b>water cycle</b> keeps moving the same water round and round the <b>Earth</b>, so it is <b>used again and again</b> rather than made or lost.' }),

  makeMCQ({ id:'g5sci-syl-019', chapterId:'water-matter', subsection:'water_cycle', difficulty:4,
    question:'A pupil asks whether the rain falling today is new water. What is the best answer?',
    options:['No, the water cycle uses the same water again','Yes, the clouds make new water','Yes, water arrives from the sea each year','No, rain is not really water'], answer:'No, the water cycle uses the same water again',
    hint:'Think about whether the cycle can add anything to the Earth.',
    explanation:'The <b>water cycle</b> on <b>Earth</b> moves the same water round for ever, so today&rsquo;s rain has fallen countless times before.' }),

  makeMCQ({ id:'g5sci-syl-020', chapterId:'water-matter', subsection:'water_cycle', difficulty:4,
    question:'If the <b>water cycle</b> keeps the amount of water on <b>Earth</b> the same, why must we still save water?',
    options:['Clean fresh water in one place can run out','The cycle stops in the dry season','Water disappears when it evaporates','Saving water makes more rain fall'], answer:'Clean fresh water in one place can run out',
    hint:'The total never changes, but where it is and how clean it is do.',
    explanation:'The total never changes, but <b>clean fresh water where people live can run out</b>. The cycle does not promise water in your tap.' })

);
