// CountryScreen.jsx

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import Swal from "sweetalert2";

import {
  getCountries,
  getStates,
  getDistricts,
  getMandals,
  getVillages,
  addCountry,
  deleteCountry,
} from "../services/countryService";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function CountryScreen() {
  // ------------------------------
  // Dropdown data
  // ------------------------------
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);

  // ------------------------------
  // Selected IDs
  // ------------------------------
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [mandalId, setMandalId] = useState("");
  const [villageId, setVillageId] = useState("");

  // ------------------------------
  // Table data
  // ------------------------------
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // ------------------------------
  // Add Country form state
  // ------------------------------
  const [newCountryName, setNewCountryName] = useState("");
  const [newCountryCode, setNewCountryCode] = useState("");

  // ------------------------------
  // Load Countries on Page Load
  // ------------------------------
  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    debugger;
    try {
      const res = await getCountries();
      setCountries(res.data);
      setTableData(res.data);
      setFilteredData(res.data);
    } catch {
      toast.error("Countries not loading");
    }
  };

  // ------------------------------
  // Dropdown Handlers
  // ------------------------------

  const handleCountryChange = async (selected) => {
    const id = selected?.value || "";
    setCountryId(id);
    setStates([]);
    setDistricts([]);
    setMandals([]);
    setVillages([]);

    setStateId("");
    setDistrictId("");
    setMandalId("");
    setVillageId("");

    if (id) {
      const res = await getStates(id);
      setStates(res.data);
    }
  };

  const handleStateChange = async (selected) => {
    const id = selected?.value || "";
    setStateId(id);

    setDistricts([]);
    setMandals([]);
    setVillages([]);

    setDistrictId("");
    setMandalId("");
    setVillageId("");

    if (id) {
      const res = await getDistricts(id);
      setDistricts(res.data);
    }
  };

  const handleDistrictChange = async (selected) => {
    const id = selected?.value || "";
    setDistrictId(id);

    setMandals([]);
    setVillages([]);

    setMandalId("");
    setVillageId("");

    if (id) {
      const res = await getMandals(id);
      setMandals(res.data);
    }
  };

  const handleMandalChange = async (selected) => {
    const id = selected?.value || "";
    setMandalId(id);

    setVillages([]);
    setVillageId("");

    if (id) {
      const res = await getVillages(id);
      setVillages(res.data);
    }
  };

  const handleVillageChange = (selected) => {
    setVillageId(selected?.value || "");
  };

  // ------------------------------
  // Search Button Filter
  // ------------------------------
  const handleSearch = () => {
    let filtered = tableData;

    if (countryId) {
      filtered = filtered.filter((c) => c.countryId === countryId);
    }

    setFilteredData(filtered);
  };

  // ------------------------------
  // Add Country
  // ------------------------------
  const handleAddCountry = async () => {
    if (!newCountryName || !newCountryCode) { // ! All Nagitive value will be valid (false "" 0  (empty string)null undefined NaN)
      toast.error("Please enter both Country Name and Code");
      return;
    }

    try {
      const res = await addCountry({
        countryName: newCountryName,
        countryCode: newCountryCode,
      });
      toast.success(res.data.message);
      setNewCountryName("");
      setNewCountryCode("");
      loadCountries();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error inserting country");
    }
  };

  // ------------------------------
  // Edit Country (Only Form Fill)
  // ------------------------------
  const handleEditCountry = (country) => {
debugger;
    setNewCountryName(country.countryName);
    setNewCountryCode(country.countryCode);
  };

  // ------------------------------
  // Delete Country
  // ------------------------------
  const handleDeleteCountry = async (id) => {
    // SweetAlert Confirmation Popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this country!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "Cancel",
    });

    // If user clicks Cancel
    if (!result.isConfirmed) return;

    try {
      debugger;
      const Res = await deleteCountry(id);

      // Success Popup
      Swal.fire({
        title: "Deleted!",
        text: Res.data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      loadCountries();
    } catch (error) {
      // Error Popup
      Swal.fire({
        title: "Failed!",
        text: "Country delete failed.",
        icon: "error",
      });
    }
  };

  // ------------------------------
  // React Select Options Mapper
  // ------------------------------
  const mapOptions = (data, valueKey, labelKey) =>
    data.map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
    }));

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ------------------------------
          Add Country Section
      ------------------------------ */}
      <h4>Add New Country</h4>

      <div className="d-flex flex-row flex-wrap gap-3 align-items-end mb-4">
        <div style={{ flex: "1 1 180px" }}>
          <label>Country Name</label>
          <input
            type="text"
            className="form-control"
            value={newCountryName}
            onChange={(e) => setNewCountryName(e.target.value)}
            placeholder="Enter Country Name"
          />
        </div>

        <div style={{ flex: "1 1 120px" }}>
          <label>Country Code</label>
          <input
            type="text"
            className="form-control"
            value={newCountryCode}
            onChange={(e) => setNewCountryCode(e.target.value)}
            placeholder="Enter Code"
          />
        </div>

        <div style={{ flex: "0 0 120px" }}>
          <button className="btn btn-success w-100" onClick={handleAddCountry}>
            Add Country
          </button>
        </div>
      </div>

      {/* ------------------------------
          Dropdown Filters
      ------------------------------ */}
      <div className="d-flex flex-row flex-wrap gap-3 align-items-end mb-4">
        {/* Country */}
        <div style={{ flex: "1 1 180px" }}>
          <label>Country</label>
          <Select
            options={mapOptions(countries, "countryId", "countryName")}
            onChange={handleCountryChange}
            placeholder="Select Country"
            isClearable
          />
        </div>

        {/* State */}
        <div style={{ flex: "1 1 180px" }}>
          <label>State</label>
          <Select
            options={mapOptions(states, "stateId", "stateName")}
            onChange={handleStateChange}
            placeholder="Select State"
            isClearable
            isDisabled={!states.length}
          />
        </div>

        {/* District */}
        <div style={{ flex: "1 1 180px" }}>
          <label>District</label>
          <Select
            options={mapOptions(districts, "districtId", "districtName")}
            onChange={handleDistrictChange}
            placeholder="Select District"
            isClearable
            isDisabled={!districts.length}
          />
        </div>

        {/* Mandal */}
        <div style={{ flex: "1 1 180px" }}>
          <label>Mandal</label>
          <Select
            options={mapOptions(mandals, "mandalId", "mandalName")}
            onChange={handleMandalChange}
            placeholder="Select Mandal"
            isClearable
            isDisabled={!mandals.length}
          />
        </div>

        {/* Village */}
        <div style={{ flex: "1 1 180px" }}>
          <label>Village</label>
          <Select
            options={mapOptions(villages, "villageId", "villageName")}
            onChange={handleVillageChange}
            placeholder="Select Village"
            isClearable
            isDisabled={!villages.length}
          />
        </div>

        {/* Search Button */}
        <div style={{ flex: "0 0 120px" }}>
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* ------------------------------
          Country Table
      ------------------------------ */}
      <h4>Country List</h4>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Country Name</th>
            <th>Country Code</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((c) => (
            <tr key={c.countryId}>
              <td>{c.countryId}</td>
              <td>{c.countryName}</td>
              <td>{c.countryCode}</td>

              {/* Edit + Delete */}
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditCountry(c)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteCountry(c.countryId)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CountryScreen;
