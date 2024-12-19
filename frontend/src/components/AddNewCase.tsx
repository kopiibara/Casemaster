import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CaseNoIcon from "@mui/icons-material/DescriptionOutlined";
import TitleIcon from "@mui/icons-material/TitleOutlined";
import PartyFilerIcon from "@mui/icons-material/PersonOutline";
import DocumentTypeIcon from "@mui/icons-material/CalendarTodayOutlined";
import AttachmentIcon from "@mui/icons-material/AttachFileOutlined";
import TagIcon from "@mui/icons-material/LabelOutlined";
import StatusIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

// Props for the EditCase component
interface EditCaseProps {
  onClose: () => void;
}

const AddNewCase: React.FC<EditCaseProps> = ({ onClose }) => {
  // Local state to manage the editable fields
  const [editableData, setEditableData] = useState<any>({});
  const [attachment, setAttachment] = useState<File | null>(null);

  // Handle input changes and update the editableData state
  const handleInputChange = (key: string, value: string) => {
    setEditableData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setAttachment(file);
      // Optionally, you can update the editableData with the file name or URL
      setEditableData((prev: any) => ({
        ...prev,
        file_url: file.name, // Save file name or path
      }));
    }
  };

  // Function to save the edited case data to the database via an API request
  const saveCaseData = async () => {
    try {
      // Assuming you have an API endpoint to handle case updates
      const response = await fetch("/api/update-case", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableData), // Sending the edited data
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Case updated successfully:", result);
        onClose(); // Close the dialog after successful update
      } else {
        console.error("Failed to update case:", result);
        alert("Failed to save changes.");
      }
    } catch (error) {
      console.error("Error updating case:", error);
      alert("Error saving data. Please try again.");
    }
  };

  return (
    <Box sx={{ rounded: "0.5rem" }}>
      <Stack className="gap-4 p-6">
        {/* Header */}
        <Stack direction={"row"} className="flex items-center">
          <Typography variant="h5" className="text-[#0F2043]">
            Edit Case
          </Typography>
          <Box flexGrow={1}></Box>
          <IconButton onClick={onClose}>
            <CloseIcon className="text-[#0F2043]" />
          </IconButton>
        </Stack>
        <Divider className="mb-2 w-[calc(100%-0.8rem)]" />

        {/* Content */}
        <Box>
          <Stack className="mt-2 gap-7">
            {editableData ? (
              <>
                {/* Case No */}
                <Stack
                  direction={"row"}
                  spacing={2}
                  className="gap-3 text-[#8992A3] items-center"
                >
                  <CaseNoIcon className="w-20 text-[#8992A3]" />
                  <TextField
                    label="Case No."
                    fullWidth
                    size="small"
                    variant="outlined"
                  />
                </Stack>

                {/* Title */}
                <Stack
                  direction={"row"}
                  spacing={2}
                  className="gap-3 text-[#8992A3] items-center"
                >
                  <TitleIcon className="w-20 text-[#8992A3]" />
                  <TextField
                    size="small"
                    label="Title"
                    fullWidth
                    variant="outlined"
                  />
                </Stack>

                {/* Party Filer */}
                <Stack
                  direction={"row"}
                  spacing={2}
                  className="gap-3 text-[#8992A3] items-center"
                >
                  <PartyFilerIcon className="w-20" />
                  <TextField
                    label="Party Filer"
                    size="small"
                    fullWidth
                    variant="outlined"
                  />
                </Stack>

                {/* Document Type */}
                <Stack
                  direction={"row"}
                  spacing={2}
                  className="gap-3 text-[#8992A3] items-center"
                >
                  <DocumentTypeIcon className="w-20" />
                  <TextField
                    label="Document Type"
                    size="small"
                    fullWidth
                    variant="outlined"
                  />
                </Stack>

                {/* Attachment */}
                <Stack
                  direction={"row"}
                  spacing={2}
                  className="gap-3 text-[#8992A3] items-center"
                >
                  <AttachmentIcon className="w-20" />
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      color: "#808080",
                      borderColor: "#808080",
                      borderRadius: "0.5rem",
                      height: "2rem",
                      width: "8rem",
                      marginBottom: "0.5rem",
                      fontSize: "0.8rem",
                      textTransform: "none",
                    }}
                  >
                    Choose File
                    <input
                      type="file"
                      hidden
                      onChange={handleAttachmentChange}
                    />
                  </Button>
                  {editableData.file_url && (
                    <Typography>{editableData.file_url}</Typography>
                  )}
                </Stack>

                {/* Tag */}
                <Stack
                  direction={"row"}
                  spacing={2}
                  className="gap-3 text-[#8992A3] items-center"
                >
                  <TagIcon className="w-20" />
                  <TextField
                    label="Tag"
                    size="small"
                    fullWidth
                    variant="outlined"
                  />
                </Stack>

                {/* Status */}
                <Stack
                  direction={"row"}
                  spacing={2}
                  className="gap-3 text-[#8992A3] items-center"
                >
                  <StatusIcon className="w-20" />
                  <TextField
                    label="Status"
                    size="small"
                    fullWidth
                    variant="outlined"
                  />
                </Stack>
              </>
            ) : (
              <Typography>No data available</Typography>
            )}
            <Stack
              direction={"row"}
              spacing={2}
              className="flex items-center justify-end"
            >
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
                  fontSize: "0.8rem",
                  textTransform: "none",

                  "&:hover": {
                    backgroundColor: "rgba(46,73,213,0.1)",
                  },
                }}
                onClick={onClose} // Close without saving
              >
                Cancel
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
                  fontSize: "0.8rem",
                  textTransform: "none",
                }}
                onClick={saveCaseData} // Save changes
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default AddNewCase;
