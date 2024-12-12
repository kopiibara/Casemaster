import React from "react";
import { Card, CardContent, Typography, Box, Badge } from "@mui/material";
import { AttachFile } from "@mui/icons-material";

interface EmailPreviewProps {
  sender: string;
  subject: string;
  time: string;
  preview: string;
  attachmentCount?: number;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({
  sender,
  subject,
  time,
  preview,
  attachmentCount = 0,
}) => {
  return (
    <Card
      sx={{
        padding: 1,
        paddingLeft: 3,
        cursor: "pointer",
        ":hover": { backgroundColor: "#f5f5f5" },
        boxShadow: "none",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="subtitle1" noWrap>
            {sender}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {time}
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="bold" noWrap mb={0.5}>
          {subject}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap mb={1}>
          {preview}
        </Typography>
        {attachmentCount > 0 && (
          <Box mt={1} display="flex" alignItems="center">
            <Badge
              color="secondary"
              badgeContent={attachmentCount}
              overlap="circular"
            >
              <AttachFile fontSize="small" />
            </Badge>
            <Typography variant="caption" color="text.secondary" ml={1}>
              {attachmentCount} attachment{attachmentCount > 1 ? "s" : ""}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailPreview;
