import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist prashanth.</p>
      <Link to="/">Go back to Dashboard</Link> 
    </div>
  );
};

export default ErrorPage;
