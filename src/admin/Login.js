import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Axios instance yang telah dikonfigurasi
import { jwtDecode } from "jwt-decode"; // Perbaiki impor

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      if (response.status === 200) {
        const token = response.data.token; // Mengambil token dari respons data

        // Pastikan token tidak disimpan di localStorage
        onLogin(); // Panggil callback onLogin untuk memverifikasi token

        // Redirect berdasarkan role
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;

        if (role === "ADMIN") {
          navigate("/admin");
        } else if (role === "USER") {
          navigate("/");
        }
      }
    } catch (error) {
      setError("Invalid email or password");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="body-login">
      <div className="login-container">
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-title">Login</h1>
          <div className="input-box">
            <i className="bx bxs-user"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <i className="bx bxs-lock-alt"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="register">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
