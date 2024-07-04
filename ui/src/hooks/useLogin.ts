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
        async (user) => {
            const response = await axios.post('/api/login', user);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('currentUser');
            },
        }
    );
};
