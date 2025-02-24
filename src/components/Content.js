import React, { useState } from "react";
import Hero from "./content-components/Hero";
import SubHeader from "./content-components/SubHeader";
import Product from "./content-components/Product";
import KenapaHarusFimpa from "./content-components/KenapaHarusFimpa";
import ContactUs from "./content-components/ContactUs";
import CustomerReviews from "./content-components/CustomerReviews";
import Footer from "./content-components/Footer";
import Navbar from "./Navbar";

const ContentHome = ({ role }) => {
  const [activeSection, setActiveSection] = useState("home");

  const handleNavLinkClick = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar
        activeLink={activeSection}
        handleNavLinkClick={handleNavLinkClick}
      />
      <div id="home" aria-label="Welcome to the Home Page">
      <Hero />
        <section id="about">
          <SubHeader />
        </section>

        <section id="product" aria-label="Product Categories">
          <Product />
        </section>
        <KenapaHarusFimpa />

        <section id="contact" aria-label="Get in Touch with Us">
          <ContactUs />
        </section>
        <section id="reviews" aria-label="Customer Feedback and Reviews">
          <CustomerReviews role={role} />
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ContentHome;
