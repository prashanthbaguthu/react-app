// File: src/components/EditCustomer.jsx
import React, { useState, useEffect } from "react";
import { getCustomerById, updateCustomer } from "../services/customerService";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCustomer() {
  debugger;
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    customerId: id,
    fullName: "",
    email: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await getCustomerById(id);
        setCustomer({
          customerId: res.data.customerId || res.data.CustomerId,
          fullName: res.data.fullName || res.data.FullName,
          email: res.data.email || res.data.Email,
          phone: res.data.phone || res.data.Phone,
          city: res.data.city || res.data.City,
        });
      } catch (error) {
        toast.error("Failed to load customer");
      }
    };
    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(customer);
      toast.success("Customer updated successfully!");
      setTimeout(() => navigate("/CustomerList"), 1000);
    } catch (error) {
      toast.error("Failed to update customer");
    }
  };

  return (
    <div className="container mt-4">
    {/* ✅ ToastContainer: Required to render toast messages IMportant */}
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="mb-4">Edit Customer</h2>

      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={customer.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={customer.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={customer.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={customer.city}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Update Customer
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

export default EditCustomer;
