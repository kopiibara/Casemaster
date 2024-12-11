import express from 'express';
import { sendSms } from '../services/smsService';

const router = express.Router();

router.post('/send-sms', async (req, res) => {
    const { from, to, text } = req.body;
  
    console.log('Sending SMS:', { from, to, text }); // Log the request details
  
    try {
      await sendSms(from, to, text);
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error in sending SMS:', error); // Log the error details
      res.status(500).json({ error: 'Failed to send SMS' });
    }
  });

export default router;