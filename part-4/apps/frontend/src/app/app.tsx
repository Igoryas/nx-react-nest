import { Outlet } from 'react-router-dom';
import { Header } from '../features/header';
import { useCheckAuth } from './model';
import { Alert } from '../entities/alert';
import { styled } from '@mui/system';

const StyledContainer = styled('main')`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const App = () => {
  useCheckAuth();
  return (
    <>
      <Header />
      <Alert />
      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </>
  );
};
