import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

interface ConfigInfo {
  NODE_ENV: string
  PORT: number
  DB_URI: string
  DB_USER: string
  DB_PASS: string
}

function loadConfig() {
    const configSchema = Joi.object<ConfigInfo>({
        NODE_ENV: Joi.string().valid('development', 'production').required(),
        PORT: Joi.number().required(),
        DB_URI: Joi.string().uri().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
    });

    const {error, value} = configSchema.validate(process.env, {allowUnknown: true});
    console.log('Variables de entorno cargadas');

    if (error) throw error;
    return {...value} as ConfigInfo;
}

export {loadConfig};
