import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { verifyToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        await verifyToken();
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login gagal:", error);
      toast.error("Login gagal! Periksa username dan password.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;