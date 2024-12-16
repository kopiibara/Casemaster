import db from '../config/db'; // database connection
import fs from 'fs';
import path from 'path';


interface Profile {
  name: string;
  email: string;
  phone: string;
  role: string;
  image: Buffer; // Store the image path (string) instead of Buffer
  pin: string;
}
// Function to create a new user
export const createUser = (data: any) => {
  const { name, email, phone, role, pin, image } = data;

  const query = `INSERT INTO users (name, email, phone, role, pin, image) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

  return new Promise((resolve, reject) => {
    db.query(query, [name, email, phone, role, pin, image], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

import { Request } from 'express';
// Modify the getProfiles function to accept the request object
export const getProfiles = (req: Request) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results: any[]) => {
      if (err) {
        console.error('Database Error:', err);
        return reject(err);
      }

      // Get the base URL from the request
      const baseUrl = `${req.protocol}://${req.get('host')}/`;

      // Map through results to construct image URLs
      const profiles = results.map(profile => {
        if (profile.image) {
          // Ensure no duplicate 'uploads/' in the path
          profile.image = `${baseUrl}${profile.image}`;
        }
        return profile;
      });

      resolve(profiles); // Return the profiles with image URLs
    });
  });
};
