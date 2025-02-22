import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTiktok,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">
        Contact Us
      </h1>

      {/* Outer Wrapper */}
      <div className="relative items-center">
        {/* Vertical Connecting Line */}
        <div className="absolute top-0 bottom-0 left-14 w-[2px] bg-blue-300"></div>

        {/* Icons and Contact Information */}
        <ul className="space-y-6">
          {/* Address */}
          <li className="flex items-center space-x-4">
            {/* Icon Wrapper */}
            <div className="relative">
              <div className="bg-blue-100 rounded-full p-3 flex justify-left items-center z-10 relative">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
              </div>
            </div>
            {/* Text */}
            <span className="text-gray-700">
              Universitas Sumatera Utara, Jl. Universitas No.9, Padang Bulan,
              Kec. Medan Baru, Kota Medan, Sumatera Utara 20155
            </span>
          </li>

          {/* Phone */}
          <li className="flex items-center space-x-4">
            <div className="bg-blue-100 rounded-full p-3 flex justify-center items-center z-10">
              <FaPhone className="text-blue-600 text-xl" />
            </div>
            <span className="text-gray-700">08123456789</span>
          </li>

          {/* Email */}
          <li className="flex items-center space-x-4">
            <div className="bg-blue-100 rounded-full p-3 flex justify-center items-center z-10">
              <FaEnvelope className="text-blue-600 text-xl" />
            </div>
            <span className="text-gray-700">athurrahmanarrizky@gmail.com</span>
          </li>

          {/* Facebook */}
          <li className="flex items-center space-x-4">
            <div className="bg-blue-100 rounded-full p-3 flex justify-center items-center z-10">
              <FaFacebook className="text-blue-600 text-xl" />
            </div>
            <span className="text-gray-700">Fattuah</span>
          </li>

          {/* Instagram */}
          <li className="flex items-center space-x-4">
            <div className="bg-blue-100 rounded-full p-3 flex justify-center items-center z-10">
              <FaInstagram className="text-blue-600 text-xl" />
            </div>
            <span className="text-gray-700">Fathufathu</span>
          </li>

          {/* Twitter */}
          <li className="flex items-center space-x-4">
            <div className="bg-blue-100 rounded-full p-3 flex justify-center items-center z-10">
              <FaTwitter className="text-blue-600 text-xl" />
            </div>
            <span className="text-gray-700">fufufafa</span>
          </li>

          {/* TikTok */}
          <li className="flex items-center space-x-4">
            <div className="bg-blue-100 rounded-full p-3 flex justify-center items-center z-10">
              <FaTiktok className="text-blue-600 text-xl" />
            </div>
            <span className="text-gray-700">fufufafa12</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;