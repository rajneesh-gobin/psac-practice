'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice — Content Protection
//  Disables right-click save, view-source shortcuts,
//  and text selection on question content.
//  Must load FIRST in index.html.
// ══════════════════════════════════════════════
(function () {
  // Disable right-click context menu
  document.addEventListener('contextmenu', e => e.preventDefault());

  // Disable save / view-source keyboard shortcuts
  // NOTE: F12 and DevTools are NOT blocked so the parent/developer can inspect the app.
  document.addEventListener('keydown', e => {
    const ctrl = e.ctrlKey || e.metaKey;
    if (ctrl) {
      const k = e.key.toLowerCase();
      // Ctrl+S (Save page), Ctrl+U (View source)
      if (['s', 'u'].includes(k)) { e.preventDefault(); return; }
      // Ctrl+P (Print — can expose source)
      if (k === 'p') { e.preventDefault(); return; }
    }
    // F5 / Ctrl+R / F12 / DevTools: all allowed
  });

  // Disable drag-and-drop (prevents dragging content out)
  document.addEventListener('dragstart', e => e.preventDefault());
})();
