import { useCallback } from 'react';
import useGraphQL from './useGraphql';

interface UseRegisterResult {
  registerLoading: boolean;
  registerError: string | null;
  register: (username: string, password: string) => Promise<string | null>;
  registerData: {
    registerUser: {
      id: string;
    }
  } | null;
}

const useRegister = (): UseRegisterResult => {
    const { loading, error, data, query } = useGraphQL<{ registerUser: { id: string } }>(process.env.REACT_APP_API);
    
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