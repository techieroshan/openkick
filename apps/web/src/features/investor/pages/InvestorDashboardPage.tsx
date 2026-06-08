/**
 * @trace US-090, US-091, US-092, US-096, US-097
 * Investor dashboard
 */
import { useQuery } from "@tanstack/react-query";
import { Investor, Investment } from "@openkick/types";

async function fetchInvestor(): Promise<Investor> {
  const res = await fetch("/api/v1/investors/me");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

async function fetchInvestments(): Promise<Investment[]> {
  const res = await fetch("/api/v1/investments");
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data.data || [];
}

export default function InvestorDashboardPage() {
  const { data: investor } = useQuery({
    queryKey: ["investor"],
    queryFn: fetchInvestor,
  });
  const { data: investments } = useQuery({
    queryKey: ["investments"],
    queryFn: fetchInvestments,
  });

  return (
    <div className="container mx-auto px-4 py-8" data-testid="ok:investor:dashboard:page:root:US-096">
      <h1 className="text-3xl font-bold mb-6">Investor Dashboard</h1>
      {investor && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-2">
            <div>
              <strong>KYC Status:</strong> {investor.kyc_status}
            </div>
            <div>
              <strong>Accreditation Status:</strong> {investor.accreditation_status}
            </div>
          </div>
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
        {investments && investments.length > 0 ? (
          <ul className="space-y-4">
            {investments.map((inv) => (
              <li key={inv.id} className="border p-4 rounded">
                <div>
                  <strong>Amount:</strong> ${inv.amount}
                </div>
                <div>
                  <strong>Status:</strong> {inv.status}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No investments yet.</p>
        )}
      </div>
    </div>
  );
}
