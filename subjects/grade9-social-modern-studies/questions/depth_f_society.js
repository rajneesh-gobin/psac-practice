'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Social & Modern Studies — DEPTH BATCH F
//  Chapters: g9sms-family (weight 3) and g9sms-social-change (weight 2).
//  IDs: g9sms-dpf-001 … g9sms-dpf-119. This block is reserved for this batch
//  alone — six other batches are writing other chapters of this same pack at
//  the same time and the importer keys on the id, so a collision would be
//  silent and would overwrite somebody else's question.
//
//  ⚠ WHY THIS FILE EXISTS. Measured 2026-09-19 from source: g9sms-family held
//    21 items with ONE at difficulty 4, and g9sms-social-change held 20 with
//    NONE. getQuestionsForChapter() runs no generator for difficulty 4, so a
//    chapter's static L4 stock IS the ceiling — Challenge in either chapter
//    fell through to the mixed-practice fallback. Both chapters finish this
//    batch at 20 or more applied items, and all eight declared subsections
//    reach the 20-item floor.
//
//  ⚠ L4 HERE IS THE APPLIED BAND, NOT HARDER RECALL. Every L4 below is a
//    short scenario the pupil has to reason about — classify it, trace its
//    consequence, or weigh two defensible readings. A question answerable by
//    recognising a definition is L1 or L2 however long its wording. An audit
//    of this pack had already had to relabel 34 items for exactly that.
//
//  ⚠ SENSITIVITY. These two chapters are about real families and the pupils
//    reading them. Family types are described, never ranked: a single-parent,
//    reconstituted or extended household is a type, not a deficiency, and no
//    item makes a pupil's own family shape the wrong answer. Gender roles and
//    women at work are taught as CHANGE — what shifted, what enabled it, what
//    is still uneven — and no item offers a stereotype as the correct answer.
//    Deviance is kept to queue-jumping, lateness, litter and late-night noise;
//    there is no crime detail anywhere in the file, and no living person is
//    named.
//
//  ⚠ NO INVENTED STATISTICS. The only figures in this file are the two
//    hypothetical class/council surveys the pupil is asked to read off, and
//    both say so in the stem. The 1977 free-secondary-education fact is
//    already carried by this pack's existing bank.
//
//  ⚠ OPTIONS KEPT TO ONE SHAPE AND LENGTH. The careful answer to an applied
//    question wants to be the longest thing on screen; that is the leak
//    test-option-parity.js measures. Lengthen a distractor, never trim the
//    answer. Hints name what to weigh and never the answer.
//
//  Source: NCF Grades 7-9 (MIE), civics / modern studies strand;
//  docs/nce-grade9/blueprint-social-modern-studies.md §5 and §8.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// ══ FAMILY & SOCIAL ROLES ═════════════════════════════════════════════════

// ── family_types — g9sms-dpf-001 … 010 ────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-001', chapterId:'g9sms-family', subsection:'family_types', difficulty:1,
  question:'Which word describes everybody who lives together in one dwelling, whether or not they are related to each other?',
  options:['A household, counted by who sleeps under the roof',
           'A kinship, counted by who shares a grandparent',
           'A lineage, counted by who descends from one man',
           'A marriage, counted by who signed the register'],
  answer:'A household, counted by who sleeps under the roof',
  hint:'One of these four words is about the building, not about blood or marriage.',
  explanation:'A <b>household</b> is a residence group: everybody living at one address. A family is a relationship group. Two lodgers sharing a flat are a household and not a family, and a son working in Australia is family but not part of the household.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpf-002', chapterId:'g9sms-family', subsection:'family_types', difficulty:1,
  question:'A family made up of a couple and their dependent children only, with no other relatives sharing the home, is called a ______ family. Write the missing word.',
  answer:'nuclear',
  alsoAccept:['nuclear family'],
  hint:'The word comes from the idea of a small centre or core.',
  explanation:'A <b>nuclear</b> family is the two-generation core: parents and their own dependent children. Add a third generation or a side branch living in the same home and it becomes an extended family instead.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-003', chapterId:'g9sms-family', subsection:'family_types', difficulty:2,
  question:'Two sisters, their husbands and their children live in three small houses built on one family plot in Triolet, and eat together most evenings. Which description fits best?',
  options:['An extended family spread over more than one household',
           'A nuclear family that happens to own a rather large plot',
           'A reconstituted family formed after an earlier marriage',
           'A single-parent family supported by the wider relatives'],
  answer:'An extended family spread over more than one household',
  hint:'Count the relationships first, then count the roofs. They do not have to give the same answer.',
  explanation:'Extended family means relatives beyond the nuclear core who live together or in close daily contact — here, three households on one plot sharing meals. It is not reconstituted, because no earlier union has been joined to a new one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-004', chapterId:'g9sms-family', subsection:'family_types', difficulty:2,
  question:'What is the main difference between a <b>household</b> and a <b>family</b>?',
  options:['A household is defined by living together, a family by relationship',
           'A household is defined by income level, a family by its own size',
           'A household is defined by the district, a family by its religion',
           'A household is defined by ownership, a family by rented tenancy'],
  answer:'A household is defined by living together, a family by relationship',
  hint:'Ask what each word is counting. One counts an address; the other counts a tie between people.',
  explanation:'A household is everyone at one address; a family is a set of people linked by blood, marriage or adoption. That is why census officers count households while sociologists study families — neither money nor district enters the definition of either.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-005', chapterId:'g9sms-family', subsection:'family_types', difficulty:3,
  question:'Why have households of three generations under one roof become less common in Mauritian towns than they once were?',
  options:['Smaller town dwellings and work away from home separate the generations',
           'Grandparents are no longer regarded as relatives once they stop working',
           'The law now limits how many adults may be registered at one address',
           'Young couples are required to live apart until their children are born'],
  answer:'Smaller town dwellings and work away from home separate the generations',
  hint:'Think about where the jobs are and how big a town flat is, not about affection between generations.',
  explanation:'Urban flats are smaller than village family plots, and jobs draw couples to where the work is. The extended household thins for those practical reasons — not because the ties weaken, and not because of any rule about registering an address.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-006', chapterId:'g9sms-family', subsection:'family_types', difficulty:4,
  question:'A couple in Goodlands live with the husband\'s father and their own two children. The wife\'s mother visits every Sunday and stays the weekend. One pupil calls the household extended, another calls it nuclear with visitors. Which reading is better supported?',
  options:['Extended, because the grandfather lives there and is not a visitor',
           'Nuclear, because a household cannot ever hold two generations',
           'Nuclear, because the grandfather did not pay for building it',
           'Extended, because relatives come to the house at the weekend'],
  answer:'Extended, because the grandfather lives there and is not a visitor',
  hint:'Decide which of the two older people is part of the household, and which is a guest.',
  explanation:'Residence, not visiting, settles it: the grandfather sleeps there permanently, so three generations share the household and it is extended. Weekend guests never change a household type, and who paid for the building is irrelevant to it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-007', chapterId:'g9sms-family', subsection:'family_types', difficulty:4,
  question:'A widower with two children marries a woman who has one child of her own. All five now live in one house in Flacq. Which type of family has been formed, and what makes it so?',
  options:['Reconstituted, because children of two earlier unions now share one home',
           'Extended, because five people is more than a nuclear family can hold',
           'Single-parent, because the children had one parent for some years',
           'Joint, because two adults have each brought property to the union'],
  answer:'Reconstituted, because children of two earlier unions now share one home',
  hint:'Ask what is new about the group: a generation has been added, or two earlier groups have been joined?',
  explanation:'A reconstituted (blended) family is formed when a new union brings together children from previous relationships. Size alone never makes a family extended — that needs a third generation or a side branch living in the home.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-008', chapterId:'g9sms-family', subsection:'family_types', difficulty:4,
  question:'A family who lived with the grandparents in Rivière du Rempart moves to a flat in Port Louis for work. Which everyday change is the household MOST likely to notice first?',
  options:['Childcare the grandparents gave freely now has to be arranged and paid for',
           'The children will need to be registered again as citizens of the country',
           'The parents will earn the same wage but be taxed at a much lower rate',
           'The grandparents will stop counting as relatives once the move is made'],
  answer:'Childcare the grandparents gave freely now has to be arranged and paid for',
  hint:'Which job was the extended household quietly doing that nobody was paying for?',
  explanation:'An extended household carries out functions without a bill attached, and childcare is the clearest. Once the generations separate, that work must be bought or a parent must give up hours to do it — which is why moving for work can cost more than the rent.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-009', chapterId:'g9sms-family', subsection:'family_types', difficulty:4,
  question:'Three adult brothers, with their wives and children, share one yard in Mahébourg. Each couple has its own room and cooks separately, but all three work the same plot of land together. Which description is best supported?',
  options:['An extended family, because land, labour and daily life are shared',
           'Three separate families, because each couple cooks its own meals',
           'A reconstituted family, because three units were joined together',
           'A single household, because one gate serves the whole of the shared yard'],
  answer:'An extended family, because land, labour and daily life are shared',
  hint:'Weigh what is shared against what is separate, then decide which matters more to the definition.',
  explanation:'Separate cooking is real, but the brothers are kin working one economic unit in constant daily contact, which is what extended family means. Nothing here joins children of earlier unions, so reconstituted is the wrong word entirely.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-010', chapterId:'g9sms-family', subsection:'family_types', difficulty:4,
  question:'A Rodriguan couple work in Mauritius while their children stay in Rodrigues with an aunt. A pupil calls this a broken family. Why is that description not a sound one?',
  options:['The parents still support the children, so the family is separated by distance',
           'The parents will return to Rodrigues in time, so the question cannot arise',
           'The aunt is a blood relative, so the children have gained a second family',
           'The children are of school age, so their family type cannot yet be judged'],
  answer:'The parents still support the children, so the family is separated by distance',
  hint:'Ask what has actually ended here — the relationship, or only the sharing of one address?',
  explanation:'Distance changes a household, not a family. Parents who send money, decide and keep contact are performing family functions from afar; sociologists would describe this as a transnational or separated family, never as a broken one.' }));

// ── family_functions — g9sms-dpf-011 … 026 ────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-011', chapterId:'g9sms-family', subsection:'family_functions', difficulty:1,
  question:'Providing food, shelter and clothing for its members is which function of the family?',
  options:['The economic function','The political function','The ceremonial function','The legislative function'],
  answer:'The economic function',
  hint:'Name the function by what it costs and what it provides day to day.',
  explanation:'Meeting material needs — income, housing, meals, clothing — is the family\'s <b>economic</b> function. The family has no political or law-making function; those belong to the state and its institutions.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-012', chapterId:'g9sms-family', subsection:'family_functions', difficulty:1,
  question:'Comfort, affection and a sense of belonging are provided by which function of the family?',
  options:['The emotional function','The educational function','The recreational function','The occupational function'],
  answer:'The emotional function',
  hint:'All four words below are real functions. Pick the one about how a person feels.',
  explanation:'The <b>emotional</b> (affective) function gives members support, affection and security. Recreation is about how leisure is spent together, and education is about what is taught — neither is the same as being cared for.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpf-013', chapterId:'g9sms-family', subsection:'family_functions', difficulty:1,
  question:'The family is called the agent of PRIMARY ______, because it is the first place a child learns the language, rules and customs of society. Write the missing word.',
  answer:'socialisation',
  alsoAccept:['socialization'],
  hint:'The word names the whole process of learning to live among other people.',
  explanation:'<b>Socialisation</b> is the lifelong process of learning the ways of a society. The family carries out the primary stage, before school, the peer group and the media take their turn at the secondary stage.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-014', chapterId:'g9sms-family', subsection:'family_functions', difficulty:2,
  question:'Which function of the family gives a newborn child a name, a religion and a place in the community?',
  options:['The status-giving function','The protective function','The recreational function','The redistributive function'],
  answer:'The status-giving function',
  hint:'Think about what the baby is given on the day it arrives, before it can do anything at all.',
  explanation:'The family places a child in society: a surname, a community, often a religion and a first social position. That is the <b>status-giving</b> function. Protection is about keeping the child safe, which is a separate job.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-015', chapterId:'g9sms-family', subsection:'family_functions', difficulty:2,
  question:'Which of these is a function the family performs for SOCIETY as a whole, rather than only for its own members?',
  options:['Producing and raising the next generation of members',
           'Deciding how much pocket money the children get',
           'Choosing which shop the weekly food is bought at',
           'Agreeing which television channel is watched most'],
  answer:'Producing and raising the next generation of members',
  hint:'Ask which one a society would miss if every family stopped doing it tomorrow.',
  explanation:'The reproductive function replaces the members a society loses, which is why sociologists call the family a basic institution. Pocket money and shopping are real decisions but they affect one household only.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpf-016', chapterId:'g9sms-family', subsection:'family_functions', difficulty:2,
  question:'Which single word names the function of the family that provides love, comfort and a sense of belonging? Write the word that completes: the ______ function.',
  answer:'emotional',
  alsoAccept:['affective','affection'],
  hint:'It is the function a person misses when they are lonely, not when they are hungry.',
  explanation:'The <b>emotional</b> (also called affective) function is the giving of affection, comfort and security. It is the function sociologists say has grown in importance as schools, clinics and shops took over other jobs the family once did alone.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-017', chapterId:'g9sms-family', subsection:'family_functions', difficulty:2,
  question:'The school also teaches children. What makes the family\'s teaching different from the school\'s?',
  options:['The family teaches first, informally, and from the earliest age',
           'The family teaches only subjects that are not on the timetable',
           'The family teaches only in the holidays when there is free time',
           'The family teaches only the children who fall behind in classes'],
  answer:'The family teaches first, informally, and from the earliest age',
  hint:'Compare when each one starts and whether either follows a written syllabus.',
  explanation:'Primary socialisation happens in the family, before school, with no timetable or syllabus — speech, manners, beliefs and habits. The school adds formal, examined learning later; it does not replace what came first.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-018', chapterId:'g9sms-family', subsection:'family_functions', difficulty:3,
  question:'Why do sociologists call the family the MOST important agent of socialisation, even though schools and the media also teach?',
  options:['It acts first, acts continuously, and acts at the age when learning is deepest',
           'It is the only agent allowed by law to teach a child anything at all',
           'It teaches more subjects in one year than a secondary school manages',
           'It is the only agent that a child is able to argue with and question'],
  answer:'It acts first, acts continuously, and acts at the age when learning is deepest',
  hint:'Three things are being weighed: when it starts, how long it lasts, and how receptive the learner is.',
  explanation:'The family reaches the child before any other agent, keeps acting every day for years, and does so in early childhood when speech, values and habits form. Schools and media come later and work on ground the family has already prepared.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-019', chapterId:'g9sms-family', subsection:'family_functions', difficulty:3,
  question:'Several jobs the family once did alone are now shared with other institutions. Which pair shows this most clearly?',
  options:['Health care shared with hospitals, and formal learning shared with schools',
           'Affection shared with hospitals, and reproduction shared with the schools',
           'Naming shared with the courts, and belonging shared with the employers',
           'Shelter shared with the police, and protection shared with the local churches'],
  answer:'Health care shared with hospitals, and formal learning shared with schools',
  hint:'Pick the pair where each half is genuinely done by that institution today.',
  explanation:'Nursing the sick and teaching the young were family work before clinics and schools existed, and both are now largely institutional. Affection and belonging are the functions the family has kept almost entirely to itself.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-020', chapterId:'g9sms-family', subsection:'family_functions', difficulty:3,
  question:'How does the family\'s economic function differ in a farming household from that in a household where both adults work in an office?',
  options:['The farming household produces goods together; the office household earns and buys',
           'The farming household has no economic function at all until the crop is sold',
           'The office household produces goods together while the farm only consumes them',
           'The two are identical, because every household must feed itself either way'],
  answer:'The farming household produces goods together; the office household earns and buys',
  hint:'Ask where the food on the table came from in each case, and who made it appear.',
  explanation:'In a farming household the family is a unit of <b>production</b> — everyone works the same land. In a wage-earning household it is mainly a unit of <b>consumption</b>: income is brought in and goods are bought. Both have an economic function; it takes a different shape.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-021', chapterId:'g9sms-family', subsection:'family_functions', difficulty:4,
  question:'A grandmother, her daughter and two grandchildren share one house in Quatre Bornes. The daughter works shifts and the grandmother minds the children. Which function of the family does this best illustrate?',
  options:['Care, because the household covers the children while a parent earns',
           'Status, because the children take the surname of their own grandmother',
           'Leisure, because the generations spend their free evenings together',
           'Reproduction, because three generations live at the same address'],
  answer:'Care, because the household covers the children while a parent earns',
  hint:'Ask what work is actually being done here, and what would have to be bought if nobody did it.',
  explanation:'The grandmother is performing the family\'s care (protective) function, and doing so makes the daughter\'s shift work possible. Living together does not by itself illustrate reproduction, and no question of names or leisure arises in the scenario.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-022', chapterId:'g9sms-family', subsection:'family_functions', difficulty:4,
  question:'A father loses his job. The household cancels the weekly Sunday outing but keeps paying the eldest child\'s bus fare to school. Which reading of the decision is soundest?',
  options:['Education is being protected and recreation is being given up',
           'Recreation is being protected and education is being given up',
           'Both functions have been given up because income has fallen',
           'Neither function is affected because the fare is a small sum'],
  answer:'Education is being protected and recreation is being given up',
  hint:'List what the household stopped paying for and what it kept paying for, then name each one.',
  explanation:'Under pressure a household ranks its functions, and here the educational one outranks the recreational one. The outing ends; the fare survives. That ordering is itself evidence of what the family judges most important for the child\'s future.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-023', chapterId:'g9sms-family', subsection:'family_functions', difficulty:4,
  question:'A Grade 9 pupil has a bad week at school. He tells no teacher, but talks it over with his older sister that evening and goes back the next morning feeling steadier. Which family function is at work?',
  options:['The emotional function, supplying support the school did not supply',
           'The economic function, because the household has saved a school fee',
           'The status function, because his sister is older than he is himself',
           'The educational function, because the talk happened after school time'],
  answer:'The emotional function, supplying support the school did not supply',
  hint:'Nothing was bought and nothing was taught. Ask what he actually received.',
  explanation:'Listening and reassurance are the affective (emotional) function, and this is the one job other institutions have not taken over. The timing of the conversation does not make it educational, and no money or status changed hands.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-024', chapterId:'g9sms-family', subsection:'family_functions', difficulty:4,
  question:'After a cyclone damages a roof in Pamplemousses, relatives from two other households arrive with food and spend the weekend helping to repair it. What does this best show about the family in Mauritius?',
  options:['The wider kin network still performs protective and economic functions',
           'The nuclear family has taken over every function the kin once had',
           'Repairing a roof is a recreational function performed by relatives',
           'Cyclone damage is the only occasion on which relatives will assist'],
  answer:'The wider kin network still performs protective and economic functions',
  hint:'Ask who turned up, what they brought, and which functions those two things belong to.',
  explanation:'Labour and food arriving from relatives is protection and material support from beyond the household — evidence that the extended kin network is still functional even where people no longer live under one roof. It is help, not leisure.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-025', chapterId:'g9sms-family', subsection:'family_functions', difficulty:4,
  question:'Two parents both work full time and place their toddler in a day-care centre in Curepipe. A pupil concludes that the family has lost its socialisation function. Why is that conclusion too strong?',
  options:['The family still socialises at home, so the task is shared and not surrendered',
           'The day-care centre is not allowed by law to teach a child anything at all',
           'Socialisation only begins at the age when a child starts primary school',
           'A family keeps every one of its functions whatever else may happen to it'],
  answer:'The family still socialises at home, so the task is shared and not surrendered',
  hint:'Between a function being lost and a function being shared, which does the evidence actually support?',
  explanation:'Mornings, evenings, weekends and every value the parents model are still family socialisation; the centre adds to it rather than replacing it. The sweeping claim that a family never loses a function is equally wrong — several have genuinely moved to schools and hospitals.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-026', chapterId:'g9sms-family', subsection:'family_functions', difficulty:4,
  question:'In one household the grandparents mind the young children; in another the parents pay a crèche. Which statement about family functions is best supported by the comparison?',
  options:['The same function is being met by different means in each household',
           'Only the first household is carrying out the function of child care',
           'The second household has replaced care with an economic function',
           'Neither household can meet the function without both parents home'],
  answer:'The same function is being met by different means in each household',
  hint:'Separate the job that needs doing from the arrangement each household has made for doing it.',
  explanation:'Care of young children is the function; grandparents and a crèche are two arrangements for delivering it. Judging one household to be carrying out the function and the other not confuses the means with the function itself.' }));

// ── gender_roles — g9sms-dpf-027 … 044 ────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-027', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:1,
  question:'Gender roles are learned rather than inborn. Which process describes how a child learns them?',
  options:['Socialisation','Inheritance','Urbanisation','Industrialisation'],
  answer:'Socialisation',
  hint:'It is the same process by which a child learns a language and a set of manners.',
  explanation:'Children learn what is expected of a boy or a girl through <b>socialisation</b> — from family, school, friends and the media. Inheritance passes on biological traits and property, which is a different thing entirely.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-028', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:1,
  question:'Which of these is a BIOLOGICAL difference between men and women, rather than a gender role set by society?',
  options:['The ability of women to bear children','The expectation that women cook meals','The expectation that men repair a car','The expectation that men handle money'],
  answer:'The ability of women to bear children',
  hint:'Three of these are things societies expect. One is a fact about the body.',
  explanation:'Childbearing is a biological (sex) difference. The other three are <b>gender roles</b> — expectations a society teaches, which differ between countries and have changed a great deal in Mauritius within living memory.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpf-029', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:1,
  question:'Fixed, over-simple ideas about what all men or all women are supposedly like are called gender ______. Write the missing word.',
  answer:'stereotypes',
  alsoAccept:['stereotype'],
  hint:'The word originally meant a printing plate that stamped out the same image every time.',
  explanation:'A gender <b>stereotype</b> applies one fixed picture to a whole group and ignores the individual. It differs from a gender role: a role is what a society expects someone to do, while a stereotype is a belief about what they are.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-030', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:2,
  question:'Which of these best shows that gender roles CHANGE over time in Mauritius?',
  options:['Women now work as magistrates, doctors, pilots and ministers',
           'Women have always carried a child before it is born alive',
           'Men and women have always eaten the same foods at meals',
           'Men and women have always spoken the same languages here'],
  answer:'Women now work as magistrates, doctors, pilots and ministers',
  hint:'Look for the option that describes something different today from a generation ago.',
  explanation:'Occupations once effectively closed to women are now held by them, which is change in a gender role. Childbearing is biological and has not changed, so it cannot be evidence of a shift in what society expects.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpf-031', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:2,
  question:'Gender roles are not the same in every country, which shows that they are set by ______ rather than by biology. Write the missing word.',
  answer:'culture',
  alsoAccept:['society','culture and society'],
  hint:'Name what varies from one country to the next and is passed on by teaching.',
  explanation:'If roles were biological they would be identical everywhere, because human bodies are. They vary between societies and across time, so they are set by <b>culture</b> and learned through socialisation.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-032', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:2,
  question:'Which change in schooling did most to open new roles to Mauritian girls?',
  options:['Free secondary education, available to all from 1977',
           'Free school transport, provided on all bus routes',
           'Free school textbooks, issued at the primary level',
           'Free school uniforms, supplied to the lower grades'],
  answer:'Free secondary education, available to all from 1977',
  hint:'Ask which of the four removed the barrier to the qualifications a professional job asks for.',
  explanation:'Free secondary education from <b>1977</b> put certificates within reach of families who could not have paid fees, and qualifications are what open professional work. The other three lower the cost of attending but do not by themselves extend how far a pupil can go.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-033', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:2,
  question:'What is meant by the "double burden" sometimes carried by women who are in paid work?',
  options:['Paid work outside the home plus most of the housework inside it',
           'Paid work in two separate jobs held during the same working week',
           'Paid work combined with the duty of supporting elderly relatives',
           'Paid work that is taxed twice, once at source and once at year end'],
  answer:'Paid work outside the home plus most of the housework inside it',
  hint:'The two halves of the burden are in two different places. Where is each one?',
  explanation:'The double burden (or second shift) is the finding that women entering paid employment often kept the household work as well, so the total hours rose. It is about unpaid work at home, not about a second job or a tax rule.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpf-034', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:2,
  question:'A Grade 9 class of 30 pupils was asked who usually cooks at home. The replies were: mother only 15, father only 4, shared between the adults 9, another relative 2. How many pupils said the cooking is either shared or done by the father?',
  answer:13,
  hint:'Add together only the two replies the question names, and ignore the other two.',
  explanation:'Father only (4) plus shared (9) gives <b>13</b> of the 30 replies. Reading a survey this way is a skill the NCE paper tests directly, and the figures here are from one class only — they describe that class, not the country.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-035', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:2,
  question:'Which principle, written into modern employment law, supports equal gender roles at work?',
  options:['Equal pay for work of equal value','Equal pay for the longest-serving staff','Equal pay for all who apply for a post','Equal pay for everyone living nearby'],
  answer:'Equal pay for work of equal value',
  hint:'The principle compares the job being done, not the person who happens to be doing it.',
  explanation:'The rule attaches the wage to the <b>work</b>: two people doing jobs of equal value are paid the same whatever their sex. Length of service and place of residence are separate matters and are not equality principles at all.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-036', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:3,
  question:'Smaller families and longer schooling both helped change gender roles in Mauritius. What is the link between them?',
  options:['Both freed years once spent on childbearing and daily child care',
           'Both reduced the number of hours a working week is allowed to be',
           'Both raised the wages that unskilled factory work is able to offer',
           'Both removed the need for any household to buy food from a shop'],
  answer:'Both freed years once spent on childbearing and daily child care',
  hint:'Ask what a woman gains when there are fewer children to raise and more years of schooling behind her.',
  explanation:'Fewer children means fewer years tied to infant care, and more schooling means qualifications to use the years that are freed. Together they made a long working life outside the home possible where it had not been before.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-037', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:3,
  question:'Why do sociologists describe a gender role as an ASCRIBED expectation rather than an achieved one?',
  options:['It is assigned at birth by society rather than earned by a person\'s effort',
           'It is awarded by an examination board after a course has been completed',
           'It is chosen freely by each adult once they reach the age of majority',
           'It is granted by an employer to a worker after several years of service'],
  answer:'It is assigned at birth by society rather than earned by a person\'s effort',
  hint:'Ascribed and achieved differ on one point: whether the person did anything to get it.',
  explanation:'An ascribed status is given without the person doing anything — a newborn is treated as a boy or a girl and the expectations follow. An achieved status, such as a qualification or a promotion, is earned. That is exactly why a role can be questioned and changed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-038', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:3,
  question:'A pupil writes that gender roles have completely disappeared in Mauritius. Which is the strongest reason that this overstates the change?',
  options:['Housework and care of relatives are still done mainly by women in many homes',
           'No woman in Mauritius has ever been employed in a professional occupation',
           'The law still forbids a woman from applying for most kinds of paid work',
           'Boys and girls are still taught in completely separate school buildings'],
  answer:'Housework and care of relatives are still done mainly by women in many homes',
  hint:'Change can be real at work and still be incomplete somewhere else. Where would you look?',
  explanation:'Roles have changed fastest in education and paid employment and more slowly inside the home, where unpaid work is still unevenly shared in many households. The other three statements are simply untrue of Mauritius today.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-039', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:3,
  question:'How can the toys, chores and stories given to young children keep gender roles going from one generation to the next?',
  options:['They teach a child early what is expected of a boy or of a girl',
           'They decide which subjects a child will be permitted to study',
           'They fix the wage a child will be able to earn as a grown adult',
           'They change the biological differences between boys and girls'],
  answer:'They teach a child early what is expected of a boy or of a girl',
  hint:'These are all things a small child meets long before any job or examination.',
  explanation:'Everyday objects and tasks carry a message about what suits a boy and what suits a girl, and children absorb it during primary socialisation. Nothing here fixes a wage or a subject choice, and nothing can alter biology.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-040', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:4,
  question:'A household gives the son a bicycle and the daughter a doll each birthday, and later wonders why she never offers to help mend anything. Which explanation fits the evidence best?',
  options:['The two children were socialised into different expectations from an early age',
           'The daughter inherited less mechanical ability than her brother inherited',
           'The daughter has been formally forbidden from touching any tool at home',
           'The son received more birthdays than the daughter over the same period'],
  answer:'The two children were socialised into different expectations from an early age',
  hint:'Nobody in this household said the rule out loud. Ask how it could have been taught anyway.',
  explanation:'Years of different gifts teach each child which activities are theirs, without anybody stating a rule. Explaining the difference by inherited ability treats a learned expectation as though it were biology, which is what the chapter warns against.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-041', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:4,
  question:'A firm advertises a supervisor\'s post and adds the words "men preferred". A worker objects to the wording. On what ground is the objection strongest?',
  options:['The duties of the post, not the sex of the applicant, should decide who can do it',
           'The advertisement should have been printed in a newspaper and not on a notice',
           'The firm should have filled the post from its own staff before advertising it',
           'The wording will reduce the number of applications the firm is likely to get'],
  answer:'The duties of the post, not the sex of the applicant, should decide who can do it',
  hint:'Several of these are reasonable complaints. Only one of them is about equal roles.',
  explanation:'Equality of opportunity means judging an applicant against what the job requires. Where the advertisement was placed, and how many people reply to it, are practical points that would remain even if the wording were fair.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-042', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:4,
  question:'A household in Vacoas decides that both adults will work shifts and share the cooking between them. The grandmother says it is not how a home should be run. Which statement best explains the disagreement?',
  options:['The two generations were socialised into different expectations of roles',
           'The younger adults have misunderstood what cooking actually involves',
           'The grandmother is stating a biological fact about how homes function',
           'Only one of the two arrangements can feed a household successfully'],
  answer:'The two generations were socialised into different expectations of roles',
  hint:'Both people are describing what is normal. Ask when each of them learned what normal meant.',
  explanation:'Gender roles are learned in childhood, so a grandmother and her children absorbed different expectations from different decades. Disagreement between generations is one of the clearest signs that a role is cultural rather than fixed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-043', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:4,
  question:'In one Grade 9 class, boys and girls are equally likely to say they hope to become engineers, but only the girls say they expect to do the cooking at home. What does this suggest about change in gender roles?',
  options:['Roles have changed faster in work and study than inside the home',
           'Roles have changed faster inside the home than in work and study',
           'Roles have not changed at all in either work, study or the home',
           'Roles in one class of pupils prove nothing about any change here'],
  answer:'Roles have changed faster in work and study than inside the home',
  hint:'Two questions were asked. Compare the answers to each, and say where they agree and where they part.',
  explanation:'Equal ambition at work beside an unequal expectation at home is uneven change, and that is the pattern the syllabus describes. Dismissing one class entirely is too strong: it is limited evidence, but it does point somewhere.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-044', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:4,
  question:'A pupil argues that because her own father does all the cooking, gender roles no longer exist anywhere in Mauritius. Which reply is the soundest?',
  options:['One household shows roles can change, not that they have changed everywhere',
           'One household is enough evidence, because families are much the same',
           'One household proves nothing at all, because cooking is not a real role',
           'One household should be ignored, because it is not a usual arrangement'],
  answer:'One household shows roles can change, not that they have changed everywhere',
  hint:'Distinguish what a single case can prove is possible from what it can prove is general.',
  explanation:'A single example is strong evidence that a role is not fixed and weak evidence about how common the change is. Calling her household unusual and dismissing it is the opposite error, and cooking is certainly a gender role worth studying.' }));

// ── women_at_work — g9sms-dpf-045 … 059 ───────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-045', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:1,
  question:'What do the letters EPZ stand for?',
  options:['Export Processing Zone','Economic Planning Zone','Eastern Producers Zone','European Partners Zone'],
  answer:'Export Processing Zone',
  hint:'The first word says where the goods were going; the last says it was a defined area.',
  explanation:'The <b>Export Processing Zone</b> gave manufacturers producing for export a package of incentives. Its growth from the 1970s drew large numbers of Mauritian women into paid factory employment for the first time.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-046', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:1,
  question:'In which industry did the EPZ employ large numbers of Mauritian women from the 1970s onwards?',
  options:['Textiles and clothing','Shipping and harbours','Mining and quarrying','Banking and insurance'],
  answer:'Textiles and clothing',
  hint:'Think of the factories that made goods to be sewn and then shipped abroad.',
  explanation:'The EPZ was built on <b>textiles and clothing</b>, and its assembly lines recruited women in very large numbers. That wage, earned outside the home, is the single change most often credited with altering women\'s position in Mauritian society.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-047', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:2,
  question:'What is maternity leave?',
  options:['Paid leave from work taken around the birth of a child',
           'Paid leave from work taken to study for a qualification',
           'Paid leave from work taken to care for an elderly parent',
           'Paid leave from work taken during the annual factory break'],
  answer:'Paid leave from work taken around the birth of a child',
  hint:'The name of the leave tells you which event it is attached to.',
  explanation:'Maternity leave lets a mother stop work around childbirth without losing her job or her pay, which is what allows a career and a family to run together. Study leave and the annual shutdown are different entitlements entirely.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-048', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:2,
  question:'Which of these is work in the INFORMAL sector, where many women earn?',
  options:['Selling vegetables from a stall at the roadside',
           'Teaching a class at a state secondary school',
           'Nursing a ward at a public regional hospital',
           'Filing papers in a government ministry office'],
  answer:'Selling vegetables from a stall at the roadside',
  hint:'Ask which of these four jobs comes with a payslip, a contract and a pension.',
  explanation:'Informal work is unregistered and carries no contract, paid leave or pension. Roadside trading is the clearest example; the other three are formal public-sector posts with all of those protections attached.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-049', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:2,
  question:'What does occupational segregation mean?',
  options:['Men and women being concentrated in different kinds of job',
           'Men and women being paid on different days of each month',
           'Men and women being trained in different rooms at a college',
           'Men and women being employed on different sites of one firm'],
  answer:'Men and women being concentrated in different kinds of job',
  hint:'The word "occupational" points at the type of work, not at the building or the payday.',
  explanation:'Occupational segregation is the pattern where one sex clusters in some occupations and the other in different ones — nursing and machining against engineering and driving, for example. It is about which job, not about where or when it is done.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-050', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:2,
  question:'Which facility, if it is available near the workplace, most helps the parents of young children stay in full-time paid work?',
  options:['A crèche or day-care centre for the youngest children',
           'A staff canteen serving hot lunches to all employees',
           'A car park with reserved spaces beside the main gate',
           'A sports club open to employees after the shift ends'],
  answer:'A crèche or day-care centre for the youngest children',
  hint:'Ask which facility removes the obstacle that actually keeps a parent at home.',
  explanation:'The binding constraint is who minds the child during working hours, so child care is the facility that decides whether a parent can take the job at all. The others improve the working day for someone who is already able to be there.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-051', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:2,
  question:'Besides labour on the sugar estates, which paid occupation was commonly open to Mauritian women before industrialisation?',
  options:['Domestic service in other people\'s houses','Supervision of a large factory floor','Engineering on the railway network','Navigation on the coastal shipping'],
  answer:'Domestic service in other people\'s houses',
  hint:'Before the factories opened, most paid work for women was either in the fields or in somebody\'s home.',
  explanation:'Field labour and <b>domestic service</b> were the two main openings, both poorly paid and largely unprotected. The factory, supervisory and technical occupations listed beside them were effectively closed to women at that time.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-052', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:3,
  question:'Why did the growth of the EPZ change women\'s position inside the family as well as at the workplace?',
  options:['A wage of her own gave a woman a greater say in household decisions',
           'A factory job required every household to move closer to the town',
           'A factory job removed the need for a household to cook any meals',
           'A wage of her own was paid directly to the head of the household'],
  answer:'A wage of her own gave a woman a greater say in household decisions',
  hint:'Follow the money. Who earned it, who received it, and what does that change at home?',
  explanation:'Independent earnings alter bargaining power within the home: a woman contributing income has more weight in decisions about spending, schooling and the future. Paying the wage to somebody else would have removed exactly that effect.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-053', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:3,
  question:'Why does a shortage of affordable child care reduce the number of mothers in full-time paid work?',
  options:['Somebody must mind the child, so a parent stays at home to do it',
           'Employers are not permitted to engage a worker who has children',
           'Wages fall automatically whenever a district has too few crèches',
           'Children under five are required by law to remain with a parent'],
  answer:'Somebody must mind the child, so a parent stays at home to do it',
  hint:'The job has to be done by somebody. If it cannot be bought, who ends up doing it?',
  explanation:'Child care is work that does not disappear. If no affordable place exists, the household supplies it from within, and in most households that has meant a mother leaving or reducing paid work. No law requires it; the arithmetic of the day does.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-054', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:3,
  question:'Education and women\'s paid employment rose together in Mauritius. What is the link between the two?',
  options:['Qualifications opened occupations that unskilled labour could not reach',
           'Schools were obliged to find employment for each pupil who left them',
           'Employers were required to prefer applicants who had attended school',
           'Longer schooling reduced the number of hours a working day may last'],
  answer:'Qualifications opened occupations that unskilled labour could not reach',
  hint:'Ask what a certificate actually does for the person holding it when they look for work.',
  explanation:'A certificate is the entry ticket to clerical, technical and professional occupations, so widening access to schooling widened the range of jobs women could enter. No school places its leavers, and no employer is obliged to prefer them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-055', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:3,
  question:'Why is "women now go out to work" an incomplete description of what changed after the 1970s?',
  options:['The kind of work, and its pay and security, changed as well',
           'The number of hours in the working week changed as well',
           'The distance between home and workplace changed as well',
           'The clothing worn by workers on the site changed as well'],
  answer:'The kind of work, and its pay and security, changed as well',
  hint:'Women were already working before the 1970s. Ask what was different about the work that came after.',
  explanation:'Women worked before — in the fields and in domestic service, for low and unprotected pay. The change was the move into contracted employment with a wage, leave and social protection, and later into clerical and professional occupations.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-056', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:4,
  question:'A mother in Rose Hill is offered a promotion that would mean finishing at seven in the evening. Her children finish school at three, and her husband works those same hours. Which arrangement would let her accept the post?',
  options:['After-school care until one of the parents is able to collect them',
           'A later starting time in the morning for both of the two parents',
           'A shorter lunch break so that the working day finishes earlier',
           'An agreement that the children will travel home by public bus'],
  answer:'After-school care until one of the parents is able to collect them',
  hint:'Find the exact hours nobody is available, then ask which option covers those hours.',
  explanation:'The gap is between three and seven o\'clock, so only supervised care across that window solves it. Starting later widens the gap, a shorter lunch cannot close four hours, and an unsupervised journey home leaves the same hours uncovered.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-057', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:4,
  question:'A clothing firm finds that nearly all its machinists are women and nearly all its supervisors are men, although both posts are open to everyone. Which question deserves to be checked FIRST?',
  options:['Whether the promotion route is open to the shift the machinists work',
           'Whether the machinists are content with the work they already do',
           'Whether the supervisors have been employed longer than the others',
           'Whether the factory floor is laid out conveniently for both groups'],
  answer:'Whether the promotion route is open to the shift the machinists work',
  hint:'A rule can say a post is open and a working arrangement can still close it. Look for that arrangement.',
  explanation:'Occupational segregation often survives a fair rule because the route upward — training, meetings, acting-up duties — sits on hours one group cannot attend. Length of service is worth checking later; the layout of the floor explains nothing about promotion.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-058', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:4,
  question:'Two neighbouring households are compared. In one the mother works night shifts and the father cooks; in the other the father works abroad and the mother runs the family shop. What do both households show?',
  options:['Who earns and who cares is settled by circumstances rather than by sex',
           'Households in which the mother earns are the more usual of the two',
           'A household must always have exactly one earner and exactly one carer',
           'Working abroad is the only reason a household changes its arrangements'],
  answer:'Who earns and who cares is settled by circumstances rather than by sex',
  hint:'The two households have opposite arrangements. What single statement is true of both at once?',
  explanation:'Each household allocated earning and caring to fit its hours and its opportunities, and they reached opposite answers. That is the point: the allocation is practical and changeable, and neither arrangement is the correct one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-059', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:4,
  question:'A firm introduces flexible starting times. Over the next year, absences fall among both the men and the women who have young children. What does that result most strongly suggest?',
  options:['Caring duties rather than sex were the cause of the earlier absences',
           'Workers with young children had simply been less committed before',
           'Flexible hours reduce absence for every worker the firm employs',
           'Men take on caring duties only when a firm instructs them to do so'],
  answer:'Caring duties rather than sex were the cause of the earlier absences',
  hint:'The improvement appeared in both groups. What did those two groups have in common?',
  explanation:'The result splits on having young children, not on sex, so the obstacle was the caring duty and the clash of hours. The evidence given says nothing about workers without children, and nothing about commitment.' }));

// ══ SOCIAL CHANGE & COLLECTIVE BEHAVIOUR ══════════════════════════════════

// ── forces_of_change — g9sms-dpf-060 … 075 ────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-060', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:1,
  question:'The spread of smartphones has altered how Mauritians shop, bank and keep in touch. Which force of social change is this?',
  options:['Technology','Legislation','Migration','Taxation'],
  answer:'Technology',
  hint:'Name the force by what actually arrived — a law, a movement of people, or a new tool?',
  explanation:'A new tool that changes daily behaviour is <b>technology</b> acting as a force of social change. Legislation changes behaviour through the law, and migration changes it by moving people; neither describes the arrival of a device.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpf-061', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:1,
  question:'The movement of people out of villages and into towns, changing how they live and work, is called ______. Write the missing word.',
  answer:'urbanisation',
  alsoAccept:['urbanization'],
  hint:'The word is built on the Latin word for a town or city.',
  explanation:'<b>Urbanisation</b> is the growth of the share of a population living in towns. It is a force of social change in its own right: it alters housing, work, transport and the size and shape of the households people live in.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpf-062', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:1,
  question:'The growing links between countries in trade, travel, money and communication are called ______. Write the missing word.',
  answer:'globalisation',
  alsoAccept:['globalization'],
  hint:'The word is built on the word for the whole world.',
  explanation:'<b>Globalisation</b> is the deepening connection between countries. For a small trading island it is a powerful force of change: it decides which goods are made here, which are imported, and which ideas and fashions arrive.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-063', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:2,
  question:'Which of these shows a force of social change acting through the LAW?',
  options:['Making attendance at school compulsory up to a set age',
           'Opening a new bus route between two growing villages',
           'Installing a mobile telephone mast on a hill in the south',
           'Building a shopping centre on the edge of a large town'],
  answer:'Making attendance at school compulsory up to a set age',
  hint:'Three of these change what people can do. One changes what people must do.',
  explanation:'A legal requirement changes behaviour directly and for everyone, which is legislation acting as a force of change. Roads, masts and shopping centres change behaviour too, but they work by offering an opportunity rather than by compelling.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-064', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:2,
  question:'Population change is a force of social change. Which example shows it at work?',
  options:['More people living past seventy, so more care services are needed',
           'More shops opening late so that customers can call after work',
           'More rain falling in one season than in the season before it',
           'More vehicles using a road after it has been widened again'],
  answer:'More people living past seventy, so more care services are needed',
  hint:'Look for the option where the number or the age structure of the people themselves has changed.',
  explanation:'An ageing population reshapes demand for pensions, housing and health care, which is population change driving social change. Longer shop hours and heavier traffic are changes in behaviour, not changes in the population.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-065', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:2,
  question:'Which of these best shows the ENVIRONMENT acting as a force of social change?',
  options:['Coastal erosion forcing a village to move its buildings inland',
           'A new secondary school opening in a village in the highlands',
           'A television channel broadcasting in an additional language',
           'A factory raising the wages it pays its production workers'],
  answer:'Coastal erosion forcing a village to move its buildings inland',
  hint:'One of these begins with something physical happening to the land itself.',
  explanation:'A physical change to the land that obliges people to live differently is the environment acting as a force of change. Schools, broadcasts and wages are social and economic forces; they are not environmental ones.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-066', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:2,
  question:'Which change in Mauritius was driven mainly by industrialisation rather than by a change in the law?',
  options:['Large numbers of people moving from field work into factory work',
           'The raising of the age up to which a child must attend a school',
           'The setting of a minimum wage that every employer has to pay',
           'The granting of paid leave to a mother around the birth of a child'],
  answer:'Large numbers of people moving from field work into factory work',
  hint:'Three of these could only happen once somebody passed something. The fourth happened because jobs appeared.',
  explanation:'A shift of workers between sectors follows from where the work is, which is industrialisation acting directly. A school-leaving age, a minimum wage and maternity leave are all created by legislation.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpf-067', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:2,
  question:'A school council asked 60 pupils which force had changed daily life in their village most. The replies were: technology 27, education 18, migration 9, the media 6. How many MORE pupils chose technology than chose education?',
  answer:9,
  hint:'You need only two of the four figures, and one operation between them.',
  explanation:'27 − 18 = <b>9</b>. Reading a difference straight off a small data set is a skill the NCE paper asks for directly. These figures come from one school council survey and describe that village only.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-068', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:3,
  question:'Why do sociologists say technology and education often act together as forces of change?',
  options:['New tools need new skills, and schooling is what supplies them',
           'New tools are always invented by teachers working in schools',
           'New tools are only sold to people who hold a school certificate',
           'New schools are only built in districts that have new factories'],
  answer:'New tools need new skills, and schooling is what supplies them',
  hint:'Ask what has to happen to the workers before a new machine can actually be used.',
  explanation:'A technology only changes a society if people can operate it, and education is what puts the skills in place. The pair reinforce each other, which is why countries adopting new industries invest in training at the same time.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-069', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:3,
  question:'Why is social change usually slower in a society that has very little contact with other societies?',
  options:['Fewer new ideas arrive to challenge the way things are already done',
           'Fewer children are born there than in a society that trades widely',
           'Fewer people are able to remember how things were done in the past',
           'Fewer laws can be passed in a place that is far from other countries'],
  answer:'Fewer new ideas arrive to challenge the way things are already done',
  hint:'Contact carries something besides goods. What does an isolated society receive less of?',
  explanation:'Contact brings ideas, goods and practices that make existing ways look like choices rather than facts, and that is what starts change. Isolation removes the comparison, so custom goes unquestioned for longer.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-070', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:3,
  question:'How can one single force of social change produce both gains and losses at the same time?',
  options:['Factory work raised incomes while adding pollution and long hours',
           'Factory work raised incomes in one year and lowered them the next',
           'Factory work benefited the owners and had no effect on the workers',
           'Factory work was a gain in the towns and a loss in other countries'],
  answer:'Factory work raised incomes while adding pollution and long hours',
  hint:'Look for the option where the same change brings the good and the bad together, to the same people.',
  explanation:'Industrialisation raised wages, health and schooling and at the same time brought pollution, congestion and long shifts. Weighing both sides of one change is exactly what the syllabus means by analysing its impact.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-071', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:4,
  question:'A bus route is extended to a village in the south. Within five years more of its young people hold jobs in Port Louis and fewer work the land. Which force of change is at work, and how?',
  options:['Improved transport, by putting distant jobs within daily reach',
           'Improved transport, by raising the wages paid in the capital',
           'Legislation, by requiring young people to look for work in towns',
           'Migration, by bringing new residents into the village each year'],
  answer:'Improved transport, by putting distant jobs within daily reach',
  hint:'Nobody in the village moved house. Ask what changed about the journey instead.',
  explanation:'A daily commute that was impossible becomes possible, so the choice of occupation widens without anybody leaving home. It is not migration, because residence did not change, and wages in the capital were the same before the route existed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-072', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:4,
  question:'A village installs free public wifi at its community centre. Within a year the elders complain that far fewer young people sit talking on their doorsteps in the evening. Which reading is soundest?',
  options:['A technological change has altered the way leisure time is spent',
           'A technological change has reduced the number of young residents',
           'The young people have been forbidden to sit outside their houses',
           'The community centre has become the only building with a roof'],
  answer:'A technological change has altered the way leisure time is spent',
  hint:'Nobody left and nobody was stopped. Ask what the evenings are now being spent on.',
  explanation:'The same people are spending the same hours differently, which is a change in social behaviour caused by a new technology. Nothing in the scenario reduces the population or prohibits anything at all.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-073', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:4,
  question:'After a new secondary school opens nearby, the number of girls from a village who complete Grade 9 rises sharply. Which chain of social change does this best illustrate?',
  options:['Access first, then qualifications, then a wider choice of occupations',
           'Access first, then a larger population, then a wider choice of homes',
           'Migration first, then new arrivals, then more places in the classroom',
           'Legislation first, then enforcement, then attendance at a new school'],
  answer:'Access first, then qualifications, then a wider choice of occupations',
  hint:'Follow the order of events. What became possible first, and what does it lead on to?',
  explanation:'Distance was the barrier; removing it raises completion, completion produces certificates, and certificates open occupations. No law was passed here and nobody moved into the village, so the other chains do not fit the evidence.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-074', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:4,
  question:'A government raises the age to which a child must stay in school. A pupil argues that this is not really social change, because nobody\'s mind was altered. Which reply is the soundest?',
  options:['Law changes behaviour first, and expectations usually follow behaviour',
           'Law is not a force of social change because it comes from government',
           'Minds must always be changed before any behaviour can be changed',
           'Changing the school age affects teachers only and not wider society'],
  answer:'Law changes behaviour first, and expectations usually follow behaviour',
  hint:'Ask whether a change has to begin in people\'s heads to count, or whether it can begin with what they do.',
  explanation:'Legislation is one of the standard forces of change precisely because it alters behaviour immediately, and a generation that has stayed at school longer then expects it as normal. Change can run from action to attitude as well as the other way.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-075', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:4,
  question:'A fishing village finds that visitors now hire its boats. Incomes rise, but fewer young people learn to fish. Which statement weighs the change most fairly?',
  options:['The change brought an economic gain together with the loss of a skill',
           'The change brought an economic gain and had no cost of any kind',
           'The change brought only losses, because a tradition was given up',
           'The change brought neither gain nor loss, since the boats remain'],
  answer:'The change brought an economic gain together with the loss of a skill',
  hint:'Two things happened. A fair judgement has to name both of them.',
  explanation:'Higher income and a skill that is no longer being passed on are both real outcomes of the same change. Naming only one of the two — in either direction — is the error the syllabus asks pupils to avoid when they analyse an impact.' }));

// ── social_movements — g9sms-dpf-076 … 091 ────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-076', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:1,
  question:'Which of these is an example of collective behaviour?',
  options:['A crowd gathering in the street to watch a procession',
           'A pupil revising alone at home for a coming examination',
           'A clerk filling in the same form every morning at work',
           'A driver taking the identical route to work each morning'],
  answer:'A crowd gathering in the street to watch a procession',
  hint:'Collective behaviour needs more than one person acting together at the same moment.',
  explanation:'Collective behaviour is the relatively spontaneous action of a group of people together — crowds, panics, fads and rumours. The other three are individual routines, however many people happen to do the same thing separately.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-077', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:1,
  question:'A short-lived craze that spreads very quickly and then disappears again is called a…',
  options:['Fad','Norm','Role','Rule'],
  answer:'Fad',
  hint:'Three of these words are about lasting expectations. One is about something brief.',
  explanation:'A <b>fad</b> is brief and intense, and it passes. A norm, a role and a rule are all lasting expectations a society keeps, which is exactly what a fad is not.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpf-078', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:1,
  question:'An unverified story that passes quickly from person to person is called a ______. Write the missing word.',
  answer:'rumour',
  alsoAccept:['rumor'],
  hint:'It is what spreads when people want information faster than anyone can confirm it.',
  explanation:'A <b>rumour</b> is unverified information spreading through a group, and sociologists treat it as a form of collective behaviour. It can produce real action — a queue, a rush, a panic — long before anybody has checked whether it is true.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-079', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:2,
  question:'What is the difference between a fad and a fashion?',
  options:['A fad passes within weeks; a fashion lasts for seasons or years',
           'A fad is followed by adults; a fashion is followed by children',
           'A fad concerns clothing only; a fashion concerns behaviour only',
           'A fad is planned by a company; a fashion begins among friends'],
  answer:'A fad passes within weeks; a fashion lasts for seasons or years',
  hint:'The two words differ on one measurement, and it is not about who follows them.',
  explanation:'Both are forms of collective behaviour and both spread by imitation; the difference is how long each survives. Age group, subject matter and origin do not separate them — either can concern clothing, speech or objects.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-080', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:2,
  question:'A movement that seeks to overturn the whole social and political order rather than adjust part of it is described as…',
  options:['A revolutionary movement','A resistance movement','A leisure association','A charitable organisation'],
  answer:'A revolutionary movement',
  hint:'Ask how much of the existing order each of these would leave standing.',
  explanation:'A <b>revolutionary</b> movement aims at total change of the system, while a reform movement changes part of it and accepts the rest. A resistance movement is different again: it works to prevent a change that is being proposed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-081', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:2,
  question:'Which of these is a pressure group rather than a social movement?',
  options:['An association of bus operators lobbying about fares',
           'A wide campaign to change attitudes to the environment',
           'A long campaign for equal treatment of men and women',
           'A broad campaign to change how a whole society is run'],
  answer:'An association of bus operators lobbying about fares',
  hint:'Compare how narrow the aim is and how tightly defined the membership is.',
  explanation:'A pressure group has a defined membership and a narrow interest it presses on decision-makers. A social movement is broader and looser: many people, no single membership list, and an aim to change attitudes across a whole society.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-082', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:2,
  question:'At which stage in the life of a social movement does it set up offices, written rules and paid staff?',
  options:['Bureaucratisation','Emergence','Coalescence','Decline'],
  answer:'Bureaucratisation',
  hint:'The word you want is the one used for any body that has grown into an organisation with procedures.',
  explanation:'Movements are commonly described as passing through emergence, coalescence, <b>bureaucratisation</b> and decline. The third stage is where informal enthusiasm becomes an organisation that can survive its founders leaving.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-083', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:2,
  question:'Which of these is NOT collective behaviour, because it is organised and lasting?',
  options:['A registered trade union with a written constitution',
           'A crowd that forms outside a shop after a rumour',
           'A sudden craze for one style of school bag strap',
           'A panic in a hall when a loud noise is first heard'],
  answer:'A registered trade union with a written constitution',
  hint:'Collective behaviour is relatively spontaneous. Which of these was planned and written down?',
  explanation:'A union is a formal institution with rules, officers and continuity. Crowds, fads and panics are spontaneous and short-lived, which is what places them under collective behaviour.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-084', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:3,
  question:'Why is a crowd at a football match not a social movement?',
  options:['It has no shared aim to change society and it does not last',
           'It is too large a group for sociologists to be able to study',
           'It contains people who have arrived from different districts',
           'It has paid to attend, and a movement must always be unpaid'],
  answer:'It has no shared aim to change society and it does not last',
  hint:'Two features define a movement. Check the crowd against both of them.',
  explanation:'A social movement needs a shared goal of change and some continuity over time. A match crowd shares an occasion, not an aim, and disperses when the match ends. Size, origin and ticket price are irrelevant to the definition.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-085', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:3,
  question:'Why do many social movements decline after they have succeeded?',
  options:['The grievance that held the members together has been answered',
           'The members are required by law to disband once they have won',
           'The members lose the right to meet as soon as a law is changed',
           'The leaders are always replaced by officials from the government'],
  answer:'The grievance that held the members together has been answered',
  hint:'Ask what was holding these particular people together in the first place.',
  explanation:'A movement is held together by a shared complaint; remove it and the reason to keep meeting goes with it. Movements also decline through failure, repression or absorption into ordinary politics — but nothing obliges them to disband.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-086', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:3,
  question:'How has social media changed the way a movement gathers support?',
  options:['It spreads a message quickly and cheaply to distant strangers',
           'It guarantees that every message posted will be read and shared',
           'It removes the need for a movement to have any aim in the first place',
           'It obliges a movement to register before it may publish a message'],
  answer:'It spreads a message quickly and cheaply to distant strangers',
  hint:'Compare what it used to cost to reach a thousand people with what it costs now.',
  explanation:'Recruitment once needed meetings, printing and travel; a message now reaches people the organisers have never met, at almost no cost. That changes the speed and reach of a movement, not its need for a purpose.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-087', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:4,
  question:'Residents of a coastal village collect signatures, hold meetings and write to their representative about a blocked drain. Once it is cleared the group stops meeting. Which stage in the life of a movement does this show?',
  options:['Decline, because the aim that held the group together was achieved',
           'Emergence, because the group had only just begun to hold its meetings',
           'Coalescence, because the residents had organised themselves well',
           'Bureaucratisation, because letters and signatures were collected'],
  answer:'Decline, because the aim that held the group together was achieved',
  hint:'Look at the last event in the story, not the first, and ask what it tells you.',
  explanation:'The group forms, organises, succeeds and dissolves — and the ending is what the question asks about. Decline through success is one of the standard routes; it never required the group to have set up offices or paid staff first.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-088', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:4,
  question:'Within a fortnight, pupils at a school all begin carrying their bags on one shoulder. By the following term nobody does. Is this a social movement?',
  options:['No, it is a fad, because it has no aim beyond the style itself',
           'No, it is a norm, because everybody in the school followed it',
           'Yes, it is a movement, because a whole school took part in it',
           'Yes, it is a movement, because the behaviour spread extremely fast'],
  answer:'No, it is a fad, because it has no aim beyond the style itself',
  hint:'Numbers and speed are not the test. Ask what the pupils were trying to change.',
  explanation:'A movement needs a goal of changing something in society; this has none and it vanishes in weeks, which makes it a fad. It is not a norm either — a norm is an expectation that lasts and carries a sanction when it is broken.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-089', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:4,
  question:'A group campaigning for better recycling registers itself, opens a bank account and elects a committee with named officers. Which change has taken place?',
  options:['It has moved from a loose gathering into an organised body',
           'It has moved from an organised body into a loose gathering',
           'It has abandoned its aim in order to become a business firm',
           'It has become a pressure group and given up its wider aim'],
  answer:'It has moved from a loose gathering into an organised body',
  hint:'Three things were set up at once. What do a register, an account and a committee have in common?',
  explanation:'Registration, funds and elected officers are the marks of bureaucratisation — the stage at which a movement acquires structure so that it can outlast its founders. None of those steps changes what the group is campaigning for.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-090', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:4,
  question:'A message saying that a shop will close spreads through a neighbourhood group, and by evening a long queue has formed outside it. Which reading of the queue is soundest?',
  options:['Collective behaviour set off by information that nobody checked',
           'A social movement, because the shoppers all share the same aim',
           'A formal organisation, because the queue has an order of its own',
           'A social norm, because queueing is expected behaviour in a shop'],
  answer:'Collective behaviour set off by information that nobody checked',
  hint:'Trace the queue back to its cause. What kind of information started it?',
  explanation:'A rumour spreading and producing a sudden crowd is the classic pattern of collective behaviour. There is no aim to change society, so it is not a movement, and the queue has no rules, officers or continuity of its own.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-091', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:4,
  question:'Two groups both want the beaches kept clean. One organises weekend clean-ups; the other petitions the council for a new by-law. Which comparison is best supported?',
  options:['They share one aim and pursue it by action and by the law',
           'They share one aim, so one of the two groups is unnecessary',
           'They have different aims, because their methods are different',
           'Only the group petitioning the council is a social movement'],
  answer:'They share one aim and pursue it by action and by the law',
  hint:'Separate what each group wants from how each group is going about getting it.',
  explanation:'Aim and method are different things, and movements commonly pursue one aim by several routes at once — direct action, persuasion and changes to the law. Different methods are not evidence of different goals.' }));

// ── deviance_and_norms — g9sms-dpf-092 … 104 ──────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-092', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:1,
  question:'What is a social norm?',
  options:['A rule of behaviour that a society expects its members to follow',
           'A record of how many members of a society share one occupation',
           'A payment made by a member of a society to the public treasury',
           'A meeting at which the members of a society elect their own leaders'],
  answer:'A rule of behaviour that a society expects its members to follow',
  hint:'The word describes an expectation about conduct, not a number or an event.',
  explanation:'A <b>norm</b> is a shared expectation about how people should behave — queueing, greeting, keeping quiet at night. Norms range from everyday customs through to laws, and breaking one brings a sanction of some kind.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpf-093', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:1,
  question:'A reward or a punishment used by a society to enforce one of its norms is called a ______. Write the missing word.',
  answer:'sanction',
  alsoAccept:['sanctions'],
  hint:'The word covers both the praise for keeping a rule and the penalty for breaking it.',
  explanation:'A <b>sanction</b> may be positive (praise, a prize, approval) or negative (a frown, a fine, exclusion), and formal or informal. Norms are enforced by sanctions; without them, a rule carries nothing behind it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-094', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:2,
  question:'Which of these is a FORMAL sanction?',
  options:['A fine imposed by a court of law','A frown from a passing neighbour','A joke made by a close friend','A silence at the family table'],
  answer:'A fine imposed by a court of law',
  hint:'A formal sanction is applied by an institution following a written rule.',
  explanation:'Formal sanctions come from official bodies under written rules — courts, schools, employers. Frowns, jokes and silences are informal sanctions: real in their effect, but applied by people around us rather than by an institution.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-095', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:2,
  question:'Which statement correctly compares two kinds of norm?',
  options:['Folkways are everyday customs; mores carry strong moral weight',
           'Folkways are written laws; mores are the habits of one family',
           'Folkways apply to adults only; mores apply to children only',
           'Folkways are found in the towns; mores are found in the villages'],
  answer:'Folkways are everyday customs; mores carry strong moral weight',
  hint:'The two differ in how seriously a society treats the breaking of them.',
  explanation:'Folkways are ordinary customs — how to greet, how to queue — and breaking one brings mild disapproval. Mores carry moral force, and breaking one brings strong condemnation. Neither is defined by age or by district.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpf-096', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:2,
  question:'Jumping a queue at a bus stop breaks an everyday custom of good manners rather than a moral rule or a law. What is the name for this weakest kind of norm?',
  answer:'folkway',
  alsoAccept:['folkways'],
  hint:'It is the term for the ordinary customs of daily life, as opposed to mores and laws.',
  explanation:'A <b>folkway</b> is an everyday custom. Breaking one brings mild disapproval — a comment or a look — rather than the strong condemnation attached to mores or the formal penalty attached to a law.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-097', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:2,
  question:'Norms differ between societies. Which example shows this most clearly?',
  options:['Removing shoes indoors is expected in some homes and not in others',
           'Water boils at a lower temperature high up a mountain than at sea level',
           'Children grow taller between the ages of eleven and sixteen years old',
           'Daylight lasts longer in the summer months than in the winter months'],
  answer:'Removing shoes indoors is expected in some homes and not in others',
  hint:'Three of these would be exactly the same in every country on earth.',
  explanation:'A rule about shoes is a norm: it is taught, it varies from place to place, and it can change. Boiling points, growth and daylight are physical facts, identical everywhere, and no society can decide them differently.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-098', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:3,
  question:'Why do sociologists say that deviance is relative?',
  options:['The same act can be judged differently in another place or time',
           'The same act is always judged in the same way everywhere on earth',
           'Only a small number of people in any society ever break a rule at all',
           'Every act that a society disapproves of is also forbidden by its law'],
  answer:'The same act can be judged differently in another place or time',
  hint:'Ask whether an act carries its meaning with it, or takes it from the society judging it.',
  explanation:'Deviance is not a property of the act but of the reaction to it: eating with the fingers, wearing a hat indoors or trading on a Sunday are ordinary in one setting and disapproved of in another. Deviance and crime are also not the same thing.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-099', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:3,
  question:'Why does a society need sanctions as well as norms?',
  options:['A rule with nothing behind it gives no reason for anyone to keep it',
           'A rule cannot be written down until a penalty has first been chosen',
           'A rule applies only to the people who have agreed to accept it first',
           'A rule must be approved by a court before a society can announce it'],
  answer:'A rule with nothing behind it gives no reason for anyone to keep it',
  hint:'Imagine a rule everybody knows and nobody ever responds to. What happens to it?',
  explanation:'Sanctions, from a disapproving look to a court fine, are what give a norm its force and teach the next generation that it matters. Norms are not contracts people opt into, and most are never approved by any court.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-100', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:4,
  question:'A pupil arrives late every morning. The teacher first speaks to him quietly, then writes to his parents, and finally reports him to the rector. What does the sequence show about social control?',
  options:['Informal control is tried first, and formal control follows it',
           'Formal control is tried first, and informal control follows it',
           'Only formal control has been used at any point in the sequence',
           'Social control has failed, because the pupil was still arriving late'],
  answer:'Informal control is tried first, and formal control follows it',
  hint:'Sort the three steps by whether each is a private word or an official act, then look at their order.',
  explanation:'A quiet word is informal; a written report to the rector is formal, and it comes last. Societies and institutions generally escalate in this order, reserving formal sanctions for when informal ones have not worked.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-101', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:4,
  question:'Talking loudly on a bus passes without comment in one country and draws disapproving looks in another. A pupil concludes that the first country has no norms. Why is that conclusion wrong?',
  options:['Both countries have norms; they simply set them in different places',
           'Both countries have norms; the first has not yet written its down',
           'Only the second country has norms, because it applies a sanction',
           'Neither country has norms, because neither made a law about it'],
  answer:'Both countries have norms; they simply set them in different places',
  hint:'Absence of one particular rule is not absence of rules. What would you check to be sure?',
  explanation:'Every society has norms about noise, space and speech; what varies is where the line falls. Nor do norms have to be written or enacted as law — most of the rules people keep every day are neither.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-102', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:4,
  question:'A neighbour plays loud music at midnight. Nobody reports him, but three people mention it to him the next day and it does not happen again. Which kind of social control worked here?',
  options:['Informal control, through the disapproval of the people around him',
           'Formal control, because three separate people raised the matter',
           'Formal control, because playing music at night is against a rule',
           'No control at all, because nothing was reported to any authority'],
  answer:'Informal control, through the disapproval of the people around him',
  hint:'Ask who applied the pressure — an institution acting under a rule, or the people next door?',
  explanation:'Disapproval expressed by neighbours is an informal sanction, and here it was enough on its own. The number of people involved does not make it formal; formal control would have meant a complaint to an official body.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-103', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:4,
  question:'Wearing a cap indoors was once thought rude in many places and now passes without comment. What does this shift best illustrate?',
  options:['Norms change over time, so what counts as deviance changes too',
           'Norms never change, so the original rule must have been imagined',
           'Norms about clothing are the only kind of norm that ever changes',
           'Norms are replaced by laws as soon as a society becomes modern'],
  answer:'Norms change over time, so what counts as deviance changes too',
  hint:'The act stayed the same. Something else moved. What was it?',
  explanation:'The behaviour is unchanged; the reaction to it has moved, which is precisely what is meant by saying deviance is relative to time. Clothing is only one example — norms about work, family and speech shift in the same way.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-104', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:4,
  question:'Every pupil in a Grade 9 class agrees in a discussion that dropping litter is wrong, yet the school yard is littered again by Friday. Which explanation fits best?',
  options:['Knowing a norm and keeping it are not the same thing at all',
           'The pupils were not telling the truth during the class discussion',
           'The class has no norm about litter, whatever its members said',
           'A norm cannot exist at all unless every member of a group keeps it'],
  answer:'Knowing a norm and keeping it are not the same thing at all',
  hint:'A norm can be genuinely shared and still be broken. What would make the difference in practice?',
  explanation:'Conformity depends on sanctions and on whether anyone is watching, not on knowledge alone. A norm that everybody can state and few keep is common, and the usual remedy is to make the sanction more likely rather than the rule better known.' }));

// ── social_mobility — g9sms-dpf-105 … 119 ─────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-105', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:1,
  question:'Moving from one job to another of about the same standing and pay is called…',
  options:['Horizontal mobility','Upward mobility','Downward mobility','International migration'],
  answer:'Horizontal mobility',
  hint:'Picture the move on a diagram. Does the person end up higher, lower, or level?',
  explanation:'<b>Horizontal</b> mobility is a sideways move at the same level. Upward and downward mobility are the two vertical kinds, and migration is a change of residence, which need not change a person\'s standing at all.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpf-106', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:1,
  question:'Movement up or down the social scale, from one position in society to another, is called social ______. Write the missing word.',
  answer:'mobility',
  alsoAccept:['mobility.'],
  hint:'The word is the noun formed from being able to move.',
  explanation:'Social <b>mobility</b> is movement between positions in society. It may be upward or downward, it may happen within one working life or between parents and children, and a society in which a great deal of it occurs is described as open.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-107', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:2,
  question:'What is intergenerational mobility?',
  options:['A change in standing between parents and their own children',
           'A change in standing within one person\'s own working life',
           'A change in standing between two neighbouring households',
           'A change in standing between two districts of the same country'],
  answer:'A change in standing between parents and their own children',
  hint:'The prefix "inter" means between, and the rest of the word tells you between what.',
  explanation:'Intergenerational mobility compares one generation with the next — a labourer\'s daughter who becomes a pharmacist. Change within a single working life is intragenerational mobility, which is a separate measure.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-108', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:2,
  question:'Which route to upward social mobility has mattered most in Mauritius since 1977?',
  options:['Free secondary education, open to every child','Free travel on the buses, offered to students','Free textbooks, issued in the primary schools','Free meals, provided at some of the schools'],
  answer:'Free secondary education, open to every child',
  hint:'Ask which of these actually raised the qualification a school leaver could obtain.',
  explanation:'Free secondary education from <b>1977</b> put certificates within reach of families who could not have paid fees, and that is what opened the professions to children of estate and factory workers. The others reduce the cost of attending but do not extend how far a pupil can go.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-109', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:2,
  question:'Which description fits a society that sociologists call OPEN?',
  options:['One where a person\'s standing can change through their own effort',
           'One where a person\'s standing is settled at birth and stays fixed',
           'One where every person is given precisely the same income to live on',
           'One where every person is free to move to whichever district they like'],
  answer:'One where a person\'s standing can change through their own effort',
  hint:'Open and closed refer to whether the route upward is available, not to borders or to wages.',
  explanation:'An open society permits movement between positions on the basis of achievement; a closed one fixes position at birth. Openness is not the same as equality of income, and it is not about freedom to move house.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-110', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:2,
  question:'Which of these is an example of INTRAgenerational mobility?',
  options:['One person rising from clerk to manager within their working life',
           'One family sending its first member to a university in one decade',
           'One district becoming wealthier than it was a generation ago',
           'One employer raising the wages of every worker on the payroll'],
  answer:'One person rising from clerk to manager within their working life',
  hint:'The prefix "intra" means within. Within what, in this case?',
  explanation:'Intragenerational mobility is measured inside one person\'s own career. Comparing a family with its parents\' generation is intergenerational, and a district or a payroll changing is not individual mobility at all.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-111', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:3,
  question:'Why is education described as the main ladder of social mobility?',
  options:['Qualifications open occupations that birth alone would not reach',
           'Qualifications are handed only to the children of wealthy families',
           'Qualifications guarantee that every school leaver will find a post',
           'Qualifications raise the wage paid for work that needs no training'],
  answer:'Qualifications open occupations that birth alone would not reach',
  hint:'Think about what an employer asks for before a person is allowed into a profession.',
  explanation:'Professional and technical work is gated by certificates, so schooling is the route by which someone born into one position can enter another. It opens a door; it does not guarantee a post, and it changes nothing about unskilled pay.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-112', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:3,
  question:'Why does a closed society show almost no upward mobility?',
  options:['Position is fixed at birth, so effort cannot move anyone upward',
           'Position is decided by examination, so only a few can ever pass',
           'Position is chosen by each adult, so nobody decides to move up',
           'Position is reviewed each year, so any change is quickly undone'],
  answer:'Position is fixed at birth, so effort cannot move anyone upward',
  hint:'Ask what determines a person\'s standing in such a society, and whether they can affect it.',
  explanation:'In a closed system standing is ascribed — inherited and unchangeable — so achievement has nowhere to carry a person. Where position is won by examination, mobility exists even if it is competitive, which is the open pattern.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-113', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:3,
  question:'Why is downward mobility not always the fault of the person who experiences it?',
  options:['A factory closing can end a skilled job through no choice of theirs',
           'A worker who loses a job has usually refused to do what was asked',
           'A worker in any occupation may resign whenever they wish to do so',
           'A factory closing is always announced long before it actually shuts'],
  answer:'A factory closing can end a skilled job through no choice of theirs',
  hint:'Separate what a person decides from what happens to the industry they work in.',
  explanation:'Mobility responds to structural change as well as to individual choices: an industry contracting, a technology replacing a trade, or an economy in recession moves people downward regardless of their effort or conduct.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-114', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:3,
  question:'How can migration produce social mobility?',
  options:['Work abroad may pay far more than the same work pays at home',
           'Work abroad is always of a higher standing than work at home',
           'Work abroad removes the need for any qualification to be held',
           'Work abroad is counted as a promotion by every employer here'],
  answer:'Work abroad may pay far more than the same work pays at home',
  hint:'Ask what changes about a job when it is done in a different economy.',
  explanation:'The same skill can command a much higher wage elsewhere, and remittances can lift a whole household, so moving can raise standing without any change of occupation. But it can also mean taking lower-status work abroad, so migration is not automatically upward.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-115', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:4,
  question:'A market gardener\'s daughter qualifies as a pharmacist and buys a house in Curepipe. Which kind of mobility is this, and measured against whom?',
  options:['Upward and intergenerational, measured against her own parents',
           'Upward and intragenerational, measured against her first post',
           'Horizontal and intergenerational, measured against her parents',
           'Downward and intragenerational, measured against her training'],
  answer:'Upward and intergenerational, measured against her own parents',
  hint:'Two decisions are needed: which direction, and which comparison the scenario actually gives you.',
  explanation:'The comparison offered is with the parents\' occupation, which makes it intergenerational, and the move from market gardening to pharmacy is upward. Nothing is said about her own earlier posts, so no intragenerational claim can be made.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-116', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:4,
  question:'A bank clerk moves to a counter post at the post office on the same salary and the same grade. A pupil calls this upward mobility. Why is that wrong?',
  options:['Nothing about her standing has risen, so the move was sideways',
           'Nothing about her employer has changed, so no move took place',
           'Nothing about her district has changed, so the move does not count',
           'Nothing about her age has changed, so mobility cannot be measured'],
  answer:'Nothing about her standing has risen, so the move was sideways',
  hint:'Compare the two posts on the one measure that decides direction.',
  explanation:'Same grade and same salary means the same position on the social scale, which is horizontal mobility. Her employer did change, but who pays the wage is not what decides whether a move is upward.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-117', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:4,
  question:'A textile firm closes and a supervisor takes a shop job at lower pay. Two years later he is managing that shop. Which description of his path is best?',
  options:['Downward mobility followed by upward mobility, within one career',
           'Downward mobility only, because his first post has not returned',
           'Upward mobility only, because he is now managing an enterprise',
           'Horizontal mobility, because he has held two posts in his career'],
  answer:'Downward mobility followed by upward mobility, within one career',
  hint:'Trace the whole path rather than either end of it, and note that it all happens to one person.',
  explanation:'The path falls and then rises, and both moves happen inside one working life, which makes it intragenerational. Describing only one leg of it loses the point that mobility can run in both directions for the same person.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-118', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:4,
  question:'Two pupils finish Grade 9 with the same marks. One household can pay for a course afterwards and the other cannot. What does this suggest about social mobility?',
  options:['Ability alone does not decide it; resources shape the chances too',
           'Ability alone decides it, since both pupils achieved equal marks',
           'Resources alone decide it, so marks make no difference whatever',
           'Neither ability nor resources matters, because both may yet study'],
  answer:'Ability alone does not decide it; resources shape the chances too',
  hint:'The two pupils are equal on one measure and unequal on another. Which one is about to matter?',
  explanation:'Equal attainment with unequal means produces unequal outcomes, which is why sociologists say no society is perfectly open. Saying resources alone decide is the opposite exaggeration: the marks still had to be earned.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpf-119', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:4,
  question:'A country makes secondary schooling free, and a generation later many more children of manual workers hold professional posts. Which conclusion is best supported?',
  options:['Widening access to education widened intergenerational mobility',
           'Widening access to education raised the pay of all manual workers',
           'Widening access to education removed every barrier to mobility',
           'Widening access to education reduced the need for any training'],
  answer:'Widening access to education widened intergenerational mobility',
  hint:'Note who is being compared with whom, and over what length of time.',
  explanation:'Children ending up in different positions from their parents, after the barrier of fees was removed, is intergenerational mobility. Claiming every barrier has gone is far too strong — cost, distance and family circumstances remain.' }));

})();
