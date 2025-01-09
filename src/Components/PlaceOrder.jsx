import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const location = useLocation();
  const { product, name } = location.state || {}; // Extracting product and name from state
  const [formData, setFormData] = useState({
    quantity: "",
    no_of_ends: "",
    creel_type: "",
    creel_pitch: "",
    bobin_length: "",
  });

  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authResponse = await fetch("http://localhost:8080/auth/status", {
          credentials: "include",
        });

        if (authResponse.status !== 200) {
          // Redirect to login if not authenticated
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        navigate("/login");
      }
    };

    checkAuthStatus();
  }, [navigate]);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle order submission
  const handlePlaceOrder = async () => {
    // Check if product and product.id are available
    if (!product?.id) {
      alert("Product ID is missing.");
      return;
    }
    try {
      const orderResponse = await fetch("http://localhost:8080/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify({ product_id: product.id, ...formData }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to place the order");
      }

      const { orderId, whatsappURL } = await orderResponse.json();

      // Open WhatsApp chat or display success message
      if (whatsappURL) {
        window.open(whatsappURL, "_blank");
      } else {
        alert(`Order placed successfully! Order ID: ${orderId}`);
      }

      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="container pt-5 pb-5">
        <h1 className="text-center mb-5">Place Order</h1>
        <p className="fs-5 text-center">
          Product Name: <strong>{name}</strong>
        </p>
        <form className="form-container font-bold">
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="no_of_ends" className="form-label">
              No of Ends
            </label>
            <input
              type="number"
              className="form-control"
              id="no_of_ends"
              name="no_of_ends"
              value={formData.no_of_ends}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="creel_type" className="form-label">
              Creel Type
            </label>
            <input
              type="text"
              className="form-control"
              id="creel_type"
              name="creel_type"
              value={formData.creel_type}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="creel_pitch" className="form-label">
              Creel Pitch
            </label>
            <input
              type="number"
              className="form-control"
              id="creel_pitch"
              name="creel_pitch"
              value={formData.creel_pitch}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bobin_length" className="form-label">
              Bobin Length
            </label>
            <input
              type="number"
              className="form-control"
              id="bobin_length"
              name="bobin_length"
              value={formData.bobin_length}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
