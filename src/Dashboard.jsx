// import React, { useEffect, useState } from "react";
// import { getEmployees } from "../EmployeeService";

// function Dashboard() {
//   const [totalEmployees, setTotalEmployees] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getEmployees();
//       setTotalEmployees(data.length); // count employees
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>Total Employees: {totalEmployees}</p>
//     </div>
//   );
// }

// export default Dashboard;
