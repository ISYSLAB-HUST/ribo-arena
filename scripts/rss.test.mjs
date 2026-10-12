import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildRss, snapshotOf, escapeXml, FEED_URL } from "./rss.mjs";

const history = JSON.parse(await readFile(new URL("../updates/history.json", import.meta.url), "utf8"));
const raw = JSON.parse(await readFile(new URL("../rna_exact_current/leaderboard.json", import.meta.url), "utf8"));
const current = snapshotOf(raw);

test("current snapshot matches the retained archive and filters the excluded model", () => {
  assert.equal(current.id, history.at(-1).id);
  assert.equal(current.methods.length, 9);
  assert.equal(current.targets.length, 66);
  assert.equal(current.methods.reduce((total, method) => total + method.evaluated, 0), 2965);
  assert.equal(current.methods.find((method) => method.id === "rhofoldplus").coverage, 65);
  assert.ok(!JSON.stringify(current).includes("protenix_base_20250630"));
});

test("feed describes the published target additions and rank exchange accurately", () => {
  const feed = buildRss(current, history);
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

test("future snapshots retain earlier entries and compare against the latest archive", () => {
  const future = structuredClone(raw);
  future.generated_at = "2026-10-20T00:00:00Z";
  future.targets.push({ eligible: true, target_id: "future_1_A", pdb_id: "FUTR", length: 10, release_date: "2026-10-14" });
  const next = snapshotOf(future);
  const feed = buildRss(next, history);
  assert.equal((feed.match(/<item>/g) || []).length, 2);
  assert.ok(feed.includes("67 RNA targets, 1 new target</title>"));
  assert.ok(feed.includes(`urn:riboarena:snapshot:${current.id}`));
  assert.ok(feed.indexOf(next.id) < feed.indexOf(current.id));
});

test("XML and HTML content are escaped, missing scores are not coerced to zero", () => {
  assert.equal(escapeXml('&<>"\''), "&amp;&lt;&gt;&quot;&apos;");
  const special = structuredClone(current);
  special.id = "test-escape";
  special.generated_at = "2026-10-20T00:00:00Z";
  special.methods[0].name = "RNA & <script> ]]>";
  special.methods[0].metrics.rna_tm_score = null;
  const feed = buildRss(special, history);
  assert.ok(feed.includes("RNA &amp;amp; &amp;lt;script&amp;gt; ]]&amp;gt;: —"));
  assert.ok(!feed.includes("<script>"));
  assert.ok(!feed.includes("NaN"));
  assert.throws(() => buildRss(current, [...history, history[0]]), /Duplicate RSS snapshot/);
  assert.throws(() => buildRss({ ...current, id: "bad-date", generated_at: "not-a-date" }, history), /Invalid RSS date/);
});
