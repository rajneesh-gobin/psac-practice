'use strict';
// Grade 6 English - commonly confused words and meaning-changing affixes.
(function () {
  const add = (section, rows) => rows.forEach((r, i) => STATIC_QUESTIONS.push(makeMCQ({
    id: `g6eng-ca-${section}-${String(i + 1).padStart(2, '0')}`,
    chapterId: 'g6eng-vocabulary', subsection: section, difficulty: 3,
    question: r[0], options: r[1], answer: r[1][0], hint: r[2], explanation: r[3]
  })));

  add('confusables', [
    ['Choose the correct word: “The new timetable will ___ every pupil.”',['affect','effect','infect','perfect'],'A verb meaning “influence” is needed.','<b>Affect</b> is usually a verb meaning influence; effect is usually a result.'],
    ['Choose the correct word: “One ___ of the storm was a power cut.”',['effect','affect','affection','effective'],'A noun naming a result is needed.','An <b>effect</b> is a result or consequence.'],
    ['Choose the correct word: “Please ___ my apology.”',['accept','except','expect','excerpt'],'The verb means receive willingly.','<b>Accept</b> means agree to receive; except means excluding.'],
    ['Choose the correct word: “Everyone attended ___ Ravi, who was ill.”',['except','accept','expect','excerpt'],'The word means “excluding”.','<b>Except</b> means leaving out Ravi.'],
    ['Choose the correct word: “The teacher gave us useful ___.”',['advice','advise','device','devise'],'A noun naming guidance is needed.','<b>Advice</b> is a noun; advise is the related verb.'],
    ['Choose the correct word: “I would ___ you to check the measurements.”',['advise','advice','device','revise noun'],'The blank needs a verb meaning recommend.','<b>Advise</b> is the verb meaning give guidance.'],
    ['Choose the correct word: “The blue scarf will ___ your costume.”',['complement','compliment','completion','complaint'],'The scarf completes or enhances the costume.','<b>Complement</b> means go well with or complete something.'],
    ['Choose the correct word: “She paid the artist a sincere ___.”',['compliment','complement','complaint','completion'],'The noun means an expression of praise.','A <b>compliment</b> is a polite expression of praise.'],
    ['Choose the correct word: “The library remained ___ during the renovation.”',['closed','close','clothes','closurely'],'An adjective describing its unavailable state is needed.','<b>Closed</b> means not open.'],
    ['Choose the correct word: “Keep the medicine ___ to the first-aid box.”',['close','closed','clothes','closure'],'The phrase means nearby.','<b>Close</b> means near in distance.'],
    ['Choose the correct word: “The council will ___ a new recycling scheme.”',['adopt','adapt','adept','adapter'],'The verb means formally begin to use a proposal.','<b>Adopt</b> means take up or accept a plan.'],
    ['Choose the correct word: “Animals must ___ to changes in their habitat.”',['adapt','adopt','adept','adapter'],'The verb means adjust to new conditions.','<b>Adapt</b> means change to suit conditions.'],
    ['Choose the correct word: “The guide gave a ___ signal before we crossed.”',['discreet','discrete','deceit','district'],'The signal was subtle and not meant to attract attention.','<b>Discreet</b> means careful and unobtrusive; discrete means separate.'],
    ['Choose the correct word: “The report divides the data into three ___ groups.”',['discrete','discreet','district','deceit'],'The groups are separate and distinct.','<b>Discrete</b> means individually separate.'],
    ['Choose the correct word: “The scientist will ___ that the sample is safe.”',['ensure','insure','assure person','endure'],'The verb means make certain.','<b>Ensure</b> means make sure that something happens.'],
    ['Choose the correct word: “Mum tried to ___ me that the injection would be quick.”',['assure','ensure','insure','endure'],'The verb means tell a person confidently to remove doubt.','<b>Assure</b> is used when reassuring a person.']
  ]);

  add('prefix_suffix', [
    ['What does the prefix “un-” mean in “unpredictable”?',['not','again','before','too much'],'Remove the prefix and compare the meaning.','<b>Un-</b> gives “predictable” the meaning “not predictable”.'],
    ['What does the prefix “re-” mean in “reconsider”?',['again','under','between','without'],'The person considers the matter one more time.','<b>Re-</b> means again.'],
    ['What does the prefix “pre-” mean in “prearranged”?',['before','after','wrongly','partly'],'The arrangement was made earlier.','<b>Pre-</b> means before.'],
    ['What does the prefix “mis-” mean in “misinterpret”?',['wrongly','together','across','fully'],'The interpretation is incorrect.','<b>Mis-</b> means wrongly or badly.'],
    ['What does the prefix “inter-” mean in “international”?',['between or among','inside only','against','after'],'The word concerns relationships among nations.','<b>Inter-</b> means between or among.'],
    ['What does the prefix “sub-” mean in “submarine”?',['under','above','again','without'],'A submarine travels beneath the surface.','<b>Sub-</b> means under or below.'],
    ['What does the prefix “anti-” mean in “anti-pollution”?',['against','before','within','small'],'The measure works in opposition to pollution.','<b>Anti-</b> means against.'],
    ['What does the prefix “over-” mean in “overcook”?',['too much','not enough','again','before'],'Food is cooked beyond the needed amount.','<b>Over-</b> can mean excessively or too much.'],
    ['What does the suffix “-less” mean in “harmless”?',['without','full of','able to','a person who'],'The word describes something without harm.','<b>-less</b> means without.'],
    ['What does the suffix “-ful” mean in “resourceful”?',['full of or showing','without','before','the act of'],'The person shows plenty of resourcefulness.','<b>-ful</b> means full of or characterised by.'],
    ['What does the suffix “-able” mean in “recyclable”?',['capable of being','a person who','the opposite of','done before'],'The material can undergo the action.','<b>-able</b> means capable of being recycled.'],
    ['Which word means “the state of being kind”?',['kindness','kindly','unkind','kinder'],'The suffix must turn the adjective into an abstract noun.','<b>-ness</b> forms the noun “kindness”.'],
    ['Which word names a person who teaches?',['teacher','teaching','teachable','reteach'],'The suffix should mean “a person who performs the action”.','<b>-er</b> forms an agent noun: a teacher teaches.'],
    ['Which suffix turns “educate” into a noun meaning a process?',['-tion','-ful','-less','-er than'],'Say the complete noun formed from “educate”.','Adding <b>-tion</b> forms “education”.'],
    ['Which word correctly means “not possible”?',['impossible','unpossible','mispossible','repossible'],'The negative prefix changes form before p.','<b>Im-</b> combines with “possible” to form “impossible”.'],
    ['Which word correctly means “not regular”?',['irregular','unregular','inregular','misregular'],'The negative prefix changes form before r.','<b>Ir-</b> combines with “regular” to form “irregular”.'],
    ['Which word means “one who studies biology”?',['biologist','biologyer','biologicness','antibiology'],'Use the suffix that names a specialist.','A <b>biologist</b> is a person who studies biology.'],
    ['How does the suffix change “decide” in the word “decision”?',['It changes a verb into a noun.','It changes a noun into an adjective.','It makes the word negative.','It makes the action happen again.'],'Identify the word classes of “decide” and “decision”.','The suffix changes the verb <b>decide</b> into the noun <b>decision</b>.']
  ]);
})();
