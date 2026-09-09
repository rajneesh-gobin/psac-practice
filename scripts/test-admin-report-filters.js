'use strict';
// Admin Reports tab: status filter, keyword/name search, collapsed cards.
//
// ⚠ The whole point of these three is that they are applied in the DATABASE.
// A client-side filter over one fetched page would make the "showing N of M"
// line lie and would hide every match past the first 30 rows - which is why
// this asserts that loadReports() and countReports() go through the SAME
// filter chain, not merely that each one filters something.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const storeSource = fs.readFileSync('engine/store.js', 'utf8');
const adminSource = fs.readFileSync('engine/admin.js', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

// The real filter helpers plus the two callers, lifted out and run for real.
const fnStart = storeSource.indexOf('  function _reportKindFilter(q, kind)');
const fnEnd = storeSource.indexOf('  async function resolveReport', fnStart);
assert.ok(fnStart >= 0 && fnEnd > fnStart, 'report filter block not found in store.js');

function makeCtx() {
  const calls = [];
  const q = {
    select() { return q; },
    eq(col, val) { calls.push(`eq:${col}=${val}`); return q; },
    or(str) { calls.push(`or:${str}`); return q; },
    order() { return q; },
    range() { return Promise.resolve({ data: [] }); },
    then(resolve) { resolve({ count: 3, error: null }); },
  };
  const ctx = vm.createContext({ _sb: { from() { return q; } }, calls, console });
  vm.runInContext(storeSource.slice(fnStart, fnEnd), ctx);
  return ctx;
}

function filtersFor(kind, status, search) {
  const ctx = makeCtx();
  ctx._reportFilters(ctx._sb.from('question_reports'), kind, status, search);
  return ctx.calls;
}

(async () => {
  // ── status ─────────────────────────────────────────────────────────────
  assert.deepEqual(filtersFor('all', 'all', ''), [], 'no filter chosen must add no predicate');

  // ⚠ A row with a NULL status is DRAWN as open (the card reads r.status ||
  // 'open'). An .eq('status','open') would hide reports the list calls open,
  // and the open count would then disagree with the badge.
  const open = filtersFor('all', 'open', '');
  assert.equal(open.length, 1);
  assert.match(open[0], /^or:status\.is\.null,status\.in\.\(open,in_review\)$/);

  assert.deepEqual(filtersFor('all', 'resolved', ''), ['eq:status=resolved']);
  assert.deepEqual(filtersFor('all', 'wont_fix', ''), ['eq:status=wont_fix']);
  assert.deepEqual(filtersFor('all', 'nonsense', ''), [], 'an unknown status must fall back to all');

  // ── search ─────────────────────────────────────────────────────────────
  const search = filtersFor('all', 'all', 'Priya');
  assert.equal(search.length, 1);
  assert.equal(search[0],
    'or:question_id.ilike.*Priya*,question_text.ilike.*Priya*,message.ilike.*Priya*');

  // The reporter's NAME is only searchable because it is packed into
  // question_text as __meta__{"studentName":…}; drop that column from the
  // search and "search by name" silently stops working.
  assert.ok(search[0].includes('question_text.ilike'), 'name search needs question_text');
  assert.match(storeSource, /studentName: studentName \|\| null/);

  // PostgREST parses the or= string itself: an unescaped comma or bracket in
  // the term is read as syntax, not as text. There is no escape for them, so
  // they are dropped.
  const nasty = filtersFor('all', 'all', 'a,b(c)"d\'e*f%g\\h');
  assert.equal(nasty.length, 1);
  const terms = nasty[0].match(/question_id\.ilike\.\*(.*?)\*,question_text/);
  assert.ok(terms, 'search predicate malformed: ' + nasty[0]);
  assert.ok(!/[,()"'*%\\]/.test(terms[1]), 'or= syntax characters must be stripped: ' + terms[1]);

  assert.deepEqual(filtersFor('all', 'all', '   '), [], 'a blank search must not filter');

  // ── kind still works, and combines ────────────────────────────────────
  assert.deepEqual(filtersFor('contact', 'all', ''), ['eq:report_type=contact']);
  const combo = filtersFor('questions', 'open', 'plants');
  assert.equal(combo.length, 3, 'kind + status + search must all be sent');

  // ── the list and the count must not be able to disagree ───────────────
  for (const [name, run] of [
    ['loadReports', (ctx) => ctx.loadReports(0, 30, 'contact', 'open', 'Priya')],
    ['countReports', (ctx) => ctx.countReports('contact', 'open', 'Priya')],
  ]) {
    const ctx = makeCtx();
    await run(ctx);
    assert.equal(ctx.calls.length, 3, `${name} must apply kind, status and search`);
    assert.ok(ctx.calls.includes('eq:report_type=contact'), name);
    assert.ok(ctx.calls.some(c => c.startsWith('or:status.is.null')), name);
    assert.ok(ctx.calls.some(c => c.includes('message.ilike.*Priya*')), name);
  }

  // ── collapsed by default ───────────────────────────────────────────────
  // The card body lives in <details>, so "collapsed" is the ABSENCE of an
  // open attribute - there is no class anyone can forget to add.
  assert.match(adminSource, /<details class="rep-det flex-1 min-w-0"\$\{openAttr\}/);
  assert.match(adminSource, /const openAttr = _reportsOpen\.has\(r\.id\) \? ' open' : '';/);
  assert.match(adminSource, /ontoggle="AdminPanel\.toggleReportOpen\('\$\{safeId\}', this\.open\)"/);
  // A card repaints after Resolve / Reply / Won't fix. The open set is
  // module-level so that repaint cannot shut the card the admin is working in.
  assert.match(adminSource, /const _reportsOpen = new Set\(\);/);
  // The bulk-delete checkbox must stay OUTSIDE <summary>: inside it, ticking a
  // box would also toggle the card.
  const cardStart = adminSource.indexOf('const openAttr = _reportsOpen');
  const card = adminSource.slice(cardStart, adminSource.indexOf('</details>', cardStart));
  assert.ok(card.indexOf('class="rep-pick') < card.indexOf('<summary'),
    'the select checkbox must be rendered before <summary>, not inside it');

  // ── the toolbar is wired to functions that exist ──────────────────────
  const adminExports = adminSource.split(/\r?\n/).find(l => l.includes('loadReports,') && l.includes('setReportKind'));
  assert.ok(adminExports, 'AdminPanel report API export line not found');
  for (const fn of ['setReportStatusFilter', 'onReportSearch', 'submitReportSearch',
    'clearReportSearch', 'resetReportFilters', 'toggleReportOpen', 'toggleExpandAllReports'])
    assert.ok(adminExports.includes(fn), 'AdminPanel must export ' + fn);

  for (const id of ['rep-search', 'rep-search-clear', 'rep-st-all', 'rep-st-open',
    'rep-st-resolved', 'rep-st-wontfix', 'rep-expand-all'])
    assert.ok(html.includes(`id="${id}"`), 'index.html is missing #' + id);
  for (const call of ['AdminPanel.setReportStatusFilter(', 'AdminPanel.onReportSearch(',
    'AdminPanel.clearReportSearch()', 'AdminPanel.toggleExpandAllReports()'])
    assert.ok(html.includes(call), 'index.html does not call ' + call);

  // Every AdminPanel.x( named in the reports panel must be exported, or the
  // control is a button that throws.
  const panelStart = html.indexOf('id="admin-tab-reports"');
  const panel = html.slice(panelStart, html.indexOf('</div>', html.indexOf('admin-reports-more')));
  for (const m of panel.matchAll(/AdminPanel\.(\w+)\(/g))
    assert.ok(new RegExp(`\\b${m[1]}\\b`).test(adminExports), 'AdminPanel must export ' + m[1]);

  // The chips are synced from state in the RENDER, never only in the handler,
  // so a repaint cannot leave the DOM claiming a filter that is not applied.
  assert.match(adminSource, /\['all', 'rep-st-all'\], \['open', 'rep-st-open'\]/);
  assert.match(adminSource, /if \(box && box\.value !== _reportSearch\) box\.value = _reportSearch;/);

  // "No reports yet" is a lie whenever a filter is on.
  assert.match(adminSource, /No reports match these filters/);
  assert.match(adminSource, /AdminPanel\.resetReportFilters\(\)/);

  // style.css owns the collapsed-card and search styling; the Tailwind Play CDN
  // never sees these class names.
  for (const rule of ['.rep-sum', '.rep-caret', '.rep-sum-snip', '.rep-search'])
    assert.ok(css.includes(rule + ' ') || css.includes(rule + '{') || css.includes(rule + ','),
      'style.css is missing ' + rule);
  assert.match(css, /\.rep-sum::-webkit-details-marker \{ display: none; \}/);

  console.log('Admin report filters: status/search filtered in the database, list and count share the chain, cards collapse by default. passed.');
})().catch(err => { console.error(err.message); process.exit(1); });
