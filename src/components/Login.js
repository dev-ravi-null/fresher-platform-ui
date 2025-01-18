import React from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Header from './Header';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { loginUser } from '../api/api'
const SpinningCube = () => (
  <mesh rotation={[10, 10, 0]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="orange" />
  </mesh>
);
// login section
const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = (values) => {
    loginUser(values);
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
          overflow: 'hidden'
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
