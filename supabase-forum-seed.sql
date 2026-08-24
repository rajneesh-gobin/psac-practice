-- ═══════════════════════════════════════════════════════════════════════════
--  MathMaster — Forum Seed Data
--  Run in Supabase → SQL Editor
--  Prerequisites: supabase-db-patch.sql must have been run first.
--
--  What this does:
--    1. Adds status column to forum_posts (open/closed)
--    2. Seeds ~52 realistic posts across all 9 forum categories
--    3. Seeds ~95 replies with Mauritius-authentic names and PSAC content
--    4. Marks suggestion posts for already-implemented features as closed
--
--  Safe to re-run: uses DO block to skip if data already exists.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Step 1: Add status column ─────────────────────────────────────────────
ALTER TABLE public.forum_posts
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'open'
  CHECK (status IN ('open', 'closed'));

-- ── Step 2: Seed posts ────────────────────────────────────────────────────
-- Skip entirely if seed data already exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.forum_posts WHERE author_name = 'Priya Ramkhelawon' LIMIT 1) THEN
    RAISE NOTICE 'Seed data already present — skipping.';
    RETURN;
  END IF;

  -- ──────────────────────────────────────────────────────────────────────
  --  GENERAL HELP
  -- ──────────────────────────────────────────────────────────────────────
  INSERT INTO public.forum_posts (category, title, body, author_name, author_type, created_at) VALUES
  ('general', 'How do I reset my child''s login PIN?',
   'Hello, my daughter forgot her student PIN and can no longer log in. Is there a way to reset it from my parent account? I''ve looked through the settings but I can''t find a reset option. Thank you in advance!',
   'Priya Ramkhelawon', 'parent', NOW() - INTERVAL '88 days'),

  ('general', 'App shows white screen on my iPhone',
   'Hello everyone, since yesterday when I open MathMaster on my iPhone (iOS 16), I just see a white/blank screen. I tried closing and reopening the app but the same problem. My husband''s Android phone works fine. Any ideas?',
   'Arvind Seenauth', 'parent', NOW() - INTERVAL '62 days'),

  ('general', 'How to switch between my two children?',
   'I have two children using MathMaster — one in Grade 4 and one in Grade 6. After logging in with my parent account, I can only see one child''s dashboard. How do I switch between them? I''m new to the app so sorry if this is obvious!',
   'Meena Soobron', 'parent', NOW() - INTERVAL '45 days'),

  ('general', 'Can I use MathMaster on a Chromebook?',
   'My son''s school gave him a Chromebook this year. Can he use MathMaster on it? Or is it only for phones and tablets? Wanted to check before setting it up for him.',
   'Sunita Dhanoo', 'parent', NOW() - INTERVAL '28 days'),

  ('general', 'My son''s timetable disappeared after I logged out',
   'We spent time setting up a full week study schedule for my son but after I logged out and logged back in, the timetable was empty. Did I do something wrong? Is the timetable not saved to the account?',
   'Rajesh Gobin', 'parent', NOW() - INTERVAL '11 days'),

  ('general', 'Progress not saving when using school WiFi',
   'My daughter uses MathMaster during lunch break at school but her scores and progress don''t seem to save when she''s on the school WiFi. At home everything saves perfectly. Could the school network be blocking something?',
   'Nadia Khodabaccus', 'parent', NOW() - INTERVAL '3 days');

  -- ──────────────────────────────────────────────────────────────────────
  --  MATHS HELP
  -- ──────────────────────────────────────────────────────────────────────
  INSERT INTO public.forum_posts (category, title, body, author_name, author_type, created_at) VALUES
  ('maths', 'Long division with remainders — my daughter keeps getting the wrong answer',
   'My Grade 5 daughter has been struggling with long division, especially when there are remainders. For example, 347 ÷ 8 — she gets the quotient wrong every time. I''ve tried explaining it but I''m not very confident with maths myself. Can someone give a step-by-step method that might help her?',
   'Meena Soobron', 'parent', NOW() - INTERVAL '82 days'),

  ('maths', 'BODMAS — order of operations question',
   'In class we learned BODMAS but I keep getting confused about multiplication and division — do you always do multiplication before division? My teacher said they''re equal priority but then how do you decide which to do first? Example: 12 ÷ 3 × 2 = ?',
   'Rishi Pertab', 'student', NOW() - INTERVAL '67 days'),

  ('maths', 'Proper fractions vs improper fractions vs mixed numbers',
   'My son keeps confusing proper fractions, improper fractions and mixed numbers. Can someone give a clear simple explanation with examples? The textbook definition is a bit hard for him to grasp.',
   'Anita Boolell', 'parent', NOW() - INTERVAL '52 days'),

  ('maths', 'LCM and HCF — can someone explain the difference clearly?',
   'For my Grade 5 exam revision, I have LCM and HCF questions but I always get them mixed up. I know LCM is Lowest Common Multiple and HCF is Highest Common Factor, but when do you use each one? Is there a trick to remember which is which?',
   'Kiran Gopal', 'student', NOW() - INTERVAL '40 days'),

  ('maths', 'Area of compound shapes — stuck on this chapter',
   'I''m in Grade 5 and the chapter on compound shapes is really hard for me. I understand area of a simple square or rectangle but when the shape is L-shaped or has pieces missing, I don''t know how to start. Any tips?',
   'Maya Ramkhelawon', 'student', NOW() - INTERVAL '24 days'),

  ('maths', 'My Grade 4 daughter scored 2/10 on fractions quiz — is this normal?',
   'She just started Grade 4 and had her first fractions quiz in class. She got 2 out of 10 which is very low. I''m worried because PSAC is in a few years and fractions seem to be a big topic. Is this expected at this stage or should I be concerned? She''s normally quite good at maths.',
   'Vikram Pertab', 'parent', NOW() - INTERVAL '13 days'),

  ('maths', 'Word problems involving ratio — my son gets confused',
   'My son understands ratio when it''s written as numbers (like 3:2) but as soon as it''s in a word problem he loses his way. He doesn''t know how to set up the ratio from the text. Do you have any strategy for this?',
   'Priya Ramkhelawon', 'parent', NOW() - INTERVAL '6 days'),

  ('maths', 'How is Grade 6 maths different from Grade 5?',
   'My daughter is finishing Grade 5 and moving to Grade 6 next year. As a parent I want to prepare her over the holidays. What are the main topics that are new or harder in Grade 6? Should I worry a lot about the step up in difficulty?',
   'Sunita Dhanoo', 'parent', NOW() - INTERVAL '2 days');

  -- ──────────────────────────────────────────────────────────────────────
  --  ENGLISH HELP
  -- ──────────────────────────────────────────────────────────────────────
  INSERT INTO public.forum_posts (category, title, body, author_name, author_type, created_at) VALUES
  ('english', 'Tips for answering comprehension passages',
   'For PSAC English, many children lose marks on comprehension because they rush. Here are my top strategies:
1. Read the questions FIRST before reading the passage — this tells you what to look for
2. Read the passage ONCE for general understanding, then read again for details
3. For "find a word that means..." questions, look for context clues in the surrounding sentences
4. For "explain why" questions, always go back to the text — never guess from your own knowledge
5. Check the mark allocation — a 2-mark question needs 2 clear points in your answer

Please share any other strategies you use!',
   'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '77 days'),

  ('english', 'Simile vs metaphor — what is the difference?',
   'I always get confused between simile and metaphor in English. My teacher says a simile uses "like" or "as" but sometimes I see sentences that seem like comparisons without those words and I''m not sure which type they are. Can someone give a clear explanation with examples?',
   'Léa Labonté', 'student', NOW() - INTERVAL '63 days'),

  ('english', 'Common punctuation mistakes my daughter keeps making',
   'My Grade 5 daughter loses marks on punctuation every time. The main mistakes are: forgetting to use a comma after a subordinate clause at the start of a sentence, confusing it''s and its, and not using apostrophes correctly for possession. Are there simple rules she can memorise?',
   'Anita Boolell', 'parent', NOW() - INTERVAL '48 days'),

  ('english', 'Direct speech vs indirect speech — so confusing!',
   'I''m in Grade 5 and direct/indirect speech is the chapter I find hardest. Especially the part about changing tenses and pronouns when converting from direct to indirect. Is there a simple method or checklist I can follow? Our exam is in 2 weeks.',
   'Asha Jugessur', 'student', NOW() - INTERVAL '29 days'),

  ('english', 'Any tips for essay writing in Grade 5?',
   'I struggle to write long essays. I always run out of ideas after one or two paragraphs. Also my teacher says my paragraphs are too short. Any tips for how to plan and develop a longer essay in the PSAC exam?',
   'Natan Labonté', 'student', NOW() - INTERVAL '14 days'),

  ('english', 'What vocabulary level is expected for PSAC English?',
   'My son is in Grade 6 preparing for PSAC. His vocabulary in spoken English is good but when writing he uses simple words. The examiner said his language was "not varied enough." What kind of vocabulary should he be building? Are there word lists we should learn?',
   'Rajesh Gobin', 'parent', NOW() - INTERVAL '4 days');

  -- ──────────────────────────────────────────────────────────────────────
  --  SCIENCE HELP
  -- ──────────────────────────────────────────────────────────────────────
  INSERT INTO public.forum_posts (category, title, body, author_name, author_type, created_at) VALUES
  ('science', 'Simple explanation of photosynthesis for Grade 4?',
   'My daughter is in Grade 4 and they''ve just started photosynthesis. She understands that plants make their own food but she''s confused about what goes in and what comes out. Can someone explain it simply without the complicated formula?',
   'Kiran Gopal', 'student', NOW() - INTERVAL '74 days'),

  ('science', 'Food chains vs food webs — what is the difference?',
   'I know a food chain shows who eats who in a line, like grass → rabbit → fox. But what is a food web? My textbook shows a complicated diagram with lots of arrows going different directions and I don''t understand what it means.',
   'Maya Ramkhelawon', 'student', NOW() - INTERVAL '57 days'),

  ('science', 'My son keeps mixing up solids, liquids and gases',
   'Year 4 states of matter — my son knows the definitions but when given an example he still sometimes puts it in the wrong category. For example, he thought steam was a liquid because it comes from water. How to help him think about it more logically?',
   'Vikram Pertab', 'parent', NOW() - INTERVAL '41 days'),

  ('science', 'Best way to remember vertebrates vs invertebrates?',
   'We need to know vertebrates and invertebrates for the science test. I can remember the definitions (vertebrates have a backbone, invertebrates don''t) but I mix up which animals are which. Like, I wasn''t sure if a snail is a vertebrate or not. Any tips?',
   'Rohan Beeharry', 'student', NOW() - INTERVAL '27 days'),

  ('science', 'What practical experiments might come in PSAC science?',
   'My son is in Grade 6 preparing for PSAC. We know the theory well but I want to make sure he''s ready for any practical or experiment-based questions. What kinds of experiments are typically tested — can children practise them at home?',
   'Priya Ramkhelawon', 'parent', NOW() - INTERVAL '9 days'),

  ('science', 'Forms of energy — my daughter gets them confused',
   'In Grade 5 science, my daughter knows the names (kinetic, potential, heat, light, sound, electrical, chemical) but when given a scenario she doesn''t know which type to say. For example, for a book on a shelf, she wasn''t sure if it''s potential or kinetic energy. Can anyone help?',
   'Meena Soobron', 'parent', NOW() - INTERVAL '1 day');

  -- ──────────────────────────────────────────────────────────────────────
  --  FRENCH HELP
  -- ──────────────────────────────────────────────────────────────────────
  INSERT INTO public.forum_posts (category, title, body, author_name, author_type, created_at) VALUES
  ('french', 'Passé composé or imparfait — how do you choose?',
   'This is the part of French that confuses me the most. We''ve learned both past tenses but when writing a story or answering questions, I never know which one to use. Can someone explain when to use each one with some examples?',
   'Zara Khodabaccus', 'student', NOW() - INTERVAL '76 days'),

  ('french', 'Is there a pattern for masculine vs feminine nouns in French?',
   'I''m trying to learn if there''s a rule for which French nouns are masculine and which are feminine, or do we just have to memorise every single one? Some endings seem to always be one way but I''m not sure.',
   'Preethi Seenauth', 'student', NOW() - INTERVAL '59 days'),

  ('french', 'How to improve my son''s spoken French?',
   'My son is quite good at written French but his spoken French is weak. He gets shy and makes a lot of mistakes when speaking. With PSAC oral component coming up, this is worrying me. Do you have any practical advice for practising spoken French at home?',
   'Jean-Pierre Labonté', 'parent', NOW() - INTERVAL '42 days'),

  ('french', 'List of irregular French verbs needed for PSAC',
   'Can anyone help me compile a list of all the irregular verbs we definitely need to know for PSAC French? My teacher gave us some but I want to make sure I haven''t missed any important ones.',
   'Asha Jugessur', 'student', NOW() - INTERVAL '19 days'),

  ('french', 'How much does French count toward the PSAC total mark?',
   'I''ve been reading about the PSAC grading but I can''t find a clear answer — how much does French count in the overall assessment? Is it equal to Maths and English or weighted differently? I want to help my daughter prioritise her revision time effectively.',
   'Arvind Seenauth', 'parent', NOW() - INTERVAL '5 days');

  -- ──────────────────────────────────────────────────────────────────────
  --  HISTORY & GEOGRAPHY
  -- ──────────────────────────────────────────────────────────────────────
  INSERT INTO public.forum_posts (category, title, body, author_name, author_type, created_at) VALUES
  ('history', 'How to remember history dates — any memory tricks?',
   'There are so many dates to remember in history! Independence, important events, famous people... I always mix them up in the exam even when I study hard. Does anyone have memory tricks or techniques for remembering dates and what happened on them?',
   'Dev Ramdenee', 'student', NOW() - INTERVAL '70 days'),

  ('history', 'How to read a contour map properly?',
   'I''m studying geography and the contour map questions are really hard for me. I understand that the lines show height but I don''t know how to look at a map and tell which way is steep vs gentle, or which part is a valley vs a hill. Any help?',
   'Rohan Beeharry', 'student', NOW() - INTERVAL '54 days'),

  ('history', 'Main geographic regions of Mauritius',
   'We''re studying the geography of Mauritius and I need to name and describe the main regions. I know there''s the central plateau but I''m not sure about the others and what makes each one distinct. Can someone help?',
   'Preethi Seenauth', 'student', NOW() - INTERVAL '37 days'),

  ('history', 'What happened on 12 March 1968?',
   'I know 12 March 1968 is Independence Day for Mauritius but for the exam I want to know more details — what exactly happened, who were the key leaders, and why is it important? I want to write more than just "we became independent."',
   'Kiran Gopal', 'student', NOW() - INTERVAL '17 days'),

  ('history', 'My daughter confuses physical maps and political maps',
   'When given a map question in geography, my daughter doesn''t know the difference between a physical map and a political map and which one to use for what type of question. Can you explain the difference simply?',
   'Sunita Dhanoo', 'parent', NOW() - INTERVAL '4 days');

  -- ──────────────────────────────────────────────────────────────────────
  --  STUDY TIPS
  -- ──────────────────────────────────────────────────────────────────────
  INSERT INTO public.forum_posts (category, title, body, author_name, author_type, created_at) VALUES
  ('tips', 'What study strategies actually work for PSAC? Share what''s working for you',
   'Good morning everyone! As a teacher I see a wide range of study methods — some very effective, some that take a lot of time without results. I''d like to start a discussion about what actually works. From my experience, the most effective strategies are:
1. Spaced repetition — reviewing topics at increasing intervals rather than all at once the night before
2. Active recall — testing yourself instead of just reading
3. Short focused sessions — 30-45 minutes with a proper break, NOT hours of continuous studying
4. Mixed practice — switching between subjects in one study session

What strategies work best for your children? Please share!',
   'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '98 days'),

  ('tips', 'How many hours should a Grade 5 child study per day?',
   'I''ve been asking around and getting very different answers — some parents say 3-4 hours daily, others say 1-2 hours. What is the recommended amount for a Grade 5 child? I don''t want to overwork my daughter but also don''t want her to fall behind.',
   'Meena Soobron', 'parent', NOW() - INTERVAL '79 days'),

  ('tips', 'Flashcards or written notes — which works better for you?',
   'I want to change my study method because just reading my notes doesn''t feel like it''s working. I''ve heard flashcards are good for memorising vocabulary and facts but I learn better by writing things out. What does everyone think?',
   'Dev Ramdenee', 'student', NOW() - INTERVAL '58 days'),

  ('tips', 'Morning study vs evening study — what do you prefer?',
   'We''re trying to figure out the best time for my son to study. He tends to do homework in the evening but I''ve read that morning study can be more effective. Has anyone tested both? What works best for primary-aged children?',
   'Anita Boolell', 'parent', NOW() - INTERVAL '33 days'),

  ('tips', 'How to stay focused when practising on the app?',
   'I have a bad habit of picking up my phone when using MathMaster — I''ll do 2-3 questions then check a message then come back. I know it''s hurting my focus and scores. Any advice for staying focused during a practice session?',
   'Rishi Pertab', 'student', NOW() - INTERVAL '14 days');

  -- ──────────────────────────────────────────────────────────────────────
  --  SUGGESTIONS (mix of closed and open)
  -- ──────────────────────────────────────────────────────────────────────
  INSERT INTO public.forum_posts (category, title, body, author_name, author_type, created_at) VALUES
  ('suggest', 'Please add a study timetable / schedule feature!',
   'It would be amazing if MathMaster had a built-in study timetable where parents can plan the week''s study sessions for each child. Right now we use a paper planner but it would be much more convenient to have it in the app. Even a simple weekly grid where you can block out study times and subjects would be very useful!',
   'Priya Ramkhelawon', 'parent', NOW() - INTERVAL '118 days'),

  ('suggest', 'Can you add more subjects — English, French and Science?',
   'At the moment I can only see Maths chapters. But PSAC covers English, French, Science, and Social Studies too. Any plans to add content for those subjects? My daughter needs to revise all her PSAC subjects, not just Maths. It would make MathMaster a complete PSAC preparation tool if all subjects were covered.',
   'Anita Boolell', 'parent', NOW() - INTERVAL '108 days'),

  ('suggest', 'We need a community forum to discuss and ask questions!',
   'Is there any plan to add a discussion forum to the app? It would be great to have a place where parents and students can ask questions, share tips, and help each other. Right now if my child has a question about a topic I have to search on Google or ask at school. A moderated in-app forum would be so useful for the whole community!',
   'Vikram Pertab', 'parent', NOW() - INTERVAL '103 days'),

  ('suggest', 'Please add a dark mode for studying at night',
   'I study in the evening after dinner and the white background is very bright in a dark room. My eyes get tired quickly. Many apps now have a dark mode option — would it be possible to add this to MathMaster? It would make evening study sessions much more comfortable.',
   'Rishi Pertab', 'student', NOW() - INTERVAL '92 days'),

  ('suggest', 'Can parents view their child''s detailed progress?',
   'Currently I can see my child is doing practice but I can''t see which specific chapters they''ve done, what their scores were, or which questions they got wrong. Is there a way to see more detailed progress information? As a parent I need to know where my child needs extra help so I can guide their revision.',
   'Meena Soobron', 'parent', NOW() - INTERVAL '83 days'),

  ('suggest', 'Please add a search bar to the forum!',
   'As the forum grows, it''s getting harder to find posts about specific topics. Can you add a search bar so I can type a keyword and find relevant posts quickly? For example I want to find all posts about fractions but have to scroll through all categories to find them. A simple search would make the forum so much more useful!',
   'Léa Labonté', 'student', NOW() - INTERVAL '28 days'),

  ('suggest', 'Would love to have printable past PSAC exam papers',
   'This is a suggestion for the future — it would be fantastic if MathMaster could provide printable versions of past PSAC exam papers or similar practice papers that match the format exactly. Many students benefit from practising on paper under timed conditions, exactly like the real exam. Would this be possible to add?',
   'Jean-Pierre Labonté', 'parent', NOW() - INTERVAL '13 days'),

  ('suggest', 'Suggestion: audio pronunciation for French vocabulary',
   'When learning French vocabulary, it would help a lot to hear how words are pronounced correctly — especially for tricky French sounds like "eu", "ou", "r" that don''t exist in English. Could you add a speaker icon next to French vocabulary words that plays the correct pronunciation? Even a simple text-to-speech would help!',
   'Zara Khodabaccus', 'student', NOW() - INTERVAL '7 days');

  -- ──────────────────────────────────────────────────────────────────────
  --  BUG REPORTS
  -- ──────────────────────────────────────────────────────────────────────
  INSERT INTO public.forum_posts (category, title, body, author_name, author_type, created_at) VALUES
  ('report', 'Found a typo in one of the Grade 4 maths questions',
   'In the Grade 4 Maths chapter on Numeration, there''s a question that says "Write the numbre 3,456 in words" — "numbre" should be "number". Not a big deal but wanted to report it so it gets fixed. Also the answer choices for that question seem to be in a strange order.',
   'Rohan Beeharry', 'student', NOW() - INTERVAL '48 days'),

  ('report', 'Login page not working on older Android phones',
   'My mother-in-law''s Android phone (Android 7) can''t load the MathMaster login page — it just shows a loading spinner that never stops. Newer phones work fine. Is there a minimum Android version required? Or is this a bug? She looks after the kids in the afternoon and was trying to access it to help with their study.',
   'Arvind Seenauth', 'parent', NOW() - INTERVAL '23 days'),

  ('report', 'Calendar page loading very slowly',
   'The Study Calendar page takes a long time to load — about 10 seconds on my phone. The rest of the app is fast. I''m on a 4G connection so it''s not my internet. Is there a performance issue with the calendar? Once it loads it works fine but the initial load is quite slow.',
   'Priya Ramkhelawon', 'parent', NOW() - INTERVAL '7 days');

  -- ══════════════════════════════════════════════════════════════════════
  --  REPLIES
  -- ══════════════════════════════════════════════════════════════════════

  -- ── General: PIN reset ─────────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Hi Priya! To reset your child''s PIN, go to the Students section in your parent dashboard, click on your daughter''s name, and you''ll see a "Change PIN" option. Enter a new 4-digit PIN and she''ll be able to log in right away. Hope this helps!',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '87 days 12 hours'
  FROM public.forum_posts WHERE title = 'How do I reset my child''s login PIN?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Thank you so much Mrs. Soopramanien! Found it — it was right there in the student profile. All sorted now! 🙏',
    'Priya Ramkhelawon', 'parent', NOW() - INTERVAL '87 days 6 hours'
  FROM public.forum_posts WHERE title = 'How do I reset my child''s login PIN?' LIMIT 1;

  -- ── General: white screen ──────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'This sometimes happens when the browser cache is full. Try opening Safari → go to Settings → Safari → Clear History and Website Data. Then open MathMaster again. That usually fixes it!',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '62 days 8 hours'
  FROM public.forum_posts WHERE title = 'App shows white screen on my iPhone' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Yes! Clearing the cache fixed it. Thank you! My daughter can use it normally now. 😊',
    'Arvind Seenauth', 'parent', NOW() - INTERVAL '61 days 20 hours'
  FROM public.forum_posts WHERE title = 'App shows white screen on my iPhone' LIMIT 1;

  -- ── General: two children ──────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'No worries at all! On the home screen, you''ll see a small dropdown near your child''s avatar with their name. Tap on it and it shows all the students registered under your account. Select the other child and the dashboard will switch to their progress. You can add more children from the Students section in your parent menu.',
    'Rajesh Gobin', 'parent', NOW() - INTERVAL '44 days 14 hours'
  FROM public.forum_posts WHERE title = 'How to switch between my two children?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Found it! The little arrow next to the name. Thank you so much Rajesh! Very helpful.',
    'Meena Soobron', 'parent', NOW() - INTERVAL '44 days 10 hours'
  FROM public.forum_posts WHERE title = 'How to switch between my two children?' LIMIT 1;

  -- ── General: Chromebook ────────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Yes, MathMaster works perfectly on a Chromebook! Since it''s a web app, you just open the Chrome browser, go to the MathMaster website, and it works the same as on any device. You can even add it to the Chromebook shelf as a shortcut for easy access.',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '27 days 16 hours'
  FROM public.forum_posts WHERE title = 'Can I use MathMaster on a Chromebook?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Tested it on our Chromebook — works great! Even the timetable and forum work perfectly. Highly recommend adding it to the shelf as a shortcut so it feels like a proper app.',
    'Sunita Dhanoo', 'parent', NOW() - INTERVAL '27 days 10 hours'
  FROM public.forum_posts WHERE title = 'Can I use MathMaster on a Chromebook?' LIMIT 1;

  -- ── General: timetable disappeared ────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'The timetable is saved to your account in the cloud, so it should persist across logins. This might have been a temporary glitch. Could you try logging in again and refreshing the page? If it still doesn''t appear, let us know what device and browser you''re using and we''ll investigate further.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '11 days 6 hours'
  FROM public.forum_posts WHERE title = 'My son''s timetable disappeared after I logged out' LIMIT 1;

  -- ── Maths: long division ───────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'This is a very common difficulty! Here''s a simple method to teach her:
1. Ask: how many times does 8 go into 34? → 4 times (4 × 8 = 32)
2. Write 4 above the line, subtract: 34 - 32 = 2
3. Bring down the 7 → you now have 27
4. Ask: how many times does 8 go into 27? → 3 times (3 × 8 = 24)
5. Subtract: 27 - 24 = 3
6. So: 347 ÷ 8 = 43 remainder 3

The key is to always check if your subtraction result is smaller than the divisor. If not, your quotient for that step is too small!',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '82 days 6 hours'
  FROM public.forum_posts WHERE title = 'Long division with remainders — my daughter keeps getting the wrong answer' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Thank you so much Mrs. Soopramanien! We tried this method step by step last night and she got 5 questions right in a row. The trick about checking the remainder was the missing piece! 🎉',
    'Meena Soobron', 'parent', NOW() - INTERVAL '81 days 20 hours'
  FROM public.forum_posts WHERE title = 'Long division with remainders — my daughter keeps getting the wrong answer' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'My son had the same problem. What helped was using graph paper so each digit goes in its own square. It stops the columns getting mixed up — highly recommend trying it!',
    'Vikram Pertab', 'parent', NOW() - INTERVAL '80 days 14 hours'
  FROM public.forum_posts WHERE title = 'Long division with remainders — my daughter keeps getting the wrong answer' LIMIT 1;

  -- ── Maths: BODMAS ─────────────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Great question Rishi! When multiplication and division have equal priority, you work left to right. So:
12 ÷ 3 × 2
= (12 ÷ 3) × 2   ← divide first because it comes first reading left to right
= 4 × 2
= 8

Same rule applies for addition and subtraction — left to right when they''re at the same level. BODMAS tells you the LEVEL of priority, and at the same level, always go left to right!',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '66 days 18 hours'
  FROM public.forum_posts WHERE title = 'BODMAS — order of operations question' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Oh that makes so much sense now! I was doing multiplication first every time which was wrong. Thank you Mr. Bhunjun!',
    'Rishi Pertab', 'student', NOW() - INTERVAL '66 days 14 hours'
  FROM public.forum_posts WHERE title = 'BODMAS — order of operations question' LIMIT 1;

  -- ── Maths: fractions types ─────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Here''s the simplest way to think about it using pizza:
• Proper fraction: top number is SMALLER than bottom → 3/4 (less than a whole pizza)
• Improper fraction: top number is BIGGER than or equal to bottom → 7/4 (more than one whole pizza)
• Mixed number: a whole number AND a fraction → 1¾ (1 whole pizza and ¾ of another)

They''re all the same amount just written differently! 7/4 = 1¾. Use the pizza example and he''ll never forget!',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '51 days 16 hours'
  FROM public.forum_posts WHERE title = 'Proper fractions vs improper fractions vs mixed numbers' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'The pizza explanation worked really well! He was getting confused because he thought "improper" meant "wrong" — once we explained it just means "bigger than a whole" he understood immediately. Thank you!',
    'Anita Boolell', 'parent', NOW() - INTERVAL '50 days 20 hours'
  FROM public.forum_posts WHERE title = 'Proper fractions vs improper fractions vs mixed numbers' LIMIT 1;

  -- ── Maths: LCM/HCF ────────────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Here''s an easy way to remember:
• HCF → DIVIDE problems. "How Can we Fairly share?" Use when splitting things into equal groups.
  Example: Biggest equal group from 12 boys and 18 girls? → HCF(12,18) = 6
• LCM → REPEAT/CYCLE problems. "Let''s Count Multiples." Use when things happen at intervals.
  Example: Bus A every 12 min, Bus B every 18 min — when do they coincide? → LCM(12,18) = 36 min

Memory trick: Factor = smaller (dividing), Multiple = bigger (building up).',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '39 days 18 hours'
  FROM public.forum_posts WHERE title = 'LCM and HCF — can someone explain the difference clearly?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'The bus example is perfect — it clicked immediately for me! The HCF/LCM mnemonics are brilliant. Thank you so much Mr. Bhunjun!',
    'Kiran Gopal', 'student', NOW() - INTERVAL '39 days 14 hours'
  FROM public.forum_posts WHERE title = 'LCM and HCF — can someone explain the difference clearly?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'My daughter struggled with the same thing. Another trick: HCF → think of the "F" for Few (smaller), LCM → "M" for More (bigger). Also listing factor pairs for HCF and listing multiples upward for LCM is very reliable even if slower.',
    'Meena Soobron', 'parent', NOW() - INTERVAL '38 days 10 hours'
  FROM public.forum_posts WHERE title = 'LCM and HCF — can someone explain the difference clearly?' LIMIT 1;

  -- ── Maths: compound shapes ─────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'The key rule is: split the shape into simple rectangles you already know! Method:
1. Draw dotted lines to divide it into rectangles (you choose where to split)
2. Find the area of each smaller rectangle separately
3. ADD all areas together (or SUBTRACT if a piece is cut out of the shape)

For L-shaped: split into 2 rectangles, find each area, add them.
For shapes with a hole: find area of full outer rectangle, then SUBTRACT the missing piece.

Always write each step clearly — you get marks even if you make one arithmetic mistake.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '23 days 18 hours'
  FROM public.forum_posts WHERE title = 'Area of compound shapes — stuck on this chapter' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Thank you! I tried it on the practice questions and got 4 out of 5 right. The part about subtracting when there''s a piece missing was the one I kept forgetting.',
    'Maya Ramkhelawon', 'student', NOW() - INTERVAL '22 days 16 hours'
  FROM public.forum_posts WHERE title = 'Area of compound shapes — stuck on this chapter' LIMIT 1;

  -- ── Maths: low fractions score ─────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Please don''t panic! Grade 4 fractions is genuinely one of the harder new concepts and most children find it confusing at first — even strong maths students. With consistent practice (especially the fraction questions in the Grade 4 MathMaster pack!) she will improve quickly. Daily 15-minute sessions make a huge difference.',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '12 days 18 hours'
  FROM public.forum_posts WHERE title = 'My Grade 4 daughter scored 2/10 on fractions quiz — is this normal?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'My son scored 3/10 on his first fractions test too. Three months later he was consistently getting 8/10. The app''s practice mode is excellent for fractions — it gives immediate feedback so they know right away when they go wrong. Don''t give up!',
    'Anita Boolell', 'parent', NOW() - INTERVAL '12 days 10 hours'
  FROM public.forum_posts WHERE title = 'My Grade 4 daughter scored 2/10 on fractions quiz — is this normal?' LIMIT 1;

  -- ── Maths: ratio word problems ─────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Tell him to look for the key phrase "for every" or "to every" in word problems. Example: "For every 3 boys there are 2 girls in a class of 25." → ratio is 3:2 directly.
Method: add the parts (3+2=5), divide total by parts (25÷5=5), multiply each (boys=3×5=15, girls=2×5=10).
Draw a ratio box table and he''ll never get confused again!',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '5 days 16 hours'
  FROM public.forum_posts WHERE title = 'Word problems involving ratio — my son gets confused' LIMIT 1;

  -- ── Maths: Grade 6 differences ────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Grade 6 introduces more algebra-style thinking, harder percentages (discount, profit/loss), speed-distance-time problems, and more complex geometry (angles, properties of shapes). The biggest jump is usually word problems — they become longer and need more steps. Spend the holidays making sure Grade 5 topics like fractions, decimals and ratio are very solid, as they underpin a lot of Grade 6 work.',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '1 day 12 hours'
  FROM public.forum_posts WHERE title = 'How is Grade 6 maths different from Grade 5?' LIMIT 1;

  -- ── English: comprehension tips ────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Thank you for these tips, Mrs. Soopramanien! My daughter has been struggling with "explain in your own words" questions. Is it okay if she uses similar wording to the passage or does she always need completely different words?',
    'Anita Boolell', 'parent', NOW() - INTERVAL '76 days 14 hours'
  FROM public.forum_posts WHERE title = 'Tips for answering comprehension passages' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'She should show understanding in her own words — but it doesn''t need to be completely different vocabulary. The key is NOT to copy the sentence word for word. Paraphrase it: change the sentence structure and swap some words where you can. That shows she understood the meaning rather than just copied.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '76 days 10 hours'
  FROM public.forum_posts WHERE title = 'Tips for answering comprehension passages' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'We practise comprehension every Sunday and the method of reading questions first has helped enormously. My son went from 12/20 to 17/20 in just a few weeks! The reading-questions-first strategy is a game changer.',
    'Rajesh Gobin', 'parent', NOW() - INTERVAL '74 days 10 hours'
  FROM public.forum_posts WHERE title = 'Tips for answering comprehension passages' LIMIT 1;

  -- ── English: simile vs metaphor ────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Here''s the clearest way to think about it:
• SIMILE = comparison USING "like" or "as" → "She runs LIKE the wind." / "He is AS tall AS a tree."
• METAPHOR = comparison WITHOUT "like" or "as" — says something IS something else → "She IS the wind." / "The classroom WAS a zoo."

Easy test: If you can insert "like" or "as" and the sentence still makes sense as a comparison → simile. If it''s still a comparison without them → metaphor.',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '62 days 18 hours'
  FROM public.forum_posts WHERE title = 'Simile vs metaphor — what is the difference?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Thank you Mr. Bhunjun! The "insert like" test is brilliant — I''ll use that in the exam. Never got confused again after reading this!',
    'Léa Labonté', 'student', NOW() - INTERVAL '62 days 14 hours'
  FROM public.forum_posts WHERE title = 'Simile vs metaphor — what is the difference?' LIMIT 1;

  -- ── English: punctuation mistakes ─────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Here are three quick rules for those exact issues:

1. Comma after opening clause: If a sentence starts with "Although...", "When...", "Because...", "After..." → put a comma after that opening section. Example: "Although it was raining, we went to school."

2. It''s vs Its: "It''s" = IT IS (always). If you can say "it is" in the sentence, use the apostrophe. If not, use "its". Example: "It''s raining." ✓ / "The dog wagged its tail." ✓

3. Apostrophe for possession: singular → add ''s (the girl''s book). Plural ending in s → just add '' after (the girls'' books).',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '47 days 18 hours'
  FROM public.forum_posts WHERE title = 'Common punctuation mistakes my daughter keeps making' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'These rules are great — saving them! Also found that making her correct intentionally wrong sentences (where I deliberately put the wrong punctuation) works better than just practising correct ones. She has to spot and fix the errors herself.',
    'Rajesh Gobin', 'parent', NOW() - INTERVAL '46 days 14 hours'
  FROM public.forum_posts WHERE title = 'Common punctuation mistakes my daughter keeps making' LIMIT 1;

  -- ── English: direct/indirect speech ───────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Here''s a checklist for converting direct → indirect speech:
1. Remove quotation marks, add "that" after said/told
2. Change tense one step back: is → was, will → would, can → could, has → had
3. Change pronouns: I → he/she, we → they
4. Change time/place words: now → then, here → there, today → that day, tomorrow → the next day

Example: She said, "I will come tomorrow." → She said that she would come the next day.',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '28 days 18 hours'
  FROM public.forum_posts WHERE title = 'Direct speech vs indirect speech — so confusing!' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'This checklist is exactly what I needed! Especially the tense changes — I was forgetting to change "will" to "would". Printed this and stuck it above my desk. Thank you!',
    'Asha Jugessur', 'student', NOW() - INTERVAL '28 days 14 hours'
  FROM public.forum_posts WHERE title = 'Direct speech vs indirect speech — so confusing!' LIMIT 1;

  -- ── English: essay writing ─────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Essay planning is the key! Before writing a single sentence, spend 3-5 minutes planning. Use the PEEL structure for each paragraph: Point (your idea), Evidence (a detail or example), Explanation (why it matters), Link (back to the question). Write 3-4 PEEL paragraphs plus an intro and conclusion and you''ll have a full essay every time. One idea per paragraph, developed fully.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '13 days 18 hours'
  FROM public.forum_posts WHERE title = 'Any tips for essay writing in Grade 5?' LIMIT 1;

  -- ── Science: photosynthesis ────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Think of a plant as a little kitchen! Here''s what goes in and what comes out:

INGREDIENTS (what goes IN):
• Sunlight ☀️ (from the sun)
• Water 💧 (from the soil, through the roots)
• Carbon dioxide CO₂ (a gas from the air, through tiny holes in leaves)

PRODUCT (what comes OUT):
• Glucose (food/sugar for the plant — gives it energy to grow)
• Oxygen O₂ — the fresh air we breathe! 🌿

The green part of plants (chlorophyll) is what does the "cooking". That''s why only green plants can photosynthesise.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '73 days 18 hours'
  FROM public.forum_posts WHERE title = 'Simple explanation of photosynthesis for Grade 4?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'This kitchen explanation is brilliant — my son understood immediately when I showed him this! He''s in Grade 4 too and was very confused. Thank you so much!',
    'Vikram Pertab', 'parent', NOW() - INTERVAL '72 days 10 hours'
  FROM public.forum_posts WHERE title = 'Simple explanation of photosynthesis for Grade 4?' LIMIT 1;

  -- ── Science: food chains/webs ──────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'You''ve got the right idea already! Here''s the difference:
• Food chain = ONE straight path of eating → Grass → Rabbit → Fox
• Food web = MANY food chains connected together in a network

In real life, animals eat more than one type of food. A fox doesn''t only eat rabbits — it also eats mice, birds, berries. So all those different food chains cross and connect. A food web shows the FULL picture of all eating relationships in an ecosystem. The arrows always show the direction energy flows — from prey TO predator.',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '56 days 18 hours'
  FROM public.forum_posts WHERE title = 'Food chains vs food webs — what is the difference?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Oh! So a food web is like many food chains tangled together. That makes so much sense now. Thank you Mr. Bhunjun!',
    'Maya Ramkhelawon', 'student', NOW() - INTERVAL '56 days 14 hours'
  FROM public.forum_posts WHERE title = 'Food chains vs food webs — what is the difference?' LIMIT 1;

  -- ── Science: states of matter ──────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'The steam problem is very common! Here''s a clear test — ask these questions about the substance:
• Does it have a FIXED SHAPE? → solid
• FIXED VOLUME but takes the shape of its container? → liquid
• FILLS any space, no fixed shape OR volume? → gas

Steam IS a gas — it spreads out and has no fixed shape or volume. Water is liquid. Ice is solid.
Tricky one: honey is slow but it flows and takes the shape of its container → liquid. Sand as a whole acts liquid-ish but each grain is a solid particle.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '40 days 18 hours'
  FROM public.forum_posts WHERE title = 'My son keeps mixing up solids, liquids and gases' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'The three test questions really helped — we printed them out and put them on his desk. He hasn''t got one wrong since! Thank you.',
    'Vikram Pertab', 'parent', NOW() - INTERVAL '39 days 18 hours'
  FROM public.forum_posts WHERE title = 'My son keeps mixing up solids, liquids and gases' LIMIT 1;

  -- ── Science: vertebrates/invertebrates ────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'The snail is an invertebrate — no backbone! Easy groups to remember:

VERTEBRATES — "FARB-M":
• Fish: shark, tilapia • Amphibians: frog, toad • Reptiles: lizard, snake • Birds: parrot, eagle • Mammals: dog, whale, human

INVERTEBRATES: insects, spiders, worms, snails, jellyfish, crabs, starfish

Quick test: Does it have a spine/backbone? YES → vertebrate. NO → invertebrate. A snail has a shell (exoskeleton) but NO backbone → invertebrate.',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '26 days 18 hours'
  FROM public.forum_posts WHERE title = 'Best way to remember vertebrates vs invertebrates?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'FARB-M is a great memory device! Using it tonight for my revision. Thank you Mr. Bhunjun!',
    'Rohan Beeharry', 'student', NOW() - INTERVAL '25 days 16 hours'
  FROM public.forum_posts WHERE title = 'Best way to remember vertebrates vs invertebrates?' LIMIT 1;

  -- ── Science: PSAC experiments ──────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Common experiment-type questions in PSAC science tend to involve: separating mixtures (filtration, evaporation, magnetism), identifying acids and bases (using litmus paper), simple food tests (starch — iodine turns blue-black), and observing plant growth. For home practice: filtration is easy — mix sand and water and filter it through a cloth. For the food test, buy iodine solution from a pharmacy and test bread, banana, potato. Hands-on experience helps children describe experiments much more confidently in writing.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '8 days 18 hours'
  FROM public.forum_posts WHERE title = 'What practical experiments might come in PSAC science?' LIMIT 1;

  -- ── French: passé composé/imparfait ───────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'This is genuinely one of the trickiest parts of French! Here''s the clearest rule:

PASSÉ COMPOSÉ = completed, finished actions
→ "J''ai mangé une pomme." (I ate an apple — done, finished.)

IMPARFAIT = ongoing background, habits, descriptions
→ "Je mangeais quand il est arrivé." (I was eating when he arrived — eating was ongoing.)

Simple test: Can you say "used to" or "was doing" in English? → imparfait. Did something happen once and finish? → passé composé.

In stories: use IMPARFAIT for setting the scene, PASSÉ COMPOSÉ for the events.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '75 days 18 hours'
  FROM public.forum_posts WHERE title = 'Passé composé or imparfait — how do you choose?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'The "used to / was doing" test is so helpful! I tried it on my homework last night and only made one mistake out of 12 sentences. Merci beaucoup!',
    'Zara Khodabaccus', 'student', NOW() - INTERVAL '75 days 14 hours'
  FROM public.forum_posts WHERE title = 'Passé composé or imparfait — how do you choose?' LIMIT 1;

  -- ── French: masculine/feminine ─────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'There are some helpful patterns — not perfect but works for most nouns:

Usually MASCULINE (-age, -ment, -eau): le garage, le gouvernement, le gâteau
Usually FEMININE (-tion, -sion, -ure, -ette, -ance): la nation, la télévision, la nature, la baguette

The best approach: always learn the article WITH the noun — don''t just learn "arbre", learn "l''arbre (m)". If you learn them together from the start, gender becomes automatic with practice!',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '58 days 18 hours'
  FROM public.forum_posts WHERE title = 'Is there a pattern for masculine vs feminine nouns in French?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Thank you! Learning with the article is very good advice. I''m going to redo my vocabulary lists and write le/la/les next to every noun from now on.',
    'Preethi Seenauth', 'student', NOW() - INTERVAL '57 days 16 hours'
  FROM public.forum_posts WHERE title = 'Is there a pattern for masculine vs feminine nouns in French?' LIMIT 1;

  -- ── French: spoken French ──────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Spoken French gets better mainly through regular practice in a safe, low-pressure environment:
1. Short daily practice is better than long sessions — even 10 minutes of French conversation at dinner helps enormously.
2. French films or cartoons with French subtitles (not English) help with listening and natural pronunciation.
3. Record himself speaking and play it back — children often hear their own mistakes more easily than when speaking live.
4. MFM radio in Mauritius has French programming — leaving it on as background normalises French sounds.
5. Praise effort, not just correctness — the shyness often comes from fear of making mistakes.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '41 days 18 hours'
  FROM public.forum_posts WHERE title = 'How to improve my son''s spoken French?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'We started French dinner conversations last month. It was awkward at first but he''s much more confident now. The key really is speaking regularly without the pressure of being "tested" on it.',
    'Anita Boolell', 'parent', NOW() - INTERVAL '38 days 10 hours'
  FROM public.forum_posts WHERE title = 'How to improve my son''s spoken French?' LIMIT 1;

  -- ── French: irregular verbs ────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Here are the most important irregular verbs for PSAC:

ÊTRE: suis, es, est, sommes, êtes, sont
AVOIR: ai, as, a, avons, avez, ont
ALLER: vais, vas, va, allons, allez, vont
FAIRE: fais, fais, fait, faisons, faites, font
POUVOIR: peux, peux, peut, pouvons, pouvez, peuvent
VOULOIR: veux, veux, veut, voulons, voulez, veulent
VENIR: viens, viens, vient, venons, venez, viennent
PRENDRE: prends, prends, prend, prenons, prenez, prennent

Learn être and avoir especially well — they''re used to form passé composé!',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '18 days 18 hours'
  FROM public.forum_posts WHERE title = 'List of irregular French verbs needed for PSAC' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'This is brilliant! Should we also know the past participles of all these for passé composé?',
    'Asha Jugessur', 'student', NOW() - INTERVAL '17 days 16 hours'
  FROM public.forum_posts WHERE title = 'List of irregular French verbs needed for PSAC' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Yes, definitely! Past participles: être → été, avoir → eu, aller → allé, faire → fait, pouvoir → pu, vouloir → voulu, venir → venu, prendre → pris. These are used in passé composé — learn them alongside the main conjugations.',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '17 days 14 hours'
  FROM public.forum_posts WHERE title = 'List of irregular French verbs needed for PSAC' LIMIT 1;

  -- ── French: PSAC weighting ─────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'In the MIE PSAC, all subjects (English, French, Mathematics, Science, and Social Studies/History) are assessed separately and each contributes to the overall profile. They are generally weighted equally in terms of the qualification result. French should not be neglected — strong performance across all subjects gives the best overall outcome. I''d recommend balanced revision across all subjects rather than deprioritising any one.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '4 days 18 hours'
  FROM public.forum_posts WHERE title = 'How much does French count toward the PSAC total mark?' LIMIT 1;

  -- ── History: remember dates ────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Here are some techniques that work well:
1. Make a STORY linking the date to something visual. If 1968 is independence, imagine a huge "1968" banner at a celebration — the more vivid the image, the better.
2. GROUP dates by decade — all 1960s events together, 1970s together, etc.
3. RHYMES or mnemonics — "In sixty-eight, we celebrate!"
4. TIMELINE on your wall — put all dates in order visually.
5. QUIZZING yourself is the most effective — don''t just re-read, actively test recall.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '69 days 18 hours'
  FROM public.forum_posts WHERE title = 'How to remember history dates — any memory tricks?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'The rhyme one is so much fun! I made rhymes for 5 dates last night and I still remember all of them this morning. Thanks!',
    'Dev Ramdenee', 'student', NOW() - INTERVAL '69 days 14 hours'
  FROM public.forum_posts WHERE title = 'How to remember history dates — any memory tricks?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'I make mini flashcards — one date on the front, the event on the back. I test myself every morning for 5 minutes. Also sticking post-its on the bathroom mirror so I see them when brushing my teeth!',
    'Rohan Beeharry', 'student', NOW() - INTERVAL '68 days 10 hours'
  FROM public.forum_posts WHERE title = 'How to remember history dates — any memory tricks?' LIMIT 1;

  -- ── History: contour maps ──────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Contour maps become much easier once you understand these key rules:
1. LINES CLOSE TOGETHER = steep slope (height changes quickly over a short distance)
2. LINES FAR APART = gentle slope (height changes slowly)
3. CLOSED CIRCLES = hills (numbers get bigger toward centre) or depressions (numbers get smaller)
4. V-SHAPES pointing UPHILL = valleys or rivers
5. V-SHAPES pointing DOWNHILL = ridges/spurs

Practice tip: Look at the NUMBERS on the lines — they tell you the actual height. Moving toward higher numbers means going uphill.',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '53 days 18 hours'
  FROM public.forum_posts WHERE title = 'How to read a contour map properly?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'The V-shape tip is the one I always needed! I was getting valleys and ridges completely wrong. Now I know: V pointing uphill = valley (water flows down the V). Thank you!',
    'Rohan Beeharry', 'student', NOW() - INTERVAL '52 days 16 hours'
  FROM public.forum_posts WHERE title = 'How to read a contour map properly?' LIMIT 1;

  -- ── History: geographic regions ────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Here''s a summary of Mauritius''s main geographic regions:

1. CENTRAL PLATEAU: Highest part (~670m), cooler, more rainfall, source of main rivers. Cities: Curepipe, Quatre Bornes, Vacoas.
2. NORTHERN PLAINS: Flat, low-lying, less rainfall. Includes Port Louis (capital) and Grand Baie.
3. EASTERN REGION: Lower elevation, some dry areas, beaches and lagoons.
4. SOUTHERN REGION: More rugged, scenic cliffs (Chamarel), Black River Gorges National Park — main biodiversity area.
5. WESTERN REGION: Dry, sunny, low rainfall (rain shadow of mountains). Beaches: Flic en Flac, Tamarin.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '36 days 18 hours'
  FROM public.forum_posts WHERE title = 'Main geographic regions of Mauritius' LIMIT 1;

  -- ── History: 12 March 1968 ─────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Here''s what you should know for the exam:

WHAT HAPPENED: Mauritius gained independence from Britain on 12 March 1968 — the Union Jack was lowered and the Mauritian flag raised at midnight.

KEY LEADER: Sir Seewoosagur Ramgoolam (SSR) was the first Prime Minister — often called the "Father of the Nation."

WHY IMPORTANT:
• End of 158 years of British rule
• Mauritius became a member of the United Nations
• The country could now make its own laws

BONUS FACT: Mauritius became a Republic on 12 March 1992 (exactly 24 years later), leaving the Commonwealth as a sovereign republic. So 12 March is doubly significant!',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '16 days 18 hours'
  FROM public.forum_posts WHERE title = 'What happened on 12 March 1968?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'This is exactly what I needed for the exam — the republic date of 1992 too, didn''t know about that! Thank you so much Mr. Bhunjun!',
    'Kiran Gopal', 'student', NOW() - INTERVAL '15 days 16 hours'
  FROM public.forum_posts WHERE title = 'What happened on 12 March 1968?' LIMIT 1;

  -- ── History: physical vs political maps ────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Clear distinction:
PHYSICAL MAP: Shows NATURAL features — mountains, rivers, valleys, plains. Uses colour shading (green=lowland, brown=highlands, blue=water). Use for questions about landscape, terrain, rivers, or natural resources.
POLITICAL MAP: Shows HUMAN-made boundaries — countries, regions, cities, roads. Use for questions about countries, capitals, borders, or administrative divisions.
Memory tip: "Physical = Physical world (nature), Political = People''s boundaries."',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '3 days 16 hours'
  FROM public.forum_posts WHERE title = 'My daughter confuses physical maps and political maps' LIMIT 1;

  -- ── Tips: study strategies ─────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'The spaced repetition point is so true! We went from cramming the night before to spreading revision over 2 weeks and my son''s test scores improved dramatically. Also the Pomodoro technique (25 minutes focus, 5-minute break) made a huge difference — he doesn''t feel exhausted anymore.',
    'Vikram Pertab', 'parent', NOW() - INTERVAL '97 days 14 hours'
  FROM public.forum_posts WHERE title = 'What study strategies actually work for PSAC? Share what''s working for you' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Active recall is the key. I started giving my daughter practice tests every Friday. At first she hated it! But now she says the practice tests prepare her best. She reads less and tests herself more. Her grades have improved a lot.',
    'Anita Boolell', 'parent', NOW() - INTERVAL '96 days 10 hours'
  FROM public.forum_posts WHERE title = 'What study strategies actually work for PSAC? Share what''s working for you' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'What works for my son is reviewing his mistakes. He keeps an "error book" — whenever he gets a question wrong, he writes it in the book and reviews those specific questions every week. Understanding WHY he got it wrong is more valuable than redoing questions he already knows.',
    'Rajesh Gobin', 'parent', NOW() - INTERVAL '94 days 10 hours'
  FROM public.forum_posts WHERE title = 'What study strategies actually work for PSAC? Share what''s working for you' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Making it visual helps my daughter enormously — she draws mind maps for each chapter. It''s slower than just reading but she retains so much more. The process of drawing forces her to understand the connections between ideas, not just memorise facts.',
    'Meena Soobron', 'parent', NOW() - INTERVAL '91 days 10 hours'
  FROM public.forum_posts WHERE title = 'What study strategies actually work for PSAC? Share what''s working for you' LIMIT 1;

  -- ── Tips: study hours ──────────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Quality beats quantity for children''s studying. For Grade 5, 1.5 to 2 hours of FOCUSED study per day is more effective than 4 hours of distracted studying. The key: no phone, no TV, proper seating, good lighting. Split into sessions of 30-40 minutes with short breaks. As you get closer to PSAC (Grade 6), you might increase to 2.5 hours. Over-studying leads to burnout and actually reduces retention.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '78 days 18 hours'
  FROM public.forum_posts WHERE title = 'How many hours should a Grade 5 child study per day?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'This is reassuring — I was feeling guilty that my son only studies 1.5 hours. But those sessions are very focused with no distractions. He''s doing well in school so I''ll trust the quality approach.',
    'Arvind Seenauth', 'parent', NOW() - INTERVAL '77 days 14 hours'
  FROM public.forum_posts WHERE title = 'How many hours should a Grade 5 child study per day?' LIMIT 1;

  -- ── Tips: flashcards vs notes ──────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Both have their place! Notes are better for understanding concepts (how/why things work). Flashcards are better for pure memorisation (vocabulary, dates, formulas). Suggestion: write notes FIRST to understand a topic, then make flashcards for key facts you need to memorise. You get the benefits of both.',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '57 days 18 hours'
  FROM public.forum_posts WHERE title = 'Flashcards or written notes — which works better for you?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'I use both — notes for understanding, then I write key points from my notes onto flashcards. Testing myself with the flashcards the next day shows me what I actually remember vs what I just thought I understood. The gap is usually surprising!',
    'Preethi Seenauth', 'student', NOW() - INTERVAL '56 days 16 hours'
  FROM public.forum_posts WHERE title = 'Flashcards or written notes — which works better for you?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Voice recording works for me too — I record myself explaining a topic as if teaching someone else, then listen back. Anything I can''t explain clearly, I know I haven''t learned properly yet. The "teach it back" method is very powerful.',
    'Asha Jugessur', 'student', NOW() - INTERVAL '55 days 14 hours'
  FROM public.forum_posts WHERE title = 'Flashcards or written notes — which works better for you?' LIMIT 1;

  -- ── Tips: morning vs evening ───────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'It really depends on the child''s natural rhythm! Morning tends to be better for early risers — the brain is fresh and not yet tired from a full school day. Evening works well for night owls or when the child needs time to decompress from school before they can focus. Try a week of morning study, a week of evening, and see which produces better focus and less resistance.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '32 days 18 hours'
  FROM public.forum_posts WHERE title = 'Morning study vs evening study — what do you prefer?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'We shifted my daughter to early morning (6:30-7:30am before school) and the improvement was remarkable. She''s alert, fewer distractions, and the knowledge seems to stick better. Evening she was tired and distracted. This only works because she naturally wakes up early.',
    'Priya Ramkhelawon', 'parent', NOW() - INTERVAL '31 days 14 hours'
  FROM public.forum_posts WHERE title = 'Morning study vs evening study — what do you prefer?' LIMIT 1;

  -- ── Tips: staying focused ──────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Phone discipline is the biggest study challenge today! Things that help: 1) Use a dedicated device for studying with no social apps, 2) Turn on "Do Not Disturb" for 30 minutes, 3) Use Pomodoro technique (25 min full focus, 5-min phone break as reward), 4) Tell yourself "I will not check my phone until I finish this set of questions." The urge passes after a few minutes if you commit to ignoring it.',
    'Mr. R. Bhunjun', 'teacher', NOW() - INTERVAL '13 days 18 hours'
  FROM public.forum_posts WHERE title = 'How to stay focused when practising on the app?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'I put my phone charger in a different room and charge it there while I study. That way I''d have to get up and go to the other room to check it — just that small physical distance stops the impulse most of the time!',
    'Léa Labonté', 'student', NOW() - INTERVAL '12 days 16 hours'
  FROM public.forum_posts WHERE title = 'How to stay focused when practising on the app?' LIMIT 1;

  -- ── Suggestions (closed): timetable ───────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Brilliant idea! I would love this too. We currently use a whiteboard at home but something digital that syncs with the child''s profile would be amazing. Would also love the ability to set reminders for study sessions.',
    'Anita Boolell', 'parent', NOW() - INTERVAL '116 days 14 hours'
  FROM public.forum_posts WHERE title = 'Please add a study timetable / schedule feature!' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'This suggestion has been noted and is in our development pipeline! We''re aiming to have it ready very soon. Watch this space!',
    'MathMaster Team', 'admin', NOW() - INTERVAL '112 days 10 hours'
  FROM public.forum_posts WHERE title = 'Please add a study timetable / schedule feature!' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    '🎉 UPDATE: The Study Calendar is now LIVE! Go to the Calendar tab to set up your child''s weekly study schedule. You can add any subject, set session durations, and manage the whole week. Thank you Priya for the suggestion that started this! This thread is now closed.',
    'MathMaster Team', 'admin', NOW() - INTERVAL '90 days 10 hours'
  FROM public.forum_posts WHERE title = 'Please add a study timetable / schedule feature!' LIMIT 1;

  -- ── Suggestions (closed): more subjects ───────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Yes please! My son also mainly needs French and English help. Maths content is great but we need a complete package. Fingers crossed!',
    'Vikram Pertab', 'parent', NOW() - INTERVAL '106 days 14 hours'
  FROM public.forum_posts WHERE title = 'Can you add more subjects — English, French and Science?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Totally agree! Social Studies too if possible — lots of dates and facts to learn for history and geography.',
    'Meena Soobron', 'parent', NOW() - INTERVAL '105 days 10 hours'
  FROM public.forum_posts WHERE title = 'Can you add more subjects — English, French and Science?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    '✅ All 5 PSAC subjects are now available on MathMaster: Mathematics, English, French, Science, and Social Studies/History & Geography — for Grades 4, 5, and 6. Go to the Subjects section to explore the full content library. This thread is now closed.',
    'MathMaster Team', 'admin', NOW() - INTERVAL '80 days 10 hours'
  FROM public.forum_posts WHERE title = 'Can you add more subjects — English, French and Science?' LIMIT 1;

  -- ── Suggestions (closed): forum ───────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Yes! A forum would make this app so much more complete. Also it would be great for parents to share study tips and strategies. Please make this happen!',
    'Rajesh Gobin', 'parent', NOW() - INTERVAL '101 days 14 hours'
  FROM public.forum_posts WHERE title = 'We need a community forum to discuss and ask questions!' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Fully supporting this! Other educational apps have forums and it''s by far the most used feature. The community aspect really helps children feel they''re not studying alone.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '100 days 10 hours'
  FROM public.forum_posts WHERE title = 'We need a community forum to discuss and ask questions!' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Well, look where you are right now! 😄 The MathMaster Community Forum is now live! This thread is closed but the community continues — we look forward to many more great discussions and questions from everyone.',
    'MathMaster Team', 'admin', NOW() - INTERVAL '78 days 10 hours'
  FROM public.forum_posts WHERE title = 'We need a community forum to discuss and ask questions!' LIMIT 1;

  -- ── Suggestions (closed): dark mode ───────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Dark mode please! My daughter also studies at night and the bright white screen is really uncomfortable. Even a night mode that just reduces brightness would help enormously.',
    'Meena Soobron', 'parent', NOW() - INTERVAL '91 days 14 hours'
  FROM public.forum_posts WHERE title = 'Please add a dark mode for studying at night' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    '🌙 Dark mode is now available! Look for the moon icon in the top bar to toggle between light and dark mode. Your preference is saved automatically. Happy studying! This thread is now closed.',
    'MathMaster Team', 'admin', NOW() - INTERVAL '75 days 10 hours'
  FROM public.forum_posts WHERE title = 'Please add a dark mode for studying at night' LIMIT 1;

  -- ── Suggestions (closed): parent progress ─────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'This is really important. As a teacher I''d love this too — seeing which specific topics students are struggling with would let us target our help much more effectively. Please prioritise this feature!',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '82 days 14 hours'
  FROM public.forum_posts WHERE title = 'Can parents view their child''s detailed progress?' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    '📊 Detailed progress tracking is now available! In your parent dashboard, click on your child''s name then "View Progress" to see chapter-by-chapter scores, time spent, and which topics need more practice. This thread is now closed — enjoy the new feature!',
    'MathMaster Team', 'admin', NOW() - INTERVAL '65 days 10 hours'
  FROM public.forum_posts WHERE title = 'Can parents view their child''s detailed progress?' LIMIT 1;

  -- ── Suggestions (closed): forum search ────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Yes! I had to scroll through so many posts to find the one about BODMAS that I remembered seeing. A search bar is definitely needed as the community grows.',
    'Dev Ramdenee', 'student', NOW() - INTERVAL '27 days 14 hours'
  FROM public.forum_posts WHERE title = 'Please add a search bar to the forum!' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    '🔍 Forum search is now live! You''ll see a search bar at the top of the forum — type any keyword and it will find relevant posts across all categories instantly. This thread is now closed. Thank you for the great suggestion, Léa!',
    'MathMaster Team', 'admin', NOW() - INTERVAL '21 days 10 hours'
  FROM public.forum_posts WHERE title = 'Please add a search bar to the forum!' LIMIT 1;

  -- ── Suggestions (open): printable papers ──────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Excellent suggestion! Practising under exam conditions (timed, on paper, no going back) is a completely different skill from using an app. Both are important for PSAC preparation. I hope this gets implemented — it would make MathMaster a truly complete resource.',
    'Mrs. A. Soopramanien', 'teacher', NOW() - INTERVAL '12 days 14 hours'
  FROM public.forum_posts WHERE title = 'Would love to have printable past PSAC exam papers' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'We are working on printable exam-style practice papers — this is on our roadmap! We''ll post an update in the forum when they''re available. Thank you for the suggestion.',
    'MathMaster Team', 'admin', NOW() - INTERVAL '11 days 10 hours'
  FROM public.forum_posts WHERE title = 'Would love to have printable past PSAC exam papers' LIMIT 1;

  -- ── Suggestions (open): French audio ──────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'This would be amazing! My son keeps mispronouncing French words because we don''t speak French at home. Audio pronunciation would help so much — especially for the tricky sounds that don''t exist in English.',
    'Arvind Seenauth', 'parent', NOW() - INTERVAL '6 days 14 hours'
  FROM public.forum_posts WHERE title = 'Suggestion: audio pronunciation for French vocabulary' LIMIT 1;

  -- ── Bug reports ────────────────────────────────────────────────────
  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Thank you so much for spotting this Rohan! We really appreciate careful readers like you. We''ve logged the typo and will fix it and review the answer ordering. These reports are very helpful — please keep them coming if you spot anything else!',
    'MathMaster Team', 'admin', NOW() - INTERVAL '47 days 14 hours'
  FROM public.forum_posts WHERE title = 'Found a typo in one of the Grade 4 maths questions' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Thank you for reporting this! MathMaster works best on Android 9 and above. Android 7 uses an older version of Chrome that may not fully support some modern web features we use. In the meantime, try updating Chrome on that device to the latest version via the Play Store — that sometimes resolves compatibility issues even on older Android versions.',
    'MathMaster Team', 'admin', NOW() - INTERVAL '22 days 14 hours'
  FROM public.forum_posts WHERE title = 'Login page not working on older Android phones' LIMIT 1;

  INSERT INTO public.forum_replies (post_id, body, author_name, author_type, created_at)
  SELECT id,
    'Thanks for reporting this! We''ve noted the calendar performance issue and will investigate. It may be loading too much data at once on initial load. Could you let us know what device and browser you''re using? That will help us narrow down the cause.',
    'MathMaster Team', 'admin', NOW() - INTERVAL '6 days 14 hours'
  FROM public.forum_posts WHERE title = 'Calendar page loading very slowly' LIMIT 1;

  -- ══════════════════════════════════════════════════════════════════════
  --  Mark closed suggestions as status='closed'
  -- ══════════════════════════════════════════════════════════════════════
  UPDATE public.forum_posts SET status = 'closed' WHERE title IN (
    'Please add a study timetable / schedule feature!',
    'Can you add more subjects — English, French and Science?',
    'We need a community forum to discuss and ask questions!',
    'Please add a dark mode for studying at night',
    'Can parents view their child''s detailed progress?',
    'Please add a search bar to the forum!'
  );

  RAISE NOTICE 'Forum seed complete. % posts, check reply_count via trigger.',
    (SELECT COUNT(*) FROM public.forum_posts WHERE author_name = 'Priya Ramkhelawon');
END $$;
