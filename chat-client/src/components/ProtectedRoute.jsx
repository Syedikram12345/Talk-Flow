import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import getProfile from "../utils/getProfile";

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        setUser(getProfile());
        // const res = await axios.get("http://localhost:3000/auth/me", {
        //   withCredentials: true,
        // });
        // console.log("response:", res);

        // setUser(res.data.email);

        setStatus("auth");
      } catch {
        setStatus("unauth");
      }
    }
    checkAuth();
  }, []);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauth") return <Navigate to="/signup" replace />;
  return children;
}

export default ProtectedRoute;
