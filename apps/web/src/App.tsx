/**
 * @trace US-001..US-107
 * Main app router and layout
 */
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const HomePage = lazy(() => import("./features/home/pages/HomePage"));
const SettlementsPage = lazy(() => import("./features/settlements/pages/SettlementsPage"));
const EligibilityPage = lazy(() => import("./features/eligibility/pages/EligibilityPage"));
const TraceabilityPage = lazy(() => import("./features/traceability/pages/TraceabilityPage"));
const InvestPage = lazy(() => import("./features/invest/pages/InvestPage"));
const OfferingDetailPage = lazy(() => import("./features/invest/pages/OfferingDetailPage"));
const InvestorDashboardPage = lazy(() => import("./features/investor/pages/InvestorDashboardPage"));
const ContactPage = lazy(() => import("./features/contact/pages/ContactPage"));
const ActivismPortalPage = lazy(() => import("./features/activism/pages/ActivismPortalPage"));
const LawyersPage = lazy(() => import("./features/lawyers/pages/LawyersPage"));
const PrivacyPage = lazy(() => import("./features/legal/pages/PrivacyPage"));
const TermsPage = lazy(() => import("./features/legal/pages/TermsPage"));
const LoginPage = lazy(() => import("./features/auth/pages/LoginPage"));
const SignupPage = lazy(() => import("./features/auth/pages/SignupPage"));
const ConsumerDashboardPage = lazy(() => import("./features/consumer/pages/ConsumerDashboardPage"));
const SettingsPage = lazy(() => import("./features/consumer/pages/SettingsPage"));
const AttorneyDashboardPage = lazy(() => import("./features/attorney/pages/AttorneyDashboardPage"));
const SettlementAdminPage = lazy(() => import("./features/admin/pages/SettlementAdminPage"));

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="container mx-auto px-4 py-10 animate-pulse bg-muted rounded-3xl h-64" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cases" element={<SettlementsPage />} />
          <Route path="/eligibility" element={<EligibilityPage />} />
          <Route path="/traceability" element={<TraceabilityPage />} />
          <Route path="/invest" element={<InvestPage />} />
          <Route path="/invest/offerings/:id" element={<OfferingDetailPage />} />
          <Route
            path="/dashboard/investor"
            element={
              <ProtectedRoute requiredRole="investor">
                <InvestorDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/consumer"
            element={
              <ProtectedRoute requiredRole="consumer">
                <ConsumerDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/attorney"
            element={
              <ProtectedRoute requiredRole="attorney">
                <AttorneyDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute requiredRole={["admin", "website_admin"]}>
                <SettlementAdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="/settings/privacy" element={<SettingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/activism" element={<ActivismPortalPage />} />
          <Route path="/lawyers" element={<LawyersPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
