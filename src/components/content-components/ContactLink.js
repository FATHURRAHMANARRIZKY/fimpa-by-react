import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import api from "../../api";

const ContactLink = () => {
  const [profile, setProfile] = useState({});

  // Fetch profile data from the server
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/contact");

      // Limit to maximum 4 social media platforms
      const transformedProfile = response.data
        .slice(0, 4) // Only take the first 4 items from the response
        .reduce((acc, { name, mediasocial }) => {
          acc[mediasocial] = name; // Use mediasocial as the key and name as the value
          return acc;
        }, {});

      setProfile(transformedProfile); // Set the transformed profile data
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <>
      {Object.keys(profile).map((key) => {
        let icon = null;
        switch (key) {
          case "instagram":
            icon = <FaInstagram className="text-pink-500 text-xl" />;
            break;
          case "facebook":
            icon = <FaFacebook className="text-blue-600 text-xl" />;
            break;
          case "twitter":
            icon = <FaTwitter className="text-blue-400 text-xl" />;
            break;
          case "tiktok":
            icon = <FaTiktok className="text-black text-xl" />;
            break;
          default:
            break;
        }

        return (
          <div key={key} className="mb-1">
            <a
              href={`https://${key.toLowerCase()}.com/${profile[key]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-white hover:underline"
            >
              {icon}
              <span>{profile[key]}</span>
            </a>
          </div>
        );
      })}
    </>
  );
};

export default ContactLink;