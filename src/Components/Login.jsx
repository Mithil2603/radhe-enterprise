import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Register.css";
import axios from "axios";
import logo from "./images/RadheEnterprise.svg";

export default function Login({ setRole }) {
  const [values, setValues] = useState({
    email: "",
    user_password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(""); // Clear any previous errors
    
    if (!values.email) {
      setError("Email is required!");
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(values.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    if (!values.user_password) {
      setError("Password field is required!");
      return;
    }

    axios
      .post("http://localhost:8000/login", values)
      .then((res) => {
        if (res.data.status === "Success") {
          const { user_type } = res.data;

          // Save the role in local storage
          localStorage.setItem("role", user_type);
          localStorage.setItem("token", res.data.token);

          setRole(user_type);

          if (user_type === "Owner") {
            setSuccessMessage(
              "Login Successful! Redirecting to Admin Dashboard..."
            );
            setTimeout(() => {
              navigate("/admin");
            }, 1000);
          } else if (user_type === "Customer") {
            setSuccessMessage("Login successful! Redirecting to HomePage...");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Login failed. Please try again."
        );
      });
  };

  return (
    <div className="container-fluid custom-bg-reset d-flex justify-content-center align-items-center">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="form-container font-bold register border rounded border-dark padding-5 custom-bg-password"
        >
          {/* Logo */}
          <Link className="navbar-brand custom-font-family w-100 d-inline-block text-center mb-5" to="/">
            <img src={logo} alt="Radhe Enterprise" className="main-logo login-logo" />
          </Link>
          {/* <h1 className="text-center mb-5 mt-3 font-size-2xl fw-bolder">Login</h1> */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="user_password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="user_password"
              className="form-control"
              
              onChange={(e) =>
                setValues({ ...values, user_password: e.target.value })
              }
            />
          </div>
          {successMessage && (
            <div className="alert alert-success mt-3 mb-3" role="alert">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="btn custom-btn mt-3 mb-3 font-bold-xl">
            Login
          </button>
          <div className="login-option d-flex gap-1 mt-2">
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </div>
          <Link to="/reset-password">Forgot your password?</Link>
        </form>
      </div>
    </div>
  );
}
