
import React from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';

const Login = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField fullWidth label="Email" margin="normal" />
      <TextField fullWidth label="Password" type="password" margin="normal" />
      <Button variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Container>
  );
};

export default Login;
