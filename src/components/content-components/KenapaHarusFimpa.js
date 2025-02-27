import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const KenapaHarusFimpa = () => {
  return (
    <div className="container mx-auto px-4 py-12 rounded-md">
      <h2 className="text-3xl font-bold text-center mb-8 py-4">
        Kenapa Harus FIMPA?
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Item 1: Teks di atas, gambar di bawah */}
        <div className="flex flex-col items-center text-center bg-blue-400 rounded-l-lg">
          <h3 className="text-xl font-semibold">Kepastian</h3>
          <p className="text-gray-900 text-pretty">
            Biaya yang jelas di awal, jaminan tingkat keberhasilan 90%, dengan
            garansi yang sesuai dengan ketentuan di awal.
          </p>
          <img
            src="assets/orang4.jpg"
            alt="Keunggulan 1"
            className="w-full h-64 object-cover mt-4 rounded-bl-lg" // Tinggi gambar diubah menjadi h-64
          />
        </div>

        {/* Item 2: Gambar di atas, teks di bawah */}
        <div className="flex flex-col items-center text-center bg-blue-400">
          <img
            src="assets/orang2.jpg"
            alt="Keunggulan 2"
            className="w-full h-64 object-cover" // Tinggi gambar diubah menjadi h-64
          />
          <h3 className="text-xl font-semibold mt-4">Ketelitian</h3>
          <p className="text-gray-900 text-pretty">
            Telah banyak menuntaskan pengerjaan jasa lainnya yang tidak berhasil
            membuat saluran menjadi lancar kembali.
          </p>
        </div>

        {/* Item 3: Teks di atas, gambar di bawah */}
        <div className="flex flex-col items-center text-center bg-blue-400 rounded-r-lg">
          <h3 className="text-xl font-semibold">Kejujuran</h3>
          <p className="text-gray-900 text-pretty">
            Jasa Mampet No. 1 - Ribuan pelanggan menjadi bukti kepercayaan
            mereka terhadap kualitas pengerjaan kami.
          </p>
          <img
            src="assets/orang1.jpg"
            alt="Keunggulan 3"
            className="w-full h-64 object-cover mt-4 rounded-br-lg" // Tinggi gambar diubah menjadi h-64
          />
        </div>
      </div>
    </div>
  );
};

export default KenapaHarusFimpa;
