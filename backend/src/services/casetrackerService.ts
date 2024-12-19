import db from '../config/db'; // database connection
import { Request } from 'express';

// Function to get all audit logs
export const getCaseTracker = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM casetracker';  // Query to fetch all audit logs

    db.query(query, (err, results: any[]) => {
      if (err) {
        console.error('Database Error:', err);
        return reject(err);  // Reject if there's an error
      }

      resolve(results);  // Resolve with the audit logs data
    });
  });
};

