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
    summaryAria: "数据集摘要",
    methods: "参评方法",
    modelsVersions: "模型与版本",
    eligibleTargets: "有效目标",
    evaluatedStructures: "已评估结构",
    allCandidates: "全部候选构象",
    releaseRange: "发布日期范围",
    statsViewAria: "统计视图",
    matrixStatsAria: "矩阵统计视图",
    sortingMetricsAria: "排序指标",
    matrixMetricsAria: "矩阵指标",
    barChartAria: "方法指标排名条形图",
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
    comparableTitle: "可比目标",
    comparableText: "总榜展示 available 口径。当前数据中各方法覆盖相同的有效目标，目标矩阵保留未评估位置并以斜纹显示。",
    inputTransparencyTitle: "输入透明度",
    inputTransparencyText: "MSA、二级结构和模板的使用状态来自发布数据；逐目标证据、版本与文件指纹保留在原始 JSON 中。",
    metricDefinitions: "指标定义",
    generatedBy: "数据由评测发布流程生成",
    footerNote: "CD-HIT 100 RNA structure prediction benchmark · 静态页面不修改源数据",
    closeDetails: "关闭详情",
    loadFailed: "数据加载失败",
    loadFailedHelp: "请确认页面通过 HTTP 服务打开，并且构建产物包含 data 目录。",
    titleMeta: "RNA Structure Leaderboard",
    descriptionMeta: "RNA 三维结构预测方法的公开评测排行榜。",
    targetsNote: (total, excluded) => `${total} 个目标 · ${excluded} 个未纳入`,
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
    summaryAria: "Dataset summary",
    methods: "Methods",
    modelsVersions: "Models and versions",
    eligibleTargets: "Eligible targets",
    evaluatedStructures: "Evaluated structures",
    allCandidates: "All candidate conformations",
    releaseRange: "Release window",
    statsViewAria: "Statistical view",
    matrixStatsAria: "Matrix statistical view",
    sortingMetricsAria: "Ranking metrics",
    matrixMetricsAria: "Matrix metrics",
    barChartAria: "Method metric ranking bar chart",
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
    comparableTitle: "Comparable targets",
    comparableText: "The leaderboard uses the available-target view. Every method currently covers the same eligible targets; the matrix retains unevaluated cells as hatching.",
    inputTransparencyTitle: "Input transparency",
    inputTransparencyText: "MSA, secondary-structure, and template usage come from the published data. Per-target evidence, versions, and file fingerprints remain in the source JSON.",
    metricDefinitions: "Metric definitions",
    generatedBy: "Generated by the evaluation publishing pipeline",
    footerNote: "CD-HIT 100 RNA structure prediction benchmark · the static site never modifies source data",
    closeDetails: "Close details",
    loadFailed: "Could not load data",
    loadFailedHelp: "Open the page through an HTTP server and confirm that the build contains the data directory.",
    titleMeta: "RNA Structure Prediction Leaderboard",
    descriptionMeta: "A public benchmark leaderboard for RNA 3D structure prediction methods.",
    targetsNote: (total, excluded) => `${total} targets · ${excluded} excluded`,
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
  language: localStorage.getItem("rna-board-language") === "en" ? "en" : "zh",
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
  $("#target-note").textContent = t("targetsNote", dataset.target_count, dataset.target_count - dataset.eligible_target_count);
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
  $("#metric-gauge span").style.transform = lower ? "scaleX(.44)" : "scaleX(.78)";
}

function renderChart() {
  const ranked = rankedMethods();
  if (!ranked.length) {
    $("#bar-chart").innerHTML = `<div class="loading-state">${t("noMethods")}</div>`;
    return;
  }
  const values = ranked.map(({ method }) => scoreFor(method)).filter((value) => value !== null);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const lower = isLowerBetter(state.metric);
  $("#bar-chart").innerHTML = ranked
    .map(({ method, rank }) => {
      const value = scoreFor(method);
      const quality = value === null ? 0 : lower ? (max - value) / span : (value - min) / span;
      const width = value === null ? 0 : 22 + quality * 78;
      return `
        <div class="bar-row">
          <div class="bar-label" title="${method.display_name}"><span class="bar-rank">${String(rank).padStart(2, "0")}</span>${method.display_name}</div>
          <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
          <div class="bar-value">${formatMetric(state.metric, value)}</div>
        </div>`;
    })
    .join("");
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
            <td class="method-cell"><span class="method-name">${method.display_name}</span><span class="method-id">${method.method_variant_id}</span></td>
            ${metricKeys.map((metric) => `<td class="${metric === state.metric ? "active-score" : ""}">${formatMetric(metric, scoreFor(method, metric))}</td>`).join("")}
            <td><div class="input-chips">${chips}</div></td>
            <td>${method.actual_target_count}/${method.target_count}</td>
          </tr>`;
        })
        .join("")
    : `<tr><td class="empty-row" colspan="8">${t("noMethods")}</td></tr>`;
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
          const result = target.methods.find((item) => item.method_variant_id === method.method_variant_id);
          const value = result ? targetScore(result) : null;
          if (value === null) return '<td class="matrix-cell na">—</td>';
          const quality = lower ? (max - value) / span : (value - min) / span;
          const alpha = (0.1 + quality * 0.82).toFixed(2);
          const text = quality > 0.67 ? "var(--accent-ink)" : "var(--ink-2)";
          return `<td class="matrix-cell" style="--heat:${alpha};--heat-text:${text}"><button data-target="${target.target_id}" data-method="${method.method_variant_id}">${formatMetric(state.metric, value)}</button></td>`;
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
  const methodInfo = state.data.methods.find((item) => item.method_variant_id === methodId);
  const method = target.methods.find((item) => item.method_variant_id === methodId);
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
  renderTable();
  renderMatrix();
}

function bindInteractions() {
  $$(".nav-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.panel = button.dataset.panel;
      $$(".nav-tab").forEach((item) => {
        item.classList.toggle("is-active", item === button);
        item.setAttribute("aria-selected", String(item === button));
      });
      $$('[data-panel-content]').forEach((panel) => panel.classList.toggle("is-hidden", panel.dataset.panelContent !== state.panel));
    });
  });
  $$("[data-view]").forEach((button) => button.addEventListener("click", () => { state.view = button.dataset.view; renderAll(); }));
  $$(".metric-sort").forEach((button) => button.addEventListener("click", () => { state.metric = button.dataset.metric; renderAll(); }));
  $("#method-search").addEventListener("input", (event) => { state.methodQuery = event.target.value.trim(); renderChart(); renderTable(); });
  $("#target-search").addEventListener("input", (event) => { state.targetQuery = event.target.value.trim(); renderMatrix(); });
  $("#theme-toggle").addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
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
