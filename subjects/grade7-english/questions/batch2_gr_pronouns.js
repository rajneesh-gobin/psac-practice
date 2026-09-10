'use strict';
// Grade 7 English — Grammar · Pronouns, batch 2 (011–020)

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7eng-gr-pronouns-011', chapterId:'g7eng-gr-pronouns', difficulty:1,
    subsection:'personal_possessive',
    question:'Choose the correct word: "That bag is ___, not yours."',
    options:['mine','my','me','myself'],
    answer:'mine',
    hint:'After "is" you need a word that stands alone, with no noun after it.',
    explanation:'"Mine" is a possessive pronoun and needs no noun after it, which is why it matches "yours". "My" must be followed by a noun, "me" is an object pronoun, and "myself" is reflexive.' }),

  makeMCQ({ id:'g7eng-gr-pronouns-012', chapterId:'g7eng-gr-pronouns', difficulty:2,
    subsection:'personal_possessive',
    question:'Choose the correct word: "The school has changed ___ uniform this year."',
    options:['its',"it's","its'",'it'],
    answer:'its',
    hint:'The apostrophe in "it\'s" always stands for "it is" or "it has".',
    explanation:'<b>Its</b> is the possessive form and takes no apostrophe at all. "It\'s" means "it is", which makes nonsense of the sentence; "its\'" does not exist in English; and "it" on its own cannot show possession.' }),

  makeMCQ({ id:'g7eng-gr-pronouns-013', chapterId:'g7eng-gr-pronouns', difficulty:2,
    subsection:'personal_possessive',
    question:'Choose the correct pronoun: "This is a secret between you and ___."',
    options:['me','I','myself','mine'],
    answer:'me',
    hint:'"Between" is a preposition, and prepositions are followed by object pronouns.',
    explanation:'After a preposition English uses the object pronoun <b>me</b>. "I" is the subject form, "myself" is reflexive and would need "I" earlier in the sentence, and "mine" shows possession rather than naming a person.' }),

  makeMCQ({ id:'g7eng-gr-pronouns-014', chapterId:'g7eng-gr-pronouns', difficulty:3,
    subsection:'personal_possessive',
    question:'Choose the correct word: "Everyone must bring ___ own lunch on the day of the outing."',
    options:['their','they','theirs','them'],
    answer:'their',
    hint:'You need a word that can stand directly in front of "own lunch".',
    explanation:'<b>Their</b> is a possessive adjective and can be followed by a noun; it is the usual choice after "everyone" when the group includes boys and girls. "They" and "them" cannot come before a noun, and "theirs" stands alone with no noun after it.' }),

  makeText({ id:'g7eng-gr-pronouns-015', chapterId:'g7eng-gr-pronouns', difficulty:2,
    subsection:'personal_possessive',
    question:'Replace the words in bold with ONE pronoun: "<b>Ravi and I</b> visited the Blue Penny Museum."',
    answer:'we',
    hint:'The pair are doing the visiting, so you need a subject pronoun.',
    explanation:'"Ravi and I" is the subject of the sentence, so it becomes <b>we</b>. "Us" is an object pronoun and could not start the sentence, and "they" would leave you out of the group.' }),

  makeMCQ({ id:'g7eng-gr-pronouns-016', chapterId:'g7eng-gr-pronouns', difficulty:2,
    subsection:'relative_pronouns',
    question:'Which sentence is CORRECT?',
    options:['The parcel that arrived was heavy.','The parcel who arrived was heavy.','The parcel whose arrived was heavy.','The parcel whom arrived was heavy.'],
    answer:'The parcel that arrived was heavy.',
    hint:'A parcel is a thing, not a person.',
    explanation:'"That" (or "which") is the relative pronoun for things. "Who" and "whom" are only for people, and "whose" shows possession, so it must be followed by the noun that is owned.' }),

  makeMCQ({ id:'g7eng-gr-pronouns-017', chapterId:'g7eng-gr-pronouns', difficulty:2,
    subsection:'relative_pronouns',
    question:'Choose the correct relative word: "Mahébourg is the town ___ my grandmother was born."',
    options:['where','which','who','when'],
    answer:'where',
    hint:'The relative word has to stand for a PLACE.',
    explanation:'<b>Where</b> replaces "in which" and refers to a place — the town. "Which" would need "in" in front of it, "who" is for people, and "when" refers to a time.' }),

  makeMCQ({ id:'g7eng-gr-pronouns-018', chapterId:'g7eng-gr-pronouns', difficulty:3,
    subsection:'relative_pronouns',
    question:'In which sentence is the relative pronoun the OBJECT, so that it could be left out?',
    options:['The book which I borrowed was torn.','The girl who won the prize smiled.','The dog that bit him ran away.','The man who called was angry.'],
    answer:'The book which I borrowed was torn.',
    hint:'Ask whether the relative pronoun does the action or receives it.',
    explanation:'In "the book which I borrowed", it is "I" who does the borrowing, so "which" is the object and can be dropped: "The book I borrowed was torn." In the other three the relative pronoun is the subject of its own clause — who won, that bit, who called — so it must stay.' }),

  makeMCQ({ id:'g7eng-gr-pronouns-019', chapterId:'g7eng-gr-pronouns', difficulty:3,
    subsection:'relative_pronouns',
    question:'Choose the correct word: "Port Louis, ___ is the capital of Mauritius, has a busy harbour."',
    options:['which','that','where','what'],
    answer:'which',
    hint:'After a comma, one of these four is never used.',
    explanation:'<b>Which</b> introduces a non-defining clause set off by commas. "That" is never used in that pattern, "where" would have to introduce something happening inside Port Louis, and "what" cannot follow a noun at all.' }),

  makeText({ id:'g7eng-gr-pronouns-020', chapterId:'g7eng-gr-pronouns', difficulty:2,
    subsection:'relative_pronouns',
    question:'Complete with ONE word: "The nurse ___ looked after me at the hospital was very kind."',
    answer:'who',
    alsoAccept:['that'],
    hint:'The nurse is a person, and the missing word is the subject of "looked after".',
    explanation:'<b>Who</b> is the relative pronoun for people, and "that" is also accepted in a defining clause like this one. "Which" would be wrong because a nurse is a person, and "whose" would need a noun after it to show what the nurse owns.' })

);
