'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - Content Protection
//  Disables view-source / save-page shortcuts.
//  Right-click, text selection and copy are ENABLED for now.
//  Must load FIRST in index.html.
// ══════════════════════════════════════════════
(function () {
  // Right-click context menu left enabled so text can be copied.
  // document.addEventListener('contextmenu', e => e.preventDefault());

  // Disable save / view-source keyboard shortcuts
  // NOTE: F12 and DevTools are NOT blocked so the parent/developer can inspect the app.
  document.addEventListener('keydown', e => {
    const ctrl = e.ctrlKey || e.metaKey;
    if (ctrl) {
      const k = e.key.toLowerCase();
      // Ctrl+S (Save page), Ctrl+U (View source)
      if (['s', 'u'].includes(k)) { e.preventDefault(); return; }
      // Ctrl+P (Print - can expose source)
      if (k === 'p') { e.preventDefault(); return; }
    }
    // F5 / Ctrl+R / F12 / DevTools: all allowed
  });

  // Drag-and-drop left enabled so selected text can be dragged/copied.
  // document.addEventListener('dragstart', e => e.preventDefault());
})();

// ══════════════════════════════════════════════
//  LAST-RESORT ERROR BOUNDARY
//
//  index.html ships <body style="opacity:0"> and the ONLY code that ever sets
//  it back to 1 lives in engine/auth.js, which runs last and needs showScreen
//  + ACTIVE_STUDENT_ID from app.js. So any top-level throw in app.js - or a
//  single one of the ~70 blocking scripts failing to arrive - left the child
//  looking at a permanently blank page: no message, no recovery, and nothing
//  reported back. This file loads 2nd, so it is the earliest place that can
//  catch it.
//
//  Three things, in order of how often they will matter:
//    1. An unconditional reveal timer. A hung await in Auth.init() (a stalled
//       mobile connection) throws nothing at all, so an error handler alone
//       would never fire. A half-initialised app beats a blank one.
//    2. Reveal on any uncaught error or rejection, immediately.
//    3. A recovery panel - but ONLY if the page is STILL invisible some
//       seconds after that error. A working app that throws a stray async
//       error (a failed confetti frame, an aborted fetch) must never get a
//       full-screen "something went wrong". Still-invisible is exactly and
//       only the blank-page case.
// ══════════════════════════════════════════════
(function () {
  var REVEAL_MS = 8000;   // unconditional failsafe reveal
  var PANEL_MS  = 10000;  // grace after an error before declaring the app dead
  var armed = false;

  // Revealing the page is NOT the same claim as "the app started", and this
  // boundary must be able to tell them apart - otherwise the failsafe reveal
  // below forges auth.js's own success signal and the recovery panel becomes
  // unreachable dead code.
  //
  // So the failsafe reveals to 0.999 rather than 1: visually identical (0.1%),
  // but it leaves `opacity === '1'` false, so a real Auth.init() finishing
  // afterwards still flips it and is still recognised as alive. Nothing else
  // in the app reads this value, only writes it.
  //
  // opacity < 1 creates a stacking context but NOT a containing block for
  // position:fixed - unlike transform/filter/contain, which is the documented
  // trap that put the practice Check/Next bar off-screen. The fixed bars are
  // unaffected, and <body> already carries opacity:0 for the whole load.
  var FAILSAFE_OPACITY = '0.999';

  function appStarted() {
    return !document.body || document.body.style.opacity === '1';
  }

  function reveal() {
    try {
      if (document.body && document.body.style.opacity !== '1') {
        document.body.style.opacity = FAILSAFE_OPACITY;
      }
    } catch (_) {}
  }

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // Inline styles throughout, deliberately. The Tailwind Play CDN only
  // generates rules for classes present at its initial scan, so a class added
  // by innerHTML this late gets the attribute and no styling - and this panel
  // has to render correctly on the one load where everything else broke,
  // style.css possibly included.
  function showPanel() {
    if (document.getElementById('psac-fatal')) return;
    var e = window.__psacLastError || {};
    var box = document.createElement('div');
    box.id = 'psac-fatal';
    box.setAttribute('role', 'alert');
    box.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:2147483000',
      'display:flex', 'align-items:center', 'justify-content:center',
      'padding:1.25rem', 'overflow-y:auto',
      'background:#0f172a', 'color:#e2e8f0',
      'font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif'
    ].join(';');
    box.innerHTML =
      '<div style="max-width:26rem;width:100%;margin:auto;text-align:center">' +
        '<div style="font-size:2.75rem;line-height:1;margin-bottom:.75rem">🔧</div>' +
        '<h1 style="font-size:1.15rem;font-weight:700;margin:0 0 .5rem;color:#fff">' +
          'This page didn’t load properly' +
        '</h1>' +
        '<p style="font-size:.875rem;line-height:1.5;margin:0 0 1.25rem;color:#94a3b8">' +
          'Nothing has been lost — your work is saved. Try reloading. If that ' +
          'keeps happening, the second button clears the stored copy of the app ' +
          'and fetches a fresh one.' +
        '</p>' +
        '<button id="psac-fatal-reload" style="display:block;width:100%;padding:.7rem 1rem;margin-bottom:.6rem;' +
          'border:0;border-radius:.75rem;background:#3b82f6;color:#fff;font-size:.95rem;font-weight:700;cursor:pointer">' +
          'Reload' +
        '</button>' +
        '<button id="psac-fatal-reset" style="display:block;width:100%;padding:.7rem 1rem;' +
          'border:1px solid #334155;border-radius:.75rem;background:transparent;color:#cbd5e1;' +
          'font-size:.875rem;font-weight:600;cursor:pointer">' +
          'Clear app cache &amp; reload' +
        '</button>' +
        '<details style="margin-top:1.25rem;text-align:left">' +
          '<summary style="font-size:.75rem;color:#64748b;cursor:pointer">Technical details</summary>' +
          '<pre style="margin:.5rem 0 0;padding:.6rem;background:#020617;border-radius:.5rem;' +
            'font-size:.7rem;line-height:1.4;color:#94a3b8;white-space:pre-wrap;word-break:break-word">' +
            esc((e.message || 'unknown') + '\n' + (e.source || '') + (e.line ? ':' + e.line : '')) +
          '</pre>' +
        '</details>' +
      '</div>';
    document.body.appendChild(box);
    try { document.body.style.opacity = '1'; } catch (_) {}

    document.getElementById('psac-fatal-reload').onclick = function () {
      location.reload();
    };

    // Clears the service worker registration and the SW caches ONLY.
    // localStorage is deliberately untouched: it holds the student session
    // token and the progress blob that has not been flushed to Supabase yet,
    // and wiping it would turn a display bug into lost work plus a forced
    // re-login.
    document.getElementById('psac-fatal-reset').onclick = function () {
      var done = function () { location.replace(location.pathname + '?_r=' + Date.now()); };
      var jobs = [];
      try {
        if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) {
          jobs.push(navigator.serviceWorker.getRegistrations().then(function (rs) {
            return Promise.all(rs.map(function (r) { return r.unregister(); }));
          }));
        }
        if (window.caches && caches.keys) {
          jobs.push(caches.keys().then(function (ks) {
            return Promise.all(ks.map(function (k) { return caches.delete(k); }));
          }));
        }
      } catch (_) {}
      Promise.all(jobs).catch(function () {}).then(done);
      setTimeout(done, 3000); // never leave the button dead if a promise hangs
    };
  }

  function armPanel() {
    if (armed) return;
    armed = true;
    setTimeout(function () { if (!appStarted()) showPanel(); }, PANEL_MS);
  }

  function record(kind, message, source, line) {
    window.__psacLastError = window.__psacLastError ||
      { kind: kind, message: message, source: source, line: line, at: new Date().toISOString() };
    reveal();
    armPanel();
  }

  // Capture phase, so resource load failures (which do not bubble) are seen
  // too. A missing <script> is how one of 45 blocking manifests could take the
  // app down; a missing <img> is a routine Wikimedia 404 inside a question and
  // must not trigger anything at all.
  window.addEventListener('error', function (ev) {
    if (ev && ev.target && ev.target !== window && ev.target.tagName) {
      if (ev.target.tagName !== 'SCRIPT') return;
      record('script', 'failed to load ' + (ev.target.src || '(inline)'), ev.target.src, 0);
      return;
    }
    record('error', (ev && ev.message) || 'uncaught error', ev && ev.filename, ev && ev.lineno);
  }, true);

  window.addEventListener('unhandledrejection', function (ev) {
    var r = ev && ev.reason;
    record('rejection', (r && (r.message || r)) || 'unhandled rejection', '', 0);
  });

  // No error fires when a promise simply never settles, so this timer is not
  // redundant with the handlers above - it is the only thing that catches a
  // stalled Auth.init().
  // Deliberately reveals WITHOUT arming the panel. Reaching this timer means
  // the app is slow, not necessarily broken - there has been no error - and a
  // half-rendered app the child can still read beats a full-screen takeover
  // thrown over something that was about to work. The panel stays reserved
  // for positive evidence of a fatal error.
  setTimeout(function () {
    if (!appStarted()) {
      if (window.console && console.warn) console.warn('[psac] reveal failsafe fired: app never signalled ready');
      reveal();
    }
  }, REVEAL_MS);
})();
