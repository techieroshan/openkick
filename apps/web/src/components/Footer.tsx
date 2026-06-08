/**
 * @trace US-001
 * Footer with links
 */
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t mt-auto py-8" data-testid="ok:nav:footer:root">
      <div className="container mx-auto flex flex-col gap-3 px-4 text-center text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© 2026 Openkick. All rights reserved.</p>
        <nav className="flex justify-center gap-4" aria-label="Footer links">
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
