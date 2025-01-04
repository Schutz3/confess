import dontenv from 'dotenv';
import axios from 'axios';

dontenv.config();
const WEBHOOK = process.env.DC_LOG;

export const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  
  export const isPhoneNumber = (value) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (!value.startsWith('+')) {
      value = '+' + value;
    }
    if (value.length < 15 || value.length > 18) {
      return false;
    }

    return phoneRegex.test(value);
  };
  
  export const shouldSendMessage = (mode) => {
    if (mode === true) return true;
    if (mode === false) return Math.random() < 0.1;
    return false;
  };

  export const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  export const sendLogToDiscordWebhook = (data) => {
    if (!WEBHOOK) {
      console.error("No Discord webhook URL found in environment variables.");
      return;
    }
    const options = {
        method: 'POST',
        url: WEBHOOK,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: data }),
    };
    axios(options)
     .then(() => {
        console.log('Log sent to Discord');
      })
      .catch((error) => {
        console.error('Error sending log to Discord:', error);
      });
    
    };


  