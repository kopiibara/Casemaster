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
  Switch,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import axios from "axios";
import SystemLogs from "./SystemLogs"; // Import the modified SystemLogs

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

interface StaffPersonalDetailsProps {
  employee: EmployeeProfile;
  onClose: () => void;
  onStatusChange: () => void;
}

const StaffPersonalDetails: React.FC<StaffPersonalDetailsProps> = ({
  employee,
  onClose,
  onStatusChange,
}) => {
  const [isApproved, setIsApproved] = useState<boolean>(employee.isApproved);
  const lastName = employee.name.split(" ").pop();

  const handleToggleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newApprovalStatus = event.target.checked;
    setIsApproved(newApprovalStatus);

    try {
      await axios.put("http://localhost:3000/api/approve-account", {
        userId: employee.user_id,
        isApproved: newApprovalStatus,
      });
      onStatusChange();
    } catch (error) {
      console.error("Failed to update approval status", error);
      setIsApproved(employee.isApproved);
    }
  };

  return (
    <Box className="p-6">
      <Stack spacing={4}>
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

        <Stack direction="column" alignItems="center" justifyContent="center">
          <Avatar
            src={employee.image}
            alt={employee.name}
            sx={{ width: 96, height: 96 }}
          />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: 2 }}
            gap={2}
          >
            <Switch
              checked={isApproved}
              onChange={handleToggleChange}
              color="primary"
              size="small"
              sx={{
                transform: "scale(1.5)",
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#4caf50",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#4caf50",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "#868FA0",
                },
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                color: isApproved ? "#4caf50" : "#868FA0",
                textShadow: isApproved
                  ? "0 0 10px #4caf50, 0 0 20px #4caf50, 0 0 30px #4caf50"
                  : "none",
                display: "inline-block",
              }}
            >
              {isApproved ? "Active" : "Pending"}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={2.5}>
          <TextField
            label="Full Name"
            value={employee.name}
            disabled
            size="small"
            sx={{ width: "100%" }}
          />
          <TextField
            label="Personal Email"
            value={employee.email}
            disabled
            size="small"
            sx={{ width: "100%" }}
          />
          <TextField
            label="Phone Number"
            value={employee.phone}
            disabled
            size="small"
            sx={{ width: "100%" }}
          />
        </Stack>

        <Divider />

        <Stack spacing={1}>
          <Typography variant="subtitle1">{lastName}'s System Logs</Typography>
          <SystemLogs showHeader={false} userId={employee.user_id} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default StaffPersonalDetails;
