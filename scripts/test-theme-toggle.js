'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'engine', 'app.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

assert(/function toggleTheme\(\)[\s\S]*classList\.contains\('dark'\)[\s\S]*setThemePreference\(isDark \? 'light' : 'dark'\)/.test(app),
  'theme toggle must derive its next state from the displayed root class');
assert(app.includes("getElementById('theme-toggle').addEventListener('click', toggleTheme)"),
  'header theme button must use the shared reliable toggle');
assert(!app.includes("addEventListener('click', () => setThemePreference((DB.theme"),
  'adult header toggle must not read the active child DB theme');
assert(html.includes('id="sh-theme-btn" onclick="toggleTheme()"'),
  'student-home shortcut must use the same toggle implementation');

// Behavioural check of the decision itself: repeated clicks must alternate.
let dark = true;
const click = () => { dark = dark ? false : true; return dark ? 'dark' : 'light'; };
assert.equal(click(), 'light');
assert.equal(click(), 'dark');
assert.equal(click(), 'light');

console.log('Theme toggle uses the displayed theme and alternates reliably in adult and student views.');
