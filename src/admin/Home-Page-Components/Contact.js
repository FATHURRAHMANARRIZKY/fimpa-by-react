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
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import api from "../../api";

const { Content } = Layout;

const Contact = () => {
  const [profile, setProfile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Ambil data profil dari server
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/contact");
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile data", error);
      message.error("Gagal mengambil data profile.");
    }
  };

  // Handle simpan profil
  const handleSaveProfile = async (values) => {
    setLoading(true);
    try {
      const updatedProfile = { ...profile, ...values }; // Hanya update bagian yang diedit
      await api.post("/contact", updatedProfile);
      message.success("Profile berhasil diperbarui!");
      fetchProfile(); // Refresh data setelah update
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error saving profile:", error);
      message.error("Gagal menyimpan profile.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menangani edit berdasarkan media sosial yang dipilih
  const handleEditProfile = (key) => {
    setCurrentProfile(key);
    setIsModalVisible(true);
  };

  // Set nilai default ke form setelah modal terbuka
  useEffect(() => {
    if (currentProfile && profile) {
      const fieldName = `${currentProfile}Profile`;
      form.setFieldsValue({ [fieldName]: profile?.[fieldName] || "" });
    }
  }, [currentProfile, profile, form]);

  // Data yang akan ditampilkan di tabel
  const dataSource = profile
    ? [
        {
          key: "instagram",
          logo: <i className="fa-brands fa-instagram"></i>,
          mediaSocial: "Instagram",
          profileName: profile.instagramProfile || "-",
        },
        {
          key: "facebook",
          logo: <i className="fa-brands fa-facebook"></i>,
          mediaSocial: "Facebook",
          profileName: profile.facebookProfile || "-",
        },
        {
          key: "twitter",
          logo: <i className="fa-brands fa-twitter"></i>,
          mediaSocial: "Twitter",
          profileName: profile.twitterProfile || "-",
        },
        {
          key: "tiktok",
          logo: <i className="fa-brands fa-tiktok"></i>,
          mediaSocial: "TikTok",
          profileName: profile.tiktokProfile || "-",
        },
      ]
    : [];

  // Kolom untuk tabel
  const columns = [
    { title: "Logo", dataIndex: "logo", key: "logo" },
    { title: "Media Social", dataIndex: "mediaSocial", key: "mediaSocial" },
    { title: "Profile Name", dataIndex: "profileName", key: "profileName" },
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
        </Space>
      ),
    },
  ];

  return (
    <Content style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          Manage Social Media Profiles
        </h1>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Table
              dataSource={dataSource}
              columns={columns}
              rowKey="key"
              bordered
              loading={loading}
            />
          </Col>
        </Row>

        <Modal
          title={`Edit ${
            currentProfile
              ? currentProfile[0].toUpperCase() + currentProfile.slice(1)
              : ""
          } Profile`}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          {currentProfile && (
            <Form form={form} layout="vertical" onFinish={handleSaveProfile}>
              <Form.Item
                label={`${
                  currentProfile[0].toUpperCase() + currentProfile.slice(1)
                } Profile`}
                name={`${currentProfile}Profile`}
              >
                <Input placeholder={`Masukkan username ${currentProfile}`} />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Simpan
                  </Button>
                  <Button onClick={() => setIsModalVisible(false)}>
                    Batal
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
    </Content>
  );
};

export default Contact;