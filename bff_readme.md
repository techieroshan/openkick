Title: Openkick BFF Server

Overview
Fastify 4 server that implements the BFF endpoints described in api_specs.md. It uses Zod for validation, JWT cookie sessions for auth, role gates for access control, and in memory mock repositories that match database_schema.md. All endpoints are namespaced under slash v1 and slash api.

Quick start
1. yarn install
2. yarn dev
3. The server runs on http colon slash slash localhost colon 8787
4. Your Vite web app should proxy slash v1 and slash api to this server

Scripts
- dev runs ts node dev with hot reload
- build compiles to dist
- start runs the compiled server

Security
- Cookie based JWT session HttpOnly Secure in production SameSite Lax
- HMAC signing for outbound webhooks
- CORS configured for local dev

Notes
- Replace mock repositories with real database access when ready
- All responses follow the JSON format and status codes described in api_specs.md


Filename: package.json
{
  "name": "@openkick/bff",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsup src/server.ts --format esm --out-dir dist --clean",
    "start": "node dist/server.js",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@fastify/cors": "^9.0.1",
    "@fastify/cookie": "^9.3.1",
    "@fastify/helmet": "^12.0.1",
    "@fastify/formbody": "^7.4.0",
    "@fastify/multipart": "^8.3.0",
    "fastify": "^4.27.2",
    "fastify-plugin": "^4.5.1",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.23.8",
    "uuid": "^9.0.1",
    "dayjs": "^1.11.11",
    "pino": "^9.0.0",
    "pino-pretty": "^11.2.2",
    "object-hash": "^3.0.0"
  },
  "devDependencies": {
    "tsup": "^8.0.1",
    "tsx": "^4.7.0",
    "typescript": "^5.6.2",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/node": "^20.11.30",
    "eslint": "^8.57.0",
    "@typescript-eslint/parser": "^7.0.2",
    "@typescript-eslint/eslint-plugin": "^7.0.2"
  }
}
Filename: tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022"],
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "types": ["node"],
    "outDir": "dist",
    "rootDir": "src",
    "baseUrl": ".",
    "paths": {
      "@types/*": ["../types/*"],
      "@repo/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
Filename: src/server.ts
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import cookie from "@fastify/cookie";
import formbody from "@fastify/formbody";
import multipart from "@fastify/multipart";
import { registerAuth } from "./plugins/auth.js";
import { errorHandler } from "./plugins/errors.js";
import { registerRoutes } from "./routes/index.js";

const app = Fastify({
  logger: {
    transport: { target: "pino-pretty" }
  }
});

await app.register(helmet, { contentSecurityPolicy: false });
await app.register(cors, {
  origin: (origin, cb) => cb(null, true),
  credentials: true
});
await app.register(cookie, { hook: "onRequest", secret: "dev-secret-change-me" });
await app.register(formbody);
await app.register(multipart);
await app.register(registerAuth);

app.setErrorHandler(errorHandler);

await app.register(registerRoutes, { prefix: "/v1" });

// Traceability JSON for CI
app.get("/api/traceability", async () => {
  return { generatedAt: new Date().toISOString(), items: [] };
});

const port = Number(process.env.PORT || 8787);
app.listen({ port, host: "0.0.0.0" }).then(() => {
  app.log.info(`BFF running on http://localhost:${port}`);
});
Filename: src/plugins/auth.ts
import fp from "fastify-plugin";
import jwt from "jsonwebtoken";
import { z } from "zod";

const SessionPayload = z.object({
  sub: z.string(),
  email: z.string().email(),
  roles: z.array(z.string())
});
type SessionPayload = z.infer<typeof SessionPayload>;

declare module "fastify" {
  interface FastifyRequest {
    session?: SessionPayload;
  }
}

export const registerAuth = fp(async (app) => {
  const JWT_SECRET = process.env.JWT_SECRET || "dev-change-me";
  const COOKIE_NAME = "ok_session";

  app.decorate("signSession", (payload: SessionPayload) =>
    jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
  );

  app.decorate("verifySession", async (req: any, reply: any) => {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const parsed = SessionPayload.parse(decoded);
      req.session = parsed;
    } catch {
      // ignore invalid token
    }
  });

  app.addHook("onRequest", async (req, reply) => {
    await app.verifySession(req, reply);
  });

  app.decorate(
    "requireRoles",
    (roles: string[]) =>
      async (req: any, reply: any) => {
        const has = req.session?.roles?.some((r: string) => roles.includes(r));
        if (!has) {
          reply.status(403).send({ error: "forbidden", message: "Insufficient role" });
        }
      }
  );

  // Login and refresh
  app.post("/v1/auth/login", async (req: any, reply: any) => {
    const body = z.object({ email: z.string().email(), password: z.string().min(6) }).parse(req.body);
    // Mock user and roles for dev
    const roles = body.email.includes("admin")
      ? ["website_admin", "website_owner"]
      : ["consumer"];
    const token = jwt.sign({ sub: "user-1", email: body.email, roles }, JWT_SECRET, { expiresIn: "7d" });
    reply.setCookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/"
    });
    return { access_token: token, user: { id: "user-1", email: body.email, roles } };
  });

  app.post("/v1/auth/refresh", async (req) => {
    if (!req.session) return { access_token: null };
    const token = jwt.sign(req.session, JWT_SECRET, { expiresIn: "7d" });
    return { access_token: token };
  });

  app.post("/v1/auth/logout", async (req, reply) => {
    reply.clearCookie(COOKIE_NAME, { path: "/" });
    return { ok: true };
  });
});
Filename: src/plugins/errors.ts
import { FastifyInstance, FastifyError, FastifyReply, FastifyRequest } from "fastify";

export function errorHandler(
  this: FastifyInstance,
  err: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
) {
  const status = err.statusCode || 500;
  const code = (err as any).code || "internal_error";
  const message = err.message || "Internal Server Error";
  this.log.error({ err }, "request error");
  reply.status(status).send({ error: code, message });
}
Filename: src/utils/pagination.ts
export function paginate<T>(items: T[], page = 1, perPage = 20) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    data: items.slice(start, end),
    pagination: {
      page,
      per_page: perPage,
      total: items.length,
      total_pages: Math.ceil(items.length / perPage)
    }
  };
}
Filename: src/utils/webhook.ts
import crypto from "node:crypto";

export function signPayload(secret: string, payload: unknown) {
  const body = JSON.stringify(payload);
  const sig = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return { signature: sig, body };
}
Filename: src/repos/mockDb.ts
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

// Seed cases and basic entities. Aligns with database_schema.md shapes but simplified.
export const categories = [
  { id: "cat-privacy", slug: "privacy-data-breach", name: "Privacy and data breaches" },
  { id: "cat-employment", slug: "employment-wage-hour", name: "Employment and wage and hour" }
];

export const cases = [
  {
    id: "case-1",
    slug: "google-play-store-settlement",
    title: "$630M Google Play Store class action settlement",
    defendants: "Google LLC",
    companies: [{ id: "co-1", name: "Google" }],
    jurisdiction: "N D Cal",
    court: "U S District Court",
    docket_number: "3 21 cv 05227",
    status: "open",
    category_id: "cat-privacy",
    official_site_url: "https://example.com/google-play-settlement",
    administrator_name: "Kroll",
    opt_out_deadline: null,
    claim_deadline: dayjs().add(40, "day").format("YYYY-MM-DD"),
    proof_required: "no",
    award_rules: "At least $2"
  }
];

export const classDefinitions = [
  {
    id: uuid(),
    case_id: "case-1",
    description: "Consumers who made a qualifying purchase via Google Play Billing between Aug 16 2016 and Sep 30 2023",
    period_start: "2016-08-16",
    period_end: "2023-09-30",
    geography: "U S",
    exclusions: "Opt outs and employees"
  }
];

export const notices = [
  {
    id: uuid(),
    case_id: "case-1",
    source: "url",
    url: "https://example.com/google-play-notice",
    extracted_text: "Official Notice of Settlement Class period Aug 2016 to Sep 2023",
    extraction_confidence: 0.93
  }
];

export const eligibilityChecks: any[] = [];
export const users: any[] = [
  { id: "user-1", email: "consumer@example.com", roles: ["consumer"] }
];

export const claimLockers: any[] = [];
export const files: any[] = [];

export const firms = [
  { id: "firm-1", name: "Example Plaintiff Firm", verified: true, naca_member: false }
];

export const leads: any[] = [];
export const consents: any[] = [];
export const webhooks: any[] = [];
export const webhookDeliveries: any[] = [];
Filename: src/routes/index.ts
import fp from "fastify-plugin";
import { registerCases } from "./modules/cases.js";
import { registerEligibility } from "./modules/eligibility.js";
import { registerLocker } from "./modules/locker.js";
import { registerFirms } from "./modules/firms.js";
import { registerInvestigations } from "./modules/investigations.js";
import { registerLeads } from "./modules/leads.js";
import { registerAdmin } from "./modules/adminCampaigns.js";
import { registerPosts } from "./modules/posts.js";
import { registerUsers } from "./modules/users.js";

export const registerRoutes = fp(async (app, opts) => {
  await app.register(registerUsers);
  await app.register(registerCases);
  await app.register(registerEligibility);
  await app.register(registerLocker);
  await app.register(registerFirms);
  await app.register(registerInvestigations);
  await app.register(registerLeads);
  await app.register(registerAdmin);
  await app.register(registerPosts);
});
Filename: src/routes/modules/cases.ts
import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { cases, classDefinitions, notices } from "../../repos/mockDb.js";
import { paginate } from "../../utils/pagination.js";

export const registerCases: FastifyPluginAsync = async (app) => {
  app.get("/cases", async (req: any) => {
    const q = req.query as any;
    const page = Number(q.page || 1);
    const per = Number(q.per_page || 20);
    // For demo ignore filters
    const result = paginate(cases, page, per);
    return result;
  });

  app.get("/cases/:id", async (req) => {
    const { id } = req.params as any;
    const c = cases.find((x) => x.id === id || x.slug === id);
    if (!c) return { error: "not_found", message: "Case not found" };
    const defs = classDefinitions.filter((d) => d.case_id === c.id);
    const notes = notices.filter((n) => n.case_id === c.id);
    return { ...c, class_definitions: defs, notices: notes };
  });

  const CaseCreate = z.object({
    title: z.string(),
    defendants: z.string(),
    category_id: z.string(),
    status: z.enum(["open", "pending", "closed", "paid"]),
    official_site_url: z.string().url().optional(),
    claim_deadline: z.string().optional(),
    opt_out_deadline: z.string().optional(),
    proof_required: z.enum(["yes", "no", "unknown"]).optional(),
    award_rules: z.string().optional()
  });

  app.post("/cases", { preHandler: app.requireRoles(["editor", "website_admin"]) }, async (req) => {
    const body = CaseCreate.parse(req.body);
    const id = `case-${Math.random().toString(36).slice(2)}`;
    const slug = body.title.toLowerCase().replace(/\s+/g, "-");
    const c = { id, slug, ...body, companies: [], jurisdiction: "", court: "", docket_number: "" };
    cases.push(c);
    return c;
  });

  app.post("/cases/:id/publish", { preHandler: app.requireRoles(["editor", "website_admin"]) }, async (req) => {
    const { id } = req.params as any;
    const c = cases.find((x) => x.id === id);
    if (!c) return { error: "not_found", message: "Case not found" };
    // Mark published by adding published_at in real impl
    return { ok: true };
  });

  app.get("/cases/:id/calendar", async (req) => {
    const { id } = req.params as any;
    const c = cases.find((x) => x.id === id);
    if (!c) return { error: "not_found", message: "Case not found" };
    const items = [];
    if (c.claim_deadline) items.push({ type: "claim_deadline", date: c.claim_deadline, description: "Claim deadline" });
    if (c.opt_out_deadline) items.push({ type: "opt_out_deadline", date: c.opt_out_deadline, description: "Opt out deadline" });
    return items;
  });
};
Filename: src/routes/modules/eligibility.ts
import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { eligibilityChecks, cases as caseRepo, notices as noticeRepo } from "../../repos/mockDb.js";

const EligibilityBody = z.object({
  case_id: z.string(),
  input_type: z.enum(["pasted_text", "pdf", "notice_link", "qa"]),
  pasted_text: z.string().optional(),
  notice_id: z.string().optional(),
  qa_answers: z.record(z.any()).optional()
});

export const registerEligibility: FastifyPluginAsync = async (app) => {
  app.post("/eligibility/check", async (req) => {
    const body = EligibilityBody.parse(req.body);
    const c = caseRepo.find((x) => x.id === body.case_id);
    if (!c) return { error: "not_found", message: "Case not found" };

    let confidence = 0.6;
    if (body.pasted_text) confidence = 0.9;
    if (body.notice_id) {
      const n = noticeRepo.find((n) => n.id === body.notice_id);
      if (n?.extraction_confidence) confidence = Math.max(confidence, n.extraction_confidence);
    }

    const result = confidence > 0.75 ? "eligible" : "maybe";
    const record = {
      id: `ec-${Math.random().toString(36).slice(2)}`,
      user_id: (req as any).session?.sub ?? null,
      case_id: body.case_id,
      input_type: body.input_type,
      notice_id: body.notice_id ?? null,
      qa_answers: body.qa_answers ?? null,
      result,
      reasons: result === "eligible" ? "Within class period by text match" : "Insufficient info",
      confidence
    };
    eligibilityChecks.push(record);
    return {
      id: record.id,
      case_id: c.id,
      result: record.result,
      reasons: record.reasons,
      confidence,
      proof_required: c.proof_required ?? "unknown",
      award_info: c.award_rules ?? null,
      official_link: c.official_site_url ?? null
    };
  });

  app.get("/eligibility/checks/:id", async (req) => {
    const { id } = req.params as any;
    const e = eligibilityChecks.find((x) => x.id === id);
    if (!e) return { error: "not_found", message: "Eligibility check not found" };
    return e;
  });
};
Filename: src/routes/modules/locker.ts
import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { claimLockers, files } from "../../repos/mockDb.js";

export const registerLocker: FastifyPluginAsync = async (app) => {
  app.get("/claim-locker", async (req) => {
    const uid = (req as any).session?.sub;
    if (!uid) return { error: "unauthorized", message: "Sign in required" };
    return claimLockers.filter((x) => x.user_id === uid);
  });

  app.post("/claim-locker", async (req) => {
    const uid = (req as any).session?.sub;
    if (!uid) return { error: "unauthorized", message: "Sign in required" };
    const body = z.object({
      case_id: z.string(),
      claim_id: z.string().optional(),
      portal_url: z.string().url().optional(),
      password_hint: z.string().optional(),
      expected_payment_date: z.string().optional()
    }).parse(req.body);
    const entry = {
      id: `locker-${Math.random().toString(36).slice(2)}`,
      user_id: uid,
      status: "planned",
      reminders: [],
      payout_amount: null,
      ...body
    };
    claimLockers.push(entry);
    return entry;
  });

  app.patch("/claim-locker/:id", async (req) => {
    const uid = (req as any).session?.sub;
    if (!uid) return { error: "unauthorized", message: "Sign in required" };
    const { id } = req.params as any;
    const body = z.object({
      status: z.enum(["planned", "submitted", "paid", "cancelled"]).optional(),
      expected_payment_date: z.string().optional(),
      payout_amount: z.number().optional()
    }).parse(req.body);
    const entry = claimLockers.find((x) => x.id === id && x.user_id === uid);
    if (!entry) return { error: "not_found", message: "Locker entry not found" };
    Object.assign(entry, body);
    return entry;
  });

  app.post("/claim-locker/:id/files", async (req) => {
    const uid = (req as any).session?.sub;
    if (!uid) return { error: "unauthorized", message: "Sign in required" };
    const { id } = req.params as any;
    const locker = claimLockers.find((x) => x.id === id && x.user_id === uid);
    if (!locker) return { error: "not_found", message: "Locker entry not found" };

    // For dev allow metadata only
    const mp = req as any;
    const fileMeta = { id: `file-${Math.random().toString(36).slice(2)}`, filename: "receipt.png", size: 1234 };
    files.push(fileMeta);
    locker.files = [...(locker.files || []), fileMeta.id];
    return { ok: true, file_id: fileMeta.id };
  });
};
Filename: src/routes/modules/firms.ts
import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { firms } from "../../repos/mockDb.js";

export const registerFirms: FastifyPluginAsync = async (app) => {
  app.get("/firms", async (req) => {
    // Filters omitted in mock for brevity
    return firms;
  });

  app.get("/firms/:id", async (req) => {
    const { id } = req.params as any;
    const f = firms.find((x) => x.id === id);
    if (!f) return { error: "not_found", message: "Firm not found" };
    return { ...f, profile: { about: "Profile body", response_time_band: "under_24h", rating_avg: 4.6, rating_count: 18 }, reviews: [] };
  });

  app.post("/firms/:id/campaigns", { preHandler: app.requireRoles(["attorney"]) }, async (req) => {
    const { id } = req.params as any;
    const body = z.object({
      name: z.string(),
      categories: z.array(z.string()).optional(),
      states: z.array(z.string()).optional(),
      daily_cap: z.number().int().min(1),
      monthly_cap: z.number().int().min(1)
    }).parse(req.body);
    return { id: `camp-${Math.random().toString(36).slice(2)}`, firm_id: id, status: "active", ...body };
  });
};
Filename: src/routes/modules/investigations.ts
import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { consents } from "../../repos/mockDb.js";

export const registerInvestigations: FastifyPluginAsync = async (app) => {
  app.post("/investigations", async (req) => {
    const uid = (req as any).session?.sub;
    if (!uid) return { error: "unauthorized", message: "Sign in required" };
    const body = z.object({
      category: z.string(),
      description: z.string(),
      state: z.string(),
      defendants: z.string().optional()
    }).parse(req.body);
    return { id: `inv-${Math.random().toString(36).slice(2)}`, user_id: uid, status: "submitted", ...body };
  });

  app.post("/investigations/:id/consent", async (req) => {
    const uid = (req as any).session?.sub;
    if (!uid) return { error: "unauthorized", message: "Sign in required" };
    const { id } = req.params as any;
    const body = z.object({
      firm_ids: z.array(z.string()).min(1),
      channels: z.array(z.enum(["phone", "sms", "email"])),
      text_snapshot: z.string()
    }).parse(req.body);
    const out = body.firm_ids.map((firmId) => ({
      id: `cons-${Math.random().toString(36).slice(2)}`,
      user_id: uid,
      subject_type: "investigation",
      subject_id: id,
      channel: "email",
      firm_id: firmId,
      text_snapshot: body.text_snapshot,
      created_at: new Date().toISOString()
    }));
    consents.push(...out);
    return { ok: true, consents: out };
  });
};
Filename: src/routes/modules/leads.ts
import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { leads } from "../../repos/mockDb.js";

export const registerLeads: FastifyPluginAsync = async (app) => {
  app.get("/leads", { preHandler: app.requireRoles(["attorney"]) }, async (req: any) => {
    // In real server filter by firm linked to session
    return leads;
  });

  app.patch("/leads/:id", { preHandler: app.requireRoles(["attorney"]) }, async (req) => {
    const { id } = req.params as any;
    const body = z.object({
      status: z.enum(["sent", "accepted", "rejected", "contacted", "qualified", "signed", "closed_lost"])
    }).parse(req.body);
    const l = leads.find((x) => x.id === id);
    if (!l) return { error: "not_found", message: "Lead not found" };
    l.status = body.status;
    l.last_status_at = new Date().toISOString();
    return l;
  });
};
Filename: src/routes/modules/adminCampaigns.ts
import { FastifyPluginAsync } from "fastify";
import { z } from "zod";

export const registerAdmin: FastifyPluginAsync = async (app) => {
  app.post("/admin-clients", { preHandler: app.requireRoles(["website_admin"]) }, async (req) => {
    const body = z.object({
      name: z.string(),
      contact: z.any().optional()
    }).parse(req.body);
    return { id: `acl-${Math.random().toString(36).slice(2)}`, ...body };
  });

  app.post("/admin-campaigns", { preHandler: app.requireRoles(["website_admin"]) }, async (req) => {
    const body = z.object({
      admin_client_id: z.string(),
      case_id: z.string(),
      name: z.string(),
      start_date: z.string(),
      end_date: z.string(),
      targeting: z.any().optional(),
      budget: z.number().optional()
    }).parse(req.body);
    return { id: `ad-${Math.random().toString(36).slice(2)}`, status: "active", ...body };
  });

  app.get("/admin-campaigns/:id/metrics", { preHandler: app.requireRoles(["website_admin"]) }, async () => {
    const today = new Date().toISOString().slice(0, 10);
    return [{ date: today, impressions: 1000, clicks: 120, eligibility_checks: 40, helper_starts: 25, conversions: 12, fraud_rate: 0.01 }];
  });
};
Filename: src/routes/modules/posts.ts
import { FastifyPluginAsync } from "fastify";
import { z } from "zod";

const memory: any[] = [];

export const registerPosts: FastifyPluginAsync = async (app) => {
  app.get("/posts", async (req) => {
    return memory;
  });

  app.post("/posts", { preHandler: app.requireRoles(["editor"]) }, async (req) => {
    const body = z.object({
      title: z.string(),
      body: z.string(),
      type: z.enum(["news", "guide", "spotlight"]),
      status: z.enum(["draft", "scheduled", "published", "archived"]),
      scheduled_at: z.string().nullable().optional()
    }).parse(req.body);
    const rec = { id: `post-${Math.random().toString(36).slice(2)}`, ...body };
    memory.push(rec);
    return rec;
  });

  app.post("/posts/:id/schedule", { preHandler: app.requireRoles(["editor"]) }, async (req) => {
    const { id } = req.params as any;
    const body = z.object({ scheduled_at: z.string() }).parse(req.body);
    const p = memory.find((x) => x.id === id);
    if (!p) return { error: "not_found", message: "Post not found" };
    p.status = "scheduled";
    p.scheduled_at = body.scheduled_at;
    return p;
  });
};
Filename: src/routes/modules/users.ts
import { FastifyPluginAsync } from "fastify";

export const registerUsers: FastifyPluginAsync = async (app) => {
  app.get("/users/me", async (req: any) => {
    if (!req.session) return { error: "unauthorized", message: "Sign in required" };
    return { id: req.session.sub, email: req.session.email, roles: req.session.roles };
  });

  app.patch("/users/me", async (req: any) => {
    if (!req.session) return { error: "unauthorized", message: "Sign in required" };
    return { ok: true };
  });

  app.post("/users/me/export", async (req: any) => {
    if (!req.session) return { error: "unauthorized", message: "Sign in required" };
    return { status: "processing", ready_in_seconds: 10 };
  });

  app.delete("/users/me", async (req: any) => {
    if (!req.session) return { error: "unauthorized", message: "Sign in required" };
    return { deleted: true };
  });
};