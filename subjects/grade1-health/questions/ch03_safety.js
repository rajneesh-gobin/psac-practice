'use strict';
(function () {

// Grade 1 Health Education — Keeping Safe
// IDs: g1he-saf-001 onwards
// Subsections: school_safety, home_safety, environment

STATIC_QUESTIONS.push(

  // ── school_safety (001–030) ───────────────────────────────────────────────

  makeMCQ({ id:'g1he-saf-001', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'Why should we NOT run in the school corridors?',
    options:['We might fall and hurt ourselves or others','Running makes us faster','The teacher likes it','It saves time'],
    answer:'We might fall and hurt ourselves or others',
    hint:'Think about what can happen when people run in a narrow space.',
    explanation:'Running in corridors is dangerous — we might <b>fall and hurt ourselves or others</b>. We should always walk.' }),

  makeTF({ id:'g1he-saf-002', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'We should walk, not run, in the school corridors.',
    answer:true,
    explanation:'<b>True.</b> Walking in corridors keeps everyone safe from falls and accidents.' }),

  makeMCQ({ id:'g1he-saf-003', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'What should you do if you see a wet floor at school?',
    options:['Walk around it carefully and tell a teacher','Run across it quickly','Jump over it','Ignore it and walk through'],
    answer:'Walk around it carefully and tell a teacher',
    hint:'Wet floors are slippery.',
    explanation:'Wet floors are slippery and dangerous. You should <b>walk around carefully</b> and <b>tell a teacher</b> so it can be cleaned.' }),

  makeMCQ({ id:'g1he-saf-004', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'Is it safe to push your classmates on the stairs?',
    options:['No — they could fall and get hurt','Yes — it is fun','Yes — if they are bigger than you','No — only if the teacher is watching'],
    answer:'No — they could fall and get hurt',
    hint:'Stairs are dangerous places to push.',
    explanation:'<b>No</b> — pushing on stairs is very dangerous. Someone could fall and be seriously hurt.' }),

  makeTF({ id:'g1he-saf-005', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'We should use playground equipment carefully and take turns.',
    answer:true,
    explanation:'<b>True.</b> Using equipment carefully and taking turns prevents accidents and is fair to everyone.' }),

  makeMCQ({ id:'g1he-saf-006', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'What should you do if you fall and hurt yourself at school?',
    options:['Tell a teacher straight away','Say nothing and hide it','Try to fix it yourself only','Cry and go home alone'],
    answer:'Tell a teacher straight away',
    hint:'Adults at school are there to help us.',
    explanation:'Always <b>tell a teacher straight away</b> when you are hurt. Teachers can get you the help you need.' }),

  makeMCQ({ id:'g1he-saf-007', chapterId:'g1he-safety', difficulty:2, subsection:'school_safety',
    question:'Sam wants to climb on the school fence. Should he?',
    options:['No — fences are not for climbing and he could fall','Yes — it is good exercise','Yes — if his friend holds him','Yes — if the gate is open'],
    answer:'No — fences are not for climbing and he could fall',
    hint:'Think about whether the fence is a safe structure to climb.',
    explanation:'<b>No</b> — school fences are not safe to climb. Sam could fall and seriously injure himself.' }),

  makeTF({ id:'g1he-saf-008', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'We should only use scissors and other sharp objects when a teacher is watching.',
    answer:true,
    explanation:'<b>True.</b> Sharp objects like scissors can cause injuries. Always use them carefully with adult supervision.' }),

  makeMCQ({ id:'g1he-saf-009', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'What should you do with rubbish at school?',
    options:['Put it in the bin','Drop it on the floor','Throw it at your classmates','Leave it on your desk'],
    answer:'Put it in the bin',
    hint:'Keeping the school clean makes it safer and healthier.',
    explanation:'Always put rubbish <b>in the bin</b>. This keeps the school clean and prevents slipping on litter.' }),

  makeMCQ({ id:'g1he-saf-010', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'Why is it important to hold the handrail when going up or down stairs?',
    options:['To prevent falling','To go faster','To show off','Because it is pretty'],
    answer:'To prevent falling',
    hint:'Handrails are there to keep us safe.',
    explanation:'Holding the <b>handrail</b> on stairs prevents us from falling if we slip. Always use it.' }),

  makeMCQ({ id:'g1he-saf-011', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'During break time, where should you play?',
    options:['In the designated playground area','On the road outside school','On the roof','In the kitchen'],
    answer:'In the designated playground area',
    hint:'The school playground is designed to be safe.',
    explanation:'Children should play in the <b>designated playground area</b> during break time. This is the safe space provided.' }),

  makeTF({ id:'g1he-saf-012', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'Fighting with classmates can hurt them and yourself.',
    answer:true,
    explanation:'<b>True.</b> Fighting is dangerous and can cause injuries. We should talk and ask a teacher for help when there is a problem.' }),

  makeMCQ({ id:'g1he-saf-013', chapterId:'g1he-safety', difficulty:2, subsection:'school_safety',
    question:'You see a sharp object on the classroom floor. What should you do?',
    options:['Tell the teacher so it can be removed safely','Pick it up with your bare hands','Leave it where it is','Step on it'],
    answer:'Tell the teacher so it can be removed safely',
    hint:'Sharp objects need to be handled carefully by an adult.',
    explanation:'<b>Tell the teacher</b> about the sharp object. Never pick it up with bare hands — a teacher can remove it safely.' }),

  makeTF({ id:'g1he-saf-014', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'We should look both ways before crossing any road near school.',
    answer:true,
    explanation:'<b>True.</b> Always look both ways before crossing a road to check for vehicles.' }),

  makeMCQ({ id:'g1he-saf-015', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'What should you do if a stranger tries to talk to you at school?',
    options:['Stay away and tell a teacher immediately','Go with them if they seem kind','Give them your name and address','Give them your school bag'],
    answer:'Stay away and tell a teacher immediately',
    hint:'Never go with or talk to strangers.',
    explanation:'<b>Stay away</b> from strangers and <b>tell a teacher immediately</b>. Never go with someone you do not know, even if they seem friendly.' }),

  // ── home_safety (016–040) ─────────────────────────────────────────────────

  makeMCQ({ id:'g1he-saf-016', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'Why should you stay away from the kitchen stove?',
    options:['It is very hot and can burn you','It makes loud noises','It is only for adults to look at','It is always dirty'],
    answer:'It is very hot and can burn you',
    hint:'Think about what happens when we touch something very hot.',
    explanation:'The stove is <b>very hot</b> and can cause serious burns. Young children should never touch or go near it.' }),

  makeTF({ id:'g1he-saf-017', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'We should never touch electrical sockets with our fingers.',
    answer:true,
    explanation:'<b>True.</b> Electrical sockets carry electricity that can cause serious shock or injury. Never touch them.' }),

  makeMCQ({ id:'g1he-saf-018', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'What should you do if you find medicines at home?',
    options:['Tell an adult and do not touch them','Try them to see what they taste like','Share them with friends','Take them without telling anyone'],
    answer:'Tell an adult and do not touch them',
    hint:'Medicines are only safe when given by a doctor or parent.',
    explanation:'<b>Tell an adult</b> if you find medicines and do not touch them. Medicines can be dangerous for children.' }),

  makeMCQ({ id:'g1he-saf-019', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'Is it safe to play with electrical wires at home?',
    options:['No — they can give you an electric shock','Yes — if they are colourful','Yes — if they are on the floor','No — only if they are plugged in'],
    answer:'No — they can give you an electric shock',
    hint:'Electricity in wires is very dangerous.',
    explanation:'<b>No</b> — electrical wires carry electricity that can cause a dangerous shock. Never play with them.' }),

  makeTF({ id:'g1he-saf-020', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'Cleaning products (like bleach) under the sink are safe for children to touch.',
    answer:false,
    explanation:'<b>False.</b> Cleaning products like bleach are <b>dangerous chemicals</b>. Children should never touch or open them.' }),

  makeMCQ({ id:'g1he-saf-021', chapterId:'g1he-safety', difficulty:2, subsection:'home_safety',
    question:'Priya wants to climb out of an upstairs window to get her ball. Should she?',
    options:['No — she could fall and be seriously hurt','Yes — if she is careful','Yes — if a friend holds her feet','Yes — windows are safe to climb through'],
    answer:'No — she could fall and be seriously hurt',
    hint:'Think about how high an upstairs window is.',
    explanation:'<b>No</b> — climbing out of an upstairs window is very dangerous. She should ask an adult for help instead.' }),

  makeMCQ({ id:'g1he-saf-022', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'What should you do if there is a fire at home?',
    options:['Get out of the house and call for an adult','Try to put the fire out yourself','Hide under the bed','Stay and watch the fire'],
    answer:'Get out of the house and call for an adult',
    hint:'Safety first — get away from fire.',
    explanation:'If there is a fire, <b>get out of the house immediately</b> and call for an adult or emergency services. Never hide inside.' }),

  makeTF({ id:'g1he-saf-023', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'We should never leave a tap running when we leave the bathroom.',
    answer:true,
    explanation:'<b>True.</b> Leaving taps running wastes water and can cause flooding.' }),

  makeMCQ({ id:'g1he-saf-024', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'Should you go near the cooking pot on the stove?',
    options:['No — it is hot and dangerous for children','Yes — to stir the food','Yes — to check if it is ready','Yes — if mum says it is fine to look'],
    answer:'No — it is hot and dangerous for children',
    hint:'Hot pots can cause serious burns.',
    explanation:'Children should <b>not go near</b> cooking pots. They are very hot and can cause bad burns.' }),

  makeTF({ id:'g1he-saf-025', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'It is safe to put metal objects into an electrical socket.',
    answer:false,
    explanation:'<b>False.</b> Never put any object into an electrical socket. It can cause a very dangerous electric shock.' }),

  // ── environment (026–045) ─────────────────────────────────────────────────

  makeMCQ({ id:'g1he-saf-026', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'Which of these is a danger in the school environment?',
    options:['A broken fence with sharp edges','A well-painted classroom wall','A clean playground','A happy teacher'],
    answer:'A broken fence with sharp edges',
    hint:'Think about what could cause an injury.',
    explanation:'A <b>broken fence with sharp edges</b> is dangerous — it can cut or injure children playing nearby.' }),

  makeTF({ id:'g1he-saf-027', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'We should always tell an adult when we see something dangerous.',
    answer:true,
    explanation:'<b>True.</b> Telling an adult about dangers helps keep everyone safe.' }),

  makeMCQ({ id:'g1he-saf-028', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'What should you do if you see a stray dog near your school?',
    options:['Stay calm, do not approach it, and tell a teacher','Run towards it to pet it','Try to feed it your lunch','Throw things at it'],
    answer:'Stay calm, do not approach it, and tell a teacher',
    hint:'Stray animals can be unpredictable.',
    explanation:'Stay calm, <b>do not approach</b> the dog, and <b>tell a teacher</b>. Stray animals can bite if startled.' }),

  makeMCQ({ id:'g1he-saf-029', chapterId:'g1he-safety', difficulty:2, subsection:'environment',
    question:'You see a bottle of liquid with a skull and crossbones symbol. What does this mean?',
    options:['It is poisonous — do not touch it','It is a fun drink','It is water','It is for children only'],
    answer:'It is poisonous — do not touch it',
    hint:'The skull and crossbones is a universal warning symbol.',
    explanation:'A <b>skull and crossbones</b> means the substance is <b>poisonous</b>. Never touch or open it — tell an adult immediately.' }),

  makeTF({ id:'g1he-saf-030', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'We should play near the road to watch the cars.',
    answer:false,
    explanation:'<b>False.</b> Playing near the road is very dangerous. Cars move fast and drivers may not see children.' }),

  makeMCQ({ id:'g1he-saf-031', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'Why should we not pick up unknown objects from the ground?',
    options:['They could be sharp, dirty or dangerous','They might belong to a teacher','They are always broken','They might be very heavy'],
    answer:'They could be sharp, dirty or dangerous',
    hint:'We cannot always see if something is safe.',
    explanation:'Unknown objects could be <b>sharp, dirty or dangerous</b>. Always show them to an adult instead of picking them up.' }),

  makeMCQ({ id:'g1he-saf-032', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'Where is the safest place to cross the road?',
    options:['At a pedestrian crossing (zebra crossing)','Anywhere that looks quiet','Between parked cars','While running quickly'],
    answer:'At a pedestrian crossing (zebra crossing)',
    hint:'Pedestrian crossings are designed for people to cross safely.',
    explanation:'Always cross at a <b>pedestrian crossing (zebra crossing)</b> where drivers expect people to cross.' }),

  makeTF({ id:'g1he-saf-033', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'We should stop, look left, look right, and look left again before crossing the road.',
    answer:true,
    explanation:'<b>True.</b> Always stop and look both ways before crossing a road to check for vehicles.' }),

  makeMCQ({ id:'g1he-saf-034', chapterId:'g1he-safety', difficulty:2, subsection:'environment',
    question:'Ravi sees a puddle near an electrical pole after heavy rain. He wants to play in it. Should he?',
    options:['No — the water near electrical equipment can be dangerous','Yes — puddles are always safe','Yes — if the water is clean','No — only if it is very deep'],
    answer:'No — the water near electrical equipment can be dangerous',
    hint:'Water and electricity are a dangerous combination.',
    explanation:'<b>No</b> — water near electrical poles or cables can carry electricity. This is extremely dangerous. Stay away and tell an adult.' }),

  makeTF({ id:'g1he-saf-035', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'Keeping our school environment clean and tidy helps to prevent accidents.',
    answer:true,
    explanation:'<b>True.</b> A clean, tidy environment has fewer hazards. Litter on the floor can cause slipping; clutter can cause tripping.' }),

  makeMCQ({ id:'g1he-saf-036', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'What should you do in an emergency at school?',
    options:['Stay calm and tell a teacher immediately','Run out of the school alone','Hide in the bathroom','Shout and make everyone panic'],
    answer:'Stay calm and tell a teacher immediately',
    hint:'Teachers are trained to help in emergencies.',
    explanation:'In an emergency, <b>stay calm</b> and <b>tell a teacher immediately</b>. They know what to do to keep everyone safe.' })

);

})();
