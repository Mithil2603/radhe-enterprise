import React, { useState, useEffect } from "react";
import "./styles/Main.css";
import axios from "axios";
import { Link } from "react-router-dom";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Main() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((res) => {
        if (res.data.status === "Success") {
          setAuth(true);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    axios
      .get("http://localhost:8080/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const slides = [
    {
      image:
        "https://res.cloudinary.com/drpcouvle/image/upload/v1735539093/Machinery_3_ofsl2x.jpg",
      heading: "Creel Manufacturing",
      text: "Our machinery modification solutions are customized to enhance your equipment's performance.",
    },
    {
      image:
        "https://res.cloudinary.com/drpcouvle/image/upload/v1735539093/Machinery_2_rskqva.jpg",
      heading: "Machinery Modifications",
      text: "Tailored product support to ensure optimal machinery performance and client satisfaction.",
    },
    {
      image:
        "https://res.cloudinary.com/drpcouvle/image/upload/v1735539093/Machinery_1_didbqw.jpg",
      heading: "Customized Support",
      text: "We provide flexibility and efficiency in managing client interactions and machinery performance.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="container-fluid custom-img-bg mb-5">
        <div className="banner text-center">
          <h2>
            Textile Machine Parts & Service,
            <br /> Re Erect and Spare Material.
          </h2>
          <div className="buttons d-flex justify-content-center align-items-center gap-4 px-5">
            <Link to="/contact" className="btn btn-light custom-btn w-50">
              Enquire Now
            </Link>
            {auth ? (
              <>
                <Link to="/orders" className="btn btn-light custom-btn w-50 d-flex justify-content-center align-items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-cart3 fw-bold"
                    viewBox="0 0 16 16"
                    // stroke="currentColor" 
                    // stroke-width="0.3"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                  View Orders
                </Link>
              </>
            ) : (
              <Link to="/register" className="btn btn-light custom-btn w-50">
                Register
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid">
        {/* <hr className="first-hr" /> */}
        <div className="container mb-5">
          <h1 className="mb-5 custome-color text-xl">Our Famous Products</h1>
          <div className="row d-flex align-items-center justify-content-center gap-5 flex-wrap">
            {products.map((product) => {
              // Safely access the first image or fallback to a default placeholder
              const productImage =
                product.product_img?.[1] ||
                product.product_img?.[0] ||
                product.product_img[0];

              return (
                <div
                  className="card text-center flex-shrink-2"
                  key={product.product_id}
                >
                  <img
                    src={productImage}
                    className="card-img-top"
                    alt={product.product_name || "Product Image"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.product_name}</h5>
                    <Link
                      to={`/products/${product.product_id}`}
                      className="btn btn-light custom-btn w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel */}
        <div className="carousel mb-5">
          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="carousel-text">
              <h2>{slides[currentSlide].heading}</h2>
              <p>{slides[currentSlide].text}</p>
            </div>
          </div>

          <button
            className="carousel-control left text-dark"
            onClick={prevSlide}
          >
            &#10094;
          </button>
          <button
            className="carousel-control right text-dark"
            onClick={nextSlide}
          >
            &#10095;
          </button>
        </div>

        {/* Scroller */}
        <div className="page2 mb-5">
          <h2>Why Us</h2>
          <div className="move animate-me">
            <div className="marque d-block">
              <svg
                className="mb-2"
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#FFF"
              >
                <path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z" />
              </svg>
              <h3>Product Support</h3>
            </div>
            <div className="marque d-block">
              <h3>Quality and Precision Guaranteed</h3>
              <svg
                className="mt-2"
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#FFF"
              >
                <path d="M480-120 80-600l120-240h560l120 240-400 480Zm-95-520h190l-60-120h-70l-60 120Zm55 347v-267H218l222 267Zm80 0 222-267H520v267Zm144-347h106l-60-120H604l60 120Zm-474 0h106l60-120H250l-60 120Z" />
              </svg>
            </div>
            <div className="marque d-block">
              <svg
                className="mb-2"
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#FFF"
              >
                <path d="M640-440 474-602q-31-30-52.5-66.5T400-748q0-55 38.5-93.5T532-880q32 0 60 13.5t48 36.5q20-23 48-36.5t60-13.5q55 0 93.5 38.5T880-748q0 43-21 79.5T807-602L640-440Zm0-112 109-107q19-19 35-40.5t16-48.5q0-22-15-37t-37-15q-14 0-26.5 5.5T700-778l-60 72-60-72q-9-11-21.5-16.5T532-800q-22 0-37 15t-15 37q0 27 16 48.5t35 40.5l109 107ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Zm520-546Z" />
              </svg>
              <h3>Client Satisfaction</h3>
            </div>
            <div className="marque d-block">
              <h3>Customized Modifications</h3>
              <svg
                className="mt-2"
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#FFF"
              >
                <path d="M754-81q-8 0-15-2.5T726-92L522-296q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l85-85q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l204 204q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13l-85 85q-6 6-13 8.5T754-81Zm0-95 29-29-147-147-29 29 147 147ZM205-80q-8 0-15.5-3T176-92l-84-84q-6-6-9-13.5T80-205q0-8 3-15t9-13l212-212h85l34-34-165-165h-57L80-765l113-113 121 121v57l165 165 116-116-43-43 56-56H495l-28-28 142-142 28 28v113l56-56 142 142q17 17 26 38.5t9 45.5q0 24-9 46t-26 39l-85-85-56 56-42-42-207 207v84L233-92q-6 6-13 9t-15 3Zm0-96 170-170v-29h-29L176-205l29 29Zm0 0-29-29 15 14 14 15Zm549 0 29-29-29 29Z" />
              </svg>
            </div>
            <div className="marque d-block">
              <svg
                className="mb-2"
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#FFF"
              >
                <path d="M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z" />
              </svg>
              <h3>Realistic Price Structure</h3>
            </div>
            <div className="marque d-block">
              <h3>Prompt Delivery</h3>
              <svg
                className="mt-2"
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#FFF"
              >
                <path d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
