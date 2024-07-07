import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose, {ConnectOptions} from 'mongoose';
import dotenv from 'dotenv';
import typeDefs from './schema/typeDefs';
import { resolvers } from './resolvers/userResolver';
import { createClient } from 'redis';
import { startStandaloneServer } from '@apollo/server/standalone';
import { BaseContext } from '@apollo/server';

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
  });

  const { url } = await startStandaloneServer<BaseContext>(server, {
    listen: { port: 4000 },
  });

  server.applyMiddleware({ app });

  await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  await redisClient.connect();

  console.log(`server ready at: ${url}`);

  // app.listen({ port: 4000 }, () =>
  //   console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  // );
};

startServer();
