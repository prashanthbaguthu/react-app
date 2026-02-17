// File: src/components/AddCustomer.jsx
import React, { useState } from "react";
import { insertCustomer } from "../services/customerService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCustomer() {
  debugger;
  const navigate = useNavigate();

  // Form state
  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();

    // ✅ Validation checks
const fullNameClean = customer.fullName.replace(/\s+/g, ' ').trim();
if (!fullNameClean) {
  toast.error("Full Name is required!");
  return;
}
    if (!customer.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!customer.phone.trim()) {
      toast.error("Phone is required");
      return;
    }
    if (!customer.city.trim()) {
      toast.error("City is required");
      return;
    }

    try {
      // Call API to insert customer
      await insertCustomer(customer);
      toast.success("Customer added successfully!");
      // Navigate after 1 second
      setTimeout(() => navigate("/CustomerList"), 1000);
    } catch (error) {
      toast.error("Failed to add customer");
    }
  };

  return (
    <div className="container mt-4">
      {/* Toast messages container */}
      <ToastContainer position="top-right" autoClose={2000} />

      <h2 className="mb-4">Add Customer</h2>

      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            placeholder="Enter full name"
            value={customer.fullName}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={customer.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            id="phonenumber"
            className="form-control"
            placeholder="Enter phone"
            value={customer.phone}
            onChange={handleChange}
          />
        </div>

        {/* City */}
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            placeholder="Enter city"
            value={customer.city}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            Save Customer
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/CustomerList")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomer;
