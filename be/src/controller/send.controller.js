import dotenv from 'dotenv';
import { sendEmail } from '../lib/emailUtil.js';
import { sendWhatsAppMessage } from '../lib/whatsappUtil.js';
import {
    isEmail,
    isPhoneNumber,
    shouldSendMessage,
    generateUniqueId,
    sendLogToDiscordWebhook,
    isWhitelisted
} from '../lib/utils.js';

dotenv.config();

export const sendMessage = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ message: "EMPTYYYY ?????" });
        }

        const requiredFields = ['mode', 'to', 'message'];
        for (const field of requiredFields) {
            if (!(field in data)) {
                return res.status(400).json({ message: `Missing some fields: ${field}` });
            }
        }
        if (!data.message || typeof data.message!=='string' || data.message.trim() === '' || data.message.length < 5) {
            return res.status(400).json({ message: "U have fkng unclear message" });
        }

        if (!data.details ||!Array.isArray(data.details) || data.details.length === 0) {
            return res.status(400).json({ message: "Something wrong with our API, Stupid backend" });
        }

        const msg_uuid = generateUniqueId();
        const messageDetails = {
            mode: data.mode,
            to: data.to,
            message: data.message,
            details: data.details[0]
        };

        let webhookEmbed = {
            color: 0x0099ff,
            title: "Details - UUID: " + msg_uuid,
            fields: Object.entries(messageDetails.details).map(([key, value]) => ({
                name: key,
                value: value.toString(),
                inline: true
            }))
        };
        let serviceType;

        if (isWhitelisted(messageDetails.to)) {
            return res.status(400).json({ message: 'Cant send to this contact bcz this contact is on our whitelist mode.' });
        } 
        if (shouldSendMessage(messageDetails.mode)) {
            if (isEmail(messageDetails.to)) {
                serviceType = "Email";
                webhookEmbed.fields.push({
                    name: "Service Type",
                    value: serviceType,
                    inline: true
                });
                sendLogToDiscordWebhook(webhookEmbed); //hanya log id aja ke webhook, untuk jaga jaga
                await sendEmail(messageDetails.to, messageDetails.message, msg_uuid);
                res.status(200).json({ message: "Confession sent" });
            } else if (isPhoneNumber(messageDetails.to)) {
                serviceType = "WhatsApp";
                webhookEmbed.fields.push({
                    name: "Service Type",
                    value: serviceType,
                    inline: true
                });
                sendLogToDiscordWebhook(webhookEmbed); //hanya log id aja ke webhook, untuk jaga jaga
                await sendWhatsAppMessage(messageDetails.to, messageDetails.message, msg_uuid);
                res.status(200).json({ message: "Confession sent" });
            } else {
                return res.status(400).json({ message: "Confession sent" });
            }
        }
        else {
            const loadingTime = Math.floor(Math.random() * (3500 - 2000 + 1) + 1000);
            setTimeout(() => {
                res.status(200).json({ message: "Confession sent" });
            }, loadingTime);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error ' + error.message });
    }
}