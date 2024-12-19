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
import { UploadedFile } from "express-fileupload";
import caseTracker from "./routes/casetrackerRoutes";

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
app.use("/api", caseTracker);


app.use(fileUpload());
app.use("/api", caselogsRoutes);
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
