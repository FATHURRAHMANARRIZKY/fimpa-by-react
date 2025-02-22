import { Layout } from 'antd';
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Ensure we get the token from the cookie
import api from '../../api';

const { Content } = Layout;

const Home = ({ onLogout }) => {
    const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      // Get the JWT token from cookies
      const token = Cookies.get("token");
      if (!token) {
        setError("You are not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch user data from the /me endpoint, sending the token in the Authorization header
        const response = await api.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        });

        if (response.data && response.data.username) {
          setUsername(response.data.username); // Set username from response data
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        // Handle API errors
        if (err.response && err.response.status === 401) {
          setError("You are not authenticated. Please log in.");
        } else {
          setError("An error occurred while fetching user data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
    return (
        <Content style={{ padding: '20px', minHeight: '280px' }}>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">Welcome {`${username}`} to the Admin Panel</h2>
                <p className="mt-4">Manage your platform here. Add content, users, and more!</p>
            </div>
        </Content>
    );
};

export default Home;