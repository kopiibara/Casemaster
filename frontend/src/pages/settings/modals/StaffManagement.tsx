import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import DirectoryTable from "./DirectoryTable";
import ArchivedTable from "./ArchivedTable";

const StaffManagement = () => {
  const [value, setValue] = React.useState("directory"); // Update to match the tab values

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      className="px-6"
      sx={{
        minHeight: "500px",
        width: "500px",
        maxWidth: "500px",
        maxHeight: "600px",
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Stack>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            sx={{ color: "#0F2043" }}
          >
            Staff Management
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#0F2043" }}>
            View and manage your staff’s details here.{" "}
          </Typography>
        </Stack>
        {/* Staff List */}
        <Stack>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Directory"
                  value="directory" // Ensure this matches the state value
                  sx={{ textTransform: "none" }}
                />
                <Tab
                  label="Archived"
                  value="archived" // Ensure this matches the state value
                  sx={{ textTransform: "none" }}
                />
              </TabList>
            </Box>
            <TabPanel value="directory" sx={{ paddingX: 0 }}>
              <DirectoryTable />
            </TabPanel>
            <TabPanel value="archived" sx={{ paddingX: 0 }}>
              <ArchivedTable />
            </TabPanel>
          </TabContext>
        </Stack>
      </Stack>
    </Box>
  );
};

export default StaffManagement;
