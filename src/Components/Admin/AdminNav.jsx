import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import logo from "../images/RadheEnterprise.svg";
import menu from "../images/menu.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminNav() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
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
        <div className="container d-flex justify-content-between align-items-center w-full">
          <span className="container-fluid d-flex justify-content-between align-items-center">
            <Link className="navbar-brand mb-0 h1 flex-shrink-1" to="/admin/">
              <span>
                <img src={logo} alt="Logo" className="main-logo" />
              </span>
            </Link>
          </span>

          <button
            className="btn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            <img src={menu} alt="menu-bar" />
          </button>
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header custom-bg-sidebar">
          <h5
            className="offcanvas-title text-light"
            id="offcanvasScrollingLabel"
          >
            Admin Dashboard
          </h5>
          <button
            type="button"
            className="btn-close bg-light"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body custom-bg-sidebar">
          <ul className="nav w-100">
            <li className="nav-item w-100 ">
              <Link
                className="nav-link active custom-color border-bottom pt-5"
                aria-current="page"
                to="/admin/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link
                className="nav-link custom-color border-bottom"
                to="/admin/dynamic_reports"
              >
                Reports
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link
                className="nav-link custom-color border-bottom"
                to="/admin/users"
              >
                View Users
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link
                className="nav-link custom-color border-bottom"
                to="/admin/categories"
              >
                Manage Categories
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link
                className="nav-link custom-color border-bottom"
                to="/admin/products"
              >
                Manage Products
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link
                className="nav-link custom-color border-bottom"
                to="/admin/orders"
              >
                Manage Orders
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link
                className="nav-link custom-color border-bottom"
                to="/admin/payments"
              >
                Manage Payments
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link
                className="nav-link custom-color border-bottom"
                to="/admin/delivery"
              >
                Manage Delivery
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link className="nav-link custom-color" to="/admin/services">
                Manage Services
              </Link>
            </li>
            <li className="nav-item w-100 text-center">
              {auth ? (
                <div className="profile-icon">
                  <Link
                    className="nav-link w-full d-flex justify-content-center"
                    to="/profile"
                  >
                    <button className="btn custom-btn nav-btn d-flex align-items-center justify-content-center gap-2">
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
                      <span className="text-white">{name}</span>
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
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
