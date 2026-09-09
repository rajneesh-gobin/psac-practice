import json,pathlib,re,hashlib
ROOT=pathlib.Path.cwd(); OUT=ROOT/'docs/book-syllabus-audit'; TMP=ROOT/'tmp/book-audit'
books=json.loads((TMP/'inventory.json').read_text(encoding='utf8')); packs=json.loads((TMP/'app-syllabus.json').read_text(encoding='utf8'))
B={b['audit_id']:b for b in books}; P={p['id']:p for p in packs}; rows=[]
def add(book,pack,data):
 for line in data.strip().splitlines():
  page,title,ids,status,note=line.split('|')
  rows.append(dict(book=book,pack=pack,printed_pages=page,book_topic=title,app_chapters=ids.split(',') if ids!='-' else [],status=status,note=note))
# Each named textbook chapter/theme is represented. Topic-level splits expose otherwise hidden gaps.
add('B04','grade1-maths','''1-25|Home: shapes, colours and numbers|g1mth-shapes,g1mth-numbers,g1mth-patterns|Partial|Basic shapes and counting map; explicitly add colour recognition and sorting by one attribute. Book Part 1 stops at 8; app goes to 20.
26-49|School: numbers, length and time|g1mth-numbers,g1mth-measurement|Partial|Counting and length map. Day/night and morning/afternoon have no explicit Maths syllabus home.
50-64|Games: numbers, shapes and patterns|g1mth-numbers,g1mth-shapes,g1mth-patterns|Partial|Repeating patterns map; app adds odd/even and skip-counting beyond the book objectives.''')
add('B05','grade1-maths','''1-21|Food: shapes, numbers and mass|g1mth-shapes,g1mth-numbers,g1mth-measurement|Partial|Book works to 10 and compares mass. App extends counting to 20; capacity is not established by this book.
22-46|Transport: addition, ordering, ordinals and money|g1mth-addition,g1mth-numbers|Partial|Addition to 10 maps; ordinals to fifth and recognising/decomposing coins to Rs 10 are absent from declared topics.
47-79|Animals: shapes, numbers and measurement revision|g1mth-shapes,g1mth-numbers,g1mth-measurement,g1mth-patterns|Partial|Revisits the same basic scope, including time and money. A subtraction chapter is not supported by the book objectives.''')
add('B11','grade2-maths','''1-19|Shapes|g2mth-shapes|Partial|Book teaches four basic 2D shapes and sorting by two attributes. App instead adds right angles, 3D shapes and symmetry; sorting is not explicit.
20-40|Eleven to nineteen|g2mth-numbers|Matches|Counting, reading and writing numbers sit within Numbers to 100.
41-59|Length|g2mth-measurement|Partial|Book emphasises comparing, estimating and measuring with arbitrary units; app specifies centimetres/metres and conversion.
60-86|Twenty to one hundred|g2mth-numbers|Matches|Number range and ordering align. Odd/even is an app extension, not a listed book outcome.
87-101|Mass|g2mth-measurement|Partial|Book uses comparison and arbitrary units; app specifies kilograms.''')
add('B12','grade2-maths','''1-10|Ordinal numbers|g2mth-numbers|Missing|Ordinals first to twelfth are not declared; cardinal ordering is a different skill.
11-24|Addition|g2mth-addition|Partial|Book explicitly says without carrying. App includes regrouping.
25-43|Subtraction|g2mth-subtraction|Partial|Book explicitly says without borrowing. App includes regrouping.
44-53|Capacity|g2mth-measurement|Partial|Book uses arbitrary units, comparison and estimation; app teaches litres.
54-70|Time|g2mth-time|Partial|Days/months and whole hours align; half past is beyond the book's stated nearest-hour outcome.
71-82|Multiplication|g2mth-multiplication|Partial|Repeated addition and the 2 table align. Book scope is within 20; app adds 5 and 10 tables.
83-102|Money|-|Missing|Recognise/decompose coins and notes, shop and total values up to Rs 100.
103-113|Division|-|Missing|Sharing/dividing numbers up to 20 by 2 has no chapter or subsection.''')
add('B21','grade3-maths','''1-13|Shapes|g3mth-geometry|Partial|Basic 2D shapes map. App adds 3D shapes, angle types, symmetry and area beyond the stated book objectives.
14-22|Pictograms|-|Missing|Read, interpret and create pictograms, including ICT-supported pictograms.
23-50|Numbers 0 to 1000|g3mth-numbers|Partial|Range and ordering align. Add the book's number-pattern objective explicitly; rounding is an app extension.
51-62|Abacus|g3mth-numbers|Partial|Place value aligns but representing two/three-digit numbers on an abacus is not explicit.
63-87|Addition|g3mth-addition|Matches|Two/three-digit addition, carrying and word problems align at declared scope.
88-104|Mass|g3mth-measurement|Partial|kg/g aligns; estimation, comparing, measuring and contextual problems deserve explicit outcomes, beyond conversion alone.
105-130|Subtraction|g3mth-subtraction|Matches|Two/three-digit subtraction, borrowing and word problems align at declared scope.''')
add('B20','grade3-maths','''1-18|Capacity|g3mth-measurement|Partial|Book uses L/cL; app uses L/ml. Add centilitres and practical estimation/measurement.
19-32|Ordinal numbers|g3mth-numbers|Missing|First to twentieth is not specified.
33-40|Roman numerals|-|Missing|Read and write Roman numerals up to XX.
41-66|Multiplication|g3mth-multiplication|Partial|Book multiplies 0-10 by 2, 3, 4 and 5. App requires tables 2-10 and two-digit by one-digit multiplication.
67-86|Length|g3mth-measurement|Partial|m/cm aligns; practical measurement and word problems should be explicit. Perimeter is additional app scope.
87-100|Fractions|g3mth-fractions|Partial|Halves, thirds and quarters map. App adds three-quarters, ordering and equivalent fractions beyond listed book outcomes.
101-119|Time|g3mth-time|Partial|Book specifies hour, half-hour, quarter-hour and a.m./p.m.; app goes to five-minute precision and elapsed time.
120-141|Division|g3mth-division|Partial|Division by 2, 3, 4 and 5 aligns; division by 10 is an extension.
142-163|Money|-|Missing|Coins/notes up to Rs 1000 and contextual money problems are not declared.''')
# Primary English: theme-to-skill mapping, with unit-specific omissions.
for book,grade,units in [
 ('B06',1,[('1-26','Getting started','Alphabet and writing letters map; add an explicit colour-vocabulary list.'),('27-62','Meet Ben','Greetings, family, home and simple oral responses fit the skill strands.'),('63-98','At school','School vocabulary and classroom instructions fit, but the thematic vocabulary is unspecified.'),('99-139',"It’s playtime",'I/you and who are explicit in the book but absent from the declared grammar subtopics.')]),
 ('B07',1,[('1-48','Food, delicious food','What and he/she require explicit grammar outcomes.'),('49-94','Moving around','In/on/under, where and we/they are not explicit grammar outcomes.'),('95-134','Animals','In front of/behind and plural -s are not explicit grammar outcomes.')]),
 ('B14',2,[('1-24','Back to School','Articles, pronouns and punctuation partly align; retain the book-specific structures.'),('25-48','Celebrations','Possessive adjectives, gender and present continuous are not explicit.'),('49-72','Animals','Present continuous, possessives, prepositions and plural forms are not explicit.'),('73-99','Being kind to one another','Prepositions, opposites and conjunction and need explicit coverage.')]),
 ('B13',2,[('1-23','Travel and journeys','Question words and opposites are not explicit; add postcard writing.'),('25-49','Pets','Can/cannot and possessive adjectives need explicit grammar outcomes.'),('51-78','Gardening','Future tense, a/an and plural forms exceed the app’s generic action-word specification.'),('79-107','A world of dreams and magic','Affirmative/negative forms and what/when are not explicit.')]),
 ('B15',3,[('1-24','Welcome to Standard 3','Present continuous and possessive adjectives are not specified; add the letter-writing format.'),('25-44','Food','Articles, affirmative/negative forms and question forms are hidden under general grammar; add recipe writing.'),('45-72','My Country','Plural -s/-es/-ies and and/but/or need explicit outcomes.'),('73-98','Jobs','Future tense and commas map; countability and irregular plurals are not explicit.')]),
 ('B16',3,[('1-30','Superheroes','Simple past partly maps; prepositions and telling time in language contexts are not explicit. Add the short newspaper-article format.'),('31-56','Nature and the Environment','Do/does negatives, gender and possessive pronouns are not explicit.'),('57-84','Travelling the World','Past irregular verbs map; comparative adjectives and postcard writing need explicit coverage.')])]:
  ids=','.join(f'g{grade}eng-{x}' for x in ['listening','speaking','reading','writing','grammar','phonics'])
  for page,title,note in units:
   add(book,f'grade{grade}-english',f'{page}|{title}|{ids}|Partial|Skill strands map across each theme. {note} Phonics needs a book-specific sound inventory; generic strand titles do not prove every sound is covered.')
# Primary French.
for book,grade,units in [
 ('B01',1,[('1-26','La maison','Proper nouns (pp.13-15) are absent from the common-noun-only grammar subsection.'),('27-54','Mon école','Common nouns map; school vocabulary and the named sounds require a checklist.'),('55-80','Les jeux','Singular/plural number (pp.68-70) is not explicit.')]),
 ('B02',1,[('1-30','Les aliments','Articles partly map; check both definite and indefinite forms.'),('31-60','Les transports','Adjectives (pp.47-50) are not a declared grammar subsection.'),('61-88','Les animaux','Gender has some support in grammar notes; animal vocabulary and the full sound sequence remain unspecified.')]),
 ('B08',2,[('1-32','Mes amis','Number/singular-plural is not explicit in grammar.'),('33-62','Les fêtes','Prepositions taught on pp.46-49 have no explicit subsection; the contents page prints an overlapping 46-59 range.'),('63-94','Les voyages','Noun groups have a partial home in noun/determiner and adjectives, but need an explicit combined outcome.')]),
 ('B09',2,[('1-42','Le jardin','Sentence types (declarative/interrogative/exclamative) need explicit coverage beyond punctuation.'),('43-78','Les saisons','Personal pronouns on pp.56-61 are not a declared grammar subsection.'),('79-116','La bande dessinée','Adjectives and feminine agreement map; comic panels/bubbles and the sound contrasts need explicit outcomes. This sixth theme is on the second contents page.')]),
 ('B17',3,[('1-27','C’est la rentrée !','Time reference, capitals and punctuation align at broad scope.'),('29-63','À la bibliothèque de l’école','Negation maps; explicitly name être/avoir forms and c/ç spelling.'),('65-98','Ma localité','Present tense and interrogative sentences map; the sound-cluster sequence is unspecified.')]),
 ('B18',3,[('1-40','Kenzo à Rodrigues','Passé composé maps; possessive adjectives do not have an explicit outcome.'),('41-81','Protégeons la nature','Future forms partly map; plural common nouns, synonyms, antonyms and word families need explicit coverage.'),('83-118','Quand je serai grand…','Future and adjective agreement map; specify first-group verbs and -ail/-aille/-eil/-eille spelling.')])]:
  ids=','.join(f'g{grade}fr-{x}' for x in ['comprehension-orale','expression-orale','lecture','ecriture','grammaire'])
  for page,title,note in units: add(book,f'grade{grade}-french',f'{page}|{title}|{ids}|Partial|Themes distribute across the five skill/grammar strands. {note}')
# Health: every lesson maps to an empty placeholder, not to a substantive syllabus.
health={
 'B03':(1,['Personal Hygiene','My Teeth','Hand Washing','Coughing and Sneezing','Eat a variety of foods','Meals of the day','Food I eat for breakfast, lunch and dinner','Healthy and less healthy foods','Healthy snacks','Eat clean and safe foods','Keeping Safe at School (Outdoors)','Keeping Safe at School (Indoors)','Identifying dangers in the environment'],None),
 'B10':(2,['Good grooming','Dental Care','Hand washing: caring for my hands and nails','Importance of eating','Eat a variety of foods','Sources of food','Breakfast','Lunch','Dinner','Snacks','Safety in the kitchen','Safety in the bedroom','Safety in the living room','Safety on stairs, windows and doors','Safety in the bathroom'],[1,7,12,16,20,22,24,28,29,32,35,37,38,40,41]),
 'B19':(3,['Personal hygiene: daily shower','Personal hygiene: hand washing','Personal hygiene: dental care (1)','Personal hygiene: dental care (2)','Main meals and snacks','The three food groups','Importance of water','Food for energy (1)','Food for energy (2)','Food for growth (1)','Food for growth (2)','Food for health (1)','Food for health (2)'],[1,5,9,13,16,19,21,23,25,26,32,33,35])}
for bid,(g,titles,starts) in health.items():
 for i,title in enumerate(titles):
  page=str(starts[i]) if starts else 'Contents: PDF 7'
  add(bid,f'grade{g}-health',f'{page}|Lesson {i+1}: {title}|-|Missing|The app pack has only Sample Chapter and comingSoon=true; no substantive health syllabus is declared.')
add('B22','grade3-ssee','''1-26|Looking at our Environment|-|Missing|No Grade 3 SSEE, science or social-studies pack.
27-63|Myself and My Family|-|Missing|Language themes about family do not declare these SSEE learning objectives.
65-92|Our Natural Environment|-|Missing|No subject-level destination for the environmental content.
93-124|Living and Non-living Things|-|Missing|No subject-level destination for life-science concepts.''')
add('B23','grade3-ssee','''1-32|My locality|-|Missing|No subject-level destination for locality, services and map work.
33-61|Air around us|-|Missing|No subject-level destination for the science investigations.
62-88|Learning about water|-|Missing|No subject-level destination for water concepts and investigations.
89-116|Our weather|-|Missing|No subject-level destination for the weather content.''')
# Lower secondary Mathematics.
add('B28','grade7-maths','''1-12|1. Numbers, Factors and Multiples|g7m-integers,g7m-factors,g7m-indices|Partial|Number types and prime factorisation map; explicitly add HCF/LCM of two or three numbers and word problems.
13-31|2. Integers|g7m-integers|Partial|Signed numbers and arithmetic align; square roots of square numbers are not explicit.
32-39|3. Order of operations|g7m-operations|Matches|BODMAS and commutative/associative/distributive properties align.
40-65|4. Fractions and decimals|g7m-fractions|Matches|Types, ordering, conversion and four operations align at broad scope.
66-83|5. Angles|g7m-polygons,g7m-constructions|Partial|Construction and polygon angles cover only part. Complementary/supplementary, vertically opposite, corresponding, alternate and co-interior angle rules are absent.
84-95|6. Polygons|g7m-polygons|Matches|Triangles, quadrilaterals, classification and angle calculations align.
96-116|7. Length, Perimeter and Area|g7m-length,g7m-area|Matches|One book chapter is legitimately split into two app chapters.
117-123|8. Percentage|g7m-percentages|Matches|Percentage conversions and contextual calculations align.
124-131|9. Ratio and Proportion|g7m-ratio|Matches|Ratio and direct proportion align.
132-137|10. Indices|g7m-indices|Partial|Book teaches multiplication/division/power laws and zero index; app specifies notation, evaluation and prime-factor index form only.
138-145|11. Money|g7m-money|Matches|Money and currency conversion align; profit/loss/discount are additional app scope relative to this chapter.
146-154|12. Time|g7m-time|Partial|12/24-hour notation and conversions map; GMT/time-zone problems are not explicit.
155-163|13. Speed|g7m-speed|Matches|Average speed and unit conversions align.
164-169|14. Mass|g7m-mass|Matches|mg/g/kg/tonnes, conversions and operations align.
170-186|15. Algebraic expressions and algebraic equations|g7m-algebra,g7m-equations|Partial|Basic expressions/equations map. Add expansion, multiplication/division of algebraic terms and fractions with numerical denominators.
187-193|16. Patterns and Sequences|-|Missing|No Grade 7 sequence topic; listing triangular/square numbers is not the same as completing number/figure patterns.
194-206|17. Coordinates|g7m-coordinates|Partial|Plotting maps; x=h/y=k lines and their intersections are not explicit.
207-220|18. Symmetry|g7m-symmetry|Matches|Line symmetry aligns. Rotational symmetry is extra relative to this chapter.
221-228|19. Geometrical Constructions|g7m-constructions|Partial|Largely aligned; explicitly name perpendicular bisector of a segment, not only perpendicular lines.
229-239|20. Reflection|g7m-transformation|Matches|Reflection maps; translation/congruence should be marked as extensions unless separately sourced.
240-256|21. Sets|g7m-sets|Partial|Notation and Venn diagrams map; cardinality, union/intersection and shading regions need explicit outcomes.
257-269|22. Statistics|g7m-statistics|Matches|Tables, pictograms and bar charts align. Statistical mean is not a listed book outcome here.''')
add('B33','grade8-maths','''1-7|1. Number Sequences|g8m-sequences|Partial|Book specifically teaches Fibonacci and ordered-pair sequences; app does not name either.
8-25|2. Indices|g8m-indices|Partial|Laws and roots overlap; explicitly add negative and unit-fractional indices, beyond whole-number index notation.
26-41|3. Real Numbers|-|Missing|Rational/irrational numbers, recurring decimals, real number line and decimal-place approximation have no declared chapter.
42-52|4. Rate and Proportion|g8m-rate|Partial|Book advances to scale problems and indirect/inverse proportion; app specifies direct proportion.
53-71|5. Personal and Household Finance|g8m-finance|Partial|Simple interest/profit/loss/discount align; commission and percentage increase/decrease need explicit outcomes.
72-86|6. Coordinates|g8m-coordinates|Partial|Linear plotting aligns. Add graphical intersections; coordinate midpoint is not a listed chapter outcome.
87-98|7. Pythagoras Theorem|-|Missing|Use the theorem to find an unknown side of a right triangle.
99-108|8. HCF of Algebraic Terms and Factorisation|g8m-algebra|Partial|Generic factorisation overlaps; HCF of terms and factorisation by grouping need explicit coverage.
109-121|9. LCM of Algebraic Terms and Algebraic Fractions|g8m-algebra|Partial|Simplifying fractions overlaps; LCM and four operations on algebraic fractions are not specified.
122-150|10. Statistics|g8m-statistics|Matches|Pie charts and mean/median/mode align at declared scope.
151-164|11. Algebraic Equations|g8m-algebra|Partial|App mentions equations with brackets, but has no equation subsection and omits the book's rational coefficients and algebraic-fraction equations.
165-179|12. Inequalities|-|Missing|Linear inequalities, their solutions and number-line representation.
180-195|13. Surface Area and Volume|g8m-surface-area,g8m-volume|Matches|Cube/cuboid nets, area and volume align through two app chapters. General non-rectangular prisms are not established here.
196-229|14. Circle|g8m-circles|Partial|Basic circumference/area align; arcs, sectors, chord calculations and sector perimeter/area are not explicit.
230-244|15. Polygons|g8m-polygons|Matches|Interior/exterior angle sums and regular polygons align.
245-253|16. Sets|-|Missing|Two-set survey problems, union/intersection/complement and cardinality.
254-266|17. Construction of triangles|-|Missing|Construct equilateral/isosceles triangles, triangles from three sides or one side and two angles.''')
# Secondary English.
for bid,g,units in [
 ('B24',7,[('1-23','Entertainment','Countability, tenses and prepositions overlap. Application forms, comic writing and /th/ pronunciation are not explicit outcomes.'),('25-46','Going Green','Continuous tenses are hidden under generic verb tenses; homonyms and named narrative/poster formats are not explicit.'),('47-69','Caring for Animals','Indefinite pronouns and forming nouns from verbs are not declared. Present perfect is only implicit in main tenses.'),('71-100','Log on!','Adjective formation maps; past perfect, diary entries and email format need explicit outcomes.'),('101-127','Discovering the World','Articles and subject-verb agreement map; brochure, letter and sentence-transformation requirements are unspecified.'),('129-151','A glimpse of the Past','Adverbs map; phrasal verbs and future conditional are not explicit. Conjunctions have only a partial home in sentence structure.')]),
 ('B29',8,[('1-31','Let’s Bond','Noun phrases/prepositions map. Book teaches present perfect continuous; app names present perfect and future continuous instead.'),('33-60','Let’s Laugh','Ellipsis, direct speech and articles map; past perfect continuous is not named in the app.'),('61-88','Let’s Explore','Participial adjectives and reported speech map; interrogative pronouns are not declared.'),('89-117','Let’s Create','Active/passive voice, adverbs of probability/duration and forming verbs from nouns/adjectives are not explicit.'),('119-145','Let’s Imagine','Modals and past conditional map; adjective formation appears in prose but is not a dedicated subsection.'),('147-171','Let’s Respect Each Other','Gerunds and adjective-to-adverb conversion map. Phrasal verbs, passive sentence writing and the full conjunction scope are not explicit.')])]:
 ids=','.join(c['id'] for c in P[f'grade{g}-english']['chapters'])
 for page,title,note in units: add(bid,f'grade{g}-english',f'{page}|{title}|{ids}|Partial|Listening/speaking/reading/writing strands span this unit. {note}')
add('B27','grade7-french','''1-16|1. J’apprends à apprendre|g7fr-ce,g7fr-ee|Partial|Dictionary use, interpreting instructions, study strategies and punctuation need explicit outcomes.
17-42|2. J’apprécie la langue française|g7fr-ce,g7fr-eo,g7fr-ee|Partial|Reading/questions overlap. Sentence types and affirmative/negative forms have no explicit grammar destination.
43-58|3. J’apprends à aimer la grammaire|g7fr-ee|Partial|Generic correct syntax is not an explicit syllabus for subject analysis, nouns, gender and number.
59-80|4. J’apprends à écouter|g7fr-co,g7fr-eo|Partial|Listening maps. Determiners, noun groups and adjective agreement taught inside the unit are not declared.
81-94|5. J’apprends à lire|g7fr-ce,g7fr-litterature,g7fr-ee|Partial|Reading/literary work maps. Name the narrative/descriptive writing and dictation outcomes.
95-114|6. J’apprends à parler|g7fr-eo,g7fr-co|Partial|Oral skills map; retain the embedded grammar as explicit outcomes rather than losing it under oral practice.
115-142|7. J’apprends à écrire|g7fr-ee|Partial|Writing maps broadly; conjugation, verb groups and sentence-analysis requirements are not specified.
143-164|8. Je lis les images|g7fr-ce,g7fr-litterature|Partial|General comprehension/BD is insufficient to declare image type, context, purpose, framing, colour and interpretation.
165-174|Activités complémentaires|g7fr-ee,g7fr-ce|Partial|Consolidation needs links back to the specific grammar and language outcomes.
175-183|Tableaux de conjugaison|-|Missing|No explicit conjugation syllabus; reference tables should be indexed by required tense/verb group.''')
add('B32','grade8-french','''2-4|Sujets pour l’oral|g8fr-co,g8fr-eo|Matches|Oral discussion has a clear skill-level home.
5-22|1. Le texte conversationnel|g8fr-ce,g8fr-eo,g8fr-ee,g8fr-litterature|Partial|Text-type skills overlap, but conversation structure and embedded grammar are not specified.
23-40|2. Le texte narratif|g8fr-ce,g8fr-ee,g8fr-litterature|Partial|Narrative analysis/production overlap broadly; noun-group expansion and detached expansions have no grammar outcome.
41-60|3. Le texte descriptif|g8fr-ce,g8fr-ee|Partial|Description overlaps broadly; colour-adjective agreement and verbal-group expansion are not declared.
61-84|4. Études pratiques|g8fr-ce,g8fr-ee,g8fr-litterature|Partial|Summary explicitly maps. Mixed narrative/descriptive/dialogue work and COD/COI expansion need explicit outcomes.
85-100|5. Raconter au présent|g8fr-ce,g8fr-ee|Partial|Writing is generic; narrative uses of present tense and circumstantial complements are not specified.
101-110|J’évalue mes connaissances|g8fr-ce,g8fr-ee,g8fr-litterature|Partial|Assessment consolidates detailed grammar absent from the app's five-strand syllabus.
111-112|L’accord du participe passé|-|Missing|Agreement without auxiliary, with être/avoir and pronominal verbs has no explicit syllabus outcome.
113-121|Tableaux de conjugaison|-|Missing|No explicit tense/conjugation inventory corresponding to these reference tables.''')
# Science: distinguish broad alignment from omitted objectives.
add('B25','grade7-science','''1-32|1. Measurement in Science|g7s-measurement,g7s-inquiry|Partial|Core quantities/instruments align; explicitly add irregular-volume displacement, pendulum period, light-years and data logging.
33-58|2. Cells and Characteristics of Living Things|g7s-cells|Matches|Cells, microscope use, plant/animal comparison, organisation and living characteristics align in prose.
59-94|3. Everything is about Matter|g7s-matter,g7s-changes|Matches|States/particle models and physical/chemical changes map across two app chapters.
95-128|4. Elements, Compounds and Mixtures|g7s-elements,g7s-changes,g7s-sts|Partial|Main scope maps; periods/groups and named compound/mixture constituents should be explicit.
129-160|5. Solar System and Energy|g7s-solar-system,g7s-energy,g7s-sts|Matches|A combined book unit is validly split in the app.
161-196|6. Ecosystem|g7s-ecosystem,g7s-food-chains,g7s-inquiry|Partial|Ecology and food webs map; quadrat-based counting and recording is not named.
197-222|7. Air|g7s-air,g7s-changes|Partial|Composition and gas preparation/tests map; gas uses, water-vapour evidence and air's roles need explicit coverage.
223-254|8. Biodiversity|g7s-biodiversity|Matches|Five-group classification, vertebrates/invertebrates and plant classification align.
255-274|9. Electricity|g7s-electricity|Matches|Components, circuit diagrams and simple investigations align.''')
add('B30','grade8-science','''1-24|1. Measurement in Science|g8s-inquiry|Partial|Volume/density align; accuracy/zero-error handling and density comparisons need explicit outcomes.
25-50|2. Food and Nutrients|g8s-food|Partial|Nutrients, tests, balanced diet and deficiency diseases map in prose. Name the practical food tests in subsections.
51-82|3. Mixtures and Separation Techniques|g8s-mixtures,g8s-magnetism|Partial|Main techniques map; solutions vs suspensions, magnetic separation, alloys and their composition are not explicit in the mixtures syllabus.
83-120|4. Forces and Pressure around us|g8s-forces,g8s-pressure,g8s-magnetism|Partial|Main force/pressure scope aligns. Explicitly include W=mg, friction and force effects; magnetic force is present, so magnetism is not wholly app-only.
121-160|5. Digestive and Respiratory Systems|g8s-digestive,g8s-respiratory|Partial|Two valid app chapters. Teeth/mechanical digestion, peristalsis, liver/pancreas roles need explicit outcomes; app's comparative-organism respiration is not a listed human-system outcome.
161-200|6. The Language of Chemistry|g8s-chem-language|Partial|Symbols, formulae, valencies and radicals map. Book specifies word equations; app adds balancing chemical equations without support found in this book.
201-240|7. Work, Energy and Power|g8s-work-energy|Partial|Work and power map. Kinetic and gravitational potential energy calculations are explicit in the book but not in app prose/subsections.
241-282|8. Acids, Bases and Salts|g8s-acids,g8s-sts|Partial|Core reactions/neutralisation map; pH, alkalis, carbonate reactions, named indicators and hydrogen test need an explicit checklist.
283-306|9. Communicable and Non-Communicable Diseases|g8s-diseases,g8s-sts|Partial|Broad disease/prevention scope maps; identify influenza, diabetes and smoking as the book's specific examples.''')
# SMS: subtopics expose the details hidden by three broad book units.
add('B26','grade7-social-modern-studies','''1-30|Unit 1 Topic 1: Our Islands|g7sms-islands|Matches|Republic's islands, location and island types align at broad scope.
31-58|Unit 1 Topic 2: Trade in the Indian Ocean: Migration and Settlement|g7sms-origins|Partial|Historical significance/origins give an umbrella, but Indian Ocean trade and migration sequence are not explicit.
59-78|Unit 1 Topic 3: Our Origins|g7sms-origins|Matches|Origins, cultural diversity, heritage and identity align.
81-92|Unit 2: The Pioneers|g7sms-people|Matches|Contributions of Mauritians/groups align at broad scope.
93-98|Unit 2: The making of modern Mauritius|g7sms-people|Partial|Contributions provide an umbrella; historical nation-building content is not separately specified.
101-118|Unit 3 Topic 1: Settlements in our islands|g7sms-settlement|Matches|Settlement factors and evolution align.
119-128|Unit 3 Topic 2: Natural resources|g7sms-resources|Matches|Meaning, types and local resources align.
129-146|Unit 3 Topic 3: Water as a natural resource|g7sms-resources|Partial|Generic natural resources is insufficiently specific for sources, reservoirs, distribution and conservation.''')
add('B31','grade8-social-modern-studies','''1-30|Unit 1 Topic 1: Trade and Colonisation|g8sms-slavery,g8sms-independence|Matches|Slavery, abolition, indenture and colonial context map across chapters.
31-36|Unit 1 Topic 2: Mauritian Population in the Nineteenth Century|g8sms-society|Partial|Nineteenth-century society appears in prose under a chapter titled 1920s-1960s; clarify chronology and population content.
37-48|Unit 1 Topic 3: World Wars and their impact on Mauritius|g8sms-society,g8sms-independence|Partial|Post-WW1 conditions and decolonisation overlap; the World Wars and local consequences are not fully named.
49-55|Unit 1 Topic 4: The Struggle for Independence|g8sms-independence|Matches|Political awareness, movements and decolonisation align.
59-64|Unit 2 Topic 1: Global Warming|g8sms-climate|Matches|Causes/consequences align.
65-73|Unit 2 Topic 2: Our Changing Climate|g8sms-climate|Matches|Climate impacts on the islands align.
75-81|Unit 2 Topic 3: Adaptation and Mitigation|g8sms-climate|Matches|Adaptation, mitigation and responses align.
85-113|Unit 3 Topic 1: The Republic of Mauritius|g8sms-democracy|Matches|Constitution, government and civic institutions align broadly.
114-125|Unit 3 Topic 2: Origin of Democracy|g8sms-democracy|Partial|Features of democracy overlap; ancient Greek origins and historical development are not explicit.''')
# Additional contents pages and supporting material checked beyond the first contents page.
add('B24','grade7-english','''153-178|Focusing on our Wellbeing|g7eng-listening,g7eng-speaking,g7eng-reading,g7eng-writing,g7eng-gr-verbs,g7eng-gr-adverbs,g7eng-gr-modals,g7eng-gr-determiners|Partial|Adverbs, modals and determiners overlap. Present conditional, recipe/magazine writing and word stress need explicit outcomes.
179-186|Appendices: listening transcripts|g7eng-listening|Matches|Supporting material for the seven units; this is not an extra chapter requirement.''')
add('B29','grade8-english','''172-177|Appendices: listening transcripts|g8eng-listening|Matches|Supporting material for the six units; not a separate content gap.''')
add('B04','grade1-maths','''65-67|Annex: memory game|g1mth-shapes,g1mth-patterns|Matches|Supporting game material following the Games unit.''')
add('B05','grade1-maths','''80|IT Pack|g1mth-shapes,g1mth-numbers|Partial|Linked digital consolidation resources; does not establish coverage of a standalone ICT syllabus.''')
add('B33','grade8-maths','''267-282|Additional problems for practice|g8m-sequences,g8m-indices,g8m-rate,g8m-finance,g8m-coordinates,g8m-algebra,g8m-statistics,g8m-circles,g8m-polygons,g8m-surface-area,g8m-volume|Partial|Mixed revision inherits the chapter gaps identified above; it is not an additional syllabus chapter.''')
unit_grammar={
 'B24':[['verbs','nouns','prepositions'],['verbs','prepositions','punctuation'],['pronouns','nouns','verbs'],['verbs','adjectives','sentence'],['nouns','verbs','determiners','sentence'],['verbs','adverbs','sentence']],
 'B29':[['verbs','prepositions','nouns','sentence'],['verbs','punctuation','sentence','determiners'],['pronouns','adjectives','sentence'],['verbs','adverbs','sentence'],['adverbs','adjectives','modals','sentence'],['adverbs','nouns','verbs','sentence']]
}
for bid,grammar in unit_grammar.items():
 g=7 if bid=='B24' else 8
 target=[r for r in rows if r['book']==bid][:len(grammar)]
 for r,groups in zip(target,grammar):
  r['app_chapters']=[f'g{g}eng-{x}' for x in ['listening','speaking','reading','writing']]+[f'g{g}eng-gr-{x}' for x in groups]
for bid,extra in {'B09':[6],'B15':[10],'B16':[8],'B24':[11]}.items():
 B[bid]['toc_pdf_pages']=sorted(set(B[bid]['toc_pdf_pages']+extra))
# Persist only audit results, not textbook copies.
OUT.mkdir(exist_ok=True,parents=True)
(OUT/'chapter-mapping.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf8')
(OUT/'app-syllabus-snapshot.json').write_text(json.dumps(packs,ensure_ascii=False,indent=2),encoding='utf8')
for b in books:
 b['file']=str(pathlib.Path(b['file']).as_posix()); b.pop('text',None)
 b['sha256']=hashlib.sha256((ROOT/b['file']).read_bytes()).hexdigest()
(OUT/'book-inventory.json').write_text(json.dumps(books,ensure_ascii=False,indent=2),encoding='utf8')
# Verify all mapped app ids against the captured manifest, and every source is represented.
for r in rows:
 assert r['book'] in B
 if r['app_chapters']:
  assert r['pack'] in P
  valid={c['id'] for c in P[r['pack']]['chapters']}
  assert set(r['app_chapters'])<=valid,(r,valid)
assert {r['book'] for r in rows}==set(B)
print(json.dumps({'books':len(books),'pdf_pages':sum(b['pages'] for b in books),'app_packs':len(packs),'app_chapters':sum(len(p['chapters']) for p in packs),'mapping_rows':len(rows)},indent=2))
