import React from "react";
import { Box, Typography } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

interface EmailPreviewProps {
  sender: string;
  subject: string;
  time: string;
  preview: string;
  onClick: () => void;
  selected: boolean;
  hasAttachment: boolean;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({
  sender,
  subject,
  time,
  preview,
  onClick,
  selected,
  hasAttachment,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        padding: 2,
        borderBottom: "1px solid #ddd",
        backgroundColor: selected ? "#e0f7fa" : "#fff",
        cursor: "pointer",
        "&:hover": { backgroundColor: "#b2ebf2" },
        transition: "background-color 0.2s ease-in-out",
      }}
    >
      <Typography variant="subtitle1" fontWeight={500} noWrap>
        {sender}
      </Typography>
      <Typography variant="caption" color="text.secondary" noWrap>
        {time}
      </Typography>
      <Typography variant="body1" fontWeight={600} noWrap>
        {subject || "No Subject"}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
      >
        {preview}
      </Typography>
      {hasAttachment && (
        <Box display="flex" alignItems="center" mt={1}>
          <AttachFileIcon fontSize="small" sx={{ mr: 0.5, color: "#757575" }} />
          <Typography variant="caption" color="text.secondary">
            Attachment
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default EmailPreview;
