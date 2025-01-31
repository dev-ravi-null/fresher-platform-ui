import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function DashboardModal({type}) {
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
       Request For {type}
      </Typography>
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
