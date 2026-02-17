// src/EmployeeService.js
import axios from "axios";

// Base URL hard-coded for localhost (hot code)
const BASE_URL = "http://localhost:5292";

const API_ENDPOINTS = {
  EMPLOYEE: {
    GET_ALL: `${BASE_URL}/api/Employee`,
    CREATE: `${BASE_URL}/api/Employee`,
    UPDATE: `${BASE_URL}/api/Employee`,
    DELETE: (id) => `${BASE_URL}/api/Employee/${id}`,
  },
};
// Get all employees
export const getEmployees = async () => {
  debugger;
  const response = await axios.get(API_ENDPOINTS.EMPLOYEE.GET_ALL);
  return response.data;
};

// Create employee
export const createEmployee = async (emp) => {
  const response = await axios.post(API_ENDPOINTS.EMPLOYEE.CREATE, emp);
  return response.data;
};

// Update employee
export const updateEmployee = async (emp) => {
  debugger;
  const response = await axios.put(API_ENDPOINTS.EMPLOYEE.UPDATE, emp);
  return response.data;
};

// Delete employee by ID
export const deleteEmployee = async (id) => {
  const response = await axios.delete(API_ENDPOINTS.EMPLOYEE.DELETE(id));
  return response.data;
};