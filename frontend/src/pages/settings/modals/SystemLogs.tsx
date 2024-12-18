import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import SystemLogsTable from "./SystemLogsTable"; // Import the SystemLogsTable component

interface SystemLogsProps {
  showHeader?: boolean; // Optional prop to conditionally render the header
}

export default function SystemLogs({ showHeader = true }: SystemLogsProps) {
  // State to hold rows data
  const [rows, setRows] = React.useState([
    { date: "2023-10-01", user: "admin", action: "Logged in" },
    {
      date: "2023-10-02",
      user: "user1",
      action: "Created new case with ID: 12345 and assigned to user2",
    },
    { date: "2023-10-03", user: "admin", action: "Deleted user2" },
  ]);

  // Sample columns data
  const columns = [
    { id: "date", label: "Date", mWidth: 50 },
    { id: "user", label: "User", minWidth: 50 },
    { id: "action", label: "Action", minWidth: 100 },
  ];

  // Example of updating rows (you can replace this with your own logic to modify rows)
  const addRow = () => {
    setRows([
      ...rows,
      { date: "2023-12-12", user: "admin", action: "Added new log" },
    ]);
  };

  return (
    <Stack
      spacing={3}
      className="px-6"
      sx={{
        maxWidth: "500px",
        maxHeight: "600px",
      }}
    >
      {showHeader && (
        <Box>
          {/* Header */}
          <Stack>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              sx={{ color: "#0F2043" }}
            >
              System Logs
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#0F2043" }}>
              View changes made throughout the system here.
            </Typography>
          </Stack>
        </Box>
      )}

      {/* System Logs Table */}
      <Box className="flex justify-start items-start">
        <SystemLogsTable columns={columns} rows={rows} />
      </Box>
    </Stack>
  );
}
