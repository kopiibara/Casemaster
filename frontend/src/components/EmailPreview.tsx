import React from "react";
import { Box, Typography, Badge, IconButton } from "@mui/material";
import { AttachFile } from "@mui/icons-material";

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

export default EmailPreview;
