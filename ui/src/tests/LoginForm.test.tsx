import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mock useHistory
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const theme = createTheme({
  palette: {
      primary: {
          main: '#1976d2',
      },
      secondary: {
          main: '#dc004e',
      },
  },
});

test('renders LoginForm and performs login', async () => {
  render(
    <ThemeProvider theme={theme}>
    <AuthProvider>
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    </AuthProvider>
    </ThemeProvider>
  );

  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(screen.queryByText(/failed to login/i)).not.toBeInTheDocument();
  });
});
