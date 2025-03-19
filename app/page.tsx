"use client";
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import Header from './header/page';
import Footer from './footer/page';

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
      </Head>
      <Header />
      <main>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active position-relative">
              <Image src="/img_bg_3.jpg" alt="Slide 1" width={1200} height={300} className="d-block w-100" />
              <div className="carousel-caption custom-caption">
                <h1 className="text-white">Men's</h1>
                <h2 className="text-white">Shoes Collection</h2>
                <p className="text-white">New trending shoes</p>
              </div>
            </div>

            <div className="carousel-item position-relative">
              <Image src="/women.jpg" alt="Slide 2" width={1200} height={300} className="d-block w-100" />
              <div className="carousel-caption custom-caption">
                <h1 className="text-white">Huge</h1>
                <h2 className="text-white">Sale</h2>
                <h2 className="text-white"><strong className="fw-bold">50%</strong> Off</h2>
                <p className="text-white">Big sale shoes</p>
              </div>
            </div>

            <div className="carousel-item position-relative">
              <Image src="/img_bg_1.jpg" alt="Slide 3" width={1200} height={300} className="d-block w-100" />
              <div className="carousel-caption custom-caption">
                <h1 className="text-white">New</h1>
                <h2 className="text-white">Arrival</h2>
                <h2 className="text-white">Up to <strong className="fw-bold">30%</strong> off</h2>
                <p className="text-white">Shop Collection</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
        <div className="colorlib-intro">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h2 className="intro">It started with a simple idea: Create quality, well-designed products that I wanted myself.</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="colorlib-product">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6 text-center">
                <div className="featured">
                  <a
                    href="/product"
                    className="featured-img"
                    style={{ backgroundImage: `url('men.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  ></a>
                  <div className="desc">
                    <h2><a href="/product" style={{ textDecoration: "none" }}>Shop Men's Collection</a></h2>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 text-center">
                <div className="featured">
                  <a
                    href="/product"
                    className="featured-img"
                    style={{ backgroundImage: `url('/women.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  ></a>
                  <div className="desc">
                    <h2><a href="/product" style={{ textDecoration: "none" }}>Shop Women's Collection</a></h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="colorlib-partner">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 offset-sm-2 text-center colorlib-heading colorlib-heading-sm partners">
                <h2>Trusted Partners</h2>
              </div>
            </div>
            <div className="row">
              <div className="col partner-col text-center brand">
                <Image src="/brand-1.jpg" className="img-fluid" width={200} height={200} alt="" />
              </div>
              <div className="col partner-col text-center">
                <Image src="/brand-2.jpg" className="img-fluid" width={200} height={200} alt="" />
              </div>
              <div className="col partner-col text-center">
                <Image src="/brand-3.jpg" className="img-fluid" width={200} height={200} alt="" />
              </div>
              <div className="col partner-col text-center">
                <Image src="/brand-4.jpg" className="img-fluid" width={200} height={200} alt="" />
              </div>
              <div className="col partner-col text-center">
                <Image src="/brand-5.jpg" className="img-fluid" width={200} height={200} alt="" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
