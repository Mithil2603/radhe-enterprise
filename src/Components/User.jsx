import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles/User.css";

export default function User() {
  const [profileData, setProfileData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data from the backend
    axios
      .get("http://localhost:8080/profile", { withCredentials: true })
      .then((response) => {
        setProfileData(response.data.data); // Populate the data
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          navigate("/login"); // Use navigate to redirect
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    axios
      .get("http://localhost:8080/logout", { withCredentials: true })
      .then((res) => {
        navigate("/");
        window.location.reload(); // Refreshes the page
      })
      .catch((err) => console.error("Logout Error:", err));
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put("http://localhost:8080/updateProfile", profileData, {
        withCredentials: true,
      })
      .then((response) => {
        setMessage("Profile updated successfully!");
        setEditMode(false); // Exit edit mode
      })
      .catch((error) => {
        setMessage("Error updating profile.");
        console.error(error);
      });
  };

  return (
    <div className="container-fluid custom-bg-user">
      <div className="container pt-5 pb-5 form-container ">
        <h1 className="text-center pb-3">User Profile</h1>
        {editMode ? (
          <>
            <div className="d-flex w-100 gap-4 w-50 m-auto ">
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
                  value={profileData.first_name || ""}
                  onChange={handleChange}
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
                  value={profileData.last_name || ""}
                  onChange={handleChange}
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
                value={profileData.email || ""}
                onChange={handleChange}
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
                value={profileData.phone_number || ""}
                onChange={handleChange}
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
                value={profileData.company_name || ""}
                onChange={handleChange}
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
                value={profileData.company_address || ""}
                onChange={handleChange}
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
                  value={profileData.address_city || ""}
                  onChange={handleChange}
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
                  value={profileData.address_state || ""}
                  onChange={handleChange}
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
                  value={profileData.address_country || ""}
                  onChange={handleChange}
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
                  value={profileData.pincode || ""}
                  onChange={handleChange}
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
                value={profileData.GST_no || ""}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center gap-3">
              <button className="btn custom-btn nav-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn custom-btn nav-btn"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <div className="form-floating mb-3 w-50">
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  value={profileData.first_name}
                  disabled
                />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="form-floating mb-3 w-50">
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  value={profileData.last_name}
                  disabled
                />
                <label htmlFor="last_name">Last Name</label>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                value={profileData.email}
                disabled
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="phone_number"
                value={profileData.phone_number}
                disabled
              />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="company_name"
                value={profileData.company_name}
                disabled
              />
              <label htmlFor="company_name">Company Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="company_address"
                placeholder="name@example.com"
                value={profileData.company_address}
                disabled
              />
              <label htmlFor="company_address">Address</label>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <div className="form-floating mb-3 w-50">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="name@example.com"
                  value={profileData.address_city}
                  disabled
                />
                <label htmlFor="city">City</label>
              </div>
              <div className="form-floating mb-3 w-50">
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder="name@example.com"
                  value={profileData.address_state}
                  disabled
                />
                <label htmlFor="state">State</label>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <div className="form-floating mb-3 w-50">
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder="name@example.com"
                  value={profileData.address_country}
                  disabled
                />
                <label htmlFor="country">Country</label>
              </div>
              <div className="form-floating mb-3 w-50">
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  placeholder="name@example.com"
                  value={profileData.pincode}
                  disabled
                />
                <label htmlFor="pincode">Pincode</label>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="GST_no"
                placeholder="name@example.com"
                value={profileData.GST_no}
                disabled
              />
              <label htmlFor="GST_no">GST Number</label>
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            <div className="d-flex align-items-center justify-content-center gap-3">
              <Link className="nav-link" to="/logout" onClick={handleLogout}>
                <button className="btn custom-btn nav-btn">Logout</button>
              </Link>
              <Link className="nav-link" onClick={() => setEditMode(true)}>
                <button className="btn custom-btn nav-btn">Edit Profile</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
