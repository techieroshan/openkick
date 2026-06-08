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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading offerings</div>;

  return (
    <div className="container mx-auto px-4 py-8" data-testid="ok:invest:page:root:US-093">
      <h1 className="text-3xl font-bold mb-6">Investment Offerings</h1>
      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OfferingStatus | "")}
          className="border p-2 rounded"
          data-testid="ok:invest:offerings:filter:status:US-093:AC-093-2"
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="funded">Funded</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      {!data || data.length === 0 ? (
        <p data-testid="ok:invest:offerings:empty:US-093:AC-093-3">
          No offerings available.
        </p>
      ) : (
        <ul className="space-y-4">
          {data.map((offering) => (
            <li
              key={offering.id}
              className="border p-4 rounded"
              data-testid={`ok:invest:offerings:item:${offering.id}:US-093`}
            >
              <Link to={`/invest/offerings/${offering.id}`}>
                <h2 className="font-semibold text-lg">{offering.title}</h2>
                <p className="text-sm text-muted-foreground">{offering.summary}</p>
                <div className="mt-2 flex gap-4 text-sm">
                  <span>Status: {offering.status}</span>
                  <span>Min: ${offering.min_investment}</span>
                  <span>Target: ${offering.target_raise.toLocaleString()}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
