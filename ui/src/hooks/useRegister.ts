import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

interface RegisterData {
  username: string;
  password: string;
}

interface RegisterError {
  message: string;
}

let axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
  }
};

export const useRegister = () => {
  return useMutation<unknown, AxiosError<RegisterError>, RegisterData>(
    async (newUser: RegisterData) => {
      console.log(newUser);
      const response = await axios.post('http://localhost:4000/graphql/api/register', newUser, axiosConfig);
      return response.data;
    }
  );
};
