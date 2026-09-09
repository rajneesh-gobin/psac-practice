'use strict';
(function () {

// Grade 3 SSEE — Unit 5: My Locality
// Source: MIE SSEE Grade 3 Part 2 pp.1-32
// IDs: g3ssee-loc-001 onwards

// ── places_in_locality (001-030) ──────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3ssee-loc-001', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'Where would you go if you were very sick and needed a doctor?',
    options:['Hospital','Market','Bank','Post office'],
    answer:'Hospital',
    hint:'This place provides medical care.',
    explanation:'You would go to the <b>hospital</b> to receive medical treatment when you are sick. Doctors and nurses work there to care for patients.' }),

  makeMCQ({ id:'g3ssee-loc-002', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'Where do people go to buy fresh fruit and vegetables?',
    options:['Market','Hospital','Post office','Bus station'],
    answer:'Market',
    hint:'This is a place where goods are sold.',
    explanation:'People go to the <b>market</b> to buy fresh fruit, vegetables, fish and other food items. Mauritius has famous markets like the Central Market in Port Louis.' }),

  makeMCQ({ id:'g3ssee-loc-003', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'Where would you send a letter or parcel to a friend in another part of Mauritius?',
    options:['Post office','Market','Hospital','School'],
    answer:'Post office',
    hint:'Letters and parcels are handled here.',
    explanation:'You would go to the <b>post office</b> to send letters, parcels and packages. Post offices also sell stamps and provide other postal services.' }),

  makeMCQ({ id:'g3ssee-loc-004', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'Where would a person go to save money or take out money?',
    options:['Bank','Hospital','Market','School'],
    answer:'Bank',
    hint:'This place keeps your money safely.',
    explanation:'A <b>bank</b> is a place where people save money, take out money and borrow money. Banks also offer services like paying bills.' }),

  makeMCQ({ id:'g3ssee-loc-005', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'Where would you wait to catch a bus to travel to another town?',
    options:['Bus station','Hospital','School','Market'],
    answer:'Bus station',
    hint:'Buses start and stop at this place.',
    explanation:'A <b>bus station</b> is where buses arrive and depart. Passengers wait there to catch buses to travel around Mauritius.' }),

  makeMCQ({ id:'g3ssee-loc-006', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'Where do children go to learn and study?',
    options:['School','Bank','Post office','Bus station'],
    answer:'School',
    hint:'You go here Monday to Friday.',
    explanation:'Children go to <b>school</b> to learn subjects like Maths, English, French, Science and SSEE.' }),

  makeMCQ({ id:'g3ssee-loc-007', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'What is a LOCALITY?',
    options:['The area where you live, including its places and features','The name of your school subject','A type of animal','A weather instrument'],
    answer:'The area where you live, including its places and features',
    hint:'Think about your neighbourhood.',
    explanation:'A <b>locality</b> is the area around where you live — your neighbourhood, town or village, including its places such as a market, school, hospital and roads.' }),

  makeTF({ id:'g3ssee-loc-008', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'A playground is a place in the community where children can play safely.',
    answer:true,
    explanation:'Yes! A <b>playground</b> is a designated area — often in or near a school or park — where children can play games and exercise safely.' }),

  makeMCQ({ id:'g3ssee-loc-009', chapterId:'g3ssee-locality', difficulty:2, subsection:'places_in_locality',
    question:'Which of the following places is found in most towns and villages in Mauritius?',
    options:['A temple, mosque or church','An airport','A harbour with large ships','A snow mountain'],
    answer:'A temple, mosque or church',
    hint:'Mauritius is a multicultural country with many religions.',
    explanation:'Because Mauritius is multicultural, most towns and villages have places of worship — <b>temples</b> (Hindu), <b>mosques</b> (Muslim), <b>churches</b> (Christian) and others.' }),

  makeMCQ({ id:'g3ssee-loc-010', chapterId:'g3ssee-locality', difficulty:2, subsection:'places_in_locality',
    question:'Ali\'s father works in a place where he stamps passports and checks people arriving in Mauritius. Where does he work?',
    options:['Airport','Hospital','Market','Post office'],
    answer:'Airport',
    hint:'People travel to and from other countries through this place.',
    explanation:'Ali\'s father works at the <b>airport</b> — the Sir Seewoosagur Ramgoolam (SSR) International Airport, where passports are checked for people entering or leaving Mauritius.' }),

  makeMCQ({ id:'g3ssee-loc-011', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'Which of these is a GREEN space in a locality where people relax and children play?',
    options:['A park','A bank','A hospital ward','A bus station'],
    answer:'A park',
    hint:'This is an outdoor area with grass and trees.',
    explanation:'A <b>park</b> is a green outdoor space in a community where people can relax, walk and children can play.' }),

  makeMCQ({ id:'g3ssee-loc-012', chapterId:'g3ssee-locality', difficulty:2, subsection:'places_in_locality',
    question:'Priya needs to buy bread and milk near her home. Which type of place should she go to?',
    options:['A shop or supermarket','A hospital','A post office','A bus station'],
    answer:'A shop or supermarket',
    hint:'Food and everyday products are sold here.',
    explanation:'Priya should go to a <b>shop or supermarket</b> to buy everyday items like bread and milk.' }),

  makeTF({ id:'g3ssee-loc-013', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'The fire station is a place in the community where firefighters work.',
    answer:true,
    explanation:'Yes! The <b>fire station</b> is where firefighters and their vehicles are based, ready to respond to fires and emergencies in the community.' }),

  makeMCQ({ id:'g3ssee-loc-014', chapterId:'g3ssee-locality', difficulty:2, subsection:'places_in_locality',
    question:'Which of these places provides an EMERGENCY service to the community?',
    options:['Police station','Market','Library','Playground'],
    answer:'Police station',
    hint:'This place maintains law and order.',
    explanation:'The <b>police station</b> provides an emergency service — police officers respond to crimes, accidents and emergencies to keep the community safe.' }),

  makeMCQ({ id:'g3ssee-loc-015', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'What type of place in a locality provides books for people to read and borrow?',
    options:['Library','Post office','Bank','Bus station'],
    answer:'Library',
    hint:'Books are kept here and can be borrowed.',
    explanation:'A <b>library</b> is a place where books and other resources are kept. People can borrow books for free for a set period of time.' }),

// ── services (016-045) ────────────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-loc-016', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'What service does a HOSPITAL provide?',
    options:['Medical care and treatment for sick people','Selling food and vegetables','Sending letters and parcels','Keeping money safe'],
    answer:'Medical care and treatment for sick people',
    explanation:'A <b>hospital</b> provides <b>medical care and treatment</b> — doctors, nurses and other health professionals work there to help sick and injured people.' }),

  makeMCQ({ id:'g3ssee-loc-017', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'What service does a POST OFFICE provide?',
    options:['Sending and receiving letters, parcels and stamps','Banking services','Medical treatment','Public transport'],
    answer:'Sending and receiving letters, parcels and stamps',
    explanation:'The <b>post office</b> provides postal services — accepting and delivering letters and parcels, selling stamps and offering some financial services.' }),

  makeMCQ({ id:'g3ssee-loc-018', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'What service does a BANK provide to individuals in the community?',
    options:['A safe place to keep money and access financial services','Food and drink','Medical check-ups','Stamp collecting'],
    answer:'A safe place to keep money and access financial services',
    explanation:'A <b>bank</b> provides financial services — keeping money safely in accounts, lending money, paying bills and converting currencies.' }),

  makeTF({ id:'g3ssee-loc-019', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'A bus station provides a transport service to help people travel around Mauritius.',
    answer:true,
    explanation:'Yes! The <b>bus station</b> provides a <b>public transport service</b> — buses connect different towns and villages, helping people travel around Mauritius.' }),

  makeMCQ({ id:'g3ssee-loc-020', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'Why are community services important?',
    options:['They meet the needs of people in the community and improve quality of life','They are only for rich people','They are not needed in modern society','They are only for children'],
    answer:'They meet the needs of people in the community and improve quality of life',
    explanation:'Community services — schools, hospitals, banks, post offices and transport — are essential because they <b>meet the needs of people</b> and make daily life better for everyone.' }),

  makeMCQ({ id:'g3ssee-loc-021', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'A family in Mauritius cannot read or write. Which community service would help them most?',
    options:['School or adult literacy programme','A bank','A post office','A bus station'],
    answer:'School or adult literacy programme',
    hint:'Which service helps people learn to read and write?',
    explanation:'A <b>school</b> or adult literacy programme helps people learn to read and write — an essential life skill for participating fully in society.' }),

  makeMCQ({ id:'g3ssee-loc-022', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'Riya\'s grandmother is very ill at home. Which community service should Riya\'s family use?',
    options:['Medical services (ambulance / hospital)','Post office','Bank','Bus station'],
    answer:'Medical services (ambulance / hospital)',
    explanation:'For a medical emergency, Riya\'s family should call the <b>ambulance</b> or take the grandmother to the <b>hospital</b> for medical care.' }),

  makeMCQ({ id:'g3ssee-loc-023', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'Ali wants to send a birthday card to his cousin in Rodrigues. Which service should he use?',
    options:['Post office','Bank','School','Hospital'],
    answer:'Post office',
    explanation:'Ali should go to the <b>post office</b> to post the birthday card. Letters and parcels to Rodrigues are sent by postal service.' }),

  makeTF({ id:'g3ssee-loc-024', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'Police officers provide a safety service to protect the community.',
    answer:true,
    explanation:'Yes! <b>Police officers</b> protect people and property, enforce laws and respond to emergencies, providing an essential safety service to the community.' }),

  makeMCQ({ id:'g3ssee-loc-025', chapterId:'g3ssee-locality', difficulty:3, subsection:'services',
    question:'A new family moves into a neighbourhood with no school nearby. What problem will their children face?',
    options:['The children will have no place to receive education','The family will have no food','The family cannot travel by bus','The children cannot visit the market'],
    answer:'The children will have no place to receive education',
    explanation:'Without a nearby school, the children will have difficulty accessing <b>education</b> — a fundamental need. This shows why schools are essential community services.' }),

  makeMCQ({ id:'g3ssee-loc-026', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'What is the role of a MARKET in the community?',
    options:['A place to buy and sell goods including food','A place to save money','A place for medical treatment','A place to catch buses'],
    answer:'A place to buy and sell goods including food',
    explanation:'A <b>market</b> is a place in the community where people buy and sell goods — especially fresh food like vegetables, fish and fruits.' }),

  makeMCQ({ id:'g3ssee-loc-027', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'Which of these describes a service that EDUCATORS provide?',
    options:['Teaching children to read, write, count and understand the world','Keeping money safe in a vault','Treating sick patients','Sorting letters for delivery'],
    answer:'Teaching children to read, write, count and understand the world',
    explanation:'<b>Educators (teachers)</b> provide the service of education — teaching children skills and knowledge that prepare them for life.' }),

  makeTF({ id:'g3ssee-loc-028', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'Community services are only for adults.',
    answer:false,
    explanation:'Community services are for <b>everyone</b>. Schools, playgrounds, libraries and hospitals serve both children and adults.' }),

  makeMCQ({ id:'g3ssee-loc-029', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'If a fire breaks out in a house, which service should you call FIRST?',
    options:['Fire brigade (sapeurs-pompiers)','The market','The school','The post office'],
    answer:'Fire brigade (sapeurs-pompiers)',
    hint:'This service puts out fires.',
    explanation:'In case of a fire, you must call the <b>fire brigade (sapeurs-pompiers)</b> immediately. In Mauritius the emergency number is 115 for the fire service.' }),

  makeMCQ({ id:'g3ssee-loc-030', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'Sam collects letters from his neighbours and brings them to the post office for posting. What role is Sam playing?',
    options:['Helping the community use the postal service','Running a hospital','Teaching at school','Working at the market'],
    answer:'Helping the community use the postal service',
    explanation:'Sam is helping his neighbours access the <b>postal service</b> by collecting and bringing their letters to the post office.' }),

// ── maps_directions (031-075) ─────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-loc-031', chapterId:'g3ssee-locality', difficulty:1, subsection:'maps_directions',
    question:'What is a MAP?',
    options:['A drawing that shows an area from above, with symbols and labels','A list of food items to buy at the market','A timetable for the bus station','A recipe for cooking'],
    answer:'A drawing that shows an area from above, with symbols and labels',
    hint:'You use this to find your way around an area.',
    explanation:'A <b>map</b> is a flat drawing (or diagram) that shows an area as if viewed from above, using symbols, labels and a key to represent features.' }),

  makeMCQ({ id:'g3ssee-loc-032', chapterId:'g3ssee-locality', difficulty:1, subsection:'maps_directions',
    question:'What are the four main compass directions?',
    options:['North, South, East, West','Up, Down, Left, Right','Forward, Backward, Left, Right','Above, Below, Near, Far'],
    answer:'North, South, East, West',
    hint:'Think of the acronym NEWS: N-E-W-S.',
    explanation:'The four main compass directions are <b>North (N), South (S), East (E) and West (W)</b>.' }),

  makeTF({ id:'g3ssee-loc-033', chapterId:'g3ssee-locality', difficulty:1, subsection:'maps_directions',
    question:'The top of a map usually represents the North direction.',
    answer:true,
    explanation:'Yes! By convention, the <b>top of a map</b> represents North. South is at the bottom, East is to the right and West is to the left.' }),

  makeMCQ({ id:'g3ssee-loc-034', chapterId:'g3ssee-locality', difficulty:1, subsection:'maps_directions',
    question:'If North is at the top of a map, what direction is at the BOTTOM?',
    options:['South','East','West','North'],
    answer:'South',
    hint:'Opposite of North.',
    explanation:'<b>South</b> is at the bottom of a map. North is at the top; East is to the right; West is to the left.' }),

  makeMCQ({ id:'g3ssee-loc-035', chapterId:'g3ssee-locality', difficulty:2, subsection:'maps_directions',
    question:'On a map, the school is to the RIGHT of the market. Which direction is the school from the market?',
    options:['East','West','North','South'],
    answer:'East',
    hint:'On a standard map, right = East.',
    explanation:'On a map with North at the top, <b>right = East</b>. So the school is to the <b>East</b> of the market.' }),

  makeMCQ({ id:'g3ssee-loc-036', chapterId:'g3ssee-locality', difficulty:2, subsection:'maps_directions',
    question:'What does a MAP KEY (legend) tell you?',
    options:['What the symbols on the map mean','The name of the map maker','How to cook food from the area','The history of the locality'],
    answer:'What the symbols on the map mean',
    hint:'The key explains the pictures and colours used on the map.',
    explanation:'A <b>map key (legend)</b> explains the symbols, colours and shapes used on the map — for example, a blue line = river; a red dot = town.' }),

  makeMCQ({ id:'g3ssee-loc-037', chapterId:'g3ssee-locality', difficulty:1, subsection:'maps_directions',
    question:'On a map, a blue wavy line usually represents ___.',
    options:['A river or stream','A road','A building','A forest'],
    answer:'A river or stream',
    hint:'Blue usually represents water on maps.',
    explanation:'On most maps, a <b>blue wavy line</b> represents a river or stream. Blue is the conventional colour for water on maps.' }),

  makeMCQ({ id:'g3ssee-loc-038', chapterId:'g3ssee-locality', difficulty:2, subsection:'maps_directions',
    question:'Ali stands facing North. If he turns to face his right, which direction is he facing?',
    options:['East','West','South','North'],
    answer:'East',
    hint:'When facing North, your right hand points East.',
    explanation:'When facing <b>North</b>, turning to the right means you face <b>East</b>. Turning left from North would face West.' }),

  makeTF({ id:'g3ssee-loc-039', chapterId:'g3ssee-locality', difficulty:1, subsection:'maps_directions',
    question:'Maps can help us find our way to places we have never visited before.',
    answer:true,
    explanation:'Yes! <b>Maps</b> are navigation tools — they show roads, landmarks and directions that help us find unfamiliar places.' }),

  makeMCQ({ id:'g3ssee-loc-040', chapterId:'g3ssee-locality', difficulty:3, subsection:'maps_directions',
    question:'On a simple map of a locality: the hospital is to the North of the school; the market is to the East of the hospital. If you are at the school and walk North then East, where do you end up?',
    options:['Market','Hospital','Post office','Bus station'],
    answer:'Market',
    hint:'Walk North to reach the hospital, then East to reach the market.',
    explanation:'Starting at the school: walk <b>North</b> to reach the hospital; then walk <b>East</b> from the hospital to reach the <b>market</b>.' }),

  makeMCQ({ id:'g3ssee-loc-041', chapterId:'g3ssee-locality', difficulty:2, subsection:'maps_directions',
    question:'What is the purpose of a COMPASS?',
    options:['To tell us which direction is North, South, East or West','To measure rainfall','To measure temperature','To tell us the time'],
    answer:'To tell us which direction is North, South, East or West',
    hint:'This instrument is used for navigation.',
    explanation:'A <b>compass</b> is a navigation instrument with a magnetic needle that always points to the magnetic North, helping us identify all four compass directions.' }),

  makeMCQ({ id:'g3ssee-loc-042', chapterId:'g3ssee-locality', difficulty:1, subsection:'maps_directions',
    question:'If East is to the right on a map, what direction is to the LEFT?',
    options:['West','East','North','South'],
    answer:'West',
    hint:'West is opposite to East.',
    explanation:'On a standard map, <b>West</b> is to the left (opposite East). North is up; South is down; East is right; West is left.' }),

  makeMCQ({ id:'g3ssee-loc-043', chapterId:'g3ssee-locality', difficulty:2, subsection:'maps_directions',
    question:'The sun rises in the East and sets in the West. If you face the rising sun in the morning, which direction is behind you?',
    options:['West','North','South','East'],
    answer:'West',
    hint:'The direction behind you is the opposite of the direction you face.',
    explanation:'If you face <b>East</b> (towards the rising sun), the direction <b>behind</b> you is <b>West</b> — because West is opposite East.' }),

  makeTF({ id:'g3ssee-loc-044', chapterId:'g3ssee-locality', difficulty:1, subsection:'maps_directions',
    question:'A map of Mauritius would show the whole island viewed from above.',
    answer:true,
    explanation:'Yes! A map of Mauritius shows the whole island <b>as if viewed from above</b> (a bird\'s eye view), including towns, roads, rivers, mountains and the coastline.' }),

  makeMCQ({ id:'g3ssee-loc-045', chapterId:'g3ssee-locality', difficulty:3, subsection:'maps_directions',
    question:'Priya stands at her house. The park is to the North of her house and the school is to the West. She walks to the park and then turns left. Which direction is she now walking?',
    options:['West','East','South','North'],
    answer:'West',
    hint:'After walking North (to the park), turning left means turning West.',
    explanation:'After walking <b>North</b> (to the park), turning left while facing North means she now faces <b>West</b> — towards the school.' })

);

})();
