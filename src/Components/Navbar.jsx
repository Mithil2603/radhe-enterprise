import React, { useEffect, useState } from "react";
import "./styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/RadheEnterprise.svg";
import menu from "./images/menu.svg";
import axios from "axios";

export default function Navbar() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((res) => {
        if (res.data.status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [navigate]);
  return (
    <>
      <nav className="navbar navbar-expand-lg text-light position-sticky top-0 custom-bg z-index-full">
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
                <Link className="nav-link" aria-current="page" to="/">
                  Home
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
                      Tensioners
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/fabrication">
                      Other Fabrication Works
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
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
              {auth ? (
                <div className="profile-icon d-flex align-items-center justify-content-center">
                  <Link className="nav-link" to="/profile">
                    <button className="btn custom-btn nav-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="white"
                        className="bi bi-person-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                      </svg>
                      {" Hello "}
                      {name}
                    </button>
                  </Link>
                </div>
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
