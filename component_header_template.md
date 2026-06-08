Title: Component Header and JSDoc Traceability Template

Template
```tsx
/**
 * Component name EligibilityResultCard
 * Purpose Show eligibility result summary and next steps
 * Implements
 *  US-008 see user_stories_with_acceptance_criteria.md
 *  AC-008-1 result shows Eligible or Maybe or Not eligible with reasons
 *  AC-009-1 display proof needed
 * Data tables cases eligibility_checks
 * API endpoints GET v1 slash cases id POST v1 slash eligibility slash check
 */
export function EligibilityResultCard(props: {
  result: "eligible" | "maybe" | "not_eligible";
  confidence?: number;
  dataTestId: string; // use ok:eligibility:result:summary...
}) {
  return (
<section data-testid={props.dataTestId} aria-live="polite">
      {/* content */}
</section>
  );
}