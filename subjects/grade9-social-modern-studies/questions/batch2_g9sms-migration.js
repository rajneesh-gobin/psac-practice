'use strict';
STATIC_QUESTIONS.push(

  makeMCQ({ id:'g9sms-migration-016', chapterId:'g9sms-migration', difficulty:3,
    subsection:'refugees_displacement',
    question:'Severe flooding destroys a family\'s village. They move to a town four hours away, still inside their own country, and cannot go home. What are such people called?',
    options:['Internally displaced persons','Refugees under the 1951 Convention','Asylum seekers awaiting a decision','Economic migrants seeking better work'],
    answer:'Internally displaced persons',
    hint:'Check whether they have crossed an international border.',
    explanation:'They are <b>internally displaced persons (IDPs)</b>: forced to move, but still inside their own state. A refugee under the 1951 Convention must have crossed a border, and an asylum seeker is someone who has crossed one and is waiting for a decision. They are not economic migrants either — the move was forced by disaster, not chosen for work.' }),

  makeText({ id:'g9sms-migration-017', chapterId:'g9sms-migration', difficulty:2,
    subsection:'refugees_displacement',
    question:'A person who has crossed into another country and formally applied for refugee status, but whose claim has not yet been decided, is given a particular name in international law. Give the two-word term.',
    answer:'asylum seeker',
    alsoAccept:['asylum seekers','asylum-seeker','an asylum seeker'],
    hint:'They are asking a second country for protection, and are still waiting for the answer.',
    explanation:'An <b>asylum seeker</b> has made the claim; a <b>refugee</b> is someone whose claim has been accepted, or who is recognised as such. Writing "refugee" here treats the decision as already made, which is exactly what the question is testing. "Migrant" is wrong too, because it says nothing about protection from persecution.' }),

  makeMCQ({ id:'g9sms-migration-018', chapterId:'g9sms-migration', difficulty:3,
    subsection:'refugees_displacement',
    question:'A state that has signed the 1951 Refugee Convention may not send a refugee back to a country where they would face persecution. What is this principle called?',
    options:['Non-refoulement','Naturalisation','Repatriation','Deportation'],
    answer:'Non-refoulement',
    hint:'The French word inside it means "sending back".',
    explanation:'<b>Non-refoulement</b> is the core duty of the Convention: no return to danger. Repatriation is a return home, which is lawful only when it is voluntary and safe. Deportation is a forced removal, the very act the principle limits. Naturalisation is something else entirely — the granting of citizenship.' }),

  makeMCQ({ id:'g9sms-migration-019', chapterId:'g9sms-migration', difficulty:3,
    subsection:'push_pull',
    question:'Mauritius trains doctors, engineers and nurses, and a share of them settle permanently in France, Canada and Australia. What is this loss of trained people called?',
    options:['Brain drain','Brain gain','Chain migration','Circular migration'],
    answer:'Brain drain',
    hint:'Think about what the country of origin loses, not what it gains.',
    explanation:'<b>Brain drain</b> is the emigration of skilled people the home country has paid to train. Brain gain is the same flow seen from the receiving country. Chain migration means later migrants follow relatives to the same destination, and circular migration means workers move back and forth — neither describes a permanent loss of skills.' }),

  makeMCQ({ id:'g9sms-migration-020', chapterId:'g9sms-migration', difficulty:3,
    subsection:'internal_international',
    question:'Some families have left Curepipe and Quatre Bornes for quieter coastal villages, driving back into the conurbation each morning for work. What is this movement called?',
    options:['Counter-urbanisation','Rural depopulation','Chain migration','Seasonal migration'],
    answer:'Counter-urbanisation',
    hint:'It runs in the opposite direction to the rural-to-urban flow of the 1970s.',
    explanation:'<b>Counter-urbanisation</b> is movement out of towns to smaller settlements, usually by people who keep their urban jobs — which is why the commute matters here. Rural depopulation is the flow the other way, emptying the villages. Chain migration is about following relatives, and seasonal migration means moving and returning within the year.' })
);
