// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Scheduler from "./pages/Scheduler";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import CTCList from "./pages/CTCList";
import AddCTC from "./pages/AddCTC";
import Login from "./pages/Login";
import ImageUpload from "./pages/ImageUpload";
import CountryScreen from "./pages/CountryScreen";
import AddCountry from "./pages/AddCountry";
import EditCountry from "./pages/EditCountry";

import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";
import EditCustomer from "./components/EditCustomer";
import UserRegistration from "./components/UserRegistration";
import TopNavbar from "./components/TopNavbar";
import Breadcrumbs from "./components/Breadcrumbs";
import Footer from "./components/Footer";
import SoftwareCourseList from "./components/SoftwareCourseList";
import SoftwareCourseDetails from "./components/SoftwareCourseDetails";

import { FaUser, FaUsers, FaExclamationCircle, FaImage, FaFlag, FaCogs } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [masterOpen, setMasterOpen] = useState(false);
  const [sidebarHover, setSidebarHover] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <div className="d-flex">
          {/* SIDEBAR */}
          <div
            className="bg-dark text-white p-2"
            style={{
              width: sidebarHover ? "220px" : "60px",
              transition: "width 0.3s",
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              overflowY: "auto",
              zIndex: 2000,
            }}
            onMouseEnter={() => setSidebarHover(true)}
            onMouseLeave={() => setSidebarHover(false)}
          >
            <ul className="nav flex-column mt-3">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  🏠 <span className={sidebarHover ? "" : "d-none"}>Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  <FaCogs className="me-1" />
                  <span className={sidebarHover ? "" : "d-none"}>Operations</span>
                </Link>
              </li>

              <li className="nav-item mt-2">
                <button
                  className="btn btn-dark w-100 text-start"
                  onClick={() => setMasterOpen(!masterOpen)}
                >
                  📁 <span className={sidebarHover ? "" : "d-none"}>Master</span>
                </button>

                {masterOpen && sidebarHover && (
                  <ul className="nav flex-column ms-3">
                    <li>
                      <Link to="/employees" className="nav-link text-white">
                        <FaUsers className="me-1" /> Employees
                      </Link>
                    </li>
                    <li>
                      <Link to="/ctc-list" className="nav-link text-white">
                        <FaExclamationCircle className="me-1" /> CTC / CTQ List
                      </Link>
                    </li>
                    <li>
                      <Link to="/user-accounts" className="nav-link text-white">
                        👤 User Accounts
                      </Link>
                    </li>
                    <li>
                      <Link to="/imageupload" className="nav-link text-white">
                        <FaImage className="me-1" /> Image Upload
                      </Link>
                    </li>
                    <li>
                      <Link to="/scheduler" className="nav-link text-white">
                        📅 Scheduler
                      </Link>
                    </li>
                    <li>
                      <Link to="/CustomerList" className="nav-link text-white">
                        <FaUser style={{ marginRight: "5px" }} /> Customer List
                      </Link>
                    </li>
                    <li>
                      <Link to="/sales-dashboard" className="nav-link text-white">
                        <FaUser style={{ marginRight: "5px" }} /> FlipCard
                      </Link>
                    </li>
                    <li>
                      <Link to="/countries" className="nav-link text-white">
                        <FaFlag style={{ marginRight: "5px" }} /> Country
                      </Link>
                    </li>
                    <li>
                      <Link to="/SoftwareCourseList" className="nav-link text-white">
                        <FaFlag style={{ marginRight: "5px" }} /> Software Courses
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>

          {/* MAIN CONTENT */}
          <div
            className="flex-grow-1 d-flex flex-column"
            style={{
              marginLeft: sidebarHover ? "220px" : "60px",
              transition: "margin-left 0.3s",
              backgroundColor: darkMode ? "#121212" : "#ffffff",
              color: darkMode ? "white" : "black",
              minHeight: "100vh",
            }}
          >
            <TopNavbar darkMode={darkMode} setDarkMode={setDarkMode} sidebarHover={sidebarHover} />

            <div className="p-4 flex-grow-1 d-flex flex-column" style={{ marginTop: "70px" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Breadcrumbs />
              </div>

              <div className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/ctc-list" element={<CTCList />} />
                  <Route path="/add-ctc" element={<AddCTC />} />
                  <Route path="/user-accounts" element={<UserRegistration />} />
                  <Route path="/imageupload" element={<ImageUpload />} />
                  <Route path="/scheduler" element={<Scheduler />} />
                  <Route path="/CustomerList" element={<CustomerList />} />
                  <Route path="/add" element={<AddCustomer />} />
                  <Route path="/edit/:id" element={<EditCustomer />} />
                  <Route path="/sales-dashboard" element={<Dashboard />} />
                  <Route path="/countries" element={<CountryScreen />} />
                  <Route path="/add-country" element={<AddCountry />} />
                  <Route path="/edit-country/:id" element={<EditCountry />} />
                  <Route path="/SoftwareCourseList" element={<SoftwareCourseList />} />
                  <Route path="/software-course/:id" element={<SoftwareCourseDetails />} />
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
