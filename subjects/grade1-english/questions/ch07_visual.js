'use strict';
// Grade 1 English - visual bank: pictures, colours, diagrams, syllables.
// IDs: g1eng-lis-076..091, g1eng-spk-076..091, g1eng-rdr-076..091,
//      g1eng-wrt-076..091, g1eng-grm-076..091, g1eng-pho-076..091

(function () {

const CH_LIS = 'g1eng-listening';

STATIC_QUESTIONS.push(

  // ── listening: sound_recognition (076-081) ───────────────────────────────

  makeMCQ({ id:'g1eng-lis-076', chapterId:CH_LIS, difficulty:1, subsection:'sound_recognition',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a drawing of one object">' +
      '<svg viewBox="0 0 140 120" style="width:100%;max-width:160px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="140" height="120" rx="8" fill="#ffffff"/>' +
      '<rect x="25" y="40" width="90" height="58" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="70" cy="40" rx="45" ry="12" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<path d="M25 46 L70 66 L115 46" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<path d="M25 74 L70 54 L115 74" fill="none" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'This thing goes <b>bang, bang, bang</b> when you hit it. What is it?',
    options:['drum','book','plate','spoon'],
    answer:'drum',
    hint:'Which one do you hit with sticks to make music? 🥁',
    explanation:'It is a <b>drum</b>. You hit the top and it makes a loud bang.' }),

  makeMCQ({ id:'g1eng-lis-077', chapterId:CH_LIS, difficulty:1, subsection:'sound_recognition',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="weather falling from a cloud">' +
      '<svg viewBox="0 0 160 130" style="width:100%;max-width:180px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="130" rx="8" fill="#ffffff"/>' +
      '<circle cx="55" cy="52" r="24" fill="#CBD5E1" stroke="#6B7280" stroke-width="2"/>' +
      '<circle cx="86" cy="42" r="29" fill="#CBD5E1" stroke="#6B7280" stroke-width="2"/>' +
      '<circle cx="112" cy="54" r="21" fill="#CBD5E1" stroke="#6B7280" stroke-width="2"/>' +
      '<rect x="50" y="52" width="70" height="22" fill="#CBD5E1" stroke="#CBD5E1" stroke-width="1"/>' +
      '<line x1="55" y1="82" x2="49" y2="110" stroke="#3B82F6" stroke-width="4"/>' +
      '<line x1="80" y1="82" x2="74" y2="112" stroke="#3B82F6" stroke-width="4"/>' +
      '<line x1="105" y1="82" x2="99" y2="110" stroke="#3B82F6" stroke-width="4"/>' +
      '</svg></div>' +
      'What sound does this make on the roof of your house?',
    options:['pitter patter','tick tock','beep beep','ding dong'],
    answer:'pitter patter',
    hint:'Think of the yard when the sky turns grey. ☔',
    explanation:'Rain goes <b>pitter patter</b> on the roof. Little drops, lots of tiny sounds.' }),

  makeMCQ({ id:'g1eng-lis-078', chapterId:CH_LIS, difficulty:1, subsection:'sound_recognition',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four small drawings in a row">' +
      '<svg viewBox="0 0 340 132" style="width:100%;max-width:330px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="340" height="132" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="92" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="176" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="260" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="24" y="48" width="40" height="32" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="44" cy="48" rx="20" ry="7" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<path d="M24 54 L44 70 L64 54" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<path d="M102 76 Q112 30 152 40 Q144 84 102 76 Z" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '<rect x="187" y="34" width="50" height="50" rx="3" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="193" y="40" width="38" height="38" fill="#FFFFFF" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="296" cy="36" r="11" fill="#EC4899" stroke="#DB2777" stroke-width="1.5"/>' +
      '<circle cx="312" cy="50" r="11" fill="#EC4899" stroke="#DB2777" stroke-width="1.5"/>' +
      '<circle cx="306" cy="68" r="11" fill="#EC4899" stroke="#DB2777" stroke-width="1.5"/>' +
      '<circle cx="286" cy="68" r="11" fill="#EC4899" stroke="#DB2777" stroke-width="1.5"/>' +
      '<circle cx="280" cy="50" r="11" fill="#EC4899" stroke="#DB2777" stroke-width="1.5"/>' +
      '<circle cx="296" cy="52" r="9" fill="#FACC15" stroke="#F59E0B" stroke-width="1.5"/>' +
      '<line x1="296" y1="72" x2="296" y2="92" stroke="#22C55E" stroke-width="3"/>' +
      '<text x="44" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">A</text>' +
      '<text x="128" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">B</text>' +
      '<text x="212" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">C</text>' +
      '<text x="296" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Which one makes the <b>loudest</b> sound?',
    options:['A','B','C','D'],
    answer:'A',
    hint:'Which one is made to be heard from far away?',
    explanation:'<b>A</b> is the drum. A leaf, a book and a flower are all quiet things.' }),

  makeMCQ({ id:'g1eng-lis-079', chapterId:CH_LIS, difficulty:1, subsection:'sound_recognition',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a round object with two pointers">' +
      '<svg viewBox="0 0 120 120" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="120" height="120" rx="8" fill="#ffffff"/>' +
      '<circle cx="60" cy="60" r="50" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
      '<line x1="60" y1="14" x2="60" y2="22" stroke="#111827" stroke-width="3"/>' +
      '<line x1="60" y1="98" x2="60" y2="106" stroke="#111827" stroke-width="3"/>' +
      '<line x1="14" y1="60" x2="22" y2="60" stroke="#111827" stroke-width="3"/>' +
      '<line x1="98" y1="60" x2="106" y2="60" stroke="#111827" stroke-width="3"/>' +
      '<line x1="60" y1="60" x2="60" y2="30" stroke="#111827" stroke-width="4"/>' +
      '<line x1="60" y1="60" x2="86" y2="60" stroke="#111827" stroke-width="3"/>' +
      '<circle cx="60" cy="60" r="4" fill="#111827"/>' +
      '</svg></div>' +
      'This thing goes <b>tick, tock, tick, tock</b> all day. What is it?',
    options:['clock','chair','cup','box'],
    answer:'clock',
    hint:'It hangs on the wall and it tells you the time. 🕐',
    explanation:'A <b>clock</b> goes tick tock. Its hands move round and round.' }),

  makeMCQ({ id:'g1eng-lis-080', chapterId:CH_LIS, difficulty:1, subsection:'sound_recognition',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a metal object with something falling">' +
      '<svg viewBox="0 0 130 130" style="width:100%;max-width:150px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="130" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="22" y="24" width="18" height="46" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<rect x="16" y="12" width="30" height="12" rx="4" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<rect x="22" y="58" width="58" height="15" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="72" cy="92" rx="7" ry="10" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5"/>' +
      '<ellipse cx="72" cy="115" rx="5" ry="7" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5"/>' +
      '</svg></div>' +
      'Drip, drip, drip. Which thing in the kitchen is making that sound?',
    options:['tap','door','book','ball'],
    answer:'tap',
    hint:'Water is falling from it, one drop at a time. 💧',
    explanation:'A <b>tap</b> that is not closed well goes drip, drip, drip.' }),

  makeMCQ({ id:'g1eng-lis-081', chapterId:CH_LIS, difficulty:2, subsection:'sound_recognition',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a long curved drawing">' +
      '<svg viewBox="0 0 200 110" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="110" rx="8" fill="#ffffff"/>' +
      '<path d="M15 75 Q45 25 75 70 Q105 118 135 68 Q158 32 185 55" fill="none" stroke="#22C55E" stroke-width="11" stroke-linecap="round"/>' +
      '<circle cx="182" cy="49" r="3" fill="#111827"/>' +
      '</svg></div>' +
      'This one hisses: s-s-s-s-s. Which <b>letter</b> makes that sound?',
    options:['s','m','b','t'],
    answer:'s',
    hint:'Say s-s-s-s slowly. Which letter is that? 🐍',
    explanation:'The letter <b>s</b> makes the hissing /s/ sound: s-s-sun, s-s-sock.' }),

  // ── listening: rhymes_songs (082-086) ────────────────────────────────────

  makeMCQ({ id:'g1eng-lis-082', chapterId:CH_LIS, difficulty:1, subsection:'rhymes_songs',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a drawing of one object">' +
      '<svg viewBox="0 0 160 110" style="width:100%;max-width:180px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="110" rx="8" fill="#ffffff"/>' +
      '<path d="M45 22 L115 22 L115 70 L45 70 Z" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="45" y="58" width="70" height="12" fill="#111827"/>' +
      '<ellipse cx="80" cy="74" rx="68" ry="12" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'The word for this picture is <b>hat</b>. Which word rhymes with it?',
    options:['mat','cup','pen','bag'],
    answer:'mat',
    hint:'Say them out loud. Which one ends with the same -at sound? 🎩',
    explanation:'<b>Hat</b> and <b>mat</b> both end in -at, so they rhyme. So do cat, bat and rat.' }),

  makeMCQ({ id:'g1eng-lis-083', chapterId:CH_LIS, difficulty:1, subsection:'rhymes_songs',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a bright shape in the sky">' +
      '<svg viewBox="0 0 120 120" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="120" height="120" rx="8" fill="#ffffff"/>' +
      '<polygon points="60,8 74,45 114,45 82,68 94,106 60,82 26,106 38,68 6,45 46,45" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>' +
      '</svg></div>' +
      'We sing: Twinkle, twinkle, little <b>star</b>. Which word rhymes with star?',
    options:['car','cup','box','pen'],
    answer:'car',
    hint:'Say star... car... do they end the same way? ⭐',
    explanation:'<b>Star</b> and <b>car</b> both end with the -ar sound, so they rhyme.' }),

  makeMCQ({ id:'g1eng-lis-084', chapterId:CH_LIS, difficulty:1, subsection:'rhymes_songs',
    question:'Clap this word from a rhyme: <b>rain-bow</b>. How many claps do you hear?',
    options:['1','2','3','4'],
    answer:'2',
    hint:'Say it slowly and clap each part: rain... bow... 👏',
    explanation:'<b>Rain-bow</b> has 2 parts, so you clap 2 times.' }),

  makeMCQ({ id:'g1eng-lis-085', chapterId:CH_LIS, difficulty:1, subsection:'rhymes_songs',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a round bright drawing with lines around it">' +
      '<svg viewBox="0 0 140 140" style="width:100%;max-width:150px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="140" height="140" rx="8" fill="#ffffff"/>' +
      '<circle cx="70" cy="70" r="34" fill="#FACC15" stroke="#F59E0B" stroke-width="3"/>' +
      '<line x1="70" y1="30" x2="70" y2="12" stroke="#F59E0B" stroke-width="5"/>' +
      '<line x1="70" y1="110" x2="70" y2="128" stroke="#F59E0B" stroke-width="5"/>' +
      '<line x1="30" y1="70" x2="12" y2="70" stroke="#F59E0B" stroke-width="5"/>' +
      '<line x1="110" y1="70" x2="128" y2="70" stroke="#F59E0B" stroke-width="5"/>' +
      '<line x1="42" y1="42" x2="28" y2="28" stroke="#F59E0B" stroke-width="5"/>' +
      '<line x1="98" y1="42" x2="112" y2="28" stroke="#F59E0B" stroke-width="5"/>' +
      '<line x1="42" y1="98" x2="28" y2="112" stroke="#F59E0B" stroke-width="5"/>' +
      '<line x1="98" y1="98" x2="112" y2="112" stroke="#F59E0B" stroke-width="5"/>' +
      '</svg></div>' +
      'This is the <b>sun</b>. Which word rhymes with sun?',
    options:['fun','sit','top','bag'],
    answer:'fun',
    hint:'Sun... fun... listen to the end of each word. ☀️',
    explanation:'<b>Sun</b> and <b>fun</b> end with the same -un sound, so they rhyme. Run and bun do too.' }),

  makeMCQ({ id:'g1eng-lis-086', chapterId:CH_LIS, difficulty:2, subsection:'rhymes_songs',
    question:'In this song: <b>Rain, rain, go away, come again another day.</b> Which two words rhyme?',
    options:['away and day','rain and go','come and rain','go and again'],
    answer:'away and day',
    hint:'Listen to the last word of each line. 🌧️',
    explanation:'<b>Away</b> and <b>day</b> both end with the -ay sound. Songs often rhyme at the end of a line.' }),

  // ── listening: listening_comp (087-091) ──────────────────────────────────

  makeMCQ({ id:'g1eng-lis-087', chapterId:CH_LIS, difficulty:1, subsection:'listening_comp',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a small outdoor scene">' +
      '<svg viewBox="0 0 200 150" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="150" rx="8" fill="#ffffff"/>' +
      '<circle cx="152" cy="34" r="20" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>' +
      '<rect x="45" y="78" width="90" height="58" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="34,78 90,36 146,78" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="78" y="102" width="26" height="34" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="54" y="90" width="20" height="18" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Your teacher says: point to the thing that is <b>above</b> everything else.',
    options:['the sun','the house','the door','the roof'],
    answer:'the sun',
    hint:'Which one is highest up in the picture? Look at the top.',
    explanation:'<b>The sun</b> is above everything. Above means higher up than the rest.' }),

  makeMCQ({ id:'g1eng-lis-088', chapterId:CH_LIS, difficulty:1, subsection:'listening_comp',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two objects drawn together">' +
      '<svg viewBox="0 0 200 140" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="140" rx="8" fill="#ffffff"/>' +
      '<path d="M78 26 L128 26 L122 66 L84 66 Z" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<path d="M128 36 q18 10 -5 24" fill="none" stroke="#111827" stroke-width="4"/>' +
      '<rect x="20" y="66" width="160" height="14" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="34" y="80" width="14" height="52" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="152" y="80" width="14" height="52" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Listen: <b>Where is the cup?</b>',
    options:['on the table','under the table','next to a bag','inside a box'],
    answer:'on the table',
    hint:'Is the cup above the flat top, or below it?',
    explanation:'The cup is <b>on the table</b>. It is resting on top of it.' }),

  makeMCQ({ id:'g1eng-lis-089', chapterId:CH_LIS, difficulty:1, subsection:'listening_comp',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four small drawings in a row">' +
      '<svg viewBox="0 0 340 132" style="width:100%;max-width:330px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="340" height="132" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="92" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="176" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="260" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="103" y="34" width="50" height="50" rx="3" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="109" y="40" width="38" height="38" fill="#FFFFFF" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="212" cy="58" r="26" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<path d="M186 58 Q212 40 238 58" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<path d="M276 40 L316 40 L310 82 L282 82 Z" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<path d="M316 50 q14 8 -4 22" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<circle cx="44" cy="62" r="24" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<line x1="44" y1="38" x2="44" y2="24" stroke="#92400E" stroke-width="4"/>' +
      '<text x="44" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">A</text>' +
      '<text x="128" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">B</text>' +
      '<text x="212" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">C</text>' +
      '<text x="296" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Your teacher says: show me the one you can <b>eat</b>.',
    options:['A','B','C','D'],
    answer:'A',
    hint:'Which one goes in your lunch box? 🍎',
    explanation:'<b>A</b> is an apple, and you can eat it. You cannot eat a book, a ball or a cup.' }),

  makeMCQ({ id:'g1eng-lis-090', chapterId:CH_LIS, difficulty:1, subsection:'listening_comp',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="weather falling from a cloud">' +
      '<svg viewBox="0 0 170 130" style="width:100%;max-width:190px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="170" height="130" rx="8" fill="#ffffff"/>' +
      '<circle cx="58" cy="44" r="22" fill="#CBD5E1" stroke="#6B7280" stroke-width="2"/>' +
      '<circle cx="90" cy="34" r="27" fill="#CBD5E1" stroke="#6B7280" stroke-width="2"/>' +
      '<circle cx="118" cy="46" r="20" fill="#CBD5E1" stroke="#6B7280" stroke-width="2"/>' +
      '<rect x="54" y="44" width="70" height="20" fill="#CBD5E1" stroke="#CBD5E1" stroke-width="1"/>' +
      '<line x1="56" y1="72" x2="50" y2="100" stroke="#3B82F6" stroke-width="4"/>' +
      '<line x1="82" y1="72" x2="76" y2="104" stroke="#3B82F6" stroke-width="4"/>' +
      '<line x1="108" y1="72" x2="102" y2="100" stroke="#3B82F6" stroke-width="4"/>' +
      '<line x1="130" y1="80" x2="124" y2="108" stroke="#3B82F6" stroke-width="4"/>' +
      '</svg></div>' +
      'Mum says: it is like this outside, so take one thing with you. What do you take?',
    options:['umbrella','pencil','ruler','basket'],
    answer:'umbrella',
    hint:'What keeps the rain off your head? ☔',
    explanation:'You take an <b>umbrella</b> when it rains, so you stay dry.' }),

  makeMCQ({ id:'g1eng-lis-091', chapterId:CH_LIS, difficulty:1, subsection:'listening_comp',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a tall object in a wall">' +
      '<svg viewBox="0 0 120 150" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="120" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="25" y="14" width="70" height="124" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="37" y="28" width="46" height="44" fill="#B45309" stroke="#111827" stroke-width="2"/>' +
      '<rect x="37" y="82" width="46" height="44" fill="#B45309" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="84" cy="78" r="5" fill="#FACC15" stroke="#111827" stroke-width="1.5"/>' +
      '</svg></div>' +
      'Your teacher says: <b>Please close the door.</b> What must you do?',
    options:['close the door','open the door','clean the door','paint the door'],
    answer:'close the door',
    hint:'Do exactly what the words say - listen to the first word.',
    explanation:'You must <b>close the door</b>. Good listening means doing just what was asked.' })

);


const CH_SPK = 'g1eng-speaking';

STATIC_QUESTIONS.push(

  // ── speaking: greetings_phrases (076-079) ────────────────────────────────

  makeMCQ({ id:'g1eng-spk-076', chapterId:CH_SPK, difficulty:1, subsection:'greetings_phrases',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a sky scene above the ground">' +
      '<svg viewBox="0 0 180 110" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="110" rx="8" fill="#ffffff"/>' +
      '<path d="M50 82 A40 40 0 0 1 130 82 Z" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>' +
      '<line x1="90" y1="26" x2="90" y2="14" stroke="#F59E0B" stroke-width="4"/>' +
      '<line x1="50" y1="46" x2="40" y2="36" stroke="#F59E0B" stroke-width="4"/>' +
      '<line x1="130" y1="46" x2="140" y2="36" stroke="#F59E0B" stroke-width="4"/>' +
      '<rect x="10" y="82" width="160" height="20" fill="#DCFCE7" stroke="#22C55E" stroke-width="2"/>' +
      '</svg></div>' +
      'The sun is coming up. You meet your teacher. What do you say?',
    options:['Good morning','Good night','Good bye now','Thank you sir'],
    answer:'Good morning',
    hint:'What do we say early in the day, before lunch? 🌅',
    explanation:'We say <b>Good morning</b> when the day is starting. It is a polite way to greet someone.' }),

  makeMCQ({ id:'g1eng-spk-077', chapterId:CH_SPK, difficulty:1, subsection:'greetings_phrases',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a dark sky scene">' +
      '<svg viewBox="0 0 170 120" style="width:100%;max-width:190px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="170" height="120" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="8" width="154" height="104" rx="8" fill="#1E3A8A" stroke="#111827" stroke-width="2"/>' +
      '<path d="M108 26 A38 38 0 1 0 108 98 A30 30 0 1 1 108 26 Z" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>' +
      '<polygon points="38,28 42,38 52,38 44,45 47,55 38,49 29,55 32,45 24,38 34,38" fill="#FACC15"/>' +
      '<polygon points="40,76 43,84 51,84 45,89 47,97 40,92 33,97 35,89 29,84 37,84" fill="#FACC15"/>' +
      '</svg></div>' +
      'It is dark and you are going to bed. What do you say?',
    options:['Good night','Good morning','Hello there','Come inside'],
    answer:'Good night',
    hint:'What do we say last thing, before we sleep? 🌙',
    explanation:'We say <b>Good night</b> at bedtime. Good morning is for when we wake up.' }),

  makeMCQ({ id:'g1eng-spk-078', chapterId:CH_SPK, difficulty:1, subsection:'greetings_phrases',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a drawing of one fruit">' +
      '<svg viewBox="0 0 130 140" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="130" height="140" rx="8" fill="#ffffff"/>' +
      '<ellipse cx="64" cy="82" rx="40" ry="48" fill="#FACC15" stroke="#92400E" stroke-width="2"/>' +
      '<line x1="64" y1="34" x2="64" y2="18" stroke="#92400E" stroke-width="5"/>' +
      '<ellipse cx="86" cy="22" rx="18" ry="8" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '</svg></div>' +
      'Your friend gives you this. What do you say to your friend?',
    options:['Thank you','Good night','Come here','Sit down'],
    answer:'Thank you',
    hint:'What do we say when someone gives us something? 🥭',
    explanation:'We say <b>Thank you</b> when we receive something. It shows we are grateful.' }),

  makeMCQ({ id:'g1eng-spk-079', chapterId:CH_SPK, difficulty:2, subsection:'greetings_phrases',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a tall object in a wall">' +
      '<svg viewBox="0 0 120 150" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="120" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="22" y="14" width="76" height="124" fill="#B45309" stroke="#111827" stroke-width="2"/>' +
      '<rect x="36" y="30" width="48" height="92" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="80" cy="80" r="5" fill="#FACC15" stroke="#111827" stroke-width="1.5"/>' +
      '</svg></div>' +
      'You are late and the class has started. You stand here. What do you say first?',
    options:['May I come in?','Give me a book.','I want to go.','This is my bag.'],
    answer:'May I come in?',
    hint:'You must ask before you walk in. Polite words come first. 🚪',
    explanation:'We ask <b>May I come in?</b> Asking permission is polite when a lesson has started.' }),

  // ── speaking: naming_things (080-086) ────────────────────────────────────

  makeMCQ({ id:'g1eng-spk-080', chapterId:CH_SPK, difficulty:1, subsection:'naming_things',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a round object in one colour">' +
      '<svg viewBox="0 0 120 120" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="120" height="120" rx="8" fill="#ffffff"/>' +
      '<circle cx="60" cy="60" r="45" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<path d="M18 48 Q60 34 102 48" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<path d="M18 72 Q60 86 102 72" fill="none" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'What colour is this ball?',
    options:['red','blue','green','yellow'],
    answer:'red',
    hint:'It is the same colour as a ripe tomato. 🔴',
    explanation:'The ball is <b>red</b>. Red is the colour of a stop sign and a tomato.' }),

  makeMCQ({ id:'g1eng-spk-081', chapterId:CH_SPK, difficulty:1, subsection:'naming_things',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a flat object from a plant">' +
      '<svg viewBox="0 0 160 120" style="width:100%;max-width:180px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="120" rx="8" fill="#ffffff"/>' +
      '<path d="M20 96 Q40 18 140 30 Q128 106 20 96 Z" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '<path d="M20 96 Q80 68 140 30" fill="none" stroke="#15803D" stroke-width="3"/>' +
      '</svg></div>' +
      'What colour is this leaf?',
    options:['green','brown','purple','orange'],
    answer:'green',
    hint:'Look at the leaves on a tree in the yard. 🍃',
    explanation:'The leaf is <b>green</b>. Most leaves are green while they are alive.' }),

  makeMCQ({ id:'g1eng-spk-082', chapterId:CH_SPK, difficulty:1, subsection:'naming_things',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four drawings of the same thing in different colours">' +
      '<svg viewBox="0 0 340 132" style="width:100%;max-width:330px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="340" height="132" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="92" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="176" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="260" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="28" y="34" width="32" height="26" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="44" cy="62" rx="28" ry="7" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="112" y="34" width="32" height="26" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="128" cy="62" rx="28" ry="7" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="196" y="34" width="32" height="26" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="212" cy="62" rx="28" ry="7" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<rect x="280" y="34" width="32" height="26" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="296" cy="62" rx="28" ry="7" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<text x="44" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">A</text>' +
      '<text x="128" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">B</text>' +
      '<text x="212" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">C</text>' +
      '<text x="296" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Which hat is <b>yellow</b>?',
    options:['A','B','C','D'],
    answer:'C',
    hint:'Yellow is the colour of a ripe banana. 🍌',
    explanation:'Hat <b>C</b> is yellow. A is blue, B is red and D is green.' }),

  makeMCQ({ id:'g1eng-spk-083', chapterId:CH_SPK, difficulty:2, subsection:'naming_things',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a toy that flies, drawn in one colour">' +
      '<svg viewBox="0 0 140 170" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="140" height="170" rx="8" fill="#ffffff"/>' +
      '<polygon points="70,12 120,70 70,126 20,70" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<line x1="70" y1="12" x2="70" y2="126" stroke="#111827" stroke-width="2"/>' +
      '<line x1="20" y1="70" x2="120" y2="70" stroke="#111827" stroke-width="2"/>' +
      '<path d="M70 126 q16 12 0 22 q-16 10 0 20" fill="none" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Which words tell about this picture?',
    options:['a red kite','a red boat','a blue kite','a blue boat'],
    answer:'a red kite',
    hint:'Two things to check: what it is, and what colour it is. 🪁',
    explanation:'It is <b>a red kite</b>. Say the colour and then the naming word.' }),

  makeMCQ({ id:'g1eng-spk-084', chapterId:CH_SPK, difficulty:1, subsection:'naming_things',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a drawing of one animal">' +
      '<svg viewBox="0 0 180 110" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="110" rx="8" fill="#ffffff"/>' +
      '<path d="M25 55 Q70 12 122 55 Q70 98 25 55 Z" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="122,55 160,28 160,82" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="50" cy="48" r="4" fill="#111827"/>' +
      '<path d="M70 40 Q80 55 70 70" fill="none" stroke="#1D4ED8" stroke-width="2"/>' +
      '</svg></div>' +
      'Which word names this picture?',
    options:['fish','bird','frog','goat'],
    answer:'fish',
    hint:'It swims in the sea and it has a tail like a fan. 🐟',
    explanation:'It is a <b>fish</b>. Fish live in water and swim with their tail.' }),

  makeMCQ({ id:'g1eng-spk-085', chapterId:CH_SPK, difficulty:1, subsection:'naming_things',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a drawing of one object">' +
      '<svg viewBox="0 0 160 160" style="width:100%;max-width:170px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="160" rx="8" fill="#ffffff"/>' +
      '<path d="M18 78 A62 62 0 0 1 142 78 Z" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<line x1="18" y1="78" x2="142" y2="78" stroke="#111827" stroke-width="2"/>' +
      '<line x1="80" y1="16" x2="80" y2="128" stroke="#92400E" stroke-width="5"/>' +
      '<path d="M80 128 q0 16 -18 16 q-16 0 -16 -14" fill="none" stroke="#92400E" stroke-width="5"/>' +
      '</svg></div>' +
      'What is this thing called?',
    options:['umbrella','envelope','notebook','calendar'],
    answer:'umbrella',
    hint:'You open it when the rain starts. ☂️',
    explanation:'It is an <b>umbrella</b>. You hold it over your head to stay dry.' }),

  makeMCQ({ id:'g1eng-spk-086', chapterId:CH_SPK, difficulty:2, subsection:'naming_things',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of round shapes with an empty space at the end">' +
      '<svg viewBox="0 0 320 90" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="320" height="90" rx="8" fill="#ffffff"/>' +
      '<circle cx="40" cy="45" r="26" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="100" cy="45" r="26" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="160" cy="45" r="26" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="220" cy="45" r="26" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="280" cy="45" r="26" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2" stroke-dasharray="6 5"/>' +
      '<text x="280" y="54" font-family="system-ui, sans-serif" font-size="26" fill="#9CA3AF" text-anchor="middle">?</text>' +
      '</svg></div>' +
      'Look at the colours in a row. Which colour comes next?',
    options:['red','blue','green','yellow'],
    answer:'red',
    hint:'Say the colours out loud in order and keep going. 🔁',
    explanation:'The pattern goes red, blue, red, blue, so the next one is <b>red</b>.' }),

  // ── speaking: short_talk (087-091) ───────────────────────────────────────

  makeMCQ({ id:'g1eng-spk-087', chapterId:CH_SPK, difficulty:2, subsection:'short_talk',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two objects drawn together">' +
      '<svg viewBox="0 0 200 150" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="40" width="160" height="14" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="34" y="54" width="14" height="70" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="152" y="54" width="14" height="70" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="100" cy="96" r="26" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<path d="M76 88 Q100 78 124 88" fill="none" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Which sentence matches the picture?',
    options:['The ball is under the table.','The ball is on the table.','The cup is under the table.','The cup is on the table.'],
    answer:'The ball is under the table.',
    hint:'Two things to check: what the thing is, and where it is. 🔴',
    explanation:'<b>The ball is under the table.</b> Under means below something.' }),

  makeMCQ({ id:'g1eng-spk-088', chapterId:CH_SPK, difficulty:2, subsection:'short_talk',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two objects drawn together">' +
      '<svg viewBox="0 0 190 170" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="190" height="170" rx="8" fill="#ffffff"/>' +
      '<rect x="46" y="98" width="96" height="14" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="46" y="40" width="14" height="60" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="48" y="112" width="12" height="46" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="128" y="112" width="12" height="46" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="76" y="54" width="56" height="44" rx="6" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="76" y="54" width="56" height="14" fill="#7E22CE" stroke="#111827" stroke-width="2"/>' +
      '<path d="M88 54 q16 -22 32 0" fill="none" stroke="#111827" stroke-width="4"/>' +
      '</svg></div>' +
      'Which sentence tells about the picture?',
    options:['The bag is on the chair.','The bag is under the chair.','The hat is on the chair.','The hat is under the chair.'],
    answer:'The bag is on the chair.',
    hint:'Name the thing first, then say where it is sitting. 🎒',
    explanation:'<b>The bag is on the chair.</b> It is resting on the seat, not below it.' }),

  makeMCQ({ id:'g1eng-spk-089', chapterId:CH_SPK, difficulty:1, subsection:'short_talk',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="an animal inside a blue area">' +
      '<svg viewBox="0 0 200 130" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="24" width="180" height="96" rx="8" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<path d="M45 72 Q85 34 132 72 Q85 110 45 72 Z" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="132,72 168,48 168,96" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="68" cy="65" r="4" fill="#111827"/>' +
      '</svg></div>' +
      'Which sentence is right?',
    options:['The fish is in the water.','The fish is in the box.','The bird is in the water.','The bird is in the box.'],
    answer:'The fish is in the water.',
    hint:'The blue part is water. What is swimming in it? 🐠',
    explanation:'<b>The fish is in the water.</b> Fish live in water, not in a box.' }),

  makeMCQ({ id:'g1eng-spk-090', chapterId:CH_SPK, difficulty:2, subsection:'short_talk',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two round objects of different sizes">' +
      '<svg viewBox="0 0 220 120" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="120" rx="8" fill="#ffffff"/>' +
      '<circle cx="70" cy="62" r="46" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="172" cy="82" r="22" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Which sentence is true about the picture?',
    options:['The red ball is big.','The red ball is small.','The blue ball is big.','The blue ball is thin.'],
    answer:'The red ball is big.',
    hint:'Compare the two balls. Which one takes up more space? 🔴🔵',
    explanation:'<b>The red ball is big.</b> The blue ball is the small one.' }),

  makeMCQ({ id:'g1eng-spk-091', chapterId:CH_SPK, difficulty:1, subsection:'short_talk',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a drawing of one object">' +
      '<svg viewBox="0 0 140 130" style="width:100%;max-width:150px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="140" height="130" rx="8" fill="#ffffff"/>' +
      '<path d="M34 30 L102 30 L94 106 L42 106 Z" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<path d="M102 44 q26 14 -7 34" fill="none" stroke="#111827" stroke-width="5"/>' +
      '<ellipse cx="68" cy="30" rx="34" ry="7" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Finish the sentence: I drink my tea from a ___.',
    options:['cup','bed','box','hat'],
    answer:'cup',
    hint:'Which one can hold water without spilling? 🍵',
    explanation:'We drink from a <b>cup</b>. It is open at the top and it has a handle.' })

);

const CH_RDR = 'g1eng-reading';

STATIC_QUESTIONS.push(

  // ── reading: print_awareness (076-080) ───────────────────────────────────

  makeMCQ({ id:'g1eng-rdr-076', chapterId:CH_RDR, difficulty:1, subsection:'print_awareness',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a page with lines of writing on it">' +
      '<svg viewBox="0 0 180 150" style="width:100%;max-width:190px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="12" width="140" height="126" rx="4" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="32" y="30" width="116" height="10" rx="5" fill="#D1D5DB"/>' +
      '<rect x="32" y="52" width="116" height="10" rx="5" fill="#D1D5DB"/>' +
      '<rect x="32" y="74" width="116" height="10" rx="5" fill="#D1D5DB"/>' +
      '<rect x="32" y="96" width="78" height="10" rx="5" fill="#D1D5DB"/>' +
      '</svg></div>' +
      'This is a page in a book. Where do we start reading?',
    options:['top left','top right','bottom left','bottom right'],
    answer:'top left',
    hint:'Think of the very first word your teacher points to. 📖',
    explanation:'We start at the <b>top left</b> of the page and read down to the bottom.' }),

  makeMCQ({ id:'g1eng-rdr-077', chapterId:CH_RDR, difficulty:1, subsection:'print_awareness',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="one line of writing">' +
      '<svg viewBox="0 0 300 70" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="70" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="28" width="46" height="14" rx="7" fill="#D1D5DB"/>' +
      '<rect x="78" y="28" width="30" height="14" rx="7" fill="#D1D5DB"/>' +
      '<rect x="120" y="28" width="60" height="14" rx="7" fill="#D1D5DB"/>' +
      '<rect x="192" y="28" width="38" height="14" rx="7" fill="#D1D5DB"/>' +
      '<rect x="242" y="28" width="40" height="14" rx="7" fill="#D1D5DB"/>' +
      '</svg></div>' +
      'When we read English, which way do our eyes go along a line?',
    options:['left to right','right to left','top to bottom','round and round'],
    answer:'left to right',
    hint:'Put your finger on the first word and slide it. Which way does it go? 👉',
    explanation:'In English we read <b>left to right</b>, then drop down to the next line.' }),

  makeMCQ({ id:'g1eng-rdr-078', chapterId:CH_RDR, difficulty:1, subsection:'print_awareness',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="one line of writing with a mark circled at the end">' +
      '<svg viewBox="0 0 300 80" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="80" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="32" width="52" height="14" rx="7" fill="#D1D5DB"/>' +
      '<rect x="84" y="32" width="34" height="14" rx="7" fill="#D1D5DB"/>' +
      '<rect x="130" y="32" width="64" height="14" rx="7" fill="#D1D5DB"/>' +
      '<rect x="206" y="32" width="40" height="14" rx="7" fill="#D1D5DB"/>' +
      '<circle cx="256" cy="44" r="5" fill="#111827"/>' +
      '<circle cx="256" cy="44" r="15" fill="none" stroke="#EF4444" stroke-width="3"/>' +
      '</svg></div>' +
      'The red ring shows a mark at the end of the line. What is that mark called?',
    options:['a full stop','a big space','a small line','a top curve'],
    answer:'a full stop',
    hint:'It is a tiny dot that tells you the sentence has finished. ⏹️',
    explanation:'It is <b>a full stop</b>. It shows the sentence is over, so you can take a breath.' }),

  makeMCQ({ id:'g1eng-rdr-079', chapterId:CH_RDR, difficulty:1, subsection:'print_awareness',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a closed book with an arrow pointing to one part">' +
      '<svg viewBox="0 0 190 150" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="190" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="30" y="18" width="110" height="118" rx="6" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="40" y="34" width="90" height="18" rx="4" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<rect x="46" y="76" width="78" height="8" rx="4" fill="#BFDBFE"/>' +
      '<rect x="46" y="94" width="78" height="8" rx="4" fill="#BFDBFE"/>' +
      '<line x1="176" y1="43" x2="146" y2="43" stroke="#111827" stroke-width="3"/>' +
      '<polygon points="146,36 146,50 134,43" fill="#111827"/>' +
      '</svg></div>' +
      'The arrow points to the part that tells you the name of the book. What is it?',
    options:['the title','the pages','the words','the shelf'],
    answer:'the title',
    hint:'It is written big on the front cover. 📕',
    explanation:'That is <b>the title</b>. Every book has a title on its cover.' }),

  makeMCQ({ id:'g1eng-rdr-080', chapterId:CH_RDR, difficulty:2, subsection:'print_awareness',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="one line of writing that starts with a taller block">' +
      '<svg viewBox="0 0 300 80" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="80" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="24" width="16" height="24" rx="4" fill="#3B82F6"/>' +
      '<rect x="40" y="34" width="38" height="14" rx="7" fill="#D1D5DB"/>' +
      '<rect x="90" y="34" width="30" height="14" rx="7" fill="#D1D5DB"/>' +
      '<rect x="132" y="34" width="58" height="14" rx="7" fill="#D1D5DB"/>' +
      '<rect x="202" y="34" width="44" height="14" rx="7" fill="#D1D5DB"/>' +
      '<circle cx="258" cy="46" r="5" fill="#111827"/>' +
      '</svg></div>' +
      'The blue block is the tall (capital) letter. Which letter in a sentence is a capital?',
    options:['the first one','the last one','the third one','the middle one'],
    answer:'the first one',
    hint:'Look where the blue block sits in the line. 🔵',
    explanation:'<b>The first one</b>. Every sentence begins with a capital letter and ends with a full stop.' }),

  // ── reading: letter_recognition (081-086) ────────────────────────────────

  makeMCQ({ id:'g1eng-rdr-081', chapterId:CH_RDR, difficulty:1, subsection:'letter_recognition',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a round bright drawing with lines around it">' +
      '<svg viewBox="0 0 130 130" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="130" height="130" rx="8" fill="#ffffff"/>' +
      '<circle cx="65" cy="65" r="32" fill="#FACC15" stroke="#F59E0B" stroke-width="3"/>' +
      '<line x1="65" y1="27" x2="65" y2="12" stroke="#F59E0B" stroke-width="5"/>' +
      '<line x1="65" y1="103" x2="65" y2="118" stroke="#F59E0B" stroke-width="5"/>' +
      '<line x1="27" y1="65" x2="12" y2="65" stroke="#F59E0B" stroke-width="5"/>' +
      '<line x1="103" y1="65" x2="118" y2="65" stroke="#F59E0B" stroke-width="5"/>' +
      '</svg></div>' +
      'Which letter does the name of this picture start with?',
    options:['s','b','n','r'],
    answer:'s',
    hint:'It shines in the sky and it is very hot. Say its name slowly. ☀️',
    explanation:'It is the sun, and sun starts with <b>s</b>.' }),

  makeMCQ({ id:'g1eng-rdr-082', chapterId:CH_RDR, difficulty:1, subsection:'letter_recognition',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a toy that flies on a string">' +
      '<svg viewBox="0 0 140 170" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="140" height="170" rx="8" fill="#ffffff"/>' +
      '<polygon points="70,12 120,70 70,126 20,70" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<line x1="70" y1="12" x2="70" y2="126" stroke="#111827" stroke-width="2"/>' +
      '<line x1="20" y1="70" x2="120" y2="70" stroke="#111827" stroke-width="2"/>' +
      '<path d="M70 126 q16 12 0 22 q-16 10 0 20" fill="none" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Which letter does this word begin with?',
    options:['k','c','g','p'],
    answer:'k',
    hint:'You fly it on a windy day at the beach. 🪁',
    explanation:'It is a kite, and kite begins with <b>k</b>.' }),

  makeMCQ({ id:'g1eng-rdr-083', chapterId:CH_RDR, difficulty:2, subsection:'letter_recognition',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four letters in boxes">' +
      '<svg viewBox="0 0 340 132" style="width:100%;max-width:330px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="340" height="132" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="92" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="176" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="260" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<text x="44" y="76" font-family="system-ui, sans-serif" font-size="56" fill="#1f2937" text-anchor="middle">p</text>' +
      '<text x="128" y="76" font-family="system-ui, sans-serif" font-size="56" fill="#1f2937" text-anchor="middle">d</text>' +
      '<text x="212" y="76" font-family="system-ui, sans-serif" font-size="56" fill="#1f2937" text-anchor="middle">b</text>' +
      '<text x="296" y="76" font-family="system-ui, sans-serif" font-size="56" fill="#1f2937" text-anchor="middle">q</text>' +
      '<text x="44" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">A</text>' +
      '<text x="128" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">B</text>' +
      '<text x="212" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">C</text>' +
      '<text x="296" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Which box holds the letter <b>d</b>?',
    options:['A','B','C','D'],
    answer:'B',
    hint:'In d, the round part comes first and the tall line is after it.',
    explanation:'Box <b>B</b> is d. In d the circle is on the left; in b the circle is on the right.' }),

  makeMCQ({ id:'g1eng-rdr-084', chapterId:CH_RDR, difficulty:1, subsection:'letter_recognition',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="one big letter">' +
      '<svg viewBox="0 0 130 130" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="130" height="130" rx="8" fill="#ffffff"/>' +
      '<text x="65" y="98" font-family="system-ui, sans-serif" font-size="86" fill="#1f2937" text-anchor="middle">M</text>' +
      '</svg></div>' +
      'Which letter is this?',
    options:['M','W','N','E'],
    answer:'M',
    hint:'Its two legs point down and the middle dips like a valley.',
    explanation:'It is <b>M</b>. W is the same shape turned upside down, so look at which way it points.' }),

  makeMCQ({ id:'g1eng-rdr-085', chapterId:CH_RDR, difficulty:1, subsection:'letter_recognition',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a drawing of one fruit">' +
      '<svg viewBox="0 0 130 140" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="130" height="140" rx="8" fill="#ffffff"/>' +
      '<circle cx="65" cy="82" r="44" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<line x1="65" y1="38" x2="65" y2="18" stroke="#92400E" stroke-width="6"/>' +
      '<ellipse cx="88" cy="24" rx="18" ry="8" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '</svg></div>' +
      'Which letter makes the first sound in the name of this fruit?',
    options:['A','E','O','U'],
    answer:'A',
    hint:'It is red, round and crunchy. Say the word and stop after the first sound. 🍎',
    explanation:'It is an apple, and apple starts with <b>A</b>.' }),

  makeMCQ({ id:'g1eng-rdr-086', chapterId:CH_RDR, difficulty:2, subsection:'letter_recognition',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="one small letter">' +
      '<svg viewBox="0 0 130 130" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="130" height="130" rx="8" fill="#ffffff"/>' +
      '<text x="65" y="96" font-family="system-ui, sans-serif" font-size="86" fill="#1f2937" text-anchor="middle">r</text>' +
      '</svg></div>' +
      'Which is the big (capital) letter for this small letter?',
    options:['R','P','B','K'],
    answer:'R',
    hint:'Say the sound of the small letter, then find the big one that says the same. 🔤',
    explanation:'The small letter is r, so the capital is <b>R</b>. Every letter has a big and a small form.' }),

  // ── reading: sight_words (087-091) ───────────────────────────────────────

  makeMCQ({ id:'g1eng-rdr-087', chapterId:CH_RDR, difficulty:1, subsection:'sight_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a round object">' +
      '<svg viewBox="0 0 120 120" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="120" height="120" rx="8" fill="#ffffff"/>' +
      '<circle cx="60" cy="60" r="45" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<line x1="15" y1="60" x2="105" y2="60" stroke="#111827" stroke-width="2"/>' +
      '<path d="M60 15 Q40 60 60 105" fill="none" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Read it: <b>This is my ___.</b> Which word finishes it?',
    options:['ball','book','bag','box'],
    answer:'ball',
    hint:'Look at the picture, then say the whole sentence out loud. ⚽',
    explanation:'<b>This is my ball.</b> The picture tells you which word fits.' }),

  makeMCQ({ id:'g1eng-rdr-088', chapterId:CH_RDR, difficulty:2, subsection:'sight_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four words in boxes">' +
      '<svg viewBox="0 0 340 132" style="width:100%;max-width:330px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="340" height="132" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="92" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="176" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="260" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<text x="44" y="64" font-family="system-ui, sans-serif" font-size="26" fill="#1f2937" text-anchor="middle">they</text>' +
      '<text x="128" y="64" font-family="system-ui, sans-serif" font-size="26" fill="#1f2937" text-anchor="middle">then</text>' +
      '<text x="212" y="64" font-family="system-ui, sans-serif" font-size="26" fill="#1f2937" text-anchor="middle">the</text>' +
      '<text x="296" y="64" font-family="system-ui, sans-serif" font-size="26" fill="#1f2937" text-anchor="middle">them</text>' +
      '<text x="44" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">A</text>' +
      '<text x="128" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">B</text>' +
      '<text x="212" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">C</text>' +
      '<text x="296" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Which box holds the word <b>the</b>?',
    options:['A','B','C','D'],
    answer:'C',
    hint:'Count the letters. The shortest word here has only three. 🔍',
    explanation:'Box <b>C</b> says the. The others are longer: they, then and them.' }),

  makeMCQ({ id:'g1eng-rdr-089', chapterId:CH_RDR, difficulty:1, subsection:'sight_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a building drawing">' +
      '<svg viewBox="0 0 170 140" style="width:100%;max-width:180px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="170" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="34" y="62" width="102" height="62" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="24,62 85,20 146,62" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="70" y="88" width="28" height="36" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="44" y="74" width="20" height="18" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Read it: <b>I go ___ my house.</b> Which small word fits?',
    options:['to','of','at','up'],
    answer:'to',
    hint:'Say the sentence with each word. Which one sounds right? 🏠',
    explanation:'<b>I go to my house.</b> We use to when we are going somewhere.' }),

  makeMCQ({ id:'g1eng-rdr-090', chapterId:CH_RDR, difficulty:1, subsection:'sight_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a vehicle drawn in one colour">' +
      '<svg viewBox="0 0 210 130" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="210" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="16" y="24" width="178" height="66" rx="8" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="30" y="36" width="38" height="26" fill="#BFDBFE" stroke="#111827" stroke-width="2"/>' +
      '<rect x="82" y="36" width="38" height="26" fill="#BFDBFE" stroke="#111827" stroke-width="2"/>' +
      '<rect x="134" y="36" width="38" height="26" fill="#BFDBFE" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="58" cy="98" r="15" fill="#111827"/>' +
      '<circle cx="156" cy="98" r="15" fill="#111827"/>' +
      '</svg></div>' +
      'Read it: <b>The bus is ___.</b> Which word tells about the picture?',
    options:['red','wet','sad','old'],
    answer:'red',
    hint:'Look at the colour of the bus, then read the sentence again. 🚌',
    explanation:'<b>The bus is red.</b> A colour word can finish a sentence like this.' }),

  makeMCQ({ id:'g1eng-rdr-091', chapterId:CH_RDR, difficulty:2, subsection:'sight_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two objects side by side">' +
      '<svg viewBox="0 0 230 120" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="230" height="120" rx="8" fill="#ffffff"/>' +
      '<path d="M24 30 L84 30 L77 94 L31 94 Z" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<path d="M84 44 q24 12 -6 30" fill="none" stroke="#111827" stroke-width="5"/>' +
      '<ellipse cx="166" cy="66" rx="54" ry="32" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="166" cy="66" rx="38" ry="20" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '</svg></div>' +
      'Read it: <b>A cup ___ a plate.</b> Which joining word fits?',
    options:['and','but','the','are'],
    answer:'and',
    hint:'Which little word puts two things together? ➕',
    explanation:'<b>A cup and a plate.</b> The word and joins two things in a list.' })

);

const CH_WRT = 'g1eng-writing';

STATIC_QUESTIONS.push(

  // ── writing: letter_formation (076-081) ──────────────────────────────────

  makeMCQ({ id:'g1eng-wrt-076', chapterId:CH_WRT, difficulty:1, subsection:'letter_formation',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a letter stroke with a green dot and a grey arrow">' +
      '<svg viewBox="0 0 130 140" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="130" height="140" rx="8" fill="#ffffff"/>' +
      '<line x1="50" y1="22" x2="50" y2="112" stroke="#1f2937" stroke-width="9" stroke-linecap="round"/>' +
      '<circle cx="50" cy="22" r="8" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '<line x1="82" y1="30" x2="82" y2="96" stroke="#9CA3AF" stroke-width="3"/>' +
      '<polygon points="75,96 89,96 82,110" fill="#9CA3AF"/>' +
      '</svg></div>' +
      'The green dot shows where your pencil begins. Where do you start writing this letter?',
    options:['at the top','at the bottom','in the middle','at the corner'],
    answer:'at the top',
    hint:'Find the green dot and see how high up it is. ✏️',
    explanation:'You start <b>at the top</b> and pull the line straight down. Tall letters always start high.' }),

  makeMCQ({ id:'g1eng-wrt-077', chapterId:CH_WRT, difficulty:2, subsection:'letter_formation',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four letter shapes in boxes">' +
      '<svg viewBox="0 0 340 132" style="width:100%;max-width:330px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="340" height="132" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="92" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="176" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="260" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<line x1="50" y1="15" x2="50" y2="80" stroke="#1f2937" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="34" cy="64" r="15" fill="none" stroke="#1f2937" stroke-width="6"/>' +
      '<line x1="114" y1="30" x2="114" y2="95" stroke="#1f2937" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="130" cy="45" r="15" fill="none" stroke="#1f2937" stroke-width="6"/>' +
      '<line x1="198" y1="15" x2="198" y2="80" stroke="#1f2937" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="214" cy="64" r="15" fill="none" stroke="#1f2937" stroke-width="6"/>' +
      '<line x1="302" y1="30" x2="302" y2="95" stroke="#1f2937" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="286" cy="45" r="15" fill="none" stroke="#1f2937" stroke-width="6"/>' +
      '<text x="44" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">A</text>' +
      '<text x="128" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">B</text>' +
      '<text x="212" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">C</text>' +
      '<text x="296" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Which box shows the letter <b>b</b> written the right way round?',
    options:['A','B','C','D'],
    answer:'C',
    hint:'For b, the tall line comes first and the tummy sits on the right at the bottom.',
    explanation:'Box <b>C</b> is a proper b: tall line on the left, round part on the right, both sitting on the line.' }),

  makeMCQ({ id:'g1eng-wrt-078', chapterId:CH_WRT, difficulty:2, subsection:'letter_formation',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a round letter with a green dot and a grey arrow">' +
      '<svg viewBox="0 0 130 130" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="130" height="130" rx="8" fill="#ffffff"/>' +
      '<circle cx="65" cy="68" r="38" fill="none" stroke="#1f2937" stroke-width="9"/>' +
      '<circle cx="90" cy="44" r="8" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '<path d="M86 24 A46 46 0 0 0 22 58" fill="none" stroke="#9CA3AF" stroke-width="3"/>' +
      '<polygon points="16,48 16,70 4,59" fill="#9CA3AF"/>' +
      '</svg></div>' +
      'The green dot is the start and the grey arrow shows the way. Which way do you go?',
    options:['round to the left','round to the right','straight down','straight across'],
    answer:'round to the left',
    hint:'Follow the grey arrow with your finger before you answer. 🔄',
    explanation:'You go <b>round to the left</b>. Letters like o, a and c all start at the top and curve left.' }),

  makeMCQ({ id:'g1eng-wrt-079', chapterId:CH_WRT, difficulty:1, subsection:'letter_formation',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a letter drawn with dashes">' +
      '<svg viewBox="0 0 130 130" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="130" height="130" rx="8" fill="#ffffff"/>' +
      '<path d="M92 40 A34 34 0 1 0 92 96" fill="none" stroke="#1f2937" stroke-width="9" stroke-dasharray="9 9" stroke-linecap="round"/>' +
      '</svg></div>' +
      'Trace the dashes. Which letter are you writing?',
    options:['c','o','e','s'],
    answer:'c',
    hint:'Is the shape closed all the way round, or is there a gap? 🖊️',
    explanation:'It is <b>c</b>. A c is an open curve; an o would be joined up all the way round.' }),

  makeMCQ({ id:'g1eng-wrt-080', chapterId:CH_WRT, difficulty:1, subsection:'letter_formation',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a letter made of straight bars">' +
      '<svg viewBox="0 0 130 130" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="130" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="25" y="24" width="80" height="12" fill="#1f2937"/>' +
      '<rect x="59" y="24" width="12" height="82" fill="#1f2937"/>' +
      '</svg></div>' +
      'How many straight lines do you draw to write this letter?',
    options:['1','2','3','4'],
    answer:'2',
    hint:'Count the bars: one lying flat and how many standing up? ➖',
    explanation:'You draw <b>2</b> lines for T: one across the top, one straight down.' }),

  makeMCQ({ id:'g1eng-wrt-081', chapterId:CH_WRT, difficulty:2, subsection:'letter_formation',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a short letter stroke that is not finished">' +
      '<svg viewBox="0 0 110 140" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="110" height="140" rx="8" fill="#ffffff"/>' +
      '<line x1="10" y1="112" x2="100" y2="112" stroke="#9CA3AF" stroke-width="2"/>' +
      '<line x1="55" y1="56" x2="55" y2="112" stroke="#1f2937" stroke-width="10" stroke-linecap="round"/>' +
      '</svg></div>' +
      'This is the letter <b>i</b>, but it is not finished. What is missing?',
    options:['the dot','the line','the curve','the tail'],
    answer:'the dot',
    hint:'Say the letter and picture it in your book. What sits above it? 🔵',
    explanation:'<b>The dot</b> is missing. An i is a short line with a dot on top; without it, it is just a line.' }),

  // ── writing: copying_words (082-086) ─────────────────────────────────────

  makeMCQ({ id:'g1eng-wrt-082', chapterId:CH_WRT, difficulty:1, subsection:'copying_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="one short word written on a line">' +
      '<svg viewBox="0 0 200 100" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="100" rx="8" fill="#ffffff"/>' +
      '<line x1="20" y1="74" x2="180" y2="74" stroke="#9CA3AF" stroke-width="2"/>' +
      '<text x="100" y="70" font-family="system-ui, sans-serif" font-size="48" fill="#1f2937" text-anchor="middle">cat</text>' +
      '</svg></div>' +
      'Copy the word carefully. Which one below is exactly the same?',
    options:['cat','cot','cut','act'],
    answer:'cat',
    hint:'Check the letters one by one, from left to right. 🔤',
    explanation:'The word is <b>cat</b>. When you copy, check every letter and its order.' }),

  makeMCQ({ id:'g1eng-wrt-083', chapterId:CH_WRT, difficulty:1, subsection:'copying_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="one short word written on a line">' +
      '<svg viewBox="0 0 200 100" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="100" rx="8" fill="#ffffff"/>' +
      '<line x1="20" y1="74" x2="180" y2="74" stroke="#9CA3AF" stroke-width="2"/>' +
      '<text x="100" y="70" font-family="system-ui, sans-serif" font-size="48" fill="#1f2937" text-anchor="middle">sun</text>' +
      '</svg></div>' +
      'How many letters must you copy?',
    options:['2','3','4','5'],
    answer:'3',
    hint:'Touch each letter with your finger and count as you go. ☝️',
    explanation:'There are <b>3</b> letters: s, u and n.' }),

  makeMCQ({ id:'g1eng-wrt-084', chapterId:CH_WRT, difficulty:2, subsection:'copying_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="one word written on a line">' +
      '<svg viewBox="0 0 240 100" style="width:100%;max-width:240px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="100" rx="8" fill="#ffffff"/>' +
      '<line x1="20" y1="74" x2="220" y2="74" stroke="#9CA3AF" stroke-width="2"/>' +
      '<text x="120" y="70" font-family="system-ui, sans-serif" font-size="44" fill="#1f2937" text-anchor="middle">mango</text>' +
      '</svg></div>' +
      'Which one has been copied correctly?',
    options:['mango','mangoe','mangi','mnago'],
    answer:'mango',
    hint:'Read the word on the line slowly, letter by letter. 🥭',
    explanation:'<b>mango</b> is right. The others have a letter added, changed or swapped round.' }),

  makeMCQ({ id:'g1eng-wrt-085', chapterId:CH_WRT, difficulty:2, subsection:'copying_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two words written on a line with a red mark between them">' +
      '<svg viewBox="0 0 250 110" style="width:100%;max-width:250px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="250" height="110" rx="8" fill="#ffffff"/>' +
      '<line x1="20" y1="70" x2="230" y2="70" stroke="#9CA3AF" stroke-width="2"/>' +
      '<text x="70" y="66" font-family="system-ui, sans-serif" font-size="40" fill="#1f2937" text-anchor="middle">my</text>' +
      '<text x="175" y="66" font-family="system-ui, sans-serif" font-size="40" fill="#1f2937" text-anchor="middle">bag</text>' +
      '<line x1="110" y1="86" x2="140" y2="86" stroke="#EF4444" stroke-width="4"/>' +
      '<line x1="110" y1="80" x2="110" y2="94" stroke="#EF4444" stroke-width="4"/>' +
      '<line x1="140" y1="80" x2="140" y2="94" stroke="#EF4444" stroke-width="4"/>' +
      '</svg></div>' +
      'The red mark shows what we leave between two words. What is it?',
    options:['a space','a full stop','a big letter','a small line'],
    answer:'a space',
    hint:'When you write, your finger goes there to keep the words apart. 👆',
    explanation:'It is <b>a space</b>. Without a space the words would run together and be hard to read.' }),

  makeMCQ({ id:'g1eng-wrt-086', chapterId:CH_WRT, difficulty:2, subsection:'copying_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a word with one letter left out">' +
      '<svg viewBox="0 0 250 110" style="width:100%;max-width:250px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="250" height="110" rx="8" fill="#ffffff"/>' +
      '<line x1="20" y1="78" x2="230" y2="78" stroke="#9CA3AF" stroke-width="2"/>' +
      '<text x="52" y="72" font-family="system-ui, sans-serif" font-size="44" fill="#1f2937" text-anchor="middle">b</text>' +
      '<text x="100" y="72" font-family="system-ui, sans-serif" font-size="44" fill="#1f2937" text-anchor="middle">o</text>' +
      '<rect x="126" y="32" width="44" height="46" rx="4" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2" stroke-dasharray="6 5"/>' +
      '<text x="196" y="72" font-family="system-ui, sans-serif" font-size="44" fill="#1f2937" text-anchor="middle">k</text>' +
      '</svg></div>' +
      'You are copying the word <b>book</b>. Which letter goes in the empty box?',
    options:['o','a','e','u'],
    answer:'o',
    hint:'Say b - oo - k slowly. What sound comes in the middle? 📗',
    explanation:'The word is book, so the missing letter is <b>o</b>. Book has a double o in the middle.' }),

  // ── writing: basic_sentences (087-091) ───────────────────────────────────

  makeMCQ({ id:'g1eng-wrt-087', chapterId:CH_WRT, difficulty:2, subsection:'basic_sentences',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a bright round drawing">' +
      '<svg viewBox="0 0 130 130" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="130" height="130" rx="8" fill="#ffffff"/>' +
      '<circle cx="65" cy="65" r="32" fill="#F97316" stroke="#EA580C" stroke-width="3"/>' +
      '<line x1="65" y1="27" x2="65" y2="12" stroke="#EA580C" stroke-width="5"/>' +
      '<line x1="65" y1="103" x2="65" y2="118" stroke="#EA580C" stroke-width="5"/>' +
      '<line x1="27" y1="65" x2="12" y2="65" stroke="#EA580C" stroke-width="5"/>' +
      '<line x1="103" y1="65" x2="118" y2="65" stroke="#EA580C" stroke-width="5"/>' +
      '</svg></div>' +
      'Which sentence is written correctly?',
    options:['The sun is hot.','the sun is hot.','THE sun is hot.','The sun is hot'],
    answer:'The sun is hot.',
    hint:'Check two things: the very first letter, and the very last mark. 🔎',
    explanation:'<b>The sun is hot.</b> A sentence starts with one capital letter and ends with a full stop.' }),

  makeMCQ({ id:'g1eng-wrt-088', chapterId:CH_WRT, difficulty:2, subsection:'basic_sentences',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a drawing of one object">' +
      '<svg viewBox="0 0 140 130" style="width:100%;max-width:150px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="140" height="130" rx="8" fill="#ffffff"/>' +
      '<path d="M34 30 L102 30 L94 106 L42 106 Z" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<path d="M102 44 q26 14 -7 34" fill="none" stroke="#111827" stroke-width="5"/>' +
      '</svg></div>' +
      'The words are mixed up: cup / my / is / This. Which sentence is right?',
    options:['This is my cup.','My this is cup.','Is my cup this.','Cup is my this.'],
    answer:'This is my cup.',
    hint:'Which word has the capital letter? That one goes first. 🔤',
    explanation:'<b>This is my cup.</b> The capital word starts the sentence and the full stop ends it.' }),

  makeMCQ({ id:'g1eng-wrt-089', chapterId:CH_WRT, difficulty:1, subsection:'basic_sentences',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="one object resting on another">' +
      '<svg viewBox="0 0 220 140" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="24" y="34" width="14" height="82" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="24" y="76" width="172" height="26" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="24" y="62" width="172" height="16" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
      '<rect x="40" y="44" width="52" height="18" rx="7" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
      '<rect x="116" y="30" width="56" height="34" rx="6" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<path d="M128 30 q16 -20 32 0" fill="none" stroke="#111827" stroke-width="4"/>' +
      '</svg></div>' +
      'Finish the sentence: <b>The bag is on the ___.</b>',
    options:['bed','bus','box','bin'],
    answer:'bed',
    hint:'Look at what the bag is sitting on. It has a pillow. 🛏️',
    explanation:'<b>The bag is on the bed.</b> The picture tells you the last word.' }),

  makeMCQ({ id:'g1eng-wrt-090', chapterId:CH_WRT, difficulty:2, subsection:'basic_sentences',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a yard scene with weather">' +
      '<svg viewBox="0 0 200 150" style="width:100%;max-width:210px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="150" rx="8" fill="#ffffff"/>' +
      '<circle cx="70" cy="34" r="20" fill="#CBD5E1" stroke="#6B7280" stroke-width="2"/>' +
      '<circle cx="100" cy="26" r="24" fill="#CBD5E1" stroke="#6B7280" stroke-width="2"/>' +
      '<circle cx="126" cy="36" r="18" fill="#CBD5E1" stroke="#6B7280" stroke-width="2"/>' +
      '<rect x="66" y="34" width="62" height="18" fill="#CBD5E1" stroke="#CBD5E1" stroke-width="1"/>' +
      '<line x1="72" y1="60" x2="66" y2="82" stroke="#3B82F6" stroke-width="4"/>' +
      '<line x1="100" y1="60" x2="94" y2="84" stroke="#3B82F6" stroke-width="4"/>' +
      '<line x1="126" y1="60" x2="120" y2="82" stroke="#3B82F6" stroke-width="4"/>' +
      '<rect x="34" y="96" width="14" height="34" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="41" cy="86" r="26" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '<rect x="10" y="130" width="180" height="14" fill="#DCFCE7" stroke="#22C55E" stroke-width="2"/>' +
      '</svg></div>' +
      'Choose the missing word: <b>It is ___ today.</b>',
    options:['raining','running','reading','ringing'],
    answer:'raining',
    hint:'Look at what is falling from the cloud onto the yard. 🌧️',
    explanation:'<b>It is raining today.</b> The drops falling from the cloud are rain.' }),

  makeMCQ({ id:'g1eng-wrt-091', chapterId:CH_WRT, difficulty:2, subsection:'basic_sentences',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a plant drawn in one colour">' +
      '<svg viewBox="0 0 150 160" style="width:100%;max-width:150px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="150" height="160" rx="8" fill="#ffffff"/>' +
      '<line x1="75" y1="150" x2="75" y2="82" stroke="#22C55E" stroke-width="6"/>' +
      '<ellipse cx="102" cy="116" rx="22" ry="10" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '<circle cx="75" cy="34" r="19" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>' +
      '<circle cx="103" cy="54" r="19" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>' +
      '<circle cx="92" cy="84" r="19" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>' +
      '<circle cx="58" cy="84" r="19" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>' +
      '<circle cx="47" cy="54" r="19" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>' +
      '<circle cx="75" cy="60" r="16" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>' +
      '</svg></div>' +
      'Which sentence tells about the picture?',
    options:['The flower is red.','The flower is blue.','The flag is red.','The flag is blue.'],
    answer:'The flower is red.',
    hint:'Say what the thing is, then say its colour. 🌺',
    explanation:'<b>The flower is red.</b> Check both parts of the sentence before you choose.' })

);

const CH_GRM = 'g1eng-grammar';

STATIC_QUESTIONS.push(

  // ── grammar: common_nouns (076-081) ──────────────────────────────────────

  makeMCQ({ id:'g1eng-grm-076', chapterId:CH_GRM, difficulty:1, subsection:'common_nouns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a piece of furniture">' +
      '<svg viewBox="0 0 190 130" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="190" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="15" y="40" width="160" height="16" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="30" y="56" width="14" height="62" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="146" y="56" width="14" height="62" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'A naming word tells us what a thing is. Which word names this?',
    options:['table','ladder','basket','window'],
    answer:'table',
    hint:'You eat your dinner on it, and it has legs. 🍽️',
    explanation:'It is a <b>table</b>. Table is a naming word, or noun.' }),

  makeMCQ({ id:'g1eng-grm-077', chapterId:CH_GRM, difficulty:2, subsection:'common_nouns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a building drawing">' +
      '<svg viewBox="0 0 170 140" style="width:100%;max-width:180px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="170" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="34" y="62" width="102" height="62" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="24,62 85,20 146,62" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="70" y="88" width="28" height="36" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="44" y="74" width="20" height="18" fill="#BFDBFE" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Only one of these words is a naming word. Which one is it?',
    options:['house','under','quick','slowly'],
    answer:'house',
    hint:'A naming word is a thing you can point to in the picture. 🏠',
    explanation:'<b>House</b> is a naming word, because it names a thing. Under, quick and slowly do not name anything.' }),

  makeMCQ({ id:'g1eng-grm-078', chapterId:CH_GRM, difficulty:2, subsection:'common_nouns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a container drawn in one colour">' +
      '<svg viewBox="0 0 160 130" style="width:100%;max-width:170px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="26" y="42" width="108" height="70" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="18" y="26" width="124" height="18" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<line x1="80" y1="44" x2="80" y2="112" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Which words tell about the picture?',
    options:['a green box','a green bag','a brown box','a brown bag'],
    answer:'a green box',
    hint:'First say what it is, then say its colour. 📦',
    explanation:'It is <b>a green box</b>. The colour word comes before the naming word.' }),

  makeMCQ({ id:'g1eng-grm-079', chapterId:CH_GRM, difficulty:2, subsection:'common_nouns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two of the same thing on the water">' +
      '<svg viewBox="0 0 300 130" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="98" width="280" height="22" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<path d="M22 78 L128 78 L112 100 L38 100 Z" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<line x1="75" y1="78" x2="75" y2="18" stroke="#111827" stroke-width="4"/>' +
      '<polygon points="80,22 80,72 124,72" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
      '<path d="M172 78 L278 78 L262 100 L188 100 Z" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<line x1="225" y1="78" x2="225" y2="18" stroke="#111827" stroke-width="4"/>' +
      '<polygon points="230,22 230,72 274,72" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Finish it: <b>There are two ___ on the sea.</b>',
    options:['boats','boat','boates','boaties'],
    answer:'boats',
    hint:'When there is more than one, we usually add s to the naming word. ⛵',
    explanation:'<b>Two boats.</b> One boat, but two boats - we add an s for more than one.' }),

  makeMCQ({ id:'g1eng-grm-080', chapterId:CH_GRM, difficulty:1, subsection:'common_nouns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="some food on a plate">' +
      '<svg viewBox="0 0 200 130" style="width:100%;max-width:210px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="130" rx="8" fill="#ffffff"/>' +
      '<ellipse cx="100" cy="86" rx="82" ry="30" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
      '<rect x="48" y="38" width="104" height="46" rx="20" fill="#92400E" stroke="#78350F" stroke-width="2"/>' +
      '<line x1="70" y1="48" x2="82" y2="60" stroke="#78350F" stroke-width="3"/>' +
      '<line x1="94" y1="46" x2="106" y2="58" stroke="#78350F" stroke-width="3"/>' +
      '<line x1="118" y1="48" x2="130" y2="60" stroke="#78350F" stroke-width="3"/>' +
      '</svg></div>' +
      'Which word names the food on the plate?',
    options:['bread','butter','cheese','biscuit'],
    answer:'bread',
    hint:'We eat it in the morning with tea, and we cut it in slices. 🍞',
    explanation:'It is <b>bread</b>. Bread is a naming word for a food.' }),

  makeMCQ({ id:'g1eng-grm-081', chapterId:CH_GRM, difficulty:2, subsection:'common_nouns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three objects in a row">' +
      '<svg viewBox="0 0 300 130" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="16" y="52" width="70" height="22" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="86,52 116,63 86,74" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="108,60 116,63 108,66" fill="#111827"/>' +
      '<rect x="132" y="40" width="24" height="70" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<line x1="132" y1="56" x2="144" y2="56" stroke="#111827" stroke-width="2"/>' +
      '<line x1="132" y1="72" x2="144" y2="72" stroke="#111827" stroke-width="2"/>' +
      '<line x1="132" y1="88" x2="144" y2="88" stroke="#111827" stroke-width="2"/>' +
      '<rect x="190" y="32" width="76" height="78" rx="4" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="200" y="42" width="56" height="58" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'One naming word covers all three things. Which one?',
    options:['school things','play things','kitchen pots','garden tools'],
    answer:'school things',
    hint:'Where do you take a pencil, a ruler and a book every morning? 🎒',
    explanation:'They are all <b>school things</b>. One naming word can stand for a whole group.' }),

  // ── grammar: articles_a_an (082-087) ─────────────────────────────────────

  makeMCQ({ id:'g1eng-grm-082', chapterId:CH_GRM, difficulty:1, subsection:'articles_a_an',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a drawing of one fruit">' +
      '<svg viewBox="0 0 130 140" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="130" height="140" rx="8" fill="#ffffff"/>' +
      '<circle cx="65" cy="82" r="44" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '<line x1="65" y1="38" x2="65" y2="18" stroke="#92400E" stroke-width="6"/>' +
      '<ellipse cx="88" cy="24" rx="18" ry="8" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '</svg></div>' +
      'This is an apple. We say ___ apple.',
    options:['an','a','the','two'],
    answer:'an',
    hint:'Apple starts with a vowel sound. Which little word do we use then? 🍏',
    explanation:'We say <b>an</b> apple. We use an before a, e, i, o and u sounds.' }),

  makeMCQ({ id:'g1eng-grm-083', chapterId:CH_GRM, difficulty:1, subsection:'articles_a_an',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a round object">' +
      '<svg viewBox="0 0 120 120" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="120" height="120" rx="8" fill="#ffffff"/>' +
      '<circle cx="60" cy="60" r="45" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<path d="M18 48 Q60 34 102 48" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<path d="M18 72 Q60 86 102 72" fill="none" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'This is a ball. We say ___ ball.',
    options:['a','an','two','the'],
    answer:'a',
    hint:'Ball starts with the /b/ sound, not a vowel sound. ⚽',
    explanation:'We say <b>a</b> ball. Before most other sounds we use a, not an.' }),

  makeMCQ({ id:'g1eng-grm-084', chapterId:CH_GRM, difficulty:2, subsection:'articles_a_an',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="one smooth oval object">' +
      '<svg viewBox="0 0 120 150" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="120" height="150" rx="8" fill="#ffffff"/>' +
      '<ellipse cx="60" cy="82" rx="38" ry="52" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
      '</svg></div>' +
      'Which one is written correctly?',
    options:['an egg','a egg','an eggs','a eggs'],
    answer:'an egg',
    hint:'Say both out loud. Which one is easy to say? 🥚',
    explanation:'<b>an egg</b> is right. Egg starts with the e sound, so we use an, and there is only one.' }),

  makeMCQ({ id:'g1eng-grm-085', chapterId:CH_GRM, difficulty:2, subsection:'articles_a_an',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a drawing of one object">' +
      '<svg viewBox="0 0 160 160" style="width:100%;max-width:170px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="160" rx="8" fill="#ffffff"/>' +
      '<path d="M18 78 A62 62 0 0 1 142 78 Z" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<line x1="18" y1="78" x2="142" y2="78" stroke="#111827" stroke-width="2"/>' +
      '<line x1="80" y1="16" x2="80" y2="128" stroke="#92400E" stroke-width="5"/>' +
      '<path d="M80 128 q0 16 -18 16 q-16 0 -16 -14" fill="none" stroke="#92400E" stroke-width="5"/>' +
      '</svg></div>' +
      'Finish it: <b>I have ___ at home.</b>',
    options:['an umbrella','a umbrella','an umbrellas','the umbrellas'],
    answer:'an umbrella',
    hint:'Umbrella starts with the u sound, and there is only one in the picture. ☂️',
    explanation:'<b>an umbrella</b> is right. Vowel sound at the start, so we use an.' }),

  makeMCQ({ id:'g1eng-grm-086', chapterId:CH_GRM, difficulty:2, subsection:'articles_a_an',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a small metal object">' +
      '<svg viewBox="0 0 190 100" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="190" height="100" rx="8" fill="#ffffff"/>' +
      '<circle cx="42" cy="50" r="26" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="42" cy="50" r="10" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
      '<rect x="66" y="42" width="102" height="16" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<rect x="128" y="58" width="11" height="16" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<rect x="150" y="58" width="11" height="16" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'We say <b>a key</b>, not <b>an key</b>. Why?',
    options:['key starts with k','key starts with e','key is a big word','key is a short word'],
    answer:'key starts with k',
    hint:'Listen to the very first sound of the word. 🔑',
    explanation:'<b>key starts with k</b>, which is not a vowel sound, so we use a. We save an for a, e, i, o, u sounds.' }),

  makeMCQ({ id:'g1eng-grm-087', chapterId:CH_GRM, difficulty:2, subsection:'articles_a_an',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four small drawings in a row">' +
      '<svg viewBox="0 0 340 132" style="width:100%;max-width:330px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="340" height="132" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="92" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="176" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="260" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<circle cx="44" cy="58" r="26" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<path d="M18 58 Q44 40 70 58" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<rect x="112" y="34" width="32" height="26" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="128" cy="62" rx="28" ry="7" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="212" cy="62" r="24" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<line x1="212" y1="38" x2="212" y2="24" stroke="#92400E" stroke-width="4"/>' +
      '<path d="M276 40 L316 40 L310 82 L282 82 Z" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<path d="M316 50 q14 8 -4 22" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<text x="44" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">A</text>' +
      '<text x="128" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">B</text>' +
      '<text x="212" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">C</text>' +
      '<text x="296" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Only one of these needs the word <b>an</b> in front. Which one?',
    options:['A','B','C','D'],
    answer:'C',
    hint:'Name each one. Which name begins with a vowel sound? 🍎',
    explanation:'<b>C</b> is an apple, so we say an apple. The others are a ball, a hat and a cup.' }),

  // ── grammar: basic_sentences (088-091) ───────────────────────────────────

  makeMCQ({ id:'g1eng-grm-088', chapterId:CH_GRM, difficulty:2, subsection:'basic_sentences',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="one object resting on another">' +
      '<svg viewBox="0 0 190 150" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="190" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="46" y="76" width="100" height="58" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<line x1="46" y1="96" x2="146" y2="96" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="96" cy="46" r="28" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<path d="M70 38 Q96 28 122 38" fill="none" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Which sentence matches the picture?',
    options:['The ball is on the box.','The ball is in the box.','The box is on the ball.','The box is in the ball.'],
    answer:'The ball is on the box.',
    hint:'Which thing is sitting on top of the other one? 🔴',
    explanation:'<b>The ball is on the box.</b> The word order tells us which thing is on top.' }),

  makeMCQ({ id:'g1eng-grm-089', chapterId:CH_GRM, difficulty:1, subsection:'basic_sentences',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two things side by side outdoors">' +
      '<svg viewBox="0 0 250 150" style="width:100%;max-width:250px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="250" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="30" y="74" width="86" height="56" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="20,74 73,36 126,74" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="60" y="98" width="26" height="32" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="182" y="90" width="16" height="40" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="190" cy="70" r="36" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '</svg></div>' +
      'Finish it: <b>I see a house ___ a tree.</b>',
    options:['and','but','for','not'],
    answer:'and',
    hint:'Which little word puts two things together in one sentence? 🏠🌳',
    explanation:'<b>I see a house and a tree.</b> And joins the two things we can see.' }),

  makeMCQ({ id:'g1eng-grm-090', chapterId:CH_GRM, difficulty:2, subsection:'basic_sentences',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a round object in one colour">' +
      '<svg viewBox="0 0 120 120" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="120" height="120" rx="8" fill="#ffffff"/>' +
      '<circle cx="60" cy="60" r="45" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<path d="M18 48 Q60 34 102 48" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<path d="M18 72 Q60 86 102 72" fill="none" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'This sentence tells about the picture: <b>My ball is yellow.</b> How many words has it?',
    options:['2','3','4','5'],
    answer:'4',
    hint:'A space separates each word. Count the groups of letters. 👆',
    explanation:'There are <b>4</b> words: My / ball / is / yellow.' }),

  makeMCQ({ id:'g1eng-grm-091', chapterId:CH_GRM, difficulty:2, subsection:'basic_sentences',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a thing on the water, drawn in one colour">' +
      '<svg viewBox="0 0 200 140" style="width:100%;max-width:210px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="104" width="180" height="24" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<path d="M32 84 L168 84 L148 108 L52 108 Z" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<line x1="100" y1="84" x2="100" y2="18" stroke="#111827" stroke-width="4"/>' +
      '<polygon points="106,22 106,78 156,78" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Choose the sentence for the picture.',
    options:['The boat is green.','The boat is brown.','The bus is green.','The bus is brown.'],
    answer:'The boat is green.',
    hint:'Check the naming word first, then check the colour. ⛵',
    explanation:'<b>The boat is green.</b> Both parts of the sentence must match the picture.' })

);

const CH_PHO = 'g1eng-phonics';

STATIC_QUESTIONS.push(

  // ── phonics: initial_sounds (076-081) ────────────────────────────────────

  makeMCQ({ id:'g1eng-pho-076', chapterId:CH_PHO, difficulty:1, subsection:'initial_sounds',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a building drawing">' +
      '<svg viewBox="0 0 170 140" style="width:100%;max-width:180px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="170" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="34" y="62" width="102" height="62" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="24,62 85,20 146,62" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<rect x="70" y="88" width="28" height="36" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="44" y="74" width="20" height="18" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="106" y="74" width="20" height="18" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Which letter does the name of this picture start with?',
    options:['h','b','n','r'],
    answer:'h',
    hint:'It has a roof, a door and windows, and you sleep in it. 🏠',
    explanation:'It is a house, and house starts with <b>h</b>. H-h-house!' }),

  makeMCQ({ id:'g1eng-pho-077', chapterId:CH_PHO, difficulty:1, subsection:'initial_sounds',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a thing on the water">' +
      '<svg viewBox="0 0 190 140" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="190" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="104" width="170" height="24" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<path d="M28 84 L162 84 L142 108 L48 108 Z" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<line x1="95" y1="84" x2="95" y2="18" stroke="#111827" stroke-width="4"/>' +
      '<polygon points="101,22 101,78 150,78" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Which sound does the name of this picture start with?',
    options:['/b/','/p/','/d/','/t/'],
    answer:'/b/',
    hint:'It floats on the sea and it has a sail. Say the word slowly. ⛵',
    explanation:'It is a boat, and boat starts with <b>/b/</b>. B-b-boat!' }),

  makeMCQ({ id:'g1eng-pho-078', chapterId:CH_PHO, difficulty:1, subsection:'initial_sounds',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a curved bright shape in a dark sky">' +
      '<svg viewBox="0 0 160 140" style="width:100%;max-width:170px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="8" width="144" height="124" rx="8" fill="#1E3A8A" stroke="#111827" stroke-width="2"/>' +
      '<path d="M100 30 A42 42 0 1 0 100 114 A34 34 0 1 1 100 30 Z" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>' +
      '</svg></div>' +
      'Which sound starts the name of this picture?',
    options:['/m/','/n/','/w/','/v/'],
    answer:'/m/',
    hint:'You see it in the sky at night. Hum the first sound. 🌙',
    explanation:'It is the moon, and moon starts with <b>/m/</b>. M-m-moon!' }),

  makeMCQ({ id:'g1eng-pho-079', chapterId:CH_PHO, difficulty:2, subsection:'initial_sounds',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a sweet food with a candle">' +
      '<svg viewBox="0 0 190 150" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="190" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="30" y="76" width="130" height="52" rx="6" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="30" y="62" width="130" height="18" rx="6" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<rect x="90" y="30" width="10" height="32" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="95" cy="24" rx="7" ry="10" fill="#F97316" stroke="#EA580C" stroke-width="2"/>' +
      '</svg></div>' +
      'Which word starts with the same sound as the name of this picture?',
    options:['cup','ball','tree','sock'],
    answer:'cup',
    hint:'We eat it at a birthday. Say its name, then say each word. 🎂',
    explanation:'It is a cake. Cake and <b>cup</b> both start with the hard /c/ (k) sound.' }),

  makeMCQ({ id:'g1eng-pho-080', chapterId:CH_PHO, difficulty:2, subsection:'initial_sounds',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="an animal that lives in water">' +
      '<svg viewBox="0 0 180 110" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="110" rx="8" fill="#ffffff"/>' +
      '<path d="M25 55 Q70 12 122 55 Q70 98 25 55 Z" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="122,55 160,28 160,82" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="50" cy="48" r="4" fill="#111827"/>' +
      '</svg></div>' +
      'Which word begins with the same sound as the name of this picture?',
    options:['fan','van','sun','pen'],
    answer:'fan',
    hint:'Blow air out gently for /f/. Bite your lip and buzz for /v/. 🐟',
    explanation:'It is a fish. Fish and <b>fan</b> both start with /f/. Van starts with /v/, which buzzes.' }),

  makeMCQ({ id:'g1eng-pho-081', chapterId:CH_PHO, difficulty:1, subsection:'initial_sounds',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four small drawings in a row">' +
      '<svg viewBox="0 0 340 132" style="width:100%;max-width:330px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="340" height="132" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="92" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="176" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<rect x="260" y="6" width="72" height="96" rx="6" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>' +
      '<circle cx="44" cy="58" r="26" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<path d="M18 58 Q44 40 70 58" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<rect x="123" y="62" width="10" height="28" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="128" cy="46" r="24" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '<circle cx="212" cy="56" r="20" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>' +
      '<line x1="212" y1="32" x2="212" y2="22" stroke="#F59E0B" stroke-width="3"/>' +
      '<line x1="212" y1="80" x2="212" y2="90" stroke="#F59E0B" stroke-width="3"/>' +
      '<line x1="188" y1="56" x2="178" y2="56" stroke="#F59E0B" stroke-width="3"/>' +
      '<line x1="236" y1="56" x2="246" y2="56" stroke="#F59E0B" stroke-width="3"/>' +
      '<circle cx="278" cy="52" r="13" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="278" cy="52" r="5" fill="#FFFFFF" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="290" y="47" width="34" height="10" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<rect x="308" y="57" width="7" height="9" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<text x="44" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">A</text>' +
      '<text x="128" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">B</text>' +
      '<text x="212" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">C</text>' +
      '<text x="296" y="126" font-family="system-ui, sans-serif" font-size="18" fill="#1f2937" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Which picture starts with the <b>/s/</b> sound?',
    options:['A','B','C','D'],
    answer:'C',
    hint:'Say the name of each one and listen only to the first sound. 🐍',
    explanation:'<b>C</b> is the sun: s-s-sun. The others are a ball, a tree and a key.' }),

  // ── phonics: rhyming_words (082-086) ─────────────────────────────────────

  makeMCQ({ id:'g1eng-pho-082', chapterId:CH_PHO, difficulty:1, subsection:'rhyming_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a drawing of one object">' +
      '<svg viewBox="0 0 140 130" style="width:100%;max-width:150px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="140" height="130" rx="8" fill="#ffffff"/>' +
      '<path d="M34 30 L102 30 L94 106 L42 106 Z" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<path d="M102 44 q26 14 -7 34" fill="none" stroke="#111827" stroke-width="5"/>' +
      '</svg></div>' +
      'The word for this picture is <b>cup</b>. Which word rhymes with it?',
    options:['pup','bag','box','pen'],
    answer:'pup',
    hint:'Listen to the end of the word: -up. 🍵',
    explanation:'<b>Cup</b> and <b>pup</b> both end in -up, so they rhyme.' }),

  makeMCQ({ id:'g1eng-pho-083', chapterId:CH_PHO, difficulty:1, subsection:'rhyming_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a tall plant">' +
      '<svg viewBox="0 0 140 160" style="width:100%;max-width:150px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="140" height="160" rx="8" fill="#ffffff"/>' +
      '<rect x="60" y="94" width="22" height="52" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="71" cy="62" r="46" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '</svg></div>' +
      'The word for this picture is <b>tree</b>. Which word sounds the same at the end?',
    options:['bee','bat','bus','bed'],
    answer:'bee',
    hint:'Say tree... bee... Do your lips finish in the same place? 🌳',
    explanation:'<b>Tree</b> and <b>bee</b> both end with the -ee sound, so they rhyme. So do see and three.' }),

  makeMCQ({ id:'g1eng-pho-084', chapterId:CH_PHO, difficulty:2, subsection:'rhyming_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two drawings side by side">' +
      '<svg viewBox="0 0 300 120" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="120" rx="8" fill="#ffffff"/>' +
      '<polygon points="70,12 82,46 118,46 89,67 100,102 70,80 40,102 51,67 22,46 58,46" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>' +
      '<path d="M162 88 L162 66 L188 66 L204 40 L258 40 L274 66 L288 66 L288 88 Z" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="208" y="46" width="42" height="20" fill="#BFDBFE" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="190" cy="92" r="13" fill="#111827"/>' +
      '<circle cx="262" cy="92" r="13" fill="#111827"/>' +
      '</svg></div>' +
      'These two are a <b>star</b> and a <b>car</b>. Do the words sound the same at the end?',
    options:['yes, they rhyme','no, they do not','only at the start','only in the middle'],
    answer:'yes, they rhyme',
    hint:'Say star, then car. Listen only to the last part. ⭐🚗',
    explanation:'<b>Yes, they rhyme.</b> Star and car both end with the -ar sound.' }),

  makeMCQ({ id:'g1eng-pho-085', chapterId:CH_PHO, difficulty:2, subsection:'rhyming_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a vehicle drawing">' +
      '<svg viewBox="0 0 200 120" style="width:100%;max-width:210px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="120" rx="8" fill="#ffffff"/>' +
      '<path d="M16 88 L16 62 L44 62 L64 34 L134 34 L156 62 L184 62 L184 88 Z" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="70" y="40" width="26" height="22" fill="#BFDBFE" stroke="#111827" stroke-width="2"/>' +
      '<rect x="102" y="40" width="26" height="22" fill="#BFDBFE" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="56" cy="94" r="15" fill="#111827"/>' +
      '<circle cx="146" cy="94" r="15" fill="#111827"/>' +
      '</svg></div>' +
      'The word for this picture is <b>car</b>. Which word does <b>not</b> rhyme with it?',
    options:['bus','jar','far','star'],
    answer:'bus',
    hint:'Three of them end the same way. Find the one that is different. 🚗',
    explanation:'<b>Bus</b> does not rhyme. Jar, far and star all end with the -ar sound, like car.' }),

  makeMCQ({ id:'g1eng-pho-086', chapterId:CH_PHO, difficulty:1, subsection:'rhyming_words',
    question:'Which pair of words <b>rhyme</b>?',
    options:['sun and fun','sun and sit','cat and cup','dog and dig'],
    answer:'sun and fun',
    hint:'Rhyming words end with the same sound, not the same first sound. 🎵',
    explanation:'<b>Sun and fun</b> both end in -un. The other pairs only start the same way.' }),

  // ── phonics: syllables (087-091) ─────────────────────────────────────────

  makeMCQ({ id:'g1eng-pho-087', chapterId:CH_PHO, difficulty:1, subsection:'syllables',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a fruit with its name written under it">' +
      '<svg viewBox="0 0 200 170" style="width:100%;max-width:180px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="170" rx="8" fill="#ffffff"/>' +
      '<ellipse cx="100" cy="72" rx="40" ry="48" fill="#FACC15" stroke="#92400E" stroke-width="2"/>' +
      '<line x1="100" y1="24" x2="100" y2="10" stroke="#92400E" stroke-width="5"/>' +
      '<ellipse cx="122" cy="14" rx="18" ry="8" fill="#22C55E" stroke="#15803D" stroke-width="2"/>' +
      '<text x="100" y="154" font-family="system-ui, sans-serif" font-size="36" fill="#1f2937" text-anchor="middle">mango</text>' +
      '</svg></div>' +
      'Clap the word <b>mango</b>. How many claps do you make?',
    options:['1','2','3','4'],
    answer:'2',
    hint:'Say it in parts and clap each part: man - go. 👏',
    explanation:'<b>Mango</b> has 2 parts, so 2 claps: man-go.' }),

  makeMCQ({ id:'g1eng-pho-088', chapterId:CH_PHO, difficulty:2, subsection:'syllables',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="one word written on a line">' +
      '<svg viewBox="0 0 260 100" style="width:100%;max-width:250px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="100" rx="8" fill="#ffffff"/>' +
      '<line x1="20" y1="74" x2="240" y2="74" stroke="#9CA3AF" stroke-width="2"/>' +
      '<text x="130" y="70" font-family="system-ui, sans-serif" font-size="44" fill="#1f2937" text-anchor="middle">banana</text>' +
      '</svg></div>' +
      'How many beats does this word have when you say it?',
    options:['1','2','3','4'],
    answer:'3',
    hint:'Put your hand under your chin and count how many times it drops. 🍌',
    explanation:'<b>Banana</b> has 3 beats: ba-na-na.' }),

  makeMCQ({ id:'g1eng-pho-089', chapterId:CH_PHO, difficulty:1, subsection:'syllables',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="one word written with small lines in it">' +
      '<svg viewBox="0 0 300 100" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="100" rx="8" fill="#ffffff"/>' +
      '<line x1="20" y1="74" x2="280" y2="74" stroke="#9CA3AF" stroke-width="2"/>' +
      '<text x="150" y="70" font-family="system-ui, sans-serif" font-size="40" fill="#1f2937" text-anchor="middle">um-brel-la</text>' +
      '</svg></div>' +
      'This word has been cut into parts. How many parts are there?',
    options:['2','3','4','5'],
    answer:'3',
    hint:'Each small line cuts the word. Count the pieces between them. ☂️',
    explanation:'There are <b>3</b> parts: um-brel-la. Each part is one clap.' }),

  makeMCQ({ id:'g1eng-pho-090', chapterId:CH_PHO, difficulty:2, subsection:'syllables',
    question:'Which of these words has only <b>one</b> clap?',
    options:['rice','table','pencil','garden'],
    answer:'rice',
    hint:'Try clapping each word. Three of them break into two parts. 🍚',
    explanation:'<b>Rice</b> is one clap. Ta-ble, pen-cil and gar-den are each two claps.' }),

  makeMCQ({ id:'g1eng-pho-091', chapterId:CH_PHO, difficulty:2, subsection:'syllables',
    question:'Which of these words has the <b>most</b> claps?',
    options:['elephant','teacher','water','bread'],
    answer:'elephant',
    hint:'Clap each word and remember the biggest number. 🐘',
    explanation:'<b>Elephant</b> has 3 claps: e-le-phant. Teacher and water have 2, and bread has only 1.' })

);

})();
