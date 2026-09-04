#!/usr/bin/env node
'use strict';
// ══════════════════════════════════════════════
//  Local dev server — no Netlify CLI, no Deno, no Edge Functions setup.
//
//  netlify/functions/*.js are already plain Node modules exporting
//  `exports.handler = async (event) => ({ statusCode, headers, body })` with
//  nothing Netlify-specific beyond that shape - this just serves the static
//  site over plain http:// and calls those same handlers directly for
//  /.netlify/functions/* and the /api/* aliases netlify.toml defines. Behavior
//  matches production for everything except the exact redirect/header rules
//  in netlify.toml, which aren't all replicated here.
//
//  Usage:  node dev-server.js [port]      (default 8888)
// ══════════════════════════════════════════════

const http = require('http');
const fs   = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT = __dirname;
const PORT = parseInt(process.argv[2] || process.env.PORT || '8888', 10);

// A synchronous throw anywhere outside a request's own try/catch (or a
// promise rejection nothing awaited/caught - e.g. inside a require()'d
// function file's top-level code) would otherwise kill the whole process,
// silently taking down every OTHER in-flight request too - including ones
// completely unrelated to whatever failed. The browser sees those as a
// network-level failure, which the service worker's networkFirstWithCache()
// then reports as a synthetic 503 "Offline", not the real error. Logging and
// surviving instead of dying keeps one bad request from taking the rest of a
// test session down with it.
process.on('uncaughtException',  e => console.error('[dev-server] uncaught exception (server kept running):', e));
process.on('unhandledRejection', e => console.error('[dev-server] unhandled rejection (server kept running):', e));

// ── .env — same trivial loader as netlify/import-questions.js, kept in step ──
// on purpose so both scripts read the same file the same way.
(function loadDotEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('[dev-server] SUPABASE_SERVICE_ROLE_KEY loaded — /.netlify/functions/questions will read from the DATABASE first, same as production.');
    console.log('[dev-server] Testing an edit to a local subjects/**/questions/*.js file? The DB copy won\'t reflect it until');
    console.log('[dev-server] you re-run netlify/import-questions.js — or unset SUPABASE_SERVICE_ROLE_KEY for this run to force the bundle/local-file fallback.\n');
  }
})();

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico':  'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Mirrors the [[redirects]] block in netlify.toml that maps a friendlier path
// onto the real function name.
const API_REDIRECTS = {
  '/api/questions':          'questions',
  '/api/create-user':        'create-user',
  '/api/pending-registrations': 'pending-registrations',
  '/api/admin-account-recovery': 'admin-account-recovery',
  '/api/admin-member-emails': 'admin-member-emails',
  '/api/assignment-open':    'assignment-open',
  '/api/assignment-submit':  'assignment-submit',
};

async function callFunction(name, req, url, body) {
  const fnPath = path.join(ROOT, 'netlify', 'functions', `${name}.js`);
  if (!fs.existsSync(fnPath)) return null;
  // Clear the require cache so an edit to a function file is picked up on the
  // very next request, no server restart needed - the same reason
  // engine/question_loader.js keeps LOCAL_FILES out of production's path.
  delete require.cache[require.resolve(fnPath)];
  const mod = require(fnPath);
  const event = {
    httpMethod: req.method,
    headers: req.headers, // Node already lowercases these, matching Netlify's shape
    queryStringParameters: Object.fromEntries(url.searchParams),
    body: body || null,
  };
  return mod.handler(event, {});
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);

    // Block direct access to question source files - netlify.toml does this
    // in production too, and the whole point of the questions function is
    // that the browser never sees these directly.
    if (/^\/subjects\/[^/]+\/questions\//.test(pathname)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found'); return;
    }

    // /a/<CODE> -> guest.html, URL stays as-is (rewrite, not redirect) so
    // guest.js can read the code out of location.pathname.
    if (pathname.startsWith('/a/')) pathname = '/guest.html';

    let body = '';
    if (req.method === 'POST' || req.method === 'PUT') {
      for await (const chunk of req) body += chunk;
    }

    const fnMatch = pathname.match(/^\/\.netlify\/functions\/([a-z0-9-]+)/i);
    const fnName  = fnMatch ? fnMatch[1] : API_REDIRECTS[pathname];

    if (fnName) {
      const result = await callFunction(fnName, req, url, body);
      if (!result) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Function not found'); return; }
      res.writeHead(result.statusCode || 200, result.headers || {});
      res.end(result.body || '');
      return;
    }

    // ── Static files ──
    if (pathname === '/') pathname = '/index.html';
    const filePath = path.join(ROOT, pathname);
    if (!filePath.startsWith(ROOT)) { res.writeHead(403, { 'Content-Type': 'text/plain' }); res.end('Forbidden'); return; }
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
      res.end(data);
    });
  } catch (e) {
    console.error('[dev-server]', e);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: e.message }));
  }
});

server.listen(PORT, () => {
  console.log(`\n  PSAC Practice — dev server running at http://localhost:${PORT}\n`);
});
