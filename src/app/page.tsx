"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import EmployeeForm from "../components/EmployeeForm";
import OpenIconSpeedDial from "@/components/speedDial";

interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

const Home: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [open, setOpen] = useState(false);

  const handleDelete = (id: string) => {
    axios
      .delete(`api/employees?id=${id}`)
      .then((res: { data: any }) => {
        console.log(res.data);
        fetchEmployees();
      })
      .catch((error: any) => {
        console.error("Failed to delete employee:", error);
      });
  };

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
      <h1 className="text-6xl my-8">Add Employee</h1> {/* Adjusted font size */}
      <EmployeeForm
        open={open}
        handleClose={handleClose}
        fetchEmployees={fetchEmployees}
      />
      <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {employees.map((employee) => (
          <div key={employee._id} className="w-full mx-auto">
            <Card
              sx={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                padding: 2,
                color: "#000",
              }}
              className="border border-gray-300 rounded-lg"
            >
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {employee.name}
                </Typography>
                <Typography variant="body2" component="p" sx={{ marginTop: 1 }}>
                  Email: {employee.email}
                </Typography>
                <Typography variant="body2" component="p" sx={{ marginTop: 1 }}>
                  Phone: {employee.phone}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(employee._id)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
      <OpenIconSpeedDial handleOpen={handleOpen} />
    </div>
  );
};

export default Home;
