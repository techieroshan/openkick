/**
 * @trace US-090, US-091, US-092, US-096, US-097
 * Investor dashboard
 */
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Investor, Investment } from "@openkick/types";

async function fetchInvestor(): Promise<Investor> {
  const res = await fetch("/api/v1/investors/me");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

async function fetchInvestments(): Promise<Investment[]> {
  const res = await fetch("/api/v1/investments");
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data.data || [];
}

export default function InvestorDashboardPage() {
  const { data: investor, isLoading: loadingInvestor } = useQuery({
    queryKey: ["investor"],
    queryFn: fetchInvestor,
  });
  const { data: investments, isLoading: loadingInvestments } = useQuery({
    queryKey: ["investments"],
    queryFn: fetchInvestments,
  });

  if (loadingInvestor || loadingInvestments) return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="h-10 w-64 bg-muted rounded mb-10"></div>
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div className="h-64 bg-muted rounded-3xl"></div>
        <div className="h-96 bg-muted rounded-3xl"></div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10 md:py-14" data-testid="ok:investor:dashboard:page:root:US-096">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-primary">Investor portal</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Your Dashboard</h1>
      </header>
      
      <div className="grid gap-8 lg:grid-cols-[1fr_2.5fr]">
        {/* Profile / Stats */}
        <aside className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Account Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-background p-3 rounded-2xl border border-border">
                <span className="text-xs font-bold text-muted-foreground uppercase">KYC</span>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full capitalize">{investor?.kyc_status}</span>
              </div>
              <div className="flex justify-between items-center bg-background p-3 rounded-2xl border border-border">
                <span className="text-xs font-bold text-muted-foreground uppercase">Accreditation</span>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">{investor?.accreditation_status}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
             <h2 className="text-lg font-bold mb-4">Activity Log</h2>
             <div className="space-y-3">
               <div className="text-xs pb-3 border-b border-border">
                 <p className="font-bold">Login detected</p>
                 <p className="text-muted-foreground mt-0.5">Today at 9:42 AM</p>
               </div>
               <div className="text-xs pb-3 border-b border-border">
                 <p className="font-bold">KYC Verified</p>
                 <p className="text-muted-foreground mt-0.5">Mar 15, 2026</p>
               </div>
             </div>
          </div>
        </aside>

        {/* Portfolio */}
        <section className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold italic">Active Portfolio</h2>
              <Link to="/invest" className="text-sm font-bold text-primary hover:underline">Browse New Deals</Link>
            </div>
            
            {investments && investments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      <th className="pb-4">Asset ID</th>
                      <th className="pb-4">Committed</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {investments.map((inv) => (
                      <tr key={inv.id} className="group">
                        <td className="py-4 font-mono text-xs font-bold">{inv.offering_id}</td>
                        <td className="py-4 font-bold text-sm">${inv.amount.toLocaleString()}</td>
                        <td className="py-4">
                           <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                             inv.status === 'settled' ? 'bg-blue-100 text-blue-700' : 'bg-muted text-muted-foreground'
                           }`}>
                             {inv.status}
                           </span>
                        </td>
                        <td className="py-4 text-xs text-muted-foreground">{new Date(inv.created_at).toLocaleDateString()}</td>
                        <td className="py-4 text-right">
                          <button className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">Statements</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">Your portfolio is currently empty.</p>
                <Link to="/invest" className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground">Start Investing</Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
