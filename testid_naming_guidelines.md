Title: Test ID Naming and Traceability Guidelines

Purpose
Give a clear schema for data test IDs that ties UI parts to user stories and acceptance criteria for end to end traceability.

Format
1. Base format ok colon area colon component colon purpose
2. Optional trace suffix colon US dash NNN and colon AC dash NNN dash M

Examples
1. ok colon eligibility colon checker colon submit colon US dash 006 colon AC dash 006 dash 3
2. ok colon cases colon list colon filter apply colon US dash 003 colon AC dash 003 dash 1
3. ok colon claim colon locker colon add file colon US dash 015 colon AC dash 015 dash 1
4. ok colon admin colon roles colon assign colon US dash 066 colon AC dash 066 dash 2

Areas
1. nav
2. home
3. cases
4. eligibility
5. claim
6. investigations
7. directory
8. news
9. firms
10. admins
11. editor
12. compliance
13. support
14. analytics
15. billing
16. settings
17. system
18. traceability

Rules
1. Use lowercase and colons as separators
2. Keep names short and specific
3. Add US and AC suffix when a control directly meets an acceptance criterion
4. Each page header must include a root test ID with area colon page name colon root
5. Shared primitives use ok colon ui colon primitive name colon element

Enforcement
1. ESLint custom rule checks for a data-testid on any element with role button link textbox combobox or menuitem
2. Vitest and Playwright helpers assert presence of required test IDs per page