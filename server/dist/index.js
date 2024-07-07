import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import typeDefs from './schema/typeDefs.js';
import { resolvers } from './resolvers/userResolver.js';
import { createClient } from 'redis';
import { MongoClient, ServerApiVersion } from 'mongodb';
dotenv.config();
// Initialize Redis client
// const redisClient = createClient({
//   url: process.env.REDIS_URL || 'redis://localhost:6379'
// });
// redisClient.on('error', (err) => console.log('Redis Client Error', err));
const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });

const uri = "mongodb+srv://vanrenenvrc:iF7pS79SXrIn6biK@derivcoassessment.kqsemqm.mongodb.net/?retryWrites=true&w=majority&appName=DerivcoAssessment";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

  
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('SERVER STARTED');
  // await redisClient.connect();
  app.listen({ port: 4000 }, () => console.log(`Server ready at http://localhost:4000${server.graphqlPath}`));
};
startServer();
