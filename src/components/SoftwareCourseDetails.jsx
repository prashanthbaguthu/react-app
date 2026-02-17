import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import courses from "../components/courseData"; // local data
import { FaClock, FaRupeeSign, FaPhone, FaEnvelope } from "react-icons/fa";

function SoftwareCourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const courseId = parseInt(id, 10);
    const foundCourse = courses.find(c => c.CourseId === courseId);
    setCourse(foundCourse || null);
  }, [id]);

  if (!course)
    return <div className="text-danger text-center mt-5 display-6">Course not found</div>;

  return (
    <div className="container my-5">
      {/* Back button */}
      <button 
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate("/SoftwareCourseList")}
      >
        ← Back to Courses
      </button>

      {/* Course Name Card */}
      <div className="card mb-4 shadow-sm border-0 rounded bg-primary text-white p-4 text-center">
        <h1 className="display-4 fw-bold">{course.CourseName}</h1>
        <p className="lead">{course.Tagline}</p>
      </div>

      {/* Individual Info Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-3 h-100">
            <FaClock className="text-primary me-2"/> <b>Duration:</b> {course.Duration}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3 h-100">
            <FaRupeeSign className="text-success me-2"/> <b>Fees:</b> ₹{course.Fees}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3 h-100">
            <b>Description:</b> {course.Description}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3 h-100">
            <b>Tagline:</b> {course.Tagline}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3 h-100">
            <b>Contact Name:</b> {course.ContactName}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3 h-100">
            <FaPhone className="me-2"/> {course.ContactPhone}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3 h-100">
            <FaEnvelope className="me-2"/> {course.ContactEmail}
          </div>
        </div>
      </div>

      {/* Highlights Card */}
      <div className="card mb-4 shadow-sm p-4">
        <h3 className="text-success mb-3">Why Choose This Course?</h3>
        <div className="d-flex flex-wrap gap-2">
          {course.Highlights.map((h, index) => (
            <span key={index} className="badge bg-success text-white p-2 fs-6 shadow-sm">
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Enrollment Card */}
      <div className="card shadow-lg p-4 bg-warning text-dark rounded">
        <h3 className="mb-3">Enroll Now</h3>
        <p className="mb-3">Contact {course.ContactName} to enroll or click the button below.</p>
        <button 
          className="btn btn-primary btn-lg"
          onClick={() => alert(`You have enrolled in ${course.CourseName}!`)}
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}

export default SoftwareCourseDetails;
