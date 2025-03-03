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
import api from "../../api";

const { Content } = Layout;
const { Option } = Select;

const ListUser = () => {
  const [users, setUsers] = useState([]); // Data pengguna
  const [admins, setAdmins] = useState([]); // Data admin
  const [loading, setLoading] = useState(false); // State untuk loading
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [currentUser, setCurrentUser] = useState(null); // Data pengguna yang sedang diedit
  const [form] = Form.useForm(); // Ant Design form instance

  // Ambil data pengguna dari server
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userResponse = await api.get("/users");
      setUsers(userResponse.data); // Atur data pengguna
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Gagal mengambil data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  // Ambil data admin dari server
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const adminResponse = await api.get("/admins");
      setAdmins(adminResponse.data); // Atur data admin
    } catch (error) {
      console.error("Error fetching admins:", error);
      message.error("Gagal mengambil data admin.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const roleResponse = await api.get("/verify-token");
      const roleData = roleResponse.data;

      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          role: roleData[user.id] || "user",
        }))
      );

      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) => ({
          ...admin,
          role: roleData[admin.id] || "admin",
        }))
      );
    } catch (error) {
      message.error("Gagal mengambil data role pengguna.");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAdmins();
    fetchRoles();
  }, []);

  // Handle delete user/admin
  const handleDeleteUser = async (id, type) => {
    setLoading(true); // Set loading for deletion
    try {
      const url = type === "user" ? `/users/${id}` : `/admins/${id}`;
      await api.delete(url);
      message.success(
        `${type === "user" ? "Pengguna" : "Admin"} berhasil dihapus!`
      );
      fetchUsers(); // Perbarui daftar pengguna
      fetchAdmins(); // Perbarui daftar admin
    } catch (error) {
      console.error("Error deleting user/admin:", error);
      message.error(
        `Gagal menghapus ${type === "user" ? "pengguna" : "admin"}.`
      );
    } finally {
      setLoading(false); // Reset loading after deletion
    }
  };

  // Handle save user/admin (add/edit)
  const handleSaveUser = async (values) => {
    setLoading(true); // Set loading for save
    try {
      const url =
        currentUser && currentUser.role === "ADMIN" ? `/admins` : `/users`;
      if (currentUser) {
        // Update user/admin
        await api.put(`${url}/${currentUser.id}`, values);
        message.success(
          `${
            currentUser.role === "ADMIN" ? "ADMIN" : "Pengguna"
          } berhasil diperbarui!`
        );
      } else {
        // Add new user/admin
        const registerUrl =
          values.role === "ADMIN" ? "/register" : "/register-user";
        await api.post(registerUrl, values);
        message.success(
          `${
            values.role === "ADMIN" ? "ADMIN" : "Pengguna"
          } berhasil ditambahkan!`
        );
      }

      fetchUsers(); // Perbarui daftar pengguna
      fetchAdmins(); // Perbarui daftar admin
      setIsModalVisible(false); // Tutup modal
      setCurrentUser(null); // Reset current user
      form.resetFields(); // Reset form fields
    } catch (error) {
      console.error(
        "Error saving user/admin:",
        error.response || error.message
      );
      message.error(
        `Gagal menyimpan ${values.role === "admin" ? "admin" : "pengguna"}.`
      );
    } finally {
      setLoading(false); // Reset loading after saving
    }
  };

  // Gabungkan data pengguna dan admin

  // Kolom untuk tabel Ant Design
  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => {
        // Tampilkan role hanya jika role ada di dalam data
        return record.role ? record.role : "Tidak ada role";
      },
    },
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
            onClick={() => handleDeleteUser(record.id, record.role)}
          >
            Hapus
          </Button>
        </Space>
      ),
    },
  ];
  const combinedData = [...users, ...admins];
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
          dataSource={combinedData}
          columns={columns}
          rowKey="id"
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
