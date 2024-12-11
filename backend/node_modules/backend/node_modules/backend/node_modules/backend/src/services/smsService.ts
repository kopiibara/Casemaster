import { Vonage } from '@vonage/server-sdk';
import dotenv from 'dotenv';
import path from 'path';
import vonage from '../config/vonageConfig';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

export const sendSms = (from: string, to: string, text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    vonage.message.sendSms(from, to, text, (err: Error | null, responseData: any) => {
      if (err) {
        console.error('Error sending SMS:', err);
        return reject(err);
      }
      if (responseData) {
        console.log('Response data:', responseData);
        if (responseData.messages && responseData.messages[0]) {
          const status = responseData.messages[0]['status'];
          console.log('SMS Status:', status);
          if (status === '0') {
            console.log('Message sent successfully.');
            resolve();
          } else {
            console.error('Failed to send message. Status:', status, 'Error details:', responseData);
            reject(new Error(`Failed to send SMS with status: ${status}`));
          }
        } else {
          console.error('Invalid response data:', responseData);
          reject(new Error('Invalid response data'));
        }
      } else {
        console.error('No response data received.');
        reject(new Error('No response data received'));
      }
    });
  });
};