import express from "express";
import { Request, Response } from "express";
import db from "../config/db";
import { google } from "googleapis";
import axios from "axios";
import dotenv from "dotenv"; // Import dotenv module

dotenv.config(); // Load .env file

const router = express.Router();

// Set up Google Drive API client
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS || "{}"),
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

// Endpoint to get all case logs with source = 'Email'
router.get("/caselogs", (req: Request, res: Response) => {
  const sql = `
    SELECT id, case_no, title, date_added, status, source
    FROM caselogs
    WHERE source = 'Email'
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Failed to fetch case logs" });
      return;
    }

    res.status(200).json(results);
  });
});

// Endpoint to upload a file to Google Drive
router.post("/upload-to-drive", async (req: Request, res: Response) => {
  const { fileName, fileType, fileUrl } = req.body;

  if (!fileName || !fileType || !fileUrl) {
    res.status(400).json({ error: "Missing file details" });
    return;
  }

  try {
    // Download the file from the provided URL
    const response = await axios.get(fileUrl, { responseType: "stream" });

    // Upload the file to Google Drive
    const fileMetadata = {
      name: fileName,
      parents: ["1OjHFD-LjEhbk-Ewz00xOzr9BdAYWWnl3"], // Replace with your folder ID
    };

    const media = {
      mimeType: fileType,
      body: response.data,
    };

    const driveResponse = (await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id, webViewLink, webContentLink",
    })) as {
      data: { id: string; webViewLink: string; webContentLink: string };
    };

    res.status(200).json({
      message: "File uploaded successfully",
      fileId: driveResponse.data.id,
      webViewLink: driveResponse.data.webViewLink,
      webContentLink: driveResponse.data.webContentLink,
    });
  } catch (error) {
    console.error("Error uploading to Google Drive:", error);
    res.status(500).json({ error: "Failed to upload to Google Drive" });
  }
});

export default router;
