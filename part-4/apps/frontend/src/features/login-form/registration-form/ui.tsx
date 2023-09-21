import { TextField, Button, Alert } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import React from 'react';
import { useUserState } from '../../../entities/user';

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
}

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

export const RegisterForm = () => {
  const { fetchLoginUser } = useUserState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>();
  const onSubmit: SubmitHandler<IRegisterForm> = (loginFormData) =>
    fetchLoginUser(loginFormData);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledTextField
        label="Username"
        type={'text'}
        autoComplete="new-username"
        {...register('username', { required: true })}
      />
      <StyledTextField
        label="Email"
        type={'email'}
        autoComplete="new-email"
        {...register('email', { required: true })}
      />
      <StyledTextField
        label="Password"
        type={'password'}
        autoComplete="new-password"
        {...register('password', {
          required: true,
          minLength: {
            value: 6,
            message: 'Password must have at least 6 characters',
          },
        })}
      />
      {errors.password?.message && (
        <Alert style={{ marginTop: 16 }} severity="error">
          {errors.password.message}
        </Alert>
      )}
      <StyledButton variant="contained" color="primary" type="submit">
        Войти
      </StyledButton>
    </StyledForm>
  );
};
