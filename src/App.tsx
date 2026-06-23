import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminInquiriesPage from "./pages/AdminInquiriesPage";
import ContactPage from "./pages/ContactPage";
import FloatingHelpers from "./components/ui/FloatingHelpers";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Luxury Landing Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Secure Lead Pipeline Dashboard */}
        <Route path="/admin-inquiries" element={<AdminInquiriesPage />} />

        {/* Detailed Client Consultation Form Route */}
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {/* Global Luxury Floating Concierge & Scroll Tools */}
      <FloatingHelpers />
    </Router>
  );
}

export default App;
