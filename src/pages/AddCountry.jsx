import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCountry() {
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const navigate = useNavigate();

  const API_URL = "https://localhost:5001/api/Country";

  // Add Country
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(API_URL, {
      countryName,
      countryCode,
    });

    alert("Country Added Successfully");
    navigate("/countries");
  };

  return (
    <div style={styles.container}>
      <h2>➕ Add Country</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Country Name"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Country Code"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.saveBtn}>
          Save Country
        </button>
      </form>
    </div>
  );
}

export default AddCountry;

const styles = {
  container: {
    width: "40%",
    margin: "auto",
    marginTop: "50px",
  },

  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
  },

  saveBtn: {
    padding: "10px",
    background: "blue",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
