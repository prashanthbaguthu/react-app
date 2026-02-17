import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditCountry() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const API_URL = "https://localhost:5001/api/Country";

  // Load Country Data
  useEffect(() => {
    fetchCountry();
  }, []);

  const fetchCountry = async () => {
    const res = await axios.get(`${API_URL}/${id}`);
    setCountryName(res.data.countryName);
    setCountryCode(res.data.countryCode);
  };

  // Update Country
  const handleUpdate = async (e) => {
    e.preventDefault();

    await axios.put(API_URL, {
      countryId: id,
      countryName,
      countryCode,
    });

    alert("Country Updated Successfully");
    navigate("/countries");
  };

  return (
    <div style={styles.container}>
      <h2>✏️ Edit Country</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="text"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.updateBtn}>
          Update Country
        </button>
      </form>
    </div>
  );
}

export default EditCountry;

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

  updateBtn: {
    padding: "10px",
    background: "orange",
    border: "none",
    cursor: "pointer",
  },
};
