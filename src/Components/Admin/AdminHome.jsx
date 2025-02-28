import React, { useEffect, useState } from "react";
import "./styles/Admin.css";
import axios from "axios";
import { format } from "date-fns";
import AdminReports from "./AdminReports.jsx";

export default function AdminHome() {
  const [pendingServices, setPendingServices] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingOrders: 0,
    revenue: 0,
    feedbackCount: 0,
    recentOrders: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          usersRes,
          ordersRes,
          servicesRes,
          revenueRes,
          feedbackRes,
          recentOrdersRes,
        ] = await Promise.all([
          axios.get("http://localhost:8000/admin/total-users"),
          axios.get("http://localhost:8000/admin/pending-orders"),
          axios.get("http://localhost:8000/admin/pending-services"),
          axios.get("http://localhost:8000/admin/revenue"),
          axios.get("http://localhost:8000/admin/feedback-count"),
          axios.get("http://localhost:8000/admin/recent-orders"),
        ]);

        setStats({
          totalUsers: usersRes.data.total_users,
          pendingOrders: ordersRes.data.pending_orders,
          pendingServices: servicesRes.data.pending_services,
          revenue: revenueRes.data.total_revenue,
          feedbackCount: feedbackRes.data.feedback_count,
          recentOrders: recentOrdersRes.data,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchPendingServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/admin/pending-services"
        );
        setPendingServices(response.data);
      } catch (error) {
        console.error("Error fetching pending services:", error);
      }
    };

    fetchPendingServices();
  }, []);

  return (
    <>
      <div className="container-fluid custom-bg-admin">
        {/* Show Stats */}
        <div className="row d-flex justify-content-center align-items-center gap-4 flex-wrap mt-5 mobile-w-100">
          {/* Users */}
          <div className="card text-bg-success mb-3 card-width flex-shrink-1">
            <div className="card-header">Users</div>
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">{stats.totalUsers}</p>
            </div>
          </div>

          {/* Orders */}
          <div className="card text-bg-danger mb-3 card-width flex-shrink-1">
            <div className="card-header">Orders</div>
            <div className="card-body">
              <h5 className="card-title">Pending Orders</h5>
              <p className="card-text">{stats.pendingOrders}</p>
            </div>
          </div>

          {/* Revenue */}
          <div className="card text-bg-warning mb-3 card-width flex-shrink-1">
            <div className="card-header">Revenue</div>
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <p className="card-text">₹{stats.revenue}</p>
            </div>
          </div>

          {/* Feedback */}
          <div className="card text-bg-primary mb-3 card-width flex-shrink-1">
            <div className="card-header">Feedbacks</div>
            <div className="card-body">
              <h5 className="card-title">Total Feedbacks</h5>
              <p className="card-text">{stats.feedbackCount}</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-4 text-center pb-5">
          <h1 className="fw-bolder mb-4 w-50 text-bg-dark text-light p-3 rounded m-auto">
            Recent Orders
          </h1>
          <div className="w-100 d-flex align-items-center justify-content-center gap-4 flex-wrap">
            {stats.recentOrders.map((order) => (
              <div
                className="card text-center bg-tertiary card-manual-width"
                key={order.order_id}
              >
                <div className="card-header custom-bg text-info">
                  Order ID: {order.order_id}
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
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 text-center">
          {/* Pending Services */}
          <div className="mt-4 text-center">
            <h1 className="fw-bolder mb-4 w-50 text-bg-dark text-light p-3 rounded m-auto">
              Pending Services
            </h1>

            <div className="w-100 d-flex align-items-center justify-content-center gap-4 flex-wrap">
              {pendingServices.length === 0 ? (
                <p className="text-muted">No pending services found.</p>
              ) : (
                pendingServices.map((service) => (
                  <div
                    className="card text-center bg-tertiary card-manual-width custom-height"
                    key={service.service_id}
                  >
                    <div className="card-header custom-bg text-info d-flex justify-content-between flex-wrap align-items-center px-5">
                      <span>Order ID: {service.order_id}</span> | 
                      <span>Service ID: {service.service_id}</span>
                    </div>
                    <div className="card-body">
                      <h3 className="card-title text-info-emphasis fw-bold">
                        {service.product_name}
                      </h3>
                      <table className="table table-bordered table-striped table-hover text-start">
                        <tbody>
                          <tr>
                            <td>
                              <strong>Service Notes:</strong>
                            </td>
                            <td>{service.service_notes || "N/A"}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Service Cost:</strong>
                            </td>
                            <td>₹{service.service_cost || "N/A"}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Requested Date:</strong>
                            </td>
                            <td>
                              {format(
                                new Date(service.requested_date),
                                "dd/MM/yyyy HH:mm:ss"
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="card-footer custom-bg text-info">
                      Service Type: {service.service_type}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <AdminReports></AdminReports>
    </>
  );
}
