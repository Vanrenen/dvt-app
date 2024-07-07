import { useMutation, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';

interface LoginData {
  username: string;
  password: string;
}

interface LoginError {
  message: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<LoginError>, LoginData>(
    async (user: any) => {
      const response = await axios.post('http://192.168.31.237:4000/graphql', user);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('currentUser');
      },
    }
  );
};
