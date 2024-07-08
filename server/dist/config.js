import dotenv from 'dotenv';
dotenv.config();
export var config = {
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
};
