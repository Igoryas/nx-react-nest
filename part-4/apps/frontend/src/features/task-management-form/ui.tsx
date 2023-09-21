import { Button, TextField } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TaskForm } from '../../shared';
import { useTasksStore } from '../../entities/task';

const StyledForm = styled('form')`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  width: 100%;
  max-width: 600px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

export const TaskManagementForm = () => {
  const { register, reset, handleSubmit } = useForm<TaskForm>();
  const { fetchCreateTask } = useTasksStore();

  const onSubmit: SubmitHandler<TaskForm> = (data) => {
    fetchCreateTask(data);
    reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledTextField
        label={'Заголовок'}
        type={'text'}
        {...register('title', { required: true })}
      />
      <StyledTextField
        label={'Описание'}
        type={'text'}
        multiline
        rows={4}
        {...register('description', { required: true })}
      />
      <Button type={'submit'} color={'primary'} variant={'contained'}>
        Добавить
      </Button>
    </StyledForm>
  );
};
