'use strict';
// ══════════════════════════════════════════════
//  Supabase client — shared singleton
//  Loaded before all other engine files.
// ══════════════════════════════════════════════
const SB_URL = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_KEY = 'sb_publishable_wERRrZnvoWhM5faN2AaYpQ_CpTNHFkL';
const _sb = (typeof supabase !== 'undefined')
  ? supabase.createClient(SB_URL, SB_KEY, {
      auth: { persistSession: true, storageKey: 'mm_sb_auth' }
    })
  : null;
