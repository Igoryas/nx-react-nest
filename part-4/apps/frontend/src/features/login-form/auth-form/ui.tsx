import { TextField, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { useUserState } from '../../../entities/user';

interface IAuthForm {
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

export const AuthForm = () => {
  const { fetchLoginUser } = useUserState();
  const { register, handleSubmit } = useForm<IAuthForm>();
  const onSubmit: SubmitHandler<IAuthForm> = (loginFormData) =>
    fetchLoginUser(loginFormData);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledTextField
        label="Email"
        type={'email'}
        autoComplete="current-email"
        {...register('email', { required: true })}
      />
      <StyledTextField
        label="Password"
        autoComplete="current-password"
        type={'password'}
        {...register('password', { required: true })}
      />
      <StyledButton variant="contained" color="primary" type="submit">
        Войти
      </StyledButton>
    </StyledForm>
  );
};
