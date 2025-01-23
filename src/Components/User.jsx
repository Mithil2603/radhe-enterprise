import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles/User.css";

export default function User({ onLogout }) {
  const [profileData, setProfileData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data from the backend
    axios
      .get("https://machinery-backend-login-part.onrender.com/profile", { withCredentials: true })
      .then((response) => {
        if (response.data.status === "Success") {
          setProfileData(response.data.data); // Populate the data
        } else {
          setMessage("Error fetching profile data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login"); // Use navigate to redirect
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    axios
      .get("https://machinery-backend-login-part.onrender.com/logout", { withCredentials: true })
      .then((res) => {
        onLogout();
        navigate("/");
        window.location.reload(); // Refreshes the page
      })
      .catch((err) => console.error("Logout Error:", err));
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
     // Validate phone number format
     const phoneRegex = /^\+?[1-9]\d{1,14}$/;
     if (!phoneRegex.test(profileData.phone_number)) {
       setMessage("Invalid phone number format. Please include the country code.");
       return;
     }
 
     // Validate email format
     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
     if (!emailRegex.test(profileData.email)) {
       setMessage("Invalid email format.");
       return;
     }

    // Additional validation checks for other fields, if necessary
    if (
      !profileData.first_name ||
      !profileData.last_name ||
      !profileData.email
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    axios
      .put("https://machinery-backend-login-part.onrender.com/updateProfile", profileData, {
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
            {message && message.includes("Invalid phone number") && (
              <div className="text-danger">{message}</div>
            )}
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
                value={profileData.GST_no}
                disabled
              />
              <label htmlFor="GST_no">GST Number</label>
            </div>

            {message && <div className={`alert ${message.includes("Error") ? "alert-danger" : "alert-success"}`}>{message}</div>}
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
