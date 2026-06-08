Overview
* Base URL
  * Production https colon slash slash api dot openkick dot com
  * Version v1
* Auth
  * OAuth 2 or JWT for first party clients
  * API keys for partners with scopes
  * HMAC signature for webhooks
* Formats
  * JSON for request and response
  * Pagination with page and per_page
  * Timestamps in ISO 8601

Auth
* POST /v1/auth/login
  * Body email, password
  * Response access_token, refresh_token, user

* POST /v1/auth/refresh
  * Body refresh_token
  * Response access_token

Users and roles
* GET /v1/users/me
  * Returns profile, roles, consents summary

* PATCH /v1/users/me
  * Update name, locale, phone

* POST /v1/users/me/export
  * Triggers data export

* DELETE /v1/users/me
  * Request account deletion

* GET /v1/roles
  * Admin only. List roles

* POST /v1/users/{id}/roles
  * Admin only. Assign roles

* DELETE /v1/users/{id}/roles/{role_id}
  * Admin only. Remove role

Consent
* GET /v1/consents
  * Query by user, firm, channel

* POST /v1/consents
  * Create consent
  * Body user_id optional for logged in, subject_type, subject_id, channel, firm_id optional, text_snapshot

* DELETE /v1/consents/{id}
  * Withdraw consent. Keep record marked withdrawn

Categories and taxonomy
* GET /v1/categories
* POST /v1/categories
  * Admin only

Companies
* GET /v1/companies
  * Query by name

Cases and settlements
* GET /v1/cases
  * Query params status, category_id, company_id, state, deadline_from, deadline_to, proof_required, q

* GET /v1/cases/{id}
  * Returns case, class_definitions, notices, deadlines, links

* POST /v1/cases
  * Editor only. Create case
  * Body title, defendants, category_id, status, official_site_url, deadlines, proof_required, award_rules

* PATCH /v1/cases/{id}
  * Editor or admin

* POST /v1/cases/{id}/publish
  * Editor or admin

* GET /v1/cases/{id}/calendar
  * Returns calendar items

Class definitions and notices
* POST /v1/cases/{id}/class-definitions
* POST /v1/cases/{id}/notices
  * Body source, url or file upload
  * System will run extraction async
* GET /v1/notices/{id}
  * Returns extraction status and text

Eligibility checker
* POST /v1/eligibility/check
  * Body case_id, input_type, pasted_text or notice_id or qa_answers
  * Response result, reasons, confidence, proof_required, award_info, official_link

* GET /v1/eligibility/checks/{id}
  * Get prior check

Claim helper and locker
* GET /v1/claim-locker
  * Auth required. List entries

* POST /v1/claim-locker
  * Body case_id, claim_id, portal_url, password_hint, expected_payment_date

* PATCH /v1/claim-locker/{id}
* DELETE /v1/claim-locker/{id}

* POST /v1/claim-locker/{id}/files
  * Multipart upload

News and posts
* GET /v1/posts
  * Query params type, category_id, company_id, status

* GET /v1/posts/{id}

* POST /v1/posts
  * Editor only. Create post

* PATCH /v1/posts/{id}
  * Editor only

* POST /v1/posts/{id}/schedule
  * Editor only

Search
* GET /v1/search
  * q, types array cases posts companies

Directory and firms
* GET /v1/firms
  * Query by category_id, state, verified

* GET /v1/firms/{id}
  * Profile details and reviews

* POST /v1/firms
  * Admin only

* POST /v1/firms/{id}/campaigns
  * Firm only. Create or edit intake campaigns

Reviews
* GET /v1/firms/{id}/reviews
* POST /v1/firms/{id}/reviews
  * Auth required. Body rating, title, body

* POST /v1/firms/{id}/reviews/{review_id}/moderate
  * Admin or moderator. Approve or reject

Leads and routing
* POST /v1/investigations
  * Auth required. Body category, description, state, defendants, files

* GET /v1/investigations/{id}
  * Owner view

* POST /v1/investigations/{id}/consent
  * Create one to one consent for selected firms

* POST /v1/leads
  * System only. Create lead to a firm

* GET /v1/leads
  * Firm only. List leads with status

* PATCH /v1/leads/{id}
  * Firm only. Update status

Webhooks
* POST /v1/webhooks
  * Create webhook for events such as lead.created lead.updated consent.created eligibility.completed

* GET /v1/webhooks
* GET /v1/webhook-deliveries
  * Filter by event and status
* POST /v1/webhook-deliveries/{id}/replay

Settlement administrator
* POST /v1/admin-clients
  * Create admin client

* POST /v1/admin-campaigns
  * Create promotion for a case

* GET /v1/admin-campaigns/{id}/metrics
  * Time series with impressions, clicks, conversions, fraud_rate

Fraud and risk
* GET /v1/risk/events
  * Risk team only

* POST /v1/blocks
  * Create a block

* GET /v1/blocks
  * List blocks

Billing
* GET /v1/firm-invoices
  * Firm only

* GET /v1/firm-invoices/{id}
  * Download invoice and items

* POST /v1/budgets
  * Firm only. Set budgets

Subscriptions and alerts
* POST /v1/subscriptions
  * Create newsletter subscription

* POST /v1/alerts
  * Create case or company or category alert

* DELETE /v1/subscriptions/{id}
* DELETE /v1/alerts/{id}

Menus and SEO
* GET /v1/menus/{name}?locale=en
* POST /v1/menus
  * Admin only

* GET /v1/seo-defaults
* POST /v1/seo-defaults
  * Admin only

Feature flags and experiments
* GET /v1/feature-flags
* POST /v1/feature-flags
  * Admin only

* GET /v1/experiments
* POST /v1/experiments
  * Admin only

System and incidents
* GET /v1/system/status
  * Returns uptime, latency, error rates

* GET /v1/incidents
  * Admin only

* POST /v1/incidents
  * Admin only

Localization and CMP
* GET /v1/locales
* GET /v1/translations?locale=en
* POST /v1/translations
  * Admin only

* POST /v1/cookie-consents
  * Store user choices

Security and sessions
* GET /v1/sessions
  * List active sessions

* DELETE /v1/sessions/{id}
  * Revoke session

Search and indexing webhooks
* Events
  * case.published, case.updated
  * post.published, post.updated
  * firm.updated
  * These fire to search index workers

Webhook event schemas
* lead.created
  * id, user, investigation summary, case optional, consent record, created_at

* consent.created
  * id, user_id, firm_id optional, subject_type, channel, text_snapshot, created_at

* eligibility.completed
  * id, case_id, user_id optional, result, confidence, created_at

Errors
* Standard error schema
  * error code
  * message
  * details map