import React from "react";

import { Stack, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddNewCase = () => {
  return (
    <Box>
      {/* Header */}
      <Stack direction={"row"}>
        <Typography variant="h5" className="text-[#0F2043]">
          Add New Case
        </Typography>
        <Box flexGrow={1}></Box>
        <IconButton>
          <CloseIcon className="text-[#0F2043]" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default AddNewCase;
