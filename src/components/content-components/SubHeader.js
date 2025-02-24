import React from "react";
import { Divider } from "antd";

const SubHeader = () => {
  const handleWhatsAppClick = (event) => {
    event.preventDefault(); // Mencegah reload halaman
    const phoneNumber = "628123456789"; // Ganti dengan nomor WhatsApp tujuan
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url);
  };

  return (
    <div className="container flex flex-col md:flex-row items-center justify-between w-full py-10 px-6">
      {/* Gambar di Kiri dengan Garis Vertikal di Sebelah Kanan */}
      <div className="flex items-center space-x-6">
        <img
          src="assets/header.jpg"
          alt="SubHeader"
          className="w-80 h-56 object-cover rounded-lg shadow-lg"
        />
        <div className="hidden md:block h-56">
          <Divider type="vertical" className="border-gray-400 h-full" />
        </div>
      </div>

      {/* Bagian Teks di Kanan */}
      <div className="flex-1 text-left md:ml-4">
        <h1 className="text-xl md:text-xl font-bold text-gray-800">
          Jasa pipa air mampet, Pelancaran Pipa mampet, Keran mampet, deteksi
          dan perbaikan pipa air bocor
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Jasa air mampet profesional telah melayani jasa pelancaran saluran
          pipa air mampet juga deteksi dan perbaikan pipa bocor dari tahun 2018
          untuk permasalah pipa saluran air mampet, pelancaran keran mampet,
          juga deteksi dan perbaikan pipa air bocor. Penyedia tukang pipa mampet
          dan pipa air bocor terdekat di Medan
        </p>
        <hr className="border-t-4 border-gray-900 mt-4" />
        <div className="flex items-center mt-4">
          Contact us
          <span className="ml-2"></span>{" "}
          {/* Tambahkan margin kiri untuk jarak */}
          <a href="_blank" onClick={handleWhatsAppClick}>
            <i className="fa-brands fa-whatsapp fa-bounce text-2xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;