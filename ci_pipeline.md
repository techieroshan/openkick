Title: CI Pipeline for Lint, Type, Tests, Traceability, Lighthouse with Vite and BFF

GitHub Actions workflow dot github slash workflows slash ci dot yml
```yaml
name: ci
on:
  pull_request:
  push:
    branches: [main]

jobs:
  build-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
        ports: ["5432:5432"]
        options: >-
          --health-cmd="pg_isready -U postgres"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: yarn
      - run: yarn install --frozen-lockfile
      - run: yarn lint
      - run: yarn typecheck
      - run: yarn test:unit
      - name: Build web
        working-directory: apps/web
        run: yarn build
      - name: Build bff
        working-directory: apps/bff
        run: yarn build
      - name: Start services
        run: |
          node apps/bff/dist/server.js & echo $! > bff.pid
          yarn --cwd apps/web preview --port 4173 & echo $! > web.pid
          sleep 5
      - name: E2E tests
        run: yarn test:e2e
      - name: Traceability check
        run: node scripts/check-traceability.js
      - name: Lighthouse
        uses: treosh/lighthouse-ci-action@v12
        with:
          urls: |
            http://localhost:4173/
            http://localhost:4173/cases
            http://localhost:4173/eligibility
          configPath: ./lighthouserc.json
          uploadArtifacts: true
      - name: Stop services
        if: always()
        run: |
          kill $(cat bff.pid) || true
          kill $(cat web.pid) || true


scripts slash check dash traceability dot js

const fs = require("node:fs");
const path = require("node:path");

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
const missing = [];
const regPath = path.join(process.cwd(), "artifacts", "acceptance-criteria.json");
if (!fs.existsSync(regPath)) {
  console.error("acceptance criteria registry not found");
  process.exit(1);
}
const reg = JSON.parse(fs.readFileSync(regPath, "utf8"));
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
lighthouserc dot json

{
  "ci": {
    "collect": { "numberOfRuns": 1 },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.85 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }],
        "categories:seo": ["warn", { "minScore": 0.9 }]
      }
    }
  }
}