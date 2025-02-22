import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../hooks/useAuth";

const RequireAuth = ({ role, children }) => {
  const { isLoggedIn, role: userRole } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;