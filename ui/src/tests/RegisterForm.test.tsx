import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { REGISTER_USER } from '../graphql/mutations';

const mocks = [
    {
        request: {
            query: REGISTER_USER,
            variables: { username: 'testuser', password: 'password' },
        },
        result: {
            data: {
                registerUser: {
                    id: '1',
                    username: 'testuser',
                },
            },
        },
    },
];

const errorMocks = [
    {
        request: {
            query: REGISTER_USER,
            variables: { username: 'erroruser', password: 'password' },
        },
        error: new Error('User already exists'),
    },
];

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

test('renders RegisterForm and submits data', async () => {
    render(
        <ApolloProvider client={client}>
            <RegisterForm />
        </ApolloProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
        expect(screen.getByText('Registration successful!')).toBeInTheDocument();
    });
});

test('shows error message on registration failure', async () => {
    render(
        <MockedProvider mocks={errorMocks} addTypename={false}>
            <RegisterForm />
        </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'erroruser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
        expect(screen.getByText('Error: User already exists')).toBeInTheDocument();
    });
});
