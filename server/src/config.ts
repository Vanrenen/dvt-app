import { config } from 'dotenv';

const ENV = process.env.NODE_ENV || 'development';

switch (ENV) {
    case 'test':
        config({ path: '.env.test' });
        break;
    case 'production':
        config({ path: '.env.production' });
        break;
    default:
        config({ path: '.env' });
}

export default {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
};
