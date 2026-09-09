'use strict';
(function () {

// ══════════════════════════════════════════════════════════════════════
// DATABASES section: g9ict-dhv-001 to g9ict-dhv-055
// chapterId: 'g9ict-databases'
// ══════════════════════════════════════════════════════════════════════

// ── db_structure: dhv-001 to dhv-011 ─────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-001', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'A database is best described as:',
  options:['an organised collection of related data stored so it can be easily accessed, managed and updated','a single spreadsheet containing one table','a word-processed document with a table','a program that draws charts from numbers'],
  answer:'an organised collection of related data stored so it can be easily accessed, managed and updated', hint:'Think of a school register: many records, organised.',
  explanation:'A database stores structured data in a way that makes it easy to search, retrieve and update.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-002', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'In a database, a field is:',
  options:['a single item of data stored for each record, such as a surname or date of birth','a complete set of data about one person or thing','a collection of all the records in the database','a query used to search the database'],
  answer:'a single item of data stored for each record, such as a surname or date of birth', hint:'One column heading = one field.',
  explanation:'A field is the smallest unit of data — one category of information, like First Name or Phone Number.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-003', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'In a database, a record is:',
  options:['a complete set of related fields for one entity, such as all the details of one student','a single item of data','a query result','a list of field names'],
  answer:'a complete set of related fields for one entity, such as all the details of one student', hint:'One row in the table = one record.',
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
  options:['one table only, with no links to other tables','multiple linked tables','a series of encrypted files','a spreadsheet with multiple sheets'],
  answer:'one table only, with no links to other tables', hint:'Flat = one level, one table.',
  explanation:'A flat-file database is a single table; it cannot handle complex relationships and can lead to data redundancy.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-007', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'A relational database stores data in:',
  options:['multiple related tables linked by key fields','one large table','a series of plain text files','a single form that users fill in'],
  answer:'multiple related tables linked by key fields', hint:'Related tables = relational.',
  explanation:'A relational database organises data into separate tables, each representing one entity type, linked by key fields to avoid duplication.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-008', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'Data redundancy in a flat-file database means:',
  options:['the same data is stored more than once, wasting space and risking inconsistency','all data is backed up twice','the database uses two primary keys','records are sorted in alphabetical order'],
  answer:'the same data is stored more than once, wasting space and risking inconsistency', hint:'Repeating data unnecessarily.',
  explanation:'Redundancy occurs when the same information appears in multiple records; updating one copy without the others causes inconsistency.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-009', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'A foreign key in a database table is a field that:',
  options:['matches the primary key of another table, creating a link between the two tables','identifies each record uniquely within its own table','stores data from another country','is always left blank'],
  answer:'matches the primary key of another table, creating a link between the two tables', hint:'It is a primary key "borrowed" from another table.',
  explanation:'A foreign key references the primary key of a related table, enforcing the link between records in different tables.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-010', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'Data validation in a database ensures that:',
  options:['only data of the correct type, range or format can be entered into a field','only the database administrator can edit records','all records are sorted before they are saved','data is automatically backed up every hour'],
  answer:'only data of the correct type, range or format can be entered into a field', hint:'It checks data when it is entered.',
  explanation:'Validation rules (data type, range, format, presence) prevent incorrect data from being stored by rejecting entries that fail the checks.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-011', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'The data type "Text" (or "Short Text") in a database field is used for:',
  options:['any combination of letters, numbers and symbols that will not be used in calculations','values that will be added or multiplied','dates and times','yes/no values only'],
  answer:'any combination of letters, numbers and symbols that will not be used in calculations', hint:'Names and codes are text — not calculated.',
  explanation:'Text fields store alphanumeric data. A phone number stored as Text cannot be averaged, which is correct — you never add phone numbers together.' }));

// ── db_tables: dhv-012 to dhv-022 ────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-012', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'In a database table, columns represent:',
  options:['fields (the categories of data stored)','records (individual entries)','queries (search criteria)','forms (data-entry screens)'],
  answer:'fields (the categories of data stored)', hint:'Each column heading is one field name.',
  explanation:'Each column in a table is one field, defining a category of information (e.g., Surname, Email, Date of Birth).' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-013', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'In a database table, rows represent:',
  options:['records (individual entries about one entity)','fields (categories of data)','queries','reports'],
  answer:'records (individual entries about one entity)', hint:'Each row describes one person, product or event.',
  explanation:'Each row in a table is one record — all the information collected about a single instance of the entity.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-014', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'A database field with the data type "Number" should be used when:',
  options:['the values will be used in calculations such as addition or averaging','the values are names or codes','the values are dates','the values are either Yes or No'],
  answer:'the values will be used in calculations such as addition or averaging', hint:'Only use Number if you plan to calculate with it.',
  explanation:'Number data type stores numerical values that can be used in arithmetic. Codes like student numbers are stored as Text even though they look like numbers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-015', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'A "Date/Time" data type in a database is used to:',
  options:['store dates and times so they can be sorted chronologically and used in date calculations','store telephone numbers','store yes/no values','store images'],
  answer:'store dates and times so they can be sorted chronologically and used in date calculations', hint:'Dates need their own type to be sorted correctly.',
  explanation:'A Date/Time field stores dates and times in a standard format, enabling correct sorting and age/duration calculations.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-016', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'A "Yes/No" (or Boolean) data type is used for:',
  options:['fields that can only be True/False, Yes/No, or 1/0','fields storing large amounts of text','fields containing currency values','fields storing pictures'],
  answer:'fields that can only be True/False, Yes/No, or 1/0', hint:'Two possible values only.',
  explanation:'A Boolean field stores a binary value — True or False — used for things like "Is the subscription active?" or "Is the student a prefect?".' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-017', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'Adding a new field to an existing database table means:',
  options:['adding a new column to the table structure','adding a new row of data','creating a new table','deleting an existing record'],
  answer:'adding a new column to the table structure', hint:'A field is a column.',
  explanation:'Adding a field extends the table structure with a new category of data, adding a column that appears in every existing and future record.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-018', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'Sorting records in a database by surname in ascending (A–Z) order will:',
  options:['arrange the records alphabetically from A to Z by surname','arrange the records from newest to oldest','remove any records without a surname','delete duplicate records'],
  answer:'arrange the records alphabetically from A to Z by surname', hint:'Ascending = A to Z for text.',
  explanation:'Sorting text fields in ascending order arranges records alphabetically A–Z; descending would be Z–A.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-019', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'Which data type should be used for the "Price" field in a products table?',
  options:['Currency','Text','Yes/No','Date/Time'],
  answer:'Currency', hint:'Prices are money values.',
  explanation:'A Currency data type stores monetary values and formats them with the appropriate currency symbol and decimal places.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-020', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'An "AutoNumber" (or AutoIncrement) field is useful as a primary key because:',
  options:['the database automatically assigns a unique number to each new record','it stores the number of records in the table','the user can choose any number they like','it restricts the table to 100 records'],
  answer:'the database automatically assigns a unique number to each new record', hint:'It is generated automatically.',
  explanation:'An AutoNumber primary key is generated by the database for each new record, ensuring uniqueness without requiring the user to enter a value.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-021', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'A lookup field in a database:',
  options:['lets the user pick a value from a predefined list, reducing data-entry errors','automatically calculates the average of the field','searches the internet for data to fill the field','copies data from another table automatically'],
  answer:'lets the user pick a value from a predefined list, reducing data-entry errors', hint:'A dropdown list in a field.',
  explanation:'A lookup field presents a dropdown list of allowed values, ensuring consistency and reducing the chance of typing errors.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-022', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'A relationship between two database tables is typically created by:',
  options:['matching the primary key of one table to a foreign key in the other table','sorting both tables in alphabetical order','copying all the records from one table into the other','deleting one of the tables'],
  answer:'matching the primary key of one table to a foreign key in the other table', hint:'Primary key meets foreign key.',
  explanation:'A relationship links two tables through a primary key–foreign key pair, allowing data from both tables to be combined in queries and reports.' }));

// ── data_entry: dhv-023 to dhv-033 ───────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-023', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'A data entry form in a database is used to:',
  options:['provide a user-friendly interface for entering and viewing records one at a time','print a summary report of all records','search the database with complex criteria','design the table structure'],
  answer:'provide a user-friendly interface for entering and viewing records one at a time', hint:'It is the on-screen version of a paper form.',
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
  options:['checks that data was entered correctly as intended, for example by comparing two entries of the same data','checks that the data is the correct type or range','automatically corrects spelling mistakes','prevents duplicate records'],
  answer:'checks that data was entered correctly as intended, for example by comparing two entries of the same data', hint:'Typing the email address twice to confirm is verification.',
  explanation:'Verification confirms that entered data matches what was intended (e.g., re-entering a password); validation checks that the data meets a set of rules.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-027', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'Which of the following is an example of a format check?',
  options:['Rejecting a date entered as "30-13-2025" because the month value (13) is invalid','Rejecting a blank surname field','Rejecting a score of 150 in a field limited to 0–100','Rejecting a name containing a number'],
  answer:'Rejecting a date entered as "30-13-2025" because the month value (13) is invalid', hint:'The format must match the expected pattern.',
  explanation:'A format check ensures the data matches the required pattern — for dates, the month must be 1–12; 13 violates the format.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-028', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'Importing data into a database from a CSV file means:',
  options:['bringing data from a comma-separated text file into a database table automatically','exporting the database as a printed report','creating a new form for data entry','copying one table to another within the same database'],
  answer:'bringing data from a comma-separated text file into a database table automatically', hint:'CSV = Comma-Separated Values — a common data exchange format.',
  explanation:'A CSV import reads each row of the text file and creates a corresponding database record, allowing bulk data entry.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-029', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'The "Undo" function in a database is used to:',
  options:['reverse the last action, such as a mistaken data entry','delete all records','sort the table','run a query'],
  answer:'reverse the last action, such as a mistaken data entry', hint:'It cancels the most recent change.',
  explanation:'Undo reverts the last action performed, allowing users to correct mistakes without manually re-entering old data.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-030', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'A list-box or drop-down field on a data entry form helps to:',
  options:['ensure consistent, valid data by restricting choices to a predefined list','allow the user to enter any text they wish','automatically calculate totals','send the record by email'],
  answer:'ensure consistent, valid data by restricting choices to a predefined list', hint:'Choose from a list, not free text.',
  explanation:'Drop-down lists limit the user to approved values, eliminating spelling variations and ensuring data consistency.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-031', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'A check-digit is a type of validation that:',
  options:['adds an extra calculated digit to a code and recalculates it on entry to detect transcription errors','checks that the data type is correct','ensures the field is not blank','limits the length of text in a field'],
  answer:'adds an extra calculated digit to a code and recalculates it on entry to detect transcription errors', hint:'Barcodes and ISBNs use check digits.',
  explanation:'A check digit is computed from the other digits in a code; when the code is entered, the computer recalculates and compares — a mismatch reveals an error.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-032', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'Why should a "Phone Number" field be stored as Text rather than Number in a database?',
  options:['Phone numbers may start with a leading zero that would be lost if stored as a number, and they are never used in calculations','Phone numbers contain letters','Phone numbers must be sorted numerically','Phone numbers are always negative'],
  answer:'Phone numbers may start with a leading zero that would be lost if stored as a number, and they are never used in calculations', hint:'You never add two phone numbers together.',
  explanation:'Storing a phone number as a Number field removes any leading zeros and allows arithmetic, which is meaningless for phone numbers. Text is correct.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-033', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:2,
  question:'Duplicate records in a database can be prevented by:',
  options:['setting the primary key field so that no two records can share the same value','sorting all records alphabetically before saving','only allowing one user to access the database at a time','removing all fields that might be duplicated'],
  answer:'setting the primary key field so that no two records can share the same value', hint:'A primary key is always unique.',
  explanation:'The primary key uniqueness constraint prevents a second record from being entered with the same key value, rejecting true duplicates.' }));

// ── queries: dhv-034 to dhv-044 ──────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-034', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'A database query is used to:',
  options:['search for and retrieve records that match specific criteria','design the layout of a data entry form','print a formatted report of all records','back up the database'],
  answer:'search for and retrieve records that match specific criteria', hint:'Ask the database a question.',
  explanation:'A query lets the user specify criteria and retrieves only the matching records, hiding the rest.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-035', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'In Microsoft Access, a QBE (Query By Example) grid allows users to:',
  options:['design a query by filling in criteria rows for each field without writing SQL code','draw the table structure visually','import data from a spreadsheet','print mailing labels'],
  answer:'design a query by filling in criteria rows for each field without writing SQL code', hint:'QBE is a visual approach to querying.',
  explanation:'The QBE grid in Access lets users choose fields and type criteria into a visual grid; the application generates the underlying SQL automatically.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-036', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'In a database query, the criterion >"50" in a "Mark" field would return records where:',
  options:['the mark is greater than 50','the mark is exactly 50','the mark is less than 50','the mark field is empty'],
  answer:'the mark is greater than 50', hint:'The > operator means "greater than".',
  explanation:'The > operator selects records where the field value exceeds the specified number — here, any mark above 50.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-037', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'The query criterion "Like *son*" applied to a "Surname" field would return:',
  options:['all records where the surname contains "son" anywhere in the word','only records where the surname is exactly "son"','records where the surname starts with "son"','records where the surname ends with "son"'],
  answer:'all records where the surname contains "son" anywhere in the word', hint:'The asterisk (*) is a wildcard meaning "any characters".',
  explanation:'The wildcard * means zero or more characters; *son* matches any surname containing "son" — e.g., Jackson, Sonia, Wilson.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-038', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'Using AND between two criteria in a query means:',
  options:['only records that satisfy BOTH criteria are returned','records that satisfy either criterion are returned','all records are returned regardless of the criteria','records matching neither criterion are returned'],
  answer:'only records that satisfy BOTH criteria are returned', hint:'AND = both must be true.',
  explanation:'An AND query is more restrictive — a record must match criterion A AND criterion B to be included in the results.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-039', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'Using OR between two criteria in a query means:',
  options:['records that satisfy at least one of the criteria are returned','only records satisfying both criteria are returned','no records are returned','all records are returned'],
  answer:'records that satisfy at least one of the criteria are returned', hint:'OR = either is enough.',
  explanation:'An OR query is less restrictive — a record matching criterion A OR criterion B (or both) is included.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-040', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'A query that shows only selected fields (columns) rather than all fields is called a:',
  options:['projection','selection','join','sort'],
  answer:'projection', hint:'Choosing which columns to show.',
  explanation:'A projection picks specific fields to display in the query result, hiding others that are not relevant.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-041', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'An action query in a database can:',
  options:['update, delete or append records based on criteria, making permanent changes to the data','only display records without changing them','create a printed report','change the font used in forms'],
  answer:'update, delete or append records based on criteria, making permanent changes to the data', hint:'Action queries change the data, not just display it.',
  explanation:'Unlike a select query (which only reads data), an action query modifies records — for example, updating all prices by 10%, or deleting expired records.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-042', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'In a query, the "Sort" row is used to:',
  options:['specify whether the results should be ordered ascending or descending by a particular field','filter records by a criterion','choose which fields to display','add a calculated field'],
  answer:'specify whether the results should be ordered ascending or descending by a particular field', hint:'It determines the order of results.',
  explanation:'The Sort row in the QBE grid lets you set the field to sort by and the order (Ascending A–Z or Descending Z–A) for the query results.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-043', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'A query that draws data from two or more related tables is called a:',
  options:['multi-table query (or join query)','flat-file query','single-table query','data-entry form'],
  answer:'multi-table query (or join query)', hint:'It joins tables together.',
  explanation:'A join query links two or more tables through a shared key field, allowing data from multiple tables to be combined in the results.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-044', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'The criterion "Between 1 And 5" applied to an "Age" field would return records where:',
  options:['the age is 1, 2, 3, 4, or 5','the age is exactly between 1 and 5 (i.e., 3)','the age is greater than 5','the age is less than 1'],
  answer:'the age is 1, 2, 3, 4, or 5', hint:'Between is inclusive of both boundary values.',
  explanation:'The BETWEEN operator includes both boundary values, so Between 1 And 5 returns records with age values of 1, 2, 3, 4 and 5.' }));

// ── forms_reports: dhv-045 to dhv-055 ────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-045', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'The main purpose of a database report is to:',
  options:['present selected data from the database in a formatted, printable layout','enter new records into the database','search the database using criteria','link two tables together'],
  answer:'present selected data from the database in a formatted, printable layout', hint:'Reports are for presenting, not editing.',
  explanation:'A report formats query results or table data for printing or display, often grouping and summarising data.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-046', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'Grouping in a database report means:',
  options:['organising records with the same value in a field together, and optionally showing a subtotal for each group','sorting all records alphabetically','adding a chart to the report','deleting records from the database'],
  answer:'organising records with the same value in a field together, and optionally showing a subtotal for each group', hint:'Group by Department shows all records in each department together.',
  explanation:'Grouping in a report collects records sharing a common field value, making it easy to see subtotals (e.g., total sales per department).' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-047', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'A report based on a query will show:',
  options:['only the records that matched the query criteria, formatted for printing','all records in the database regardless of the criteria','only the first ten records','only the record with the highest value'],
  answer:'only the records that matched the query criteria, formatted for printing', hint:'The report shows whatever the underlying query returned.',
  explanation:'A report presents the results of its underlying query or table; basing it on a query applies filter criteria before the data is formatted.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-048', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'A form in a database is different from a report because a form:',
  options:['is used to enter and edit data, while a report is used to display and print data','is only used for printing','cannot show data from the database','can only be created by an administrator'],
  answer:'is used to enter and edit data, while a report is used to display and print data', hint:'Forms are for input; reports are for output.',
  explanation:'Forms provide an interactive screen for data entry and editing; reports provide a formatted, non-editable view of data for output.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-049', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'A subform in a database is:',
  options:['a form embedded inside another form, used to show related records from a linked table','a form that is much smaller than the main form','a read-only version of the main form','a form that connects to the internet'],
  answer:'a form embedded inside another form, used to show related records from a linked table', hint:'It appears inside the main form.',
  explanation:'A subform typically shows the "many" side of a one-to-many relationship — for example, a customer form with a subform listing all their orders.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-050', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'Adding a total (Sum) at the footer of a report group allows:',
  options:['the report to display the sum of a numeric field for all records in that group','the report to print the total number of pages','the report to sort records descending','the report to be exported to a spreadsheet'],
  answer:'the report to display the sum of a numeric field for all records in that group', hint:'A subtotal in the group footer.',
  explanation:'A Sum aggregate function in a group footer adds up the numeric field values for all records in that group, displaying a subtotal.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-051', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'The Report Wizard in Access helps users to:',
  options:['create a formatted report by following step-by-step prompts to choose fields, grouping and layout','write SQL queries','design a database table structure','import data from a CSV file'],
  answer:'create a formatted report by following step-by-step prompts to choose fields, grouping and layout', hint:'Wizard = guided, step-by-step.',
  explanation:'The Report Wizard asks a series of questions about which fields to include, how to group and sort, and which layout to use, then generates the report automatically.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-052', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'Conditional formatting in a report changes:',
  options:['the appearance of a field value (e.g., colour, bold) automatically based on the value, such as highlighting failing grades in red','the font size of every field in the report','the order in which records are printed','the primary key of the table'],
  answer:'the appearance of a field value (e.g., colour, bold) automatically based on the value, such as highlighting failing grades in red', hint:'Format depends on the value.',
  explanation:'Conditional formatting applies different fonts, colours or styles to field values that meet a specified condition, drawing attention to important data.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-053', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'A mailing-label report is a special report layout used to:',
  options:['print address labels, one per record, in a format that fits on label sheets','send emails to all contacts in the database','list all records in a single column','show a pivot chart of sales data'],
  answer:'print address labels, one per record, in a format that fits on label sheets', hint:'Stickers for envelopes.',
  explanation:'A mailing-label report formats address data so each record prints on one peel-and-stick label, arranged in columns to match commercial label sheets.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-054', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'Exporting a database report as a PDF file allows:',
  options:['the report to be shared and printed by anyone without needing the database software','the report layout to be changed by recipients','the data to be imported back into the database','the data to be automatically updated when the database changes'],
  answer:'the report to be shared and printed by anyone without needing the database software', hint:'PDF is a universal, read-only format.',
  explanation:'PDF preserves the report layout and can be opened by any device with a PDF reader, making it ideal for sharing final reports.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-055', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'Which section of a database report typically displays the column headings?',
  options:['The Page Header or Report Header','The Detail section','The Page Footer','The Group Footer'],
  answer:'The Page Header or Report Header', hint:'Headings appear at the top.',
  explanation:'The Page Header (or Report Header) section appears at the top of each page (or once at the top of the report), displaying field labels and titles.' }));

// ══════════════════════════════════════════════════════════════════════
// HEALTH & SAFETY section: g9ict-dhv-056 to g9ict-dhv-119
// chapterId: 'g9ict-health-safety'
// ══════════════════════════════════════════════════════════════════════

// ── lab_guidelines: dhv-056 to dhv-068 ───────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-056', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Before using the school computer laboratory, students should:',
  options:['wait for the teacher\'s permission, sign in if required, and check that their work area is clean and safe','run straight to the nearest computer and switch it on immediately','bring food and drinks to eat while working','leave their bags across the pathway between desks'],
  answer:'wait for the teacher\'s permission, sign in if required, and check that their work area is clean and safe', hint:'Lab rules must be followed before starting.',
  explanation:'Orderly entry and a safe, tidy workspace protect equipment and prevent accidents in the lab.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-057', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Food and drinks are not allowed in a computer laboratory because:',
  options:['spills can damage keyboards, circuit boards and other components, and crumbs attract pests','the smell disturbs other users','the rule is set only to stop students enjoying themselves','computers work better when the room smells of food'],
  answer:'spills can damage keyboards, circuit boards and other components, and crumbs attract pests', hint:'Liquid and electronics do not mix.',
  explanation:'A liquid spill on a keyboard or into a computer case can short-circuit components and destroy the equipment.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-058', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Students should log off or shut down the computer when they finish using it because:',
  options:['it protects their files and the school\'s data from unauthorised access and saves energy','the computer will break if left on overnight','it is faster to start a computer that was shut down correctly','it allows the teacher to delete all student work'],
  answer:'it protects their files and the school\'s data from unauthorised access and saves energy', hint:'Leaving a session open is a security risk.',
  explanation:'Logging off ends the user\'s session, preventing others from accessing their files; shutting down also conserves electricity.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-059', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'In a computer laboratory, power cables should be:',
  options:['kept tidy and out of walkways to prevent people from tripping over them','left loose on the floor to allow air circulation','hidden inside the computer case','removed when not in use and stored in a drawer'],
  answer:'kept tidy and out of walkways to prevent people from tripping over them', hint:'Trailing cables are a trip hazard.',
  explanation:'Cables on the floor in busy areas are a serious tripping hazard that can injure users and pull equipment off desks.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-060', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'If a student notices a damaged power cable on a computer in the lab, they should:',
  options:['report it immediately to the teacher and not use that computer','repair the cable themselves using tape','continue using the computer and hope nothing happens','unplug all computers in the room'],
  answer:'report it immediately to the teacher and not use that computer', hint:'Damaged electrical cables are dangerous.',
  explanation:'A frayed or damaged cable is an electrocution and fire risk; only a qualified person should carry out repairs.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-061', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Students should never touch the back of a desktop computer or the inside of the case because:',
  options:['some components carry dangerous voltages even when the computer is switched off, and components can be damaged by static electricity','it will make the computer run faster','it is impolite to touch school property','the inside is too hot to touch'],
  answer:'some components carry dangerous voltages even when the computer is switched off, and components can be damaged by static electricity', hint:'Danger from electricity and static.',
  explanation:'Components like the power supply unit retain charge after being switched off. Static from your hands can also destroy sensitive chips.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-062', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'The correct procedure when there is a fire in the computer laboratory is to:',
  options:['alert everyone, leave the room calmly without taking any equipment, and raise the fire alarm','grab the nearest computer and carry it out first','use water to put out any burning electrical equipment','hide under the desk until the fire goes out'],
  answer:'alert everyone, leave the room calmly without taking any equipment, and raise the fire alarm', hint:'People first, always.',
  explanation:'In a fire emergency, the priority is to evacuate all people safely; never use water on electrical fires — use a CO₂ extinguisher if trained.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-063', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Software in a school lab should only be installed by:',
  options:['an authorised technician or network administrator','any student who knows how to do it','the student whose computer it is','any teacher who requests it'],
  answer:'an authorised technician or network administrator', hint:'Installing software requires admin rights.',
  explanation:'Unauthorised software installations can introduce malware, violate licensing and disrupt the network; only authorised staff should perform them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-064', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Students should not share their network login password because:',
  options:['another person could access their files, and any misuse would be traced back to the original account holder','passwords are too long to remember anyway','the network administrator already knows all passwords','sharing passwords makes the network faster'],
  answer:'another person could access their files, and any misuse would be traced back to the original account holder', hint:'Your account, your responsibility.',
  explanation:'A shared password means a third party can access personal files and carry out actions that will be logged under your name.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-065', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Bags and personal belongings should be stored under the desk or at the side of the room in a computer lab because:',
  options:['bags in the aisle are a tripping hazard and can block emergency exits','the computers work better when the desk is tidy','bags contain magnetic materials that damage hard drives','the teacher needs to inspect all bags'],
  answer:'bags in the aisle are a tripping hazard and can block emergency exits', hint:'Clear aisles for safety.',
  explanation:'Bags and coats on the floor between desks create a tripping hazard and can impede quick evacuation in an emergency.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-066', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Students should save their work regularly while in the computer lab because:',
  options:['unexpected power cuts or program crashes can lose unsaved work permanently','saving slows the computer down','the network automatically deletes unsaved files','saving sends a copy to the teacher automatically'],
  answer:'unexpected power cuts or program crashes can lose unsaved work permanently', hint:'Unsaved work exists only in RAM.',
  explanation:'RAM is volatile — a power failure or crash erases everything in memory. Frequent saves to disk protect against data loss.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-067', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'In a computer laboratory, students should use the equipment only for:',
  options:['the educational tasks set by the teacher, in accordance with the school\'s acceptable use policy','any personal purpose, including gaming and social media, if they finish early','downloading software for use at home','connecting personal USB drives without scanning them for viruses'],
  answer:'the educational tasks set by the teacher, in accordance with the school\'s acceptable use policy', hint:'School equipment is for school use.',
  explanation:'Acceptable use policies restrict school computers to educational activities, protecting resources and ensuring equitable access for all students.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-068', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Before plugging a USB drive from home into a school computer, students should:',
  options:['have it scanned for viruses by the network administrator or use the lab\'s up-to-date antivirus software','plug it in immediately without any checks','format the USB drive to remove all files','break the USB drive to prevent any risk'],
  answer:'have it scanned for viruses by the network administrator or use the lab\'s up-to-date antivirus software', hint:'Foreign drives can carry malware.',
  explanation:'A USB drive used on other computers may carry malware; scanning it before use prevents infection spreading to the school network.' }));

// ── safety_precautions: dhv-069 to dhv-079 ───────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-069', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'Electrical equipment in the computer lab should be connected to:',
  options:['properly earthed, grounded sockets with the correct voltage rating','any available socket without checking the voltage','extension leads that are coiled up while in use','the mains supply without using a plug'],
  answer:'properly earthed, grounded sockets with the correct voltage rating', hint:'Earthing and correct voltage prevent shocks and fires.',
  explanation:'Earthed sockets and the correct voltage protect against electric shock and prevent overloading that could start a fire.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-070', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'An anti-static wrist strap is worn when handling computer components to:',
  options:['safely discharge static electricity from the person\'s body to earth, preventing damage to sensitive chips','protect the wrist from cuts on sharp edges','keep the wrist warm','make the person look professional'],
  answer:'safely discharge static electricity from the person\'s body to earth, preventing damage to sensitive chips', hint:'Static can destroy electronic components.',
  explanation:'A wrist strap bonds the technician to the earth, equalising charge and preventing the discharge of built-up static into sensitive components.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-071', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'Extension leads should not be overloaded in a computer lab because:',
  options:['too many appliances on one lead can exceed its current rating, causing it to overheat and potentially start a fire','computers work faster when connected directly to the wall','extension leads are only safe in offices, not schools','overloading increases internet speed'],
  answer:'too many appliances on one lead can exceed its current rating, causing it to overheat and potentially start a fire', hint:'Too much current = heat.',
  explanation:'Each extension lead is rated for a maximum current; exceeding this causes overheating of the cable insulation, which can ignite.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-072', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'A Residual Current Device (RCD) in the lab is there to:',
  options:['cut the power instantly if a fault is detected, protecting users from electric shock','speed up the internet connection','charge laptop batteries more quickly','record which computers are switched on'],
  answer:'cut the power instantly if a fault is detected, protecting users from electric shock', hint:'It detects earth faults and trips the circuit.',
  explanation:'An RCD monitors the current in a circuit and trips the supply within milliseconds if it detects a leakage to earth, preventing a potentially fatal shock.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-073', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'Monitors and towers should not be placed near water sources such as open windows during rain because:',
  options:['water conducts electricity and can cause a short circuit or electrocution','computers are afraid of water','water improves screen brightness','rain creates a magnetic field that erases hard drives'],
  answer:'water conducts electricity and can cause a short circuit or electrocution', hint:'Water and electricity are a deadly combination.',
  explanation:'Water is a conductor; if it enters a powered device it can short-circuit it and electrocute the user.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-074', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'A surge protector (or UPS — Uninterruptible Power Supply) protects computers from:',
  options:['sudden voltage spikes and power cuts that can damage hardware and corrupt data','viruses and malware','excessive heat from the CPU','unauthorised access to the network'],
  answer:'sudden voltage spikes and power cuts that can damage hardware and corrupt data', hint:'It keeps the power supply stable.',
  explanation:'A UPS provides clean, regulated power and battery backup, preventing voltage spikes and giving users time to save and shut down gracefully during a power cut.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-075', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'The correct way to clean a computer screen is with:',
  options:['a soft, lint-free cloth, slightly dampened with a screen-cleaning solution','a wet cloth soaked in tap water','household cleaning spray and newspaper','a hard brush to scrub off dust'],
  answer:'a soft, lint-free cloth, slightly dampened with a screen-cleaning solution', hint:'Gentle cleaning only.',
  explanation:'Harsh chemicals can damage anti-glare coatings; excess liquid near electronic components is dangerous; a microfibre cloth and screen cleaner are safest.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-076', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'When carrying a laptop, students should:',
  options:['hold it closed with both hands, keep the lid closed, and never hold it by the screen','carry it by the screen in one hand','swing it by the charging cable','carry it open so they can see what is on the screen'],
  answer:'hold it closed with both hands, keep the lid closed, and never hold it by the screen', hint:'Screens are fragile.',
  explanation:'The screen is the most fragile part of a laptop; holding it by the screen can crack the panel. Two hands and a closed lid protect the device.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-077', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'Computers should not be placed in direct sunlight because:',
  options:['overheating can damage the processor, battery and other components, and screen glare makes it hard to see','sunlight improves their processing speed','screen colours look better in bright light','the computer will charge its battery from solar energy'],
  answer:'overheating can damage the processor, battery and other components, and screen glare makes it hard to see', hint:'Heat is a computer\'s enemy.',
  explanation:'Sustained high temperatures shorten the life of processors, RAM and batteries; screen glare also makes the display unusable.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-078', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'Students should wash their hands before using shared keyboards because:',
  options:['greasy or dirty hands can damage keyboard surfaces and spread germs to the next user','keyboards charge faster when hands are clean','the keyboard detects fingerprints to log in','clean hands type faster'],
  answer:'greasy or dirty hands can damage keyboard surfaces and spread germs to the next user', hint:'Hygiene and equipment care.',
  explanation:'Oils and dirt from hands build up on keys and can degrade the legends; shared keyboards are also a vector for spreading illness.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-079', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:2,
  question:'In the event of an electric shock to a person in the lab, the first action should be to:',
  options:['switch off the power at the mains before touching the victim, then call for help','pull the victim away from the equipment immediately using your hands','pour water on the equipment to extinguish any sparks','leave the room and wait for help to arrive'],
  answer:'switch off the power at the mains before touching the victim, then call for help', hint:'Never touch someone being electrocuted with the power still on.',
  explanation:'Touching a person still in contact with live electricity will electrocute the rescuer too; cutting the power first makes rescue safe.' }));

// ── equipment_care: dhv-080 to dhv-090 ───────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-080', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'To keep a desktop computer cool and prevent overheating, you should:',
  options:['ensure ventilation slots are not blocked and the room is adequately ventilated','put the computer in a sealed cupboard','cover the computer with a blanket when not in use','run as many programs as possible to keep the fan working'],
  answer:'ensure ventilation slots are not blocked and the room is adequately ventilated', hint:'Airflow keeps components cool.',
  explanation:'Processors, GPUs and PSUs produce heat; clear ventilation slots and adequate room airflow allow the cooling fans to dissipate heat effectively.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-081', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Compressed air cans are used for computer maintenance to:',
  options:['blow dust out of keyboards, fans and case vents','lubricate moving parts','cool the CPU during operation','recharge the battery'],
  answer:'blow dust out of keyboards, fans and case vents', hint:'Blow out the dust.',
  explanation:'Compressed air safely dislodges dust from components without contact, preventing heat build-up caused by dust-clogged vents and fans.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-082', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Magnets should be kept away from traditional hard disk drives (HDDs) because:',
  options:['strong magnetic fields can corrupt or erase the data stored on the magnetic platters','magnets slow down the read/write heads','magnets increase power consumption','magnets cause the screen to flicker'],
  answer:'strong magnetic fields can corrupt or erase the data stored on the magnetic platters', hint:'HDD data is stored magnetically.',
  explanation:'HDDs record data by magnetising tiny regions of their platters; an external magnetic field can randomly flip those regions, corrupting or erasing data.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-083', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Why should computers be shut down properly rather than just switching off the power at the wall?',
  options:['a proper shutdown closes files correctly, writes any cached data to disk and prevents file system corruption','a proper shutdown charges the battery faster','switching off at the wall uses less electricity','a proper shutdown updates the antivirus automatically'],
  answer:'a proper shutdown closes files correctly, writes any cached data to disk and prevents file system corruption', hint:'Abrupt power loss can corrupt the file system.',
  explanation:'The operating system needs time to write buffered data, close open files and update file system structures; cutting power mid-process can corrupt data.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-084', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'A protective screen cover or filter is used on a monitor to:',
  options:['reduce glare and protect the screen surface from dust and scratches','increase the screen\'s brightness','make the screen waterproof','improve the graphics card\'s performance'],
  answer:'reduce glare and protect the screen surface from dust and scratches', hint:'Protection and comfort.',
  explanation:'Screen protectors reduce reflections that cause eye strain and add a physical barrier against dust and accidental scratching.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-085', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Regularly defragmenting a traditional HDD (hard disk drive) is done to:',
  options:['reorganise fragmented files so they are stored contiguously, improving access speed','remove viruses from the drive','increase the physical storage capacity','cool the drive down'],
  answer:'reorganise fragmented files so they are stored contiguously, improving access speed', hint:'Fragmented files make the read head travel further.',
  explanation:'Over time, files become scattered across the disk; defragmentation rearranges them into contiguous blocks, reducing the distance the read/write head must travel.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-086', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Portable storage devices such as USB drives should be safely ejected before being physically removed from the computer because:',
  options:['the operating system may still be writing data to the drive, and unsafe removal can corrupt files','the USB port breaks if the drive is removed without ejecting','ejecting charges the drive','the drive needs to cool down before removal'],
  answer:'the operating system may still be writing data to the drive, and unsafe removal can corrupt files', hint:'The OS may have buffered writes pending.',
  explanation:'The OS caches writes; a safe eject flushes the cache to the drive. Removing the drive with pending writes leaves the file system in an inconsistent state.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-087', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Printers in a lab should be maintained by:',
  options:['replacing ink or toner when low, clearing paper jams carefully and keeping them dust-free','hitting them when they jam','leaving them running 24 hours a day regardless of use','pouring water into the paper tray to moisten the paper'],
  answer:'replacing ink or toner when low, clearing paper jams carefully and keeping them dust-free', hint:'Regular, gentle maintenance.',
  explanation:'Correct maintenance — replacing consumables, carefully clearing jams and keeping the device clean — extends printer life and print quality.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-088', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'To protect a laptop\'s battery health, users should:',
  options:['avoid regularly allowing the battery to completely drain to 0% or leaving it permanently at 100% while always plugged in','charge it for exactly two hours every day','only ever use the laptop plugged into the mains','remove the battery when not in use every day'],
  answer:'avoid regularly allowing the battery to completely drain to 0% or leaving it permanently at 100% while always plugged in', hint:'Extremes of charge level stress lithium batteries.',
  explanation:'Lithium-ion batteries degrade fastest at the extremes; keeping charge between about 20% and 80% extends battery lifespan significantly.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-089', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Network cables should not be bent sharply or run under heavy furniture because:',
  options:['sharp bends and physical pressure damage the internal conductors, causing intermittent faults or complete failures','cables work faster when they are straight','bent cables use more electricity','cables must always be in plain sight for safety'],
  answer:'sharp bends and physical pressure damage the internal conductors, causing intermittent faults or complete failures', hint:'Cables have bend-radius limits.',
  explanation:'The copper conductors inside a cable can break or make poor contact if bent beyond their minimum bend radius or crushed, causing network faults.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-090', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:2,
  question:'Which type of fire extinguisher should be used on an electrical fire in the computer lab?',
  options:['CO₂ (carbon dioxide) extinguisher','Water extinguisher','Foam extinguisher','Dry powder extinguisher (only if CO₂ is unavailable — it damages equipment)'],
  answer:'CO₂ (carbon dioxide) extinguisher', hint:'CO₂ is safe on electrical fires.',
  explanation:'CO₂ extinguishers discharge non-conductive gas, smothering the fire without damaging electrical equipment or leaving a messy residue.' }));

// ── health_hazards: dhv-091 to dhv-104 ───────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-091', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'RSI (Repetitive Strain Injury) in computer users is caused by:',
  options:['performing the same hand and wrist movements repetitively over long periods, especially with a keyboard and mouse','sitting too close to the screen','staring at a bright screen in a dark room','using a wireless keyboard'],
  answer:'performing the same hand and wrist movements repetitively over long periods, especially with a keyboard and mouse', hint:'Repetition + poor posture = RSI.',
  explanation:'RSI is an umbrella term for pain and inflammation in tendons and muscles caused by repeated awkward movements without adequate rest.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-092', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Eye strain from prolonged computer use can be reduced by:',
  options:['looking away from the screen at a distant object for 20 seconds every 20 minutes (the 20-20-20 rule), and adjusting screen brightness','increasing the screen brightness to maximum','sitting as close to the screen as possible','using the computer in a completely darkened room'],
  answer:'looking away from the screen at a distant object for 20 seconds every 20 minutes (the 20-20-20 rule), and adjusting screen brightness', hint:'Regular breaks and correct brightness.',
  explanation:'The 20-20-20 rule gives the eye muscles a rest; matching screen brightness to room light prevents both squinting and glare.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-093', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Back pain is a common health problem for computer users who:',
  options:['sit in a poorly adjusted chair with no lumbar support and hunch over the keyboard for hours without breaks','use a wireless mouse instead of a wired one','work in a brightly lit room','type with more than two fingers'],
  answer:'sit in a poorly adjusted chair with no lumbar support and hunch over the keyboard for hours without breaks', hint:'Posture and prolonged sitting are the causes.',
  explanation:'Poor seating posture with no lumbar support places excessive stress on the spinal discs and back muscles, leading to chronic pain.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-094', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Carpal tunnel syndrome is a health hazard associated with computer use that affects:',
  options:['the wrist and hand, causing pain, tingling and numbness due to compression of the median nerve','the eyes, causing blurred vision','the spine, causing back pain','the ears, causing hearing loss'],
  answer:'the wrist and hand, causing pain, tingling and numbness due to compression of the median nerve', hint:'It affects the wrist.',
  explanation:'Prolonged, repetitive wrist movements and poor wrist angle compress the median nerve in the carpal tunnel, causing pain, numbness and weakness in the hand.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-095', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Neck pain in computer users is often caused by:',
  options:['a monitor that is too high or too low, forcing the user to crane or bow their neck for long periods','using a laptop without a case','having a fast processor','using a large screen'],
  answer:'a monitor that is too high or too low, forcing the user to crane or bow their neck for long periods', hint:'The monitor height should be at eye level.',
  explanation:'If the screen is not at eye level, the user must hold their head in an awkward position, straining the neck muscles.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-096', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Photosensitive epilepsy can be triggered in susceptible users by:',
  options:['rapidly flashing images or lights on a screen','slow internet connections','using a large monitor','the colour of the desktop background'],
  answer:'rapidly flashing images or lights on a screen', hint:'Flashing lights can trigger seizures.',
  explanation:'In people with photosensitive epilepsy, flashing images at certain frequencies (typically 3–50 Hz) can trigger a seizure; content with rapid flashes should carry a warning.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-097', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Prolonged exposure to noise from loud headphones or speakers can cause:',
  options:['permanent hearing loss or tinnitus (ringing in the ears)','improved hearing over time','faster typing speed','eye strain'],
  answer:'permanent hearing loss or tinnitus (ringing in the ears)', hint:'Loud sound damages hair cells in the inner ear.',
  explanation:'The hair cells in the cochlea that detect sound cannot regenerate; sustained exposure to loud audio permanently reduces hearing ability.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-098', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Sedentary behaviour (sitting for many hours without movement) associated with heavy computer use increases the risk of:',
  options:['obesity, cardiovascular disease and deep vein thrombosis (DVT)','improved cardiovascular health','stronger leg muscles','reduced risk of all diseases'],
  answer:'obesity, cardiovascular disease and deep vein thrombosis (DVT)', hint:'Lack of movement has serious health consequences.',
  explanation:'Extended sitting without movement slows the metabolism, contributes to weight gain, and increases the risk of blood clots forming in the legs.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-099', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Blue light emitted by screens may contribute to:',
  options:['disrupted sleep patterns, particularly if screens are used close to bedtime','improved concentration during the day','faster learning','better eyesight'],
  answer:'disrupted sleep patterns, particularly if screens are used close to bedtime', hint:'Blue light suppresses melatonin.',
  explanation:'Blue light inhibits the production of melatonin, the hormone that induces sleep; using screens in the evening can delay sleep onset and reduce sleep quality.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-100', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Stress and anxiety can be health hazards associated with computer use because:',
  options:['cyberbullying, information overload and the pressure to always be available online can increase stress levels','faster processors cause headaches','large monitors raise blood pressure','wireless networks cause anxiety'],
  answer:'cyberbullying, information overload and the pressure to always be available online can increase stress levels', hint:'Social and psychological effects of being always connected.',
  explanation:'Constant connectivity, exposure to negative online content and cyberbullying are recognised causes of stress and poor mental health in young people.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-101', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Computer addiction is characterised by:',
  options:['compulsive, excessive use of computers or the internet that interferes with daily life, sleep, schoolwork and relationships','using a computer for more than one hour per day','preferring to use a laptop instead of a desktop','typing faster than average'],
  answer:'compulsive, excessive use of computers or the internet that interferes with daily life, sleep, schoolwork and relationships', hint:'When it takes over other aspects of life.',
  explanation:'Computer or internet addiction is a behavioural disorder where the compulsion to use screens disrupts sleep, school performance and real-world social relationships.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-102', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Dry eyes in computer users are caused by:',
  options:['blinking less frequently than normal while concentrating on a screen, reducing moisture across the eye surface','using the computer in bright light','using a large screen','typing for long periods'],
  answer:'blinking less frequently than normal while concentrating on a screen, reducing moisture across the eye surface', hint:'Screen focus reduces blink rate.',
  explanation:'The average person blinks far less frequently when concentrating on a screen, reducing the spread of tear film and causing dry, irritated eyes.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-103', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'Poor posture while using a laptop on a bed or sofa can cause:',
  options:['back, neck and shoulder strain because the spine is not properly supported','faster typing','improved posture over time','stronger back muscles'],
  answer:'back, neck and shoulder strain because the spine is not properly supported', hint:'Soft surfaces and low screens cause you to slouch.',
  explanation:'Using a laptop on a bed usually means looking down at a low screen while the spine is unsupported, creating forward-head posture and muscle strain.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-104', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'The recommended distance between a user\'s eyes and a computer monitor is approximately:',
  options:['50 to 70 cm (about arm\'s length)','10 to 20 cm','more than 2 metres','0 cm (touching the screen)'],
  answer:'50 to 70 cm (about arm\'s length)', hint:'About arm\'s length.',
  explanation:'Sitting about 50–70 cm from the screen gives a comfortable viewing angle, reduces eye strain and limits exposure to any electromagnetic emissions.' }));

// ── hazard_prevention: dhv-105 to dhv-119 ────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-105', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'An ergonomic chair should be adjusted so that:',
  options:['both feet rest flat on the floor, knees are at a right angle and the lower back is supported by the lumbar rest','the user must stretch to reach the keyboard','the seat is as high as possible','there is no armrests'],
  answer:'both feet rest flat on the floor, knees are at a right angle and the lower back is supported by the lumbar rest', hint:'Feet flat, knees 90°, lumbar support.',
  explanation:'Correct chair adjustment maintains the natural curve of the spine, keeps blood flowing to the legs and reduces pressure on the lumbar discs.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-106', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'The top of a monitor should be positioned at or just below eye level so that:',
  options:['the user looks slightly downward at the screen, keeping the neck in a neutral position','the user must look up to see the screen, strengthening neck muscles','the screen is as far from the user as possible','the screen is tilted away from the user'],
  answer:'the user looks slightly downward at the screen, keeping the neck in a neutral position', hint:'Slight downward gaze is most comfortable.',
  explanation:'A screen positioned at or slightly below eye level allows the head to rest in its natural forward position, reducing neck and shoulder strain.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-107', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Using a wrist rest while typing helps to:',
  options:['keep the wrists in a neutral, flat position and reduce the risk of carpal tunnel syndrome and RSI','increase typing speed dramatically','correct spelling mistakes automatically','prevent the keyboard from sliding'],
  answer:'keep the wrists in a neutral, flat position and reduce the risk of carpal tunnel syndrome and RSI', hint:'Neutral wrist position reduces nerve and tendon stress.',
  explanation:'A wrist rest allows the user to rest their wrists between bursts of typing with the wrists in a neutral position, reducing strain on tendons and the median nerve.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-108', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Taking regular breaks from the computer every 30–60 minutes helps to:',
  options:['reduce eye strain, prevent RSI, ease back and neck tension and improve overall concentration','increase the risk of RSI','reduce battery life','slow down the computer'],
  answer:'reduce eye strain, prevent RSI, ease back and neck tension and improve overall concentration', hint:'Movement breaks counteract the effects of prolonged static posture.',
  explanation:'Regular micro-breaks allow the eyes to refocus, muscles to relax and blood to circulate, reducing the cumulative strain of long computer sessions.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-109', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'An anti-glare screen filter reduces:',
  options:['reflections from windows and lights that cause eye strain when viewing the monitor','the screen\'s resolution','the computer\'s processing speed','the risk of electric shock'],
  answer:'reflections from windows and lights that cause eye strain when viewing the monitor', hint:'Glare = reflected light on the screen.',
  explanation:'An anti-glare filter has a matte surface that diffuses reflected light, reducing the brightness contrast between the screen content and reflections.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-110', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Cable management trunking in a computer lab is used to:',
  options:['route cables neatly along walls or under desks to eliminate trip hazards and keep the workspace tidy','speed up the data transfer rate of network cables','protect cables from sunlight','reduce electricity consumption'],
  answer:'route cables neatly along walls or under desks to eliminate trip hazards and keep the workspace tidy', hint:'Trunking = neat cable channels.',
  explanation:'Cable trunking channels guide cables safely along walls or under desk surfaces, eliminating trailing cables that are a trip and safety hazard.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-111', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'The keyboard and mouse should be placed so that:',
  options:['the elbows are at or slightly above desk height, upper arms hang vertically and wrists are flat','the keyboard is directly on the floor','the mouse is on the opposite side of the room from the keyboard','the keyboard is as high as possible'],
  answer:'the elbows are at or slightly above desk height, upper arms hang vertically and wrists are flat', hint:'Elbows at desk height, shoulders relaxed.',
  explanation:'Correct keyboard and mouse placement allows the arms to hang naturally from the shoulders, reducing strain on the elbows, wrists and shoulders.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-112', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Adequate lighting in a computer lab should:',
  options:['be bright enough to see documents clearly without causing screen glare, and avoid direct light hitting the screen','be as dark as possible to make the screen easier to see','use only natural sunlight directed at the screen','be bright enough to prevent anyone from sleeping but no more'],
  answer:'be bright enough to see documents clearly without causing screen glare, and avoid direct light hitting the screen', hint:'Balance between document visibility and screen glare.',
  explanation:'Room lighting must illuminate work surfaces and printed documents but should not reflect on the screen; indirect, diffuse lighting is best.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-113', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Regular software updates and antivirus scans help to prevent:',
  options:['malware infections, security vulnerabilities and data loss caused by viruses and ransomware','the monitor from overheating','the keyboard from wearing out','electricity overcharges on the bill'],
  answer:'malware infections, security vulnerabilities and data loss caused by viruses and ransomware', hint:'Updated software = patched vulnerabilities.',
  explanation:'Updates patch known security flaws; antivirus scans detect and remove malicious software before it can cause data loss or system damage.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-114', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'A screen saver that activates after a few minutes of inactivity helps to:',
  options:['prevent a static image from being permanently burned into older CRT and plasma screens, and obscures the screen for privacy','cool down the CPU','increase battery life of desktop computers','automatically save all open documents'],
  answer:'prevent a static image from being permanently burned into older CRT and plasma screens, and obscures the screen for privacy', hint:'Screen savers were invented for screen burn.',
  explanation:'On older CRT and plasma screens, a static image displayed for long periods can permanently "burn" into the phosphor; screen savers also obscure the user\'s work.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-115', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Parental controls and content filters on school computers help to:',
  options:['prevent students from accessing inappropriate or harmful online content during school hours','speed up internet connections','improve the graphics quality of the screen','allow students to install any software they choose'],
  answer:'prevent students from accessing inappropriate or harmful online content during school hours', hint:'Filtering keeps content safe.',
  explanation:'Content filters block websites categorised as inappropriate, protecting students from exposure to harmful material while using school resources.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-116', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'A footrest in an ergonomic workstation setup is used by:',
  options:['users whose feet do not reach the floor comfortably when the chair is at the correct height, to support the legs and improve circulation','users who want to raise their monitors higher','anyone who wants to use the computer standing up','users who want to reduce glare on the screen'],
  answer:'users whose feet do not reach the floor comfortably when the chair is at the correct height, to support the legs and improve circulation', hint:'Feet must be supported.',
  explanation:'If a chair adjusted to the correct height for the desk leaves the user\'s feet dangling, a footrest supports them in the correct position.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-117', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Clear exit routes and emergency exits in a computer laboratory must always be:',
  options:['kept completely unobstructed so everyone can evacuate quickly in an emergency','used as extra storage for computer boxes','locked during class to prevent interruptions','marked with a red cross sign'],
  answer:'kept completely unobstructed so everyone can evacuate quickly in an emergency', hint:'Blocked exits are dangerous and illegal.',
  explanation:'Emergency regulations require clear, unobstructed exit routes; cluttered aisles or locked emergency doors can prevent safe evacuation during a fire or other emergency.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-118', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Students should be taught to recognise phishing emails and suspicious links to:',
  options:['protect personal data and prevent malware from being downloaded onto school computers','make them faster typists','teach them to create their own websites','improve their programming skills'],
  answer:'protect personal data and prevent malware from being downloaded onto school computers', hint:'Awareness prevents phishing attacks.',
  explanation:'Phishing emails trick users into revealing credentials or clicking malicious links; educating students to recognise the signs prevents data breaches and malware infections.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-dhv-119', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:2,
  question:'Proper disposal of old computer equipment (e-waste) is important because:',
  options:['electronic devices contain toxic materials such as lead, mercury and cadmium that can harm the environment and human health if sent to landfill','old computers can be reused as door stops','throwing computers in the bin is the fastest method','e-waste disposal generates electricity'],
  answer:'electronic devices contain toxic materials such as lead, mercury and cadmium that can harm the environment and human health if sent to landfill', hint:'Electronics contain hazardous substances.',
  explanation:'Computers and monitors contain heavy metals and other hazardous materials; responsible recycling through certified e-waste facilities prevents these from entering soil and water.' }));

})();
