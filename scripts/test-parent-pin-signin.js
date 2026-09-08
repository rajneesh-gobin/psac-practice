'use strict';
// netlify/functions/parent-pin-signin.js, exercised against a scripted Supabase
// client. Nothing here reaches the network and no real account is touched.
//
// This endpoint is the one place in the project where four digits stand in for
// a password, so the properties worth asserting are not "does it work" but
// "what does it refuse, and does it ever say WHY":
//   • every kind of no answers the SAME 401 — anything else is an
//     account-enumeration oracle
//   • an admin can never be entered by PIN
//   • the lockout is real and is counted server-side
//   • the salt matches engine/auth.js, which is a hand-copied literal in two
//     files and therefore exactly the drift CLAUDE.md warns about
//
// Run: node scripts/test-parent-pin-signin.js

const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');
const Module = require('module');

const ROOT = path.resolve(__dirname, '..');
const FN   = path.join(ROOT, 'netlify/functions/parent-pin-signin.js');

let failures = 0;
function check(name, ok, detail) {
  if (ok) { console.log('  ok   ' + name); return; }
  failures++;
  console.log('  FAIL ' + name + (detail ? '  -> ' + detail : ''));
}

// ── The scripted client ────────────────────────────────────────────────────
// One object stands in for both the service-role client and the anon client the
// function builds for verifyOtp; which one it is does not change any assertion
// here.
function makeDb(state) {
  const db = {
    rows: state,
    log: [],
    from(table) {
      db.log.push('from:' + table);
      const q = {
        _table: table,
        select() { return q; },
        eq(col, val) { q._id = val; return q; },
        async maybeSingle() {
          if (q._table === 'profiles') return { data: state.profiles[q._id] || null };
          if (q._table === 'parent_pin_attempts') return { data: state.attempts[q._id] || null };
          return { data: null };
        },
        async insert(row) { db.log.push('insert:' + q._table + ':' + row.kind); state.events.push(row); return { error: null }; },
        async upsert(row) { state.attempts[row.user_id] = Object.assign({}, state.attempts[row.user_id], row); return { error: null }; },
      };
      return q;
    },
    auth: {
      admin: {
        async getUserById(id) {
          const u = state.users[id];
          return u ? { data: { user: u }, error: null } : { data: null, error: { message: 'not found' } };
        },
        async generateLink(opts) {
          db.log.push('generateLink:' + opts.type + ':' + opts.email);
          if (state.mintFails) return { data: null, error: { message: 'nope' } };
          return { data: { properties: { hashed_token: 'ht-' + opts.email } }, error: null };
        },
      },
      async verifyOtp(opts) {
        db.log.push('verifyOtp:' + opts.type);
        if (state.verifyFails) return { data: null, error: { message: 'bad' } };
        return { data: { session: { access_token: 'at-1', refresh_token: 'rt-1' } }, error: null };
      },
    },
  };
  return db;
}

// Load the handler fresh with @supabase/supabase-js swapped out. Fresh, because
// the function keeps a per-container IP throttle in module scope and tests must
// not inherit each other's hits.
function loadHandler(db, env) {
  const saved = Object.assign({}, process.env);
  Object.assign(process.env, { SUPABASE_SERVICE_ROLE_KEY: 'svc-key' }, env || {});
  if (env && env.SUPABASE_SERVICE_ROLE_KEY === null) delete process.env.SUPABASE_SERVICE_ROLE_KEY;

  const origLoad = Module._load;
  Module._load = function (request, parent, isMain) {
    if (request === '@supabase/supabase-js') return { createClient: () => db };
    return origLoad.apply(this, arguments);
  };
  delete require.cache[require.resolve(FN)];
  let handler;
  try { handler = require(FN).handler; }
  finally { Module._load = origLoad; process.env = saved; }
  return handler;
}

const post = (body, headers) => ({
  httpMethod: 'POST',
  headers: Object.assign({ 'x-nf-client-connection-ip': '203.0.113.' + Math.floor(Math.random() * 250) }, headers),
  body: JSON.stringify(body),
});

const PARENT = '11111111-2222-3333-4444-555555555555';
const ADMIN  = '99999999-8888-7777-6666-555555555555';
const PIN    = '4271';
const hash = (pin) => crypto.createHash('sha256').update(pin + ':psac_v1_db').digest('hex');

function freshState(over) {
  return Object.assign({
    profiles: {
      [PARENT]: { parent_pin_hash: hash(PIN), role: 'parent', disabled: false, deleted_at: null },
      [ADMIN]:  { parent_pin_hash: hash(PIN), role: 'admin',  disabled: false, deleted_at: null },
    },
    users: { [PARENT]: { email: 'parent@example.test' }, [ADMIN]: { email: 'admin@example.test' } },
    attempts: {},
    events: [],
  }, over || {});
}

(async () => {
  // ── 1. The salt is a hand-copied literal in two files ────────────────────
  {
    const authSrc = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8');
    const fnSrc   = fs.readFileSync(FN, 'utf8');
    const inAuth  = /'\s*\+\s*':psac_v1_db'|pin \+ ':psac_v1_db'/.test(authSrc);
    const inFn    = /pin \+ ':psac_v1_db'/.test(fnSrc);
    check('engine/auth.js still salts with :psac_v1_db', inAuth);
    check('the function uses the SAME salt', inFn);
  }

  // ── 2. Method and configuration gates ────────────────────────────────────
  {
    const h = loadHandler(makeDb(freshState()));
    const r = await h({ httpMethod: 'GET', headers: {}, body: '' });
    check('GET is refused', r.statusCode === 405);
  }
  {
    const h = loadHandler(makeDb(freshState()), { SUPABASE_SERVICE_ROLE_KEY: null });
    const r = await h(post({ user_id: PARENT, pin: PIN }));
    check('no service key fails CLOSED', r.statusCode === 500 && JSON.parse(r.body).error === 'not_configured');
  }

  // ── 3. Every response is uncacheable ─────────────────────────────────────
  //     The CDN keys on URL alone. One cached 401 would lock every parent
  //     behind that edge node out of their own account.
  {
    const db = makeDb(freshState());
    const h  = loadHandler(db);
    const rs = [
      await h({ httpMethod: 'GET', headers: {}, body: '' }),
      await h(post({ user_id: PARENT, pin: '0000' })),
      await h(post({ user_id: PARENT, pin: PIN })),
    ];
    check('every response is no-store',
      rs.every(r => /no-store/.test(r.headers['Cache-Control'] || '')),
      rs.map(r => r.headers['Cache-Control']).join(' | '));
  }

  // ── 4. Every "no" is the SAME "no" ───────────────────────────────────────
  {
    const h = loadHandler(makeDb(freshState({
      profiles: {
        [PARENT]:  { parent_pin_hash: hash(PIN), role: 'parent', disabled: false, deleted_at: null },
        [ADMIN]:   { parent_pin_hash: hash(PIN), role: 'admin',  disabled: false, deleted_at: null },
        '00000000-0000-0000-0000-00000000dead': { parent_pin_hash: null, role: 'parent', disabled: false, deleted_at: null },
        '00000000-0000-0000-0000-0000000000ff': { parent_pin_hash: hash(PIN), role: 'parent', disabled: true, deleted_at: null },
      },
    })));
    const answers = [];
    for (const body of [
      { user_id: '00000000-0000-0000-0000-000000000404', pin: PIN },   // no such profile
      { user_id: '00000000-0000-0000-0000-00000000dead', pin: PIN },   // no PIN on file
      { user_id: '00000000-0000-0000-0000-0000000000ff', pin: PIN },   // disabled
      { user_id: ADMIN,  pin: PIN },                                   // an admin
      { user_id: PARENT, pin: '0000' },                                // wrong PIN
      { user_id: PARENT, pin: 'abcd' },                                // not a PIN
      { user_id: 'not-a-uuid', pin: PIN },                             // not an account
    ]) answers.push(await h(post(body)));
    const shapes = new Set(answers.map(r => r.statusCode + ':' + r.body));
    check('seven different failures give ONE answer', shapes.size === 1, [...shapes].join(' | '));
    check('and that answer is 401 invalid',
      answers[0].statusCode === 401 && JSON.parse(answers[0].body).error === 'invalid');
  }

  // ── 5. An admin is never reachable by PIN ────────────────────────────────
  {
    const db = makeDb(freshState());
    const h  = loadHandler(db);
    const r  = await h(post({ user_id: ADMIN, pin: PIN }));
    check('an admin with the CORRECT pin is refused', r.statusCode === 401);
    check('and no session was minted for them', !db.log.some(l => l.startsWith('generateLink')), db.log.join(','));
  }

  // ── 6. The lockout ───────────────────────────────────────────────────────
  {
    const state = freshState();
    const db = makeDb(state);
    const h  = loadHandler(db);
    const codes = [];
    for (let i = 0; i < 5; i++) codes.push((await h(post({ user_id: PARENT, pin: '0000' }))).statusCode);
    check('four wrong PINs are refused, the fifth locks',
      codes.slice(0, 4).every(c => c === 401) && codes[4] === 423, codes.join(','));
    const locked = await h(post({ user_id: PARENT, pin: PIN }));
    check('the CORRECT pin is refused while locked', locked.statusCode === 423);
    check('the lock says how long', JSON.parse(locked.body).retry_after_s > 0);
    check('every attempt was audited',
      state.events.filter(e => e.kind === 'parent:pin_signin_fail').length === 5,
      String(state.events.length));
  }
  {
    // A lock that has run out is not a lock.
    const state = freshState();
    state.attempts[PARENT] = { attempts: 0, locked_until: new Date(Date.now() - 1000).toISOString() };
    const h = loadHandler(makeDb(state));
    const r = await h(post({ user_id: PARENT, pin: PIN }));
    check('an expired lock lets the parent back in', r.statusCode === 200, r.body);
  }

  // ── 7. The happy path ────────────────────────────────────────────────────
  {
    const state = freshState();
    state.attempts[PARENT] = { attempts: 3, locked_until: null };
    const db = makeDb(state);
    const h  = loadHandler(db);
    const r  = await h(post({ user_id: PARENT, pin: PIN }));
    const body = JSON.parse(r.body);
    check('the correct PIN mints a session', r.statusCode === 200 && body.ok === true, r.body);
    check('it returns both tokens', !!body.access_token && !!body.refresh_token);
    check('it returns NOTHING else',
      Object.keys(body).sort().join(',') === 'access_token,ok,refresh_token', Object.keys(body).join(','));
    check('the email never leaves the server', !r.body.includes('parent@example.test'));
    check('the link was generated, never sent',
      db.log.some(l => l === 'generateLink:magiclink:parent@example.test'), db.log.join(','));
    check('a success resets the attempt counter', state.attempts[PARENT].attempts === 0);
    check('a success is audited', state.events.some(e => e.kind === 'parent:pin_signin'));
  }
  {
    // If GoTrue cannot mint, say so as a server fault - never as a bad PIN, or
    // a parent spends the evening retyping four digits that were right.
    const state = freshState({ mintFails: true });
    const h = loadHandler(makeDb(state));
    const r = await h(post({ user_id: PARENT, pin: PIN }));
    check('a mint failure is 503, not 401', r.statusCode === 503, String(r.statusCode));
    check('a mint failure does not count as a wrong PIN', !state.attempts[PARENT]);
  }

  // ── 8. Per-address burst limit ───────────────────────────────────────────
  {
    const h = loadHandler(makeDb(freshState()));
    const ip = { 'x-nf-client-connection-ip': '198.51.100.7' };
    let sawTooMany = false;
    for (let i = 0; i < 20; i++) {
      const r = await h({ httpMethod: 'POST', headers: ip,
        body: JSON.stringify({ user_id: PARENT, pin: '0000' }) });
      if (r.statusCode === 429) { sawTooMany = true; break; }
    }
    check('a burst from one address is cut off', sawTooMany);
  }


  // ── 9. The lockout ESCALATES ────────────────────────────────
  //    A flat 15 minutes is 480 guesses a day against a 10 000-value secret.
  //    Doubling each time is what turns a rate back into a limit.
  {
    const state = freshState();
    const db = makeDb(state);
    const h  = loadHandler(db);
    const waits = [];
    for (let round = 0; round < 4; round++) {
      // Serve out the previous lock so the next five wrong PINs are counted.
      if (state.attempts[PARENT]) state.attempts[PARENT].locked_until = null;
      let last;
      for (let i = 0; i < 5; i++) last = await h(post({ user_id: PARENT, pin: '0000' }));
      waits.push(JSON.parse(last.body).retry_after_s);
    }
    check('each lockout is longer than the last',
      waits.every((w, i) => i === 0 || w > waits[i - 1]), waits.join(','));
    check('the first is 15 minutes', waits[0] === 900, String(waits[0]));
    check('the fourth is two hours', waits[3] === 7200, String(waits[3]));
    check('the counter is kept server-side', state.attempts[PARENT].lockouts === 4,
      String(state.attempts[PARENT].lockouts));
  }
  {
    // ...and it is capped, so a parent is never locked out for a week.
    const state = freshState();
    state.attempts[PARENT] = { attempts: 4, lockouts: 30, locked_until: null };
    const h = loadHandler(makeDb(state));
    const r = await h(post({ user_id: PARENT, pin: '0000' }));
    check('the lock is capped at 24 hours', JSON.parse(r.body).retry_after_s === 86400,
      r.body);
  }
  {
    // A correct PIN wipes the history: yesterday's fumbles must not shorten
    // the fuse for a parent who simply mistyped once.
    const state = freshState();
    state.attempts[PARENT] = { attempts: 2, lockouts: 3, locked_until: null };
    const h = loadHandler(makeDb(state));
    await h(post({ user_id: PARENT, pin: PIN }));
    check('a correct PIN resets the escalation', state.attempts[PARENT].lockouts === 0,
      String(state.attempts[PARENT].lockouts));
  }
  console.log(failures ? '\n' + failures + ' check(s) failed' : '\nall checks passed');
  process.exit(failures ? 1 : 0);
})();
