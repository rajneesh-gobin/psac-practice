'use strict';
// Grade 5 English - contextual articles, quantifiers and determiners.
(function () {
  const add = (kind, rows) => rows.forEach((r, i) => STATIC_QUESTIONS.push(makeMCQ({
    id: `g5eng-artdet-${kind}-${String(i + 1).padStart(2, '0')}`,
    chapterId: 'eng-nouns', subsection: kind === 'art' ? 'articles' : 'determiners', difficulty: 2,
    question: r[0], options: r[1], answer: r[2], hint: r[3], explanation: r[4]
  })));

  add('art', [
    ['Choose the correct article: “Maya hopes to become ___ engineer.”',['a','an','the','no article'],'an','Listen to the first sound in “engineer”.','<b>An</b> comes before the vowel sound at the beginning of “engineer”.'],
    ['Choose the correct article: “My uncle bought ___ useful toolbox.”',['a','an','the','no article'],'a','“Useful” starts with a /y/ sound.','<b>A</b> is correct because “useful” begins with a consonant sound.'],
    ['Choose the correct article: “We watched ___ moon rise above the lagoon.”',['a','an','the','no article'],'the','The moon is unique in this context.','We normally say <b>the moon</b> because it is unique.'],
    ['Choose the correct article: “Dad packed ___ orange and two bananas.”',['a','an','the','no article'],'an','Use the article placed before a vowel sound.','<b>An orange</b> is correct because “orange” begins with a vowel sound.'],
    ['Choose the correct article: “Pass me ___ blue pencil beside your ruler.”',['a','an','the','no article'],'the','The location identifies one particular pencil.','<b>The</b> points to the specific pencil beside the ruler.'],
    ['Choose the correct article: “Zayn saw ___ European tourist reading the map.”',['a','an','the','no article'],'a','Listen to the first sound, not just the first letter.','<b>A</b> is used because “European” begins with the consonant /y/ sound.'],
    ['Choose the correct article: “Our class visited ___ museum that opened last month.”',['a','an','the','no article'],'the','The final words identify a particular museum.','<b>The</b> is used for the specific museum described in the sentence.'],
    ['Choose the correct article: “Asha plays ___ volleyball after school.”',['a','an','the','no article'],'no article','Names of sports usually need no article.','We say <b>plays volleyball</b> when speaking about the sport in general.'],
    ['Choose the correct article: “There is ___ one-rupee coin under the chair.”',['a','an','the','no article'],'a','“One” starts with a /w/ sound.','<b>A</b> is correct because “one” begins with a consonant sound.'],
    ['Choose the correct article: “We waited for ___ hour and fifteen minutes.”',['a','an','the','no article'],'an','The h in “hour” is silent.','<b>An</b> comes before the vowel sound in “hour”.'],
    ['Choose the correct article: “They live near ___ north coast of the island.”',['a','an','the','no article'],'the','A named side of a place is specific.','<b>The north coast</b> identifies a particular part of the island.'],
    ['Choose the correct article: “Nadia wrote ___ honest account of the event.”',['a','an','the','no article'],'an','The h in “honest” is silent.','<b>An honest account</b> is correct because “honest” begins with a vowel sound.'],
    ['Choose the correct article: “My brother can play ___ piano.”',['a','an','the','no article'],'the','Think of the usual expression for playing an instrument.','We normally say <b>play the piano</b> when naming the instrument.'],
    ['Choose the correct article: “We walked along ___ beach near our hotel.”',['a','an','the','no article'],'the','The location tells us which beach.','<b>The</b> identifies the specific beach near the hotel.'],
    ['Choose the correct article: “Keira borrowed ___ interesting book.”',['a','an','the','no article'],'an','Listen to the first sound in “interesting”.','<b>An</b> comes before the vowel sound beginning “interesting”.']
  ]);

  add('det', [
    ['Choose the best determiner: “There are ___ chairs for all thirty pupils.”',['enough','much','little','any'],'enough','Which word means the number meets the need?','<b>Enough</b> means there are as many chairs as the class needs.'],
    ['Choose the best determiner: “Only ___ sugar is needed for this recipe.”',['a little','a few','many','several'],'a little','Sugar is measured, not counted separately.','<b>A little</b> describes a small amount of an uncountable noun.'],
    ['Choose the best determiner: “___ of the two routes reaches the waterfall.”',['Either','Every','Much','Several'],'Either','One or the other of two choices works.','<b>Either</b> means one or the other of two routes.'],
    ['Choose the best determiner: “We did not see ___ dolphins on the trip.”',['any','some','much','every'],'any','Negative sentences often use this word.','<b>Any</b> is normally used with a plural noun in a negative sentence.'],
    ['Choose the best determiner: “___ child received a certificate.”',['Each','Much','A little','Either'],'Each','Every child received one individually.','<b>Each</b> focuses on every member of the group one at a time.'],
    ['Choose the best determiner: “How ___ flour should we add?”',['much','many','few','several'],'much','Flour is measured as an amount.','<b>Much</b> is used in questions with an uncountable noun such as flour.'],
    ['Choose the best determiner: “How ___ pages did you read?”',['many','much','little','every'],'many','Pages can be counted one by one.','<b>Many</b> is used with a plural countable noun.'],
    ['Choose the best determiner: “I have read ___ books on this shelf, but not all.”',['several','much','every','either'],'several','It means more than two but not necessarily all.','<b>Several</b> describes an unspecified number greater than two.'],
    ['Choose the best determiner: “___ of the water spilled; most stayed in the bottle.”',['A little','A few','Many','Several'],'A little','Water is uncountable and only a small amount spilled.','<b>A little</b> correctly describes a small amount of water.'],
    ['Choose the best determiner: “Very ___ mangoes remain, so there are not enough.”',['few','little','much','every'],'few','Mangoes are countable.','<b>Few</b> describes a small, insufficient number of countable things.'],
    ['Choose the best determiner: “___ answer must include a full sentence.”',['Every','Many','Much','Either'],'Every','The rule applies to all answers individually.','<b>Every</b> shows that the rule applies to all the answers.'],
    ['Choose the best determiner: “Would you like ___ more soup?”',['some','any','many','few'],'some','Offers often use this determiner.','<b>Some</b> is commonly used when offering an unspecified amount.'],
    ['Choose the best determiner: “___ my shoes were wet after the walk.”',['Both','Every','Much','Either'],'Both','The sentence means the complete pair.','<b>Both</b> means the two shoes together.'],
    ['Choose the best determiner: “There is too ___ traffic near the school.”',['much','many','few','several'],'much','Traffic is treated as an amount.','<b>Much</b> follows “too” before the uncountable noun “traffic”.'],
    ['Choose the best determiner: “___ these two notebooks belongs to you?”',['Which of','How much','Every','Several'],'Which of','Choose from two known objects.','<b>Which of</b> asks for a choice from the two identified notebooks.']
  ]);
})();
