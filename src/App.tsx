import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import LoginPage from "./auth/LoginPage";
import LandingPage from "./pages/static/LandingPage";
import TermsAndPrivacy from "./pages/static/TermsAndPrivacy";
import LoginError from "./pages/errors/LoginError";
import useAuthStore from "./store/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/errors/NotFound";
import Layout from "./pages/Layout";
import Chats from "./pages/chats/Chats";
import Network from "./pages/network/Network";
import EchoooRoom from "./pages/EchoooRoom";

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

        {/* ProtectedRoute */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <div
                style={{
                  backgroundImage:
                    "url('https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/wac.92a80da2.svg')",
                  backgroundAttachment: "fixed",
                }}
              >
                <Layout />
              </div>
            </ProtectedRoute>
          }
        >
          <Route index element={<div>app</div>} />
          <Route path="home" element={<div>home</div>} />
          <Route path="chats" element={<Chats />} />
          <Route path="network" element={<Network />} />
          <Route path="me" element={<div>ME</div>} />
          <Route path="user/:id" element={<div>user</div>} />
        </Route>

        <Route
          path="/app/chats/echoooroom"
          element={
            <ProtectedRoute>
              <div
                style={{
                  backgroundImage:
                    "url('https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/wac.92a80da2.svg')",
                  backgroundAttachment: "fixed",
                }}
              >
                <EchoooRoom />
              </div>
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
