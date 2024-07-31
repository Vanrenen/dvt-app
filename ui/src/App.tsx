import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<LoginForm />} />
            <Route path="*" element={<PrivateRoute />} />
            <Route path="/product/*" element={ <ProductPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {isAuthenticated ? (
          <Route path='*' element={<ProductsPage/>} />
      ): (
        <Route path='*' element={<Navigate to="/login" replace />} />
      )}
      
    </Routes>
  );
};

export default App;
