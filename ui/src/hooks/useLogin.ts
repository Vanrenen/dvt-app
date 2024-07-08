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
      console.log(user);
      const response = await axios.post('http://localhost:4000/graphql/api/loginUser', user);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('currentUser');
      },
    }
  );
};
