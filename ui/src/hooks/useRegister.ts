import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';

interface RegisterData {
    username: string;
    password: string;
}

const useRegister = () => {
    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
        update(cache, { data: { registerUser } }) {
            cache.modify({
                fields: {
                    users(existingUsers = []) {
                        const newUserRef = cache.writeFragment({
                            data: registerUser,
                            fragment: gql`
                                fragment NewUser on User {
                                    id
                                    username
                                }
                            `
                        });
                        return [...existingUsers, newUserRef];
                    }
                }
            });
        }
    });

    const [formData, setFormData] = useState<RegisterData>({ username: '', password: '' });
    const [formError, setFormError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setFormError(null);
            await registerUser({ variables: formData });
        } catch (err) {
            setFormError(err.message);
        }
    };

    return { handleChange, handleSubmit, data, loading, error, formError };
};

export default useRegister;
