import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./Home-Page-Components/Side-Navbar";
import Home from "./Home-Page-Components/Home";
import ProductPage from "./Home-Page-Components/ProductInput";
import ViewReviews from "./Home-Page-Components/ViewReviews";
import ListUser from "./Home-Page-Components/ListUser";
import Contact from "./Home-Page-Components/Contact";

const HomePage = ({ onLogout }) => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const renderContent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Home />;
      case "product":
        return <ProductPage />;
      case "rating":
        return <ViewReviews />;
      case "user":
        return <ListUser />;
      case "contact":
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar onLogout={onLogout} onMenuClick={setActiveComponent} />
      <Layout className="site-layout">
        <div style={{ padding: "25px" }}>{renderContent()}</div>
      </Layout>
    </Layout>
  );
};

export default HomePage;