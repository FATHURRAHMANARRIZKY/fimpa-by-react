import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Pengecekan = () => {
  const data = [
    {
      id: 1,
      title: "Pressure Test",
      description:
        "Menggunakan alat untuk menambah tekanan pada sistem pipa. Jika tekanan turun dalam waktu tertentu, ini bisa menandakan adanya kebocoran pada pipa. Tekanan air yang tidak stabil adalah indikasi bahwa pipa mungkin rusak.",
      image: "assets/cek3.jpg", // Gambar placeholder
    },
    {
      id: 2,
      title: "Kamera Endoskopik",
      description:
        "Kamera endoskopik dapat dimasukkan ke dalam pipa untuk melihat secara langsung kondisi bagian dalam pipa. Kamera ini memungkinkan untuk mendeteksi adanya penyumbatan, karat, atau kerusakan tanpa perlu membuka pipa.",
      image: "assets/pasang3.jpg", // Gambar placeholder
    },
  ];

  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <h2 className="text-center fw-bold mb-4">Proses Pengecekan</h2>

      {/* Grid Layout */}
      <div className="row">
        {data.map((item) => (
          <div key={item.id} className="col-md-6 mb-4">
            <div
              className="position-relative rounded shadow-lg overflow-hidden"
              style={{ minHeight: "180px" }}
            >
              {/* Gambar dengan efek gelap */}
              <img
                src={item.image}
                alt={item.title}
                className="w-100 object-cover"
                style={{
                  minHeight: "380px",
                  maxHeight: "380px",
                  filter: "brightness(50%)",
                }}
              />
              {/* Overlay Teks */}
              <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
                <h3 className="fw-semibold">{item.title}</h3>
                <p className="small">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pengecekan;
