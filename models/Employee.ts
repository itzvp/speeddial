import mongoose, { Document, Model, Schema } from "mongoose";

interface IEmployee extends Document {
  name: string;
  email: string;
  phone: string;
}

const EmployeeSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const Employee: Model<IEmployee> =
  mongoose.models.Employee ||
  mongoose.model<IEmployee>("Employee", EmployeeSchema);

export default Employee;
export type { IEmployee };
