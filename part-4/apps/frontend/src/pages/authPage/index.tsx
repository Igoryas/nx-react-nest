import React from 'react';
import { Grid, Link, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { RegisterForm, AuthForm } from '../../features/login-form';
import { useAuthPage } from './model';

const FormContainer = styled(Grid)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  gap: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
`;

const Auth = () => {
  const { isLoginForm, handleToggleForm } = useAuthPage();

  return (
    <FormContainer>
      <h2>{isLoginForm ? 'Вход' : 'Регистрация'}</h2>
      {isLoginForm ? <AuthForm /> : <RegisterForm />}
      {isLoginForm ? (
        <p>
          Нет аккаунта?{' '}
          <StyledLink onClick={handleToggleForm}>Зарегистрируйтесь</StyledLink>
        </p>
      ) : (
        <p>
          Уже есть аккаунт?{' '}
          <StyledLink onClick={handleToggleForm}>Войдите</StyledLink>
        </p>
      )}
    </FormContainer>
  );
};

export default Auth;
