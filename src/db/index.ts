import mongoose from 'mongoose';
import { loadConfig } from '../config';

interface MongoDBConnectionOptions {
  dbUri: string
}

interface UserOptions {
  user: string
  pass: string
}

export function loadDBConnection({ dbUri }: MongoDBConnectionOptions, user: UserOptions) {
    const appConfig = loadConfig();
    const options: mongoose.ConnectOptions = {
        authSource: 'admin',
        autoIndex: true,
        user: user.user,
        pass: user.pass
    };

    mongoose.connect(dbUri, options,
        (err) => {
            if (err) {
                console.log('Error al conectar a la base de datos');
                throw err;
            }
            console.log(`Conectado a la BD: ${appConfig.DB_URI}`);
        });
}
