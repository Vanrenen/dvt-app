import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
    return (
        <StyledThemeProvider theme={theme}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <div style={{ padding: '2rem' }}>
                    <RegisterForm />
                    <LoginForm />
                </div>
            </MuiThemeProvider>
        </StyledThemeProvider>
    );
};

export default App;
