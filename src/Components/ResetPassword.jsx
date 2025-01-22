import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [values, setValues] = useState({
    email: "",
    user_password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email field cannot be empty.";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return null; // No errors
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!password) {
      return "Password field cannot be empty.";
    }
    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChars) {
      return "Password must contain at least one special character.";
    }
    return null; // No errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(""); // Clear any previous errors

    // Validate email
    const emailError = validateEmail(values.email);
    if (emailError) {
      setError(emailError);
      return;
    }

    // Check if passwords match
    if (values.user_password !== values.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Validate password
    const passwordError = validatePassword(values.user_password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    axios
      .post("http://localhost:8080/reset-password", values)
      .then((res) => {
        if (res.data.status === "Success") {
          setSuccessMessage(res.data.message);
          setTimeout(() => {
            navigate("/login"); // Redirect to login after successful reset
          }, 1000);
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
            "Reset password failed. Please try again."
        );
      });
  };

  return (
    <>
      <div className="container-fluid p-5 custom-bg-register">
        <div className="container">
          <h1 className="text-center mb-5 font-bold-2xl">Reset Password</h1>
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
                Enter New Password
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
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                required
                onChange={(e) =>
                  setValues({ ...values, confirmPassword: e.target.value })
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
          </form>
        </div>
      </div>
    </>
  );
}
