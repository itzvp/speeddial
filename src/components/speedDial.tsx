import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import EditIcon from "@mui/icons-material/Edit";

const actions = [{ icon: <FileCopyIcon />, name: "Add Employee" }];

interface OpenIconSpeedDialProps {
  handleOpen: () => void;
}

export default function OpenIconSpeedDial({
  handleOpen,
}: OpenIconSpeedDialProps) {
  return (
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          zIndex: 1000,
          minWidth: 48,
        }}
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
