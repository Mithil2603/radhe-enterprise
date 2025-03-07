import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import "./styles/Admin.css";

const getCurrentMonthDates = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const today = new Date().toISOString().split("T")[0];
  return { firstDay, today };
};

export default function OrdersReport() {
  const { firstDay, today } = getCurrentMonthDates();
  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(today);
  const [reports, setReports] = useState({ data: [] });

  const fetchReports = useCallback(async () => {
    if (!startDate || !endDate) return;

    try {
      const res = await axios.get(
        `http://localhost:8000/admin/reports/orders`,
        {
          params: {
            startDate,
            endDate,
          },
        }
      );

      if (res.data.error) {
        console.error("API Error:", res.data);
        setReports({ data: [] });
      } else {
        setReports(res.data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setReports({ data: [] });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const exportPDF = () => {
    if (!reports.data?.length) return;

    // Create PDF in landscape mode with A3 size
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a3",
    });

    const dateRange = `${format(
      new Date(reports.date_range.start),
      "dd MMM yyyy"
    )} - ${format(new Date(reports.date_range.end), "dd MMM yyyy")}`;

    // Add company name at the top
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(
      "Radhe Enterprise Pvt. Ltd.",
      doc.internal.pageSize.width / 2,
      20,
      {
        align: "center",
      }
    );

    // Report details
    doc.setFontSize(14);
    doc.text(`${reports.type.toUpperCase()} REPORT`, 20, 40);
    doc.setFontSize(10);
    doc.text(
      `Generated: ${format(
        new Date(reports.generated_at),
        "dd MMM yyyy HH:mm"
      )}`,
      20,
      50
    );
    doc.text(`Date Range: ${dateRange}`, 20, 60);

    // Prepare table data
    const columns = Object.keys(reports.data[0]).map((key) =>
      key.toUpperCase().replace(/_/g, " ")
    );
    const rows = reports.data.map((row) => {
      return Object.keys(row).map((key) => {
        const value = row[key];
        if (key === "order_details" && Array.isArray(value)) {
          // Format order_details array
          return value
            .map(
              (item) =>
                `${item.quantity}x ${item.creel_type || ""} (${
                  item.bobin_length || "N/A"
                })`
            )
            .join(", ");
        }
        return value;
      });
    });

    // Table settings
    doc.autoTable({
      startY: 70,
      head: [columns],
      body: rows,
      margin: { top: 70, right: 20, bottom: 20, left: 20 },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 9,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        // Add more specific column styles if needed
      },
      didDrawPage: (data) => {
        // Footer
        doc.setFontSize(8);
        const pageCount = doc.internal.getNumberOfPages();
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      },
    });

    doc.save(`${reports.type}_report.pdf`);
  };

  return (
    <div className="container-fluid">
      <h1 className="fw-bolder mb-5 text-bg-dark text-transparent p-3 rounded m-auto text-center mt-5 container w-50">
        Orders Report
      </h1>
      <div className="mb-4 container border-none d-flex gap-3 justify-content-between align-items-center">
        <div className="filters d-flex gap-1 flex-wrap">
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
            disabled={!reports.data?.length}
            className="btn btn-danger"
          >
            Export PDF
          </button>
          <CSVLink
            data={
              reports.data?.length
                ? (() => {
                    const dateRange = `${format(
                      new Date(reports.date_range.start),
                      "dd MMM yyyy"
                    )} - ${format(
                      new Date(reports.date_range.end),
                      "dd MMM yyyy"
                    )}`;

                    // Create header rows
                    const headerRows = [
                      ["Radhe Enterprise Pvt. Ltd."],
                      [`${reports.type.toUpperCase()} REPORT`],
                      [
                        `Generated: ${format(
                          new Date(reports.generated_at),
                          "dd MMM yyyy HH:mm"
                        )}`,
                      ],
                      [`Date Range: ${dateRange}`],
                      [], // Empty row for spacing
                      Object.keys(reports.data[0]).map((key) =>
                        key.toUpperCase().replace(/_/g, " ")
                      ),
                    ];

                    // Create data rows with formatting
                    const dataRows = reports.data.map((row) => {
                      return Object.keys(row).map((key) => {
                        const value = row[key];

                        if (key === "order_details" && Array.isArray(value)) {
                          return value
                            .map(
                              (item) =>
                                `${item.quantity}x ${item.creel_type || ""} (${
                                  item.bobin_length || "N/A"
                                })`
                            )
                            .join(", ");
                        }

                        if (typeof value === "string" && value.includes("-")) {
                          try {
                            return format(new Date(value), "dd MMM yyyy HH:mm");
                          } catch {
                            return value;
                          }
                        }

                        return value;
                      });
                    });

                    return [...headerRows, ...dataRows];
                  })()
                : []
            }
            filename={`Complete_Report.csv`}
            className="btn btn-success"
            disabled={!reports.data?.length}
          >
            Export CSV
          </CSVLink>
        </div>
      </div>
      <div className="container-fluid user-table w-100">
        <table className="table table-hover table-striped rounded overflow-hidden table-bordered">
          <thead>
            <tr>
              {reports.data?.length > 0 &&
                Object.keys(reports.data[0]).map((key) => (
                  <th className="bg-dark text-light" key={key}>
                    {key.toUpperCase().replace(/_/g, " ")}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {reports.data?.length > 0 ? (
              reports.data.map((row, i) => (
                <tr key={i}>
                  {Object.keys(row).map((key, j) => {
                    const value = row[key];
                    let displayValue = value;

                    if (key === "order_details") {
                      // Handle already-parsed array or empty data
                      const items = Array.isArray(value) ? value : [];
                      displayValue = items
                        .map(
                          (item) => `${item.quantity}x ${item.creel_type || ""}`
                        )
                        .join(", ");
                    } else if (key === "services") {
                      displayValue =
                        value?.split(",").join(", ") || "No services";
                    } else if (key === "latest_feedback") {
                      displayValue = value || "No feedback yet";
                    } else if (key === "latest_rating") {
                      displayValue = value ? `${value}/5` : "Not rated";
                    } else if (key.toLowerCase().includes("date")) {
                      displayValue = format(
                        new Date(value),
                        "dd MMM yyyy HH:mm"
                      );
                    } else if (typeof value === "string" && value.length > 50) {
                      displayValue = value.slice(0, 50) + "...";
                    }

                    return <td key={j}>{displayValue}</td>;
                  })}
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
