Conventions
* UUID as primary keys unless noted
* Timestamps created_at and updated_at on all tables
* Soft delete with deleted_at where needed
* All PII fields encrypted at rest

Core identity
* users
  * id uuid pk
  * email varchar unique
  * email_verified_at timestamp null
  * password_hash varchar null
  * first_name varchar null
  * last_name varchar null
  * phone varchar null
  * locale varchar default en
  * two_factor_enabled boolean default false
  * two_factor_secret varchar null
  * role_default uuid null references roles id
  * status enum active suspended deleted
  * created_at updated_at

* roles
  * id uuid pk
  * name varchar unique
  * description text
  * created_at updated_at

* permissions
  * id uuid pk
  * code varchar unique
  * description text

* role_permissions
  * role_id uuid fk roles
  * permission_id uuid fk permissions
  * primary key role_id permission_id

* user_roles
  * user_id uuid fk users
  * role_id uuid fk roles
  * primary key user_id role_id

SSO and auth
* sso_providers
  * id uuid pk
  * name varchar
  * type enum saml oidc
  * config jsonb
  * enforced_for_roles boolean default false

* user_sso_identities
  * id uuid pk
  * user_id uuid fk users
  * provider_id uuid fk sso_providers
  * subject_id varchar
  * created_at

Audit and logs
* audit_logs
  * id uuid pk
  * actor_user_id uuid fk users null
  * action varchar
  * entity_type varchar
  * entity_id uuid
  * metadata jsonb
  * ip inet null
  * user_agent varchar null
  * created_at

Content and taxonomy
* categories
  * id uuid pk
  * slug varchar unique
  * name varchar
  * description text
  * parent_id uuid null fk categories

* companies
  * id uuid pk
  * name varchar unique
  * website varchar null
  * ticker varchar null

* posts
  * id uuid pk
  * slug varchar unique
  * title varchar
  * body markdown
  * type enum news guide spotlight
  * status enum draft scheduled published archived
  * scheduled_at timestamp null
  * published_at timestamp null
  * author_id uuid fk users
  * seo_title varchar null
  * seo_description varchar null
  * og_image_url varchar null

* post_categories
  * post_id uuid fk posts
  * category_id uuid fk categories
  * primary key post_id category_id

* post_companies
  * post_id uuid fk posts
  * company_id uuid fk companies
  * primary key post_id company_id

Cases and settlements
* cases
  * id uuid pk
  * slug varchar unique
  * title varchar
  * defendants text
  * companies jsonb array of company ids and names
  * jurisdiction varchar
  * court varchar null
  * docket_number varchar null
  * status enum open pending closed paid
  * category_id uuid fk categories
  * official_site_url varchar null
  * administrator_name varchar null
  * administrator_contact jsonb null
  * opt_out_deadline date null
  * claim_deadline date null
  * proof_required enum yes no unknown
  * award_rules text null
  * notes text null
  * seo_title varchar null
  * seo_description varchar null
  * published_at timestamp null
  * created_by uuid fk users

* class_definitions
  * id uuid pk
  * case_id uuid fk cases
  * description text
  * period_start date null
  * period_end date null
  * geography text null
  * exclusions text null

* notices
  * id uuid pk
  * case_id uuid fk cases
  * source enum pdf url text
  * url varchar null
  * file_id uuid null fk files
  * extracted_text text null
  * extraction_confidence numeric null
  * uploaded_by uuid fk users null
  * created_at

* case_tags
  * case_id uuid fk cases
  * tag varchar
  * primary key case_id tag

Eligibility checks and claim helper
* eligibility_checks
  * id uuid pk
  * user_id uuid fk users null
  * case_id uuid fk cases
  * input_type enum pasted_text pdf notice_link qa
  * notice_id uuid null fk notices
  * qa_answers jsonb null
  * result enum eligible maybe not_eligible
  * reasons text null
  * confidence numeric null
  * created_at

* claim_lockers
  * id uuid pk
  * user_id uuid fk users
  * case_id uuid fk cases
  * claim_id varchar null
  * portal_url varchar null
  * password_hint varchar null
  * expected_payment_date date null
  * payout_amount numeric null
  * status enum planned submitted paid cancelled
  * reminders jsonb
  * created_at updated_at

* claim_files
  * id uuid pk
  * locker_id uuid fk claim_lockers
  * file_id uuid fk files
  * label varchar null
  * created_at

Files and storage
* files
  * id uuid pk
  * user_id uuid fk users null
  * filename varchar
  * content_type varchar
  * size int
  * storage_url varchar
  * sha256 char(64)
  * malware_scan_status enum clean flagged pending
  * created_at

Investigation intake and routing
* investigations
  * id uuid pk
  * user_id uuid fk users
  * issue_category_id uuid fk categories
  * title varchar
  * description text
  * state varchar
  * time_period text null
  * defendants text null
  * status enum submitted under_review routed closed withdrawn
  * privacy_mode enum anonymous masked open
  * created_at updated_at

* investigation_files
  * id uuid pk
  * investigation_id uuid fk investigations
  * file_id uuid fk files
  * created_at

* firms
  * id uuid pk
  * name varchar
  * website varchar null
  * naca_member boolean default false
  * address jsonb null
  * contact jsonb null
  * crm_config jsonb null
  * verified boolean default false
  * created_at updated_at

* firm_practice_areas
  * firm_id uuid fk firms
  * category_id uuid fk categories
  * primary key firm_id category_id

* firm_jurisdictions
  * firm_id uuid fk firms
  * state varchar
  * bar_number varchar null
  * primary key firm_id state

* firm_campaigns
  * id uuid pk
  * firm_id uuid fk firms
  * name varchar
  * categories jsonb
  * states jsonb
  * daily_cap int
  * monthly_cap int
  * status enum active paused ended
  * pricing_model enum subscription cpl revshare fixed
  * price numeric null
  * created_at updated_at

* consents
  * id uuid pk
  * user_id uuid fk users
  * subject_type enum investigation case firm marketing
  * subject_id uuid null
  * channel enum phone sms email
  * firm_id uuid null fk firms when one to one
  * text_snapshot text
  * ip inet
  * user_agent varchar
  * created_at

* leads
  * id uuid pk
  * investigation_id uuid fk investigations null
  * case_id uuid fk cases null
  * firm_id uuid fk firms
  * user_id uuid fk users
  * status enum sent accepted rejected contacted qualified signed closed_lost
  * payload jsonb
  * consent_id uuid fk consents
  * delivered_at timestamp null
  * last_status_at timestamp

* webhooks
  * id uuid pk
  * owner_type enum firm admin internal
  * owner_id uuid
  * target_url varchar
  * secret varchar
  * events jsonb
  * status enum active paused

* webhook_deliveries
  * id uuid pk
  * webhook_id uuid fk webhooks
  * event_name varchar
  * payload jsonb
  * response_code int
  * success boolean
  * attempt int
  * error text null
  * created_at

Settlement administrator and promotion
* admin_clients
  * id uuid pk
  * name varchar
  * contact jsonb
  * created_at

* admin_campaigns
  * id uuid pk
  * admin_client_id uuid fk admin_clients
  * case_id uuid fk cases
  * name varchar
  * start_date date
  * end_date date
  * targeting jsonb
  * budget numeric null
  * status enum active paused ended
  * created_at updated_at

* admin_metrics
  * id uuid pk
  * admin_campaign_id uuid fk admin_campaigns
  * date date
  * impressions int
  * clicks int
  * eligibility_checks int
  * helper_starts int
  * conversions int
  * fraud_rate numeric null

Fraud and risk
* risk_events
  * id uuid pk
  * user_id uuid fk users null
  * case_id uuid fk cases null
  * type varchar
  * details jsonb
  * score numeric
  * created_at

* blocks
  * id uuid pk
  * block_type enum user device ip email_domain
  * value varchar
  * reason text
  * created_by uuid fk users
  * created_at

Device and telemetry
* devices
  * id uuid pk
  * user_id uuid fk users null
  * fingerprint varchar
  * last_ip inet
  * last_seen timestamp

* sessions
  * id uuid pk
  * user_id uuid fk users
  * device_id uuid fk devices
  * ip inet
  * started_at timestamp
  * ended_at timestamp null

Directory and reviews
* firm_profiles
  * firm_id uuid pk fk firms
  * about text
  * badges jsonb
  * response_time_band enum under_24h under_3d over_3d unknown
  * rating_avg numeric
  * rating_count int

* firm_reviews
  * id uuid pk
  * firm_id uuid fk firms
  * user_id uuid fk users
  * rating int check 1 to 5
  * title varchar
  * body text
  * status enum pending approved rejected
  * created_at

Newsletters and alerts
* subscriptions
  * id uuid pk
  * user_id uuid fk users null
  * email varchar
  * type enum weekly category_case deadline
  * categories jsonb null
  * verified boolean default false
  * created_at

* alerts
  * id uuid pk
  * user_id uuid fk users
  * case_id uuid fk cases null
  * company_id uuid fk companies null
  * category_id uuid fk categories null
  * frequency enum instant daily weekly
  * created_at

Calendars
* calendar_items
  * id uuid pk
  * case_id uuid fk cases
  * type enum claim_deadline opt_out_deadline hearing other
  * date date
  * description text

SEO and menus
* seo_defaults
  * id uuid pk
  * route varchar unique
  * meta jsonb

* menus
  * id uuid pk
  * name varchar
  * locale varchar
  * structure jsonb

Feature flags and experiments
* feature_flags
  * id uuid pk
  * key varchar unique
  * description text
  * enabled boolean
  * targeting jsonb

* experiments
  * id uuid pk
  * key varchar unique
  * name varchar
  * status enum running completed paused
  * variants jsonb
  * metrics jsonb

* experiment_assignments
  * id uuid pk
  * experiment_id uuid fk experiments
  * user_id uuid fk users null
  * device_id uuid fk devices null
  * variant_key varchar
  * assigned_at timestamp

Billing and invoices
* firm_invoices
  * id uuid pk
  * firm_id uuid fk firms
  * period_start date
  * period_end date
  * currency char(3)
  * subtotal numeric
  * tax numeric
  * total numeric
  * status enum draft issued paid overdue
  * issued_at timestamp null
  * due_at timestamp null

* firm_invoice_items
  * id uuid pk
  * invoice_id uuid fk firm_invoices
  * description varchar
  * quantity int
  * unit_price numeric
  * amount numeric
  * metadata jsonb

* budgets
  * id uuid pk
  * firm_id uuid fk firms
  * period enum daily monthly
  * amount numeric
  * active boolean

System health and incidents
* system_metrics
  * id uuid pk
  * metric varchar
  * value numeric
  * recorded_at timestamp

* incidents
  * id uuid pk
  * title varchar
  * description text
  * severity enum sev1 sev2 sev3
  * status enum open monitoring resolved
  * started_at timestamp
  * resolved_at timestamp null
  * root_cause text null
  * actions text null

Localization and CMP
* locales
  * id uuid pk
  * code varchar unique
  * name varchar

* translations
  * id uuid pk
  * locale_id uuid fk locales
  * key varchar
  * value text
  * unique locale_id key

* cookie_consents
  * id uuid pk
  * user_id uuid fk users null
  * session_id uuid fk sessions null
  * region varchar
  * preferences jsonb
  * created_at

Contracts and partnerships
* contracts
  * id uuid pk
  * partner_type enum firm admin data_partner
  * partner_id uuid
  * name varchar
  * start_date date
  * end_date date null
  * terms jsonb
  * status enum active pending expired

Risk register
* risks
  * id uuid pk
  * title varchar
  * description text
  * owner_user_id uuid fk users
  * impact enum low medium high critical
  * likelihood enum low medium high
  * mitigation text
  * status enum open monitoring mitigated
  * created_at updated_at