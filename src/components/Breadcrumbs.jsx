import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();

  const addMaster = ['/employees', '/ctc-list', '/user-accounts'];

  const extraPath = addMaster.includes(location.pathname) ? ['master'] : [];

  const pathnames = [
    ...extraPath,
    ...location.pathname.split("/").filter(x => x)
  ];

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb-card">
        <li>
          <Link to="/" className="breadcrumb-link">Home</Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          const displayName = name
            .replace(/-/g, " ")
            .replace(/\b\w/g, l => l.toUpperCase());

          return (
            <li key={routeTo} className={isLast ? "current" : ""}>
              {isLast ? (
                <span className="breadcrumb-current">{displayName}</span>
              ) : (
                <Link to={routeTo} className="breadcrumb-link">
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
