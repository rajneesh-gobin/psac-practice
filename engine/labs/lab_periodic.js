'use strict';
const LabPeriodic = (() => {
  const ID = 'periodic';
  const D = () => LabPeriodicData;

  let _root = null;
  let _elements = [];
  let _filter = 'all';
  let _selected = null;
  let _formulaA = null;
  let _formulaB = null;
  let _studyStep = null;
  const INVESTIGATION = { id: 'salt', grades: [9], title: 'Which elements make table salt?',
    blurb: 'Find sodium and chlorine, then read the formula they form.',
    lesson: 'Sodium is a metal and chlorine is a non-metal. Sodium chloride contains sodium and chlorine in a 1:1 ratio, so its formula is NaCl.',
    steps: [{ say: 'Tap Na (sodium), element 11.' }, { say: 'Tap Cl (chlorine), element 17. Read the formula below the table.' }] };

  function startGuide(id) {
    if (id !== INVESTIGATION.id) return;
    if (Labs.studyBegin && Labs.studyBegin(ID, INVESTIGATION, () => startGuide(id))) return;
    _formulaA = null; _formulaB = null; _studyStep = 0;
    _applyFilter('g9'); _renderFormula(); _studyRefresh();
  }
  function _studyRefresh() {
    let guide = _root.querySelector('#lab-guide');
    if (!guide) { guide = document.createElement('div'); guide.id = 'lab-guide'; guide.className = 'lab-guide'; _root.querySelector('.lab-pt-wrap').prepend(guide); }
    guide.hidden = _studyStep === null;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    if (_studyStep === null) return;
    guide.textContent = INVESTIGATION.steps[_studyStep].say;
    _root.querySelector(`[data-n="${_studyStep === 0 ? 11 : 17}"]`)?.classList.add('is-next');
    if (Labs.studyCheckpoint) Labs.studyCheckpoint(ID);
  }

  function mount(root) {
    _root = root;
    _elements = D().build();
    root.innerHTML = _shellHTML();
    _wire();
    _renderGrid();
    _renderDetail(null);
    _renderFormula();
  }

  function unmount() {
    if (_root) { _root.removeEventListener('click', _onClick); _root.removeEventListener('mouseover', _onHover); _root.removeEventListener('mouseout', _onHoverOut); }
    _root = null;
  }

  function _shellHTML() {
    const legend = Object.entries(D().TYPES).map(([, v]) =>
      `<span class="lab-pt-leg-dot" style="background:${v.color}"></span><span class="lab-pt-leg-label">${v.name}</span>`
    ).join('');
    return `
    <div class="lab lab-periodic">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">&#8592;</button>
        <div class="lab-top-title"><span class="lab-eyebrow">Chemistry &middot; Grade 9</span><h1>Periodic Table</h1></div>
      </header>
    <div class="lab-pt-wrap">
      <div class="lab-pt-left">
        <div class="lab-pt-filters" role="group" aria-label="Filter elements">
          <button class="lab-pt-filter is-active" data-filter="all">All</button>
          <button class="lab-pt-filter" data-filter="metal">Metals</button>
          <button class="lab-pt-filter" data-filter="nonmetal">Non-metals</button>
          <button class="lab-pt-filter" data-filter="noble">Noble gases</button>
          <button class="lab-pt-filter" data-filter="halogen">Halogens</button>
          <button class="lab-pt-filter" data-filter="alkali">Alkali metals</button>
          <button class="lab-pt-filter" data-filter="g9">Grade 9 key</button>
        </div>
        <div class="lab-pt-legend">${legend}</div>
        <div class="lab-pt-grid" id="lab-pt-grid" role="grid" aria-label="Periodic table"></div>
        <div class="lab-pt-fblock">
          <div class="lab-pt-fblock-row" id="lab-pt-lanthanides" aria-label="Lanthanides"></div>
          <div class="lab-pt-fblock-row" id="lab-pt-actinides" aria-label="Actinides"></div>
        </div>
      </div>
      <div class="lab-pt-right">
        <div class="lab-pt-detail" id="lab-pt-detail">
          <div class="lab-pt-detail-empty">Tap any element to learn about it.</div>
        </div>
        <div class="lab-pt-formula-box" id="lab-pt-formula">
          <div class="lab-pt-formula-title">Formula builder</div>
          <p class="lab-pt-formula-hint">Tap two elements to see the compound they form.</p>
          <div class="lab-pt-formula-slots">
            <div class="lab-pt-formula-slot" id="lab-pt-slot-a"><span class="lab-pt-formula-placeholder">?</span></div>
            <div class="lab-pt-formula-plus">+</div>
            <div class="lab-pt-formula-slot" id="lab-pt-slot-b"><span class="lab-pt-formula-placeholder">?</span></div>
            <div class="lab-pt-formula-arrow">→</div>
            <div class="lab-pt-formula-result" id="lab-pt-formula-result">?</div>
          </div>
          <p class="lab-pt-formula-explain" id="lab-pt-formula-explain"></p>
          <button class="lab-btn lab-pt-formula-clear" id="lab-pt-formula-clear" style="display:none">Clear</button>
        </div>
      </div>
    </div>
    </div>`;
  }

  function _renderGrid() {
    const grid = _root.querySelector('#lab-pt-grid');
    const lanRow = _root.querySelector('#lab-pt-lanthanides');
    const actRow = _root.querySelector('#lab-pt-actinides');
    if (!grid) return;

    const mainEls = _elements.filter(e => e.group !== null);
    grid.innerHTML = mainEls.map(e => _elCell(e)).join('');

    const lans = _elements.filter(e => e.type === 'lanthanide').sort((a, b) => a.n - b.n);
    const acts = _elements.filter(e => e.type === 'actinide').sort((a, b) => a.n - b.n);
    lanRow.innerHTML = '<span class="lab-pt-fblock-label">Lanthanides (57–71)</span>' + lans.map(e => _elCell(e)).join('');
    actRow.innerHTML = '<span class="lab-pt-fblock-label">Actinides (89–103)</span>' + acts.map(e => _elCell(e)).join('');
  }

  function _elCell(e) {
    const t = D().TYPES[e.type];
    const cls = ['lab-pt-el', t ? t.cls : '', e.g9 ? 'is-g9' : ''].filter(Boolean).join(' ');
    const style = e.group
      ? `style="grid-column:${e.group};grid-row:${e.period};background:${t ? t.color : '#ccc'}22;border-color:${t ? t.color : '#ccc'}"`
      : `style="background:${t ? t.color : '#ccc'}22;border-color:${t ? t.color : '#ccc'}"`;
    return `<button type="button" class="${cls}" data-n="${e.n}" ${style} aria-label="${e.name}" title="${e.name}">
      <span class="lab-pt-el-num">${e.n}</span>
      <span class="lab-pt-el-sym">${e.sym}</span>
    </button>`;
  }

  function _renderDetail(el) {
    const panel = _root.querySelector('#lab-pt-detail');
    if (!panel) return;
    if (!el) {
      panel.innerHTML = '<div class="lab-pt-detail-empty">Tap any element to learn about it.</div>';
      return;
    }
    const t = D().TYPES[el.type];
    const valStr = el.valency.length ? el.valency.join(', ') : 'does not bond';
    const cmpds = el.compounds.length
      ? `<ul class="lab-pt-detail-cmpds">${el.compounds.map(c => `<li>${c}</li>`).join('')}</ul>`
      : '<p class="lab-pt-detail-muted">No common compounds at this level.</p>';
    panel.innerHTML = `
      <div class="lab-pt-detail-head" style="border-color:${t ? t.color : '#ccc'}">
        <div class="lab-pt-detail-sym" style="color:${t ? t.color : '#888'}">${el.sym}</div>
        <div class="lab-pt-detail-meta">
          <div class="lab-pt-detail-name">${el.name}</div>
          <div class="lab-pt-detail-type" style="color:${t ? t.color : '#888'}">${t ? t.name : el.type}</div>
          <div class="lab-pt-detail-gp">Group ${el.group || 'f-block'} · Period ${el.period}</div>
        </div>
      </div>
      <div class="lab-pt-detail-row">
        <span class="lab-pt-detail-label">Combining power (valency)</span>
        <span class="lab-pt-detail-val">${valStr}</span>
      </div>
      ${el.note ? `<p class="lab-pt-detail-note">${el.note}</p>` : ''}
      <div class="lab-pt-detail-section">Common compounds</div>
      ${cmpds}
      ${el.g9 ? '<div class="lab-pt-detail-g9">⭐ In your Grade 9 Chemistry syllabus</div>' : ''}
    `;
  }

  function _computeFormula(a, b) {
    if (!a || !b) return null;
    if (!a.valency.length || !b.valency.length) return null;
    const va = a.valency[0];
    const vb = b.valency[0];
    if (va === 0 || vb === 0) return null;
    function gcd(x, y) { return y === 0 ? x : gcd(y, x % y); }
    const g = gcd(va, vb);
    const na = vb / g;
    const nb = va / g;
    const sub = n => n === 1 ? '' : `<sub>${n}</sub>`;
    return {
      formula: `${a.sym}${sub(na)}${b.sym}${sub(nb)}`,
      explain: `${a.name} has combining power ${va}, ${b.name} has combining power ${vb}. Cross-multiply and simplify: ${na} ${a.sym} bonds with ${nb} ${b.sym}.`,
    };
  }

  function _renderFormula() {
    const slotA = _root.querySelector('#lab-pt-slot-a');
    const slotB = _root.querySelector('#lab-pt-slot-b');
    const res = _root.querySelector('#lab-pt-formula-result');
    const explain = _root.querySelector('#lab-pt-formula-explain');
    const clearBtn = _root.querySelector('#lab-pt-formula-clear');
    if (!slotA) return;

    const tA = _formulaA ? D().TYPES[_formulaA.type] : null;
    const tB = _formulaB ? D().TYPES[_formulaB.type] : null;

    slotA.innerHTML = _formulaA
      ? `<span style="color:${tA ? tA.color : '#888'}">${_formulaA.sym}</span>`
      : '<span class="lab-pt-formula-placeholder">?</span>';
    slotB.innerHTML = _formulaB
      ? `<span style="color:${tB ? tB.color : '#888'}">${_formulaB.sym}</span>`
      : '<span class="lab-pt-formula-placeholder">?</span>';

    const result = _computeFormula(_formulaA, _formulaB);
    if (result) {
      res.innerHTML = result.formula;
      explain.innerHTML = result.explain;
      if (clearBtn) clearBtn.style.display = '';
    } else if (_formulaA || _formulaB) {
      res.innerHTML = '?';
      explain.textContent = (_formulaA && _formulaB) ? 'Cannot form a simple ionic compound from these.' : '';
      if (clearBtn) clearBtn.style.display = '';
    } else {
      res.innerHTML = '?';
      explain.textContent = '';
      if (clearBtn) clearBtn.style.display = 'none';
    }
  }

  const FILTER_MATCH = {
    all:     () => true,
    metal:   e => ['alkali','alkaline','transition','post'].includes(e.type),
    nonmetal:e => ['nonmetal','metalloid'].includes(e.type),
    noble:   e => e.type === 'noble',
    halogen: e => e.type === 'halogen',
    alkali:  e => e.type === 'alkali',
    g9:      e => e.g9,
  };

  function _applyFilter(filterId) {
    _filter = filterId;
    const match = FILTER_MATCH[filterId] || FILTER_MATCH.all;
    _root.querySelectorAll('.lab-pt-el').forEach(btn => {
      const el = _elements.find(e => e.n === Number(btn.dataset.n));
      const active = el && match(el);
      btn.classList.toggle('is-dim', !active);
      btn.classList.toggle('is-highlight', active && filterId !== 'all');
    });
    _root.querySelectorAll('.lab-pt-filter').forEach(b => {
      b.classList.toggle('is-active', b.dataset.filter === filterId);
    });
  }

  function _hoverHighlight(n) {
    const hEl = n ? _elements.find(e => e.n === n) : null;
    _root.querySelectorAll('.lab-pt-el').forEach(btn => {
      const el = _elements.find(e => e.n === Number(btn.dataset.n));
      if (!hEl || !el) {
        btn.classList.remove('is-hover-dim', 'is-hover-match', 'is-hovered');
        return;
      }
      btn.classList.toggle('is-hovered', el.n === hEl.n);
      btn.classList.toggle('is-hover-match', el.n !== hEl.n && el.type === hEl.type);
      btn.classList.toggle('is-hover-dim', el.n !== hEl.n && el.type !== hEl.type);
    });
  }

  function _wire() {
    _root.addEventListener('click', _onClick);
    _root.addEventListener('mouseover', _onHover);
    _root.addEventListener('mouseout', _onHoverOut);
  }

  function _onClick(e) {
    if (e.target.closest('[data-act="hub"]')) { Labs.backToHub(); return; }

    const filterBtn = e.target.closest('[data-filter]');
    if (filterBtn) { _applyFilter(filterBtn.dataset.filter); return; }

    const clearBtn = e.target.closest('#lab-pt-formula-clear');
    if (clearBtn) { _formulaA = null; _formulaB = null; _renderFormula(); return; }

    const cell = e.target.closest('.lab-pt-el');
    if (!cell) return;
    const el = _elements.find(x => x.n === Number(cell.dataset.n));
    if (!el) return;

    _selected = el;
    _root.querySelectorAll('.lab-pt-el').forEach(b => b.classList.toggle('is-selected', b.dataset.n === String(el.n)));
    _renderDetail(el);

    if (!_formulaA) {
      _formulaA = el;
    } else if (!_formulaB && _formulaA.n !== el.n) {
      _formulaB = el;
    } else {
      _formulaA = _formulaB;
      _formulaB = el;
    }
    _renderFormula();
    if (_studyStep === 0 && el.n === 11) { _studyStep = 1; _studyRefresh(); }
    else if (_studyStep === 1 && _formulaA?.n === 11 && el.n === 17) {
      _studyStep = null; _studyRefresh();
      if (Labs.studyComplete) Labs.studyComplete(ID, INVESTIGATION);
    }
  }

  function _onHover(e) {
    const cell = e.target.closest('.lab-pt-el');
    if (cell) _hoverHighlight(Number(cell.dataset.n));
  }

  function _onHoverOut(e) {
    if (!e.relatedTarget || !e.relatedTarget.closest('.lab-pt-el')) _hoverHighlight(null);
  }

  const study = {
    guides: () => [INVESTIGATION], start: startGuide,
    snapshot: () => ({ _filter, _selected, _formulaA, _formulaB, _studyStep }),
    restore: state => { ({ _filter, _selected, _formulaA, _formulaB, _studyStep } = state); },
    refresh: () => { _applyFilter(_filter); _renderDetail(_selected); _renderFormula(); _studyRefresh(); },
    stop: () => { _studyStep = null; _studyRefresh(); }
  };
  return { study, mount, unmount, id: ID };
})();
if (typeof window !== 'undefined') window.LabPeriodic = LabPeriodic;
