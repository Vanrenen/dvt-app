import React from 'react';
import { Typography, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const WelcomePage: React.FC = () => {
    const { logout } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h1" gutterBottom>
                Welcome!
            </Typography>
            <Typography variant="h6" gutterBottom>
                You have successfully logged in.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
};

export default WelcomePage;
