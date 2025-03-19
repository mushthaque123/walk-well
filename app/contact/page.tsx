"use client";
import Head from 'next/head';
import { useEffect } from 'react';
import Header from '../header/page';
import Footer from '../footer/page';

const ContactPage = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Walk Well - Contact Us</title>
      </Head>
      <Header />
      <main>
        <header className="text-center text-white bg-primary py-5">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you!</p>
        </header>
        <section className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg p-4">
                <h2 className="mb-4 text-center">Get In Touch</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input type="email" className="form-control" id="email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows={4} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Send Message</button>
                </form>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card shadow-lg p-4">
                <h2 className="mb-4 text-center">Contact Details</h2>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex align-items-center">
                    <div>
                      <p className="mb-1"><strong>Address:</strong></p>
                      <p className="mb-0">Walk Well, Online Shoe Shopping</p>
                      <p className="mb-0">Mukkam, Kozhikode</p>
                    </div>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <div>
                      <p className="mb-1"><strong>Email:</strong></p>
                      <p className="mb-0">walkwell.com</p>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div>
                      <p className="mb-1"><strong>Phone:</strong></p>
                      <p className="mb-0">+91 90486 25482</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
