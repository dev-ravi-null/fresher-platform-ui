import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, CircularProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Header from '../LandingPage/Header';
import { signupUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    highestQualification: '',
    graduationYear: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    role: Yup.string().required('Role is required'),
    highestQualification: Yup.string().required('Highest Qualification is required'),
    graduationYear: Yup.number()
      .min(1900, 'Enter a valid year')
      .max(new Date().getFullYear(), 'Graduation year cannot be in the future')
      .required('Graduation Year is required'),
  });

  const handleSubmit = async (values) => {
    setLoading(true); 
    try {
      await signupUser(values, navigate);
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          mt: 5,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          p: 4,
          borderRadius: 3,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          color="primary"
          fontWeight="bold"
          sx={{ mb: 3 }}
        >
          Signup
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form>
              <Box mb={3}>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  margin="normal"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
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
                <Field
                  as={TextField}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                <Field
                  as={TextField}
                  name="role"
                  label="Role"
                  fullWidth
                  margin="normal"
                  error={touched.role && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                />
                <Field
                  as={TextField}
                  name="highestQualification"
                  label="Highest Qualification"
                  fullWidth
                  margin="normal"
                  error={touched.highestQualification && Boolean(errors.highestQualification)}
                  helperText={touched.highestQualification && errors.highestQualification}
                />
                <Field
                  as={TextField}
                  name="graduationYear"
                  label="Graduation Year"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={touched.graduationYear && Boolean(errors.graduationYear)}
                  helperText={touched.graduationYear && errors.graduationYear}
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
                {loading ? ' ' : 'Signup'}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Signup;