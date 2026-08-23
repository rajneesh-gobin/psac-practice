'use strict';
const Forum = (() => {

  // ── Categories ────────────────────────────────
  const CATS = [
    { id: 'general', label: 'General Help',      icon: '🙋', desc: 'Questions about using the app or studying in general' },
    { id: 'tips',    label: 'Study Tips',         icon: '📖', desc: 'Share revision strategies and helpful tips' },
    { id: 'suggest', label: 'Suggestions',        icon: '💡', desc: 'Feature requests and ideas to improve the app' },
    { id: 'report',  label: 'Report a Problem',   icon: '🐛', desc: 'Bug reports and technical issues' },
  ];

  const ROLE_BADGE = {
    student: { label: '🎒 Student', cls: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300' },
    parent:  { label: '👨‍👩‍👧 Parent',  cls: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300' },
    teacher: { label: '👩‍🏫 Teacher', cls: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300' },
    admin:   { label: '🛡️ Admin',    cls: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300' },
  };

  let _currentCat  = null;
  let _currentPost = null;
  let _lastPostAt  = 0;
  let _lastReplyAt = 0;
  const COOLDOWN_MS    = 30000; // 30 s between posts/replies
  const TITLE_MAX      = 120;
  const BODY_MAX       = 2000;
  const REPLY_MAX      = 1000;

  function _el(id) { return document.getElementById(id); }

  function _author() {
    const sess = (typeof Store !== 'undefined') ? Store.getStudentSession?.() : null;
    if (sess?.name) return { name: sess.name.split(' ')[0], type: 'student' };
    const p = (typeof Auth !== 'undefined') ? Auth.getParentProfile?.() : null;
    if (p?.full_name) return { name: p.full_name.split(' ')[0], type: p.role || 'parent' };
    return { name: 'Anonymous', type: 'parent' };
  }

  function _ago(iso) {
    const s = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (s < 60)   return 'just now';
    if (s < 3600) return `${Math.floor(s/60)}m ago`;
    if (s < 86400) return `${Math.floor(s/3600)}h ago`;
    return `${Math.floor(s/86400)}d ago`;
  }

  function _esc(s) {
    return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function _badge(type) {
    const b = ROLE_BADGE[type] || ROLE_BADGE.parent;
    return `<span class="text-xs px-2 py-0.5 rounded-full font-medium ${b.cls}">${b.label}</span>`;
  }

  function _sub(id) {
    ['forum-categories','forum-posts-list','forum-post-detail','forum-new-post']
      .forEach(v => _el(v)?.classList.toggle('hidden', v !== id));
    _el('forum-back-btn')?.classList.toggle('hidden', id === 'forum-categories');
  }

  // ── Category list ─────────────────────────────
  async function render() {
    _sub('forum-categories');
    const el = _el('forum-cat-list');
    if (!el) return;
    el.innerHTML = '<p class="text-sm text-gray-400 text-center py-4">Loading…</p>';

    const counts = {};
    if (_sb) {
      const { data } = await _sb.from('forum_posts').select('category');
      (data || []).forEach(r => { counts[r.category] = (counts[r.category] || 0) + 1; });
    }

    el.innerHTML = CATS.map(c => `
      <button onclick="Forum.openCategory('${c.id}')"
        class="w-full text-left flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all group">
        <div class="text-3xl shrink-0 select-none">${c.icon}</div>
        <div class="flex-1 min-w-0">
          <div class="font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${c.label}</div>
          <div class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">${c.desc}</div>
        </div>
        <div class="shrink-0 text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full whitespace-nowrap">
          ${counts[c.id] || 0} post${counts[c.id] === 1 ? '' : 's'}
        </div>
      </button>`).join('');
  }

  // ── Posts list ────────────────────────────────
  async function openCategory(catId) {
    _currentCat = catId;
    const cat = CATS.find(c => c.id === catId);
    _sub('forum-posts-list');

    const hdr = _el('forum-posts-header');
    if (hdr) hdr.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-xl select-none">${cat.icon}</span>
        <span class="font-bold text-gray-800 dark:text-white">${cat.label}</span>
      </div>
      <button onclick="Forum.showNewPost()"
        class="text-xs bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-3 py-1.5 rounded-full transition-colors">
        ✏️ New Post
      </button>`;

    const list = _el('forum-posts-items');
    if (!list) return;
    list.innerHTML = '<p class="text-sm text-gray-400 text-center py-6">Loading…</p>';

    const { data } = await _sb.from('forum_posts')
      .select('id,title,body,author_name,author_type,created_at,reply_count')
      .eq('category', catId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (!data?.length) {
      list.innerHTML = `<div class="text-center py-10">
        <div class="text-4xl mb-3 select-none">🗒️</div>
        <p class="text-sm text-gray-400 mb-4">No posts yet — be the first!</p>
        <button onclick="Forum.showNewPost()" class="text-sm bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-4 py-2 rounded-xl transition-colors">✏️ Write the First Post</button>
      </div>`;
      return;
    }

    list.innerHTML = data.map(p => `
      <button onclick="Forum.openPost('${p.id}')"
        class="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all">
        <div class="font-semibold text-gray-800 dark:text-white mb-1 truncate">${_esc(p.title)}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">${_esc(p.body)}</div>
        <div class="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
          ${_badge(p.author_type)}
          <span>${_esc(p.author_name)}</span>
          <span>·</span>
          <span>${_ago(p.created_at)}</span>
          <span class="ml-auto">💬 ${p.reply_count || 0}</span>
        </div>
      </button>`).join('');
  }

  // ── Post detail ───────────────────────────────
  async function openPost(postId) {
    _currentPost = postId;
    _sub('forum-post-detail');

    const bodyEl    = _el('forum-post-body');
    const repliesEl = _el('forum-post-replies');
    if (bodyEl)    bodyEl.innerHTML    = '<p class="text-sm text-gray-400 py-4">Loading…</p>';
    if (repliesEl) repliesEl.innerHTML = '';

    const [pr, rr] = await Promise.all([
      _sb.from('forum_posts').select('*').eq('id', postId).maybeSingle(),
      _sb.from('forum_replies').select('*').eq('post_id', postId).order('created_at', { ascending: true }),
    ]);

    const post    = pr.data;
    const replies = rr.data || [];

    if (!post) { bodyEl.innerHTML = '<p class="text-sm text-red-400 py-4">Post not found.</p>'; return; }

    bodyEl.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-3">${_esc(post.title)}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed mb-4">${_esc(post.body)}</p>
        <div class="flex items-center gap-2 text-xs text-gray-400 flex-wrap pt-3 border-t border-gray-100 dark:border-gray-700">
          ${_badge(post.author_type)}
          <span>${_esc(post.author_name)}</span>
          <span>·</span>
          <span>${_ago(post.created_at)}</span>
        </div>
      </div>`;

    repliesEl.innerHTML = replies.length
      ? `<h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">${replies.length} repl${replies.length === 1 ? 'y' : 'ies'}</h4>` +
        replies.map(r => `
          <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-3 border border-gray-100 dark:border-gray-600">
            <p class="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed mb-2">${_esc(r.body)}</p>
            <div class="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
              ${_badge(r.author_type)}
              <span>${_esc(r.author_name)}</span>
              <span>·</span>
              <span>${_ago(r.created_at)}</span>
            </div>
          </div>`).join('')
      : '<p class="text-sm text-gray-400 text-center py-4">No replies yet — be the first to reply!</p>';
  }

  // ── New post ──────────────────────────────────
  function showNewPost() {
    _sub('forum-new-post');
    const cat = CATS.find(c => c.id === _currentCat);
    const hdr = _el('forum-np-header');
    if (hdr && cat) hdr.textContent = `✏️ New post in "${cat.label}"`;
    const t = _el('forum-np-title'); if (t) t.value = '';
    const b = _el('forum-np-body');  if (b) b.value = '';
    const e = _el('forum-np-error'); if (e) e.classList.add('hidden');
  }

  async function submitPost() {
    const title = _el('forum-np-title')?.value.trim();
    const body  = _el('forum-np-body')?.value.trim();
    const errEl = _el('forum-np-error');
    if (!title || title.length < 3)   { _err(errEl,'Please enter a title (at least 3 characters).'); return; }
    if (title.length > TITLE_MAX)      { _err(errEl,`Title must be under ${TITLE_MAX} characters.`); return; }
    if (!body  || body.length < 5)    { _err(errEl,'Please write a bit more in the body.'); return; }
    if (body.length > BODY_MAX)        { _err(errEl,`Post body must be under ${BODY_MAX} characters.`); return; }
    const cooldownLeft = Math.ceil((COOLDOWN_MS - (Date.now() - _lastPostAt)) / 1000);
    if (cooldownLeft > 0) { _err(errEl,`Please wait ${cooldownLeft} seconds before posting again.`); return; }
    const { name, type } = _author();
    const { error } = await _sb.from('forum_posts').insert({ category: _currentCat, title, body, author_name: name, author_type: type });
    if (error) { _err(errEl,'Could not publish. Please try again.'); return; }
    _lastPostAt = Date.now();
    if (typeof toast !== 'undefined') toast('Post published! 🎉', 2000);
    await openCategory(_currentCat);
  }

  // ── Reply ─────────────────────────────────────
  async function submitReply() {
    const body  = _el('forum-reply-input')?.value.trim();
    const errEl = _el('forum-reply-error');
    if (!body || body.length < 2)  { _err(errEl,'Please write something before replying.'); return; }
    if (body.length > REPLY_MAX)    { _err(errEl,`Reply must be under ${REPLY_MAX} characters.`); return; }
    const cooldownLeft = Math.ceil((COOLDOWN_MS - (Date.now() - _lastReplyAt)) / 1000);
    if (cooldownLeft > 0) { _err(errEl,`Please wait ${cooldownLeft} seconds before replying again.`); return; }
    const { name, type } = _author();
    const { error } = await _sb.from('forum_replies').insert({ post_id: _currentPost, body, author_name: name, author_type: type });
    if (error) { _err(errEl,'Could not post reply. Please try again.'); return; }
    // reply_count is now updated atomically by a DB trigger
    _lastReplyAt = Date.now();
    const inp = _el('forum-reply-input'); if (inp) inp.value = '';
    const err2 = _el('forum-reply-error'); if (err2) err2.classList.add('hidden');
    if (typeof toast !== 'undefined') toast('Reply posted!', 1500);
    await openPost(_currentPost);
  }

  // ── Back navigation ───────────────────────────
  function back() {
    const detail  = _el('forum-post-detail');
    const newPost = _el('forum-new-post');
    if (newPost && !newPost.classList.contains('hidden'))   { openCategory(_currentCat); return; }
    if (detail  && !detail.classList.contains('hidden'))    { openCategory(_currentCat); return; }
    render();
  }

  function _err(el, msg) { if (!el) return; el.textContent = msg; el.classList.remove('hidden'); }

  return { render, openCategory, openPost, showNewPost, submitPost, submitReply, back };
})();
