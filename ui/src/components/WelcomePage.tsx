import { FC } from 'react';
import { Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const WelcomePage: FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
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
