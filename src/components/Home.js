
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Welcome to the App
      </Typography>
      <Button component={Link} to="/login" variant="contained" color="primary" fullWidth>
        Login
      </Button>
      <Button component={Link} to="/signup" variant="contained" color="secondary" fullWidth>
        Signup
      </Button>
    </Container>
  );
};

export default Home;
