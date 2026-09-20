'use strict';
// Grade 6 History & Geography - Map Skills, second file: the Grade 6 syllabus
// outcomes the chapter was not asking at all.
//
// ⚠ WHY THIS FILE EXISTS. scripts/fact-ledgers/grade6-history.json is built from
//   the MIE Grade 6 MAP SKILLS table (Geography TLS, printed pages 31-32) and
//   reported eleven outcomes with NO question behind them: the four cardinal
//   points by name, the four key items of a map (title, scale, direction, key),
//   isotherms, isohyets, isolines as a family, and - the whole Level 3 row -
//   "extract and interpret information tables and graphs (line graph, bar graph,
//   pie chart)", plus larger-scale maps of Mauritius and Rodrigues and a map of
//   the areas facing natural hazards in the Indian Ocean.
//   ⚠ The graph and table row is not a maths outcome borrowed into geography: it
//   is printed in the Grade 6 MAP SKILLS table, and the PSAC paper asks it.
//
// ⚠ Two new subsections, `graph_reading` and `table_reading`, reuse the ids
//   grade9-social-modern-studies already uses (g9sms-map-data-skills) rather than
//   inventing a pair - and both are declared in _manifest.js. Declared and tagged
//   ids must match exactly or scripts/test-subsection-invariant.js fails.
//
// ⚠ One stimulus, several DIFFERENT jobs: read a value, compare two, total them,
//   name the trend, then use it to decide something. Six questions that change
//   only the number being read would be one question to a child.
//
// IDs: g6hg-ms-026 onwards (ch07_g6_map_skills.js ends at 025).

// ── Stimuli ───────────────────────────────────────────────────────────────
// ⚠ Every figure is inline SVG: it cannot 404, it works offline, and its
//   contents are known exactly. No label may give the answer away.

const _SVG_LINE = `<svg viewBox="0 0 260 170" width="260" height="170" role="img" aria-label="A line graph of monthly rainfall" style="display:block;margin:6px auto;background:#f8fafc;border-radius:8px;border:1px solid #cbd5e1">
  <text x="130" y="13" text-anchor="middle" font-size="9" font-weight="bold" fill="#0f172a">Rainfall at Vacoas</text>
  <line x1="38" y1="132" x2="246" y2="132" stroke="#475569" stroke-width="1.2"/>
  <line x1="38" y1="22" x2="38" y2="132" stroke="#475569" stroke-width="1.2"/>
  <text x="14" y="135" font-size="7" fill="#475569">0</text>
  <text x="8" y="107" font-size="7" fill="#475569">100</text>
  <text x="8" y="80" font-size="7" fill="#475569">200</text>
  <text x="8" y="53" font-size="7" fill="#475569">300</text>
  <text x="6" y="26" font-size="7" fill="#475569">400</text>
  <text x="20" y="18" font-size="6.5" fill="#64748b">mm</text>
  <line x1="38" y1="105" x2="246" y2="105" stroke="#e2e8f0" stroke-width="0.7"/>
  <line x1="38" y1="78" x2="246" y2="78" stroke="#e2e8f0" stroke-width="0.7"/>
  <line x1="38" y1="51" x2="246" y2="51" stroke="#e2e8f0" stroke-width="0.7"/>
  <polyline points="60,65 96,51 132,65 168,78 204,92 240,105" fill="none" stroke="#2563eb" stroke-width="2"/>
  <circle cx="60" cy="65" r="2.6" fill="#1d4ed8"/><circle cx="96" cy="51" r="2.6" fill="#1d4ed8"/>
  <circle cx="132" cy="65" r="2.6" fill="#1d4ed8"/><circle cx="168" cy="78" r="2.6" fill="#1d4ed8"/>
  <circle cx="204" cy="92" r="2.6" fill="#1d4ed8"/><circle cx="240" cy="105" r="2.6" fill="#1d4ed8"/>
  <text x="60" y="144" text-anchor="middle" font-size="7" fill="#475569">Jan</text>
  <text x="96" y="144" text-anchor="middle" font-size="7" fill="#475569">Feb</text>
  <text x="132" y="144" text-anchor="middle" font-size="7" fill="#475569">Mar</text>
  <text x="168" y="144" text-anchor="middle" font-size="7" fill="#475569">Apr</text>
  <text x="204" y="144" text-anchor="middle" font-size="7" fill="#475569">May</text>
  <text x="240" y="144" text-anchor="middle" font-size="7" fill="#475569">Jun</text>
  <text x="130" y="159" text-anchor="middle" font-size="7" fill="#64748b">Month</text>
</svg>`;

const _SVG_BAR = `<svg viewBox="0 0 260 175" width="260" height="175" role="img" aria-label="A bar graph of tourist arrivals by country" style="display:block;margin:6px auto;background:#fffbeb;border-radius:8px;border:1px solid #fcd34d">
  <text x="130" y="13" text-anchor="middle" font-size="9" font-weight="bold" fill="#78350f">Tourist arrivals in one year</text>
  <line x1="48" y1="130" x2="252" y2="130" stroke="#78350f" stroke-width="1.2"/>
  <line x1="48" y1="22" x2="48" y2="130" stroke="#78350f" stroke-width="1.2"/>
  <text x="24" y="133" font-size="7" fill="#78350f">0</text>
  <text x="20" y="106" font-size="7" fill="#78350f">80</text>
  <text x="16" y="79" font-size="7" fill="#78350f">160</text>
  <text x="16" y="52" font-size="7" fill="#78350f">240</text>
  <text x="16" y="26" font-size="7" fill="#78350f">320</text>
  <text x="26" y="17" font-size="6" fill="#92400e">thousands</text>
  <line x1="48" y1="106" x2="252" y2="106" stroke="#fde68a" stroke-width="0.7"/>
  <line x1="48" y1="79" x2="252" y2="79" stroke="#fde68a" stroke-width="0.7"/>
  <line x1="48" y1="52" x2="252" y2="52" stroke="#fde68a" stroke-width="0.7"/>
  <rect x="58" y="39" width="26" height="91" fill="#f59e0b" stroke="#b45309" stroke-width="0.8"/>
  <rect x="96" y="71" width="26" height="59" fill="#f59e0b" stroke="#b45309" stroke-width="0.8"/>
  <rect x="134" y="84" width="26" height="46" fill="#f59e0b" stroke="#b45309" stroke-width="0.8"/>
  <rect x="172" y="97" width="26" height="33" fill="#f59e0b" stroke="#b45309" stroke-width="0.8"/>
  <rect x="210" y="104" width="26" height="26" fill="#f59e0b" stroke="#b45309" stroke-width="0.8"/>
  <text x="71" y="141" text-anchor="middle" font-size="6.5" fill="#78350f">France</text>
  <text x="109" y="141" text-anchor="middle" font-size="6.5" fill="#78350f">Reunion</text>
  <text x="147" y="141" text-anchor="middle" font-size="6.5" fill="#78350f">U.K.</text>
  <text x="185" y="141" text-anchor="middle" font-size="6.5" fill="#78350f">S. Africa</text>
  <text x="223" y="141" text-anchor="middle" font-size="6.5" fill="#78350f">India</text>
  <text x="71" y="36" text-anchor="middle" font-size="6.5" fill="#78350f">280</text>
  <text x="109" y="68" text-anchor="middle" font-size="6.5" fill="#78350f">180</text>
  <text x="147" y="81" text-anchor="middle" font-size="6.5" fill="#78350f">140</text>
  <text x="185" y="94" text-anchor="middle" font-size="6.5" fill="#78350f">100</text>
  <text x="223" y="101" text-anchor="middle" font-size="6.5" fill="#78350f">80</text>
  <text x="150" y="157" text-anchor="middle" font-size="7" fill="#92400e">Country the tourists came from</text>
</svg>`;

const _SVG_PIE = `<svg viewBox="0 0 250 165" width="250" height="165" role="img" aria-label="A pie chart of land use" style="display:block;margin:6px auto;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">
  <text x="125" y="14" text-anchor="middle" font-size="9" font-weight="bold" fill="#14532d">How land is used in Mauritius</text>
  <path d="M85 88 L85 30 A58 58 0 0 1 119.1 134.9 Z" fill="#65a30d" stroke="#fff" stroke-width="1.2"/>
  <path d="M85 88 L119.1 134.9 A58 58 0 0 1 38.1 122.1 Z" fill="#f59e0b" stroke="#fff" stroke-width="1.2"/>
  <path d="M85 88 L38.1 122.1 A58 58 0 0 1 38.1 53.9 Z" fill="#16a34a" stroke="#fff" stroke-width="1.2"/>
  <path d="M85 88 L38.1 53.9 A58 58 0 0 1 85 30 Z" fill="#a3e635" stroke="#fff" stroke-width="1.2"/>
  <rect x="158" y="34" width="9" height="9" fill="#65a30d"/><text x="172" y="42" font-size="7" fill="#14532d">Sugar cane 40%</text>
  <rect x="158" y="50" width="9" height="9" fill="#f59e0b"/><text x="172" y="58" font-size="7" fill="#14532d">Built-up 25%</text>
  <rect x="158" y="66" width="9" height="9" fill="#16a34a"/><text x="172" y="74" font-size="7" fill="#14532d">Forest 20%</text>
  <rect x="158" y="82" width="9" height="9" fill="#a3e635"/><text x="172" y="90" font-size="7" fill="#14532d">Other crops 15%</text>
  <text x="125" y="156" text-anchor="middle" font-size="6.5" fill="#166534">Built-up land = towns, roads and hotels</text>
</svg>`;

const _TBL_RAIN = `<table style="border-collapse:collapse;margin:8px auto;font-size:.85rem">
  <caption style="font-weight:700;padding-bottom:4px">Rainfall in millimetres</caption>
  <tr><th style="border:1px solid #94a3b8;padding:3px 8px">Month</th><th style="border:1px solid #94a3b8;padding:3px 8px">Mauritius</th><th style="border:1px solid #94a3b8;padding:3px 8px">Rodrigues</th></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 8px">January</td><td style="border:1px solid #94a3b8;padding:3px 8px">220</td><td style="border:1px solid #94a3b8;padding:3px 8px">110</td></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 8px">February</td><td style="border:1px solid #94a3b8;padding:3px 8px">260</td><td style="border:1px solid #94a3b8;padding:3px 8px">130</td></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 8px">March</td><td style="border:1px solid #94a3b8;padding:3px 8px">210</td><td style="border:1px solid #94a3b8;padding:3px 8px">100</td></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 8px">April</td><td style="border:1px solid #94a3b8;padding:3px 8px">150</td><td style="border:1px solid #94a3b8;padding:3px 8px">80</td></tr>
</table>`;

const _TBL_ISLANDS = `<table style="border-collapse:collapse;margin:8px auto;font-size:.85rem">
  <caption style="font-weight:700;padding-bottom:4px">Islands of the Republic of Mauritius</caption>
  <tr><th style="border:1px solid #94a3b8;padding:3px 8px">Island</th><th style="border:1px solid #94a3b8;padding:3px 8px">Area (km&sup2;)</th><th style="border:1px solid #94a3b8;padding:3px 8px">People</th></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 8px">Mauritius</td><td style="border:1px solid #94a3b8;padding:3px 8px">1 865</td><td style="border:1px solid #94a3b8;padding:3px 8px">1 220 000</td></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 8px">Rodrigues</td><td style="border:1px solid #94a3b8;padding:3px 8px">108</td><td style="border:1px solid #94a3b8;padding:3px 8px">43 000</td></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 8px">Agalega</td><td style="border:1px solid #94a3b8;padding:3px 8px">26</td><td style="border:1px solid #94a3b8;padding:3px 8px">300</td></tr>
</table>`;

const _TBL_CYCLONE = `<table style="border-collapse:collapse;margin:8px auto;font-size:.85rem">
  <caption style="font-weight:700;padding-bottom:4px">Cyclone warning classes</caption>
  <tr><th style="border:1px solid #94a3b8;padding:3px 8px">Class</th><th style="border:1px solid #94a3b8;padding:3px 8px">Warning given</th><th style="border:1px solid #94a3b8;padding:3px 8px">Gusts</th></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 8px">I</td><td style="border:1px solid #94a3b8;padding:3px 8px">36 to 48 hours before</td><td style="border:1px solid #94a3b8;padding:3px 8px">none yet</td></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 8px">II</td><td style="border:1px solid #94a3b8;padding:3px 8px">12 hours before</td><td style="border:1px solid #94a3b8;padding:3px 8px">none yet</td></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 8px">III</td><td style="border:1px solid #94a3b8;padding:3px 8px">6 hours before</td><td style="border:1px solid #94a3b8;padding:3px 8px">none yet</td></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 8px">IV</td><td style="border:1px solid #94a3b8;padding:3px 8px">no notice</td><td style="border:1px solid #94a3b8;padding:3px 8px">already blowing</td></tr>
</table>`;

const _SVG_ISOTHERM = `<svg viewBox="0 0 230 165" width="230" height="165" role="img" aria-label="A map with isolines and labelled places" style="display:block;margin:6px auto;background:#fff7ed;border-radius:8px;border:1px solid #fdba74">
  <text x="115" y="13" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#7c2d12">Temperature map (&deg;C)</text>
  <path d="M30 40 Q115 24 200 40" fill="none" stroke="#dc2626" stroke-width="1.6"/>
  <text x="206" y="42" font-size="7" fill="#b91c1c">26</text>
  <path d="M30 72 Q115 56 200 72" fill="none" stroke="#ea580c" stroke-width="1.6"/>
  <text x="206" y="74" font-size="7" fill="#b91c1c">24</text>
  <path d="M30 104 Q115 88 200 104" fill="none" stroke="#f59e0b" stroke-width="1.6"/>
  <text x="206" y="106" font-size="7" fill="#b91c1c">22</text>
  <path d="M30 136 Q115 120 200 136" fill="none" stroke="#fbbf24" stroke-width="1.6"/>
  <text x="206" y="138" font-size="7" fill="#b91c1c">20</text>
  <circle cx="80" cy="50" r="3" fill="#1e293b"/><text x="86" y="53" font-size="7" fill="#1e293b">P</text>
  <circle cx="150" cy="85" r="3" fill="#1e293b"/><text x="156" y="88" font-size="7" fill="#1e293b">Q</text>
  <text x="115" y="158" text-anchor="middle" font-size="6.5" fill="#9a3412">Each line joins places with the same temperature</text>
</svg>`;

const _SVG_ISOHYET = `<svg viewBox="0 0 230 168" width="230" height="168" role="img" aria-label="A map with rainfall isolines and two labelled places" style="display:block;margin:6px auto;background:#eff6ff;border-radius:8px;border:1px solid #93c5fd">
  <text x="115" y="13" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#1e3a8a">Rainfall map (mm a year)</text>
  <ellipse cx="115" cy="88" rx="86" ry="58" fill="none" stroke="#93c5fd" stroke-width="1.6"/>
  <text x="26" y="90" font-size="7" fill="#1d4ed8">1000</text>
  <ellipse cx="115" cy="88" rx="62" ry="41" fill="none" stroke="#60a5fa" stroke-width="1.6"/>
  <text x="56" y="90" font-size="7" fill="#1d4ed8">1500</text>
  <ellipse cx="115" cy="88" rx="36" ry="24" fill="none" stroke="#2563eb" stroke-width="1.6"/>
  <text x="84" y="90" font-size="7" fill="#1d4ed8">2000</text>
  <ellipse cx="115" cy="88" rx="14" ry="10" fill="#1e40af" opacity=".25" stroke="#1e40af" stroke-width="1.6"/>
  <circle cx="115" cy="88" r="2.6" fill="#0f172a"/><text x="120" y="86" font-size="7" fill="#0f172a">X</text>
  <circle cx="208" cy="126" r="2.6" fill="#0f172a"/><text x="197" y="139" font-size="7" fill="#0f172a">Y</text>
  <text x="115" y="161" text-anchor="middle" font-size="6.5" fill="#1e40af">Each line joins places with the same yearly rainfall</text>
</svg>`;

const _SVG_COMPASS = `<svg viewBox="0 0 170 170" width="170" height="170" role="img" aria-label="An eight point compass rose" style="display:block;margin:6px auto;background:#f8fafc;border-radius:8px;border:1px solid #cbd5e1">
  <circle cx="85" cy="85" r="62" fill="none" stroke="#cbd5e1" stroke-width="1"/>
  <line x1="85" y1="23" x2="85" y2="147" stroke="#475569" stroke-width="1.4"/>
  <line x1="23" y1="85" x2="147" y2="85" stroke="#475569" stroke-width="1.4"/>
  <line x1="41" y1="41" x2="129" y2="129" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="129" y1="41" x2="41" y2="129" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2"/>
  <polygon points="85,18 81,32 89,32" fill="#dc2626"/>
  <text x="85" y="14" text-anchor="middle" font-size="9" font-weight="bold" fill="#dc2626">N</text>
  <text x="85" y="162" text-anchor="middle" font-size="9" font-weight="bold" fill="#0f172a">S</text>
  <text x="158" y="89" text-anchor="middle" font-size="9" font-weight="bold" fill="#0f172a">E</text>
  <text x="12" y="89" text-anchor="middle" font-size="9" font-weight="bold" fill="#0f172a">W</text>
  <text x="132" y="36" text-anchor="middle" font-size="7.5" fill="#475569">NE</text>
  <text x="38" y="36" text-anchor="middle" font-size="7.5" fill="#475569">NW</text>
  <text x="132" y="142" text-anchor="middle" font-size="7.5" fill="#475569">SE</text>
  <text x="38" y="142" text-anchor="middle" font-size="7.5" fill="#475569">SW</text>
</svg>`;

const _SVG_KEYMAP = `<svg viewBox="0 0 250 175" width="250" height="175" role="img" aria-label="A small map with the usual map furniture" style="display:block;margin:6px auto;background:#f0fdfa;border-radius:8px;border:1px solid #5eead4">
  <text x="90" y="15" text-anchor="middle" font-size="9" font-weight="bold" fill="#134e4a">Riviere Noire district</text>
  <rect x="16" y="22" width="148" height="112" fill="#ccfbf1" stroke="#0f766e" stroke-width="1"/>
  <path d="M16 96 Q60 84 104 100 T164 92" fill="none" stroke="#0ea5e9" stroke-width="2"/>
  <rect x="44" y="44" width="12" height="9" fill="#b45309"/>
  <rect x="104" y="60" width="12" height="9" fill="#b45309"/>
  <polygon points="72,118 66,128 78,128" fill="#166534"/>
  <polygon points="124,116 118,128 130,128" fill="#166534"/>
  <line x1="24" y1="146" x2="84" y2="146" stroke="#134e4a" stroke-width="2"/>
  <line x1="24" y1="142" x2="24" y2="150" stroke="#134e4a" stroke-width="2"/>
  <line x1="84" y1="142" x2="84" y2="150" stroke="#134e4a" stroke-width="2"/>
  <text x="54" y="160" text-anchor="middle" font-size="7" fill="#134e4a">0        4 km</text>
  <polygon points="150,140 145,154 155,154" fill="#134e4a"/>
  <text x="150" y="166" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#134e4a">N</text>
  <rect x="176" y="30" width="66" height="56" fill="#fff" stroke="#0f766e" stroke-width="1"/>
  <text x="209" y="41" text-anchor="middle" font-size="7" font-weight="bold" fill="#134e4a">Key</text>
  <rect x="182" y="48" width="9" height="7" fill="#b45309"/><text x="195" y="55" font-size="6.5" fill="#134e4a">village</text>
  <polygon points="186,64 182,72 190,72" fill="#166534"/><text x="195" y="71" font-size="6.5" fill="#134e4a">forest</text>
  <line x1="181" y1="79" x2="191" y2="79" stroke="#0ea5e9" stroke-width="2"/><text x="195" y="82" font-size="6.5" fill="#134e4a">river</text>
</svg>`;

const _SVG_OCEAN = `<svg viewBox="0 0 250 175" width="250" height="175" role="img" aria-label="A map of part of the Indian Ocean with a storm track" style="display:block;margin:6px auto;background:#e0f2fe;border-radius:8px;border:1px solid #7dd3fc">
  <text x="125" y="14" text-anchor="middle" font-size="9" font-weight="bold" fill="#075985">The south-west Indian Ocean</text>
  <path d="M42 52 L62 44 L74 66 L70 104 L54 122 L38 98 Z" fill="#86efac" stroke="#15803d" stroke-width="1"/>
  <text x="56" y="88" text-anchor="middle" font-size="7" fill="#14532d">Madagascar</text>
  <circle cx="118" cy="104" r="6" fill="#86efac" stroke="#15803d" stroke-width="1"/>
  <text x="118" y="122" text-anchor="middle" font-size="6.5" fill="#14532d">Reunion</text>
  <circle cx="152" cy="96" r="6" fill="#86efac" stroke="#15803d" stroke-width="1"/>
  <text x="152" y="86" text-anchor="middle" font-size="6.5" fill="#14532d">Mauritius</text>
  <circle cx="196" cy="92" r="4.5" fill="#86efac" stroke="#15803d" stroke-width="1"/>
  <text x="200" y="82" text-anchor="middle" font-size="6.5" fill="#14532d">Rodrigues</text>
  <path d="M226 36 Q196 60 166 78" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="5,3"/>
  <polygon points="166,78 174,74 172,83" fill="#dc2626"/>
  <text x="214" y="30" text-anchor="middle" font-size="6.5" fill="#b91c1c">storm track</text>
  <polygon points="26,140 21,152 31,152" fill="#075985"/>
  <text x="26" y="163" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#075985">N</text>
  <text x="140" y="164" text-anchor="middle" font-size="6.5" fill="#0c4a6e">The broken line is the path the storm is expected to take</text>
</svg>`;

STATIC_QUESTIONS.push(

  // ── Line graph ──────────────────────────────────────────────────────────
  makeMCQ({ id:'g6hg-ms-026', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:1,
    question:`${_SVG_LINE}In which month did the most rain fall?`,
    options:['February','January','April','June'], answer:'February',
    hint:'Find the highest point on the line, then read the month below it.',
    explanation:'The highest point of the line is above <b>February</b>, at 300&nbsp;mm. On a line graph the highest point is always the largest value.' }),

  makeMCQ({ id:'g6hg-ms-027', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:1,
    question:`${_SVG_LINE}How much rain fell in April?`,
    options:['200 mm','150 mm','250 mm','300 mm'], answer:'200 mm',
    hint:'Go up from April to the dot, then straight across to the scale on the left.',
    explanation:'Reading across from the April dot gives <b>200&nbsp;mm</b>. Always read a value in two steps: up from the month, then across to the scale.' }),

  makeMCQ({ id:'g6hg-ms-028', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:2,
    question:`${_SVG_LINE}In which month did the rainfall first drop below 200 mm?`,
    options:['May','April','March','June'], answer:'May',
    hint:'April sits exactly on the 200 mm line, so it has not dropped below it yet.',
    explanation:'April is exactly 200&nbsp;mm, so the first month <i>below</i> that line is <b>May</b> at 150&nbsp;mm. "Below 200" does not include 200 itself.' }),

  makeMCQ({ id:'g6hg-ms-029', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:2,
    question:`${_SVG_LINE}How much more rain fell in January than in June?`,
    options:['150 mm','100 mm','200 mm','250 mm'], answer:'150 mm',
    hint:'Read both values first, then take the smaller away from the larger.',
    explanation:'January is 250&nbsp;mm and June is 100&nbsp;mm, so the difference is 250 &minus; 100 = <b>150&nbsp;mm</b>.' }),

  makeMCQ({ id:'g6hg-ms-030', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:2,
    question:`${_SVG_LINE}What does the line do between February and June?`,
    options:['It falls steadily','It rises steadily','It stays level','It rises then falls'], answer:'It falls steadily',
    hint:'Follow the line with your finger from February across to June.',
    explanation:'After the February peak each month is lower than the one before, so the line <b>falls steadily</b>. Describing the shape of a line is called reading the <b>trend</b>.' }),

  makeMCQ({ id:'g6hg-ms-031', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:2,
    question:'Which kind of information is a <b>line graph</b> best at showing?',
    options:['How something changes over time','How one whole is divided up','How far two towns lie apart','How many symbols a map uses'], answer:'How something changes over time',
    hint:'Think about what is written along the bottom of most line graphs.',
    explanation:'A line graph joins values in order, so it shows <b>change over time</b> &mdash; rainfall month by month, or temperature hour by hour. A pie chart divides one whole instead.' }),

  makeMCQ({ id:'g6hg-ms-032', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:4,
    question:`${_SVG_LINE}A farmer will only plant a crop in a month with at least 200 mm of rain. For how many of these six months can she plant?`,
    options:['Four','Three','Five','Two'], answer:'Four',
    hint:'"At least 200" includes a month of exactly 200 mm.',
    explanation:'January 250, February 300, March 250 and April 200 all reach 200&nbsp;mm, so <b>four</b> months qualify. May and June fall short. "At least" means 200 counts.' }),

  // ── Bar graph ───────────────────────────────────────────────────────────
  makeMCQ({ id:'g6hg-ms-033', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:1,
    question:`${_SVG_BAR}From which country did the most tourists come?`,
    options:['France','Reunion','India','South Africa'], answer:'France',
    hint:'On a bar graph the tallest bar is the largest number.',
    explanation:'The <b>France</b> bar is the tallest, at 280&nbsp;000 tourists. On a bar graph you can compare groups at a glance by their height.' }),

  makeMCQ({ id:'g6hg-ms-034', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:1,
    question:`${_SVG_BAR}How many tourists came from the United Kingdom?`,
    options:['140 000','100 000','180 000','80 000'], answer:'140 000',
    hint:'The numbers on the left are in thousands.',
    explanation:'The U.K. bar reaches 140 on a scale marked in thousands, so <b>140&nbsp;000</b> tourists came. Always check the units written on the scale.' }),

  makeMCQ({ id:'g6hg-ms-035', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:2,
    question:`${_SVG_BAR}How many more tourists came from France than from Reunion?`,
    options:['100 000','80 000','120 000','60 000'], answer:'100 000',
    hint:'Take the shorter bar away from the taller one.',
    explanation:'France sent 280&nbsp;000 and Reunion 180&nbsp;000, so France sent <b>100&nbsp;000</b> more. "How many more" always means a subtraction.' }),

  makeMCQ({ id:'g6hg-ms-036', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:3,
    question:`${_SVG_BAR}Which country sent as many tourists as South Africa and India together?`,
    options:['Reunion','France','United Kingdom','None of them'], answer:'Reunion',
    hint:'Add the two shortest bars, then look for a single bar of that height.',
    explanation:'South Africa 100&nbsp;000 + India 80&nbsp;000 = 180&nbsp;000, which is exactly the <b>Reunion</b> bar. Adding bars before comparing is a Level 3 skill.' }),

  makeMCQ({ id:'g6hg-ms-037', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:3,
    question:`${_SVG_BAR}How many tourists came from the five countries altogether?`,
    options:['780 000','680 000','880 000','720 000'], answer:'780 000',
    hint:'Add all five bars: 280 + 180 + 140 + 100 + 80.',
    explanation:'280 + 180 + 140 + 100 + 80 = 780, and the scale is in thousands, so <b>780&nbsp;000</b> tourists in all.' }),

  makeMCQ({ id:'g6hg-ms-038', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:2,
    question:`${_SVG_BAR}Which country sent the third largest number of tourists?`,
    options:['United Kingdom','Reunion','South Africa','India'], answer:'United Kingdom',
    hint:'Put the bars in order from tallest to shortest, then count to the third.',
    explanation:'In order: France, Reunion, then the <b>United Kingdom</b>. Ranking the bars is a different job from reading one value off them.' }),

  makeMCQ({ id:'g6hg-ms-039', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:2,
    question:'Which kind of information is a <b>bar graph</b> best at showing?',
    options:['Comparing separate groups','Showing parts of one whole','Showing the height of land','Showing the way to a place'], answer:'Comparing separate groups',
    hint:'Each bar stands on its own and has its own label.',
    explanation:'Bars stand side by side, so a bar graph is best for <b>comparing separate groups</b> &mdash; countries, districts, schools. A pie chart is for parts of one whole.' }),

  // ── Pie chart ───────────────────────────────────────────────────────────
  makeMCQ({ id:'g6hg-ms-040', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:1,
    question:`${_SVG_PIE}Which use takes the largest share of the land?`,
    options:['Sugar cane','Built-up land','Forest','Other crops'], answer:'Sugar cane',
    hint:'The biggest slice of the circle is the biggest share.',
    explanation:'<b>Sugar cane</b> takes 40%, the largest slice. On a pie chart the whole circle is 100% and each slice is a part of it.' }),

  makeMCQ({ id:'g6hg-ms-041', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:2,
    question:`${_SVG_PIE}What fraction of the land is built up?`,
    options:['A quarter','A half','A third','A fifth'], answer:'A quarter',
    hint:'25 out of every 100 is the same as one out of every four.',
    explanation:'Built-up land is 25%, and 25% of a circle is <b>a quarter</b> of it. Turning a percentage into a fraction makes a pie chart easier to picture.' }),

  makeMCQ({ id:'g6hg-ms-042', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:3,
    question:`${_SVG_PIE}Do sugar cane and built-up land together take up more than half the land?`,
    options:['Yes, they take 65%','No, they take 45%','No, they take exactly 50%','Yes, they take 85%'], answer:'Yes, they take 65%',
    hint:'Add the two percentages, then compare the total with 50%.',
    explanation:'40% + 25% = <b>65%</b>, which is more than half. Adding slices before comparing them with a half is how a pie chart answers a "most of the land" question.' }),

  makeMCQ({ id:'g6hg-ms-043', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:2,
    question:`${_SVG_PIE}How much more land is under forest than under other crops?`,
    options:['5%','10%','15%','20%'], answer:'5%',
    hint:'Read both slices from the key, then subtract.',
    explanation:'Forest is 20% and other crops 15%, so forest takes <b>5%</b> more of the land.' }),

  makeMCQ({ id:'g6hg-ms-044', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:2,
    question:'What does a <b>pie chart</b> show?',
    options:['How one whole is shared out','How something changes each year','How high the land rises','How far apart two places are'], answer:'How one whole is shared out',
    hint:'The whole circle always stands for everything together.',
    explanation:'A pie chart shows <b>how one whole is shared out</b> into parts, and every slice together makes 100%.' }),

  makeMCQ({ id:'g6hg-ms-045', chapterId:'g6-map-skills', subsection:'graph_reading', difficulty:4,
    question:'A pupil draws a pie chart of land use and his four slices add up to 110%. What must be wrong?',
    options:['The slices cannot pass 100%','He used too few colours','He needed a bar graph','He forgot to give it a title'], answer:'The slices cannot pass 100%',
    hint:'Think about what the whole circle stands for.',
    explanation:'The whole circle is everything, so every slice together must make exactly 100%. A total of 110% means a value has been <b>measured or copied wrongly</b>.' }),

  // ── Tables ──────────────────────────────────────────────────────────────
  makeMCQ({ id:'g6hg-ms-046', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:1,
    question:`${_TBL_RAIN}How much rain fell in Rodrigues in February?`,
    options:['130 mm','110 mm','260 mm','100 mm'], answer:'130 mm',
    hint:'Find the February row first, then move across to the Rodrigues column.',
    explanation:'Read a table in two steps: along the <b>February</b> row, then down the <b>Rodrigues</b> column. They meet at <b>130&nbsp;mm</b>.' }),

  makeMCQ({ id:'g6hg-ms-047', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:1,
    question:`${_TBL_RAIN}Which month was the wettest in Mauritius?`,
    options:['February','January','March','April'], answer:'February',
    hint:'Look down the Mauritius column only and find the biggest number.',
    explanation:'The Mauritius column reads 220, 260, 210, 150, so <b>February</b> at 260&nbsp;mm was the wettest.' }),

  makeMCQ({ id:'g6hg-ms-048', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:2,
    question:`${_TBL_RAIN}How much more rain fell in Mauritius than in Rodrigues in January?`,
    options:['110 mm','100 mm','120 mm','130 mm'], answer:'110 mm',
    hint:'Read both numbers in the January row, then subtract.',
    explanation:'220 &minus; 110 = <b>110&nbsp;mm</b>. A table makes a comparison easy because both values sit in the same row.' }),

  makeMCQ({ id:'g6hg-ms-049', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:2,
    question:`${_TBL_RAIN}Which island is the drier of the two in every month shown?`,
    options:['Rodrigues','Mauritius','They are the same','It changes each month'], answer:'Rodrigues',
    hint:'Compare the two numbers in each row, one row at a time.',
    explanation:'In all four rows the Rodrigues number is smaller, so <b>Rodrigues</b> is drier every month. A pattern that holds in every row is worth stating.' }),

  makeMCQ({ id:'g6hg-ms-050', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:3,
    question:`${_TBL_RAIN}How much rain fell in Rodrigues over the four months altogether?`,
    options:['420 mm','400 mm','440 mm','380 mm'], answer:'420 mm',
    hint:'Add the whole Rodrigues column: 110 + 130 + 100 + 80.',
    explanation:'110 + 130 + 100 + 80 = <b>420&nbsp;mm</b>. Adding a whole column is how a table gives a total.' }),

  makeMCQ({ id:'g6hg-ms-051', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:4,
    question:`${_TBL_RAIN}In which month did Mauritius receive more than twice as much rain as Rodrigues?`,
    options:['March','January','February','April'], answer:'March',
    hint:'Double the Rodrigues figure in each row, then see whether Mauritius passes it.',
    explanation:'Doubling Rodrigues gives 220, 260, 200 and 160. Mauritius reaches 220 and 260 exactly in January and February &mdash; equal is not "more than" &mdash; and falls short in April. Only in <b>March</b> (210 against 200) does it pass twice as much.' }),

  makeMCQ({ id:'g6hg-ms-052', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:1,
    question:`${_TBL_ISLANDS}How many people live in Rodrigues?`,
    options:['43 000','300','1 220 000','108'], answer:'43 000',
    hint:'Find the Rodrigues row, then move to the column headed "People".',
    explanation:'The Rodrigues row and the People column meet at <b>43&nbsp;000</b>. The 108 in the same row is its area, not its population.' }),

  makeMCQ({ id:'g6hg-ms-053', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:1,
    question:`${_TBL_ISLANDS}Which island has the smallest area?`,
    options:['Agalega','Rodrigues','Mauritius','They are equal'], answer:'Agalega',
    hint:'Compare only the numbers in the Area column.',
    explanation:'The Area column reads 1&nbsp;865, 108 and 26, so <b>Agalega</b> is the smallest at 26&nbsp;km&sup2;.' }),

  makeMCQ({ id:'g6hg-ms-054', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:2,
    question:`${_TBL_ISLANDS}Roughly how many times larger than Rodrigues is Mauritius in area?`,
    options:['About 17 times','About 7 times','About 40 times','About 2 times'], answer:'About 17 times',
    hint:'Divide 1 865 by 108 &mdash; round both numbers first to make it easy.',
    explanation:'1&nbsp;865 &divide; 108 is close to 1&nbsp;800 &divide; 100, which is about <b>17 times</b>. Rounding before dividing is enough when the question says "roughly".' }),

  makeMCQ({ id:'g6hg-ms-055', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:3,
    question:`${_TBL_ISLANDS}A pupil says Agalega must be crowded because it is small. What does the table actually show?`,
    options:['It is small and has few people','It is small and very crowded','It is large and nearly empty','It is crowded but very large'], answer:'It is small and has few people',
    hint:'Read the two Agalega numbers together, not just the area.',
    explanation:'Agalega has 26&nbsp;km&sup2; and only 300 people, so it is <b>small and has few people</b> living on it. Two columns read together tell you something neither tells you alone.' }),

  makeMCQ({ id:'g6hg-ms-056', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:2,
    question:`${_TBL_ISLANDS}What is the total area of the three islands?`,
    options:['1 999 km&sup2;','1 973 km&sup2;','2 099 km&sup2;','1 891 km&sup2;'], answer:'1 999 km&sup2;',
    hint:'Add the Area column: 1 865 + 108 + 26.',
    explanation:'1&nbsp;865 + 108 + 26 = <b>1&nbsp;999&nbsp;km&sup2;</b>.' }),

  makeMCQ({ id:'g6hg-ms-057', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:1,
    question:`${_TBL_CYCLONE}How long before the gusts is a Class II warning given?`,
    options:['12 hours','6 hours','36 hours','No notice'], answer:'12 hours',
    hint:'Find the row for Class II and read across.',
    explanation:'The Class II row says <b>12 hours before</b>. The classes are a countdown: the higher the class, the less time is left.' }),

  makeMCQ({ id:'g6hg-ms-058', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:2,
    question:`${_TBL_CYCLONE}Which class means the strong gusts are already blowing?`,
    options:['Class IV','Class III','Class II','Class I'], answer:'Class IV',
    hint:'Look down the Gusts column for the row that is different from the rest.',
    explanation:'Only the <b>Class IV</b> row says the gusts are already blowing. By then it is too late to prepare, which is why the earlier classes exist.' }),

  makeMCQ({ id:'g6hg-ms-059', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:3,
    question:`${_TBL_CYCLONE}A family hears a Class II warning at 8 a.m. Roughly when should they expect the gusts?`,
    options:['About 8 p.m. the same day','About 8 a.m. the next day','Within the hour','Two days later'], answer:'About 8 p.m. the same day',
    hint:'Add the warning time in the table to 8 a.m.',
    explanation:'Class II is given about 12 hours ahead, and 8&nbsp;a.m. + 12 hours is <b>about 8&nbsp;p.m. the same day</b>. Reading a table and then using it is the whole point of one.' }),

  makeMCQ({ id:'g6hg-ms-060', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:4,
    question:`${_TBL_CYCLONE}A family has still not closed their shutters when Class III is announced. Why is that a problem?`,
    options:['Only about six hours are left','The cyclone has already passed','Class III is only a practice','Shutters are not needed at all'], answer:'Only about six hours are left',
    hint:'Compare the warning time for Class III with the one for Class II.',
    explanation:'Class III is given <b>about six hours</b> before the gusts, half the time Class II allowed. The table is a countdown, and each class leaves less room to get ready.' }),

  makeMCQ({ id:'g6hg-ms-061', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:2,
    question:'When you read a value in a table, which two things must you use?',
    options:['The row and the column','The title and the date','The colour and the size','The scale and the key'], answer:'The row and the column',
    hint:'One tells you which thing, the other tells you which measurement.',
    explanation:'A value sits where its <b>row</b> meets its <b>column</b>. Reading only one of the two is the commonest mistake with a table.' }),

  makeMCQ({ id:'g6hg-ms-062', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:2,
    question:'Why does a table nearly always carry units in its heading, such as mm or km&sup2;?',
    options:['So the numbers can be understood','So the table looks tidy','So it can be drawn faster','So the rows stay in order'], answer:'So the numbers can be understood',
    hint:'Ask yourself what "220" on its own would mean.',
    explanation:'A number with no unit means nothing: 220 could be millimetres, kilometres or people. The heading gives the number its meaning.' }),

  makeMCQ({ id:'g6hg-ms-063', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:3,
    question:'You want to compare the rainfall of four districts in one month. Which would show it most clearly?',
    options:['A bar graph','A line graph','A pie chart','A contour map'], answer:'A bar graph',
    hint:'The four districts are separate groups, not one whole and not a change over time.',
    explanation:'Separate groups compared side by side is exactly what a <b>bar graph</b> does. A line graph would suggest the districts follow on from one another.' }),

  makeMCQ({ id:'g6hg-ms-064', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:3,
    question:'You want to show how the rainfall of one district changed over twelve months. Which would show it best?',
    options:['A line graph','A bar graph','A pie chart','A table only'], answer:'A line graph',
    hint:'The months follow one another in order.',
    explanation:'Values that follow one another in time are best joined up, so a <b>line graph</b> shows the rise and fall at a glance.' }),

  makeMCQ({ id:'g6hg-ms-065', chapterId:'g6-map-skills', subsection:'table_reading', difficulty:3,
    question:'You want to show how the land of one district is shared between cane, forest and houses. Which would show it best?',
    options:['A pie chart','A line graph','A bar graph','A relief map'], answer:'A pie chart',
    hint:'The three uses together make up all of the land in that district.',
    explanation:'The three uses together are one whole, so a <b>pie chart</b> shows each as a share of it.' }),

  // ── Isolines: contours, isotherms, isohyets ─────────────────────────────
  makeMCQ({ id:'g6hg-ms-066', chapterId:'g6-map-skills', subsection:'contours', difficulty:1,
    question:`${_SVG_ISOTHERM}What does each line on this map join?`,
    options:['Places with the same temperature','Places at the same height','Places with the same rainfall','Places in the same district'], answer:'Places with the same temperature',
    hint:'Read the label at the end of each line and the unit in the title.',
    explanation:'Each line is labelled in degrees, so it joins <b>places with the same temperature</b>. A line like this is called an <b>isotherm</b>.' }),

  makeMCQ({ id:'g6hg-ms-067', chapterId:'g6-map-skills', subsection:'contours', difficulty:2,
    question:'A line on a map joining all the places that have the same temperature is called:',
    options:['an isotherm','an isohyet','a contour','a meridian'], answer:'an isotherm',
    hint:'"Therm" is the part of the word that also appears in thermometer.',
    explanation:'An <b>isotherm</b> joins places of equal temperature &mdash; the same "therm" as in thermometer. An isohyet joins equal rainfall, a contour equal height.' }),

  makeMCQ({ id:'g6hg-ms-068', chapterId:'g6-map-skills', subsection:'contours', difficulty:2,
    question:`${_SVG_ISOTHERM}Which place is the warmer of the two, P or Q?`,
    options:['P','Q','They are the same','The map cannot say'], answer:'P',
    hint:'Find which pair of lines each letter sits between, then read those labels.',
    explanation:'<b>P</b> lies between the 24&deg; and 26&deg; lines while Q lies between 22&deg; and 24&deg;, so P is warmer. A place between two isolines has a value between their two labels.' }),

  makeMCQ({ id:'g6hg-ms-069', chapterId:'g6-map-skills', subsection:'contours', difficulty:1,
    question:`${_SVG_ISOHYET}What does each line on this map join?`,
    options:['Places with the same rainfall','Places with the same temperature','Places at the same height','Places with the same crops'], answer:'Places with the same rainfall',
    hint:'The title gives the unit, and it is a unit of rain.',
    explanation:'The lines are labelled in millimetres of rain a year, so each joins <b>places with the same rainfall</b>. Such a line is an <b>isohyet</b>.' }),

  makeMCQ({ id:'g6hg-ms-070', chapterId:'g6-map-skills', subsection:'contours', difficulty:2,
    question:'A line on a map joining all the places that receive the same amount of rain is called:',
    options:['an isohyet','an isotherm','a contour','a latitude'], answer:'an isohyet',
    hint:'It is the rainfall twin of the isotherm.',
    explanation:'An <b>isohyet</b> joins places of equal rainfall. Contour, isotherm and isohyet are the same idea applied to height, heat and rain.' }),

  makeMCQ({ id:'g6hg-ms-071', chapterId:'g6-map-skills', subsection:'contours', difficulty:2,
    question:`${_SVG_ISOHYET}Which part of this island receives the most rain?`,
    options:['The centre','The east coast','The north','The whole island equally'], answer:'The centre',
    hint:'The innermost ring carries the largest number.',
    explanation:'The rings grow from 1000&nbsp;mm at the edge to over 2000&nbsp;mm in the middle, so <b>the centre</b> is wettest &mdash; the pattern of the central plateau of Mauritius.' }),

  makeMCQ({ id:'g6hg-ms-072', chapterId:'g6-map-skills', subsection:'contours', difficulty:3,
    question:`${_SVG_ISOHYET}About how much rain does place Y receive in a year?`,
    options:['Less than 1000 mm','Between 1500 and 2000 mm','More than 2000 mm','Exactly 1500 mm'], answer:'Less than 1000 mm',
    hint:'Y lies outside the outermost ring, and that ring is the 1000 mm line.',
    explanation:'Y sits outside the 1000&nbsp;mm line, so it gets <b>less than 1000&nbsp;mm</b>. Outside the smallest labelled line means below that value, not above it.' }),

  makeMCQ({ id:'g6hg-ms-073', chapterId:'g6-map-skills', subsection:'contours', difficulty:3,
    question:'Contour lines, isotherms and isohyets are all examples of <b>isolines</b>. What do all isolines have in common?',
    options:['Each joins places with an equal value','Each shows a country border','Each points towards the north','Each measures a distance'], answer:'Each joins places with an equal value',
    hint:'"Iso" is a word part meaning "equal".',
    explanation:'"Iso" means equal, so every isoline <b>joins places that share the same value</b> &mdash; height, temperature or rainfall. Only what is being measured changes.' }),

  // ── Compass directions ──────────────────────────────────────────────────
  makeMCQ({ id:'g6hg-ms-074', chapterId:'g6-map-skills', subsection:'directions', difficulty:1,
    question:`${_SVG_COMPASS}What are the four <b>cardinal points</b> of the compass?`,
    options:['North, south, east and west','North-east, north-west, south-east and south-west','Up, down, left and right','Latitude, longitude, height and scale'], answer:'North, south, east and west',
    hint:'They are the four written in the largest letters on the compass.',
    explanation:'The four cardinal points are <b>north, south, east and west</b>. The four points between them &mdash; NE, NW, SE, SW &mdash; are the intermediate points.' }),

  makeMCQ({ id:'g6hg-ms-075', chapterId:'g6-map-skills', subsection:'directions', difficulty:1,
    question:`${_SVG_COMPASS}Which direction lies exactly opposite north?`,
    options:['South','East','West','North-east'], answer:'South',
    hint:'Follow the straight line down through the middle of the compass.',
    explanation:'<b>South</b> is directly opposite north, and east is opposite west. Opposite pairs are the quickest check that you have read a compass correctly.' }),

  makeMCQ({ id:'g6hg-ms-076', chapterId:'g6-map-skills', subsection:'directions', difficulty:2,
    question:`${_SVG_COMPASS}Which point lies halfway between north and east?`,
    options:['North-east','South-east','North-west','South-west'], answer:'North-east',
    hint:'Its name is made of the two directions it sits between.',
    explanation:'<b>North-east</b> lies halfway between north and east, and its name says so. Every intermediate point is named after the two cardinal points beside it.' }),

  makeMCQ({ id:'g6hg-ms-077', chapterId:'g6-map-skills', subsection:'directions', difficulty:2,
    question:'How many <b>intermediate points</b> does a compass have?',
    options:['Four','Two','Six','Eight'], answer:'Four',
    hint:'Count the points that sit between the cardinal ones.',
    explanation:'There are <b>four</b> intermediate points &mdash; NE, NW, SE and SW &mdash; one between each pair of cardinal points, making eight points in all.' }),

  makeMCQ({ id:'g6hg-ms-078', chapterId:'g6-map-skills', subsection:'directions', difficulty:2,
    question:`${_SVG_COMPASS}A boat sails from the middle of this compass towards SW. In which direction is it heading?`,
    options:['South-west','South-east','North-west','North-east'], answer:'South-west',
    hint:'Read the letters as two words: S for south, W for west.',
    explanation:'SW is short for <b>south-west</b>, so the boat is heading down and to the left on the map. Compass letters are always read in full when you answer.' }),

  makeMCQ({ id:'g6hg-ms-079', chapterId:'g6-map-skills', subsection:'directions', difficulty:3,
    question:'On a map, a village lies directly below a school. In which direction is the village from the school?',
    options:['South','North','East','West'], answer:'South',
    hint:'On almost every map the top of the page is north.',
    explanation:'The top of a map is north, so directly below it is <b>south</b>. That is why a map carries a north arrow: without it, "below" tells you nothing.' }),

  makeMCQ({ id:'g6hg-ms-080', chapterId:'g6-map-skills', subsection:'directions', difficulty:3,
    question:`${_SVG_OCEAN}Rodrigues lies in which direction from Mauritius?`,
    options:['East','West','South','North-west'], answer:'East',
    hint:'The north arrow is at the bottom left; east is to the right of north.',
    explanation:'Rodrigues is drawn to the right of Mauritius, and with north at the top that means <b>east</b>. Rodrigues really does lie about 560&nbsp;km east of Mauritius.' }),

  makeMCQ({ id:'g6hg-ms-081', chapterId:'g6-map-skills', subsection:'directions', difficulty:4,
    question:'A pupil describes a road as running "from the top of the map to the bottom". How should she describe it properly?',
    options:['From north to south','From east to west','From left to right','From high to low'], answer:'From north to south',
    hint:'Directions on a map are named after the compass, not after the paper.',
    explanation:'The top of a map is north, so the road runs <b>from north to south</b>. "Top" and "bottom" change when the paper is turned; compass directions do not.' }),

  // ── The four key items of a map ─────────────────────────────────────────
  makeMCQ({ id:'g6hg-ms-082', chapterId:'g6-map-skills', subsection:'symbols', difficulty:1,
    question:`${_SVG_KEYMAP}This map carries the four items every map should have. Which four are they?`,
    options:['Title, scale, direction and key','Title, colour, border and date','Scale, colour, grid and photo','Key, photo, border and name'], answer:'Title, scale, direction and key',
    hint:'Look at the top, the bottom left, the bottom right and the box on the right.',
    explanation:'Every good map has a <b>title</b> (what it shows), a <b>scale</b> (how distances compare), a <b>direction</b> arrow and a <b>key</b> (what the symbols mean).' }),

  makeMCQ({ id:'g6hg-ms-083', chapterId:'g6-map-skills', subsection:'symbols', difficulty:1,
    question:`${_SVG_KEYMAP}What does the <b>key</b> on a map tell you?`,
    options:['What each symbol stands for','How far apart two places are','Which way is north','When the map was drawn'], answer:'What each symbol stands for',
    hint:'It is the little box that lists the signs used on the map.',
    explanation:'The key (sometimes called the legend) says <b>what each symbol stands for</b>, so the map itself can stay uncluttered.' }),

  makeMCQ({ id:'g6hg-ms-084', chapterId:'g6-map-skills', subsection:'symbols', difficulty:1,
    question:`${_SVG_KEYMAP}What does the <b>scale</b> on a map let you work out?`,
    options:['The real distance between places','The height of the hills','The name of the district','The number of villages'], answer:'The real distance between places',
    hint:'It is the little ruler drawn near the bottom of the map.',
    explanation:'The scale turns a distance on the paper into <b>the real distance on the ground</b>, so a short line can stand for several kilometres.' }),

  makeMCQ({ id:'g6hg-ms-085', chapterId:'g6-map-skills', subsection:'symbols', difficulty:2,
    question:`${_SVG_KEYMAP}According to the key, what does the blue line across the map stand for?`,
    options:['A river','A road','A border','A footpath'], answer:'A river',
    hint:'Match the colour and shape in the key box to the line on the map.',
    explanation:'The key pairs the blue line with <b>river</b>. Reading a symbol means matching it to the key, never guessing from its colour alone.' }),

  makeMCQ({ id:'g6hg-ms-086', chapterId:'g6-map-skills', subsection:'symbols', difficulty:2,
    question:`${_SVG_KEYMAP}How many villages does this map show?`,
    options:['Two','One','Three','Four'], answer:'Two',
    hint:'Find the village symbol in the key, then count that symbol on the map.',
    explanation:'The key shows a small brown rectangle for a village, and <b>two</b> of them appear on the map. Counting symbols is a common PSAC question.' }),

  makeMCQ({ id:'g6hg-ms-087', chapterId:'g6-map-skills', subsection:'symbols', difficulty:2,
    question:'Why does a map need a <b>title</b>?',
    options:['It says what place the map shows','It says who drew the map','It makes the map look finished','It shows which way is north'], answer:'It says what place the map shows',
    hint:'It is the first thing you read, before any symbol.',
    explanation:'The title says <b>what place or subject the map shows</b>. Without it a reader cannot tell a map of one district from a map of another.' }),

  makeMCQ({ id:'g6hg-ms-088', chapterId:'g6-map-skills', subsection:'symbols', difficulty:3,
    question:'A map has a title, a scale and a key, but no north arrow. Which question can the reader no longer answer?',
    options:['Which direction one place lies in','How far apart the two places are','What each of the symbols stands for','Which area of the island is shown'], answer:'Which direction one place lies in',
    hint:'Work out which of the four items is missing, then what that item was for.',
    explanation:'Without a direction arrow the reader cannot say <b>which way one place lies from another</b>. The scale still gives the distance and the key still gives the symbols.' }),

  makeMCQ({ id:'g6hg-ms-089', chapterId:'g6-map-skills', subsection:'symbols', difficulty:4,
    question:'Two maps of the same district are drawn on the same size of paper, but one covers the whole island. Why must their scales be different?',
    options:['A larger area must be shrunk more','A larger area needs more colours','A larger area needs more symbols','A larger area needs a bigger key'], answer:'A larger area must be shrunk more',
    hint:'The paper stays the same size while the ground shown gets bigger.',
    explanation:'The same sheet of paper must hold more ground, so everything is <b>shrunk more</b> and the scale changes. That is why a scale must always be read before a distance.' }),

  // ── Using larger-scale maps, and hazard maps ───────────────────────────
  makeMCQ({ id:'g6hg-ms-090', chapterId:'g6-map-skills', subsection:'using_map', difficulty:2,
    question:`${_SVG_OCEAN}Which islands are shown on this map of the south-west Indian Ocean?`,
    options:['Madagascar, Reunion, Mauritius and Rodrigues','Madagascar, Agalega, Mauritius and Reunion','Reunion, Rodrigues, Agalega and Seychelles','Mauritius, Rodrigues, Seychelles and Madagascar'], answer:'Madagascar, Reunion, Mauritius and Rodrigues',
    hint:'Read every label on the map before choosing.',
    explanation:'The map is labelled <b>Madagascar, Reunion, Mauritius and Rodrigues</b>. Reading all the labels first stops you choosing an island that is not there.' }),

  makeMCQ({ id:'g6hg-ms-091', chapterId:'g6-map-skills', subsection:'using_map', difficulty:2,
    question:`${_SVG_OCEAN}From which direction is the storm on this map approaching?`,
    options:['From the north-east','From the south-west','From the south','From the west'], answer:'From the north-east',
    hint:'Find where the broken line begins, then use the north arrow.',
    explanation:'The track begins in the top right, which with north at the top is the <b>north-east</b>. Most cyclones reach Mauritius from the north-east or east.' }),

  makeMCQ({ id:'g6hg-ms-092', chapterId:'g6-map-skills', subsection:'using_map', difficulty:3,
    question:`${_SVG_OCEAN}Following the track shown, which island lies in the storm's path first?`,
    options:['Rodrigues','Mauritius','Reunion','Madagascar'], answer:'Rodrigues',
    hint:'Start where the broken line starts and follow it towards the arrow.',
    explanation:'The track comes from the north-east, so it reaches <b>Rodrigues</b> before Mauritius. A hazard map is read by following the track in the direction of the arrow.' }),

  makeMCQ({ id:'g6hg-ms-093', chapterId:'g6-map-skills', subsection:'using_map', difficulty:3,
    question:'What is a <b>hazard map</b> of the Indian Ocean used for?',
    options:['To show which areas a hazard may strike','To show how deep the ocean is','To show which crops each island grows','To show the borders between countries'], answer:'To show which areas a hazard may strike',
    hint:'Think about why a weather service would draw one before a cyclone.',
    explanation:'A hazard map shows <b>which areas a hazard may strike</b>, so that warnings reach the right islands in time. The Grade 6 syllabus asks you to draw and label one.' }),

  makeMCQ({ id:'g6hg-ms-094', chapterId:'g6-map-skills', subsection:'using_map', difficulty:3,
    question:'A large-scale map of one district and a small-scale map of the whole island are both useful. What does the district map give you that the island map cannot?',
    options:['More detail of a smaller area','A view of every district at once','The position of the island on the globe','The direction of the trade winds'], answer:'More detail of a smaller area',
    hint:'Think about what you would use to find one road in a village.',
    explanation:'A larger-scale map covers less ground but shows <b>more detail</b> &mdash; individual roads, villages and rivers. The island map trades that detail for a wider view.' }),

  makeMCQ({ id:'g6hg-ms-095', chapterId:'g6-map-skills', subsection:'using_map', difficulty:4,
    question:'A planner must choose where to build a new cyclone shelter for a coastal village. Which map would help most?',
    options:['A large-scale map of that village','A world map of the oceans','A pie chart of national land use','A line graph of monthly rainfall'], answer:'A large-scale map of that village',
    hint:'The decision is about one small place, so the map must show that place closely.',
    explanation:'A shelter is placed street by street, so a <b>large-scale map of that village</b> is the only one detailed enough. The other three answer different questions altogether.' })

);
