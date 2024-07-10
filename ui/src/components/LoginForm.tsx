import { FC, useEffect, useState, ChangeEvent } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import FormContainer from './FormContainer';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const LoginForm: FC = () => {
  const { login, isAuthenticated, error, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await login(formData.username, formData.password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/welcome');
    }
  }, [isAuthenticated, navigate])

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
      <Typography gutterBottom>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
        fullWidth
      >
        {loading ? <Loading /> : 'Login'}
      </Button>
      </Typography>
      <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/register')}
          disabled={loading}
          fullWidth
        >
          {loading ? <Loading /> : 'Register'}
        </Button>
    </FormContainer>
  );
};

export default LoginForm;
