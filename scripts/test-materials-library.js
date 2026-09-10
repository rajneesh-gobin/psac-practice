'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The class library — one permanent link to a classroom's whole shelf.
//
//  ⚠ WHAT WAS BROKEN. shareMaterial() handed out a SIGNED STORAGE URL for
//  exactly one file, and learning_materials.link_expiry_seconds defaults to
//  3600 — so the WhatsApp message a teacher sent was one file that stopped
//  working within the hour, and a second file meant a second message. Pupils
//  ended up with a chat full of dead links and no way to see what else existed.
//
//  ⚠ THE FIX IS A SPLIT: the CODE is permanent, the signed URLs are minted per
//  visit. Most of this file guards that split — a cached page or a cached API
//  response would hand a child part-expired URLs and hide what was added this
//  morning, which is the exact failure the feature exists to remove.
//
//  ⚠ THE LINK IS THE CREDENTIAL, and it must stay a small one: materials and
//  the class name, never pupils, marks, PINs or assignment codes.
//
//  Run: node scripts/test-materials-library.js
// ══════════════════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
const ck = (label, ok, detail) => {
  if (ok) { pass++; return; }
  fail++; console.log('  FAIL  ' + label + (detail ? '  [' + detail + ']' : ''));
};
const section = t => console.log('\n── ' + t + ' ──');

const mig    = fs.readFileSync(path.join(ROOT, 'migrations/20260910_classroom_materials_library.sql'), 'utf8');
const fnSrc  = fs.readFileSync(path.join(ROOT, 'netlify/functions/materials-library.js'), 'utf8');
const page   = fs.readFileSync(path.join(ROOT, 'materials.html'), 'utf8');
const js     = fs.readFileSync(path.join(ROOT, 'materials.js'), 'utf8');
const detail = fs.readFileSync(path.join(ROOT, 'engine/teacher_classroom_detail.js'), 'utf8');
const toml   = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8');
const sw     = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const prep   = fs.readFileSync(path.join(ROOT, 'scripts/prepare-deploy.js'), 'utf8');
const css    = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');

// ── 1 · the code ──────────────────────────────────────────────────────────
section('the classroom code');
{
  ck('classrooms carry a library code',
    /ALTER TABLE public\.teacher_guest_classes\s+ADD COLUMN IF NOT EXISTS materials_code text/.test(mig));
  // ⚠ NULL = no link. A boolean AND a code could disagree; one column cannot.
  ck('NULL means "switched off", so there is no second source of truth',
    !/materials_code text NOT NULL/.test(mig) && /SET materials_code = NULL/.test(mig));
  ck('the shape is checked in the database',
    /teacher_guest_classes_materials_code_ck[\s\S]{0,160}\^\[A-Z0-9\]\{10\}\$/.test(mig));
  ck('the unique index is PARTIAL, so the many NULLs do not collide',
    /teacher_guest_classes_materials_code_uq[\s\S]{0,140}WHERE materials_code IS NOT NULL/.test(mig));
  // ⚠ Read off a whiteboard, typed by a nine-year-old.
  ck('the alphabet drops confusable characters',
    /alpha text := '[ACDEFGHJKMNPQRTUVWXY34679]+'/.test(mig)
    && !/alpha text := '[^']*[O01IL]/.test(mig));

  // ⚠⚠ The single most important line here: opening the Materials tab READS
  //    this. A read that mints would put every classroom a teacher merely
  //    looked at on the open internet.
  ck("'get' never mints a code",
    /IF p_action = 'get' THEN\s+RETURN jsonb_build_object\('ok', true, 'code', c\.materials_code,\s*'access_type', c\.access_type\);/.test(mig));
  ck("…and the comment says why", /a read that\s*--\s*creates a public address as a side effect/.test(mig));
  ck("'create' is idempotent, so a second Share tap keeps the same address",
    /IF p_action = 'create' AND c\.materials_code IS NOT NULL THEN[\s\S]{0,120}'created', false/.test(mig));
  ck('an unknown action is refused, not silently treated as create',
    /IF p_action NOT IN \('create', 'rotate'\) THEN RAISE EXCEPTION/.test(mig));
  ck('only the owning teacher can touch it',
    /teacher_id = auth\.uid\(\) AND deleted_at IS NULL FOR UPDATE/.test(mig)
    && /teacher_guest_authorized\(\)/.test(mig));
}

// ── 2 · the PIN gate ──────────────────────────────────────────────────────
section('materials_library_open — the gate');
{
  const body = mig.slice(mig.indexOf('FUNCTION public.materials_library_open'));

  // ⚠⚠ THE CORRECTION. The first draft of this feature made the link open to
  //    anyone holding it, reasoning that the existing single-file share already
  //    did that. It was wrong twice over: a classroom's whole shelf is not one
  //    file, and this link also lists the homework codes for the class.
  ck('a pupil proves who they are with a PIN, not just the code',
    /class_pin_lookup/.test(body) && /pin_lookup = encode\(hmac/.test(body));
  ck('the shared-PIN classroom also needs a name',
    /'error', 'name_required'/.test(body));
  ck('a per-pupil classroom resolves the pupil FROM the PIN',
    /v_key := pupil\.id::text/.test(body));
  ck('…and the shared key matches teacher_guest_open exactly',
    /v_key := 'shared:' \|\| lower\(v_who\)/.test(body));
  ck('info:true describes the gate and returns nothing behind it',
    /IF p_info THEN[\s\S]{0,400}'access_mode'/.test(body)
    && !/IF p_info THEN[\s\S]{0,400}materials/.test(body));

  // ⚠ A 4-digit PIN with unlimited guesses is not a PIN.
  ck('wrong PINs are throttled', /teacher_guest_class_throttle/.test(body)
    && /attempts = t\.attempts \+ 1/.test(body));
  ck('the throttle is its own table, keyed on the CLASSROOM',
    /CREATE TABLE IF NOT EXISTS public\.teacher_guest_class_throttle[\s\S]{0,200}classroom_id uuid NOT NULL/.test(mig));
  // ⚠ A correct PIN CLEARS it, or a class of thirty with the ordinary handful
  //   of typos between them locks the room out by the afternoon.
  ck('a correct PIN resets the counter',
    /A correct PIN CLEARS the counter/.test(body)
    && /SET attempts = 0, since = now\(\)/.test(body));
  ck('the ceiling allows for a whole class behind one NAT',
    /t\.attempts >= 30/.test(body) && /one school NAT/.test(body));
  ck('the throttle table is service_role only',
    /REVOKE ALL ON public\.teacher_guest_class_throttle FROM PUBLIC, anon, authenticated/.test(mig));

  // ⚠ ONE answer for four different failures, or the code becomes an oracle
  //   for "does this classroom exist".
  ck('missing, off, archived and deleted all answer the same not_found',
    (body.match(/'error', 'not_found'/g) || []).length >= 3);
  ck('an archived classroom is refused', /NOT FOUND OR NOT c\.active/.test(body));
  ck('a soft-deleted classroom is refused', /deleted_at IS NULL/.test(body));
  ck('a disabled, expired or unapproved teacher takes the shelf with them',
    /NOT coalesce\(disabled, false\)/.test(body)
    && /teacher_status = 'approved'/.test(body));

  // ── What a correct PIN is allowed to see ──
  ck('it returns the classroom name and grade only',
    /'classroom', jsonb_build_object\('name', c\.name, 'grade', c\.grade\)/.test(body));
  // ⚠ Judge the object that is BUILT, not the prose around it — the comment
  //   explaining the omission naturally contains the very words being banned.
  ck('homework is listed by CODE, never by question ids',
    /'code',\s+a\.code/.test(body) && !/'question_ids'/.test(body));
  // ⚠ A mark belongs on the teacher's screen until they have looked at it, and
  //   children comparing marks on a shared tablet is what this must not enable.
  ck('NO score is returned, and the comment says why',
    !/'score'/.test(body) && /the SCORE is deliberately absent/.test(body));
  ck('only ACTIVE, unexpired, undeleted work is offered',
    /a\.status = 'active'/.test(body) && /a\.expires_at > now\(\)/.test(body)
    && /a\.deleted_at IS NULL/.test(body));
  // ⚠ Work set for six named pupils must not appear on the other 24's hub.
  ck('the per-pupil ROSTER is honoured',
    /teacher_guest_roster r[\s\S]{0,160}r\.pupil_id::text = v_key/.test(body));
  ck('done is THIS pupil\'s own row', /g\.name_key = v_key/.test(body));
  // ⚠ c.secret is a legitimate hmac argument INSIDE the function; what matters
  //   is what the returned object carries. Scope to the final RETURN.
  {
    const ret = body.slice(body.lastIndexOf("RETURN jsonb_build_object('ok', true,"));
    ['secret', 'pin_cipher', 'pin_lookup', 'teacher_id', 'file_path'].forEach(word => {
      ck('the returned object never carries ' + word, !new RegExp(word).test(ret));
    });
  }

  // ⚠ service_role only: the browser never calls this, only the function does.
  ck('it is revoked from anon AND authenticated',
    /REVOKE ALL ON FUNCTION public\.materials_library_open\(text, text, text, text, boolean\) FROM PUBLIC, anon, authenticated/.test(mig));
  ck('…and granted to service_role alone',
    /GRANT EXECUTE ON FUNCTION public\.materials_library_open\(text, text, text, text, boolean\) TO service_role;/.test(mig));
  ck('the one-argument draft is dropped, so no ambiguous overload survives',
    /DROP FUNCTION IF EXISTS public\.materials_library_open\(text\);/.test(mig));
  ck('the teacher function is revoked from anon',
    /REVOKE ALL ON FUNCTION public\.teacher_classroom_materials_link\(uuid, text\) FROM PUBLIC, anon/.test(mig));
  ck('the whole migration is one transaction', /^BEGIN;/m.test(mig) && /^COMMIT;/m.test(mig));
}

// ── 3 · the endpoint ──────────────────────────────────────────────────────
section('materials-library.js');
{
  // ⚠ THE POINT OF THE WHOLE FEATURE.
  ck('signed URLs are minted per request', /createSignedUrl\(m\.file_path, expiry\)/.test(fnSrc));
  ck('…and never cached', /'Cache-Control': 'no-store, no-cache'/.test(fnSrc));
  ck('it fails closed with no service key',
    /if \(!url \|\| !key\)[\s\S]{0,140}not_configured/.test(fnSrc));
  // ⚠ A shape check that answers differently from "no such code" is a free
  //   oracle for anyone guessing codes.
  ck('a malformed code answers exactly like a missing one',
    /if \(!CODE_RE\.test\(code\)\)[\s\S]{0,340}'not_found'/.test(fnSrc));
  ck('a link material is never signed', /A LINK material is not in Storage and must never be signed/.test(fnSrc));
  ck('…and only http/https reaches an href',
    /\^https\?:\\\/\\\/\/i\.test\(String\(m\.external_url/.test(fnSrc));
  // ⚠ file_path is a storage key. The signed URL is the only useful form.
  ck('the storage path never leaves the function',
    !/file_path:/.test(fnSrc.slice(fnSrc.indexOf('return {'))));
  ck('an un-migrated database says "not ready", not "everything is gone"',
    /'not_ready'/.test(fnSrc) && /PGRST202\|42883/.test(fnSrc));
  ck('the PIN and name are relayed to the RPC',
    /p_name: name, p_pin: pin/.test(fnSrc));
  // ⚠ Only this function knows the caller's real address, and it is the
  //   throttle key — never an identity, and never a reason to refuse anyone.
  ck('the real client IP is relayed as the throttle key',
    /x-nf-client-connection-ip/.test(fnSrc) && /p_ip: ip/.test(fnSrc));
  ck('the info reply short-circuits before any signing',
    fnSrc.indexOf('if (info) return') < fnSrc.indexOf('createSignedUrl'));
}

// ── 4 · the page ──────────────────────────────────────────────────────────
section('the pupil page');
{
  ck('standalone: no Tailwind, no supabase-js, no engine file',
    !/tailwind|supabase|engine\//i.test(page.replace(/<!--[\s\S]*?-->/g, '')));
  ck('it is not indexed', /name="robots" content="noindex"/.test(page));
  ck('the four views all exist',
    /data-view="work"/.test(page) && /data-view="list"/.test(page)
    && /data-view="subject"/.test(page) && /data-view="calendar"/.test(page));
  // ⚠ Homework is the view a child opens this page FOR.
  ck('homework is the default view', /VIEWS, 'work'/.test(js) && /view: 'work'/.test(js));
  ck('the gate exists in the markup',
    /id="gate"/.test(page) && /id="g-pin"/.test(page) && /id="g-go"/.test(page));
  ck('the PIN field is 16px, so iOS does not zoom and stay zoomed',
    /16px minimum/.test(page));
  ck('the name field is hidden for a per-pupil classroom',
    /needsName = S\.access === 'shared_pin'/.test(js)
    && /\$\('g-name'\)\.hidden = !needsName/.test(js));
  // ⚠⚠ The name is a label; the PIN is the credential. This runs on tablets
  //    children share.
  ck('the name is remembered per class code, and the PIN NEVER is',
    /psac_lib_name_/.test(js) && /The PIN is NEVER stored/.test(js)
    && !/setItem\([^)]*pin/i.test(js));
  ck('homework cards link to the guest runner and start nothing themselves',
    /'\/a\/' \+ encodeURIComponent/.test(js) && !/assignment-open/.test(js));
  ck('no score is rendered on a homework card',
    !/a\.score|a\.pct/.test(js) && /NO SCORE is shown, deliberately/.test(js));
  ck('to do is listed before finished, and never mixed in',
    /To do FIRST and never mixed in/.test(js));
  ck('…plus a search box', /id="q"/.test(page));
  ck('sorting offers newest, oldest and name',
    /data-sort="recent"/.test(page) && /data-sort="oldest"/.test(page) && /data-sort="title"/.test(page));
  // ⚠ Sorting a calendar is meaningless — the grid IS the order.
  ck('the sort row is hidden over the calendar AND the homework list',
    /\$\('sorts'\)\.classList\.toggle\('hidden', S\.view === 'calendar' \|\| S\.view === 'work'\)/.test(js));
  // A search box over homework would invite typing into something that does
  // not answer.
  ck('the search box is hidden over homework too',
    /\$\('q'\)\.parentNode\.classList\.toggle\('hidden', S\.view === 'work'\)/.test(js));

  ck('it reads the code from /m/<CODE> and from ?code=', /\\\/m\\\/\(\[A-Za-z0-9\]\{10\}\)/.test(js) && /URLSearchParams\(location\.search\)\.get\('code'\)/.test(js));
  ck('the view and sort are remembered per browser',
    /psac_lib_view/.test(js) && /psac_lib_sort/.test(js));
  ck('…behind try/catch, because storage can refuse',
    /catch \(_\) \{ \}\s*\n\s*return fallback/.test(js) || /function readStore[\s\S]{0,220}catch/.test(js));

  // ⚠ Dark mode: every token defined on bare :root FIRST. A colour whose only
  //   definition is inside a media query has no value in the other theme.
  ck('the light palette is defined on bare :root', /:root\{[\s\S]{0,400}--bg:#f6f7fb/.test(page));
  ck('…and dark only redefines it', /@media \(prefers-color-scheme: dark\)\{\s*:root\{/.test(page));
  ck('body paints its own background', /body\{[\s\S]{0,120}background:var\(--bg\)/.test(page));
  // ⚠ MEASURED, not read. A headless run at 360px found white-on-#8b8bf5 at
  //   roughly 2.6:1 in dark mode: --brand is lightened so it reads ON a dark
  //   ground, which leaves the text sitting on it unreadable.
  ck('the ink ON the brand flips with the brand',
    /--on-brand:#fff/.test(page) && /--on-brand:#12141d/.test(page));
  ck('…and the primary button and selected day both use it',
    /background:var\(--brand\);color:var\(--on-brand\)/.test(page)
    && /\.cal-cell\.has\.sel\{background:var\(--brand\);color:var\(--on-brand\)\}/.test(page));
  // ⚠ Seven columns in a 360px phone leave 41px per cell. aspect-ratio:1 made
  //   every one of them a sub-44px target — 31 of them, measured.
  ck('calendar cells clear 44px rather than being square',
    /\.cal-cell\{position:relative;min-height:44px/.test(page)
    && !/\.cal-cell\{[^}]*aspect-ratio/.test(page));
  ck('the sort chips clear 44px too', /\.sort-btn\{min-height:44px/.test(page));

  // ⚠ Escaping. Titles, descriptions and subjects are teacher-typed.
  ck('everything user-supplied goes through esc()',
    /esc\(m\.title\)/.test(js) && /esc\(m\.description\)/.test(js) && /esc\(m\.subject\)/.test(js));
  ck('esc() covers the quote character too', /replace\(\/"\/g, '&quot;'\)/.test(js));
  ck('the href is validated one last time before it reaches the DOM',
    /\^https\?:\\\/\\\/\/i\.test\(String\(m\.url/.test(js));
  // ⚠ Never a dead button.
  ck('a material with no usable URL says so instead of offering a tap',
    /not available right now/.test(js) && /class="dead"/.test(js));

  // ⚠ NO "Mark as done" here: that needs the PIN token this page never has.
  ck('there is no "mark as done" control on a page with no identity',
    !/fetch\([^)]*material-done/.test(js)
    && !/api\('\/api\/material-done/.test(js)
    && !/Mark as done'/.test(js)
    && /NO "Mark as done" here, deliberately/.test(js));
  ck('the page never claims the link expires',
    /does not expire/.test(js));
  ck('a wrong PIN is explained, and a lockout says to wait',
    /Wrong PIN/.test(js) && /wait a few minutes/.test(js));
  ck('an empty shelf explains itself rather than looking broken',
    /Nothing here yet/.test(js));
  ck('a dead code points at the teacher',
    /Class not found/.test(js) && /ask them for the new one/.test(js));
}

// ── 5 · the calendar ──────────────────────────────────────────────────────
section('the calendar view');
{
  ck('the week starts on Monday', /\(first\.getDay\(\) \+ 6\) % 7/.test(js));
  // ⚠ Local device day, matching the calendar squares in the main app — this
  //   grid answers "when did I see this appear", the reader's own question.
  ck('squares use the local device day, deliberately and with a reason',
    /Local device day, matching the calendar squares/.test(js));
  ck('only months that actually hold something can be paged to',
    /canPrev/.test(js) && /canNext/.test(js) && /disabled/.test(js));
  // ⚠ A day highlighted in September is not a day in October.
  ck('changing month clears the selected day',
    /S\.selDay = null;\s*\n\s*renderCalendar/.test(js));
  ck('a material with no date is listed, never dropped',
    /No date recorded/.test(js) && /dropping it would make the calendar quietly lie/.test(js));
  ck('a search that empties the month follows the results instead of stranding',
    /if \(S\.selDay && !byDay\.has\(S\.selDay\)\)/.test(js));
  ck('no panel at all when nothing is selected',
    /No panel at all when nothing is selected/.test(js));
  ck('days with nothing are not tappable', /: ' disabled'/.test(js));
  ck('a day with items carries a real label for a screen reader',
    /aria-label="' \+ esc\(d \+ ' — ' \+ list\.length/.test(js));
}

// ── 6 · routing, caching and deploy ───────────────────────────────────────
section('routing and caching');
{
  ck('/m/* rewrites to the page with status 200, keeping the URL',
    /from\s+= "\/m\/\*"[\s\S]{0,80}to\s+= "\/materials\.html"[\s\S]{0,40}status = 200/.test(toml));
  ck('the API route exists',
    /from\s+= "\/api\/materials-library"[\s\S]{0,120}functions\/materials-library"/.test(toml));
  // ⚠ A cache-first hit is the exact failure this feature exists to remove.
  ck('the service worker never serves /m/ from cache',
    /url\.pathname\.startsWith\('\/m\/'\)/.test(sw));
  ck('…nor the page or its script',
    /url\.pathname === '\/materials\.html'/.test(sw) && /url\.pathname === '\/materials\.js'/.test(sw));
  // ⚠ A CLI deploy uploads from local disk against an explicit list.
  ck('both files are staged for deploy',
    /'materials\.html'/.test(prep) && /'materials\.js'/.test(prep));
}

// ── 7 · the teacher's control ─────────────────────────────────────────────
section('the teacher control');
{
  ck('the panel is rendered above the upload form', /\$\{_libraryPanelHTML\(\)\}/.test(detail));
  ck('the code is loaded with the materials', /_loadLibraryCode\(_classId\)/.test(detail));
  ck("…using 'get', which never mints", /p_action: 'get'/.test(detail));
  ck('an un-migrated database leaves the panel empty rather than red',
    /if \(_libCode === null\) return '';/.test(detail));
  ck('the per-classroom code is cleared when another classroom opens',
    /_libCode = null;/.test(detail));

  ck('creating the link is an explicit tap', /createLibraryLink\(\)/.test(detail) && /Create the link/.test(detail));
  ck('all five actions are exported',
    /createLibraryLink, shareLibraryLink, copyLibraryLink, rotateLibraryLink, disableLibraryLink/.test(detail));
  // ⚠⚠ A WhatsApp message cannot be corrected once forwarded.
  ck('rotating is confirmed first', /confirm\('Create a new link for this class\?/.test(detail));
  ck('turning it off is confirmed first', /confirm\('Turn off the class library link\?/.test(detail));
  ck('…and both confirmations say the old link stops working',
    /will stop working/.test(detail) && /Library not found/.test(detail));
  ck('the panel warns before either destructive action is tapped',
    /stop every copy you have already sent from working/.test(detail));
  // ⚠ The panel has to say what the link exposes, in the teacher's terms.
  // ⚠ The link is NOT the credential — the PIN is — so the panel has to name
  //   the RIGHT one, or a whole class arrives unable to sign in.
  ck('the panel names the PIN a pupil brings, per classroom type',
    /_libPinLine/.test(detail)
    && /type the class PIN and their name/.test(detail)
    && /type their own four-digit PIN/.test(detail));
  ck('…read from the RPC, not guessed from the open classroom',
    /if \(data\.access_type\) _libAccess = data\.access_type/.test(detail));
  ck('the panel still says nobody sees anyone else\'s marks',
    /Nobody sees anyone else/.test(detail));
  // ⚠ A parent forwards this message; without this line thirty children think
  //   the link is broken.
  ck('the share message says a PIN is needed',
    /Sign in with the class PIN and your name/.test(detail)
    && /Sign in with your own four-digit PIN/.test(detail));
  ck('the url is escaped into the readonly input', /value="\$\{esc\(url\)\}"/.test(detail));
  ck('it is styled for the chalkboard', /\.tc-cd-lib \{/.test(css) && /rgba\(255,255,255,\.06\)/.test(css));
}

console.log('\n' + (fail ? 'FAILED' : 'PASSED') + ': ' + pass + ' checks passed, ' + fail + ' failed.');
process.exitCode = fail ? 1 : 0;
