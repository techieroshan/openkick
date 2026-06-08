/**
 * @trace US-001, US-002, US-003
 * Open settlements listing page
 */
import { useQuery } from "@tanstack/react-query";
import { Settlement } from "@openkick/types";

async function fetchSettlements(): Promise<Settlement[]> {
  const res = await fetch("/api/v1/settlements");
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data.data || [];
}

export default function SettlementsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["settlements"],
    queryFn: fetchSettlements,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading settlements</div>;

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="ok:cases:page:root:US-001"
    >
      <h1 className="text-3xl font-bold mb-6">Open Settlements</h1>
      {!data || data.length === 0 ? (
        <p data-testid="ok:cases:list:empty:US-001:AC-001-3">
          No open settlements available.
        </p>
      ) : (
        <ul className="space-y-4">
          {data.map((settlement) => (
            <li
              key={settlement.id}
              className="border p-4 rounded"
              data-testid={`ok:cases:item:${settlement.id}:US-001`}
            >
              <h2 className="font-semibold">{settlement.title}</h2>
              <p className="text-sm text-muted-foreground">
                {settlement.defendant}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
