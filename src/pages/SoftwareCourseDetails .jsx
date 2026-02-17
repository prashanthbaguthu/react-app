import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/softwareCourseService";

function SoftwareCourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await getCourseById(id);
        setCourse(res.data.course || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!course) return <div className="text-danger">Course not found</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-primary">📘 Course Details</h2>
      <div className="card p-4 shadow mt-3">
        <p><b>ID:</b> {course.CourseId}</p>
        <p><b>Name:</b> {course.CourseName}</p>
        <p><b>Duration:</b> {course.Duration}</p>
        <p><b>Fees:</b> ₹{course.Fees}</p>
        <p><b>Description:</b> {course.Description}</p>
      </div>
    </div>
  );
}

export default SoftwareCourseDetails;
