import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDir = join(root, "site");
const datasetDir = join(root, "rna_exact_current");
const targetDir = join(datasetDir, "targets");
const outDir = join(root, "dist");
const dataOut = join(outDir, "data");
// Filter the tool, including every execution variant in the latest export.
const includedMethod = (method) => method.tool_id !== "protenix_base_20250630_v1.0.0";

const timingRaw = JSON.parse(await readFile(join(datasetDir, "timing.json"), "utf8"));
const timingByMethod = new Map(timingRaw.methods.map((method) => [method.tool_id, method]));

function timingSummary(toolId) {
  const source = timingByMethod.get(toolId);
  const summary = source?.prediction_wall_seconds;
  // Use the published, equally target-weighted full cohort. Do not substitute
  // native partial times or average resource-stratum means.
  return {
    mean_seconds: summary?.complete ? summary.mean_seconds : null,
    median_seconds: summary?.complete ? summary.median_seconds : null,
    measured_target_count: summary?.measured_target_count ?? 0,
    target_count: summary?.target_count ?? 0,
    protocol: [...new Set((source?.resource_strata || []).map((item) => item.protocol))].join(", "),
    partial: false,
  };
}

await rm(outDir, { recursive: true, force: true });
await mkdir(dataOut, { recursive: true });
await cp(sourceDir, outDir, { recursive: true });

const leaderboard = JSON.parse(await readFile(join(datasetDir, "leaderboard.json"), "utf8"));
leaderboard.methods = leaderboard.methods.filter(includedMethod);
leaderboard.methods = leaderboard.methods.map((method) => ({ ...method, timing: timingSummary(method.tool_id) }));
leaderboard.targets = leaderboard.targets.filter((target) => target.eligible);
leaderboard.dataset.target_count = leaderboard.targets.length;
leaderboard.dataset.eligible_target_count = leaderboard.targets.length;
await writeFile(join(dataOut, "leaderboard.json"), `${JSON.stringify(leaderboard)}\n`);

const methods = JSON.parse(await readFile(join(datasetDir, "methods.json"), "utf8"));
methods.methods = methods.methods.filter(includedMethod);
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
    methods: target.methods.filter(includedMethod).map((method) => ({
      tool_id: method.tool_id,
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
