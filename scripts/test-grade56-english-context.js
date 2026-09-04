'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
for(const [grade,chapterSections] of [
  [5,[['eng-nouns','plurals'],['eng-nouns','pronouns']]],
  [6,[['g6eng-clauses','conjunctions'],['g6eng-verbs','perfect']]]
]) {
  const bank=JSON.parse(fs.readFileSync(`netlify/question-bundles/grade${grade}-english.json`,'utf8'));
  const added=bank.filter(q=>q.id.startsWith(`g${grade}eng-context-`));
  assert.equal(added.length,40);
  const ids=new Set(),textCounts=new Map();
  const normalise=s=>s.replace(/\s+/g,' ').trim().toLowerCase();
  for(const q of bank) { assert(!ids.has(q.id),`Duplicate ID ${q.id}`); ids.add(q.id); const t=normalise(q.question);textCounts.set(t,(textCounts.get(t)||0)+1); }
  for(const q of added) {
    assert(q.hint && q.explanation,`Missing guidance ${q.id}`);
    assert.equal(new Set(q.options).size,4,q.id);
    assert.equal(q.options.filter(o=>o===q.answer).length,1,q.id);
    assert.equal(textCounts.get(normalise(q.question)),1,`Duplicate prompt ${q.id}`);
    assert(chapterSections.some(([chapter,section])=>q.chapterId===chapter && q.subsection===section));
    assert.equal(q.difficulty,grade===5?2:3);
  }
  for(const [chapter,section] of chapterSections) {
    const count=bank.filter(q=>q.chapterId===chapter && q.subsection===section).length;
    assert(count>=20); console.log(`Grade ${grade} ${section}: ${count} questions`);
  }
  console.log(`Grade ${grade}: 40 additions, unique IDs/prompts, valid options, correct grade tags and help checked.`);
}
