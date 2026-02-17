// File: src/components/CustomerList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPagedCustomers,
  deleteCustomer,
  insertCustomer,
} from "../services/customerService";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "react-toastify/dist/ReactToastify.css";
function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);

  const [selectedCustomers, setSelectedCustomers] = useState([]);

  // Progress state
  const [progress, setProgress] = useState({
    current: 0,
    total: 0,
    isActive: false,
    elapsedTime: 0,
  });

  const navigate = useNavigate();

  // Load Customers
  useEffect(() => {
    loadCustomers();
    
  }, [search]);

  // Fetch Customers
  const loadCustomers = async () => {
    debugger;
    try {
      const response = await getPagedCustomers(0, 1000, search);

      const mappedCustomers = response.data.items.map((c) => ({
        customerId: c.customerId || c.CustomerId,
        fullName: c.fullName || c.FullName,
        email: c.email || c.Email,
        city: c.city || c.City,
      }));

      setCustomers(mappedCustomers);
      setSelectedCustomers([]);
    } catch (error) {
      toast.error("Failed to load customers");
    }
  };

  // Single Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This customer will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCustomer(id)
          .then(() => {
            toast.success("Customer deleted successfully");
            loadCustomers();
          })
          .catch(() => toast.error("Failed to delete customer"));
      }
    });
  };

  // Bulk Delete
  const handleBulkDelete = async () => {
    if (selectedCustomers.length === 0) {
      toast.warning("No customers selected");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are deleting ${selectedCustomers.length} customers permanently!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const startTime = Date.now();

        setProgress({
          current: 0,
          total: selectedCustomers.length,
          isActive: true,
          elapsedTime: 0,
        });

        for (let i = 0; i < selectedCustomers.length; i++) {
          const id = selectedCustomers[i];

          try {
            await deleteCustomer(id);

            setProgress((prev) => ({
              ...prev,
              current: prev.current + 1,
              elapsedTime: Math.floor((Date.now() - startTime) / 1000),
            }));
          } catch {
            toast.error(`Failed to delete customer ID ${id}`);
          }
        }

        toast.success(`${selectedCustomers.length} customers deleted`);
        setProgress({ current: 0, total: 0, isActive: false, elapsedTime: 0 });

        loadCustomers();
      }
    });
  };

  // Export CSV
  const exportCSV = () => {
    if (customers.length === 0) {
      toast.info("No data to export");
      return;
    }

    const headers = ["ID", "Full Name", "Email", "City"];

    const rows = customers.map((c) => [
      c.customerId,
      c.fullName,
      c.email,
      c.city,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "customers.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ PRINT PDF
  const printPDF = () => {
    debugger;
    if (customers.length === 0) {
      toast.info("No customers available to print");
      return;
    }

    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Customer Report", 14, 15);

    // Table Header
    const headers = [["ID", "Full Name", "Email", "City"]];

    // Table Data
    const rows = customers.map((c) => [
      c.customerId,
      c.fullName,
      c.email,
      c.city,
    ]);

    // Auto Table
    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 25,
    });

    // Save PDF
    doc.save("Customer_Report.pdf");
  };

  // Upload CSV File
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Bulk Upload CSV
  const handleBulkUpload = () => {
    if (!file) {
      toast.warning("Please select a CSV file");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: async function (results) {
        const data = results.data.map((row) => ({
          fullName: row["Full Name"] || row["fullName"],
          email: row["Email"] || row["email"],
          city: row["City"] || row["city"],
        }));

        const startTime = Date.now();

        setProgress({
          current: 0,
          total: data.length,
          isActive: true,
          elapsedTime: 0,
        });

        const CHUNK_SIZE = 200;

        for (let i = 0; i < data.length; i += CHUNK_SIZE) {
          const chunk = data.slice(i, i + CHUNK_SIZE);

          await Promise.all(
            chunk.map((record) =>
              insertCustomer(record).then(() =>
                setProgress((prev) => ({
                  ...prev,
                  current: prev.current + 1,
                  elapsedTime: Math.floor(
                    (Date.now() - startTime) / 1000
                  ),
                }))
              )
            )
          );
        }

        toast.success("Customers imported successfully");
        setProgress({ current: 0, total: 0, isActive: false, elapsedTime: 0 });
        setFile(null);
        loadCustomers();
      },

      error: function () {
        toast.error("Error parsing CSV file");
      },
    });
  };

  // Select Customer Checkbox
  const handleSelectCustomer = (id, checked) => {
    debugger;
    setSelectedCustomers((prev) =>
      checked ? [...prev, id] : prev.filter((c) => c !== id)
    );
  };

  // Select All Checkbox
  const handleSelectAll = (checked) => {
    debugger;
    setSelectedCustomers(
      checked ? customers.map((c) => c.customerId) : []
    );
  };

  // Format Time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
//Html Code design Start
  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Customer Management</h2>

    <div>
          <button className="btn btn-success btn-sm me-2"  onClick={() => navigate("/add")}> + Add Customer </button>
          <button className="btn btn-info btn-sm me-2" onClick={exportCSV}  > ⬇ CSV </button>
          <button  className="btn btn-secondary btn-sm me-2"  onClick={printPDF} > 🖨 PDF </button>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="form-control form-control-sm d-inline-block me-2"
            style={{ width: "170px" }}
          />

            <button  className="btn btn-primary btn-sm me-2"    onClick={handleBulkUpload} >  ⬆ Import</button>
            <button  className="btn btn-danger btn-sm"  onClick={handleBulkDelete} disabled={selectedCustomers.length === 0} > 🗑 Delete</button>
      </div>

      </div>

      {/* Progress Bar */}
      {progress.isActive && (
        <div className="mb-3">
          <div className="progress mb-1">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{
                width: `${(progress.current / progress.total) * 100}%`,
              }}
            >
              {progress.current} / {progress.total}
            </div>
          </div>
          <small>Elapsed Time: {formatTime(progress.elapsedTime)}</small>
        </div>
      )}

      {/* Search */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    selectedCustomers.length === customers.length &&
                    customers.length > 0
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>City</th>
              <th style={{ width: "200px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((cust) => (
                <tr key={cust.customerId}>
                  <td className="text-center align-middle">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(cust.customerId)}
                      onChange={(e) =>
                        handleSelectCustomer(cust.customerId, e.target.checked)
                      }
                    />
                  </td>

                  <td className="text-center align-middle">{cust.customerId}</td>
                  <td className="text-center align-middle">{cust.fullName}</td>
                  <td className="text-center align-middle">{cust.email}</td>
                  <td className="text-center align-middle">{cust.city}</td>

                  <td className="text-center align-middle">
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => navigate(`/edit-customer/${cust.customerId}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(cust.customerId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CustomerList;
