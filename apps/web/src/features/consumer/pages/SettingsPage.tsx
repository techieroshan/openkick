/**
 * @trace US-005
 * Privacy choices and data management page.
 */
import { useState } from "react";
import { Shield, Download, Trash2, Check } from "lucide-react";

export default function SettingsPage() {
  const [consents, setConsents] = useState([
    { id: "1", title: "Law Firm Outreach", description: "Allow verified law firms to contact me about similar cases.", granted: true, timestamp: "2026-06-01 10:24 AM" },
    { id: "2", title: "Activity Tracking", description: "Collect anonymous usage data to improve the platform.", granted: false, timestamp: "N/A" },
    { id: "3", title: "Email Notifications", description: "Receive weekly digests and deadline alerts.", granted: true, timestamp: "2026-06-01 10:24 AM" },
  ]);

  const toggleConsent = (id: string) => {
    setConsents(consents.map(c => 
      c.id === id ? { ...c, granted: !c.granted, timestamp: !c.granted ? new Date().toLocaleString() : "N/A" } : c
    ));
  };

  return (
    <section className="container mx-auto px-4 py-10 max-w-4xl" data-testid="ok:settings:privacy:root:US-005">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Privacy & Data Management</h1>
        <p className="text-muted-foreground text-lg">Manage your consents, download your data, or exercise your right to be forgotten.</p>
      </header>

      <div className="space-y-6">
        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Your Consents</h2>
          </div>
          <div className="divide-y divide-border">
            {consents.map((consent) => (
              <div key={consent.id} className="py-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold">{consent.title}</h3>
                  <p className="text-sm text-muted-foreground">{consent.description}</p>
                  {consent.granted && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Granted on {consent.timestamp}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => toggleConsent(consent.id)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    consent.granted ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      consent.granted ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <button className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card p-6 shadow-sm hover:bg-muted/50 transition">
            <Download className="h-5 w-5 text-primary" />
            <div className="text-left">
              <span className="block font-bold">Download Data</span>
              <span className="block text-xs text-muted-foreground">Get a ZIP of all your claims and proof.</span>
            </div>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 p-6 shadow-sm hover:bg-red-100 transition">
            <Trash2 className="h-5 w-5 text-red-600" />
            <div className="text-left">
              <span className="block font-bold text-red-600">Delete Account</span>
              <span className="block text-xs text-red-500/80">Permanently remove all data from our servers.</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}