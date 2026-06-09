/**
 * @trace US-006, US-007, US-008, US-009, US-010, US-011
 * Eligibility checker page with multi-modal input.
 */
import { useState } from "react";

type CheckerMode = "paste" | "upload" | "survey";

export default function EligibilityPage() {
  const [mode, setMode] = useState<CheckerMode>("paste");
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setResults(null);
    try {
      const response = await fetch("/api/v1/eligibility/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: mode === "paste" ? inputText : "Simulated PDF content",
          type: mode === "upload" ? "pdf" : "text"
        }),
      });
      const data = await response.json();
      // Delay slightly for UX
      setTimeout(() => {
        setResults(data);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 md:py-14" data-testid="ok:eligibility:page:root:US-006">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Eligibility</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Know if you're eligible in seconds</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Paste a settlement notice, upload a PDF, or answer a few questions to see if you can claim money.
          </p>
        </div>

        <div className="mb-8 flex justify-center gap-1 rounded-full bg-muted p-1 sm:w-fit sm:mx-auto">
          {(["paste", "upload", "survey"] as CheckerMode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setResults(null); }}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                mode === m ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          {mode === "paste" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium">Paste Notice Text</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste the text from your settlement email or physical notice here..."
                className="min-h-48 w-full rounded-2xl border border-border bg-background p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                data-testid="ok:eligibility:checker:paste:US-006:AC-006-1"
              />
            </div>
          )}

          {mode === "upload" && (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl p-12 py-16 space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-semibold">Drop your PDF notice here</p>
                <p className="text-xs text-muted-foreground mt-1">Maximum file size: 10MB</p>
              </div>
              <input type="file" className="hidden" id="pdf-upload" accept="application/pdf" />
              <label htmlFor="pdf-upload" className="cursor-pointer rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Select File
              </label>
            </div>
          )}

          {mode === "survey" && (
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <p className="font-medium">Which product or service are you checking for?</p>
                <input type="text" placeholder="e.g., Example Corp Service" className="w-full rounded-xl border border-border bg-background px-4 py-2" />
              </div>
              <div className="space-y-4">
                <p className="font-medium">When did you use this service?</p>
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="rounded-xl border border-border bg-background px-4 py-2 text-sm" />
                  <input type="date" className="rounded-xl border border-border bg-background px-4 py-2 text-sm" />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleCheck}
            disabled={loading || (mode === "paste" && !inputText)}
            className="mt-8 w-full rounded-full bg-primary px-5 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50"
            data-testid="ok:eligibility:checker:submit:US-006:AC-006-3"
          >
            {loading ? "Analyzing..." : "Check My Eligibility"}
          </button>
        </div>

        {results && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-emerald-900">Eligibility Results</h2>
                <div className="text-right">
                  <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Confidence Score</span>
                  <p className="text-2xl font-black text-emerald-600">{(results.confidence * 100).toFixed(0)}%</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="bg-white/80 rounded-2xl p-4 shadow-sm border border-emerald-100">
                    <h3 className="text-xs font-bold text-emerald-800 uppercase mb-2">Likely Case Match</h3>
                    <p className="font-bold text-emerald-900">{results.matchCase.title}</p>
                    <a href={results.matchCase.officialLink} target="_blank" className="text-sm text-primary underline mt-2 inline-block">Official Settlement Site</a>
                  </div>
                  <div className="bg-white/80 rounded-2xl p-4 shadow-sm border border-emerald-100">
                    <h3 className="text-xs font-bold text-emerald-800 uppercase mb-2">Class Definition</h3>
                    <p className="text-sm text-emerald-800">{results.extracted.classDefinition}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/80 rounded-2xl p-4 shadow-sm border border-emerald-100">
                      <h3 className="text-xs font-bold text-emerald-800 uppercase mb-1">Status</h3>
                      <p className="text-lg font-bold text-emerald-900">Eligible</p>
                    </div>
                    <div className="bg-white/80 rounded-2xl p-4 shadow-sm border border-emerald-100">
                      <h3 className="text-xs font-bold text-emerald-800 uppercase mb-1">Proof Needed</h3>
                      <p className="text-lg font-bold text-emerald-900">{results.extracted.proofNeeded ? "Yes" : "No"}</p>
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-2xl p-4 shadow-sm border border-emerald-100">
                    <h3 className="text-xs font-bold text-emerald-800 uppercase mb-1">Estimated Award</h3>
                    <p className="text-lg font-bold text-emerald-900">$10 - $250</p>
                  </div>
                  <button className="w-full rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700">
                    Add to My Claim Locker
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
