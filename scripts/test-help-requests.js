'use strict';
// "Ask a friend" — the help-request poll on a practice question.
//
// ⚠ Two invariants here are the whole reason this feature is safe to put on
//   WhatsApp, and both fail silently:
//     1. THE CORRECT ANSWER IS NEVER SENT. The poll row holds the question text
//        and the options only. If `answer` ever reaches the RPC, every shared
//        link becomes an answer key and nothing in the UI would show it.
//     2. THE CHILD IS NEVER NAMED. The share message carries a link and a plea.
//        A forwarded WhatsApp message cannot be recalled.
//
// ⚠ A third: asking for help must not COUNT as answering. If this ever called
//   recordAnswer() or _recordDaily(), a stuck child would silently damage the
//   mastery and daily figures their parent reads.
//
// Run: node scripts/test-help-requests.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (label, cond) => { checks++; if (!cond) { fails++; console.log('  FAIL  ' + label); } };

const appSrc   = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
const htmlSrc  = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const voteSrc  = fs.readFileSync(path.join(ROOT, 'vote.html'), 'utf8');
const sqlSrc   = fs.readFileSync(path.join(ROOT, 'migrations/20260916_help_polls.sql'), 'utf8');
// The follow-up migration that moved durations to minutes and added the cancel.
const minSrc   = fs.readFileSync(path.join(ROOT, 'migrations/20260916_help_polls_minutes.sql'), 'utf8');
const helpersSrc = fs.readFileSync(path.join(ROOT, 'engine/helpers.js'), 'utf8');
const authSrc  = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8');

// The block of app.js that owns the feature, so a match cannot come from
// somewhere unrelated in a 500 KB file.
const blockStart = appSrc.indexOf('let _helpPollCode = null;');
const blockEnd   = appSrc.indexOf('function _fmtHelpLeft');
ok('found the help-request block in engine/app.js', blockStart > 0 && blockEnd > blockStart);
const block = appSrc.slice(blockStart, blockEnd);

// ── 1. The answer never leaves the device ───────────────────────────────────
const rpcCall = block.slice(block.indexOf("_sb.rpc('help_poll_create'"), block.indexOf('if (error || !data'));
ok('help_poll_create is called with question, options and minutes only',
  /p_question:/.test(rpcCall) && /p_options:/.test(rpcCall) && /p_minutes:/.test(rpcCall));
ok('⚠ the correct answer is NEVER passed to the RPC',
  !/\bq\.answer\b/.test(rpcCall) && !/p_answer/.test(rpcCall));
ok('⚠ no answer column is written by the SQL',
  !/\banswer\b/i.test(sqlSrc.slice(sqlSrc.indexOf('INSERT INTO public.minigame_polls'),
                                   sqlSrc.indexOf('RETURN jsonb_build_object(\'ok\', true, \'code\''))));
ok('⚠ the results RPC returns no answer either',
  !/'answer'/.test(sqlSrc.slice(sqlSrc.indexOf('CREATE OR REPLACE FUNCTION public.minigame_poll_results'))));
ok('vote.html never marks anyone correct', !/\bcorrect\b/i.test(voteSrc.replace(/<!--[\s\S]*?-->/g, '')));

// ── 2. The child is never named ─────────────────────────────────────────────
const shareText = block.slice(block.indexOf('function _helpShareText'), block.indexOf('function shareHelpWhatsApp'));
ok('⚠ the share message carries no child name',
  !/DB\.name/.test(shareText) && !/display_name/.test(shareText) && !/getActiveAccount/.test(shareText));
ok('⚠ the share message carries no student id',
  !/ACTIVE_STUDENT_ID/.test(shareText) && !/student_id/.test(shareText));
ok('the share message does carry the link', /helpPollUrl\(\)/.test(shareText));

// ── 3. Asking is not answering ──────────────────────────────────────────────
ok('⚠ never calls recordAnswer()', !/recordAnswer\s*\(/.test(block));
ok('⚠ never calls _recordDaily()', !/_recordDaily\s*\(/.test(block));
ok('⚠ never calls gainPoints()', !/gainPoints\s*\(/.test(block));

// ── 4. Only a pollable question offers the button ───────────────────────────
ok('_helpPollable requires 2-4 options',
  /options\.length >= 2 && q\.options\.length <= 4/.test(block));
ok('the button is re-synced per question, not once per session',
  /_syncHelpRequestBtn\(\);/.test(appSrc.slice(appSrc.indexOf('function loadPracticeQuestion'),
                                              appSrc.indexOf('function loadPracticeQuestion') + 6000)));
ok('an open panel is closed when the question changes',
  /_stopHelpPoll\(\);\s*\n\s*document\.getElementById\('modal-ask-friend'\)\?\.classList\.add\('hidden'\);/.test(appSrc));

// ── 5. The options shared are the ones on screen ────────────────────────────
// makeMCQ() shuffles, so a poll built from an un-shuffled source array would
// letter the choices differently from the child's own screen.
ok('options are taken from the live question object', /const options = q\.options\.slice\(\);/.test(block));

// ── 6. The parent switch ────────────────────────────────────────────────────
ok('gated on DB.restrictions.helpRequestsDisabled', /restrictions\?\.helpRequestsDisabled/.test(block));
ok('⚠ default is ON — an absent key must not disable it',
  /if \(DB\?\.restrictions\?\.helpRequestsDisabled\) return false;/.test(block));
ok('a parent preview cannot open one (it holds no student token)',
  /Auth\.getParentProfile\(\)\) return false;/.test(block));
ok('helpRequestsDisabled is a PARENT_KEY (survives a settings refresh)',
  /'helpRequestsDisabled'/.test(helpersSrc.slice(helpersSrc.indexOf('const PARENT_KEYS'),
                                                helpersSrc.indexOf('const LEVELS'))));
ok('SupportSettings.describe() reports it', /helpRequestsDisabled\) out\.push/.test(helpersSrc));
ok('Auth exposes the toggle', /toggleHelpRequestsDisabled/.test(authSrc));
ok('the toggle is wired in index.html', /Auth\.toggleHelpRequestsDisabled\(\)/.test(htmlSrc));

// ── 7. Duration is chosen from a list, never taken as a number ──────────────
// ⚠ MINUTES, not hours. 1/6/24 hours treated this as homework set down and
//   returned to; the child is mid-question with the question on screen, and
//   nobody waits on that. A link outliving the session is also a public URL
//   that nobody is watching.
ok('⚠ SQL clamps the duration to a whitelist',
  /WHEN 3\s+THEN 3/.test(minSrc) && /WHEN 10 THEN 10/.test(minSrc) && /ELSE 5/.test(minSrc));
ok('only three durations are offered', (htmlSrc.match(/data-help-duration="/g) || []).length === 3);
ok('5 minutes is the default', /data-help-duration="5" aria-pressed="true"/.test(htmlSrc));
ok('nothing longer than 10 minutes is offered',
  (htmlSrc.match(/data-help-duration="(\d+)"/g) || []).every(m => Number(m.match(/\d+/)[0]) <= 10));

// ── The child can give up ────────────────────────────────────────────
// ⚠ Without a cancel the only thing to do while waiting is nothing, which is
//   the opposite of practice.
ok('help_poll_cancel exists', /CREATE OR REPLACE FUNCTION public\.help_poll_cancel/.test(minSrc));
ok('⚠ it can only close the caller OWN poll', /AND student_id = v_student/.test(minSrc));
ok('cancelling EXPIRES rather than deletes (a late voter is told it closed)',
  /SET expires_at = now\(\)/.test(minSrc));
ok('zero rows is not an error (already closed, or tapped twice)',
  /'closed', v_rows > 0/.test(minSrc));
ok('the client offers the way out', /function cancelHelpRequest/.test(appSrc));
ok('and the button is wired in the markup', /cancelHelpRequest\(\)/.test(htmlSrc));
ok('cancelling closes the panel and frees the child',
  /function cancelHelpRequest[\s\S]{0,400}closeHelpRequest\(\)/.test(appSrc));

// ── The share message states the deadline ────────────────────────────────
// ⚠ Both a duration AND a clock time: "closes in 5 minutes" is read whenever
//   the message is opened, which may be four minutes later. An absolute time
//   cannot go stale that way.
ok('the share text names the minutes left', /minute\$\{mins === 1/.test(appSrc));
ok('and the clock time it closes', /_helpCloseLabel\(\)/.test(appSrc));
ok('the message says a FRIEND needs help', /needs help to answer this question/.test(appSrc));
ok('the vote page says the same', /needs help/i.test(voteSrc));
ok('the vote page shows when voting closes', /Voting closes at/.test(voteSrc));
ok('expires_at is returned so the message can be accurate', /'expires_at', v_expires/.test(minSrc));
ok('the refresh beat is back to 3s for a short poll', /setInterval\(tick, 3000\)/.test(appSrc));

// ── 8. Rate limiting is per kind ────────────────────────────────────────────
// A busy afternoon of help requests must not exhaust the game's crowd-poll
// allowance, and vice versa.
ok('the help cap counts only help polls',
  /kind = 'help' AND created_at > now\(\) - interval '1 hour'/.test(sqlSrc));
ok('the game cap is untouched', !/minigame_poll_create/.test(sqlSrc.replace(/--[^\n]*/g, '')));
ok('and still untouched by the minutes migration',
  !/minigame_poll_create/.test(minSrc.replace(/--[^\n]*/g, '')));

// ── 9. The voting page tells the two kinds apart ────────────────────────────
ok('vote.html branches on kind', /poll\.kind === 'help'/.test(voteSrc));
ok('vote.html falls back to the game wording for rows with no kind',
  /coalesce\(p\.kind, 'game'\)/.test(sqlSrc));
ok('vote.html formats hours, not 1440 minutes', /if \(h >= 1\) return h \+ 'h '/.test(voteSrc));
ok('vote.html backs the refresh off for long polls', /function refreshMs/.test(voteSrc));

// ── 10. Percentages of nothing are zero ─────────────────────────────────────
ok('⚠ zero votes renders 0%, never an even split', /const pct = sum \? Math\.round\(n \/ sum \* 100\) : 0;/.test(block));
ok('the result is worded as a hint, not a verdict', /the crowd can be wrong/i.test(block));

// ── 11. The share link route exists ─────────────────────────────────────────
const workerSrc = fs.readFileSync(path.join(ROOT, 'workers/index.js'), 'utf8');
ok('/v/ is rewritten to vote.html by the Worker', /'\/v\/': '\/vote\.html'/.test(workerSrc));
ok('it is a rewrite, not a redirect (the code stays in the address bar)',
  /env\.ASSETS\.fetch\(new URL\(rewrite/.test(workerSrc));
ok('/a/ and /m/ were restored at the same time',
  /'\/a\/': '\/guest\.html'/.test(workerSrc) && /'\/m\/': '\/materials\.html'/.test(workerSrc));

console.log(`${checks - fails}/${checks} help-request checks passed`);
process.exit(fails ? 1 : 0);
