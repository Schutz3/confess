import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import dotenv from 'dotenv';
import { whitelist } from './whitelist.js';
import { isPhoneNumber } from './utils.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const url = process.env.FE_URL;
const App = process.env.APP_NAME;
const adminNumber = process.env.ADMIN_NUMBER + '@c.us';

let client;

const saveWhitelist = async (updatedWhitelist) => {
  try {
    const whitelistPath = path.join(__dirname, 'whitelist.js');
    const content = `export let whitelist = ${JSON.stringify(updatedWhitelist, null, 2)};`;
    await fs.writeFile(whitelistPath, content, 'utf8');
  } catch (error) {
    console.error('Error menyimpan: ', error);
  }
};

const initializeWhatsApp = async () => {
  const sessionDir = path.join(__dirname, '.wwebjs_auth');
  client = new Client({
    authStrategy: new LocalAuth({ clientId: "your_custom_id", dataPath: sessionDir }),
    puppeteer: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  });

  client.on('qr', (qr) => {
    console.log('Scan the QR code below to log in:');
    qrcode.generate(qr, { small: true });
  });

  client.on('ready', () => {
    console.log('WhatsApp client is ready!');
  });

  client.on('message', async (message) => {
    if (message.body.startsWith('!')) {
      await handleWhitelistCommand(message);
    }
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

const handleWhitelistCommand = async (message) => {
  const [command, ...args] = message.body.split(' ');
  const sender = message.from;

  if (sender !== adminNumber) {
    await client.sendMessage(sender, 'Lo ga diizinin make command ini');
    return;
  }

  switch (command.toLowerCase()) {
    case '!addwl':
      if (args.length === 1) {
        const numberToAdd = args[0];
        if (!isPhoneNumber(numberToAdd)) {
          await client.sendMessage(sender, `${numberToAdd} bukan no hp  yang valid`);
          return;
        }
        if (!whitelist.includes(numberToAdd)) {
          whitelist.push(numberToAdd);
          await saveWhitelist(whitelist);
          await client.sendMessage(sender, `Nambahin ${numberToAdd} ke daftar bekingan`);
        } else {
          await client.sendMessage(sender, `${numberToAdd} sudah ada di daftar bekingan`);
        }
      } else {
        await client.sendMessage(sender, 'Tutor: !addwl +62xxx');
      }
      break;

    case '!rmwl':
      if (args.length === 1) {
        const numberToRemove = args[0];
        const index = whitelist.indexOf(numberToRemove);
        if (index > -1) {
          whitelist.splice(index, 1);
          await saveWhitelist(whitelist);
          await client.sendMessage(sender, `menghapus ${numberToRemove} dari bekingan`);
        } else {
          await client.sendMessage(sender, `${numberToRemove} tidak di temukan`);
        }
      } else {
        await client.sendMessage(sender, 'Tutor: !rmwl +62xxx');
      }
      break;

    case '!listwl':
      const list = whitelist.join('\n');
      await client.sendMessage(sender, `Bekingan saat ini:\n${list}`);
      break;

    default:
      await client.sendMessage(sender, 'Perinath tidak ditemukan, perintah yang ada: !addwl, !rmwl, !listwl');
  }
};