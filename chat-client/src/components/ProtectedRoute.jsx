import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function checkAuth() {
      try {
        await axios.get("http://localhost:3000/auth/me", {
          withCredentials: true,
        });

        setStatus("auth");
      } catch {
        setStatus("unauth");
      }
    }
    checkAuth();
  }, []);

  if (status === "loading")
    return (
      <div>
        <Spinner />
      </div>
    );
  if (status === "unauth") return <Navigate to="/signup" replace />;
  return children;
}

export default ProtectedRoute;
