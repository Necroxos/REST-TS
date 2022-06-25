import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import apiRoutes from './server/api';
import { loadConfig } from './config';
import { loadDBConnection } from './db';
import compression from 'compression';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        const appConfig = loadConfig();
        loadDBConnection({ dbUri: appConfig.DB_URI }, { user: appConfig.DB_USER, pass: appConfig.DB_PASS });
        // Settings
        this.app.set('port', appConfig.PORT);
        // Middlewares
        this.app.use(cors())
            .use(helmet())
            .use(morgan('dev'))
            .use(compression())
            .use(express.json())
            .use(express.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use(apiRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Escuchando el puerto:', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();