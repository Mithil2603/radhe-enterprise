import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Admin.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminReports() {
  const [reports, setReports] = useState({
    users: [],
    topProducts: [],
    recentOrders: [],
    revenue: [],
    pendingOrders: [],
    completedOrders: [],
    paymentStatus: [],
    serviceStatus: [],
    feedback: [],
    serviceRequests: [],
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const endpoints = [
          "users",
          "top-products",
          "recent-orders",
          "revenue",
          "orders/pending",
          "orders/completed",
          "payment-status",
          "services-status",
          "feedback",
          "service-requests",
        ];

        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            axios.get(`http://localhost:8000/admin/static_reports/${endpoint}`)
          )
        );

        setReports({
          users: responses[0].data,
          topProducts: responses[1].data,
          recentOrders: responses[2].data,
          revenue: responses[3].data,
          pendingOrders: responses[4].data,
          completedOrders: responses[5].data,
          paymentStatus: responses[6].data,
          serviceStatus: responses[7].data,
          feedback: responses[8].data,
          serviceRequests: responses[9].data,
        });
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  const getColor = (rating) => {
    switch (rating) {
      case 5:
        return "#28a745"; // Green for best rating
      case 4:
        return "#17a2b8"; // Blue
      case 3:
        return "#ffc107"; // Yellow
      case 2:
        return "#fd7e14"; // Orange
      case 1:
        return "#dc3545"; // Red for worst rating
      default:
        return "#8884d8"; // Default color
    }
  };

  return (
    <div className="container-fluid w-100 pb-4">
      <h1 className="fw-bolder mb-5 w-50 text-bg-dark text-transparent p-3 rounded m-auto text-center mt-5">
        Admin Graphical Reports
      </h1>

      <div className="container w-100">
        {/* Top Products & Revenue */}
        <div className="row mb-4 w-100">
          <div className="col-md-6 mb-4 w-100">
            <div className="card p-3 shadow w-100">
              <h3 className="text-center">Top Products</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reports.topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product_name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total_orders" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-md-6 mb-4 w-100">
            <div className="card p-3 shadow w-100">
              <h3 className="text-center">Monthly Revenue</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reports.revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total_revenue"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Payment & Service Status */}
        <div className="d-flex justify-content-between align-items-center gap-3 mb-5 customer-service">
          <div className="card p-3 shadow">
            <h3 className="text-center">Payment Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reports.paymentStatus}
                  dataKey="total_payments"
                  nameKey="payment_status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {reports.paymentStatus.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-3 shadow">
            <h3 className="text-center">Service Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reports.serviceStatus}
                  dataKey="total_services"
                  nameKey="service_status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {reports.serviceStatus.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Users */}
        <div className="card p-3 shadow mb-5 w-100">
          <h3 className="text-center">Recent Users</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center">
              <thead className="table-dark">
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {reports.users.map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>
                      {user.first_name} {user.last_name}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      {new Date(user.registration_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="card p-3 shadow mb-5 w-100">
          <h3 className="text-center">Pending Orders</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Creel Type</th>
                  <th>Bobin Length</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {reports.pendingOrders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{order.product_name}</td>
                    <td>{order.quantity}</td>
                    <td>{order.creel_type}</td>
                    <td>{order.bobin_length}</td>
                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-100 d-flex justify-content-center align-items-center gap-3 customer-service">
          {/* Feedback & Service Requests */}
          <div className="card p-3 shadow w-100 mb-5">
            <h3 className="text-center">Customer Feedback</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reports.feedback}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_feedback">
                  {reports.feedback.map((entry, index) => {
                    // Convert rating to number if it's coming as string
                    const rating = Number(entry.rating);
                    return (
                      <Cell key={`cell-${index}`} fill={getColor(rating)} />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-3 shadow w-100 mb-5">
            <h3 className="text-center">Service Requests</h3>
            <ResponsiveContainer height={300}>
              <BarChart data={reports.serviceRequests}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service_type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_requests" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Completed Orders */}
        <div className="card p-3 shadow mb-5 w-100">
          <h3 className="text-center">Completed Orders</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Creel Pitch</th>
                  <th>No. of Ends</th>
                  <th>Completion Date</th>
                </tr>
              </thead>
              <tbody>
                {reports.completedOrders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{order.product_name}</td>
                    <td>{order.quantity}</td>
                    <td>{order.creel_pitch}</td>
                    <td>{order.no_of_ends}</td>
                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
