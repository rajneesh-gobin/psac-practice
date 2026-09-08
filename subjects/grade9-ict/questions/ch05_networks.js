'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - Networks   (examWeight 4)
//
//  ⚠ THE MOST VOLATILE TOPIC IN THE PAPER: 22 -> 17 -> 4 -> 5 -> 1 marks across
//    2021-2025. It is falling, and Internet services rose over the same period
//    (4 -> 5 -> 7 -> 14 -> 13) - the subject moved from wiring to online
//    services. The weight here is the five-year mean, not the latest year:
//    weighting from 2025 alone would give Networks almost nothing and be wrong
//    the first time a paper swings back.
//
//  ⚠ 2021 asked candidates to DRAW a topology. From 2022 the drawing tasks were
//    replaced by selection, so nothing here needs a drawing surface.
//
//  ⚠ Topology questions are worded rather than drawn: this repo has no bundled
//    Grade 9 artwork, and a topology-diagram MCQ needs the diagram. Recorded in
//    blueprint-ict.md as still needing artwork.
//
//  Source: NCE ICT (N540) 2021-2025; NCF Grades 7-9 §8.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9ict-networks';

const MCQ = [
  ['g9ict-net-001', 'network_types', 1,
   'What does <b>LAN</b> stand for?',
   ['Local Area Network', 'Large Area Network', 'Linked Access Network', 'Long Area Network'],
   'Local Area Network',
   'The first word describes how far it reaches.',
   'LAN stands for Local Area Network - a network covering one building or site.'],

  ['g9ict-net-002', 'network_types', 1,
   'What does <b>WAN</b> stand for?',
   ['Wide Area Network', 'Wireless Access Network', 'Working Area Network', 'Web Area Network'],
   'Wide Area Network',
   'It covers a much larger area than a LAN.',
   'WAN stands for Wide Area Network - one that spans towns, countries or the world.'],

  ['g9ict-net-003', 'network_types', 2,
   'A school connects all the computers in one building. Which type of network is this?',
   ['LAN', 'WAN', 'MAN', 'VPN'], 'LAN',
   'One building, one site.',
   'A network confined to a single site is a Local Area Network.'],

  ['g9ict-net-004', 'network_types', 2,
   'A bank links its branches in Mauritius, Rodrigues and London. Which type of network is this?',
   ['WAN', 'LAN', 'PAN', 'Intranet'], 'WAN',
   'The branches are far apart.',
   'A network spanning large distances is a Wide Area Network.'],

  ['g9ict-net-005', 'network_types', 2,
   'The <b>internet</b> is best described as:',
   ['The largest WAN in the world', 'A very large LAN',
    'A private company network', 'A type of cable'],
   'The largest WAN in the world',
   'It spans the whole world.',
   'The internet is a global network of networks - the largest wide area network there is.'],

  ['g9ict-net-006', 'network_types', 3,
   'A private network that only the staff of one company can use is called:',
   ['An intranet', 'The internet', 'An extranet', 'A LAN party'], 'An intranet',
   'The prefix means "inside".',
   'An intranet is a private network using internet technology, available only inside an organisation.'],

  ['g9ict-net-007', 'network_types', 3,
   'A company lets trusted suppliers reach part of its private network. That extended network is called:',
   ['An extranet', 'An intranet', 'A VPN', 'A WAN'], 'An extranet',
   'The prefix means "outside".',
   'An extranet extends part of an intranet to selected outsiders such as suppliers or customers.'],

  ['g9ict-net-008', 'topologies', 1,
   'In a <b>star</b> topology, every computer is connected to:',
   ['A central device', 'The computer next to it', 'A single long cable', 'Two neighbours'],
   'A central device',
   'Think of the shape the cables make.',
   'In a star topology every device has its own cable to a central switch or hub.'],

  ['g9ict-net-009', 'topologies', 2,
   'In a <b>ring</b> topology, the computers are connected:',
   ['In a closed loop', 'To one central hub', 'To a single backbone cable', 'At random'],
   'In a closed loop',
   'The name describes the shape.',
   'In a ring topology each device connects to two others, forming a closed loop.'],

  ['g9ict-net-010', 'topologies', 2,
   'In a <b>bus</b> topology, all the computers share:',
   ['One main cable', 'One central switch', 'One printer', 'One wireless channel'],
   'One main cable',
   'Everything hangs off a single backbone.',
   'A bus topology connects every device to one shared backbone cable.'],

  ['g9ict-net-011', 'topologies', 3,
   'What is the main <b>disadvantage</b> of a bus topology?',
   ['A fault in the main cable stops the whole network',
    'It needs more cable than any other topology',
    'It cannot be used with wireless devices',
    'Each computer needs its own switch'],
   'A fault in the main cable stops the whole network',
   'Everything depends on one shared cable.',
   'Because every device shares one backbone, a break in that cable brings the whole network down.'],

  ['g9ict-net-012', 'topologies', 3,
   'What is an <b>advantage</b> of a star topology?',
   ['A fault in one cable affects only that computer',
    'It uses the least cable of any topology',
    'It works without any central device',
    'It cannot suffer a collision'],
   'A fault in one cable affects only that computer',
   'Each device has its own cable.',
   'In a star each device has its own link to the centre, so one broken cable affects only that machine.'],

  ['g9ict-net-013', 'network_components', 1,
   'Which device connects a home network to the internet?',
   ['Router', 'Printer', 'Scanner', 'Monitor'], 'Router',
   'It routes traffic between two networks.',
   'A router joins one network to another - typically a home LAN to the internet.'],

  ['g9ict-net-014', 'network_components', 2,
   'Which device joins several computers together in a LAN and sends data only to the intended recipient?',
   ['Switch', 'Hub', 'Modem', 'Repeater'], 'Switch',
   'It is cleverer than a hub.',
   'A switch learns which device is on which port and forwards data only to that port; a hub copies it to all.'],

  ['g9ict-net-015', 'network_components', 2,
   'Which device converts a computer signal so it can travel over a telephone line, and back again?',
   ['Modem', 'Switch', 'Router', 'Bridge'], 'Modem',
   'The name is short for two words that describe both directions.',
   'A modem MOdulates and DEModulates - it converts between digital and analogue signals.'],

  ['g9ict-net-016', 'network_components', 3,
   'Which device strengthens a weak signal so it can travel further along a network?',
   ['Repeater', 'Switch', 'Router', 'Firewall'], 'Repeater',
   'It repeats what it receives, more strongly.',
   'A repeater regenerates a weakened signal so it can carry on over a longer distance.'],

  ['g9ict-net-017', 'network_components', 2,
   'What is the main purpose of a <b>firewall</b>?',
   ['To control what traffic may enter or leave a network',
    'To speed up the internet connection for every user',
    'To share one printer between all the computers',
    'To back up the files on the network automatically'],
   'To control what traffic may enter or leave a network',
   'It is a barrier, not a booster.',
   'A firewall inspects traffic and blocks anything that breaks its rules, protecting the network.'],

  ['g9ict-net-018', 'network_components', 3,
   'Which cable type carries data as pulses of <b>light</b>?',
   ['Fibre optic', 'Coaxial', 'Twisted pair', 'Ethernet copper'], 'Fibre optic',
   'The clue is in the word optic.',
   'Fibre optic cable carries data as light along a glass or plastic strand, giving very high speeds.'],

  ['g9ict-net-019', 'network_types', 2,
   'Which of these is a <b>wireless</b> way of connecting a device to a network?',
   ['Wi-Fi', 'Ethernet cable', 'Fibre optic', 'Coaxial'], 'Wi-Fi',
   'Only one of these needs no cable.',
   'Wi-Fi connects devices using radio waves, with no cable at all.'],

  ['g9ict-net-020', 'network_components', 3,
   'What is the main advantage of a wired connection over Wi-Fi?',
   ['It is usually faster and more reliable',
    'It lets the device be carried around',
    'It needs no hardware at all',
    'It works over longer distances than any cable'],
   'It is usually faster and more reliable',
   'Think about interference and walls.',
   'A cable is not affected by walls, distance or radio interference, so it is usually faster and steadier.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

// Acronym expansion is one of the measured formats in this slot.
const SHORT = [
  ['g9ict-net-021', 'network_types', 1,
   'Write in full what <b>LAN</b> stands for.',
   'Local Area Network', ['local area network'],
   'Three words.', 'LAN stands for Local Area Network.'],
  ['g9ict-net-022', 'network_types', 1,
   'Write in full what <b>WAN</b> stands for.',
   'Wide Area Network', ['wide area network'],
   'Three words.', 'WAN stands for Wide Area Network.'],
  ['g9ict-net-023', 'network_components', 2,
   'Name the device that connects a home network to the internet.',
   'Router', ['a router', 'wireless router'],
   'It routes traffic between networks.', 'A router connects one network to another.'],
  ['g9ict-net-024', 'topologies', 2,
   'Name the topology in which every computer has its own cable to a central device.',
   'Star', ['star topology', 'star network'],
   'Think of the shape the cables make.',
   'A star topology gives each device its own link to a central switch or hub.'],
  ['g9ict-net-025', 'network_components', 3,
   'Name the security device that controls which traffic may enter or leave a network.',
   'Firewall', ['a firewall'],
   'It is a barrier.',
   'A firewall filters traffic according to rules and blocks what is not allowed.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

// ══════════════════════════════════════════════════════════════════════════
//  SYLLABUS-GAP BLOCK. `network_basics`, `wired_wireless` and
//  `intranet_extranet` were declared with nothing behind them.
//  ⚠ Two intranet/extranet items already existed but were tagged
//    `network_types`; they are LEFT there rather than moved, and new items are
//    written under the declared id, so no question changes card underneath a
//    child who has already answered it.
// ══════════════════════════════════════════════════════════════════════════
const MCQ2 = [
  ['g9ict-net-026', 'network_basics', 1,
   'What is a computer <b>network</b>?',
   ['Two or more computers connected so they can share data',
    'A single computer with two screens and two keyboards',
    'A program that edits pictures on several computers',
    'A type of printer that several rooms can share'],
   'Two or more computers connected so they can share data',
   'The key word is connected.',
   'A network is two or more computers linked together so they can communicate and share resources.'],

  ['g9ict-net-027', 'network_basics', 2,
   'Which of these is an <b>advantage</b> of putting a school&rsquo;s computers on a network?',
   ['One printer can be shared by every computer',
    'Each computer needs its own printer',
    'Files can no longer be copied',
    'The computers work when the power is off'],
   'One printer can be shared by every computer',
   'Think about what can now be shared.',
   'Networking lets hardware, files and an internet connection be shared instead of duplicated for every machine.'],

  ['g9ict-net-028', 'network_basics', 2,
   'Which of these is a <b>disadvantage</b> of a network?',
   ['A virus can spread quickly from one computer to all the others',
    'Files can no longer be shared between any of the computers',
    'Printers can never be shared once a network is installed',
    'Each computer must be bought twice over to be networked'],
   'A virus can spread quickly from one computer to all the others',
   'What else travels along the connection?',
   'The same links that carry files carry malicious software, so an infection on one machine can reach the rest.'],

  ['g9ict-net-029', 'network_basics', 3,
   'A school network stops working and no one can print or reach the internet. What does this illustrate?',
   ['A network creates a single point of failure',
    'Networks cannot be repaired',
    'Printers do not work on a network',
    'The internet is faster than a LAN'],
   'A network creates a single point of failure',
   'What happened to every machine at once?',
   'When shared equipment fails, everything that depends on it stops - which is the cost of sharing.'],

  ['g9ict-net-030', 'wired_wireless', 1,
   'Which cable is most commonly used to connect a computer to a wired LAN?',
   ['Ethernet cable', 'Power cable', 'HDMI cable', 'Audio cable'],
   'Ethernet cable',
   'It plugs into the network port.',
   'An Ethernet cable connects a computer&rsquo;s network port to a switch or a router.'],

  ['g9ict-net-031', 'wired_wireless', 2,
   'What is the main <b>advantage</b> of a wireless connection over a wired one?',
   ['Devices can be moved around freely',
    'It is never affected by walls',
    'It is always faster than a cable',
    'It needs no equipment at all'],
   'Devices can be moved around freely',
   'Think about a laptop being carried between rooms.',
   'With no cable a device can move anywhere within range, which a wired connection cannot allow.'],

  ['g9ict-net-032', 'wired_wireless', 3,
   'A computer laboratory of 30 fixed machines needs the fastest, steadiest connection. Which should be chosen?',
   ['A wired connection', 'Wi-Fi only',
    'Mobile data on each machine', 'Bluetooth between the machines'],
   'A wired connection',
   'The machines never move.',
   'Fixed machines gain nothing from mobility, and cable gives higher, steadier speeds with no interference.'],

  ['g9ict-net-033', 'wired_wireless', 3,
   'Which of these can reduce the strength of a Wi-Fi signal?',
   ['Thick walls between the device and the router',
    'Using a shorter password for the network',
    'Choosing a larger monitor for the computer',
    'Sorting the files stored on the hard disk'],
   'Thick walls between the device and the router',
   'Radio waves have to get through something.',
   'Walls, distance and other radio equipment all weaken a Wi-Fi signal; none of the other options touches it.'],

  ['g9ict-net-034', 'intranet_extranet', 1,
   'An intranet is available to:',
   ['Only the people inside one organisation',
    'Anyone in the world with a browser', 'Only one single computer in the building', 'Only mobile phones, not computers'],
   'Only the people inside one organisation',
   'The prefix means inside.',
   'An intranet is private to one organisation, even though it uses the same technology as the internet.'],

  ['g9ict-net-035', 'intranet_extranet', 2,
   'Which is the best example of something a school would put on its <b>intranet</b> rather than its public website?',
   ['Internal staff notices and pupil records',
    'The school address for visitors',
    'A photograph for the newspaper',
    'The date of the open day'],
   'Internal staff notices and pupil records',
   'Which of these should the public not see?',
   'An intranet holds material meant only for people inside the organisation; public information belongs on the website.'],

  ['g9ict-net-036', 'intranet_extranet', 3,
   'What is the difference between an intranet and an extranet?',
   ['An extranet also lets selected outsiders in, such as suppliers',
    'An extranet is available to everyone in the whole world',
    'An intranet needs no computers',
    'There is no difference between them'],
   'An extranet also lets selected outsiders in, such as suppliers',
   'One of them reaches slightly further than the other.',
   'An extranet extends part of an organisation&rsquo;s intranet to chosen outsiders, while the rest stays private.'],
];

MCQ2.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

})();
