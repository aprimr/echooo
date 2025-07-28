import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import LoginPage from "./auth/LoginPage";
import LandingPage from "./pages/LandingPage";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import LoginError from "./pages/errors/LoginError";
import useAuthStore from "./store/auth";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/errors/NotFound";
import ProfilePage from "./pages/Profile";
import Layout from "./pages/chats/Layout";

function App() {
  const { checkAuthStatus } = useAuthStore();

  useEffect(() => {
    const unsubscribe = checkAuthStatus();

    return () => unsubscribe();
  }, [checkAuthStatus]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* *** ProtectedRoute */}
        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="/error/login" element={<LoginError />} />
        <Route path="/terms&privacy" element={<TermsAndPrivacy />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
