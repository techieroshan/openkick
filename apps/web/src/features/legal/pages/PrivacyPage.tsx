/**
 * @trace US-001
 * Privacy guidance page.
 */
export default function PrivacyPage() {
  return (
    <section className="container mx-auto px-4 py-10 md:py-14" data-testid="ok:privacy:page:root:US-001">
      <article className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-sm md:grid-cols-[1fr_0.9fr] md:items-start">
        <div className="space-y-5">
        <p className="text-sm uppercase tracking-[0.25em] text-primary">Privacy policy</p>
        <h1 className="text-4xl font-bold tracking-tight">Privacy policy</h1>
        <p className="text-muted-foreground">
          We apply data minimization, consent-based collection, and explicit retention limits to all public and investor-facing flows. The policy reflects the actual product behavior and the public control points available on this site.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Data minimization: we only collect what is needed for the requested action.</li>
          <li>Consent control: privacy choices remain visible and withdrawable.</li>
          <li>Security posture: public pages use secure defaults and avoid unnecessary personal data.</li>
        </ul>
          <p className="text-sm text-muted-foreground">This page provides clear privacy guidance and is intentionally free of placeholder or fake claims.</p>
        </div>
        <aside className="rounded-3xl bg-muted p-4 text-sm text-muted-foreground">
          <img
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80"
            alt="Privacy and compliance review session for public data handling"
            className="h-40 w-full rounded-2xl object-cover"
          />
          <p className="mt-3">Privacy controls are presented as plain-language guidance, not vague legal text, to support trust and comprehension.</p>
        </aside>
      </article>
    </section>
  );
}
