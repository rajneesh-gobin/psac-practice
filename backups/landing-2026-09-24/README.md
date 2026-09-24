# Landing page — snapshot before the "Try it now" demo (2026-09-24)

`index.html`, `style.css` and `sw.js` exactly as they stood before the
no-account demo was added to the landing page. `HEAD.txt` records the commit
these were taken at.

⚠ These are copies of the WHOLE files, not just the landing section, and they
were taken from a working tree that already carried other uncommitted changes
(`engine/app.js`, `docs/claude/ui-css.md`, and edits to `style.css` from
another session). Restoring them wholesale would also revert whatever else had
landed in those three files by then.

## To revert just the demo

Prefer this over copying the files back:

1. `index.html` — remove the `<script src="engine/demo.js">` tag, the
   `#demo` panel inside the hero, and the whole
   `#demo-catalogue-section`. The old hero is the one section in
   `backups/landing-2026-09-24/index.html` that begins
   `<section class="flex-1 flex flex-col items-center justify-center text-center px-4 py-8">`.
2. `style.css` — delete everything from the
   `/* ══ THE LANDING-PAGE DEMO ("Try it now") ═══` banner to the end of file.
3. `sw.js` — drop `'/engine/demo.js'` from `SHELL_FILES` and bump
   `SHELL_VERSION`.
4. Delete `engine/demo.js`, `assets/demo/`, `scripts/build-demo-decks.js`
   and `scripts/test-landing-demo.js`.

Then `node scripts/check.js` — it fails if the script tag and the shell cache
list disagree, which is the one mistake this revert can make.

## What the demo added

| Path | What |
|---|---|
| `engine/demo.js` | The demo itself. Records nothing — see the header comment. |
| `assets/demo/deck-g<N>.js` | 676 questions across 138 open chapters, deliberately public. |
| `scripts/build-demo-decks.js` | Regenerates those decks (deterministic). |
| `scripts/test-landing-demo.js` | 52 checks in a real browser — http AND file://. |
