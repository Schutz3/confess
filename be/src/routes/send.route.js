import express from 'express';
import { sendMessage } from '../controller/send.controller.js';

const router = express.Router();

router.post('/', sendMessage);


export default router;