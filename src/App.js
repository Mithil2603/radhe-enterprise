import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
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
import AdminReports from "./Components/Admin/AdminReports";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./Components/Unauthorized";
import AdminHome from "./Components/Admin/AdminHome";
import { useEffect, useState } from "react";
import VerifyOtp from "./Components/VerifyOtp";
import DynamicReports from "./Components/Admin/DynamicReports";
import UsersReport from "./Components/Admin/UsersReport";
import CompleteReport from "./Components/Admin/CompleteReport";
import OrdersReport from "./Components/Admin/OrdersReport";
import PaymentReport from "./Components/Admin/PaymentReport";
import ServiceReports from "./Components/Admin/ServiceReports";

function App() {
  const [role, setRole] = useState("Customer"); // Default role
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("role"); // Clear the role from localStorage
    setRole("Customer"); // Set the role to Customer or whatever default you want
  };

  // Check local storage for role on initial load
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const loggedIn = localStorage.getItem("isLoggedIn");
    if(loggedIn !== true) {
      setRole("Customer");
    }

    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // Hide Navbar and footer
  const hideNavbarAndFooter = ["/login", "/register", "/reset-password", "/verify-otp"].includes(location.pathname);

  return (
    <>
      {/* Conditional Navbar */}
      {!hideNavbarAndFooter && (role === "Owner" ? (
        <AdminNav onLogout={logout} />
      ) : (
        <Navbar onLogout={logout} />
      ))}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/verify-otp" element={<VerifyOtp />}></Route>
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:productId" element={<RTR />}></Route>
        <Route path="/fabrication" element={<Fabrication />}></Route>
        <Route path={`/creels`} element={<Creels />}></Route>
        <Route path="/profile" element={<User onLogout={logout} />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
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
          <Route path="reports" element={<AdminReports />} />
          <Route path="users_report" element={<UsersReport />} />
          <Route path="orders_report" element={<OrdersReport />} />
          <Route path="payment_report" element={<PaymentReport />} />
          <Route path="service_report" element={<ServiceReports />} />
          <Route path="complete_report" element={<CompleteReport />} />
          <Route path="dynamic_reports" element={<DynamicReports />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Conditional Footer */}
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;
