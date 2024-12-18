import db from '../config/db'; // database connection
import { Request } from 'express';

interface Profile {
  name: string;
  email: string;
  phone: string;
  role: string;
  image: string; // Change this to string, as it will store the base64 encoded string
  pin: string;
  isApproved: number;
}

// Function to create a new user
export const createUser = (data: any) => {
  const { name, email, phone, role, pin, image, isApproved , isRemoved} = data;

  // Insert the base64 image string into the database
  const query = `INSERT INTO users (name, email, phone, role, pin, image, isApproved, isRemoved) 
                 VALUES (?, ?, ?, ?, ?, ?,?,?)`; 

  return new Promise((resolve, reject) => {
    db.query(query, [name, email, phone, role, pin, image, isApproved, isRemoved], (err, result) => {
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
    const query = 'SELECT * FROM users'; // Query to fetch all profiles
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

export const getProfilesUser = (req: Request) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users where isRemoved = 0'; // Query to fetch all profiles
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

export const removeProfileCard = (userId: number, isRemoved: number) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE users SET isRemoved = ?  WHERE user_id = ?`;

    db.query(query, [isRemoved, userId], (err, result: any) => {
      if (err) {
        reject(err);
      } else {
        if (result.affectedRows > 0) {
          resolve(true); // Profile card removal was successful
        } else {
          resolve(false); // No user found with the provided ID
        }
      }
    });
  });
};

export const addProfileCard = (userId: number, isRemoved: number) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE users SET isRemoved = ? WHERE user_id = ?`;

    db.query(query, [isRemoved, userId], (err, result: any) => {
      if (err) {
        reject(err);
      } else {
        if (result.affectedRows > 0) {
          resolve(true); // Profile card removal was successful
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

export const saveActionLog = (user_Id: number, message: string, action_date_time: string) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO auditlogs (user_id, action, action_date) VALUES (?, ?, ?)`;

    db.query(query, [user_Id, message, action_date_time], (err, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.affectedRows > 0); // Return true if the row was inserted successfully
      }
    });
  });
};


// Function to get all audit logs
export const getAuditLogs = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM auditlogs';  // Query to fetch all audit logs

    db.query(query, (err, results: any[]) => {
      if (err) {
        console.error('Database Error:', err);
        return reject(err);  // Reject if there's an error
      }

      resolve(results);  // Resolve with the audit logs data
    });
  });
};


//checkusername in database
export const checkUsernameExists = (email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
      const query = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
      db.query(query, [email], (err, results: any) => {
          if (err) {
              reject(err); 
          } else {
              const count = results[0]?.count || 0;
              resolve(count > 0); 
          }
      });
  });
};