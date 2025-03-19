"use client";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import Header from "../header/page";
import Footer from "../footer/page";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are included

const HomePage = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Walk Well</title>
        <meta name="description" content="Shoe Shop - Where Style Meets Comfort" />
      </Head>
      <Header />
      <main>
        <header className="hero-section bg-dark text-white py-5">
          <div className="container text-center">
            <h1>Welcome to Walk Well</h1>
            <p>Where Style Meets Comfort</p>
          </div>
        </header>
        <section className="about-section py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
              <h2 style={{ textAlign: "center", fontWeight:"30px" }}>Our Story</h2>
                <p style={{ fontSize: "24px" }}>
                  Founded in <strong>2025</strong>, Walk well is dedicated to providing high-quality,
                  stylish, and comfortable footwear for every occasion. Our collection features
                  trendy sneakers, formal shoes, sportswear, and more – ensuring you step out in confidence.
                </p>
                <p style={{ fontSize: "24px"}}>
                  With a commitment to craftsmanship, innovation, and customer satisfaction, we strive to
                  offer the best in fashion and comfort.
                </p>
              </div>
              <div className="col-md-6 text-center">
                <Image src="/slide.jpg" alt="Shoe Store" className="img-fluid rounded" width={600} height={300} />
              </div>
            </div>
          </div>
        </section>
        <section className="why-choose-us py-5 bg-light">
          <div className="container text-center">
            <h2>Why Choose Us?</h2>
            <div className="row mt-4">
              <div className="col-md-3">
                <div className="icon-box">
                  <i className="bi bi-gem fs-1"></i>
                  <h5>Premium Quality</h5>
                  <p>Finest materials for durability and comfort.</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="icon-box">
                  <i className="bi bi-cart-check fs-1"></i>
                  <h5>Affordable Prices</h5>
                  <p>Top-quality shoes at unbeatable prices.</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="icon-box">
                  <i className="bi bi-stars fs-1"></i>
                  <h5>Stylish Designs</h5>
                  <p>Trendy, classic, and everything in between.</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="icon-box">
                  <i className="bi bi-emoji-smile fs-1"></i>
                  <h5>Customer Satisfaction</h5>
                  <p>Your happiness is our priority.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
