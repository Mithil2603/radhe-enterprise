import React, { useEffect, useState } from "react";
import "./styles/RTR.css";
import { Link } from "react-router-dom";

export default function RCB() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const productId = 4;

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
        <img
          src={product.product_img}
          class="d-block w-100 rcb-img"
          alt={product.product_name}
        />
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
          <Link to="/register" className="btn btn-light custom-btn w-50">
            Place Order
          </Link>
        </div>
      </div>
    </div>
  );
}
