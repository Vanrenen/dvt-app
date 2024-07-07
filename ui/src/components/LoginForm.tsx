import React, { useState, FC, ChangeEvent, useEffect } from 'react';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import { useLogin } from '../hooks/useLogin';
import FormContainer from './FormContainer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm: FC = () => {
  const { mutate, isLoading, error } = useLogin();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formError, setFormError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/welcome');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.username || !formData.password) {
      setFormError('Username and password are required');
      return;
    }

    setFormError(null);

    mutate(formData, {
      onSuccess: (data: any) => {
        login(data.token);
        navigate('/welcome');
      },
      onError: (err: any) => {
        console.error('Login error:', err);
        setFormError('Failed to login. Please try again.');
      }
    });
  };

  return (
    <FormContainer>
      <Typography variant="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      {formError && (
        <Typography variant="body1" color="error" gutterBottom>
          {formError}
        </Typography>
      )}
      <Typography gutterBottom>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </Typography>
      <Typography variant='body1'>
        {'Don\'t have an account yet?'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate('/register')
        }}
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? <CircularProgress size={24} /> : 'Register'}
      </Button>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          Error: {error.message}
        </Typography>
      )}
    </FormContainer>
  );
};

export default LoginForm;
