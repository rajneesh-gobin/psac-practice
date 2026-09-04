'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('engine/minigame.js','utf8');
const hidden={};
const ctx=vm.createContext({
  $:id=>({classList:{toggle:(_,on)=>hidden[id]=on}}),
  parentAllows:true,planAllows:true,
  _allowed:()=>ctx.parentAllows,_planAllowsFeature:()=>ctx.planAllows
});
vm.runInContext(source.slice(source.indexOf('  function syncTile()'),source.indexOf('  // ── Hub')),ctx);
for(const [parent,plan] of [[true,true],[false,true],[true,false],[true,true]]) {
  ctx.parentAllows=parent;ctx.planAllows=plan;ctx.syncTile();
  assert.equal(hidden['student-games-section'],!parent||!plan);
  assert.equal(hidden['dash-games-tile'],!parent||!plan);
}
const html=fs.readFileSync('index.html','utf8');
const home=html.slice(html.indexOf('id="screen-subject-select"'),html.indexOf('id="screen-exam-config"'));
assert(home.indexOf('id="student-games-section"')>home.indexOf('id="subject-cards"'));
assert.match(home,/onclick="MiniGames.open\(\)"/);
const app=fs.readFileSync('engine/app.js','utf8');
assert.match(app,/function renderSubjectSelect\(\) \{\s*if \(typeof MiniGames !== 'undefined'\) MiniGames.syncTile\(\);/);
console.log('Student homepage Game Zone: placement, existing entry handler and parent/plan visibility gates passed.');
