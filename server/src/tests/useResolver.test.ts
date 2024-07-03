import { gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import mongoose from 'mongoose';
import typeDefs from '../schema/typeDefs';
import resolvers from '../resolvers/userResolver';
import { ApolloServer } from 'apollo-server-express';
import User from '../models/User';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { query, mutate } = createTestClient(server);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/myapp_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Resolver Negative Tests', () => {
  test('fails to register a user with an existing username', async () => {
    await new User({ username: 'duplicateuser', password: 'password' }).save();

    const REGISTER_USER = gql`
            mutation RegisterUser($username: String!, $password: String!) {
                registerUser(username: $username, password: $password) {
                    id
                    username
                }
            }
        `;

    const res = await mutate({
      mutation: REGISTER_USER,
      variables: { username: 'duplicateuser', password: 'password' },
    });

    expect(res.errors).toBeDefined();
    expect(res.errors[0].message).toBe('Username already exists');
  });

  test('fails to login with incorrect credentials', async () => {
    await new User({ username: 'testuser', password: 'password' }).save();

    const LOGIN_USER = gql`
            mutation LoginUser($username: String!, $password: String!) {
                loginUser(username: $username, password: $password) {
                    token
                }
            }
        `;

    const res = await mutate({
      mutation: LOGIN_USER,
      variables: { username: 'testuser', password: 'wrongpassword' },
    });

    expect(res.errors).toBeDefined();
    expect(res.errors[0].message).toBe('Invalid credentials');
  });

  test('fails to register a user with empty username', async () => {
    const REGISTER_USER = gql`
            mutation RegisterUser($username: String!, $password: String!) {
                registerUser(username: $username, password: $password) {
                    id
                    username
                }
            }
        `;

    const res = await mutate({
      mutation: REGISTER_USER,
      variables: { username: '', password: 'password' },
    });

    expect(res.errors).toBeDefined();
    expect(res.errors[0].message).toBe('Username cannot be empty');
  });

  test('fails to register a user with empty password', async () => {
    const REGISTER_USER = gql`
            mutation RegisterUser($username: String!, $password: String!) {
                registerUser(username: $username, password: $password) {
                    id
                    username
                }
            }
        `;

    const res = await mutate({
      mutation: REGISTER_USER,
      variables: { username: 'testuser', password: '' },
    });

    expect(res.errors).toBeDefined();
    expect(res.errors[0].message).toBe('Password cannot be empty');
  });
});
