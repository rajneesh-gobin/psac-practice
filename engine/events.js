'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice Engine - Event Bus (Phase 4)
//  Decouples gamification from core engine logic.
//  Usage:
//    Events.on('answer', ({ correct, chapterId }) => { ... });
//    Events.emit('answer', { correct: true, chapterId: 'fractions' });
// ══════════════════════════════════════════════

const Events = {
  _h: {},
  on(evt, fn)  { (this._h[evt] = this._h[evt] || []).push(fn); },
  off(evt, fn) { this._h[evt] = (this._h[evt] || []).filter(h => h !== fn); },
  emit(evt, d) { (this._h[evt] || []).forEach(fn => { try { fn(d); } catch(e) {} }); }
};
