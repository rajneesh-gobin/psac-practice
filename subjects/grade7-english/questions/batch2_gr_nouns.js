'use strict';
// Grade 7 English — Grammar · Nouns, batch 2 (011–020)

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7eng-gr-nouns-011', chapterId:'g7eng-gr-nouns', difficulty:1,
    subsection:'countable_uncountable',
    question:'Choose the correct word: "Not a single ___ of rice was left in the pot."',
    options:['grain','slice','loaf','bar'],
    answer:'grain',
    hint:'Rice is uncountable, so we count it with a small measuring word.',
    explanation:'Rice is counted in <b>grains</b>. A slice is cut from bread or cake, a loaf is a whole bread, and a bar is used for soap or chocolate — none of them measures rice.' }),

  makeMCQ({ id:'g7eng-gr-nouns-012', chapterId:'g7eng-gr-nouns', difficulty:2,
    subsection:'countable_uncountable',
    question:'In which sentence is <b>paper</b> used as a COUNTABLE noun?',
    options:['He bought a paper at the shop.','She needs paper for the printer.','Paper is made from wood pulp.','We recycle paper every Friday.'],
    answer:'He bought a paper at the shop.',
    hint:'Look for the one that takes "a" and could become plural.',
    explanation:'"A paper" here means a newspaper — a countable thing you could have two of. In the other three, "paper" is the uncountable material, which takes no "a" and has no plural form.' }),

  makeMCQ({ id:'g7eng-gr-nouns-013', chapterId:'g7eng-gr-nouns', difficulty:2,
    subsection:'countable_uncountable',
    question:'Which question is CORRECT?',
    options:['How much furniture did you buy?','How many furniture did you buy?','How much chairs did you buy?','How many furnitures did you buy?'],
    answer:'How much furniture did you buy?',
    hint:'Furniture is uncountable; chairs are countable. Match the question word to the noun.',
    explanation:'"Furniture" is uncountable, so it takes "how much" and has no plural. "How many furniture(s)" treats it as countable, and "how much chairs" makes the opposite mistake — chairs can be counted, so they need "how many".' }),

  makeMCQ({ id:'g7eng-gr-nouns-014', chapterId:'g7eng-gr-nouns', difficulty:2,
    subsection:'countable_uncountable',
    question:'Choose the correct word: "There were ___ pupils in class today because of the rain."',
    options:['fewer','less','little','much'],
    answer:'fewer',
    hint:'Can you count pupils one by one?',
    explanation:'"Pupils" is a countable plural, so it takes <b>fewer</b>. "Less", "little" and "much" all go with uncountable nouns such as rain, water or money.' }),

  makeText({ id:'g7eng-gr-nouns-015', chapterId:'g7eng-gr-nouns', difficulty:2,
    subsection:'countable_uncountable',
    question:'Complete with ONE word: "She bought three ___ of bread at the bakery in Flacq."',
    answer:'loaves',
    hint:'Bread is uncountable, so a measuring word counts it — and there are three of them.',
    explanation:'Bread cannot be counted directly, so it is counted in <b>loaves</b>, and "three" forces the plural. "Three breads" treats an uncountable noun as countable, and "loafs" is not the plural of "loaf" — the f changes to v.' }),

  makeMCQ({ id:'g7eng-gr-nouns-016', chapterId:'g7eng-gr-nouns', difficulty:2,
    subsection:'subject_verb_agreement',
    question:'Choose the correct verb: "Neither of the boys ___ finished the exercise."',
    options:['has','have','are','were'],
    answer:'has',
    hint:'"Neither" points at one boy at a time, not at the two together.',
    explanation:'"Neither" is singular, so it takes <b>has</b>. "Have", "are" and "were" all agree with "boys", but "boys" sits inside the phrase "of the boys" and is not the subject of the sentence.' }),

  makeMCQ({ id:'g7eng-gr-nouns-017', chapterId:'g7eng-gr-nouns', difficulty:2,
    subsection:'subject_verb_agreement',
    question:'Choose the correct verb: "There ___ a lot of people waiting outside the clinic."',
    options:['are','is','was','has'],
    answer:'are',
    hint:'In "There ___", the verb agrees with whatever comes AFTER it.',
    explanation:'"People" is plural, so the verb is <b>are</b>. "Is" and "was" are singular, and "has" is never used in the "there is / there are" pattern.' }),

  makeMCQ({ id:'g7eng-gr-nouns-018', chapterId:'g7eng-gr-nouns', difficulty:3,
    subsection:'subject_verb_agreement',
    question:'Choose the correct verb: "The box of chocolates ___ on the kitchen table."',
    options:['is','are','were','have'],
    answer:'is',
    hint:'What is actually on the table — the box, or the chocolates?',
    explanation:'The subject is "the box", which is singular, so the verb is <b>is</b>. "Chocolates" sits inside the phrase "of chocolates" and can never control the verb, so all three plural forms are wrong.' }),

  makeMCQ({ id:'g7eng-gr-nouns-019', chapterId:'g7eng-gr-nouns', difficulty:3,
    subsection:'subject_verb_agreement',
    question:'Choose the correct verb: "Each of the fourteen classes ___ its own vegetable plot."',
    options:['has','have','are having','were having'],
    answer:'has',
    hint:'"Each" looks at the classes one by one.',
    explanation:'"Each" is always singular, so it takes <b>has</b> — and the word "its" later in the sentence confirms it. "Have", "are having" and "were having" all agree with the plural "classes", which is not the subject here.' }),

  makeText({ id:'g7eng-gr-nouns-020', chapterId:'g7eng-gr-nouns', difficulty:2,
    subsection:'subject_verb_agreement',
    question:'Complete with the correct form of the verb <i>to be</i>: "Two hundred rupees ___ too much for a school tie."',
    answer:'is',
    hint:'The rupees are one single amount here, not two hundred separate coins.',
    explanation:'A sum of money is treated as one single amount, so it takes the singular <b>is</b>. "Are" would only be right if you were talking about the coins and notes themselves lying on a table.' })

);
