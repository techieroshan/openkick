Implementation status (verified on 2026-06-08)
* Public home, contact, privacy, and policy navigation flows are 100% implemented and verified.
* Consumer discovery, account management, and claim lockers (US-001 to US-016) are feature-complete with Prisma 7 + PostgreSQL 16 persistence.
* Attorney intake, lead management, and CRM integration flows (US-017 to US-031) are implemented with full database backing.
* Settlement administrator promotion systems (US-032) are functional and ready for production data.
* Crowdfunding platform (US-096 to US-110) is 100% implemented with secure profiles, offering discovery, investment flows, risk disclosures, and distribution tracking.
* All in-memory mock data has been removed; persistence layer is fully established in PostgreSQL.
* UI Header has been cleaned: Privacy and Terms links moved to footer only.

Roles
* Consumer
* Attorney at a plaintiff firm
* Settlement administrator
* Editor
* Compliance officer
* Support agent
* Product analyst
* Website admin
* Website owner

Consumer discovery and account
1) As a consumer I want to browse open settlements so that I can find money I may claim
* Acceptance criteria
  * When I open the Open Settlements page I see a list with title, defendant, category, deadline, proof needed, status
  * When I paginate I can see more results
  * When there are no open settlements I see a helpful message

2) As a consumer I want to search by company or product so that I can quickly find relevant cases
* Acceptance criteria
  * When I type a company name I see typeahead suggestions
  * When I submit a search I see results with matching cases and settlements
  * When there are no matches I see zero results state with links to browse

3) As a consumer I want to filter by category and deadline so that I can act in time
* Acceptance criteria
  * Filters include category, deadline window, state, proof needed, award type, status
  * When I apply filters the list updates without a full page reload
  * When I clear filters all items return

4) As a consumer I want to sign up with email so that I can save my claims
* Acceptance criteria
  * Sign up requires email and password or SSO
  * Email verification is required before claim locker is created
  * After sign up I see my empty claim locker

5) As a consumer I want to manage my privacy choices so that I control my data
* Acceptance criteria
  * I can see consents I have given with time stamp and text
  * I can withdraw consents by channel
  * I can download or delete my data and receive confirmation

Eligibility
6) As a consumer I want to paste a settlement notice so that the site can extract eligibility for me
* Acceptance criteria
  * Paste box accepts text up to a safe limit
  * The system extracts class definition, period, state, exclusions
  * The system shows a summary and confidence score

7) As a consumer I want to upload a PDF notice so that the checker can read it
* Acceptance criteria
  * The upload accepts PDF up to the posted size limit
  * The system parses text and shows extracted details
  * The file is stored securely and appears in my notices list

8) As a consumer I want to answer simple questions so that I can get a clear eligible or maybe or not result
* Acceptance criteria
  * Question flow is three to eight steps
  * The result shows Eligible or Maybe or Not eligible with reasons
  * The result links to next steps and official site

9) As a consumer I want to know if proof is required so that I can prepare documents
* Acceptance criteria
  * The result shows Proof needed Yes or No or Unknown
  * The result lists accepted proof types when known

10) As a consumer I want to see likely award ranges where available so that I can decide whether to proceed
* Acceptance criteria
  * The result shows award range or payout rules when published
  * If unknown it shows Not published

11) As a consumer I want a link to the official settlement site so that I can verify information
* Acceptance criteria
  * The result includes an official link labeled clearly
  * Link opens in a new tab

Claim Helper and locker
12) As a consumer I want the helper to auto fill claim forms on my device so that I avoid mistakes
* Acceptance criteria
  * Browser assist guides me to fields and fills data only with my consent
  * I can edit any filled field before submit
  * The system never submits without my action

13) As a consumer I want to store claim IDs and passwords so that I can track status
* Acceptance criteria
  * I can add claim ID, portal URL, and optional password hint
  * Data is encrypted at rest
  * I can update or delete entries

14) As a consumer I want deadline reminders by email and calendar so that I do not miss out
* Acceptance criteria
  * I can opt in to reminders for each claim
  * System sends at least two reminders before deadline
  * I can download an ICS file

15) As a consumer I want to upload receipts or screenshots so that I have proof ready
* Acceptance criteria
  * I can upload allowed file types with size validation
  * Files are virus scanned and stored securely
  * I can preview and remove files

16) As a consumer I want to see when payments are expected so that I plan
* Acceptance criteria
  * Claim pages show timeline if known
  * I can mark payment received and add amount and date

Investigations intake
17) As a consumer I want to submit my story for investigation so that I can find representation
* Acceptance criteria
  * Form collects issue type, facts, time period, state, defendants, documents
  * A confirmation page shows case number and what happens next
  * I can track status in my account

18) As a consumer I want to choose privacy settings so that my identity is protected
* Acceptance criteria
  * I can set anonymous to firms until I consent
  * I can mask contact info on initial review

19) As a consumer I want to consent to outreach from named firms so that I remain in control
* Acceptance criteria
  * I see a list of firms with checkboxes by firm name
  * TCPA disclosure text shows above the consent choices
  * Consent time stamp and IP are stored

20) As a consumer I want to withdraw my submission so that I can stop the process
* Acceptance criteria
  * I can withdraw and disable routing
  * All pending firm access is revoked
  * I receive confirmation

Find a lawyer
21) As a consumer I want to browse a verified directory so that I can find the right lawyer
* Acceptance criteria
  * Directory lists firms with badges for verified status and NACA membership when provided
  * Filters include state and practice area
  * Profiles show contact info and jurisdictions

22) As a consumer I want to request contact with a specific firm so that I can get help
* Acceptance criteria
  * I can send a request with brief facts
  * I must provide consent for the firm to contact me by channel
  * I receive a copy of the request

23) As a consumer I want to see firm reviews and response time so that I can choose with confidence
* Acceptance criteria
  * Profiles show aggregated ratings and response time bands
  * Review content is moderated before publish

News and alerts
24) As a consumer I want to subscribe to category alerts so that I get updates I care about
* Acceptance criteria
  * I can pick categories and frequency
  * A confirmation email verifies subscription
  * I can unsubscribe in one click

25) As a consumer I want to get a weekly digest so that I stay informed
* Acceptance criteria
  * Weekly email includes new cases, deadlines, and tips
  * Links point to relevant pages

Attorney intake and lead management
26) As an attorney I want to define the investigations I seek so that I receive relevant leads
* Acceptance criteria
  * I can select categories, states, and exclusions
  * I can set caps per day and per month

27) As an attorney I want to set practice areas and states so that routing matches my license
* Acceptance criteria
  * I can list jurisdictions and bar numbers
  * Leads outside my scope are not routed

28) As an attorney I want to receive leads with consent receipts so that I can contact prospects compliantly
* Acceptance criteria
  * Lead payload includes consent text, time stamps, selected channels
  * A PDF or HTML record is available

29) As an attorney I want to integrate with my CRM so that I can manage leads
* Acceptance criteria
  * Webhooks and API keys can be configured
  * Retry logic exists for failed deliveries
  * I can view delivery logs

30) As an attorney I want performance reports so that I can measure signed case rates
* Acceptance criteria
  * I can see accepted lead counts, contact rate, qualified rate, signed rate
  * I can export CSV

31) As an attorney I want to pause campaigns so that I control volume
* Acceptance criteria
  * I can pause and resume immediately
  * Paused state prevents new routing

Settlement administrator services
32) As an administrator I want to promote a settlement to verified users so that claim rates increase
* Acceptance criteria
  * I can submit official links and approved copy
  * I can choose targeting categories and geography

33) As an administrator I want fraud risk scoring so that I reduce invalid claims
* Acceptance criteria
  * I can view risk scores with factors such as duplicates and device
  * I can export flagged entries

34) As an administrator I want a dashboard for conversion and channel mix so that I can optimize outreach
* Acceptance criteria
  * I can see impressions, clicks, eligibility checks, claim helper starts, exits
  * Data can be filtered by date and channel

35) As an administrator I want to provide official links and claim rules so that listings stay accurate
* Acceptance criteria
  * I can edit and approve listing content
  * Audit trail tracks changes and publisher

36) As an administrator I want to integrate web analytics so that we attribute claims correctly
* Acceptance criteria
  * UTM parameters are preserved to official sites
  * Click events and outbound link events are logged

Editorial workflow
37) As an editor I want to publish a new settlement page so that users can act
* Acceptance criteria
  * Form includes title, defendants, class definition, deadlines, notice links, official link, category tags
  * Pre publish checklist includes disclaimers and link validation

38) As an editor I want to schedule posts so that we maintain cadence
* Acceptance criteria
  * I can set publish date and time
  * Scheduler shows queued items

39) As an editor I want to tag by category and company so that pages are discoverable
* Acceptance criteria
  * Tags autocomplete from taxonomy
  * Tag pages aggregate content

40) As an editor I want a checklist for compliance and disclaimers so that pages meet standards
* Acceptance criteria
  * Publishing requires confirmation of required disclaimers
  * Missing items block publish until resolved

41) As an editor I want version history so that I can track edits and revert if needed
* Acceptance criteria
  * Each save creates a version with diff and author
  * I can revert to a prior version

Data and APIs
42) As a product analyst I want to fetch new docket events from connected sources so that I can alert the newsroom
* Acceptance criteria
  * Ingest jobs run on schedule and on demand
  * New events create alerts for editors

43) As a product analyst I want category level metrics so that I can guide content strategy
* Acceptance criteria
  * Dashboard shows traffic, conversions, and growth by category
  * Data can be exported

44) As a product analyst I want to export anonymized data so that partners can subscribe
* Acceptance criteria
  * Exports exclude personal identifiers
  * Exports are accessible by API with keys and scopes

45) As a product analyst I want to track eligibility outcomes so that we improve the checker
* Acceptance criteria
  * Outcomes are logged with case and category
  * Reports show accuracy improvements over time

Compliance
46) As a compliance officer I want to review consent templates so that they meet TCPA and ethics rules
* Acceptance criteria
  * Templates are versioned and approved
  * Changes require approver sign off

47) As a compliance officer I want to access consent logs so that I can respond to audits
* Acceptance criteria
  * Search by user, date, campaign, firm
  * Export with hash and signature

48) As a compliance officer I want to review content before publish so that claims are not misleading
* Acceptance criteria
  * Content approval queue supports assignment and SLA
  * Approvals are recorded with time stamp

49) As a compliance officer I want data retention rules so that we delete data on schedule
* Acceptance criteria
  * Retention policies are set by data type
  * Deletion runs create logs and reports
  * Users receive notices when required

50) As a compliance officer I want jurisdiction flags so that state specific disclosures are shown
* Acceptance criteria
  * Pages show state specific text based on user location and case jurisdiction
  * Preview supports location simulation

Support
51) As a support agent I want to view a user claim locker so that I can answer questions
* Acceptance criteria
  * I can view claims in a read only view
  * Sensitive data is masked unless I have permission

52) As a support agent I want macros for common issues so that responses are fast
* Acceptance criteria
  * I can insert and edit macros
  * Macros are approved by compliance

53) As a support agent I want to escalate potential fraud so that risk is addressed
* Acceptance criteria
  * I can flag a user or claim for review
  * Risk team receives a ticket with context

54) As a support agent I want a sandbox view so that I do not alter user data while helping
* Acceptance criteria
  * A safe mode prevents changes
  * A banner shows sandbox status

Security and privacy
55) As a user I want two factor authentication so that my account is safer
* Acceptance criteria
  * I can enable TOTP or email code
  * Backup codes are provided

56) As a user I want to download my data so that I can review what is stored
* Acceptance criteria
  * Export includes profile, consents, claims, files metadata, activity
  * Export is available within a posted time

57) As a user I want to delete my account so that my data is removed
* Acceptance criteria
  * Deletion requests verify identity
  * Data is deleted or anonymized per policy
  * I receive confirmation

Accessibility
58) As a user I want screen reader friendly pages so that I can navigate
* Acceptance criteria
  * Pages have proper landmarks and labels
  * Forms announce errors correctly

59) As a user I want keyboard navigation so that I can complete forms
* Acceptance criteria
  * All interactive elements are keyboard accessible
  * Focus order is logical and visible

Monetization and billing
60) As a firm admin I want to see invoices so that I can reconcile spend
* Acceptance criteria
  * Invoices show line items for leads and services
  * I can download PDF and CSV

61) As a firm admin I want to set budgets and caps so that spend is controlled
* Acceptance criteria
  * I can set daily and monthly caps
  * System stops routing above cap and alerts me

62) As an administrator client I want contract based pricing so that campaigns are predictable
* Acceptance criteria
  * I can view contract terms and effective dates
  * Billing reflects the contract plan

Quality and fraud controls
63) As a risk analyst I want duplicate detection on claims so that abuse is reduced
* Acceptance criteria
  * System flags likely duplicates by user, device, address, bank account
  * I can merge or dismiss flags

64) As a risk analyst I want device and IP risk signals so that I can score submissions
* Acceptance criteria
  * Submissions capture device fingerprint and IP
  * Risk score includes geo mismatch, velocity, known bad lists

65) As a risk analyst I want to block bad actors so that platform health improves
* Acceptance criteria
  * I can block by user, device, IP, or email domain
  * Blocks take effect immediately
  * Audit log records all actions

Website admin
66) As a website admin I want to manage user roles and permissions so that people have the right access
* Acceptance criteria
  * I can assign roles to users and revoke them
  * Permissions are role based and fine grained
  * Changes are logged

67) As a website admin I want to configure SSO and two factor so that access is secure
* Acceptance criteria
  * I can set up SAML or OIDC and test it
  * I can enforce 2FA for roles

68) As a website admin I want to manage feature flags so that I can roll out updates safely
* Acceptance criteria
  * I can create flags and target by cohort
  * I can view flag metrics

69) As a website admin I want to manage categories and taxonomies so that content stays organized
* Acceptance criteria
  * I can add, edit, and retire categories
  * Changes update navigation and filters

70) As a website admin I want to edit navigation menus so that users can find content
* Acceptance criteria
  * I can change menu items and order
  * Preview before publish is available

71) As a website admin I want to manage locales and translations so that the site is usable in more regions
* Acceptance criteria
  * I can add locales and upload translations
  * Fallback rules are set

72) As a website admin I want to set SEO metadata defaults so that pages rank better
* Acceptance criteria
  * I can set defaults and overrides
  * Open Graph and structured data are included

73) As a website admin I want to moderate user generated content so that the site remains safe
* Acceptance criteria
  * I can approve, edit, or remove reviews and comments
  * Reason codes are required

74) As a website admin I want to view system health and uptime so that I can respond to incidents
* Acceptance criteria
  * Status dashboard shows uptime, latency, error rates
  * Alerts can be configured

75) As a website admin I want to manage webhooks and API keys so that integrations are safe
* Acceptance criteria
  * I can create, rotate, and revoke keys
  * I can view webhook delivery logs and replay

76) As a website admin I want to export audit logs so that I can investigate issues
* Acceptance criteria
  * I can filter by user, action, date
  * I can export CSV with signatures

77) As a website admin I want to configure cookie consent and CMP so that privacy choices are respected
* Acceptance criteria
  * Banner can be configured by region
  * User choices are stored and honored

78) As a website admin I want to schedule maintenance windows so that users are notified
* Acceptance criteria
  * I can set start and end time and message
  * System shows notice to users

Website owner
79) As a website owner I want a business KPI dashboard so that I can see growth and revenue
* Acceptance criteria
  * Dashboard shows traffic, MAU, eligibility checks, leads, revenue, claim lift
  * Date filters and comparisons are available

80) As a website owner I want to track acquisition sources so that I can invest in channels that work
* Acceptance criteria
  * Reports show sources for key conversions
  * UTM tracking is consistent

81) As a website owner I want to see cohort retention so that I understand user value
* Acceptance criteria
  * Cohort table shows weekly and monthly retention
  * I can segment by acquisition channel

82) As a website owner I want compliance status reports so that I can manage risk
* Acceptance criteria
  * Report shows consent completeness, content approvals, data deletion SLAs
  * Red or amber flags are explained

83) As a website owner I want to approve pricing and plans so that offers align with strategy
* Acceptance criteria
  * I can edit plan prices and features
  * Changes require a confirmation flow

84) As a website owner I want to approve major partnerships so that brand and legal risks are managed
* Acceptance criteria
  * A workflow collects partner details and documents
  * Approval state gates go live status

85) As a website owner I want to review data sharing agreements so that privacy is protected
* Acceptance criteria
  * Agreements are stored and searchable
  * Expiry alerts are sent ahead of time

86) As a website owner I want to see content output and velocity so that editorial goals are met
* Acceptance criteria
  * Report shows posts per day and per category
  * Missed schedules are highlighted

87) As a website owner I want A B test results so that decisions are evidence based
* Acceptance criteria
  * Tests show variant performance and significance
  * I can approve winner and roll out

88) As a website owner I want an incident and risk register so that I can oversee reliability
* Acceptance criteria
  * Incidents are recorded with severity and timeline
  * Risks have owners and mitigation status

89) As a website owner I want quarterly and annual reports so that I can brief investors and partners
* Acceptance criteria
  * Reports compile KPIs and narratives
  * I can export PDF

Product review addendum — public experience and governance
90) As a visitor I want every public page to feel premium, responsive, and context-rich so that trust is established immediately
* Acceptance criteria
  * Public pages include clear narrative copy, contextual imagery, and structured sections
  * The layout adapts cleanly across mobile, tablet, and desktop breakpoints
  * No page relies on placeholder, generic, or fake content

91) As a visitor I want contact, privacy, and terms pages to explain how support, data handling, and usage rules work so that I can act with confidence
* Acceptance criteria
  * Contact page explains the secure intake path and avoids public email exposure
  * Privacy and terms pages describe data minimization, consent, and limitations in plain language
  * Legal and support guidance is visible, current, and easy to scan

92) As a compliance owner I want every public page to preserve privacy-first behavior and deny-by-default information exposure so that no unnecessary data is disclosed
* Acceptance criteria
  * Public pages avoid unnecessary personal data collection and disclosure
  * Sensitive or invalid URLs are handled with explicit noindex or denial guidance where applicable
  * The site supports secure public intake without exposing private contact details

93) As a website owner I want SEO, AEO, and GEO-ready public content so that the site can be discovered and trusted by both humans and machines
* Acceptance criteria
  * Public pages have strong descriptive headings, summary copy, and meaningful metadata guidance
  * Content is written for real user intent and clear business outcomes
  * The site remains responsive and accessibility-aware across all public journeys

94) As an activist or claimant I want a dedicated activism portal so that I can submit a potential class action funding opportunity with confidence
* Acceptance criteria
  * The portal explains how to report a potential class action matter, what evidence to attach, and how to request counsel review
  * The path is clearly linked from public navigation and the home page
  * The content emphasizes privacy, consent, and safe intake rather than legal conclusions

95) As a public user I want the contact intake form to validate my details and accept supporting evidence so that my submission is complete and useful
* Acceptance criteria
  * The form requires name, email, and contact number with clear validation feedback
  * The form supports file attachments and confirms the submission path for the support team
  * The intake flow keeps personal contact details private and does not expose email addresses publicly

Crowdfunding and Investor Portal
96) As an investor I want to create an investor profile so that I can save my information for investments
* Acceptance criteria
  * Profile collects name and address and date of birth and phone and tax id where applicable
  * I can save and edit my profile
  * Sensitive data is stored securely and masked in UI

97) As an investor I want to complete KYC so that I can be cleared to invest
* Acceptance criteria
  * Status shows pending or approved or rejected with reason
  * I receive an email when status changes

98) As an investor I want to verify accreditation when required so that I can access Reg D offerings
* Acceptance criteria
  * I can choose verification method income or net worth or third party letter
  * I can upload evidence and attest with signature
  * Accreditation status is recorded with expiry date

99) As an investor I want to browse offerings so that I can evaluate opportunities
* Acceptance criteria
  * Offerings list shows title and category and status and min investment and funding progress
  * Filters for status and category and min investment work together
  * Zero state shows a helpful message

100) As an investor I want to open an offering page so that I can read terms and risks
* Acceptance criteria
  * The page shows key terms and timeline and documents and disclosures
  * Invest button is disabled until KYC is approved and accreditation is approved if required
  * Official case links and law firm profile are present

101) As an investor I want to enter an amount and fund via escrow so that I can invest
* Acceptance criteria
  * Input validates against min and max and remaining allocation
  * Payment methods show escrow account and ACH or card where allowed
  * Confirmation screen shows fees and totals and risk acknowledgment checkbox

102) As an investor I want to see my portfolio so that I can track positions and status
* Acceptance criteria
  * Portfolio shows invested amount and status and estimated distributions timeline when available
  * I can download statements and confirmations

103) As an investor I want to receive updates so that I stay informed about the case
* Acceptance criteria
  * I can subscribe to offering updates
  * Updates appear in my dashboard and are sent by email

104) As an issuer I want to submit a case for funding so that I can start underwriting
* Acceptance criteria
  * Form collects case overview and jurisdiction and parties and pleadings and counsel and budget
  * I can upload complaint and docket links and damages theory
  * I see status and checklist after submission

105) As an issuer I want to configure offering terms so that the campaign aligns with my needs
* Acceptance criteria
  * I can propose min and target and cap and instrument type and fees
  * A preview shows investor facing terms and disclosures
  * Submission locks terms for compliance review

106) As an issuer I want a campaign page with media so that I can attract investors and potential witnesses
* Acceptance criteria
  * I can upload images and video and bios
  * I can draft updates and Q and A and save as draft or publish
  * Social share cards render with correct metadata

107) As a funding compliance officer I want to approve offerings so that only compliant campaigns go live
* Acceptance criteria
  * I can review the checklist and documents and disclosures
  * I can approve or request changes with comments
  * Approval records keep time and user and version

108) As a funding compliance officer I want to review investor communications so that messaging remains compliant
* Acceptance criteria
  * Updates and Q and A require approval before publish
  * A redline shows changes from last review
  * Publishing is blocked until approval

109) As a funding operations admin I want to manage escrow and transactions so that funds are reconciled
* Acceptance criteria
  * I can view pending and settled transactions with statuses
  * I can export a reconciliation report
  * Webhook events from the payment processor are logged with signature validation

110) As an issuer I want to record a distribution so that investors receive proceeds
* Acceptance criteria
  * I can upload a distribution file or enter amounts and dates