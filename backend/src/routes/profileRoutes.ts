
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs"; // Import fs to read the file
import {
  getProfiles,
  approveAccount,
  transferRole,
  saveActionLog,
  getAuditLogs,
  checkUsernameExists,
  removeProfileCard,
  addProfileCard,
  getProfilesUser,
} from "../services/profileService";
import multer from "multer";
import db from "../config/db"; // Import the DB connection

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';  // Import fs to read the file
import { getProfiles, approveAccount, transferRole, saveActionLog, getAuditLogs, checkUsernameExists, removeProfileCard, addProfileCard , getProfilesUser, setNewPin} from '../services/profileService';
import multer from 'multer';
import db from '../config/db'; // Import the DB connection
import { set } from 'mongoose';


// Set up Multer for file upload
const uploadsDir = path.join(__dirname, "../uploads");

// Set up Multer for file upload (we'll still need to receive the file first)
const storage = multer.memoryStorage(); // Use memory storage to handle the file as a buffer
const upload = multer({ storage });

const router = express.Router();

// POST route to create a user
router.post(
  "/users",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { name, email, phone, role, pin, isApproved, isRemoved } = req.body;
      const approved = isApproved === "true";
      // If there's a file uploaded, convert it to base64
      let imageBase64 = null;
      if (req.file) {
        imageBase64 = req.file.buffer.toString("base64");
      }
      const query = `INSERT INTO users (name, email, phone, role, pin, image, isApproved, isRemoved) 
                   VALUES (?, ?, ?, ?, ?, ?,?, ?)`;

      db.query(
        query,
        [name, email, phone, role, pin, imageBase64, approved, isRemoved],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error creating user" });
          }
          res.status(201).json({
            name,
            email,
            phone,
            role,
            pin,
            image: imageBase64,
            isApproved,
            isRemoved, // Return the base64 image
          });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating user" });
    }
  }
);

// Handle GET request to fetch profiles
router.get(
  "/get-profiles",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profiles = await getProfiles(req); // Get profiles from the database
      res.status(200).json(profiles); // Return profiles as JSON response
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/get-profiles-user",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profiles = await getProfilesUser(req); // Get profiles from the database
      res.status(200).json(profiles); // Return profiles as JSON response
    } catch (error) {
      next(error);
    }
  }
);

router.put("/approve-account", async (req: Request, res: Response) => {
  const { userId, isApproved } = req.body;

  try {
    // Call the approveAccount service to update the user's approval status
    const result = await approveAccount(userId, isApproved);

    if (result) {
      res.status(200).json({ message: "Account approved successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error approving account:", error);
    res.status(500).json({ message: "Error approving account" });
  }
});

router.put("/remove-profile-card", async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const result = await removeProfileCard(userId, 1);
    if (result) {
      res.status(200).json({ message: "Account removed successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error approving account:", error);
    res.status(500).json({ message: "Error approving account" });
  }
});

router.put("/add-profile-card", async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const result = await addProfileCard(userId, 0);
    if (result) {
      res.status(200).json({ message: "Account added successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error approving account:", error);
    res.status(500).json({ message: "Error approving account" });
  }
});

router.put("/transfer-role-clerk", async (req: Request, res: Response) => {
  const { userId } = req.body; // Only the userId is needed, as the role will be set to 'Branch Clerk' directly

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
  }
  try {
    const result = await transferRole(userId, "Branch Clerk");
    if (result) {
      res.status(200).json({ message: "User role updated to Branch Clerk" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error transferring role:", error);
    res.status(500).json({ message: "Error updating role" });
  }
});

router.put("/transfer-role-staff", async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
  }

  try {
    const result = await transferRole(userId, "Staff");

    if (result) {
      res.status(200).json({ message: "User role updated to Staff" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error transferring role:", error);
    res.status(500).json({ message: "Error updating role" });
  }
});

router.post("/action-log", async (req: Request, res: Response) => {
  const { user_Id, message, action_date_time } = req.body;

  if (!user_Id || !message || !action_date_time) {
    res.status(400).json({
      message: "All fields (user_Id, message, action_date_time) are required",
    });
  }
  try {
    // Call the service function to save the action log
    const result = await saveActionLog(user_Id, message, action_date_time);

    if (result) {
      res.status(201).json({ message: "Action log saved successfully" });
    } else {
      res.status(500).json({ message: "Failed to save action log" });
    }
  } catch (error) {
    console.error("Error saving action log:", error);
    res.status(500).json({ message: "Error saving action log" });
  }
});

// Route to fetch all audit logs
router.get("/auditlogs", async (req: Request, res: Response) => {
  try {
    const logs = await getAuditLogs(); // Get audit logs from the database
    res.status(200).json(logs); // Return the audit logs as JSON response
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    res.status(500).json({ message: "Error fetching audit logs" });
  }
});

const getAuditLogsByUserId = async (userId: string) => {
  try {
    // Execute the query and destructure the result to get rows and fields
    const [rows]: any = await db.execute(
      "SELECT * FROM auditlogs WHERE user_id = ?",
      [userId]
    );

    // Log the rows to ensure you're getting the correct data
    console.log("Fetched logs:", rows);

    // Return the rows containing the audit logs
    return rows;
  } catch (error) {
    console.error("Error fetching logs by user_id:", error);
    throw new Error("Error fetching logs by user_id");
  }
};

router.get("/check-user", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Username is required" });
  }
  try {
    const exists = await checkUsernameExists(email);
    if (exists) {
      res.status(200).json({ message: "User exists" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.put('/change-pin', async (req: Request, res: Response) => {
  const { userId, pin } = req.body;

  if (!userId || !pin) {
    res.status(400).json({ message: 'User ID and PIN are required' });
  }

  try {
    const result = await setNewPin(userId, pin); // Pass userId first, then pin
    if (result) {
      res.status(200).json({ message: 'PIN updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating PIN:', error);
    res.status(500).json({ message: 'Error updating PIN' });
  }
});


export default router;

