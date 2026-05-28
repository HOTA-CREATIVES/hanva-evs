import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminInquiriesPage from "./pages/AdminInquiriesPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Luxury Landing Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Secure Lead Pipeline Dashboard */}
        <Route path="/admin-inquiries" element={<AdminInquiriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
