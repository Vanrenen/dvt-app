import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import { useLogin } from '../hooks/useLogin';
import FormContainer from './FormContainer';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const { mutate, isLoading, error } = useLogin();
    const { login } = useAuth();
    const history = useHistory();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [formError, setFormError] = useState<string | null>(null);

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
            onSuccess: (data) => {
                login(data.token);
                history.push('/welcome');
            },
            onError: (err) => {
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
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
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

export default LoginForm;
