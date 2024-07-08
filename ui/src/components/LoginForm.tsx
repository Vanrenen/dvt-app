import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import FormContainer from './FormContainer';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await login(formData.username, formData.password);
      navigate('/welcome');
    } catch (err) {
      setError('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
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
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
    </FormContainer>
  );
};

export default LoginForm;
