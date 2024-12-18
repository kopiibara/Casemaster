import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import SystemLogsTable from "./SystemLogsTable"; // Import the SystemLogsTable component
import axios from "axios"; // Import axios
import { format } from "date-fns"; // Import date-fns for date formatting

interface SystemLogsProps {
  showHeader?: boolean;
  userId?: number; // Make userId optional
}

export default function SystemLogs({
  showHeader = true,
  userId,
}: SystemLogsProps) {
  // State to hold rows data
  const [rows, setRows] = React.useState<any[]>([]); // We use 'any' type to allow flexibility
  const [loading, setLoading] = React.useState<boolean>(true); // Loading state
  const [error, setError] = React.useState<string | null>(null); // Error state

  React.useEffect(() => {
    const fetchSystemLogs = async () => {
      try {
        // Check if userId is provided to fetch either global or user-specific logs
        const url = userId
          ? `http://localhost:3000/api/auditlogs/${userId}` // For user-specific logs
          : `http://localhost:3000/api/auditlogs`; // For global logs

        const response = await axios.get(url);

        // Format the action_date before setting the rows
        const formattedData = response.data.map((log: any) => ({
          ...log,
          action_date: format(new Date(log.action_date), "yyyy-MM-dd HH:mm:ss"),
        }));

        setRows(formattedData);
      } catch (err) {
        setError("Failed to fetch system logs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSystemLogs();
  }, [userId]); // Make the effect dependent on userId

  const columns = [
    { id: "action_date", label: "Date", mWidth: 50 }, // Map to 'action_date'
    { id: "action", label: "Action", minWidth: 100 }, // Map to 'action'
  ];

  if (loading) {
    return (
      <Stack
        spacing={3}
        className="px-6"
        sx={{ maxWidth: "500px", maxHeight: "600px" }}
      >
        <Typography variant="h6" fontWeight={"bold"} sx={{ color: "#0F2043" }}>
          Loading system logs...
        </Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack
        spacing={3}
        className="px-6"
        sx={{ maxWidth: "500px", maxHeight: "600px" }}
      >
        <Typography variant="h6" fontWeight={"bold"} sx={{ color: "#0F2043" }}>
          {error}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      spacing={3}
      className="px-6"
      sx={{ maxWidth: "500px", maxHeight: "600px" }}
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
