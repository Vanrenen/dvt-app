import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';

const useRegister = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [formError, setFormError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [registerUser] = useMutation(REGISTER_USER);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await registerUser({ variables: formData });
            setSuccessMessage('Registration successful!');
            setFormData({ username: '', password: '' });
        } catch (error: any) {
            setFormError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { formData, formError, handleChange, handleSubmit, loading, successMessage };
};

export default useRegister;
