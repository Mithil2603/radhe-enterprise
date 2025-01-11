import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./styles/Admin.css";

export default function Admin() {
  return (
    <>
      <div className="d-flex">
        <ul className="nav flex-column custom-bg-sidebar width-30">
          <li className="nav-item">
            <Link className="nav-link active custom-color pt-5" aria-current="page" to="/admin">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-color" to="/admin/users">
              Manage Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-color" to="/admin/categories">
              Manage Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-color" to="/admin/products">
              Manage Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-color" to="/admin/orders">
              Manage Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-color" to="/admin/delivery">
              Manage Delivery
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-color" to="/admin/payments">
              Manage Payments
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-color" to="/admin/feedback">
              Manage Feedback
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-color pb-5" to="/admin/services">
              Manage Services
            </Link>
          </li>
        </ul>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
