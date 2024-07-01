import request from 'supertest';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from '../schema/typeDefs';
import resolvers from '../resolvers/userResolver';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ redisClient: { get: jest.fn(), set: jest.fn(), del: jest.fn() } })
});

let app: any;

beforeAll(async () => {
    app = await server.start();
    await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
    await server.stop();
});

const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    registerUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;

test('Register a new user', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: REGISTER_USER,
        variables: {
          username: 'testuser',
          password: 'password',
        },
      });

    expect(response.body.data.registerUser.username).toBe('testuser');
});

test('Login a user', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: LOGIN_USER,
        variables: {
          username: 'testuser',
          password: 'password',
        },
      });

    expect(response.body.data.loginUser.token).toBeDefined();
});

test('Fail to register a user with an existing username', async () => {
    // First registration should succeed
    await request(app)
      .post('/graphql')
      .send({
        query: REGISTER_USER,
        variables: {
          username: 'duplicateuser',
          password: 'password',
        },
      });

    // Second registration with the same username should fail
    const response = await request(app)
      .post('/graphql')
      .send({
        query: REGISTER_USER,
        variables: {
          username: 'duplicateuser',
          password: 'password',
        },
      });

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe('Username already exists');
});

test('Fail to login with wrong credentials', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: LOGIN_USER,
        variables: {
          username: 'nonexistentuser',
          password: 'wrongpassword',
        },
      });

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe('Invalid credentials');
});
