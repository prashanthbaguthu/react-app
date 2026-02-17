import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Hot-coded endpoints
const API_ENDPOINTS = {
  ACCOUNT: {
    REGISTER: "http://localhost:5292/api/Account/Insert_UserAccounts",
    LOGIN: "http://localhost:5292/api/Account/login",
  },
};

function UserRegister() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Strong password validation
  const isStrongPassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim()) return toast.error("Username is required");
    if (!password.trim()) return toast.error("Password is required");
    if (!isStrongPassword(password)) {
      return toast.error(
        "Password must be 8+ characters and include uppercase, lowercase, number, and special character"
      );
    }

    try {
      const response = await axios.post(API_ENDPOINTS.ACCOUNT.REGISTER, {
        userName,
        password,
      });

      console.log("Hot API URL:", API_ENDPOINTS.ACCOUNT.REGISTER);
      console.log("Response:", response.data);

      if (response.data.status) {
        toast.success(response.data.message);
        setUserName("");
        setPassword("");
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.error("API service is not running or URL is wrong");
      console.error(error);
    }
  };

  return (
    <div className="container mt-3">
      <h3>User Registration</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <small className="text-muted">
          Password must be 8+ characters with uppercase, lowercase, number & special character
        </small>

        <br /><br />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default UserRegister;
