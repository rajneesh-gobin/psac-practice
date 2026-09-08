'use strict';
// Grade 6 English - precise noun, pronoun and determiner choices in context.
(function () {
  const add = (section, rows) => rows.forEach((r, i) => STATIC_QUESTIONS.push(makeMCQ({
    id: `g6eng-nx-${section}-${String(i + 1).padStart(2, '0')}`,
    chapterId: 'g6eng-nouns', subsection: section, difficulty: 3,
    question: r[0], options: r[1], answer: r[2], hint: r[3], explanation: r[4]
  })));

  add('collective', [
    ['A ___ of musicians performed at the school concert.',['band','fleet','swarm','litter'],'band','Choose the group word normally used for musicians.','A <b>band</b> is a group of musicians.'],
    ['We watched a ___ of ships enter the harbour.',['fleet','herd','bouquet','choir'],'fleet','This collective noun groups ships.','A <b>fleet</b> is a group of ships.'],
    ['A ___ of bees gathered around the hive.',['swarm','pack','school','pride'],'swarm','Think of insects moving together.','A <b>swarm</b> is a group of bees or similar insects.'],
    ['The farmer moved his ___ of cattle to another field.',['herd','flock','litter','crew'],'herd','Cattle commonly move in this kind of group.','A <b>herd</b> is a group of cattle.'],
    ['A ___ of singers rehearsed the national anthem.',['choir','team','fleet','bunch'],'choir','They sing together in parts.','A <b>choir</b> is an organised group of singers.'],
    ['The diver saw a ___ of fish near the reef.',['school','pack','pride','colony'],'school','This group word is used for fish.','A <b>school</b> is a group of fish swimming together.'],
    ['A ___ of lions rested under the trees.',['pride','flock','crew','class'],'pride','This is the special group word for lions.','A <b>pride</b> is a group of lions.'],
    ['The pilot and cabin attendants form the aircraft’s ___.',['crew','audience','committee','orchard'],'crew','They work together to operate the aircraft.','A <b>crew</b> is the group of people who operate a vehicle.'],
    ['The council appointed a ___ to investigate the problem.',['committee','bouquet','litter','pack'],'committee','This is a smaller group chosen to perform a task.','A <b>committee</b> is a group appointed for a particular duty.'],
    ['A ___ of actors came on stage for the final bow.',['cast','choir','fleet','herd'],'cast','It names all the performers in a play.','The <b>cast</b> is the group of actors in a production.'],
    ['We gave our teacher a ___ of flowers.',['bouquet','swarm','school','crew'],'bouquet','It is an arranged group of cut flowers.','A <b>bouquet</b> is an arranged bunch of flowers.'],
    ['The police searched for the ___ of thieves.',['gang','choir','flock','panel'],'gang','This word can describe criminals acting together.','A <b>gang</b> can mean a group of thieves.'],
    ['A ___ of experts judged the inventions.',['panel','litter','herd','fleet'],'panel','The group was selected to assess the work.','A <b>panel</b> is a selected group that discusses or judges something.'],
    ['The puppy belongs to a ___ of six young dogs.',['litter','pride','school','team'],'litter','Young animals born to one mother form this group.','A <b>litter</b> is a group of young animals born at the same time.'],
    ['A ___ of wolves crossed the snowy path.',['pack','swarm','class','bouquet'],'pack','This is the usual group word for wolves.','A <b>pack</b> is a group of wolves.'],
    ['The ___ applauded when the curtain fell.',['audience','crew','fleet','orchard'],'audience','These people were watching the performance.','The <b>audience</b> is the group watching or listening to a performance.'],
    ['A ___ of islands lies east of the mainland.',['group','litter','choir','panel'],'group','Choose the general collective noun suitable for islands.','A <b>group</b> of islands is a collection located together.']
  ]);

  add('pronouns', [
    ['Choose the correct pronoun: “The prize was shared between Asha and ___.”',['me','I','myself','mine'],'me','A pronoun after a preposition takes the object form.','<b>Me</b> is the object pronoun required after “between”.'],
    ['Choose the correct pronoun: “Neither Leena nor Ravi brought ___ notebook.”',['their','there','they’re','them'],'their','Modern English can use singular “they” when gender is not specified.','<b>Their</b> is the possessive determiner referring to either pupil.'],
    ['Choose the correct pronoun: “The players organised the practice by ___.”',['themselves','theirselves','themself','ourselves'],'themselves','The reflexive pronoun must agree with the plural subject.','<b>Themselves</b> agrees with “the players”.'],
    ['Choose the correct relative pronoun: “The scientist ___ visited us studies coral reefs.”',['who','which','whose','whomsoever'],'who','The pronoun is the subject and refers to a person.','<b>Who</b> introduces a clause describing the scientist.'],
    ['Choose the correct relative pronoun: “This is the camera ___ lens was damaged.”',['whose','who','whom','what'],'whose','The sentence shows possession.','<b>Whose</b> links the camera to its lens.'],
    ['Choose the correct pronoun: “My sister is taller than ___.”',['I am','me am','myself is','mine am'],'I am','Complete the comparison with a subject pronoun and verb.','<b>I am</b> gives the full grammatical comparison.'],
    ['Choose the correct pronoun: “Please give the forms to Amir and ___.”',['her','she','hers','herself'],'her','The people receive the forms, so use an object pronoun.','<b>Her</b> is the object pronoun required after “to”.'],
    ['Choose the correct pronoun: “The blue bicycle is ___.”',['mine','my','me','myself'],'mine','A possessive pronoun stands alone without a following noun.','<b>Mine</b> replaces “my bicycle”.'],
    ['Choose the correct pronoun: “___ of the two answers is correct?”',['Which','Who','Whose','Where'],'Which','The question asks someone to choose between things.','<b>Which</b> asks for a choice from known options.'],
    ['Choose the correct pronoun: “Everyone should check ___ work carefully.”',['their','our','your','its'],'their','The pronoun must refer back inclusively to “everyone”.','Singular <b>their</b> is a standard inclusive reference to “everyone”.'],
    ['Choose the correct pronoun: “The kitten cleaned ___ after eating.”',['itself','himself','themselves','it'],'itself','The action returns to the animal subject.','<b>Itself</b> is the reflexive pronoun agreeing with “kitten”.'],
    ['Choose the correct relative pronoun: “The book ___ I borrowed is overdue.”',['that','who','whose','where'],'that','The pronoun refers to a thing receiving the action.','<b>That</b> introduces the clause describing the book.'],
    ['Choose the correct pronoun: “Sara and I made the poster; ___ will present it.”',['we','us','they','our'],'we','The speakers are the subject doing the presenting.','<b>We</b> is the subject pronoun replacing “Sara and I”.'],
    ['Choose the correct pronoun: “To ___ did the principal speak?”',['whom','who','whose','which'],'whom','Formal usage requires an object after the preposition “to”.','<b>Whom</b> is the object of the preposition “to”.'],
    ['Choose the correct pronoun: “These gloves are ours, but those are ___.”',['theirs','their','them','themselves'],'theirs','Use a possessive pronoun that can stand alone.','<b>Theirs</b> means “their gloves” without repeating the noun.']
  ]);

  add('determiners', [
    ['Choose the best determiner: “There is ___ information in this leaflet.”',['a great deal of','many','several','a few'],'a great deal of','Information is uncountable.','<b>A great deal of</b> correctly describes a large amount of information.'],
    ['Choose the best determiner: “___ of the three solutions worked.”',['None','Neither','Either','Every'],'None','Not one solution worked, and there are more than two.','<b>None</b> means not one of the three.'],
    ['Choose the best determiner: “___ pupil must submit one form.”',['Each','Many','Few','Both'],'Each','The rule applies individually to every pupil.','<b>Each</b> focuses on every pupil one at a time.'],
    ['Choose the best determiner: “Only ___ paint remained in the tin.”',['a little','a few','many','several'],'a little','Paint is treated as an uncountable amount.','<b>A little</b> describes a small amount of paint.'],
    ['Choose the best determiner: “___ books on this shelf belong to the library.”',['All the','Much','Every the','A little'],'All the','The statement includes the complete known group.','<b>All the</b> refers to every book in the identified group.'],
    ['Choose the best determiner: “We have ___ time, so work carefully.”',['plenty of','many','a few','several'],'plenty of','Time is uncountable and the meaning is more than enough.','<b>Plenty of</b> means more than enough time.'],
    ['Choose the best determiner: “___ of my parents can attend the meeting.”',['Both','Every','Much','Each the'],'Both','The sentence includes the two parents together.','<b>Both</b> refers to the two parents.'],
    ['Choose the best determiner: “There were too ___ mistakes to ignore.”',['many','much','little','every'],'many','Mistakes are plural and countable.','<b>Many</b> follows “too” with a plural countable noun.'],
    ['Choose the best determiner: “The tank contains very ___ water.”',['little','few','many','several'],'little','Water is uncountable and the meaning is not enough.','<b>Little</b> describes a small, insufficient amount of water.'],
    ['Choose the best determiner: “You may choose ___ of these two seats.”',['either','any three','every','much'],'either','The choice is one of exactly two.','<b>Either</b> means one or the other of two.'],
    ['Choose the best determiner: “___ students volunteered, but we needed ten.”',['A few','A little','Much','Every'],'A few','Students are countable; some volunteered, but not enough.','<b>A few</b> means a small number of countable people.'],
    ['Choose the best determiner: “Have you completed ___ homework yet?”',['your','yours','you','yourself'],'your','A possessive determiner comes before the noun.','<b>Your</b> correctly modifies “homework”.'],
    ['Choose the best determiner: “I have visited this museum ___ times.”',['several','much','every','a little'],'several','Times are countable and the exact number is not given.','<b>Several</b> indicates an unspecified number greater than two.'],
    ['Choose the best determiner: “Is there ___ juice left in the carton?”',['any','many','few','every'],'any','Questions often use this word with an unspecified amount.','<b>Any</b> is natural in a question about an unknown amount.'],
    ['Choose the best determiner: “___ answer could be accepted because both were correct.”',['Either','Neither','Every','Much'],'Either','One or the other of two acceptable answers may be chosen.','<b>Either</b> means one of the two, with both choices possible.'],
    ['Choose the best determiner: “She spent ___ her savings on the bicycle.”',['most of','many of','every of','a few of'],'most of','The phrase refers to the larger part of a known amount.','<b>Most of</b> means the greater part of her savings.'],
    ['Choose the best determiner: “___ notebook on the desk is yours: the red one or the blue one?”',['Which','What much','Every','Several'],'Which','The listener chooses from a limited, known set.','<b>Which</b> asks for a choice between the two identified notebooks.']
  ]);

  add('common_proper', [
    ['Which sentence uses capital letters correctly?',['We visited Black River Gorges National Park.','We visited black river gorges national park.','We visited Black river Gorges national park.','We Visited Black River gorges National Park.'],'We visited Black River Gorges National Park.','Every important word in the official place name needs a capital.','<b>Black River Gorges National Park</b> is a proper name.'],
    ['Which word is a common noun in “Professor Devi teaches science at Rose Hill”?',['science','Professor Devi','Rose Hill','Devi'],'science','A common noun gives a general name, not a specific one.','<b>Science</b> is the general name of a subject.'],
    ['Which pair contains two proper nouns?',['Mauritius and Rodrigues','island and village','teacher and pupil','river and mountain'],'Mauritius and Rodrigues','Proper nouns name particular places.','<b>Mauritius</b> and <b>Rodrigues</b> are specific place names.'],
    ['Choose the correctly capitalised title and name.',['Dr Amina Patel','dr Amina patel','Dr amina Patel','dr. amina patel'],'Dr Amina Patel','Capitalise the title and each part of the person’s name.','<b>Dr Amina Patel</b> correctly capitalises the title and name.'],
    ['Which sentence contains a proper noun used as the name of an event?',['Sports Day begins on Friday.','The children enjoy games.','Our event begins soon.','A race starts at noon.'],'Sports Day begins on Friday.','Look for the official name of a particular event.','<b>Sports Day</b> is the specific name of the event.'],
    ['Which noun should begin with a capital letter in “we study english on monday”?',['English','study','on','we'],'English','Names of languages are proper nouns.','<b>English</b> is a language name and must begin with a capital letter.'],
    ['Which sentence uses a common noun followed by a proper noun correctly?',['The ocean called the Indian Ocean surrounds Mauritius.','The Ocean called the indian ocean surrounds Mauritius.','The ocean called the Indian ocean surrounds mauritius.','The Ocean called the Indian Ocean surrounds mauritius.'],'The ocean called the Indian Ocean surrounds Mauritius.','General labels stay lower-case; exact names take capitals.','<b>ocean</b> is common, while <b>Indian Ocean</b> and <b>Mauritius</b> are proper.'],
    ['Which is the proper noun in “Our class toured the Eureka House museum”?',['Eureka House','class','museum','toured'],'Eureka House','Find the exact name of a place.','<b>Eureka House</b> is the specific name of the place.'],
    ['Choose the correctly capitalised day and month.',['Tuesday, 8 September','tuesday, 8 september','Tuesday, 8 september','tuesday, 8 September'],'Tuesday, 8 September','Days and months begin with capitals.','<b>Tuesday</b> and <b>September</b> are proper names and need capitals.'],
    ['Which option contains only common nouns?',['harbour, ship, captain','Port Louis, ship, captain','harbour, Mauritius, captain','Indian Ocean, harbour, ship'],'harbour, ship, captain','Common nouns are general names and do not identify a unique place.','<b>Harbour, ship, captain</b> are all general names.'],
    ['Which sentence correctly distinguishes a title from a general role?',['The principal introduced Principal Wong.','The Principal introduced principal Wong.','The principal introduced principal wong.','The Principal introduced Principal wong.'],'The principal introduced Principal Wong.','A general role is lower-case; a title before a name is capitalised.','The first <b>principal</b> is general; <b>Principal Wong</b> is a title and name.'],
    ['Which noun phrase is a specific organisation and therefore a proper noun?',['Mauritius Wildlife Foundation','the wildlife group','a conservation team','the local organisation'],'Mauritius Wildlife Foundation','Look for an official organisation name.','<b>Mauritius Wildlife Foundation</b> is the specific name of an organisation.']
  ]);

  add('cloze', [
    ['Complete the sentence with the most precise noun: “The scientist recorded each ___ made during the experiment.”',['observation','observe','observing','observant'],'observation','A noun is needed after “each”.','<b>Observation</b> is the noun naming something noticed and recorded.'],
    ['Complete the sentence: “The council reached a ___ after examining the evidence.”',['decision','decide','decisive','deciding'],'decision','The article “a” signals that a noun is needed.','<b>Decision</b> is the noun formed from “decide”.'],
    ['Complete the sentence: “Her clear ___ helped everyone understand the process.”',['explanation','explain','explanatory','explainingly'],'explanation','A possessive determiner and adjective are followed by a noun.','<b>Explanation</b> is the noun that fits after “her clear”.'],
    ['Complete the sentence: “Protecting the reef is our shared ___.”',['responsibility','responsible','responsibly','respond'],'responsibility','The complement names a duty or obligation.','<b>Responsibility</b> is the abstract noun naming a duty.'],
    ['Complete the sentence: “The team celebrated its remarkable ___.”',['achievement','achieve','achievable','achievingly'],'achievement','A possessive determiner and adjective require a noun.','<b>Achievement</b> is the noun naming what the team accomplished.']
  ]);
})();
