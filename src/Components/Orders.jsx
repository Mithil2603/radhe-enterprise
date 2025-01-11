import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "./styles/Orders.css";

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
    <div className="container-fluid custom-bg-orders min-vh-100">
      <div className="container pt-5 pb-5">
        <h1 className="mb-4 text-light text-center">Your Orders</h1>
        <div className="d-flex justify-content-center align-items-center gap-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <>
                <div
                  className="card text-center bg-tertiary"
                  key={order.order_id}
                >
                  <div className="card-header custom-bg text-info">
                    Order Status: {order.order_status}
                  </div>
                  <div className="card-body">
                    <h3 className="card-title text-info-emphasis fw-bold">
                      {order.product_name}
                    </h3>
                    <p className="card-subtitle pt-2 mb-2 d-none text-muted">
                      Product ID: {order.product_id}
                    </p>
                    <table className="table table-bordered table-striped table-hover text-start">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Quantity:</strong>
                          </td>
                          <td>{order.quantity}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>No of Ends:</strong>
                          </td>
                          <td>{order.no_of_ends}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Creel Type:</strong>
                          </td>
                          <td>{order.creel_type}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Creel Pitch:</strong>
                          </td>
                          <td>{order.creel_pitch}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Bobin Length:</strong>
                          </td>
                          <td>{order.bobin_length}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="card-footer custom-bg text-info">
                    Ordered Date:{" "}
                    {format(new Date(order.order_date), "dd/MM/yyyy HH:mm:ss")}
                    {/* Order ID: {order.order_id} */}
                  </div>
                </div>
              </>
            ))
          ) : (
            <p className="text-white text-center">No orders found. <br /> <strong>Place Order Now!</strong></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
