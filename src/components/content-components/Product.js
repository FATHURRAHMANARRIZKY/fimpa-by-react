import React, { useState, useEffect } from "react";
import { Card, Pagination, Input, Modal, Button, message, Spin } from "antd";
import api from "../../api"; // Import the custom Axios instance

const Product = () => {
  const [products, setProducts] = useState([]); // Inisialisasi dengan array kosong
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [whatsappText, setWhatsappText] = useState(
    "Halo, saya tertarik dengan produk ini!"
  );
  const [loading, setLoading] = useState(false);
  const pageSize = 3;

  // State untuk Filter Harga
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  // Fungsi untuk mengambil data dari backend
  const fetchProducts = async () => {
    setLoading(true); // Mulai loading
    try {
      const response = await api.get("/products", {
        params: {
          page: currentPage - 1,
          size: pageSize,
          search: searchTerm,
          minPrice,
          maxPrice,
        },
      });
      setProducts(response.data.products || []); // Pastikan produk selalu array
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error("Error fetching data", error);
      message.error("Gagal mengambil data produk.");
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  // Mengambil data saat halaman, pencarian, atau filter harga berubah
  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, minPrice, maxPrice]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset ke halaman pertama
  };

  const handleCardClick = (product) => {
    console.log("Product clicked:", product);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "628123456789"; // Ganti dengan nomor WhatsApp tujuan
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappText
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className={`bg-blue-200 flex flex-col justify-between h-full transition-all duration-300 ${
        selectedProduct ? "backdrop-blur-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-11 max-w-screen-xl">
        <h2 className="text-3xl font-bold text-center mb-8">Produk Kami</h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-4">
          <Input
            placeholder="Cari produk berdasarkan nama atau kategori..."
            className="w-full max-w-lg"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Grid Layout Produk */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" tip="Memuat produk..." />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-items-center">
            {products.map((product) => (
              <Card
                key={product.id}
                hoverable
                cover={
                  <div className="relative w-full h-48">
                    <img
                      src={`http://localhost:8080${product.imageUrl}`}
                      alt={product.name}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </div>
                }
                className="shadow-lg rounded-lg overflow-hidden w-full max-w-xs"
                onClick={() => handleCardClick(product)}
              >
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-gray-400 text-xs">
                  Kategori: {product.category}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center">Tidak ada produk ditemukan.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalProducts}
            onChange={handlePageChange}
          />
        </div>
      </div>

      {/* Modal untuk Detail Produk */}
      <Modal
        key={selectedProduct?.id || "empty"}
        title={selectedProduct?.name}
        open={Boolean(selectedProduct)}
        visible={Boolean(selectedProduct)}
        onCancel={handleCloseModal}
        onOk={handleCloseModal}
        destroyOnClose={true}
        footer={[
          <Input
            key="input"
            placeholder="Tulis pesan untuk WhatsApp..."
            value={whatsappText}
            onChange={(e) => setWhatsappText(e.target.value)}
          />,
          <Button key="wa-button" type="primary" onClick={handleWhatsAppClick}>
            Hubungi via WhatsApp
          </Button>,
        ]}
        transitionName="zoom"
        maskTransitionName="fade"
      >
        <img
          src={`http://localhost:8080${selectedProduct?.imageUrl}`}
          alt={selectedProduct?.name}
          className="object-cover w-full h-48 mb-4"
        />
        <p>{selectedProduct?.description}</p>
        <p className="text-gray-400 text-xs">
          Kategori: {selectedProduct?.category}
        </p>
      </Modal>
    </div>
  );
};

export default Product;