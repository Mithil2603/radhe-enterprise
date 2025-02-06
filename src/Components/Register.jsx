import React, { useState } from "react";
import "./styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./images/RadheEnterprise.svg";

export default function Register() {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    company_name: "",
    company_address: "",
    address_city: "",
    address_state: "",
    address_country: "",
    pincode: "",
    GST_no: "",
    user_password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Required field validation
    if (!values.first_name) {
      setError("First Name is required!");
      return;
    }
    if (!values.last_name) {
      setError("Last Name is required!");
      return;
    }
    if (!values.email) {
      setError("Email is required!");
      return;
    }
    if (!values.phone_number) {
      setError("Phone Number is required!");
      return;
    }
    if (!values.user_password) {
      setError("Password field is required!");
      return;
    }
    if (!values.confirmPassword) {
      setError("Confirm Password field is required!");
      return;
    }

    // Validate phone number format
    const cleanedPhoneNumber = values.phone_number.replace(/\s/g, "");
    const phoneNumberRegex = /^\+[1-9]\d{11,11}$/;
    if (!phoneNumberRegex.test(cleanedPhoneNumber)) {
      setError(
        "Invalid phone number format. Please include country code and insert 10 numbers."
      );
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(values.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(values.user_password)) {
      setError(
        "Password must be at least 8 characters long, contain a number and a special character."
      );
      return;
    }

    // Check if passwords match
    if (values.user_password !== values.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Clear error if all validations pass
    setError("");

    // Proceed with the API call
    axios
      .post("http://localhost:8000/register", values)
      .then((res) => {
        if (res.data.status === "Success") {
          
          setValues({
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            company_name: "",
            company_address: "",
            address_city: "",
            address_state: "",
            address_country: "",
            pincode: "",
            GST_no: "",
            user_password: "",
            confirmPassword: "",
          });
          // Navigate to OTP verification page
          navigate("/verify-otp", { state: { email: values.email } });
        } else {
          setError(
            res.data.message || "Registration failed. Please try again."
          );
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          setError(err.response.data.message);
        } else {
          setError("Registration failed. Please try again.");
        }
        console.error(err);
      });
  };

  return (
    <div className="container-fluid p-5 custom-bg-register">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="form-container font-bold register border border-black p-5 rounded custom-bg-password"
        >
          {/* Logo */}
          <Link
            className="navbar-brand custom-font-family w-100 d-inline-block text-center mb-5"
            to="/"
          >
            <img
              src={logo}
              alt="Radhe Enterprise"
              className="main-logo login-logo"
            />
          </Link>
          {error && <div className="alert alert-danger mt-3 mb-3">{error}</div>}
          {/* Input fields */}
          <div className="d-flex w-100 gap-4">
            <div className="mb-3 w-50">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                className="form-control"
                id="first_name"
                onChange={(e) =>
                  setValues({ ...values, first_name: e.target.value })
                }
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                className="form-control"
                id="last_name"
                onChange={(e) =>
                  setValues({ ...values, last_name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">
              Phone No.
            </label>
            <input
              type="text"
              name="phone_number"
              className="form-control"
              placeholder="+919876543210"
              id="phone_number"
              onChange={(e) => {
                const cleanedValue = e.target.value.replace(/\s/g, "");
                setValues({ ...values, phone_number: cleanedValue });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="company_name" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              className="form-control"
              id="company_name"
              onChange={(e) =>
                setValues({ ...values, company_name: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="company_address" className="form-label">
              Company Address
            </label>
            <input
              type="text"
              name="company_address"
              className="form-control"
              id="company_address"
              onChange={(e) =>
                setValues({ ...values, company_address: e.target.value })
              }
            />
          </div>
          <div className="d-flex w-100 gap-4">
            <div className="mb-3 w-50">
              <label htmlFor="address_city" className="form-label">
                City
              </label>
              <input
                type="text"
                name="address_city"
                className="form-control"
                id="address_city"
                onChange={(e) =>
                  setValues({ ...values, address_city: e.target.value })
                }
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="address_state" className="form-label">
                State
              </label>
              <input
                type="text"
                name="address_state"
                className="form-control"
                id="address_state"
                onChange={(e) =>
                  setValues({ ...values, address_state: e.target.value })
                }
              />
            </div>
          </div>
          <div className="d-flex w-100 gap-4">
            <div className="mb-3 w-50">
              <label htmlFor="address_country" className="form-label">
                Country
              </label>
              <input
                type="text"
                name="address_country"
                className="form-control"
                id="address_country"
                onChange={(e) =>
                  setValues({ ...values, address_country: e.target.value })
                }
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="pincode" className="form-label">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                className="form-control"
                id="pincode"
                onChange={(e) =>
                  setValues({ ...values, pincode: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="GST_no" className="form-label">
              GST No
            </label>
            <input
              type="text"
              name="GST_no"
              className="form-control"
              id="GST_no"
              onChange={(e) => setValues({ ...values, GST_no: e.target.value })}
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
              id="user_password"
              onChange={(e) =>
                setValues({ ...values, user_password: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              id="confirmPassword"
              onChange={(e) =>
                setValues({ ...values, confirmPassword: e.target.value })
              }
            />
          </div>
          {error && <div className="alert alert-danger mt-3 mb-3">{error}</div>}
          <button
            type="submit"
            className="btn custom-btn mt-3 mb-3 font-bold-xl"
          >
            Register
          </button>
          {successMessage && (
            <div className="alert alert-success mt-3 mb-3" role="alert">
              {successMessage}
            </div>
          )}
          <div className="login-option d-flex gap-1 mt-2">
            <p>Already Registered?</p>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
