import React, { useEffect, useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./auth/Login";
import ContentHome from "./components/Content";
import api from "./api";
import { AuthContext } from "./context/AuthContext";
import HomePage from "./admin/HomePage";
import NotFound from "./NotFound";
import { Spin } from "antd";
import Register from "./auth/Register";
import ProfilePage from "./auth/ProfilePage";
import ReviewsPage from "./components/content-components/ReviewPage";

export default function App() {
  const { isLoggedIn, role, loading, verifyToken, setIsLoggedIn } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // Check token on initial load
  useEffect(() => {
    const verify = async () => {
      await verifyToken();
    };
    verify();
  }, [verifyToken]);

  const handleLogin = () => {
    verifyToken(); // Verifikasi token setelah login (can be omitted if auto-verified on page load)
  };

  const handleLogout = async () => {
    console.log("Logout function called");
    try {
      await api.post("/logout", {}, { withCredentials: true });
      console.log("API logout request successful");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Show loading spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" /> {/* Removed the `tip` prop */}
      </div>
    );
  }

  return (
    <Routes>
      {/* Home route */}
      <Route path="/" element={<ContentHome role={role} />} />

      {/* Login route */}
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to={role === "ADMIN" ? "/admin" : "/"} />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* Admin route */}
      <Route
        path="/admin"
        element={
          isLoggedIn && role === "ADMIN" ? (
            <HomePage onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/register"
        element={
          isLoggedIn ? (
            <Navigate to={role === "ADMIN" ? "/admin" : "/"} />
          ) : (
            <Register />
          )
        }
      />

      <Route
        path="/:email"
        element={
          isLoggedIn && role === "USER" ? (
            <ProfilePage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="/reviews" element={<ReviewsPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
