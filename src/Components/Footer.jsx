import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/RadheEnterprise.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="bd-footer py-4 py-md-5 bg-dark text-light">
        <div className="container py-4 py-md-5 px-4 px-md-3 text-body-secondary">
          <div className="row">
            <div className="col-lg-3 mb-3">
              <Link
                className="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none"
                to="/"
                aria-label="Radhe Enterprise"
              >
                <img src={logo} alt="main-logo" className="main-logo" />
              </Link>
              <ul className="list-unstyled small">
                <li className="mb-2 text-light">
                  We are greatly thankful to the person who developed this
                  website our developer{" "}
                  <Link to="https://linkedin.com/in/sutharmithil">
                    Mithil Suthar
                  </Link>
                  .
                </li>
                <li className="text-light">&copy; From 2024 to {currentYear} - Radhe Enterprise Pvt. Ltd.</li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 offset-lg-1 mb-3 text-light">
              <h5>Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/">Home</Link>
                </li>
                <li className="mb-2">
                  <Link to="/about">About Us</Link>
                </li>
                <li className="mb-2">
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 mb-3 text-light">
              <h5>Our Products</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/creels">Creels</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 mb-3 text-light">
              <h5>Our Developers</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="https://wa.me/qr/6VCWQV5SDRP3C1">
                    Mithil Suthar
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="https://github.com/twbs/bootstrap/discussions"
                    target="_blank"
                    rel="noopener"
                  >
                    Raza Devjani
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="https://github.com/sponsors/twbs"
                    target="_blank"
                    rel="noopener"
                  >
                    Jiya Baria
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
