import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import api from "../../api";

const ContactLink = () => {
  const [profile, setProfile] = useState({
    instagramProfile: "",
    facebookProfile: "",
    twitterProfile: "",
    tiktokProfile: "",
  });

  useEffect(() => {
    // Fetch profile data
    api
      .get("/contact")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  }, []);

  return (
    <div className="items-center space-y-4 text-sm">
      {profile.instagramProfile && (
        <a
          href={`https://instagram.com/@${profile.instagramProfile}`}
          target="_blank"
          rel="noopener noreferrer"
          className="items-center text-center no-underline"
        >
          <FaInstagram className="cursor-pointer hover:text-pink-500 text-xl" />
          <span>{profile.instagramProfile}</span>
        </a>
      )}
      {profile.facebookProfile && (
        <a
          href={`https://facebook.com/${profile.facebookProfile}`}
          target="_blank"
          rel="noopener noreferrer"
          className="items-center text-center no-underline"
        >
          <FaFacebook className="cursor-pointer hover:text-blue-600 text-xl" />
          <span>{profile.facebookProfile}</span>
        </a>
      )}
      {profile.twitterProfile && (
        <a
          href={`https://twitter.com/${profile.twitterProfile}`}
          target="_blank"
          rel="noopener noreferrer"
          className="items-center text-center no-underline"
        >
          <FaTwitter className="cursor-pointer hover:text-blue-500 text-xl" />
          <span>{profile.twitterProfile}</span>
        </a>
      )}
      {profile.tiktokProfile && (
        <a
          href={`https://tiktok.com/@${profile.tiktokProfile}`}
          target="_blank"
          rel="noopener noreferrer"
          className="items-center text-center no-underline"
        >
          <FaTiktok className="cursor-pointer hover:text-black text-xl" />
          <span>{profile.tiktokProfile}</span>
        </a>
      )}
    </div>
  );
};

export default ContactLink;