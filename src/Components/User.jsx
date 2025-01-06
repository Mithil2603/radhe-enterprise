import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/User.css";

export default function User() {
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user profile data from the backend
    axios
      .get("http://localhost:8080/profile", { withCredentials: true })
      .then((res) => {
        if (res.data.status === "Success") {
          setProfileData(res.data.data);
        } else {
          setError(res.data.Error || "Failed to fetch profile data");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while fetching profile data.");
      });
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  const handleLogout = () => {
    axios
      .get("http://localhost:8080/logout", { withCredentials: true })
      .then(() => {
        window.location.reload(); // Refreshes the page
      })
      .catch(err => console.error("Logout Error:", err));
  };
  

  return (
    <div className="container-fluid custom-bg-user">
      <div className="container pt-5 pb-5">
        <h1 className="text-center pb-3">User Profile</h1>

        <div className="d-flex align-items-center justify-content-center gap-2">
          <div class="form-floating mb-3 w-50">
            <input
              type="text"
              class="form-control"
              id="floatingInputDisabled"
              placeholder="name@example.com"
              value={profileData.first_name}
              disabled
            />
            <label for="floatingInputDisabled">First Name</label>
          </div>
          <div class="form-floating mb-3 w-50">
            <input
              type="text"
              class="form-control"
              id="floatingInputDisabled"
              placeholder="name@example.com"
              value={profileData.last_name}
              disabled
            />
            <label for="floatingInputDisabled">Last Name</label>
          </div>
        </div>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInputDisabled"
            placeholder="name@example.com"
            value={profileData.email}
            disabled
          />
          <label for="floatingInputDisabled">Email</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInputDisabled"
            placeholder="name@example.com"
            value={profileData.phone_number}
            disabled
          />
          <label for="floatingInputDisabled">Phone Number</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInputDisabled"
            placeholder="name@example.com"
            value={profileData.company_name}
            disabled
          />
          <label for="floatingInputDisabled">Company Name</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInputDisabled"
            placeholder="name@example.com"
            value={profileData.company_address}
            disabled
          />
          <label for="floatingInputDisabled">Address</label>
        </div>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <div class="form-floating mb-3 w-50">
            <input
              type="text"
              class="form-control"
              id="floatingInputDisabled"
              placeholder="name@example.com"
              value={profileData.address_city}
              disabled
            />
            <label for="floatingInputDisabled">City</label>
          </div>
          <div class="form-floating mb-3 w-50">
            <input
              type="text"
              class="form-control"
              id="floatingInputDisabled"
              placeholder="name@example.com"
              value={profileData.address_state}
              disabled
            />
            <label for="floatingInputDisabled">State</label>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <div class="form-floating mb-3 w-50">
            <input
              type="text"
              class="form-control"
              id="floatingInputDisabled"
              placeholder="name@example.com"
              value={profileData.address_country}
              disabled
            />
            <label for="floatingInputDisabled">Country</label>
          </div>
          <div class="form-floating mb-3 w-50">
            <input
              type="text"
              class="form-control"
              id="floatingInputDisabled"
              placeholder="name@example.com"
              value={profileData.pincode}
              disabled
            />
            <label for="floatingInputDisabled">Pincode</label>
          </div>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInputDisabled"
            placeholder="name@example.com"
            value={profileData.GST_no}
            disabled
          />
          <label for="floatingInputDisabled">GST Number</label>
        </div>

        <Link className="nav-link" to="/logout" onClick={handleLogout}>
          <button className="btn custom-btn nav-btn">Logout</button>
        </Link>
      </div>
    </div>
  );
}
