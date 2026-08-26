# Prompt to paste into Claude on the import machine

Copy everything between the lines below and paste it as your first message to Claude.

---

Continue the PSAC project — read CLAUDE.md first.

I need to run the database import script on this machine. Here is the context:

- Project: PSAC exam practice app for Shanvi (Mauritius primary school)
- Repo: https://github.com/rajneesh-gobin/psac-practice (clone or pull the `dev` branch)
- The project has ~5,400 questions in JS files under `subjects/` that need to be imported into Supabase

## What needs to be done on this machine

1. Make sure Node.js 18+ is installed (`node --version`)
2. Clone or pull the repo to get the latest `dev` branch
3. In the project root, create a `.env` file:
   ```
   SUPABASE_URL=https://xawvjwsiqhtxgpocdqgm.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<I will provide this>
   ```
4. Run: `node netlify/import-questions.js`
5. Verify the output shows all grades imported successfully

## Key files already in the repo

- `netlify/import-questions.js` — the import script (already written, just run it)
- `supabase-questions-table.sql` — SQL to create the table (run in Supabase SQL editor first if not done)
- `DB_IMPORT_GUIDE.md` — full step-by-step instructions

## Important

- The `.env` file must NOT be committed to git (it is in `.gitignore`)
- The service_role key is found in Supabase → Settings → API → service_role (the long `eyJ...` key, 170+ chars)
- The import is safe to re-run — it uses upsert, no duplicates

Please help me complete the import and verify all questions are in the database.
