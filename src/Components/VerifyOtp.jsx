import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Register.css";

export default function VerifyOtp() {
  const location = useLocation();
  const { email } = location.state || {};
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!otp) {
      setError("OTP is required!");
      return;
    }

    // Proceed with the API call to verify OTP
    axios
      .post("http://localhost:8000/verify-otp", { email, otp })
      .then((res) => {
        if (res.data.status === "Success") {
          setSuccessMessage("Registration successful! Redirecting to login...");
          alert("Registration Successful! Welcome!");

          // Redirect to the login page after a short delay
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Redirect after 2 seconds
        } else {
          setError(
            res.data.Error || "OTP verification failed. Please try again."
          );
        }
      })
      .catch((err) => {
        setError("OTP verification failed. Please try again.");
        console.error(err);
      });
  };

  return (
    <div className="container-fluid pt-5 custom-bg-register d-flex justify-content-center align-items-center">
      <div className="container border border-black p-5 rounded custom-bg-password w-50">
        <h1 className="mb-3 text-center fw-bold">Verify OTP</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label fw-bold fs-5">
              Enter OTP
            </label>
            <input
              type="text"
              className="form-control"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn custom-btn">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
