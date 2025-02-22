import { Layout, Spin, Alert } from "antd";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Ensure we get the token from the cookie
import api from "../../api";

const { Header } = Layout;

const HeaderComponent = () => {
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
  }, []); // Empty dependency array ensures this effect runs only once when the component is mounted

  return (
    <Header className="bg-indigo-600 text-white shadow-md py-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold truncate">Admin Dashboard</div>
        <div className="flex items-center space-x-4">
          {loading ? (
            <Spin /> // Show a loading spinner
          ) : error ? (
            <Alert message={error} type="error" showIcon className="w-full" />
          ) : (
            <span className="text-sm truncate">{`Welcome, ${username}`}</span>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;