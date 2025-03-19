import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import Image from 'next/image';
const Footer = () => {
    return (

        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h5>About Us</h5>
                        <p>Your favorite online shoe store, offering a wide variety of shoes for men, women, and children. Quality and comfort are our priorities.</p>
                    </div>
                    <div className="col-md-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white">Home</a></li>
                            <li><a href="/shop" className="text-white">Collections</a></li>
                            <li><a href="/about" className="text-white">About Us</a></li>
                            <li><a href="/contact" className="text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li><i className="fas fa-phone"></i> 9048625482</li>
                            <li><i className="fas fa-envelope"></i> walkwell.com</li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled d-flex">
                            <li className="mr-3"><a href="#" className="text-white"><i className="bi bi-facebook"></i></a></li>
                            <li className="mr-3"><a href="#" className="text-white"><i className="bi bi-twitter"></i></a></li>
                            <li className="mr-3"><a href="#" className="text-white"><i className="bi bi-instagram"></i></a></li>
                            <li className="mr-3"><a href="#" className="text-white"><i className="bi bi-whatsapp"></i></a></li>
                        </ul>
                                <Image
                                    src="/walkwell.svg"
                                    alt="WalkWell"
                                    width={70}  
                                    height={100}  
                                />
                    </div>
                </div>

                <hr className="bg-white" />
                <div className="text-center">
                    <p>&copy; 2025 Well Walk. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
