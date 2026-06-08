Filename: user_stories_with_acceptance_criteria_append_crowdfunding.md
Title: User Stories Addendum — Crowdfunding with Acceptance Criteria

New roles
* Investor
* Issuer campaign sponsor
* Funding compliance officer
* Funding operations admin

Investor onboarding
90) As an investor I want to create an investor profile so that I can save my information for investments
* Acceptance criteria
  * Profile collects name and address and date of birth and phone and tax id where applicable
  * I can save and edit my profile
  * Sensitive data is stored securely and masked in UI

91) As an investor I want to complete KYC so that I can be cleared to invest
* Acceptance criteria
  * I can upload ID and fill required fields
  * Status shows pending or approved or rejected with reason
  * I receive an email when status changes

92) As an investor I want to verify accreditation when required so that I can access Reg D offerings
* Acceptance criteria
  * I can choose verification method income or net worth or third party letter
  * I can upload evidence and attest with signature
  * Accreditation status is recorded with expiry date

Offerings discovery
93) As an investor I want to browse offerings so that I can evaluate opportunities
* Acceptance criteria
  * Offerings list shows title and category and status and min investment and funding progress
  * Filters for status and category and min investment work together
  * Zero state shows a helpful message

94) As an investor I want to open an offering page so that I can read terms and risks
* Acceptance criteria
  * The page shows key terms and timeline and documents and disclosures
  * Invest button is disabled until KYC is approved and accreditation is approved if required
  * Official case links and law firm profile are present

Invest flow
95) As an investor I want to enter an amount and fund via escrow so that I can invest
* Acceptance criteria
  * Input validates against min and max and remaining allocation
  * Payment methods show escrow account and ACH or card where allowed
  * Confirmation screen shows fees and totals and risk acknowledgment checkbox

96) As an investor I want to see my portfolio so that I can track positions and status
* Acceptance criteria
  * Portfolio shows invested amount and status and estimated distributions timeline when available
  * I can download statements and confirmations

97) As an investor I want to receive updates so that I stay informed about the case
* Acceptance criteria
  * I can subscribe to offering updates
  * Updates appear in my dashboard and are sent by email

Issuer onboarding
98) As an issuer I want to submit a case for funding so that I can start underwriting
* Acceptance criteria
  * Form collects case overview and jurisdiction and parties and pleadings and counsel and budget
  * I can upload complaint and docket links and damages theory
  * I see status and checklist after submission

99) As an issuer I want to configure offering terms so that the campaign aligns with my needs
* Acceptance criteria
  * I can propose min and target and cap and instrument type and fees
  * A preview shows investor facing terms and disclosures
  * Submission locks terms for compliance review

100) As an issuer I want a campaign page with media so that I can attract investors and potential witnesses
* Acceptance criteria
  * I can upload images and video and bios
  * I can draft updates and Q and A and save as draft or publish
  * Social share cards render with correct metadata

Compliance and operations
101) As a funding compliance officer I want to approve offerings so that only compliant campaigns go live
* Acceptance criteria
  * I can review the checklist and documents and disclosures
  * I can approve or request changes with comments
  * Approval records keep time and user and version

102) As a funding compliance officer I want to review investor communications so that messaging remains compliant
* Acceptance criteria
  * Updates and Q and A require approval before publish
  * A redline shows changes from last review
  * Publishing is blocked until approval

103) As a funding operations admin I want to manage escrow and transactions so that funds are reconciled
* Acceptance criteria
  * I can view pending and settled transactions with statuses
  * I can export a reconciliation report
  * Webhook events from the payment processor are logged with signature validation

Distributions
104) As an issuer I want to record a distribution so that investors receive proceeds
* Acceptance criteria
  * I can upload a distribution file or enter amounts and dates
  * The system prorates by instrument rules and validates totals
  * Investors receive statements and payment confirmations

105) As an investor I want to see distribution history so that I understand returns
* Acceptance criteria
  * Each distribution shows gross and fees and net paid and date
  * I can download tax documents when available

Risk and disclosures
106) As an investor I want to see risk warnings before I invest so that I make an informed decision
* Acceptance criteria
  * A pre investment modal lists key risks and requires acknowledgment
  * A permanent risk banner appears on the offering page

Support and disputes
107) As an investor I want to contact support about an investment so that I can resolve issues
* Acceptance criteria
  * I can open a ticket tied to an offering
  * Support responses are tracked and time stamped