import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useUserState } from '../../entities/user';
import { useAccessToken } from '../../shared';

export const Header = () => {
  const { resetUser } = useUserState();
  const { accessToken } = useAccessToken();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ToDoApp
          </Typography>
          {accessToken && (
            <Button color="inherit" onClick={resetUser}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
