const fs = require('fs');
const p = 'index.html';
let s = fs.readFileSync(p, 'utf8');
const N = t => t.replace(/\n/g, '\r\n');
function must(find, repl, label) {
  find = N(find); repl = N(repl);
  const i = s.indexOf(find);
  if (i === -1) throw new Error('not found: ' + label);
  if (s.indexOf(find, i + 1) !== -1) throw new Error('not unique: ' + label);
  s = s.slice(0, i) + repl + s.slice(i + find.length);
}

must(
`        <!-- One neutral surface, icon over label — same shape language as the
             student bottom nav. See .pd-action in style.css. -->
        <div class="flex gap-2 items-stretch flex-wrap">`,
`        <!-- ⚠ Promoted OUT of the action row on purpose. Handing the device to a
             child is the most frequent thing a parent does on this screen and the
             one they most often could not find: as one of seven identical tiles it
             read as a settings item rather than the way in. Making it a louder
             tile INSIDE the row would have broken the single shape language that
             row exists to have, so it sits above the row instead — a different
             altitude, not a competing colour. See .pd-switch in style.css. -->
        <div class="relative mb-3">
          <button id="pd-student-view-btn" onclick="Auth.switchToStudentSelect()" class="pd-switch">
            <span class="pd-switch-ico" aria-hidden="true">🎒</span>
            <span class="pd-switch-text">
              <span class="pd-switch-title">Switch to student mode</span>
              <span class="pd-switch-sub">Hand the device over — your child signs in with their PIN</span>
            </span>
            <span class="pd-switch-go" aria-hidden="true">→</span>
          </button>
          <div id="pd-student-view-callout" class="hidden absolute z-20 top-full left-0 mt-2 w-56 rounded-xl bg-indigo-600 text-white text-xs leading-relaxed p-3 shadow-xl">
            <button onclick="dismissStudentViewGuide()" class="absolute top-1.5 right-2 text-white/70 hover:text-white" aria-label="Close">×</button>
            <b>Ready for your child?</b><br>Tap <b>Switch to student mode</b> to hand the device over and start practising. 🎒
            <span class="absolute -top-1 left-6 w-3 h-3 bg-indigo-600 rotate-45"></span>
          </div>
        </div>
        <!-- One neutral surface, icon over label — same shape language as the
             student bottom nav. See .pd-action in style.css. -->
        <div class="flex gap-2 items-stretch flex-wrap">`,
'promote the switch bar');

must(
`          <div class="relative">
            <button id="pd-student-view-btn" onclick="Auth.switchToStudentSelect()" class="pd-action"><span class="ico">👦</span><span>Student view</span></button>
            <div id="pd-student-view-callout" class="hidden absolute z-20 top-full right-0 mt-2 w-56 rounded-xl bg-indigo-600 text-white text-xs leading-relaxed p-3 shadow-xl">
              <button onclick="dismissStudentViewGuide()" class="absolute top-1.5 right-2 text-white/70 hover:text-white" aria-label="Close">×</button>
              <b>Ready for your child?</b><br>Click <b>Student view</b> to switch to kid mode and start practising questions. 🎒
              <span class="absolute -top-1 right-6 w-3 h-3 bg-indigo-600 rotate-45"></span>
            </div>
          </div>
`,
``,
'remove the old tile');

must(
`          <button onclick="Auth.switchToStudentSelect()"
            class="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200 px-3 py-1.5 rounded-full font-semibold transition-colors">
            👦 Student View
          </button>`,
`          <button onclick="Auth.switchToStudentSelect()"
            class="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200 px-3 py-1.5 rounded-full font-semibold transition-colors">
            🎒 Switch to student mode
          </button>`,
'teacher dashboard label');

fs.writeFileSync(p, s);
console.log('ok');
