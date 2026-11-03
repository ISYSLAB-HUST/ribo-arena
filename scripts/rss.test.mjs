import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildRss, snapshotOf, escapeXml, FEED_URL } from "./rss.mjs";

const history = JSON.parse(await readFile(new URL("../updates/history.json", import.meta.url), "utf8"));
const raw = JSON.parse(await readFile(new URL("../rna_exact_current/leaderboard.json", import.meta.url), "utf8"));
const current = snapshotOf(raw);
const octoberIndex = history.findIndex((snapshot) => snapshot.published_at === "2026-10-12T00:00:00+08:00");
const october = history[octoberIndex];

test("current snapshot matches the retained archive and filters the excluded model", () => {
  assert.equal(current.id, history.at(-1).id);
  const displayed = raw.methods.filter((method) => method.tool_id !== "protenix_base_20250630_v1.0.0");
  assert.equal(current.methods.length, displayed.length);
  assert.equal(current.targets.length, raw.targets.filter((target) => target.eligible).length);
  assert.equal(current.methods.reduce((total, method) => total + method.evaluated, 0), displayed.reduce((total, method) => total + method.counts.evaluated_count, 0));
  assert.ok(current.methods.every((method) => method.coverage <= current.targets.length));
  assert.ok(!JSON.stringify(current).includes("protenix_base_20250630"));
});

test("feed describes the published target additions and rank exchange accurately", () => {
  const feed = buildRss(october, history.slice(0, octoberIndex + 1));
  assert.equal((feed.match(/<item>/g) || []).length, 1);
  assert.ok(feed.includes(FEED_URL));
  for (const id of ["26hh_1_1_A", "9x21_1_1_A", "12aa_1_1_A"]) assert.ok(feed.includes(id));
  assert.ok(feed.includes("2,965"));
  assert.ok(feed.includes("+130"));
  assert.match(feed, /Protenix base default v1\.0\.0: 0\.4795; rank 4 → 3/);
  assert.match(feed, /AlphaFold3: 0\.4782; rank 3 → 4/);
  assert.match(feed, /MetaFold-RNA3d: 0\.5603; rank 1 → 1/);
  assert.ok(feed.includes("valid coverage 65/66"));
  assert.ok(feed.includes("<pubDate>Sun, 11 Oct 2026 16:00:00 GMT</pubDate>"));
});

test("unchanged rebuilds keep GUIDs, publication dates, and feed bytes stable", () => {
  const regenerated = { ...current, generated_at: "2026-10-13T00:00:00Z" };
  assert.equal(buildRss(regenerated, history), buildRss(current, history));
  const reordered = structuredClone(raw);
  reordered.targets.reverse();
  reordered.methods.reverse();
  assert.equal(snapshotOf(reordered).id, current.id);
});

test("November update retains history and reports 8 added targets and the Boltz-2 rank change", () => {
  const index = history.findIndex((snapshot) => snapshot.generated_at.startsWith("2026-10-30T"));
  assert.ok(index > 0);
  const snapshot = history[index];
  assert.equal(snapshot.targets.length, 74);
  assert.equal(snapshot.methods.reduce((sum, method) => sum + method.evaluated, 0), 3325);
  assert.equal(snapshot.methods.find((method) => method.id === "rhofoldplus").coverage, 73);
  const feed = buildRss(snapshot, history.slice(0, index + 1));
  assert.equal((feed.match(/<item>/g) || []).length, 2);
  assert.ok(feed.includes("74 RNA targets, 8 new targets"));
  assert.ok(feed.includes("+360 structures"));
  assert.match(feed, /Boltz-2: 0\.4550; rank 7 → 6/);
  assert.match(feed, /RoseTTAFold3: 0\.4441; rank 6 → 7/);
  const previous = new Set(history[index - 1].targets.map((target) => target.target_id));
  const additions = snapshot.targets.filter((target) => !previous.has(target.target_id));
  assert.equal(additions.length, 8);
  additions.forEach((target) => assert.ok(feed.includes(target.target_id)));
});

test("future snapshots retain earlier entries and compare against the latest archive", () => {
  const future = structuredClone(raw);
  future.generated_at = new Date(Date.parse(history.at(-1).published_at || current.generated_at) + 7 * 86400000).toISOString();
  future.targets.push({ eligible: true, target_id: "future_1_A", pdb_id: "FUTR", length: 10, release_date: "2026-10-14" });
  const next = snapshotOf(future);
  const feed = buildRss(next, history);
  assert.equal((feed.match(/<item>/g) || []).length, history.filter((snapshot) => !snapshot.baseline_only).length + 1);
  assert.ok(feed.includes(`${current.targets.length + 1} RNA targets, 1 new target</title>`));
  assert.ok(feed.includes(`urn:riboarena:snapshot:${current.id}`));
  assert.ok(feed.indexOf(next.id) < feed.indexOf(current.id));
});

test("XML and HTML content are escaped, missing scores are not coerced to zero", () => {
  assert.equal(escapeXml('&<>"\''), "&amp;&lt;&gt;&quot;&apos;");
  const special = structuredClone(current);
  special.id = "test-escape";
  special.generated_at = new Date(Date.parse(history.at(-1).published_at || current.generated_at) + 7 * 86400000).toISOString();
  special.methods[0].name = "RNA & <script> ]]>";
  special.methods[0].metrics.rna_tm_score = null;
  const feed = buildRss(special, history);
  assert.ok(feed.includes("RNA &amp;amp; &amp;lt;script&amp;gt; ]]&amp;gt;: —"));
  assert.ok(!feed.includes("<script>"));
  assert.ok(!feed.includes("NaN"));
  assert.throws(() => buildRss(current, [...history, history[0]]), /Duplicate RSS snapshot/);
  assert.throws(() => buildRss({ ...current, id: "bad-date", generated_at: "not-a-date" }, history), /Invalid RSS date/);
});
