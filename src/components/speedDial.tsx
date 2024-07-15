// import * as React from "react";
// import Box from "@mui/material/Box";
// import SpeedDial from "@mui/material/SpeedDial";
// import SpeedDialIcon from "@mui/material/SpeedDialIcon";
// import SpeedDialAction from "@mui/material/SpeedDialAction";
// import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
// import SaveIcon from "@mui/icons-material/Save";
// import PrintIcon from "@mui/icons-material/Print";
// import ShareIcon from "@mui/icons-material/Share";
// import EditIcon from "@mui/icons-material/Edit";

// const actions = [
//   { icon: <FileCopyIcon />, name: "Add Employee" },
//   //   { icon: <SaveIcon />, name: "Save" },
//   //   { icon: <PrintIcon />, name: "Print" },
//   //   { icon: <ShareIcon />, name: "Share" },
// ];

// export default function OpenIconSpeedDial() {
//   return (
//     <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
//       <SpeedDial
//         ariaLabel="SpeedDial openIcon example"
//         sx={{ position: "absolute", bottom: 16, left: 16 }}
//         icon={<SpeedDialIcon openIcon={<EditIcon />} />}
//       >
//         {actions.map((action) => (
//           <SpeedDialAction
//             key={action.name}
//             icon={action.icon}
//             tooltipTitle={action.name}
//           />
//         ))}
//       </SpeedDial>
//     </Box>
//   );
// }

import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import EditIcon from "@mui/icons-material/Edit";

const actions = [
  { icon: <FileCopyIcon />, name: "Add Employee" },
  //   { icon: <SaveIcon />, name: "Save" },
  //   { icon: <PrintIcon />, name: "Print" },
  //   { icon: <ShareIcon />, name: "Share" },
];

interface OpenIconSpeedDialProps {
  handleOpen: () => void;
}

export default function OpenIconSpeedDial({
  handleOpen,
}: OpenIconSpeedDialProps) {
  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: "fixed", bottom: 16, left: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.name === "Add Employee" ? handleOpen : undefined}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
