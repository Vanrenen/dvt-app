import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema/typeDefs';
import resolvers from './resolvers/userResolver';
import mongoose from 'mongoose';
import config from './config';

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ redisClient: { get: jest.fn(), set: jest.fn(), del: jest.fn() } })
});

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    return server.start();
}).then(() => {
    server.applyMiddleware({ app });
    app.listen({ port: config.port }, () =>
        console.log(`Server ready at http://localhost:${config.port}${server.graphqlPath}`)
    );
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});
