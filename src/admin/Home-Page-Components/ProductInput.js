import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Form,
  Input,
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
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Ukuran per halaman

  // Fetch produk saat halaman berubah
  useEffect(() => {
    fetchProducts(currentPage, pageSize);
  }, [currentPage]);

  const fetchProducts = async (page, size) => {
    setLoading(true);
    try {
      const response = await api.get(`/products?page=${page - 1}&size=${size}`);
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Gagal mengambil data produk.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("minPrice", parseFloat(values.minPrice) || 0);
    formData.append("maxPrice", parseFloat(values.maxPrice) || 0);

    if (fileList.length > 0) {
      formData.append("imageUrl", fileList[0].originFileObj);
    } else if (selectedProduct?.imageUrl) {
      formData.append("imageUrl", selectedProduct.imageUrl);
    }

    setLoading(true);
    try {
      if (selectedProduct) {
        await api.put(`/products/${selectedProduct.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Produk berhasil diperbarui!");
      } else {
        await api.post("/products/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Produk berhasil ditambahkan!");
      }

      fetchProducts(currentPage, pageSize);
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
      await api.delete(`/products/${id}`);
      message.success("Produk berhasil dihapus!");
      fetchProducts(currentPage, pageSize);
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Gagal menghapus produk.");
    } finally {
      setLoading(false);
    }
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
      title: "Harga Minimum",
      dataIndex: "minPrice",
      key: "minPrice",
      render: (minPrice) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(minPrice),
    },
    {
      title: "Harga Maximum",
      dataIndex: "maxPrice",
      key: "maxPrice",
      render: (maxPrice) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(maxPrice),
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
              form.setFieldsValue({ ...record });
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
          pagination={{
            current: currentPage,
            pageSize,
            total: totalProducts,
            onChange: (page) => setCurrentPage(page),
          }}
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
          <Form form={form} layout="vertical" onFinish={handleSaveProduct}>
            <Form.Item
              name="name"
              label="Nama Produk"
              rules={[{ required: true }]}
            >
              <Input placeholder="Nama Produk" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Deskripsi"
              rules={[{ required: true }]}
            >
              <Input.TextArea placeholder="Deskripsi Produk" />
            </Form.Item>
            <Form.Item
              name="category"
              label="Kategori"
              rules={[{ required: true }]}
            >
              <Input placeholder="Kategori Produk" />
            </Form.Item>
            <Form.Item
              name="minPrice"
              label="Harga Minimum"
              rules={[{ required: true }]}
            >
              <Input type="number" min="0" />
            </Form.Item>
            <Form.Item
              name="maxPrice"
              label="Harga Maximum"
              rules={[{ required: true }]}
            >
              <Input type="number" min="0" />
            </Form.Item>
            <Form.Item name="imageUrl" label="Gambar Produk">
              <Upload
                listType="picture"
                beforeUpload={() => false}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList.slice(-1))}
              >
                <Button icon={<UploadOutlined />}>Unggah Gambar</Button>
              </Upload>
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
