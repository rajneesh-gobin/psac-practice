// Cloudflare Worker entry point.
// Routes /api/* to the appropriate handler; everything else falls through to static assets.

import questionsHandler   from './api/questions.js';
import checkAnswerHandler from './api/check-answer.js';
import submitExamHandler  from './api/submit-exam.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Student-Token',
  'Access-Control-Max-Age':       '86400',
};

const ROUTES = {
  '/api/questions':    questionsHandler,
  '/api/check-answer': checkAnswerHandler,
  '/api/submit-exam':  submitExamHandler,
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) {
      return new Response('', { status: 200, headers: CORS_HEADERS });
    }

    const handler = ROUTES[url.pathname];
    if (handler) return handler(request, env, ctx);

    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
