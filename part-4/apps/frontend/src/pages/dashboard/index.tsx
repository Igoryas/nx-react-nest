import { List } from '@mui/material';
import { useEffect } from 'react';
import { TaskRow, useTasksStore } from '../../entities/task';
import { useUserState, WelcomeUser } from '../../entities/user';
import { TaskManagementForm } from '../../features/task-management-form';
import { styled } from '@mui/system';

const StyledList = styled(List)`
  max-width: 600px;
  margin: 20px auto;
`;

export const Dashboard = () => {
  const { fetchTask, tasks, fetchDeleteTask, fetchEditTask } = useTasksStore();
  const { username } = useUserState();

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  return (
    <>
      <WelcomeUser username={username} />
      <TaskManagementForm />
      <StyledList>
        {tasks.map((element) => (
          <TaskRow
            key={element._id}
            handleToggle={fetchEditTask}
            onClickDeleteIcon={fetchDeleteTask}
            {...element}
          />
        ))}
      </StyledList>
    </>
  );
};
