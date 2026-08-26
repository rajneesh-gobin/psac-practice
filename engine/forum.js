'use strict';
const Forum = (() => {

  // ── Categories ────────────────────────────────
  const CATS = [
    { id: 'announce', label: 'Announcements',        icon: '📢', desc: 'Official news, new features and platform updates from the team' },
    { id: 'general',  label: 'General Help',        icon: '🙋', desc: 'Questions about using the app or studying in general' },
    { id: 'maths',    label: 'Maths Help',           icon: '📐', desc: 'Stuck on a Maths question? Ask here!' },
    { id: 'english',  label: 'English Help',         icon: '📝', desc: 'Questions about English language and writing' },
    { id: 'science',  label: 'Science Help',         icon: '🔬', desc: 'Science questions and experiments' },
    { id: 'french',   label: 'French Help',          icon: '🇫🇷', desc: 'French language questions and practice' },
    { id: 'history',  label: 'History & Geo Help',   icon: '🌍', desc: 'History and Geography questions' },
    { id: 'tips',     label: 'Study Tips',           icon: '📖', desc: 'Share revision strategies and helpful tips' },
    { id: 'suggest',  label: 'Suggestions',          icon: '💡', desc: 'Feature requests and ideas to improve the app' },
    { id: 'report',   label: 'Report a Problem',     icon: '🐛', desc: 'Bug reports and technical issues' },
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
  let _sortBy      = 'newest'; // 'newest' | 'popular'

  const COOLDOWN_MS = 30000;
  const TITLE_MAX   = 120;
  const BODY_MAX    = 2000;
  const REPLY_MAX   = 1000;
  const LIKES_KEY   = 'mm_forum_likes';

  function _el(id) { return document.getElementById(id); }

  const NICK_KEY = 'mm_forum_nick';

  function _toInitials(name) {
    const s = (name || '').replace(/^(Mrs?\.|Dr\.|Prof\.)\s*/i, '').trim();
    const parts = s.split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0][0].toUpperCase() + '.';
    return parts[0][0].toUpperCase() + '.' + parts[parts.length - 1][0].toUpperCase() + '.';
  }

  function _forumDisplayName(fullName) {
    const nick = localStorage.getItem(NICK_KEY)?.trim();
    return nick || _toInitials(fullName);
  }

  function _author() {
    const sess = (typeof Store !== 'undefined') ? Store.getStudentSession?.() : null;
    // Session stores displayName; `name` is only present on legacy cached sessions.
    const sessName = sess?.displayName || sess?.name;
    if (sessName) return { name: _forumDisplayName(sessName), type: 'student' };
    const p = (typeof Auth !== 'undefined') ? Auth.getParentProfile?.() : null;
    if (p?.full_name) return { name: _forumDisplayName(p.full_name), type: p.role || 'parent' };
    const nick = localStorage.getItem(NICK_KEY)?.trim();
    return { name: nick || '?', type: 'parent' };
  }

  function _authorName(name, type) {
    const label = `${_esc(name)}${type === 'teacher' ? ' <span class="opacity-60">(T)</span>' : ''}`;
    return type === 'teacher'
      ? `<span class="text-green-600 dark:text-green-400 font-medium">${label}</span>`
      : `<span>${_esc(name)}</span>`;
  }

  function _ago(iso) {
    const s = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (s < 60)    return 'just now';
    if (s < 3600)  return `${Math.floor(s/60)}m ago`;
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

  // ── Likes (localStorage, per device) ─────────
  function _getLikes() {
    try { return JSON.parse(localStorage.getItem(LIKES_KEY)) || {}; } catch { return {}; }
  }
  function _setLikes(obj) {
    try { localStorage.setItem(LIKES_KEY, JSON.stringify(obj)); } catch {}
  }
  function _isLiked(id) { return !!_getLikes()[id]; }

  function likeItem(btn, id) {
    const likes = _getLikes();
    const nowLiked = !likes[id];
    if (nowLiked) likes[id] = 1; else delete likes[id];
    _setLikes(likes);
    const countEl = btn.querySelector('.like-count');
    const cur = parseInt(countEl?.textContent || '0', 10);
    if (countEl) countEl.textContent = Math.max(0, cur + (nowLiked ? 1 : -1));
    btn.classList.toggle('text-red-500', nowLiked);
    btn.classList.toggle('text-gray-400', !nowLiked);
  }

  function _likeBtn(id) {
    const liked = _isLiked(id);
    return `<button onclick="event.stopPropagation();Forum.likeItem(this,'${id}')"
      class="flex items-center gap-1 text-xs ${liked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors select-none">
      ❤️ <span class="like-count">${liked ? 1 : 0}</span>
    </button>`;
  }

  // ── Char counter ──────────────────────────────
  function updateChars(inputId, counterId, max) {
    const input = _el(inputId);
    const counter = _el(counterId);
    if (!input || !counter) return;
    const len = input.value.length;
    counter.textContent = `${len}/${max}`;
    counter.classList.toggle('text-red-500', len > max * 0.9);
    counter.classList.toggle('text-gray-400', len <= max * 0.9);
  }

  // ── View switcher ─────────────────────────────
  function _sub(id) {
    ['forum-categories','forum-search-results','forum-posts-list','forum-post-detail','forum-new-post']
      .forEach(v => _el(v)?.classList.toggle('hidden', v !== id));
    _el('forum-back-btn')?.classList.toggle('hidden', id === 'forum-categories');
  }

  // ── Category list ─────────────────────────────
  async function render() {
    _sub('forum-categories');
    const si = _el('forum-search-input'); if (si) si.value = '';
    const displayEl = _el('forum-display-name');
    if (displayEl) displayEl.textContent = _author().name;

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

  // ── Search ────────────────────────────────────
  async function searchPosts(query) {
    const q = (query || '').trim();
    if (!q) { render(); return; }
    if (!_sb) return;

    _sub('forum-search-results');
    const sr = _el('forum-search-results');
    if (!sr) return;
    sr.innerHTML = '<p class="text-sm text-gray-400 text-center py-6">Searching…</p>';

    const { data } = await _sb.from('forum_posts')
      .select('id,title,body,author_name,author_type,created_at,reply_count,category')
      .or(`title.ilike.%${q}%,body.ilike.%${q}%`)
      .order('created_at', { ascending: false })
      .limit(40);

    const catMap = {};
    CATS.forEach(c => { catMap[c.id] = c; });

    if (!data?.length) {
      sr.innerHTML = `<div class="text-center py-10">
        <div class="text-4xl mb-3 select-none">🔍</div>
        <p class="text-sm text-gray-400">No posts found for "<strong>${_esc(q)}</strong>"</p>
      </div>`;
      return;
    }

    sr.innerHTML = `<p class="text-xs text-gray-400 mb-3">${data.length} result${data.length === 1 ? '' : 's'} for "<strong>${_esc(q)}</strong>"</p>` +
      data.map(p => {
        const cat = catMap[p.category] || { icon: '💬', label: p.category };
        return `
        <button onclick="Forum.openPost('${p.id}')"
          class="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all mb-3">
          <div class="mb-1">
            <span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 px-2 py-0.5 rounded-full">${cat.icon} ${cat.label}</span>
          </div>
          <div class="font-semibold text-gray-800 dark:text-white mb-1 truncate">${_esc(p.title)}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">${_esc(p.body)}</div>
          <div class="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
            ${_badge(p.author_type)}
            ${_authorName(p.author_name, p.author_type)}
            <span>·</span>
            <span>${_ago(p.created_at)}</span>
            <span class="ml-auto flex items-center gap-2">
              ${_likeBtn(p.id)}
              <span>💬 ${p.reply_count || 0}</span>
            </span>
          </div>
        </button>`;
      }).join('');
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
    await _renderPostsList(catId, list);
  }

  async function _renderPostsList(catId, list) {
    if (!_sb) { list.innerHTML = '<p class="text-sm text-gray-400 text-center py-6">Not connected.</p>'; return; }
    const sortBtns = `
      <div class="flex gap-2 mb-4 text-xs font-semibold">
        <button onclick="Forum.setSort('newest')"
          class="px-3 py-1.5 rounded-full transition-colors ${_sortBy === 'newest' ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}">
          🕐 Latest
        </button>
        <button onclick="Forum.setSort('popular')"
          class="px-3 py-1.5 rounded-full transition-colors ${_sortBy === 'popular' ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}">
          💬 Most Replied
        </button>
      </div>`;

    const orderField = _sortBy === 'popular' ? 'reply_count' : 'created_at';
    const { data } = await _sb.from('forum_posts')
      .select('id,title,body,author_name,author_type,created_at,reply_count,status')
      .eq('category', catId)
      .order(orderField, { ascending: false })
      .limit(50);

    if (!data?.length) {
      list.innerHTML = sortBtns + `<div class="text-center py-10">
        <div class="text-4xl mb-3 select-none">🗒️</div>
        <p class="text-sm text-gray-400 mb-4">No posts yet - be the first!</p>
        <button onclick="Forum.showNewPost()" class="text-sm bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-4 py-2 rounded-xl transition-colors">✏️ Write the First Post</button>
      </div>`;
      return;
    }

    const { name: myName } = _author();

    list.innerHTML = sortBtns + data.map(p => {
      const canDel = p.author_name === myName;
      return `
        <div class="relative group mb-3">
          <button onclick="Forum.openPost('${p.id}')"
            class="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all">
            <div class="font-semibold text-gray-800 dark:text-white mb-1 flex items-center gap-1.5 ${canDel ? 'pr-7' : ''}">
              <span class="truncate">${_esc(p.title)}</span>
              ${p.status === 'closed' ? '<span class="shrink-0 text-xs bg-gray-100 dark:bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded-full">🔒</span>' : ''}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">${_esc(p.body)}</div>
            <div class="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
              ${_badge(p.author_type)}
              ${_authorName(p.author_name, p.author_type)}
              <span>·</span>
              <span>${_ago(p.created_at)}</span>
              <span class="ml-auto flex items-center gap-2">
                ${_likeBtn(p.id)}
                <span>💬 ${p.reply_count || 0}</span>
              </span>
            </div>
          </button>
          ${canDel ? `
          <button onclick="event.stopPropagation();Forum.deletePost('${p.id}')" title="Delete post"
            class="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors opacity-0 group-hover:opacity-100 text-sm">🗑</button>` : ''}
        </div>`;
    }).join('');
  }

  async function setSort(mode) {
    if (_sortBy === mode) return;
    _sortBy = mode;
    const list = _el('forum-posts-items');
    if (list && _currentCat) await _renderPostsList(_currentCat, list);
  }

  // ── Post detail ───────────────────────────────
  async function openPost(postId) {
    if (!_sb) return;
    _currentPost = postId;
    _sub('forum-post-detail');
    const replyInput = _el('forum-reply-input'); if (replyInput) replyInput.value = '';
    const replyChars = _el('forum-reply-chars');  if (replyChars) replyChars.textContent = '0/1000';

    const bodyEl    = _el('forum-post-body');
    const repliesEl = _el('forum-post-replies');
    if (bodyEl)    bodyEl.innerHTML    = '<p class="text-sm text-gray-400 py-4">Loading…</p>';
    if (repliesEl) repliesEl.innerHTML = '';

    const [pr, rr, gur] = await Promise.all([
      _sb.from('forum_posts').select('id, title, body, author_name, author_type, created_at, status').eq('id', postId).maybeSingle(),
      _sb.from('forum_replies').select('id, body, author_name, author_type, created_at').eq('post_id', postId).order('created_at', { ascending: true }),
      _sb.auth.getUser(),
    ]);

    const post    = pr.data;
    const replies = rr.data || [];
    const authUser = gur.data?.user;

    if (!post) { bodyEl.innerHTML = '<p class="text-sm text-red-400 py-4">Post not found.</p>'; return; }

    let isAdmin = false;
    if (authUser?.id) {
      const { data: prof } = await _sb.from('profiles').select('role,is_super_admin').eq('id', authUser.id).maybeSingle();
      isAdmin = prof?.role === 'admin' || prof?.is_super_admin === true;
    }

    const { name: myName } = _author();
    const canDelPost = post.author_name === myName;
    const isClosed   = post.status === 'closed';

    const replyBox     = _el('forum-reply-box');
    const closedBanner = _el('forum-closed-banner');
    if (replyBox)     replyBox.classList.toggle('hidden', isClosed);
    if (closedBanner) closedBanner.classList.toggle('hidden', !isClosed);

    bodyEl.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <div class="flex items-start gap-2 mb-3">
          <h3 class="text-lg font-bold text-gray-800 dark:text-white leading-snug flex-1">${_esc(post.title)}</h3>
          <div class="flex items-center gap-1 shrink-0">
            ${isClosed ? '<span class="text-xs bg-gray-100 dark:bg-gray-600 text-gray-400 px-2 py-1 rounded-full">🔒 Closed</span>' : ''}
            ${isAdmin && !isClosed ? `<button onclick="Forum.closePost('${post.id}')" title="Close discussion"
              class="w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors text-sm" aria-label="Close discussion">🔒</button>` : ''}
            ${isAdmin && isClosed  ? `<button onclick="Forum.reopenPost('${post.id}')" title="Reopen discussion"
              class="w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors text-sm" aria-label="Reopen discussion">🔓</button>` : ''}
            ${canDelPost ? `<button onclick="Forum.deletePost('${post.id}')" title="Delete post"
              class="w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">🗑</button>` : ''}
          </div>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed mb-4">${_esc(post.body)}</p>
        <div class="flex items-center gap-3 text-xs text-gray-400 flex-wrap pt-3 border-t border-gray-100 dark:border-gray-700">
          ${_badge(post.author_type)}
          ${_authorName(post.author_name, post.author_type)}
          <span>·</span>
          <span>${_ago(post.created_at)}</span>
          <span class="ml-auto">${_likeBtn(post.id)}</span>
        </div>
      </div>`;

    repliesEl.innerHTML = replies.length
      ? `<h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 mt-4">${replies.length} repl${replies.length === 1 ? 'y' : 'ies'}</h4>` +
        replies.map(r => {
          const canDelReply = r.author_name === myName;
          return `
          <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-3 border border-gray-100 dark:border-gray-600">
            <p class="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed mb-2">${_esc(r.body)}</p>
            <div class="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
              ${_badge(r.author_type)}
              ${_authorName(r.author_name, r.author_type)}
              <span>·</span>
              <span>${_ago(r.created_at)}</span>
              <span class="ml-auto flex items-center gap-2">
                ${_likeBtn(r.id)}
                ${canDelReply ? `<button onclick="Forum.deleteReply('${r.id}')" title="Delete reply"
                  class="w-6 h-6 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">🗑</button>` : ''}
              </span>
            </div>
          </div>`;
        }).join('')
      : '<p class="text-sm text-gray-400 text-center py-4 mt-4">No replies yet - be the first to reply!</p>';
  }

  async function closePost(id) {
    if (!_sb) return;
    _confirmModal('Close this discussion? No new replies will be allowed.', async () => {
      await _sb.from('forum_posts').update({ status: 'closed' }).eq('id', id);
      openPost(id);
    }, { icon: '🔒', okLabel: 'Close Discussion', danger: true });
  }

  async function reopenPost(id) {
    if (!_sb) return;
    await _sb.from('forum_posts').update({ status: 'open' }).eq('id', id);
    openPost(id);
  }

  // ── Delete ────────────────────────────────────
  async function deletePost(postId) {
    if (!_sb) return;
    const doIt = async () => {
      await _sb.from('forum_replies').delete().eq('post_id', postId);
      // RLS decides this, not the button's visibility: deletion needs
      // author_id = auth.uid(), author_student_id = current_student_id(), or
      // admin. Posts created BEFORE those columns existed have NULL authorship,
      // so only an admin can remove them. Verify rather than assume - this used
      // to toast "Post deleted" unconditionally, so a blocked delete looked
      // like it worked until the list reloaded unchanged.
      const { data, error } = await _sb.from('forum_posts')
        .delete().eq('id', postId).select('id');
      if (error || !data?.length) {
        if (error) console.error('[Forum.deletePost]', error.message);
        if (typeof toast !== 'undefined') {
          toast('Could not delete that post - you can only delete your own posts.', 3500);
        }
        return;
      }
      if (typeof toast !== 'undefined') toast('Post deleted', 1500);
      await openCategory(_currentCat);
    };
    if (typeof _confirmModal === 'function') {
      _confirmModal('Delete this post and all its replies?', doIt, { icon: '🗑', okLabel: 'Delete', danger: true });
    } else if (window.confirm('Delete this post and all its replies?')) {
      await doIt();
    }
  }

  async function deleteReply(replyId) {
    if (!_sb) return;
    const doIt = async () => {
      const { data, error } = await _sb.from('forum_replies')
        .delete().eq('id', replyId).select('id');
      if (error || !data?.length) {
        if (error) console.error('[Forum.deleteReply]', error.message);
        if (typeof toast !== 'undefined') {
          toast('Could not delete that reply - you can only delete your own replies.', 3500);
        }
        return;
      }
      if (typeof toast !== 'undefined') toast('Reply deleted', 1500);
      await openPost(_currentPost);
    };
    if (typeof _confirmModal === 'function') {
      _confirmModal('Delete this reply?', doIt, { icon: '🗑', okLabel: 'Delete', danger: true });
    } else if (window.confirm('Delete this reply?')) {
      await doIt();
    }
  }

  // ── New post ──────────────────────────────────
  function showNewPost() {
    _sub('forum-new-post');
    const cat = CATS.find(c => c.id === _currentCat);
    const hdr = _el('forum-np-header');
    if (hdr && cat) hdr.textContent = `✏️ New Post in "${cat.label}"`;
    const t = _el('forum-np-title'); if (t) t.value = '';
    const b = _el('forum-np-body');  if (b) b.value = '';
    const e = _el('forum-np-error'); if (e) e.classList.add('hidden');
    updateChars('forum-np-title', 'forum-np-title-chars', TITLE_MAX);
    updateChars('forum-np-body',  'forum-np-body-chars',  BODY_MAX);
  }

  async function submitPost() {
    const errEl = _el('forum-np-error');
    if (!_sb) { _err(errEl, 'Not connected. Please refresh the page.'); return; }
    const title = _el('forum-np-title')?.value.trim();
    const body  = _el('forum-np-body')?.value.trim();
    if (!title || title.length < 3)  { _err(errEl,'Please enter a title (at least 3 characters).'); return; }
    if (title.length > TITLE_MAX)     { _err(errEl,`Title must be under ${TITLE_MAX} characters.`); return; }
    if (!body  || body.length < 5)   { _err(errEl,'Please write a bit more in the body.'); return; }
    if (body.length > BODY_MAX)       { _err(errEl,`Post body must be under ${BODY_MAX} characters.`); return; }
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
    const errEl = _el('forum-reply-error');
    if (!_sb) { _err(errEl, 'Not connected. Please refresh the page.'); return; }
    const body  = _el('forum-reply-input')?.value.trim();
    if (!body || body.length < 2)  { _err(errEl,'Please write something before replying.'); return; }
    if (body.length > REPLY_MAX)    { _err(errEl,`Reply must be under ${REPLY_MAX} characters.`); return; }
    const cooldownLeft = Math.ceil((COOLDOWN_MS - (Date.now() - _lastReplyAt)) / 1000);
    if (cooldownLeft > 0) { _err(errEl,`Please wait ${cooldownLeft} seconds before replying again.`); return; }
    const { name, type } = _author();
    const { error } = await _sb.from('forum_replies').insert({ post_id: _currentPost, body, author_name: name, author_type: type });
    if (error) { _err(errEl,'Could not post reply. Please try again.'); return; }
    _lastReplyAt = Date.now();
    const inp  = _el('forum-reply-input'); if (inp)  inp.value = '';
    const err2 = _el('forum-reply-error'); if (err2) err2.classList.add('hidden');
    updateChars('forum-reply-input', 'forum-reply-chars', REPLY_MAX);
    if (typeof toast !== 'undefined') toast('Reply posted!', 1500);
    await openPost(_currentPost);
  }

  // ── Nickname / display name settings ─────────
  function showNicknameSettings() {
    const panel = _el('forum-nick-panel');
    const input = _el('forum-nick-input');
    if (!panel) return;
    panel.classList.remove('hidden');
    if (input) {
      input.value = localStorage.getItem(NICK_KEY)?.trim() || '';
      input.focus();
    }
  }

  function hideNicknameSettings() {
    _el('forum-nick-panel')?.classList.add('hidden');
  }

  function saveNickname() {
    const val = _el('forum-nick-input')?.value.trim() || '';
    if (val) {
      localStorage.setItem(NICK_KEY, val);
    } else {
      localStorage.removeItem(NICK_KEY);
    }
    hideNicknameSettings();
    const displayEl = _el('forum-display-name');
    if (displayEl) displayEl.textContent = _author().name;
    if (typeof toast !== 'undefined') toast('Display name updated!', 1500);
  }

  // ── Back navigation ───────────────────────────
  function back() {
    const views = ['forum-new-post','forum-post-detail','forum-search-results'];
    for (const v of views) {
      if (!_el(v)?.classList.contains('hidden')) {
        const goBackTo = (v === 'forum-search-results') ? null : _currentCat;
        if (goBackTo) { openCategory(_currentCat); } else { render(); }
        return;
      }
    }
    render();
  }

  function _err(el, msg) { if (!el) return; el.textContent = msg; el.classList.remove('hidden'); }

  return {
    render, openCategory, openPost,
    showNewPost, submitPost, submitReply,
    back,
    searchPosts, setSort,
    likeItem,
    deletePost, deleteReply, closePost, reopenPost,
    updateChars,
    showNicknameSettings, hideNicknameSettings, saveNickname,
  };
})();
