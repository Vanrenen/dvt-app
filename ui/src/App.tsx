import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import WelcomePage from './components/WelcomePage';
import { AuthProvider, useAuth } from './context/AuthContext';

const App: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="*" element={<PrivateRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute: FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path='*' element={isAuthenticated ? <WelcomePage/> : <Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
