import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import EmailPreview from "./EmailPreview";
import EmailView from "./MailContent";
import { useAuth } from "../../context/AuthContext";
import { Client } from "@microsoft/microsoft-graph-client";

interface Email {
  id: string;
  subject: string;
  sender: {
    emailAddress: {
      name: string;
      address: string;
    };
  };
  receivedDateTime: string;
  hasAttachments: boolean;
  bodyPreview: string;
}

const MailContainer: React.FC = () => {
  const { accessToken } = useAuth();
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      if (!accessToken) return;

      setLoading(true);
      setError(null);

      try {
        const client = Client.init({
          authProvider: (done) => done(null, accessToken),
        });

        const response = await client
          .api("/me/messages")
          .select(
            "id,subject,sender,receivedDateTime,hasAttachments,bodyPreview"
          )
          .get();

        setEmails(response.value);
      } catch (err) {
        console.error("Error fetching emails:", err);
        setError("Failed to load emails.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [accessToken]);

  if (loading) {
    return <Typography>Loading emails...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box display="flex" height="77vh" overflow="hidden">
      {/* Email List */}
      <Box
        sx={{
          width: "35%",
          overflowY: "auto",
          borderRight: "1px solid #ddd",
          bgcolor: "#f7f7f7",
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#b0b0b0",
            borderRadius: 8,
            "&:hover": {
              backgroundColor: "#909090",
            },
          },
        }}
      >
        {emails.map((email) => (
          <EmailPreview
            key={email.id}
            sender={email.sender.emailAddress.name}
            subject={email.subject}
            time={new Date(email.receivedDateTime).toLocaleString()}
            preview={email.bodyPreview}
            onClick={() => setSelectedEmail(email)}
            selected={selectedEmail?.id === email.id}
            hasAttachment={email.hasAttachments}
          />
        ))}
      </Box>

      {/* Email Details */}
      <Box
        sx={{
          width: "65%",
          overflowY: "auto",
          padding: 3,
          bgcolor: "#fff",
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#b0b0b0",
            borderRadius: 8,
            "&:hover": {
              backgroundColor: "#909090",
            },
          },
        }}
      >
        {selectedEmail ? (
          <EmailView
            sender={selectedEmail.sender.emailAddress.name}
            email={selectedEmail.sender.emailAddress.address}
            timestamp={new Date(
              selectedEmail.receivedDateTime
            ).toLocaleString()}
            subject={selectedEmail.subject}
            content={selectedEmail.bodyPreview}
            attachment={selectedEmail.hasAttachments ? "Yes" : "No"}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h6" color="text.secondary">
              Select an email to view its details ...
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MailContainer;
