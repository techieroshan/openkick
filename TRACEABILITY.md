# Traceability System

## Overview

Openkick implements end-to-end traceability from user stories and acceptance criteria to implementation (components, APIs, tests).

## User Story and AC Registry

The `build:ac` script parses:
- `docs/user_stories_with_acceptance_criteria.md` (US-001..US-089)
- `docs/user_stories_with_acceptance_criteria_append_crowdfunding.md` (US-090..US-107)

Output: `artifacts/acceptance-criteria.json`

## Annotations

### Components and Routes
```typescript
/**
 * @trace US-001, US-002
 * Component description
 */
```

### Test IDs
All interactive elements use `data-testid` with format:
```
ok:area:component:purpose[:US-XXX[:AC-XXX-Y]]
```

Example: `ok:invest:offerings:filter:apply:US-093:AC-093-1`

## Traceability Matrix

The `build:traceability` script scans code and generates `artifacts/traceability-e2e.json` mapping:
- US/AC IDs
- Pages/routes
- Components
- BFF endpoints
- Test files
- Status (pass/fail/pending)

## CI Check

`check:traceability` verifies that every acceptance criterion has at least one passing test. Fails CI if coverage is incomplete.

## Traceability Page

`/traceability` displays the matrix as a filterable table showing coverage status.
