import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import useGraphQL from '../hooks/useGraphql';

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
interface AuthInterface {
  children: ReactNode;
};

interface QueryInterface {
  loginUser: { token: string }
  registerUser: { token: string }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthInterface> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const { loading, error, data, query } = useGraphQL<QueryInterface>('http://localhost:4000/graphql');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

  const login = useCallback(async (username: string, password: string) => {
    await query(`
      mutation loginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
          token
        }
      }
    `, { username, password });

    if (data?.loginUser.token) {
      setToken(data.loginUser.token);
      setIsAuthenticated(true)
    }
  }, [query, data]);

  const register = useCallback(async (username: string, password: string) => {
    await query(`
      mutation registerUser($username: String!, $password: String!) {
        registerUser(username: $username, password: $password) {
          token
        }
      }
    `, { username, password });

    if (data?.registerUser.token) {
      setToken(data.registerUser.token);
      setIsAuthenticated(true);
    }
  }, [query, data]);

  const logout = useCallback(() => {
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, register, logout }}>
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
