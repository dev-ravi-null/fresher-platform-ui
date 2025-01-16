
import React from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import Header from './Header';

const Login = () => {
  return (
    <>
    <Header/>
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
    </>
   
  );
};

export default Login;
