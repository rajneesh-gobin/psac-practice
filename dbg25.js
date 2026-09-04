const fs = require('fs');
const p = 'style.css';
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
`.pd-action {`,
`/* ⚠ Deliberately NOT a .pd-action, and deliberately not IN that row.
   Handing the device to a child is the most frequent thing a parent does on
   this screen, and as one of seven identical tiles it read as a settings item
   — parents could not find it, which is why there is an onboarding nudge
   pointing at it at all. Promoting it inside the row would have meant a second
   loud colour competing with "Add child" and breaking the one shape language
   that row exists to have, so it is lifted OUT and sits above: full width on a
   phone, a stated purpose, and a direction to travel in. */
.pd-switch {
  display: flex; align-items: center; gap: 0.75rem; width: 100%;
  padding: 0.75rem 1rem; border-radius: 1rem; text-align: left;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  border: 1px solid #4338ca; color: #fff; cursor: pointer;
  box-shadow: 0 2px 10px rgba(79, 70, 229, 0.30);
  transition: box-shadow 0.15s, transform 0.15s, filter 0.15s;
}
/* Same reason as .pd-action.hidden: style.css loads after the Tailwind CDN, so
   a bare display:flex here would outrank Tailwind's .hidden. */
.pd-switch.hidden { display: none; }
.pd-switch:hover  { filter: brightness(1.08); box-shadow: 0 4px 16px rgba(79, 70, 229, 0.40); transform: translateY(-1px); }
.pd-switch:active { transform: translateY(0); }
.pd-switch:focus-visible { outline: 3px solid #a5b4fc; outline-offset: 2px; }
.pd-switch-ico   { font-size: 1.5rem; line-height: 1; flex: 0 0 auto; }
.pd-switch-text  { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; flex: 1 1 auto; }
.pd-switch-title { font-size: 0.9rem; font-weight: 800; line-height: 1.2; }
/* Not white-on-indigo at full strength: the subtitle is support, and at 0.85 it
   still clears 4.5:1 against this gradient. */
.pd-switch-sub   { font-size: 0.7rem; font-weight: 500; line-height: 1.35; color: rgba(255, 255, 255, 0.85); }
.pd-switch-go    { font-size: 1.15rem; font-weight: 700; flex: 0 0 auto; opacity: 0.9; }
/* Full width is right on a phone, where it is the first thing under the family
   card. On a wider screen a full-bleed bar reads as a banner, not a button. */
@media (min-width: 640px) {
  .pd-switch { width: auto; min-width: 21rem; }
}
.dark .pd-switch { border-color: #6366f1; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35); }

.pd-action {`,
'pd-switch styles');

fs.writeFileSync(p, s);
console.log('ok');
