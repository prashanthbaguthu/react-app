// File: ./pages/AddCTC.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AddCTC() {
  const [clients, setClients] = useState([]);
  const [criticalQualities, setCriticalQualities] = useState([]);

  const [formData, setFormData] = useState({
    clientId: "",
    process: "",
    ccq: "",
    ctcName: "",
    audit: "",
    priority: "",
    description: "",
  });

  useEffect(() => {
    setClients([
      { id: "66", name: "CVR" },
      { id: "85", name: "HEALIX" },
      { id: "110", name: "One Oncology" },
      { id: "79", name: "SPIRE" },
      { id: "111", name: "Spire SIS" },
    ]);

    setCriticalQualities([
      { id: "1", name: "CTC" },
      { id: "2", name: "CTQ" },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted! Check console for values.");
  };

  // Styles
  const labelStyle = { color: "#555", fontWeight: "bold" }; // Light dark labels
  const redStar = <span className="text-danger">*</span>; // Red asterisk

  return (
    <div className="container mt-4">
      <h5>Critical To Client/Quality Master</h5>

      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label" style={labelStyle}>
              Client {redStar}
            </label>
            <select
              className="form-select"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Client --</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label" style={labelStyle}>
              Process {redStar}
            </label>
            <input
              type="text"
              className="form-control"
              name="process"
              value={formData.process}
              onChange={handleChange}
              placeholder="Enter process"
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label" style={labelStyle}>
              Critical Client Quality (CCQ) {redStar}
            </label>
            <select
              className="form-select"
              name="ccq"
              value={formData.ccq}
              onChange={handleChange}
              required
            >
              <option value="">-- Select CCQ --</option>
              {criticalQualities.map((cq) => (
                <option key={cq.id} value={cq.name}>
                  {cq.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label" style={labelStyle}>
              CTC/CTQ Name {redStar}
            </label>
            <input type="text"
              className="form-control"
              name="ctcName"
              value={formData.ctcName}
              onChange={handleChange}
              placeholder="Enter CTC/CTQ Name"
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label" style={labelStyle}>
              Audit
            </label>
            <input
              type="text"
              className="form-control"
              name="audit"
              value={formData.audit}
              onChange={handleChange}
              placeholder="Enter audit info"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label" style={labelStyle}>
              Priority
            </label>
            <input
              type="text"
              className="form-control"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              placeholder="Enter priority"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="row mb-3">
          <div className="col-md-12">
            <label className="form-label" style={labelStyle}>
              Description
            </label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows={3}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-start">
          <button
            type="submit"
            className="btn me-3"
            style={{ backgroundColor: "#007bff", color: "white" }} 
          >
            Save
          </button>
          <Link to="/ctc-list" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default AddCTC;
