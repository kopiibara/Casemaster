import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import fileUpload from "express-fileupload";
import pool from "../src/config/db";
import profileRoutes from "./routes/profileRoutes";
import emailRoutes from "./routes/emailRoutes";
import smsRoutes from "./routes/smsRoutes";
import caselogsRoutes from "./routes/caselogs";
import attachmentsRouter from './routes/attachments';
import { UploadedFile } from "express-fileupload";
import { google } from "googleapis";
import fs from "fs";

dotenv.config({ path: path.resolve(__dirname, "./config/.env") });

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS configuration options
const corsOptions = {
  origin: "http://localhost:5173", // frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "*",
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" })); // Replaces bodyParser.json()
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Replaces bodyParser.urlencoded()

// Use routes
app.use("/api", profileRoutes);
app.use("/api", emailRoutes);
app.use("/api", smsRoutes);
app.use(fileUpload());
app.use("/api", caselogsRoutes);
app.use('/api', attachmentsRouter);

// Mock data for attachment
const mockAttachment = {
  attachment_id: 1,
  matter_id: 101,
  file_path: "/uploads/mock-file.pdf",
  uploaded_by: "user@example.com",
  uploaded_at: new Date().toISOString(),
  file_name: "mock-file.pdf",
  file_size: 1024,
  file_type: "application/pdf",
};

// Function to upload mock data to Google Drive
const uploadMockDataToDrive = async () => {
  try {
    const credentialsPath = path.resolve(__dirname, "service-account.json");
    if (!fs.existsSync(credentialsPath)) {
      throw new Error("Service account JSON file not found.");
    }

    const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

    if (!credentials.client_email || !credentials.private_key) {
      throw new Error("Invalid service account JSON: Missing client_email or private_key.");
    }

    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ["https://www.googleapis.com/auth/drive"]
    );

    const drive = google.drive({ version: "v3", auth });

    const fileMetadata = {
      name: mockAttachment.file_name,
    };
    const media = {
      mimeType: mockAttachment.file_type,
      body: fs.createReadStream(path.resolve(__dirname, `.${mockAttachment.file_path}`)),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, webContentLink",
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading to Google Drive:", error instanceof Error ? error.message : error);
    throw new Error("Error uploading to Google Drive");
  }
};

// Endpoint to create and upload mock attachment
app.post("/api/create-mock-attachment", async (req, res) => {
  try {
    const driveData = await uploadMockDataToDrive();

    // Insert into case logs
    const caseLogQuery = "INSERT INTO caselogs (attachment_id, matter_id, file_path, uploaded_by, uploaded_at, file_name, file_size, file_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const caseLogValues = [
      mockAttachment.attachment_id,
      mockAttachment.matter_id,
      driveData.webContentLink,
      mockAttachment.uploaded_by,
      mockAttachment.uploaded_at,
      mockAttachment.file_name,
      mockAttachment.file_size,
      mockAttachment.file_type,
    ];
    await pool.query(caseLogQuery, caseLogValues);

    // Insert into attachments
    const attachmentQuery = "INSERT INTO attachments (attachment_id, matter_id, file_path, uploaded_by, uploaded_at, file_name, file_size, file_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const attachmentValues = [
      mockAttachment.attachment_id,
      mockAttachment.matter_id,
      driveData.webContentLink,
      mockAttachment.uploaded_by,
      mockAttachment.uploaded_at,
      mockAttachment.file_name,
      mockAttachment.file_size,
      mockAttachment.file_type,
    ];
    await pool.query(attachmentQuery, attachmentValues);

    res.status(200).json({ message: "Mock attachment created and uploaded successfully", driveData });
  } catch (error) {
    console.error("Error creating mock attachment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Email routes
app.post("/api/send-email", async (req, res) => {
  try {
    const files = req.files; // `files` is of type `FileArray`

    const attachments: string[] = [];

    if (files) {
      Object.values(files).forEach((fileOrFiles) => {
        // Handle single file (UploadedFile) or multiple files (UploadedFile[])
        if (Array.isArray(fileOrFiles)) {
          fileOrFiles.forEach((file) => {
            const uploadedFile = file as UploadedFile; // Explicitly cast to `UploadedFile`
            attachments.push(uploadedFile.name);

            // Move the file to the uploads folder
            uploadedFile.mv(`./uploads/${uploadedFile.name}`, (err) => {
              if (err) {
                console.error("Error saving file:", err);
              }
            });
          });
        } else {
          const uploadedFile = fileOrFiles as UploadedFile; // Explicitly cast to `UploadedFile`
          attachments.push(uploadedFile.name);

          // Move the file to the uploads folder
          uploadedFile.mv(`./uploads/${uploadedFile.name}`, (err) => {
            if (err) {
              console.error("Error saving file:", err);
            }
          });
        }
      });
    }

    // Save email to database
    const { to, subject, body } = req.body;
    const query =
      "INSERT INTO emails (recipient, subject, body, attachments, status) VALUES (?, ?, ?, ?, ?)";
    const values = [to, subject, body, JSON.stringify(attachments), "sent"];

    await pool.query(query, values);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/import-to-caselogs", async (req, res) => {
  try {
    const { attachment_id, matter_id, file_path, uploaded_by, uploaded_at, file_name, file_size, file_type } = req.body;

    // Insert into case logs
    const caseLogQuery = "INSERT INTO caselogs (attachment_id, matter_id, file_path, uploaded_by, uploaded_at, file_name, file_size, file_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const caseLogValues = [attachment_id, matter_id, file_path, uploaded_by, uploaded_at, file_name, file_size, file_type];
    await pool.query(caseLogQuery, caseLogValues);

    // Insert into attachments
    const attachmentQuery = "INSERT INTO attachments (attachment_id, matter_id, file_path, uploaded_by, uploaded_at, file_name, file_size, file_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const attachmentValues = [attachment_id, matter_id, file_path, uploaded_by, uploaded_at, file_name, file_size, file_type];
    await pool.query(attachmentQuery, attachmentValues);

    res.status(200).json({ message: "Attachment imported to case logs and recorded in attachments section successfully" });
  } catch (error) {
    console.error("Error importing to case logs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Google Drive upload route
app.post("/api/upload-to-drive", async (req, res) => {
  try {
    const credentialsPath = path.resolve(__dirname, "service-account.json");
    if (!fs.existsSync(credentialsPath)) {
      throw new Error("Service account JSON file not found.");
    }

    const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

    if (!credentials.client_email || !credentials.private_key) {
      throw new Error("Invalid service account JSON: Missing client_email or private_key.");
    }

    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ["https://www.googleapis.com/auth/drive"]
    );

    const drive = google.drive({ version: "v3", auth });

    const fileMetadata = {
      name: req.body.fileName,
    };
    const media = {
      mimeType: req.body.mimeType,
      body: fs.createReadStream(req.body.filePath),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, webContentLink",
    });

    res.status(200).json({ fileId: response.data.id, webContentLink: response.data.webContentLink });
  } catch (error) {
    console.error("Error uploading to Google Drive:", error instanceof Error ? error.message : error);
    res.status(500).json({ message: "Error uploading to Google Drive" });
  }
});

app.get("/api/sent-emails", async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM emails WHERE status = ?", [
      "sent",
    ]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching sent emails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/attachments", async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM attachments");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching attachments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
