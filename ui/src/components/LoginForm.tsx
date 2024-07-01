import React from 'react';
import useLogin from '../hooks/useLogin';

const LoginForm: React.FC = () => {
    const { handleChange, handleSubmit, data, loading, error, formError } = useLogin();

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" onChange={handleChange} placeholder="Username" />
            <input name="password" type="password" onChange={handleChange} placeholder="Password" />
            <button type="submit">Login</button>
            {loading && <p>Loading...</p>}
            {formError && <p style={{ color: 'red' }}>Error: {formError}</p>}
            {data && <p>Login successful!</p>}
        </form>
    );
};

export default LoginForm;
