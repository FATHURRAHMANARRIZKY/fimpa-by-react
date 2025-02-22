import { Divider } from "antd";

const SubHeader = () => {
  return (
    <div className="container flex flex-col md:flex-row items-center justify-between w-full py-10 px-6">
      {/* Bagian Teks di Kiri */}
      <div className="flex-1 text-left mr-4">
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
      </div>

      {/* Gambar di Kanan dengan Garis Vertikal di Sebelah Kiri */}
      <div className="flex items-center space-x-6">
        {/* Garis Vertikal */}
        <div className="hidden md:block h-56">
          <Divider type="vertical" className="border-gray-400 h-full" />
        </div>

        {/* Gambar */}
        <img
          src="assets/header.jpg"
          alt="SubHeader"
          className="w-80 h-56 object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default SubHeader;