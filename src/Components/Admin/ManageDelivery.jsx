import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./styles/Admin.css";

const ManageDelivery = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({}); // For tracking status updates

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://machinery-backend-login-part.onrender.com/admin/deliveries"
      );
      setDeliveries(response.data);
    } catch (error) {
      alert("Failed to fetch deliveries.");
    } finally {
      setLoading(false);
    }
  };

  const updateDeliveryStatus = async (deliveryId) => {
    try {
      await axios.put(`https://machinery-backend-login-part.onrender.com/admin/delivery/${deliveryId}`, {
        delivery_status: statusUpdate[deliveryId], // Get the new status from state
      });
      alert("Delivery status updated successfully!");
      fetchDeliveries(); // Refresh the deliveries list
    } catch (error) {
      alert("Failed to update delivery status.");
    }
  };

  return (
    <div className="container-fluid pt-5 pb-5">
      <h1 className="fw-bolder mb-4 w-50 text-bg-dark text-transparent p-3 rounded m-auto text-center">
        Manage Deliveries
      </h1>
      {loading ? (
        <p>Loading deliveries...</p>
      ) : (
        <div className="container-fluid user-table w-100">
          <table className="table table-bordered table-hover table-striped rounded overflow-hidden">
            <thead className="bg-dark text-white">
              <tr>
                <th className="bg-dark text-white">Delivery ID</th>
                <th className="bg-dark text-white">Order ID</th>
                <th className="bg-dark text-white">Payment ID</th>
                <th className="bg-dark text-white">Payment Status</th>
                <th className="bg-dark text-white">Delivery Created Date</th>
                <th className="bg-dark text-white">Delivery Status</th>
                <th className="bg-dark text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.length > 0 ? (
                deliveries.map((delivery) => (
                  <tr key={delivery.delivery_id}>
                    <td>{delivery.delivery_id}</td>
                    <td>{delivery.order_id}</td>
                    <td>{delivery.payment_id}</td>
                    <td>{delivery.payment_status}</td>
                    <td>
                      {delivery.delivery_date
                        ? format(
                            new Date(delivery.delivery_date),
                            "dd/MM/yyyy HH:mm:ss"
                          )
                        : "N/A"}
                    </td>
                    <td>{delivery.delivery_status}</td>
                    <td className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                      <select
                        value={
                          statusUpdate[delivery.delivery_id] ||
                          delivery.delivery_status
                        }
                        onChange={(e) =>
                          setStatusUpdate({
                            ...statusUpdate,
                            [delivery.delivery_id]: e.target.value,
                          })
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          updateDeliveryStatus(delivery.delivery_id)
                        }
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No deliveries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageDelivery;
