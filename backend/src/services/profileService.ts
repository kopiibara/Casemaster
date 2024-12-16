import db from '../config/db'; // database connection
import { Request } from 'express';

interface Profile {
  name: string;
  email: string;
  phone: string;
  role: string;
  image: string; // Change this to string, as it will store the base64 encoded string
  pin: string;
}

// Function to create a new user
export const createUser = (data: any) => {
  const { name, email, phone, role, pin, image } = data;

  // Insert the base64 image string into the database
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

// Modify the getProfiles function to return profiles with base64 image data
export const getProfiles = (req: Request) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results: any[]) => { // results is the rows array
      if (err) {
        console.error('Database Error:', err);
        return reject(err);
      }

      // Map through results to include image base64
      const profiles = results.map((profile: any) => {
        if (profile.image) {
          profile.image = `data:image/jpeg;base64,${profile.image}`;
        }
        return profile;
      });

      resolve(profiles); // Return profiles with base64 image data
    });
  });
};


