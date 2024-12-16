import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';  // Import fs to read the file
import { getProfiles, approveAccount, transferRole } from '../services/profileService';
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
    const { name, email, phone, role, pin, isApproved } = req.body;
    const approved = isApproved === 'true'
    // If there's a file uploaded, convert it to base64
    let imageBase64 = null;
    if (req.file) {
      // Convert the buffer to a base64 string
      imageBase64 = req.file.buffer.toString('base64'); 
    }

    const query = `INSERT INTO users (name, email, phone, role, pin, image, isApproved) 
                   VALUES (?, ?, ?, ?, ?, ?,?)`;

    db.query(query, [name, email, phone, role, pin, imageBase64, approved], (err, result) => {
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
        image: imageBase64,
        isApproved  // Return the base64 image
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


router.put('/approve-account', async (req: Request, res: Response) => {
  const { userId, isApproved } = req.body;

  try {
    // Call the approveAccount service to update the user's approval status
    const result = await approveAccount(userId, isApproved);

    if (result) {
      res.status(200).json({ message: 'Account approved successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error approving account:', error);
    res.status(500).json({ message: 'Error approving account' });
  }
});



router.put('/transfer-role-clerk', async (req: Request, res: Response) => {
  const { userId } = req.body; // Only the userId is needed, as the role will be set to 'Branch Clerk' directly

  if (!userId) {
    res.status(400).json({ message: 'User ID is required' });
  }

  try {
   
    const result = await transferRole(userId, 'Branch Clerk');

    if (result) {
      res.status(200).json({ message: 'User role updated to Branch Clerk' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error transferring role:', error);
    res.status(500).json({ message: 'Error updating role' });
  }
});


router.put('/transfer-role-staff', async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const result = await transferRole(userId, 'Staff');

    if (result) {
      res.status(200).json({ message: 'User role updated to Staff' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error transferring role:', error);
    res.status(500).json({ message: 'Error updating role' });
  }
});


export default router;
