'use strict';
// ── MathMaster / PSAC Practice — Service Worker ──────────────────────────────
// Strategy:
//   Shell (HTML, CSS, engine JS): Cache-first — loads instantly offline
//   Question files (subjects/**):  Stale-while-revalidate — serve cached, refresh in background
//   Netlify functions:             Network-first — fresh data required; fall back to cache
//   Anything cross-origin:         NOT intercepted — see the note in the fetch handler
// ─────────────────────────────────────────────────────────────────────────────

const SHELL_VERSION = 'shell-v170';
const DATA_VERSION  = 'data-v13';
const SHELL_CACHE   = `psac-shell-${SHELL_VERSION}`;
const DATA_CACHE    = `psac-data-${DATA_VERSION}`;

// Files to pre-cache on install (the app shell).
//
// ⚠ HAND-MAINTAINED — every new engine/*.js file MUST be added here, or it will
//   not be available offline. Add the <script> tag in index.html and the entry
//   below in the same commit.
//
// ⚠ cache.addAll() is ALL-OR-NOTHING: if any single URL below 404s, the whole
//   install step rejects and the app has NO offline shell at all. Never list a
//   file before it is actually deployed.
const SHELL_FILES = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/icons/icon.svg',
  '/assets/mauritius-blank-map.svg',
  '/assets/rodrigues-location-map.svg',
  '/assets/world-map.svg',
  '/assets/mauritius-districts.geojson',
  '/assets/historical-personalities/mahe-de-labourdonnais.jpg',
  '/assets/historical-personalities/pierre-poivre.jpg',
  '/assets/french-image-scenes/children-playing.jpg',
  '/assets/french-image-scenes/classroom.jpg',
  '/assets/french-image-scenes/market.jpg',
  '/assets/vendor/qrcode.mjs',
  '/engine/events.js',
  '/engine/helpers.js',
  '/engine/protect.js',
  '/engine/questions_engine.js',
  '/engine/registry.js',
  '/engine/store.js',
  '/engine/shop.js',
  '/engine/supabase.js',
  '/engine/question_loader.js',
  '/engine/interactive_map.js',
  '/engine/auth.js',
  '/engine/app.js',
  '/engine/biometric.js',
  '/engine/admin.js',
  '/engine/teacher.js',
  '/engine/teacher_workspace.js',
  '/engine/teacher_guest_classes.js',
  '/engine/teacher_classroom_detail.js',
  '/engine/forum.js',
  '/engine/calendar.js',
  '/engine/search.js',
  '/engine/classroom.js',
  '/engine/minigame_gk.js',
  '/engine/minigame_words.js',
  '/engine/minigame_geo.js',
  '/engine/minigame_time.js',
  '/engine/minigame.js',
];

// ── Install: pre-cache the shell ─────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: remove old caches ───────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== SHELL_CACHE && k !== DATA_CACHE)
          .map(k => caches.delete(k))
      )
    // DATA_CACHE survives a version bump by design, so it still holds
    // per-caller /functions/questions responses written by every version before
    // this one. Skipping the route from now on does not remove those, and the
    // stale entries are exactly the cross-child leak — evict them once, here.
    ).then(() => caches.open(DATA_CACHE).then(cache =>
      cache.keys().then(reqs => Promise.all(
        reqs.filter(r => new URL(r.url).pathname.startsWith('/.netlify/functions/questions'))
            .map(r => cache.delete(r))
      ))
    ).catch(() => {})
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: routing logic ──────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // ── Never touch anything that is not same-origin http(s) ──
  //
  // A fetch() issued from inside a service worker is governed by the CSP's
  // connect-src, NOT by script-src / img-src. Our connect-src only lists 'self',
  // *.supabase.co and accounts.google.com, so proxying a cross-origin request
  // through here got it blocked, the catch below turned the block into a
  // synthetic 503, and the browser reported that 503 against the <script> tag.
  // That is what took down Tailwind, the Supabase UMD bundle (→ no auth, no
  // questions) and every Wikimedia question image on the live site.
  //
  // Letting these go straight to the network is also the only thing that ever
  // worked: a cross-origin <script>/<img> is a no-cors request, so the response
  // is opaque, response.ok is false, and the cache.put below never ran. This
  // branch only ever added a failure mode - it never cached anything.
  //
  // Skipping non-http(s) schemes additionally stops browser extensions
  // (chrome-extension://…) from reaching cache.put(), which throws
  // "Request scheme 'chrome-extension' is unsupported".
  if (url.origin !== self.location.origin) return;
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // ── Guest assignment pages: never serve from cache ──
  // /a/<CODE> and guest.html are time-sensitive (deadlines, expiry, one-shot
  // submissions). A cache-first hit here would show a child a stale page for an
  // assignment that has already closed. Let these go straight to the network.
  if (url.pathname.startsWith('/a/') ||
      url.pathname === '/guest.html' ||
      url.pathname === '/guest.js') {
    return;
  }

  // ── Netlify functions: network-first ──
  //
  // Supabase used to be matched here too. It no longer reaches this point (it is
  // cross-origin, so it now goes straight to the network above) and that is the
  // right outcome twice over: connect-src already allows *.supabase.co directly,
  // and caching authenticated Supabase GETs was a hazard on a shared family or
  // school device - the offline fallback matches on URL alone, ignoring the auth
  // header, so it could hand one child a response cached for another.

  // ── /functions/questions: NEVER cached ──
  // The paragraph immediately above applies to this endpoint word for word, and
  // for a while it was fixed for Supabase and left in place here.
  // /.netlify/functions/questions varies per caller: it filters by plan tier,
  // by admin-disabled chapters and by referral rewards, which is exactly why it
  // answers `Cache-Control: private` when a filter applies. Caching it in a
  // shared, URL-keyed cache would serve child A's entitled question set to
  // child B on a family device. The subject payload already has its own
  // 7-day localStorage cache in question_loader.js, keyed per subject and
  // cleared on logout, so nothing offline is lost by skipping it here.
  if (url.pathname.startsWith('/.netlify/functions/questions')) {
    return; // straight to the network, never cached
  }

  if (url.pathname.startsWith('/.netlify/functions/')) {
    event.respondWith(networkFirstWithCache(request, DATA_CACHE));
    return;
  }

  // ── Question files (subjects/): stale-while-revalidate ──
  if (url.pathname.startsWith('/subjects/')) {
    event.respondWith(staleWhileRevalidate(request, DATA_CACHE));
    return;
  }

  // ── Shell files: cache-first ──
  event.respondWith(cacheFirstWithNetwork(request, SHELL_CACHE));
});

// ── Strategy helpers ──────────────────────────────────────────────────────────

// cache.put() rejects for unsupported schemes and when storage is full. It was
// called un-awaited, so those rejections surfaced as "Uncaught (in promise)" in
// the console. Caching is best-effort: a failure must never break the response.
async function safePut(cache, request, response) {
  try { await cache.put(request, response); } catch(_) {}
}

async function cacheFirstWithNetwork(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      await safePut(cache, request, response.clone());
    }
    return response;
  } catch(_) {
    return new Response('Offline — resource not cached yet.', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) safePut(cache, request, response.clone());
    return response;
  }).catch(() => null);
  return cached || await fetchPromise || new Response('Offline.', { status: 503 });
}

// ── Push notifications ────────────────────────────────────────────────────────
self.addEventListener('push', event => {
  if (!event.data) return;
  let data;
  try { data = event.data.json(); } catch { data = { title: 'PSAC Practice', body: event.data.text() }; }

  event.waitUntil(
    self.registration.showNotification(data.title || 'PSAC Practice', {
      body:    data.body  || 'Tap to open the app.',
      icon:    data.icon  || '/icons/icon-192.png',
      badge:   data.badge || '/icons/icon-192.png',
      data:    { url: data.url || '/' },
      vibrate: [100, 50, 100],
      // Tag comes from the payload so different kinds of notification do not
      // silently overwrite one another. With a single hard-coded tag, a daily
      // study reminder would replace an unread "new homework" notification and
      // the child would never see it. Reminders keep collapsing (one pending
      // reminder is enough); anything else should pass its own tag.
      tag:      data.tag || 'psac-reminder',
      renotify: data.renotify === true,
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil((async () => {
    const list = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    const existing = list.find(c => c.url.startsWith(self.location.origin));

    // An open tab used to be focused and the url thrown away, so tapping a
    // notification about a specific assignment just surfaced whatever screen
    // the child was already on. navigate() can reject (client not controlled,
    // cross-origin); focusing is still better than nothing, so it is guarded.
    if (existing) {
      if (existing.url !== new URL(url, self.location.origin).href && 'navigate' in existing) {
        try { await existing.navigate(url); } catch (_) {}
      }
      return existing.focus();
    }
    return clients.openWindow(url);
  })());
});

async function networkFirstWithCache(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      await safePut(cache, request, response.clone());
    }
    return response;
  } catch(_) {
    const cached = await caches.match(request);
    return cached || new Response('Offline.', { status: 503 });
  }
}
