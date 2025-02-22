import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const ContactLink = () => {
  const [profile, setProfile] = useState({
    instagramProfile: "",
    facebookProfile: "",
    twitterProfile: "",
    tiktokProfile: "",
  });

  useEffect(() => {
    // Fetch profile data
    axios.get("http://localhost:8080/api/contact")
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error("Error fetching profile data", error);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-6 mt-4 text-2xl">
        {profile.instagramProfile && (
          <a href={`https://instagram.com/@${profile.instagramProfile}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center no-underline">
            <FaInstagram className="cursor-pointer hover:text-pink-500" />
            <span>{profile.instagramProfile}</span>
          </a>
        )}
        {profile.facebookProfile && (
          <a href={`https://facebook.com/${profile.facebookProfile}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center no-underline">
            <FaFacebook className="cursor-pointer hover:text-blue-600" />
            <span>{profile.facebookProfile}</span>
          </a>
        )}
        {profile.twitterProfile && (
          <a href={`https://twitter.com/${profile.twitterProfile}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center no-underline">
            <FaTwitter className="cursor-pointer hover:text-blue-500" />
            <span>{profile.twitterProfile}</span>
          </a>
        )}
        {profile.tiktokProfile && (
          <a href={`https://tiktok.com/@${profile.tiktokProfile}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center no-underline">
            <FaTiktok className="cursor-pointer hover:text-black" />
            <span>{profile.tiktokProfile}</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactLink;