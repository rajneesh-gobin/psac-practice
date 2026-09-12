'use strict';
// Pure grading logic — no disk I/O, no Node.js modules.
// Extracted from netlify/lib/questions-sandbox.js for use in Cloudflare Workers.
// symmetry-line type falls through to normalise comparison (answers kept client-side).

export function foldAnswer(s) {
  return String(s == null ? '' : s)
    .replace(/[''ʼ´`]/g, "'")
    .replace(/\s+/g, ' ').trim().toLowerCase()
    .replace(/[.,;:!?…]+$/, '');
}

export function bareAnswer(s) {
  return foldAnswer(s).normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export function matchTypedAnswer(accepted, typed, opts) {
  const list = (Array.isArray(accepted) ? accepted : [accepted]).map(String);
  const mine = foldAnswer(typed);
  if (!mine) return { ok: false, slip: false };
  if (list.some(a => foldAnswer(a) === mine)) return { ok: true, slip: false };
  if (opts && opts.strictAccents) return { ok: false, slip: false };
  if (list.some(a => bareAnswer(a) === bareAnswer(typed))) return { ok: true, slip: true };
  return { ok: false, slip: false };
}

export function normalise(v) {
  return String(v == null ? '' : v).toLowerCase()
    .replace(/\s+/g, '').replace(/,/g, '')
    .replace(/rs\.?/g, '').replace(/cm2/g, 'cm²').replace(/m2/g, 'm²')
    .replace(/kg/g, 'kg').replace(/min/g, 'min').replace(/\bpm\b/g, 'pm');
}

function _sameNumber(a, b) {
  const num = s => {
    const t = String(s == null ? '' : s).replace(/[\s,]/g, '').replace(/^rs\.?/i, '');
    if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(t)) return null;
    const n = parseFloat(t);
    return Number.isFinite(n) ? n : null;
  };
  const x = num(a), y = num(b);
  return x !== null && y !== null && x === y;
}

export function checkAnswer(q, userAnswer) {
  if (!q) return false;
  // symmetry-line uses a client-side canvas engine — answers kept in bundle; skip here
  if (q.type === 'symmetry-line') return false;
  if (q.type === 'symmetry') {
    try {
      const selected = JSON.parse(userAnswer || '[]');
      const ans = q.answer || [];
      if (selected.length !== ans.length) return false;
      const sel = new Set(selected.map(([r, c]) => `${r},${c}`));
      return ans.every(([r, c]) => sel.has(`${r},${c}`));
    } catch { return false; }
  }
  if (q.type === 'multi') {
    try {
      const selected = JSON.parse(userAnswer || '[]').map(normalise).sort();
      const answers  = (Array.isArray(q.answer) ? q.answer : []).map(normalise).sort();
      return selected.length === answers.length && selected.every((v, i) => v === answers[i]);
    } catch { return false; }
  }
  if (userAnswer == null || userAnswer === '') return false;
  if (q.type === 'text') {
    return matchTypedAnswer(q.acceptableAnswers || [q.answer], userAnswer, q).ok;
  }
  const ua = normalise(userAnswer);
  const accepted = [q.answer, ...(q.acceptableAnswers || [])];
  return accepted.some(a => normalise(a) === ua || _sameNumber(a, userAnswer));
}
