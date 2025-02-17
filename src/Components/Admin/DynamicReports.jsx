import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

const getCurrentMonthDates = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  return { firstDay, today };
};

export default function DynamicReports() {
  const [reportType, setReportType] = useState("orders");
  const { firstDay, today } = getCurrentMonthDates(); // Get default dates
  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(today);
  const [reports, setReports] = useState([]);

  const fetchReports = useCallback(async () => {
    if (!startDate || !endDate) return;

    try {
      const res = await axios.get(
        `http://localhost:8000/admin/reports/${reportType}`,
        {
          params: { startDate, endDate },
        }
      );

      if (res.data.error) {
        console.error("API Error:", res.data);
        setReports([]);
      } else {
        setReports(res.data.length ? res.data : []);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setReports([]);
    }
  }, [reportType, startDate, endDate]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const exportPDF = () => {
    if (reports.length === 0) return;
    const doc = new jsPDF();
    doc.text(`${reportType.toUpperCase()} Report`, 20, 10);
    doc.autoTable({
      head: [Object.keys(reports[0]).map((key) => key.toUpperCase())],
      body: reports.map((row) => Object.values(row)),
    });
    doc.save(`${reportType}_Report.pdf`);
  };

  return (
    <div className="container-fluid">
      <h1 className="fw-bolder mb-5 text-bg-dark text-transparent p-3 rounded m-auto text-center mt-5 container w-50">
        Admin Reports
      </h1>
      <div className="mb-4 container border-none d-flex gap-3 justify-content-between align-items-center">
        <div className="filters d-flex gap-1 flex-wrap">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="p-1 rounded"
          >
            <option value="users">Users</option>
            <option value="orders">Orders</option>
            <option value="payments">Payments</option>
            <option value="services">Services</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-1 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-1 rounded"
          />
        </div>
        <div className="d-flex gap-1 flex-wrap">
          <button
            onClick={exportPDF}
            disabled={reports.length === 0}
            className="btn btn-danger"
          >
            Export PDF
          </button>
          <CSVLink
            data={reports}
            filename={`${reportType}_Report.csv`}
            className="btn btn-success"
            disabled={reports.length === 0}
          >
            Export CSV
          </CSVLink>
        </div>
      </div>
      <div className="container-fluid user-table w-100">
        <table className="table table-hover table-striped rounded overflow-hidden">
          <thead>
            <tr>
              {reports.length > 0 &&
                Object.keys(reports[0]).map((key) => (
                  <th className="bg-dark text-light" key={key}>
                    {key.toUpperCase()}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((row, i) => (
                <tr key={i}>
                  {Object.keys(row).map((key, j) => (
                    <td key={j}>
                      {key.toLowerCase().includes("date")
                        ? format(new Date(row[key]), "dd MMM yyyy")
                        : row[key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="100%">No Data Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
