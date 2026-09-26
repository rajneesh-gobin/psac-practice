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

// ⚠⚠ SETTINGS IS NO LONGER A TAB, ON PURPOSE, and this assertion had been
//   failing ever since. It was the NINTH item in the tablist and tipped that
//   strip onto a second line, so it moved to the action row beside Add child
//   and Add parent — same PD.mainTab('settings'), same panel, same history
//   entry, different home. Asserting it sits in `teacher-navigation` pinned the
//   old LOCATION while claiming to protect co-parent management, so the suite
//   went red for a deliberate improvement and stopped guarding anything.
// ⚠ What actually matters is REACHABILITY: whichever chrome it lives in, a
//   parent must still be able to open Settings, and "Add parent" must still
//   deep-link into the co-parent card inside it.
assert(/id="pd-settings-btn"[^>]*onclick="PD\.mainTab\('settings'\)"/.test(parent),
  'Settings must remain reachable from the parent dashboard because it contains co-parent management');
assert(!/PD\.mainTab\('settings'/.test(navigation),
  'Settings must not ALSO sit in the tablist - that duplication is what this file exists to prevent');

console.log('Add parent is a top family action and no longer duplicates the Settings feature in navigation.');
