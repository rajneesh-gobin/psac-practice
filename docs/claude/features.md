# Feature areas — landing page, games, teacher mode, timetable, materials, contact, sharing

## Points, levels and the leaderboard
Points are **minted in the database**, never in the browser
(`migrations/20260909_points_and_leaderboard.sql`). `DB.xp` still exists and is
still drawn in the header chip, but it is now a **cache** of `student_points`, not
the score. The whole design follows from one fact: a friends leaderboard among 20
children a child chose tolerates a client-written number; a **global** one does
not, and `get_my_friends()` was reading `data->>'xp'` — a value any child can set
from devtools in five seconds.

| Earns | Worth | Paid once per | Cap |
|---|---|---|---|
| a question answered correctly | its `questions.difficulty`, 1–4 | question, **ever** | — |
| a finished game run | 5 | run | 3 a day, **across all games** |
| a planned timetable session done | 10 | `schedule_entries.id` | 3 a day |
| a new friend | 25, **both children** | pair, **ever** | 10 pairs, lifetime |
| old XP carried forward | as it stood | `kind='legacy', ref='v1'` | once |

- ⚠ **The ledger `student_point_events` IS the anti-abuse mechanism**, not a log.
  `UNIQUE (student_id, kind, ref)` is the only thing making any "once" true.
- ⚠ **A friendship's points survive unfriending.** `remove_friend()` deletes the
  `student_friends` row and deliberately **not** the ledger row, so delete-and-
  re-invite pays 0. Two more guards, because "once per pair" alone still allows 20
  accounts made this afternoon: the other account must be **24h old**, and only
  **10 pairs** ever pay against a 20-friend ceiling.
- ⚠ **The client never sends an amount.** `award_activity_points(kind, ref)` looks
  the value up server-side, so there is no number to inflate, and `'question'` /
  `'friend'` / `'legacy'` are refused from it as `unknown_kind`.
- ⚠ **Difficulty comes from the `questions.difficulty` COLUMN**, not from the
  question the client just answered. An id the server does not know pays the
  **floor of 1**, never the maximum — generators and projected `task` items produce
  ids that were never imported, and paying an unknown id well is what would make
  "invent an id" a strategy. (Measured: 194 of 33,832 bundle rows carry no
  difficulty, and all 194 are past papers, which are never gradable.)
- ⚠ **Paying on first CORRECT, not on first ATTEMPT** — a child who gets it wrong,
  learns it and comes back is paid in full. That is the app.
- ⚠ **Game answers still never reach `recordAnswer()` / `_recordDaily()`.** The
  award is a lump in `_awardRun()` at the end of a run, so a replay still cannot
  distort the mastery reporting parents rely on.
- ⚠ **The timetable award fires on RENDER, because there is no completion event** —
  a session reads as done when its chapter was practised today. Safe only because
  the ledger makes every repeat free.
- ⚠ **The leaderboard carries a name, an avatar, a grade and a score, and nothing
  else** — no id, no `friend_code`. It is a public surface showing children who
  have never met. It also filters to **one grade** by default and hides anyone on
  0 points.
- ⚠ **The level curve is written TWICE** — `POINTS_THRESHOLDS` in `engine/app.js`
  and `points_level()` in SQL. `scripts/test-points-levels.js` fails on a
  one-point drift. Twelve levels, top at 13,000; a full grade answered once is
  ~9,600 points, so Level 10 is "finished your grade".
- Tests: `scripts/sql-tests/run-points-tests.sh` (51 assertions against a real
  postgres, run as `anon` with a genuine `x-student-token`) and
  `scripts/test-points-levels.js`.

### The global leaderboard screen (`screen-leaderboard`)
⚠ **OFF BY DEFAULT, and the switch is in the database.** `leaderboard_enabled()`
reads `global_settings.leaderboard_enabled`, which **coalesces to `false`** — an
older blob with no such key reads as off, and so does a failed read on the client
(`Store.leaderboardEnabled()` returns `false`, never `true`, on error).
- **Admin › Content → 🌍 Global Leaderboard** is the only way to turn it on, and
  turning it *on* asks for confirmation naming exactly what becomes visible. This
  is a safeguarding decision, not a feature flag: it makes every child's display
  name and score visible to every other child in the app.
- ⚠ **Hiding `#dash-global-lb` is presentation; the enforcement is that
  `get_points_leaderboard()` returns no rows to anybody while the switch is off**,
  and `get_my_points_rank()` answers `leaderboard_disabled` — a *distinct* error
  from "you are last", because the client has to tell those apart.
- ⚠ **This is the only screen that renders text written by another family.**
  Every name and avatar goes through `_attr()`. `scripts/test-global-leaderboard.js`
  drives a `<img src=x onerror=…>` display name through the real renderer in real
  Chrome and fails if it executes — verified to fail when `_attr()` is removed.
- The RPC returns name · avatar · grade · level · points and **no id, no
  `friend_code`**, so nothing on the board lets one child reach another.
- Defaults to **the child's own grade**, with an "All grades" tab. A Grade 4 child
  ranked against Grade 9 is not a competition.
- `null` from the fetch is a **failed read** and says so; `[]` is a real empty
  board. Conflating them would draw "be the first!" over a network blip.



> Part of the PSAC brief. Start at [`CLAUDE.md`](../../CLAUDE.md) — it carries the
> architecture, the rules that apply anywhere, and the index to these files.
> Read the relevant part before changing one of these surfaces.
> Long-form history and how each rule was found: grep `ENGINEERING-NOTES.md`.

⚠ Nothing in any `.md` outranks the code or the live database. Measure, then edit.

---
## The landing page (`#screen-landing`, index.html)
The public front door, and the only screen most visitors ever see. Order: nav →
under-construction banner → hero → measured stats strip → **How we teach** →
subjects → what we offer → Game Zone → three ways in → free-while-we-build panel
→ 3 steps → tutors → footer.
- ⚠ **PRICING IS HIDDEN, NOT DELETED.** The three priced tiers at `#plans` were
  replaced by an "everything is free right now" panel; the nav Pricing link and
  `#pd-upgrade-btn` are gone/hidden. `modal-plans`, `Store.listPlans()`,
  `purchase_*()` and the admin Plans tab all still work — restoring it is markup.
  `#plans` is kept as the section id so old anchors still land somewhere sensible.
- ⚠ **"How we teach" is the product's actual claim**, not decoration: many simple
  questions covering the WHOLE syllabus beat a handful of very hard ones;
  difficulty rises Basic → Medium → Hard → Word Problems where harder means
  *applied*, never obscure. It is why the subsection split and the 4-level scale
  exist at all.
- ⚠ **Every number on this page is measured and goes stale silently.** The stats
  strip carries a comment saying how to re-count. (The page claimed "five learning
  games" in three places for two days after the seventh shipped.)
- ⚠ Under 640px every `[data-carousel]` grid becomes a horizontal scroll-snap
  track with dots — **an overflow detector that does not stop at a scrolling
  ancestor reports every card as protruding**; they are off-screen by design.
- ⚠ Contrast here was the worst in the app (footer disclaimer at 1.65:1). The
  colour is usually on an **ANCESTOR** (the `<footer>`, not the `<p>`), and every
  card is translucent white over a gradient with no opaque background anywhere —
  a naive probe reads `rgba(255,255,255,.05)` as the ground and reports 1:1.
  Composite the layers over each gradient stop and take the worst.
- Carousel dots are 16×44px via `padding` + `background-clip: content-box` (+
  explicit `box-sizing: content-box`, or Tailwind preflight eats the padding).

---

## The Game Zone (minigames)
`engine/minigame.js`, reached from `#dash-games-tile` / `#screen-minigames`. Seven
live games: **Who Wants to Be a Billionaire?** 💰 (20-rung prize ladder; Q1–10 the
child's grade easy→medium, Q11–15 hardest textbook, **Q16–20 general knowledge**
from `minigame_gk.js`; 4 lifelines, safe havens at 5/10/15; synthesised WebAudio —
**no audio files, no copyright** — and a distinct name and look on purpose, no show
logo/music/wording) · **Quick Fire** ⚡ (60s blitz, combo ×1–5) · **Word Builder**
🧩 (`minigame_words.js`; ⚠ a clue must never contain its own word, and words are
A–Z only because the tiles are letters) · **Island Explorer** 🗺️
(`minigame_geo.js`; ⚠ every fact real and verifiable; two wrongs and the tour
**continues** — a child always finishes the trip) · **Number Ninja** 🥷 (7 belts ×
5 sums, **GENERATED** per belt, never drawn from the bank) · **Brain Battle** ⚔️
(pass-the-phone; both players drawn from the **same difficulty band** but never the
same question — the second would inherit the answer — and a resume always lands on
the handover, never mid-question) · **Time Traveller** 🕰️ (`minigame_time.js`;
⚠ a label must never contain a 3+ digit number, and never two same-year events in
one round, whose order would be unknowable).
- ⚠ **Game answers NEVER call `recordAnswer()` / `_recordDaily()`.** A replay must
  not distort the mastery, mistake and daily reporting parents rely on. Bests live
  in `DB.games.*` (seeded in `Store._defaultStudent`, so existing children backfill
  for free). In-progress games persist to sessionStorage per student.
- The hub's four `mg-card-soon` teasers each have a **full design-intent comment
  block above `renderHub()`** — read it before building one.
- ⚠ **Confetti is `launchConfetti(count)` (app.js), NOT the canvas-confetti
  `confetti({...})` API** — that library is not loaded, and a `typeof` guard made
  every burst silently no-op.
- **Ask the Crowd** — `minigame_polls` + three RPCs (granted `anon, authenticated`);
  the child shares `/v/<CODE>` (`vote.html`, standalone like `guest.html`).
  ⚠ **The CORRECT ANSWER IS NEVER STORED** — the row holds question + options only.
  The table FKs `students(id) ON DELETE CASCADE`.
- **Score sharing** — `navigator.share`, preferring a canvas-rendered 1080×1080 PNG
  where `navigator.canShare({files})` allows, else intent links or clipboard;
  `score.html?s=&c=&a=`. ⚠ **A share carries a score and a challenge — never the
  child's name, id, or any profile link.**
- **Gates**: `DB.restrictions.minigamesDisabled` (parent toggle;
  `MiniGames.syncTile()` hides the tile live) and `_PLAN_GATED_SCREENS.minigames`.
  An excluded games tile **hides rather than teasing** the child.
- Tests: `test-minigame-arcade.js`, `test-number-ninja.js`, `test-brain-battle.js`,
  `test-time-traveller.js`.

## Email — one transport, one preference model
Built 2026-09-16. ⚠ **Before it, the app could not send a single email.** The
three handlers that tried (`notify.js`, `weekly-digest.js`,
`teacher-approved-email.js`) each called **MailChannels**, whose free Cloudflare
Workers relay shut in 2024, and the deployed Worker carried **no mail credential
at all** — measured on the live Worker's bindings, which held exactly one secret
(`SUPABASE_SERVICE_ROLE_KEY`). Each failed differently and silently.
- **`workers/lib/mailer.js` is the only place mail is sent from.** Transport is
  **Resend** over HTTPS — Workers cannot open a raw socket, so SMTP is not an
  option here. Secrets: `RESEND_API_KEY`, `MAIL_FROM`, `SITE_URL`, `CRON_SECRET`.
- ⚠ **TWO From addresses, and which one is not cosmetic.** `mailFrom()` —
  `noreply@nouklass.com` — is for mail a MACHINE sent: a digest, a homework
  notice, an activation. `mailFromHuman()` — `admin@nouklass.com`, overridable
  with `MAIL_FROM_HUMAN` — is for mail a PERSON wrote, which today is the admin
  broadcast alone. A message inviting a reply must not arrive from an address
  named "noreply", and `admin@` is routed to a real inbox, so it also rescues a
  reply from a client that ignores `Reply-To`. Both are at the same verified
  Resend domain, so neither needs a DNS change; an unverified one is refused
  outright with "domain is not verified".
- ⚠ **`sendMail()`'s stand-in `To:` must be the From that was ACTUALLY used.**
  A pure-Bcc message needs a To header, and printing `noreply@` in the To of a
  message sent from `admin@` is precisely the mismatch a spam filter scores on.
- ⚠ **This is a SECOND sender and does not touch the Gmail quota.** Supabase Auth
  mail (sign-up, reset) still goes through `smtp.gmail.com` and still spends that
  shared ~500/day ceiling. Two senders, two limits — see
  [auth-sessions.md](auth-sessions.md).
- ⚠ **A mail failure never fails the thing the mail announced.** `sendMail()`
  never throws and returns the REAL reason — "domain not verified" and "bad key"
  are one HTTP status apart and need completely different fixes. An invented
  friendly message is how a real fault becomes unreportable.
- **Preferences live in `profiles.preferences.email`** — `{ enabled, digest:
  weekly|fortnightly|monthly|off, announcements, homework, last_digest_at }`.
- ⚠ **The card that sets them is shown to EVERY signed-in adult**, not only a
  parent with a family. It was `family ? … : ''`, so a teacher — who has no
  family row — had no email settings at all, while the admin broadcast selects
  teachers from its own Teachers tab and that message's footer tells the reader
  to switch these off under Account & Settings → Notifications. **A screen that
  does not exist is not an opt-out**, and `announcements` defaults to ON. The
  rows that are ABOUT CHILDREN (progress report, homework results, the study
  reminder) stay behind `family`/`children`: a teacher has none to report on.
  Guarded by `scripts/test-email-preferences.js`.
  ⚠ **`enabled:false` is the master switch and beats every per-kind flag.**
  ⚠ **An unknown frequency reads as `off`** — a typo or a value from a future
  version must never be treated as "send".
  ⚠ **The legacy `weekly_digest` boolean still counts**: an explicit `false`
  there is a parent who has ALREADY opted out, and the new shape must not
  quietly re-subscribe them. The Settings screen writes both.
- ⚠ **Frequency is enforced by `last_digest_at`, not by the cron expression.**
  The cron runs weekly; fortnightly and monthly exist only because `digestDue()`
  says no on the weeks between. It carries **one day of slack**, or a cron three
  minutes late pushes a fortnightly parent out by another fortnight, then
  another. `last_digest_at` is written **only after a successful send**.
- ⚠ **`/api/weekly-digest` used to be an open POST that mailed every parent.**
  Harmless while the transport was dead; the moment one works it is a mailing
  gun pointed at the whole user base. It now needs `x-cron-secret` or an admin
  JWT. The Cloudflare `scheduled()` entry point needs neither.
- ⚠ **There were NO cron triggers on the deployed Worker**, so
  `assignment-cleanup`, `classroom-purge` and `weekly-digest` had never run once
  since the Netlify migration — `workers/index.js` had the handler and the
  dispatch table and nothing ever called it. `wrangler.toml` now declares them,
  and the strings must match `scheduled()` **exactly**: it dispatches by
  comparing `event.cron`.
- **Unsubscribe** is `/api/email-prefs`, an HMAC of (user id + scope) under the
  service-role key. ⚠ **No sign-in, deliberately** — a parent must be able to
  stop mail from the phone in their hand. It can only turn a preference **off**,
  never on, and reads nothing back. ⚠ **A GET only shows the page**, because
  Gmail and Outlook prefetch links in mail; the POST makes the change.
- Tests: `scripts/test-email-preferences.js` (93 checks, including the
  client/server agreement below).

## Admin › Write a new email — free-form, from `admin@nouklass.com`
`workers/api/admin-compose.js` · `POST /api/admin-compose` · Members tab →
**✍️ Write a new email** · `AdminPanel.openCompose()`.

⚠ **`admin@nouklass.com` is a Cloudflare Email Routing FORWARDER.** It has no
mailbox, so nothing can be composed *from* it in a mail client — replies to a
parent went out from a personal Gmail instead, a different sender from every
automated message that family had ever had from us. Resend already sends as that
address (`mailFromHuman()`, same verified domain, no DNS change), so this form is
the missing half. There is still **no Sent folder**, which is why the copy-to-self
below is not a nicety.

| | Email selected (broadcast) | Write a new email (compose) |
|---|---|---|
| Recipients | members, picked by **id** | any address, **typed** |
| Cap | 500 | **20** |
| Budget | bulk | **transactional** (`bulk: false`) |
| Announcements off | skipped | sent, **reported** |
| All email off (`enabled:false`) | skipped | **refused** unless essential |
| Unsubscribe link | yes | no — it is correspondence |

- ⚠ **This is the ONE endpoint where the browser supplies the addresses.** The
  broadcast’s rule — the browser only ever sends ids and never sees an address —
  cannot apply to writing to someone who may have no account. That is why it is a
  separate handler and not a flag on the broadcast, and why the cap is small: a
  low cap is what stops it becoming an un-opt-outable newsletter.
- ⚠ **One recipient → `To`; two or more → `Bcc`, always.** Putting four parents
  in a visible To hands each of them the other three addresses and cannot be
  undone once sent.
- ⚠ **One malformed address fails the WHOLE send.** Delivering to four of five
  and mentioning the fifth in small print is how a message goes out twice: the
  admin fixes the typo and presses Send again.
- ⚠ **`enabled: false` is a refusal; `announcements: false` is only a warning.**
  "Send me nothing" is the master switch and is honoured here too (the essential
  tick is the documented override); "no newsletters" is not a request to be
  un-repliable, and a direct reply is not a newsletter.
- ⚠ **The copy-to-self is a SEPARATE message, not a Bcc of the original.** A Bcc
  copy cannot say who else received it — which is the one thing the operator needs
  from it, since a Bcc list is invisible by design and the sending address has no
  Sent folder. It is counted against the budget, because it is a real email.
- ⚠ **The audit row must not become an address book.** `logAdminAction()`’s rule is
  ids, never addresses, and a typed address often has no id — so `compose_sent`
  records the id where there is one and the **domain + a count** otherwise. The
  exact list lives in the admin’s own copy of the message, which is where a list
  of addresses belongs.
- ⚠ **The sending admin’s own address is never put on the message**, in either
  header — same rule as the broadcast. Who pressed Send is in `admin_actions`.
- ⚠ **`normaliseBody()` / `bodyToHtml()` live in `workers/lib/mailer.js`**, not in
  either handler. They used to sit in `admin-broadcast.js`; a second copy of "what
  an admin’s paste looks like as email" is exactly the duplication that drifts.
  ⚠ `test-email-preferences.js` asserted the escaping with a regex against the
  broadcast file and went red on the move — it now checks the wiring there and the
  behaviour in the helper.
- Tests: `scripts/test-admin-compose.js` (34 checks; drives the real handler with
  the real mailer and only `sendMail` spied, so nothing is delivered).

## Admin › group email (Bcc)
Members tab: tick accounts (selection survives paging and filtering), or *Add
everyone matching these filters*, then **✉️ Email selected**.
- ⚠ **Bcc is the only mode, and the addresses never reach the browser.** The
  admin selects **ids**; `workers/api/admin-broadcast.js` resolves them with the
  service role. A To: list of 200 parent addresses is a data breach dressed as a
  newsletter and is one wrong click away in any mail client.
- ⚠ **It skips anyone who has switched announcements off**, unless the admin
  ticks **Essential notice** — account, billing or safety only, the one category
  a recipient cannot opt out of.
- **Who would get this?** runs the whole thing as a dry run and reports the split
  (would send / opted out / no address / deleted) without sending anything.
- ⚠ **The body is NORMALISED before either part is built** (`normaliseBody()`).
  An admin composes elsewhere and pastes, so what arrives carries the SENDER'S
  layout — indents, a trailing space per line, stray blank lines — and
  `bodyToHtml()` turns every newline into a `<br>`, delivering all of it
  verbatim. Worse, `
` was never normalised, so `/
{2,}/` never matched a
  WINDOWS paste and **every paragraph break was lost**: the whole message
  arrived as one blob of `<br>`s. Line breaks the admin meant are kept — a
  signature block survives — and runs of blank lines collapse to one paragraph.
- ⚠ **Chunked at 500 ids per request and 50 recipients per message** (Resend's
  cap), and a partial failure reports what DID go out. "It failed" after 600
  delivered emails is the worst possible answer.
- The body is plain text, escaped before it reaches the template. **From and
  Reply-To are both `admin@nouklass.com`** — `mailFromHuman()` / `mailReplyTo()`,
  not the `noreply@` every automated message uses. Cloudflare Email Routing
  forwards that address to a real inbox, so a reply arrives whether the client
  honours Reply-To or answers the From.
- ⚠ **The sending admin's own address is never put on the message.** It was the
  `reply_to` until 2026-09-17 (`gate.caller.email`), which handed every parent
  the personal address of whoever pressed Send and made where a reply landed
  depend on which admin account was signed in. Who sent it is recorded in the
  Worker's console line and in the `admin_actions` row below — an audit trail,
  not a header.
  `scripts/test-broadcast-envelope.js` runs the real handler with Resend stubbed
  and asserts the whole payload, not just the two header fields: the address
  must not ride along in the body or the stand-in `To` either.
- ⚠ **The audit row is written by the SERVER — and until 2026-09-18 it was
  written by nobody.** `engine/admin.js` logged each send itself with
  `p_action: 'admin:broadcast'`, a name `admin_log_action()` refuses as
  `bad_action` because it must match `^[a-z][a-z_]{2,39}# Feature areas — landing page, games, teacher mode, timetable, materials, contact, sharing

## Points, levels and the leaderboard
Points are **minted in the database**, never in the browser
(`migrations/20260909_points_and_leaderboard.sql`). `DB.xp` still exists and is
still drawn in the header chip, but it is now a **cache** of `student_points`, not
the score. The whole design follows from one fact: a friends leaderboard among 20
children a child chose tolerates a client-written number; a **global** one does
not, and `get_my_friends()` was reading `data->>'xp'` — a value any child can set
from devtools in five seconds.

| Earns | Worth | Paid once per | Cap |
|---|---|---|---|
| a question answered correctly | its `questions.difficulty`, 1–4 | question, **ever** | — |
| a finished game run | 5 | run | 3 a day, **across all games** |
| a planned timetable session done | 10 | `schedule_entries.id` | 3 a day |
| a new friend | 25, **both children** | pair, **ever** | 10 pairs, lifetime |
| old XP carried forward | as it stood | `kind='legacy', ref='v1'` | once |

- ⚠ **The ledger `student_point_events` IS the anti-abuse mechanism**, not a log.
  `UNIQUE (student_id, kind, ref)` is the only thing making any "once" true.
- ⚠ **A friendship's points survive unfriending.** `remove_friend()` deletes the
  `student_friends` row and deliberately **not** the ledger row, so delete-and-
  re-invite pays 0. Two more guards, because "once per pair" alone still allows 20
  accounts made this afternoon: the other account must be **24h old**, and only
  **10 pairs** ever pay against a 20-friend ceiling.
- ⚠ **The client never sends an amount.** `award_activity_points(kind, ref)` looks
  the value up server-side, so there is no number to inflate, and `'question'` /
  `'friend'` / `'legacy'` are refused from it as `unknown_kind`.
- ⚠ **Difficulty comes from the `questions.difficulty` COLUMN**, not from the
  question the client just answered. An id the server does not know pays the
  **floor of 1**, never the maximum — generators and projected `task` items produce
  ids that were never imported, and paying an unknown id well is what would make
  "invent an id" a strategy. (Measured: 194 of 33,832 bundle rows carry no
  difficulty, and all 194 are past papers, which are never gradable.)
- ⚠ **Paying on first CORRECT, not on first ATTEMPT** — a child who gets it wrong,
  learns it and comes back is paid in full. That is the app.
- ⚠ **Game answers still never reach `recordAnswer()` / `_recordDaily()`.** The
  award is a lump in `_awardRun()` at the end of a run, so a replay still cannot
  distort the mastery reporting parents rely on.
- ⚠ **The timetable award fires on RENDER, because there is no completion event** —
  a session reads as done when its chapter was practised today. Safe only because
  the ledger makes every repeat free.
- ⚠ **The leaderboard carries a name, an avatar, a grade and a score, and nothing
  else** — no id, no `friend_code`. It is a public surface showing children who
  have never met. It also filters to **one grade** by default and hides anyone on
  0 points.
- ⚠ **The level curve is written TWICE** — `POINTS_THRESHOLDS` in `engine/app.js`
  and `points_level()` in SQL. `scripts/test-points-levels.js` fails on a
  one-point drift. Twelve levels, top at 13,000; a full grade answered once is
  ~9,600 points, so Level 10 is "finished your grade".
- Tests: `scripts/sql-tests/run-points-tests.sh` (51 assertions against a real
  postgres, run as `anon` with a genuine `x-student-token`) and
  `scripts/test-points-levels.js`.

### The global leaderboard screen (`screen-leaderboard`)
⚠ **OFF BY DEFAULT, and the switch is in the database.** `leaderboard_enabled()`
reads `global_settings.leaderboard_enabled`, which **coalesces to `false`** — an
older blob with no such key reads as off, and so does a failed read on the client
(`Store.leaderboardEnabled()` returns `false`, never `true`, on error).
- **Admin › Content → 🌍 Global Leaderboard** is the only way to turn it on, and
  turning it *on* asks for confirmation naming exactly what becomes visible. This
  is a safeguarding decision, not a feature flag: it makes every child's display
  name and score visible to every other child in the app.
- ⚠ **Hiding `#dash-global-lb` is presentation; the enforcement is that
  `get_points_leaderboard()` returns no rows to anybody while the switch is off**,
  and `get_my_points_rank()` answers `leaderboard_disabled` — a *distinct* error
  from "you are last", because the client has to tell those apart.
- ⚠ **This is the only screen that renders text written by another family.**
  Every name and avatar goes through `_attr()`. `scripts/test-global-leaderboard.js`
  drives a `<img src=x onerror=…>` display name through the real renderer in real
  Chrome and fails if it executes — verified to fail when `_attr()` is removed.
- The RPC returns name · avatar · grade · level · points and **no id, no
  `friend_code`**, so nothing on the board lets one child reach another.
- Defaults to **the child's own grade**, with an "All grades" tab. A Grade 4 child
  ranked against Grade 9 is not a competition.
- `null` from the fetch is a **failed read** and says so; `[]` is a real empty
  board. Conflating them would draw "be the first!" over a network blip.



> Part of the PSAC brief. Start at [`CLAUDE.md`](../../CLAUDE.md) — it carries the
> architecture, the rules that apply anywhere, and the index to these files.
> Read the relevant part before changing one of these surfaces.
> Long-form history and how each rule was found: grep `ENGINEERING-NOTES.md`.

⚠ Nothing in any `.md` outranks the code or the live database. Measure, then edit.

---
## The landing page (`#screen-landing`, index.html)
The public front door, and the only screen most visitors ever see. Order: nav →
under-construction banner → hero → measured stats strip → **How we teach** →
subjects → what we offer → Game Zone → three ways in → free-while-we-build panel
→ 3 steps → tutors → footer.
- ⚠ **PRICING IS HIDDEN, NOT DELETED.** The three priced tiers at `#plans` were
  replaced by an "everything is free right now" panel; the nav Pricing link and
  `#pd-upgrade-btn` are gone/hidden. `modal-plans`, `Store.listPlans()`,
  `purchase_*()` and the admin Plans tab all still work — restoring it is markup.
  `#plans` is kept as the section id so old anchors still land somewhere sensible.
- ⚠ **"How we teach" is the product's actual claim**, not decoration: many simple
  questions covering the WHOLE syllabus beat a handful of very hard ones;
  difficulty rises Basic → Medium → Hard → Word Problems where harder means
  *applied*, never obscure. It is why the subsection split and the 4-level scale
  exist at all.
- ⚠ **Every number on this page is measured and goes stale silently.** The stats
  strip carries a comment saying how to re-count. (The page claimed "five learning
  games" in three places for two days after the seventh shipped.)
- ⚠ Under 640px every `[data-carousel]` grid becomes a horizontal scroll-snap
  track with dots — **an overflow detector that does not stop at a scrolling
  ancestor reports every card as protruding**; they are off-screen by design.
- ⚠ Contrast here was the worst in the app (footer disclaimer at 1.65:1). The
  colour is usually on an **ANCESTOR** (the `<footer>`, not the `<p>`), and every
  card is translucent white over a gradient with no opaque background anywhere —
  a naive probe reads `rgba(255,255,255,.05)` as the ground and reports 1:1.
  Composite the layers over each gradient stop and take the worst.
- Carousel dots are 16×44px via `padding` + `background-clip: content-box` (+
  explicit `box-sizing: content-box`, or Tailwind preflight eats the padding).

---

## The Game Zone (minigames)
`engine/minigame.js`, reached from `#dash-games-tile` / `#screen-minigames`. Seven
live games: **Who Wants to Be a Billionaire?** 💰 (20-rung prize ladder; Q1–10 the
child's grade easy→medium, Q11–15 hardest textbook, **Q16–20 general knowledge**
from `minigame_gk.js`; 4 lifelines, safe havens at 5/10/15; synthesised WebAudio —
**no audio files, no copyright** — and a distinct name and look on purpose, no show
logo/music/wording) · **Quick Fire** ⚡ (60s blitz, combo ×1–5) · **Word Builder**
🧩 (`minigame_words.js`; ⚠ a clue must never contain its own word, and words are
A–Z only because the tiles are letters) · **Island Explorer** 🗺️
(`minigame_geo.js`; ⚠ every fact real and verifiable; two wrongs and the tour
**continues** — a child always finishes the trip) · **Number Ninja** 🥷 (7 belts ×
5 sums, **GENERATED** per belt, never drawn from the bank) · **Brain Battle** ⚔️
(pass-the-phone; both players drawn from the **same difficulty band** but never the
same question — the second would inherit the answer — and a resume always lands on
the handover, never mid-question) · **Time Traveller** 🕰️ (`minigame_time.js`;
⚠ a label must never contain a 3+ digit number, and never two same-year events in
one round, whose order would be unknowable).
- ⚠ **Game answers NEVER call `recordAnswer()` / `_recordDaily()`.** A replay must
  not distort the mastery, mistake and daily reporting parents rely on. Bests live
  in `DB.games.*` (seeded in `Store._defaultStudent`, so existing children backfill
  for free). In-progress games persist to sessionStorage per student.
- The hub's four `mg-card-soon` teasers each have a **full design-intent comment
  block above `renderHub()`** — read it before building one.
- ⚠ **Confetti is `launchConfetti(count)` (app.js), NOT the canvas-confetti
  `confetti({...})` API** — that library is not loaded, and a `typeof` guard made
  every burst silently no-op.
- **Ask the Crowd** — `minigame_polls` + three RPCs (granted `anon, authenticated`);
  the child shares `/v/<CODE>` (`vote.html`, standalone like `guest.html`).
  ⚠ **The CORRECT ANSWER IS NEVER STORED** — the row holds question + options only.
  The table FKs `students(id) ON DELETE CASCADE`.
- **Score sharing** — `navigator.share`, preferring a canvas-rendered 1080×1080 PNG
  where `navigator.canShare({files})` allows, else intent links or clipboard;
  `score.html?s=&c=&a=`. ⚠ **A share carries a score and a challenge — never the
  child's name, id, or any profile link.**
- **Gates**: `DB.restrictions.minigamesDisabled` (parent toggle;
  `MiniGames.syncTile()` hides the tile live) and `_PLAN_GATED_SCREENS.minigames`.
  An excluded games tile **hides rather than teasing** the child.
- Tests: `test-minigame-arcade.js`, `test-number-ninja.js`, `test-brain-battle.js`,
  `test-time-traveller.js`.

## Email — one transport, one preference model
Built 2026-09-16. ⚠ **Before it, the app could not send a single email.** The
three handlers that tried (`notify.js`, `weekly-digest.js`,
`teacher-approved-email.js`) each called **MailChannels**, whose free Cloudflare
Workers relay shut in 2024, and the deployed Worker carried **no mail credential
at all** — measured on the live Worker's bindings, which held exactly one secret
(`SUPABASE_SERVICE_ROLE_KEY`). Each failed differently and silently.
- **`workers/lib/mailer.js` is the only place mail is sent from.** Transport is
  **Resend** over HTTPS — Workers cannot open a raw socket, so SMTP is not an
  option here. Secrets: `RESEND_API_KEY`, `MAIL_FROM`, `SITE_URL`, `CRON_SECRET`.
- ⚠ **TWO From addresses, and which one is not cosmetic.** `mailFrom()` —
  `noreply@nouklass.com` — is for mail a MACHINE sent: a digest, a homework
  notice, an activation. `mailFromHuman()` — `admin@nouklass.com`, overridable
  with `MAIL_FROM_HUMAN` — is for mail a PERSON wrote, which today is the admin
  broadcast alone. A message inviting a reply must not arrive from an address
  named "noreply", and `admin@` is routed to a real inbox, so it also rescues a
  reply from a client that ignores `Reply-To`. Both are at the same verified
  Resend domain, so neither needs a DNS change; an unverified one is refused
  outright with "domain is not verified".
- ⚠ **`sendMail()`'s stand-in `To:` must be the From that was ACTUALLY used.**
  A pure-Bcc message needs a To header, and printing `noreply@` in the To of a
  message sent from `admin@` is precisely the mismatch a spam filter scores on.
- ⚠ **This is a SECOND sender and does not touch the Gmail quota.** Supabase Auth
  mail (sign-up, reset) still goes through `smtp.gmail.com` and still spends that
  shared ~500/day ceiling. Two senders, two limits — see
  [auth-sessions.md](auth-sessions.md).
- ⚠ **A mail failure never fails the thing the mail announced.** `sendMail()`
  never throws and returns the REAL reason — "domain not verified" and "bad key"
  are one HTTP status apart and need completely different fixes. An invented
  friendly message is how a real fault becomes unreportable.
- **Preferences live in `profiles.preferences.email`** — `{ enabled, digest:
  weekly|fortnightly|monthly|off, announcements, homework, last_digest_at }`.
- ⚠ **The card that sets them is shown to EVERY signed-in adult**, not only a
  parent with a family. It was `family ? … : ''`, so a teacher — who has no
  family row — had no email settings at all, while the admin broadcast selects
  teachers from its own Teachers tab and that message's footer tells the reader
  to switch these off under Account & Settings → Notifications. **A screen that
  does not exist is not an opt-out**, and `announcements` defaults to ON. The
  rows that are ABOUT CHILDREN (progress report, homework results, the study
  reminder) stay behind `family`/`children`: a teacher has none to report on.
  Guarded by `scripts/test-email-preferences.js`.
  ⚠ **`enabled:false` is the master switch and beats every per-kind flag.**
  ⚠ **An unknown frequency reads as `off`** — a typo or a value from a future
  version must never be treated as "send".
  ⚠ **The legacy `weekly_digest` boolean still counts**: an explicit `false`
  there is a parent who has ALREADY opted out, and the new shape must not
  quietly re-subscribe them. The Settings screen writes both.
- ⚠ **Frequency is enforced by `last_digest_at`, not by the cron expression.**
  The cron runs weekly; fortnightly and monthly exist only because `digestDue()`
  says no on the weeks between. It carries **one day of slack**, or a cron three
  minutes late pushes a fortnightly parent out by another fortnight, then
  another. `last_digest_at` is written **only after a successful send**.
- ⚠ **`/api/weekly-digest` used to be an open POST that mailed every parent.**
  Harmless while the transport was dead; the moment one works it is a mailing
  gun pointed at the whole user base. It now needs `x-cron-secret` or an admin
  JWT. The Cloudflare `scheduled()` entry point needs neither.
- ⚠ **There were NO cron triggers on the deployed Worker**, so
  `assignment-cleanup`, `classroom-purge` and `weekly-digest` had never run once
  since the Netlify migration — `workers/index.js` had the handler and the
  dispatch table and nothing ever called it. `wrangler.toml` now declares them,
  and the strings must match `scheduled()` **exactly**: it dispatches by
  comparing `event.cron`.
- **Unsubscribe** is `/api/email-prefs`, an HMAC of (user id + scope) under the
  service-role key. ⚠ **No sign-in, deliberately** — a parent must be able to
  stop mail from the phone in their hand. It can only turn a preference **off**,
  never on, and reads nothing back. ⚠ **A GET only shows the page**, because
  Gmail and Outlook prefetch links in mail; the POST makes the change.
- Tests: `scripts/test-email-preferences.js` (93 checks, including the
  client/server agreement below).

## Admin › group email (Bcc)
Members tab: tick accounts (selection survives paging and filtering), or *Add
everyone matching these filters*, then **✉️ Email selected**.
- ⚠ **Bcc is the only mode, and the addresses never reach the browser.** The
  admin selects **ids**; `workers/api/admin-broadcast.js` resolves them with the
  service role. A To: list of 200 parent addresses is a data breach dressed as a
  newsletter and is one wrong click away in any mail client.
- ⚠ **It skips anyone who has switched announcements off**, unless the admin
  ticks **Essential notice** — account, billing or safety only, the one category
  a recipient cannot opt out of.
- **Who would get this?** runs the whole thing as a dry run and reports the split
  (would send / opted out / no address / deleted) without sending anything.
- ⚠ **The body is NORMALISED before either part is built** (`normaliseBody()`).
  An admin composes elsewhere and pastes, so what arrives carries the SENDER'S
  layout — indents, a trailing space per line, stray blank lines — and
  `bodyToHtml()` turns every newline into a `<br>`, delivering all of it
  verbatim. Worse, `
` was never normalised, so `/
{2,}/` never matched a
  WINDOWS paste and **every paragraph break was lost**: the whole message
  arrived as one blob of `<br>`s. Line breaks the admin meant are kept — a
  signature block survives — and runs of blank lines collapse to one paragraph.
- ⚠ **Chunked at 500 ids per request and 50 recipients per message** (Resend's
  cap), and a partial failure reports what DID go out. "It failed" after 600
  delivered emails is the worst possible answer.
- The body is plain text, escaped before it reaches the template. **From and
  Reply-To are both `admin@nouklass.com`** — `mailFromHuman()` / `mailReplyTo()`,
  not the `noreply@` every automated message uses. Cloudflare Email Routing
  forwards that address to a real inbox, so a reply arrives whether the client
  honours Reply-To or answers the From.
- ⚠ **The sending admin's own address is never put on the message.** It was the
  `reply_to` until 2026-09-17 (`gate.caller.email`), which handed every parent
  the personal address of whoever pressed Send and made where a reply landed
 and a colon does not,
  in a call whose result was discarded. Measured on production the day it was
  found: `admin_actions` held **0 rows, ever**. The Worker now writes it through
  `logAdminAction()` (`workers/lib/admin-auth.js`) once Resend has answered —
  who sent it, the subject, the counts, the recipient **ids** and the provider's
  **message ids**.
  ⚠ **The message ids are the only way to answer "did it reach them?"** Every
  recipient is in Bcc, so the message names nobody afterwards, and the `To:` on
  the sender's own copy is the From address standing in for an empty To
  (`sendMail()`, or Gmail files a pure-Bcc message as suspicious). Paste a
  message id into the Resend log for delivered/bounced. ⚠ The shipped
  `RESEND_API_KEY` is **send-only** and cannot read that log — the dashboard can.
  ⚠ **It does NOT call the `admin_log_action()` RPC**, which is right from the
  browser and useless in a Worker: the function takes `admin_id` from
  `auth.uid()` and gates on `is_admin()`, and under the service role
  `auth.uid()` is NULL. Probed against production — it answers
  `{"ok": false, "error": "not_authorised"}` with **HTTP 200**, writing nothing
  while reporting success. `requireAdmin()` has already established the caller,
  so the id is passed explicitly and service_role's own INSERT grant writes it.
  ⚠ **IDs, never addresses**, and a dry run logs nothing: an audit trail that
  records intentions is unreadable.
- ⚠ **The budget line is reported in the right TENSE.** A dry run reads the
  budget as it stands *before* the send, so the preview says what this send
  *would* leave; the figure after a real send is already post-send. "80 will be
  left" on a preview of 9, when the answer was 71, is the sort of number an
  admin plans a second batch around. It also names the transactional reserve
  (`budget_reserve`), or "80 of today's 100" reads as "20 already sent".
- ⚠ **One selection, `_memberPicks`, is shared by the Members tab, the Teachers
  tab and the pending-registration rows — and BOTH lists are in the DOM at
  once.** So every `member-pick-*` checkbox is written **from** the map
  (`_syncPickCheckboxes()`), never alongside it, and each select-all is scoped
  to its own container. The blanket `cb.checked = on` this replaced unticked
  held teacher rows and then removed only the members: an admin ticked three
  parents and was told **"9 recipients"**, six of them invisible.
  `scripts/test-admin-broadcast.js` runs the real `admin.js` against a stub DOM
  and fails on that behaviour.
- ⚠ **The name comes from THREE lists** (`_members`, `_teachers`,
  `_pendingRegistrations`) — `_pickName()`. Looking in `_members` alone made
  every selected teacher read **"Unnamed"** in the one modal where an admin
  checks who they are about to email.
- The modal lists every recipient as a chip with its own ✕ (`dropRecipient`).
  It is the first screen showing the WHOLE selection, so a name that arrived
  from another tab has to be removable without closing and starting again.

## The QR encoder is VENDORED — and vendoring is not copying one file
`assets/vendor/qrcode.mjs`, loaded by `_loadLocalQRCode()` (app.js) for the
friend-invite QR and by `engine/teacher.js` for a class link. It ships with the
app on purpose: a phone, a school network or an offline session can block a CDN.
- ⚠⚠ **IT HAD NEVER WORKED ONCE IN PRODUCTION.** The file was jsDelivr's
  `+esm` build, which does **not** bundle dependencies — it externalises them
  as ABSOLUTE jsDelivr paths (`import … from "/npm/encode-utf8@1.0.3/+esm"`,
  same for `dijkstrajs`). Served from our own domain those resolve against
  **nouklass.com**, so the browser fetched `https://nouklass.com/npm/…`, got a
  404 (verified live), and the whole module graph failed. The dynamic import
  rejected, the loader returned null, and every caller showed its fallback:
  *"QR code unavailable right now"*. On every device, every network, always.
- ⚠ **Everything anyone checked looked right**: present on disk, committed,
  staged by `prepare-deploy`, served 200 as `text/javascript`. The fault was
  one level deeper, in an import inside the file — and the feature's own
  fallback wording ("right now") made it read as a passing network problem
  rather than as something that had never worked.
- Fixed by vendoring the two dependencies beside it (both leaf modules, ~2.7 KB
  together) and rewriting the specifiers to `./`.
- ⚠⚠ **AND THE FILENAMES CARRY THEIR VERSIONS** — `qrcode-1.5.3.mjs`,
  `encode-utf8-1.0.3.mjs`, `dijkstrajs-1.0.3.mjs`. This is not tidiness.
  `sw.js` serves `/assets/` **cache-first from `ASSET_CACHE`**, a cache with no
  version in its name, explicitly kept across every `SHELL_VERSION` bump, whose
  `cacheFirstWithNetwork()` returns a hit and **never revalidates**. So a
  browser that once fetched the broken file keeps it FOREVER: no deploy, no
  reload, no shell bump replaces it. **Measured** — the `/npm/` fix went live
  and the console still read `/npm/encode-utf8@1.0.3/+esm 404` from the cached
  copy, on a site already serving the corrected file. The URL is the only cache
  key that exists there, so a fix has to change it, and every user who had
  already opened the invite modal was otherwise stuck for good.
  ⚠ The `import()` in `app.js` moves with it, which means the SHELL version
  must be bumped too or browsers keep asking for the old URL.
- ⚠ **`scripts/test-vendored-modules.js` imports every vendored module through
  Node's own resolver** rather than grepping for import statements — the first
  version regexed the minified source and reported a specifier of `",r,"` that
  came from inside a string literal (*"Could not find a path from "*). A test
  that invents findings gets the next real one ignored with it. It also runs
  `create()` on a real friend link, which exercises BOTH dependencies instead
  of only proving the file parsed.

## Sharing to Facebook
⚠ **The Facebook sharer carries NO text.** It takes a URL and builds the post
from the Open Graph tags it finds there — the `quote` parameter has not been
honoured for years. So `index.html`'s `og:` block **is part of the feature**, not
decoration: without it a shared link renders as a bare URL.
- ⚠ **`og:description` is now a FOURTH surface** that must stay in step with
  `_appShareText()` (app.js), `_inviteText()` (auth.js) and the landing page —
  and it is the worst one to get wrong, because **Facebook caches a scrape for
  far longer than a WhatsApp message survives**.
- ⚠ **`og:image` must be absolute** — Facebook does not resolve a relative path,
  and an unreachable one renders a blank card.
- WhatsApp is the mirror image: it carries text and ignores `og:` on a bare
  link. That is why `shareToFacebook(url)` and `shareToWhatsApp(text)` do not
  share a signature.
- Live on: the landing-page share button, the referral invite, the friend
  challenge, and the Ask-a-friend panel (plus *pass it on* inside `vote.html`).

## Ask a friend — a help poll on a practice question
Built 2026-09-16. The Peak Quest crowd lifeline, brought to ordinary practice:
a stuck child shares **one question** and sees how people voted. Same table
(`minigame_polls`), same voting page (`vote.html` behind `/v/<CODE>`), new
`kind` column telling the two apart.
- **`help_poll_create(question, options, minutes)`** — a NEW function, not a
  wider `minigame_poll_create`. ⚠ `CREATE OR REPLACE` cannot change an arity and
  two overloads a named PostgREST call can both satisfy is an **ambiguity error,
  not a fallback** — so the game's own function was left untouched.
  `minigame_poll_results` gained `kind` in its returned object (same signature,
  so every deployed caller keeps working); `minigame_poll_vote` is unchanged and
  serves both kinds. Applied to production 2026-09-16, re-applied to prove
  idempotency, `proacl` read afterwards (**anon + authenticated + service_role** —
  anon is REQUIRED, a child session is anon plus a token header).
- ⚠ **THE CORRECT ANSWER IS NEVER STORED OR SENT.** The row holds the question
  text and the options only; the results RPC returns no answer; `vote.html`
  cannot mark anyone right. Verified on the wire, not inferred — a real poll was
  inserted on production, voted on as `anon`, and the response inspected.
  This is the whole reason the link is safe to put on WhatsApp.
- ⚠ **The share message carries a link and a plea — never the child's name or
  id.** Same rule as the score share, same reason: a forwarded WhatsApp message
  cannot be recalled.
- ⚠ **Asking is not answering.** It never calls `recordAnswer()`,
  `_recordDaily()` or `gainPoints()` — a stuck child must not distort the
  mastery and daily figures their parent reads.
- ⚠ **Duration is picked from a LIST (3 · 5 · 10 MINUTES, default 5), clamped in
  SQL by a `CASE` whitelist.** An arbitrary integer is a free "keep this public
  URL alive for a year" primitive.
  ⚠ **It was 1 / 6 / 24 HOURS for half a day and that was wrong.** Hours treat
  this as homework a child sets down and returns to; they are mid-question, in a
  practice run, with the question on screen. Nobody waits on that, and a link
  outliving the session is a public URL nobody is watching. The game's own crowd
  lifeline has always been 3 minutes — this is the same moment. A legacy `1440`
  from an older deployed client **clamps to 5**, it does not error.
- ⚠ **The child can CANCEL** (`help_poll_cancel`, owner-only via
  `current_student_id()`). Without a way out the only thing to do while waiting
  is nothing, which is the opposite of practice. It **expires** the row rather
  than deleting it, so a late voter is told "voting has closed" instead of
  "this link is broken". Cancelling twice returns `closed:false` and is not an
  error. ⚠ A closed panel always says what to do next — a poll that ends with no
  instruction leaves a child watching a screen that will never change again.
- ⚠ **The share message names a CLOCK TIME, not just a duration.** "Closes in 5
  minutes" is read whenever the message is opened, which may be four minutes
  later; an absolute time cannot go stale that way. `help_poll_create` returns
  `expires_at` for exactly this.
- ⚠ **Facebook cannot be posted to programmatically and this is not a gap to
  close.** `publish_actions` was withdrawn by Facebook in 2018; no app can write
  to a user's timeline. Every route — `sharer.php`, the JS SDK's `FB.ui`, a
  Share button — opens Facebook's own UI. On mobile, `navigator.share` hands the
  OS share sheet (which includes the Facebook app) and is the closest thing to
  "integrated". ⚠ And for a 3-10 minute poll Facebook is the **wrong channel**:
  a timeline post will not gather votes in five minutes. WhatsApp is the one
  that works here.
- ⚠ **The button lives in the help TRAY, not the always-visible `.pr-tools`
  row** — that row is a fixed 3/4-column grid and a fifth button reflows it on
  every phone. Unlike read-aloud, a child who cannot read "Need help?" is not
  this feature's audience.
- ⚠ **Only a question with 2–4 options gets the button**, re-evaluated per
  question: a numeric or open-response item has nothing to vote on, and would
  otherwise inherit the previous MCQ's button.
- ⚠ **`current_student_id()` refuses a token shorter than 32 characters.** A
  short probe token in a test reads as "not signed in" and is indistinguishable
  from a broken gate.
- ⚠ **A newly created function is not in PostgREST's schema cache.** The client
  gets `PGRST202 could not find the function` until
  `NOTIFY pgrst, 'reload schema'` runs — which looks exactly like a missing
  migration.
- ⚠ **Options are taken from the live question object** — `makeMCQ()` shuffles,
  so a poll built from the source array would letter the choices differently
  from the child's own screen.
- ⚠ **Zero votes renders 0%, never an even split.** "25% each" with nobody
  having voted is a lie a child would act on. The copy says the crowd can be
  wrong, and the child still chooses.
- ⚠ **The refresh beat scales with the poll's life** (60 s over an hour left,
  15 s over ten minutes, else 3 s) in BOTH the app panel and `vote.html`. The
  game's 3-second beat over a 24-hour link is 28,800 requests from one open tab.
- **Parent switch**: `DB.restrictions.helpRequestsDisabled`, beside the Game
  Zone toggle. ⚠ **Stored as the NEGATIVE so an absent key means ON** — every
  existing child gets the default with no migration, exactly as
  `minigamesDisabled` does. Added to `SupportSettings.PARENT_KEYS` **and** to
  `admin_patch_student_settings()`'s accepted key list (a tenth key; the SQL
  refuses anything not on that list). A parent previewing a child is excluded —
  that path holds no student token, so the RPC would answer `not_signed_in`.
- ⚠ **`/v/<CODE>`, `/m/<CODE>` and `/a/<CODE>` all answered 404 in production**
  until this change — the three `netlify.toml` rewrites were never ported to the
  Cloudflare Worker, so every Ask-the-Crowd, class-hub and guest-homework link
  already in circulation was dead. Measured against nouklass.com, not inferred.
  They are **rewrites, not redirects**: each page reads its own code out of
  `location.pathname`.
- Tests: `scripts/test-help-requests.js` (37 checks).

## Parent-controlled Game Settings
`engine/game_settings.js` (`GameSettings`, loaded **before** `minigame.js`). Per
child, in `DB.restrictions.games` → `students.settings`, parent-written through
`Auth.saveGameSettings` with the same rollback-on-refusal as every Controls toggle
(**no migration** — RLS on `students` already gives a child SELECT only, proven
live and rolled back). Missing/partial settings `normalise()` to: Balanced · all
grade subjects · Medium · 10 per round · weak focus off · avoid-recent on · GK off.
- **`GameSettings.GAMES` is the single capability table** (`supportsSubjectMix /
  Difficulty / RoundLength / WeakTopics / GeneralKnowledge / RecentAvoidance`).
  **Never branch on a game's name.**
- **Every quiz game draws through `pickForGame()`**: valid MCQs only (`isValidMCQ`
  — answer present once, options unique, answer within the first four), the grades
  in `context().grades` and no others (own grade alone by default — see
  **Grade access** below), locked/admin-blocked
  chapters out, excluded subjects removed **before** anything else,
  largest-remainder shares (40/30/30 → 4/3/3) spread through the round rather than
  clumped, levels never above `min(difficulty top, restrictions.maxDifficulty)`,
  weak-area weights from `DB.chapters`, recent ids (`DB.games.recent`, cap 150)
  avoided while fresh ones remain, shortfall filled from another **included**
  subject with a `console.warn`. Zero usable ⇒ `NO_QUESTIONS_MSG`, distinct from
  "still loading". A game with a `levels` ladder keeps the exact level before
  freshness (Brain Battle pairs must match); a free-running game prefers fresh.
- Adaptive: `DB.games.adaptive {level,up,down}` — +1 after 3 right, −1 after 2
  wrong, clamped to the cap at read AND write. Recorded by Billionaire and Quick
  Fire, never by Brain Battle (two players).
- ⚠ GK defaults OFF, so Billionaire's rungs 16–20 are textbook level-4 unless the
  parent turns it on; hub copy and tier badge follow the setting.
- ⚠ The parent card renders by `innerHTML` **inside the chalkboard `#screen-parent`**,
  which is dark in BOTH themes — `.gs-*` carries a `#screen-parent` override block.
  `test-game-settings-ui.js` (19 text styles ≥ 4.5:1 in both themes at 360px, plus
  overflow and touch sizes), `test-game-settings.js`.

## Grade access — the parent grants grades, the child aims upward
`GradeAccess` (**engine/helpers.js**, so it loads before everything that reads it)
is the single definition. Two settings in two places, because two different people
write them:
- **Parent** → `restrictions.allowedGrades` (`students.settings`, parent-written).
  The extra grades this child may use. Rendered by `_renderGradeAccess()` (app.js),
  written by `Auth.toggleGradeAccess()`. Read by the practice hub's grade dropdown,
  by Search, and as the ceiling on the child's own control.
- **Child** → `DB.games.sourceGrades` (the progress blob). Which of those grades
  their games draw from. `GameSettings.childGradeBar()` / `toggleSourceGrade()`.
- ⚠ **The child's own grade is NEVER in either list.** It is not a permission, and
  it changes each school year — it is read from the ACCOUNT
  (`GradeAccess.ownGrade()`), never from the blob. `DB.grade` is written nowhere.
- ⚠ **A child may aim UP, never down.** `childChoices()` filters `>= own`. A parent
  may still grant a LOWER grade on purpose — that is how catch-up revision is set
  up — and it reaches Search and the practice hub but never the child's game picker.
- ⚠ **Unlocking a grade changes no game by itself.** `gameGrades()` defaults to
  `[own]`; the child opts in. A grade the parent later revokes drops out of games
  with **no write to the child's blob**.
- ⚠ **Every chosen grade is FIRST-CLASS in the pool** (`buildPool({grades})` sets
  `own: true` for all of them). The legacy `crossGrade: true` path still marks other
  grades `own: false`, i.e. last resort — a child who *asked* for Grade 6 wants
  Grade 6, not Grade 6 once the Grade 5 stock at that level runs out.
- ⚠ **`MiniGames._preloadGrade()` must fetch every source grade**, not just the
  child's own, or the round fails as "not enough suitable questions".
- ⚠ **Legacy `crossGradeSearch` / `crossGradePractice` meant "every other grade"**
  and migrate to exactly that, **on read**, inside `GradeAccess.granted()`. New
  writes keep both booleans in step (`flagsFor()`) so a device on the old shell
  reads the same permission. Nothing else reads them any more.
- ⚠ This is a **parental** control, not an entitlement — the same category as
  `lockedChapters`. `netlify/functions/questions.js` still decides which packs the
  family may fetch; granting Grade 6 cannot hand a child questions their plan
  does not cover.
- Tests: `test-grade-access.js` (model + pool + chips, VM),
  `test-grade-access-ui.js` (both surfaces in real Chrome at 360px, both themes),
  and the grade checks in `test-parent-restrictions.js`.

## The timetable — sessions a child can carry out, and be held to (2026-09-20)
Rows live in `schedule_entries` (see [data-storage.md](data-storage.md) for the
blob); nothing here needed a migration — `subject_id`, `chapter_id`,
`duration_mins` and `entry_type` were already columns.
- **Two kinds of study session.** A **SUBJECT session** (`chapter_id` null,
  `duration_mins` set: "📚 Maths practice · 60 min") is done when the minutes
  are met, and **any chapter in the subject counts**. A **CHAPTER task**
  (`chapter_id` set) is done once that chapter is practised that day. A parent
  plans either from **📚 Plan a session** on the timetable screen (subject +
  how long + optional chapter); the label is derived by `_studyLabel()`.
  ⚠ `_childRow()` in calendar.js is the ONE mapper every child screen reads
  (`kind`, `done`, `doneMinutes`, `questions`); `chapter_id` is
  authoritative when set and older rows still resolve by label.
- ⚠ **Minutes per subject per day**: `_recordTimeOnTask()` now also credits
  `daily[day].sub[packId]` (seconds) beside the whole-day `s`, keyed on
  `ACTIVE_PACK.id`. Same capped answer-gap method, same honest floor.
  `_subjectMinutesOn(dayKey)` reads it back.
- ⚠ **Done is derived, still** — from the child's own `DB.daily` (only when
  `ACTIVE_STUDENT_ID === _studentId`; the parent calendar audits with
  `_loadActivity()`). `Calendar.awardDoneToday(rows)` fires the timetable
  points from the child's home card and timetable screen; the old award loop
  in `renderTodayPlan` fed a panel that is no longer painted, so timetable
  points had quietly stopped. "Overdue" now means past **and not done**.
- ⚠ **"Today's plan first"** — `students.settings.planFirst`, saved like
  `lockedChapters` from the parent's timetable screen (`Calendar.setPlanFirst`)
  and mirrored to `DB.restrictions`. While today's planned sessions are not
  all done, `startChapterDirect()` on a chapter outside the plan opens
  `#modal-plan-first` (the same `_scheduleRow` cards, each startable). A
  planned chapter stays open all day, done or not, and so does every chapter
  of a planned subject — the plan is a door, never a cage. Assignments, the
  coach, previews and the drills never pass through it. The gate reads
  `_planToday`, cached from the last `getBacklog()`; with nothing cached it
  stays open. Client-only, deliberately (same category as `lockedChapters`).
- ⚠ **`Calendar.render()` used to skip the grade** when `_studentId` was
  already set by a child-side read, so a parent opening the calendar after the
  child got an empty subject list in the generator and the planner. It now
  resolves name and grade for whoever `_studentId` is, every time.
- **The generator knows the new shape** (`_gen.shape`, "Each session is"):
  `chapter` (the original, a named chapter per session), `subject` (one row
  per subject-day carrying all its minutes, the child picks the chapter), or
  `both` (the subject row plus ONE chapter to complete, with no minutes of
  its own — it is done inside the subject time). `_genEntries(cfg, dates,
  plan, fill)` is the pure row builder, exported for the test; the preview
  counts sessions by shape. Saved with the other generator settings.
- **Weekly repeat** in the planner, for NEW study sessions only: the same
  session on the same weekday until a date, at most 26 rows, written as ONE
  insert so the family sees all of them or none. Editing a row never fans
  out (`_studyVisible` hides the control while `_editingEntryId` is set).
  ⚠ `saveEvent()`'s insert path now always inserts an ARRAY and reads back
  without `.single()`; a stub that answers `.single()` only will break it.
- Tests: `scripts/test-timetable-plan.js` (26 checks, real browser, Supabase
  stubbed at `_sb.from` — the client is a const, its methods are not) and
  `scripts/test-timetable-views.js` (unchanged, 58).

## The classroom calendar — per classroom, on the class page (2026-09-20)
`teacher_class_events` (`migrations/20260920_classroom_calendar.sql`, applied
to production and the schema regenerated the same day): `classroom_id`,
`teacher_id`, `date`, `end_date` (absence spans), `kind` ∈ `exam | due |
absent | event`, `title`, `notes`. **Per classroom, never per teacher** — a
teacher with three classes has three exam dates.
- **Teacher**: the classroom's **🗓️ Calendar** tab (a PRIMARY section, like
  Materials — `_renderCalendar()` in `teacher_classroom_detail.js`): add
  (kind, date, last day for an absence, title, note), delete, "coming up" with
  the homework due dates merged in read-only, and a short "past" list.
  ⚠ Writes go through RLS (`class_events_teacher`): same-row `teacher_id`,
  `teacher_guest_authorized()`, and `teacher_owns_guest_classroom()`.
  ⚠⚠ **A policy cannot subquery `teacher_guest_classes`** — that table carries
  grants for `service_role` only, so the first draft failed every teacher
  write with "permission denied for table teacher_guest_classes" on the
  throwaway postgres. The ownership test is a SECURITY DEFINER function for
  that reason. `.insert().select('id')` and `.delete().select('id')`: **zero
  rows is a refusal**, shown as such.
- **Pupil**: the class page `/m/<CODE>` — `materials_library_open()` now
  returns `events` (this classroom, last 60 days onward) behind the same PIN
  and never on the `info` call; `workers/api/materials-library.js` and the
  Netlify twin pass it through. `materials.js` **🗓️ Calendar** is one grid
  with three sources — events, homework due dates, files by day shared — with
  a per-kind dot and key, a "📅 Coming up" strip above the homework list, and
  the next event as a header chip. ⚠ **Event dates are strings and are never
  parsed through `Date`** — a date the teacher typed must not shift by a
  timezone; a malformed one is dropped everywhere (grid, strip AND chip — the
  chip once showed "Invalid Date" for a bad row that sorted first).
  ⚠ The calendar view renders even when a file search matches nothing.
- **Worksheets reach the class page too** (`migrations/20260920_classroom_worksheets.sql`,
  applied the same day): `materials_library_open()` returns `worksheets` —
  this classroom's `physical_homework` up to a fortnight past its deadline —
  and the Worker signs each file per visit from the same bucket, never
  exposing `file_path`. The class page lists them under Homework (current,
  then past), puts the deadline on the calendar (`ws` dot) and in the
  "Coming up" strip; a paper-only sheet says so, an unsigned file says "tell
  your teacher". No "done" — a paper task is handed in, not ticked.
  ⚠ The teacher's worksheet form now takes a **real due date** (`#phw-due`
  + quick chips), saved as the END of that local day like a digital
  activity's due date; "due in N days" from the moment of upload is gone.
  Worksheet deadlines appear on the classroom Calendar tab beside homework.
- Tests: `scripts/sql-tests/run-class-events-tests.sh` (fresh build,
  idempotency of both migrations, 21 assertions as `authenticated` + service_role),
  `test-materials-library-render.js` (+13 event checks, +6 worksheet checks),
  `test-teacher-command-centre.js` / `-layout.js` and
  `test-classroom-materials-access.js` (five primary sections).

## Learning Coach — one spaced-retrieval mission a day, every subject
`engine/learning_coach.js`. A **topic** is one chapter subsection of one pack,
keyed `packId/chapterId/subsection`. Its life: **starting check** (6
questions, hints off, first attempt only) → **practice** (up to 8 fresh
questions, hints on; the subsection first, then chapter-mates) → **fresh
check** three days later on 6 questions **reserved at the start and never
shown since**. A strong start (5/6) skips practice and is re-checked after a
week. One mission per Mauritius day, across all subjects.
- ⚠ **It was a Grade 5 Maths pilot until 2026-09-19**, keyed
  `chapter/subsection/difficulty` with 20+ questions per key, and it was in no
  `.md` at all. Measured on the built bundles: that rule left **22 of 49 packs
  with nothing the coach could pick** (every history pack, grade 4–6 science,
  every Grade 7–8 pack). Grouping by `pack/chapter/subsection` at **12+**
  leaves only the three `comingSoon` ICT placeholders empty, and
  `test-learning-coach.js` fails if any live pack ever has zero topics.
- ⚠ **A v1 blob is migrated in `state()`** — several v1 keys (one per
  difficulty) fold into one v2 key, and every id they used or reserved is kept,
  so no question a child has already seen is dealt as "fresh". A pending v1
  mission keeps going under its new key.
- ⚠ **Packs are loaded one at a time, only as far as the mission needs.**
  `wantedPacks()` names the packs of a pending mission, a topic awaiting
  practice, or a check due today; a topic resting until next week costs no
  fetch. Fresh topics rotate **fewest-topics-started first**, so a child is not
  coached on Maths five days running. Loading a whole grade to deal 6
  questions is the French pack's 600 KB for nothing.
- ⚠ **A subsection of exactly 12 has nothing left after the two checks.**
  Practice tops up from the same chapter; if that still yields under 4, the
  topic is `noPractice` and goes straight to its fresh check after the practice
  gap. `mission.spare` is measured at the starting check so `complete()` can
  tell "practise next" from "nothing left" without a pool.
- ⚠ **The cycle continues after the first fresh check (2026-09-20).** It used
  to stop there whatever the score, so a child who scored 2/6 on the fresh
  check was never coached on that topic again. Every topic now carries
  `next` (`practice` | `check` | `done`), `due`, `checks[]`, `rounds`
  and `streak`, normalised on read so older shapes keep going from where they
  stopped. A **weak** check (under 5/6) → another practice round → re-check
  three days later; after **3** rounds without a strong check the topic is
  **stalled** — re-checked in 14 days, and the parent card says practice alone
  is not fixing it. A **strong** check → next check in 7, then 14, then 30
  days; **three in a row** and the topic is **done**. Later checks deal unseen
  questions (subsection, then chapter) and reuse the oldest-seen only when
  both run dry; the reserve is spent by the first check.
- Every question passes the same gates as ordinary practice (chapter declared,
  not parent-locked, plan allows it, difficulty within the cap), and the pack
  is `activateSubjectPack`ed before launch so hints and labels resolve.
- The card (`#coach-child-home`, `#coach-child-subject`) shows for any child
  whose grade has a live pack; the parent summary for the child in focus.
  `scripts/test-learning-coach.js` (pure lifecycle + a scripted launch) and
  `scripts/test-coach-teacher-layout.js` (the card in a real browser).

## Fix My Mistakes — spaced since 2026-09-19
A wrong answer is a row in `DB.mistakes`; a correct answer **from anywhere**
counts a fix; **three** fixes retire it (`_FIX_TO_RETIRE`). Each fix stamps
the row `due` — one day after the first, three after the second
(`_FIX_GAP_DAYS`) — and **the drill deals only `_dueMistakes()`**, longest
waiting first, then the most-missed.
- ⚠ Two fixes in one sitting proved recall over thirty seconds; the paper is
  weeks away. The spacing is enforced **only where the child deliberately
  revisits** — ordinary chapter rounds never hide a question and still count.
- ⚠ **The home card counts what is DUE**, and when every mistake is parked it
  shows a dashed "Mistakes resting" card saying when they return
  (`_fixDueLabel`: "tomorrow", "on Thursday", "on 3 Oct" — never an ISO date)
  rather than vanishing, or the child concludes they are gone. A re-miss
  resets the row (no `due`, `fix` 0). `scripts/test-fix-my-mistakes.js`
  (real browser, 29 checks).

## Teacher Mode — one destination, one to-do list, one question per screen
Rebuilt 2026-09-10 on one rule: **a teacher must never be asked the same
question in two places, and must never have to work out what to do next.**

### How a parent gets in — "Enable teacher mode", never a second sign-up
A parent's dashboard carries one card (`_renderTeacherApplyCard()`, app.js):
**Enable teacher mode** → the same profile row becomes role `teacher` → the card
turns into **Switch to teacher view** (`Auth.openTeacherDashboard()`), and the
👩‍🏫 header button appears. Same account, same email, no note to write.
- ⚠ **The card only draws; the SERVER decides.** It calls
  `request_teacher_access()`, and whether that is instant or queued is
  `global_settings.teacher_auto_approve` — **ON in production since 2026-09-11,
  re-read 2026-09-19**. Instant needs a confirmed email and a never-decided
  account; a previously rejected one goes to the admin queue and the card says
  "requested". Every teacher RPC still checks `role='teacher' AND
  teacher_status='approved'` itself, so the card cannot grant anything.
- ⚠ **Do not point a parent at the teacher sign-up tab.** Registering again with
  the same email cannot create a second profile (profiles key on the auth uid),
  but it confuses the parent and files nothing useful. The landing page and the
  header comment say "enable it from your parent dashboard" for that reason.
- ⚠ The old "Are you a tutor?" pitch was dismissable and stored a per-user
  localStorage key; the enable button is **always visible** now and those helpers
  are gone. `scripts/test-teacher-mode-card.js` renders all six states.

### Navigation — Set Work and Results are NOT top-level
Main navigation is one row of folder tabs, **the same shape the parent dashboard
uses**: **🏫 My classes** then the seven tools — Marks book, My files, Past work,
Test papers, Chapter preview, Messages, Settings. The classroom screen is still
**Today · Work · Pupils · Files** plus its own `⋯ More` (All marks, Settings) —
that one is a different component (`TeacherClassroomDetail.toggleMore`).
- ⚠ **The seven tools used to sit behind a top-level `⋯ More` dropdown** and no
  longer do (2026-09-19). It put one tap and one guess in front of every tool a
  teacher has, and the parent dashboard — the same person, the same board — had
  no such menu. The `<small>` description each item carried in the menu is now
  the button's `title`. `TeacherMode.toggleMore/closeMore` are gone with it.
  ⚠ **The menu is how two tools went missing from the test:** the layout test
  asserted *five* tools behind More while the markup had seven — `papers` and
  `preview` were added and nothing noticed. The row is now asserted by
  `data-tab`, in order, and measured at 360px (4 rows) and 1280px (1 row).
- ⚠ **Account & Settings renders INSIDE the Settings tab** (`#tc-profile-content`,
  `_renderTeacherAccount()`), by the same `_renderParentProfile()` the parent
  dashboard uses. It was a card that called `showProfile()` and left for
  `#screen-profile`: no tab row, no board, a different header — the one tool that
  did not behave like a tool. `showProfile()` now routes to the tab whenever the
  teacher screen is open, the same way it already routed a parent to `PD.mainTab`.
  ⚠ **The `=== false` in that guard is load-bearing**: `getElementById` returns
  `null` where the screen is not in the DOM and `!undefined` is *true*, which
  would route a child into teacher mode.
- ⚠ **`create` and `results` are still real tabs** and `switchTab()` still opens
  them; they are simply not somewhere a teacher *picks*. They used to sit in the
  main nav **beside a classroom screen carrying the same two names**, so
  "Results" meant two different scopes on two screens with no way to tell.
  Each now carries its own `← Back to my class` (`TeacherMode.leaveSetWork()`,
  which reopens the classroom the teacher came from).
- `switchTab('classes')` is an **alias for `'home'`** — Home and Classrooms were
  two tabs with the same greeting, the same "recent activity" and the same
  "needs help" panel. The classroom boards render into `#tc-list` directly under
  `#ta-home` on that one screen.
- `MAIN_TABS` / `DETAIL_TABS` / `TOOL_TABS` / `ALL_TABS` in `engine/teacher.js`.

### "What needs you today" — ONE builder
`TeacherInsights.todo(groups, {showClass, limit})` is pure, and **both** Home
(across every class) and a classroom's Today screen call it. A teacher asking
the same question on two screens must not get two answers.
- Pupils are **grouped per piece of work, never one row each** — four pupils who
  have not opened the same homework is one job, not four.
- ⚠ **Never "everyone finished" over a pupil who needs help.** `all-done` is
  suppressed when the same work produced a low or rushed row; a green tick reads
  as "handled", which would be the opposite of the truth.
- Every row's button does exactly what its label says: *Send a reminder* opens
  the share sheet with the message written, *Set easier practice* opens Set Work
  already pointed at the same chapters and the same pupils.
- Evidence thresholds are unchanged and still apply here: ≥ 5 answers before
  "may need help" (< 50%), ≥ 3 answers in a chapter before naming it, "very
  quickly" = < 8 s/question **and** < 60%. **Never label on one or two answers.**

### One counter per classroom
The header strip (`.tc-cd-stats`, four `button.tc-cd-stat`) is the **only** place
a classroom is counted, and each number is the button that opens what it counts.
- ⚠ There used to be **two stat rows on one screen that disagreed**: the strip
  said *"5 submitted"* while a five-tile grid three centimetres below said
  *"2 Submissions"*, because one counted every piece of work and the other only
  the active ones. Do not reintroduce a second counter anywhere in the overlay.

### Set Work — one question per screen
Who → subject → which chapters → how many and how hard → when, five steps with
`Back`/`Next`, a progress track, and a plain-English summary above the button
that sends it (*"Grade 5 Blue will get 10 mixed questions on the whole of
Mathematics, with no timer, due Thursday 17 September."*).
- ⚠ **The wizard owns no state.** Every control is the same element
  `_buildAssignment()` has always read; `gotoStep()` only decides which is on
  screen. A hidden input still answers `.value`, so a step nobody visited still
  publishes correctly — and the publish path, its PGRST202 fallback and the
  success screen are untouched.
- ⚠ **"The whole subject" is a spoken choice** (`input[name=ta-scope]`), not an
  empty form. It used to be "leave every box blank", the least discoverable
  default there is. Choosing it **clears** any tick left from an earlier visit;
  arriving at the step **follows** the ticks instead (`_syncScope`), because
  `prefillPractice()` and `_duplicateAssignment()` tick chapters directly.
- ⚠ **Level 4 does not mean the same thing in every pack**, so the wording
  follows the SUBJECT (`_levelWords`): word problems in maths, a multi-verb
  cloze in French, an extended passage in English, an applied scenario
  elsewhere. A French teacher is never promised word problems.
- `_poolSize()` counts **exactly the pool `_buildAssignment()` will search**, the
  same way. A friendlier number the publish step then contradicts is worse than
  no number. It returns `null` while the subject is still loading, and nothing
  blocks on `null`.
- Each step refuses to be left for a reason in the teacher's own words
  (`_stepProblem`) — every one of them a failure the publish step used to report
  at the very end, moved to the screen that caused it.
- Sharing choice stays on step 1 on purpose (online groups need "Anyone with the
  link" without discovering a disclosure); PIN is the default whenever the
  classroom has pupils, flipped only by the teacher's own tap. The two options
  now say what each **costs**: the open link "cannot be sure who answered".
- **Set Work opens on the classroom's own grade.**
  `teacher_guest_classes.grade` (nullable `smallint`, CHECK 1–9) is asked for
  when a classroom is created and can be changed in its Settings; the class chip
  carries it in `data-grade` and `_applyClassGrade()` preselects `#ta-grade`.
  Migration: `migrations/20260910_teacher_classroom_grade.sql`, applied
  2026-09-10.
  - ⚠ Before it, Set Work opened on the **lowest live grade for everybody** — a
    Grade 5 teacher was shown Grade 1 subjects every time they set homework.
  - ⚠ **NULL is a real answer.** "I have not said" stays expressible, and a
    classroom with no grade changes nothing; `set_grade` with `p_grade: null`
    clears it. A guess dressed as an answer is worse than no answer.
  - ⚠ **Applied only when the chosen classroom CHANGES** (`_gradeAppliedFor`).
    `_renderClassPicker()` re-runs on tab entry and after every list refresh and
    auto-selects the first classroom; re-applying each time would drag the grade
    back from under a teacher who had moved on and changed it.
  - ⚠ The RPC gained `p_grade`, which **cannot** be a `CREATE OR REPLACE` — the
    six-argument overload is dropped in the same transaction, or a six-name
    PostgREST call is ambiguous. The deployed client's six-argument call still
    works, because `p_grade` defaults to NULL.

### The guest homework runner (`guest.html` + `guest.js`)
The page a child opens from a WhatsApp link. It loads **no engine file** by
design, so it carries its own `esc()`, its own answer matching and its own
material sort — and its own copy of the one rule that matters here:
> **Authored content is HTML; only what the PUPIL typed is escaped.**
The question, the options, the answer and the worked explanation all come from
our own repo and are written with `innerHTML`. `d.userAnswer` is the one value
a person supplied, and it stays in `esc()`.
- ⚠ It was the other way round for the answer and the explanation, and that
  printed the tags at the child: *"4⁴ = 4×4×4×4 = 16×16 = `<b>`256 books`</b>`"*.
  Measured in the built bundles: **25,780 of 35,460** questions carry markup in
  their explanation, 55 in their options and 51 in their answer
  (`H<sub>2</sub>O`, `3<sup>6</sup>`) — so this was most of the corpus, and
  stripping tags instead would have turned `3<sup>6</sup>` into **36**.
- ⚠⚠ **Never put authored text in an ATTRIBUTE on this page.** `esc()` escapes
  `& < >` and **not the double quote**, and **944 authored options contain one**
  (`No — it should be "four"`). The option used to be carried in
  `data-v="…"`, which therefore closed early: `dataset.v` held a truncated
  string, that string was POSTed, and `grade()` in
  `netlify/lib/questions-sandbox.js` marked a child who picked the right answer
  **wrong** — stored, and shown to the teacher. The button now carries the
  option **index** (`data-i`) and the text is read back from the question.
- The same asymmetry holds in the app: the assignment review in `app.js` and
  the teacher's *View answers* row in `teacher_workspace.js` escape the pupil's
  answer and render the authored one.
- `scripts/test-guest-answer-rendering.js` — 20 checks in **real headless
  Chrome**, driving the real page with three real authored questions (one with
  a quoted option, one with `<sup>` options, one with a bold explanation) and a
  stubbed `/api/`. ⚠ Needs Chrome for Testing via `CHROME_PATH`; `GUEST_JS`
  points it at a COPY of `guest.js` — never swap the repo's own file to test an
  old version, a second session may be writing it.
  ⚠ Harness trap: **`#g-go` ships enabled**, so "the button is enabled" is not
  "the gate is ready" — `initGate()` attaches its click listener only after the
  metadata arrives, and which side of that race a run landed on flipped with
  the size of `guest.js`.

### One go per device (2026-09-10, APPLIED)
Identity in a guest assignment is the **NAME** — `teacher_guest_open()` keys
`guest_submissions` on `name_key` — so the same name was always refused and a
**made-up one never was**. Measured on a real laptop: finish, reload, type
"Sam2", sit the paper again.
`teacher_guest_access.one_per_device` (**default false**) stops a device that
has already SUBMITTED reopening under a different name.
- ⚠ **A speed bump, not a wall.** The device code is 32 hex characters in
  `localStorage`, not a fingerprint: incognito, a cleared browser and a second
  phone all defeat it. The control that genuinely caps attempts is a
  **per-pupil-PIN classroom**, where `name_key` is a pupil row id nobody can
  invent. Say that to a teacher who asks; do not sell this as more than it is.
- ⚠ **NOT IP, deliberately.** A Mauritian school behind one NAT and mobile CGNAT
  put a whole class on one address — an IP cap locks out twenty-nine innocent
  children to stop one. It is the same reason `teacher_guest_throttle` already
  raises its ceiling to 100 for `nickname`/`shared_pin`. IP stays a wrong-PIN
  throttle key and nothing else.
- ⚠ **It FAILS OPEN.** No device code (private browsing, storage refused) is
  never capped, and an un-migrated database falls back to opening without it.
  This is an integrity nicety, not an entitlement check — the opposite call from
  `questions.js`.
- ⚠ It never fires on the **same** name (`name_taken` already answers that), on
  an **unsubmitted** attempt, or over a teacher-granted `retry_allowed`. It is
  checked **after** the PIN, so it cannot be used to probe an assignment.
- ⚠⚠ The checkbox is shown **only for the open link**, and hiding it is not
  enough — the wizard owns no state and a hidden checkbox still answers
  `.checked`, so `_buildAssignment()` gates on `access === 'nickname'` as well.
  A tick left from an earlier visit would otherwise lock a shared classroom
  tablet after its first pupil.
- The refusal **names who already finished on this device**: on a family laptop
  the honest answer is usually "your brother did it", and a bare refusal reads
  as a bug.
- `scripts/test-guest-device-cap.js` (47 checks) ·
  `scripts/sql-tests/run-device-cap-tests.sh` (the rule on a real postgres:
  fresh build, idempotency, then twelve behavioural assertions).

### The class page — one permanent link (2026-09-10, APPLIED)
`/m/<CODE>` → `materials.html` + `materials.js`, backed by
`netlify/functions/materials-library.js`. Standalone exactly like `guest.html`:
no Tailwind, no supabase-js, no engine file. Four views — **Homework**
(default), **Files**, **Subject**, **Calendar** — plus a search box.
- ⚠ **WHAT IT FIXES.** `shareMaterial()` hands out a signed storage URL for
  **one** file, and `learning_materials.link_expiry_seconds` **defaults to 3600**
  — so the message a teacher sent was one file that was dead by the evening, and
  a second file meant a second message.
- ⚠ **THE SPLIT IS THE FEATURE: the CODE is permanent, the signed URLs are
  minted per visit.** Anything that caches either half breaks it, so `/m/`,
  `materials.html` and `materials.js` are in the service worker's never-cache
  list beside `/a/`, and the function answers `no-store`.
- ⚠⚠ **THE PIN IS THE GATE, NOT THE CODE.** The first draft made the link open
  to anyone holding it, reasoning that the existing single-file share already
  did that. Wrong twice over: a classroom's whole shelf is not one file, and
  this link also lists the class's homework codes. A pupil now signs in the
  same way they already do for homework — **their own PIN** in a per-pupil
  classroom, **the class PIN plus a name** in a shared one. `info: true`
  returns only which form to draw and the class name; nothing behind the gate
  is fetched until it passes.
- ⚠ **Throttled per classroom**, in its own `teacher_guest_class_throttle`
  (`teacher_guest_throttle` keys on `assignment_id` and cannot carry it). Only
  **failures** count and a correct PIN **clears** the counter — a class of
  thirty with the ordinary handful of typos between them would otherwise walk
  the count up and lock the room out by the afternoon. Ceiling 30, because that
  number is shared by everyone behind one school NAT.
- ⚠ **Homework carries codes, never content.** No `question_ids`, no answers,
  no other pupil — and **no score**: a mark belongs on the teacher's screen
  until they have looked at it, and children comparing marks on a shared tablet
  is what this must not enable. Each card links to `/a/<CODE>`, the same guest
  runner; this page starts nothing and grades nothing.
- ⚠ **The per-pupil ROSTER is honoured**: work set for six named pupils must not
  appear on the other twenty-four's page. Expired and deleted work is excluded.
- ⚠ **`get` NEVER MINTS.** Opening the Materials tab reads the code; a read that
  created a public address as a side effect would expose every classroom a
  teacher merely *looked at*. Minting is `create`, reached only by the button
  that says so, and it is idempotent — a second Share tap must reach the SAME
  address or it orphans the first message.
- ⚠ **One `not_found` for every kind of nothing** (no such code, switched off,
  archived, deleted, malformed), or the code becomes an oracle for "does this
  classroom exist".
- ⚠ **The name is remembered per class code; the PIN never is.** One is a label,
  the other is the credential, and this runs on tablets children share.
- ⚠ **NO "Mark as done" on this page**, deliberately: that needs the PIN token a
  child only gets by opening an assignment.
- ⚠ Two defects found by **measuring the rendered page at 360px**, not by
  reading the CSS: `aspect-ratio:1` gave 41px calendar cells (31 sub-44px
  targets), and dark mode's lightened `--brand` left white button text at about
  **2.6:1**. Hence `--on-brand`, which flips with `--brand`.
- `scripts/test-materials-library.js` (116 checks) ·
  `scripts/test-materials-library-render.js` (walks the gate with a wrong PIN
  then a right one, against six awkward materials including a `<script>` title
  and a `javascript:` URL) · `scripts/sql-tests/run-device-cap-tests.sh`.

### ⚠⚠ Uploaded materials that nobody could see (fixed 2026-09-10)
Reported from the field as *"I'm sure I uploaded some materials but I no longer
see them"*. **Nothing was deleted and nothing lives in localStorage** — every
material is a `learning_materials` row plus a Supabase Storage object. Two
separate causes, both of which left the file intact and unreachable:
1. **The junction insert was fired and forgotten.** Both upload paths in
   `teacher_classroom_detail.js` did
   `await _sb.from('classroom_materials').insert({…});` with the result
   discarded, then set the status to *"Uploaded!"* unconditionally. Every list
   — the teacher's and the pupil's — reads **through** that junction, so any
   failure produced a success message over a material no one could ever see.
   ⚠ Zero rows is a refusal too: an INSERT whose RLS policy matches nothing
   returns no error and no rows.
2. **The standalone Materials screen (`engine/teacher.js`) creates no junction
   at all**, by design — you upload there, then tick classrooms. A teacher who
   never ticked had files that existed and belonged to no class.
`_shareWithClass()` now checks the result and says plainly when it failed, and
the classroom's Materials tab carries a collapsed **"Your files not shared with
this class"** list with one-tap Share. ⚠ **A failed share does NOT roll back the
upload** — the file is safely stored and one tap from being fixed; deleting a
teacher's upload because a second write failed would be worse.
### Still true
- **Location survives refresh**: `psac_teacher_loc_v1` (owner-scoped) holds tab,
  list filter, selected results and the open classroom + section.
- ⚠ **The board's `p:not(…):not(…)` rule scores (1,3,1)** and beats every
  single-id override; the teacher CSS uses `#screen-teacher#screen-teacher` on
  purpose. Paper cards carry their own ink in both themes.
- ⚠ **`.tc-cd-nav-btn span` is set three times** (base, the new override, and a
  `max-width:430px` block). Same specificity — the LAST one wins, which is why
  the readable rail labels live at the end of `style.css` with their own copy of
  the media query.
- ⚠ **A refresh superseded by a newer one resolves `undefined`** —
  `TeacherWorkspace.ensureLoaded()` waits for the newest in-flight refresh and
  judges by `loaded`, or Home shows its error state on every load.
- Not shown, on purpose: a "Scheduled" filter (nothing schedules a start), hints
  / attempt limits / answer visibility (no server support). The `?classroom=`
  share link is **inert** (nothing parses it) and is not promoted.
- Tests: `test-teacher-command-centre.js` (VM, 169 checks), `-layout.js`
  (60 screens at 360/1280 × light/dark, overflow + contrast + 44px targets;
  `--shots DIR` walks all five wizard steps), `test-classroom-materials-access.js`,
  `test-coach-teacher-layout.js`.

---

## Paying — manual MCB Juice
Stripe does not accept Mauritius-registered merchants, and the gateways that do
(Peach, MIPS) cost Rs 550–2,200 a month before any revenue. So the first
payment path is the one most small Mauritian sites actually use: the parent
sends a Juice transfer quoting a reference, and an admin confirms it.
- **Parent**: plans modal → *Pay with MCB Juice* → amount, number and a
  6-character reference (no 0/O/1/I/L — it gets typed into a Juice message) →
  *I have sent the money*.
- **Admin**: Plans tab → the queue → *Money received – open access*. The
  confirm dialog names the amount and the reference, because that tap is the
  only thing standing between a stranger and a paid plan.
- ⚠ **"Everything is free right now" and a Buy button cannot both be true.**
  The banner carries `data-free-banner` and comes down exactly when
  `juice_enabled` goes on. ⚠ The *"Grades 1 & 2 are always free"* banner stays
  — that one is permanent and still true.
- ⚠ **The browser never computes an amount.** `payment_start_juice()` takes a
  plan and a month count; the price comes from `plans.price_mur`.
- ⚠ **A failed settings lookup reads as OFF.** Offering a payment method that
  may not be configured is worse than offering none.
- ⚠ **Tapping Buy repeatedly reuses one reference.** Four rows for one transfer
  means an admin guessing which to confirm.
- ⚠ **The parent is never told access is open** until an admin has confirmed.
- ⚠ `netlify/functions/payment-webhook.js` stays a **fail-closed skeleton**.
  Its three verifiers each returned `true` directly above a commented-out block
  that activated subscriptions from the request body; `test-juice-payments.js`
  now fails if any of them returns true again.
- The next step, when volume justifies the monthly fee, is Peach Payments —
  one integration covers cards, MCB Juice, MauCAS QR, blink and Apple Pay, all
  in MUR. ⚠ Juice, MauCAS and blink **cannot be refunded** through it; only
  cards can.

## Chapter Preview — an adult opening the child's own screen
`engine/chapter_preview.js` (the picker) + `startChapterPreview()` /
`exitChapterPreview()` (app.js). A parent or a teacher picks grade → subject →
chapter and the CHILD'S OWN practice screen opens on the same 20 questions
`getQuestionsForChapter()` would deal a child — same hints, same explanations,
same server marking through `/api/check-answer` (which already accepts an adult
JWT).
- ⚠⚠ **IT WRITES NOTHING, AND THAT GUARANTEE IS NOT IN THE LAUNCHER.** A parent
  reaches it from the dashboard, where `pdSwitchStudent` has already put a
  CHILD in `ACTIVE_STUDENT_ID` and filled `DB` with her progress blob — so every
  write funnel in practice writes to **her**. `_isPreviewRun()` guards
  `recordAnswer`, `_recordMistake`, `_retireMistake`, `_saveResume`,
  `_usageBump`, `gainPoints`, `Shop.reportPracticeActivity()` and the direct
  best-score writes in `cloze.js`/`errorhunt.js` (which bypass `recordAnswer`).
  Ten questions tried by a parent would otherwise be ten attempts under her
  name, the wrong ones her mistakes, against her daily goal and her streak.
  **Same rule, same reason, as "game answers never call `recordAnswer()`".**
- ⚠ **The flag lives on `S.practice` and is cleared in `_setAssignmentContext()`**
  — the one function every practice entry point already calls to declare what
  kind of run it is. A flag cleared only by the preview's own exit would survive
  a crash, a back button or a deep link and then silently stop recording a REAL
  child's practice: it must fail towards recording, never away from it.
  ⚠ `_roundCompleteNext()` calls that same reset, so it carries the flag across
  explicitly — without that, the adult's SECOND round records.
- ⚠ **It does NOT go through `startChapterDirect()`**, which applies
  `lockedChapters` and `_planAllowsChapter()` read from `DB` — i.e. from
  whichever child was last loaded. A parent who locked a chapter for one child
  would be refused a preview of it and told it was "locked by your parent".
- ⚠ **`showScreen()` has ONE named exception to `_KID_ONLY_SCREENS`** for this
  (`practice`, `cloze-play`, `cloze-list`, and only while a preview is running).
  A parent must not WANDER into a kid screen; choosing to look at one is a
  different thing.
- ⚠ **`renderParentDashboard()` reset the panels from a HARD-CODED list** —
  `['calendar','shop','messages','settings']` — while `_PD_PANELS` is the real
  one. It had already drifted before this feature existed (`papers` was
  missing); `preview` made it visible, so leaving a preview showed the children
  page with the chapter picker still open **underneath** it. It now calls
  `PD.showChildrenPanel()`, derived from `_PD_PANELS` in the module that owns
  it. **A list of panels written out twice is a list that drifts, and nothing
  fails when it does.**
- ⚠ **Leaving returns to the TAB, not the screen.** `showScreen('parent')` runs
  `renderParentDashboard()`, which resets to My Children — so an adult who
  opened a chapter from the preview tab was returned to a different page than
  the one they left. `exitChapterPreview()` calls `PD.mainTab('preview')` /
  `TeacherMode.switchTab('preview')` **after** the screen is shown.
- ⚠ **A preview has more exits than its own ← button** — ⏸️ Continue later,
  Back to chapters, `SubjectHub.back()`, a help link — and each aims at a kid
  screen. Measured in TEACHER mode: Continue later called `_saveResume()` (a
  no-op here, so its "Saved — tap this chapter again" toast was a lie), landed
  on `chapter-select`, was bounced to `_returnToParentDashboard()`, and the
  parent dashboard rendered **"could not be loaded"** because a teacher has no
  children. That branch now ends the preview instead, returning to the surface
  it was opened from, and the preview chrome hides the pause button outright.
- ⚠ **"Mixed" is not `difficulty: null`.** `getStaticQs()` matches the level
  EXACTLY and no question carries a null one, so
  `getQuestionsForChapter(id, null, 20)` returns an EMPTY ARRAY. The first build
  called it that way and **every chapter** answered "there are no questions in
  this chapter yet", which reads as missing content rather than a selector bug.
  A mixed round calls `getMixedQuestions()` — as the child's own always has.
  `maxDiff` is 4, not `DB.restrictions.maxDifficulty`: that is the loaded
  CHILD's cap, and the preview is not about that child.
- ⚠ **Nothing is kept, deliberately** — no adult score history anywhere. The
  round's own tally is `S.practice.session`, in memory, shown by the existing
  round-complete modal and gone when they leave. Storing it would mean a second
  reporting surface, new columns and new RLS, to answer a question nobody asked:
  how a parent did on their child's homework.
- One module, two surfaces (`pd-preview-host` / `tc-preview-host`), the same
  rule as PaperBuilder. `scripts/test-chapter-preview.js` — 46 checks, and it
  fails if any guard is removed.


## Subject certificates — one per subject, overwritten in place (2026-09-21)

`engine/certificates.js` · `#screen-certificates` · PD tab **🎓 Certificates** ·
`migrations/20260921_subject_certificates.sql` · `subjects/_counts.js`
(generated) · `scripts/test-certificates.js` (790 checks, no browser) ·
`scripts/test-certificate-render.js` (65 checks, real Chrome).

A child earns **one certificate per SUBJECT**, never per chapter, and it climbs
a ladder of nine levels as they master more of that subject's questions. The
top one, **Subject Master**, needs every practisable question in every chapter
answered correctly.

| # | Level | Gate |
|---|---|---|
| 1 | 🌱 Starter | ≥ 1 question mastered |
| 2 | 🧭 Explorer | 5% |
| 3 | ⭐ Rising Star | 15% |
| 4 | 🎯 Achiever | 30% |
| 5 | 🏅 High Achiever | 50% |
| 6 | 📜 Scholar | 70% |
| 7 | 💎 Expert | 85% |
| 8 | 🏆 Distinction | 95% |
| 9 | 👑 Subject Master | **every** question, **every** chapter |

- ⚠ **ONE CERTIFICATE PER SUBJECT, OVERWRITTEN.** A new level replaces the old
  certificate; it never adds a second one. `DB.certificates[packId]` keeps the
  serial and the first issue date so the document has a stable identity, and
  overwrites the level and the numbers. A wall of nine Maths certificates is a
  worse reward than one that got better.
- ⚠ **"MASTERED" IS `state = 'secure'` AND NOTHING ELSE** — the per-question
  state machine in `practice_selector.js` and its SQL twin: right first time,
  or right **twice running** after a miss. `improved` (one correct answer after
  a miss) deliberately does not count; `legacy_seen` counts towards *explored*
  and nothing else. A certificate a lucky guess can buy is worth nothing to the
  parent reading it.
- ⚠ **THE GATE IS THE PERCENTAGE AND ONLY THE PERCENTAGE.** Absolute question
  floors ("50 for Explorer") were written first and thrown out: put
  grade1-health (252 questions) beside grade4-french (2,164) and the same floor
  is 20% of one subject and 2% of the other, so the small subject can never
  reach the upper levels at all. `test-certificates.js` walks all nine levels
  in a 40-, 100-, 252-, 1,000- and 4,000-question subject.
- ⚠ **LEVEL 9 IS EXACT, AND EVERY PERCENTAGE IS FLOORED.** 3,999 of 4,000 is
  Distinction, not Master, and prints as 99%, not 100%.
- ⚠ **THE DENOMINATOR IS THE WHOLE SUBJECT, NOT WHAT THE CHILD CAN REACH.** A
  parent difficulty cap (`DB.restrictions.maxDifficulty`) shrinks what gets
  dealt; scoring against *that* would hand out an easier mastery for a tighter
  cap, which is the opposite of what the cap is for. The cap is reported in
  **More info** as questions being held back.
- ⚠ **Generated questions are excluded and cannot be otherwise** — a generator
  mints a fresh id per call, so there is no fixed number of them and no durable
  identity to record progress against. The info sheet says so rather than
  pretending the subject is smaller. Same reasoning as `PracticeJourney`.

### Where the two numbers come from
- **Numerator** — `student_subject_progress()`, ONE rpc, per-(pack, chapter)
  aggregates of `student_question_progress`. See [database.md](database.md).
- **Denominator** — `subjects/_counts.js`, GENERATED by
  `node scripts/build-subject-counts.js`, **injected on demand** by
  `Certificates._ensureCounts()` and deliberately absent from `index.html` and
  from the service worker's `SHELL_FILES`. 15 KB in the first paint of every
  child, for a screen most of them open once a month, is the cost the lazy pack
  index exists to remove.
- ⚠ **`scripts/check.js` FAILS when `_counts.js` has drifted** from the
  question files, and `preflight.js` rebuilds it as step 2. A stale table does
  not throw: it reports "1,412 of 1,419" for a child who has finished the
  subject, or awards Subject Master while seven new questions sit unanswered.
- ⚠ Neither source is the progress blob. `DB.certificates` is a **snapshot**
  for the parent card and for an offline visit — see [data-storage.md](data-storage.md).

### The disclaimer — one string, five surfaces
`Certificates.DISCLAIMER` carries `short` (on the artwork), `long` (the
showcase warning and the info sheet) and `share` (the WhatsApp line). They must
keep saying the same thing, for the same reason the app share copy must: two
wordings drift and only one of them ever gets corrected.
- ⚠ **The disclaimer is IN THE PICTURE.** A caption is lost the moment the image
  is forwarded on its own, and the image is the thing a parent forwards.
- ⚠ **The screen's warning is above the first certificate and is not
  collapsible.** A certificate that looks official and is not is the one way
  this feature can do harm. `test-certificate-render.js` fails if it moves below
  the cards or ends up inside a `<details>`.
- ⚠ **`DISCLAIMER.short` is THREE LINES and the length is part of the layout.**
  They are drawn into a reserved footer band; a fourth line goes under the
  frame.

### The artwork — nine designs, not one design in nine colours
One inline `<svg>`, 1000×707 (A4 landscape), built by `Certificates.svg()`.
- ⚠ **SELF-CONTAINED.** No `<image>`, no webfont, no external anything. The same
  markup is rasterised through an `<img>` with a `data:` URL onto a canvas for
  the shared PNG, where no stylesheet of ours is loaded — anything fetched from
  outside silently disappears from the picture and **nothing throws**. The test
  rasterises one and counts non-paper pixels.
- ⚠⚠ **EVERY GRADIENT ID IS UNIQUE PER RENDER (`cg-<n>`, `cv-<n>`).** An SVG's
  `<defs>` ids live in the **whole document**, not in the element, so nine
  certificates on one screen all carrying `id="cg"` paint with the FIRST one's
  paper. Found in a screenshot of the card grid: Subject Master — the only dark
  design — rendered on the Expert certificate's pale green ground with gold text
  on it, unreadable, with nothing anywhere reporting a problem.
- ⚠ **NEVER COLOUR ALONE.** Each level changes its frame *and* its seal emblem
  as well as its palette, so the levels are still told apart on a black-and-white
  printout. The test asserts nine distinct frames and nine distinct emblems.
- ⚠ **THE FOOTER IS A RESERVED BAND.** Nothing decorative may enter it: the seal
  ribbon is bounded, and every bottom-edge ornament skips the middle of the
  page. The first draft had both the ribbon and the frame running through the
  words *"affiliated with, endorsed by"*.
- ⚠ **SVG has no text flow.** `nameSize()` steps the name down by length, and
  the browser test measures **every `<text>` element's real bounding box**, for
  all nine designs, with the longest realistic Mauritian double-barrelled name
  in them.

### Sharing and saving
- **Share** → PNG through `navigator.share({files})`, falling back to a text
  share, falling back to a download plus a WhatsApp link.
- **Save image** → the same PNG at 2× as a download.
- **Save as PDF** → a new window with its own stylesheet and `@page A4
  landscape`, exactly like the printable practice paper, because `style.css` is
  not loaded there.
- ⚠ **THE PICTURE CARRIES THE NAME; THE MESSAGE DOES NOT.** A shared score in
  this app deliberately never carries a child's name, id or profile link, and a
  text message is forwarded far beyond whoever it was sent to. The certificate
  image is a file the family chose to attach; the words beside it stay
  anonymous. `test-certificates.js` fails if a name reaches `shareText()`.

### "More info" — and **Where to work next**
The six headline numbers, the distance to the next level, what "mastered" means
in plain words, the cap note when there is one, then **Where to work next** and
the full per-chapter table.
- ⚠⚠ **CLOSEST TO FINISHING FIRST.** The table was once the only view and was
  sorted by the MOST remaining, so a chapter sitting at **89 of 90 with one
  wrong answer** — the single cheapest point in the whole subject — was the
  **last row on the screen**. Reported by a user in exactly those terms: *"he
  dont need to find everywhere to know where he missed that one point"*. Fewest
  remaining first, and at equal distance a known wrong answer outranks an
  untried question because it is a precise target.
- Each of the top five carries a one-tap action: **Fix N →** when wrong answers
  are waiting (`PracticeJourney` mode `fix`), **Practise →** otherwise (mode
  `new`). The selection policy stays in `practice_selector.js`, where it is
  tested; this only chooses the mode.
- ⚠ **`Certificates.practise()` is the sanctioned route and every step matters**:
  `PackLoader.ensure()` (manifest) → `activateSubjectPack()` →
  `QuestionLoader.loadSubject()` (the questions, which the manifest does **not**
  carry — `SubjectHub.open()` has the same comment because a screen drawn
  without it reported "0 questions" on a pack holding 499) → then
  `PracticeJourney.start()`, which routes through `startChapterWithSet` →
  `startChapterDirect` so the chapter lock, the plan check and the cloze
  redirect all still run. **Never start practice any other way.**
- ⚠⚠ **AND THE PER-QUESTION PROGRESS — the step that is easy to miss.**
  `PracticeJourney` picks its set from `QuestionProgress.forChapter()`, a
  **local cache that only `loadChapter()` ever fills**. The chapter screens fill
  it on the way in; this entry point did not, so every question bucketed as
  *unseen*, `needs` was empty, and a **"Fix 1 →" tap selected nothing**.
  Measured in the browser: 12 eligible questions, **0 progress rows**. Reported
  as *"I click and nothing happens"*.
- ⚠⚠ **AND THE EMPTY STATE WAS INVISIBLE.** `PracticeJourney.showEmpty()` writes
  its explanation into `#pj-sheet-body` — right for every other caller, because
  they all open the options sheet first — so **244 characters landed in a hidden
  element** and the button read as dead. Two fixes: this screen now checks the
  buckets itself before calling `start()` (reading state, not duplicating the
  selection policy) and falls back to a smart set **with a toast saying why**;
  and `showEmpty()` now **toasts when the sheet is closed**, so no future caller
  can fall into the same hole.
- ⚠ The lesson generalises: **`PracticeJourney.start()` assumed its caller had
  opened the options sheet.** Check that assumption before adding a third entry
  point.
- ⚠ **CHILD SESSIONS ONLY.** `showScreen()` bounces an adult off a kid screen,
  so a parent tapping one of these would be thrown back to their dashboard with
  nothing explaining it. The buttons are not drawn for them at all; the ranked
  list still is, with "hand the device over" instead.
- ⚠ The "Left" column says how many are **left**, with "· N to fix" beside it.
  It used to say only "5 to fix" for a chapter that was 43/135, which hid the
  92 questions never tried.
- The full table is ordered the same way, finished chapters last, so the two
  views agree rather than contradicting each other.

### A child practising outside their own grade
A parent can unlock extra grades (`GradeAccess`: own grade always, plus
`restrictions.allowedGrades`, or the legacy `crossGradePractice`/
`crossGradeSearch` flags), and a child who stretches upward earns a real
certificate there.
- **Own grade shows every subject; another grade shows only what was started.**
  Their own grade is the set they are meant to see whole, so the untouched ones
  sit there as an invitation. Showing all eight Grade 9 subjects to a Grade 5
  child whose parent unlocked the grade would bury their own five.
- ⚠⚠ **TWO PACKS CAN SHARE A NAME ACROSS GRADES.** A Grade 5 child who has
  practised Grade 6 Maths had **two cards both titled "🔢 Mathematics"**,
  distinguished only inside the certificate thumbnail at about four pixels
  tall. Other-grade cards now carry a **grade chip** on the card itself, and
  own-grade cards deliberately do not — on every card it would be noise.
- Own grade first, then an **"Other grades"** heading. The certificate artwork
  always named its grade correctly ("Grade 6 · Mathematics"); it was the card
  around it that did not.
- ⚠ **ONE OTHER GRADE AT A TIME**, behind a tab strip, once there is more than
  one. A child who has practised three other grades would otherwise scroll past
  two dozen full-size certificates to reach the end of their own screen.
- ⚠ The tab opens on the **most recently practised** grade, not the lowest: a
  child who did Grade 4 once last term and Grade 6 this morning should not land
  on the one they have finished with.
- ⚠ **The chosen tab is scoped to the CHILD** (`_otherTabOwner`), reset in the
  render. Checking only "is the remembered grade still in the list" was not
  enough — a parent switching between two children who had both practised
  Grade 4 kept the first child's tab, because 4 was still a valid answer.
- ⚠ **The summary counts the child's OWN grade.** A cross-grade pack only
  appears because it was started, so it is always its own numerator: counting
  it inflated both halves and read "3 of 7 subjects started" for a child who
  had started three of five.
- ⚠ **A grade the parent has SINCE revoked keeps its certificate.** The work was
  really done. But the card says *"Grade 4 is not unlocked right now, so this
  certificate stays as it is"* instead of nudging toward a level the child
  cannot currently practise for. ⚠ The lock is decided **only in a child
  session** — restrictions live in the progress blob, and in parent mode the
  blob on screen belongs to whoever was loaded last, so the parent view does
  not claim.
- This is also the path a **grade change** takes: a child moved from Grade 4 to
  Grade 5 keeps their Grade 4 certificates, marked locked until a parent
  unlocks the grade again.

### ⚠⚠ Two renders in flight at once
`Certificates.open()` called `showScreen('certificates')`, and the render
dispatch at the foot of `showScreen()` **also** calls `render()` — so every tap
on the board note started two loads. Both awaited the same rpc and both pushed
into one shared array, and the screen drew **every subject twice**: *"2 of 10
Grade 5 subjects started · 850 questions mastered"* for a child with 5 subjects
and 425. It failed silently and it was timing-dependent.
- `open()` now sets the host and lets the **one** dispatch render.
- `load()` carries a **generation counter**, builds into a local array and
  publishes to `_records` only if it is still the newest load. That covers every
  other route in: a stabbed Refresh button, or a parent switching child faster
  than the rpc answers.
- ⚠ Any new caller of `render()` inherits this for free. **Do not** go back to
  pushing into `_records` as you build.
- `test-certificate-render.js` drives `open()`, a two-render race and a
  three-render burst, and asserts one set of cards each time. Verified
  non-vacuous: with the original code it reports 14, 14 and 21 cards.

### ⚠ "no_student" means two opposite things
`student_subject_progress()` **raises with the message `no_student`** when it is
called without a token, and that message landed in the same `_error` slot as
the screen's own "we could not work out which child this is" sentinel. A child
whose token had expired was therefore told *"Open a child first to see their
certificates"*. The internal one is now `no_subject`; a refused or unreachable
fetch is `fetch` and gets its own message, with the server's wording kept in
`_errorDetail` for display and never for a branch.
- ⚠ A refused fetch with nothing cached must **not** draw a full set of empty
  certificates. That tells a child who has practised for months that they have
  done nothing.

### The parent's copy
PD tab 🎓 Certificates, `#pd-panel-certificates`.
- ⚠⚠ **IT HAS ITS OWN MARKUP AND ITS OWN BODY ELEMENT (`#pd-cert-body`), NOT
  `PD._mountPanel()`.** That helper — how the shop and the calendar panels are
  built — **MOVES** a screen's nodes into the dashboard permanently. Used here,
  a parent opening the tab would empty the child's own My Certificates screen,
  and `Auth.switchToStudentSelect()` never reloads the page, so the child would
  then find a blank screen with nothing explaining it.
  `Certificates.render(id, hostId)` paints into whichever host asked; the
  browser test drives a parent view and then a handover and checks both.
- The parent picks the child with a chip row (only when there is more than one).
  A child never sees that row.
- ⚠ **Only the child's own session writes `DB.certificates`.** A parent looking
  at a child must not mint that child's issue date, and in parent mode the blob
  on screen may not be the one being saved.

### When the server cannot be reached
The last aggregate is cached in `localStorage` (`psac_cert_prog_v1_<studentId>`)
and the screen says it is showing it. ⚠ Rendering zeros for a child who has
practised for months would read as lost work, which is the one thing a progress
screen must never do.

## The parent dashboard tab strip

⚠ **🎁 Invite is a BUTTON, not a tab** (`#pd-invite-btn`, beside Add child and
Add parent). It was `role="tab"` in the tablist while opening a **modal** and
selecting no panel — wrong for a screen reader, which announces a tab that
selects nothing — and as the eighth control it was what tipped the strip onto a
second line. Same handler, same modal; only its home changed.
- ⚠ **`_PD_PANELS` is the list of real tabs** and Invite was never in it, which
  is how the mismatch survived: nothing tied the strip's contents to the panels
  it was supposed to select.
- The strip still wraps below ~1000px with seven tabs. Adding another one is a
  real cost; check it against `_PD_PANELS` and against the width before you do.

## The printable practice paper (`generatePrintablePaper()`, app.js)
A pop-up window holding a 100-mark paper — Section A (30 × 2, or 20 × 2 for
maths) and Section B (10 × 4, 15 for maths) — plus a second window with the
answer key, opened only by the adult-facing button. Gated on the
`printable_papers` plan feature, and it honours `lockedChapters` and
`maxDifficulty` exactly as `assembleExamPaper()` does.

### The watermark (`_paperWatermarkCSS()`, engine/helpers.js)
A pale diagonal tile behind everything on **all four printed documents**:
the PSAC practice paper (PSAC EXAM PRACTICE) and its answer key (ANSWER KEY, in
red, so a key left on a desk announces itself), and the NCE paper
(PRACTICE PAPER) and its mark scheme (MARK SCHEME).
- ⚠ **It lives in `helpers.js`, not `app.js`.** index.html loads helpers.js
  **third** and `nce_paper.js` **sixth** — both long before app.js at 33. A
  shared builder that only exists once app.js has run is one `nce_paper.js` can
  reach by luck of call timing and nothing more.
- ⚠⚠ **`nce_paper.js` is `require()`d from Node** (`scripts/nce-generate-paper.js`,
  `test-nce-paper*.js`), where there is no helpers.js and no globals at all. Its
  `PAPER_CSS` is a **module-level `const`**, so interpolating the watermark there
  threw *ReferenceError: _paperWatermarkCSS is not defined* on `require()` and
  took the generator and every NCE test down with it — at LOAD time, not render
  time. It now goes through `paperWatermark()`, which resolves the global in the
  browser and `require("./helpers.js")` under Node, and **throws rather than
  skipping**: a command-line paper without the watermark the app prints is a
  different document, and that generator exists to check the two are the same.
  `helpers.js` carries a `typeof module` export guard for it.
- ⚠ **NEVER the app name on the NCE paper.** NCE is Grades 7–9 and PSAC is 1–6,
  so "PSAC" across it names the wrong exam — and the cover promises the sheet
  "carries no examination-board branding".
- ⚠ **A tiled background on `body::before`, never a `position: fixed` overlay.**
  A fixed element is painted on the FIRST SHEET ONLY by several print engines, so
  the sheets the child actually writes on would carry nothing. A repeating
  background on a box spanning the whole document tiles down every page by
  construction. Measured on 6- and 9-page papers.
- ⚠ **`z-index: -1` is what puts it behind the text.** A negative-z-index
  descendant paints above its parent’s background and below its in-flow content,
  so no rule is needed on every child — and adding one is how a watermark ends
  up on top of the questions.
- ⚠ **`print-color-adjust: exact`, or Chrome prints nothing.** "Background
  graphics" is OFF by default in the print dialog. Scoped to that one element
  on purpose: on `.paper` it inherits, and the navy section headers start
  printing solid too, which is a different decision about the pupil’s ink.
- ⚠ **`encodeURIComponent` the SVG.** It carries `#`, `<` and `"`, and any one
  of them ends the `url()` early and leaves no background and no error.
- ⚠ **The footer disclaimers STAY.** They exist so a printed sheet cannot pass
  for an MIE / Ministry document; the watermark repeats that on every sheet where
  it cannot be cut off, and does not replace them.
- ⚠ **Paleness is the design.** Measured in printed pixels at print media across
  all four documents: the tint sits at ~91% luminance and the body ink still
  clears **17.2–17.3:1** over it. One constant (`opacity`, default 0.05) moves it.
  `scripts/test-print-watermark.js` samples REAL pixels across the sheet width at
  three depths, and classifies them as *pale but tinted* — ink and rules are not
  white either, so a naive "not white" check passes on a sheet with no watermark.

### Most choice questions are printed WITHOUT their options
- ⚠ **A printed A/B/C/D block is a worse exercise than the exam it imitates.**
  Four options carry the answer's wording, spelling and grammar; a child who can
  recognise « que » has not shown they can write it. Paper is the one surface
  where that scaffolding can be taken away, so the paper keeps **`_PRINT_MCQ_KEEP`
  = 5** lettered questions at the top and prints every other choice question open,
  with a line to write on. **Section B is written out entirely.**
- ⚠ **Not every MCQ survives the conversion, and that is the whole difficulty.**
  A stem that points AT its options ("Which of the following…", "Choisis la
  phrase correcte", "Identifiez la phrase CORRECTE :") asks nothing once they are
  gone, and a bare statement stem ("British rule began in…", "A computer virus is
  a program that:") is a sentence, not a question. `_printNeedsOptions()` keeps
  those lettered. So does a true/false pair (already an open question, two words
  wide), a `multi`, an "All of the above" option, and an answer over 90
  characters — writing that out is a handwriting exercise.
- ⚠ **It fails SAFE, and the asymmetry is the point.** A question printed WITH
  options it did not need is merely less useful. A question printed WITHOUT
  options it needed cannot be answered at all, and the child finds that out with
  a pencil in their hand. Every shape the rules cannot read keeps its options.
- ⚠ **The rules were measured against the built bundles, not reasoned about**
  (2026-09-09: 23,647 choice questions, 48 packs, **20.0%** must keep their
  options — grade5-french 5%, grade4-history 32%, grade9-ict 62%, whose bank is
  largely "X is a program that:"). That spread is why this is a per-question
  reading and not a per-pack switch. `scripts/test-printable-open-ended.js` holds
  the hand-read verdicts, rebuilds a real paper, and re-measures the corpus.
- ⚠ **Two selection preferences do the real work, and the budget alone did not.**
  Section A's rota picks the open-askable question *within* the chapter whose turn
  it is (the rota, and so `examWeight`, is untouched), and Section B prefers L4
  problems that read on their own. Without the first, a grade4-history paper
  printed **15** lettered blocks of 40 — a third of that bank points at its own
  options and the rota met them by chance. Measured after: **5–7** on every live
  pack, grade9-ict included.
- ⚠ **The answer key says the options were hidden** and tells the marker to accept
  any answer that means the same. Without that line an adult marks a written
  answer against one model wording.
- ⚠ Options are lettered from **the options that exist**, not a hard-coded A–D.
  Every Vrai/Faux question used to print two more empty bubbles labelled C and D.

## Child-facing vs parent-facing, deliberately
- The child's activity recap is **unfiltered** — the parent's `_filters` live in
  localStorage per browser and on a shared phone would silently blank the child's
  own record of their work.
- **There is no "missed sessions" list on a child's screen, and must not be.** On
  a parent's calendar an unticked row is information; on a child's it is a list of
  their failures served every time they open the app.
- Family overview is **ordered by who has been quietest, never by score** —
  ranking siblings is the wrong thing to hand a parent, and accuracy is not
  comparable across grades.
- A chapter with no attempts is reported as **not started**, never 0%.
- ⚠ Report copy says **"they"**, not "she". Nothing records a child's gender.
- The chapter card says **"correct"**, never "mastery" — `getChapterPct()` is
  accuracy, so 2/2 once read as "100% mastery ★★★". `_chapterProgress()` is the
  single reading used by both card and tiles; `attempted` counts **answers given**,
  not distinct questions seen, so the card never claims "12 of 19 done". ⚠ An
  unknown pool (`total === 0`, grid painted before QuestionLoader answered) must
  **withhold** the mastery claim, not assume it.
- The daily goal deliberately does **not** drive the streak — breaking a 12-day
  streak because a nine-year-old managed three questions is a punishment no
  child-facing app should hand out. `daily[key].g` latches the celebration once
  per day.
- Reports and the digest use **rolling 7-day windows, not calendar weeks** (on a
  Monday a calendar week holds one day), and a previous window of zero renders
  "new", never +100%. **"No dated history" means unknown, never idle** — that
  distinction is the difference between an accurate digest and telling every
  parent their child has stopped working.
- Derived activity rows are **never written into `schedule_entries`** — that table
  is parent-editable, and storing actuals there would let a parent delete the
  record that a mock exam happened.
- A parent's own settings apply to children by **merge, never replace** —
  `lockedChapters` is per-child and must survive the write.

---

## Teacher tier — a trust level, not a plan
`profiles.teacher_tier` holds **`unverified` | `verified`** and gates ONE thing:
how many guest classes a teacher may create (`guest_assignment_limits(tier)`,
read by `create_guest_assignment` as
`CASE WHEN v_tier = 'verified' OR v_role = 'admin' THEN 'verified' ELSE 'unverified' END`).
It does not touch real classrooms, pupil PINs, materials or results.
- ⚠ **Every teacher starts `unverified`** — `setTeacherStatus(id,'approved','unverified')`
  hard-codes it on approval, and the auto-approve path lands there too. A card
  reading "✅ Approved · unverified" is **not** an unconfirmed email: an account
  whose email is unconfirmed has no profile row in that list at all and appears
  under **pending registrations** instead (`!email_confirmed_at && !confirmed_at`).
- ⚠⚠ **TWO DIFFERENT THINGS ARE CALLED "TIER"**, and the Teachers tab select was
  built from the wrong one. It offered **Free / Premium / School** — the
  SUBSCRIPTION plan — while writing `teacher_tier`. So `verified` was
  unreachable (the one thing the control exists for), and every option it did
  offer wrote a word nothing recognises: `admin_set_teacher_status()` answers
  `bad_tier` for them, but the select bypassed it with a raw
  `.update({teacher_tier})`, and the SQL above folds anything that is not
  `'verified'` into `unverified` — **silently, with no error anywhere**.
  Found 2026-09-17 by an admin who went looking for "Make verified"; production
  held zero corrupted rows, so nobody had used it.
- ⚠ The change goes through `admin_set_teacher_status`, **not** through
  `setTeacherStatus()`: that helper emails a teacher it believes is newly
  approved, and decides "newly" from `_teacherQueueStatus`, which is empty
  until the Members tab has loaded the queue. A tier change routed through it
  re-sends "you have been approved" to a teacher approved weeks ago.
- The other control — **⭐ Make verified** in the teacher queue at the top of
  the **Members** tab — still exists, but for an already-approved teacher it is
  collapsed behind a `<details>` reading "N existing teachers", which is why it
  reads as missing. The Teachers tab row is where an ongoing setting belongs.
- `scripts/test-teacher-tier.js` reads the two allowed words **out of
  `supabase-schema.sql`** and checks the select, the writer and
  `GUEST_LIMIT_DEFAULTS` against them, so this cannot drift in one place again.

## Admin › Members — four status filters, TWO tables
The status dropdown is not one list filtered four ways. `active` and the
`profiles` half of `all` query **`profiles`**; `pending` and `setup` go to
**`auth.users`** through `/api/pending-registrations`, which takes a `state`.

| Filter | Means | Read from |
|---|---|---|
| `active` | has a profile row | `profiles` |
| `pending` | registered, email never confirmed | `auth.users`, `state=pending` |
| `setup` | email confirmed, still no profile | `auth.users`, `state=setup` |
| `all` | `active` + `pending` | both |

- ⚠⚠ **A profile row is written at FAMILY SETUP, not at sign-up or sign-in** —
  `Store.createProfile()` is called from the add-first-child step (`auth.js`) and
  from the teacher-tab bootstrap, and **nothing else**; there is no trigger on
  `auth.users` (checked on production: `pg_trigger` is empty). So confirming an
  email creates no profile, and until `setup` existed those accounts were in
  **neither** list and invisible to an admin. Measured 2026-09-23: **15 of 64**,
  8 of whom had signed in and given up during setup, 7 never signed in.
- ⚠ **A `setup` row has NO "Activate manually" button.** The account is already
  confirmed, so the POST answers 409 — offering it teaches an admin that a working
  account is broken, which is the confusion the filter exists to end. The row
  carries `last_sign_in_at` instead, which is what separates "never came back"
  from "gave up in setup".
- ⚠ **`activatePendingRegistration()` treats a 409 as a STALE ROW, not a failure**
  — it drops the row and re-reads. The status is carried out of
  `_pendingRegistrationRequest` on the error object for exactly this.
- ⚠ **Never decide which table to read with a negative** (`status !== 'pending'`).
  Both collectors — `copyMemberEmails()` and `broadcastAudience()` — used to, and
  a negative silently classes any NEW filter as profile-backed: pressing Copy
  under `setup` would have returned the wrong people with no error. `_pendingState()`
  / `_isPendingList()` are the single definition; `scripts/test-member-status-filters.js`
  fails on a negative reappearing in either function.
- ⚠ **`state=setup` needs the FULL set of profile ids to answer at all.** A partial
  read reports everyone missing from it as never having finished setup, so a failed
  or non-array read answers **500** rather than the other question.
  `scripts/test-pending-registration-states.js` drives the real handler for this.
- The `all` filter still means `active` + `pending` only — deliberately unchanged,
  because it also feeds the broadcast audience. Widening it would silently enlarge
  who an admin is about to email.

## Admin › Members — a family's settings, fixed without signing in as them
Built 2026-09-11 for support calls ("my child cannot see Science"). In a
member's **👶 Children** list, each child has **⚙️ Settings**:
- **What is not at its default**, in plain words (`SupportSettings.describe`).
- **Why can or can't they see it?** — every live subject of the child's grade
  (plus granted grades), each chapter open or closed with **every** layer that
  closes it: account disabled/blocked, site-wide kill switches, grade not
  granted, parent lock, expiry vs bought chapters, plan list (only while plan
  limits are on). `SupportSettings.explainChapter`, pure, in helpers.js.
  ⚠ It mirrors `_planAllowsChapter` / `_adminBlocksChapter`; `questions.js` is
  what actually decides. Change one, check the other.
- **Controls** (super admin only): exam mode, hints, Game Zone, hardest level,
  extra grades, chapter locks, a new child PIN, and a "why" field saved with each
  change. Recent admin changes are listed from `admin_actions`.
- ⚠ **Writes go through `admin_patch_student_settings()` only** — never a
  whole-object `students.update({settings})` from admin.js (a test asserts it).
- ⚠ **The child's device used to read settings ONLY at PIN login**, so a lock
  set later — by a parent too, not just an admin — stayed invisible until the
  next PIN. `Auth._refreshChildSettings()` now re-reads `students.settings` on
  resume and on the session guard's focus/online/30-minute check (throttled to
  once a minute), merges with `SupportSettings.mergeServer` (server wins on the
  nine parent keys, device-only keys survive), and **never applies mid-exam or
  mid-round** (deferred 60 s and retried). A failed or malformed read changes
  nothing. A parent previewing a child is excluded. *Apply now* = Force Logout.
- Tests: `scripts/test-support-settings.js` (49), `run-admin-support-tests.sh`
  (37, real postgres), `scripts/test-admin-child-settings.js` (real Chrome, 360px).
