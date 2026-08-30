'use strict';
// ══════════════════════════════════════════════
//  Referral CREDITS + the chapter SHOP
//
//  Invite a family → their child answers one practice question → you earn
//  credits → spend them on 30-day chapter unlocks.
//
//  ⚠ EVERYTHING IN THIS FILE IS UI. None of it is a security boundary.
//
//  The balance shown here is a copy. The list of unlocked chapters here is a
//  copy. Both come from the database and neither is trusted by anything that
//  matters: what a child can actually DOWNLOAD is decided in
//  netlify/functions/questions.js with the service role, against
//  chapter_entitlements and the account's expiry. Editing anything in this file
//  from devtools changes what a button looks like and nothing else — which is
//  the point of putting the decision on the server instead.
//
//  Credits themselves can only move through two SECURITY DEFINER functions
//  (record_student_activity, purchase_chapter). The tables have no write grant
//  at all for anon or authenticated, so there is no PostgREST call that can
//  touch them. See supabase-credits-shop.sql.
// ══════════════════════════════════════════════

const Shop = (() => {

  const CACHE_KEY = 'psac_shop_state';

  // Mirrors mm_data.shop_settings. These are the fallbacks used before the
  // settings row has loaded (and on a database where it does not exist yet);
  // the ones the SERVER uses when it charges you live in shop_chapter_price().
  const DEFAULTS = {
    shop_enabled:             true,
    referral_earning_enabled: true,
    referral_credits:         15,
    default_chapter_price:    250,
    default_subject_price:    1500,
    entitlement_days:         30,
    chapter_prices:           {},
    subject_prices:           {},
    catalog:                  [],
  };
  // The anti-farming knobs (min_account_age_minutes, max_credited_referrals,
  // activation_burst_limit) are deliberately absent: they are read and applied
  // by record_student_activity() in the database and there is nothing for a
  // browser to do with them. A copy here would only be a copy to drift.

  let _cfg     = Object.assign({}, DEFAULTS);
  let _credits = { balance: 0, earned: 0, spent: 0, referred: 0, activated: 0, blocked_until: null };
  let _owned   = [];      // [{ chapter_id, expires_at }]
  let _loaded  = false;

  // ── Cache ───────────────────────────────────
  // So the shop button can show a balance on the first paint instead of a
  // spinner. Refreshed from the server on every open; never authoritative.
  function _readCache() {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch (_) { return null; }
  }
  function _writeCache() {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ credits: _credits, owned: _owned, at: Date.now() }));
    } catch (_) {}
  }

  // ── Loading ─────────────────────────────────
  async function loadSettings() {
    if (typeof Store === 'undefined') return _cfg;
    const v = await Store.getShopSettings();
    _cfg = Object.assign({}, DEFAULTS, v || {});
    return _cfg;
  }

  // Parent session: balance + what they own. A child session has neither (they
  // are not the account holder) and calls refreshFamily() instead.
  async function refresh() {
    const cached = _readCache();
    if (cached && !_loaded) {
      if (cached.credits) _credits = Object.assign(_credits, cached.credits);
      if (Array.isArray(cached.owned)) _owned = cached.owned;
    }
    await loadSettings();
    if (typeof Auth === 'undefined' || !Auth.getParentProfile || !Auth.getParentProfile()) return _credits;

    const [c, e] = await Promise.all([Store.getMyCredits(), Store.getMyEntitlements()]);
    if (c && c.ok) _credits = Object.assign(_credits, c);
    if (Array.isArray(e)) { _reportCacheDivergence(cached, e); _owned = e; }
    _loaded = true;
    _writeCache();
    return _credits;
  }

  // ⚠ A HINT for the security log, not a defence, and it is worth being clear
  // about which.
  //
  // The cache is a copy of what the server said. If it now claims an unlocked
  // chapter the server does not know about, the most likely explanation is that
  // somebody edited localStorage to turn a padlock off — which changes nothing
  // real, because the questions still will not be served, but it is a signal an
  // administrator would want. Anyone who actually knows what they are doing
  // simply clears the cache first and this never fires. It exists to catch the
  // casual attempt and to date it, not to stop anybody.
  //
  // Only ids the cache says are STILL LIVE are compared: an entitlement that
  // simply ran out between two page loads is an ordinary difference, not a
  // forgery, and flagging those would bury the real signal in noise.
  function _reportCacheDivergence(cached, serverRows) {
    try {
      const cachedOwned = (cached && Array.isArray(cached.owned)) ? cached.owned : [];
      if (!cachedOwned.length) return;
      const live = new Set(serverRows.map(r => r.chapter_id));
      const now  = Date.now();
      const ghosts = cachedOwned
        .filter(o => o && o.chapter_id && new Date(o.expires_at).getTime() > now)
        .map(o => o.chapter_id)
        .filter(id => !live.has(id));
      if (ghosts.length) {
        Store.flagSecurityEvent('entitlement_cache_mismatch', { chapters: ghosts.slice(0, 10) });
      }
    } catch (_) {}
  }

  // Child session: only the entitlement list, which is what the UI needs to
  // stop showing a chapter as locked. No balance — that is the parent's.
  async function refreshFamily() {
    await loadSettings();
    const e = await Store.getFamilyEntitlements();
    if (Array.isArray(e)) { _owned = e; _writeCache(); }
    return _owned;
  }

  function reset() {
    _cfg = Object.assign({}, DEFAULTS);
    _credits = { balance: 0, earned: 0, spent: 0, referred: 0, activated: 0, blocked_until: null };
    _owned = [];
    _loaded = false;
    try { localStorage.removeItem(CACHE_KEY); } catch (_) {}
  }

  // ── Reads ───────────────────────────────────
  function balance()        { return _credits.balance || 0; }
  function stats()          { return _credits; }
  function settings()       { return _cfg; }
  function creditsPerRef()  { return _cfg.referral_credits || DEFAULTS.referral_credits; }
  function entitlementDays(){ return _cfg.entitlement_days || DEFAULTS.entitlement_days; }
  function priceFor(chapterId) {
    const over = _cfg.chapter_prices && _cfg.chapter_prices[chapterId];
    const n = Number(over);
    return Number.isFinite(n) && n >= 0 ? n : (Number(_cfg.default_chapter_price) || DEFAULTS.default_chapter_price);
  }
  function priceForSubject(subjectId) {
    const over = _cfg.subject_prices && _cfg.subject_prices[subjectId];
    const n = Number(over);
    return Number.isFinite(n) && n >= 0 ? n : (Number(_cfg.default_subject_price) || DEFAULTS.default_subject_price);
  }
  function owned() { return _owned; }
  function ownedUntil(chapterId) {
    const row = _owned.find(o => o.chapter_id === chapterId);
    if (!row) return null;
    const t = new Date(row.expires_at);
    return t > new Date() ? t : null;
  }
  function isUnlocked(chapterId) { return !!ownedUntil(chapterId); }
  function daysLeft(chapterId) {
    const t = ownedUntil(chapterId);
    return t ? Math.max(0, Math.ceil((t - Date.now()) / 86400000)) : 0;
  }

  // How many friends still have to get their child answering. Shown because
  // "3 invited, 0 credited" is otherwise baffling, and the rule is the whole
  // anti-abuse design — worth stating rather than hiding.
  function pendingReferrals() {
    return Math.max(0, (_credits.referred || 0) - (_credits.activated || 0));
  }

  // ── Buying ──────────────────────────────────
  // Deliberately thin: it asks the server and believes the answer. Nothing is
  // decremented locally and no entitlement is invented — a purchase that the
  // server refused must not look like it worked.
  async function buy(chapterId) {
    const res = await Store.purchaseChapter(chapterId);
    if (res && res.ok) {
      _credits.balance = res.balance;
      const i = _owned.findIndex(o => o.chapter_id === chapterId);
      if (i >= 0) _owned[i].expires_at = res.expires_at;
      else _owned.push({ chapter_id: chapterId, expires_at: res.expires_at });
      _writeCache();
    }
    return res;
  }

  // ── The child's side: earning ───────────────
  // Called after a practice answer. Once per page load — the RPC is idempotent
  // and short-circuits after the first success, but there is no reason to ask
  // it on every question either.
  let _activityReported = false;
  async function reportPracticeActivity() {
    if (_activityReported) return;
    _activityReported = true;
    try { await Store.recordStudentActivity(); } catch (_) { /* never block a child's answer */ }
  }

  // ── Catalogue ───────────────────────────────
  // The chapters that can be bought, taken from the subject packs the browser
  // has loaded. The admin-published catalogue in shop_settings is what the
  // SERVER validates against; this is only how the list gets on screen.
  // ⚠ comingSoon packs are EXCLUDED. Registering the grade 1-3 / 7-9
  // placeholders put 30 empty packs into SUBJECT_PACKS, and without this filter
  // the Shop offered "Grade 1 Maths · Sample Chapter" for 250 credits and the
  // whole of Grade 1 Maths for 1500 — a real charge for one placeholder
  // question. Same filter in _allChapters()/_allSubjects() in admin.js, which
  // is what publishCatalog() writes to the database.
  function sellableChapters() {
    if (typeof SUBJECT_PACKS === 'undefined') return [];
    const out = [];
    SUBJECT_PACKS.filter(p => !p.comingSoon).forEach(pack => {
      (pack._chapters || pack.chapters || []).forEach(ch => {
        out.push({
          id: ch.id,
          name: ch.name,
          icon: ch.icon || '📘',
          subjectId: pack.id,
          subjectName: `Grade ${pack.grade} ${pack.subject || pack.name || ''}`.trim(),
        });
      });
    });
    return out;
  }

  // Whole subjects. The catalogue the SERVER validates against groups chapters
  // by pack id, so this list has to be built from the same packs the admin
  // published — see publishCatalog() in admin.js.
  function sellableSubjects() {
    if (typeof SUBJECT_PACKS === 'undefined') return [];
    return SUBJECT_PACKS.filter(p => !p.comingSoon).map(p => {
      const chapters = (p._chapters || p.chapters || []).map(c => c.id);
      const live = chapters.filter(isUnlocked).length;
      return {
        id: p.id,
        name: `Grade ${p.grade} ${p.subject || p.name || ''}`.trim(),
        icon: p.icon || '📚',
        grade: p.grade,
        chapters: chapters.length,
        unlocked: live,
        price: priceForSubject(p.id),
      };
    }).sort((a, b) => a.grade - b.grade || a.name.localeCompare(b.name));
  }

  // Buying a subject grants an ordinary entitlement per chapter, so the local
  // copy has to be re-read rather than patched — the server decides how many
  // rows moved and by how much.
  async function buySubject(subjectId) {
    const res = await Store.purchaseSubject(subjectId);
    if (res && res.ok) {
      _credits.balance = res.balance;
      const e = await Store.getMyEntitlements();
      if (Array.isArray(e)) _owned = e;
      _writeCache();
    }
    return res;
  }

  return {
    loadSettings, refresh, refreshFamily, reset,
    balance, stats, settings, creditsPerRef, entitlementDays,
    priceFor, priceForSubject, owned, ownedUntil, isUnlocked, daysLeft, pendingReferrals,
    buy, buySubject, reportPracticeActivity, sellableChapters, sellableSubjects,
  };
})();

window.Shop = Shop;
