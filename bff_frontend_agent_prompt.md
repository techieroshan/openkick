Title: AI Agent Prompt for Openkick BFF and Front End Delivery with End to End Traceability

Objective
Build a production ready front end and BFF for Openkick that satisfies all user stories and acceptance criteria with full end to end traceability. Use Shadcn UI presets and the attached source markdown as the single source of truth.

Inputs to load
1. class_action_targets.md
2. sitemap.md
3. menu_structure.md
4. branding_identity_guidelines.md
5. user_stories_with_acceptance_criteria.md
6. database_schema.md
7. api_specs.md
8. information_architecture_notes.md

Stack and principles
1. App framework React 18 with Vite 5
2. Routing React Router 6.28 or newer
3. Language TypeScript strict mode
4. UI Shadcn UI with Radix primitives and Tailwind CSS using the Vite preset
5. State TanStack Query for server state and lightweight local state with Zustand or Context where needed
6. Forms React Hook Form with Zod validation
7. Accessibility WCAG AA or better
8. i18n react intl or lingui as needed
9. Testing Playwright end to end and Vitest plus React Testing Library for unit and integration
10. Analytics event bus with a single client util and test double for tests
11. Feature flags read from BFF endpoint based on feature_flags schema
12. Security follow OWASP guidance. No secrets in client code. Enforce roles and permissions at BFF and UI route guards

Traceability plan
1. Assign a stable ID to every user story and acceptance criteria
   - User story ID format US colon three digits where number is the sequence in user_stories_with_acceptance_criteria.md
   - Acceptance criteria ID format AC colon user story number colon sequence such as AC colon 006 colon 2
2. Each UI route, page, component, and API call must list the IDs it implements in a top of file comment and in the component JSDoc
3. Each interactive element must contain a data-testid that embeds the trace IDs
   - Format ok colon area colon component colon purpose colon US dash number optional AC dash number per the testid file
   - Example data-testid equals ok colon eligibility colon checker colon submit colon US dash 006 colon AC dash 006 dash 3
4. Provide a rendered Traceability Matrix page in the app at route slash traceability that maps
   - User stories and acceptance criteria to pages, components, and tests
5. Provide a machine readable JSON at slash api slash traceability from the BFF that exports the same mapping and can be validated in CI

Test ID policy
1. Every component that renders HTML must expose a root data-testid and per control data-testid
2. Use lowercase and colons only for separators
3. Include US and AC IDs when a control directly satisfies an acceptance criterion
4. Shared primitives use ok colon ui colon component name colon part

Information architecture
1. Implement the full menu and routing from menu_structure.md and sitemap.md using React Router
2. Use information_architecture_notes.md for category mapping and search facets
3. Use branding_identity_guidelines.md for visual choices. Implement color tokens in Tailwind theme. Respect accessibility contrast

Data and BFF
1. Implement a separate BFF service apps slash bff using Fastify 4 or Hono running on Node 20 that follows api_specs.md exactly
2. In development use Vite proxy to route slash v1 and slash api to the BFF
3. All calls from the front end must go through the BFF and never call third party services directly
4. Implement types for all payloads in a shared package folder such as packages slash types that align with database_schema.md and api_specs.md

Authentication and roles
1. Build sign in and sign up and email verify flows
2. Implement sessions at BFF with cookie based JWT and role gates for editor, website admin, compliance officer, support agent, attorney, settlement administrator, website owner
3. Use React Router loader and action guards plus a role aware RequireAuth component to protect routes

Forms and validation
1. All forms use React Hook Form with Zod
2. Server validates again in BFF
3. Show field level and form level errors to satisfy acceptance criteria

Pages to deliver
1. Home from sitemap.md
2. Lawsuits and Settlements index and detail pages with open, pending, closed filters and calendar view
3. Eligibility Checker with paste, upload, QA flow and results
4. Claim Helper and claim locker with file upload and reminders
5. Start an Investigation flow with privacy choices and named firm consent
6. Find a Lawyer directory and profiles and contact request
7. News and Alerts list and detail and subscription management
8. For Law Firms area with campaign setup and webhook config and performance reports
9. For Administrators area with campaign management and metrics dashboards
10. Resources learn center
11. Admin suite for roles, menus, locales, translations, SEO defaults, cookie consent, feature flags, experiments, audit logs, system status
12. Compliance suite for content approvals, consent templates and logs, data retention, jurisdiction banners
13. Support suite for safe mode and macros and escalation
14. Traceability matrix page and API
15. Billing pages for invoices and budgets
16. Account pages for profile, consents, sessions, two factor and data export and deletion

Component delivery rules
1. Use Shadcn generator with Vite preset and keep components under src slash components and feature folders under src slash features
2. Each feature folder must include
   - index page and detail pages
   - hooks and queries
   - components subfolder
   - types file if feature specific
   - tests folder for unit and integration
   - stories folder for Storybook stories with args and interactions
3. Every component must include
   - JSDoc block with purpose and trace IDs
   - Props interface with strong types
   - data-testid on root and important child elements
4. All pages must include meta tags from SEO defaults and OG tags via react helmet async

Testing strategy
1. Unit tests for helpers and components with Vitest
2. Integration tests with React Testing Library
3. End to end tests with Playwright that cover every acceptance criterion as a scenario
4. ESLint rules enforce data-testid presence on interactive elements
5. Add a utility to assert acceptance criteria coverage by reading the trace JSON and test metadata
6. Lighthouse CI run on Vite preview in CI must reach performance 85 or above accessibility 95 or above best practices 90 or above SEO 90 or above

Analytics and events
1. Define an analytics spec per event with name, payload fields, and privacy notes
2. Emit events for searches, filters, eligibility check steps, claim helper usage, submissions, consent creation, routing, and billing
3. Add test IDs and event assertions in tests so that analytics helps with traceability

Feature flags and experiments
1. Read feature flags from BFF endpoint and cache per session
2. Implement guard components to show or hide features
3. Experiments must name variants and include metrics and test coverage

Accessibility
1. Use Radix primitives properly
2. Provide labels, aria attributes, roles, focus order, and keyboard support
3. Add a11y tests with axe in Vitest and Playwright

Security and privacy
1. Mask sensitive data in UI unless user opts to reveal or role is allowed
2. Respect cookie consent for analytics and marketing tags
3. Do not include PII in analytics or logs

Naming and IDs
1. Route paths align with sitemap and use lower case segments
2. Component and file names in PascalCase
3. Test IDs follow the policy above

Acceptance criteria sign off
1. Parse user_stories_with_acceptance_criteria.md and assign IDs automatically
   - US dash 001 through US dash 089
   - Acceptance criteria under each user story numbered in sequence
2. For each acceptance criterion create at least one Playwright test that navigates through the exact UI and asserts the behavior
3. When behavior requires backend state update mock BFF responses deterministically in tests
4. Generate a coverage report that lists which acceptance criteria have at least one passing test with links to the test files

Deliverables
1. Monorepo layout
   - apps slash web React plus Vite app
   - apps slash bff Fastify or Hono server
   - packages slash ui Shadcn components
   - packages slash types shared types
   - packages slash config eslint tsconfig tailwind
2. Documentation
   - README with setup and run steps
   - ARCHITECTURE with module map
   - TRACEABILITY with how the system builds the matrix
   - TESTING with how to run and how to add new tests and test IDs
3. Generated artifacts
   - Traceability Matrix page and JSON API
   - Storybook with all components and stories
   - Lighthouse reports for key pages
4. CI configuration
   - Install and build
   - Type check and lint
   - Unit and integration and e2e tests
   - Traceability check that fails CI if acceptance criteria are not covered
5. Seed data and mocks
   - Minimal dataset that exercises all primary pages and flows
   - Mocked notices and sample extracted text
   - Sample firms, campaigns, consents, and invoices

Execution steps
1. Load all input markdown files and build the internal data model
2. Generate a US and AC registry JSON
3. Scaffold routes and pages per sitemap
4. Build core primitives and layout
5. Implement page by page with components and data layer
6. Add test IDs as specified
7. Wire BFF endpoints and mocks
8. Add validation and error handling
9. Implement analytics stubs and events
10. Write tests for each acceptance criterion
11. Generate Traceability Matrix and JSON
12. Run Lighthouse and fix issues
13. Produce deliverables and CI

Quality gates
1. TypeScript no any except third party types
2. ESLint and Prettier pass
3. Unit test coverage above seventy percent lines and functions
4. All acceptance criteria tests pass
5. Accessibility checks pass on key pages
6. No PII in logs or analytics

Sign off checklist
1. Menu items match menu_structure.md
2. Routes match sitemap.md
3. Visuals match branding_identity_guidelines.md
4. Data and API calls match api_specs.md
5. Domain objects align with database_schema.md
6. Content structure aligns with information_architecture_notes.md
7. All user stories in user_stories_with_acceptance_criteria.md are linked to pages and tests in the Traceability Matrix
8. Demo script prepared that walks through each major flow

Please start now. Ask for clarification only if a requirement is missing from the input markdown files. Otherwise proceed to produce the codebase and artifacts as defined above.