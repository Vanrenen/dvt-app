import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext.js';
import LoginForm from '../components/LoginForm.js';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('LoginForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should login successfully', async () => {
    const mockData = { data: { login: { token: 'test-token' } } };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const history = createMemoryHistory();
    render(
      <AuthProvider>
        <Router history={history}>
          <LoginForm />
        </Router>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => expect(history.location.pathname).toBe('/welcome'));
  });

  it('should handle login failure', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    const history = createMemoryHistory();
    render(
      <AuthProvider>
        <Router history={history}>
          <LoginForm />
        </Router>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() =>
      expect(screen.getByText(/failed to login. please try again./i)).toBeInTheDocument()
    );
  });
});
