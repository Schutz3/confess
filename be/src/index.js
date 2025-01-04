import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import path from 'path';
import sendRoutes from './routes/send.route.js';


dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();
const FE_URL = process.env.FE_URL;

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173','http://10.0.0.3', FE_URL],
    credentials: true,
  }));

if (process.env.NODE_ENV === 'prod') {
    app.use(express.static(path.join(__dirname, '../fe/dist')));
    
    app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../fe', 'dist', 'index.html'));
   });
}
app.use('/api/send',  sendRoutes);
server.listen(PORT, () => { 
    console.log('Server is running on port: ' + PORT);
    console.log('Press Ctrl + C to stop server.');
    console.log('Front-end URL: ' + FE_URL);
});