import { useCallback } from 'react';
import useGraphQL from './useGraphql';

interface UseLoginResult {
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<string | null>;
  data: any;
}

const useLogin = (): UseLoginResult => {
  const { loading, error, data, query } = useGraphQL<{ loginUser: { token: string } }>(process.env.REACT_APP_API);
  
  const login = useCallback(
    async (username: string, password: string) => {
      await query(
        `
        mutation Login($username: String!, $password: String!) {
          loginUser(username: $username, password: $password) {
            token
          }
        }
      `,
        { username, password }
      );

      return data?.loginUser?.token || null;
    },
    [query, data]
  );

  return { loading, error, login, data };
};

export default useLogin;
