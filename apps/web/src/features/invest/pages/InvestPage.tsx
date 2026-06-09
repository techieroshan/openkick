/**
 * @trace US-093
 * Offerings index page
 */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Offering, OfferingStatus } from "@openkick/types";

async function fetchOfferings(filters?: { status?: OfferingStatus; min_investment?: number }): Promise<Offering[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.set("status", filters.status);
  if (filters?.min_investment) params.set("min_investment", String(filters.min_investment));
  const res = await fetch(`/api/v1/offerings?${params}`);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data.data || [];
}

export default function InvestPage() {
  const [statusFilter, setStatusFilter] = useState<OfferingStatus | "">("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["offerings", statusFilter],
    queryFn: () => fetchOfferings(statusFilter ? { status: statusFilter as OfferingStatus } : undefined),
  });

  if (isLoading) return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-10 w-48 bg-muted rounded mb-6"></div>
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => <div key={i} className="h-64 bg-muted rounded-3xl"></div>)}
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-12 text-center text-rose-700">
      Error loading offerings.
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10 md:py-14" data-testid="ok:invest:page:root:US-093">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Crowdfunding</p>
          <h1 className="text-4xl font-bold tracking-tight">Litigation Offerings</h1>
          <p className="mt-2 text-muted-foreground">Invest in high-impact class action matters alongside top-tier firms.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Filter by Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OfferingStatus | "")}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            data-testid="ok:invest:offerings:filter:status:US-093:AC-093-2"
          >
            <option value="">All Offerings</option>
            <option value="open">Open</option>
            <option value="funded">Funded</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {!data || data.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground" data-testid="ok:invest:offerings:empty:US-093:AC-093-3">
            No offerings available matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((offering) => (
            <div
              key={offering.id}
              className="group flex flex-col rounded-3xl border border-border bg-card overflow-hidden shadow-sm transition-all hover:shadow-md"
              data-testid={`ok:invest:offerings:item:${offering.id}:US-093`}
            >
              <div className="relative h-48 bg-muted">
                 <img 
                   src={`https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80`} 
                   className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                   alt={offering.title}
                 />
                 <div className="absolute top-4 left-4">
                   <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${
                     offering.status === 'open' ? 'bg-emerald-500 text-white' : 'bg-secondary text-secondary-foreground'
                   }`}>
                     {offering.status}
                   </span>
                 </div>
              </div>
              
              <div className="flex flex-1 flex-col p-6">
                <Link to={`/invest/offerings/${offering.id}`}>
                  <h2 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{offering.title}</h2>
                </Link>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{offering.summary}</p>
                
                <div className="mt-6 space-y-4 pt-4 border-t border-border">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-muted-foreground uppercase tracking-tighter">Raised</span>
                      <span>{Math.round((250000 / offering.target_raise) * 100)}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${Math.min(100, (250000 / offering.target_raise) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-muted-foreground">Min Investment</span>
                      <span className="text-sm font-bold">${offering.min_investment.toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] uppercase font-bold text-muted-foreground">Target Raise</span>
                      <span className="text-sm font-bold">${offering.target_raise.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/invest/offerings/${offering.id}`}
                    className="flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
