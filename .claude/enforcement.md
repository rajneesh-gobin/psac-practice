# Where Each Rule Is Enforced

The client decides what to *draw*. The server decides what a child *receives*.
Never move an entitlement decision into the browser.

| Rule | Enforced in | NOT enforced by |
|---|---|---|
| Which questions a child gets (plan, kill switch, entitlements, expiry, blocks) | `netlify/functions/questions.js` (service role) | `_planAllowsChapter()` — UI only |
| Credits earned | `record_student_activity()` RPC (idempotent, reads `current_student_id()`) | anything client-side |
| Points earned, and the level on the leaderboard | `_award_points()` in SQL, keyed `(student_id, kind, ref)` so a thing pays **once** — called by `record_question_progress()`, `award_activity_points()` and `add_friend()` | `DB.xp` / `gainPoints()` — an optimistic prediction, corrected on the next flush |
| Whether the GLOBAL leaderboard exists at all | `leaderboard_enabled()` (from `global_settings`, **default false**) — `get_points_leaderboard()` returns no rows to anyone while off | `#dash-global-lb` being hidden — presentation only |
| Credits spent | `purchase_chapter()` / `purchase_subject()` (price + balance read server-side, row-locked) | the Buy button |
| **Money → access** (manual MCB Juice) | `payment_admin_confirm()` — an admin verifying a real transfer. It moves `profiles.expires_at` **and** the `subscriptions` row together | `payment_start_juice()` / `payment_mark_sent()`, which grant **nothing**; and the browser, which never sees a price it did not receive |
| Expired account | `questions.js` | `Auth.isAccessExpired()` — picks wording only |
| Forum identity (`author_name`/`author_type`) | `forum_set_author` BEFORE INSERT trigger | the browser (it no longer sends them) |
| Parent PIN, when it mints a session | `netlify/functions/parent-pin-signin.js` + `parent_pin_attempts` (service role) | `_pinMatches()` — a local convenience check |
| Whether an automatic email is sent | `wantsEmail()` / `digestDue()` in `workers/lib/mailer.js`, reading `profiles.preferences` with the service role | the Settings toggles, and anything in the request body — `notify.js` is called by a CHILD's token and must not let them silence their parent |
| Who an admin broadcast reaches | `workers/api/admin-broadcast.js` (service role resolves ids → addresses, always Bcc) | the browser, which only ever sends ids and never sees an address |
| Parent's own `lockedChapters` | client only — **deliberate**: the parent is not the adversary, and per-child server filtering would make the question cache per-child |
| Which GRADES a child may use (`restrictions.allowedGrades`) | client only, same category as `lockedChapters` — `GradeAccess` in `engine/helpers.js` | `questions.js`, which still decides what the family's plan covers |

Ordering that is the whole feature, in `questions.js`:
- **expired** ⇒ the allowed list becomes *exactly* the live entitlements, even on
  an unlimited plan and even with plan enforcement off.
- **not expired** ⇒ entitlements are *added* to the plan. Buying is never subtractive.
- Free grades bypass the plan list and expiry, but **not** moderation blocks or
  the admin kill switch.

⚠ `security_events` rows prefixed `client:` are **hints, not evidence** — a real
attacker does not call `flag_security_event()`. Never build enforcement on one. A
referral burst is flagged, never auto-blocked: a genuinely popular referrer looks
exactly like a farm for the first few hours.
