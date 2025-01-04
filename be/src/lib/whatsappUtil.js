import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import dotenv from 'dotenv';

dotenv.config();
const url = process.env.FE_URL;
const App = process.env.APP_NAME;

let client;

const initializeWhatsApp = async () => {
  client = new Client({
    authStrategy: new LocalAuth()
  });

  client.on('qr', (qr) => {
    console.log('Scan the QR code below to log in:');
    qrcode.generate(qr, { small: true });
  });

  client.on('ready', () => {
    console.log('WhatsApp client is ready!');
  });

  await client.initialize();
};

initializeWhatsApp().catch(console.error);

export const sendWhatsAppMessage = async (to, message, msg_id) => {
  if (!client) {
    console.log('WhatsApp client is not initialized. Initializing...');
    await initializeWhatsApp();
  }
  
  let msg = `${message}\n\n===================\nSent from ${App} at ${url} - ${new Date().toLocaleString()}\nMsg_Id: ${msg_id}\nTo report abuse, please contact us at report@scz.my.id`;

  let formattedNumber = to.replace(/^\+/, '').replace(/\D/g, '');
  
  if (formattedNumber.startsWith('0')) {
    formattedNumber = formattedNumber.slice(1);
  };

  const chatId = `${formattedNumber}@c.us`;

  try {
    await client.sendMessage(chatId, msg);
  } catch (error) {
    console.error(`Failed to send message to ${chatId}:`, error);
    throw error;
  }
};