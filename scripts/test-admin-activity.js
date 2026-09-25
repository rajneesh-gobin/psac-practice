'use strict';
// Admin › Activity — does the panel tell the truth about what it was given?
//
// The table stores events; the SCREEN is what turns them back into "she spent
// four minutes on practice and answered nothing, then closed the app". Two
// things in that sentence are computed here and nowhere else:
//
// ⚠ TIME IS A ROLL-UP OF 'screen_end' ROWS. A 'screen' row carries no duration
//   at all, so counting those instead would report visits as if they were
//   minutes.
// ⚠ A DEAD END IS AN ARRIVAL WITH NO DEPARTURE, and the newest row for an actor
//   is NOT one - that person may simply still be on that screen. Marking it
//   would tell an admin every active user had just abandoned the app.
//
//   node scripts/test-admin-activity.js

const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const src = fs.readFileSync('engine/admin.js', 'utf8').replace(/\r/g, '');
const a = src.indexOf('  // ── Activity trail ─');
assert.ok(a >= 0, 'the Activity block is not in engine/admin.js any more');
const b = src.indexOf("  // Hand-adjust one account's balance", a);
assert.ok(b > a, 'the end of the Activity block moved');
const BLOCK = src.slice(a, b) + `
__out.loadActivity = loadActivity;
__out.searchPeople = searchActivityPeople;
__out.deadEnds     = _actDeadEnds;
__out.dur          = _actDur;
__out.refLabel     = _actRefLabel;
`;

let checks = 0;
const ok = (label, cond, detail) => {
  assert(cond, label + (detail !== undefined ? ' — ' + JSON.stringify(detail) : ''));
  checks++; console.log('✓ ' + label);
};

const el = () => ({ innerHTML: '', value: '', textContent: '' });

function boot(rows, { students = [], profiles = [], chapters = [], packs = [] } = {}) {
  const dom = {
    'admin-act-list': el(), 'admin-act-summary': el(), 'admin-act-who': el(),
    'admin-act-limit': el(), 'admin-act-since': el(), 'admin-act-search': el(),
  };
  dom['admin-act-list'].insertAdjacentHTML = function (_pos, html) { this.innerHTML = html + this.innerHTML; };
  const out = {};
  const calls = [];   // every filter the query actually applied
  // The read chain admin.js uses: .select().order().limit(), plus .or()/.gte()
  // for the filters and .ilike()/.limit() for the people search.
  const table = name => {
    const rowsFor = name === 'students' ? students : name === 'profiles' ? profiles : rows;
    const done = Promise.resolve({ data: rowsFor, error: null });
    const q = {
      select: () => q, order: () => q,
      in: () => done,
      ilike: (col, term) => { calls.push(['ilike', col, term]); return q; },
      eq: (col, v) => { calls.push(['eq', col, v]); return q; },
      or: (expr) => { calls.push(['or', expr]); return q; },
      gte: (col, v) => { calls.push(['gte', col, v]); return q; },
      // ⚠ limit() is NOT the end of the chain in admin.js - the filters are
      //   appended after it - so it has to return the builder, and the builder
      //   is what resolves. A fake that resolved here would fail with
      //   "q.or is not a function" the moment a filter was added.
      limit: () => q,
      then: (res) => done.then(res),
    };
    return q;
  };
  const ctx = vm.createContext({
    console, __out: out, Promise, JSON, Object, Math, Number, String, Array, Date, Set, parseInt,
    document: { getElementById: id => dom[id] || null },
    _sb: { from: table },
    _allChapters: () => chapters,
    SUBJECT_PACKS: packs,
    _esc: s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
  });
  vm.runInContext(BLOCK, ctx, { filename: 'engine/admin.js (Activity)' });
  return { out, dom, ctx, calls };
}

// Newest first, exactly as the query returns them.
const ev = (id, kind, ref, meta, actor = 'kid-1', kindOfActor = 'student', asStudent = null, min = 0) => ({
  id, kind, ref, meta, actor_kind: kindOfActor, actor_id: actor, as_student: asStudent,
  created_at: new Date(Date.UTC(2026, 8, 26, 10, min)).toISOString(),
});

(async () => {
  console.log('Admin › Activity\n');

  // 1 · The headline case: opened practice, answered nothing, closed the app.
  {
    const rows = [
      ev(5, 'page_hide',  'practice',  null,                       'kid-1', 'student', null, 14),
      ev(4, 'screen_end', 'practice',  { ms: 240000, answers: 0 }, 'kid-1', 'student', null, 14),
      ev(3, 'screen',     'practice',  null,                       'kid-1', 'student', null, 10),
      ev(2, 'chapter_open', 'fractions', { pack: 'grade5-maths' }, 'kid-1', 'student', null, 10),
      ev(1, 'screen',     'practice-hub', null,                    'kid-1', 'student', null, 9),
    ];
    const t = boot(rows);
    await t.out.loadActivity();
    const list = t.dom['admin-act-list'].innerHTML;
    const sum  = t.dom['admin-act-summary'].innerHTML;
    ok('the trail names the chapter that was opened', /fractions/.test(list), list.slice(0, 200));
    ok('four minutes with nothing answered is called out',
      /4m 0s/.test(list) && /nothing answered/.test(list), list.match(/nothing answered/g));
    ok('the roll-up counts time from screen_end, not from arrivals',
      /Where the time goes/.test(sum) && /4m 0s/.test(sum), sum.slice(0, 300));
  }

  // 2 · ⚠ The dead end. Arrival 3 never got its departure, and it is not the
  //     newest row for that actor, so the app was closed on it.
  {
    const rows = [
      ev(4, 'screen', 'student-home', null, 'kid-1', 'student', null, 20),
      ev(3, 'screen', 'practice',     null, 'kid-1', 'student', null, 10),
      ev(2, 'screen_end', 'practice-hub', { ms: 5000, answers: 0 }, 'kid-1', 'student', null, 9),
      ev(1, 'screen', 'practice-hub', null, 'kid-1', 'student', null, 9),
    ];
    const t = boot(rows);
    const dead = t.out.deadEnds(rows);
    ok('a screen that was never left is a dead end', dead.has(3), [...dead]);
    ok('a screen that was left properly is not', !dead.has(1), [...dead]);
    ok('the newest row is never a dead end - they may still be on that screen',
      !dead.has(4), [...dead]);
  }

  // 3 · ⚠ Kid mode must be visibly a PARENT acting for a child. If this ever
  //     renders as the child alone, the panel answers the opposite of the
  //     question it was built for.
  {
    const rows = [
      ev(2, 'screen', 'student-home', null, 'parent-9', 'parent', 'kid-1', 12),
      ev(1, 'switch_to_kid', 'kid-1',  null, 'parent-9', 'parent', 'kid-1', 11),
    ];
    const t = boot(rows, {
      students: [{ id: 'kid-1', display_name: 'Shanvi', grade: 5 }],
      profiles: [{ id: 'parent-9', full_name: 'R. Gobin' }],
    });
    await t.out.loadActivity();
    const list = t.dom['admin-act-list'].innerHTML;
    ok('kid mode shows the parent AND the child they opened',
      /R. Gobin/.test(list) && /Shanvi/.test(list) && /→/.test(list), list.slice(0, 300));
    ok('and names the switch in words', /switched to kid mode/.test(list), list.slice(0, 200));
  }

  // 4 · Empty and broken are different answers.
  {
    const t = boot([]);
    await t.out.loadActivity();
    ok('no events says so plainly', /Nothing recorded yet/.test(t.dom['admin-act-list'].innerHTML),
      t.dom['admin-act-list'].innerHTML);
  }

  // 5 · Durations a person can read.
  {
    const t = boot([]);
    ok('durations are human', t.out.dur(45000) === '45s' && t.out.dur(95000) === '1m 35s'
      && t.out.dur(3700000) === '1h 1m', [t.out.dur(45000), t.out.dur(95000), t.out.dur(3700000)]);
  }

  // 6 · ⚠ FILTERING ONE CHILD MUST INCLUDE WHAT AN ADULT DID AS THEM. Kid-mode
  //     rows are filed under the PARENT (actor_id), with the child in
  //     as_student. An `eq('actor_id', child)` filter - the obvious one - hides
  //     exactly the half of the trail this feature was asked for.
  {
    const t = boot([ev(1, 'screen', 'practice', null, 'kid-1', 'student', null, 9)]);
    t.dom['admin-act-who'].value = 'kid-1';
    await t.out.loadActivity();
    const or = t.calls.find(c => c[0] === 'or');
    ok('one person\'s trail is actor_id OR as_student, never actor_id alone',
      or && /actor_id\.eq\.kid-1/.test(or[1]) && /as_student\.eq\.kid-1/.test(or[1]), t.calls);
  }

  // 7 · The period filter reaches the query rather than trimming afterwards -
  //     otherwise "last 24 hours" is still capped at the newest 200 rows of
  //     ALL time and can come back empty while yesterday is full.
  {
    const t = boot([ev(1, 'screen', 'practice', null, 'kid-1', 'student', null, 9)]);
    t.dom['admin-act-since'].value = '168';          // 7 days, in HOURS
    await t.out.loadActivity();
    const gte = t.calls.find(c => c[0] === 'gte');
    ok('a period filter is applied by the database, not after the fact',
      gte && gte[1] === 'created_at' && Date.now() - Date.parse(gte[2]) > 6 * 86400000, t.calls);
  }

  // 7b · ⚠ THE SHORT WINDOWS ARE THE POINT, and they are where a units bug
  //      hides. The control was whole DAYS, so "the last hour" parsed to 0 -
  //      which does not mean "an hour", it means NO FILTER, the widest possible
  //      answer served as the narrowest. An hour must cut at an hour.
  {
    const t = boot([ev(1, 'screen', 'practice', null, 'kid-1', 'student', null, 9)]);
    t.dom['admin-act-since'].value = '1';
    await t.out.loadActivity();
    const cut = Date.parse(t.calls.find(c => c[0] === 'gte')[2]);
    const ago = Date.now() - cut;
    ok('"last hour" cuts at one hour, not one day',
      ago > 3500000 && ago < 3700000, { minutesAgo: Math.round(ago / 60000) });
  }
  {
    const t = boot([ev(1, 'screen', 'practice', null, 'kid-1', 'student', null, 9)]);
    t.dom['admin-act-since'].value = '5';
    await t.out.loadActivity();
    const ago = Date.now() - Date.parse(t.calls.find(c => c[0] === 'gte')[2]);
    ok('"last 5 hours" cuts at five hours',
      ago > 5 * 3600000 - 60000 && ago < 5 * 3600000 + 60000, { hoursAgo: (ago / 3600000).toFixed(2) });
  }

  // 8 · ⚠ The people list comes from the TABLES. Built from the rows on screen
  //     it could only ever offer people who were already active.
  {
    const t = boot([], {
      students: [{ id: 'kid-7', display_name: 'Myra', grade: 4 }],
      profiles: [],
    });
    t.dom['admin-act-search'].value = 'myr';
    await t.out.searchPeople();
    const html = t.dom['admin-act-who'].innerHTML;
    ok('a name search finds a child who has done nothing at all',
      /kid-7/.test(html) && /Myra/.test(html), html);
    ok('and it searches the students table, not the visible events',
      t.calls.some(c => c[0] === 'ilike' && c[1] === 'display_name'), t.calls);
  }

  // 9 · ⚠ Internal ids are not a log a person can read.
  {
    const t = boot([], {
      chapters: [{ id: 'g5m-fractions', name: 'Fractions', subject: 'Maths' }],
      packs: [{ id: 'grade5-science', subject: 'Science', grade: 5 }],
    });
    ok('a screen id is rendered in words',
      t.out.refLabel({ kind: 'screen', ref: 'practice-hub' }) === 'Start Practicing (pick a subject)',
      t.out.refLabel({ kind: 'screen', ref: 'practice-hub' }));
    ok('a chapter id becomes the chapter and its subject',
      t.out.refLabel({ kind: 'chapter_open', ref: 'g5m-fractions' }) === 'Fractions (Maths)',
      t.out.refLabel({ kind: 'chapter_open', ref: 'g5m-fractions' }));
    ok('a pack id becomes the subject and grade',
      t.out.refLabel({ kind: 'subject_open', ref: 'grade5-science' }) === 'Science · Grade 5',
      t.out.refLabel({ kind: 'subject_open', ref: 'grade5-science' }));
    ok('an id with no translation still renders as itself, never blank',
      t.out.refLabel({ kind: 'screen', ref: 'some-new-screen' }) === 'some-new-screen',
      t.out.refLabel({ kind: 'screen', ref: 'some-new-screen' }));
  }

  // 10 · "Nothing for this person" and "nothing at all" are different answers.
  {
    const t = boot([]);
    t.dom['admin-act-who'].value = 'kid-1';
    await t.out.loadActivity();
    ok('an empty result says WHICH emptiness it is',
      /Nothing from this person/.test(t.dom['admin-act-list'].innerHTML),
      t.dom['admin-act-list'].innerHTML);
  }

  // 11 · One person selected gets their own summary line.
  {
    const rows = [
      ev(3, 'screen_end', 'practice', { ms: 120000, answers: 7 }, 'kid-1', 'student', null, 12),
      ev(2, 'screen', 'practice', null, 'kid-1', 'student', null, 10),
      ev(1, 'signin_student', 'kid-1', null, 'kid-1', 'student', null, 9),
    ];
    const t = boot(rows, { students: [{ id: 'kid-1', display_name: 'Shanvi', grade: 5 }] });
    t.dom['admin-act-who'].value = 'kid-1';
    await t.out.loadActivity();
    const html = t.dom['admin-act-list'].innerHTML;
    ok('a chosen person gets a line of their own totals',
      /Shanvi/.test(html) && /2m 0s on screen/.test(html) && /7 answered/.test(html)
      && /1 sign-in/.test(html), html.slice(0, 400));
  }

  console.log('\nAdmin › Activity: ' + checks + ' checks passed.');
})().catch(e => { console.error('\n✗ ' + e.message); process.exit(1); });
