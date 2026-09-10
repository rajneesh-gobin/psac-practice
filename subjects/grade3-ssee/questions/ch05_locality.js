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
    options:['Post office','Bus station','Hospital','Library'],
    answer:'Post office',
    hint:'Letters and parcels are handled here.',
    explanation:'You go to the <b>post office</b> to send letters and parcels; it also sells stamps. A bus station carries passengers, a hospital treats the sick and a library lends books.'}),

  makeMCQ({ id:'g3ssee-loc-004', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'Where would a person go to save money or take out money?',
    options:['Bank','Hospital','Market','School'],
    answer:'Bank',
    hint:'This place keeps your money safely.',
    explanation:'A <b>bank</b> is a place where people save money, take out money and borrow money. Banks also offer services like paying bills.' }),

  makeMCQ({ id:'g3ssee-loc-005', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'Where would you wait to catch a bus to travel to another town?',
    options:['Bus station','Post office','Hospital','Library'],
    answer:'Bus station',
    hint:'Buses start and stop at this place.',
    explanation:'A <b>bus station</b> is where buses arrive and depart, so that is where you wait for a bus to another town.'}),

  makeMCQ({ id:'g3ssee-loc-006', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'Where do children go to learn and study?',
    options:['School','Bank','Post office','Bus station'],
    answer:'School',
    hint:'You go here Monday to Friday.',
    explanation:'Children go to <b>school</b> to learn subjects like Maths, English, French, Science and SSEE.' }),

  makeMCQ({ id:'g3ssee-loc-007', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'What is a LOCALITY?',
    options:['The area where you live','A weather instrument','A type of wild animal','A subject taught at school'],
    answer:'The area where you live',
    hint:'Think about your neighbourhood.',
    explanation:'A <b>locality</b> is the area around where you live — your neighbourhood, town or village, together with its market, school, hospital and roads.'}),

  makeTF({ id:'g3ssee-loc-008', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'A playground is a place in the community where children can play safely.',
    answer:true,
    explanation:'Yes! A <b>playground</b> is a designated area — often in or near a school or park — where children can play games and exercise safely.' }),

  makeMCQ({ id:'g3ssee-loc-009', chapterId:'g3ssee-locality', difficulty:2, subsection:'places_in_locality',
    question:'Which of the following places is found in most towns and villages in Mauritius?',
    options:['A temple, mosque or church','A high snow-covered mountain','A large international airport','A harbour for very large ships'],
    answer:'A temple, mosque or church',
    hint:'Mauritius is a multicultural country with many religions.',
    explanation:'Mauritius is multicultural, so almost every town and village has a <b>place of worship</b> — a temple, a mosque or a church. There is no snow, only one airport and only a few harbours.'}),

  makeMCQ({ id:'g3ssee-loc-010', chapterId:'g3ssee-locality', difficulty:2, subsection:'places_in_locality',
    question:'Ali\'s father works in a place where he stamps passports and checks people arriving in Mauritius. Where does he work?',
    options:['Airport','Hospital','Market','Post office'],
    answer:'Airport',
    hint:'People travel to and from other countries through this place.',
    explanation:'Ali\'s father works at the <b>airport</b> — the Sir Seewoosagur Ramgoolam (SSR) International Airport, where passports are checked for people entering or leaving Mauritius.' }),

  makeMCQ({ id:'g3ssee-loc-011', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'Which of these is a GREEN space in a locality where people relax and children play?',
    options:['A park','A bank','A shop','A road'],
    answer:'A park',
    hint:'This is an outdoor area with grass and trees.',
    explanation:'A <b>park</b> is a green outdoor space where people relax and walk and children play. A bank, a shop and a road are not green spaces.'}),

  makeMCQ({ id:'g3ssee-loc-012', chapterId:'g3ssee-locality', difficulty:2, subsection:'places_in_locality',
    question:'Priya needs to buy bread and milk near her home. Which type of place should she go to?',
    options:['A shop or supermarket','A post office counter','A bus station office','A hospital ward'],
    answer:'A shop or supermarket',
    hint:'Food and everyday products are sold here.',
    explanation:'Everyday food such as bread and milk is bought at a <b>shop or supermarket</b>. Post offices handle mail, bus stations handle travel and hospitals treat the sick.'}),

  makeTF({ id:'g3ssee-loc-013', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'The fire station is a place in the community where firefighters work.',
    answer:true,
    explanation:'Yes! The <b>fire station</b> is where firefighters and their vehicles are based, ready to respond to fires and emergencies in the community.' }),

  makeMCQ({ id:'g3ssee-loc-014', chapterId:'g3ssee-locality', difficulty:2, subsection:'places_in_locality',
    question:'Which of these places provides an EMERGENCY service to the community?',
    options:['Police station','Public library','Play area','Vegetable market'],
    answer:'Police station',
    hint:'This place maintains law and order.',
    explanation:'The <b>police station</b> gives an emergency service — officers answer calls about crimes and accidents. A library, a play area and a market are not emergency services.'}),

  makeMCQ({ id:'g3ssee-loc-015', chapterId:'g3ssee-locality', difficulty:1, subsection:'places_in_locality',
    question:'What type of place in a locality provides books for people to read and borrow?',
    options:['Library','Post office','Bank','Bus station'],
    answer:'Library',
    hint:'Books are kept here and can be borrowed.',
    explanation:'A <b>library</b> is a place where books and other resources are kept. People can borrow books for free for a set period of time.' }),

// ── services (016-045) ────────────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-loc-016', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'What service does a HOSPITAL provide?',
    options:['Medical care for sick people','Sending letters and parcels','Selling food and vegetables','Keeping people\'s money safe'],
    answer:'Medical care for sick people',
    explanation:'A hospital provides <b>medical care and treatment</b>: doctors, nurses and other health workers look after people who are sick or injured.'}),

  makeMCQ({ id:'g3ssee-loc-017', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'What service does a POST OFFICE provide?',
    options:['Sending letters and parcels','Carrying passengers by bus','Treating people who are ill','Keeping people\'s money safe'],
    answer:'Sending letters and parcels',
    explanation:'The <b>post office</b> accepts and delivers letters and parcels and sells stamps. Buses carry passengers, hospitals treat the ill and banks keep money.'}),

  makeMCQ({ id:'g3ssee-loc-018', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'What service does a BANK provide to individuals in the community?',
    options:['A safe place to keep money','A place for medical check-ups','A place to collect old stamps','A place to buy food and drink'],
    answer:'A safe place to keep money',
    explanation:'A <b>bank</b> gives financial services — it keeps your money safe in an account, lends money and helps you pay bills.'}),

  makeTF({ id:'g3ssee-loc-019', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'A bus station provides a transport service to help people travel around Mauritius.',
    answer:true,
    explanation:'Yes! The <b>bus station</b> provides a <b>public transport service</b> — buses connect different towns and villages, helping people travel around Mauritius.' }),

  makeMCQ({ id:'g3ssee-loc-020', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'Why are community services important?',
    options:['They meet the needs of the community','They are only meant for young children','They are only meant for rich people','They are not needed in a modern town'],
    answer:'They meet the needs of the community',
    explanation:'Community services — schools, hospitals, banks, post offices and transport — <b>meet the needs of people</b> and make daily life better for everyone, rich or poor, young or old.'}),

  makeMCQ({ id:'g3ssee-loc-021', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'A family in Mauritius cannot read or write. Which community service would help them most?',
    options:['An adult literacy class','A bus station office','A post office counter','A bank money counter'],
    answer:'An adult literacy class',
    hint:'Which service helps people learn to read and write?',
    explanation:'A school or <b>adult literacy class</b> teaches people to read and write — a skill they need in order to take a full part in society. The other three services cannot teach them.'}),

  makeMCQ({ id:'g3ssee-loc-022', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'Riya\'s grandmother is very ill at home. Which community service should Riya\'s family use?',
    options:['Medical services','Postal services','Banking services','Transport services'],
    answer:'Medical services',
    explanation:'For a medical emergency the family should call an ambulance or take the grandmother to hospital — that is the <b>medical service</b>. Post, banking and transport cannot help someone who is ill.'}),

  makeMCQ({ id:'g3ssee-loc-023', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'Ali wants to send a birthday card to his cousin in Rodrigues. Which service should he use?',
    options:['Post office','Bus station','Hospital','Library'],
    answer:'Post office',
    explanation:'Letters and parcels to Rodrigues go through the <b>post office</b>. A bus station, a hospital and a library cannot post a card.'}),

  makeTF({ id:'g3ssee-loc-024', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'Police officers provide a safety service to protect the community.',
    answer:true,
    explanation:'Yes! <b>Police officers</b> protect people and property, enforce laws and respond to emergencies, providing an essential safety service to the community.' }),

  makeMCQ({ id:'g3ssee-loc-025', chapterId:'g3ssee-locality', difficulty:3, subsection:'services',
    question:'A new family moves into a neighbourhood with no school nearby. What problem will their children face?',
    options:['They will have nowhere to go to school','They will not be able to visit a market','They will have no food to eat at home','They will not be able to travel by bus'],
    answer:'They will have nowhere to go to school',
    explanation:'Without a school nearby the children have <b>nowhere to be educated</b>, which is why a school is an essential community service. Food, markets and buses are separate needs.'}),

  makeMCQ({ id:'g3ssee-loc-026', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'What is the role of a MARKET in the community?',
    options:['A place to buy and sell goods','A place to catch a bus home','A place to save your money','A place for medical treatment'],
    answer:'A place to buy and sell goods',
    explanation:'A <b>market</b> is where people buy and sell goods, especially fresh food — vegetables, fruit and fish.'}),

  makeMCQ({ id:'g3ssee-loc-027', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'Which of these describes a service that EDUCATORS provide?',
    options:['Teaching children to read and count','Sorting out the letters for delivery','Keeping the money safe in a big vault','Treating the patients who are sick'],
    answer:'Teaching children to read and count',
    explanation:'<b>Educators</b> (teachers) provide education — teaching children to read, write, count and understand the world. Sorting post, guarding money and treating patients are other people\'s jobs.'}),

  makeTF({ id:'g3ssee-loc-028', chapterId:'g3ssee-locality', difficulty:1, subsection:'services',
    question:'Community services are only for adults.',
    answer:false,
    explanation:'Community services are for <b>everyone</b>. Schools, playgrounds, libraries and hospitals serve both children and adults.' }),

  makeMCQ({ id:'g3ssee-loc-029', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'If a fire breaks out in a house, which service should you call FIRST?',
    options:['The fire brigade','The post office','The town market','The local school'],
    answer:'The fire brigade',
    hint:'This service puts out fires.',
    explanation:'Call the <b>fire brigade</b> (sapeurs-pompiers) at once — in Mauritius the fire emergency number is 115. A post office, a market and a school cannot put out a fire.'}),

  makeMCQ({ id:'g3ssee-loc-030', chapterId:'g3ssee-locality', difficulty:2, subsection:'services',
    question:'Sam collects letters from his neighbours and brings them to the post office for posting. What role is Sam playing?',
    options:['Helping people use the postal service','Working at the local vegetable market','Running the big district hospital ward','Teaching at the village primary school'],
    answer:'Helping people use the postal service',
    explanation:'Sam is <b>helping his neighbours use the postal service</b> by collecting their letters and taking them to the post office.'}),

// ── maps_directions (031-075) ─────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-loc-031', chapterId:'g3ssee-locality', difficulty:1, subsection:'maps_directions',
    question:'What is a MAP?',
    options:['A drawing of an area seen from above','A list of the food to buy at a market','A timetable for the town bus station','A recipe for cooking an evening meal'],
    answer:'A drawing of an area seen from above',
    hint:'You use this to find your way around an area.',
    explanation:'A <b>map</b> is a flat drawing of an area as if seen from above, using symbols, labels and a key to show its features.'}),

  makeMCQ({ id:'g3ssee-loc-032', chapterId:'g3ssee-locality', difficulty:1, subsection:'maps_directions',
    question:'What are the four main compass directions?',
    options:['North, South, East, West','Above, Below, Near, Far','Up, Down, Left, Right','Front, Back, Left, Right'],
    answer:'North, South, East, West',
    hint:'Think of the acronym NEWS: N-E-W-S.',
    explanation:'The four main compass directions are <b>North</b> (N), <b>South</b> (S), <b>East</b> (E) and <b>West</b> (W).'}),

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
    options:['A river or stream','A road or a track','A wood or forest','A house or shed'],
    answer:'A river or stream',
    hint:'Blue usually represents water on maps.',
    explanation:'On most maps a blue wavy line is a <b>river or stream</b> — blue is the usual map colour for water. Roads, woods and buildings are shown in other colours.'}),

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
    options:['To show which direction is North','To measure how much rain falls','To measure the air temperature','To tell us the time of day'],
    answer:'To show which direction is North',
    hint:'This instrument is used for navigation.',
    explanation:'A <b>compass</b> has a magnetic needle that always points to magnetic North, so it tells us which way is North, South, East and West. Rain gauges, thermometers and clocks do other jobs.'}),

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
