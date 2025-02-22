import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Alert } from 'antd'; // Ant Design
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fungsi untuk menangani submit form login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      // Menyimpan token di localStorage
      localStorage.setItem('token', response.data.token);

      // Panggil onLogin agar parent component tahu jika login berhasil
      onLogin();

      // Redirect ke halaman /admin setelah login berhasil
      navigate('/admin');
    } catch (err) {
      setError('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Sign in to your account</h2>

        {error && <Alert message={error} type="error" className="mb-4" />}

        <form onSubmit={handleSubmit}>
          {/* Input Email */}
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          {/* Input Password */}
          <div className="mb-4">
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button type="primary" htmlType="submit" className="w-full py-2">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;