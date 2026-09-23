import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDir = join(root, "site");
const datasetDir = join(root, "cdhit100_full");
const targetDir = join(datasetDir, "targets");
const outDir = join(root, "dist");
const dataOut = join(outDir, "data");

await rm(outDir, { recursive: true, force: true });
await mkdir(dataOut, { recursive: true });
await cp(sourceDir, outDir, { recursive: true });

for (const filename of ["leaderboard.json", "methods.json", "provenance.json"]) {
  await cp(join(datasetDir, filename), join(dataOut, filename));
}

const targetFiles = (await readdir(targetDir)).filter((name) => name.endsWith(".json")).sort();
const targets = [];

for (const filename of targetFiles) {
  const target = JSON.parse(await readFile(join(targetDir, filename), "utf8"));
  targets.push({
    target_id: target.target_id,
    pdb_id: target.pdb_id,
    length: target.length,
    release_date: target.release_date,
    eligible: target.eligible,
    input_issue: target.input_issue,
    methods: target.methods.map((method) => ({
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

const totalMethods = JSON.parse(await readFile(join(datasetDir, "leaderboard.json"), "utf8")).methods.length;
console.log(`Built dist/ with ${totalMethods} methods and ${targets.length} target summaries.`);
