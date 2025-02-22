import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import axios from 'axios';

const { Header } = Layout;

const HeaderComponent = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Tidak perlu mengambil token jika menggunakan session-based authentication
        // Cookie sesi akan dikirim otomatis jika withCredentials: true

        const response = await axios.get('http://localhost:8080/api/users/me', {
          withCredentials: true, // Untuk memastikan cookie dikirim jika menggunakan sesi
        });

        if (response.data && response.data.username) {
          setUsername(response.data.username);
        } else {
          setError('Data pengguna tidak ditemukan');
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Anda tidak terautentikasi. Harap login terlebih dahulu.');
        } else {
          setError('Terjadi kesalahan saat mengambil data pengguna.');
        }
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Header className="bg-indigo-600 text-white flex justify-between items-center px-5 py-3">
      <div className="text-xl">Admin Dashboard</div>
      <div>
        {loading ? (
          'Loading...'
        ) : error ? (
          <span className="text-red-500">{error}</span>
        ) : (
          `Welcome ${username}`
        )}
      </div>
    </Header>
  );
};

export default HeaderComponent;