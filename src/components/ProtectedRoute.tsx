import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth";
import Loading from "./Loading";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading)
    return (
      <Loading
        chatMessage="Loading.."
        message="Please wait a moment till we load the content"
      />
    );

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
