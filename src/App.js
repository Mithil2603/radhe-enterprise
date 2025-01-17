import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Products from "./Components/Products";
import RTR from "./Components/RTR";
import Creels from "./Components/Creels";
import NotFound from "./Components/NotFound";
import User from "./Components/User";
import PlaceOrder from "./Components/PlaceOrder";
import Orders from "./Components/Orders";
import ResetPassword from "./Components/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword";
import Fabrication from "./Components/Fabrication";

// Admin Dashboard
import Admin from "./Components/Admin/Admin";
import AdminNav from "./Components/Admin/AdminNav";

import ManageUsers from "./Components/Admin/ManageUsers";
import ManageCategories from "./Components/Admin/ManageCategories";
import ManageProducts from "./Components/Admin/ManageProducts";
import ManageOrders from "./Components/Admin/ManageOrders";
import ManageDelivery from "./Components/Admin/ManageDelivery";
import ManagePayments from "./Components/Admin/ManagePayments";
import ManageFeedback from "./Components/Admin/ManageFeedback";
import ManageServices from "./Components/Admin/ManageServices";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./Components/Unauthorized";
import AdminHome from "./Components/Admin/AdminHome";
import { useState } from "react";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || "User");
  return (
    <>
      {/* Conditional Navbar */}
      {role === "Owner" ? <AdminNav /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:productId" element={<RTR />}></Route>
        <Route path="/fabrication" element={<Fabrication />}></Route>
        <Route path={`/creels`} element={<Creels />}></Route>
        <Route path="/profile" element={<User />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin Dashboard */}
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["Owner"]}>
              {" "}
              <Admin />
            </PrivateRoute>
          }
        >
          <Route path="" element={<AdminHome />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="delivery" element={<ManageDelivery />} />
          <Route path="payments" element={<ManagePayments />} />
          <Route path="feedback" element={<ManageFeedback />} />
          <Route path="services" element={<ManageServices />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
