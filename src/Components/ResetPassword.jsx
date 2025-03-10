import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./images/RadheEnterprise.svg";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required.";
    return emailRegex.test(email) ? null : "Invalid email format.";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password))
      return "Include at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Include at least one lowercase letter.";
    if (!/\d/.test(password)) return "Include at least one number.";
    if (!/[!@#$%^&*()]/.test(password))
      return "Include at least one special character.";
    return null;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) return setError(emailError);

    try {
      const res = await axios.post("http://localhost:8000/forgot-password", {
        email,
      });
      if (res.data.status === "Success") {
        setIsOTPSent(true);
        setError("");
        setSuccessMessage("OTP sent to your email.");
      } else setError(res.data.message || "Failed to send OTP.");
    } catch (err) {
      setError(err.response?.data?.Error || "Failed to send OTP.");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) return setError("OTP is required.");

    try {
      const res = await axios.post("http://localhost:8000/verify-reset-otp", {
        email,
        otp,
      });
      if (res.data.status === "Success") {
        setIsOTPVerified(true);
        setResetToken(res.data.resetToken);
        setError("");
        setSuccessMessage("OTP verified. You can now reset your password.");
      } else setError(res.data.Error || "Invalid OTP.");
    } catch (err) {
      setError(err.response?.data?.Error || "OTP verification failed.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword)
      return setError("Passwords do not match.");
    const passwordError = validatePassword(newPassword);
    if (passwordError) return setError(passwordError);

    try {
      const res = await axios.post("http://localhost:8000/reset-password", {
        email,
        user_password: newPassword,
        resetToken,
      });
      if (res.data.status === "Success") {
        setSuccessMessage(res.data.message);
        setTimeout(() => navigate("/login"), 1000);
      } else setError(res.data.Error || "Password reset failed.");
    } catch (err) {
      setError(err.response?.data?.Error || "Password reset failed.");
    }
  };

  return (
    <div className="container-fluid p-5 custom-bg-register">
      <div className="container">
        <form className="form-container font-bold register custom-bg-password border border-black padding-5">
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

          {!isOTPSent ? (
            <div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                onClick={handleSendOTP}
                className="btn custom-btn mt-3 mb-3 font-bold-xl"
              >
                Send OTP
              </button>
            </div>
          ) : !isOTPVerified ? (
            <div>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  OTP
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button
                onClick={handleVerifyOTP}
                className="btn custom-btn mt-3 mb-3 font-bold-xl"
              >
                Verify OTP
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                onClick={handleResetPassword}
                className="btn custom-btn mt-3 mb-3 font-bold-xl"
              >
                Reset Password
              </button>
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
      </div>
    </div>
  );
}
