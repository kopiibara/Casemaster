import { Box, Typography, Divider } from "@mui/material";
import EmailPreview from "./EmailPreview";
import EmailView from "./MailContent";
import { useState } from "react";

// Define the structure for emails
interface Email {
  id: number;
  sender: string;
  email: string;
  subject: string;
  time: string;
  preview: string;
  content: string;
  date: string; // Add date for grouping
  attachment?: {
    name: string;
    size: string;
  };
}

const MailContainer = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  // Function to handle reply submission
  const handleReply = (replyContent: string) => {
    if (selectedEmail) {
      console.log(`Replying to: ${selectedEmail.email}`);
      console.log(`Reply content: ${replyContent}`);
      // Clear or update state if needed
    }
  };

  // Mock Email Data
  const emails: Email[] = [
    {
      id: 1,
      sender: "Alice Cooper",
      email: "alice.cooper@example.com",
      subject: "Meeting Update",
      time: "10:30 AM",
      date: "Today",
      preview: "Hi team, please find the updated meeting agenda...",
      content: "Detailed meeting agenda goes here.",
    },
    {
      id: 2,
      sender: "Bob Marley",
      email: "bob.marley@example.com",
      subject: "Invoice Attached",
      time: "9:00 AM",
      date: "Today",
      preview: "Dear Customer, please find the attached invoice...",
      content: "Invoice details and summary.",
      attachment: { name: "invoice.pdf", size: "300KB" },
    },
    {
      id: 3,
      sender: "Charlie Brown",
      email: "charlie.brown@example.com",
      subject: "Project Deadline",
      time: "11:00 AM",
      date: "Yesterday",
      preview: "Reminder: The project deadline is approaching quickly.",
      content: "Project deadline details and next steps.",
    },
  ];

  // Group emails by date
  const groupedEmails = emails.reduce((groups, email) => {
    if (!groups[email.date]) groups[email.date] = [];
    groups[email.date].push(email);
    return groups;
  }, {} as { [key: string]: Email[] });

  return (
    <Box display="flex" height="77vh" overflow="hidden">
      {/* Email List Section */}
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
        {Object.keys(groupedEmails).map((date) => (
          <Box key={date} sx={{ padding: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              {date}
            </Typography>
            <Divider />
            {groupedEmails[date].map((email) => (
              <EmailPreview
                key={email.id}
                sender={email.sender}
                subject={email.subject}
                time={email.time}
                preview={email.preview}
                onClick={() => setSelectedEmail(email)}
                selected={selectedEmail?.id === email.id}
              />
            ))}
          </Box>
        ))}
      </Box>

      {/* Email View Section */}
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
            sender={selectedEmail.sender}
            email={selectedEmail.email}
            timestamp={selectedEmail.time}
            subject={selectedEmail.subject}
            content={selectedEmail.content}
            attachment={selectedEmail.attachment}
            onReply={handleReply} // Pass the reply handler
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h6" color="text.secondary">
              Select an email to view its details.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MailContainer;
