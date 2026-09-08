'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');
const parent = html.match(/<div id="screen-parent"[\s\S]*?<div id="pd-panel-children">/)?.[0] || '';

assert(parent, 'parent dashboard markup must exist');
assert(parent.includes('id="pd-add-parent-btn"'), 'Add parent must be available beside the dashboard actions');
assert(parent.includes("id=\"pd-add-parent-btn\" onclick=\"PD.mainTab('settings','coparent-card')\""),
  'Add parent action must open the existing co-parent Settings card');

const navigation = parent.match(/<div class="teacher-navigation"[\s\S]*?<\/div>/)?.[0] || '';
assert(navigation, 'parent navigation must exist');
assert(!/Add Parent/i.test(navigation), 'Add Parent must not remain as a duplicate blackboard tab');
assert(/Settings/.test(navigation), 'Settings must remain available because it contains co-parent management');

console.log('Add parent is a top family action and no longer duplicates the Settings feature in navigation.');
