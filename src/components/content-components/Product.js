import React, { useState, useEffect } from "react";
import { Card, Pagination, Input, Modal, Button, message, Spin } from "antd";
import api from "../../api"; // Import the custom Axios instance

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [whatsappText, setWhatsappText] = useState(
    "Halo, saya tertarik dengan produk ini!"
  );
  const [loading, setLoading] = useState(false);
  const pageSize = 3;

  // Fungsi untuk mengambil data dari backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products", {
        params: {
          page: currentPage - 1,
          size: pageSize,
          search: searchTerm,
        },
      });
      setProducts(response.data.products || []);
      setTotalProducts(response.data.total);
    } catch (error) {
      message.error("Gagal mengambil data produk.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "628123456789";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappText
    )}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (selectedProduct) {
      setWhatsappText(
        `Halo, saya tertarik dengan produk ${selectedProduct.name}!`
      );
    }
  }, [selectedProduct]);

  return (
    <div className="bg-blue-200 flex flex-col justify-between h-full transition-all duration-300">
      <div className="container mx-auto px-4 py-11 max-w-screen-xl">
        <h2 className="text-3xl font-bold text-center mb-8">Produk Kami</h2>

        <div className="flex justify-center mb-4">
          <Input
            placeholder="Cari produk berdasarkan nama atau kategori..."
            className="w-full max-w-lg"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
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
                      className="object-cover w-full h-full rounded-t-lg shadow-md"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/150")
                      }
                    />
                  </div>
                }
                className="shadow-lg rounded-lg overflow-hidden w-full max-w-xs"
                onClick={() => handleCardClick(product)}
              >
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm">
                  {product.description.substring(0, 100)}...
                </p>
                <p className="text-gray-400 text-xs">
                  Kategori: {product.category}
                </p>
                {product && (
                  <p>
                    Harga:{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(product.minPrice)}{" "}
                    -{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(product.maxPrice)}
                  </p>
                )}
                <div className="text-center">
                  <Button
                    key="wa-button"
                    type="primary"
                    className="py-2"
                    onClick={handleWhatsAppClick}
                  >
                    <i className="fa-brands fa-whatsapp fa-shake"></i> Hubungi
                    via WhatsApp
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center">Tidak ada produk ditemukan.</p>
        )}

        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalProducts}
            onChange={handlePageChange}
          />
        </div>
      </div>

      <Modal
        key={selectedProduct?.id || "empty"}
        open={Boolean(selectedProduct)}
        onCancel={handleCloseModal}
        onOk={handleCloseModal}
        destroyOnClose={true}
        footer={[
          // <Input
          //   key="input"
          //   placeholder="Tulis pesan untuk WhatsApp..."
          //   value={whatsappText}
          //   onChange={(e) => setWhatsappText(e.target.value)}
          // />,
          <Button
            key="wa-button"
            type="primary"
            className="my-2"
            onClick={handleWhatsAppClick}
          >
            <i className="fa-brands fa-whatsapp fa-shake"></i> Hubungi via
            WhatsApp
          </Button>,
        ]}
      >
        <img
          src={`http://localhost:8080${selectedProduct?.imageUrl}`}
          alt={selectedProduct?.name}
          className="object-cover w-full h-48 mb-4 my-3 rounded-lg shadow-xl border-2 border-gray-300"
        />
        <h2 className="text-lg font-bold">{selectedProduct?.name}</h2>
        <p>{selectedProduct?.description}</p>
        <p className="text-gray-400 text-xs">
          Kategori: {selectedProduct?.category}
        </p>
        {selectedProduct && (
          <p>
            Harga:{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(selectedProduct.minPrice)}{" "}
            -{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(selectedProduct.maxPrice)}
          </p>
        )}
      </Modal>
    </div>
  );
};

export default Product;
