'use strict';
// Grade 7 English — Listening & Comprehension, batch 2 (013–019)
// No audio exists in this app: every item quotes an extract the pupil reads and
// then reasons about, which is the same decision a listener has to make.

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7eng-listening-013', chapterId:'g7eng-listening', difficulty:2,
    subsection:'identifying_message',
    question:'At assembly you hear: <i>"Buses for the Grade 7 trip to Ile aux Cerfs leave from Gate B at 6.45 a.m., not 7 a.m. as printed on the letter."</i><br>Which note should a good listener write down?',
    options:['Gate B, 6.45 a.m., not 7 a.m.','Gate B, 7 a.m., as in the letter','Ile aux Cerfs, letter from Gate B','Grade 7 trip, buses at assembly'],
    answer:'Gate B, 6.45 a.m., not 7 a.m.',
    hint:'The speaker corrects one piece of information. Which one?',
    explanation:'The whole point of the announcement is the correction: the gate and the <b>new</b> time. "7 a.m., as in the letter" copies the very time the speaker is correcting, and the other two notes repeat words from the sentence without the detail a traveller actually needs.' }),

  makeMCQ({ id:'g7eng-listening-014', chapterId:'g7eng-listening', difficulty:2,
    subsection:'identifying_message',
    question:'You hear: <i>"Take out your exercise books and copy the diagram from the board. Anil, please close the window."</i><br>Who is MOST likely speaking?',
    options:['A teacher in a classroom','A pupil in a classroom','A shopkeeper in a shop','A librarian in a library'],
    answer:'A teacher in a classroom',
    hint:'Who can give an instruction to a whole class and call one pupil by name?',
    explanation:'Only a teacher instructs a whole class and then tells a named pupil to close the window. A pupil has no authority to set the class to work, and neither a shop nor a library has exercise books and a board.' }),

  makeMCQ({ id:'g7eng-listening-015', chapterId:'g7eng-listening', difficulty:2,
    subsection:'vocabulary_context',
    question:'The ferry captain announces: <i>"The crossing to Rodrigues may be rough this evening, so please stay seated."</i><br>What does <b>rough</b> mean here?',
    options:['with strong waves','rocky and uneven','unkind and rude','roughly correct'],
    answer:'with strong waves',
    hint:'"Rough" has several meanings. The captain is talking about the sea.',
    explanation:'"Rough" describes a sea with strong waves — which is exactly why passengers must stay seated. "Rocky and uneven" fits a road, "unkind and rude" fits a person, and "roughly correct" fits an estimate; none of them makes sense on a ferry crossing.' }),

  makeText({ id:'g7eng-listening-016', chapterId:'g7eng-listening', difficulty:2,
    subsection:'vocabulary_context',
    question:'You hear a guide say: <i>"After the rain the path up Le Morne is treacherous, so we will take the road instead."</i><br>Write ONE word that means the same as <b>treacherous</b> here.',
    answer:'dangerous',
    alsoAccept:['unsafe','risky','perilous','slippery','hazardous','very dangerous'],
    hint:'Why does the guide change the route? Find one word for the state of the path.',
    explanation:'The guide avoids the path because it has become <b>dangerous</b> (unsafe, risky, slippery) after rain. "Treacherous" does not mean steep or long — neither of those would be changed by the rain, so neither would make the guide take the road.' }),

  makeMCQ({ id:'g7eng-listening-017', chapterId:'g7eng-listening', difficulty:3,
    subsection:'identifying_message',
    question:'A coach tells his team after a match: <i>"Well… we trained for six weeks for this. I suppose there is always next season."</i><br>How does the coach most likely FEEL?',
    options:['Disappointed but resigned','Delighted with the result','Angry with the referee','Confused about the score'],
    answer:'Disappointed but resigned',
    hint:'Listen to the pause and to "I suppose". Do they sound like good news?',
    explanation:'The hesitation, the reminder of six weeks of training and "I suppose there is always next season" together show disappointment that the coach is accepting. Nothing suggests delight, he blames nobody, and he clearly knows what the score was.' }),

  makeMCQ({ id:'g7eng-listening-018', chapterId:'g7eng-listening', difficulty:2,
    subsection:'identifying_message',
    question:'A radio announcement says: <i>"Because of the cyclone warning, all classes are suspended. Pupils should stay at home and listen for the next bulletin."</i><br>What should a pupil DO after hearing this?',
    options:['Stay at home and listen','Go to school as usual','Phone the radio station','Wait at the bus stop'],
    answer:'Stay at home and listen',
    hint:'The announcement gives two instructions, and both of them matter.',
    explanation:'The bulletin asks pupils to stay at home <b>and</b> to keep listening for the next bulletin. Going to school or waiting at a bus stop ignores the suspension, and nobody is asked to telephone the station.' }),

  makeMCQ({ id:'g7eng-listening-019', chapterId:'g7eng-listening', difficulty:3,
    subsection:'vocabulary_context',
    question:'A speaker says: <i>"We had booked the coach and printed the tickets, but the trip fell through at the last minute."</i><br>What does <b>fell through</b> mean here?',
    options:['did not happen','started early','went very well','cost too much'],
    answer:'did not happen',
    hint:'The coach was booked and the tickets were printed — and then?',
    explanation:'"To fall through" means to fail to happen after being arranged. The word "but" warns you that the news turns bad, so "went very well" is the opposite, and the sentence mentions neither the time nor the price.' })

);
