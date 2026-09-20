'use strict';
(function () {

  // Grammar · Punctuation (g9eng-gr-punctuation) — depth batch.
  //
  // Level 4 here is "Extended Analysis", not a harder rule. Punctuation is the
  // one chapter in this pack where the MEANING of a sentence moves with the
  // mark: the commas round a relative clause say how many sisters there are,
  // the stop outside the closing quote says who spoke the last words, the
  // second dash says where the aside ends, and the semicolons in a list say
  // how many people won a prize. Those are the L4 items. "Which mark is a
  // semicolon?" is L1 however it is dressed up.
  //
  // ⚠ Four versions of one sentence differing only in punctuation is a good
  //   item, but no two of them may READ the same. Every distractor below is
  //   wrong for a different, nameable reason.

  STATIC_QUESTIONS.push(

    // ══ non_defining_comma (001–013) ═══════════════════════════════════════

    makeMCQ({ id:'g9eng-d7-001', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:1,
      question:'A <b>non-defining</b> relative clause adds information that could be removed without changing which person or thing is meant. How is such a clause punctuated?',
      options:['With a comma at each end of the clause','With a comma only at the very start of it','With a comma only at the end of the clause','With no comma at any point in the sentence'],
      answer:'With a comma at each end of the clause',
      hint:'Think of the clause as being fenced off from the rest of the sentence.',
      explanation:'A non-defining clause is fenced by a comma on <b>both</b> sides, the way brackets have to be opened and closed. One comma alone leaves the reader unable to see where the added information stops.' }),

    makeTF({ id:'g9eng-d7-002', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:1,
      question:'True or False: in <i>My only brother, who lives in Vacoas, is a dentist</i>, the commas show that the writer is adding information about the brother rather than picking him out from others.',
      answer:true,
      hint:'Ask whether the clause is needed to work out which brother is meant.',
      explanation:'True. The word <i>only</i> has already settled which brother is meant, so the clause can only be adding extra information. That is exactly what the pair of commas signals to a reader.' }),

    makeMCQ({ id:'g9eng-d7-003', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:2,
      question:'In which sentence is the relative clause <b>extra information</b>, so that a pair of commas is needed?',
      options:['Mrs Appadoo who teaches us Hindi retires in June','The pupils who arrive late must sign the register','Any driver who parks on the grass will be fined','The shop that sells hot samosas opens at six'],
      answer:'Mrs Appadoo who teaches us Hindi retires in June',
      hint:'A name has already done the identifying. Which sentence names its subject?',
      explanation:'Because the subject is already named, the clause cannot be picking her out from other people, so it is extra information and needs commas: <b>Mrs Appadoo, who teaches us Hindi, retires in June.</b> In the other three the clause narrows a general noun (which pupils, which driver, which shop) and must not be fenced off.' }),

    makeText({ id:'g9eng-d7-004', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:2,
      question:'The writer means that the village has just one library: <i>The library which stands behind the church was built in 1902.</i> Write the ONE word that the first comma of the pair must come immediately after.',
      answer:'library', alsoAccept:['library,','The library','the library'],
      hint:'The comma opens the fence, so it goes at the point where the added information begins.',
      explanation:'The added information starts at <i>which</i>, so the opening comma goes straight after the noun it follows: <b>The library, which stands behind the church, was built in 1902.</b> A closing comma after <i>church</i> is needed too, but the question asked only for the opening one.' }),

    makeMCQ({ id:'g9eng-d7-005', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:2,
      question:'Which version is punctuated correctly?',
      options:['Port Louis, which is the capital, has a busy harbour.','Port Louis which is the capital, has a busy harbour.','Port Louis, which is the capital has a busy harbour.','Port Louis which, is the capital, has a busy harbour.'],
      answer:'Port Louis, which is the capital, has a busy harbour.',
      hint:'Check the start and the end of the added clause separately before choosing.',
      explanation:'The clause runs from <i>which</i> to <i>capital</i>, so a comma is needed at each of those two points. The second and third versions each supply only one of the pair, and the fourth puts a comma inside the clause instead of in front of it.' }),

    makeMCQ({ id:'g9eng-d7-006', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:3,
      question:'Where does the pair of commas belong in <i>The old mosque in Plaine Verte which was restored last year is open to visitors</i>?',
      options:['The old mosque in Plaine Verte, which was restored last year, is open.','The old mosque, in Plaine Verte which was restored last year, is open.','The old mosque in Plaine Verte which was restored, last year, is open.','The old mosque in, Plaine Verte which was restored last year, is open.'],
      answer:'The old mosque in Plaine Verte, which was restored last year, is open.',
      hint:'Find the first and last words of the clause that could be lifted out, then fence exactly those.',
      explanation:'The removable part is <i>which was restored last year</i>, so the commas go immediately before <i>which</i> and immediately after <i>year</i>. The second version fences a stretch that begins in the middle of the place name, and the other two cut the clause apart instead of fencing it.' }),

    makeMCQ({ id:'g9eng-d7-007', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:3,
      question:'Which sentence contains a clause that <b>identifies</b> which one is meant, and so must take no commas at all?',
      options:['The bus that leaves at six goes through Rose Hill.','My grandmother who is eighty walks to the market.','Mr Ramdin who is our new head teacher is from Flacq.','The Eiffel Tower which stands in Paris opened in 1889.'],
      answer:'The bus that leaves at six goes through Rose Hill.',
      hint:'Ask of each sentence whether the subject could be more than one thing before the clause arrives.',
      explanation:'There are many buses, so <i>that leaves at six</i> is doing the work of telling you which one: it is a defining clause and takes no commas. In the other three the subject is already unique (one grandmother, one Mr Ramdin, one Eiffel Tower), so the clause is extra and needs fencing.' }),

    makeMCQ({ id:'g9eng-d7-008', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:4,
      question:'What does <i>My cousin, who lives in Curepipe, is a nurse.</i> tell a reader that <i>My cousin who lives in Curepipe is a nurse.</i> does not?',
      options:['That the speaker has only one cousin','That the speaker has several cousins','That the cousin trained in Curepipe','That the cousin is no longer a nurse'],
      answer:'That the speaker has only one cousin',
      hint:'Work out what job the clause is doing in each version, then ask what that implies about the number of cousins.',
      explanation:'With commas the clause is extra, so the cousin must already be identified: there is one. Without commas the clause is needed to pick one cousin out of several, which is why the unpunctuated version quietly says there are more. The two sentences use the same words and mean different things.' }),

    makeMCQ({ id:'g9eng-d7-009', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:4,
      question:'Mr Li has four daughters. Which sentence correctly says that the one who studies in Australia has just returned?',
      options:['His daughter who studies in Australia has returned.','His daughter, who studies in Australia, has returned.','His daughter, who studies in Australia has returned.','His only daughter studies in Australia and has returned.'],
      answer:'His daughter who studies in Australia has returned.',
      hint:'He has four, so the clause has a job to do. Decide what that job is before looking at the commas.',
      explanation:'With four daughters the clause is needed to say <b>which</b> one, so it is defining and takes no commas. The fully fenced version would claim he has a single daughter, the half-fenced one leaves the added information with no end, and the last option states outright that there is only one.' }),

    makeMCQ({ id:'g9eng-d7-010', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:4,
      question:'Why can the clause in <i>Mount Le Pouce, which overlooks Port Louis, is a hard climb.</i> never be written without its commas?',
      options:['There is only one Mount Le Pouce to identify','A clause beginning with which always takes them','The sentence already contains one place name','A clause about a mountain must be separated'],
      answer:'There is only one Mount Le Pouce to identify',
      hint:'A defining clause narrows a choice. Ask whether there is any choice left to narrow here.',
      explanation:'The name has already picked out the mountain, so no clause can narrow it further and the clause can only be adding information. The tempting answer is the rule about <i>which</i>, but <i>which</i> does appear in defining clauses; it is the uniqueness of the subject, not the relative pronoun, that decides the commas.' }),

    makeText({ id:'g9eng-d7-011', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:4,
      question:'According to its punctuation alone, how many uncles does the writer of <i>My uncle, who drives a lorry, lives in Goodlands.</i> have? Write the number as a word.',
      answer:'one', alsoAccept:['One','1','just one','only one'],
      hint:'Decide first whether the clause is picking an uncle out or telling you more about a known one.',
      explanation:'The commas make the clause extra information, which is only possible if the uncle is already identified — so there is <b>one</b>. Remove the two commas and the same words would be picking one lorry-driving uncle out of several. The count is carried by the punctuation, not by any word in the sentence.' }),

    makeMCQ({ id:'g9eng-d7-012', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:4,
      question:'One comma of a pair has been dropped: <i>The referee, who had already booked two players sent off the captain.</i> Why does the sentence now mislead a reader?',
      options:['The reader cannot tell where the added part ends','The reader cannot tell who booked the two players','The reader expects a list of three or more names','The reader takes the referee to be one of the players'],
      answer:'The reader cannot tell where the added part ends',
      hint:'A fence with one post is not a fence. Ask what the reader loses.',
      explanation:'The opening comma promises an aside, and with no closing comma the reader carries on through <i>sent off the captain</i> looking for the end of it. The sentence needs a comma after <i>players</i>. Nothing about who did the booking is unclear — the fault is that the boundary is missing, not the information.' }),

    makeMCQ({ id:'g9eng-d7-013', chapterId:'g9eng-gr-punctuation', subsection:'non_defining_comma', difficulty:4,
      question:'Compare <i>The islanders, who were warned, moved inland.</i> with <i>The islanders who were warned moved inland.</i> What does the second say that the first does not?',
      options:['That some islanders were not warned','That all of the islanders were warned','That the warning came far too late','That the islanders ignored a warning'],
      answer:'That some islanders were not warned',
      hint:'A clause with no commas narrows the group. Ask what is left outside the narrowed group.',
      explanation:'Without commas the clause divides the islanders into those who were warned and those who were not, and only the first group moved. With commas every islander was warned and every islander moved. One pair of marks changes how many people the sentence is about.' }),

    // ══ quotation_marks (014–025) ══════════════════════════════════════════

    makeMCQ({ id:'g9eng-d7-014', chapterId:'g9eng-gr-punctuation', subsection:'quotation_marks', difficulty:1,
      question:'What do <b>double quotation marks</b> enclose in a piece of writing?',
      options:['The exact words somebody spoke or wrote','The name of a long book or a newspaper','A word the writer has spelt incorrectly','Any sentence that ends with a question'],
      answer:'The exact words somebody spoke or wrote',
      hint:'The clue is in the word <i>quotation</i>.',
      explanation:'Double quotation marks mark off the <b>exact</b> words of a speaker or a source, so that the reader can see where the writer stops and the quoted person starts. Titles of long works are italicised rather than quoted, and a misspelling is not marked at all.' }),

    makeTF({ id:'g9eng-d7-015', chapterId:'g9eng-gr-punctuation', subsection:'quotation_marks', difficulty:1,
      question:'True or False: the title of a single poem is normally written inside single quotation marks.',
      answer:true,
      hint:'Recall which of the two kinds of mark this pack reserves for short works.',
      explanation:'True. Single marks are the convention for the titles of shorter works — poems, short stories and articles — while double marks are kept for the exact words of a speaker. Keeping the two apart lets a reader see at once which is which.' }),

    makeMCQ({ id:'g9eng-d7-016', chapterId:'g9eng-gr-punctuation', subsection:'quotation_marks', difficulty:2,
      question:'Which sentence correctly punctuates a reporting clause placed <b>before</b> the spoken words?',
      options:['The nurse said, "Please wait in the corridor."','The nurse said "Please wait in the corridor."','The nurse said: "please wait in the corridor."','The nurse said, "Please wait in the corridor".'],
      answer:'The nurse said, "Please wait in the corridor."',
      hint:'Two things must be right: the mark that separates the two parts, and where the final stop sits.',
      explanation:'A reporting clause in front of speech is followed by a <b>comma</b>, the speech starts with a capital, and the closing stop goes <b>inside</b> the final mark because it belongs to the spoken sentence. The other versions drop the comma, start the speech in lower case, or leave the stop stranded outside.' }),

    makeText({ id:'g9eng-d7-017', chapterId:'g9eng-gr-punctuation', subsection:'quotation_marks', difficulty:2,
      question:'The spoken words in <i>She whispered I am frightened</i> need to be enclosed at each end. Write the TWO-WORD name of the marks that must enclose them.',
      answer:'quotation marks', alsoAccept:['quotation mark','inverted commas','speech marks','double quotes','quotation-marks'],
      hint:'They are named after what they do: they mark off words taken from somebody else.',
      explanation:'The spoken words are enclosed in <b>quotation marks</b> — also called inverted commas or speech marks — and a comma is needed after the reporting verb: <i>She whispered, "I am frightened."</i> Without them a reader cannot see where her words begin and end.' }),

    makeMCQ({ id:'g9eng-d7-018', chapterId:'g9eng-gr-punctuation', subsection:'quotation_marks', difficulty:3,
      question:'Which sentence correctly shows a poem title quoted <b>inside</b> direct speech?',
      options:['He said, "I have learnt \'Sea Fever\' by heart."','He said, "I have learnt "Sea Fever" by heart."','He said, \'I have learnt \'Sea Fever\' by heart.\'','He said, "I have learnt Sea Fever by heart."'],
      answer:'He said, "I have learnt \'Sea Fever\' by heart."',
      hint:'The outer marks and the inner marks must be of different kinds, or the reader cannot tell them apart.',
      explanation:'Double marks fence the speech and <b>single</b> marks fence the title inside it, so the two boundaries stay distinct. Using doubles for both makes the sentence appear to close its speech early; using singles for both has the same fault; and leaving the title bare hides it altogether.' }),

    makeMCQ({ id:'g9eng-d7-019', chapterId:'g9eng-gr-punctuation', subsection:'quotation_marks', difficulty:4,
      question:'Where does the question mark belong in <i>She asked, "Have you seen my keys"</i> and why?',
      options:['Inside the closing mark, because the speaker asked','Outside the closing mark, because the writer asked','After the reporting clause at the start of the line','Nowhere, because the whole sentence is a statement'],
      answer:'Inside the closing mark, because the speaker asked',
      hint:'Decide who is doing the asking, then put the mark where that person stopped speaking.',
      explanation:'The question belongs to the speaker, so the mark goes <b>inside</b>: <i>She asked, "Have you seen my keys?"</i> A mark placed outside would say the <b>writer</b> is questioning the whole sentence, which is a different claim. The outer sentence really is a statement, but the words inside the marks are not.' }),

    makeTF({ id:'g9eng-d7-020', chapterId:'g9eng-gr-punctuation', subsection:'quotation_marks', difficulty:3,
      question:'True or False: when quoted words form a complete statement and the reporting clause follows them, the mark before the closing quotation mark is a comma rather than a full stop.',
      answer:true,
      hint:'Ask whether the whole sentence has finished at the point where the speech stops.',
      explanation:'True. <i>"We are leaving," he said.</i> keeps the sentence open for the reporting clause, so a comma is used even though the speaker uttered a full statement. A full stop there would end the sentence and leave <i>he said</i> stranded as a fragment.' }),

    makeMCQ({ id:'g9eng-d7-021', chapterId:'g9eng-gr-punctuation', subsection:'quotation_marks', difficulty:4,
      question:'Which sentence punctuates a quoted sentence that is <b>interrupted</b> in the middle by its reporting clause?',
      options:['"We will leave," he said, "as soon as it is dry."','"We will leave." he said. "As soon as it is dry."','"We will leave", he said, "as soon as it is dry".','"We will leave," he said. "As soon as it is dry."'],
      answer:'"We will leave," he said, "as soon as it is dry."',
      hint:'The speaker said one sentence. Decide which version keeps it as one sentence.',
      explanation:'Because the speaker uttered a single sentence, the reporting clause is fenced by commas and the second half resumes in <b>lower case</b>. The last version uses a full stop after <i>said</i>, which claims the speaker finished and then began a new sentence — but <i>As soon as it is dry</i> cannot stand alone. Punctuation alone decides whether he spoke once or twice.' }),

    makeMCQ({ id:'g9eng-d7-022', chapterId:'g9eng-gr-punctuation', subsection:'quotation_marks', difficulty:1,
      question:'A pupil is writing about a short story in an essay. Which line marks the title correctly?',
      options:['The story \'The Gift\' ends with a question.','The story (The Gift) ends with a question.','The story -The Gift- ends with a question.','The story The Gift, ends with a question.'],
      answer:'The story \'The Gift\' ends with a question.',
      hint:'Recall which marks this chapter reserves for the titles of short works.',
      explanation:'A short story is a short work, so its title takes <b>single quotation marks</b>. Brackets would suggest the title is an aside that could be dropped, dashes would suggest a break in thought, and a bare title with a stray comma leaves the reader guessing where the title ends.' }),

    makeText({ id:'g9eng-d7-023', chapterId:'g9eng-gr-punctuation', subsection:'quotation_marks', difficulty:3,
      question:'In <i>"I will not go," said Ravi.</i> write the ONE-WORD name of the punctuation mark that sits immediately before the closing quotation mark.',
      answer:'comma', alsoAccept:['a comma','the comma','Comma','comma.'],
      hint:'The sentence is not finished at that point, so the mark there cannot be a final one.',
      explanation:'A <b>comma</b> sits inside the closing mark, holding the sentence open for the reporting clause <i>said Ravi</i>. A full stop in that position would close the sentence and leave the reporting clause as a fragment, which is why the comma is used even though Ravi spoke a complete statement.' }),

    makeMCQ({ id:'g9eng-d7-024', chapterId:'g9eng-gr-punctuation', subsection:'quotation_marks', difficulty:4,
      question:'A report reads: <i>The minister called the delay "unacceptable".</i> What does placing the full stop <b>outside</b> the closing mark tell the reader?',
      options:['Only the single word came from the minister','The whole sentence came from the minister','The minister was quoting somebody else here','The writer doubts that the word is accurate'],
      answer:'Only the single word came from the minister',
      hint:'Everything inside the marks is the quoted person; everything outside them is the writer.',
      explanation:'The stop is outside because it belongs to the writer, not to the minister, so only <i>unacceptable</i> is being attributed to him. Had the stop gone inside, the mark would have been claiming that the minister spoke a whole sentence ending there. The position of one dot decides how much of the sentence is a quotation.' }),

    makeTF({ id:'g9eng-d7-025', chapterId:'g9eng-gr-punctuation', subsection:'quotation_marks', difficulty:4,
      question:'True or False: <i>The guard shouted "Stop!" and ran after them.</i> tells the reader that the only word the guard actually spoke was <i>Stop</i>.',
      answer:true,
      hint:'Look at where the marks open and close, and treat everything outside them as the writer.',
      explanation:'True. The marks open and close around a single word, so that is the whole of the quotation; <i>and ran after them</i> is the writer narrating. If the guard had also said something about following them, that would have to sit inside the marks too. The reader learns what was spoken from the boundaries, not from the verb.' }),

    // ══ dash (026–039) ═════════════════════════════════════════════════════

    makeMCQ({ id:'g9eng-d7-026', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:1,
      question:'What does a <b>pair of dashes</b> do in the middle of a sentence?',
      options:['It fences off information that could be removed','It marks the start and the end of spoken words','It shows that two separate lists are compared','It replaces every comma in a long sentence'],
      answer:'It fences off information that could be removed',
      hint:'Compare it with a pair of brackets rather than with a single mark.',
      explanation:'A pair of dashes works like a pair of brackets: it fences an aside that could be lifted out with the sentence still standing. Speech is marked with quotation marks, not dashes, and a dash never stands in for the ordinary commas of a list.' }),

    makeTF({ id:'g9eng-d7-027', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:1,
      question:'True or False: a single dash may be used instead of a colon to introduce an explanation, though it is the less formal of the two.',
      answer:true,
      hint:'Think about tone as well as about what each mark is allowed to do.',
      explanation:'True. Both marks can introduce an explanation of what came before, but the dash is the more conversational and dramatic and the colon the more formal. In an examination essay the colon is the safer choice; in a story the dash carries more surprise.' }),

    makeMCQ({ id:'g9eng-d7-028', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:2,
      question:'How does a <b>dash</b> differ from a <b>hyphen</b>?',
      options:['A dash separates parts of a sentence; a hyphen joins parts of a word','A dash joins parts of a word; a hyphen separates parts of a sentence','A dash closes a sentence; a hyphen opens the sentence that follows','A dash belongs to speech only; a hyphen belongs to writing only'],
      answer:'A dash separates parts of a sentence; a hyphen joins parts of a word',
      hint:'One of the two marks works inside a single word. Decide which, and the rest follows.',
      explanation:'A hyphen is a joining mark and lives inside a word (<i>well-known</i>, <i>twenty-one</i>); a dash is a separating mark and lives between parts of a sentence. The second option states the rule the wrong way round, which is the commonest confusion of the two.' }),

    makeMCQ({ id:'g9eng-d7-029', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:2,
      question:'Which sentence fences the added information with dashes correctly?',
      options:['The ferry - delayed by the storm - docked after midnight.','The ferry - delayed by the storm docked after midnight.','The ferry delayed - by the storm - docked after midnight.','The ferry, delayed by the storm - docked after midnight.'],
      answer:'The ferry - delayed by the storm - docked after midnight.',
      hint:'Test each version by lifting out the fenced words and seeing whether a sentence remains.',
      explanation:'Lift out <i>delayed by the storm</i> and <i>The ferry docked after midnight</i> remains, so the dashes are in the right places. The second version never closes the fence, the third fences a stretch that is not the aside, and the fourth mixes a comma with a dash so the two ends do not match.' }),

    makeMCQ({ id:'g9eng-d7-030', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:2,
      question:'Which sentence uses a <b>single dash</b> to introduce the result of what came before it?',
      options:['The rain fell for six hours - the river burst its banks.','The rain - which fell for six hours - filled the reservoir.','The rain fell - and the wind blew - for the whole of the night.','The rain - six hours of it - flooded the lower cane fields.'],
      answer:'The rain fell for six hours - the river burst its banks.',
      hint:'Count the dashes in each option first; only one kind of use is being asked about.',
      explanation:'Only the first sentence has a single dash, and what follows it is the consequence of the rain. The other three use a <b>pair</b> of dashes to fence an aside, which is a different job: a pair encloses, a single one points forward.' }),

    makeText({ id:'g9eng-d7-031', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:2,
      question:'How many dashes are needed to fence an aside that falls in the <b>middle</b> of a sentence? Write the number as a word.',
      answer:'two', alsoAccept:['2','Two','a pair'],
      hint:'A fence in the middle of a sentence has to be opened and closed.',
      explanation:'An aside in the middle needs <b>two</b> dashes, one at each end, exactly as a bracket must be opened and closed. Only an aside that runs to the end of the sentence can be introduced with a single dash, because the full stop closes it.' }),

    makeMCQ({ id:'g9eng-d7-032', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:2,
      question:'What is the dash doing at the end of this line of dialogue: <i>"I thought you said you would-"</i>?',
      options:['Showing that the speaker was cut off','Showing that the speaker was shouting','Showing that a letter has been left out','Showing that the speaker was quoting'],
      answer:'Showing that the speaker was cut off',
      hint:'Notice that the sentence inside the marks is unfinished, and ask what would cause that.',
      explanation:'A dash at the end of speech shows the speaker was <b>interrupted</b> before finishing. Three dots would suggest the speaker trailed off by choice, and a missing letter inside a word is shown by an apostrophe, not a dash.' }),

    makeMCQ({ id:'g9eng-d7-033', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:4,
      question:'Rewriting <i>He had, at last, found the key.</i> with dashes in place of the commas changes what about the sentence?',
      options:['How strongly the aside is emphasised','Which part of it counts as the aside','The tense of the verb in the sentence','Whether the sentence is a question'],
      answer:'How strongly the aside is emphasised',
      hint:'The same words are fenced either way. Ask what is left that could possibly change.',
      explanation:'Commas and dashes fence the same three words, so the grammar and the meaning of the words are untouched; what moves is the <b>weight</b> the reader gives them. Dashes make <i>at last</i> land harder, which is why they suit a story and commas suit a report.' }),

    makeMCQ({ id:'g9eng-d7-034', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:4,
      question:'A writer drops the second dash: <i>The new road - built in only nine months has already cracked.</i> What does a reader now do with the rest of the sentence?',
      options:['Read it all as part of the added aside','Read it as a second, separate aside','Read it as the words of a speaker','Read it as a list of two events'],
      answer:'Read it all as part of the added aside',
      hint:'A single dash points forward to the end of the sentence. Ask what that swallows.',
      explanation:'A lone dash introduces material that runs to the full stop, so <i>built in only nine months has already cracked</i> is read as one long aside and the sentence is left with no main verb of its own. The closing dash after <i>months</i> is what tells the reader where to come back out.' }),

    makeTF({ id:'g9eng-d7-035', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:3,
      question:'True or False: the words fenced by a pair of dashes can be taken out and the sentence will still be complete.',
      answer:true,
      hint:'That test is the same one used for a pair of commas round a clause.',
      explanation:'True, and it is the test worth applying every time: if removing the fenced words leaves a broken sentence, the dashes have been put in the wrong places. A pair of dashes, a pair of commas and a pair of brackets all pass or fail this same test.' }),

    makeMCQ({ id:'g9eng-d7-036', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:3,
      question:'Which mark fills the gap so that the second part reads as a sudden afterthought? <i>We packed for a week ___ then the trip was cancelled.</i>',
      options:['a dash','a comma','a colon','a hyphen'],
      answer:'a dash',
      hint:'Weigh the abruptness each mark carries, not just whether it would be allowed there.',
      explanation:'A <b>dash</b> gives the abrupt, unplanned turn the sentence needs. A comma alone would join two complete statements and create a comma splice, a colon promises an explanation rather than a reversal, and a hyphen belongs inside a word and cannot separate clauses at all.' }),

    makeText({ id:'g9eng-d7-037', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:3,
      question:'Write the ONE-WORD name of the paired marks that could replace both dashes in <i>The tour - a gift from her aunt - lasted ten days.</i> without changing the meaning.',
      answer:'brackets', alsoAccept:['bracket','parentheses','parenthesis','round brackets','Brackets'],
      hint:'The replacement must also come in a pair, and it makes the fenced words quieter rather than louder.',
      explanation:'A pair of <b>brackets</b> does the same fencing job: <i>The tour (a gift from her aunt) lasted ten days.</i> The information and the grammar are identical; only the emphasis shifts, since brackets play the aside down where dashes play it up.' }),

    makeMCQ({ id:'g9eng-d7-038', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:4,
      question:'Compare <i>The manager - who arrived late - apologised.</i> with <i>The manager apologised - he had arrived late.</i> What does only the second sentence do?',
      options:['It offers a reason for the apology','It names the person who apologised','It says the manager was not late','It shows the apology was refused'],
      answer:'It offers a reason for the apology',
      hint:'A pair of dashes encloses; a single dash points forward. Ask what each one is doing to the lateness.',
      explanation:'In the first sentence the lateness is fenced off as an aside about the manager. In the second it follows a single dash, so it is read as what the apology was <b>for</b>. Both sentences carry the same two facts; the dashes decide whether one of them explains the other.' }),

    makeTF({ id:'g9eng-d7-039', chapterId:'g9eng-gr-punctuation', subsection:'dash', difficulty:4,
      question:'True or False: in <i>Only one thing stopped him - money.</i> the dash could be replaced by a colon with no change to what the sentence means.',
      answer:true,
      hint:'Separate the question of meaning from the question of tone before answering.',
      explanation:'True. Both marks introduce the thing that has just been promised, so the meaning is the same and only the register moves: the colon is the more formal and the dash the more dramatic. A comma there would be wrong, because a comma cannot announce an elaboration in this way.' }),

    // ══ semicolon (040–054) ════════════════════════════════════════════════

    makeMCQ({ id:'g9eng-d7-040', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:1,
      question:'What does a <b>semicolon</b> join inside one sentence?',
      options:['Two statements that could each stand alone','A statement and a list of three short items','A question and the answer that follows it','A spoken sentence and its reporting clause'],
      answer:'Two statements that could each stand alone',
      hint:'Test each half of the joined sentence on its own before deciding.',
      explanation:'A semicolon joins two <b>independent</b> clauses: each half would be a complete sentence with a capital and a full stop. It is not a list mark, and it never stands between speech and the clause that reports it.' }),

    makeTF({ id:'g9eng-d7-041', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:1,
      question:'True or False: a semicolon is placed in front of a joining word such as <i>and</i> or <i>but</i> when it links two clauses.',
      answer:false,
      hint:'Ask what work is left for the semicolon once a joining word is already there.',
      explanation:'False. The joining word has already done the joining, so a semicolon in front of it does the same job twice. Use a comma before <i>and</i> or <i>but</i>, or drop the word and use the semicolon by itself — never both.' }),

    makeText({ id:'g9eng-d7-042', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:1,
      question:'Two complete sentences have been joined by nothing but a comma, where a semicolon or a full stop was needed. Write the TWO-WORD name for this mistake.',
      answer:'comma splice', alsoAccept:['a comma splice','comma-splice','splice','comma splice.'],
      hint:'The name puts together the mark that was misused and a word meaning joined end to end.',
      explanation:'The fault is a <b>comma splice</b>. It is mended in any of three ways: put a semicolon in place of the comma, put a full stop there and start a new sentence, or add a joining word such as <i>and</i>, <i>but</i> or <i>so</i> after the comma.' }),

    makeMCQ({ id:'g9eng-d7-043', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:2,
      question:'In which sentence is the semicolon placed correctly?',
      options:['The bell rang; the classroom emptied in seconds.','The bell rang; and the classroom emptied at once.','When the bell rang; the classroom emptied at once.','The bell rang; emptying the classroom in seconds.'],
      answer:'The bell rang; the classroom emptied in seconds.',
      hint:'Cover the semicolon and read each half as a sentence of its own.',
      explanation:'Both halves of the first sentence stand alone, which is what a semicolon requires. The second adds <i>and</i> and so joins twice over, the third opens with <i>When</i> and leaves the first half unable to stand, and the fourth follows the semicolon with a phrase rather than a clause.' }),

    makeMCQ({ id:'g9eng-d7-044', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:2,
      question:'Each item in this list names a town and then its district. Which version is punctuated correctly?',
      options:['Vacoas, Plaines Wilhems; Goodlands, Riviere du Rempart; Souillac, Savanne.','Vacoas, Plaines Wilhems, Goodlands, Riviere du Rempart, Souillac, Savanne.','Vacoas; Plaines Wilhems, Goodlands; Riviere du Rempart, Souillac; Savanne.','Vacoas, Plaines Wilhems: Goodlands, Riviere du Rempart: Souillac, Savanne.'],
      answer:'Vacoas, Plaines Wilhems; Goodlands, Riviere du Rempart; Souillac, Savanne.',
      hint:'The commas inside each item are already spoken for, so the mark between items has to be a stronger one.',
      explanation:'Each item already contains a comma, so a <b>semicolon</b> is needed between items to show where one item ends. Commas throughout give a flat list of six names with no pairing visible; the third version pairs the wrong names together; and a colon cannot separate list items at all.' }),

    makeTF({ id:'g9eng-d7-045', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:2,
      question:'True or False: the word immediately after a semicolon begins with a capital letter, unless it happens to be a name.',
      answer:false,
      hint:'A capital letter marks the start of a new sentence. Ask whether a new sentence has started here.',
      explanation:'False, and it is the other way round: the word after a semicolon takes a <b>small</b> letter unless it is a name, because the semicolon keeps the sentence open rather than ending it. A capital there would suggest a full stop was intended.' }),

    makeMCQ({ id:'g9eng-d7-046', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:2,
      question:'Each version links two complete statements with <b>however</b>. Which one is correct?',
      options:['The gate was locked; however, we found a side path.','The gate was locked, however, we found a side path in.','The gate was locked however; we found a side path in.','The gate was locked; however we found; a side path in.'],
      answer:'The gate was locked; however, we found a side path.',
      hint:'Decide which half of the sentence the word <i>however</i> belongs to before placing the marks.',
      explanation:'<i>However</i> introduces the second statement, so the semicolon goes in front of it and a comma after it. The second version joins two whole clauses with commas alone, which is a comma splice; the third attaches <i>however</i> to the wrong clause; and the fourth cuts the second clause in half.' }),

    makeText({ id:'g9eng-d7-047', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:2,
      question:'Write the ONE-WORD name of the mark that should replace the comma in <i>The ferry was full, we waited for the next one.</i>',
      answer:'semicolon', alsoAccept:['a semicolon','semi-colon','semi colon','Semicolon','semicolon.'],
      hint:'Both halves are complete sentences, so the mark between them must be strong enough to join two of those.',
      explanation:'A <b>semicolon</b> is needed, because <i>The ferry was full</i> and <i>we waited for the next one</i> are both complete sentences and a comma cannot hold two of those together. A full stop would also be correct; the question asked for the mark that keeps them in one sentence.' }),

    makeMCQ({ id:'g9eng-d7-048', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:4,
      question:'A writer chooses a semicolon rather than a full stop between two statements. What does that choice tell the reader?',
      options:['That the two statements belong closely together','That the second statement matters more than the first','That the first of the two statements is a question','That the two statements contradict one another'],
      answer:'That the two statements belong closely together',
      hint:'Both marks are grammatically allowed here, so the difference cannot be about grammar.',
      explanation:'Either mark would be correct, so the semicolon is not fixing an error — it is signalling that the two statements are <b>one thought</b> and should be read together. A full stop would present them as two separate pieces of information. Nothing in the choice says which statement matters more, and contradiction is carried by words such as <i>but</i>, not by the mark.' }),

    makeMCQ({ id:'g9eng-d7-049', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:3,
      question:'Which sentence contains a <b>comma splice</b>?',
      options:['The lights went out, the audience stayed calm.','The lights went out, but the audience stayed calm.','When the lights went out, the audience stayed calm.','The lights went out; the audience stayed calm entirely.'],
      answer:'The lights went out, the audience stayed calm.',
      hint:'Look for the version where a comma is the only thing holding two whole statements together.',
      explanation:'In the first sentence a bare comma joins two independent clauses, which is the splice. The second adds <i>but</i>, so the comma is doing its proper work; the third opens with <i>When</i>, so the first half cannot stand alone; and the fourth uses a semicolon, which is exactly the mark the splice was missing.' }),

    makeTF({ id:'g9eng-d7-050', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:3,
      question:'True or False: <i>Although the road was closed; we reached the airport on time.</i> uses the semicolon correctly.',
      answer:false,
      hint:'Read the words before the mark on their own and ask whether they make a sentence.',
      explanation:'False. <i>Although the road was closed</i> cannot stand alone, so there is nothing for the semicolon to join to. A subordinating word such as <i>although</i>, <i>because</i> or <i>when</i> calls for a <b>comma</b>, not a semicolon.' }),

    makeMCQ({ id:'g9eng-d7-051', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:4,
      question:'Which version presents the second fact as the <b>support</b> for the first rather than as a separate piece of news?',
      options:['The soil is poor; nothing has grown here for years.','The soil is poor. Nothing has grown here for years.','The soil is poor, but nothing has grown here for years.','The soil is poor, so nothing has grown here for years.'],
      answer:'The soil is poor; nothing has grown here for years.',
      hint:'Work out what relation each mark or joining word claims between the two facts.',
      explanation:'The semicolon binds the two statements into one thought, so the second reads as the evidence for the first. The full stop leaves them as two unconnected facts; <i>but</i> claims they conflict; and <i>so</i> reverses the direction, making the poor soil the cause rather than the claim being supported.' }),

    makeMCQ({ id:'g9eng-d7-052', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:4,
      question:'A comma splice can be mended in several ways. Which repair of <i>The shop was shut, we walked home.</i> states a <b>reason</b>?',
      options:['The shop was shut, so we walked home.','The shop was shut, but we walked home.','The shop was shut; we walked home.','The shop was shut. We walked home.'],
      answer:'The shop was shut, so we walked home.',
      hint:'Three of the repairs are silent about why the walk happened. Find the one that is not.',
      explanation:'Only <i>so</i> states outright that the shutting caused the walk. The semicolon and the full stop are both correct repairs, but they leave the reader to infer any connection, and <i>but</i> would claim the two facts sit oddly together. Mending a splice and explaining it are two different jobs.' }),

    makeTF({ id:'g9eng-d7-053', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:4,
      question:'True or False: replacing both semicolons with full stops in <i>Some pupils walk to school; others come by bus; a few cycle.</i> would leave three grammatically complete sentences.',
      answer:true,
      hint:'Try each of the three stretches on its own, giving it a capital letter and a full stop.',
      explanation:'True. <i>Some pupils walk to school.</i> <i>Others come by bus.</i> <i>A few cycle.</i> all stand alone, which is precisely why the semicolons are allowed. The writer keeps them in one sentence because the three facts are one comparison; that is a choice about reading, not about grammar.' }),

    makeMCQ({ id:'g9eng-d7-054', chapterId:'g9eng-gr-punctuation', subsection:'semicolon', difficulty:4,
      question:'Read: <i>The prizes went to Anil, the captain; Vishal, the goalkeeper; and Kiran.</i> How many people won a prize?',
      options:['Three','Four','Five','Six'],
      answer:'Three',
      hint:'The semicolons show where one item of the list ends, so count the items, not the commas.',
      explanation:'The semicolons divide the list into three items — <i>Anil, the captain</i>, <i>Vishal, the goalkeeper</i>, and <i>Kiran</i> — so <b>three</b> people won. Read with commas everywhere the same words would appear to name five, because <i>the captain</i> and <i>the goalkeeper</i> would look like winners in their own right. The count comes from the punctuation.' })

  );

})();
