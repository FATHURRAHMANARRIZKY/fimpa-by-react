import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Layout,
  Table,
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  Space,
  message,
  Modal,
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import api from "../../api";

const { Content } = Layout;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Gagal mengambil data produk.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("price", values.price);

    if (fileList.length > 0) {
      formData.append("imageUrl", fileList[0].originFileObj);
    }

    setLoading(true);
    try {
      if (selectedProduct) {
        await api.put(
          `/products/${selectedProduct.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        message.success("Produk berhasil diperbarui!");
      } else {
        await api.post("/products/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Produk berhasil ditambahkan!");
      }

      fetchProducts();
      setIsModalVisible(false);
      form.resetFields();
      setSelectedProduct(null);
      setFileList([]);
    } catch (error) {
      console.error("Error saving product:", error);
      message.error("Gagal menyimpan produk.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/api/products/${id}`);
      message.success("Produk berhasil dihapus!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Gagal menghapus produk.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const columns = [
    {
      title: "Gambar",
      dataIndex: "imageUrl",
      key: "image",
      render: (text) => (
        <img
          src={`http://localhost:8080${text}`}
          alt="Product"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
    { title: "Nama", dataIndex: "name", key: "name" },
    { title: "Deskripsi", dataIndex: "description", key: "description" },
    { title: "Kategori", dataIndex: "category", key: "category" },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      render: (price) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(price),
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
              form.setFieldsValue({ ...record, image: null });
              setSelectedProduct(record);
              setIsModalVisible(true);

              setFileList(
                record.imageUrl
                  ? [
                      {
                        uid: "-1",
                        name: "imageUrl",
                        status: "done",
                        url: `http://localhost:8080${record.imageUrl}`,
                      },
                    ]
                  : []
              );
            }}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProduct(record.id)}
          >
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Content style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Product Management</h1>

        <Button
          type="primary"
          className="mb-4"
          onClick={() => {
            setSelectedProduct(null);
            setIsModalVisible(true);
            form.resetFields();
            setFileList([]);
          }}
        >
          Tambah Produk
        </Button>

        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          bordered
          loading={loading}
          pagination={false}
        />

        <Modal
          title={selectedProduct ? "Edit Produk" : "Tambah Produk"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
            setSelectedProduct(null);
            setFileList([]);
          }}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSaveProduct}
            initialValues={selectedProduct || {}}
          >
            <Form.Item
              name="name"
              label="Nama Produk"
              rules={[{ required: true, message: "Masukkan nama produk" }]}
            >
              <Input placeholder="Nama Produk" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Deskripsi"
              rules={[{ required: true, message: "Masukkan deskripsi" }]}
            >
              <Input.TextArea placeholder="Deskripsi Produk" />
            </Form.Item>
            <Form.Item
              name="category"
              label="Kategori"
              rules={[{ required: true, message: "Masukkan kategori" }]}
            >
              <Input placeholder="Kategori Produk" />
            </Form.Item>
            <Form.Item
              name="price"
              label="Harga"
              rules={[{ required: true, message: "Masukkan harga produk" }]}
            >
              <Input
                type="number"
                placeholder="Harga Produk"
                step="0.01"
                min="0"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
              Simpan
            </Button>
          </Form>
        </Modal>
      </div>
    </Content>
  );
};

export default ProductPage;
