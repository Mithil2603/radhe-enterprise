import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8080/orders", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.orders); // Assuming the response contains an array of orders
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Error fetching orders.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container-fluid">
      <div className="container pt-5 pb-5">
        <h1 className="mb-4">Your Orders</h1>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.order_id}>
              <p>Order ID: {order.order_id}</p>
              <p>Status: {order.order_status}</p>
              <p>Product ID: {order.product_id}</p>
              <p>Quantity: {order.quantity}</p>
              <p>No of Ends: {order.no_of_ends}</p>
              <p>Creel Type: {order.creel_type}</p>
              <p>Creel Pitch: {order.creel_pitch}</p>
              <p>Bobin Length: {order.bobin_length}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
