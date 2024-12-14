import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Client } from "@microsoft/microsoft-graph-client";

// Define email structure
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

const EmailPreview: React.FC = () => {
  const { accessToken } = useAuth();
  const [emails, setEmails] = useState<Email[]>([]);
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

  if (loading) return <p>Loading emails...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box>
      {emails.map((email) => (
        <Box
          key={email.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            borderBottom: "1px solid #ddd",
            "&:hover": { backgroundColor: "#f9f9f9" },
          }}
        >
          {/* Sender */}
          <Typography variant="subtitle1" fontWeight={500}>
            {email.sender.emailAddress.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(email.receivedDateTime).toLocaleString()}
          </Typography>

          {/* Subject */}
          <Typography variant="body1" fontWeight={600}>
            {email.subject || "No Subject"}
          </Typography>

          {/* Body Preview */}
          <Typography variant="body2" color="text.secondary" noWrap>
            {email.bodyPreview}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default EmailPreview;
