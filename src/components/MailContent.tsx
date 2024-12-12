import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { Reply, AttachFile } from "@mui/icons-material";

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
}

export default function EmailView({
  sender = "Kendo Jenner",
  email = "kendo_counsel@gmail.com",
  timestamp = "October 17, 2024 10:00 PM",
  subject = "CHI MING TSOI, petitioner, vs. COURT OF APPEALS, GINA LAO TSOI",
  content = `Good day, Attorney.

It appears that there is absence of empathy between petitioner and private respondent. That is — a shared feeling which between husband and wife must be experienced not only by having spontaneous sexual intimacy but a deep sense of spiritual communion. Marital union is a two-way process. An expressive interest in each other's feelings at a time it is needed by the other can go a long way in deepening the marital relationship. Marriage is definitely not for children but for two consenting adults who view the relationship with love, amor dignit amorem, respect, sacrifice and a continuing commitment to compromise, conscious of its value as a sublime social institution.

IN VIEW OF THE FOREGOING PREMISES, the assailed decision of the Court of Appeals dated November 29, 1994 is hereby AFFIRMED in all respects and the petition is hereby DENIED for lack of merit.`,
  attachment = {
    name: "101424_motion_recon.pdf",
    size: "198KB",
  },
}: EmailViewProps) {
  return (
    <Card sx={{ maxWidth: 800, p: 3, boxShadow: "none" }}>
      <CardHeader
        avatar={
          <Avatar>
            {sender
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
        }
        title={<Typography variant="h6">{sender}</Typography>}
        subheader={
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
        }
        action={
          <Typography variant="body2" color="text.secondary">
            {timestamp}
          </Typography>
        }
      />

      <Divider sx={{ my: 2 }} />

      <CardContent>
        <Typography variant="h5" gutterBottom>
          {subject}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          {content.split("\n\n").map((paragraph, index) => (
            <Box key={index} mb={2}>
              {paragraph}
            </Box>
          ))}
        </Typography>

        {attachment && (
          <Box
            mt={3}
            p={2}
            bgcolor="grey.100"
            borderRadius={2}
            display="flex"
            alignItems="center"
          >
            <AttachFile sx={{ mr: 2 }} color="error" />
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {attachment.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {attachment.size}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>

      <Divider sx={{ my: 2 }} />

      <Box display="flex" justifyContent="flex-end">
        <Button variant="outlined" startIcon={<Reply />}>
          Reply
        </Button>
      </Box>
    </Card>
  );
}
