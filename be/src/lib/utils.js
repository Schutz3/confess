import dontenv from 'dotenv';
import axios from 'axios';
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { whitelist } from './whitelist.js';


dontenv.config();
const WEBHOOK = process.env.DC_LOG;

export const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  
  export const isPhoneNumber = (value) => {
    if (!value) {
        return false;
    } 
    else if (!isPossiblePhoneNumber(value)) {
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

export const isWhitelisted = (to) => {
    const cleanedTo = to.replace(/\s/g, '');
    return whitelist.includes(cleanedTo);
};

export const isNotWhitelisted = (to) => {
    return !isWhitelisted(to);
};


  