import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/userResolver.js';
import {
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageLocalDefault
   } from 'apollo-server-core';

dotenv.config();

const startServer = async () => {
    const app = express();
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        plugins: [
            process.env.NODE_ENV === "production"
              ? ApolloServerPluginLandingPageProductionDefault({
                  embed: true,
                  graphRef: "plaid-gufzoj@current"
                })
              : ApolloServerPluginLandingPageLocalDefault({ embed: true })
         ]
    });

    await server.start();
    server.applyMiddleware({ app });

    await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions);


    app.listen({ port: 4000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();
