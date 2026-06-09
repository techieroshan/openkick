/**
 * @trace US-004, US-013, US-015, US-016
 * Consumer dashboard / Claim Locker
 */
import { Link } from "react-router-dom";
import { Lock, FileText, Bell, CreditCard, Plus } from "lucide-react";
import { useState, useEffect } from "react";

export default function ConsumerDashboardPage() {
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/claims", {
        headers: { "x-user-id": "user-1" }
    })
    .then(res => res.json())
    .then(data => {
        setClaims(data.data || []);
        setLoading(false);
    })
    .catch(err => {
        console.error(err);
        setLoading(false);
    });
  }, []);

  const totalPaid = claims
    .filter(c => c.status === "paid")
    .reduce((acc, c) => acc + (parseFloat(c.amount) || 0), 0);

  return (
    <section className="container mx-auto px-4 py-10" data-testid="ok:consumer:dashboard:root:US-004">
      <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Claim Locker</h1>
            <p className="text-muted-foreground text-lg">Secure vault for your class action claims and proof.</p>
          </div>
          <Link
            to="/eligibility"
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition"
          >
            <Plus className="h-4 w-4" />
            Check New Claim
          </Link>
        </header>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <Lock className="h-5 w-5" />
              <h2 className="font-bold">Total Claims</h2>
            </div>
            <p className="text-3xl font-mono font-bold">{claims.length.toString().padStart(2, '0')}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-green-600">
              <CreditCard className="h-5 w-5" />
              <h2 className="font-bold">Total Paid</h2>
            </div>
            <p className="text-3xl font-mono font-bold">${totalPaid.toFixed(2)}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-yellow-600">
              <Bell className="h-5 w-5" />
              <h2 className="font-bold">Upcoming Deadlines</h2>
            </div>
            <p className="text-3xl font-mono font-bold">{claims.filter(c => c.status !== 'paid').length.toString().padStart(2, '0')}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-blue-600">
              <FileText className="h-5 w-5" />
              <h2 className="font-bold">Missing Proof</h2>
            </div>
            <p className="text-3xl font-mono font-bold">00</p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/50 text-sm font-semibold text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Defendant</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Est. Payout</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">Loading claims...</td></tr>
              ) : claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-muted/30 transition">
                  <td className="px-6 py-4 font-medium">{claim.defendant}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      claim.status === "paid" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">{claim.deadline ? new Date(claim.deadline).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-6 py-4 text-sm font-mono">{claim.amount}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary font-semibold text-sm hover:underline">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && claims.length === 0 && (
            <div className="px-6 py-12 text-center text-muted-foreground">
              No claims saved yet. Start by checking your eligibility.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
