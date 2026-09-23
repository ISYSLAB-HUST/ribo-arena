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

await rm(outDir, { recursive: true, force: true });
await mkdir(dataOut, { recursive: true });
await cp(sourceDir, outDir, { recursive: true });

const leaderboard = JSON.parse(await readFile(join(datasetDir, "leaderboard.json"), "utf8"));
leaderboard.methods = leaderboard.methods.filter((method) => !excludedMethodIds.has(method.method_variant_id));
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
