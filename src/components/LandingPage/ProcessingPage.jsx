import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import {
  ClipLoader,
  PulseLoader,
  RingLoader,
  PacmanLoader,
  BounceLoader,
} from 'react-spinners'; // Import multiple loaders

const loaders = [
  ClipLoader,
  PulseLoader,
  RingLoader,
  PacmanLoader,
  BounceLoader,
]; // Array of loaders

const ProcessingPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentLoader, setCurrentLoader] = useState(null);

  useEffect(() => {
    // Randomize the loader on page load
    const randomIndex = Math.floor(Math.random() * loaders.length);
    setCurrentLoader(() => loaders[randomIndex]); // Set a random loader

    // Preload the image
    const img = new Image();
    img.src = 'https://source.unsplash.com/600x400/?nature,calm';
    img.onload = () => setImageLoaded(true);
  }, []);

  const LoaderComponent = currentLoader;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom, #f5f7fa, #c3cfe2)', // Soft gradient background
        textAlign: 'center',
        padding: 4,
      }}
    >
      {/* Dynamic Loader or Image */}
      {!imageLoaded ? (
        LoaderComponent && (
          <LoaderComponent color="#3498db" size={50} loading={true} />
        )
      ) : (
        <Box
          component="img"
          src="https://source.unsplash.com/600x400/?nature,calm"
          alt="Processing"
          sx={{
            width: '100%',
            maxWidth: 400,
            borderRadius: '18px',
            marginBottom: 3,
          }}
        />
      )}
<br />
<br />
      {/* Highlighted Message */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#34495e',
          marginBottom: 2,
        }}
      >
        Respecting Your Time ❤️
      </Typography>

      {/* Additional Text */}
      <Typography
        variant="body1"
        sx={{
          fontSize: '1.2rem',
          color: '#2c3e50',
          maxWidth: 600,
          lineHeight: 1.8,
        }}
      >
        Your profile is currently under progress. We appreciate your patience
        and will update you very soon. Thank you for trusting us.
      </Typography>
    </Box>
  );
};

export default ProcessingPage;
