import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import FilterButtons from "../../components/FilterButtons"; // Assuming these are your filters
import MailContainer from "../../components/MailContainer";
import { useState } from "react";

const Inbox = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const filters = ["All", "Unread", "Important"]; // Example filters

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <Box sx={{ marginX: 3, marginY: 2 }}>
      <Stack spacing={2}>
        {/* Filter Buttons */}
        <FilterButtons
          filters={filters}
          onFilterSelect={handleFilterSelect}
          selectedFilter={selectedFilter}
        />
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
            <MailContainer selectedFilter={selectedFilter} />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Inbox;
