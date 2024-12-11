import express, { Request, Response } from 'express';
import { sendVerificationEmail } from '../services/emailService';

const router = express.Router();

// Function to generate a 6-digit verification code
const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Ensures 6 digits
};

router.post('/send-verification-email', async (req: Request, res: Response): Promise<void> => {
    const { to } = req.body;

    // Debugging: Check if the request body contains the `to` field
    console.log('Request body:', req.body);

    if (!to) {
      res.status(400).json({ error: 'Recipient email is required' });
      return;
    }

    // Generate a verification code
    const code = generateVerificationCode();

    try {
      // Debugging: Log recipient email and verification code
      console.log(`Sending verification email to: ${to}`);
      console.log(`Verification code: ${code}`);

      await sendVerificationEmail(to, code);
      res.status(200).json({ message: 'Verification email sent successfully', code });
    } catch (error) {
      // Debugging: Log error details
      console.error('Error sending verification email:', error);

      res.status(500).json({ error: 'Failed to send verification email' });
    }
});

export default router;