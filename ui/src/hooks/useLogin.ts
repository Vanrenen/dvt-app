import { useCallback } from 'react';
import useGraphQL from './useGraphql';
import { UseLoginResult } from '../interfaces/hookInterfaces';


const useLogin = (): UseLoginResult => {
  const { loading, error, data, query } = useGraphQL<{ loginUser: { token: string } }>(process.env.REACT_APP_GRAPHQL_API);
  
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
