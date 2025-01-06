import React, { useState } from "react";
import "./styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [values, setValues] = useState({
    user_type: "",
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
    e.preventDefault(); // Prevent form submission

    if (values.user_password !== values.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError(""); // Clear error if passwords match
    console.log("Form submitted:", values);

    axios
      .post("http://localhost:8080/register", values)
      .then((res) => {
        if(res.data.status === "Success"){
          setSuccessMessage("Registration successful! Redirecting to login...");
          setTimeout(() => {
            navigate("/login")
          }, 3000);
        }
        else {
          setError(res.data.message || "Registration failed. Please try again.");
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
        <h1 className="text-center mb-4">Register</h1>

        <form onSubmit={handleSubmit}>
          <select
            name="user_type"
            className="form-select mb-3"
            aria-label="Default select example"
            onChange={(e) =>
              setValues({ ...values, user_type: e.target.value })
            }
          >
            <option value="">Select User Type</option>
            <option value="Customer">Customer</option>
            <option value="Owner">Owner</option>
          </select>

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
                required
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
                required
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
              required
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
              placeholder="+91"
              id="phone_number"
              required
              onChange={(e) =>
                setValues({ ...values, phone_number: e.target.value })
              }
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
              required
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
              required
              onChange={(e) =>
                setValues({ ...values, confirmPassword: e.target.value })
              }
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn custom-btn">
            Submit
          </button>
          {successMessage && (
            <div className="alert alert-success mt-3" role="alert">
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
