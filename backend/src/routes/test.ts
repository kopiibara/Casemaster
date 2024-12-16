import express, { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure the 'uploads' directory exists
const uploadsPath = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// Middleware to handle file uploads
router.use(fileUpload());

// Handle POST request for file upload
router.post('/upload', (req: Request, res: Response) => {
  if (!req.files || !req.files.image) {
    res.status(400).send('No file uploaded.');
  }

  const image = req.files.image;
  const uploadPath = path.join(uploadsPath, image.name);

  // Move the file to the 'uploads' directory
  image.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(`File uploaded successfully: ${image.name}`);
  });
});

export default router;
