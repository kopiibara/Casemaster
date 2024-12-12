import express from 'express';
import bodyParser from 'body-parser';
import profileRoutes from './routes/profileRoutes';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'; 
import emailRoutes from './routes/emailRoutes';
import smsRoutes from './routes/smsRoutes';
import fileUpload from 'express-fileupload';
import pool from '../src/config/db'; // Assuming you have a db module to handle database connections

dotenv.config({ path: path.resolve(__dirname, './config/.env') });
    
const app = express();
const PORT = process.env.PORT || 3304;

// CORS configuration options
const corsOptions = {
  origin: 'http://localhost:5173', // frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: '*',
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// Use routes
app.use('/api', profileRoutes);
app.use('/api', emailRoutes);
app.use('/api', smsRoutes);

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    const attachments = req.files ? Object.values(req.files).map(file => file.name) : [];

    // Save email to database
    const query = 'INSERT INTO emails (recipient, subject, body, attachments, status) VALUES (?, ?, ?, ?, ?)';
    const values = [to, subject, body, JSON.stringify(attachments), 'sent'];

    await pool.query(query, values);

    // Save attachments to disk or cloud storage
    if (req.files) {
      Object.values(req.files).forEach(file => {
        file.mv(`./uploads/${file.name}`, (err: any) => {
          if (err) {
            console.error('Error saving file:', err);
          }
        });
      });
    }

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/sent-emails', async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM emails WHERE status = ?', ['sent']);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching sent emails:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

