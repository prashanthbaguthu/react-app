import axios from "axios";

const API_URL = "http://localhost:5292/api/SoftwareCourse";

export const getAllCourses = async () => axios.get(API_URL);

export const getCourseById = async (id) => axios.get(`${API_URL}/${id}`);

export const addCourse = async (courseData) => axios.post(API_URL, courseData);

export const updateCourse=async (courseData)=>axios.put(`${API_URL}/${courseData.CourseId}`,courseData);

export const deleteCourse = async (id) => axios.delete(`${API_URL}/${id}`);
