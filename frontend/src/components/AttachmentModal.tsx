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
  Alert,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import * as pdfjsLib from "pdfjs-dist";
import axios from "axios";

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
    tags: "", // Added tags to error state
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

  // Function to check if the case number exists by making an API call
  const checkCaseNoExists = async (caseNo: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/check-case-existence/${caseNo}`
      );
      return response.data.exists; // Assuming the response contains { exists: true } or { exists: false }
    } catch (error) {
      console.error("Error checking case existence:", error);
      return false; // If the API fails, assume the case number doesn't exist
    }
  };

  const validateFields = async () => {
    const caseNoRegex = /^[0-9]+(-[0-9]+)?$/; // Case No. can have numbers and hyphens
    const nonNumbersRegex = /^(?!\d+$).+/; // Allows numbers but not numbers only

    // Define the newErrors object and include the 'tags' field
    const newErrors = {
      caseNo: caseNoRegex.test(caseNo) ? "" : "Invalid Case No. format.",
      caseTitle: nonNumbersRegex.test(caseTitle.trim())
        ? ""
        : "Case Title cannot be numbers only.",
      partyFiler: nonNumbersRegex.test(partyFiler.trim())
        ? ""
        : "Party Filer cannot be numbers only.",
      caseType: caseType ? "" : "Case Type is required.",
      tags: tags.length > 0 ? "" : "Tags are required.", // Ensure tags are validated
    };

    // Check if the Case No. already exists
    const caseExists = await checkCaseNoExists(caseNo);
    if (caseExists) {
      newErrors.tags = "Case No. already exists. Please add tags to proceed.";
      if (!tags.length) {
        newErrors.tags = "Tags are required for an existing Case No."; // Handle case for missing tags
      }
    }

    // Update the errors state
    setErrors(newErrors);

    // Return whether all fields are valid
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSave = async () => {
    // Perform validation first
    if (!(await validateFields()) || !currentAttachment) {
      setErrorMessage("Please correct the highlighted errors.");
      return; // Exit early if validation fails
    }

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

      // Step 2: Save the case log with the file URL and file name
      const data = {
        caseNo,
        caseTitle,
        partyFiler,
        caseType,
        tags, // Now this is correctly typed
        file_url: webContentLink, // Add the Google Drive file URL
        file_name: currentAttachment.name, // Include file name
      };

      const saveResponse = await axios.post(
        "http://localhost:3000/api/caselogs",
        data
      );

      if (saveResponse.status === 201) {
        setSuccessMessage(
          `[${caseNo}] details imported to case logs successfully`
        );
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
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "80%",
            height: "80%",
            maxHeight: "100vh",
            margin: "auto",
            marginTop: "5%",
            backgroundColor: "white",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
        >
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
            <Box component="form" noValidate autoComplete="off" sx={{ my: 2 }}>
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
                    helperText={
                      errors.tags || "Add tags by typing and pressing Enter"
                    }
                    error={!!errors.tags}
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
                    backgroundColor: "#0F2043",
                    color: "#FFFFFF",
                    borderRadius: "0.3rem",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#0B1730",
                    },
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
          {/* Right Side - Viewer */}
          <Box
            sx={{
              width: "70%",
              paddingLeft: 2,

              height: "100%",
            }}
          >
            {currentAttachment ? (
              <>
                <Box sx={{ paddingLeft: 3, marginTop: 4, marginBottom: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {currentAttachment.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.disabled"
                    sx={{ mb: 2 }}
                  >
                    Type: {currentAttachment.type}, Size:{" "}
                    {currentAttachment.size}
                  </Typography>
                </Box>
                {currentAttachment.type === "application/pdf" ? (
                  <div style={{ height: "500px" }}>
                    <Worker
                      workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}
                    >
                      <Viewer fileUrl={currentAttachment.url} />
                    </Worker>
                  </div>
                ) : (
                  <img
                    src={currentAttachment.url}
                    alt={currentAttachment.name}
                    style={{ width: "100%" }}
                  />
                )}
              </>
            ) : (
              <Typography variant="body1" color="text.secondary">
                Select an attachment to view its content.
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>

      {/* Error and Success Alerts */}
      {errorMessage && (
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(null)}
        >
          <Alert
            severity="error"
            onClose={() => setErrorMessage(null)}
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      {successMessage && (
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage(null)}
        >
          <Alert
            severity="success"
            onClose={() => setSuccessMessage(null)}
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default AttachmentModal;
