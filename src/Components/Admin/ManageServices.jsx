import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./styles/Admin.css";

const ManageService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    payment_amount: "",
    payment_method: "Online",
    payment_type: "Service", // Set default to Service
    total_amount: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://machinery-backend-login-part.onrender.com/admin/services");
      setServices(response.data);
    } catch (error) {
      alert("Failed to fetch services.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayment = async () => {
    try {
      const paymentAmount = parseFloat(paymentDetails.payment_amount) || 0;

      // Validation
      if (paymentAmount <= 0) {
        alert("Please specify a valid payment amount.");
        return;
      }

      const payload = {
        service_cost: paymentAmount,
        payment_method: paymentDetails.payment_method,
        payment_type: paymentDetails.payment_type,
        order_id: selectedService.order_id, // Assuming you have order_id in the service
        total_amount: paymentAmount,
      };

      // Send payment request to the new service payment route
      const response = await axios.post(
        "https://machinery-backend-login-part.onrender.com/admin/service-payments",
        {
          paymentDetails: JSON.stringify(payload),
        }
      );

      if (response.status === 200) {
        alert("Service payment created successfully.");
        setShowPaymentModal(false);
        fetchServices(); // Refresh the services list
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Failed to create payment.");
    }
  };

  const handleChangeServiceStatus = async (serviceId, newStatus) => {
    try {
      const response = await axios.put(
        `https://machinery-backend-login-part.onrender.com/admin/services/${serviceId}`,
        {
          service_status: newStatus,
        }
      );

      if (response.status === 200) {
        alert("Service status updated successfully.");
        fetchServices(); // Refresh the services list to reflect the updated status
      }
    } catch (error) {
      console.error("Error updating service status:", error);
      alert("Failed to update service status.");
    }
  };

  return (
    <div className="container-fluid pt-5 pb-5">
      <h1 className="fw-bolder mb-4 w-50 text-bg-dark text-transparent p-3 rounded m-auto text-center">
        Manage Services
      </h1>
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div className="container-fluid user-table w-100">
          <table className="table table-bordered table-hover table-striped rounded overflow-hidden">
            <thead className="bg-dark text-white">
              <tr>
                <th className="bg-dark text-white">Service ID</th>
                <th className="bg-dark text-white">Order ID</th>
                <th className="bg-dark text-white">User ID</th>
                <th className="bg-dark text-white">Payment ID</th>
                <th className="bg-dark text-white">Requested Date</th>
                <th className="bg-dark text-white">Service Type</th>
                <th className="bg-dark text-white">Service Notes</th>
                <th className="bg-dark text-white">Service Cost</th>
                <th className="bg-dark text-white">Service Status</th>
                <th className="bg-dark text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service) => (
                  <tr key={service.service_id}>
                    <td>{service.service_id}</td>
                    <td>{service.order_id}</td>
                    <td>{service.user_id}</td>
                    <td>{service.payment_id}</td>
                    <td>
                      {service.requested_date
                        ? format(
                            new Date(service.requested_date),
                            "dd/MM/yyyy HH:mm:ss"
                          )
                        : "N/A"}
                    </td>
                    <td>{service.service_type}</td>
                    <td>{service.service_notes || "N/A"}</td>
                    <td>₹{service.service_cost || "N/A"}</td>
                    <td>{service.service_status}</td>
                    <td className="d-flex justify-content-center align-items-center gap-2 flex-wrap"> 
                      <select
                        className="form-select mt-2"
                        value={service.service_status}
                        onChange={(e) =>
                          handleChangeServiceStatus(
                            service.service_id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setSelectedService(service);
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
                  <td colSpan="10" className="text-center">
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Creating Payment */}
      {showPaymentModal && selectedService && (
        <>
          <div
            className="payment-modal-overlay"
            onClick={() => setShowPaymentModal(false)}
          ></div>
          <div className="payment-modal">
            <h1 className="text-center mb-3">
              Create Payment for Service #{selectedService.service_id}
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
                  }}
                >
                  <option value="Online">Online</option>
                  <option value="Cash">Cash</option>
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

export default ManageService;
