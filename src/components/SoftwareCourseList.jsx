import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses, deleteCourse } from "../services/softwareCourseService";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

function SoftwareCourseList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let mounted = true;
    const loadCourses = async () => {
      try {
        const response = await getAllCourses();
        const data =
          response.data?.Rows?.length > 0
            ? response.data.Rows.map((row) => {
                const obj = {};
                response.data.Columns.forEach((col, index) => {
                  obj[col.ColumnName] = row[index];
                });
                return obj;
              })
            : response.data;
        if (mounted) setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadCourses();
    return () => (mounted = false);
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this course!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const Res = await deleteCourse(id);
      Swal.fire({
        title: "Deleted!",
        text: Res.data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setCourses((prev) => prev.filter((c) => c.CourseId !== id));
    } catch (error) {
      Swal.fire({ title: "Failed!", text: "Delete failed.", icon: "error" });
    }
  };

  // Function to print PDF
  const handlePrintPdf = (course) => {
    debugger;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Course Details", 20, 20);

    doc.setFontSize(12);
    doc.text(`ID: ${course.CourseId}`, 20, 40);
    doc.text(`Name: ${course.CourseName}`, 20, 50);
    doc.text(`Duration: ${course.Duration}`, 20, 60);
    doc.text(`Fees: ${course.Fees}`, 20, 70);
    doc.text(`Description: ${course.Description}`, 20, 80);

    doc.save(`Course_${course.CourseId}.pdf`);
  };

  const filteredCourses = courses.filter((c) =>
    c.CourseName?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">📘 Software Courses Master</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search course..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Duration</th>
            <th>Fees</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((c) => (
            <tr key={c.CourseId}>
              <td>{c.CourseId}</td>
              <td>{c.CourseName}</td>
              <td>{c.Duration}</td>
              <td>{c.Fees}</td>
              <td>
                <span
                  style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => navigate(`/software-course/${c.CourseId}`)}
                >
                  {c.Description}
                </span>
              </td>
              <td>
                <button className="btn btn-warning btn-sm me-2">Edit</button>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(c.CourseId)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handlePrintPdf(c)}
                >
                  Print PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SoftwareCourseList;
