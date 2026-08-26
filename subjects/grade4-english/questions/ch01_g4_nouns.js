'use strict';
// Grade 4 English - Chapter: Nouns, Pronouns & Articles
// IDs format: g4eng-noun-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4eng-noun-001', chapterId:'g4eng-nouns', subsection:'common_proper', difficulty:1,
    question:'Which of the following is a PROPER noun?',
    options:['dog','school','Mauritius','teacher'],
    answer:'Mauritius',
    hint:'A proper noun is the specific name of a person, place or thing. It always starts with a capital letter.',
    explanation:'<b>Mauritius</b> is a proper noun - it is the specific name of our country and always begins with a capital letter. Dog, school and teacher are common nouns - they name general things and do not need capitals.' }),

  makeMCQ({ id:'g4eng-noun-002', chapterId:'g4eng-nouns', subsection:'articles', difficulty:1,
    question:'Choose the correct article: "I saw ___ owl in the tree."',
    options:['a','an','the','some'],
    answer:'an',
    hint:'Use "an" before a word that starts with a vowel sound (a, e, i, o, u).',
    explanation:'We use <b>an</b> before words beginning with a vowel sound. "Owl" starts with the vowel "o", so we say <b>an owl</b>. We use "a" before consonant sounds: a cat, a dog, a tree.' }),

  makeMCQ({ id:'g4eng-noun-003', chapterId:'g4eng-nouns', subsection:'plurals', difficulty:1,
    question:'What is the PLURAL of "child"?',
    options:['childs','childes','children','childrens'],
    answer:'children',
    hint:'Some plurals are irregular - they do NOT follow the usual rule of adding -s or -es.',
    explanation:'"Child" has the irregular plural <b>children</b>. Irregular plurals must be memorised: child→children, man→men, woman→women, tooth→teeth, foot→feet, mouse→mice, goose→geese.' }),

  makeTF({ id:'g4eng-noun-004', chapterId:'g4eng-nouns', subsection:'common_proper', difficulty:1,
    question:'"Happiness" is a noun.',
    answer:true,
    hint:'Nouns name not only people and objects, but also feelings and ideas.',
    explanation:'<b>True.</b> "Happiness" is an <b>abstract noun</b> - it names a feeling that cannot be seen or touched. Other abstract nouns: love, kindness, freedom, anger, courage, honesty.' }),

  makeMCQ({ id:'g4eng-noun-005', chapterId:'g4eng-nouns', subsection:'collective', difficulty:2,
    question:'What is the COLLECTIVE NOUN for a group of fish?',
    options:['a herd of fish','a flock of fish','a school of fish','a pack of fish'],
    answer:'a school of fish',
    hint:'Think of the special group name used for fish.',
    explanation:'A <b>school</b> of fish is the correct collective noun. Other collective nouns to know: a flock of birds/sheep, a herd of cows/elephants, a pack of wolves, a swarm of bees, a pride of lions, a class of students.' }),

  makeMCQ({ id:'g4eng-noun-006', chapterId:'g4eng-nouns', subsection:'plurals', difficulty:2,
    question:'What is the PLURAL of "leaf"?',
    options:['leafs','leafes','leaves','leave'],
    answer:'leaves',
    hint:'Words ending in "-f" often change to "-ves" in the plural.',
    explanation:'"Leaf" changes to <b>leaves</b>. Many nouns ending in -f or -fe change to -ves in the plural: leaf→leaves, half→halves, knife→knives, life→lives, wolf→wolves. But some keep -s: roof→roofs, chef→chefs.' }),

  makeMCQ({ id:'g4eng-noun-007', chapterId:'g4eng-nouns', subsection:'pronouns', difficulty:1,
    question:'Which word is a PRONOUN in: "She gave him a gift."',
    options:['gave','gift','She','a'],
    answer:'She',
    hint:'A pronoun replaces a noun. Look for words like he, she, it, they, him, her, me.',
    explanation:'"<b>She</b>" is a subject pronoun - it replaces the name of the person giving the gift. "Him" is also a pronoun in this sentence. Pronouns avoid repeating names: instead of "Meena gave Raj a gift", we say "She gave him a gift."' }),

  makeMCQ({ id:'g4eng-noun-008', chapterId:'g4eng-nouns', subsection:'articles', difficulty:2,
    question:'Which sentence uses "the" CORRECTLY?',
    options:[
      'I want to be the doctor one day.',
      'The sun sets in the west.',
      'She has the beautiful dress.',
      'He is the good student.'
    ],
    answer:'The sun sets in the west.',
    hint:'"The" is used for something specific and unique, or something already identified.',
    explanation:'"<b>The sun sets in the west</b>" is correct - we use <b>the</b> for unique, one-of-a-kind things (the sun, the moon, the west). "I want to be <b>a</b> doctor" is correct - it refers to the job in general, not a specific doctor.' }),

  makeNum({ id:'g4eng-noun-009', chapterId:'g4eng-nouns', subsection:'in_context', difficulty:2,
    question:'How many NOUNS are in: "The children played football in the park."? Write a number.',
    answer:'3', acceptableAnswers:['3'],
    hint:'Find all the naming words: people, things and places.',
    explanation:'There are <b>3 nouns</b>: "children" (people), "football" (thing), "park" (place). "The" is an article, "played" is a verb, "in" is a preposition. Always look for naming words to identify nouns.' }),

  makeMCQ({ id:'g4eng-noun-010', chapterId:'g4eng-nouns', subsection:'pronouns', difficulty:4,
    question:'Read this passage: "Asha found a puppy near the school gate. She brought it home and fed it some milk. Her parents were surprised when they saw it." Which pronoun refers to ASHA\'S PARENTS?',
    options:['She','it','Her','they'],
    answer:'they',
    hint:'Find who "they" refers to - which noun in the passage comes before this pronoun?',
    explanation:'"<b>They</b>" refers to Asha\'s parents - "they saw it" means her parents saw the puppy. Tracking what each pronoun refers back to (its antecedent) is a key comprehension skill. "She" = Asha. "It" = the puppy. "Her" = Asha (possessive).' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4eng-noun-011', chapterId:'g4eng-nouns', subsection:'collective', difficulty:1,
    question:'What is the COLLECTIVE NOUN for a group of bees?',
    options:['a flock','a herd','a swarm','a pack'],
    answer:'a swarm',
    hint:'Think of the special name for a large buzzing group of bees.',
    explanation:'A <b>swarm</b> of bees. Key collective nouns to know: a swarm of bees, a flock of birds/sheep, a herd of cows/elephants, a pack of wolves, a pride of lions, a school of fish, a bunch of grapes.' }),

  makeMCQ({ id:'g4eng-noun-012', chapterId:'g4eng-nouns', subsection:'plurals', difficulty:1,
    question:'What is the PLURAL of "man"?',
    options:['mans','manes','men','mens'],
    answer:'men',
    hint:'This is an irregular plural - it does not follow the -s rule.',
    explanation:'"Man" has the irregular plural <b>men</b>. Irregular plurals must be memorised: man→men, woman→women, child→children, tooth→teeth, foot→feet, mouse→mice, ox→oxen.' }),

  makeTF({ id:'g4eng-noun-013', chapterId:'g4eng-nouns', subsection:'common_proper', difficulty:1,
    question:'"Monday" is a proper noun and should always begin with a capital letter.',
    answer:true,
    hint:'Names of days of the week are proper nouns.',
    explanation:'<b>True.</b> Days of the week (Monday, Tuesday…) and months (January, February…) are proper nouns and always begin with a capital letter. Many students forget to capitalise days and months.' }),

  makeMCQ({ id:'g4eng-noun-014', chapterId:'g4eng-nouns', subsection:'articles', difficulty:1,
    question:'Choose the correct article: "She found ___ umbrella on the bus."',
    options:['a','an','the','-'],
    answer:'an',
    hint:'"Umbrella" starts with the vowel sound "u". Which article do we use before a vowel sound?',
    explanation:'We use <b>an</b> before words beginning with a vowel sound: an umbrella, an apple, an egg, an ice cube, an orange. "Umbrella" begins with "u" (a vowel), so we write "an umbrella".' }),

  makeMCQ({ id:'g4eng-noun-015', chapterId:'g4eng-nouns', subsection:'pronouns', difficulty:2,
    question:'Which word in this sentence is a POSSESSIVE PRONOUN: "That book is mine."',
    options:['That','book','is','mine'],
    answer:'mine',
    hint:'A possessive pronoun shows ownership without using a noun after it.',
    explanation:'"<b>Mine</b>" is a possessive pronoun - it shows the book belongs to "me". Possessive pronouns: mine, yours, his, hers, ours, theirs. Compare: "my book" (possessive adjective before a noun) vs "that book is mine" (possessive pronoun standing alone).' }),

  makeMCQ({ id:'g4eng-noun-016', chapterId:'g4eng-nouns', subsection:'gender', difficulty:2,
    question:'What is the FEMININE form of "lion"?',
    options:['liones','lionette','lioness','lady lion'],
    answer:'lioness',
    hint:'Many feminine animal nouns are formed by adding -ess to the masculine form.',
    explanation:'"<b>Lioness</b>" is the feminine form of lion. Masculine/feminine pairs to know: lion/lioness, tiger/tigress, actor/actress, prince/princess, waiter/waitress, host/hostess.' }),

  makeMCQ({ id:'g4eng-noun-017', chapterId:'g4eng-nouns', subsection:'abstract', difficulty:2,
    question:'Which of the following is an ABSTRACT noun?',
    options:['chair','Priya','river','courage'],
    answer:'courage',
    hint:'An abstract noun names something you cannot touch or see - like a feeling or quality.',
    explanation:'"<b>Courage</b>" is an abstract noun - it names a quality that cannot be touched or seen. "Chair" and "river" are concrete nouns. "Priya" is a proper noun. Other abstract nouns: love, hope, beauty, fear, justice, wisdom, honesty.' }),

  makeMCQ({ id:'g4eng-noun-018', chapterId:'g4eng-nouns', subsection:'collective', difficulty:3,
    question:'Which noun in this sentence is a COLLECTIVE noun: "The teacher watched the class as they worked quietly."',
    options:['teacher','class','they','quietly'],
    answer:'class',
    hint:'A collective noun names a group of people or things as a single unit.',
    explanation:'"<b>Class</b>" is a collective noun - it names a group of students treated as one unit. Other collective nouns for groups of people: team, audience, crew, staff, family, crowd, committee, choir.' }),

  makeMCQ({ id:'g4eng-noun-019', chapterId:'g4eng-nouns', subsection:'common_proper', difficulty:4,
    question:'Read: "Every evening, the family gathers in their kitchen. Grandmother prepares dal and rice while the children do homework." How many COMMON nouns are in these two sentences?',
    options:['5','6','7','8'],
    answer:'7',
    hint:'Common nouns are general naming words (not specific names of people or places). Find all nouns, then remove any proper nouns.',
    explanation:'The 7 common nouns are: <b>evening, family, kitchen, dal, rice, children, homework</b>. "Grandmother" is capitalised here and used as a title/name (a proper noun). "Their" is a pronoun. Identifying common nouns from a passage is a key MIE Grade 4 grammar skill.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4eng-noun-020', chapterId:'g4eng-nouns', subsection:'picture_nouns', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Stack_of_books_01.svg" alt="an object" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What is the noun for the object shown in this picture?</b>',
    options:['pen','paper','shelf','book'],
    answer:'book',
    hint:'You read it — it has pages and a cover.',
    explanation:'"<b>Book</b>" is a common countable noun. We say "a book" (singular) or "books" (plural). It names a physical object you can read. Notice we use "a book" — not "an book" — because "book" starts with a consonant sound.' }),

  makeMCQ({ id:'g4eng-noun-021', chapterId:'g4eng-nouns', subsection:'picture_nouns', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Red_Apple.jpg" alt="a fruit" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What is the noun for the fruit shown in this picture?</b>',
    options:['orange','mango','apple','grape'],
    answer:'apple',
    hint:'This red fruit grows on trees and starts with the letter A.',
    explanation:'"<b>Apple</b>" is a common countable noun naming a fruit. Notice we use the article "<b>an</b> apple" — because "apple" starts with a vowel sound (a, e, i, o, u), we use "an", not "a".' }),

  makeMCQ({ id:'g4eng-noun-022', chapterId:'g4eng-nouns', subsection:'common_proper', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Windsor_chair.jpg" alt="a piece of furniture" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What is the noun for this piece of furniture?</b>',
    options:['table','bed','desk','chair'],
    answer:'chair',
    hint:'You sit on it — it usually has four legs and a back.',
    explanation:'"<b>Chair</b>" is a common countable noun naming a piece of furniture. We say "a chair" (singular) and "chairs" (plural). Common nouns name general objects and do not need a capital letter.' }),

  makeMCQ({ id:'g4eng-noun-023', chapterId:'g4eng-nouns', subsection:'picture_nouns', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Canis_lupus_familiaris.jpg" alt="a pet animal" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>The animal shown is called a "dog". Which type of noun is "dog"?</b>',
    options:['proper noun','abstract noun','collective noun','common noun'],
    answer:'common noun',
    hint:'Does "dog" name a specific individual with a capital letter, or a general type of animal?',
    explanation:'"<b>Dog</b>" is a <b>common noun</b> — it names a type of animal in general, without a capital letter. If you gave the dog a specific name (like Rex or Buddy), that name would be a <b>proper noun</b>, which always starts with a capital letter.' }),

  makeMCQ({ id:'g4eng-noun-024', chapterId:'g4eng-nouns', subsection:'picture_nouns', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Classroom.jpg" alt="a classroom scene" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>Look at the scene. Which word names the PLACE shown in this picture?</b>',
    options:['learn','quiet','sit','classroom'],
    answer:'classroom',
    hint:'Nouns name persons, places or things. Which option is a place?',
    explanation:'"<b>Classroom</b>" is a common noun naming a place where students learn. Nouns that name places: classroom, school, park, library, market. "Learn" and "sit" are verbs; "quiet" is an adjective — none of these are nouns.' }),

  makeMCQ({ id:'g4eng-noun-025', chapterId:'g4eng-nouns', subsection:'in_context', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Running_arp.jpg" alt="a person running" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>In the sentence "The athlete is <u>running</u> fast", what part of speech is the underlined word?</b>',
    options:['noun','adjective','adverb','verb'],
    answer:'verb',
    hint:'"Running" describes an action the athlete is doing. What part of speech describes actions?',
    explanation:'"<b>Running</b>" is a <b>verb</b> in this sentence — it describes the action being performed. Verbs are doing/action words: run, jump, eat, sleep, play. (Note: "running" can sometimes be a noun — e.g. "Running is good exercise" — but in "The athlete is running", it acts as a verb.)' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4eng-noun-026', chapterId:'g4eng-nouns', subsection:'picture_nouns', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Elephant.jpg" alt="a large animal" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What is the noun for the animal shown in this picture?</b>',
    options:['rhino','hippo','elephant','giraffe'],
    answer:'elephant',
    hint:'It has a long trunk and very large ears.',
    explanation:'"<b>Elephant</b>" is a common countable noun naming an animal. It is one of the largest land animals, known for its long trunk and big ears.' }),

  makeMCQ({ id:'g4eng-noun-027', chapterId:'g4eng-nouns', subsection:'common_proper', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Hat.jpg" alt="an item of clothing" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What is the noun for this item of clothing?</b>',
    options:['scarf','hat','glove','shoe'],
    answer:'hat',
    hint:'You wear it on your head.',
    explanation:'"<b>Hat</b>" is a common countable noun naming an item of clothing worn on the head. Other clothing nouns: scarf, glove, shoe, coat.' }),

  makeMCQ({ id:'g4eng-noun-028', chapterId:'g4eng-nouns', subsection:'common_proper', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Ruler.jpg" alt="a school object" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What is the noun for this school object?</b>',
    options:['pencil','ruler','eraser','pen'],
    answer:'ruler',
    hint:'You use it to draw straight lines and measure length.',
    explanation:'"<b>Ruler</b>" is a common countable noun naming a piece of school equipment used for measuring and drawing straight lines.' }),

  makeMCQ({ id:'g4eng-noun-029', chapterId:'g4eng-nouns', subsection:'common_proper', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Scissors.jpg" alt="a tool" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What is the noun for this tool?</b>',
    options:['stapler','glue','scissors','tape'],
    answer:'scissors',
    hint:'It has two blades and is used for cutting paper.',
    explanation:'"<b>Scissors</b>" is a noun naming a cutting tool. Note: "scissors" is always plural in English (like "trousers" and "glasses") — we say "a pair of scissors", not "a scissor".' }),

  makeMCQ({ id:'g4eng-noun-030', chapterId:'g4eng-nouns', subsection:'common_proper', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Cup.jpg" alt="an object" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What is the noun for this object?</b>',
    options:['plate','bowl','cup','spoon'],
    answer:'cup',
    hint:'You drink from it — it usually has a handle.',
    explanation:'"<b>Cup</b>" is a common countable noun naming a small container with a handle, used for drinking.' }),

  makeMCQ({ id:'g4eng-noun-031', chapterId:'g4eng-nouns', subsection:'picture_nouns', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Turtle.jpg" alt="an animal" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What is the noun for the animal shown in this picture?</b>',
    options:['crab','turtle','frog','lizard'],
    answer:'turtle',
    hint:'It has a hard shell on its back and moves slowly.',
    explanation:'"<b>Turtle</b>" is a common countable noun naming a reptile with a protective shell. Turtles are known for moving slowly on land.' })

);
