Title: Acceptance Criteria Registry Generator

Purpose
Build a machine readable registry of all user stories and acceptance criteria from user stories markdown and expose it to the app and CI

Script scripts slash build dash acceptance dash criteria dot ts
```ts
import fs from "node:fs";
import path from "node:path";

const input = path.join(process.cwd(), "docs", "user_stories_with_acceptance_criteria.md");
const out = path.join(process.cwd(), "artifacts", "acceptance-criteria.json");

function parse(md: string) {
  const lines = md.split(/\r?\n/);
  const items: any[] = [];
  let currentUS = "";
  let currentTitle = "";
  let usCounter = 0;
  let acIndex = 0;
  for (const line of lines) {
    const usMatch = line.match(/^\d+\)\s+As .*$/);
    if (usMatch) {
      usCounter += 1;
      acIndex = 0;
      currentTitle = line.replace(/^\d+\)\s+/, "").trim();
      currentUS = `US-${String(usCounter).padStart(3, "0")`;
      continue;
    }
    if (line.trim().startsWith("* Acceptance criteria")) continue;
    if (line.trim().startsWith("*")) {
      acIndex += 1;
      const acId = `AC-${currentUS.split("-")[1]}-${acIndex}`;
      const summary = line.replace(/^\*\s*/, "").trim();
      items.push({ usId: currentUS, title: currentTitle, acId, summary });
    }
  }
  return items;
}

function main() {
  const md = fs.readFileSync(input, "utf8");
  const items = parse(md);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(items, null, 2));
  console.log(`wrote ${items.length} acceptance criteria to ${out}`);
}

main();

Add to package json scripts

{
  "scripts": {
    "build:ac": "ts-node scripts/build-acceptance-criteria.ts"
  }
}
