// File Name: SoftwareCourseList.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses, deleteCourse } from "../services/softwareCourseService";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

function SoftwareCourseList() {
  const navigate = useNavigate();

  // Columns you want to hide
  const hiddenColumns = ["Message", "Status"];

  // Dynamic Columns & Rows State
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  // Search State
  const [searchText, setSearchText] = useState("");

  // ===================================================
  // Load Courses from Backend API
  // ===================================================
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await getAllCourses();

        if (response.data?.columns && response.data?.rows) {
          setColumns(response.data.columns);
          setRows(response.data.rows);
        }
      } catch (error) {
        console.error("Error loading courses:", error);
      }
    };

    loadCourses();
  }, []);

  // ===================================================
  // Delete Course Function
  // ===================================================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this course!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCourse(id);

      Swal.fire("Deleted!", "Course deleted successfully.", "success");

      // Remove deleted row from UI
      setRows((prev) => prev.filter((r) => r[0] !== id));
    } catch {
      Swal.fire("Failed!", "Delete failed.", "error");
    }
  };

  // ===================================================
  // Print PDF Function
  // ===================================================
  const handlePrintPdf = (row) => {
    const doc = new jsPDF();
    doc.text("Course Details", 20, 20);

    columns.forEach((col, index) => {
      if (!hiddenColumns.includes(col.columnName)) {
        doc.text(`${col.columnName}: ${row[index]}`, 20, 40 + index * 10);
      }
    });

    doc.save("Course_Details.pdf");
  };

  // ===================================================
  // Search Filter
  // ===================================================
  const filteredRows = rows.filter((row) =>
    row.some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Visible columns only
  const visibleColumns = columns.filter(
    (col) => !hiddenColumns.includes(col.columnName)
  );

  return (
    <div className="container mt-4 user-select-none">
      <h2 className="text-primary mb-3 user-select-none">📘 Software Courses Master</h2>

      {/* Search Box */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search course..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Scroll Container */}
      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          overflowX: "auto",
          border: "1px solid #ddd",
        }}
      >
        {/* Table */}
        <table
          className="table table-bordered text-center mb-0 user-select-none"
          style={{
            minWidth: `${visibleColumns.length * 180}px`,
            whiteSpace: "nowrap",
          }}
        >
          {/* Sticky Header */}
          <thead
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              backgroundColor: "#212229",
              color: "white",
            }}
          >
            <tr>
              {visibleColumns.map((col) => (
                <th key={col.columnName}>{col.columnName}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => {
                    const colName = columns[cellIndex]?.columnName;

                    // Skip hidden columns
                    if (hiddenColumns.includes(colName)) return null;

                    return (
                      <td key={cellIndex}>
                        {/* Clickable Description Link */}
                        {colName === "Description" ? (
                          <span
                            className="text-primary fw-bold"
                            style={{
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                            onClick={() =>
                              navigate(`/software-course/${row[0]}`)
                            }
                          >
                            {cell}
                          </span>
                        ) : (
                          cell
                        )}
                      </td>
                    );
                  })}

                  {/* Actions */}
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(row[0])}
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handlePrintPdf(row)}
                    >
                      Print PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={visibleColumns.length + 1}>
                  <strong>No Courses Found</strong>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SoftwareCourseList;
