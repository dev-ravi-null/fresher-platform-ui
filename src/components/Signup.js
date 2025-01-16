
import React from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';

const Signup = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      <TextField fullWidth label="Name" margin="normal" />
      <TextField fullWidth label="Email" margin="normal" />
      <TextField fullWidth label="Password" type="password" margin="normal" />
      <Button variant="contained" color="primary" fullWidth>
        Signup
      </Button>
    </Container>
  );
};

export default Signup;
