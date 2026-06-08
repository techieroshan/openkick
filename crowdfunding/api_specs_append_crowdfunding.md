Filename: api_specs_append_crowdfunding.md
Title: API Specifications Addendum — Crowdfunding

Offerings
* GET /v1/offerings
  * Query status and category_id and min_investment and q and page and per_page
  * Response data with pagination

* GET /v1/offerings/{id}
  * Returns offering with documents and media and updates summary

* POST /v1/offerings
  * Roles issuer or website_admin
  * Body title and case_id optional and category_id and type and instrument and min_investment and target_raise and max_raise and open_date and close_date and summary and risk_disclosures
  * Response offering

* PATCH /v1/offerings/{id}
  * Roles issuer or website_admin
  * Update selected fields while under review or draft

* POST /v1/offerings/{id}/publish
  * Roles funding_compliance_officer or website_admin
  * Approves and sets status open

Offering documents and media
* POST /v1/offerings/{id}/documents
  * Multipart upload with doc_type and file
  * Returns document record

* GET /v1/offerings/{id}/documents
* POST /v1/offerings/{id}/media
  * Multipart upload image or video

Offering updates
* GET /v1/offerings/{id}/updates
* POST /v1/offerings/{id}/updates
  * Roles issuer
  * Body title and body and status draft or pending_approval
* POST /v1/offerings/{id}/updates/{update_id}/approve
  * Roles funding_compliance_officer

Investor onboarding
* GET /v1/investors/me
* POST /v1/investors
  * Creates or updates investor profile
* POST /v1/investors/me/kyc
  * Body fields and or provider handoff
* POST /v1/investors/me/accreditation
  * Body method and documents metadata

Investments and escrow
* POST /v1/offerings/{id}/invest
  * Body amount and payment_method and risk_ack boolean
  * Response investment and escrow instructions

* GET /v1/investments
  * Investor only list my investments

* GET /v1/investments/{id}
* POST /v1/webhooks/payments
  * Verify signature and record event and update escrow_transactions and investments

Distributions
* POST /v1/offerings/{id}/distributions
  * Roles issuer
  * Body gross_amount and fees_amount and paid_at and file optional
  * Response distribution and allocations summary

* GET /v1/offerings/{id}/distributions
* GET /v1/investors/me/statements

Subscriptions
* POST /v1/offerings/{id}/subscribe
* DELETE /v1/offerings/{id}/subscribe

Compliance
* GET /v1/compliance/approvals
  * Roles funding_compliance_officer
* POST /v1/compliance/approvals
  * Body entity_type and entity_id and action approve or request_changes and comments