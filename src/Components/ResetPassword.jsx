import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from the URL query parameter
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get("token");

    if (!tokenFromUrl) {
      setError("Invalid or missing token.");
    } else {
      setToken(tokenFromUrl);
    }
  }, []);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/reset-password", {
        token,
        newPassword,
      });

      setSuccessMessage(response.data.message || "Password reset successfully!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred while resetting password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-5 custom-bg-reset">
      <div className="container">
        <h1 className="text-center mb-5 font-bold-2xl">Reset Password</h1>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {successMessage ? (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        ) : (
          <form
            onSubmit={handlePasswordReset}
            className="form-container font-bold reset-password"
          >
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                className="form-control"
                id="newPassword"
                required
                onChange={(e) => setNewPassword(e.target.value)}
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
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn custom-btn mt-3 mb-3"
              disabled={loading}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
