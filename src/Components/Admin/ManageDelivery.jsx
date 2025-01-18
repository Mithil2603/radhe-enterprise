import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./styles/Admin.css";

const ManageDelivery = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/deliveries"
      );
      setDeliveries(response.data);
    } catch (error) {
      alert("Failed to fetch deliveries.");
    } finally {
      setLoading(false);
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
                <th className="bg-dark text-white">Payment ID</th>
                <th className="bg-dark text-white">Delivery Date</th>
                <th className="bg-dark text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.length > 0 ? (
                deliveries.map((delivery) => (
                  <tr key={delivery.delivery_id}>
                    <td>{delivery.delivery_id}</td>
                    <td>{delivery.payment_id}</td>
                    <td>
                      {delivery.delivery_date
                        ? format(
                            new Date(delivery.delivery_date),
                            "dd/MM/yyyy HH:mm:ss"
                          )
                        : "N/A"}
                    </td>
                    <td>{delivery.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
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
