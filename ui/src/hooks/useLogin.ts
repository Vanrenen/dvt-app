import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';

const useLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser({ variables: formData });
      setSuccessMessage('Login successful!');
      setFormData({ username: '', password: '' });
    } catch (error: any) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { formData, formError, handleChange, handleSubmit, loading, successMessage };
};

export default useLogin;
