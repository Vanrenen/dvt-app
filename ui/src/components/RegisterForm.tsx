import React from 'react';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import useRegister from '../hooks/useRegister';

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RegisterForm: React.FC = () => {
  const { formData, formError, handleChange, handleSubmit, loading, successMessage } = useRegister();

  return (
    <FormContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      {formError && (
        <Typography variant="body1" color="error" gutterBottom>
          Error: {formError}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : 'Register'}
      </Button>
      {successMessage && (
        <Typography variant="body1" color="primary" gutterBottom>
          {successMessage}
        </Typography>
      )}
    </FormContainer>
  );
};

export default RegisterForm;
