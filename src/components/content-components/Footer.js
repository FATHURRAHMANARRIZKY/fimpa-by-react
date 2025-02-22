import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">Fimpa Co.</h2>
          <p>Your Pipes, Our Priority: Repair, Install, and Maintain with Care.</p>
          <ul className="mt-4 space-y-2">
            <li>About</li>
            <li>Product</li>
            <li>Reviews</li>
            <li>fimpa@gmail.com</li>
          </ul>
        </div>

        <div className="mb-6 md:mb-0">
          <ul className="mt-4 space-y-2">
            <li>About</li>
            <li>Product</li>
            <li>Reviews</li>
            <li>fimpa@gmail.com</li>
          </ul>
        </div>

        <div className="flex flex-col space-y-4 text-xl">
          <FaFacebook className="cursor-pointer hover:text-blue-500" />
          <FaTwitter className="cursor-pointer hover:text-blue-400" />
          <FaInstagram className="cursor-pointer hover:text-pink-500" />
        </div>

        <div>
          <iframe
            title="Google Maps"
            className="w-80 h-48 rounded-lg"
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