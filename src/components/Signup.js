
import React from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import Header from './Header';

const Signup = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>
        <TextField fullWidth label="Name" margin="normal" />
        <TextField fullWidth label="Email" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <TextField fullWidth label="role" type="role" margin="normal" />
        <TextField fullWidth label="highestQualification" type="highestQualification" margin="normal" />
        <TextField fullWidth label="graduationYear" type="graduationYear" margin="normal" />

        <Button variant="contained" color="primary" fullWidth>
          Signup
        </Button>
      </Container>
    </>

  );
};

export default Signup;
