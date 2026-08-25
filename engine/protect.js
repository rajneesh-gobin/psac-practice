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
