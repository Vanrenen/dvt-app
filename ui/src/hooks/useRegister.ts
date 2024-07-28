import { useCallback } from 'react';
import useGraphQL from './useGraphql';
import { UseRegisterResult } from '../interfaces/hookInterfaces';


const useRegister = (): UseRegisterResult => {
    const { loading, error, data, query } = useGraphQL<{ registerUser: { id: string } }>(process.env.REACT_APP_GRAPHQL_API);
    
    const register = useCallback(
      async (username: string, password: string) => {
        await query(
          `
          mutation Register($username: String!, $password: String!) {
            registerUser(username: $username, password: $password) {
              id
            }
          }
        `,
          { username, password }
        );

        return data?.registerUser?.id || null;
      },
      [query, data]
    );

    return { registerLoading: loading, registerError: error, register, registerData: data };
};

export default useRegister;