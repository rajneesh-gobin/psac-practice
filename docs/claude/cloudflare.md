# Cloudflare Migration Plan

> Written 2026-09-12. Do not start this migration until the 4 pending labs are
> verified and committed. This is a future-state plan — the app runs on Netlify
> today and nothing here is urgent.

---

## Why migrate

| Pain point today | Cloudflare fix |
|---|---|
| 125,000 function calls / month free (Netlify) | 3,000,000 / month free (Workers) |
| 100 GB bandwidth cap | Unlimited |
| ~25 edge locations | 300+ — meaningful latency drop for Mauritius students |
| Build minutes (300 / month) | Unlimited |
| Paying for Netlify Analytics | Basic analytics included free |

The 125K function cap is the real driver. At ~200 active students each doing a
practice session per day, the app hits the cap. Cloudflare gives 24× the headroom
at no extra cost.

---

## The three blockers and how to fix them

### Blocker 1 — `questions.js` exceeds the 10 ms CPU limit

Cloudflare Workers charge CPU time, not wall-clock time. I/O (Supabase calls,
network) does not count. The current `questions.js` does JS-side entitlement
checking, plan filtering, question sampling and kill-switch logic — well over
10 ms of CPU.

**Fix: move all filtering into a Supabase RPC.**

```sql
-- supabase/migrations/YYYYMMDD_get_entitled_questions.sql
create or replace function get_entitled_questions(
  p_student_id  uuid,
  p_chapter     text,
  p_grade       int,
  p_limit       int  default 40
) returns jsonb
language plpgsql security definer as $$
declare
  v_plan        text;
  v_kill        boolean;
  v_entitled    boolean;
  v_rows        jsonb;
begin
  -- 1. resolve plan + kill switch from profiles / global_settings
  select p.plan, coalesce(gs.kill_switch, false)
    into v_plan, v_kill
    from profiles p
    cross join lateral (
      select value::boolean as kill_switch
        from global_settings where key = 'kill_switch'
      limit 1
    ) gs
   where p.id = p_student_id;

  if v_kill then
    return '[]'::jsonb;
  end if;

  -- 2. entitlement check (mirrors questions.js logic)
  v_entitled := (v_plan = 'unlimited')
             or (p_grade <= 2)   -- free forever
             or exists (
                  select 1 from entitlements
                   where student_id = p_student_id
                     and grade = p_grade
                );

  if not v_entitled then
    return '[]'::jsonb;
  end if;

  -- 3. fetch, sample and return
  select jsonb_agg(q order by random())
    into v_rows
    from (
      select data as q
        from questions
       where (data->>'chapterId') = p_chapter
         and (data->>'grade')::int = p_grade
       limit p_limit * 3          -- oversample, then trim in Worker
    ) sub;

  return coalesce(v_rows, '[]'::jsonb);
end;
$$;

grant execute on function get_entitled_questions to anon, authenticated;
```

The Worker then becomes a thin proxy (~3 ms CPU):

```js
// netlify/functions/questions.js  →  workers/questions.js
export default {
  async fetch(req, env) {
    // 1. validate student token (~1 ms — one Supabase row lookup)
    const token = req.headers.get('x-student-token');
    const student = await resolveStudentToken(token, env);
    if (!student) return error(401, 'Unauthorised');

    // 2. parse body
    const { chapter, grade, limit = 40 } = await req.json();

    // 3. call RPC — I/O only, not CPU time
    const { data, error: err } = await supabase(env)
      .rpc('get_entitled_questions', {
        p_student_id: student.id,
        p_chapter:    chapter,
        p_grade:      grade,
        p_limit:      limit,
      });

    if (err) return error(500, err.message);
    return Response.json(data, { headers: { 'cache-control': 'no-store' } });
  }
};
```

**Estimated effort:** 3–5 days. Write and test the RPC against production
(inside a transaction, rolled back). Then rewrite the Worker. Run
`wrangler dev` locally and verify entitlement, kill switch and free-grade
paths all behave identically to the Netlify version.

---

### Blocker 2 — other functions may exceed 10 ms CPU

Audit each function against the CPU limit before migrating:

| Function | CPU-heavy work | Likely safe? | Action |
|---|---|---|---|
| `questions.js` | entitlement + filtering | ❌ No | Rewrite as RPC proxy (Blocker 1) |
| `assignment-submit.js` | validation + DB write | ✅ Probably | Test with `wrangler dev` |
| `weekly-digest.js` | DB read + email template assembly | ✅ Probably | Test; template assembly is fast |
| `notify.js` | VAPID signing + DB read | ⚠ Maybe | VAPID signing is CPU-heavy; use `crypto.subtle` (native in Workers, near-zero CPU) |
| `push-subscribe.js` | DB write only | ✅ Yes | Straightforward |
| `push-unsubscribe.js` | DB write only | ✅ Yes | Straightforward |
| `parent-pin-signin.js` | bcrypt compare | ❌ No | bcrypt is intentionally slow (~100 ms CPU); switch to Argon2 via WASM or keep on Netlify |

**VAPID fix:** replace Node\'s `web-push` library with the Workers `crypto.subtle` API:
```js
// Workers native crypto — zero npm dependency, < 1 ms
const key = await crypto.subtle.importKey('jwk', vapidPrivateKey, ...);
const sig  = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, payload);
```

**bcrypt / parent PIN:** Cloudflare Workers paid plan raises the CPU limit to
50 ms, which covers bcrypt at cost factor 10. Alternatively, migrate PIN hashing
to Argon2 (WASM, available in Workers) or keep `parent-pin-signin.js` on Netlify
as a temporary hybrid until the paid plan is justified.

**Estimated effort:** 1–2 days once the RPC pattern from Blocker 1 is established.

---

### Blocker 3 — security allowlist must be re-verified

`scripts/prepare-deploy.js` is an allowlist that prevents `.env`,
`netlify/question-bundles/`, `past-papers/` and other sensitive directories from
shipping. It was written and tested against Netlify\'s deploy behaviour.

On Cloudflare Pages the build runs in a different environment. Verify before
any production deploy:

1. Run `wrangler pages deploy .deploy --project-name psac-practice` with
   `--dry-run` (if supported) or deploy to a preview project first.
2. Curl the deployed URL for each sensitive path:
   ```
   curl -I https://preview.psac-practice.pages.dev/.env
   curl -I https://preview.psac-practice.pages.dev/netlify/question-bundles/grade4-maths.json
   curl -I https://preview.psac-practice.pages.dev/past-papers/
   ```
   Every one must return 404, not 200.
3. Add a CI step that greps the `.deploy/` directory for `.env`,
   `service_role` and `question-bundles` before uploading.

**Estimated effort:** half a day.

---

## Migration sequence

```
Week 1  Write + test Supabase RPC for questions
        Rewrite questions.js as thin Worker proxy
        Test locally with wrangler dev — verify all entitlement paths

Week 2  Audit remaining 5 functions against 10 ms limit
        Fix VAPID signing with crypto.subtle
        Decide: bcrypt on paid Workers ($5/mo) or hybrid Netlify/CF

Week 3  Re-verify prepare-deploy.js allowlist on CF Pages
        Deploy to preview project (psac-practice-preview)
        Run full test suite against preview URL

Week 3  Flip DNS — update nameservers to Cloudflare
        Monitor Worker error rates for 1102 (CPU exceeded)
        Keep Netlify project live for 1 week as fallback
```

---

## What stays the same

- `supabase-schema.sql` — no changes, Supabase is not moving
- All client-side JS (`engine/`, `subjects/`, `index.html`) — identical
- `style.css`, `sw.js`, `manifest.json` — identical
- `scripts/prepare-deploy.js` — runs locally, output goes to `.deploy/`
- GitHub → auto-deploy wired in Cloudflare Pages dashboard (replaces manual
  `netlify deploy --prod`)

## What changes

| Today (Netlify) | After (Cloudflare) |
|---|---|
| `netlify.toml` | `wrangler.toml` + Cloudflare Pages config |
| `netlify/functions/*.js` | `workers/*.js` (one Worker per function) |
| Netlify env vars dashboard | Cloudflare Workers secrets dashboard |
| `netlify deploy --prod --dir=.deploy` | `wrangler pages deploy .deploy` |
| Explicit 404 redirect rules in `netlify.toml` | `_headers` / `_redirects` file in `.deploy/` |

## Do not start until

- [ ] 4 pending labs (nutrition, gastests, changes, energy) tested and committed
- [ ] Full test suite green on Netlify (the baseline to compare against)
- [ ] Supabase RPC written and tested in isolation
- [ ] `wrangler` CLI installed locally (`npm i -g wrangler`)
- [ ] Cloudflare account created, Pages project provisioned
