import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Stack, IconButton, Snackbar, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem } from "@mui/material";
import axios from "axios";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DownloadIcon from "@mui/icons-material/Download";
import RenameIcon from "@mui/icons-material/Edit";
import MoveIcon from "@mui/icons-material/Folder";
import DetailsIcon from "@mui/icons-material/Info";

interface Attachment {
  attachment_id: number;
  matter_id: number;
  file_path: string;
  uploaded_by: string;
  uploaded_at: string;
  file_name: string;
  file_size: number;
  file_type: string;
}

const AttachmentManager: React.FC = () => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null);
  const [newName, setNewName] = useState("");
  const [newFolderId, setNewFolderId] = useState<number | null>(null);

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/attachments");
        setAttachments(response.data);
      } catch (error) {
        console.error("Error fetching attachments:", error);
      }
    };

    fetchAttachments();
  }, []);

  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      const response = await axios.get(`http://localhost:3000${filePath}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading attachment:", error);
      setSnackbarMessage("Download failed - try again");
      setShowSnackbar(true);
    }
  };

  const handleRename = async () => {
    if (!selectedAttachment || !newName.trim()) return;
    try {
      await axios.put(`http://localhost:3000/attachments/${selectedAttachment.attachment_id}`, { newName });
      setAttachments((prev) =>
        prev.map((att) =>
          att.attachment_id === selectedAttachment.attachment_id
            ? { ...att, file_name: newName }
            : att
        )
      );
      setRenameDialogOpen(false);
      setSnackbarMessage("Attachment renamed successfully");
      setShowSnackbar(true);
    } catch (error) {
      console.error("Error renaming attachment:", error);
      setSnackbarMessage("Rename failed - try again");
      setShowSnackbar(true);
    }
  };

  const handleMove = async () => {
    if (!selectedAttachment || newFolderId === null) return;
    try {
      await axios.put(`http://localhost:3000/attachments/${selectedAttachment.attachment_id}/move`, { newFolderId });
      setMoveDialogOpen(false);
      setSnackbarMessage("Attachment moved successfully");
      setShowSnackbar(true);
    } catch (error) {
      console.error("Error moving attachment:", error);
      setSnackbarMessage("Move failed - try again");
      setShowSnackbar(true);
    }
  };

  const handleViewDetails = (attachment: Attachment) => {
    setSelectedAttachment(attachment);
    // Implement view details logic here
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Attachments
      </Typography>
      <Stack spacing={2}>
        {attachments.map((attachment) => (
          <Box
            key={attachment.attachment_id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
              borderBottom: "1px solid #ddd",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AttachFileIcon sx={{ marginRight: 2 }} />
              <Typography variant="body1">{attachment.file_name}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => handleDownload(attachment.file_path, attachment.file_name)}>
                <DownloadIcon />
              </IconButton>
              <IconButton onClick={() => { setSelectedAttachment(attachment); setRenameDialogOpen(true); }}>
                <RenameIcon />
              </IconButton>
              <IconButton onClick={() => { setSelectedAttachment(attachment); setMoveDialogOpen(true); }}>
                <MoveIcon />
              </IconButton>
              <IconButton onClick={() => handleViewDetails(attachment)}>
                <DetailsIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Stack>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={() => setShowSnackbar(false)}
      />

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onClose={() => setRenameDialogOpen(false)}>
        <DialogTitle>Rename Attachment</DialogTitle>
        <DialogContent>
          <TextField
            label="New Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRenameDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleRename} color="primary">Rename</Button>
        </DialogActions>
      </Dialog>

      {/* Move Dialog */}
      <Dialog open={moveDialogOpen} onClose={() => setMoveDialogOpen(false)}>
        <DialogTitle>Move Attachment</DialogTitle>
        <DialogContent>
          <TextField
            label="New Folder ID"
            fullWidth
            select
            value={newFolderId || ""}
            onChange={(e) => setNewFolderId(Number(e.target.value))}
          >
            {/* Replace with dynamic folder options */}
            <MenuItem value={1}>Folder 1</MenuItem>
            <MenuItem value={2}>Folder 2</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMoveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleMove} color="primary">Move</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AttachmentManager;