Title: Traceability Matrix Template

Overview
A template for the automated matrix that maps user stories and acceptance criteria to pages, components, API calls, and tests.

Columns
1. US ID
2. US title
3. AC ID
4. Acceptance criterion summary
5. Pages or routes
6. Components
7. BFF endpoints
8. Data tables
9. Tests unit or integration or e2e file paths
10. Test IDs used
11. Status pass or fail
12. Notes

Example rows
US dash 006  Paste notice to extract eligibility
AC dash 006 dash 1  Paste accepts text and parses
Pages  slash eligibility
Components  EligibilityPasteArea  EligibilityResultCard
BFF  POST slash v1 slash eligibility slash check
Tables  eligibility_checks  notices  cases
Tests  e2e slash eligibility slash paste dot spec dot ts
Test IDs  ok colon eligibility colon checker colon paste colon US dash 006 colon AC dash 006 dash 1
Status  pass
Notes  Parsed with confidence 0.91

US dash 015  Upload receipts to claim locker
AC dash 015 dash 1  Upload allowed types
Pages  slash claim slash locker
Components  ClaimFilesUploader  FilePreviewList
BFF  POST slash v1 slash claim dash locker slash id slash files
Tables  claim_lockers  claim_files  files
Tests  e2e slash claim dash locker slash files dot spec dot ts
Test IDs  ok colon claim colon locker colon add file colon US dash 015 colon AC dash 015 dash 1
Status  pass
Notes  Virus scan mocked

Process
1. The build step generates this matrix from component annotations and test metadata
2. The app renders a human friendly table at slash traceability
3. The BFF returns JSON at slash api slash traceability for CI

Completion rule
A release is ready when all acceptance criteria rows show pass