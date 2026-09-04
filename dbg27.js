const fs = require('fs');
let sw = fs.readFileSync('sw.js', 'utf8');
if (!sw.includes("'shell-v100'")) throw new Error('shell anchor');
fs.writeFileSync('sw.js', sw.replace("'shell-v100'", "'shell-v101'"));

const p = 'CLAUDE.md';
let s = fs.readFileSync(p, 'utf8');
const nl = s.includes('\r\n') ? '\r\n' : '\n';
const N = t => t.split('\n').join(nl);
function must(find, repl, label) {
  find = N(find); repl = N(repl);
  const i = s.indexOf(find);
  if (i === -1) throw new Error('not found: ' + label);
  if (s.indexOf(find, i + 1) !== -1) throw new Error('not unique: ' + label);
  s = s.slice(0, i) + repl + s.slice(i + find.length);
}

must(`  file, or returning users never receive it. Currently **v100**.`,
     `  file, or returning users never receive it. Currently **v101**.`, 'shell');

// The line-ending note was incomplete, and that cost two harnesses in one session.
must(
`- ⚠ \`engine/calendar.js\`, \`style.css\` and \`weekly-digest.js\` are **CRLF**;
  \`engine/app.js\` is LF. A multi-line search string written with \`\n\` matches
  nothing in a CRLF file and reports "anchor not found" as though the code had
  changed. Normalise in memory, restore the file's own convention on write.`,
`- ⚠ \`engine/calendar.js\`, \`engine/auth.js\`, \`engine/question_loader.js\`,
  \`style.css\` and \`weekly-digest.js\` are **CRLF**; \`engine/app.js\` is LF; and
  **\`index.html\` is MIXED** — ~4830 CRLF lines and ~41 LF ones, sometimes
  adjacent (the parent-dashboard action row is an LF island). A multi-line search
  string written with \`\n\` matches nothing in a CRLF file and reports "anchor not
  found" as though the code had changed. Normalise in memory, restore the file's
  own convention on write, and in \`index.html\` detect **per anchor**.
  ⚠ This is not theoretical: \`scripts/test-family-setup-routing.js\` extracted
  \`_needsFamilySetup\` with a \`\n  }\n\` pattern and had been silently reporting
  "could not extract" — i.e. "the function is gone" — while the function was
  present and correct the whole time.`,
'line endings');

// The promoted button
must(
`- ⚠ **Do not share a class name between two components.**`,
`- **\`.pd-switch\` is the promoted "Switch to student mode" bar**, and it sits
  **above** the \`.pd-action\` row rather than inside it. Handing the device over is
  the most frequent thing a parent does on that screen and the one they could not
  find — as one of eight identical tiles labelled "Student view" it read as a
  settings item, which is why the app carries a one-time nudge pointing at it.
  ⚠ Promote by **altitude, not by colour**: a louder tile inside the row would
  break the single shape language that row exists to have and put a second CTA
  beside "Add child". Measured by \`scripts/test-switch-mode-button.js\` — at 360px
  it is 328px wide and **6.8× the area** of the largest tile, clears 4.5:1 on both
  gradient stops, and adds no horizontal scroll.
  ⚠ The ids stay \`pd-student-view-*\` and the seen-flag stays
  \`psac_student_view_guide_seen\` — renaming that key would re-show the onboarding
  nudge to every existing parent.
- ⚠ **Do not share a class name between two components.**`,
'pd-switch note');

fs.writeFileSync(p, s);
console.log('ok');
