import React from "react";
import Hero from "./content-components/Hero";
import SubHeader from "./content-components/SubHeader";
import Product from "./content-components/Product";
import KenapaHarusFimpa from "./content-components/KenapaHarusFimpa";
import Installasi from "./content-components/Installasi";
import Pengecekan from "./content-components/Pengecekan";
import Pembersihan from "./content-components/Pembersihan";
import ContactUs from "./content-components/ContactUs";
import CustomerReviews from "./content-components/CustomerReviews";
import Footer from "./content-components/Footer";
import Navbar from "./Navb";

const ContentHome = ({ role }) => {
  return (
    <>
    <Navbar/>
      <Hero />
      <div id="home" aria-label="Welcome to the Home Page">
        <SubHeader />
        <section id="category" aria-label="Product Categories">
          <Product />
        </section>
        <KenapaHarusFimpa />
        <Installasi />
        <Pengecekan />
        <Pembersihan />

        <section id="contact" aria-label="Get in Touch with Us">
          <ContactUs />
        </section>

        {/* Customer Reviews - Selalu Render untuk Semua Role */}
        <section id="reviews" aria-label="Customer Feedback and Reviews">
          <CustomerReviews role={role} />
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ContentHome;