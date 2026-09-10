'use strict';
(function () {

// Grade 1 Health — additional questions for home_safety and environment
// Brings home_safety from 15 to 20, environment from 15 to 20.

STATIC_QUESTIONS.push(

  // ── home_safety (047–051) ─────────────────────────────────────────────────

  makeMCQ({ id:'g1he-saf-051', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'If you spill water on the floor, what should you do?',
    options:['Wipe it up at once','Leave it for someone','Just walk around it','Tell a friend only'],
    answer:'Wipe it up at once',
    explanation:'Wet floors cause people to <b>slip and fall</b>. Cleaning it up right away keeps everyone safe.' }),

  makeTF({ id:'g1he-saf-052', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'We should always go outside or upstairs if there is a fire at home.',
    answer:true,
    explanation:'<b>True.</b> In a fire, get out of the building immediately. Do not hide indoors. Go to a safe meeting place and call for help.' }),

  makeMCQ({ id:'g1he-saf-053', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'If you see a dangerous dog loose in the street, what should you do?',
    options:['Walk away slowly','Run towards it','Wave and shout','Try to pet it'],
    answer:'Walk away slowly',
    explanation:'Running makes dogs chase. <b>Stand still or back away slowly and calmly</b> to avoid provoking the dog.' }),

  makeTF({ id:'g1he-saf-054', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'It is safe to use electrical appliances with wet hands.',
    answer:false,
    explanation:'<b>False.</b> Water conducts electricity. Using electrical appliances with wet hands can cause a dangerous electric shock.' }),

  makeMCQ({ id:'g1he-saf-055', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'You should learn your home address because:',
    options:['It helps if you get lost','It looks nice on a card','Your teacher asks for it','Everyone knows it anyway'],
    answer:'It helps if you get lost',
    explanation:'Knowing your address means you can <b>tell a trusted adult or emergency services where to find your home</b> if you are lost or in trouble.' }),

  // ── environment (052–056) ─────────────────────────────────────────────────

  makeMCQ({ id:'g1he-saf-056', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'What should you do if you find a strange or unmarked bottle at home?',
    options:['Tell an adult at once','Open it and smell it','Drink a little of it','Share it with friends'],
    answer:'Tell an adult at once',
    explanation:'Unknown liquids could be <b>poisonous or dangerous chemicals</b>. Always tell an adult right away and do not touch it.' }),

  makeTF({ id:'g1he-saf-057', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'It is safe to play near building works or construction sites.',
    answer:false,
    explanation:'<b>False.</b> Construction sites have falling objects, deep holes and heavy machinery. They are very dangerous places for children to play near.' }),

  makeMCQ({ id:'g1he-saf-058', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'Why should we not go near or play with stray animals?',
    options:['They may bite us','They are always kind','They want to play','They are never scared'],
    answer:'They may bite us',
    explanation:'Stray animals can carry <b>diseases like rabies</b> and may bite if frightened. Always keep a safe distance and tell an adult.' }),

  makeTF({ id:'g1he-saf-059', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'We should look both ways before crossing any road, even a quiet street.',
    answer:true,
    explanation:'<b>True.</b> Cars can come from either direction. Always look right, then left, then right again before crossing — even on a quiet street.' }),

  makeMCQ({ id:'g1he-saf-060', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'What is the safest thing to do in a thunderstorm?',
    options:['Stay inside the house','Stand under a tall tree','Stand on a hill to watch','Hold a metal umbrella'],
    answer:'Stay inside the house',
    explanation:'In a thunderstorm, <b>go indoors</b>. Trees and metal objects attract lightning. Stay away from windows and electrical items until the storm passes.' })

);

})();
