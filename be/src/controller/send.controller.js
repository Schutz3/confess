import dotenv from 'dotenv';
import { sendEmail } from '../lib/emailUtil.js';
import { sendWhatsAppMessage } from '../lib/whatsappUtil.js';

dotenv.config();

const isEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const isPhoneNumber = (value) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(value);
};

const shouldSendMessage = (mode) => {
  if (mode === true) return true;
  if (mode === false) return Math.random() < 0.1;
  return false;
};

export const sendMessage = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ message: "No data provided" });
        }
        
        const requiredFields = ['mode', 'to', 'message'];
        for (const field of requiredFields) {
            if (!(field in data)) {
                return res.status(400).json({ message: `Missing required field: ${field}` });
            }
        }

        const { mode, to, message } = data;

        if (shouldSendMessage(mode)) {
            if (isEmail(to)) {
                await sendEmail(to, message);
            } else if (isPhoneNumber(to)) {
                await sendWhatsAppMessage(to, message);
            } else {
                return res.status(400).json({ message: "Invalid 'to' field. Must be an email or phone number." });
            }
        }

        res.status(200).json({ message: "Aman gan, sudah tersampaikan" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error '+ error.message });
    }
}