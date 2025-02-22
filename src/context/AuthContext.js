import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const response = await api.get(
        "/verify-token",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 && response.data.role) {
        setIsLoggedIn(true);
        setRole(response.data.role);
      } else {
        setIsLoggedIn(false);
        setRole("guest");
      }
    } catch (error) {
      setIsLoggedIn(false);
      setRole("guest");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, loading, verifyToken, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};