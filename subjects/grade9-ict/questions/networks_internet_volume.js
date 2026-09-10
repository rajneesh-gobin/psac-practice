'use strict';
(function () {

// ══════════════════════════════════════════════════════════════════════
// NETWORKS section: g9ict-niv-001 to g9ict-niv-061
// chapterId: 'g9ict-networks'
// ══════════════════════════════════════════════════════════════════════

// ── network_basics: niv-001 to niv-010 ───────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-001', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:2,
  question:'A computer network is:',
  options:['connected computers sharing data','a program for browsing the web','one computer with two monitors','a wireless speaker system'],
  answer:'connected computers sharing data', hint:'At least two computers must be connected.',
  explanation:'A network consists of two or more connected devices that can share data, software and hardware resources.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-002', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:2,
  question:'Which of the following is an advantage of connecting computers in a network?',
  options:['Hardware such as printers can be shared between users','Each computer works more slowly on a network','Each user must buy their own copy of every program','Data cannot be transferred between computers'],
  answer:'Hardware such as printers can be shared between users', hint:'Sharing is the key benefit.',
  explanation:'One printer can serve every computer on the network, reducing costs and the number of devices needed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-003', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:2,
  question:'A disadvantage of networking computers is that:',
  options:['a virus on one computer can spread to others on the network','every computer must have a colour printer','all computers must run the same application at the same time','network computers cannot be switched off'],
  answer:'a virus on one computer can spread to others on the network', hint:'Connected computers share risks.',
  explanation:'Once a virus infects one machine on a network, it can spread to every connected computer, making security more critical.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-004', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:2,
  question:'In a client-server network, the server is:',
  options:['a machine providing resources','the administrator\'s own computer','any wireless device on the LAN','any computer on the internet'],
  answer:'a machine providing resources', hint:'It serves the other machines.',
  explanation:'The server is a dedicated, powerful machine that stores files, manages accounts and provides shared resources to client computers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-005', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:2,
  question:'In a peer-to-peer (P2P) network:',
  options:['all computers are equal','one computer controls the rest','only one may use the internet','data sits on a central server'],
  answer:'all computers are equal', hint:'No hierarchy — each computer is both a client and a server.',
  explanation:'In a P2P network, every computer can act as both a client (requesting resources) and a server (providing them) without a central server.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-006', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:2,
  question:'Bandwidth in a network refers to:',
  options:['the data rate per second','the number of computers on it','the distance between devices','the width of the cable used'],
  answer:'the data rate per second', hint:'It is like the width of a pipe — wider means more water.',
  explanation:'Bandwidth is the maximum data transfer rate of a network, measured in bits per second (bps, Mbps, Gbps).' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-007', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:2,
  question:'Latency in a network is:',
  options:['the delay between sending a signal and receiving it','the maximum number of users allowed on the network','the cost of the network hardware','the speed at which data is encrypted'],
  answer:'the delay between sending a signal and receiving it', hint:'It is the lag in the network.',
  explanation:'Latency is the time it takes for data to travel from the sender to the receiver; low latency is important for real-time applications like video calls.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-008', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:2,
  question:'A network protocol is:',
  options:['the rules for sending data','the layout of the network','a filter for spam emails','a type of network cable'],
  answer:'the rules for sending data', hint:'Rules for communication.',
  explanation:'A protocol is an agreed set of rules that all devices follow to communicate, ensuring that data is sent, received and understood correctly.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-009', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:2,
  question:'The most common protocol used to transmit data over the internet is:',
  options:['TCP/IP','FTP','HTTP','SMTP'],
  answer:'TCP/IP', hint:'Every device connected to the internet uses this.',
  explanation:'TCP/IP (Transmission Control Protocol/Internet Protocol) is the fundamental communication protocol of the internet.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-010', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:2,
  question:'An IP address is used to:',
  options:['identify a device on a network','measure the size of a network','set the speed of the network','store the Wi-Fi password'],
  answer:'identify a device on a network', hint:'Like a postal address for a computer.',
  explanation:'An IP address is a unique numerical label assigned to each device, enabling routers to direct data to the correct destination.' }));

// ── network_types: niv-011 to niv-021 ────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-011', chapterId:'g9ict-networks', subsection:'network_types', difficulty:2,
  question:'LAN stands for:',
  options:['Local Area Network','Large Access Network','Linked Automated Node','Local Antenna Network'],
  answer:'Local Area Network', hint:'The first word describes how much area it covers.',
  explanation:'A Local Area Network (LAN) covers a small geographic area, such as a single building or campus.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-012', chapterId:'g9ict-networks', subsection:'network_types', difficulty:2,
  question:'WAN stands for:',
  options:['Wide Area Network','Wireless Access Node','Web Application Network','Wired Automated Node'],
  answer:'Wide Area Network', hint:'It covers a wide geographic area.',
  explanation:'A Wide Area Network (WAN) spans large geographic areas, connecting networks in different cities or countries. The internet is the largest WAN.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-013', chapterId:'g9ict-networks', subsection:'network_types', difficulty:2,
  question:'A MAN (Metropolitan Area Network) covers:',
  options:['a city or large campus','a single small room','wireless links only','the entire world'],
  answer:'a city or large campus', hint:'It is city-sized.',
  explanation:'A MAN covers a metropolitan area such as a city, connecting multiple buildings or campuses — larger than a LAN but smaller than a WAN.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-014', chapterId:'g9ict-networks', subsection:'network_types', difficulty:2,
  question:'A PAN (Personal Area Network) typically covers:',
  options:['a few metres round a person','the whole school building','a whole city district','an entire continent'],
  answer:'a few metres round a person', hint:'It is for your personal devices only.',
  explanation:'A PAN covers the area immediately surrounding one person, typically connecting personal devices such as a phone, laptop and headset via Bluetooth.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-015', chapterId:'g9ict-networks', subsection:'network_types', difficulty:2,
  question:'Which type of network connects the computers in a single school laboratory?',
  options:['LAN','WAN','MAN','PAN'],
  answer:'LAN', hint:'One room in one building.',
  explanation:'A single laboratory is a small, localised area, so the network connecting its computers is a Local Area Network (LAN).' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-016', chapterId:'g9ict-networks', subsection:'network_types', difficulty:2,
  question:'A VPN (Virtual Private Network) creates:',
  options:['an encrypted link over the internet','a private cable between two offices','a new kind of wireless signal','a faster internet connection'],
  answer:'an encrypted link over the internet', hint:'Private inside the public internet.',
  explanation:'A VPN encrypts data and tunnels it through the public internet so it is as secure as if the two ends were connected by a private cable.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-017', chapterId:'g9ict-networks', subsection:'network_types', difficulty:2,
  question:'The internet is best described as:',
  options:['a global network of networks','a wireless LAN for one country','one large computer in a centre','a type of web browser program'],
  answer:'a global network of networks', hint:'It connects millions of networks worldwide.',
  explanation:'The internet is a global system of interconnected computer networks, forming the largest WAN in existence.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-018', chapterId:'g9ict-networks', subsection:'network_types', difficulty:2,
  question:'Which network type is most commonly used by a business with offices in different countries?',
  options:['WAN','LAN','PAN','WLAN'],
  answer:'WAN', hint:'Country-to-country needs a wide area connection.',
  explanation:'A WAN connects geographically dispersed sites — such as international offices — over long distances using leased lines, the internet or satellite links.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-019', chapterId:'g9ict-networks', subsection:'network_types', difficulty:2,
  question:'WLAN stands for:',
  options:['Wireless Local Area Network','Wide Local Access Node','Wired LAN','Web Local Area Network'],
  answer:'Wireless Local Area Network', hint:'A LAN that uses radio waves instead of cables.',
  explanation:'A WLAN is a Local Area Network that uses Wi-Fi (radio waves) instead of physical cables to connect devices.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-020', chapterId:'g9ict-networks', subsection:'network_types', difficulty:2,
  question:'Bluetooth is typically used to create which type of network?',
  options:['PAN','LAN','WAN','MAN'],
  answer:'PAN', hint:'Bluetooth connects personal devices over a very short range.',
  explanation:'Bluetooth is the technology most commonly used for Personal Area Networks (PANs), connecting devices within a few metres of each other.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-021', chapterId:'g9ict-networks', subsection:'network_types', difficulty:2,
  question:'The main advantage of a WAN over a LAN is that a WAN:',
  options:['can span great distances','is cheaper to build than a LAN','needs no hardware to set up','is always faster than a LAN'],
  answer:'can span great distances', hint:'Distance is the defining feature of a WAN.',
  explanation:'A WAN covers large distances, enabling communication between offices, cities or countries that a LAN could never reach.' }));

// ── topologies: niv-022 to niv-031 ───────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-022', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
  question:'Network topology refers to:',
  options:['the arrangement of the devices','the speed of the connection','the brand of cable in use','the number of users on it'],
  answer:'the arrangement of the devices', hint:'It is the layout or shape of the network.',
  explanation:'Topology describes how the nodes and links of a network are arranged relative to each other.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-023', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
  question:'In a star topology, every computer is connected to:',
  options:['a central switch or hub','each other directly','one main cable','a circular loop of cable'],
  answer:'a central switch or hub', hint:'All cables meet at one central point.',
  explanation:'In a star topology, each device has its own cable running to a central switch or hub that manages all communication.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-024', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
  question:'The advantage of a star topology over a bus topology is that in a star topology:',
  options:['one cable fault affects one PC','all computers share one cable','fewer cables are used overall','no switch is needed at all'],
  answer:'one cable fault affects one PC', hint:'One broken cable does not break everything.',
  explanation:'In a star, each device has its own cable, so a cable fault isolates only that device. In a bus, a cable break stops the whole network.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-025', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
  question:'In a bus topology, all computers are connected to:',
  options:['one main cable (the backbone)','a central switch','a circular ring of cable','each other directly'],
  answer:'one main cable (the backbone)', hint:'One shared cable for everyone.',
  explanation:'A bus topology uses a single shared cable along which all devices are connected at different points.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-026', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
  question:'A disadvantage of bus topology is:',
  options:['one break stops the whole network','it cannot carry wireless devices','it needs the most cable of any','each PC needs its own switch'],
  answer:'one break stops the whole network', hint:'Everybody shares one cable.',
  explanation:'Because every device depends on the same backbone cable, a single cable fault brings the entire bus network down.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-027', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
  question:'In a ring topology, data travels:',
  options:['one way round the loop','along one main cable to all','directly from any to any','through a central hub'],
  answer:'one way round the loop', hint:'Think of a roundabout — traffic flows in one direction.',
  explanation:'In a ring topology, data packets are passed from one device to the next around the ring until they reach the intended recipient.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-028', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
  question:'In a mesh topology, each device is connected to:',
  options:['every other device','only the central switch','only its next neighbour','only the main server'],
  answer:'every other device', hint:'Many connections, many routes.',
  explanation:'A full mesh topology connects every node to every other node, providing many redundant paths so the network continues working even if several links fail.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-029', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
  question:'The main disadvantage of a star topology is that:',
  options:['if the central switch fails, the whole network goes down','it is impossible to add new computers','it uses no cables at all','each computer must connect to every other computer'],
  answer:'if the central switch fails, the whole network goes down', hint:'The switch is a single point of failure.',
  explanation:'In a star topology, all communication passes through the central switch; if it fails, every device loses its connection.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-030', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
  question:'A hybrid topology is:',
  options:['a mix of two topologies','a bus with a wireless part','a ring with no central hub','a wireless-only topology'],
  answer:'a mix of two topologies', hint:'Mix and match.',
  explanation:'A hybrid topology combines two or more basic topologies — for example, a star-bus or star-ring — to take advantage of the strengths of each.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-031', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
  question:'Which topology is most commonly used in modern office LANs?',
  options:['Star','Bus','Ring','Mesh'],
  answer:'Star', hint:'Most networks use a central switch.',
  explanation:'Star topology is the most widely used in modern LANs because it is easy to manage, faults are isolated to individual links, and it is straightforward to expand.' }));

// ── network_components: niv-032 to niv-041 ───────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-032', chapterId:'g9ict-networks', subsection:'network_components', difficulty:2,
  question:'A router is a network device that:',
  options:['forwards data between networks','amplifies the signal on a cable','stores shared files for users','lets wireless devices connect'],
  answer:'forwards data between networks', hint:'It routes traffic between networks.',
  explanation:'A router reads each packet\'s destination address and forwards it along the best available path between networks.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-033', chapterId:'g9ict-networks', subsection:'network_components', difficulty:2,
  question:'A switch is a network device that:',
  options:['sends data to the right device','connects two different networks','gives wireless internet access','amplifies and extends a signal'],
  answer:'sends data to the right device', hint:'It is smarter than a hub.',
  explanation:'A switch forwards each data frame only to the specific port where the destination device is connected, unlike a hub which broadcasts to all ports.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-034', chapterId:'g9ict-networks', subsection:'network_components', difficulty:2,
  question:'A hub differs from a switch because a hub:',
  options:['sends data to every device','connects two separate networks','sends data only where needed','filters data for security'],
  answer:'sends data to every device', hint:'A hub broadcasts; a switch targets.',
  explanation:'A hub broadcasts every data frame to all connected ports, wasting bandwidth; a switch learns which device is on which port and sends data only where needed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-035', chapterId:'g9ict-networks', subsection:'network_components', difficulty:2,
  question:'A Network Interface Card (NIC) is:',
  options:['the hardware that joins a network','a program that monitors traffic','a type of firewall software','a device that boosts Wi-Fi'],
  answer:'the hardware that joins a network', hint:'Every networked computer has one.',
  explanation:'A NIC is the physical adapter inside (or attached to) a computer that provides the electrical or wireless interface to the network.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-036', chapterId:'g9ict-networks', subsection:'network_components', difficulty:2,
  question:'A wireless access point (WAP) is used to:',
  options:['link Wi-Fi devices to a LAN','connect two routers together','back up data on the network','filter harmful web content'],
  answer:'link Wi-Fi devices to a LAN', hint:'It bridges wireless and wired networks.',
  explanation:'A WAP provides a Wi-Fi connection for wireless devices and bridges them to the wired network infrastructure.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-037', chapterId:'g9ict-networks', subsection:'network_components', difficulty:2,
  question:'A modem is a device that:',
  options:['converts digital to analogue','firewalls the LAN from the web','amplifies Wi-Fi in a building','stores shared files for a LAN'],
  answer:'converts digital to analogue', hint:'Modem = MOdulator-DEModulator.',
  explanation:'A modem modulates digital data into analogue signals for transmission and demodulates incoming signals back into digital data.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-038', chapterId:'g9ict-networks', subsection:'network_components', difficulty:2,
  question:'A repeater in a network is used to:',
  options:['boost a signal to go further','store the network passwords','filter out unwanted traffic','join two different networks'],
  answer:'boost a signal to go further', hint:'Signals weaken over distance.',
  explanation:'A repeater receives a weakened signal and re-transmits it at full strength, extending the effective range of the network.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-039', chapterId:'g9ict-networks', subsection:'network_components', difficulty:2,
  question:'A network cable made of glass or plastic that transmits data as pulses of light is called:',
  options:['fibre optic cable','coaxial cable','twisted pair cable','Ethernet cable'],
  answer:'fibre optic cable', hint:'Light, not electricity.',
  explanation:'Fibre optic cables carry data as pulses of light, offering very high bandwidth and immunity to electrical interference.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-040', chapterId:'g9ict-networks', subsection:'network_components', difficulty:2,
  question:'The MAC address of a network device is:',
  options:['a unique address on the NIC','the address set by the router','the serial number of the PC','the wireless frequency used'],
  answer:'a unique address on the NIC', hint:'It is built in at the factory.',
  explanation:'A MAC (Media Access Control) address is a unique 48-bit hardware identifier permanently assigned to a NIC by its manufacturer.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-041', chapterId:'g9ict-networks', subsection:'network_components', difficulty:2,
  question:'An Internet Service Provider (ISP) is:',
  options:['a company that provides access to the internet for a fee','a type of network switch','a government department that controls internet content','a program that measures network speed'],
  answer:'a company that provides access to the internet for a fee', hint:'They sell the internet connection.',
  explanation:'An ISP (such as a telecoms company) sells internet connectivity services to homes, schools and businesses.' }));

// ── wired_wireless: niv-042 to niv-051 ───────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-042', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:2,
  question:'One advantage of a wired network connection over a wireless one is that it:',
  options:['is faster and more reliable','lets users move around freely','connects more devices at once','needs no cabling at all'],
  answer:'is faster and more reliable', hint:'Cables provide a dedicated, stable path.',
  explanation:'A wired Ethernet connection provides a dedicated channel with no radio interference, giving more consistent speeds and reliability than Wi-Fi.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-043', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:2,
  question:'One advantage of a wireless (Wi-Fi) network over a wired one is:',
  options:['users can move around freely','it is always faster than wire','it is more secure than wire','no access point is needed'],
  answer:'users can move around freely', hint:'No cable means mobility.',
  explanation:'Wi-Fi allows devices such as laptops and phones to connect from anywhere within range without the constraint of a physical cable.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-044', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:2,
  question:'Wi-Fi uses which type of signal to transmit data?',
  options:['Radio waves','Light pulses','Sound waves','Electrical pulses in a copper wire'],
  answer:'Radio waves', hint:'It is a form of wireless radio communication.',
  explanation:'Wi-Fi transmits data using radio frequency waves, typically in the 2.4 GHz or 5 GHz bands.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-045', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:2,
  question:'An SSID is:',
  options:['the name of a Wi-Fi network','the IP address of the router','the password for the Wi-Fi','the frequency band in use'],
  answer:'the name of a Wi-Fi network', hint:'It is what you see in the list of available Wi-Fi networks.',
  explanation:'SSID (Service Set Identifier) is the human-readable name assigned to a Wi-Fi network, displayed to users when they scan for networks.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-046', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:2,
  question:'WPA2 is a:',
  options:['wireless security protocol','brand of wireless router','type of networking cable','network speed standard'],
  answer:'wireless security protocol', hint:'It encrypts Wi-Fi traffic.',
  explanation:'WPA2 (Wi-Fi Protected Access 2) encrypts data transmitted over a Wi-Fi network, protecting it from unauthorised interception.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-047', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:2,
  question:'One security risk of an open (unsecured) Wi-Fi network is:',
  options:['anyone nearby can connect','all devices share a password','the network runs too fast','the router will overheat'],
  answer:'anyone nearby can connect', hint:'No password, no protection.',
  explanation:'An open Wi-Fi network has no encryption or password, so anyone nearby can connect and eavesdrop on unencrypted traffic.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-048', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:2,
  question:'The twisted pair cable most commonly used in wired Ethernet LANs is:',
  options:['Cat5e or Cat6 UTP cable','Fibre optic cable','Coaxial cable','HDMI cable'],
  answer:'Cat5e or Cat6 UTP cable', hint:'UTP stands for Unshielded Twisted Pair.',
  explanation:'Cat5e and Cat6 UTP (Unshielded Twisted Pair) cables are the standard wired connections in Ethernet LANs, supporting speeds of 100 Mbps to 10 Gbps.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-049', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:2,
  question:'Which standard connector is used at each end of a UTP Ethernet cable?',
  options:['RJ-45','USB-A','HDMI','VGA'],
  answer:'RJ-45', hint:'It looks like a wide telephone plug.',
  explanation:'RJ-45 is the 8-pin connector used on Ethernet cables to plug into network switches, routers and computers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-050', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:2,
  question:'The signal range of a typical 2.4 GHz Wi-Fi network indoors is approximately:',
  options:['30 to 50 metres','500 metres','5 kilometres','1 metre'],
  answer:'30 to 50 metres', hint:'Walls reduce the range considerably.',
  explanation:'A 2.4 GHz Wi-Fi signal typically reaches 30–50 metres indoors before it weakens too much; walls and interference reduce this further.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-051', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:2,
  question:'The 5 GHz Wi-Fi band compared to 2.4 GHz offers:',
  options:['faster speeds but a shorter range','slower speeds but a longer range','identical speeds and range','no wireless signals at all'],
  answer:'faster speeds but a shorter range', hint:'Higher frequency = faster but shorter.',
  explanation:'The 5 GHz band provides higher bandwidth and less interference than 2.4 GHz but has a shorter effective range because higher frequencies are absorbed more quickly by obstacles.' }));

// ── intranet_extranet: niv-052 to niv-061 ────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-052', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:2,
  question:'An intranet is:',
  options:['a private organisation network','any wireless local area network','a network that only sends email','the global public internet'],
  answer:'a private organisation network', hint:'Like the internet but private.',
  explanation:'An intranet uses web technologies (browsers, pages, servers) but is restricted to authorised users within the organisation.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-053', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:2,
  question:'An extranet is:',
  options:['an intranet opened to partners','a wireless network for customers','the internet within one country','a backup of a company intranet'],
  answer:'an intranet opened to partners', hint:'Intranet extended outward to selected partners.',
  explanation:'An extranet gives controlled access to selected parts of an intranet to trusted external users such as suppliers, customers or business partners.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-054', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:2,
  question:'A school intranet might be used to:',
  options:['share timetables and notices','broadcast TV to the classrooms','give the public school files','replace the library books'],
  answer:'share timetables and notices', hint:'It is internal to the school.',
  explanation:'A school intranet provides a secure internal web portal where staff and students can access timetables, homework, announcements and resources.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-055', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:2,
  question:'What prevents unauthorised users from accessing an intranet from outside the organisation?',
  options:['A firewall and login credentials','The physical size of the building','The colour of the cable used','The number of printers connected'],
  answer:'A firewall and login credentials', hint:'Security controls are needed.',
  explanation:'A firewall blocks external access, and login authentication ensures only authorised users can connect to the intranet.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-056', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:2,
  question:'The main difference between an intranet and the internet is:',
  options:['an intranet is private, not public','an intranet can only send emails','the internet needs a desktop PC','an intranet is always wireless'],
  answer:'an intranet is private, not public', hint:'Private versus public is the key distinction.',
  explanation:'An intranet is a closed network accessible only to those within the organisation; the internet is a public global network.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-057', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:2,
  question:'A company uses an extranet to allow its suppliers to check stock levels. This is beneficial because:',
  options:['suppliers need not phone or email','stock is reordered automatically','the data becomes public to all','staff can no longer see stock'],
  answer:'suppliers need not phone or email', hint:'Direct access saves time for both parties.',
  explanation:'Giving suppliers controlled access to stock data reduces the time spent on phone calls and emails, streamlining the supply chain.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-058', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:2,
  question:'Which of the following technologies is typically used to build both intranets and extranets?',
  options:['Web browsers and HTTPS servers','Bluetooth and infrared links','Radio broadcasting equipment','Postal and courier delivery'],
  answer:'Web browsers and HTTPS servers', hint:'They use the same technology as the public internet.',
  explanation:'Intranets and extranets use standard web technologies — browsers, HTTP/HTTPS, web servers — but restrict access through authentication and firewalls.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-059', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:2,
  question:'An intranet helps a large organisation by:',
  options:['centralising internal sharing','giving the press all the data','replacing the whole internet','removing the need for email'],
  answer:'centralising internal sharing', hint:'It is the company\'s internal web.',
  explanation:'An intranet gives employees a shared platform for news, policies, forms, project documents and internal communication.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-060', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:2,
  question:'An extranet improves upon a simple intranet by:',
  options:['letting trusted outsiders in','making all data fully public','giving everyone an account','removing security measures'],
  answer:'letting trusted outsiders in', hint:'Controlled external access is what makes it an extranet.',
  explanation:'An extranet extends intranet access to specific external users with their own login credentials, without making the whole intranet public.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-061', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:2,
  question:'A hospital uses an extranet to allow a patient\'s GP to view test results. This is an example of:',
  options:['controlled access for a partner','replacing email with social media','making records public to all','joining two hospitals by LAN'],
  answer:'controlled access for a partner', hint:'The GP is an external but trusted party.',
  explanation:'The hospital extranet lets the GP access specific patient data securely without being a hospital employee or gaining access to the full internal system.' }));

// ══════════════════════════════════════════════════════════════════════
// INTERNET section: g9ict-niv-062 to g9ict-niv-120
// chapterId: 'g9ict-internet'
// ══════════════════════════════════════════════════════════════════════

// ── internet_www: niv-062 to niv-071 ─────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-062', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:2,
  question:'The World Wide Web (WWW) is:',
  options:['linked web pages read in a browser','exactly the same as the internet','a wireless networking standard','a service for sending email'],
  answer:'linked web pages read in a browser', hint:'The web is one service that runs on the internet.',
  explanation:'The World Wide Web is a collection of web pages and sites connected by hyperlinks, hosted on servers and accessed via a web browser over the internet.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-063', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:2,
  question:'HTTP stands for:',
  options:['HyperText Transfer Protocol','High Technology Transfer Process','Home Terminal Transfer Program','HyperText Translation Protocol'],
  answer:'HyperText Transfer Protocol', hint:'It is the protocol for transmitting web pages.',
  explanation:'HTTP (HyperText Transfer Protocol) defines how web pages are requested by browsers and delivered by web servers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-064', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:2,
  question:'HTTPS differs from HTTP because HTTPS:',
  options:['encrypts the data in transit','can only be used for email','does not use the internet','is faster but less secure'],
  answer:'encrypts the data in transit', hint:'The S stands for Secure.',
  explanation:'HTTPS uses SSL/TLS encryption to secure the connection, protecting data in transit from interception.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-065', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:2,
  question:'A URL (Uniform Resource Locator) is:',
  options:['the address of a web resource','a type of wireless protocol','the name of the web browser','the password for a website'],
  answer:'the address of a web resource', hint:'It is what you type in the address bar.',
  explanation:'A URL is the complete address of a resource on the web, including the protocol (https://), the domain name and the path.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-066', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:2,
  question:'DNS (Domain Name System) converts:',
  options:['domain names into IP addresses','email addresses into postcodes','web pages into spoken audio','images into text for speed'],
  answer:'domain names into IP addresses', hint:'It is the internet\'s phone book.',
  explanation:'DNS translates domain names into the numerical IP addresses needed to route traffic to the correct server.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-067', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:2,
  question:'A web server is a computer that:',
  options:['stores and delivers web pages to browsers on request','is used by one person to browse the internet','connects the LAN to the telephone network','stores only the images used on websites'],
  answer:'stores and delivers web pages to browsers on request', hint:'It serves the pages to your browser.',
  explanation:'A web server stores website files and responds to HTTP/HTTPS requests by sending the requested pages to the client browser.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-068', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:2,
  question:'A hyperlink on a web page is:',
  options:['a clickable link to another page','a form of encryption for a site','a type of image inside a page','a menu bar in the browser'],
  answer:'a clickable link to another page', hint:'Click it and you go somewhere.',
  explanation:'A hyperlink (link) is a clickable word, phrase or image that navigates the user to another URL when clicked.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-069', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:2,
  question:'The domain extension ".edu" in a web address indicates:',
  options:['an educational institution','a government website','a commercial organisation','a network service provider'],
  answer:'an educational institution', hint:'edu = education.',
  explanation:'The .edu top-level domain is used by educational institutions such as schools and universities, mainly in the United States.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-070', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:2,
  question:'HTML (HyperText Markup Language) is used to:',
  options:['structure the content of pages','protect data with encryption','connect computers in a LAN','filter emails for spam'],
  answer:'structure the content of pages', hint:'Web pages are written in HTML.',
  explanation:'HTML is the markup language used to create web pages; it uses tags to define headings, paragraphs, links, images and other elements.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-071', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:2,
  question:'Hosting a website means:',
  options:['storing its files on a web server','registering a domain name for it','designing how the site will look','writing the HTML for each page'],
  answer:'storing its files on a web server', hint:'The files must live on a server permanently.',
  explanation:'Web hosting provides server space and an internet connection to store website files so they can be accessed by visitors 24 hours a day.' }));

// ── email: niv-072 to niv-081 ─────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-072', chapterId:'g9ict-internet', subsection:'email', difficulty:2,
  question:'An email address has the format:',
  options:['username@domain.extension','username//domain.extension','username.domain@extension','username:domain:extension'],
  answer:'username@domain.extension', hint:'The @ symbol separates the user from the domain.',
  explanation:'Email addresses follow the format: a local part (username), an @ symbol, and the domain (such as gmail.com).' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-073', chapterId:'g9ict-internet', subsection:'email', difficulty:2,
  question:'SMTP is the protocol used to:',
  options:['send email to a mail server','transfer files between servers','request and browse web pages','fetch email from a server'],
  answer:'send email to a mail server', hint:'SMTP = Simple Mail Transfer Protocol — for sending.',
  explanation:'SMTP (Simple Mail Transfer Protocol) handles the sending and routing of email between mail servers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-074', chapterId:'g9ict-internet', subsection:'email', difficulty:2,
  question:'The CC field in an email is used to:',
  options:['copy others who are all visible','set the priority of a message','send a copy nobody else sees','attach a file to the email'],
  answer:'copy others who are all visible', hint:'CC = Carbon Copy — visible to all.',
  explanation:'CC (Carbon Copy) sends a copy to extra recipients; all recipients can see the CC addresses. BCC hides the copy recipient.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-075', chapterId:'g9ict-internet', subsection:'email', difficulty:2,
  question:'The BCC field in an email is used to:',
  options:['copy someone else invisibly','mark the message high priority','attach a file to the message','set a read receipt for it'],
  answer:'copy someone else invisibly', hint:'BCC = Blind Carbon Copy.',
  explanation:'BCC (Blind Carbon Copy) adds a recipient whose address is invisible to all other recipients, protecting their privacy.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-076', chapterId:'g9ict-internet', subsection:'email', difficulty:2,
  question:'An email attachment is:',
  options:['a file sent along with an email message','the subject line of the email','the email address of the sender','a link within the body of the email'],
  answer:'a file sent along with an email message', hint:'A document or image sent with the email.',
  explanation:'An attachment is a file (document, image, spreadsheet, etc.) included with an email message.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-077', chapterId:'g9ict-internet', subsection:'email', difficulty:2,
  question:'Forwarding an email means:',
  options:['sending a received message on to another recipient','sending your own reply to the original sender','deleting the message from the inbox','moving the message to a folder'],
  answer:'sending a received message on to another recipient', hint:'Pass it on to someone else.',
  explanation:'Forwarding sends a copy of a received email to a new recipient who was not in the original correspondence.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-078', chapterId:'g9ict-internet', subsection:'email', difficulty:2,
  question:'An email signature is:',
  options:['text added to every message sent','the subject line repeated at the end','a certificate proving it is genuine','a watermark image on the message'],
  answer:'text added to every message sent', hint:'It is your auto-added sign-off.',
  explanation:'An email signature is a personalised block of text — name, title, phone, website — appended automatically to messages.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-079', chapterId:'g9ict-internet', subsection:'email', difficulty:2,
  question:'An advantage of email over sending a printed letter is that email:',
  options:['arrives almost instantly','can carry handwritten notes','always guarantees a reply','requires a postage stamp'],
  answer:'arrives almost instantly', hint:'Speed is the biggest advantage.',
  explanation:'Email is delivered in seconds regardless of the recipient\'s location, whereas a posted letter may take days or weeks.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-080', chapterId:'g9ict-internet', subsection:'email', difficulty:2,
  question:'A junk mail or spam filter moves suspected spam to:',
  options:['the Junk or Spam folder','the Deleted Items folder','the Sent Items folder','the Drafts folder'],
  answer:'the Junk or Spam folder', hint:'Spam goes to a separate folder.',
  explanation:'Spam filters analyse incoming messages and move those suspected of being unwanted bulk email to a dedicated Junk/Spam folder.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-081', chapterId:'g9ict-internet', subsection:'email', difficulty:2,
  question:'Webmail allows a user to:',
  options:['read email in any browser','send email with no connection','send only encrypted messages','send email from one PC only'],
  answer:'read email in any browser', hint:'No software to install — just a browser.',
  explanation:'Webmail stores messages on a server and provides access through a browser, so the user can read and send email from any device with internet access.' }));

// ── browsers_search: niv-082 to niv-091 ──────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-082', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:2,
  question:'A web browser is software used to:',
  options:['display pages from the web','protect against computer viruses','send and receive email messages','create web pages from scratch'],
  answer:'display pages from the web', hint:'It is what you use to visit websites.',
  explanation:'A web browser (such as Chrome, Firefox, Edge or Safari) renders web pages by interpreting HTML and displaying the content.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-083', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:2,
  question:'A search engine is used to:',
  options:['find pages matching keywords','create and publish new websites','write and send email messages','connect devices in a LAN'],
  answer:'find pages matching keywords', hint:'Type a word and it finds relevant pages.',
  explanation:'A search engine (such as Google, Bing or Yahoo) indexes billions of web pages and returns a ranked list matching the user\'s search terms.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-084', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:2,
  question:'The browser\'s address bar is used to:',
  options:['type a URL to visit a site','show the pages visited before','show the size of the page','display the user\'s email'],
  answer:'type a URL to visit a site', hint:'Type the full URL there.',
  explanation:'The address bar displays the current URL and allows the user to type any web address to navigate directly to that page.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-085', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:2,
  question:'Browser bookmarks (or favourites) are used to:',
  options:['save an address for later','report a site to authorities','speed up loading of pages','block adverts on websites'],
  answer:'save an address for later', hint:'Mark a page you want to find again.',
  explanation:'Bookmarks store a URL so the user can return to a page quickly without having to retype or search for the address.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-086', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:2,
  question:'Browser history shows:',
  options:['the sites visited recently','the number of downloads made','all of the saved passwords','the contents of the cache'],
  answer:'the sites visited recently', hint:'It records where you have been.',
  explanation:'Browser history is a chronological list of all web pages visited in recent sessions, allowing the user to revisit them easily.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-087', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:2,
  question:'Using quotation marks around a search term (e.g., "World Cup") in a search engine:',
  options:['finds that exact phrase only','excludes pages with those words','translates the search terms','searches one website only'],
  answer:'finds that exact phrase only', hint:'Quotes lock in the exact phrase.',
  explanation:'Enclosing a phrase in quotation marks tells the search engine to find only pages where those words appear together in that exact order.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-088', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:2,
  question:'The browser cache stores:',
  options:['copies of pages for faster reloads','the passwords the user has saved','all the email messages received','the list of blocked websites'],
  answer:'copies of pages for faster reloads', hint:'Local copies save downloading the same files again.',
  explanation:'The cache saves web page images, scripts and CSS files locally; on a return visit, the browser loads these from the cache rather than re-downloading them, speeding up the page.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-089', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:2,
  question:'Browsing the web in private or incognito mode means:',
  options:['no history is kept on the device','the connection is always encrypted','nobody online can see the activity','the user is anonymous to websites'],
  answer:'no history is kept on the device', hint:'Local privacy only — the website and ISP can still see you.',
  explanation:'Private/incognito mode prevents the browser from saving history, cookies and form data locally, but the user\'s activity is still visible to the website and ISP.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-090', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:2,
  question:'Evaluating the reliability of information found on a website involves checking:',
  options:['the author, date and sources','the speed the page loads at','the number of images shown','the colour scheme and font'],
  answer:'the author, date and sources', hint:'Author, date and sources are key signs of reliability.',
  explanation:'Reliable web information comes from identifiable authors, is current, and supports its claims with references to other trustworthy sources.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-091', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:2,
  question:'A pop-up blocker in a browser is used to:',
  options:['stop unwanted windows opening','translate pages into French','store the user bookmarks','speed up the connection'],
  answer:'stop unwanted windows opening', hint:'It blocks new windows that open without the user asking.',
  explanation:'A pop-up blocker stops websites from automatically opening new browser windows or tabs, which are often used for advertising or phishing.' }));

// ── e_services: niv-092 to niv-101 ───────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-092', chapterId:'g9ict-internet', subsection:'e_services', difficulty:2,
  question:'E-commerce refers to:',
  options:['buying and selling online','designing business websites','managing a company network','emailing all the customers'],
  answer:'buying and selling online', hint:'Electronic commerce.',
  explanation:'E-commerce covers all commercial transactions conducted online, including retail, business-to-business and consumer-to-consumer sales.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-093', chapterId:'g9ict-internet', subsection:'e_services', difficulty:2,
  question:'Internet banking allows customers to:',
  options:['manage accounts and pay online','open an account with no details','buy shares on the stock market','print statements in the branch'],
  answer:'manage accounts and pay online', hint:'All your banking, online.',
  explanation:'Internet banking provides secure online access to account information, balance checks, transfers, bill payments and other banking services.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-094', chapterId:'g9ict-internet', subsection:'e_services', difficulty:2,
  question:'An advantage of online shopping compared to visiting a physical store is:',
  options:['you can shop at any time of day without leaving home','products are always cheaper online','delivery is always free','there is no risk of receiving a wrong item'],
  answer:'you can shop at any time of day without leaving home', hint:'24/7 availability.',
  explanation:'Online stores are open around the clock, allowing customers to browse and buy at any hour without travelling to a shop.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-095', chapterId:'g9ict-internet', subsection:'e_services', difficulty:2,
  question:'A disadvantage of online shopping is:',
  options:['you cannot physically handle the product before buying it','you must always pay in cash','delivery always takes less than one hour','the website is available only during shop opening hours'],
  answer:'you cannot physically handle the product before buying it', hint:'You cannot try it before you buy.',
  explanation:'Online shopping means customers cannot touch, try on or fully inspect products before purchasing, leading to a higher rate of returns.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-096', chapterId:'g9ict-internet', subsection:'e_services', difficulty:2,
  question:'E-government services allow citizens to:',
  options:['submit official forms online','vote by playing a video game','speak to the head of state','get free internet for life'],
  answer:'submit official forms online', hint:'Government services delivered electronically.',
  explanation:'E-government provides online access to services such as tax filing, passport applications, licence renewals and benefit claims.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-097', chapterId:'g9ict-internet', subsection:'e_services', difficulty:2,
  question:'Video conferencing allows:',
  options:['live meetings by video online','watching recorded video on demand','very large files to be emailed','remote control with no video'],
  answer:'live meetings by video online', hint:'Real-time audio and video between remote participants.',
  explanation:'Video conferencing (Zoom, Teams, Google Meet) enables live audio and video meetings between participants anywhere in the world.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-098', chapterId:'g9ict-internet', subsection:'e_services', difficulty:2,
  question:'Online learning (e-learning) benefits students by:',
  options:['letting them study anywhere','replacing writing with games','granting a pass with no test','needing no computer at all'],
  answer:'letting them study anywhere', hint:'Flexibility is the key benefit.',
  explanation:'E-learning lets students access course materials and complete activities whenever and wherever they have internet access.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-099', chapterId:'g9ict-internet', subsection:'e_services', difficulty:2,
  question:'When paying online, the padlock symbol and https in the address bar mean:',
  options:['the connection is encrypted','the government approved it','delivery will be instant','the purchase is free'],
  answer:'the connection is encrypted', hint:'https and a padlock = secure connection.',
  explanation:'The padlock and https indicate that the connection is secured with TLS encryption, protecting payment details in transit.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-100', chapterId:'g9ict-internet', subsection:'e_services', difficulty:2,
  question:'Streaming a film online differs from downloading it because streaming:',
  options:['plays without saving a copy','saves a permanent file on disk','needs more storage than a file','takes longer to start playing'],
  answer:'plays without saving a copy', hint:'Stream now, not saved for later.',
  explanation:'Streaming plays content in real time as it arrives; downloading saves the complete file for repeated local playback.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-101', chapterId:'g9ict-internet', subsection:'e_services', difficulty:2,
  question:'Cloud storage (such as Google Drive or OneDrive) allows users to:',
  options:['reach their files from anywhere','play video games against others','save files on a USB drive only','email without an email address'],
  answer:'reach their files from anywhere', hint:'Files in the cloud are accessible from anywhere.',
  explanation:'Cloud storage saves files on remote servers managed by a provider, making them accessible from any device with internet access.' }));

// ── web_tools: niv-102 to niv-110 ────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-102', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:2,
  question:'A blog is best described as:',
  options:['an online journal, newest first','a device that reaches the internet','a kind of internet search engine','a program for managing email'],
  answer:'an online journal, newest first', hint:'Blog = web log.',
  explanation:'A blog is an online journal or informational website where the author posts regular entries (articles); readers can usually add comments.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-103', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:2,
  question:'A wiki is a website that:',
  options:['many users can edit together','updates its news every minute','one person can read at a time','only researchers may look at'],
  answer:'many users can edit together', hint:'Wikipedia is the most famous example.',
  explanation:'A wiki is a web platform that allows any authorised user to create, edit and delete pages, building a collaborative knowledge base.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-104', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:2,
  question:'Social networking sites (such as Facebook or Instagram) allow users to:',
  options:['share content with a community','manage network hardware remotely','store large files in the cloud','design professional websites'],
  answer:'share content with a community', hint:'They connect people socially online.',
  explanation:'Social networks provide platforms for users to share updates, photos and messages, and to interact with friends, family and groups.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-105', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:2,
  question:'A podcast is:',
  options:['an audio series published online','a form of online banking service','a social media post of text only','a video call between two people'],
  answer:'an audio series published online', hint:'You listen to a podcast.',
  explanation:'A podcast is an audio file (or series of audio files) published online; subscribers are notified when new episodes are released.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-106', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:2,
  question:'Instant messaging (IM) allows users to:',
  options:['exchange text messages in real time over the internet','send an email that arrives within one hour','schedule a video call for a later time','post a message visible to all internet users'],
  answer:'exchange text messages in real time over the internet', hint:'Messages appear instantly.',
  explanation:'Instant messaging allows real-time text communication between users who are online at the same time.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-107', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:2,
  question:'RSS (Really Simple Syndication) allows users to:',
  options:['gather site updates in one reader','block unwanted web advertisements','send automatic email replies','encrypt their browsing data'],
  answer:'gather site updates in one reader', hint:'Subscribe once and updates come to you.',
  explanation:'An RSS feed delivers new articles or posts from subscribed websites directly to the user\'s feed reader, without needing to visit each site.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-108', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:2,
  question:'An online forum is a place where:',
  options:['users post questions and replies','programs are downloaded and run','governments control the traffic','files are backed up each night'],
  answer:'users post questions and replies', hint:'A discussion board.',
  explanation:'An online forum is a community discussion platform where users post messages, ask questions and reply in threaded conversations on specific topics.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-109', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:2,
  question:'VoIP (Voice over Internet Protocol) allows:',
  options:['phone calls over the internet','video streamed in high definition','websites translated into French','data to be compressed for speed'],
  answer:'phone calls over the internet', hint:'Internet telephone calls.',
  explanation:'VoIP converts voice into digital data packets and transmits them over the internet, enabling free or low-cost calls anywhere in the world.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-110', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:2,
  question:'Uploading content to a video-sharing site (such as YouTube) allows:',
  options:['anyone with access to the site to watch the video','only the uploader to watch the video','the video to play without an internet connection','other users to edit the video directly'],
  answer:'anyone with access to the site to watch the video', hint:'Shared content can be watched by others.',
  explanation:'Uploading a video to a public video-sharing platform makes it accessible to any viewer with internet access and the site\'s address.' }));

// ── web_design_principles: niv-111 to niv-120 ────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-111', chapterId:'g9ict-internet', subsection:'web_design_principles', difficulty:2,
  question:'Navigation on a website should be:',
  options:['consistent and easy to use','hidden behind a secret button','placed at the page foot only','different on every page'],
  answer:'consistent and easy to use', hint:'Easy navigation keeps visitors on the site.',
  explanation:'Consistent, clear navigation helps users locate content efficiently; inconsistent menus confuse visitors and increase the likelihood they leave the site.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-112', chapterId:'g9ict-internet', subsection:'web_design_principles', difficulty:2,
  question:'A website with good readability uses:',
  options:['clear contrast and a good size','several different fonts per page','very small text to fit more in','dark green text on black'],
  answer:'clear contrast and a good size', hint:'Contrast, size and spacing all affect readability.',
  explanation:'Good readability requires a font large enough to read comfortably, clear contrast between text and its background, and enough white space between lines and paragraphs.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-113', chapterId:'g9ict-internet', subsection:'web_design_principles', difficulty:2,
  question:'A responsive website is one that:',
  options:['adapts to any screen size','loads instantly on any line','responds to voice commands','never contains any images'],
  answer:'adapts to any screen size', hint:'It responds to the screen size.',
  explanation:'A responsive design uses flexible grids and CSS media queries to rearrange content so it looks good on any device, from a large monitor to a small phone.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-114', chapterId:'g9ict-internet', subsection:'web_design_principles', difficulty:2,
  question:'Accessibility in web design means:',
  options:['people with disabilities can use it','only registered users may read it','the site loads faster than others','all images are removed from it'],
  answer:'people with disabilities can use it', hint:'Everyone should be able to use the site.',
  explanation:'Web accessibility ensures people with visual, hearing, motor or cognitive disabilities can access and use the site, for example through screen readers, captions and keyboard navigation.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-115', chapterId:'g9ict-internet', subsection:'web_design_principles', difficulty:2,
  question:'The purpose of white space (negative space) in web design is to:',
  options:['keep the page from looking cluttered','save bandwidth by cutting content','hide parts of the page from users','make the site load more slowly'],
  answer:'keep the page from looking cluttered', hint:'Space lets the eye rest.',
  explanation:'White space around text and images reduces visual noise, making the layout cleaner and the content easier to read.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-116', chapterId:'g9ict-internet', subsection:'web_design_principles', difficulty:2,
  question:'Web pages should load quickly because:',
  options:['users leave a slow page','privacy law requires slowness','images look better when slow','a slow page is more secure'],
  answer:'users leave a slow page', hint:'People are impatient online.',
  explanation:'Studies show that many users abandon a page that takes more than a few seconds to load, so fast load times are critical for keeping visitors.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-117', chapterId:'g9ict-internet', subsection:'web_design_principles', difficulty:2,
  question:'Using too many different fonts on a website makes it look:',
  options:['unprofessional and cluttered','more attractive and colourful','much faster to load fully','more secure for shoppers'],
  answer:'unprofessional and cluttered', hint:'Consistency in typography is important.',
  explanation:'Mixing many fonts creates visual confusion; professional sites typically use two fonts at most — one for headings and one for body text.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-118', chapterId:'g9ict-internet', subsection:'web_design_principles', difficulty:2,
  question:'A sitemap is:',
  options:['a list of all the site pages','a style sheet for the layout','a map of the server location','a history of all site visits'],
  answer:'a list of all the site pages', hint:'It is the architecture plan of the site.',
  explanation:'A sitemap is an organised list (or visual diagram) of all the pages in a website, showing the hierarchy and links between them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-119', chapterId:'g9ict-internet', subsection:'web_design_principles', difficulty:2,
  question:'A "call to action" button on a web page is designed to:',
  options:['prompt the visitor to act','show the owner contact details','navigate to the sitemap page','display the privacy policy'],
  answer:'prompt the visitor to act', hint:'Buy Now, Sign Up, Learn More are common examples.',
  explanation:'A call-to-action (CTA) button guides visitors towards a desired action; it should be visually prominent and clearly worded.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-niv-120', chapterId:'g9ict-internet', subsection:'web_design_principles', difficulty:2,
  question:'Breadcrumb navigation on a website shows:',
  options:['the path taken to this page','recently visited outside sites','a progress bar for downloads','the images left on the page'],
  answer:'the path taken to this page', hint:'Home > Products > Electronics > Phones is an example.',
  explanation:'Breadcrumb navigation displays the hierarchy of pages leading to the current location, letting users navigate back to any level easily.' }));

})();
