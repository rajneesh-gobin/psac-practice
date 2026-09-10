'use strict';
(function () {

// Grade 3 Health Education — Hygiene and Disease Prevention
// IDs: g3he-hyg-001 onwards
// Subsections: body_hygiene, disease_prevention, community_hygiene

STATIC_QUESTIONS.push(

  // ── body_hygiene (001–025) ────────────────────────────────────────────────

  makeMCQ({ id:'g3he-hyg-001', chapterId:'g3he-hygiene', difficulty:1, subsection:'body_hygiene',
    question:'What does "personal hygiene" mean?',
    options:['Keeping our body clean','Keeping our room tidy','Keeping our books neat','Keeping our garden green'],
    answer:'Keeping our body clean',
    hint:'Personal hygiene covers the whole body.',
    explanation:'<b>Personal hygiene</b> means keeping all parts of our body clean — hair, skin, teeth, nails and clothes — to stay healthy and prevent illness.' }),

  makeMCQ({ id:'g3he-hyg-002', chapterId:'g3he-hygiene', difficulty:1, subsection:'body_hygiene',
    question:'Which part of the body protects us from germs and infection?',
    options:['The skin','The hair','The nails','The bones'],
    answer:'The skin',
    hint:'Our skin is the body\'s first line of defence.',
    explanation:'Our <b>skin</b> is the body\'s main barrier against germs. Clean, unbroken skin prevents bacteria and viruses from entering our body.' }),

  makeMCQ({ id:'g3he-hyg-003', chapterId:'g3he-hygiene', difficulty:2, subsection:'body_hygiene',
    question:'Why should we trim our fingernails regularly?',
    options:['Germs collect under long nails','Long nails are hard to paint','Short nails help us write','It is only a school rule'],
    answer:'Germs collect under long nails',
    hint:'Think about what gets trapped under long nails.',
    explanation:'<b>Germs and dirt collect under long nails</b>. When we handle food or touch our face, those germs can enter our body and spread illness.' }),

  makeTF({ id:'g3he-hyg-004', chapterId:'g3he-hygiene', difficulty:1, subsection:'body_hygiene',
    question:'Washing our hair regularly is part of good personal hygiene.',
    answer:true,
    explanation:'<b>True.</b> Hair can collect dirt, sweat and bacteria. Regular washing keeps it clean and prevents scalp problems.' }),

  makeMCQ({ id:'g3he-hyg-005', chapterId:'g3he-hygiene', difficulty:2, subsection:'body_hygiene',
    question:'What happens if we do not bathe or clean our body regularly?',
    options:['Bacteria grow on our skin','Our skin becomes softer','Our bones grow stronger','Our hair grows faster'],
    answer:'Bacteria grow on our skin',
    hint:'Think about what lives on our skin.',
    explanation:'Without regular cleaning, <b>bacteria multiply on the skin</b> causing body odour and increasing the risk of skin infections.' }),

  makeMCQ({ id:'g3he-hyg-006', chapterId:'g3he-hygiene', difficulty:1, subsection:'body_hygiene',
    question:'How many times should you brush your teeth each day, and for how long?',
    options:['Twice a day, 2 minutes','Once a day, 30 seconds','Three times, 10 seconds','Once a week, 5 minutes'],
    answer:'Twice a day, 2 minutes',
    hint:'Both frequency and duration matter.',
    explanation:'Brush <b>twice a day for at least 2 minutes</b>. This removes plaque effectively from all tooth surfaces.' }),

  makeTF({ id:'g3he-hyg-007', chapterId:'g3he-hygiene', difficulty:1, subsection:'body_hygiene',
    question:'It is important to clean behind the ears when bathing.',
    answer:true,
    explanation:'<b>True.</b> Dirt and wax build up behind ears. Cleaning this area is part of thorough body hygiene.' }),

  makeMCQ({ id:'g3he-hyg-008', chapterId:'g3he-hygiene', difficulty:1, subsection:'body_hygiene',
    question:'What causes tooth plaque?',
    options:['A sticky film of bacteria','A thin layer of water','A coating of toothpaste','A layer of clean saliva'],
    answer:'A sticky film of bacteria',
    hint:'Plaque needs food (sugar) to form.',
    explanation:'<b>Plaque</b> is a sticky film of bacteria that forms on teeth. These bacteria are fed by sugar in food, producing acid that causes tooth decay.' }),

  makeMCQ({ id:'g3he-hyg-009', chapterId:'g3he-hygiene', difficulty:2, subsection:'body_hygiene',
    question:'What is the best way to care for our skin?',
    options:['Wash daily with mild soap','Wash with very hot water','Never wash, only use cream','Stay indoors all the time'],
    answer:'Wash daily with mild soap',
    hint:'Skin care involves cleaning, protection and hydration.',
    explanation:'Good skin care means <b>washing daily, using sun protection and staying hydrated</b>. This keeps the skin clean, healthy and functioning as a barrier.' }),

  makeTF({ id:'g3he-hyg-010', chapterId:'g3he-hygiene', difficulty:1, subsection:'body_hygiene',
    question:'Sweating is normal and healthy, but we should wash sweat off our body regularly.',
    answer:true,
    explanation:'<b>True.</b> Sweat is a normal body function. However, leaving sweat on the skin allows bacteria to multiply, causing odour and irritation.' }),

  // ── disease_prevention (011–030) ──────────────────────────────────────────

  makeMCQ({ id:'g3he-hyg-011', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'A communicable disease is one that:',
    options:['Spreads between people','Comes from eating badly','Affects only animals','Can never be cured'],
    answer:'Spreads between people',
    hint:'Think about the word "communicable" — it means transferable.',
    explanation:'A <b>communicable disease</b> is one that can <b>spread from person to person</b> (e.g., common cold, flu, chickenpox).' }),

  makeMCQ({ id:'g3he-hyg-012', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'Which of these is a way that diseases spread?',
    options:['Coughing and sneezing','Reading books','Sleeping late','Watching television'],
    answer:'Coughing and sneezing',
    hint:'Diseases need a route to travel.',
    explanation:'Diseases spread through <b>contaminated water/food, coughing, sneezing, direct contact and insects</b>. Breaking these routes prevents spread.' }),

  makeTF({ id:'g3he-hyg-013', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'Vaccination (immunisation) helps protect us from certain diseases.',
    answer:true,
    explanation:'<b>True.</b> Vaccines train our immune system to recognise and fight specific diseases, providing protection without suffering the disease.' }),

  makeMCQ({ id:'g3he-hyg-014', chapterId:'g3he-hygiene', difficulty:2, subsection:'disease_prevention',
    question:'Which practice BEST prevents the spread of communicable diseases?',
    options:['Washing hands with soap','Eating more sugar','Staying indoors always','Sleeping longer hours'],
    answer:'Washing hands with soap',
    hint:'Multiple good habits together protect us best.',
    explanation:'The best protection combines <b>hand washing, covering coughs, clean food and safe water</b> — these interrupt the ways germs spread.' }),

  makeMCQ({ id:'g3he-hyg-015', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'Mosquitoes can spread which disease common in Mauritius?',
    options:['Dengue fever','The common cold','Tooth decay','Broken bones'],
    answer:'Dengue fever',
    hint:'This tropical disease is spread by a specific type of mosquito.',
    explanation:'<b>Dengue fever</b> is spread by the Aedes mosquito bite. Removing stagnant water where mosquitoes breed is essential prevention.' }),

  makeTF({ id:'g3he-hyg-016', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'Stagnant (still) water is a breeding ground for mosquitoes.',
    answer:true,
    explanation:'<b>True.</b> Mosquitoes lay eggs in still water. Removing or covering containers of stagnant water prevents mosquito breeding.' }),

  makeMCQ({ id:'g3he-hyg-017', chapterId:'g3he-hygiene', difficulty:2, subsection:'disease_prevention',
    question:'How can we prevent mosquitoes from breeding at home?',
    options:['Remove standing water','Leave windows open','Plant more trees','Keep the lights on'],
    answer:'Remove standing water',
    hint:'Mosquitoes need still water to breed.',
    explanation:'Prevent mosquito breeding by <b>removing standing water</b> (pots, tyres, gutters), using <b>mosquito nets</b> and applying <b>repellents</b>.' }),

  makeMCQ({ id:'g3he-hyg-018', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'Why is it important to drink clean (safe) water?',
    options:['Dirty water carries germs','Dirty water is cheaper','Clean water weighs less','Dirty water is colder'],
    answer:'Dirty water carries germs',
    hint:'Think about water-borne diseases.',
    explanation:'<b>Contaminated water</b> carries bacteria, viruses and parasites causing diseases like diarrhoea, cholera and typhoid. Clean water is essential.' }),

  makeTF({ id:'g3he-hyg-019', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'We should avoid touching our eyes, nose and mouth with unwashed hands.',
    answer:true,
    explanation:'<b>True.</b> Eyes, nose and mouth are entry points for germs. Touching them with dirty hands allows germs to enter the body.' }),

  makeMCQ({ id:'g3he-hyg-020', chapterId:'g3he-hygiene', difficulty:2, subsection:'disease_prevention',
    question:'What is the most effective single action to prevent the spread of most common diseases?',
    options:['Washing hands with soap','Taking vitamins daily','Wearing thick clothes','Eating less food'],
    answer:'Washing hands with soap',
    hint:'This is the most proven and simple prevention.',
    explanation:'<b>Regular thorough hand washing</b> is the single most effective way to prevent the spread of many common infections including colds, flu and stomach bugs.' }),

  // ── community_hygiene (021–040) ───────────────────────────────────────────

  makeMCQ({ id:'g3he-hyg-021', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'What is community hygiene?',
    options:['Keeping shared places clean','Keeping only our house clean','Keeping our own desk tidy','Washing hands only at home'],
    answer:'Keeping shared places clean',
    hint:'Community means the whole neighbourhood or town.',
    explanation:'<b>Community hygiene</b> means keeping shared spaces — streets, parks, drains, water sources — clean to protect the health of everyone.' }),

  makeMCQ({ id:'g3he-hyg-022', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'What should we do with household waste (rubbish)?',
    options:['Put it in a rubbish bin','Throw it in the river','Leave it in the street','Burn it near the school'],
    answer:'Put it in a rubbish bin',
    hint:'Proper waste disposal protects everyone.',
    explanation:'Household waste should be placed in <b>the correct rubbish bins for collection</b>. Improper disposal attracts pests and spreads disease.' }),

  makeTF({ id:'g3he-hyg-023', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'Littering in public places is harmful to the community\'s health.',
    answer:true,
    explanation:'<b>True.</b> Litter attracts rodents and insects that spread disease, blocks drains causing flooding and makes the environment unhealthy.' }),

  makeMCQ({ id:'g3he-hyg-024', chapterId:'g3he-hygiene', difficulty:2, subsection:'community_hygiene',
    question:'Why is proper sewage (toilet waste) disposal important?',
    options:['Sewage spreads disease','Sewage smells pleasant','Sewage is harmless','Sewage cleans rivers'],
    answer:'Sewage spreads disease',
    hint:'Think about water-borne diseases.',
    explanation:'<b>Untreated sewage contaminates water sources and soil</b>, spreading deadly diseases like cholera and typhoid. Proper sewage systems protect public health.' }),

  makeMCQ({ id:'g3he-hyg-025', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'How can we help keep our school environment clean?',
    options:['Use the bins provided','Sweep only our own desk','Leave it to the cleaners','Drop litter in the yard'],
    answer:'Use the bins provided',
    hint:'Everyone has a role in keeping shared spaces clean.',
    explanation:'We can keep school clean by <b>using bins, cleaning up after ourselves and reporting hazards</b> like broken glass or spills to teachers.' }),

  makeTF({ id:'g3he-hyg-026', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'Clean drains help prevent flooding and reduce mosquito breeding.',
    answer:true,
    explanation:'<b>True.</b> Blocked drains collect stagnant water — a breeding ground for mosquitoes — and cause flooding during heavy rain.' }),

  makeMCQ({ id:'g3he-hyg-027', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'What should we do with food scraps to prevent attracting rats and cockroaches?',
    options:['Put them in covered bins','Leave them on the ground','Throw them in the drain','Leave them on the counter'],
    answer:'Put them in covered bins',
    hint:'Open food attracts pests.',
    explanation:'Food scraps should go in <b>covered bins</b>. Open food attracts rats, cockroaches and flies which spread diseases.' }),

  makeTF({ id:'g3he-hyg-028', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'Washing hands at a community water point is important even if the tap looks clean.',
    answer:true,
    explanation:'<b>True.</b> Shared taps can carry germs from many people. Washing hands properly is always important regardless of how clean the tap looks.' }),

  makeMCQ({ id:'g3he-hyg-029', chapterId:'g3he-hygiene', difficulty:2, subsection:'community_hygiene',
    question:'Which of these activities MOST helps to improve community health?',
    options:['Community clean-up days','Building more shops','Painting the roads','Planting street flowers'],
    answer:'Community clean-up days',
    hint:'Think about what makes a community environment healthier.',
    explanation:'<b>Community clean-up campaigns, proper waste disposal and access to clean water</b> directly reduce disease transmission and improve public health.' }),

  makeTF({ id:'g3he-hyg-030', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'Each person has a responsibility to keep their community clean and healthy.',
    answer:true,
    explanation:'<b>True.</b> Community health is everyone\'s responsibility. Individual actions — proper waste disposal, not littering, keeping drains clear — protect the whole community.' })

);

})();
