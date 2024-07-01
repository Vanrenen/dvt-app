import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import typeDefs from './schema/typeDefs';
import resolvers from './resolvers/userResolver';
import { createClient } from 'redis';

dotenv.config();

// Initialize Redis client
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

const startServer = async () => {
    const app = express();
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: () => ({ redisClient })
    });

    await server.start();
    server.applyMiddleware({ app });

    await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await redisClient.connect();

    app.listen({ port: 4000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();
