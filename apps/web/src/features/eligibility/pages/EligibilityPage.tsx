/**
 * @trace US-006, US-007, US-008
 * Eligibility checker page
 */
import { useState } from "react";

export default function EligibilityPage() {
  const [text, setText] = useState("");

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="ok:eligibility:page:root:US-006"
    >
      <h1 className="text-3xl font-bold mb-6">Check Eligibility</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste settlement notice text here..."
        className="w-full p-4 border rounded"
        rows={10}
        data-testid="ok:eligibility:checker:paste:US-006:AC-006-1"
      />
      <button
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
        data-testid="ok:eligibility:checker:submit:US-006:AC-006-3"
      >
        Check Eligibility
      </button>
    </div>
  );
}
