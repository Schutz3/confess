import dotenv from 'dotenv';
import { sendEmail } from '../lib/emailUtil.js';
import { sendWhatsAppMessage } from '../lib/whatsappUtil.js';
import { isEmail, isPhoneNumber, shouldSendMessage, generateUniqueId, sendLogToDiscordWebhook } from '../lib/utils.js';

dotenv.config();

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
        const msg_uuid = generateUniqueId();
        const messageDetails = {
            mode: data.mode,
            to: data.to,
            message: data.message,
            details: data.details.map(detail => ({
                field: detail.key,
                value: detail.value
            }))
        };

        let webhookEmbed = {
            color: 0x0099ff,
            title: "Details - UUID: " + msg_uuid,
            fields: messageDetails.details.map(detail => ({
                name: detail.field,
                value: detail.value,
                inline: true
            }))
        };

        if (shouldSendMessage(messageDetails.mode)) {
            if (isEmail(messageDetails.to)) {
                await sendEmail(messageDetails.to, messageDetails.message);
                sendLogToDiscordWebhook(webhookEmbed); //hanya log id jada ke webhook, untuk jaga jaga
            } else if (isPhoneNumber(messageDetails.to)) {
                await sendWhatsAppMessage(messageDetails.to, messageDetails.message);
                sendLogToDiscordWebhook(webhookEmbed); //hanya log id jada ke webhook, untuk jaga jaga
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