import React from "react";
import "../styles/Navbar.css";
import logo from "../images/RadheEnterprise.svg";
import menu from "../images/menu.svg";

export default function AdminNav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg text-light position-sticky top-0 custom-bg z-index-full ">
        <div className="container d-flex justify-content-between align-items-center w-full flex-wrap-none">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <span className="navbar-brand mb-0 h1">
              <img src={logo} alt="Logo" className="main-logo" />
            </span>
          </div>
          
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
    </>
  );
}
