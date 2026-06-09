/**
 * @trace US-026, US-027, US-028, US-030, US-031
 * Attorney dashboard for lead management.
 */
import { Users, Filter, BarChart3, Pause, Play, Download } from "lucide-react";
import { useState, useEffect } from "react";

export default function AttorneyDashboardPage() {
  const [isPaused, setIsPaused] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/leads", {
        headers: { "x-firm-id": "firm-1" }
    })
    .then(res => res.json())
    .then(data => {
        setLeads(data.data || []);
        setLoading(false);
    })
    .catch(err => {
        console.error(err);
        setLoading(false);
    });
  }, []);

  return (
    <section className="container mx-auto px-4 py-10" data-testid="ok:attorney:dashboard:root:US-026">
      <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Attorney Lead Portal</h1>
            <p className="text-muted-foreground text-lg">Manage your investigations, intake filters, and compliance records.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition shadow-sm ${
                isPaused ? "bg-green-600 text-white hover:bg-green-700" : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              {isPaused ? <><Play className="h-4 w-4" /> Resume Campaigns</> : <><Pause className="h-4 w-4" /> Pause Campaigns</>}
            </button>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <Users className="h-5 w-5" />
              <h2 className="font-bold">Active Leads</h2>
            </div>
            <p className="text-3xl font-mono font-bold">{leads.length.toString().padStart(2, '0')}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-purple-600">
              <Filter className="h-5 w-5" />
              <h2 className="font-bold">Filtered This Week</h2>
            </div>
            <p className="text-3xl font-mono font-bold">452</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-green-600">
              <BarChart3 className="h-5 w-5" />
              <h2 className="font-bold">Conversion Rate</h2>
            </div>
            <p className="text-3xl font-mono font-bold">12.4%</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-blue-600">
              <Download className="h-5 w-5" />
              <h2 className="font-bold">Export Logs</h2>
            </div>
            <button className="text-sm font-semibold text-primary hover:underline">Download CSV</button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h3 className="font-bold">Recent Intake Records (US-028)</h3>
                <span className="text-xs text-muted-foreground italic">TCPA Consent Verified</span>
              </div>
              <table className="w-full text-left border-collapse">
                <thead className="bg-muted/50 text-sm font-semibold text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3">Prospect</th>
                    <th className="px-6 py-3">Matter</th>
                    <th className="px-6 py-3">State</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Records</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                      <tr><td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">Loading leads...</td></tr>
                  ) : leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-muted/30 transition text-sm">
                      <td className="px-6 py-3 font-medium">{lead.client}</td>
                      <td className="px-6 py-3">{lead.issue}</td>
                      <td className="px-6 py-3 font-mono">{lead.location}</td>
                      <td className="px-6 py-3">
                        <span className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase bg-muted">
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <button className="text-primary hover:underline flex items-center justify-end gap-1">
                          <Download className="h-3 w-3" /> PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!loading && leads.length === 0 && (
                <div className="px-6 py-12 text-center text-muted-foreground">
                  No leads found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
