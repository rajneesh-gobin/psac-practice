'use strict';
(function () {

  // ══════════════════════════════════════════════════════════════════════════
  //  g9eng-writing — five subsections: planning · essay · descriptive ·
  //  formal_letter · narrative.  (cohesion, register, spelling and punctuation
  //  belong to another batch and are not touched here.)
  //
  //  ⚠ NOTHING HERE ASKS A PUPIL TO PRODUCE EXTENDED WRITING, and nothing here
  //    presumes how extended writing will eventually be marked. Every item is
  //    settled either by a four-option choice or by ONE word copied out of a
  //    draft printed in the stem, so no rubric, no model answer and no marking
  //    scheme is invented or implied. Each item teaches a COMPONENT of writing
  //    — which opening suits the reader, where a draft slips, which point does
  //    not belong, which example actually supports the claim.
  //
  //  ⚠ blueprint-english.md §7.9: formal letters, emails, reports and
  //    summaries NEVER appear in the N500. The 10-mark writing task is always
  //    informal and always bulleted. `formal_letter` is written because the
  //    SYLLABUS lists it (syllabus-english.md line 167), so the items teach the
  //    FORM and its conventions and NEVER claim the paper asks for one. The
  //    planning, descriptive and narrative items are shaped to the bulleted
  //    informal task the paper actually sets.
  //
  //  ⚠ L4 in this pack is "Extended Analysis", not "Word Problems": an L4 item
  //    here judges a piece of writing, never recalls a rule.
  // ══════════════════════════════════════════════════════════════════════════

  STATIC_QUESTIONS.push(

    // ══ planning · 001–017 ════════════════════════════════════════════════

    makeMCQ({ id:'g9eng-d1-001', chapterId:'g9eng-writing', subsection:'planning', difficulty:1,
      question:'A writing task gives you five bullet points to cover. Before you write a single sentence, what should you do first?',
      options:['Read all five bullets through','Count how many lines are ruled','Copy the bullets into a plan','Begin writing from bullet one'],
      answer:'Read all five bullets through',
      hint:'Think about what you have to know before the opening sentence can be the right one.',
      explanation:'Reading all five bullets first tells you everything the piece must contain, so the opening can be written to fit the whole task. Starting straight in at bullet one is tempting, and it costs marks the moment a later bullet needs something the opening has already ruled out.' }),

    makeMCQ({ id:'g9eng-d1-002', chapterId:'g9eng-writing', subsection:'planning', difficulty:1,
      question:'Which of these is the most useful form for a plan?',
      options:['Short notes and key words','Full sentences, neatly written','A tidy copy of the question','A list of every word to use'],
      answer:'Short notes and key words',
      hint:'A plan is a tool you use for two minutes, not a piece of writing anybody else reads.',
      explanation:'Notes and key words can be jotted in seconds and reordered with one arrow. Full sentences in a plan mean writing the piece twice and running out of time, and nothing in the plan itself earns a mark &mdash; so every second spent making it neat is taken from the writing that is marked.' }),

    makeTF({ id:'g9eng-d1-003', chapterId:'g9eng-writing', subsection:'planning', difficulty:1,
      question:'True or False: the plan you jot down is marked by the examiner, so it must be written in full sentences.',
      answer:false,
      hint:'Ask what the marks in a writing task are actually given for.',
      explanation:'False. The marks go to the finished piece of writing, not to the plan. A plan exists to stop you forgetting a bullet and to fix the order before you start, so rough notes do the job perfectly and full sentences spend time you need for the writing itself.' }),

    makeMCQ({ id:'g9eng-d1-004', chapterId:'g9eng-writing', subsection:'planning', difficulty:1,
      question:'In a guided writing task worth 10 marks, what do the five bullet points tell you?',
      options:['What the piece must contain','How long each sentence is','Which tense you must use','Where the commas must go'],
      answer:'What the piece must contain',
      hint:'Look at what would be missing from your writing if you quietly ignored one of them.',
      explanation:'Each bullet names one thing the writing has to cover, and a bullet left out is content the marker simply cannot find. The bullets say nothing about tense, sentence length or punctuation &mdash; those stay your own choices, judged on how well they suit the reader.' }),

    makeText({ id:'g9eng-d1-005', chapterId:'g9eng-writing', subsection:'planning', difficulty:2,
      question:'A task says: write a note to your aunt and (1) thank her for the present, (2) say what you did with it, (3) give news of school, (4) say when you will visit her. Your plan reads: <i>thank her &middot; what I did with it &middot; school news &middot; sign off</i>. Write the ONE word from bullet 4 that your plan has left out.',
      answer:'when',
      hint:'Lay the plan beside the bullets and find the bullet that no note in the plan matches.',
      explanation:'Bullet 4 asks for the time of the visit, and nothing in the plan carries it &mdash; <i>sign off</i> is the ending, not a date. Checking the plan against the bullets before writing is the cheapest mark in the task, because a missing bullet is a mark the marker cannot award however well the rest is written.' }),

    makeMCQ({ id:'g9eng-d1-006', chapterId:'g9eng-writing', subsection:'planning', difficulty:2,
      question:'You have four points for a short note to a friend: the date of the trip, why you are writing, what to bring, and a goodbye. Which point belongs first?',
      options:['Why you are writing','What you should bring','The date of the trip','The goodbye sentence'],
      answer:'Why you are writing',
      hint:'Ask which point the reader needs before any of the other three makes sense to them.',
      explanation:'A reader who does not yet know why the note exists cannot use a date or a packing list. Naming the reason first gives the other three points something to attach to. The date matters, but it is only useful once the reader knows what it is the date of.' }),

    makeMCQ({ id:'g9eng-d1-007', chapterId:'g9eng-writing', subsection:'planning', difficulty:2,
      question:'Your plan has six points, but the task allows only 50 to 75 words. What is the sensible next step?',
      options:['Cut the plan to the five bullets','Add a seventh point for balance','Write on past the ruled lines','Drop the bullet you like least'],
      answer:'Cut the plan to the five bullets',
      hint:'Weigh which of the points the marker is actually looking for.',
      explanation:'The five bullets are what the marks are given for, so a sixth point of your own spends words on something unmarked. Dropping one of the bullets instead loses a mark outright, and writing past the lines gives the marker more to read without giving them anything they asked for.' }),

    makeMCQ({ id:'g9eng-d1-008', chapterId:'g9eng-writing', subsection:'planning', difficulty:2,
      question:'The task gives five bullets, and you also have a good idea of your own. What should you do with it?',
      options:['Use it only if all five are covered','Replace the dullest bullet with it','Open the piece with it, then plan','Leave out every idea of your own'],
      answer:'Use it only if all five are covered',
      hint:'Two things matter here: what earns the marks, and what makes the writing worth reading.',
      explanation:'The bullets are the marked content, so they come first; once all five are covered, your own idea is what lifts a correct piece into a good one. Swapping it for a bullet trades a mark for a flourish, and shutting out your own ideas altogether leaves five flat statements in a row.' }),

    makeText({ id:'g9eng-d1-009', chapterId:'g9eng-writing', subsection:'planning', difficulty:2,
      question:'A notice for the school board must give WHO, WHAT, WHEN, WHERE and WHO TO CONTACT. Draft: <p><b>Science Club</b><br>There will be a meeting on Friday at 3 p.m. Bring your notebook. See Mr Rughoo for details.</p> One of the five is missing. Write that ONE word.',
      answer:'where', alsoAccept:['place','venue'],
      hint:'Imagine arriving on Friday at three with your notebook. What would you still not know?',
      explanation:'The notice gives the club, the business, the time and the contact, but never says which room or building. A notice that leaves out the place sends every reader off to find the one person who knows, which is exactly what a notice exists to prevent.' }),

    makeTF({ id:'g9eng-d1-010', chapterId:'g9eng-writing', subsection:'planning', difficulty:2,
      question:'True or False: once you have made a plan you must follow it exactly, even if a better order becomes clear while you are writing.',
      answer:false,
      hint:'Ask what the plan is for, and who it belongs to.',
      explanation:'False. A plan is a working note, not a promise. If a better order appears while you write, changing it costs nothing, because no mark is attached to the plan. What you must not lose is the bullets themselves &mdash; reorder them freely, then check at the end that all five are still there.' }),

    makeMCQ({ id:'g9eng-d1-011', chapterId:'g9eng-writing', subsection:'planning', difficulty:3,
      question:'Here is a plan for an informal letter to a friend about a new puppy: <p>1. how I got him &middot; 2. what he looks like &middot; 3. what he eats &middot; 4. the price of dog food in supermarkets</p> Which point should be cut, and why?',
      options:['Point 4 &mdash; it is about shops, not the puppy','Point 3 &mdash; feeding is dull for a letter','Point 2 &mdash; a friend can picture a puppy','Point 1 &mdash; the story is too long to tell'],
      answer:'Point 4 &mdash; it is about shops, not the puppy',
      hint:'Test each point against the subject the letter announced it was about.',
      explanation:'A letter about your puppy should keep that subject in every paragraph, and supermarket prices belong to a different topic altogether. Feeding, looks and how you got him are all about the puppy, so they stay &mdash; a point is cut for being off the subject, not for being ordinary.' }),

    makeMCQ({ id:'g9eng-d1-012', chapterId:'g9eng-writing', subsection:'planning', difficulty:3,
      question:'A pupil planning a story lists four events: the storm breaks, we set out for the beach, we shelter in a hut, we laugh about it afterwards. Which order makes a story?',
      options:['setting out, storm, shelter, laughing','storm, setting out, shelter, laughing','shelter, storm, setting out, laughing','laughing, shelter, storm, setting out'],
      answer:'setting out, storm, shelter, laughing',
      hint:'A story moves through time. Look for the event that causes the next one.',
      explanation:'A narrative runs in time order unless you have a reason to break it: you leave, the weather turns, you take shelter, and afterwards you can laugh. Opening with the storm sounds dramatic, and the reader then has to be told separately why anyone was outdoors, which costs more words than it saves.' }),

    makeMCQ({ id:'g9eng-d1-013', chapterId:'g9eng-writing', subsection:'planning', difficulty:3,
      question:'You are planning an argumentative essay agreeing that pupils should help with chores at home. Where in the plan does the opposing view belong?',
      options:['In a paragraph you then answer','In the very first sentence you write','Nowhere &mdash; it weakens the essay','In the conclusion, as your last word'],
      answer:'In a paragraph you then answer',
      hint:'Ask what a reader who disagrees with you needs before they will listen to the rest.',
      explanation:'Naming the other side and then answering it shows you have thought, and it disarms the objection your reader already had. Leaving it out looks as though you never met it. Putting it last is worse still: the final thing a reader remembers should be your case, not the case against you.' }),

    makeText({ id:'g9eng-d1-014', chapterId:'g9eng-writing', subsection:'planning', difficulty:3,
      question:'Read this plan for a talk about plastic waste: <p>1. how much plastic our school throws away &middot; 2. what happens to it in the lagoon &middot; 3. what pupils can do about it &middot; 4. what pupils can change in their lunchboxes</p> Two points are really the same. Write the NUMBER of the point that repeats another one, as a word (one, two, three or four).',
      answer:'four', alsoAccept:['4'],
      hint:'Ask of each point: could I write a paragraph on it that says nothing another paragraph already says?',
      explanation:'The fourth point is one example of the third, so a paragraph on each would say the same thing twice in different words. Either fold the lunchbox example into the point above it, or replace it with something genuinely new; a plan that repeats itself produces writing that repeats itself.' }),

    makeMCQ({ id:'g9eng-d1-015', chapterId:'g9eng-writing', subsection:'planning', difficulty:4,
      question:'The task is a notice on the school gate telling parents that Sports Day has moved to 12 June. Two openings are drafted:<p><b>A</b> &mdash; It has been decided, after consultation, that a change of date is unavoidable.<br><b>B</b> &mdash; Sports Day has moved to Saturday 12 June.</p> Which opening suits a gate notice better, and why?',
      options:['B &mdash; a notice must give the fact at once','A &mdash; it explains the reasons politely','B &mdash; it uses shorter words than A does','A &mdash; a formal tone suits a school notice'],
      answer:'B &mdash; a notice must give the fact at once',
      hint:'Picture a parent reading it while walking past the gate. What has to reach them in two seconds?',
      explanation:'A notice is read on the move, so the new date has to be in the first line. B wins because it delivers the fact, not merely because it is shorter &mdash; a short opening that withheld the date would be just as poor. A is polite and well written, and a parent hurrying past still does not know when Sports Day is.' }),

    makeMCQ({ id:'g9eng-d1-016', chapterId:'g9eng-writing', subsection:'planning', difficulty:4,
      question:'A pupil plans a 60-word note with five points: the fire drill, why it was called, how long it lasted, who was late back, and a full account of every class that took part. What is wrong with this plan?',
      options:['The last point cannot fit in 60 words','The points are in the wrong time order','The note has no greeting or sign-off','Five points is too many for any note'],
      answer:'The last point cannot fit in 60 words',
      hint:'Divide the words available by the number of points, then see which point refuses to shrink that far.',
      explanation:'Sixty words across five points is about twelve words each, and a full account of every class cannot be written in twelve. The other four are each a sentence long. Five points is not too many when they are the task&rsquo;s own bullets &mdash; the fault is one point whose size does not match the space.' }),

    makeMCQ({ id:'g9eng-d1-017', chapterId:'g9eng-writing', subsection:'planning', difficulty:4,
      question:'The task: <i>Write a card to your teacher who is leaving, saying what you remember, what you learned, and what you wish her.</i> Which plan follows the task?',
      options:['A memory, a lesson learned, a good wish','Her career, her family, her new school','A long thank you, then a short memory','What the class did all year, term by term'],
      answer:'A memory, a lesson learned, a good wish',
      hint:'Lay the plan beside the three things the task asked for and match them one to one.',
      explanation:'Three things were asked for, so the plan carries three points in that order. The others look reasonable and answer questions nobody set: her family and her new school are not yours to write about, and a term-by-term account is a different task altogether.' }),

    // ══ essay · 018–033 ═══════════════════════════════════════════════════

    makeMCQ({ id:'g9eng-d1-018', chapterId:'g9eng-writing', subsection:'essay', difficulty:1,
      question:'An essay question offers three titles and prints a line reading &ldquo;Option chosen: ......&rdquo;. What goes on that line?',
      options:['The number of the option chosen','The title you invented for it','The number of words you wrote','The name of the book you used'],
      answer:'The number of the option chosen',
      hint:'The marker has to know which of the three you are answering before reading a word of it.',
      explanation:'That line tells the marker which title your essay is answering, so they judge it against the right task. Leaving it blank makes them guess, and an essay marked against the wrong option loses marks for content it was never supposed to have.' }),

    makeMCQ({ id:'g9eng-d1-019', chapterId:'g9eng-writing', subsection:'essay', difficulty:1,
      question:'An essay title that begins &ldquo;Describe the scene at ...&rdquo; is asking for which kind of writing?',
      options:['Descriptive writing','Argumentative writing','Narrative writing','A summary of a text'],
      answer:'Descriptive writing',
      hint:'The first verb of the title names the job you have been given.',
      explanation:'The instruction verb <b>describe</b> asks you to build a picture, so the marks follow detail and atmosphere rather than events or arguments. A narrative would tell what happened next and an argumentative essay would take a side &mdash; both are good writing answering the wrong question.' }),

    makeTF({ id:'g9eng-d1-020', chapterId:'g9eng-writing', subsection:'essay', difficulty:1,
      question:'True or False: an essay of 200 to 250 words is best written as one long paragraph, so that all the ideas stay together.',
      answer:false,
      hint:'Think about what a reader uses a new paragraph to work out.',
      explanation:'False. Paragraphs show a reader where one idea stops and the next begins, and an essay of this length normally has three or four of them. One solid block makes the reader do that sorting themselves, and an examiner reading it finds no structure there to reward.' }),

    makeMCQ({ id:'g9eng-d1-021', chapterId:'g9eng-writing', subsection:'essay', difficulty:2,
      question:'What is a topic sentence?',
      options:['The sentence naming the paragraph idea','The first sentence of the whole essay','The longest sentence in a paragraph','The sentence that repeats the title'],
      answer:'The sentence naming the paragraph idea',
      hint:'Ask what the rest of the paragraph is doing, and what it is doing it to.',
      explanation:'A topic sentence states the one idea the paragraph will develop, and it usually opens the paragraph. It is not simply the first sentence of the essay, and length has nothing to do with it &mdash; a short topic sentence followed by evidence is stronger than a long one saying three things at once.' }),

    makeMCQ({ id:'g9eng-d1-022', chapterId:'g9eng-writing', subsection:'essay', difficulty:2,
      question:'What should the opening paragraph of a short argumentative essay do?',
      options:['Name the question and your position','Give every reason you will use later','Tell a long story before beginning','Repeat the title in different words'],
      answer:'Name the question and your position',
      hint:'A reader should know two things by the end of the first paragraph.',
      explanation:'The opening tells the reader what is being argued and where you stand, so everything after it has a direction to run in. Listing all your reasons there leaves the body with nothing left to say, and an essay that only restates the title has spent a paragraph adding nothing.' }),

    makeText({ id:'g9eng-d1-023', chapterId:'g9eng-writing', subsection:'essay', difficulty:2,
      question:'Read this opening paragraph: <p>Many people say that homework is a waste of an evening. I disagree, and the three paragraphs below explain why.</p> Write the ONE word from the paragraph that tells the reader which side the writer is on.',
      answer:'disagree',
      hint:'Look for the word that would have to change if the writer swapped sides.',
      explanation:'One word carries the whole position: change it to <i>agree</i> and the essay becomes its opposite while every other word stays exactly as it was. An argumentative essay must place that word early, because a reader who reaches paragraph three still guessing has been reading without a direction.' }),

    makeMCQ({ id:'g9eng-d1-024', chapterId:'g9eng-writing', subsection:'essay', difficulty:2,
      question:'Which of these is the best last paragraph for an argumentative essay?',
      options:['A short restatement of your case','A brand new reason you kept back','An apology for any mistakes made','A question you leave unanswered'],
      answer:'A short restatement of your case',
      hint:'Ask what the reader should be left holding as they finish.',
      explanation:'A conclusion gathers what you argued so the reader leaves with your case in mind. A new reason arriving at the end has no room to be developed and makes the essay look badly planned, and an apology throws away the confidence you spent 200 words building.' }),

    makeMCQ({ id:'g9eng-d1-025', chapterId:'g9eng-writing', subsection:'essay', difficulty:2,
      question:'The title is &ldquo;Do you agree that pupils should help at home?&rdquo; A pupil writes three paragraphs listing the chores their family does. What has gone wrong?',
      options:['They described instead of arguing','They wrote fewer words than asked','They used too many short sentences','They forgot to name their family'],
      answer:'They described instead of arguing',
      hint:'Read the title again and find the words that name the job you were set.',
      explanation:'The words <i>Do you agree</i> ask for a position defended with reasons, and a list of chores is description however well it is written. Word count and sentence length are not the fault here &mdash; the essay answers a question that was never set.' }),

    makeMCQ({ id:'g9eng-d1-026', chapterId:'g9eng-writing', subsection:'essay', difficulty:2,
      question:'Three essay titles are offered. Which one is the argumentative option?',
      options:['&ldquo;Homework should be banned. Do you agree?&rdquo;','&ldquo;Describe the scene at the bus station.&rdquo;','&ldquo;Write a story that ends in the rain.&rdquo;','&ldquo;Describe your village early on a Sunday.&rdquo;'],
      answer:'&ldquo;Homework should be banned. Do you agree?&rdquo;',
      hint:'One title asks for your opinion; the others ask for a picture or for a story.',
      explanation:'An argumentative title asks you to take a side, usually with <i>Do you agree?</i> or <i>Discuss</i>. The two describing titles want detail and atmosphere, and the story title wants events. Choosing the right mode matters more than choosing the easiest subject, because the marks follow the mode.' }),

    makeMCQ({ id:'g9eng-d1-027', chapterId:'g9eng-writing', subsection:'essay', difficulty:3,
      question:'A body paragraph argues that school gardens teach patience. Which sentence breaks the unity of that paragraph?',
      options:['The canteen sells very good samosas','Seeds take weeks to show anything at all','Pupils water the beds before assembly','Nothing grows faster because you want it'],
      answer:'The canteen sells very good samosas',
      hint:'Test each sentence against the single idea the paragraph announced.',
      explanation:'A paragraph develops one idea, and samosas have nothing to do with patience or with gardens. The other three each show waiting, tending or slowness, so each earns its place. A good sentence in the wrong paragraph still has to go.' }),

    makeMCQ({ id:'g9eng-d1-028', chapterId:'g9eng-writing', subsection:'essay', difficulty:3,
      question:'Claim: <i>Cycling to school would make our roads safer.</i> Which sentence actually supports that claim?',
      options:['Fewer cars at the gate means fewer near misses','Cycling is a good deal cheaper than the bus fare','Many pupils already own a bicycle of their own','Cycling in the morning air is very pleasant'],
      answer:'Fewer cars at the gate means fewer near misses',
      hint:'The claim is about safety, so ask which sentence is about safety too.',
      explanation:'Only one sentence connects cycling to danger on the road, which is what the claim is about. The others are true, and they are reasons to cycle &mdash; but they support a different claim about cost, convenience or pleasure, and a marker reads them as evidence for something you did not argue.' }),

    makeText({ id:'g9eng-d1-029', chapterId:'g9eng-writing', subsection:'essay', difficulty:3,
      question:'Read this paragraph from an essay on road safety: <p>Speed is the main danger on our roads. A car at high speed needs far longer to stop. Drivers who are in a hurry take chances at junctions. My uncle has just bought a red van.</p> One sentence does not belong. Write the ONE word naming the thing that sentence is about.',
      answer:'van', alsoAccept:['uncle','a van','the van'],
      hint:'Read each sentence against the idea the first sentence announced.',
      explanation:'Three sentences are about speed and stopping; the last belongs to a different subject altogether and is there only because it came to mind. In a 250-word essay a stray sentence costs twice &mdash; it takes the space a real reason needed, and it tells the marker the paragraph was never planned.' }),

    makeMCQ({ id:'g9eng-d1-030', chapterId:'g9eng-writing', subsection:'essay', difficulty:4,
      question:'Two pupils open the same argumentative essay on banning single-use plastic:<p><b>A</b> &mdash; Plastic is used everywhere in Mauritius today.<br><b>B</b> &mdash; A turtle died last month with a bag in its throat, and the bag was ours.</p> Which opening is stronger here, and why?',
      options:['B &mdash; it makes the reader care before arguing','A &mdash; it opens calmly with a plain fact','B &mdash; it is longer and gives more detail','A &mdash; it avoids upsetting the reader early'],
      answer:'B &mdash; it makes the reader care before arguing',
      hint:'Two of these four judge the openings by the wrong measure. Ask what an argument needs from its first line.',
      explanation:'An argument has to give the reader a reason to keep reading, and the turtle does that in one sentence. B is not better for being longer &mdash; a long flat opening would be worse than a short sharp one &mdash; and A is not wrong, only wasted, because everybody already knows plastic is common.' }),

    makeMCQ({ id:'g9eng-d1-031', chapterId:'g9eng-writing', subsection:'essay', difficulty:4,
      question:'An essay arrives in this order: <p>1. So schools should keep the library open at lunch. 2. Many pupils have nowhere quiet to read at home. 3. A quiet hour at lunch would cost the school nothing.</p> What is wrong with the order?',
      options:['The conclusion has been put first','The reasons contradict each other','There is no evidence anywhere','The paragraphs are all too short'],
      answer:'The conclusion has been put first',
      hint:'Read the first sentence last and see whether the passage improves.',
      explanation:'Sentence 1 begins with <i>So</i>, which signals a conclusion, and a conclusion cannot stand before the reasons that produce it. The two reasons do not contradict each other and both are evidence of a kind; the fault is purely one of order, and moving one sentence repairs it.' }),

    makeMCQ({ id:'g9eng-d1-032', chapterId:'g9eng-writing', subsection:'essay', difficulty:4,
      question:'Title: <i>Do you agree that young people spend too long on their phones?</i> Which plan answers it?',
      options:['Yes, with three reasons and one objection','A history of the telephone in Mauritius','Everything a phone can do for a pupil today','Three stories about phones I have owned'],
      answer:'Yes, with three reasons and one objection',
      hint:'The title contains a question. Ask which plan ends up answering it.',
      explanation:'Only the first plan takes a position and defends it, which is what <i>Do you agree</i> requires, and naming an objection strengthens that. The other three are a report, a list and a set of anecdotes &mdash; each could be written well, and none of them ever answers the question asked.' }),

    makeMCQ({ id:'g9eng-d1-033', chapterId:'g9eng-writing', subsection:'essay', difficulty:4,
      question:'An essay argues for four paragraphs that homework should be reduced. Its last line reads: <i>All the same, homework is probably necessary.</i> What is the problem?',
      options:['The ending abandons the case just argued','The ending is shorter than the opening','The ending uses an informal expression','The ending repeats the title once more'],
      answer:'The ending abandons the case just argued',
      hint:'Ask what a reader now thinks the writer actually believes.',
      explanation:'Four paragraphs of argument are undone by one sentence conceding the opposite, so the reader finishes without knowing what the writer holds. Admitting a difficulty is fine <b>inside</b> an essay, where you can answer it; in the final line there is nothing left to answer it with.' }),

    // ══ descriptive · 034–050 ═════════════════════════════════════════════

    makeMCQ({ id:'g9eng-d1-034', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:1,
      question:'Descriptive writing works mainly by giving the reader what?',
      options:['Details taken in by the senses','Reasons arranged into an argument','Events arranged in time order','Rules explained one after another'],
      answer:'Details taken in by the senses',
      hint:'Ask how a reader builds a picture inside their own head.',
      explanation:'A description puts sights, sounds, smells, textures and tastes in front of the reader so that they assemble the scene themselves. Events in order make a narrative and reasons in order make an argument; both are good writing, and neither is what a describing title asks for.' }),

    makeMCQ({ id:'g9eng-d1-035', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:1,
      question:'In writing, what does the advice &ldquo;show, do not tell&rdquo; mean?',
      options:['Give the detail, not the label','Use pictures instead of words','Write in the present tense','Keep every sentence very short'],
      answer:'Give the detail, not the label',
      hint:'Compare naming a feeling with giving the reader the evidence for it.',
      explanation:'Telling names the feeling &mdash; <i>she was nervous</i>. Showing gives the detail that produces it &mdash; <i>she checked the same empty pocket three times</i> &mdash; and lets the reader draw the conclusion. It has nothing to do with real pictures, or with which tense you choose.' }),

    makeTF({ id:'g9eng-d1-036', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:1,
      question:'True or False: a good description includes every detail the writer can think of.',
      answer:false,
      hint:'Think what happens to one strong detail when it is surrounded by twenty ordinary ones.',
      explanation:'False. A few chosen details carry a scene; twenty flatten it, because nothing stands out and the reader stops looking. Deciding which details to leave out is as much a part of describing as deciding which to put in.' }),

    makeMCQ({ id:'g9eng-d1-037', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:2,
      question:'Which sentence shows the reader that the market is busy, rather than telling them?',
      options:['Three voices shouted the same price','The market was extremely busy today','It was a very busy morning there','The busy market was full of people'],
      answer:'Three voices shouted the same price',
      hint:'One sentence gives evidence a reader can picture; the other three only assert.',
      explanation:'Shouted prices are something the reader can hear, so they work out &ldquo;busy&rdquo; for themselves. The other three use the word <i>busy</i> and give nothing to see or hear; putting <i>very</i> or <i>extremely</i> in front of a label does not turn it into a picture.' }),

    makeMCQ({ id:'g9eng-d1-038', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:2,
      question:'Which word gives the reader the clearest picture in &ldquo;An old ___ stood by the gate&rdquo;?',
      options:['banyan','plant','thing','object'],
      answer:'banyan',
      hint:'Ask which word narrows the picture down to one thing.',
      explanation:'A banyan is a particular tree, so the reader sees bark, hanging roots and shade at once. <i>Plant</i>, <i>thing</i> and <i>object</i> each cover thousands of possibilities, and a reader left guessing builds nothing. A precise noun does more work than an added adjective.' }),

    makeText({ id:'g9eng-d1-039', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:2,
      question:'Read this line from a description: <p>The beach was nice, with warm sand and a few fishing boats pulled up under the trees.</p> Write the ONE word that gives the reader nothing they can picture.',
      answer:'nice',
      hint:'Three details here can be seen or felt. One word only passes a judgement.',
      explanation:'That word is a verdict, not a detail &mdash; two readers who both accept it still picture different beaches. Warm sand and boats under the trees are things a reader can see and feel, which is why they survive and the judgement can simply be cut.' }),

    makeMCQ({ id:'g9eng-d1-040', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:2,
      question:'A description of a bakery gives golden loaves, the scrape of a tray and a warm counter under your hand. Which sense is missing, and would add most?',
      options:['Smell','Sight','Touch','Sound'],
      answer:'Smell',
      hint:'Name the sense each detail already uses, then see which one is left over.',
      explanation:'Golden loaves are sight, a scraping tray is sound and a warm counter is touch, so the missing sense is the one a bakery has most of. Checking a description sense by sense is quicker and surer than reading it through again and hoping something is noticed.' }),

    makeMCQ({ id:'g9eng-d1-041', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:2,
      question:'Which version describes most strongly how the door moved?',
      options:['The door banged shut','The door shut very loudly','The door closed noisily','The door was shut hard'],
      answer:'The door banged shut',
      hint:'One version puts the sound inside the verb itself.',
      explanation:'<b>Banged</b> carries the noise and the force in one word, so no adverb is needed to prop it up. The others reach for <i>very loudly</i>, <i>noisily</i> or <i>hard</i> to rescue a weak verb, and a precise verb almost always beats a vague verb with an adverb attached.' }),

    makeText({ id:'g9eng-d1-042', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:2,
      question:'Read this sentence: <p>The old woman walked slowly and carefully down the wet steps.</p> One strong verb could replace <i>walked slowly and carefully</i>. Write the ONE word from this list that does it: crept, ran, jumped, marched.',
      answer:'crept',
      hint:'Choose the verb that already contains the care and the slowness.',
      explanation:'That verb means to move slowly and cautiously, so one word does the work of a verb and two adverbs together and leaves room for another detail. <i>Ran</i>, <i>jumped</i> and <i>marched</i> all carry speed or confidence, which is the opposite of what this sentence describes.' }),

    makeMCQ({ id:'g9eng-d1-043', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:3,
      question:'A description of a village square moves from a stall, to the church clock, back to that same stall, then to a dog. What is wrong with it?',
      options:['The reader is moved about at random','The sentences are all the same length','There are too few adjectives used in it','It has been written in the past tense'],
      answer:'The reader is moved about at random',
      hint:'Try to draw the square in the order the details arrive.',
      explanation:'A description needs a path the reader can follow &mdash; near to far, left to right, or the whole scene and then one corner of it. Coming back to the stall after leaving it makes the reader build the picture twice. Tense and adjective count are not the trouble; the route is.' }),

    makeMCQ({ id:'g9eng-d1-044', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:3,
      question:'Which phrase is weakened by having too many adjectives?',
      options:['a big old broken wooden chair','a chair with one leg missing','a chair nobody would sit on','a chair pushed against the wall'],
      answer:'a big old broken wooden chair',
      hint:'Count how many pictures the reader is asked to hold at once, and ask how sharp each one is.',
      explanation:'Four adjectives in a row make a reader average them out instead of seeing anything. <i>One leg missing</i> is a single detail that implies old, broken and unusable all at once. Detail beats decoration: one exact fact is worth four approximate labels.' }),

    makeText({ id:'g9eng-d1-045', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:3,
      question:'Read this description: <p>The classroom was silent. Thirty pens moved at once. A fan turned slowly overhead. Ravi shouted the answer from the back.</p> One sentence contradicts the first. Write the ONE word in it that makes the contradiction.',
      answer:'shouted',
      hint:'Find the sentence that could not be true at the same moment as the opening one.',
      explanation:'A silent room and an answer called out across it cannot both stand, so that one verb undoes the sentence the description opened with. Moving pens and a turning fan both fit silence. A description has to keep faith with the atmosphere it claims, or the reader trusts none of it.' }),

    makeMCQ({ id:'g9eng-d1-046', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:3,
      question:'A pupil is describing a market at midday. Their third paragraph begins: <i>Then I bought two mangoes and went home.</i> What has happened?',
      options:['The description has turned into a story','The paragraph has been left much too short','The writing has become too formal','The market is described from too far'],
      answer:'The description has turned into a story',
      hint:'Ask what the title asked for, and what this sentence is doing instead.',
      explanation:'Buying and leaving are events, so the writing has slipped from describing a scene into telling what happened next. A describing title is marked on the picture, and every sentence of plot is a sentence not spent on the market. A little movement is fine; a chain of actions is a different task.' }),

    makeMCQ({ id:'g9eng-d1-047', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:4,
      question:'Two pupils describe the same grandmother:<p><b>A</b> &mdash; My grandmother was a very kind and patient woman.<br><b>B</b> &mdash; My grandmother kept a tin of sweets for children who were not hers.</p> Which is the better description, and why?',
      options:['B &mdash; the detail lets the reader judge her','A &mdash; it states her character plainly','B &mdash; it mentions sweets, which children like','A &mdash; it uses two adjectives, not one'],
      answer:'B &mdash; the detail lets the reader judge her',
      hint:'One of these four praises B for a reason that is not the real one.',
      explanation:'The tin of sweets is evidence, and a reader shown it concludes &ldquo;kind&rdquo; unaided &mdash; which is what showing means. B is not better because sweets are pleasant; a plainer detail chosen as well would still beat a label. A is clear, correct, and leaves the reader nothing whatever to see.' }),

    makeMCQ({ id:'g9eng-d1-048', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:4,
      question:'Read this paragraph: <p>The fair was exciting. Everyone was having a wonderful time. The atmosphere was really amazing and nobody wanted to leave.</p> What is its main weakness?',
      options:['Every sentence labels, none shows','Every sentence is in the past tense','Every sentence begins with the same word','Every sentence is far too long to follow'],
      answer:'Every sentence labels, none shows',
      hint:'Ask what a reader could draw after reading it.',
      explanation:'Exciting, wonderful and amazing are all verdicts, so the reader is told four times how to feel and shown nothing at all. One detail &mdash; a bell, a queue, the smell of frying &mdash; would do more than the three adjectives together. Past tense and sentence length are not the fault here.' }),

    makeMCQ({ id:'g9eng-d1-049', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:4,
      question:'You are describing a house the day after the family has moved out. Which detail carries the emptiness best?',
      options:['A pale square where a picture hung','A house with nobody living in it now','An empty and very quiet building','Rooms which felt sad and lonely'],
      answer:'A pale square where a picture hung',
      hint:'Look for the detail that proves the emptiness instead of announcing it.',
      explanation:'The pale square is evidence: something hung there for years and is gone, and the reader supplies the rest. The other three announce emptiness or sadness directly, so the reader has to take the writer&rsquo;s word for it. One physical trace outweighs several statements of mood.' }),

    makeMCQ({ id:'g9eng-d1-050', chapterId:'g9eng-writing', subsection:'descriptive', difficulty:4,
      question:'A description opens: <i>The beach was deserted at dawn.</i> Which later sentence would contradict that opening?',
      options:['Children queued at the ice-cream van','A single dog crossed the wet sand','The wind moved an empty plastic bag','Water filled a line of old footprints'],
      answer:'Children queued at the ice-cream van',
      hint:'Ask which sentence could not be true in a place with nobody in it.',
      explanation:'A queue of children means the beach is not deserted, so that sentence destroys the claim the description opened with. A dog, a bag and old footprints all belong in an empty scene &mdash; the footprints in fact strengthen it, because they show people who are no longer there.' }),

    // ══ formal_letter · 051–066 ═══════════════════════════════════════════
    // ⚠ The FORM and its conventions. The N500 never sets a formal letter
    //   (blueprint-english.md §7.9); the syllabus lists one, so it is taught
    //   here and no item claims the paper asks for it.

    makeMCQ({ id:'g9eng-d1-051', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:1,
      question:'A formal letter begins &ldquo;Dear Sir&rdquo;. Which sign-off goes with that greeting?',
      options:['Yours faithfully','Yours sincerely','Lots of love','Bye for now'],
      answer:'Yours faithfully',
      hint:'The pairing depends on whether the greeting names the person it is addressed to.',
      explanation:'English pairs <b>Dear Sir</b> or <b>Dear Madam</b> with <b>Yours faithfully</b>, and a named greeting such as <i>Dear Mrs Appadoo</i> with <b>Yours sincerely</b>. The two endings look alike and are not interchangeable, and the other two belong in a note to somebody you know well.' }),

    makeMCQ({ id:'g9eng-d1-052', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:1,
      question:'In the usual layout of a formal letter, where does the writer&rsquo;s own address go?',
      options:['At the top of the letter','At the foot of the letter','In the middle of page one','Just after your signature'],
      answer:'At the top of the letter',
      hint:'Think about where a reader looks when they want to send a reply.',
      explanation:'Your address sits at the top with the date under it, so a reader who wants to reply finds it at once; the recipient goes below on the left. An address hidden after the signature or dropped into the body is still there, and now has to be hunted for.' }),

    makeTF({ id:'g9eng-d1-053', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:1,
      question:'True or False: a formal letter normally uses shortened forms such as <i>don&rsquo;t</i> and <i>I&rsquo;m</i>.',
      answer:false,
      hint:'Ask how the same letter would look filed in an office and read again a year later.',
      explanation:'False. Formal letters use the full forms &mdash; <i>do not</i>, <i>I am</i> &mdash; because the letter is a record as well as a message. Shortened forms are perfectly good English and belong in speech and in informal writing, which is a different kind of task, not a worse one.' }),

    makeMCQ({ id:'g9eng-d1-054', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:1,
      question:'What is the subject line of a formal letter for?',
      options:['To say what the letter is about','To give the name of the sender','To show the date of writing','To list the pages enclosed'],
      answer:'To say what the letter is about',
      hint:'Imagine a clerk with forty letters deciding which one to open first.',
      explanation:'A subject line &mdash; <i>Application for the post of library monitor</i> &mdash; lets a reader route the letter before reading a word of it. Sender, date and enclosures all have their own places in the layout, so repeating them here spends the one line that could have done this job.' }),

    makeMCQ({ id:'g9eng-d1-055', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:2,
      question:'Your letter begins &ldquo;Dear Mrs Bhagwan&rdquo;. Which sign-off is correct?',
      options:['Yours sincerely','Yours faithfully','Yours obediently','Your good friend'],
      answer:'Yours sincerely',
      hint:'You have used the reader&rsquo;s name, so ask which of the two standard endings that calls for.',
      explanation:'A named greeting takes <b>Yours sincerely</b>. <i>Yours faithfully</i> is kept for a letter to somebody you have not named, such as <i>Dear Sir or Madam</i>, and getting that pair the wrong way round is the commonest slip in a formal letter.' }),

    makeMCQ({ id:'g9eng-d1-056', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:2,
      question:'What should the first paragraph of a formal letter do?',
      options:['State why you are writing','Describe your day so far','Thank the reader at length','Give your whole life story'],
      answer:'State why you are writing',
      hint:'A busy reader should know the purpose before reaching the second paragraph.',
      explanation:'The opening paragraph states the business &mdash; applying, complaining, asking, thanking &mdash; in a sentence or two, so everything after it has a frame. Warming up with small talk delays the point, and a reader may have to reach paragraph three to find out what is wanted.' }),

    makeText({ id:'g9eng-d1-057', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:2,
      question:'Read the opening of a letter: <p>I am writing to apply for the post of library monitor advertised on the school noticeboard.</p> Write the ONE word from that sentence which names the writer&rsquo;s purpose.',
      answer:'apply', alsoAccept:['applying','application'],
      hint:'Look for the verb that would have to change if the letter were a complaint instead.',
      explanation:'One verb carries the whole purpose, and a reader who meets it in line one knows what the letter is for. <i>Writing</i> and <i>advertised</i> would be true of almost any letter about a post; it is the purpose verb that does the work, which is why it belongs in the first sentence.' }),

    makeMCQ({ id:'g9eng-d1-058', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:2,
      question:'What does the last paragraph of a formal letter usually do?',
      options:['Say what you want to happen next','Repeat the whole letter in short','Apologise for taking up the time','Add a new complaint at the end'],
      answer:'Say what you want to happen next',
      hint:'Ask what the reader has to do once they put the letter down.',
      explanation:'A formal letter closes by naming the action wanted &mdash; a reply, an interview, a repair, a refund &mdash; so the reader knows what is expected of them. A summary only repeats what they have just read, and a new complaint in the last line has no paragraph left to explain it.' }),

    makeText({ id:'g9eng-d1-059', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:2,
      question:'Here is the heading of a formal letter: <p>14 Rue La Paix, Curepipe<br>The Manager, Sunrise Stores<br>Dear Sir or Madam</p> One part of a formal heading is missing. Write the ONE word naming it.',
      answer:'date', alsoAccept:['the date'],
      hint:'Compare the heading with the parts a formal letter carries before the greeting.',
      explanation:'The sender&rsquo;s address and the recipient are both here, and the line recording when the letter was written is not. In a formal exchange that line decides which letter came first and whether a reply arrived in time, so it belongs under the sender&rsquo;s address as a matter of course.' }),

    makeMCQ({ id:'g9eng-d1-060', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:2,
      question:'You are writing to an officer whose name you do not know. Which greeting is correct?',
      options:['Dear Sir or Madam','Dear Whoever You Are','Dear Person in Charge','Dear Friend at the Office'],
      answer:'Dear Sir or Madam',
      hint:'One of these is the fixed English form for a reader you cannot name.',
      explanation:'<b>Dear Sir or Madam</b> is the standard opening when the name is unknown, and it pairs with <i>Yours faithfully</i>. The others are all understandable and none is the accepted form; in a formal letter the conventional phrase is safer than an invented one, because it draws no attention to itself.' }),

    makeMCQ({ id:'g9eng-d1-061', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:3,
      question:'A letter to a bank manager contains: <i>Thanks a lot for sorting out my stuff so fast.</i> Which rewriting suits the letter?',
      options:['Thank you for dealing with this so quickly','Thanks loads for getting it done so fast','Cheers for sorting all of that out for me','Thank you very much indeed for the speed'],
      answer:'Thank you for dealing with this so quickly',
      hint:'Two things have to change: the thanks itself, and the word standing in for the business.',
      explanation:'The formal version replaces <i>thanks a lot</i> with <i>thank you</i> and the vague <i>stuff</i> with what was actually dealt with. Two of the others keep an informal opening, and the last is polite yet still never says what the manager did, so the reader cannot tell which matter is meant.' }),

    makeMCQ({ id:'g9eng-d1-062', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:3,
      question:'A letter of complaint about a broken fan has four paragraphs: the repair you want, what you bought and when, what went wrong, and your receipt number. Which order is right?',
      options:['purchase, fault, receipt, request','request, purchase, fault, receipt','fault, request, purchase, receipt','receipt, request, fault, purchase'],
      answer:'purchase, fault, receipt, request',
      hint:'A reader needs the facts in the order that lets them check each one.',
      explanation:'Say what you bought, then what went wrong, then the evidence, then what you want done &mdash; each paragraph rests on the one before it. Opening with the request makes the reader hold a demand they cannot yet judge, and a receipt number means nothing until they know what it is for.' }),

    makeText({ id:'g9eng-d1-063', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:3,
      question:'Read this line from a formal letter: <p>I have been waiting for ages for a reply to my letter of 3 May.</p> Write the ONE word that has to go because it is too informal here.',
      answer:'ages',
      hint:'Look for the word a formal reader could not act on, because it names no length of time.',
      explanation:'That word is vague and casual, where a formal letter would say <i>for six weeks</i> or <i>since 3 May</i> &mdash; something the reader can check. The rest of the sentence is already formal, so one word is all that changes, and changing it makes the complaint stronger, because a date is evidence.' }),

    makeMCQ({ id:'g9eng-d1-064', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:4,
      question:'The same request &mdash; that a school gate be mended &mdash; is drafted twice.<p><b>A</b> &mdash; I am writing to report that the main gate of our school is unsafe.<br><b>B</b> &mdash; You will not believe what has happened to our gate.</p> Which opening suits a letter to the Ministry, and why?',
      options:['A &mdash; it names the business at once','B &mdash; it will interest the reader more','A &mdash; it is written in longer words','B &mdash; it sounds friendlier and warmer'],
      answer:'A &mdash; it names the business at once',
      hint:'Ask what the reader of each version is expected to do next.',
      explanation:'An official who reads hundreds of letters needs the business in the first line, and A supplies it. B would suit a message to a friend, where interest matters more than routing. A does not win for using longer words &mdash; a short plain opening naming the problem would be better still.' }),

    makeMCQ({ id:'g9eng-d1-065', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:4,
      question:'A letter opens &ldquo;Dear Mr Lutchmun&rdquo; and ends &ldquo;Yours faithfully&rdquo;. What is wrong?',
      options:['A named greeting takes Yours sincerely','A named greeting needs no sign-off','Yours faithfully is not real English','The greeting should have used a comma'],
      answer:'A named greeting takes Yours sincerely',
      hint:'Both phrases are correct English on their own. The fault is in the pairing.',
      explanation:'Each ending has its own greeting: <i>Dear Mr Lutchmun</i> takes <b>Yours sincerely</b>, while <b>Yours faithfully</b> answers <i>Dear Sir</i> or <i>Dear Madam</i>. Nothing here is misspelled or invented and every formal letter needs a sign-off &mdash; these two halves simply do not belong together.' }),

    makeMCQ({ id:'g9eng-d1-066', chapterId:'g9eng-writing', subsection:'formal_letter', difficulty:4,
      question:'A letter asking for a refund spends three paragraphs on the history of the purchase and puts the request in its final line. What is the main weakness?',
      options:['The reader meets the request too late','The letter is longer than it needs to be','The history is written in the past tense','The letter has no subject line at the top'],
      answer:'The reader meets the request too late',
      hint:'Ask when the reader first learns what is being asked of them.',
      explanation:'A formal reader decides early what a letter is for, and a request hidden at the end may be acted on by somebody who has already stopped reading. Length and a missing subject line are real faults and smaller ones; the history is not wrong in itself, only placed in front of the point.' }),

    // ══ narrative · 067–083 ═══════════════════════════════════════════════

    makeMCQ({ id:'g9eng-d1-067', chapterId:'g9eng-writing', subsection:'narrative', difficulty:1,
      question:'A narrative is built mainly from what?',
      options:['Events that follow one another','Reasons that support a view','Details of a single place','Rules about how to behave'],
      answer:'Events that follow one another',
      hint:'Ask what a reader wants to know at the end of each sentence.',
      explanation:'A narrative moves: one thing happens and it brings on the next, so the reader keeps asking what happens now. Reasons in order make an argument and details of one place make a description &mdash; a story can borrow both, and neither of them can carry it alone.' }),

    makeTF({ id:'g9eng-d1-068', chapterId:'g9eng-writing', subsection:'narrative', difficulty:1,
      question:'True or False: a story should tell the reader in its first sentence how it is going to end.',
      answer:false,
      hint:'Ask why a reader carries on to the second sentence at all.',
      explanation:'False. A reader goes on because they do not yet know, so an opening that announces the ending spends the one thing keeping them there. Hinting that trouble is coming is different &mdash; that is suspense &mdash; but naming the outcome leaves the rest of the story nothing to do.' }),

    makeMCQ({ id:'g9eng-d1-069', chapterId:'g9eng-writing', subsection:'narrative', difficulty:2,
      question:'A story title supplies a closing line: <i>... and we never went back.</i> What must you do with it?',
      options:['End the story with those words','Use the words in the title only','Put the words in the middle','Change the words to suit you'],
      answer:'End the story with those words',
      hint:'Read the instruction as a rule about position, not about subject matter.',
      explanation:'The supplied line is where your story has to arrive, so it stands as the last words on the page and everything before it must make them true. Moving it, rewording it or leaving it out answers a task nobody set, however good the story itself is.' }),

    makeMCQ({ id:'g9eng-d1-070', chapterId:'g9eng-writing', subsection:'narrative', difficulty:2,
      question:'A story begins in the past tense. What should happen to the tense after that?',
      options:['It stays past all the way through','It moves to the present for action','It changes at each new paragraph','It follows whatever sounds right'],
      answer:'It stays past all the way through',
      hint:'Ask what a reader does when the tense moves without warning.',
      explanation:'Whichever tense you begin in, you stay in it, because a change of tense tells the reader the time has changed. Slipping into the present for an exciting part makes them reread to check whether this is happening now or then, and that is the moment a story loses its hold.' }),

    makeText({ id:'g9eng-d1-071', chapterId:'g9eng-writing', subsection:'narrative', difficulty:2,
      question:'Read this draft: <p>We walked along the beach until the light went. Then Ram shouts to us from the edge of the water.</p> Write the ONE verb that slips out of the past tense.',
      answer:'shouts',
      hint:'Read the two sentences aloud and listen for the moment the time changes.',
      explanation:'The first sentence is past &mdash; <i>walked</i>, <i>went</i> &mdash; and the second jumps into the present, so the reader cannot tell whether this is happening now or then. It is a one-word repair, and it keeps the whole story inside a single time.' }),

    makeMCQ({ id:'g9eng-d1-072', chapterId:'g9eng-writing', subsection:'narrative', difficulty:2,
      question:'In a story of about 250 words, how many characters can usually be handled well?',
      options:['One or two','Six or seven','Ten at least','As many as you like'],
      answer:'One or two',
      hint:'Work out how many words each character would get if the story were shared out evenly.',
      explanation:'Two hundred and fifty words is barely a page, and every extra character needs a name, a reason to be there and something to do. One or two let you show a person properly; six leave a list of names the reader cannot tell apart by the end.' }),

    makeMCQ({ id:'g9eng-d1-073', chapterId:'g9eng-writing', subsection:'narrative', difficulty:2,
      question:'What lies at the centre of nearly every good short story?',
      options:['Something that goes wrong','A long list of characters','A description of the weather','A moral stated at the end'],
      answer:'Something that goes wrong',
      hint:'Ask what there would be to tell if nothing were ever at stake.',
      explanation:'A story needs a problem, a danger or a change &mdash; something that makes the ending different from the beginning. Weather and characters are the materials rather than the engine, and a moral added at the end explains a story instead of telling one.' }),

    makeMCQ({ id:'g9eng-d1-074', chapterId:'g9eng-writing', subsection:'narrative', difficulty:3,
      question:'Which opening sentence spoils the story that is about to follow it?',
      options:['I still regret losing the race that day','The bus was already full when I ran up','Nobody had slept much the night before','The rain had not stopped since Tuesday'],
      answer:'I still regret losing the race that day',
      hint:'Ask which sentence settles the outcome before the story has begun.',
      explanation:'Naming the loss in line one tells the reader how the race ends, so every sentence after it fills in a result they already hold. The other three set up a situation without settling it, which is what an opening is for: a reason to read the second sentence.' }),

    makeText({ id:'g9eng-d1-075', chapterId:'g9eng-writing', subsection:'narrative', difficulty:3,
      question:'Read this opening: <p>I will never forget the day my bicycle was stolen outside the shop.</p> Write the ONE word that tells the reader what is going to happen, before the story has started.',
      answer:'stolen',
      hint:'Find the word the reader would rather discover for themselves than be handed.',
      explanation:'That one word delivers the whole event in the first line, so what follows can only explain the theft, never let the reader live through it. Rewritten as <i>I leaned my bicycle against the wall and went in for bread</i>, the same story keeps its surprise.' }),

    makeMCQ({ id:'g9eng-d1-076', chapterId:'g9eng-writing', subsection:'narrative', difficulty:3,
      question:'Which opening starts a 250-word story closest to the action?',
      options:['The gate was open, and the dog gone','I woke up, washed and had my tea','It was a Saturday in the month of June','My name is Tina and I am thirteen'],
      answer:'The gate was open, and the dog gone',
      hint:'Ask how many words each opening spends before anything is at stake.',
      explanation:'An open gate and a missing dog put the problem in the first line, which is what a short story cannot afford to delay. Breakfast, the date and an introduction are all true and all cost words before anything happens; in 250 words that is most of a paragraph spent on nothing.' }),

    makeMCQ({ id:'g9eng-d1-077', chapterId:'g9eng-writing', subsection:'narrative', difficulty:3,
      question:'A story ends: <i>Then I woke up and found it had all been a dream.</i> Why is this ending weak?',
      options:['It cancels everything that happened','It is too short for a long story','It uses the past tense throughout','It does not name any characters'],
      answer:'It cancels everything that happened',
      hint:'Ask what the reader is left holding after that last sentence.',
      explanation:'If none of it happened, nothing was ever at stake, and the reader has spent the whole story on events the writer has just withdrawn. Length, tense and names are not the trouble here &mdash; the trouble is an ending that takes back what it gave.' }),

    makeText({ id:'g9eng-d1-078', chapterId:'g9eng-writing', subsection:'narrative', difficulty:3,
      question:'Read this ending: <p>I had gone down to the river that morning afraid of everything. I walked home in the dark alone, and I was not frightened any more.</p> Write the ONE word that says what the narrator was at the start of the day.',
      answer:'afraid',
      hint:'Look for the word naming how the narrator began, before anything in the story happened.',
      explanation:'The story turns on that one word: the narrator begins the day in fear and ends it walking home alone in the dark without any. A short story is measured by such a change, and a reader who cannot name what changed has read events rather than a story.' }),

    makeMCQ({ id:'g9eng-d1-079', chapterId:'g9eng-writing', subsection:'narrative', difficulty:3,
      question:'In a 250-word story, a pupil spends 120 words describing breakfast and 30 on the accident that follows. What is wrong?',
      options:['The weight is on the wrong part','The story has too few characters','The breakfast is badly described','The accident happens too early on'],
      answer:'The weight is on the wrong part',
      hint:'Ask which part the reader came for, and which part actually got the words.',
      explanation:'Space is how a story shows what matters, so the most important event should be given the most room. Half the words on breakfast tells the reader that breakfast is the subject and leaves the accident as a note. The breakfast may be well written; it is simply too long for what it is.' }),

    makeMCQ({ id:'g9eng-d1-080', chapterId:'g9eng-writing', subsection:'narrative', difficulty:4,
      question:'Two pupils open the same story, which must end <i>... and we never went back.</i><p><b>A</b> &mdash; The hut looked ordinary enough from the path.<br><b>B</b> &mdash; We went to a hut and something bad happened there.</p> Which opening serves the story better, and why?',
      options:['A &mdash; it hides what B announces at once','B &mdash; it warns the reader what to expect','A &mdash; it is a shorter sentence than B','B &mdash; it names the place and the event'],
      answer:'A &mdash; it hides what B announces at once',
      hint:'Both openings mention the hut. Ask which one leaves the reader something to find out.',
      explanation:'A looks harmless, which is exactly why the ending can land, and the word <i>ordinary</i> quietly promises it will not stay so. B gives away that something bad happens, so the reader waits to be told what instead of discovering it. A does not win for being shorter.' }),

    makeMCQ({ id:'g9eng-d1-081', chapterId:'g9eng-writing', subsection:'narrative', difficulty:4,
      question:'A story builds for 200 words to a child trapped by a rising river, then a stranger nobody has met appears in the last line and carries her out. What is the weakness?',
      options:['The rescue has not been prepared for','The story is written in the third person','The river has been described too much','The stranger is not given a proper name'],
      answer:'The rescue has not been prepared for',
      hint:'Ask whether anything earlier in the story made this ending possible.',
      explanation:'An ending has to grow out of what came before it, and a rescuer never mentioned solves the problem from outside the story. One earlier sentence &mdash; a fisherman working downstream &mdash; would make the same rescue satisfying. Giving him a name would not, because the fault is preparation.' }),

    makeMCQ({ id:'g9eng-d1-082', chapterId:'g9eng-writing', subsection:'narrative', difficulty:4,
      question:'Two versions of the same story moment:<p><b>A</b> &mdash; Over the next hour we searched the whole village and found nothing.<br><b>B</b> &mdash; We knocked on the blue door. The old man shook his head and shut it.</p> Which version does more for a 250-word story?',
      options:['B &mdash; one scene the reader can watch','A &mdash; it covers the whole hour quickly','B &mdash; it uses shorter sentences than A','A &mdash; it tells the reader more events'],
      answer:'B &mdash; one scene the reader can watch',
      hint:'Ask which version the reader could picture if they had to draw it.',
      explanation:'A summarises an hour and B shows half a minute, and a short story lives on the second: a blue door and a shaken head are things a reader can watch happen. Summary is useful for moving between scenes, and a story made only of summary reads like a report of itself.' }),

    makeMCQ({ id:'g9eng-d1-083', chapterId:'g9eng-writing', subsection:'narrative', difficulty:4,
      question:'The title asks for a story ending <i>... and that was the last time I lied to my mother.</i> A pupil writes a lively story about a football match and closes with those exact words. What is the weakness?',
      options:['The story never earns its last line','The story is about the wrong sport','The last line is in the past tense','The story has too many characters'],
      answer:'The story never earns its last line',
      hint:'Ask what must have happened earlier for that final sentence to be true.',
      explanation:'The supplied line names a lie and a mother, so the story has to contain both or the ending is merely stuck on the end. Using the words exactly is necessary and not sufficient: everything before them must make them the natural last thing to say.' })

  );

})();
