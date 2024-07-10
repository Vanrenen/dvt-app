import { FC } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const LandingPage: FC = () => (
  <div>
    <h1>Welcome to Our App</h1>
    <RegisterForm />
    <LoginForm />
  </div>
);

export default LandingPage;
