'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - Databases   (examWeight 3)
//
//  ⚠ THE QUERY-BY-EXAMPLE GRID APPEARS IN EVERY PAPER FROM 2022 AND IS NOT A
//    SYLLABUS OUTCOME. The syllabus says "create queries"; the papers print an
//    Access-style design grid with Field / Table / Sort / Show / Criteria rows
//    and ask candidates to complete a cell. It is in scope here for the same
//    reason Python is in the Algorithms chapter: the exam asks it.
//
//  ⚠ THE GRID IS DESCRIBED IN WORDS, NOT DRAWN. A screenshot of the design view
//    is artwork this repo does not have for Grade 9; the row names are given in
//    the question stem instead. Recorded in blueprint-ict.md as still needing
//    artwork.
//
//  Source: NCE ICT (N540) 2021-2025 database slot; NCF Grades 7-9 §8.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9ict-databases';

const MCQ = [
  ['g9ict-db-001', 'db_structure', 1,
   'In a database table, what is a single <b>row</b> called?',
   ['A record', 'A field', 'A query', 'A report'], 'A record',
   'It holds everything known about one person or thing.',
   'A row is a record: all the data about one item, such as one pupil.'],

  ['g9ict-db-002', 'db_structure', 1,
   'In a database table, what is a single <b>column</b> called?',
   ['A field', 'A record', 'A form', 'A key'], 'A field',
   'It holds one kind of information for every row.',
   'A column is a field: one item of information, such as Surname, held for every record.'],

  ['g9ict-db-003', 'db_structure', 2,
   'A table stores 200 pupils with 6 columns each. How many <b>records</b> does it hold?',
   ['200', '6', '1200', '206'], '200',
   'One record per pupil.',
   'Each pupil is one record, so there are 200 records of 6 fields each.'],

  ['g9ict-db-004', 'db_structure', 2,
   'What is a <b>primary key</b>?',
   ['A field whose value is different in every record',
    'The first field in the table',
    'The password that opens up the database',
    'The field that is sorted first'],
   'A field whose value is different in every record',
   'It must identify one record and only one.',
   'A primary key uniquely identifies each record, so no two records may share its value.'],

  ['g9ict-db-005', 'db_structure', 3,
   'Which of these fields would make the best <b>primary key</b> for a table of pupils?',
   ['Admission number', 'Surname', 'Class', 'Date of birth'], 'Admission number',
   'Which one can never be repeated?',
   'Two pupils can share a surname, a class or a birthday; an admission number is issued once and never repeated.'],

  ['g9ict-db-006', 'db_tables', 1,
   'Which data type should be used for a field holding a pupil&rsquo;s <b>date of birth</b>?',
   ['Date/Time', 'Text', 'Number', 'Yes/No'], 'Date/Time',
   'The field holds a calendar date.',
   'A Date/Time field stores dates properly, so they can be sorted and compared.'],

  ['g9ict-db-007', 'db_tables', 2,
   'Which data type should be used for a field holding a <b>telephone number</b>?',
   ['Text', 'Number', 'Currency', 'Date/Time'], 'Text',
   'Would you ever add two telephone numbers together?',
   'A telephone number is never calculated with and may begin with a zero, which a Number field would drop, so Text is correct.'],

  ['g9ict-db-008', 'db_tables', 2,
   'Which data type should be used for a field that records whether a fee has been paid?',
   ['Yes/No', 'Text', 'Number', 'Date/Time'], 'Yes/No',
   'There are only two possible answers.',
   'A Yes/No (Boolean) field stores one of exactly two states, which is what "paid or not" needs.'],

  ['g9ict-db-009', 'db_tables', 2,
   'Which data type should be used for a field holding the <b>price</b> of an item in rupees?',
   ['Currency', 'Text', 'Yes/No', 'Date/Time'], 'Currency',
   'It is money.',
   'A Currency field stores an amount of money with the right number of decimal places and a currency symbol.'],

  ['g9ict-db-010', 'db_tables', 3,
   'Why is <b>Number</b> the wrong data type for a field holding a postcode that may start with 0?',
   ['A Number field removes a leading zero',
    'A Number field cannot hold five digits',
    'A Number field cannot be sorted',
    'A Number field cannot be searched'],
   'A Number field removes a leading zero',
   'What happens to a 0 written in front of a number?',
   'A Number field stores a value, not the characters typed, so a leading zero is lost. Text keeps it.'],

  ['g9ict-db-011', 'data_entry', 1,
   'What is the name for the whole organised collection of related tables and the data in them?',
   ['A database', 'A record', 'A field', 'A query'], 'A database',
   'It is the largest of these four.',
   'A database is the whole organised collection of related data.'],

  ['g9ict-db-012', 'data_entry', 2,
   'A pupil moves house. What should be done to the database?',
   ['Edit the address field in that pupil&rsquo;s record',
    'Delete the record and stop there',
    'Add a second record for the same pupil',
    'Change the primary key'],
   'Edit the address field in that pupil&rsquo;s record',
   'Only one thing about the pupil has changed.',
   'Editing the one field that changed keeps the record accurate without duplicating the pupil.'],

  ['g9ict-db-013', 'data_entry', 3,
   'What is the main problem with entering the same customer twice in a table?',
   ['The data becomes inconsistent and reports are wrong',
    'The table runs out of records',
    'The primary key disappears',
    'The queries begin to run more slowly than usual'],
   'The data becomes inconsistent and reports are wrong',
   'Which of the two copies is the true one?',
   'Duplicate records can disagree with each other, so counts, searches and reports stop being reliable.'],

  ['g9ict-db-014', 'queries', 1,
   'What is a <b>query</b> used for?',
   ['To find the records that match a condition',
    'To print a neat summary of the data',
    'To enter data one record at a time',
    'To make a backup copy of the database'],
   'To find the records that match a condition',
   'It asks a question of the data.',
   'A query searches the table and returns only the records that satisfy the criteria given.'],

  ['g9ict-db-015', 'queries', 2,
   'In a query design grid with the rows Field, Table, Sort, Show and Criteria, which row holds the condition a record must satisfy?',
   ['Criteria', 'Field', 'Sort', 'Show'], 'Criteria',
   'The name of the row says what it holds.',
   'The Criteria row holds the condition; Field names the column, Sort orders it and Show decides whether it is displayed.'],

  ['g9ict-db-016', 'queries', 2,
   'In a query design grid, what does the <b>Show</b> row control?',
   ['Whether that field appears in the results',
    'Whether that field is sorted',
    'Whether that field is the primary key',
    'Whether that field may be edited'],
   'Whether that field appears in the results',
   'It is a tick box.',
   'Unticking Show lets a field be used in the criteria without appearing in the answer.'],

  ['g9ict-db-017', 'queries', 3,
   'A query on a Marks field has the criteria <b>&gt;50</b>. Which records are returned?',
   ['Those with a mark above 50', 'Those with a mark of 50 or more',
    'Those with a mark below 50', 'Every record in the table'],
   'Those with a mark above 50',
   '"Greater than" does not include equal to.',
   'The criteria &gt;50 returns marks above 50 only; a mark of exactly 50 is excluded.'],

  ['g9ict-db-018', 'queries', 3,
   'A query must list pupils who are in Grade 9 <b>and also</b> in the netball club. Which operator joins the two conditions?',
   ['AND', 'OR', 'NOT', 'LIKE'], 'AND',
   'Both conditions must be true at the same time.',
   'AND returns only the records that satisfy both conditions; OR would return those satisfying either.'],

  ['g9ict-db-019', 'forms_reports', 2,
   'What is a database <b>form</b> mainly used for?',
   ['Entering and viewing one record at a time',
    'Printing a summary for a meeting',
    'Storing the data on the hard disk',
    'Joining two tables together'],
   'Entering and viewing one record at a time',
   'It is a screen a user types into.',
   'A form gives a friendly on-screen layout for entering and viewing records one at a time.'],

  ['g9ict-db-020', 'forms_reports', 2,
   'What is a database <b>report</b> mainly used for?',
   ['Presenting selected data in a neat printable layout',
    'Typing new records into the table',
    'Setting the data type of each field',
    'Protecting the whole database with a password'],
   'Presenting selected data in a neat printable layout',
   'It is the output, not the input.',
   'A report formats data - often grouped and totalled - so it can be printed or read as a summary.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9ict-db-021', 'db_structure', 1,
   'Give the database term for one <b>row</b> of a table.',
   'Record', ['a record'],
   'It holds all the data about one item.', 'A row of a table is a record.'],
  ['g9ict-db-022', 'db_structure', 1,
   'Give the database term for one <b>column</b> of a table.',
   'Field', ['a field'],
   'It holds one item of information for every row.', 'A column of a table is a field.'],
  ['g9ict-db-023', 'db_structure', 2,
   'Name the field whose value must be different in every record so that it identifies one record only.',
   'Primary key', ['primary-key', 'the primary key', 'key field'],
   'Two words.', 'The primary key uniquely identifies each record.'],
  ['g9ict-db-024', 'db_tables', 2,
   'Name the data type that should be used for a field storing whether a library book has been returned.',
   'Yes/No', ['yes no', 'boolean', 'true/false'],
   'There are only two possible values.',
   'A Yes/No (Boolean) field stores one of exactly two states.'],
  ['g9ict-db-025', 'queries', 2,
   'Name the row of a query design grid in which the condition is typed.',
   'Criteria', ['criteria row', 'the criteria row'],
   'The name of the row says what it holds.',
   'The Criteria row of the design grid holds the condition a record must satisfy.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

// ⚠ DEPTH TOP-UP: `forms_reports` held two items and `data_entry` three, so
//   those Practise cards would have opened almost empty.
const MCQ2 = [
  ['g9ict-db-026', 'forms_reports', 2,
   'Which is the best way to let a clerk who knows nothing about databases add new customers?',
   ['Give them a form', 'Let them type into the table directly',
    'Send them the query grid', 'Give them a printed report'],
   'Give them a form',
   'It must be simple and hard to get wrong.',
   'A form shows one record at a time in a friendly layout, so data can be entered without touching the table design.'],

  ['g9ict-db-027', 'forms_reports', 3,
   'A head teacher wants a printed list of pupils grouped by class with a total for each class. What should be produced?',
   ['A report', 'A form', 'A new table', 'A backup'], 'A report',
   'It is printed, grouped and totalled.',
   'A report presents selected data grouped and totalled in a layout designed to be printed.'],

  ['g9ict-db-028', 'forms_reports', 2,
   'Where does the data shown on a form or a report come from?',
   ['The table or query it is based on', 'The printer settings in use',
    'The operating system', 'The design template'],
   'The table or query it is based on',
   'Forms and reports display data; they do not store it.',
   'A form or report is a view of data held in a table or returned by a query.'],

  ['g9ict-db-029', 'data_entry', 2,
   'Why should data be checked as it is typed into a database?',
   ['A mistake entered once is repeated in every report that uses it',
    'Typing is always faster when each entry is checked first',
    'It makes the database file smaller than it would otherwise be',
    'The primary key changes automatically whenever data is added'],
   'A mistake entered once is repeated in every report that uses it',
   'Think about everything that reads the record afterwards.',
   'Wrong data spreads: every search, count and report built on it is wrong too, which is why entry is checked.'],

  ['g9ict-db-030', 'data_entry', 3,
   'A field is set to accept only values between 1 and 100. What is this check called?',
   ['A validation rule', 'A primary key', 'A query', 'A report'],
   'A validation rule',
   'It decides what may be entered.',
   'A validation rule refuses data outside the range allowed, catching errors at the point of entry.'],
];

MCQ2.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

})();
