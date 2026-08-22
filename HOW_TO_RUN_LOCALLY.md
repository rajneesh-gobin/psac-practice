# Running MathMaster Locally

## Option 1 — Open index.html directly (quickest, for question editing)

Just double-click `index.html` or drag it into your browser.

The app detects it is running from a local file and automatically loads
questions directly from the JS files in the questions folders — no server
needed. You will see a normal login screen. Use these test credentials to
skip Supabase (since there is no internet auth on file://):

> **Note:** Supabase login (parent/teacher email accounts) does NOT work
> on file:// because the browser blocks external API calls.  
> Student login (family code + PIN) also needs Supabase to look up the family.
>
> **What works on file://:**  
> ✅ Questions load correctly  
> ✅ Practice sessions work  
> ✅ All UI, themes, animations  
> ❌ Parent/teacher login (needs Supabase)  
> ❌ Student PIN login (needs Supabase)  
>
> **Workaround for file:// testing:** temporarily add a test bypass in
> auth.js (ask Claude Code to add a `?local=1` shortcut that skips login
> and goes straight to the dashboard).

**Best use for Option 1:** checking that new questions display correctly,
testing the practice UI, and previewing layout changes — without needing
any account setup.

---

## Option 2 — Netlify dev server (full test, matches production exactly)

Use this when you want to test login, Supabase auth, and confirm questions
are served correctly via the function before deploying.

## One-time setup (do this once)

1. Install Node.js (if not already installed):
   https://nodejs.org — download the LTS version, run the installer

2. Open a terminal (PowerShell or Command Prompt) in the shanvi folder:
   ```
   cd "C:\Users\deepmala.gobin\OneDrive - Accenture\Desktop\shanvi"
   ```

3. Install Netlify CLI:
   ```
   npm install -g netlify-cli
   ```

4. Log in to Netlify (one-time):
   ```
   netlify login
   ```

## Every time you want to test locally

In the shanvi folder, run:
```
netlify dev
```

This starts a local server at: http://localhost:8888

Open that URL in your browser. Everything works exactly like production:
- Questions are served via the function (never as raw files)
- Supabase auth works
- Assignment links work

## Adding questions (no change to your workflow)

Just edit the JS files in:
  subjects/grade5-maths/questions/

Save the file. The dev server picks up changes automatically.
No restart needed.

## Adding a new subject

1. Create the folder:   subjects/grade5-science/questions/
2. Add question files:  core.js, etc. (same format as grade5-maths)
3. Add the subject to the LOCAL_FILES list in engine/question_loader.js
   (just one line — copy the grade5-maths block and update the paths)
4. Create a _manifest.js for the subject

## Deploying to Netlify

Either drag-and-drop the shanvi folder to Netlify as before,
OR link the project and use:
```
netlify deploy --prod
```
