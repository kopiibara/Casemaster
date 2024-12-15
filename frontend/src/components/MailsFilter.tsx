import React from "react";
import { Box, Button } from "@mui/material";

interface FilterButtonsProps {
  filters: string[];
  onFilterSelect: (filter: string) => void;
  selectedFilter: string;
}

const MailsFilterButtons: React.FC<FilterButtonsProps> = ({
  filters,
  onFilterSelect,
  selectedFilter,
}) => {
  if (!filters || filters.length === 0) {
    return null; // Return null if filters are not defined or empty
  }

  return (
    <Box display="flex" gap={2}>
      {filters.map((filter, index) => (
        <Button
          key={index}
          variant={selectedFilter === filter ? "contained" : "outlined"}
          onClick={() => onFilterSelect(filter)}
        >
          {filter}
        </Button>
      ))}
    </Box>
  );
};

export default MailsFilterButtons;
