/**
 * @trace US-021, US-022, US-023
 * Public lawyer directory and evidence-reporting guidance.
 */
import { useState } from "react";
import { Link } from "react-router-dom";

const firms = [
  {
    name: "Northline Class Counsel",
    focus: "Consumer Protection",
    description: "Consumer claims and settlement intake",
    state: "National",
    rating: 4.8,
  },
  {
    name: "Harbor Plaintiff Partners",
    focus: "Data Privacy",
    description: "Data privacy and consumer protection",
    state: "California",
    rating: 4.9,
  },
  {
    name: "Summit Litigation Group",
    focus: "Investor Protection",
    description: "Investor and commercial class actions",
    state: "New York",
    rating: 4.7,
  },
  {
    name: "Frontier Rights Law",
    focus: "Employment",
    description: "Employee rights and wage theft cases",
    state: "Texas",
    rating: 4.6,
  },
];

export default function LawyersPage() {
  const [stateFilter, setStateFilter] = useState("All");
  const [focusFilter, setFocusFilter] = useState("All");

  const filteredFirms = firms.filter(f => 
    (stateFilter === "All" || f.state === stateFilter) &&
    (focusFilter === "All" || f.focus === focusFilter)
  );

  return (
    <section className="container mx-auto px-4 py-10 md:py-14" data-testid="ok:lawyers:page:root:US-021">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] mb-12">
        <article className="space-y-5">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Find a lawyer</p>
          <h1 className="text-4xl font-bold tracking-tight">Report harm and find qualified legal representation</h1>
          <p className="text-lg text-muted-foreground">
            Connect with verified plaintiff firms through Openkick&apos;s secure intake. Our platform ensures your evidence is reviewed by specialists who understand the scale of systemic corporate harm.
          </p>
          <Link
            to="/contact"
            className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            data-testid="ok:lawyers:cta:submit:US-022"
          >
            Start Secure Intake
          </Link>
        </article>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Whistleblower Protections</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Openkick uses industry-standard encryption for all submissions. We prioritize your anonymity and only share your contact details with counsel after you&apos;ve reviewed their credentials and provided explicit consent.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><span>🛡️</span> <span>End-to-end encrypted intake</span></li>
            <li className="flex gap-2"><span>⚖️</span> <span>Verified NACA and AAJ members</span></li>
            <li className="flex gap-2"><span>🕶️</span> <span>Zero-knowledge review process</span></li>
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold">Verified Counsel Directory</h2>
            <p className="text-sm text-muted-foreground mt-1">Browse firms vetted for class-action expertise.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select 
              className="rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="All">All States</option>
              <option value="National">National</option>
              <option value="California">California</option>
              <option value="New York">New York</option>
              <option value="Texas">Texas</option>
            </select>
            <select 
              className="rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              value={focusFilter}
              onChange={(e) => setFocusFilter(e.target.value)}
            >
              <option value="All">All Practice Areas</option>
              <option value="Consumer Protection">Consumer Protection</option>
              <option value="Data Privacy">Data Privacy</option>
              <option value="Investor Protection">Investor Protection</option>
              <option value="Employment">Employment</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredFirms.length > 0 ? filteredFirms.map((firm) => (
            <article key={firm.name} className="flex flex-col rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Verified Partner</span>
                <span className="text-xs font-bold">⭐ {firm.rating}</span>
              </div>
              <h3 className="text-lg font-bold leading-tight">{firm.name}</h3>
              <p className="mt-1 text-xs font-semibold text-primary">{firm.focus}</p>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2 italic">&ldquo;{firm.description}&rdquo;</p>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{firm.state}</span>
                <Link to="/contact" className="text-xs font-bold text-primary hover:underline">Request Review</Link>
              </div>
            </article>
          )) : (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No firms found matching your filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

