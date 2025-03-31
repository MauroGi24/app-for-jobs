import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import morgan from 'morgan';
import jobRouter from './routes/jobRoute.js';
import questionRouter from './routes/questionRoute.js';

const server = express();
server.use(express.json());
const port = process.env.PORT;
const keyDB = process.env.MONGO_DB_CONNECTION;

server.use(morgan('dev'))
server.use(helmet());
server.use(cors());

server.use("/api/v1/", jobRouter)
server.use("/api/v1/", questionRouter)

server.listen(port, () => {
    console.log(`Il server è partito alla porta ${port}`);
});

server.on('error', (error) => {
    console.error('Server error:', error);
});

const connectDB = async () => {
    try {
        await mongoose.connect(keyDB);
        console.log('Connessione al database avvenuta con successo');
    } catch (err) {
        console.error('Errore di connessione al database:', err);
    }
};

connectDB();
