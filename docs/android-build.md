# Building the Android app — the build-time steps

> Companion to [`convert_to_app.md`](convert_to_app.md) (the recipe) and
> [`android-readiness.md`](android-readiness.md) (what had to change in the web
> app, now done). **This file is the state of the actual build**: what exists on
> this machine, what has been decided, and what is still outstanding.

**Last touched 2026-09-18.**

---

## What this machine already has

| | |
|---|---|
| **JDK** | 26.0.2 at `C:\Program Files\Java\jdk-26.0.2` — ⚠ `keytool` is **not on PATH**; call it by full path |
| **Android SDK** | `%LOCALAPPDATA%\Android\Sdk` — build-tools 36.0.0, platform android-36 |
| **Node** | v24 |
| **Chrome for Testing** | 153 at `~/.cache/psac-chrome` (used by the layout audits) |
| **Bubblewrap** | 1.25.0, installed globally (`npm i -g @bubblewrap/cli`) |
| **Project folder** | `C:\nouklass-android` — created, **outside the repo, deliberately** |

✅ `~/.bubblewrap/config.json` already points `androidSdkPath` at
`%LOCALAPPDATA%\Android\Sdk`, so Bubblewrap will not ask for it.

⚠ `jdkPath` is deliberately left **empty**. Bubblewrap wants **JDK 17.0.11+9**
specifically (read out of its own `JdkInstaller.js`) and downloads that itself on
first run. The JDK 26 on this machine is for `keytool`, not for the Gradle build —
pointing Bubblewrap at it would break the build in a way whose error message
names Gradle rather than the JDK.

⚠⚠ **Bubblewrap is INTERACTIVE and cannot be driven from a non-interactive
shell.** Every command — even `bubblewrap --version` — opens an inquirer prompt
and dies with `ERR_USE_AFTER_CLOSE: readline was closed` when stdin is closed.
So an agent cannot run `init` or `build` for you; run them in a real terminal.
In Claude Code, prefix with `!` to run one in the session.

---

## 1. The keystore — ⚠ YOU generate this, not an agent

**This is the one file in the whole project that cannot be regenerated.** Lose it
and you can never ship an update to the same Play listing — new listing, zero
reviews, zero installs. Publish it and anyone can sign an app Android accepts as
yours.

⚠ **The password must not pass through a chat transcript, a script, or shell
history.** Run this yourself, and let `keytool` prompt you:

```powershell
& "C:\Program Files\Java\jdk-26.0.2\bin\keytool.exe" -genkeypair -v `
  -keystore "$env:USERPROFILE\keys\nouklass-release.keystore" `
  -alias psac -keyalg RSA -keysize 2048 -validity 10000
```

Create `%USERPROFILE%\keys` first. **Not inside the repo** — though if anyone ever
copies one in, `.gitignore` and `scripts/prepare-deploy.js` both now refuse
`*.keystore`, `*.jks`, `*.p12` and `nouklass-android/` (verified end-to-end: a
planted `assets/zz-test.keystore` did not reach the publish directory).

Answers when prompted:

| Prompt | Value |
|---|---|
| First and last name | Nou Klass |
| Organizational unit | Education |
| Organization | *(your entity)* |
| City / Locality | Port Louis |
| State / Province | Mauritius |
| Country code | MU |

**The moment it exists:** copy it to a password manager or encrypted cloud
storage, and store the password beside it. Not a local backup — a local backup
dies with the laptop.

Then read its fingerprint (you will need it later, and it is **not** the one that
goes in `assetlinks.json` — see step 4):

```powershell
& "C:\Program Files\Java\jdk-26.0.2\bin\keytool.exe" -list -v `
  -keystore "$env:USERPROFILE\keys\nouklass-release.keystore" -alias psac
```

---

## 2. `twa-manifest.json`

```powershell
cd C:\nouklass-android
bubblewrap init --manifest https://nouklass.com/manifest.json   # interactive

# then, from the repo:
node scripts\check-twa-manifest.js C:\nouklass-android          # report
node scripts\check-twa-manifest.js C:\nouklass-android --fix    # apply
cd C:\nouklass-android; bubblewrap update                       # pick up the changes
```

⚠ `--fix` cannot repair everything: the icon URLs and the keystore path have to
be answered correctly during `init`, because guessing them would be worse than
failing. The script names each one and why it matters.

The values that are **not** defaults and matter:

| Field | Value | Why |
|---|---|---|
| `packageId` | `com.nouklass.app` | must match `assetlinks.json` exactly |
| `host` | `nouklass.com` | |
| `startUrl` | `/` | ⚠ **no query string** — `sw.js` matches with `caches.match()` and no `ignoreSearch`, so `/?x=y` misses the cached `/` and a cold offline launch lands on *"Offline — resource not cached yet."* |
| `themeColor` | `#3b82f6` | from `manifest.json` |
| `backgroundColor` | `#1e1b4b` | splash screen |
| `orientation` | `portrait` | |
| `display` | `standalone` | |
| `minSdkVersion` | `21` | |
| ~~`targetSdkVersion`~~ | — | ⚠ **not a twa-manifest field.** It lives in `app/build.gradle`, and Bubblewrap 1.25 already generates **36** — above the 35 Play requires since Aug 2025. Android 15 forces edge-to-edge at that level, which is why `index.html` now carries `viewport-fit=cover`. `scripts/check-twa-manifest.js` reads the Gradle file and checks it |
| `enableNotifications` | **`true`** | ⚠⚠ the app uses web push (`pushManager.subscribe`, `app.js:1934`). Without this Bubblewrap does not declare `POST_NOTIFICATIONS`, and on **Android 13+ push silently never works** — no error, no prompt, nothing to debug |
| `iconUrl` | `/icons/icon-512.png` | `purpose:"any"` |
| `maskableIconUrl` | `/icons/icon-512-maskable.png` | ⚠ the squared-off variant. The OS crops a maskable icon and fills nothing in, so a rounded one shows transparent corner wedges on a square mask |
| `signingKey.path` | `%USERPROFILE%\keys\nouklass-release.keystore` | |
| `signingKey.alias` | `psac` | |

---

## 3. Build and install

```powershell
cd C:\nouklass-android
bubblewrap build
adb install app-release-signed.apk
```

⚠ A locally installed APK is signed with your **upload** key; the same build from
Play is re-signed by Google. That is why step 4 exists.

---

## 4. ⚠⚠ The assetlinks fingerprint — the step everyone gets wrong

`.well-known/assetlinks.json` still holds a **placeholder**.
`scripts/test-assetlinks.js` prints a REVIEW while it does, and fails the moment
it is replaced by anything that is not 32 colon-separated uppercase hex pairs.

**It is almost certainly Google's app signing key, not your upload key.** With
Play App Signing (the default since 2021) Google re-signs the app, so the
fingerprint Android checks is theirs. An upload-key fingerprint here is
well-formed, plausible and wrong — and the **only** symptom is the app opening
with a browser address bar, which points at nothing.

Read it from **Play Console → Setup → App integrity → App signing**.

⚠ Listing **both** fingerprints is safest while testing, because a locally
installed APK is signed with the upload key and the same build from Play is not.
`test-assetlinks.js` accepts any number of entries.

⚠ **Google caches Digital Asset Links.** A wrong value costs hours after it is
corrected. Get it right before the first public release.

**The order cannot be shortcut:**

```
build → upload to internal testing → read the fingerprint from Play Console
      → paste into .well-known/assetlinks.json → deploy the site
      → THEN install and check there is no address bar
```

---

## 5. On-device checks that nothing off-device could prove

Two changes shipped unverified on real hardware. Check these first:

- **Back button** (`engine/app.js`, `scripts/test-back-button.js`) — verified only
  against a Node harness. On the device, press Back from: **an exam** (must offer
  the "answers will be lost" confirm), **a modal** (must close the modal, not
  navigate), **a deep chapter** (must go back one screen), and **the home screen**
  (must exit the app).
- **Safe areas** (`viewport-fit=cover`) — the layout provably consumes an inset
  (measured: `main` = 60 + 34 + 12 = 106px), but the insets themselves cannot be
  confirmed off-device, because CDP's `setSafeAreaInsetsOverride` bypasses the
  `viewport-fit` gate. On a gesture-nav phone, check the bottom tab bar and the
  practice action bar clear the gesture bar.

Also worth confirming on the device:

- **Push notifications** actually prompt and arrive (step 2's `enableNotifications`).
- **No shop, no prices, no plans modal anywhere** — the Play payments gates.
  ⚠ If MCB Juice is switched **off** in production these are dormant, so this
  proves nothing; switch Juice on in a test account first if you want a real check.
- **The printable paper** (`window.open('','_blank')`) — expected to break in a
  Custom Tab. Known, not fixed, not a blocker.

---

## Still outstanding

- [ ] Keystore generated and **backed up off this machine**
- [x] Bubblewrap 1.25.0 installed; `androidSdkPath` configured
- [x] `.gitignore` + `prepare-deploy.js` refuse keystores (proved end-to-end)
- [x] `scripts/check-twa-manifest.js` written, with `--fix`
- [ ] `bubblewrap init` run, then `check-twa-manifest.js --fix`, then `bubblewrap update`
- [ ] First build uploaded to internal testing
- [ ] Real SHA-256 pasted into `.well-known/assetlinks.json` and deployed
- [ ] No address bar confirmed on a real device
- [ ] Play Console: developer account, 2+ phone screenshots, 1024×500 feature
      graphic, target-audience declaration, data safety form, content rating
- [ ] A public deletion-request URL (in-app deletion exists via
      `Store.deleteMyAccount`; Play also wants one reachable without installing)
