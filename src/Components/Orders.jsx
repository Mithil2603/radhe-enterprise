import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "./styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [serviceDetails, setServiceDetails] = useState({
    service_type: "Maintenance",
    service_notes: "",
  });

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
      // Check if the payment method is Cash and if a bill is uploaded
      if (order.payment_method === "Cash" && order.bill_uploaded) {
        alert("Payment is not required as the bill has been uploaded.");
        return;
      }

      // Prepare payment details
      // const paymentDetails = {
      //   payment_amount:
      //     order.service_cost > 0 ? order.service_cost : order.payment_amount,
      //   payment_method: "Service", // You can customize this as needed
      //   payment_type:
      //     order.service_cost > 0 ? "Service Cost" : "Product Payment", // Specify the payment type
      //   order_id: order.order_id,
      //   total_amount:
      //     order.service_cost > 0 ? order.service_cost : order.payment_amount,
      //   installment_number: 1, // Adjust as necessary
      // };

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
          name: order.user_first_name,
          email: order.user_email,
          contact: order.user_phone_number,
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

  const handleRequestService = async () => {
    try {
      const response = await fetch(`http://localhost:8080/request-service`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: selectedOrder.order_id,
          service_type: serviceDetails.service_type,
          service_notes: serviceDetails.service_notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to request service");
      }

      alert("Service request submitted successfully!");
      setShowServiceModal(false);
      fetchOrders(); // Refresh orders to reflect the new service request
    } catch (error) {
      console.error("Error requesting service:", error);
      alert("Failed to request service.");
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
                      {/* Only show Payment Amount if it exists */}
                      {order.payment_amount ? (
                        <tr>
                          <td>
                            <strong>Payment Amount:</strong>
                          </td>
                          <td>₹{order.payment_amount}</td>
                        </tr>
                      ) : null}
                      <tr>
                        <td>
                          <strong>Payment Status:</strong>
                        </td>
                        <td>{order.payment_status || "Pending"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Payment Type:</strong>
                        </td>
                        <td>{order.payment_type || "N/A"}</td>
                      </tr>

                      {/* Remove Installment Number for Service Payments */}
                      {order.payment_type !== "Service" && (
                        <tr>
                          <td>
                            <strong>Installment Number:</strong>
                          </td>
                          <td>{order.installment_number || "N/A"}</td>
                        </tr>
                      )}
                      {/* Conditionally render delivery status based on payment status */}
                      {/* Remove Delivery Status for Service Payments */}
                      {order.payment_type !== "Payment for Service" &&
                        order.payment_status === "Completed" && (
                          <tr>
                            <td>
                              <strong>Delivery Status:</strong>
                            </td>
                            <td>{order.delivery_status || "N/A"}</td>
                          </tr>
                        )}
                      {/* Show Service Status for Service Payments */}
                      {order.payment_type === "Service" && (
                        <tr>
                          <td>
                            <strong>Service Status:</strong>
                          </td>
                          <td>{order.service_status || "N/A"}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {/* Show the Pay Now button only if the payment status is not 'Completed' and payment method is not Cash with uploaded bill */}
                  {order.payment_status !== "Completed" &&
                    order.payment_amount > 0 &&
                    !(
                      order.payment_method === "Cash" && order.bill_uploaded
                    ) && (
                      <button
                        className="btn btn-primary mt-3"
                        onClick={() => handlePayment(order)}
                      >
                        Pay Now
                      </button>
                    )}

                  {/* Show the Request Service button only if the delivery status is 'Delivered' and service status is 'Pending' */}
                  {order.delivery_status === "Delivered" &&
                    order.service_status === "Pending" && (
                      <button
                        className="btn btn-warning mt-3"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowServiceModal(true);
                        }}
                      >
                        Request Service
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
      {/* Service Request Modal */}
      {showServiceModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowServiceModal(false)}>
              &times;
            </span>
            <h1 className="mt-2 mb-3 text-center">Request Service</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRequestService();
              }}
            >
              <div className="mb-3">
                <label htmlFor="serviceType" className="form-label">
                  Service Type
                </label>
                <select
                  id="serviceType"
                  className="form-select"
                  value={serviceDetails.service_type}
                  onChange={(e) =>
                    setServiceDetails({
                      ...serviceDetails,
                      service_type: e.target.value,
                    })
                  }
                >
                  <option value="Maintenance">Maintenance</option>
                  <option value="Repair">Repair</option>
                  <option value="Modification">Modification</option>
                  <option value="Installment">Installment</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="serviceNotes" className="form-label">
                  Service Notes
                </label>
                <textarea
                  id="serviceNotes"
                  className="form-control"
                  rows="4"
                  value={serviceDetails.service_notes}
                  onChange={(e) =>
                    setServiceDetails({
                      ...serviceDetails,
                      service_notes: e.target.value,
                    })
                  }
                  placeholder="Describe the issue..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
