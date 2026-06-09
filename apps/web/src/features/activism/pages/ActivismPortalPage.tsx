/**
 * @trace US-017, US-021, US-022
 * Activism and funding portal for potential class action submissions.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ActivismIntakeValues {
  name: string;
  email: string;
  phone: string;
  issue: string;
  facts: string;
  defendants: string;
  evidence: FileList | null;
}

export default function ActivismPortalPage() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ActivismIntakeValues>();

  const onSubmit = async (data: ActivismIntakeValues) => {
    setLoading(true);
    try {
      // Simulate API call for now, could be same contact endpoint with topic="activism"
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          topic: "activism",
          message: `Issue: ${data.issue}\nDefendants: ${data.defendants}\n\nFacts:\n${data.facts}`,
        }),
      });
      const result = await response.json();
      setSubmitted(result.referenceId);
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-10 md:py-14" data-testid="ok:activism:page:root">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <article className="space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Activism portal</p>
          <h1 className="text-4xl font-bold tracking-tight">Investigative Intake: Submit a Potential Class Action</h1>
          <p className="text-lg text-muted-foreground">
            Openkick provides a secure channel for whistleblowers, consumer advocates, and impacted groups to submit evidence of systemic harm. We review submissions for funding, legal representation, and public awareness campaigns.
          </p>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Intake Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-medium" htmlFor="name">
                  Full Name
                  <input
                    id="name"
                    className="rounded-xl border border-border bg-background px-3 py-2"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="text-xs text-rose-700">{errors.name.message}</p>}
                </label>
                <label className="grid gap-1 text-sm font-medium" htmlFor="email">
                  Secure Email
                  <input
                    id="email"
                    type="email"
                    className="rounded-xl border border-border bg-background px-3 py-2"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <p className="text-xs text-rose-700">{errors.email.message}</p>}
                </label>
              </div>

              <label className="grid gap-1 text-sm font-medium" htmlFor="issue">
                Primary Issue (e.g., Hidden Fees, Privacy Breach, Safety Defect)
                <input
                  id="issue"
                  className="rounded-xl border border-border bg-background px-3 py-2"
                  {...register("issue", { required: "Issue is required" })}
                />
              </label>

              <label className="grid gap-1 text-sm font-medium" htmlFor="defendants">
                Likely Defendants (Company Name)
                <input
                  id="defendants"
                  className="rounded-xl border border-border bg-background px-3 py-2"
                  {...register("defendants", { required: "Defendant info is required" })}
                />
              </label>

              <label className="grid gap-1 text-sm font-medium" htmlFor="facts">
                Summary of Facts & Evidence
                <textarea
                  id="facts"
                  className="min-h-32 rounded-xl border border-border bg-background px-3 py-2"
                  placeholder="Describe the harm, when it happened, and what proof exists (receipts, internal docs, etc.)"
                  {...register("facts", { required: "Facts are required" })}
                />
                {errors.facts && <p className="text-xs text-rose-700">{errors.facts.message}</p>}
              </label>

              <label className="grid gap-1 text-sm font-medium" htmlFor="evidence">
                Upload Evidence (PDF, Images)
                <input
                  id="evidence"
                  type="file"
                  multiple
                  className="rounded-xl border border-border bg-background px-3 py-2"
                  {...register("evidence")}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit for Investigation"}
              </button>

              {submitted && (
                <div className="mt-4 rounded-xl bg-emerald-50 p-4 border border-emerald-200">
                  <p className="text-sm font-medium text-emerald-800">Submission Received Successfully.</p>
                  <p className="text-xs text-emerald-700 mt-1">Your investigation reference is: <span className="font-mono font-bold">{submitted}</span>. We will contact you securely if additional information is needed.</p>
                </div>
              )}
            </form>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
              alt="Legal documents and scales of justice"
              className="mb-4 h-40 w-full rounded-2xl object-cover"
            />
            <h2 className="text-xl font-semibold">How it works</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-bold text-primary">1.</span>
                <span>Review: Our investigative team analyzes the scale and impact of the harm.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">2.</span>
                <span>Funding: Meritorious cases are evaluated for litigation funding to ensure no cost to the whistleblowers.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">3.</span>
                <span>Representation: We bridge the gap to top-tier plaintiff firms specialized in the specific category.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">4.</span>
                <span>Action: The case is filed, and a public awareness site is launched on Openkick.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-primary/10 bg-primary/5 p-6 shadow-sm">
            <h3 className="font-bold">Privacy First</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Submissions are encrypted and reviewed only by authorized investigators. Your identity will never be shared without your explicit consent.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
