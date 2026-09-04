const fs = require('fs');
const p = 'scripts/test-parent-pin-recovery.js';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(
  "    try { await A.init(); } catch (_) { /* routing goes on to need far more of the app */ }\n    check('init consults the stash', sb.calls.includes('rt=rt-stashed'), sb.calls.join(','));",
  "    let err = null;\n    try { await A.init(); } catch (e) { err = e; }\n    console.log('DEBUG init calls:', sb.calls.join(','), '| err:', err && err.message);\n    check('init consults the stash', sb.calls.includes('rt=rt-stashed'), sb.calls.join(','));");
fs.writeFileSync(p, s);
