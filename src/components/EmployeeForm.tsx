import React, { useState, ChangeEvent } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface EmployeeFormProps {
  open: boolean;
  handleClose: () => void;
  fetchEmployees: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  open,
  handleClose,
  fetchEmployees,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = async () => {
    const res = await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone }),
    });
    if (res.ok) {
      fetchEmployees();
      handleClose();
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={handleChange(setEmail)}
        />
        <TextField
          margin="dense"
          label="Phone"
          type="text"
          fullWidth
          value={phone}
          onChange={handleChange(setPhone)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;
