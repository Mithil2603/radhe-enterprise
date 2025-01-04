import React from "react";
import "./styles/Navbar.css";
import { Link } from "react-router-dom";
import logo from "./images/RadheEnterprise.svg";
import menu from "./images/menu.svg";
// import gsap from "gsap";

export default function Navbar({ user, setUser }) {
  console.log("User in Navbar:", user);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    setUser(null); // Clear the user state
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg text-light position-sticky top-0 custom-bg z-5">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link className="navbar-brand custom-font-family" to="/">
            <img src={logo} alt="Radhe Enterprise" className="main-logo" />
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler menu"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <img src={menu} alt="menu-bar" />
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/creels">
                      Creels
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Tension
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Other Fabrication Works
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
              {user ? (
                <>
                  <Link to="/profile" className="nav-link">
                    <button className="btn custom-btn nav-btn">Profile</button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn custom-btn nav-btn"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className="nav-link" to="/login">
                    <button className="btn custom-btn nav-btn">Login</button>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
