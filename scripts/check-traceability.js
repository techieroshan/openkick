const fs = require("node:fs");
const path = require("node:path");

function main() {
  const e2e = path.join(process.cwd(), "artifacts", "traceability-e2e.json");
  if (!fs.existsSync(e2e)) {
    console.error("traceability file not found");
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(e2e, "utf8"));
  const byAC = new Map();
  for (const row of data) {
    const key = `${row.usId}:${row.acId || ""}`;
    if (!byAC.has(key)) byAC.set(key, []);
    byAC.get(key).push(row);
  }

  const regPath = path.join(process.cwd(), "artifacts", "acceptance-criteria.json");
  if (!fs.existsSync(regPath)) {
    console.error("acceptance criteria registry not found");
    process.exit(1);
  }
  const reg = JSON.parse(fs.readFileSync(regPath, "utf8"));

  const missing = [];
  for (const item of reg) {
    const key = `${item.usId}:${item.acId}`;
    const rows = byAC.get(key) || [];
    if (!rows.some((r) => r.status === "passed")) missing.push(item);
  }
  if (missing.length) {
    console.error("missing acceptance criteria coverage:");
    for (const m of missing) console.error(`${m.usId} ${m.acId} ${m.summary}`);
    process.exit(1);
  }
  console.log("traceability coverage ok");
}

main();

