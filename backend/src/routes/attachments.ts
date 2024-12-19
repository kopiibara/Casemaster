import express from 'express';
import db from '../config/db';

const router = express.Router();

// Fetch all attachments
router.get('/attachments', (req, res) => {
  const query = 'SELECT attachment_id, matter_id, file_path, uploaded_by, uploaded_at, file_name, file_size, file_type FROM attachments';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Failed to fetch attachments' });
    }
    res.status(200).json(results);
  });
});

// Rename attachment
router.put('/attachments/:id', (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;
  const query = 'UPDATE attachments SET file_name = ? WHERE attachment_id = ?';
  db.query(query, [newName, id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Failed to rename attachment' });
    }
    res.status(200).json({ message: 'Attachment renamed successfully' });
  });
});

// Move attachment
router.put('/attachments/:id/move', (req, res) => {
  const { id } = req.params;
  const { newFolderId } = req.body;
  const query = 'UPDATE attachments SET matter_id = ? WHERE attachment_id = ?';
  db.query(query, [newFolderId, id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Failed to move attachment' });
    }
    res.status(200).json({ message: 'Attachment moved successfully' });
  });
});

export default router;