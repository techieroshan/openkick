/**
 * @trace US-021, US-022
 * Activism and funding portal for potential class action submissions.
 */
import { Link } from "react-router-dom";

export default function ActivismPortalPage() {
  return (
    <section className="container mx-auto px-4 py-10 md:py-14" data-testid="ok:activism:page:root">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <article className="space-y-5">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Activism portal</p>
          <h1 className="text-4xl font-bold tracking-tight">Activism portal: submit a potential class action to fund</h1>
          <p className="text-lg text-muted-foreground">
            This portal is for concerned citizens, advocates, and counsel to report possible class-action harm, provide evidence, and begin the funding-intake process for public review.
          </p>
          <p className="text-sm text-muted-foreground">
            Use the secure intake form to share what happened, what proof you have, and what support you need. The platform is not legal advice and is designed to help people start the right next step safely.
          </p>
          <Link
            to="/contact"
            className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            data-testid="ok:activism:cta:start:US-022"
          >
            Start your intake
          </Link>
        </article>

        <aside className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">What to attach</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>• Screenshots, receipts, contracts, or notices.</li>
            <li>• Dates, locations, and any complaint or regulator reference.</li>
            <li>• A short summary of the harm and what outcome you seek.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
