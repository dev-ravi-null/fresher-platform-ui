import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, CircularProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Header from '../LandingPage/Header';
import { loginUser } from '../../api/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values) => {
    setLoading(true); // Start loading
    try {
      await loginUser(values, navigate, dispatch);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false); // Stop loading after API call
    }
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          mt: 5,
          boxShadow: 5,
          p: 4,
          borderRadius: 2,
          backgroundColor: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center" color="primary" fontWeight="bold">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box mb={3}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  fullWidth
                  margin="normal"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading} // Disable button when loading
                startIcon={loading ? <CircularProgress size={24} color="inherit" /> : null} // Show loader
                sx={{ py: 1.5, fontSize: '1rem', textTransform: 'none' }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Login;
