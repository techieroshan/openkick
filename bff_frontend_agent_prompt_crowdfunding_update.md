Filename: bff_frontend_agent_prompt_crowdfunding_update.md
Title: AI Agent Prompt — Openkick Front End and BFF Crowdfunding Update with End to End Traceability

Objective
Update the production ready React plus Vite front end and BFF to add crowdfunding of class actions while preserving end to end traceability and keeping all prior functionality. Use Shadcn UI presets. Treat all attached markdown files as the single source of truth.

Base prompt reference
This task extends the original AI Agent Prompt for Openkick BFF and Front End Delivery with End to End Traceability. Do not remove or regress any prior routes or flows. Only add what is specified here and wire new features into the existing app.

New inputs to load in addition to the originals
1) sitemap_append_crowdfunding.md
2) menu_structure_append_crowdfunding.md
3) information_architecture_notes_append_crowdfunding.md
4) user_stories_with_acceptance_criteria_append_crowdfunding.md
5) database_schema_append_crowdfunding.md
6) api_specs_append_crowdfunding.md
7) branding_identity_guidelines_append_crowdfunding.md
8) bff_frontend_agent_prompt_append_crowdfunding.md

Stack and principles
Follow the same stack and rules from the original prompt
- React 18 with Vite 5
- React Router
- TypeScript strict
- Shadcn UI with Radix and Tailwind
- TanStack Query
- React Hook Form plus Zod
- Vitest, React Testing Library, Playwright
- Feature flags and analytics
- Accessibility WCAG AA or better

High level scope for this update
1) Add the Invest surfaces and flows defined in the append files
2) Extend the BFF to serve new endpoints from api_specs_append_crowdfunding.md
3) Add data models that map to database_schema_append_crowdfunding.md in the BFF mock repositories
4) Extend traceability to cover new user stories US 090 through US 107 with their acceptance criteria
5) Ensure all new components contain data test ids that include US and AC tags
6) Add disclosure and compliance patterns from branding_identity_guidelines_append_crowdfunding.md to the Invest UI

Front end routes and pages to implement
- /invest Offerings index with filters and search
- /invest/offerings/:id Offering detail with terms, docs, media, law firm profile, updates, risk banner, invest call to action
- /invest/start Issuer start a funding campaign wizard
- /dashboard/investor Investor dashboard with portfolio, KYC, accreditation, distributions and statements
- /dashboard/issuer Issuer dashboard with campaign status, updates, investor list, distributions
- /compliance Funding compliance queue for approvals of offerings and updates
- /docs/compliance Static pages for regulatory overview, risk factors, platform agreement, conflicts policy

Navigation updates
- Primary nav add Invest with Offerings and Start a Funding Campaign
- Secondary nav add Investor Dashboard and Issuer Dashboard
- Footer add Compliance and Disclosures and Payments and Escrow

UI and disclosure requirements
- Add a persistent risk banner component on offering pages
- Add a pre investment risk acknowledgment modal in the invest flow
- Use badges for offering type Reg D or Reg CF or preview
- Show invest button disabled until KYC and accreditation gates are satisfied when required
- Only show escrow options that are enabled in configuration

Data and BFF updates
- Implement endpoints from api_specs_append_crowdfunding.md under slash v1
  - Offerings list, get, create, patch, publish
  - Offering documents and media upload
  - Offering updates create and approve
  - Investor profile, KYC, accreditation
  - Invest and escrow webhooks
  - Distributions and statements
  - Subscriptions and compliance approvals
- Seed mock repositories for offerings, investors, investments, escrow transactions, distributions as per database_schema_append_crowdfunding.md
- Implement webhook signature verification utility and a simple handler that updates mock escrow and investment state
- Expose the new routes in OpenAPI with schemas for request and response and mount at slash docs slash redoc and slash openapi dot json

Traceability plan extension
- Extend the acceptance criteria registry generator to ingest user_stories_with_acceptance_criteria_append_crowdfunding.md
- Assign IDs US dash 090 through US dash 107 and AC per story
- Update the traceability matrix page and JSON API to include the new rows and their page and component mappings
- Ensure every new interactive element uses data test id format
  - ok colon invest or investor or issuer or compliance areas
  - Example ok colon invest colon offerings colon filter apply colon US dash 093 colon AC dash 093 dash 1

Testing
- Add Playwright end to end tests for each new acceptance criterion across investor onboarding, offering discovery, invest flow, issuer onboarding, compliance approvals, distributions
- Expand Vitest unit and integration tests for new components, forms, and helpers
- Add axe checks on Invest and Offering pages
- Extend the traceability coverage check to include the new acceptance criteria
- Keep Lighthouse CI thresholds from the original prompt

Accessibility and content
- Use aria live regions for funding progress and KYC status updates
- Provide alternative text for media and disclosures for downloadable documents
- Render risk and compliance information using semantic components with clear headings

Security and privacy
- Avoid exposing PII in client logs or analytics
- Store KYC and accreditation fields in mock repos as encrypted fields when possible or mask in UI
- Respect cookie consent for any tracking within Invest pages

Deliverables
- Updated routes, pages, and components under src slash features slash invest and related dashboards
- Extended BFF routes and mock repositories for offerings, investors, investments, escrow transactions, distributions
- OpenAPI schemas for all new endpoints
- Updated traceability matrix and JSON
- New seed data and mock flows for demo including one open offering, one funded offering, and one closed offering with a distribution
- Playwright, Vitest tests and updated CI running all checks successfully

Execution steps
1) Load all existing input markdown files and the append files listed above
2) Update the US and AC registry by re running the generator so it captures US 090 through US 107
3) Scaffold Invest and dashboard routes in React Router and link from nav and footers as defined in menu_structure_append_crowdfunding.md
4) Build Invest feature components using Shadcn presets with data test ids per policy
5) Add BFF endpoints and mock repos as per api_specs_append_crowdfunding.md and database_schema_append_crowdfunding.md
6) Wire TanStack Query hooks for new data flows
7) Implement disclosure and compliance controls per branding_identity_guidelines_append_crowdfunding.md
8) Add tests for each new acceptance criterion and ensure traceability mapping is updated
9) Update OpenAPI for all new endpoints and expose Swagger UI and Redoc
10) Run Lighthouse against /invest and /invest/offerings/:id and fix issues until thresholds pass
11) Produce updated artifacts and documentation

Quality gates
- Same as original prompt plus
  - All new Invest acceptance criteria show pass in traceability matrix
  - Offering pages render risk banner and require risk acknowledgment before investment
  - KYC and accreditation gates correctly disable invest controls until satisfied

Sign off checklist
- Menu items match appended menu structure
- Invest routes match appended sitemap
- Visuals adhere to branding and disclosure rules
- BFF endpoints match appended API specs
- Domain objects persist as per appended database schema
- All new user stories and acceptance criteria appear in the traceability matrix and have passing tests
- Demo script updated to include a full investor journey