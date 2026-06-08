/**
 * @trace US-021, US-022
 * Public lawyer directory and evidence-reporting guidance.
 */
import { Link } from "react-router-dom";

const firms = [
  {
    name: "Northline Class Counsel",
    focus: "Consumer claims and settlement intake",
    state: "National",
  },
  {
    name: "Harbor Plaintiff Partners",
    focus: "Data privacy and consumer protection",
    state: "California",
  },
  {
    name: "Summit Litigation Group",
    focus: "Investor and commercial class actions",
    state: "New York",
  },
];

export default function LawyersPage() {
  return (
    <section className="container mx-auto px-4 py-10 md:py-14" data-testid="ok:lawyers:page:root:US-021">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <article className="space-y-5">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Find a lawyer</p>
          <h1 className="text-4xl font-bold tracking-tight">Find a lawyer and report possible class action matters</h1>
          <p className="text-lg text-muted-foreground">
            People can report possible class action matters, share evidence, and request a confidential review through the secure contact flow. The site is designed for intake and education, not for making legal conclusions.
          </p>
          <p className="text-sm text-muted-foreground">
            To report a possible matter, describe what happened, when it happened, what documents or screenshots you have, and whether you want to be contacted by counsel. We do not publish private email addresses on the site.
          </p>
          <Link
            to="/contact"
            className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            data-testid="ok:lawyers:cta:submit:US-022"
          >
            Submit a claim support request
          </Link>
        </article>

        <aside className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">What to include with your report</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>• A short summary of the issue and the affected product or service.</li>
            <li>• Dates, transaction records, screenshots, or supporting documents.</li>
            <li>• Any existing notice, complaint, or settlement reference you have found.</li>
            <li>• Your preferred contact method and consent to be contacted by counsel.</li>
          </ul>
        </aside>
      </div>

      <section className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Verified counsel directory</h2>
        <p className="mt-2 text-sm text-muted-foreground">Use the secure intake path to request contact with a firm after reviewing the directory summary.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {firms.map((firm) => (
            <article key={firm.name} className="rounded-2xl border border-border bg-background p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">Verified</p>
              <h3 className="mt-2 text-xl font-semibold">{firm.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{firm.focus}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">{firm.state}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
