import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Input } from "@progress/kendo-react-inputs";
import "./CTCList.css";

function CTCList() {
  const [ctcData, setCtcData] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [process, setProcess] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [globalSearch, setGlobalSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setClients([
      { id: "66", name: "CVR" },
      { id: "85", name: "HEALIX" },
      { id: "110", name: "One Oncology" },
      { id: "79", name: "SPIRE" },
      { id: "111", name: "Spire SIS" },
    ]);

    const initialData = [
      { id: 1, name: "CTC 1", description: "Desc 1", clientId: "66", process: "Proc A" },
      { id: 2, name: "CTC 2", description: "Desc 2", clientId: "85", process: "Proc B" },
      { id: 3, name: "CTC 3", description: "Desc 3", clientId: "66", process: "Proc C" },
    ];

    setCtcData(initialData);
    setFilteredData(initialData);
  }, []);

  const handleSearch = () => {
    const filtered = ctcData.filter(
      (item) =>
        (selectedClient === "" || item.clientId === selectedClient) &&
        (process === "" || item.process.toLowerCase().includes(process.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  const handleAddCTC = () => navigate("/add-ctc");

  const handleGlobalSearch = (e) => {
    const value = e.target.value;
    setGlobalSearch(value);

    const filtered = ctcData.filter((item) => {
      const clientName = clients.find(c => c.id === item.clientId)?.name || "";
      return (
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        clientName.toLowerCase().includes(value.toLowerCase()) ||
        item.process.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-4 fw-bold">Critical To Client/Quality Master</h5>

      {/* Filters Card */}
      <div className="card shadow-sm mb-3 p-3">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label text-secondary fw-semibold">
              Client <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <option value="">-- Select --</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label text-secondary fw-semibold">
              Process <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={process}
              onChange={(e) => setProcess(e.target.value)}
              placeholder="Enter process name"
            />
          </div>

          <div className="col-md-4 d-flex justify-content-end gap-2">
            <button className="btn btn-success" onClick={handleSearch}>
              Search
            </button>
            <button className="btn btn-primary" onClick={handleAddCTC}>
              Add CTC / CTQ
            </button>
          </div>
        </div>
      </div>

      {/* Global Search */}
      <div className="d-flex justify-content-end mb-2">
        <Input
          placeholder="Search..."
          value={globalSearch}
          onChange={handleGlobalSearch}
          style={{ width: "250px" }}
        />
      </div>

      {/* Kendo Grid */}
 <div className="card shadow-sm p-3">
  <Grid
    style={{
      height: "400px",
      backgroundColor: "#f8f9fa", // Grid background
    }}
    data={filteredData}
    pageable
    sortable
    filterable
    resizable
    className="k-grid-striped"
  >
    <GridColumn field="id" title="ID" width="70px" />
    <GridColumn field="name" title="CTC/CTQ Name" />
    <GridColumn field="description" title="Description" />
    <GridColumn
      field="clientId"
      title="Client"
      cell={(props) => {
        const client = clients.find(c => c.id === props.dataItem.clientId);
        return <td>{client ? client.name : ""}</td>;
      }}
    />
    <GridColumn field="process" title="Process" />
  </Grid>
</div>


    </div>
  );
}

export default CTCList;
