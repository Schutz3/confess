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
    if (!value) {
        return false;
    } 
    else if (typeof value !== 'string') {
        return false;
    }
    else if (value.length > 18) {
        return false;
    }
    else if (value.length < 10) {
        return false;
    }
    else if (!/^\+?[0-9]+$/.test(value)) {
        return false;
    }
    else if (!phoneRegex.test(value)) {
        return false;
    }
    else return true;
};
  
  export const shouldSendMessage = (mode) => {
    if (mode === true) return true;
    if (mode === false) return Math.random() < 0.1;
    return false;
  };

  export const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  export const sendLogToDiscordWebhook = async (embed) => {
    try {
        if (!WEBHOOK) {
            return;
        }
        const safeEmbed = {
            title: embed.title || 'Subbited Confession',
            color: embed.color || 0x0099ff,
            fields: Array.isArray(embed.fields) ? embed.fields.map(field => ({
                name: field.name || 'Field',
                value: field.value || 'No value',
                inline: !!field.inline
            })) : [],
            timestamp: new Date().toISOString()
        };

        const payload = {
            embeds: [safeEmbed]
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'ConfessBot/1.0'
            }
        };

        const response = await axios.post(WEBHOOK, payload, config);
    } catch (error) {
        console.error('Error sending log to Discord webhook:', error.message);
    }
};


  