import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Stack, Typography, Box, BoxProps } from "@mui/material";
import FolderIcon from "../../assets/folder-icon.svg";
import DotRecordIcon from "@mui/icons-material/FiberManualRecord";

interface FoldersProps extends BoxProps {
  folderName: string;
  folderContent: string;
  fileSize: string;
}

const Folders: React.FC<FoldersProps> = ({
  folderName,
  folderContent,
  fileSize,
}) => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleNavigate = () => {
    navigate(`/attachments/FolderPage`, { state: { folderName } }); // Pass folderName in state
  };

  return (
    <Box className="w-full flex-grow">
      <Button
        variant="contained"
        disableElevation
        onClick={handleNavigate} // Add onClick handler here
        sx={{
          backgroundColor: "#EAEEF6",
          color: "#FFFFFF",
          borderRadius: "0.5rem",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#DCE5F6",
          },
        }}
      >
        <Stack
          direction={"row"}
          spacing={3}
          className="flex justify-center items-center py-5 px-10"
        >
          <img
            src={FolderIcon}
            alt="Folder Icon"
            style={{ width: 56, height: "auto" }}
          />

          <Stack className="flex justify-start items-start">
            {/* Folder Name */}
            <Typography
              variant="subtitle2"
              fontWeight={"bold"}
              className="text-[#0F2043]"
            >
              {folderName}
            </Typography>

            <Stack
              direction={"row"}
              spacing={1}
              className="flex justify-start items-center"
            >
              {/* Folder Content */}
              <Typography variant="body2" className="text-[#0F2043]">
                {folderContent}
              </Typography>
              <DotRecordIcon
                sx={{ width: "0.4rem", height: "0.4rem", color: "#0F2043" }}
              />
              {/* File Size */}
              <Typography variant="body2" className="text-[#0F2043] ">
                {fileSize}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Button>
    </Box>
  );
};

export default Folders;
