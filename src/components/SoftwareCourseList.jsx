import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses, deleteCourse } from "../services/softwareCourseService";
import Swal from "sweetalert2";

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
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.CourseId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SoftwareCourseList;
