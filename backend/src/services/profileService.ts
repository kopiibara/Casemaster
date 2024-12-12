
import { Request, Response } from 'express';
import db from '../config/db'; // Importing your database connection

export const saveProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, role, pin } = req.body;
    const image = req.file ? req.file.buffer : null; // Retrieve image buffer from the uploaded file

    // Validate required fields
    if (!name || !email || !phone || !role || !pin) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    // Insert the user data into the database
    const query = `
      INSERT INTO users (name, email, phone, role, image, pin)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await db.execute(query, [name, email, phone, role, image, pin]);

    res.status(201).json({
      message: 'Profile saved successfully.',
      userId: (result as any).insertId, // Returning the inserted user ID
    });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


export const getProfiles = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users';  
    db.query(query, (err, results: any[]) => {
      if (err) {
        console.error('Database Error:', err);
        return reject(err);
      }

      // Encode the image as Base64 if it exists
      const profiles = results.map(profile => {
        if (profile.image) {
          // Convert the image BLOB to a Base64 string
          profile.image = Buffer.from(profile.image).toString('base64');
        }
        return profile;
      });

      resolve(profiles);
    });
  });
};

