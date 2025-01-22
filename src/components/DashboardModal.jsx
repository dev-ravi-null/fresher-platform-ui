import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function DashboardModal() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    alert(`Submitted Value: ${inputValue}`);
    setInputValue(''); // Clear the input after submission
  };

  return (
    <>
       <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "10vh",
        px: 2,
        py: 4,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
        maxWidth: 700,
        mx: "auto",
      }}
    >
      <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
        Enter {} Details
      </Typography>
      <TextField
        fullWidth
        label="Enter Value"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      </Box>
      </>
  );
}

export default DashboardModal;
