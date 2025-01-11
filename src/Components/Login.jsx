import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Register.css";
import axios from "axios";

export default function Login() {
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
    axios
      .post("http://localhost:8080/login", values)
      .then((res) => {
        if (res.data.status === "Success") {
          setSuccessMessage("Login successful! Redirecting to HomePage...");
          setTimeout(() => {
            navigate("/");
          }, 1000);
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
    <div className="container-fluid p-5 custom-bg-register">
      <div className="container">
        <h1 className="text-center mb-5 font-bold-2xl">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="form-container font-bold register"
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
              onChange={(e) =>
                setValues({ ...values, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="user_password"
              className="form-control"
              required
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
          <button type="submit" className="btn custom-btn mt-3 mb-3">
            Submit
          </button>
          <div className="login-option d-flex gap-1 mt-2">
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </div>
          <Link to="/forgot-password">Forgot your password?</Link>
        </form>
      </div>
    </div>
  );
}
