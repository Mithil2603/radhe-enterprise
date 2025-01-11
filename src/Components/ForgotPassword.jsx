import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/forgot-password",
        { email }
      );
      setSuccessMessage(
        response.data.message || "Check your email for reset instructions."
      );
    } catch (err) {
      setError(err.response?.data?.error || "Error sending reset email.");
    }
  };

  return (
    <div className="container pt-5 pb-5">
      <h1 className="text-center mb-4">Forgot Password</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {!successMessage && (
        <form onSubmit={handleForgotPassword}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn custom-btn">
            Send Reset Email
          </button>
        </form>
      )}
    </div>
  );
}
