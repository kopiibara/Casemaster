import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';  // Import fs to read the file
import { getProfiles } from '../services/profileService';
import multer from 'multer';
import db from '../config/db'; // Import the DB connection

// Set up Multer for file upload
const uploadsDir = path.join(__dirname, '../uploads');

// Set up Multer for file upload (we'll still need to receive the file first)
const storage = multer.memoryStorage(); // Use memory storage to handle the file as a buffer
const upload = multer({ storage });

const router = express.Router();

// POST route to create a user
router.post('/users', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, email, phone, role, pin } = req.body;

    // If there's a file uploaded, convert it to base64
    let imageBase64 = null;
    if (req.file) {
      // Convert the buffer to a base64 string
      imageBase64 = req.file.buffer.toString('base64'); 
    }

    const query = `INSERT INTO users (name, email, phone, role, pin, image) 
                   VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [name, email, phone, role, pin, imageBase64], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error creating user' });
      }

      // Respond with the created user data (omit auto-generated fields like ID)
      res.status(201).json({
        name,
        email,
        phone,
        role,
        pin,
        image: imageBase64,  // Return the base64 image
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Handle GET request to fetch profiles
router.get('/get-profiles', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profiles = await getProfiles(req);  // Get profiles from the database
    res.status(200).json(profiles);  // Return profiles as JSON response
  } catch (error) {
    next(error);
  }
});

export default router;
