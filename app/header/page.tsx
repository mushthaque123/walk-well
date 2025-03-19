import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';
const Header: React.FC = () => {
    return (
        <header className="bg-light py-3">
            <div className="container">
                <div className="row align-items-center">

                    <div className="col-md-3">
                        <a href="/" className="navbar-brand">
                            <Image src="/walkwellnew.svg" alt="WalkWell" width={70} height={100} />
                        </a>
                    </div>

                    <div className="col-md-6 text-center">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarNav"
                                aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/" style={{ color: 'red' }}>
                                            HOME
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/product">
                                            COLLECTIONS
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/about">
                                            ABOUT
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/contact">
                                            CONTACT
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </nav>
                    </div>
                    <div className="col-md-3 text-end">
                        <form className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                            <a href="/cart" className="ms-3 text-end" >
                                <i className="bi bi-cart-fill" style={{ fontSize: '1.5rem' }}></i>{' '}
                            </a>
                        </form>

                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
