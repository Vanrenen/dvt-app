import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext.js';
import RegisterForm from '../components/RegisterForm.js';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('RegisterForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should register successfully', async () => {
    const mockData = { data: { register: { token: 'test-token' } } };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const history = createMemoryHistory();
    render(
      <AuthProvider>
        <Router history={history}>
          <RegisterForm />
        </Router>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText(/register/i));

    await waitFor(() => expect(history.location.pathname).toBe('/welcome'));
  });

  it('should handle register failure', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    const history = createMemoryHistory();
    render(
      <AuthProvider>
        <Router history={history}>
          <RegisterForm />
        </Router>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText(/register/i));

    await waitFor(() =>
      expect(screen.getByText(/failed to register. please try again./i)).toBeInTheDocument()
    );
  });
});
