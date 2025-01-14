import React from "react";
import { Link } from "react-router-dom";
import "./styles/Fabrication.css";

const Fabrication = () => {
  return (
    <div className="container-fluid pb-5 pt-5 fabrication-bg">
      <div className="container fs-1">
        <header className="my-3">
          <h1 className="fw-bolder text-center">Comprehensive Fabrication Services</h1>
          <p>From custom machine creels to all types of fabrication works.</p>
        </header>

        <section className="my-5">
          <h1 className="fw-bolder text-center">Our Services</h1>
          <div className="services pt-3">
            <div className="service">
              <h3 className="fw-bolder">Custom Fabrication</h3>
              <p>
                We offer custom fabrication solutions tailored to your needs.
              </p>
            </div>
            <div className="service pt-3">
              <h3 className="fw-bolder">Welding Services</h3>
              <p>
                High-quality welding services for various materials and
                projects.
              </p>
            </div>
            {/* Add more services as needed */}
          </div>
        </section>

        <footer>
          <Link to="/contact" className="btn custom-btn w-100">Contact Us</Link>
        </footer>
      </div>
    </div>
  );
};

export default Fabrication;
