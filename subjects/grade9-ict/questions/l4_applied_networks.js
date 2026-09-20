'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT — LEVEL 4 (applied) items, part 3 of 4: networks, the
//  internet, and ethics & security.
//  IDs: g9ict-l4-201 … g9ict-l4-247.
//
//  ⚠ Read the header of l4_applied_systems.js first for what was measured.
//
//  ⚠ THE ETHICS CHAPTER IS THE EASIEST PLACE IN THE PACK TO WRITE A FAKE L4.
//    "Is copying homework wrong?" has one socially obvious answer and tests
//    nothing. Every ethics item here puts two defensible-looking courses of
//    action beside each other, or asks what FOLLOWS from a choice, so the
//    pupil has to reason rather than recite a virtue.
//
//  ⚠ No real company, bank or person is named anywhere in this file.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// ── NETWORKS — g9ict-l4-201 … 218 ─────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-201', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:4,
  question:'A school has 30 stand-alone computers, one printer moved from room to room, and files carried on flash drives. Which benefit of networking them answers the most complaints at once?',
  options:['Files and one printer can be shared, and backed up centrally',
           'Each computer will run its own programs noticeably more quickly',
           'Each computer will need less memory once they are all connected',
           'Each computer can then be repaired without opening its own case'],
  answer:'Files and one printer can be shared, and backed up centrally',
  hint:'List the three complaints in the question and ask which option addresses all of them.',
  explanation:'Sharing resources and centralising storage removes the carried flash drives, the wandering printer and the absence of any backup in one step, which is the case for a network. Connecting machines does not make a processor faster or reduce the memory each one needs.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-202', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:4,
  question:'In a school network, pupil work is stored on one central machine that the lab computers request files from. What is each part called, and why is the arrangement used?',
  options:['A server and its clients, so files are held and backed up in one place',
           'A router and its clients, so the traffic is directed around the school',
           'A server and its switches, so the cables are shared between the rooms',
           'A modem and its terminals, so the signal reaches every room equally'],
  answer:'A server and its clients, so files are held and backed up in one place',
  hint:'Name the machine that holds the files and the machines that ask for them.',
  explanation:'A server provides a resource and the clients request it, and centralising storage is what makes one backup protect everybody. Routers, switches and modems are all network hardware but none of them names the relationship described.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-203', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:4,
  question:'Thirty pupils watch a video at once and the lab connection becomes unusable, although one pupil alone had no trouble that morning. What does this illustrate?',
  options:['Bandwidth is shared, so each user gets less as the number rises',
           'The connection has failed, because a working line never slows down',
           'The video file grows larger each time that it is watched by someone',
           'The computers are too old to display a video at a reasonable speed'],
  answer:'Bandwidth is shared, so each user gets less as the number rises',
  hint:'One user was fine, thirty were not, on the same line. What is being divided?',
  explanation:'A connection carries a fixed amount of data per second and every simultaneous user takes a share of it, which is why performance falls as users are added. The morning test shows the line works, and neither file size nor the age of the computers changes with the number of viewers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-204', chapterId:'g9ict-networks', subsection:'network_types', difficulty:4,
  question:'All the computers of one secondary school, spread over three blocks on one compound, are connected together. What kind of network is this?',
  options:['A LAN, because the machines are all on one site under one owner',
           'A WAN, because the three blocks are separate buildings on the site',
           'A PAN, because each pupil works at a personal computer of their own',
           'A MAN, because the school is inside one town with other schools too'],
  answer:'A LAN, because the machines are all on one site under one owner',
  hint:'The deciding question is the geography and who owns the cabling, not the number of buildings.',
  explanation:'A local area network covers one site with cabling the owner controls, and several blocks of one compound are still one site. A WAN spans separate geographic locations and usually rents links from a provider.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-205', chapterId:'g9ict-networks', subsection:'network_types', difficulty:4,
  question:'A company with branches in Port Louis, Curepipe and Rodrigues needs all three to use one stock database. Which kind of network is required, and what follows from that?',
  options:['A WAN, which uses links rented from a telecommunications provider',
           'A LAN, which the company can cable between the branches itself',
           'A PAN, which connects the devices of each employee to each other',
           'A VPN, which replaces the need for any network between branches'],
  answer:'A WAN, which uses links rented from a telecommunications provider',
  hint:'Ask whether the company can lay its own cable between the sites named.',
  explanation:'Once sites are geographically separate the links are provided by a telecommunications company, and that is what makes it a wide area network. A LAN cannot be cabled across an island, a PAN covers a few metres, and a VPN runs over a wide area connection rather than replacing it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-206', chapterId:'g9ict-networks', subsection:'network_types', difficulty:4,
  question:'A pupil connects wireless earphones, a smart watch and a phone to each other within about a metre. What kind of network has she created?',
  options:['A PAN, a personal area network around one person and their devices',
           'A LAN, because three devices on a network make a local area network',
           'A WAN, because the signal from the devices can travel a long way off',
           'A MAN, because the devices are being used inside a town or a city'],
  answer:'A PAN, a personal area network around one person and their devices',
  hint:'Classify it by the range given in the question, not by the number of devices.',
  explanation:'A personal area network links the devices of one person over a very short range, which is what Bluetooth is for. The count of devices does not make a LAN, and the other two classifications describe far larger areas.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-207', chapterId:'g9ict-networks', subsection:'topologies', difficulty:4,
  question:'In a lab wired as a star, the cable to one computer is cut by a chair leg. What is the effect on the rest of the lab?',
  options:['Only that computer loses the network; the others are unaffected',
           'Every computer loses the network until the cable is replaced',
           'Half of the computers lose the network, on one side of the break',
           'The computers keep working but every one of them becomes slower'],
  answer:'Only that computer loses the network; the others are unaffected',
  hint:'In a star, what does each cable connect, and how many machines does one cable carry?',
  explanation:'Each machine in a star has its own cable to the central switch, so a broken cable isolates one machine and nothing else, which is the main reason the topology is preferred. Losing everything from one break is the behaviour of a bus.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-208', chapterId:'g9ict-networks', subsection:'topologies', difficulty:4,
  question:'An older office is wired as a bus, with every machine tapped onto one backbone cable. The backbone is damaged in the middle. What happens?',
  options:['The whole network fails, because every machine shares that one cable',
           'One machine fails, because each machine has a cable of its very own',
           'Nothing fails, because traffic is automatically sent the other way',
           'The network slows down but keeps working until the cable is mended'],
  answer:'The whole network fails, because every machine shares that one cable',
  hint:'Count how many machines depend on the damaged cable in this layout.',
  explanation:'A bus carries all traffic on a single shared backbone, so a break in it stops the entire network, and finding the break is itself difficult. Sending traffic another way is a property of a mesh or a ring, not of a bus.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-209', chapterId:'g9ict-networks', subsection:'topologies', difficulty:4,
  question:'A hospital wants its network to keep working even if one link fails, and accepts the extra cost of more cable. Which topology matches that requirement?',
  options:['A mesh, because more than one path exists between the machines',
           'A bus, because one long cable is the cheapest way to connect them',
           'A star, because every machine has a single cable to the switch',
           'A ring, because each machine is connected to the next one along'],
  answer:'A mesh, because more than one path exists between the machines',
  hint:'The requirement is survival of a failed link. Which layout has a spare route?',
  explanation:'A mesh provides alternative paths, so traffic is rerouted when a link fails, and that redundancy is exactly what the extra cable buys. A bus and a star each have single points of failure, and a simple ring is broken by one cut.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-210', chapterId:'g9ict-networks', subsection:'network_components', difficulty:4,
  question:'A lab has a switch connecting 20 computers and the school now wants those computers to reach the internet. Which device must be added, and what does it do?',
  options:['A router, which passes traffic between the lab network and outside',
           'A second switch, which increases the number of ports in the lab',
           'A repeater, which strengthens the signal along the lab cabling',
           'A bridge, which joins two halves of the same network together'],
  answer:'A router, which passes traffic between the lab network and outside',
  hint:'A switch moves traffic inside one network. What is needed to move it between two?',
  explanation:'A router joins different networks and decides where traffic should go between them, which is what reaching the internet requires. More ports, a stronger signal and a bridge between segments all work inside the existing network.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-211', chapterId:'g9ict-networks', subsection:'network_components', difficulty:4,
  question:'Pupils in the classroom furthest from the office report that the wireless signal keeps dropping, while it is strong near the office. Which addition is appropriate?',
  options:['An access point in that wing, extending coverage to the far rooms',
           'A faster internet package, increasing the speed of the connection',
           'A larger switch in the office, adding more ports for the machines',
           'A second printer in that wing, reducing the traffic on the network'],
  answer:'An access point in that wing, extending coverage to the far rooms',
  hint:'The fault depends on distance from one place. What does that tell you about the cause?',
  explanation:'A signal that weakens with distance is a coverage problem, and an extra access point puts a transmitter near the rooms that need it. Buying more bandwidth does not carry a radio signal further, and neither switches nor printers affect coverage.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-212', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:4,
  question:'An examination centre must run 40 machines that cannot be allowed to drop their connection during a paper. Cost is not the deciding factor. Which connection should be specified?',
  options:['Wired, because a cable is not affected by interference or walls',
           'Wireless, because there are no cables for a candidate to trip on',
           'Wireless, because it is far quicker to install in an exam centre',
           'Either one, because both are equally reliable in a modern centre'],
  answer:'Wired, because a cable is not affected by interference or walls',
  hint:'The one requirement given is reliability during a fixed period. Which medium is the more predictable?',
  explanation:'A cable gives a consistent, interference-free link, which is why fixed installations that must not fail are wired. The advantages listed for wireless are real and are about convenience and cost, which the question has already set aside.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-213', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:4,
  question:'A home wireless network is slow in one back room but fast beside the router. The house has thick concrete walls. What explains the difference?',
  options:['Radio signals are weakened as they pass through walls and floors',
           'Wireless networks always work in only one room of any building',
           'The router divides its speed equally between all of the rooms',
           'Concrete walls reflect the signal and so make it travel further'],
  answer:'Radio signals are weakened as they pass through walls and floors',
  hint:'Two facts are given: distance from the router, and what the walls are made of.',
  explanation:'Wireless is a radio link and dense material absorbs it, so signal strength and therefore speed fall with each wall crossed. Routers do not allocate speed by room, and reflection scatters a signal rather than extending it usefully.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-214', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:4,
  question:'A shop offers free wireless with no password. Why should a customer avoid typing a card number while connected to it?',
  options:['An open network carries traffic others nearby may be able to read',
           'An open network is always slower than a network with a password',
           'An open network cannot connect to a bank site under any conditions',
           'An open network charges the customer for the data that is used'],
  answer:'An open network carries traffic others nearby may be able to read',
  hint:'Ask what the password on a wireless network is actually protecting.',
  explanation:'Encryption on a wireless network protects the traffic in the air, and without it anyone in range may capture what is sent, which is why sensitive work needs a trusted network or a VPN. Speed, access and charging are not what the missing password changes.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-215', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:4,
  question:'A company builds a private website holding staff procedures, the internal phone list and leave forms, reachable only from inside the office network. What is this called?',
  options:['An intranet, a private network site for the people inside the firm',
           'An extranet, because the suppliers of the firm can also reach it',
           'The internet, because it is a website reached through a browser',
           'A LAN, because it is the cabling that joins the offices together'],
  answer:'An intranet, a private network site for the people inside the firm',
  hint:'Two things decide it: who may reach it, and from where.',
  explanation:'An intranet uses web technology but is restricted to the organisation, which is precisely what is described. Using a browser does not make something part of the internet, and a LAN is the network itself rather than the site running on it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-216', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:4,
  question:'The same company now lets its approved suppliers log in from their own offices to check stock levels, while the rest of the site stays internal. What has it created?',
  options:['An extranet, which extends part of the intranet to named outsiders',
           'A second intranet, which the suppliers run on their own networks',
           'A public website, because people outside the company now use it',
           'A wide area network, because the suppliers are in other buildings'],
  answer:'An extranet, which extends part of the intranet to named outsiders',
  hint:'Access has been widened, but not to everybody. What is the name for that middle case?',
  explanation:'An extranet gives controlled access to specific external partners while the rest stays private, which is the arrangement described. A public website is open to anyone, and the suppliers are using the company system rather than running one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-217', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:4,
  question:'A pupil says that because the school portal opens in a browser and has a login page, it must be part of the internet. What is the flaw in the argument?',
  options:['A browser and a login say nothing about who is allowed to reach it',
           'A portal with a login page is by definition a page on the internet',
           'A browser can only ever open pages that are stored on the internet',
           'A login page proves that the portal is stored on a school server'],
  answer:'A browser and a login say nothing about who is allowed to reach it',
  hint:'The pupil has reasoned from the tools used. What is the question that actually classifies a site?',
  explanation:'What distinguishes internet, intranet and extranet is the audience permitted to reach the site, not the software used to view it, so the same browser opens all three. A browser also opens pages held on a local machine or a school server.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-218', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:4,
  question:'A firm plans to publish its staff salary scales on its public website so that staff can read them from home. What should an ICT adviser point out?',
  options:['Publishing publicly exposes private data; an extranet login is safer',
           'Publishing publicly is fine because staff need the information now',
           'Publishing publicly is impossible because a website cannot hold tables',
           'Publishing publicly is cheaper and so outweighs any other concern'],
  answer:'Publishing publicly exposes private data; an extranet login is safer',
  hint:'Separate the requirement, which is reasonable, from the method, which is not.',
  explanation:'The need for home access is genuine and is met by authenticated access for staff only, whereas a public page is readable by competitors and anybody else. Cost does not settle a question about confidential information.' }));

// ── INTERNET — g9ict-l4-219 … 230 ─────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-219', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:4,
  question:'A pupil says the internet and the World Wide Web are two names for the same thing. Which fact shows they are not?',
  options:['Email and file transfer use the internet without using the web',
           'The web is older than the internet and was built before it was',
           'The internet is a set of web pages and the web is the cabling',
           'A browser is needed for both, so they must be the same thing'],
  answer:'Email and file transfer use the internet without using the web',
  hint:'Find something that travels over the internet but is not a web page.',
  explanation:'The internet is the network and the web is one service running on it, so services such as email and file transfer are the counter-example. The third option reverses the two, and using a browser proves nothing about what lies underneath.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-220', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:4,
  question:'A website opens when its numeric address is typed into a browser, but not when its name is typed. Which part of the system has failed?',
  options:['The domain name service, which turns a name into a numeric address',
           'The web server, which stores the pages the browser has to display',
           'The browser itself, which is unable to display the page correctly',
           'The internet connection, which has stopped carrying any traffic now'],
  answer:'The domain name service, which turns a name into a numeric address',
  hint:'One route works and the other does not. What does the failing route need that the working one does not?',
  explanation:'Reaching the site by number proves the server, the browser and the connection all work, which leaves the name lookup as the only step in the failing path. That translation is what DNS performs.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-221', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:4,
  question:'A pupil researching for a project notices one address ends .gov.mu and another ends .com. What may she reasonably conclude before reading either page?',
  options:['One is published by government and the other by a business',
           'One is certainly accurate and the other is certainly not true',
           'One is a Mauritian site and the other cannot be Mauritian at all',
           'One is free to read and the other will charge her a fee to read'],
  answer:'One is published by government and the other by a business',
  hint:'A domain tells you something about the publisher. Be careful not to claim it tells you more than that.',
  explanation:'The domain indicates the type of organisation and, with a country code, where it is registered, which is a reasonable first judgement about the source. It does not guarantee accuracy, and a Mauritian business may well use a .com address.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-222', chapterId:'g9ict-internet', subsection:'email', difficulty:4,
  question:'A school sends one email to 300 parents and puts every address in the To field. A parent complains. What is the legitimate complaint, and what should have been used?',
  options:['Every address was revealed to everyone; Bcc hides the recipients',
           'The message will arrive slowly; sending in small batches is faster',
           'The message may be treated as spam; a shorter subject line helps',
           'The addresses were in the wrong order; they should be alphabetical'],
  answer:'Every address was revealed to everyone; Bcc hides the recipients',
  hint:'Ask what each of the 300 parents can see at the top of the message they received.',
  explanation:'Addresses in the To or Cc field are visible to every recipient, so the school has disclosed 300 private addresses to each other, which blind copy prevents. Delivery speed and spam filtering are real issues and are not what the parent is objecting to.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-223', chapterId:'g9ict-internet', subsection:'email', difficulty:4,
  question:'A teacher emails a class asking who will attend a trip. Twenty pupils press Reply All. What is the consequence, and what should they have pressed?',
  options:['Every pupil receives all twenty answers; Reply goes to the sender',
           'Only the teacher receives the answers; Reply All is the right button',
           'The messages are deleted by the server; Forward would have worked',
           'The teacher receives one combined message listing all the answers'],
  answer:'Every pupil receives all twenty answers; Reply goes to the sender',
  hint:'Work out who is in the recipient list of each of those twenty replies.',
  explanation:'Reply All sends to everyone who received the original, so each pupil collects nineteen messages that do not concern them, while Reply answers the sender alone. Nothing combines replies automatically and the server does not delete them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-224', chapterId:'g9ict-internet', subsection:'email', difficulty:4,
  question:'A pupil tries to email a 40 MB video to a teacher and it is rejected for exceeding the attachment limit. Which approach solves the problem properly?',
  options:['Upload it to cloud storage and email the link to the teacher',
           'Send the same video again in the hope that it will arrive now',
           'Split the video into four files and send four separate emails',
           'Ask the teacher to raise the attachment limit on the mail server'],
  answer:'Upload it to cloud storage and email the link to the teacher',
  hint:'The limit belongs to the mail system. What can be sent instead of the file itself?',
  explanation:'Mail systems impose attachment limits, so the file is stored elsewhere and a link is sent, which is both accepted and easier for the recipient. Resending changes nothing, four fragments are not playable without rejoining, and a teacher cannot alter a provider limit.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-225', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:4,
  question:'A search for <b>Mauritius climate change</b> returns three million results, most of them irrelevant. Which refinement narrows it most usefully?',
  options:['Search a phrase in quotation marks and limit it to one domain',
           'Search the same words again but spelt with capital letters now',
           'Search with more general words so that fewer pages are matched',
           'Search using only one of the three words to reduce the results'],
  answer:'Search a phrase in quotation marks and limit it to one domain',
  hint:'Narrowing means adding a constraint. Which option adds one rather than removing one?',
  explanation:'Quoting a phrase demands those words together and restricting to a domain limits the publisher, so both cut the result set in a controlled way. Removing words or generalising them widens the search, and capitals are ignored.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-226', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:4,
  question:'A pupil needs to return to one useful page every evening for a month. Which browser feature is designed for that, and why is it better than the alternative?',
  options:['A bookmark, which keeps the address until she chooses to remove it',
           'The history, which lists the pages visited until it is cleared out',
           'The cache, which stores the page content so it opens more quickly',
           'A new tab, which she can leave open on the page for the month'],
  answer:'A bookmark, which keeps the address until she chooses to remove it',
  hint:'Which of these survives clearing the browser and closing it every night?',
  explanation:'A bookmark is a deliberate, permanent record of an address, whereas history is a by-product that is routinely cleared and the cache holds content rather than an entry point. Leaving a tab open depends on never closing the browser.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-227', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:4,
  question:'A class must build a shared glossary of ICT terms that any pupil can extend or correct, with a record of who changed what. Which kind of site fits?',
  options:['A wiki, because any reader may edit pages and each change is logged',
           'A blog, because entries appear in date order with the newest first',
           'A forum, because members post questions and others reply to them',
           'A gallery, because pictures are arranged in albums for the class'],
  answer:'A wiki, because any reader may edit pages and each change is logged',
  hint:'The requirement is that readers EDIT the same pages, not that they add new posts.',
  explanation:'A wiki is built around collaborative editing of shared pages with a revision history, which matches every part of the requirement. A blog and a forum accumulate posts and replies instead of refining one agreed text.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-228', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:4,
  question:'Four pupils in different villages must write one report together over a week, and the group has already lost work by emailing versions back and forth. What should they use?',
  options:['A shared cloud document that all four edit, with a version history',
           'A group chat in which each pupil posts their paragraphs as messages',
           'One pupil computer, with the other three sending their parts to her',
           'Four separate documents joined together on the evening it is due'],
  answer:'A shared cloud document that all four edit, with a version history',
  hint:'The problem they have already had is versions. Which option means there is only one?',
  explanation:'A single shared document removes the question of which copy is current and keeps a history to recover from, which is what the emailed versions failed at. The other three arrangements recreate the same problem of separate copies merged late.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-229', chapterId:'g9ict-internet', subsection:'web_design_principles', difficulty:4,
  question:'Visitors to a new school website say they get lost after two or three pages. Each page was designed by a different pupil. Which principle has been broken?',
  options:['Consistent navigation, so the same menu appears in the same place',
           'Colour contrast, so that the text can be read against its background',
           'Image compression, so that each page will load quickly for a visitor',
           'Spell checking, so that the pages are free of mistakes in the words'],
  answer:'Consistent navigation, so the same menu appears in the same place',
  hint:'The complaint is about not knowing where they are or how to get back.',
  explanation:'Navigation that appears in the same place on every page is what tells a visitor where they are and how to leave, and pages designed independently lose it. Contrast, loading time and spelling are all real design concerns that would produce different complaints.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-230', chapterId:'g9ict-internet', subsection:'web_design_principles', difficulty:4,
  question:'A website uses light grey text on a white background, images with no alternative text, and a menu that only works with a mouse. Which group of visitors is most affected?',
  options:['Visitors with a visual impairment or who cannot use a mouse',
           'Visitors using a slow internet connection in a rural village',
           'Visitors who are opening the site on an older model of phone',
           'Visitors who have never visited that particular website before'],
  answer:'Visitors with a visual impairment or who cannot use a mouse',
  hint:'Take the three faults together and ask what each one assumes about the visitor.',
  explanation:'Low contrast, missing alternative text and mouse-only navigation each assume a visitor who sees well and points accurately, so together they exclude people who do not, which is what accessibility guidelines address. The faults listed are not about connection speed or familiarity.' }));

// ── ETHICS & SECURITY — g9ict-l4-231 … 247 ────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-231', chapterId:'g9ict-ethics-security', subsection:'computer_ethics', difficulty:4,
  question:'A pupil is given a colleague password so she can print urgently while the office is closed. She prints only what she was asked to. Why is this still a problem?',
  options:['Actions taken with that login are recorded against another person',
           'Printing after the office closes uses electricity nobody paid for',
           'She may forget the password and be unable to print again later on',
           'The printer may run out of paper with nobody there to refill it'],
  answer:'Actions taken with that login are recorded against another person',
  hint:'Nothing was stolen and nothing was damaged. What has been lost is the link between a person and what was done.',
  explanation:'A login identifies a person, so sharing it destroys accountability: whatever happens next is recorded against the account holder, who is answerable for it. The fact that she behaved well does not restore the record.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-232', chapterId:'g9ict-ethics-security', subsection:'computer_ethics', difficulty:4,
  question:'A technician repairing a laptop notices a folder of personal photographs and opens it out of curiosity, changing nothing. Which principle has he broken?',
  options:['Access is limited to what the work requires, whatever is possible',
           'Files must never be opened on a machine belonging to another',
           'A technician may not repair a laptop that holds personal files',
           'Photographs may not be stored on a laptop used for school work'],
  answer:'Access is limited to what the work requires, whatever is possible',
  hint:'He had the ability and the opportunity. The question is whether he had a reason.',
  explanation:'Professional access is bounded by the task, so being able to open something is not permission to open it, and nothing being changed does not undo the intrusion. The absolute statements in the other options are not rules anyone works by.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-233', chapterId:'g9ict-ethics-security', subsection:'information_privacy', difficulty:4,
  question:'A shop offers a loyalty card and asks for a national identity number, a date of birth and a monthly income. What is the reasonable objection to the form?',
  options:['It collects far more than a loyalty scheme could possibly need',
           'It collects information that a shop is unable to store on a computer',
           'It collects information the customer may not remember accurately',
           'It collects information that would take the customer long to write'],
  answer:'It collects far more than a loyalty scheme could possibly need',
  hint:'Compare each field asked for against what the scheme actually has to do.',
  explanation:'Collecting only what is necessary for the stated purpose is a basic privacy principle, and a discount card needs neither an identity number nor an income. The other options describe inconvenience rather than a reason the data should not be collected.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-234', chapterId:'g9ict-ethics-security', subsection:'information_privacy', difficulty:4,
  question:'A pupil photographs a classmate asleep in the bus and posts it to a group of 40. The classmate asks for it to be removed and it is. Why is harm still possible?',
  options:['Any of the 40 may already have saved or forwarded the picture',
           'The picture will remain visible in the group for several days more',
           'Deleting a picture is impossible once it has been taken on a phone',
           'The classmate cannot ask for a picture of herself to be deleted'],
  answer:'Any of the 40 may already have saved or forwarded the picture',
  hint:'Removing the original removes one copy. How many copies might exist by then?',
  explanation:'Once something is shared, control passes to everyone who received it, and copies cannot be recalled, which is why consent matters before posting rather than after. Deletion from a phone is possible, and a person can certainly ask for their own image to be removed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-235', chapterId:'g9ict-ethics-security', subsection:'data_security', difficulty:4,
  question:'A clerk uses the password Mauritius2024 for the payroll system, the staff email and her own social media. Which weakness matters most?',
  options:['One leaked password would open all three of the accounts at once',
           'The password is too short to be typed accurately every morning',
           'The password names a country and so is difficult to remember',
           'The password will expire at the end of the year it is named for'],
  answer:'One leaked password would open all three of the accounts at once',
  hint:'The fault is not in the password itself but in how many doors it opens.',
  explanation:'Reusing one password means a breach anywhere becomes a breach everywhere, which is why distinct passwords or a password manager are recommended. Length and memorability are secondary to the reuse, and passwords do not expire because of the year in them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-236', chapterId:'g9ict-ethics-security', subsection:'data_security', difficulty:4,
  question:'A laptop holding patient records is stolen from a car. The clinic says the data is safe because the disk was encrypted. What makes that claim reasonable?',
  options:['Without the key, the stored data cannot be read from the disk',
           'An encrypted laptop cannot be switched on by anyone who is not',
           'An encrypted disk erases itself as soon as the laptop is stolen',
           'The thief will be traced through the serial number of the laptop'],
  answer:'Without the key, the stored data cannot be read from the disk',
  hint:'Encryption does not prevent the theft. What does it prevent?',
  explanation:'Encryption transforms the stored data so it is unreadable without the key, so physical possession of the disk yields nothing useful, which is why it is standard for portable machines holding sensitive data. It does not prevent the machine being started, erase anything, or help trace it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-237', chapterId:'g9ict-ethics-security', subsection:'data_security', difficulty:4,
  question:'Every member of office staff can open, change and delete any file on the server, including payroll. What is the security principle being ignored?',
  options:['Each user should have only the access their own duties require',
           'Each user should have a separate password for every file opened',
           'Each user should be able to delete only files they created first',
           'Each user should work on a copy of the files rather than on them'],
  answer:'Each user should have only the access their own duties require',
  hint:'Think about what would follow from one careless click or one stolen account here.',
  explanation:'Access rights granted by role limit both accidental damage and the reach of a compromised account, which is why payroll should be readable by payroll staff alone. A password per file is unworkable, and the other two options describe practices rather than the principle.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-238', chapterId:'g9ict-ethics-security', subsection:'data_protection_act', difficulty:4,
  question:'A customer discovers that a company holds an old address for her and keeps sending post to it. Under data protection principles, what may she require?',
  options:['That the record is corrected, since data held must be accurate',
           'That the whole company database is deleted along with her record',
           'That the company pays her for each letter that was misdirected',
           'That the company stops keeping records about any customer at all'],
  answer:'That the record is corrected, since data held must be accurate',
  hint:'Match the complaint to the specific principle it breaches.',
  explanation:'Keeping personal data accurate and up to date is a data protection principle, and correction is the remedy that matches an out-of-date address. The other options go far beyond the breach described.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-239', chapterId:'g9ict-ethics-security', subsection:'data_protection_act', difficulty:4,
  question:'A sports club still holds the medical forms of members who left eleven years ago, in case they return. Which data protection principle does this breach?',
  options:['Data is kept no longer than the purpose for holding it requires',
           'Data is kept only in a locked cupboard rather than on a computer',
           'Data is kept only if the member has paid the subscription fee',
           'Data is kept only about members who are over eighteen years old'],
  answer:'Data is kept no longer than the purpose for holding it requires',
  hint:'Nothing in the question suggests the data is insecure or wrong. What is unusual is the eleven years.',
  explanation:'Retention is limited to what the purpose requires, and a former member from eleven years ago has no live purpose attached, so the forms should have been destroyed. The other statements are not principles of data protection.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-240', chapterId:'g9ict-ethics-security', subsection:'copyright_ownership', difficulty:4,
  question:'A pupil finds a photograph through an image search and puts it on the cover of a project that will be published on the school website. What should she check first?',
  options:['The licence of the photograph and whether the owner permits reuse',
           'The size of the photograph and whether it will print clearly enough',
           'The colours of the photograph and whether they suit the school one',
           'The format of the photograph and whether a browser can display it'],
  answer:'The licence of the photograph and whether the owner permits reuse',
  hint:'The project is going to be published. That changes which question comes first.',
  explanation:'A photograph is owned by whoever created it and publishing it needs permission or an open licence, which is the check that must come before any question of quality. The other three matter to how the cover looks, not to whether it may be used.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-241', chapterId:'g9ict-ethics-security', subsection:'copyright_ownership', difficulty:4,
  question:'A school buys one copy of a design program and installs it on all 30 lab machines, saying the school paid for it. What is wrong with the reasoning?',
  options:['The licence sets how many machines may use it, not the purchase',
           'The program will run slowly when it is installed 30 times over',
           'The school should have bought the program from a local supplier',
           'The program cannot be installed on more than one machine at all'],
  answer:'The licence sets how many machines may use it, not the purchase',
  hint:'What exactly did the school buy: the software, or permission to use it under conditions?',
  explanation:'Buying software buys a licence with terms, and a single-machine licence installed 30 times is an infringement whatever was paid; a site or multi-user licence is what a lab needs. Technically it may well install, which is exactly why the licence matters.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-242', chapterId:'g9ict-ethics-security', subsection:'plagiarism', difficulty:4,
  question:'A pupil copies three paragraphs from a website into her project word for word, and lists that website in her bibliography at the end. Is that sufficient?',
  options:['No, because copied wording must be quoted and marked where it is used',
           'Yes, because naming the source in the bibliography is a full reference',
           'No, because material from a website can never be used in a project',
           'Yes, because three paragraphs is a small part of a whole project'],
  answer:'No, because copied wording must be quoted and marked where it is used',
  hint:'The bibliography tells the reader what she read. What does it not tell them?',
  explanation:'A bibliography lists sources consulted but does not show which of the words are not her own, so copied text must be quoted and cited at the point it appears. Websites may certainly be used, and the proportion copied is not what settles it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-243', chapterId:'g9ict-ethics-security', subsection:'plagiarism', difficulty:4,
  question:'A pupil rewrites a paragraph from a book in her own words and adds no reference, saying that since the wording is hers it is her own work. What is the flaw?',
  options:['The idea is still borrowed, so the source must be credited as well',
           'Rewriting in your own words is never permitted in a school project',
           'A book may not be used as a source unless it is in the library list',
           'The paragraph should have been copied exactly rather than rewritten'],
  answer:'The idea is still borrowed, so the source must be credited as well',
  hint:'Ask what is being credited by a reference: the sentences, or what they say?',
  explanation:'Citation credits the idea as well as the wording, so paraphrasing removes the need for quotation marks but not the need for a reference. Paraphrasing is a normal and useful skill; it is the missing credit that is the problem.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-244', chapterId:'g9ict-ethics-security', subsection:'internet_dangers', difficulty:4,
  question:'An email says a bank account will be closed within 24 hours unless the details are confirmed through the link provided. The address behind the link is unfamiliar. What should be done?',
  options:['Do not use the link, and contact the bank on a number you already have',
           'Use the link but type only the account number and not the password',
           'Reply to the email and ask the sender to confirm who they really are',
           'Forward the email to friends so that they are warned about it as well'],
  answer:'Do not use the link, and contact the bank on a number you already have',
  hint:'Everything in the message, including any contact details in it, comes from the sender. What does not?',
  explanation:'Urgency plus an unfamiliar link is the shape of a phishing attempt, and the safe move is to reach the organisation by a route you already trust. Partial details are still useful to an attacker, a reply confirms the address is live, and forwarding spreads the message.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-245', chapterId:'g9ict-ethics-security', subsection:'internet_dangers', difficulty:4,
  question:'Someone a pupil met in an online game, who says he is fifteen, asks for her school name and the time she finishes. What makes the request itself the warning sign?',
  options:['Those details together let a stranger find her in person',
           'Those details are needed only by a teacher or a parent',
           'Those details would be expensive for a stranger to obtain',
           'Those details are private under the school rules on data'],
  answer:'Those details together let a stranger find her in person',
  hint:'Put the two pieces of information side by side and ask what they add up to.',
  explanation:'A place and a time are what turn an online contact into a physical meeting she has not agreed to, and that is why the combination is the signal rather than either detail alone. What he claims about his age cannot be checked and is not the point.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-246', chapterId:'g9ict-ethics-security', subsection:'social_economic_effects', difficulty:4,
  question:'A bank moves most services online and closes several branches. Which pair of effects should a balanced answer mention?',
  options:['Lower costs and 24-hour access, against job losses and exclusion',
           'Lower costs and faster queues, against slower internet for everyone',
           'Better security and less paper, against a shortage of bank branches',
           'Higher profits and more staff, against longer waiting times online'],
  answer:'Lower costs and 24-hour access, against job losses and exclusion',
  hint:'A balanced answer names a real gain and a real cost, and says who bears each.',
  explanation:'Online banking cuts operating costs and serves customers at any hour, while the same change removes jobs and leaves customers without internet access or skills worse off. The other pairings either contradict themselves or name effects that do not follow.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-247', chapterId:'g9ict-ethics-security', subsection:'social_economic_effects', difficulty:4,
  question:'A school replaces its computers every three years and the old machines are sent to a landfill. What is the ICT-related objection?',
  options:['Electronic waste contains toxic material and should be recycled',
           'The old computers could have been sold to pupils at a low price',
           'Three years is too short a time for a computer to be of any use',
           'A landfill will be filled up more quickly by computer equipment'],
  answer:'Electronic waste contains toxic material and should be recycled',
  hint:'Ask what is inside a computer that makes burying it different from burying paper.',
  explanation:'Computers contain lead, mercury and other substances that leach into soil and water, which is why electronic waste is collected and recycled separately. Selling old machines and landfill capacity are secondary points beside the contamination.' }));

})();
