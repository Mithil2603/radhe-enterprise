import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    axios
      .get(`http://localhost:8000/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  return (
    <>
      <div className="container-fluid custom-bg-product">
        <div className="container pt-5 pb-5">
          <h1 className="">Sectional Warping Creels</h1>
          <hr />
          <div className="creels d-flex justify-content-center align-items-center gap-3 flex-wrap pt-2">
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
          <h1 className="mt-5">Yarn Tensioners</h1>
          <hr />
        </div>
      </div>
    </>
  );
}
