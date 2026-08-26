# Moving Questions to Supabase Database

## What this does
Moves all 5,400+ practice questions from static JSON bundles into the Supabase
`questions` table. After this, questions are served from the database (auth-gated)
instead of static files that anyone could access directly.

The Netlify function already falls back to the old bundle files if the DB is empty,
so you can complete these steps in any order without breaking the live site.

---

## Step 1 — Create the table in Supabase (run once)

1. Go to [supabase.com](https://supabase.com) → your project
2. Click **SQL Editor** in the left sidebar
3. Paste the contents of `supabase-questions-table.sql` (in the project root)
4. Click **Run**

You should see: `Success. No rows returned.`

---

## Step 2 — Find your Service Role Key

1. In your Supabase project, click **Settings** (gear icon, bottom-left)
2. Click **API**
3. Scroll to **Project API keys**
4. Copy the **`service_role`** key — it says "Secret" next to it
   - It starts with `eyJ` and is **170+ characters long**
   - Do NOT use the `anon` / `publishable` key — that one is too short and has no write access

---

## Step 3 — Create the `.env` file on the machine running the import

In the project root folder, create a file named `.env` (no extension) with:

```
SUPABASE_URL=https://xawvjwsiqhtxgpocdqgm.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<paste your service_role key here>
```

⚠ The URL must be exactly as above — no `/rest/v1/` at the end.
⚠ Never commit this file to git. It is already in `.gitignore`.

---

## Step 4 — Run the import

Requires **Node.js 18 or higher**. Check with `node --version`.

From the project root folder in a terminal:

```
node netlify/import-questions.js
```

Expected output:
```
grade4-english: 212 questions
grade4-french: 355 questions
grade4-history: 279 questions
...
Done. 5428 practice + 162 past-papers upserted.
```

Takes about 1–2 minutes. Safe to re-run — uses upsert, no duplicates.

---

## Step 5 — Verify in Supabase

1. In Supabase, click **Table Editor** → `questions`
2. You should see thousands of rows
3. Filter by `subject_id = 'grade5-french'` to spot-check

---

## Step 6 — Deploy

```
git push
```

The Netlify function now queries the DB first. No other changes needed.

---

## Adding new questions in future

1. Write the question JS file as normal (same format as always)
2. Run `node netlify/import-questions.js` again
3. `git push` to deploy

New questions appear immediately after step 2 (within the function's 5-minute cache).

---

## If a question needs to be deleted

The import script only inserts/updates — it does not delete. To remove a question:

1. Go to Supabase → Table Editor → `questions`
2. Filter by `id` (e.g. `g5fr-lec-036`)
3. Delete the row

---

## Troubleshooting

| Error | Fix |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY is not set` | Check `.env` file exists in project root |
| `Requires Node 18+` | Install Node from [nodejs.org](https://nodejs.org) |
| `Upsert failed: 42501` | Wrong key — use `service_role`, not `anon` |
| `Upsert failed: relation "questions" does not exist` | Run Step 1 first |
| Questions not appearing in app | Wait 5 minutes (function cache TTL), then refresh |
