'use strict';
// Closing the shop must close every way IN, not just the shop screen.
//
// ⚠ It used to empty the screen body and leave the 🛒 Shop tab, the header
//   credits chip, the expired-banner button and the invite-modal button exactly
//   where they were. A parent tapped Shop and got "the shop is closed" — a door
//   that opens onto a wall, on the one screen where a parent is already
//   wondering why they cannot get at something.
//
// ⚠ This is PRESENTATION ONLY and the test asserts that too. purchase_chapter()
//   and purchase_subject() read the price and balance server-side and are what
//   actually refuse a purchase. If hiding a tab ever becomes the enforcement,
//   the shop is open to anyone with devtools.
//
// Run: node scripts/test-shop-closed.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (label, cond) => { checks++; if (!cond) { fails++; console.log('  FAIL  ' + label); } };

const appSrc  = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
const htmlSrc = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const shopSrc = fs.readFileSync(path.join(ROOT, 'engine/shop.js'), 'utf8');

// ── The single source of truth: TWO switches, which must BOTH allow it ──────
ok('_shopOpenForParents() exists', /function _shopOpenForParents\(\)/.test(appSrc));
const gate = appSrc.slice(appSrc.indexOf('function _shopOpenForParents'),
                          appSrc.indexOf('function _syncShopVisibility'));
ok('switch 1 — the admin Shop-open flag', /Shop\.settings\(\)\.shop_enabled === false/.test(gate));
ok('switch 2 — Juice must be on', /_juiceOn\(_juiceCfg\)/.test(gate));
ok('shop.js still defaults shop_enabled to true', /shop_enabled:\s*true/.test(shopSrc));
ok('_juiceOn still requires BOTH the flag and a number',
  /juice_enabled && cfg\.juice_number/.test(appSrc));

// ⚠ The two switches fail in OPPOSITE directions and that is deliberate.
//   shop_enabled absent → OPEN (Shop._cfg starts at DEFAULTS; a truthy test
//   would hide the tab on every dashboard open and flash it back).
//   juice unknown → CLOSED (_juiceCfg is null until payment_settings() answers,
//   and an unanswered lookup must never offer a payment method that may not exist).
ok('shop_enabled: absent means OPEN, never a truthy test',
  !/shop_enabled\s*===\s*true/.test(gate) && !/!Shop\.settings\(\)\.shop_enabled\b/.test(gate));
ok('juice: unknown means CLOSED (null _juiceCfg yields false through _juiceOn)',
  /return _juiceOn\(_juiceCfg\);/.test(gate));

// The rule itself, run rather than read.
{
  const _juiceOn = cfg => !!(cfg && cfg.juice_enabled && cfg.juice_number);
  const rule = (shopCfg, juiceCfg) =>
    shopCfg.shop_enabled === false ? false : _juiceOn(juiceCfg);
  const JUICE_ON = { juice_enabled: true, juice_number: '5xxxxxxx' };
  ok('open only when both allow it',      rule({}, JUICE_ON) === true);
  ok('shop off + juice on  → hidden',     rule({ shop_enabled: false }, JUICE_ON) === false);
  ok('shop on  + juice off → hidden',     rule({}, { juice_enabled: false }) === false);
  ok('juice enabled but NO number → hidden',
    rule({}, { juice_enabled: true, juice_number: '' }) === false);
  ok('juice settings not yet loaded → hidden', rule({}, null) === false);
  ok('both off → hidden', rule({ shop_enabled: false }, null) === false);
}

// ⚠ The repaint when Juice lands. Without it the shop stays hidden until some
//   unrelated render happens to run again, which looks exactly like the feature
//   being broken.
ok('the chip repaints when payment_settings() resolves',
  /_juiceSettings\(\)\.then\(paint\)/.test(appSrc));

// ── Every entry point is closed ─────────────────────────────────────────────
const sync = appSrc.slice(appSrc.indexOf('function _syncShopVisibility'),
                          appSrc.indexOf('function _renderShopChip'));
ok('the parent Shop TAB is hidden', /pd-tab-shop.*classList\.toggle\('hidden', !open\)/s.test(sync));
ok('every [data-shop-entry] button is hidden', /data-shop-entry/.test(sync));
ok('a parent sitting on the shop panel is moved off it', /PD\.mainTab\('children'\)/.test(sync));

// The header credits chip is a BUTTON that opens the shop.
const chip = appSrc.slice(appSrc.indexOf('function _renderCreditChip'),
                          appSrc.indexOf('window._renderCreditChip'));
ok('the header credits chip is hidden when closed', /_shopOpenForParents\(\)/.test(chip));

// ── The screen guards itself ────────────────────────────────────────────────
// showScreen('shop') is reachable from a stale tab and the back button.
const render = appSrc.slice(appSrc.indexOf('async function renderShop()'),
                            appSrc.indexOf('window.shopTab'));
ok('renderShop() refuses when the shop is closed', /if \(!_shopOpenForParents\(\)\)/.test(render));
ok('and sends the parent somewhere real', /showScreen\('parent'\)/.test(render));
ok('the existing child guard still runs first',
  render.indexOf('Only a parent can open the shop') < render.indexOf('_shopOpenForParents'));

// ── Nothing reaches the shop without a guard or a data-shop-entry tag ───────
// ⚠ This is the check that catches the NEXT entry point somebody adds.
for (const [file, src] of [['index.html', htmlSrc], ['engine/app.js', appSrc]]) {
  const lines = src.split('\n');
  lines.forEach((line, i) => {
    if (!line.includes("showScreen('shop')")) return;
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;
    const tagged = line.includes('data-shop-entry') || line.includes('id="hdr-credits"');
    ok(`${file}:${i + 1} shop entry point is tagged or is the guarded chip — ${line.trim().slice(0, 70)}`, tagged);
  });
}

// ── Enforcement has NOT moved into the browser ──────────────────────────────
ok('purchase_chapter is still called as an RPC, not gated client-side',
  /rpc\('purchase_chapter'/.test(shopSrc) || /purchase_chapter/.test(shopSrc));
ok('_shopOpenForParents is never used to decide a PURCHASE',
  !/_shopOpenForParents\(\)[^\n]*purchase/i.test(appSrc));

console.log(`${checks - fails}/${checks} shop-closed checks passed`);
process.exit(fails ? 1 : 0);
