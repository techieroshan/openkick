/**
 * @trace US-001
 * Home page
 */
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section
      className="container mx-auto px-4 py-10 md:py-14"
      data-testid="ok:home:page:root:US-001"
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <article className="space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">OpenKick public portal</p>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Find claim-ready settlements, review eligibility, and follow investor opportunities with clarity.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            OpenKick combines settlement intelligence, claim guidance, and investor transparency in a single, accessible experience for consumers, counsel, and partners.
          </p>
          <p className="max-w-xl text-base text-muted-foreground">
            Every page is designed to help visitors understand what is happening, why it matters, and what action to take next without relying on placeholder language or generic marketing copy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/cases"
              className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              data-testid="ok:home:cta:browse:US-001"
            >
              Browse settlements
            </Link>
            <Link
              to="/eligibility"
              className="rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
              data-testid="ok:home:cta:eligibility:US-006"
            >
              Check eligibility
            </Link>
          </div>
        </article>

        <aside className="rounded-3xl border border-border bg-card p-4 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
            alt="Team reviewing settlement documents and investor information"
            className="h-64 w-full rounded-2xl object-cover"
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Real decision support content, clear timelines, and investor-ready summaries delivered through a responsive, high-trust experience.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl bg-muted p-3 text-sm">Settlement tracking for consumers and counsel.</article>
            <article className="rounded-2xl bg-muted p-3 text-sm">Investment visibility for regulated funding opportunities.</article>
          </div>
        </aside>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Settlement intelligence",
            body: "See open cases, deadlines, and proof requirements in clear, responsive views.",
          },
          {
            title: "Eligibility support",
            body: "Use the checker to understand notice language and next steps before you act.",
          },
          {
            title: "Investor transparency",
            body: "Review offerings, status, and documentation through a secure, public dashboard.",
          },
        ].map((card) => (
          <article key={card.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">{card.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
