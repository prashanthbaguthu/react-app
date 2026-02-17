import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Add this at the top
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Inside component
  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    setErrors({});

    let tempErrors = {};
    if (!username.trim()) tempErrors.username = "Username is required";
    if (!password) tempErrors.password = "Password is required";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5292/api/Account/login",
        { Username: username, Password: password }
      );

      const result = response.data;

      if (result.status === true) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("loginUser", username);
         navigate("/dashboard");
        window.location.reload();

      } else {
        setErrors({ server: result.message });
      }
    } catch (err) {
      setErrors({ server: "Unable to connect — Web API not running" });
    }
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #1d2671, #c33764)",
        padding: "20px",
      }}
    >
      {/* Glass Effect Card */}
      <div
        className="card border-0 shadow-lg overflow-hidden"
        style={{
          width: "900px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
        }}
      >
        <div className="row g-0">

          {/* LEFT BRAND PANEL */}
          <div
            className="col-md-5 d-flex flex-column justify-content-center text-white p-5"
            style={{
              background: "linear-gradient(180deg, #0f2027, #203a43, #2c5364)",
            }}
          >
            <h2 className="fw-bold mb-3" style={{ fontSize: "32px" }}>
              Welcome Back 👋
            </h2>

            <p style={{ fontSize: "15px", opacity: 0.9 }}>
              Login securely to access your dashboard and manage your account
              with ease.
            </p>

            <div className="mt-4">
              <small style={{ opacity: 0.8 }}>
                Powered by React + ASP.NET Core
              </small>
            </div>
          </div>

          {/* RIGHT LOGIN PANEL */}
          <div className="col-md-7 bg-white p-5">
            <h3 className="text-center fw-bold mb-4">
              User Login
            </h3>

            {/* Server Error */}
            {errors.server && (
              <div className="alert alert-danger text-center py-2">
                {errors.server}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Username */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Username
                </label>

                <input
                  className={`form-control form-control-lg ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-4 position-relative">
                <label className="form-label fw-semibold">
                  Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control form-control-lg ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: "45px" }}
                />

                {/* Eye Icon */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "70%",
                    right: "15px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#555",
                    fontSize: "1.2rem",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>

                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-dark btn-lg w-100"
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                  fontWeight: "600",
                }}
              >
                Sign In
              </button>
            </form>

            {/* Footer */}
            <div
              className="text-center text-muted mt-4"
              style={{ fontSize: "13px" }}
            >
              © {new Date().getFullYear()} Baguthu Prashanth. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
