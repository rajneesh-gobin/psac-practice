'use strict';
// Grade 7 Maths — Mass (g7m-mass), batch 2B
// IDs: g7m-mass-009 … -020

(function () {

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-mass-009', chapterId:'g7m-mass', difficulty:1,
    subsection:'units_mass',
    question:'Which unit would a pharmacist use for the mass of the medicine inside one small tablet?',
    options:['milligram','gram','kilogram','tonne'],
    answer:'milligram',
    hint:'The amount is far smaller than the mass of a paper clip.',
    explanation:'A tablet holds only a few hundred <b>milligrams</b> of medicine. A gram would already be several tablets, a kilogram is about the mass of a bag of sugar, and a tonne is the mass of a small car.' }),

  makeMCQ({ id:'g7m-mass-010', chapterId:'g7m-mass', difficulty:2,
    subsection:'units_mass',
    question:'Put these units in order from the <b>smallest</b> to the <b>largest</b>: tonne, milligram, kilogram, gram.',
    options:['milligram, gram, kilogram, tonne','gram, milligram, kilogram, tonne','milligram, gram, tonne, kilogram','kilogram, gram, milligram, tonne'],
    answer:'milligram, gram, kilogram, tonne',
    hint:'Each step up in this list is 1,000 times bigger than the one before.',
    explanation:'1,000 mg = 1 g, 1,000 g = 1 kg and 1,000 kg = 1 t, so the order is <b>milligram, gram, kilogram, tonne</b>. The other lists put a larger unit before a smaller one somewhere in the chain.' }),

  makeNum({ id:'g7m-mass-011', chapterId:'g7m-mass', difficulty:2,
    subsection:'units_mass',
    question:'How many <b>milligrams</b> are there in 1 kilogram?',
    answer:1000000,
    hint:'Go one step at a time: kilograms to grams first, then grams to milligrams.',
    explanation:'1 kg = 1,000 g and 1 g = 1,000 mg, so 1 kg = 1,000 × 1,000 = <b>1,000,000 mg</b>. Answering 1,000 means only one of the two steps was done.' }),

  makeMCQ({ id:'g7m-mass-012', chapterId:'g7m-mass', difficulty:2,
    subsection:'units_mass',
    question:'A Grade 7 pupil lifts her packed school bag. Which is the most sensible estimate of its mass?',
    options:['4 kg','40 g','400 g','40 kg'],
    answer:'4 kg',
    hint:'A 1.5-litre bottle of water has a mass of about 1.5 kg. Compare the bag with that.',
    explanation:'A packed school bag is about <b>4 kg</b> — roughly three big water bottles. 40 g is the mass of a pencil case lid, 400 g would be a single exercise book, and 40 kg is heavier than the pupil herself is likely to lift.' }),

  makeNum({ id:'g7m-mass-013', chapterId:'g7m-mass', difficulty:2,
    subsection:'converting_mass',
    question:'A load of sand has a mass of 0.45 tonnes. What is this in <b>kilograms</b>?',
    answer:450,
    hint:'1 tonne = 1,000 kg, so multiply.',
    explanation:'0.45 × 1,000 = <b>450 kg</b>. Dividing by 1,000 instead would give 0.00045, which is smaller than a grain of rice.' }),

  makeMCQ({ id:'g7m-mass-014', chapterId:'g7m-mass', difficulty:3,
    subsection:'converting_mass',
    question:'A parcel has a mass of 4 kg 60 g. Written in kilograms only, this mass is …',
    options:['4.06 kg','4.6 kg','4.006 kg','4.66 kg'],
    answer:'4.06 kg',
    hint:'How many grams make a kilogram? That tells you how many decimal places you need.',
    explanation:'60 g = 60 ÷ 1,000 = 0.06 kg, so the parcel is <b>4.06 kg</b>. Writing 4.6 treats 60 g as 600 g, and 4.006 treats it as 6 g.' }),

  makeNum({ id:'g7m-mass-015', chapterId:'g7m-mass', difficulty:3,
    subsection:'converting_mass',
    question:'Add 7,250 g and 1.75 kg. Give your answer in <b>kilograms</b>.',
    answer:9,
    hint:'You cannot add grams to kilograms until both are in the same unit.',
    explanation:'7,250 g = 7.25 kg, and 7.25 + 1.75 = <b>9 kg</b>. Adding 7,250 and 1.75 directly gives 7,251.75, which mixes two different units.' }),

  makeMCQ({ id:'g7m-mass-016', chapterId:'g7m-mass', difficulty:3,
    subsection:'converting_mass',
    question:'Which of these masses is the <b>heaviest</b>?',
    options:['1.3 kg','1,290 g','1,250 g','0.0012 t'],
    answer:'1.3 kg',
    hint:'Change every mass into grams first, then compare the four numbers.',
    explanation:'In grams the four masses are 1,300, 1,290, 1,250 and 1,200, so <b>1.3 kg</b> is the heaviest. The tonne value looks large because of the extra zeros, but 0.0012 t is only 1.2 kg.' }),

  makeNum({ id:'g7m-mass-017', chapterId:'g7m-mass', difficulty:4,
    subsection:'mass_problems',
    question:'A grocer in Curepipe buys a 25 kg sack of lentils and repacks it into 500 g bags. He sells each bag for Rs 30. How much money does he take, in rupees, if he sells every bag?',
    answer:1500,
    hint:'Work out how many bags the sack fills before you think about money at all.',
    explanation:'25 kg = 25,000 g, and 25,000 ÷ 500 = 50 bags. Then 50 × Rs 30 = <b>Rs 1,500</b>. Multiplying 25 × 30 gives Rs 750, which prices whole kilograms instead of bags.' }),

  makeMCQ({ id:'g7m-mass-018', chapterId:'g7m-mass', difficulty:3,
    subsection:'mass_problems',
    question:'A lift may carry at most 630 kg. Six people with an average mass of 68 kg are already inside. What is the greatest extra mass the lift may still take?',
    options:['222 kg','162 kg','562 kg','408 kg'],
    answer:'222 kg',
    hint:'An average of 68 kg for six people tells you their total mass.',
    explanation:'The six people have a total mass of 6 × 68 = 408 kg, so the lift may still take 630 − 408 = <b>222 kg</b>. 408 kg is the load already inside, and 562 kg comes from subtracting only one person.' }),

  makeNum({ id:'g7m-mass-019', chapterId:'g7m-mass', difficulty:4,
    subsection:'mass_problems',
    question:'A recipe uses 250 g of flour to make 10 biscuits. How many <b>kilograms</b> of flour are needed for 200 biscuits?',
    answer:5,
    hint:'How many times bigger is 200 biscuits than 10 biscuits?',
    explanation:'200 ÷ 10 = 20 batches, so 20 × 250 g = 5,000 g = <b>5 kg</b>. Answering 5,000 gives the right amount but in grams, not the kilograms the question asked for.' }),

  makeMCQ({ id:'g7m-mass-020', chapterId:'g7m-mass', difficulty:3,
    subsection:'mass_problems',
    question:'A pupil converted 3,050 g to kilograms and wrote 3.5 kg. What mistake did the pupil make?',
    options:['read 050 g as 500 g, not 50 g','divided by 100 instead of 1,000','multiplied by 1,000 instead of dividing','added 3 kg and 5 g together'],
    answer:'read 050 g as 500 g, not 50 g',
    hint:'Work out the correct answer first, then compare it digit by digit with 3.5 kg.',
    explanation:'3,050 g = 3.05 kg. The pupil <b>read 050 as 500</b>, putting the 5 in the tenths place instead of the hundredths place. Dividing by 100 would have given 30.5, and multiplying by 1,000 would have given 3,050,000.' })

);

})();
