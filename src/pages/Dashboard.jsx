// src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  FaUsers,
  FaUserTie,
  FaClock,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";
import { toast } from "react-toastify";

function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  const [loginTime, setLoginTime] = useState("");
  const [logoutTime, setLogoutTime] = useState(""); 

  // Simulate loading dashboard data
  useEffect(() => {
    // Example values (Later you can replace with API calls)
    setEmployeeCount(25);
    setCustomerCount(120);

    // Login time stored in localStorage
    const storedLogin = localStorage.getItem("loginTime");
    if (storedLogin) {
      setLoginTime(storedLogin);
    } else {
      const now = new Date().toLocaleString();
      localStorage.setItem("loginTime", now);
      setLoginTime(now);
    }
  }, []);

  // Logout Handler
  const handleLogout = () => {
    debugger;
    const now = new Date().toLocaleString();
    setLogoutTime(now);
    localStorage.setItem("logoutTime", now);

    localStorage.setItem("isAuthenticated", "false");

    toast.success("Logged out successfully!");
    window.location.reload();
  };

  return (
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📊 Admin Dashboard</h2>

        <button className="btn btn-danger" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row g-4">
        {/* Employees */}
        <div className="col-md-3">
          <Card className="shadow-lg border-0 p-3">
            <h5 className="text-muted">
              <FaUserTie className="me-2 text-primary" />
              Employees
            </h5>
            <h2 className="fw-bold">{employeeCount}</h2>
            <p className="text-success">Active staff members</p>
          </Card>
        </div>

        {/* Customers */}
        <div className="col-md-3">
          <Card className="shadow-lg border-0 p-3">
            <h5 className="text-muted">
              <FaUsers className="me-2 text-warning" />
              Customers
            </h5>
            <h2 className="fw-bold">{customerCount}</h2>
            <p className="text-success">Registered customers</p>
          </Card>
        </div>

        {/* Login Time */}
        <div className="col-md-3">
          <Card className="shadow-lg border-0 p-3">
            <h5 className="text-muted">
              <FaClock className="me-2 text-info" />
              Login Time
            </h5>
            <p className="fw-bold">{loginTime}</p>
          </Card>
        </div>

        {/* Logout Time */}
        <div className="col-md-3">
          <Card className="shadow-lg border-0 p-3">
            <h5 className="text-muted">
              <FaSignOutAlt className="me-2 text-danger" />
              Last Logout
            </h5>
            <p className="fw-bold">
              {logoutTime || localStorage.getItem("logoutTime") || "N/A"}
            </p>
          </Card>
        </div>
      </div>

      {/* Activity Section */}
      <div className="row mt-5">
        <div className="col-md-8">
          <Card className="shadow border-0 p-4">
            <h4 className="fw-bold mb-3">
              <FaChartLine className="me-2 text-success" />
              Recent Activity
            </h4>

            <ul className="list-group">
              <li className="list-group-item">
                ✅ Employee "PRASHANTH" added successfully
              </li>
              <li className="list-group-item">
                ✅ Customer "Suresh" registered
              </li>
              <li className="list-group-item">
                📌 Scheduler updated for next week
              </li>
              <li className="list-group-item">
                ⚠ Pending approvals: 3 requests
              </li>
            </ul>
          </Card>
        </div>

        {/* Quick Notes */}
        <div className="col-md-4">
          <Card className="shadow border-0 p-4">
            <h4 className="fw-bold mb-3">📝 Quick Notes</h4>
            <textarea
              className="form-control"
              rows="8"
              placeholder="Write notes here prashanth..."
            ></textarea>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
