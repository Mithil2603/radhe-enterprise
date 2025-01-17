import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import "./styles/Admin.css";

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/admin/payments");
      setPayments(response.data);
    } catch (error) {
      toast.error("Failed to fetch payments.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid pt-5 pb-5">
      <h1 className="fw-bolder mb-4 w-50 text-bg-dark text-transparent p-3 rounded m-auto text-center">
        View Payments
      </h1>
      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <div className="container-fluid user-table w-100">
          <table className="table table-bordered table-hover table-striped rounded overflow-hidden">
            <thead className="bg-dark text-white">
              <tr>
                <th className="bg-dark text-white">RazorPay ID</th>
                <th className="bg-dark text-white">Payment ID</th>
                <th className="bg-dark text-white">Order ID</th>
                <th className="bg-dark text-white">Payment Created Date</th>
                <th className="bg-dark text-white">Amount</th>
                <th className="bg-dark text-white">Installment No</th>
                <th className="bg-dark text-white">Payment Method</th>
                <th className="bg-dark text-white">Payment Status</th>
                <th className="bg-dark text-white">Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment.payment_id}>
                    <td>{payment.razorpay_order_id}</td>
                    <td>{payment.payment_id}</td>
                    <td>{payment.order_id}</td>
                    <td>
                      {payment.payment_date
                        ? format(
                            new Date(payment.payment_date),
                            "dd/MM/yyyy HH:mm:ss"
                          )
                        : "N/A"}
                    </td>
                    <td>₹{payment.payment_amount}</td>
                    <td>{payment.installment_number}</td>
                    <td>{payment.payment_method}</td>
                    <td>{payment.payment_status}</td>
                    <td>{payment.payment_type}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No payments found.
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

export default ManagePayments;
