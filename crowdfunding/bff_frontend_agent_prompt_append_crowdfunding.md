Filename: bff_frontend_agent_prompt_append_crowdfunding.md
Title: BFF and Front End Prompt Addendum — Crowdfunding Requirements

Additional pages and routes to implement
1. /invest
   - Offerings index list with filters and search
2. /invest/offerings/:id
   - Offering detail with terms and docs and risk banner and updates
3. /invest/start
   - Issuer start a funding campaign flow
4. /dashboard/investor
   - Portfolio and KYC and accreditation and statements
5. /dashboard/issuer
   - Campaign management and updates and investor list and distributions
6. /compliance
   - Approvals queue for funding compliance officer
7. /docs/compliance
   - Static pages for disclosures and policies

UI and test ids
* Add data test ids with area invest or investor or issuer or compliance
* Example ok colon invest colon offerings colon filter apply colon US dash 093 colon AC dash 093 dash 1

Data and BFF
* Add endpoints from api_specs_append_crowdfunding.md
* Use mock repositories for offerings and investors and investments and escrow and distributions
* Add webhook signature verification utility and route test

Acceptance criteria coverage
* Create Playwright scenarios for each crowdfunding user story and acceptance criterion
* Extend traceability matrix to include these rows in the JSON and page mappings