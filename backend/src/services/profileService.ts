import db from '../config/db';

export const saveProfile = (profileData: { name: string, role: string, image: Buffer | null, email: string, phone: number, pin:string }) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (name, email, phone, role, image, pin) VALUES (?, ?, ?, ?, ?,?)';
    db.query(query, [profileData.name, profileData.email, profileData.phone, profileData.role, profileData.image, profileData.pin], (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return reject(err);
      }
      console.log('Database Result:', result);
      resolve(result);
    });
  });
};

export const getProfiles = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users';  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database Error:', err);
        return reject(err);
      }
      resolve(results); 
    });
  });
};