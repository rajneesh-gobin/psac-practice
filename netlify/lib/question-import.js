'use strict';

// Compare every stored content field. Only answer-choice order is cosmetic.
function canonical(value, key = '') {
  if (Array.isArray(value)) {
    const items = value.map(v => canonical(v));
    return key === 'options' ? items.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))) : items;
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().filter(k => value[k] !== undefined)
      .map(k => [k, canonical(value[k], k)]));
  }
  return value;
}
const contentMatches = (a, b) => JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));
const rowMatches = (a, b) => ['subject_id', 'chapter_id', 'grade', 'difficulty', 'is_past_paper', 'data']
  .every(key => contentMatches(a[key], b[key]));
const newStats = () => ({ scanned: 0, added: 0, updated: 0, unchanged: 0, protected: 0, failed: 0, patched: 0, patchWarnings: 0 });

function createImporter({ url, key, fetchImpl = globalThis.fetch, log = console }) {
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  async function request(url, options) {
    const response = await fetchImpl(url, { ...options, signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Database request failed (HTTP ${response.status})`);
    return response;
  }
  async function readExisting(ids) {
    const found = new Map();
    for (let start = 0; start < ids.length; start += 50) {
      const part = ids.slice(start, start + 50);
      const filter = part.map(id => `"${id.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`).join(',');
      let offset = 0, total;
      do {
        const params = new URLSearchParams({ id: `in.(${filter})`, select: 'id,subject_id,chapter_id,grade,difficulty,is_past_paper,protected,data', order: 'id.asc', limit: '50', offset: String(offset) });
        const response = await request(`${url}/rest/v1/questions?${params}`, { headers: { ...headers, Prefer: 'count=exact' } });
        const range = response.headers.get('content-range');
        if (!range || !/\/\d+$/.test(range)) throw new Error('Cannot verify complete database/protection lookup');
        total = Number(range.split('/')[1]);
        const rows = await response.json();
        if (!Array.isArray(rows) || total > part.length || (offset < total && !rows.length)) throw new Error('Incomplete database/protection lookup');
        for (const row of rows) {
          if (!part.includes(row.id) || found.has(row.id) || typeof row.protected !== 'boolean') throw new Error('Invalid database/protection lookup');
          found.set(row.id, row);
        }
        offset += rows.length;
      } while (offset < total);
      if (offset !== total) throw new Error('Database lookup count mismatch');
    }
    return found;
  }
  async function importRows(rows, label, onProtected) {
    const stats = newStats();
    stats.scanned = rows.length;
    if (!rows.length) return stats;
    let existing;
    try {
      const ids = rows.map(r => r.id);
      if (ids.some(id => typeof id !== 'string' || !id) || new Set(ids).size !== ids.length) throw new Error('Missing or duplicate question IDs');
      existing = await readExisting(ids);
    } catch (error) {
      stats.failed = rows.length;
      log.error(`  ${label}: BLOCKED — ${error.message}. No rows written for this group.`);
      return stats;
    }
    const pending = [];
    for (const row of rows) {
      const old = existing.get(row.id);
      if (old?.protected) {
        stats.protected++;
        if (onProtected && !contentMatches(row.data, old.data)) {
          try {
            if (onProtected(row.id, old.data)) stats.patched++;
            else stats.patchWarnings++;
          } catch (error) {
            stats.patchWarnings++;
            log.error(`  ${row.id}: local sync failed — ${error.message}`);
          }
        }
      } else if (old && rowMatches(row, old)) stats.unchanged++;
      else pending.push(row);
    }
    for (let start = 0; start < pending.length; start += 200) {
      const batch = pending.slice(start, start + 200);
      try {
        const response = await request(`${url}/rest/v1/questions`, {
          method: 'POST', headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=representation' },
          body: JSON.stringify(batch),
        });
        const saved = await response.json();
        if (!Array.isArray(saved) || saved.length !== batch.length || new Set(saved.map(r => r.id)).size !== batch.length) throw new Error('Write response could not be verified');
        const byId = new Map(saved.map(r => [r.id, r]));
        for (const row of batch) {
          if (!byId.has(row.id) || !rowMatches(row, byId.get(row.id))) stats.failed++;
          else if (existing.has(row.id)) stats.updated++;
          else stats.added++;
        }
      } catch (error) {
        stats.failed += batch.length;
        log.error(`  ${label}: ${batch.length} writes failed or unverified — ${error.message}`);
      }
    }
    log.log(`  ${label}: ${stats.added} new, ${stats.updated} updated, ${stats.unchanged} unchanged, ${stats.protected} protected, ${stats.failed} failed/unverified`);
    return stats;
  }
  return { importRows };
}

function printSummary(totals, skippedFiles, elapsedSeconds, log = console, aborted = false) {
  const sum = newStats();
  for (const stats of Object.values(totals)) for (const key of Object.keys(sum)) sum[key] += stats[key];
  log.log(`\n=== Question import ${aborted ? 'ABORTED (partial totals only)' : sum.failed || skippedFiles || sum.patchWarnings ? 'completed with issues' : 'completed'} ===`);
  log.log('Category                 Practice   Past papers        Total');
  for (const [key, label] of [['scanned', 'Questions read'], ['added', 'New questions added'], ['updated', 'Existing updated'], ['unchanged', 'Unchanged (not written)'], ['protected', 'Protected (not written)'], ['failed', 'Failed / unverified']]) {
    log.log(label.padEnd(25) + String(totals.practice[key]).padStart(8) + String(totals.papers[key]).padStart(14) + String(sum[key]).padStart(13));
  }
  log.log(`Protected questions synced to local JS: ${sum.patched}\nLocal sync warnings: ${sum.patchWarnings}\nSource files skipped: ${skippedFiles}\nElapsed: ${elapsedSeconds}s`);
  log.log('New/updated classification uses the database snapshot before each group. Avoid concurrent imports/admin edits.');
  if (sum.failed) log.log('Unverified writes may have reached the database. Correct the error and rerun; do not assume they were saved.');
  return Boolean(aborted || sum.failed || skippedFiles || sum.patchWarnings);
}
module.exports = { createImporter, contentMatches, newStats, printSummary };
