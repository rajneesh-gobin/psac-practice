'use strict';
(function () {

// ══════════════════════════════════════════════════════════════════════
// DATABASES section: g9ict-dhv-001 to g9ict-dhv-055
// chapterId: 'g9ict-databases'
// ══════════════════════════════════════════════════════════════════════

// ── db_structure: dhv-001 to dhv-011 ─────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-001', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'A database is best described as:',
  options:['an organised collection of data','a document containing a table','a spreadsheet with one sheet','a program that draws charts'],
  answer:'an organised collection of data', hint:'Think of a school register: many records, organised.',
  explanation:'A database stores structured data in a way that makes it easy to search, retrieve and update.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-002', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'In a database, a field is:',
  options:['one item of data in a record','all the records in a table','all the data on one person','a search of the database'],
  answer:'one item of data in a record', hint:'One column heading = one field.',
  explanation:'A field is the smallest unit of data — one category of information, like First Name or Phone Number.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-003', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'In a database, a record is:',
  options:['all the fields for one entity','a list of the field names','the result of one query','a single item of data'],
  answer:'all the fields for one entity', hint:'One row in the table = one record.',
  explanation:'A record is one complete row in a table, grouping all the fields that describe a single entity.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-004', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'A primary key in a database table is a field that:',
  options:['uniquely identifies each record in the table','stores the most important data in each record','allows duplicate values across records','links two tables together'],
  answer:'uniquely identifies each record in the table', hint:'No two records can share the same primary key value.',
  explanation:'A primary key is a field (or combination of fields) whose value is unique for every record, ensuring each row can be identified without ambiguity.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-005', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'Which of the following would be a suitable primary key for a student database?',
  options:['Student ID number','First name','Date of birth','Form class'],
  answer:'Student ID number', hint:'It must be unique for every student.',
  explanation:'A student ID number is unique to each student. Names, dates of birth and classes can be shared by more than one student.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-006', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'A flat-file database stores all data in:',
  options:['one table with no links','a multi-sheet spreadsheet','a set of encrypted files','several linked tables'],
  answer:'one table with no links', hint:'Flat = one level, one table.',
  explanation:'A flat-file database is a single table; it cannot handle complex relationships and can lead to data redundancy.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-007', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'A relational database stores data in:',
  options:['linked tables sharing keys','one single very large table','a form that users fill in','a set of plain text files'],
  answer:'linked tables sharing keys', hint:'Related tables = relational.',
  explanation:'A relational database organises data into separate tables, each representing one entity type, linked by key fields to avoid duplication.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-008', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'Data redundancy in a flat-file database means:',
  options:['the same data is stored twice','the table has two primary keys','records are sorted from A to Z','all data is backed up nightly'],
  answer:'the same data is stored twice', hint:'Repeating data unnecessarily.',
  explanation:'Redundancy occurs when the same information appears in multiple records; updating one copy without the others causes inconsistency.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-009', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'A foreign key in a database table is a field that:',
  options:['matches a key in another table','stores data from another country','is always left completely blank','identifies each record uniquely'],
  answer:'matches a key in another table', hint:'It is a primary key "borrowed" from another table.',
  explanation:'A foreign key references the primary key of a related table, enforcing the link between records in different tables.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-010', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'Data validation in a database ensures that:',
  options:['entries are of the correct type','records are sorted before saving','only the administrator may edit','data is backed up every hour'],
  answer:'entries are of the correct type', hint:'It checks data when it is entered.',
  explanation:'Validation rules (data type, range, format, presence) prevent incorrect data from being stored by rejecting entries that fail the checks.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-011', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'The data type "Text" (or "Short Text") in a database field is used for:',
  options:['letters, numbers and symbols','values used in calculations','dates and times of the day','yes and no values only'],
  answer:'letters, numbers and symbols', hint:'Names and codes are text — not calculated.',
  explanation:'Text fields store alphanumeric data. A phone number stored as Text cannot be averaged, which is correct — you never add phone numbers together.' }));

// ── db_tables: dhv-012 to dhv-022 ────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-012', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'In a database table, columns represent:',
  options:['fields (the categories of data stored)','records (individual entries)','queries (search criteria)','forms (data-entry screens)'],
  answer:'fields (the categories of data stored)', hint:'Each column heading is one field name.',
  explanation:'Each column in a table is one field, defining a category of information (e.g., Surname, Email, Date of Birth).' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-013', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'In a database table, rows represent:',
  options:['records, one per entity','fields, one per category','reports that were made','queries that were run'],
  answer:'records, one per entity', hint:'Each row describes one person, product or event.',
  explanation:'Each row in a table is one record — all the information collected about a single instance of the entity.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-014', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'A database field with the data type "Number" should be used when:',
  options:['the values are calculated with','the values are names or codes','the values are calendar dates','the values are Yes or No only'],
  answer:'the values are calculated with', hint:'Only use Number if you plan to calculate with it.',
  explanation:'Number data type stores numerical values that can be used in arithmetic. Codes like student numbers are stored as Text even though they look like numbers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-015', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'A "Date/Time" data type in a database is used to:',
  options:['store dates for sorting','store scanned photographs','store yes and no values','store telephone numbers'],
  answer:'store dates for sorting', hint:'Dates need their own type to be sorted correctly.',
  explanation:'A Date/Time field stores dates and times in a standard format, enabling correct sorting and age/duration calculations.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-016', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'A "Yes/No" (or Boolean) data type is used for:',
  options:['fields with only two values','fields holding money amounts','fields with long paragraphs','fields storing photographs'],
  answer:'fields with only two values', hint:'Two possible values only.',
  explanation:'A Boolean field stores a binary value — True or False — used for things like "Is the subscription active?" or "Is the student a prefect?".' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-017', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'Adding a new field to an existing database table means:',
  options:['adding a column to the table','deleting an existing record','creating a brand new table','adding a new row of data'],
  answer:'adding a column to the table', hint:'A field is a column.',
  explanation:'Adding a field extends the table structure with a new category of data, adding a column that appears in every existing and future record.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-018', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'Sorting records in a database by surname in ascending (A–Z) order will:',
  options:['arrange surnames from A to Z','remove records with no surname','order records newest to oldest','delete the duplicate records'],
  answer:'arrange surnames from A to Z', hint:'Ascending = A to Z for text.',
  explanation:'Sorting text fields in ascending order arranges records alphabetically A–Z; descending would be Z–A.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-019', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'Which data type should be used for the "Price" field in a products table?',
  options:['Currency','Text','Yes/No','Date/Time'],
  answer:'Currency', hint:'Prices are money values.',
  explanation:'A Currency data type stores monetary values and formats them with the appropriate currency symbol and decimal places.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-020', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'An "AutoNumber" (or AutoIncrement) field is useful as a primary key because:',
  options:['each record gets a unique number','it limits the table to 100 records','it stores how many records exist','the user can pick any number'],
  answer:'each record gets a unique number', hint:'It is generated automatically.',
  explanation:'An AutoNumber primary key is generated by the database for each new record, ensuring uniqueness without requiring the user to enter a value.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-021', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'A lookup field in a database:',
  options:['offers a list to choose from','searches the internet for data','copies data from another table','averages the values in a field'],
  answer:'offers a list to choose from', hint:'A dropdown list in a field.',
  explanation:'A lookup field presents a dropdown list of allowed values, ensuring consistency and reducing the chance of typing errors.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-022', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'A relationship between two database tables is typically created by:',
  options:['matching a primary and foreign key','sorting both tables from A to Z','copying records between tables','deleting one of the two tables'],
  answer:'matching a primary and foreign key', hint:'Primary key meets foreign key.',
  explanation:'A relationship links two tables through a primary key–foreign key pair, allowing data from both tables to be combined in queries and reports.' }));

// ── data_entry: dhv-023 to dhv-033 ───────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-023', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'A data entry form in a database is used to:',
  options:['enter records one at a time','search using complex criteria','print a summary of records','design the table structure'],
  answer:'enter records one at a time', hint:'It is the on-screen version of a paper form.',
  explanation:'A form presents one record at a time in a neat layout, making data entry easier and reducing mistakes compared to entering data directly into the table.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-024', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'A validation rule that allows only values between 1 and 100 in a "Score" field is an example of:',
  options:['range check','presence check','format check','length check'],
  answer:'range check', hint:'It checks that the value falls within an allowed range.',
  explanation:'A range check validation rule rejects any entry outside the specified minimum and maximum — here, any score below 1 or above 100.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-025', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'A presence check validation rule ensures that:',
  options:['a field is not left blank when saving a record','the value is within an acceptable range','the value is in the correct format','the value matches one from a list'],
  answer:'a field is not left blank when saving a record', hint:'It checks that something is present.',
  explanation:'A presence check makes a field mandatory — the record cannot be saved unless that field contains a value.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-026', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'Data verification in a database differs from validation because verification:',
  options:['checks the entry was typed right','corrects spelling mistakes for you','checks the type or range of data','prevents any duplicate records'],
  answer:'checks the entry was typed right', hint:'Typing the email address twice to confirm is verification.',
  explanation:'Verification confirms that entered data matches what was intended (e.g., re-entering a password); validation checks that the data meets a set of rules.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-027', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'Which of the following is an example of a format check?',
  options:['Rejecting the date "30-13-2025"','Rejecting a score of 150 out of 100','Rejecting a name that has a digit','Rejecting a blank surname field'],
  answer:'Rejecting the date "30-13-2025"', hint:'The format must match the expected pattern.',
  explanation:'A format check ensures the data matches the required pattern — for dates, the month must be 1–12; 13 violates the format.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-028', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'Importing data into a database from a CSV file means:',
  options:['bringing text file rows in','copying a table within the file','exporting a printed report','creating a new entry form'],
  answer:'bringing text file rows in', hint:'CSV = Comma-Separated Values — a common data exchange format.',
  explanation:'A CSV import reads each row of the text file and creates a corresponding database record, allowing bulk data entry.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-029', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'The "Undo" function in a database is used to:',
  options:['reverse the last action','delete all the records','sort the whole table','run the saved query'],
  answer:'reverse the last action', hint:'It cancels the most recent change.',
  explanation:'Undo reverts the last action performed, allowing users to correct mistakes without manually re-entering old data.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-030', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'A list-box or drop-down field on a data entry form helps to:',
  options:['restrict entries to a set list','calculate the totals for you','let the user type any text','send the record by email'],
  answer:'restrict entries to a set list', hint:'Choose from a list, not free text.',
  explanation:'Drop-down lists limit the user to approved values, eliminating spelling variations and ensuring data consistency.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-031', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'A check-digit is a type of validation that:',
  options:['recalculates a digit in a code','limits the text length allowed','ensures the field is not blank','checks the data type is right'],
  answer:'recalculates a digit in a code', hint:'Barcodes and ISBNs use check digits.',
  explanation:'A check digit is computed from the other digits in a code; when the code is entered, the computer recalculates and compares — a mismatch reveals an error.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-032', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'Why should a "Phone Number" field be stored as Text rather than Number in a database?',
  options:['A leading zero would be lost','Phone numbers are often negative','They must be sorted numerically','Phone numbers contain letters'],
  answer:'A leading zero would be lost', hint:'You never add two phone numbers together.',
  explanation:'Storing a phone number as a Number field removes any leading zeros and allows arithmetic, which is meaningless for phone numbers. Text is correct.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-033', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'Duplicate records in a database can be prevented by:',
  options:['setting a unique primary key','sorting records before saving','allowing one user at a time','removing duplicated fields'],
  answer:'setting a unique primary key', hint:'A primary key is always unique.',
  explanation:'The primary key uniqueness constraint prevents a second record from being entered with the same key value, rejecting true duplicates.' }));

// ── queries: dhv-034 to dhv-044 ──────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-034', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'A database query is used to:',
  options:['retrieve records that match','print a report of all records','design the layout of a form','back up the whole database'],
  answer:'retrieve records that match', hint:'Ask the database a question.',
  explanation:'A query lets the user specify criteria and retrieves only the matching records, hiding the rest.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-035', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'In Microsoft Access, a QBE (Query By Example) grid allows users to:',
  options:['build a query without SQL','print sheets of mailing labels','import a spreadsheet of data','draw the table structure'],
  answer:'build a query without SQL', hint:'QBE is a visual approach to querying.',
  explanation:'The QBE grid in Access lets users choose fields and type criteria into a visual grid; the application generates the underlying SQL automatically.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-036', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'In a database query, the criterion >"50" in a "Mark" field would return records where:',
  options:['the mark is greater than 50','the mark is exactly 50','the mark is less than 50','the mark field is empty'],
  answer:'the mark is greater than 50', hint:'The > operator means "greater than".',
  explanation:'The > operator selects records where the field value exceeds the specified number — here, any mark above 50.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-037', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'The query criterion "Like *son*" applied to a "Surname" field would return:',
  options:['surnames containing "son"','surnames that are exactly "son"','surnames starting with "son"','surnames ending with "son"'],
  answer:'surnames containing "son"', hint:'The asterisk (*) is a wildcard meaning "any characters".',
  explanation:'The wildcard * means zero or more characters; *son* matches any surname containing "son" — e.g., Jackson, Sonia, Wilson.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-038', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'Using AND between two criteria in a query means:',
  options:['only records that satisfy BOTH criteria are returned','records that satisfy either criterion are returned','all records are returned regardless of the criteria','records matching neither criterion are returned'],
  answer:'only records that satisfy BOTH criteria are returned', hint:'AND = both must be true.',
  explanation:'An AND query is more restrictive — a record must match criterion A AND criterion B to be included in the results.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-039', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'Using OR between two criteria in a query means:',
  options:['at least one criterion matches','no records are returned at all','every record is returned','both criteria must match'],
  answer:'at least one criterion matches', hint:'OR = either is enough.',
  explanation:'An OR query is less restrictive — a record matching criterion A OR criterion B (or both) is included.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-040', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'A query that shows only selected fields (columns) rather than all fields is called a:',
  options:['projection','selection','join','sort'],
  answer:'projection', hint:'Choosing which columns to show.',
  explanation:'A projection picks specific fields to display in the query result, hiding others that are not relevant.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-041', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'An action query in a database can:',
  options:['update, delete or append records','display records without change','change the font used in forms','create a printed paper report'],
  answer:'update, delete or append records', hint:'Action queries change the data, not just display it.',
  explanation:'Unlike a select query (which only reads data), an action query modifies records — for example, updating all prices by 10%, or deleting expired records.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-042', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'In a query, the "Sort" row is used to:',
  options:['order results by a field','filter records by criteria','add a calculated field','pick fields to display'],
  answer:'order results by a field', hint:'It determines the order of results.',
  explanation:'The Sort row in the QBE grid lets you set the field to sort by and the order (Ascending A–Z or Descending Z–A) for the query results.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-043', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'A query that draws data from two or more related tables is called a:',
  options:['multi-table (join) query','single-table select query','flat-file lookup query','data-entry form query'],
  answer:'multi-table (join) query', hint:'It joins tables together.',
  explanation:'A join query links two or more tables through a shared key field, allowing data from multiple tables to be combined in the results.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-044', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'The criterion "Between 1 And 5" applied to an "Age" field would return records where:',
  options:['the age is 1, 2, 3, 4, or 5','the age is exactly between 1 and 5 (i.e., 3)','the age is greater than 5','the age is less than 1'],
  answer:'the age is 1, 2, 3, 4, or 5', hint:'Between is inclusive of both boundary values.',
  explanation:'The BETWEEN operator includes both boundary values, so Between 1 And 5 returns records with age values of 1, 2, 3, 4 and 5.' }));

// ── forms_reports: dhv-045 to dhv-055 ────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-045', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'The main purpose of a database report is to:',
  options:['present data for printing','search using set criteria','enter new records quickly','link two tables together'],
  answer:'present data for printing', hint:'Reports are for presenting, not editing.',
  explanation:'A report formats query results or table data for printing or display, often grouping and summarising data.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-046', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'Grouping in a database report means:',
  options:['collecting records by a value','sorting all records from A to Z','deleting records from the file','adding a chart to the report'],
  answer:'collecting records by a value', hint:'Group by Department shows all records in each department together.',
  explanation:'Grouping in a report collects records sharing a common field value, making it easy to see subtotals (e.g., total sales per department).' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-047', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'A report based on a query will show:',
  options:['only the matching records','only the highest value record','every record in the database','only the first ten records'],
  answer:'only the matching records', hint:'The report shows whatever the underlying query returned.',
  explanation:'A report presents the results of its underlying query or table; basing it on a query applies filter criteria before the data is formatted.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-048', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'A form in a database is different from a report because a form:',
  options:['is used to enter and edit data','is only ever used for printing','can be made by an admin only','cannot show any stored data'],
  answer:'is used to enter and edit data', hint:'Forms are for input; reports are for output.',
  explanation:'Forms provide an interactive screen for data entry and editing; reports provide a formatted, non-editable view of data for output.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-049', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'A subform in a database is:',
  options:['a form inside another form','a read-only copy of a form','a much smaller main form','a form that goes online'],
  answer:'a form inside another form', hint:'It appears inside the main form.',
  explanation:'A subform typically shows the "many" side of a one-to-many relationship — for example, a customer form with a subform listing all their orders.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-050', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'Adding a total (Sum) at the footer of a report group allows:',
  options:['a subtotal for each group','the page count to be printed','export to a spreadsheet file','records to sort descending'],
  answer:'a subtotal for each group', hint:'A subtotal in the group footer.',
  explanation:'A Sum aggregate function in a group footer adds up the numeric field values for all records in that group, displaying a subtotal.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-051', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'The Report Wizard in Access helps users to:',
  options:['build a report step by step','import data from a CSV file','write SQL queries by hand','design a table structure'],
  answer:'build a report step by step', hint:'Wizard = guided, step-by-step.',
  explanation:'The Report Wizard asks a series of questions about which fields to include, how to group and sort, and which layout to use, then generates the report automatically.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-052', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'Conditional formatting in a report changes:',
  options:['the look of values that qualify','the order records are printed','the font size of every field','the primary key of the table'],
  answer:'the look of values that qualify', hint:'Format depends on the value.',
  explanation:'Conditional formatting applies different fonts, colours or styles to field values that meet a specified condition, drawing attention to important data.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-053', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'A mailing-label report is a special report layout used to:',
  options:['print one label per record','email all the contacts held','show a pivot chart of sales','list records in one column'],
  answer:'print one label per record', hint:'Stickers for envelopes.',
  explanation:'A mailing-label report formats address data so each record prints on one peel-and-stick label, arranged in columns to match commercial label sheets.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-054', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'Exporting a database report as a PDF file allows:',
  options:['sharing without the software','recipients to change the layout','the data to be imported back','the data to update by itself'],
  answer:'sharing without the software', hint:'PDF is a universal, read-only format.',
  explanation:'PDF preserves the report layout and can be opened by any device with a PDF reader, making it ideal for sharing final reports.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-055', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'Which section of a database report typically displays the column headings?',
  options:['The Page Header','The Detail section','The Group Footer','The Page Footer'],
  answer:'The Page Header', hint:'Headings appear at the top.',
  explanation:'The Page Header (or Report Header) section appears at the top of each page (or once at the top of the report), displaying field labels and titles.' }));

// ══════════════════════════════════════════════════════════════════════
// HEALTH & SAFETY section: g9ict-dhv-056 to g9ict-dhv-119
// chapterId: 'g9ict-health-safety'
// ══════════════════════════════════════════════════════════════════════

// ── lab_guidelines: dhv-056 to dhv-068 ───────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-056', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Before using the school computer laboratory, students should:',
  options:['wait for the teacher and check the area','leave bags across the pathway between desks','run to the nearest machine and switch it on','bring food and drink to have while working'],
  answer:'wait for the teacher and check the area', hint:'Lab rules must be followed before starting.',
  explanation:'Orderly entry and a safe, tidy workspace protect equipment and prevent accidents in the lab.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-057', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Food and drinks are not allowed in a computer laboratory because:',
  options:['spills can damage the equipment','computers prefer a room without food','the rule is there to spoil the fun','the smell disturbs other users'],
  answer:'spills can damage the equipment', hint:'Liquid and electronics do not mix.',
  explanation:'A liquid spill on a keyboard or into a computer case can short-circuit components and destroy the equipment.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-058', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Students should log off or shut down the computer when they finish using it because:',
  options:['it protects files and saves energy','it lets the teacher delete the work','a shut-down computer starts faster','a computer left on will break down'],
  answer:'it protects files and saves energy', hint:'Leaving a session open is a security risk.',
  explanation:'Logging off ends the user\'s session, preventing others from accessing their files; shutting down also conserves electricity.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-059', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'In a computer laboratory, power cables should be:',
  options:['kept tidy and out of walkways','hidden inside the computer case','left loose on the floor for air','stored in a drawer between uses'],
  answer:'kept tidy and out of walkways', hint:'Trailing cables are a trip hazard.',
  explanation:'Cables on the floor in busy areas are a serious tripping hazard that can injure users and pull equipment off desks.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-060', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'If a student notices a damaged power cable on a computer in the lab, they should:',
  options:['report it immediately to the teacher and not use that computer','repair the cable themselves using tape','continue using the computer and hope nothing happens','unplug all computers in the room'],
  answer:'report it immediately to the teacher and not use that computer', hint:'Damaged electrical cables are dangerous.',
  explanation:'A frayed or damaged cable is an electrocution and fire risk; only a qualified person should carry out repairs.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-061', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Students should never touch the back of a desktop computer or the inside of the case because:',
  options:['high voltages and static can harm','the inside is far too hot to touch','it would make the computer faster','it is impolite to touch equipment'],
  answer:'high voltages and static can harm', hint:'Danger from electricity and static.',
  explanation:'Components like the power supply unit retain charge after being switched off. Static from your hands can also destroy sensitive chips.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-062', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'The correct procedure when there is a fire in the computer laboratory is to:',
  options:['raise the alarm and leave calmly','use water on the burning equipment','hide under the desk until it stops','carry the nearest computer outside'],
  answer:'raise the alarm and leave calmly', hint:'People first, always.',
  explanation:'In a fire emergency, the priority is to evacuate all people safely; never use water on electrical fires — use a CO₂ extinguisher if trained.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-063', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Software in a school lab should only be installed by:',
  options:['an authorised technician','any teacher who asks for it','any student who knows how','the student using that PC'],
  answer:'an authorised technician', hint:'Installing software requires admin rights.',
  explanation:'Unauthorised software installations can introduce malware, violate licensing and disrupt the network; only authorised staff should perform them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-064', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Students should not share their network login password because:',
  options:['any misuse is traced to them','sharing makes the network faster','the administrator knows them all','passwords are too long to recall'],
  answer:'any misuse is traced to them', hint:'Your account, your responsibility.',
  explanation:'A shared password means a third party can access personal files and carry out actions that will be logged under your name.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-065', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Bags and personal belongings should be stored under the desk or at the side of the room in a computer lab because:',
  options:['bags in the aisle can trip people','computers run better on tidy desks','the teacher must inspect all bags','bags hold magnets that wipe disks'],
  answer:'bags in the aisle can trip people', hint:'Clear aisles for safety.',
  explanation:'Bags and coats on the floor between desks create a tripping hazard and can impede quick evacuation in an emergency.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-066', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Students should save their work regularly while in the computer lab because:',
  options:['a crash loses unsaved work','the network deletes unsaved files','saving copies work to the teacher','saving slows the computer down'],
  answer:'a crash loses unsaved work', hint:'Unsaved work exists only in RAM.',
  explanation:'RAM is volatile — a power failure or crash erases everything in memory. Frequent saves to disk protect against data loss.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-067', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'In a computer laboratory, students should use the equipment only for:',
  options:['the tasks set by the teacher','plugging in unscanned USB drives','gaming and social media if free','downloading software for home'],
  answer:'the tasks set by the teacher', hint:'School equipment is for school use.',
  explanation:'Acceptable use policies restrict school computers to educational activities, protecting resources and ensuring equitable access for all students.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-068', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Before plugging a USB drive from home into a school computer, students should:',
  options:['have it scanned for viruses','format it to erase the files','break it to avoid all risk','plug it in with no checks'],
  answer:'have it scanned for viruses', hint:'Foreign drives can carry malware.',
  explanation:'A USB drive used on other computers may carry malware; scanning it before use prevents infection spreading to the school network.' }));

// ── safety_precautions: dhv-069 to dhv-079 ───────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-069', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'Electrical equipment in the computer lab should be connected to:',
  options:['properly earthed mains sockets','the mains without using a plug','extension leads left coiled up','any socket without a check'],
  answer:'properly earthed mains sockets', hint:'Earthing and correct voltage prevent shocks and fires.',
  explanation:'Earthed sockets and the correct voltage protect against electric shock and prevent overloading that could start a fire.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-070', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'An anti-static wrist strap is worn when handling computer components to:',
  options:['discharge static safely to earth','protect the wrist from sharp edges','keep the wrist warm while working','make the technician look the part'],
  answer:'discharge static safely to earth', hint:'Static can destroy electronic components.',
  explanation:'A wrist strap bonds the technician to the earth, equalising charge and preventing the discharge of built-up static into sensitive components.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-071', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'Extension leads should not be overloaded in a computer lab because:',
  options:['they can overheat and catch fire','wall sockets make computers faster','leads are for offices, not schools','overloading raises internet speed'],
  answer:'they can overheat and catch fire', hint:'Too much current = heat.',
  explanation:'Each extension lead is rated for a maximum current; exceeding this causes overheating of the cable insulation, which can ignite.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-072', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'A Residual Current Device (RCD) in the lab is there to:',
  options:['cut the power if a fault occurs','speed up the internet connection','charge laptop batteries faster','record which computers are on'],
  answer:'cut the power if a fault occurs', hint:'It detects earth faults and trips the circuit.',
  explanation:'An RCD monitors the current in a circuit and trips the supply within milliseconds if it detects a leakage to earth, preventing a potentially fatal shock.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-073', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'Monitors and towers should not be placed near water sources such as open windows during rain because:',
  options:['water can cause a short circuit','rain erases hard disks with magnetism','water improves screen brightness','computers are afraid of water'],
  answer:'water can cause a short circuit', hint:'Water and electricity are a deadly combination.',
  explanation:'Water is a conductor; if it enters a powered device it can short-circuit it and electrocute the user.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-074', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'A surge protector (or UPS — Uninterruptible Power Supply) protects computers from:',
  options:['voltage spikes and power cuts','excessive heat from the CPU','unauthorised network access','viruses and other malware'],
  answer:'voltage spikes and power cuts', hint:'It keeps the power supply stable.',
  explanation:'A UPS provides clean, regulated power and battery backup, preventing voltage spikes and giving users time to save and shut down gracefully during a power cut.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-075', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'The correct way to clean a computer screen is with:',
  options:['a soft, lightly dampened cloth','a wet cloth soaked in tap water','a hard brush to scrub the dust','household spray and newspaper'],
  answer:'a soft, lightly dampened cloth', hint:'Gentle cleaning only.',
  explanation:'Harsh chemicals can damage anti-glare coatings; excess liquid near electronic components is dangerous; a microfibre cloth and screen cleaner are safest.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-076', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'When carrying a laptop, students should:',
  options:['hold it closed in both hands','carry it by the screen one-handed','carry it open to see the screen','swing it by the charging cable'],
  answer:'hold it closed in both hands', hint:'Screens are fragile.',
  explanation:'The screen is the most fragile part of a laptop; holding it by the screen can crack the panel. Two hands and a closed lid protect the device.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-077', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'Computers should not be placed in direct sunlight because:',
  options:['overheating and glare are harmful','screen colours look better outside','the battery charges from the sun','sunlight raises processing speed'],
  answer:'overheating and glare are harmful', hint:'Heat is a computer\'s enemy.',
  explanation:'Sustained high temperatures shorten the life of processors, RAM and batteries; screen glare also makes the display unusable.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-078', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'Students should wash their hands before using shared keyboards because:',
  options:['dirt damages keys and spreads germs','clean hands type a great deal faster','keyboards charge faster when clean','the keyboard reads fingerprints'],
  answer:'dirt damages keys and spreads germs', hint:'Hygiene and equipment care.',
  explanation:'Oils and dirt from hands build up on keys and can degrade the legends; shared keyboards are also a vector for spreading illness.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-079', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'In the event of an electric shock to a person in the lab, the first action should be to:',
  options:['switch off the power at the mains','leave the room and wait for help','pull the victim away by hand','pour water on the equipment'],
  answer:'switch off the power at the mains', hint:'Never touch someone being electrocuted with the power still on.',
  explanation:'Touching a person still in contact with live electricity will electrocute the rescuer too; cutting the power first makes rescue safe.' }));

// ── equipment_care: dhv-080 to dhv-090 ───────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-080', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'To keep a desktop computer cool and prevent overheating, you should:',
  options:['keep the ventilation slots clear','cover it with a blanket when idle','run many programs to work the fan','put the computer in a cupboard'],
  answer:'keep the ventilation slots clear', hint:'Airflow keeps components cool.',
  explanation:'Processors, GPUs and PSUs produce heat; clear ventilation slots and adequate room airflow allow the cooling fans to dissipate heat effectively.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-081', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Compressed air cans are used for computer maintenance to:',
  options:['blow dust out of vents and fans','recharge the laptop battery quickly','lubricate the moving parts','cool the CPU while it runs'],
  answer:'blow dust out of vents and fans', hint:'Blow out the dust.',
  explanation:'Compressed air safely dislodges dust from components without contact, preventing heat build-up caused by dust-clogged vents and fans.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-082', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Magnets should be kept away from traditional hard disk drives (HDDs) because:',
  options:['they can erase the stored data','they increase power consumption','they slow the read/write heads','they make the screen flicker'],
  answer:'they can erase the stored data', hint:'HDD data is stored magnetically.',
  explanation:'HDDs record data by magnetising tiny regions of their platters; an external magnetic field can randomly flip those regions, corrupting or erasing data.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-083', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Why should computers be shut down properly rather than just switching off the power at the wall?',
  options:['files are closed and data written','the battery charges much faster','the antivirus updates by itself','the wall switch uses less power'],
  answer:'files are closed and data written', hint:'Abrupt power loss can corrupt the file system.',
  explanation:'The operating system needs time to write buffered data, close open files and update file system structures; cutting power mid-process can corrupt data.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-084', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'A protective screen cover or filter is used on a monitor to:',
  options:['reduce glare and protect the screen','make the screen fully waterproof','improve the graphics card speed','increase the screen brightness'],
  answer:'reduce glare and protect the screen', hint:'Protection and comfort.',
  explanation:'Screen protectors reduce reflections that cause eye strain and add a physical barrier against dust and accidental scratching.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-085', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Regularly defragmenting a traditional HDD (hard disk drive) is done to:',
  options:['store files in one piece again','cool the hard drive down a bit','remove viruses from the drive','increase the storage capacity'],
  answer:'store files in one piece again', hint:'Fragmented files make the read head travel further.',
  explanation:'Over time, files become scattered across the disk; defragmentation rearranges them into contiguous blocks, reducing the distance the read/write head must travel.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-086', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Portable storage devices such as USB drives should be safely ejected before being physically removed from the computer because:',
  options:['unsaved writes could corrupt files','ejecting recharges the USB drive','the drive must cool down first','the USB port would break off'],
  answer:'unsaved writes could corrupt files', hint:'The OS may have buffered writes pending.',
  explanation:'The OS caches writes; a safe eject flushes the cache to the drive. Removing the drive with pending writes leaves the file system in an inconsistent state.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-087', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Printers in a lab should be maintained by:',
  options:['replacing toner and clearing jams','leaving them running day and night','hitting them whenever they jam','wetting the paper in the tray'],
  answer:'replacing toner and clearing jams', hint:'Regular, gentle maintenance.',
  explanation:'Correct maintenance — replacing consumables, carefully clearing jams and keeping the device clean — extends printer life and print quality.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-088', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'To protect a laptop\'s battery health, users should:',
  options:['avoid the 0% and 100% extremes','only ever run it on the mains','charge for two hours each day','remove the battery every day'],
  answer:'avoid the 0% and 100% extremes', hint:'Extremes of charge level stress lithium batteries.',
  explanation:'Lithium-ion batteries degrade fastest at the extremes; keeping charge between about 20% and 80% extends battery lifespan significantly.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-089', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Network cables should not be bent sharply or run under heavy furniture because:',
  options:['the conductors inside can break','bent cables use more electricity','straight cables run much faster','cables must stay in plain sight'],
  answer:'the conductors inside can break', hint:'Cables have bend-radius limits.',
  explanation:'The copper conductors inside a cable can break or make poor contact if bent beyond their minimum bend radius or crushed, causing network faults.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-090', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Which type of fire extinguisher should be used on an electrical fire in the computer lab?',
  options:['CO₂ (carbon dioxide) extinguisher','Water extinguisher','Foam extinguisher','Dry powder extinguisher (only if CO₂ is unavailable — it damages equipment)'],
  answer:'CO₂ (carbon dioxide) extinguisher', hint:'CO₂ is safe on electrical fires.',
  explanation:'CO₂ extinguishers discharge non-conductive gas, smothering the fire without damaging electrical equipment or leaving a messy residue.' }));

// ── health_hazards: dhv-091 to dhv-104 ───────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-091', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'RSI (Repetitive Strain Injury) in computer users is caused by:',
  options:['repeating the same hand movements','staring at a bright screen at night','using a wireless keyboard and mouse','sitting too close to the screen'],
  answer:'repeating the same hand movements', hint:'Repetition + poor posture = RSI.',
  explanation:'RSI is an umbrella term for pain and inflammation in tendons and muscles caused by repeated awkward movements without adequate rest.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-092', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Eye strain from prolonged computer use can be reduced by:',
  options:['following the 20-20-20 rule','setting brightness to maximum','sitting as close as possible','working in a fully dark room'],
  answer:'following the 20-20-20 rule', hint:'Regular breaks and correct brightness.',
  explanation:'The 20-20-20 rule gives the eye muscles a rest; matching screen brightness to room light prevents both squinting and glare.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-093', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Back pain is a common health problem for computer users who:',
  options:['hunch in a badly adjusted chair','use a wireless mouse, not a wired','type with more than two fingers','work in a brightly lit room'],
  answer:'hunch in a badly adjusted chair', hint:'Posture and prolonged sitting are the causes.',
  explanation:'Poor seating posture with no lumbar support places excessive stress on the spinal discs and back muscles, leading to chronic pain.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-094', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Carpal tunnel syndrome is a health hazard associated with computer use that affects:',
  options:['the wrist and hand','the ears and hearing','the eyes and vision','the spine and back'],
  answer:'the wrist and hand', hint:'It affects the wrist.',
  explanation:'Prolonged, repetitive wrist movements and poor wrist angle compress the median nerve in the carpal tunnel, causing pain, numbness and weakness in the hand.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-095', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Neck pain in computer users is often caused by:',
  options:['a screen set too high or too low','using a very large widescreen monitor','using a laptop with no case','having a fast processor'],
  answer:'a screen set too high or too low', hint:'The monitor height should be at eye level.',
  explanation:'If the screen is not at eye level, the user must hold their head in an awkward position, straining the neck muscles.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-096', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Photosensitive epilepsy can be triggered in susceptible users by:',
  options:['rapidly flashing images','the desktop background colour','a slow internet connection','using a very large monitor'],
  answer:'rapidly flashing images', hint:'Flashing lights can trigger seizures.',
  explanation:'In people with photosensitive epilepsy, flashing images at certain frequencies (typically 3–50 Hz) can trigger a seizure; content with rapid flashes should carry a warning.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-097', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Prolonged exposure to noise from loud headphones or speakers can cause:',
  options:['permanent hearing loss','improved hearing over time','a faster typing speed','strain on the eyes'],
  answer:'permanent hearing loss', hint:'Loud sound damages hair cells in the inner ear.',
  explanation:'The hair cells in the cochlea that detect sound cannot regenerate; sustained exposure to loud audio permanently reduces hearing ability.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-098', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Sedentary behaviour (sitting for many hours without movement) associated with heavy computer use increases the risk of:',
  options:['obesity and heart disease','a lower risk of illness','stronger leg muscles','better heart health'],
  answer:'obesity and heart disease', hint:'Lack of movement has serious health consequences.',
  explanation:'Extended sitting without movement slows the metabolism, contributes to weight gain, and increases the risk of blood clots forming in the legs.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-099', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Blue light emitted by screens may contribute to:',
  options:['disrupted sleep patterns','better eyesight over time','improved concentration','much faster learning'],
  answer:'disrupted sleep patterns', hint:'Blue light suppresses melatonin.',
  explanation:'Blue light inhibits the production of melatonin, the hormone that induces sleep; using screens in the evening can delay sleep onset and reduce sleep quality.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-100', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Stress and anxiety can be health hazards associated with computer use because:',
  options:['online pressure and bullying build up','large monitors raise blood pressure','faster processors cause headaches','wireless networks cause anxiety'],
  answer:'online pressure and bullying build up', hint:'Social and psychological effects of being always connected.',
  explanation:'Constant connectivity, exposure to negative online content and cyberbullying are recognised causes of stress and poor mental health in young people.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-101', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Computer addiction is characterised by:',
  options:['compulsive use that harms daily life','typing faster than most people do','using a computer for over an hour','preferring a laptop to a desktop'],
  answer:'compulsive use that harms daily life', hint:'When it takes over other aspects of life.',
  explanation:'Computer or internet addiction is a behavioural disorder where the compulsion to use screens disrupts sleep, school performance and real-world social relationships.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-102', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Dry eyes in computer users are caused by:',
  options:['blinking less than normal','working in a bright light','using a very large screen','typing for long periods'],
  answer:'blinking less than normal', hint:'Screen focus reduces blink rate.',
  explanation:'The average person blinks far less frequently when concentrating on a screen, reducing the spread of tear film and causing dry, irritated eyes.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-103', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Poor posture while using a laptop on a bed or sofa can cause:',
  options:['back, neck and shoulder strain','faster and more accurate typing','better posture as time passes','stronger muscles in the back'],
  answer:'back, neck and shoulder strain', hint:'Soft surfaces and low screens cause you to slouch.',
  explanation:'Using a laptop on a bed usually means looking down at a low screen while the spine is unsupported, creating forward-head posture and muscle strain.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-104', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'The recommended distance between a user\'s eyes and a computer monitor is approximately:',
  options:['50 to 70 cm','0 cm (touching)','2 to 3 metres','10 to 20 cm'],
  answer:'50 to 70 cm', hint:'About arm\'s length.',
  explanation:'Sitting about 50–70 cm from the screen gives a comfortable viewing angle, reduces eye strain and limits exposure to any electromagnetic emissions.' }));

// ── hazard_prevention: dhv-105 to dhv-119 ────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-105', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'An ergonomic chair should be adjusted so that:',
  options:['feet are flat and the back supported','the user stretches to reach the keys','the seat is raised as high as it goes','the armrests are taken off completely'],
  answer:'feet are flat and the back supported', hint:'Feet flat, knees 90°, lumbar support.',
  explanation:'Correct chair adjustment maintains the natural curve of the spine, keeps blood flowing to the legs and reduces pressure on the lumbar discs.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-106', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'The top of a monitor should be positioned at or just below eye level so that:',
  options:['the neck stays in a neutral position','the screen sits as far away as it can','the screen is tilted away from view','the user looks up and builds muscle'],
  answer:'the neck stays in a neutral position', hint:'Slight downward gaze is most comfortable.',
  explanation:'A screen positioned at or slightly below eye level allows the head to rest in its natural forward position, reducing neck and shoulder strain.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-107', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Using a wrist rest while typing helps to:',
  options:['keep the wrists flat and neutral','increase typing speed a great deal','correct spelling mistakes for you','stop the keyboard from sliding'],
  answer:'keep the wrists flat and neutral', hint:'Neutral wrist position reduces nerve and tendon stress.',
  explanation:'A wrist rest allows the user to rest their wrists between bursts of typing with the wrists in a neutral position, reducing strain on tendons and the median nerve.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-108', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Taking regular breaks from the computer every 30–60 minutes helps to:',
  options:['ease eye, back and neck strain','increase the risk of getting RSI','slow the computer down a little','reduce the laptop battery life'],
  answer:'ease eye, back and neck strain', hint:'Movement breaks counteract the effects of prolonged static posture.',
  explanation:'Regular micro-breaks allow the eyes to refocus, muscles to relax and blood to circulate, reducing the cumulative strain of long computer sessions.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-109', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'An anti-glare screen filter reduces:',
  options:['reflections that tire the eyes','the processing speed of the PC','the risk of an electric shock','the resolution of the screen'],
  answer:'reflections that tire the eyes', hint:'Glare = reflected light on the screen.',
  explanation:'An anti-glare filter has a matte surface that diffuses reflected light, reducing the brightness contrast between the screen content and reflections.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-110', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Cable management trunking in a computer lab is used to:',
  options:['route cables away from walkways','protect the cables from sunlight','reduce the electricity consumed','speed up network data transfer'],
  answer:'route cables away from walkways', hint:'Trunking = neat cable channels.',
  explanation:'Cable trunking channels guide cables safely along walls or under desk surfaces, eliminating trailing cables that are a trip and safety hazard.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-111', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'The keyboard and mouse should be placed so that:',
  options:['the wrists stay flat and level','the keyboard is as high as it goes','the keyboard rests on the floor','the mouse is across the room'],
  answer:'the wrists stay flat and level', hint:'Elbows at desk height, shoulders relaxed.',
  explanation:'Correct keyboard and mouse placement allows the arms to hang naturally from the shoulders, reducing strain on the elbows, wrists and shoulders.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-112', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Adequate lighting in a computer lab should:',
  options:['light the desk without screen glare','shine sunlight straight at the screen','be just bright enough to stay awake','be as dark as the room can be made'],
  answer:'light the desk without screen glare', hint:'Balance between document visibility and screen glare.',
  explanation:'Room lighting must illuminate work surfaces and printed documents but should not reflect on the screen; indirect, diffuse lighting is best.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-113', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Regular software updates and antivirus scans help to prevent:',
  options:['malware and loss of data','the keyboard wearing out','overcharges on the bill','the monitor overheating'],
  answer:'malware and loss of data', hint:'Updated software = patched vulnerabilities.',
  explanation:'Updates patch known security flaws; antivirus scans detect and remove malicious software before it can cause data loss or system damage.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-114', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'A screen saver that activates after a few minutes of inactivity helps to:',
  options:['prevent burn-in and hide the work','save every open document for you','cool the processor down a little','extend a desktop battery life'],
  answer:'prevent burn-in and hide the work', hint:'Screen savers were invented for screen burn.',
  explanation:'On older CRT and plasma screens, a static image displayed for long periods can permanently "burn" into the phosphor; screen savers also obscure the user\'s work.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-115', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Parental controls and content filters on school computers help to:',
  options:['block inappropriate online content','improve the quality of the graphics','let students install any software','speed up the internet connection'],
  answer:'block inappropriate online content', hint:'Filtering keeps content safe.',
  explanation:'Content filters block websites categorised as inappropriate, protecting students from exposure to harmful material while using school resources.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-116', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'A footrest in an ergonomic workstation setup is used by:',
  options:['users whose feet do not reach the floor','users who prefer to stand at the computer','users who want a higher monitor position','users who want less glare on the screen'],
  answer:'users whose feet do not reach the floor', hint:'Feet must be supported.',
  explanation:'If a chair adjusted to the correct height for the desk leaves the user\'s feet dangling, a footrest supports them in the correct position.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-117', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Clear exit routes and emergency exits in a computer laboratory must always be:',
  options:['kept completely unobstructed','locked during a class period','used to store computer boxes','marked with a red cross sign'],
  answer:'kept completely unobstructed', hint:'Blocked exits are dangerous and illegal.',
  explanation:'Emergency regulations require clear, unobstructed exit routes; cluttered aisles or locked emergency doors can prevent safe evacuation during a fire or other emergency.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-118', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Students should be taught to recognise phishing emails and suspicious links to:',
  options:['protect data and block malware','improve their programming skills','make them much faster typists','teach them to build websites'],
  answer:'protect data and block malware', hint:'Awareness prevents phishing attacks.',
  explanation:'Phishing emails trick users into revealing credentials or clicking malicious links; educating students to recognise the signs prevents data breaches and malware infections.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-119', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Proper disposal of old computer equipment (e-waste) is important because:',
  options:['devices hold toxic heavy metals','old computers make door stops','the bin is the fastest method','e-waste disposal makes power'],
  answer:'devices hold toxic heavy metals', hint:'Electronics contain hazardous substances.',
  explanation:'Computers and monitors contain heavy metals and other hazardous materials; responsible recycling through certified e-waste facilities prevents these from entering soil and water.' }));

})();
