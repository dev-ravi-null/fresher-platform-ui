
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const FresherDetails = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Fresher Details</Typography>
        <Typography>Name: John Doe</Typography>
        <Typography>Skills: React, Redux, MUI</Typography>
      </CardContent>
    </Card>
  );
};

export default FresherDetails;
