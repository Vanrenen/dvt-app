import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

interface RegisterData {
    username: string;
    password: string;
}

interface RegisterError {
    message: string;
}

export const useRegister = () => {
    return useMutation<unknown, AxiosError<RegisterError>, RegisterData>(
        async (newUser) => {
            const response = await axios.post('/api/register', newUser);
            return response.data;
        }
    );
};
