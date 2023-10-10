import { Grid, Typography } from '@mui/material';

/* The code defines a functional component called `AuthLayout`. It takes two props, `children` and
`title`, with `title` having a default value of an empty string. */
const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          width: { md: 450 },
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          border: 0,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
