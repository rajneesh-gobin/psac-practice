# Convert Nou Klass to an Android App (TWA)

> **Self-contained brief.** A future Claude session reading this file should be
> able to execute every step without any other context. Verify the live site URL
> and package name below before starting — they are the one thing that may have
> changed.

## Situation summary

The app is already a PWA (`manifest.json` + `sw.js`). A TWA (Trusted Web
Activity) wraps that PWA inside a thin Android shell for the Google Play Store.
The web app itself needs **zero code changes**. The only file added to the web
project is `/.well-known/assetlinks.json` (a domain ownership proof).

| | |
|---|---|
| **Live URL** | `https://nouklass.com` |
| **Package name** | `com.nouklass.app` |
| **App name** | Nou Klass |
| **Short name** | Nou Klass |
| **Theme colour** | `#3b82f6` (from `manifest.json`) |
| **Background colour** | `#1e1b4b` (from `manifest.json`) |
| **Icon 512** | `/icons/icon-512.png` |
| **Orientation** | portrait |
| **Keystore file** | `nouklass-release.keystore` (keep this file forever + backed up) |
| **Key alias** | `psac` |

> ⚠ The keystore is the ONE thing that can never be regenerated. If lost, you
> cannot publish updates to the same Play Store listing — you would have to
> start a new listing and lose all existing reviews and installs. Back it up to
> a password manager or encrypted cloud storage the moment it is created.

---

## Prerequisites (install once)

```powershell
# Java (keytool ships with JDK — check first)
java -version          # need JDK, not just JRE
keytool -help          # must print usage

# Node.js 18+
node --version

# Bubblewrap CLI (Google's official TWA generator)
npm install -g @bubblewrap/cli

# Android SDK — needed to build the APK.
# Bubblewrap downloads it automatically on first run, or install Android Studio.
# If prompted by Bubblewrap: accept the SDK license.

# (optional) Verify the live site passes PWA criteria
# Open Chrome → DevTools → Lighthouse → Mobile → Progressive Web App
# Must score green on all PWA checks
```

---

## Step 1 — Generate the signing keystore

Do this ONCE. Store the output file safely.

```powershell
keytool -genkey -v `
  -keystore nouklass-release.keystore `
  -alias psac `
  -keyalg RSA `
  -keysize 2048 `
  -validity 10000

# When prompted:
# - First and last name: Nou Klass (or your name)
# - Organizational unit: Education
# - Organization: (your org)
# - City/Locality: Port Louis
# - State/Province: Mauritius
# - Country code: MU
# Confirm with 'yes'
```

Then extract the SHA-256 fingerprint:

```powershell
keytool -list -v -keystore nouklass-release.keystore -alias psac

# Look for the line:  SHA256: AA:BB:CC:DD:...
# Copy the full colon-separated hex string — 32 pairs of hex digits
```

### ⚠⚠ STOP — this is probably NOT the fingerprint that goes in assetlinks.json

This is the single most common way a TWA ships broken, and the symptom gives no
hint of the cause: **the app opens with a browser address bar across the top**,
looking like an ordinary web page in a frame.

**If the app uses Play App Signing — the default for every new app since 2021 —
Google strips your signature and RE-SIGNS the app with their own key before it
reaches a phone.** The fingerprint Android checks is therefore *Google's app
signing key*, not the upload key you just generated above. An upload-key
fingerprint in `assetlinks.json` is well-formed, plausible and completely wrong.

| Which key | Where to read it | Goes in assetlinks.json? |
|---|---|---|
| **Upload key** (the keystore above) | `keytool -list -v …` | ❌ only if you opted OUT of Play App Signing |
| **App signing key** (Google's) | Play Console → your app → **Setup → App integrity → App signing** | ✅ almost always this one |

The Play Console shows it as `SHA-256 certificate fingerprint` and offers a copy
button. You can only read it **after** creating the app entry and uploading a
first build, which means the honest order is: build → upload to internal
testing → read the fingerprint → put it here → deploy the site → *then* test the
installed app.

⚠ **Google caches this file.** Publishing a wrong fingerprint and correcting it
later leaves verification failing for hours against the cached copy. Get it
right before the first public release rather than after.

⚠ You may list **both** fingerprints in the array — upload key and app signing
key — and that is the safest thing to do while testing, because a build you
install directly from a local APK is signed with the upload key while the same
build from Play is signed with Google's. `scripts/test-assetlinks.js` accepts
any number of entries and checks each one is well formed.

---

## Step 2 — Add `assetlinks.json` to the web project

This file proves to Android that the domain authorises the app.

Create `public/.well-known/assetlinks.json` — or if the project serves from
repo root, create `.well-known/assetlinks.json` at the project root.

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.nouklass.app",
    "sha256_cert_fingerprints": [
      "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99"
    ]
  }
}]
```

> ⚠ Replace the placeholder SHA-256 with the real fingerprint from Step 1.
> ⚠ The `package_name` must EXACTLY match what Bubblewrap uses in Step 3.

### ✅ Serving it — ALREADY DONE (2026-09-16)

> ⚠ **This section used to describe `netlify.toml`. The site moved to
> Cloudflare Workers and Netlify serves nothing.** Both pieces are now in place
> and need no further work:
>
> 1. **`.well-known/assetlinks.json` exists** at the repo root, with a
>    placeholder fingerprint. Replace the placeholder with the real SHA-256 from
>    Step 1 — that is the only edit this file ever needs.
> 2. **`scripts/prepare-deploy.js` ships it.** `.well-known` was added to the
>    `DIRS` allowlist. ⚠ It is a DOTFILE directory, invisible to a casual `ls`,
>    and creating the file without this line would have shipped nothing — the
>    app would then open with a browser address bar, a symptom nobody connects
>    back to a missing file.
>
> Cloudflare's asset layer serves `/.well-known/assetlinks.json` directly and
> infers `application/json` from the extension. There is no redirect rule to
> write: the Worker only intercepts `/api/*` and the `/v/ /m/ /a/` rewrites, and
> everything else falls through to the assets.

```powershell
# After deploying, this must return 200 and the JSON — not the SPA shell.
curl -s -o NUL -w "%{http_code} %{content_type}\n" https://nouklass.com/.well-known/assetlinks.json
```

⚠ **Google caches Digital Asset Links.** If you publish the file with the
placeholder fingerprint still in it and only fix it later, verification can keep
failing for hours against the cached copy. Put the real fingerprint in *before*
the first Play upload.

### Verify it is live after deploying

```powershell
# Must return 200 and valid JSON
Invoke-WebRequest "https://nouklass.com/.well-known/assetlinks.json"

# Or in a browser — it must show the raw JSON, not a 404
```

---

## Step 3 — Generate the TWA Android project with Bubblewrap

```powershell
# Create a new folder for the Android project (outside the web repo)
mkdir C:\nouklass-android
cd C:\nouklass-android

# Initialise — Bubblewrap reads the manifest.json from the live site
bubblewrap init --manifest https://nouklass.com/manifest.json
```

When Bubblewrap prompts, use these values:

| Prompt | Value |
|---|---|
| Application ID (package name) | `com.nouklass.app` |
| App name | `Nou Klass` |
| Short name | `Nou Klass` |
| Host | `nouklass.com` |
| Start URL | `/` |
| Signing key path | path to `nouklass-release.keystore` |
| Key alias | `psac` |
| Keystore password | (the one you set in Step 1) |
| Key password | (the one you set in Step 1) |
| Min SDK version | `21` (Android 5.0+) |
| Target SDK version | `35` (Android 15) |
| Orientation | `portrait` |
| Display | `standalone` |

> ⚠⚠ **targetSdk 35 is mandatory for new Play apps** (since Aug 2025) and is
> not a cosmetic bump: Android 15 forces EDGE-TO-EDGE at that level, so the web
> content draws under the status bar and the gesture navigation bar. That is
> what makes the missing `viewport-fit=cover` in index.html a real defect rather
> than a dormant one - see [android-readiness.md](android-readiness.md).

> ⚠ Bubblewrap may download Android SDK components. Accept all license prompts.

---

## Step 4 — Build the APK / AAB

```powershell
cd C:\nouklass-android

# Build a debug APK (for local testing on a real device)
bubblewrap build

# The output is: app-release-signed.apk  (or  app-release.aab for Play Store)
```

### Test on a real Android device

```powershell
# Enable "Developer options" + "USB debugging" on the Android phone
# Connect via USB, then:
adb install app-release-signed.apk

# Open the installed app — it should open the live site in full-screen
# with no browser chrome (no address bar, no tabs)
```

---

## Step 5 — Verify TWA is working correctly

Signs that TWA is working properly (not just a WebView fallback):
- No browser address bar visible
- The splash screen uses your theme colour and icon
- Tapping "Share" shows your app name, not "Chrome"
- `window.matchMedia('(display-mode: standalone)').matches` returns `true`

Check the Digital Asset Link verification:

```powershell
# Google's verification tool — paste this URL in a browser:
# https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://nouklass.com&relation=delegate_permission/common.handle_all_urls
# Must return a non-empty statements array with your package name
```

> ⚠ If verification fails, Android falls back to showing the site inside a
> regular Chrome tab WITH the address bar — which defeats the whole point.
> Most common cause: the SHA-256 fingerprint in `assetlinks.json` does not
> match the keystore used to sign the APK.

---

## Step 6 — Google Play Store submission

> Do this only when ready to publish. There is no rush — having the keystore
> and the Android project ready is the useful part.

1. Open [play.google.com/console](https://play.google.com/console) and pay the
   one-time **$25 USD** registration fee.
2. Create a new app → set country to **Mauritius** → category **Education**.
3. Upload the **AAB** (Android App Bundle, preferred over APK):
   ```powershell
   bubblewrap build --skipPwaValidation
   # produces app-release.aab
   ```
4. Fill in the store listing:
   - **Title**: Nou Klass
   - **Short description**: Mauritius exam revision for Grades 4–6 — nouklass.com
   - **Full description**: Include grades, subjects, offline capability, no ads
   - **Screenshots**: take on a real Android phone (at least 2 phone screenshots required)
   - **Feature graphic**: 1024×500 px banner (required)
   - **Content rating**: complete the questionnaire → should be **Everyone**
5. Set **price**: Free
6. Submit for review — Google typically reviews within 1–3 days for new apps.

---

## Step 7 — iOS (optional, harder)

iOS does not support TWA. Options:

### Option A — PWA on Safari (free, no App Store)
iOS 16.4+ supports most PWA features. Users go to the site in Safari and tap
Share → Add to Home Screen. The app icon appears and opens full-screen.
Push notifications work on iOS 16.4+.
**No code changes needed.** This already works today.

### Option B — Capacitor (App Store listing)
Capacitor wraps the web app in a WKWebView and builds a native iOS app.

```powershell
npm install -g @capacitor/cli @capacitor/core @capacitor/ios
npx cap init "Nou Klass" com.nouklass.app
npx cap add ios
# Copy the web files, then:
npx cap open ios   # opens Xcode
```

Requires:
- macOS with Xcode installed (cannot build iOS on Windows)
- Apple Developer account: **$99 USD/year**
- App Store review: typically 1–2 days

---

## What files this plan touches

| File | Change |
|---|---|
| `.well-known/assetlinks.json` | **CREATE** — new file, domain proof |
| `scripts/prepare-deploy.js` | ✅ DONE — `.well-known` added to the DIRS allowlist |
| `scripts/prepare-deploy.js` | **EDIT** — add `.well-known/assetlinks.json` to allowlist |
| `nouklass-release.keystore` | **CREATE** — keep outside the repo, never commit |
| `C:\nouklass-android\` | **CREATE** — Android project folder, outside the repo |

---

## Quick-reference checklist

```
[ ] JDK installed (keytool works)
[ ] Node.js 18+ installed
[ ] Bubblewrap installed globally (npm i -g @bubblewrap/cli)
[ ] nouklass-release.keystore generated and backed up
[ ] SHA-256 fingerprint extracted and saved
[ ] .well-known/assetlinks.json created with real fingerprint
[x] .well-known shipped by prepare-deploy.js (Cloudflare needs no redirect rule)
[ ] prepare-deploy.js allowlist updated
[ ] Deployed → verified /.well-known/assetlinks.json returns 200 + JSON
[ ] Digital Asset Link verified via Google's tool
[ ] Bubblewrap project initialised at C:\nouklass-android
[ ] APK built and tested on a real Android device
[ ] TWA confirmed working (no address bar, display-mode: standalone)
[ ] AAB built for Play Store
[ ] Play Store listing created and submitted
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Address bar still visible in app | Digital Asset Link not verified | Check SHA-256 matches; re-deploy assetlinks.json; wait ~5 min for CDN |
| `assetlinks.json` returns 404 | `.well-known` missing from the DIRS allowlist in prepare-deploy.js — it is a dotfile directory and easy to miss | Confirm `.deploy/.well-known/assetlinks.json` exists after staging, then redeploy |
| Bubblewrap fails to read manifest | Live site unreachable or manifest has errors | Check `https://nouklass.com/manifest.json` in browser |
| Play Store rejects APK | Target SDK too low | Bump targetSdkVersion to 35 in `twa-manifest.json` and rebuild |
| Splash screen wrong colour | Bubblewrap used cached manifest | Edit `twa-manifest.json` → `themeColor` / `backgroundColor` and rebuild |
| iOS PWA missing push notifications | iOS < 16.4 | Nothing to do — older iOS does not support web push |
