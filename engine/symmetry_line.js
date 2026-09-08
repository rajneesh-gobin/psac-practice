'use strict';
// Geometry-only grader for the exam-style "draw the line(s) of symmetry"
// interaction. Kept independent of the DOM so the browser and Netlify's
// authoritative assignment grader use exactly the same tolerance rules.
(function (root) {
  const finite = n => Number.isFinite(Number(n));

  function parseLines(value) {
    let rows = value;
    if (typeof rows === 'string') {
      try { rows = JSON.parse(rows || '[]'); } catch (_) { return []; }
    }
    if (!Array.isArray(rows)) return [];
    return rows.slice(0, 12).filter(line =>
      Array.isArray(line) && line.length === 4 && line.every(finite)
    ).map(line => line.map(Number));
  }

  function info(line) {
    const [x1, y1, x2, y2] = line;
    const dx = x2 - x1, dy = y2 - y1;
    const length = Math.hypot(dx, dy);
    let angle = Math.atan2(dy, dx) * 180 / Math.PI;
    angle = ((angle % 180) + 180) % 180;
    return { x1, y1, x2, y2, dx, dy, length, angle };
  }

  function angleDistance(a, b) {
    const d = Math.abs(a - b) % 180;
    return Math.min(d, 180 - d);
  }

  function pointToInfiniteLine(x, y, line) {
    if (line.length < 0.001) return Infinity;
    return Math.abs(line.dy * x - line.dx * y + line.x2 * line.y1 - line.y2 * line.x1) / line.length;
  }

  function lineMatches(drawn, expected, options) {
    const got = info(drawn), want = info(expected);
    if (got.length < 0.001 || want.length < 0.001) return false;
    const angleTolerance = Number(options?.angleTolerance ?? 9);
    const positionTolerance = Number(options?.positionTolerance ?? 11);
    const minLengthRatio = Number(options?.minLengthRatio ?? 0.55);
    if (angleDistance(got.angle, want.angle) > angleTolerance) return false;
    if (got.length < want.length * minLengthRatio) return false;
    // Both endpoints must sit near the expected infinite fold line. This is
    // direction-independent and accepts a child's slightly over-long stroke.
    return pointToInfiniteLine(got.x1, got.y1, want) <= positionTolerance
        && pointToInfiniteLine(got.x2, got.y2, want) <= positionTolerance;
  }

  // Small maximum bipartite match. Greedy matching is wrong for near-parallel
  // answers, and returning no pairs on a partly-correct attempt would paint a
  // genuinely correct stroke red in the child's review.
  function matchLines(drawn, expected, options) {
    const used = new Set(), pairs = [];
    let best = [];
    function visit(i) {
      if (i >= drawn.length) {
        if (pairs.length > best.length) best = pairs.slice();
        return;
      }
      // A wrong extra stroke is allowed to remain unmatched in the feedback.
      visit(i + 1);
      for (let j = 0; j < expected.length; j++) {
        if (used.has(j) || !lineMatches(drawn[i], expected[j], options)) continue;
        used.add(j); pairs.push([i, j]);
        visit(i + 1);
        pairs.pop(); used.delete(j);
      }
    }
    visit(0);
    return best;
  }

  function gradeDetailed(question, value) {
    const drawn = parseLines(value);
    const expected = parseLines(question?.answer);
    if (!expected.length || drawn.length !== expected.length) {
      return { correct: false, drawn, expected, pairs: [] };
    }
    const pairs = matchLines(drawn, expected, question);
    return { correct: pairs.length === expected.length, drawn, expected, pairs };
  }

  const API = {
    parseLines,
    lineMatches,
    gradeDetailed,
    checkAnswer: (question, value) => gradeDetailed(question, value).correct,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  root.SymmetryLine = API;
})(typeof globalThis !== 'undefined' ? globalThis : this);
