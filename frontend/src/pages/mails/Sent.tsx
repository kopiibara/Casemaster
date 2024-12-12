import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { AttachFile } from "@mui/icons-material";
import axios from "axios";

const Sent = () => {
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [emailError, setEmailError] = useState("");

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
    try {
      const response = await axios.get("http://localhost:3000/api/sent-emails");
      setSentEmails(response.data);
    } catch (error) {
      console.error("Error fetching sent emails:", error);
    }
  };

  useEffect(() => {
    fetchSentEmails();
  }, []);

  return (
    <Box className="flex">
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Compose
      </Button>
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

      <Box mt={4}>
        <Typography variant="h6">Sent Emails</Typography>
        <List>
          {sentEmails.map((email) => (
            <ListItem key={email.id}>
              <ListItemText
                primary={email.subject}
                secondary={`To: ${email.recipient} - ${email.sent_date}`}
              />
              {email.attachments && (
                <ListItemIcon>
                  <AttachFile />
                </ListItemIcon>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sent;