import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { saveProfile } from '../services/profileService';

const router = express.Router();

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Specify the folder where files should be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid conflicts
  },
});

const upload = multer({ storage });

// Route to handle profile setup with file upload
router.post('/save-profile', upload.single('profileImage'), async (req, res, next) => {
  try {
    const { name, role, email, phone } = req.body;

    if (!name || !role || !email || !phone) {
      res.status(400).json({ error: 'All fields (name, role, email, phone) are required.' });
      return;
    }

    let image: Buffer | null = null;

    if (req.file) {
  
      const filePath = path.join(uploadsDir, req.file.filename);
      image = fs.readFileSync(filePath);
    }

    const profileData = {
      name: name.trim(),
      role: role.trim(),
      email: email.trim(),
      phone: parseInt(phone, 10), 
      image,
    };

 
    await saveProfile(profileData); 
    res.status(200).json({ message: 'Profile saved successfully' });
  } catch (error) {
    next(error); 
  }
});

export default router;
