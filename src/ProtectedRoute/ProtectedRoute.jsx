import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/login", { replace: true });
    }
  }, [currentUser, navigate]);

  return children;
}

export default ProtectedRoute;
