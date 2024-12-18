import db from '../config/db'; // database connection
import { Request } from 'express';

interface Profile {
  name: string;
  email: string;
  phone: string;
  role: string;
  image: string; // Change this to string, as it will store the base64 encoded string
  pin: string;
  isApproved: boolean;
}

// Function to create a new user
export const createUser = (data: any) => {
  const { name, email, phone, role, pin, image, isApproved } = data;

  // Insert the base64 image string into the database
  const query = `INSERT INTO users (name, email, phone, role, pin, image, isApproved) 
                 VALUES (?, ?, ?, ?, ?, ?,?)`; 

  return new Promise((resolve, reject) => {
    db.query(query, [name, email, phone, role, pin, image, isApproved], (err, result) => {
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


export const approveAccount = (userId: number, isApproved: boolean) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE users SET isApproved = ? WHERE user_id = ?`;

    db.query(query, [isApproved, userId], (err, result: any) => {
      if (err) {
        reject(err);
      } else {
        if (result.affectedRows > 0) {
          resolve(true); // Account approval was successful
        } else {
          resolve(false); // No user found with the provided ID
        }
      }
    });
  });
};

// Function to update the role of a user to 'Branch Clerk'
export const transferRole = (userId: number, newRole: string) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE users SET role = ? WHERE user_id = ?`;

    db.query(query, [newRole, userId], (err, result: any) => {
      if (err) {
        reject(err);
      } else {
        if (result.affectedRows > 0) {
          resolve(true); // Role updated successfully
        } else {
          resolve(false); // No user found with the provided ID
        }
      }
    });
  });
};

