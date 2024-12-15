import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Snackbar } from "@mui/material";
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
  isRead: boolean;
  importance: string;
  attachments?: { name: string; size: string; type: string; url: string }[]; // Updated to include URL for attachments
  replies?: Reply[];
}

interface Reply {
  id: number;
  content: string;
  time: string;
}

interface MailContainerProps {
  selectedFilter: string;
}

const MailContainer: React.FC<MailContainerProps> = ({ selectedFilter }) => {
  const { accessToken } = useAuth();
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Fetch emails from Microsoft API
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
            "id,subject,sender,receivedDateTime,hasAttachments,bodyPreview,isRead,importance"
          )
          .expand("attachments")
          .get();

        const emailsWithAttachments = response.value.map((email: any) => ({
          ...email,
          attachments: email.attachments?.map((attachment: any) => ({
            name: attachment.name,
            size: attachment.size,
            type: attachment.contentType,
            url: attachment.contentUrl, // Assuming the URL is provided in the response
          })),
        }));

        setEmails(emailsWithAttachments);
      } catch (err) {
        console.error("Error fetching emails:", err);
        setError("Failed to load emails.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [accessToken]);

  // Filter emails based on selected filter
  const filteredEmails = emails.filter((email) => {
    if (selectedFilter === "Unread") {
      return !email.isRead;
    }
    if (selectedFilter === "Important") {
      return email.importance === "high";
    }
    return true;
  });

  // Handle reply submission
  const handleReply = (replyContent: string) => {
    if (selectedEmail) {
      const updatedReplies = [
        ...(selectedEmail.replies || []),
        {
          id: Date.now(),
          content: replyContent,
          time: new Date().toLocaleString(),
        },
      ];
      setSelectedEmail({ ...selectedEmail, replies: updatedReplies });
      setShowSnackbar(true);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // Render the email list and details
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
        {filteredEmails.map((email) => (
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
          transition: "all 0.3s ease-in-out",
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
            timestamp={new Date(selectedEmail.receivedDateTime).toLocaleString()}
            subject={selectedEmail.subject}
            content={selectedEmail.bodyPreview}
            attachments={selectedEmail.attachments}
            replies={selectedEmail.replies}
            onReply={handleReply}
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

      {/* Snackbar for Reply Notification */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        message="Reply sent successfully!"
        onClose={() => setShowSnackbar(false)}
      />
    </Box>
  );
};

export default MailContainer;
