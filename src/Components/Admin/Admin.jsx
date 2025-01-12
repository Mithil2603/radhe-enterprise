import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
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
  return (
    <>
      <div className="container-fluid pt-5 custom-bg-admin">
        <div className="container w-100">
          <div className="d-flex justify-content-between align-items-center fw-bolder gap-3 shiny-box flex-wrap">
            <div className="welcome text-dark">Welcome {name}!</div>
            <button
              className="btn custom-btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasScrolling"
              aria-controls="offcanvasScrolling"
            >
              Open Panel
            </button>
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
                    className="nav-link custom-color border-bottom"
                    to="/admin/feedback"
                  >
                    Manage Feedback
                  </Link>
                </li>
                <li className="nav-item w-100">
                  <Link
                    className="nav-link custom-color pb-5"
                    to="/admin/services"
                  >
                    Manage Services
                  </Link>
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
