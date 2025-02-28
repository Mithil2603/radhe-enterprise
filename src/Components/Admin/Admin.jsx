import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./styles/Admin.css";
import axios from "axios";

export default function Admin() {
  const [name, setName] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => {
        if (res.data.status === "Success") {
          setName(res.data.name);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="container-fluid pt-5 custom-bg-admin">
        <div className="container w-100 d-flex justify-content-center">
          <div className="d-flex justify-content-center align-items-center fw-bolder gap-3 shiny-box flex-wrap mobile-w-100">
            <div className="welcome text-dark">Welcome {name}!</div>
          </div>
        </div>
        {/* This will render any content based on the selected route */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
