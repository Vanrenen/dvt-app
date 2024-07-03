import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from '../components/RegisterForm';
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
        registerUser: { id: '1', username: 'testuser' },
      },
    },
  },
];

describe('RegisterForm Negative Tests', () => {
  test('shows error message on empty username', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByText(/register/i));

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  test('shows error message on empty password', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } });

    fireEvent.click(screen.getByText(/register/i));

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  test('shows error message on server error', async () => {
    const errorMocks = [
      {
        request: {
          query: REGISTER_USER,
          variables: { username: 'testuser', password: 'password' },
        },
        error: new Error('Server error'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <RegisterForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByText(/register/i));

    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument();
    });
  });
});
