import React, { useState } from "react";
import axios from "axios";
import "./styles/Register.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formValues, setFormValues] = useState({
    user_type: "Customer", // Default value
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

  // Handle input change dynamically for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Update the specific field based on its name
    }));

    setError(""); // Clear error message when the user starts typing
  };

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {}

    if(!formValues.first_name){
      errors.first_name = "First Name is required";
    }
    else if(!formValues.last_name){
      errors.last_name = "Last Name is required";
    }

    if(!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)){
      errors.email = "Please enter a valid email address";
    }

    if(!formValues.phone_number) {
      errors.phone_number = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formValues.phone_number)){
      errors.email = "Please enter a valid Phone Number";
    }

    if(!formValues.user_password) {
      errors.user_password = "Phone Number is required";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formValues.user_password)){
      errors.email = "Password must be at least 8 characters long, contain at least one letter and one number";
    }

    return errors;
  }

  // Handle form submission with validation and success/error handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if(Object.keys(errors).length === 0){
      alert("Form Submitted!");
      setFormErrors(errors);
    }

    // Validate passwords match
    if (formValues.user_password !== formValues.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Send form data to the backend
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        formValues
      );

      console.log(response);

      if (response.status === 201) {
        // Success: Set success message and navigate to login after delay
        setSuccessMessage(response.data.message);
        setError(""); // Clear any previous errors
        setTimeout(() => {
          navigate("/login"); // Redirect to login page
        }, 2000);

        // Reset form fields to initial state
        setFormValues({
          user_type: "Customer", // Default value
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
      }
    } catch (error) {
      // Handle error from backend or any other issue
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setSuccessMessage(""); // Clear success message on error
    }
  };

  

  return (
    <div className="container-fluid p-5 custom-bg-register">
      <div className="container">
        <h1 className="text-center mb-4">Register</h1>

        <form onSubmit={handleSubmit}>
          {/* Dropdown for User Type */}
          <select
            name="user_type"
            value={formValues.user_type}
            onChange={handleInputChange}
            className="form-select mb-3"
            aria-label="Default select example"
          >
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
                value={formValues.first_name}
                onChange={handleInputChange}
                className="form-control"
                id="first_name"
                
              />
              {
                formErrors.first_name ? <span className="text-danger">{formErrors.first_name}</span> : ""
              }
              
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formValues.last_name}
                onChange={handleInputChange}
                className="form-control"
                id="last_name"
                required
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
              value={formValues.email}
              onChange={handleInputChange}
              className="form-control"
              id="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">
              Phone No.
            </label>
            <input
              type="text"
              name="phone_number"
              value={formValues.phone_number}
              onChange={handleInputChange}
              className="form-control"
              placeholder="+91"
              id="phone_number"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="company_name" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={formValues.company_name}
              onChange={handleInputChange}
              className="form-control"
              id="company_name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="company_address" className="form-label">
              Company Address
            </label>
            <input
              type="text"
              name="company_address"
              value={formValues.company_address}
              onChange={handleInputChange}
              className="form-control"
              id="company_address"
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
                value={formValues.address_city}
                onChange={handleInputChange}
                className="form-control"
                id="address_city"
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="address_state" className="form-label">
                State
              </label>
              <input
                type="text"
                name="address_state"
                value={formValues.address_state}
                onChange={handleInputChange}
                className="form-control"
                id="address_state"
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
                value={formValues.address_country}
                onChange={handleInputChange}
                className="form-control"
                id="address_country"
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="pincode" className="form-label">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formValues.pincode}
                onChange={handleInputChange}
                className="form-control"
                id="pincode"
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
              value={formValues.GST_no}
              onChange={handleInputChange}
              className="form-control"
              id="GST_no"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="user_password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="user_password"
              value={formValues.user_password}
              onChange={handleInputChange}
              className="form-control"
              id="user_password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
              className="form-control"
              id="confirmPassword"
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn custom-btn">
            Submit
          </button>
          {successMessage && (
            <div className="alert alert-success" role="alert">
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
