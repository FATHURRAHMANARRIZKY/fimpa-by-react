import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("guest");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const response = await api.get("/verify-token", {
        withCredentials: true,  // Important: Ensure the cookie is sent
      });

      // Check if token is valid and response contains the role
      if (response.status === 200 && response.data.role) {
        setIsLoggedIn(true);
        setRole(response.data.role);

        // Fetch user profile after token verification
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
      setLoading(false);  // Set loading state to false after verifying
    }
  };

  useEffect(() => {
    verifyToken();  // Trigger token verification when the component mounts
  }, []);  // Empty dependency array ensures it runs once on mount

  // Render loading state while verification is happening
  if (loading) {
    return <div>Loading...</div>;  // You can replace this with a spinner component
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, user, verifyToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};