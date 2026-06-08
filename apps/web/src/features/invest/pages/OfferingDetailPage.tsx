/**
 * @trace US-094, US-095, US-106
 * Offering detail page with invest flow
 */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Offering } from "@openkick/types";

async function fetchOffering(id: string): Promise<Offering> {
  const res = await fetch(`/api/v1/offerings/${id}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

async function invest(offeringId: string, amount: number, riskAck: boolean) {
  const res = await fetch(`/api/v1/offerings/${offeringId}/invest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, payment_method: "ach", risk_ack: riskAck }),
  });
  if (!res.ok) throw new Error("Investment failed");
  return res.json();
}

export default function OfferingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [riskAcknowledged, setRiskAcknowledged] = useState(false);

  const { data: offering, isLoading } = useQuery({
    queryKey: ["offering", id],
    queryFn: () => fetchOffering(id!),
    enabled: !!id,
  });

  const investMutation = useMutation({
    mutationFn: () => invest(id!, Number(amount), riskAcknowledged),
    onSuccess: () => {
      navigate("/dashboard/investor");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!offering) return <div>Offering not found</div>;

  const canInvest = offering.status === "open" && riskAcknowledged && Number(amount) >= offering.min_investment;

  return (
    <div className="container mx-auto px-4 py-8" data-testid="ok:invest:offering:page:root:US-094">
      <div className="bg-yellow-100 border-yellow-400 border p-4 mb-6 rounded" data-testid="ok:invest:offering:risk-banner:US-106:AC-106-2">
        <strong>Risk Warning:</strong> {offering.risk_disclosures}
      </div>
      <h1 className="text-3xl font-bold mb-4">{offering.title}</h1>
      <p className="text-lg mb-6">{offering.summary}</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <strong>Minimum Investment:</strong> ${offering.min_investment}
        </div>
        <div>
          <strong>Target Raise:</strong> ${offering.target_raise.toLocaleString()}
        </div>
        <div>
          <strong>Status:</strong> {offering.status}
        </div>
        <div>
          <strong>Type:</strong> {offering.type}
        </div>
      </div>
      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Invest</h2>
        <div className="space-y-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min={offering.min_investment}
            className="border p-2 rounded w-full"
            data-testid="ok:invest:offering:amount-input:US-095:AC-095-1"
          />
          <button
            onClick={() => setShowRiskModal(true)}
            disabled={!canInvest}
            className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
            data-testid="ok:invest:offering:invest-button:US-094:AC-094-2"
          >
            Invest
          </button>
        </div>
      </div>
      {showRiskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded max-w-md">
            <h3 className="text-xl font-bold mb-4">Risk Acknowledgment</h3>
            <p className="mb-4">{offering.risk_disclosures}</p>
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={riskAcknowledged}
                onChange={(e) => setRiskAcknowledged(e.target.checked)}
                data-testid="ok:invest:offering:risk-ack:US-106:AC-106-1"
              />
              <span className="ml-2">I acknowledge the risks</span>
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowRiskModal(false);
                  if (riskAcknowledged) investMutation.mutate();
                }}
                disabled={!riskAcknowledged}
                className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
                data-testid="ok:invest:offering:confirm-invest:US-095:AC-095-3"
              >
                Confirm Investment
              </button>
              <button
                onClick={() => setShowRiskModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
