# Openkick

A production-ready platform for class action settlement discovery and crowdfunding with end-to-end traceability.

## Architecture

Monorepo structure:
- `apps/web`: React 18 + Vite 5 frontend
- `apps/bff`: Fastify-based backend-for-frontend
- `packages/types`: Shared TypeScript types
- `packages/ui`: Shared UI components (Shadcn-based)
- `packages/config`: Shared configs (ESLint, TSConfig, Vitest, Playwright)
- `packages/eslint-plugin-openkick`: Custom ESLint rules for test IDs

## Setup

```bash
# Install dependencies
pnpm install

# Build acceptance criteria registry
pnpm build:ac

# Build traceability matrix
pnpm build:traceability

# Run web app
pnpm --filter @openkick/web dev

# Run BFF
pnpm --filter @openkick/bff dev
```

## Development

- Frontend: http://localhost:5173
- BFF API: http://localhost:3000
- Traceability page: http://localhost:5173/traceability
- Public contact and policy pages: http://localhost:5173/contact, /privacy, /terms

## Testing

```bash
# Unit tests
pnpm test:unit

# E2E tests
pnpm test:e2e

# Check traceability coverage
pnpm check:traceability
```

## User Stories

- US-001 through US-089: Base platform features
- US-090 through US-107: Crowdfunding features

See `docs/user_stories_with_acceptance_criteria.md` and `docs/user_stories_with_acceptance_criteria_append_crowdfunding.md` for details.
