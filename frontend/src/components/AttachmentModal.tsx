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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";

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
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const [caseType, setCaseType] = useState("");

  const caseTypes = [
    "Civil Case",
    "Criminal Case",
    "Special Case",
    "Motion",
    "Incident",
    "Pleading",
  ];

  useEffect(() => {
    setCurrentAttachment(selectedAttachment);
  }, [selectedAttachment]);

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newTag.trim() !== "") {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleSave = async () => {
    if (!caseNo || !caseTitle || !partyFiler || !caseType) {
      alert("Please fill out all required fields.");
      return;
    }

    if (!currentAttachment) {
      alert("No attachment selected.");
      return;
    }

    // Upload file to cloud storage first
    const formData = new FormData();
    const response = await fetch(currentAttachment.url);
    const blob = await response.blob();
    formData.append("file", blob, currentAttachment.name);

    try {
      // Step 1: Upload the file to the cloud storage
      const uploadResponse = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const fileUrl = uploadResponse.data.fileUrl; // Cloud URL returned after successful upload

      // Step 2: Save the case log with the cloud URL
      const caseData = {
        caseNo,
        caseTitle,
        partyFiler,
        caseType,
        source: "Manual", // Assuming source is 'Manual' for this case
        emailLink: "", // Adjust if emailLink is applicable
        file_name: currentAttachment.name,
        file_url: fileUrl,
      };

      const response = await axios.post(
        "http://localhost:3000/api/caselogs",
        caseData
      );
      alert("Case log saved successfully!");
      console.log("Response:", response.data);

      // Reset form fields
      setCaseNo(null);
      setCaseTitle("");
      setPartyFiler("");
      setCaseType("");
    } catch (error) {
      console.error("Error saving case log:", error);
      alert("Failed to save case log. Please try again.");
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
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Attachments ({attachments.length})
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Case No."
              type="number"
              fullWidth
              value={caseNo || ""}
              onChange={(e) => setCaseNo(Number(e.target.value))}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Case Title"
              fullWidth
              value={caseTitle}
              onChange={(e) => setCaseTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Party Filer"
              fullWidth
              value={partyFiler}
              onChange={(e) => setPartyFiler(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Case Type"
              fullWidth
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              sx={{ mb: 2 }}
              select
            >
              {caseTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Tags"
              fullWidth
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              sx={{ mb: 2 }}
              select
              SelectProps={{
                multiple: true,
                value: tags,
                renderValue: (value: unknown) => (value as string[]).join(", "),
              }}
            >
              {tags.map((tag, index) => (
                <MenuItem key={index} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </TextField>
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

        {/* Right Side - Attachment Viewer */}
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
      </Box>
    </Modal>
  );
};

export default AttachmentModal;
