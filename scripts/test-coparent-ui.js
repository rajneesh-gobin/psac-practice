'use strict';
// Extracts the co-parent render functions out of engine/app.js and runs them
// against stubbed Store responses, asserting on the HTML actually produced.
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const SRC = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');

function grab(name) {
  const re = new RegExp('(?:async )?function ' + name + '\\s*\\(', 'g');
  const m = re.exec(SRC);
  if (!m) throw new Error('not found: ' + name);
  let i = SRC.indexOf('{', m.index), depth = 0, inS = null, esc = false;
  for (let j = i; j < SRC.length; j++) {
    const c = SRC[j], p = SRC[j - 1];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (inS) { if (c === inS) inS = null; continue; }
    if (c === '"' || c === "'" || c === '`') { inS = c; continue; }
    if (c === '/' && SRC[j + 1] === '/') { j = SRC.indexOf('\n', j); if (j < 0) break; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return SRC.slice(m.index, j + 1); }
  }
  throw new Error('unbalanced: ' + name);
}

const code = [grab('_renderCoparents'), grab('_coparentShell')].join('\n\n');

let pass = 0, fail = 0;
const check = (n, c, x) => c ? (pass++, console.log('  ok   ' + n))
                             : (fail++, console.log('  FAIL ' + n + (x ? '  -> ' + x : '')));

async function render(info) {
  const card = { id: 'coparent-card', innerHTML: '' };
  const ctx = vm.createContext({
    document: { getElementById: id => (id === 'coparent-card' ? card : null) },
    Store: { listFamilyMembers: async () => info },
    _attr: v => String(v == null ? '' : v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])),
    toast: () => {}, Auth: undefined, console,
    Date, Array, Object, JSON, isNaN, String, Number,
  });
  vm.runInContext(code + '\n; globalThis.__run = _renderCoparents;', ctx);
  await ctx.__run();
  return card.innerHTML;
}

const OWNER = { user_id: 'u1', name: 'Alice', role: 'owner',    is_me: true  };
const CO    = { user_id: 'u2', name: 'Bob',   role: 'coparent', is_me: false };

(async () => {
  console.log('\nA. owner alone, no invite yet');
  {
    const h = await render({ ok: true, members: [OWNER], is_owner: true, cap: 3, pending: null });
    check('offers the invite button', h.includes('Invite another parent'));
    check('explains what the other parent gets', /their own email and password/i.test(h));
    check('states the link is one-shot + 48h', /works once/i.test(h) && /48 hours/i.test(h));
    check('owner badge shown', h.includes('Owner'));
    check('no remove button on the owner themselves', !h.includes('_removeCoparent'));
    check('no unresolved template holes', !/undefined|\[object Object\]|\$\{/.test(h), h.slice(0, 200));
  }

  console.log('\nB. owner with a co-parent');
  {
    const h = await render({ ok: true, members: [OWNER, CO], is_owner: true, cap: 3, pending: null });
    check('lists the co-parent', h.includes('Bob'));
    check('owner can remove them', h.includes("_removeCoparent('u2'"));
    check('label is Remove, not Leave', h.includes('>Remove<'));
    check('marks which one is you', h.includes('(you)'));
    check('no template holes', !/undefined|\[object Object\]|\$\{/.test(h));
  }

  console.log('\nC. the CO-PARENT viewing the same screen');
  {
    const h = await render({
      ok: true, cap: 3, pending: null, is_owner: false,
      members: [{ ...OWNER, is_me: false }, { ...CO, is_me: true }],
    });
    check('cannot invite', !h.includes('Invite another parent'));
    check('told why', /Only the account owner/i.test(h));
    check('can leave', h.includes('>Leave this account<'));
    check('cannot remove the owner', !h.includes("_removeCoparent('u1'"));
  }

  console.log('\nD. an invite is outstanding');
  {
    const h = await render({
      ok: true, members: [OWNER], is_owner: true, cap: 3,
      pending: { created_at: '2026-09-01T10:00:00Z', expires_at: '2026-09-03T10:00:00Z' },
    });
    check('says a link is waiting', /waiting to be used/i.test(h));
    check('offers to cancel it', h.includes('_revokeCoparent'));
    check('shows the expiry date', /stops working on/.test(h));
    check('no Invalid Date', !/Invalid Date/.test(h));
  }

  console.log('\nE. account full');
  {
    const h = await render({
      ok: true, is_owner: true, cap: 3, pending: null,
      members: [OWNER, CO, { user_id: 'u3', name: 'Cara', role: 'coparent', is_me: false }],
    });
    check('no invite button', !h.includes('Invite another parent'));
    check('says it is full', /full \(3 parents\)/.test(h));
  }

  console.log('\nF. transport failure must NOT render as "just you"');
  {
    const h = await render(null);
    check('shows a failure, not an empty list', /Could not load/i.test(h));
    check('offers a retry', h.includes('_renderCoparents()'));
    check('does NOT offer to invite', !h.includes('Invite another parent'));
  }

  console.log('\nG. a name containing markup is escaped');
  {
    const h = await render({
      ok: true, is_owner: true, cap: 3, pending: null,
      members: [OWNER, { user_id: 'u9', name: '<img src=x onerror=alert(1)>', role: 'coparent', is_me: false }],
    });
    check('no raw <img injected', !h.includes('<img src=x'));
    check('escaped instead', h.includes('&lt;img'));
  }

  console.log('\n' + (fail ? 'FAILED ' + fail + ' / ' + (pass + fail) : 'all ' + pass + ' checks passed'));
  process.exit(fail ? 1 : 0);
})();
