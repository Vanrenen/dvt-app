import React, { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import { useRegister } from '../hooks/useRegister';
import FormContainer from './FormContainer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const { mutate, isLoading, error } = useRegister();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        console.error('Registration error:', err);
        setFormError('Failed to register. Please try again.');
      }
    });
  };

  return (
    <FormContainer>
      <Typography variant="h1" gutterBottom>
        Register
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
          {isLoading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </Typography>
      <Typography variant='body1'>
        {'Already have an account?'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate('/login')
        }}
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          Error: {error.message}
        </Typography>
      )}
    </FormContainer>
  );
};

export default RegisterForm;
