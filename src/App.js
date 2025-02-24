import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./admin/Login";
import ContentHome from "./components/Content";
import api from "./api";
import { AuthContext } from "./context/AuthContext";
import HomePage from "./admin/HomePage"; // Import HomePage
import NotFound from "./NotFound"; // Import NotFound

export default function App() {
  const { isLoggedIn, role, loading, verifyToken, setIsLoggedIn } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      await verifyToken();
    };
    verify();
  }, [verifyToken]);

  const handleLogin = () => {
    verifyToken(); // Verifikasi token setelah login
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

  if (loading) {
    return <div>Loading...</div>; // Tampilkan indikator loading jika perlu
  }

  return (
    <Routes>
      <Route path="/" element={<ContentHome role={role} />} />
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
      {/* Tambahkan Route untuk 404 Not Found sebagai Route terakhir */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}