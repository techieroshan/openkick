/**
 * @trace US-032
 * Settlement Administrator dashboard.
 */
import { Megaphone, Users, CheckCircle, TrendingUp } from "lucide-react";

export default function SettlementAdminPage() {
  return (
    <section className="container mx-auto px-4 py-10" data-testid="ok:admin:settlement:root:US-032">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Administrator Portal</h1>
        <p className="text-muted-foreground text-lg">Promote settlements and monitor class member engagement.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-orange-600">
            <Megaphone className="h-6 w-6" />
            <h2 className="font-bold">Active Campaigns</h2>
          </div>
          <p className="text-4xl font-mono font-bold">04</p>
          <p className="text-xs text-muted-foreground mt-2">Promoting 3 verified settlements</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <Users className="h-6 w-6" />
            <h2 className="font-bold">Total Reach</h2>
          </div>
          <p className="text-4xl font-mono font-bold">14.2k</p>
          <p className="text-xs text-muted-foreground mt-2">Verified users reached this month</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-green-600">
            <CheckCircle className="h-6 w-6" />
            <h2 className="font-bold">Claim Accuracy</h2>
          </div>
          <p className="text-4xl font-mono font-bold">98.4%</p>
          <p className="text-xs text-muted-foreground mt-2">Low fraud rate from Openkick users</p>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Promote Settlement (US-032)</h3>
          <span className="text-sm font-semibold text-primary">Preview Promotion</span>
        </div>
        
        <form className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-sm">
            <div>
              <label htmlFor="case-select" className="block font-medium mb-1">Select Case</label>
              <select id="case-select" className="w-full rounded-xl border border-border bg-background px-3 py-2">
                <option>Meta Privacy Settlement</option>
                <option>Apple Battery Gate</option>
                <option>Google Location Tracking</option>
              </select>
            </div>
            <div>
              <label htmlFor="budget-input" className="block font-medium mb-1">Campaign Budget</label>
              <input id="budget-input" type="text" placeholder="$5,000" className="w-full rounded-xl border border-border bg-background px-3 py-2" />
            </div>
            <div>
              <label htmlFor="criteria-input" className="block font-medium mb-1">Target Criteria</label>
              <div id="criteria-input" className="flex flex-wrap gap-2 mt-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">California Only</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Age 18-35</span>
                <span className="bg-muted px-3 py-1 rounded-full text-xs font-bold">+ Add Criteria</span>
              </div>
            </div>
          </div>
          <div className="bg-muted/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <TrendingUp className="h-10 w-10 text-muted-foreground mb-3" />
            <h4 className="font-bold mb-1">Estimated Impact</h4>
            <p className="text-sm text-muted-foreground">Based on your target criteria, we estimate 1,200 - 1,800 qualified claimants will see this promotion.</p>
            <button className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition">
              Launch Campaign
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}