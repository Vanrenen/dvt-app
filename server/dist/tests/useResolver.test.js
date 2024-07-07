import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import mongoose from 'mongoose';
import typeDefs from '../schema/typeDefs';
import { resolvers } from '../resolvers/userResolver';
import User from '../models/User';
import { config } from '../config';
const server = new ApolloServer({ typeDefs, resolvers });
const { mutate } = createTestClient(server);
describe('User Resolvers Negative Tests', () => {
    beforeAll(async () => {
        await mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        await User.deleteMany({});
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
    test('fails to register a user with existing username', async () => {
        await User.create({ username: 'testuser', password: 'password' });
        const REGISTER_USER = gql `
            mutation RegisterUser($username: String!, $password: String!) {
                registerUser(username: $username, password: $password) {
                    id
                    username
                }
            }
        `;
        const res = await mutate({
            mutation: REGISTER_USER,
            variables: { username: 'testuser', password: 'password' },
        });
        expect(res.errors).toBeDefined();
        expect(res.errors[0].message).toBe('Username already exists');
    });
    test('fails to login a user with incorrect password', async () => {
        await User.create({ username: 'testuser', password: await bcrypt.hash('correctpassword', 12) });
        const LOGIN_USER = gql `
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
});
