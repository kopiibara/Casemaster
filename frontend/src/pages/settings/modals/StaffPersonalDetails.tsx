import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Stack,
  Typography,
  IconButton,
  TextField,
  Divider,
  Button,
  Switch, // Import the Switch component
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MenuItem from "@mui/material/MenuItem";

import SystemLogs from "./SystemLogs";

interface EmployeeProfile {
  user_id: number;
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
  pin: string;
  isApproved: boolean;
}

// Define props for the component based on EmployeeProfile
interface StaffPersonalDetailsProps {
  employee: EmployeeProfile;  // Pass the entire EmployeeProfile object as a prop
  onClose: () => void;        // Function to handle closing
}


const StaffPersonalDetails: React.FC<StaffPersonalDetailsProps> = ({
  employee,   // Receive the employee object
  onClose,
}) => {

  // Add state for the toggle button
  const [isApproved, setIsApproved] = useState<boolean>(employee.isApproved);


  const lastName = employee.name.split(" ").pop();

  // Handle toggle change
  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsApproved(event.target.checked);
  };

  return (
    <Box className="p-6">
      <Stack spacing={4}>
        {/* Header */}
        <Stack direction="row" alignItems={"center"}>
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            sx={{ color: "#0F2043" }}
          >
            {lastName}'s Personal Details
          </Typography>
          <Box flexGrow={1} />
          <IconButton onClick={onClose}>
            <CancelOutlinedIcon className="text-[#517FD3]" />
          </IconButton>
        </Stack>

        {/* Staff Details */}
        <Stack direction="column" alignItems="center" justifyContent="center">
  {/* Avatar */}
  <Avatar src={employee.image} alt={employee.name} sx={{ width: 96, height: 96 }} />

  {/* IOS-style toggle switch and text */}
  <Stack direction="row" alignItems="center" justifyContent="center" sx={{ marginTop: 2 }} gap={2}>
    {/* Toggle switch */}
    <Switch
          checked={isApproved}
              onChange={handleToggleChange}
           color="primary"
           size="small"
             sx={{
            transform: "scale(1.5)",  // Increase the size of the switch
             "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#4caf50",  // Set the color to #4caf50 when active
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#4caf50",  // Set the track to green when active
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#868FA0",  // Set the default track color when inactive
    },
  }}
/>


    {/* Status text with green glow when active */}
    <Typography
      variant="subtitle1"
      sx={{
        color: isApproved ? "#4caf50" : "#868FA0",  // Change color based on approval
        textShadow: isApproved ? "0 0 10px #4caf50, 0 0 20px #4caf50, 0 0 30px #4caf50" : "none", // Green glow when active
        display: "inline-block",  // Ensure the text stays inline with the switch
      }}
    >
      {isApproved ? "Active" : "Pending"}
    </Typography>
  </Stack>
</Stack>


        {/* Profile Details */}
        <Stack spacing={2.5}>
          <TextField
            label="Full Name"
            value={employee.name}
            disabled
            size="small"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#2E49D5",
                paddingX: "0.5rem",
                "& input": {
                  color: "#2E49D5",
                  paddingX: "0.5rem ",
                },
                "& fieldset": {
                  borderColor: "#868FA0",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#868FA0",
                fontSize: "0.9rem",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2E49D5",
              },
            }}
          />

          {/* Personal Email */}
          <TextField
            label="Personal Email"
            value={employee.email}
            disabled
            size="small"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#2E49D5",
                paddingX: "0.5rem",
                "& input": {
                  color: "#2E49D5",
                  paddingX: "0.5rem ",
                },
                "& fieldset": {
                  borderColor: "#868FA0",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#868FA0",
                fontSize: "0.9rem",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2E49D5",
              },
            }}
          />

          {/* Phone Number */}
          <TextField
            label="Phone Number"
            value={employee.phone}
            disabled
            size="small"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#2E49D5",
                paddingX: "0.5rem",
                "& input": {
                  color: "#2E49D5",
                  paddingX: "0.5rem ",
                },
                "& fieldset": {
                  borderColor: "#868FA0",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#868FA0",
                fontSize: "0.9rem",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2E49D5",
              },
            }}
          />
        </Stack>

        <Divider />

        <Stack spacing={1}>
          <Typography variant="subtitle1">{lastName}'s System Logs</Typography>
          <SystemLogs showHeader={false} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default StaffPersonalDetails;
