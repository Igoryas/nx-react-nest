import Typography from '@mui/material/Typography';

export const WelcomeUser = ({ username }: { username?: string }) => {
  if (username) {
    const text = username[0]?.toUpperCase() + username?.slice(1);
    return (
      <Typography
        variant={'h5'}
        component={'h1'}
        maxWidth={600}
        margin={'20px auto'}
      >
        {`Привет ${text}!`}
      </Typography>
    );
  }

  return null;
};
