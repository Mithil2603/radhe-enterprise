import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./styles/Admin.css";
import axios from "axios";

export default function Admin() {
  const [name, setName] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((res) => {
        if (res.data.status === "Success") {
          setName(res.data.name);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [auth, setAuth] = useState(false);
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
      <div className="container-fluid pt-5 custom-bg-admin">
        <div className="container w-100">
          <div className="d-flex justify-content-center align-items-center fw-bolder gap-3 shiny-box flex-wrap">
            <div className="welcome text-dark">Welcome {name}!</div>
          </div>

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
                <li className="nav-item w-100">
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
                    to="/admin/users"
                  >
                    Manage Users
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
                  <Link
                    className="nav-link custom-color"
                    to="/admin/services"
                  >
                    Manage Services
                  </Link>
                </li>
                <li className="nav-item w-100">
                  {auth ? (
                    <div className="profile-icon">
                      <Link className="nav-link w-full d-flex justify-content-center" to="/profile">
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
                        <button className="btn custom-btn nav-btn">
                          Login
                        </button>
                      </Link>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* This will render any content based on the selected route */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
