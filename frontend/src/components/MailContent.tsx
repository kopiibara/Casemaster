import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Tooltip,
  TextField,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  Reply,
  AttachFile,
  MailOutline,
  Cancel,
  Description,
  Download,
  Visibility,
} from "@mui/icons-material";
import AttachmentModal from "./AttachmentModal";

interface Reply {
  id: number;
  content: string;
  time: string;
}

interface Attachment {
  name: string;
  size: string;
  type: string;
  url: string;
  "@odata.mediaContentUrl"?: string; // Optional field for mediaContentUrl
}

interface EmailViewProps {
  sender: string;
  email: string;
  timestamp: string;
  subject: string;
  content: string;
  attachments?: Attachment[]; // Updated to include the Attachment interface
  replies?: Reply[];
  onReply: (replyContent: string) => void;
}

const EmailView: React.FC<EmailViewProps> = ({
  sender,
  email,
  timestamp,
  subject,
  content,
  attachments,
  replies,
  onReply,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState<string>("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] =
    useState<Attachment | null>(null);

  const handleSendReply = () => {
    onReply(replyContent); // Call the parent handler
    setShowSnackbar(true);
    setIsReplying(false);
    setReplyContent(""); // Reset reply editor
  };

  const handleDownload = async (url: string, name: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading attachment:", error);
    }
  };

  const handleDownloadAll = () => {
    if (attachments) {
      attachments.forEach((attachment) => {
        handleDownload(attachment.url, attachment.name);
      });
    }
  };

  const handleViewAttachment = (attachment: Attachment) => {
    // Log the original URL (this is the URL you fetched for the attachment)
    console.log("Original Attachment URL:", attachment.url);

    // Check if the attachment has a URL and log accordingly
    let validUrl = attachment.url;
    if (!validUrl && attachment["@odata.mediaContentUrl"]) {
      // Fallback to the mediaContentUrl if the regular URL is invalid
      validUrl = attachment["@odata.mediaContentUrl"];
      console.log("Using mediaContentUrl as fallback:", validUrl);
    }

    // Log the final URL that is being used
    if (validUrl) {
      console.log("Final Attachment URL:", validUrl);
    } else {
      console.error(
        "Error: No valid URL found for attachment",
        attachment.name
      );
    }

    // Open the modal with the selected attachment
    setSelectedAttachment(attachment);
    setIsModalOpen(true);
  };

  return (
    <Card
      sx={{
        maxWidth: "100%",
        p: 3,
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: 4,
        backgroundColor: "#fefefe",
      }}
    >
      {/* Email Header */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {sender
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </Avatar>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {sender}
          </Typography>
        }
        subheader={
          <Tooltip title={`Email: ${email}`}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              <MailOutline fontSize="small" sx={{ mr: 0.5 }} />
              {email}
            </Typography>
          </Tooltip>
        }
        action={
          <Typography variant="caption" color="text.secondary">
            {timestamp}
          </Typography>
        }
      />

      <Divider sx={{ my: 2 }} />

      {/* Email Content */}
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          {subject || "No Subject"}
        </Typography>

        <Box sx={{ lineHeight: 1.8 }}>
          {content
            ? content.split("\n\n").map((paragraph, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  color="text.secondary"
                  paragraph
                >
                  {paragraph}
                </Typography>
              ))
            : "No content available for this email."}
        </Box>

        {/* Attachments Section */}
        {attachments && attachments.length > 0 && (
          <Box mt={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Attachments
            </Typography>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleDownloadAll}
              sx={{ mb: 2 }}
            >
              Download All
            </Button>
            <List>
              {attachments.map((attachment, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Description />
                  </ListItemIcon>
                  <ListItemText
                    primary={attachment.name}
                    secondary={`Size: ${attachment.size}, Type: ${attachment.type}`}
                  />
                  <IconButton
                    edge="end"
                    aria-label="view"
                    onClick={() => handleViewAttachment(attachment)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="download"
                    onClick={() =>
                      handleDownload(attachment.url, attachment.name)
                    }
                  >
                    <Download />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Replies Section */}
        {replies && replies.length > 0 && (
          <Box mt={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Replies
            </Typography>
            {replies.map((reply) => (
              <Box
                key={reply.id}
                mb={2}
                p={2}
                bgcolor="#f9f9f9"
                borderRadius={2}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {reply.time}
                </Typography>
                <Typography variant="body1">{reply.content}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>

      <Divider sx={{ my: 2 }} />

      {/* Reply Section */}
      {!isReplying && (
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Reply />}
            sx={{
              textTransform: "none",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
            onClick={() => setIsReplying(true)}
          >
            Reply
          </Button>
        </Box>
      )}

      {isReplying && (
        <Box mt={3}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Replying to <strong>{email}</strong>
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={5}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply here..."
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                bgcolor: "#f9f9f9",
                borderRadius: 2,
              },
            }}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendReply}
              disabled={!replyContent.trim()}
            >
              Send
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Cancel />}
              onClick={() => {
                setIsReplying(false);
                setReplyContent(""); // Reset reply editor
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      {/* Snackbar for Confirmation */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        message="Reply sent successfully!"
        onClose={() => setShowSnackbar(false)}
      />

      {/* Modal for Attachment View */}
      <AttachmentModal
        open={isModalOpen}
        attachments={selectedAttachment ? [selectedAttachment] : []}
        selectedAttachment={selectedAttachment}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
};

export default EmailView;
