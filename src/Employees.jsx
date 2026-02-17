import React, { useState, useEffect } from "react";
import { getEmployees } from "../EmployeeService"; // adjust path if needed

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees(); // now returns array
        setEmployees(data); // set state
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]); // fallback to empty array
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} - {emp.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;
