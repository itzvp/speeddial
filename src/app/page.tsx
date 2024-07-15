// // import Image from "next/image";

// // export default function Home() {
// //   return <main></main>;
// // }
// "use client";
// import React, { useState, useEffect } from "react";
// import { Button } from "@mui/material";
// import EmployeeForm from "../components/EmployeeForm";

// interface Employee {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
// }

// const Home: React.FC = () => {
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [open, setOpen] = useState(false);

//   const fetchEmployees = async () => {
//     const res = await fetch("/api/employees");
//     const data = await res.json();
//     setEmployees(data.data);
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
//       <h1 className="text-4xl my-8">Zapillo Demo</h1>
//       <Button variant="contained" color="primary" onClick={handleOpen}>
//         Add Employee
//       </Button>
//       <EmployeeForm
//         open={open}
//         handleClose={handleClose}
//         fetchEmployees={fetchEmployees}
//       />
//       <div className="mt-8">
//         {employees.map((employee) => (
//           <div key={employee._id} className="p-4 bg-gray-800 rounded-lg m-2">
//             <h2 className="text-xl">{employee.name}</h2>
//             <p>Email: {employee.email}</p>
//             <p>Phone: {employee.phone}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import EmployeeForm from "../components/EmployeeForm";

interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

const Home: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [open, setOpen] = useState(false);

  // const fetchEmployees = async () => {
  //   const res = await fetch("/api/employees");
  //   const data = await res.json();
  //   setEmployees(data.data);
  // };

  const fetchEmployees = async () => {
    const res = await fetch("/api/employees");
    if (res.ok) {
      const data = await res.json();
      setEmployees(data.data);
    } else {
      console.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-4xl my-8">Zapillo Demo</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Employee
      </Button>
      <EmployeeForm
        open={open}
        handleClose={handleClose}
        fetchEmployees={fetchEmployees}
      />
      <div className="mt-8">
        {employees.map((employee) => (
          <div key={employee._id} className="p-4 bg-gray-800 rounded-lg m-2">
            <h2 className="text-xl">{employee.name}</h2>
            <p>Email: {employee.email}</p>
            <p>Phone: {employee.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
