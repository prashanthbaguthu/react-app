import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaSun, FaMoon } from "react-icons/fa";
import "./TopNavbar.css";
import profileImg from "../assets/profile.png";

function TopNavbar({ darkMode, setDarkMode, sidebarHover }) {
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const menuRoutes = [
   
    { name: "Employees", path: "/employees" },
    { name: "CTC / CTQ List", path: "/ctc-list" },
    { name: "Add CTC", path: "/add-ctc" },
    { name: "User Accounts", path: "/user-accounts" },
    { name: "Image Upload", path: "/imageupload" },
    { name: "Customer", path: "/CustomerList" },
  ];

  const filteredMenus = menuRoutes.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    setSearchText("");
    setShowSearch(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("loginUser");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <nav
      className="top-navbar"
      style={{
        left: sidebarHover ? "220px" : "60px",
        width: sidebarHover ? "calc(100% - 220px)" : "calc(100% - 60px)",
      }}
    >
      {/* Left Logo */}
      <div className="navbar-left">
        <h3 className="logo">React Application</h3>
      </div>

      {/* Center Menu */}
      <div className="navbar-center">
        {menuRoutes.map((item, index) => (
          <Link key={index} to={item.path} className="nav-link">
            {item.name}
          </Link>
        ))}
      </div>

      {/* Right Icons */}
      <div className="navbar-right">
        {/* Search */}
        <FaSearch
          className="icon"
          onClick={() => setShowSearch(!showSearch)}
        />

        {showSearch && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus
            />
            {searchText && (
              <div className="search-dropdown">
                {filteredMenus.length > 0 ? (
                  filteredMenus.map((item, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleSelect(item.path)}
                    >
                      {item.name}
                    </div>
                  ))
                ) : (
                  <div className="dropdown-item no-result">No Screen Found</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Notification */}
        <FaBell className="icon" />
        {/* Theme Toggle */}
        <span className="icon" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </span>

        {/* Profile Section */}
        <div className="profile">
          <div className="profile-info">
            {/* ✅ Profile Image */}
            <img src={profileImg} alt="Profile" className="profile-img" />

            <div>
              <p className="username">prashanth</p>
              <small className="role">DotNet + React</small>
            </div>
          </div>

          {/* Hover Card */}
          <div className="profile-card">
            <div className="card-user-info">
              {/* ✅ Profile Image */}
              <img src={profileImg} alt="Profile" className="profile-img" />

              <div>
                <p className="username">prashanth</p>
                <small className="role">DotNet + React</small>
              </div>
            </div>

            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNavbar;
