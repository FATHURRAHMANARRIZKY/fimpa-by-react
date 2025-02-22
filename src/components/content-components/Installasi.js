import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Installasi = () => {
  return (
    <div className="bg-blue-100">
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">Instalasi</h2>

      {/* Bagian 1: Gambar di kiri, teks di kanan */}
      <div className="row align-items-center mb-4">
        <div className="col-md-6">
          <img
            src="assets/pipa.jpg"
            alt="Installasi 1"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-semibold">Metode 1 (Sistem tertutup)</h3>
          <p className="text-muted">
            Instalasi pipa model ini disebut juga dengan istilah sambungan
            melingkar artinya seluruh ujung pipa tersambung tanpa memutus.
            Kelebihannnya adalah menjadikan tekanan air lebih kuat dan ketika
            ada kran air yang di buka secara bersamaan maka akan mendapatkan
            debit air yang sama.
          </p>
        </div>
      </div>

      {/* Bagian 2: Teks di kiri, gambar di kanan */}
      <div className="row align-items-center">
        <div className="col-md-6 order-md-1 order-2">
          <h3 className="fw-semibold">Metode 2 (Sistem terbuka)</h3>
          <p className="text-muted">
            Dengan biaya lebih murah, instalasi pipa air jenis ini jika salah
            dalam perencanaannya maka akan timbul banyak masalah di kemudian
            hari seperti debit air yang tidak sama antara kran satu dengan
            lainnya, dan jika terjadi kerusakan pada titik tertentu pun akan
            membuat sebagian jalur distribusi mati total tanpa mendapat suplai
            air.
          </p>
        </div>
        <div className="col-md-6 order-md-2 order-1">
          <img
            src="assets/pipa2.jpg"
            alt="Installasi 2"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Installasi;
