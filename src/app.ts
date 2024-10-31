import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

class App {
    public express: express.Application;
    constructor() {
        this.express = express();
        this.database();
        this.middlewares();
        this.routes();
    }

    private database() {
        mongoose.connect(process.env.MONGO_URI!)
            .then(() => console.log('Conectado ao MongoDB'))
            .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
    }

    private middlewares() {
        this.express.use(cors());
        this.express.use(express.static(path.join(process.cwd(), 'src', 'public')))
        this.express.use(express.json());
        
    }

    private routes() {
        this.express.use('/api', routes);
    }

}

export default new App().express;