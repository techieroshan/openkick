/**
 * @trace US-001
 * Primary navigation header
 */
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      className="border-b"
      data-testid="ok:nav:header:root"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold"
          data-testid="ok:nav:logo:click:US-001"
        >
          Openkick
        </Link>
        <div className="flex gap-4">
          <Link
            to="/cases"
            data-testid="ok:nav:cases:click:US-001"
          >
            Cases
          </Link>
          <Link
            to="/eligibility"
            data-testid="ok:nav:eligibility:click:US-006"
          >
            Eligibility
          </Link>
          <Link
            to="/invest"
            data-testid="ok:nav:invest:click:US-093"
          >
            Invest
          </Link>
          <Link
            to="/lawyers"
            data-testid="ok:nav:lawyers:click:US-021"
          >
            Find a Lawyer
          </Link>
          <Link
            to="/activism"
            data-testid="ok:nav:activism:click:US-021"
          >
            Activism Portal
          </Link>
          <Link
            to="/contact"
            data-testid="ok:nav:contact:click:US-001"
          >
            Contact
          </Link>
          <Link
            to="/privacy"
            data-testid="ok:nav:privacy:click:US-001"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            data-testid="ok:nav:terms:click:US-001"
          >
            Terms
          </Link>
        </div>
      </nav>
    </header>
  );
}
