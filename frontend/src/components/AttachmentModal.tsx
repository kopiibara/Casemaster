import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Divider,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import * as pdfjsLib from "pdfjs-dist";
import axios from "axios";
import AlertSnackbar from "./AlertComponent"; // Import the reusable AlertSnackbar component

interface Attachment {
  name: string;
  size: string;
  type: string;
  url: string;
}

interface AttachmentModalProps {
  open: boolean;
  onClose: () => void;
  attachments: Attachment[];
  selectedAttachment: Attachment | null;
}

const AttachmentModal: React.FC<AttachmentModalProps> = ({
  open,
  onClose,
  attachments,
  selectedAttachment,
}) => {
  const [currentAttachment, setCurrentAttachment] = useState<Attachment | null>(
    selectedAttachment
  );
  const [caseNo, setCaseNo] = useState<string>("");
  const [caseTitle, setCaseTitle] = useState<string>("");
  const [partyFiler, setPartyFiler] = useState<string>("");
  const [caseType, setCaseType] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  // Error and Success States
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Validation State
  const [errors, setErrors] = useState({
    caseNo: "",
    caseTitle: "",
    partyFiler: "",
    caseType: "",
  });

  useEffect(() => {
    setCurrentAttachment(selectedAttachment);
  }, [selectedAttachment]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tags")
      .then((response) => setAvailableTags(response.data))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  const validateFields = () => {
    const caseNoRegex = /^[0-9]+(-[0-9]+)?$/;
    const newErrors = {
      caseNo: caseNoRegex.test(caseNo) ? "" : "Invalid Case No. format.",
      caseTitle: caseTitle.trim() ? "" : "Case Title is required.",
      partyFiler: partyFiler.trim() ? "" : "Party Filer is required.",
      caseType: caseType ? "" : "Case Type is required.",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSave = async () => {
    if (!validateFields() || !currentAttachment) return;

    try {
      // Step 1: Upload the file to Google Drive
      const uploadResponse = await axios.post(
        "http://localhost:3000/api/upload-to-drive",
        {
          fileName: currentAttachment.name,
          fileType: currentAttachment.type,
          fileUrl: currentAttachment.url,
        }
      );

      if (uploadResponse.status !== 200) {
        setErrorMessage("Failed to upload file to Google Drive.");
        return;
      }

      const { webContentLink } = uploadResponse.data;

      // Step 2: Save the case log with the file URL
      const data = {
        caseNo,
        caseTitle,
        partyFiler,
        caseType,
        tags,
        file_url: webContentLink, // Add the Google Drive file URL
      };

      const saveResponse = await axios.post(
        "http://localhost:3000/api/caselogs",
        data
      );

      if (saveResponse.status === 201) {
        setSuccessMessage("Case Details logged successfully!");
        setErrorMessage(null);

        // Clear the form fields
        setCaseNo("");
        setCaseTitle("");
        setPartyFiler("");
        setCaseType(null);
        setTags([]);

        onClose();
      } else {
        setErrorMessage("Failed to save case log. Please try again.");
      }
    } catch (error) {
      console.error("Error during save process:", error);
      setErrorMessage("An error occurred while saving the case log.");
    }
  };

  const handleDiscard = () => {
    // Clear all form fields and close the modal
    setCaseNo("");
    setCaseTitle("");
    setPartyFiler("");
    setCaseType(null);
    setTags([]);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
          height: "80%",
          margin: "auto",
          marginTop: "5%",
          backgroundColor: "white",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          overflow: "hidden",
        }}
      >
        {/* Modal Content Container */}
        <React.Fragment>
          {/* Left Side - Form */}
          <Box
            sx={{
              width: "30%",
              borderRight: "1px solid #ddd",
              paddingRight: 2,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Import to Case Logs
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box component="form" noValidate autoComplete="off" sx={{ my: 4 }}>
              {/* Input Fields */}
              <TextField
                label="Case No."
                required
                fullWidth
                value={caseNo}
                onChange={(e) => setCaseNo(e.target.value)}
                sx={{ mb: 2 }}
                error={!!errors.caseNo}
                helperText={errors.caseNo}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Case Title"
                required
                fullWidth
                value={caseTitle}
                onChange={(e) => setCaseTitle(e.target.value)}
                sx={{ mb: 2 }}
                error={!!errors.caseTitle}
                helperText={errors.caseTitle}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Party Filer"
                required
                fullWidth
                value={partyFiler}
                onChange={(e) => setPartyFiler(e.target.value)}
                sx={{ mb: 2 }}
                error={!!errors.partyFiler}
                helperText={errors.partyFiler}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Case Type"
                placeholder="Select a case type"
                required
                select
                fullWidth
                value={caseType || ""}
                onChange={(e) => setCaseType(e.target.value)}
                sx={{ mb: 2 }}
                error={!!errors.caseType}
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem disabled value="">
                  Choose case type
                </MenuItem>
                <MenuItem value="Civil Case">Civil Case</MenuItem>
                <MenuItem value="Criminal Case">Criminal Case</MenuItem>
                <MenuItem value="Special Case">Special Case</MenuItem>
                <MenuItem value="Motions">Motions</MenuItem>
                <MenuItem value="Incidents">Incidents</MenuItem>
                <MenuItem value="Pleadings">Pleadings</MenuItem>
              </TextField>
              <Autocomplete
                multiple
                freeSolo
                options={availableTags}
                value={tags}
                onChange={(event, newValue) => {
                  const uniqueTags = Array.from(
                    new Set(newValue.map((tag) => tag.trim()))
                  ).filter((tag) => tag);
                  setTags(uniqueTags);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    fullWidth
                    sx={{ mb: 2 }}
                    helperText="Add tags by typing and pressing Enter"
                    InputLabelProps={{ shrink: true }} // Keeps the label on top
                  />
                )}
                filterOptions={(options, { inputValue }) => {
                  const filtered = options.filter((option) =>
                    option.toLowerCase().includes(inputValue.toLowerCase())
                  );

                  if (
                    inputValue.trim() &&
                    !options.includes(inputValue.trim())
                  ) {
                    filtered.push(inputValue.trim());
                  }

                  return filtered;
                }}
              />

              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button
                  variant="outlined"
                  onClick={handleDiscard}
                  sx={{
                    color: "#0F2043",
                    borderColor: "#0F2043",
                    borderRadius: "0.3rem",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#0B1730",
                      backgroundColor: "rgba(15, 32, 67, 0.1)",
                    },
                  }}
                >
                  Discard
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{
                    textTransform: "none",
                    borderRadius: "0.3rem",
                    "&:hover": {
                      backgroundColor: "#003366",
                    },
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Right Side - PDF Viewer */}
          <Box sx={{ width: "70%", paddingLeft: 2 }}>
            {currentAttachment &&
            currentAttachment.type === "application/pdf" ? (
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}
              >
                <Viewer fileUrl={currentAttachment.url} />
              </Worker>
            ) : (
              <Typography
                variant="body1"
                sx={{ textAlign: "center", marginTop: 4 }}
              >
                No PDF file selected.
              </Typography>
            )}
          </Box>
        </React.Fragment>
      </Box>
    </Modal>
  );
};

export default AttachmentModal;
