import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { getProfiles } from '../services/profileService';
import multer from 'multer';
import db from '../config/db'; // Import the DB connection

// Set up Multer for file upload
const uploadsDir = path.join(__dirname, '../uploads');

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Use the absolute path to the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename based on the timestamp
  },
});

const upload = multer({ storage });

const router = express.Router();

// POST route to create a user
router.post('/users', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, email, phone, role, pin } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null; // Store the relative path

    const query = `INSERT INTO users (name, email, phone, role, pin, image) 
                   VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [name, email, phone, role, pin, image], (err, result) => {
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
        image,
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
    // Serve static files (images) from the uploads directory


    const profiles = await getProfiles(req);  // Get profiles from the database
    res.status(200).json(profiles);  // Return profiles as JSON response
  } catch (error) {
    next(error);
  }
});

export default router;
