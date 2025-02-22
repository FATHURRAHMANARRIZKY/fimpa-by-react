import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import icon media sosial

const AboutUs = () => {
  return (
    <Container
      fluid
      className="px-5 py-12 bg-blue-300"
      // style={{ backgroundColor: "#e0f7fa" }}
    >
      <Row className="align-items-center">
        {/* Kolom Kiri: Gambar */}
        <Col
          lg={5}
          className="text-center mb-8 lg:mb-0 d-flex justify-content-center"
        >
          <img
            src="assets/logo.png" // Ganti dengan path gambar Anda
            alt="About Us"
            className="img-fluid rounded-lg shadow-lg"
            style={{ maxWidth: "100%", height: "200px" }} // Membesarkan gambar
          />
        </Col>

        {/* Kolom Tengah: Teks */}
        <Col lg={4} className="text-center text-lg-start">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">About Us</h3>
          <h5 className="text-2xl font-semibold text-gray-700 mb-4">
            Jasa pipa air mampet, Pelancaran Pipa mampet, Keran mampet, deteksi
            dan perbaikan pipa air bocor
          </h5>
          <p className="text-gray-800 mb-6">
            Jasa air mampet profesional telah melayani jasa pelancaran saluran
            pipa air mampet juga deteksi dan perbaikan pipa bocor dari tahun
            2018 untuk permasalah pipa saluran air mampet, pelancaran keran
            mampet, juga deteksi dan perbaikan pipa air bocor. Penyedia tukang
            pipa mampet dan pipa air bocor terdekat di Medan.
          </p>
        </Col>

        {/* Kolom Kanan: Garis Vertikal dan Ikon Media Sosial */}
        <Col lg={3} className="d-flex flex-column align-items-center">
          <div
            className="border-l-2 border-gray-300 px-5 py-5"
            style={{
              height: "300px", // Memperpanjang garis
              borderColor: "#000",
            }}
          >
            {/* Logo Media Sosial Vertikal */}
            <div className="d-flex flex-column align-items-center mt-2">
              <FaFacebook
                size={40}
                className="text-blue-600 mb-4 hover:text-blue-800 transition duration-200"
              />
              <FaTwitter
                size={40}
                className="text-blue-400 mb-4 hover:text-blue-600 transition duration-200"
              />
              <FaInstagram
                size={40}
                className="text-pink-600 mb-4 hover:text-pink-800 transition duration-200"
              />
              <FaLinkedin
                size={40}
                className="text-blue-700 mb-4 hover:text-blue-900 transition duration-200"
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;