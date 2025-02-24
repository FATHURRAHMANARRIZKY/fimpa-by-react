import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import ContactLink from "./ContactLink"; // Import ContactLink

const Footer = () => {
  return (
    <div className="bg-black text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-auto text-left">
          <h2 className="text-2xl font-bold">Fimpa Co.</h2>
          <p>
            Your Pipes, Our Priority: Repair, Install, and Maintain with Care.
          </p>
          <ul className="mt-4 space-y-2">
            <li>About</li>
            <li>Product</li>
            <li>Reviews</li>
            <li>fimpa@gmail.com</li>
          </ul>
        </div>

        {/* Ganti bagian ini dengan ContactLink */}
        <div className="w-full md:w-auto text-left">
          <ContactLink /> {/* Menampilkan social media links */}
        </div>

        <div className="w-full md:w-auto">
          <iframe
            title="Google Maps"
            className="w-full h-48 md:w-80 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093703!2d144.9537363156546!3d-37.816279742021824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577c3f8e9b36e0!2sMelbourne%20CBD%2C%20Victoria%2C%20Australia!5e0!3m2!1sen!2sus!4v1600852271917!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Footer;