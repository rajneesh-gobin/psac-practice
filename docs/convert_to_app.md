# Convert PSAC Practice to an Android App (TWA)

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
| **Live URL** | `https://psac-practice.netlify.app` |
| **Package name** | `app.netlify.psacpractice.twa` |
| **App name** | PSAC Practice |
| **Short name** | PSAC Practice |
| **Theme colour** | `#3b82f6` (from `manifest.json`) |
| **Background colour** | `#1e1b4b` (from `manifest.json`) |
| **Icon 512** | `/icons/icon-512.png` |
| **Orientation** | portrait |
| **Keystore file** | `psac-release.keystore` (keep this file forever + backed up) |
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
  -keystore psac-release.keystore `
  -alias psac `
  -keyalg RSA `
  -keysize 2048 `
  -validity 10000

# When prompted:
# - First and last name: PSAC Practice (or your name)
# - Organizational unit: Education
# - Organization: (your org)
# - City/Locality: Port Louis
# - State/Province: Mauritius
# - Country code: MU
# Confirm with 'yes'
```

Then extract the SHA-256 fingerprint — you need this for Step 2:

```powershell
keytool -list -v -keystore psac-release.keystore -alias psac

# Look for the line:  SHA256: AA:BB:CC:DD:...
# Copy the full colon-separated hex string — 32 pairs of hex digits
```

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
    "package_name": "app.netlify.psacpractice.twa",
    "sha256_cert_fingerprints": [
      "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99"
    ]
  }
}]
```

> ⚠ Replace the placeholder SHA-256 with the real fingerprint from Step 1.
> ⚠ The `package_name` must EXACTLY match what Bubblewrap uses in Step 3.

### Make sure Netlify serves it correctly

Add to `netlify.toml` (before the final `/* → 404` catch-all):

```toml
[[headers]]
  for = "/.well-known/assetlinks.json"
  [headers.values]
    Content-Type  = "application/json"
    Cache-Control = "public, max-age=3600"
```

Also add a `[[redirects]]` rule so the file is NOT blocked if there is a
blanket doc-blocker rule above it:

```toml
[[redirects]]
  from   = "/.well-known/assetlinks.json"
  to     = "/.well-known/assetlinks.json"
  status = 200
  force  = true
```

> ⚠ The `.well-known/` folder must also be included in `prepare-deploy.js`'s
> allowlist (the ALLOWLIST array). Add the line:
> `'.well-known/assetlinks.json'` to the file list in that script.

### Verify it is live after deploying

```powershell
# Must return 200 and valid JSON
Invoke-WebRequest "https://psac-practice.netlify.app/.well-known/assetlinks.json"

# Or in a browser — it must show the raw JSON, not a 404
```

---

## Step 3 — Generate the TWA Android project with Bubblewrap

```powershell
# Create a new folder for the Android project (outside the web repo)
mkdir C:\psac-android
cd C:\psac-android

# Initialise — Bubblewrap reads the manifest.json from the live site
bubblewrap init --manifest https://psac-practice.netlify.app/manifest.json
```

When Bubblewrap prompts, use these values:

| Prompt | Value |
|---|---|
| Application ID (package name) | `app.netlify.psacpractice.twa` |
| App name | `PSAC Practice` |
| Short name | `PSAC Practice` |
| Host | `psac-practice.netlify.app` |
| Start URL | `/` |
| Signing key path | path to `psac-release.keystore` |
| Key alias | `psac` |
| Keystore password | (the one you set in Step 1) |
| Key password | (the one you set in Step 1) |
| Min SDK version | `19` (Android 4.4+) |
| Target SDK version | `34` (Android 14) |
| Orientation | `portrait` |
| Display | `standalone` |

> ⚠ Bubblewrap may download Android SDK components. Accept all license prompts.

---

## Step 4 — Build the APK / AAB

```powershell
cd C:\psac-android

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
# https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://psac-practice.netlify.app&relation=delegate_permission/common.handle_all_urls
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
   - **Title**: PSAC Practice
   - **Short description**: Mauritius PSAC exam revision for Grades 4–6
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
npx cap init "PSAC Practice" app.netlify.psacpractice
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
| `netlify.toml` | **EDIT** — add Content-Type header + 200 redirect for assetlinks |
| `scripts/prepare-deploy.js` | **EDIT** — add `.well-known/assetlinks.json` to allowlist |
| `psac-release.keystore` | **CREATE** — keep outside the repo, never commit |
| `C:\psac-android\` | **CREATE** — Android project folder, outside the repo |

---

## Quick-reference checklist

```
[ ] JDK installed (keytool works)
[ ] Node.js 18+ installed
[ ] Bubblewrap installed globally (npm i -g @bubblewrap/cli)
[ ] psac-release.keystore generated and backed up
[ ] SHA-256 fingerprint extracted and saved
[ ] .well-known/assetlinks.json created with real fingerprint
[ ] netlify.toml updated (Content-Type header + 200 redirect)
[ ] prepare-deploy.js allowlist updated
[ ] Deployed → verified /.well-known/assetlinks.json returns 200 + JSON
[ ] Digital Asset Link verified via Google's tool
[ ] Bubblewrap project initialised at C:\psac-android
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
| `assetlinks.json` returns 404 | Not in allowlist or netlify.toml blocking it | Add to prepare-deploy.js allowlist; add 200 redirect in netlify.toml |
| Bubblewrap fails to read manifest | Live site unreachable or manifest has errors | Check `https://psac-practice.netlify.app/manifest.json` in browser |
| Play Store rejects APK | Target SDK too low | Bump targetSdkVersion to 34 in `twa-manifest.json` and rebuild |
| Splash screen wrong colour | Bubblewrap used cached manifest | Edit `twa-manifest.json` → `themeColor` / `backgroundColor` and rebuild |
| iOS PWA missing push notifications | iOS < 16.4 | Nothing to do — older iOS does not support web push |
