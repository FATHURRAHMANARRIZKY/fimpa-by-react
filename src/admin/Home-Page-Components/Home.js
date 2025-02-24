import { Layout } from "antd";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "../../api";

const { Content } = Layout;

const Home = ({ onLogout }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      // Token dari cookies seharusnya didapat dengan benar
      const token = Cookies.get("token");
      console.log("Token from cookies:", token);

      if (!token) {
        setError("You are not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        console.log("Sending request to /me...");
        const response = await api.get("/me", {
          withCredentials: true,
        });

        console.log("Received response from /me:", response);

        if (response.data && response.data.username) {
          setUsername(response.data.username);
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        console.error("Error fetching data from /me:", err);
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

  if (loading) {
    return (
      <Content style={{ padding: "20px", minHeight: "280px" }}>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p>Loading...</p>
        </div>
      </Content>
    );
  }

  if (error) {
    return (
      <Content style={{ padding: "20px", minHeight: "280px" }}>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p>{error}</p>
        </div>
      </Content>
    );
  }

  return (
    <Content style={{ padding: "20px", minHeight: "280px" }}>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">
          Welcome {username} to the Admin Panel
        </h2>
        <p className="mt-4">
          Manage your platform here. Add content, users, and more!
        </p>
      </div>
    </Content>
  );
};

export default Home;