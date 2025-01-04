import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Register.css";

export default function Login({ setUser }) {
  const [formValues, setFormValues] = useState({
    email: "",
    user_password: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle dropdown and other inputs dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        formValues
      );
      console.log(response.data);
      if (response.status === 201) {
        setSuccessMessage(response.data.message);
        setError("");
        setFormValues({
          email: "",
          user_password: "",
        });
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <div className="container-fluid p-5 custom-bg-register">
        <div className="container">
          <h1 className="text-center mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="user_password"
                value={formValues.user_password}
                onChange={handleInputChange}
                className="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Remember Me
              </label>
            </div>
            {successMessage && (
              <div class="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn custom-btn">
              Submit
            </button>
            <div className="login-option d-flex gap-1 mt-2">
              <p>Don't have account?</p>
              <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
