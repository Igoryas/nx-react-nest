import { Alert as MuiAlert } from '@mui/material';
import { useAlertStore } from '../../shared';
import { styled } from '@mui/system';

const StyledUl = styled('ul')`
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Alert = () => {
  const { alert: alerts, clearAlert } = useAlertStore();

  return (
    <StyledUl>
      {alerts.map((alert, index) => (
        <li key={index}>
          <MuiAlert
            onClose={clearAlert}
            severity={alert.success ? 'success' : 'error'}
          >
            {alert.message}
          </MuiAlert>
        </li>
      ))}
    </StyledUl>
  );
};
