# Duplicated Code — Change Every Copy Together

There is no shared module between the browser and the Lambdas. Each of these has
bitten this project at least once:

| Thing | Copies |
|---|---|
| **Question factories** (`makeMCQ`…`makeSymmetry`, `makeCloze`, `makeErrorHunt`) | `engine/helpers.js`, `netlify/functions/questions.js`, `netlify/build-questions.js`, `netlify/lib/questions-sandbox.js` |
| Sandbox context (`STATIC_QUESTIONS` as a **real array**, `window.PSAC_PDF_QUESTIONS`) | the three server copies above |
| `FREE_GRADES` / free-grade helpers | `engine/helpers.js`, `netlify/functions/questions.js` |
| Mauritius day-key helpers (`_muDayKey`) | `engine/app.js`, `engine/store.js`, `netlify/functions/weekly-digest.js` |
| Student-token resolution | `netlify/lib/student-auth.js` ↔ Postgres `current_student_id()` |
| Parent PIN salt `:psac_v1_db` | `_hashPinForDb` (auth.js) ↔ `hashPin` (functions/parent-pin-signin.js) |
| Refusing a password change on a PIN-only session | `changePassword` (auth.js) ↔ `_saveProfilePassword` (app.js) |
| Shop defaults | `SHOP_DEFAULTS` (admin.js), `DEFAULTS` (shop.js), the SQL `coalesce()`s |
| Teacher assignment caps | `GUEST_LIMIT_DEFAULTS` (admin.js), `guest_assignment_limits()`, the seeded `mm_data` row |
| `REWARD_SLOTS` | app.js ↔ functions/questions.js |
| Kid vibe list | `KID_VIBES` (app.js) ↔ `:root[data-kid-vibe=…]` (style.css) |
| Materials sort comparator | `engine/helpers.js` ↔ `guest.js` (that page loads no engine file, by design) |
| **Where a library document lives** (seeded → `/library/<filename>`; contributed → `/api/library-file?id=`, which re-checks it is still published) | `Library.hrefFor()` (engine/library.js — the single definition for every engine surface) ↔ `eventPaperHref()` (`materials.js`, which loads no engine file, same reason as the row above). ⚠ A copy that forgets the split either serves an UNPUBLISHED file or 404s a seeded one. |
| **Email preference rules** (defaults, the legacy `weekly_digest` fallback, unknown-frequency → off) | `emailPrefs()`/`wantsEmail()` in `workers/lib/mailer.js` (decides what is SENT) ↔ `_emailPrefs()` in `engine/app.js` (decides what the parent is SHOWN). ⚠ A parent reading one answer and receiving the other is worse than either being wrong alone. `scripts/test-email-preferences.js` runs both on the same inputs. |
| Share copy — now **four** surfaces | `_appShareText()` (app.js) ↔ `_inviteText()` (auth.js) ↔ the landing page ↔ the `og:` block in `index.html` head. ⚠ Facebook caches a scrape far longer than a WhatsApp message survives. |

⚠ **Reading the code is not a sufficient check for the factory copies. Grep the
BUILT bundle for the field.** A new factory must be added to the three server
copies **and to their exported context lists** — `makeCloze` was defined in all
three and missing from the export list, so every cloze text was absent from the
built bundle while the source read correctly. `learnMore` and `subsection` were
each silently stripped for months the same way.

⚠ `netlify/import-questions.js` used to be a FIFTH copy and that cost 365
questions in production: six French files threw `makeCloze is not defined`, were
skipped with a warning in a summary nobody read, and the database held **0 `text`
and 0 `cloze` rows**. It now loads through `netlify/lib/questions-sandbox.js`, and
`scripts/test-question-import-parity.js` fails if it grows a factory or a
`vm.createContext` of its own.
