import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Theme } from '@mui/material';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme { }
};

const queryClient = new QueryClient();
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

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </ThemeProvider>,
    document.getElementById('root')
);
