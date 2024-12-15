import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
  IconButton,
  MenuItem,
} from "@mui/material";
import { PDFDocument } from "pdf-lib";
import CloseIcon from "@mui/icons-material/Close";

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
  const [currentAttachment, setCurrentAttachment] = useState<Attachment | null>(selectedAttachment);
  const [caseNo, setCaseNo] = useState<number | null>(null);
  const [caseTitle, setCaseTitle] = useState<string>("");
  const [partyFiler, setPartyFiler] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const [pdfPages, setPdfPages] = useState<string[]>([]);

  useEffect(() => {
    setCurrentAttachment(selectedAttachment);
    if (selectedAttachment && selectedAttachment.type === "application/pdf") {
      loadPdf(selectedAttachment.url);
    }
  }, [selectedAttachment]);

  const loadPdf = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }
      const arrayBuffer = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const pageImages = await Promise.all(
        pages.map(async (page) => {
          const { width, height } = page.getSize();
          const pdfPage = await pdfDoc.embedPage(page);
          const pngImage = await pdfPage.renderToPng({ width, height });
          return URL.createObjectURL(pngImage);
        })
      );
      setPdfPages(pageImages);
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newTag.trim() !== "") {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
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
          p: 4,
          overflow: "hidden",
        }}
      >
        {/* Left Side - Form and Import Info */}
        <Box sx={{ width: "30%", borderRight: "1px solid #ddd", paddingRight: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
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
                renderValue: (selected) => selected.join(", "),
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
              <Button variant="contained" color="primary">
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
                pdfPages.map((page, index) => (
                  <img key={index} src={page} alt={`Page ${index + 1}`} style={{ width: "100%", marginBottom: "1rem" }} />
                ))
              ) : (
                <img src={currentAttachment.url} alt={currentAttachment.name} style={{ width: "100%" }} />
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
