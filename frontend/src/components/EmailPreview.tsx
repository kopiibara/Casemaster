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
  IconButton,
  TextField,
  Badge,
} from "@mui/material";
import { Reply, AttachFile, MailOutline, Cancel } from "@mui/icons-material";

interface EmailPreviewProps {
  sender: string;
  subject: string;
  time: string;
  preview: string;
  onClick: () => void;
  hasAttachment?: boolean;
  selected?: boolean;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({
  sender,
  subject,
  time,
  preview,
  onClick,
  hasAttachment = false,
  selected = false,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        padding: 2,
        borderBottom: "1px solid #ddd",
        backgroundColor: selected ? "#e3f2fd" : "#fff",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: selected ? "#bbdefb" : "#f9f9f9",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Sender and Time */}
        <Typography
          variant="subtitle1"
          fontWeight={selected ? 700 : 500}
          sx={{
            color: selected ? "primary.main" : "text.primary",
          }}
        >
          {sender}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            whiteSpace: "nowrap",
            marginLeft: 1,
          }}
        >
          {time}
        </Typography>
      </Box>

      {/* Subject and Preview */}
      <Box mt={0.5}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: selected ? 600 : 400,
            color: selected ? "primary.main" : "text.primary",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {subject}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mt: 0.5,
          }}
        >
          {preview}
        </Typography>
      </Box>

      {/* Attachment Indicator */}
      {hasAttachment && (
        <Box mt={1} display="flex" alignItems="center">
          <IconButton size="small" disableRipple>
            <Badge
              badgeContent="Attachment"
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "primary.light",
                  color: "primary.dark",
                },
              }}
            >
              <AttachFile
                sx={{
                  color: selected ? "primary.main" : "text.secondary",
                  fontSize: 18,
                }}
              />
            </Badge>
          </IconButton>
        </Box>
      )}
    </Box>
  );
};



interface EmailViewProps {
  sender: string;
  email: string;
  timestamp: string;
  subject: string;
  content: string;
  attachment?: {
    name: string;
    size: string;
  };
  replies?: { content: string; timestamp: string }[]; // Add replies field
  onReply: (replyContent:string) => void; // Add onReply prop
  }


const EmailView: React.FC<EmailViewProps> = ({
  sender,
  email,
  timestamp,
  subject,
  content,
  attachment,
  onReply,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState<string>("");

  const handleSendReply = () => {
    onReply(replyContent); // Call the parent handler
    setIsReplying(false);
    setReplyContent(""); // Reset reply editor
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

        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ lineHeight: 1.8 }}
        >
          {content
            ? content.split("\n\n").map((paragraph, index) => (
                <Box key={index} mb={2}>
                  {paragraph}
                </Box>
              ))
            : "No content available for this email."}
        </Typography>

        {/* Attachment Section */}
        {attachment && (
          <Box
            mt={3}
            p={2}
            bgcolor="#f7f7f7"
            borderRadius={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <AttachFile sx={{ mr: 2, color: "primary.main" }} />
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{ wordBreak: "break-word" }}
                >
                  {attachment.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {attachment.size}
                </Typography>
              </Box>
            </Box>
            <Tooltip title="Download Attachment">
              <IconButton color="primary">
                <AttachFile />
              </IconButton>
            </Tooltip>
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
    </Card>
  );
};

export { EmailPreview, EmailView };
