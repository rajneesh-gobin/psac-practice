'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - Ethics, Data Protection & Security   (examWeight 3)
//
//  ⚠ THIS IS THE SLOT THE PAPERS ASK IN WORDS, NOT PICTURES, and it is the one
//    part of the subject where the answer is a judgement rather than a name.
//    Measured across 2021-2025 it is asked as short "state one …" parts worth
//    1-2 marks each, which is exactly the shape this app marks.
//
//  ⚠ Mauritius has its own Data Protection Act (2017). The papers ask for the
//    PRINCIPLES - consent, accuracy, security, purpose - not the section
//    numbers, so nothing here asks a candidate to cite the statute.
//
//  ⚠ NO SCENARIO PICTURES. Phishing questions describe the message in words
//    rather than showing a screenshot, for the same artwork reason recorded
//    across this pack.
//
//  Source: NCE ICT (N540) 2021-2025; NCF Grades 7-9 §8.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9ict-ethics-security';

const MCQ = [
  ['g9ict-eth-001', 'data_security', 1,
   'A program written to damage a computer or its data is called a:',
   ['Virus', 'Driver', 'Browser', 'Utility'], 'Virus',
   'It spreads from one machine to another.',
   'A virus is malicious software that damages data or the system and copies itself to other machines.'],

  ['g9ict-eth-002', 'data_security', 1,
   'Which of these makes the strongest password?',
   ['A mix of upper and lower case letters, digits and symbols',
    'The user&rsquo;s first name, so that it is easy to remember',
    'The word "password", which is short and quick to type',
    'The user&rsquo;s date of birth, written as six digits'],
   'A mix of upper and lower case letters, digits and symbols',
   'Which one would be hardest for someone else to guess?',
   'A long password mixing cases, digits and symbols has far more possibilities and cannot be guessed from what people know about you.'],

  ['g9ict-eth-003', 'data_security', 2,
   'Gaining access to a computer system without permission is called:',
   ['Hacking', 'Browsing', 'Formatting', 'Compressing'], 'Hacking',
   'It is done without the owner&rsquo;s permission.',
   'Hacking is gaining unauthorised access to a computer system or network.'],

  ['g9ict-eth-004', 'data_security', 2,
   'An email claims to be from a bank and asks the reader to type their password on a linked page. This is:',
   ['Phishing', 'Spam filtering', 'Encryption', 'Backing up'], 'Phishing',
   'It fishes for the reader&rsquo;s details by pretending to be someone trusted.',
   'Phishing tries to trick a user into handing over passwords or bank details by imitating a trusted organisation.'],

  ['g9ict-eth-005', 'data_security', 2,
   'What should you do with an unexpected email attachment from someone you do not know?',
   ['Do not open it and delete the message',
    'Open it to see what is inside',
    'Forward it to your friends first',
    'Reply asking for the password'],
   'Do not open it and delete the message',
   'The attachment is the risk.',
   'Unexpected attachments are a common way of spreading malicious software, so they should not be opened.'],

  ['g9ict-eth-006', 'data_security', 3,
   'What does <b>encryption</b> do to data?',
   ['Scrambles it so only someone with the key can read it',
    'Makes the file smaller so that it is quicker to send',
    'Copies it to a second disk kept in another building',
    'Deletes it permanently so that nobody can recover it'],
   'Scrambles it so only someone with the key can read it',
   'It protects the data even if it is stolen.',
   'Encryption converts data into a form that is unreadable without the correct key.'],

  ['g9ict-eth-007', 'data_security', 3,
   'A shop wants to protect customer data held on its network from outside attack. Which measure addresses that directly?',
   ['Installing a firewall', 'Buying a larger monitor',
    'Defragmenting the disk', 'Printing the records'],
   'Installing a firewall',
   'Something must stand between the network and the outside.',
   'A firewall controls which traffic may enter or leave the network, blocking unauthorised access.'],

  ['g9ict-eth-008', 'data_backups', 1,
   'What is the main purpose of making a <b>backup</b>?',
   ['So the data can be recovered if the original is lost or damaged',
    'So the files open more quickly whenever they are next needed',
    'So the disk has more free space for new work to be saved',
    'So the data cannot be read by anyone outside the company'],
   'So the data can be recovered if the original is lost or damaged',
   'Think about what happens after a disaster.',
   'A backup is a spare copy kept so the data can be restored after loss, theft, fire or corruption.'],

  ['g9ict-eth-009', 'data_backups', 2,
   'Where should a backup of a school&rsquo;s data ideally be kept?',
   ['In a different building from the original',
    'On the same hard disk as the original',
    'In the same computer, in another folder',
    'On the desk beside the computer'],
   'In a different building from the original',
   'What would a fire or a burglary destroy?',
   'A backup stored beside the original is lost to the same fire, flood or theft, so it should be kept elsewhere.'],

  ['g9ict-eth-010', 'data_backups', 3,
   'A business backs up once a year. What is the main risk?',
   ['Up to a year of work could be lost',
    'The backup would be too small to store',
    'The data would be encrypted',
    'The computers would run more slowly'],
   'Up to a year of work could be lost',
   'How much work sits between two backups?',
   'Everything created since the last backup is unprotected, so a yearly backup risks losing a year of work.'],

  ['g9ict-eth-011', 'information_privacy', 1,
   'Which of these is <b>personal data</b>?',
   ['A pupil&rsquo;s name and date of birth', 'The price of a textbook',
    'The name of the capital city', 'The current weather'],
   'A pupil&rsquo;s name and date of birth',
   'It identifies one living person.',
   'Personal data is information that identifies a living individual, such as a name, address or date of birth.'],

  ['g9ict-eth-012', 'information_privacy', 2,
   'Why should you be careful about posting your home address on social media?',
   ['Strangers could use it to find or target you',
    'It would use too much storage',
    'The post would take longer to load',
    'The address would be spelled incorrectly'],
   'Strangers could use it to find or target you',
   'Who else can read a public post?',
   'A public post can be read by anyone, and an address lets a stranger locate you.'],

  ['g9ict-eth-013', 'information_privacy', 3,
   'A website collects customers&rsquo; addresses to deliver orders, then sells the list to advertisers without asking. Which principle has been broken?',
   ['Data must be used only for the purpose it was collected for',
    'Data must be stored on the fastest disk that is available',
    'Data must be backed up on the same day of every week',
    'Data must always be printed on paper before it is deleted'],
   'Data must be used only for the purpose it was collected for',
   'What were the addresses given for?',
   'Data protection requires that personal data is used only for the stated purpose, and not passed on without consent.'],

  ['g9ict-eth-014', 'data_protection_act', 2,
   'Under data protection rules, personal data held about someone must be:',
   ['Accurate and kept up to date', 'Shared with anyone who asks',
    'Kept forever whatever happens', 'Stored only on paper'],
   'Accurate and kept up to date',
   'What harm does a wrong record do?',
   'Data protection principles require personal data to be accurate, kept up to date and held no longer than necessary.'],

  ['g9ict-eth-015', 'data_protection_act', 3,
   'Which of these is a right a person normally has over the personal data an organisation holds about them?',
   ['To ask to see it and have mistakes corrected',
    'To read the data held about other customers',
    'To be paid every time it is used',
    'To decide the organisation&rsquo;s prices'],
   'To ask to see it and have mistakes corrected',
   'It concerns their own record only.',
   'A person may ask what data is held about them and require inaccurate data to be corrected.'],

  ['g9ict-eth-016', 'copyright_ownership', 1,
   'Copying and selling software you did not pay for is called:',
   ['Software piracy', 'Software engineering', 'Encryption', 'Compression'],
   'Software piracy',
   'It is theft of someone&rsquo;s work.',
   'Software piracy is copying, using or selling software without the licence to do so.'],

  ['g9ict-eth-017', 'copyright_ownership', 2,
   'A photograph found on a website is:',
   ['Usually protected by copyright and owned by its creator',
    'Free for anyone at all to use because it is online',
    'Owned by whoever downloads it first',
    'Never protected once it is published'],
   'Usually protected by copyright and owned by its creator',
   'Being visible is not the same as being free.',
   'Publishing something online does not give up copyright; the creator still owns the work.'],

  ['g9ict-eth-018', 'plagiarism', 2,
   'Copying a paragraph from a website into your project and presenting it as your own writing is:',
   ['Plagiarism', 'Referencing', 'Summarising', 'Editing'], 'Plagiarism',
   'The source was not credited.',
   'Plagiarism is presenting someone else&rsquo;s words or ideas as your own without acknowledging them.'],

  ['g9ict-eth-019', 'plagiarism', 3,
   'What is the correct way to use a sentence from a website in your project?',
   ['Quote it and state where it came from',
    'Change two words and use it as your own',
    'Use it as it is; websites are public',
    'Translate it and use it as your own'],
   'Quote it and state where it came from',
   'The reader must be able to see whose words they are.',
   'Acknowledging the source - quoting and referencing it - is what turns copying into legitimate use.'],

  ['g9ict-eth-020', 'internet_dangers', 2,
   'A stranger online asks a pupil to meet alone. What should the pupil do?',
   ['Refuse and tell a trusted adult', 'Go, but tell nobody',
    'Send their home address first', 'Agree and take a friend&rsquo;s phone'],
   'Refuse and tell a trusted adult',
   'The safest action involves an adult.',
   'Meeting an online stranger is unsafe; the right response is to refuse and tell a trusted adult.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9ict-eth-021', 'data_security', 2,
   'Give the term for gaining access to a computer system without permission.',
   'Hacking', ['hack', 'to hack'],
   'It is done without the owner&rsquo;s consent.',
   'Hacking is unauthorised access to a computer system.'],
  ['g9ict-eth-022', 'data_security', 2,
   'Give the term for an email that pretends to come from a bank in order to obtain a password.',
   'Phishing', ['a phishing email', 'phishing email'],
   'It fishes for your details.',
   'Phishing imitates a trusted organisation to trick a user into revealing details.'],
  ['g9ict-eth-023', 'data_security', 3,
   'Give the term for scrambling data so that only someone with the key can read it.',
   'Encryption', ['encrypting', 'encrypt', 'encryption of data'],
   'It protects data even if it is stolen.',
   'Encryption makes data unreadable without the correct key.'],
  ['g9ict-eth-024', 'plagiarism', 2,
   'Give the term for presenting someone else&rsquo;s work as your own.',
   'Plagiarism', ['plagiarising', 'plagiarism.'],
   'The source was not credited.',
   'Plagiarism is using another person&rsquo;s words or ideas without acknowledgement.'],
  ['g9ict-eth-025', 'data_backups', 1,
   'Give the term for a spare copy of data kept so it can be restored after a loss.',
   'Backup', ['a backup', 'back-up', 'back up'],
   'One word.',
   'A backup is a spare copy from which data can be restored.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

// ⚠ DEPTH TOP-UP, and the two syllabus outcomes the first draft left with
//   nothing behind them. `internet_dangers` held one item; `computer_ethics`
//   and `social_economic_effects` are named by NCF §8 and were declared in the
//   manifest with no questions at all - a declared id with nothing behind it
//   opens an empty Practise card.
const MCQ2 = [
  ['g9ict-eth-026', 'computer_ethics', 1,
   'Reading someone else&rsquo;s messages on a computer they left signed in is:',
   ['Wrong, because it invades their privacy',
    'Acceptable, because they left it open',
    'Acceptable, if nothing is changed',
    'Wrong only if they find out'],
   'Wrong, because it invades their privacy',
   'Whose messages are they?',
   'Their carelessness does not transfer ownership of their private messages; reading them is an invasion of privacy.'],

  ['g9ict-eth-027', 'computer_ethics', 2,
   'Which of these best describes <b>computer ethics</b>?',
   ['The rules of right and wrong behaviour when using computers',
    'The law that sets the price software may be sold for',
    'The manual of instructions that comes with a new computer',
    'The speed at which a computer carries out its instructions'],
   'The rules of right and wrong behaviour when using computers',
   'It is about conduct, not equipment.',
   'Computer ethics is the study of how computers should and should not be used, and of the responsibilities of those who use them.'],

  ['g9ict-eth-028', 'computer_ethics', 3,
   'A pupil finds a classmate&rsquo;s password written on a desk. What is the right thing to do?',
   ['Tell the classmate so they can change it',
    'Use it once to see if it works',
    'Share it with two friends',
    'Write it somewhere safer for later'],
   'Tell the classmate so they can change it',
   'The account belongs to someone else.',
   'The password belongs to its owner; telling them lets it be changed before anyone misuses it.'],

  ['g9ict-eth-029', 'internet_dangers', 2,
   'Repeatedly sending threatening or hurtful messages to someone online is called:',
   ['Cyberbullying', 'Encryption', 'Browsing', 'Downloading'], 'Cyberbullying',
   'It is bullying carried out through a screen.',
   'Cyberbullying is using online messages or posts to threaten, humiliate or harass someone.'],

  ['g9ict-eth-030', 'internet_dangers', 2,
   'What should a pupil do if they receive threatening messages online?',
   ['Keep the evidence and tell a trusted adult',
    'Reply with worse messages',
    'Delete everything and say nothing',
    'Send their address so it can be sorted out'],
   'Keep the evidence and tell a trusted adult',
   'The messages themselves are the proof.',
   'Saving the messages preserves evidence, and telling a trusted adult brings help; retaliating makes things worse.'],

  ['g9ict-eth-031', 'social_economic_effects', 2,
   'What is one effect of computers on employment?',
   ['Some jobs disappear while new ICT jobs are created',
    'Every job disappears completely within a few years',
    'No job is affected in any way by the use of computers',
    'Only farming jobs are affected by the change'],
   'Some jobs disappear while new ICT jobs are created',
   'The change works in both directions.',
   'Automation removes some routine jobs and creates others - support, programming, data work - so the effect is a shift, not simply a loss.'],

  ['g9ict-eth-032', 'social_economic_effects', 3,
   'What is one economic effect of widespread software piracy?',
   ['Developers lose income, so less new software is produced',
    'Computers run faster everywhere the software is used',
    'The internet becomes cheaper for everyone who uses it',
    'Hardware prices are fixed by law in every country'],
   'Developers lose income, so less new software is produced',
   'Who is not being paid?',
   'Piracy denies developers the income that funds their work, which reduces what gets written and supported.'],

  ['g9ict-eth-033', 'social_economic_effects', 3,
   'A village has no internet access while a nearby town has fast broadband. This difference is known as the:',
   ['Digital divide', 'Data protection act', 'Firewall', 'Network topology'],
   'Digital divide',
   'It divides those with access from those without.',
   'The digital divide is the gap between people who have good access to ICT and those who do not.'],
];

MCQ2.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT2 = [
  ['g9ict-eth-034', 'information_privacy', 2,
   'Give the term for information that identifies a living individual, such as a name and address.',
   'Personal data', ['personal information', 'personal data.'],
   'Two words.', 'Personal data is information identifying a living person.'],
  ['g9ict-eth-035', 'copyright_ownership', 2,
   'Give the term for the legal right of a creator to control the copying of their work.',
   'Copyright', ['copy right', 'copyright law'],
   'One word.', 'Copyright gives the creator control over how their work is copied and used.'],
  ['g9ict-eth-036', 'data_protection_act', 3,
   'State one thing a data protection act requires an organisation to do with the personal data it holds.',
   'Keep it accurate and secure',
   ['keep it secure', 'keep it accurate', 'use it only for the stated purpose',
    'keep it up to date', 'not keep it longer than necessary'],
   'Think about accuracy, purpose and security.',
   'Data protection principles require personal data to be accurate, kept securely, used only for its stated purpose and not kept longer than needed.'],
  ['g9ict-eth-037', 'internet_dangers', 2,
   'Give the term for repeatedly sending threatening or hurtful messages to someone online.',
   'Cyberbullying', ['cyber bullying', 'cyber-bullying'],
   'One word, two halves.',
   'Cyberbullying is harassment carried out through online messages or posts.'],
];

SHORT2.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
