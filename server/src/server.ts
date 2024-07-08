import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/userResolver.js';
import { config } from './config.js';

const startServer = async () => {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            return { token };
        },
    });

    server.applyMiddleware({ app });

    await mongoose.connect(config.mongodbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions);

    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
};

startServer().catch((err) => {
    console.error('Failed to start server:', err);
});
