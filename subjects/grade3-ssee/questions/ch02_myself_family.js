'use strict';
(function () {

// Grade 3 SSEE — Unit 2: Myself and My Family
// Source: MIE SSEE Grade 3 Part 1 pp.27-63
// IDs: g3ssee-fam-001 onwards

// ── myself (001-025) ──────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3ssee-fam-001', chapterId:'g3ssee-family', difficulty:1, subsection:'myself',
    question:'Which of the following is a PERSONAL DETAIL that helps identify who you are?',
    options:['Your name','The weather','The bus fare','The shop name'],
    answer:'Your name',
    hint:'Personal details are things that describe YOU.',
    explanation:'Your <b>name</b> is a personal detail — it identifies you. Your age, address and school name are personal details too. The weather, a bus fare and a shop name describe the world, not you.'}),

  makeMCQ({ id:'g3ssee-fam-002', chapterId:'g3ssee-family', difficulty:1, subsection:'myself',
    question:'What do we call the place where a person lives?',
    options:['Address','Name','Age','School'],
    answer:'Address',
    hint:'This tells people WHERE you live.',
    explanation:'An <b>address</b> tells others where a person lives — for example, 5 Rue de la Paix, Curepipe, Mauritius.' }),

  makeTF({ id:'g3ssee-fam-003', chapterId:'g3ssee-family', difficulty:1, subsection:'myself',
    question:'Two people can have the same name but different addresses.',
    answer:true,
    explanation:'Yes! Many people can share the same name, but every person has a <b>unique address</b> where they live.' }),

  makeMCQ({ id:'g3ssee-fam-004', chapterId:'g3ssee-family', difficulty:2, subsection:'myself',
    question:'Which of the following is NOT a personal detail?',
    options:['The price of sugar','Your date of birth','Your school name','Your home address'],
    answer:'The price of sugar',
    explanation:'The price of sugar is a <b>fact about a product</b>, not about a person. Personal details relate directly to an individual.' }),

  makeMCQ({ id:'g3ssee-fam-005', chapterId:'g3ssee-family', difficulty:1, subsection:'myself',
    question:'A person\'s date of birth tells us their ___.',
    options:['age','name','town','class'],
    answer:'age',
    hint:'You can calculate how old someone is from their date of birth.',
    explanation:'A person\'s date of birth tells us their <b>age</b> and when they were born — for example, 15 June 2017. It says nothing about their name, their town or their class.'}),

  makeMCQ({ id:'g3ssee-fam-006', chapterId:'g3ssee-family', difficulty:2, subsection:'myself',
    question:'Why is it important to know your home address?',
    options:['So that people can find your house','So that you get more homework','So that you can tell the weather','So that you can buy food cheaply'],
    answer:'So that people can find your house',
    explanation:'Knowing your home address matters for <b>safety</b> — your parents, a neighbour or the emergency services need it to find where you live. It has nothing to do with homework, the weather or the price of food.'}),

  makeMCQ({ id:'g3ssee-fam-007', chapterId:'g3ssee-family', difficulty:1, subsection:'myself',
    question:'Alisha is 8 years old and lives in Quatre Bornes. What is Quatre Bornes in relation to her?',
    options:['Her locality','Her age group','Her first name','Her school'],
    answer:'Her locality',
    explanation:'Quatre Bornes is the town (<b>locality</b>) where Alisha lives — part of her home address. It is not her age, her name or her school.'}),

  makeMCQ({ id:'g3ssee-fam-008', chapterId:'g3ssee-family', difficulty:2, subsection:'myself',
    question:'Which TWO of these are personal details?',
    options:['Name and age','Rice and roads','Rain and wind','Trees and sand'],
    answer:'Name and age',
    explanation:'A person\'s <b>name</b> and <b>age</b> are personal details that identify them. Rice, roads, rain, wind, trees and sand are general things in the world, not details about a person.'}),

  makeTF({ id:'g3ssee-fam-009', chapterId:'g3ssee-family', difficulty:1, subsection:'myself',
    question:'It is safe to share your home address with any stranger.',
    answer:false,
    explanation:'You should <b>not</b> share personal details such as your home address with strangers. Only give personal details to trusted adults.' }),

  makeMCQ({ id:'g3ssee-fam-010', chapterId:'g3ssee-family', difficulty:1, subsection:'myself',
    question:'Which of the following is a PHYSICAL characteristic?',
    options:['Height','Name','Address','School'],
    answer:'Height',
    hint:'Physical characteristics describe the body.',
    explanation:'<b>Height</b> is a physical characteristic — it describes a measurable feature of the body. Other examples are eye colour and hair colour.' }),

  makeMCQ({ id:'g3ssee-fam-011', chapterId:'g3ssee-family', difficulty:2, subsection:'myself',
    question:'Sam is kind, honest and hardworking. These are examples of his ___.',
    options:['personal qualities','physical features','favourite subjects','home addresses'],
    answer:'personal qualities',
    hint:'These describe Sam\'s character, not his body.',
    explanation:'Kindness, honesty and hard work are <b>personal qualities</b> (character traits) — they describe who Sam is inside, not how he looks, what he studies or where he lives.'}),

  makeMCQ({ id:'g3ssee-fam-012', chapterId:'g3ssee-family', difficulty:1, subsection:'myself',
    question:'Which of the following best describes a PHYSICAL feature of a person?',
    options:['Brown eyes','Honesty','Kindness','Bravery'],
    answer:'Brown eyes',
    explanation:'<b>Brown eyes</b> is a physical feature — it describes how a person looks. Honesty, kindness and bravery are personal qualities (character traits).' }),

  makeMCQ({ id:'g3ssee-fam-013', chapterId:'g3ssee-family', difficulty:2, subsection:'myself',
    question:'Priya is good at drawing and loves to help others. These describe her ___.',
    options:['talents and qualities','looks and body features','school subjects and marks','home address and phone'],
    answer:'talents and qualities',
    explanation:'Being good at drawing is a <b>talent</b>; loving to help others is a <b>personal quality</b>. Together they describe who Priya is — not how she looks, what she studies or where she lives.'}),

  makeTF({ id:'g3ssee-fam-014', chapterId:'g3ssee-family', difficulty:1, subsection:'myself',
    question:'Every person is unique and has their own set of qualities.',
    answer:true,
    explanation:'Yes! Every person is <b>unique</b> — each of us has a different combination of physical features, talents and personal qualities.' }),

  makeMCQ({ id:'g3ssee-fam-015', chapterId:'g3ssee-family', difficulty:2, subsection:'myself',
    question:'Which of the following is a TALENT?',
    options:['Playing the piano','Living in Curepipe','Having brown hair','Being very tall'],
    answer:'Playing the piano',
    hint:'A talent is a skill someone is good at.',
    explanation:'Playing the piano is a <b>talent</b> — a special ability a person has learned and developed. Where you live, your hair colour and your height are not talents.'}),

// ── my_family (016-045) ───────────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-fam-016', chapterId:'g3ssee-family', difficulty:1, subsection:'my_family',
    question:'Who are the members of a NUCLEAR family?',
    options:['Parents and their children','Only a mother and children','Grandparents and cousins','Only a father on his own'],
    answer:'Parents and their children',
    hint:'A nuclear family is the smallest family unit.',
    explanation:'A <b>nuclear</b> family is parents (mother and father) and their children living together. One parent alone with children is a single-parent family, and adding grandparents, uncles, aunts or cousins makes an extended family.'}),

  makeMCQ({ id:'g3ssee-fam-017', chapterId:'g3ssee-family', difficulty:1, subsection:'my_family',
    question:'A family that includes grandparents, uncles, aunts and cousins is called an _____ family.',
    options:['extended','nuclear','single','blended'],
    answer:'extended',
    hint:'This family is larger than just parents and children.',
    explanation:'An <b>extended family</b> includes relatives beyond the nuclear family — grandparents, uncles, aunts and cousins.' }),

  makeTF({ id:'g3ssee-fam-018', chapterId:'g3ssee-family', difficulty:1, subsection:'my_family',
    question:'All families in Mauritius look exactly the same.',
    answer:false,
    explanation:'Families in Mauritius come in many different forms. <b>Every family is unique</b> and may include different members.' }),

  makeMCQ({ id:'g3ssee-fam-019', chapterId:'g3ssee-family', difficulty:1, subsection:'my_family',
    question:'What do we call the child of your uncle or aunt?',
    options:['Cousin','Sibling','Nephew','Grandchild'],
    answer:'Cousin',
    explanation:'The child of your uncle or aunt is your <b>cousin</b>.' }),

  makeMCQ({ id:'g3ssee-fam-020', chapterId:'g3ssee-family', difficulty:1, subsection:'my_family',
    question:'What do we call your father\'s mother?',
    options:['Grandmother','Stepmother','Godmother','Grandfather'],
    answer:'Grandmother',
    explanation:'Your father\'s mother is your <b>grandmother</b> (grand-mère in French). His father would be your grandfather.'}),

  makeMCQ({ id:'g3ssee-fam-021', chapterId:'g3ssee-family', difficulty:2, subsection:'my_family',
    question:'Ravi has a mother, father, sister and grandmother living with him. What type of family does Ravi have?',
    options:['Extended family','Nuclear family','Single-parent family','Blended family'],
    answer:'Extended family',
    hint:'Does the family include relatives beyond just parents and children?',
    explanation:'Because Ravi\'s <b>grandmother</b> also lives with them, the family goes beyond the nuclear unit, making it an <b>extended family</b>.' }),

  makeMCQ({ id:'g3ssee-fam-022', chapterId:'g3ssee-family', difficulty:1, subsection:'my_family',
    question:'What is the name for brothers and sisters?',
    options:['Siblings','Cousins','Uncles','Grandparents'],
    answer:'Siblings',
    explanation:'Brothers and sisters are called <b>siblings</b>.' }),

  makeTF({ id:'g3ssee-fam-023', chapterId:'g3ssee-family', difficulty:1, subsection:'my_family',
    question:'Families in Mauritius can follow different religions, cultures and traditions.',
    answer:true,
    explanation:'Yes! Mauritius is a multicultural country. Families may be Hindu, Muslim, Catholic, Buddhist or follow other traditions — this diversity is celebrated.' }),

  makeMCQ({ id:'g3ssee-fam-024', chapterId:'g3ssee-family', difficulty:2, subsection:'my_family',
    question:'Fatima lives only with her mother. What type of family does she have?',
    options:['Single-parent family','Extended family group','Nuclear family unit','Blended family home'],
    answer:'Single-parent family',
    hint:'Only one parent is present in this household.',
    explanation:'Fatima lives with only one parent, so hers is a <b>single-parent</b> family. A nuclear family has both parents, an extended family adds grandparents, uncles and aunts, and a blended family joins two families together.'}),

  makeMCQ({ id:'g3ssee-fam-025', chapterId:'g3ssee-family', difficulty:1, subsection:'my_family',
    question:'Which celebration brings many families together in Mauritius?',
    options:['Diwali','A bus queue','A school test','A traffic jam'],
    answer:'Diwali',
    hint:'This is a Hindu festival of lights.',
    explanation:'Diwali — like Eid, Christmas and Chinese New Year — brings Mauritian families together to celebrate their traditions. A bus queue, a school test and a traffic jam are not celebrations.'}),

  makeMCQ({ id:'g3ssee-fam-026', chapterId:'g3ssee-family', difficulty:1, subsection:'my_family',
    question:'What do we call the parents of your parents?',
    options:['Grandparents','Uncles and aunts','Older cousins','Little siblings'],
    answer:'Grandparents',
    explanation:'Your parents\' parents are your <b>grandparents</b> — grandmother and grandfather. Uncles, aunts, cousins and siblings are other relatives.'}),

  makeMCQ({ id:'g3ssee-fam-027', chapterId:'g3ssee-family', difficulty:2, subsection:'my_family',
    question:'A family tree shows ___.',
    options:['How family members are related','Which subjects a child studies','Which trees grow in a garden','What food costs in the market'],
    answer:'How family members are related',
    hint:'A family tree is a diagram that maps family relationships.',
    explanation:'A <b>family tree</b> is a diagram showing family members across the generations and how each one is related to the others.'}),

  makeMCQ({ id:'g3ssee-fam-028', chapterId:'g3ssee-family', difficulty:1, subsection:'my_family',
    question:'What do we call the brother or sister of your parent?',
    options:['Uncle or aunt','Cousin','Sibling','Grandparent'],
    answer:'Uncle or aunt',
    explanation:'Your parent\'s brother is your <b>uncle</b>; your parent\'s sister is your <b>aunt</b>.' }),

  makeTF({ id:'g3ssee-fam-029', chapterId:'g3ssee-family', difficulty:1, subsection:'my_family',
    question:'Grandparents are part of the extended family.',
    answer:true,
    explanation:'Yes! <b>Grandparents</b> are part of the extended family — the larger family group that goes beyond just parents and children.' }),

  makeMCQ({ id:'g3ssee-fam-030', chapterId:'g3ssee-family', difficulty:2, subsection:'my_family',
    question:'In Mauritius, families often celebrate Eid, Diwali, Christmas and Chinese New Year. What does this tell us?',
    options:['Mauritius is a multicultural country','Every Mauritian follows one religion','Celebrations are only for children','Mauritius has just one culture'],
    answer:'Mauritius is a multicultural country',
    explanation:'Celebrating festivals from several religions shows that Mauritius is a <b>multicultural</b> country — people of many different backgrounds live side by side.'}),

// ── family_roles (031-075) ────────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-fam-031', chapterId:'g3ssee-family', difficulty:1, subsection:'family_roles',
    question:'Which of the following is a typical role of a MOTHER in the family?',
    options:['Caring for the children','Driving buses in town','Flying planes to India','Building the town roads'],
    answer:'Caring for the children',
    hint:'Think about what a mother does at home.',
    explanation:'A mother often <b>cares for the children</b> — meals, school and well-being. Driving buses, flying planes and building roads are jobs outside the home, not family roles. (Mothers can of course hold any of those jobs as well.)'}),

  makeMCQ({ id:'g3ssee-fam-032', chapterId:'g3ssee-family', difficulty:1, subsection:'family_roles',
    question:'What is a common role of CHILDREN in the family?',
    options:['To study and help at home','To pay the family bills','To work in a factory','To drive the family car'],
    answer:'To study and help at home',
    hint:'Children\'s main job at home is school and helping out.',
    explanation:'A child\'s roles are to <b>study hard</b> and to help with tasks they are old enough to do, such as tidying their room. Paying bills, working and driving are adult responsibilities.'}),

  makeTF({ id:'g3ssee-fam-033', chapterId:'g3ssee-family', difficulty:1, subsection:'family_roles',
    question:'In a family, every member has a role to play.',
    answer:true,
    explanation:'Yes! In a healthy family, every member — parents, grandparents and children — has a <b>role</b> to play and contributes to the family\'s well-being.' }),

  makeMCQ({ id:'g3ssee-fam-034', chapterId:'g3ssee-family', difficulty:2, subsection:'family_roles',
    question:'Which VALUE helps a family to live in harmony?',
    options:['Respect','Selfishness','Laziness','Dishonesty'],
    answer:'Respect',
    hint:'A positive value keeps the family happy and united.',
    explanation:'<b>Respect</b> — treating each family member with kindness and consideration — is a key value that helps families live in harmony.' }),

  makeMCQ({ id:'g3ssee-fam-035', chapterId:'g3ssee-family', difficulty:1, subsection:'family_roles',
    question:'Ali always helps his grandmother carry her shopping bags. Which value is he showing?',
    options:['Caring','Greed','Laziness','Rudeness'],
    answer:'Caring',
    hint:'He is helping an older family member.',
    explanation:'By helping his grandmother, Ali is showing the value of <b>caring</b> — looking out for and helping family members who need assistance.' }),

  makeMCQ({ id:'g3ssee-fam-036', chapterId:'g3ssee-family', difficulty:2, subsection:'family_roles',
    question:'When siblings share their toys without arguing, they are showing the value of ___.',
    options:['sharing and cooperation','greed and selfishness','lying and dishonesty','rudeness and disrespect'],
    answer:'sharing and cooperation',
    hint:'They are doing something positive together.',
    explanation:'Sharing toys and playing together shows the values of <b>sharing and cooperation</b>, which keep a family happy. Selfishness, dishonesty and disrespect are the opposite.'}),

  makeMCQ({ id:'g3ssee-fam-037', chapterId:'g3ssee-family', difficulty:1, subsection:'family_roles',
    question:'What is the role of a GRANDPARENT in many Mauritian families?',
    options:['Sharing stories and traditions','Building the family houses','Setting the school timetable','Driving the school bus daily'],
    answer:'Sharing stories and traditions',
    explanation:'Grandparents often share <b>wisdom, stories and cultural traditions</b> with their grandchildren. Building houses, setting timetables and driving buses are jobs, not the family role of a grandparent.'}),

  makeTF({ id:'g3ssee-fam-038', chapterId:'g3ssee-family', difficulty:1, subsection:'family_roles',
    question:'Only mothers can cook and clean in a family.',
    answer:false,
    explanation:'<b>Any family member</b> can cook, clean and do household tasks. Sharing responsibilities fairly makes the family stronger.' }),

  makeMCQ({ id:'g3ssee-fam-039', chapterId:'g3ssee-family', difficulty:2, subsection:'family_roles',
    question:'Priya tells the truth when she breaks a vase by accident. Which value is she showing?',
    options:['Honesty','Greed','Laziness','Unfairness'],
    answer:'Honesty',
    explanation:'By telling the truth, Priya is showing <b>honesty</b> — an important family value that builds trust.' }),

  makeMCQ({ id:'g3ssee-fam-040', chapterId:'g3ssee-family', difficulty:1, subsection:'family_roles',
    question:'Which of the following is an example of COOPERATION in a family?',
    options:['Everyone helping to clean the house','Arguing about who washes the dishes','One person doing all of the work','Refusing to help when you are asked'],
    answer:'Everyone helping to clean the house',
    hint:'Cooperation means working together.',
    explanation:'<b>Cooperation</b> means working together. When everyone helps to clean, the job is done faster and the whole family benefits. Arguing, refusing, or leaving one person to do everything is the opposite.'}),

  makeMCQ({ id:'g3ssee-fam-041', chapterId:'g3ssee-family', difficulty:2, subsection:'family_roles',
    question:'Why is it important for families to eat meals together?',
    options:['It strengthens family bonds','It makes the food cook faster','It saves money at the shop','It reduces the food needed'],
    answer:'It strengthens family bonds',
    explanation:'Eating together <b>strengthens family bonds</b> — members talk, share their day and support each other. It does not change how fast food cooks, how much it costs or how much is needed.'}),

  makeMCQ({ id:'g3ssee-fam-042', chapterId:'g3ssee-family', difficulty:1, subsection:'family_roles',
    question:'How can a child help at home?',
    options:['By tidying their room','By making a big mess','By skipping their homework','By sleeping all day long'],
    answer:'By tidying their room',
    explanation:'A child can help at home by <b>tidying their room</b> and doing other jobs they are old enough for. Making a mess, skipping homework and sleeping all day help nobody.'}),

  makeTF({ id:'g3ssee-fam-043', chapterId:'g3ssee-family', difficulty:1, subsection:'family_roles',
    question:'Families should help and support each other in difficult times.',
    answer:true,
    explanation:'Yes! <b>Supporting each other</b> in difficult times — such as illness or problems — is one of the most important functions of a family.' }),

  makeMCQ({ id:'g3ssee-fam-044', chapterId:'g3ssee-family', difficulty:2, subsection:'family_roles',
    question:'Sam refuses to share his snacks with his sister at home. Which value is Sam LACKING?',
    options:['Generosity and sharing','Patience and calmness','Honesty and truthfulness','Courage and bravery'],
    answer:'Generosity and sharing',
    explanation:'By refusing to share his snacks, Sam is short of <b>generosity and sharing</b>. He is not being impatient, dishonest or cowardly — those are different values.'}),

  makeMCQ({ id:'g3ssee-fam-045', chapterId:'g3ssee-family', difficulty:3, subsection:'family_roles',
    question:'Which statement BEST explains why family values are important?',
    options:['They help the family live in harmony','They give everyone the same job','They let children stay away from school','They make the family much richer'],
    answer:'They help the family live in harmony',
    hint:'Values shape how people behave towards each other.',
    explanation:'Family values such as respect, love, honesty and cooperation guide how members treat each other, so the family lives together in <b>peace and harmony</b>. They do not decide jobs, wealth or schooling.'})

);

})();
