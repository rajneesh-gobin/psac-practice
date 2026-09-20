'use strict';
(function () {
// Real reasons, keyed by id. Every question in this file used to carry only
// "<b>X</b> is correct.", which restates the answer and teaches nothing.
const G4HG_EXPL = {
  'g4hg-cov-change-0': "A photograph taken at the time shows exactly what was there, so <b>an old photograph</b> is real evidence rather than someone's memory of it.",
  'g4hg-cov-change-1': "Something that was there before has been replaced by something different, and that is what <b>change</b> means.",
  'g4hg-cov-change-2': "The temple has stayed the same while other things around it changed. Staying the same over time is called <b>continuity</b>.",
  'g4hg-cov-change-3': "Putting <b>old and new pictures</b> side by side lets you see exactly what has altered and what has stayed.",
  'g4hg-cov-change-4': "Before cars were common, most people got about by <b>bicycle or cart</b>, often pulled by an animal.",
  'g4hg-cov-change-5': "A timeline puts events in <b>the order they happened</b>, so you can see what came first and what followed.",
  'g4hg-cov-change-6': "A supermarket is new, so its arrival shows the locality has <b>changed over the years</b>.",
  'g4hg-cov-change-7': "<b>What the walls are made of</b> can be compared directly between an old house and a new one, so it is a useful question. Materials changed as new ones became available.",
  'g4hg-cov-change-8': "A monument still standing in its original place is an example of <b>continuity</b> — something that has lasted.",
  'g4hg-cov-change-9': "<b>An old map</b> was drawn at the time it shows, which makes it evidence from the past rather than a later description.",
  'g4hg-cov-change-10': "A bridge where a wooden crossing used to be is something new replacing something old, so it is <b>change</b>.",
  'g4hg-cov-change-11': "An elderly person lived through it, so they can share <b>memories</b> — a kind of evidence you cannot get from a book.",
  'g4hg-cov-change-12': "Dates are what put events in order, so labelling them <b>shows when each event happened</b> and how far apart they were.",
  'g4hg-cov-buildings-0': "<b>A school</b> is built for learning, with classrooms and a playground.",
  'g4hg-cov-buildings-1': "<b>A hospital or clinic</b> is where doctors and nurses care for people who are ill or injured.",
  'g4hg-cov-buildings-2': "<b>A monument or statue</b> stands out and is easy to describe, so people use it to say where they are.",
  'g4hg-cov-buildings-3': "A post office is where people <b>send letters and parcels</b>, and collect them too.",
  'g4hg-cov-buildings-4': "An old building is evidence you can still walk into, so protecting it keeps what <b>it tells us about the past</b>.",
  'g4hg-cov-buildings-5': "<b>A mosque or temple</b> is a building set aside for worship and prayer.",
  'g4hg-cov-buildings-6': "A library holds books for everyone to share, so people go there to <b>borrow and read</b> them.",
  'g4hg-cov-buildings-7': "A town hall is where <b>local community services</b> are run from — meetings, records and local offices.",
  'g4hg-cov-buildings-8': "<b>A historic tower</b> is tall and unusual, so it can be seen and recognised from a distance.",
  'g4hg-cov-buildings-9': "A place of worship <b>matters deeply to many people</b>, so behaving respectfully there matters too.",
  'g4hg-cov-buildings-10': "A market building is where traders and customers meet to <b>buy and sell goods</b>.",
  'g4hg-cov-buildings-11': "A traveller catches a train at <b>a railway station</b>, where the platforms and ticket office are.",
  'g4hg-cov-buildings-12': "A monument cannot be replaced once it is damaged, so the first rule is to <b>never damage or mark it</b>.",
  'g4hg-cov-buildings-13': "A museum keeps real <b>objects from the past</b> and explains what they were for.",
  'g4hg-cov-festivals-0': "Divali is the festival of <b>lights</b>: families light lamps, and the lights stand for good overcoming darkness.",
  'g4hg-cov-festivals-1': "Eid ul-Fitr marks the end of <b>Ramadan</b>, the month of fasting, and is celebrated with prayers and a shared meal.",
  'g4hg-cov-festivals-2': "Christians celebrate Christmas in <b>December</b>, on the 25th.",
  'g4hg-cov-festivals-3': "Maha Shivaratri is a major festival for many <b>Hindu families</b> in Mauritius, when pilgrims walk to Grand Bassin.",
  'g4hg-cov-festivals-4': "The people who celebrate it know what it means to them, so the best way to learn is to <b>ask them</b> — politely and with interest.",
  'g4hg-cov-religions-0': "A <b>church</b> is where Christians gather to worship.",
  'g4hg-cov-religions-1': "A <b>mosque</b> is where Muslims gather for prayer.",
  'g4hg-cov-religions-2': "A <b>temple</b> is where Hindus worship.",
  'g4hg-cov-religions-3': "A <b>pagoda</b> is a place of worship linked with Buddhist and Chinese communities.",
  'g4hg-cov-religions-4': "A place of worship is important to the people who use it, so a visitor should <b>always be respectful</b>.",
  'g4hg-cov-religions-5': "Families, histories and communities differ, so <b>people hold different beliefs</b> — and in Mauritius many live side by side.",
  'g4hg-cov-religions-6': "<b>Listening without making fun</b> shows you take another person's belief seriously, even if you do not share it.",
  'g4hg-cov-religions-7': "People practise a religion in many ways, and <b>taking part in prayers</b> is one of the most common.",
  'g4hg-cov-religions-8': "Having people of many faiths in one country is called <b>religious diversity</b>.",
  'g4hg-cov-religions-9': "<b>No.</b> Judging someone for their religion is unfair, because they have not done anything wrong.",
  'g4hg-cov-religions-10': "Classmates can share <b>what the celebration means</b> to them, which is what others cannot find out on their own.",
  'g4hg-cov-religions-11': "Living among different faiths gives us the chance to <b>learn about one another</b> instead of guessing.",
  'g4hg-cov-religions-12': "A place of worship should be kept <b>clean, quiet and peaceful</b>, because people go there to pray and think.",
  'g4hg-cov-religions-13': "In a country of many cultures the value that holds it together is <b>respect for everyone</b>.",
  'g4hg-cov-religions-14': "<b>Yes.</b> Friendship is not decided by religion, and friends of different faiths are ordinary in Mauritius.",
  'g4hg-cov-religions-15': "Each sacred place has its own customs, so a visitor should <b>follow the rules of that place</b> — such as removing shoes or covering the head.",
  'g4hg-cov-religions-16': "Beliefs matter deeply to people, so discussing them kindly matters too: <b>everyone deserves respect</b>.",
  'g4hg-cov-food-0': "Families cook what has been passed down to them, so different traditional foods come from <b>their culture and traditions</b>.",
  'g4hg-cov-food-1': "If a food is new to you, the respectful thing is to <b>ask politely about it</b> rather than react to it.",
  'g4hg-cov-food-2': "Special clothing worn at a celebration is usually part of <b>a cultural tradition</b>, often handed down in the family.",
  'g4hg-cov-food-3': "What someone wears may be part of their culture or all their family can afford, and either way <b>everyone deserves respect</b>.",
  'g4hg-cov-food-4': "Living among many communities lets us <b>discover new tastes and foods</b> we would never have met otherwise.",
  'g4hg-cov-food-5': "Traditional dress is often kept for <b>a very special occasion</b> — a wedding, a festival or a religious ceremony.",
  'g4hg-cov-food-7': "Special dishes mark the day as different, so families prepare them for <b>festivals and holidays</b>.",
  'g4hg-cov-food-8': "What a family cooks and how they cook it shows <b>some of their traditions</b>, and often where their family came from.",
  'g4hg-cov-food-9': "Sitting and eating together gives people time to talk, so sharing a meal can <b>bring people together</b>.",
  'g4hg-cov-food-10': "<b>Saying thank you</b> shows you appreciate the food and the trouble someone took to make it.",
  'g4hg-cov-food-11': "Cultural clothing often has meaning and may have been handed down, so it deserves <b>great care and respect</b>.",
  'g4hg-cov-food-12': "A recipe handed down from grandparents is part of a family's <b>heritage</b> — something inherited rather than bought.",
  'g4hg-cov-food-13': "Food is part of how people live, so trying a new dish helps you <b>learn about another culture</b>.",
  'g4hg-cov-food-14': "The many foods and styles of dress here are a sign of our <b>cultural diversity</b>: many traditions in one country.",
  'g4hg-cov-food-15': "You are allowed not to want something. The polite way is to <b>say no thank you</b> without criticising the food.",
  'g4hg-cov-lang-0': "Mauritian Creole is the everyday language of most people in <b>Mauritius and Rodrigues</b>.",
  'g4hg-cov-lang-1': "<b>Yes.</b> English is the language of most schoolbooks, examinations and official documents here.",
  'g4hg-cov-lang-2': "<b>Yes.</b> French is widely used in Mauritius, in newspapers, on television and in daily conversation.",
  'g4hg-cov-lang-3': "Someone still learning needs time and clarity, so <b>speaking kindly and clearly</b> helps most.",
  'g4hg-cov-lang-4': "Each language you know adds the people you can talk to, so it helps you <b>communicate with more people</b>.",
  'g4hg-cov-lang-5': "<b>No.</b> An accent simply shows where someone comes from or what else they speak, and is nothing to laugh at.",
  'g4hg-cov-lang-6': "Language diversity means the people around you may speak <b>many different languages</b>.",
  'g4hg-cov-lang-7': "<b>\"How do you say this word?\"</b> shows genuine interest and invites the other person to teach you.",
  'g4hg-cov-lang-8': "Families come from different places and histories, so <b>their roots differ</b> and so do the languages spoken at home.",
  'g4hg-cov-lang-9': "If you do not understand, the useful thing is to <b>ask politely what it means</b> rather than stay lost.",
  'g4hg-cov-lang-10': "The language a person grew up with is often part of <b>their identity and culture</b>, not just a way of speaking.",
  'g4hg-cov-lang-11': "Taking the trouble to learn even a greeting shows <b>respect</b> for the other person and their language.",
  'g4hg-cov-lang-12': "<b>Letting everyone speak</b> means no one is shut out because of how they talk.",
  'g4hg-cov-lang-13': "<b>Yes.</b> Many Mauritians speak Creole, French and English, and often another language as well.",
  'g4hg-cov-lang-14': "Language is how people pass on <b>their ideas and stories</b>, from one person and one generation to the next.",
  'g4hg-cov-lang-15': "Each language carries a different way of seeing things, so diversity <b>helps us understand others</b>.",
  'g4hg-cov-lang-16': "A translation gives <b>the meaning in another language</b>, so people who do not share a language can still understand each other.",
  'g4hg-cov-lang-17': "Speaking differently is not speaking wrongly, so the right response is to <b>listen respectfully</b>.",
  'g4hg-cov-diversity-0': "Diversity means people in the same place can have <b>different cultures and customs</b>.",
  'g4hg-cov-diversity-1': "A diverse classroom includes children who <b>celebrate different festivals</b>, eat different foods and speak different languages.",
  'g4hg-cov-diversity-2': "A community lives together well when people <b>respect their differences</b> instead of expecting everyone to be the same.",
  'g4hg-cov-diversity-3': "If a tradition is new to you, you can <b>ask kind questions</b> — that shows interest rather than judgement.",
  'g4hg-cov-diversity-4': "Mauritius is called diverse because its <b>people come from many backgrounds</b> — African, Indian, Chinese and European.",
  'g4hg-cov-diversity-5': "Treating everyone fairly, whoever they are, is what we mean by <b>respect for all people</b>.",
  'g4hg-cov-diversity-6': "Hearing about each other's families helps classmates <b>understand each other</b> instead of guessing.",
  'g4hg-cov-diversity-7': "Being left out hurts, and the simplest thing you can do is <b>invite them to join in</b>.",
  'g4hg-cov-diversity-8': "Traditions different from your own are something to <b>appreciate and enjoy</b>, not something to be wary of.",
  'g4hg-cov-diversity-9': "Many traditions together bring many ways of cooking, celebrating and thinking, which makes a country <b>richer in ideas and customs</b>.",
  'g4hg-cov-diversity-10': "An inclusive action is one that <b>makes space for everyone</b>, so that no one is left outside.",
  'g4hg-cov-diversity-11': "A person's culture can include their <b>language, food and celebrations</b>, along with their beliefs and dress.",
  'g4hg-cov-diversity-12': "Listening to what others have lived through is how we <b>learn and show respect</b> at the same time.",
};
  const add = (id, chapterId, subsection, question, options, answer, hint, explanation) =>
    STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty: 2, question, options, answer, hint, explanation: G4HG_EXPL[id] || explanation }));
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
