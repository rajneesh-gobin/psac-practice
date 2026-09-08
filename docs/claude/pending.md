# Pending / not yet done

> Part of the PSAC brief. Start at [`CLAUDE.md`](../../CLAUDE.md) — it carries the
> architecture, the rules that apply anywhere, and the index to these files.
> The outstanding decisions and unshipped work. Re-check each against production before trusting it.
> Long-form history and how each rule was found: grep `ENGINEERING-NOTES.md`.

⚠ Nothing in any `.md` outranks the code or the live database. Measure, then edit.

---
## Pending / not yet done
⚠ Re-check anything here against `pg_policies` / `pg_proc` / production before
trusting it. **There are no outstanding SQL migrations** — all were verified
applied against the live database and consolidated into `supabase-schema.sql`.
This list used to name migrations as outstanding that had been applied for weeks,
and that staleness sent a whole debugging session down the wrong path. Everything
below that touches the database is a **decision**, not a pending run.

0. ⚠⚠ **A CO-PARENT CAN TAKE OVER A FAMILY.** `families_own` is
   `USING (parent_id = auth.uid() OR is_family_member(id) OR is_admin())` with
   `WITH CHECK (parent_id = auth.uid() OR is_admin())`, so a co-parent passes
   USING as a member and WITH CHECK by naming themselves — `UPDATE families SET
   parent_id = auth.uid()` succeeds and they inherit the right to invite, remove
   the original parent and delete the family. Measured against production as
   `authenticated` in a rolled-back transaction; `run-schema-tests.sh` **fails on
   it today**. ⚠ A stranger cannot (USING fails, and an UPDATE matching no row
   changes nothing and raises nothing) — the exposure is to an adult the owner
   deliberately invited, which is why it is a decision and not an emergency.
   The one-line fix is written out, commented, at the end of `supabase-schema.sql`:
   narrow **WITH CHECK only** to
   `(parent_id = auth.uid() AND is_family_owner(id)) OR is_admin()`, leaving USING
   untouched so co-parent reads are unaffected and the USING/RETURNING rule in [database.md](database.md) is not
   re-opened. ⚠ Check first whether any co-parent feature legitimately writes to
   `families` (renaming it, say) — if one does, that field needs a SECURITY
   DEFINER function rather than a wider policy.

1. ⚠⚠ **THE WHOLE `netlify/` DIRECTORY IS PUBLICLY SERVED UNTIL THE NEXT DEPLOY.**
   Measured anonymous against production 2026-09-08:
   `/netlify/question-bundles/grade5-maths.json` → **200, 651 KB of real questions
   with their answers** (58 bundle files), `/netlify/functions/questions.js` →
   **200, the source of the entitlement enforcement**, `/netlify/lib/…` and
   `/netlify/import-questions.js` → 200, while `/.netlify/functions/questions`
   → 401 (the function itself is fine). That path bypasses the plan, the kill
   switch, entitlements, expiry and moderation blocks entirely. A `[[redirects]]`
   404 on `/netlify/*` is in `netlify.toml` but **is not verified, because nothing
   has been deployed**. ⚠ After the next deploy probe BOTH:
   `/netlify/question-bundles/grade5-maths.json` must answer 404 **and**
   `/.netlify/functions/questions` must still answer 401 — a rule catching the
   leading-dot path would take the whole question service down. ⚠ Nothing in the
   browser fetches that path (grepped before blocking it).
   ⚠ Also 200: `/docs/content-coverage-plan.md`, `/dbg18.js`, `/test.py`; and
   `past-papers/`, `exam_papers/`, `migrations/`, `tmp/`, `node_modules/` and five
   dot-directories were unblocked and safe only because the last deploy did not
   contain them. **The real defect is that the 404 list is hand-maintained** —
   `/subjects/*/questions/*` was blocked while the build's own later route was
   not. `scripts/test-netlify-redirects.js` now fails on anything neither
   allowlisted nor blocked. ⚠ `.netlify/` cannot be blocked by a path rule (same
   prefix as the functions); it is asserted gitignored instead.

2. ⚠ **`netlify/functions/parent-pin-signin.js` IS NOT DEPLOYED YET** (the table
   `parent_pin_attempts` is applied and recorded in the schema; the function and
   its `/api/parent-pin-signin` redirect are in the working tree only). Until it
   ships, `_pinServerSignIn()` receives the SPA fallback, reads it as
   `unavailable`, and the PIN pad behaves exactly as it did before — the intended
   failure mode, not a silent one. Verify against **production** immediately after
   promoting (a draft deploy answers 401 to everything): 401 means deployed, 404
   means missing. Unverified until then: that `admin.generateLink()` does not SEND
   an email — it should not, but being wrong costs one message per PIN sign-in
   from a shared ~500/day quota.

3. ⚠ **`notify.js` and `weekly-digest.js` are NOT DEPLOYED YET.** Both now send
   through the shared `netlify/lib/mailer.js` (nodemailer over Gmail, reading
   `GMAIL_USER` / `GMAIL_APP_PASSWORD`); Resend is gone from both.
   ⚠ **Measured: `RESEND_API_KEY` was never set on the Netlify site at all**, so
   both were hitting their own `not_configured` guard and **never attempted a
   send** — no parent has ever received an assignment notification or a weekly
   digest. The lesson this file keeps re-learning: a guard that returns "not
   configured" and a send that fails look identical from outside.
   ⚠ `sent++` counted ATTEMPTS, not deliveries, so the closing log line reported a
   full run either way; it now counts only `ok` sends and logs `N FAILED`.
   ⚠ The from-address is deliberately not configurable any more — Gmail rewrites
   `From`, so `NOTIFY_FROM_EMAIL` could only ever be wrong. ⚠ `nodemailer` is the
   first new runtime dependency in a long while and is verified to survive
   Netlify's esbuild bundler (a dynamic require would have failed only in production).

4. ⚠ **`anon` can INSERT into `question_reports` directly, unthrottled** — policy
   `"anon can insert question reports" … WITH CHECK (true)` plus a full INSERT
   grant, so any visitor can write into the admin queue from a console and skip the
   contact form's honeypot, validation and rate limits. **Pre-existing — the
   contact form did not create it**, but it is what makes that throttle advisory
   rather than binding. `reports_insert` already covers a child with a token and
   any signed-in adult, and the guest path holds the service role, so the anon
   policy looks redundant — **verify against `pg_policies` live before dropping
   it**. Proposed:
   `DROP POLICY "anon can insert question reports" ON public.question_reports;`
   then `REVOKE INSERT ON public.question_reports FROM anon;`, then regenerate.

5. ⚠ **Publish the shop catalogue** — Admin → Content → 🛒 Credit Shop → Publish
   catalogue. Not SQL: `purchase_subject()` and `shop_subject_price()` both exist,
   but `mm_data.shop_settings.catalog` is still `[]` and that is what
   `purchase_subject()` validates against, so whole-subject buying refuses today.

6. ⚠ **Two families are both named "gobin"** (`B48C5A`, `4B2D15`), so
   `families_name_unique_ci` cannot be created and `verify_student_pin` can answer
   `ambiguous_family` to a child in either. family_name is one of the three things
   a child types to log in, so renaming one is a **decision about real children's
   credentials**, not a migration to run unattended. §13 of the schema skips itself
   and warns; those children can sign in with their 6-character family code.

7. ⚠ **Rotate the VAPID keypair** — the private key is in git history (`dba9b8e`)
   permanently. Update the Netlify vars and `VAPID_PUBLIC_KEY` in `engine/app.js`.
   Costs nothing now: the VAPID vars are absent from the site env, so `push-*.js`
   is inert and there are no real subscribers.

8. **Push notifications for assignments** — infrastructure ready, `push-send.js`
   not wired to assignment creation. Badge API not started.

9. **Grades 1–2 need a picture-first question mode** — the renderer assumes the
   child can read the question *and* all four options.

10. **The grade 7–9 subject list is CONFIRMED** against the MIE NCF/TLS Grades 7–9
    (2026-09-08): English, Français, Mathematics, Science, **Social & Modern
    Studies** and — at Grade 9 only — **ICT**. ⚠ At Grade 9 the science is
    **three subjects, not one** (Biology, Chemistry, Physics), so Grade 9
    registers **eight** packs: 18 packs across 7–9, 175 chapters.
    ⚠ **ICT was missing from this list and that was a real gap** —
    `past-papers/nce/ict/` holds five real NCE ICT papers and the NCF lists the
    subject at printed page 128; the pack was written on 2026-09-08.
    ⚠ **Five of the eighteen are now LIVE and the other thirteen are not**:
    grade9-maths (1,711 practisable), grade9-ict (524), grade9-chemistry (218),
    grade9-biology (189) and grade9-physics (178) have `comingSoon: false`; the
    rest still hold one sample question each.
    ⚠ **A PACK'S examWeight VALUES MUST SUM TO 40, and grade9-science's did not**
    — they were hand-set, almost every chapter at 3, and summed to **47**. That is
    not cosmetic: `assembleExamPaper()` sheds the surplus with
    `while (total > count) { … findIndex(w => w.n > 1) … }`, which always
    decrements the FIRST chapter in list order, so the excess comes off the top of
    the list instead of being spread. Measured on grade9-maths at a sum of 52: its
    heaviest chapter was dealt **one** question instead of eight, while
    `test-exam-paper-shape.js` passed throughout because the paper still totalled
    40. **The distortion is in the distribution, and no test catches it — check
    the sum.** Both packs were rederived 2026-09-08. ⚠ That derivation now lives
    in the three science manifests, one each — `grade9-science/_manifest.js` was
    deleted when the pack was split, and each successor sums to exactly 40 on its
    own (Biology 9/9/9/9+2+2, Chemistry 9/6/9/9/3+2+2, Physics 9/6/6/9/6+2+2).
    ⚠ **There is no separate History or Geography at 7–9** — both live inside
    Social & Modern Studies and the NCE assesses it as one subject; the old
    `grade{7,8,9}-history` placeholder packs were replaced. ⚠ **Grade 9 science is
    THREE PACKS, not a B/C/P split inside one** (changed 2026-09-08): the NCE sets
    Biology, Chemistry and Physics as independent 45-minute / 50-mark papers, and
    `docs/implenent.md` requires that generated exams, question banks, analytics
    and teacher assignment filters preserve them as separate subjects. Chapter and
    question ids keep the `g9s-` prefix — the importer keys on them.
    ⚠ Still to check before writing questions: the English and French **grammar**
    chapters — those syllabus tables are dense multi-column layouts and pdftotext
    interleaved some columns, so verbs, modals, pronouns and prepositions were
    written at a deliberately general level. Re-read pp. 15–19 of the PDF first.

11. Still open from the security review, none as exploitable as the five fixed:
    the **local** parent-PIN copy is still base64 under `_getStoredPinHash` (now
    only a convenience check — the credential is `profiles.parent_pin_hash`),
    missing SRI on three CDN scripts with a floating `@2` major, CSP
    `'unsafe-inline'` (311 inline handlers), and the dormant plaintext-equality
    branch in `verify_student_pin`.
    ⚠ `parent_pin_hash` is a **plain SHA-256 with a fixed, shared salt**, so a
    4-digit PIN is 10,000 candidates to anyone who can read the column — only the
    owner and an admin can (`profiles_select`), which is why this is a note and not
    an emergency, but a per-user salt and a slow KDF are what it should be now that
    the hash mints sessions. ⚠ `profiles_update` lets a parent write **their own**
    `parent_pin_hash` with no column restriction, deliberately not in the
    privileged-column trigger list — the same power that session already has, so it
    changes nothing today, but it is the next thing to guard if the PIN gains any
    further reach.

12. Content gaps: English "Vocabulary Builder", maths "Shapes Around Us", grade-6
    maths enrichment. Illustration coverage in grade5-maths is ~1.4% of its pool.

13. **`daily` would be better as its own table** than a key in the rewritten-whole
    blob (~2.4 MB uploaded per 30-minute session at current caps). A migration plus
    a rewrite of every reader — not a quick change.

14. Payments are not wired: `openPlansModal()` is the single place to add them, and
    `payment-webhook.js` verifiers **fail closed** on purpose — enabling payments
    must break loudly until real signature checks are written.

15. ⚠ **Bundle sizes drift and nothing re-measures them.** The question cache went
    over the localStorage quota because the French packs quintupled with no one
    noticing; the byte budget fixed the symptom, not the cause. Run
    `node netlify/build-questions.js && node scripts/test-question-cache-budget.js`
    after any large content addition — it fails when a grade stops fitting.
