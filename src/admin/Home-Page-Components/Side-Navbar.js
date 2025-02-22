import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  StarOutlined,
  DropboxOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = ({ onMenuClick, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="bg-gray-800"
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={[
          {
            key: "1",
            icon: <HomeOutlined />,
            label: "Dashboard",
            onClick: () => onMenuClick("dashboard"),
          },
          {
            key: "2",
            icon: <StarOutlined />,
            label: "Rating",
            onClick: () => onMenuClick("rating"),
          },
          {
            key: "3",
            icon: <DropboxOutlined />,
            label: "Product",
            onClick: () => onMenuClick("product"),
          },
          {
            key: "4",
            icon: <UserOutlined />,
            label: "User",
            onClick: () => onMenuClick("user"),
          },
          {
            key: "5",
            icon: <PhoneOutlined />,
            label: "Contact",
            onClick: () => onMenuClick("contact"),
          },
          {
            key: "6",
            icon: <LogoutOutlined />,
            label: "Logout",
            onClick: () => {
              console.log("Logout clicked"); // Tambahkan log ini
              onLogout();
            },
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;