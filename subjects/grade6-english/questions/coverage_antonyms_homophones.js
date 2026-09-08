'use strict';
// Grade 6 English - antonyms and homophones resolved through context.
(function () {
  const add = (section, rows) => rows.forEach((r, i) => STATIC_QUESTIONS.push(makeMCQ({
    id: `g6eng-ah-${section}-${String(i + 1).padStart(2, '0')}`,
    chapterId: 'g6eng-vocabulary', subsection: section, difficulty: 3,
    question: r[0], options: r[1], answer: r[1][0], hint: r[2], explanation: r[3]
  })));

  add('antonyms', [
    ['Choose the antonym of “scarce” in “Clean water became scarce after the drought.”',['abundant','limited','rare','insufficient'],'The opposite means available in large quantities.','<b>Abundant</b> means plentiful, the opposite of scarce.'],
    ['Choose the antonym of “reluctant”.',['eager','hesitant','unwilling','doubtful'],'The opposite person is keen to act.','<b>Eager</b> is the opposite of reluctant.'],
    ['Choose the antonym of “fragile”.',['sturdy','delicate','breakable','brittle'],'The opposite object can resist damage.','<b>Sturdy</b> means strong and solid.'],
    ['Choose the antonym of “ancient”.',['modern','historic','old','former'],'The opposite belongs to the present or recent period.','<b>Modern</b> is the opposite of ancient.'],
    ['Choose the antonym of “expand”.',['contract','increase','stretch','enlarge'],'The opposite action makes something smaller.','<b>Contract</b> means become smaller or narrower.'],
    ['Choose the antonym of “permit”.',['forbid','allow','approve','authorise'],'The opposite means refuse to allow.','<b>Forbid</b> is the opposite of permit.'],
    ['Choose the antonym of “transparent”.',['opaque','clear','visible','see-through'],'The opposite material does not let light pass through.','<b>Opaque</b> is the opposite of transparent.'],
    ['Choose the antonym of “temporary”.',['permanent','brief','short-term','momentary'],'The opposite continues without an intended end.','<b>Permanent</b> is the opposite of temporary.'],
    ['Choose the antonym of “optimistic”.',['pessimistic','hopeful','confident','positive'],'The opposite expects an unfavourable outcome.','<b>Pessimistic</b> is the opposite of optimistic.'],
    ['Choose the antonym of “generous”.',['stingy','giving','charitable','unselfish'],'The opposite is unwilling to give or share.','<b>Stingy</b> contrasts with generous.'],
    ['Choose the antonym of “frequent”.',['rare','regular','repeated','common'],'The opposite happens only occasionally.','<b>Rare</b> means not occurring often.'],
    ['Choose the antonym of “complex”.',['simple','complicated','intricate','detailed'],'The opposite is easy to understand or made of few parts.','<b>Simple</b> is the opposite of complex.'],
    ['Choose the antonym of “victory”.',['defeat','success','triumph','achievement'],'The opposite is losing a contest.','<b>Defeat</b> is the opposite of victory.'],
    ['Choose the antonym of “visible”.',['hidden','noticeable','clear','obvious'],'The opposite cannot be seen.','<b>Hidden</b> contrasts with visible.'],
    ['Choose the antonym of “include”.',['exclude','contain','involve','add'],'The opposite deliberately leaves something out.','<b>Exclude</b> is the opposite of include.'],
    ['Choose the antonym of “maximum”.',['minimum','highest','greatest','upper'],'The opposite means the least possible amount.','<b>Minimum</b> is the opposite of maximum.'],
    ['Choose the antonym of “harmless”.',['dangerous','safe','gentle','innocent'],'The opposite can cause injury or damage.','<b>Dangerous</b> is the opposite of harmless.'],
    ['Choose the antonym of “accurate”.',['incorrect','precise','exact','reliable'],'The opposite contains an error.','<b>Incorrect</b> contrasts with accurate.'],
    ['Choose the antonym of “accept”.',['reject','receive','approve','welcome'],'The opposite means refuse to take or agree to.','<b>Reject</b> is the opposite of accept.']
  ]);

  add('homophones', [
    ['Choose the correct word: “The pupils left ___ bags beside the door.”',['their','there','they’re','theirs’'],'The blank shows possession before a noun.','<b>Their</b> is the possessive determiner.'],
    ['Choose the correct word: “Please place the parcel over ___.”',['there','their','they’re','theirs'],'The blank refers to a place.','<b>There</b> points to a location.'],
    ['Choose the correct word: “___ preparing for the science fair.”',["They’re",'Their','There','Theirs'], 'The blank can be expanded to “they are”.', '<b>They’re</b> is the contraction of “they are”.'],
    ['Choose the correct word: “The driver pressed the ___ to stop the bicycle.”',['brake','break','braik','breake'],'The word names the device used to slow a vehicle.','A <b>brake</b> slows or stops a vehicle; break means damage or separate.'],
    ['Choose the correct word: “Be careful not to ___ the glass.”',['break','brake','braik','breake'],'The verb means damage something into pieces.','<b>Break</b> is the verb meaning damage; brake is a stopping device.'],
    ['Choose the correct word: “The wind ___ the papers across the yard.”',['blew','blue','blu','bleue'],'The blank needs the past tense of “blow”.','<b>Blew</b> is the past tense of blow; blue is a colour.'],
    ['Choose the correct word: “She wore a ___ scarf.”',['blue','blew','blu','bleue'],'The blank describes a colour.','<b>Blue</b> is the colour; blew is a past-tense verb.'],
    ['Choose the correct word: “We could ___ the waves from our room.”',['hear','here','heer','he’re'],'The blank means perceive sound.','<b>Hear</b> means detect sound; here refers to a place.'],
    ['Choose the correct word: “Leave your shoes ___.”',['here','hear','heer','he’re'],'The blank points to a location.','<b>Here</b> means in this place.'],
    ['Choose the correct word: “The baker used whole-wheat ___.”',['flour','flower','flouer','flowre'],'The ingredient is ground grain.','<b>Flour</b> is used in baking; a flower is part of a plant.'],
    ['Choose the correct word: “A yellow ___ opened beside the path.”',['flower','flour','flouer','flowre'],'The word names the blooming part of a plant.','<b>Flower</b> is the plant part.'],
    ['Choose the correct word: “The school ___ addressed the assembly.”',['principal','principle','principel','princible'],'The word names the head of a school.','A <b>principal</b> can be the person leading a school; a principle is a rule or belief.'],
    ['Choose the correct word: “Honesty is an important ___.”',['principle','principal','principel','princible'],'The word means a guiding rule or belief.','A <b>principle</b> is a rule or standard.'],
    ['Choose the correct word: “The hikers reached the mountain ___ before noon.”',['peak','peek','pique','peke'],'The word means the highest point.','A mountain <b>peak</b> is its top; peek means look quickly.'],
    ['Choose the correct word: “Do not ___ at the answers.”',['peek','peak','pique','peke'],'The verb means look quickly or secretly.','<b>Peek</b> means take a quick look.'],
    ['Choose the correct word: “Mina ___ a letter to the council.”',['wrote','rote','wroat','route'],'The blank needs the past tense of “write”.','<b>Wrote</b> is the simple past of write; rote means mechanical repetition.'],
    ['Choose the correct word: “The boat raised its ___ before leaving the harbour.”',['sail','sale','sael','saille'],'The word names the cloth that catches wind.','A <b>sail</b> helps move a boat; a sale is an event where goods are sold.']
  ]);
})();
