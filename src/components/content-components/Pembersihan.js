import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Pembersihan = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Proses Pembersihan
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Bagian 1: Teks di kiri, gambar di kanan */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 m-2">
            <h3 className="text-xl font-semibold">Plunger</h3>
            <p className="text-gray-600">
              Pompa karet atau plunger adalah alat sederhana yang efektif untuk
              mengatasi sumbatan ringan pada pipa. plunger dapat menggerakkan
              sumbatan di dalam pipa dan melancarkan aliran air kembali.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="assets/bersih2.jpg"
              alt="Pembersihan 1"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Bagian 2: Teks di kanan, gambar di kiri */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 m-2">
            <img
              src="assets/cek4.jpg"
              alt="Pembersihan 2"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold">Drain Snake</h3>
            <p className="text-gray-600">
              Alat seperti drain snake atau pembersih pipa manual (sering juga
              disebut auger) digunakan untuk menanggulangi penyumbatan yang
              lebih keras.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pembersihan;
