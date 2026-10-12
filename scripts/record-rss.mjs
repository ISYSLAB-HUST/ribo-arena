// Archive a snapshot before publishing a dataset update, without modifying results.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { snapshotOf } from "./rss.mjs";

const source = new URL("../rna_exact_current/leaderboard.json", import.meta.url);
const archive = new URL("../updates/history.json", import.meta.url);
const history = JSON.parse(await readFile(archive, "utf8"));
const snapshot = snapshotOf(JSON.parse(await readFile(source, "utf8")));
if (history.some((entry) => entry.id === snapshot.id)) {
  console.log("RSS snapshot already archived; no changes.");
} else {
  snapshot.published_at = new Date().toISOString();
  history.push(snapshot);
  await writeFile(archive, `${JSON.stringify(history, null, 2)}\n`);
  console.log(`Archived RSS snapshot in ${fileURLToPath(archive)}.`);
}
