import React from 'react';
import useRegister from '../hooks/useRegister';

const RegisterForm: React.FC = () => {
    const { handleChange, handleSubmit, data, loading, error, formError } = useRegister();

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" onChange={handleChange} placeholder="Username" />
            <input name="password" type="password" onChange={handleChange} placeholder="Password" />
            <button type="submit">Register</button>
            {loading && <p>Loading...</p>}
            {formError && <p style={{ color: 'red' }}>Error: {formError}</p>}
            {data && <p>Registration successful!</p>}
        </form>
    );
};

export default RegisterForm;
