import "./App.css";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Products from "./Components/Products";
import RTR from "./Components/RTR";
import axios from "axios";
import Creels from "./Components/Creels";
import NotFound from "./Components/NotFound";
import User from "./Components/User";
import Admin from "./Components/Admin";

function App() {
  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null; // No token found

    try {
      const response = await axios.get("http://localhost:4000/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data);

      if (response.status === 200) {
        return response.data.user; // Return user info
      }
    } catch (err) {
      console.error("Error verifying token:", err);
    }
    return null;
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeUser = async () => {
      const loggedInUser = await checkLoginStatus();
      setUser(loggedInUser);
    };
    initializeUser();
  }, []);

  const isAdmin = false;

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:productId" element={<RTR />}></Route>
        <Route path={`/creels`} element={<Creels />}></Route>
        <Route path="/user/:id" element={<User />}/>
        <Route path="/admin" element={isAdmin?<Admin />:<Navigate to={"/"}/>} />

        <Route path="*" element={<NotFound />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
