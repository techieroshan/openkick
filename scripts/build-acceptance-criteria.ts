import fs from "node:fs";
import path from "node:path";

type RegistryItem = {
  usId: string;
  title: string;
  acId: string;
  summary: string;
  sourceFile: string;
};

function parseOneFile(md: string, sourceFile: string, startUsCounter: number) {
  const lines = md.split(/\r?\n/);
  const items: RegistryItem[] = [];
  let usCounter = startUsCounter;
  let acIndex = 0;
  let currentUS = "";
  let currentTitle = "";

  for (const line of lines) {
    const usMatch = line.match(/^\s*(\d+)\)\s+As\s+/);
    if (usMatch) {
      const rawNum = Number(usMatch[1]);
      // For addendum files where numbering starts at 90, preserve numbering.
      // Otherwise assign sequentially from startUsCounter.
      usCounter =
        rawNum >= 90 ? rawNum : Math.max(usCounter + 1, startUsCounter + 1);
      acIndex = 0;
      currentTitle = line.replace(/^\s*\d+\)\s+/, "").trim();
      currentUS = `US-${String(usCounter).padStart(3, "0")}`;
      continue;
    }

    if (line.trim().startsWith("* Acceptance criteria")) continue;
    if (!currentUS) continue;

    // AC lines are markdown bullets like: * When ...
    const acMatch = line.match(/^\s*\*\s+(?!Acceptance criteria)(.+)$/);
    if (acMatch) {
      acIndex += 1;
      const acId = `AC-${currentUS.split("-")[1]}-${acIndex}`;
      items.push({
        usId: currentUS,
        title: currentTitle,
        acId,
        summary: acMatch[1].trim(),
        sourceFile,
      });
    }
  }

  return { items, usCounter };
}

function parseManyFiles(files: { absPath: string; logicalName: string }[]) {
  let usCounter = 0;
  const all: RegistryItem[] = [];
  for (const f of files) {
    const md = fs.readFileSync(f.absPath, "utf8");
    const parsed = parseOneFile(md, f.logicalName, usCounter);
    all.push(...parsed.items);
    usCounter = parsed.usCounter;
  }
  return all;
}

function main() {
  const docsDir = path.join(process.cwd(), "docs");
  const out = path.join(process.cwd(), "artifacts", "acceptance-criteria.json");

  const files = [
    {
      absPath: path.join(docsDir, "user_stories_with_acceptance_criteria.md"),
      logicalName: "user_stories_with_acceptance_criteria.md",
    },
    {
      absPath: path.join(
        docsDir,
        "user_stories_with_acceptance_criteria_append_crowdfunding.md"
      ),
      logicalName: "user_stories_with_acceptance_criteria_append_crowdfunding.md",
    },
  ];

  const items = parseManyFiles(files);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(items, null, 2));
  // eslint-disable-next-line no-console
  console.log(`wrote ${items.length} acceptance criteria to ${out}`);
}

main();

