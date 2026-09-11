'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'engine', 'app.js'), 'utf8');
const auth = fs.readFileSync(path.join(root, 'engine', 'auth.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

assert(auth.includes('setTimeout(showStudentViewGuide, 700)'),
  'successful first-child family setup must trigger the guide after rendering');
assert(/function showStudentViewGuide\(\)[\s\S]*localStorage\.getItem\(_studentViewGuideKey\(\)\)[\s\S]*return;/.test(app),
  'guide must refuse to show again after it has been seen');
assert(app.includes("psac_student_view_guide_seen:${parentId || 'device'}"),
  'guide state must be scoped per parent where possible');
assert(app.includes('setTimeout(dismissStudentViewGuide, 12000)'),
  'guide must quietly dismiss itself');
assert(html.includes('onclick="dismissStudentViewGuide(); Auth.switchToStudentSelect()"'),
  'using the highlighted action must close the guide immediately');
assert(/function showStudentViewGuide\(\)[\s\S]*?classList\.add\('attn-nudge'\)/.test(app),
  'the guide must use the same .attn-nudge shake as every other nudge');
assert(/\.attn-nudge\s*\{[^}]*animation:\s*attnNudge [^;]* 1;/.test(css),
  'attention animation must be finite and subtle');
assert(/async function switchToStudentSelect\(\)\s*\{[\s\S]{0,300}_markStudentModeUsed\(\)/.test(auth),
  'using student mode must stop the dashboard nudging towards it');

console.log('First-child student-mode guide is one-time, per-parent, subtle and auto-dismissing.');
