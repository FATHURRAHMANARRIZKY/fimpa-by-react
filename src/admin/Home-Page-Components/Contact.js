import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Button,
  Space,
  message,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select,
} from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "../../api";

const { Content } = Layout;
const { Option } = Select;

const Contact = () => {
  const [profile, setProfile] = useState({}); // Initialize with an empty object
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // To distinguish between adding and editing
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Fetch profile data from the server
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/contact");
      const transformedProfile = response.data.reduce(
        (acc, { name, mediasocial }) => {
          acc[mediasocial] = { name, id: name }; // Include id to allow deletion and update
          return acc;
        },
        {}
      );
      setProfile(transformedProfile); // Set the transformed profile data
    } catch (error) {
      message.error("Gagal mengambil data profile.");
    }
  };

  // Handle saving profile (either add or edit)
  const handleSaveProfile = async (values) => {
    setLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]; // Ensure you are correctly retrieving the token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (isAdding) {
        // Add a new profile
        const newProfile = {
          name: values.name,
          mediasocial: values.mediasocial,
        };
        await api.post("/contact", newProfile, { headers });
        message.success("Profile berhasil ditambahkan!");
      } else {
        // Update existing profile
        const updatedProfile = {
          name: values.name,
        };
        await api.put(`/contact/${currentProfile}`, updatedProfile, { headers });
        message.success("Profile berhasil diperbarui!");
      }

      fetchProfile(); // Refresh data after update
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error saving profile:", error);
      message.error("Gagal menyimpan profile.");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit based on selected social media
  const handleEditProfile = (key) => {
    setCurrentProfile(key);
    setIsAdding(false); // Set to editing mode
    setIsModalVisible(true);
  };

  // Handle delete profile
  const handleDeleteProfile = (key) => {
    // Confirm the deletion
    Modal.confirm({
      title: `Are you sure you want to delete this ${key} profile?`,
      content: "This action cannot be undone.",
      onOk: async () => {
        setLoading(true);
        try {
          const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1]; // Ensure you are correctly retrieving the token
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          // Make a DELETE request to remove the specific profile
          await api.delete(`/contact/${key}`, { headers });

          message.success(`${key} profile deleted successfully!`);
          fetchProfile(); // Refresh data after delete
        } catch (error) {
          console.error("Error deleting profile:", error);
          message.error("Gagal menghapus profile.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  // Handle add new profile
  const handleAddProfile = () => {
    setCurrentProfile(null);
    setIsAdding(true); // Set to adding mode
    setIsModalVisible(true);
  };

  // Check if a profile already exists for the given media
  const isProfileAlreadyExists = (mediasocial) => {
    return profile && profile[mediasocial]; // Check if a profile exists for the given media platform
  };

  // Set default form values when modal is opened
  useEffect(() => {
    if (currentProfile) {
      form.setFieldsValue({
        name: profile[currentProfile]?.name || "",
        mediasocial: currentProfile,
      });
    } else {
      form.resetFields();
    }
  }, [currentProfile, profile, form]);

  // Data to be displayed in the table
  const dataSource = Object.keys(profile).map((key) => ({
    key, // Use the actual key (social media platform) as the row key
    logo: <i className={`fa-brands fa-${key}`} />, // Dynamically set logo for each profile type
    mediasocial: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter of media type
    name: profile[key].name, // The profile name should be the value for this key
  }));

  // Columns for the table
  const columns = [
    { title: "Logo", dataIndex: "logo", key: "logo" },
    { title: "Media Social", dataIndex: "mediasocial", key: "mediasocial" },
    { title: "Profile Name", dataIndex: "name", key: "name" },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditProfile(record.key)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProfile(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Content style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Manage Social Media Profiles</h1>

        <div className="mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddProfile}
          >
            Add Contact
          </Button>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Table
              dataSource={dataSource}
              columns={columns}
              rowKey="key"
              bordered
              loading={loading}
              pagination={false}
            />
          </Col>
        </Row>

        <Modal
          title={`${isAdding ? "Add New Profile" : "Edit Profile"}`}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSaveProfile}>
            {isAdding && (
              <Form.Item
                label="Select Social Media"
                name="mediasocial"
                rules={[
                  { required: true, message: "Please select a social media platform!" },
                ]}
              >
                <Select placeholder="Select Media Social">
                  <Option value="instagram">Instagram</Option>
                  <Option value="facebook">Facebook</Option>
                  <Option value="twitter">Twitter</Option>
                  <Option value="youtube">YouTube</Option>
                  <Option value="tiktok">TikTok</Option>
                  <Option value="pinterest">Pinterest</Option>
                </Select>
              </Form.Item>
            )}

            <Form.Item
              label="Profile Name"
              name="name"
              rules={[{ required: true, message: "Please input the profile name!" }]}
            >
              <Input placeholder="Enter profile name (e.g., username)" />
            </Form.Item>

            {isAdding && // Display an error if the profile already exists for the selected media
              isProfileAlreadyExists(form.getFieldValue("mediasocial")) && (
                <p style={{ color: "red" }}>
                  Profile for this media already exists. Please delete it first.
                </p>
              )}

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={isAdding && isProfileAlreadyExists(form.getFieldValue("mediasocial"))}
                >
                  {isAdding ? "Add" : "Save"}
                </Button>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Content>
  );
};

export default Contact;