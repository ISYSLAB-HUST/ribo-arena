const DATA_ROOT = "./data";

const metricLabels = {
  zh: {
    c3_rmsd: "C3′ RMSD",
    rna_tm_score: "RNA TM-score",
    heavy_atom_lddt: "全重原子 lDDT",
    clashscore: "Clashscore",
  },
  en: {
    c3_rmsd: "C3′ RMSD",
    rna_tm_score: "RNA TM-score",
    heavy_atom_lddt: "All-atom lDDT",
    clashscore: "Clashscore",
  },
};

const shortLabels = {
  c3_rmsd: "C3′ RMSD",
  rna_tm_score: "TM-score",
  heavy_atom_lddt: "lDDT",
  clashscore: "Clash",
};
const metricKeys = ["c3_rmsd", "rna_tm_score", "heavy_atom_lddt", "clashscore"];
const modelStyles = {
  'MetaFold-RNA3d': ['MF', '#b95232'], alphafold3: ['AF', '#4272aa'],
  boltz2: ['B2', '#568a72'], nufold: ['Nu', '#8c659d'],
  'protenix-v2': ['P2', '#9b8040'], 'protenix_base_default_v1.0.0': ['P', '#a57560'],
  rhofoldplus: ['Rh', '#6a7c8a'], rosettafold3: ['RF', '#4e8e91'],
  trrosettarna2: ['TR', '#887952'],
};
const modelStyle = (method) => modelStyles[method.tool_id] || ['R', '#777777'];

const metricDescriptions = {
  zh: {
    c3_rmsd: "在原始结构上使用 US-align 默认 RNA 比对，以对齐区域的 C3′ 原子计算均方根偏差。",
    rna_tm_score: "在原始文件上进行 RNA 结构比对，并按参考结构长度归一化；用于衡量整体拓扑相似性。",
    heavy_atom_lddt: "使用 OpenStructure 在默认立体化学检查、半径和最短核苷酸长度下计算全重原子 lDDT。",
    clashscore: "使用 Phenix/MolProbity 计算每 1000 个原子的严重空间冲突数，不保留氢原子。",
  },
  en: {
    c3_rmsd: "C3′ root-mean-square deviation over the aligned region using the default US-align RNA protocol on original structures.",
    rna_tm_score: "Default RNA structural alignment on original files, normalized by reference length to measure global topology similarity.",
    heavy_atom_lddt: "All-heavy-atom lDDT from OpenStructure with default stereochemical checks, radius, and minimum nucleotide length.",
    clashscore: "Severe steric clashes per 1,000 atoms, calculated with Phenix/MolProbity without retaining hydrogens.",
  },
};

const translations = {
  zh: {
    brandAria: "RNA Structure Leaderboard 首页",
    mainNavAria: "主导航",
    navLeaderboard: "总榜",
    navMatrix: "目标矩阵",
    navProtocol: "评测说明",
    downloadTitle: "下载原始排行榜 JSON",
    downloadAria: "下载排行榜 JSON",
    themeTitle: "切换明暗主题",
    themeAria: "切换明暗主题",
    eyebrow: "CD-HIT 100 · 单链 RNA",
    title: "RNA 三维结构预测排行榜",
    intro: "在统一评测协议下，对比不同方法的结构精度、局部几何质量与原子冲突。",
    snapshot: "数据快照",
    liveBenchmark: "评测快照",
    downloadData: "下载数据",
    analysisTitle: "表现一览",
    analysisSubtitle: "同一评测集，多维度比较",
    runtimeKicker: "OBSERVED RUNTIME",
    scatterTitle: "精度与预测耗时",
    scatterNote: "横轴为平均预测耗时（秒，对数刻度）；不同硬件与并发条件下的实测值，仅作描述性比较。",
    runtimeAxis: "平均耗时 / 秒（对数刻度）",
    metricGuide: "当前指标说明",
    summaryAria: "数据集摘要",
    methods: "参评方法",
    modelsVersions: "模型与版本",
    eligibleTargets: "评测目标",
    evaluatedStructures: "已评估结构",
    allCandidates: "全部候选构象",
    releaseRange: "发布日期范围",
    statsViewAria: "统计视图",
    matrixStatsAria: "矩阵统计视图",
    sortingMetricsAria: "排序指标",
    matrixMetricsAria: "矩阵指标",
    barChartAria: "方法指标排名条形图",
    featuredMethodKicker: "代表性方法",
    metafoldIntro: "MetaFold-RNA3d 是我们重新训练的 RNA 结构预测模型，采用类似 AlphaFold 3 的架构，并针对 RNA 结构预测整合 MSA、MetaFold-RNA 输出的二级结构预测和模板信息。",
    msaTag: "MSA",
    secondaryStructureTag: "二级结构",
    templateTag: "模板",
    meanPerformance: "平均表现",
    bestCandidate: "最佳候选",
    searchMethods: "搜索方法",
    direction: "方向",
    range: "范围",
    unit: "单位",
    methodLeaderboard: "方法总榜",
    rank: "排名",
    method: "方法",
    inputs: "输入",
    coverage: "覆盖",
    timing: "平均耗时",
    timingNote: "完整目标集平均耗时；硬件及并发条件不同",
    loading: "加载中…",
    searchTargets: "搜索目标",
    searchTargetsPlaceholder: "搜索 PDB / 目标",
    targetMatrix: "逐目标表现矩阵",
    weaker: "较弱",
    better: "较优",
    loadingTargets: "正在汇总目标数据…",
    protocolTitle: "统一协议，四个互补指标",
    protocolLead: "排行榜同时报告全局拓扑、坐标偏差、局部原子环境和几何冲突。默认使用“平均表现”，避免只看最优采样造成的偏差。",
    statsDefinitionTitle: "统计口径",
    statsDefinition: "<b>平均表现</b>对每个目标的候选先取均值，再跨目标汇总；<b>最佳候选</b>允许每项指标选择该目标上表现最佳的候选。",
    datasetConstructionTitle: "数据构建",
    datasetConstructionText: "对待预测 RNA 条目的序列执行 CD-HIT 100% 一致性聚类，移除完全重复的冗余条目后再进行预测和评测。",
    inputTransparencyTitle: "统一 MSA 与输入透明度",
    inputTransparencyText: "为保持评测输入的一致性，对于同一 RNA 目标，我们向使用 MSA 的方法提供相同的多序列比对（MSA）输入。各方法的 MSA、二级结构及模板使用情况在结果中标注；逐目标输入记录保留在原始 JSON 中。",
    metricDefinitions: "指标定义",
    generatedBy: "数据由评测发布流程生成",
    closeDetails: "关闭详情",
    loadFailed: "数据加载失败",
    loadFailedHelp: "请确认页面通过 HTTP 服务打开，并且构建产物包含 data 目录。",
    titleMeta: "RNA Structure Leaderboard",
    descriptionMeta: "RNA 三维结构预测方法的公开评测排行榜。",
    targetsNote: () => "CD-HIT 100 代表条目",
    ranking: (metric) => `${metric} 排名`,
    lowerBetter: "越低越好",
    higherBetter: "越高越好",
    dimensionless: "无量纲",
    noMethods: "没有匹配的方法",
    tableStatus: (shown, total, view) => `${shown} / ${total} 个方法 · ${view}`,
    used: "使用",
    unused: "未使用",
    targetCount: (count) => `目标 · ${count}`,
    noTargets: "没有匹配的目标",
    timingUnavailable: "—",
    meanPerformanceUpper: "平均表现",
    bestCandidateUpper: "最佳候选",
  },
  en: {
    brandAria: "RNA Structure Leaderboard home",
    mainNavAria: "Main navigation",
    navLeaderboard: "Leaderboard",
    navMatrix: "Target matrix",
    navProtocol: "Protocol",
    downloadTitle: "Download raw leaderboard JSON",
    downloadAria: "Download leaderboard JSON",
    themeTitle: "Toggle light or dark theme",
    themeAria: "Toggle light or dark theme",
    eyebrow: "CD-HIT 100 · SINGLE-CHAIN RNA",
    title: "RNA Structure Prediction Leaderboard",
    intro: "Compare structural accuracy, local atomic quality, and steric clashes under one evaluation protocol.",
    snapshot: "Data snapshot",
    liveBenchmark: "BENCHMARK SNAPSHOT",
    downloadData: "Download data",
    analysisTitle: "Performance overview",
    analysisSubtitle: "One dataset. Multiple perspectives.",
    runtimeKicker: "OBSERVED RUNTIME",
    scatterTitle: "Accuracy & prediction time",
    scatterNote: "Mean prediction time in seconds (log scale). Observed hardware and concurrency vary; this is a descriptive comparison.",
    runtimeAxis: "Mean time / seconds (log scale)",
    metricGuide: "About the selected metric",
    summaryAria: "Dataset summary",
    methods: "Methods",
    modelsVersions: "Models and versions",
    eligibleTargets: "Benchmark targets",
    evaluatedStructures: "Evaluated structures",
    allCandidates: "All candidate conformations",
    releaseRange: "Release window",
    statsViewAria: "Statistical view",
    matrixStatsAria: "Matrix statistical view",
    sortingMetricsAria: "Ranking metrics",
    matrixMetricsAria: "Matrix metrics",
    barChartAria: "Method metric ranking bar chart",
    featuredMethodKicker: "FEATURED METHOD",
    metafoldIntro: "MetaFold-RNA3d is our retrained RNA structure prediction model. It uses an architecture similar to AlphaFold 3 and integrates MSA, secondary-structure predictions from MetaFold-RNA, and templates for RNA structure prediction.",
    msaTag: "MSA",
    secondaryStructureTag: "Secondary structure",
    templateTag: "Templates",
    meanPerformance: "Mean performance",
    bestCandidate: "Best candidate",
    searchMethods: "Search methods",
    direction: "Direction",
    range: "Range",
    unit: "Unit",
    methodLeaderboard: "Method leaderboard",
    rank: "Rank",
    method: "Method",
    inputs: "Inputs",
    coverage: "Coverage",
    timing: "Mean time",
    timingNote: "Full-cohort mean time; hardware and concurrency vary",
    loading: "Loading…",
    searchTargets: "Search targets",
    searchTargetsPlaceholder: "Search PDB / target",
    targetMatrix: "Per-target performance matrix",
    weaker: "Weaker",
    better: "Better",
    loadingTargets: "Summarizing target data…",
    protocolTitle: "One protocol, four complementary metrics",
    protocolLead: "The leaderboard reports global topology, coordinate deviation, local atomic environment, and geometric clashes. Mean performance is the default to avoid overemphasizing the best sample.",
    statsDefinitionTitle: "Statistical views",
    statsDefinition: "<b>Mean performance</b> averages candidates within each target before aggregating targets. <b>Best candidate</b> may select a different candidate for each metric on a target.",
    datasetConstructionTitle: "Dataset construction",
    datasetConstructionText: "Candidate RNA target sequences are clustered with CD-HIT at 100% sequence identity. Exact duplicate entries are removed before prediction and evaluation.",
    inputTransparencyTitle: "Shared MSA and input transparency",
    inputTransparencyText: "To maintain consistent evaluation inputs, methods that use MSA receive the same multiple sequence alignment (MSA) input for each RNA target. MSA, secondary-structure, and template usage are indicated in the results; per-target input records are retained in the source JSON.",
    metricDefinitions: "Metric definitions",
    generatedBy: "Generated by the evaluation publishing pipeline",
    closeDetails: "Close details",
    loadFailed: "Could not load data",
    loadFailedHelp: "Open the page through an HTTP server and confirm that the build contains the data directory.",
    titleMeta: "RNA Structure Prediction Leaderboard",
    descriptionMeta: "A public benchmark leaderboard for RNA 3D structure prediction methods.",
    targetsNote: () => "CD-HIT 100 representatives",
    ranking: (metric) => `${metric} ranking`,
    lowerBetter: "Lower is better",
    higherBetter: "Higher is better",
    dimensionless: "Dimensionless",
    noMethods: "No matching methods",
    tableStatus: (shown, total, view) => `${shown} / ${total} methods · ${view}`,
    used: "Used",
    unused: "Not used",
    targetCount: (count) => `Targets · ${count}`,
    noTargets: "No matching targets",
    timingUnavailable: "—",
    meanPerformanceUpper: "MEAN PERFORMANCE",
    bestCandidateUpper: "BEST CANDIDATE",
  },
};

const state = {
  data: null,
  targets: null,
  view: "mean",
  metric: "rna_tm_score",
  methodQuery: "",
  targetQuery: "",
  panel: "leaderboard",
  language: localStorage.getItem("rna-board-language") === "zh" ? "zh" : "en",
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const locale = () => (state.language === "en" ? "en-US" : "zh-CN");
const t = (key, ...args) => {
  const value = translations[state.language][key];
  return typeof value === "function" ? value(...args) : value;
};
const metricLabel = (key) => metricLabels[state.language][key];
const formatNumber = (value) => new Intl.NumberFormat(locale()).format(value);

function applyLanguage() {
  document.documentElement.lang = state.language === "en" ? "en" : "zh-CN";
  document.title = t("titleMeta");
  $('meta[name="description"]').content = t("descriptionMeta");
  $$('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
  $$('[data-i18n-html]').forEach((element) => { element.innerHTML = t(element.dataset.i18nHtml); });
  $$('[data-i18n-placeholder]').forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  $$('[data-i18n-aria]').forEach((element) => { element.setAttribute("aria-label", t(element.dataset.i18nAria)); });
  $$('[data-i18n-title]').forEach((element) => { element.title = t(element.dataset.i18nTitle); });
  $$('[data-lang]').forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.lang === state.language)));
}

function formatMetric(metric, value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  if (metric === "rna_tm_score" || metric === "heavy_atom_lddt") return value.toFixed(3);
  return value.toFixed(2);
}

function formatSeconds(seconds) {
  if (!Number.isFinite(seconds)) return t("timingUnavailable");
  if (seconds < 60) return `${seconds.toFixed(1)} s`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)} min`;
  return `${(seconds / 3600).toFixed(1)} h`;
}

function isLowerBetter(metric) {
  return state.data.metric_definitions[metric].direction === "lower";
}

function scoreFor(method, metric = state.metric, view = state.view) {
  return method.statistics?.[view]?.available?.values?.[metric] ?? null;
}

function rankedMethods() {
  const direction = isLowerBetter(state.metric) ? 1 : -1;
  return [...state.data.methods]
    .sort((a, b) => {
      const av = scoreFor(a);
      const bv = scoreFor(b);
      if (av === null) return 1;
      if (bv === null) return -1;
      return (av - bv) * direction;
    })
    .map((method, index) => ({ method, rank: index + 1 }))
    .filter(({ method }) => method.display_name.toLowerCase().includes(state.methodQuery.toLowerCase()));
}

function setupMetricTabs() {
  const buttons = metricKeys
    .map((key) => `<button data-metric="${key}" class="${key === state.metric ? "is-active" : ""}">${shortLabels[key]}</button>`)
    .join("");
  $("#metric-tabs").innerHTML = buttons;
  $(".matrix-metric-tabs").innerHTML = buttons;
  $$(".metric-tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      state.metric = button.dataset.metric;
      renderAll();
    });
  });
}

function renderSummary() {
  const { dataset, generated_at, methods } = state.data;
  $("#method-count").textContent = methods.length;
  $("#target-count").textContent = dataset.eligible_target_count;
  $("#target-note").textContent = t("targetsNote");
  $("#candidate-count").textContent = formatNumber(methods.reduce((sum, method) => sum + method.counts.evaluated_count, 0));
  $("#release-range").textContent = `${dataset.release_min} → ${dataset.release_max}`;
  $("#generated-at").textContent = new Intl.DateTimeFormat(locale(), { dateStyle: "medium", timeStyle: "short" }).format(new Date(generated_at));
  $("#schema-version").textContent = state.data.schema_version;
}

function renderMetricControls() {
  $$(".metric-tabs button").forEach((button) => button.classList.toggle("is-active", button.dataset.metric === state.metric));
  $$(".metric-sort").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.metric === state.metric);
    button.dataset.arrow = isLowerBetter(button.dataset.metric) ? "↓" : "↑";
  });
  $$("[data-view]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.view === state.view)));
}

function renderMetricPanel() {
  const definition = state.data.metric_definitions[state.metric];
  const lower = definition.direction === "lower";
  const rangeEnd = definition.range[1] === null ? "∞" : definition.range[1];
  $("#chart-title").textContent = t("ranking", metricLabel(state.metric));
  $("#metric-name").textContent = metricLabel(state.metric);
  $("#metric-definition").textContent = metricDescriptions[state.language][state.metric];
  $("#metric-direction").textContent = lower ? t("lowerBetter") : t("higherBetter");
  $("#metric-range").textContent = `${definition.range[0]} – ${rangeEnd}`;
  $("#metric-unit").textContent = definition.unit
    ? state.language === "zh" && state.metric === "clashscore" ? "冲突/1000 原子" : definition.unit
    : t("dimensionless");
  $("#direction-label").textContent = lower ? t("lowerBetter") : t("higherBetter");
  $(".direction-arrow").textContent = lower ? "↓" : "↑";
}

function renderChart() {
  const ranked = rankedMethods();
  if (!ranked.length) {
    $("#bar-chart").innerHTML = `<div class="loading-state">${t("noMethods")}</div>`;
    $("#bar-scale").innerHTML = "";
    return;
  }
  const values = ranked.map(({ method }) => scoreFor(method)).filter((value) => value !== null);
  const max = values.length ? Math.max(...values) : 1;
  const ceiling = ['rna_tm_score', 'heavy_atom_lddt'].includes(state.metric) ? 1 : max || 1;
  $("#bar-chart").innerHTML = ranked
    .map(({ method, rank }) => {
      const value = scoreFor(method);
      const width = value === null ? 0 : Math.max(0, Math.min(100, value / ceiling * 100));
      return `
        <div class="bar-row" role="listitem" style="--model-color:${modelStyle(method)[1]}">
          <div class="bar-label" title="${method.display_name}"><span class="bar-rank">${String(rank).padStart(2, "0")}</span>${method.display_name}</div>
          <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
          <div class="bar-value">${formatMetric(state.metric, value)}</div>
        </div>`;
    })
    .join("");
  $("#bar-scale").innerHTML = `<span>0</span><span>${formatMetric(state.metric, ceiling)}</span>`;
}

function renderRuntimeChart() {
  const methods = rankedMethods().map(({method}) => method).filter(method =>
    Number.isFinite(method.timing?.mean_seconds) && method.timing.mean_seconds > 0 && Number.isFinite(scoreFor(method, 'rna_tm_score')));
  if (!methods.length) { $('#runtime-chart').innerHTML = `<p class="empty-row">${t('noMethods')}</p>`; return; }
  const left = 43, right = 440, top = 24, bottom = 245;
  const lo = Math.floor(Math.log10(Math.min(...methods.map(m => m.timing.mean_seconds))));
  const hi = Math.max(lo + 1, Math.ceil(Math.log10(Math.max(...methods.map(m => m.timing.mean_seconds)))));
  const x = value => left + (Math.log10(value) - lo) / (hi - lo) * (right - left);
  const y = value => bottom - value * (bottom - top);
  const grid = [0, .25, .5, .75, 1].map(v => `<line class="plot-grid" x1="${left}" x2="${right}" y1="${y(v)}" y2="${y(v)}"/><text class="plot-label" x="${left-9}" y="${y(v)+3}" text-anchor="end">${v}</text>`).join('');
  const ticks = Array.from({length:hi-lo+1}, (_,i) => 10 ** (lo+i)).map(v => `<line class="plot-grid" x1="${x(v)}" x2="${x(v)}" y1="${top}" y2="${bottom}"/><text class="plot-label" x="${x(v)}" y="${bottom+19}" text-anchor="middle">${v.toLocaleString('en-US')}</text>`).join('');
  const points = methods.map(m => ({ x: x(m.timing.mean_seconds), y: y(scoreFor(m, 'rna_tm_score')) }));
  const labels = [];
  const dots = methods.map((m, index) => {
    const [mark,color]=modelStyle(m), px=x(m.timing.mean_seconds), py=y(scoreFor(m,'rna_tm_score'));
    const label = `${m.display_name}: TM-score ${formatMetric('rna_tm_score',scoreFor(m,'rna_tm_score'))}, ${formatSeconds(m.timing.mean_seconds)}`;
    const width = mark.length * 7;
    const candidates = [[8,-10], [8,17], [-width-8,-10], [-width-8,17], [11,4], [-width-11,4], [8,-24], [8,31]];
    const positions = candidates.map(([dx,dy]) => ({x:px+dx, y:py+dy, width}));
    const position = positions.find(p => p.x >= left && p.x+p.width <= right && p.y-10 >= top && p.y <= bottom &&
      !labels.some(q => p.x < q.x+q.width+3 && p.x+p.width+3 > q.x && p.y-11 < q.y+3 && p.y+3 > q.y-11) &&
      !points.some((q,i) => i !== index && q.x+7 > p.x && q.x-7 < p.x+p.width && q.y+7 > p.y-11 && q.y-7 < p.y+3)) || positions[0];
    labels.push(position);
    return `<g class="scatter-point" tabindex="0" aria-label="${label}"><title>${label}</title><circle cx="${px}" cy="${py}" r="6" fill="${color}"/><text class="plot-name" x="${position.x}" y="${position.y}">${mark}</text></g>`;
  }).join('');
  $('#runtime-chart').innerHTML = `<svg viewBox="0 0 475 295" role="img" aria-label="${t('scatterTitle')}"><title>${t('scatterTitle')}</title>${grid}${ticks}<text class="plot-label" x="${left}" y="12">TM-score ↑</text>${dots}<text class="plot-label" x="240" y="288" text-anchor="middle">${t('runtimeAxis')}</text></svg>`;
}

function renderTable() {
  const ranked = rankedMethods();
  $("#table-status").textContent = t("tableStatus", ranked.length, state.data.methods.length, state.view === "mean" ? t("meanPerformance") : t("bestCandidate"));
  $("#leaderboard-body").innerHTML = ranked.length
    ? ranked
        .map(({ method, rank }) => {
          const chips = [
            ["MSA", method.input_summary.msa],
            ["SS", method.input_summary.secondary_structure],
            ["TPL", method.input_summary.templates],
          ]
            .map(([label, status]) => `<span class="input-chip ${status === "使用" ? "on" : ""}" title="${label}: ${status === "使用" ? t("used") : t("unused")}">${label}</span>`)
            .join("");
          const rankClass = rank <= 3 ? `rank-${rank}` : "";
          return `<tr>
            <td class="rank-cell"><span class="rank-badge ${rankClass}">${String(rank).padStart(2, "0")}</span></td>
            <td class="method-cell"><div class="method-identity"><span class="model-mark" aria-hidden="true" style="--model-color:${modelStyle(method)[1]}">${modelStyle(method)[0]}</span><div><span class="method-name">${method.display_name}</span><span class="method-id" title="${(method.method_variant_ids || [method.method_variant_id]).join(', ')}">${method.tool_id}</span></div></div></td>
            ${metricKeys.map((metric) => `<td class="${metric === state.metric ? "active-score" : ""}">${formatMetric(metric, scoreFor(method, metric))}</td>`).join("")}
            <td><div class="input-chips">${chips}</div></td>
            <td>${method.actual_target_count}/${state.data.dataset.eligible_target_count}</td>
            <td class="timing-cell" title="${method.timing?.protocol || ""}">${formatSeconds(method.timing?.mean_seconds)}${method.timing?.partial ? "*" : ""}</td>
          </tr>`;
        })
        .join("")
    : `<tr><td class="empty-row" colspan="9">${t("noMethods")}</td></tr>`;
}

function targetScore(method, metric = state.metric, view = state.view) {
  return method.statistics?.[view]?.values?.[metric] ?? null;
}

function renderMatrix() {
  if (!state.targets) return;
  const targets = state.targets.targets.filter((target) =>
    `${target.target_id} ${target.pdb_id}`.toLowerCase().includes(state.targetQuery.toLowerCase()),
  );
  const methods = state.data.methods;
  const allValues = targets.flatMap((target) => target.methods.map((method) => targetScore(method))).filter((value) => value !== null);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const span = max - min || 1;
  const lower = isLowerBetter(state.metric);
  const head = methods.map((method) => `<th title="${method.display_name}"><span class="matrix-method">${method.display_name}</span></th>`).join("");
  const rows = targets
    .map((target) => {
      const cells = methods
        .map((method) => {
          const result = target.methods.find((item) => item.tool_id === method.tool_id);
          const value = result ? targetScore(result) : null;
          if (value === null) return '<td class="matrix-cell na">—</td>';
          const quality = lower ? (max - value) / span : (value - min) / span;
          const alpha = (0.1 + quality * 0.82).toFixed(2);
          const text = quality > 0.67 ? "var(--accent-ink)" : "var(--ink-2)";
          return `<td class="matrix-cell" style="--heat-value:${alpha};--heat-text:${text}"><button aria-label="${target.target_id} · ${method.display_name} · ${metricLabel(state.metric)} ${formatMetric(state.metric, value)}" data-target="${target.target_id}" data-method="${method.tool_id}">${formatMetric(state.metric, value)}</button></td>`;
        })
        .join("");
      return `<tr><th><span class="target-name">${target.target_id}</span><span class="target-meta">${target.length} nt · ${target.release_date}</span></th>${cells}</tr>`;
    })
    .join("");
  $("#matrix-wrap").innerHTML = targets.length
    ? `<table class="matrix-table"><thead><tr><th>${t("targetCount", targets.length)}</th>${head}</tr></thead><tbody>${rows}</tbody></table>`
    : `<div class="loading-state">${t("noTargets")}</div>`;
  $$(".matrix-cell button").forEach((button) => button.addEventListener("click", () => openCell(button.dataset.target, button.dataset.method)));
}

function openCell(targetId, methodId) {
  const target = state.targets.targets.find((item) => item.target_id === targetId);
  const methodInfo = state.data.methods.find((item) => item.tool_id === methodId);
  const method = target.methods.find((item) => item.tool_id === methodId);
  const values = method.statistics?.[state.view]?.values || {};
  $("#dialog-content").innerHTML = `<div class="dialog-body">
    <p class="eyebrow">${state.view === "mean" ? t("meanPerformanceUpper") : t("bestCandidateUpper")}</p>
    <h2>${target.target_id} × ${methodInfo.display_name}</h2>
    <p class="dialog-sub">${target.length} nt · ${target.release_date} · ${method.status}</p>
    <div class="dialog-metrics">
      ${metricKeys.map((metric) => `<div class="dialog-metric"><span>${metricLabel(metric)}</span><strong>${formatMetric(metric, values[metric])}</strong></div>`).join("")}
    </div>
  </div>`;
  $("#cell-dialog").showModal();
}

function renderDefinitions() {
  $("#definition-list").innerHTML = metricKeys
    .map((key) => `<article class="definition-item"><h3>${metricLabel(key)}</h3><p>${metricDescriptions[state.language][key]}</p></article>`)
    .join("");
}

function renderAll() {
  setupMetricTabs();
  renderMetricControls();
  renderMetricPanel();
  renderChart();
  renderRuntimeChart();
  renderTable();
  renderMatrix();
}

function bindInteractions() {
  $$(".nav-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.panel = button.dataset.panel;
      $$(".nav-tab").forEach((item) => {
        item.classList.toggle("is-active", item === button);
        item.setAttribute("aria-pressed", String(item === button));
      });
      $$('[data-panel-content]').forEach((panel) => panel.classList.toggle("is-hidden", panel.dataset.panelContent !== state.panel));
    });
  });
  $$("[data-view]").forEach((button) => button.addEventListener("click", () => { state.view = button.dataset.view; renderAll(); }));
  $$(".metric-sort").forEach((button) => button.addEventListener("click", () => { state.metric = button.dataset.metric; renderAll(); }));
  $("#method-search").addEventListener("input", (event) => { state.methodQuery = event.target.value.trim(); renderChart(); renderRuntimeChart(); renderTable(); });
  $("#target-search").addEventListener("input", (event) => { state.targetQuery = event.target.value.trim(); renderMatrix(); });
  $("#theme-toggle").addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "light";
    const next = current === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("rna-board-theme", next);
  });
  $$('[data-lang]').forEach((button) => button.addEventListener("click", () => {
    state.language = button.dataset.lang;
    localStorage.setItem("rna-board-language", state.language);
    applyLanguage();
    renderSummary();
    renderDefinitions();
    renderAll();
  }));
  $(".dialog-close").addEventListener("click", () => $("#cell-dialog").close());
  $("#cell-dialog").addEventListener("click", (event) => { if (event.target === $("#cell-dialog")) $("#cell-dialog").close(); });
}

async function init() {
  try {
    applyLanguage();
    const [leaderboard, targets] = await Promise.all([
      fetch(`${DATA_ROOT}/leaderboard.json`).then((response) => {
        if (!response.ok) throw new Error(`leaderboard ${response.status}`);
        return response.json();
      }),
      fetch(`${DATA_ROOT}/targets-summary.json`).then((response) => {
        if (!response.ok) throw new Error(`targets ${response.status}`);
        return response.json();
      }),
    ]);
    state.data = leaderboard;
    state.targets = targets;
    renderSummary();
    renderDefinitions();
    bindInteractions();
    renderAll();
  } catch (error) {
    console.error(error);
    $("#fatal-error").classList.remove("is-hidden");
  }
}

init();
