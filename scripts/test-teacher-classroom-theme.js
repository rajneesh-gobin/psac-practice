'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const css = fs.readFileSync(path.resolve(__dirname, '..', 'style.css'), 'utf8');
const renderer = fs.readFileSync(path.resolve(__dirname, '..', 'engine', 'teacher_guest_classes.js'), 'utf8');

const hex = value => {
  const v = value.replace('#', '');
  return [0, 2, 4].map(i => parseInt(v.slice(i, i + 2), 16));
};
const luminance = color => hex(color).map(v => {
  const n = v / 255;
  return n <= .03928 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4);
}).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
const contrast = (a, b) => {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
};

assert(css.includes('.tc-board-hanger'), 'classrooms must use the hanging-board assembly');
assert(css.includes('.tc-board-nail'), 'hanging boards need the wall nail');
assert(css.includes('.tc-board-string'), 'hanging boards need visible strings');
assert(css.includes('.tc-board::after'), 'hanging boards need their wooden frame');
assert(css.includes('.tc-board-inner'), 'hanging boards need their chalk surface');
assert(css.includes('.tc-board-tray'), 'hanging boards need an action tray');
for (const part of ['tc-board-hanger','tc-board-nail','tc-board-strings','tc-board-inner','tc-board-tray']) {
  assert(renderer.includes(part), `classroom renderer must include ${part}`);
}
assert(renderer.includes('data-open-button='), 'hanging board must retain its clear Open action');
assert(renderer.includes('data-rename='), 'hanging board must retain Rename');
assert(renderer.includes('data-archive='), 'hanging board must retain Archive');
assert(contrast('#eeeedd', '#203824') >= 7,
  'chalk classroom names should have strong contrast on the board');

console.log('Teacher classrooms use hanging blackboards with wood frames, chalk surfaces and readable text.');
