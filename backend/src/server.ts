import express from 'express';
import bodyParser from 'body-parser';
import profileRoutes from './routes/profileRoutes';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'; 
import emailRoutes from './routes/emailRoutes';
import smsRoutes from './routes/smsRoutes';

dotenv.config({ path: path.resolve(__dirname, './config/.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration options
const corsOptions = {
  origin: 'http://localhost:5173', //frontebnd URL bhie
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: '*',
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());


//dito mo ilalagay mga routes na nasave sa routes folder
app.use('/api', profileRoutes);
app.use('/api', emailRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

