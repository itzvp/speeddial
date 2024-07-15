// import type { NextApiRequest, NextApiResponse } from "next";
// import connectToDatabase from "../../lib/mongodb";
// import Employee, { IEmployee } from "../../models/Employee";

// interface Data {
//   success: boolean;
//   data?: IEmployee[]; // Adjust this based on your actual data structure
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { method, query, body } = req;

//   await connectToDatabase();

//   switch (method) {
//     case "GET":
//       try {
//         const employees = await Employee.find({});
//         res.status(200).json({ success: true, data: employees });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     case "POST":
//       try {
//         const employee = await Employee.create(body);
//         res.status(201).json({ success: true, data: [employee] });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     case "DELETE":
//       try {
//         const { id } = query; // Assuming employee ID is passed as a query parameter
//         if (!id) {
//           res.status(400).json({ success: false });
//           return;
//         }
//         await Employee.findByIdAndDelete(id);
//         res.status(200).json({ success: true });
//       } catch (error) {
//         console.error("Failed to delete employee:", error);
//         res.status(400).json({ success: false });
//       }
//       break;
//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../lib/mongodb";
import Employee, { IEmployee } from "../../models/Employee";

interface Data {
  success: boolean;
  data?: IEmployee[];
}

const cors = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query, body } = req;

  await connectToDatabase();

  cors(req, res, () => {
    switch (method) {
      case "GET":
        return getEmployees(req, res);
      case "POST":
        return createEmployee(req, res, body);
      case "DELETE":
        return deleteEmployee(req, res, query);
      default:
        res.status(400).json({ success: false });
        break;
    }
  });
}

const getEmployees = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

const createEmployee = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  body: any
) => {
  try {
    const employee = await Employee.create(body);
    res.status(201).json({ success: true, data: [employee] });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

const deleteEmployee = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  query: any
) => {
  try {
    const { id } = query;
    if (!id) {
      res.status(400).json({ success: false });
      return;
    }
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to delete employee:", error);
    res.status(400).json({ success: false });
  }
};
