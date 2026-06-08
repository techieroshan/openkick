# Architecture

## Overview

Openkick is a monorepo built with:
- **Frontend**: React 18 + Vite 5, TypeScript strict, Shadcn UI, Tailwind CSS
- **BFF**: Fastify-based backend-for-frontend in TypeScript
- **Shared Packages**: Types, UI components, configs, ESLint plugin

## Monorepo Structure

```
openkick/
├── apps/
│   ├── web/          # React frontend SPA
│   └── bff/          # Fastify BFF server
├── packages/
│   ├── types/        # Shared TypeScript types
│   ├── ui/           # Shared UI components (Shadcn-based)
│   ├── config/       # Shared configs (TSConfig, Vitest, Playwright)
│   └── eslint-plugin-openkick/  # Custom ESLint rules
├── scripts/          # Build and utility scripts
├── docs/             # Documentation and user stories
└── artifacts/        # Generated files (traceability, AC registry)
```

## Data Flow

1. **Frontend** (`apps/web`) makes API calls to `/api/v1/*`
2. **BFF** (`apps/bff`) proxies/transforms requests and serves mock data from in-memory repositories
3. **Shared Types** (`packages/types`) ensure type safety across frontend and BFF

## Traceability System

- User stories (US-001..US-107) and acceptance criteria are parsed from markdown
- Components, routes, and tests are annotated with `@trace` comments
- Build scripts generate traceability matrix linking US/AC to implementation
- `/traceability` page displays coverage

## Testing Strategy

- **Unit/Integration**: Vitest + React Testing Library
- **E2E**: Playwright
- **Traceability**: CI checks that all AC have at least one passing test

## Key Features

### Base Platform (US-001..US-089)
- Settlement discovery and browsing
- Eligibility checking
- Claim locker
- Investigation intake
- Find a lawyer directory
- News and alerts
- Admin/editor/compliance workflows

### Crowdfunding (US-090..US-107)
- Investment offerings discovery
- Investor onboarding (KYC, accreditation)
- Investment flow with escrow
- Issuer campaign management
- Compliance approvals
- Distributions
