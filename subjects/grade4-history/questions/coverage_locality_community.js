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
    ['Which item helps us learn what a locality looked like long ago?', 'an old photograph'],
    ['A new road built where there was once a footpath is an example of…', 'change'],
    ['A village keeps the same old temple. This is an example of…', 'continuity'],
    ['To compare the past with today, it is useful to use…', 'old and new pictures'],
    ['Which transport was common before many people owned cars?', 'a bicycle'],
    ['A timeline helps us put events in…', 'time order'],
    ['A new supermarket in a village shows that the locality has…', 'changed'],
    ['Which question is useful when comparing old and new houses?', 'What is different about the building materials?'],
    ['A monument that remains in the same place shows…', 'continuity'],
    ['Which source is evidence from the past?', 'an old map'],
    ['A bridge replacing a small wooden crossing is an example of…', 'change'],
    ['What can an elderly person share about the past?', 'memories of the locality'],
    ['Why do we label dates on a timeline?', 'to show when events happened']
  ], ['an old photograph', 'change', 'continuity', 'old and new pictures', 'a bicycle', 'time order', 'changed', 'What is different about the building materials?', 'an old map', 'memories of the locality', 'to show when events happened'], 'Look for clues about what stayed the same and what became different.', a => `The best answer is <b>${a}</b>.`);

  rows('buildings', 'g4hist-locality', 'buildings', [
    ['Which building is used for learning?', 'a school'], ['Which building is used for medical care?', 'a hospital or clinic'],
    ['Which landmark can help people recognise a place?', 'a monument'], ['A post office is a building where people can…', 'send letters and parcels'],
    ['Why are old buildings sometimes protected?', 'they tell us about the past'], ['Which building is a place of worship?', 'a mosque'],
    ['A library is a place where people can…', 'borrow books'], ['What can a town hall be used for?', 'local community services'],
    ['Which feature is most likely to be a landmark?', 'a historic tower'], ['Why should we respect places of worship?', 'they are important to many people'],
    ['A market building is used mainly to…', 'buy and sell goods'], ['Which building helps travellers catch a train?', 'a railway station'],
    ['What is one way to care for an old monument?', 'do not damage it'], ['A museum helps visitors learn about…', 'objects and stories from the past']
  ], ['a school', 'a hospital or clinic', 'a monument', 'send letters and parcels', 'they tell us about the past', 'a mosque', 'borrow books', 'local community services', 'a historic tower', 'they are important to many people', 'buy and sell goods', 'a railway station', 'do not damage it', 'objects and stories from the past'], 'Think about the purpose of the building.', a => `<b>${a}</b> is correct.`);

  rows('festivals', 'g4hist-community', 'festivals', [
    ['Divali is often called the festival of…', 'lights'], ['At Eid ul-Fitr, many Muslim families celebrate the end of…', 'Ramadan'],
    ['Christmas is celebrated by many Christians in…', 'December'], ['Maha Shivaratri is important to many…', 'Hindus'],
    ['A good way to learn about a festival is to…', 'listen respectfully to people who celebrate it']
  ], ['lights', 'Ramadan', 'December', 'Hindus', 'listen respectfully to people who celebrate it'], 'Remember that different communities may celebrate in different ways.', a => `The correct answer is <b>${a}</b>.`);

  rows('religions', 'g4hist-community', 'religions', [
    ['A church is a place of worship for many…', 'Christians'], ['A mosque is a place of worship for many…', 'Muslims'],
    ['A temple is a place of worship for many…', 'Hindus'], ['A pagoda is linked to many…', 'Buddhists'],
    ['What should you do when visiting any place of worship?', 'be respectful'], ['Why do people have different religions?', 'families and communities have different beliefs'],
    ['Which action shows respect for a different faith?', 'listening without making fun'], ['A person may practise a religion by…', 'taking part in prayers or celebrations'],
    ['Mauritius has people from many religious backgrounds. This is called…', 'diversity'], ['Is it kind to judge someone because of their religion?', 'No'],
    ['What can classmates share about their celebrations?', 'what the celebration means to them'], ['Religious diversity can help us…', 'learn about one another'],
    ['A place of worship should be kept…', 'clean and peaceful'], ['Which value is important in a diverse country?', 'respect'],
    ['Can two friends have different religions?', 'Yes'], ['What should a visitor do before entering a sacred place?', 'follow the rules of that place'],
    ['Why is kindness important when discussing beliefs?', 'everyone deserves respect']
  ], ['Christians', 'Muslims', 'Hindus', 'Buddhists', 'be respectful', 'families and communities have different beliefs', 'listening without making fun', 'taking part in prayers or celebrations', 'diversity', 'No', 'what the celebration means to them', 'learn about one another', 'clean and peaceful', 'respect', 'Yes', 'follow the rules of that place', 'everyone deserves respect'], 'Choose the respectful and accurate answer.', a => `<b>${a}</b> is correct.`);

  rows('food', 'g4hist-community', 'food_dress', [
    ['Different families may eat different traditional foods because of…', 'their culture and traditions'], ['A respectful response to unfamiliar food is to…', 'ask politely about it'],
    ['Clothing worn at a celebration can show…', 'a cultural tradition'], ['Why should we never make fun of someone’s clothes?', 'everyone deserves respect'],
    ['Food from different communities lets us…', 'discover new tastes and traditions'], ['Traditional dress may be worn especially for…', 'a special occasion'],
    ['What is a good way to describe food you have not tried?', 'It is new to me.'], ['Families may prepare special dishes for…', 'festivals'],
    ['What can food tell us about a family?', 'some of their traditions'], ['It is good to share meals with others because it can…', 'bring people together'],
    ['Which action is polite at a shared meal?', 'say thank you'], ['Cultural clothing should be treated with…', 'care'],
    ['A recipe passed down in a family is part of its…', 'heritage'], ['Trying a new dish can help you…', 'learn about another culture'],
    ['Different foods and clothes in Mauritius show…', 'our diversity'], ['What should you do if you do not want to eat a food?', 'say no thank you politely']
  ], ['their culture and traditions', 'ask politely about it', 'a cultural tradition', 'everyone deserves respect', 'discover new tastes and traditions', 'a special occasion', 'It is new to me.', 'festivals', 'some of their traditions', 'bring people together', 'say thank you', 'care', 'heritage', 'learn about another culture', 'our diversity', 'say no thank you politely'], 'Think about respect and learning from one another.', a => `<b>${a}</b> is the best answer.`);

  rows('lang', 'g4hist-community', 'languages', [
    ['Mauritian Creole is spoken by many people in…', 'Mauritius'], ['English is used officially in many Mauritian schools and offices.', 'True'],
    ['French is one of the languages many Mauritians use.', 'True'], ['Which action helps a friend who is learning a language?', 'speak kindly and clearly'],
    ['Knowing more than one language can help us…', 'communicate with more people'], ['Should we laugh at someone’s accent?', 'No'],
    ['Language diversity means people may speak…', 'different languages'], ['A respectful way to ask about a language is…', 'How do you say this in your language?'],
    ['Why can families use different languages at home?', 'they have different backgrounds'], ['What can you do if you do not understand a word?', 'ask politely for an explanation'],
    ['A language can be part of a person’s…', 'identity'], ['Learning greetings in another language shows…', 'respect'],
    ['Which is a good classroom rule?', 'Let everyone speak without being teased.'], ['Can one person speak several languages?', 'Yes'],
    ['Languages help people share…', 'ideas and stories'], ['Why do we value language diversity?', 'it helps us understand one another'],
    ['A translation tells us…', 'the meaning in another language'], ['When a classmate speaks differently, you should…', 'listen respectfully']
  ], ['Mauritius', 'True', 'speak kindly and clearly', 'communicate with more people', 'No', 'different languages', 'How do you say this in your language?', 'they have different backgrounds', 'ask politely for an explanation', 'identity', 'respect', 'Let everyone speak without being teased.', 'Yes', 'ideas and stories', 'it helps us understand one another', 'the meaning in another language', 'listen respectfully'], 'Think about communication and respect.', a => `The correct answer is <b>${a}</b>.`);

  rows('diversity', 'g4hist-community', 'diversity', [
    ['Diversity means that people can have…', 'different cultures and traditions'], ['A diverse classroom can include children who…', 'celebrate different festivals'],
    ['What helps a community live happily together?', 'respecting differences'], ['If a friend’s tradition is new to you, you can…', 'ask kind questions'],
    ['Why is Mauritius described as diverse?', 'people have many cultural backgrounds'], ['Which word means treating everyone fairly?', 'respect'],
    ['Sharing stories about families can help classmates…', 'understand each other'], ['What should you do when someone is left out?', 'invite them to join'],
    ['Different traditions are something to…', 'appreciate'], ['Diversity can make a country…', 'richer in ideas and customs'],
    ['What is an inclusive action?', 'making space for everyone'], ['A person’s culture may include their…', 'language, food and celebrations'],
    ['Why should we listen to others’ experiences?', 'to learn and show respect']
  ], ['different cultures and traditions', 'celebrate different festivals', 'respecting differences', 'ask kind questions', 'people have many cultural backgrounds', 'respect', 'understand each other', 'invite them to join', 'appreciate', 'richer in ideas and customs', 'making space for everyone', 'language, food and celebrations', 'to learn and show respect'], 'Look for the answer that includes and respects everyone.', a => `<b>${a}</b> is correct.`);
})();
