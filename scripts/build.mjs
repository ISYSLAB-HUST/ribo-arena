import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDir = join(root, "site");
const datasetDir = join(root, "cdhit100_full");
const targetDir = join(datasetDir, "targets");
const outDir = join(root, "dist");
const dataOut = join(outDir, "data");
const excludedMethodIds = new Set([
  "protenix_base_20250630_v1.0.0-c96150b5b002d197",
]);

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  if (!sorted.length) return null;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

const timingRaw = JSON.parse(await readFile(join(datasetDir, "timing.json"), "utf8"));
const timingByMethod = new Map(timingRaw.methods.map((method) => [method.method_variant_id, method]));
const runsByMethod = new Map();
for (const run of timingRaw.runs) {
  const values = runsByMethod.get(run.method_variant_id) || [];
  const partialSeconds = run.timing?.native_reported?.job_completed_seconds?.value;
  if (Number.isFinite(partialSeconds)) values.push(partialSeconds);
  runsByMethod.set(run.method_variant_id, values);
}

function timingSummary(methodVariantId) {
  const source = timingByMethod.get(methodVariantId);
  const cohort = source?.cohorts?.find((item) => item.prediction_wall_seconds?.available?.mean_seconds != null);
  if (cohort) {
    return {
      mean_seconds: cohort.prediction_wall_seconds.available.mean_seconds,
      median_seconds: cohort.prediction_wall_seconds.available.median_seconds,
      protocol: cohort.protocol,
      partial: false,
    };
  }
  const partialValues = runsByMethod.get(methodVariantId) || [];
  if (partialValues.length) {
    return {
      mean_seconds: partialValues.reduce((sum, value) => sum + value, 0) / partialValues.length,
      median_seconds: median(partialValues),
      protocol: source?.cohorts?.[0]?.protocol || "native_reported_partial_v1",
      partial: true,
    };
  }
  return { mean_seconds: null, median_seconds: null, protocol: null, partial: false };
}

await rm(outDir, { recursive: true, force: true });
await mkdir(dataOut, { recursive: true });
await cp(sourceDir, outDir, { recursive: true });

const leaderboard = JSON.parse(await readFile(join(datasetDir, "leaderboard.json"), "utf8"));
leaderboard.methods = leaderboard.methods.filter((method) => !excludedMethodIds.has(method.method_variant_id));
leaderboard.methods = leaderboard.methods.map((method) => ({ ...method, timing: timingSummary(method.method_variant_id) }));
leaderboard.targets = leaderboard.targets.filter((target) => target.eligible);
leaderboard.dataset.target_count = leaderboard.targets.length;
leaderboard.dataset.eligible_target_count = leaderboard.targets.length;
await writeFile(join(dataOut, "leaderboard.json"), `${JSON.stringify(leaderboard)}\n`);

const methods = JSON.parse(await readFile(join(datasetDir, "methods.json"), "utf8"));
methods.methods = methods.methods.filter((method) => !excludedMethodIds.has(method.method_variant_id));
await writeFile(join(dataOut, "methods.json"), `${JSON.stringify(methods)}\n`);

await cp(join(datasetDir, "provenance.json"), join(dataOut, "provenance.json"));

const targetFiles = (await readdir(targetDir)).filter((name) => name.endsWith(".json")).sort();
const targets = [];

for (const filename of targetFiles) {
  const target = JSON.parse(await readFile(join(targetDir, filename), "utf8"));
  if (!target.eligible) continue;
  targets.push({
    target_id: target.target_id,
    pdb_id: target.pdb_id,
    length: target.length,
    release_date: target.release_date,
    eligible: target.eligible,
    input_issue: target.input_issue,
    methods: target.methods.filter((method) => !excludedMethodIds.has(method.method_variant_id)).map((method) => ({
      method_variant_id: method.method_variant_id,
      status: method.status,
      counts: method.counts,
      statistics: method.statistics,
    })),
  });
}

await writeFile(
  join(dataOut, "targets-summary.json"),
  `${JSON.stringify({ schema_version: "rna-leaderboard-target-summary/1.0", targets })}\n`,
);
await writeFile(join(outDir, ".nojekyll"), "");

console.log(`Built dist/ with ${leaderboard.methods.length} methods and ${targets.length} target summaries.`);
