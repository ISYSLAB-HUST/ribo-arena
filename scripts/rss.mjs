import { createHash } from "node:crypto";

export const SITE_URL = "https://isyslab-hust.github.io/ribo-arena/";
export const FEED_URL = `${SITE_URL}feed.xml`;

export function snapshotOf(leaderboard) {
  const targets = leaderboard.targets.filter((target) => target.eligible)
    .map(({ target_id, pdb_id, length, release_date }) => ({ target_id, pdb_id, length, release_date }))
    .sort((a, b) => a.target_id.localeCompare(b.target_id, "en"));
  const methods = leaderboard.methods.filter((method) => method.tool_id !== "protenix_base_20250630_v1.0.0")
    .map((method) => ({
      id: method.tool_id,
      name: method.display_name,
      evaluated: method.counts.evaluated_count,
      coverage: method.statistics.mean.available.target_count,
      metrics: method.statistics.mean.available.values,
    }))
    .sort((a, b) => a.id.localeCompare(b.id, "en"));
  const content = { targets, methods };
  return {
    id: createHash("sha256").update(JSON.stringify(content)).digest("hex"),
    generated_at: leaderboard.generated_at,
    ...content,
  };
}

export const escapeXml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
})[character]);

function ranking(snapshot) {
  return [...snapshot.methods].sort((a, b) => {
    const av = a.metrics.rna_tm_score;
    const bv = b.metrics.rna_tm_score;
    if (!Number.isFinite(av)) return Number.isFinite(bv) ? 1 : a.id.localeCompare(b.id, "en");
    if (!Number.isFinite(bv)) return -1;
    return bv - av || a.id.localeCompare(b.id, "en");
  });
}

const score = (value) => Number.isFinite(value) ? value.toFixed(4) : "—";
const number = (value) => new Intl.NumberFormat("en-US").format(value);

function updateHtml(snapshot, previous) {
  const oldTargets = new Set(previous?.targets.map((target) => target.target_id) || []);
  const newTargets = previous ? snapshot.targets.filter((target) => !oldTargets.has(target.target_id)) : [];
  const currentTargets = new Set(snapshot.targets.map((target) => target.target_id));
  const removed = previous?.targets.filter((target) => !currentTargets.has(target.target_id)) || [];
  const oldRanking = new Map((previous ? ranking(previous) : []).map((method, index) => [method.id, { method, rank: index + 1 }]));
  const candidates = snapshot.methods.reduce((total, method) => total + method.evaluated, 0);
  const oldCandidates = previous?.methods.reduce((total, method) => total + method.evaluated, 0);
  const parts = [
    `<p>${snapshot.targets.length} RNA targets, ${snapshot.methods.length} methods, and ${number(candidates)} evaluated candidate structures.</p>`,
    `<p>Data snapshot: ${escapeXml(snapshot.generated_at)}.</p>`,
  ];
  if (previous) parts.push(`<p>Previous snapshot: ${escapeXml(previous.generated_at)}; ${previous.targets.length} targets and ${number(oldCandidates)} evaluated structures. Change: ${candidates - oldCandidates >= 0 ? "+" : ""}${number(candidates - oldCandidates)} structures.</p>`);
  if (newTargets.length) {
    parts.push(`<h3>New RNA targets (${newTargets.length})</h3><ul>${newTargets.map((target) => `<li>${escapeXml(target.target_id)} — PDB ${escapeXml(target.pdb_id)}, ${target.length} nt, released ${escapeXml(target.release_date)}.</li>`).join("")}</ul>`);
  } else {
    parts.push(`<p>${previous ? "No new RNA targets in this update." : "First recorded benchmark snapshot; no earlier comparison is available."}</p>`);
  }
  if (removed.length) parts.push(`<p>Targets removed from the evaluation set: ${removed.map((target) => escapeXml(target.target_id)).join(", ")}.</p>`);
  const removedMethods = previous?.methods.filter((method) => !snapshot.methods.some((current) => current.id === method.id)) || [];
  if (removedMethods.length) parts.push(`<p>Methods no longer displayed: ${removedMethods.map((method) => escapeXml(method.name)).join(", ")}.</p>`);
  parts.push("<h3>Rankings by mean TM-score</h3><ol>");
  ranking(snapshot).forEach((method, index) => {
    const old = oldRanking.get(method.id);
    const comparison = !previous ? "" : old ? `; rank ${old.rank} → ${index + 1}; TM-score ${score(old.method.metrics.rna_tm_score)} → ${score(method.metrics.rna_tm_score)}` : "; newly displayed method";
    parts.push(`<li>${escapeXml(method.name)}: ${score(method.metrics.rna_tm_score)}${comparison}; valid coverage ${method.coverage}/${snapshot.targets.length}.</li>`);
  });
  parts.push("</ol><p>Means aggregate each method's available targets with equal target weighting; target sets may differ. Rank changes are descriptive, not a statistical significance test, and do not by themselves imply a model version change.</p>");
  parts.push(`<p><a href="${SITE_URL}#news-panel">View news</a> · <a href="${SITE_URL}">Open the leaderboard</a></p>`);
  return parts.join("\n");
}

export function buildRss(current, history) {
  const snapshots = [...history];
  // Rebuilding unchanged data must not create a new entry or change its date.
  if (!snapshots.some((snapshot) => snapshot.id === current.id)) snapshots.push(current);
  const seen = new Set();
  for (const snapshot of snapshots) {
    if (seen.has(snapshot.id)) throw new Error(`Duplicate RSS snapshot: ${snapshot.id}`);
    seen.add(snapshot.id);
    if (!Number.isFinite(Date.parse(snapshot.published_at || snapshot.generated_at))) throw new Error(`Invalid RSS date: ${snapshot.id}`);
  }
  snapshots.sort((a, b) => Date.parse(a.published_at || a.generated_at) - Date.parse(b.published_at || b.generated_at));
  const items = snapshots.flatMap((snapshot, index) => {
    if (snapshot.baseline_only) return [];
    const previous = snapshots[index - 1];
    const previousIds = new Set(previous?.targets.map((target) => target.target_id) || []);
    const added = previous ? snapshot.targets.filter((target) => !previousIds.has(target.target_id)).length : 0;
    const title = `RiboArena update: ${snapshot.targets.length} RNA targets${added ? `, ${added} new target${added === 1 ? "" : "s"}` : ""}`;
    return [`    <item>
      <title>${escapeXml(title)}</title>
      <link>${SITE_URL}#news-panel</link>
      <guid isPermaLink="false">urn:riboarena:snapshot:${snapshot.id}</guid>
      <pubDate>${new Date(snapshot.published_at || snapshot.generated_at).toUTCString()}</pubDate>
      <category>RNA structure prediction</category>
      <description>${escapeXml(updateHtml(snapshot, previous))}</description>
    </item>`];
  }).reverse();
  const latest = snapshots.filter((snapshot) => !snapshot.baseline_only).at(-1);
  if (!latest) throw new Error("RSS needs at least one published snapshot");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RiboArena Updates</title>
    <link>${SITE_URL}</link>
    <description>RNA 3D structure prediction benchmark updates: rankings, new RNA targets, and dataset coverage. We aim to update weekly when new results are available.</description>
    <language>en</language>
    <lastBuildDate>${new Date(latest.published_at || latest.generated_at).toUTCString()}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <ttl>360</ttl>
${items.join("\n")}
  </channel>
</rss>
`;
}
