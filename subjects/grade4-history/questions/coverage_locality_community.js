'use strict';
(function () {
  const add = (id, chapterId, subsection, question, options, answer, hint, explanation) =>
    STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty: 2, question, options, answer, hint, explanation }));
  const rows = (prefix, chapterId, subsection, data, options, hint, explanation) => data.forEach(([question, answer], i) =>
    add(`g4hg-cov-${prefix}-${i}`, chapterId, subsection, question, options, answer, hint, explanation(answer)));

  rows('locality', 'g4hist-locality', 'types_locality', [
    ['A place with beaches, a lagoon and fishing boats is a…', 'coastal locality'],
    ['A place with fields, fewer buildings and farms is usually a…', 'rural locality']
  ], ['urban locality', 'rural locality', 'coastal locality'], 'Think about what you would see in that place.', a => `<b>${a}</b> matches this description.`);

  rows('change', 'g4hist-locality', 'change', [
    ['Which item helps us learn what a locality looked like long ago?', 'an old photograph of it'],
    ['A new road built where there was once a footpath is an example of…', 'change in the locality'],
    ['A village keeps the same old temple. This is an example of…', 'continuity over time'],
    ['To compare the past with today, it is useful to use…', 'old and new pictures'],
    ['Which transport was common before many people owned cars?', 'a bicycle or a cart'],
    ['A timeline helps us put events in…', 'the order they happened'],
    ['A new supermarket in a village shows that the locality has…', 'changed over the years'],
    ['Which question is useful when comparing old and new houses?', 'What are the walls made of?'],
    ['A monument that remains in the same place shows…', 'continuity over time'],
    ['Which source is evidence from the past?', 'an old map of the area'],
    ['A bridge replacing a small wooden crossing is an example of…', 'change in the locality'],
    ['What can an elderly person share about the past?', 'memories of the locality'],
    ['Why do we label dates on a timeline?', 'to show when events happened']
  ], ['an old photograph of it', 'change in the locality', 'continuity over time', 'old and new pictures', 'a bicycle or a cart', 'the order they happened', 'changed over the years', 'What are the walls made of?', 'an old map of the area', 'memories of the locality', 'to show when events happened'], 'Look for clues about what stayed the same and what became different.', a => `The best answer is <b>${a}</b>.`);

  rows('buildings', 'g4hist-locality', 'buildings', [
    ['Which building is used for learning?', 'a school building'], ['Which building is used for medical care?', 'a hospital or clinic'],
    ['Which landmark can help people recognise a place?', 'a monument or statue'], ['A post office is a building where people can…', 'send letters and parcels'],
    ['Why are old buildings sometimes protected?', 'they tell us about the past'], ['Which building is a place of worship?', 'a mosque or temple'],
    ['A library is a place where people can…', 'borrow and read books'], ['What can a town hall be used for?', 'local community services'],
    ['Which feature is most likely to be a landmark?', 'a historic tower'], ['Why should we respect places of worship?', 'they matter to many people'],
    ['A market building is used mainly to…', 'buy and sell goods'], ['Which building helps travellers catch a train?', 'a railway station'],
    ['What is one way to care for an old monument?', 'never damage or mark it'], ['A museum helps visitors learn about…', 'objects from the past']
  ], ['a school building', 'a hospital or clinic', 'a monument or statue', 'send letters and parcels', 'they tell us about the past', 'a mosque or temple', 'borrow and read books', 'local community services', 'a historic tower', 'they matter to many people', 'buy and sell goods', 'a railway station', 'never damage or mark it', 'objects from the past'], 'Think about the purpose of the building.', a => `<b>${a}</b> is correct.`);

  rows('festivals', 'g4hist-community', 'festivals', [
    ['Divali is often called the festival of…', 'lights and lamps'], ['At Eid ul-Fitr, many Muslim families celebrate the end of…', 'the month of Ramadan'],
    ['Christmas is celebrated by many Christians in…', 'December each year'], ['Maha Shivaratri is important to many…', 'Hindu families here'],
    ['A good way to learn about a festival is to…', 'ask those who celebrate it']
  ], ['lights and lamps', 'the month of Ramadan', 'December each year', 'Hindu families here', 'ask those who celebrate it'], 'Remember that different communities may celebrate in different ways.', a => `The correct answer is <b>${a}</b>.`);

  rows('religions', 'g4hist-community', 'religions', [
    ['A church is a place of worship for many…', 'Christian families here'], ['A mosque is a place of worship for many…', 'Muslim families here'],
    ['A temple is a place of worship for many…', 'Hindu families here'], ['A pagoda is linked to many…', 'Buddhist families here'],
    ['What should you do when visiting any place of worship?', 'always be respectful'], ['Why do people have different religions?', 'people have different beliefs'],
    ['Which action shows respect for a different faith?', 'listening without making fun'], ['A person may practise a religion by…', 'taking part in prayers'],
    ['Mauritius has people from many religious backgrounds. This is called…', 'religious diversity'], ['Is it kind to judge someone because of their religion?', 'No, it is never kind'],
    ['What can classmates share about their celebrations?', 'what the celebration means'], ['Religious diversity can help us…', 'learn about one another'],
    ['A place of worship should be kept…', 'clean, quiet and peaceful'], ['Which value is important in a diverse country?', 'respect for everyone'],
    ['Can two friends have different religions?', 'Yes, of course they can'], ['What should a visitor do before entering a sacred place?', 'follow the rules of that place'],
    ['Why is kindness important when discussing beliefs?', 'everyone deserves respect']
  ], ['Christian families here', 'Muslim families here', 'Hindu families here', 'Buddhist families here', 'always be respectful', 'people have different beliefs', 'listening without making fun', 'taking part in prayers', 'religious diversity', 'No, it is never kind', 'what the celebration means', 'learn about one another', 'clean, quiet and peaceful', 'respect for everyone', 'Yes, of course they can', 'follow the rules of that place', 'everyone deserves respect'], 'Choose the respectful and accurate answer.', a => `<b>${a}</b> is correct.`);

  rows('food', 'g4hist-community', 'food_dress', [
    ['Different families may eat different traditional foods because of…', 'their culture and traditions'], ['A respectful response to unfamiliar food is to…', 'ask politely about it'],
    ['Clothing worn at a celebration can show…', 'a cultural tradition'], ['Why should we never make fun of someone\'s clothes?', 'everyone deserves respect'],
    ['Food from different communities lets us…', 'discover new tastes and food'], ['Traditional dress may be worn especially for…', 'a very special occasion'],
    ['What is a good way to describe food you have not tried?', 'It is quite new to me.'], ['Families may prepare special dishes for…', 'festivals and holidays'],
    ['What can food tell us about a family?', 'some of their traditions'], ['It is good to share meals with others because it can…', 'bring people together'],
    ['Which action is polite at a shared meal?', 'saying thank you kindly'], ['Cultural clothing should be treated with…', 'great care and respect'],
    ['A recipe passed down in a family is part of its…', 'heritage and history'], ['Trying a new dish can help you…', 'learn about another culture'],
    ['Different foods and clothes in Mauritius show…', 'our cultural diversity'], ['What should you do if you do not want to eat a food?', 'say no thank you politely']
  ], ['their culture and traditions', 'ask politely about it', 'a cultural tradition', 'everyone deserves respect', 'discover new tastes and food', 'a very special occasion', 'It is quite new to me.', 'festivals and holidays', 'some of their traditions', 'bring people together', 'saying thank you kindly', 'great care and respect', 'heritage and history', 'learn about another culture', 'our cultural diversity', 'say no thank you politely'], 'Think about respect and learning from one another.', a => `<b>${a}</b> is the best answer.`);

  rows('lang', 'g4hist-community', 'languages', [
    ['Mauritian Creole is spoken by many people in…', 'Mauritius and Rodrigues'], ['English is used officially in many Mauritian schools and offices.', 'Yes, that is quite true'],
    ['French is one of the languages many Mauritians use.', 'Yes, that is quite true'], ['Which action helps a friend who is learning a language?', 'speak kindly and clearly'],
    ['Knowing more than one language can help us…', 'communicate with more people'], ['Should we laugh at someone\'s accent?', 'No, we should never do that'],
    ['Language diversity means people may speak…', 'many different languages'], ['A respectful way to ask about a language is…', 'How do you say this word?'],
    ['Why can families use different languages at home?', 'they have different roots'], ['What can you do if you do not understand a word?', 'ask politely what it means'],
    ['A language can be part of a person\'s…', 'own identity and culture'], ['Learning greetings in another language shows…', 'respect for other people'],
    ['Which is a good classroom rule?', 'Let everyone speak freely'], ['Can one person speak several languages?', 'Yes, many people can do so'],
    ['Languages help people share…', 'their ideas and stories'], ['Why do we value language diversity?', 'it helps us understand others'],
    ['A translation tells us…', 'the meaning in another language'], ['When a classmate speaks differently, you should…', 'listen to them respectfully']
  ], ['Mauritius and Rodrigues', 'Yes, that is quite true', 'speak kindly and clearly', 'communicate with more people', 'No, we should never do that', 'many different languages', 'How do you say this word?', 'they have different roots', 'ask politely what it means', 'own identity and culture', 'respect for other people', 'Let everyone speak freely', 'Yes, many people can do so', 'their ideas and stories', 'it helps us understand others', 'the meaning in another language', 'listen to them respectfully'], 'Think about how it feels when someone makes the effort to greet you in your own language.', a => `The correct answer is <b>${a}</b>.`);

  rows('diversity', 'g4hist-community', 'diversity', [
    ['Diversity means that people can have…', 'different cultures and customs'], ['A diverse classroom can include children who…', 'celebrate different festivals'],
    ['What helps a community live happily together?', 'respecting differences'], ['If a friend\'s tradition is new to you, you can…', 'ask kind questions about it'],
    ['Why is Mauritius described as diverse?', 'people have many backgrounds'], ['Which word means treating everyone fairly?', 'respect for all people'],
    ['Sharing stories about families can help classmates…', 'understand each other'], ['What should you do when someone is left out?', 'invite them to join in'],
    ['Different traditions are something to…', 'to appreciate and enjoy'], ['Diversity can make a country…', 'richer in ideas and customs'],
    ['What is an inclusive action?', 'making space for everyone'], ['A person\'s culture may include their…', 'language, food and celebrations'],
    ['Why should we listen to others\' experiences?', 'to learn and show respect']
  ], ['different cultures and customs', 'celebrate different festivals', 'respecting differences', 'ask kind questions about it', 'people have many backgrounds', 'respect for all people', 'understand each other', 'invite them to join in', 'to appreciate and enjoy', 'richer in ideas and customs', 'making space for everyone', 'language, food and celebrations', 'to learn and show respect'], 'Look for the answer that includes and respects everyone.', a => `<b>${a}</b> is correct.`);
})();
