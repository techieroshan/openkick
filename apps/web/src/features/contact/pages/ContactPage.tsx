/**
 * @trace US-001
 * Contact page for secure public inquiries.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  organization: string;
  topic: string;
  message: string;
  attachments: FileList | null;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: { topic: "general" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitting(true);
    setError(null);
    setSubmitted(null);

    const files = Array.from(data.attachments ?? []);

    if (files.some((file) => file.size > 5 * 1024 * 1024)) {
      setError("One or more files exceed the 5MB size limit.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          organization: data.organization,
          topic: data.topic,
          message: data.message,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit contact form.");
      
      const result = await response.json();
      setSubmitted(result.referenceId);
      reset();
    } catch (_err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-10 md:py-14" data-testid="ok:contact:page:root:US-001">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <article className="space-y-4">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Contact us</p>
          <h1 className="text-4xl font-bold tracking-tight">Contact us</h1>
          <p className="text-lg text-muted-foreground">
            Use this form for public inquiries, claim support questions, activism reports, and funding-intake requests. We do not publish email addresses on the site and keep all messaging routed through a single intake process.
          </p>
          <p className="text-sm text-muted-foreground">
            The page is intentionally structured to reduce friction, preserve privacy, and give visitors a clear path to the next step without exposing personal contact details.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Intake is handled through the secure form only.</li>
            <li>• We minimize data collection and keep the request scoped.</li>
            <li>• Responses are routed through the public support workflow.</li>
          </ul>
        </article>

        <aside className="rounded-3xl border border-border bg-card p-4 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
            alt="Support team reviewing a public inquiry in a secure workspace"
            className="h-48 w-full rounded-2xl object-cover"
          />
          <p className="mt-3 text-sm text-muted-foreground">A secure, responsive intake flow for questions about claims, settlements, and investor guidance.</p>
        </aside>

        <form
          className="rounded-3xl border border-border bg-card p-6 shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
          data-testid="ok:contact:form:root"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-sm font-medium" htmlFor="name">
              Your name
              <input
                id="name"
                className="rounded-xl border border-border bg-background px-3 py-2"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-xs text-rose-700" role="alert">{errors.name.message}</p>}
            </label>
            <label className="grid gap-1 text-sm font-medium" htmlFor="email">
              Email address
              <input
                id="email"
                type="email"
                className="rounded-xl border border-border bg-background px-3 py-2"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && <p className="text-xs text-rose-700" role="alert">{errors.email.message}</p>}
            </label>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-sm font-medium" htmlFor="phone">
              Contact number
              <input
                id="phone"
                type="tel"
                className="rounded-xl border border-border bg-background px-3 py-2"
                {...register("phone", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^\+?[0-9\s()-]{7,20}$/,
                    message: "Enter a valid phone number",
                  },
                })}
              />
              {errors.phone && <p className="text-xs text-rose-700" role="alert">{errors.phone.message}</p>}
            </label>
            <label className="grid gap-1 text-sm font-medium" htmlFor="organization">
              Organization
              <input
                id="organization"
                className="rounded-xl border border-border bg-background px-3 py-2"
                {...register("organization")}
              />
            </label>
          </div>
          <label className="mt-4 grid gap-1 text-sm font-medium" htmlFor="topic">
            Topic
            <select id="topic" className="rounded-xl border border-border bg-background px-3 py-2" {...register("topic")}
            >
              <option value="general">General inquiry</option>
              <option value="claim">Claim support</option>
              <option value="activism">Activism and funding</option>
              <option value="investor">Investor question</option>
            </select>
          </label>
          <label className="mt-4 grid gap-1 text-sm font-medium" htmlFor="message">
            Message
            <textarea
              id="message"
              className="min-h-32 rounded-xl border border-border bg-background px-3 py-2"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && <p className="text-xs text-rose-700" role="alert">{errors.message.message}</p>}
          </label>
          <label className="mt-4 grid gap-1 text-sm font-medium" htmlFor="attachments">
            Attachments
            <input
              id="attachments"
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              className="rounded-xl border border-border bg-background px-3 py-2"
              {...register("attachments")}
            />
            <span className="text-xs text-muted-foreground">Up to 8 files, 5 MB each.</span>
          </label>
          <button 
            className="mt-6 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50" 
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Send request"}
          </button>
          {error && <p className="mt-3 text-sm text-rose-700">{error}</p>}
          {submitted && (
            <div className="mt-3 rounded-xl bg-emerald-50 p-4 border border-emerald-200">
              <p className="text-sm text-emerald-800 font-medium">Thank you. Your request has been recorded.</p>
              <p className="text-xs text-emerald-700 mt-1">Reference ID: <span className="font-mono font-bold">{submitted}</span></p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
