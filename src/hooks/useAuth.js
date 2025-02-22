import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/verify-token", {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.role) {
        setIsLoggedIn(true);
        setRole(response.data.role);
        localStorage.setItem("role", response.data.role);
      } else {
        setIsLoggedIn(false);
        setRole("guest");
        localStorage.removeItem("role");
      }
    } catch (error) {
      setIsLoggedIn(false);
      setRole("guest");
      localStorage.removeItem("role");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, loading, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};