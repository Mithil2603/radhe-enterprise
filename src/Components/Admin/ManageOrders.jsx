import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./styles/Admin.css";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [billFile, setBillFile] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    payment_amount: "",
    payment_method: "Online",
    payment_type: "Product",
    total_amount: "", // Only for the first installment
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:8080/admin/orders");
      setOrders(data);
    } catch (error) {
      alert("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    if (!window.confirm(`Change status to "${newStatus}"?`)) return;

    try {
      await axios.put(`http://localhost:8080/orders/${orderId}`, {
        order_status: newStatus,
      });
      alert("Order status updated successfully.");
      fetchOrders();
    } catch (error) {
      alert("Failed to update order status.");
    }
  };

  const handleCreatePayment = async () => {
    try {
      const totalAmount = parseFloat(paymentDetails.total_amount) || 0;
      const paymentAmount = parseFloat(paymentDetails.payment_amount) || 0;

      // Validation
      if (selectedOrder.installment_number === 0 && totalAmount <= 0) {
        alert("Total amount is required for the first installment.");
        return;
      }

      if (paymentAmount <= 0 || paymentAmount > totalAmount) {
        alert("Please specify a valid payment amount.");
        return;
      }

      const payload = {
        ...paymentDetails,
        order_id: selectedOrder.order_id,
      };

      // If payment method is Cash, include the bill file
      if (paymentDetails.payment_method === "Cash" && billFile) {
        const formData = new FormData();
        formData.append("paymentDetails", JSON.stringify(payload));
        formData.append("billFile", billFile);

        await axios.post("http://localhost:8080/admin/payments", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("http://localhost:8080/admin/payments", payload);
      }

      alert("Payment created successfully.");
      setShowPaymentModal(false);
      fetchOrders();
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Failed to create payment.");
    }
  };

  return (
    <div className="container-fluid pt-5 pb-5">
      <h1 className="fw-bolder mb-4 w-50 text-bg-dark text-transparent p-3 rounded m-auto text-center">
        Manage Orders
      </h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="container-fluid user-table w-100">
          <table className="table table-bordered table-hover table-striped rounded overflow-hidden">
            <thead>
              <tr>
                <th className="bg-dark text-white">Order ID</th>
                <th className="bg-dark text-white">Customer Name</th>
                <th className="bg-dark text-white">Customer Email</th>
                <th className="bg-dark text-white">Order Date</th>
                <th className="bg-dark text-white">Status</th>
                <th className="bg-dark text-white">Details</th>
                <th className="bg-dark text-white">Actions</th>
                <th className="bg-dark text-white">Create</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{order.first_name || "Unknown"}</td>
                    <td>{order.email || "Unknown"}</td>
                    <td>
                      {format(
                        new Date(order.order_date),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </td>
                    <td>{order.order_status}</td>
                    <td>
                      {order.product_name ? (
                        <div>
                          <strong>{order.product_name}</strong> <br />
                          Quantity: {order.quantity} <br />
                          Ends: {order.no_of_ends || "N/A"} <br />
                          Creel Type: {order.creel_type || "N/A"} <br />
                          Pitch: {order.creel_pitch || "N/A"} <br />
                          Bobin Length: {order.bobin_length || "N/A"}
                        </div>
                      ) : (
                        "No details available"
                      )}
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={order.order_status}
                        onChange={(e) =>
                          handleUpdateOrderStatus(
                            order.order_id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowPaymentModal(true);
                        }}
                      >
                        Create Payment
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {showPaymentModal && selectedOrder && (
        <>
          <div
            className="payment-modal-overlay"
            onClick={() => setShowPaymentModal(false)}
          ></div>
          <div className="payment-modal">
            <h1 className="text-center mb-3">
              Create Payment for Order #{selectedOrder.order_id}
            </h1>
            <form>
              <div className="form-group">
                <label>Total Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={paymentDetails.total_amount}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      total_amount: e.target.value,
                    })
                  }
                  placeholder="Enter total amount (only for first installment)"
                />
              </div>
              <div className="form-group">
                <label>Payment Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={paymentDetails.payment_amount}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      payment_amount: e.target.value,
                    })
                  }
                  placeholder="Enter payment amount"
                />
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select
                  className="form-control"
                  value={paymentDetails.payment_method}
                  onChange={(e) => {
                    setPaymentDetails({
                      ...paymentDetails,
                      payment_method: e.target.value,
                    });
                    // Reset bill file when payment method changes
                    setBillFile(null);
                  }}
                >
                  <option value="Online">Online</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div className="form-group">
                <label>Installment Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={paymentDetails.installment_number || ""}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      installment_number: e.target.value,
                    })
                  }
                  placeholder="Enter installment number"
                />
              </div>
              <div className="form-group">
                <label>Payment Type</label>
                <select
                  className="form-control"
                  value={paymentDetails.payment_type}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      payment_type: e.target.value,
                    })
                  }
                >
                  <option value="Product">Product</option>
                  <option value="Service">Service</option>
                </select>
              </div>
              {/* Conditionally render the file input for bill upload */}
              {paymentDetails.payment_method === "Cash" && (
                <div className="form-group">
                  <label>Upload Bill</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setBillFile(e.target.files[0])}
                  />
                </div>
              )}
              <button
                type="button"
                className="btn btn-success"
                onClick={handleCreatePayment}
              >
                Confirm Payment
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
