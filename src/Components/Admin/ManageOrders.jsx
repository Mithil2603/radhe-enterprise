import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import "./styles/Admin.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    payment_amount: "",
    payment_method: "Online",
    installment_number: "0",
    payment_type: "Product",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/admin/orders");
      setOrders(response.data);
    } catch (error) {
      toast.error("Failed to fetch orders.");
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
      toast.success("Order status updated successfully.");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order status.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:8080/orders/${orderId}`);
        toast.success("Order deleted successfully.");
        fetchOrders();
      } catch (error) {
        toast.error("Failed to delete order.");
      }
    }
  };

  const handleCreatePayment = async () => {
    try {
      const totalAmount = parseFloat(paymentDetails.total_amount) || 0;
      const paymentAmount = parseFloat(paymentDetails.payment_amount) || 0;

      if (totalAmount <= 0) {
        toast.error("Please specify a valid total amount.");
        return;
      }

      if (paymentAmount <= 0 || paymentAmount > totalAmount) {
        toast.error("Please specify a valid payment amount.");
        return;
      }

      const payload = {
        ...paymentDetails,
        order_id: selectedOrder.order_id,
        total_amount: totalAmount,
        remaining_amount: totalAmount - paymentAmount,
        installment_number: selectedOrder.installment_number
          ? parseInt(selectedOrder.installment_number) + 1
          : 1, // First installment
      };

      console.log("Payload being sent:", payload); // Debugging step

      await axios.post("http://localhost:8080/admin/payments", payload);

      toast.success("Payment created successfully.");
      setShowPaymentModal(false);
      fetchOrders();
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Failed to create payment.");
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
            <thead className="bg-dark text-white">
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
                      <button
                        className="btn btn-danger btn-sm mt-2"
                        onClick={() => handleDeleteOrder(order.order_id)}
                      >
                        Delete
                      </button>
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
                  <td colSpan="6" className="text-center">
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
                  placeholder="Enter total amount"
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
                />
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select
                  className="form-control"
                  value={paymentDetails.payment_method}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      payment_method: e.target.value,
                    })
                  }
                >
                  <option value="Online">Online</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div className="form-group">
                <label>Installment Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={
                    selectedOrder.installment_number
                      ? parseInt(selectedOrder.installment_number) + 1
                      : 1
                  }
                  readOnly
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
};

export default ManageOrders;
