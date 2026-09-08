'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - Presentation & Multimedia   (examWeight 1)
//
//  ⚠ THE SMALLEST SLOT IN THE PAPER, AND THE MOST ARTEFACT-SHAPED SYLLABUS
//    SECTION. The NCF asks learners to PRODUCE a video, a comic strip and an
//    animated clip; the N540 is a written paper with no practical component, so
//    what it can and does ask is the PLANNING and the PRINCIPLES - storyboards,
//    slide masters, where each medium is appropriate. Those are what this
//    chapter covers. The artefact outcomes are deliberately not assessed here
//    and are recorded as out of scope in blueprint-ict.md.
//
//  ⚠ NO SLIDE SCREENSHOTS, for the artwork reason recorded across this pack.
//    Views and dialogs are named rather than shown.
//
//  Source: NCE ICT (N540) 2021-2025; NCF Grades 7-9 §8.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9ict-presentation';

const MCQ = [
  ['g9ict-pr-001', 'design_templates', 1,
   'What is a single page of a presentation called?',
   ['A slide', 'A sheet', 'A frame', 'A page'], 'A slide',
   'It is shown one at a time on a screen.',
   'A presentation is made of slides, shown one after another.'],

  ['g9ict-pr-002', 'design_templates', 1,
   'What does a <b>design template</b> give a presentation?',
   ['A consistent set of colours, fonts and backgrounds',
    'The words that will be written on every slide',
    'A printed copy of the slides for the audience',
    'A recording of the speaker reading the slides'],
   'A consistent set of colours, fonts and backgrounds',
   'It sets how the slides look, not what they say.',
   'A design template applies one coordinated look - colours, fonts and background - to every slide.'],

  ['g9ict-pr-003', 'design_templates', 2,
   'Why should a presentation use the same design template throughout?',
   ['It looks consistent and is easier to follow',
    'It makes the file smaller than any other option',
    'It stops the slides from being printed',
    'It removes the need for a title slide'],
   'It looks consistent and is easier to follow',
   'Think about the audience, not the file.',
   'A consistent look keeps the audience focused on the content instead of a changing appearance.'],

  ['g9ict-pr-004', 'slide_masters', 2,
   'What is a <b>slide master</b> used for?',
   ['To set formatting that applies to every slide at once',
    'To lock the whole presentation with a password',
    'To record the speaker&rsquo;s voice',
    'To print the slides six to a page'],
   'To set formatting that applies to every slide at once',
   'Change it once, and every slide changes.',
   'The slide master holds the formatting inherited by every slide, so one change updates them all.'],

  ['g9ict-pr-005', 'slide_masters', 3,
   'A school logo must appear in the same corner of all 30 slides. What is the most efficient way to do it?',
   ['Place it once on the slide master',
    'Paste it separately onto each of the 30 slides',
    'Print it on the handouts only',
    'Add it to the first slide and hope it repeats'],
   'Place it once on the slide master',
   'One action should affect every slide.',
   'Anything placed on the slide master appears on every slide that uses it, so the logo is added once.'],

  ['g9ict-pr-006', 'slide_masters', 3,
   'Why might a presentation use <b>more than one</b> slide master?',
   ['Different sections need different layouts and looks',
    'A presentation cannot have more than ten slides otherwise',
    'It halves the file size',
    'It is required before a presentation can be printed'],
   'Different sections need different layouts and looks',
   'Think of a long talk split into parts.',
   'Multiple masters let different sections of one presentation carry different designs while each stays internally consistent.'],

  ['g9ict-pr-007', 'animations', 1,
   'What does an <b>animation</b> do in a presentation?',
   ['Controls how an item appears or moves on a slide',
    'Changes the printer settings',
    'Sets the font of the whole presentation',
    'Saves the file automatically'],
   'Controls how an item appears or moves on a slide',
   'It affects one object on the slide.',
   'An animation controls how an object enters, moves or leaves a slide.'],

  ['g9ict-pr-008', 'animations', 2,
   'What is a slide <b>transition</b>?',
   ['The effect used when moving from one slide to the next',
    'The movement of a single bullet point on one slide',
    'The order in which the slides will be printed out',
    'The time and date the presentation was first created'],
   'The effect used when moving from one slide to the next',
   'It happens between slides, not inside one.',
   'A transition is the visual effect shown as one slide is replaced by the next; an animation acts on objects within a slide.'],

  ['g9ict-pr-009', 'animations', 3,
   'Why should animations be used sparingly in a presentation?',
   ['Too many distract the audience from the message',
    'They cannot be printed',
    'They make the slides impossible to edit',
    'They use up the computer&rsquo;s memory permanently'],
   'Too many distract the audience from the message',
   'Think about the audience again.',
   'Excessive movement draws attention away from the content the presentation exists to communicate.'],

  ['g9ict-pr-010', 'charts_tables', 1,
   'Which is the best way to show how sales changed over twelve months?',
   ['A line chart', 'A paragraph of text', 'A single photograph', 'A word cloud'],
   'A line chart',
   'The data changes over time.',
   'A line chart shows a trend over time far more clearly than the same figures written out.'],

  ['g9ict-pr-011', 'charts_tables', 2,
   'Which chart is best for showing each subject&rsquo;s <b>share</b> of a class total?',
   ['A pie chart', 'A line chart', 'A scatter chart', 'A flowchart'], 'A pie chart',
   'The whole is divided into parts.',
   'A pie chart shows parts of a whole as slices, so shares of a total are read at a glance.'],

  ['g9ict-pr-012', 'charts_tables', 2,
   'Which is the best way to present exact figures that the audience must read precisely?',
   ['A table', 'A pie chart', 'An animation', 'A photograph'], 'A table',
   'Exact numbers must be readable.',
   'A table shows exact values; a chart shows a pattern but not precise figures.'],

  ['g9ict-pr-013', 'charts_tables', 3,
   'A chart is pasted onto a slide but nobody can tell what the axes mean. What is missing?',
   ['Axis titles and a chart title', 'A slide transition',
    'A design template for the slide', 'A speaker note for the presenter'],
   'Axis titles and a chart title',
   'A chart must label what it shows.',
   'Without a title and labelled axes a chart cannot be interpreted, however well it is drawn.'],

  ['g9ict-pr-014', 'notes_handouts', 1,
   'What are <b>speaker notes</b> used for?',
   ['Reminders for the presenter that the audience does not see',
    'Extra slides shown to the audience at the end of the talk',
    'The title of the presentation, repeated on every slide',
    'The list of animations used on each slide of the talk'],
   'Reminders for the presenter that the audience does not see',
   'They are for the person talking.',
   'Speaker notes are prompts attached to a slide, visible to the presenter but not projected.'],

  ['g9ict-pr-015', 'notes_handouts', 2,
   'What is a <b>handout</b> in a presentation program?',
   ['Printed slides given to the audience',
    'A slide with no text on it',
    'The recorded narration',
    'The list of file properties'],
   'Printed slides given to the audience',
   'It is something the audience takes away.',
   'A handout prints several slides to a page for the audience to keep and annotate.'],

  ['g9ict-pr-016', 'notes_handouts', 3,
   'Which view shows one slide with its speaker notes underneath, ready to be printed?',
   ['Notes Page view', 'Slide Show view', 'Slide Sorter view', 'Reading view'],
   'Notes Page view',
   'The name says what is on the page.',
   'Notes Page view shows a slide with its notes below it, which is the layout that prints.'],

  ['g9ict-pr-017', 'print_preview', 2,
   'What is the purpose of <b>Print Preview</b>?',
   ['To see exactly how the pages will look before printing',
    'To send the finished file to someone else by email',
    'To change the order in which the animations will run',
    'To record the presentation as it is being given'],
   'To see exactly how the pages will look before printing',
   'It is used before paper is used.',
   'Print Preview shows the printed result on screen so mistakes are caught before paper and ink are spent.'],

  ['g9ict-pr-018', 'storyboarding', 2,
   'What is a <b>storyboard</b> used for?',
   ['Planning the order and content of scenes or slides before making them',
    'Storing the finished video file once all the editing is done',
    'Printing the slides for the audience to take away afterwards',
    'Recording the narration that plays over the finished clip'],
   'Planning the order and content of scenes or slides before making them',
   'It comes before the work, not after.',
   'A storyboard sketches each scene or slide in order so the sequence can be planned before production starts.'],

  ['g9ict-pr-019', 'storyboarding', 3,
   'Why is a storyboard drawn before a video is filmed?',
   ['Mistakes in the plan are cheap to fix; mistakes in filming are not',
    'A video cannot be edited once the filming has been finished',
    'The camera needs it before it will record anything at all',
    'It replaces the need for a script and for any narration'],
   'Mistakes in the plan are cheap to fix; mistakes in filming are not',
   'Compare the cost of redrawing with the cost of refilming.',
   'Planning on paper lets the sequence be corrected before time, equipment and people are committed to filming.'],

  ['g9ict-pr-020', 'authoring_tools', 3,
   'Which is the most suitable tool for assembling clips, adding recorded narration and overlaying text on a video?',
   ['Video editing software', 'A spreadsheet',
    'A database management system', 'A web browser'],
   'Video editing software',
   'Only one of these works with moving images.',
   'Video editing software sequences clips and adds narration, titles and overlay text.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9ict-pr-021', 'slide_masters', 2,
   'Name the feature that holds the formatting inherited by every slide, so one change updates them all.',
   'Slide master', ['the slide master', 'master slide'],
   'Two words.', 'The slide master carries formatting shared by every slide.'],
  ['g9ict-pr-022', 'animations', 2,
   'Give the term for the visual effect used when moving from one slide to the next.',
   'Transition', ['slide transition', 'a transition'],
   'It happens between slides.',
   'A transition is the effect shown as one slide replaces another.'],
  ['g9ict-pr-023', 'notes_handouts', 2,
   'Give the term for printed slides given to the audience to keep.',
   'Handout', ['handouts', 'a handout'],
   'The audience takes it away.',
   'A handout prints slides for the audience.'],
  ['g9ict-pr-024', 'storyboarding', 2,
   'Name the planning document that sketches each scene of a video in order before filming begins.',
   'Storyboard', ['a storyboard', 'story board'],
   'One word, two halves.',
   'A storyboard plans the sequence of scenes before production.'],
  ['g9ict-pr-025', 'charts_tables', 2,
   'Name the type of chart that shows each part as a slice of a whole.',
   'Pie chart', ['pie', 'a pie chart'],
   'It is round.',
   'A pie chart shows parts of a whole as slices.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

// ⚠ DEPTH TOP-UP. Measured after the first draft: `print_preview` and
//   `authoring_tools` held ONE item each, so their Practise cards would have
//   opened with a single question and been finished in ten seconds. Every
//   declared subsection in this pack is held at three or more.
const MCQ2 = [
  ['g9ict-pr-026', 'print_preview', 2,
   'A presentation is to be printed with six slides on each sheet. Where is that chosen?',
   ['In the print settings, as a handout layout',
    'On the slide master, as a repeating layout', 'In the animation pane, as a timing setting', 'In the design template, as a page setting'],
   'In the print settings, as a handout layout',
   'It is a printing choice, not a design one.',
   'The number of slides per printed page is a handout setting chosen when printing.'],

  ['g9ict-pr-027', 'print_preview', 3,
   'Print Preview shows the last slide printing almost empty on a page of its own. What is the best response?',
   ['Adjust the layout before printing',
    'Print it anyway and throw the page away',
    'Delete the last slide',
    'Change the file name'],
   'Adjust the layout before printing',
   'That is what a preview is for.',
   'Preview exists so the layout can be corrected before paper and ink are used.'],

  ['g9ict-pr-028', 'authoring_tools', 2,
   'Which tool is most suitable for assembling drawn panels with speech bubbles into an educational comic strip?',
   ['Comic or graphics authoring software', 'A spreadsheet with the gridlines hidden',
    'A database of the characters and their lines', 'A web browser with a drawing add-on'],
   'Comic or graphics authoring software',
   'It must place pictures and text together on a panel.',
   'Comic and graphics authoring tools lay out panels, artwork and speech bubbles in sequence.'],

  ['g9ict-pr-029', 'authoring_tools', 3,
   'What should decide which authoring tool is chosen for a project?',
   ['The kind of media the project needs and who the audience is',
    'Whichever tool has the most buttons on its toolbar',
    'Whichever tool was released most recently by its maker',
    'Whichever tool produces files of the largest size'],
   'The kind of media the project needs and who the audience is',
   'Fit the tool to the job.',
   'A tool is chosen for the media it handles and the audience it must reach, not for its novelty.'],
];

MCQ2.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

// ══════════════════════════════════════════════════════════════════════════
//  SYLLABUS-GAP BLOCK. `animated_clips`, `video_enhancement` and
//  `comic_strips` were declared with nothing behind them.
//  ⚠ THESE ARE ARTEFACT OUTCOMES AND NOTHING HERE ASKS FOR AN ARTEFACT. The
//    NCE is a written paper with no practical component; what it can ask - and
//    what these items ask - is how the artefact is PUT TOGETHER: what a frame
//    is, why narration is recorded separately, what a panel and a speech
//    bubble are for. Producing the clip itself stays out of scope, recorded in
//    blueprint-ict.md.
// ══════════════════════════════════════════════════════════════════════════
const MCQ3 = [
  ['g9ict-pr-030', 'animated_clips', 1,
   'An animation is made of a sequence of still pictures. What is each one called?',
   ['A frame', 'A slide', 'A pixel', 'A layer'], 'A frame',
   'They are shown one after another, very quickly.',
   'Each still picture in an animation is a frame; playing them in quick succession creates movement.'],

  ['g9ict-pr-031', 'animated_clips', 2,
   'What creates the impression of movement in an animation?',
   ['Showing slightly different frames quickly, one after another',
    'Making the screen brighter for the length of the clip',
    'Adding music to the clip while the pictures stay still',
    'Printing the frames on paper in the order they were drawn'],
   'Showing slightly different frames quickly, one after another',
   'Each frame differs a little from the last.',
   'The eye blends rapidly shown frames that each differ slightly, which reads as movement.'],

  ['g9ict-pr-032', 'animated_clips', 3,
   'An animated clip plays jerkily. Which change is most likely to smooth it?',
   ['Use more frames per second',
    'Make the pictures larger',
    'Add more colours to each frame',
    'Play it on a bigger screen'],
   'Use more frames per second',
   'The gap between frames is what is being seen.',
   'More frames per second means smaller changes between frames, so the movement looks continuous.'],

  ['g9ict-pr-033', 'video_enhancement', 1,
   'What is <b>narration</b> in a video?',
   ['A recorded voice explaining what is shown',
    'The title at the start',
    'The background music only',
    'The list of people who made it'],
   'A recorded voice explaining what is shown',
   'Someone is speaking over the pictures.',
   'Narration is a recorded spoken commentary added to the video.'],

  ['g9ict-pr-034', 'video_enhancement', 2,
   'Text placed on top of the picture in a video, such as a name or a caption, is called:',
   ['Overlay text', 'A storyboard', 'A frame rate', 'A transition'],
   'Overlay text',
   'It lies over the image.',
   'Overlay text is placed on top of the video image to caption or label what is being shown.'],

  ['g9ict-pr-035', 'video_enhancement', 3,
   'Why is narration usually recorded <b>after</b> the clips have been put in order?',
   ['So the words match the pictures and their timing',
    'Because a microphone cannot be used earlier',
    'So the video file is smaller',
    'Because the camera must be switched off first'],
   'So the words match the pictures and their timing',
   'The commentary has to fit what is on screen.',
   'Once the sequence and its timings are fixed, the narration can be written and recorded to match them.'],

  ['g9ict-pr-036', 'comic_strips', 1,
   'In a comic strip, what is each separate box of the story called?',
   ['A panel', 'A frame rate', 'A margin', 'A slide'], 'A panel',
   'The strip is read from one to the next.',
   'A comic strip is made of panels, each showing one moment of the story.'],

  ['g9ict-pr-037', 'comic_strips', 2,
   'In a comic strip, what does a <b>speech bubble</b> show?',
   ['The words a character is saying',
    'The name of the artist',
    'The time of day in the story',
    'The page number of the strip'],
   'The words a character is saying',
   'It points at whoever is talking.',
   'A speech bubble holds a character&rsquo;s spoken words and its tail points to the speaker.'],

  ['g9ict-pr-038', 'comic_strips', 3,
   'Why is a comic strip a useful way of teaching a topic to younger pupils?',
   ['Pictures and short text together make the ideas easier to follow',
    'It removes the need for any words at all on the page',
    'It can only be read by adults who know the topic already',
    'It takes far longer to read than the same page of a textbook'],
   'Pictures and short text together make the ideas easier to follow',
   'Think about how much text a young reader can manage.',
   'Combining a picture with a short caption carries the idea with far less reading than a page of prose.'],
];

MCQ3.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

})();
