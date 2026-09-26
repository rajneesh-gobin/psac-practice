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
  'g4hg-cov-religions-2': "A <b>temple</b> with statues of Shiva, Ganesh and other gods is where Hindus worship. A Chinese pagoda is the place of worship for Buddhist families.",
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
const G4HG_LEARN = {
  'g4hg-cov-change-1': '<b>Change</b> in history means something is different now from how it was before — a new road where a footpath used to be, or a modern shop where an old house once stood. Historians compare evidence from the past (old photographs, maps, buildings) with the present to identify what has changed.',
  'g4hg-cov-change-2': '<b>Continuity</b> means something has stayed the same over time. A temple that has stood in the same place for generations is an example of continuity. Historians look for both change AND continuity when studying how a place has developed.',
  'g4hg-cov-festivals-0': '<b>Divali</b> (also spelled Diwali) is the Hindu festival of lights, usually celebrated in October or November. Families light oil lamps and candles to symbolise the victory of light over darkness and good over evil. It is one of the most widely celebrated festivals in Mauritius.',
  'g4hg-cov-festivals-1': '<b>Eid ul-Fitr</b> is celebrated by Muslims at the end of Ramadan, the holy month of fasting. Families attend prayers, share a special meal, give to charity (Zakat al-Fitr), and exchange greetings. In Mauritius, it is a public holiday observed by the whole country.',
  'g4hg-cov-religions-8': '<b>Religious diversity</b> means that a country or community is home to people of many different faiths. Mauritius is one of the most religiously diverse nations in the world, with significant Hindu, Muslim, Christian and Buddhist communities living side by side, sharing the same public spaces and national celebrations.',
  'g4hg-cov-diversity-0': '<b>Cultural diversity</b> means a community includes people from different backgrounds who have different customs, languages, religions and traditions. In Mauritius, people of African, Indian, Chinese and European heritage have all contributed to a rich, shared national culture that is unique in the world.',
  'g4hg-cov-lang-4': 'Being <b>multilingual</b> — able to speak more than one language — is a great advantage. It allows you to communicate with more people, understand different cultures, and access more opportunities in education and work. Many Mauritians speak Creole, French and English, and sometimes a heritage language as well.',
};
  const add = (id, chapterId, subsection, question, options, answer, hint, explanation) =>
    STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty: 2, question, options, answer, hint, explanation: G4HG_EXPL[id] || explanation, learnMore: G4HG_LEARN[id] || '' }));
  const rows = (prefix, chapterId, subsection, data, options, hint, explanation) => data.forEach(([question, answer], i) =>
    add(`g4hg-cov-${prefix}-${i}`, chapterId, subsection, question, options, answer, hint, explanation(answer)));

  rows('locality', 'g4hist-locality', 'types_locality', [
    ['A place with beaches, a lagoon and fishing boats is a…', 'coastal locality'],
    ['A place with fields, fewer buildings and farms is usually a…', 'rural locality']
  ], ['urban locality', 'rural locality', 'coastal locality'], 'Think about what you would see in that place.', a => `<b>${a}</b> matches this description.`);

  // change
  const HINT_CHANGE = 'Look for clues about what stayed the same and what became different.';
  add('g4hg-cov-change-0', 'g4hist-locality', 'change', 'Which item helps us learn what a locality looked like long ago?', ['an old photograph of it', 'a story someone made up', 'a modern tourist leaflet', 'a recent school project'], 'an old photograph of it', HINT_CHANGE);
  add('g4hg-cov-change-1', 'g4hist-locality', 'change', 'A new road built where there was once a footpath is an example of…', ['change in the locality', 'continuity over time', 'a natural disaster', 'a local tradition'], 'change in the locality', HINT_CHANGE);
  add('g4hg-cov-change-2', 'g4hist-locality', 'change', 'A village keeps the same old temple. This is an example of…', ['continuity over time', 'change in the locality', 'a modern improvement', 'a new tradition'], 'continuity over time', HINT_CHANGE);
  add('g4hg-cov-change-3', 'g4hist-locality', 'change', 'To compare the past with today, it is useful to use…', ['old and new pictures', 'only a modern photograph', 'a story someone invented', "a list of today's prices"], 'old and new pictures', HINT_CHANGE);
  add('g4hg-cov-change-4', 'g4hist-locality', 'change', 'Which transport was common before many people owned cars?', ['a bicycle or a cart', 'a motor bus', 'a motor boat', 'an aeroplane'], 'a bicycle or a cart', HINT_CHANGE);
  add('g4hg-cov-change-5', 'g4hist-locality', 'change', 'A timeline helps us put events in…', ['the order they happened', 'alphabetical order', 'order of importance', 'the order we prefer'], 'the order they happened', HINT_CHANGE);
  add('g4hg-cov-change-6', 'g4hist-locality', 'change', 'A new supermarket in a village shows that the locality has…', ['changed over the years', 'stayed exactly the same', 'lost all its old buildings', 'moved to another place'], 'changed over the years', HINT_CHANGE);
  add('g4hg-cov-change-7', 'g4hist-locality', 'change', 'Which question is useful when comparing old and new houses?', ['What are the walls made of?', 'How many people live inside?', 'What colour are the curtains?', 'Who owns the house today?'], 'What are the walls made of?', HINT_CHANGE);
  add('g4hg-cov-change-8', 'g4hist-locality', 'change', 'A monument that remains in the same place shows…', ['continuity over time', 'change in the locality', 'a recent addition', 'a new tradition'], 'continuity over time', HINT_CHANGE);
  add('g4hg-cov-change-9', 'g4hist-locality', 'change', 'Which source is evidence from the past?', ['an old map of the area', 'a leaflet printed this year', 'a recent school project', 'a story told by a child'], 'an old map of the area', HINT_CHANGE);
  add('g4hg-cov-change-10', 'g4hist-locality', 'change', 'A bridge replacing a small wooden crossing is an example of…', ['change in the locality', 'continuity over time', 'a natural event', 'a local celebration'], 'change in the locality', HINT_CHANGE);
  add('g4hg-cov-change-11', 'g4hist-locality', 'change', 'What can an elderly person share about the past?', ['memories of the locality', 'facts from a school textbook', 'a map drawn last year', 'a photograph taken recently'], 'memories of the locality', HINT_CHANGE);
  add('g4hg-cov-change-12', 'g4hist-locality', 'change', 'Why do we label dates on a timeline?', ['to show when events happened', 'to make it look colourful', 'to list the people involved', 'to describe the weather'], 'to show when events happened', HINT_CHANGE);

  // buildings
  const HINT_BLDG = 'Think about the purpose of the building.';
  add('g4hg-cov-buildings-0', 'g4hist-locality', 'buildings', 'Which building is used for learning?', ['a school building', 'a hospital or clinic', 'a market building', 'a railway station'], 'a school building', HINT_BLDG);
  add('g4hg-cov-buildings-1', 'g4hist-locality', 'buildings', 'Which building is used for medical care?', ['a hospital or clinic', 'a school building', 'a post office', 'a library building'], 'a hospital or clinic', HINT_BLDG);
  add('g4hg-cov-buildings-2', 'g4hist-locality', 'buildings', 'Which landmark can help people recognise a place?', ['a monument or statue', 'an ordinary house', 'a small garden wall', 'a private car park'], 'a monument or statue', HINT_BLDG);
  add('g4hg-cov-buildings-3', 'g4hist-locality', 'buildings', 'A post office is a building where people can…', ['send letters and parcels', 'buy and sell food', 'borrow and read books', 'see a doctor or nurse'], 'send letters and parcels', HINT_BLDG);
  add('g4hg-cov-buildings-4', 'g4hist-locality', 'buildings', 'Why are old buildings sometimes protected?', ['they tell us about the past', 'they are always the largest', 'they are the cheapest to maintain', 'they are made of modern materials'], 'they tell us about the past', HINT_BLDG);
  add('g4hg-cov-buildings-5', 'g4hist-locality', 'buildings', 'Which building is a place of worship?', ['a mosque or temple', 'a hospital or clinic', 'a market building', 'a town hall'], 'a mosque or temple', HINT_BLDG);
  add('g4hg-cov-buildings-6', 'g4hist-locality', 'buildings', 'A library is a place where people can…', ['borrow and read books', 'buy and sell goods', 'send letters and parcels', 'see a doctor or nurse'], 'borrow and read books', HINT_BLDG);
  add('g4hg-cov-buildings-7', 'g4hist-locality', 'buildings', 'What can a town hall be used for?', ['local community services', 'buying and selling goods', 'caring for the sick', 'storing food for festivals'], 'local community services', HINT_BLDG);
  add('g4hg-cov-buildings-8', 'g4hist-locality', 'buildings', 'Which feature is most likely to be a landmark?', ['a historic tower', 'a small garden wall', 'an ordinary bus stop', 'a regular lamp post'], 'a historic tower', HINT_BLDG);
  add('g4hg-cov-buildings-9', 'g4hist-locality', 'buildings', 'Why should we respect places of worship?', ['they matter to many people', 'they are always the oldest buildings', 'they are always the largest', 'they are painted the brightest'], 'they matter to many people', HINT_BLDG);
  add('g4hg-cov-buildings-10', 'g4hist-locality', 'buildings', 'A market building is used mainly to…', ['buy and sell goods', 'borrow and read books', 'send letters and parcels', 'treat the sick and injured'], 'buy and sell goods', HINT_BLDG);
  add('g4hg-cov-buildings-11', 'g4hist-locality', 'buildings', 'Which building helps travellers catch a train?', ['a railway station', 'a post office', 'a town hall', 'a market building'], 'a railway station', HINT_BLDG);
  add('g4hg-cov-buildings-12', 'g4hist-locality', 'buildings', 'What is one way to care for an old monument?', ['never damage or mark it', 'paint over it every year', 'move it to a storage room', 'take a small piece home'], 'never damage or mark it', HINT_BLDG);
  add('g4hg-cov-buildings-13', 'g4hist-locality', 'buildings', 'A museum helps visitors learn about…', ['objects from the past', 'how to build new houses', 'where to buy food today', 'which trains to catch'], 'objects from the past', HINT_BLDG);

  // festivals
  const HINT_FEST = 'Remember that different communities may celebrate in different ways.';
  add('g4hg-cov-festivals-0', 'g4hist-community', 'festivals', 'Divali is often called the festival of…', ['lights and lamps', 'colours and water', 'drums and dancing', 'gifts and feasting'], 'lights and lamps', HINT_FEST);
  add('g4hg-cov-festivals-1', 'g4hist-community', 'festivals', 'At Eid ul-Fitr, many Muslim families celebrate the end of…', ['the month of Ramadan', 'the harvest season', 'the school holiday', 'a long pilgrimage'], 'the month of Ramadan', HINT_FEST);
  add('g4hg-cov-festivals-2', 'g4hist-community', 'festivals', 'Christmas is celebrated by many Christians in…', ['December each year', 'March each year', 'August each year', 'October each year'], 'December each year', HINT_FEST);
  add('g4hg-cov-festivals-3', 'g4hist-community', 'festivals', 'Maha Shivaratri is important to many…', ['Hindu families here', 'Christian families here', 'Muslim families here', 'Buddhist families here'], 'Hindu families here', HINT_FEST);
  add('g4hg-cov-festivals-4', 'g4hist-community', 'festivals', 'A good way to learn about a festival is to…', ['ask those who celebrate it', 'read only one old book', 'decide it is not for you', 'wait until it is over'], 'ask those who celebrate it', HINT_FEST);

  // religions
  const HINT_REL = 'Choose the respectful and accurate answer.';
  add('g4hg-cov-religions-0', 'g4hist-community', 'religions', 'A church is a place of worship for many…', ['Christian families here', 'Muslim families here', 'Hindu families here', 'Buddhist families here'], 'Christian families here', HINT_REL);
  add('g4hg-cov-religions-1', 'g4hist-community', 'religions', 'A mosque is a place of worship for many…', ['Muslim families here', 'Christian families here', 'Hindu families here', 'Buddhist families here'], 'Muslim families here', HINT_REL);
  add('g4hg-cov-religions-2', 'g4hist-community', 'religions', 'A temple with statues of gods such as Shiva and Ganesh is a place of worship for many…', ['Hindu families here', 'Christian families here', 'Muslim families here', 'Buddhist families here'], 'Hindu families here', HINT_REL);
  add('g4hg-cov-religions-3', 'g4hist-community', 'religions', 'A pagoda is linked to many…', ['Buddhist families here', 'Hindu families here', 'Muslim families here', 'Christian families here'], 'Buddhist families here', HINT_REL);
  add('g4hg-cov-religions-4', 'g4hist-community', 'religions', 'What should you do when visiting any place of worship?', ['always be respectful', 'take photographs freely', 'speak loudly inside', 'leave as quickly as possible'], 'always be respectful', HINT_REL);
  add('g4hg-cov-religions-5', 'g4hist-community', 'religions', 'Why do people have different religions?', ['people have different beliefs', 'one religion is always right', 'all religions say the same things', 'only adults choose a religion'], 'people have different beliefs', HINT_REL);
  add('g4hg-cov-religions-6', 'g4hist-community', 'religions', 'Which action shows respect for a different faith?', ['listening without making fun', 'asking rude questions', 'refusing to listen', 'laughing at their customs'], 'listening without making fun', HINT_REL);
  add('g4hg-cov-religions-7', 'g4hist-community', 'religions', 'A person may practise a religion by…', ['taking part in prayers', 'refusing to speak to others', 'staying indoors always', 'wearing only white'], 'taking part in prayers', HINT_REL);
  add('g4hg-cov-religions-8', 'g4hist-community', 'religions', 'Mauritius has people from many religious backgrounds. This is called…', ['religious diversity', 'religious conflict', 'cultural isolation', 'a single tradition'], 'religious diversity', HINT_REL);
  add('g4hg-cov-religions-9', 'g4hist-community', 'religions', 'Is it kind to judge someone because of their religion?', ['No, it is never kind', 'Yes, always', 'Yes, sometimes', 'Only for adults'], 'No, it is never kind', HINT_REL);
  add('g4hg-cov-religions-10', 'g4hist-community', 'religions', 'What can classmates share about their celebrations?', ['what the celebration means', 'how much everything costs', 'which shops to visit', 'how long the holiday lasts'], 'what the celebration means', HINT_REL);
  add('g4hg-cov-religions-11', 'g4hist-community', 'religions', 'Religious diversity can help us…', ['learn about one another', 'argue more often', 'avoid each other', 'forget our own traditions'], 'learn about one another', HINT_REL);
  add('g4hg-cov-religions-12', 'g4hist-community', 'religions', 'A place of worship should be kept…', ['clean, quiet and peaceful', 'loud and busy always', 'locked at all times', 'bright and colourful always'], 'clean, quiet and peaceful', HINT_REL);
  add('g4hg-cov-religions-13', 'g4hist-community', 'religions', 'Which value is important in a diverse country?', ['respect for everyone', 'following only one tradition', 'avoiding those who differ', 'celebrating only your own festivals'], 'respect for everyone', HINT_REL);
  add('g4hg-cov-religions-14', 'g4hist-community', 'religions', 'Can two friends have different religions?', ['Yes, of course they can', 'No, never at all', 'Only if parents agree', 'Only when they are adults'], 'Yes, of course they can', HINT_REL);
  add('g4hg-cov-religions-15', 'g4hist-community', 'religions', 'What should a visitor do before entering a sacred place?', ['follow the rules of that place', 'take a photograph first', 'bring a food gift always', 'wait outside at all times'], 'follow the rules of that place', HINT_REL);
  add('g4hg-cov-religions-16', 'g4hist-community', 'religions', 'Why is kindness important when discussing beliefs?', ['everyone deserves respect', 'beliefs are not important', 'it makes talks shorter', 'it is only a school rule'], 'everyone deserves respect', HINT_REL);

  // food and dress
  const HINT_FOOD = 'Think about respect and learning from one another.';
  add('g4hg-cov-food-0', 'g4hist-community', 'food_dress', 'Different families may eat different traditional foods because of…', ['their culture and traditions', 'the price of ingredients', 'what shops are nearby', 'what the weather is like'], 'their culture and traditions', HINT_FOOD);
  add('g4hg-cov-food-1', 'g4hist-community', 'food_dress', 'A respectful response to unfamiliar food is to…', ['ask politely about it', 'refuse it without a word', 'make a face at it', 'push it away quickly'], 'ask politely about it', HINT_FOOD);
  add('g4hg-cov-food-2', 'g4hist-community', 'food_dress', 'Clothing worn at a celebration can show…', ['a cultural tradition', 'the latest fashion trend', 'how much money someone has', 'the colour of their school'], 'a cultural tradition', HINT_FOOD);
  add('g4hg-cov-food-3', 'g4hist-community', 'food_dress', "Why should we never make fun of someone's clothes?", ['everyone deserves respect', 'clothes are always expensive', 'it is a school rule only', 'teachers will punish you'], 'everyone deserves respect', HINT_FOOD);
  add('g4hg-cov-food-4', 'g4hist-community', 'food_dress', 'Food from different communities lets us…', ['discover new tastes and food', 'save money on meals', 'eat faster at school', 'avoid going to shops'], 'discover new tastes and food', HINT_FOOD);
  add('g4hg-cov-food-5', 'g4hist-community', 'food_dress', 'Traditional dress may be worn especially for…', ['a very special occasion', 'everyday shopping trips', 'a sports lesson at school', 'any ordinary weekday'], 'a very special occasion', HINT_FOOD);
  add('g4hg-cov-food-6', 'g4hist-community', 'food_dress', 'What is a good way to describe food you have not tried?', ['It is quite new to me.', 'It looks disgusting.', 'I will never try that.', 'That smells strange.'], 'It is quite new to me.', HINT_FOOD, '<b>It is quite new to me.</b> is kind and honest — it says the food is unfamiliar without criticising it.');
  add('g4hg-cov-food-7', 'g4hist-community', 'food_dress', 'Families may prepare special dishes for…', ['festivals and holidays', 'ordinary school lunches', 'a quick weekday breakfast', 'a trip to the market'], 'festivals and holidays', HINT_FOOD);
  add('g4hg-cov-food-8', 'g4hist-community', 'food_dress', 'What can food tell us about a family?', ['some of their traditions', 'how much money they have', 'which school they attend', 'where they go on holiday'], 'some of their traditions', HINT_FOOD);
  add('g4hg-cov-food-9', 'g4hist-community', 'food_dress', 'It is good to share meals with others because it can…', ['bring people together', 'make food last longer', 'save money on cooking', 'keep the kitchen clean'], 'bring people together', HINT_FOOD);
  add('g4hg-cov-food-10', 'g4hist-community', 'food_dress', 'Which action is polite at a shared meal?', ['saying thank you kindly', 'taking the largest portion', 'leaving without a word', 'talking with your mouth full'], 'saying thank you kindly', HINT_FOOD);
  add('g4hg-cov-food-11', 'g4hist-community', 'food_dress', 'Cultural clothing should be treated with…', ['great care and respect', 'little concern at all', 'only water and soap', 'a light-hearted attitude'], 'great care and respect', HINT_FOOD);
  add('g4hg-cov-food-12', 'g4hist-community', 'food_dress', 'A recipe passed down in a family is part of its…', ['heritage and history', 'shopping budget', 'weekly timetable', 'school curriculum'], 'heritage and history', HINT_FOOD);
  add('g4hg-cov-food-13', 'g4hist-community', 'food_dress', 'Trying a new dish can help you…', ['learn about another culture', 'win a cooking prize', 'save money on food', 'impress your teacher'], 'learn about another culture', HINT_FOOD);
  add('g4hg-cov-food-14', 'g4hist-community', 'food_dress', 'Different foods and clothes in Mauritius show…', ['our cultural diversity', 'our shopping habits', 'the local weather', 'our school uniform rules'], 'our cultural diversity', HINT_FOOD);
  add('g4hg-cov-food-15', 'g4hist-community', 'food_dress', 'What should you do if you do not want to eat a food?', ['say no thank you politely', 'throw it away quickly', 'make a disgusted face', 'demand something else'], 'say no thank you politely', HINT_FOOD);

  // languages
  const HINT_LANG = 'Think about how it feels when someone makes the effort to greet you in your own language.';
  add('g4hg-cov-lang-0', 'g4hist-community', 'languages', 'Mauritian Creole is spoken by many people in…', ['Mauritius and Rodrigues', 'France and Belgium', 'India and Pakistan', 'England and Scotland'], 'Mauritius and Rodrigues', HINT_LANG);
  add('g4hg-cov-lang-1', 'g4hist-community', 'languages', 'English is used officially in many Mauritian schools and offices.', ['Yes, that is quite true', 'No, that is not true', 'Only in private schools', 'Only for older students'], 'Yes, that is quite true', HINT_LANG);
  add('g4hg-cov-lang-2', 'g4hist-community', 'languages', 'French is one of the languages many Mauritians use.', ['Yes, that is quite true', 'No, it is never used here', 'Only for cooking recipes', 'Only on public holidays'], 'Yes, that is quite true', HINT_LANG);
  add('g4hg-cov-lang-3', 'g4hist-community', 'languages', 'Which action helps a friend who is learning a language?', ['speak kindly and clearly', 'speak as fast as possible', 'use only difficult words', 'ignore their mistakes loudly'], 'speak kindly and clearly', HINT_LANG);
  add('g4hg-cov-lang-4', 'g4hist-community', 'languages', 'Knowing more than one language can help us…', ['communicate with more people', 'win more games at school', 'get higher marks in maths', 'finish homework faster'], 'communicate with more people', HINT_LANG);
  add('g4hg-cov-lang-5', 'g4hist-community', 'languages', "Should we laugh at someone's accent?", ['No, we should never do that', 'Yes, if it sounds funny', 'Yes, with their permission', 'Only among close friends'], 'No, we should never do that', HINT_LANG);
  add('g4hg-cov-lang-6', 'g4hist-community', 'languages', 'Language diversity means people may speak…', ['many different languages', 'only one shared language', 'the same language always', 'only official languages'], 'many different languages', HINT_LANG);
  add('g4hg-cov-lang-7', 'g4hist-community', 'languages', 'A respectful way to ask about a language is…', ['How do you say this word?', 'Why do you speak like that?', 'Can you please stop talking?', "Why can't you speak normally?"], 'How do you say this word?', HINT_LANG);
  add('g4hg-cov-lang-8', 'g4hist-community', 'languages', 'Why can families use different languages at home?', ['they have different roots', 'they have more televisions', 'they live in bigger houses', 'they have more children'], 'they have different roots', HINT_LANG);
  add('g4hg-cov-lang-9', 'g4hist-community', 'languages', 'What can you do if you do not understand a word?', ['ask politely what it means', 'pretend you understood', 'walk away immediately', 'laugh at the word instead'], 'ask politely what it means', HINT_LANG);
  add('g4hg-cov-lang-10', 'g4hist-community', 'languages', "A language can be part of a person's…", ['own identity and culture', 'weekly school timetable', 'sports team selection', 'favourite television show'], 'own identity and culture', HINT_LANG);
  add('g4hg-cov-lang-11', 'g4hist-community', 'languages', 'Learning greetings in another language shows…', ['respect for other people', 'disrespect for your own language', 'a wish to change schools', 'a dislike of your own culture'], 'respect for other people', HINT_LANG);
  add('g4hg-cov-lang-12', 'g4hist-community', 'languages', 'Which is a good classroom rule?', ['Let everyone speak freely', "Speak only the teacher's language", 'Stay silent at all times', 'Speak only if you are fluent'], 'Let everyone speak freely', HINT_LANG);
  add('g4hg-cov-lang-13', 'g4hist-community', 'languages', 'Can one person speak several languages?', ['Yes, many people can do so', 'No, it is impossible', 'Only language teachers can', 'Only adults can manage it'], 'Yes, many people can do so', HINT_LANG);
  add('g4hg-cov-lang-14', 'g4hist-community', 'languages', 'Languages help people share…', ['their ideas and stories', 'their school uniforms', 'their lunch boxes', 'their sports equipment'], 'their ideas and stories', HINT_LANG);
  add('g4hg-cov-lang-15', 'g4hist-community', 'languages', 'Why do we value language diversity?', ['it helps us understand others', 'it makes exams easier', 'it shortens school days', 'it reduces homework'], 'it helps us understand others', HINT_LANG);
  add('g4hg-cov-lang-16', 'g4hist-community', 'languages', 'A translation tells us…', ['the meaning in another language', 'the spelling in our language', 'the history of a word', 'the sound of a letter'], 'the meaning in another language', HINT_LANG);
  add('g4hg-cov-lang-17', 'g4hist-community', 'languages', 'When a classmate speaks differently, you should…', ['listen to them respectfully', 'correct them immediately', 'ask them to be quiet', 'repeat what they said mockingly'], 'listen to them respectfully', HINT_LANG);

  // diversity
  const HINT_DIV = 'Look for the answer that includes and respects everyone.';
  add('g4hg-cov-diversity-0', 'g4hist-community', 'diversity', 'Diversity means that people can have…', ['different cultures and customs', 'exactly the same habits', 'only one type of food', 'the same festivals always'], 'different cultures and customs', HINT_DIV);
  add('g4hg-cov-diversity-1', 'g4hist-community', 'diversity', 'A diverse classroom can include children who…', ['celebrate different festivals', 'all wear the same clothes', 'all eat the same food', 'all speak one language only'], 'celebrate different festivals', HINT_DIV);
  add('g4hg-cov-diversity-2', 'g4hist-community', 'diversity', 'What helps a community live happily together?', ['respecting differences', 'ignoring each other', 'expecting everyone to be the same', 'avoiding new traditions'], 'respecting differences', HINT_DIV);
  add('g4hg-cov-diversity-3', 'g4hist-community', 'diversity', "If a friend's tradition is new to you, you can…", ['ask kind questions about it', 'tell them it is wrong', 'walk away from them', 'make fun of their tradition'], 'ask kind questions about it', HINT_DIV);
  add('g4hg-cov-diversity-4', 'g4hist-community', 'diversity', 'Why is Mauritius described as diverse?', ['people have many backgrounds', 'it has one religion only', 'everyone speaks one language', 'its food never changes'], 'people have many backgrounds', HINT_DIV);
  add('g4hg-cov-diversity-5', 'g4hist-community', 'diversity', 'Which word means treating everyone fairly?', ['respect for all people', 'respect for winners only', 'fairness for close friends', 'kindness for family only'], 'respect for all people', HINT_DIV);
  add('g4hg-cov-diversity-6', 'g4hist-community', 'diversity', 'Sharing stories about families can help classmates…', ['understand each other', 'win class prizes', 'finish their work faster', 'score better in tests'], 'understand each other', HINT_DIV);
  add('g4hg-cov-diversity-7', 'g4hist-community', 'diversity', 'What should you do when someone is left out?', ['invite them to join in', 'ignore the situation', 'tell a teacher only', 'look the other way'], 'invite them to join in', HINT_DIV);
  add('g4hg-cov-diversity-8', 'g4hist-community', 'diversity', 'Different traditions are something to…', ['to appreciate and enjoy', 'to avoid and ignore', 'to argue about always', 'to find confusing'], 'to appreciate and enjoy', HINT_DIV);
  add('g4hg-cov-diversity-9', 'g4hist-community', 'diversity', 'Diversity can make a country…', ['richer in ideas and customs', 'harder to govern', 'poorer in traditions', 'smaller in population'], 'richer in ideas and customs', HINT_DIV);
  add('g4hg-cov-diversity-10', 'g4hist-community', 'diversity', 'What is an inclusive action?', ['making space for everyone', 'keeping a small group together', 'choosing only close friends', 'working alone always'], 'making space for everyone', HINT_DIV);
  add('g4hg-cov-diversity-11', 'g4hist-community', 'diversity', "A person's culture may include their…", ['language, food and celebrations', 'height, weight and age', 'exam scores and grades', 'favourite sports only'], 'language, food and celebrations', HINT_DIV);
  add('g4hg-cov-diversity-12', 'g4hist-community', 'diversity', "Why should we listen to others' experiences?", ['to learn and show respect', 'to win an argument', 'to copy their answers', 'to fill in time at school'], 'to learn and show respect', HINT_DIV);
})();
