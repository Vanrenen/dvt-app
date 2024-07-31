import {
  FC,
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import useLogin from 'hooks/useLogin';
import useRegister from 'hooks/useRegister';
import { AuthContetInterface, AuthContextType } from 'interfaces/contextInterfaces';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<AuthContetInterface> = ({ children }) => {
  const { loading, error, login, data } = useLogin();
  const { register, registerLoading, registerError, registerData } = useRegister();
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!window.localStorage.token)

  useEffect(() => {
    if (data?.loginUser) {
      setToken(data?.loginUser.token)
      setIsAuthenticated(true);
    }
  }, [data])

  useEffect(() => {
    if (token) {
      window.localStorage.setItem('token', token);
    }
  }, [token]);


  useEffect(() => {
    if (registerData?.registerUser) {
      setToken(registerData?.registerUser.id)
      setIsAuthenticated(true);
    }
  }, [registerData])

  const logout = useCallback(() => {
    setToken(null);
    setIsAuthenticated(false);
    window.localStorage.removeItem('token')
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, register, logout, isAuthenticated, error: registerError || error, loading: registerLoading || loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
