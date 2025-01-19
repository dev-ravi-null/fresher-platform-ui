import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, LinearProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Header from './Header';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

const SpinningCube = () => (
  <mesh rotation={[10, 10, 0]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="orange" />
  </mesh>
);

const Login = () => {
  const [loading, setLoading] = useState(false); // Manage loading stat
  const [isLoading, setIsLoading] = useState(false); // Loading state
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
    setLoading(true); // Start loader

    // Simulate a network request
    setTimeout(() => {
      console.log('Form Data', values);
      setLoading(false); // Stop loader
    }, 2000); // Simulated 2-second delay

  const handleSubmit = async (values) => {
    setIsLoading(true); // Start loading
    try {
      await loginUser(values, navigate); // Call the login API
    } catch (error) {
      console.error('Login failed:', error); // Log the error for debugging
    } finally {
      setIsLoading(false); // Stop loading
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
        <Box sx={{ position: 'absolute', top: -50, left: -50, opacity: 0.2 }}>
          <Canvas style={{ height: '200px', width: '200px' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, 5]} />
            <SpinningCube />
            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>
        </Box>
        <Typography variant="h4" gutterBottom textAlign="center" color="primary" fontWeight="bold">
          Login
        </Typography>
        {loading && <LinearProgress sx={{
          mb: 2, backgroundColor: '#66b3ff', /* Change the track color*/ '& .MuiLinearProgress-bar': {
            backgroundColor: '#1a8cff', // Change the progress bar color
          },
        }} />} {/* Loader bar */}
        {isLoading && <LinearProgress color="secondary" />} {/* Show LinearProgress when loading */}
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
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Logging in...' : 'Login'}
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? 'Loading...' : 'Login'} {/* Change text when loading */}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Login;
