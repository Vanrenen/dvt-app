import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../components/LoginForm';
import { MockedProvider } from '@apollo/client/testing';
import { LOGIN_USER } from '../graphql/mutations';

const mocks = [
    {
        request: {
            query: LOGIN_USER,
            variables: { username: 'testuser', password: 'password' },
        },
        result: {
            data: {
                loginUser: { token: 'testtoken' },
            },
        },
    },
];

describe('LoginForm Negative Tests', () => {
    test('shows error message on empty username', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <LoginForm />
            </MockedProvider>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

        fireEvent.click(screen.getByText(/login/i));

        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument();
        });
    });

    test('shows error message on empty password', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <LoginForm />
            </MockedProvider>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } });

        fireEvent.click(screen.getByText(/login/i));

        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument();
        });
    });

    test('shows error message on server error', async () => {
        const errorMocks = [
            {
                request: {
                    query: LOGIN_USER,
                    variables: { username: 'testuser', password: 'password' },
                },
                error: new Error('Server error'),
            },
        ];

        render(
            <MockedProvider mocks={errorMocks} addTypename={false}>
                <LoginForm />
            </MockedProvider>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

        fireEvent.click(screen.getByText(/login/i));

        await waitFor(() => {
            expect(screen.getByText(/server error/i)).toBeInTheDocument();
        });
    });

    test('shows error message on incorrect credentials', async () => {
        const errorMocks = [
            {
                request: {
                    query: LOGIN_USER,
                    variables: { username: 'wronguser', password: 'wrongpassword' },
                },
                result: {
                    errors: [{ message: 'Invalid credentials' }],
                },
            },
        ];

        render(
            <MockedProvider mocks={errorMocks} addTypename={false}>
                <LoginForm />
            </MockedProvider>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });

        fireEvent.click(screen.getByText(/login/i));

        await waitFor(() => {
            expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
        });
    });
});
