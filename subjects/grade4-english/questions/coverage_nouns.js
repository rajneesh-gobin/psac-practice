'use strict';
// Grade 4 English coverage batch: the remaining noun sub-topics.  Each item
// practises the same syllabus skill in a fresh, child-friendly context.
(function () {
  const add = (id, subsection, question, options, answer, hint, explanation, difficulty = 2) => {
    STATIC_QUESTIONS.push(makeMCQ({ id, chapterId:'g4eng-nouns', subsection, difficulty, question, options, answer, hint, explanation }));
  };

  const pictures = [
    ['🐘','elephant'], ['⚽','football'], ['🚲','bicycle'], ['🏫','school'], ['🌈','rainbow'], ['🍍','pineapple'], ['🚢','ship'],
    ['🐢','turtle'], ['🎸','guitar'], ['🌋','volcano'], ['🚌','bus'], ['📚','books'], ['🏖️','beach'], ['🌳','tree']
  ];
  pictures.forEach(([picture, noun], i) => add(`g4eng-cover-pic-${String(i + 1).padStart(2,'0')}`, 'picture_nouns',
    `Look at ${picture}. Which noun names what you can see?`, [noun, 'quickly', 'beautiful', 'jump'], noun,
    'A noun names a person, place, animal or thing.', `<b>${noun}</b> is a naming word, so it is a noun.`));

  const plurals = [
    ['baby','babies','babys','babyes'], ['knife','knives','knifes','knifees'], ['bus','buses','buss','bus\'s'], ['tomato','tomatoes','tomatos','tomato\'s'],
    ['wolf','wolves','wolfs','wolfes'], ['city','cities','citys','cityes'], ['potato','potatoes','potatos','potato\'s'], ['box','boxes','boxs','box\'s'],
    ['woman','women','womans','womanes'], ['mouse','mice','mouses','mousees'], ['tooth','teeth','tooths','toothes'], ['foot','feet','foots','footes'],
    ['sheep','sheep','sheeps','sheepes','sheeves'], ['goose','geese','gooses','goosees'], ['half','halves','halfs','halfes'], ['dish','dishes','dishs','dish\'s'], ['cherry','cherries','cherrys','cherryes']
  ];
  plurals.forEach(([single, plural, wrong, wrong2, wrong3], i) => add(`g4eng-cover-plural-${String(i + 1).padStart(2,'0')}`, 'plurals',
    `What is the plural of "${single}"?`, [wrong, plural, wrong2, wrong3 || single], plural,
    'Think about the spelling rule, or remember whether this is an irregular plural.', `<b>${plural}</b> is the correct plural of <b>${single}</b>.`));

  const groups = [
    ['birds','flock'], ['cows','herd'], ['bees','swarm'], ['lions','pride'], ['wolves','pack'], ['grapes','bunch'], ['pupils','class'],
    ['fish','school'], ['elephants','herd'], ['ants','colony'], ['monkeys','troop'], ['dolphins','pod'], ['geese','gaggle'],
    ['singers','choir'], ['kittens','litter'], ['flowers','bouquet'], ['people','crowd']
  ];
  groups.forEach(([noun, group], i) => add(`g4eng-cover-group-${String(i + 1).padStart(2,'0')}`, 'collective',
    `Choose the collective noun: a ___ of ${noun}.`, [group === 'pack' ? 'flock' : 'pack', group, 'single', 'little'], group,
    'A collective noun names a group of people, animals or things.', `We say a <b>${group}</b> of ${noun}. <b>${group}</b> is a collective noun.`));

  const abstracts = [
    ['kindness','a feeling or quality'], ['bravery','a quality'], ['joy','a feeling'], ['honesty','a quality'], ['freedom','an idea'],
    ['anger','a feeling','Anger can make a calm person shout loudly.',['person','calm','shout']], ['friendship','a relationship'], ['hope','a feeling'], ['wisdom','a quality'], ['peace','an idea'],
    ['laughter','a feeling or sound'], ['beauty','a quality'], ['fear','a feeling','Fear can make a brave person tremble.',['person','brave','tremble']], ['love','a feeling'], ['pride','a feeling'],
    ['patience','a quality'], ['hunger','a feeling','Hunger can make a quiet baby cry loudly.',['baby','quiet','cry']], ['surprise','a feeling'], ['confidence','a quality']
  ];
  abstracts.forEach(([word, meaning, sentence, wrongs], i) => add(`g4eng-cover-abstract-${String(i + 1).padStart(2,'0')}`, 'abstract',
    `Which word is an abstract noun in this sentence: "${sentence || `${word[0].toUpperCase() + word.slice(1)} can make a difficult task easier.`}"`, wrongs ? [word, ...wrongs] : [word, 'task', 'difficult', 'easier'], word,
    'An abstract noun names something you cannot usually touch or hold.', `<b>${word}</b> is ${meaning}; you cannot hold it in your hand, so it is an abstract noun.`));

  const genders = [
    ['king','queen'], ['uncle','aunt'], ['nephew','niece'], ['husband','wife'], ['father','mother'], ['brother','sister'],
    ['son','daughter'], ['man','woman'], ['boy','girl'], ['actor','actress'], ['prince','princess'], ['waiter','waitress'],
    ['lion','lioness'], ['tiger','tigress'], ['rooster','hen'], ['drake','duck'], ['bull','cow'], ['stallion','mare'], ['ram','ewe']
  ];
  genders.forEach(([male, female], i) => add(`g4eng-cover-gender-${String(i + 1).padStart(2,'0')}`, 'gender',
    `Which word is the feminine form of "${male}"?`, [male, female, `${male}s`, 'person'], female,
    'Some nouns have a masculine and a feminine form.', `<b>${female}</b> is the feminine form of <b>${male}</b>.`));

  const pronouns = [
    ['Amina carries her bag.','She carries her bag.','Amina'], ['The boys are running.','They are running.','The boys'],
    ['Dad called Ravi.','Dad called him.','Ravi'], ['The cat is sleeping.','It is sleeping.','The cat'],
    ['Maya and I made a card.','We made a card.','Maya and I'], ['The teacher helped Ali and me.','The teacher helped us.','Ali and me'],
    ['I can see the girls.','I can see them.','the girls'], ['My brother has a bicycle.','He has a bicycle.','My brother'],
    ['The flowers need water.','They need water.','The flowers'], ['Mum gave the book to Asha.','Mum gave the book to her.','Asha'],
    ['Ravi and Neel have finished.','They have finished.','Ravi and Neel'], ['The puppy followed Mum.','It followed Mum.','The puppy'],
    ['My friends invited Sam and me.','My friends invited us.','Sam and me'], ['Nina found her ruler.','She found her ruler.','Nina'],
    ['The coach praised the players.','The coach praised them.','the players'], ['The baby is crying.','It is crying.','The baby'], ['You and I can help.','We can help.','You and I']
  ];
  pronouns.forEach(([original, replacement, noun], i) => add(`g4eng-cover-pronoun-${String(i + 1).padStart(2,'0')}`, 'pronouns',
    `Choose the best sentence to avoid repeating "${noun}".`, [original, replacement, `Because ${noun}.`, `And ${noun}.`], replacement,
    'A pronoun can replace a naming word.', `<b>${replacement}</b> uses a pronoun correctly instead of repeating <b>${noun}</b>.`));

  const proper = [
    ['country','Mauritius'], ['city','Port Louis'], ['girl','Ayesha'], ['day','Tuesday'], ['month','August'], ['ocean','Indian Ocean'],
    ['mountain','Le Morne Brabant'], ['river','Grand River South East'], ['school','Rivière des Anguilles Government School'], ['island','Rodrigues'], ['festival','Divali']
  ];
  proper.forEach(([common, name], i) => add(`g4eng-cover-proper-${String(i + 1).padStart(2,'0')}`, 'common_proper',
    `Which is a proper noun for the common noun "${common}"?`, [common, name, 'thing', 'place'], name,
    'A proper noun is a special name and begins with a capital letter.', `<b>${name}</b> is a specific name, so it is a proper noun.`));

  const contexts = [
    ['The farmer feeds the goats every morning.','farmer'], ['Our family visited the beach on Sunday.','family'], ['The tiny boat crossed the lagoon.','boat'],
    ['Leila painted a bright picture.','Leila'], ['The doctor spoke kindly to the patient.','doctor'], ['A storm shook the windows at night.','storm'],
    ['The children shared mangoes at break time.','children'], ['Grandma keeps her recipes in a notebook.','notebook'], ['The bus stopped outside the museum.','museum'],
    ['A fisherman repaired his net near the harbour.','fisherman'], ['The moon shone above the village.','moon'], ['The baker sold warm bread in the shop.','baker'],
    ['Our class planted seeds in the garden.','class'], ['The parrot copied a funny sound.','parrot'], ['We watched a film about volcanoes.','volcanoes'],
    ['The nurse checked the child\'s temperature.','nurse'], ['A rainbow appeared after the rain.','rainbow'], ['The library has many storybooks.','library']
  ];
  contexts.forEach(([sentence, noun], i) => add(`g4eng-cover-context-${String(i + 1).padStart(2,'0')}`, 'in_context',
    `Read: "${sentence}" Which word is a noun?`, [noun, 'the', 'at', 'kindly'], noun,
    'Find a word that names a person, place, animal, thing or idea.', `<b>${noun}</b> is a noun because it is a naming word in the sentence.`));
})();
