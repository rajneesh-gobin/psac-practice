'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT — Additional NCE-style multi-part tasks
//  IDs: g9ict-task-001 to g9ict-task-028
//  All subsection tags are declared in the chapter _manifest.js files.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const tf = answer => ({ kind: 'choice', variant: 'tick', options: ['True', 'False'], answer: answer });
const pick = (options, answer) => ({ kind: 'choice', options: options, answer: answer });
const gaps = (answer, extra) => Object.assign({ kind: 'blanks',
  answer: answer.map(function (a) { return Array.isArray(a) ? a : [a]; }) }, extra || {});
const bank = words =>
  '<div style="border:1px solid #000;padding:6px 10px;margin:6px 0;text-align:center">'
  + words.join(' &nbsp;&middot;&nbsp; ') + '</div>';
const matchList = items =>
  '<div style="margin:4px 0 6px 10px">'
  + items.map(function (t, i) { return '<div>' + String.fromCharCode(65 + i) + '&nbsp;&nbsp;' + t + '</div>'; }).join('')
  + '</div>';

const T = [];

// ── Computer Systems ──────────────────────────────────────────────────────

T.push({
  id: 'g9ict-task-001', chapterId: 'g9ict-computer-systems', subsection: 'input_devices',
  difficulty: 2,
  intro: 'For each device below, tick whether it is an <b>input</b>, <b>output</b> or <b>storage</b> device.',
  parts: [
    { label: 'a', marks: 1, prompt: 'A barcode scanner at a supermarket checkout.',
      response: { kind: 'choice', variant: 'tick', options: ['Input', 'Output', 'Storage'], answer: 'Input' },
      hint: 'It reads data into the computer.', explanation: 'A barcode scanner captures the barcode pattern and sends the data to the computer, so it is an input device.' },
    { label: 'b', marks: 1, prompt: 'An inkjet printer connected to a laptop.',
      response: { kind: 'choice', variant: 'tick', options: ['Input', 'Output', 'Storage'], answer: 'Output' },
      hint: 'It produces a physical copy of the document.', explanation: 'A printer takes data from the computer and produces a hard copy, making it an output device.' },
    { label: 'c', marks: 1, prompt: 'A Blu-ray disc inserted in a drive.',
      response: { kind: 'choice', variant: 'tick', options: ['Input', 'Output', 'Storage'], answer: 'Storage' },
      hint: 'It holds data even when removed from the drive.', explanation: 'A Blu-ray disc stores data persistently, so it is a storage medium.' },
    { label: 'd', marks: 1, prompt: 'A digital camera connected to a computer via USB to transfer photos.',
      response: { kind: 'choice', variant: 'tick', options: ['Input', 'Output', 'Storage'], answer: 'Input' },
      hint: 'Photos are being transferred into the computer.', explanation: 'In this context the camera sends data to the computer, acting as an input device.' },
  ],
});

T.push({
  id: 'g9ict-task-002', chapterId: 'g9ict-computer-systems', subsection: 'cpu_memory',
  difficulty: 2,
  intro: 'Use words from the list to complete the sentences. <b>One word is not used.</b>'
    + bank(['RAM', 'ROM', 'CPU', 'volatile', 'permanent', 'cache']),
  parts: [
    { label: 'a', marks: 5,
      prompt: 'Complete each sentence with the correct word.<br>'
        + '(i) The &hellip; carries out all the instructions and calculations in a computer.<br>'
        + '(ii) &hellip; is temporary memory that loses its contents when the power is switched off.<br>'
        + '(iii) Memory that keeps its contents without power is described as &hellip; storage.<br>'
        + '(iv) Very fast memory built close to the processor that holds frequently used data is called &hellip;<br>'
        + '(v) The BIOS program that runs when a computer starts is stored in &hellip;',
      response: gaps(['CPU', 'RAM', ['permanent', 'non-volatile'], 'cache', 'ROM']),
      hint: 'One word in the list is not needed.',
      explanation: 'The CPU processes instructions; RAM is volatile working memory; permanent/non-volatile storage survives power loss; cache is ultra-fast processor-side memory; BIOS lives in ROM.' },
  ],
});

// ── Software & Operating Systems ──────────────────────────────────────────

T.push({
  id: 'g9ict-task-003', chapterId: 'g9ict-software-os', subsection: 'os_functions',
  difficulty: 2,
  intro: 'For each statement, tick <b>True</b> or <b>False</b>.',
  parts: [
    { label: 'a', marks: 1, prompt: 'An operating system manages how RAM is shared between running programs.',
      response: tf('True'), hint: 'Memory management is a core OS function.',
      explanation: 'The OS allocates and deallocates RAM to processes, ensuring each program gets the memory it needs without clashing with others.' },
    { label: 'b', marks: 1, prompt: 'Microsoft Word is an example of an operating system.',
      response: tf('False'), hint: 'Word is used to create documents.',
      explanation: 'Microsoft Word is an application program, not an operating system. Windows and Linux are examples of operating systems.' },
    { label: 'c', marks: 1, prompt: 'A device driver allows the operating system to control a specific hardware device.',
      response: tf('True'), hint: 'Drivers translate OS commands for the device.',
      explanation: 'A device driver provides the OS with the instructions needed to communicate with a particular hardware component.' },
    { label: 'd', marks: 1, prompt: 'Virtual memory uses part of the hard disk when RAM is full.',
      response: tf('True'), hint: 'The disk acts as slower, extra RAM.',
      explanation: 'When RAM is full, the OS swaps less-used pages to a disk swap file, extending the available memory at the cost of speed.' },
    { label: 'e', marks: 1, prompt: 'A graphical user interface (GUI) requires the user to type commands into a terminal.',
      response: tf('False'), hint: 'A GUI uses icons and a mouse.',
      explanation: 'A GUI uses windows, icons and a pointing device; typing commands describes a Command Line Interface (CLI).' },
  ],
});

T.push({
  id: 'g9ict-task-004', chapterId: 'g9ict-software-os', subsection: 'utility_programs',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 1, prompt: 'Give <b>one</b> reason why antivirus software should be kept up to date.',
      response: gaps([['new viruses are created all the time', 'new threats are discovered regularly', 'to detect the latest malware', 'virus definitions must be updated to recognise new threats']]),
      hint: 'Think about how often new threats appear.',
      explanation: 'New malware is released constantly; updating ensures the antivirus has the latest virus definitions to recognise and stop new threats.' },
    { label: 'b', marks: 1, prompt: 'What is the purpose of a <b>file compression</b> utility?',
      response: pick(['To make files take less space', 'To encrypt files with a password', 'To scan the files for viruses', 'To defragment the hard disk'],
                     'To make files take less space'),
      hint: 'Think about making a zip file.', explanation: 'Compression reduces file size by encoding repeated patterns more efficiently, saving disk space and reducing download time.' },
    { label: 'c', marks: 2,
      prompt: 'State <b>two</b> tasks that a disk cleanup utility can perform.',
      response: gaps([['delete temporary files', 'remove cached web pages', 'empty the recycle bin', 'remove old log files'],
                      ['delete temporary files', 'remove cached web pages', 'empty the recycle bin', 'remove old log files']]),
      hint: 'Think about files that accumulate without being needed.',
      explanation: 'Disk cleanup deletes temporary files, clears cached data, empties the recycle bin and removes old system log files to free up disk space.' },
  ],
});

// ── Networks ──────────────────────────────────────────────────────────────

T.push({
  id: 'g9ict-task-005', chapterId: 'g9ict-networks', subsection: 'network_types',
  difficulty: 2,
  intro: 'Use words from the list to complete the sentences. <b>There is one extra word.</b>'
    + bank(['LAN', 'WAN', 'MAN', 'PAN', 'WLAN', 'VPN']),
  parts: [
    { label: 'a', marks: 5,
      prompt: 'Write the correct abbreviation for each description.<br>'
        + '(i) A network that connects devices in a single school building. &hellip;<br>'
        + '(ii) A network that connects two offices in different countries. &hellip;<br>'
        + '(iii) A secure, encrypted connection made over the public internet. &hellip;<br>'
        + '(iv) A network covering a city, larger than a LAN but smaller than a WAN. &hellip;<br>'
        + '(v) A network that connects personal devices such as a phone and a headset within a few metres. &hellip;',
      response: gaps(['LAN', 'WAN', 'VPN', 'MAN', 'PAN']),
      hint: 'Match the geographic scale or purpose of each description to its acronym.',
      explanation: 'LAN = local (one building); WAN = wide area (different countries); VPN = secure tunnel over the internet; MAN = metropolitan area (city); PAN = personal area (a few metres).' },
  ],
});

T.push({
  id: 'g9ict-task-006', chapterId: 'g9ict-networks', subsection: 'topologies',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 1, prompt: 'In a <b>star</b> topology, all computers connect to a central &hellip;',
      response: pick(['switch or hub', 'ring of cable', 'single backbone cable', 'server only'],
                     'switch or hub'),
      hint: 'All cables meet at one central point.', explanation: 'In a star topology, each device has its own cable running to a central switch or hub.' },
    { label: 'b', marks: 2,
      prompt: 'State <b>one advantage</b> and <b>one disadvantage</b> of a star topology.',
      response: gaps([['a fault in one cable only affects that computer', 'faults are easy to isolate', 'adding a new computer is straightforward'],
                      ['if the switch fails the whole network fails', 'the switch is a single point of failure', 'more cable is used than in a bus topology']]),
      hint: 'Think about what happens when one cable breaks vs when the central device breaks.',
      explanation: 'Advantage: isolating a faulty cable is easy. Disadvantage: the central switch is a single point of failure.' },
    { label: 'c', marks: 1, prompt: 'In a <b>bus</b> topology, a break in the main cable:',
      response: pick(['stops all communication on the entire network',
                      'only affects the nearest two computers',
                      'has no effect because traffic is rerouted',
                      'slows the network but does not stop it'],
                     'stops all communication on the entire network'),
      hint: 'Every device shares the same backbone.', explanation: 'All devices share one bus cable; a break anywhere makes the whole network unusable.' },
  ],
});

T.push({
  id: 'g9ict-task-007', chapterId: 'g9ict-networks', subsection: 'network_components',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 3,
      prompt: 'Write the letter of the correct description for each network device.'
        + matchList(['Converts digital signals to analogue for transmission over a phone line and back again.',
                     'Forwards packets between different networks, choosing the best path.',
                     'Sends data only to the port where the destination device is connected.'])
        + '(i) Router &nbsp;&nbsp; (ii) Modem &nbsp;&nbsp; (iii) Switch',
      response: gaps([['B'], ['A'], ['C']]),
      hint: 'Router = between networks; Modem = digital/analogue; Switch = within a LAN.',
      explanation: 'Router → B (forwards between networks); Modem → A (digital↔analogue conversion); Switch → C (targeted delivery within the LAN).' },
    { label: 'b', marks: 1, prompt: 'What device allows wireless devices to connect to a wired LAN?',
      response: pick(['A wireless access point', 'A network interface card', 'A hardware firewall', 'A signal repeater'],
                     'A wireless access point'),
      hint: 'It bridges the wireless and wired worlds.', explanation: 'A WAP provides a Wi-Fi connection and bridges it to the wired LAN infrastructure.' },
  ],
});

T.push({
  id: 'g9ict-task-008', chapterId: 'g9ict-networks', subsection: 'wired_wireless',
  difficulty: 2,
  intro: 'For each statement, tick <b>True</b> or <b>False</b>.',
  parts: [
    { label: 'a', marks: 1, prompt: 'A wired Ethernet connection is generally faster and more reliable than Wi-Fi.',
      response: tf('True'), hint: 'A cable provides a dedicated path.', explanation: 'Ethernet cables deliver a stable, interference-free connection with consistently higher speeds than wireless.' },
    { label: 'b', marks: 1, prompt: 'An open (unsecured) Wi-Fi network encrypts all data automatically.',
      response: tf('False'), hint: 'Open means no security.', explanation: 'An open network has no encryption, so any nearby device can intercept the unencrypted traffic.' },
    { label: 'c', marks: 1, prompt: 'The 5 GHz Wi-Fi band has a longer range than the 2.4 GHz band.',
      response: tf('False'), hint: 'Higher frequency = shorter range.', explanation: 'Higher frequency radio waves are absorbed more readily by walls and obstacles; the 5 GHz band has a shorter range than 2.4 GHz.' },
    { label: 'd', marks: 1, prompt: 'WPA2 is a security protocol used to protect Wi-Fi communications.',
      response: tf('True'), hint: 'WPA2 encrypts Wi-Fi traffic.', explanation: 'WPA2 (Wi-Fi Protected Access 2) uses AES encryption to protect the data travelling over a wireless network.' },
  ],
});

T.push({
  id: 'g9ict-task-009', chapterId: 'g9ict-networks', subsection: 'intranet_extranet',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 1, prompt: 'An intranet is best described as:',
      response: pick(['A private organisation network', 'A backup of the public internet', 'A public Wi-Fi network in cafes', 'The internet in one country only'],
                     'A private organisation network'),
      hint: 'Intra = inside.', explanation: 'An intranet uses browser-based technology but is accessible only to authorised users within the organisation.' },
    { label: 'b', marks: 1, prompt: 'What is the main difference between an intranet and an extranet?',
      response: pick(['An extranet admits trusted outsiders', 'An extranet is faster than an intranet', 'An extranet has no security controls', 'An intranet is wireless, extranet wired'],
                     'An extranet admits trusted outsiders'),
      hint: 'Extra = outside (but limited).', explanation: 'An extranet gives selected external users — suppliers, partners, clients — access to parts of the intranet that are relevant to them.' },
    { label: 'c', marks: 2,
      prompt: 'Give <b>two</b> features a school intranet might provide for its pupils.',
      response: gaps([['access to timetables', 'homework resources', 'learning materials', 'school notices', 'staff contact details', 'library catalogue'],
                      ['access to timetables', 'homework resources', 'learning materials', 'school notices', 'staff contact details', 'library catalogue']]),
      hint: 'Think about what a school website only for students would contain.',
      explanation: 'A school intranet typically provides timetables, learning resources, homework assignments, notices and staff contact details to pupils and staff.' },
  ],
});

// ── Internet ──────────────────────────────────────────────────────────────

T.push({
  id: 'g9ict-task-010', chapterId: 'g9ict-internet', subsection: 'internet_www',
  difficulty: 2,
  intro: 'Use words from the list to complete the sentences. <b>One word is not used.</b>'
    + bank(['DNS', 'HTTP', 'HTTPS', 'URL', 'HTML', 'ISP']),
  parts: [
    { label: 'a', marks: 5,
      prompt: 'Write the correct abbreviation for each description.<br>'
        + '(i) The protocol used to transfer web pages between a server and a browser. &hellip;<br>'
        + '(ii) The secure version of the web protocol that encrypts data in transit. &hellip;<br>'
        + '(iii) The system that translates domain names into IP addresses. &hellip;<br>'
        + '(iv) The unique web address used to locate a specific page on the internet. &hellip;<br>'
        + '(v) The markup language used to structure and create web pages. &hellip;',
      response: gaps(['HTTP', 'HTTPS', 'DNS', 'URL', 'HTML']),
      hint: 'ISP is the unused word — it stands for Internet Service Provider.',
      explanation: 'HTTP transfers pages; HTTPS does so securely; DNS resolves domain names; URL is the web address; HTML is the page markup language. ISP is the extra word.' },
  ],
});

T.push({
  id: 'g9ict-task-011', chapterId: 'g9ict-internet', subsection: 'email',
  difficulty: 2,
  intro: 'For each statement, tick <b>True</b> or <b>False</b>.',
  parts: [
    { label: 'a', marks: 1, prompt: 'The BCC field hides the recipient\'s address from all other recipients.',
      response: tf('True'), hint: 'BCC = Blind Carbon Copy.', explanation: 'BCC (Blind Carbon Copy) adds a recipient whose email address is invisible to all other recipients.' },
    { label: 'b', marks: 1, prompt: 'SMTP is the protocol used to download emails from a server to a client.',
      response: tf('False'), hint: 'SMTP is for sending, not receiving.', explanation: 'SMTP (Simple Mail Transfer Protocol) sends and routes email between servers; IMAP or POP3 are used to retrieve email.' },
    { label: 'c', marks: 1, prompt: 'An advantage of email over a posted letter is that email arrives almost instantly.',
      response: tf('True'), hint: 'Speed is the primary advantage.', explanation: 'Email is delivered in seconds worldwide; a letter can take days or weeks.' },
    { label: 'd', marks: 1, prompt: 'Webmail requires dedicated email software to be installed on the user\'s computer.',
      response: tf('False'), hint: 'Webmail works through a browser.', explanation: 'Webmail provides access to email through any web browser; no separate email client is needed.' },
  ],
});

T.push({
  id: 'g9ict-task-012', chapterId: 'g9ict-internet', subsection: 'e_services',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 1, prompt: 'Give <b>one advantage</b> of online shopping compared with visiting a physical shop.',
      response: gaps([['open 24 hours a day', 'can shop from home', 'can compare prices easily', 'no need to travel', 'wider range of products']]),
      hint: 'Think about convenience.', explanation: 'Online shops are available around the clock and can be accessed from any location, offering convenience that physical stores cannot always match.' },
    { label: 'b', marks: 1, prompt: 'Give <b>one disadvantage</b> of online shopping.',
      response: gaps([['cannot handle the product before buying', 'risk of credit card fraud', 'delivery delays', 'items may not match their description', 'may need to pay delivery charges']]),
      hint: 'Think about the risks of not seeing the item.', explanation: 'Online shoppers cannot inspect products physically; they also face risks of fraud, delivery issues and items that differ from their descriptions.' },
    { label: 'c', marks: 1, prompt: 'When paying online, the presence of <b>https</b> and a padlock symbol in the address bar indicates:',
      response: pick(['The connection is encrypted', 'The purchase is free of charge', 'The goods arrive the next day', 'The site is run by government'],
                     'The connection is encrypted'),
      hint: 'HTTPS = secure and encrypted.', explanation: 'HTTPS with a padlock means the connection uses TLS encryption, protecting payment details from interception.' },
  ],
});

T.push({
  id: 'g9ict-task-013', chapterId: 'g9ict-internet', subsection: 'browsers_search',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 3,
      prompt: 'Write the letter of the correct definition for each browser term.'
        + matchList(['A stored web address that the user can click to return to a page quickly.',
                     'A record of all the web pages visited in recent sessions.',
                     'A local copy of recently visited pages saved to speed up future visits.'])
        + '(i) Bookmark &nbsp;&nbsp; (ii) History &nbsp;&nbsp; (iii) Cache',
      response: gaps([['A'], ['B'], ['C']]),
      hint: 'Bookmark = saved; History = past visits; Cache = saved copy of pages.',
      explanation: 'Bookmark → A (saved address); History → B (list of visited pages); Cache → C (local stored copies).' },
    { label: 'b', marks: 1, prompt: 'Enclosing a search phrase in quotation marks (e.g., "climate change") tells the search engine to:',
      response: pick(['Find pages containing that exact phrase',
                      'Search only within news websites',
                      'Exclude pages about climate change',
                      'Translate the search into another language'],
                     'Find pages containing that exact phrase'),
      hint: 'Quotes lock in the exact sequence of words.', explanation: 'Quotation marks instruct the search engine to return only pages where those words appear together in that exact order.' },
  ],
});

// ── Databases ─────────────────────────────────────────────────────────────

T.push({
  id: 'g9ict-task-014', chapterId: 'g9ict-databases', subsection: 'db_structure',
  difficulty: 2,
  intro: 'Use words from the list to complete the sentences. <b>One word is not used.</b>'
    + bank(['field', 'record', 'primary key', 'foreign key', 'flat-file', 'relational']),
  parts: [
    { label: 'a', marks: 5,
      prompt: 'Write the correct term for each description.<br>'
        + '(i) A single category of data, such as Surname or Date of Birth. &hellip;<br>'
        + '(ii) All the data stored about one person or item. &hellip;<br>'
        + '(iii) A field whose value is unique for every record, identifying each row. &hellip;<br>'
        + '(iv) A database that stores all data in one table only. &hellip;<br>'
        + '(v) A database made up of several linked tables. &hellip;',
      response: gaps(['field', 'record', ['primary key', 'primary-key'], 'flat-file', 'relational']),
      hint: 'Foreign key is the unused term.',
      explanation: 'Field = one column; record = one row; primary key = unique identifier; flat-file = single table; relational = multiple linked tables. Foreign key is not used here.' },
  ],
});

T.push({
  id: 'g9ict-task-015', chapterId: 'g9ict-databases', subsection: 'queries',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 1, prompt: 'A database query criterion of >"2024-01-01" in a "DateJoined" field would return records where:',
      response: pick(['The date is after 1 January 2024',
                      'The date is exactly 1 January 2024',
                      'The date is before 1 January 2024',
                      'The field is empty'],
                     'The date is after 1 January 2024'),
      hint: '> means "greater than" (later in time for dates).', explanation: 'The > operator on a date field selects records where the date is later than the specified value.' },
    { label: 'b', marks: 1, prompt: 'Using the AND operator between two criteria in a query:',
      response: pick(['Returns records matching both', 'Doubles the number of results', 'Returns records matching one', 'Excludes all of the records'],
                     'Returns records matching both'),
      hint: 'AND = both must be true.', explanation: 'AND is more restrictive; both conditions must be met for a record to appear in the results.' },
    { label: 'c', marks: 2,
      prompt: 'A student database has fields: StudentID, Surname, FirstName, Class, Mark.<br>'
        + 'Write the criteria you would use to find all students in class <b>9A</b> with a mark <b>greater than 60</b>.',
      response: gaps([['9A', '"9A"'], ['>60', '> 60', 'greater than 60']]),
      hint: 'One criterion for class, one for mark.',
      explanation: 'Class = "9A" (or equals 9A) AND Mark > 60 would return all students in class 9A who scored more than 60.' },
  ],
});

T.push({
  id: 'g9ict-task-016', chapterId: 'g9ict-databases', subsection: 'forms_reports',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 1, prompt: 'What is the main purpose of a <b>form</b> in a database application?',
      response: pick(['To enter and edit records', 'To search with complex criteria', 'To print a summary of records', 'To design the table structure'],
                     'To enter and edit records'),
      hint: 'Forms are for data entry.', explanation: 'A form displays one record at a time in a neat layout, making data entry and editing easier and less error-prone than working directly in the table.' },
    { label: 'b', marks: 1, prompt: 'Grouping records in a report allows:',
      response: pick(['Like records to be shown together', 'The report to be sorted backwards', 'Images to be added to the report', 'All records in a single column'],
                     'Like records to be shown together'),
      hint: 'Group by Department, then total each group.', explanation: 'Grouping collects records sharing a common value — e.g., all records for Department = "Science" — and can calculate group subtotals.' },
    { label: 'c', marks: 1, prompt: 'Exporting a report as a <b>PDF</b> is useful because:',
      response: pick(['Anyone can open and print it', 'PDF files update by themselves', 'PDF is a database file format', 'PDF files cannot be printed'],
                     'Anyone can open and print it'),
      hint: 'PDF is a universal, read-only format.', explanation: 'PDF preserves the layout and can be opened on any device with a PDF reader, making it ideal for distributing finalised reports.' },
  ],
});

T.push({
  id: 'g9ict-task-017', chapterId: 'g9ict-databases', subsection: 'data_entry',
  difficulty: 2,
  intro: 'For each statement, tick <b>True</b> or <b>False</b>.',
  parts: [
    { label: 'a', marks: 1, prompt: 'A presence check ensures that a required field is not left blank.',
      response: tf('True'), hint: 'Presence = must contain something.', explanation: 'A presence check validation rule prevents a record from being saved unless the mandatory field contains a value.' },
    { label: 'b', marks: 1, prompt: 'A range check validates that a value falls within an acceptable minimum and maximum.',
      response: tf('True'), hint: 'Range = between two limits.', explanation: 'A range check rejects entries outside the allowed bounds — for example, a score field that only accepts values from 0 to 100.' },
    { label: 'c', marks: 1, prompt: 'Data verification checks that entered data is of the correct type or within a valid range.',
      response: tf('False'), hint: 'Verification checks accuracy; validation checks rules.',
      explanation: 'Verification checks that data was entered as intended (e.g., re-typing an email to confirm it was copied correctly). Validation checks rules like type and range.' },
    { label: 'd', marks: 1, prompt: 'A lookup field in a database presents the user with a list of approved values to select from.',
      response: tf('True'), hint: 'A dropdown list restricts entries.', explanation: 'A lookup (or drop-down) field limits input to a predefined list, preventing typing errors and ensuring data consistency.' },
  ],
});

// ── Health & Safety ───────────────────────────────────────────────────────

T.push({
  id: 'g9ict-task-018', chapterId: 'g9ict-health-safety', subsection: 'health_hazards',
  difficulty: 2,
  intro: 'For each statement, tick <b>True</b> or <b>False</b>.',
  parts: [
    { label: 'a', marks: 1, prompt: 'RSI (Repetitive Strain Injury) is caused by performing the same hand movements repeatedly over a long period.',
      response: tf('True'), hint: 'Repetition is in the name.', explanation: 'RSI develops from repeated, often awkward movements without adequate rest, damaging tendons and muscles.' },
    { label: 'b', marks: 1, prompt: 'Eye strain from computer use can be reduced by increasing the screen brightness to its maximum setting.',
      response: tf('False'), hint: 'Extreme brightness causes glare.', explanation: 'Eye strain is reduced by matching screen brightness to room lighting and taking regular breaks, not by maximising brightness.' },
    { label: 'c', marks: 1, prompt: 'The 20-20-20 rule recommends looking at an object 20 metres away for 20 seconds every 20 minutes.',
      response: tf('True'), hint: '20-20-20: metres, seconds, minutes.', explanation: 'The 20-20-20 rule gives the eye muscles a rest and helps prevent eye strain and dryness from prolonged screen use.' },
    { label: 'd', marks: 1, prompt: 'Prolonged sitting at a computer can contribute to obesity and cardiovascular disease.',
      response: tf('True'), hint: 'Sedentary behaviour has serious health risks.', explanation: 'Extended sitting slows the metabolism and reduces circulation, increasing the long-term risk of obesity, cardiovascular disease and blood clots.' },
    { label: 'e', marks: 1, prompt: 'Blue light from screens has no effect on sleep quality.',
      response: tf('False'), hint: 'Blue light affects melatonin.', explanation: 'Blue light suppresses melatonin production, delaying sleep onset and reducing sleep quality, especially when screens are used close to bedtime.' },
  ],
});

T.push({
  id: 'g9ict-task-019', chapterId: 'g9ict-health-safety', subsection: 'hazard_prevention',
  difficulty: 2,
  intro: 'Use words from the list to complete the sentences. <b>One word is not used.</b>'
    + bank(['wrist rest', 'footrest', 'lumbar support', 'anti-glare filter', 'eye level', 'surge protector']),
  parts: [
    { label: 'a', marks: 5,
      prompt: 'Write the correct term for each ergonomic or safety measure.<br>'
        + '(i) A device placed in front of the monitor to reduce reflections that cause eye strain. &hellip;<br>'
        + '(ii) A padded support that keeps wrists in a neutral position while typing. &hellip;<br>'
        + '(iii) A feature of an ergonomic chair that supports the natural curve of the lower spine. &hellip;<br>'
        + '(iv) The top of the monitor should be placed at or just below &hellip; so the user looks slightly downward.<br>'
        + '(v) A device that protects equipment from voltage spikes and power cuts. &hellip;',
      response: gaps([['anti-glare filter', 'anti-glare screen filter'], 'wrist rest', ['lumbar support', 'lumbar rest'], ['eye level', 'eye-level'], 'surge protector']),
      hint: 'Footrest is the unused term.',
      explanation: 'Anti-glare filter reduces reflections; wrist rest keeps wrists neutral; lumbar support supports the lower back; eye level is the correct monitor height; surge protector guards against voltage spikes. Footrest is not used here.' },
  ],
});

T.push({
  id: 'g9ict-task-020', chapterId: 'g9ict-health-safety', subsection: 'lab_guidelines',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 1, prompt: 'Why should food and drinks not be brought into a computer laboratory?',
      response: pick(['Spills can damage the equipment', 'It is considered impolite to do so', 'The computer works faster without', 'Food raises humidity in the room'],
                     'Spills can damage the equipment'),
      hint: 'Liquids and electronics are dangerous together.', explanation: 'A spill on a keyboard or into a computer can cause a short circuit, destroying the equipment.' },
    { label: 'b', marks: 1, prompt: 'Before plugging a personal USB drive into a school computer, a student should:',
      response: pick(['Have the drive scanned for viruses first',
                      'Format the drive to remove all files',
                      'Ask their teacher to break the USB drive',
                      'Ignore any warnings and proceed immediately'],
                     'Have the drive scanned for viruses first'),
      hint: 'External drives can carry malware.', explanation: 'USB drives from other computers may contain malware; scanning before use prevents spreading infection to the school network.' },
    { label: 'c', marks: 2,
      prompt: 'Give <b>two</b> reasons why students should save their work regularly while in the computer lab.',
      response: gaps([['power cuts could lose unsaved work', 'unexpected program crashes may cause data loss', 'RAM is volatile and loses data without power', 'unsaved work is lost if the computer freezes'],
                      ['power cuts could lose unsaved work', 'unexpected program crashes may cause data loss', 'RAM is volatile and loses data without power', 'unsaved work is lost if the computer freezes']]),
      hint: 'Think about what can happen unexpectedly.',
      explanation: 'Unsaved work lives only in volatile RAM; a power cut or program crash immediately destroys it. Regular saves to disk protect against this.' },
  ],
});

// ── Ethics & Security ─────────────────────────────────────────────────────

T.push({
  id: 'g9ict-task-021', chapterId: 'g9ict-ethics-security', subsection: 'data_security',
  difficulty: 2,
  intro: 'For each statement, tick <b>True</b> or <b>False</b>.',
  parts: [
    { label: 'a', marks: 1, prompt: 'A strong password should contain at least eight characters including uppercase letters, numbers and symbols.',
      response: tf('True'), hint: 'Complexity makes passwords harder to crack.', explanation: 'A strong password mixes character types and length, making brute-force and dictionary attacks much harder.' },
    { label: 'b', marks: 1, prompt: 'A firewall prevents all computer viruses from entering a system.',
      response: tf('False'), hint: 'Firewalls filter network traffic, not file contents.', explanation: 'A firewall filters network connections but cannot detect viruses in legitimate files; antivirus software is needed for that.' },
    { label: 'c', marks: 1, prompt: 'Phishing is an attack that tricks users into revealing personal information through a fake message or website.',
      response: tf('True'), hint: 'Phishing = fishing for credentials.', explanation: 'Phishing uses deceptive emails or websites disguised as legitimate ones to steal passwords, bank details or personal information.' },
    { label: 'd', marks: 1, prompt: 'Two-factor authentication (2FA) is less secure than a password alone because it adds complexity.',
      response: tf('False'), hint: 'Two factors = two barriers to overcome.', explanation: '2FA adds a second verification step (e.g., a one-time code sent to a phone) so an attacker who has the password still cannot log in without the second factor.' },
  ],
});

T.push({
  id: 'g9ict-task-022', chapterId: 'g9ict-ethics-security', subsection: 'copyright_ownership',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 1, prompt: 'Copyright law gives the creator of an original work the exclusive right to:',
      response: pick(['Copy, distribute and adapt the work', 'Use the work for personal reasons only', 'Register the work with the police', 'Sell the work only to a publisher'],
                     'Copy, distribute and adapt the work'),
      hint: 'It gives the creator control.', explanation: 'Copyright is the legal right that protects original works; only the creator (or someone they authorise) can legally copy, distribute or adapt the work.' },
    { label: 'b', marks: 1, prompt: 'Using someone else\'s image from the internet in your presentation without permission or acknowledgement is an example of:',
      response: pick(['Copyright infringement','Phishing','Hacking','Spam'],
                     'Copyright infringement'),
      hint: 'You are using their work without the right to do so.', explanation: 'Images on the internet are normally protected by copyright; using them without permission or credit infringes the creator\'s rights.' },
    { label: 'c', marks: 1, prompt: '"Creative Commons" licence allows:',
      response: pick(['Reuse under conditions set by the creator', 'Anyone to use the work with no conditions', 'Only the creator to view the work', 'The government to own the work'],
                     'Reuse under conditions set by the creator'),
      hint: 'Creative Commons = sharing with conditions.', explanation: 'Creative Commons licences allow creators to specify how others may use their work — for example, with attribution, non-commercially or with no derivatives.' },
  ],
});

T.push({
  id: 'g9ict-task-023', chapterId: 'g9ict-ethics-security', subsection: 'data_backups',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 1, prompt: 'A full backup copies:',
      response: pick(['All selected data every time it runs', 'Only files changed since the last backup', 'Data to the same drive as the original', 'Only system files, not user data'],
                     'All selected data every time it runs'),
      hint: 'Full = everything, every time.', explanation: 'A full backup copies all selected files each time it runs; it takes the most time and space but is the simplest to restore from.' },
    { label: 'b', marks: 1, prompt: 'An incremental backup copies:',
      response: pick(['Only files changed since last time', 'All selected files every single time', 'A duplicate of the last full backup', 'Only the system and program files'],
                     'Only files changed since last time'),
      hint: 'It backs up only the new changes.', explanation: 'An incremental backup stores only the files that changed since the previous backup (whether full or incremental), saving time and storage.' },
    { label: 'c', marks: 2,
      prompt: 'State <b>two</b> reasons why backups should be stored in a different physical location from the original data.',
      response: gaps([['fire or flood could destroy both if in the same place', 'theft of the original also destroys the backup if they are together', 'physical disaster could affect both copies', 'a local fire could destroy the original and backup simultaneously'],
                      ['fire or flood could destroy both if in the same place', 'theft of the original also destroys the backup if they are together', 'physical disaster could affect both copies', 'a local fire could destroy the original and backup simultaneously']]),
      hint: 'Think about what one disaster could destroy.',
      explanation: 'If backups and originals are in the same location, a fire, flood or theft could destroy both simultaneously, defeating the purpose of the backup.' },
  ],
});

// ── Word Processing ───────────────────────────────────────────────────────

T.push({
  id: 'g9ict-task-024', chapterId: 'g9ict-word-processing', subsection: 'mail_merge',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 1, prompt: 'Mail merge is used to:',
      response: pick(['Combine a template with a data source', 'Send emails with no internet connection', 'Print all documents in a folder at once', 'Merge two word-processed documents'],
                     'Combine a template with a data source'),
      hint: 'Each letter is personalised with data from a list.', explanation: 'Mail merge takes a standard template letter and inserts data (names, addresses, etc.) from a spreadsheet or database to produce individualised copies for each recipient.' },
    { label: 'b', marks: 1, prompt: 'In a mail merge document, a merge field such as <<FirstName>> acts as a:',
      response: pick(['Placeholder replaced by each record', 'Hyperlink pointing to the data file', 'Formatting instruction for the font', 'Formula that calculates a value'],
                     'Placeholder replaced by each record'),
      hint: 'It is a placeholder for real data.', explanation: 'Merge fields are placeholders in double angle brackets; when the merge runs, each field is replaced by the corresponding value from the data source.' },
    { label: 'c', marks: 2,
      prompt: 'Name <b>two</b> items of information that are typically stored in the <b>data source</b> (recipient list) for a mail merge.',
      response: gaps([['name', 'address', 'email address', 'title', 'first name', 'surname', 'postcode', 'city', 'phone number'],
                      ['name', 'address', 'email address', 'title', 'first name', 'surname', 'postcode', 'city', 'phone number']]),
      hint: 'What details do you need to personalise a letter?',
      explanation: 'The data source typically holds recipient details such as name, address, email address and other personalisation data.' },
  ],
});

T.push({
  id: 'g9ict-task-025', chapterId: 'g9ict-word-processing', subsection: 'styles',
  difficulty: 2,
  intro: 'For each statement, tick <b>True</b> or <b>False</b>.',
  parts: [
    { label: 'a', marks: 1, prompt: 'Applying a Heading 1 style to text automatically formats it according to the predefined style definition.',
      response: tf('True'), hint: 'A style applies a complete set of formatting at once.', explanation: 'A style applies all its defined formatting properties — font, size, colour, spacing — in one click.' },
    { label: 'b', marks: 1, prompt: 'Modifying the Heading 2 style in a document updates every paragraph tagged with that style automatically.',
      response: tf('True'), hint: 'Changing the style changes all instances.', explanation: 'Because all Heading 2 paragraphs reference the same style definition, changing the style updates every one of them simultaneously.' },
    { label: 'c', marks: 1, prompt: 'Styles can be used to automatically generate a Table of Contents because headings are tagged.',
      response: tf('True'), hint: 'The TOC collects heading-styled text.', explanation: 'A Table of Contents is built by collecting all paragraphs formatted with Heading styles; they provide the text and page number for each TOC entry.' },
    { label: 'd', marks: 1, prompt: 'Using styles makes documents harder to format consistently across many pages.',
      response: tf('False'), hint: 'Styles make consistency easy.', explanation: 'Styles ensure every heading, body paragraph and caption in the document looks identical, making consistent formatting across a long document straightforward.' },
  ],
});

// ── Spreadsheets ──────────────────────────────────────────────────────────

T.push({
  id: 'g9ict-task-026', chapterId: 'g9ict-spreadsheets', subsection: 'functions',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 3,
      prompt: 'Write the letter of the correct function for each task.'
        + matchList(['Adds together all the numbers in a range of cells.',
                     'Returns the highest value in a range of cells.',
                     'Displays one of two values depending on whether a condition is true or false.'])
        + '(i) =MAX(A1:A20) &nbsp;&nbsp; (ii) =IF(B2>50,"Pass","Fail") &nbsp;&nbsp; (iii) =SUM(A1:A20)',
      response: gaps([['B'], ['C'], ['A']]),
      hint: 'SUM = total; MAX = largest; IF = conditional.',
      explanation: 'MAX → B (largest value); IF → C (conditional choice); SUM → A (total).' },
    { label: 'b', marks: 1, prompt: 'The function =AVERAGE(C1:C10) returns:',
      response: pick(['The arithmetic mean of all values in C1 to C10',
                      'The largest value in C1 to C10',
                      'The total of all values in C1 to C10',
                      'The number of cells containing data in C1 to C10'],
                     'The arithmetic mean of all values in C1 to C10'),
      hint: 'AVERAGE = mean.', explanation: 'AVERAGE sums the values and divides by the count to give the arithmetic mean.' },
  ],
});

T.push({
  id: 'g9ict-task-027', chapterId: 'g9ict-spreadsheets', subsection: 'charts_from_data',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 3,
      prompt: 'Write the letter of the chart type that best suits each purpose.'
        + matchList(['To show how parts contribute to a total (percentages of a whole).',
                     'To compare values across different categories side by side.',
                     'To show how a value changes over a continuous period of time.'])
        + '(i) Line graph &nbsp;&nbsp; (ii) Pie chart &nbsp;&nbsp; (iii) Bar/column chart',
      response: gaps([['C'], ['A'], ['B']]),
      hint: 'Pie = parts of a whole; Bar = comparison; Line = trend over time.',
      explanation: 'Line graph → C (trends over time); Pie chart → A (parts of a whole); Bar chart → B (category comparison).' },
    { label: 'b', marks: 1, prompt: 'If the data values in a spreadsheet are changed after a chart has been created, the chart will:',
      response: pick(['Update to show the new values', 'Display the old values for ever', 'Show an error message instead', 'Need deleting and redrawing'],
                     'Update to show the new values'),
      hint: 'Charts are linked to their source data.', explanation: 'A spreadsheet chart is dynamically linked to its data range; any change to source data immediately updates the chart.' },
  ],
});

// ── Algorithms ────────────────────────────────────────────────────────────

T.push({
  id: 'g9ict-task-028', chapterId: 'g9ict-algorithms', subsection: 'flowchart_symbols',
  difficulty: 2,
  intro: 'Use words from the list to complete the sentences. <b>One word is not used.</b>'
    + bank(['oval', 'rectangle', 'diamond', 'parallelogram', 'arrow', 'connector']),
  parts: [
    { label: 'a', marks: 5,
      prompt: 'Write the correct flowchart symbol name for each description.<br>'
        + '(i) Used to mark the START or END of an algorithm. &hellip;<br>'
        + '(ii) Represents a process, action or calculation. &hellip;<br>'
        + '(iii) Represents a decision with a Yes or No exit path. &hellip;<br>'
        + '(iv) Represents an input or output operation. &hellip;<br>'
        + '(v) Shows the direction and sequence of flow between symbols. &hellip;',
      response: gaps(['oval', 'rectangle', 'diamond', 'parallelogram', 'arrow']),
      hint: 'Connector is the unused symbol.',
      explanation: 'Oval = START/END; Rectangle = process; Diamond = decision; Parallelogram = input/output; Arrow = flow direction. The connector circle links distant sections.' },
  ],
});

T.forEach(function (spec) { STATIC_QUESTIONS.push(makeTask(spec)); });

})();
