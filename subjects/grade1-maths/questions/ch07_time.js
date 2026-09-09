'use strict';
(function () {

// Grade 1 Maths — Time and Daily Routines
// IDs: g1mth-tim-001 onwards
// Source: MIE Maths Grade 1 Part 1 pp.40-41, Part 2 p.65

// ── day_night (001–030) ────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-tim-001', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'When does the sun shine?',
    options:['During the day','At night','In the morning only','Never'],
    answer:'During the day',
    hint:'Think about when you play outside.',
    explanation:'The <b>sun shines during the day</b>. At night it is dark and we see the moon and stars.' }),

  makeMCQ({ id:'g1mth-tim-002', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'When do we see the moon and stars?',
    options:['At night','During the day','At noon','In the morning'],
    answer:'At night',
    hint:'Look up at the sky when it is dark.',
    explanation:'We see the <b>moon and stars at night</b> when the sky is dark.' }),

  makeTF({ id:'g1mth-tim-003', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'It is dark outside during the day.',
    answer:false,
    explanation:'It is <b>bright</b> during the day because the sun shines. It is dark at <b>night</b>.' }),

  makeTF({ id:'g1mth-tim-004', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'We go to school during the day.',
    answer:true,
    explanation:'Yes! We go to school <b>during the day</b> when it is light outside.' }),

  makeMCQ({ id:'g1mth-tim-005', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a picture of a bright sun in the sky">' +
      '<svg viewBox="0 0 100 100" style="width:90px;height:90px" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="50" cy="50" r="22" fill="#FDE68A" stroke="#F59E0B" stroke-width="3"/>' +
      '<line x1="50" y1="5" x2="50" y2="18" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="50" y1="82" x2="50" y2="95" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="5" y1="50" x2="18" y2="50" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="82" y1="50" x2="95" y2="50" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="18" y1="18" x2="27" y2="27" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="73" y1="73" x2="82" y2="82" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="82" y1="18" x2="73" y2="27" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="18" y1="82" x2="27" y2="73" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>' +
      '</svg></div>' +
      'When would you see this in the sky?',
    options:['During the day','At night','At midnight','Never'],
    answer:'During the day',
    hint:'The sun gives us light and warmth.',
    explanation:'The <b>sun</b> shines <b>during the day</b>. We can see it in the sky when it is light.' }),

  makeMCQ({ id:'g1mth-tim-006', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a picture of the moon and stars in a dark sky">' +
      '<svg viewBox="0 0 100 100" style="width:90px;height:90px" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect width="100" height="100" fill="#1E293B"/>' +
      '<path d="M55 20 A25 25 0 1 0 55 70 A18 18 0 1 1 55 20Z" fill="#FDE68A"/>' +
      '<circle cx="25" cy="20" r="3" fill="white"/>' +
      '<circle cx="75" cy="15" r="2" fill="white"/>' +
      '<circle cx="85" cy="45" r="3" fill="white"/>' +
      '<circle cx="15" cy="55" r="2" fill="white"/>' +
      '<circle cx="60" cy="85" r="3" fill="white"/>' +
      '</svg></div>' +
      'When would you see this picture?',
    options:['At night','During the day','At noon','In the afternoon'],
    answer:'At night',
    hint:'The sky is dark. What time is this?',
    explanation:'We see the <b>moon and stars at night</b> when the sky is dark.' }),

  makeMCQ({ id:'g1mth-tim-007', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'Which activity happens at night?',
    options:['Going to sleep','Going to school','Playing in the park','Having breakfast'],
    answer:'Going to sleep',
    hint:'What do you do when it is dark and late?',
    explanation:'We <b>go to sleep at night</b> when it is dark. School and playing happen during the day.' }),

  makeMCQ({ id:'g1mth-tim-008', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'Which activity happens during the day?',
    options:['Having lunch','Sleeping','Watching the moon','Looking at stars'],
    answer:'Having lunch',
    hint:'We eat lunch at school.',
    explanation:'We have <b>lunch during the day</b>, usually around noon when the sun is up.' }),

  makeTF({ id:'g1mth-tim-009', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'We eat breakfast at night.',
    answer:false,
    explanation:'We eat <b>breakfast in the morning</b>, not at night. Breakfast is the first meal of the day.' }),

  makeMCQ({ id:'g1mth-tim-010', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'What do we do when it is night-time?',
    options:['Sleep and rest','Go to school','Play outside','Eat breakfast'],
    answer:'Sleep and rest',
    hint:'It is dark at night.',
    explanation:'At <b>night</b> we <b>sleep and rest</b> so our body is ready for the next day.' }),

  makeMCQ({ id:'g1mth-tim-011', chapterId:'g1mth-time', difficulty:2, subsection:'day_night',
    question:'It is dark outside. Is it day or night?',
    options:['Night','Day','Morning','Noon'],
    answer:'Night',
    hint:'When is the sky dark?',
    explanation:'When it is <b>dark outside</b>, it is <b>night</b>. During the day the sun makes it bright.' }),

  makeMCQ({ id:'g1mth-tim-012', chapterId:'g1mth-time', difficulty:2, subsection:'day_night',
    question:'Riya sees stars in the sky. What time is it?',
    options:['Night','Morning','Noon','Afternoon'],
    answer:'Night',
    hint:'Stars appear when it is dark.',
    explanation:'Stars come out at <b>night</b> when the sky is dark. We cannot see stars during the day.' }),

  makeTF({ id:'g1mth-tim-013', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'The sky is bright during the day.',
    answer:true,
    explanation:'Yes! The sky is <b>bright during the day</b> because the sun shines.' }),

  makeMCQ({ id:'g1mth-tim-014', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'Which is a night-time activity?',
    options:['Saying prayers and going to bed','Going to the market','Eating lunch at school','Playing cricket'],
    answer:'Saying prayers and going to bed',
    hint:'This happens when it is dark and late.',
    explanation:'<b>Saying prayers and going to bed</b> happens at night-time.' }),

  makeTF({ id:'g1mth-tim-015', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'The moon gives us light at night.',
    answer:true,
    explanation:'Yes! The <b>moon gives us light at night</b>. The sun gives us light during the day.' }),

// ── morning_evening (016–045) ─────────────────────────────────────────────

  makeMCQ({ id:'g1mth-tim-016', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'What do we do first thing in the morning?',
    options:['Wake up and wash our face','Eat dinner','Go to sleep','Watch TV at night'],
    answer:'Wake up and wash our face',
    hint:'Think about what you do right after you wake up.',
    explanation:'In the <b>morning</b> we <b>wake up and wash our face</b> to get ready for the day.' }),

  makeMCQ({ id:'g1mth-tim-017', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'When do we eat breakfast?',
    options:['In the morning','At night','In the evening','At midnight'],
    answer:'In the morning',
    hint:'Breakfast is the first meal of the day.',
    explanation:'We eat <b>breakfast in the morning</b>. It is the first meal of the day.' }),

  makeMCQ({ id:'g1mth-tim-018', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'When do we go to school?',
    options:['In the morning','At night','At midnight','In the evening'],
    answer:'In the morning',
    hint:'School starts early in the day.',
    explanation:'We go to school <b>in the morning</b>. School starts early in the day.' }),

  makeMCQ({ id:'g1mth-tim-019', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'When do we eat lunch?',
    options:['At noon (midday)','At night','In the morning','At midnight'],
    answer:'At noon (midday)',
    hint:'Lunch is the middle meal of the day.',
    explanation:'We eat <b>lunch at noon</b> — in the middle of the day.' }),

  makeMCQ({ id:'g1mth-tim-020', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'When do we eat dinner?',
    options:['In the evening','In the morning','At school','At noon'],
    answer:'In the evening',
    hint:'Dinner is the last big meal of the day.',
    explanation:'We eat <b>dinner in the evening</b>. It is the last meal of the day.' }),

  makeMCQ({ id:'g1mth-tim-021', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'Put these in order: Dinner, Breakfast, Lunch. Which comes FIRST?',
    options:['Breakfast','Dinner','Lunch','All at the same time'],
    answer:'Breakfast',
    hint:'We eat breakfast in the morning.',
    explanation:'<b>Breakfast</b> comes first — in the morning. Then lunch at noon. Then dinner in the evening.' }),

  makeMCQ({ id:'g1mth-tim-022', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'What part of the day comes AFTER morning?',
    options:['Afternoon','Night','Dawn','Midnight'],
    answer:'Afternoon',
    hint:'After 12 o\'clock noon, what comes next?',
    explanation:'<b>Afternoon</b> comes after morning. Morning → Afternoon → Evening → Night.' }),

  makeMCQ({ id:'g1mth-tim-023', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'What part of the day comes BEFORE night?',
    options:['Evening','Morning','Noon','Dawn'],
    answer:'Evening',
    hint:'Think about when the sun sets.',
    explanation:'<b>Evening</b> comes before night. The sun sets in the evening, then it becomes night.' }),

  makeTF({ id:'g1mth-tim-024', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'We eat breakfast in the evening.',
    answer:false,
    explanation:'We eat breakfast in the <b>morning</b>, not the evening. In the evening we eat dinner.' }),

  makeMCQ({ id:'g1mth-tim-025', chapterId:'g1mth-time', difficulty:2, subsection:'morning_evening',
    question:'Aisha goes to school, then eats lunch, then goes home. What part of the day is it when she EATS LUNCH?',
    options:['Noon (midday)','Morning','Evening','Night'],
    answer:'Noon (midday)',
    hint:'Lunch is eaten in the middle of the day.',
    explanation:'Lunch is eaten at <b>noon</b> — the middle of the day.' }),

  makeMCQ({ id:'g1mth-tim-026', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'Ravi wakes up, washes his face and eats his chapati. What part of the day is it?',
    options:['Morning','Evening','Night','Afternoon'],
    answer:'Morning',
    hint:'Waking up and eating breakfast happens at the start of the day.',
    explanation:'Waking up and eating breakfast happens in the <b>morning</b>.' }),

  makeMCQ({ id:'g1mth-tim-027', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'The sun is setting and the sky turns orange. What part of the day is it?',
    options:['Evening','Morning','Noon','Night'],
    answer:'Evening',
    hint:'The sun sets in the evening.',
    explanation:'When the sun sets and the sky turns orange, it is <b>evening</b>.' }),

  makeTF({ id:'g1mth-tim-028', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'Morning comes after evening.',
    answer:false,
    explanation:'The order is: Morning → Afternoon → Evening → Night → Morning again. <b>Evening comes before night</b>, not before morning.' }),

  makeMCQ({ id:'g1mth-tim-029', chapterId:'g1mth-time', difficulty:2, subsection:'morning_evening',
    question:'Which list shows the correct order of the day?',
    options:['Morning, Afternoon, Evening, Night','Night, Morning, Evening, Afternoon','Afternoon, Morning, Night, Evening','Evening, Afternoon, Morning, Night'],
    answer:'Morning, Afternoon, Evening, Night',
    hint:'Think about your whole day from when you wake up.',
    explanation:'The correct order is: <b>Morning → Afternoon → Evening → Night</b>.' }),

  makeTF({ id:'g1mth-tim-030', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'We go to sleep in the evening.',
    answer:false,
    explanation:'We go to sleep at <b>night</b>, not in the evening. Evening is when we eat dinner.' }),

  makeMCQ({ id:'g1mth-tim-031', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'Priya says her prayers and gets into bed. What part of the day is it?',
    options:['Night','Morning','Afternoon','Noon'],
    answer:'Night',
    hint:'We say prayers and go to bed when it is late and dark.',
    explanation:'Going to bed and saying prayers happens at <b>night</b>.' }),

  makeMCQ({ id:'g1mth-tim-032', chapterId:'g1mth-time', difficulty:2, subsection:'morning_evening',
    question:'Which part of the day comes LAST?',
    options:['Night','Afternoon','Morning','Evening'],
    answer:'Night',
    hint:'Think about the end of your day.',
    explanation:'<b>Night</b> comes last in the day. After night, morning begins again.' }),

  makeMCQ({ id:'g1mth-tim-033', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'We play cricket after school. What part of the day is it?',
    options:['Afternoon','Morning','Night','Dawn'],
    answer:'Afternoon',
    hint:'After school is in the middle of the day.',
    explanation:'Playing after school happens in the <b>afternoon</b>.' }),

  makeTF({ id:'g1mth-tim-034', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'Morning comes before afternoon.',
    answer:true,
    explanation:'Yes! <b>Morning comes before afternoon</b>. Morning → Afternoon → Evening → Night.' }),

  makeMCQ({ id:'g1mth-tim-035', chapterId:'g1mth-time', difficulty:1, subsection:'morning_evening',
    question:'Which part of the day is it when you wake up and hear birds singing?',
    options:['Morning','Night','Afternoon','Evening'],
    answer:'Morning',
    hint:'Birds sing when the sun rises.',
    explanation:'Birds sing in the <b>morning</b> when the sun rises.' }),

// ── ordering_events (036–080) ─────────────────────────────────────────────

  makeMCQ({ id:'g1mth-tim-036', chapterId:'g1mth-time', difficulty:1, subsection:'ordering_events',
    question:'Which do you do FIRST in the morning?',
    options:['Wake up','Eat lunch','Go to sleep','Eat dinner'],
    answer:'Wake up',
    hint:'What is the very first thing you do in the morning?',
    explanation:'You <b>wake up</b> first in the morning. Then you wash, eat breakfast and go to school.' }),

  makeMCQ({ id:'g1mth-tim-037', chapterId:'g1mth-time', difficulty:1, subsection:'ordering_events',
    question:'What comes AFTER breakfast?',
    options:['Going to school','Eating dinner','Going to sleep','Watching the stars'],
    answer:'Going to school',
    hint:'After breakfast we get dressed and head out.',
    explanation:'After breakfast, we <b>go to school</b>.' }),

  makeMCQ({ id:'g1mth-tim-038', chapterId:'g1mth-time', difficulty:1, subsection:'ordering_events',
    question:'Which comes LAST in the day?',
    options:['Going to sleep','Eating breakfast','Going to school','Playing'],
    answer:'Going to sleep',
    hint:'What is the last thing you do before night?',
    explanation:'<b>Going to sleep</b> comes last — at the end of the day.' }),

  makeMCQ({ id:'g1mth-tim-039', chapterId:'g1mth-time', difficulty:2, subsection:'ordering_events',
    question:'Zara wakes up, eats breakfast, and then goes to school. What does she do SECOND?',
    options:['Eats breakfast','Wakes up','Goes to school','Goes to sleep'],
    answer:'Eats breakfast',
    hint:'Count the steps: first, second, third.',
    explanation:'Zara does these in order: (1) Wakes up, (2) <b>Eats breakfast</b>, (3) Goes to school.' }),

  makeMCQ({ id:'g1mth-tim-040', chapterId:'g1mth-time', difficulty:2, subsection:'ordering_events',
    question:'Ali wakes up, eats breakfast, and then goes to school. What does he do THIRD?',
    options:['Goes to school','Eats breakfast','Wakes up','Goes to sleep'],
    answer:'Goes to school',
    hint:'Count to three: first, second, third.',
    explanation:'Ali does: (1) Wakes up, (2) Eats breakfast, (3) <b>Goes to school</b>.' }),

  makeMCQ({ id:'g1mth-tim-041', chapterId:'g1mth-time', difficulty:1, subsection:'ordering_events',
    question:'Which event happens BEFORE lunch?',
    options:['Breakfast','Dinner','Going to sleep','Watching the moon'],
    answer:'Breakfast',
    hint:'Think about the order of meals in a day.',
    explanation:'<b>Breakfast</b> happens before lunch. We eat breakfast in the morning and lunch at noon.' }),

  makeMCQ({ id:'g1mth-tim-042', chapterId:'g1mth-time', difficulty:1, subsection:'ordering_events',
    question:'Which event happens AFTER lunch?',
    options:['Dinner','Breakfast','Waking up','Going to school'],
    answer:'Dinner',
    hint:'Which meal comes after lunch?',
    explanation:'<b>Dinner</b> happens after lunch. Lunch is at noon, dinner is in the evening.' }),

  makeMCQ({ id:'g1mth-tim-043', chapterId:'g1mth-time', difficulty:2, subsection:'ordering_events',
    question:'Here are 3 events: (A) Going to school (B) Eating dinner (C) Going to sleep. Which is the CORRECT order?',
    options:['A, B, C','B, A, C','C, A, B','B, C, A'],
    answer:'A, B, C',
    hint:'Think about what comes first, next, and last.',
    explanation:'The correct order is: (A) Going to school → (B) Eating dinner → (C) Going to sleep.' }),

  makeTF({ id:'g1mth-tim-044', chapterId:'g1mth-time', difficulty:1, subsection:'ordering_events',
    question:'Dinner comes before breakfast.',
    answer:false,
    explanation:'<b>Breakfast comes before dinner</b>. We eat breakfast in the morning and dinner in the evening.' }),

  makeMCQ({ id:'g1mth-tim-045', chapterId:'g1mth-time', difficulty:2, subsection:'ordering_events',
    question:'Sam does 3 things: (1) plays after school, (2) eats dinner, (3) goes to sleep. What does he do SECOND?',
    options:['Eats dinner','Plays after school','Goes to sleep','Eats breakfast'],
    answer:'Eats dinner',
    hint:'Count: first = plays, second = ?, third = sleeps.',
    explanation:'Sam does: (1) Plays after school, (2) <b>Eats dinner</b>, (3) Goes to sleep.' }),

  makeMCQ({ id:'g1mth-tim-046', chapterId:'g1mth-time', difficulty:1, subsection:'ordering_events',
    question:'Which comes FIRST in the morning routine?',
    options:['Waking up','Eating dinner','Going to sleep','Playing games'],
    answer:'Waking up',
    hint:'The very first thing every morning.',
    explanation:'<b>Waking up</b> is the very first thing we do in the morning.' }),

  makeMCQ({ id:'g1mth-tim-047', chapterId:'g1mth-time', difficulty:2, subsection:'ordering_events',
    question:'Mia does these in order: wash face → eat breakfast → go to school. What does she do AFTER washing her face?',
    options:['Eat breakfast','Go to school','Go to sleep','Come home'],
    answer:'Eat breakfast',
    hint:'Look at what comes right after the first step.',
    explanation:'After washing her face, Mia <b>eats breakfast</b>.' }),

  makeTF({ id:'g1mth-tim-048', chapterId:'g1mth-time', difficulty:1, subsection:'ordering_events',
    question:'We go to school before we wake up.',
    answer:false,
    explanation:'We <b>wake up first</b>, then get ready and go to school.' }),

  makeMCQ({ id:'g1mth-tim-049', chapterId:'g1mth-time', difficulty:1, subsection:'ordering_events',
    question:'What do you do BEFORE going to bed?',
    options:['Say prayers and brush teeth','Eat breakfast','Go to school','Play in the park'],
    answer:'Say prayers and brush teeth',
    hint:'Think about your bedtime routine.',
    explanation:'Before going to bed, we <b>say prayers and brush our teeth</b>.' }),

  makeMCQ({ id:'g1mth-tim-050', chapterId:'g1mth-time', difficulty:2, subsection:'ordering_events',
    question:'Here are 4 things: Wake up → ? → Eat lunch → Go home. What fits in the ?',
    options:['Go to school','Go to sleep','Eat dinner','Watch stars'],
    answer:'Go to school',
    hint:'After breakfast, where do you go?',
    explanation:'The order is: Wake up → <b>Go to school</b> → Eat lunch → Go home.' }),

  makeMCQ({ id:'g1mth-tim-051', chapterId:'g1mth-time', difficulty:1, subsection:'ordering_events',
    question:'Which meal comes FIRST in the day?',
    options:['Breakfast','Dinner','Lunch','Supper'],
    answer:'Breakfast',
    hint:'Think about the first meal of the day.',
    explanation:'<b>Breakfast</b> is the first meal of the day, eaten in the morning.' }),

  makeMCQ({ id:'g1mth-tim-052', chapterId:'g1mth-time', difficulty:1, subsection:'ordering_events',
    question:'Which meal comes LAST in the day?',
    options:['Dinner','Breakfast','Lunch','Porridge'],
    answer:'Dinner',
    hint:'The last meal of the day.',
    explanation:'<b>Dinner</b> is the last meal, eaten in the evening.' }),

  makeTF({ id:'g1mth-tim-053', chapterId:'g1mth-time', difficulty:1, subsection:'ordering_events',
    question:'We eat breakfast AFTER lunch.',
    answer:false,
    explanation:'We eat <b>breakfast before lunch</b>. Breakfast is in the morning and lunch is at noon.' }),

  makeMCQ({ id:'g1mth-tim-054', chapterId:'g1mth-time', difficulty:2, subsection:'ordering_events',
    question:'Neha does: (1) come home, (2) do homework, (3) eat dinner. What comes BETWEEN coming home and eating dinner?',
    options:['Do homework','Go to school','Wake up','Eat breakfast'],
    answer:'Do homework',
    hint:'What is step 2?',
    explanation:'Between coming home and eating dinner, Neha <b>does her homework</b>.' }),

  makeMCQ({ id:'g1mth-tim-055', chapterId:'g1mth-time', difficulty:1, subsection:'ordering_events',
    question:'Which activity happens in the AFTERNOON, after school?',
    options:['Playing with friends','Eating breakfast','Going to school','Sleeping'],
    answer:'Playing with friends',
    hint:'After school, children like to play.',
    explanation:'After school, in the <b>afternoon</b>, children <b>play with friends</b>.' }),

  makeTF({ id:'g1mth-tim-056', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'The moon shines during the day.',
    answer:false,
    explanation:'The moon shines at <b>night</b>. During the day, the sun shines.' }),

  makeMCQ({ id:'g1mth-tim-057', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'When do most children sleep?',
    options:['At night','In the morning','At noon','After breakfast'],
    answer:'At night',
    hint:'When is it dark and quiet?',
    explanation:'Children sleep <b>at night</b> when it is dark.' }),

  makeTF({ id:'g1mth-tim-058', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'We can see stars in the sky during the day.',
    answer:false,
    explanation:'We see stars <b>at night</b>. During the day the sky is bright with sunlight.' }),

  makeMCQ({ id:'g1mth-tim-059', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'Which animal is mostly awake at night?',
    options:['Owl','Hen','Butterfly','Cat'],
    answer:'Owl',
    hint:'Which bird hunts in the dark?',
    explanation:'An <b>owl</b> is awake at night. It is a nocturnal animal.' }),

  makeTF({ id:'g1mth-tim-060', chapterId:'g1mth-time', difficulty:1, subsection:'day_night',
    question:'It is bright outside during the day because the sun is shining.',
    answer:true,
    explanation:'<b>True.</b> During the day, the sun shines and makes everything bright.' }),

);
})();
