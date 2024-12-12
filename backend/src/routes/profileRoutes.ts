import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { saveProfile, getProfiles } from '../services/profileService';

const router = express.Router();

// Configure multer to handle file uploads (memory storage for BLOB)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to save a profile
router.post('/save-profile', upload.single('image'), saveProfile);



router.get('/get-profiles', async (req, res, next) => {
  try {
    const profiles = await getProfiles();  // Get profiles from the database
    res.status(200).json(profiles);  // Return profiles as JSON response
  } catch (error) {
    next(error); 
  }
});

export default router;