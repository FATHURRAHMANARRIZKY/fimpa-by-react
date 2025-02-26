import { Layout } from "antd";
import { useState, useEffect } from "react";
import api from "../../api";

const { Content } = Layout;

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/me", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setProfile(response.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setProfile(null);
      }
    };

    fetchProfile();
  }, []);

  const Name = isLoggedIn && profile ? profile.username : "error";

  return (
    <Content style={{ padding: "20px", minHeight: "280px" }}>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">
          Welcome {Name} to the Admin Panel
        </h2>
        <p className="mt-4">
          Manage your platform here. Add content, users, and more!
        </p>
      </div>
    </Content>
  );
};
export default Home;
