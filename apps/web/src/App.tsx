/**
 * @trace US-001..US-107
 * Main app router and layout
 */
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./features/home/pages/HomePage";
import SettlementsPage from "./features/settlements/pages/SettlementsPage";
import EligibilityPage from "./features/eligibility/pages/EligibilityPage";
import TraceabilityPage from "./features/traceability/pages/TraceabilityPage";
import InvestPage from "./features/invest/pages/InvestPage";
import OfferingDetailPage from "./features/invest/pages/OfferingDetailPage";
import InvestorDashboardPage from "./features/investor/pages/InvestorDashboardPage";
import ContactPage from "./features/contact/pages/ContactPage";
import ActivismPortalPage from "./features/activism/pages/ActivismPortalPage";
import LawyersPage from "./features/lawyers/pages/LawyersPage";
import PrivacyPage from "./features/legal/pages/PrivacyPage";
import TermsPage from "./features/legal/pages/TermsPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cases" element={<SettlementsPage />} />
        <Route path="/eligibility" element={<EligibilityPage />} />
        <Route path="/traceability" element={<TraceabilityPage />} />
        <Route path="/invest" element={<InvestPage />} />
        <Route path="/invest/offerings/:id" element={<OfferingDetailPage />} />
        <Route path="/dashboard/investor" element={<InvestorDashboardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/activism" element={<ActivismPortalPage />} />
        <Route path="/lawyers" element={<LawyersPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
