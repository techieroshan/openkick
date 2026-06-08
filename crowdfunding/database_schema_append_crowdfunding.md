Filename: database_schema_append_crowdfunding.md
Title: Database Schema Addendum — Crowdfunding

Offerings and terms
* offerings
  * id uuid pk
  * case_id uuid fk cases null
  * issuer_id uuid fk firms or users depending on model
  * title varchar
  * slug varchar unique
  * category_id uuid fk categories
  * type enum reg_d reg_cf preview
  * instrument enum rev_share preferred_equity debt other
  * min_investment numeric
  * target_raise numeric
  * max_raise numeric
  * open_date date
  * close_date date
  * status enum draft under_review open funded closed cancelled
  * risk_disclosures text
  * summary text
  * media_hero_url varchar null
  * created_at updated_at

* offering_documents
  * id uuid pk
  * offering_id uuid fk offerings
  * doc_type enum ppm subscription_agreement risk_factors financials other
  * file_id uuid fk files
  * version int
  * created_at

* offering_updates
  * id uuid pk
  * offering_id uuid fk offerings
  * title varchar
  * body markdown
  * status enum draft pending_approval published
  * created_by uuid fk users
  * created_at published_at

Investor onboarding and compliance
* investors
  * id uuid pk
  * user_id uuid fk users unique
  * profile jsonb name and address and dob and tax_id encrypted
  * kyc_status enum not_started pending approved rejected
  * accreditation_status enum not_required pending approved rejected
  * accreditation_expires_at timestamp null
  * created_at updated_at

* kyc_records
  * id uuid pk
  * investor_id uuid fk investors
  * provider varchar
  * status enum pending approved rejected
  * payload jsonb
  * created_at updated_at

* accreditation_records
  * id uuid pk
  * investor_id uuid fk investors
  * method enum income net_worth third_party_letter
  * status enum pending approved rejected
  * expires_at timestamp null
  * documents jsonb
  * created_at updated_at

Investments and escrow
* investments
  * id uuid pk
  * offering_id uuid fk offerings
  * investor_id uuid fk investors
  * amount numeric
  * fees numeric default 0
  * status enum initiated pending_settlement settled failed cancelled refunded
  * escrow_tx_id uuid fk escrow_transactions null
  * created_at settled_at

* escrow_transactions
  * id uuid pk
  * processor varchar
  * type enum ach card wire
  * status enum pending settled failed refunded
  * reference varchar
  * amount numeric
  * currency char(3)
  * raw_event jsonb
  * signature varchar null
  * created_at updated_at

Distributions and statements
* distributions
  * id uuid pk
  * offering_id uuid fk offerings
  * gross_amount numeric
  * fees_amount numeric
  * net_amount numeric
  * paid_at timestamp
  * notes text null
  * created_at

* distribution_allocations
  * id uuid pk
  * distribution_id uuid fk distributions
  * investment_id uuid fk investments
  * amount numeric
  * created_at

* statements
  * id uuid pk
  * investor_id uuid fk investors
  * offering_id uuid fk offerings
  * type enum confirmation statement tax
  * period varchar null
  * file_id uuid fk files
  * created_at

Issuer and media
* offering_media
  * id uuid pk
  * offering_id uuid fk offerings
  * type enum image video
  * file_id uuid fk files
  * caption varchar null
  * created_at

* issuer_tasks
  * id uuid pk
  * offering_id uuid fk offerings
  * task varchar
  * status enum open done
  * due_date date null
  * created_at

Subscriptions and alerts
* offering_subscriptions
  * id uuid pk
  * investor_id uuid fk investors
  * offering_id uuid fk offerings
  * created_at

Compliance and approvals
* content_approvals
  * id uuid pk
  * entity_type varchar
  * entity_id uuid
  * status enum pending approved changes_requested
  * reviewer_user_id uuid fk users
  * comments text null
  * created_at updated_at

* risk_disclosures
  * id uuid pk
  * offering_id uuid fk offerings
  * content text
  * version int
  * created_at

* funding_compliance_logs
  * id uuid pk
  * actor_user_id uuid fk users
  * action varchar
  * entity_type varchar
  * entity_id uuid
  * details jsonb
  * created_at