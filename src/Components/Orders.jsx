import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "./styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

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
      console.log("Fetched orders:", data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Error fetching orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePayment = async (order) => {
    try {
      // Step 1: Create an order on the backend
      const response = await fetch("http://localhost:8080/create-order", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(order.payment_amount * 100), // Convert to paise
          order_id: order.order_id,
          installment_number: order.installment_number, // Pass the installment number
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      // Step 2: Get Razorpay order response
      const { key, order: razorpayOrder } = await response.json();
      console.log("Razorpay order response:", razorpayOrder);

      // Step 3: Prepare payment options
      const options = {
        key, // Your Razorpay key ID
        amount: Math.round(parseFloat(razorpayOrder.amount) * 100), // Amount in paise
        currency: razorpayOrder.currency,
        name: "Radhe Enterprise Pvt. Ltd.",
        description: "Order Payment",
        order_id: razorpayOrder.id, // Use the new order ID
        handler: async function (response) {
          console.log("Payment response:", response);
          alert("Payment successful!");

          // Step 4: Prepare payload for verification
          const payload = {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
          };

          // Step 5: Verify payment on the backend
          const verifyResponse = await fetch(
            "http://localhost:8080/verify-payment",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );

          if (!verifyResponse.ok) {
            throw new Error("Payment verification failed");
          }

          // Reload orders to reflect updated payment status
          await fetchOrders();
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Step 6: Open Razorpay payment modal
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert("Payment failed: " + response.error.description);
      });
      rzp1.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed.");
    }
  };

  return (
    <div className="container-fluid custom-bg-orders min-vh-100">
      <div className="container pt-5 pb-5">
        <h1 className="mb-4 text-light text-center">Your Orders</h1>
        <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div className="card text-center" key={order.order_id}>
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
                  <table className="table table-bordered table-striped table-hover text-start overflowx-scroll">
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
                      <tr>
                        <td>
                          <strong>Payment Amount:</strong>
                        </td>
                        <td>{order.payment_amount || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Payment Status:</strong>
                        </td>
                        <td>{order.payment_status || "Pending"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Installment Number:</strong>
                        </td>
                        <td>{order.installment_number || "N/A"}</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Show the Pay Now button only if the payment status is not 'Completed' */}
                  {order.payment_status !== "Completed" && (
                    <button
                      className="btn btn-primary mt-3"
                      onClick={() => handlePayment(order)}
                    >
                      Pay Now
                    </button>
                  )}
                </div>
                <div className="card-footer custom-bg text-info">
                  Ordered Date:{" "}
                  {format(new Date(order.order_date), "dd/MM/yyyy HH:mm:ss")}
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center">
              No orders found. <br /> <strong>Place Order Now!</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
