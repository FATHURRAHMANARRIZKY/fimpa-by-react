import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("guest");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const response = await api.get("/verify-token", { withCredentials: true });
      if (response.status === 200 && response.data.role) {
        setIsLoggedIn(true);
        setRole(response.data.role);
        const profileResponse = await api.get("/me", { withCredentials: true });
        if (profileResponse.status === 200) {
          setUser(profileResponse.data);
        }
      } else {
        setIsLoggedIn(false);
        setRole("guest");
        setUser(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setRole("guest");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, user, verifyToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);