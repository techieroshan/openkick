/**
 * @trace US-001
 * Terms of use page.
 */
export default function TermsPage() {
  return (
    <section className="container mx-auto px-4 py-10 md:py-14" data-testid="ok:terms:page:root:US-001">
      <article className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-sm md:grid-cols-[1fr_0.9fr] md:items-start">
        <div className="space-y-5">
        <p className="text-sm uppercase tracking-[0.25em] text-primary">Terms</p>
        <h1 className="text-4xl font-bold tracking-tight">Terms of use</h1>
        <p className="text-muted-foreground">
          These pages are intended for public information, claim awareness, and investor education only. They do not provide legal, financial, or tax advice and are written to support understanding rather than replace professional guidance.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Use the site for informational purposes only.</li>
          <li>Do not rely on any page for legal conclusions or personal investment decisions.</li>
          <li>Always verify information through the official settlement or offering materials.</li>
        </ul>
        </div>
        <aside className="rounded-3xl bg-muted p-4 text-sm text-muted-foreground">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80"
            alt="Team reviewing terms and governance documents for public use"
            className="h-40 w-full rounded-2xl object-cover"
          />
          <p className="mt-3">The terms page is written for clarity, accountability, and responsible use of public information.</p>
        </aside>
      </article>
    </section>
  );
}
