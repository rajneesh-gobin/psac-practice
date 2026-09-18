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
| **Project folder** | `D:\git-repo\nouklass-android` — a **sibling** of the repo, not inside it |
| **Shell** | Git Bash (MINGW64). ⚠ The PowerShell forms below need translating — see step 1 |
| **Keystore** | ✅ created 2026-09-18 at `C:\Users\<you>\keys\nouklass-release.keystore` (PKCS12, 2740 bytes) |

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

## 1. The keystore — ✅ DONE 2026-09-18

**This is the one file in the whole project that cannot be regenerated.** Lose it
and you can never ship an update to the same Play listing — new listing, zero
reviews, zero installs. Publish it and anyone can sign an app Android accepts as
yours.

⚠ **The password must not pass through a chat transcript, a script, or shell
history.** Run this yourself, and let `keytool` prompt you:

⚠⚠ **In Git Bash, put it on ONE line.** A `\` continuation breaks if there is
any trailing whitespace after it: bash then reads `\ ` as an escaped space, passes
keytool an empty argument (`Illegal option:`) and tries to run `-keystore` as a
command. And `$env:USERPROFILE` is PowerShell; bash has `$USERPROFILE`, but that
expands with **backslashes** and mangles. A literal forward-slash path avoids both.

```bash
"/c/Program Files/Java/jdk-26.0.2/bin/keytool.exe" -genkeypair -v -keystore "C:/Users/<you>/keys/nouklass-release.keystore" -alias psac -keyalg RSA -keysize 2048 -validity 10000
```

PowerShell equivalent, also one line:

```powershell
& "C:\Program Files\Java\jdk-26.0.2\bin\keytool.exe" -genkeypair -v -keystore "$env:USERPROFILE\keys\nouklass-release.keystore" -alias psac -keyalg RSA -keysize 2048 -validity 10000
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

```bash
"/c/Program Files/Java/jdk-26.0.2/bin/keytool.exe" -list -v -keystore "C:/Users/<you>/keys/nouklass-release.keystore" -alias psac
```

---

## 2. `twa-manifest.json`

```bash
cd /d/git-repo/nouklass-android
bubblewrap init --manifest https://nouklass.com/manifest.json
#  ⚠ if the prompts do not render or it hangs, Git Bash needs a pty:
#      winpty bubblewrap init --manifest https://nouklass.com/manifest.json
#    and if that still misbehaves, run it in PowerShell instead.

# check and fix (cwd-independent):
node /d/git-repo/psac-practice/scripts/check-twa-manifest.js /d/git-repo/nouklass-android --fix
cd /d/git-repo/nouklass-android && bubblewrap update
```

Answer `init` with: signing key `C:/Users/<you>/keys/nouklass-release.keystore`,
alias `psac`, and let it download its own JDK 17 when offered.

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

## ⚠⚠ Two Bubblewrap bugs on Windows — both fixed here 2026-09-18

Neither error message names its real cause. Both cost an evening.

### a) "The provided androidSdk isn’t correct."

Bubblewrap validates the SDK by looking for `<sdk>/bin` **or** `<sdk>/tools` at
the root (`AndroidSdkTools.validatePath`). Android Studio installs the
command-line tools at `<sdk>/cmdline-tools/latest/bin` instead, so a perfectly
good SDK fails the check.

⚠ Junction **both** `bin` and `lib`, not just `bin`: `sdkmanager.bat` computes
`APP_HOME=%~dp0\..` and loads `%APP_HOME%\lib\sdkmanager-classpath.jar`, so a
`bin`-only link finds the launcher and then cannot find its own classes.

```powershell
$sdk = "$env:LOCALAPPDATA\Android\Sdk"
New-Item -ItemType Junction -Path "$sdk\bin" -Target "$sdk\cmdline-tools\latest\bin"
New-Item -ItemType Junction -Path "$sdk\lib" -Target "$sdk\cmdline-tools\latest\lib"
```

Junctions, not copies — nothing is duplicated and deleting the two links reverts
it. No admin rights needed.

⚠ `sdkmanager` run by hand through the junction cannot infer the SDK root and
needs `--sdk_root="$env:LOCALAPPDATA\Android\Sdk"`. Bubblewrap always passes it
explicitly, so its own calls are fine.

⚠ Bubblewrap pins **build-tools 36.1.0** exactly (`BUILD_TOOLS_VERSION` in
`AndroidSdkTools.js`). Android Studio had 36.0.0, so it installs the extra one on
first build; pre-installing it avoids the stall:

```powershell
& "$sdk\bin\sdkmanager.bat" --sdk_root="$sdk" --install "build-tools;36.1.0"
```

### b) "Could not reserve enough space for 1572864KB object heap"

⚠⚠ **This is not a memory problem.** It appeared on a machine with 31.7 GB RAM,
7.5 GB free and 21 GB of commit available — checking that first is what ruled out
the obvious reading and pointed at the real one.

`JdkInstaller.js` hardcodes the **32-bit** JDK on Windows while every other
platform gets 64-bit:

```
OpenJDK17U-jdk_x64_linux_hotspot_...       <- 64-bit
OpenJDK17U-jdk_x64_mac_hotspot_...         <- 64-bit
OpenJDK17U-jdk_aarch64_mac_hotspot_...     <- 64-bit
OpenJDK17U-jdk_x86-32_windows_hotspot_...  <- 32-bit  ⚠
```

A 32-bit JVM cannot reserve a contiguous 1536 MB heap however much RAM exists, so
the Gradle daemon dies before the build starts.

Fix: replace it with the **same version** in x64, so Bubblewrap’s
`JAVA_VERSION="17.0` check (`JdkHelper.validatePath`) still passes. The zip uses
the same folder name, so it replaces in place and `config.json` needs no edit:

```powershell
$dest = "$env:USERPROFILE\.bubblewrap\jdk"
$url  = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.11%2B9/OpenJDK17U-jdk_x64_windows_hotspot_17.0.11_9.zip"
Invoke-WebRequest -Uri $url -OutFile "$env:TEMP\jdk17x64.zip" -UseBasicParsing
Expand-Archive -Path "$env:TEMP\jdk17x64.zip" -DestinationPath $dest -Force
```

Verify before rebuilding — all three must hold:

```bash
D="$HOME/.bubblewrap/jdk/jdk-17.0.11+9"
grep -E "^JAVA_VERSION=|^OS_ARCH=" "$D/release"   # 17.0.11 / x86_64
"$D/bin/java.exe" -version                        # "64-Bit Server VM"
"$D/bin/java.exe" -Xmx1536m -version              # must not error
```

⚠ Do not "fix" this by lowering the heap in `gradle.properties`. It builds, but
R8/dex are memory-hungry and a 32-bit VM will fail again later, further from the
cause.

⚠ Bubblewrap also downloads the JDK **source** tarball
(`jdk17u-jdk-17.0.11-9/`) beside the runtime. It has no `bin/java.exe` and is not
a usable JDK — do not point `jdkPath` at it.

---

## 3. Build and install

```bash
cd /d/git-repo/nouklass-android
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

- [x] Keystore generated (PKCS12, verified outside the repo)
- [ ] ⚠ Keystore **backed up off this machine** — file *and* password
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
