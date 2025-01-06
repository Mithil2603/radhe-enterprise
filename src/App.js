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

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:productId" element={<RTR />}></Route>
        <Route path={`/creels`} element={<Creels />}></Route>
        <Route path="/user/:id" element={<User />}/>

        <Route path="*" element={<NotFound />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
