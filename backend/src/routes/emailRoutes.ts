import express, { Request, Response } from 'express';
import { sendVerificationEmail } from '../services/emailService';

const router = express.Router();
const verificationCodes: Record<string, string> = {}; // In-memory storage

// Function to generate a 6-digit verification code
const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Ensures 6 digits
};

// Send verification email route
router.post('/send-verification-email', async (req: Request, res: Response): Promise<void> => {
  const { to } = req.body;

  if (!to) {
    res.status(400).json({ error: 'Recipient email is required' });
    return;
  }

  const code = generateVerificationCode();
  verificationCodes[to] = code; // Store the code in memory

  try {
    await sendVerificationEmail(to, code);
    res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

// Validate verification code route
router.post('/validate-verification-code', (req: Request, res: Response): void => {
  const { to, code } = req.body;

  if (!to || !code) {
    res.status(400).json({ error: 'Email and code are required' });
    return;
  }

  if (verificationCodes[to] && verificationCodes[to] === code) {
    delete verificationCodes[to]; // Clear the code after successful validation
    res.status(200).json({ message: 'Verification successful' });
  } else {
    res.status(400).json({ error: 'Invalid verification code' });
  }
});

export default router;
