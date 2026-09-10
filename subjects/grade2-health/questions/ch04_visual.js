'use strict';
// grade2-health — visual bank: pictures, colours, diagrams.
// IDs: g2he-hyg-061..084, g2he-nut-061..084, g2he-saf-061..084
(function () {

const CH_HYG = 'g2he-hygiene';
const CH_NUT = 'g2he-nutrition';
const CH_SAF = 'g2he-safety';

const F = function (w, h, mw, label, body) {
  return '<div style="text-align:center;margin:.5em 0" aria-label="' + label + '">' +
    '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;max-width:' + mw + 'px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
    '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="8" fill="#ffffff"/>' + body + '</svg></div>';
};
const T = function (x, y, s, str) {
  return '<text x="' + x + '" y="' + y + '" font-family="system-ui, sans-serif" font-size="' + s + '" fill="#1f2937" text-anchor="middle">' + str + '</text>';
};

const SHIRT = function (dx, extra) {
  return '<rect x="' + (dx + 40) + '" y="34" width="70" height="78" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (dx + 16) + '" y="34" width="24" height="30" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (dx + 110) + '" y="34" width="24" height="30" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
    '<polygon points="' + (dx + 62) + ',34 ' + (dx + 75) + ',52 ' + (dx + 88) + ',34" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
    extra;
};
const TAP = function (dx, dy) {
  return '<rect x="' + (dx + 4) + '" y="' + (dy + 0) + '" width="14" height="34" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (dx + 4) + '" y="' + (dy + 34) + '" width="54" height="12" rx="4" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (dx + 48) + '" y="' + (dy + 46) + '" width="9" height="34" fill="#3B82F6"/>';
};
const TOOTHBRUSH = function (dx, dy, col, worn) {
  return '<rect x="' + dx + '" y="' + (dy + 12) + '" width="90" height="14" rx="6" fill="' + col + '" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (dx + 86) + '" y="' + (dy + 8) + '" width="26" height="22" rx="5" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
    (worn
      ? '<line x1="' + (dx + 90) + '" y1="' + (dy + 8) + '" x2="' + (dx + 80) + '" y2="' + (dy - 12) + '" stroke="#9CA3AF" stroke-width="3"/>' +
        '<line x1="' + (dx + 96) + '" y1="' + (dy + 8) + '" x2="' + (dx + 92) + '" y2="' + (dy - 14) + '" stroke="#9CA3AF" stroke-width="3"/>' +
        '<line x1="' + (dx + 102) + '" y1="' + (dy + 8) + '" x2="' + (dx + 110) + '" y2="' + (dy - 13) + '" stroke="#9CA3AF" stroke-width="3"/>' +
        '<line x1="' + (dx + 108) + '" y1="' + (dy + 8) + '" x2="' + (dx + 122) + '" y2="' + (dy - 8) + '" stroke="#9CA3AF" stroke-width="3"/>'
      : '<rect x="' + (dx + 90) + '" y="' + (dy - 8) + '" width="4" height="16" fill="#9CA3AF"/>' +
        '<rect x="' + (dx + 96) + '" y="' + (dy - 8) + '" width="4" height="16" fill="#9CA3AF"/>' +
        '<rect x="' + (dx + 102) + '" y="' + (dy - 8) + '" width="4" height="16" fill="#9CA3AF"/>' +
        '<rect x="' + (dx + 108) + '" y="' + (dy - 8) + '" width="4" height="16" fill="#9CA3AF"/>');
};
const CUP = function (dx, dirty) {
  return '<polygon points="' + (dx + 6) + ',40 ' + (dx + 80) + ',40 ' + (dx + 72) + ',106 ' + (dx + 14) + ',106" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (dx + 80) + ',54 C' + (dx + 100) + ',54 ' + (dx + 100) + ',84 ' + (dx + 80) + ',84" fill="none" stroke="#111827" stroke-width="3"/>' +
    (dirty
      ? '<circle cx="' + (dx + 24) + '" cy="46" r="3.5" fill="#4B5563"/>' +
        '<circle cx="' + (dx + 38) + '" cy="45" r="3" fill="#4B5563"/>' +
        '<circle cx="' + (dx + 54) + '" cy="46" r="3.5" fill="#4B5563"/>' +
        '<circle cx="' + (dx + 66) + '" cy="45" r="3" fill="#4B5563"/>'
      : '');
};

STATIC_QUESTIONS.push(

  // ── g2he-hygiene · grooming (061–068) ───────────────────────────────────────

  makeMCQ({ id:'g2he-hyg-061', chapterId:CH_HYG, difficulty:1, subsection:'grooming',
    question:
      F(180, 100, 220, 'a grooming tool with a row of thin points',
        '<rect x="20" y="24" width="140" height="18" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<rect x="26" y="42" width="8" height="36" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="44" y="42" width="8" height="36" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="62" y="42" width="8" height="36" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="80" y="42" width="8" height="36" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="98" y="42" width="8" height="36" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="116" y="42" width="8" height="36" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="134" y="42" width="8" height="36" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="152" y="42" width="8" height="36" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>') +
      'We use this every morning to tidy our ___.',
    options:['hair','teeth','nails','shoes'], answer:'hair',
    hint:'Look at the long thin points. What do they slide through?',
    explanation:'A comb tidies your <b>hair</b>. 🪮 Combing every morning keeps your hair neat and helps you check your scalp is clean.' }),

  makeMCQ({ id:'g2he-hyg-062', chapterId:CH_HYG, difficulty:1, subsection:'grooming',
    question:
      F(220, 130, 260, 'two fingertips side by side, one with marks under the nail',
        '<rect x="30" y="26" width="60" height="78" rx="26" fill="#FDE1C8" stroke="#111827" stroke-width="2"/>' +
        '<rect x="42" y="36" width="36" height="34" rx="12" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="52" cy="42" r="4" fill="#4B5563"/>' +
        '<circle cx="62" cy="40" r="3" fill="#4B5563"/>' +
        '<circle cx="70" cy="44" r="3.5" fill="#4B5563"/>' +
        '<rect x="130" y="26" width="60" height="78" rx="26" fill="#FDE1C8" stroke="#111827" stroke-width="2"/>' +
        '<rect x="142" y="36" width="36" height="34" rx="12" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        T(60, 122, 16, 'A') + T(160, 122, 16, 'B')) +
      'One nail has dirt under it. Which nail must be washed and cut?',
    options:['Nail A','Nail B','Both nails','No nails'], answer:'Nail A',
    hint:'Look under the white part of each nail for dark marks.',
    explanation:'Nail A has dirt trapped under it. 🧼 Dirt under long nails carries germs straight into your mouth when you eat, so keep nails short and washed.' }),

  makeMCQ({ id:'g2he-hyg-063', chapterId:CH_HYG, difficulty:1, subsection:'grooming',
    question:
      F(180, 130, 200, 'a cloth hanging on a rail',
        '<rect x="10" y="16" width="160" height="8" rx="4" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="44" y="22" width="92" height="92" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<rect x="44" y="48" width="92" height="9" fill="#FFFFFF"/>' +
        '<rect x="44" y="66" width="92" height="9" fill="#FFFFFF"/>') +
      'After your bath, which towel should you dry yourself with?',
    options:['Your own towel','Any wet towel','A friend’s towel','The old floor mat'], answer:'Your own towel',
    hint:'Think about whose germs are on a towel someone else has used.',
    explanation:'Always use <b>your own towel</b>. 🛁 A shared towel stays damp and passes skin problems and germs from one person to another.' }),

  makeMCQ({ id:'g2he-hyg-064', chapterId:CH_HYG, difficulty:1, subsection:'grooming',
    question:
      F(300, 140, 320, 'two pieces of clothing side by side, one with marks on it',
        SHIRT(0,
          '<circle cx="75" cy="62" r="3.5" fill="#111827"/>' +
          '<circle cx="75" cy="80" r="3.5" fill="#111827"/>' +
          '<circle cx="75" cy="98" r="3.5" fill="#111827"/>') +
        SHIRT(150,
          '<circle cx="210" cy="62" r="7" fill="#92400E"/>' +
          '<circle cx="242" cy="86" r="6" fill="#92400E"/>' +
          '<circle cx="222" cy="100" r="5" fill="#92400E"/>' +
          '<polyline points="190,112 200,105 210,112 220,105 230,112 240,105 250,112" fill="none" stroke="#111827" stroke-width="2"/>') +
        T(75, 132, 16, 'A') + T(225, 132, 16, 'B')) +
      'Which uniform is neat and ready for school?',
    options:['Uniform A','Uniform B','Both of them','Neither one'], answer:'Uniform A',
    hint:'Look for stains and a torn edge at the bottom.',
    explanation:'Uniform A is clean, buttoned and has a straight hem. 👕 A neat uniform shows you care for yourself and it is more comfortable too.' }),

  makeMCQ({ id:'g2he-hyg-065', chapterId:CH_HYG, difficulty:1, subsection:'grooming',
    question:
      F(170, 140, 190, 'a water fitting above falling drops, with a block beside it',
        '<rect x="78" y="8" width="12" height="22" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="48" y="30" width="72" height="16" rx="6" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="58" cy="60" r="4" fill="#3B82F6"/>' +
        '<circle cx="74" cy="72" r="4" fill="#3B82F6"/>' +
        '<circle cx="90" cy="60" r="4" fill="#3B82F6"/>' +
        '<circle cx="106" cy="74" r="4" fill="#3B82F6"/>' +
        '<circle cx="66" cy="92" r="4" fill="#3B82F6"/>' +
        '<circle cx="84" cy="104" r="4" fill="#3B82F6"/>' +
        '<rect x="102" y="104" width="52" height="24" rx="9" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="112" y="111" width="20" height="6" rx="3" fill="#FFFFFF"/>') +
      'Mauritius is hot and we sweat a lot. How often should you bath?',
    options:['Every day','Once a week','Once a month','Twice a year'], answer:'Every day',
    hint:'Sweat and dust build up on your skin in one single day.',
    explanation:'Bath <b>every day</b> in our hot weather. 🚿 Sweat feeds germs on the skin, and soap and water wash them away.' }),

  makeMCQ({ id:'g2he-hyg-066', chapterId:CH_HYG, difficulty:1, subsection:'grooming',
    question:
      F(330, 120, 330, 'four different objects in a row',
        '<rect x="14" y="34" width="62" height="12" rx="3" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="18" y="46" width="6" height="24" fill="#3B82F6"/>' +
        '<rect x="30" y="46" width="6" height="24" fill="#3B82F6"/>' +
        '<rect x="42" y="46" width="6" height="24" fill="#3B82F6"/>' +
        '<rect x="54" y="46" width="6" height="24" fill="#3B82F6"/>' +
        '<rect x="66" y="46" width="6" height="24" fill="#3B82F6"/>' +
        '<rect x="96" y="36" width="62" height="34" rx="12" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="106" y="44" width="20" height="6" rx="3" fill="#FFFFFF"/>' +
        TOOTHBRUSH(176, 38, '#A855F7', false) +
        '<circle cx="294" cy="52" r="26" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
        '<path d="M272,42 C286,50 302,50 316,42" fill="none" stroke="#FFFFFF" stroke-width="3"/>' +
        '<path d="M272,62 C286,54 302,54 316,62" fill="none" stroke="#FFFFFF" stroke-width="3"/>') +
      'Three of these keep your body clean and neat. Which one does NOT?',
    options:['the ball','the comb','the soap','the brush'], answer:'the ball',
    hint:'Which one do you play with instead of wash with?',
    explanation:'The ball is a toy, not a grooming item. ⚽ A comb, soap and a toothbrush all keep your body clean and tidy.' }),

  makeMCQ({ id:'g2he-hyg-067', chapterId:CH_HYG, difficulty:1, subsection:'grooming',
    question:
      F(150, 130, 170, 'a folded square of cloth',
        '<rect x="22" y="20" width="106" height="92" rx="4" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="34" y="32" width="82" height="68" fill="none" stroke="#3B82F6" stroke-width="2"/>' +
        '<line x1="22" y1="66" x2="128" y2="66" stroke="#9CA3AF" stroke-width="2"/>') +
      'Why do you keep a clean handkerchief in your pocket?',
    options:['for wiping your nose','for wiping the floor','for cleaning your shoes','for holding your lunch'], answer:'for wiping your nose',
    hint:'It is a small, soft, clean cloth kept only for you.',
    explanation:'A handkerchief is for <b>your nose</b>. 🤧 Catching a sneeze in cloth keeps your germs off your hands and off other people.' }),

  makeMCQ({ id:'g2he-hyg-068', chapterId:CH_HYG, difficulty:2, subsection:'grooming',
    question:
      F(160, 140, 180, 'a piece of clothing with dark marks on it',
        SHIRT(4,
          '<circle cx="66" cy="60" r="7" fill="#92400E"/>' +
          '<circle cx="96" cy="82" r="6" fill="#92400E"/>' +
          '<circle cx="74" cy="98" r="5" fill="#92400E"/>')) +
      'Ravi wore this shirt all day in the sun and it is stained and smelly. What should he do?',
    options:['Wash it before wearing','Hang it up to wear again','Spray perfume on it','Fold it into his bag'], answer:'Wash it before wearing',
    hint:'Perfume covers a smell but does not take the sweat away.',
    explanation:'Dirty clothes must be <b>washed</b>. 🧺 Sweat and dirt in cloth feed germs and can cause itchy skin, and perfume only hides the smell.' }),

  // ── g2he-hygiene · hand_dental (069–076) ────────────────────────────────────

  makeMCQ({ id:'g2he-hyg-069', chapterId:CH_HYG, difficulty:1, subsection:'hand_dental',
    question:
      F(340, 130, 340, 'a strip of four numbered panels',
        '<rect x="8" y="10" width="72" height="86" rx="6" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
        '<rect x="92" y="10" width="72" height="86" rx="6" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
        '<rect x="176" y="10" width="72" height="86" rx="6" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
        '<rect x="260" y="10" width="72" height="86" rx="6" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
        '<rect x="30" y="26" width="10" height="26" fill="#9CA3AF" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="30" y="52" width="34" height="9" fill="#9CA3AF" stroke="#111827" stroke-width="1.5"/>' +
        '<circle cx="60" cy="72" r="4" fill="#3B82F6"/>' +
        '<circle cx="60" cy="86" r="4" fill="#3B82F6"/>' +
        '<rect x="106" y="46" width="44" height="24" rx="9" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="114" cy="34" r="6" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="1.5"/>' +
        '<circle cx="134" cy="30" r="5" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="1.5"/>' +
        '<circle cx="212" cy="52" r="24" fill="none" stroke="#3B82F6" stroke-width="4"/>' +
        '<polygon points="226,42 244,52 226,62" fill="#3B82F6"/>' +
        '<rect x="278" y="30" width="38" height="56" rx="4" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
        '<rect x="278" y="50" width="38" height="8" fill="#FFFFFF"/>' +
        T(44, 118, 15, '1') + T(128, 118, 15, '2') + T(212, 118, 15, '3') + T(296, 118, 15, '4')) +
      'This strip shows how to wash your hands. What happens at step 2?',
    options:['use the soap','use a towel','turn the tap','shake them dry'], answer:'use the soap',
    hint:'Find the second box, then look at what is drawn inside it.',
    explanation:'Step 2 is <b>soap</b>. 🧼 Wet your hands first, then soap, then rub all over, then dry — water alone does not lift germs off skin.' }),

  makeMCQ({ id:'g2he-hyg-070', chapterId:CH_HYG, difficulty:1, subsection:'hand_dental',
    question:
      F(250, 120, 280, 'a cleaning tool beside a round dial with hands',
        TOOTHBRUSH(12, 52, '#A855F7', false) +
        '<circle cx="192" cy="60" r="42" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<line x1="192" y1="22" x2="192" y2="30" stroke="#111827" stroke-width="3"/>' +
        '<line x1="234" y1="60" x2="226" y2="60" stroke="#111827" stroke-width="3"/>' +
        '<line x1="192" y1="98" x2="192" y2="90" stroke="#111827" stroke-width="3"/>' +
        '<line x1="150" y1="60" x2="158" y2="60" stroke="#111827" stroke-width="3"/>' +
        '<line x1="192" y1="60" x2="192" y2="32" stroke="#111827" stroke-width="4"/>' +
        '<line x1="192" y1="60" x2="214" y2="72" stroke="#111827" stroke-width="3"/>' +
        '<circle cx="192" cy="60" r="3" fill="#111827"/>') +
      'How long should you brush your teeth each time?',
    options:['two minutes','two seconds','ten seconds','two hours'], answer:'two minutes',
    hint:'Long enough to reach every tooth, top and bottom, front and back.',
    explanation:'Brush for <b>two minutes</b>, twice a day. 🪥 A quick scrub misses the back teeth, where holes usually start.' }),

  makeMCQ({ id:'g2he-hyg-071', chapterId:CH_HYG, difficulty:1, subsection:'hand_dental',
    question:
      F(160, 140, 150, 'a white shape with a dark round mark on it',
        '<path d="M60,22 h58 a16,16 0 0 1 16,16 v34 c0,20 -8,52 -22,52 c-10,0 -14,-24 -23,-24 c-9,0 -13,24 -23,24 c-14,0 -22,-32 -22,-52 v-34 a16,16 0 0 1 16,-16 z" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<circle cx="78" cy="54" r="12" fill="#111827"/>') +
      'This tooth has a dark hole in it. What most likely caused it?',
    options:['too many sweets','drinking water','brushing daily','eating carrots'], answer:'too many sweets',
    hint:'Which of these leaves sugar sitting on your teeth?',
    explanation:'Sugar from sweets feeds germs that make a hole, called <b>tooth decay</b>. 🍬 Water, brushing and crunchy carrots all help teeth instead.' }),

  makeMCQ({ id:'g2he-hyg-072', chapterId:CH_HYG, difficulty:1, subsection:'hand_dental',
    question:
      F(230, 130, 250, 'a row of white blocks with arrows drawn over them',
        '<rect x="14" y="26" width="200" height="18" rx="6" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
        '<rect x="20" y="44" width="44" height="56" rx="8" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="72" y="44" width="44" height="56" rx="8" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="124" y="44" width="44" height="56" rx="8" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="176" y="44" width="44" height="56" rx="8" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<line x1="42" y1="56" x2="42" y2="90" stroke="#3B82F6" stroke-width="4"/>' +
        '<polygon points="42,48 50,60 34,60" fill="#3B82F6"/>' +
        '<polygon points="42,100 50,88 34,88" fill="#3B82F6"/>' +
        '<line x1="146" y1="56" x2="146" y2="90" stroke="#3B82F6" stroke-width="4"/>' +
        '<polygon points="146,48 154,60 138,60" fill="#3B82F6"/>' +
        '<polygon points="146,100 154,88 138,88" fill="#3B82F6"/>') +
      'The arrows show how to move the brush. You should brush:',
    options:['up and down','side to side','round in a ring','only on the top'], answer:'up and down',
    hint:'Follow the direction the arrow points at both ends.',
    explanation:'Brush <b>up and down</b>, away from the gums. 🪥 Hard scrubbing side to side wears the gums and leaves food between the teeth.' }),

  makeMCQ({ id:'g2he-hyg-073', chapterId:CH_HYG, difficulty:1, subsection:'hand_dental',
    question:
      F(210, 130, 220, 'two white blocks with a thin line running between them',
        '<rect x="26" y="30" width="62" height="70" rx="14" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<rect x="122" y="30" width="62" height="70" rx="14" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<line x1="105" y1="14" x2="105" y2="116" stroke="#3B82F6" stroke-width="4"/>') +
      'What is the thin string used to clean between two teeth called?',
    options:['floss','soap','wool','tape'], answer:'floss',
    hint:'It is thin enough to slide into the tiny gap a brush cannot reach.',
    explanation:'It is called <b>floss</b>. 🦷 A brush cannot fit between two teeth, so floss lifts out the food hiding there.' }),

  makeMCQ({ id:'g2he-hyg-074', chapterId:CH_HYG, difficulty:1, subsection:'hand_dental',
    question:
      F(220, 130, 240, 'a water fitting above a basin, with a block beside it',
        TAP(40, 16) +
        '<path d="M20,104 h150 l-16,20 h-118 z" fill="#E5E7EB" stroke="#111827" stroke-width="2"/>' +
        '<rect x="146" y="72" width="52" height="24" rx="9" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<rect x="156" y="79" width="20" height="6" rx="3" fill="#FFFFFF"/>') +
      'You have just come out of the toilet. What must you do next?',
    options:['wash your hands','go and play','eat your snack','watch the TV'], answer:'wash your hands',
    hint:'The picture shows exactly what is waiting for you.',
    explanation:'Always <b>wash your hands with soap</b> after the toilet. 🚰 This is the single best way to stop tummy illness spreading.' }),

  makeMCQ({ id:'g2he-hyg-075', chapterId:CH_HYG, difficulty:2, subsection:'hand_dental',
    question:
      F(220, 130, 240, 'a plate of food beside a small block',
        '<ellipse cx="76" cy="72" rx="58" ry="30" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<ellipse cx="62" cy="66" rx="26" ry="14" fill="#FDE68A" stroke="#92400E" stroke-width="1.5"/>' +
        '<ellipse cx="100" cy="72" rx="18" ry="11" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="148" y="60" width="56" height="26" rx="10" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<rect x="158" y="68" width="20" height="6" rx="3" fill="#FFFFFF"/>') +
      'Which of these is the MOST important moment to wash your hands with soap?',
    options:['before eating food','after reading a book','before watching TV','after wearing shoes'], answer:'before eating food',
    hint:'Think about when germs on your hands can get inside your body.',
    explanation:'Wash <b>before you eat</b>. 🍽️ Whatever is on your fingers goes straight into your mouth with the food.' }),

  makeMCQ({ id:'g2he-hyg-076', chapterId:CH_HYG, difficulty:2, subsection:'hand_dental',
    question:
      F(300, 130, 320, 'two cleaning tools side by side, one with bent ends',
        TOOTHBRUSH(16, 60, '#3B82F6', true) +
        TOOTHBRUSH(176, 60, '#22C55E', false) +
        T(72, 118, 16, 'A') + T(232, 118, 16, 'B')) +
      'Brush A has bent, worn-out bristles. What should happen to it?',
    options:['change it for a new one','keep on using it','share it with a friend','wash it and keep it'], answer:'change it for a new one',
    hint:'Bent bristles slide over the tooth instead of cleaning it.',
    explanation:'Worn bristles no longer clean, so <b>change the brush</b> — about every three months. 🪥 And never share a toothbrush, it carries germs.' }),

  // ── g2he-hygiene · illness_hygiene (077–084) ────────────────────────────────

  makeMCQ({ id:'g2he-hyg-077', chapterId:CH_HYG, difficulty:1, subsection:'illness_hygiene',
    question:
      F(240, 130, 260, 'a square of paper, an arrow, and a container',
        '<rect x="18" y="40" width="62" height="58" rx="4" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="18,40 80,40 49,64" fill="#E5E7EB" stroke="#9CA3AF" stroke-width="1.5"/>' +
        '<line x1="92" y1="70" x2="128" y2="70" stroke="#111827" stroke-width="4"/>' +
        '<polygon points="140,70 126,62 126,78" fill="#111827"/>' +
        '<path d="M156,44 h64 l-8,74 h-48 z" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="150" y="32" width="76" height="12" rx="4" fill="#6B7280" stroke="#111827" stroke-width="2"/>' +
        '<line x1="176" y1="52" x2="172" y2="110" stroke="#6B7280" stroke-width="3"/>' +
        '<line x1="200" y1="52" x2="200" y2="110" stroke="#6B7280" stroke-width="3"/>') +
      'You have sneezed into a tissue. Where does the tissue go next?',
    options:['into the bin','into your bag','back in a pocket','on to the table'], answer:'into the bin',
    hint:'The arrow in the picture is pointing somewhere.',
    explanation:'A used tissue is full of germs, so it goes <b>straight into the bin</b>. 🗑️ Then wash your hands.' }),

  makeMCQ({ id:'g2he-hyg-078', chapterId:CH_HYG, difficulty:1, subsection:'illness_hygiene',
    question:
      F(320, 150, 330, 'two panels, each with dots spreading out from a point',
        '<rect x="8" y="12" width="146" height="104" rx="6" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
        '<circle cx="32" cy="64" r="10" fill="#111827"/>' +
        '<circle cx="58" cy="40" r="4" fill="#EF4444"/>' +
        '<circle cx="70" cy="52" r="4" fill="#EF4444"/>' +
        '<circle cx="84" cy="64" r="4" fill="#EF4444"/>' +
        '<circle cx="70" cy="78" r="4" fill="#EF4444"/>' +
        '<circle cx="58" cy="88" r="4" fill="#EF4444"/>' +
        '<circle cx="96" cy="44" r="4" fill="#EF4444"/>' +
        '<circle cx="104" cy="64" r="4" fill="#EF4444"/>' +
        '<circle cx="96" cy="84" r="4" fill="#EF4444"/>' +
        '<circle cx="122" cy="54" r="4" fill="#EF4444"/>' +
        '<circle cx="128" cy="72" r="4" fill="#EF4444"/>' +
        '<circle cx="140" cy="64" r="4" fill="#EF4444"/>' +
        '<rect x="166" y="12" width="146" height="104" rx="6" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
        '<circle cx="190" cy="64" r="10" fill="#111827"/>' +
        '<rect x="210" y="34" width="10" height="60" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="202" cy="52" r="4" fill="#EF4444"/>' +
        '<circle cx="202" cy="78" r="4" fill="#EF4444"/>' +
        T(81, 138, 16, 'A') + T(239, 138, 16, 'B')) +
      'The dots are germs from a sneeze. In panel B a tissue is held up. Where do the germs spread more?',
    options:['panel A','panel B','both the same','neither one'], answer:'panel A',
    hint:'Count how far the dots travel in each panel.',
    explanation:'In panel A the germs fly everywhere. 🤧 Covering a sneeze catches most of the droplets, so far fewer germs reach other people.' }),

  makeMCQ({ id:'g2he-hyg-079', chapterId:CH_HYG, difficulty:1, subsection:'illness_hygiene',
    question:
      F(220, 130, 230, 'a soft shape with two loops at its sides',
        '<rect x="52" y="40" width="116" height="58" rx="16" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<line x1="52" y1="60" x2="168" y2="60" stroke="#1D4ED8" stroke-width="2"/>' +
        '<line x1="52" y1="78" x2="168" y2="78" stroke="#1D4ED8" stroke-width="2"/>' +
        '<path d="M52,46 C26,52 26,86 52,92" fill="none" stroke="#111827" stroke-width="3"/>' +
        '<path d="M168,46 C194,52 194,86 168,92" fill="none" stroke="#111827" stroke-width="3"/>') +
      'When is a face mask like this most useful?',
    options:['when you are ill','when you are asleep','when you go to swim','when you eat lunch'], answer:'when you are ill',
    hint:'A mask catches the droplets that come out of your nose and mouth.',
    explanation:'Wear one <b>when you are ill</b> and must be near others. 😷 It holds back the droplets from your coughs and sneezes.' }),

  makeMCQ({ id:'g2he-hyg-080', chapterId:CH_HYG, difficulty:1, subsection:'illness_hygiene',
    question:
      F(280, 140, 300, 'two seats with a measured gap between them',
        '<rect x="20" y="26" width="12" height="60" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="20" y="76" width="62" height="12" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="24" y="88" width="8" height="30" fill="#92400E"/>' +
        '<rect x="70" y="88" width="8" height="30" fill="#92400E"/>' +
        '<rect x="200" y="26" width="12" height="60" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="200" y="76" width="62" height="12" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="204" y="88" width="8" height="30" fill="#92400E"/>' +
        '<rect x="250" y="88" width="8" height="30" fill="#92400E"/>' +
        '<line x1="92" y1="104" x2="190" y2="104" stroke="#3B82F6" stroke-width="3"/>' +
        '<polygon points="84,104 96,98 96,110" fill="#3B82F6"/>' +
        '<polygon points="198,104 186,98 186,110" fill="#3B82F6"/>') +
      'A friend in class is coughing a lot. Where is it best to sit?',
    options:['a little away','right beside them','on the same chair','very close to them'], answer:'a little away',
    hint:'Look at the gap the arrow is measuring.',
    explanation:'Sit <b>a little away</b>. ↔️ Germs from a cough only travel a short distance, so a small gap protects you — and stay kind to your friend.' }),

  makeMCQ({ id:'g2he-hyg-081', chapterId:CH_HYG, difficulty:1, subsection:'illness_hygiene',
    question:
      F(200, 150, 210, 'a container standing outside under falling lines',
        '<line x1="42" y1="10" x2="36" y2="30" stroke="#3B82F6" stroke-width="3"/>' +
        '<line x1="82" y1="8" x2="76" y2="28" stroke="#3B82F6" stroke-width="3"/>' +
        '<line x1="122" y1="10" x2="116" y2="30" stroke="#3B82F6" stroke-width="3"/>' +
        '<line x1="160" y1="8" x2="154" y2="28" stroke="#3B82F6" stroke-width="3"/>' +
        '<polygon points="52,52 148,52 136,132 64,132" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="56,64 144,64 140,92 60,92" fill="#3B82F6"/>' +
        '<rect x="46" y="44" width="108" height="10" rx="4" fill="#6B7280" stroke="#111827" stroke-width="2"/>') +
      'After the rain, this old bucket in the yard is full of water. What must we do?',
    options:['empty the water out','leave it in the sun','put more water in','cover it with leaves'], answer:'empty the water out',
    hint:'Mosquitoes lay their eggs in water that stands still.',
    explanation:'<b>Empty it.</b> 🦟 Still water in tyres, pots and buckets is where mosquitoes breed, and that is how dengue and chikungunya spread in Mauritius.' }),

  makeMCQ({ id:'g2he-hyg-082', chapterId:CH_HYG, difficulty:1, subsection:'illness_hygiene',
    question:
      F(240, 130, 250, 'a place for sleeping',
        '<rect x="16" y="26" width="14" height="76" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="26" y="62" width="190" height="30" rx="6" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="110" y="62" width="106" height="30" rx="6" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<rect x="36" y="48" width="58" height="20" rx="8" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="30" y="92" width="10" height="22" fill="#92400E"/>' +
        '<rect x="200" y="92" width="10" height="22" fill="#92400E"/>') +
      'You wake up with a fever and a bad cough. What is best?',
    options:['stay at home to rest','go to school anyway','play in the school yard','share your water bottle'], answer:'stay at home to rest',
    hint:'Think about your friends as well as yourself.',
    explanation:'<b>Rest at home</b> and let a grown-up decide about a doctor. 🤒 Going to school passes your illness to the whole class.' }),

  makeMCQ({ id:'g2he-hyg-083', chapterId:CH_HYG, difficulty:2, subsection:'illness_hygiene',
    question:
      F(250, 130, 260, 'two drinking vessels, one with marks around its rim',
        CUP(20, true) + CUP(140, false) +
        T(63, 124, 16, 'A') + T(183, 124, 16, 'B')) +
      'A friend with a bad cold has just drunk from cup A. What should you do?',
    options:['take a clean cup','drink from cup A','wipe it on a shirt','fill it with juice'], answer:'take a clean cup',
    hint:'Germs from a cold stay on the rim of the cup.',
    explanation:'Use <b>a clean cup</b>. 🥤 Germs live on the rim, and wiping it on your shirt only moves them around.' }),

  makeMCQ({ id:'g2he-hyg-084', chapterId:CH_HYG, difficulty:2, subsection:'illness_hygiene',
    question:
      F(200, 140, 210, 'a box with a cross drawn over it',
        '<rect x="40" y="52" width="120" height="60" rx="8" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
        '<rect x="76" y="52" width="48" height="10" rx="5" fill="#111827"/>' +
        '<polygon points="86,52 114,52 108,26 92,30" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<line x1="34" y1="20" x2="166" y2="120" stroke="#EF4444" stroke-width="7"/>' +
        '<line x1="166" y1="20" x2="34" y2="120" stroke="#EF4444" stroke-width="7"/>') +
      'You must sneeze and there is no tissue left. What do you do?',
    options:['sneeze into your elbow','sneeze into your hands','sneeze on to a friend','hold your nose tight'], answer:'sneeze into your elbow',
    hint:'Which part of you does not touch doors, food or other people?',
    explanation:'Sneeze into your <b>elbow</b>. 💪 Hands touch everything afterwards, so sneezing into them spreads the germs everywhere you go.' }),

  // ── g2he-nutrition · food_groups (061–068) ──────────────────────────────────

  makeMCQ({ id:'g2he-nut-061', chapterId:CH_NUT, difficulty:1, subsection:'food_groups',
    question:
      F(140, 150, 150, 'a long orange food with green leaves on top',
        '<polygon points="50,48 90,48 70,134" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
        '<line x1="58" y1="66" x2="82" y2="66" stroke="#C2410C" stroke-width="2"/>' +
        '<line x1="62" y1="86" x2="78" y2="86" stroke="#C2410C" stroke-width="2"/>' +
        '<line x1="65" y1="106" x2="75" y2="106" stroke="#C2410C" stroke-width="2"/>' +
        '<polygon points="70,48 50,16 64,44" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
        '<polygon points="70,48 70,12 78,44" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
        '<polygon points="70,48 92,18 78,46" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>') +
      'Which food group does this belong to?',
    options:['vegetables','fruits','meats','breads'], answer:'vegetables',
    hint:'It grows under the ground and we often cook it.',
    explanation:'A carrot is a <b>vegetable</b>. 🥕 It is full of vitamin A, which helps your eyes see well in dim light.' }),

  makeMCQ({ id:'g2he-nut-062', chapterId:CH_NUT, difficulty:1, subsection:'food_groups',
    question:
      F(250, 130, 260, 'two foods side by side',
        '<ellipse cx="58" cy="66" rx="34" ry="44" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<ellipse cx="168" cy="66" rx="48" ry="26" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="214,66 240,46 240,86" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="140" cy="58" r="4" fill="#111827"/>') +
      'An egg and a fish are both rich in:',
    options:['protein','sugar','starch','water'], answer:'protein',
    hint:'Which one helps you build muscles and grow taller?',
    explanation:'Eggs and fish give <b>protein</b>. 🐟 Protein builds your body — muscles, skin and hair — so growing children need it every day.' }),

  makeMCQ({ id:'g2he-nut-063', chapterId:CH_NUT, difficulty:1, subsection:'food_groups',
    question:
      F(130, 150, 130, 'a glass filled with a pale drink',
        '<polygon points="34,26 96,26 88,132 42,132" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<polygon points="38,44 92,44 86,128 44,128" fill="#EFF6FF" stroke="#9CA3AF" stroke-width="1.5"/>') +
      'Drinking milk helps to build strong:',
    options:['bones and teeth','hair and nails','eyes and ears','skin and lips'], answer:'bones and teeth',
    hint:'Milk carries calcium. Which hard parts of you need it?',
    explanation:'Milk is full of calcium for <b>bones and teeth</b>. 🥛 Strong bones now means fewer breaks later.' }),

  makeMCQ({ id:'g2he-nut-064', chapterId:CH_NUT, difficulty:1, subsection:'food_groups',
    question:
      F(250, 130, 260, 'a baked food beside a bowl of small white grains',
        '<path d="M22,112 v-52 a36,26 0 0 1 72,0 v52 z" fill="#F5C77E" stroke="#92400E" stroke-width="3"/>' +
        '<path d="M148,66 a44,26 0 0 1 80,0 z" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
        '<path d="M140,66 h96 a48,40 0 0 1 -96,0 z" fill="#3B82F6" stroke="#111827" stroke-width="2"/>') +
      'Bread and rice mainly give us:',
    options:['energy','protein','vitamins','minerals'], answer:'energy',
    hint:'Which one lets you run and play all morning?',
    explanation:'Bread and rice are <b>energy-giving</b> foods. 🍚 Their starch is the fuel your body burns to move and think.' }),

  makeMCQ({ id:'g2he-nut-065', chapterId:CH_NUT, difficulty:1, subsection:'food_groups',
    question:
      F(330, 130, 330, 'four foods in a row',
        '<polygon points="14,34 66,34 60,116 20,116" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="18,50 62,50 57,112 23,112" fill="#EFF6FF" stroke="#9CA3AF" stroke-width="1.5"/>' +
        '<path d="M96,92 C96,50 130,36 152,36 C152,72 126,96 96,92 z" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
        '<line x1="102" y1="90" x2="148" y2="42" stroke="#166534" stroke-width="2"/>' +
        '<polygon points="186,44 216,44 201,114" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="201,44 188,20 199,42" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
        '<polygon points="201,44 214,20 205,42" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
        '<ellipse cx="286" cy="76" rx="36" ry="26" fill="#C89B6B" stroke="#92400E" stroke-width="2"/>' +
        '<circle cx="274" cy="70" r="3" fill="#92400E"/>' +
        '<circle cx="294" cy="82" r="3" fill="#92400E"/>' +
        '<circle cx="300" cy="66" r="3" fill="#92400E"/>') +
      'Which one of these is NOT a vegetable?',
    options:['the milk','the leaf','the carrot','the potato'], answer:'the milk',
    hint:'Three of them grow in the garden. One comes from an animal.',
    explanation:'Milk is a <b>dairy</b> food, not a vegetable. 🥛 The leaf, carrot and potato all grow in the ground or on a plant.' }),

  makeMCQ({ id:'g2he-nut-066', chapterId:CH_NUT, difficulty:1, subsection:'food_groups',
    question:
      F(230, 140, 240, 'two round fruits side by side',
        '<ellipse cx="72" cy="80" rx="46" ry="36" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<ellipse cx="54" cy="66" rx="18" ry="12" fill="#F97316"/>' +
        '<line x1="72" y1="44" x2="72" y2="26" stroke="#92400E" stroke-width="4"/>' +
        '<circle cx="176" cy="84" r="34" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="164" cy="72" r="4" fill="#B91C1C"/>' +
        '<circle cx="186" cy="76" r="4" fill="#B91C1C"/>' +
        '<circle cx="170" cy="96" r="4" fill="#B91C1C"/>' +
        '<circle cx="190" cy="98" r="4" fill="#B91C1C"/>' +
        '<line x1="176" y1="50" x2="176" y2="34" stroke="#92400E" stroke-width="4"/>') +
      'Mango and litchi from the market give your body plenty of:',
    options:['vitamins','protein','starch','fat'], answer:'vitamins',
    hint:'Fruits are famous for the tiny helpers that keep you well.',
    explanation:'Fruits are packed with <b>vitamins</b>. 🥭 Vitamin C from mango and litchi helps your body fight off illness.' }),

  makeMCQ({ id:'g2he-nut-067', chapterId:CH_NUT, difficulty:1, subsection:'food_groups',
    question:
      F(230, 140, 240, 'a plate holding several small foods',
        '<ellipse cx="115" cy="82" rx="94" ry="46" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<ellipse cx="70" cy="70" rx="11" ry="7" fill="#F59E0B" stroke="#92400E" stroke-width="1.5"/>' +
        '<ellipse cx="84" cy="82" rx="11" ry="7" fill="#F59E0B" stroke="#92400E" stroke-width="1.5"/>' +
        '<ellipse cx="66" cy="92" rx="11" ry="7" fill="#F59E0B" stroke="#92400E" stroke-width="1.5"/>' +
        '<ellipse cx="92" cy="66" rx="11" ry="7" fill="#F59E0B" stroke="#92400E" stroke-width="1.5"/>' +
        '<ellipse cx="100" cy="90" rx="11" ry="7" fill="#F59E0B" stroke="#92400E" stroke-width="1.5"/>' +
        '<ellipse cx="162" cy="80" rx="30" ry="22" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
        '<circle cx="162" cy="80" r="11" fill="#FACC15" stroke="#F59E0B" stroke-width="1.5"/>') +
      'Dholl (lentils) and eggs help you to grow. Foods like these are called:',
    options:['body builders','energy foods','sweet drinks','cold snacks'], answer:'body builders',
    hint:'What are they building inside you?',
    explanation:'They are <b>body-building</b> foods. 💪 Dholl, eggs, fish, beans and milk give the protein your body uses to grow.' }),

  makeMCQ({ id:'g2he-nut-068', chapterId:CH_NUT, difficulty:2, subsection:'food_groups',
    question:
      F(200, 130, 210, 'two pieces of the same baked food',
        '<path d="M18,112 v-50 a34,26 0 0 1 68,0 v50 z" fill="#F5C77E" stroke="#92400E" stroke-width="3"/>' +
        '<path d="M110,112 v-50 a34,26 0 0 1 68,0 v50 z" fill="#F5C77E" stroke="#92400E" stroke-width="3"/>') +
      'Ravi ate only bread for lunch. What should he add to make the meal better?',
    options:['some fish or beans','some more bread','a sweet gateau','a fizzy cold drink'], answer:'some fish or beans',
    hint:'Bread gives energy. Which group is still missing?',
    explanation:'Bread gives energy but no body-building food, so add <b>fish or beans</b>. 🐟 More bread would only add more of the same thing.' }),

  // ── g2he-nutrition · balanced_meals (069–076) ───────────────────────────────

  makeMCQ({ id:'g2he-nut-069', chapterId:CH_NUT, difficulty:1, subsection:'balanced_meals',
    question:
      F(170, 170, 180, 'a round plate divided into shaded parts',
        '<circle cx="85" cy="85" r="72" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<path d="M85,13 A72,72 0 0,0 85,157 Z" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
        '<path d="M85,13 A72,72 0 0,1 157,85 L85,85 Z" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<path d="M157,85 A72,72 0 0,1 85,157 L85,85 Z" fill="#92400E" stroke="#111827" stroke-width="2"/>') +
      'On a healthy plate, which part should fill the biggest space?',
    options:['fruit and vegetables','sweets and cakes','oil and butter','salt and sugar'], answer:'fruit and vegetables',
    hint:'Look at the largest section on the plate.',
    explanation:'<b>Fruit and vegetables</b> should fill about half the plate. 🥗 The rest is a little energy food and a little body-building food.' }),

  makeMCQ({ id:'g2he-nut-070', chapterId:CH_NUT, difficulty:1, subsection:'balanced_meals',
    question:
      F(200, 170, 190, 'a plate split into three parts, two of them holding food',
        '<circle cx="100" cy="88" r="76" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<line x1="100" y1="88" x2="100" y2="12" stroke="#111827" stroke-width="2"/>' +
        '<line x1="100" y1="88" x2="34" y2="126" stroke="#111827" stroke-width="2"/>' +
        '<line x1="100" y1="88" x2="166" y2="126" stroke="#111827" stroke-width="2"/>' +
        '<ellipse cx="66" cy="54" rx="26" ry="18" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
        '<ellipse cx="134" cy="54" rx="26" ry="14" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="160,54 176,44 176,64" fill="#3B82F6" stroke="#111827" stroke-width="2"/>') +
      'This plate has rice and fish. What is missing?',
    options:['vegetables','more rice','more fish','more salt'], answer:'vegetables',
    hint:'One part of the plate is still empty. Which group is not there?',
    explanation:'The plate needs <b>vegetables</b>. 🥦 Rice gives energy and fish builds the body, but only vegetables bring the vitamins and fibre.' }),

  makeMCQ({ id:'g2he-nut-071', chapterId:CH_NUT, difficulty:2, subsection:'balanced_meals',
    question:
      F(300, 170, 320, 'two round plates, one holding a single food and one divided into parts',
        '<circle cx="80" cy="84" r="64" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<ellipse cx="80" cy="84" rx="48" ry="30" fill="#FDE68A" stroke="#92400E" stroke-width="2"/>' +
        '<circle cx="220" cy="84" r="64" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<path d="M220,20 A64,64 0 0,0 220,148 Z" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
        '<path d="M220,20 A64,64 0 0,1 284,84 L220,84 Z" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<path d="M284,84 A64,64 0 0,1 220,148 L220,84 Z" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        T(80, 162, 16, 'A') + T(220, 162, 16, 'B')) +
      'Which plate shows a balanced meal?',
    options:['plate B','plate A','both plates','no plate'], answer:'plate B',
    hint:'A balanced meal has more than one kind of food on it.',
    explanation:'Plate B has three different food groups. 🍽️ Plate A is only one food, so it cannot give the body everything it needs.' }),

  makeMCQ({ id:'g2he-nut-072', chapterId:CH_NUT, difficulty:1, subsection:'balanced_meals',
    question:
      F(300, 140, 320, 'a box with three parts, one of them empty',
        '<rect x="16" y="24" width="268" height="96" rx="10" fill="#EFF6FF" stroke="#111827" stroke-width="3"/>' +
        '<line x1="106" y1="24" x2="106" y2="120" stroke="#111827" stroke-width="3"/>' +
        '<line x1="196" y1="24" x2="196" y2="120" stroke="#111827" stroke-width="3"/>' +
        '<polygon points="34,96 88,96 61,44" fill="#F5C77E" stroke="#92400E" stroke-width="2"/>' +
        '<circle cx="151" cy="80" r="30" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
        '<line x1="151" y1="50" x2="151" y2="38" stroke="#92400E" stroke-width="4"/>' +
        '<polygon points="151,42 170,32 158,48" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>') +
      'One part of this lunch box is still empty. What is the best thing to add?',
    options:['a bottle of water','a bar of chocolate','a packet of sweets','a fizzy cold drink'], answer:'a bottle of water',
    hint:'What does your body need most on a hot school day?',
    explanation:'Add <b>water</b>. 💧 A sandwich and a fruit are already there, and water is the healthiest drink for school.' }),

  makeMCQ({ id:'g2he-nut-073', chapterId:CH_NUT, difficulty:1, subsection:'balanced_meals',
    question:
      F(240, 140, 250, 'a bright round shape in the sky above a plate and a cup',
        '<circle cx="46" cy="42" r="24" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>' +
        '<line x1="46" y1="6" x2="46" y2="14" stroke="#F59E0B" stroke-width="3"/>' +
        '<line x1="10" y1="42" x2="18" y2="42" stroke="#F59E0B" stroke-width="3"/>' +
        '<line x1="74" y1="42" x2="82" y2="42" stroke="#F59E0B" stroke-width="3"/>' +
        '<line x1="20" y1="16" x2="26" y2="22" stroke="#F59E0B" stroke-width="3"/>' +
        '<line x1="72" y1="16" x2="66" y2="22" stroke="#F59E0B" stroke-width="3"/>' +
        '<ellipse cx="140" cy="96" rx="58" ry="28" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="116" y="80" width="48" height="16" rx="4" fill="#F5C77E" stroke="#92400E" stroke-width="2"/>' +
        '<polygon points="200,66 236,66 231,110 205,110" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<path d="M200,76 C186,76 186,98 200,98" fill="none" stroke="#111827" stroke-width="3"/>') +
      'Which meal should you never miss before school?',
    options:['breakfast','dinner','supper','a snack'], answer:'breakfast',
    hint:'The sun has just come up in the picture.',
    explanation:'<b>Breakfast</b> is the morning meal. ☀️ Without it your body has no fuel and it is hard to think in class.' }),

  makeMCQ({ id:'g2he-nut-074', chapterId:CH_NUT, difficulty:1, subsection:'balanced_meals',
    question:
      F(220, 150, 230, 'a glass and a jug holding a clear drink',
        '<polygon points="26,50 82,50 76,134 32,134" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<polygon points="30,72 78,72 74,130 34,130" fill="#3B82F6"/>' +
        '<rect x="116" y="44" width="74" height="86" rx="6" fill="#EFF6FF" stroke="#111827" stroke-width="3"/>' +
        '<rect x="122" y="76" width="62" height="48" fill="#3B82F6"/>' +
        '<path d="M190,60 C208,60 208,96 190,96" fill="none" stroke="#111827" stroke-width="4"/>') +
      'It is a very hot day in Mauritius. What should you drink most of?',
    options:['water','soda','syrup','juice'], answer:'water',
    hint:'Which drink has no sugar in it at all?',
    explanation:'<b>Water</b> is best. 💧 It replaces the sweat you lose in the heat, and unlike the others it adds no sugar to your teeth.' }),

  makeMCQ({ id:'g2he-nut-075', chapterId:CH_NUT, difficulty:1, subsection:'balanced_meals',
    question:
      F(330, 120, 330, 'a row of five small wrapped items',
        '<rect x="26" y="46" width="34" height="26" rx="8" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="14,50 26,59 14,68" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
        '<polygon points="72,50 60,59 72,68" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="84" y="46" width="34" height="26" rx="8" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="72,50 84,59 72,68" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
        '<polygon points="130,50 118,59 130,68" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="142" y="46" width="34" height="26" rx="8" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="130,50 142,59 130,68" fill="#FACC15" stroke="#111827" stroke-width="1.5"/>' +
        '<polygon points="188,50 176,59 188,68" fill="#FACC15" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="200" y="46" width="34" height="26" rx="8" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="188,50 200,59 188,68" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
        '<polygon points="246,50 234,59 246,68" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="258" y="46" width="34" height="26" rx="8" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="246,50 258,59 246,68" fill="#EC4899" stroke="#111827" stroke-width="1.5"/>' +
        '<polygon points="304,50 292,59 304,68" fill="#EC4899" stroke="#111827" stroke-width="1.5"/>') +
      'Eating a handful of sweets like these every day can cause:',
    options:['tooth decay','strong bones','better sight','clean teeth'], answer:'tooth decay',
    hint:'Sugar stays on your teeth long after the sweet has gone.',
    explanation:'Sugar causes <b>tooth decay</b>. 🍬 Keep sweets for a treat, and rinse or brush afterwards.' }),

  makeMCQ({ id:'g2he-nut-076', chapterId:CH_NUT, difficulty:2, subsection:'balanced_meals',
    question:
      F(250, 140, 260, 'two flat round breads beside a small bowl',
        '<ellipse cx="72" cy="60" rx="52" ry="20" fill="#F5E3B3" stroke="#92400E" stroke-width="2"/>' +
        '<ellipse cx="72" cy="86" rx="52" ry="20" fill="#F5E3B3" stroke="#92400E" stroke-width="2"/>' +
        '<path d="M156,72 h84 a42,36 0 0 1 -84,0 z" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<ellipse cx="198" cy="72" rx="42" ry="9" fill="#F97316" stroke="#C2410C" stroke-width="1.5"/>') +
      'You had two dholl puri for lunch. What should you add to balance the meal?',
    options:['some vegetables','some more bread','a sweet gateau','a fizzy drink'], answer:'some vegetables',
    hint:'Dholl puri is mostly energy food. What is still missing?',
    explanation:'Add <b>vegetables</b> — a little salad or brèdes. 🥬 Dholl puri already gives plenty of energy, so more bread adds nothing new.' }),

  // ── g2he-nutrition · food_safety (077–084) ──────────────────────────────────

  makeMCQ({ id:'g2he-nut-077', chapterId:CH_NUT, difficulty:1, subsection:'food_safety',
    question:
      F(320, 150, 330, 'two plates of food, one open with dots above it and one under a dome',
        '<ellipse cx="82" cy="104" rx="66" ry="24" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<ellipse cx="82" cy="94" rx="40" ry="18" fill="#FDE68A" stroke="#92400E" stroke-width="1.5"/>' +
        '<circle cx="60" cy="40" r="4" fill="#4B5563"/>' +
        '<circle cx="78" cy="28" r="4" fill="#4B5563"/>' +
        '<circle cx="96" cy="46" r="4" fill="#4B5563"/>' +
        '<circle cx="70" cy="60" r="4" fill="#4B5563"/>' +
        '<circle cx="94" cy="68" r="4" fill="#4B5563"/>' +
        '<ellipse cx="238" cy="104" rx="66" ry="24" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<path d="M180,104 a58,52 0 0 1 116,0 z" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="238" cy="48" r="6" fill="#6B7280" stroke="#111827" stroke-width="2"/>' +
        T(82, 140, 16, 'A') + T(238, 140, 16, 'B')) +
      'Why should food be covered like the food on plate B?',
    options:['to keep flies off','to make it cold','to make it sweet','to make it heavy'], answer:'to keep flies off',
    hint:'Look at the dots landing on the open plate.',
    explanation:'A cover <b>keeps flies and dust off</b>. 🪰 Flies walk on rubbish and then on food, leaving germs that give you a bad stomach.' }),

  makeMCQ({ id:'g2he-nut-078', chapterId:CH_NUT, difficulty:1, subsection:'food_safety',
    question:
      F(150, 180, 140, 'a tall kitchen appliance with two doors and a dial',
        '<rect x="26" y="14" width="98" height="152" rx="10" fill="#9CA3AF" stroke="#111827" stroke-width="3"/>' +
        '<line x1="26" y1="62" x2="124" y2="62" stroke="#111827" stroke-width="3"/>' +
        '<rect x="104" y="30" width="8" height="24" rx="4" fill="#111827"/>' +
        '<rect x="104" y="74" width="8" height="34" rx="4" fill="#111827"/>' +
        '<circle cx="60" cy="112" r="18" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<line x1="60" y1="112" x2="50" y2="100" stroke="#111827" stroke-width="3"/>') +
      'Why do we keep milk and meat in the fridge?',
    options:['to stop them spoiling','to make them sweeter','to make them cook fast','to make them grow big'], answer:'to stop them spoiling',
    hint:'Germs grow fast in a warm kitchen and slowly in the cold.',
    explanation:'Cold <b>slows the germs down</b>, so the food stays safe longer. ❄️ In our warm climate milk left out can spoil in a few hours.' }),

  makeMCQ({ id:'g2he-nut-079', chapterId:CH_NUT, difficulty:1, subsection:'food_safety',
    question:
      F(220, 150, 230, 'water running from a tap on to a round food',
        '<rect x="46" y="14" width="14" height="30" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="46" y="44" width="66" height="12" rx="3" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="104" y="56" width="8" height="22" fill="#3B82F6"/>' +
        '<circle cx="108" cy="86" r="4" fill="#3B82F6"/>' +
        '<circle cx="114" cy="96" r="4" fill="#3B82F6"/>' +
        '<circle cx="120" cy="104" r="34" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
        '<line x1="120" y1="70" x2="120" y2="58" stroke="#92400E" stroke-width="4"/>' +
        '<polygon points="120,62 140,52 128,68" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>') +
      'What must you do before eating a fruit bought at the market?',
    options:['wash it with water','rub it on your shirt','blow the dust off it','eat it straight away'], answer:'wash it with water',
    hint:'Many hands have touched that fruit before you.',
    explanation:'<b>Wash it</b> under clean water. 🚰 Dust, germs and spray sit on the skin, and rubbing or blowing does not take them off.' }),

  makeMCQ({ id:'g2he-nut-080', chapterId:CH_NUT, difficulty:1, subsection:'food_safety',
    question:
      F(170, 150, 180, 'a slice of a baked food with green spots on it',
        '<path d="M30,126 v-58 a52,38 0 0 1 104,0 v58 z" fill="#F5C77E" stroke="#92400E" stroke-width="3"/>' +
        '<circle cx="56" cy="84" r="7" fill="#22C55E"/>' +
        '<circle cx="72" cy="70" r="6" fill="#22C55E"/>' +
        '<circle cx="92" cy="92" r="7" fill="#22C55E"/>' +
        '<circle cx="108" cy="74" r="5" fill="#22C55E"/>' +
        '<circle cx="66" cy="104" r="6" fill="#22C55E"/>' +
        '<circle cx="100" cy="110" r="5" fill="#22C55E"/>' +
        '<circle cx="80" cy="84" r="4" fill="#166534"/>' +
        '<circle cx="98" cy="100" r="3" fill="#166534"/>') +
      'This slice of bread has spots of mould growing on it. What should you do?',
    options:['throw it away','cut the spots off','eat it very fast','give it to a friend'], answer:'throw it away',
    hint:'Mould spreads through the whole slice, not only where you can see it.',
    explanation:'<b>Throw it away.</b> 🍞 Mould sends tiny threads right through the bread, so cutting off the spots does not make it safe.' }),

  makeMCQ({ id:'g2he-nut-081', chapterId:CH_NUT, difficulty:2, subsection:'food_safety',
    question:
      F(220, 150, 230, 'a sealed packet with a printed label on the front',
        '<rect x="46" y="26" width="128" height="106" rx="8" fill="#FACC15" stroke="#111827" stroke-width="3"/>' +
        '<rect x="46" y="26" width="128" height="14" fill="#F59E0B" stroke="#111827" stroke-width="2"/>' +
        '<rect x="62" y="76" width="96" height="42" rx="6" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        T(110, 96, 15, 'USE BY') + T(110, 113, 14, '12 JUN')) +
      'This packet has a USE BY date printed on it. What does that date tell you?',
    options:['the last day to eat it','the day it was made on','the price of the packet','the weight of the packet'], answer:'the last day to eat it',
    hint:'It is a warning about time, not about money.',
    explanation:'It is the <b>last day the food is safe</b>. 📅 After that date the food may look fine and still make you ill, so always check before eating.' }),

  makeMCQ({ id:'g2he-nut-082', chapterId:CH_NUT, difficulty:2, subsection:'food_safety',
    question:
      F(300, 150, 320, 'a board divided in two, with a different food on each side',
        '<rect x="16" y="26" width="268" height="106" rx="12" fill="#C89B6B" stroke="#92400E" stroke-width="3"/>' +
        '<line x1="150" y1="26" x2="150" y2="132" stroke="#92400E" stroke-width="3"/>' +
        '<ellipse cx="80" cy="80" rx="44" ry="22" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="124,80 146,66 146,94" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="58" cy="74" r="3.5" fill="#111827"/>' +
        '<ellipse cx="218" cy="90" rx="52" ry="24" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<ellipse cx="218" cy="80" rx="34" ry="16" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
        '<path d="M206,58 C214,50 200,44 208,36" fill="none" stroke="#9CA3AF" stroke-width="2"/>' +
        '<path d="M230,58 C238,50 224,44 232,36" fill="none" stroke="#9CA3AF" stroke-width="2"/>') +
      'Raw fish is on one side and cooked rice on the other. Why keep them apart?',
    options:['germs can move over','it looks much nicer','it takes up less room','it keeps the plate dry'], answer:'germs can move over',
    hint:'Cooking kills germs. The raw side has not been cooked yet.',
    explanation:'Raw food carries germs that cooking would kill, so keeping it apart stops them <b>reaching the cooked food</b>. 🔪 Use a different board or wash it well.' }),

  makeMCQ({ id:'g2he-nut-083', chapterId:CH_NUT, difficulty:1, subsection:'food_safety',
    question:
      F(240, 140, 250, 'a shallow pool of brown water beside a bottle',
        '<ellipse cx="86" cy="106" rx="70" ry="24" fill="#8B7355" stroke="#92400E" stroke-width="2"/>' +
        '<circle cx="60" cy="102" r="4" fill="#4B5563"/>' +
        '<circle cx="88" cy="112" r="4" fill="#4B5563"/>' +
        '<circle cx="112" cy="100" r="4" fill="#4B5563"/>' +
        '<rect x="186" y="24" width="24" height="12" rx="3" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<rect x="188" y="36" width="20" height="24" fill="#EFF6FF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="172" y="58" width="52" height="72" rx="8" fill="#EFF6FF" stroke="#111827" stroke-width="2"/>') +
      'This water comes from a muddy puddle after the rain. May you drink it?',
    options:['no, it has germs','yes, it is fresh','yes, if you are hot','no, it is too cold'], answer:'no, it has germs',
    hint:'Think about what has been walking and washing through that puddle.',
    explanation:'<b>Never drink puddle water.</b> 🚱 It carries germs from soil, animals and rubbish. Drink clean tap or bottled water instead.' }),

  makeMCQ({ id:'g2he-nut-084', chapterId:CH_NUT, difficulty:2, subsection:'food_safety',
    question:
      F(200, 180, 200, 'a kitchen appliance beside a symbol with a cross over it',
        '<rect x="20" y="20" width="88" height="140" rx="10" fill="#9CA3AF" stroke="#111827" stroke-width="3"/>' +
        '<line x1="20" y1="64" x2="108" y2="64" stroke="#111827" stroke-width="3"/>' +
        '<rect x="90" y="34" width="8" height="22" rx="4" fill="#111827"/>' +
        '<rect x="90" y="76" width="8" height="32" rx="4" fill="#111827"/>' +
        '<polygon points="152,42 132,86 150,86 138,126 170,76 152,76 166,42" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<line x1="122" y1="38" x2="178" y2="130" stroke="#EF4444" stroke-width="6"/>' +
        '<line x1="178" y1="38" x2="122" y2="130" stroke="#EF4444" stroke-width="6"/>') +
      'After a cyclone there was no electricity for two days. The meat in the fridge now smells bad. What should be done?',
    options:['throw the meat away','cook it a long time','put it back inside','wash it with soap'], answer:'throw the meat away',
    hint:'A warm fridge is just a cupboard. What happened to the germs?',
    explanation:'<b>Throw it away.</b> 🌀 Without power the fridge warms up and germs multiply, and cooking or washing will not make spoiled meat safe.' }),

  // ── g2he-safety · home_safety (061–068) ─────────────────────────────────────

  makeMCQ({ id:'g2he-saf-061', chapterId:CH_SAF, difficulty:1, subsection:'home_safety',
    question:
      F(320, 150, 330, 'a cooker top with two pans on it',
        '<rect x="14" y="66" width="292" height="72" rx="8" fill="#9CA3AF" stroke="#111827" stroke-width="3"/>' +
        '<circle cx="86" cy="90" r="26" fill="#4B5563" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="234" cy="90" r="26" fill="#4B5563" stroke="#111827" stroke-width="2"/>' +
        '<rect x="0" y="58" width="52" height="10" rx="4" fill="#111827"/>' +
        '<rect x="52" y="42" width="68" height="46" rx="6" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<rect x="152" y="58" width="48" height="10" rx="4" fill="#111827"/>' +
        '<rect x="200" y="42" width="68" height="46" rx="6" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
        T(86, 30, 16, 'A') + T(234, 30, 16, 'B')) +
      'Which pan is standing safely on the cooker?',
    options:['pan B','pan A','both pans','no pans'], answer:'pan B',
    hint:'Look at which handle sticks out over the edge.',
    explanation:'Pan B has its handle <b>turned inwards</b>. 🍲 A handle sticking out can be knocked, and hot food falls on whoever is passing.' }),

  makeMCQ({ id:'g2he-saf-062', chapterId:CH_SAF, difficulty:1, subsection:'home_safety',
    question:
      F(190, 160, 200, 'a kitchen container with a spout and wavy lines above it',
        '<path d="M40,74 h96 v46 a14,14 0 0 1 -14,14 h-68 a14,14 0 0 1 -14,-14 z" fill="#9CA3AF" stroke="#111827" stroke-width="3"/>' +
        '<rect x="52" y="62" width="72" height="14" rx="5" fill="#6B7280" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="88" cy="56" r="6" fill="#6B7280" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="136,84 168,64 172,74 144,98" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<path d="M52,62 C52,32 124,32 124,62" fill="none" stroke="#111827" stroke-width="4"/>' +
        '<path d="M150,56 C158,46 142,40 150,28" fill="none" stroke="#9CA3AF" stroke-width="3"/>' +
        '<path d="M166,52 C174,42 158,36 166,24" fill="none" stroke="#9CA3AF" stroke-width="3"/>') +
      'The kettle has just boiled and steam is coming out. What should you do?',
    options:['keep well away','touch it quickly','look inside it','pour it yourself'], answer:'keep well away',
    hint:'Steam is even hotter than the water it comes from.',
    explanation:'<b>Keep away</b> and let an adult pour. ♨️ Steam burns skin instantly, and it burns before you feel it.' }),

  makeMCQ({ id:'g2he-saf-063', chapterId:CH_SAF, difficulty:1, subsection:'home_safety',
    question:
      F(240, 140, 250, 'a wall fitting with slots, and a fitting with pins beside it',
        '<rect x="20" y="30" width="94" height="94" rx="12" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<rect x="42" y="52" width="10" height="24" rx="3" fill="#111827"/>' +
        '<rect x="82" y="52" width="10" height="24" rx="3" fill="#111827"/>' +
        '<rect x="62" y="88" width="10" height="20" rx="3" fill="#111827"/>' +
        '<rect x="134" y="58" width="14" height="10" fill="#9CA3AF"/>' +
        '<rect x="134" y="86" width="14" height="10" fill="#9CA3AF"/>' +
        '<rect x="146" y="46" width="72" height="62" rx="10" fill="#111827" stroke="#111827" stroke-width="2"/>' +
        '<path d="M218,78 C234,78 234,110 218,120" fill="none" stroke="#111827" stroke-width="4"/>') +
      'What may go into an electric socket?',
    options:['only a real plug','a metal fork tip','a wet finger tip','a piece of paper'], answer:'only a real plug',
    hint:'Electricity jumps into anything that is pushed into those slots.',
    explanation:'<b>Only a proper plug.</b> ⚡ Anything else — metal, paper or a finger — can give a shock that stops the heart.' }),

  makeMCQ({ id:'g2he-saf-064', chapterId:CH_SAF, difficulty:1, subsection:'home_safety',
    question:
      F(150, 180, 150, 'a container with a warning symbol on its label',
        '<rect x="58" y="10" width="34" height="12" rx="3" fill="#111827"/>' +
        '<rect x="62" y="20" width="26" height="26" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="36" y="46" width="78" height="118" rx="12" fill="#22C55E" stroke="#111827" stroke-width="3"/>' +
        '<rect x="46" y="78" width="58" height="56" rx="4" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="75,86 99,126 51,126" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<rect x="72" y="98" width="6" height="16" rx="2" fill="#111827"/>' +
        '<circle cx="75" cy="120" r="3.5" fill="#111827"/>') +
      'This bottle has a danger sign on its label. What should you do with it?',
    options:['leave it and tell an adult','open it and have a smell','pour it out into a glass','hide it under your bed'], answer:'leave it and tell an adult',
    hint:'The yellow triangle is a warning that never changes its meaning.',
    explanation:'<b>Leave it alone and tell an adult.</b> ⚠️ A hazard triangle means the liquid can burn skin or poison you — even the smell can hurt.' }),

  makeMCQ({ id:'g2he-saf-065', chapterId:CH_SAF, difficulty:1, subsection:'home_safety',
    question:
      F(260, 160, 270, 'a sharp kitchen tool lying half over the edge of a table',
        '<rect x="20" y="72" width="200" height="14" rx="3" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="34" y="86" width="12" height="58" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="194" y="86" width="12" height="58" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
        '<rect x="140" y="58" width="46" height="12" rx="5" fill="#111827"/>' +
        '<polygon points="186,56 248,62 248,70 186,70" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>') +
      'The knife is lying over the edge of the table. What is the danger?',
    options:['it can fall and cut','it can turn cold','it can get lost','it can go blunt'], answer:'it can fall and cut',
    hint:'What happens if someone brushes past the handle?',
    explanation:'It can be knocked and <b>fall on someone below</b>. 🔪 Always push knives well back from the edge, blade away from you.' }),

  makeMCQ({ id:'g2he-saf-066', chapterId:CH_SAF, difficulty:1, subsection:'home_safety',
    question:
      F(240, 150, 250, 'a floor with a spill on it and a warning cone standing nearby',
        '<line x1="10" y1="120" x2="230" y2="120" stroke="#111827" stroke-width="3"/>' +
        '<ellipse cx="86" cy="112" rx="64" ry="16" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2"/>' +
        '<path d="M56,108 C70,102 86,102 100,106" fill="none" stroke="#FFFFFF" stroke-width="3"/>' +
        '<polygon points="184,52 214,118 154,118" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
        '<rect x="170" y="88" width="28" height="10" fill="#FFFFFF"/>' +
        '<rect x="146" y="118" width="76" height="10" rx="3" fill="#F97316" stroke="#111827" stroke-width="2"/>') +
      'The floor is wet and slippery. What should you do?',
    options:['walk around it slowly','run across it fast','slide on it for fun','jump over it high'], answer:'walk around it slowly',
    hint:'Feet grip a dry floor much better than a wet one.',
    explanation:'<b>Walk around it slowly</b> and tell someone to wipe it. 💧 Most falls at home happen on a wet floor, and a fall can break a bone.' }),

  makeMCQ({ id:'g2he-saf-067', chapterId:CH_SAF, difficulty:1, subsection:'home_safety',
    question:
      F(240, 160, 250, 'steps going up, with a long bar fixed beside them',
        '<polygon points="20,140 20,110 70,110 70,86 120,86 120,62 170,62 170,38 220,38 220,140" fill="#D1D5DB" stroke="#111827" stroke-width="3"/>' +
        '<line x1="60" y1="86" x2="220" y2="22" stroke="#92400E" stroke-width="6"/>' +
        '<line x1="70" y1="110" x2="70" y2="82" stroke="#92400E" stroke-width="4"/>' +
        '<line x1="120" y1="86" x2="120" y2="58" stroke="#92400E" stroke-width="4"/>' +
        '<line x1="170" y1="62" x2="170" y2="34" stroke="#92400E" stroke-width="4"/>') +
      'You are going down the stairs. What is the safe thing to do?',
    options:['hold the handrail','jump two at a time','run down them fast','slide down the rail'], answer:'hold the handrail',
    hint:'The long bar beside the steps is there for a reason.',
    explanation:'<b>Hold the handrail</b> and take one step at a time. 🪜 If your foot slips, your hand saves you.' }),

  makeMCQ({ id:'g2he-saf-068', chapterId:CH_SAF, difficulty:2, subsection:'home_safety',
    question:
      F(220, 140, 230, 'a small box with thin sticks beside it',
        '<rect x="40" y="60" width="120" height="56" rx="6" fill="#92400E" stroke="#111827" stroke-width="3"/>' +
        '<rect x="56" y="72" width="88" height="32" rx="4" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<rect x="120" y="24" width="72" height="7" rx="3" fill="#F5C77E" stroke="#92400E" stroke-width="1"/>' +
        '<rect x="186" y="22" width="14" height="11" rx="4" fill="#EF4444" stroke="#111827" stroke-width="1"/>' +
        '<rect x="120" y="40" width="72" height="7" rx="3" fill="#F5C77E" stroke="#92400E" stroke-width="1"/>' +
        '<rect x="186" y="38" width="14" height="11" rx="4" fill="#EF4444" stroke="#111827" stroke-width="1"/>') +
      'You find a box of matches lying at home. What is the safest thing to do?',
    options:['give it to an adult','light one to see','keep it in a pocket','hide it from adults'], answer:'give it to an adult',
    hint:'A match can set a whole house alight in seconds.',
    explanation:'<b>Give it to an adult.</b> 🔥 Matches are not toys, and hiding them only means nobody knows where the danger is.' }),

  // ── g2he-safety · road_safety (069–076) ─────────────────────────────────────

  makeMCQ({ id:'g2he-saf-069', chapterId:CH_SAF, difficulty:1, subsection:'road_safety',
    question:
      F(120, 240, 130, 'a tall dark box on a post with three round lamps, one of them bright',
        '<rect x="52" y="212" width="16" height="26" fill="#6B7280" stroke="#111827" stroke-width="2"/>' +
        '<rect x="18" y="10" width="84" height="204" rx="14" fill="#111827" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="60" cy="58" r="27" fill="#EF4444" stroke="#4B5563" stroke-width="2"/>' +
        '<circle cx="60" cy="112" r="27" fill="#4B5563" stroke="#374151" stroke-width="2"/>' +
        '<circle cx="60" cy="166" r="27" fill="#4B5563" stroke="#374151" stroke-width="2"/>') +
      'The top lamp of this traffic light is shining red. What does red mean?',
    options:['stop','go','park','turn'], answer:'stop',
    hint:'Red is used everywhere in the world for one single message.',
    explanation:'Red means <b>stop</b>. 🛑 Cars must stop at the line, and you must never step out while another road has the green.' }),

  makeMCQ({ id:'g2he-saf-070', chapterId:CH_SAF, difficulty:1, subsection:'road_safety',
    question:
      F(120, 240, 130, 'a tall dark box on a post with three round lamps of different colours',
        '<rect x="52" y="212" width="16" height="26" fill="#6B7280" stroke="#111827" stroke-width="2"/>' +
        '<rect x="18" y="10" width="84" height="204" rx="14" fill="#111827" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="60" cy="58" r="27" fill="#EF4444" stroke="#4B5563" stroke-width="2"/>' +
        '<circle cx="60" cy="112" r="27" fill="#FACC15" stroke="#4B5563" stroke-width="2"/>' +
        '<circle cx="60" cy="166" r="27" fill="#22C55E" stroke="#4B5563" stroke-width="2"/>') +
      'On this traffic light, which lamp tells the cars to GO?',
    options:['the green light','the red light','the amber light','the white light'], answer:'the green light',
    hint:'It is the lamp at the very bottom.',
    explanation:'<b>Green</b> means go. 🚦 It sits at the bottom, red at the top and amber in the middle, always in that order.' }),

  makeMCQ({ id:'g2he-saf-071', chapterId:CH_SAF, difficulty:1, subsection:'road_safety',
    question:
      F(120, 240, 130, 'a tall dark box on a post with three round lamps of different colours',
        '<rect x="52" y="212" width="16" height="26" fill="#6B7280" stroke="#111827" stroke-width="2"/>' +
        '<rect x="18" y="10" width="84" height="204" rx="14" fill="#111827" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="60" cy="58" r="27" fill="#EF4444" stroke="#4B5563" stroke-width="2"/>' +
        '<circle cx="60" cy="112" r="27" fill="#FACC15" stroke="#4B5563" stroke-width="2"/>' +
        '<circle cx="60" cy="166" r="27" fill="#22C55E" stroke="#4B5563" stroke-width="2"/>') +
      'Which colour is the middle lamp of a traffic light?',
    options:['amber','red','green','blue'], answer:'amber',
    hint:'Count from the top: it is the second one down.',
    explanation:'The middle lamp is <b>amber</b> (orange). 🟠 It warns drivers that the lights are about to change, so nobody should start crossing then.' }),

  makeMCQ({ id:'g2he-saf-072', chapterId:CH_SAF, difficulty:1, subsection:'road_safety',
    question:
      F(300, 150, 320, 'a road with wide white bars painted across it',
        '<rect x="0" y="10" width="300" height="24" fill="#22C55E"/>' +
        '<rect x="0" y="34" width="300" height="86" fill="#6B7280"/>' +
        '<rect x="0" y="120" width="300" height="24" fill="#22C55E"/>' +
        '<rect x="30" y="38" width="26" height="78" fill="#FFFFFF"/>' +
        '<rect x="74" y="38" width="26" height="78" fill="#FFFFFF"/>' +
        '<rect x="118" y="38" width="26" height="78" fill="#FFFFFF"/>' +
        '<rect x="162" y="38" width="26" height="78" fill="#FFFFFF"/>' +
        '<rect x="206" y="38" width="26" height="78" fill="#FFFFFF"/>' +
        '<rect x="250" y="38" width="26" height="78" fill="#FFFFFF"/>') +
      'What is this striped part of the road called?',
    options:['a zebra crossing','a bus stop sign','a car park space','a railway track'], answer:'a zebra crossing',
    hint:'The stripes look like the coat of an animal.',
    explanation:'It is a <b>zebra crossing</b>. 🦓 It is the safest place to cross, but still look both ways and wait for the cars to stop.' }),

  makeMCQ({ id:'g2he-saf-073', chapterId:CH_SAF, difficulty:1, subsection:'road_safety',
    question:
      F(300, 150, 320, 'a road with a vehicle on it and a raised path along the side',
        '<rect x="0" y="26" width="300" height="76" fill="#6B7280"/>' +
        '<rect x="20" y="60" width="30" height="6" fill="#FFFFFF"/>' +
        '<rect x="90" y="60" width="30" height="6" fill="#FFFFFF"/>' +
        '<rect x="160" y="60" width="30" height="6" fill="#FFFFFF"/>' +
        '<rect x="230" y="60" width="30" height="6" fill="#FFFFFF"/>' +
        '<rect x="0" y="102" width="300" height="8" fill="#9CA3AF"/>' +
        '<rect x="0" y="110" width="300" height="34" fill="#D1D5DB"/>' +
        '<line x1="70" y1="110" x2="70" y2="144" stroke="#9CA3AF" stroke-width="2"/>' +
        '<line x1="150" y1="110" x2="150" y2="144" stroke="#9CA3AF" stroke-width="2"/>' +
        '<line x1="230" y1="110" x2="230" y2="144" stroke="#9CA3AF" stroke-width="2"/>' +
        '<rect x="80" y="22" width="48" height="16" rx="5" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
        '<rect x="60" y="36" width="88" height="24" rx="6" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="82" cy="60" r="9" fill="#111827"/>' +
        '<circle cx="128" cy="60" r="9" fill="#111827"/>') +
      'Where should you walk on your way to school?',
    options:['on the pavement','on the road','behind a car','in the middle'], answer:'on the pavement',
    hint:'Which part of the picture has no cars on it?',
    explanation:'Walk <b>on the pavement</b>. 🚶 It is raised away from the traffic. Where there is no pavement, walk facing the cars, well to the side.' }),

  makeMCQ({ id:'g2he-saf-074', chapterId:CH_SAF, difficulty:2, subsection:'road_safety',
    question:
      F(320, 160, 330, 'a road with a vehicle in the near lane and two marks on the path',
        '<rect x="0" y="30" width="320" height="88" fill="#6B7280"/>' +
        '<rect x="20" y="70" width="30" height="6" fill="#FFFFFF"/>' +
        '<rect x="90" y="70" width="30" height="6" fill="#FFFFFF"/>' +
        '<rect x="160" y="70" width="30" height="6" fill="#FFFFFF"/>' +
        '<rect x="230" y="70" width="30" height="6" fill="#FFFFFF"/>' +
        '<rect x="0" y="118" width="320" height="30" fill="#D1D5DB"/>' +
        '<rect x="214" y="70" width="46" height="16" rx="5" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<rect x="196" y="84" width="86" height="24" rx="6" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="216" cy="108" r="9" fill="#111827"/>' +
        '<circle cx="262" cy="108" r="9" fill="#111827"/>' +
        '<line x1="188" y1="96" x2="152" y2="96" stroke="#111827" stroke-width="4"/>' +
        '<polygon points="142,96 156,89 156,103" fill="#111827"/>' +
        '<ellipse cx="54" cy="132" rx="7" ry="12" fill="#111827"/>' +
        '<ellipse cx="72" cy="132" rx="7" ry="12" fill="#111827"/>') +
      'In Mauritius cars drive on the left, so they reach you from one side first. When you stand at the kerb, which way do you look FIRST?',
    options:['right','left','down','back'], answer:'right',
    hint:'In the picture, which side is the nearest car coming from?',
    explanation:'Look <b>right first</b>, then left, then right again. 👀 Because we drive on the left, the closest lane brings cars from your right.' }),

  makeMCQ({ id:'g2he-saf-075', chapterId:CH_SAF, difficulty:1, subsection:'road_safety',
    question:
      F(320, 150, 330, 'a road with white bars painted across it and a vehicle waiting behind a line',
        '<rect x="0" y="26" width="320" height="88" fill="#6B7280"/>' +
        '<rect x="40" y="30" width="22" height="80" fill="#FFFFFF"/>' +
        '<rect x="70" y="30" width="22" height="80" fill="#FFFFFF"/>' +
        '<rect x="100" y="30" width="22" height="80" fill="#FFFFFF"/>' +
        '<rect x="130" y="30" width="22" height="80" fill="#FFFFFF"/>' +
        '<rect x="164" y="26" width="8" height="88" fill="#FFFFFF"/>' +
        '<rect x="198" y="26" width="46" height="16" rx="5" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
        '<rect x="180" y="40" width="86" height="24" rx="6" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="200" cy="64" r="9" fill="#111827"/>' +
        '<circle cx="246" cy="64" r="9" fill="#111827"/>' +
        '<rect x="0" y="114" width="320" height="30" fill="#D1D5DB"/>') +
      'You must cross a busy road near the market. What is safest?',
    options:['cross with a grown-up','run across quickly','cross between two cars','cross without looking'], answer:'cross with a grown-up',
    hint:'A driver can see a tall adult long before a small child.',
    explanation:'<b>Cross with a grown-up</b>, on the crossing, when the cars have stopped. 🤝 Running or stepping out between parked cars means no driver sees you coming.' }),

  makeMCQ({ id:'g2he-saf-076', chapterId:CH_SAF, difficulty:2, subsection:'road_safety',
    question:
      F(300, 150, 320, 'a long yellow vehicle with many windows standing at the roadside',
        '<rect x="20" y="42" width="230" height="66" rx="10" fill="#FACC15" stroke="#111827" stroke-width="3"/>' +
        '<rect x="36" y="54" width="40" height="26" rx="3" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="86" y="54" width="40" height="26" rx="3" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="136" y="54" width="40" height="26" rx="3" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="186" y="54" width="34" height="26" rx="3" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="228" y="60" width="20" height="48" rx="3" fill="#EFF6FF" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="70" cy="112" r="18" fill="#111827"/>' +
        '<circle cx="70" cy="112" r="8" fill="#9CA3AF"/>' +
        '<circle cx="206" cy="112" r="18" fill="#111827"/>' +
        '<circle cx="206" cy="112" r="8" fill="#9CA3AF"/>' +
        '<line x1="0" y1="132" x2="300" y2="132" stroke="#111827" stroke-width="3"/>') +
      'You have just got off the school bus and you need to cross the road. What do you do?',
    options:['wait for it to leave','cross in front of it','cross behind the bus','run around the bus'], answer:'wait for it to leave',
    hint:'While the bus is there, can a passing driver see you?',
    explanation:'<b>Wait until the bus drives off</b> and you can see the whole road. 🚌 In front of or behind a bus you are hidden, and drivers cannot stop for what they cannot see.' }),

  // ── g2he-safety · first_aid_basics (077–084) ────────────────────────────────

  makeMCQ({ id:'g2he-saf-077', chapterId:CH_SAF, difficulty:1, subsection:'first_aid_basics',
    question:
      F(240, 120, 250, 'a long strip with a soft white pad in the middle',
        '<rect x="20" y="40" width="200" height="40" rx="16" fill="#F5C77E" stroke="#92400E" stroke-width="2"/>' +
        '<rect x="88" y="48" width="64" height="24" rx="4" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
        '<circle cx="40" cy="52" r="2.5" fill="#92400E"/>' +
        '<circle cx="40" cy="68" r="2.5" fill="#92400E"/>' +
        '<circle cx="56" cy="52" r="2.5" fill="#92400E"/>' +
        '<circle cx="56" cy="68" r="2.5" fill="#92400E"/>' +
        '<circle cx="184" cy="52" r="2.5" fill="#92400E"/>' +
        '<circle cx="184" cy="68" r="2.5" fill="#92400E"/>' +
        '<circle cx="200" cy="52" r="2.5" fill="#92400E"/>' +
        '<circle cx="200" cy="68" r="2.5" fill="#92400E"/>') +
      'You have washed a small cut on your knee. What goes on it next?',
    options:['a clean plaster','a dirty cloth','some hot sand','a piece of tape'], answer:'a clean plaster',
    hint:'The soft white pad in the middle goes over the cut.',
    explanation:'Cover it with a <b>clean plaster</b>. 🩹 The pad keeps dirt and germs out while your skin heals underneath.' }),

  makeMCQ({ id:'g2he-saf-078', chapterId:CH_SAF, difficulty:1, subsection:'first_aid_basics',
    question:
      F(200, 150, 210, 'water running from a tap into a basin',
        '<rect x="44" y="8" width="32" height="10" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<rect x="52" y="16" width="16" height="44" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="52" y="60" width="60" height="14" rx="4" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="100" y="74" width="10" height="42" fill="#3B82F6"/>' +
        '<path d="M28,110 h150 l-18,28 h-114 z" fill="#E5E7EB" stroke="#111827" stroke-width="2"/>') +
      'What should you wash a small cut with?',
    options:['clean water','sea water','muddy water','cooking oil'], answer:'clean water',
    hint:'Anything dirty would push more germs into the cut.',
    explanation:'Use <b>clean running water</b>. 🚰 It rinses the dirt out. Then dry gently, cover it, and tell a grown-up.' }),

  makeMCQ({ id:'g2he-saf-079', chapterId:CH_SAF, difficulty:1, subsection:'first_aid_basics',
    question:
      F(260, 150, 270, 'a pan with wavy lines above it and a tap running at the other side',
        '<rect x="24" y="56" width="86" height="56" rx="8" fill="#9CA3AF" stroke="#111827" stroke-width="3"/>' +
        '<rect x="110" y="70" width="30" height="9" rx="4" fill="#111827"/>' +
        '<path d="M46,48 C54,38 38,32 46,20" fill="none" stroke="#F97316" stroke-width="3"/>' +
        '<path d="M70,48 C78,38 62,32 70,20" fill="none" stroke="#F97316" stroke-width="3"/>' +
        '<path d="M94,48 C102,38 86,32 94,20" fill="none" stroke="#F97316" stroke-width="3"/>' +
        '<rect x="186" y="20" width="14" height="36" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="160" y="56" width="40" height="12" rx="4" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="164" y="68" width="10" height="56" fill="#3B82F6"/>' +
        '<circle cx="169" cy="132" r="5" fill="#3B82F6"/>') +
      'You touched a hot pan and burnt your finger. What helps most?',
    options:['cool running water','butter on the burn','ice put straight on','a tight cloth wrap'], answer:'cool running water',
    hint:'Something must take the heat out of the skin gently.',
    explanation:'<b>Cool running water.</b> 🚿 It draws the heat out. Never put butter, oil, ice or toothpaste on a burn, and always tell an adult.' }),

  makeMCQ({ id:'g2he-saf-080', chapterId:CH_SAF, difficulty:2, subsection:'first_aid_basics',
    question:
      F(260, 150, 270, 'a running tap beside a round dial with hands',
        '<rect x="34" y="16" width="14" height="40" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="34" y="56" width="56" height="12" rx="4" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="80" y="68" width="10" height="56" fill="#3B82F6"/>' +
        '<circle cx="85" cy="132" r="5" fill="#3B82F6"/>' +
        '<circle cx="180" cy="76" r="46" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<line x1="180" y1="34" x2="180" y2="42" stroke="#111827" stroke-width="3"/>' +
        '<line x1="222" y1="76" x2="214" y2="76" stroke="#111827" stroke-width="3"/>' +
        '<line x1="180" y1="118" x2="180" y2="110" stroke="#111827" stroke-width="3"/>' +
        '<line x1="138" y1="76" x2="146" y2="76" stroke="#111827" stroke-width="3"/>' +
        '<line x1="180" y1="76" x2="180" y2="46" stroke="#111827" stroke-width="4"/>' +
        '<line x1="180" y1="76" x2="204" y2="90" stroke="#111827" stroke-width="3"/>' +
        '<circle cx="180" cy="76" r="3" fill="#111827"/>') +
      'How long should a small burn be held under cool running water?',
    options:['about 10 minutes','about 10 seconds','about 10 hours','about 1 second'], answer:'about 10 minutes',
    hint:'A few seconds is not long enough to take the heat out of the skin.',
    explanation:'Keep it under the water for <b>about 10 minutes</b> — longer if it still hurts. ⏱️ Then let a grown-up look at it.' }),

  makeMCQ({ id:'g2he-saf-081', chapterId:CH_SAF, difficulty:1, subsection:'first_aid_basics',
    question:
      F(200, 140, 210, 'a soft bag holding several small cold blocks',
        '<rect x="86" y="24" width="28" height="14" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<rect x="34" y="36" width="132" height="72" rx="18" fill="#BFDBFE" stroke="#3B82F6" stroke-width="3"/>' +
        '<rect x="50" y="50" width="26" height="24" rx="4" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2"/>' +
        '<rect x="84" y="50" width="26" height="24" rx="4" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2"/>' +
        '<rect x="118" y="50" width="26" height="24" rx="4" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2"/>' +
        '<rect x="66" y="78" width="26" height="24" rx="4" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2"/>' +
        '<rect x="100" y="78" width="26" height="24" rx="4" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2"/>') +
      'You bumped your head on the desk and it has a lump. What can help?',
    options:['a cold ice pack','a hot water cup','a rub with sand','a tight head band'], answer:'a cold ice pack',
    hint:'Something cold makes a swelling go down.',
    explanation:'Hold a <b>cold pack wrapped in a cloth</b> on it for a few minutes. 🧊 Always tell a grown-up about a bump on the head.' }),

  makeMCQ({ id:'g2he-saf-082', chapterId:CH_SAF, difficulty:1, subsection:'first_aid_basics',
    question:
      F(220, 160, 220, 'a box with a handle and a cross on the front',
        '<rect x="34" y="42" width="152" height="98" rx="10" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<line x1="34" y1="72" x2="186" y2="72" stroke="#111827" stroke-width="3"/>' +
        '<path d="M92,42 v-12 h36 v12" fill="none" stroke="#111827" stroke-width="4"/>' +
        '<rect x="98" y="86" width="24" height="44" fill="#EF4444"/>' +
        '<rect x="88" y="96" width="44" height="24" fill="#EF4444"/>') +
      'What is kept inside a box marked like this?',
    options:['plasters and tape','pens and pencils','toys and marbles','forks and spoons'], answer:'plasters and tape',
    hint:'The cross is the sign used for helping people who are hurt.',
    explanation:'It is the <b>first-aid box</b>. 🩹 It holds plasters, tape, bandages and cotton — ask an adult to open it, never help yourself.' }),

  makeMCQ({ id:'g2he-saf-083', chapterId:CH_SAF, difficulty:1, subsection:'first_aid_basics',
    question:
      F(130, 200, 130, 'a small flat device with a screen',
        '<rect x="24" y="14" width="82" height="172" rx="14" fill="#111827" stroke="#111827" stroke-width="2"/>' +
        '<rect x="32" y="30" width="66" height="128" rx="6" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
        '<circle cx="48" cy="56" r="7" fill="#9CA3AF"/>' +
        '<circle cx="65" cy="56" r="7" fill="#9CA3AF"/>' +
        '<circle cx="82" cy="56" r="7" fill="#9CA3AF"/>' +
        '<circle cx="48" cy="80" r="7" fill="#9CA3AF"/>' +
        '<circle cx="65" cy="80" r="7" fill="#9CA3AF"/>' +
        '<circle cx="82" cy="80" r="7" fill="#9CA3AF"/>' +
        '<circle cx="48" cy="104" r="7" fill="#9CA3AF"/>' +
        '<circle cx="65" cy="104" r="7" fill="#9CA3AF"/>' +
        '<circle cx="82" cy="104" r="7" fill="#9CA3AF"/>' +
        '<circle cx="65" cy="172" r="9" fill="#4B5563" stroke="#9CA3AF" stroke-width="2"/>') +
      'Someone at home has fallen and is badly hurt. What do you do first?',
    options:['call a grown-up','move the person','give them water','take a photo'], answer:'call a grown-up',
    hint:'You are seven. Who can decide what happens next?',
    explanation:'<b>Call a grown-up straight away.</b> 📞 Never move someone who is badly hurt — moving them can make the injury worse. An adult can call the ambulance on 114.' }),

  makeMCQ({ id:'g2he-saf-084', chapterId:CH_SAF, difficulty:2, subsection:'first_aid_basics',
    question:
      F(240, 160, 250, 'a bright round shape in the sky beside a large shade on a pole',
        '<circle cx="48" cy="42" r="26" fill="#FACC15" stroke="#F59E0B" stroke-width="3"/>' +
        '<line x1="48" y1="4" x2="48" y2="12" stroke="#F59E0B" stroke-width="3"/>' +
        '<line x1="10" y1="42" x2="18" y2="42" stroke="#F59E0B" stroke-width="3"/>' +
        '<line x1="48" y1="72" x2="48" y2="80" stroke="#F59E0B" stroke-width="3"/>' +
        '<line x1="21" y1="15" x2="27" y2="21" stroke="#F59E0B" stroke-width="3"/>' +
        '<line x1="75" y1="15" x2="69" y2="21" stroke="#F59E0B" stroke-width="3"/>' +
        '<line x1="21" y1="69" x2="27" y2="63" stroke="#F59E0B" stroke-width="3"/>' +
        '<path d="M100,84 a68,52 0 0 1 136,0 z" fill="#EF4444" stroke="#111827" stroke-width="3"/>' +
        '<line x1="168" y1="32" x2="168" y2="84" stroke="#FFFFFF" stroke-width="4"/>' +
        '<rect x="164" y="84" width="8" height="60" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
        '<line x1="20" y1="144" x2="228" y2="144" stroke="#F59E0B" stroke-width="4"/>') +
      'You played all afternoon at the beach and now your skin is red and sore from the sun. What helps?',
    options:['cool water and shade','hot water and sun','more time in the sun','a rub with dry sand'], answer:'cool water and shade',
    hint:'Sunburn is a burn, so treat it the way you treat any burn.',
    explanation:'Get into the <b>shade and cool the skin with water</b>. ☀️ Next time wear a hat and a T-shirt, and stay under a shade between 11 and 3.' })

);
})();
