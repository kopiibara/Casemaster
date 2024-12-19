import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, List, ListItem, ListItemText, ListItemIcon, Avatar, IconButton, Tooltip, Badge, Pagination, Checkbox, MenuItem, Select, CircularProgress, SelectChangeEvent } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { AttachFile, Delete, Visibility, Archive, Label } from "@mui/icons-material";
import axios from "axios";

const Sent = () => {
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [sentEmails, setSentEmails] = useState<SentEmail[]>([
    {
      id: "1",
      subject: "Meeting Reminder",
      recipient: "john.doe@example.com",
      sent_date: "2023-10-01 10:00 AM",
      attachments: ["agenda.pdf"],
      status: "Sent",
      preview: "Don't forget about the meeting tomorrow at 10 AM.",
      label: "Work"
    },
    {
      id: "2",
      subject: "Project Update",
      recipient: "jane.smith@example.com",
      sent_date: "2023-10-02 02:30 PM",
      attachments: [],
      status: "Sent",
      preview: "Here is the latest update on the project...",
      label: "Work"
    },
    {
      id: "3",
      subject: "Invoice",
      recipient: "client@example.com",
      sent_date: "2023-10-03 09:15 AM",
      attachments: ["invoice.pdf"],
      status: "Pending",
      preview: "Please find the attached invoice for the recent services.",
      label: "Personal"
    },
    {
      id: "4",
      subject: "Birthday Invitation",
      recipient: "friend@example.com",
      sent_date: "2023-10-04 05:00 PM",
      attachments: ["invitation.jpg"],
      status: "Sent",
      preview: "You are invited to my birthday party on October 10th!",
      label: "Personal"
    },
    {
      id: "5",
      subject: "Job Application",
      recipient: "hr@example.com",
      sent_date: "2023-10-05 11:00 AM",
      attachments: ["resume.pdf", "cover_letter.pdf"],
      status: "Sent",
      preview: "I am writing to apply for the software engineer position...",
      label: "Work"
    },
    {
      id: "6",
      subject: "Weekly Report",
      recipient: "manager@example.com",
      sent_date: "2023-10-06 09:00 AM",
      attachments: ["report.pdf"],
      status: "Sent",
      preview: "Please find the weekly report attached.",
      label: "Work"
    },
    {
      id: "7",
      subject: "Event Confirmation",
      recipient: "events@example.com",
      sent_date: "2023-10-07 02:00 PM",
      attachments: [],
      status: "Sent",
      preview: "This is to confirm your attendance at the upcoming event...",
      label: "Work"
    },
    {
      id: "8",
      subject: "Travel Itinerary",
      recipient: "travel@example.com",
      sent_date: "2023-10-08 08:00 AM",
      attachments: ["itinerary.pdf"],
      status: "Sent",
      preview: "Attached is your travel itinerary for the upcoming trip.",
      label: "Personal"
    },
    {
      id: "9",
      subject: "Newsletter Subscription",
      recipient: "newsletter@example.com",
      sent_date: "2023-10-09 03:00 PM",
      attachments: [],
      status: "Sent",
      preview: "Thank you for subscribing to our newsletter!",
      label: "Work"
    },
    {
      id: "10",
      subject: "Feedback Request",
      recipient: "feedback@example.com",
      sent_date: "2023-10-10 01:00 PM",
      attachments: [],
      status: "Sent",
      preview: "We would love to hear your feedback on our recent service.",
      label: "Work"
    }
  ]);
  const [emailError, setEmailError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  interface SentEmail {
    id: string;
    subject: string;
    recipient: string;
    sent_date: string;
    attachments?: string[];
    status: string;
    preview: string;
    label: string;
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachments(Array.from(event.target.files));
    }
  };

  const handleSend = async () => {
    if (!validateEmail(to)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const formData = new FormData();
    formData.append("to", to);
    formData.append("subject", subject);
    formData.append("body", body);
    attachments.forEach(file => formData.append("attachments", file));

    try { 
      await axios.post("http://localhost:3000/api/send-email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchSentEmails(); // Refresh the list of sent emails
    } catch (error) {
      console.error("Error sending email:", error);
    }

    handleClose();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const fetchSentEmails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/sent-emails");
      setSentEmails(response.data);
    } catch (error) {
      console.error("Error fetching sent emails:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSentEmails();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value as string);
  };

  const filteredEmails = sentEmails.filter(email => 
    email.subject.toLowerCase().includes(search.toLowerCase()) ||
    email.recipient.toLowerCase().includes(search.toLowerCase()) ||
    email.preview.toLowerCase().includes(search.toLowerCase())
  ).filter(email => 
    filter ? email.label === filter : true
  );

  return (
    <Box className="flex" sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpen}
          sx={{ fontSize: '1.2rem', padding: '10px 20px' }}
        >
          Compose
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            variant="contained" 
            color="secondary" 
            sx={{ marginRight: 2 }}
          >
            Bulk Archive
          </Button>
          <Select
            value={filter}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Filter emails' }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
          </Select>
        </Box>
      </Box>
      <TextField
        label="Search emails by recipient, subject, or content"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Compose New Message</DialogTitle>
        <DialogContent>
          <TextField
            label="To"
            fullWidth
            margin="normal"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              if (emailError) {
                setEmailError("");
              }
            }}
            required
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Editor
            apiKey="edwiwlze0yph8880lhy1f1aqxmefqqizzklkwk01qzfciglg"
            value={body}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={(content) => setBody(content)}
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Attach Files
            <input type="file" hidden multiple onChange={handleFileChange} />
          </Button>
          <Box mt={2}>
            {attachments.map((file, index) => (
              <Box key={index}>{file.name}</Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>

      <Box mt={4} sx={{ width: '100%' }}>
        <Typography variant="h6">Sent Emails</Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <List>
              {filteredEmails.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                  No sent emails yet. Click Compose to start!
                </Typography>
              ) : (
                filteredEmails.slice((page - 1) * 10, page * 10).map((email) => (
                  <ListItem key={email.id} sx={{ borderBottom: '1px solid #ddd', '&:hover': { backgroundColor: '#f5f5f5' } }}>
                    <ListItemIcon>
                      <Checkbox />
                    </ListItemIcon>
                    <ListItemIcon>
                      <Avatar>{email.recipient.charAt(0).toUpperCase()}</Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{email.recipient}</Typography>
                          <Typography variant="body2" sx={{ color: 'gray' }}>{email.sent_date}</Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{email.subject}</Typography>
                          <Typography variant="body2" sx={{ color: 'gray' }}>{email.preview}</Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', visibility: 'hidden', '&:hover': { visibility: 'visible' } }}>
                      <Tooltip title="View Details">
                        <IconButton>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Archive">
                        <IconButton>
                          <Archive />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={email.status}>
                        <IconButton>
                          <Badge color={email.status === 'Sent' ? 'success' : 'error'} badgeContent={email.status} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItem>
                ))
              )}
            </List>
          </Box>
        )}
        <Pagination 
          count={Math.ceil(filteredEmails.length / 10)} 
          page={page} 
          onChange={(event, value) => setPage(value)} 
          sx={{ mt: 2 }}
        />
      </Box>
    </Box>
  );
};

export default Sent;