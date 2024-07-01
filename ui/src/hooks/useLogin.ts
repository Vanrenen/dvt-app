import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';

interface LoginData {
    username: string;
    password: string;
}

const useLogin = () => {
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

    const [formData, setFormData] = useState<LoginData>({ username: '', password: '' });
    const [formError, setFormError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setFormError(null);
            await loginUser({ variables: formData });
        } catch (err) {
            setFormError(err.message);
        }
    };

    return { handleChange, handleSubmit, data, loading, error, formError };
};

export default useLogin;
