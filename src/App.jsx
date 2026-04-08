import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import LanguageSelector from "./components/LanguageSelector";
import Schemes from "./pages/Schemes";
import Devices from "./pages/Devices";
import Technologies from "./pages/Technologies";

// Components
import UserProfile from "./components/UserProfile";
import Update from "./components/Update";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Services from "./pages/Services";
import PhComment from "./pages/ph";

// User Pages
import Feedback from "./pages/Feedback";
import AllFeedbacks from "./pages/AllFeedbacks";
import Guidance from "./pages/Guidance";
import AllGuidance from "./pages/AllGuidance";
import CreateContent from "./pages/CreateContent";
import AllContent from "./pages/AllContent";

// Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import PublicDashboard from "./pages/PublicDashboard";
import ExpertDashboard from "./pages/ExpertDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          {/* Navbar */}
        
          <Navbar />

          {/* Language Selector */}
            

          {/* Main Content */}
          <main className="main-content" style={{ minHeight: "80vh", padding: "20px" }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/ph" element={<PhComment />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/technologies" element={<Technologies />} />

              {/* Protected: User Profile */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/update"
                element={
                  <ProtectedRoute>
                    <Update />
                  </ProtectedRoute>
                }
              />

              {/* Guidance */}
              <Route
                path="/guidance"
                element={
                  <ProtectedRoute>
                    <Guidance />
                  </ProtectedRoute>
                }
              />
              <Route path="/all-guidance" element={<AllGuidance />} />

              {/* Content */}
              <Route
                path="/create-content"
                element={
                  <ProtectedRoute allowedRoles={["admin", "expert"]}>
                    <CreateContent />
                  </ProtectedRoute>
                }
              />
              <Route path="/all-content" element={<AllContent />} />

              {/* Feedback */}
              <Route
                path="/feedback"
                element={
                  <ProtectedRoute>
                    <Feedback />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin/feedbacks" element={<AllFeedbacks />} />

              {/* Dashboards */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/farmer"
                element={
                  <ProtectedRoute allowedRoles={["farmer"]}>
                    <FarmerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/public"
                element={
                  <ProtectedRoute allowedRoles={["public"]}>
                    <PublicDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expert"
                element={
                  <ProtectedRoute allowedRoles={["expert"]}>
                    <ExpertDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;