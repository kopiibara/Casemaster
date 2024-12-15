import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Box, Stack, IconButton, Button } from "@mui/material";

import TableComponent from "../../components/TableComponent";

import BackIcon from "@mui/icons-material/ArrowBack";
import SubMenuIcon from "@mui/icons-material/FiberManualRecord";

const FolderPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate hook
  const folderName = location.state?.folderName || "Untitled Folder"; // Default title if folderName is not passed

  const handleBack = () => {
    navigate("/attachments/AllAttachments"); // Navigate to AllAttachments page
  };

  const tableHeadData = ["File Name", "Owner", "Date Added"];
  const tableBodyData = [
    {
      "File Name": "12345.pdf",
      Owner: "Gwyneth Uy",
      "Date Added": "2024-12-01 12:00 PM",
    },
  ];

  const buttonData = [
    "Preview",
    "Download",
    "Rename",
    "Move to",
    "See Details",
  ];

  const popoverContent = (
    <Box style={{ padding: "1rem" }}>
      <Stack direction={"column"} spacing={1}>
        {buttonData.map((text) => (
          <Button
            key={text}
            variant="contained"
            color="primary"
            disableElevation
            sx={{
              textTransform: "none",
              backgroundColor: "transparent",
              color: "#0F2043",
              justifyContent: "flex-start",
              "&:hover": {
                backgroundColor: "#DCE5F6",
              },
            }}
          >
            <SubMenuIcon
              sx={{ width: "0.5rem", height: "0.5rem", marginRight: "0.5rem" }}
              className={"text-[#0F2043]"}
            />
            {text}
          </Button>
        ))}
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ marginX: 3 }}>
      <Stack spacing={3}>
        {/* Title */}
        <Stack
          direction={"row"}
          spacing={2}
          className="flex justify-start items-center"
        >
          <IconButton onClick={handleBack}>
            {" "}
            {/* Add onClick handler */}
            <BackIcon fontSize="small" className="text-[#0F2043]" />
          </IconButton>

          <Typography
            variant="h5"
            sx={{ marginBottom: 2 }}
            className="text-[#0F2043]"
          >
            {folderName}
          </Typography>
        </Stack>

        {/* Content */}
        <Box>
          <TableComponent
            tableHeadData={tableHeadData}
            tableBodyData={tableBodyData}
            popoverContent={popoverContent}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default FolderPage;
