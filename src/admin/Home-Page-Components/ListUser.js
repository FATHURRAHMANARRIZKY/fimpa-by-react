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
  Select,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import api from "../../api";

const { Content } = Layout;
const { Option } = Select;

const ListUser = () => {
  const [users, setUsers] = useState([]); // Data pengguna
  const [loading, setLoading] = useState(false); // State untuk loading
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [currentUser, setCurrentUser] = useState(null); // Data pengguna yang sedang diedit
  const [form] = Form.useForm(); // Ant Design form instance

  // Ambil data pengguna dari server
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users");
      setUsers(response.data); // Atur data pengguna
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Gagal mengambil data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Ambil data pengguna saat komponen dimuat
  }, []);

  // Handle delete user
  const handleDeleteUser = async (id) => {
    setLoading(true); // Set loading for deletion
    try {
      await api.delete(`/${id}`.trim());
      message.success("Pengguna berhasil dihapus!");
      fetchUsers(); // Perbarui daftar pengguna
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Gagal menghapus pengguna.");
    } finally {
      setLoading(false); // Reset loading after deletion
    }
  };

  // Handle save user (add/edit)
  const handleSaveUser = async (values) => {
    setLoading(true); // Set loading for save
    try {
      if (currentUser) {
        // Update user
        await axios.put(
          `http://localhost:8080/api/users/${currentUser.id}`,
          values
        );
        message.success("Pengguna berhasil diperbarui!");
      } else {
        // Add new user
        await axios.post(
          "http://localhost:8080/api/users/register",
          values
        );
        message.success("Pengguna berhasil ditambahkan!");
      }

      fetchUsers(); // Perbarui daftar pengguna
      setIsModalVisible(false); // Tutup modal
      setCurrentUser(null); // Reset current user
      form.resetFields(); // Reset form fields
    } catch (error) {
      console.error("Error saving user:", error.response || error.message);
      message.error("Gagal menyimpan pengguna.");
    } finally {
      setLoading(false); // Reset loading after saving
    }
  };

  // Kolom untuk tabel Ant Design
  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentUser(record);
              form.setFieldsValue(record); // Set data pengguna ke form
              setIsModalVisible(true); // Tampilkan modal untuk edit
            }}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
          >Hapus</Button>
        </Space>
      ),
    },
  ];

  return (
    <Content style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Manajemen Pengguna</h1>
        <Button
          type="primary"
          className="mb-4"
          onClick={() => {
            setCurrentUser(null); // Reset form untuk tambah pengguna
            form.resetFields(); // Reset form fields
            setIsModalVisible(true); // Tampilkan modal
          }}
        >
          Tambah Pengguna
        </Button>

        {/* Tabel Ant Design */}
        <Table
          dataSource={users}
          columns={columns}
          rowKey="_id"
          bordered
          loading={loading}
        />

        {/* Modal untuk Tambah/Edit Pengguna */}
        <Modal
          title={currentUser ? "Edit Pengguna" : "Tambah Pengguna"}
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setCurrentUser(null); // Reset current user
            form.resetFields(); // Reset form fields
          }}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSaveUser}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Username wajib diisi!" }]}
            >
              <Input placeholder="Masukkan username" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email wajib diisi!" },
                { type: "email", message: "Format email tidak valid!" },
              ]}
            >
              <Input placeholder="Masukkan email" />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Role wajib diisi!" }]}
            >
              <Select placeholder="Pilih role">
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
            {!currentUser && ( // Password hanya diperlukan untuk tambah pengguna
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password wajib diisi!" },
                  { min: 6, message: "Password minimal 6 karakter!" },
                ]}
              >
                <Input.Password placeholder="Masukkan password" />
              </Form.Item>
            )}
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Simpan
                </Button>
                <Button onClick={() => setIsModalVisible(false)}>Batal</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Content>
  );
};

export default ListUser;
