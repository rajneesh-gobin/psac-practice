'use strict';
// ── MathMaster / PSAC Practice — Service Worker ──────────────────────────────
// Strategy:
//   Shell (HTML, CSS, engine JS): Cache-first — loads instantly offline
//   Question files (subjects/**):  Stale-while-revalidate — serve cached, refresh in background
//   Netlify functions / Supabase:  Network-first — fresh data required; fall back to cache
// ─────────────────────────────────────────────────────────────────────────────

const CACHE_VERSION = 'v1';
const SHELL_CACHE   = `psac-shell-${CACHE_VERSION}`;
const DATA_CACHE    = `psac-data-${CACHE_VERSION}`;

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
  '/engine/events.js',
  '/engine/helpers.js',
  '/engine/protect.js',
  '/engine/questions_engine.js',
  '/engine/registry.js',
  '/engine/store.js',
  '/engine/supabase.js',
  '/engine/question_loader.js',
  '/engine/auth.js',
  '/engine/app.js',
  '/engine/admin.js',
  '/engine/teacher.js',
  '/engine/forum.js',
  '/engine/calendar.js',
  '/engine/search.js',
  '/engine/classroom.js',
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
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: routing logic ──────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // ── Guest assignment pages: never serve from cache ──
  // /a/<CODE> and guest.html are time-sensitive (deadlines, expiry, one-shot
  // submissions). A cache-first hit here would show a child a stale page for an
  // assignment that has already closed. Let these go straight to the network.
  if (url.pathname.startsWith('/a/') ||
      url.pathname === '/guest.html' ||
      url.pathname === '/guest.js') {
    return;
  }

  // ── Netlify functions & Supabase: network-first ──
  if (
    url.pathname.startsWith('/.netlify/functions/') ||
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('supabase.in')
  ) {
    event.respondWith(networkFirstWithCache(request, DATA_CACHE));
    return;
  }

  // ── External CDN (Tailwind, Wikimedia images): network-first with cache fallback ──
  if (url.hostname !== self.location.hostname) {
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

async function cacheFirstWithNetwork(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
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
    if (response.ok) cache.put(request, response.clone());
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
      tag:     'psac-reminder',       // replaces previous unread notification
      renotify: false,
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes(self.location.origin));
      if (existing) return existing.focus();
      return clients.openWindow(url);
    })
  );
});

async function networkFirstWithCache(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch(_) {
    const cached = await caches.match(request);
    return cached || new Response('Offline.', { status: 503 });
  }
}
