import React, { useEffect, useState } from "react";
import "./styles/RTR.css";
import { Link, useParams } from "react-router-dom";

export default function RTR() {  
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/products/${productId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid pt-5 pb-5 custom-bg-RTR">
      <div className="container-fluid">
        {/* {product.product_img.map((img, index) => (
          <img className="rtr-img" key={index} src={img} alt={Product ${index + 1}} />
        ))} */}

        <div id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src={product.product_img[0]}
                class="d-block rtr-img"
                alt={product.product_name}
              />
            </div>
            <div class="carousel-item">
              <img
                src={product.product_img[1]}
                class="d-block w-100 rtr-img"
                alt={product.product_name}
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="black"
              class="bi bi-arrow-left-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="black"
              class="bi bi-arrow-right-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="container">
        <h1 className="text-center mt-5">{product.product_name}</h1>
        <h3 className="Description">Description</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Creel Types</td>
              <td>{product.product_description[0]}</td>
            </tr>
            <tr>
              <td>Details</td>
              <td>{product.product_description[1]}</td>
            </tr>
            <tr>
              <td>Pitch</td>
              <td>{product.product_description[2]}</td>
            </tr>
            <tr>
              <td>Creel Tensioner</td>
              <td>{product.product_description[3]}</td>
            </tr>
          </tbody>
        </table>
        <div className="buttons d-flex justify-content-center align-items-center gap-4 px-5 mt-5">
            <Link to="/contact" className="btn btn-light custom-btn w-50">
                Enquire Now
            </Link>
            <Link to="/register" className="btn btn-light custom-btn w-50">Place Order</Link>
          </div>
      </div>
    </div>
  );
}