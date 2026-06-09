/**
 * @trace US-001, US-002, US-003
 * Open settlements listing page
 */
import { useQuery } from "@tanstack/react-query";
import { Settlement } from "@openkick/types";

async function fetchSettlements(): Promise<Settlement[]> {
  const res = await fetch("/api/v1/settlements");
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data.data || [];
}

export default function SettlementsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["settlements"],
    queryFn: fetchSettlements,
  });

  if (isLoading) return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-10 w-48 bg-muted rounded mb-6"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-muted rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-12 text-center">
      <p className="text-rose-700 font-medium">Error loading settlements. Please try again later.</p>
    </div>
  );

  return (
    <div
      className="container mx-auto px-4 py-10 md:py-14"
      data-testid="ok:cases:page:root:US-001"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Discover</p>
          <h1 className="text-4xl font-bold tracking-tight">Open Settlements</h1>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="search" 
            placeholder="Search company or product..." 
            className="rounded-full border border-border bg-background px-4 py-2 text-sm w-full md:w-64"
          />
        </div>
      </div>

      {!data || data.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground" data-testid="ok:cases:list:empty:US-001:AC-001-3">
            No open settlements found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((settlement) => (
            <div
              key={settlement.id}
              className="group relative flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              data-testid={`ok:cases:item:${settlement.id}:US-001`}
            >
              <div className="mb-4 flex items-start justify-between">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  settlement.status === 'open' ? 'bg-emerald-50 text-emerald-700' : 'bg-muted text-muted-foreground'
                }`}>
                  {settlement.status === 'open' ? 'Accepting Claims' : 'Closed'}
                </span>
                <span className="text-xs text-muted-foreground">
                  Deadline: {settlement.deadline ? new Date(settlement.deadline).toLocaleDateString() : 'TBD'}
                </span>
              </div>
              
              <h2 className="mb-1 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                {settlement.title}
              </h2>
              <p className="text-sm font-medium text-muted-foreground mb-4">
                {settlement.defendant}
              </p>
              
              <div className="mt-auto space-y-3 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-semibold capitalize">{settlement.category_id}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Proof Required</span>
                  <span className="font-semibold">{settlement.proof_needed ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Award Type</span>
                  <span className="font-semibold capitalize">{settlement.award_type || 'Unknown'}</span>
                </div>
              </div>
              
              <a 
                href={settlement.official_link || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-secondary px-4 py-2.5 text-sm font-bold text-secondary-foreground transition hover:bg-secondary/80"
              >
                View Official Site
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
