/**
 * @trace Traceability matrix display
 */
import { useQuery } from "@tanstack/react-query";

interface TraceabilityRow {
  usId: string;
  usTitle: string;
  acId: string;
  acSummary: string;
  pages?: string[];
  components?: string[];
  bffEndpoints?: string[];
  tests?: string[];
  status?: "pass" | "fail" | "pending";
}

async function fetchTraceability(): Promise<TraceabilityRow[]> {
  const res = await fetch("/api/traceability");
  if (!res.ok) return [];
  return res.json();
}

export default function TraceabilityPage() {
  const { data } = useQuery({
    queryKey: ["traceability"],
    queryFn: fetchTraceability,
  });

  return (
    <div className="container mx-auto px-4 py-8" data-testid="ok:traceability:page:root">
      <h1 className="text-3xl font-bold mb-6">Traceability Matrix</h1>
      {data && data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">US ID</th>
                <th className="border p-2">US Title</th>
                <th className="border p-2">AC ID</th>
                <th className="border p-2">AC Summary</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{row.usId}</td>
                  <td className="border p-2">{row.usTitle}</td>
                  <td className="border p-2">{row.acId}</td>
                  <td className="border p-2">{row.acSummary}</td>
                  <td className="border p-2">{row.status || "pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>
          Traceability coverage is currently unavailable for public display. This internal quality view is intended for compliance and product review.
        </p>
      )}
    </div>
  );
}
