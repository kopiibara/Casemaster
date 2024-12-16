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
  const [caseNo, setCaseNo] = useState<number | null>(null);
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
    const newErrors = {
      caseNo: caseNo ? "" : "Case No. is required.",
      caseTitle: caseTitle.trim() ? "" : "Case Title is required.",
      partyFiler: partyFiler.trim() ? "" : "Party Filer is required.",
      caseType: caseType ? "" : "Case Type is required.",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      const data = {
        caseNo,
        caseTitle,
        partyFiler,
        caseType,
        tags, // Already processed to remove duplicates and trim spaces
      };

      const response = await axios.post(
        "http://localhost:3000/api/caselogs",
        data
      );

      if (response.status === 201) {
        setSuccessMessage("Case log saved successfully!");
        setErrorMessage(null);

        // Clear the form fields
        setCaseNo(null);
        setCaseTitle("");
        setPartyFiler("");
        setCaseType(null);
        setTags([]);

        onClose();
      } else {
        setErrorMessage("Failed to save case log. Please try again.");
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Error saving case log:", error);
      setErrorMessage("An error occurred while saving the case log.");
      setSuccessMessage(null);
    }
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
        {/* Left Side - Form */}
        <Box
          sx={{ width: "30%", borderRight: "1px solid #ddd", paddingRight: 2 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Import to Case Logs</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Case No."
              type="number"
              required
              fullWidth
              value={caseNo || ""}
              onChange={(e) => setCaseNo(Number(e.target.value))}
              sx={{ mb: 2 }}
              error={!!errors.caseNo}
              helperText={errors.caseNo}
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
            />
            <TextField
              label="Case Type"
              required
              select
              fullWidth
              value={caseType || ""}
              onChange={(e) => setCaseType(e.target.value)}
              sx={{ mb: 2 }}
              error={!!errors.caseType}
              helperText={errors.caseType}
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
                // Filter out duplicates and trim spaces
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
                />
              )}
              filterOptions={(options, { inputValue }) => {
                const filtered = options.filter((option) =>
                  option.toLowerCase().includes(inputValue.toLowerCase())
                );

                // Suggest the new tag if it doesn't already exist
                if (inputValue.trim() && !options.includes(inputValue.trim())) {
                  filtered.push(inputValue.trim());
                }

                return filtered;
              }}
            />

            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={onClose}>
                Discard
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
        {/* Right Side - Viewer */}
        <Box sx={{ width: "70%", paddingLeft: 2, overflowY: "auto" }}>
          {currentAttachment ? (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {currentAttachment.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Type: {currentAttachment.type}, Size: {currentAttachment.size}
              </Typography>
              {currentAttachment.type === "application/pdf" ? (
                <div style={{ height: "600px" }}>
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
        {/* Snackbar for Notifications */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage(null)}
        >
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(null)}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default AttachmentModal;
