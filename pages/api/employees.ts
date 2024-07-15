// import type { NextApiRequest, NextApiResponse } from "next";
// import connectToDatabase from "../../lib/mongodb"; // Adjusted import path
// import Employee, { IEmployee } from "../../models/Employee"; // Adjusted import path

// type Data = {
//   success: boolean;
//   data?: IEmployee[];
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { method } = req;

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
//         const employee = await Employee.create(req.body);
//         res.status(201).json({ success: true, data: [employee] });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     case "DELETE":
//       try {
//         await Employee.findByIdAndDelete(id); // Assuming your model supports findByIdAndDelete
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

// case "DELETE":
//       try {
//         await Employee.findByIdAndDelete(id); // Assuming your model supports findByIdAndDelete
//         res.status(200).json({ success: true });
//       } catch (error) {
//         console.error("Failed to delete employee:", error);
//         res.status(400).json({ success: false });
//       }
//       break;
//     default:
//       res.setHeader("Allow", ["DELETE"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }

import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../lib/mongodb"; // Adjusted import path
import Employee, { IEmployee } from "../../models/Employee"; // Adjusted import path

interface Data {
  success: boolean;
  data?: IEmployee[]; // Adjust this based on your actual data structure
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query, body } = req;

  await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        const employees = await Employee.find({});
        res.status(200).json({ success: true, data: employees });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const employee = await Employee.create(body);
        res.status(201).json({ success: true, data: [employee] });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const { id } = query; // Assuming employee ID is passed as a query parameter
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
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
