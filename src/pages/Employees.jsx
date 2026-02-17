import React, { useState, useEffect } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../EmployeeService";

import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "../App.css";

function Employees() {
  // ✅ Employee List State
  const [employeesList, setEmployeesList] = useState([]);

  // ✅ Form State
  const [empName, setEmpName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empDepartment, setEmpDepartment] = useState("");

  // ✅ Editing State
  const [editingId, setEditingId] = useState(null);

  // ✅ Load Employees on Page Load
  useEffect(() => {
    loadEmployees();
  }, []);

  // ✅ Load Employee List
  const loadEmployees = () => {
    getEmployees()
      .then((res) => setEmployeesList(res))
      .catch(() => toast.error("Failed to load employees"));
  };

  // ✅ Reset Form
  const resetForm = () => {
    setEmpName("");
    setEmpEmail("");
    setEmpDepartment("");
    setEditingId(null);
  };

  // ✅ Add or Update Employee
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!empName.trim()) return toast.error("Employee name is required");
    if (!empEmail.trim()) return toast.error("Email is required");
    if (!empDepartment.trim()) return toast.error("Department is required");

    const emp = {
      name: empName,
      email: empEmail,
      department: empDepartment,
    };

    // UPDATE
    if (editingId) {
      updateEmployee({ employeeId: editingId, ...emp })
        .then(() => {
          toast.success("Employee updated successfully");
          resetForm();
          loadEmployees();
        })
        .catch(() => toast.error("Failed to update employee"));
    }
    // ADD
    else {
      createEmployee(emp)
        .then(() => {
          toast.success("Employee added successfully");
          resetForm();
          loadEmployees();
        })
        .catch(() => toast.error("Failed to add employee"));
    }
  };

  // ✅ Edit Employee
  const handleEdit = (emp) => {
    setEmpName(emp.name);
    setEmpEmail(emp.email);
    setEmpDepartment(emp.department);
    setEditingId(emp.employeeId);

    toast.info("Edit mode enabled");
  };

  // ✅ Delete Employee
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(id)
          .then(() => {
            toast.success("Employee deleted successfully");
            loadEmployees();
          })
          .catch(() => toast.error("Delete failed"));
      }
    });
  };

  return (
    <div className="container-fluid mt-4" style={{ maxWidth: "98%" }}>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="card shadow p-4 mb-4">
        <h2 className="text-primary mb-4">Employee Management</h2>

        {/* ✅ ADD / UPDATE FORM */}
        <form onSubmit={handleSubmit} className="row g-3 align-items-end mb-4">
          {/* Name */}
          <div className="col-md-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={empName}
              onChange={(e) => setEmpName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="col-md-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={empEmail}
              onChange={(e) => setEmpEmail(e.target.value)}
            />
          </div>

          {/* Department */}
          <div className="col-md-3">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter department"
              value={empDepartment}
              onChange={(e) => setEmpDepartment(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="col-md-3 d-flex gap-2">
            <button
              type="submit"
              className={`btn ${editingId ? "btn-warning" : "btn-success"}`}
            >
              {editingId ? "Update" : "Add Employee"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* ✅ EMPLOYEE TABLE */}
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employeesList.length === 0 ? (
                <tr>
                  <td colSpan="5">No employees found</td>
                </tr>
              ) : (
                employeesList.map((emp) => (
                  <tr key={emp.employeeId}>
                    <td>{emp.employeeId}</td>
                    <td className="text-start">{emp.name}</td>
                    <td className="text-start">{emp.email}</td>
                    <td className="text-start">{emp.department}</td>

                    <td>
                      <div className="d-flex justify-content-center gap-3">
                        {/* Edit */}
                        <button
                          className="icon-btn edit-btn"
                          onClick={() => handleEdit(emp)}
                        >
                          <FaEdit />
                        </button>

                        {/* Delete */}
                        <button
                          className="icon-btn delete-btn"
                          onClick={() => handleDelete(emp.employeeId)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employees;
