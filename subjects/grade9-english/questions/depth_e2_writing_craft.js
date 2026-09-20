'use strict';
(function () {

  // ══════════════════════════════════════════════════════════════════════════
  //  g9eng-writing — four subsections: cohesion · register · spelling ·
  //  punctuation.  (planning, essay, descriptive, formal_letter and narrative
  //  belong to depth_e1_writing_forms.js and are not touched here.)
  //
  //  ⚠ NOTHING HERE ASKS A PUPIL TO PRODUCE EXTENDED WRITING, and nothing here
  //    presumes how extended writing will eventually be marked. Every item is
  //    settled either by a four-option choice or by ONE word (or a short fixed
  //    phrase) copied out of a draft printed in the stem, so no rubric, no model
  //    answer and no marking scheme is invented or implied. Each item teaches a
  //    COMPONENT of writing — which connector names the real relationship,
  //    where a draft slips out of its register, which word is misspelt, where a
  //    sentence should end.
  //
  //  ⚠ PUNCTUATION HERE IS A WRITER'S CHOICE INSIDE A DRAFT — where a sentence
  //    ends, whether a list needs commas, apostrophes and capitals in a piece of
  //    continuous writing. The isolated RULES (non-defining commas, quotation
  //    marks, dashes, semicolons) belong to g9eng-gr-punctuation and are covered
  //    by depth_e7_punctuation.js; nothing here repeats them.
  //
  //  ⚠ cohesion and register are the synonym trap. No option list below holds
  //    two interchangeable connectors: where a connector is a distractor it is
  //    of a DIFFERENT FUNCTION from every other connector on screen — a cause
  //    among consequences, a concession among additions. Checked against the
  //    GROUPS table in scripts/test-option-synonyms.js, from source.
  //
  //  ⚠ L4 in this pack is "Extended Analysis", not "Word Problems": an L4 item
  //    here judges a piece of writing, never recalls a rule.
  // ══════════════════════════════════════════════════════════════════════════

  STATIC_QUESTIONS.push(

    // ══ cohesion · 001–015 ════════════════════════════════════════════════

    makeMCQ({ id:'g9eng-d2-001', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:1,
      question:'In a paragraph, what is the job of a linking word such as <i>therefore</i>?',
      options:['It shows how two ideas connect','It makes the sentence longer','It shows the writer is polite','It tells the reader to stop'],
      answer:'It shows how two ideas connect',
      hint:'Ask what a reader would have to work out for themselves if the word were simply deleted.',
      explanation:'A linking word names the relationship between two ideas &mdash; result, contrast, addition &mdash; so the reader is told it rather than left to guess. It is not decoration: take it away and two true sentences sit side by side with nothing saying why the second follows the first.' }),

    makeTF({ id:'g9eng-d2-002', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:1,
      question:'True or False: a paragraph reads better when every sentence in it begins with the same linking word.',
      answer:false,
      hint:'Picture six sentences in a row all opening the same way, and ask what the reader learns from the sixth.',
      explanation:'False. A linking word earns its place by naming a particular relationship, so repeating one tells the reader nothing new after the first time and quickly sounds like a list. Vary the connector to fit each join, and use none at all where the sentences already follow plainly.' }),

    makeMCQ({ id:'g9eng-d2-003', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:1,
      question:'Which word signals that the next idea will go <b>against</b> the one before it?',
      options:['However','Therefore','Besides','Meanwhile'],
      answer:'However',
      hint:'Three of these carry the reader forward in agreement. One turns them round.',
      explanation:'<i>However</i> warns the reader that what follows will cut across what came before. <i>Therefore</i> announces a result, <i>Besides</i> adds a further point on the same side, and <i>Meanwhile</i> only says that two things happened at once &mdash; none of the three sets up an opposition.' }),

    makeMCQ({ id:'g9eng-d2-004', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:1,
      question:'Read this draft: <p>The club planted forty saplings along the canal. <b>They</b> are already a metre high.</p> What does <i>They</i> refer back to?',
      options:['The forty saplings','The club members','The canal banks','The garden tools'],
      answer:'The forty saplings',
      hint:'Ask which noun in the first sentence could sensibly be a metre high.',
      explanation:'A pronoun holds a paragraph together by pointing back to a noun the reader has already met, and only the saplings can be a metre high. The club members are people and the banks are not planted, so neither reading makes sense &mdash; which is exactly the test a writer should apply before leaving a pronoun in place.' }),

    makeMCQ({ id:'g9eng-d2-005', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:1,
      question:'When should a writer begin a new paragraph?',
      options:['When the topic changes','When the page is full','When a name is used','When a line ends'],
      answer:'When the topic changes',
      hint:'Think about what a paragraph break tells the reader, rather than about how the page looks.',
      explanation:'A paragraph break is a signal that one idea has finished and another is starting, so it belongs where the topic turns. Breaking because the page has filled up cuts an idea in half, and the reader reads the break as meaning something the writer never intended.' }),

    makeMCQ({ id:'g9eng-d2-006', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:2,
      question:'Choose the word that fits the gap: <p>The rain had washed the path away. ______, the walk was called off.</p>',
      options:['Therefore','For example','In contrast','Meanwhile'],
      answer:'Therefore',
      hint:'Work out the real relationship first &mdash; is the second fact a result, an illustration, an opposite or something happening at the same time?',
      explanation:'Calling off the walk is the consequence of the path being washed away, and <i>Therefore</i> is the word for a consequence. <i>For example</i> would promise an illustration of the first fact, <i>In contrast</i> would promise the opposite of it, and <i>Meanwhile</i> would claim the two things merely happened together.' }),

    makeText({ id:'g9eng-d2-007', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:2,
      question:'Read this draft: <p>The tank was already full. Nevertheless, the pump kept running all night.</p> Write the ONE word that tells the reader the second fact goes against the first.',
      answer:'Nevertheless',
      hint:'Only one word in the draft is there to join the two sentences rather than to carry information.',
      explanation:'<i>Nevertheless</i> is the signpost: it tells the reader that what follows is surprising given what came before. Without it the two sentences are still true, but the reader has to work out the clash unaided, and a marker cannot see that the writer noticed it.' }),

    makeMCQ({ id:'g9eng-d2-008', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:2,
      question:'These four sentences are to make one paragraph about a clean-up. Which one belongs first?',
      options:['Our class decided to clean the beach','We had filled nine bags before noon','Afterwards we counted what we had','The next Saturday we went again'],
      answer:'Our class decided to clean the beach',
      hint:'Ask which sentence the other three would make no sense without.',
      explanation:'The paragraph has to establish what was done before it can report bags, counting or a second visit, so the decision comes first. <i>Afterwards</i> and <i>The next Saturday</i> both point backwards to something earlier, which is itself the proof that neither can open the paragraph.' }),

    makeMCQ({ id:'g9eng-d2-009', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:2,
      question:'Read: <p>Mrs Appadoo opened the library at seven. Mrs Appadoo shelved the returns. Mrs Appadoo unlocked the reading room.</p> What is the clearest improvement?',
      options:['Replace two of the names with she','Join all three sentences with and','Move the last sentence to the front','Cut the third sentence altogether'],
      answer:'Replace two of the names with she',
      hint:'The name is correct every time. Ask what repeating it does to the reader.',
      explanation:'Once a noun has been named, a pronoun keeps the thread without restating it, and three identical subjects in a row read as though three different people were meant. Joining all three with <i>and</i> makes one long breathless sentence, and cutting the third simply loses information.' }),

    makeTF({ id:'g9eng-d2-010', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:2,
      question:'True or False: a pronoun such as <i>it</i> only holds a paragraph together when the reader can tell exactly which noun it stands for.',
      answer:true,
      hint:'Imagine a sentence with two possible nouns behind the pronoun, and ask what the reader does next.',
      explanation:'True. A pronoun is a link only while the noun at the other end of it is certain. Where two nouns could both fit &mdash; <i>The lorry hit the wall and it was badly damaged</i> &mdash; the reader stops to choose, and a link the reader has to puzzle over is doing the opposite of its job.' }),

    makeMCQ({ id:'g9eng-d2-011', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:2,
      question:'You have given one reason for your view and want to add a second one of the same kind. Which word opens that sentence?',
      options:['Furthermore','Even though','As a result','Instead of'],
      answer:'Furthermore',
      hint:'Decide first what the second reason is doing &mdash; piling up, conceding, following on, or replacing.',
      explanation:'<i>Furthermore</i> announces one more point on the same side, which is exactly what a second reason is. <i>Even though</i> would concede ground to the other view, <i>As a result</i> would make the second reason a consequence of the first, and <i>Instead of</i> would withdraw the first reason altogether.' }),

    makeMCQ({ id:'g9eng-d2-012', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:3,
      question:'A pupil writes: <p>The stadium was packed. <b>However</b>, thousands more waited outside the gates.</p> Why is the linking word wrong here?',
      options:['The two facts agree rather than clash','The word is far too formal for a report','The word should come after the main verb','The sentence has a full stop already'],
      answer:'The two facts agree rather than clash',
      hint:'Read the two facts without the linking word and ask whether the second one is a surprise.',
      explanation:'A packed stadium and a crowd left outside are the same story told twice, so there is nothing for <i>However</i> to oppose &mdash; a word such as <i>Indeed</i> would fit. <i>However</i> is perfectly formal enough for a report; the fault is that it names a relationship the two sentences do not have.' }),

    makeText({ id:'g9eng-d2-013', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:3,
      question:'Read this draft: <p>Traffic was blocked from six in the morning. Similarly, many pupils arrived late.</p> The linking word names the wrong relationship. Write ONE word that should replace it so the second fact reads as the <b>result</b> of the first.',
      answer:'Therefore', alsoAccept:['So','Consequently','Thus','Hence'],
      hint:'The two facts are not alike; one produced the other. Name that relationship.',
      explanation:'<i>Similarly</i> claims the two facts are examples of the same thing, when in fact the blocked traffic caused the late arrivals. A consequence word &mdash; <i>Therefore</i>, <i>So</i>, <i>Consequently</i> &mdash; says so. Choosing a connector is choosing what you claim about the two ideas, which is why the wrong one misreports the facts even when both sentences are true.' }),

    makeMCQ({ id:'g9eng-d2-014', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:4,
      question:'A pupil means to praise a scheme. The draft reads: <p>The bus pass has saved every family in the village money. <b>Unfortunately</b>, three hundred pupils now reach school on time.</p> What has gone wrong?',
      options:['One linking word contradicts the praise','The second fact is put in the past tense','The paragraph names far too many villages','The two sentences are much the same length'],
      answer:'One linking word contradicts the praise',
      hint:'Cover everything except the joining word, then ask whether the writer sounds pleased or sorry.',
      explanation:'Both facts are good news, but <i>Unfortunately</i> tells the reader the second one is a regrettable side effect, so the paragraph argues against the writer\'s own point. A single connector can reverse the meaning of a whole paragraph without a single fact being wrong &mdash; which is why a draft is worth rereading for its joins alone.' }),

    makeMCQ({ id:'g9eng-d2-015', chapterId:'g9eng-writing', subsection:'cohesion', difficulty:4,
      question:'A three-paragraph article opens its <b>second</b> paragraph with <i>Finally,</i>. What does that do to a reader?',
      options:['It promises an ending that does not come','It warns them that a new topic begins','It tells them to reread the first part','It shows them the writer is in a hurry'],
      answer:'It promises an ending that does not come',
      hint:'Ask what the reader expects to happen immediately after that word, and what actually happens.',
      explanation:'Ordering words are a promise about the shape of the whole piece: <i>Finally</i> says nothing more follows, so a third paragraph arrives after the reader has already been told the article is over. The word is not wrong in itself &mdash; it is in the wrong position, and a reader trusts these signposts more than the writer expects.' }),

    // ══ register · 016–027 ════════════════════════════════════════════════

    makeMCQ({ id:'g9eng-d2-016', chapterId:'g9eng-writing', subsection:'register', difficulty:1,
      question:'What does a writer mean by the <i>register</i> of a piece of writing?',
      options:['How formal or informal it sounds','How many paragraphs it contains','How neat the handwriting looks','How long the sentences are made'],
      answer:'How formal or informal it sounds',
      hint:'Think about what changes when the same news is given to a friend and to a head teacher.',
      explanation:'Register is the level of formality a piece takes, set by its purpose and its reader. It is carried by word choice, by greetings and by whether words are shortened, and it is judged separately from whether the writing is neat or the sentences long.' }),

    makeTF({ id:'g9eng-d2-017', chapterId:'g9eng-writing', subsection:'register', difficulty:1,
      question:'True or False: a message to a close friend and a letter to a government office may be written in exactly the same style.',
      answer:false,
      hint:'Ask who is going to read each one, and what each reader expects.',
      explanation:'False. The reader and the purpose decide the style, and those two readers expect different things: a friend expects warmth and shortened forms, an office expects a neutral, complete sentence it can act on. Using one style for both makes the letter sound rude, or the message sound cold.' }),

    makeMCQ({ id:'g9eng-d2-018', chapterId:'g9eng-writing', subsection:'register', difficulty:2,
      question:'Which sentence suits a notice pinned on the school notice board?',
      options:['Pupils must return all library books by Friday.','Anyone still holding library books, bring em Friday.','Hey everyone, library books back by Friday please!','U gotta bring back all the library books by Friday.'],
      answer:'Pupils must return all library books by Friday.',
      hint:'A notice is read by pupils you have never met, so decide what tone a stranger should meet.',
      explanation:'A notice addresses the whole school, so it states the instruction plainly and in full, with no shortened spellings and no greeting aimed at friends. The other three are all perfectly clear; they simply speak to a reader the writer already knows, which a public notice can never assume.' }),

    makeText({ id:'g9eng-d2-019', chapterId:'g9eng-writing', subsection:'register', difficulty:2,
      question:'A pupil drafts a letter to the head teacher: <p>I am writing about the broken window in Room 12. It has been like that for ages and the room is very cold in the morning.</p> One word is too informal for a letter of this kind. Write that ONE word.',
      answer:'ages',
      hint:'Look for the word you would use talking to a friend at break, not writing to a teacher.',
      explanation:'<i>Ages</i> is spoken exaggeration, and it is also vague: a letter asking for a repair is stronger with a real span of time, such as <i>since March</i>. Everything else in the draft is already neutral and complete, which is why the single casual word stands out so sharply.' }),

    makeMCQ({ id:'g9eng-d2-020', chapterId:'g9eng-writing', subsection:'register', difficulty:2,
      question:'A formal report is being written up for the school magazine. What should be done with shortened forms such as <i>don\'t</i> and <i>can\'t</i>?',
      options:['Write them out in full as two words','Keep them, but underline each one','Replace them with question marks','Move them to the end of the line'],
      answer:'Write them out in full as two words',
      hint:'Think about whether shortened forms belong to speech or to formal writing.',
      explanation:'Shortened forms are the sound of speech, so a formal report uses <i>do not</i> and <i>cannot</i> instead. Underlining them would only draw attention to the wrong register, and the position of a word on the line has nothing to do with how formal it sounds.' }),

    makeMCQ({ id:'g9eng-d2-021', chapterId:'g9eng-writing', subsection:'register', difficulty:2,
      question:'The same school trip must be described twice: once for Grade 1 pupils and once for the school magazine. What has to change between the two?',
      options:['The words chosen and the sentence length','The facts about where the trip actually went','The date on which the trip happened','The number of pupils who went along'],
      answer:'The words chosen and the sentence length',
      hint:'One of these four is the only thing a writer is free to change when the reader changes.',
      explanation:'Style follows the reader: six-year-olds need short sentences and everyday words, while the magazine can carry longer ones. What must not change is the information &mdash; a writer who alters the date, the place or the numbers to suit an audience is no longer reporting the same trip.' }),

    makeMCQ({ id:'g9eng-d2-022', chapterId:'g9eng-writing', subsection:'register', difficulty:3,
      question:'A letter to a company begins <i>I am writing to enquire about the vacancy advertised on Saturday.</i> and ends <i>Anyway, get back to me soon, yeah?</i> What is the fault?',
      options:['The ending drops into casual speech','The opening is too short to be clear','The letter names the wrong weekday','The letter asks for two things at once'],
      answer:'The ending drops into casual speech',
      hint:'Read the first sentence and the last one aloud, one after the other, and ask whether one person wrote both.',
      explanation:'The opening is exactly right, which is what makes the ending so costly: <i>Anyway</i>, <i>get back to me</i> and <i>yeah</i> all belong to conversation, and the reader is left with the last impression rather than the first. A register has to be held to the end of a piece, and the closing line is where it slips most often.' }),

    makeText({ id:'g9eng-d2-023', chapterId:'g9eng-writing', subsection:'register', difficulty:3,
      question:'A pupil is turning rough notes into a formal report. The draft reads: <p>The team didn\'t reach the final because two players were injured.</p> Write the TWO words that should replace the shortened form.',
      answer:'did not', alsoAccept:['didnot'],
      hint:'Formal writing spells out in full what speech runs together into one word.',
      explanation:'A report avoids shortened forms, so <i>didn\'t</i> is written out as <i>did not</i>. Nothing else in the sentence needs changing: the facts, the order and the linking word are all fine, and the single shortened form is the only thing marking the draft as speech rather than writing.' }),

    makeMCQ({ id:'g9eng-d2-024', chapterId:'g9eng-writing', subsection:'register', difficulty:3,
      question:'A pupil is reporting a football result for the school magazine, not writing an opinion column. Which sentence fits that purpose?',
      options:['Beau Bassin won the match by two goals.','Beau Bassin absolutely destroyed the other side.','Beau Bassin were miles better than all the rest.','Beau Bassin were robbed of a third goal, sadly.'],
      answer:'Beau Bassin won the match by two goals.',
      hint:'A report tells the reader what happened; ask which sentence adds the writer\'s feelings to it.',
      explanation:'A result is reported neutrally, so the score is given and the judging is left to the reader. <i>Destroyed</i>, <i>miles better</i> and <i>robbed</i> are all opinions dressed as facts, and they belong in a column where the writer\'s view is what the reader came for.' }),

    makeMCQ({ id:'g9eng-d2-025', chapterId:'g9eng-writing', subsection:'register', difficulty:4,
      question:'A letter of complaint about a late delivery sets the dates out correctly, then adds <i>Your staff clearly do not care about anyone.</i> Why does the letter weaken its own case?',
      options:['An insult invites a defence, not a repair','The dates are given in the wrong order','A complaint should never name the staff','The letter is far too short to be read'],
      answer:'An insult invites a defence, not a repair',
      hint:'Ask what the person reading the letter will do first after that sentence.',
      explanation:'The facts were doing the work until that line, and an accusation about people makes the reader defend their staff instead of acting on the dates. A complaint is stronger when the tone stays neutral and the evidence is allowed to be the complaint; the fault is the insult, not the length or the order.' }),

    makeMCQ({ id:'g9eng-d2-026', chapterId:'g9eng-writing', subsection:'register', difficulty:4,
      question:'A pupil writes to a close friend: <i>I wish to inform you that I shall be unable to attend your birthday celebration.</i> What is wrong with it?',
      options:['It sounds cold to the person it is for','It gives no reason for missing the day','It uses the wrong tense all the way through','It is written in the first person only'],
      answer:'It sounds cold to the person it is for',
      hint:'The sentence is faultless English. Ask who is going to read it, and how they will feel.',
      explanation:'Every word is correct, which is the point: <i>wish to inform</i> and <i>unable to attend</i> belong to an office letter, and used to a friend they put a distance between the writer and the reader that the writer never meant. Register can be too high as easily as too low, and the mistake is harder to see because nothing is wrong.' }),

    makeMCQ({ id:'g9eng-d2-027', chapterId:'g9eng-writing', subsection:'register', difficulty:4,
      question:'Two openings for a letter asking a shopkeeper to sponsor a school event:<p><b>A</b> &mdash; We are writing to ask whether your shop would support our sports day.<br><b>B</b> &mdash; Our sports day needs money and your shop is the nearest one.</p> Which opening is more likely to succeed, and why?',
      options:['A &mdash; it asks rather than assumes','B &mdash; it comes to the point faster','A &mdash; it is the longer of the two','B &mdash; it names the shop\'s position'],
      answer:'A &mdash; it asks rather than assumes',
      hint:'Read B from the shopkeeper\'s side of the counter before choosing.',
      explanation:'A leaves the shopkeeper a decision to make, and being asked is what makes a yes possible. B states a need and a convenience, so the reader is treated as the nearest source of money rather than as someone whose help is worth having. A does not win for being longer &mdash; a short polite request would work just as well.' }),

    // ══ spelling · 028–044 ════════════════════════════════════════════════

    makeText({ id:'g9eng-d2-028', chapterId:'g9eng-writing', subsection:'spelling', difficulty:1,
      question:'One word in this draft is misspelt: <p>We were all very greatful for the lift home after the match.</p> Write that word correctly.',
      answer:'grateful',
      hint:'Say the first part of the word aloud and ask which of two everyday words it really begins with.',
      explanation:'The word is <i>grateful</i>: it comes from <i>gratitude</i>, not from <i>great</i>, so there is no <i>e</i> after the <i>gr</i>. The misspelling survives because it looks like a word that exists, which is exactly the kind of error a quick read-through misses and a slow one catches.' }),

    makeMCQ({ id:'g9eng-d2-029', chapterId:'g9eng-writing', subsection:'spelling', difficulty:1,
      question:'A pupil is writing about two classes that will work apart from each other. Which spelling is correct?',
      options:['separate','seperate','separete','seperete'],
      answer:'separate',
      hint:'There is an everyday word hidden in the middle of the correct spelling: think of what you do to a rope.',
      explanation:'It is <i>separate</i> &mdash; remember the <i>par</i> in the middle, as in <i>part</i>, because that is where the word comes from. The <i>e</i> spellings are all written from the sound alone, and the middle vowel is the one an English speaker cannot hear.' }),

    makeText({ id:'g9eng-d2-030', chapterId:'g9eng-writing', subsection:'spelling', difficulty:1,
      question:'One word in this draft is misspelt: <p>Our netball team was very succesful this season.</p> Write that word correctly.',
      answer:'successful',
      hint:'Count the letters you can hear against the letters the word actually needs in the middle.',
      explanation:'It is <i>successful</i>: two <i>c</i>s, two <i>s</i>s in the middle and only one <i>l</i> at the end. Speech runs the double letters together so they are easy to drop, and this is a word worth learning letter by letter rather than by sound.' }),

    makeMCQ({ id:'g9eng-d2-031', chapterId:'g9eng-writing', subsection:'spelling', difficulty:1,
      question:'Which spelling belongs in this draft sentence: <p>The rehearsals are ______ next week.</p>',
      options:['beginning','begining','beggining','beginnning'],
      answer:'beginning',
      hint:'Only one letter in this word is doubled. Work out which one, and then leave the other single.',
      explanation:'It is <i>beginning</i>: the <i>n</i> doubles because the stress falls on the last syllable of <i>begin</i>, and the <i>g</i> stays single. Doubling the wrong letter, or doubling both, is the commonest way this word goes wrong in a hurried draft.' }),

    makeText({ id:'g9eng-d2-032', chapterId:'g9eng-writing', subsection:'spelling', difficulty:2,
      question:'One word in this draft is misspelt: <p>I will definately be at the meeting on Tuesday afternoon.</p> Write that word correctly.',
      answer:'definitely',
      hint:'Find the shorter word inside it &mdash; the one that means fixed or settled &mdash; and spell that part first.',
      explanation:'It is <i>definitely</i>, built on <i>finite</i>: <i>de-finite-ly</i>. The <i>a</i> spelling comes from saying the word quickly, and breaking a long word into the smaller word inside it is the most reliable way to spell it right in a draft.' }),

    makeText({ id:'g9eng-d2-033', chapterId:'g9eng-writing', subsection:'spelling', difficulty:2,
      question:'One word in this draft is misspelt: <p>The gate was locked, so we turned back immediatly.</p> Write that word correctly.',
      answer:'immediately',
      hint:'Build it from the adjective first, then add the usual adverb ending without removing anything.',
      explanation:'<i>Immediate</i> plus <i>-ly</i> gives <i>immediately</i>, and the <i>e</i> of the adjective stays. Dropping it is a slip of the ear rather than of the rule: nothing in English tells you to cut a letter before <i>-ly</i>, so keeping the whole adjective is the safe habit.' }),

    makeMCQ({ id:'g9eng-d2-034', chapterId:'g9eng-writing', subsection:'spelling', difficulty:2,
      question:'Which spelling completes this draft sentence: <p>Finishing the whole job in one morning was not ______.</p>',
      options:['possible','possable','possibal','posible'],
      answer:'possible',
      hint:'Two endings sound the same in speech. Decide which of them this particular word takes.',
      explanation:'It is <i>possible</i>, with double <i>s</i> and the <i>-ible</i> ending. <i>-able</i> and <i>-ible</i> sound identical, so they cannot be told apart by ear; the words taking <i>-ible</i> are a shortish list &mdash; <i>possible</i>, <i>terrible</i>, <i>visible</i>, <i>sensible</i> &mdash; and are worth learning together.' }),

    makeText({ id:'g9eng-d2-035', chapterId:'g9eng-writing', subsection:'spelling', difficulty:2,
      question:'One word in this draft is misspelt: <p>The prize giving is the biggest ocasion in the school year.</p> Write that word correctly.',
      answer:'occasion',
      hint:'One consonant in this word is doubled and one is not. Decide which is which before you write it.',
      explanation:'It is <i>occasion</i>: double <i>c</i>, single <i>s</i>. The pattern is worth noticing because the temptation runs the other way &mdash; writers who remember that something is doubled often double the wrong letter and produce <i>ocassion</i>.' }),

    makeText({ id:'g9eng-d2-036', chapterId:'g9eng-writing', subsection:'spelling', difficulty:2,
      question:'In this draft one word is spelt as a different word with the same sound: <p>The visitors left there umbrellas by the door.</p> Write the word that should be used instead.',
      answer:'their',
      hint:'Ask whose umbrellas they were, and choose the spelling that shows belonging.',
      explanation:'The umbrellas belong to the visitors, so the word needed is <i>their</i>. <i>There</i> is about place, as in <i>over there</i>, and a spellchecker cannot help because both are real words &mdash; only reading the sentence for its meaning will catch it.' }),

    makeMCQ({ id:'g9eng-d2-037', chapterId:'g9eng-writing', subsection:'spelling', difficulty:2,
      question:'A shopping list in a draft needs the plural of <i>potato</i>. Which spelling is correct?',
      options:['potatoes','potatos','potatoe','pottatoes'],
      answer:'potatoes',
      hint:'Look at the letter the singular ends with, and recall what that ending usually adds in the plural.',
      explanation:'A noun ending in a consonant plus <i>o</i> takes <i>-es</i>, giving <i>potatoes</i> &mdash; and so <i>tomatoes</i> and <i>heroes</i>. <i>Potatoe</i> is the singular with a stray <i>e</i> and is not a plural at all, which is why the error looks so convincing on the page.' }),

    makeText({ id:'g9eng-d2-038', chapterId:'g9eng-writing', subsection:'spelling', difficulty:2,
      question:'One word in this draft is misspelt: <p>The inter-school debate is held every Febuary.</p> Write that word correctly.',
      answer:'February',
      hint:'Say the month slowly and listen for a letter most speakers swallow.',
      explanation:'It is <i>February</i>, with an <i>r</i> after the <i>b</i> that almost nobody pronounces. Months and days are worth checking in any draft for this reason, and they need their capital letter as well, which the misspelling here happens to have kept.' }),

    makeText({ id:'g9eng-d2-039', chapterId:'g9eng-writing', subsection:'spelling', difficulty:3,
      question:'One word in this draft is misspelt: <p>Neither side would give way, and the arguement lasted an hour.</p> Write that word correctly.',
      answer:'argument',
      hint:'Start from the verb, then add the ending &mdash; and check whether any letter has to go.',
      explanation:'<i>Argue</i> loses its <i>e</i> before <i>-ment</i>, giving <i>argument</i>. It is an exception worth knowing, because most words keep the <i>e</i> there (<i>amusement</i>, <i>excitement</i>), so the reasonable guess is the wrong one and only the exception itself will do.' }),

    makeMCQ({ id:'g9eng-d2-040', chapterId:'g9eng-writing', subsection:'spelling', difficulty:3,
      question:'A pupil is describing a hall in a draft and needs the word for the surface above them. Which spelling is correct?',
      options:['ceiling','cieling','celling','cealing'],
      answer:'ceiling',
      hint:'The usual rhyme has an exception for what follows one particular letter.',
      explanation:'The rhyme is <i>i</i> before <i>e</i> except after <i>c</i>, and <i>ceiling</i> is the exception in action: the <i>c</i> is followed by <i>ei</i>. Writing <i>cieling</i> applies the first half of the rule and forgets the second, which is why the rhyme is only useful when the whole of it is remembered.' }),

    makeText({ id:'g9eng-d2-041', chapterId:'g9eng-writing', subsection:'spelling', difficulty:3,
      question:'One word in this draft is misspelt: <p>The club works to protect the enviroment around the lagoon.</p> Write that word correctly.',
      answer:'environment',
      hint:'Listen for a letter between the two middle syllables that speech runs over.',
      explanation:'It is <i>environment</i>, with an <i>n</i> before the <i>m</i> &mdash; it is built on <i>environ</i>, meaning to surround. The misspelling matches how the word is usually said, and it is one of the most frequent errors in school writing on exactly that account.' }),

    makeMCQ({ id:'g9eng-d2-042', chapterId:'g9eng-writing', subsection:'spelling', difficulty:3,
      question:'One word in this draft is misspelt: <p>The committee recommended a seperate entrance for visitors.</p> Which word is it?',
      options:['seperate','committee','recommended','entrance'],
      answer:'seperate',
      hint:'Three of these four long words are already right, so check each one letter by letter rather than by sound.',
      explanation:'<i>Seperate</i> should be <i>separate</i>, with <i>par</i> in the middle. The other three are correct as they stand, and they are there because they look difficult: <i>committee</i> with its three doubled letters and <i>recommended</i> with one <i>c</i> and two <i>m</i>s are both easy to doubt when nothing is wrong with them.' }),

    makeMCQ({ id:'g9eng-d2-043', chapterId:'g9eng-writing', subsection:'spelling', difficulty:4,
      question:'A draft reads: <p>The new timetable had a good affect on attendance.</p> The pupil checked the spelling on a computer and nothing was flagged. Why not?',
      options:['Both spellings are real English words','The word sits at the end of a line','The sentence is too short to check','The word has fewer than seven letters'],
      answer:'Both spellings are real English words',
      hint:'Ask what a spellchecker is actually able to compare a word against.',
      explanation:'A spellchecker matches words against a list, and <i>affect</i> is on it &mdash; as a verb meaning to influence. The noun needed here is <i>effect</i>, so the sentence is wrong in a way no list can see: pairs like this have to be checked by asking what the word is doing in the sentence, which is a reading, not a lookup.' }),

    makeMCQ({ id:'g9eng-d2-044', chapterId:'g9eng-writing', subsection:'spelling', difficulty:4,
      question:'Two drafts of one sentence:<p><b>A</b> &mdash; The mayor complimented the new library.<br><b>B</b> &mdash; The mayor complemented the new library.</p> Which draft says the mayor praised it, and why?',
      options:['A &mdash; a compliment is praise','B &mdash; a complement is praise','Both drafts say exactly the same','Neither spelling is a real word'],
      answer:'A &mdash; a compliment is praise',
      hint:'One of the two words is about kind things said; the other is about two things that go together.',
      explanation:'A <i>compliment</i> is praise, so draft A is the one meant. To <i>complement</i> something is to complete or set it off, so B says the mayor somehow improved the library by being near it. Both are real words and both fit the grammar, which is why only the meaning can decide between them.' }),

    // ══ punctuation in writing · 045–060 ══════════════════════════════════
    // ⚠ A WRITER'S CHOICES INSIDE A DRAFT, not the isolated rules. The
    //   non-defining comma, quotation marks, dashes and semicolons live in
    //   g9eng-gr-punctuation (depth_e7_punctuation.js) and are not repeated.

    makeMCQ({ id:'g9eng-d2-045', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:1,
      question:'In a piece of continuous writing, what shows a reader that one sentence has ended and another has begun?',
      options:['A full stop and a capital letter','A comma and then a small letter','A slightly wider gap between words','A fresh line started on the page'],
      answer:'A full stop and a capital letter',
      hint:'Think about which two marks always work as a pair at a sentence boundary.',
      explanation:'The pair does the work: the full stop closes one sentence and the capital opens the next, so the reader is never in doubt. A comma is too weak to end a sentence, and a wider gap or a new line is a matter of layout that tells the reader nothing about grammar.' }),

    makeText({ id:'g9eng-d2-046', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:1,
      question:'In this draft one word still needs its capital letter: <p>We spent the whole of the August holidays with my cousins in rodrigues.</p> Write that word correctly.',
      answer:'Rodrigues',
      hint:'Find the word that names one particular place rather than a kind of thing.',
      explanation:'<i>Rodrigues</i> is the name of one particular island, so it takes a capital wherever it appears in a sentence. <i>August</i> already has its capital for the same reason, and <i>holidays</i> and <i>cousins</i> correctly have none, because neither names one specific thing.' }),

    makeMCQ({ id:'g9eng-d2-047', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:2,
      question:'A draft reads: <p>We reached the beach at seven the tide was already high.</p> What does it need?',
      options:['A full stop after seven','A comma after the word high','A question mark at the end','A capital letter on reached'],
      answer:'A full stop after seven',
      hint:'Read it aloud and find the point where one complete statement has finished.',
      explanation:'Two complete statements have been run into one line, and the first ends at <i>seven</i>, so that is where the full stop belongs &mdash; with a capital <i>T</i> on <i>The</i> after it. A comma there would leave the two statements joined by too weak a mark, and nothing in the line is a question.' }),

    makeText({ id:'g9eng-d2-048', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:2,
      question:'This draft has run two sentences together: <p>The rain stopped just before noon we walked home along the canal.</p> Write the ONE word that the second sentence should begin with.',
      answer:'we',
      hint:'Find where the first complete statement finishes, then look at the very next word.',
      explanation:'The first statement ends at <i>noon</i>, so the second begins at <i>we</i> &mdash; which needs a capital <i>W</i> once the full stop is in place. Finding the first word of the new sentence is the quickest way to fix a run-on, because the mark then has only one place it can go.' }),

    makeMCQ({ id:'g9eng-d2-049', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:2,
      question:'A notice lists what pupils should bring on a walk. Which version is punctuated correctly?',
      options:['Bring a hat, a bottle and a towel.','Bring a hat a bottle and a towel.','Bring a hat, a bottle, and, a towel.','Bring, a hat, a bottle and a towel.'],
      answer:'Bring a hat, a bottle and a towel.',
      hint:'Work out how many items there are, and then how many marks are needed to keep them apart.',
      explanation:'Three items need one comma between the first two, with <i>and</i> doing the work before the last. Leaving every comma out runs the items together, and a comma after <i>Bring</i> or after <i>and</i> cuts the sentence at a point where nothing needs separating.' }),

    makeText({ id:'g9eng-d2-050', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:2,
      question:'This draft needs one apostrophe: <p>The choirs first concert of the year is on Sunday evening.</p> Write the word that needs it, with the apostrophe in place.',
      answer:'choir\'s',
      hint:'Decide whether the word is naming more than one thing, or naming something that belongs to one thing.',
      explanation:'The concert belongs to the choir, so the possessive <i>choir\'s</i> is needed. Written without the mark the word reads as a plural &mdash; more than one choir &mdash; and the sentence then has no subject that makes sense, which is how a missing apostrophe changes meaning rather than merely looking untidy.' }),

    makeMCQ({ id:'g9eng-d2-051', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:2,
      question:'Which version of this draft sentence is correct: <p>The library has lost ______ only copy of the atlas.</p>',
      // ⚠ 'it&rsquo;s' was a fourth option here and RENDERS IDENTICALLY to
      //   'it\'s' — two options a child cannot tell apart. Replaced with the
      //   expansion, which the explanation already walks through.
      options:['its','it\'s','its\'','it is'],
      answer:'its',
      hint:'Try reading the sentence with <i>it is</i> in the gap, and see whether it still makes sense.',
      explanation:'The copy belongs to the library, and the possessive of <i>it</i> takes no apostrophe: <i>its</i>. <i>It\'s</i> is only ever short for <i>it is</i> or <i>it has</i>, which would give <i>the library has lost it is only copy</i>, and <i>its\'</i> is not a form English uses at all.' }),

    makeMCQ({ id:'g9eng-d2-052', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:2,
      question:'A draft reads: <p>After the long walk home in the heat we drank two jugs of water.</p> Where does a comma help the reader most?',
      options:['After the word heat','After the word walk','After the word drank','After the word water'],
      answer:'After the word heat',
      hint:'Find where the opening phrase stops and the main statement starts.',
      explanation:'The opening phrase runs to <i>heat</i>, and a comma there tells the reader that the main statement is about to begin. Put after <i>walk</i> it breaks the phrase in half, after <i>drank</i> it separates a verb from what follows it, and after <i>water</i> there is already a full stop.' }),

    makeMCQ({ id:'g9eng-d2-053', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:3,
      question:'A notice is being drafted for the door of a room used by all the boys in the school. Which version is correct?',
      options:['Boys&rsquo; Changing Room','Boy&rsquo;s Changing Room','Boys&rsquo;s Changing Room','Boys Changing&rsquo; Room'],
      answer:'Boys&rsquo; Changing Room',
      hint:'Count how many boys use it, then decide where the mark goes in relation to the plural ending.',
      explanation:'The room belongs to more than one boy, so the apostrophe follows the plural <i>s</i>: <i>Boys\'</i>. <i>Boy\'s</i> would give the room to a single boy, and a second <i>s</i> after the mark is never added to a plural that already ends in one.' }),

    makeMCQ({ id:'g9eng-d2-054', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:3,
      question:'A pupil is proofreading this line of a report: <p>The inspector asked whether the fire exit had been checked</p> Which mark ends it, and why?',
      options:['A full stop, because nobody is being asked','A question mark, because a query is reported','A question mark, because asked is in the line','An exclamation mark, because it is a warning'],
      answer:'A full stop, because nobody is being asked',
      hint:'Ask whether the sentence itself puts a question to the reader, or only tells you that a question was put to somebody else.',
      explanation:'The sentence reports a question rather than asking one, so it is a statement and takes a full stop. A question mark belongs only where the words themselves ask &mdash; <i>Has the fire exit been checked?</i> &mdash; and the presence of the verb <i>asked</i> is not what decides it.' }),

    makeText({ id:'g9eng-d2-055', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:3,
      question:'All the marks have been left out of this draft: <p>the gate was open we went in nobody stopped us</p> How many full stops does it need? Write the number as a word.',
      answer:'three', alsoAccept:['3'],
      hint:'Count the complete statements first; each one closes with a mark of its own, the last one included.',
      explanation:'There are three complete statements &mdash; the gate was open, we went in, nobody stopped us &mdash; so three full stops, including one at the very end. Counting statements before inserting marks is what stops a proofreader running two of them together with a comma instead.' }),

    makeMCQ({ id:'g9eng-d2-056', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:3,
      question:'A pupil ends five sentences in a row of a story with an exclamation mark. What does that do?',
      options:['It leaves nothing for a real shock','It makes the story sound formal','It shows the writer is well read','It slows the story down too much'],
      answer:'It leaves nothing for a real shock',
      hint:'Ask what the sixth exclamation mark can still tell a reader that the first five have not.',
      explanation:'An exclamation mark works by being rare: it marks the one moment that is louder than the rest. Used on everything it stops marking anything, and the reader simply reads past it &mdash; so the mark is spent before the story reaches the part that needed it.' }),

    makeMCQ({ id:'g9eng-d2-057', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:3,
      question:'In a story draft, two characters speak one after the other. What should the writer do on the page?',
      options:['Start a new line for each speaker','Keep both speeches in one paragraph','Put the second speech in brackets','Write both speeches without any marks'],
      answer:'Start a new line for each speaker',
      hint:'Think about how a reader works out who is talking when no name is given.',
      explanation:'A new line for each new speaker is how a reader follows a conversation, and it often makes naming the speaker unnecessary. Both speeches in one paragraph leave the reader guessing where one voice stops, and brackets mark an aside rather than a second speaker.' }),

    makeMCQ({ id:'g9eng-d2-058', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:3,
      question:'A pupil is drafting a notice and wants to introduce a list of three items after a full statement. Which mark belongs at that point?',
      options:['A colon','A comma','A full stop','A question mark'],
      answer:'A colon',
      hint:'One of these marks exists to tell the reader that what they have just read is about to be spelled out.',
      explanation:'A colon announces that a list or an explanation follows, which is precisely what is wanted after a complete statement. A comma is too weak to make the announcement and a full stop closes the statement off, leaving the list standing on its own with nothing to attach it to.' }),

    makeMCQ({ id:'g9eng-d2-059', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:4,
      question:'Two drafts of one sentence:<p><b>A</b> &mdash; While the kettle boiled, Mother cut the bread.<br><b>B</b> &mdash; While the kettle boiled Mother, cut the bread.</p> Which draft is right, and what has the other one done?',
      options:['A &mdash; B makes Mother part of the boiling','B &mdash; A separates the two actions wrongly','A &mdash; B has put in one comma too many','B &mdash; A begins with the wrong clause'],
      answer:'A &mdash; B makes Mother part of the boiling',
      hint:'Read B up to its comma and nothing further, then say what the kettle boiled.',
      explanation:'The comma marks where the opening clause ends, so in A it ends after <i>boiled</i> and Mother belongs to the main statement. In B the comma falls one word later, so the kettle boils Mother and the main statement is left without a subject &mdash; one comma moved one place, and the sentence says something else entirely.' }),

    makeMCQ({ id:'g9eng-d2-060', chapterId:'g9eng-writing', subsection:'punctuation', difficulty:4,
      question:'A door in a school of fourteen teachers carries a hand-written sign: <i>Teacher&rsquo;s Room</i>. What does the sign claim, and what should it say?',
      options:['One teacher; it should read Teachers&rsquo;','Fourteen teachers; the sign is correct','No teacher at all; drop the apostrophe','Two teachers; it should read Teachers&rsquo;s'],
      answer:'One teacher; it should read Teachers&rsquo;',
      hint:'Work out what side of the <i>s</i> the mark is on, and what that tells you about numbers.',
      explanation:'An apostrophe before the <i>s</i> says the room belongs to one teacher, so the sign as written gives fourteen staff a single owner. Moving the mark to after the plural &mdash; <i>Teachers\'</i> &mdash; fixes it. Dropping it altogether leaves a plural with nothing showing possession, which is a different error rather than a repair.' })

  );

})();
