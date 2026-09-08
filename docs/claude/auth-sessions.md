# Auth & sessions

> Part of the PSAC brief. Start at [`CLAUDE.md`](../../CLAUDE.md) — it carries the
> architecture, the rules that apply anywhere, and the index to these files.
> Read this before touching `auth.js`, the parent PIN, sessions or anything that sends email.
> Long-form history and how each rule was found: grep `ENGINEERING-NOTES.md`.

⚠ Nothing in any `.md` outranks the code or the live database. Measure, then edit.

---
## Auth & sessions

### Two credentials, two worlds
- **Adults** (parent/teacher/admin): a Supabase JWT, `auth.uid()`.
- **Children**: no JWT. A PIN → an opaque session token, stored **SHA-256-hashed**
  in `student_sessions` with an expiry, sent as `x-student-token`, resolved by
  Postgres `current_student_id()` and `netlify/lib/student-auth.js`.

⚠ **Fails closed with no service key.** The old check treated a missing key as
"skip", turning one config mistake into an open endpoint. A fail-closed change
must be paired with a check that its dependency is configured in the target
environment — that omission took the whole app down on the first CLI deploy.
⚠ Missing / expired / revoked all answer the same 401. A student **UUID is not a
credential** — it is permanent client state; only the token proves possession.
The questions auth cache is keyed on the **token**, not the student id, so
revocation actually takes effect. A 503 is never cached.

### ⚠ `x-student-token` must never touch `/auth/v1/`
It is not CORS-safelisted, so it turns the parent's token refresh into a
preflighted request GoTrue rejects — the parent's session then dies silently about
an hour later. `_sbIsAuthRequest()` (engine/supabase.js) is a **deny-list on the
auth path**, not an allow-list on `/rest/v1/`; an unparseable target is auth.

### ⚠ Email is a scarce, shared resource
Custom SMTP on Gmail (`smtp.gmail.com:465`, user and `smtp_admin_email` both
`psacpractice@gmail.com`, a Google **App Password** — Google has refused account
passwords over SMTP since 2022). `mailer_autoconfirm` is **OFF**;
`rate_limit_email_sent` is 30.
⚠ **Gmail's own ceiling is ~500 recipients/day, account-wide**, and no Supabase
setting raises it — that is the real limit. ⚠ `smtp_port` must be sent to the
Management API as a **string**. ⚠ `smtp_admin_email` must BE the Gmail account —
Gmail rewrites `From` to the authenticated user.
- **Password recovery has two routes and only one needs email.** A signed-in
  parent changes their password in Account & Settings with no email at all. A
  signed-out parent needs the reset link — so `admin-account-recovery.js` also
  takes `action:'set_password'`: the server sets a temporary password through the
  service role and returns it **once** to the admin, who passes it on out of band.
  ⚠ The password is in the response and **nowhere else** — not the log line, not
  the `security_events` row. ⚠ An admin may not set a **peer admin's** password
  unless super admin — that would be a straight privilege grab between equals.
  Every use writes `security_events kind='admin:password_set'`.
- ⚠ **The parent PIN can NEVER be a password-reset credential**, and a PIN-minted
  session may not change the password either. Letting four digits REPLACE the
  password they stand in for is the one move that turns a shoulder-surfing child
  into an account takeover. `Auth.isPinOnlySession()` refuses it in **both**
  password forms (auth.js and app.js — two hand-written copies of one action).
- ⚠ **`emailSignUp()` routes off the RESULT, never a stored assumption about the
  project's email setting**: `signUp()` returns a live session when
  `mailer_autoconfirm` is on and none when it sends a link, so the branch is
  `if (data?.session)` → gated handler, else the check-email screen. Hard-coding
  either strands every new parent the day that setting is flipped.
- ⚠ **Every sign-up, resend and reset spends ONE email from ONE shared quota.**
  `_emailErrorText()` separates `over_request_rate_limit` (the 60s per-address
  floor, the caller's own doing) from `over_email_send_rate_limit` (the
  project-wide cap, which no retrying clears) and leaves anything unrecognised
  with its ORIGINAL wording — an invented friendly message over an unknown fault
  is how a real bug becomes unreportable. `scripts/test-email-errors.js`.

### Who owns the device
A shared phone holds both sessions at once. `_markActiveMode()` records who most
recently signed in **on purpose** (a student PIN login, landing on the parent
dashboard, `exitParentMode()`). ⚠ **Never on a restore**, or every reload
re-crowns the parent — which is exactly the bug that threw the child into the
parent dashboard on every cold start. With no record, a stored **student** session
wins.
- `_isParentSession()` = `!!Auth.getParentProfile()` and **wins over
  `ACTIVE_STUDENT_ID`** — a parent previewing a child has that child's `DB`
  loaded, which once showed the parent the child's profile, streak and level and
  wrote the parent's theme into the child's saved progress.
- `switchToStudentSelect()` clears `_parentProfile` (so the kid-only screen guard
  does not bounce the child) but **keeps `_parentUser`** (so `onAuthStateChange`
  does not re-fire mid-session). ⚠ `_parentProfile = null` happens only **after**
  the PIN is accepted — clearing it first strands a parent who mistypes. Success
  is a `_handovers` counter, not "`_parentProfile` went away".
- ⚠ Anything checking "is a parent signed in" must accept **live session +
  `_parentUser` set + `_parentProfile` cleared** — the state the app deliberately
  creates. Getting this wrong locked parents out of their own dashboard.

### The parent PIN — two copies, not equivalent
- `localStorage` `psac_parent_pin_v1` = `btoa(pin + ':psac_v1')`. **Still base64,
  not a hash** — `atob()` gives the PIN straight back. A local convenience check,
  never proof of anything; `_backfillDbPinFromLocal()` moves legacy PINs to the server.
- `profiles.parent_pin_hash` = SHA-256 of `pin + ':psac_v1_db'`. **This one is the
  credential.** `profiles_select` is `id = auth.uid() OR is_admin()`.
- ⚠ **The DB copy is unreachable from the browser in exactly the case it was added
  for** — reading `profiles` needs `auth.uid()`, which is what is missing when the
  session is dead. So a **local miss is not a verdict** (a cleared localStorage,
  another browser profile or a PIN set on a different device all left a CORRECT
  PIN failing against nothing): `_submitParentPin()` falls through to the server,
  and only a refusal from **there** shakes the pad. Offline is the exception —
  nothing to ask, so a miss stays a miss.
- All copy says **"in this browser"**, not "on this device" — localStorage is per
  origin + browser profile, so a preview URL, another browser, a private window or
  Safari's 7-day eviction all lose it. `openParentPinSetup()` (Account & Settings →
  Security) is the unguarded entry; `_promptSetParentPin()` keeps its once-only
  first-run guard.

### Server-side PIN sign-in — `netlify/functions/parent-pin-signin.js`
`POST /api/parent-pin-signin {user_id, pin}` → service role verifies against
`profiles.parent_pin_hash`, mints a session with
`admin.generateLink({type:'magiclink'})` → `verifyOtp({token_hash})`, returns
**only** `access_token` + `refresh_token`; the browser installs it with `setSession()`.
- ⚠ **`generateLink` GENERATES; it does not send.** Load-bearing, given the email
  quota. **Re-verify after deploy.**
- ⚠ **Every kind of "no" answers the SAME 401 `invalid`** — no profile, no PIN on
  file, disabled, closed, an admin, a wrong PIN, a malformed id. Any difference is
  an account-enumeration oracle; the branches exist only for the server log.
- ⚠ **An admin can never be entered by PIN.** Four digits in front of `is_admin()`
  is not a trade this project makes.
- ⚠ **The lockout is the only thing between 10,000 guesses and a parent account.**
  5 wrong → a lockout, **each twice the last** (15m, 30m, 1h, 2h … capped at 24h),
  counted in `parent_pin_attempts`, which has **no grant to anon or authenticated
  at all**. Deliberately NOT a column on `profiles`: `profiles_update` lets a
  parent update their own row with no column restriction, so a counter there could
  be zeroed by the very session an attacker is trying to obtain. A per-IP burst
  cap sits in front, best-effort (module scope, one Lambda container).
- ⚠ A mint failure is **503, never 401** — telling a parent their correct PIN was
  wrong is how an evening is spent retyping four right digits.
- ⚠ The salt `:psac_v1_db` is **hand-copied** into `engine/auth.js`
  (`_hashPinForDb`); drift means a stored PIN silently stops matching with no
  error anywhere. The test asserts both literals.
- ⚠ `psac_parent_uid_v1` is a **separate** localStorage key from the session stash
  and is never cleared with it — the stash holds a refresh token that can
  legitimately die; this holds only WHICH parent this browser belongs to, which
  stays true afterwards. It is not a credential.
- Tests: `test-parent-pin-signin.js`, `test-parent-pin-recovery.js`.

⚠ **A correct PIN must never dead-end on "your sign-in expired".** The PIN cannot
mint a session, but a **refresh token** can — and supabase-js deletes its own
persisted one the first time a refresh fails (a tunnel, a sleeping phone), which
is indistinguishable from a revoked session. `_ensureParentSession()` escalates:
read → re-read (still restoring) → `refreshSession()` →
**`refreshSession({refresh_token})` from our own copy** in `psac_parent_sess_v1`
→ the server (`_pinServerSignIn`).
- ⚠ Step 4 runs **only last and only once** — replaying a rotated-out token can
  revoke the whole family server-side. The stash is rewritten on every auth event,
  because rotation makes a stale copy worse than none.
- ⚠ **Only a refusal drops the stash.** Dropping it on ANY failure meant one 502 or
  one captive portal disarmed the recovery permanently. `_isTokenRefusal()` calls
  400/401/403 a verdict, 5xx/429/408 the network, and falls back to the message.
  Erring towards KEEPING it is the safe direction: replaying a dead token costs one
  refused request; dropping a live one costs the parent their account on this device.
- ⚠ The stash is cleared **only on a deliberate sign-out**, never in the
  `SIGNED_OUT` handler — supabase-js emits that for a dropped refresh too, which is
  the exact case being recovered from.
- ⚠ A successful re-mint **emits `SIGNED_IN`**, so `_suppressAuthEvents` keeps
  `onAuthStateChange` out of the routing the caller is awaiting. Scoped to **that
  arm only** — `SIGNED_OUT` is always honoured.
- ⚠ **Offline is not "signed out"** — the ladder stops at the first read and the
  copy says so; the token may be good and merely unverifiable.
- ⚠ **`session-invalid` is not always the CHILD's session** — `_activeAccount` is
  set for a parent previewing a child, whose writes go through the parent's JWT.
  That path renews the parent in place and says nothing rather than dropping the
  child onto the PIN screen; `_parentProfile` is the discriminator.
- `init()` consults the stash, gated on it existing so a first-time visitor makes
  no network call — otherwise the same lapse logged a parent out on a plain reload.

### Other session rules
- Every fresh student PIN login bumps `session_version`; a 5-minute guard logs out
  a mismatch ("account accessed on another device"). `pdSwitchStudent` passes
  `bumpSession: false`.
- One-tap child login links: `?join=<token>`, 32 random bytes, **single use**,
  48 h, **SHA-256 stored only**, and **never carrying the PIN** (a PIN never
  expires, so a forwarded screenshot would be a permanent key). `_tryJoinLink()`
  runs before every routing decision and signs out any parent session first.
- `psac_known_students` (cap 8) remembers family name + username per child.
  ⚠ **Never the PIN.** Fields are *hidden, not emptied* — `checkStudentReady()` /
  `studentSignIn()` still read them.
- ⚠ **A parent previewing a child is NOT a student login.** `pdSwitchStudent()`
  reaches `_loginStudentRow()` with **no token**; that path must not persist a
  student session or stamp `_markActiveMode('student')` — a tokenless session is a
  credential nobody can use, and the next reload answered "Please sign in again to
  continue." on **every** refresh. Routing reads a tokenless stored session as
  **absent** (`_storedStudentSession()`), which also heals poisoned installs.
- The student-switch PIN pad holds **no auth logic** — same three fields, same
  `studentSignIn()`. ⚠ `_showAuthError()` is routed into the modal while it is
  open, or the wrong-PIN message is written to a screen nobody can see.
- Referrals: `?ref=CODE` captured before routing. `referral_code` (public, for
  WhatsApp) is deliberately **not** `families.family_code` (private join secret).
- ⚠ **Forum ownership is `author_id`, never the display NAME.** `canDel` compared
  names, which gave two same-named parents a delete button on each other's posts
  (the database refused, so the button was a lie) and gave an **admin** none —
  while `posts_delete`/`replies_delete` have allowed `is_admin()` all along. Being
  an admin is a property of the ACCOUNT, not of which screen they are on, so
  `Auth.isAdmin()` applies in the ordinary parent view too. ⚠ 41 of 42 live forum
  rows have `author_id = NULL` (written before the trigger), so `is_admin()` is
  the only way they can ever be removed.
- **The forum is adults-only in the database** (`auth.uid() IS NOT NULL`), not by
  hiding the button. A child session is anon and is excluded by construction;
  `_ADULT_ONLY_SCREENS` in `showScreen()` covers every route in.
