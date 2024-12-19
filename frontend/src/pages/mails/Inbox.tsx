import { Box, Button, Stack } from "@mui/material";
import MailsFilterButtons from "../../components/MailsFilter";
import MailContainer from "../../components/MailContainer";
import { useState } from "react";

const Inbox = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [refreshKey, setRefreshKey] = useState<number>(0); // Key to trigger refresh
  const filters = ["All", "Unread", "Important"]; // Example filters

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment key to trigger refresh
  };

  return (
    <Box sx={{ marginX: 3, marginY: 2 }}>
      <Stack spacing={2}>
        {/* Filter Buttons */}
        <MailsFilterButtons
          filters={filters}
          onFilterSelect={handleFilterSelect}
          selectedFilter={selectedFilter}
        />
        {/* Refresh Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleRefresh}
          sx={{ alignSelf: "flex-start" }}
        >
          Refresh Emails
        </Button>
        {/* Main Content Area */}
        <Box
          sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%" }}
        >
          {/* Mail Container */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <MailContainer selectedFilter={selectedFilter} refreshKey={refreshKey} />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Inbox;
