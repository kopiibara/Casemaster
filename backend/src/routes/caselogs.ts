
import express from "express";
import { Request, Response } from "express";
import db from "../config/db";
import { google } from "googleapis";
import axios from "axios";
import dotenv from "dotenv"; // Import dotenv module
import { RowDataPacket, OkPacket } from "mysql2";

dotenv.config(); // Load .env file

const router = express.Router();

// Set up Google Drive API client
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS || "{}"),
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

// Endpoint to get all case logs with source = 'Email'

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

// Endpoint to get all case logs with source = 'Email'
router.get("/manual", (req: Request, res: Response) => {
  const sql = `
    SELECT id, case_no, title, date_added, status, source
    FROM caselogs
    WHERE source = 'Manual'
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

router.get("/caselogs/:id", (req: Request, res: Response) => {
  const { id } = req.params; // Get the ID from the request params

  // Query to fetch the case log by ID
  const sql =
    "SELECT id, case_no, title, date_added, status, source FROM caselogs WHERE id = ?";

  db.query(sql, [id], (err, results: any) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Failed to fetch case log by ID" });
      return;
    }

    if (results.length > 0) {
      // Case log found, return it
      res.status(200).json(results[0]); // Returning the first result (since we're fetching by ID, there should only be one result)
    } else {
      // Case log with the specified ID does not exist
      res.status(404).json({ error: "Case log not found" });
    }
  });
});

router.get("/caselogs/:id", (req: Request, res: Response) => {
  const { case_no, title, party_filer, case_type, file_url, tag, status, id } =
    req.body;
  // Query to fetch the case log by ID
  const sql =
    "SELECT id, case_no, title, date_added, status, source FROM caselogs WHERE id = ?";

  db.query(sql, [id], (err, results: any) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Failed to fetch case log by ID" });
      return;
    }

    if (results.length > 0) {
      // Case log found, return it
      res.status(200).json(results[0]); // Returning the first result (since we're fetching by ID, there should only be one result)
    } else {
      // Case log with the specified ID does not exist
      res.status(404).json({ error: "Case log not found" });
    }
  });
});

router.get("/check-case-existence/:caseNo", (req: Request, res: Response) => {
  const { caseNo } = req.params; // Get the caseNo from the request params

  // Query to check if the case number exists in the database
  const sql = "SELECT 1 FROM caselogs WHERE case_no = ?";
  db.query(sql, [caseNo], (err, results: any) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
      return;
    }

    if (results.length > 0) {
      // Case number exists
      res.status(200).json({ exists: true });
    } else {
      // Case number does not exist
      res.status(200).json({ exists: false });
    }
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
