'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - Internet & Online Communication   (examWeight 4)
//
//  ⚠ THE RISING TOPIC: 4 -> 5 -> 7 -> 14 -> 13 marks across 2021-2025, while
//    Networks fell 22 -> 1 over the same five papers. The subject has moved
//    from wiring to online services. 2024 Q10 and 2025 Q9 are both 9-mark
//    scenarios made entirely of 1-2 mark short answers, which is exactly the
//    shape this app marks well.
//
//  ⚠ Logo-recognition MCQs are a measured format and are NOT written here:
//    they need artwork this repo does not have for Grade 9. Recorded in
//    blueprint-ict.md. The services are named in words instead.
//
//  Source: NCE ICT (N540) 2021-2025 Q9/Q10; NCF Grades 7-9 §8.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9ict-internet';

const MCQ = [
  ['g9ict-int-001', 'browsers_search', 1,
   'Which of these is a <b>web browser</b>?',
   ['Google Chrome', 'Google Search', 'Gmail', 'Windows'], 'Google Chrome',
   'A browser is the program you open web pages in.',
   'Chrome is a browser - the program that displays web pages. Search and Gmail are services you reach through one.'],

  ['g9ict-int-002', 'browsers_search', 1,
   'What does <b>URL</b> stand for?',
   ['Uniform Resource Locator', 'Universal Reading Link',
    'Unique Reference Label', 'United Resource Link'],
   'Uniform Resource Locator',
   'It locates a resource on the web.',
   'A URL - Uniform Resource Locator - is the address of a page or file on the web.'],

  ['g9ict-int-003', 'browsers_search', 2,
   'In the address <b>https://www.mie.ac.mu/library</b>, which part is the domain name?',
   ['www.mie.ac.mu', 'https', '/library', 'mu'], 'www.mie.ac.mu',
   'It is the part that names the site, before the first single slash.',
   'The domain name identifies the site; https is the protocol and /library is the path within it.'],

  ['g9ict-int-004', 'browsers_search', 2,
   'What does the <b>s</b> in <b>https</b> indicate?',
   ['The connection is secure and encrypted', 'The site is a search engine',
    'The page is stored on a server', 'The site is in a different country'],
   'The connection is secure and encrypted',
   'Look for the padlock in the address bar.',
   'The s means secure: data between the browser and the site is encrypted.'],

  ['g9ict-int-005', 'browsers_search', 2,
   'Which of these is a <b>search engine</b>?',
   ['Google', 'Chrome', 'Firefox', 'Edge'], 'Google',
   'Three of these are browsers.',
   'Google is a search engine; Chrome, Firefox and Edge are browsers you use to reach it.'],

  ['g9ict-int-006', 'browsers_search', 3,
   'Putting a phrase in <b>"quotation marks"</b> in a search engine makes it:',
   ['Look for those exact words together', 'Search only in one country',
    'Ignore the words in the quotes', 'Search only images'],
   'Look for those exact words together',
   'It makes the search stricter, not wider.',
   'Quotation marks ask for an exact phrase rather than the words in any order.'],

  ['g9ict-int-007', 'browsers_search', 3,
   'Saving a web address in the browser so you can return to it quickly is called adding a:',
   ['Bookmark', 'Cookie', 'Cache', 'Plug-in'], 'Bookmark',
   'The paper name for keeping your place.',
   'A bookmark (or favourite) stores a page address so it can be reopened with one click.'],

  ['g9ict-int-008', 'email', 1,
   'Which symbol always appears in an email address?',
   ['@', '#', '&', '%'], '@',
   'It separates the user from the domain.',
   'An email address is always username@domain, so it always contains @.'],

  ['g9ict-int-009', 'email', 2,
   'In an email, what is the <b>Cc</b> field used for?',
   ['Sending a visible copy to other people', 'Sending a hidden copy to other people',
    'Attaching a file', 'Setting the subject'],
   'Sending a visible copy to other people',
   'Cc stands for carbon copy.',
   'Cc sends a copy to others, and every recipient can see who was copied.'],

  ['g9ict-int-010', 'email', 2,
   'In an email, what is the <b>Bcc</b> field used for?',
   ['Sending a copy without other recipients seeing that address',
    'Sending a copy that every other recipient is able to see',
    'Marking the email as urgent so that it is opened first',
    'Adding a signature block to the end of the message'],
   'Sending a copy without other recipients seeing that address',
   'The extra B stands for blind.',
   'Bcc - blind carbon copy - sends a copy without revealing that address to the other recipients.'],

  ['g9ict-int-011', 'email', 2,
   'Sending a photograph with an email is done by adding an:',
   ['Attachment', 'Appendix', 'Insertion', 'Enclosure'], 'Attachment',
   'The file is attached to the message.',
   'A file sent with an email is called an attachment.'],

  ['g9ict-int-012', 'email', 3,
   'A pupil must email one message to 40 people without any of them seeing the others\' addresses. Which field should the addresses go in?',
   ['Bcc', 'Cc', 'To', 'Subject'], 'Bcc',
   'The addresses must stay hidden from each other.',
   'Bcc hides the recipients from one another, which is the correct way to email a large list.'],

  ['g9ict-int-013', 'email', 3,
   'What is the main advantage of email over ordinary post?',
   ['It arrives almost immediately and costs nothing to send',
    'It can carry heavier parcels than the post office will',
    'It does not need an internet connection at either end',
    'It cannot be read by anyone else on the way there'],
   'It arrives almost immediately and costs nothing to send',
   'Think about speed and cost.',
   'Email is delivered in seconds at no per-message cost, unlike a posted letter.'],

  ['g9ict-int-014', 'e_services', 1,
   'Buying goods over the internet is called:',
   ['E-commerce', 'E-learning', 'E-government', 'E-banking'], 'E-commerce',
   'Commerce means trade.',
   'E-commerce is buying and selling goods and services online.'],

  ['g9ict-int-015', 'e_services', 1,
   'Checking your account balance on a bank\'s website is an example of:',
   ['E-banking', 'E-commerce', 'E-learning', 'E-voting'], 'E-banking',
   'The clue is the word bank.',
   'E-banking lets a customer manage an account online instead of visiting a branch.'],

  ['g9ict-int-016', 'e_services', 2,
   'Taking a course through a website with videos and quizzes is an example of:',
   ['E-learning', 'E-commerce', 'E-banking', 'E-mail'], 'E-learning',
   'The clue is the word learning.',
   'E-learning delivers teaching and assessment online.'],

  ['g9ict-int-017', 'e_services', 2,
   'Which of these is a benefit of online shopping for the customer?',
   ['The shop is open at any hour', 'The goods arrive instantly',
    'The customer can always try the goods on first', 'No payment details are needed'],
   'The shop is open at any hour',
   'Think about when you can use it, not how fast delivery is.',
   'An online shop can be used at any time of day, unlike a shop with opening hours.'],

  ['g9ict-int-018', 'e_services', 3,
   'Which of these is a <b>drawback</b> of online shopping?',
   ['You cannot examine the goods before buying',
    'You can only shop during opening hours',
    'You must always pay in cash',
    'It is never possible to compare prices'],
   'You cannot examine the goods before buying',
   'What can a shop do that a web page cannot?',
   'Online you cannot handle, try on or inspect the item before it arrives.'],

  ['g9ict-int-019', 'e_services', 2,
   'Holding a meeting with people in another country using cameras and microphones is called:',
   ['Video conferencing', 'Broadcasting', 'Podcasting', 'Streaming'],
   'Video conferencing',
   'Everyone can see and hear each other, both ways.',
   'Video conferencing lets people in different places see and hear one another in real time.'],

  ['g9ict-int-020', 'e_services', 3,
   'What is the main advantage of video conferencing for a business?',
   ['It saves the time and cost of travelling',
    'It works without any internet connection',
    'It removes the need for any equipment',
    'It guarantees a better decision'],
   'It saves the time and cost of travelling',
   'Compare it with flying to a meeting.',
   'A meeting held online avoids the cost and hours that travelling to it would take.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9ict-int-021', 'browsers_search', 1,
   'Write in full what <b>URL</b> stands for.',
   'Uniform Resource Locator', ['uniform resource locator'],
   'Three words.', 'URL stands for Uniform Resource Locator.'],
  ['g9ict-int-022', 'email', 2,
   'Give the name of the email field used to send a copy that the other recipients cannot see.',
   'Bcc', ['blind carbon copy', 'bcc'],
   'The extra letter stands for blind.',
   'Bcc - blind carbon copy - hides that recipient from the others.'],
  ['g9ict-int-023', 'e_services', 2,
   'Give the term for buying and selling goods over the internet.',
   'E-commerce', ['ecommerce', 'e commerce', 'electronic commerce'],
   'Commerce means trade.', 'E-commerce is trade carried out online.'],
  ['g9ict-int-024', 'browsers_search', 2,
   'Name the program used to view web pages.',
   'Browser', ['web browser', 'a browser'],
   'Chrome and Firefox are examples.',
   'A web browser displays web pages.'],
  ['g9ict-int-025', 'e_services', 3,
   'Give the term for a meeting held over the internet using cameras and microphones.',
   'Video conferencing', ['videoconferencing', 'video conference', 'video call'],
   'Both sides can see and hear each other.',
   'Video conferencing links people in different places in real time.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

// ══════════════════════════════════════════════════════════════════════════
//  SYLLABUS-GAP BLOCK. `internet_www`, `web_tools` and
//  `web_design_principles` were declared with nothing behind them.
//  ⚠ The Internet / World Wide Web distinction is a stated NCF outcome and is
//    the commonest thing candidates get wrong in this slot: the Web is one
//    service carried BY the Internet, not another name for it.
// ══════════════════════════════════════════════════════════════════════════
const MCQ2 = [
  ['g9ict-int-026', 'internet_www', 1,
   'What is the <b>Internet</b>?',
   ['A worldwide network of connected computer networks',
    'A program used to view web pages on a screen',
    'A collection of linked web pages and nothing else',
    'A single very large computer that stores every page'],
   'A worldwide network of connected computer networks',
   'It is the connection itself.',
   'The Internet is the global network infrastructure that links networks together.'],

  ['g9ict-int-027', 'internet_www', 2,
   'What is the <b>World Wide Web</b>?',
   ['The linked pages and sites carried over the Internet',
    'Another name for the Internet and the cables it uses',
    'A type of network cable used to reach the Internet',
    'A search engine that finds pages on the Internet'],
   'The linked pages and sites carried over the Internet',
   'It is one of the services the Internet carries.',
   'The Web is the collection of linked pages and sites delivered over the Internet; email and file transfer are other services on the same network.'],

  ['g9ict-int-028', 'internet_www', 3,
   'Which statement is correct?',
   ['The Web is one of the services carried by the Internet',
    'The Internet is one of the services carried by the Web',
    'The Internet and the Web are exactly the same thing',
    'Neither has anything to do with the other'],
   'The Web is one of the services carried by the Internet',
   'Which one is the road, and which the traffic?',
   'The Internet is the network; the Web is one service running on it.'],

  ['g9ict-int-029', 'internet_www', 2,
   'What does <b>ISP</b> stand for?',
   ['Internet Service Provider', 'Internal System Program',
    'Internet Security Protocol', 'International Server Port'],
   'Internet Service Provider',
   'It is the company you pay for a connection.',
   'An ISP - Internet Service Provider - is the company that connects a home or business to the Internet.'],

  ['g9ict-int-030', 'web_tools', 1,
   'A personal online journal, with entries shown newest first, is called a:',
   ['Blog', 'Wiki', 'Forum', 'Podcast'], 'Blog',
   'It is written by one person or a small group.',
   'A blog is a website of dated entries, usually written by one author and read by many.'],

  ['g9ict-int-031', 'web_tools', 2,
   'A website whose pages can be edited by many contributors is called a:',
   ['Wiki', 'Blog', 'Podcast', 'Browser'], 'Wiki',
   'Many people build it together.',
   'A wiki lets its readers edit and extend the pages, so the content is written collaboratively.'],

  ['g9ict-int-032', 'web_tools', 2,
   'An audio programme published on the internet for people to download or stream is a:',
   ['Podcast', 'Blog', 'Wiki', 'Spreadsheet'], 'Podcast',
   'You listen to it.',
   'A podcast is an audio episode published online to be downloaded or streamed.'],

  ['g9ict-int-033', 'web_tools', 3,
   'A class must discuss a topic over several days, with everyone able to read and reply to earlier messages. Which tool suits this best?',
   ['A discussion forum', 'A live video call',
    'A podcast', 'A printed handout'],
   'A discussion forum',
   'The discussion must stay readable over time.',
   'A forum keeps the messages in threads that can be read and replied to at any time, unlike a live call that ends.'],

  ['g9ict-int-034', 'web_design_principles', 1,
   'Which is the best guide to how a web page should be laid out?',
   ['Keep it simple and consistent so visitors can find things',
    'Use as many different fonts and colours as possible',
    'Fill every empty space on the page with moving images',
    'Hide the menu so that the page looks tidy and uncluttered'],
   'Keep it simple and consistent so visitors can find things',
   'The visitor must be able to use it.',
   'A user-friendly site is simple, consistent and predictable, so a visitor knows where to look.'],

  ['g9ict-int-035', 'web_design_principles', 2,
   'Why should the navigation menu appear in the same place on every page of a site?',
   ['Visitors learn where it is and can move around quickly',
    'It makes every page of the site load noticeably faster',
    'It reduces the number of pages the site has to hold',
    'It stops the site being searched by a search engine'],
   'Visitors learn where it is and can move around quickly',
   'Consistency is what makes a site learnable.',
   'A menu that moves forces the visitor to hunt for it on every page; keeping it still makes the site predictable.'],

  ['g9ict-int-036', 'web_design_principles', 3,
   'Why should a web page not use pale grey text on a white background?',
   ['It is hard to read, especially for visitors with poor eyesight',
    'Grey text loads more slowly than black text on the same page',
    'Grey text cannot be printed on an ordinary office printer',
    'Search engines refuse to list a page that uses grey text'],
   'It is hard to read, especially for visitors with poor eyesight',
   'Think about contrast.',
   'Text needs enough contrast against its background to be readable; pale grey on white fails that for many readers.'],
];

MCQ2.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

})();
