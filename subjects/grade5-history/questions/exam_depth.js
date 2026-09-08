'use strict';
// Grade 5 History & Geography - depth for Weather.
//
// WHY THIS FILE EXISTS
// examWeight is now set from the 2024 and 2025 Grade 5 papers (see the block
// above `chapters:` in _manifest.js). Weather is the second-largest topic in
// the paper at 14% - rainfall type, season and rainfall graphs are asked every
// single year - and it was weighted 3. At its new weight it supplies 5
// questions of every 40-question exam from a pool of 32, so six mock exams used
// the chapter up. Measured 2026-09-08.
//
// ⚠ Options are written ANSWER FIRST in the table purely so the item is easy
//   to read and check: options[0] is always the answer. It does NOT set where
//   the answer appears on screen - makeMCQ() shuffles the options itself
//   (engine/helpers.js), so the A/B/C/D spread comes from that Fisher-Yates
//   shuffle, not from anything here. What DOES matter is keeping all four
//   options the same grammatical shape and length: the real papers average a
//   6.8-character spread, and scripts/test-option-parity.js measures it.

(function () {
  let n = 0;
  const q = (subsection, difficulty, question, options, hint, explanation) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g5hg-dep-${String(n).padStart(3, '0')}`,
      chapterId: 'g5ge-weather', subsection, difficulty, question,
      options,
      answer: options[0], hint, explanation
    }));
  };

  // elements of weather and instruments (7)
  q('elements', 1, 'Which instrument measures the amount of rainfall?',
    ['A rain gauge', 'A thermometer', 'A wind vane', 'A barometer'],
    'It collects the rain that falls.',
    'A <b>rain gauge</b> collects rainwater and measures its depth in millimetres.');
  q('elements', 1, 'Which instrument shows the direction of the wind?',
    ['A wind vane', 'A rain gauge', 'A thermometer', 'An anemometer'],
    'It turns to point into the wind.',
    'A <b>wind vane</b> points into the wind and shows the direction it is blowing from.');
  q('instruments', 1, 'Which instrument measures the speed of the wind?',
    ['An anemometer', 'A wind vane', 'A rain gauge', 'A thermometer'],
    'It has cups that spin round.',
    'An <b>anemometer</b> has spinning cups, and the faster they turn the stronger the wind.');
  q('instruments', 2, 'A line on a map joining places with the same rainfall is called an ...',
    ['isohyet', 'isotherm', 'isobar', 'contour'],
    'The word ends the same way as isotherm.',
    'An <b>isohyet</b> joins places with equal rainfall; an isotherm joins places with equal temperature.');
  q('instruments', 2, 'A line joining places with the same temperature is called an ...',
    ['isotherm', 'isohyet', 'isobar', 'contour'],
    '"Therm" is the clue.',
    'An <b>isotherm</b> joins places that have the same temperature.');
  q('elements', 2, 'Which of these is NOT an element of weather?',
    ['Population', 'Rainfall', 'Temperature', 'Wind'],
    'Three of them can be measured by an instrument.',
    '<b>Population</b> is not an element of weather. Rainfall, temperature, wind, humidity and cloud cover are.');
  q('elements', 3, 'What is the difference between weather and climate?',
    ['Climate covers many years', 'Weather covers many years', 'They mean the same thing', 'Climate changes each hour'],
    'One is short term, the other long term.',
    'Weather is the state of the air from day to day; <b>climate covers many years</b> of average weather.');

  // seasons and rainfall (6)
  q('seasons', 1, 'Which season in Mauritius is hot and wet?',
    ['Summer', 'Winter', 'Spring', 'Autumn'],
    'It runs from November to April.',
    '<b>Summer</b>, from November to April, is hot and wet, and it is the cyclone season.');
  q('seasons', 2, 'In which season does Mauritius receive most of its rain?',
    ['Summer', 'Winter', 'Spring', 'Autumn'],
    'Think about when cyclones come.',
    'Most rain falls in <b>summer</b>, when the air is hottest and cyclones and thunderstorms are common.');
  q('seasons', 2, 'Rain formed when moist air is forced to rise over a mountain is called ...',
    ['relief rainfall', 'convectional rainfall', 'frontal rainfall', 'cyclonic rainfall'],
    'The shape of the land causes it.',
    '<b>Relief rainfall</b> falls when air is pushed up by high land, cools and condenses.');
  q('seasons', 2, 'In relief rainfall, the side of the mountain where air rises is called the ...',
    ['windward side', 'leeward side', 'northern side', 'southern side'],
    'It faces the wind.',
    'The <b>windward side</b> faces the wind and gets most of the rain; the leeward side stays drier.');
  q('seasons', 2, 'Rain formed when hot air rises quickly from the heated ground is called ...',
    ['convectional rainfall', 'relief rainfall', 'frontal rainfall', 'cyclonic rainfall'],
    'It usually falls in the afternoon.',
    '<b>Convectional rainfall</b> happens when strong heating makes air rise, cool and form heavy showers.');
  q('seasons', 3, 'Why does rainfall vary from place to place in Mauritius?',
    ['The land differs in height', 'The island is perfectly flat', 'The sea is always the same', 'The wind never changes'],
    'Compare the central plateau with the coast.',
    '<b>The land differs in height.</b> The high central plateau receives far more rain than the low coastal areas.');

  // cyclones and impact (5)
  q('cyclones', 2, 'Which cyclone warning class in Mauritius means gusts of 120 km/h are expected within six hours?',
    ['Class 3', 'Class 1', 'Class 2', 'Class 4'],
    'Class 4 means they have already happened.',
    '<b>Class 3</b> warns that gusts of 120 km/h are expected within six hours.');
  q('cyclones', 2, 'What does a Class 4 cyclone warning mean?',
    ['Gusts have already reached 120 km/h', 'A cyclone may come in 36 hours', 'A cyclone may come in 12 hours', 'The danger has passed'],
    'It is the most serious class.',
    'Class 4 means <b>gusts of 120 km/h have already occurred</b> and are expected to continue.');
  q('cyclones', 3, 'Give one precaution to take when a cyclone warning Class 2 is issued.',
    ['Fix the roof and shutters', 'Go out to watch the sea', 'Leave the windows open', 'Travel to another district'],
    'There is still time to prepare.',
    'At Class 2 there is still time to <b>fix the roof and shutters</b> and to store food and water.');
  q('impact', 2, 'How does a cyclone affect farmers?',
    ['Crops are destroyed', 'Crops grow much faster', 'Soil becomes deeper', 'Harvests double in size'],
    'Think about wind and heavy rain on a field.',
    'Strong wind and flooding mean <b>crops are destroyed</b>, so the farmer loses the harvest.');
  q('impact', 3, 'How does the weather affect fishing in Mauritius?',
    ['Rough seas keep boats in port', 'Rough seas help boats sail', 'Calm seas stop all fishing', 'Weather has no effect'],
    'Think about when a small boat can go out.',
    '<b>Rough seas keep boats in port</b>, so fishermen cannot work and earn nothing during bad weather.');

})();

// ── g5enr-personalities / independence ───────────────────────────────────
// The subsection was DECLARED with no questions behind it, so tapping it
// opened an empty screen. It is not a stray declaration: the real papers ask
// about independence-era figures every year (2023 Q1e, the first Governor
// General; 2024 Q1.8, the first President), and this chapter is exactly where
// they belong. Measured 2026-09-08 - the other 19 items in the chapter are all
// Dutch, French and British colonial governors, so none could be retagged.
(function () {
  let n = 0;
  const q = (difficulty, question, options, hint, explanation) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g5hg-ind-${String(n).padStart(3, '0')}`,
      chapterId: 'g5enr-personalities', subsection: 'independence', difficulty, question,
      options,
      answer: options[0], hint, explanation
    }));
  };

  q(1, 'In which year did Mauritius become independent?',
    ['1968', '1810', '1835', '1992'],
    'It is the most recent of these dates.',
    'Mauritius became independent on 12 March <b>1968</b>, after 158 years of British rule.');
  q(1, 'Who became the first Prime Minister of Mauritius?',
    ['Sir Seewoosagur Ramgoolam', 'Sir Abdool Raman Osman', 'Sir Gaetan Duval', 'Sir John Shaw Rennie'],
    'The airport is named after him.',
    '<b>Sir Seewoosagur Ramgoolam</b> led the country to independence and became its first Prime Minister.');
  q(2, 'On which date is Independence Day celebrated in Mauritius?',
    ['12 March', '1 February', '2 November', '15 August'],
    'It falls in the first half of the year.',
    'Independence Day is <b>12 March</b>, the date the flag was first raised in 1968.');
  q(2, 'Who was the first Mauritian Governor General?',
    ['Sir Abdool Raman Osman', 'Sir John Shaw Rennie', 'Sir Seewoosagur Ramgoolam', 'Sir Veerasamy Ringadoo'],
    'He was the first Mauritian to hold the post.',
    '<b>Sir Abdool Raman Osman</b> was the first Mauritian Governor General, representing the Queen after 1968.');
  q(2, 'Who was the last British Governor of Mauritius before independence in 1968?',
    ['Sir John Shaw Rennie', 'Sir Robert Farquhar', 'Charles Decaen', 'Mahé de Labourdonnais'],
    'He governed in the 1960s, not in the days of sailing ships.',
    '<b>Sir John Shaw Rennie</b> was the last British Governor. After 12 March 1968 the post became Governor General.');
  q(2, 'What work did Sir Seewoosagur Ramgoolam do before he entered politics?',
    ['He was a medical doctor', 'He was a sea captain', 'He was a sugar planter', 'He was a ship builder'],
    'He studied in London and looked after sick people.',
    'He qualified as a <b>medical doctor</b> in London and treated poor patients in Mauritius before leading the country to independence.');
  q(2, 'Where was the independence ceremony of 1968 held?',
    ['At the Champ de Mars', 'At Vieux Grand Port', 'At Le Morne Brabant', 'At Pamplemousses'],
    'It is the racecourse in the capital.',
    'The flag was raised at the <b>Champ de Mars</b> in Port Louis on 12 March 1968.');
  q(2, 'Which political party did Sir Seewoosagur Ramgoolam lead to independence?',
    ['The Labour Party', 'The Parti Mauricien', 'The Independent Forward Bloc', 'The Democratic Union'],
    'Its name says who it stood for: working people.',
    'Sir Seewoosagur Ramgoolam led the <b>Labour Party</b>, which won the 1967 election and took Mauritius to independence in 1968.');
  q(3, 'What changed about who governed Mauritius when it became independent in 1968?',
    ['Mauritians elected their own government', 'The island was returned to France', 'The Dutch came back to govern the island', 'Britain sent a new Governor every year'],
    'Independence is about who makes the decisions.',
    'From 1968 <b>Mauritians elected their own government</b>. Britain no longer decided the island\'s laws, and a Mauritian Prime Minister led the country.');
  q(3, 'Which title did Sir Seewoosagur Ramgoolam earn for his part in independence?',
    ['Father of the Nation', 'First Governor of the island', 'Discoverer of Rodrigues', 'Founder of Port Louis'],
    'It is how Mauritians remember him.',
    'He is remembered as the <b>Father of the Nation</b> for leading Mauritius to independence in 1968.');
  q(3, 'Before independence, who represented the British monarch in Mauritius?',
    ['The Governor', 'The Prime Minister', 'The President', 'The Mayor'],
    'The post was replaced by the Governor General in 1968.',
    'The <b>Governor</b> represented the British Crown until 1968, when a Governor General took over.');
})();
