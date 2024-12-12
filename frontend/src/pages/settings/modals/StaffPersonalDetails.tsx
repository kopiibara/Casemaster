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
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MenuItem from "@mui/material/MenuItem";

import SystemLogs from "./SystemLogs";

// Define props for the component
interface StaffPersonalDetailsProps {
  avatar: string;
  fullName: string;
  status: string;
  onClose: () => void; // Function to handle closing
}

const position = [
  {
    value: "branch-clerk",
    label: "Branch Clerk",
  },
  {
    value: "staff",
    label: "Staff",
  },
];

const accountStatus = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
  {
    value: "pending",
    label: "Pending",
  },
];

const StaffPersonalDetails: React.FC<StaffPersonalDetailsProps> = ({
  avatar,
  fullName,
  status,
  onClose,
}) => {
  // Track profile status with state
  const [profileStatus, setProfileStatus] = useState<string>(status);

  const lastName = fullName.split(" ").pop();

  useEffect(() => {
    setProfileStatus(status); // Update status if prop changes
  }, [status]);

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
          <Box></Box>
          <IconButton onClick={onClose}>
            <CancelOutlinedIcon className="text-[#517FD3]" />
          </IconButton>
        </Stack>

        {/* Staff Details */}
        <Avatar src={avatar} alt={fullName} sx={{ width: 96, height: 96 }} />

        {/* Profile Details*/}
        <Stack spacing={2.5}>
          <TextField
            label="Full Name"
            value={fullName}
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
            value={lastName + "@example.com"}
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
            value={"+63 | " + "09xxxxxxxx"}
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
        {/* Full Name */}

        <Divider />
        <Stack spacing={2.5}>
          {/* Branch Position */}
          <TextField
            id="outlined-select-currency"
            select
            label="Branch Position"
            defaultValue="branch-clerk"
            size="small"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#2E49D5",
                borderColor: "#2E49D5",
                paddingX: "0.1rem",
                paddingTop: "0.2rem",
                "& input": {
                  color: "#2E49D5",
                  paddingX: "0.5rem ",
                },
                "& fieldset": {
                  borderColor: "#868FA0",
                },
                "&:hover fieldset": {
                  borderColor: "#2E49D5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2E49D5",
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
          >
            {position.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Profile Status */}
          <TextField
            id="outlined-select-currency"
            select
            label="Profile Status"
            value="active" // Controlled value
            size="small"
            sx={{
              width: "100%",
              color: "#2E49D5",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#2E49D5",
                borderColor: "#2E49D5",
                paddingX: "0.1rem",
                paddingTop: "0.2rem",
                "& input": {
                  color: "#2E49D5",
                  paddingX: "0.5rem ",
                },
                "& fieldset": {
                  borderColor: "#868FA0",
                },
                "&:hover fieldset": {
                  borderColor: "#2E49D5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2E49D5",
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
          >
            {accountStatus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Stack direction={"row"} spacing={1}>
            <Box flexGrow={1} />
            <Button
              variant="outlined"
              disableElevation
              sx={{
                color: "#2E49D5",
                borderColor: "#2E49D5",
                borderRadius: "0.5rem",
                height: "2rem",
                width: "6rem",
                marginBottom: "0.5rem",
                fontSize: "0.7rem",
                textTransform: "none",

                "&:hover": {
                  backgroundColor: "rgba(46,73,213,0.1)",
                },
              }}
            >
              Discard
            </Button>
            <Button
              variant="contained"
              disableElevation
              sx={{
                color: "white",
                borderColor: "#2E49D5",
                borderRadius: "0.5rem",
                height: "2rem",
                width: "6rem",
                marginBottom: "0.5rem",
                fontSize: "0.7rem",
                textTransform: "none",
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle1">{lastName}'s System Logs</Typography>
          <SystemLogs showHeader={false} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default StaffPersonalDetails;
