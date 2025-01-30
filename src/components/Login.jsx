import React from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Header from './Header';
import { loginUser } from '../api/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = (values) => {
    loginUser(values, navigate, dispatch);
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
                sx={{ py: 1.5, fontSize: '1rem', textTransform: 'none' }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Login;
