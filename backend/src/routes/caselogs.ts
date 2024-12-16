import express from "express";
import multer from "multer";
import AWS from "aws-sdk";
import pool from "../config/db"; // Database connection

const router = express.Router();

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/upload",
  upload.single("file"),
  async (req, res): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded." });
      return;
    }

    if (!process.env.AWS_BUCKET_NAME) {
      res.status(500).json({ message: "AWS_BUCKET_NAME is not defined." });
      return;
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    try {
      const uploadResult = await s3.upload(params).promise();
      res.status(200).json({ fileUrl: uploadResult.Location });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Failed to upload file." });
    }
  }
);

router.post("/caselogs", async (req, res) => {
  const {
    caseNo,
    caseTitle,
    partyFiler,
    caseType,
    source,
    emailLink,
    file_name,
    file_url,
  } = req.body;

  try {
    const query = `
      INSERT INTO caselogs (case_no, title, party_filer, case_type, status, source, email_link, file_name, file_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      caseNo,
      caseTitle,
      partyFiler,
      caseType,
      "Pending", // Default status
      source,
      emailLink,
      file_name,
      file_url,
    ];

    await pool.query(query, values);
    res.status(201).json({ message: "Case log saved successfully." });
  } catch (error) {
    console.error("Error saving case log:", error);
    res.status(500).json({ message: "Failed to save case log." });
  }
});

export default router;
